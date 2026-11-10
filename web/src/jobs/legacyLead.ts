import type { TaskConfig } from 'payload'

/** a paragraph of plain text as the Lexical state the Content block's richText field stores */
const paragraph = (text: string) => ({
  root: {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph' as const,
        children: [{ type: 'text' as const, detail: 0, format: 0, mode: 'normal' as const, style: '', text, version: 1 }],
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

const slugOf = (path: string) => path.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** One module of the old tree, taken in as a lead: its directories become nested pages (plugin-nested-docs), and the
 *  module becomes a page under the last of them. The Pages beforeChange hook sends the module to the uuidna trial door
 *  first, so a lead is stored only with its verdict and receipt. */
export const legacyLeadTask: TaskConfig<{
  input: { address: string; exports: string; path: string; tenant: number }
  output: { page: number }
}> = {
  slug: 'legacyLead',
  inputSchema: [
    { name: 'path', type: 'text', required: true },
    { name: 'exports', type: 'text' },
    { name: 'address', type: 'text', required: true },
    { name: 'tenant', type: 'number', required: true },
  ],
  outputSchema: [{ name: 'page', type: 'number', required: true }],
  handler: async ({ input, req }) => {
    const { payload } = req
    const context = { disableRevalidate: true }
    const leadPage = async (path: string, parent: number | undefined, kind: 'directory' | 'module') => {
      const found = await payload.find({ collection: 'pages', depth: 0, limit: 1, req, where: { 'lead.path': { equals: path } } })
      if (found.docs[0]) return found.docs[0].id
      const created = await payload.create({
        collection: 'pages',
        context,
        data: {
          title: path.split('/').pop() || path,
          slug: slugOf(path),
          parent,
          tenant: input.tenant,
          layout: [
            {
              blockType: 'content',
              columns: [{ size: 'full', richText: paragraph(kind === 'module' ? `${path} exports ${input.exports || 'nothing'}.` : `${path}/`) }],
            },
          ],
          lead: kind === 'module' ? { kind, path, address: input.address, exports: input.exports } : { kind, path },
        },
        draft: true,
        req,
      })
      return created.id
    }
    const parts = input.path.split('/')
    let parent: number | undefined
    for (let i = 1; i < parts.length; i++) parent = await leadPage(parts.slice(0, i).join('/'), parent, 'directory')
    return { output: { page: await leadPage(input.path, parent, 'module') } }
  },
}
