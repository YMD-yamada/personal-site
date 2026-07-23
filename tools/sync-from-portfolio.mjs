#!/usr/bin/env node
/**
 * CI: merge public portfolio Web apps into store-hub apps.json (addendum pages).
 * Shared privacy/terms/support URLs stay unchanged.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const appsPath = path.join(root, 'src', 'config', 'apps.json');
const PORTFOLIO_APPS_URL =
  process.env.PORTFOLIO_APPS_URL ||
  'https://ymd-portfolio-site.pages.dev/data/apps.json';

const SKIP_HOST_PARTS = [
  'personal-site-taupe-gamma',
  'ymd-portfolio-site.pages.dev',
  'github.io/ymd-portfolio',
];

function shouldSkipUrl(url) {
  const u = String(url || '').toLowerCase();
  return SKIP_HOST_PARTS.some((p) => u.includes(p));
}

function hostKey(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return String(url || '').toLowerCase();
  }
}

function slugify(name, url) {
  const fromName = String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (fromName && /[a-z0-9]/.test(fromName)) return fromName.slice(0, 48);
  try {
    return new URL(url).hostname.split('.')[0].replace(/[^a-z0-9-]/g, '').slice(0, 48);
  } catch {
    return `app-${Date.now()}`;
  }
}

const res = await fetch(PORTFOLIO_APPS_URL, { cache: 'no-store' });
if (!res.ok) {
  console.error(`Failed to fetch portfolio apps: ${res.status}`);
  process.exit(1);
}
const portfolio = await res.json();
const items = Array.isArray(portfolio.items) ? portfolio.items : [];

const hub = JSON.parse(fs.readFileSync(appsPath, 'utf8'));
const bySlug = new Map(hub.map((a) => [a.slug, a]));
const byHost = new Map();
for (const a of hub) {
  const web = a.storeUrls?.web;
  if (web) byHost.set(hostKey(web), a);
}

let added = 0;
for (const it of items) {
  if (!it || it.visibility === 'private' || it.visibility === 'limited') continue;
  if (!it.url || !it.name) continue;
  if (shouldSkipUrl(it.url)) continue;
  // Prefer stable public apps; skip vague preview aliases when a cleaner URL exists later via sync
  if (String(it.url).includes('-ymdhude-4490s-projects.vercel.app')) continue;

  const host = hostKey(it.url);
  if (byHost.has(host)) continue;

  let slug = slugify(it.name, it.url);
  let n = 1;
  while (bySlug.has(slug)) {
    slug = `${slugify(it.name, it.url)}-${n++}`;
  }

  const entry = {
    slug,
    name: it.name,
    summary: (it.description || 'Web 公開アプリ').slice(0, 120),
    platforms: ['web'],
    status: it.category === '公開中' ? 'released' : 'development',
    dataCollected: [
      'アクセスログ（ホスティング事業者が処理する場合があります）',
      '各アプリが収集する入力・設定情報（該当する場合）',
    ],
    storeUrls: { web: String(it.url).replace(/\/$/, '') },
  };
  hub.push(entry);
  bySlug.set(slug, entry);
  byHost.set(host, entry);
  added += 1;
  console.log(`+ ${entry.name} (${slug})`);
}

fs.writeFileSync(appsPath, `${JSON.stringify(hub, null, 2)}\n`);
console.log(`Synced. Added ${added} app(s). Total ${hub.length}.`);
