import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const destination = path.join(packageRoot, "registry");

await rm(destination, { recursive: true, force: true });
await cp(path.join(repositoryRoot, "registry"), destination, { recursive: true });
await mkdir(path.join(destination, "templates"), { recursive: true });
await cp(path.join(repositoryRoot, "templates"), path.join(destination, "templates"), {
  recursive: true,
});
