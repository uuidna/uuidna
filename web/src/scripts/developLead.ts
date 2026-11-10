import { getPayload } from 'payload'

import config from '@payload-config'

/** Develop one lead into a product with variants and the post that publishes it, through the Local API with access and
 *  hooks running: `LEAD_PATH=src/quantum/index.ts pnpm payload run src/scripts/developLead.ts`. The products and posts
 *  afterChange hooks mark the lead page developed. Acts as LEGACY_ADMIN_EMAIL (the user queueLegacyLeads resolves). */
const leadPath = process.env.LEAD_PATH || 'src/quantum/index.ts'
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@uuidna.localhost'
const payload = await getPayload({ config })

const admin = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })).docs[0]
if (!admin?.roles?.includes('admin')) throw new Error(`${email} is not an admin here: run queueLegacyLeads first or name one`)
const user = { ...admin, collection: 'users' as const }

const lead = (await payload.find({ collection: 'pages', draft: true, limit: 1, user, where: { 'lead.path': { equals: leadPath } } })).docs[0]
if (!lead) throw new Error(`no lead page for ${leadPath}: queue it with LEGACY_PATHS=${leadPath}`)
const tenant = typeof lead.tenant === 'object' ? lead.tenant?.id : lead.tenant

const text = (t: string) => ({
  root: {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, detail: 0, format: 0, mode: 'normal' as const, style: '', text: t, version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

// the circuit widths the uuidna_quantum program runs exactly: Bell on 2 qubits, GHZ on 3
const qubits = await payload.create({ collection: 'variantTypes', data: { label: 'Qubits', name: 'qubits' }, user })
const options = await Promise.all(
  ['2', '3'].map((value) => payload.create({ collection: 'variantOptions', data: { label: `${value} qubits`, value, variantType: qubits.id }, user })),
)
const product = await payload.create({
  collection: 'products',
  data: {
    title: 'Exact quantum circuit run',
    slug: 'exact-quantum-circuit-run',
    description: text(`An exact run of a Clifford + Toffoli circuit on a classical simulator, answered by the uuidna_quantum program. Developed from ${leadPath}.`),
    enableVariants: true,
    variantTypes: [qubits.id],
    developedFrom: lead.id,
    tenant,
    _status: 'published',
  },
  draft: false,
  user,
})
for (const option of options)
  await payload.create({
    collection: 'variants',
    data: { product: product.id, options: [option.id], title: `${product.title}, ${option.label}`, _status: 'published' },
    user,
  })
const post = await payload.create({
  collection: 'posts',
  context: { disableRevalidate: true },
  data: {
    title: `${product.title}: developed from ${leadPath}`,
    slug: `${product.slug}-developed`,
    content: text(`${product.title} is now a product, with variants for 2 and 3 qubits. It was developed from the lead ${leadPath}, which entered this installation through the uuidna trial door.`),
    developedFrom: lead.id,
    _status: 'published',
  },
  draft: false,
  user,
})
const after = await payload.findByID({ id: lead.id, collection: 'pages', depth: 0, draft: true, user })
payload.logger.info({ msg: 'lead developed', lead: leadPath, product: product.id, post: post.id, developedAs: after.lead?.developedAs })
process.exit(0)
