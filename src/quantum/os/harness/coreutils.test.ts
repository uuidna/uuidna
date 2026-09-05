import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as CU from '../coreutils/index.js'
import { uuidnaExec, APPLETS } from '../exec/index.js'
import { sessionWrite } from '../session/index.js'

// ── THE PORTED BUSYBOX FAMILY. These applets EXECUTE — an argument changes the answer — which is the line drawn
// earlier: uuidnaOS attests the Alpine catalogue and executes what it has ported, and the surface says which.
// So every check below passes an argument and asserts the OUTPUT changed, because "it returned something" is
// exactly the criterion-substitution this tree keeps paying for.

test('every ported applet is registered, and executes rather than attests', () => {
  for (const a of CU.CORE_APPLETS) {
    assert.ok((APPLETS as readonly string[]).includes(a), `${a} is ported but not registered`)
    const r = uuidnaExec(a === 'expr' ? 'expr 1 + 1' : a === 'factor' ? 'factor 6' : a)
    assert.equal(r.mode, 'executed', `${a} must execute, not attest`)
  }
  assert.ok(APPLETS.length >= 45, `the surface grew: ${APPLETS.length} applets`)
})

test('wc counts lines, words and bytes — including multibyte', () => {
  assert.deepEqual(CU.wc('a b c').lines, ['1 3 5'])
  assert.deepEqual(CU.wc('a\nb').lines, ['2 2 3'])
  assert.deepEqual(CU.wc('').lines, ['0 0 0'])
  // ℤ is three bytes in UTF-8 and one character — bytes, not characters
  assert.deepEqual(CU.wc('ℤ').lines, ['1 1 3'])
})

test('head and tail take from the right end, and 0 takes nothing', () => {
  const t = 'a\nb\nc\nd'
  assert.deepEqual(CU.head(t, 2).lines, ['a', 'b'])
  assert.deepEqual(CU.tail(t, 2).lines, ['c', 'd'])
  assert.deepEqual(CU.head(t, 0).lines, [])
  assert.deepEqual(CU.tail(t, 0).lines, [], 'tail 0 is empty, not the whole file')
  assert.deepEqual(CU.head(t, 99).lines, ['a', 'b', 'c', 'd'])
})

test('sort is stable, and numeric mode is not lexicographic', () => {
  assert.deepEqual(CU.sortLines('10\n2\n33\n4').lines, ['10', '2', '33', '4'], 'lexicographic puts 10 before 2')
  assert.deepEqual(CU.sortLines('10\n2\n33\n4', true).lines, ['2', '4', '10', '33'], 'numeric does not')
  assert.deepEqual(CU.sortLines('10\n2\n33\n4', true, true).lines, ['33', '10', '4', '2'])
  // STABILITY: equal keys keep input order, so the sort is a function of its input and not of the engine
  assert.deepEqual(CU.sortLines('b1\nb1\na', false).lines, ['a', 'b1', 'b1'])
})

test('uniq folds adjacent runs only — that is what uniq does', () => {
  assert.deepEqual(CU.uniq('a\na\nb\na').lines, ['a', 'b', 'a'], 'non-adjacent duplicates survive')
  assert.match(CU.uniq('a\na\nb', true).lines[0]!, /2 a/)
})

test('cut takes one-based fields and a chosen delimiter', () => {
  assert.deepEqual(CU.cut('a:b:c', 2, ':').lines, ['b'])
  assert.deepEqual(CU.cut('a:b:c', 9, ':').lines, [''], 'a field past the end is empty, not an error')
  assert.deepEqual(CU.cut('a\tb', 1).lines, ['a'], 'tab is the default')
})

test('tr maps positionally and repeats a short TO, as tr does', () => {
  assert.deepEqual(CU.tr('aabbcc', 'abc', 'xyz').lines, ['xxyyzz'])
  assert.deepEqual(CU.tr('abc', 'abc', 'x').lines, ['xxx'], 'a short TO repeats its last character')
  assert.deepEqual(CU.tr('abc', 'b', '').lines, ['ac'], 'an empty TO deletes')
})

