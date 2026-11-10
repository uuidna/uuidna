import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_budgets_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_name\` text NOT NULL,
  \`version_value\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_parent_idx\` ON \`_budgets_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_version_version_name_idx\` ON \`_budgets_v\` (\`version_name\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_version_version_value_idx\` ON \`_budgets_v\` (\`version_value\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_version_version_updated_at_idx\` ON \`_budgets_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_version_version_created_at_idx\` ON \`_budgets_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_created_at_idx\` ON \`_budgets_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_updated_at_idx\` ON \`_budgets_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_users_id_idx\` ON \`_case_studies_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_name\` text NOT NULL,
  \`version_slug\` text NOT NULL,
  \`version_headline\` text NOT NULL,
  \`version_description\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_community_help_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_title\` text,
  \`version_community_help_type\` text,
  \`version_github_i_d\` text,
  \`version_discord_i_d\` text,
  \`version_community_help_j_s_o_n\` text NOT NULL,
  \`version_intro_description\` text,
  \`version_slug\` text,
  \`version_helpful\` integer,
  \`version_thread_created_at\` text,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`community_help\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_parent_idx\` ON \`_community_help_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_version_version_github_i_d_idx\` ON \`_community_help_v\` (\`version_github_i_d\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_version_version_discord_i_d_idx\` ON \`_community_help_v\` (\`version_discord_i_d\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_version_version_slug_idx\` ON \`_community_help_v\` (\`version_slug\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_version_version_updated_at_idx\` ON \`_community_help_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_version_version_created_at_idx\` ON \`_community_help_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_created_at_idx\` ON \`_community_help_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_updated_at_idx\` ON \`_community_help_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_docs_feedback_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_path\` text NOT NULL,
  \`version_helpful\` numeric NOT NULL DEFAULT 0,
  \`version_not_helpful\` numeric NOT NULL DEFAULT 0,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`docs_feedback\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_parent_idx\` ON \`_docs_feedback_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_version_version_path_idx\` ON \`_docs_feedback_v\` (\`version_path\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_version_version_updated_at_idx\` ON \`_docs_feedback_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_version_version_created_at_idx\` ON \`_docs_feedback_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_created_at_idx\` ON \`_docs_feedback_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_updated_at_idx\` ON \`_docs_feedback_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_docs_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_content\` text,
  \`version_title\` text NOT NULL,
  \`version_description\` text,
  \`version_keywords\` text,
  \`version_headings\` text,
  \`version_path\` text,
  \`version_topic\` text NOT NULL,
  \`version_topic_group\` text NOT NULL,
  \`version_slug\` text NOT NULL,
  \`version_label\` text,
  \`version_order\` numeric,
  \`version_version\` text NOT NULL,
  \`version_mdx\` text,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_docs_v_parent_idx\` ON \`_docs_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_version_version_updated_at_idx\` ON \`_docs_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_version_version_created_at_idx\` ON \`_docs_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_created_at_idx\` ON \`_docs_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_updated_at_idx\` ON \`_docs_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_industries_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_name\` text NOT NULL,
  \`version_value\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_industries_v_parent_idx\` ON \`_industries_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_name_idx\` ON \`_industries_v\` (\`version_name\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_value_idx\` ON \`_industries_v\` (\`version_value\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_updated_at_idx\` ON \`_industries_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_created_at_idx\` ON \`_industries_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_created_at_idx\` ON \`_industries_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_updated_at_idx\` ON \`_industries_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_alt\` text NOT NULL,
  \`version_dark_mode_fallback_id\` text(36),
  \`version_prefix\` text DEFAULT '',
  \`version__objectkey\` text,
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
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (\`version_dark_mode_fallback_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_dark_mode_fallback_idx\` ON \`_media_v\` (\`version_dark_mode_fallback_id\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_regions_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_name\` text NOT NULL,
  \`version_value\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_regions_v_parent_idx\` ON \`_regions_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_name_idx\` ON \`_regions_v\` (\`version_name\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_value_idx\` ON \`_regions_v\` (\`version_value\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_updated_at_idx\` ON \`_regions_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_version_version_created_at_idx\` ON \`_regions_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_created_at_idx\` ON \`_regions_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_updated_at_idx\` ON \`_regions_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_reusable_content_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_title\` text NOT NULL,
  \`version_layout\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`reusable_content\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_parent_idx\` ON \`_reusable_content_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_version_version_updated_at_idx\` ON \`_reusable_content_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_version_version_created_at_idx\` ON \`_reusable_content_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_created_at_idx\` ON \`_reusable_content_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_updated_at_idx\` ON \`_reusable_content_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_specialties_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_name\` text NOT NULL,
  \`version_value\` text NOT NULL,
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_parent_idx\` ON \`_specialties_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_version_version_name_idx\` ON \`_specialties_v\` (\`version_name\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_version_version_value_idx\` ON \`_specialties_v\` (\`version_value\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_version_version_updated_at_idx\` ON \`_specialties_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_version_version_created_at_idx\` ON \`_specialties_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_created_at_idx\` ON \`_specialties_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_updated_at_idx\` ON \`_specialties_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`_users_v\` (
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`parent_id\` text(36),
  \`version_first_name\` text NOT NULL,
  \`version_last_name\` text NOT NULL,
  \`version_twitter\` text,
  \`version_photo_id\` text(36),
  \`version_updated_at\` text,
  \`version_created_at\` text,
  \`version_email\` text NOT NULL,
  \`version_reset_password_token\` text,
  \`version_reset_password_expiration\` text,
  \`version_salt\` text,
  \`version_hash\` text,
  \`version_reset_password_requested_at\` text,
  \`version_login_attempts\` numeric DEFAULT 0,
  \`version_lock_until\` text,
  \`created_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  \`updated_at\` text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (\`version_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
)`)
  await db.run(sql`CREATE INDEX \`_users_v_parent_idx\` ON \`_users_v\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_photo_idx\` ON \`_users_v\` (\`version_photo_id\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_updated_at_idx\` ON \`_users_v\` (\`version_updated_at\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_created_at_idx\` ON \`_users_v\` (\`version_created_at\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_created_at_idx\` ON \`_users_v\` (\`created_at\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_updated_at_idx\` ON \`_users_v\` (\`updated_at\`)`)
  await db.run(sql`CREATE TABLE \`budgets_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`budgets_rels_order_idx\` ON \`budgets_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`budgets_rels_parent_idx\` ON \`budgets_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`budgets_rels_path_idx\` ON \`budgets_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`budgets_rels_users_id_idx\` ON \`budgets_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_users_id_idx\` ON \`case_studies_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`categories_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`categories_rels_order_idx\` ON \`categories_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`categories_rels_parent_idx\` ON \`categories_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`categories_rels_path_idx\` ON \`categories_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`categories_rels_users_id_idx\` ON \`categories_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`docs_feedback_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`docs_feedback\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`docs_feedback_rels_order_idx\` ON \`docs_feedback_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`docs_feedback_rels_parent_idx\` ON \`docs_feedback_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`docs_feedback_rels_path_idx\` ON \`docs_feedback_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`docs_feedback_rels_users_id_idx\` ON \`docs_feedback_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`docs_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`docs_rels_order_idx\` ON \`docs_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`docs_rels_parent_idx\` ON \`docs_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`docs_rels_path_idx\` ON \`docs_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`docs_rels_users_id_idx\` ON \`docs_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`industries_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`industries_rels_order_idx\` ON \`industries_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`industries_rels_parent_idx\` ON \`industries_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`industries_rels_path_idx\` ON \`industries_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`industries_rels_users_id_idx\` ON \`industries_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`regions_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`regions_rels_order_idx\` ON \`regions_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`regions_rels_parent_idx\` ON \`regions_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`regions_rels_path_idx\` ON \`regions_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`regions_rels_users_id_idx\` ON \`regions_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`reusable_content_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`reusable_content\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`reusable_content_rels_order_idx\` ON \`reusable_content_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`reusable_content_rels_parent_idx\` ON \`reusable_content_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`reusable_content_rels_path_idx\` ON \`reusable_content_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`reusable_content_rels_users_id_idx\` ON \`reusable_content_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`specialties_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`specialties_rels_order_idx\` ON \`specialties_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`specialties_rels_parent_idx\` ON \`specialties_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`specialties_rels_path_idx\` ON \`specialties_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`specialties_rels_users_id_idx\` ON \`specialties_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`users_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_budgets_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_budgets_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_rels_order_idx\` ON \`_budgets_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_rels_parent_idx\` ON \`_budgets_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_rels_path_idx\` ON \`_budgets_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_budgets_v_rels_users_id_idx\` ON \`_budgets_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_categories_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_order_idx\` ON \`_categories_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_parent_idx\` ON \`_categories_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_path_idx\` ON \`_categories_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_users_id_idx\` ON \`_categories_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_community_help_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`docs_id\` text(36),
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_community_help_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_rels_order_idx\` ON \`_community_help_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_rels_parent_idx\` ON \`_community_help_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_rels_path_idx\` ON \`_community_help_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_rels_docs_id_idx\` ON \`_community_help_v_rels\` (\`docs_id\`)`)
  await db.run(sql`CREATE INDEX \`_community_help_v_rels_users_id_idx\` ON \`_community_help_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_docs_feedback_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_docs_feedback_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_rels_order_idx\` ON \`_docs_feedback_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_rels_parent_idx\` ON \`_docs_feedback_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_rels_path_idx\` ON \`_docs_feedback_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_docs_feedback_v_rels_users_id_idx\` ON \`_docs_feedback_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_docs_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_docs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_docs_v_rels_order_idx\` ON \`_docs_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_rels_parent_idx\` ON \`_docs_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_rels_path_idx\` ON \`_docs_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_docs_v_rels_users_id_idx\` ON \`_docs_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_industries_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_industries_v_rels_order_idx\` ON \`_industries_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_rels_parent_idx\` ON \`_industries_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_rels_path_idx\` ON \`_industries_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_industries_v_rels_users_id_idx\` ON \`_industries_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_regions_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_regions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_order_idx\` ON \`_regions_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_parent_idx\` ON \`_regions_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_path_idx\` ON \`_regions_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_regions_v_rels_users_id_idx\` ON \`_regions_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_reusable_content_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_reusable_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_rels_order_idx\` ON \`_reusable_content_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_rels_parent_idx\` ON \`_reusable_content_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_rels_path_idx\` ON \`_reusable_content_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_reusable_content_v_rels_users_id_idx\` ON \`_reusable_content_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_specialties_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_specialties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_rels_order_idx\` ON \`_specialties_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_rels_parent_idx\` ON \`_specialties_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_rels_path_idx\` ON \`_specialties_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_specialties_v_rels_users_id_idx\` ON \`_specialties_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_users_v_rels\` (
  \`id\` integer PRIMARY KEY NOT NULL,
  \`order\` integer,
  \`parent_id\` text(36) NOT NULL,
  \`path\` text NOT NULL,
  \`users_id\` text(36),
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_order_idx\` ON \`_users_v_rels\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_parent_idx\` ON \`_users_v_rels\` (\`parent_id\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_path_idx\` ON \`_users_v_rels\` (\`path\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_users_id_idx\` ON \`_users_v_rels\` (\`users_id\`)`)
  await db.run(sql`CREATE TABLE \`_users_v_version_roles\` (
  \`order\` integer NOT NULL,
  \`parent_id\` text(36) NOT NULL,
  \`value\` text,
  \`id\` text(36) PRIMARY KEY NOT NULL,
  FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_roles_order_idx\` ON \`_users_v_version_roles\` (\`order\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_roles_parent_idx\` ON \`_users_v_version_roles\` (\`parent_id\`)`)
  await db.run(sql`CREATE TABLE \`_users_v_version_sessions\` (
  \`_order\` integer NOT NULL,
  \`_parent_id\` text(36) NOT NULL,
  \`id\` text(36) PRIMARY KEY NOT NULL,
  \`_uuid\` text NOT NULL,
  \`created_at\` text,
  \`expires_at\` text NOT NULL,
  FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_order_idx\` ON \`_users_v_version_sessions\` (\`_order\`)`)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_parent_id_idx\` ON \`_users_v_version_sessions\` (\`_parent_id\`)`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_users_v_version_sessions\``)
  await db.run(sql`DROP TABLE \`_users_v_version_roles\``)
  await db.run(sql`DROP TABLE \`_users_v_rels\``)
  await db.run(sql`DROP TABLE \`_specialties_v_rels\``)
  await db.run(sql`DROP TABLE \`_reusable_content_v_rels\``)
  await db.run(sql`DROP TABLE \`_regions_v_rels\``)
  await db.run(sql`DROP TABLE \`_media_v_rels\``)
  await db.run(sql`DROP TABLE \`_industries_v_rels\``)
  await db.run(sql`DROP TABLE \`_docs_v_rels\``)
  await db.run(sql`DROP TABLE \`_docs_feedback_v_rels\``)
  await db.run(sql`DROP TABLE \`_community_help_v_rels\``)
  await db.run(sql`DROP TABLE \`_categories_v_rels\``)
  await db.run(sql`DROP TABLE \`_budgets_v_rels\``)
  await db.run(sql`DROP TABLE \`users_rels\``)
  await db.run(sql`DROP TABLE \`specialties_rels\``)
  await db.run(sql`DROP TABLE \`reusable_content_rels\``)
  await db.run(sql`DROP TABLE \`regions_rels\``)
  await db.run(sql`DROP TABLE \`media_rels\``)
  await db.run(sql`DROP TABLE \`industries_rels\``)
  await db.run(sql`DROP TABLE \`docs_rels\``)
  await db.run(sql`DROP TABLE \`docs_feedback_rels\``)
  await db.run(sql`DROP TABLE \`categories_rels\``)
  await db.run(sql`DROP TABLE \`case_studies_rels\``)
  await db.run(sql`DROP TABLE \`budgets_rels\``)
  await db.run(sql`DROP TABLE \`_users_v\``)
  await db.run(sql`DROP TABLE \`_specialties_v\``)
  await db.run(sql`DROP TABLE \`_reusable_content_v\``)
  await db.run(sql`DROP TABLE \`_regions_v\``)
  await db.run(sql`DROP TABLE \`_media_v\``)
  await db.run(sql`DROP TABLE \`_industries_v\``)
  await db.run(sql`DROP TABLE \`_docs_v\``)
  await db.run(sql`DROP TABLE \`_docs_feedback_v\``)
  await db.run(sql`DROP TABLE \`_community_help_v\``)
  await db.run(sql`DROP TABLE \`_categories_v\``)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\``)
  await db.run(sql`DROP TABLE \`_budgets_v\``)
}
