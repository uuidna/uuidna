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

// "Next possible solutions" for a SEALED theorem are the frontier it opens: the forward neighbours (real sealed
// theorems), and the concrete place the NEXT theorem is delivered — in code, not coin. No fabricated promises.
const developNext = (t) => {
  const [, nextSkill] = bySkill[t.skill](t)
  const [, nextPrin] = byPrin[t.principle](t)
  const [, nextSeq] = bySeq(t)
  const where = GEN[t.file]
    ? `a fact in [scripts/${GEN[t.file]}](${SCRIPTS}${GEN[t.file]}) — compute → generate → verify`
    : `a theorem in [lean/${t.file}](${GH}${t.file}) (hand-authored, verified by \`lean\`)`
  return `## Deliver the next

A sealed theorem is settled — its "next possible solutions" are the frontier it opens. Forward from here:

- **Skill · ${t.skill}:** ${nextSkill ? link(nextSkill) + ' →' : 'frontier — none sealed beyond this yet'}
- **Principle · ${t.principle}:** ${nextPrin ? link(nextPrin) + ' →' : 'frontier — none sealed beyond this yet'}
- **Sequence:** ${nextSeq ? link(nextSeq) + ' →' : 'frontier — the ledger tip'}

To deliver the **next** theorem in _${t.principle}_, add ${where}; then \`npm run lean\` seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.`
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

${developNext(t)}

[All theorems](/theorems) · [Source · lean/${t.file}](${GH}${t.file}) · [npm](https://www.npmjs.com/package/@uuidna/uuidna)

Re-verify every proof with \`npm run lean\` (regenerates \`lean/*.lean\` and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.
`,
    }))
  },
}
