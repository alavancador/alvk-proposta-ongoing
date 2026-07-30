import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "vercel-dist");
const proposalsDirectory = path.join(projectRoot, "app", "proposals");

const notFoundHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta name="color-scheme" content="dark">
    <meta name="theme-color" content="#050d1c">
    <title>Proposta não encontrada | ALVK</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, "Segoe UI", Arial, sans-serif;
        background: #050d1c;
        color: #fff;
      }
      * { box-sizing: border-box; }
      body {
        min-width: 320px;
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at 80% 12%, rgba(18, 91, 255, 0.24), transparent 35%),
          linear-gradient(145deg, #050d1c 0%, #07152b 58%, #0d2140 100%);
      }
      main {
        width: min(620px, 100%);
        padding: clamp(32px, 7vw, 64px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 28px;
        background: rgba(7, 21, 43, 0.72);
      }
      .brand {
        display: inline-grid;
        width: 38px;
        height: 38px;
        place-items: center;
        border-radius: 11px;
        background: #125bff;
        font-size: 12px;
        font-weight: 800;
      }
      p {
        margin: 32px 0 10px;
        color: #7fa8ff;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: clamp(34px, 7vw, 58px);
        line-height: 1;
        letter-spacing: -0.05em;
      }
    </style>
  </head>
  <body>
    <main>
      <span class="brand" aria-label="ALVK">AΛ</span>
      <p>Erro 404</p>
      <h1>Proposta não encontrada.</h1>
    </main>
  </body>
</html>
`;

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

await cp(
  path.join(projectRoot, "app", "home.html"),
  path.join(outputDirectory, "index.html"),
);

const entries = await readdir(proposalsDirectory, { withFileTypes: true });
const proposalFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name)
  .sort();

if (proposalFiles.length === 0) {
  throw new Error("Nenhuma proposta HTML foi encontrada em app/proposals.");
}

for (const filename of proposalFiles) {
  const source = path.join(proposalsDirectory, filename);
  const html = await readFile(source, "utf8");

  if (!/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) {
    throw new Error(`${filename} precisa conter uma meta robots com noindex.`);
  }

  await writeFile(path.join(outputDirectory, filename), html);
}

await cp(path.join(projectRoot, "public"), outputDirectory, {
  recursive: true,
});
await writeFile(
  path.join(outputDirectory, "robots.txt"),
  "User-agent: *\nDisallow: /\n",
);
await writeFile(path.join(outputDirectory, "404.html"), notFoundHtml);

console.log(
  `Vercel: página inicial e ${proposalFiles.length} proposta(s) geradas em vercel-dist/.`,
);
