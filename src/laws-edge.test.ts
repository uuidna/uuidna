// laws-edge — THE LAWS DOOR ANSWERS WHERE THERE IS NO FILESYSTEM. uuidna.com/mcp answered uuidna_laws with the
// boundary's refusal (2026-09-14): a law's check reached the disk on a surface that has none. This loads the laws in a
// child the way the Worker has them — process.getBuiltinModule removed before any module evaluates, an empty working
// directory, and process itself hidden while laws() runs — and asks that every law answer. A law the edge cannot
// measure must say so with its reason and report holds:false; every other law must agree with the host.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { laws } from './laws.js'
import { axiomWitness } from './axiom-witness.js'
import { runEvidenceOf } from './run-evidence.js'

interface EdgeLaw { enforcedBy: string; holds: boolean; unmeasured: string | null }
interface EdgeVerdict { control: string; err: string; laws: EdgeLaw[] | null; unmeasured: string[] | null; witness: { measured: boolean; why: string | null; shipped: boolean; holds: boolean } | null }

const edge = (): EdgeVerdict => {
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-laws-nofs-'))
  const at = (rel: string): string => JSON.stringify(new URL(rel, import.meta.url).href)
  const script = `
delete process.getBuiltinModule
const { rdRoot } = await import(${at('./boundary.js')})
const { laws } = await import(${at('./laws.js')})
const { axiomWitness } = await import(${at('./axiom-witness.js')})
let control = ''
try { rdRoot('package.json') } catch (e) { control = String(e.message) }
const log = console.log.bind(console), saved = globalThis.process
Object.defineProperty(globalThis, 'process', { value: undefined, configurable: true, writable: true })
let r = null, w = null, err = ''
try { r = laws(); w = axiomWitness() } catch (e) { err = String(e?.message ?? e) }
Object.defineProperty(globalThis, 'process', { value: saved, configurable: true, writable: true })
log(JSON.stringify({ control, err,
  laws: r && r.laws.map((l) => ({ enforcedBy: l.enforcedBy, holds: l.holds, unmeasured: l.unmeasured ?? null })),
  unmeasured: r && r.unmeasured,
  witness: w && { measured: w.measured, why: w.why ?? null, shipped: w.shipped, holds: w.holds } }))
process.exit(0)`
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', script], { cwd: dir, encoding: 'utf8', timeout: 600_000 })
  rmSync(dir, { recursive: true, force: true })
  const line = r.stdout.trim().split('\n').pop() ?? ''
  assert.ok(line.startsWith('{'), `the child produced no verdict (exit ${r.status}):\n${r.stderr.slice(-600)}`)
  return JSON.parse(line) as EdgeVerdict
}

test('laws() answers with no filesystem and no process, and no law it cannot measure reads as holding', () => {
  const v = edge()
  // NEGATIVE CONTROL FIRST: the boundary must refuse in the child, or it still has a filesystem and the pass is vacuous
  assert.match(v.control, /Node-only/, 'the child still reads the filesystem — this is not modelling the Worker')
  assert.equal(v.err, '', `laws() threw on the edge: ${v.err}`)
  assert.ok(v.laws && v.laws.length > 0, 'the laws answered')
  const host = new Map(laws().laws.map((l) => [l.enforcedBy, l]))
  for (const l of v.laws!) {
    assert.equal(typeof l.holds, 'boolean', `${l.enforcedBy}: holds is computed`)
    if (l.unmeasured !== null) {
      assert.ok(l.unmeasured.length > 0, `${l.enforcedBy}: an unmeasured law names why`)
      assert.equal(l.holds, false, `${l.enforcedBy}: a law not measured here must never read as holding`)
    } else {
      assert.equal(l.holds, host.get(l.enforcedBy)?.holds, `${l.enforcedBy}: a law the edge measures must agree with the host`)
    }
  }
  assert.deepEqual(v.unmeasured, v.laws!.filter((l) => l.unmeasured !== null).map((l) => l.enforcedBy), 'the summary names exactly the unmeasured laws')
  // the witness reads a file: on the edge it is not measured, and says so, rather than reporting a missing receipt
  assert.ok(v.witness, 'the witness answered')
  assert.equal(v.witness!.measured, false)
  assert.match(v.witness!.why ?? '', /filesystem/)
  assert.equal(v.witness!.holds, false, 'an unread receipt is never a clean one')
})

test('CONTROL: on the host the same laws are all measured, and the witness is read', () => {
  const r = laws()
  assert.deepEqual(r.unmeasured, [], 'the host measures every law')
  assert.ok(r.laws.every((l) => l.unmeasured === undefined))
  const w = axiomWitness()
  assert.equal(w.measured, true)
  assert.equal(w.why, undefined)
})

test('the receipt law checks both directions: readings read back, none are invented, an absent log is not measured', () => {
  const row = { file: 'k.lean', readings: { ns: '7', die: [{ measured: true, millikelvin: 310000, source: 's' }], battery: null } }
  const saved = runEvidenceOf('trial-rows', JSON.stringify(row) + '\n')
  assert.equal(saved.measured, true)
  if (!saved.measured) return
  assert.equal(saved.latest[0]!.ns, '7')
  assert.equal(saved.latest[0]!.dieMax, 310000)
  const bare = runEvidenceOf('trial-rows', JSON.stringify({ file: 'k.lean' }) + '\n')
  assert.equal(bare.measured, true)
  if (!bare.measured) return
  assert.equal(bare.latest[0]!.ns, null, 'no readings were saved, so none read back')
  assert.equal(runEvidenceOf('trial-rows', null).measured, false)
  assert.equal(runEvidenceOf('unnamed-run', JSON.stringify(row) + '\n').measured, false)
  const law = laws().laws.find((l) => l.enforcedBy.startsWith('run-evidence runEvidenceOf'))
  assert.ok(law?.holds, 'the receipt law holds by the same checks')
  assert.match(law!.law, /device readings taken as it finished/)
})
