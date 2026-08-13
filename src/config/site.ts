import appsJson from './apps.json';

/**
 * App Store / Google Play / Microsoft Store 申請用の共通法務ハブ。
 * 公開作品の紹介・SNS入口はポートフォリオ（https://ymd-portfolio-site.pages.dev/）。
 *
 * - ここに載せるのはストア提出でポリシーURLが必要なアプリだけ
 * - プライバシー / 利用規約 / サポート URL は全ストアアプリで共通
 * - Web だけの制作物はポートフォリオへ。登録はエージェントが publish-app-listing
 */
export const siteConfig = {
  brandName: 'ymd',
  purpose: 'App Store / Google Play / Microsoft Store 申請用のプライバシー・利用規約・サポート',
  operatorName: '山田健登',
  address: '請求があった場合に遅滞なく開示します',
  supportEmail: 'ymd.hude@gmail.com',
  publicBaseUrl: 'https://personal-site-taupe-gamma.vercel.app',
  portfolioUrl: 'https://ymd-portfolio-site.pages.dev/',
  updatedAt: '2026-08-13',
} as const;

export type AppPlatform = 'ios' | 'android' | 'web' | 'windows';

export type AppListing = {
  slug: string;
  name: string;
  summary: string;
  platforms: AppPlatform[];
  status: 'planning' | 'development' | 'released';
  dataCollected: string[];
  storeUrls?: {
    ios?: string;
    android?: string;
    web?: string;
    windows?: string;
  };
};

export const platformLabel: Record<AppPlatform, string> = {
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
  windows: 'Windows',
};

export const apps = appsJson as AppListing[];

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
  const body = encodeURIComponent('アプリ名:\nお問い合わせ内容:\n');
  return `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;
}
