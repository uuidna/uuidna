// hexbit-from-books — unit-equivalence claims from public-domain texts become HEXBIT theorems, not hashed book_fact stubs.
//
// WHY THE OLD PATH WAS A HACK. extractDecidable only hears `a op b = c`. Books state measures as
// "45 degrees, or four points" — extractClaims finds them, extractDecidable returns []. books-run then
// reminted empty novels as `book_<handle>`, which sealed nothing of meaning.
//
// THE REAL SEAL (already in the ledger as four_points_is_45): the compass rose is 32 points over 360°,
// and 32 = UUID_HEXBITS — the same width the hexbit unit computes. So n points ↔ d degrees is
//   n · 360 = 32 · d
// in exact integers, with 32 taken from the hexbit uuid floor, never a stranded literal.
import { UUID_HEXBITS } from '../hexbit/index.js'
import { wordsToNumber, type TextClaim } from '../books.js'
import type { WaveCandidate } from '../wave-deposit.js'
import { theoremByKey } from '../theorems/index.js'

const POINTS_DEGREES = /\b(\d{1,2}|[a-z]+(?:[\s-][a-z]+){0,4})\s+points?\b[^.]{0,40}?\bor\b[^.]{0,40}?\b(\d{1,3}|[a-z]+(?:[\s-][a-z]+){0,4})\s+degrees?\b/i
const DEGREES_POINTS = /\b(\d{1,3}|[a-z]+(?:[\s-][a-z]+){0,4})\s+degrees?\b[^.]{0,40}?\bor\b[^.]{0,40}?\b(\d{1,2}|[a-z]+(?:[\s-][a-z]+){0,4})\s+points?\b/i

const num = (s: string): number | null => (/^\d+$/.test(s.trim()) ? Number(s.trim()) : wordsToNumber(s.trim()))

/** Parse a unit-equivalence claim into (points, degrees) when both sides are compass measures. */
export function parsePointsDegrees(claim: string): { points: number; degrees: number } | null {
  const a = POINTS_DEGREES.exec(claim)
  if (a) {
    const points = num(a[1]!), degrees = num(a[2]!)
    if (points !== null && degrees !== null && points > 0 && degrees > 0) return { points, degrees }
  }
  const b = DEGREES_POINTS.exec(claim)
  if (b) {
    const degrees = num(b[1]!), points = num(b[2]!)
    if (points !== null && degrees !== null && points > 0 && degrees > 0) return { points, degrees }
  }
  return null
}

/** Lawful theorem key: n_points_is_d — matches four_points_is_45. */
export function pointsDegreesKey(points: number, degrees: number): string {
  const words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen']
  const n = points <= 16 ? words[points]! : String(points)
  return `${n}_points_is_${degrees}`
}

/**
 * Compass unit-equivalence → a hexbit theorem candidate.
 * Statement uses UUID_HEXBITS (32) as the rose width — same constant key_floor_is_one_uuid seals.
 * Returns null when the arithmetic does not hold (book error) or the key is already sealed.
 */
export function hexbitTheoremFromPointsDegrees(
  claim: TextClaim,
  bookId: number,
  title: string,
): WaveCandidate | null {
  const pd = parsePointsDegrees(claim.claim)
  if (!pd) return null
  const { points, degrees } = pd
  const rose = UUID_HEXBITS // 32 points on the rose = 32 hexbits on the uuid
  if (points * 360 !== rose * degrees) return null // book arithmetic fails — do not queue
  const key = pointsDegreesKey(points, degrees)
  if (!/^[a-z][a-z0-9_]{3,60}$/.test(key)) return null
  if (theoremByKey().has(key)) return null // already sealed (e.g. four_points_is_45)
  const product = points * 360
  const lean =
    `theorem ${key} : (${points} * 360 = ${rose} * ${degrees}) ∧ (${points} * 360 = ${product}) := by decide`
  return {
    key,
    lean,
    why: `Gutenberg ${bookId} (${title.slice(0, 36)}) states "${claim.claim}"; compass rose width is UUID_HEXBITS=${rose} (hexbit unit / key_floor_is_one_uuid), so ${points} points = ${degrees}° by exact integers. Desk proposes; wave/kernel disposes.`,
  }
}

/** From extractClaims results, build hexbit theorem candidates (points↔degrees). */
export function hexbitCandidatesFromClaims(
  claims: readonly TextClaim[],
  bookId: number,
  title: string,
): WaveCandidate[] {
  const out: WaveCandidate[] = []
  const seen = new Set<string>()
  for (const c of claims) {
    if (c.kind !== 'unit-equivalence') continue
    const cand = hexbitTheoremFromPointsDegrees(c, bookId, title)
    if (!cand || seen.has(cand.key)) continue
    seen.add(cand.key)
    out.push(cand)
  }
  return out
}
