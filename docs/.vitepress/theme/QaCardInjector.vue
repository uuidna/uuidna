<!-- QaCardInjector — mounts QaMetrics (variant=card) into EVERY card surface on the page.

     Targets: .VPFeature (home features), .uuidna-card (render.ts), .hg-card / .hg-item (HomeGraph),
     .ledger-home .card (HomeLedger), .tlist > li (theorems), .publist > li (publications), .sponsor-card.

     Re-runs on route change. Marks hosts with data-qa-metrics so SPA remounts do not duplicate. -->
<script setup>
import { createApp, h, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import QaMetrics from './QaMetrics.vue'
import { data as ledger } from '../ledger.data'
import { data as pubs } from '../publications.data'

const SELECTORS = [
  '.VPFeature',
  '.uuidna-card',
  '.hg-card',
  '.hg-item',
  '.ledger-home .card',
  '.tlist > li',
  '.publist > li',
  '.sponsor-card',
].join(', ')

const MARK = 'data-qa-metrics'
const route = useRoute()
const apps = []

const byKey = new Map(ledger.theorems.map((t) => [t.key, t]))
const bySlug = new Map(pubs.cards.map((p) => [p.slug, p]))

function ctxFromEl(el) {
  // theorem / publication links inside the card
  const a = el.querySelector('a[href*="/theorem/"], a[href*="/publications/"]')
    || (el.matches('a[href*="/theorem/"], a[href*="/publications/"]') ? el : null)
  const href = a?.getAttribute('href') || ''
  const th = href.match(/\/theorem\/([^/#?]+)/)
  if (th) {
    const t = byKey.get(th[1])
    return {
      address: t?.address ?? '',
      handle: t?.address ? t.address.replace(/-/g, '').slice(0, 8) : '',
      label: th[1],
    }
  }
  const pub = href.match(/\/publications\/([^/#?]+)/)
  if (pub) {
    const p = bySlug.get(pub[1])
    return {
      address: p?.address ?? '',
      handle: p?.receipt ? p.receipt.replace(/-/g, '').slice(0, 8) : '',
      label: pub[1],
    }
  }
  // uuidna-card carries data-proof and meta identifier
  const meta = el.querySelector('meta[itemprop="identifier"]')
  const addr = meta?.getAttribute('content') || ''
  if (addr) {
    return { address: addr, handle: addr.replace(/-/g, '').slice(0, 8), label: '' }
  }
  const title = el.querySelector('h2, h3, .title, .name')?.textContent?.trim() || ''
  return { address: '', handle: '', label: title.slice(0, 48) }
}

function teardown() {
  while (apps.length) {
    const app = apps.pop()
    try { app.unmount() } catch { /* already gone */ }
  }
  document.querySelectorAll(`[${MARK}]`).forEach((el) => {
    el.removeAttribute(MARK)
    el.querySelectorAll('.qa-card-host').forEach((n) => n.remove())
  })
}

function inject() {
  teardown()
  document.querySelectorAll(SELECTORS).forEach((el) => {
    if (el.getAttribute(MARK)) return
    // skip if card already has static qa-card-metrics from render.ts (avoid double)
    if (el.querySelector('.qa-card-metrics, .qa-metrics')) {
      el.setAttribute(MARK, 'static')
      return
    }
    el.setAttribute(MARK, '1')
    const host = document.createElement('div')
    host.className = 'qa-card-host'
    el.appendChild(host)
    const ctx = ctxFromEl(el)
    const app = createApp({
      render: () => h(QaMetrics, {
        variant: 'card',
        address: ctx.address,
        handle: ctx.handle,
        label: ctx.label,
      }),
    })
    app.mount(host)
    apps.push(app)
  })
}

onMounted(() => { nextTick(inject) })
watch(() => route.path, () => { nextTick(() => { setTimeout(inject, 30) }) })
onBeforeUnmount(teardown)
</script>

<template>
  <!-- injector only — no visible root chrome -->
  <span class="qa-injector" aria-hidden="true" hidden></span>
</template>
