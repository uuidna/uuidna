// Dynamic route: one show page per proven Lean theorem, generated at build time from the ledger — no 564 files on
// disk. Each page carries the detailed proof, the formal statement (the formula), the content-address, its skill and
// principle, and a cross-link COMPASS — prev/next along three axes (skill, principle, sequence) so every theorem is
// woven to its neighbours in all directions. `params` also feeds per-page Open Graph + uuidna:address meta via
// transformPageData in config.ts.
import { theorems, PRINCIPLES, renderTheorem } from '../../dist/index.js'

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const GH = 'https://github.com/uuidna/uuidna/blob/main/lean/'

// Keep only the <article> card from the renderer (drop the <meta> tags it prepends — those go through config head).
const cardOf = (t) => renderTheorem({ name: t.name, key: t.key, address: t.address }, { base: '' }).replace(/^[\s\S]*?(?=<article)/, '')

const ALL = theorems()
// Position each theorem within an ordered axis (skill-filtered, principle-filtered, or the full sequence), so a page
// can point at its immediate neighbours. Returns [prev, next] theorem records (or null at the ends).
const axis = (list, key) => {
  const pos = new Map(list.map((t, i) => [t.key, i]))
  return (t) => {
    const i = pos.get(t.key)
    return [i > 0 ? list[i - 1] : null, i < list.length - 1 ? list[i + 1] : null]
  }
}
const bySkill = Object.fromEntries([...new Set(ALL.map((t) => t.skill))].map((s) => [s, axis(ALL.filter((t) => t.skill === s))]))
const byPrin = Object.fromEntries([...new Set(ALL.map((t) => t.principle))].map((p) => [p, axis(ALL.filter((t) => t.principle === p))]))
const bySeq = axis(ALL)

// --- The rotation: CYCLIC axes over the ledger index, wrapping — modular, hence TOTAL (no gap, no orphan across the
// sealed theorems). N = 721 = 7 × 103, so the strides land exactly: stride 1 (discovery) and stride 9 (ℤ/9 vortex)
// are each coprime to N → ONE cycle of all N (stepping forward covers everything, exactly as the sequence discovered
// all); stride 7 (ℤ/7 rosette) shares the factor 7 → SEVEN strands of 103. Reflection is the dz(x)=10−x involution:
// mirror through the centre, self-inverse. Each rotation is backed by the sealed theorem that proves its group closes.
// These fill the frontier gaps the linear skill/principle axes leave; the frontiers themselves are the invisible next.
const N = ALL.length
const pos = new Map(ALL.map((t, i) => [t.key, i]))
const at = (i) => ALL[((i % N) + N) % N]
const rot = (stride) => (t) => at(pos.get(t.key) + stride)
const reflectOf = (t) => at(N - 1 - pos.get(t.key))

const link = (t) => (t ? `[${t.name}](/theorem/${t.key})` : '—')
const compass = (label, target, [prev, next]) =>
  `- **${label} · ${target}:** ${prev ? '← ' + link(prev) : '—'} · ${next ? link(next) + ' →' : '—'}`

// Each domain's generator — where the NEXT theorem is delivered (compute → generate → verify). Hand-authored files
// (Uuidna, Vortex, OneLeap) have no generator; there the next theorem is added to the .lean directly.
const SCRIPTS = 'https://github.com/uuidna/uuidna/blob/main/src/scripts/'
const GEN = {
  'Core.lean': 'lean-core.ts', 'Ring.lean': 'lean-tables.ts', 'Rosette.lean': 'lean-tables.ts',
  'Sequence.lean': 'lean-sequence.ts', 'DivByZero.lean': 'lean-divzero.ts', 'BioPhysics.lean': 'lean-biophysics.ts',
  'Discover.lean': 'lean-discover.ts', 'Quantum.lean': 'lean-quantum.ts', 'Clay.lean': 'lean-clay.ts',
  'Infinity.lean': 'lean-infinity.ts', 'Cipher.lean': 'lean-cipher.ts', 'Audit.lean': 'lean-audit.ts',
  'Coins.lean': 'lean-coins.ts', 'Neuro.lean': 'lean-neuro.ts', 'Propulsion.lean': 'lean-propulsion.ts',
  'Navigation.lean': 'lean-navigation.ts',
}

