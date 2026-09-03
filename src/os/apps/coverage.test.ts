// alpine port coverage — THE FOUR OUTCOMES, AND THE ONE THEY EXIST TO KEEP APART.
//
// Every instrument that failed in this tree failed the same way: it rendered "not measured" as something that
// was not a failure. A lock that certified exclusivity it never checked. A preflight that called an installed
// toolchain absent. A live Alpine read that returned [] from a broken decoder and looked exactly like an empty
// upstream. These tests hold the boundary in the last of those cases, and every one of them can fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyIndex, coverageOf, SUBSTANTIAL_BYTES } from './coverage.js'

test('A BROKEN READER IS NOT AN EMPTY REPOSITORY — the distinction the [] return could not make', () => {
  // the real signature: APKINDEX.tar.gz is two gzip members, the whole-buffer recipe decodes only the signature,
  // and half a megabyte comes back as zero packages. Measured upstream sizes are 520KB-2.5MB.
  const broken = classifyIndex('main', 'x86_64', true, 528_239, 0)
  assert.equal(broken.outcome, 'undecodable', 'a large body that decoded to nothing must accuse the reader')
  assert.match(broken.why, /READER failing/)

  // and the honest empty: nothing published there at all
  const nothing = classifyIndex('main', 'nosucharch', true, 0, 0)
  assert.equal(nothing.outcome, 'absent')

  // the two carry distinct outcomes by construction — that collapse is the bug
  assert.notEqual(broken.outcome, nothing.outcome)
})

test('UNREAD IS NOT A PASS AND NOT A FAILURE — it is the absence of evidence, and it is required', () => {
  const c = classifyIndex('community', 'riscv64', false, 0, 0)
  assert.equal(c.outcome, 'unread')
  assert.match(c.why, /neither a pass nor a failure/)
  // an unread cell stays uncounted as read, by decision, however tempting the arithmetic
  const cov = coverageOf('latest-stable', [
    classifyIndex('main', 'x86_64', true, 528_239, 4200),
    classifyIndex('main', 'aarch64', false, 0, 0),
  ])
  assert.equal(cov.read, 1)
  assert.equal(cov.unread, 1)
})

test('breadth prints the denominator the catalogue report never did', () => {
  // two of sixteen is the measured state of the port on 2026-08-25: x86_64 only, of eight architectures
  const cells = []
  for (const repo of ['main', 'community']) {
    for (const arch of ['x86_64', 'x86', 'aarch64', 'armv7', 'armhf', 'ppc64le', 's390x', 'riscv64']) {
      cells.push(classifyIndex(repo, arch, arch === 'x86_64', arch === 'x86_64' ? 528_239 : 0, arch === 'x86_64' ? 4200 : 0))
    }
  }
  const cov = coverageOf('latest-stable', cells)
  assert.equal(cov.read, 2)
  assert.equal(cov.unread, 14)
  // UNPROBED pairs are not "published" here, because nothing was fetched to prove they exist — the audit must
  // not credit itself with knowledge it did not acquire, in EITHER direction
  assert.equal(cov.published, 2)
  assert.equal(cov.breadth, 1)
})

test('PROBING WITHOUT READING IS THE REAL STATE, and it must not report as full coverage', () => {
  // the live audit HEADs all sixteen and decodes two. If a probed-but-unread index did not count as published,
  // the port could report 100% breadth by the simple method of never looking — the failure this module is named
  // after, arrived at through arithmetic instead of through a decoder.
  const cells = []
  for (const repo of ['main', 'community']) {
    for (const arch of ['x86_64', 'x86', 'aarch64', 'armv7', 'armhf', 'ppc64le', 's390x', 'riscv64']) {
      const covered = arch === 'x86_64'
      cells.push(classifyIndex(repo, arch, covered, 528_239, covered ? 4200 : 0))
    }
  }
  const cov = coverageOf('latest-stable', cells)
  assert.equal(cov.published, 16, 'every probed index is published, read or not')
  assert.equal(cov.read, 2)
  assert.equal(cov.breadth, 2 / 16)
  assert.ok(cov.breadth < 0.13, `breadth must report the real 12.5%, got ${(cov.breadth * 100).toFixed(1)}%`)
})

test('AN UNDECODABLE INDEX STILL COUNTS AS PUBLISHED — our defect must not flatter our coverage', () => {
  // if a failed decode shrank the denominator, breaking the reader would RAISE the reported breadth
  const cells = [
    classifyIndex('main', 'x86_64', true, 528_239, 4200),
    classifyIndex('community', 'x86_64', true, 2_519_317, 0),   // fetched fine, decoded to nothing
  ]
  const cov = coverageOf('latest-stable', cells)
  assert.equal(cov.undecodable, 1)
  assert.equal(cov.published, 2, 'an index we could not read is still one Alpine publishes')
  assert.equal(cov.breadth, 0.5, 'breadth must fall when our reader fails, never rise')
})

test('the receipt recomputes and moves only when the coverage does', () => {
  const a = coverageOf('latest-stable', [classifyIndex('main', 'x86_64', true, 528_239, 4200)])
  const b = coverageOf('latest-stable', [classifyIndex('main', 'x86_64', true, 528_239, 4200)])
  assert.equal(a.receipt, b.receipt)
  const moved = coverageOf('latest-stable', [classifyIndex('main', 'x86_64', true, 528_239, 4201)])
  assert.notEqual(moved.receipt, a.receipt)
})

test('the threshold sits far from both things it separates', () => {
  // the gzip signature member is a few hundred bytes; the smallest real index is ~500KB. A threshold tuned to
  // sit near either would be a guess about one mirror's contents wearing the clothes of a rule.
  assert.ok(SUBSTANTIAL_BYTES > 10_000, 'must be far above a signature member')
  assert.ok(SUBSTANTIAL_BYTES < 500_000, 'must be far below the smallest published index')
})
