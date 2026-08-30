<!-- HexFace — the theorem is presented in hex: handle, two Fu Xi boards (the double I Ching), merkaba
     superposition of two tetrahedra (4+4 = handle), moved by the referrer door (first tile mod 6).
     Colour is quantumAura (art, not physics). Sound is HexbitPlayer — opt-in, never autoplay.
     Motion is linear and referrer-driven — no free spin. Tokens from the matrix (--seq-*), not Tailwind. -->
<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useData, withBase } from 'vitepress'
import { vortexOrbit, A432_STEP, BASE, TRINITY } from '../../../dist/address.js'
import { glagoliticOf, glagoliticUnitOf } from '../../../dist/hexbit/index.js'
import { DIMENSIONS } from '../../../src/dimensions.js'
import { COINS, HEXBIT_BITS } from '../../../dist/hexbit/index.js'

const HexbitPlayer = defineAsyncComponent(() => import('./HexbitPlayer.vue'))

const { params, frontmatter } = useData()

const fm = computed(() => ({ ...(frontmatter.value || {}), ...(params.value || {}) }))
const handle = computed(() => String(fm.value.handle || ''))
const hexbits = computed(() => Array.isArray(fm.value.hexbits) ? fm.value.hexbits : [])
const occupancy = computed(() => Array.isArray(fm.value.occupancy) ? fm.value.occupancy : [])
const occupancyCites = computed(() => {
  if (Array.isArray(fm.value.occupancyCites) && fm.value.occupancyCites.length) return fm.value.occupancyCites
  return occupancy.value.map((n) => ({ n, keys: [] }))
})
const occupancyDoors = computed(() => Array.isArray(fm.value.occupancyDoors) ? fm.value.occupancyDoors : [])
const aura = computed(() => fm.value.aura || {})
const ten = computed(() => {
  const t = aura.value.ten
  if (!t || typeof t !== 'object') return { glowInner: 0, glowOuter: 0, period: 0, rotation: 0 }
  return {
    glowInner: Number(t.glowInner) || 0,
    glowOuter: Number(t.glowOuter) || 0,
    period: Number(t.period) || 0,
    rotation: Number(t.rotation) || 0,
  }
})
const handleParts = computed(() => Array.isArray(fm.value.handleParts) ? fm.value.handleParts : [])
const door = computed(() => String(fm.value.handleUrl || (handle.value ? 'https://uuidna.com/' + handle.value : '')))
const board = computed(() => Number(fm.value.board) > 0 ? Number(fm.value.board) : 0)
const gates = computed(() => Number(fm.value.gates) > 0 ? Number(fm.value.gates) : 0)
const hexagramBits = computed(() => Number(fm.value.hexagramBits) > 0 ? Number(fm.value.hexagramBits) : 0)
const packedTriangles = computed(() => Number(fm.value.packedTriangles) > 0 ? Number(fm.value.packedTriangles) : 0)
const merkabasPacked = computed(() => Number(fm.value.merkabasPacked) > 0 ? Number(fm.value.merkabasPacked) : 0)
const veFaces = computed(() => Number(fm.value.veFaces) > 0 ? Number(fm.value.veFaces) : 0)
const coinsN = computed(() => {
  const c = Number(fm.value.coins)
  if (c > 0) return c
  if (Array.isArray(fm.value.faces) && fm.value.faces.length) return fm.value.faces.length
  return 0
})
const merkaba = computed(() => Number(fm.value.merkaba) > 0 ? Number(fm.value.merkaba) : board.value)
const referrerDoor = computed(() => {
  const d = Number(fm.value.referrerDoor)
  return d >= 0 ? d : 0
})
const fused = computed(() => fm.value.fused === true || fm.value.fused === 1)
const ladder = computed(() => Array.isArray(fm.value.ladder) ? fm.value.ladder : [])
const rosetteN = computed(() => Number(fm.value.rosette) > 0 ? Number(fm.value.rosette) : 0)
const pentadN = computed(() => Number(fm.value.pentad) > 0 ? Number(fm.value.pentad) : 0)
const hexPi = computed(() => {
  const p = fm.value.hexPi
  if (!p || typeof p !== 'object') {
    return { referrer: { handle: '', door: 0, verse: [] }, superposition: { handle: '', door: 0, verse: [] }, paired: false, remainder: 0 }
  }
  const door = (x) => ({
    handle: String(x && x.handle || ''),
    door: Number(x && x.door) || 0,
    verse: Array.isArray(x && x.verse) ? x.verse : [],
  })
  return { referrer: door(p.referrer), superposition: door(p.superposition), paired: p.paired === true || p.paired === 1, remainder: Number(p.remainder) || 0 }
})
const metatron = computed(() => {
  const m = fm.value.metatron
  if (!m || typeof m !== 'object') return { centres: 0, lines: 0, nodes: [], xy: [] }
  return {
    centres: Number(m.centres) || 0,
    lines: Number(m.lines) || 0,
    nodes: Array.isArray(m.nodes) ? m.nodes : [],
    xy: Array.isArray(m.xy) ? m.xy : [],
  }
})
const metatronEdges = computed(() => {
  const nodes = metatron.value.nodes
  const xy = metatron.value.xy
  const n = nodes.length
  const edges = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = xy[i]
      const b = xy[j]
      if (!a || !b) continue
      edges.push({ i, j, x1: a[0], y1: a[1], x2: b[0], y2: b[1], lit: nodes[i] !== 0 && nodes[j] !== 0 })
    }
  }
  return edges
})

