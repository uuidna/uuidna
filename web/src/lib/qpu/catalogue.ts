// What Payload holds of the Lean catalogue: the pages, categories, products and variants, planned from the indexes Lean
// writes. A clause is a page; a module is a page nested under its clause and a category; a theorem is a product of
// that category; each example the theorem names is a variant of the product, an option of the one variant type.
// The standards are pages too: one for the register, one for each standard under it, and one for each term of the
// vocabulary standard under that standard, each with the theorem Lean names as its witness.
// Pure: the plan is data, and src/scripts/seedCatalogue.ts writes it through Payload's local API. Moved from @uuidna/qpu (catalogue-seed.ts).
import { ISO_CLAUSES, ISO_SAYS, ISO_STANDARDS, ISO_VOCABULARY } from '@uuidna/qpu/iso'
import { NESTED, NESTED_COUNTS } from '@uuidna/qpu/nested'
import { MODULE_DOCS, THEOREMS } from '@uuidna/qpu/theorems'
import { TENANTS } from '@uuidna/qpu/tenants'

const fill = (template: string, ...values: unknown[]) => template.replace(/⟦(\d+)⟧/g, (_, i: string) => String(values[Number(i)]))
export const slugOf = (name: string) => name.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase()

const paragraph = (text: string) => ({ type: 'paragraph' as const, version: 1, format: '' as const, indent: 0, direction: 'ltr' as const, textFormat: 0, textStyle: '', children: [{ type: 'text' as const, version: 1, text, format: 0, mode: 'normal' as const, style: '', detail: 0 }] })
/** Lexical rich text of the lines given, one paragraph each. */
export const richText = (lines: readonly string[]) => ({ root: { type: 'root' as const, version: 1, direction: 'ltr' as const, format: '' as const, indent: 0, children: lines.filter((line) => line.trim().length > 0).map(paragraph) } })
/** Lexical rich text under an h1 heading. */
export const headedText = (heading: string, lines: readonly string[]) => { const body = richText(lines); return { root: { ...body.root, children: [{ type: 'heading' as const, tag: 'h1' as const, version: 1, format: '' as const, indent: 0, direction: 'ltr' as const, children: [{ type: 'text' as const, version: 1, text: heading, format: 0, mode: 'normal' as const, style: '', detail: 0 }] }, ...body.root.children] } } }


/** The prose of a module doc: its title line and any frontmatter left out. */
const proseOf = (doc: string | undefined) => {
  const lines = (doc ?? '').split('\n').map((line) => line.trim())
  const body = lines[1] === '---' ? lines.slice(lines.indexOf('---', 2) + 1) : lines.slice(1)
  return body.join(' ').replace(/\s+/g, ' ').trim()
}

/** The Lean module that holds the register of standards, and the title of its page. */
export const ISO_MODULE = 'Qpu.General.Iso'
export const ISO_ROOT = 'Standards'

export const VARIANT_TYPE = { name: 'example', label: 'Example' } as const

/** The whole plan, or the plan of the modules named. */
export const planCatalogue = (only?: readonly string[]) => {
  const [domain, tenant] = Object.entries(TENANTS)[0]!
  const stated = new Map(THEOREMS.map((t) => [t.key, t]))
  const modules = NESTED.filter((page) => !only?.length || only.includes(page.module))
  const clauses = [...new Set(modules.map((page) => page.clause))]
  const pages = [
    ...clauses.map((clause) => ({ title: clause, slug: slugOf(clause), parent: null as string | null, text: [clause] })),
    ...modules.map((page) => ({ title: page.module, slug: slugOf(page.module), parent: slugOf(page.clause), text: [proseOf(MODULE_DOCS[page.module]) || page.module] })),
  ]
  if (!only?.length || only.includes(ISO_MODULE)) {
    const root = slugOf(ISO_ROOT)
    pages.push({ title: ISO_ROOT, slug: root, parent: null, text: [ISO_SAYS] })
    for (const standard of ISO_STANDARDS) pages.push({ title: standard.reference, slug: slugOf(standard.reference), parent: root, text: [standard.says, standard.statement ?? ''] })
    for (const term of ISO_CLAUSES) pages.push({ title: `${term.clause} ${term.name}`, slug: slugOf(`${ISO_VOCABULARY} ${term.clause}`), parent: slugOf(ISO_VOCABULARY), text: [term.says, term.statement] })
  }
  const categories = modules.filter((page) => page.products.length > 0).map((page) => ({ title: page.module, slug: slugOf(page.module) }))
  const products = modules.flatMap((page) => page.products.map((product) => {
    const theorem = stated.get(product.theorem)
    return { title: product.theorem, slug: slugOf(product.theorem), category: slugOf(page.module), description: [theorem?.doc ?? '', theorem?.statement ?? ''], variants: [...product.variants] }
  }))
  const options = [...new Set(products.flatMap((product) => product.variants))].sort()
  // the home page: what the shop is, in Lean's own counts, and the products themselves; three with variants come first
  const featured = [...products.filter((product) => product.variants.length > 0), ...products].slice(0, 3).map((product) => product.slug)
  const home = {
    title: "Quantum Processing Unit", slug: 'home', featured,
    lead: fill("Every theorem the Lean kernel accepted is a product here, and each example a theorem names is a variant of it: ⟦0⟧ products in ⟦1⟧ textbooks under ⟦2⟧ clauses of ISO/IEC 4879:2024, with ⟦3⟧ variants.", NESTED_COUNTS.products, NESTED_COUNTS.textbooks, new Set(NESTED.map((page) => page.clause)).size, NESTED_COUNTS.variants),
    text: ["A product is shown by the QR code of its own address, and each variation by its own code: scanning one opens exactly that variation.", "Each textbook is a page under its clause, and its theorems are in the shop under the textbook's name."],
  }
  return { tenant: { name: tenant, slug: tenant, domain }, variantType: VARIANT_TYPE, options, home, pages, categories, products, counts: { pages: pages.length, categories: categories.length, products: products.length, variants: products.reduce((n, p) => n + p.variants.length, 0), options: options.length } }
}
