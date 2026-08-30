// trial-send — desk citation enrichment, then detail audit (or video when url supplied).
import { auditDetails, type DetailAudit } from './detail-audit.js'

/** Detail lines matching a sealed topic receive a theorem citation when none is present. */
const ENRICH: readonly [RegExp, string][] = [
  [/128.?bit|32 hex digit|36 character|printed form.*hyphen/i, 'speaking_an_address_costs_the_text'],
  [/six bits|122 free|version and variant|128 − 6/i, 'imprint_capacity_chain'],
  [/four two-character|splits exactly four|four path level|8 hex character.*four/i, 'handle_splits_four'],
  [/first 8 hex|first group|handle is eight/i, 'handle_is_the_first_group'],
  [/payload store|src\/handles|prose body is required|lazy payload/i, 'payload_carries_the_strand'],
  [/round-trip|handleOfPath|path round.trip/i, 'handle_splits_four'],
  [/complete address.*handle|16\^8|4294967296/i, 'message_carries_address'],
]

export function enrichTrialText(text: string): string {
  return text.split('\n').map((line) => {
    const raw = line.trim()
    if (!raw) return raw
    let out = raw
    for (const [re, key] of ENRICH) {
      if (!re.test(out)) continue
      if (out.includes(`theorem ${key}`) || out.includes(`/theorem/${key}`)) continue
      out += `, proven by theorem ${key}`
    }
    return out
  }).join('\n')
}

export type SendTrialOpts = {
  title?: string
  delimiter?: string
  enrich?: boolean
}

/** sendTrial — enrich sealed-topic citations, then auditDetails. */
export function sendTrial(text: string, opts: SendTrialOpts = {}): DetailAudit {
  const body = opts.enrich === false ? text : enrichTrialText(text)
  return auditDetails(body, { title: opts.title, delimiter: opts.delimiter })
}
