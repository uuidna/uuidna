// @non-harmonic: fetches PUBLIC video metadata (YouTube oEmbed, keyless) via fetch (network — non-recomputable) — NAMED boundary; the harmonic core must never carry these ops.
// video — audit a PUBLIC video listing: fingerprint its POSTED metadata (oEmbed) and adjudicate SUPPLIED caption
// text detail by detail. This module is a hand-driven session folded into the surface (the Black Whole audit ran
// as scratchpad curl + a hand-held transcript + a hand-driven detail audit, five receipts of manual work): the
// same chain now runs as ONE reusable tool, so the next video costs a call, not a session.
//
// HONEST SCOPE (integrity, not truth):
//  · The metadata is what the platform PUBLICLY POSTS via oEmbed (title, channel) — REPORTED data, content-
//    addressed; the fingerprint proves WHICH listing was audited, never that the listing is true.
//  · Caption text is SUPPLIED BY THE CALLER and audited as DATA — content-addressed and adjudicated, never
//    executed. uuidna does NOT fetch, decode, or reproduce the video: footage, audio and caption tracks stay
//    with their owner (caption endpoints require the platform's own authorization — a boundary named, not
//    smoothed over; theorem drift_is_named_or_caught).
//  · Verdicts settle arithmetic and citations, never the world (theorem provenance_integrity_not_content_truth).
import { auditText, type BookAudit } from './books.js'
import { auditDetails, type DetailAudit } from './detail-audit.js'

/** A video-listing audit — the posted-metadata fingerprint, plus (when captions were supplied) the caption
 *  text's detail-by-detail ledger under the controls-first instrument. */
export interface VideoAudit extends BookAudit {
  videoId: string
  author: string
  authorUrl: string
  provider: string
  /** present iff the caller supplied caption text — every caption detail adjudicated */
  captions?: DetailAudit
}

/** videoIdOf(urlOrId) → the 11-character video id inside a YouTube URL (watch?v=, youtu.be/, embed/, shorts/),
 *  or the input itself when it is already a bare id. Pure string work — no network. */
export function videoIdOf(urlOrId: string): string {
  const s = urlOrId.trim()
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)
  if (m) return m[1]!
  const bare = s.match(/^[A-Za-z0-9_-]{11}$/)
  return bare ? bare[0] : s
}

/** auditVideo(urlOrId[, opts]) → fingerprint the PUBLIC oEmbed metadata of a video (title, channel — keyless,
 *  posted by the platform itself) and, when the caller supplies {captions}, adjudicate EVERY caption detail with
 *  the controls-first detail audit. Caption text defaults to the newline delimiter — ASR captions carry no
 *  punctuation, so the line is the honest detail boundary. */
export async function auditVideo(urlOrId: string, opts: { captions?: string; delimiter?: string } = {}): Promise<VideoAudit> {
  const id = videoIdOf(urlOrId)
  const watch = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`
  const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watch)}&format=json`, { signal: AbortSignal.timeout(15000) })
  if (!r.ok) throw new Error(`video: oEmbed responded ${r.status} for ${id}`)
  const j = (await r.json()) as { title?: string; author_name?: string; author_url?: string; provider_name?: string }
  const meta = `${j.title || ''}\n${j.author_name || ''}\n${j.author_url || ''}\n${watch}`
  const captions = opts.captions === undefined
    ? undefined
    : auditDetails(opts.captions, { title: j.title || id, delimiter: opts.delimiter === undefined ? '\n' : opts.delimiter })
  return {
    ...auditText(meta, { title: j.title || id, source: watch }),
    videoId: id,
    author: j.author_name || '',
    authorUrl: j.author_url || '',
    provider: j.provider_name || '',
    ...(captions === undefined ? {} : { captions }),
    honest:
      'Fingerprints the PUBLIC oEmbed metadata the platform itself posts (title, channel) — REPORTED data, content-addressed; ' +
      'it proves WHICH listing was audited, never that the listing is true. Caption text is SUPPLIED by the caller and audited ' +
      'as DATA (every detail adjudicated, controls first), never executed; uuidna does not fetch, decode, or reproduce the ' +
      'video. Verdicts settle arithmetic and citations, never the world.',
  }
}
