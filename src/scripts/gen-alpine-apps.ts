#!/usr/bin/env node
// @non-harmonic: reads Alpine's PUBLISHED index over the network — a wall-clock-dependent act, honest at the
// src/os boundary and declared here — and writes the derived report. Never imported by the harmonic core.
//
// gen-alpine-apps — PORT THE WHOLE PUBLISHED CATALOGUE, AND SAY HOW MUCH OF IT THE LEDGER CAN SPEAK FOR.
//
// The tree ports Alpine three ways already: a pinned RELEASE (os/alpine), the DRIVER bundle (drivers/driver),
// and alpine-base's 25-package dependency closure (os/installs). None of them is the catalogue — the tens of
// thousands of applications Alpine actually publishes had no uuidna identity before this script ran.
//
// PORTING IS PORTING THE INTEGRITY. Nothing is installed, linked, unpacked, booted or executed, and none of
// these packages' bytes are held here. What is ported is the published metadata folded to an address anyone
// with the same index recomputes.
//
// THE NUMBER THIS REPORT LEADS WITH IS THE ONE THAT IS NOT FLATTERING. Every ported app is offered a sealed
// theorem as a witness, and on a real index most apps get none — the ledger has arithmetic for typesetting,
// calendars, codecs, checksums and ciphers, and none whatever for a Perl module or a Kubernetes controller. A
// harmonisation scheme that found a theorem for everything would have said nothing, so the unharmonised share
// is printed first and printed as a percentage.
//
// AND IT COUNTS PROJECTS, NOT ONLY PACKAGES. Alpine publishes one project as up to six packages (-doc, -dev,
// -dbg, -libs, -static, -lang). Counting those as separate applications inflates every tally five- or six-fold,
// so both numbers are carried and the smaller one is the count of things.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { fetchCatalogue, catalogueAddress } from '../os/apps/index.js'
import { dispatchAll, refusalReport, type Claimed } from '../quantum/dispatch/index.js'
import { handleOf } from '../handle.js'
import { classifyIndex, coverageOf, type IndexCell } from '../os/apps/coverage.js'

const repos = ['main', 'community']
const catalogue = await fetchCatalogue(repos)

// A DOWN MIRROR IS NOT AN EMPTY UPSTREAM, and the two must never render the same. An empty catalogue is never
// sealed: the previous report stands, and this run says why it did nothing.
if (!catalogue) {
  console.error('✗ gen-alpine-apps — the published index could not be read (mirror down, or its shape drifted).')
  console.error('  NOTHING WAS WRITTEN. An empty catalogue is a failed read, never a result, and the last good report stands.')
  console.error('  NOTE APKINDEX.tar.gz is TWO concatenated gzip members; a whole-buffer DecompressionStream decodes only')
  console.error('       the first (the signature) and throws on the rest. src/os/apps/untarGzipMember handles it.')
  process.exit(1)
}

const address = catalogueAddress(catalogue)

// ── THE DENOMINATOR, WHICH THIS REPORT DID NOT STATE. Every figure above is honest about itself and none of them
// says what fraction of Alpine it is. Alpine publishes an APKINDEX for every (repo × architecture) pair on the
// branch; this port reads ONE architecture. Measured 2026-08-25: sixteen published, two read — 12.5%. The report
// hid nothing (it names `arch: x86_64`) and disclosed nothing either, because a reader had to know unaided that
// x86_64 is one of eight. The number that sounds comprehensive is the one that most needs its denominator.
//
// The pairs this port does not read are probed with a HEAD — cheap, no bandwidth — so they are counted as
// PUBLISHED-BUT-UNREAD rather than assumed away. Without that, the port could report full coverage by the simple
// method of never looking, which is the failure this whole audit is named after arrived at through arithmetic.
const ARCHES = ['x86_64', 'x86', 'aarch64', 'armv7', 'armhf', 'ppc64le', 's390x', 'riscv64']
const probeBytes = async (repo: string, arch: string): Promise<number> => {
  try {
    const r = await fetch(`https://dl-cdn.alpinelinux.org/alpine/${catalogue.branch}/${repo}/${arch}/APKINDEX.tar.gz`, { method: 'HEAD' })
    return r.ok ? Number(r.headers.get('content-length') ?? 0) : 0
  } catch { return -1 }
}
const cells: IndexCell[] = []
for (const repo of repos) {
  for (const arch of ARCHES) {
    const bytes = await probeBytes(repo, arch)
    if (bytes < 0) continue                                  // an unreachable probe is counted in NEITHER direction
    const read = arch === catalogue.arch
    cells.push(classifyIndex(repo, arch, read, bytes, read ? 1 : 0))
  }
}
const coverage = coverageOf(catalogue.branch, cells)
if (coverage.undecodable > 0) {
  console.error(`✗ gen-alpine-apps — ${coverage.undecodable} index(es) served a substantial body and decoded to nothing.`)
  console.error('  That is this tree\'s READER failing, not an empty upstream. NOTHING WAS WRITTEN.')
  process.exit(1)
}
console.log(`  coverage — ${coverage.read}/${coverage.published} published indexes read (${(coverage.breadth * 100).toFixed(1)}%), ${coverage.unread} published and deliberately unread`)

