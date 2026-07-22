# CURSOR_HANDOFF

## 目的

ストア申請用の **全アプリ共通** 法務ハブ。  
ポートフォリオ https://ymd-portfolio-site.pages.dev/ とは別。  
Crossplatform App 専用ではない（最初の登録が1件なだけ）。

## アプリ追加（自動）

- `npm run register-app -- --name "X" --slug x` → `src/config/apps.json`
- `npm run create-app -- --name "X" --slug x` → Expo 作成 + 上記登録
- push で `/apps/<slug>/` が増える。privacy/terms/support URL は不変。

## 本番

https://personal-site-taupe-gamma.vercel.app

## 更新

- 2026-07-22: apps.json + register-app。共通ハブであることを明記
- 2026-07-22: ポートフォリオ分離
