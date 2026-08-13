import Link from 'next/link';
import { AppRow } from '@/components/AppRow';
import { apps, siteConfig } from '@/config/site';
import styles from '../page.module.css';

export const metadata = { title: 'ストア申請対象' };

export default function AppsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Store apps</p>
          <h1 className={styles.pageTitle}>ストア申請対象</h1>
          <p>
            App Store / Google Play / Microsoft Store に提出するアプリの法務ページです。Web
            だけの制作物は
            <a href={siteConfig.portfolioUrl}>ポートフォリオHP</a>
            にあります。
          </p>
        </div>
        <div className={styles.group}>
          {apps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
        <p className={styles.sectionFoot}>
          <Link href="/">← ホームへ戻る</Link>
          {' · '}
          <a href={siteConfig.portfolioUrl}>作品一覧へ</a>
        </p>
      </section>
    </div>
  );
}
