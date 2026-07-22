import Link from 'next/link';
import { AppRow } from '@/components/AppRow';
import { apps } from '@/config/site';
import styles from '../page.module.css';

export const metadata = { title: '対象アプリ' };

export default function AppsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Apps</p>
          <h1 className={styles.pageTitle}>対象アプリ</h1>
          <p>ストア申請対象のアプリ一覧です。</p>
        </div>
        <div className={styles.group}>
          {apps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
        <p className={styles.sectionFoot}>
          <Link href="/">← ホームへ戻る</Link>
        </p>
      </section>
    </div>
  );
}
