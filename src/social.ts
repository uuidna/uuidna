// social — THE SOCIAL PROFILE: uuidna's public, shareable card, the outward face of the quantum profile. Where the
// quantum profile is the technical self-portrait, this is what a person shares: the name and handle, the one-line
// bio computed from the ledger (never hand-typed — it drifts the moment a theorem is added), the quantum AURA colour
// the card wears, the canonical links (site, source, package, licence), the credit tally (who is credited), and a
// content-addressed avatar seed. Deterministic and OFFLINE — it composes sealed/recomputable facts and static
// canonical links; it does NOT fetch the network, post anything, or represent a person's private data. Folded to one
// receipt: the same social card for every observer. HONEST SCOPE: integrity, not truth — a recomputable public card,
// its bio BACKED by the ledger count; the aura is ART (an address→hue arithmetic), not physics. It shares nothing but
// what is already public and sealed.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { runTrial } from './theorems/index.js'
import { quantumAura } from './aura.js'
import { creditsSummary } from './credits.js'
import { captainRights } from './rights.js'

const HOST = 'https://uuidna.com'

export interface SocialProfile {
  handle: string                 // '@uuidna' — the shareable handle
  name: string
  bio: string                    // one-line, computed from the ledger (theorem count + the honest floor)
  aura: { ray: number; hue: number; hsl: string; css: string }   // the card's colour (+ the moving-aura CSS block)
  avatarSeed: string             // a content-address seed for a deterministic avatar (the self-address)
  links: { site: string; source: string; package: string; license: string }
  credit: { copyright: string; credited: number; total: number }
  receipt: string                // all fields folded order-invariantly to one — the same card for every observer
  honest: string
}

const HONEST =
  'The social profile: uuidna\'s public, shareable card, composed from sealed facts and static canonical links and ' +
  'folded to ONE receipt — the same card for every observer. The bio is computed from the ledger (it cannot drift ' +
  'from the proof count); the aura colour is ART (an address→hue arithmetic), not physics. OFFLINE and read-only: it ' +
  'fetches nothing, posts nothing, and shares only what is already public and sealed. Integrity, not truth.'

/** socialProfile() → uuidna's public, shareable card: handle, ledger-computed bio, aura colour, canonical links and
 *  credit, folded to one receipt. Deterministic and offline — composes sealed facts + static links, fetches nothing. */
export function socialProfile(): SocialProfile {
  const self = toUuid('uuidna')
  const aura = quantumAura(self)
  const trial = runTrial()
  const credits = creditsSummary()
  const rights = captainRights()
  const bio = `Content-addressed identity, honest by construction — ${trial.count} Lean theorems, all by decide, ` +
    `kernel-only, folded to one receipt. Integrity, not truth.`
  const links = {
    site: HOST,
    source: 'https://github.com/uuidna/uuidna',
    package: 'https://www.npmjs.com/package/@uuidna/uuidna',
    license: HOST + '/license',
  }
  const fields = [
    toUuid('handle|@uuidna|' + self),
    toUuid('bio|' + bio),
    toUuid('aura|' + aura.hsl + '|ray=' + aura.ray),
    toUuid('links|' + links.site + '|' + links.source + '|' + links.package),
    credits.address,
    rights.receipt,
  ]
  const receipt = merkleGravity(fields)
  return {
    handle: '@uuidna',
    name: 'uuidna',
    bio,
    aura: { ray: aura.ray, hue: aura.hue, hsl: aura.hsl, css: aura.css },
    avatarSeed: self,
    links,
    credit: { copyright: rights.copyright, credited: credits.total - credits.captainAlone, total: credits.total },
    receipt,
    honest: HONEST,
  }
}
