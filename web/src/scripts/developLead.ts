import { PROSE, proseFill } from '@uuidna/qpu/prose'
import { getPayload } from 'payload'

import config from '@payload-config'
import { PRODUCT_CLAIMS } from '@/products/claims'

/** Develop one lead into a product and the post that publishes it, through the Local API with access and
 *  hooks running: `LEAD_PATH=<module path> pnpm payload run src/scripts/developLead.ts`. The products and posts
 *  afterChange hooks mark the lead page developed. Acts as LEGACY_ADMIN_EMAIL (the user queueLegacyLeads resolves). */
const leadPath = process.env.LEAD_PATH || ''
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@qpu.localhost'
const payload = await getPayload({ config })

const admin = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })).docs[0]
if (!admin?.roles?.includes('admin')) throw new Error(proseFill(PROSE.scriptsDevelopLead_s1, email))
const user = { ...admin, collection: 'users' as const }

const lead = (await payload.find({ collection: 'pages', draft: true, limit: 1, user, where: { 'lead.path': { equals: leadPath } } })).docs[0]
if (!lead) throw new Error(proseFill(PROSE.scriptsDevelopLead_s2, leadPath, leadPath))
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

// the claims' first product, developed from this lead; closeProducts gives it its variants and its description
const claim = PRODUCT_CLAIMS[0]!
const product = await payload.create({
  collection: 'products',
  data: { title: claim.title, slug: claim.slug, developedFrom: lead.id, tenant, _status: 'published' },
  draft: false,
  user,
})
const post = await payload.create({
  collection: 'posts',
  context: { disableRevalidate: true },
  data: {
    title: `${product.title}: developed from ${leadPath}`,
    slug: `${product.slug}-developed`,
    content: text(proseFill(PROSE.scriptsDevelopLead_s3, product.title, leadPath)),
    developedFrom: lead.id,
    _status: 'published',
  },
  draft: false,
  user,
})
const after = await payload.findByID({ id: lead.id, collection: 'pages', depth: 0, draft: true, user })
payload.logger.info({ msg: 'lead developed', lead: leadPath, product: product.id, post: post.id, developedAs: after.lead?.developedAs })
process.exit(0)
