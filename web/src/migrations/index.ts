import * as migration_20261104_135737_initial from './20261104_135737_initial';
import * as migration_20261104_143015_v4 from './20261104_143015_v4';
import * as migration_20261105_170000_blog_teams from './20261105_170000_blog_teams';
import * as migration_20261107_042500_page_sku from './20261107_042500_page_sku';
import * as migration_20261107_092200_search_lock from './20261107_092200_search_lock';
import * as migration_20261107_094500_plugin_tables from './20261107_094500_plugin_tables';
import * as migration_20261107_094800_collection_rels from './20261107_094800_collection_rels';
import * as migration_20261107_100200_rels_users from './20261107_100200_rels_users';

export const migrations = [
  {
    up: migration_20261104_135737_initial.up,
    down: migration_20261104_135737_initial.down,
    name: '20261104_135737_initial',
  },
  {
    up: migration_20261104_143015_v4.up,
    down: migration_20261104_143015_v4.down,
    name: '20261104_143015_v4',
  },
  {
    up: migration_20261105_170000_blog_teams.up,
    down: migration_20261105_170000_blog_teams.down,
    name: '20261105_170000_blog_teams',
  },
  {
    up: migration_20261107_042500_page_sku.up,
    down: migration_20261107_042500_page_sku.down,
    name: '20261107_042500_page_sku',
  },
  {
    up: migration_20261107_092200_search_lock.up,
    down: migration_20261107_092200_search_lock.down,
    name: '20261107_092200_search_lock',
  },
  {
    up: migration_20261107_094500_plugin_tables.up,
    down: migration_20261107_094500_plugin_tables.down,
    name: '20261107_094500_plugin_tables',
  },
  {
    up: migration_20261107_094800_collection_rels.up,
    down: migration_20261107_094800_collection_rels.down,
    name: '20261107_094800_collection_rels',
  },
  {
    up: migration_20261107_100200_rels_users.up,
    down: migration_20261107_100200_rels_users.down,
    name: '20261107_100200_rels_users',
  },
];
