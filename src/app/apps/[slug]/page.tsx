import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LegalArticle } from '@/components/LegalArticle';
import { apps, legalUrls, platformLabel, siteConfig, statusLabel } from '@/config/site';
import { privacyBody } from '@/content/legal';
import styles from '../../page.module.css';

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const app = apps.find((a) => a.slug === slug);
    return { title: app?.name ?? 'App' };
  });
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const urls = legalUrls();

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>
            {app.platforms.map((p) => platformLabel[p] ?? p).join(' · ')}
          </p>
          <h1 className={styles.pageTitle}>{app.name}</h1>
          <p>{app.summary}</p>
          <p className={styles.note}>
            このページはストア審査用です。人向けの紹介は
            <a href={siteConfig.portfolioUrl}>ポートフォリオHP</a>
            を見てください。
          </p>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.statusPill} data-status={app.status}>
            {statusLabel[app.status]}
          </span>
        </div>

        {app.storeUrls && Object.values(app.storeUrls).some(Boolean) ? (
          <div className={styles.group}>
            {app.storeUrls.windows ? (
              <a className={styles.contactRow} href={app.storeUrls.windows}>
                <span>
                  <strong>Microsoft Store</strong>
                  <span className={styles.contactMeta}>Windows</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  ›
                </span>
              </a>
            ) : null}
            {app.storeUrls.web ? (
              <a className={styles.contactRow} href={app.storeUrls.web}>
                <span>
                  <strong>ダウンロード / Web</strong>
                  <span className={styles.contactMeta}>公開ページ</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  ›
                </span>
              </a>
            ) : null}
            {app.storeUrls.ios ? (
              <a className={styles.contactRow} href={app.storeUrls.ios}>
                <span>
                  <strong>App Store</strong>
                  <span className={styles.contactMeta}>iOS</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  ›
                </span>
              </a>
            ) : null}
            {app.storeUrls.android ? (
              <a className={styles.contactRow} href={app.storeUrls.android}>
                <span>
                  <strong>Google Play</strong>
                  <span className={styles.contactMeta}>Android</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  ›
                </span>
              </a>
            ) : null}
          </div>
        ) : null}

        <div className={styles.group}>
          <a className={styles.contactRow} href={urls.privacy}>
            <span>
              <strong>プライバシーポリシー</strong>
              <span className={styles.contactMeta}>共通</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </a>
          <a className={styles.contactRow} href={urls.terms}>
            <span>
              <strong>利用規約</strong>
              <span className={styles.contactMeta}>共通</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </a>
          <a className={styles.contactRow} href={urls.support}>
            <span>
              <strong>サポート</strong>
              <span className={styles.contactMeta}>問い合わせ</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </a>
        </div>

        <p className={styles.sectionFoot}>
          <Link href="/apps/">← ストア申請対象</Link>
          {' · '}
          <a href={siteConfig.portfolioUrl}>ポートフォリオHP</a>
        </p>
      </section>

      <LegalArticle
        title={`${app.name} のデータ取扱い追記`}
        markdown={privacyBody(app.slug)}
      />
    </div>
  );
}
