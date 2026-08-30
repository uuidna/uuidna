<!-- Hero — double iching in the documented home-hero-after slot. Href is heroAt().door (hexbit door);
     uuidnaOS serves that handle; VitePress does not invent a page for it. VPLink treats an absolute door as external. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { heroAt, gateColorOf } from '../../../dist/render.js'

const props = defineProps({
  referrer: { type: String, default: '' },
  size: { type: Number, default: 240 },
})

const { frontmatter } = useData()

const referrerIn = computed(() => {
  if (props.referrer) return props.referrer
  const fm = frontmatter.value || {}
  return String(fm.seoAddress || fm.address || fm.handleUrl || fm.handle || '')
})

const h = computed(() => heroAt(referrerIn.value))

const gateColor = (gateIndex) => gateColorOf(h.value.handleColors, gateIndex)
</script>

<template>
  <figure
    class="heroanim"
    data-slot="hero-animation"
    :data-handle="h.handle"
    :data-door="h.referrerDoor"
    :data-fused="h.fused ? 1 : 0"
    :data-period="h.ten.period"
    :data-rotation="h.ten.rotation"
    :data-coin-a="h.coinColors[0].hex"
    :data-coin-b="h.coinColors[1].hex"
    :style="h.styleVars"
  >
    <VPLink :href="h.door" no-icon :aria-label="'handle ' + h.handle + ', referrer door ' + h.referrerDoor">
      <div
        class="hero-iching hero-resonance"
        data-slot="next-coin"
        data-genus="2"
        role="img"
        :aria-label="h.fused ? `double i ching ${h.handle} in resonance, door ${h.referrerDoor}` : 'will not fuse'"
      >
        <div
          v-for="(board, side) in h.boards"
          :key="side"
          class="hero-board"
          :class="side === 0 ? 'hero-coin-a' : 'hero-coin-b'"
          data-slot="coin-face"
          :data-side="side"
          :style="{ '--coin-hex': h.coinColors[side].hex }"
        >
          <div
            v-for="gate in board"
            :key="gate.i"
            class="hero-gate"
            data-slot="gate"
            :data-gate="gate.i"
            :data-lit="gate.lit ? '1' : '0'"
            :data-door-gate="gate.i === h.referrerDoor ? '1' : '0'"
          >
            <span
              v-for="(yang, li) in gate.lines"
              :key="li"
              class="hero-line"
              :data-yang="yang ? '1' : '0'"
              :style="{ '--line-color': gateColor(gate.i) }"
            />
          </div>
        </div>
      </div>
    </VPLink>
    <figcaption>
      <code>{{ h.handle }}</code>
      <span class="hero-coin-swatches" aria-hidden="true">
        <i :style="{ background: h.coinColors[0].hex }" />
        <i :style="{ background: h.coinColors[1].hex }" />
      </span>
      <template v-if="h.fused"> · door {{ h.referrerDoor }} · resonance</template>
      <template v-else> · will not fuse</template>
    </figcaption>
  </figure>
</template>

<style scoped>
.heroanim { margin: 1.5rem auto; text-align: center }
.heroanim a {
  display: inline-block;
  text-decoration: none;
  border-radius: 12px;
  padding: 0.35rem;
  box-shadow:
    0 0 var(--glow-inner) var(--glow-spread-in) color-mix(in srgb, var(--hero-aura) 40%, transparent),
    0 0 var(--glow-outer) var(--glow-spread-out) color-mix(in srgb, var(--hero-aura) 14%, transparent);
}
.hero-iching {
  position: relative;
  width: v-bind('size + "px"');
  height: v-bind('size + "px"');
  margin: 0 auto;
}
.hero-resonance {
  isolation: isolate;
}
.hero-board {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(var(--face-board, 8), 1fr);
  gap: 2px;
  padding: 2px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--coin-hex) 22%, var(--vp-c-bg-soft));
  mix-blend-mode: screen;
  opacity: var(--coin-weight, 0.5);
  animation: hero-resonance var(--hero-period) linear infinite;
  will-change: filter;
}
.hero-coin-a {
  z-index: 1;
  animation-direction: normal;
}
.hero-coin-b {
  z-index: 2;
  animation-direction: reverse;
  animation-delay: calc(var(--hero-period) * -0.5);
}
@keyframes hero-resonance {
  from { filter: hue-rotate(0deg) saturate(1.1); }
  to { filter: hue-rotate(var(--hero-turn)) saturate(1.1); }
}
.hero-gate {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-evenly;
  padding: 2px 3px;
  background: color-mix(in srgb, var(--coin-hex) 8%, var(--vp-c-bg));
  opacity: 0.4;
}
.hero-gate[data-lit="1"] {
  opacity: 1;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--line-color) 70%, var(--coin-hex));
}
.hero-gate[data-door-gate="1"] {
  box-shadow: inset 0 0 0 2px var(--line-color);
}
.hero-line {
  display: block;
  height: 2px;
  background: var(--line-color);
}
.hero-line[data-yang="0"] {
  background: linear-gradient(
    90deg,
    var(--line-color) 38%,
    transparent 38%,
    transparent 62%,
    var(--line-color) 62%
  );
}
.heroanim[data-fused="0"] .hero-board { animation: none; opacity: 0.35; mix-blend-mode: normal; }
.hero-coin-swatches {
  display: inline-flex;
  gap: 0.2rem;
  margin-left: 0.35rem;
  vertical-align: middle;
}
.hero-coin-swatches i {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 2px;
  border: 1px solid var(--vp-c-divider);
}
figcaption { font-size: .78rem; color: var(--vp-c-text-2); margin-top: .4rem }
figcaption code { font-size: .85em; color: var(--hero-aura); }
@media (prefers-reduced-motion: reduce) {
  .hero-board { animation: none; }
}
</style>
