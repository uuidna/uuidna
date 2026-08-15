<!-- The 7d fold, animated. Self-contained inline SVG + CSS (no external calls, CSP-safe): seven leaf addresses fold,
     bottom-up, order-invariant, to one root receipt — the same merkleFold that computes a page's content-address.
     A wave lights each level in turn (leaves → level 1 → level 2 → root), on a clean 4s loop. `receipt` is the root
     label to display; it is illustration of the FOLD STRUCTURE (7 → 1 in O(log N)), not a live recomputation. -->
<script setup>
defineProps({ receipt: { type: String, default: 'e2aa7698-…' } })
</script>

<template>
  <figure class="foldfig">
    <svg viewBox="0 0 700 250" class="fold" role="img" aria-label="Seven addresses folding to one receipt">
      <!-- edges: leaves → L1 (lv1), L1 → L2 (lv2), L2 → root (lv3) -->
      <g class="edges" fill="none" stroke="var(--vp-c-divider)" stroke-width="2">
        <line class="lv1" x1="50"  y1="215" x2="100" y2="150" /><line class="lv1" x1="150" y1="215" x2="100" y2="150" />
        <line class="lv1" x1="250" y1="215" x2="300" y2="150" /><line class="lv1" x1="350" y1="215" x2="300" y2="150" />
        <line class="lv1" x1="450" y1="215" x2="500" y2="150" /><line class="lv1" x1="550" y1="215" x2="500" y2="150" />
        <line class="lv1" x1="650" y1="215" x2="650" y2="150" />
        <line class="lv2" x1="100" y1="150" x2="200" y2="80" /><line class="lv2" x1="300" y1="150" x2="200" y2="80" />
        <line class="lv2" x1="500" y1="150" x2="575" y2="80" /><line class="lv2" x1="650" y1="150" x2="575" y2="80" />
        <line class="lv3" x1="200" y1="80"  x2="387" y2="30" /><line class="lv3" x1="575" y1="80"  x2="387" y2="30" />
      </g>
      <!-- nodes -->
      <g class="nodes" fill="var(--vp-c-brand-1)">
        <circle class="lv0" cx="50"  cy="215" r="7" /><circle class="lv0" cx="150" cy="215" r="7" />
        <circle class="lv0" cx="250" cy="215" r="7" /><circle class="lv0" cx="350" cy="215" r="7" />
        <circle class="lv0" cx="450" cy="215" r="7" /><circle class="lv0" cx="550" cy="215" r="7" />
        <circle class="lv0" cx="650" cy="215" r="7" />
        <circle class="lv1" cx="100" cy="150" r="8" /><circle class="lv1" cx="300" cy="150" r="8" />
        <circle class="lv1" cx="500" cy="150" r="8" /><circle class="lv1" cx="650" cy="150" r="8" />
        <circle class="lv2" cx="200" cy="80"  r="9" /><circle class="lv2" cx="575" cy="80"  r="9" />
        <circle class="lv3 root" cx="387" cy="30" r="12" />
      </g>
    </svg>
    <figcaption>
      Seven addresses fold — order-invariant, O(log N) — to one receipt <code>{{ receipt }}</code>.
      Any pairing, forward or reverse, lands on the same root.
    </figcaption>
  </figure>
</template>

<style scoped>
.foldfig { margin: 1.5rem 0; text-align: center; }
.fold { width: 100%; max-width: 640px; height: auto; }
.foldfig figcaption { font-size: .85em; color: var(--vp-c-text-2); margin-top: .5rem; }
.foldfig code { font-size: .9em; }
/* a bottom-up wave: each level brightens in turn, on a clean repeating loop */
.lv0 { opacity: .35; animation: lv0 4s ease-in-out infinite; }
.lv1 { opacity: .35; animation: lv1 4s ease-in-out infinite; }
.lv2 { opacity: .35; animation: lv2 4s ease-in-out infinite; }
.lv3 { opacity: .35; animation: lv3 4s ease-in-out infinite; }
.root { transform-origin: 387px 30px; }
@keyframes lv0 { 0%,100% { opacity: .3 } 15% { opacity: 1 } }
@keyframes lv1 { 0%,100% { opacity: .3 } 38% { opacity: 1 } }
@keyframes lv2 { 0%,100% { opacity: .3 } 62% { opacity: 1 } }
@keyframes lv3 { 0%,100% { opacity: .35 } 88% { opacity: 1; transform: scale(1.25) } }
@media (prefers-reduced-motion: reduce) { .lv0,.lv1,.lv2,.lv3 { animation: none; opacity: 1 } }
</style>
