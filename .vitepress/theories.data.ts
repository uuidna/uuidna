// The /theories run — the involutionary refusion reactor applied to EXTERNAL theories, at build time. Each theory is
// adjudicated: SEALED (a decidable test holds), REFUTED (it cites a proof not in the ledger) or UNVERIFIED (it cites
// no proof — the honest verdict for a claim no arithmetic settles). Nothing is insulted and nothing is discarded:
// UNVERIFIED and REFUTED cells are RECYCLED, returned with the develop plan that names the aspect which WOULD seal
// their honest kernel. The proven-arithmetic counterparts are shown beside them (SEALED) so the line is visible —
// the SAME digits, sealed when a test holds, revealed as unbacked when it is only a claim. Recomputable by anyone.
import { reactor } from '../dist/index.js'

// The external theories to challenge, and — where there is one — the decidable arithmetic underneath the SAME motif,
// so the reader sees the boundary, not a verdict on belief. uuidna does not say a theory is false; it reveals whether
// it carries a recomputable proof, and recycles the honest kernel. No test → UNVERIFIED (revealed, not refused).
const CLAIMS: { claim: string; test?: () => boolean; note: string }[] = [
  { claim: 'The number 5 is the sacred heart of the universe and governs destiny.',
    note: 'A mystical reading of the digit 5.' },
  { claim: 'The doubling sequence 1,2,4,8,7,5 channels cosmic energy (vortex mysticism).',
    note: 'uuidna uses these very digits — so this is the honest self-test: the mysticism is UNVERIFIED.' },
  { claim: '2 to the k, folded mod 9, cycles through 1,2,4,8,7,5.',
    test: () => JSON.stringify([0, 1, 2, 3, 4, 5].map((k) => (2 ** k) % 9)) === JSON.stringify([1, 2, 4, 8, 7, 5]),
    note: 'The proven arithmetic behind the same digits — a decidable test holds, so it is SEALED.' },
  { claim: 'Your birth number and star sign predict your future.',
    note: 'Numerology / astrology — a prediction no arithmetic settles.' },
  { claim: 'A perpetual-motion machine yields free energy forever.',
    note: 'Refused by thermodynamics; uuidna claims no free energy (Landauer sets the floor).' },
  { claim: 'The reflection 10 − d has exactly one fixed point, 5.',
    test: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => 10 - d === d).length === 1 && 10 - 5 === 5,
    note: 'The proven reflection — the heart 5 is the fixed point, SEALED by its test.' },
]

export interface TheoryCell { claim: string; verdict: string; note: string; develop: string[]; address: string }
export interface TheoriesData { cells: TheoryCell[]; verified: number; unverified: number; handle: string; superposition: string; receipt: string }
declare const data: TheoriesData
export { data }

export default {
  watch: ['../dist/index.js'],
  load(): TheoriesData {
    const run = reactor(CLAIMS.map((c) => c.claim), CLAIMS.map((c) => c.test))
    const cells: TheoryCell[] = run.cells.map((c, i) => ({
      claim: c.claim, verdict: c.verdict, note: CLAIMS[i].note, develop: c.develop, address: c.address,
    }))
    return { cells, verified: run.verified.length, unverified: run.unverified.length, handle: run.handle, superposition: run.superposition, receipt: run.receipt }
  },
}
