# CURSOR_HANDOFF

## 目的

ストア申請用の全アプリ共通法務ハブ。ポートフォリオとは別。

## 自動化（ユーザー操作なし）

- **エージェント必須**: アプリ作成・Web公開時に `tools/publish-app-listing.mjs` を自分で実行し、commit / push / デプロイまで行う。
- **CI**: `.github/workflows/sync-apps-from-portfolio.yml` が portfolio の公開 Web アプリを日次で store hub に同期。
- **ポートフォリオ CI**: push / 日次で `sync-apps` → Cloudflare Pages。

ユーザーに `npm run register-app` を実行させない。

## 本番

https://personal-site-taupe-gamma.vercel.app
