import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`audience\` text DEFAULT 'public';`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`team\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_audience\` text DEFAULT 'public';`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_team\` text;`)
  await db.run(sql`CREATE TABLE \`users_teams\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(sql`CREATE INDEX \`users_teams_order_idx\` ON \`users_teams\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_teams_parent_idx\` ON \`users_teams\` (\`parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_teams\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_team\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_audience\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`team\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`audience\`;`)
}
