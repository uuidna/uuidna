// latex-crosscheck — THE PAPER AND THE WINGS PROVE EACH OTHER, AND THEIR DISAGREEMENTS ARE THE LEADS.
//
// WHY A PAIR AND NOT A CHECK. A surface that agrees with itself is not corroboration, and this tree has paid for
// that lesson repeatedly. On 2026-09-20 it paid again in the purest form: a theorem was proved by the kernel into
// lean/Relativity.lean and was absent from src/theorems/generated.ts, from lean/axioms.json and from the paper —
// and the axiom witness read holds:true throughout, because the ledger and the audit agreed with each other while
// both were missing the same theorem. Two surfaces sharing an input witness nothing about that input BY
// CONSTRUCTION — a shared error reaches both readings identically, so their agreement carries no information about
// it. So this reads three
// surfaces derived along DIFFERENT paths and reports every place they part company:
//
//   WINGS   lean/*.lean          — what the Lean kernel actually verified, sorry-free
//   LEDGER  theorems()           — what the ledger serves to every door and page
//   PAPER   uuidna-ledger.tex    — what is published, carrying each theorem's own printed content-address
//
// THE PAPER IS SELF-ATTESTING, which is what makes one comparison need no second surface at all: beside every
// statement it prints that statement's content-address, so the paper can be checked against ITSELF — recompute the
// address from the Lean line the paper printed and compare it to the address printed beside it. A paper that
// disagrees with its own arithmetic is broken on its face, and nothing shared can hide that.
//
// EVERY DISAGREEMENT IS A LEAD, NOT A FIX. A lead is where two surfaces that must agree do not, and one finder
// reading clean is never evidence. So this NAMES what it found and settles nothing: a lead enters the record only
// through the trial door, by the law that all leads go to trial before entering any list.
//
// THE HOST IS ASKED, NEVER IMPORTED. This module is reached by worker.js through the MCP catalogue, and Cloudflare
// rejects a static `node:` import in ANY uploaded module — at UPLOAD, so a dry run bundles it happily, reports
// success, and the deploy simply never appears. src/boundary.ts is the one declared place that reach is made, and
// it answers null where there is no filesystem, so this reads through it and says UNMEASURED at the edge instead
// of breaking the worker.
import { hostFs } from './boundary.js'
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

