// object-graph — related-object crosslinks for every sealed theorem / publication.
//
// Used by compose-object (stock VPDocFooter prev/next in params) and ObjectCrosslinks
// (client recomputes the full graph from ledger.data + legs). One law: axes are DERIVED
// from the ledger order, never authored. No capacity/OS QA cards; no YAML bag in content.
//
// Axes:
//   skill · principle · sequence (linear neighbours)
//   rotation: discovery(+1) · rosette(+7) · vortex(+9) · reflect (ℤ/N involution)
//   legs: proof · symbol · witness · falsifier · address · axiom-free (rosetta census)
// Related:
//   keywords (skill/principle or publication metadata)
//   monograph · sibling publications · theorem↔publication cross-kind
//   prior art (publication seals) · unlock board · automation waves

/** Short plain title for VPDocFooter / VPLink labels (no markdown). */
export function shortTitle(t) {
  const head = String(t.name || t.title || t.key || t.slug || '').split('—')[0].trim() || t.key || t.slug || ''
  return head.length <= 64 ? head : head.slice(0, 61) + '…'
}

/** linkRef(t) → { key, title, link } for a theorem. */
export function theoremRef(t) {
  if (!t) return null
  return { key: t.key, title: shortTitle(t), link: `/theorem/${t.key}` }
}

/** linkRef for a domain publication note. */
export function publicationRef(p) {
  if (!p) return null
  return { key: p.slug, title: shortTitle(p), link: `/publications/${p.slug}` }
}

/** linkRef for a Zenodo seal surface (article / software archive). */
export function sealRef(seal) {
  if (!seal) return null
  const link = String(seal.pageUrl || '').replace(/^https:\/\/uuidna\.com/, '') || '/'
  return { key: seal.id, title: shortTitle({ title: seal.title, slug: seal.id }), link }
}

/** Deduplicate { key, … } refs by key. */
export function dedupeRefs(list) {
  const seen = new Set()
  const out = []
  for (const r of list) {
    if (!r?.key || seen.has(r.key)) continue
    seen.add(r.key)
    out.push(r)
  }
  return out
}

/** Build theorem↔publication lookup maps from publishable domain notes. */
export function buildRelatedMaps(pubs) {
  const byFile = new Map()
  const byTheorem = new Map()
  for (const p of pubs) {
    if (p.publishable === false) continue
    byFile.set(p.file, p)
    for (const key of p.theorems || []) {
      if (!byTheorem.has(key)) byTheorem.set(key, [])
      byTheorem.get(key).push(p)
    }
  }
  return { byFile, byTheorem }
}

/** Sealed skill + principle keywords for a theorem (same source as quantumSeo). */
export function theoremKeywords(t) {
  return [t.skill, t.principle].filter(Boolean)
}

/** Position helper: [prev, next] on a list by key. */
export function axisPair(list, key) {
  const i = list.findIndex((t) => t.key === key)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? theoremRef(list[i - 1]) : null,
    next: i < list.length - 1 ? theoremRef(list[i + 1]) : null,
  }
}

/** Cyclic neighbour at +stride (wrapping). */
export function rotRef(all, key, stride) {
  const n = all.length
  if (!n) return null
  const i = all.findIndex((t) => t.key === key)
  if (i < 0) return null
  return theoremRef(all[((i + stride) % n + n) % n])
}

/** Reflect through ledger centre (self-inverse). */
export function reflectRef(all, key) {
  const n = all.length
  if (!n) return null
  const i = all.findIndex((t) => t.key === key)
  if (i < 0) return null
  return theoremRef(all[n - 1 - i])
}

/**
 * theoremGraph(t, all, bySkill, byPrin, legsRow, axiomHolds, relatedMaps?)
 * → full related-object graph for ObjectCrosslinks + stock pager fields.
 */
export function theoremGraph(t, all, bySkill, byPrin, legsRow, axiomHolds, relatedMaps) {
  const skillList = bySkill.get(t.skill) || []
  const prinList = byPrin.get(t.principle) || []
  const legs = legsRow?.legs || []
  const missing = legsRow?.missing || ['symbol', 'proof', 'witness', 'falsifier', 'address']
  const sequence = axisPair(all, t.key)
  const monographPub = relatedMaps?.byFile?.get(t.file)
  const monograph = monographPub ? publicationRef(monographPub) : null
  const relatedPublications = dedupeRefs([
    ...(monograph ? [monograph] : []),
    ...((relatedMaps?.byTheorem?.get(t.key) || []).map(publicationRef)),
  ])
  return {
    objectKind: 'theorem',
    skill: { name: t.skill, count: skillList.length, ...axisPair(skillList, t.key) },
    principle: { name: t.principle, count: prinList.length, ...axisPair(prinList, t.key) },
    sequence,
    rotation: {
      discovery: rotRef(all, t.key, 1),
      rosette: rotRef(all, t.key, 7),
      vortex: rotRef(all, t.key, 9),
      reflect: reflectRef(all, t.key),
    },
    legs,
    missing,
    claimedBy: legsRow?.claimedBy || 'captain',
    axiomHolds: !!axiomHolds,
    file: t.file,
    address: t.address,
    handle: t.address.replace(/-/g, '').slice(0, 8),
    keywords: theoremKeywords(t),
    monograph,
    relatedPublications,
    unlocks: { link: '/unlocks', text: 'Unlock board' },
    waves: { link: '/waves', text: 'Automation waves' },
    doctrine: { link: '/doctrine#world-solutions--waves-of-automation', text: 'World waves · doctrine' },
    // Stock VitePress docFooter (prev/next) — sequence axis; themeConfig sidebar cannot list 2k theorems.
    prev: sequence.prev ? { text: sequence.prev.title, link: sequence.prev.link } : false,
    next: sequence.next ? { text: sequence.next.title, link: sequence.next.link } : false,
  }
}

