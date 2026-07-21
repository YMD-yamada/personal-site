# Shelf（personal-site）

個人用 HP と、**複数アプリ共通の法務・サポートページ**です。静的エクスポートするため、Vercel / Cloudflare Pages / GitHub Pages の無料枠で公開できます。

## できること

- トップ（ブランド） / アプリ一覧 / 各アプリページ
- 共通: プライバシー / 利用規約 / 特商法 / サポート
- 新規アプリ足場: `npm run create-app -- --name ... --slug ...`
- 費用を無駄にしない登録順: [docs/SAFE_REGISTRATION.md](docs/SAFE_REGISTRATION.md)

## 最初に編集する場所

[`src/config/site.ts`](src/config/site.ts)

- `operatorName` / `supportEmail` / `publicBaseUrl`
- `apps` 配列（アプリ追加）

## ローカル

```bash
npm install
npm run dev
npm run build   # 出力: out/
```

## 無料公開（推奨順）

1. **Vercel** — GitHub 連携、Framework=Next.js（`output: 'export'` 済み）
2. **Cloudflare Pages** — ビルド `npm run build`、出力ディレクトリ `out`
3. **GitHub Pages** — このリポジトリの Actions（`pages.yml`）を有効化

公開 URL が決まったら `publicBaseUrl` を更新し、各アプリの `EXPO_PUBLIC_LEGAL_BASE_URL` に同じ値を設定。

## 新規アプリ

```bash
npm run create-app -- --name "My App" --slug my-app --stack expo
```

既定スタックは Expo（iOS/Android/Web）。別スタックが必要になったら `tools/create-app.mjs` に分岐を追加する想定です。