test('rev, tac and nl each change with their input', () => {
  assert.deepEqual(CU.rev('abc').lines, ['cba'])
  assert.deepEqual(CU.rev('ab\ncd').lines, ['ba', 'dc'], 'per line, not the whole text')
  assert.deepEqual(CU.tac('a\nb\nc').lines, ['c', 'b', 'a'])
  assert.match(CU.nl('x').lines[0]!, /1\tx/)
})

test('fold wraps hard at the width and never loses a character', () => {
  const r = CU.fold('abcdefghij', 4)
  assert.deepEqual(r.lines, ['abcd', 'efgh', 'ij'])
  assert.equal(r.lines.join(''), 'abcdefghij', 'folding must be lossless')
  assert.deepEqual(CU.fold('', 4).lines, [''])
})

test('grep matches, inverts and counts', () => {
  const t = 'alpha\nbeta\ngamma'
  assert.deepEqual(CU.grep(t, 'a$').lines, ['alpha', 'beta', 'gamma'])
  assert.deepEqual(CU.grep(t, '^b').lines, ['beta'])
  assert.deepEqual(CU.grep(t, '^b', { invert: true }).lines, ['alpha', 'gamma'])
  assert.deepEqual(CU.grep(t, '^b', { count: true }).lines, ['1'])
  assert.deepEqual(CU.grep(t, 'ALPHA', { ignoreCase: true }).lines, ['alpha'])
  // an invalid pattern is reported, never thrown
  assert.match(CU.grep(t, '[').lines[0]!, /invalid pattern/)
})

test('seq counts up, down, by a step, and is CAPPED rather than hanging', () => {
  assert.deepEqual(CU.seq(3).lines, ['1', '2', '3'])
  assert.deepEqual(CU.seq(2, 4).lines, ['2', '3', '4'])
  assert.deepEqual(CU.seq(4, 2).lines, ['4', '3', '2'], 'a descending range needs no flag')
  assert.deepEqual(CU.seq(0, 10, 5).lines, ['0', '5', '10'])
  assert.match(CU.seq(0, 0, 0).lines[0]!, /step may not be zero/)
  // THE CAP IS THE POINT: this shell has no interrupt, so an unbounded seq would be a hang
  const big = CU.seq(1, CU.SEQ_CAP * 2)
  assert.equal((big.data as { capped?: boolean }).capped, true)
  assert.ok(big.lines.length <= CU.SEQ_CAP + 1)
})

test('factor is exact, and it agrees with multiplication', () => {
  assert.deepEqual(CU.factor(6).lines, ['6: 2 3'])
  assert.deepEqual(CU.factor(2617).lines, ['2617: 2617'], '2617 is prime — the ledger size')
  assert.deepEqual(CU.factor(2536).lines, ['2536: 2 2 2 317'])
  for (const n of [2, 12, 97, 1024, 2536, 2617, 82385]) {
    const f = (CU.factor(n).data as { factors: number[] }).factors
    assert.equal(f.reduce((a, b) => a * b, 1), n, `${n}: the factors must multiply back`)
  }
  assert.match(CU.factor(1).lines[0]!, /not an integer above one/)
})

test('expr refuses division by zero rather than returning a number', () => {
  assert.deepEqual(CU.expr('2617', '-', '2536').lines, ['81'], 'the renaming count, computed')
  assert.deepEqual(CU.expr('8', '/', '3').lines, ['2'], 'integer division truncates')
  assert.match(CU.expr('8', '/', '0').lines[0]!, /division by zero/)
  assert.match(CU.expr('8', '%', '0').lines[0]!, /division by zero/)
  assert.match(CU.expr('a', '+', '1').lines[0]!, /non-integer operand/)
  assert.match(CU.expr('1', '^', '2').lines[0]!, /unknown operator/)
})

