import Link from 'next/link';
import { mailtoSupport, siteConfig } from '@/config/site';
import styles from './site-chrome.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={`${siteConfig.brandName} home`}>
          <span className={styles.mark} aria-hidden />
          {siteConfig.brandName}
        </Link>
        <nav className={styles.nav} aria-label="メイン">
          <Link href="/legal/privacy/">プライバシー</Link>
          <Link href="/legal/terms/">利用規約</Link>
          <Link href="/support/">サポート</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <p className={styles.footerBrand}>{siteConfig.brandName}</p>
          <p className={styles.footerMeta}>
            © {new Date().getFullYear()} {siteConfig.operatorName} · ストア申請用ページ
          </p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/legal/privacy/">プライバシー</Link>
          <Link href="/legal/terms/">利用規約</Link>
          <Link href="/legal/tokushoho/">特商法</Link>
          <a href={mailtoSupport()}>メール</a>
        </div>
      </div>
    </footer>
  );
}
