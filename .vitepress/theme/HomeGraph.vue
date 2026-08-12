<!-- HomeGraph — the homepage AS a graph. Every computing principle is a DOMAIN card; every card is a horizontal
     slider of its top theorems (the articles), and links its monograph (the audited /publications note that reads
     that domain's proofs). A hero strip slides through all domains. Nothing hand-placed: the cards, their order and
     their colours all COMPUTE from the ledger and the ℤ/9 sequence palette (--seq-*), so adding a domain adds a card.
     Honest: this is a VIEW of the sealed ledger — the counts and links recompute; it makes no claim the proofs don't. -->
<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({ groups: Array, skills: Array })

// The monograph slug for a domain — derived from its lean file exactly as publish.ts slugOf does, so the card links
// the same /publications/<slug> the build generated. Falls back to null if a domain has no file (defensive).
const slugOf = (file) => file ? file.replace(/\.lean$/i, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : null

// Domains, biggest first — each with its monograph slug and its top theorems (the slider's articles).
const domains = computed(() => (props.groups || []).map((g) => ({
  name: g.name,
  count: g.count,
  blurb: g.blurb,
  fold: g.fold,
  slug: slugOf(g.theorems?.[0]?.file),
  top: (g.theorems || []),
})).sort((a, b) => b.count - a.count))

// A stable hue per card from its fold address — the vortex colour, computed, nothing fetched (mirrors render.ts).
const hueOf = (addr) => (parseInt((addr || '0').replace(/[^0-9a-f]/gi, '').slice(0, 2) || '0', 16) * 40) % 360
</script>

<template>
  <div class="hg">
    <!-- the hero strip — a slider of ALL domains, scroll-snapped -->
    <div class="hg-hero" role="list" aria-label="All domains">
      <a v-for="d in domains" :key="'h-' + d.name" class="hg-hero-chip" role="listitem"
         :href="d.slug ? withBase('/publications/' + d.slug) : withBase('/theorems')"
         :style="{ '--h': hueOf(d.fold) }">
        <span class="hg-hero-n">{{ d.count }}</span>
        <span class="hg-hero-t">{{ d.name.replace(/^The /, '') }}</span>
      </a>
    </div>

    <h2 class="hg-h">Domains <small>— {{ domains.length }} principles, each a monograph over its proofs</small></h2>
    <p class="hg-sub">Every card is a domain. Slide it to read its theorems; open its monograph to read the audited note that folds them.</p>

    <section v-for="d in domains" :key="d.name" class="hg-card" :style="{ '--h': hueOf(d.fold) }">
      <header class="hg-card-head">
        <h3>
          <a v-if="d.slug" :href="withBase('/publications/' + d.slug)">{{ d.name }}</a>
          <span v-else>{{ d.name }}</span>
          <span class="hg-badge">{{ d.count }}</span>
        </h3>
        <a v-if="d.slug" class="hg-mono" :href="withBase('/publications/' + d.slug)">monograph →</a>
      </header>
      <p class="hg-blurb">{{ d.blurb }}</p>
      <!-- the slider — the domain's articles (theorems), scrolling horizontally -->
      <div class="hg-slider" role="list" :aria-label="d.name + ' theorems'">
        <a v-for="t in d.top" :key="t.key" class="hg-item" role="listitem" :href="withBase('/theorem/' + t.key)">
          <span class="hg-item-t">{{ t.name.split('—')[0].split(':')[0].trim() }}</span>
          <code class="hg-item-s">{{ t.statement }}</code>
        </a>
      </div>
      <p class="hg-fold">layer fold <code>{{ d.fold }}</code></p>
    </section>
  </div>
</template>

<style scoped>
.hg { margin: 2rem 0 1rem; }
.hg-h { border: none; margin: 2.4rem 0 .2rem; font-size: 1.5rem; }
.hg-h small { color: var(--vp-c-text-3); font-weight: 400; font-size: .9rem; }
.hg-sub { color: var(--vp-c-text-2); margin: 0 0 1rem; }

/* the hero strip — all domains, scroll-snap */
.hg-hero { display: flex; gap: .5rem; overflow-x: auto; padding: .3rem 0 .8rem; scroll-snap-type: x proximity; scrollbar-width: thin; }
.hg-hero-chip { scroll-snap-align: start; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-width: 96px; padding: .6rem .8rem; border-radius: 12px; text-decoration: none;
  background: hsl(var(--h, 200) 60% 50% / .1); border: 1px solid hsl(var(--h, 200) 60% 50% / .3); color: var(--vp-c-text-1); transition: transform .15s; }
.hg-hero-chip:hover { transform: translateY(-2px); }
.hg-hero-n { font-size: 1.3rem; font-weight: 700; color: hsl(var(--h, 200) 60% 45%); }
.hg-hero-t { font-size: .74rem; text-align: center; line-height: 1.2; }

/* a domain card */
.hg-card { border: 1px solid var(--vp-c-divider); border-left: 4px solid hsl(var(--h, 200) 60% 50%);
  border-radius: 12px; padding: .9rem 1rem; margin: .8rem 0; background: hsl(var(--h, 200) 60% 50% / .04); }
.hg-card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.hg-card-head h3 { margin: 0; border: none; font-size: 1.1rem; }
.hg-badge { display: inline-block; margin-left: .5rem; font-size: .72rem; padding: .05rem .45rem; border-radius: 999px;
  background: hsl(var(--h, 200) 60% 50% / .18); color: hsl(var(--h, 200) 60% 40%); vertical-align: middle; }
.hg-mono { font-size: .82rem; white-space: nowrap; }
.hg-blurb { color: var(--vp-c-text-2); font-size: .86rem; margin: .3rem 0 .6rem; }

/* the horizontal slider of articles */
.hg-slider { display: flex; gap: .5rem; overflow-x: auto; padding-bottom: .5rem; scroll-snap-type: x proximity; scrollbar-width: thin; }
.hg-item { scroll-snap-align: start; flex: 0 0 240px; display: flex; flex-direction: column; gap: .3rem;
  padding: .55rem .7rem; border-radius: 9px; text-decoration: none; color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); transition: border-color .15s, transform .15s; }
.hg-item:hover { transform: translateY(-2px); border-color: hsl(var(--h, 200) 60% 50%); }
.hg-item-t { font-weight: 600; font-size: .82rem; line-height: 1.25; }
.hg-item-s { font-size: .7rem; color: var(--vp-c-text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hg-fold { margin: .3rem 0 0; font-size: .72rem; color: var(--vp-c-text-3); }
.hg-fold code, .hg-item-s { font-family: var(--vp-font-family-mono); }
</style>
