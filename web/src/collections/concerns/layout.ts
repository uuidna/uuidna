/** Written by the payload morph. Rails roles rewritten onto Payload folders. */
export const mergedLayout = [
  { role: 'model', from: 'app/models', to: 'src/collections' },
  { role: 'concern', from: 'app/models/concerns', to: 'src/collections/concerns' },
  { role: 'controller', from: 'app/controllers', to: 'src/app' },
  { role: 'authorization', from: 'app/controllers/concerns', to: 'src/access' },
  { role: 'helper', from: 'app/helpers', to: 'src/fields' },
  { role: 'view', from: 'app/views', to: 'src/components' },
  { role: 'job', from: 'app/jobs', to: 'src/scripts' },
  { role: 'migration', from: 'db/migrate', to: 'src/migrations' },
  { role: 'config', from: 'config', to: 'src/payload.config.ts' },
] as const
