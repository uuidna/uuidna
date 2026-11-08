import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAID — HYBRID REDUNDANT STORAGE, AS ARITHMETIC. A RAID array is numbers: usable capacity under striping, mirroring and
 *  one- or two-disk parity (RAID 0/1/5/6/10), the data width of a stripe, the parity overhead, how many disk failures a
 *  level tolerates, the surviving disks read to rebuild, the usable percentage, the minimum disk count, the stripe size in
 *  bytes, and the mirror-pair count. The array NATIVELY BINDS the storage estate it carries: the known real filesystems and
 *  databases that live on top of it, counted from fixed tables. Deterministic integer identities, standard storage theory.
 *  Crosses to `storage`. A measure, not advice.
 *
 *  level index: 0 raid0, 1 raid1, 2 raid5, 3 raid6, 4 raid10. */

const FILESYSTEMS = ['ext4', 'xfs', 'btrfs', 'zfs', 'ntfs', 'apfs', 'f2fs', 'reiserfs', 'jfs', 'ufs', 'fat32', 'exfat', 'hfsplus', 'bcachefs', 'tmpfs'] as const
const DATABASES = ['postgres', 'mysql', 'sqlite', 'mongodb', 'redis', 'cassandra', 'mariadb', 'oracle', 'mssql', 'dynamodb', 'cockroachdb', 'couchdb', 'neo4j', 'influxdb', 'clickhouse'] as const
const TOLERANCE = [0, 1, 1, 2, 1] as const // disk failures tolerated by raid0/1/5/6/10
const MINDISKS = [1, 2, 3, 4, 4] as const // minimum member disks for raid0/1/5/6/10

const PROOF = 'hybrid RAID storage arithmetic (RAID 0/1/5/6/10 usable capacity, stripe width, parity overhead, fault tolerance, rebuild reads, usable percent, minimum disks, stripe size, mirror pairs) natively binding the known real filesystems and databases carried on top; deterministic integer identities crossed to storage; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const lvl = (i: number) => Number.isSafeInteger(i) && i >= 0 && i < TOLERANCE.length
const r = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'raid', dst: 'storage', formula, value, proof: PROOF, ...extra }, holds, { name: `raid.${name}`, params })

