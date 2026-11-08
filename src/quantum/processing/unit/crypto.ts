// Cooled out of index.ts by the heat family (scripts/cool.mjs): encryptOf, cybersecurityOf, cybersecurityToolsOf.
import {
  coins,
  cryptoClaimOf,
  cryptoReadingOf,
  cryptoToolNames,
  found,
  mintOf,
  n,
  onceOf,
  capacityHolds,
  encryptHolds,
  evidenceHolds,
  qpuEvidenceOf,
  purposeHolds,
  purposeOf,
  raidHolds,
  raidOf,
  sequenceHolds,
  qpuSequenceOf,
  subManOf,
  seed,
  shorArgsOf,
  shorCountBits,
  shorDefaultsOf,
  shorFactorOf,
  theorem,
  unit,
} from './index.js'
import type { QpuSubTool } from './index.js'
import { leanOf, leanHolds } from './proof.js'
import { shorTryOf, shorOf, shorHolds } from '../../../families/crypt/shor.js'
import { facesOf, capacityOf } from '../../../families/lattice/lattice.js'
import { witnessOf, constructedSemiprimeOf } from './witness.js'

/**
 * The split identity of theorem crypto: fused = split x share, recomputed; secrecy is reported false (it is an identity, not a cipher).
 * @wing crypto
 * @kind builder
 * @evidence encryptHolds
 */
export const encryptOf = onceOf(() => {
  const capacity = capacityOf()
  const crypt = capacity.crypt
  const modulus = facesOf().rays * (n * n + n + seed)
  const publicKey = crypt.fused
  const ciphertext = crypt.split * crypt.share
  /** identity READ from the run: split * share lands on the independently computed fused. theorem crypto. */
  const identity = ciphertext === crypt.fused && crypt.holds && crypt.theorem === 'crypto'
  /** secrecy READ from the run: a ciphertext equal to the public key hides nothing. This is not encryption. */
  const secrecy = ciphertext !== publicKey
  const holds =
    identity &&
    secrecy === false &&
    crypt.split === capacity.faces &&
    crypt.share === capacity.kv.amplitudes &&
    crypt.fused === capacity.fused &&
    ciphertext !== modulus
  return {
    kind: 'encrypt' as const,
    theorem: 'crypto' as const,
    identity,
    secrecy,
    public: publicKey,
    ciphertext,
    split: crypt.split,
    share: crypt.share,
    fused: crypt.fused,
    modulus,
    holds,
  }
})

/**
 * The cybersecurity door set: Shor on 91, RSA factoring, the encrypt identity, crypt split and RAID, with what each verifies.
 * @wing crypto
 * @kind builder
 * @evidence cybersecurityHolds
 */
