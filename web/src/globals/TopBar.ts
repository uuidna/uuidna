import type { GlobalConfig } from 'payload'

import link from '@root/fields/link'
import { revalidatePath } from 'next/cache'

import { isAdmin } from '../access/isAdmin'

export const TopBar: GlobalConfig = {
  slug: 'topBar',
  versions: false,
  // as the other site globals: everyone reads the bar, an admin edits it
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'enableTopBar',
      type: 'checkbox',
      label: 'Enable Top Bar?',
    },
    {
      name: 'message',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.enableTopBar,
      },
      label: 'Message',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.enableTopBar,
        },
      },
    }),
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
}
