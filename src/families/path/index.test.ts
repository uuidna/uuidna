import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CrossDomainPaths, pathHexOf } from './index.js'
import '../../mcp/families.js'

// path is the cross-domain path mechanism: each named path is a real chain of two or more hops across domains whose
// transform composes to a finite value. Its law (holds) is what makes a path a workflow and not a single step.
test('path: the seven named cross-domain paths each hold — a real chain (≥2 hops) with a finite value, carrying a receipt', async (t) => {
  const paths = CrossDomainPaths.allPaths()
  assert.equal(paths.length, 7, 'seven named multi-hop paths')
  for (const p of paths) {
    assert.ok(p.hops.length >= 2, `${p.hops.join('>')} is a real chain of two or more hops`)
    assert.ok(Number.isFinite(p.value ?? NaN), `${p.hops.join('>')} composes to a finite value`)
    assert.equal(p.holds, true, `${p.hops.join('>')} holds under the path law`)
    assert.ok(p.uuid && p.receipt, `${p.hops.join('>')} carries a content uuid and a receipt`)
  }
  // executePath walks the chain hop by hop, one transform per edge
  const chain = CrossDomainPaths.quantumSecurityChain()
  const walk = CrossDomainPaths.executePath(chain, {})
  assert.equal(walk.intermediate.length, chain.hops.length - 1, 'one intermediate per edge')
  assert.deepEqual(walk.path, chain.hops)
  // the family is the hex registry: every named path is a hex program that returns the path
  const fam = hexFamiliesOf().get('path')
  assert.ok((fam?.length ?? 0) >= 7, 'at least the seven named paths are registered')
  const run = (await hexRunOf(pathHexOf('qualityToRisk'))) as { holds?: boolean; handle?: string }
  assert.equal(run.holds, true, 'qualityToRisk holds when recomputed from its hex program')
  assert.ok(pathHexOf('qualityToRisk').startsWith(`${run.handle}-`), 'the run is the hex program path.qualityToRisk')
  uuidReceiptOf('path qualityToRisk', contentUuidOf(run), { uuid: pathHexOf('qualityToRisk') })
  t.diagnostic('7 named paths, each a real ≥2-hop chain with a finite value and a receipt; executePath walks one transform per edge; registered as the hex family path')
})

test('path: anomalyToResponse and dataFlowCompressML meet the superposition the unit reaches', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  assert.equal(String(CrossDomainPaths.anomalyToResponse().value), await at('path', ['anomalyToResponse'], []))
  assert.equal(String(CrossDomainPaths.dataFlowCompressML().value), await at('path', ['dataFlowCompressML'], []))
  const ways: readonly (readonly [string, string[], number[]])[] = [
    ['cross', ['medSecureWithQSec'], [5, 4]],
    ['heat', ['signal', 'cooling'], [1, 3]],
    ['heat', ['signal', 'ways'], [1, 3]],
    ['kin', ['pillar'], [1, 5]],
    ['kin', ['pillar'], [2, 6]],
    ['kin', ['pillar'], [3, 7]],
    ['kin', ['pillar'], [4, 8]],
    ['path', ['anomalyToResponse'], []],
    ['path', ['allPaths', 'anomalyToResponse'], []],
    ['path', ['anomalyToResponse', 'anomalyToResponse'], []],
    ['path', ['dataFlowCompressML', 'anomalyToResponse'], []],
    ['tesla', ['earth'], [502]],
    ['tesla', ['sync'], [4, 6]],
    ['tesla', ['slip', 'earth'], [2, 1]],
    ['tesla', ['turns', 'earth'], [2, 1]],
  ]
  const values = []
  for (const [family, program, params] of ways) values.push(await at(family, program, params))
  assert.equal(new Set(values).size, 1, values.join(' ≠ '))
  t.diagnostic(`anomalyToResponse meets ${values[0]}`)
})

test('path: secureDataPathQSec meets the superposition the unit reaches', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  assert.equal(String(CrossDomainPaths.secureDataPathQSec().value), await at('path', ['secureDataPathQSec'], []))
  const ways: readonly (readonly [string, string[], number[]])[] = [
    ['path', ['secureDataPathQSec'], []],
    ['path', ['allPaths', 'secureDataPathQSec'], []],
    ['path', ['anomalyToResponse', 'secureDataPathQSec'], []],
    ['path', ['dataFlowCompressML', 'secureDataPathQSec'], []],
    ['tesla', ['quarter'], [119]],
  ]
  const values = []
  for (const [family, program, params] of ways) values.push(await at(family, program, params))
  assert.equal(new Set(values).size, 1, values.join(' ≠ '))
  t.diagnostic(`secureDataPathQSec meets ${values[0]}`)
})
