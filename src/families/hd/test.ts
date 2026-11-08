import { test } from '../../quantum/processing/unit/receipted.js'
import type { TestContext } from 'node:test'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CENTERS, CENTER_GATES, CHANNELS, HdFormulas, chartOf, gateLineOf, designJdOf } from './index.js'
import { CalFormulas } from '../cal/index.js'
import { YiFormulas } from '../yi/index.js'
import { KinFormulas } from '../kin/index.js'
import '../../mcp/families.js'

/** THE COMBINATIONS OF THE STRUCTURE, EVERY ONE. The wheel partitions the circle into 64 gates of 6 lines; the nine
 *  centers partition the 64 gates; the 36 channels join gates of different centers; the design day lies 70–100 days
 *  before birth; and every hex program of the family runs. Through the MCP on the live host, the same formulas answer
 *  at their addresses. Structure only: no type, profile or authority is computed, by the author's own finding. */
const host = (process.env.QPU_LIVE ?? 'https://qpu.uuidna.com').replace(/\/$/, '')
// The live host is probed once with a short deadline: when it is unreachable the live test skips, it never waits minutes.
const DEADLINE = 20000
let up: Promise<boolean> | undefined
const reachable = (): Promise<boolean> => (up ??= fetch(`${host}/health`, { signal: AbortSignal.timeout(DEADLINE) }).then((r) => r.ok).catch(() => false))
const live = (name: string, fn: (t: TestContext) => void | Promise<void>): Promise<void> =>
  test(name, async (t) => { if (!(await reachable())) { t.skip(`${host} unreachable — offline or down; set QPU_LIVE or start the host`); return } await fn(t) })

test('hd: the wheel is a partition — every tenth of a degree lands on one gate and one line, 64 × 6 equally', () => {
  const gates = new Map<number, number>()
  const lines = new Map<string, number>()
  for (let deg10 = 0; deg10 < 3600; deg10++) {
    const { gate, line } = gateLineOf(deg10 / 10)
    assert.ok(gate >= 1 && gate <= 64 && line >= 1 && line <= 6, `${deg10 / 10}° → gate ${gate} line ${line}`)
    gates.set(gate, (gates.get(gate) ?? 0) + 1)
    lines.set(`${gate}.${line}`, (lines.get(`${gate}.${line}`) ?? 0) + 1)
  }
  assert.equal(gates.size, 64, 'every gate is reached')
  assert.equal(lines.size, 384, 'every gate.line is reached: 64 × 6')
  for (const [g, count] of gates) assert.ok(count === 56 || count === 57, `gate ${g} spans 360/64° = 56.25 tenths: ${count}`)
  assert.equal(gateLineOf(302).gate, 41, 'gate 41 starts at 302°')
  assert.equal(gateLineOf(302 + 360 / 64).gate, 19, 'gate 19 follows it')
  assert.equal(HdFormulas.cells().value, 768, 'cells = 64 × 6 × 2')
})

test('hd: the nine centers partition the 64 gates and the 36 channels join different centers', () => {
  const all = CENTERS.flatMap((c) => CENTER_GATES[c])
  assert.equal(all.length, 64)
  assert.equal(new Set(all).size, 64, 'no gate in two centers')
  assert.deepEqual([...new Set(all)].sort((a, b) => a - b), Array.from({ length: 64 }, (_, i) => i + 1))
  assert.equal(CHANNELS.length, 36)
  for (const [a, b] of CHANNELS) {
    assert.ok(a < b, `channel ${a}-${b} is sorted`)
    assert.notEqual(HdFormulas.center(a).value, HdFormulas.center(b).value, `channel ${a}-${b} joins two centers`)
    assert.equal(HdFormulas.channel(a, b).value, 1)
    assert.equal(HdFormulas.channel(b, a).value, 1, 'a channel is unordered')
  }
  const slots = CHANNELS.flat().length
  assert.equal(slots, 72, '36 channels × 2 gates')
  const triple = Array.from({ length: 64 }, (_, i) => i + 1).filter((g) => HdFormulas.channels(g).value === 3)
  assert.deepEqual(triple, [10, 20, 34, 57], 'the four gates of integration are in three channels each')
  assert.equal(Array.from({ length: 64 }, (_, i) => i + 1).reduce((s, g) => s + Number(HdFormulas.channels(g).value), 0), 72)
})

