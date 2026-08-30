// render — present a theorem (or any receipt) in the UI using ONLY TypeScript and CSS: no framework, no
// runtime deps. Each card carries the content-address — a 36-byte POINTER — never the full payload: by
// pigeonhole 1024 payloads cannot fit a small budget, but 1024 addresses (36 kB) do. Present by reference,
// the same bound as a single address. Every card is schema.org microdata and LINKS its statement to its
// proof page (/theorem/<key>) — the statement and its proof are one edge. A content-address proves integrity,
// not truth.
import { toUuid, vortexOrbit, TRINITY } from './address.js'
import { handleOf } from './handle.js'   // the door /<handle> IS the handle — one derivation, see handle.ts
import { durationVars, sequenceVars } from './css.js'
import type { TenD } from './aura.js'
import { quantumAura, rotationOf } from './aura.js'
import { coins } from './captain/billing/index.js'
import { PRICE } from './billing/index.js'
import { DIMENSIONS } from './harness.js'
import { COINS, HEXBIT_BITS, HANDLE_HEXBITS, fuseLadder } from './hexbit/index.js'
import { HEXAGRAM_BITS, twoBoardsOf, referrerDoorOf } from './hexagram.js'
// the ledger, for the address a hero carries — aliased because renderList already binds the name `theorems`
import { theorems as ledger } from './theorems/index.js'
import { packageSeoLink, seoMicrodataAttrs } from './seo-package.js'

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
  // SEO PACKAGING LAW — card-as-link carries complete OG microdata (same package as a page frontmatter head).
  // Unknown keys (demo/smoke fixtures) fall back to route packaging — never throw on a presentational render.
  let pkg
  try {
    pkg = t.key ? packageSeoLink({ key: t.key }) : packageSeoLink({ route: url, title: t.name.split('—')[0].trim() || t.name, description: t.name })
  } catch {
    pkg = packageSeoLink({ route: url, title: t.name.split('—')[0].trim() || t.name, description: t.name })
  }
  const heading = t.key
    ? `<a itemprop="url" href="${escapeHtml(url)}" style="color:inherit;text-decoration:none">${title}</a>`
    : title
  return `<article class="uuidna-card" data-slot="card" ${seoMicrodataAttrs(pkg.microdata)} data-proof="${escapeHtml(url)}" `
    + `style="border-left:4px solid hsl(${hue} 60% 50%);padding:.6rem .9rem;`
    + `margin:.5rem 0;border-radius:8px;background:hsl(${hue} 60% 50% / .06);font:14px/1.5 system-ui,sans-serif">`
    + `<div data-slot="card-header">`
    + `<h3 data-slot="card-title" itemprop="name" style="margin:0 0 .3rem;font-size:1rem">${heading}</h3>`
    + `<p data-slot="card-description" itemprop="description" style="margin:0;color:#6a6a6a;font-size:.82rem">${full}</p>`
    + `</div>`
    + `<div data-slot="card-content">`
    + pkg.microdataHtml
    + `<code data-slot="handle" style="display:block;margin-top:.4rem;font-size:.78rem;color:hsl(${hue} 60% 40%)">${escapeHtml(handleOf(address))}</code>`
    + `</div>`
    + `<div data-slot="card-footer"><small style="color:#9a9a9a">integrity \u2014 the record recomputes for anyone · SEO package complete</small></div>`
    + `</article>`
}

/** renderHero(t) → the OpenGraph HERO for one theorem's page: the <meta property="og:*"> tags (title, description,
 *  type, url→its proof) PLUS the microdata card. Emitted head-first so a crawler or an agent reads the statement,
 *  its proof URL and its content-address on first contact. Self-contained, no script. */
