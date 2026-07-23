#!/usr/bin/env node
/**
 * Agent-owned: register listings and publish without asking the user to run commands.
 *
 * Usage (agent):
 *   node tools/publish-app-listing.mjs --name "My App" --slug my-app --url "https://..."
 *   node tools/publish-app-listing.mjs --name "My App" --slug my-app
 *   node tools/publish-app-listing.mjs --name "My App" --url "https://..." --portfolio-only
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
const summary = arg('--summary', 'Android / iOS / Web 向けアプリ');
const portfolioOnly = process.argv.includes('--portfolio-only');
const skipPush = process.argv.includes('--skip-push');

if (!name) {
  console.error('Required: --name');
  process.exit(1);
}
if (!portfolioOnly && !slug) {
  console.error('Required: --slug (unless --portfolio-only)');
  process.exit(1);
}
if (portfolioOnly && !url) {
  console.error('Required: --url with --portfolio-only');
  process.exit(1);
}

if (!portfolioOnly) {
  const parts = [
    'node',
    JSON.stringify(path.join(root, 'tools', 'register-app.mjs')),
    '--name',
    JSON.stringify(name),
    '--slug',
    JSON.stringify(slug),
    '--summary',
    JSON.stringify(summary),
  ];
  // register-app also hits portfolio when --url is set; avoid double-call by not passing url here
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
      JSON.stringify(summary),
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

if (!portfolioOnly && !skipPush) {
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
