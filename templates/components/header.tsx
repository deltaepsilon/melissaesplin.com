import React from "react";
import { Column, Padded } from "./column";
import { PostsIndex } from "./posts-index";
import { Posts } from "db";

export function Header({ posts }: { posts: Posts }) {
  return (
    <header className="flex justify-center w-full border-b">
      <Column>
        <Padded className="flex flex-col sm:flex-row sm:justify-between gap-4  py-4">
          <a className="flex items-center" href="/">
            <h3 className="raleway-800 text-2xl">MelissaEsplin.com</h3>
          </a>

          <PostsIndex posts={posts} />
        </Padded>
      </Column>
    </header>
  );
}
