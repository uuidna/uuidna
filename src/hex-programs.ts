// hex-programs — THE CODE IS THE HEX. A uuid is handle · program · params, and the program is a door's own address.
//
// The captain, 2026-09-27: "So an uuid becomes handle program params" and "Convert code to hex instead of wrapping."
// The second sentence is the design constraint: a table mapping a tool NAME to a program id would be a wrapper, it
// would be hand-kept, and it would drift the first time a door was added. There is no table here. A door's program hex
// is `handleOf(toUuid('tool:' + name + ':' + description))` — the same leaf the whole-API seal already folds over
// (apiHandleOf in src/mcp.ts), so the conversion is derived from the contract itself and a door added tomorrow has its
// hex the moment it has a description.
//
// MEASURED BEFORE BUILDING, because this only works if the hexes are distinct: 249 doors, 8 hex each (32 bits), 249
// distinct, ZERO collisions. That measurement is not an assumption here — collisionsOf() recomputes it on every call
// and the index REPORTS it, because `gematria_forces_collisions` is a sealed theorem of this tree: names do collide,
// and a program space that assumed otherwise would be addressing the wrong door the day two contracts folded alike.
//
// THE WIDTHS ARE THE SEALED LAYOUT, not a scheme invented here. RFC 9562 groups are [8,4,4,4,12] hex
// (layout_groups_thirtytwo), each middle group is one message cap of four hexbits (message_cap_is_four_hexbits), and
// the handle is the first group (handle_is_the_first_group). So:
//
//     4f2a91c7 - 04784dbf - 0a3c - 40d2d1ad520f
//     └ handle ┘ └ program ┘ └par┘ └ envelope ┘
//      subject    the door    one     the tail
//      8 hex      8 hex       cap     12 hex
//
// Program takes two caps because a door hex is 8 hex wide; one cap is left for params inside the middle, and the tail
// carries the sealed envelope. 8 + 8 + 4 + 12 = 32 hex = 128 bits, with nothing borrowed and nothing spare.
//
// WHAT THIS DOES NOT DO, stated because the omission is deliberate. It does not CALL anything. Decoding a uuid returns
// the door a program names and the params beside it; running it is the caller's act through the doors that already
// exist. A module that both addressed and executed would be the wrapper this replaces, and it would put execution
// behind an address whose collision proof is recomputed rather than sealed.
import { MCP_CATALOG } from './mcp.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { hexbitReceipt } from './hexbit/index.js'

/** the one derivation: a door's program hex, from the contract and nothing else */
export const hexProgramOf = (name: string, description: string): string =>
  handleOf(toUuid('tool:' + name + ':' + description))

export interface HexProgram { name: string; hex: string }

export interface HexProgramIndex {
  doors: number
  /** hex characters per program address — two message caps of the uuid's middle */
  width: number
  bits: number
  distinct: number
  /** every hex two or more doors share, with their names — empty is the measured claim, never the assumed one */
  collisions: { hex: string; doors: string[] }[]
  programs: readonly HexProgram[]
  /** hex → door and door → hex, so a lookup is a lookup. `programs.find` is O(doors) and both callOfUuid and
   *  uuidOfCall ran it per call: the exhaustive round trip over every door × every param — 16,449,536 calls, the whole
   *  combinatorial space — cost 147 seconds of linear scans and 0 of arithmetic. The maps are built from `programs` in
   *  the same pass, so they cannot disagree with it, and the collision census still reads `programs` rather than a map
   *  that would have silently dropped the second door of a colliding pair. */
  byHex: ReadonlyMap<string, string>
  byName: ReadonlyMap<string, string>
  capacity: {
    /** the middle's whole space: 16^12 */
    middle: number
    /** what a program address spans: 16^8 */
    program: number
    /** params left inside the middle beside a program: 16^4 */
    paramsInMiddle: number
    /** the tail envelope: 16^12 */
    envelope: number
  }
  receipt: string
  handle: string
}

/** collisionsOf(programs) → every hex more than one door folds to. Recomputed per call rather than cached, because a
 *  collision that appeared after a cache was warmed is exactly the one that would route a call to the wrong door. */
