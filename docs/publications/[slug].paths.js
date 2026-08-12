// Dynamic route: one PUBLICATION per domain — a note in lean human prose, composed by READING that domain's sealed
// theorems and writing only what they settle, every claim linking the proof that backs it. AUDITED BEFORE PUBLISHED:
// this generator runs each note through uuidna's own honesty gate at build time and THROWS if any note overreaches a
// proof — the site cannot build an unaudited publication, so an overclaiming note is refused, never shipped. The
// notes are the automated stream: add a domain (a lean/*.lean file), and its audited publication appears here.
import { publications } from '../../dist/index.js'

const ALL = publications()

// audited before published — refuse the whole build if any note fails its own honesty gate. This is the stream's
// gate: prose reaches the site only after it earns every claim with a proof (or is demarcated). Paid in code, not coin.
const refused = ALL.filter((p) => !p.publishable)
if (refused.length) {
  const why = refused.map((p) => `  • ${p.slug}: ${p.findings.map((f) => `[${f.token}] "${f.unit}"`).join('; ')}`).join('\n')
  throw new Error(`publications: ${refused.length} note(s) overreach a proof and are REFUSED (audited before published) —\n${why}\n` +
    `Remedy (paid in code): back the claim with a sealed /theorem/<key>, or demarcate it (not / never / no / simulation / finite).`)
}

export default {
  paths() {
    return ALL.map((p) => ({
      params: { slug: p.slug, address: p.address, receipt: p.receipt },
      content: `${p.markdown}
---

**Audited before published** · this note passed uuidna's honesty gate at build time — every claim above links the
proof that seals it. Content-address \`${p.address.slice(0, 8)}\` · proofs fold to receipt \`${p.receipt.slice(0, 8)}\` (the handles; the full uuids are in this page's meta, recomputable) · ${p.count} sealed theorems.

[All publications](/publications) · [All theorems](/theorems) · [How auditing works](/trials)
`,
    }))
  },
}
