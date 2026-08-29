// tts — THE LEDGER READ ALOUD.
//
// Two halves, and only one of them is deterministic. COMPOSING the utterance is pure: a theorem, a chapter or a
// claim becomes an exact sequence of lines, the same lines for anyone, folded to a content-address so a listener
// can check that what was spoken is what was sealed. EMITTING it is a device write — sound leaves the process,
// nothing comes back, and no two runs are the same event. That is a NAMED non-determinism boundary, declared
// here the way src/os and src/drivers declare theirs, and it is the only line in this module that touches it.
//
// WHAT IS SPOKEN IS ADDRESSED. Every utterance carries the handle of its own text, so a recording can be held
// against the ledger: same words, same handle, and a drifted reading announces itself. Speech is the one surface
// where a listener cannot scroll back and compare, which is exactly why it must carry its receipt.
//
// HONEST SCOPE: this composes and emits; it does not transcribe, and it makes no claim about what a listener
// hears. The voice is the host's — macOS `say` — so the sound is the operating system's and the words are ours.
// Nothing here is sealed as a theorem: an utterance is an event, and events are not decidable.
// node:child_process is loaded LAZILY at the one call that needs it (the mcp.ts:38 pattern): a top-level import
// rides every bundle that reaches this module, and the edge worker has no processes — validation refuses it.
// HEXBIT_WORDS / utter / readHexbits live in ./readings.js so the monitor can translate without this device write.
import { utter, type Utterance } from './readings.js'

export * from './synth.js'
export {
  utter,
  HEXBIT_WORDS,
  readHexbits,
  englishToHexbitReadings,
  type Utterance,
  type HexbitReading,
} from './readings.js'

/** a theorem, said the way a reader would say it: its name, then the statement it settles. */
export const utterTheorem = (t: { key: string; name?: string; statement: string }): Utterance =>
  utter([t.name ?? t.key, `It states: ${t.statement}`, `Sealed as ${t.key}.`])

/** THE BOUNDARY — the only device write in this module.
 *
 *  `say` is macOS's own voice, so the sound is the host's and the words are ours. It is deliberately not awaited
 *  for correctness: whether a speaker was connected, whether anyone listened, and how long the audio ran are all
 *  outside what this process can know, and pretending otherwise would be the overclaim the rest of the ledger
 *  refuses. The utterance's handle is returned so a caller can hold a recording against what was composed. */
export const emit = (u: Utterance, opts: { voice?: string; rate?: number; dryRun?: boolean } = {}): { handle: string; spoken: boolean; command: string } => {
  const args = [...(opts.voice ? ['-v', opts.voice] : []), ...(opts.rate ? ['-r', String(opts.rate)] : []), u.text]
  const command = `say ${args.slice(0, -1).join(' ')} <${u.words} words>`.trim()
  if (opts.dryRun) return { handle: u.handle, spoken: false, command }
  const execFile = (process as unknown as { getBuiltinModule?: (n: string) => typeof import('node:child_process') }).getBuiltinModule?.('node:child_process')?.execFile
  if (execFile) execFile('/usr/bin/say', args, () => { /* the device is the boundary: no verdict comes back from a speaker */ })
  return { handle: u.handle, spoken: true, command }
}

/** read a passage aloud and return what was said, addressed — compose then emit, in one call. */
export const readAloud = (lines: readonly string[], opts?: { voice?: string; rate?: number; dryRun?: boolean }): { utterance: Utterance; emitted: ReturnType<typeof emit> } => {
  const utterance = utter(lines)
  return { utterance, emitted: emit(utterance, opts) }
}
