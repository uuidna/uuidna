import type { CollectionBeforeChangeHook } from 'payload'

import type { Page } from '@/payload-types'
import { callUuidna } from '@/utilities/uuidnaDoor'

/** A lead from the old tree enters only after its trial: the module's claim goes to the uuidna trial door, and the
 *  verdict and receipt are written on the page before it is stored. A directory page carries no claim to try. */
export const trialLead: CollectionBeforeChangeHook<Page> = async ({ data }) => {
  const lead = data.lead
  if (!lead?.path || lead.kind !== 'module' || lead.receipt) return data
  const statement = `${lead.path} exports ${lead.exports || 'nothing'} at ${lead.address}`
  const answer = await callUuidna('run_trial', { statement })
  if (answer.isError) throw new Error(`the trial door refused ${lead.path}: ${answer.text}`)
  // the door's structured answer; its text carries the gate's receipt line after the JSON
  const trial = (answer.structured ?? JSON.parse(answer.text.split('\n')[0] ?? '{}')) as { receipt?: string; verdict?: string }
  if (!trial.receipt || (trial.verdict !== 'VERIFIED' && trial.verdict !== 'UNVERIFIED'))
    throw new Error(`the trial door answered ${lead.path} without a verdict and receipt`)
  return { ...data, lead: { ...lead, receipt: trial.receipt, verdict: trial.verdict } }
}
