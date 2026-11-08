/** THE UUID AS ITS OWN ANIMATION — a hex-program UUID routes itself, and this is the picture of that routing, not a new
 *  address. A UUID is 32 hex nibbles; each nibble is a ray from the centre at ray.angle, its length the nibble's
 *  magnitude (ray.magnitude, 0..15); the whole star turns once — the stream — and every ray pulses on its own beat.
 *  Pure function of the UUID (and the theorem it proves): the same program always draws the same animation, so it is a
 *  stable Open Graph image and a UI glyph, computed from the address, never a prefix on it and never drawn by hand. The
 *  ray and merkaba families are the geometry this renders; it adds no fact, it only shows the one the UUID already is. */

const NIBBLES = 32
const TURN = 360
const W = 1200 // the Open Graph image is 1.91:1 — a card every crawler and client reads
const H = 630
const CX = 315
const CY = 315

const nibblesOf = (uuid: string): number[] => {
  const hex = String(uuid).replace(/[^0-9a-fA-F]/g, '').toLowerCase().slice(0, NIBBLES)
  return [...hex].map((c) => parseInt(c, 16))
}
const esc = (s: unknown) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c)
const q = (x: number) => Math.round(x * 100) / 100 // a short, deterministic decimal — no drift between runs

/** The UUID's animation as a standalone SVG string. Deterministic in (uuid, meta): a representation of running the
 *  program at `uuid`, selected by content type, never a separate address. */
export const raySvgOf = (uuid: string, meta: { title?: string; holds?: boolean } = {}): string => {
  const nibbles = nibblesOf(uuid)
  const n = nibbles.length || NIBBLES
  const sum = nibbles.reduce((a, b) => a + b, 0)
  const spin = 30 + (sum % 30) // one turn of the star, deterministic in the address: 30..59 seconds
  const accent = meta.holds === false ? '#7a7f8c' : '#9cff57' // a theorem that holds is lit; a lead is dim
  const ray = (v: number, i: number): string => {
    const ang = (i / n) * 2 * Math.PI - Math.PI / 2 // the i-th of n rays, ray.angle, clockwise from the top
    const len = 40 + v * 16 // ray.magnitude 0..15 → 40..280 px
    const x2 = CX + len * Math.cos(ang)
    const y2 = CY + len * Math.sin(ang)
    const hue = v * 24 // the nibble colours its ray, 0..360
    const beat = q(3 + (v % 6) * 0.5) // 3..5.5 s, the ray's own pulse, keyed to the nibble
    const begin = q((i % n) * (spin / n)) // staggered around the turn
    return `<line x1="${CX}" y1="${CY}" x2="${q(x2)}" y2="${q(y2)}" stroke="hsl(${hue} 85% 62%)" stroke-width="${3 + (v % 4)}" stroke-linecap="round"><animate attributeName="stroke-opacity" values="0.35;1;0.35" dur="${beat}s" begin="${begin}s" repeatCount="indefinite"/></line>`
  }
  const star = nibbles.map(ray).join('')
  const title = esc((meta.title || 'UUIDNA QPU').slice(0, 64))
  const holds = meta.holds === false ? 'lead — develop it' : 'holds — recomputed'
  const addr = esc(uuid)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title} — ${addr}">`,
    `<rect width="${W}" height="${H}" fill="#0b0d12"/>`,
    `<g transform="translate(0,0)"><g><animateTransform attributeName="transform" type="rotate" from="0 ${CX} ${CY}" to="${TURN} ${CX} ${CY}" dur="${spin}s" repeatCount="indefinite"/>${star}</g>`,
    `<circle cx="${CX}" cy="${CY}" r="14" fill="${accent}"/></g>`,
    `<text x="640" y="250" fill="#eef1f6" font-family="ui-sans-serif,system-ui,sans-serif" font-size="56" font-weight="700">${title}</text>`,
    `<text x="640" y="320" fill="#aeb4c0" font-family="ui-monospace,monospace" font-size="26">${addr}</text>`,
    `<text x="640" y="380" fill="${accent}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="30" font-weight="600">${esc(holds)}</text>`,
    `<text x="640" y="430" fill="#8a90a0" font-family="ui-sans-serif,system-ui,sans-serif" font-size="24">${n} rays · one turn every ${spin}s · a program routing itself</text>`,
    `</svg>`,
  ].join('')
}

/** The URL at which a UUID's animation surfaces — the address itself with the image representation, no family prefix. */
export const rayUrlOf = (origin: string, uuid: string): string => `${origin.replace(/\/$/, '')}/${encodeURIComponent(uuid)}.svg`
