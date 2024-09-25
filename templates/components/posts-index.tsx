import React from "react";
import { Post, Posts } from "../../db";
import { PostsSearch } from "./posts-search";
import { hrefFromPost } from "lib/utils";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function PostsIndex({ posts }: { posts: Posts }) {
  const postsByYearAndMonth = posts.reduce<
    Record<string, Record<string, Post[]>>
  >((acc, post) => {
    if (post.post_date) {
      const date = new Date(post.post_date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push(post);
    }

    return acc;
  }, {});

  return (
    <div
      id="posts-index"
      className="relative flex flex-col gap-1 max-w-xs w-full"
      //   onChange={(isFocused) => setIsFocused(isFocused)}
    >
      <div id="posts-search" className="">
        <PostsSearch />
      </div>
      <div
        id="by-year"
        className="hidden hidden-scroll absolute top-[3rem] left-0 right-0 h-[25rem] bg-white border rounded-md p-4"
      >
        {Object.entries(postsByYearAndMonth)
          .sort((a, b) => (a[0] < b[0] ? 1 : -1))
          .map(([year, postsByMonth]) => {
            return (
              <div className="user-select-none" key={year}>
                <label className="cursor-pointer" htmlFor={year}>
                  <span className="font-bold">{year}</span>
                </label>
                <input
                  className="hidden"
                  id={year}
                  type="checkbox"
                  onChange={(e) => console.log(e.target.value)}
                />
                <div className="checkbox-hidden pl-2">
                  {Object.entries(postsByMonth)
                    .sort((a, b) => (+a[0] < +b[0] ? 1 : -1))
                    .map(([month, posts]) => {
                      return (
                        <div key={month + year}>
                          <div>
                            <span className="font-semibold">
                              {MONTH_NAMES[month]}
                            </span>
                          </div>
                          <div className="pl-2">
                            {posts.flatMap((post) => (
                              <div
                                className="post-title flex text-bold"
                                key={post.id}
                                data-title={post.post_title}
                                data-href={hrefFromPost(post)}
                                data-date={new Date(
                                  post.post_date_gmt
                                ).toISOString()}
                              >
                                {post.post_title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