export function renderHero(t: TheoremView, opts: RenderOpts = {}): string {
  const base = opts.base ?? DEFAULT_BASE
  const address = t.address ?? toUuid(t.name)
  const url = proofUrl(t, base)
  // Complete OG package from seo-package (property=, not name=) — even a solitary card/link ships packaged.
  const pkg = t.key
    ? packageSeoLink({ key: t.key })
    : packageSeoLink({ route: url, title: t.name.split('—')[0].trim() || t.name, description: t.name })
  const og = pkg.head
    .filter((h) => h[0] === 'meta' && typeof (h[1] as { property?: string }).property === 'string'
      && ['og:type', 'og:title', 'og:description', 'og:url', 'uuidna:address'].includes((h[1] as { property: string }).property))
    .map((h) => {
      const a = h[1] as { property: string; content: string }
      return `<meta property="${escapeHtml(a.property)}" content="${escapeHtml(a.content)}">`
    })
    .join('')
  return og + renderTheorem({ ...t, address }, opts)
}

/** renderList(theorems) → a grid of cards. Presents many theorems BY REFERENCE (their addresses)
 *  embedding the full payload — so any number of theorems presents within a fixed byte budget per card. */
export function renderList(theorems: readonly TheoremView[], opts: RenderOpts = {}): string {
  return `<div class="uuidna-list" style="display:grid;gap:.4rem">${theorems.map((t) => renderTheorem(t, opts)).join('')}</div>`
}

// ── heroAt — double Fu Xi boards keyed by referrer handle colour + 10D resonance. ──

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const HANDLE8 = /^[0-9a-f]{8}$/i

export interface HeroAtOpts {
  dimension?: string
  rung?: number
  tempo?: number
}

export interface HeroGate {
  i: number
  lit: boolean
  lines: readonly number[]
}

export interface HeroCoinColor {
  hex: string
  offset: number
}

export interface HeroAt {
  address: string
  handle: string
  door: string
  referrerDoor: number
  fused: boolean
  board: number
  gates: number
  hexagramBits: number
  boards: readonly [readonly HeroGate[], readonly HeroGate[]]
  handleColors: readonly string[]
  coinColors: readonly [HeroCoinColor, HeroCoinColor]
  ten: TenD
  hsl: string
  styleVars: Readonly<Record<string, string>>
}

export function resolveReferrer(referrer: string): string {
  const raw = String(referrer || '').trim()
  if (UUID.test(raw)) return raw.toLowerCase()
  const fromUrl = raw.includes('uuidna.com/') ? raw.replace(/.*uuidna\.com\//i, '').split(/[?#/]/)[0]! : raw
  if (HANDLE8.test(fromUrl)) return toUuid(fromUrl.toLowerCase())
  if (HANDLE8.test(raw)) return toUuid(raw.toLowerCase())
  return toUuid(raw || 'uuidna')
}

export function coinHexFromHandle(handle: string, offset: number): string {
  const ring = handle + handle.slice(0, 2)
  return `#${ring.slice(offset, offset + 6)}`
}

export function handleColorsOf(handle: string): readonly string[] {
  const seq = sequenceVars()
  return [...handle].map((ch) => {
    const d = (parseInt(ch, 16) % 9) + 1
    return seq[`--seq-${d}`] ?? seq['--seq-5']!
  })
}

export function gateColorOf(handleColors: readonly string[], gateIndex: number): string {
  return handleColors[gateIndex % handleColors.length] ?? handleColors[0]!
}

export function ichingGatesOf(face: readonly number[]): readonly HeroGate[] {
  const n = face.length
  const linesN = HEXAGRAM_BITS
  const out: HeroGate[] = []
  for (let i = 0; i < n; i++) {
    const lines: number[] = []
    for (let b = 0; b < linesN; b++) lines.push((i >> b) & 1)
    out.push({ i, lit: face[i] === 1, lines })
  }
  return out
}

export function heroAt(referrer: string, _opts: HeroAtOpts = {}): HeroAt {
  const address = resolveReferrer(referrer)
  const handle = handleOf(address)
  const door = `https://uuidna.com/${handle}`
  const referrerDoor = referrerDoorOf(handle)
  const contributed = coins()
  const fused = contributed === COINS && PRICE === contributed
  const faces = twoBoardsOf(address)
  const aura = quantumAura(address)
  const ten = aura.ten
  const handleColors = handleColorsOf(handle)
  const coinColors: [HeroCoinColor, HeroCoinColor] = [
    { hex: coinHexFromHandle(handle, 0), offset: 0 },
    { hex: coinHexFromHandle(handle, 2), offset: 2 },
  ]
  const turn = rotationOf()
  const phase = turn / COINS
  return {
    address,
    handle,
    door,
    referrerDoor,
    fused,
    board: HANDLE_HEXBITS,
    gates: faces[0]!.length,
    hexagramBits: HEXAGRAM_BITS,
    boards: [ichingGatesOf(faces[0]!), ichingGatesOf(faces[1]!)],
    handleColors,
    coinColors,
    ten,
    hsl: aura.hsl,
    styleVars: {
      '--hero-aura': aura.hsl,
      '--hero-period': ten.period + 's',
      '--hero-turn': turn + 'deg',
      '--coin-phase': phase + 'deg',
      '--coin-a': coinColors[0].hex,
      '--coin-b': coinColors[1].hex,
      '--coin-weight': (1 / COINS).toFixed(3),
      '--glow-inner': ten.glowInner + 'px',
      '--glow-outer': ten.glowOuter + 'px',
      '--glow-spread-in': HEXBIT_BITS + 'px',
      '--glow-spread-out': (HEXBIT_BITS * TRINITY) + 'px',
      '--face-board': String(HANDLE_HEXBITS),
    },
  }
}

// ── THE HERO ANIMATION — motion computed from the ledger
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
  lead: string
  sequence: readonly number[]
  fused: boolean
  dimensions: readonly string[]
  durations: readonly string[]
  address: string
  handle: string
  door: string
  referrerDoor: number
  ten: TenD
  hsl: string
  honest: string
}

