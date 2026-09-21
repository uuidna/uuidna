// restated-constant.test — THE CONTROL THE RULE NEVER HAD.
//
// Three times this session a rule for hunting a hand-written copy of a derived constant was written, run over the
// tree, reported clean, and was then out-written by a witness of the 2×7 rosetta who planted a spelling it could
// not see. The rule was not wrong by accident each time: it was shaped by the spellings that had ALREADY been
// reported, so it cured the instances and never the defect. The cure for that is here. Every spelling a witness
// found is planted below and the rule must catch it; the next one that gets past goes in here FIRST.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { restatesValue, derivedConstants, codeOnly, restatedConstants, evaluate, wordsFor } from './restated-constant.js'

// the spellings, in the order the waves found them. Each line is real: waves 2-4 of lead a5572638.
const CAUGHT: [string, string][] = [
  ['  lanes = 14,', 'wave 2: a parameter default in checker-queue'],
  ['export function upgrades(lanes = 14): Upgrade[] {', 'wave 2: a default in a signature'],
  ['const FACES = 14', 'wave 3: SHOUTED — the case-sensitive rule was blind to it'],
  ['  const { lanes = 14 } = opts', 'a destructured default'],
  ['  width: 14,', 'an object field'],
  ['  assert.equal(c.perLane.length, 14)', 'wave 4: a COMPARISON — no [:=] rule can ever see one'],
  ['  assert.equal(circuit.faces, 14)', 'wave 4: found live in qpu-hologram.test.ts'],
  ['  for (const o of out) assert.equal(o.answers.length, 14, "…")', 'wave 4: found live in directions'],
  ['  if (lanes === 14) return', 'strict equality, on a name the vocabulary knows'],
  ['  if (14 !== poolSize) throw new Error()', 'the comparison written the other way round'],
  ['  const maxLanes = 14', 'a capitalised suffix the \\b rule missed'],
  ['  const laneCount = 14', 'the vocabulary word not immediately before the ='],
  ['  const concurrentWidth = 14', 'a vocabulary the rule did not carry'],
  ['  const poolSize = 14', 'and one it never would have'],
]

// the near misses: a rule that fires on these is worse than none, because nobody trusts a finder that cries wolf
const IGNORED: [string, string][] = [
  ['  said: "the captain, 2026-09-14: ..."', 'a DATE — the single largest false positive, 7,605 of them'],
  ['  assert.equal(volume, 10 ** 14)', 'a power of ten'],
  ['  const n = 140', 'a longer numeral'],
  ['  const n = 0x14', 'hexadecimal'],
  ['  const n = 1.14', 'a decimal'],
  ['  const v14 = x', 'a numeral inside an identifier'],
  ['  const n = 214', 'a numeral ending in the value'],
  ['  const n = -14', 'a negative'],
  ['  if (x === 14) return', 'an ANONYMOUS comparison: nothing says WHICH constant, so attributing it would be a guess'],
  ['  maxBuffer: 32 * 1024 * 1024,', 'an OPERAND in a computation, not a value standing in for a constant'],
  ['  mutationMustFail(4 * 2 + 8 * 3 + 20 * 4 === boardTotal(K))', 'a chess tally: every numeral is a term'],
]

// the words a real run LEARNS for VE_FACES from the tree's own use of it (wordsFor), pinned here so the rule's
// mechanics are exercised independently of the learning. The learning has its own test below.
const WORDS = ['lanes', 'faces', 'width', 'concurrent', 'pool', 'perlane', 'circuit', 'answers', 'max']

test('the rule catches every spelling a witness found', () => {
  for (const [line, why] of CAUGHT) {
    assert.equal(restatesValue(line, 14, WORDS), true, `MISSED (${why}): ${line.trim()}`)
  }
})

// KNOWN MISS, asserted so it can never become an accident. The vocabulary lives in the callee here, not in any
// argument, and the clause that would catch it was measured to triple the tree's findings with pure noise. When a
// sharper form is found this case moves back into CAUGHT — that is what the list is for.
const KNOWN_MISS: [string, string][] = [
  ['  const a = laneWork(3, 14).map((u) => u.key)', 'wave 4: handed over positionally, vocabulary in the callee'],
]

test('the blind spot is DECLARED — it is a miss, not an oversight', () => {
  for (const [line, why] of KNOWN_MISS) {
    assert.equal(restatesValue(line, 14, WORDS), false,
      `this now PASSES (${why}) — move it into CAUGHT and delete it here: ${line.trim()}`)
  }
})

test('and fires on none of the near misses', () => {
  for (const [line, why] of IGNORED) {
    assert.equal(restatesValue(line, 14, WORDS), false, `FALSE POSITIVE (${why}): ${line.trim()}`)
  }
})