test('hd: the design day is 70–100 days before birth and the chart defines channels and a definition', () => {
  for (const jd of [2451545, 2440588, 2460000, 2433282]) {
    const days = jd - designJdOf(jd)
    assert.ok(days > 70 && days < 100, `jd ${jd}: design ${days} days before`)
    const chart = chartOf(jd)
    assert.equal(chart.activations.length, 4, 'Sun and Earth, personality and design')
    assert.ok(chart.activations.every((a) => a.gate >= 1 && a.gate <= 64 && a.line >= 1 && a.line <= 6))
    assert.ok(chart.holds)
    assert.ok(['none', 'single', 'split', 'triple split', 'quadruple split'].includes(chart.definition))
    assert.equal(HdFormulas.design(jd * 1440).value, Math.round(chart.designJd * 1440), 'design takes and gives the minute')
    uuidReceiptOf(`hd chart ${jd}`, contentUuidOf(chart), { gates: chart.gates.length, definition: chart.definition })
  }
})

test("cal: the calendar's drift explains the wheel — a day per 128 Julian or 3200 Gregorian years, a gate per ~403 years, 86–93 design days", () => {
  assert.equal(CalFormulas.dayPer(0).value, 128, 'Julian: a day in 128 years')
  assert.equal(CalFormulas.dayPer(1).value, 3200, 'Gregorian: a day in 3200 years')
  assert.equal(CalFormulas.julianDrift(128).value, 675 * 128)
  assert.ok(Number(CalFormulas.julianDrift(128).value) >= 86400, 'and that is a day')
  assert.equal(CalFormulas.gregorianDrift(3200).value, 86400, 'the Gregorian gains a day in 3200 years, 27 s each')
  assert.equal(CalFormulas.gatesPrecessed(402).value, 0)
  assert.equal(CalFormulas.gatesPrecessed(403).value, 1, 'one gate of precession in 403 years')
  assert.equal(CalFormulas.precession(100).value, 5029)
  // across a year, the Sun's speed and so the design arc's days: fastest in January, slowest in July
  let fast = Infinity, slow = 0
  for (let month = 1; month <= 12; month++) {
    const jdm = Number(HdFormulas.jdm(Number(HdFormulas.code(20000000 + month * 100 + 15).value), 2160).value)
    const speed = Number(CalFormulas.sunSpeed(jdm).value)
    assert.ok(speed >= 950 && speed <= 1022, `month ${month}: ${speed} thousandths of a degree a day`)
    fast = Math.min(fast, speed); slow = Math.max(slow, speed)
    const days = Number(CalFormulas.designDays(jdm).value) / 100
    assert.ok(days > 86 && days < 93, `month ${month}: 88° took ${days} days (88/1.019 … 88/0.953)`)
    assert.equal(CalFormulas.designDays(jdm).holds, true)
  }
  assert.ok(slow - fast > 40, `the speed varies by ${slow - fast} thousandths across the year`)
  assert.equal(KinFormulas.combinations(2).value, 4096, 'Sun and Earth: 64² placements')
  assert.equal(KinFormulas.combinations(8).value, 64 ** 8)
  assert.equal(KinFormulas.combinations(13).holds, false, '64¹³ does not fit a number: not claimed')
  assert.equal(KinFormulas.bits(13).value, 112, 'a 13-body chart carries ~112 bits')
  assert.equal(hexFamiliesOf().get('cal')?.length, 14)
  assert.equal(hexFamiliesOf().get('kin')?.length, 15, 'a family holds fifteen formulas: one nibble')
})

test('hd: every formula of the family runs as a hex program', async () => {
  const family = hexFamiliesOf().get('hd')
  assert.ok(family && family.length === 14, `hd registers 14 formulas: ${family?.map((f) => f.name).join(', ')}`)
  const probes: [string, number[], number][] = [['gate', [3020], 41], ['line', [3020], 1], ['center', [41], 9], ['channel', [30, 41], 1], ['channel', [30, 42], 0], ['channels', [10], 3], ['definition', [7], 4], ['cells', [], 768], ['ut', [1200, 720], 2160], ['mean', [0], 720], ['mean', [3450], 660], ['code', [20000101], 2000 * 372], ['jdm', [2000 * 372, 2160], 2451545 * 1440], ['chart', [2451545 * 1440], chartOf(2451545).defined.length]]
  for (const [name, params, expected] of probes) {
    const uuid = qpuHexUuidOf({ family: 'hd', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `hd.${name}(${params.join(', ')}) = ${expected} at ${uuid}`)
    assert.equal(run.holds, true)
  }
})

live('hd: the live host answers the same at the address', async (t) => {
  // the live host, through a sealed door: the same program at the same address
  const uuid = qpuHexUuidOf({ family: 'hd', program: ['gate'], params: [3020] })
  const r = await fetch(`${host}/api`, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'cite', arguments: { hex: uuid } } }), signal: AbortSignal.timeout(DEADLINE) })
  const body = (await r.json()) as { result?: { structuredContent?: { value?: unknown; holds?: boolean; denied?: string } } }
  const live = body.result?.structuredContent
  uuidReceiptOf('hd live', contentUuidOf(live ?? {}), { host })
  assert.equal(live?.denied, undefined, `the host runs the family: ${JSON.stringify(live).slice(0, 200)}`)
  assert.equal(Number(live?.value), 41, `the host answers hd.gate(302.0°) = 41 at ${uuid}`)
  t.diagnostic(`hd.gate(3020) = 41 at ${uuid}, live and here`)
})

