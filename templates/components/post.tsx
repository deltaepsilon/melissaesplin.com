import { Post } from "db";
import { hrefFromPost } from "lib/utils";
import React from "react";

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
        dangerouslySetInnerHTML={{ __html: post.post_content ?? "" }}
      />
    </div>
  );
}
