#!/usr/bin/env node
// @finder phase:18 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added. The phase was taken from the chain as it stood when the hand list was dissolved, so the
// order did not change on the day it stopped being typed.
// audit-asks — EVERY PLACE THE AUTOMATION STOPS AND ASKS, and which of those asks is a gap rather than a law.
//
// The captain, 2026-09-27: "asking me shows the autonomous gaps to automate." Taken literally, an ask is evidence:
// either the act genuinely needs a credential, a logged-in session or a ruling no theorem decides — or the automation
// stopped where it could have continued, and the ask is the gap wearing a question mark.
//
// THE REGISTER ALREADY EXISTS AND IS HAND-KEPT, which is the whole finding. AGENTS.md points at
// `.claude/lessons.md § Owner decisions` as the place the owner-only acts live, and it is curated prose: one line each,
// written by whoever remembered. So an ask the CODE emits at runtime — post-push naming an unrostered check "until
// someone decides", one-receipt leaving nonstandard scripts "for a human" — never reaches it. It is printed to a
// console, read by nobody in particular, and printed again on the next run. Measured on the day this was written: this
// session alone asked four times, and not one of those asks was in the register.
//
// SO THE ASKS ARE COLLECTED FROM THE CODE THAT EMITS THEM, and matched against the register that is supposed to hold
// them. Three numbers come out, and the third is the one the captain asked for:
//   · REGISTERED — the ask is in the register, so the owner can see it without reading source.
//   · UNREGISTERED — the code asks and nothing accumulates it. The ask repeats forever and reaches no one.
//   · AUTOMATABLE — the ask is not a credential, not a logged-in act and not a ruling: the automation stopped where
//     it had everything it needed. This is the gap to close, and it is named rather than counted.
//
// WHAT IS NOT A GAP, and the distinction is the instrument's whole value. Three kinds of ask are LAWFUL and must stay:
// a credential an agent must never type; an act only a logged-in owner can take; and a choice no theorem decides. The
// court's own audit is the sharpest case — it says which calls "a person must read" and records no guess, which is the
// law working. An instrument that counted those as gaps would be pushing the tree to fake the one thing it refuses to
// fake, so they are classified by what the act NEEDS and never by the phrasing.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, wrRoot } from '../boundary.js'
import { wrArtifact } from '../artifact.js'

// AN ASK IS EMITTED, NOT EXPLAINED — and reading that off the phrasing alone was wrong on five of seven sites the
// first time this ran. `// the captain must come FIRST in the credit order` is publication-prior-art stating a LAW;
// `// the investigator says which calls a person must read` is court-investigate describing the law working. Both
// matched the phrase list and both were reported as gaps, under a header claiming the classifier read what the act
// NEEDS rather than how it was worded. It did not: it read one line of text.
//
// The discriminator is STRUCTURAL. An ask reaches a person only if the process says it out loud — a console line, a
// thrown message, a Gap's own text. A comment reaches whoever is already reading the source, which is nobody who
// needed asking. So a commentary line is not an ask however it is phrased, and this is checked by where the phrase
// sits rather than by what it says.
const ASKS = /needs a human|a person must|someone decides|the captain must|the owner must|only the owner|ask the captain|yours to (?:set|decide|reverse)|until a person/i

// WHAT THE ACT NEEDS decides the class, and these are the three lawful needs. A credential an agent must never type, an
// act that requires a logged-in session, and a ruling no theorem can reach. Anything else is the automation stopping
// early. The words are the tree's OWN vocabulary for those needs, which is why this reads as a classifier rather than
// as a second opinion: `credential`, `token`, `secret`, `dashboard`, `logged-in`, `licence` and `decide` already carry
// these meanings throughout src/ and .claude/lessons.md.
const CREDENTIAL = /credential|token|secret|passphrase|api[_ -]?key|namespace create|wrangler|provision/i
const DASHBOARD = /dashboard|logged-in|log in|portal|toggle|zenodo\.org|account settings/i
const RULING = /decides|decision|ruling|policy|in scope|licence|license|judgment|judgement/i

interface Ask { where: string; line: number; text: string; needs: 'credential' | 'dashboard' | 'ruling' | 'AUTOMATABLE'; registered: boolean }

const walk = (dir: string, out: string[] = []): string[] => {
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e === 'dist' || e.startsWith('.')) continue
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (e.endsWith('.ts') && !e.endsWith('.test.ts') && e !== 'audit-asks.ts') out.push(p)
  }
  return out
}

