/**
 * MCP Secure Chat with Quantum Encryption & RBAC Payload Access
 * - Quantum-secured signalling layer
 * - Role-based access control for payloads
 * - Coordinated messaging with state sync
 * - End-to-end encrypted channels
 */

import { EventEmitter } from 'events'
import { aeadOpen, aeadSeal, concat, ed25519PublicKey, ed25519Sign, ed25519Verify, hexOf, hkdf, randomBytes, randomUUID, sha256Hex, utf8, x25519PublicKey, x25519Shared } from '../core/crypt.js'
import { QuantumSecureSignalling, bitsToBytes, type SiftedKey } from '../families/signal/index.js'

// ============================================================================
// RBAC & Access Control
// ============================================================================

export type Role = 'admin' | 'user' | 'guest' | 'quantum-peer' | 'system'
export type Permission = 'read' | 'write' | 'execute' | 'sign' | 'verify'
export type PayloadClassification = 'public' | 'internal' | 'restricted' | 'quantum-only'

export interface RBACPolicy {
  role: Role
  permissions: Set<Permission>
  payloadAccess: Map<PayloadClassification, boolean>
  maxPayloadSize: number
  rateLimitMs: number
}

export interface AccessContext {
  userId: string
  role: Role
  tokenId: string
  issuedAt: number
  expiresAt: number
  permissions: Set<Permission>
}

export class RBACEngine {
  private policies: Map<Role, RBACPolicy> = new Map()
  private contexts: Map<string, AccessContext> = new Map()
  private tokenBlacklist: Set<string> = new Set()

  constructor() {
    this.initializeDefaultPolicies()
  }

  private initializeDefaultPolicies(): void {
    // Admin: Full access
    this.policies.set('admin', {
      role: 'admin',
      permissions: new Set(['read', 'write', 'execute', 'sign', 'verify']),
      payloadAccess: new Map([
        ['public', true],
        ['internal', true],
        ['restricted', true],
        ['quantum-only', true]
      ]),
      maxPayloadSize: 100 * 1024 * 1024, // 100MB
      rateLimitMs: 10
    })

    // User: Standard access
    this.policies.set('user', {
      role: 'user',
      permissions: new Set(['read', 'write', 'sign', 'verify']),
      payloadAccess: new Map([
        ['public', true],
        ['internal', true],
        ['restricted', false],
        ['quantum-only', false]
      ]),
      maxPayloadSize: 10 * 1024 * 1024, // 10MB
      rateLimitMs: 100
    })

    // Guest: Read-only
    this.policies.set('guest', {
      role: 'guest',
      permissions: new Set(['read']),
      payloadAccess: new Map([
        ['public', true],
        ['internal', false],
        ['restricted', false],
        ['quantum-only', false]
      ]),
      maxPayloadSize: 1 * 1024 * 1024, // 1MB
      rateLimitMs: 1000
    })

    // Quantum Peer: Quantum operations
    this.policies.set('quantum-peer', {
      role: 'quantum-peer',
      permissions: new Set(['read', 'write', 'execute', 'verify']),
      payloadAccess: new Map([
        ['public', true],
        ['internal', true],
        ['restricted', true],
        ['quantum-only', true]
      ]),
      maxPayloadSize: 50 * 1024 * 1024, // 50MB
      rateLimitMs: 50
    })

    // System: Internal operations
    this.policies.set('system', {
      role: 'system',
      permissions: new Set(['read', 'write', 'execute', 'sign', 'verify']),
      payloadAccess: new Map([
        ['public', true],
        ['internal', true],
        ['restricted', true],
        ['quantum-only', true]
      ]),
      maxPayloadSize: 100 * 1024 * 1024,
      rateLimitMs: 1
    })
  }

  issueToken(userId: string, role: Role, ttlSeconds = 3600): string {
    const tokenId = `token_${hexOf(randomBytes(24))}`
    const now = Date.now()

    this.contexts.set(tokenId, {
      userId,
      role,
      tokenId,
      issuedAt: now,
      expiresAt: now + ttlSeconds * 1000,
      permissions: this.policies.get(role)?.permissions ?? new Set()
    })

    return tokenId
  }

