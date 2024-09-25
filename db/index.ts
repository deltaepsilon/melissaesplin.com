import { desc, and, eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";

export type Post = Posts[0];
export type Posts = Awaited<ReturnType<typeof getPosts>>;

export async function getPosts(limit: number = 10) {
  return db
    .select()
    .from(schema.posts)
    .where(
      and(
        eq(schema.posts.post_status, "publish"),
        eq(schema.posts.post_type, "post")
      )
    )
    .orderBy(desc(schema.posts.post_date))
    .limit(limit)
    .execute();
}
