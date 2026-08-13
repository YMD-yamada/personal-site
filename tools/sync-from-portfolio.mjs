#!/usr/bin/env node
/**
 * CI: refresh summaries/URLs for apps already on the store hub.
 * Never adds Web-only portfolio apps — hub is store-policy listings only.
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

function hostKey(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return String(url || '').toLowerCase();
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
const byHost = new Map();
for (const a of hub) {
  const web = a.storeUrls?.web;
  if (web) byHost.set(hostKey(web), a);
}

let updated = 0;
for (const it of items) {
  if (!it || !it.url || !it.name) continue;
  if (it.visibility === 'private' || it.visibility === 'limited') continue;
  const host = hostKey(it.url);
  const existing = byHost.get(host);
  if (!existing) continue;

  const nextSummary = String(it.description || '').trim();
  const nextWeb = String(it.url).replace(/\/$/, '');
  let changed = false;
  if (nextSummary && existing.summary !== nextSummary) {
    existing.summary = nextSummary;
    changed = true;
  }
  existing.storeUrls = existing.storeUrls || {};
  if (existing.storeUrls.web !== nextWeb) {
    existing.storeUrls.web = nextWeb;
    changed = true;
  }
  if (changed) {
    updated += 1;
    console.log(`~ ${existing.name} (${existing.slug})`);
  }
}

fs.writeFileSync(appsPath, `${JSON.stringify(hub, null, 2)}\n`);
console.log(`Store hub refresh only. Updated ${updated}. Total ${hub.length} (no adds).`);
