// Dynamic route: one show page per proven Lean theorem, generated at build time from the ledger — no 557 files on
// disk. Each page carries the detailed proof, the formal statement, the content-address, its principle and the
// source link. `params` also feeds per-page Open Graph + uuidna:address meta via transformPageData in config.ts.
import { theorems, PRINCIPLES, renderTheorem } from '../../dist/index.js'

const blurb = Object.fromEntries(PRINCIPLES.map((p) => [p[1], p[2]]))
const GH = 'https://github.com/uuidna/uuidna/blob/main/lean/'

// Keep only the <article> card from the renderer (drop the <meta> tags it prepends — those go through config head).
const cardOf = (t) => renderTheorem({ name: t.name, key: t.key, address: t.address }, { base: '' }).replace(/^[\s\S]*?(?=<article)/, '')

export default {
  paths() {
    return theorems().map((t) => ({
      params: {
        key: t.key,
        name: t.name,
        principle: t.principle,
        statement: t.statement,
        tactic: t.tactic,
        address: t.address,
      },
      content: `# ${t.name}

${cardOf(t)}

**SEALED** · **TRUE — proven in Lean** · principle **${t.principle}**

## Statement

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
| principle | ${t.principle} — ${blurb[t.principle] || ''} |
| verdict | **SEALED** — its \`by ${t.tactic}\` proof compiles sorry-free (Lean 4.33.0, no Mathlib) |

[Source · lean/${t.file}](${GH}${t.file}) · [Trial receipt](/trial) · [All theorems](/theorems) · [npm](https://www.npmjs.com/package/@uuidna/uuidna)

Re-verify every proof with \`npm run lean\` (regenerates \`lean/*.lean\` and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.
`,
    }))
  },
}