export const cybersecurityOf = onceOf(() => {
  const shor = shorOf()
  const capacity = capacityOf()
  const raid = raidOf()
  const purpose = purposeOf()
  const evidence = qpuEvidenceOf()
  const lean = leanOf()
  const sequence = qpuSequenceOf()
  const pairs = [
    [3, 5],
    [3, 7],
    [3, 11],
    [5, 7],
    [3, 13],
    [3, 17],
    [5, 11],
    [3, 19],
    [5, 13],
    [3, 23],
    [7, 11],
    [5, 17],
    [3, 29],
    [7, 13],
  ] as const
  const table = pairs.map(([p, q]) => ({ p, q, product: p * q, modulus: p * q, rsa: true as const, holds: p > seed && q > seed }))
  const rsa = {
    kind: 'rsa' as const,
    cryptosystem: 'rsa' as const,
    modulus: shor.n,
    public: { n: shor.n },
    factored: shor.rsa.factored,
    factors: shor.factors,
    table,
    payload: shor.payload,
    unlocked: shor.unlocked,
    lock: shor.lock,
    holds: shor.rsa.holds && table.length === facesOf().faces && table.every((row) => row.holds && row.p * row.q === row.modulus) && shor.unlocked === true,
  }
  const encrypt = encryptOf()
  const crypto = [...lean.rows, ...lean.cover].find((r) => r.heading === 'crypto')
  const shorRow = [...lean.rows, ...lean.cover].find((r) => r.heading === 'shor')
  const tools = cryptoToolNames
  const holds =
    shorHolds(shor) &&
    capacityHolds(capacity) &&
    raidHolds(raid) &&
    purposeHolds(purpose) &&
    evidenceHolds(evidence) &&
    sequenceHolds(sequence) &&
    leanHolds(lean) &&
    capacity.crypt.holds &&
    capacity.crypt.kind === 'crypto' &&
    raid.cluster.security === 'crypt' &&
    evidence.verify.crypt === true &&
    purpose.cybersecurity.holds &&
    purpose.cybersecurity.sealed === false &&
    purpose.cybersecurity.morph === true &&
    purpose.cybersecurity.tools.length === mintOf(n) &&
    tools.length === mintOf(n) &&
    rsa.holds &&
    rsa.kind === 'rsa' &&
    encrypt.holds &&
    encryptHolds(encrypt) &&
    table.length === facesOf().faces &&
    table.every((row) => row.holds && row.rsa === true) &&
    table[facesOf().faces - seed]!.p * table[facesOf().faces - seed]!.q === shor.n &&
    crypto?.holds === true &&
    shorRow?.holds === true &&
    sequence.rungs.every((row, k) => row.cybersecurity === tools[k])
  return {
    kind: 'cybersecurity' as const,
    theorem: 'crypto' as const,
    shor,
    rsa,
    encrypt,
    crypt: capacity.crypt,
    raid: { security: raid.cluster.security, holds: raid.cluster.security === 'crypt' },
    verify: evidence.verify,
    purpose: purpose.cybersecurity,
    table,
    tools,
    listed: true as const,
    morph: true as const,
    sealed: false as const,
    holds,
  }
})

/**
 * The eight cybersecurity MCP tools (catalog, rsa, shor, cmodexp, iqft, shots, split, verify) with their man pages and handlers.
 * @wing crypto
 * @kind builder
 */
