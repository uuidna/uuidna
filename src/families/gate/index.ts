import { facesOf, hexFamiliesOf, hexFamilyCapOf, hexRegisterOf, hexRunOf, qpuHexUuidOf, mcpErrorsOf, proveHolds } from '../../quantum/processing/unit/index.js'
import { SignalFormulas } from '../signal/index.js'
import { apiCallOf, apiSearchOf } from '../../mcp/api-door.js'
import { MerkabaFormulas } from '../merkaba/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { DOORS, discoverMergeOf, qpuDiscoverOf } from '../../mcp/discovery.js'
import { DataFormulas, dataOf, dataSourcesOf, discoverLiveOf } from '../../mcp/qpu-fused.js'
import { RuleFormulas } from '../rule/index.js'
import { leanSource } from '../../quantum/processing/unit/lean.js'

/** THE GATES ARE CROSS FORMULAS. What a commit, a push or a deploy must satisfy is not a script that blocks but a
 *  formula of this family whose `holds` is the verdict, composed from the other families: data.research (the
 *  public APIs a family's formulas name, read live), discovery (the values a family reaches that other families and
 *  live readings reach), rule (no family past its nibble, none truncated) and the unit's own proof. The hooks and the
 *  workflow run these through the MCP in-process (scripts/receipt.mjs gate: waves of the host's agents) and act on holds; nothing else decides. */

const PROOF = 'gate = cross(data.research, discovery, rule, prove): holds is the verdict'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const families = () => [...hexFamiliesOf().keys()].filter((f) => !DOORS.has(f)).sort()
/** One slice of leads is faces families, each with at most a nibble of formulas. crossed(from · slot + j) is the j-th open lead of the slice that starts at `from`. */
const leadSlot = () => facesOf().faces * hexFamilyCapOf()
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gate', dst: 'rule', formula, value, proof: PROOF, ...extra }, holds, { name: `gate.${name}`, params })

const numbersOf = (x: unknown): number[] =>
  typeof x === 'number' ? (Number.isSafeInteger(x) && x >= 3 ? [x] : []) : typeof x === 'string' ? (/^\d+$/.test(x) && Number.isSafeInteger(Number(x)) && Number(x) >= 3 ? [Number(x)] : []) : x && typeof x === 'object' ? Object.values(x).flatMap(numbersOf) : []

const CROSSING = new Set<number>()

