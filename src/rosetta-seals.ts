// rosetta-seals — WHICH INVOLUTIONS THE 2×7 WITNESS ROSETTAS HAVE SIGNED, and which the court still holds open.
//
// THE LAW THIS SERVES (the captain, 2026-09-14: "unless signed and sealed by the 2x7 withness rosettas nothing is
// legal"). A refutation is not closed when its wing compiles. Four things must hold at once, and until this door
// existed each had to be computed by hand from a different file: the ledger must SEAL involution_<handle>; the
// kernel must have ACCEPTED the wing; the fourteen faces must all SIGN; and the signatures must be LEGAL —
// VE_FACES distinct faces, each citing a theorem the ledger carries. A wing that compiles but is unsigned reads,
// to every finder that only searches the ledger, exactly like a closed lead. It is not one.
//
// WHY A DOOR AND NOT A SCRIPT. Closing one lead cost nine escapes through UUIDNA_MCP_GAP in a single session, every
// one of them a variation of this question. The captain: "always convert reusable work to code", "no repeating
// manual tasks whatsoever". The answer belongs where any client can ask for it in one call.
//
// THE SEALS ARE REPO-ONLY AND THE LEDGER IS NOT. The wing sources do not ship, so the served package can read the
// ledger but not the seal file; a host run reads both. Rather than throw where it cannot reach (which would make
// this door useless exactly where it is most often asked), the seal side answers UNMEASURED and says so — a count
// nobody took is never reported as a count of zero.
import { existsRoot, rdRoot } from './boundary.js'
import { theorems } from './theorems/index.js'
import { witnessSealOf, type Witness } from './refusal-trials.js'
import { VE_FACES } from './hexbit/index.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'

export interface SealRow {
  handle: string
  /** the verdict theorem the wing declares — `involution_<handle>` refutes the lead, `proof_<handle>` proves it */
  theorem: string
  kind: 'involution' | 'proof'
  /** the ledger seals the verdict theorem: without this no face can legally sign it */
  inLedger: boolean
  /** faces that signed, of VE_FACES; null when the seal file could not be read here */
  faces: number | null
  /** the fold the fourteen legal signatures seal to, or null when they are not all legal */
  seal: string | null
  signed: boolean
  /** the computed reason this row is not closed, or '' when it is */
  owes: string
}

export interface RosettaSeals {
  definition: string
  faces: number
  /** false when the seal file is out of reach (the shipped package): the seal columns read UNMEASURED */
  sealsMeasured: boolean
  rows: SealRow[]
  sealedCount: number
  owingCount: number
  /** every handle the ledger seals that the rosettas have NOT signed — the court's open refutations */
  owing: string[]
  /** proofs the seal writer cannot key, so no wave can sign them: a gap in the machinery, not an open refutation */
  noRosettaPath: string[]
  receipt: string
  honest: string
}

const KEY = /^(involution|proof)_([0-9a-f]{8})$/
// THE PATH IS THE BOUNDARY'S, never arithmetic done here. A first cut of this door walked up from import.meta.url
// by hand, landed one directory short, and reported sealsMeasured:false ON THE HOST — a door that answers
// "unmeasured" where the file is sitting right there is worse than no door, because the absence looks principled.
// existsRoot/rdRoot resolve against the one ROOT boundary.ts computes, and existsRoot is the honest ask: it
// answers false off-host rather than throwing, so the reach test and the read agree about where they are.
const SEAL_FILE = 'lean/witness-seals.json'

/** readSeals() → the witness-seal file as the tree holds it, or null where the tree is out of reach. A parse
 *  failure returns null by construction, for the same reason: an unreadable seal file is not an empty one, so
 *  reporting zero signatures from it would be a measurement nobody took. The caller turns null into UNMEASURED. */
const readSeals = (): Record<string, Witness[]> | null => {
  try {
    if (!existsRoot(SEAL_FILE)) return null
    const parsed: unknown = JSON.parse(rdRoot(SEAL_FILE))
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, Witness[]>) : null
  } catch {
    return null
  }
}

/** rosettaSeals() → every verdict theorem the ledger seals, with the state of its 2×7 signatures. Pure given the
 *  tree: no clock, no RNG, and every figure recomputed from the ledger and the seal file rather than recorded. */
export function rosettaSeals(): RosettaSeals {
  const seals = readSeals()
  const measured = seals !== null
  const rows: SealRow[] = []
  for (const t of theorems()) {
    const m = KEY.exec(t.key)
    if (!m) continue
    const kind = m[1] as 'involution' | 'proof'
    const handle = m[2]!
    const ws = seals?.[t.key]
    const s = ws ? witnessSealOf(t.key, ws) : null
    const signed = s?.legal === true
    rows.push({
      handle,
      theorem: t.key,
      kind,
      inLedger: true,
      faces: measured ? (s?.signed ?? 0) : null,
      seal: s?.seal ?? null,
      signed,
      owes: !measured
        ? 'UNMEASURED here: the witness-seal file is not in reach of the served package; ask a host run'
        : signed
          ? ''
          : kind === 'proof'
            // A PROOF HAS NO ROSETTA PATH TODAY, and saying so is not the same as calling it unsigned. The wave's
            // seal writer keys every entry `involution_<handle>`, so no wave can seal a proof however it votes, and
            // the settlement law the faces serve speaks of REFUTED leads — a proof says the lead HOLDS, which closes
            // nothing and settles nothing. This row is a recorded gap in the machinery, not a finding against the
            // theorem: reporting it as an unsigned refutation would be the overreach the faces exist to catch.
            ? `no rosetta path: the wave's seal writer keys only involution_<handle>, so a proof cannot be sealed by it — a gap in the machinery, NOT a finding that ${t.key} is unsigned or illegitimate`
            : `not signed and sealed by the 2×7 witness rosettas (${s?.signed ?? 0} of ${VE_FACES} faces)`,
    })
  }
  rows.sort((a, b) => (a.theorem < b.theorem ? -1 : a.theorem > b.theorem ? 1 : 0))
  // `owing` is the court's OPEN REFUTATIONS and nothing else. A proof carries no rosetta path at all, so counting
  // it here would inflate the court's debt with rows no wave can ever discharge — and an inflated debt is as
  // dishonest as a hidden one. It is reported separately, as the gap in the machinery that it is.
  const owing = measured ? rows.filter((r) => !r.signed && r.kind === 'involution').map((r) => r.handle) : []
  const noRosettaPath = measured ? rows.filter((r) => !r.signed && r.kind === 'proof').map((r) => r.handle) : []
  return {
    definition: 'uuidna·rosetta·seals — every verdict theorem the ledger seals, and its 2×7 witness signatures',
    faces: VE_FACES,
    sealsMeasured: measured,
    rows,
    sealedCount: rows.filter((r) => r.signed).length,
    owingCount: measured ? owing.length : rows.length,
    owing,
    noRosettaPath,
    receipt: merkleGravity(rows.map((r) => toUuid(`${r.theorem}:${r.signed ? r.seal : 'unsigned'}`))),
    honest: measured
      ? 'A wing that compiles is not a closed lead. The kernel proves the statement; the fourteen faces judge whether the statement is the LEAD — seven recompile it and seven judge its faithfulness, and a dissent on faithfulness is the overreach these signatures exist to catch. Rows here are read from the tree, never asserted: an unreadable seal file reports UNMEASURED, never zero.'
      : 'UNMEASURED: the wing sources do not ship, so the served package reads the ledger but not the witness-seal file. Every row is listed with its seal columns null — this is the absence of a measurement, not a finding that nothing is signed.',
  }
}
