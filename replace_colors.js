import fs from "fs/promises";
import path from "path";

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of list) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(await walk(res));
    } else if (res.endsWith(".tsx") || res.endsWith(".ts")) {
      results.push(res);
    }
  }
  return results;
}

async function main() {
  const files = await walk(path.join(process.cwd(), "src"));
  for (const file of files) {
    let content = await fs.readFile(file, "utf8");
    let newContent = content
      .replace(/emerald-500/g, "primary")
      .replace(/emerald-400/g, "primary")
      .replace(/lime-foreground/g, "primary-foreground")
      .replace(/lime/g, "primary")
      .replace(/text-paper-muted/g, "text-muted-foreground")
      .replace(/text-paper-foreground/g, "text-foreground")
      .replace(/bg-paper-card/g, "bg-card")
      .replace(/bg-paper-foreground/g, "bg-foreground")
      .replace(/bg-paper/g, "bg-background")
      .replace(/border-paper-border/g, "border-border");
      
    if (content !== newContent) {
      await fs.writeFile(file, newContent, "utf8");
      console.log("Updated", file);
    }
  }
}

main().catch(console.error);