const LEAN_LINE = /^theorem\s+([A-Za-z0-9_']+)\s*:\s*([\s\S]*?)\s*:=\s*by\b/

/** ONE CLAIM, ONE SPELLING. A declaration split across lines is the same statement as one written on a single line,
 *  so both readings are flattened before they are compared — otherwise 36 theorems read as saying two different
 *  things when the only difference was a line break. */
const flat = (x: string): string => x
  // A LEAN COMMENT IS NOT PART OF THE CLAIM. The wing files carry `--` notes inside the statement text and the
  // ledger strips them, which is why every address the paper prints recomputes from the stripped form. Comparing
  // the raw wing text against the canonical one read five theorems as saying two different things when the only
  // difference was a remark a human left for a human.
  .replace(/--[^\n]*/g, ' ')
  .trim().replace(/\s+/g, ' ')

/** the swept span is ONE statement at 65536 stations, and the paper publishes it once on purpose — counting each
 *  station as unpublished is the detector counting itself, which is why the family is vetoed here as it is in the
 *  discovery sweep. */
const swept = (key: string): boolean => /^enumeration_hex4_[0-9a-f]{4}$/.test(key)

export interface CrosscheckLead { kind: string; key: string; why: string }
export interface Crosscheck {
  surfaces: { wings: number; ledger: number; paper: number; selfChecked: number }
  leads: CrosscheckLead[]
  byKind: Record<string, number>
  /** true ONLY when all three surfaces were read AND none disagreed — never true for a surface that was absent */
  agree: boolean
  /** why this reading decides nothing, when a surface could not be read at all */
  unmeasured?: string
  receipt: string
  honest: string
}

const fromWings = (root: string): Map<string, string> => {
  const out = new Map<string, string>()
  if (hostFs === null) return out
  const dir = hostFs.path.join(root, 'lean')
  if (!hostFs.existsSync(dir)) return out
  // WHOLE FILE, NOT LINE BY LINE. A Lean declaration may put its name on one line and its statement and tactic on
  // the next, and 40 of them do — exactly the gap between the wings this read and the ledger, which is how the
  // fault was caught: a difference that matches another difference exactly is one defect seen twice, not two
  // findings. Read line by line, those 40 read as published-but-not-proved when every one of them is proved.
  const DECL = /^theorem\s+([A-Za-z0-9_']+)\s*:\s*([\s\S]*?)\s*:=\s*by\b/gm
  let names: string[]
  // a directory that is not there is not a wing set that is empty — the caller tells them apart by the count
  try { names = hostFs.readdirSync(dir, { withFileTypes: true }).map((d) => d.name).filter((n) => n.endsWith('.lean')) }
  catch { return out }
  for (const f of names) {
    const text = hostFs.readFileSync(hostFs.path.join(dir, f), 'utf8')
    for (let m = DECL.exec(text); m !== null; m = DECL.exec(text)) out.set(m[1]!, flat(m[2]!))
  }
  return out
}

const fromPaper = (root: string): Map<string, { statement: string; printed: string }> => {
  const out = new Map<string, { statement: string; printed: string }>()
  if (hostFs === null) return out
  const p = hostFs.path.join(root, 'docs/public/uuidna-ledger.tex')
  // BLOCK BY BLOCK, NOT ONE SWEEPING MATCH. A single lazy pattern across the whole file swallowed several theorem
  // blocks per match and read 1458 of 5499 — a parser reporting 74% of the paper missing when nothing was missing
  // at all. Splitting on the block delimiter first means one theorem can never absorb its neighbours.
  // A PAPER THAT IS NOT THERE IS NOT A PAPER THAT IS EMPTY — the caller tells them apart by the count, which is
  // why this returns nothing rather than throwing.
  let text: string
  try { text = hostFs.readFileSync(p, 'utf8') } catch { return out }
  for (const chunk of text.split('\\begin{theorem}').slice(1)) {
    // THE THEOREM LINE IS THE ANCHOR, NOT THE LISTING THAT WRAPS IT. The paper carries 9540 lstlisting blocks across
    // 5499 theorems — some blocks hold two — so taking the first listing in a chunk often took something that was
    // not the theorem, and the chunk was then dropped. A line beginning `theorem ` at column one occurs exactly
    // 5499 times, once per block, which is the unambiguous anchor. The listing was never load-bearing.
    const t = chunk.match(/^theorem\s+([A-Za-z0-9_']+)\s*:\s*([\s\S]*?)\s*:=\s*by\b/m)
    const addr = chunk.match(/Content-address \\texttt\{([0-9a-f-]+)\}/)
    if (t === null || addr === null) continue
    out.set(t[1]!, { statement: flat(t[2]!), printed: addr[1]! })
  }
  return out
}

/** latexCrosscheck(root) → the three surfaces, and every place they disagree, as leads for the trial door. */
export function latexCrosscheck(root: string): Crosscheck {
  const wings = fromWings(root)
  const paper = fromPaper(root)
  const ledger = new Set(theorems().map((t) => t.key))
  const leads: CrosscheckLead[] = []

  // (a) THE PAPER AGAINST ITSELF — needs no second surface, so nothing shared can hide the fault
  for (const [key, { statement, printed }] of paper) {
    const recomputed = toUuid(key + ':' + statement)
    if (recomputed !== printed) {
      leads.push({ kind: 'paper-disagrees-with-itself', key,
        why: `the paper prints ${printed} beside a statement whose address recomputes to ${recomputed}` })
    }
  }
  // (b) PROVED AND INVISIBLE — the kernel verified it; the ledger or the paper never heard of it
  for (const key of wings.keys()) {
    if (swept(key)) continue
    if (!ledger.has(key)) leads.push({ kind: 'proved-but-not-in-the-ledger', key, why: 'the kernel verified this wing line and the ledger does not serve it' })
    else if (!paper.has(key)) leads.push({ kind: 'proved-but-not-published', key, why: 'the ledger serves it and the paper does not carry it' })
  }
  // (c) PUBLISHED AND UNPROVED — the dangerous direction, because a reader takes the paper at its word
  for (const key of paper.keys()) {
    if (!wings.has(key)) leads.push({ kind: 'published-but-not-proved', key, why: 'the paper carries this theorem and no wing line proves it' })
  }
  // (d) THE SAME KEY, TWO STATEMENTS — agreement on a name is not agreement on a claim
  for (const [key, { statement }] of paper) {
    const w = wings.get(key)
    if (w !== undefined && w !== statement) {
      leads.push({ kind: 'same-key-different-statement', key,
        why: `the wing proves "${w.slice(0, 70)}" and the paper publishes "${statement.slice(0, 70)}"` })
    }
  }

  // A SURFACE THAT COULD NOT BE READ IS NOT A SURFACE THAT AGREED. At the edge there is no filesystem, so the wings
  // and the paper read as empty maps — every comparison above then skips and this would report perfect agreement
  // having compared nothing. That is the exact defect this tree keeps catching: an action that was ABSENT reporting
  // success. An unread surface is stated as unread and decides nothing either way.
  const missing = [wings.size === 0 ? 'the wings (lean/*.lean)' : '', paper.size === 0 ? 'the paper (uuidna-ledger.tex)' : ''].filter((x) => x !== '')
  const unmeasured = missing.length > 0
    ? 'not measured: ' + missing.join(' and ') + ' could not be read here, so nothing was compared — this answers UNMEASURED, never agreement'
    : undefined

  const byKind: Record<string, number> = {}
  for (const l of leads) byKind[l.kind] = (byKind[l.kind] ?? 0) + 1
  return {
    surfaces: { wings: wings.size, ledger: ledger.size, paper: paper.size, selfChecked: paper.size },
    leads, byKind, agree: unmeasured === undefined && leads.length === 0, ...(unmeasured !== undefined ? { unmeasured } : {}),
    receipt: merkleGravity(leads.map((l) => toUuid(l.kind + '|' + l.key))),
    honest: 'Three surfaces derived along different paths: the kernel-verified wings, the ledger every door serves, ' +
      'and the published paper, which carries its own recomputable address beside each statement. A disagreement is ' +
      'a LEAD and nothing here settles one — a lead enters the record only through the trial door. Agreement is not ' +
      'proof that the ledger is right, only that these three readings of it have not drifted apart.',
  }
}
