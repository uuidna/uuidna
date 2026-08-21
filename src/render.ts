// render — present a theorem (or any receipt) in the UI using ONLY TypeScript and CSS: no framework, no
// runtime deps. Each card carries the content-address — a 36-byte POINTER — never the full payload: by
// pigeonhole 1024 payloads cannot fit a small budget, but 1024 addresses (36 kB) do. Present by reference,
// the same bound as a single address. Every card is schema.org microdata and LINKS its statement to its
// proof page (/theorem/<key>) — the statement and its proof are one edge. A content-address proves integrity,
// not truth.
import { toUuid, vortexOrbit } from './address.js'
import { handleOf } from './handle.js'   // the door /<handle> IS the handle — one derivation, see handle.ts
import { DIMENSIONS } from './harness.js'
import { sequenceVars, durationVars } from './css.js'
// the ledger, for the address a hero carries — aliased because renderList already binds the name `theorems`
import { theorems as ledger } from './theorems/index.js'

export interface TheoremView { name: string; address?: string; key?: string }
export interface RenderOpts { base?: string } // site base for proof links; '' → served at root (/theorem/<key>)

// Root-relative by default — VitePress serves the site at root, so proof links resolve to /theorem/<key>.
// Pass an explicit base (e.g. '/site') to prefix them. (Was '/millennium-solutions', the upstream deposit
// uuidna is extracted from — a stale default that pointed consumers' cards at the wrong site.)
const DEFAULT_BASE = ''

