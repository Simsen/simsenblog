#!/usr/bin/env node
/**
 * Checks every post in src/content/blog before the site is built:
 *  - required metadata is present and dates are real dates
 *  - categories and icons are known values
 *  - no two posts end up on the same public URL
 *  - every local image referenced (/images/...) exists in public/
 *
 * Usage: npm run validate
 * Exits with code 1 and a list of problems if anything is wrong.
 */
import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const BLOG = join(ROOT, 'src/content/blog');
const PUBLIC = join(ROOT, 'public');

// Keep in sync with src/lib/site.ts
const CATEGORIES = ['Intune', 'Windows', 'macOS', 'Tools'];
const ICONS = ['article', 'windows', 'intune', 'macos', 'code', 'tool', 'qr', 'terminal'];
const REQUIRED = ['title', 'description', 'date', 'categories'];

const problems = [];
const urls = new Map();

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function* markdownFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* markdownFiles(full);
    else if (entry.name.endsWith('.md')) yield full;
  }
}

const pad = (n) => String(n).padStart(2, '0');
let count = 0;

for await (const file of markdownFiles(BLOG)) {
  count++;
  const name = relative(ROOT, file);
  const slug = relative(BLOG, file).replace(/\.md$/, '').toLowerCase();
  const fail = (msg) => problems.push(`${name}: ${msg}`);
  const source = await readFile(file, 'utf8');

  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    fail('missing the metadata block at the top (--- ... ---)');
    continue;
  }

  let data;
  try {
    data = parse(match[1]) ?? {};
  } catch (err) {
    fail(`metadata is not valid YAML: ${err.message.split('\n')[0]}`);
    continue;
  }
  const body = match[2];

  if (!/^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(slug)) {
    fail('file name should only use lowercase letters, numbers and dashes (it becomes the URL)');
  }

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') fail(`"${key}" is required`);
  }

  const date = data.date instanceof Date ? data.date : new Date(String(data.date));
  if (data.date !== undefined && Number.isNaN(date.valueOf())) fail(`"date" is not a valid date: ${data.date} (use YYYY-MM-DD)`);

  if (data.categories !== undefined) {
    if (!Array.isArray(data.categories) || data.categories.length === 0) fail('"categories" must be a list, e.g. [Intune, Windows]');
    else for (const c of data.categories) if (!CATEGORIES.includes(c)) fail(`unknown category "${c}" (use one of: ${CATEGORIES.join(', ')})`);
  }

  if (data.icon !== undefined && !ICONS.includes(data.icon)) fail(`unknown icon "${data.icon}" (use one of: ${ICONS.join(', ')})`);
  if (data.draft !== undefined && typeof data.draft !== 'boolean') fail('"draft" must be true or false');

  // Public URL: permalink or /YYYY/MM/DD/<file-name>/. Drafts don't get a URL.
  if (data.draft !== true && !Number.isNaN(date.valueOf())) {
    const url = data.permalink ?? `/${date.getUTCFullYear()}/${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${slug}/`;
    if (urls.has(url)) fail(`same URL as ${urls.get(url)}: ${url}`);
    else urls.set(url, name);
  }

  // Local images: Markdown ![alt](/images/...) and HTML <img src="/images/...">
  const refs = [
    ...body.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)(?:\s+"[^"]*")?\)/g),
    ...body.matchAll(/<img[^>]+src=["'](\/[^"']+)["']/g),
  ].map((m) => m[1]);
  for (const ref of refs) {
    const path = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!(await exists(join(PUBLIC, path)))) fail(`image not found: ${ref} (expected public${path})`);
  }
}

if (problems.length) {
  console.error(`\n✖ Found ${problems.length} problem${problems.length === 1 ? '' : 's'} in ${count} posts:\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('');
  process.exit(1);
}
console.log(`✔ ${count} posts checked, ${urls.size} public URLs, no problems found.`);
