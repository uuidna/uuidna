// @non-harmonic: CVE lookup via a free public API (network) — NAMED boundary; the harmonic core must never carry these ops.
// cve — audit a CVE's PUBLIC advisory metadata from NIST's National Vulnerability Database (NVD,
// services.nvd.nist.gov, no key for low rate). Content-addresses the id, English description, CVSS severity and
// dates — a recomputable provenance fingerprint of the public advisory, for the security reflection (the theorems a
// real security system reflects). HONEST SCOPE: it fingerprints the PUBLIC metadata only, NOT an exploit, NOT the
// affected code, and it is NOT a claim that uuidna assesses, reproduces, or fixes the vulnerability. NVD publishes;
// uuidna fingerprints the public record so it can be cited and rechecked. One network call; the audit is pure.
import { auditText, type BookAudit } from './books.js'

/** A CVE audit — the provenance fingerprint of an NVD advisory's public metadata, with its CVSS severity. */
export interface CveAudit extends BookAudit { cve: string; cvss: number | null; severity: string; published: string }

/** auditCve(id) → fingerprint a CVE's public NVD metadata (id, description, CVSS, dates), content-addressed. Anyone
 *  re-fetches the same public advisory and recomputes the same address. */
export async function auditCve(cveId: string): Promise<CveAudit> {
  const id = String(cveId).trim().toUpperCase()
  if (!/^CVE-\d{4}-\d{4,}$/.test(id)) throw new Error(`cve: invalid CVE id "${cveId}" (expected CVE-YYYY-NNNN)`)
  const r = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${encodeURIComponent(id)}`)
  if (!r.ok) throw new Error(`cve: NVD responded ${r.status} for ${id}`)
  const j = (await r.json()) as { vulnerabilities?: { cve?: Record<string, unknown> }[] }
  const cve = j.vulnerabilities?.[0]?.cve as
    | { descriptions?: { lang: string; value: string }[]; metrics?: Record<string, { cvssData?: { baseScore?: number; baseSeverity?: string }; baseSeverity?: string }[]>; published?: string }
    | undefined
  if (!cve) throw new Error(`cve: NVD returned no record for ${id}`)
  const desc = (cve.descriptions || []).find((d) => d.lang === 'en')?.value || ''
  const m = cve.metrics || {}
  const metric = (m.cvssMetricV31 || m.cvssMetricV30 || m.cvssMetricV2 || [])[0]
  const cvss = metric?.cvssData?.baseScore ?? null
  const severity = metric?.cvssData?.baseSeverity || metric?.baseSeverity || ''
  const published = cve.published || ''
  const meta = `${id}\n${desc}\nCVSS ${cvss ?? '?'} ${severity}\n${published}`
  return {
    ...auditText(meta, { title: id, source: `https://nvd.nist.gov/vuln/detail/${id}` }),
    cve: id,
    cvss,
    severity,
    published,
    honest:
      'Fingerprints the PUBLIC NVD advisory metadata of a CVE (id, description, CVSS severity, dates), content-addressed ' +
      '— NOT an exploit, NOT the affected code, and NOT a claim that uuidna assesses, reproduces, or fixes the ' +
      'vulnerability. NVD publishes; uuidna fingerprints the public record so it can be cited and rechecked by anyone.',
  }
}
