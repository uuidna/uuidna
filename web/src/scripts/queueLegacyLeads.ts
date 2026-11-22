import { PROSE, proseFill } from '@uuidna/qpu/prose'
import { execFileSync } from 'child_process'
import { randomBytes } from 'crypto'
import { createPayloadRequest, getPayload, registerFirstUserOperation } from 'payload'

import config from '@payload-config'
import { uuid } from '@uuidna/qpu/address'

/** Bootstrap the admin user and queue module leads, then run them: `pnpm payload run src/scripts/queueLegacyLeads.ts`.
 *  Modules are read from git by path (LEGACY_PATHS names them; the default tree is empty once a prior fork is removed),
 *  each module's address being the content address of its committed text. LEGACY_LIMIT takes the first N. Every
 *  write runs as an admin user with access on (the v4 Local API default), so hooks and access decide. */
const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 1 << 30 })
const EXPORT = /export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g
const EXPORT_LIST = /export\s*\{([^}]*)\}/g
const modules = git('ls-tree', '-r', '--name-only', 'HEAD', 'legacy')
  .split('\n')
  .filter((p) => /\.(ts|tsx|js|mjs|cjs)$/.test(p) && !p.endsWith('.d.ts'))
  .sort()
// LEGACY_PATHS (comma-separated) takes those modules instead of the tree's head
const paths = process.env.LEGACY_PATHS?.split(',').map((p) => p.trim()).filter(Boolean)
const chosen = paths ? modules.filter((p) => paths.includes(p)) : modules
const limit = Number(process.env.LEGACY_LIMIT || chosen.length)
const entries = chosen.slice(0, limit).map((p) => {
  const text = git('show', `HEAD:${p}`)
  const names = new Set<string>()
  for (const m of text.matchAll(EXPORT)) names.add(m[1]!)
  for (const m of text.matchAll(EXPORT_LIST))
    for (const part of m[1]!.split(',')) { const name = part.trim().split(/\s+as\s+/).pop()?.trim(); if (name) names.add(name) }
  return { address: uuid(text) as string, exports: [...names].sort(), path: p }
})
const payload = await getPayload({ config })

// THE ACTING USER. Resolving who acts is the one read past access, as the template's ensureFirstUserIsAdmin does. On an
// empty database the first admin is made by Payload's own first-user operation (the admin panel's "create first user").
// Its password is random and kept nowhere: the script never logs in, and an admin resets it to sign in.
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@qpu.localhost'
const found = await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })
const user =
  found.docs[0] ??
  (
    await registerFirstUserOperation({
      collection: payload.collections.users,
      data: { email, name: 'legacy leads', password: randomBytes(32).toString('hex'), roles: ['admin'] },
      req: await createPayloadRequest({ payload }),
    })
  ).user
if (!user) throw new Error(proseFill(PROSE.scriptsQueueLegacyLeads_s1, email))
if (!user.roles?.includes('admin')) throw new Error(proseFill(PROSE.scriptsQueueLegacyLeads_s2, email))
const req = await createPayloadRequest({ payload, user: { ...user, collection: 'users' } })

const tenants = await payload.find({ collection: 'tenants', limit: 1, req, where: { slug: { equals: 'qpu' } } })
const tenant =
  tenants.docs[0] ??
  (await payload.create({ collection: 'tenants', data: { name: 'qpu', slug: 'qpu', allowPublicRead: true }, req }))

// a module already stored as a lead is not queued again. The jobs collection is closed to every reader, so a job still
// pending from an earlier run is not seen here; queued twice, the second finds the stored page and tries nothing.
// LEGACY_LIMIT=0 queues nothing and only runs what is pending.
const stored = await payload.find({ collection: 'pages', depth: 0, draft: true, pagination: false, req, select: { lead: true }, where: { 'lead.kind': { equals: 'module' } } })
const known = new Set(stored.docs.map((d) => d.lead?.path))
const fresh = entries.filter((e) => !known.has(e.path))
for (const entry of fresh)
  await payload.jobs.queue({
    task: 'legacyLead',
    input: { address: entry.address, exports: entry.exports.join(', '), path: entry.path, tenant: tenant.id },
    req,
  })
// in queue order: a module's directory pages are created by the first module under them, not raced by its siblings.
// D1 binds at most 100 parameters per query, and the runner claims a batch in one IN (...), so it runs 50 at a time.
const totals = { ran: 0, errors: 0 }
for (;;) {
  const result = await payload.jobs.run({ limit: 50, req, sequential: true })
  const statuses = Object.values(result.jobStatus ?? {}) as { status: string }[]
  if (!statuses.length) break
  totals.ran += statuses.length
  totals.errors += statuses.filter((s) => s.status !== 'success').length
  payload.logger.info({ msg: 'legacy leads batch', ...totals })
  if (result.noJobsRemaining) break
}
payload.logger.info({ msg: 'legacy leads run', chosen: entries.length, alreadyKnown: entries.length - fresh.length, queued: fresh.length, ...totals })
process.exit(0)
