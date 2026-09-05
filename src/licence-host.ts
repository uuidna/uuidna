// licence-host — WHICH HOSTS MAY BE SERVED. Every host needs a licence, including uuidna.com.
//
// (the captain, 2026-09-06: "all need license including uuidna.com".)
//
// WHAT THIS REPLACES AND WHY IT MATTERS. worker.js carried
//   const FIRST_PARTY = /(^|\.)uuidna\.(com|net|org)$/i
// and auto-licensed everything matching it, so uuidna.net, uuidna.org and EVERY subdomain of all three served
// without appearing anywhere in the licence set. The rule as stated admits exactly one host per entry, so the
// wildcard is gone: a host serves because it is written down, or it is redirected to the terms it is missing.
//
// THE LOOP IS THE HAZARD AND IT IS NOW STRUCTURAL RATHER THAN REMEMBERED. An unlicensed host is redirected to
// REDIRECT_TO, which is a URL on a host of its own. If that host is not itself licensed, it redirects to itself
// and every request becomes an infinite loop. Under the old rule the wildcard happened to cover it and a comment
// recorded the coincidence; here `licensedHosts` is asserted to contain REDIRECT_TO's host by a test, so the
// loop cannot be reintroduced by editing the set.
//
// PURE. No network, no filesystem, no clock — a hostname in, a verdict out.

/** Where an unlicensed host is sent: the terms it is missing. Its own host MUST be licensed. */
export const REDIRECT_TO = 'https://uuidna.com/license'

/** Every host permitted to serve. One entry per host — no wildcard, no pattern, no implicit family. */
export const LICENSED_HOSTS: readonly string[] = [
  'uuidna.com',
]

/** mayServe(host) → may this host be served, or must it be redirected to the terms?
 *  Compared lowercase; a trailing dot (the DNS root form) is not a different host. */
export function mayServe(host: string): boolean {
  return LICENSED_HOSTS.includes(host.toLowerCase().replace(/\.$/, ''))
}

/** the host an unlicensed request is sent to — extracted so the no-loop invariant can be asserted */
export const redirectHost = (): string => new URL(REDIRECT_TO).hostname.toLowerCase()
