// axiom-reach — COMPLETING THE AXIOM INDEX: which wing definitions are explained by a theorem, counting the ones
// a theorem reaches THROUGH another definition.
//
// WHY THE INDEX WAS NOT YET COMPLETE. axiomIndex() asks a precise question — which theorem STATEMENTS name this
// def — and answers it correctly: 93 of 112 defs are named by at least one theorem, and it calls the other 19
// `unused`. Reading those 19 is what showed the word is wrong. They are lxorAux (nine wings), nthR (four), popAux
// (two), bitOf, av, bv, units9 — every one of them a recursion helper or a small vocabulary list that a CITED def
// is defined in terms of. `def lxor (a b : Nat) : Nat := lxorAux 8 a b`, and lxor is cited by abo_klein_four. So
// lxorAux is not unexplained vocabulary; it is one hop from a theorem, and the index measured direct citation
// while the report said "unused".
//
// THE SAME FAULT SHAPE THIS TREE HAS PAID FOR TWICE: a measurement that asks one question and reports another.
// audit-citations asked "points at a proof" and reported "backed by one"; a table census measured theorem count
// and reported enumerated cases. The fix in both was to partition rather than to relabel, and that is the fix
// here: DIRECT, REACHED (with the chain that reaches it), and ORPHAN. Only an orphan is a gap in the research,
// and "the axiom index is full" means the orphan set is empty — a claim that can now be checked instead of felt.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { THEOREMS, axiomIndex, type WingDefEntry } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { ROOT } from './boundary.js'

/** Every `def NAME` in a wing, with the source span of its body. */
const DEF_RE = /^def\s+([A-Za-z_][A-Za-z0-9_'!?]*)/gm

/** defBodies(file) → each def in the wing mapped to the source text of its body (up to the next top-level decl). */
export function defBodies(leanFile: string): Map<string, string> {
  const path = join(ROOT, 'lean', leanFile)
  const out = new Map<string, string>()
  if (!existsSync(path)) return out
  const src = readFileSync(path, 'utf8')
  const starts: { name: string; at: number }[] = []
  for (const m of src.matchAll(DEF_RE)) starts.push({ name: m[1]!, at: m.index ?? 0 })
  // A body runs to the next TOP-LEVEL declaration — another def, a theorem, or an example. Anything indented
  // belongs to the current def, which is what makes the pattern-match arms part of the body they belong to.
  const nextTop = /^(?:def|theorem|example|abbrev|instance|end)\b/gm
  for (let i = 0; i < starts.length; i++) {
    const s = starts[i]!
    nextTop.lastIndex = s.at + 1
    let end = src.length
    for (let m = nextTop.exec(src); m; m = nextTop.exec(src)) {
      if ((m.index ?? 0) > s.at) { end = m.index ?? src.length; break }
    }
    out.set(s.name, src.slice(s.at, end))
  }
  return out
}

export interface DefReach {
  file: string
  def: string
  principle: string
  /** a theorem statement names this def outright */
  direct: boolean
  /** the chain from a directly-cited def down to this one, e.g. ['lxor', 'lxorAux'] */
  via: string[]
  /** nothing a theorem cites reaches this def — the only real gap */
  orphan: boolean
  /**
   * The generated index lists this def and the wing on disk no longer defines it: a STALE INDEX, not an orphan.
   *
   * WHY THE DISTINCTION EARNS ITS KEYSTROKES. The two inputs here have different freshness by construction — the def
   * list comes from src/theorems/generated.ts and the bodies are read from lean/*.lean — and reconcile runs the JS
   * controls BEFORE it rewrites generated.ts. So adding a wing, or removing one dead definition, makes the index
   * disagree with the disk, the partition theorem's control fails, and the failure LOOKS exactly like unexplained
   * vocabulary. Measured 2026-09-26: one removed helper took four reconcile passes to land, each pass surfacing one
   * link of a chain that was really one fact — the index had not caught up. Reported as staleness the cure is
   * `generate`, and reported as an orphan the cure is an argument about vocabulary. Naming it is the difference
   * between one informed pass and four blind ones.
   */
  stale: boolean
  theoremCount: number
}

export interface AxiomReach {
  defs: number
  direct: number
  reached: number
  orphans: DefReach[]
  /** direct + reached — every def a theorem accounts for, one way or the other */
  explained: number
  /** defs the generated index still lists that the wings on disk no longer define */
  stale: DefReach[]
  full: boolean
  entries: DefReach[]
  receipt: string
}

/** axiomReach() → the completed index: every wing def as DIRECT, REACHED (with its chain), or ORPHAN. */
export function axiomReach(): AxiomReach {
  const index = axiomIndex()
  const byFile = new Map<string, WingDefEntry[]>()
  for (const e of index.entries) {
    const list = byFile.get(e.file)
    if (list) list.push(e)
    else byFile.set(e.file, [e])
  }
  const entries: DefReach[] = []
  for (const [file, defs] of [...byFile].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))) {
    const bodies = defBodies(file)
    const names = defs.map((d) => d.def)
    // WHO REFERENCES WHOM, within the wing. Self-reference is dropped: a recursive def does not explain itself.
    const refs = new Map<string, Set<string>>()
    for (const name of names) {
      const body = bodies.get(name) ?? ''
      const set = new Set<string>()
      for (const other of names) {
        if (other === name) continue
        if (new RegExp(`(?<![A-Za-z0-9_'])${other.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9_'])`).test(body)) set.add(other)
      }
      refs.set(name, set)
    }
    // Walk OUT from every directly-cited def, so each reached def carries the chain that explains it.
    const direct = new Set(defs.filter((d) => d.theoremCount > 0).map((d) => d.def))
    const chainOf = new Map<string, string[]>()
    let frontier = [...direct].sort().map((d) => [d] as string[])
    while (frontier.length) {
      const next: string[][] = []
      for (const chain of frontier) {
        for (const child of [...(refs.get(chain[chain.length - 1]!) ?? [])].sort()) {
          if (direct.has(child) || chainOf.has(child)) continue
          chainOf.set(child, [...chain, child])
          next.push([...chain, child])
        }
      }
      frontier = next
    }
    for (const d of defs) {
      const isDirect = direct.has(d.def)
      const via = chainOf.get(d.def) ?? []
      // a def the index names that the wing does not define any more: the index is behind the disk
      const stale = bodies.size > 0 && !bodies.has(d.def)
      entries.push({
        file, def: d.def, principle: d.principle,
        direct: isDirect,
        via,
        // STALENESS IS NOT AN ORPHAN. A def that is gone from the wing cannot be unexplained vocabulary; it is a
        // reading taken before the tree settled, and calling it an orphan sends the next session to argue about
        // vocabulary that no longer exists.
        orphan: !isDirect && via.length === 0 && !stale,
        stale,
        theoremCount: d.theoremCount,
      })
    }
  }
  const orphans = entries.filter((e) => e.orphan)
  const stale = entries.filter((e) => e.stale)
  const directN = entries.filter((e) => e.direct).length
  const reachedN = entries.filter((e) => !e.direct && !e.orphan).length
  return {
    defs: entries.length,
    direct: directN,
    reached: reachedN,
    orphans,
    explained: directN + reachedN,
    /** defs the index still lists that the wings no longer define — run `generate`, do not argue about vocabulary */
    stale,
    // `full` still requires no orphan AND no stale entry, because a census taken against a stale index has not
    // measured the tree it claims to describe. What changes is the REASON a reader is given.
    full: orphans.length === 0 && stale.length === 0,
    entries,
    receipt: merkleFold([
      toUuid('axiom-reach|' + entries.length + '|' + directN + '|' + reachedN),
      ...orphans.map((o) => toUuid('orphan|' + o.file + '|' + o.def)),
      ...stale.map((o) => toUuid('stale|' + o.file + '|' + o.def)),
    ]),
  }
}

