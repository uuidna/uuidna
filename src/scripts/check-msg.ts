#!/usr/bin/env node
// check-msg — the commit-message gate. A commit message is a THOUGHT published to the permanent record, so it must
// come cleanly from uuidna: each sentence is run through the honesty gate (overreachOf, which de-quotes first), and
// the commit is BLOCKED if a real overclaim survives. HONEST use/mention exclusion, mirroring the provenance audit
// excluding the gate files: a message that DESCRIBES the gate's own work — hardening it, listing the drained words,
// naming a refuted overclaim, or stating a true fact like π's non-terminating decimal — necessarily NAMES those words
// without asserting them, so a message about the gate/honesty machinery is cleared. It inherits the gate's limits
// (lexical, use/mention imperfect); it is a floor. Integrity.
import { readFileSync, writeFileSync } from 'node:fs'
import { overreachOf, signCommit } from '../index.js'

const path = process.argv[2]
if (!path) { console.error('check-msg: no commit message file given'); process.exit(2) }
const msg = readFileSync(path, 'utf8').replace(/^#.*$/gm, '').trim() // drop git comment lines

// ── MESSAGE INTEGRITY — checked FIRST, exempt from nothing ────────────────────────────────────────────────────────
// A commit message here is a SIGNED artifact that must cite a sealed theorem, so it has to arrive WHOLE — and the
// shell can silently eat part of it. Backticks inside a double-quoted -m argument are COMMAND SUBSTITUTION: the shell
// RUNS what they enclose and replaces it with the output, so naming a script leaf inside them (2026-08-17) produced
// "command not found" and left the permanent record reading "via a new  leaf" with the phrase simply gone.
// Substitution takes the backticks away WITH the content, so the surviving evidence is the COLLAPSED WHITESPACE where
// the words used to be — that is the signature this catches, plus the unbalanced-backtick case that survives when the
// enclosed text is not a runnable command. It runs BEFORE the use/mention exemption below, because integrity is not
// an honesty question: a truncated message is damaged whatever it happens to talk about.
const damage: string[] = []
// USE vs MENTION, the same law the honesty exemption below rests on: a message that QUOTES damage in order to record
// it is not itself damaged. This check rejected its own landing commit for exactly that reason — the message quoted
// the phrase "via a new  leaf" as the specimen, and a scan of raw text cannot tell the evidence from the crime. So
// quoted spans are removed before the whitespace scan; the real case that prompted all this was unquoted prose.
// the placeholder is a WORD' ' manufactures the doubled space this scan
// looks for (the surrounding spaces survive on both sides), which turned one false positive into four. Substituting a
// token keeps the spacing of the sentence exactly as the author wrote it.
const mentioned = (l: string): string => l.replace(/"[^"]*"/g, 'Q').replace(/`[^`]*`/g, 'Q').replace(/'[^']{2,}'/g, 'Q')
const prose = msg.split('\n').filter((l) => !/^\s*[|\-*+#>]/.test(l) && !/^\s{2,}/.test(l))  // skip tables/lists/indented blocks
const collapsed = prose.map(mentioned).flatMap((l) => l.match(/\w  +\w/g) ?? [])
if (collapsed.length) damage.push(`vanished text: ${collapsed.length} gap(s) of doubled space between words, e.g. "${collapsed[0]}"`)
if ((msg.match(/`/g) ?? []).length % 2 === 1) damage.push('an odd number of backticks — one is unclosed, or its pair was consumed by the shell')
// A CALL IS NOT A CRATER. This rule flagged every `()` alike, so a message that merely NAMED a zero-argument call
// was rejected as damaged — measured 2026-08-17 on a message describing `.join()` on an object, which was blocked
// and then landed under an unrelated seal because the drain carried the files while the message was refused. That
// is the precise harm the gate exists to prevent (a signed record separated from its work), caused by the gate.
// Damage is an empty delimiter where TEXT used to stand, so it counts only when nothing call-like precedes it:
// `( )` alone or after a space`name()`. Mentions are stripped first, by the same use/mention law as above.
const scrubbed = mentioned(msg)
if (/(?:^|[^\w.])\(\s*\)/.test(scrubbed) || /""/.test(scrubbed)) damage.push('an empty delimiter — whatever stood between it is gone')
if (damage.length) {
  console.error('✗ check-msg — the MESSAGE ITSELF arrived damaged; a signed record must be whole:')
  for (const d of damage) console.error('  • ' + d)
  console.error('  FIX write the message in single quotes, or escape every backtick: inside a double-quoted argument')
  console.error('      the shell EXECUTES what backticks enclose and substitutes the result, silently.')
  process.exit(1)
}

// ── THE RECEIPT TRAILER — a signed record carries its own seal ────────────────────────────────────────────────────
// The commit message was the last prose surface in the pipeline shipping unsealed: every other claim in this repo
// recomputes, while the git log rested on the author's word. Every ACCEPTED message now leaves carrying
// `Trial-Receipt: <fold>` — signCommit's gravity root over the message's own address folded with the addresses of
// the sealed theorems it cites. Recomputable by anyone, and that is the whole point: strip the trailer, run
// signCommit on what remains, and the fold returns — or the record was edited after it was signed.
// IDEMPOTENT: an existing trailer is stripped before signing, so amend and rebase RE-seal instead of stacking.
// REFUSES a fabricated citation outright — a commit cannot be signed true on a proof the ledger does not seal.
// WARNS, never blocks, when a message cites nothing: the citation law is already enforced where commits are made
// (reconcile signs its own, and practice cites everywhere), and a hook that blocked every uncited commit would halt
// a shared tree mid-flight on a decision this fix does not own.
const sealAndExit = (): never => {
  const body = msg.replace(/^Trial-Receipt:.*$/gm, '').trimEnd()
  const sig = signCommit(body)
  if (sig.fabricated.length) {
    console.error('✗ check-msg — REFUSED, the citation is not in the ledger: ' + sig.reason)
    process.exit(1)
  }
  if (!sig.signed) {
    console.error('· check-msg — no Trial-Receipt trailer written: ' + sig.reason)
    process.exit(0)
  }
  writeFileSync(path, body + '\n\nTrial-Receipt: ' + sig.fold + '\n')
  console.log(`✓ check-msg — sealed: Trial-Receipt ${sig.fold}, backed by ${sig.cited.join(', ')} (recompute: strip the trailer, signCommit the rest)`)
  process.exit(0)
}

// use/mention exclusion: a message ABOUT the gate/honesty machinery (or a true irrationality fact) names the words
// without claiming them — cleared, exactly as the provenance audit excludes the gate files that name their lexicon.
const META = /\b(gate|harden\w*|lexicon|overclaim\w*|drain\w*|demarcat\w*|refut\w*|hollow|honesty|provenance|irrational)\b/i
if (META.test(msg)) sealAndExit()

const units = msg.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 3)
const hits = units.map((u) => ({ u, o: overreachOf(u) })).filter((x) => x.o)
if (hits.length) {
  console.error('commit-msg gate: the message overclaims — a commit message must come cleanly from uuidna:')
  for (const { u, o } of hits) console.error(`  • [${o}] "${u.slice(0, 80)}"`)
  console.error('  Fix: reword to the honest claim, quote the overclaim, cite a /theorem/<key>, or (for gate-work) name the gate.')
  process.exit(1)
}
sealAndExit()
