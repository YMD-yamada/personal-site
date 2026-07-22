import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LegalArticle } from '@/components/LegalArticle';
import { apps, legalUrls, statusLabel } from '@/config/site';
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
          <p className={styles.kicker}>{app.platforms.join(' · ')}</p>
          <h1 className={styles.pageTitle}>{app.name}</h1>
          <p>{app.summary}</p>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.statusPill} data-status={app.status}>
            {statusLabel[app.status]}
          </span>
        </div>

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
          <Link href="/apps/">← アプリ一覧</Link>
        </p>
      </section>

      <LegalArticle
        title={`${app.name} のデータ取扱い追記`}
        markdown={privacyBody(app.slug)}
      />
    </div>
  );
}
