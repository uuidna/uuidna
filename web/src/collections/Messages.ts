import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { getCloudflareContext } from '@opennextjs/cloudflare'

import { isAdmin } from '../access/isAdmin'

// A message is stored by Payload, so its access rules decide who writes; the room only carries it to the open sockets.
// History is Payload's REST API: GET /api/messages?where[room][equals]=<room>&sort=step
const broadcast: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') {
    return doc
  }
  try {
    const { env } = await getCloudflareContext({ async: true })
    await env.CHAT_ROOM.getByName(String(doc.room)).broadcast(doc)
  } catch (err: unknown) {
    req.payload.logger.error({ err, msg: `the room ${doc.room} did not take the message` })
  }
  return doc
}

export const Messages: CollectionConfig = {
  slug: 'messages',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['room', 'from', 'step', 'createdAt'],
    useAsTitle: 'room',
  },
  fields: [
    { name: 'room', type: 'text', index: true, required: true },
    { name: 'from', type: 'text' },
    { name: 'step', type: 'number' },
    { name: 'chain', type: 'json', admin: { description: 'the UUIDs this message carries' } },
    { name: 'receipt', type: 'text' },
  ],
  hooks: {
    afterChange: [broadcast],
  },
  versions: false,
}