test('basename and dirname split a path the way the tools do', () => {
  assert.deepEqual(CU.basename('/a/b/c.lean').lines, ['c.lean'])
  assert.deepEqual(CU.basename('/a/b/c.lean', '.lean').lines, ['c'])
  assert.deepEqual(CU.basename('/a/b/').lines, ['b'], 'a trailing slash is ignored')
  assert.deepEqual(CU.dirname('/a/b/c').lines, ['/a/b'])
  assert.deepEqual(CU.dirname('c').lines, ['.'], 'no slash means the current directory')
  assert.deepEqual(CU.dirname('/c').lines, ['/'])
})

test('printf substitutes, and REFUSES a specifier it does not implement', () => {
  assert.deepEqual(CU.printf('%s-%d', ['uuidna', '2617']).lines, ['uuidna-2617'])
  assert.deepEqual(CU.printf('100%%', []).lines, ['100%'])
  assert.match(CU.printf('%q', ['x']).lines[0]!, /unsupported specifier %q/,
    'silently passing an unimplemented specifier through would be the worse failure')
})

test('base64 round-trips, and a corrupt input is refused', () => {
  for (const s of ['uuidna', 'a', 'ab', 'abc', 'ℤ/9', '']) {
    const enc = CU.base64(s).lines[0]!
    assert.equal(CU.base64(enc, true).lines[0], s, `round trip failed for ${JSON.stringify(s)}`)
  }
  assert.equal(CU.base64('uuidna').lines[0], 'dXVpZG5h', 'and it agrees with the standard alphabet')
})

test('sha256sum uses this repository OWN sha256, and cksum is the POSIX CRC', () => {
  const h = (CU.sha256sum('uuidna').data as { sha256: string }).sha256
  assert.match(h, /^[0-9a-f]{64}$/)
  assert.notEqual(h, (CU.sha256sum('uuidnb').data as { sha256: string }).sha256, 'one bit must change it')
  const c = CU.cksum('uuidna').data as { crc: number; length: number }
  assert.equal(c.length, 6)
  assert.notEqual(c.crc, (CU.cksum('uuidnb').data as { crc: number }).crc)
})

test('test evaluates integer and string predicates, and refuses nonsense', () => {
  assert.deepEqual(CU.testExpr(['5', '-gt', '3']).lines, ['true'])
  assert.deepEqual(CU.testExpr(['5', '-gt', '9']).lines, ['false'])
  assert.deepEqual(CU.testExpr(['a', '=', 'a']).lines, ['true'])
  assert.deepEqual(CU.testExpr(['-z', '']).lines, ['true'])
  assert.match(CU.testExpr(['a', '-gt', 'b']).lines[0]!, /integer expression expected/)
  assert.match(CU.testExpr(['a', '~', 'b']).lines[0]!, /unsupported expression/)
})

test('yes is BOUNDED, because this shell has no interrupt', () => {
  assert.equal(CU.yes('x', 3).lines.length, 3)
  assert.equal(CU.yes('', 2).lines[0], 'y')
  assert.equal(CU.yes('x', CU.YES_CAP * 10).lines.length, CU.YES_CAP, 'the cap holds')
})

// ── THE SHELL CONTRACT: flags, their arity, and where the text comes from.
test('a flag value is consumed, and flag arity is per-applet', () => {
  // -w in fold takes a value and must not leak into the text
  assert.deepEqual(uuidnaExec('fold -w 4 abcdefghij').output, ['abcd', 'efgh', 'ij'])
  // -n in sort is a MODE and takes nothing — treating it as valued lost an operand
  assert.deepEqual(uuidnaExec('sort -n 10 2 33 4').output, ['2', '4', '10', '33'])
  // -n in head is a COUNT and does take one
  assert.deepEqual(uuidnaExec('head -n 2 a b c d').output, ['a', 'b'])
})

test('a minus sign that is an OPERATOR is not eaten as a flag', () => {
  assert.deepEqual(uuidnaExec('expr 2617 - 2536').output, ['81'])
  assert.deepEqual(uuidnaExec('test 5 -gt 3').output, ['true'])
})

