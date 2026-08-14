<script setup lang="ts">
import { ref, computed } from 'vue'
import { buildNewsPortal, type NewsArticle, type NewsPortal } from '../quantum-news-portal'
import { quantumAura } from '../aura'

interface DomainOption {
  value: 'politics' | 'medicine' | 'climate' | 'history' | 'economics'
  label: string
}

const domains: DomainOption[] = [
  { value: 'politics', label: 'Politics' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'climate', label: 'Climate' },
  { value: 'history', label: 'History' },
  { value: 'economics', label: 'Economics' }
]

const selectedDomain = ref<'politics' | 'medicine' | 'climate' | 'history' | 'economics'>('politics')
const articleTitle = ref('')
const articleBody = ref('')
const articles = ref<NewsArticle[]>([])
const portal = ref<NewsPortal | null>(null)

const statusColors = computed(() => ({
  provable: '#22c55e',
  open: '#f59e0b',
  overclaimed: '#ef4444',
  narrative_gap: '#8b5cf6'
}))

const statusLabels = {
  provable: 'Provable',
  open: 'Open',
  overclaimed: 'Overclaimed',
  narrative_gap: 'Narrative Gap'
}

const addArticle = () => {
  if (!articleTitle.value || !articleBody.value) {
    alert('Please enter article title and body')
    return
  }

  const newArticle: NewsArticle = {
    title: articleTitle.value,
    body: articleBody.value,
    source: 'manual-entry',
    domain: selectedDomain.value,
    date: new Date().toISOString().split('T')[0]
  }

  articles.value.push(newArticle)
  articleTitle.value = ''
  articleBody.value = ''
}

const auditArticles = () => {
  if (articles.value.length === 0) {
    alert('Please add at least one article')
    return
  }

  portal.value = buildNewsPortal(selectedDomain.value, articles.value)
}

const summary = computed(() => {
  if (!portal.value) return null
  return {
    provable: portal.value.judgments.filter(j => j.status === 'provable').length,
    open: portal.value.judgments.filter(j => j.status === 'open').length,
    overclaimed: portal.value.judgments.filter(j => j.status === 'overclaimed').length,
    narrative_gap: portal.value.judgments.filter(j => j.status === 'narrative_gap').length
  }
})

const getDomainLabel = (domain: string): string => {
  return domains.find(d => d.value === domain)?.label || domain
}

const getFactAura = (address: string) => {
  const aura = quantumAura(address)
  return {
    hsl: aura.hsl,
    rgb: aura.rgb
  }
}
</script>

