<template>
  <div class="theorem-browser">
    <div class="browser-controls">
      <input
        v-model="search"
        type="text"
        placeholder="Search theorems by key or statement..."
        class="search-input"
      />
      <div class="filters">
        <label>
          <input v-model="showAura" type="checkbox" />
          Show auras
        </label>
        <label>
          <input v-model="showAddress" type="checkbox" />
          Show addresses
        </label>
      </div>
    </div>

    <div class="theorem-list">
      <div
        v-for="t in filtered"
        :key="t.address"
        class="theorem-card"
        :style="{ borderLeftColor: showAura ? t.aura.hsl : '#ccc' }"
      >
        <div class="theorem-header">
          <div class="theorem-key">{{ t.key }}</div>
          <div v-if="showAura" class="aura-badge" :style="{ backgroundColor: t.aura.hsl }">
            {{ t.aura.ray }}
          </div>
        </div>

        <div class="theorem-statement">{{ t.statement }}</div>

        <div v-if="showAddress" class="theorem-address">
          <code>{{ t.address }}</code>
        </div>
      </div>
    </div>

    <div class="browser-footer">
      Showing {{ filtered.length }} of {{ all.length }} theorems
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const search = ref('')
const showAura = ref(true)
const showAddress = ref(false)
const all = ref([])

onMounted(async () => {
  try {
    const { theorems, quantumAura } = await import('@uuidna/uuidna')
    const T = theorems()
    all.value = T.map(t => ({
      ...t,
      aura: quantumAura(t.address),
    }))
  } catch (e) {
    console.error('Failed to load theorems:', e)
  }
})

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return all.value.filter(t => t.key.toLowerCase().includes(q) || t.statement.toLowerCase().includes(q))
})
</script>

<style scoped>
.theorem-browser {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.browser-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input {
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 14px;
  font-family: monospace;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.filters {
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.theorem-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
}

.theorem-card {
  padding: 12px;
  border-left: 4px solid #ccc;
  background: var(--vp-c-bg);
  border-radius: 4px;
  transition: background 0.2s;
}

.theorem-card:hover {
  background: var(--vp-c-bg-alt);
}

.theorem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.theorem-key {
  font-family: monospace;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.aura-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.theorem-statement {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 8px;
}

.theorem-address {
  font-size: 12px;
  color: var(--vp-c-text-3);
  word-break: break-all;
}

.theorem-address code {
  background: var(--vp-c-bg-soft);
  padding: 2px 4px;
  border-radius: 2px;
  font-family: monospace;
}

.browser-footer {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
