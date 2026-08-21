// handle — THE ADDRESS IS THE PATH, AND THE PATH IS THE ADDRESS.
//
// A handle is eight hex characters, which is why it splits FOUR ways at two characters each: cc9c0011 becomes
// cc/9c/00/11. That is not a chosen convention — it is the shape the handles already have. `chunkHandleOf` has
// been producing them all along, and `src/chunks/` already nests them one level deep at two characters. This
// carries the same split to its full depth, so a handle names a directory and a directory names a handle.
//
// WHY FOUR LEVELS AND NOT ONE. A flat store of thousands of payloads is a directory listing; a nested one is an
// index. Each level narrows by 256, so four levels address 4,294,967,296 handles with no directory ever holding
// more than 256 entries — the tree stays balanced without anything balancing it. Sorting is free, because
// lexicographic order over the path IS numeric order over the handle.
//
// THE ROUND TRIP IS THE POINT. `handleOfPath(handlePath(h)) === h` for every valid handle, and the test proves it
// over the live ledger rather than over examples. An address scheme that cannot be inverted is a naming scheme,
// and a naming scheme drifts: today the site derived its structure one way and the MCP catalogue another, and the
// two could not be checked against each other because neither could recover the other's identity. A reversible
// path means the payload store and the tool that serves it are the same object seen twice.
//
// Handles are LOWERCASE hex. Anything else is refused rather than coerced, because a scheme that silently accepts
// a near-miss will happily address two payloads to one place.

/** the store's root, relative to the repository */
export const HANDLE_ROOT = 'src/handle'

/** eight lowercase hex characters — the shape chunkHandleOf already emits */
const HANDLE = /^[0-9a-f]{8}$/

export const isHandle = (h: string): boolean => HANDLE.test(h)

/** handleOf(address) → THE ONE derivation of a handle from a content-address: strip the hyphens, take eight hex.
 *
 *  It was written three times before it was written once — gen-handle-chunks stripped the hyphens first, while
 *  editor.ts and mcp.ts sliced the raw string — and the three agreed only because a v8 UUID's FIRST GROUP happens
 *  to be exactly eight hex characters. That is agreement by coincidence of formatting
 *  those call sites an address written without hyphens, or one folded to a different shape, and they diverge in
 *  silence. Every handle in the repository now comes from here, so there is one identity scheme and not three
 *  that look alike. Refuses rather than coerces, which is the same law isHandle already holds. */
export function handleOf(address: string): string {
  const hex = String(address).replace(/-/g, '').toLowerCase()
  const handle = hex.slice(0, 8)
  if (!HANDLE.test(handle)) throw new Error(`handle: "${address}" does not begin with eight hex characters`)
  return handle
}

/** seedOf(address) → the handle read as an INTEGER: the one way this repository turns a content-address into a
 *  number. It was six inline expressions before it was one — aura.ts and captain/repos carried character-identical
 *  copies, refactor.ts and holofractal.ts each wrote their own, iq-books a fourth, and css.ts computed the SAME
 *  VALUE by a different route entirely (`Number(BigInt('0x' + h))` where the others used `parseInt(h, 16)`). The
 *  two routes agree — verified over the domain edges and a sweep— which is exactly why the split
 *  survived: nothing ever disagreed, so nothing ever complained, and a reader had no way to tell that six places
 *  meant one thing.
 *
 *  WHAT DELIBERATELY DOES NOT COME HERE, because merging these would be wrong rather than tidy: stream.ts slices
 *  THIRTEEN hex (a wider step, on purpose), the rosette in theorems/index.ts folds the WHOLE address mod 7 (a
 *  different domain, not a truncation), render.ts indexes single digits, and payload-seed expands hex to bits.
 *  Same-looking code, different acts. */
export const seedOf = (address: string): number => parseInt(handleOf(address), 16)

/** split a handle into its four parts: cc9c0011 -> ['cc','9c','00','11'] */
export function handleParts(handle: string): string[] {
  if (!isHandle(handle)) throw new Error(`handle must be eight lowercase hex characters, got ${JSON.stringify(handle)}`)
  return [handle.slice(0, 2), handle.slice(2, 4), handle.slice(4, 6), handle.slice(6, 8)]
}

/** the path a handle's payload lives at */
export const handlePath = (handle: string, file = 'index.json'): string =>
  [HANDLE_ROOT, ...handleParts(handle), file].join('/')

/** the inverse: recover the handle from a path. Returns null when the path is not in the store, so a caller can
 *  tell "not ours" from "malformed" rather than being handed a plausible-looking wrong answer. */
export function handleOfPath(path: string): string | null {
  const parts = path.split('/')
  const at = parts.indexOf(HANDLE_ROOT.split('/').pop()!)
  if (at < 0 || parts.length < at + 5) return null
  const handle = parts.slice(at + 1, at + 5).join('')
  return isHandle(handle) ? handle : null
}

/** every directory level a handle occupies, outermost first — what a writer must create before writing */
export const handleDirs = (handle: string): string[] =>
  handleParts(handle).map((_, i, all) => [HANDLE_ROOT, ...all.slice(0, i + 1)].join('/'))

/** Lexicographic order over paths equals numeric order over handles. This is what makes the store sortable
 *  without an index, and it is checkable rather than asserted. */
export const pathOrderMatchesHandleOrder = (handles: readonly string[]): boolean => {
  const byHandle = [...handles].sort()
  const byPath = [...handles].sort((a, b) => (handlePath(a) < handlePath(b) ? -1 : handlePath(a) > handlePath(b) ? 1 : 0))
  return byHandle.every((h, i) => h === byPath[i])
}
