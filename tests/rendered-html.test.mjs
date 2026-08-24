import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Arabic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /استديو أثر/);
  assert.match(html, /سلمان الراوي/);
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("includes every public route and no starter preview", async () => {
  const routeFiles = [
    "app/page.tsx",
    "app/about/page.tsx",
    "app/albums/page.tsx",
    "app/albums/[slug]/page.tsx",
    "app/contact/page.tsx",
  ];

  const sources = await Promise.all(
    routeFiles.map((path) => readFile(new URL(path, projectRoot), "utf8")),
  );
  assert.ok(sources.every((source) => !source.includes("SkeletonPreview")));
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
