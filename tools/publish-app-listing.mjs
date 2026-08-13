#!/usr/bin/env node
/**
 * Agent-owned: register listings and publish without asking the user to run commands.
 *
 * Usage (agent):
 *   # Web 公開のみ → ポートフォリオ
 *   node tools/publish-app-listing.mjs --name "My App" --url "https://..." --portfolio-only
 *
 *   # ストア申請（App Store / Play / MS Store）→ 法務ハブ + ポートフォリオ（呼応）
 *   node tools/publish-app-listing.mjs --store --name "My App" --slug my-app --url "https://..."
 */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findPortfolioRoot } from './find-portfolio.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function arg(flag, fallback = '') {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

function sh(cmd, cwd = root) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', shell: true, cwd });
}

const name = arg('--name');
const slug = arg('--slug', '');
const url = arg('--url', '');
const summary = arg('--summary', '');
const store = process.argv.includes('--store');
const portfolioOnly = process.argv.includes('--portfolio-only') || (!store && Boolean(url));
const skipPush = process.argv.includes('--skip-push');
const platforms = arg('--platforms', store ? 'ios,android' : 'web');
const status = arg('--status', store ? 'development' : 'released');

if (!name) {
  console.error('Required: --name');
  process.exit(1);
}
if (store && !slug) {
  console.error('Required: --slug with --store');
  process.exit(1);
}
if (portfolioOnly && !url) {
  console.error('Required: --url for portfolio listing');
  process.exit(1);
}
if (!store && !url) {
  console.error('Use --store (hub) and/or --url (portfolio)');
  process.exit(1);
}

if (store) {
  const parts = [
    'node',
    JSON.stringify(path.join(root, 'tools', 'register-app.mjs')),
    '--name',
    JSON.stringify(name),
    '--slug',
    JSON.stringify(slug),
    '--summary',
    JSON.stringify(summary || 'ストア申請対象アプリ'),
    '--platforms',
    JSON.stringify(platforms),
    '--status',
    JSON.stringify(status),
  ];
  sh(parts.join(' '));
}

if (url) {
  const portfolio = findPortfolioRoot(root);
  if (!portfolio) {
    console.error('Portfolio repo not found (set YMD_PORTFOLIO_ROOT)');
    process.exit(1);
  }
  sh(
    [
      'node',
      JSON.stringify(path.join(portfolio, 'scripts', 'register-app.mjs')),
      '--name',
      JSON.stringify(name),
      '--url',
      JSON.stringify(url),
      '--description',
      JSON.stringify(summary || `${name} の公開ページです。`),
    ].join(' '),
    portfolio,
  );

  if (!skipPush) {
    sh('git add -A', portfolio);
    try {
      sh(
        `git -c user.email="ymd.hude@gmail.com" -c user.name="ymd" commit -m ${JSON.stringify(`Register ${name} on portfolio`)}`,
        portfolio,
      );
    } catch {
      console.log('Portfolio: nothing to commit');
    }
    sh('git push', portfolio);
    try {
      sh('gh workflow run "Deploy to Cloudflare Pages" --repo YMD-yamada/ymd-portfolio');
    } catch (e) {
      console.warn('Could not trigger Pages workflow (push may still deploy):', e.message || e);
    }
  }
}

if (store && !skipPush) {
  sh('git add -A', root);
  try {
    sh(
      `git -c user.email="ymd.hude@gmail.com" -c user.name="ymd" commit -m ${JSON.stringify(`Register ${name} on store legal hub`)}`,
      root,
    );
  } catch {
    console.log('Store hub: nothing to commit');
  }
  sh('git push', root);
  try {
    sh('npx --yes vercel --prod --yes', root);
  } catch (e) {
    console.warn('Vercel deploy warning:', e.message || e);
  }
}

console.log('Done. Listings published by agent (no user commands required).');