  verifyToken(tokenId: string): AccessContext | null {
    if (this.tokenBlacklist.has(tokenId)) return null

    const context = this.contexts.get(tokenId)
    if (!context) return null

    if (Date.now() > context.expiresAt) {
      this.contexts.delete(tokenId)
      return null
    }

    return context
  }

  canAccess(context: AccessContext, permission: Permission, classification: PayloadClassification): boolean {
    // Check permission
    if (!context.permissions.has(permission)) return false

    // Check payload access
    const policy = this.policies.get(context.role)
    if (!policy) return false

    return policy.payloadAccess.get(classification) ?? false
  }

  revokeToken(tokenId: string): void {
    this.tokenBlacklist.add(tokenId)
    this.contexts.delete(tokenId)
  }

  getPolicy(role: Role): RBACPolicy | undefined {
    return this.policies.get(role)
  }
}

// ============================================================================
// Quantum Secure Signalling
// ============================================================================

export interface QuantumSignal {
  id: string
  timestamp?: number
  sender: string
  path: string[]
  signal: Uint8Array // Quantum-encoded
  signature: Uint8Array // Quantum signature
  nonce: Uint8Array
}

export interface QuantumKey {
  id: string
  /** X25519 public key (32 bytes) */
  publicKey: Uint8Array
  /** Ed25519 public key (32 bytes) */
  signingKey: Uint8Array
  quantumEntanglement: string // Entanglement ID
  rotationPhase: number
  expiresAt: number
}

export const BB84_RAW = 2048

export class QuantumSignaller {
  private keys: Map<string, QuantumKey> = new Map()
  private secrets: Map<string, { agree: Uint8Array; sign: Uint8Array }> = new Map()
  private pairs: Map<string, SiftedKey> = new Map()
  private signalHistory: QuantumSignal[] = []
  private maxHistorySize = 10000

  generateKey(userId: string): QuantumKey {
    const agree = randomBytes(32)
    const sign = randomBytes(32)
    const phase = randomBytes(4)
    const key: QuantumKey = {
      id: `qk_${randomUUID()}`,
      publicKey: x25519PublicKey(agree),
      signingKey: ed25519PublicKey(sign),
      quantumEntanglement: `entangle_${userId}_${randomUUID()}`,
      rotationPhase: (new DataView(phase.buffer).getUint32(0) / 2 ** 32) * 2 * Math.PI,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }
    this.keys.set(key.id, key)
    this.secrets.set(key.id, { agree, sign })
    return key
  }

  /** The BB84 key two keys share, sifted once per pair; it salts the session key derivation. */
  bb84Of(a: string, b: string): SiftedKey {
    const id = [a, b].sort().join('|')
    let sifted = this.pairs.get(id)
    while (!sifted || !sifted.holds) sifted = QuantumSecureSignalling.sift(QuantumSecureSignalling.BB84KeyGen(BB84_RAW))
    this.pairs.set(id, sifted)
    return sifted
  }

  /** One key per message: the signal id is in the HKDF info, so a repeated nonce never repeats a keystream. */
  private messageKeyOf(secret: Uint8Array, peer: QuantumKey, a: string, b: string, id: string): Uint8Array {
    const shared = x25519Shared(secret, peer.publicKey)
    if (!shared) throw new Error('Low-order public key')
    return hkdf('sha256', shared, bitsToBytes(this.bb84Of(a, b).bits), `qpu-chat|${[a, b].sort().join('|')}|${id}`, 32)
  }

  private boundOf(id: string, sender: string, recipient: string): Uint8Array {
    return utf8(`${id}|${sender}|${recipient}`)
  }

  encryptSignal(plaintext: Uint8Array, senderKeyId: string, recipientKeyId: string): QuantumSignal {
    const sender = this.secrets.get(senderKeyId)
    const recipient = this.keys.get(recipientKeyId)
    if (!sender || !recipient) {
      throw new Error('Invalid key IDs')
    }

    const id = `qs_${randomUUID()}`
    const nonce = randomBytes(12)
    const bound = this.boundOf(id, senderKeyId, recipientKeyId)
    const encrypted = aeadSeal(this.messageKeyOf(sender.agree, recipient, senderKeyId, recipientKeyId, id), nonce, plaintext, bound)

    const signal: QuantumSignal = {
      id,
      sender: senderKeyId,
      path: [senderKeyId, recipientKeyId],
      signal: encrypted,
      signature: ed25519Sign(sender.sign, concat(bound, nonce, encrypted)),
      nonce
    }

    this.addToHistory(signal)
    return signal
  }

