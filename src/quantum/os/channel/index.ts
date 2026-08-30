// quantum/os/channel — uuid channel layout: 48-bit words (three 16-bit trinities), tail, and deep-colour spelling. Pure.
import {
  layoutGroups, UUID_LAYOUT_GROUPS, HEX_TRINITY_COUNT, TAIL_HEXBITS, EXECUTABLE_HEXBITS,
  type UuidLayout,
} from '../../../hexagram.js'
import { HEXBIT_BITS } from '../../../hexbit/index.js'

export const TRINITY_HEX_CHARS = UUID_LAYOUT_GROUPS[1]
export const WORDS_HEX_CHARS = UUID_LAYOUT_GROUPS[1] + UUID_LAYOUT_GROUPS[2] + UUID_LAYOUT_GROUPS[3]
export const CHANNEL_BITS = TRINITY_HEX_CHARS * HEXBIT_BITS
export const WORDS_BITS = WORDS_HEX_CHARS * HEXBIT_BITS
export const TAIL_BITS = TAIL_HEXBITS * HEXBIT_BITS
export const DEEP_COLOUR_STATES = 16 ** WORDS_HEX_CHARS

export type DeepColour = {
  r: string
  g: string
  b: string
  words: string
  spell: string
}

/** deepColourFromAddress(address) → three 16-bit channels as hex trinities (#RRRRGGGGBBBB without the hash). Pure. */
export function deepColourFromAddress(address: string): DeepColour {
  const { trinities, words } = layoutGroups(address)
  return { r: trinities[0], g: trinities[1], b: trinities[2], words, spell: '#' + words }
}

/** channelLayout(address) → handle, trinities, tail, words, and middle payload slices. Pure. */
export function channelLayout(address: string): UuidLayout {
  return layoutGroups(address)
}

export {
  HEX_TRINITY_COUNT, TAIL_HEXBITS, EXECUTABLE_HEXBITS, UUID_LAYOUT_GROUPS,
}
