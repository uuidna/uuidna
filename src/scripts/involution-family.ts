// involution-family — the court's involutions, declared ONCE. lean-involutions emits one wing per involution from
// this, lean-ledger titles the wings from this, and gen-witness-seals folds the 2×7 wave receipt through
// witnessSealsOf here, so neither a file name, a title nor a face number is typed in a second place.
//
// ONE INVOLUTION TO A FILE. Each wing states one refuted lead as `def lead_<handle> : Prop` and proves
// `theorem involution_<handle> : ¬ lead_<handle>`. Two of them define a different `dz` (ef58b583 over lean/Phase.lean,
// 2d552f1f over the stroke rule), so they cannot share a file, and a file is the unit the kernel compiles and saves.
//
// EVERY OBJECT IS READ FROM ITS SOURCE, never pasted. The lead text comes from lean/leads.json, found by recomputing its
// handle (an index moves when the file does). The seven rays come from src/dimensions.ts; the generator manifest from
// the one GENERATORS declaration in src/scripts/generate.ts; reconcile's direct runs from its run() calls; the dormant
// list from lean/dormant-scripts.json; dz and dbl from lean/Phase.lean; and the stroke rule from the lean/Sequence.lean
// that lean/findings.json names as the commit which retired the lead. generate.ts and reconcile.ts are read as text
// because importing either one RUNS it — both are scripts whose top level is the work.
//
// A MODULE WITH NO SIDE EFFECTS. lean-all imports every lean-*.js for its top level, and scripts/run.ts imports every
// script the same way, so a script cannot carry a main-guard. What the emitter, the ledger's titles, the seal writer
// and their tests share lives here, where importing computes nothing.
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { DIMENSIONS } from '../dimensions.js'
import { VE_FACES } from '../hexbit/index.js'
import { docComment, gcdOf, unitsOf, MAXBUF, type Fact } from './lean-gen.js'

const readText = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8')
const readJson = <T>(rel: string): T => JSON.parse(readText(rel)) as T

export interface LeadRow { lead: string; killed_by?: string; replaced_by?: string }
export interface InvolutionWing { handle: string; file: string; title: string; summary: string }
export interface WingText { file: string; header: string; defs: string; facts: Fact[] }

/** leadOf(handle, rows?) → the one refuted row whose lead text addresses to this handle — recomputed, never indexed */
export function leadOf(handle: string, rows: readonly LeadRow[] = readJson<{ refuted: LeadRow[] }>('lean/leads.json').refuted): LeadRow {
  const hit = rows.filter((r) => handleOf(toUuid(r.lead)) === handle)
  if (hit.length !== 1) throw new Error(`involution ${handle}: ${hit.length} refuted rows of lean/leads.json address to this handle; a wing states exactly one lead`)
  return hit[0]!
}

// ── READING LEAN AND TYPESCRIPT SOURCES ─────────────────────────────────────────────────────────────────────────