/** Cap theorem sample list for publication crosslinks (body lists all). */
const THEOREM_SAMPLE = 8

/**
 * publicationGraph(p, pubs, byKey?, rich?, seals?)
 * → sibling publications, related theorems, prior art, keywords.
 */
export function publicationGraph(p, pubs, byKey, rich, seals) {
  const list = pubs.filter((x) => x.publishable !== false)
  const i = list.findIndex((x) => x.slug === p.slug)
  const ref = (x) => (x ? { key: x.slug, title: x.title, link: `/publications/${x.slug}` } : null)
  const prev = i > 0 ? ref(list[i - 1]) : null
  const next = i >= 0 && i < list.length - 1 ? ref(list[i + 1]) : null
  const handle = (p.address || p.receipt || '').replace(/-/g, '').slice(0, 8)
  const keys = p.theorems || []
  const relatedTheorems = dedupeRefs(
    keys.slice(0, THEOREM_SAMPLE).map((key) => {
      const t = byKey?.get(key)
      return t ? theoremRef(t) : { key, title: key, link: `/theorem/${key}` }
    }),
  )
  const relatedPublications = dedupeRefs(
    list.filter((x) => x.slug !== p.slug).map((x) => ref(x)),
  )
  const priorArt = rich?.priorArt
    ? {
        outcome: rich.priorArt.outcome,
        claim: rich.priorArt.claim,
        priors: rich.priorArt.priors.map((x) => ({ who: x.who, link: x.link })),
      }
    : null
  return {
    objectKind: 'publication',
    sequence: { prev, next },
    handle,
    address: p.address || p.receipt || '',
    file: p.file || '',
    keywords: rich?.keywords ? [...rich.keywords].slice(0, 12) : [],
    relatedTheorems,
    relatedTheoremCount: keys.length || p.count || 0,
    relatedPublications,
    priorArt,
    seals: dedupeRefs((seals || []).map(sealRef)),
    unlocks: { link: '/unlocks', text: 'Unlock board' },
    waves: { link: '/waves', text: 'Automation waves' },
    prev: prev ? { text: prev.title, link: prev.link } : false,
    next: next ? { text: next.title, link: next.link } : false,
  }
}

/** Section root for an object kind — Home → kind → id/handle (not the full related graph). */
export const OBJECT_KIND_ROOT = Object.freeze({
  theorem: { text: 'Theorems', link: '/theorems' },
  publication: { text: 'Publications', link: '/publications' },
  axiom: { text: 'Axioms', link: '/tests' },
  chunk: { text: 'Chunks', link: '/theorems' },
  sequence: { text: 'Sequence', link: '/articles/sequence' },
  ve: { text: 'Vector equilibrium', link: '/articles/vector-equilibrium' },
})

/** Nested static-doc section roots (path segment → crumb). */
export const DOC_SECTION_ROOT = Object.freeze({
  articles: { text: 'Articles', link: '/articles' },
  publications: { text: 'Publications', link: '/publications' },
  theorem: { text: 'Theorems', link: '/theorems' },
})

/**
 * objectBreadcrumbs({ objectKind, id, handle }) → [{ text, link? }, …]
 * Trail: Home → kind section → id (or handle when id absent). Does NOT embed skill/principle/rotation.
 */
export function objectBreadcrumbs({ objectKind, id, handle } = {}) {
  const home = { text: 'Home', link: '/' }
  const kind = String(objectKind || '')
  const section = OBJECT_KIND_ROOT[kind]
  const leafText = String(id || handle || '').trim()
  if (!leafText) return section ? [home, { ...section }] : []
  const leaf = handle && id && handle !== id
    ? { text: leafText, handle: String(handle) }
    : { text: leafText }
  if (!section) return [home, leaf]
  return [home, { ...section }, leaf]
}

/**
 * docsBreadcrumbs(relativePath, title?) → path crumbs for nested docs (and Home → page for top-level).
 * Skips home (index) and dynamic [kind]/[id] templates (those use objectBreadcrumbs).
 */
export function docsBreadcrumbs(relativePath, title) {
  const rel = String(relativePath || '').replace(/\\/g, '/')
  if (!rel || rel.includes('[')) return []
  let route = rel.replace(/\.md$/, '').replace(/\/index$/, '').replace(/^index$/, '')
  if (!route) return []
  const home = { text: 'Home', link: '/' }
  const parts = route.split('/').filter(Boolean)
  if (parts.length === 1) {
    const text = (title && String(title).trim()) || parts[0]
    return [home, { text }]
  }
  const section = DOC_SECTION_ROOT[parts[0]]
  const leaf = (title && String(title).trim()) || parts[parts.length - 1]
  if (section) return [home, { ...section }, { text: leaf }]
  // Unknown nesting: Home → each segment (last current).
  const crumbs = [home]
  let acc = ''
  for (let i = 0; i < parts.length; i++) {
    acc += '/' + parts[i]
    if (i < parts.length - 1) crumbs.push({ text: parts[i], link: acc })
    else crumbs.push({ text: leaf })
  }
  return crumbs
}
