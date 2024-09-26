import { watch } from "fs";

const HOT_RELOAD_CHANNEL = "hot-reload-channel";

const server = Bun.serve({
  fetch(req: Request): Response {
    const url = new URL(req.url);
    const isFile = url.pathname.includes(".");
    const isFolder = url.pathname.endsWith("/");
    const filePath = isFile
      ? `./docs${url.pathname}`
      : isFolder
      ? `./docs${url.pathname}/index.html`
      : `./docs${url.pathname}.html`;
    const filestream = Bun.file(filePath).stream();

    return new Response(filestream);
  },
  port: 3000,
});

const wsServer = Bun.serve({
  fetch(req: Request, server): Response {
    if (!server.upgrade(req)) {
      return new Response("WebSocket upgrade failed", { status: 400 });
    }

    return new Response();
  },
  websocket: {
    open(ws) {
      ws.subscribe(HOT_RELOAD_CHANNEL);
    },
    message(ws, message) {
      console.log("WebSocket message", message);
    },
    close(ws) {
      ws.unsubscribe(HOT_RELOAD_CHANNEL);
    },
  },
  port: 3001,
});

let timer: ReturnType<typeof setTimeout>;
watch("./docs", { recursive: true }, () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => wsServer.publish(HOT_RELOAD_CHANNEL, "update"), 100);
});

console.log(`Server running at ${server.hostname}:${server.port}`);
