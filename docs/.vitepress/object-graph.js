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

/** Short plain title for VPDocFooter / VPLink labels (no markdown). */
export function shortTitle(t) {
  const head = String(t.name || t.key || t.slug || '').split('—')[0].trim() || t.key || t.slug || ''
  return head.length <= 64 ? head : head.slice(0, 61) + '…'
}

/** linkRef(t) → { key, title, link } for a theorem. */
export function theoremRef(t) {
  if (!t) return null
  return { key: t.key, title: shortTitle(t), link: `/theorem/${t.key}` }
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
 * theoremGraph(t, all, bySkill, byPrin, legsRow, axiomHolds)
 * → full related-object graph for ObjectCrosslinks + stock pager fields.
 */
export function theoremGraph(t, all, bySkill, byPrin, legsRow, axiomHolds) {
  const skillList = bySkill.get(t.skill) || []
  const prinList = byPrin.get(t.principle) || []
  const legs = legsRow?.legs || []
  const missing = legsRow?.missing || ['symbol', 'proof', 'witness', 'falsifier', 'address']
  const sequence = axisPair(all, t.key)
  return {
    objectKind: 'theorem',
    skill: { name: t.skill, ...axisPair(skillList, t.key) },
    principle: { name: t.principle, ...axisPair(prinList, t.key) },
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
    // Stock VitePress docFooter (prev/next) — sequence axis; themeConfig sidebar cannot list 2k theorems.
    prev: sequence.prev ? { text: sequence.prev.title, link: sequence.prev.link } : false,
    next: sequence.next ? { text: sequence.next.title, link: sequence.next.link } : false,
  }
}

/** publicationGraph — sibling publications as related-object prev/next. */
export function publicationGraph(p, pubs) {
  const list = pubs.filter((x) => x.publishable !== false)
  const i = list.findIndex((x) => x.slug === p.slug)
  const ref = (x) => (x ? { key: x.slug, title: x.title, link: `/publications/${x.slug}` } : null)
  const prev = i > 0 ? ref(list[i - 1]) : null
  const next = i >= 0 && i < list.length - 1 ? ref(list[i + 1]) : null
  const handle = (p.address || p.receipt || '').replace(/-/g, '').slice(0, 8)
  return {
    objectKind: 'publication',
    sequence: { prev, next },
    handle,
    address: p.address || p.receipt || '',
    file: p.file || '',
    prev: prev ? { text: prev.title, link: prev.link } : false,
    next: next ? { text: next.title, link: next.link } : false,
  }
}
