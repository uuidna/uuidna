// The edge in front of the static assets — enforces the domain rule the license states (docs/license.md):
//
//   • uuidna.com licenses ITSELF, and that licence AUTO-LICENSES the first-party wildcard
//     *.uuidna.com | *.uuidna.net | *.uuidna.org (every apex and subdomain). Those are served.
//   • Any OTHER host is redirected to the canonical uuidna.com — UNLESS it holds a licence: a commercial CNAME
//     licensed via uuidna.com/license, listed in LICENSED below. The first-party wildcard needs no entry.
//
// The path and query are preserved, so a deep link lands on the same page at uuidna.com. The redirect is 302
// (temporary), not 301: licensing is conditional and can change (a licence change is a new signature — a new
// content-address — so prior state must not be cached hard). uuidna.com is itself first-party, so it serves and
// never loops. Reversible: remove `main`/`run_worker_first` and the site is plain assets again.
//
// Runs on Cloudflare Workers Assets with run_worker_first = true, so it intercepts EVERY request (including asset
// hits) before the static layer; the serve path delegates to env.ASSETS.fetch, which still honours the [assets]
// html_handling / not_found_handling rules in wrangler.toml.

const FIRST_PARTY = /(^|\.)uuidna\.(com|net|org)$/i

// Licensed external domains (commercial CNAMEs), each explicitly licensed via uuidna.com/license. Add a licensee's
// host here when its contract is signed; the auto-licensed first-party wildcard above is matched by FIRST_PARTY and
// needs no entry. Hosts are compared lowercase.
const LICENSED = new Set([])

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const host = url.hostname.toLowerCase()

    // Licensed (first-party wildcard, auto-licensed; or an explicitly licensed CNAME) → serve the assets.
    if (FIRST_PARTY.test(host) || LICENSED.has(host)) return env.ASSETS.fetch(request)

    // Unlicensed host → redirect to the canonical source, keeping the path and query.
    url.protocol = 'https:'
    url.hostname = 'uuidna.com'
    url.port = ''
    return Response.redirect(url.toString(), 302)
  },
}
