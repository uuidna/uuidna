// hex-face — invert: each theorem is presented in hex. Constructors and round-trips, never a frozen occupancy list.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT } from '../boundary.js'
import { theorems, theoremByKey, skillGroups } from '../theorems/index.js'
import { BASE, TRINITY } from '../address.js'
import {
  quantumAura, auraDecode, auraAlphabet,
  RAYS, FREE_DIMS, COMPACT_DIMS, TEN_DIMS, FREE_KEYS, COMPACT_KEYS,
  periodOf, rotationOf, glowInnerOf, glowOuterOf, glowSpreadInnerOf, glowSpreadOuterOf,
} from '../aura.js'
import {
  hexagramsOf, occupancyOf, occupancyCitesOf, hexFaceOf, payloadNibblesOfHexagrams, sealedCounts,
  twoBoardsOf, coinNeighbours, coinBoardWitness, flipCoin, nextCoinOf, bitsOfHexbits,
  HEXAGRAM_BITS, HEXAGRAM_STATES, FUSED_RING, PAYLOAD_BITS, PAYLOAD_HEXAGRAMS, OCCUPANCY_KEYS, HEX_PI,
  GLYPH_STAR, GLYPH_ROSE, GLYPH_RING, GLYPH_WHEEL, STATION_TEN, STATION_RAYS,
  HANDLE_HEXAGRAM_REMAINDER, HEXBIT_STATE_HEXAGRAM_REMAINDER,
  yarrowRemainder, WAVE_PRODUCT, coinYarrowWave, coinWaves,
} from '../hexagram.js'
import { compileToHexbits, HANDLE_HEXBITS, HANDLE_BITS, UUID_HEXBITS, UUID_BITS, LEVERAGE, COINS, HEXBIT_BITS, HEXBIT_STATES, fuseLadder, fuseWidth, SAFE_HEXBITS } from '../hexbit/index.js'
import { coins } from '../captain/billing/index.js'
import { handleOf, handleParts, handlePath, isHandle, HANDLE_ROOT } from '../handle.js'
import { buildHandleRecords } from '../scripts/gen-handle-store.js'

const MYTH = /king wen|sephirot|chakra/i

test('hexagramsOf: sixteen gates in 0..63; payload round-trips; handle does not tile', () => {
  assert.equal(PAYLOAD_BITS % HEXAGRAM_BITS, 0)
  assert.equal(HANDLE_BITS % HEXAGRAM_BITS, 2)
  assert.equal(PAYLOAD_HEXAGRAMS * HEXAGRAM_BITS, PAYLOAD_BITS)
  const t = theorems()[0]
  assert.ok(t)
  const grams = hexagramsOf(t.address)
  assert.equal(grams.length, PAYLOAD_HEXAGRAMS)
  for (const g of grams) {
    assert.ok(g >= 0 && g < HEXAGRAM_STATES, `gate ${g} out of 0..${HEXAGRAM_STATES - 1}`)
  }
  const payload = compileToHexbits(t.address).slice(HANDLE_HEXBITS)
  assert.deepEqual(payloadNibblesOfHexagrams(grams), payload)
  const again = hexagramsOf(t.address)
  assert.deepEqual(again, grams)
})