export interface DefBlock { name: string; text: string }
/** defBlocks(lean) → every top-level `def` with its indented continuation lines, in the order the file declares them */
export function defBlocks(lean: string): DefBlock[] {
  const out: DefBlock[] = []
  let cur: string[] | null = null
  const flush = (): void => {
    if (cur) { const text = cur.join('\n'); out.push({ name: /^def\s+([^\s(:]+)/.exec(text)![1]!, text }) }
    cur = null
  }
  for (const line of lean.split('\n')) {
    if (/^def\s/.test(line)) { flush(); cur = [line] } else if (cur && /^\s+\S/.test(line)) cur.push(line); else flush()
  }
  flush()
  return out
}
const codeOf = (text: string): string => text.replace(/\/-[\s\S]*?-\//g, ' ').replace(/--.*$/gm, ' ')
const mentions = (text: string, name: string): boolean => new RegExp(`(^|[^\\w.'])${name}(?![\\w'])`).test(codeOf(text))
/** closureOf(blocks, roots) → the defs the roots' code reaches, transitively, in declaration order. A name in a
 *  comment reaches nothing: the historical Sequence.lean says "the vortex tour" beside a def that never calls tour. */
export function closureOf(blocks: readonly DefBlock[], roots: string): DefBlock[] {
  const kept = new Set<string>()
  let frontier = roots
  for (;;) {
    const fresh = blocks.filter((b) => !kept.has(b.name) && mentions(frontier, b.name))
    if (!fresh.length) break
    for (const b of fresh) kept.add(b.name)
    frontier = fresh.map((b) => b.text).join('\n')
  }
  return blocks.filter((b) => kept.has(b.name))
}
const withoutLineComments = (src: string): string => src.replace(/^\s*\/\/.*$/gm, '')
/** generatorFilesOf(generate.ts) → the `file` of every GENERATORS entry, in manifest order, from its one declaration */
export function generatorFilesOf(source: string): string[] {
  const block = /const GENERATORS\b[^=]*=\s*\[([\s\S]*?)\n\]/.exec(source)
  if (!block) throw new Error('src/scripts/generate.ts declares no GENERATORS manifest; involution b13fd37a reads the manifest from there')
  return [...withoutLineComments(block[1]!).matchAll(/\bfile:\s*'([^']+)'/g)].map((m) => m[1]!)
}
/** reconcileRunsOf(reconcile.ts) → every dist script reconcile runs directly, in the order its run() calls name them */
export function reconcileRunsOf(source: string): string[] {
  return [...withoutLineComments(source).matchAll(/\brun\(\s*'node dist\/scripts\/([\w.-]+\.js)/g)].map((m) => m[1]!)
}

// ── LEAN TEXT ────────────────────────────────────────────────────────────────────────────────────────────────────

const leanStrings = (xs: readonly string[]): string => '[' + xs.map((x) => JSON.stringify(x)).join(', ') + ']'
/** memProof(i) → the membership proof of a list's i-th entry. Core's `decide` on String membership borrows propext
 *  (probed under Lean 4.33), so the proof is built from the index the generator computed. */
export const memProof = (i: number): string => 'List.Mem.tail _ ('.repeat(i) + 'List.Mem.head _' + ')'.repeat(i)
const block = (doc: string, text: string): string => docComment(doc) + text
/** said(text) → the text as a sentence, so prose appended after a lead does not run into it */
const said = (text: string): string => (/[.!?]$/.test(text.trim()) ? text.trim() : text.trim() + '.')

// ── THE FOUR INVOLUTIONS ─────────────────────────────────────────────────────────────────────────────────────────

type Built = Omit<WingText, 'file'>
type Builder = (handle: string, row: LeadRow) => Promise<Built>

/** e92de628 — "42 tiles 432": the pair grid divides the full grid, at the lead's own wing count. */
const e92de628: Builder = async (h, row) => {
  const { PROJECTED } = await import('../grid.js')
  const { PAIR_SEATS } = await import('../pairs.js')
  const m = /^(\d+) tiles (\d+)\b/.exec(row.lead)
  if (!m) throw new Error(`involution ${h}: the lead no longer reads "<pair> tiles <full>"`)
  const claimPair = Number(m[1]), claimFull = Number(m[2])
  const n = DIMENSIONS.length, pair = n * (n - 1), rays = PROJECTED.length
  if (claimFull % rays !== 0) throw new Error(`involution ${h}: ${claimFull} is not a whole number of wings over ${rays} projected rays`)
  const wings = claimFull / rays
  const boundHolds = (d: number, v: number): boolean => {
    const q = (v - (v % d)) / d
    for (let j = 0; j < q + 1; j++) if (d * j === v) return false
    return d * (q + 1) > v
  }
  const defs = [
    block('DIMENSIONS, src/dimensions.ts: the seven locale rays.', `def dimensions : List String := ${leanStrings([...DIMENSIONS])}`),
    block('PROJECTED, src/grid.ts: DIMENSIONS.slice(1), the rays a wing is projected into, the identity ray removed.', 'def projected : List String := dimensions.drop 1'),
    block('The pair grid as pairsGaps (src/grid.ts) and PAIR_SEATS (src/pairs.ts) count it: every ordered pair of distinct dimensions, n × (n − 1).', 'def pairGrid : Nat := dimensions.length * (dimensions.length - 1)'),
    block('The full grid at a wing count as gridSeats (src/grid.ts) counts it: projected rays × wings.', 'def fullGrid (wings : Nat) : Nat := projected.length * wings'),
    block(`The claim's wing count: the lead's own full grid, ${claimFull}, read back through the ${rays} projected rays. It is the historical count src/grid.ts records (the grid measured ${rays} × ${wings} = ${claimFull} when the ledger held ${wings} wings), kept because it is the lead's number; the live grid is the projected rays times the live wings.`, `def historicalWings : Nat := ${wings}`),
    block(row.lead, `def lead_${h} : Prop := pairGrid ∣ fullGrid historicalWings`),
  ].join('\n\n')
  const facts: Fact[] = [
    { key: `not_dvd_of_bound_${h}`,
      name: 'Non-divisibility from a bounded search: if no multiplier below n / d + 1 reaches n, and that bound already overshoots n, then d does not divide n. Core\'s decision for ∣ borrows propext, so the bound is argued here instead.',
      js: () => boundHolds(pair, rays * wings) && boundHolds(n, wings),
      lean: `theorem not_dvd_of_bound_${h} : ∀ d n : Nat, (∀ j, j < n / d + 1 → d * j ≠ n) → ¬ d * (n / d + 1) ≤ n → ¬ d ∣ n := by
  intro d n hsmall hover ⟨k, hk⟩
  cases Nat.lt_or_ge k (n / d + 1) with
  | inl hlt => exact hsmall k hlt hk.symm
  | inr hge =>
    have h1 : d * (n / d + 1) ≤ d * k := Nat.mul_le_mul_left d hge
    exact hover (hk ▸ h1)` },
    { key: `involution_${h}`,
      name: `The kernel refutes lead ${h}: the pair grid does not divide the full grid at the claim's ${wings} wings.`,
      js: () => (rays * wings) % pair !== 0,
      lean: `theorem involution_${h} : ¬ lead_${h} := by
  exact not_dvd_of_bound_${h} pairGrid (fullGrid historicalWings) (by decide) (by decide)` },
    { key: `anatomy_${h}`,
      name: `Where the two widths part: the pair grid is ${claimPair} and the full grid ${claimFull}, their greatest common divisor is the ${rays} projected rays, and the ${n} dimensions do not divide the ${wings} wings.`,
      js: () => pair === claimPair && PAIR_SEATS === pair && rays * wings === claimFull && gcdOf(pair, claimFull) === rays && wings % n !== 0,
      lean: `theorem anatomy_${h} : pairGrid = ${claimPair} ∧ fullGrid historicalWings = ${claimFull} ∧ Nat.gcd pairGrid (fullGrid historicalWings) = projected.length ∧ ¬ (dimensions.length ∣ historicalWings) := by
  exact ⟨by decide, by decide, by decide, not_dvd_of_bound_${h} dimensions.length historicalWings (by decide) (by decide)⟩` },
  ]
  return { header: headerOf(h), defs, facts }
}

/** b13fd37a — "three generators are owned by nothing": none of them runs in reconcile, and all sit in the dormant list. */
const b13fd37a: Builder = async (h, row) => {
  const named = [...new Set(row.lead.match(/\bgen-[a-z]+(?:-[a-z]+)*/g) ?? [])]
  if (!named.length) throw new Error(`involution ${h}: the lead names no gen-* generator`)
  const manifest = generatorFilesOf(readText('src/scripts/generate.ts'))
  const direct = reconcileRunsOf(readText('src/scripts/reconcile.ts'))
  if (!direct.includes('generate.js')) throw new Error(`involution ${h}: reconcile.ts no longer runs generate.js, so the manifest is not part of what reconcile runs`)
  const dormant = readJson<{ scripts: string[] }>('lean/dormant-scripts.json').scripts
  const runs = [...direct, ...manifest]
  const asJs = named.map((g) => g + '.js'), asTs = named.map((g) => g + '.ts')
  const iN = asJs.findIndex((g) => runs.includes(g))
  if (iN < 0) throw new Error(`involution ${h}: reconcile runs none of ${named.join(', ')}, so the lead holds and there is nothing to refute`)
  const g = asJs[iN]!, iR = runs.indexOf(g)
  const where = iR < direct.length ? `direct script ${iR} of reconcile.ts` : `entry ${iR - direct.length} of the manifest, after reconcile's ${direct.length} direct scripts`
  const defs = [
    block('The generators the lead names, read from its text, as generate.ts spells them (dist/scripts/<name>.js).', `def namedGeneratorsJs : List String := ${leanStrings(asJs)}`),
    block('The same generators as lean/dormant-scripts.json spells them (src/scripts/<name>.ts).', `def namedGeneratorsTs : List String := ${leanStrings(asTs)}`),
    block('GENERATORS (src/scripts/generate.ts): the file of every entry, in manifest order, which is the list generate.js runs.', `def generateManifest : List String :=\n  ${leanStrings(manifest)}`),
    block('Every dist script src/scripts/reconcile.ts runs directly, in the order its run() calls name them.', `def reconcileDirect : List String :=\n  ${leanStrings(direct)}`),
    block('What reconcile runs: its direct scripts and then, because generate.js is among them, every entry of the manifest.', 'def reconcileRuns : List String := reconcileDirect ++ generateManifest'),
    block('lean/dormant-scripts.json, scripts.', `def dormantScripts : List String :=\n  ${leanStrings(dormant)}`),
    block(`${said(row.lead)} Stated without the "nor audit" clause: the Prop is implied by the lead, so refuting it refutes the lead.`,
      `def lead_${h} : Prop :=\n  (∀ g ∈ namedGeneratorsJs, g ∉ reconcileRuns) ∧\n  (∀ g ∈ namedGeneratorsTs, g ∈ dormantScripts)`),
  ].join('\n\n')
  const facts: Fact[] = [
    { key: `reconciled_${h}`,
      name: `reconcile runs ${g}: it is ${where}.`,
      js: () => runs[iR] === g,
      lean: `theorem reconciled_${h} : ${JSON.stringify(g)} ∈ reconcileRuns := by\n  exact ${memProof(iR)}` },
    { key: `involution_${h}`,
      name: `The kernel refutes lead ${h}: reconcile runs ${g}, one of the generators the lead says reconcile does not run.`,
      js: () => asJs.some((x) => runs.includes(x)),
      lean: `theorem involution_${h} : ¬ lead_${h} := by\n  exact fun hl => hl.1 ${JSON.stringify(g)} (${memProof(iN)}) reconciled_${h}` },
  ]
  return { header: headerOf(h), defs, facts }
}

/** ef58b583 — REFUSED BY ITS WITNESS, so it is not built (re-witness wf_f357da7a, witness 6, faithfulness): the wing ran
 *  the alternation dz-first from every seed where the source (src/separation.test.ts) runs doubling first from seed 1,
 *  and the ledger records the lead as held ("PAID / SEALED"); the kernel's refutation reached only dz's fixed points.
 *  Not built until a statement of the lead a witness judges faithful exists; the refused builder is in git history
 *  (it read lean/Phase.lean's dz and dbl and src/separation.ts's reach). */

/** 2d552f1f — "reflection conserves the stroke budget (four falling, five rising)". */
const d2d552f1f: Builder = async (h, row) => {
  const { dz } = await import('../separation.js')
  const { VORTEX_SEQUENCE } = await import('../sequence-field.js')
  if (!row.replaced_by) throw new Error(`involution ${h}: the lead names no theorem that replaced it`)
  const findings = readJson<Record<string, unknown>>('lean/findings.json')
  const closing = Object.values(findings).filter(Array.isArray).flat()
    .filter((r): r is { where: string; closed_by: string } => typeof r?.where === 'string' && typeof r?.closed_by === 'string'
      && r.where.endsWith('.lean') && r.closed_by.includes(row.replaced_by!))
  if (closing.length !== 1) throw new Error(`involution ${h}: ${closing.length} findings close by ${row.replaced_by}; the stroke rule is read from exactly one`)
  const commit = /^[0-9a-f]{7,40}\b/.exec(closing[0]!.closed_by)?.[0]
  if (!commit) throw new Error(`involution ${h}: the finding closing ${row.replaced_by} names no commit`)
  const at = `${commit}:${closing[0]!.where}`
  let historical: string
  try { historical = execFileSync('git', ['show', at], { cwd: ROOT, encoding: 'utf8', maxBuffer: MAXBUF }) } catch {
    throw new Error(`involution ${h}: git cannot show ${at}; the stroke rule the lead was stated over lives only in that commit (a shallow clone must fetch it)`)
  }
  const blocks = defBlocks(historical)
  const listOf = (name: string): number[] => {
    const b = blocks.find((x) => x.name === name)
    const lit = b && /\[([\d,\s]+)\]/.exec(b.text)
    if (!lit) throw new Error(`involution ${h}: ${at} declares no list ${name}`)
    return lit[1]!.split(',').map((x) => Number(x.trim()))
  }
  const tail = listOf('tourTail'), units = listOf('units9'), mod = tail.length
  // the second implementation of the stroke rule, for the js leg; the kernel decides the historical Lean text
  const ren = (v: number): number => (v === 0 ? mod : v)
  const arow = (a: number, b: number): number[] => [0, ...tail.map((d) => ren((a * d + b) % mod))]
  const rises = (p: number, q: number): boolean => q < p || ((p === 3 || p === 6) && q % mod === (p + 3) % mod)
  const budget = (r: number[]): [number, number] => {
    const s = r.slice(1).map((q, i) => rises(r[i]!, q))
    return [s.filter((x) => !x).length, s.filter((x) => x).length]
  }
  const same = (x: [number, number], y: [number, number]): boolean => x[0] === y[0] && x[1] === y[1]
  const family = units.flatMap((a) => Array.from({ length: mod }, (_, b) => ({ a, b, row: arow(a, b) })))
  const tour = budget(arow(1, 0))
  const classes = [...new Set(family.map((f) => budget(f.row).join(',')))].map((k) => k.split(',').map(Number) as [number, number])
    .sort((x, y) => x[0] - y[0]).map((k) => ({ k, count: family.filter((f) => same(budget(f.row), k)).length }))
  const kept = family.filter((f) => same(budget(f.row.map(dz)), budget(f.row))).length
  const broken = family.find((f) => !same(budget(f.row.map(dz)), budget(f.row)))
  if (!broken) throw new Error(`involution ${h}: reflection keeps the budget on every row, so the lead holds`)
  const recorded = [...(row.killed_by ?? '').matchAll(/(\d),(\d) in (\d+)/g)].map((m) => ({ k: [Number(m[1]), Number(m[2])], count: Number(m[3]) }))
  const keptRecorded = /keeps it on (\d+) of (\d+)/.exec(row.killed_by ?? '')
  const authored = block('The stroke budget of a row: (falling, rising).', 'def budget (r : List Nat) : Nat × Nat := (fallingOf r, risingOf r)')
  const leadProp = `def lead_${h} : Prop :=
  budget (arow 1 0) = (${tour[0]}, ${tour[1]}) ∧
  units9.all (fun a => (List.range ${mod}).all (fun b => budget ((arow a b).map dz) == budget (arow a b))) = true`
  const census = [
    ...classes.map((c) => `famTally (fun a b => budget (arow a b) == (${c.k[0]}, ${c.k[1]})) = ${c.count}`),
    `famTally (fun a b => budget ((arow a b).map dz) == budget (arow a b)) = ${kept}`,
    `fallingOf (arow ${broken.a} ${broken.b}) = ${budget(broken.row)[0]}`,
    `fallingOf ((arow ${broken.a} ${broken.b}).map dz) = ${budget(broken.row.map(dz))[0]}`,
  ]
  const used = closureOf(blocks, [authored, leadProp, ...census].join('\n'))
  const defs = [
    ...used.map((b) => block(`${b.name} as ${at} defines it, the stroke rule the lead was stated over.`, b.text)),
    authored,
    block(`${said(row.lead)} On the tour row the budget is (${tour[0]}, ${tour[1]}), and the mirror dz, applied digit for digit, keeps the budget on every one of the ${family.length} affine rows x ↦ a·x + b.`, leadProp),
  ].join('\n\n')
  const facts: Fact[] = [
    { key: `involution_${h}`,
      name: `The kernel refutes lead ${h}: the mirror does not keep the stroke budget on every affine row.`,
      js: () => tail.join() === VORTEX_SEQUENCE.join() && units.join() === unitsOf(mod).join() && !family.every((f) => same(budget(f.row.map(dz)), budget(f.row))),
      lean: `theorem involution_${h} : ¬ lead_${h} := by unfold lead_${h}; decide` },
    { key: `budget_census_${h}`,
      name: `The census the refutation recorded, decided: ${classes.map((c) => `budget ${c.k[0]},${c.k[1]} on ${c.count} rows`).join(', ')}; the mirror keeps the budget on ${kept} of the ${family.length} rows; row (${broken.a}, ${broken.b}) is the first whose reflection moves it.`,
      js: () => keptRecorded !== null && Number(keptRecorded[1]) === kept && Number(keptRecorded[2]) === family.length
        && recorded.length === classes.length && recorded.every((r, i) => same(r.k as [number, number], classes[i]!.k) && r.count === classes[i]!.count),
      lean: `theorem budget_census_${h} :\n    ${census.join(' ∧\n    ')} := by decide` },
  ]
  return { header: headerOf(h), defs, facts }
}

const BUILDERS: Readonly<Record<string, Builder>> = { e92de628, b13fd37a, '2d552f1f': d2d552f1f }
const headerOf = (h: string): string =>
  `INVOLUTION ${h}: lead ${h} of lean/leads.json (refuted), stated as lead_${h} over the objects its source derives, and involution_${h}, the kernel's proof of its negation.`

/** the involutions the court witnessed on every face, in handle order */
export const INVOLUTION_HANDLES: readonly string[] = Object.keys(BUILDERS).sort()
export const wingFileOf = (handle: string): string => `Involution${handle}.lean`

/** involutionWings() → one wing per involution, with the title and summary the ledger shows for it */
export const involutionWings = (rows?: readonly LeadRow[]): InvolutionWing[] => INVOLUTION_HANDLES.map((handle) => ({
  handle,
  file: wingFileOf(handle),
  title: `The involution of lead ${handle}`,
  summary: `lead_${handle} states the refuted lead "${leadOf(handle, rows).lead}" over the objects its source derives, and involution_${handle} is the kernel's proof of its negation`,
}))

/** buildWing(handle) → the wing's text parts, every object read from its source and every fact carrying its js leg */
export async function buildWing(handle: string): Promise<WingText> {
  const build = BUILDERS[handle]
  if (!build) throw new Error(`no involution is declared for ${handle}`)
  return { file: wingFileOf(handle), ...(await build(handle, leadOf(handle))) }
}

// ── THE 2×7 WITNESS SEALS ────────────────────────────────────────────────────────────────────────────────────────

export interface WaveRow { handle: string; recompiled: boolean; faithful: boolean; why: string }
export interface WaveReceipt {
  proposals: { handle: string; status: string }[]
  witnesses: { witness: string | null; label: string; rows: WaveRow[] }[]
  sealed: { handle: string; faces: number; dissent: string[] }[]
}
export interface SealWitness { face: number; statement: string }

/** witnessSealsOf(receipt, faces) → for every involution the wave sealed on all faces, the witnesses in face order.
 *  Each witness of the wave signs two faces, so the wave must seat faces / 2 of them: face i is witness i's kernel
 *  recompile, face (faces / 2) + i its faithfulness judgment, in the order the receipt lists the witnesses. A statement
 *  cites its subject as "theorem involution_<handle>" and binds the witness's own report by its content address,
 *  never by quoting it — a report's prose can name other keys, and one name the ledger lacks refuses the signature.
 *  The receipt's own tally must agree with the rows it carries, or nothing is written. Pure. */
export function witnessSealsOf(receipt: WaveReceipt, faces: number = VE_FACES): Record<string, SealWitness[]> {
  const seats = receipt.witnesses.length
  if (seats * 2 !== faces) throw new Error(`the wave seats ${seats} witnesses and the rosettas have ${faces} faces; each witness signs two faces`)
  const out: Record<string, SealWitness[]> = {}
  for (const s of receipt.sealed) {
    const rows = receipt.witnesses.map((w) => w.rows.filter((r) => r.handle === s.handle))
    const tally = rows.reduce((t, r) => t + r.filter((x) => x.recompiled).length + r.filter((x) => x.faithful).length, 0)
    if (rows.every((r) => r.length === 1) && tally !== s.faces) throw new Error(`the wave seals ${s.handle} on ${s.faces} faces and its rows sign ${tally}`)
    if (s.faces !== faces || s.dissent.length || tally !== faces) continue
    if (!receipt.proposals.some((p) => p.handle === s.handle && p.status === 'involuted')) continue
    if (!rows.every((r) => r.length === 1 && r[0]!.recompiled && r[0]!.faithful)) continue
    const key = `involution_${s.handle}`
    const who = (i: number): string => `witness ${i + 1} of ${seats}`
    out[key] = [
      ...rows.map((r, i) => ({ face: i, statement: `face ${i}, ${who(i)}, kernel recompile: compiled the wing of lead ${s.handle} and read no axiom behind theorem ${key}; report ${toUuid(r[0]!.why)}` })),
      ...rows.map((r, i) => ({ face: seats + i, statement: `face ${seats + i}, ${who(i)}, faithfulness judgment: lead_${s.handle} states lead ${s.handle} as recorded, and theorem ${key} refutes it; report ${toUuid(r[0]!.why)}` })),
    ]
  }
  return out
}
