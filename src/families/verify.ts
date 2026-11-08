import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../quantum/processing/unit/index.js'

/** THE SHARED FAMILY CHECK, so no family test repeats it. Asserts the family registers exactly `count` formulas, then
 *  runs each named case at its hex address through the MCP, checks the value and that it holds, and writes a receipt —
 *  the same dozen lines that stood at the foot of every family test, now written once. */
export const verifyHex = async (family: string, count: number, cases: readonly (readonly [string, readonly number[], number])[]): Promise<void> => {
  assert.equal(hexFamiliesOf().get(family)?.length, count, `${family}: ${count} formulas`)
  for (const [name, params, expected] of cases) {
    const uuid = qpuHexUuidOf({ family, program: [name], params: [...params] })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `${family}.${name} at ${uuid}`)
    assert.equal(run.holds, true, `${family}.${name} holds`)
    uuidReceiptOf(`${family} ${name}`, contentUuidOf(run), { uuid })
  }
}