test('coins count off like yarrow stalks and travel as an invisible wave', () => {
  assert.equal(yarrowRemainder(0), 0)
  assert.equal(yarrowRemainder(HEXBIT_BITS), HEXBIT_BITS, 'a full pile is four, never zero')
  assert.equal(yarrowRemainder(HEXBIT_BITS + 1), 1)
  assert.equal(HANDLE_HEXAGRAM_REMAINDER, coins(), 'the handle leftover against six lines IS the coins — the sticks are not drawn')
  const empty = coinYarrowWave(0)
  assert.equal(empty.visible, false)
  assert.equal(empty.coins, 0)
  assert.equal(empty.lines, HEXAGRAM_BITS)
  const one = coinYarrowWave(1)
  assert.equal(one.coins, coins())
  assert.equal(one.handful, yarrowRemainder(coins()))
  assert.equal(one.wavelength * one.frequency, one.product)
  assert.equal(one.product, WAVE_PRODUCT)
  assert.equal(one.visible, false)
  const pair = coinYarrowWave(coins())
  assert.equal(pair.coins, coins() * coins())
  assert.equal(pair.wavelength * pair.frequency, WAVE_PRODUCT)
  assert.ok(pair.hexagram !== one.hexagram || pair.handful !== one.handful, 'a bigger bundle must move occupancy or the handful')
  const T = theorems()
  const ledger = coinYarrowWave(T.length)
  assert.equal(ledger.coins, T.length * coins())
  assert.equal(ledger.wavelength * ledger.frequency, WAVE_PRODUCT)
  const omitted = coinYarrowWave(T.length - 1)
  assert.notEqual(omitted.coins, ledger.coins, 'CONTROL: drop a seal and the wave must move')
  const waves = coinWaves()
  assert.equal(waves.length, skillGroups().length)
  let clustered = 0
  for (const w of waves) {
    assert.equal(w.wave.visible, false, `${w.skill} must not draw stalks`)
    assert.equal(w.wave.coins, w.theorems * coins())
    assert.equal(w.wave.wavelength * w.wave.frequency, WAVE_PRODUCT)
    assert.equal(w.wave.remainder, coins())
    clustered += w.theorems
  }
  assert.equal(clustered, T.length, 'every seal sits in exactly one wave cluster')
})

test('twoBoardsOf: two 64-bit coins fuse to the uuid; flip is involutive; coins accounted', () => {
  const t = theorems()[0]
  assert.ok(t)
  const faces = twoBoardsOf(t.address)
  assert.equal(faces.length, COINS)
  assert.equal(faces[0]!.length, LEVERAGE)
  assert.equal(faces[1]!.length, LEVERAGE)
  assert.equal(nextCoinOf(faces).length, UUID_BITS)
  assert.equal(HANDLE_HEXBITS * HANDLE_HEXBITS * COINS, UUID_BITS)
  const tiles = compileToHexbits(t.address)
  assert.deepEqual(bitsOfHexbits(tiles), nextCoinOf(faces))
  const flipped = flipCoin(faces)
  assert.deepEqual(flipped[0], faces[1])
  assert.deepEqual(flipped[1], faces[0])
  assert.deepEqual(flipCoin(flipped), [faces[0], faces[1]])
  const face = hexFaceOf(t.address)
  assert.equal(face.coins, COINS)
  assert.doesNotMatch(JSON.stringify(faces), MYTH)
})

test('each coin is witnessed by FUSED_RING neighbours — the board minus itself', () => {
  assert.equal(FUSED_RING + 1, HEXAGRAM_STATES)
  assert.equal(FUSED_RING, (BASE - COINS) * BASE, '7·9 is the fused ring')
  assert.equal(LEVERAGE, HEXAGRAM_STATES)
  for (let gate = 0; gate < HEXAGRAM_STATES; gate++) {
    const n = coinNeighbours(gate)
    assert.equal(n.length, FUSED_RING)
    assert.equal(n.includes(gate), false, `gate ${gate} is not its own neighbour`)
    assert.equal(new Set(n).size, FUSED_RING)
    assert.equal(n[0] === 0 || gate === 0, true)
    let sum = gate
    for (const i of n) sum += i
    assert.equal(sum, (HEXAGRAM_STATES * (HEXAGRAM_STATES - 1)) / 2)
  }
  assert.throws(() => coinNeighbours(-1))
  assert.throws(() => coinNeighbours(HEXAGRAM_STATES))
  const t = theorems()[0]
  assert.ok(t)
  const w = coinBoardWitness(t.address)
  assert.equal(w.coins, COINS)
  assert.equal(w.board, HEXAGRAM_STATES)
  assert.equal(w.neighbours, FUSED_RING)
  assert.equal(w.complete, true)
  assert.equal(w.reflects, true)
})

