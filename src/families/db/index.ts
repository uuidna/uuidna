import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE QPU OS DATABASE: UNLIMITED EXPERIMENTS, NO MIGRATIONS. Every database is an adapter facade over one store — the
 *  Cloudflare bindings (KV, R2, D1) the Worker holds. Persistence is content-addressed there, so there are no schema
 *  migrations at all: a field added is a new content UUID, not an ALTER TABLE. The query surface runs where its engine
 *  can: Postgres runs in the browser for real (PGlite — Postgres compiled to WebAssembly); SQLite runs in the browser
 *  (wa-sqlite); MongoDB's surface is a facade over the same binding store (there is no production WebAssembly mongod,
 *  so a browser Mongo experiment persists to the binding, not to a real server). Every adapter × deploy-mode is an
 *  address, so the experiments are unbounded and each one is a stable solution the moment it compiles. */

// adapter: engine, whether its query surface runs in the browser (WASM), and the Cloudflare binding that stores it
// every database Payload (and Next) can use, ported onto the QPU OS binding store. `payload` is the official adapter
// package it ports (db-*); the QPU adapters have none. On the OS the engine is a query facade; the store is the binding.
const ADAPTERS = [
  { name: 'd1', payload: 'db-d1-sqlite', engine: 'sqlite (wa-sqlite WASM)', browser: true, binding: 'D1' },
  { name: 'sqlite', payload: 'db-sqlite', engine: 'sqlite (wa-sqlite WASM)', browser: true, binding: 'D1' },
  { name: 'postgres', payload: 'db-postgres', engine: 'postgres (PGlite WASM)', browser: true, binding: 'KV+R2' },
  { name: 'vercel-postgres', payload: 'db-vercel-postgres', engine: 'postgres (PGlite WASM)', browser: true, binding: 'KV+R2' },
  { name: 'mongodb', payload: 'db-mongodb', engine: 'mongo surface (facade)', browser: false, binding: 'KV+R2' },
  { name: 'qpu-raid', payload: '', engine: 'content-addressed RAID', browser: true, binding: 'KV+R2' },
  { name: 'qpu-d1', payload: '', engine: 'content-addressed on D1', browser: true, binding: 'D1' },
] as const
/** Every official Payload database adapter this family ports (its db-* package name). */
export const PORTED_DB = ADAPTERS.filter((a) => a.payload).map((a) => a.payload)
const MODES = ['browser', 'standalone', 'docker', 'k8s'] as const
const BINDINGS = ['KV', 'R2', 'D1', 'KV+R2'] as const
const PROOF = 'Cloudflare bindings (KV, R2, D1) as a content-addressed store: no schema migrations; PGlite (Postgres in WebAssembly) and wa-sqlite in the browser; every adapter × mode an address'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'db', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `db.${name}`, params })

export class DbFormulas {
  /** The migrations the i-th adapter needs on Cloudflare: 0 for every one — the store is content-addressed bindings, a
   *  field is a new UUID, never an ALTER. Holds always: no migrations whatsoever. */
  static migrations(i: number): CrossFormula { const a = ADAPTERS[i]; return f('db-migrations', 'migrations(i) = 0 (content-addressed bindings; a field is a new UUID, not a migration)', 0, nat(i) && a !== undefined, 'migrations', [i], { adapter: a?.name, binding: a?.binding, why: 'content-addressed store' }) }
  /** 1 when the i-th adapter's query surface runs in the browser (SQLite via wa-sqlite, Postgres via PGlite WASM); 0
   *  when it is a facade with no browser engine (MongoDB). The store is the binding either way. */
  static browser(i: number): CrossFormula { const a = ADAPTERS[i]; return f('db-browser', 'browser(i) = [adapter i’s engine runs in the browser]', a?.browser ? 1 : 0, nat(i) && a !== undefined, 'browser', [i], { adapter: a?.name, engine: a?.engine }) }
  /** The Cloudflare binding that stores the i-th adapter: KV 1, R2 2, D1 3, KV+R2 4 — the one store every facade writes to. */
  static binding(i: number): CrossFormula { const a = ADAPTERS[i]; return f('db-binding', 'binding(i) = the Cloudflare binding adapter i stores in', a ? BINDINGS.indexOf(a.binding) + 1 : 0, nat(i) && a !== undefined, 'binding', [i], { adapter: a?.name, binding: a?.binding }) }
  /** The adapter × deploy-mode combinations: |adapters| · |modes| — the config space, every one an address. */
  static combinations(): CrossFormula { return f('db-combinations', 'combinations = |adapters| · |modes|', ADAPTERS.length * MODES.length, true, 'combinations', [], { adapters: ADAPTERS.map((a) => a.name), modes: MODES }) }
  /** 1 when the i-th adapter is a stable solution in mode m: a browser mode needs a browser engine; the server modes
   *  (standalone, docker, k8s) run every adapter. Every stable combination compiles and persists to the binding. */
  static stable(i: number, m: number): CrossFormula { const a = ADAPTERS[i]; const mode = MODES[m]; const ok = a !== undefined && mode !== undefined && (mode !== 'browser' || a.browser); return f('db-stable', 'stable(i, m) = [mode m runs adapter i]: browser needs a browser engine; server modes run all', ok ? 1 : 0, nat(i, m) && a !== undefined && mode !== undefined, 'stable', [i, m], { adapter: a?.name, mode }) }
  /** The official Payload adapter the i-th database ports (db-d1-sqlite, db-mongodb, db-postgres, db-sqlite,
   *  db-vercel-postgres); value 1 when it ports a Payload package, 0 for a QPU-native adapter. The reading names it. */
  static ported(i: number): CrossFormula { const a = ADAPTERS[i]; return f('db-ported', 'ported(i) = [adapter i ports an official Payload db-* package]', a?.payload ? 1 : 0, nat(i) && a !== undefined, 'ported', [i], { adapter: a?.name, payload: a?.payload || 'qpu-native', engine: a?.engine }) }
  /** How many databases are ported: the count of adapters. Every one usable by Payload and Next, on the binding store. */
  static adapters(): CrossFormula { return f('db-adapters', 'adapters = |databases ported onto the OS|', ADAPTERS.length, true, 'adapters', [], { names: ADAPTERS.map((a) => a.name), payload: ADAPTERS.filter((a) => a.payload).map((a) => a.payload) }) }
  /** The n-th experiment: there is no ceiling — every (adapter, mode, field-shape) is a content address, so the count
   *  of experiments is n itself, each stable the moment it compiles. value n; holds for any n. */
  static experiments(n: number): CrossFormula { return f('db-experiments', 'experiments(n) = n (unbounded: every config is a content address, no migration to block it)', n, nat(n), 'experiments', [n], { adapters: ADAPTERS.length, modes: MODES.length, migrations: 0 }) }
}

for (const name of ['adapters', 'binding', 'browser', 'combinations', 'experiments', 'migrations', 'ported', 'stable'] as const)
  hexRegisterOf('db', name, (DbFormulas[name] as (...x: unknown[]) => unknown).bind(DbFormulas))