export const cybersecurityToolsOf = (): QpuSubTool[] => {
  const href = `${unit.origin}/api`
  const see = cryptoToolNames
  const schema = { type: 'object', properties: { man: { type: 'boolean' } } }
  const defaults = shorDefaultsOf()
  const shorSchema = {
    type: 'object',
    properties: {
      man: { type: 'boolean' },
      n: { type: 'string', description: `Modulus to factor. Default ${defaults.modulus}. Work register bits(n) qubits, counting register ${shorCountBits} — the exact witness circuit; the period is the multiplicative order of the base, found exactly by the period-finding (classical.period) one step at a time, so any n factors once its order is in reach (classical.resolvable; classical.beyond is never produced: the order search has no ceiling). A base whose order is odd or has a^(r/2) ≡ -1 (mod n) is a bad base — try another a — and a base sharing a factor with n is handed over by gcd, not by period. Past 2^53 send n as a string of digits; \`read\` says how each argument was taken and \`exact\` carries every value as decimal text.` },
      a: { type: 'string', description: `Base. Default ${defaults.base}. A base sharing a factor with n hands it over as Shor's first step.` }}}
  const named = `{ n, a } name the modulus and base; the run is theirs, whatever they are. Default ${defaults.modulus} and ${defaults.base}. Counting register ${shorCountBits} is the exact witness; the period is the base's multiplicative order, found exactly by the period-finding, so any n factors once its order is in reach (classical.resolvable, classical.beyond past the cap). An odd order or a^(r/2) ≡ -1 is a bad base (try another a); a shared factor is handed over by gcd.`
  /** What a caller is shown: the run's numbers while they are exact as numbers, the decimal strings from `exact` once
   * they would round (past 2^53) or overflow (past 2^1024). Never a null where a number was asked for. */
  const shownOf = (shor: ReturnType<typeof shorOf>) => {
    const e = shor.exact
    const safe = e.safe
    return {
      n: safe ? shor.n : e.n,
      a: safe ? shor.a : e.a,
      factors: safe ? shor.factors : { ...shor.factors, p: e.p, q: e.q, product: e.product },
      rsa: safe ? shor.rsa : { ...shor.rsa, modulus: e.n, p: e.p, q: e.q, product: e.product },
    }
  }
  const morph = 'In tools/list. Morph. Not a ninth sealed tool. No auth.'
  const factoring = `${morph} theorem shor. ${shorFactorOf()}. p * q = N.`
  const encrypt = `${morph} theorem crypto. ${cryptoClaimOf()}. fused = split * share.`
  const both = `${morph} theorem shor. ${shorFactorOf()}. theorem crypto. ${cryptoClaimOf()}.`
  return [
    {
      name: see[n - n],
      description: 'theorem shor. theorem crypto.',
      man: subManOf(see[n - n], cryptoReadingOf().catalog, both, href, see.filter((s) => s !== see[n - n])),
      inputSchema: schema,
      run: () => cybersecurityOf()},
    {
      name: see[seed],
      description: `theorem shor. ${shorFactorOf()}.`,
      man: subManOf(see[seed], cryptoReadingOf().shor!, `${factoring} Coprime base. ${named}`, href, see.filter((s) => s !== see[seed])),
      inputSchema: shorSchema,
      run: (a: Record<string, unknown>) => {
        const shor = shorTryOf(a)
        const shown = shownOf(shor)
        return {
          kind: 'shor' as const,
          n: shown.n,
          a: shown.a,
          read: shor.read,
          coprime: shor.coprime,
          exact: shor.exact,
          device: shor.device,
          circuitry: { kind: shor.circuitry.kind, qubits: shor.circuitry.qubits, work: shor.circuitry.work, counting: shor.circuitry.counting, dim: shor.circuitry.dim, holds: shor.circuitry.holds },
          prepare: shor.prepare,
          qft: shor.qft,
          measure: shor.measure,
          post: shor.post,
          classical: shor.classical,
          factors: shown.factors,
          rsa: shown.rsa,
          witness: shor.exact.safe && shor.factors.by !== 'none'
            ? witnessOf(BigInt(shor.exact.n), BigInt(shor.exact.p), BigInt(shor.exact.q))
            : null,
          constructed: constructedSemiprimeOf(),
          holds: shor.holds,
        }
      }},
    {
      name: see[coins],
      description: `theorem shor. ${shorFactorOf()}.`,
      man: subManOf(see[coins], cryptoReadingOf().cmodexp!, `${factoring} Native h cnot. Compiled x swap csdg cmodexp. ${named}`, href, see.filter((s) => s !== see[coins])),
      inputSchema: shorSchema,
      run: (a: Record<string, unknown>) => {
        const shor = shorTryOf(a)
        const shown = shownOf(shor)
        return { kind: 'cmodexp' as const, circuitry: shor.circuitry, exact: shor.exact, read: shor.read, rsa: { kind: 'rsa' as const, modulus: shown.n, a: shown.a, factored: shor.rsa.factored }, holds: shor.circuitry.holds && shor.read.holds }
      }},
    {
      name: see[n],
      description: `theorem shor. ${shorFactorOf()}.`,
      man: subManOf(see[n], cryptoReadingOf().iqft!, `${factoring} Inverse QFT. Period continued-fraction. ${named}`, href, see.filter((s) => s !== see[n])),
      inputSchema: shorSchema,
      run: (a: Record<string, unknown>) => {
        const shor = shorTryOf(a)
        const shown = shownOf(shor)
        return { kind: 'iqft' as const, qft: shor.qft, post: shor.post, classical: shor.classical, exact: shor.exact, read: shor.read, rsa: { kind: 'rsa' as const, modulus: shown.n, period: shor.post.period, factored: shor.rsa.factored }, holds: shor.qft.holds && shor.post.holds && shor.read.holds }
      }},
    {
      name: see[n + seed],
      description: `theorem shor. ${shorFactorOf()}.`,
      man: subManOf(see[n + seed], cryptoReadingOf().shots!, `${factoring} Exact amplitudes. xx identity. ${named}`, href, see.filter((s) => s !== see[n + seed])),
      inputSchema: shorSchema,
      run: (a: Record<string, unknown>) => {
        const shor = shorTryOf(a)
        const shown = shownOf(shor)
        return { kind: 'shots' as const, device: shor.device, measure: shor.measure, exact: shor.exact, read: shor.read, rsa: { kind: 'rsa' as const, modulus: shown.n, factored: shor.rsa.factored }, holds: shor.measure.holds && shor.read.holds }
      }},
    {
      name: see[n + coins],
      description: `theorem shor. ${shorFactorOf()}.`,
      man: subManOf(see[n + coins], cryptoReadingOf().rsa!, `${factoring} JSON Nat. ${named}`, href, see.filter((s) => s !== see[n + coins])),
      inputSchema: shorSchema,
      run: (a: Record<string, unknown>) => {
        const args = shorArgsOf(a)
        if (args.modulus === undefined && args.base === undefined) return cybersecurityOf().rsa
        const shor = shorTryOf(a)
        const shown = shownOf(shor)
        return { ...shown.rsa, a: shown.a, period: shor.post.period, by: shor.factors.by, exact: shor.exact, read: shor.read, classical: shor.classical, holds: shor.rsa.holds && shor.read.holds }
      }},
    {
      name: see[n + n],
      description: `theorem crypto. ${cryptoClaimOf()}.`,
      man: subManOf(see[n + n], cryptoReadingOf().split!, encrypt, href, see.filter((s) => s !== see[n + n])),
      inputSchema: schema,
      run: () => encryptOf()},
    {
      name: see[mintOf(n) - seed],
      description: 'theorem shor. theorem crypto.',
      man: subManOf(see[mintOf(n) - seed], cryptoReadingOf().verify!, both, href, see.filter((s) => s !== see[mintOf(n) - seed])),
      inputSchema: schema,
      run: async () => {
        const cyber = cybersecurityOf()
        // crypt.* security formulas — dynamic import keeps the cooled crypto module free of a families cycle.
        const { CryptFormulas } = await import('../../../families/crypt/index.js')
        const known = CryptFormulas.knownAnswers()
        const grover = CryptFormulas.symmetricQuantumBits(256)
        const classical = CryptFormulas.curveClassicalBits(256)
        const quantum = CryptFormulas.curveQuantumBits(256)
        const tag = CryptFormulas.aeadTagBits()
        const poly = CryptFormulas.tagForgery(16)
        const birthday = CryptFormulas.hashCollisionBits(256)
        const cryptFamily = {
          knownAnswers: known,
          symmetricQuantumBits256: grover,
          curveClassicalBits256: classical,
          curveQuantumBits256: quantum,
          aeadTagBits: tag,
          tagForgery16: poly,
          hashCollisionBits256: birthday,
          holds: [known, grover, classical, quantum, tag, poly, birthday].every((r) => r.holds === true),
        }
        return {
          kind: 'verify' as const,
          factoring: { theorem: 'shor' as const, factored: cyber.rsa.factored, n: cyber.rsa.modulus, p: cyber.rsa.factors.p, q: cyber.rsa.factors.q, holds: cyber.rsa.holds },
          encrypt: cyber.encrypt,
          verify: cyber.verify,
          rsa: cyber.rsa,
          payload: cyber.shor.payload,
          crypt: cryptFamily,
          holds: cyber.verify.crypt === true && cyber.verify.rsa === true && cyber.verify.encrypt === true && cyber.encrypt.holds && cyber.holds && cryptFamily.holds,
        }
      }}]
}
