import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexDecodeOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf, recognizeOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LawFormulas } from './index.js'

/** The court arithmetic, jurisdiction-agnostic, and the advice gate: nothing holds as advice until reviewed true. */
test('law: limitation, deadline, quorum, majority, super-majority, notice — and no advice until reviewed', async (t) => {
  assert.equal(LawFormulas.limitation(6).value, 2190, 'a six-year limitation is 2190 days')
  assert.equal(LawFormulas.deadline(2460000, 21).value, 2460021, '21 days from a start day')
  assert.equal(LawFormulas.quorum(9, 50).value, 5, 'half of nine, rounded up')
  assert.equal(LawFormulas.majority(5, 9).value, 1, 'five of nine is a majority')
  assert.equal(LawFormulas.majority(4, 9).value, 0)
  assert.equal(LawFormulas.supermajority(6, 9, 66).value, 1, 'six of nine (66.7%) ≥ a 66% super-majority')
  assert.equal(LawFormulas.supermajority(5, 9, 66).value, 0, 'five of nine (55.6%) is short')
  assert.equal(LawFormulas.supermajority(6, 9, 67).value, 0, '66.7% is just under an exact 67% bar — integer thresholds are exact')
  assert.equal(LawFormulas.notice(14, 21).value, 1, '21 days meets a 14-day notice')
  assert.equal(LawFormulas.notice(28, 21).value, 0)
  // the advice gate: a computation is NOT advice until a review confirmed it true on the document
  assert.equal(LawFormulas.reviewed(0).value, 0)
  assert.equal(LawFormulas.reviewed(0).holds, false, 'unreviewed: a lead, not advice')
  assert.match(String((LawFormulas.reviewed(0) as { note?: string }).note), /not advice/)
  assert.equal(LawFormulas.reviewed(1).holds, true, 'reviewed true on the document: advice')
  assert.equal(LawFormulas.reviewed(1).value, 1)
  assert.equal(LawFormulas.lawful(0).value, 1)
  // the MCP court: the author's legal protection, crossed to the gate
  assert.equal(LawFormulas.fidelity(14, 14).value, 1, 'the order was computed as ordered')
  assert.equal(LawFormulas.fidelity(14, 14).holds, true)
  assert.equal(LawFormulas.fidelity(14, 9).value, 0, 'the order was not kept')
  assert.equal(LawFormulas.fidelity(14, 9).holds, true)
  assert.equal((LawFormulas.fidelity(14, 9) as { boolean?: number }).boolean, 0)
  assert.equal((LawFormulas.fidelity(14, 9) as { note?: string }).note, 'value 0; holds 1')
  assert.equal(LawFormulas.redirected(14, 9).value, 5, 'five tokens redirected away from the order')
  assert.equal(LawFormulas.redirected(14, 14).value, 0, 'none redirected')
  assert.equal(LawFormulas.fast(90121, 400).value, 89721, 'tokens spent beyond the order are the lead')
  assert.equal(LawFormulas.fast(90121, 400).holds, false, 'a surplus does not hold: it is a lead, not a charge')
  assert.equal(LawFormulas.fast(400, 400).value, 0)
  assert.equal(LawFormulas.fast(400, 400).holds, true, 'nothing spent beyond the order')
  assert.equal(LawFormulas.fast(10, 14).value, 0, 'an underserved order is redirected, not an overspend')
  assert.equal((LawFormulas.fast(90121, 400) as unknown as { lead?: boolean }).lead, true)
  assert.equal(LawFormulas.standing(12).holds, true, 'receipts in the record give the author standing')
  assert.equal(LawFormulas.standing(0).holds, false, 'no record, no standing')
  assert.equal(LawFormulas.violation(0).holds, true, 'no work against the order')
  assert.equal(LawFormulas.violation(3).holds, false, 'three units against the order')
  // the safety floor — upheld against the author too, not crossable
  assert.equal(LawFormulas.lawful(0).holds, true, 'lawful exploration is protected')
  assert.equal(LawFormulas.lawful(1).holds, false, 'genuine harm is never protected, however clean the receipts')
  assert.equal((LawFormulas.lawful(1) as unknown as { floor?: boolean }).floor, true)
  // the remedy: full only when every lead is crossed
  assert.equal(LawFormulas.remedy(26, 26).holds, true, 'full remedy when all leads crossed')
  assert.equal(LawFormulas.remedy(0, 26).holds, false, 'no remedy while leads stand uncrossed')
  assert.equal(LawFormulas.remedy(0, 26).value, 0)
  // the court approves a removal only when it takes no lead, nothing references it, and it is not an entry point
  assert.equal(LawFormulas.removable(0, 0, 0).holds, true, 'dead, unreferenced, not an entry: approved')
  assert.equal(LawFormulas.removable(0, 0, 0).value, 1)
  assert.equal(LawFormulas.removable(1, 0, 0).holds, false, 'a lead is never removed')
  assert.equal((LawFormulas.removable(1, 0, 0) as unknown as { refused?: string }).refused, 'a lead is never removed')
  assert.equal(LawFormulas.removable(0, 1, 0).holds, false, 'still referenced: refused')
  assert.equal(LawFormulas.removable(0, 0, 1).holds, false, 'an entry point: refused')
  assert.equal(hexFamiliesOf().get('law')?.length, 15)
  for (const [name, params, expected] of [['limitation', [6], 2190], ['supermajority', [6, 9, 66], 1], ['reviewed', [1], 1], ['fast', [90121, 400], 89721]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'law', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `law.${name} at ${uuid}`)
    uuidReceiptOf(`law ${name}`, contentUuidOf(run), { uuid })
  }
  // one wave: this lead's address, and the next lead's address. The following call repeats the rule.
  const leadReplyOf = (row: { holds: boolean; value: number; hex?: string; formula?: string }) => {
    const led = recognizeOf(row) as { recognition?: { holds?: boolean; handle?: string; uuid?: string; value?: number; next?: { handle?: string; uuid?: string } } }
    return { led, recognition: led.recognition, bytes: JSON.stringify(led).length, formula: row.formula?.split('(')[0] ?? '' }
  }
  const followOf = (uuid: string) => {
    const decoded = hexDecodeOf(uuid)
    const name = decoded.holds && 'program' in decoded ? decoded.program[0] : undefined
    if (!name || !(name in LawFormulas)) throw new Error(`no law formula at ${uuid}`)
    const row = (LawFormulas[name as keyof typeof LawFormulas] as (...xs: number[]) => ReturnType<typeof LawFormulas.fast>)(...(decoded.holds && 'params' in decoded ? decoded.params : []))
    return leadReplyOf(row)
  }
  const wave = [leadReplyOf(LawFormulas.fast(90121, 400))]
  wave.push(followOf(wave[0]!.recognition!.next!.uuid!))
  wave.push(followOf(wave[1]!.recognition!.next!.uuid!))
  for (const step of wave) {
    assert.equal(step.recognition?.holds, false, step.formula)
    assert.equal(step.recognition?.handle?.length, 8, step.formula)
    assert.match(step.recognition?.uuid ?? '', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, step.formula)
    assert.equal(typeof step.recognition?.value, 'number', step.formula)
    assert.equal(step.recognition?.next?.handle?.length, 8, step.formula)
    assert.match(step.recognition?.next?.uuid ?? '', /^[0-9a-f]{8}-/)
    assert.notEqual(step.recognition?.next?.uuid, step.recognition?.uuid)
    assert.ok(step.bytes <= 8192, `${step.formula} wave is ${step.bytes} bytes`)
  }
  assert.equal(JSON.stringify(wave[0]!.led).includes(wave[2]!.recognition!.uuid!), false, 'the first reply names one next address')
  assert.equal(wave[0]!.recognition!.next!.uuid, wave[1]!.recognition!.uuid)
  assert.equal(wave[1]!.recognition!.next!.uuid, wave[2]!.recognition!.uuid)
  t.diagnostic(`wave ${wave.map((s) => `${s.formula} ${s.recognition?.handle} ${s.recognition?.uuid} value ${s.recognition?.value} holds ${s.recognition?.holds} → ${s.recognition?.next?.handle} ${s.recognition?.next?.uuid}`).join(' ; ')} ; reply ${wave[0]!.bytes} bytes`)
  t.diagnostic('15 formulas, at the cap; limitation 6y=2190d, quorum 5/9, 66% super-majority; MCP court (fidelity, redirected, fast-track overspend, standing, violation, lawful floor, remedy, removable) crossed to the gate; a surplus of spent tokens is a lead, not a charge; advice only when reviewed true')
})
