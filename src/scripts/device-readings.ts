#!/usr/bin/env node
// @non-harmonic: reads the host — os, sysctl, system_profiler, lean, git — a NAMED boundary; nothing here decides a
// proposition, it records which machine did the computing.
//
// device-readings — WHICH MACHINE COMPUTED IT, recorded in full as the run's evidence (the captain, 2026-09-14: "all
// device data as evidence", "if you miss any of the attributes including device data…"). Every attribute the host
// will report is read: platform, OS release and build, architecture, the hardware model, CPU brand, physical and
// logical cores, memory, the full hardware profile (serial number, hardware UUID, chip), GPU, hostname, Node, the Lean
// toolchain and the commit. A reading the host refuses is recorded as null beside the command that was asked — never
// omitted, never guessed.
//
// A READING, NOT A SEAL. These values differ on every machine, so they never enter the trial record's seal — that seal
// must recompute identically anywhere, or no one could detect a tampered verdict. They travel beside it, content-
// addressed, in the run's evidence. They state what the hardware is, exactly as the host reports it.
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { readFileSync, appendFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { depositEvidence } from './receipt-deposit.js'

type Reading<T> = { value: T | null; asked: string }

const run = (cmd: string, args: readonly string[]): Reading<string> => {
  const asked = [cmd, ...args].join(' ')
  try {
    const out = execFileSync(cmd, [...args], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 30000 }).trim()
    return { value: out || null, asked }
  } catch { return { value: null, asked } }
}
const fileReading = (path: string): Reading<string> => {
  try { return { value: readFileSync(path, 'utf8').trim() || null, asked: `read ${path}` } } catch { return { value: null, asked: `read ${path}` } }
}
const profile = (type: string): Reading<unknown> => {
  const r = run('system_profiler', ['-json', type])
  if (r.value === null) return { value: null, asked: r.asked }
  try { return { value: (JSON.parse(r.value) as Record<string, unknown>)[type] ?? null, asked: r.asked } } catch { return { value: null, asked: r.asked } }
}

/** a temperature in the form qpu's receipts already use (qpu receipted.ts): a number carries its instrument, and a
 *  sensor the host does not expose is recorded as not measured, with why — never a guessed value */
export type Temperature = { measured: true; millikelvin: number; source: string } | { measured: false; why: string }

/** the battery pack's gauge reports hundredths of °C; kelvin = °C + 273.15, so millikelvin = centi·10 + 273150 */
const gauge = (field: string): Temperature => {
  const r = run('ioreg', ['-rn', 'AppleSmartBattery'])
  const m = r.value?.match(new RegExp(`"${field}" = (\\d+)`))
  if (!m) return { measured: false, why: `${r.asked} reported no ${field}` }
  return { measured: true, millikelvin: Number(m[1]) * 10 + 273150, source: `battery gauge, ioreg AppleSmartBattery ${field} ${m[1]} (hundredths of °C), not the chip die` }
}

/** every die and package temperature sensor the chip exposes, read through scripts/die-temperatures.py (the sensors
 *  sit behind the IOHIDEventSystem API, which no built-in command reads) — each one measured, with its sensor name */
const dieSensors = (): Temperature[] | Temperature => {
  const r = run('python3', [join(ROOT, 'scripts', 'die-temperatures.py')])
  if (r.value === null) return { measured: false, why: `${r.asked} produced no output` }
  try {
    const parsed = JSON.parse(r.value) as { sensor: string; millikelvin: number }[] | { error: string }
    if (!Array.isArray(parsed)) return { measured: false, why: `${r.asked}: ${parsed.error}` }
    if (parsed.length === 0) return { measured: false, why: `${r.asked}: the host exposes no temperature sensor through the IOHIDEventSystem API` }
    return parsed.map((p) => ({ measured: true as const, millikelvin: p.millikelvin, source: `die sensor ${p.sensor}, IOHIDEventSystem (${r.asked})` }))
  } catch { return { measured: false, why: `${r.asked} printed output that is not JSON` } }
}

