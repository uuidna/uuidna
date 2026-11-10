import type { CollectionAfterChangeHook, Field } from 'payload'

/** the lead page (a module of the old tree) a product or post develops */
export const developedFromField: Field = {
  name: 'developedFrom',
  type: 'relationship',
  admin: { position: 'sidebar' },
  relationTo: 'pages',
  filterOptions: { 'lead.kind': { equals: 'module' } },
}

/** A product or post that names its lead marks that lead developed: the lead page links back to what it became. A
 *  product wins over a post, so announcing a product does not overwrite the product it announces. */
export const markLeadDeveloped =
  (relationTo: 'posts' | 'products'): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    const leadID = typeof doc.developedFrom === 'object' ? doc.developedFrom?.id : doc.developedFrom
    if (!leadID) return doc
    const lead = await req.payload.findByID({ id: leadID, collection: 'pages', depth: 0, draft: true, req })
    const current = lead.lead?.developedAs
    if (current?.relationTo === 'products' && relationTo === 'posts') return doc
    if (current?.relationTo === relationTo && (typeof current.value === 'object' ? current.value.id : current.value) === doc.id) return doc
    await req.payload.update({
      id: leadID,
      collection: 'pages',
      context: { disableRevalidate: true },
      data: { lead: { ...lead.lead, developedAs: { relationTo, value: doc.id } } },
      draft: true,
      req,
    })
    return doc
  }
