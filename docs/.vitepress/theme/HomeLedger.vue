<script setup lang="ts">
// HomeLedger — the home page's whole body, rendered from home.data.ts and from nothing else.
//
// There is deliberately no `props` and no slot: a caller cannot pass text in. The only way a sentence reaches this
// component is by being computed in the loader, and the only way it gets computed is by being in the ledger. That
// is the frame — the markdown file that mounts this holds no prose because there is no longer a place to put any.
import { data } from '../home.data'

const short = (u: string): string => u.slice(0, 8)
</script>

<template>
  <div class="ledger-home">
    <!-- THE HEADLINE. The same derivation README.md's H1 uses: distinct Lean statements beside the key count,
         because a theorem is its Lean and not its name, and the two numbers differ. -->
    <header class="hero">
      <h1>uuidna</h1>
      <p class="count">
        <strong>{{ data.distinct }}</strong> distinct theorems under
        <strong>{{ data.keys }}</strong> keys ·
        <strong>{{ data.coins }}</strong> coins · one receipt
      </p>
      <code class="receipt">{{ data.receipt }}</code>
      <p class="actions">
        <a class="btn brand" href="/theorems">Browse the theorems</a>
        <a class="btn alt" href="/school">Enrol</a>
      </p>
    </header>

    <!-- THE CLUSTERS. Each is a .lean file; the count, the fold and the monograph all come with it. The blurb is
         the principle's own, already in the ledger — not a feature card written about it afterwards. -->
    <h2 id="clusters">The clusters</h2>
    <div class="cards">
      <article v-for="c in data.clusters" :key="c.name" class="card">
        <h3>
          <a v-if="c.monograph" :href="c.monograph">{{ c.name }}</a>
          <span v-else>{{ c.name }}</span>
        </h3>
        <p class="blurb">{{ c.blurb }}</p>
        <p class="meta">{{ c.count }} sealed · <code>{{ short(c.fold) }}</code></p>
      </article>
    </div>

    <!-- THE RANKING. Measured kernel decide-steps, descending. This is the one ordering of the ledger that is not
         an editorial choice, which is why the Clay row below it can be read as evidence rather than as a position. -->
    <h2 id="costliest">The ledger by measured cost</h2>
    <p class="note">
      Kernel decide-steps, {{ data.measured }} of {{ data.keys }} measured. Median {{ data.medianCost }}.
    </p>
    <table class="rank">
      <thead><tr><th>#</th><th>theorem</th><th>cluster</th><th class="n">steps</th></tr></thead>
      <tbody>
        <tr v-for="t in data.costliest" :key="t.key">
          <td class="n">{{ t.rank }}</td>
          <td><a :href="`/theorem/${t.key}`"><code>{{ t.key }}</code></a></td>
          <td class="dim">{{ t.principle }}</td>
          <td class="n">{{ t.cost }}</td>
        </tr>
      </tbody>
    </table>

    <h2 id="clay">Where the Clay problems land</h2>
    <table class="rank">
      <thead><tr><th>#</th><th>theorem</th><th class="n">steps</th></tr></thead>
      <tbody>
        <tr v-for="t in data.clay" :key="t.key">
          <td class="n">{{ t.rank }}</td>
          <td><a :href="`/theorem/${t.key}`"><code>{{ t.key }}</code></a></td>
          <td class="n">{{ t.cost }}</td>
        </tr>
      </tbody>
    </table>

    <!-- THE MAP. computeSidebar() walks the real docs/ tree, so a page that exists is listed and a page that is
         deleted stops being listed. The table this replaced was typed, and a typed map can only ever be the one
         that is wrong. -->
    <h2 id="map">Every page — {{ data.pages }}, computed from the tree</h2>
    <div class="cards">
      <article v-for="g in data.map" :key="g.text" class="card">
        <h3>{{ g.text }}</h3>
        <p class="links">
          <a v-for="it in g.items" :key="it.link" :href="it.link">{{ it.text }}</a>
        </p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.ledger-home { max-width: 68rem; margin: 0 auto; }
.hero { padding: 3rem 0 2rem; text-align: center; border-bottom: 1px solid var(--vp-c-divider); }
.hero h1 {
  font-size: 3.2rem; line-height: 1.1; margin: 0; border: 0;
  background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.count { font-size: 1.15rem; margin: .6rem 0; color: var(--vp-c-text-1); }
.receipt { font-size: .8rem; color: var(--vp-c-text-2); word-break: break-all; }
.actions { margin-top: 1.4rem; display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }
.btn { border-radius: 20px; padding: .5rem 1.2rem; font-weight: 600; text-decoration: none; font-size: .9rem; }
.btn.brand { background: var(--vp-c-brand-1); color: var(--vp-c-white); }
.btn.alt { background: var(--vp-c-default-soft); color: var(--vp-c-text-1); }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); margin: 1rem 0 2rem; }
.card { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 .4rem; font-size: 1rem; border: 0; }
.blurb { font-size: .85rem; color: var(--vp-c-text-2); margin: 0 0 .5rem; }
.meta { font-size: .8rem; color: var(--vp-c-text-3); margin: 0; }
.links { display: flex; flex-wrap: wrap; gap: .35rem .7rem; margin: 0; font-size: .85rem; }
.note { font-size: .85rem; color: var(--vp-c-text-2); }
.rank { width: 100%; display: table; margin: 0 0 2rem; }
.rank .n { text-align: right; font-variant-numeric: tabular-nums; }
.rank .dim { color: var(--vp-c-text-3); font-size: .85rem; }
</style>