const bitsOfTiles = (tiles) => {
  const bits = []
  for (const n of tiles) {
    for (let s = 3; s >= 0; s--) bits.push((n >> s) & 1)
  }
  return bits
}
const faces = computed(() => {
  if (Array.isArray(fm.value.faces) && fm.value.faces.length) return fm.value.faces
  const bits = bitsOfTiles(hexbits.value)
  const n = coinsN.value > 0 ? coinsN.value : (bits.length ? COINS : 0)
  if (!n) return []
  const half = bits.length / n
  const out = []
  for (let c = 0; c < n; c++) out.push(bits.slice(c * half, (c + 1) * half))
  return out
})

const orbit = vortexOrbit()
const dims = DIMENSIONS
const leadRay = computed(() => {
  const n = dims.length
  const r = Number(aura.value.ray)
  if (!(n > 0)) return 0
  return ((r % n) + n) % n
})
const TURN = A432_STEP * BASE
const rayTurn = (i) => ((i - leadRay.value + dims.length) % dims.length) * (TURN / dims.length)
const nodeTurn = (i) => ((i - referrerDoor.value + orbit.length) % orbit.length) * (TURN / orbit.length)
const merkabaTurn = computed(() => referrerDoor.value * (TURN / orbit.length))
const vertexTurn = (i) => i * (TURN / (merkaba.value || 1))

const hit = (n) => occupancy.value.includes(n)
const pageGlyph = (state) => glagoliticOf(Number(state) || 0)
const unitGlyph = (n) => (n >= 1 && n <= BASE ? glagoliticUnitOf(n) : '')
const glyphs = computed(() => fm.value.glyphs || {})
const station = computed(() => fm.value.stations || {})
const starN = computed(() => Number(glyphs.value.star) || 0)
const roseN = computed(() => Number(glyphs.value.rose) || 0)
const ringN = computed(() => Number(glyphs.value.ring) || 0)
const wheelN = computed(() => Number(glyphs.value.wheel) || 0)
const stationTrinity = computed(() => Number(station.value.trinity) || 0)
const stationRays = computed(() => Number(station.value.rays) || 0)
const stationTen = computed(() => Number(station.value.ten) || 0)
const stationRoof = computed(() => Number(station.value.roof) || 0)
const stationCount = computed(() => stationTrinity.value + stationRays.value)
const stations = computed(() => hit(stationTen.value) || (hit(stationTrinity.value) && hit(stationRays.value)))
const readings = computed(() => occupancy.value.filter((n) => n === stationTen.value || n === stationRoof.value))

const cellsOf = (bits) => {
  const out = []
  const n = gates.value
  const linesN = hexagramBits.value
  const row = Array.isArray(bits) ? bits : []
  for (let i = 0; i < n; i++) {
    const lines = []
    for (let b = 0; b < linesN; b++) lines.push((i >> b) & 1)
    out.push({ i, lit: row[i] === 1, lines })
  }
  return out
}
</script>

