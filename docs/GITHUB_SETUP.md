# GitHub 新規登録・設定（個人開発向け）

無料（Free）で十分です。有料プランは今は契約しないでください。

---

## 今日やること（この順）

### 1. アカウント作成

1. https://github.com/signup を開く  
2. メール（普段使う Gmail など）・パスワード・ユーザー名を入力  
3. プランは **Free**  
4. メールに届いた確認リンクを開く  

ユーザー名の例: `ymd-dev`（後から変更は可能だが手間）

### 2. 二要素認証（必須級）

1. 右上アイコン → **Settings**  
2. 左メニュー **Password and authentication**  
3. **Two-factor authentication** を有効化  
4. **Authenticator アプリ**（Google / Microsoft Authenticator など）を選ぶ  
5. 表示された **リカバリーコードを保存**（印刷 or パスワードマネージャ）

SMS だけより、アプリ認証の方が安全です。

### 3. メールをプライベートに

1. Settings → **Emails**  
2. **Keep my email addresses private** を ON  
3. **Block command line pushes that expose my email** を ON  

サイトの問い合わせメール（`ymd.hude@gmail.com`）と、Git 用メールは別で構いません。

### 4. プロフィール（任意）

Settings → **Public profile**

- Name: 表示したい名前（ymd / 山田健登 など）  
- 写真・Bio は後でよい  

### 5. パソコンから GitHub に繋がるようにする（どちらか一方）

**おすすめ: SSH**

1. PowerShell で鍵を作る（まだ無い場合）:

```powershell
ssh-keygen -t ed25519 -C "ymd.hude@gmail.com"
```

（聞かれたら Enter でOK）

2. 公開鍵をコピー:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

3. GitHub → Settings → **SSH and GPG keys** → **New SSH key** → 貼り付けて保存  

**HTTPS の場合:** Personal Access Token（Settings → Developer settings → Tokens）が必要。権限は最小・期限は短め。

### 6. このサイトを GitHub に置く

1. GitHub で **New repository**  
2. 名前例: `personal-site`  
3. 公開設定: **Public**（ポートフォリオ用）  
4. README は「作らない」（手元に既にあるため）  
5. ローカルから初回 push:

```powershell
cd C:\Users\cz7\Projects\personal-site
git remote add origin git@github.com:あなたのユーザー名/personal-site.git
git branch -M main
git add -A
git status
git commit -m "feat: personal site UI and legal pages"
git push -u origin main
```

（`origin` が既にある場合は `git remote -v` で確認）

### 7. 公開（無料ホスティングはどれか1つ）

- **Cloudflare Pages** または **Vercel**: GitHub リポジトリを連携して Deploy  
- ビルドコマンド: `npm run build`  
- 出力ディレクトリ: `out`  

公開 URL が決まったら `src/config/site.ts` の `publicBaseUrl` をその URL に更新。

---

## やらなくてよいこと

- GitHub Pro / Copilot 有料の契約  
- 最初から Organization（会社用）アカウント  
- Apple / Google 開発者への課金（アプリ提出直前まで不要）  

---

## リポジトリの Public / Private 目安

| 種類 | 設定 |
|---|---|
| 個人サイト・見せたいコード | **Public** |
| 未公開アプリ・秘密が混ざるもの | **Private** |
