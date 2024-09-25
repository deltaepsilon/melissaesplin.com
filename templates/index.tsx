import React from "react";
import { Posts } from "../db";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Column, Padded } from "./components/column";
import { BlogPost } from "./components/post";

export function Index({ posts }: { posts: Posts }) {
  return (
    <>
      <html lang="en">
        <head>
          <title>MelissaEsplin.com</title>
          <meta charSet="UTF-8" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="stylesheet" href="/styles.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <script type="module" src="./client.js" />
        </head>
        <body
          id="root"
          className="flex flex-col items-center min-h-screen text-primary-foreground"
        >
          <Header posts={posts} />
          <Main>
            <Column>
              <Padded className="py-8">
                {posts.slice(0, 5).map((post) => (
                  <BlogPost key={post.id} post={post} />
                ))}
              </Padded>
            </Column>
          </Main>
          <script type="module" src="/hmr.js"></script>
        </body>
      </html>
    </>
  );
}