<template>
  <div class="quantum-news-portal">
    <h1>⚛️ Quantum News Portal</h1>
    <p class="subtitle">Read articles on contested topics → extract decidable facts → audit through the sealed ledger</p>

    <!-- Domain selector -->
    <div class="section">
      <label for="domain">Select Domain:</label>
      <select v-model="selectedDomain" id="domain">
        <option v-for="d in domains" :key="d.value" :value="d.value">
          {{ d.label }}
        </option>
      </select>
    </div>

    <!-- Article input -->
    <div class="section">
      <h2>Add Article</h2>
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          v-model="articleTitle"
          id="title"
          type="text"
          placeholder="Article title"
        />
      </div>
      <div class="form-group">
        <label for="body">Body:</label>
        <textarea
          v-model="articleBody"
          id="body"
          placeholder="Article text (extract facts: dates like 2026-08-14, numbers like 42%, 25°C, etc.)"
          rows="6"
        />
      </div>
      <button @click="addArticle" class="btn-primary">Add Article</button>
    </div>

    <!-- Articles list -->
    <div v-if="articles.length > 0" class="section">
      <h2>Articles Added ({{ articles.length }})</h2>
      <div class="articles-list">
        <div v-for="(article, idx) in articles" :key="idx" class="article-card">
          <h3>{{ article.title }}</h3>
          <p class="meta">{{ article.date }} · {{ getDomainLabel(article.domain) }}</p>
          <p class="body">{{ article.body.substring(0, 200) }}{{ article.body.length > 200 ? '...' : '' }}</p>
        </div>
      </div>
      <button @click="auditArticles" class="btn-audit">🔍 Audit Articles</button>
    </div>

    <!-- Portal results -->
    <div v-if="portal && summary" class="section portal-results">
      <h2>📊 Audit Results</h2>

      <div class="summary-grid">
        <div class="summary-card provable">
          <div class="count">{{ summary.provable }}</div>
          <div class="label">Provable</div>
          <div class="description">Matches sealed theorems</div>
        </div>
        <div class="summary-card open">
          <div class="count">{{ summary.open }}</div>
          <div class="label">Open</div>
          <div class="description">Unverified but real</div>
        </div>
        <div class="summary-card overclaimed">
          <div class="count">{{ summary.overclaimed }}</div>
          <div class="label">Overclaimed</div>
          <div class="description">Contradicts ledger</div>
        </div>
        <div class="summary-card narrative-gap">
          <div class="count">{{ summary.narrative_gap }}</div>
          <div class="label">Narrative Gap</div>
          <div class="description">Court decision needed</div>
        </div>
      </div>

      <div class="receipt">
        <p><strong>Receipt:</strong> {{ portal.receipt }}</p>
      </div>

      <!-- Detailed judgments -->
      <div class="judgments">
        <h3>Extracted Facts</h3>
        <div class="judgment-list">
          <div v-for="(judgment, idx) in portal.judgments" :key="idx" class="judgment-item" :class="judgment.status">
            <div class="fact-header">
              <span class="badge" :style="{ backgroundColor: statusColors[judgment.status] }">
                {{ statusLabels[judgment.status] }}
              </span>
              <span class="text">{{ judgment.fact.text }}</span>
            </div>
            <div class="fact-meta">
              <span v-if="judgment.linkedTheorem" class="theorem-link">
                ↗ Sealed: {{ judgment.linkedTheorem.substring(0, 12) }}...
              </span>
              <span class="fraud-score" v-if="judgment.fraudScore > 0">
                ⚠️ Fraud score: {{ (judgment.fraudScore * 100).toFixed(0) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!portal && articles.length === 0" class="empty-state">
      <p>Add articles to get started. The portal will extract facts, audit them against the sealed ledger, and categorize them.</p>
    </div>
  </div>
</template>

<style scoped>
.quantum-news-portal {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.section {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-audit {
  background: #10b981;
  color: white;
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
}

.btn-audit:hover {
  background: #059669;
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.article-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  transition: box-shadow 0.2s;
}

.article-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.article-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.article-card .meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.article-card .body {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-card.provable {
  background: linear-gradient(135deg, #10b981, #059669);
}

.summary-card.open {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.summary-card.overclaimed {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.summary-card.narrative-gap {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.summary-card .count {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.summary-card .label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.summary-card .description {
  font-size: 0.875rem;
  opacity: 0.9;
}

.receipt {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
  word-break: break-all;
}

.receipt p {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.judgments {
  margin-top: 2rem;
}

.judgments h3 {
  margin-bottom: 1rem;
}

.judgment-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.judgment-item {
  background: white;
  border-left: 4px solid #d1d5db;
  padding: 1rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.judgment-item.provable {
  border-left-color: #10b981;
  background: #f0fdf4;
}

.judgment-item.open {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.judgment-item.overclaimed {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.judgment-item.narrative-gap {
  border-left-color: #8b5cf6;
  background: #faf5ff;
}

.fact-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.fact-header .text {
  font-weight: 500;
  color: #1f2937;
  flex: 1;
  word-break: break-word;
}

.fact-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.theorem-link {
  color: #3b82f6;
  text-decoration: none;
}

.fraud-score {
  color: #ef4444;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}
</style>