export const collisionsOf = (programs: readonly HexProgram[]): { hex: string; doors: string[] }[] => {
  const by = new Map<string, string[]>()
  for (const p of programs) by.set(p.hex, [...(by.get(p.hex) ?? []), p.name])
  return [...by.entries()]
    .filter(([, doors]) => doors.length > 1)
    .map(([hex, doors]) => ({ hex, doors: [...doors].sort() }))
    .sort((a, b) => a.hex.localeCompare(b.hex))
}

export function hexProgramIndex(): HexProgramIndex {
  const programs = MCP_CATALOG
    .map((t) => ({ name: t.name, hex: hexProgramOf(t.name, t.description) }))
    .sort((a, b) => a.name.localeCompare(b.name))
  const width = programs[0]?.hex.length ?? 0
  const collisions = collisionsOf(programs)
  // ORDER-INVARIANT: the leaves are the sorted name→hex pairs, so any two readers fold the same receipt
  const r = hexbitReceipt(programs.map((p) => `${p.name}:${p.hex}`))
  const byHex = new Map<string, string>()
  const byName = new Map<string, string>()
  for (const p of programs) { if (!byHex.has(p.hex)) byHex.set(p.hex, p.name); byName.set(p.name, p.hex) }
  return {
    byHex, byName,
    doors: programs.length,
    width,
    bits: width * 4,
    distinct: new Set(programs.map((p) => p.hex)).size,
    collisions,
    programs,
    capacity: {
      middle: 16 ** 12,
      program: 16 ** 8,
      paramsInMiddle: 16 ** 4,
      envelope: 16 ** 12,
    },
    receipt: r.receipt,
    handle: r.handle,
  }
}

export interface UuidCall {
  /** the addressed subject — the uuid's first group */
  handle: string
  /** the program hex — the middle's first two caps */
  program: string
  /** the door that program names, or null when no door folds to it */
  door: string | null
  /** params inside the middle — the third cap */
  params: string
  /** the sealed envelope — the tail */
  envelope: string
}

const bare = (uuid: string): string => uuid.replace(/-/g, '').toLowerCase()

/** callOfUuid(uuid) → the call a uuid names: subject, program, the door it resolves to, params, envelope.
 *
 *  An unresolved program is returned as `door: null` rather than refused, and the distinction matters: a uuid whose
 *  middle names no door is a well-formed address of a program this surface does not serve, which is a fact about the
 *  surface. Refusing it would report the absence of a door as a malformed uuid. */
export function callOfUuid(uuid: string, index: HexProgramIndex = hexProgramIndex()): UuidCall {
  const h = bare(uuid)
  if (h.length !== 32 || !/^[0-9a-f]{32}$/.test(h)) {
    throw new Error(`not a uuid: ${uuid} — a program address is 32 hex characters (layout_groups_thirtytwo)`)
  }
  const program = h.slice(8, 16)
  const found = index.byHex.get(program)
  return {
    // handleOf, NOT a slice. handle.test.ts holds that every handle in this tree comes from one derivation, and it
    // caught this line: `h.slice(0, 8)` is the first group TODAY and agrees with handleOf only for as long as nobody
    // changes what a handle means. A second derivation that happens to agree is the drift this tree keeps catching —
    // it disagrees silently, on the day it matters, in the field a reader trusts most.
    handle: handleOf(h),
    program,
    door: found ?? null,
    params: h.slice(16, 20),
    envelope: h.slice(20, 32),
  }
}

/** uuidOfCall({handle, door, params, envelope}) → the uuid that names that call, in the sealed group layout.
 *
 *  The inverse of callOfUuid over the fields it carries, which is what makes a uuid a wire format rather than a label:
 *  encode a call, hand over 36 characters, and the far side decodes the same call. An unknown door is refused HERE,
 *  because writing a program hex for a door that does not exist would mint an address nothing can answer. */
export function uuidOfCall(
  call: { handle: string; door: string; params?: string; envelope?: string },
  index: HexProgramIndex = hexProgramIndex(),
): string {
  const found = index.byName.get(call.door)
  if (found === undefined) throw new Error(`unknown door: ${call.door} — a program hex is derived from a served contract, never invented`)
  const pad = (s: string, n: string): string => (s || '').replace(/[^0-9a-f]/gi, '').toLowerCase().padStart(n.length, '0').slice(-n.length)
  const handle = pad(call.handle, '00000000')
  const params = pad(call.params ?? '', '0000')
  const envelope = pad(call.envelope ?? '', '000000000000')
  const h = handle + found + params + envelope
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}
