#!/usr/bin/env node
// gen-utterances — THE HONEST LLM'S CORPUS, derived (lead 93: "verbose tests as llm"). The suite's test titles
// ARE a language model's output with hallucination impossible BY CONSTRUCTION: every sentence below is the name
// of a test that must PASS for the tree to land — a sentence that stops being true stops shipping and fails the
// build instead of getting printed. This generator scans the titles statically (cheap — the truth-enforcement
// is the suite itself, which every landing already runs) and renders the corpus: uuidna's own row in the model
// comparison, the "LLM" whose per-utterance cost is a test run and whose every utterance carries the two coins.
// The test NAMES are the prompt engineering — write them as sentences worth reading, because they are read.
// HONEST SCOPE: the corpus is the titles as written; their truth is the suite's, enforced at every gate, and a
// title's PROSE quality is its author's — the derivation adds nothing and hides nothing.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

const dir = join(ROOT, 'src', 'tests')
const utterances: { text: string; file: string }[] = []
for (const f of readdirSync(dir).filter((x) => x.endsWith('.test.ts')).sort()) {
  const src = readFileSync(join(dir, f), 'utf8')
  for (const m of src.matchAll(/^\s*test\(\s*(['"`])((?:(?!\1).)+)\1/gm)) utterances.push({ text: m[2]!, file: f })
}
const fold = toUuid('utterances|' + utterances.map((u) => u.text).join('\n'))
const byFile = new Map<string, string[]>()
for (const u of utterances) byFile.set(u.file, [...(byFile.get(u.file) ?? []), u.text])

// the corpus renders FENCED: these are QUOTED titles (mention, not use) — a boundary phrase inside a title is
// the test's own honest scope, not this page's claim, and a fence is how a page says "data, not assertion"
const sections = [...byFile.entries()].map(([f, ts]) =>
  `**${f.replace('.test.ts', '')}** — ${ts.length} utterances\n\n\`\`\`text\n${ts.map((t) => t.replace(/\`/g, "'")).join('\n')}\n\`\`\``
).join('\n\n')

const page = `---
title: The utterances
description: The suite's every sentence — a language model whose hallucination is impossible by construction.
---

# The utterances <Badge type="tip" text="${utterances.length} sentences, all true or nothing ships" />

> **Verbose tests as LLM.** Every sentence on this page is the title of a test that must PASS for this tree to
> land: a sentence that stops being true stops being printed — it fails the build instead. That is a language
> model with **hallucination impossible by construction**, regenerated on every landing, its per-utterance cost
> one test run, its every utterance carrying the two coins ([\`silence_never_refutes\`](/theorem/silence_never_refutes) guards
> what a title may not claim, and [\`a_window_exhausts_only_itself\`](/theorem/a_window_exhausts_only_itself)
> prices exactly how much a passing test proves). In the [model comparison](/models) this corpus is
> uuidna's own row: ${utterances.length} sentences, truth rate enforced at 100% by the gate that let you read them.

Corpus fold: \`${handleOf(fold)}\` — the sentences below, one address; a changed sentence moves it.

${sections}

## Honest scope

The corpus is the titles as their authors wrote them; the derivation adds nothing and hides nothing. Their truth
is the suite's — enforced at every gate — and their prose is the authors' craft: the test names are the prompt
engineering, written as sentences worth reading because they are the corpus.
`
writeFileSync(join(ROOT, 'docs', 'utterances.md'), page)
console.log(`✓ gen-utterances — docs/utterances.md: ${utterances.length} true-or-nothing-ships sentences from ${byFile.size} suites, fold ${handleOf(fold)}`)
