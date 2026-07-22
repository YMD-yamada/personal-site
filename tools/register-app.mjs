#!/usr/bin/env node
/**
 * ストア申請用ハブ（personal-site）にアプリを登録する。
 * 共通の privacy / terms / support URL は変えない。
 * アプリ固有ページ（データ取扱い追記）だけ増える。
 *
 * Usage:
 *   node tools/register-app.mjs --name "My App" --slug my-app
 *   node tools/register-app.mjs --name "My App" --slug my-app --summary "短い説明" --status development
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const appsPath = path.join(root, 'src', 'config', 'apps.json');

function arg(flag, fallback = '') {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const name = arg('--name');
const slug = arg('--slug', name);
const summary = arg('--summary', 'Android / iOS / Web 向けアプリ');
const status = arg('--status', 'development');
const platforms = (arg('--platforms', 'ios,android,web') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (!name || !slug) {
  console.error('Required: --name and --slug');
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('slug must be lowercase kebab-case, e.g. my-app');
  process.exit(1);
}

const allowedStatus = new Set(['planning', 'development', 'released']);
if (!allowedStatus.has(status)) {
  console.error(`status must be one of: ${[...allowedStatus].join(', ')}`);
  process.exit(1);
}

const apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));
if (apps.some((a) => a.slug === slug)) {
  console.log(`Already registered: ${slug}`);
  process.exit(0);
}

apps.push({
  slug,
  name,
  summary,
  platforms,
  status,
  dataCollected: [
    'アカウント登録時のメールアドレス（ログインを有効にした場合）',
    'クラッシュログ・利用状況（分析ツールを有効にした場合）',
  ],
});

fs.writeFileSync(appsPath, `${JSON.stringify(apps, null, 2)}\n`);
console.log(`Registered: ${name} (${slug}) → src/config/apps.json`);
console.log('Shared store URLs (reuse for every app):');
console.log('  https://personal-site-taupe-gamma.vercel.app/legal/privacy/');
console.log('  https://personal-site-taupe-gamma.vercel.app/legal/terms/');
console.log('  https://personal-site-taupe-gamma.vercel.app/support/');
console.log(`App addendum page: /apps/${slug}/`);
console.log('Commit & push personal-site to publish.');
