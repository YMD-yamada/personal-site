#!/usr/bin/env node
/**
 * 新規アプリの足場作成 + 掲載登録（エージェント実行用。ユーザー操作不要）。
 *
 * Usage (agent):
 *   node tools/create-app.mjs --name "My App" --slug my-app
 *   node tools/create-app.mjs --name "My App" --slug my-app --url "https://..."
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const projectsRoot = path.resolve(root, '..');
const LEGAL_BASE = 'https://personal-site-taupe-gamma.vercel.app';
const SUPPORT_EMAIL = 'ymd.hude@gmail.com';

function arg(flag, fallback = '') {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const name = arg('--name');
const slug = arg('--slug', name);
const stack = arg('--stack', 'expo');
const summary = arg('--summary', 'Android / iOS / Web 向けアプリ');
const portfolioUrl = arg('--url', '');
const bundleId = arg(
  '--bundle-id',
  `com.ymd.${(slug || 'app').replace(/-/g, '')}`,
);

if (!name || !slug) {
  console.error('Required: --name and --slug');
  process.exit(1);
}

const target = path.join(projectsRoot, slug);
if (fs.existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

const stacks = { expo: createExpo };
if (!stacks[stack]) {
  console.error(`Unknown stack: ${stack}. Supported: ${Object.keys(stacks).join(', ')}`);
  process.exit(1);
}

await stacks[stack]();
publishListings();

console.log(`\nDone: ${target}`);
console.log('Listings are handled by the agent/CI — not by the user.');

function publishListings() {
  const parts = [
    'node',
    JSON.stringify(path.join(root, 'tools', 'publish-app-listing.mjs')),
    '--name',
    JSON.stringify(name),
    '--slug',
    JSON.stringify(slug),
    '--summary',
    JSON.stringify(summary),
    '--skip-push',
  ];
  if (portfolioUrl) {
    parts.push('--url', JSON.stringify(portfolioUrl));
  }
  execSync(parts.join(' '), { stdio: 'inherit', shell: true, cwd: root });
}

async function createExpo() {
  fs.mkdirSync(target, { recursive: true });
  console.log('Scaffolding Expo tabs template...');
  execSync(`npx create-expo-app@latest "${target}" --template tabs --yes`, {
    stdio: 'inherit',
    shell: true,
  });

  fs.writeFileSync(
    path.join(target, '.env.example'),
    `# Shared store legal hub (not the portfolio site)
EXPO_PUBLIC_LEGAL_BASE_URL=${LEGAL_BASE}
EXPO_PUBLIC_SUPPORT_EMAIL=${SUPPORT_EMAIL}
EXPO_PUBLIC_BILLING_MODE=none
EXPO_PUBLIC_APP_ENV=development
`,
  );

  fs.writeFileSync(
    path.join(target, 'PLAYBOOK.md'),
    `# ${name}

Stack: Expo + TypeScript + Expo Router
Bundle ID: ${bundleId}

## Store legal (shared hub)

Reuse these URLs in App Store Connect / Play Console:

- Privacy: ${LEGAL_BASE}/legal/privacy/
- Terms: ${LEGAL_BASE}/legal/terms/
- Support: ${LEGAL_BASE}/support/
- App addendum: ${LEGAL_BASE}/apps/${slug}/

## Billing

Keep EXPO_PUBLIC_BILLING_MODE=none until monetization is decided.
`,
  );

  const appJson = path.join(target, 'app.json');
  if (fs.existsSync(appJson)) {
    const json = JSON.parse(fs.readFileSync(appJson, 'utf8'));
    json.expo = json.expo || {};
    json.expo.name = name;
    json.expo.slug = slug;
    json.expo.ios = { ...(json.expo.ios || {}), bundleIdentifier: bundleId };
    json.expo.android = { ...(json.expo.android || {}), package: bundleId };
    fs.writeFileSync(appJson, JSON.stringify(json, null, 2));
  }
}
