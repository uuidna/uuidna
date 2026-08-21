// transform — the automation of the rule "no unverified material stays: transform until verified". Only VERIFICATION
// is honesty: a "honest / bounded" label with no proof behind it is itself an unverified claim — a lie, manipulation —
// so this automation ADMITS only what verifies, and it verifies EXACTLY. Each material is driven
// toward a terminal, recycling never discarding:
//   • VERIFIED   — the material IS a SEALED theorem (byte-identical, or identical after whitespace normalization — the
//                  SAME statement, reformatted), or it CITES a sealed theorem. The content-address is recomputed to
//                  confirm. Admitted. The only honest terminal.
//   • UNVERIFIED — it is not a sealed statement and cites no sealed proof. NOT admitted
//                  false — recycled with a DEVELOP plan (cite a sealed theorem, or supply a decidable proof). It does
//                  not "stay": it is held out until a proof exists.
// The transform CANNOT manufacture truth. There is no fuzzy match: "the moon is made of cheese" shares a word with a
// lunar theorem but is NOT that theorem, so it stays UNVERIFIED. An overclaim to SOLVE a problem is never admitted —
// only the sealed REFLECTION (dz(dz k)=k), cited or stated exactly, verifies. Folds to one receipt. Integrity.
import { theorems } from './theorems/index.js'
import { verifyStatement } from './verify-statement.js'
import { adjudicate } from './adjudicate.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

export interface TransformCell {
  input: string
  status: 'VERIFIED' | 'UNVERIFIED'
  verifiedStatement?: string   // the sealed statement it matched (VERIFIED only)
  key?: string
  address?: string
  transform?: string           // the HONEST transform applied ('normalized' | 'cited'), if any
  develop?: string             // UNVERIFIED only: the plan naming what would verify it
  note: string
}
export interface TransformRun { cells: TransformCell[]; verified: number; unverified: number; receipt: string }

const norm = (s: string): string => s.replace(/\s+/g, ' ').trim()
// a whitespace-normalized index of the sealed ledger — the ONLY transform: the SAME statement, reformatted, still verifies.
let NORM: Map<string, { key: string; address: string }> | null = null
const normIndex = (): Map<string, { key: string; address: string }> => {
  if (NORM) return NORM
  NORM = new Map()
  for (const t of theorems()) NORM.set(norm(t.statement), { key: t.key, address: t.address })
  return NORM
}

/** Drive one material to a terminal state — VERIFIED only via an EXACT seal (as-is, whitespace-normalized, or a
 *  sealed citation), else UNVERIFIED (recycled. No association, no manufacture of truth. */
export function transformOne(material: string): TransformCell {
  const input = norm(String(material))
  // 1) exact: is this the statement of a sealed theorem?
  const exact = verifyStatement(input)
  if (exact.verdict === 'VERIFIED') return {
    input, status: 'VERIFIED', verifiedStatement: input, key: exact.key, address: exact.address,
    note: `VERIFIED as given — it is the sealed theorem ${exact.key}`,
  }
  // 2) honest transform — whitespace normalization only (the SAME statement, reformatted)
  const hit = normIndex().get(input)
  if (hit && toUuid(hit.key + ':' + input) === hit.address) return {
    input, status: 'VERIFIED', verifiedStatement: input, key: hit.key, address: hit.address, transform: 'normalized',
    note: `VERIFIED after whitespace normalization — the same statement as sealed theorem ${hit.key}`,
  }
  // 3) citation: does the material cite a sealed theorem?
  const cited = adjudicate(input)
  if (cited.verdict === 'VERIFIED') return {
    input, status: 'VERIFIED', transform: 'cited', address: toUuid('cited:' + input),
    note: 'VERIFIED by citation — it names a sealed theorem in the ledger',
  }
  // 4) no proof reached — NOT admitted
  return {
    input, status: 'UNVERIFIED',
    develop: 'cite a sealed theorem (/theorem/<key>) or supply a decidable proof — then, and only then, it verifies',
    note: 'no sealed proof — NOT admitted and NOT called honest (honesty without verification is a lie); recycled',
  }
}

/** The automation: transform every material until verified. Only VERIFIED is admitted; UNVERIFIED never "stays". */
export function transformUntilVerified(materials: string[]): TransformRun {
  const cells = materials.map((m) => transformOne(m))
  const addr = (c: TransformCell): string => c.address ?? toUuid(`unverified|${c.input}`)
  return {
    cells,
    verified: cells.filter((c) => c.status === 'VERIFIED').length,
    unverified: cells.filter((c) => c.status === 'UNVERIFIED').length,
    receipt: merkleGravity(cells.map(addr)),
  }
}
