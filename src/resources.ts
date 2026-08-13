// @non-harmonic: node process/os resource accounting (reads process/os — measured, not sealed) — NAMED boundary; the harmonic core must never carry these ops.
// resources — honest resource accounting for the device uuidna runs on. You can only BALANCE what you MEASURE, so
// this meters what is actually measurable from Node — CPU time, memory, load, the machine's cores and free memory —
// content-addresses the reading, and states plainly what it does NOT and CANNOT measure here (GPU, bandwidth, and
// the joules themselves need platform-specific probes, and are never faked). It balances the thermodynamics by
// keeping the books on the COST side: it names the work spent, and names Landauer's floor as the energy that work
// costs — there is no free energy, only a measured spend pushed toward, never past, the limit. Node-only (reads
// process/os), so it is deliberately NOT re-exported through the browser index. Integrity, not truth.
import { loadavg, cpus, totalmem, freemem, uptime as osUptime } from 'node:os'
import { toUuid } from './address.js'

export interface ResourceReading {
  cpu: { userMicros: number; systemMicros: number }        // process.cpuUsage — CPU time this process has spent
  memory: { rssBytes: number; heapUsedBytes: number; heapTotalBytes: number } // process.memoryUsage
  system: { loadAvg1: number; cores: number; totalMemBytes: number; freeMemBytes: number; uptimeSec: number }
  address: string          // content-address of this exact reading — a signed measurement, recomputable from its values
  measured: string         // what these numbers are
  notMeasured: string      // what is NOT here (and is not invented)
  thermodynamics: string   // the honest floor: work costs energy; no free energy
}

/** resources() → a snapshot of the measurable device usage, content-addressed. Non-deterministic by nature (it reads
 *  live state), so each reading is its own receipt. It measures the CPU and memory Node exposes and refuses to fake
 *  the rest. Balancing the thermodynamics means accounting the spend honestly, never claiming it is free. */
export function resources(): ResourceReading {
  const cu = process.cpuUsage()
  const mu = process.memoryUsage()
  const reading = {
    cpu: { userMicros: cu.user, systemMicros: cu.system },
    memory: { rssBytes: mu.rss, heapUsedBytes: mu.heapUsed, heapTotalBytes: mu.heapTotal },
    system: {
      loadAvg1: loadavg()[0],
      cores: cpus().length,
      totalMemBytes: totalmem(),
      freeMemBytes: freemem(),
      uptimeSec: osUptime(),
    },
  }
  return {
    ...reading,
    address: toUuid(JSON.stringify(reading)),
    measured: 'CPU time (this process) and memory (rss/heap), plus the machine load, cores, total/free memory, and uptime — all read from Node/OS.',
    notMeasured: 'GPU utilisation, network bandwidth, and the actual joules drawn are NOT measured here — they need platform-specific probes, and are not invented. A reading you cannot take is left blank, not guessed.',
    thermodynamics: 'Balancing the thermodynamics is accounting the spend, not escaping it: this work costs energy — at least Landauer\'s kT·ln2 per bit erased, far more on a real chip, paid as heat. Efficiency can be pushed toward that floor, never past it. There is no free energy.',
  }
}