/** axiomReachGaps() → the guard's shape. An ORPHAN def is vocabulary no theorem accounts for. */
export function axiomReachGaps(): { what: string; fix: string }[] {
  const r = axiomReach()
  if (r.full) return []
  // A STALE INDEX HAS ITS OWN CURE, and it is not an argument about vocabulary. Reported first, because when both
  // appear the staleness explains the orphans rather than the other way round.
  if (r.stale.length > 0) return [{
    what: `the axiom index lists ${r.stale.length} definition(s) the wings no longer define (${r.stale.slice(0, 4).map((e) => e.file + '::' + e.def).join(', ')}${r.stale.length > 4 ? ', …' : ''}) — the index is behind the disk, not the tree unexplained`,
    fix: 'node dist/scripts/generate.js && npm run build — reconcile runs the JS controls BEFORE it rewrites src/theorems/generated.ts, so a wing added or a dead definition removed makes the index disagree with lean/*.lean for exactly one pass',
  }]
  return [{
    what: `${r.orphans.length} wing definition(s) are reached by NO theorem, directly or through another def: `
      + r.orphans.slice(0, 10).map((o) => `${o.file}:${o.def}`).join(', '),
    fix: 'either seal a theorem whose statement uses it (directly, or through a def that does), or delete it — '
      + 'a definition no theorem reaches is vocabulary the research does not use, and the axiom index is not full '
      + 'while it stands. Theorem count is unaffected either way, so there is nothing to lose by removing it.',
  }]
}

/** theoremsExplaining(file, def) → the theorems that account for one def, whether directly or through a chain. */
export function theoremsExplaining(file: string, def: string): { direct: boolean; via: string[]; theorems: string[] } {
  const r = axiomReach()
  const e = r.entries.find((x) => x.file === file && x.def === def)
  if (!e) return { direct: false, via: [], theorems: [] }
  const root = e.direct ? def : (e.via[0] ?? '')
  const theorems = THEOREMS.filter((t) => t.file === file && (t.statement ?? '').includes(root)).map((t) => t.key)
  return { direct: e.direct, via: e.via, theorems }
}
