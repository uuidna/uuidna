#!/usr/bin/env node
// check-msg — the commit-message gate. A commit message is a THOUGHT published to the permanent record, so it must
// come cleanly from uuidna: each sentence is run through the honesty gate (overreachOf, which de-quotes first), and
// the commit is BLOCKED if a real overclaim survives. HONEST use/mention exclusion, mirroring the provenance audit
// excluding the gate files: a message that DESCRIBES the gate's own work — hardening it, listing the drained words,
// naming a refuted overclaim, or stating a true fact like π's non-terminating decimal — necessarily NAMES those words
// without asserting them, so a message about the gate/honesty machinery is cleared. It inherits the gate's limits
// (lexical, use/mention imperfect); it is a floor, not a wall. Integrity, not truth.
import { readFileSync } from 'node:fs'
import { overreachOf } from '../index.js'

const path = process.argv[2]
if (!path) { console.error('check-msg: no commit message file given'); process.exit(2) }
const msg = readFileSync(path, 'utf8').replace(/^#.*$/gm, '').trim() // drop git comment lines

// use/mention exclusion: a message ABOUT the gate/honesty machinery (or a true irrationality fact) names the words
// without claiming them — cleared, exactly as the provenance audit excludes the gate files that name their lexicon.
const META = /\b(gate|harden\w*|lexicon|overclaim\w*|drain\w*|demarcat\w*|refut\w*|hollow|honesty|provenance|irrational)\b/i
if (META.test(msg)) process.exit(0)

const units = msg.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 3)
const hits = units.map((u) => ({ u, o: overreachOf(u) })).filter((x) => x.o)
if (hits.length) {
  console.error('commit-msg gate: the message overclaims — a commit message must come cleanly from uuidna:')
  for (const { u, o } of hits) console.error(`  • [${o}] "${u.slice(0, 80)}"`)
  console.error('  Fix: reword to the honest claim, quote the overclaim, cite a /theorem/<key>, or (for gate-work) name the gate.')
  process.exit(1)
}
process.exit(0)
