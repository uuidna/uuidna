// Align the published package to EXACTLY 64 KiB (65536 bytes) unpacked, to the byte.
// The reserve is REPRODUCIBLE content-addresses (toUuid of "uuidna:reserve:<i>") — a self-hosted reserve for
// cryptography-goal development, NOT random padding: every line recomputes. Run `node reserve.mjs` after build.
// Verify: `npm pack --dry-run --json` → unpackedSize === 65536.
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { toUuid } from './dist/index.js'

const TARGET = 65536
const RESERVED = 'reserved.uuidna'
// ASCII-only header (1 char == 1 byte, so a byte-exact truncation is a char-exact slice).
const HEADER =
`# uuidna reserved space - this package is aligned to EXACTLY 64 KiB (65536 bytes) unpacked.
# Below: reproducible content-addresses (toUuid of "uuidna:reserve:<i>"), a self-hosted reserve for the
# cryptography-goal development - NOT random padding; every line recomputes. Regenerate with reserve.mjs.
`

const measure = () => JSON.parse(execSync('npm pack --dry-run --json', { encoding: 'utf8' }))[0]

// learn the base size (everything except the reserve) by measuring with an empty reserve
writeFileSync(RESERVED, '')
let j = measure()
const rEntry = j.files.find((f) => f.path === RESERVED)
const base = j.unpackedSize - (rEntry ? rEntry.size : 0)
const R = TARGET - base
if (R < HEADER.length) throw new Error('reserve smaller than header: ' + R)

// fill: header + content-addresses, ASCII (1 char = 1 byte), truncated to EXACTLY R bytes
let body = HEADER
for (let i = 0; body.length < R; i++) body += toUuid('uuidna:reserve:' + i) + '\n'
body = body.slice(0, R)
writeFileSync(RESERVED, body)

j = measure()
console.log('base:', base, '· reserve:', R, '· unpacked:', j.unpackedSize, '· exact 64 KiB:', j.unpackedSize === TARGET)
if (j.unpackedSize !== TARGET) { throw new Error('NOT exact: ' + j.unpackedSize) }
