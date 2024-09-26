import { getPosts, Posts } from "./db/index";
import { Index } from "./templates/index";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import path from "path";

render().then((count) => {
  console.log(`✍️ Rendered ${count} pages of HTML`);
});

async function render() {
  console.time("Render");
  const posts = await getPosts(5000);

  // Empty the docs folder
  fs.rmdirSync(path.join(__dirname, "docs"), { recursive: true });

  let count = await staticallyRender(posts);
  console.log(`rendered ${count} files...`);
  count += await staticallyRenderMonthlyArchives(posts);
  console.log(`rendered ${count} files...`);
  count += await staticallyRenderIndividualPosts(posts);
  console.log(`rendered ${count} files...`);

  await buildClient();
  await copyPublicFolder();

  console.timeEnd("Render");
  return count;
}

async function staticallyRenderIndividualPosts(posts: Posts) {
  const results = await Promise.all(
    posts.map(async (post, index) => {
      const postDate = new Date(post.post_date ?? "");
      const year = postDate.getFullYear();
      const month = String(postDate.getMonth() + 1).padStart(2, "0");
      const previousMonthDate = getPreviousMonthDate(posts, index);
      const nextMonthDate = getNextMonthDate(posts, index);

      const renderedHtml = ReactDOMServer.renderToString(
        <Index
          posts={posts}
          postIds={new Set([post.id])}
          previousMonthDate={previousMonthDate}
          nextMonthDate={nextMonthDate}
          singlePost
        />
      );
      const postFile = Bun.file(
        `./docs/${year}/${month}/${post.post_name}.html`
      );

      await Bun.write(postFile, renderedHtml);
    })
  );

  return results.length;
}
async function staticallyRenderMonthlyArchives(posts: Posts) {
  const postsByMonth = new Map<string, Posts>();
  for (const post of posts) {
    const postDate = new Date(post.post_date ?? "");
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, "0");
    const folders = `${year}/${month}`;
    if (!postsByMonth.has(folders)) {
      postsByMonth.set(folders, []);
    }

    postsByMonth.get(folders)?.push(post);
  }

  await Promise.all(
    Array.from(postsByMonth.entries()).map(async ([folders, monthPosts]) => {
      const index = posts.findIndex((p) => p.id === monthPosts[0].id);
      const previousMonthDate = getPreviousMonthDate(posts, index);
      const nextMonthDate = getNextMonthDate(posts, index);
      const renderedHtml = ReactDOMServer.renderToString(
        <Index
          posts={posts}
          postIds={new Set(monthPosts.map((post) => post.id))}
          previousMonthDate={previousMonthDate}
          nextMonthDate={nextMonthDate}
        />
      );
      const monthFile = Bun.file(`./docs/${folders}/index.html`);

      await Bun.write(monthFile, renderedHtml);
    })
  );
  return postsByMonth.size;
}

async function staticallyRender(posts: Posts) {
  const postIds = new Set(posts.slice(0, 5).map((post) => post.id));
  const nextMonthDate = getNextMonthDate(posts, postIds.size - 2);
  const renderedHtml = ReactDOMServer.renderToString(
    <Index posts={posts} postIds={postIds} nextMonthDate={nextMonthDate} />
  );
  const indexHtml = Bun.file("./docs/index.html");

  await Bun.write(indexHtml, renderedHtml);

  return 1;
}

async function buildClient() {
  await Bun.build({
    entrypoints: ["./client.tsx"],
    outdir: "./docs",
  });
}

async function copyPublicFolder() {
  return new Promise<void>((resolve, reject) => {
    try {
      const publicSourceDir = path.join(__dirname, "public");
      const publicDestDir = path.join(__dirname, "docs");

      if (!fs.existsSync(publicDestDir)) {
        fs.mkdirSync(publicDestDir, { recursive: true });
      }

      fs.readdir(publicSourceDir, (err, files) => {
        if (err) {
          console.error("Error reading source directory:", err);
          return;
        }

        files.forEach((file) => {
          const sourceFile = path.join(publicSourceDir, file);
          const destFile = path.join(publicDestDir, file);

          fs.copyFileSync(sourceFile, destFile);
        });

        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getPreviousMonthDate(posts: Posts, i: number) {
  if (!posts[i]?.post_date) return;

  const postDate = new Date(posts[i].post_date);
  const postMonthYear = getMonthYear(postDate);
  let j = i;

  while (j--) {
    const jPostDate = posts[j]?.post_date;

    if (!jPostDate) return;

    const previousPostDate = new Date(jPostDate ?? "");
    const previousMonthYear = getMonthYear(previousPostDate);

    if (previousMonthYear !== postMonthYear) {
      return previousPostDate;
    }
  }
}

function getNextMonthDate(posts: Posts, i: number) {
  if (!posts[i]?.post_date) return;

  const postDate = new Date(posts[i].post_date);
  const postMonthYear = getMonthYear(postDate);
  let j = i;

  while (++j) {
    const jPostDate = posts[j]?.post_date;

    // if (i === 0) {
    //   console.log({
    //     i,
    //     j,
    //     postMonthYear,
    //     name: posts[i]?.post_name,
    //     jPost: posts[j]?.post_name,
    //   });
    // }
    if (!jPostDate) return;

    const nextPostDate = new Date(jPostDate);
    const nextMonthYear = getMonthYear(nextPostDate);

    if (nextMonthYear !== postMonthYear) {
      return nextPostDate;
    }
  }
}

function getMonthYear(date: Date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}
