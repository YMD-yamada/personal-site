import Link from 'next/link';
import { AppRow } from '@/components/AppRow';
import { apps } from '@/config/site';
import styles from '../page.module.css';

export const metadata = { title: '制作物' };

export default function AppsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Works</p>
          <h1 className={styles.pageTitle}>制作物</h1>
          <p>
            ストア公開前の実験も含め、いま手を入れているものを並べています。
          </p>
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
