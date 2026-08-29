<!-- BookRoom — the reading room's instruments in one shell (lead 81b). The reader now also counts what a
     pasted text IS (words, ranks, letters, numerals) after the literature-yield metric was refuted; Zipf
     shapes that held on every book of the declared corpus are tagged vacuous-on-corpus, never identity.
     shadcn anatomy (data-slot), same slots as the Alpine catalogue. Nothing pasted leaves the page. -->
<script setup>
import { ref } from 'vue'
import HandleStrips from './HandleStrips.vue'
import { readPassage, findFacts, tryQuote } from '../../../src/quantum/apps/categories/books/index.js'

const passage = ref('A whole note equals two half notes. Two and two make four. 3 times 3 equals 9. Two and two make five. Music expresses what words cannot say.')
const reading = ref(null)
const finding = ref(null)
const doRead = () => {
  const r = readPassage(passage.value)
  reading.value = {
    address: r.audit.address ?? r.audit.receipt ?? '',
    chars: r.chars,
    linked: r.linkage.links?.length ?? r.linkage.linked ?? 0,
    words: r.structure.words,
    distinct: r.structure.distinct,
    richness: r.structure.richness,
    ranks: r.structure.ranks.slice(0, 8),
    letters: r.structure.letters.slice(0, 8),
    numerals: r.structure.numerals.slice(0, 8),
    facts: r.facts,
  }
}
const doFind = () => { finding.value = findFacts(passage.value) }

const quote = ref('the round turns on seven, proven by theorem song_round_turns_on_seven')
const attribution = ref('')
const verdict = ref(null)
const doTry = () => { verdict.value = tryQuote(quote.value, attribution.value || undefined) }
</script>

<template>
  <div class="book-room">
    <h3>The handle writes the book</h3>
    <HandleStrips />

    <article class="uuidna-card book-card" data-slot="card">
      <div data-slot="card-header">
        <h3 data-slot="card-title">The passage</h3>
        <p data-slot="card-description">identity, linkage, and the arithmetic the text is — occupancy, not meaning</p>
      </div>
      <div data-slot="card-content">
        <textarea v-model="passage" rows="4" style="width:100%"></textarea>
        <p>
          <button data-slot="button" type="button" @click="doRead">read — identity &amp; structure</button>
          <button data-slot="button" type="button" @click="doFind">find the facts</button>
        </p>
        <p v-if="reading"><small>{{ reading.chars }} characters · {{ reading.words }} words · {{ reading.distinct }} distinct · richness {{ reading.richness }} · identity <code data-slot="handle">{{ reading.address }}</code> · ledger linkage {{ reading.linked }}</small></p>
        <ol v-if="reading" class="book-ranks" data-slot="ranks">
          <li v-for="r in reading.ranks" :key="r.rank">{{ r.rank }}. {{ r.word }} = {{ r.count }}</li>
        </ol>
        <p v-if="reading && reading.letters.length"><small>letters {{ reading.letters.map((l) => l.letter + l.count).join(' ') }}</small></p>
        <p v-if="reading && reading.numerals.length"><small>numerals {{ reading.numerals.map((n) => n.word + '×' + n.count).join('  ') }}</small></p>
        <ul v-if="reading" class="book-facts">
          <li v-for="f in reading.facts" :key="f.claim">
            {{ f.holds ? '✓' : '✗' }}
            <span v-if="f.shape === 'vacuous-on-corpus'" data-slot="badge">vacuous-on-corpus</span>
            {{ f.claim }}
          </li>
        </ul>
        <div v-if="finding">
          <p><small v-for="c in finding.controls" :key="c.name">{{ c.rejected ? '✓' : '✗' }} control «{{ c.name }}» {{ c.rejected ? 'rejected' : 'ACCEPTED — VOID' }}<br/></small></p>
          <p v-if="finding.instrumentValid"><strong>{{ finding.verified }} verified · {{ finding.refuted }} refuted</strong> · {{ finding.claims.length }} number-bearing claims surfaced unverdicted</p>
          <ul>
            <li v-for="f in finding.facts.slice(0, 10)" :key="f.text ?? f.statement">{{ f.verified ? '✓' : '✗' }} {{ f.text ?? f.statement }}</li>
          </ul>
        </div>
      </div>
      <div data-slot="card-footer">
        <small>computed in your browser — a fact that holds on every book identifies none of them</small>
      </div>
    </article>

    <article class="uuidna-card book-card" data-slot="card">
      <div data-slot="card-header">
        <h3 data-slot="card-title">The quote, on trial</h3>
        <p data-slot="card-description">the citation trial; the quote leaves addressed either way</p>
      </div>
      <div data-slot="card-content">
        <input v-model="quote" style="width:100%" />
        <input v-model="attribution" style="width:100%" placeholder="attribution (optional — provenance, never verdicted)" />
        <button data-slot="button" type="button" @click="doTry">try the quote</button>
        <div v-if="verdict && verdict.subject">
          <p><strong>{{ verdict.subject.verdict }}</strong> — {{ verdict.subject.note }}</p>
          <p><small>the quote's address: <code data-slot="handle">{{ verdict.handle }}</code> · citable whatever the verdict — an open door is still a door</small></p>
        </div>
      </div>
      <div data-slot="card-footer">
        <small>an unverified quote with an address is a door, not a refute</small>
      </div>
    </article>
  </div>
</template>

<style scoped>
.book-card { margin: 1rem 0; padding: .6rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.book-card [data-slot="card-title"] { margin: 0 0 .3rem; font-size: 1.05rem; }
.book-card [data-slot="card-description"] { margin: 0; color: var(--vp-c-text-2); font-size: .82rem; }
.book-card [data-slot="card-content"] { padding: .4rem 0; }
.book-card [data-slot="card-footer"] { font-size: .8rem; color: var(--vp-c-text-3); }
.book-card [data-slot="button"] { margin: .25rem .4rem .25rem 0; padding: .35rem .7rem; border: 1px solid var(--vp-c-brand-1); border-radius: 8px; background: transparent; color: var(--vp-c-brand-1); font: inherit; cursor: pointer; }
.book-card [data-slot="button"]:hover { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.book-card [data-slot="badge"] { font-size: .72em; font-weight: 600; padding: .1rem .45rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); margin-right: .35rem; }
.book-ranks { display: flex; flex-wrap: wrap; gap: .2rem 1rem; padding: 0; margin: .4rem 0; list-style: none; font-size: .85rem; color: var(--vp-c-text-2); }
.book-facts { padding-left: 1.1rem; font-size: .88rem; }
</style>
