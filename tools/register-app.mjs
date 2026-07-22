#!/usr/bin/env node
/**
 * ストア申請用ハブ（personal-site）にアプリを登録する。
 * --url を付けると、ポートフォリオ（ymd-portfolio）の制作物一覧にも自動追加する。
 *
 * Usage:
 *   npm run register-app -- --name "My App" --slug my-app
 *   npm run register-app -- --name "My App" --slug my-app --url "https://my-app.vercel.app"
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findPortfolioRoot } from './find-portfolio.mjs';

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
const url = arg('--url', '');
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
  console.log(`Store hub already has: ${slug}`);
} else {
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
    ...(url ? { storeUrls: { web: url } } : {}),
  });
  fs.writeFileSync(appsPath, `${JSON.stringify(apps, null, 2)}\n`);
  console.log(`Registered on store hub: ${name} (${slug})`);
}

console.log('Shared store URLs:');
console.log('  https://personal-site-taupe-gamma.vercel.app/legal/privacy/');
console.log('  https://personal-site-taupe-gamma.vercel.app/legal/terms/');
console.log('  https://personal-site-taupe-gamma.vercel.app/support/');

if (url) {
  const portfolio = findPortfolioRoot(root);
  if (!portfolio) {
    console.warn(
      'Portfolio repo not found. Set YMD_PORTFOLIO_ROOT or clone ymd-portfolio next to Projects.',
    );
  } else {
    const cmd = [
      'node',
      JSON.stringify(path.join(portfolio, 'scripts', 'register-app.mjs')),
      '--name',
      JSON.stringify(name),
      '--url',
      JSON.stringify(url),
      '--description',
      JSON.stringify(summary),
    ].join(' ');
    execSync(cmd, { stdio: 'inherit', shell: true, cwd: portfolio });
    console.log('Also registered on portfolio (Web list).');
  }
} else {
  console.log('Tip: add --url "https://..." to also list on the portfolio site.');
}

console.log('Commit & push both repos to publish.');
