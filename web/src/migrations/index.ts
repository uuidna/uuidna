import * as migration_20261110_013038_initial from './20261110_013038_initial';
import * as migration_20261110_014535_lead_development from './20261110_014535_lead_development';

export const migrations = [
  {
    up: migration_20261110_013038_initial.up,
    down: migration_20261110_013038_initial.down,
    name: '20261110_013038_initial',
  },
  {
    up: migration_20261110_014535_lead_development.up,
    down: migration_20261110_014535_lead_development.down,
    name: '20261110_014535_lead_development'
  },
];
