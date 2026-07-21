#!/usr/bin/env node
/**
 * 新規アプリの足場を切る。
 * 既定スタックは Expo（iOS/Android/Web 共通）。
 * 将来 Flutter 等が必要なら --stack で分岐する。
 *
 * Usage:
 *   node tools/create-app.mjs --name my-app --slug my-app
 *   node tools/create-app.mjs --name my-app --stack expo
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const projectsRoot = path.resolve(root, '..');

function arg(flag, fallback = '') {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const name = arg('--name');
const slug = arg('--slug', name);
const stack = arg('--stack', 'expo');
const bundleId = arg('--bundle-id', `com.shelf.${(slug || 'app').replace(/-/g, '')}`);

if (!name || !slug) {
  console.error('Required: --name and --slug');
  process.exit(1);
}

const target = path.join(projectsRoot, slug);
if (fs.existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

const stacks = {
  expo: createExpo,
  // flutter: createFlutter, // reserved
};

if (!stacks[stack]) {
  console.error(`Unknown stack: ${stack}. Supported: ${Object.keys(stacks).join(', ')}`);
  process.exit(1);
}

await stacks[stack]();
registerOnPersonalSite();
console.log(`\nDone: ${target}`);
console.log('Next:');
console.log(`  1. Edit personal-site/src/config/site.ts if needed`);
console.log(`  2. Set EXPO_PUBLIC_LEGAL_BASE_URL to your deployed personal-site URL`);
console.log(`  3. Do NOT pay Apple/Google until submission is ready (docs/SAFE_REGISTRATION.md)`);

async function createExpo() {
  fs.mkdirSync(target, { recursive: true });
  console.log('Scaffolding Expo tabs template...');
  execSync(`npx create-expo-app@latest "${target}" --template tabs --yes`, {
    stdio: 'inherit',
    shell: true,
  });

  const envExample = `# Shared legal hub (personal-site)
EXPO_PUBLIC_LEGAL_BASE_URL=https://example.vercel.app
EXPO_PUBLIC_SUPPORT_EMAIL=support@example.com
EXPO_PUBLIC_BILLING_MODE=none
EXPO_PUBLIC_APP_ENV=development
`;
  fs.writeFileSync(path.join(target, '.env.example'), envExample);

  const playbook = `# ${name}

Stack: Expo + TypeScript + Expo Router (iOS / Android / Web)
Bundle ID: ${bundleId}

Legal (shared):
- Privacy: \${EXPO_PUBLIC_LEGAL_BASE_URL}/legal/privacy/
- Terms: \${EXPO_PUBLIC_LEGAL_BASE_URL}/legal/terms/
- Support: \${EXPO_PUBLIC_LEGAL_BASE_URL}/support/

Billing:
- Keep EXPO_PUBLIC_BILLING_MODE=none until monetization decision
- digital -> IAP, web/physical -> Stripe (see lib/billing patterns in crossplatform-app)

Registration:
- Follow ../personal-site/docs/SAFE_REGISTRATION.md
`;
  fs.writeFileSync(path.join(target, 'PLAYBOOK.md'), playbook);

  // best-effort: patch app.json / app.config if present
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

function registerOnPersonalSite() {
  const siteConfigPath = path.join(root, 'src', 'config', 'site.ts');
  let text = fs.readFileSync(siteConfigPath, 'utf8');
  if (text.includes(`slug: '${slug}'`)) {
    console.log('App already listed in site.ts');
    return;
  }

  const entry = `  {
    slug: '${slug}',
    name: '${name}',
    summary: '（説明を記入）',
    platforms: ['ios', 'android', 'web'],
    status: 'development',
    dataCollected: [
      'アカウント関連情報（ログインを有効にした場合）',
    ],
  },
];`;

  text = text.replace(/\n\];\s*\n\nexport function legalUrls/, `\n${entry}\n\nexport function legalUrls`);
  // The above might fail if formatting differs - try simpler append before legalUrls
  if (!text.includes(`slug: '${slug}'`)) {
    text = fs.readFileSync(siteConfigPath, 'utf8');
    text = text.replace(
      'export const apps: AppListing[] = [',
      `export const apps: AppListing[] = [\n  {\n    slug: '${slug}',\n    name: '${name}',\n    summary: '（説明を記入）',\n    platforms: ['ios', 'android', 'web'],\n    status: 'development',\n    dataCollected: ['アカウント関連情報（ログインを有効にした場合）'],\n  },`,
    );
    fs.writeFileSync(siteConfigPath, text);
  } else {
    fs.writeFileSync(siteConfigPath, text);
  }
  console.log('Registered app on personal-site/src/config/site.ts');
}
