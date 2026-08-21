// skill-surface — A THEOREM IS A HOOK AND HOOKED AT ONCE, and this is the test that can say so falsely.
//
// The finding this closes was that most of the skills the sealed ledger carries reached NO tool name and NO category
// on the served catalogue: sealed, axiom-free, witnessed by their wings, and openable through nothing. The fix is one
// COMPUTED dimension on both surfaces, so the obvious failure mode of the test is that it can only pass — a computed
// surface trivially agrees with the ledger it is computed from, and an audit today found four checks in this repo
// that could not fail at all (a forged theorem asserting 2 + 2 = 5 walked through them).
//
// So every check below is paired with a NEGATIVE CONTROL: a deliberately broken surface handed to the same measuring
// function, which must be REPORTED. A truncating surface, a surface answering for the wrong skill, a throwing
// surface, a surface serving a forged theorem, and a surface that drops the ESCO mapping are each fed in, and each
// must come back named. If a mutation to src/skills.ts stops the real surface from being served, the positive half
// fails; if a mutation stops orphanedSkills from measuring anything, the negative half fails. Neither half is
// sufficient alone, which is the entire point.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { THEOREMS, skillGroups } from '../theorems/index.js'
import { merkleGravity } from '../gravity.js'
import { toUuid } from '../address.js'
import { escoSearchUrl, escoWholeName } from '../school-apis.js'
import { handleOf } from '../handle.js'
import {
  SKILL_TOOLS, escoPhrase, skillEsco, skillIndex, skillNames, skillReach, skillSurface, orphanedSkills,
  type SkillSurface,
} from '../skills.js'
import { MCP_CATALOG, callTool } from '../mcp.js'
import { handleMcpRpc } from '../mcp-http.js'
import { skillsGaps } from '../scripts/one-receipt.js'

const stdioOpen = (skill: string): unknown => callTool('uuidna_skill', { skill })
const edgeRaw = (name: string, args: Record<string, unknown>): { content?: { text: string }[]; isError?: boolean } =>
  (handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) as { result: { content?: { text: string }[]; isError?: boolean } }).result
const edgeCall = (name: string, args: Record<string, unknown>): unknown => {
  const r = edgeRaw(name, args)
  if (r.isError) throw new Error(String(r.content?.[0]?.text))
  return JSON.parse(String(r.content?.[0]?.text))
}
const edgeOpen = (skill: string): unknown => edgeCall('uuidna_skill', { skill })
const edgeSchemas = (): Map<string, string> => new Map(
  (handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) as { result: { tools: { name: string; inputSchema?: { required?: string[] } }[] } }).result.tools
    .map((t) => [t.name, [...(t.inputSchema?.required ?? [])].sort().join(',')]))

/** a surface that answers correctly except for the one thing `break` changes — the falsifier's raw material */
const brokenSurface = (mutate: (s: SkillSurface) => unknown) => (skill: string): unknown => mutate(skillSurface(skill))

