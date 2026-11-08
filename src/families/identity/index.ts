import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IDENTITY — WHO A REQUEST BELONGS TO, AS ARITHMETIC (chosen by the registry, not by hand). Verifying a person is
 *  numbers: the assurance level reached, how much a claim matches the record, how valid the presented documents are, how
 *  live the subject is, how unique they are in the pool, whether risk demands a step-up, how much the device attests, and
 *  how much a federated claim is verified. It INVOLVES OTHER FAMILIES: liveness and match confidence are what
 *  `biometrics` measures; attestation is what `firmware`/`driver`/`hardware` sign on a device; the step-up and federation
 *  are `auth`'s factors. Crosses to `auth` — identity is the subject auth decides on. A measure. */

const PROOF = 'identity arithmetic (assurance level, match confidence, document validity, liveness, uniqueness, step-up, device attestation, federation); it involves biometrics (liveness, match), firmware/driver/hardware (device attestation) and auth (step-up, federation); who a request belongs to, a measure crossed to auth'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'identity', dst: 'auth', formula, value, proof: PROOF, ...extra }, holds, { name: `identity.${name}`, params })

export class IdentityFormulas {
  /** ASSURANCE LEVEL as a percentage: identity factors satisfied over factors required (NIST IAL as a ratio; involves auth). value ⌊factors · 100 / required⌋. */
  static assurance(factors: number, required: number): CrossFormula { return c('identity-assurance', 'assurance(factors, required) = ⌊factors · 100 / required⌋', required > 0 ? Math.floor((factors * 100) / required) : 0, nat(factors, required) && required > 0, 'assurance', [factors, required]) }
  /** MATCH CONFIDENCE as a percentage: claimed attributes matched to the record (involves biometrics match score). value ⌊matched · 100 / claimed⌋. */
  static matchconfidence(matched: number, claimed: number): CrossFormula { return c('identity-matchconfidence', 'matchconfidence(matched, claimed) = ⌊matched · 100 / claimed⌋', claimed > 0 ? Math.floor((matched * 100) / claimed) : 0, nat(matched, claimed) && claimed > 0 && matched <= claimed, 'matchconfidence', [matched, claimed]) }
  /** DOCUMENT VALIDITY as a percentage: valid fields over required fields on the presented document. value ⌊valid · 100 / fields⌋. */
  static documentvalidity(valid: number, fields: number): CrossFormula { return c('identity-documentvalidity', 'documentvalidity(valid, fields) = ⌊valid · 100 / fields⌋', fields > 0 ? Math.floor((valid * 100) / fields) : 0, nat(valid, fields) && fields > 0 && valid <= fields, 'documentvalidity', [valid, fields]) }
  /** LIVENESS as a percentage: live detections over check attempts (involves biometrics liveness). value ⌊detected · 100 / attempts⌋. */
  static liveness(detected: number, attempts: number): CrossFormula { return c('identity-liveness', 'liveness(detected, attempts) = ⌊detected · 100 / attempts⌋', attempts > 0 ? Math.floor((detected * 100) / attempts) : 0, nat(detected, attempts) && attempts > 0 && detected <= attempts, 'liveness', [detected, attempts]) }
  /** UNIQUENESS as a percentage: distinct identities over enrolled (dedup across the pool). value ⌊distinct · 100 / enrolled⌋. */
  static uniqueness(distinct: number, enrolled: number): CrossFormula { return c('identity-uniqueness', 'uniqueness(distinct, enrolled) = ⌊distinct · 100 / enrolled⌋', enrolled > 0 ? Math.floor((distinct * 100) / enrolled) : 0, nat(distinct, enrolled) && enrolled > 0 && distinct <= enrolled, 'uniqueness', [distinct, enrolled]) }
  /** STEP-UP: whether measured risk meets the threshold that demands another factor (involves auth). value [risk ≥ threshold]. */
  static stepup(risk: number, threshold: number): CrossFormula { return c('identity-stepup', 'stepup(risk, threshold) = [risk ≥ threshold]', risk >= threshold ? 1 : 0, nat(risk, threshold), 'stepup', [risk, threshold]) }
  /** ATTESTATION as a percentage: devices whose firmware/driver signed an attestation over devices seen (involves firmware/driver/hardware). value ⌊signed · 100 / devices⌋. */
  static attestation(signed: number, devices: number): CrossFormula { return c('identity-attestation', 'attestation(signed, devices) = ⌊signed · 100 / devices⌋', devices > 0 ? Math.floor((signed * 100) / devices) : 0, nat(signed, devices) && devices > 0 && signed <= devices, 'attestation', [signed, devices]) }
  /** FEDERATION as a percentage: asserted claims a federated provider verified (involves auth federation). value ⌊verified · 100 / asserted⌋. */
  static federation(verified: number, asserted: number): CrossFormula { return c('identity-federation', 'federation(verified, asserted) = ⌊verified · 100 / asserted⌋', asserted > 0 ? Math.floor((verified * 100) / asserted) : 0, nat(verified, asserted) && asserted > 0 && verified <= asserted, 'federation', [verified, asserted]) }
}

for (const name of Object.getOwnPropertyNames(IdentityFormulas).filter((k) => typeof (IdentityFormulas as unknown as Record<string, unknown>)[k] === 'function' && !['length', 'name', 'prototype'].includes(k)))
  hexRegisterOf('identity', name, (IdentityFormulas as unknown as Record<string, (...y: unknown[]) => unknown>)[name]!.bind(IdentityFormulas))
