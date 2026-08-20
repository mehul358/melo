import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const sitesRoot = join(repoRoot, "sites");
const siteNames = ["home", "hindi", "lisbon", "portugal-kids"];
const textExtensions = new Set([".html", ".js", ".css"]);
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function isExternal(reference) {
  return /^(?:[a-z]+:|\/\/|#|\?|data:|mailto:|tel:)/i.test(reference);
}

function cleanReference(reference) {
  return reference.split("#", 1)[0].split("?", 1)[0].trim();
}

function resolvesInsideSite(siteRoot, sourceFile, rawReference) {
  const reference = cleanReference(rawReference);
  if (!reference || isExternal(reference)) return true;

  const candidates = reference.startsWith("/")
    ? [join(siteRoot, reference.slice(1))]
    : [resolve(dirname(sourceFile), reference), resolve(siteRoot, reference)];

  return candidates.some((candidate) => {
    const rel = relative(siteRoot, normalize(candidate));
    return !rel.startsWith("..") && existsSync(candidate);
  });
}

for (const siteName of siteNames) {
  const siteRoot = join(sitesRoot, siteName);
  const indexPath = join(siteRoot, "index.html");
  const configPath = join(siteRoot, "netlify.toml");

  if (!existsSync(indexPath)) errors.push(`${siteName}: missing index.html`);
  if (!existsSync(configPath)) errors.push(`${siteName}: missing netlify.toml`);
  if (!existsSync(siteRoot)) continue;

  for (const file of walk(siteRoot)) {
    if (!textExtensions.has(extname(file))) continue;
    const contents = readFileSync(file, "utf8");
    const relFile = relative(repoRoot, file);

    if (/=["']\.\.\//.test(contents) || /fetch\(["']\.\.\//.test(contents)) {
      errors.push(`${relFile}: reaches outside its microsite with ../`);
    }

    const references = [
      ...contents.matchAll(/(?:src|href)=["']([^"']+)["']/gi),
      ...contents.matchAll(/fetch\(\s*["'`]([^"'`$]+)["'`]\s*\)/g),
    ];

    for (const match of references) {
      if (!resolvesInsideSite(siteRoot, file, match[1])) {
        errors.push(`${relFile}: unresolved local reference ${match[1]}`);
      }
    }
  }
}

if (errors.length) {
  console.error("Site validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${siteNames.length} self-contained Melo sites.`);
