// The seed waves, once: the games, the ISO waves and the MCP pages, composed from @uuidna/qpu; Payload writes them
// (seedRecords.ts).
import { seeds } from '@uuidna/qpu/engine'
import { seedWaves } from '@uuidna/qpu/waves'
import { mcpPages } from '@/lib/qpu/mcp-pages'
import { mcpHostList } from '@uuidna/qpu/discovery'
import { TOOLBOXES } from '@uuidna/qpu/mcp'

export const allSeedWaves = () => {
  const mcp = mcpPages(TOOLBOXES.flatMap((box) => box.tools.map((tool) => ({ name: tool.name, toolbox: box.name, description: tool.description }))), mcpHostList())
  return [
    { name: 'games', pages: seeds().map((seed) => seed.page) },
    ...seedWaves().map((wave) => ({ name: wave.name, pages: [...wave.pages] })),
    { name: mcp.name, pages: [...mcp.pages] },
  ]
}
