# ストア申請用サイト / 掲載自動化

## 誰が登録するか

**あなたではありません。Cursor エージェントまたは GitHub Actions です。**

| 対象 | 仕組み |
|---|---|
| ストア法務ハブ | エージェントが `publish-app-listing` / CI が portfolio から日次同期 |
| ポートフォリオ一覧 | CI が Vercel/GitHub/Netlify 等を同期 + エージェントが URL 付き登録 |

共通 privacy / terms / support URL はアプリが増えても変わりません。

## 提出用 URL（共通）

- https://personal-site-taupe-gamma.vercel.app/legal/privacy/
- https://personal-site-taupe-gamma.vercel.app/legal/terms/
- https://personal-site-taupe-gamma.vercel.app/support/
