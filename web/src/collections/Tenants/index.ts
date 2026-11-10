import type { CollectionConfig } from 'payload'

// From Payload's official multi-tenant example (examples/multi-tenant); access uses this template's admin role,
// where the example has a super-admin role this template does not define.
import { isAdmin } from '@/access/isAdmin'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => Boolean(req.user),
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Used for domain-based tenant handling',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Used for url paths, example: /tenant-slug/page-slug',
      },
      index: true,
      required: true,
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      admin: {
        description:
          'If checked, logging in is not required to read. Useful for building public pages.',
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
  ],
}
