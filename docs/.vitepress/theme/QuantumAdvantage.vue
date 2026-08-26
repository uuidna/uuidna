<!-- QuantumAdvantage — page-level monitor (Layout doc-before). Delegates to QaMetrics variant=page.
     Theorem/publication pages pass address+handle from ledger / publications data. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as ledger } from '../ledger.data'
import { data as pubs } from '../publications.data'
import QaMetrics from './QaMetrics.vue'

const { params } = useData()

const byKey = new Map(ledger.theorems.map((t) => [t.key, t]))
const bySlug = new Map(pubs.cards.map((p) => [p.slug, p]))

const pageCtx = computed(() => {
  const p = params.value || {}
  const key = p.key || (p.kind === 'theorem' ? p.id : undefined)
  const slug = p.slug || (p.kind === 'publications' ? p.id : undefined)
  if (key) {
    const t = byKey.get(key)
    return {
      address: t?.address ?? '',
      handle: t?.address ? t.address.replace(/-/g, '').slice(0, 8) : '',
      label: t ? `theorem ${t.key}` : `theorem ${key}`,
    }
  }
  if (slug) {
    const pub = bySlug.get(slug)
    return {
      address: pub?.address ?? '',
      handle: pub?.receipt ? pub.receipt.replace(/-/g, '').slice(0, 8) : '',
      label: pub ? `publication ${pub.slug}` : `publication ${slug}`,
    }
  }
  return { address: '', handle: '', label: '' }
})
</script>

<template>
  <QaMetrics
    variant="page"
    :address="pageCtx.address"
    :handle="pageCtx.handle"
    :label="pageCtx.label"
  />
</template>
