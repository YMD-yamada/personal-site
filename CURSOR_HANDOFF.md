# CURSOR_HANDOFF

## 目的

ストア申請用の全アプリ共通法務ハブ。ポートフォリオ（Web 自由公開）とは別。

## 自動化（ユーザー操作なし）

ユーザーに register / sync / deploy コマンドを実行させない。エージェントか CI が全部やる。

### ストア法務ハブ（このリポ）

- エージェント: `tools/publish-app-listing.mjs` → commit / push / Vercel 本番
- CI: `.github/workflows/sync-apps-from-portfolio.yml` が portfolio 公開 Web を日次同期

### ポートフォリオ（ymd-portfolio）

- CI: push / 日次で `sync-apps` → Cloudflare Pages（申請不要 Web を自動掲載）
- エージェント即時: `scripts/publish-app-listing.mjs --name --url`
- 法務表記: `/legal/privacy|terms|support.html` + 各カードに「プライバシーポリシー準拠」
- アプリ埋め込み雛形: `/legal/embed-snippet.html` · `docs/WEB_PUBLISH.md`

## 本番

- Store hub: https://personal-site-taupe-gamma.vercel.app
- Portfolio: https://ymd-portfolio-site.pages.dev/
