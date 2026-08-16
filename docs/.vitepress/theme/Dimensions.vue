<script setup lang="ts">
// Dimensions — the involution control: a diamond in the corner of every page. One tap folds the whole reading
// experience to its simple pole (or back — self-inverse); open it and every dimension is its own toggle, each
// named by its two poles. Preferences live in this browser only (localStorage), nothing sent. The centre of the
// diamond strip is 5 — the fold's fixed heart — so the button glows the sequence green when folded.
import { ref, computed } from 'vue'
import { dims, DIMENSION_POLES, foldAll, isFolded, type DimKey } from './dimensions'

const open = ref(false)
const folded = computed(() => isFolded())
const keys = Object.keys(DIMENSION_POLES) as DimKey[]
const LABELS: Record<DimKey, string> = {
  aura: 'aura', formulas: 'formulas', meta: 'meta', density: 'density', motion: 'motion',
}
</script>

<template>
  <div class="dims" :class="{ open }">
    <button class="dims-toggle" :class="{ folded }" :title="folded ? 'unfold — the full experience' : 'fold — the simple experience'"
      aria-label="reading dimensions" @click="open = !open">◈</button>
    <div v-if="open" class="dims-panel">
      <div class="dims-head">
        <strong>dimensions</strong>
        <button class="dims-fold" @click="foldAll()">{{ folded ? 'unfold all' : 'fold all' }}</button>
      </div>
      <label v-for="k in keys" :key="k" class="dims-row">
        <span class="dims-name">{{ LABELS[k] }}</span>
        <button class="dims-pole" :class="{ simple: !dims[k] }" @click="dims[k] = !dims[k]">
          {{ dims[k] ? DIMENSION_POLES[k][0] : DIMENSION_POLES[k][1] }}
        </button>
      </label>
      <p class="dims-note">held in this browser only — nothing sent. The fold is an involution: one click back.</p>
    </div>
  </div>
</template>

<style scoped>
.dims { position: fixed; right: 1rem; bottom: 1rem; z-index: 40; display: flex; flex-direction: column; align-items: flex-end; gap: .5rem; }
.dims-toggle { width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); font-size: 1.05rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.12); transition: color .15s, border-color .15s; }
.dims-toggle:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-text-1); }
.dims-toggle.folded { color: var(--seq-5, var(--vp-c-brand-1)); border-color: var(--seq-5, var(--vp-c-brand-1)); }
.dims-panel { width: 15.5rem; padding: .8rem .9rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); box-shadow: 0 6px 24px rgba(0,0,0,.16); }
.dims-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
.dims-head strong { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; color: var(--vp-c-text-2); }
.dims-fold { padding: .25rem .6rem; border: 1px solid var(--vp-c-brand-1); border-radius: 999px; background: transparent; color: var(--vp-c-brand-1); font-size: .78rem; cursor: pointer; }
.dims-fold:hover { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.dims-row { display: flex; justify-content: space-between; align-items: center; padding: .28rem 0; }
.dims-name { font-size: .85rem; color: var(--vp-c-text-1); }
.dims-pole { min-width: 5.2rem; padding: .22rem .55rem; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: .78rem; cursor: pointer; transition: all .12s; }
.dims-pole.simple { border-color: var(--vp-c-text-3); color: var(--vp-c-text-2); background: transparent; }
.dims-note { margin: .55rem 0 0; font-size: .7rem; line-height: 1.45; color: var(--vp-c-text-3); }
@media (max-width: 640px) { .dims { right: .7rem; bottom: .7rem; } .dims-panel { width: 13.5rem; } }
</style>
