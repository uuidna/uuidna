// THE FUSION CHECK, AS A DOOR. A client sends x and the phases its circuit measured, and gets back the target and each
// shot's verdict. The arithmetic is the theorems' (fusion.ts): the client computes none of it. A verdict holds only when
// the theorem it passes through holds, so the door answers a theorem's holds, never a client's own reckoning.
import { mcpFuseOf } from '../quantum/processing/unit/index.js'
import { phaseOf, shotAcceptsOf, targetOf, theorem } from '../quantum/processing/unit/fusion.js'

type Item = { x: string; phases: string[] }

const itemsOf = (a: Record<string, unknown>): Item[] => {
  if (Array.isArray(a.items)) return a.items as Item[]
  if (typeof a.x === 'string' && Array.isArray(a.phases)) return [{ x: a.x, phases: a.phases as string[] }]
  return []
}

const checkOf = (item: Item) => {
  const x = BigInt(item.x)
  const target = targetOf(x)
  const shots = item.phases.map((text) => ({ phase: text, passes: shotAcceptsOf(x, phaseOf(text)) }))
  return {
    x: item.x,
    target: target.toString(),
    floor: theorem.fusion_floor(target, x),
    shots: shots.length,
    failures: shots.filter((s) => !s.passes).map((s) => s.phase),
    holds: shots.length > 0 && shots.every((s) => s.passes),
  }
}

mcpFuseOf('fusion', {
  description: 'The fusion check as a door: { x, phases } or { items: [{ x, phases }] }. Each phase is the measured shot phase in half-turns, as a + "/" + b. The door returns the target ⌊2^64/√x⌋ and, per x, whether every shot passes theorem fusion_accepts. The theorems compute it; the client sends only what it measured.',
  inputSchema: {
    type: 'object',
    properties: {
      x: { type: 'string', description: 'one register value, as digits' },
      phases: { type: 'array', items: { type: 'string' }, description: 'the shot phases for that x, in half-turns, as a or a/b' },
      items: { type: 'array', description: 'a batch: [{ x, phases }]' },
      full: { type: 'boolean', description: '{ full: true } returns every row; without it a large batch is answered as a recognition summary' },
    },
  },
  run: async (args) => {
    const items = itemsOf(args)
    if (items.length === 0) return { kind: 'fusion', holds: false, next: ['give { x, phases } or { items: [{ x, phases }] }'] }
    if (!theorem.fusion_tolerance()) return { kind: 'fusion', holds: false, next: ['theorem fusion_tolerance fails: the tolerance constant is wrong'] }
    const rows = items.map(checkOf)
    return { kind: 'fusion', tolerance: 'theorem fusion_tolerance', checked: rows.length, rows, holds: rows.every((r) => r.floor && r.holds) }
  },
})
