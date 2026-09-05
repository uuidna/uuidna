import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compress, decompress, bytesToBase64, base64ToBytes, tarEntries, PLATFORM_CODECS } from './index.js'
import { uuidnaExecAsync, CODEC_APPLETS } from '../exec/index.js'
import { sessionWrite, sessionRead } from '../session/index.js'

const enc = (s: string): Uint8Array => new TextEncoder().encode(s)
const dec = (b: Uint8Array): string => new TextDecoder().decode(b)

test('base64 here is the standard alphabet and an exact inverse, including the pad lengths', () => {
  for (const s of ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar']) {
    assert.equal(dec(base64ToBytes(bytesToBase64(enc(s)))!), s, `round trip failed for ${JSON.stringify(s)}`)
  }
  // RFC 4648 §10 vectors — the standard's answers, so this cannot be self-consistent and wrong together
  assert.equal(bytesToBase64(enc('f')), 'Zg==')
  assert.equal(bytesToBase64(enc('fo')), 'Zm8=')
  assert.equal(bytesToBase64(enc('foobar')), 'Zm9vYmFy')
  assert.equal(base64ToBytes('not base64 !!'), null, 'a character outside the alphabet is null, never a partial decode')
})

test('every platform codec round-trips, and the compressed form is not the input', async () => {
  const text = 'alpha beta gamma '.repeat(40)
  for (const codec of PLATFORM_CODECS) {
    const gz = await compress(enc(text), codec)
    assert.ok(gz.length < enc(text).length, `${codec} must actually compress a repetitive input`)
    assert.equal(dec(await decompress(gz, codec)), text, `${codec} round trip must be exact`)
  }
})

test('decompress THROWS on a member that is not the codec, rather than returning a prefix', async () => {
  await assert.rejects(() => decompress(enc('this is not gzip at all')), 'a silent partial decode is the failure this refuses')
})

test('tarEntries reads the header blocks and stops at the end-of-archive marker', () => {
  const body = 'contents here'
  const b = enc(body)
  const h = new Uint8Array(512)
  h.set(enc('hello.txt'), 0)
  h.set(enc(b.length.toString(8).padStart(11, '0') + '\0'), 124)
  h[156] = 0x30
  const tar = new Uint8Array(512 + 512 + 1024)
  tar.set(h, 0); tar.set(b, 512)
  const entries = tarEntries(tar)
  assert.deepEqual(entries, [{ name: 'hello.txt', size: 13, kind: 'file' }])
  assert.deepEqual(tarEntries(new Uint8Array(1024)), [], 'an archive of only padding has no members')
})

test('gzip writes a .gz beside the source, and gunzip returns exactly the original bytes', async () => {
  sessionWrite('/tmp/codec-src', 'alpha\nbeta\ngamma')
  const z = await uuidnaExecAsync('gzip /tmp/codec-src')
  assert.equal(z.ok, true)
  assert.deepEqual((z.data as { wrote: string[] }).wrote, ['/tmp/codec-src.gz'])
  assert.ok(sessionRead('/tmp/codec-src.gz'), 'the compressed member must be readable through the session')
  const back = await uuidnaExecAsync('gunzip /tmp/codec-src.gz')
  assert.equal(back.output.join('\n'), 'alpha\nbeta\ngamma', 'the round trip must be exact through the door')
})

test('zgrep takes its PATTERN first and its archive second, and finds every matching line', async () => {
  sessionWrite('/tmp/zg', 'alpha\nbeta\nalpha again')
  await uuidnaExecAsync('gzip /tmp/zg')
  const hits = await uuidnaExecAsync('zgrep alpha /tmp/zg.gz')
  assert.equal(hits.ok, true, 'reading the first operand as the archive was the bug this test was written for')
  assert.deepEqual(hits.output, ['alpha', 'alpha again'])
  assert.equal((await uuidnaExecAsync('zgrep zzz /tmp/zg.gz')).output.length, 0, 'no match is an empty answer')
})

test('a codec applet REFUSES with a stated reason — never with an empty message', async () => {
  sessionWrite('/tmp/not-gz', 'aGVsbG8=')
  const r = await uuidnaExecAsync('gunzip /tmp/not-gz')
  assert.equal(r.ok, false)
  assert.ok(r.output[0]!.length > 'gunzip: '.length, 'the platform throws blank here; the applet must say what it knows')
  assert.match(r.output[0]!, /not a valid gzip member/)
  const nb = await uuidnaExecAsync('gunzip !!!not-base64!!!')
  assert.match(nb.output[0]!, /not base64/)
})

test('the async door hands every non-codec applet straight to the synchronous one', async () => {
  const via = await uuidnaExecAsync('wc hello world')
  assert.deepEqual(via.output, ['1 2 11'], 'a text applet must not change shape by being awaited')
  for (const a of CODEC_APPLETS) assert.ok(a.length > 0)
  assert.equal(CODEC_APPLETS.includes('gzip' as never), true)
})
