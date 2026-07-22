# personal-site（ストア申請用・全アプリ共通）

Crossplatform App 専用ではありません。全アプリで同じ法務 URL を使います。

詳細: [docs/STORE_LEGAL.md](docs/STORE_LEGAL.md)

## 新アプリ追加

```bash
# 既存アプリをハブに載せる
npm run register-app -- --name "My App" --slug my-app

# または Expo 新規作成 + 自動登録
npm run create-app -- --name "My App" --slug my-app
```

その後 `git push` → Vercel が公開。

## 本番

https://personal-site-taupe-gamma.vercel.app
