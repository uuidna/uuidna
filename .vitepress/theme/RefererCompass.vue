<!-- Referer-aware cross-link. A static site has no server Referer header, so "where you came from" is tracked
     client-side: each theorem page records itself in sessionStorage on mount, and the next page reads it back as
     its referer. If you arrived here from another theorem, this shows the way back and names the axis you shared
     (skill / principle) — the cross-linking made contextual to your path. Renders nothing on a fresh entry. -->
<script setup>
import { ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { params } = useData()
const from = ref(null)

onMounted(() => {
  const cur = params.value || {}
  if (!cur.key) return
  try {
    const prev = JSON.parse(sessionStorage.getItem('uuidna:ref') || 'null')
    if (prev && prev.key && prev.key !== cur.key) {
      const shared = []
      if (prev.skill && prev.skill === cur.skill) shared.push('skill ' + cur.skill)
      if (prev.principle && prev.principle === cur.principle) shared.push('principle ' + cur.principle)
      from.value = { key: prev.key, name: prev.name, shared }
    }
    sessionStorage.setItem('uuidna:ref', JSON.stringify({ key: cur.key, name: cur.name, skill: cur.skill, principle: cur.principle }))
  } catch { /* no sessionStorage (private mode / SSR) — degrade to nothing */ }
})
</script>

<template>
  <div v-if="from" class="referer-compass">
    You arrived from <a :href="withBase(`/theorem/${from.key}`)">{{ from.name }}</a><span v-if="from.shared.length"> · shared {{ from.shared.join(' · ') }}</span>.
  </div>
</template>