<template>
  <section
    v-if="handle"
    class="hex-face"
    data-slot="hex-face"
    :data-fused="fused ? 1 : 0"
    :data-period="ten.period"
    :data-rotation="ten.rotation"
    :style="{ '--face-aura': aura.hsl || 'var(--seq-5)', '--face-board': board, '--coins': coinsN, '--half-turn': (TURN / (coinsN || 1)) + 'deg', '--turn': (ten.rotation || TURN) + 'deg', '--door': referrerDoor, '--merkaba-turn': merkabaTurn + 'deg', '--glow-inner': ten.glowInner + 'px', '--glow-outer': ten.glowOuter + 'px', '--glow-spread-in': HEXBIT_BITS + 'px', '--glow-spread-out': (HEXBIT_BITS * TRINITY) + 'px' }"
    :aria-label="'hex face ' + handle + (fused ? ', fused' : ', will not fuse')"
  >
    <p class="hex-face-path" data-slot="handle-path">
      <code v-for="part in handleParts" :key="part">{{ part }}</code>
    </p>
    <p v-if="hexPi.superposition.handle" class="hex-pi-handles" data-slot="hex-pi-handles">
      <code data-slot="referrer-handle" :data-door="hexPi.referrer.door">{{ hexPi.referrer.handle }}</code>
      <code data-slot="superposition-handle" :data-door="hexPi.superposition.door">{{ hexPi.superposition.handle }}</code>
    </p>
    <p class="hex-face-door"><a :href="door">{{ door }}</a></p>

    <div
      v-if="faces.length"
      class="hex-earth"
      data-slot="next-coin"
      data-genus="2"
      role="img"
      :aria-label="'double i ching merkaba superposition, referrer door ' + referrerDoor"
    >
      <div
        v-for="(bits, side) in faces"
        :key="side"
        class="hex-side"
        data-slot="coin-face"
        :data-side="side"
      >
        <div class="hex-board" data-slot="hex-board">
          <div
            v-for="cell in cellsOf(bits)"
            :key="cell.i"
            class="hex-gate"
            data-slot="gate"
            :data-gate="cell.i"
            :data-lit="cell.lit ? '1' : '0'"
          >
            <span
              v-for="(yang, li) in cell.lines"
              :key="li"
              class="hex-line"
              :data-yang="yang ? '1' : '0'"
            />
          </div>
        </div>
      </div>
      <div
        v-if="false"
        class="hex-merkaba q-superposition"
        data-slot="merkaba"
        :data-vertices="merkaba"
        :data-packed-triangles="packedTriangles"
        :data-merkabas-packed="merkabasPacked"
        :data-ve-faces="veFaces"
        :data-door="referrerDoor"
        :style="{ transform: 'rotate(' + merkabaTurn + 'deg)' }"
      >
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <polygon class="tetra tetra-yang" points="100,20 178,156 22,156" />
          <polygon class="tetra tetra-yin" points="100,180 178,44 22,44" />
          <g v-for="k in merkaba" :key="k" :transform="'rotate(' + vertexTurn(k - 1) + ' 100 100)'">
            <circle cx="100" cy="16" r="3" class="merkaba-vertex" />
          </g>
        </svg>
      </div>
      <svg
        v-if="false"
        class="hex-metatron"
        data-slot="metatron"
        :data-centres="metatron.centres"
        :data-lines="metatron.lines"
        viewBox="0 0 200 200"
        aria-hidden="true"
        :style="{ transform: 'rotate(' + merkabaTurn + 'deg)' }"
      >
        <line
          v-for="e in metatronEdges"
          :key="e.i + '-' + e.j"
          :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
          class="metatron-line"
          :data-lit="e.lit ? '1' : '0'"
        />
        <circle
          v-for="(pt, i) in metatron.xy"
          :key="i"
          :cx="pt[0]" :cy="pt[1]" r="14"
          class="metatron-centre"
          :data-lit="metatron.nodes[i] ? '1' : '0'"
        />
      </svg>
      <svg v-if="false" class="hex-rosetta" data-slot="rosetta" :data-rosette="rosetteN" viewBox="0 0 200 200" aria-hidden="true">
        <g class="hex-rays">
          <g v-for="(d, i) in dims" :key="d" :transform="'rotate(' + rayTurn(i) + ' 100 100)'">
            <line x1="100" y1="100" :x2="100" :y2="i === leadRay ? 28 : 42"
                  :class="i === leadRay ? 'hex-ray-lead' : 'hex-ray-dim'"
                  :stroke="'var(--seq-' + ((i % 9) + 1) + ')'" :stroke-width="i === leadRay ? 3 : 1" />
          </g>
        </g>
        <g class="hex-orbit">
          <g v-for="(v, i) in ladder" :key="v" :transform="'rotate(' + nodeTurn(i) + ' 100 100)'">
            <circle cx="100" cy="22" :r="ladder.length" :fill="'var(--seq-' + v + ')'" />
            <text x="100" y="26" text-anchor="middle" font-size="8" class="hex-orbit-num"
                  :transform="'rotate(' + (-nodeTurn(i)) + ' 100 22)'">{{ v }}</text>
          </g>
        </g>
        <g v-if="hexPi.referrer.verse.length" class="hex-pi" data-slot="hex-pi" :data-paired="hexPi.paired ? 1 : 0" :data-remainder="hexPi.remainder">
          <g v-for="(d, i) in hexPi.referrer.verse" :key="'pi-' + i" :transform="'rotate(' + nodeTurn(i) + ' 100 100)'">
            <text x="100" y="48" text-anchor="middle" font-size="9" class="hex-pi-ref"
                  :transform="'rotate(' + (-nodeTurn(i)) + ' 100 48)'">{{ d }}</text>
            <text x="100" y="62" text-anchor="middle" font-size="9" class="hex-pi-sup"
                  :transform="'rotate(' + (-nodeTurn(i)) + ' 100 62)'">{{ hexPi.superposition.verse[i] }}</text>
          </g>
        </g>
        <circle cx="100" cy="100" r="4" fill="var(--seq-5)" />
      </svg>
    </div>

    <ol v-if="fused && ladder.length" class="hex-ladder" data-slot="fuse-ladder" aria-label="fuse ladder">
      <li v-for="w in ladder" :key="w" data-slot="fuse-rung" :data-width="w">{{ w }}</li>
    </ol>

    <ol v-if="stations" class="hex-stations" data-slot="stations" aria-label="ten stations">
      <li v-for="n in stationCount" :key="n" class="hex-station" data-slot="station" />
    </ol>

    <div class="hex-glyphs" data-slot="glyphs">
      <div v-if="fused && pentadN" class="glyph glyph-star" data-slot="pentad" :data-count="pentadN" role="img" :aria-label="String(pentadN)">
        <span v-for="k in pentadN" :key="k" :style="{ '--i': k - 1, '--n': pentadN }" />
      </div>
      <div v-if="starN && hit(starN) && !(fused && pentadN)" class="glyph glyph-star" data-slot="glyph" :data-count="starN" role="img" :aria-label="String(starN)">
        <span v-for="k in starN" :key="k" :style="{ '--i': k - 1, '--n': starN }" />
      </div>
      <div v-if="roseN && hit(roseN)" class="glyph glyph-rose" data-slot="glyph" :data-count="roseN" role="img" :aria-label="String(roseN)">
        <span v-for="k in roseN" :key="k" :style="{ '--i': k - 1, '--n': roseN }" />
      </div>
      <div v-if="ringN && hit(ringN)" class="glyph glyph-ring" data-slot="glyph" :data-count="ringN" role="img" :aria-label="String(ringN)">
        <span v-for="k in ringN" :key="k" :style="{ '--i': k - 1, '--n': ringN }" />
      </div>
      <div v-if="wheelN && hit(wheelN)" class="glyph glyph-wheel" data-slot="glyph" :data-count="wheelN" role="img" :aria-label="String(wheelN)">
        <span v-for="k in wheelN" :key="k" :style="{ '--i': k - 1, '--n': wheelN }" />
      </div>
    </div>

    <ol class="hex-tiles" data-slot="hexbit-row" aria-label="hexbits">
      <li
        v-for="(state, i) in hexbits"
        :key="i"
        class="hex-tile"
        data-slot="hexbit-tile"
        :data-state="state"
        :data-glyph="pageGlyph(state)"
        :title="String(state)"
      >{{ pageGlyph(state) }}</li>
    </ol>

    <ol v-if="readings.length" class="hex-readings" data-slot="readings" aria-label="ten and twenty-two">
      <li v-for="n in readings" :key="n" data-slot="reading" :data-count="n">
        <span v-if="unitGlyph(n)" class="hex-reading-glyph">{{ unitGlyph(n) }}</span>
        <span class="hex-reading-n">{{ n }}</span>
      </li>
    </ol>

    <ol class="hex-occupancy" data-slot="occupancy" aria-label="sealed counts">
      <li v-for="hit in occupancyCites" :key="hit.n" data-slot="count" :data-count="hit.n">
        <span v-if="unitGlyph(hit.n)" class="hex-occupancy-glyph">{{ unitGlyph(hit.n) }}</span>
        <span class="hex-occupancy-n">{{ hit.n }}</span>
        <a
          v-for="key in hit.keys"
          :key="key"
          class="hex-occupancy-cite"
          :href="withBase('/theorem/' + key)"
          :data-theorem="key"
        >{{ key }}</a>
      </li>
    </ol>
    <ol class="hex-occupancy-doors" data-slot="occupancy-doors" aria-label="occupancy theorems">
      <li v-for="key in occupancyDoors" :key="key">
        <a :href="withBase('/theorem/' + key)" :data-theorem="key">{{ key }}</a>
      </li>
    </ol>

    <ClientOnly>
      <HexbitPlayer v-if="hexbits.length" :states="hexbits" />
    </ClientOnly>
  </section>
