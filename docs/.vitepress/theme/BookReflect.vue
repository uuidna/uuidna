<!-- BookReflect — automate the audit while you WRITE. The visitor writes or pastes text and the full uuidna audit
     (auditText) recomputes live IN THE BROWSER on every keystroke: the content-address fingerprint, the chapter
     merkle root, the structural counts, the ℤ/9 gravity, and the honesty-gate verdict. Nothing is sent, stored, or
     tracked — no fetch, no analytics, no persistence. The same offline auditText the MCP tool runs, reflected back
     as you type. Opt-in by construction: nothing happens until the visitor writes. -->
<script setup>
import { ref, computed } from 'vue'
import { auditText } from '../../../src/books.js'

const text = ref('')
const audit = computed(() => (text.value ? auditText(text.value) : null))
</script>

<template>
  <div class="bookreflect">
    <p class="br-lead">Write, and the audit reflects back — <strong>in your browser</strong>. Nothing is sent, stored, or tracked.</p>
    <textarea v-model="text" class="br-in" rows="6" placeholder="write or paste a chapter — it stays on your device&#10;&#10;CHAPTER I&#10;It was the best of lines…" aria-label="text to audit"></textarea>
    <div v-if="audit" class="br-out">
      <div class="br-row"><span>fingerprint</span><code>{{ audit.address }}</code></div>
      <div class="br-row"><span>chapter root</span><code>{{ audit.chapterRoot }}</code></div>
      <div class="br-grid">
        <div><b>{{ audit.chapters }}</b><span>chapters</span></div>
        <div><b>{{ audit.words }}</b><span>words</span></div>
        <div><b>{{ audit.lines }}</b><span>lines</span></div>
        <div><b>{{ audit.chars }}</b><span>chars</span></div>
        <div><b>{{ audit.gravity }}</b><span>ℤ/9 gravity</span></div>
        <div><b>{{ audit.gate.binary === 1 ? 'clean' : 'hit' }}</b><span>gate{{ audit.gate.hit ? ' · ' + audit.gate.hit : '' }}</span></div>
      </div>
    </div>
    <p v-else class="br-out br-empty">— write something to reflect it —</p>
    <p class="br-note">Every keystroke re-addresses, so a change is never silent. The gate flags uuidna's own overclaim
    vocabulary, so a hit on ordinary prose is a visible false positive, not a verdict on your writing. Provenance and
    structure, recomputable — never a judgement of merit. Nothing leaves your device.</p>
  </div>
</template>

<style scoped>
.bookreflect { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.br-lead { margin: 0 0 .8rem; font-size: .95rem; }
.br-in { width: 100%; box-sizing: border-box; padding: .6rem .8rem; font-size: .95rem; line-height: 1.5; font-family: var(--vp-font-family-mono); border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); resize: vertical; }
.br-out { margin: .9rem 0 0; }
.br-empty { color: var(--vp-c-text-3); font-size: .9rem; }
.br-row { display: flex; flex-wrap: wrap; gap: .3rem .6rem; align-items: baseline; margin: .3rem 0; font-size: .9rem; }
.br-row span { color: var(--vp-c-text-2); min-width: 6.5rem; }
.br-row code { font-size: .9em; word-break: break-all; }
.br-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; margin: .9rem 0 0; }
.br-grid > div { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: .5rem .6rem; text-align: center; }
.br-grid b { display: block; font-size: 1.15rem; color: var(--vp-c-brand-1); }
.br-grid span { font-size: .72rem; color: var(--vp-c-text-2); }
.br-note { margin: .9rem 0 0; font-size: .8rem; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .br-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
