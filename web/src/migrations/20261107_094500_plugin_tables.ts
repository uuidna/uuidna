import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`priority\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` text(36),
  	\`community_help_id\` text(36),
  	\`docs_id\` text(36),
  	\`docs_feedback_id\` text(36),
  	\`media_id\` text(36),
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`reusable_content_id\` text(36),
  	\`partners_id\` text(36),
  	\`industries_id\` text(36),
  	\`specialties_id\` text(36),
  	\`regions_id\` text(36),
  	\`budgets_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`community_help_id\`) REFERENCES \`community_help\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_feedback_id\`) REFERENCES \`docs_feedback\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reusable_content_id\`) REFERENCES \`reusable_content\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`specialties_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`regions_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`budgets_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_case_studies_id_idx\` ON \`search_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_community_help_id_idx\` ON \`search_rels\` (\`community_help_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_docs_id_idx\` ON \`search_rels\` (\`docs_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_docs_feedback_id_idx\` ON \`search_rels\` (\`docs_feedback_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_media_id_idx\` ON \`search_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_pages_id_idx\` ON \`search_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_categories_id_idx\` ON \`search_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_reusable_content_id_idx\` ON \`search_rels\` (\`reusable_content_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_partners_id_idx\` ON \`search_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_industries_id_idx\` ON \`search_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_specialties_id_idx\` ON \`search_rels\` (\`specialties_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_regions_id_idx\` ON \`search_rels\` (\`regions_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_budgets_id_idx\` ON \`search_rels\` (\`budgets_id\`);`)
  await db.run(sql`CREATE TABLE \`exports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`format\` text DEFAULT 'csv' NOT NULL,
  	\`limit\` numeric,
  	\`page\` numeric DEFAULT 1,
  	\`sort\` text,
  	\`sort_order\` text,
  	\`drafts\` text DEFAULT 'yes',
  	\`collection_slug\` text DEFAULT 'case-studies' NOT NULL,
  	\`where\` text DEFAULT '{}',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`original_filename\` text,
  	\`original_url\` text,
  	\`original_mime_type\` text,
  	\`original_filesize\` numeric,
  	\`original_width\` numeric,
  	\`original_height\` numeric,
  	\`original_prefix\` text,
  	\`original__objectkey\` text,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_updated_at_idx\` ON \`exports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`exports_created_at_idx\` ON \`exports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`exports_filename_idx\` ON \`exports\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`exports_original_original_filename_idx\` ON \`exports\` (\`original_filename\`);`)
  await db.run(sql`CREATE TABLE \`exports_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_texts_order_parent\` ON \`exports_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`exports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_rels_order_idx\` ON \`exports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_parent_idx\` ON \`exports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_path_idx\` ON \`exports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_users_id_idx\` ON \`exports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_exports_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_name\` text,
  	\`version_format\` text DEFAULT 'csv' NOT NULL,
  	\`version_limit\` numeric,
  	\`version_page\` numeric DEFAULT 1,
  	\`version_sort\` text,
  	\`version_sort_order\` text,
  	\`version_drafts\` text DEFAULT 'yes',
  	\`version_collection_slug\` text DEFAULT 'case-studies' NOT NULL,
  	\`version_where\` text DEFAULT '{}',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_original_filename\` text,
  	\`version_original_url\` text,
  	\`version_original_mime_type\` text,
  	\`version_original_filesize\` numeric,
  	\`version_original_width\` numeric,
  	\`version_original_height\` numeric,
  	\`version_original_prefix\` text,
  	\`version_original__objectkey\` text,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_exports_v_parent_idx\` ON \`_exports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_version_version_updated_at_idx\` ON \`_exports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_version_version_created_at_idx\` ON \`_exports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_version_version_filename_idx\` ON \`_exports_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_version_original_version_original_filename_idx\` ON \`_exports_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_created_at_idx\` ON \`_exports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_updated_at_idx\` ON \`_exports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_exports_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_exports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_exports_v_texts_order_parent\` ON \`_exports_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_exports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_exports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_order_idx\` ON \`_exports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_parent_idx\` ON \`_exports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_path_idx\` ON \`_exports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_users_id_idx\` ON \`_exports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`imports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`collection_slug\` text DEFAULT 'case-studies' NOT NULL,
  	\`import_mode\` text,
  	\`match_field\` text DEFAULT 'id',
  	\`status\` text DEFAULT 'pending',
  	\`summary_imported\` numeric,
  	\`summary_updated\` numeric,
  	\`summary_total\` numeric,
  	\`summary_issues\` numeric,
  	\`summary_issue_details\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`original_filename\` text,
  	\`original_url\` text,
  	\`original_mime_type\` text,
  	\`original_filesize\` numeric,
  	\`original_width\` numeric,
  	\`original_height\` numeric,
  	\`original_prefix\` text,
  	\`original__objectkey\` text,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`imports_updated_at_idx\` ON \`imports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`imports_created_at_idx\` ON \`imports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`imports_filename_idx\` ON \`imports\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`imports_original_original_filename_idx\` ON \`imports\` (\`original_filename\`);`)
  await db.run(sql`CREATE TABLE \`imports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`imports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`imports_rels_order_idx\` ON \`imports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_parent_idx\` ON \`imports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_path_idx\` ON \`imports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_users_id_idx\` ON \`imports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_imports_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_collection_slug\` text DEFAULT 'case-studies' NOT NULL,
  	\`version_import_mode\` text,
  	\`version_match_field\` text DEFAULT 'id',
  	\`version_status\` text DEFAULT 'pending',
  	\`version_summary_imported\` numeric,
  	\`version_summary_updated\` numeric,
  	\`version_summary_total\` numeric,
  	\`version_summary_issues\` numeric,
  	\`version_summary_issue_details\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_original_filename\` text,
  	\`version_original_url\` text,
  	\`version_original_mime_type\` text,
  	\`version_original_filesize\` numeric,
  	\`version_original_width\` numeric,
  	\`version_original_height\` numeric,
  	\`version_original_prefix\` text,
  	\`version_original__objectkey\` text,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`imports\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_imports_v_parent_idx\` ON \`_imports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_version_version_updated_at_idx\` ON \`_imports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_version_version_created_at_idx\` ON \`_imports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_version_version_filename_idx\` ON \`_imports_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_version_original_version_original_filename_idx\` ON \`_imports_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_created_at_idx\` ON \`_imports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_updated_at_idx\` ON \`_imports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_imports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_imports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_order_idx\` ON \`_imports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_parent_idx\` ON \`_imports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_path_idx\` ON \`_imports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_users_id_idx\` ON \`_imports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`meta\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing_until\` text,
  	\`processing_token\` text,
  	\`concurrency_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_until_idx\` ON \`payload_jobs\` (\`processing_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_concurrency_key_idx\` ON \`payload_jobs\` (\`concurrency_key\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text NOT NULL,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	\`parent_task_slug\` text,
  	\`parent_task_i_d\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_stats\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`stats\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`payload_jobs_stats\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`_imports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_imports_v\`;`)
  await db.run(sql`DROP TABLE \`imports_rels\`;`)
  await db.run(sql`DROP TABLE \`imports\`;`)
  await db.run(sql`DROP TABLE \`_exports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_exports_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_exports_v\`;`)
  await db.run(sql`DROP TABLE \`exports_rels\`;`)
  await db.run(sql`DROP TABLE \`exports_texts\`;`)
  await db.run(sql`DROP TABLE \`exports\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
}
