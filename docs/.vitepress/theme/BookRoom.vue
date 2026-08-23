<!-- BookRoom — the reading room's four instruments in one shell (lead 81b), each a pure categories/books import
     computed in the visitor's browser: READ a pasted passage (its fingerprint and ledger linkage), FIND its
     facts (the word-arithmetic ear, controls first, truth and falsehood wearing different verdicts), and TRY a
     quote (the citation trial; the quote leaves addressed either way). Nothing pasted leaves the page; nothing
     is fetched; every figure recomputes on any machine. -->
<script setup>
import { ref } from 'vue'
import { readPassage, findFacts, tryQuote } from '../../../src/quantum/apps/categories/books/index.js'

const passage = ref('A whole note equals two half notes. Two and two make four. 3 times 3 equals 9. Two and two make five. Music expresses what words cannot say.')
const reading = ref(null)
const finding = ref(null)
const doRead = () => { const r = readPassage(passage.value); reading.value = { address: r.audit.address ?? r.audit.receipt ?? '', chars: r.chars, linked: r.linkage.links?.length ?? r.linkage.linked ?? 0 } }
const doFind = () => { finding.value = findFacts(passage.value) }

const quote = ref('the round turns on seven, proven by theorem song_round_turns_on_seven')
const attribution = ref('')
const verdict = ref(null)
const doTry = () => { verdict.value = tryQuote(quote.value, attribution.value || undefined) }
</script>

<template>
  <div class="book-room">
    <h3>The passage</h3>
    <textarea v-model="passage" rows="4" style="width:100%"></textarea>
    <p>
      <button @click="doRead">read — identity &amp; linkage</button>
      <button @click="doFind">find the facts</button>
    </p>
    <p v-if="reading"><small>{{ reading.chars }} characters · identity <code>{{ reading.address }}</code> · ledger linkage {{ reading.linked }} — computed in your browser</small></p>
    <div v-if="finding">
      <p><small v-for="c in finding.controls" :key="c.name">{{ c.rejected ? '✓' : '✗' }} control «{{ c.name }}» {{ c.rejected ? 'rejected' : 'ACCEPTED — VOID' }}<br/></small></p>
      <p v-if="finding.instrumentValid"><strong>{{ finding.verified }} verified · {{ finding.refuted }} refuted</strong> · {{ finding.claims.length }} number-bearing claims surfaced unverdicted</p>
      <ul>
        <li v-for="f in finding.facts.slice(0, 10)" :key="f.text ?? f.statement">{{ f.verified ? '✓' : '✗' }} {{ f.text ?? f.statement }}</li>
      </ul>
    </div>

    <h3>The quote, on trial</h3>
    <input v-model="quote" style="width:100%" />
    <input v-model="attribution" style="width:100%" placeholder="attribution (optional — provenance, never verdicted)" />
    <button @click="doTry">try the quote</button>
    <div v-if="verdict && verdict.subject">
      <p><strong>{{ verdict.subject.verdict }}</strong> — {{ verdict.subject.note }}</p>
      <p><small>the quote's address: <code>{{ verdict.handle }}</code> · citable whatever the verdict — an open door is still a door</small></p>
    </div>
  </div>
</template>
