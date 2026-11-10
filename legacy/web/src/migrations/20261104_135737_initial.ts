import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`intro_content\` text,
  	\`industry\` text,
  	\`use_case\` text,
  	\`partner_id\` text(36),
  	\`featured_image_id\` text(36),
  	\`layout\` text,
  	\`slug\` text,
  	\`url\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`partner_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_partner_idx\` ON \`case_studies\` (\`partner_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_featured_image_idx\` ON \`case_studies\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_meta_meta_image_idx\` ON \`case_studies\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies__status_idx\` ON \`case_studies\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_title\` text,
  	\`version_intro_content\` text,
  	\`version_industry\` text,
  	\`version_use_case\` text,
  	\`version_partner_id\` text(36),
  	\`version_featured_image_id\` text(36),
  	\`version_layout\` text,
  	\`version_slug\` text,
  	\`version_url\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_partner_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_partner_idx\` ON \`_case_studies_v\` (\`version_partner_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_featured_image_idx\` ON \`_case_studies_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_meta_version_meta_image_idx\` ON \`_case_studies_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version__status_idx\` ON \`_case_studies_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_latest_idx\` ON \`_case_studies_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`community_help\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`community_help_type\` text,
  	\`github_i_d\` text,
  	\`discord_i_d\` text,
  	\`community_help_j_s_o_n\` text NOT NULL,
  	\`intro_description\` text,
  	\`slug\` text,
  	\`helpful\` integer,
  	\`thread_created_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`community_help_github_i_d_idx\` ON \`community_help\` (\`github_i_d\`);`)
  await db.run(sql`CREATE INDEX \`community_help_discord_i_d_idx\` ON \`community_help\` (\`discord_i_d\`);`)
  await db.run(sql`CREATE INDEX \`community_help_slug_idx\` ON \`community_help\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`community_help_updated_at_idx\` ON \`community_help\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`community_help_created_at_idx\` ON \`community_help\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`community_help_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`docs_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`community_help\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`community_help_rels_order_idx\` ON \`community_help_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`community_help_rels_parent_idx\` ON \`community_help_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`community_help_rels_path_idx\` ON \`community_help_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`community_help_rels_docs_id_idx\` ON \`community_help_rels\` (\`docs_id\`);`)
  await db.run(sql`CREATE TABLE \`docs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`keywords\` text,
  	\`headings\` text,
  	\`path\` text,
  	\`topic\` text NOT NULL,
  	\`topic_group\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`label\` text,
  	\`order\` numeric,
  	\`version\` text NOT NULL,
  	\`mdx\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`docs_updated_at_idx\` ON \`docs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`docs_created_at_idx\` ON \`docs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`docs_feedback\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`path\` text NOT NULL,
  	\`helpful\` numeric DEFAULT 0 NOT NULL,
  	\`not_helpful\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`docs_feedback_path_idx\` ON \`docs_feedback\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`docs_feedback_updated_at_idx\` ON \`docs_feedback\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`docs_feedback_created_at_idx\` ON \`docs_feedback\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`dark_mode_fallback_id\` text(36),
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	FOREIGN KEY (\`dark_mode_fallback_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media_dark_mode_fallback_idx\` ON \`media\` (\`dark_mode_fallback_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_breadcrumbs_bar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_breadcrumbs_bar_links_order_idx\` ON \`pages_hero_breadcrumbs_bar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_breadcrumbs_bar_links_parent_id_idx\` ON \`pages_hero_breadcrumbs_bar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_livestream_guests\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`link\` text,
  	\`image_id\` text(36),
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_livestream_guests_order_idx\` ON \`pages_hero_livestream_guests\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_livestream_guests_parent_id_idx\` ON \`pages_hero_livestream_guests\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_livestream_guests_image_idx\` ON \`pages_hero_livestream_guests\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_primary_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'link',
  	\`npm_cta_label\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_primary_buttons_order_idx\` ON \`pages_hero_primary_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_primary_buttons_parent_id_idx\` ON \`pages_hero_primary_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_secondary_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_secondary_buttons_order_idx\` ON \`pages_hero_secondary_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_secondary_buttons_parent_id_idx\` ON \`pages_hero_secondary_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_images_order_idx\` ON \`pages_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_images_parent_id_idx\` ON \`pages_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_images_image_idx\` ON \`pages_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_media_id\` text(36),
  	FOREIGN KEY (\`logo_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_logos_order_idx\` ON \`pages_hero_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_logos_parent_id_idx\` ON \`pages_hero_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_logos_logo_media_idx\` ON \`pages_hero_logos\` (\`logo_media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`full_title\` text,
  	\`noindex\` integer,
  	\`hero_type\` text DEFAULT 'default',
  	\`hero_full_background\` integer,
  	\`hero_theme\` text,
  	\`hero_enable_breadcrumbs_bar\` integer,
  	\`hero_livestream_date\` text,
  	\`hero_livestream_hide_breadcrumbs\` integer,
  	\`hero_livestream_rich_text\` text,
  	\`hero_enable_announcement\` integer,
  	\`hero_announcement_link_type\` text DEFAULT 'reference',
  	\`hero_announcement_link_new_tab\` integer,
  	\`hero_announcement_link_url\` text,
  	\`hero_announcement_link_label\` text,
  	\`hero_announcement_link_custom_id\` text,
  	\`hero_rich_text\` text,
  	\`hero_description\` text,
  	\`hero_secondary_heading\` text,
  	\`hero_secondary_description\` text,
  	\`hero_three_c_t_a\` text,
  	\`hero_newsletter_placeholder\` text,
  	\`hero_newsletter_description\` text,
  	\`hero_buttons\` text,
  	\`hero_enable_media\` integer DEFAULT false,
  	\`hero_media_id\` text(36),
  	\`hero_secondary_media_id\` text(36),
  	\`hero_feature_video_id\` text(36),
  	\`hero_form_id\` text(36),
  	\`hero_logo_showcase_label\` text,
  	\`layout\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text(36),
  	\`parent_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_secondary_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_feature_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_secondary_media_idx\` ON \`pages\` (\`hero_secondary_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_feature_video_idx\` ON \`pages\` (\`hero_feature_video_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_form_idx\` ON \`pages\` (\`hero_form_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	\`media_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_case_studies_id_idx\` ON \`pages_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_breadcrumbs_bar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_breadcrumbs_bar_links_order_idx\` ON \`_pages_v_version_hero_breadcrumbs_bar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_breadcrumbs_bar_links_parent_id_idx\` ON \`_pages_v_version_hero_breadcrumbs_bar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_livestream_guests\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`link\` text,
  	\`image_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_livestream_guests_order_idx\` ON \`_pages_v_version_hero_livestream_guests\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_livestream_guests_parent_id_idx\` ON \`_pages_v_version_hero_livestream_guests\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_livestream_guests_image_idx\` ON \`_pages_v_version_hero_livestream_guests\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_primary_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'link',
  	\`npm_cta_label\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_primary_buttons_order_idx\` ON \`_pages_v_version_hero_primary_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_primary_buttons_parent_id_idx\` ON \`_pages_v_version_hero_primary_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_secondary_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_secondary_buttons_order_idx\` ON \`_pages_v_version_hero_secondary_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_secondary_buttons_parent_id_idx\` ON \`_pages_v_version_hero_secondary_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_images_order_idx\` ON \`_pages_v_version_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_images_parent_id_idx\` ON \`_pages_v_version_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_images_image_idx\` ON \`_pages_v_version_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`logo_media_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_logos_order_idx\` ON \`_pages_v_version_hero_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_logos_parent_id_idx\` ON \`_pages_v_version_hero_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_logos_logo_media_idx\` ON \`_pages_v_version_hero_logos\` (\`logo_media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_title\` text,
  	\`version_full_title\` text,
  	\`version_noindex\` integer,
  	\`version_hero_type\` text DEFAULT 'default',
  	\`version_hero_full_background\` integer,
  	\`version_hero_theme\` text,
  	\`version_hero_enable_breadcrumbs_bar\` integer,
  	\`version_hero_livestream_date\` text,
  	\`version_hero_livestream_hide_breadcrumbs\` integer,
  	\`version_hero_livestream_rich_text\` text,
  	\`version_hero_enable_announcement\` integer,
  	\`version_hero_announcement_link_type\` text DEFAULT 'reference',
  	\`version_hero_announcement_link_new_tab\` integer,
  	\`version_hero_announcement_link_url\` text,
  	\`version_hero_announcement_link_label\` text,
  	\`version_hero_announcement_link_custom_id\` text,
  	\`version_hero_rich_text\` text,
  	\`version_hero_description\` text,
  	\`version_hero_secondary_heading\` text,
  	\`version_hero_secondary_description\` text,
  	\`version_hero_three_c_t_a\` text,
  	\`version_hero_newsletter_placeholder\` text,
  	\`version_hero_newsletter_description\` text,
  	\`version_hero_buttons\` text,
  	\`version_hero_enable_media\` integer DEFAULT false,
  	\`version_hero_media_id\` text(36),
  	\`version_hero_secondary_media_id\` text(36),
  	\`version_hero_feature_video_id\` text(36),
  	\`version_hero_form_id\` text(36),
  	\`version_hero_logo_showcase_label\` text,
  	\`version_layout\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_parent_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_secondary_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_feature_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_secondary_media_idx\` ON \`_pages_v\` (\`version_hero_secondary_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_feature_video_idx\` ON \`_pages_v\` (\`version_hero_feature_video_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_form_idx\` ON \`_pages_v\` (\`version_hero_form_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	\`media_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_case_studies_id_idx\` ON \`_pages_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`featured_media\` text DEFAULT 'upload',
  	\`image_id\` text(36),
  	\`video_url\` text,
  	\`dynamic_thumbnail\` integer DEFAULT true,
  	\`thumbnail_id\` text(36),
  	\`category_id\` text(36),
  	\`excerpt\` text,
  	\`content\` text,
  	\`slug\` text,
  	\`author_type\` text DEFAULT 'team',
  	\`guest_author\` text,
  	\`guest_socials_youtube\` text,
  	\`guest_socials_twitter\` text,
  	\`guest_socials_linkedin\` text,
  	\`guest_socials_website\` text,
  	\`published_on\` text,
  	\`add_to_docs\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_image_idx\` ON \`posts\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_thumbnail_idx\` ON \`posts\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_texts_order_parent\` ON \`posts_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` text(36),
  	\`docs_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_docs_id_idx\` ON \`posts_rels\` (\`docs_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_title\` text,
  	\`version_featured_media\` text DEFAULT 'upload',
  	\`version_image_id\` text(36),
  	\`version_video_url\` text,
  	\`version_dynamic_thumbnail\` integer DEFAULT true,
  	\`version_thumbnail_id\` text(36),
  	\`version_category_id\` text(36),
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`version_slug\` text,
  	\`version_author_type\` text DEFAULT 'team',
  	\`version_guest_author\` text,
  	\`version_guest_socials_youtube\` text,
  	\`version_guest_socials_twitter\` text,
  	\`version_guest_socials_linkedin\` text,
  	\`version_guest_socials_website\` text,
  	\`version_published_on\` text,
  	\`version_add_to_docs\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_image_idx\` ON \`_posts_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_thumbnail_idx\` ON \`_posts_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_texts_order_parent\` ON \`_posts_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` text(36),
  	\`docs_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_docs_id_idx\` ON \`_posts_v_rels\` (\`docs_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`headline\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reusable_content\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`layout\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`reusable_content_updated_at_idx\` ON \`reusable_content\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reusable_content_created_at_idx\` ON \`reusable_content\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`twitter\` text,
  	\`photo_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`users_photo_idx\` ON \`users\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`partners_content_contributions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text,
  	\`repo\` text DEFAULT 'payload',
  	\`number\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_content_contributions_order_idx\` ON \`partners_content_contributions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`partners_content_contributions_parent_id_idx\` ON \`partners_content_contributions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partners_content_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` numeric,
  	\`name\` text,
  	\`link\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_content_projects_order_idx\` ON \`partners_content_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`partners_content_projects_parent_id_idx\` ON \`partners_content_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partners_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_social_order_idx\` ON \`partners_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`partners_social_parent_id_idx\` ON \`partners_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`website\` text,
  	\`email\` text,
  	\`slug\` text,
  	\`agency_status\` text DEFAULT 'active',
  	\`hubspot_i_d\` text,
  	\`logo_id\` text(36),
  	\`featured\` integer,
  	\`top_contributor\` integer,
  	\`content_banner_image_id\` text(36),
  	\`content_overview\` text,
  	\`content_services\` text,
  	\`content_ideal_project\` text,
  	\`content_case_study_id\` text(36),
  	\`city\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`content_banner_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`content_case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_slug_idx\` ON \`partners\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_content_content_banner_image_idx\` ON \`partners\` (\`content_banner_image_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_content_content_case_study_idx\` ON \`partners\` (\`content_case_study_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`partners__status_idx\` ON \`partners\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`partners_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`regions_id\` text(36),
  	\`specialties_id\` text(36),
  	\`budgets_id\` text(36),
  	\`industries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`regions_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`specialties_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`budgets_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_rels_order_idx\` ON \`partners_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_parent_idx\` ON \`partners_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_path_idx\` ON \`partners_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_regions_id_idx\` ON \`partners_rels\` (\`regions_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_specialties_id_idx\` ON \`partners_rels\` (\`specialties_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_budgets_id_idx\` ON \`partners_rels\` (\`budgets_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_industries_id_idx\` ON \`partners_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v_version_content_contributions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`type\` text,
  	\`repo\` text DEFAULT 'payload',
  	\`number\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_partners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_contributions_order_idx\` ON \`_partners_v_version_content_contributions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_contributions_parent_id_idx\` ON \`_partners_v_version_content_contributions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v_version_content_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`year\` numeric,
  	\`name\` text,
  	\`link\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_partners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_projects_order_idx\` ON \`_partners_v_version_content_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_projects_parent_id_idx\` ON \`_partners_v_version_content_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v_version_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_partners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_version_social_order_idx\` ON \`_partners_v_version_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_social_parent_id_idx\` ON \`_partners_v_version_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_name\` text,
  	\`version_website\` text,
  	\`version_email\` text,
  	\`version_slug\` text,
  	\`version_agency_status\` text DEFAULT 'active',
  	\`version_hubspot_i_d\` text,
  	\`version_logo_id\` text(36),
  	\`version_featured\` integer,
  	\`version_top_contributor\` integer,
  	\`version_content_banner_image_id\` text(36),
  	\`version_content_overview\` text,
  	\`version_content_services\` text,
  	\`version_content_ideal_project\` text,
  	\`version_content_case_study_id\` text(36),
  	\`version_city\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_content_banner_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_content_case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_parent_idx\` ON \`_partners_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_slug_idx\` ON \`_partners_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_logo_idx\` ON \`_partners_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_version_content_banner_image_idx\` ON \`_partners_v\` (\`version_content_banner_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_content_version_content_case_study_idx\` ON \`_partners_v\` (\`version_content_case_study_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_updated_at_idx\` ON \`_partners_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_created_at_idx\` ON \`_partners_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version__status_idx\` ON \`_partners_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_created_at_idx\` ON \`_partners_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_updated_at_idx\` ON \`_partners_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_latest_idx\` ON \`_partners_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`regions_id\` text(36),
  	\`specialties_id\` text(36),
  	\`budgets_id\` text(36),
  	\`industries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_partners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`regions_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`specialties_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`budgets_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_order_idx\` ON \`_partners_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_parent_idx\` ON \`_partners_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_path_idx\` ON \`_partners_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_regions_id_idx\` ON \`_partners_v_rels\` (\`regions_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_specialties_id_idx\` ON \`_partners_v_rels\` (\`specialties_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_budgets_id_idx\` ON \`_partners_v_rels\` (\`budgets_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_industries_id_idx\` ON \`_partners_v_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_name_idx\` ON \`industries\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_value_idx\` ON \`industries\` (\`value\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`specialties\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`specialties_name_idx\` ON \`specialties\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`specialties_value_idx\` ON \`specialties\` (\`value\`);`)
  await db.run(sql`CREATE INDEX \`specialties_updated_at_idx\` ON \`specialties\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`specialties_created_at_idx\` ON \`specialties\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`regions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regions_name_idx\` ON \`regions\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`regions_value_idx\` ON \`regions\` (\`value\`);`)
  await db.run(sql`CREATE INDEX \`regions_updated_at_idx\` ON \`regions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regions_created_at_idx\` ON \`regions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`budgets\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`budgets_name_idx\` ON \`budgets\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`budgets_value_idx\` ON \`budgets\` (\`value\`);`)
  await db.run(sql`CREATE INDEX \`budgets_updated_at_idx\` ON \`budgets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`budgets_created_at_idx\` ON \`budgets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`fields\` text,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`hub_spot_form_i_d\` text,
  	\`custom_i_d\` text,
  	\`require_recaptcha\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`form_id\` text(36) NOT NULL,
  	\`recaptcha\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` text(36),
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_case_studies_id_idx\` ON \`redirects_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  	\`users_id\` text(36),
  	\`partners_id\` text(36),
  	\`industries_id\` text(36),
  	\`specialties_id\` text(36),
  	\`regions_id\` text(36),
  	\`budgets_id\` text(36),
  	\`forms_id\` text(36),
  	\`form_submissions_id\` text(36),
  	\`redirects_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`community_help_id\`) REFERENCES \`community_help\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_id\`) REFERENCES \`docs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`docs_feedback_id\`) REFERENCES \`docs_feedback\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reusable_content_id\`) REFERENCES \`reusable_content\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`specialties_id\`) REFERENCES \`specialties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`regions_id\`) REFERENCES \`regions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`budgets_id\`) REFERENCES \`budgets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_community_help_id_idx\` ON \`payload_locked_documents_rels\` (\`community_help_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_docs_id_idx\` ON \`payload_locked_documents_rels\` (\`docs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_docs_feedback_id_idx\` ON \`payload_locked_documents_rels\` (\`docs_feedback_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reusable_content_id_idx\` ON \`payload_locked_documents_rels\` (\`reusable_content_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_specialties_id_idx\` ON \`payload_locked_documents_rels\` (\`specialties_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_regions_id_idx\` ON \`payload_locked_documents_rels\` (\`regions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_budgets_id_idx\` ON \`payload_locked_documents_rels\` (\`budgets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_nav_items_order_idx\` ON \`footer_columns_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_nav_items_parent_id_idx\` ON \`footer_columns_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_case_studies_id_idx\` ON \`footer_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu_tabs_description_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_menu_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_description_links_order_idx\` ON \`main_menu_tabs_description_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_description_links_parent_id_idx\` ON \`main_menu_tabs_description_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu_tabs_nav_items_featured_link_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_menu_tabs_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_featured_link_links_order_idx\` ON \`main_menu_tabs_nav_items_featured_link_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_featured_link_links_parent_id_idx\` ON \`main_menu_tabs_nav_items_featured_link_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu_tabs_nav_items_list_links_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_menu_tabs_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_list_links_links_order_idx\` ON \`main_menu_tabs_nav_items_list_links_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_list_links_links_parent_id_idx\` ON \`main_menu_tabs_nav_items_list_links_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu_tabs_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'default',
  	\`default_link_link_type\` text DEFAULT 'reference',
  	\`default_link_link_new_tab\` integer,
  	\`default_link_link_url\` text,
  	\`default_link_link_label\` text,
  	\`default_link_link_custom_id\` text,
  	\`default_link_description\` text,
  	\`featured_link_tag\` text,
  	\`featured_link_label\` text,
  	\`list_links_tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_menu_tabs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_order_idx\` ON \`main_menu_tabs_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_nav_items_parent_id_idx\` ON \`main_menu_tabs_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`enable_direct_link\` integer,
  	\`enable_dropdown\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_custom_id\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`main_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_order_idx\` ON \`main_menu_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_tabs_parent_id_idx\` ON \`main_menu_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`main_menu\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`menu_cta_type\` text DEFAULT 'reference',
  	\`menu_cta_new_tab\` integer,
  	\`menu_cta_url\` text,
  	\`menu_cta_label\` text NOT NULL,
  	\`menu_cta_custom_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`main_menu_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`main_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`main_menu_rels_order_idx\` ON \`main_menu_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_rels_parent_idx\` ON \`main_menu_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_rels_path_idx\` ON \`main_menu_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_rels_pages_id_idx\` ON \`main_menu_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_rels_posts_id_idx\` ON \`main_menu_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`main_menu_rels_case_studies_id_idx\` ON \`main_menu_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`get_started_sidebar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`get_started\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`get_started_sidebar_links_order_idx\` ON \`get_started_sidebar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`get_started_sidebar_links_parent_id_idx\` ON \`get_started_sidebar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`get_started\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Get started with Payload',
  	\`tabs\` text,
  	\`sidebar\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text(36),
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`get_started_meta_meta_image_idx\` ON \`get_started\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`get_started_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`get_started\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`get_started_rels_order_idx\` ON \`get_started_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`get_started_rels_parent_idx\` ON \`get_started_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`get_started_rels_path_idx\` ON \`get_started_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`get_started_rels_pages_id_idx\` ON \`get_started_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`get_started_rels_posts_id_idx\` ON \`get_started_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`get_started_rels_case_studies_id_idx\` ON \`get_started_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`partner_program_hero_breadcrumb_bar_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partner_program\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partner_program_hero_breadcrumb_bar_links_order_idx\` ON \`partner_program_hero_breadcrumb_bar_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_hero_breadcrumb_bar_links_parent_id_idx\` ON \`partner_program_hero_breadcrumb_bar_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partner_program_hero_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_custom_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partner_program\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partner_program_hero_hero_links_order_idx\` ON \`partner_program_hero_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_hero_hero_links_parent_id_idx\` ON \`partner_program_hero_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partner_program\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`contact_form_id\` text(36) NOT NULL,
  	\`hero_rich_text\` text,
  	\`featured_partners_description\` text,
  	\`content_blocks_before_directory\` text,
  	\`content_blocks_after_directory\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`contact_form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partner_program_contact_form_idx\` ON \`partner_program\` (\`contact_form_id\`);`)
  await db.run(sql`CREATE TABLE \`partner_program_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	\`partners_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partner_program\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partner_program_rels_order_idx\` ON \`partner_program_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_parent_idx\` ON \`partner_program_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_path_idx\` ON \`partner_program_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_pages_id_idx\` ON \`partner_program_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_posts_id_idx\` ON \`partner_program_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_case_studies_id_idx\` ON \`partner_program_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`partner_program_rels_partners_id_idx\` ON \`partner_program_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE TABLE \`top_bar\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`enable_top_bar\` integer,
  	\`message\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_custom_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`top_bar_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`case_studies_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`top_bar\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`top_bar_rels_order_idx\` ON \`top_bar_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`top_bar_rels_parent_idx\` ON \`top_bar_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`top_bar_rels_path_idx\` ON \`top_bar_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`top_bar_rels_pages_id_idx\` ON \`top_bar_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`top_bar_rels_posts_id_idx\` ON \`top_bar_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`top_bar_rels_case_studies_id_idx\` ON \`top_bar_rels\` (\`case_studies_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`community_help\`;`)
  await db.run(sql`DROP TABLE \`community_help_rels\`;`)
  await db.run(sql`DROP TABLE \`docs\`;`)
  await db.run(sql`DROP TABLE \`docs_feedback\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_breadcrumbs_bar_links\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_livestream_guests\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_primary_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_secondary_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_images\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_breadcrumbs_bar_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_livestream_guests\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_primary_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_secondary_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_logos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_texts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`reusable_content\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`partners_content_contributions\`;`)
  await db.run(sql`DROP TABLE \`partners_content_projects\`;`)
  await db.run(sql`DROP TABLE \`partners_social\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`partners_rels\`;`)
  await db.run(sql`DROP TABLE \`_partners_v_version_content_contributions\`;`)
  await db.run(sql`DROP TABLE \`_partners_v_version_content_projects\`;`)
  await db.run(sql`DROP TABLE \`_partners_v_version_social\`;`)
  await db.run(sql`DROP TABLE \`_partners_v\`;`)
  await db.run(sql`DROP TABLE \`_partners_v_rels\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`specialties\`;`)
  await db.run(sql`DROP TABLE \`regions\`;`)
  await db.run(sql`DROP TABLE \`budgets\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`main_menu_tabs_description_links\`;`)
  await db.run(sql`DROP TABLE \`main_menu_tabs_nav_items_featured_link_links\`;`)
  await db.run(sql`DROP TABLE \`main_menu_tabs_nav_items_list_links_links\`;`)
  await db.run(sql`DROP TABLE \`main_menu_tabs_nav_items\`;`)
  await db.run(sql`DROP TABLE \`main_menu_tabs\`;`)
  await db.run(sql`DROP TABLE \`main_menu\`;`)
  await db.run(sql`DROP TABLE \`main_menu_rels\`;`)
  await db.run(sql`DROP TABLE \`get_started_sidebar_links\`;`)
  await db.run(sql`DROP TABLE \`get_started\`;`)
  await db.run(sql`DROP TABLE \`get_started_rels\`;`)
  await db.run(sql`DROP TABLE \`partner_program_hero_breadcrumb_bar_links\`;`)
  await db.run(sql`DROP TABLE \`partner_program_hero_hero_links\`;`)
  await db.run(sql`DROP TABLE \`partner_program\`;`)
  await db.run(sql`DROP TABLE \`partner_program_rels\`;`)
  await db.run(sql`DROP TABLE \`top_bar\`;`)
  await db.run(sql`DROP TABLE \`top_bar_rels\`;`)
}
