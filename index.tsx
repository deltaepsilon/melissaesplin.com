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
  const posts = await getPosts(5000);

  let count = await staticallyRender(posts);
  count += await staticallyRenderIndividualPosts(posts);

  await buildClient();
  await copyPublicFolder();

  return count;
}

async function staticallyRenderIndividualPosts(posts: Posts) {
  for (const post of posts) {
    const postDate = new Date(post.post_date);
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, "0");
    const renderedHtml = ReactDOMServer.renderToString(
      <Index posts={posts} postIds={new Set([post.id])} />
    );
    const postHtml = Bun.file(
      `./static/${year}/${month}/${post.post_name}.html`
    );

    await Bun.write(postHtml, renderedHtml);
  }

  return posts.length;
}

async function staticallyRender(posts: Posts) {
  const postIds = new Set(posts.slice(0, 5).map((post) => post.id));
  const renderedHtml = ReactDOMServer.renderToString(
    <Index posts={posts} postIds={postIds} />
  );
  const indexHtml = Bun.file("./static/index.html");

  await Bun.write(indexHtml, renderedHtml);

  return 1;
}

async function buildClient() {
  await Bun.build({
    entrypoints: ["./client.tsx"],
    outdir: "./static",
  });
}

async function copyPublicFolder() {
  return new Promise<void>((resolve, reject) => {
    try {
      const publicSourceDir = path.join(__dirname, "public");
      const publicDestDir = path.join(__dirname, "static");

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
