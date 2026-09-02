// @non-harmonic: uuidnaOS shared network fetch — one cache, one HTML refusal rule, every port pays once per URL.
export type DataKind = 'json' | 'csv' | 'text'

export interface Fetched<T> { data: T | null; declined: boolean; note: string }

/** the deadline every port inherits — one bound, so a fan-out costs one deadline and not the sum of its doors */
export const FETCH_TIMEOUT_MS = 25_000

const isHtml = (contentType: string, body: string): boolean =>
  /text\/html/i.test(contentType) || /^\s*(<!doctype html|<html[\s>])/i.test(body.slice(0, 200))

const _immutable = new Map<string, string>()
const _live = new Map<string, Fetched<string>>()

/** isHtmlResponse(contentType, body) → whether a 200 is a web page, not data. Pure. */
export function isHtmlResponse(contentType: string, body: string): boolean {
  return isHtml(contentType, body)
}

/** fetchData(url, kind, init?) → JSON, CSV, or text with HTML refusal and process-scoped URL cache. */
export async function fetchData<T>(url: string, kind: DataKind, init?: RequestInit): Promise<Fetched<T>> {
  const cacheKey = kind + '|' + url + '|' + (init?.method ?? 'GET') + '|' + (typeof init?.body === 'string' ? init.body : '')
  const cached = _live.get(cacheKey)
  if (cached !== undefined) {
    if (cached.data === null) return { data: null, declined: cached.declined, note: cached.note + ' (cached)' }
    if (kind === 'json') {
      try { return { data: JSON.parse(cached.data) as T, declined: false, note: 'ok (cached)' } }
      catch { return { data: null, declined: true, note: 'payload did not parse as JSON (cached)' } }
    }
    return { data: cached.data as unknown as T, declined: false, note: 'ok (cached)' }
  }
  const accept = kind === 'json' ? 'application/json' : kind === 'csv' ? 'text/csv' : 'text/plain,*/*'
  let r: Response
  try {
    r = await fetch(url, {
      ...init,
      headers: { accept, ...(init?.headers ?? {}) },
      // A DOOR THAT NEVER ANSWERS IS NOT A DOOR THAT SAYS NO. Without a deadline one unresponsive host held the
      // whole fan-out open for as long as the socket stayed alive, so a sweep's cost was the SLOWEST host rather
      // than the deadline — and a hung port read as "still working" instead of declining. The bound is the same
      // for every port, a caller may pass its own signal for a door known to be slow (zenodo's community listing
      // takes tens of seconds), and a timeout arrives as a NAMED refusal like any other.
      signal: init?.signal ?? AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
  }
  catch (e) { return { data: null, declined: true, note: 'unreachable: ' + String((e as Error).message).slice(0, 90) } }
  if (!r.ok) return { data: null, declined: true, note: `responded ${r.status}` }
  const text = await r.text()
  if (isHtml(r.headers.get('content-type') ?? '', text))
    return { data: null, declined: true, note: 'served a WEB PAGE (text/html), not data — answering is not the same as answering with data' }
  _live.set(cacheKey, { data: text, declined: false, note: 'ok' })
  if (kind === 'csv' || kind === 'text') return { data: text as unknown as T, declined: false, note: 'ok' }
  try { return { data: JSON.parse(text) as T, declined: false, note: 'ok' } }
  catch { return { data: null, declined: true, note: 'payload did not parse as JSON' } }
}

/** immutableText(url, kind) → fetch a version-carrying URL once per process (GISCO vintage CSV, etc.). */
export async function immutableText(url: string, kind: DataKind): Promise<Fetched<string>> {
  const hit = _immutable.get(url)
  if (hit !== undefined) return { data: hit, declined: false, note: 'cached' }
  const got = await fetchData<string>(url, kind)
  if (got.data !== null) _immutable.set(url, got.data)
  return got
}

/** immutableReads() → versioned URLs held in the immutable cache. Pure over the cache state. */
export function immutableReads(): { url: string; bytes: number }[] {
  return [..._immutable].map(([url, text]) => ({ url, bytes: text.length }))
}

/** clearOsFetchCache() → drop live and immutable caches (tests only). */
export function clearOsFetchCache(): void {
  _immutable.clear()
  _live.clear()
}
