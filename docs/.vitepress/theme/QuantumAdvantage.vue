<!-- QuantumAdvantage — page-level monitor (Layout doc-before). Delegates to QaMetrics variant=page.
     Theorem/publication pages pass address+handle+heartbeats from params / ledger / publications data.
     Metrics are PAGE-LOCAL via pageAdvantageMetrics; global capacity is context only. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as ledger } from '../ledger.data'
import { data as pubs } from '../publications.data'
import { data as advantage } from '../advantage.data'
import QaMetrics from './QaMetrics.vue'

const { params, frontmatter } = useData()

const byKey = new Map(ledger.theorems.map((t) => [t.key, t]))
const bySlug = new Map(pubs.cards.map((p) => [p.slug, p]))

const pageCtx = computed(() => {
  const p = params.value || {}
  const fm = frontmatter.value || {}
  const key = p.key || (p.kind === 'theorem' ? p.id : undefined)
  const slug = p.slug || (p.kind === 'publications' ? p.id : undefined)
  const locale = (Array.isArray(p.locales) && p.locales[0]) || fm.locale || 'en'

  if (key) {
    const t = byKey.get(key)
    const address = t?.address ?? p.address ?? ''
    const heartbeats = p.heartbeats != null && p.heartbeats > 0
      ? p.heartbeats
      : (address && advantage.heartbeats[address]) || null
    return {
      address,
      handle: p.handle || (address ? address.replace(/-/g, '').slice(0, 8) : ''),
      label: t ? `theorem ${t.key}` : `theorem ${key}`,
      keyName: key,
      slug: '',
      objectKind: p.objectKind || 'theorem',
      depositReferrer: p.depositReferrer || p.handleUrl || fm.depositReferrer || '',
      locale,
      heartbeats,
      sealCount: null,
    }
  }
  if (slug) {
    const pub = bySlug.get(slug)
    return {
      address: pub?.address ?? p.address ?? '',
      handle: p.handle || (pub?.receipt ? pub.receipt.replace(/-/g, '').slice(0, 8) : ''),
      label: pub ? `publication ${pub.slug}` : `publication ${slug}`,
      keyName: '',
      slug,
      objectKind: p.objectKind || 'publication',
      depositReferrer: p.depositReferrer || p.handleUrl || fm.depositReferrer || '',
      locale,
      heartbeats: null,
      sealCount: p.sealCount ?? pub?.count ?? null,
    }
  }
  const addr = p.address || fm.seoAddress || ''
  return {
    address: addr,
    handle: p.handle || fm.handle || (addr ? String(addr).replace(/-/g, '').slice(0, 8) : ''),
    label: p.name || fm.title || '',
    keyName: '',
    slug: '',
    objectKind: p.objectKind || fm.objectKind || 'page',
    depositReferrer: p.depositReferrer || fm.depositReferrer || fm.handleUrl || '',
    locale,
    heartbeats: null,
    sealCount: null,
  }
})
</script>

<template>
  <QaMetrics
    variant="page"
    :address="pageCtx.address"
    :handle="pageCtx.handle"
    :label="pageCtx.label"
    :key-name="pageCtx.keyName"
    :slug="pageCtx.slug"
    :object-kind="pageCtx.objectKind"
    :deposit-referrer="pageCtx.depositReferrer"
    :locale="pageCtx.locale"
    :heartbeats="pageCtx.heartbeats"
    :seal-count="pageCtx.sealCount"
  />
</template>
