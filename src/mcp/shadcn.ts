// THE SHADCN CLI, SURFACED AS A DOOR. A client asks for an item by name and gets what `npx shadcn@latest add <item>` would
// write: the add command, the item's dependencies and its files, read from the public shadcn registry. The door only
// reads. Writing into a project stays with the client that runs the command.
import { mcpFuseOf } from '../quantum/processing/unit/index.js'

const REGISTRY = 'https://ui.shadcn.com/r/styles'
const STYLES = ['new-york', 'default']

type RegistryItem = {
  name: string
  type?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: { path: string; type?: string; content?: string }[]
}

mcpFuseOf('shadcn', {
  description: 'The shadcn CLI as a door: { item, style? } returns what `npx shadcn@latest add <item>` would write, read from the public shadcn registry (its add command, dependencies and files). It reads only; the client runs the add command where it writes.',
  inputSchema: {
    type: 'object',
    properties: {
      item: { type: 'string', description: 'the registry item, e.g. table, card, badge, button' },
      style: { type: 'string', description: 'the shadcn style: new-york (the default) or default' },
    },
  },
  run: async (a) => {
    const item = typeof a.item === 'string' ? a.item.trim() : ''
    const style = typeof a.style === 'string' && STYLES.includes(a.style) ? a.style : 'new-york'
    if (!/^[a-z0-9-]+$/.test(item)) {
      return { kind: 'shadcn', holds: false, command: 'npx shadcn@latest add <item>', next: ['give { item } as a registry item name, e.g. table'] }
    }
    const url = `${REGISTRY}/${style}/${item}.json`
    let body: RegistryItem
    try {
      const r = await fetch(url, { headers: { accept: 'application/json' } })
      if (!r.ok) return { kind: 'shadcn', item, style, url, holds: false, status: r.status, next: [`no item named ${item} in the ${style} style: check the name, or try style default`] }
      body = (await r.json()) as RegistryItem
    } catch (e) {
      return { kind: 'shadcn', item, style, url, holds: false, error: String((e as Error).message), next: ['the shadcn registry is not reachable from this host: retry when the network is back'] }
    }
    return {
      kind: 'shadcn',
      item,
      style,
      url,
      command: `npx shadcn@latest add ${item}`,
      type: body.type ?? null,
      description: body.description ?? null,
      dependencies: body.dependencies ?? [],
      registryDependencies: body.registryDependencies ?? [],
      files: (body.files ?? []).map((f) => ({ path: f.path, type: f.type ?? null, bytes: (f.content ?? '').length, content: f.content ?? '' })),
      holds: (body.files ?? []).length > 0,
    }
  },
})