/** A single hue (0..359) from a content-address — the vortex colour, computed, nothing fetched. */
function hueOf(address: string): number {
  return (parseInt(address.replace(/[^0-9a-f]/gi, '').slice(0, 2) || '0', 16) * 40) % 360
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/** The proof URL for a theorem — its statement's link to its proof page. Keyless views point at the ledger. */
function proofUrl(t: TheoremView, base: string): string {
  return base.replace(/\/$/, '') + '/theorem/' + (t.key ?? '')
}

/** renderTheorem(t) → a self-contained HTML card (inline CSS, no framework) presenting one theorem BY its
 *  content-address, as schema.org CreativeWork microdata, LINKING the statement to its proof page (/theorem/<key>).
 *  If no address is given it is minted from the name — the same value always mints the same. */
export function renderTheorem(t: TheoremView, opts: RenderOpts = {}): string {
  const base = opts.base ?? DEFAULT_BASE
  const address = t.address ?? toUuid(t.name)
  const hue = hueOf(address)
  const title = escapeHtml(t.name.split('—')[0].trim() || t.name)
  const full = escapeHtml(t.name)
  const url = proofUrl(t, base)
  // the statement links to its proof: if a key is known the title is an anchor to /theorem/<key> (itemprop url)
  const heading = t.key
    ? `<a itemprop="url" href="${escapeHtml(url)}" style="color:inherit;text-decoration:none">${title}</a>`
    : title
  // STRICT shadcn anatomy via data-slot (card · card-header · card-title · card-description · card-content ·
  // card-footer) so a shadcn host consumes and styles these cards — compatible API, no framework dependency.
  // Inline CSS keeps them self-contained and CSP-safe when rendered standalone.
  return `<article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="${escapeHtml(url)}" `
    + `style="border-left:4px solid hsl(${hue} 60% 50%);padding:.6rem .9rem;`
    + `margin:.5rem 0;border-radius:8px;background:hsl(${hue} 60% 50% / .06);font:14px/1.5 system-ui,sans-serif">`
    + `<div data-slot="card-header">`
    + `<h3 data-slot="card-title" itemprop="name" style="margin:0 0 .3rem;font-size:1rem">${heading}</h3>`
    + `<p data-slot="card-description" itemprop="description" style="margin:0;color:#6a6a6a;font-size:.82rem">${full}</p>`
    + `</div>`
    + `<div data-slot="card-content">`
    // The full content-address is the machine KEY, never shown — carried as microdata identifier (recomputable,
    // crawlable) and as the uuidna:address meta. What the reader sees is the first-part HANDLE (first 8 hex, the
    // door /<handle>); the rest of the uuid computes on the spot from the proof. Real uuids compute, they don't display.
    + `<meta itemprop="identifier" content="${escapeHtml(address)}">`
    + `<code data-slot="handle" style="display:block;margin-top:.4rem;font-size:.78rem;color:hsl(${hue} 60% 40%)">${escapeHtml(handleOf(address))}</code>`
    + `</div>`
    + `<div data-slot="card-footer"><small style="color:#9a9a9a">integrity, not truth</small></div>`
    + `</article>`
}

/** renderHero(t) → the OpenGraph HERO for one theorem's page: the <meta property="og:*"> tags (title, description,
 *  type, url→its proof) PLUS the microdata card. Emitted head-first so a crawler or an agent reads the statement,
 *  its proof URL and its content-address on first contact. Self-contained, no script. */
export function renderHero(t: TheoremView, opts: RenderOpts = {}): string {
  const base = opts.base ?? DEFAULT_BASE
  const address = t.address ?? toUuid(t.name)
  const url = proofUrl(t, base)
  const og = [
    ['og:type', 'article'],
    ['og:title', t.name.split('—')[0].trim() || t.name],
    ['og:description', t.name],
    ['og:url', url],
    ['uuidna:address', address],
  ].map(([p, c]) => `<meta property="${escapeHtml(p)}" content="${escapeHtml(c)}">`).join('')
  return og + renderTheorem({ ...t, address }, opts)
}

/** renderList(theorems) → a grid of cards. Presents many theorems BY REFERENCE (their addresses), never by
 *  embedding the full payload — so any number of theorems presents within a fixed byte budget per card. */
export function renderList(theorems: readonly TheoremView[], opts: RenderOpts = {}): string {
  return `<div class="uuidna-list" style="display:grid;gap:.4rem">${theorems.map((t) => renderTheorem(t, opts)).join('')}</div>`
}

// ── THE HERO ANIMATION — motion computed from the ledger, never chosen ────────────────────────────────────────────
// Every number that moves here is sealed. The path is the DOUBLING ORBIT (vortexOrbit: 1→2→4→8→7→5→1, the unit group
// of ℤ/9 generated by 2 — vortex_is_the_units, order_of_two_is_six), so the walk closes because the orbit does. The
// colour of each rung is the ℤ/9 sequence hue (sequenceVars), and the TIMING is the units of ℤ/9 written three times
// — 111, 222, 444, 555, 777, 888 ms (durationVars) — so the animation's tempo is the same arithmetic as its path.
// The seven rays are the rosetta DIMENSIONS. Nothing is tuned by eye: change a sealed fact and the motion changes.
//
// HONEST SCOPE: a deterministic SVG computed from sealed constants. It VISUALISES the arithmetic; it does not prove
// anything the arithmetic does not already prove, and it claims nothing about what the motion depicts.
export interface HeroAnimation {
  svg: string
  lead: string                      // the dimension that leads — resolved, so an unknown request is visible
  sequence: readonly number[]      // the doubling orbit walked
  dimensions: readonly string[]    // the seven rosetta rays
  durations: readonly string[]     // the sealed tempi, in orbit order
  address: string                  // the content-address of this exact hero
  honest: string
}

/** heroAnimation(key, dimension, rung, tempo, base) → the sequence and dimensions as one animated SVG, every value
 *  sealed. FIVE parameters, all optional: which theorem it announces, which of the seven dimensions leads, which
 *  sequence rung the colour starts on, which sealed tempo drives it, and the URL base its proof link uses. */
export function heroAnimation(
  key = 'vortex_orbit', dimension = 'en', rung = 1, tempo = 444, base = DEFAULT_BASE,
): HeroAnimation {
  const orbit = vortexOrbit()                                     // [1,2,4,8,7,5] — the path, sealed
  const dims = DIMENSIONS                                         // the seven rays, sealed
  const seq = sequenceVars()                                      // rung → hue, sealed
  const durs = durationVars()                                     // the units of ℤ/9, tripled, sealed
  const tempoKeys = Object.keys(durs)
  // ── THE THEOREM SPEAKS THROUGH THE MOTION ────────────────────────────────────────────────────────────────────
  // Until now every theorem animated identically: the figure showed the shared LAW and said nothing about WHICH
  // theorem it announced. Now each node carries one hex digit of the theorem's own content-address, encoded in the
  // two things a viewer can actually see — WHICH sealed tempo it beats on and WHICH sequence rung it wears.
  //
  // The channel is exact, and the ledger already proves why: a hex digit is 0..15, the tempi number 6 and the
  // sequence 9, and lcm(6, 9) = 18 > 16 — so (digit mod 6, digit mod 9) determines the digit UNIQUELY by the
  // LCM BOUND — 18 = 2·9 is the two coins on the ring, and 18 − 16 = 2 is the coins again as headroom (residues_identify_digit; NOT the Chinese Remainder Theorem, which would need 6 and 9 coprime, and rosette_and_vortex_are_coprime seals gcd(9,6) = 3). Six nodes therefore transmit six digits, and readHero() recovers them
  // from the rendered SVG alone. HONEST SCOPE: it carries the ADDRESS, which is identity, never the meaning — the
  // motion tells you which theorem is speaking, not what it says.
  const hex = (ledger().find((t) => t.key === key)?.address ?? toUuid(key)).replace(/-/g, '')
  const digit = (i: number): number => parseInt(hex[i % hex.length], 16)
  const hue = (n: number): string => seq[`--seq-${((n + rung - 1) % 9) + 1}`] ?? seq['--seq-1']
  // the node's tempo and colour are its digit's two residues — the pair that recovers the digit
  const beat = (i: number): string => durs[tempoKeys[digit(i) % tempoKeys.length]] ?? `${tempo}ms`
  const nodeHue = (i: number): string => seq[`--seq-${(digit(i) % 9) + 1}`] ?? seq['--seq-1']
  // six nodes on the ring, placed by their ORBIT INDEX (not by angle chosen for looks): step k sits at k/6 of the turn
  const node = (v: number, i: number): string => {
    const turn = (i * 60)                                          // 360/6 — the orbit has six steps, so the ring does
    // NO CHOSEN AMPLITUDE: the base radius is the orbit's own length and each rung pulses by ITS OWN VALUE, so the
    // node for 8 swells most and the node for 1 least — the motion's size IS the number it depicts.
    return `<g transform="rotate(${turn} 100 100)"><circle cx="100" cy="30" r="${orbit.length}" fill="${nodeHue(i)}" data-seq="${digit(i) % 9}">` +
      `<animate attributeName="r" values="${orbit.length};${orbit.length + v};${orbit.length}" dur="${beat(i)}" repeatCount="indefinite"/></circle>` +
      `<text x="100" y="34" text-anchor="middle" font-size="10" fill="#0b0b0b" transform="rotate(${-turn} 100 30)">${v}</text></g>`
  }
  // THE LEAD RAY IS THE SELECTED DIMENSION. `dimension` used to be accepted, folded into the address, and then
  // ignored by the geometry — a parameter that changes nothing is the quiet dishonesty this repo spent the day
  // removing, so it now does what its name says: the chosen dimension turns to the top, burns bright and long, and
  // the other six dim behind it. An unrecognised value falls back to the first dimension and SAYS SO in the return
  // (`lead`), rather than silently drawing something the caller did not ask for.
  const found = (dims as readonly string[]).indexOf(dimension)
  const lead = found < 0 ? 0 : found
  const ray = (d: string, i: number): string => {
    const leads = i === lead
    // every ray turns by its distance FROM the lead, so the selected dimension always points up
    const turn = (((i - lead + dims.length) % dims.length) * 360) / dims.length
    // the dimmed rays share ONE WHOLE attention equally — 1/7 each — and breathe between that share and twice it;
    // the lead holds what the six leave (1 − 1/7) and burns to one. Both derived from the dimension count.
    const share = 1 / dims.length
    const dim = share.toFixed(3), dim2 = (share * 2).toFixed(3), held = (1 - share).toFixed(3)
    return `<line x1="100" y1="100" x2="100" y2="${leads ? 54 : 64}" stroke="${hue(i + 1)}"` +
      ` stroke-width="${leads ? 3 : 1}" opacity="${leads ? '1' : dim}"` +
      ` transform="rotate(${turn} 100 100)"><animate attributeName="opacity"` +
      ` values="${leads ? `${held};1;${held}` : `${dim};${dim2};${dim}`}" dur="${beat(i)}" repeatCount="indefinite"/></line>` +
      (leads ? `<text x="100" y="50" text-anchor="middle" font-size="8" fill="${hue(i + 1)}">${d}</text>` : '')
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img"` +
    ` aria-label="the doubling orbit ${orbit.join('→')} across ${dims.length} dimensions">` +
    `<title>${key} — the orbit walks ${orbit.join('→')}→${orbit[0]}, seven dimensions, tempi ${tempoKeys.map((k) => durs[k]).join(' ')}</title>` +
    dims.map(ray).join('') + orbit.map(node).join('') +
    `<circle cx="100" cy="100" r="4" fill="${hue(5)}"/></svg>`   // 5 — the fixed point of the diamond involution
  return {
    svg, lead: dims[lead], sequence: orbit, dimensions: dims,
    durations: tempoKeys.map((k) => durs[k]),
    address: toUuid(`hero:${key}|${dimension}|${rung}|${tempo}|${base}|${orbit.join(',')}`),
    honest: 'A deterministic SVG computed from sealed constants: the path is the ℤ/9 doubling orbit, the hues are the ' +
      'sequence, the tempi are the units of ℤ/9 written three times. It VISUALISES arithmetic and proves nothing further.',
  }
}

/** readHero(svg) → the hex digits the animation is carrying, recovered from the rendered SVG alone.
 *
 *  THE READ-BACK IS THE POINT. An animation that merely looks derived is decoration; one whose source can be
 *  RECOVERED is a channel. Each node shows two visible residues — the sealed tempo it beats on (mod 6) and the
 *  sequence rung it wears (mod 9) — and because lcm(6, 9) = 18 exceeds the 16 values a hex digit can take, the pair
 *  determines the digit uniquely by the lcm bound — a number is fixed modulo 18 = 2·9, the two coins on the ring, and a hex digit sits 2 below that (residues_identify_digit). NOT the Chinese Remainder Theorem: 6 and 9 are not coprime. Nothing is guessed and nothing is
 *  approximate: either the residues agree on a digit under 16 or the read fails loudly.
 *
 *  HONEST SCOPE: it recovers the leading digits of the theorem's content-address — its IDENTITY, never its meaning.
 *  Six nodes carry six digits; that is a pointer to the proof, not the proof. */
export function readHero(svg: string): { digits: string; carried: number; complete: boolean } {
  const durs = durationVars()
  const tempoKeys = Object.keys(durs)
  const order = tempoKeys.map((k) => durs[k])                       // the sealed tempi, in their sealed order
  const nodes = [...svg.matchAll(/data-seq="(\d+)"[^]*?dur="([^"]+)"/g)]
  const digits: string[] = []
  for (const [, seqRes, dur] of nodes) {
    const modNine = Number(seqRes)
    const modSix = order.indexOf(dur)
    if (modSix < 0) break                                           // a tempo not in the sealed set — not our channel
    // the unique value below the common multiple 18 agreeing with both residues — the two coins on the ring — and a hex digit is 2 below it (residues_identify_digit)
    let found = -1
    for (let n = 0; n < 18; n++) if (n % tempoKeys.length === modSix && n % 9 === modNine) { found = n; break }
    if (found < 0 || found > 15) break
    digits.push(found.toString(16))
  }
  return { digits: digits.join(''), carried: digits.length, complete: digits.length === vortexOrbit().length }
}
