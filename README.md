# personal-site（ストア申請用・全アプリ共通）

Crossplatform App 専用ではありません。全アプリで同じ法務 URL を使います。

詳細: [docs/STORE_LEGAL.md](docs/STORE_LEGAL.md)

## 2サイトの役割

| サイト | 用途 | 追加コマンド |
|---|---|---|
| このサイト (Vercel) | ストア申請用法務 | `npm run register-app -- --name X --slug x` |
| ymd-portfolio (Pages) | Web公開の制作物一覧 | 下の `--url` 付き、または portfolio 側の register-app |

両方に載せる（Web公開 + ストア準備）:

```bash
npm run register-app -- --name "My App" --slug my-app --url "https://my-app.vercel.app"
```

Expo 新規 + 登録:

```bash
npm run create-app -- --name "My App" --slug my-app --url "https://my-app.vercel.app"
```

その後、両方のリポジトリを `git push`。

## 本番

https://personal-site-taupe-gamma.vercel.app