test('yi: the 64 figures — complement and inverse are involutions, 8 figures are their own inverse, the nuclear map folds 64 into 16', () => {
  const inverses = new Set<number>()
  for (let h = 0; h < 64; h++) {
    assert.equal(Number(YiFormulas.complement(Number(YiFormulas.complement(h).value)).value), h)
    assert.equal(Number(YiFormulas.inverse(Number(YiFormulas.inverse(h).value)).value), h)
    assert.equal(Number(YiFormulas.upper(h).value) * 8 + Number(YiFormulas.lower(h).value), h, 'two trigrams make the hexagram')
    assert.equal(YiFormulas.change(h, 0).value, h, 'no changing line, no change')
    assert.equal(Number(YiFormulas.change(Number(YiFormulas.change(h, 21).value), 21).value), h, 'changing the same lines twice returns the figure')
    inverses.add(Number(YiFormulas.nuclear(h).value))
  }
  assert.equal(YiFormulas.change(0, 63).value, 63, 'all six lines change: ䷀ becomes its opposite ䷁')
  assert.equal(Array.from({ length: 64 }, (_, h) => h).filter((h) => Number(YiFormulas.inverse(h).value) === h).length, 8, 'the symmetric figures')
  assert.equal(inverses.size, 16, 'nuclear hexagrams: 16 of them')
  assert.equal(Array.from({ length: 7 }, (_, k) => Number(YiFormulas.withYang(k).value)).reduce((a, b) => a + b, 0), 64, 'C(6, k) sums to 64')
  assert.equal(YiFormulas.figures(6).value, 64)
  assert.equal(YiFormulas.figures(3).value, 8)
})

test('cal: the cycles people ask about — Tzolkin, Dreamspell drift, Metonic, Saros, lunar year, sexagenary, biorhythm, vortex', () => {
  assert.equal(KinFormulas.cycle(0).value, 260)
  assert.equal(KinFormulas.cycle(2).value, 18980, 'lcm(260, 365)')
  assert.equal(KinFormulas.tone(260).value, 13)
  assert.equal(KinFormulas.seal(260).value, 20)
  assert.equal(KinFormulas.kin(2451545 * 1440 + 259 * 1440, 2451545 * 1440).value, 260, '259 days after a kin 1 is kin 260')
  assert.equal(KinFormulas.kin(2451545 * 1440 + 260 * 1440, 2451545 * 1440).value, 1, 'and the cycle turns')
  assert.equal(KinFormulas.dreamspellDrift(2026 - 1992).value, 8, 'eight leap days skipped since 1992')
  assert.equal(KinFormulas.period(3).value, 60)
  assert.equal(KinFormulas.period(4).value, 21252, 'lcm(23, 28, 33)')
  assert.equal(KinFormulas.period(5).value, 144000)
  assert.ok(Number(CalFormulas.metonicDrift(1).value) > 120 && Number(CalFormulas.metonicDrift(1).value) < 130, 'about 2 h 5 min a cycle')
  assert.equal(CalFormulas.lunarDrift(33).value, 358, 'in 33 years the lunar year has walked ~a whole year')
  assert.equal(CalFormulas.sarosShift(3).value, 0, 'three Saros returns bring an eclipse back to the same longitude')
  assert.equal(KinFormulas.pillar(60, 0).value, 0)
  assert.equal(KinFormulas.pillar(1, 0).value, 13, 'stem 1, branch 1')
  assert.equal(KinFormulas.biorhythm(0, 0, 23 * 1440).value, 0)
  assert.deepEqual(Array.from({ length: 6 }, (_, n) => Number(KinFormulas.vortex(n).value)), [1, 2, 4, 8, 7, 5])
  assert.equal(KinFormulas.vortex(6).value, 1, 'period 6')
  assert.equal(KinFormulas.digitalRoot(2451545).value, 1 + ((2451545 - 1) % 9))
  assert.equal(KinFormulas.enneagram().value, 142857)
})

