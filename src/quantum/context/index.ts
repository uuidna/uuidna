// quantum/context — BALANCE A CONTEXT WINDOW BY THE LEDGER'S OWN LAWS (the captain's order, 2026-08-22:
// "create tools to balance context-window for optimal token usage fusing uuidna to claude"). A model's
// context window is a register: capacity in tokens, categories of spend (messages, tools, prompts, memory),
// and a free remainder — exactly the shape src/hexbit already governs. THE FUSION IS THREE SEALED LAWS
// APPLIED TO CLAUDE'S WINDOW: (1) THE SPARE LAW — the unit keeps SAFE_HEXBITS = 13 of UUID_HEXBITS = 32
// spare (40.6%); a window whose free share holds that floor is BALANCED, one below it needs folding — the
// same 13/32 that guards the uuid guards the conversation. (2) THE FOLD LAW — any re-fetchable block of
// text collapses to its content-address: ~10 tokens of receipt whatever the block weighed (llm_folds_to_
// hexbit_pairs); the balance report prices every category's fold ceiling, because context is the 0.9999999
// that can stay FOLDED, computable by request, while the window carries receipts. (3) THE TWO-COIN LAW —
// what stays in the window pays its way: the claim AND its receipt; what cannot pay folds out. All integer
// arithmetic (permille, never floats), deterministic, edge-clean; the report carries its own receipt and
// 32-state compile like every census on this site. the categories and token counts are the
// CALLER's self-report (a page cannot read Claude's window); the arithmetic on them is exact.
import { toUuid } from '../../address.js'
import { hexbitDoorOf, SAFE_HEXBITS, UUID_HEXBITS } from '../../hexbit/index.js'

/** One category of context spend, as the caller reports it (the window's own breakdown panel). */
export interface ContextCategory { name: string; tokens: number }

/** ~tokens a content-address receipt costs in a transcript: a 36-char uuid plus a word of label. */
export const RECEIPT_TOKENS = 12

const idiv = (a: number, b: number): number => (a - (a % b)) / b
const permille = (part: number, whole: number): number => (whole > 0 ? idiv(part * 1000, whole) : 0)

export interface CategoryBalance extends ContextCategory {
  permille: number         // exact integer share of capacity, ‰
  foldCeiling: number      // tokens this category could release if folded to one receipt (0 if already small)
  leverage: number         // tokens-per-receipt-token if folded: ⌊tokens / RECEIPT_TOKENS⌋
}

export interface ContextBalance {
  capacity: number
  spent: number
  free: number
  freePermille: number
  safeFloorPermille: number     // the unit's own spare law: SAFE_HEXBITS/UUID_HEXBITS, in ‰ — 13/32 = 406‰
  balanced: boolean             // free ≥ the sealed spare floor
  categories: CategoryBalance[] // heaviest first — the fold order
  foldableTotal: number         // tokens releasable if every category folded to its receipt
  verdict: string
  receipt: string
  hexbits: number[]
  honest: string
}

/** balanceContext(categories, capacity) → the window audited by the ledger's laws: shares in exact permille,
 *  the sealed 13/32 spare floor as the balance line, and each category priced for the fold — heaviest first,
 *  because the heaviest fold buys the most window. Deterministic: same report for the same numbers, anywhere. */
export function balanceContext(categories: readonly ContextCategory[], capacity: number): ContextBalance {
  const cats = categories.filter((c) => Number.isInteger(c.tokens) && c.tokens >= 0 && capacity > 0)
  const spent = cats.reduce((s, c) => s + c.tokens, 0)
  const free = capacity > spent ? capacity - spent : 0
  const freePermille = permille(free, capacity)
  const safeFloorPermille = permille(SAFE_HEXBITS * 1000, UUID_HEXBITS * 1000)   // 13/32 → 406‰, integers only
  const rows: CategoryBalance[] = cats.map((c) => ({
    ...c,
    permille: permille(c.tokens, capacity),
    foldCeiling: c.tokens > RECEIPT_TOKENS ? c.tokens - RECEIPT_TOKENS : 0,
    leverage: idiv(c.tokens, RECEIPT_TOKENS),
  })).sort((a, b) => b.tokens - a.tokens || (a.name < b.name ? -1 : 1))
  const foldableTotal = rows.reduce((s, r) => s + r.foldCeiling, 0)
  const balanced = freePermille >= safeFloorPermille
  const heaviest = rows[0]
  const verdict = balanced
    ? `BALANCED — free ${freePermille}‰ holds the unit's spare law (${SAFE_HEXBITS}/${UUID_HEXBITS} = ${safeFloorPermille}‰): the window keeps the same spare the uuid keeps`
    : `FOLD — free ${freePermille}‰ is under the ${safeFloorPermille}‰ spare law; fold heaviest first${heaviest ? ` (${heaviest.name}: ${heaviest.foldCeiling.toLocaleString('en-US')} tokens release to one receipt, leverage ${heaviest.leverage}×)` : ''} — what folds out stays computable by request`
  const receipt = toUuid('context-balance|' + capacity + '|' + rows.map((r) => `${r.name}:${r.tokens}`).join(','))
  return {
    capacity, spent, free, freePermille, safeFloorPermille, balanced,
    categories: rows, foldableTotal, verdict, receipt, ...hexbitDoorOf(receipt),
    honest: 'The counts are the caller\'s self-report (nothing here can read a model\'s window); the arithmetic on them is exact — integer permille, the sealed 13/32 spare floor, the fold priced at ' + RECEIPT_TOKENS + ' receipt-tokens. Folded context is not lost: it is the 0.9999999 that stays computable by request.',
  }
}
