import { randomBytes } from 'crypto'
import { readFileSync } from 'fs'
import path from 'path'
import { createPayloadRequest, getPayload, registerFirstUserOperation } from 'payload'

import config from '@payload-config'

/** Queue the old tree's modules as legacyLead jobs and run them: `pnpm payload run src/scripts/queueLegacyLeads.ts`.
 *  LEGACY_LIMIT takes the first N modules of ../legacy/manifest.json (written by uuidna's gen-legacy-manifest). Every
 *  write runs as an admin user with access on (the v4 Local API default), so hooks and access decide. */
const manifest = JSON.parse(readFileSync(path.resolve(process.cwd(), '..', 'legacy', 'manifest.json'), 'utf8')) as {
  entries: { address: string; exports: string[]; path: string; size: number; task: string; version: string }[]
}
// LEGACY_PATHS (comma-separated) takes those modules instead of the manifest's head
const paths = process.env.LEGACY_PATHS?.split(',').map((p) => p.trim()).filter(Boolean)
const entries = paths ? manifest.entries.filter((e) => paths.includes(e.path)) : manifest.entries
const limit = Number(process.env.LEGACY_LIMIT || entries.length)
const payload = await getPayload({ config })

// THE ACTING USER. Resolving who acts is the one read past access, as the template's ensureFirstUserIsAdmin does. On an
// empty database the first admin is made by Payload's own first-user operation (the admin panel's "create first user").
// Its password is random and kept nowhere: the script never logs in, and an admin resets it to sign in.
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@uuidna.localhost'
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
if (!user) throw new Error(`${email} is not a user here, and the database already has users: name an admin with LEGACY_ADMIN_EMAIL`)
if (!user.roles?.includes('admin')) throw new Error(`${email} is not an admin: name one with LEGACY_ADMIN_EMAIL`)
const req = await createPayloadRequest({ payload, user: { ...user, collection: 'users' } })

const tenants = await payload.find({ collection: 'tenants', limit: 1, req, where: { slug: { equals: 'uuidna' } } })
const tenant =
  tenants.docs[0] ??
  (await payload.create({ collection: 'tenants', data: { name: 'uuidna', slug: 'uuidna', allowPublicRead: true }, req }))

for (const entry of entries.slice(0, limit))
  await payload.jobs.queue({
    task: 'legacyLead',
    input: {
      address: entry.address,
      exports: entry.exports.join(', '),
      path: entry.path,
      size: entry.size,
      task: entry.task,
      tenant: tenant.id,
      version: entry.version,
    },
    req,
  })
// in queue order: a module's directory pages are created by the first module under them, not raced by its siblings
const result = await payload.jobs.run({ limit, req, sequential: true })
payload.logger.info({ msg: 'legacy leads run', queued: limit, ...result })
process.exit(0)