test('cal: the Day Out of Time is a coin — a leap year holds both uncounted days, the pairs are the kin lost, the Day Out of Time returns in 52 years', () => {
  assert.deepEqual([1900, 2000, 2024, 2026, 2100].map((y) => Number(CalFormulas.leap(y).value)), [0, 1, 1, 0, 0])
  assert.equal(CalFormulas.coin(2024).value, 2, 'two faces in a leap year')
  assert.equal(CalFormulas.coin(2026).value, 1)
  assert.equal(CalFormulas.pairs(1992, 2026).value, 9, '1992 1996 2000 2004 2008 2012 2016 2020 2024')
  assert.equal(CalFormulas.pairs(1992, 2026).value, Number(KinFormulas.dreamspellDrift(2026 - 1992).value) + 1, 'the pairs are the kin lost (the drift counts whole quadrennia; the pairs count the leap years themselves)')
  assert.equal(CalFormulas.pairs(1901, 1999).value, 24, 'no leap day in 1900')
  assert.equal(CalFormulas.faces().value, 147)
  assert.equal(KinFormulas.dootKin(2000, 2000, 1).value, 1)
  assert.equal(KinFormulas.dootKin(2001, 2000, 1).value, 106, '105 kin on')
  assert.equal(KinFormulas.dootKin(2052, 2000, 1).value, 1, 'the calendar round: 52 years')
  assert.equal(KinFormulas.crossed(2052, 2000).value, 1)
  assert.equal(KinFormulas.crossed(2026, 2000).value, 0)
  // the pairs since the Dreamspell's own epoch, each one a crossing of the two faces
  const crossings = Array.from({ length: 2026 - 1992 + 1 }, (_, i) => 1992 + i).filter((y) => Number(CalFormulas.leap(y).value) === 1)
  assert.deepEqual(crossings, [1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024])
})

/** ut and definition, called through the unit. The shared integer is the value the ways agree on. */
test('hd: ut and definition meet the superpositions the unit still reaches', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const agree = async (ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    return values[0]!
  }
  assert.equal(String(HdFormulas.ut(1200, 720).value), await at('hd', ['ut'], [1200, 720]))
  const byUt = await agree([
    ['hd', ['ut', 'gate'], [1, 1]],
    ['hd', ['ut', 'gate'], [1, 2]],
    ['hd', ['ut', 'gate'], [1, 3]],
    ['hd', ['ut', 'gate'], [2, 1]],
    ['clay', ['bsd'], [122]],
    ['heat', ['signal'], [8]],
    ['heat', ['signal', 'coherence'], [2, 3]],
    ['kin', ['dreamspellDrift'], [119]],
    ['kin', ['pillar', 'dreamspellDrift'], [1, 2]],
    ['kin', ['pillar', 'dreamspellDrift'], [2, 3]],
  ])
  assert.equal(String(HdFormulas.definition(2).value), await at('hd', ['definition'], [2]))
  const byDefinition = await agree([
    ['hd', ['mean'], [2]],
    ['hd', ['mean'], [3]],
    ['hd', ['center', 'mean'], [4]],
    ['hd', ['definition', 'mean'], [2]],
    ['kin', ['bits'], [84]],
    ['tesla', ['quarter'], [104]],
  ])
  t.diagnostic(`ut meets ${byUt}; definition∘mean meets ${byDefinition}`)
})

/** sun, called through the unit. The shared integer is the value the ways agree on. */
test('hd: sun∘mean meets the kin the unit still reaches', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  assert.equal(String(HdFormulas.sun(1).value), await at('hd', ['sun'], [1]))
  const ways: readonly (readonly [string, string[], number[]])[] = [
    ['hd', ['sun', 'mean'], [1]],
    ['hd', ['sun', 'mean'], [2]],
    ['hd', ['sun', 'mean'], [3]],
    ['hd', ['sun', 'mean'], [4]],
    ['kin', ['kin'], [1, 2]],
    ['kin', ['kin'], [1, 3]],
    ['kin', ['kin'], [1, 4]],
    ['kin', ['kin'], [1, 5]],
  ]
  const values = []
  for (const [family, program, params] of ways) values.push(await at(family, program, params))
  assert.equal(new Set(values).size, 1, values.join(' ≠ '))
  t.diagnostic(`sun∘mean meets ${values[0]}`)
})

/** line(24), line(84), line(141) and line(252) are the superposition named 5. */
test('hd: line meets 5', () => {
  assert.equal(HdFormulas.line(24).value, 5)
  assert.equal(HdFormulas.line(84).value, 5)
  assert.equal(HdFormulas.line(141).value, 5)
  assert.equal(HdFormulas.line(252).value, 5)
})
