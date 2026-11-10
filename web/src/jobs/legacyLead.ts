import type { TaskConfig } from 'payload'

const slugOf = (path: string) => path.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** One module of the old tree, taken in as a lead product: its directories become nested categories
 *  (plugin-nested-docs), and the module becomes a draft product in the last of them. The products beforeChange hook
 *  sends the module to the uuidna trial door first and writes its ISO/IEC 25051 description, so a lead is stored only
 *  with its verdict and receipt. */
export const legacyLeadTask: TaskConfig<{
  input: { address: string; exports: string; path: string; size: number; task: string; tenant: number; version: string }
  output: { product: number }
}> = {
  slug: 'legacyLead',
  inputSchema: [
    { name: 'path', type: 'text', required: true },
    { name: 'exports', type: 'text' },
    { name: 'address', type: 'text', required: true },
    { name: 'task', type: 'text' },
    { name: 'version', type: 'text' },
    { name: 'size', type: 'number' },
    { name: 'tenant', type: 'number', required: true },
  ],
  outputSchema: [{ name: 'product', type: 'number', required: true }],
  handler: async ({ input, req }) => {
    const { payload } = req
    const context = { disableRevalidate: true }
    const parts = input.path.split('/')
    let parent: number | undefined
    for (let i = 1; i < parts.length; i++) {
      const slug = slugOf(parts.slice(0, i).join('/'))
      const found = await payload.find({ collection: 'categories', depth: 0, limit: 1, req, where: { slug: { equals: slug } } })
      parent =
        found.docs[0]?.id ??
        (await payload.create({ collection: 'categories', context, data: { title: parts[i - 1]!, slug, parent }, req })).id
    }
    const existing = await payload.find({ collection: 'products', depth: 0, draft: true, limit: 1, req, where: { 'lead.path': { equals: input.path } } })
    if (existing.docs[0]) return { output: { product: existing.docs[0].id } }
    const product = await payload.create({
      collection: 'products',
      context,
      data: {
        title: parts[parts.length - 1] || input.path,
        slug: slugOf(input.path),
        categories: parent ? [parent] : [],
        tenant: input.tenant,
        lead: {
          path: input.path,
          address: input.address,
          exports: input.exports,
          task: input.task,
          version: input.version,
          size: input.size,
        },
      },
      draft: true,
      req,
    })
    return { output: { product: product.id } }
  },
}