test('comments and strings are stripped, so prose ABOUT a width is never a freeze OF one', () => {
  const src = ['// the fourteen faces: lanes = 14 in prose', '/* lanes = 14 */', 'const msg = "lanes = 14"', 'const lanes = 14'].join('\n')
  const lines = codeOnly(src).split('\n').filter((l) => restatesValue(l, 14, WORDS))
  assert.equal(lines.length, 1, `only the declaration is code; the rest is prose. Got: ${JSON.stringify(lines)}`)
})

test('the grammar covers powers, parentheses and bare aliases', () => {
  // each shape was found missing by measuring the tree, never guessed: A432_HZ needs ** and (), SALT_BYTES is a
  // bare alias (the purest copy of all), and a constant derived FROM a derived constant must still resolve.
  const at = (n: string): number | null => ({ FOUR: 4, THREE: 3, TWO: 2 } as Record<string, number>)[n] ?? null
  assert.equal(evaluate('FOUR * (THREE ** TWO)', at), 36, 'powers and parentheses')
  assert.equal(evaluate('FOUR', at), 4, 'a bare alias is a derivation too')
  assert.equal(evaluate('TWO ** THREE ** TWO', at), 512, '** is right-associative: 2 ** (3 ** 2), never (2 ** 3) ** 2')
  assert.equal(evaluate('FOUR / THREE', at), null, 'a division that does not divide is refused, never rounded')
  assert.equal(evaluate('FOUR + MISSING', at), null, 'an unknown name refuses the whole declaration')
  assert.equal(evaluate('(() => 4)()', at), null, 'a function body is not arithmetic — refused, not guessed')
})

test('the scope is DERIVED constants — a literal has nothing to drift from', () => {
  const files = ['a.ts', 'b.ts']
  const text: Record<string, string> = {
    'a.ts': ['export const HEXBIT_BITS = 4', 'export const COINS = 2', 'export const HANDLE_HEXBITS = 8',
             'export const VE_FACES = HANDLE_HEXBITS + HEXBIT_BITS + COINS'].join('\n'),
    'b.ts': 'export const PLAIN = 9',
  }
  const found = derivedConstants(files, (f) => text[f]!)
  assert.equal(found.get('VE_FACES')?.value, 14, 'a constant derived from named constants resolves to its value')
  assert.equal(found.has('PLAIN'), false, 'a literal is not in scope: there is nothing for it to drift from')
  assert.equal(found.has('HEXBIT_BITS'), false, 'nor is a literal that others are derived from')
})

test('the vocabulary is LEARNED from the tree, never typed', () => {
  // VE_FACES is known by "lanes" because the tree writes `const lanes = VE_FACES` — the constant's siblings teach
  // what it is called, and a file that copied its numeral is then caught by their vocabulary.
  const text: Record<string, string> = {
    'decl.ts': ['export const A = 8', 'export const B = 6', 'export const W = A + B'].join('\n'),
    'uses.ts': 'import { W } from "./decl.js"\nconst lanes = W\nassert.equal(circuit.faces, W)',
  }
  const words = wordsFor('W', ['decl.ts', 'uses.ts'], (f) => text[f]!)
  assert.ok(words.includes('lanes'), `learned from \`const lanes = W\`; got ${JSON.stringify(words)}`)
  assert.ok(words.includes('faces'), `learned from \`assert.equal(circuit.faces, W)\`; got ${JSON.stringify(words)}`)
})

test('a file that reaches for the constant is not restating it', () => {
  const text: Record<string, string> = {
    'decl.ts': ['export const A = 8', 'export const B = 6', 'export const W = A + B'].join('\n'),
    'good.ts': 'import { W } from "./decl.js"\nconst lanes = W\nassert.equal(x, 14)',
    'bad.ts': 'const lanes = 14',
  }
  const hits = restatedConstants(['decl.ts', 'good.ts', 'bad.ts'], (f) => text[f]!)
  assert.deepEqual(hits.map((h) => h.file), ['bad.ts'],
    'good.ts names W, so its 14 is the constant being asserted against, not a copy carried in ignorance')
})

test('THE CONTROL ITSELF CAN FAIL — a rule that never fires proves nothing', () => {
  // the instrument is checked in both directions: the value it hunts is changed to one the lines do not carry,
  // and every one of them must then go quiet. Without this, a rule returning false forever would pass the suite.
  for (const [line] of CAUGHT) assert.equal(restatesValue(line, 99, WORDS), false, `the rule fires on 99 in: ${line.trim()}`)
})
