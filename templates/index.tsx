import React from "react";
import { Posts } from "../db";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Column, Padded } from "./components/column";
import { BlogPost } from "./components/post";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Index({
  posts,
  postIds,
}: {
  posts: Posts;
  postIds: Set<number>;
}) {
  const firstPost = posts.find((p) => postIds.has(p.id));
  const firstPostDate = new Date(firstPost.post_date);
  const nextMonthDate = new Date(
    firstPostDate.setMonth(firstPostDate.getMonth() + 1)
  );
  const previousMonthDate = new Date(
    firstPostDate.setMonth(firstPostDate.getMonth() - 1)
  );
  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = String(nextMonthDate.getMonth() + 1).padStart(2, "0");
  const previousYear = previousMonthDate.getFullYear();
  const previousMonth = String(previousMonthDate.getMonth()).padStart(2, "0");

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
          <script type="module" src="/client.js" />
        </head>
        <body
          id="root"
          className="flex flex-col items-center min-h-screen text-primary-foreground"
        >
          <Header posts={posts} />
          <Main>
            <Column>
              <Padded className="py-8">
                {posts
                  .filter((p) => postIds.has(p.id))
                  .map((post) => (
                    <BlogPost key={post.id} post={post} />
                  ))}
              </Padded>
              <Padded>
                <footer className="flex flex-col gap-8 py-4">
                  <div className="flex justify-between">
                    <a href={`/${nextYear}/${nextMonth}`}>
                      <div className="flex items-center gap-2">
                        <ChevronLeft size={24} />
                        <span className="underline">
                          {previousMonthDate.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </a>

                    <a href={`/${nextYear}/${nextMonth}`}>
                      <div className="flex items-center gap-2">
                        <span className="underline">
                          {nextMonthDate.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <ChevronRight size={24} />
                      </div>
                    </a>
                  </div>
                  <div className="text-sm text-left">
                    &copy; {new Date().getFullYear()} Melissa Esplin
                  </div>
                </footer>
              </Padded>
            </Column>
          </Main>
          <script type="module" src="/hmr.js"></script>
        </body>
      </html>
    </>
  );
}
