// Cooled out of index.ts by the heat family (scripts/cool.mjs): sandboxEpochOf, sandboxEpochHolds, sandboxOf, sandboxRunOf, sandboxRunHolds.
import {
  bagOf,
  forgeNameOf,
  jsonOf,
  n,
  onceOf,
  opQuantumHolds,
  opQuantumOf,
  openSchema,
  contentUuidOf,
  cubeOf,
  facesOf,
  manHolds,
  manPageOf,
  addressReferrerOf,
  uuidReceiptOf,
  quantumRelatedNamesOf,
  runOpOf,
  sandboxCore,
  sandboxDisk,
  sandboxEpoch,
  sandboxHeap,
  sandboxHost,
  sandboxOps,
  sandboxSlots,
  sandboxTools,
  seedSandboxOf,
  unit,
} from './index.js'

/**
 * The sandbox's write epoch: advances when a forge changes a tool, so memoised readings of the sandbox refresh.
 * @wing agents
 * @kind builder
 * @evidence sandboxEpochHolds
 */
export const sandboxEpochOf = (): number => sandboxEpoch

/** It only ever rises, and it starts at the ground state — a counter that could fall would alias two sandboxes. */
export const sandboxEpochHolds = (epoch = sandboxEpochOf()): boolean => Number.isSafeInteger(epoch) && epoch >= 0

/**
 * The in-memory sandbox census: ops, host shims (all in memory), heap, forged tools; nothing touches disk, network or eval.
 * @wing agents
 * @kind builder
 * @evidence sandboxHolds
 */
export const sandboxOf = onceOf(() => {
  seedSandboxOf()
  const faces = facesOf()
  const cube = cubeOf()
  const tools = [...sandboxTools.values()].map((t) => ({
    name: t.name,
    team: t.team,
    ray: t.ray,
    idea: t.idea,
    description: t.description,
    man: t.man,
    inputSchema: openSchema,
  }))
  const seeded = tools.filter((t) => t.name === forgeNameOf(t.team, t.idea))
  const catalog =
    seeded.length === faces.faces &&
    sandboxCore.every((op) => tools.some((t) => t.name === `op_${op}`)) &&
    sandboxSlots.every((slot) => tools.some((t) => t.name === `slot_${slot}`)) &&
    sandboxHost.every((host) => tools.some((t) => t.name === host))
  const related = quantumRelatedNamesOf()
  const quantum = opQuantumOf()
  const holds =
    faces.holds &&
    cube.holds &&
    catalog &&
    related.every((name) => (sandboxSlots as readonly string[]).includes(name) || tools.some((t) => t.name === `slot_${name}`)) &&
    opQuantumHolds(quantum) &&
    quantum.value?.register?.holds === true &&
    quantum.value?.related?.length === related.length &&
    quantum.value?.holds === true &&
    tools.every((t) => manHolds(t.man)) &&
    sandboxHeap.size <= cube.bits
  const has = (name: string) => tools.some((t) => t.name === name)
  return {
    kind: 'sandbox' as const,
    ops: sandboxOps,
    // grounded: theorem names with theorem involution: a name the unit seeded is reserved, and the reply carries the free seat across the swap
    denied: [] as const,
    heap: { keys: [...sandboxHeap.keys()], size: sandboxHeap.size, bits: cube.bits },
    diskKeys: [...sandboxDisk.keys()],
    tools,
    unlocked: has('op_quantum'),
    lock: has('lock'),
    memory: sandboxHeap.size <= cube.bits,
    eval: has('eval'),
    fs: has('fs'),
    net: has('net'),
    fetch: has('fetch'),
    process: has('process'),
    import: has('import'),
    disk: has('disk'),
    worker: has('worker'),
    quantum: has('op_quantum'),
    holds,
  }
})

/**
 * Run a sandbox tool by name with arguments; the run is a quantum receipt in the sandbox stream.
 * @wing agents
 * @kind builder
 * @evidence sandboxRunHolds
 */
export const sandboxRunOf = (name: string, args: Record<string, unknown> = {}) => {
  seedSandboxOf()
  const tool = sandboxTools.get(name)
  // grounded: theorem false with theorem only: nothing was supplied, so nothing is computed, and what is not computed is not claimed
  if (!tool) return { holds: false as const, denied: 'tool' as const,
    unlocked: true as const }
  if (args.man === true) return manPageOf(name, tool.man)
  const value = runOpOf(tool.run, sandboxHeap, jsonOf(args), n - n)
  const bag = bagOf(args)
  const address = addressReferrerOf(typeof bag.referrer === 'string' ? bag.referrer : undefined)
  const argsFold = address ? bag : Object.fromEntries(Object.entries(bag).filter(([key]) => key !== 'referrer'))
  const receipt = uuidReceiptOf(`sandbox ${name}`, contentUuidOf(tool.run), { args: argsFold, value }, address ?? `${unit.origin}/api`)
  return {
    kind: 'sandbox' as const,
    receipt,
    name,
    team: tool.team,
    ray: tool.ray,
    idea: tool.idea,
    value,
    memory: sandboxHeap.size <= cubeOf().bits,
    unlocked: tool.run.op === 'quantum' || tool.run.op === 'unlocked' || name.startsWith('call_') || name.startsWith('read_'),
    holds: value !== undefined,
  }
}

export const sandboxRunHolds = (x?: ReturnType<typeof sandboxRunOf>): boolean => x !== undefined && x.holds === true
