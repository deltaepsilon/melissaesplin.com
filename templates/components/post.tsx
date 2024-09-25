import { Post } from "db";
import { hrefFromPost } from "lib/utils";
import React from "react";

export function BlogPost({ post }: { post: Post }) {
  return (
    <div className="pt-3 pb-8 mb-8 border-b last:border-b-0">
      <a href={hrefFromPost(post)}>
        <h3 className="font-bold text-3xl pb-8">{post.post_title}</h3>
      </a>
      <div
        className="post"
        dangerouslySetInnerHTML={{ __html: post.post_content }}
      />
    </div>
  );
}
