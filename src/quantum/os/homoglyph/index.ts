// quantum/os/homoglyph — THE DISPLAY GAP, AND WHY ADDRESSING CLOSES IT.
//
// CVE-2021-42574 (Trojan Source) is not only a threat to defend against; it is a LEAD about a gap this
// architecture already closes, and treating it as an incident to patch rather than a property to state was the
// smaller reading. The attack works because two channels disagree: a HUMAN reviewer reads DISPLAY, a machine
// reads BYTES, and Unicode gives an author cheap ways to make those two diverge — bidi overrides that reverse
// rendering order, zero-width characters that occupy no space, homoglyphs from another script that draw the
// same shape. Every code-review process on earth is built on the assumption that the two channels agree.
//
// A CONTENT-ADDRESS DOES NOT READ DISPLAY. It folds bytes, so the divergence the attack depends on is exactly
// the divergence it detects: two strings that render identically and differ by one invisible code point address
// to different uuids, and no amount of visual similarity brings them together. The defence is not a filter that
// must anticipate each trick — it is the addressing itself, and it covers tricks nobody has published yet.
//
// SAY WHAT IT DOES NOT DO. It does not tell you WHICH of two renderings is the honest one; it tells you they are
// not the same thing, which is the fact review was missing. It does not stop a lie written in plain ASCII. And a
// system that only ever sees one of the pair still needs the scrub — hence sanitize.ts, which strips the
// dangerous points for display while the address keeps the bytes. The two are complements: the scrub protects
// the reader, the address protects the record.
import { toUuid } from '../../../address.js'
import { scrubString } from '../../../sanitize.js'

export interface DisplayGap {
  /** what the attack does: two texts that a reader cannot tell apart */
  kind: string
  left: string
  right: string
  /** do the addresses differ? If they ever matched, the address would be reading display too */
  addressesDiffer: boolean
  /** does scrubbing collapse them? For invisible-character attacks it does; for homoglyphs it does not */
  scrubCollapses: boolean
}

/** the published classes of display/byte divergence, each measured rather than asserted */
export function displayGaps(): DisplayGap[] {
  const RLO = String.fromCharCode(0x202E)
  const ZWSP = String.fromCharCode(0x200B)
  const NBSP = String.fromCharCode(0x00A0)
  const pairs: { kind: string; left: string; right: string }[] = [
    { kind: 'bidi override (CVE-2021-42574)', left: 'transfer to alice', right: 'transfer to alice' + RLO },
    { kind: 'zero-width space', left: 'admin', right: 'ad' + ZWSP + 'min' },
    { kind: 'non-breaking space', left: 'a b', right: 'a' + NBSP + 'b' },
    // the Cyrillic small a, U+0430, draws the same shape as Latin a and is a different letter
    { kind: 'cyrillic homoglyph', left: 'paypal', right: 'p' + String.fromCharCode(0x0430) + 'ypal' },
  ]
  return pairs.map((p) => ({
    ...p,
    addressesDiffer: toUuid(p.left) !== toUuid(p.right),
    // HOMOGLYPHS SURVIVE THE SCRUB and that is the honest half: a Cyrillic letter is legitimate text, so no
    // filter may remove it, and only the address separates the two words. This is why the scrub alone would be
    // a false comfort and why the two mechanisms are stated as complements rather than alternatives.
    scrubCollapses: scrubString(p.left) === scrubString(p.right),
  }))
}

export interface HomoglyphCensus {
  definition: 'uuidnaos·display-gap·closed-by-address'
  gaps: DisplayGap[]
  /** classes the address separates */
  caughtByAddress: number
  /** classes a scrub alone would collapse — the ones a filter can handle */
  caughtByScrub: number
  honest: string
}

export function homoglyphCensus(): HomoglyphCensus {
  const gaps = displayGaps()
  return {
    definition: 'uuidnaos·display-gap·closed-by-address',
    gaps,
    caughtByAddress: gaps.filter((g) => g.addressesDiffer).length,
    caughtByScrub: gaps.filter((g) => g.scrubCollapses).length,
    honest:
      'Trojan Source works because human review reads DISPLAY and machines read BYTES. A content-address folds ' +
      'bytes, so the divergence the attack needs is the divergence it detects — and it covers tricks nobody has ' +
      'published, because it anticipates no trick. It does not say WHICH rendering is honest, only that two are ' +
      'not one; and homoglyphs survive any scrub, because a Cyrillic letter is legitimate text. The scrub ' +
      'protects the reader, the address protects the record, and neither replaces the other.',
  }
}