test('hexFaceOf / occupancyOf: same address, same face; aura hsl; 32 hexbits; no deity strings', () => {
  const t = theorems().find((x) => x.key === 'payload_aligns_where_the_name_does_not') || theorems()[0]
  assert.ok(t)
  const face = hexFaceOf(t.address)
  assert.equal(face.handle.length, HANDLE_HEXBITS)
  assert.match(face.handle, /^[0-9a-f]{8}$/)
  assert.equal(face.hexbits.length, UUID_HEXBITS)
  assert.equal(face.hexagrams.length, PAYLOAD_HEXAGRAMS)
  assert.ok(typeof face.aura.hsl === 'string' && face.aura.hsl.startsWith('hsl'))
  assert.equal(face.gates, LEVERAGE)
  assert.equal(face.board, HANDLE_HEXBITS)
  assert.equal(face.hexagramBits, HEXAGRAM_BITS)
  assert.equal(face.coins, COINS)
  assert.equal(face.faces.length, COINS)
  assert.equal(face.faces[0]!.length, LEVERAGE)
  assert.equal(face.faces[1]!.length, LEVERAGE)
  assert.equal(nextCoinOf(face.faces).length, UUID_BITS)
  assert.ok(face.referrerDoor >= 0 && face.referrerDoor < HEXAGRAM_BITS)
  assert.equal(face.merkaba, HANDLE_HEXBITS)
  assert.equal(face.fused, true)
  assert.deepEqual([...face.ladder], [...fuseLadder(HANDLE_HEXBITS, COINS)])
  assert.equal(face.rosette, fuseWidth(HANDLE_HEXBITS, COINS))
  assert.equal(face.pentad, fuseWidth(fuseWidth(HANDLE_HEXBITS, COINS), COINS))
  assert.equal(face.metatron.centres, SAFE_HEXBITS)
  assert.equal(face.metatron.lines, (SAFE_HEXBITS * (SAFE_HEXBITS - 1)) / 2)
  assert.equal(face.metatron.nodes.length, SAFE_HEXBITS)
  assert.equal(face.metatron.xy.length, SAFE_HEXBITS)
  assert.equal(face.hexPi.referrer.handle, face.handle)
  assert.equal(face.hexPi.referrer.door, face.referrerDoor)
  assert.equal(face.hexPi.referrer.handle.length, HANDLE_HEXBITS)
  assert.equal(face.hexPi.superposition.handle.length, HANDLE_HEXBITS)
  assert.equal(face.hexPi.referrer.verse.length, HEXAGRAM_BITS)
  assert.equal(face.hexPi.remainder, COINS)
  assert.equal(face.glyphs.star, GLYPH_STAR)
  assert.equal(face.glyphs.star, TRINITY + COINS)
  assert.equal(face.glyphs.rose, HANDLE_HEXBITS)
  assert.equal(face.glyphs.ring, BASE)
  assert.equal(face.glyphs.wheel, HEXAGRAM_BITS * COINS)
  assert.equal(face.stations.trinity, TRINITY)
  assert.equal(face.stations.rays, STATION_RAYS)
  assert.equal(face.stations.ten, STATION_TEN)
  assert.equal(face.stations.ten, HEXAGRAM_BITS + HEXBIT_BITS)
  assert.equal(face.stations.roof, HEXBIT_STATES + HEXAGRAM_BITS)
  assert.equal(face.packedTriangles, UUID_BITS * COINS)
  assert.equal(face.merkabasPacked, UUID_HEXBITS)
  assert.equal(face.packedTriangles / face.merkaba, UUID_HEXBITS)
  assert.equal(face.veFaces, HANDLE_HEXBITS + HEXAGRAM_BITS)
  assert.equal(face.metatron.xy[0][0], 100)
  assert.equal(face.metatron.xy[1][0] - face.metatron.xy[0][0], UUID_HEXBITS - HEXBIT_BITS)
  assert.equal(face.metatron.xy[2][1] - face.metatron.xy[0][1], UUID_HEXBITS - HANDLE_HEXBITS)
  assert.equal(HANDLE_HEXAGRAM_REMAINDER, HANDLE_BITS % HEXAGRAM_BITS)
  assert.equal(HEXBIT_STATE_HEXAGRAM_REMAINDER, HEXBIT_STATES % HEXAGRAM_BITS)
  assert.notEqual(HANDLE_HEXAGRAM_REMAINDER, HEXBIT_STATE_HEXAGRAM_REMAINDER)
  const verse = [...HEX_PI.slice(face.referrerDoor), ...HEX_PI.slice(0, face.referrerDoor)]
  assert.deepEqual(face.hexPi.referrer.verse, verse)
  assert.deepEqual(face.handleParts, handleParts(face.handle))
  assert.deepEqual(occupancyOf(t.address), occupancyOf(t.address))
  assert.deepEqual(hexFaceOf(t.address).occupancy, face.occupancy)
  const aura = quantumAura(t.address)
  assert.equal(face.aura.hsl, aura.hsl)
  assert.equal(FREE_DIMS + COMPACT_DIMS, TEN_DIMS)
  assert.equal(RAYS, BASE - COINS)
  assert.equal(COMPACT_DIMS, RAYS)
  assert.equal(FREE_DIMS, TRINITY)
  assert.equal(FREE_KEYS.length, FREE_DIMS)
  assert.equal(COMPACT_KEYS.length, COMPACT_DIMS)
  assert.equal(aura.ten.period, periodOf(aura.ray))
  assert.equal(aura.ten.period, COINS * (HEXBIT_BITS + COINS + aura.ray))
  assert.equal(aura.ten.period, COINS * (HEXAGRAM_BITS + aura.ray))
  assert.equal(aura.ten.rotation, rotationOf())
  assert.equal(aura.ten.glowInner, glowInnerOf())
  assert.equal(aura.ten.glowOuter, glowOuterOf())
  assert.equal(face.aura.ten.period, aura.ten.period)
  assert.equal(face.aura.ten.rotation, aura.ten.rotation)
  assert.ok(aura.css.includes(`hue-rotate(${rotationOf()}deg)`))
  assert.ok(aura.css.includes(`${glowInnerOf()}px ${glowSpreadInnerOf()}px`))
  assert.ok(aura.css.includes(`${glowOuterOf()}px ${glowSpreadOuterOf()}px`))
  assert.ok(aura.css.includes(`${periodOf(aura.ray)}s`))
  const dec = auraDecode(aura.rgb)
  assert.ok(dec)
  assert.equal(dec.residue, aura.ten.residue)
  assert.equal(dec.ray, aura.ten.ray)
  assert.equal(dec.sat, aura.ten.sat)
  assert.equal(dec.light, aura.ten.light)
  assert.equal(auraAlphabet().length, BASE * RAYS * (COINS * TRINITY))
  for (const n of face.occupancy) assert.equal(typeof n, 'number')
  assert.doesNotMatch(JSON.stringify(face), MYTH)
  const counts = sealedCounts()
  for (const n of face.occupancy) assert.ok(counts.includes(n))
  assert.ok(OCCUPANCY_KEYS.every((k) => typeof k === 'string'))
  const missing = OCCUPANCY_KEYS.filter((k) => !theoremByKey().has(k))
  assert.deepEqual(missing, [], 'occupancy census is live keys, not a leftover scrape')
  assert.deepEqual([...face.occupancyDoors], [...OCCUPANCY_KEYS])
  const cites = occupancyCitesOf(t.address)
  assert.equal(cites.length, face.occupancy.length)
  for (const hit of cites) {
    assert.ok(face.occupancy.includes(hit.n))
    assert.ok(hit.keys.length > 0, `occupancy ${hit.n} has theorem doors`)
    for (const key of hit.keys) assert.ok(theoremByKey().has(key))
  }
  for (const key of [
    'k432', 'nyquist_clears_the_lattice', 'sanitize_max_depth_is_two_pow_five',
    'crypto_widths_are_fixed_not_sampled', 've_fourteen_faces', 'served_qubit_ceiling',
    'aura_step_divides_circle', 'rosette_quantum_fortytwo', 'hexbit_is_four_qubits',
  ]) assert.ok(OCCUPANCY_KEYS.includes(key), key)
})

