# CURSOR_HANDOFF

## 目的

ストア申請用の法務ハブ。**掲載は App Store / Google Play / Microsoft Store 提出アプリのみ。**
公開作品・SNS入口はポートフォリオ（https://ymd-portfolio-site.pages.dev/）。

## 自動化（ユーザー操作なし）

ユーザーに register / sync / deploy コマンドを実行させない。エージェントか CI が全部やる。

### ストア法務ハブ（このリポ）

- エージェント: `tools/publish-app-listing.mjs --store --name --slug --url`
- CI: 既存ストアアプリの説明だけ portfolio から refresh（Web 作品の自動追加はしない）

### ポートフォリオ（ymd-portfolio）

- Web 公開: `publish-app-listing.mjs --portfolio-only --name --url`
- ストアアプリはハブとポートフォリオの両方に載せて呼応

## 本番

- Store hub: https://personal-site-taupe-gamma.vercel.app
- Portfolio: https://ymd-portfolio-site.pages.dev/
- 出先Todo（暗号化）: https://personal-site-taupe-gamma.vercel.app/go.html
  - PIN: NAS `33_Tasks/.mobile-board-pin`（git 外）
  - 再公開: `node ../work-ops-hub/scripts/publish-mobile-board.mjs --ship`

## 掲載中（ストア）

- ポイントパレット（iOS/Android・申請準備。Web はログインなしで端末内体験）
- Timeboard（Windows / Microsoft Store）
- Crossplatform App（法務URL検証用スターター）
