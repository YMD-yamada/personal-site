# CURSOR_HANDOFF

## 目的

個人 HP + 複数アプリ共通法務の静的サイト（無料ホスティング想定）

## 編集ポイント

- `src/config/site.ts` — 運営者名・メール・公開URL・アプリ一覧
- `docs/SAFE_REGISTRATION.md` — 有料登録の順番
- `docs/GITHUB_SETUP.md` — GitHub 新規アカウント設定チェックリスト
- `tools/create-app.mjs` — 新規 Expo アプリ生成

## UI

Mobbin 系のクリーンなポートフォリオ。Newsreader / Outfit、緑アクセント。
ホーム: ブランド `ymd` ヒーロー → 制作物行リスト → プロフィール → 連絡。
法務リンクはフッター中心。

## デプロイ

`npm run build` → `out/` を Vercel / Cloudflare Pages / GitHub Pages へ

## ローカル確認

```bash
npm run dev
# http://localhost:3000
```

## 更新

- 2026-07-21: GitHub セットアップ文書、ポートフォリオ UI 仕上げ
- 2026-07-20: サイト・法務・create-app・登録ガイドを追加