export class RaidFormulas {
  /** RAID 0 — pure striping, no redundancy: every disk's capacity is usable. value disks · size. */
  static raid0capacity(disks: number, size: number): CrossFormula { return r('raid-raid0capacity', 'raid0capacity(disks, size) = disks · size', disks * size, nat(disks, size), 'raid0capacity', [disks, size]) }
  /** RAID 1 — mirrored pairs: only one copy of each pair is usable, so ⌊disks/2⌋ disks' worth. value ⌊disks/2⌋ · size. */
  static raid1capacity(disks: number, size: number): CrossFormula { return r('raid-raid1capacity', 'raid1capacity(disks, size) = ⌊disks/2⌋ · size', Math.floor(disks / 2) * size, nat(disks, size), 'raid1capacity', [disks, size]) }
  /** RAID 5 — single distributed parity: one disk's worth is parity. value (disks − 1) · size; holds disks ≥ 3. */
  static raid5capacity(disks: number, size: number): CrossFormula { return r('raid-raid5capacity', 'raid5capacity(disks, size) = (disks − 1) · size', (disks - 1) * size, nat(disks, size) && disks >= 3, 'raid5capacity', [disks, size]) }
  /** RAID 6 — double distributed parity: two disks' worth is parity. value (disks − 2) · size; holds disks ≥ 4. */
  static raid6capacity(disks: number, size: number): CrossFormula { return r('raid-raid6capacity', 'raid6capacity(disks, size) = (disks − 2) · size', (disks - 2) * size, nat(disks, size) && disks >= 4, 'raid6capacity', [disks, size]) }
  /** RAID 10 — striped mirrors: half the disks are mirror copies. value ⌊disks/2⌋ · size; holds disks ≥ 4 and even. */
  static raid10capacity(disks: number, size: number): CrossFormula { return r('raid-raid10capacity', 'raid10capacity(disks, size) = ⌊disks/2⌋ · size', Math.floor(disks / 2) * size, nat(disks, size) && disks >= 4 && disks % 2 === 0, 'raid10capacity', [disks, size]) }
  /** STRIPE WIDTH — the number of data disks in a stripe, members minus parity. value disks − parity; holds parity < disks. */
  static stripewidth(disks: number, parity: number): CrossFormula { return r('raid-stripewidth', 'stripewidth(disks, parity) = disks − parity', disks - parity, nat(disks, parity) && parity < disks, 'stripewidth', [disks, parity]) }
  /** PARITY OVERHEAD — the number of redundancy disks given over to parity. value parity; holds parity < disks. */
  static parityoverhead(disks: number, parity: number): CrossFormula { return r('raid-parityoverhead', 'parityoverhead(disks, parity) = parity', parity, nat(disks, parity) && parity < disks, 'parityoverhead', [disks, parity]) }
  /** FAULT TOLERANCE — disk failures the level survives: raid0→0, raid1→1, raid5→1, raid6→2, raid10→1. value TOLERANCE[level]. */
  static faulttolerance(level: number): CrossFormula { return r('raid-faulttolerance', 'faulttolerance(level) = tolerated disk failures (raid0/1/5/6/10 → 0/1/1/2/1)', lvl(level) ? TOLERANCE[level]! : 0, lvl(level), 'faulttolerance', [level]) }
  /** REBUILD READS — surviving data disks read to reconstruct one failed data disk from parity. value disks − parity − 1; holds disks > parity + 1. */
  static rebuildreads(disks: number, parity: number): CrossFormula { return r('raid-rebuildreads', 'rebuildreads(disks, parity) = disks − parity − 1', disks - parity - 1, nat(disks, parity) && disks > parity + 1, 'rebuildreads', [disks, parity]) }
  /** USABLE PERCENT — usable capacity as an integer percentage of raw capacity. value ⌊(disks − parity) · 100 / disks⌋; holds disks > 0 and parity < disks. */
  static usablepercent(disks: number, parity: number): CrossFormula { return r('raid-usablepercent', 'usablepercent(disks, parity) = ⌊(disks − parity) · 100 / disks⌋', disks > 0 ? Math.floor(((disks - parity) * 100) / disks) : 0, nat(disks, parity) && disks > 0 && parity < disks, 'usablepercent', [disks, parity]) }
  /** MINIMUM DISKS — the fewest member disks a level needs: raid0→1, raid1→2, raid5→3, raid6→4, raid10→4. value MINDISKS[level]. */
  static minimumdisks(level: number): CrossFormula { return r('raid-minimumdisks', 'minimumdisks(level) = minimum member disks (raid0/1/5/6/10 → 1/2/3/4/4)', lvl(level) ? MINDISKS[level]! : 0, lvl(level), 'minimumdisks', [level]) }
  /** STRIPE SIZE — the bytes in one full stripe, blocks times block size. value blocks · blocksize. */
  static stripesize(blocks: number, blocksize: number): CrossFormula { return r('raid-stripesize', 'stripesize(blocks, blocksize) = blocks · blocksize', blocks * blocksize, nat(blocks, blocksize), 'stripesize', [blocks, blocksize]) }
  /** MIRRORS — the number of mirror pairs across the members. value ⌊disks/2⌋. */
  static mirrors(disks: number): CrossFormula { return r('raid-mirrors', 'mirrors(disks) = ⌊disks/2⌋', Math.floor(disks / 2), nat(disks), 'mirrors', [disks]) }
  /** FILESYSTEM BIND — the count of known real filesystems the array natively carries. value |FILESYSTEMS|. */
  static fscount(): CrossFormula { return r('raid-fscount', 'fscount() = |FILESYSTEMS| (known real filesystems carried on the array)', FILESYSTEMS.length, true, 'fscount', []) }
  /** DATABASE BIND — the count of known real databases the array natively carries. value |DATABASES|. */
  static dbcount(): CrossFormula { return r('raid-dbcount', 'dbcount() = |DATABASES| (known real databases carried on the array)', DATABASES.length, true, 'dbcount', []) }
}

for (const name of ['dbcount', 'faulttolerance', 'fscount', 'minimumdisks', 'mirrors', 'parityoverhead', 'raid0capacity', 'raid10capacity', 'raid1capacity', 'raid5capacity', 'raid6capacity', 'rebuildreads', 'stripesize', 'stripewidth', 'usablepercent'] as const)
  hexRegisterOf('raid', name, (RaidFormulas[name] as (...x: unknown[]) => unknown).bind(RaidFormulas))
