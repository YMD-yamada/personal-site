/**
 * サイトの見た目・文言・法務の共通設定。
 * 公開URLが決まったら publicBaseUrl を実値に更新してください。
 */
export const siteConfig = {
  brandName: 'ymd',
  /** ヒーローのメインコピー（ブランド名の直下） */
  headline: '学びと実験を、少しずつ形にしていく。',
  tagline:
    'レトロゲームの仕組み、身体を動かすこと、コードと工具——関心は広く、深さはまだ途中です。ストア公開は準備中。試行錯誤の記録と制作物を、この場所にまとめていきます。',
  operatorName: '山田健登',
  address: '請求があった場合に遅滞なく開示します',
  supportEmail: 'ymd.hude@gmail.com',
  /** 本番の公開URL（末尾スラッシュなし） */
  publicBaseUrl: 'https://personal-site-taupe-gamma.vercel.app',
  /** 参考にしている既存ポートフォリオ（同系統のトーン） */
  referencePortfolioUrl: 'https://ymd-portfolio-site.pages.dev',
  updatedAt: '2026-07-21',
  social: {
    github: '',
    x: '',
    instagram: '',
    tiktok: '',
  },
  interests: [
    'レトロゲーム・回路',
    'トレーニング／運動',
    'ソフトウェア実験',
    'DIY・工具',
    '継続的な学び',
  ],
  profile: {
    lead: '「幅広い関心」と「まだ途中の制作」を、むりにひとつにまとめずに説明します。',
    body: 'レトロゲームはハードや回路の話から、運動はフォームや記録の話まで、コードは小さな自動化やサイト保守まで——題材はバラバラでも、仕組みを理解して自分の手で試すところが続いています。誇張しない書き方を心がけています。',
  },
} as const;

export type AppListing = {
  slug: string;
  name: string;
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

export const apps: AppListing[] = [
  {
    slug: 'crossplatform-app',
    name: 'Crossplatform App',
    summary: 'Android / iOS / Web 共通公開のスターター。収益化フック付き（既定オフ）。',
    platforms: ['ios', 'android', 'web'],
    status: 'development',
    dataCollected: [
      'アカウント登録時のメールアドレス（任意ログイン時）',
      'クラッシュログ・利用状況（Sentry 等を有効化した場合）',
    ],
    storeUrls: {
      web: '/apps/crossplatform-app/',
    },
  },
];

export const statusLabel: Record<AppListing['status'], string> = {
  planning: '企画中',
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
  const subject = encodeURIComponent('[ymd Portfolio 問い合わせ]');
  const body = encodeURIComponent(
    'ymd のサイトから連絡しました。\n\nご用件:\n',
  );
  return `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;
}
