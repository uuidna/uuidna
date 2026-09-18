#!/usr/bin/env node
// clay — THE CLAY PROOFS BLOCK for the README and the home page, derived from the ledger and never authored.
// It composes; the surfaces' own owners inject it, because a path may have only one writer.
//
// THE SCOPE TRAVELS WITH THE CLAIM, OR THIS SURFACE BECOMES THE OVERCLAIM IT DESCRIBES. Every Clay theorem already
// carries its own limit in its own name — "This decides the instance, never the conjecture", "the key names the
// window and not the conjecture", "the rank the conjecture is about is not touched" — written when it was sealed.
// So this block prints THE THEOREM'S OWN NAME and adds no sentence of its own. A page that summarised them would
// be a second copy of the scope, free to drift from the first; this repository spent a day on exactly that fault,
// where a wing's scope lived in one place and six derived surfaces published the claim without it (2026-09-18).
//
// The grouping is read from the names too: a Clay theorem names its problem in its first clause ("P vs NP, the
// counting argument…", "Riemann, through Mertens…"), so the problem is the text before the first comma, never a
// hand-kept map from key to problem.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { theorems } from '../index.js'
import { ROOT } from './api.js'

interface ClayRow { key: string; problem: string; name: string; tactic: string }

/** the Clay wing's theorems, grouped by the problem each names in its own first clause */
export function clayRows(): ClayRow[] {
  return theorems()
    .filter((t) => (t as { skill?: string }).skill === 'clay')
    .map((t) => {
      const name = String(t.name ?? '')
      const head = name.split(/[,:]/)[0]!.trim()
      // a first clause that is a sentence rather than a name is not a problem label; the key then stands alone
      const problem = head.length > 0 && head.length <= 48 ? head : ''
      return { key: t.key, problem, name, tactic: String((t as { tactic?: string }).tactic ?? '') }
    })
    .sort((a, b) => (a.problem === b.problem ? (a.key < b.key ? -1 : 1) : a.problem < b.problem ? -1 : 1))
}

/** the block both surfaces carry: one line per theorem, its own name as its own scope */
export function clayFragment(): string {
  const rows = clayRows()
  const named = rows.filter((r) => r.problem !== '')
  const problems = [...new Set(named.map((r) => r.problem))]
  // THE SPLIT IS READ FROM THE PROOFS, NOT ASSERTED OVER THEM. The first draft of this block said "each decides a
  // finite instance and never the conjecture", which is the disclaimer the decided wings carry — and it is FALSE
  // for most of this one: only a third are `by decide` over a finite domain. The rest are universals proven by
  // induction and rewriting — ∀ a b k for cancellation, ∀ f n for the telescoping divergence, ∀ x y for the
  // sum-of-squares bound, ∀ f n for "a diffusion step never increases energy". Understating a general theorem is
  // as dishonest as overstating an instance, and a summary written ACROSS a set is exactly the second copy of the
  // scope this file exists to avoid. So the counts are derived and each theorem still speaks for itself.
  const decided = rows.filter((r) => r.tactic === 'decide').length
  const proved = rows.length - decided
  const lines = [
    `**Clay proofs.** ${rows.length} sealed theorems stand on the Millennium problems, across ${problems.length} named approaches:`,
    `${decided} decided by the kernel over a finite domain, ${proved} proven as universals by induction and rewriting.`,
    'Each carries its own scope in its own words, written when it was sealed:',
    '',
  ]
  for (const r of rows) lines.push(`- \`${r.key}\` — ${r.name}`)
  lines.push('')
  lines.push('None of these claims a Millennium problem. A verified theorem proves its exact statement — no less than it says,')
  lines.push('and no more: where one holds on a window because the conjecture is false in general, its own key names the window.')
  return lines.join('\n')
}

export const CLAY_BEGIN = '<!-- clay:begin -->'
export const CLAY_END = '<!-- clay:end -->'

/** clayBlock(text) → the text with the Clay block replaced between its markers, or appended once if it has none.
 *
 *  ONE OWNER PER PATH. This used to WRITE README.md and docs/index.md itself, which gave both files two declared
 *  writers — gen-readme and gen-unlocks already own them — and the drain refuses that: two owners is drift waiting
 *  to happen, because each will one day overwrite what the other put there. So this composes the block and the
 *  owners inject it, the way gen-unlocks already injects its own (2026-09-18). */
export function clayBlock(text: string): string {
  const block = `${CLAY_BEGIN}\n${clayFragment()}\n${CLAY_END}`
  return text.includes(CLAY_BEGIN) && text.includes(CLAY_END)
    ? text.replace(new RegExp(`${CLAY_BEGIN}[\\s\\S]*?${CLAY_END}`), block)
    : text.trimEnd() + `\n\n${block}\n`
}