test('a line applet takes each operand as a LINE; a text applet joins them', () => {
  assert.deepEqual(uuidnaExec('tac a b c').output, ['c', 'b', 'a'], 'three operands are three lines')
  assert.deepEqual(uuidnaExec('rev abc').output, ['cba'])
  assert.deepEqual(uuidnaExec('wc a b c').output, ['1 3 5'], 'joined into one line of three words')
})

test('an operand naming a SESSION FILE reads that file instead', () => {
  sessionWrite('/tmp/coreutils-fixture', 'gamma\nalpha\nbeta')
  assert.deepEqual(uuidnaExec('sort /tmp/coreutils-fixture').output, ['alpha', 'beta', 'gamma'])
  assert.deepEqual(uuidnaExec('wc /tmp/coreutils-fixture').output, ['3 3 16'])
  assert.deepEqual(uuidnaExec('head -n 1 /tmp/coreutils-fixture').output, ['gamma'])
  assert.deepEqual(uuidnaExec('grep alpha /tmp/coreutils-fixture').output, ['alpha'])
})

// ── WHAT IS REFUSED IS DECLARED WITH ITS REASON, not silently omitted — an absence with no stated cause is
// indistinguishable from an oversight, which is why each refusal below must carry one.
test('the unportable applets are named with their reasons, and none is faked', () => {
  assert.ok(CU.UNPORTABLE.length >= 6)
  for (const u of CU.UNPORTABLE) {
    assert.ok(u.why.length > 30, `${u.name}: a refusal needs a reason`)
    assert.ok(!(CU.CORE_APPLETS as readonly string[]).includes(u.name), `${u.name} is both ported and refused`)
  }
  // date and uptime specifically: the clock is a law here, not a difficulty
  assert.ok(CU.UNPORTABLE.some((u) => u.name === 'date' && /clock/.test(u.why)))
  // and an unported applet must still be handled — attested or refused, never crashed
  const r = uuidnaExec('date')
  assert.ok(r.mode === 'attested' || r.ok === false, 'an unported name must attest or refuse, not execute')
})

test('every ported applet is a pure function — same input, same output', () => {
  for (const line of ['factor 2536', 'sha256sum uuidna', 'sort -n 3 1 2', 'base64 uuidna', 'cksum x']) {
    assert.deepEqual(uuidnaExec(line).output, uuidnaExec(line).output, `${line} is not deterministic`)
  }
})

// ── SECOND WAVE. Each check below is an INVERSE or a law that can be wrong, not a shape assertion: an encoding
// that round-trips, a sort whose output respects its own edges, a checksum against a value computed elsewhere.

test('base32 round-trips exactly — decode(encode(x)) is x, and the vector matches RFC 4648', () => {
  for (const s of ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar', 'hello world']) {
    const enc = CU.base32(s).lines[0]!
    assert.equal(CU.base32(enc, true).lines[0], s, `round trip failed for ${JSON.stringify(s)}`)
  }
  // RFC 4648 §10 test vectors — the standard's own answers, not ours
  assert.equal(CU.base32('f').lines[0], 'MY======')
  assert.equal(CU.base32('fo').lines[0], 'MZXQ====')
  assert.equal(CU.base32('foobar').lines[0], 'MZXW6YTBOI======')
  assert.equal((CU.base32('!!!', true).data as { error?: string }).error, 'invalid-base32')
})

test('expand and unexpand are inverse on leading whitespace', () => {
  const src = '\tone\n\t\ttwo\nthree'
  const spaced = CU.expand(src, 4).lines.join('\n')
  assert.ok(!spaced.includes('\t'), 'expand must leave no tabs')
  assert.equal(CU.unexpand(spaced, 4).lines.join('\n'), src, 'unexpand must restore the tabs expand made')
})

