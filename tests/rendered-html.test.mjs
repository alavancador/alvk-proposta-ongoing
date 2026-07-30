import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker;
}

async function fetchPath(worker, path) {
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

test("renders a neutral, non-indexable home", async () => {
  const worker = await loadWorker();
  const response = await fetchPath(worker, "/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  assert.match(html, /Cada projeto tem um endereço exclusivo/i);
  assert.doesNotMatch(html, /JK Concept/i);
});

test("serves the JK Concept proposal at its dedicated route", async () => {
  const worker = await loadWorker();
  const response = await fetchPath(worker, "/jkconcept");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  assert.match(html, /JK CONCEPT/i);
  assert.match(html, /ALVK-JKC-2026-01/i);
});

test("does not expose unknown proposal routes", async () => {
  const worker = await loadWorker();
  const response = await fetchPath(worker, "/cliente-inexistente");

  assert.equal(response.status, 404);
  assert.match(await response.text(), /Proposta não encontrada/i);
});
