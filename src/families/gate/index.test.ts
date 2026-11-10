import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexRunOf, qpuHexUuidOf } from '../../quantum/processing/unit/index.js'
import '../../mcp/families.js'

/** gate.push is computed here, on this unit. The receipt's 503 is the live host not answering the cite, a remote
 *  lead. It is not the value of the formula. One slice: the walk is push(from) then next, and this call does not
 *  repeat it against the host. */
test('gate.push(0) holds on the local unit; 503 is the remote lead', async (t) => {
  const uuid = qpuHexUuidOf({ family: 'gate', program: ['push'], params: [0] })
  const local = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean; steps?: { reading?: { failing?: string[]; next?: number } }[] }
  const reading = local.steps?.at(-1)?.reading
  assert.equal(local.holds, true, `gate.push(0) at ${uuid}`)
  assert.notEqual(String(local.value), '503', '503 is the host status, not this value')
  assert.deepEqual(reading?.failing ?? [], [])
  t.diagnostic(`local gate.push(0) = ${local.value} holds at ${uuid}; next ${reading?.next}; remote lead 503 unreached`)
})
