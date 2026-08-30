// school paths — the recursion, the crosslinks, and the alternative to Lean.
//
// Three properties are asserted here and each was a real defect before it was a test: that the tree's DEPTH and
// the heading depth are the same number (typography carrying structure rather than decorating it), that a
// crosslink exists because two nodes SHARE something the ledger records (never because someone wrote it), and
// that the school still grades when the kernel measure cannot be read — with the substitution NAMED rather than
// silent.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  paths, pathCensus, renderPath, courses, school, kernelCosts, structuralSteps, costBasis, levelOf, bandOf,
} from './school.js'

test('the tree is recursive: one node type, four depths, depth == heading depth', () => {
  const root = paths()
  assert.equal(root.kind, 'school')
  assert.equal(root.depth, 0)
  const level = root.children[0]!
  const course = level.children[0]!
  const lesson = course.children[0]!
  assert.deepEqual([level.depth, course.depth, lesson.depth], [1, 2, 3])
  assert.deepEqual([level.kind, course.kind, lesson.kind], ['level', 'course', 'lesson'])
  // the renderer's heading depth is the node depth, not a layout choice made elsewhere
  assert.match(renderPath(root, 0)[0]!, /^# School \{#school\}/)
  assert.match(renderPath(level, 1)[0]!, /^## /)
  assert.match(renderPath(course, 2)[0]!, /^### /)
})

test('every course is ADDRESSABLE — a thing with no anchor cannot be crosslinked', () => {
  const root = paths()
  const cs = courses()
  const anchors = new Set<string>()
  for (const lv of root.children) for (const c of lv.children) anchors.add(c.id)
  assert.equal(anchors.size, cs.length, 'one anchor per course, none colliding')
  for (const c of cs) assert.ok(anchors.has(c.code.toLowerCase()), `${c.code} has no anchor`)
})

test('crosslinks are DERIVED — a link exists because two nodes share a skill, never because it was authored', () => {
  const root = paths()
  const cs = courses()
  const byCode = new Map(cs.map((c) => [c.code.toLowerCase(), c]))
  for (const lv of root.children) {
    for (const c of lv.children) {
      const mine = byCode.get(c.id)!
      for (const link of c.links) {
        if (link.startsWith('#skill-')) { assert.ok(mine.skills.includes(link.slice(7))); continue }
        const other = byCode.get(link.slice(1))
        assert.ok(other, `${c.id} links to ${link}, which is no course`)
        assert.notEqual(other!.code, mine.code, 'a course never links to itself')
        assert.ok(other!.skills.some((s) => mine.skills.includes(s)),
          `${c.id} links to ${other!.code} but they share no skill — the link is not derived`)
      }
    }
  }
})

test('the census counts what was rendered — a renderer that cannot say how much it rendered is not audited', () => {
  const root = paths()
  const c = pathCensus(root)
  assert.equal(c.byKind.school, 1)
  assert.equal(c.byKind.course, courses().length)
  assert.equal(c.nodes, 1 + c.byKind.level! + c.byKind.course! + c.byKind.lesson!)
  assert.ok(c.links > c.byKind.course!, 'the tree is more crosslinked than it has courses')
})

test('MINIMUM PAGES: depth-bounded rendering keeps one page while every node keeps its address', () => {
  const root = paths()
  const shallow = renderPath(root, 2)
  const deep = renderPath(root, 3)
  assert.ok(deep.length > shallow.length, 'depth 3 renders the lessons, depth 2 defers them')
  // a deferred subtree is ANNOUNCED, never dropped — the denominator rule applied to a page
  assert.ok(shallow.some((l) => /below this node, addressable at its own anchors/.test(l)))
})

test('THE ALTERNATIVE TO LEAN: the school still grades when the kernel measure cannot be read', () => {
  const structural = structuralSteps()
  assert.equal(Object.keys(structural).length > 1600, true, 'the structural measure covers the ledger')
  const alt = courses(structural, 'structural')
  assert.equal(alt.filter((c) => c.level > 0).length, alt.length, 'every course grades without the kernel')
  for (const c of alt) assert.equal(c.measure, 'structural')
  // and it is NOT the same quantity — a structural level is not a kernel level of the same number
  const ker = courses()
  assert.notDeepEqual(ker.map((c) => c.level), alt.map((c) => c.level))
})

test('THE KERNEL READ NAMES ITS OWN FAILURE — absent is a third answer, never a zero', () => {
  const k = kernelCosts()
  assert.ok(k.ok === true || (k.ok === false && k.reason.length > 0))
  const b = costBasis()
  assert.ok(b.measure === 'kernel' || b.measure === 'structural')
  if (b.measure === 'structural') assert.ok(b.reason, 'a substituted measure must carry why it was substituted')
})

test('the school reports its own denominator and which measure it stands on', () => {
  const s = school()
  assert.equal(s.covered.of, s.courses.length)
  assert.ok(s.covered.graded <= s.covered.of)
  assert.ok(s.basis.measure === 'kernel' || s.basis.measure === 'structural')
})

test('an unmeasured level is still not a low one', () => {
  assert.equal(levelOf(0), 0)
  assert.equal(levelOf(-5), 0)
  assert.equal(bandOf(0), 'unmeasured')
  assert.equal(levelOf(1), 1)
  assert.equal(levelOf(99), 10)
})