</template>

<style scoped>
.hex-face {
  max-width: 52rem;
  margin: 0 0 1.25rem;
  padding: 0.75rem 0;
  color: var(--vp-c-text-1);
}
.hex-face-path {
  display: flex;
  gap: 0.35rem;
  font-size: 0.85rem;
  margin: 0 0 0.25rem;
}
.hex-face-path code {
  padding: 0.1rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--face-aura);
}
.hex-pi-handles {
  display: flex;
  gap: 0.35rem;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}
.hex-pi-handles code {
  padding: 0.1rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
.hex-pi-handles [data-slot="referrer-handle"] { color: var(--face-aura); }
.hex-pi-handles [data-slot="superposition-handle"] { color: var(--vp-c-text-2); opacity: calc(1 / var(--coins)); }
.hex-pi-ref { fill: var(--face-aura); font-weight: 600; }
.hex-pi-sup { fill: var(--vp-c-text-2); font-weight: 600; }
.hex-pi[data-paired="1"] .hex-pi-sup { fill: var(--face-aura); opacity: 1; }
.hex-face-door {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
}
.hex-face-door a { color: var(--vp-c-text-2); }
.hex-earth {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  max-width: 44rem;
  box-shadow: 0 0 var(--glow-inner, 0) var(--glow-spread-in, 0) color-mix(in srgb, var(--face-aura) 40%, transparent),
              0 0 var(--glow-outer, 0) var(--glow-spread-out, 0) color-mix(in srgb, var(--face-aura) 14%, transparent);
}
.hex-side { min-width: 0; }
.hex-merkaba {
  position: absolute;
  inset: 8%;
  pointer-events: auto;
  z-index: 1;
  transform-origin: center;
  /* referrer door × turn/orbit — linear, no loop */
}
.hex-merkaba svg { width: 100%; height: 100%; }
.tetra {
  fill: var(--face-aura);
  stroke: var(--face-aura);
  stroke-width: 1;
  opacity: calc(1 / var(--coins));
}
.hex-merkaba:hover .tetra-yang, .hex-merkaba:focus-within .tetra-yang { opacity: 1; }
.hex-merkaba:hover .tetra-yin, .hex-merkaba:focus-within .tetra-yin { opacity: 0; }
.merkaba-vertex { fill: var(--face-aura); }
.hex-rosetta {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  opacity: 0.85;
}
.hex-metatron {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  transform-origin: center;
}
.metatron-line {
  stroke: var(--face-aura);
  stroke-width: 0.4;
  opacity: 0.08;
}
.metatron-line[data-lit="1"] { opacity: 0.45; }
.metatron-centre {
  fill: none;
  stroke: var(--face-aura);
  stroke-width: 0.8;
  opacity: 0.2;
}
.metatron-centre[data-lit="1"] { opacity: 0.85; fill: color-mix(in srgb, var(--face-aura) 18%, transparent); }
.hex-ladder {
  display: flex;
  gap: 0.35rem;
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  font-variant-numeric: tabular-nums;
}
.hex-ladder li {
  min-width: 1.4rem;
  text-align: center;
  padding: 0.1rem 0.3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--face-aura);
}
.hex-ray-lead { opacity: 1; }
.hex-ray-dim { opacity: 0.14; }
.hex-orbit-num { fill: var(--vp-c-bg); font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hex-merkaba { transform: none !important; }
  .hex-metatron { transform: none !important; }
  .hex-merkaba:hover .tetra-yang, .hex-merkaba:focus-within .tetra-yang,
  .hex-merkaba:hover .tetra-yin, .hex-merkaba:focus-within .tetra-yin { opacity: calc(1 / var(--coins)); }
}
.hex-board {
  display: grid;
  grid-template-columns: repeat(var(--face-board, 8), 1fr);
  gap: 2px;
  max-width: 22rem;
  background: var(--seq-dark, var(--vp-c-bg-soft));
  padding: 2px;
}
.hex-gate {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-evenly;
  padding: 3px 4px;
  background: var(--vp-c-bg);
  opacity: 0.35;
}
.hex-gate[data-lit="1"] {
  opacity: 1;
  box-shadow: inset 0 0 0 1px var(--face-aura);
}
.hex-line {
  display: block;
  height: 2px;
  background: var(--face-aura);
}
.hex-line[data-yang="0"] {
  background: linear-gradient(90deg, var(--face-aura) 38%, transparent 38%, transparent 62%, var(--face-aura) 62%);
}
.hex-stations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  max-width: 22rem;
}
.hex-station {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: var(--face-aura);
}
.hex-glyphs {
  display: flex;
  gap: 0.75rem;
  margin: 0.75rem 0 0;
  align-items: center;
}
.glyph {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
}
.glyph span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.35rem;
  height: 0.35rem;
  margin: -0.175rem 0 0 -0.175rem;
  background: var(--face-aura);
  border-radius: 50%;
  transform: rotate(calc(var(--i) * var(--turn) / var(--n))) translateY(-0.95rem);
}
.glyph-rose span, .glyph-wheel span {
  width: 1px;
  height: 0.7rem;
  margin: -0.35rem 0 0 0;
  border-radius: 0;
  transform: rotate(calc(var(--i) * var(--turn) / var(--n))) translateY(-0.7rem);
}
.hex-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  list-style: none;
  margin: 0.75rem 0 0.5rem;
  padding: 0;
}
.hex-tile {
  width: 1.15rem;
  height: 1.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-family: 'Noto Sans Glagolitic', 'Segoe UI Historic', serif;
  color: var(--seq-center, var(--vp-c-text-1));
  border: 1px solid var(--vp-c-divider);
}
.hex-reading-glyph, .hex-occupancy-glyph {
  font-family: 'Noto Sans Glagolitic', 'Segoe UI Historic', serif;
  font-size: 0.95rem;
  line-height: 1;
}
.hex-reading-n, .hex-occupancy-n {
  font-family: ui-monospace, monospace;
  font-size: 0.68rem;
  opacity: 0.72;
}
.hex-readings, .hex-occupancy {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  font-family: ui-monospace, monospace;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
}
.hex-readings li, .hex-occupancy li {
  padding: 0.05rem 0.3rem;
  border: 1px solid var(--vp-c-divider);
  color: var(--face-aura);
}
.hex-occupancy li {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.45rem;
  align-items: baseline;
}
.hex-occupancy-cite,
.hex-occupancy-doors a {
  color: var(--face-aura);
  text-decoration: underline;
  text-underline-offset: 0.12em;
}
.hex-occupancy-doors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.6rem;
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  font-family: ui-monospace, monospace;
  font-size: 0.68rem;
  color: var(--vp-c-text-2);
}
</style>