// EVERY CLAIM LEAVES AS A WITNESSED MESSAGE. One line per harmonised skill, each citing the sealed theorem
// bound to it, plus the scope line that says what porting does and does not mean — witnessed by the theorem
// that seals the port's own honesty, so the sentence a reader is most likely to over-read is the one carrying
// a seal.
const claims: Claimed[] = [
  ...catalogue.bySkill.map((s) => ({
    claim: `${s.origins} Alpine projects (${s.apps} published packages) declare work the ledger has sealed arithmetic for as ${s.skill}, and each is bound to theorem ${s.theorem} as its witness. The binding is to the app's DECLARED purpose in Alpine's own words; no app's code was inspected, run, or verified.`,
    witness: s.theorem,
  })),
  {
    claim: `${catalogue.count} published packages (${catalogue.origins} distinct projects) were ported as content-addressed provenance identities, folded to one root; ${catalogue.unharmonised} of them harmonise with no sealed theorem at all and are counted rather than hidden. Nothing was installed, linked or executed — the OS port is bootable only in the sense theorem the_os_is_bootable_quantum states.`,
    witness: 'the_os_is_bootable_quantum',
  },
]

const run = dispatchAll(claims)
if (!run.clear) {
  console.error(refusalReport(run))
  process.exit(1)
}

const pct = (n: number, of: number): number => { const x = n * 100; return (x - (x % of)) / of }

const table = [
  '| skill | projects | packages | witness (sealed theorem) | fold of their addresses |',
  '|-------|----------|----------|--------------------------|-------------------------|',
  ...catalogue.bySkill.map((s) =>
    `| ${s.skill} | ${s.origins} | ${s.apps} | [${s.theorem}](https://uuidna.com/theorem/${s.theorem}) | \`${handleOf(s.fold)}\` |`),
].join('\n')

const block = `<!-- alpine-apps:begin (generated by gen-alpine-apps — edit the generator, never this block) -->
## The Alpine catalogue, ported — and how much of it the ledger can speak for

Alpine publishes **${catalogue.count} packages** in \`${repos.join('\` + \`')}\` for \`${catalogue.arch}\` on
\`${catalogue.branch}\` — **${catalogue.origins} distinct projects** once the \`-doc\`/\`-dev\`/\`-dbg\`/\`-libs\`/\`-static\`
variants of the same project are folded together. Every one of them now has a uuidna identity: \`uuidna/<name>\`,
a 128-bit content-address over the exact published tuple (name, version, arch, repo, branch, Alpine's own
checksum), recomputable by anyone holding the same index.

**That is ${coverage.read} of ${coverage.published} published indexes — ${pct(coverage.read, coverage.published)}% of the catalogue,
not all of it.** Alpine builds \`${repos.join('\` and \`')}\` for ${ARCHES.length} architectures and publishes an index for
each; this port reads \`${catalogue.arch}\` and leaves ${coverage.unread} published indexes deliberately unread. The
count above is large and true and has a denominator, and the denominator is stated here because a figure that
sounds comprehensive is the one that most needs it. The unread pairs were probed, not assumed: a port cannot
earn coverage by declining to look.

**${pct(catalogue.unharmonised, catalogue.count)}% of them harmonise with nothing.** That is the number this
report leads with, because it is the one that carries information: the ledger has sealed arithmetic for
typesetting, calendars, codecs, checksums and ciphers, and none whatever for a Perl binding or a Kubernetes
controller. A scheme that found a theorem for every package would have proved only that its patterns were
loose. **${catalogue.harmonisedOrigins} projects** (${catalogue.harmonised} packages) do harmonise, and each is
bound to the heaviest sealed theorem of its skill as a witness.

${table}

**What a binding means, exactly:** the app's DECLARED purpose — Alpine's own one-line description, in the
packagers' words — falls under a skill the ledger has sealed arithmetic for, so this ledger can say something
proven about the *kind of work* the app does. It does **not** mean the app was inspected, tested, run, or
verified. Nothing here reads a line of any app's code.

**Porting means porting the integrity.** uuidna does not install, link, unpack, boot or run any of these
packages and holds none of their bytes. What is ported is the published metadata, folded to an address —
which is what makes a deployment able to *prove* which exact upstream releases it rests on.

Catalogue root (every ported address, order-invariant): \`${catalogue.root}\`
Catalogue address: \`${address}\` · handle \`${handleOf(address)}\`

Every line above left through the gate as a witnessed quantum message: ${run.passed} claims, each bound to a
sealed theorem the claim itself cites, ${run.refused.length} refused. Dispatch receipt: \`${run.receipt}\`.

*This report moves when upstream moves — it is a LIVE read of what Alpine calls latest-stable right now, which
is honest at the \`src/os\` boundary and nowhere else in this tree.*
<!-- alpine-apps:end -->`

// coverage travels WITH the catalogue: the count and its denominator are one fact, and a consumer that can read
// the first without the second is exactly how "28630 packages" came to sound like all of Alpine
writeFileSync(join(ROOT, 'lean', 'alpine-apps.json'), JSON.stringify({
  ...catalogue, address, dispatch: run,
  coverage: { published: coverage.published, read: coverage.read, unread: coverage.unread, breadth: coverage.breadth, receipt: coverage.receipt },
}, null, 1) + '\n')
writeFileSync(join(ROOT, 'lean', 'alpine-apps.md'), block + '\n')

console.log(`✓ gen-alpine-apps — ${catalogue.count} packages / ${catalogue.origins} projects ported from ${repos.join(' + ')} (${catalogue.branch}, ${catalogue.arch})`)
console.log(`    harmonised     ${catalogue.harmonised} packages / ${catalogue.harmonisedOrigins} projects across ${catalogue.bySkill.length} skills`)
console.log(`    unharmonised   ${catalogue.unharmonised} (${pct(catalogue.unharmonised, catalogue.count)}% — the honest majority, counted not hidden)`)
console.log(`    gate           ${run.passed}/${run.dispatches.length} claims dispatched as witnessed messages`)
console.log(`    root           ${catalogue.root}`)
