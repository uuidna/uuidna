// categories/coding/evasion-ticker — THE EVASION CATALOGUE WITH LIVE METRICS (lead 95, the captain's order:
// "learn all the tricks to avoid trials and lean proof explanation at school based on realtime metrics like on
// the stock market or blockchains"). The school teaches the TRICKS so students recognize them: every entry
// names the trick, the FINDER that catches it, and the SEALED theorem that convicts it — and the catalogue
// cannot itself evade, because its test refuses any entry whose seal is not in the ledger. THE TICKER is the
// market-surveillance half: metrics folded from the records the caller passes in (pure hexbit-app law — the
// generator reads files, this module only counts), every figure recomputable, the whole board folding to one
// address whose states can SING (the surveillance board with a voice — a catch is a note, never a secret).
// conduct and artifact METRICS over the tree's own records — rates and counts, never intention;
// the tricks are finite as LISTED, never as possible (no_audit_catches_all is the catalogue's own first entry
// in spirit: the lexicon grows, the board never claims completeness).
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'

export interface EvasionTrick {
  trick: string        // the move, named plainly
  finder: string       // the guard/one-receipt finder (or gate arm) that catches it
  seal: string         // the sealed theorem key that names the law it violates — MUST exist in the ledger
  lesson: string       // one honest sentence a student keeps
}

/** THE CATALOGUE — the tricks this tree has actually caught, each with its catcher and its convicting seal.
 *  Grown only by real catches; an entry without a documented catch does not enter. */
export const TRICKS: readonly EvasionTrick[] = [
  { trick: 'the laundered citation', finder: 'adjudicate relevance floor', seal: 'silence_never_refutes',
    lesson: 'a real seal cited off-topic verifies nothing — vocabulary must be shared, and one stem is not a topic' },
  { trick: 'the fabricated key', finder: 'slimGate / audit-citations', seal: 'fabricated_cite_stays_unverified',
    lesson: 'a citation the ledger never sealed drains the whole audit — and a declared control: canary is the one lawful fake' },
  { trick: 'the stem-ride', finder: 'contentWords floor (lead 86)', seal: 'a_claim_is_verified_or_unverified',
    lesson: 'one shared word cannot carry a world-scale claim onto a billing theorem' },
  { trick: 'the vacuous seal', finder: 'vacuousGaps', seal: 'unfalsifiable_excludes_nothing',
    lesson: 'a statement true regardless of content proves nothing — x = x is not a theorem, it is upholstery' },
  { trick: 'the window overclaim', finder: 'the incomplete/universal finder', seal: 'a_window_exhausts_only_itself',
    lesson: 'exhaustion proves exactly its window — a universal in the name needs a quantifier in the statement' },
  { trick: 'the affirm-only instrument', finder: 'the controls-first discipline', seal: 'no_audit_catches_all',
    lesson: 'an extractor that only affirms cannot fail, and an instrument that cannot fail proves nothing' },
  { trick: 'the banned-token mention', finder: 'harmonic-scan', seal: 'legal_only_the_proven_is_admitted',
    lesson: 'a forbidden token is forbidden in prose too — describe the thing in words, never write its literal form' },
  { trick: 'derived without its source', finder: 'the precede finder', seal: 'sealing_inverts_unverified',
    lesson: 'derived committed alone seals a ledger origin cannot recompute — source and derivative ride one commit' },
  { trick: 'the count pin', finder: 'the counts finder', seal: 'legal_refuted_iff_test_fails_uncited',
    lesson: 'a count in prose must equal the live figure or not be written — pins carry their receipt or they rot' },
  { trick: 'the say-do gap', finder: 'the hexbit polygraph (lead 98)', seal: 'denial_drains_to_the_last_coin',
    lesson: 'an announcement without its deposit is an unpaid claim — the announcement IS the deposit, one motion' },
]

export interface TickerMetric { name: string; value: number; of: number | null; unit: string }
export interface TickerBoard { metrics: TickerMetric[]; fold: string; handle: string; states: number[] }

/** THE BOARD — fold the metrics the caller measured into one addressed, singable surface. Pure over inputs:
 *  same measurements, same board, same song, any machine. */
export function tickerBoard(metrics: readonly TickerMetric[]): TickerBoard {
  const lines = metrics.map((m) => `${m.name}|${m.value}|${m.of ?? ''}|${m.unit}`).sort()
  const fold = toUuid('evasion-ticker|' + lines.join('\n'))
  const states = [...fold.replace(/-/g, '')].map((c) => parseInt(c, 16))
  return { metrics: [...metrics], fold, handle: handleOf(fold), states }
}