/** heroAnimation — MCP/legacy entry: theorem key resolves to its address, then heroAt. Prefer heroAt(referrer). */
export function heroAnimation(
  key = 'vortex_orbit', dimension = 'en', rung = 1, tempo = 444, base = DEFAULT_BASE,
): HeroAnimation {
  const subject = ledger().find((t) => t.key === key)?.address ?? toUuid(key)
  return heroAnimationOf(subject, { dimension, rung, tempo }, base, key)
}

/** heroAnimationOf(referrer, opts) → SVG + bag; referrer is address, handle, or door URL. Iching boards only. */
export function heroAnimationOf(
  referrer: string, opts: HeroAtOpts = {}, base = DEFAULT_BASE, title = '',
): HeroAnimation {
  const h = heroAt(referrer, opts)
  const durs = durationVars()
  const tempoKeys = Object.keys(durs)
  const cell = 11
  const boardN = h.board
  const boardW = boardN * cell
  const lineSvg = (board: readonly HeroGate[], ox: number, oy: number, coinHex: string, side: number): string => {
    let out = `<g data-slot="coin-face" data-side="${side}" opacity="0.55" style="mix-blend-mode:screen">`
    out += `<rect x="${ox}" y="${oy}" width="${boardW}" height="${boardW}" fill="${coinHex}" opacity="0.12"/>`
    for (const gate of board) {
      const col = gate.i % boardN
      const row = (gate.i / boardN) | 0
      const x = ox + col * cell
      const y = oy + row * cell
      const op = gate.lit ? '1' : '0.35'
      const stroke = gateColorOf(h.handleColors, gate.i)
      const door = gate.i === h.referrerDoor ? ' data-door-gate="1"' : ''
      out += `<g data-slot="gate" data-gate="${gate.i}" data-lit="${gate.lit ? 1 : 0}"${door} opacity="${op}">`
      const pad = cell * 0.15
      const lineH = cell * 0.08 < 0.6 ? 0.6 : cell * 0.08
      const step = (cell - pad * 2 - lineH * 6) / 7
      for (let li = 0; li < gate.lines.length; li++) {
        const yang = gate.lines[li]
        const ly = y + pad + li * (lineH + step)
        if (yang) {
          out += `<line x1="${x + pad}" y1="${ly}" x2="${x + cell - pad}" y2="${ly}" stroke="${stroke}" stroke-width="${lineH}"/>`
        } else {
          const mid = x + cell / 2
          out += `<line x1="${x + pad}" y1="${ly}" x2="${mid - cell * 0.12}" y2="${ly}" stroke="${stroke}" stroke-width="${lineH}"/>`
          out += `<line x1="${mid + cell * 0.12}" y1="${ly}" x2="${x + cell - pad}" y2="${ly}" stroke="${stroke}" stroke-width="${lineH}"/>`
        }
      }
      out += '</g>'
    }
    out += '</g>'
    return out
  }
  const label = title || h.handle
  const style =
    `<style>@keyframes hero-res-${h.ten.ray}{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(${h.ten.rotation}deg)}}` +
    `.hero-coin{animation:hero-res-${h.ten.ray} ${h.ten.period}s linear infinite}.hero-coin-b{animation-direction:reverse;animation-delay:${-h.ten.period / 2}s}</style>`
  const ox = 8
  const left = `<g class="hero-coin hero-coin-a">${lineSvg(h.boards[0]!, ox, 8, h.coinColors[0].hex, 0)}</g>`
  const right = `<g class="hero-coin hero-coin-b">${lineSvg(h.boards[1]!, ox, 8, h.coinColors[1].hex, 1)}</g>`
  const svgW = boardW + 16
  const svgH = boardW + 16
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" role="img"` +
    ` data-fused="${h.fused ? 1 : 0}" data-handle="${h.handle}" data-door="${h.referrerDoor}"` +
    ` data-period="${h.ten.period}" data-rotation="${h.ten.rotation}"` +
    ` data-residue="${h.ten.residue}" data-ray="${h.ten.ray}" data-wave="${h.ten.wave}"` +
    ` data-hue="${h.ten.hue}" data-sat="${h.ten.sat}" data-light="${h.ten.light}"` +
    ` data-glow-inner="${h.ten.glowInner}" data-glow-outer="${h.ten.glowOuter}"` +
    ` data-coin-a="${h.coinColors[0].hex}" data-coin-b="${h.coinColors[1].hex}"` +
    ` aria-label="double i ching ${h.handle} in resonance, referrer door ${h.referrerDoor}">` +
    `<title>${label} — ${h.fused ? 'resonance' : 'will not fuse'}, door ${h.referrerDoor}</title>` +
    style + left + right + `</svg>`
  const dims = DIMENSIONS
  const lead = dims[h.referrerDoor % dims.length]!
  const sequence = fuseLadder(1, coins())
  return {
    svg,
    lead,
    sequence,
    fused: h.fused,
    dimensions: dims,
    durations: tempoKeys.map((k) => durs[k]),
    address: h.address,
    handle: h.handle,
    door: h.door,
    referrerDoor: h.referrerDoor,
    ten: h.ten,
    hsl: h.hsl,
    honest: 'heroAt(referrer): double Fu Xi iching boards from twoBoardsOf; 10D aura from quantumAura; referrer door marks one gate.',
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
 *  HONEST SCOPE: it recovers the leading digits of the theorem's content-address — its IDENTITY.
 *  Six nodes carry six digits; that is a pointer to the proof. */
export function readHero(svg: string): { digits: string; carried: number; complete: boolean } {
  const durs = durationVars()
  const tempoKeys = Object.keys(durs)
  const order = tempoKeys.map((k) => durs[k])                       // the sealed tempi, in their sealed order
  // The gap between a node's data-seq and its dur is 44 characters in the SVG we emit; 200 is the slack. Bounded
  // because readHero is exported and reads a string the caller supplies — an unbounded `[^]*?` between two anchors
  // is quadratic on input that never completes the match, and a forged SVG is exactly the case this must survive
  // (the forgery test feeds it one). A node spread wider than the bound is not our channel, which is the same
  // verdict the tempo check below already returns.
  const nodes = [...svg.matchAll(/data-seq="(\d{1,9})"[^]{0,200}?dur="([^"]{1,32})"/g)]
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