  decryptSignal(signal: QuantumSignal, recipientKeyId: string, senderKeyId: string): Uint8Array {
    const sender = this.keys.get(senderKeyId)
    const recipient = this.secrets.get(recipientKeyId)
    if (!sender || !recipient) {
      throw new Error('Invalid key IDs')
    }

    const bound = this.boundOf(signal.id, senderKeyId, recipientKeyId)
    if (!ed25519Verify(sender.signingKey, concat(bound, signal.nonce, signal.signal), signal.signature)) {
      throw new Error('Signature verification failed')
    }

    const plaintext = aeadOpen(this.messageKeyOf(recipient.agree, sender, senderKeyId, recipientKeyId, signal.id), signal.nonce, signal.signal, bound)
    if (!plaintext) throw new Error('Authentication failed')
    return plaintext
  }

  private addToHistory(signal: QuantumSignal): void {
    this.signalHistory.push(signal)
    if (this.signalHistory.length > this.maxHistorySize) {
      this.signalHistory.shift()
    }
  }

  getSignalHistory(limit = 100): QuantumSignal[] {
    return this.signalHistory.slice(-limit)
  }

  getKey(keyId: string): QuantumKey | undefined {
    return this.keys.get(keyId)
  }
}

// ============================================================================
// Secure Chat Message & Payload
// ============================================================================

export interface SecureMessage {
  id: string
  timestamp?: number
  sender: string
  recipients: string[]
  classification: PayloadClassification
  subject: string
  body: Uint8Array // Encrypted
  quantumSignal: QuantumSignal
  /** one signal per recipient, each sealed to that recipient's key */
  signals: Record<string, QuantumSignal>
  metadata: Record<string, unknown>
}

export interface PayloadManifest {
  id: string
  messageId: string
  data: Uint8Array // Encrypted
  checksum: string
  classification: PayloadClassification
  accessLog: PayloadAccessLog[]
}

export interface PayloadAccessLog {
  userId: string
  timestamp?: number
  action: 'read' | 'write' | 'delete'
  success: boolean
}

export class SecureChat extends EventEmitter {
  private rbac: RBACEngine
  private quantumSignaller: QuantumSignaller
  private messages: Map<string, SecureMessage> = new Map()
  private payloads: Map<string, PayloadManifest> = new Map()
  private channels: Map<string, Set<string>> = new Map() // channel -> users
  private coordinationState: Map<string, unknown> = new Map()
  private userKeys: Map<string, string> = new Map()
  private chain = sha256Hex('')

  constructor() {
    super()
    this.rbac = new RBACEngine()
    this.quantumSignaller = new QuantumSignaller()
  }

  // ========================================================================
  // User & Access Management
  // ========================================================================

  registerUser(userId: string, role: Role): string {
    const token = this.rbac.issueToken(userId, role)
    this.emit('user-registered', { userId, role, token, keyId: this.keyIdOf(userId) })
    return token
  }

  private keyIdOf(userId: string): string {
    let keyId = this.userKeys.get(userId)
    if (!keyId) this.userKeys.set(userId, (keyId = this.quantumSignaller.generateKey(userId).id))
    return keyId
  }

  getKeyId(userId: string): string | undefined {
    return this.userKeys.get(userId)
  }

  getSignaller(): QuantumSignaller {
    return this.quantumSignaller
  }

  revokeAccess(tokenId: string): void {
    this.rbac.revokeToken(tokenId)
    this.emit('access-revoked', { tokenId })
  }

  // ========================================================================
  // Secure Messaging
  // ========================================================================