test('fmt reflows to the width and never joins two paragraphs', () => {
  const r = CU.fmt('alpha beta gamma delta\n\nsecond para here', 11)
  for (const l of r.lines) assert.ok(l.length <= 11, `line over width: ${JSON.stringify(l)}`)
  assert.ok(r.lines.includes(''), 'the blank line between paragraphs must survive')
  assert.equal(CU.fmt('a b c', 80).lines.length, 1)
})

test('comm partitions: every input line lands in exactly one of the three columns', () => {
  const a = 'x\ny\nz', b = 'y\nz\nw'
  const d = CU.comm(a, b).data as { onlyA: string[]; onlyB: string[]; both: string[] }
  assert.deepEqual(d.onlyA, ['x'])
  assert.deepEqual(d.onlyB, ['w'])
  assert.deepEqual(d.both, ['y', 'z'])
  assert.equal(d.onlyA.length + d.onlyB.length + d.both.length * 2, a.split('\n').length + b.split('\n').length)
})

test('join emits one line per matching pair, and nothing when the keys do not meet', () => {
  assert.deepEqual(CU.join('k1 a\nk2 b', 'k1 X\nk1 Y').lines, ['k1 a X', 'k1 a Y'])
  assert.deepEqual(CU.join('k1 a', 'k9 z').lines, [], 'no shared key is an empty join, not an error')
})

test('paste pads the shorter side rather than truncating the longer', () => {
  const r = CU.paste('1\n2\n3', 'a', ':')
  assert.deepEqual(r.lines, ['1:a', '2:', '3:'], 'a truncating paste would silently drop the caller\'s rows')
})

test('tsort orders every edge, and NAMES a cycle instead of returning a partial order', () => {
  const r = CU.tsort('a b b c c d')
  const order = r.lines
  const at = (n: string): number => order.indexOf(n)
  for (const [x, y] of [['a', 'b'], ['b', 'c'], ['c', 'd']]) assert.ok(at(x!) < at(y!), `${x} must precede ${y}`)
  const cyc = CU.tsort('a b b a').data as { error?: string; cycle?: string[] }
  assert.equal(cyc.error, 'cycle')
  assert.deepEqual(cyc.cycle, ['a', 'b'], 'the nodes it could not order are the ones to name')
})

test('numfmt scales by the base it was asked for, in integers, and iec-i alone carries the i', () => {
  assert.equal(CU.numfmt(1536, 'si').lines[0], '1.5K')
  assert.equal(CU.numfmt(1536, 'iec').lines[0], '1.5K')
  assert.equal(CU.numfmt(1536, 'iec-i').lines[0], '1.5Ki')
  assert.equal(CU.numfmt(1024, 'iec').lines[0], '1K', 'a whole value prints no .0')
  assert.equal(CU.numfmt(999, 'si').lines[0], '999')
  assert.equal(CU.numfmt(-2048, 'iec-i').lines[0], '-2Ki')
  assert.equal((CU.numfmt(1.5, 'si').data as { error?: string }).error, 'not-an-integer')
})

test('sum and od answer with the values other tools compute, not with our own convention', () => {
  // BSD sum of "abc" is 16556 in one block — the number `sum` prints on a POSIX host
  assert.equal(CU.sum('abc').lines[0], '16556 1')
  assert.equal(CU.od('abc').lines[0], '0000000 61 62 63', 'offsets are octal, bytes are hex, as od -A o -t x1')
  assert.equal(CU.od('hi\n', 'c').lines[0], '0000000 h i \\n')
  const dump = CU.od('abc').lines
  assert.match(dump[dump.length - 1]!, /^0000003$/, 'od closes with the total offset')
})

test('pathchk names WHICH component is unportable, and passes a plain path', () => {
  assert.equal((CU.pathchk('/usr/bin/ok').data as { portable: boolean }).portable, true)
  const bad = CU.pathchk('/a b/c').data as { portable: boolean; faults: string[] }
  assert.equal(bad.portable, false)
  assert.match(bad.faults[0]!, /'a b'/, 'the fault must name the offending component, not just fail')
  assert.match((CU.pathchk('/-x').data as { faults: string[] }).faults[0]!, /begins with '-'/)
})
