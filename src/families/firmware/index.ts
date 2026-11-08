import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FIRMWARE — the image's own arithmetic. Flash sectors and pages off an image, 32-bit words and 16-bit checksum words
 *  off its bytes, A/B update slots off a partition, a packed semver off its three parts, and the delta an update carries.
 *  Each an exact integer at a hex address; develops the firmware leads. */

const PROOF = 'firmware counts: sectors = bytes / sector; words = bytes / 4; pages = bytes / page; checksumWords = bytes / 2; bootBlocks = size / block; slots = capacity / image; version = major·1e6 + minor·1e3 + patch; otaDelta = max(0, newSize − oldSize); image = blocks · blockBytes; freespace = total − used; crc = words · perWord; stack = frames · bytes; isr = vectors · bytesEach; watchdog = timeoutMs / tickMs; flashcycles = writes · 100 / endurance; firmware crossed to hardware'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'firmware', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `firmware.${name}`, params })

export class FirmwareFormulas {
  /** Whole `sector`-byte flash sectors spanning `bytes`: bytes / sector. */
  static sectors(bytes: number, sector: number): CrossFormula { return f('firmware-sectors', 'sectors(bytes, sector) = bytes / sector', div(bytes, sector), nat(bytes, sector) && sector > 0, 'sectors', [bytes, sector]) }
  /** 32-bit words in `bytes`: bytes / 4. */
  static words(bytes: number): CrossFormula { return f('firmware-words', 'words(bytes) = bytes / 4', div(bytes, 4), nat(bytes), 'words', [bytes]) }
  /** Whole `page`-byte flash pages spanning `bytes`: bytes / page. */
  static pages(bytes: number, page: number): CrossFormula { return f('firmware-pages', 'pages(bytes, page) = bytes / page', div(bytes, page), nat(bytes, page) && page > 0, 'pages', [bytes, page]) }
  /** 16-bit checksum words in `bytes`: bytes / 2. */
  static checksumWords(bytes: number): CrossFormula { return f('firmware-checksumWords', 'checksumWords(bytes) = bytes / 2', div(bytes, 2), nat(bytes), 'checksumWords', [bytes]) }
  /** Whole `block`-sized boot blocks in an image of `size`: size / block. */
  static bootBlocks(size: number, block: number): CrossFormula { return f('firmware-bootBlocks', 'bootBlocks(size, block) = size / block', div(size, block), nat(size, block) && block > 0, 'bootBlocks', [size, block]) }
  /** A/B update slots: whole `image`-sized images that fit a `capacity`-byte partition: capacity / image. */
  static slots(capacity: number, image: number): CrossFormula { return f('firmware-slots', 'slots(capacity, image) = capacity / image', div(capacity, image), nat(capacity, image) && image > 0, 'slots', [capacity, image]) }
  /** A packed semantic version from its three parts: major·1e6 + minor·1e3 + patch (minor, patch ≤ 999). */
  static version(major: number, minor: number, patch: number): CrossFormula { return f('firmware-version', 'version(major, minor, patch) = major·1e6 + minor·1e3 + patch', major * 1000000 + minor * 1000 + patch, nat(major, minor, patch) && minor < 1000 && patch < 1000, 'version', [major, minor, patch]) }
  /** The delta an update of `newSize` carries over an image of `oldSize`: max(0, newSize − oldSize). */
  static otaDelta(newSize: number, oldSize: number): CrossFormula { return f('firmware-otaDelta', 'otaDelta(newSize, oldSize) = max(0, newSize − oldSize)', Math.max(0, newSize - oldSize), nat(newSize, oldSize), 'otaDelta', [newSize, oldSize]) }
  /** The bytes an image of `blocks` blocks of `blockBytes` each holds: blocks · blockBytes. */
  static image(blocks: number, blockBytes: number): CrossFormula { return f('firmware-image', 'image(blocks, blockBytes) = blocks · blockBytes', blocks * blockBytes, nat(blocks, blockBytes), 'image', [blocks, blockBytes]) }
  /** The free bytes left on a `total`-byte flash after `used`: total − used (used ≤ total). */
  static freespace(total: number, used: number): CrossFormula { return f('firmware-freespace', 'freespace(total, used) = total − used', total - used, nat(total, used) && used <= total, 'freespace', [total, used]) }
  /** The CRC bytes over `words` words of `perWord` bytes each: words · perWord. */
  static crc(words: number, perWord: number): CrossFormula { return f('firmware-crc', 'crc(words, perWord) = words · perWord', words * perWord, nat(words, perWord), 'crc', [words, perWord]) }
  /** The stack bytes `frames` frames of `bytes` each use: frames · bytes. */
  static stack(frames: number, bytes: number): CrossFormula { return f('firmware-stack', 'stack(frames, bytes) = frames · bytes', frames * bytes, nat(frames, bytes), 'stack', [frames, bytes]) }
  /** The interrupt-vector table bytes of `vectors` vectors of `bytesEach`: vectors · bytesEach. */
  static isr(vectors: number, bytesEach: number): CrossFormula { return f('firmware-isr', 'isr(vectors, bytesEach) = vectors · bytesEach', vectors * bytesEach, nat(vectors, bytesEach), 'isr', [vectors, bytesEach]) }
  /** Watchdog ticks before a `timeoutMs` timeout at `tickMs` a tick: timeoutMs / tickMs (tickMs > 0). */
  static watchdog(timeoutMs: number, tickMs: number): CrossFormula { return f('firmware-watchdog', 'watchdog(timeoutMs, tickMs) = timeoutMs / tickMs', div(timeoutMs, tickMs), nat(timeoutMs, tickMs) && tickMs > 0, 'watchdog', [timeoutMs, tickMs]) }
  /** Flash wear percent of `writes` writes against `endurance` cycles: writes · 100 / endurance (endurance > 0). */
  static flashcycles(writes: number, endurance: number): CrossFormula { return f('firmware-flashcycles', 'flashcycles(writes, endurance) = writes · 100 / endurance', div(writes * 100, endurance), nat(writes, endurance) && endurance > 0, 'flashcycles', [writes, endurance]) }
}

for (const name of ['bootBlocks', 'checksumWords', 'crc', 'flashcycles', 'freespace', 'image', 'isr', 'otaDelta', 'pages', 'sectors', 'slots', 'stack', 'version', 'watchdog', 'words'] as const)
  hexRegisterOf('firmware', name, (FirmwareFormulas[name] as (...x: unknown[]) => unknown).bind(FirmwareFormulas))
