import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`sku\` text;`)
  await db.run(sql`CREATE INDEX \`pages_sku_idx\` ON \`pages\` (\`sku\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_sku\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_sku_idx\` ON \`_pages_v\` (\`version_sku\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`_pages_v_version_sku_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_sku\`;`)
  await db.run(sql`DROP INDEX \`pages_sku_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`sku\`;`)
}
