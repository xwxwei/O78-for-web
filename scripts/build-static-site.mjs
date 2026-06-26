import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "static-official");
const outputDir = join(root, "dist-static");
const publicDir = join(root, "public");

rmSync(outputDir, { force: true, recursive: true });
mkdirSync(outputDir, { recursive: true });

cpSync(sourceDir, outputDir, { recursive: true });

for (const asset of [
  "logo.svg",
  "cardback.png",
  "tarot-card/high-priestess.png",
  "tarot-card/moon.png",
  "tarot-card/star.png",
]) {
  cpSync(join(publicDir, asset), join(outputDir, asset), { recursive: true });
}

cpSync(join(outputDir, "index.html"), join(outputDir, "404.html"));
