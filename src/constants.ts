// @non-harmonic: fetches NIST constants from a free public API (network) — NAMED boundary; the harmonic core must never carry these ops.
// constants — verify uuidna's physics against NIST's AUTHORITATIVE CODATA values, content-addressed. Fetches the
// official NIST fundamental-constants table (physics.nist.gov, the recognised reference) and finds a constant by
// name, returning its value, uncertainty, unit and a content-address — so a physical constant uuidna uses (the speed
// of light, Landauer's kT·ln2, Boltzmann's k) is not self-asserted but RECHECKED against the
// external authority. it VERIFIES against NIST's published values; it is NOT a claim that NIST endorses
// uuidna, and CODATA values carry uncertainties (except the ones defined exact). One network call (Node's built-in
// fetch); the parse and addressing are pure and recomputable. Integrity.
import { toUuid } from './address.js'

export interface NistConstant {
  quantity: string
  value: string          // the value as NIST prints it (spaces are thousands separators)
  numeric: number | null // parsed number, or null if not a plain numeral
  uncertainty: string    // NIST's stated uncertainty, or "(exact)"
  exact: boolean
  unit: string
  address: string        // content-address of quantity=value unit — recompute it against NIST's table
}

/** nistConstant(query) → the matching NIST CODATA constants, content-addressed, for verifying uuidna's physics
 *  against the authoritative source. Deterministic given the (versioned) NIST table. One network call. */
export async function nistConstant(query: string): Promise<{ query: string; matches: NistConstant[]; source: string; honest: string }> {
  const url = 'https://physics.nist.gov/cuu/Constants/Table/allascii.txt'
  const r = await fetch(url)
  if (!r.ok) throw new Error(`constants: NIST responded ${r.status} for the CODATA table`)
  const text = await r.text()
  const lines = text.split('\n')
  // The NIST allascii table is fixed-width: Quantity 0–60, Value 60–85, Uncertainty 85–110, Unit 110+ (the header
  // labels are not left-aligned to the data columns, so the fixed offsets — verified against the table — are used).
  const vAt = 60, uAt = 85, tAt = 110
  const q = query.toLowerCase()
  const matches: NistConstant[] = []
  for (const line of lines) {
    if (line.length < uAt || line.startsWith('-') || line.includes('Quantity   ')) continue
    const quantity = line.slice(0, vAt).trim()
    if (!quantity || !quantity.toLowerCase().includes(q)) continue
    const value = line.slice(vAt, uAt).trim()
    const uncertainty = line.slice(uAt, tAt).trim()
    const unit = line.slice(tAt).trim()
    const cleaned = value.replace(/\s/g, '').replace(/\.\.\./g, '') // strip thousands-separator spaces and truncation dots
    const numeric = /^[-+]?[0-9]*\.?[0-9]+(e[-+]?[0-9]+)?$/i.test(cleaned) ? Number(cleaned) : null
    matches.push({ quantity, value, numeric, uncertainty, exact: /exact/i.test(uncertainty), unit, address: toUuid(quantity + '=' + value + ' ' + unit) })
    if (matches.length >= 25) break
  }
  return {
    query,
    matches,
    source: url,
    honest:
      'These are NIST\'s authoritative CODATA values, content-addressed so uuidna\'s physics is rechecked against the ' +
      'external authority, not self-asserted. It is NOT a claim that NIST endorses uuidna. Values carry uncertainties ' +
      'except the ones defined exact; the address recomputes against NIST\'s published table. Integrity.',
  }
}
