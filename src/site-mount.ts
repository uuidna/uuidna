// THE SITE BEHIND THE EDGE — the Payload app (uuidna web/, the Worker uuidna-site) answers the paths it owns, reached over
// the SITE service binding; every other path stays this Worker's. /chat itself is the docs page that explains receipted
// chat, so the app owns only what lies under it (rooms and their WebSocket), never the page.
export const SITE_PREFIXES = ['/admin', '/api/', '/_next/', '/chat/', '/install', '/cloud'] as const

/** siteOwns(pathname) → the Payload app answers this path; a prefix ending in a segment matches it exactly or below it */
export const siteOwns = (pathname: string): boolean =>
  SITE_PREFIXES.some((p) => (p.endsWith('/') ? pathname.startsWith(p) : pathname === p || pathname.startsWith(p + '/')))