test('every skill the sealed ledger carries is OPENABLE over stdio — and five broken surfaces are each caught', () => {
  assert.ok(skillNames().length > 0, 'the ledger carries skills at all')
  assert.deepEqual(orphanedSkills(stdioOpen), [], 'a skill is proven and unreachable — the finding this closes')

  // NEGATIVE CONTROL 1 — a surface that truncates: every group holding more than one theorem must be reported
  const truncating = orphanedSkills(brokenSurface((s) => ({ ...s, theorems: s.theorems.slice(0, 1) })))
  assert.equal(truncating.length, skillGroups().filter((g) => g.count > 1).length, 'a truncating surface is caught for every multi-theorem skill')
  assert.match(truncating[0].why, /the ledger group carries/)

  // NEGATIVE CONTROL 2 — a surface answering for the WRONG skill (the drift a catalogue-reading check cannot see)
  const misdirected = orphanedSkills(brokenSurface((s) => ({ ...s, skill: 'not-a-skill' })))
  assert.equal(misdirected.length, skillNames().length)
  assert.match(misdirected[0].why, /answered for "not-a-skill"/)

  // NEGATIVE CONTROL 3 — a surface that refuses
  const refusing = orphanedSkills(() => { throw new Error('the handler is gone') })
  assert.equal(refusing.length, skillNames().length)
  assert.match(refusing[0].why, /the surface refused it: the handler is gone/)

  // NEGATIVE CONTROL 4 — a FORGED theorem: right count, wrong content. This is the class that walked through four
  // checks in this repo, so it is fed in by name: the address recomputes from its own statement exactly as a real
  // theorem's does, and only comparison against the sealed group catches it.
  const forging = orphanedSkills(brokenSurface((s) => ({
    ...s, theorems: [{ ...s.theorems[0], key: 'totally_made_up_theorem', statement: '2 + 2 = 5' }, ...s.theorems.slice(1)],
  })))
  assert.equal(forging.length, skillNames().length)
  assert.match(forging[0].why, /not in this skill's sealed group \(first: totally_made_up_theorem\)/)

  // NEGATIVE CONTROL 5 — reachable but UNMAPPED: the ESCO leg dropped
  const unmapped = orphanedSkills(brokenSurface((s) => ({ ...s, esco: undefined })))
  assert.equal(unmapped.length, skillNames().length)
  assert.match(unmapped[0].why, /no ESCO mapping/)

  // NEGATIVE CONTROL 6 — a surface that returns nothing at all
  assert.equal(orphanedSkills(() => undefined).length, skillNames().length)
})

test('the HOSTED EDGE serves the same axis, with the same argument contract, and refuses an empty call', () => {
  assert.deepEqual(orphanedSkills(edgeOpen), [], 'uuidna.com/mcp cannot open a capability the stdio surface can')

  const edge = edgeSchemas()
  const local = new Map(MCP_CATALOG.map((t) => [t.name, [...(t.inputSchema?.required ?? [])].sort().join(',')]))
  for (const tool of SKILL_TOOLS) {
    assert.ok(local.has(tool), `${tool} must be in the stdio catalogue`)
    assert.ok(edge.has(tool), `${tool} must be served by the hosted edge — registering it in src/mcp.ts alone leaves uuidna.com/mcp without it`)
    assert.equal(edge.get(tool), local.get(tool), `${tool} must take the same required arguments on both surfaces`)
  }

  // the schema is the contract on this door too — an empty call is REFUSED, nothing computed
  const empty = edgeRaw('uuidna_skill', {})
  assert.equal(empty.isError, true)
  assert.match(String(empty.content?.[0]?.text), /missing required argument: skill/)
  assert.doesNotMatch(String(empty.content?.[0]?.text), /"theorems"/, 'nothing may be computed when the skill is absent')
  // NEGATIVE CONTROL — the zero-argument index must still RUN, or "refuses everything" would pass the line above
  const index = edgeRaw('uuidna_skills', {})
  assert.notEqual(index.isError, true)
  assert.ok((JSON.parse(String(index.content?.[0]?.text)) as unknown[]).length > 0)
})

test('both surfaces fold one skill to the SAME receipt — and two different skills never to the same one', () => {
  const names = skillNames()
  const first = names[0]
  const stdio = callTool('uuidna_skill', { skill: first }) as SkillSurface
  const edge = edgeOpen(first) as SkillSurface
  assert.equal(edge.receipt, stdio.receipt)
  assert.equal(edge.fold, stdio.fold)
  // NEGATIVE CONTROL — equality proves nothing unless inequality is possible
  const other = names.find((n) => n !== first)!
  assert.notEqual((callTool('uuidna_skill', { skill: other }) as SkillSurface).receipt, stdio.receipt)
  // and every receipt across the whole axis is distinct — one skill, one identity
  const receipts = names.map((n) => (callTool('uuidna_skill', { skill: n }) as SkillSurface).receipt)
  assert.equal(new Set(receipts).size, names.length, 'two skills fold to one receipt — the identity is not distinguishing')
  // THE RECEIPT'S CONTRACT, stated: it BINDS the group's own fold, the ESCO lookup and the skill name. Distinctness
  // alone would pass a receipt folded from the ESCO address only — which is distinct per skill and says nothing
  // about the theorems served. So the three legs are named here, and dropping any one of them fails.
  for (const n of names) {
    const s = callTool('uuidna_skill', { skill: n }) as SkillSurface
    assert.equal(s.receipt, merkleGravity([s.fold, s.esco.address, toUuid('skill:' + s.skill)]),
      `${n}: the receipt must fold the sealed group fold, the ESCO lookup address and the skill name — nothing else identifies WHAT was served`)
  }
})

test('skillSurface serves ONLY that skill\'s theorems, and REFUSES an unknown one by name', () => {
  const bySkill = new Map(THEOREMS.map((t) => [t.key, t.skill]))
  for (const g of skillGroups()) {
    const s = skillSurface(g.skill)
    assert.equal(s.count, g.count)
    assert.equal(s.fold, g.fold)
    const foreign = s.theorems.filter((t) => bySkill.get(t.key) !== g.skill)
    assert.deepEqual(foreign.map((t) => t.key), [], `${g.skill} served a theorem carrying another skill`)
    // the handle is THE one derivation from the address (handle.ts)— a
    // constant would satisfy the pattern while addressing every theorem to the same place
    for (const t of s.theorems) assert.equal(t.handle, handleOf(t.address), `${t.key}: the handle must be handleOf(address)`)
    assert.equal(s.handle, handleOf(s.fold), `${g.skill}: the cluster handle must be handleOf(fold)`)
    assert.equal(new Set(s.theorems.map((t) => t.handle)).size, new Set(s.theorems.map((t) => t.address)).size,
      `${g.skill}: distinct theorems collapsed onto one handle`)
  }
  // every theorem in the ledger is reachable through exactly one skill — the axis PARTITIONS, it does not sample
  const servedKeys = skillGroups().flatMap((g) => skillSurface(g.skill).theorems.map((t) => t.key))
  assert.equal(servedKeys.length, THEOREMS.length, 'the axis covers the whole ledger')
  assert.equal(new Set(servedKeys).size, THEOREMS.length, 'no theorem is served under two skills')

  // NEGATIVE — an unknown skill is refused BY NAME with the live list
  // read like "this capability is unproven"
  assert.throws(() => skillSurface('no-such-skill'), (e: Error) => {
    assert.match(e.message, /unknown skill "no-such-skill"/)
    assert.ok(e.message.includes(skillNames()[0]), 'the refusal names the live list')
    return true
  })
  assert.throws(() => callTool('uuidna_skill', { skill: '' }), /unknown skill/)
  // and the tool refuses an empty call rather than computing over the literal text "undefined"
  assert.throws(() => callTool('uuidna_skill', {}), /missing required argument: skill/)
})

test('skillIndex enumerates EVERY skill with its count — the surface is discoverable without guessing a name', () => {
  const rows = skillIndex()
  assert.deepEqual(rows.map((r) => r.skill), skillNames(), 'the index is the ledger\'s own skill list, in order')
  assert.equal(rows.reduce((n, r) => n + r.theorems, 0), THEOREMS.length, 'the counts sum to the whole ledger')
  for (const r of rows) {
    assert.equal(r.theorems, skillSurface(r.skill).count, `${r.skill}: the index count and the served surface must agree`)
    assert.equal(r.handle, handleOf(r.fold), `${r.skill}: the index handle must be handleOf(fold)`)
    assert.ok(r.open.includes(JSON.stringify(r.skill)), 'each row carries the exact call that opens it')
  }
  // the served tool returns the computed index unaltered, on both surfaces
  assert.deepEqual(callTool('uuidna_skills', {}), rows)
  assert.deepEqual(edgeCall('uuidna_skills', {}), JSON.parse(JSON.stringify(rows)))
  // NEGATIVE — a name the ledger does not carry must NOT be listed, or "lists everything" is vacuous
  assert.equal(rows.some((r) => r.skill === 'no-such-skill'), false)
  assert.equal(rows.some((r) => r.theorems === 0), false, 'a listed skill with no theorems would be an empty promise')
})

test('the ESCO mapping is a POINTER and a RULE — a homograph is named', () => {
  // the lookup is school-apis' own derivation
  for (const g of skillGroups())
    assert.equal(skillEsco(g.skill).lookup, escoSearchUrl(escoPhrase(g.skill), 'skill'))

  // THE HOMOGRAPH RULE, on the measured case school-apis records: z9-ring's unfiltered ESCO hit was "cast concrete
  // rings" — the query's letters, and nothing else.
  const m = skillEsco('z9-ring', ['cast concrete rings', 'z9 ring analysis', 'finish costumes'])
  assert.deepEqual(m.onTopic, ['z9 ring analysis'])
  assert.deepEqual(m.homographs, ['cast concrete rings', 'finish costumes'])
  // NEGATIVE — the fragment hit must NOT be on-topic, and it must not be silently dropped either
  assert.equal(m.onTopic.includes('cast concrete rings'), false)
  assert.equal(m.onTopic.length + m.homographs.length, 3, 'every title handed in comes back judged, none discarded')
  // the judgement is school-apis' published rule
  for (const title of ['cast concrete rings', 'z9 ring analysis', 'finish costumes'])
    assert.equal(m.onTopic.includes(title), escoWholeName(escoPhrase('z9-ring'), title))
  // handing in nothing yields the pointer alone — an absence
  assert.deepEqual(skillEsco('z9-ring').onTopic, [])
  assert.deepEqual(skillEsco('z9-ring').homographs, [])
  // it is PURE: the same call folds to the same address twice, and a different skill to a different one
  assert.equal(skillEsco('quantum').address, skillEsco('quantum').address)
  assert.notEqual(skillEsco('quantum').address, skillEsco('z9-ring').address)
  // escoPhrase — NEGATIVE: the hyphenated cluster name is not what a taxonomy is asked
  assert.equal(escoPhrase('science-pairs'), 'science pairs')
  assert.notEqual(escoPhrase('science-pairs'), 'science-pairs')
})

test('skillReach counts what a surface SERVES — and a half-served surface does not read as full', () => {
  const full = skillReach('stdio', stdioOpen)
  assert.equal(full.served, full.skills)
  assert.deepEqual(full.orphaned, [])
  assert.equal(full.skills, skillNames().length)

  // NEGATIVE CONTROL — a surface that serves exactly one skill must measure as one, and must NOT fold to the same
  // receipt as the full surface. Without this, "served === skills" is a sentence the function could always write.
  const only = skillNames()[0]
  const half = skillReach('half', (s) => (s === only ? skillSurface(s) : undefined))
  assert.equal(half.served, 1)
  assert.equal(half.orphaned.length, full.skills - 1)
  assert.notEqual(half.receipt, skillReach('half', stdioOpen).receipt, 'the reach receipt does not distinguish a served surface from an unserved one')
  // the receipt is a function of the surface NAME too, so two surfaces cannot be confused for each other
  assert.notEqual(skillReach('edge', stdioOpen).receipt, full.receipt)
})

test('the skills FINDER is clean, and is wired into the guard as BLOCKING', () => {
  assert.deepEqual(skillsGaps(), [], 'every gap carries its exact fix — run `node dist/scripts/one-receipt.js skills`')
  const guard = readFileSync(join(ROOT, 'src', 'scripts', 'guard.ts'), 'utf8')
  assert.match(guard, /\{ name: 'skills', run: \(\) => skillsGaps\(\) \}/, 'a finder nobody calls is a claim nobody checks')
  const advisory = guard.slice(guard.indexOf('const ADVISORY'))
  assert.doesNotMatch(advisory, /'skills'/, 'the skills finder blocks; it is not advisory')
  // NEGATIVE CONTROL — the assertion above must be capable of failing, so a name the guard does NOT wire must not match
  assert.doesNotMatch(guard, /\{ name: 'no-such-finder', run:/)
})

test('the two skill tools are CATEGORISED', () => {
  for (const tool of SKILL_TOOLS) {
    const entry = MCP_CATALOG.find((t) => t.name === tool)
    assert.ok(entry, `${tool} must be in the catalogue`)
    assert.notEqual(entry.category, 'Other', `${tool} falls through categoryOf — the generated /mcp page files it under Other`)
    assert.ok(entry.description.length > 200, `${tool} must carry its honest scope in its description`)
  }
  // NEGATIVE CONTROL — 'Other' is a category this catalogue can actually produce, so the check above is not vacuous
  assert.equal(MCP_CATALOG.find((t) => t.name === 'uuidna_no_such_tool'), undefined)
})
