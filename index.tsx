import { getPosts, Posts } from "./db/index";
import { Index } from "./templates/index";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import path from "path";

render().then(() => {
  console.log("✍️ Rendered HTML written to ./static/index.html");
});

async function render() {
  const posts = await getPosts(5000);

  await staticallyRender(posts);
  await buildClient();
  // const transpiler = new Bun.Transpiler({
  //   loader: "tsx",
  //   tsconfig: { compilerOptions: { jsx: "react" } },
  // });
  // const typeScript = await Bun.file("./client.tsx").text();
  // const javaScript = await transpiler.transform(typeScript);
  // const clientJs = Bun.file("./static/client.js");

  // await Bun.write(clientJs, javaScript);
  // await Bun.write(indexHtml, renderedHtml);

  // const outputPath = path.join(__dirname, "static", "index.html");
  // fs.writeFileSync(outputPath, renderedString, "utf8");
  await copyPublicFolder();
}

async function staticallyRender(posts: Posts) {
  const renderedHtml = ReactDOMServer.renderToString(<Index posts={posts} />);
  const indexHtml = Bun.file("./static/index.html");

  await Bun.write(indexHtml, renderedHtml);
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
