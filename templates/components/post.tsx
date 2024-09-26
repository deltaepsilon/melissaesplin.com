import { Post } from "db";
import { hrefFromPost } from "lib/utils";
import React from "react";

const EXISTING_WP_CONTENT = "https://www.melissaesplin.com/wp-content/uploads/";
const AWS_CONTENT =
  "https://s3.us-west-1.amazonaws.com/images.melissaesplin.com/wp-content/uploads/";

export function BlogPost({ post }: { post: Post }) {
  return (
    <div className="pt-3 pb-8 mb-8 border-b last:border-b-0">
      <a className="block pb-8" href={hrefFromPost(post)}>
        <h3 className="font-bold text-3xl">{post.post_title}</h3>
        <span className="font-semibold">
          {post.post_date
            ? new Date(post.post_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : null}
        </span>
      </a>
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html:
            post.post_content?.replaceAll(EXISTING_WP_CONTENT, AWS_CONTENT) ??
            "",
        }}
      />
    </div>
  );
}
