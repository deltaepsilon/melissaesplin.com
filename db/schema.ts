import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("wp_users", {
  id: integer("ID").primaryKey(),
  user_login: text("user_login"),
  user_pass: text("user_pass"),
  user_nicename: text("user_nicename"),
  user_email: text("user_email"),
  user_url: text("user_url"),
  user_registered: text("user_registered"),
  user_activation_key: text("user_activation_key"),
  user_status: integer("user_status"),
  display_name: text("display_name"),
});

export const posts = sqliteTable("wp_posts", {
  id: integer("ID").primaryKey(),
  post_author: integer("post_author").references(() => users.id, {
    onDelete: "cascade",
  }),
  post_date: text("post_date"),
  post_date_gmt: text("post_date_gmt"),
  post_content: text("post_content"),
  post_title: text("post_title"),
  post_category: integer("post_category"),
  post_excerpt: text("post_excerpt"),
  post_status: text("post_status"),
  comment_status: text("comment_status"),
  ping_status: text("ping_status"),
  post_password: text("post_password"),
  post_name: text("post_name"),
  to_ping: text("to_ping"),
  pinged: text("pinged"),
  post_modified: text("post_modified"),
  post_modified_gmt: text("post_modified_gmt"),
  post_content_filtered: text("post_content_filtered"),
  post_parent: integer("post_parent"),
  guid: text("guid"),
  menu_order: integer("menu_order"),
  post_type: text("post_type"),
  post_mime_type: text("post_mime_type"),
  comment_count: integer("comment_count"),
});

export const comments = sqliteTable("wp_comments", {
  id: integer("comment_ID").primaryKey(),
  comment_post_id: integer("comment_post_ID").references(() => posts.id, {
    onDelete: "cascade",
  }),
  comment_author: text("comment_author"),
  comment_author_email: text("comment_author_email"),
  comment_author_url: text("comment_author_url"),
  comment_author_ip: text("comment_author_IP"),
  comment_date: text("comment_date"),
  comment_date_gmt: text("comment_date_gmt"),
  comment_content: text("comment_content"),
  comment_karma: integer("comment_karma"),
  comment_approved: text("comment_approved"),
  comment_agent: text("comment_agent"),
  comment_type: text("comment_type"),
  comment_parent: integer("comment_parent"),
  user_id: integer("user_id"),
});
