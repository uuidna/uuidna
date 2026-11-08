import { ed25519PublicKey, ed25519Sign, fromHex, hexOf, md5, sha256, sha512, x25519 } from '../../core/crypt.js'
import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const nat = (...xs: number[]): boolean => xs.every((x) => Number.isSafeInteger(x) && x >= 0)

const KNOWN: [string, () => string, string][] = [
  ['sha256 abc', () => hexOf(sha256('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
  ['sha512 abc', () => hexOf(sha512('abc')), 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f'],
  ['md5 abc', () => hexOf(md5('abc')), '900150983cd24fb0d6963f7d28e17f72'],
  ['x25519 rfc7748', () => hexOf(x25519(fromHex('a546e36bf0527c9d3b16154b82465edd62144c0ac1fc5a18506a2244ba449ac4'), fromHex('e6db6867583030db3594c1a424b15f7c726624ec26b3353b10a903a6d0ab1c4c'))), 'c3da55379de9c6908e94ea4df28d084f32eccf03491c71f754b4075577a28552'],
  ['ed25519 rfc8032 key', () => hexOf(ed25519PublicKey(fromHex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'))), 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a'],
  ['ed25519 rfc8032 sig', () => hexOf(ed25519Sign(fromHex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'), new Uint8Array())), 'e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b'],
]

/** The internal crypto as formulas, registered as the hex family `crypt`. */
export class CryptFormulas {
  static knownAnswers(): CrossFormula {
    const passed = KNOWN.filter(([, run, want]) => run() === want).length
    return crossFormulaOf({ id: 'crypt-known', src: 'crypt', dst: 'crypt', formula: `known_answers = passed / ${KNOWN.length}`, value: passed / KNOWN.length, proof: KNOWN.map(([name]) => name).join(', ') }, passed === KNOWN.length, { name: 'crypt.knownAnswers', params: [] })
  }

  static symmetricQuantumBits(keyBits: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-grover', src: 'quantum', dst: 'crypt', formula: 'security_q = keyBits / 2', value: keyBits / 2, proof: "Grover's search halves the exponent of a key search" }, nat(keyBits) && keyBits > 0, { name: 'crypt.symmetricQuantumBits', params: [keyBits] })
  }

  static curveClassicalBits(curveBits: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-rho', src: 'crypt', dst: 'enterprise', formula: 'security_c = curveBits / 2', value: curveBits / 2, proof: 'Pollard rho finds a discrete log in the square root of the group order' }, nat(curveBits) && curveBits > 0, { name: 'crypt.curveClassicalBits', params: [curveBits] })
  }

  static curveQuantumBits(curveBits: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-shor', src: 'quantum', dst: 'crypt', formula: 'security_q = 0', value: 0, proof: 'theorem shor: period finding recovers the discrete log; the BB84 salt keeps session keys out of reach' }, nat(curveBits) && curveBits > 0, { name: 'crypt.curveQuantumBits', params: [curveBits] })
  }

  static tagForgery(bytes: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-poly1305', src: 'crypt', dst: 'chat', formula: 'p_forge <= 8 * ceil(bytes / 16) / 2^106', value: (8 * Math.ceil(bytes / 16)) / 2 ** 106, proof: 'RFC 8439 bound for one Poly1305 forgery attempt' }, nat(bytes), { name: 'crypt.tagForgery', params: [bytes] })
  }

  static nonceCollision(messages: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-nonce', src: 'crypt', dst: 'chat', formula: 'p_collide = messages^2 / 2^97', value: messages ** 2 / 2 ** 97, proof: 'Birthday bound on 96-bit random nonces; per-message keys make a collision harmless' }, nat(messages), { name: 'crypt.nonceCollision', params: [messages] })
  }

  /** ChaCha20-Poly1305 authentication tag width (RFC 8439). */
  static aeadTagBits(): CrossFormula {
    return crossFormulaOf({ id: 'crypt-aead-tag', src: 'crypt', dst: 'crypt', formula: 'aead_tag_bits = 128', value: 128, proof: 'RFC 8439 Poly1305 tag is 16 bytes' }, true, { name: 'crypt.aeadTagBits', params: [] })
  }

  /** Classical birthday collision cost for a hash of `hashBits` (SHA-256 → 128). */
  static hashCollisionBits(hashBits: number): CrossFormula {
    return crossFormulaOf({ id: 'crypt-birthday', src: 'crypt', dst: 'enterprise', formula: 'collision_bits = hashBits / 2', value: hashBits / 2, proof: 'Birthday bound: collision cost is the square root of the digest space' }, nat(hashBits) && hashBits > 0, { name: 'crypt.hashCollisionBits', params: [hashBits] })
  }
}

for (const name of ['aeadTagBits', 'curveClassicalBits', 'curveQuantumBits', 'hashCollisionBits', 'knownAnswers', 'nonceCollision', 'symmetricQuantumBits', 'tagForgery'] as const)
  hexRegisterOf('crypt', name, (CryptFormulas[name] as (...x: unknown[]) => unknown).bind(CryptFormulas))