  sendMessage(
    tokenId: string,
    recipients: string[],
    subject: string,
    body: Uint8Array,
    classification: PayloadClassification = 'internal'
  ): SecureMessage | null {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return null

    // Check write permission
    if (!this.rbac.canAccess(context, 'write', classification)) {
      this.emit('access-denied', { userId: context.userId, action: 'write', classification })
      return null
    }

    // Check payload size
    const policy = this.rbac.getPolicy(context.role)
    if (!policy || body.length > policy.maxPayloadSize) {
      this.emit('payload-too-large', { userId: context.userId, size: body.length })
      return null
    }

    if (recipients.length === 0) return null
    const senderKeyId = this.keyIdOf(context.userId)
    const signals = Object.fromEntries(
      recipients.map((r) => [r, this.quantumSignaller.encryptSignal(body, senderKeyId, this.keyIdOf(r))])
    )
    const quantumSignal = signals[recipients[0]!]!
    const bb84 = this.quantumSignaller.bb84Of(senderKeyId, this.keyIdOf(recipients[0]!))
    this.chain = sha256Hex(concat(utf8(this.chain), quantumSignal.signature))

    const message: SecureMessage = {
      // the id is the chain value after this message: unique per message and reproducible from the history
      id: `msg_${this.chain}`,
      sender: context.userId,
      recipients,
      classification,
      subject,
      body: quantumSignal.signal,
      quantumSignal,
      signals,
      metadata: {
        encryptionMethod: 'x25519+bb84-hkdf-sha256+chacha20-poly1305+ed25519',
        senderRole: context.role,
        ipAddress: 'encrypted',
        bb84: { raw: bb84.raw, sifted: bb84.sifted, keyBits: bb84.bits.length, qber: bb84.qber, holds: bb84.holds },
        chain: this.chain
      }
    }

    this.messages.set(message.id, message)

    // Create payload manifest
    const payload: PayloadManifest = {
      id: `payload_${message.id}`,
      messageId: message.id,
      data: quantumSignal.signal,
      checksum: this.computeChecksum(quantumSignal.signal),
      classification,
      accessLog: [
        {
          userId: context.userId,
          action: 'write',
          success: true
        }
      ]
    }

    this.payloads.set(payload.id, payload)
    this.emit('message-sent', { messageId: message.id, recipients, classification })

    return message
  }

  readMessage(messageId: string, tokenId: string): SecureMessage | null {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return null

    const message = this.messages.get(messageId)
    if (!message) return null

    // Check access
    if (!message.recipients.includes(context.userId) && context.role !== 'admin') {
      this.emit('access-denied', { userId: context.userId, messageId, action: 'read' })
      return null
    }

    // Check read permission
    if (!this.rbac.canAccess(context, 'read', message.classification)) {
      this.emit('access-denied', { userId: context.userId, messageId, classification: message.classification })
      return null
    }

    // Log access
    const payload = this.payloads.get(`payload_${messageId}`)
    if (payload) {
      payload.accessLog.push({
        userId: context.userId,
        action: 'read',
        success: true
      })
    }

    this.emit('message-read', { messageId, userId: context.userId })
    return message
  }

  decryptMessageBody(message: SecureMessage, tokenId: string): Uint8Array | null {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return null

    // Check read permission
    if (!this.rbac.canAccess(context, 'read', message.classification)) {
      this.emit('decryption-denied', { userId: context.userId, messageId: message.id })
      return null
    }

    try {
      const signal = message.signals?.[context.userId]
      const recipientKeyId = this.userKeys.get(context.userId)
      if (!signal || !recipientKeyId) {
        return null
      }

      return this.quantumSignaller.decryptSignal(signal, recipientKeyId, signal.sender)
    } catch (e) {
      this.emit('decryption-failed', { messageId: message.id, error: (e as Error).message })
      return null
    }
  }

  // ========================================================================
  // Channels & Coordinated Messaging
  // ========================================================================

  createChannel(channelId: string, participants: string[], tokenId: string): boolean {
    const context = this.rbac.verifyToken(tokenId)
    if (!context || context.role !== 'admin') return false

    this.channels.set(channelId, new Set(participants))
    this.emit('channel-created', { channelId, participants })
    return true
  }

  broadcastToChannel(
    channelId: string,
    subject: string,
    body: Uint8Array,
    tokenId: string,
    classification: PayloadClassification = 'internal'
  ): boolean {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return false

    const channel = this.channels.get(channelId)
    if (!channel) return false

    const recipients = Array.from(channel).filter(u => u !== context.userId)

    const message = this.sendMessage(tokenId, recipients, subject, body, classification)
    if (message) {
      this.emit('broadcast-sent', { channelId, messageId: message.id })
      return true
    }

    return false
  }