/** deviceReadings() → every attribute the host reports, and the content address of the whole reading */
export function deviceReadings() {
  const darwin = os.platform() === 'darwin'
  const cpus = os.cpus()
  const temperature = darwin
    ? {
        battery: gauge('Temperature'),
        batteryVirtual: gauge('VirtualTemperature'),
        die: dieSensors(),
        thermalPressure: run('pmset', ['-g', 'therm']),
      }
    : { die: fileReading('/sys/class/thermal/thermal_zone0/temp'), thermalPressure: run('cat', ['/sys/class/thermal/thermal_zone0/type']) }
  const readings = {
    platform: os.platform(),
    osRelease: os.release(),
    osVersion: typeof os.version === 'function' ? os.version() : null,
    osBuild: darwin ? run('sw_vers', []) : run('uname', ['-a']),
    arch: os.arch(),
    hostname: os.hostname(),
    model: darwin ? run('sysctl', ['-n', 'hw.model']) : fileReading('/sys/devices/virtual/dmi/id/product_name'),
    cpuBrand: darwin ? run('sysctl', ['-n', 'machdep.cpu.brand_string']) : { value: cpus[0]?.model ?? null, asked: 'os.cpus()[0].model' },
    physicalCores: darwin ? run('sysctl', ['-n', 'hw.physicalcpu']) : run('nproc', ['--all']),
    logicalCores: cpus.length,
    memoryBytes: os.totalmem(),
    hardware: darwin ? profile('SPHardwareDataType') : fileReading('/sys/devices/virtual/dmi/id/product_uuid'),
    gpu: darwin ? profile('SPDisplaysDataType') : run('lspci', []),
    temperature,
    node: process.version,
    lean: run('lean', ['--version']),
    toolchain: fileReading(join(ROOT, 'lean-toolchain')),
    commit: run('git', ['rev-parse', 'HEAD']),
  }
  return { ...readings, address: toUuid(JSON.stringify(readings)) }
}

// ── EACH RECEIPT CARRIES ITS OWN READINGS, SAVED THE MOMENT IT IS COMPUTED (the captain, 2026-09-14: "each receipt holds
// the data. and receipts are saved at once they are computed"). qpu's receipted.ts is the form: every test's receipt
// carries the time and the temperature of its own computation. Here one computation is timed on the process clock and
// the chip's sensors are read as it finishes; the receipt and its readings are appended to dist/evidence at once, so a
// stopped run loses nothing it already computed. The sealed, committed records stay free of readings — they must
// recompute identically anywhere — and each reading points at its receipt by address.

/** the GPU's own utilisation counters as the accelerator driver reports them (ioreg IOAccelerator PerformanceStatistics,
 *  no root): device, renderer and tiler busy percentages and the GPU memory in use — so every receipt states whether
 *  the GPU was computing, not only the CPU. A host that exposes none records the command that was asked. */
const gpuActivity = (): Record<string, number> | Reading<string> => {
  const r = run('ioreg', ['-r', '-d', '1', '-w', '0', '-c', 'IOAccelerator'])
  if (r.value === null) return r
  const pick = (k: string): number | null => { const m = r.value!.match(new RegExp(`"${k}"=(\\d+)`)); return m ? Number(m[1]) : null }
  const out: Record<string, number> = {}
  for (const [key, field] of [['deviceUtilizationPct', 'Device Utilization %'], ['rendererUtilizationPct', 'Renderer Utilization %'], ['tilerUtilizationPct', 'Tiler Utilization %'], ['inUseMemoryBytes', 'In use system memory']] as const) {
    const v = pick(field); if (v !== null) out[key] = v
  }
  return Object.keys(out).length ? out : { value: null, asked: r.asked }
}

/** freeMemoryBytes() → the memory the host can give a job right now, MEASURED — vm_stat's free, inactive and speculative
 *  pages times the page size it reports (macOS reclaims inactive and speculative pages on demand). Linux reads
 *  MemAvailable. Null when the host reports neither, and a caller must then not pretend it knows. */
export function freeMemoryBytes(): number | null {
  const v = run('vm_stat', [])
  if (v.value !== null) {
    const page = Number(v.value.match(/page size of (\d+) bytes/)?.[1] ?? 'NaN')
    const pages = (k: string): number => Number(v.value!.match(new RegExp(`Pages ${k}:\\s+(\\d+)`))?.[1] ?? 0)
    if (Number.isFinite(page)) return (pages('free') + pages('inactive') + pages('speculative')) * page
  }
  const m = fileReading('/proc/meminfo').value?.match(/MemAvailable:\s+(\d+) kB/)
  return m ? Number(m[1]) * 1024 : null
}

