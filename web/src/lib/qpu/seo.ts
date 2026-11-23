// Moved from @uuidna/qpu (net/website-client.ts): the SEO a page reads from its own instance.
const RELATION_TO = ['pages', 'posts', 'case-studies'] as const
const IMAGE_KEYS = new Set(['image', 'media', 'featuredImage', 'thumbnail'])

const idOf = (value: unknown): string | null => {
  if (typeof value === 'string' && value.length > 0) return value
  if (typeof value === 'number') return String(value)
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'string' && id.length > 0) return id
    if (typeof id === 'number') return String(id)
  }
  return null
}

const clip = (text: string): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  const cut = clean
  const space = cut.lastIndexOf(' ')
  return (space > 80 ? cut.slice(0, space) : cut).trim()
}

const textsOf = (node: unknown, into: string[]) => {
  if (!node || typeof node !== 'object') return
  const children = (node as { children?: unknown }).children
  if (typeof (node as { text?: unknown }).text === 'string') into.push((node as { text: string }).text)
  if (Array.isArray(children)) children.forEach((child) => textsOf(child, into))
}

/** Title, description, image, and document relations read from one instance. Lexical text is part of the instance. */
export const seoFrom = (doc: Record<string, unknown>) => {
  const texts: string[] = []
  let heading = ''
  let image: string | null = null
  const relations: { relationTo: (typeof RELATION_TO)[number]; value: string }[] = []
  const seen = new Set<string>()
  const seenObjects = new WeakSet<object>()
  const addRelation = (relationTo: unknown, value: unknown) => {
    if (typeof relationTo !== 'string' || !(RELATION_TO as readonly string[]).includes(relationTo)) return
    const id = idOf(value)
    if (!id) return
    const key = `${relationTo}:${id}`
    if (seen.has(key)) return
    seen.add(key)
    relations.push({ relationTo: relationTo as (typeof RELATION_TO)[number], value: id })
  }
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    if (seenObjects.has(node)) return
    seenObjects.add(node)
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    const record = node as Record<string, unknown>
    if (record.type === 'text' && typeof record.text === 'string') texts.push(record.text)
    if (record.type === 'heading' && !heading) {
      const parts: string[] = []
      textsOf(record, parts)
      heading = parts.join('').trim()
    }
    if ((record.type === 'upload' || (record.type === 'relationship' && record.relationTo === 'media')) && !image) {
      image = idOf(record.value)
    }
    if ('relationTo' in record && 'value' in record) addRelation(record.relationTo, record.value)
    for (const [key, value] of Object.entries(record)) {
      if (key === 'meta' || key === 'createdAt' || key === 'updatedAt') continue
      if (IMAGE_KEYS.has(key) && !image) image = idOf(value)
      if (value && typeof value === 'object') walk(value)
    }
  }
  walk(doc)
  const title = typeof doc.title === 'string' && doc.title.trim() ? doc.title.trim() : heading
  return { title, description: clip(texts.join(' ')), image, relations }
}