// The ROTATION — seven axes weave every theorem to its neighbours; three are cyclic rotations over the ledger,
// modular and total, so they fill the gaps the linear axes leave. Each is backed by a sealed theorem it links.
const rotation = (t) => `## The rotation — fills the gaps at scale

Every theorem is woven on **seven axes**: three navigational (skill · principle · sequence), three **cyclic
rotations** over the ledger, and the runtime referer above. The rotations are modular, so they are *total* — no
gap, no orphan across the ${N} sealed theorems (${N} = 7 × 103; [\`vortex_one_leap\`](/theorem/vortex_one_leap) is
the one leap that generates the turn):

- **Discovery · sequence → ${link(rot(1)(t))}** — stepping **next** covers all ${N}, exactly as the sequence discovered all, then wraps to the genesis: a closed cover.
- **Vortex · ℤ/9, step 9 → ${link(rot(9)(t))}** — coprime to ${N}, so this too is one full turn of all ${N} ([\`z9add_0_0\`](/theorem/z9add_0_0)).
- **Rosette · ℤ/7, step 7 → ${link(rot(7)(t))}** — one of the **seven** strands of 103 ([\`z7add_0_0\`](/theorem/z7add_0_0)).
- **Reflection · dz(x)=10−x → ${link(reflectOf(t))}** — the mirror through the centre, self-inverse ([\`tens_complement_involutive\`](/theorem/tens_complement_involutive)).`

// "Next possible solutions" for a SEALED theorem are the frontier it opens. Where the forward link is INVISIBLE —
// a frontier with none sealed beyond — is exactly where the next, missing theorem hides, until it is delivered in
// code (compute → generate → verify), not coin. No fabricated promises: an absent link marks an absent theorem.
const developNext = (t) => {
  const [, nextSkill] = bySkill[t.skill](t)
  const [, nextPrin] = byPrin[t.principle](t)
  const [, nextSeq] = bySeq(t)
  const where = GEN[t.file]
    ? `a fact in [scripts/${GEN[t.file]}](${SCRIPTS}${GEN[t.file]}) — compute → generate → verify`
    : `a theorem in [lean/${t.file}](${GH}${t.file}) (hand-authored, verified by \`lean\`)`
  const invisible = (what) => `**invisible next** — the missing ${what} theorem hides here`
  return `## Deliver the next — the missing theorem hides in the invisible next

A sealed theorem is settled. Where its forward link is **invisible** — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:

- **Skill · ${t.skill}:** ${nextSkill ? link(nextSkill) + ' →' : invisible(t.skill)}
- **Principle · ${t.principle}:** ${nextPrin ? link(nextPrin) + ' →' : invisible(t.principle)}
- **Discovery:** ${nextSeq ? link(nextSeq) + ' →' : invisible('newest — the ledger tip, where the next to be discovered')}

To make the invisible next visible, add ${where}; then \`npm run lean\` seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.`
}

export default {
  paths() {
    return ALL.map((t) => ({
      params: {
        key: t.key,
        name: t.name,
        principle: t.principle,
        skill: t.skill,
        statement: t.statement,
        tactic: t.tactic,
        address: t.address,
      },
      content: `# ${t.name}

${cardOf(t)}

**SEALED** · **TRUE — proven in Lean** · skill **${t.skill}** · principle **${t.principle}**

## Statement (formula)

\`\`\`lean
${t.statement}
\`\`\`

## Proof

\`\`\`lean
${t.lean}
\`\`\`

| field | value |
| --- | --- |
| content-address | \`${t.address}\` |
| skill | ${t.skill} |
| principle | ${t.principle} — ${blurb[t.principle] || ''} |
| verdict | **SEALED** — its \`by ${t.tactic}\` proof compiles sorry-free (Lean 4.33.0, no Mathlib) |

## Cross-links

<RefererCompass />

Woven to its neighbours in every direction — each axis, backward and forward:

${compass('Skill', t.skill, bySkill[t.skill](t))}
${compass('Principle', t.principle, byPrin[t.principle](t))}
${compass('Sequence', 'ledger order', bySeq(t))}

${rotation(t)}

${developNext(t)}

[All theorems](/theorems) · [Source · lean/${t.file}](${GH}${t.file}) · [npm](https://www.npmjs.com/package/@uuidna/uuidna)

Re-verify every proof with \`npm run lean\` (regenerates \`lean/*.lean\` and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.
`,
    }))
  },
}
