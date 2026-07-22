# ストア申請用サイトについて

## 結論

**問題ありません。Crossplatform App 専用ではありません。**

このサイトは全アプリ共通の法務ハブです。

| URL | 用途 | アプリごとの作り直し |
|---|---|---|
| `/legal/privacy/` | プライバシーポリシー | **不要（共通）** |
| `/legal/terms/` | 利用規約 | **不要（共通）** |
| `/legal/tokushoho/` | 特商法 | **不要（共通）** |
| `/support/` | サポート | **不要（共通）** |
| `/apps/<slug>/` | そのアプリ固有のデータ取扱い追記 | **追加のみ** |

App Store Connect / Play Console では、どのアプリでもだいたい同じ privacy / terms / support URL を使います。  
新しいアプリを出すたびに **新しい法務サイトは不要** です。必要なのは:

1. ストア側に「新しいアプリ枠」を作る（Apple/Google のコンソール）
2. このハブにアプリを1件登録する（下記コマンド）
3. 同じ法務 URL を提出フォームに貼る

ポートフォリオ（https://ymd-portfolio-site.pages.dev/）とは別です。

## 新アプリを追加する（自動）

### A. アプリごと新規作成する場合

```bash
cd C:\Users\cz7\Projects\personal-site
npm run create-app -- --name "My App" --slug my-app
```

→ Expo プロジェクト作成 + `apps.json` へ自動登録

### B. すでにあるアプリをハブに載せるだけ

```bash
cd C:\Users\cz7\Projects\personal-site
npm run register-app -- --name "My App" --slug my-app
```

その後:

```bash
git add -A
git commit -m "Register my-app on store legal hub"
git push
```

Vercel が自動デプロイし、`/apps/my-app/` が増えます。

## 本番の提出用 URL

- https://personal-site-taupe-gamma.vercel.app/legal/privacy/
- https://personal-site-taupe-gamma.vercel.app/legal/terms/
- https://personal-site-taupe-gamma.vercel.app/legal/tokushoho/
- https://personal-site-taupe-gamma.vercel.app/support/
