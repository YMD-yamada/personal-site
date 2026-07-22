/**
 * App Store / Google Play 申請用の共通法務ハブ。
 * ポートフォリオ（https://ymd-portfolio-site.pages.dev/）とは別サイト。
 * 趣味・経歴・制作ストーリーなどの個人詳細は載せない。
 */
export const siteConfig = {
  /** ストア／画面に出す短い運営名 */
  brandName: 'ymd',
  /** サイトの役割（1行） */
  purpose: 'アプリのプライバシーポリシー・利用規約・サポート窓口',
  /** 特商法・プライバシーに必要な運営者名 */
  operatorName: '山田健登',
  address: '請求があった場合に遅滞なく開示します',
  supportEmail: 'ymd.hude@gmail.com',
  /** 本番URL（末尾スラッシュなし） */
  publicBaseUrl: 'https://personal-site-taupe-gamma.vercel.app',
  updatedAt: '2026-07-22',
} as const;

export type AppListing = {
  slug: string;
  name: string;
  /** ストア向けの短い説明のみ（自己紹介は書かない） */
  summary: string;
  platforms: Array<'ios' | 'android' | 'web'>;
  status: 'planning' | 'development' | 'released';
  dataCollected: string[];
  storeUrls?: {
    ios?: string;
    android?: string;
    web?: string;
  };
};

/** 申請対象アプリ。増やすときはここに追加 */
export const apps: AppListing[] = [
  {
    slug: 'crossplatform-app',
    name: 'Crossplatform App',
    summary: 'Android / iOS / Web 向けアプリ',
    platforms: ['ios', 'android', 'web'],
    status: 'development',
    dataCollected: [
      'アカウント登録時のメールアドレス（任意ログイン時）',
      'クラッシュログ・利用状況（分析ツールを有効にした場合）',
    ],
  },
];

export const statusLabel: Record<AppListing['status'], string> = {
  planning: '準備中',
  development: '開発中',
  released: '公開中',
};

export function legalUrls(base = siteConfig.publicBaseUrl) {
  const root = base.replace(/\/$/, '');
  return {
    privacy: `${root}/legal/privacy/`,
    terms: `${root}/legal/terms/`,
    tokushoho: `${root}/legal/tokushoho/`,
    support: `${root}/support/`,
  };
}

export function mailtoSupport() {
  const subject = encodeURIComponent('[アプリサポート]');
  const body = encodeURIComponent(
    'アプリ名:\nお問い合わせ内容:\n',
  );
  return `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;
}
