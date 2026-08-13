# ストア申請用サイト / 掲載自動化

## 誰が登録するか

**あなたではありません。Cursor エージェントまたは GitHub Actions です。**

| 対象 | 仕組み |
|---|---|
| このサイト（ストア法務ハブ） | ストア提出アプリだけ。エージェントが `publish-app-listing --store` |
| ポートフォリオ一覧 | Web 制作物すべて。エージェントが `--url` / `--portfolio-only` |

Web だけの作品をこのハブに日次同期しない。既存ストアアプリの説明だけポートフォリオから更新する。

## 提出用 URL（共通）

- https://personal-site-taupe-gamma.vercel.app/legal/privacy/
- https://personal-site-taupe-gamma.vercel.app/legal/terms/
- https://personal-site-taupe-gamma.vercel.app/support/

アプリ別追記: `/apps/<slug>/`

## 公開入口（SNS・人向け）

- https://ymd-portfolio-site.pages.dev/
