import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL(".", import.meta.url);
const dist = new URL("dist/", root);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  const source = new URL(file, root);
  const content = await readFile(source, "utf8");
  await writeFile(new URL(file, dist), content);
}

await mkdir(new URL("assets/", dist), { recursive: true });
await cp(new URL("assets/", root), new URL("assets/", dist), { recursive: true });

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/hero.jpg",
  "assets/logo.png",
  "assets/grid.jpg",
  "assets/isg.jpg",
];

for (const file of required) {
  await readFile(join(fileURLToPath(dist), file));
}

console.log("BirceLUMA kurumsal sitesi dist/ klasörüne hazırlandı.");
