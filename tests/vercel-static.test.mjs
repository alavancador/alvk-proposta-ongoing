import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readOutput(filename) {
  return readFile(new URL(`../vercel-dist/${filename}`, import.meta.url), "utf8");
}

test("gera a página inicial estática e neutra", async () => {
  const html = await readOutput("index.html");

  assert.match(html, /Cada projeto tem um endereço exclusivo/i);
  assert.doesNotMatch(html, /JK Concept/i);
  assert.match(html, /noindex/i);
});

test("gera a proposta JK Concept em uma rota limpa", async () => {
  const html = await readOutput("jkconcept.html");

  assert.match(html, /JK CONCEPT/i);
  assert.match(html, /ALVK-JKC-2026-01/i);
  assert.match(html, /noindex/i);
});

test("bloqueia indexação e inclui uma página 404", async () => {
  const [robots, notFound] = await Promise.all([
    readOutput("robots.txt"),
    readOutput("404.html"),
  ]);

  assert.equal(robots, "User-agent: *\nDisallow: /\n");
  assert.match(notFound, /Proposta não encontrada/i);
  assert.match(notFound, /noindex/i);
});