/** momentReadings() → the hardware's state now: every die sensor, the battery gauge, and the GPU's utilisation */
export const momentReadings = (): { die: Temperature[] | Temperature | Reading<string>; battery: Temperature | null; gpu: Record<string, number> | Reading<string> } =>
  os.platform() === 'darwin'
    ? { die: dieSensors(), battery: gauge('Temperature'), gpu: gpuActivity() }
    : { die: fileReading('/sys/class/thermal/thermal_zone0/temp'), battery: null, gpu: run('nvidia-smi', ['--query-gpu=utilization.gpu,memory.used', '--format=csv,noheader']) }

/** measured(fn) → the computation's value, and the readings of that computation: its process-clock duration in
 *  nanoseconds and the chip's temperatures read as it finished */
export async function measured<T>(fn: () => T | Promise<T>): Promise<{ value: T; readings: { ns: string } & ReturnType<typeof momentReadings> }> {
  const start = process.hrtime.bigint()
  const value = await fn()
  const ns = (process.hrtime.bigint() - start).toString()
  return { value, readings: { ns, ...momentReadings() } }
}

/** appendEvidence(name, row) → one receipt, with its readings, appended to dist/evidence/<name>.jsonl the moment it
 *  exists — and THIS IS THE HOOK: the same call announces it on the run's own output (the first, then every fifteenth,
 *  so a watcher sees the run without polling a file) and deposits it to qpu storage under its own address, the evidence
 *  terminal a GET reads. Without QPU_WRITE_TOKEN the deposit reports UNSENT and the local log is the whole record. */
const saved = new Map<string, number>()
export function appendEvidence(name: string, row: unknown): void {
  mkdirSync(join(ROOT, 'dist', 'evidence'), { recursive: true })
  const line = JSON.stringify(row)
  appendFileSync(join(ROOT, 'dist', 'evidence', `${name}.jsonl`), line + '\n')
  const count = (saved.get(name) ?? 0) + 1
  saved.set(name, count)
  const address = toUuid(line)
  const r = row as { file?: string; coord?: string; readings?: { ns?: string; die?: unknown; battery?: { millikelvin?: number } | null } }
  if (count === 1 || count % 15 === 0) {
    // THE HOTTEST SENSOR IS NAMED, never an anonymous "die max": the chip also exposes reference channels (PMU tcal
    // reads a fixed 51.85 °C), and a maximum that hides which channel it came from printed that reference as the die on
    // every receipt of 2026-09-14. No channel is filtered; the reader sees which one it is.
    const dies = (Array.isArray(r.readings?.die) ? r.readings!.die as Temperature[] : []).flatMap((d) => (d.measured ? [d] : []))
    const hottest = dies.reduce<(typeof dies)[number] | null>((m, d) => (m === null || d.millikelvin > m.millikelvin ? d : m), null)
    const sensor = hottest ? hottest.source.replace(/^die sensor /, '').replace(/, IOHIDEventSystem.*$/, '') : ''
    console.log(`· receipt ${name} #${count} saved · ${r.file ?? r.coord ?? address} · ${r.readings?.ns ?? '?'} ns · hottest sensor ${hottest ? `${hottest.millikelvin} mK (${sensor})` : 'none'} · battery ${r.readings?.battery?.millikelvin ?? 'none'} mK`)
  }
  void depositEvidence(name, row as Record<string, unknown>)
}

/** loggedEvidence(name) → every receipt already appended under that name, oldest first — for a run to resume from */
export function loggedEvidence<T>(name: string): T[] {
  try {
    return readFileSync(join(ROOT, 'dist', 'evidence', `${name}.jsonl`), 'utf8').split('\n').filter(Boolean).flatMap((l) => {
      try { return [JSON.parse(l) as T] } catch { return [] }
    })
  } catch { return [] }
}

if (process.argv[1]?.endsWith('device-readings.js')) console.log(JSON.stringify(deviceReadings(), null, 1))
