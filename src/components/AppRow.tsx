import Link from 'next/link';
import type { AppListing } from '@/config/site';
import { statusLabel } from '@/config/site';
import styles from './AppRow.module.css';

export function AppRow({ app }: { app: AppListing }) {
  const initial = app.name.slice(0, 1).toUpperCase();

  return (
    <Link href={`/apps/${app.slug}/`} className={styles.row}>
      <span className={styles.icon} aria-hidden>
        {initial}
      </span>
      <span className={styles.copy}>
        <span className={styles.titleRow}>
          <span className={styles.title}>{app.name}</span>
          <span className={styles.badge} data-status={app.status}>
            {statusLabel[app.status]}
          </span>
        </span>
        <span className={styles.summary}>{app.summary}</span>
        <span className={styles.platforms}>{app.platforms.join(' · ')}</span>
      </span>
      <span className={styles.chevron} aria-hidden>
        ›
      </span>
    </Link>
  );
}
