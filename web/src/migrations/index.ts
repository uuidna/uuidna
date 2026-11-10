import * as migration_20261110_082140_initial from './20261110_082140_initial';

export const migrations = [
  {
    up: migration_20261110_082140_initial.up,
    down: migration_20261110_082140_initial.down,
    name: '20261110_082140_initial'
  },
];
