import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { migrations } from './migrations'
import {
  BoldFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  TableFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Tenants } from '@/collections/Tenants'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { legacyLeadTask } from './jobs/legacyLead'
import { plugins } from './plugins'
import { extensions } from './plugins/extensions'
import { qrEndpoint } from '@/hooks/qrGalleryFallback'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value)?.endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

// The Workers runtime has no pino, so Payload is given a logger of its own that writes one JSON line per call. It
// carries everything Payload's own logger (pino) does and is used the same way: a `child` that binds fields and
// prefixes the message, a `level`, a `silent`, and serialisation that keeps an Error's message and stack (an Error's
// own properties are non-enumerable, so a plain spread would drop them). Because it is whole, no plugin has to patch a
// missing `child` or re-log an error the route handler already logs.
const errorFields = (value: unknown): Record<string, unknown> =>
  value instanceof Error ? { message: value.message, stack: value.stack, name: value.name } : (value as Record<string, unknown>)
const makeLogger = (bindings: Record<string, unknown>, prefix: string): Record<string, unknown> => {
  const line = (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    const body = typeof objOrMsg === 'string' ? { msg: `${prefix}${objOrMsg}` } : { ...errorFields(objOrMsg), msg: `${prefix}${msg ?? (objOrMsg as { msg?: string }).msg ?? ''}` }
    fn(JSON.stringify({ level, ...bindings, ...body }))
  }
  return {
    level: process.env.PAYLOAD_LOG_LEVEL || 'info',
    trace: line('trace', console.debug),
    debug: line('debug', console.debug),
    info: line('info', console.log),
    warn: line('warn', console.warn),
    error: line('error', console.error),
    fatal: line('fatal', console.error),
    silent: () => {},
    child: (childBindings: Record<string, unknown> = {}, options: { msgPrefix?: string } = {}) =>
      makeLogger({ ...bindings, ...childBindings }, `${prefix}${options.msgPrefix ?? ''}`),
  }
}

const cloudflareLogger = makeLogger({}, '') as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
    },
    dashboard: {
      // The `GettingStarted` widget renders the onboarding steps below the welcome heading.
      // Feel free to delete this at any time. Remove the widget and its `defaultLayout` entry.
      widgets: [
        {
          slug: 'getting-started',
          Component: '@/components/GettingStarted#GettingStarted',
          label: 'Getting Started',
          minWidth: 'full',
        },
      ],
      // Repeats the built-in default layout with `getting-started` inserted after `welcome`.
      defaultLayout: [
        { widgetSlug: 'welcome', width: 'full' },
        { widgetSlug: 'getting-started', width: 'full' },
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Posts, Categories, Media, Tenants],
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    // string ids, as the template's components assume
    idType: 'uuid',
    prodMigrations: migrations,
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        TableFeature(),
      ]
    },
  }),
  //email: nodemailerAdapter(),
  endpoints: [qrEndpoint],
  globals: [Header, Footer],
  jobs: {
    tasks: [legacyLeadTask],
  },
  logger: isProduction ? cloudflareLogger : undefined,
  // the template's plugins as shipped, then everything this installation adds
  plugins: [...plugins, ...extensions],
  secret: process.env.PAYLOAD_SECRET || '',
  storage: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
