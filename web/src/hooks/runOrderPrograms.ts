import type { CollectionBeforeChangeHook, Field } from 'payload'

import { runCircuit } from '@/utilities/qpuCatalogue'

/** What an order's lines ran: each line whose product or variant is a quantum program gets the simulator's outcome and
 *  its receipt. */
export const orderRunsField: Field = {
  name: 'runs',
  type: 'array',
  admin: {
    description: 'Each ordered quantum program, run by a classical exact simulator of quantum circuits when the order is placed.',
    readOnly: true,
  },
  fields: [
    { name: 'item', type: 'text', admin: { description: 'the order line' } },
    { name: 'product', type: 'relationship', relationTo: 'products' },
    { name: 'variant', type: 'relationship', relationTo: 'variants' },
    { name: 'program', type: 'json' },
    { name: 'outcome', type: 'json' },
    { name: 'receipt', type: 'text' },
  ],
}

const idOf = (v: unknown) => (v && typeof v === 'object' ? (v as { id: number }).id : (v as number | null | undefined))

/** An order line that is a quantum program runs before the order is stored, through the same handler as the circuit
 *  tool at /api/mcp, so the order carries the answer an MCP client gets. A line already run keeps its run; the program
 *  is the variant's when the line names one, else the product's. */
export const runOrderPrograms: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const kept = (data.runs ?? originalDoc?.runs ?? []) as { item?: string }[]
  const runs = [...kept]
  for (const line of (data.items ?? originalDoc?.items ?? []) as { id?: string; product?: unknown; variant?: unknown }[]) {
    if (!line.id || runs.some((r) => r.item === line.id)) continue
    const variant = idOf(line.variant)
    const product = idOf(line.product)
    const source = variant
      ? await req.payload.findByID({ collection: 'variants', depth: 0, id: variant, req })
      : product
        ? await req.payload.findByID({ collection: 'products', depth: 0, id: product, req })
        : null
    const program = source?.quantum?.program
    if (!program || typeof program !== 'object') continue
    const { outcome, receipt } = await runCircuit(program as Record<string, unknown>)
    runs.push({ item: line.id, product, variant, program, outcome, receipt } as never)
  }
  return runs.length ? { ...data, runs } : data
}
