<!-- ObjectBreadcrumbs — stock VitePress doc-before trail (Home → kind → id/handle).

     Documented pattern for VitePress 2: inject via Layout #doc-before (aside outline is not a trail).
     Links use VPLink; trail from object-graph (compose params) or path for nested docs.
     Does NOT duplicate ObjectCrosslinks related-object axes. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { objectBreadcrumbs, docsBreadcrumbs } from '../object-graph.js'

const { params, frontmatter, page } = useData()

const crumbs = computed(() => {
  const fm = frontmatter.value || {}
  if (fm.layout === 'home') return []
  if (Array.isArray(fm.breadcrumbs) && fm.breadcrumbs.length >= 2) return fm.breadcrumbs

  const p = params.value || {}
  const objectKind = fm.objectKind || p.objectKind
    || (p.kind === 'theorem' ? 'theorem' : p.kind === 'publications' ? 'publication' : undefined)
  const id = p.key || p.slug || (objectKind === 'theorem' || objectKind === 'axiom' ? p.id
    : objectKind === 'publication' ? p.id : undefined)
  const handle = fm.handle || p.handle
  if (objectKind || (p.kind && (p.key || p.slug || p.id))) {
    return objectBreadcrumbs({
      objectKind: objectKind || (p.kind === 'publications' ? 'publication' : p.kind),
      id: id || undefined,
      handle: handle || undefined,
    })
  }

  return docsBreadcrumbs(page.value?.relativePath, fm.title || page.value?.title)
})

const show = computed(() => crumbs.value.length >= 2)
</script>

<template>
  <nav v-if="show" class="ob" aria-label="Breadcrumb">
    <ol class="ob-list">
      <li v-for="(c, i) in crumbs" :key="i" class="ob-item">
        <VPLink v-if="c.link && i < crumbs.length - 1" class="ob-link" :href="c.link" no-icon>{{ c.text }}</VPLink>
        <span v-else class="ob-current" aria-current="page">
          {{ c.text }}
          <span v-if="c.handle" class="ob-handle" :title="'/' + c.handle">/{{ c.handle }}</span>
        </span>
        <span v-if="i < crumbs.length - 1" class="ob-sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.ob {
  margin: 0 0 0.75rem;
  max-width: 52rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
.ob-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem 0;
}
.ob-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.ob-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.ob-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
.ob-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
  word-break: break-word;
}
.ob-handle {
  margin-left: 0.35rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
  font-size: 0.75rem;
}
.ob-sep {
  color: var(--vp-c-text-3);
  opacity: 0.7;
  user-select: none;
}
</style>
