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

## 2サイト

| サイト | 役割 |
|---|---|
| personal-site | ストア申請用法務（共通 URL） |
| ymd-portfolio | Web 公開の制作物一覧 + Web 用法務ページ |

Web 公開時は `--url` 付き register で両方へ自動追加可。

## 更新

- 2026-07-22: ポートフォリオ自動登録・Web 法務ページ連携
- 2026-07-22: apps.json + register-app（ストア側）
