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

Woven to its neighbours in every direction — each axis, backward and forward:

${compass('Skill', t.skill, bySkill[t.skill](t))}
${compass('Principle', t.principle, byPrin[t.principle](t))}
${compass('Sequence', 'ledger order', bySeq(t))}

[All theorems](/theorems) · [Source · lean/${t.file}](${GH}${t.file}) · [npm](https://www.npmjs.com/package/@uuidna/uuidna)

Re-verify every proof with \`npm run lean\` (regenerates \`lean/*.lean\` and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.
`,
    }))
  },
}