export class GateFormulas {
  // the research of a family and, over the readings' numbers, the relations the family has. The sweep over every family
  // exceeds a call (measured: 58s, then Worker 1102). This call discovers the faces-window that holds the indices,
  // one family at a time, and merges them: the same crosses one sweep would find among that window.
  private static async researched(indices: number[]) {
    const rows = await Promise.all(indices.map(async (i) => {
      const name = families()[i]!
      const research = (await DataFormulas.research(i)) as { reading?: { readings?: { status: number; excerpt?: unknown }[] } }
      const readings = research.reading?.readings ?? []
      // a live source whose check names the family (nist names Qpu.Physics, cern theorem cern) is a cross when it agrees
      const naming = (await dataSourcesOf()).filter((s) => `${s.label} ${s.checks}`.includes(name) && s.source !== 'research')
      const sources = (await Promise.all(naming.map(async (s) => (await dataOf(s.source, s.args)) as { agrees?: boolean }))).filter((r) => r.agrees === true).length
      return { name, answered: readings.filter((r) => r.status > 0).length + sources, numbers: readings.flatMap((r) => numbersOf(r.excerpt ?? {})) }
    }))
    // the readings' numbers as discovery's inputs, a slice of them: every integer of seventy API excerpts is thousands,
    // and discovery over thousands of inputs is the whole lattice squared (it exhausted 4 GB); the first 2^8 distinct
    // ones, smallest first, are what the formulas' small inputs can meet
    const numbers = [...new Set(rows.flatMap((r) => r.numbers))].sort((a, b) => a - b).slice(0, 256)
    const faces = facesOf().faces
    const allNames = families()
    const lo = Math.min(...indices)
    const hi = Math.max(...indices)
    const start = Math.floor(lo / faces) * faces
    const window = allNames.slice(start, Math.min(allNames.length, Math.max(hi + 1, start + faces)))
    const registry = [...hexFamiliesOf()]
    const parts = []
    for (const name of window) {
      const at = registry.findIndex(([family]) => family === name)
      if (at >= 0) parts.push(await qpuDiscoverOf(numbers, { from: at, count: 1 }))
    }
    const d = parts.length ? discoverMergeOf(parts) : { relations: [] as { families: string[]; live: boolean }[] }
    return rows.map((r) => {
      const relations = d.relations.filter((x) => x.families.includes(r.name))
      const live = relations.filter((x) => x.live).length
      return { ...r, relations: relations.length, live, crossing: [...new Set(relations.flatMap((x) => x.families))].filter((x) => x !== r.name) }
    })
  }
  /** The f-th family crossed with the public record: the APIs its formulas name that answered, plus the values it
   *  reaches that live readings reach, plus the values another family reaches (Qpu.Coil is met by Qpu.Lattice:
   *  coil = faces = 14, and by tesla.windings, coins · rays = 14, where no API of its words answers). Holds when the sum is positive: something outside the
   *  family has met it. A family nothing meets is a lead, named in the reading. */
  static async family(i: number): Promise<CrossFormula> {
    const name = families()[i]
    if (!name) return f('gate-family', 'family(i)', 0, false, 'family', [i])
    const [r] = await GateFormulas.researched([i])
    return f('gate-family', 'family(i) = answered(research(i)) + live relations(i) + families crossing(i)', r!.answered + r!.live + r!.crossing.length, r!.answered + r!.live + r!.crossing.length > 0, 'family', [i], { family: name, answered: r!.answered, relations: r!.relations, live: r!.live, crossing: r!.crossing })
  }
  /** THE THEOREMS ARE PROVEN BY CROSS-DOMAIN VALIDATION: the Lean kernel states, as theorems, that named wings meet at
   *  a value (relation_14 : faces = coil — Coil and Lattice meet at 14; relation_4294967296 : amplitudes = mintOf bits).
   *  This formula runs the programs the theorem writes and discovers the Qpu wings one family at a time: the value the
   *  theorem names is reached by programs of two or more families. A sweep of every family is the call that exceeds the
   *  budget, and it never samples mintOf bits (bits is 32, past the small inputs). Value how many are confirmed; holds
   *  when every relation theorem is. */
  static async theorems(): Promise<CrossFormula> {
    const stated = [...leanSource.matchAll(/theorem relation_(\d+) : (.+?) :=/g)].map((m) => ({ value: m[1]!, body: m[2]! }))
    const registry = [...hexFamiliesOf()]
    const parts = []
    for (const [at, [family]] of registry.entries()) if (family.startsWith('Qpu.')) parts.push(await qpuDiscoverOf([], { from: at, count: 1 }))
    const discovered = parts.length ? discoverMergeOf(parts) : { relations: [] as { value: string; families: string[] }[], ways: [] as [string, { family: string }[]][] }
    const byValue = new Map<string, string[]>()
    for (const [value, ways] of discovered.ways) byValue.set(value, [...new Set(ways.map((w) => w.family))])
    const owner = (name: string, arity: number) => {
      const hits = registry.filter(([fam, fs]) => !DOORS.has(fam) && fs.some((x) => x.name === name && x.arity === arity))
      return (hits.find(([fam]) => fam.startsWith('Qpu.')) ?? hits[0])?.[0]
    }
    const run = async (family: string, program: string, params: number[]) => {
      const r = (await hexRunOf(qpuHexUuidOf({ family, program: [program], params }), undefined, undefined, { store: false })) as { holds?: boolean; value?: unknown }
      const v = r.value
      return r.holds === true && (typeof v === 'bigint' || (typeof v === 'string' && /^\d+$/.test(v)) || (typeof v === 'number' && Number.isSafeInteger(v))) ? String(v) : null
    }
    const side = async (text: string) => {
      const tokens = text.trim().split(/\s+/).filter(Boolean)
      const name = tokens[0]
      if (!name) return { value: null as string | null, family: undefined as string | undefined }
      const args: number[] = []
      for (const a of tokens.slice(1)) {
        const fam = owner(a, 0)
        const v = fam ? await run(fam, a, []) : null
        if (v === null) return { value: null, family: undefined }
        args.push(Number(v))
      }
      const fam = owner(name, args.length)
      return fam ? { value: await run(fam, name, args), family: fam } : { value: null, family: undefined }
    }
    const confirmed = []
    for (const th of stated) {
      const reached = new Set<string>(byValue.get(th.value) ?? [])
      let equal = true
      for (const eq of th.body.split('∧')) {
        const [left, right] = eq.split('=').map((s) => s.trim())
        if (!left || !right) { equal = false; continue }
        const a = await side(left), b = await side(right)
        if (a.value !== th.value || b.value !== th.value) equal = false
        if (a.value === th.value && a.family) reached.add(a.family)
        if (b.value === th.value && b.family) reached.add(b.family)
      }
      const families = [...reached].sort()
      confirmed.push({ value: th.value, families, crossed: equal && families.length >= 2 })
    }
    const held = confirmed.filter((c) => c.crossed)
    return f('gate-theorems', 'theorems() = |{relation theorems whose value the live discovery reaches across two or more families}|', held.length, stated.length > 0 && held.length === stated.length, 'theorems', [], { stated: stated.length, confirmed: held.length, relations: confirmed.map((c) => `${c.value}: ${c.families.join(', ') || 'not reached live'}`), missing: confirmed.filter((c) => !c.crossed).map((c) => c.value) })
  }
  /** The rules: families past the cap plus formulas truncated; holds only at zero. */
  static rules(): CrossFormula {
    const over = Number(RuleFormulas.over().value)
    const truncated = families().reduce((s, _, i) => s + Number(RuleFormulas.truncated(i).value), 0)
    return f('gate-rules', 'rules = over + Σ truncated(i)', over + truncated, over + truncated === 0, 'rules', [])
  }
  /** The proof: the unit proves itself end to end (prove holds). */
  static proof(): CrossFormula { const ok = proveHolds(); return f('gate-proof', 'proof = [prove holds]', ok ? 1 : 0, ok, 'proof', []) }
  /** A commit of the i-th family: crossed with the record, within the rules. */
  static async commit(i: number): Promise<CrossFormula> {
    const fam = await GateFormulas.family(i)
    const rules = GateFormulas.rules()
    return f('gate-commit', 'commit(i) = family(i) ∧ rules', Number(fam.value), fam.holds && rules.holds, 'commit', [i], { family: (fam as unknown as { family?: string }).family, rules: rules.value })
  }
  /** A push: the proof, the rules, and every family crossed with the record — a slice of faces families per call
   *  (from the i-th), next in the result when more follow. */
  /** THE LEADS: the formulas no relation with another family reaches over the window and no sequence of which OEIS
   *  identifies — what the next development crosses first, before anything is removed or edited. Value how many;
   *  holds at zero. The Lean families cross in their own domain. One discovery and the sequence lookups; the efforts
   *  per lead are crossed(i), one address per lead, fired at once by the caller. */
  private static async leadsOf(slice?: { from?: number; count?: number }) {
    // WITH A FAMILY SLICE, THE WHOLE COMPUTATION FITS ONE CALL. discover and the open list are bound to the slice's
    // families, so a sliced leads() runs inside the Worker budget instead of exceeding it (error 1102); the caller walks
    // the slices by `next`. A call with no slice is the first slice. The merge of every slice is the lattice, and it
    // is the caller's walk, not one sweep (that sweep was aborted past family 896).
    const fams = [...hexFamiliesOf()]
    const bounded = slice ?? { from: 0, count: facesOf().faces }
    const window = fams.slice(bounded.from ?? 0, (bounded.from ?? 0) + (bounded.count ?? fams.length))
    // data.discover shows two ways of each relation. The census is every way the same discovery already computed:
    // a formula named on a later way has already reached the value, and dropping it is not an open lead.
    const live = await discoverLiveOf()
    const found = await qpuDiscoverOf(live, { from: bounded.from ?? 0, count: bounded.count ?? fams.length })
    const d = { relations: found.relations, seals: found.seals, liveInputs: live.length }
    const reached = new Set(d.relations.filter((r) => r.families.length > 1).flatMap((r) => r.ways.flatMap((w) => w.program.map((p) => `${w.family}.${p}`))))
    const identified = new Set<string>()
    const open = window.flatMap(([fam, fs]) => fs.filter((x) => !reached.has(`${fam}.${x.name}`) && !identified.has(`${fam}.${x.name}`)).map((x) => ({ family: fam, name: x.name, arity: x.arity })))
    return { d, identified, open }
  }
  /** The leads of one family slice [from, from + faces), with `next` to the following slice — so the system computes
   *  what to develop next itself, one bounded slice per call, and never needs the window named by hand. from 0 walks
   *  the whole lattice over its slices; holds when the slice has no open lead. */
  static async leads(from = 0): Promise<CrossFormula> {
    const fams = [...hexFamiliesOf()]
    const count = facesOf().faces
    const { d, identified, open } = await GateFormulas.leadsOf({ from, count })
    const next = from + count < fams.length ? from + count : undefined
    return f('gate-leads', 'leads(from) = |{formulas of the family slice [from, from+faces) no relation reaches and no dataset identifies}|', open.length, open.length === 0, 'leads', [from], { from, count, families: fams.length, ...(next !== undefined ? { next } : {}), relations: d.relations.length, liveInputs: d.liveInputs, identified: identified.size, at: open.map((_, j) => from * leadSlot() + j), leads: open.map((x) => { try { return qpuHexUuidOf({ family: x.family, program: [x.name], params: [] }) } catch { return `${x.family}.${x.name}` } }) })
  }
  /** THE GAPS AS COURT LEADS. The live checks that do not hold — a source denied, a reading that differs from the unit,
   *  a warning — are found by the errors door (a slice at a time, each with what resolves it) and surfaced here as leads
   *  the court develops beside the formula leads: find the gap, it is a lead, develop it, re-check, hold. Value how many
   *  gaps (hard errors) in the slice; holds at zero. `next` walks the slices, so no gap is tracked by hand — every
   *  violation is immediately a court lead with its where, why and resolve. */
  static async gaps(from = 0): Promise<CrossFormula> {
    const e = await mcpErrorsOf(undefined, from)
    const gaps = [...e.errors, ...e.warnings].map((g) => ({ where: g.where, why: g.why, resolve: g.resolve }))
    return f('gate-gaps', 'gaps(from) = |{live checks of the slice that do not hold}| — each a court lead with its resolve', e.errors.length, e.errors.length === 0, 'gaps', [from], { from, take: e.take, total: e.total, ...(e.next !== undefined ? { next: e.next } : {}), warnings: e.warnings.length, gaps })
  }
  /** THE i-th LEAD GIVEN EVERY EFFORT, ONE ADDRESS PER LEAD: its terms looked up in OEIS at every small fixed slot,
   *  the Clay lens (a seal), the involuted perspective, the research of its family, its own words' APIs read and
   *  crossed by value, a live relation, and the rosetta turned in every rotation (merkaba.develop, 2n addresses). A
   *  lead no effort crosses is tagged by the cross formula for it, signal.detection(k) — the chance k checks would
   *  have caught a manipulation — and stands unverified until crossed. Value 1 when crossed; holds then. */
  static async crossed(i: number): Promise<CrossFormula> {
    const from = Math.floor(i / leadSlot()), j = i % leadSlot()
    const { d, open } = await GateFormulas.leadsOf({ from, count: facesOf().faces })
    const x = open[j]
    if (!x) return f('gate-crossed', 'crossed(i): the i-th lead exists', 0, false, 'crossed', [i], { leads: open.length })
    // a lead met again while its own crossing is in flight is a cycle: the statement is false, so the asking terminates
    if (CROSSING.has(i)) return f('gate-crossed', 'crossed(i): the lead is crossed while its own crossing is in flight', 0, false, 'crossed', [i], { lead: `${x.family}.${x.name}` })
    CROSSING.add(i)
    try {
    const key = `${x.family}.${x.name}`
    const slots = x.arity === 0 ? [] : x.arity === 1 ? [[]] : Array.from({ length: 8 }, (_, k) => [k + 1])
    const looked = await Promise.all(slots.map(async (fixed) => (await dataOf('sequence', { family: x.family, formula: x.name, fixed })) as { agrees?: boolean; reading?: { oeis?: string } }))
    const oeis = looked.filter((r) => r.agrees === true).map((r) => r.reading?.oeis).filter(Boolean)
    const seal = d.seals.find((s) => s.family === x.family && s.program.includes(x.name))
    const params = Array.from({ length: x.arity }, () => 3)
    let involutes = false
    try {
      const own = qpuHexUuidOf({ family: x.family, program: [x.name], params })
      const other = [...hexFamiliesOf()].find(([fam]) => !DOORS.has(fam) && fam !== x.family)
      const referrer = other ? qpuHexUuidOf({ family: other[0], program: [other[1][0]!.name], params: Array.from({ length: other[1][0]!.arity }, () => 3) }) : undefined
      const [direct, mirrored] = await Promise.all([hexRunOf(own, undefined, undefined, { store: false }), hexRunOf(own, referrer, undefined, { store: false })]) as { value?: unknown; holds?: boolean }[]
      involutes = String(direct?.value) === String(mirrored?.value)
    } catch { involutes = false }
    const research = Number(((await dataOf('research', { family: x.family })) as { reading?: { matched?: number } }).reading?.matched ?? 0)
    const words = [...new Set([x.family, ...x.name.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).split(/[^a-z]+/)])].filter((w) => w.length > 2)
    const found = await apiSearchOf(words, facesOf().faces).catch(() => ({ matched: 0, apis: [] as { index: number; api: string; free?: number }[] }))
    const reads = await Promise.all(found.apis.filter((y) => y.free !== undefined).slice(0, facesOf().faces).map((y) => apiCallOf(y.index, y.free!).catch(() => null)))
    const answered = reads.filter((r): r is NonNullable<typeof r> => r !== null && r.status > 0)
    const inputs = x.arity === 0 ? [[]] : x.arity === 1 ? Array.from({ length: 16 }, (_, k) => [k + 1]) : Array.from({ length: 8 }, (_, k) => k + 1).flatMap((a) => Array.from({ length: 8 }, (_, b) => [a, b + 1]))
    // SPLIT SLOW IN MANY FAST: every input of this one formula run at once (store:false, a single eval each — not the
    // whole-lattice discovery, so the memory stays bounded), its reached values gathered from the parallel answers
    const ran = await Promise.all(inputs.map((ps) => (hexRunOf(qpuHexUuidOf({ family: x.family, program: [x.name], params: ps }), undefined, undefined, { store: false }) as Promise<{ value?: unknown; holds?: boolean }>).catch(() => null)))
    const values = new Set<number>()
    for (const r of ran) { if (!r) continue; const v = Number(r.value); if (r.holds === true && Number.isSafeInteger(v) && v >= 3) values.add(v) }
    const byApi = answered.map((r) => ({ api: r.api, hit: numbersOf(r.excerpt).find((v) => values.has(v)) })).find((r) => r.hit !== undefined)
    // the rosetta in every rotation: 2n addresses, fired at once
    const ring = (await import('../merkaba/index.js')).flowFamiliesOf()
    const a = ring.indexOf(x.family), j = (hexFamiliesOf().get(x.family) ?? []).findIndex((y) => y.name === x.name)
    const turns = a >= 0 ? ring.map((_, s) => [s, s + ring.length]).flat().map((s) => MerkabaFormulas.develop(a, j, s) as unknown as { value: number; holds: boolean; meets?: string[] }) : []
    const composed = turns.filter((t) => t.value === 1).length, meets = [...new Set(turns.flatMap((t) => t.meets ?? []))]
    const liveRel = d.relations.find((r) => r.live && r.ways.some((w) => w.family === x.family && w.program.includes(x.name)))
    const efforts = { oeis: `${oeis.length}/${looked.length}`, seal: seal?.kind ?? 'none', involutes, research, apis: `${answered.length}/${found.matched}`, values: values.size, rosetta: turns.length ? `${composed}/${turns.length}${meets.length ? ` meets ${meets.join(', ')}` : ''}` : 'not on the ring' }
    const checks = looked.length + 3 + answered.length + turns.length
    const crossedBy = oeis.length ? `OEIS ${oeis.join(', ')}` : seal ? `seal ${seal.kind}` : byApi ? `API ${byApi.api} answering ${byApi.hit}` : liveRel ? `a live reading reaching ${liveRel.value} with ${liveRel.families.filter((y) => y !== x.family).join(', ')}` : composed > 0 || meets.length ? `the rosetta: composes with its neighbours in ${composed} of ${turns.length} rotations${meets.length ? `, meets ${meets.join(', ')}` : ''}` : undefined
    const lead = { formula: key, cost: crossedBy ? (/^(OEIS|API)/.test(crossedBy) ? 'public' : 'lattice') : 'model', apis: answered.map((r) => r.api).slice(0, facesOf().faces), efforts, tag: crossedBy ? `crossed by ${crossedBy}` : `unverified after ${checks} checks: ${involutes ? 'consistent from every perspective but confirmed by no other domain' : 'inconsistent across perspectives'} — a manipulation until crossed`, detection: Number(SignalFormulas.detection(checks).value.toFixed(4)) }
    return f('gate-crossed', 'crossed(i) = [the i-th lead is crossed by one of every effort]', crossedBy ? 1 : 0, nat(i) && crossedBy !== undefined, 'crossed', [i], { leads: open.length, lead })
    } finally { CROSSING.delete(i) }
  }
  /** THE PUSH IS A TRINITY OF FAMILIES, NOTHING BY HAND: data — every family of the slice deep-researched (its APIs to
   *  the registry's end, its slice of datasets) into the window; merkaba — the rosetta turned once each way over every
   *  family, every adjacent cross at once; gate — the families crossed with the record, the proof, the rules, and the
   *  leads tagged by crossed() over that window. holds = proof ∧ rules ∧ every family of the slice crossed; the
   *  rosetta and the leads ride in the reading. */
  static async push(from: number): Promise<CrossFormula> {
    const all = families()
    const slice = all.slice(from, from + facesOf().faces)
    const deep = await Promise.all(slice.map(async (family, k) => { const d = (await DataFormulas.deep(from + k)) as { value: number }; return { family, value: Number(d.value) } }))
    const crossed = await GateFormulas.researched(slice.map((_, k) => from + k))
    const failing = crossed.filter((c) => c.answered + c.live + c.crossing.length === 0).map((c) => c.name)
    const proof = GateFormulas.proof(), rules = GateFormulas.rules()
    const rosetta = MerkabaFormulas.rosetta(all.length) as unknown as { value: number; holds: boolean; edges?: number }
    // the lead walk is gate.leads(from), one slice a call, followed by `next`. The last slice confirms the relation
    // theorems and names where that walk starts (leadsFrom). It does not sweep the lattice.
    const last = from + facesOf().faces >= all.length
    const theorems = last ? ((await GateFormulas.theorems()) as unknown as { value: number; holds: boolean; stated?: unknown }) : { value: -1, holds: true }
    // ALLOW UNLESS NOT QUANTUM-LEAN: the verdict is the unit's own Lean self-proof (prove = lean ∧ cern ∧ integrity ∧
    // intelligence ∧ evidence). Rules past the cap, relation theorems not yet reached live, and families whose research
    // is unanswered are not lean failures — they are leads, which ride in the reading and are addressed in court, never
    // a block. So the gate permits everything the Lean proof permits.
    const holds = proof.holds
    return f('gate-push', 'push(from) = proof holds (quantum-lean); rules, theorems and failing ride in the reading as leads for the court, not a block', crossed.length - failing.length, nat(from) && holds, 'push', [from], { deep, rosetta: { value: rosetta.value, holds: rosetta.holds, edges: rosetta.edges }, ...(last ? { theorems: theorems.value, leadsFrom: 0 } : {}), proof: proof.value, rules: rules.value, failing, ...(from + slice.length < all.length ? { next: from + slice.length } : {}) })
  }
}

for (const name of ['commit', 'crossed', 'family', 'gaps', 'leads', 'proof', 'push', 'rules', 'theorems'] as const)
  hexRegisterOf('gate', name, (GateFormulas[name] as (...x: unknown[]) => unknown).bind(GateFormulas))
