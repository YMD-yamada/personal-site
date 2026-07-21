# 費用を無駄にしない登録手順

就業規則・税務は各自の責任で確認してください。ここは **技術・ストア登録の費用順序** だけを扱います。

## 原則

1. **無料で済ませられるものから**整える  
2. **有料登録は「提出直前」まで払わない**  
3. 間違って二重登録しない（個人で始め、後から Organization へ移すのは手間）

## フェーズ0（費用 ¥0）— 今すぐ

| やること | 費用 | 備考 |
|---|---|---|
| GitHub アカウント | 無料 | ソース管理。手順は `docs/GITHUB_SETUP.md` |
| この `personal-site` を静的ホスティング | 無料 | Vercel / Cloudflare Pages / GitHub Pages |
| Expo アカウント | 無料〜 | ビルド量が増えたら有料 |
| Supabase / Sentry（使うとき） | 無料枠あり | 収益化前で十分 |

**まだ払わなくてよい:** Apple Developer（年99USD）、Google Play（25USD）、独自ドメイン（任意）

法務URLは、まず無料の `*.vercel.app` / `*.pages.dev` / `*.github.io` で問題ありません。後から独自ドメインへ付け替え可能です。

## フェーズ1（任意・低額）— Web をちゃんとしたいとき

| やること | 費用目安 |
|---|---|
| 独自ドメイン | 年数百〜数千円 |
| メール（サポート用） | 無料Gmailでも可 → 後で独自ドメインメール |

## フェーズ2（初回ストア提出の直前）

アプリが **内部テストできる完成度** になってから:

1. **Google Play** 25 USD（一回）— Android を先に出すならこちらから  
2. **Apple Developer** 約99 USD / 年 — iOS を出す直前  

両方同時に払う必要はありません。片方だけ公開でも可。

## フェーズ3（収益化をオンにするとき）

売上がゼロの間は後回しでよいもの:

- Stripe 本番（テストモードは無料で試せる）
- 有料の監視枠
- 開業届（必須ではない。継続売上・経費整理の段階で検討）

## よくある「無駄な出費」

| やりがち | 避ける方法 |
|---|---|
| アプリ未完成なのに Apple 年会費を先払い | 提出月の直前に加入 |
| Organization で登録して個人に戻す | 最初は **Individual（個人）** |
| アプリごとに別ドメイン・別法務サイト | **この personal-site を共通利用** |
| 本番 Stripe を先に契約 | `BILLING_MODE=none` のまま開発 |

## 個人サイト公開（無料）の最短

```bash
cd personal-site
npm run build
# dist 相当は Next の out/
```

- **Vercel:** GitHub 連携 → Framework Next → 自動デプロイ（無料枠）
- **Cloudflare Pages:** `out` を Direct Upload または Git 連携
- **GitHub Pages:** `out` を `gh-pages` ブランチへ（Actions あり）

公開後、`src/config/site.ts` の `publicBaseUrl` を実URLに更新し、各アプリの `EXPO_PUBLIC_LEGAL_BASE_URL` に同じ値を入れる。