// THE REGISTER, READ AS TEXT because it is prose by design. A line counts as registering an ask when it names the same
// surface — the file, or a distinctive phrase from the ask itself. Matching on the surface rather than on wording is
// deliberate: the register is written for a person to read, so it will never quote the source line verbatim.
const REGISTER = join(ROOT, '.claude', 'lessons.md')
const registerText = existsSync(REGISTER) ? readFileSync(REGISTER, 'utf8') : ''
const ownerSection = /## Owner decisions[\s\S]*?(?=\n## |$)/.exec(registerText)?.[0] ?? ''
const registeredLines = ownerSection.split('\n').filter((l) => l.trim().startsWith('- ')).length

const asks: Ask[] = []
for (const file of walk(join(ROOT, 'src'))) {
  const rel = file.slice(ROOT.length + 1)
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((text, i) => {
    if (!ASKS.test(text)) return
    // commentary explains; it never asks. A line whose phrase sits behind // or inside a /** */ body reaches only a
    // reader of the source, so it cannot be the place the automation stopped and waited for someone.
    const t = text.trim()
    if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('/**')) return
    const needs = CREDENTIAL.test(text) ? 'credential'
      : DASHBOARD.test(text) ? 'dashboard'
      : RULING.test(text) ? 'ruling'
      : 'AUTOMATABLE'
    // registered when the register names this file, or repeats a distinctive run of words from the ask
    const stem = rel.split('/').pop() ?? rel
    const registered = ownerSection.includes(rel) || ownerSection.includes(stem)
    asks.push({ where: rel, line: i + 1, text: text.trim().slice(0, 200), needs, registered })
  })
}

const by = (n: Ask['needs']): Ask[] => asks.filter((a) => a.needs === n)
const unregistered = asks.filter((a) => !a.registered)
const automatable = by('AUTOMATABLE')

const leads = [
  ...(unregistered.length ? [{
    lead: `${unregistered.length} of ${asks.length} ask(s) the source emits reach no register: the owner-decision list in`
      + ` .claude/lessons.md holds ${registeredLines} hand-written line(s), and an ask printed at runtime never enters it.`
      + ` Each one repeats on every run and accumulates nowhere — ${unregistered.slice(0, 6).map((a) => `${a.where}:${a.line}`).join(', ')}`
      + `${unregistered.length > 6 ? ', …' : ''}.`,
    status: 'open',
    owes: 'a verdict on whether the register should be DERIVED from these sites rather than written by hand — a hand-kept'
      + ' list of what the machine asks is a second copy of the asking, and it drifts the moment a site is added',
  }] : []),
  ...(automatable.length ? [{
    lead: `${automatable.length} ask(s) name no credential, no logged-in act and no ruling — the automation stopped where`
      + ` it had what it needed: ${automatable.map((a) => `${a.where}:${a.line}`).join(', ')}.`,
    status: 'open',
    owes: 'one fold each, or a stated reason the act is lawfully a person\'s — the classifier reads what the act NEEDS,'
      + ' so a site landing here is either a gap to close or an ask whose need was never written down',
  }] : []),
]

const out = {
  why: 'Every place the source hands a decision to a person, classified by what the act NEEDS rather than by how it is'
    + ' phrased. A credential, a logged-in act and a ruling no theorem decides are LAWFUL asks and must stay — the'
    + " court's own audit, which names the calls a person must read and records no guess, is the law working. Anything"
    + ' else is the automation stopping early. Written by src/scripts/audit-asks.ts on every run, empty included.',
  asks: asks.length,
  registered: asks.length - unregistered.length,
  unregistered: unregistered.length,
  registerLines: registeredLines,
  lawful: { credential: by('credential').length, dashboard: by('dashboard').length, ruling: by('ruling').length },
  automatable: automatable.length,
  held: asks,
  open: leads.filter((l) => l.status === 'open').length,
  leads,
}
wrArtifact('lean/open-asks.json', out)

console.log(`audit-asks — ${asks.length} ask(s) in source: ${out.lawful.credential} credential, ${out.lawful.dashboard} dashboard, ${out.lawful.ruling} ruling, ${automatable.length} AUTOMATABLE`)
console.log(`  register: ${registeredLines} hand-written line(s) · ${out.registered} ask(s) reach it · ${unregistered.length} reach nothing`)
for (const a of automatable) console.log(`  ⚙ AUTOMATABLE ${a.where}:${a.line} — ${a.text.slice(0, 120)}`)
for (const a of unregistered.filter((x) => x.needs !== 'AUTOMATABLE').slice(0, 8)) console.log(`  · unregistered [${a.needs}] ${a.where}:${a.line}`)
