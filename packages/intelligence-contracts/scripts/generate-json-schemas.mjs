import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";
import { generateCanonicalJsonSchemas } from "../dist/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(here, "../../../schemas/intelligence");
await mkdir(output, { recursive: true });
for (const [name, schema] of Object.entries(generateCanonicalJsonSchemas())) {
  const document = await format(JSON.stringify(schema), { parser: "json", printWidth: 100 });
  await writeFile(path.join(output, name), document, "utf8");
}
