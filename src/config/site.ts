import appsJson from './apps.json';

/**
 * App Store / Google Play 申請用の共通法務ハブ。
 * ポートフォリオ（https://ymd-portfolio-site.pages.dev/）とは別サイト。
 *
 * - プライバシー / 利用規約 / サポート URL は全アプリで共通利用
 * - Crossplatform App 専用サイトではない（最初の1件として登録されているだけ）
 * - 新アプリは `npm run register-app` または `npm run create-app` で apps.json に自動追加
 */
export const siteConfig = {
  brandName: 'ymd',
  purpose: 'アプリのプライバシーポリシー・利用規約・サポート窓口',
  operatorName: '山田健登',
  address: '請求があった場合に遅滞なく開示します',
  supportEmail: 'ymd.hude@gmail.com',
  publicBaseUrl: 'https://personal-site-taupe-gamma.vercel.app',
  updatedAt: '2026-07-22',
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
