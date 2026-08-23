// @non-harmonic: fetchDailyOnce reaches the public Stooq CSV endpoint via fetch (network — non-recomputable),
// ONCE per symbol, to seal a series into the committed mirror — NAMED boundary; everything else here is pure.
// market — TRAIN THE STRATEGIES TO HANDLES OF HISTORIC DATA, so APIs are never called at each request.
//
// The captain's law (2026-08-23) is the house caching law applied to markets: historic data is IMMUTABLE, so
// it is fetched ONCE, content-addressed, and committed to the mirror under its handle (the same
// committed-mirror pattern as the Alpine port: deterministic and fetch-free from the mirror, the network
// crossed a single time). Every backtest then REPLAYS from the handle — and that is what makes a strategy
// presentable to the court: the series has an address, the strategy is PRE-REGISTERED (its parameters folded
// to an address BEFORE any result exists), and the result folds with both into one receipt any observer
// recomputes. A backtest without this is the ring that cannot refute (two_plus_two_is_five_only_mod_one).
//
// INTEGER DISCIPLINE: prices ride as integer CENTS, averages use floor division, PnL is integer cents —
// no floats, no Math.*, the same total arithmetic the kernel decides.
//
// HONEST SCOPE: a receipted backtest proves REPRODUCIBILITY, never profitability — past series prove nothing
// about future ones (the window is a window: window_not_universal), and the control run proves only that the
// instrument CAN show zero edge on no-signal data. Integrity, not alpha.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'

export interface Row { date: string; close: number }

export interface SealedSeries {
  symbol: string
  rows: Row[]
  /** the series' content-address — the exact data trained on, recomputable by anyone holding the rows */
  address: string
  /** the series' handle — the mirror filename and the citation every backtest carries */
  handle: string
  receipt: string
}

/** sealSeries(symbol, rows) → the content-addressed series. Deterministic; the address IS the identity. */
export function sealSeries(symbol: string, rows: readonly Row[]): SealedSeries {
  const clean = rows.map((r) => ({ date: String(r.date), close: (r.close - (r.close % 1)) }))
  const address = toUuid(`series:${symbol}|` + clean.map((r) => `${r.date}:${r.close}`).join(','))
  return {
    symbol: String(symbol), rows: clean, address, handle: handleOf(address),
    receipt: merkleGravity([toUuid('market-series'), address]),
  }
}

/** parseStooqCsv(csv) → rows with close in integer CENTS (floor). Bounded to the last `limit` rows. */
export function parseStooqCsv(csv: string, limit = 512): Row[] {
  const lines = String(csv).trim().split('\n').slice(1)
  const rows: Row[] = []
  for (const line of lines) {
    const [date, , , , close] = line.split(',')
    if (!date || !close) continue
    const cents = Number((Number(close) * 100).toFixed(0))
    if (!Number.isFinite(cents) || cents <= 0) continue
    rows.push({ date, close: cents })
  }
  return rows.slice(rows.length > limit ? rows.length - limit : 0)
}

/** fetchDailyOnce(symbol) → ONE network crossing to Stooq's public CSV (no key). The caller seals and commits
 *  the result to the mirror; after that the network is never consulted for this series again. */
export async function fetchDailyOnce(symbol: string): Promise<Row[]> {
  const res = await fetch(`https://stooq.com/q/d/l/?s=${encodeURIComponent(symbol)}&i=d`)
  if (!res.ok) throw new Error(`stooq answered ${res.status} for ${symbol}`)
  return parseStooqCsv(await res.text())
}

/** integer SMA over the last n closes ending at index i (inclusive) — floor division, total. */
const sma = (rows: readonly Row[], i: number, n: number): number => {
  let s = 0
  for (let k = i - n + 1; k <= i; k++) s += rows[k].close
  return (s - (s % n)) / n
}

export interface Strategy { rule: 'sma-cross'; fast: number; slow: number }
export interface Trade { entry: string; exit: string; entryCents: number; exitCents: number; pnlCents: number }

export interface Backtest {
  seriesAddress: string
  seriesHandle: string
  /** the strategy's PRE-REGISTERED address — folded from its parameters alone, before any result exists */
  strategyAddress: string
  strategy: Strategy
  trades: Trade[]
  pnlCents: number
  /** the control: the same engine on a constant series must produce zero trades and zero edge, or the run is void */
  controlRejected: boolean
  outcome: 'tested' | 'void'
  /** series ⊗ strategy ⊗ result, folded order-invariantly — the receipt any observer recomputes */
  receipt: string
  honest: string
}

/** runBacktest(series, strategy) → the receipted replay. Pure: same handle + same registration = same receipt. */
export function runBacktest(series: SealedSeries, strategy: Strategy): Backtest {
  const { fast, slow } = strategy
  const strategyAddress = toUuid(`strategy:${strategy.rule}|fast:${fast}|slow:${slow}`)
  // the control MUST fail to find an edge where there is none: a constant series has no crossings
  const flat = sealSeries('control-flat', Array.from({ length: slow * 3 }, (_, i) => ({ date: `c${i}`, close: 10000 })))
  const controlTrades = crossTrades(flat.rows, fast, slow)
  const controlRejected = controlTrades.length === 0
  const trades = controlRejected ? crossTrades(series.rows, fast, slow) : []
  const pnlCents = trades.reduce((s, t) => s + t.pnlCents, 0)
  const result = { trades: trades.length, pnlCents }
  return {
    seriesAddress: series.address, seriesHandle: series.handle, strategyAddress, strategy,
    trades, pnlCents, controlRejected,
    outcome: controlRejected ? 'tested' : 'void',
    receipt: merkleGravity([series.address, strategyAddress, toUuid(JSON.stringify(result))]),
    honest: controlRejected
      ? 'REPRODUCIBLE, not prophetic: the series is addressed, the strategy pre-registered, the result folded ' +
        'with both — anyone replays the handle to the same receipt. Past windows prove nothing about future ' +
        'ones (window_not_universal); this receipts the test, never the edge.'
      : 'VOID — the engine found trades in a constant series: the instrument cannot tell signal from silence, ' +
        'so the subject run carries no information (a trial that cannot fail proves nothing).',
  }
}

/** the sma-cross replay: long when fast crosses above slow, flat when it crosses back. Integer cents throughout. */
function crossTrades(rows: readonly Row[], fast: number, slow: number): Trade[] {
  const trades: Trade[] = []
  if (rows.length <= slow || fast >= slow || fast < 1) return trades
  let entry: { date: string; cents: number } | null = null
  for (let i = slow; i < rows.length; i++) {
    const above = sma(rows, i, fast) > sma(rows, i, slow)
    const wasAbove = sma(rows, i - 1, fast) > sma(rows, i - 1, slow)
    if (above && !wasAbove && entry === null) entry = { date: rows[i].date, cents: rows[i].close }
    else if (!above && wasAbove && entry !== null) {
      trades.push({ entry: entry.date, exit: rows[i].date, entryCents: entry.cents, exitCents: rows[i].close, pnlCents: rows[i].close - entry.cents })
      entry = null
    }
  }
  return trades
}
