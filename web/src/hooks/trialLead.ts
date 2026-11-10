import { APIError, type CollectionAfterChangeHook, type CollectionBeforeChangeHook, type Field } from 'payload'

import type { Product } from '@/payload-types'
import { callUuidna } from '@/utilities/uuidnaDoor'

/** A product that is a lead: one module of the old tree (src/, legacy/web/, worker.js), taken in to be developed here. */
export const leadField: Field = {
  name: 'lead',
  type: 'group',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'path', type: 'text', index: true, unique: true },
    { name: 'address', type: 'text', admin: { readOnly: true } },
    { name: 'exports', type: 'text', admin: { readOnly: true } },
    { name: 'task', type: 'textarea', admin: { readOnly: true } },
    { name: 'version', type: 'text', admin: { readOnly: true } },
    { name: 'size', type: 'number', admin: { readOnly: true } },
    {
      name: 'evidence',
      type: 'text',
      admin: { description: 'A sealed theorem key that backs this module’s claim. Changing it re-runs the trial.' },
    },
    { name: 'verdict', type: 'select', options: ['VERIFIED', 'UNVERIFIED'], admin: { readOnly: true } },
    { name: 'receipt', type: 'text', admin: { readOnly: true } },
  ],
}

type Lead = NonNullable<Product['lead']>

const paragraph = (text: string) => ({
  type: 'paragraph' as const,
  children: [{ type: 'text' as const, detail: 0, format: 0, mode: 'normal' as const, style: '', text, version: 1 }],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  textStyle: '',
  version: 1,
})

const statementOf = (lead: Lead) =>
  `${lead.path} exports ${lead.exports || 'nothing'} at ${lead.address}` + (lead.evidence ? `, backed by theorem ${lead.evidence}` : '')

/** The trial, the ISO/IEC 25051 description, and the publish guard, computed before a lead product is stored.
 *  - The module's claim goes to the uuidna trial door first, and again whenever its evidence changes.
 *  - The description and SEO meta are derived from the lead: identification (5.1.3.1), work task (5.1.3.4), limits
 *    (5.1.5.4) and verification status (5.1.2.4).
 *  - A lead whose claim the trial does not verify cannot be published: an advertised claim a test does not support is
 *    fixed or withdrawn (25051 clause 2(c)). */
export const leadProduct: CollectionBeforeChangeHook<Product> = async ({ data, originalDoc }) => {
  const lead = data.lead
  if (!lead?.path) return data
  let { receipt, verdict } = lead
  if (!receipt || originalDoc?.lead?.evidence !== lead.evidence) {
    const answer = await callUuidna('run_trial', { statement: statementOf(lead) })
    if (answer.isError) throw new APIError(`the trial door refused ${lead.path}: ${answer.text}`, 502)
    // the door's structured answer; its text carries the gate's receipt line after the JSON
    const trial = (answer.structured ?? JSON.parse(answer.text.split('\n')[0] ?? '{}')) as { receipt?: string; verdict?: string }
    if (!trial.receipt || (trial.verdict !== 'VERIFIED' && trial.verdict !== 'UNVERIFIED'))
      throw new APIError(`the trial door answered ${lead.path} without a verdict and receipt`, 502)
    receipt = trial.receipt
    verdict = trial.verdict
  }
  if ((data._status ?? originalDoc?._status) === 'published' && verdict !== 'VERIFIED')
    throw new APIError(
      `ISO/IEC 25051 2(c): ${lead.path} is ${verdict ?? 'untried'}; a product is published only when its claim is verified. Give the lead its evidence first.`,
      400,
    )
  const quantum = lead.path.includes('/quantum/')
  const lines = [
    `Identification (ISO/IEC 25051 5.1.3.1): ${data.title}, uuidna ${lead.version ?? 'unversioned'}, content address ${lead.address}.`,
    `Work task (5.1.3.4): ${lead.task || 'the module states no work task in its header.'}`,
    `Limits (5.1.5.4): ${lead.size ?? 0} bytes, ${lead.exports ? lead.exports.split(', ').length : 0} exports.` +
      (quantum ? ' Runs on a classical exact simulator; no physical qubits.' : ''),
    `Verification (5.1.2.4): ${verdict} by the uuidna trial door, receipt ${receipt}.`,
  ]
  return {
    ...data,
    description: {
      root: { type: 'root', children: lines.map(paragraph), direction: 'ltr', format: '', indent: 0, version: 1 },
    },
    lead: { ...lead, receipt, verdict },
    meta: { ...data.meta, title: data.title, description: `${lead.task || lead.path} (${verdict})`.slice(0, 160) },
  }
}

/** A lead that turns VERIFIED develops its capabilities as variants: one variant type for the lead, one option and one
 *  variant per export. Runs once, inside the request that verified it. */
export const leadVariants: CollectionAfterChangeHook<Product> = async ({ context, doc, req }) => {
  const lead = doc.lead
  if (context.leadVariants || lead?.verdict !== 'VERIFIED' || doc.enableVariants || !lead.exports) return doc
  const { payload } = req
  const type = await payload.create({ collection: 'variantTypes', data: { label: `${doc.title} exports`, name: `lead-${doc.id}` }, req })
  const options = []
  for (const name of lead.exports.split(', '))
    options.push(await payload.create({ collection: 'variantOptions', data: { label: name, value: name, variantType: type.id }, req }))
  await payload.update({
    id: doc.id,
    collection: 'products',
    context: { leadVariants: true },
    data: { enableVariants: true, variantTypes: [type.id] },
    req,
  })
  for (const option of options)
    await payload.create({
      collection: 'variants',
      context: { leadVariants: true },
      data: { options: [option.id], product: doc.id, title: `${doc.title}: ${option.label}` },
      req,
    })
  return doc
}
