// The MCP is the website. Nested docs covers the URL. The page holds the content. Moved from @uuidna/qpu (payload/mcp-seeds.ts).
// SEO, search, redirects, import-export, the form builder, Stripe, and the MCP plugin read those pages.
// Nothing is written here.
import { formatSlug, nestedUrl, pageSeed } from '@uuidna/qpu/page-seed'
import { canonicalText, uuid } from '@uuidna/qpu/blocks'

// The website's collections and globals its MCP plugin serves (moved from @uuidna/qpu net/website-catalogue.ts).
/** The website's collections and globals, as the MCP plugin is given them. */
export const WEBSITE_MCP_COLLECTIONS = {
  'case-studies': 'Case studies',
  'community-help': 'Community help',
  docs: 'Docs',
  'docs-feedback': 'Docs feedback',
  media: 'Media',
  pages: 'Pages',
  posts: 'Posts',
  categories: 'Categories',
  'reusable-content': 'Reusable content',
  users: 'Users',
  partners: 'Partners',
  industries: 'Industries',
  specialties: 'Specialties',
  regions: 'Regions',
  budgets: 'Budgets',
} as const

export const WEBSITE_MCP_GLOBALS = {
  footer: 'Footer',
  'main-menu': 'Main menu',
  'get-started': 'Get started',
  'partner-program': 'Partner program',
  topBar: 'Top bar',
} as const

type McpToolSeed = { name: string; toolbox: string; description: string }
type McpHostSeed = { name: string; url: string }

type SeedPage = ReturnType<typeof pageSeed> & { parentId: string | null; parentSlug: string | null; depth: number; kind: 'mcp' | 'collection' | 'global' | 'toolbox' | 'tool' | 'host' | 'path' | 'route'; url: string; addressed: true }

const ORIGIN = 'https://qpu.uuidna.com'
const segmentsOf = (url: string) => {
  const path = new URL(url).pathname.split('/').filter(Boolean).map((segment) => formatSlug(segment)).filter(Boolean)
  return path.length > 0 ? path : ['index']
}

const chainOf = (page: SeedPage, byId: Map<string, SeedPage>): SeedPage[] => {
  const chain: SeedPage[] = []
  let cursor: SeedPage | undefined = page
  const seen = new Set<string>()
  while (cursor && !seen.has(cursor.id)) {
    seen.add(cursor.id)
    chain.unshift(cursor)
    cursor = cursor.parentId ? byId.get(cursor.parentId) : undefined
  }
  return chain
}

export const mcpPages = (tools: readonly McpToolSeed[], hosts: readonly McpHostSeed[] = []) => {
  const root = pageSeed('mcp', "The website serves this MCP at /api/mcp. Nested docs covers each URL below. The 1000-bit cofactor stays open. No prime factor is written.")
  const pages: SeedPage[] = [{ ...root, _status: 'published' as const, parentId: null, parentSlug: null, depth: 1, kind: 'mcp', url: '', addressed: true }]
  const add = (title: string, text: string, parent: SeedPage, kind: SeedPage['kind']) => {
    const page = pageSeed(title, text, uuid(canonicalText({ title, text, parent: parent.id, kind })))
    const row: SeedPage = { ...page, _status: 'published' as const, parentId: parent.id, parentSlug: parent.slug, depth: parent.depth + 1, kind, url: '', addressed: true }
    pages.push(row)
    return row
  }
  add('findDocuments', 'Find documents in a website collection.', pages[0]!, 'route')
  add('getConfigInfo', 'Read the Payload config.', pages[0]!, 'route')
  for (const [slug, description] of Object.entries(WEBSITE_MCP_COLLECTIONS)) add(slug, description, pages[0]!, 'collection')
  for (const [slug, description] of Object.entries(WEBSITE_MCP_GLOBALS)) add(slug, description, pages[0]!, 'global')
  const boxes = new Map<string, SeedPage>()
  for (const tool of tools) {
    const box = boxes.get(tool.toolbox) ?? add(tool.toolbox, tool.toolbox, pages[0]!, 'toolbox')
    boxes.set(tool.toolbox, box)
    add(tool.name, tool.description, box, 'tool')
  }
  for (const host of hosts) {
    let parent = add(host.name, host.url, pages[0]!, 'host')
    for (const segment of segmentsOf(host.url)) parent = add(segment, host.url, parent, 'path')
  }
  const byId = new Map(pages.map((page) => [page.id, page]))
  for (const page of pages) {
    const chain = chainOf(page, byId)
    page.url = nestedUrl(chain)
    page.breadcrumbs = chain.map((doc, index) => ({ doc: doc.id, url: nestedUrl(chain.slice(0, index + 1)), label: doc.title }))
  }
  const slugsAt = pages.map((page) => `${page.parentId ?? ''}/${page.slug}`)
  const collections = pages.filter((page) => page.kind === 'collection')
  const plugins = {
    'nested-docs': { collection: 'pages' as const, parentFieldSlug: 'parent' as const, breadcrumbsFieldSlug: 'breadcrumbs' as const, urls: pages.map((page) => page.url) },
    seo: { collection: 'pages' as const, urls: pages.map((page) => `${ORIGIN}${page.breadcrumbs.at(-1)?.url ?? page.url}`) },
    search: { collections: collections.filter((page) => page.slug !== 'users').map((page) => page.slug), priority: 10 },
    redirects: { collections: ['case-studies', 'pages', 'posts'] as const, references: pages.map((page) => page.id) },
    'import-export': { collections: collections.map((page) => ({ slug: page.slug, import: page.slug !== 'users', export: true })) },
    'form-builder': { redirectRelationships: ['pages', 'posts', 'case-studies'] as const, forms: pages.filter((page) => page.layout.some((block) => (block as { blockType: string }).blockType === 'form')).length },
    stripe: { sync: [] as const },
    mcp: { path: '/api/mcp' as const, tool: 'findDocuments' as const, collection: 'pages' as const, where: pages.map((page) => ({ slug: { equals: page.slug } })) },
  }
  return {
    name: 'mcp' as const,
    via: 'seeds' as const,
    manual: false as const,
    pages,
    plugins,
    unique: new Set(slugsAt).size === slugsAt.length && pages[0]!.slug === 'mcp' && pages[0]!.parentId === null && pages.every((page) => page.url === nestedUrl(chainOf(page, byId))),
  }
}