  // ========================================================================
  // State Coordination & Synchronization
  // ========================================================================

  updateCoordinationState(key: string, value: unknown, tokenId: string): boolean {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return false

    if (context.role === 'system' || context.role === 'admin') {
      this.coordinationState.set(key, value)
      this.emit('state-updated', { key, value })
      return true
    }

    return false
  }

  getCoordinationState(key: string, tokenId: string): unknown | null {
    const context = this.rbac.verifyToken(tokenId)
    if (!context) return null

    return this.coordinationState.get(key) ?? null
  }

  // ========================================================================
  // Utilities
  // ========================================================================

  private computeChecksum(data: Uint8Array): string {
    return sha256Hex(data)
  }

  getChain(): string {
    return this.chain
  }

  getMessageCount(): number {
    return this.messages.size
  }

  getPayloadCount(): number {
    return this.payloads.size
  }

  getChannelCount(): number {
    return this.channels.size
  }

  getAccessLog(payloadId: string): PayloadAccessLog[] | null {
    const payload = this.payloads.get(payloadId)
    return payload?.accessLog ?? null
  }
}

// ============================================================================
// MCP Operation Handlers
// ============================================================================

const secureChat = new SecureChat()

export const mcpSecureChatOps = {
  name: 'mcp-secure-chat-rbac',
  domain: 'communication',
  operations: [
    {
      name: 'user_register',
      description: 'Register user with role and issue access token',
      handler: async (req: { userId: string; role: Role }) => ({
        token: secureChat.registerUser(req.userId, req.role),
        userId: req.userId,
        role: req.role
      })
    },
    {
      name: 'send_secure_message',
      description: 'Send quantum-encrypted message with RBAC payload access',
      handler: async (req: {
        tokenId: string
        recipients: string[]
        subject: string
        body: string
        classification: PayloadClassification
      }) => {
        const bodyBytes = new TextEncoder().encode(req.body)
        const message = secureChat.sendMessage(
          req.tokenId,
          req.recipients,
          req.subject,
          bodyBytes,
          req.classification
        )
        return message
          ? { messageId: message.id, status: 'sent' }
          : { error: 'Access denied or payload too large' }
      }
    },
    {
      name: 'read_secure_message',
      description: 'Read encrypted message with access logging',
      handler: async (req: { messageId: string; tokenId: string }) => {
        const message = secureChat.readMessage(req.messageId, req.tokenId)
        if (!message) return { error: 'Access denied or message not found' }

        return {
          messageId: message.id,
          sender: message.sender,
          subject: message.subject,
          classification: message.classification,
          timestamp: message.timestamp
        }
      }
    },
    {
      name: 'decrypt_message_body',
      description: 'Decrypt quantum-encrypted message body',
      handler: async (req: { messageId: string; tokenId: string }) => {
        const message = secureChat.readMessage(req.messageId, req.tokenId)
        if (!message) return { error: 'Message not found or access denied' }

        const body = secureChat.decryptMessageBody(message, req.tokenId)
        if (!body) return { error: 'Decryption failed or access denied' }

        return {
          messageId: req.messageId,
          body: new TextDecoder().decode(body),
          decrypted: true
        }
      }
    },
    {
      name: 'channel_broadcast',
      description: 'Broadcast to channel with RBAC enforcement',
      handler: async (req: {
        channelId: string
        subject: string
        body: string
        tokenId: string
        classification: PayloadClassification
      }) => {
        const bodyBytes = new TextEncoder().encode(req.body)
        const success = secureChat.broadcastToChannel(
          req.channelId,
          req.subject,
          bodyBytes,
          req.tokenId,
          req.classification
        )
        return { channelId: req.channelId, broadcasted: success }
      }
    },
    {
      name: 'access_log',
      description: 'Get payload access audit log',
      handler: async (req: { payloadId: string }) => {
        const log = secureChat.getAccessLog(req.payloadId)
        return { payloadId: req.payloadId, accessLog: log ?? [] }
      }
    },
    {
      name: 'revoke_access',
      description: 'Revoke user access token',
      handler: async (req: { tokenId: string }) => {
        secureChat.revokeAccess(req.tokenId)
        return { tokenId: req.tokenId, revoked: true }
      }
    }
  ]
}

// Exported above