test('composeTheorem: H1 is the handle; hex face params; Lean body; no principleSiblings', async () => {
  const { composeTheorem, composePublication } = await import(
    pathToFileURL(join(ROOT, 'dist/compose-object.js')).href
  ) as {
    composeTheorem: (t: { address: string; key: string; name: string; principle: string; skill: string; statement: string; tactic: string; lean: string; file: string }) => {
      params: Record<string, unknown>
      content: string
    }
    composePublication: (p: { address: string; receipt: string; slug: string; title: string; abstract: string; markdown: string; file: string; count: number }) => {
      params: Record<string, unknown>
      content: string
    }
  }
  const t = theorems()[0]!
  const page = composeTheorem(t)
  const handle = handleOf(t.address)
  assert.equal(page.params.handle, handle)
  assert.equal(page.params.title, handle)
  assert.equal(page.params.heroTitle, handle)
  assert.equal((page.params.hexbits as number[]).length, UUID_HEXBITS)
  assert.equal((page.params.hexagrams as number[]).length, PAYLOAD_HEXAGRAMS)
  assert.equal(page.params.gates, LEVERAGE)
  assert.equal(page.params.board, HANDLE_HEXBITS)
  assert.equal(page.params.hexagramBits, HEXAGRAM_BITS)
  assert.equal(page.params.coins, COINS)
  assert.equal(page.params.merkaba, HANDLE_HEXBITS)
  assert.equal(page.params.fused, true)
  assert.equal(page.params.rosette, 7)
  assert.equal(page.params.pentad, 5)
  assert.equal((page.params.metatron as { centres: number; lines: number }).centres, 13)
  assert.equal((page.params.metatron as { centres: number; lines: number }).lines, 78)
  assert.equal((page.params.hexPi as { remainder: number }).remainder, COINS)
  assert.equal((page.params.glyphs as { star: number }).star, TRINITY + COINS)
  assert.equal((page.params.glyphs as { rose: number }).rose, HANDLE_HEXBITS)
  assert.equal(((page.params.hexPi as { referrer: { handle: string } }).referrer.handle), page.params.handle)
  assert.equal((page.params.faces as [number[], number[]]).length, COINS)
  assert.equal((page.params.faces as [number[], number[]])[0]!.length, LEVERAGE)
  assert.ok((page.params.aura as { hsl: string }).hsl)
  assert.equal((page.params.aura as { ten: { period: number; rotation: number } }).ten.period, periodOf((page.params.aura as { ray: number }).ray))
  assert.equal((page.params.aura as { ten: { rotation: number } }).ten.rotation, rotationOf())
  assert.equal(page.params.principleSiblings, undefined)
  assert.match(page.content, new RegExp(`^# ${handle}`, 'm'))
  assert.match(page.content, new RegExp(t.statement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.doesNotMatch(JSON.stringify(page.params.occupancy), MYTH)
  assert.deepEqual(page.params.occupancyDoors, [...OCCUPANCY_KEYS])
  assert.ok(Array.isArray(page.params.occupancyCites) && (page.params.occupancyCites as { n: number }[]).length === (page.params.occupancy as number[]).length)
  assert.doesNotMatch(JSON.stringify({ handle: page.params.handle, hexagrams: page.params.hexagrams, occupancy: page.params.occupancy }), MYTH)
  const { publications } = await import('../publish.js')
  const pub = publications().find((p) => p.publishable)
  if (pub) {
    const pubPage = composePublication(pub)
    assert.equal(pubPage.params.handle, handleOf(pub.address || pub.receipt))
    assert.equal(pubPage.params.title, pubPage.params.handle)
  }
  const composeSrc = readFileSync(join(ROOT, 'src/compose-object.ts'), 'utf8')
  assert.match(composeSrc, /handleOf\(address\)/)
  assert.doesNotMatch(composeSrc, /\(p\.address \|\| p\.receipt\)\.replace/)
  assert.doesNotMatch(composeSrc, /from '\.\.\/\.\.\/dist\/index\.js'/)
  assert.doesNotMatch(composeSrc, /from 'node:fs'/)
  assert.doesNotMatch(composeSrc, /from 'node:path'/)
})

test('ObjectPage draws HexFace when an address exists; HexbitPlayer on the face; no autoplay', () => {
  const page = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.match(page, /HexFace/)
  assert.match(page, /showHexFace/)
  const face = readFileSync(join(ROOT, 'docs/.vitepress/theme/HexFace.vue'), 'utf8')
  assert.match(face, /data-slot="gate"/)
  assert.match(face, /data-slot="hex-face"/)
  assert.match(face, /data-slot="coin-face"/)
  assert.match(face, /data-slot="next-coin"/)
  assert.match(face, /data-slot="merkaba"/)
  assert.match(face, /data-slot="metatron"/)
  assert.match(face, /data-slot="fuse-ladder"/)
  assert.match(face, /data-slot="pentad"/)
  assert.match(face, /data-slot="hex-pi"/)
  assert.match(face, /data-slot="referrer-handle"/)
  assert.match(face, /data-slot="superposition-handle"/)
  assert.match(face, /data-fused/)
  assert.match(face, /data-period/)
  assert.match(face, /data-rotation/)
  assert.match(face, /aura\.value\.ten/)
  assert.match(face, /q-superposition/)
  assert.match(face, /data-door/)
  assert.match(face, /merkabaTurn/)
  assert.doesNotMatch(face, /infinite/)
  assert.doesNotMatch(face, /ease-in-out/)
  const hero = readFileSync(join(ROOT, 'docs/.vitepress/theme/HeroAnimation.vue'), 'utf8')
  assert.doesNotMatch(hero, /from '\.\.\/\.\.\/\.\.\/dist\/index\.js'/)
  assert.doesNotMatch(hero, /theorems\(\)/)
  assert.doesNotMatch(hero, /ease-in-out/)
  assert.match(hero, /heroAt/)
  assert.match(hero, /dist\/render\.js/)
  assert.match(hero, /VPLink/)
  assert.match(hero, /:href="h\.door"/)
  assert.doesNotMatch(hero, /withBase\('\/' \+ handle\)/)
  assert.doesNotMatch(hero, /href="\/quantum"/)
  assert.match(hero, /hero-resonance/)
  assert.match(hero, /hero-coin-a/)
  assert.match(hero, /hero-coin-b/)
  assert.match(hero, /coinColors/)
  assert.match(hero, /gateColorOf/)
  assert.match(hero, /mix-blend-mode/)
  assert.match(hero, /@keyframes/)
  assert.match(hero, /data-fused/)
  assert.match(hero, /data-handle/)
  assert.match(hero, /data-door/)
  assert.match(hero, /referrerDoor/)
  assert.match(hero, /coin-face/)
  assert.match(hero, /next-coin/)
  assert.match(face, /data-slot="hexbit-tile"/)
  assert.match(face, /hexbit\/index/)
  assert.match(face, /data-glyph/)
  assert.match(face, /data-slot="occupancy"/)
  assert.match(face, /data-slot="occupancy-doors"/)
  assert.match(face, /\/theorem\//)
  assert.match(face, /data-slot="glyph"/)
  assert.doesNotMatch(face, /hit\(5\)/)
  assert.doesNotMatch(face, /n === 10 \|\| n === 22/)
  assert.match(face, /data-slot="readings"/)
  assert.match(face, /HexbitPlayer/)
  assert.match(face, /:states="hexbits"/)
  assert.doesNotMatch(face, /<audio[^>]*autoplay/)
  assert.doesNotMatch(face, MYTH)
  const player = readFileSync(join(ROOT, 'docs/.vitepress/theme/HexbitPlayer.vue'), 'utf8')
  assert.doesNotMatch(player, /<audio[^>]*autoplay/)
  assert.match(player, /controls/)
})

test('shadcn slots: hex-face cells and render.ts card anatomy; no Tailwind/React', () => {
  const render = readFileSync(join(ROOT, 'src/render.ts'), 'utf8')
  assert.match(render, /data-slot="card"/)
  assert.match(render, /data-slot="card-header"/)
  assert.match(render, /data-slot="card-title"/)
  const alpine = [
    'docs/.vitepress/theme/CatalogueBrowser.vue',
    'docs/.vitepress/theme/PortPanel.vue',
    'docs/.vitepress/theme/ExecShell.vue',
    'docs/.vitepress/theme/BookRoom.vue',
  ]
  for (const f of alpine) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    for (const slot of ['card', 'card-header', 'card-title', 'card-description', 'card-content', 'card-footer']) {
      assert.match(src, new RegExp('data-slot="' + slot + '"'), `${f} missing ${slot}`)
    }
  }
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  assert.ok(!deps.react && !deps.tailwindcss && !deps['@radix-ui/react-slot'])
})

test('index exports hexagramsOf and occupancyOf beside hexbitDoorOf', () => {
  const src = readFileSync(join(ROOT, 'src/index.ts'), 'utf8')
  assert.match(src, /hexagramsOf/)
  assert.match(src, /occupancyOf/)
  assert.match(src, /occupancyCitesOf/)
  assert.match(src, /twoBoardsOf/)
  assert.match(src, /metatronOf/)
  assert.match(src, /hexPiOf/)
  assert.match(src, /fuseLadder/)
  assert.match(src, /hexbitDoorOf/)
})

test('handle store records: hex-only dirs, identity payload, collision-free, not per-key files', () => {
  const records = buildHandleRecords()
  assert.ok(records.length > 0)
  const seen = new Set<string>()
  for (const r of records) {
    assert.ok(isHandle(r.handle), r.handle)
    assert.equal(r.handle, handleOf(r.address))
    assert.ok(r.kind === 'chunk' || r.kind === 'publication' || r.kind === 'page', r.kind)
    assert.equal(seen.has(r.handle), false, `collision ${r.handle}`)
    seen.add(r.handle)
    const parts = handleParts(r.handle)
    assert.equal(parts.join(''), r.handle)
    for (const p of parts) assert.match(p, /^[0-9a-f]{2}$/)
    assert.match(handlePath(r.handle), new RegExp(`^${HANDLE_ROOT}/[0-9a-f]{2}/[0-9a-f]{2}/[0-9a-f]{2}/[0-9a-f]{2}/index\\.json$`))
    assert.equal('principle' in r, false)
    assert.equal('skill' in r, false)
    assert.equal('title' in r, false)
    assert.equal('blurb' in r, false)
    assert.doesNotMatch(JSON.stringify(Object.keys(r)), MYTH)
  }
  const chunks = records.filter((r) => r.kind === 'chunk')
  assert.ok(chunks.some((c) => (c.keys?.length ?? 0) > 1), 'same algebra may cite several keys — one handle')
  assert.ok(!records.some((r) => r.kind === 'theorem' as string), 'not one file per theorem key')
})

test('barrel graph is browser-safe: no static node:fs in hex-face import path', () => {
  const files = [
    'src/seo-freeze.ts',
    'src/prepublish-seal.ts',
    'src/publication-metadata.ts',
    'src/quantum/advantage/audit/index.ts',
    'src/scripts/gen-handle-chunks.ts',
    'src/hexagram.ts',
    'src/axiom-witness.ts',
    'src/security-audit.ts',
  ]
  for (const f of files) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    assert.doesNotMatch(src, /from 'node:fs'/, f)
    assert.doesNotMatch(src, /from 'node:path'/, f)
    assert.doesNotMatch(src, /from 'node:crypto'/, f)
  }
})

test('hex-face constructors are not in hexbit/index.ts', () => {
  const hexbit = readFileSync(join(ROOT, 'src/hexbit/index.ts'), 'utf8')
  assert.doesNotMatch(hexbit, /hexagramsOf/)
  assert.doesNotMatch(hexbit, /occupancyOf/)
  assert.doesNotMatch(hexbit, /twoBoardsOf/)
  assert.ok(existsSync(join(ROOT, 'src/hexagram.ts')))
})

test('object-graph and ObjectCrosslinks mint handles via handleOf, never an address slice', () => {
  const graph = readFileSync(join(ROOT, 'src/object-graph.ts'), 'utf8')
  assert.match(graph, /handleOf/)
  assert.doesNotMatch(graph, /address\.replace\(\/-\/g, ''\)\.slice\(0,\s*8\)/)
  const xl = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectCrosslinks.vue'), 'utf8')
  assert.doesNotMatch(xl, /address\.replace\(\/-\/g, ''\)\.slice\(0,\s*8\)/)
  assert.match(xl, /fm\.handle/)
})
