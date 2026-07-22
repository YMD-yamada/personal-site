import Link from 'next/link';
import { AppRow } from '@/components/AppRow';
import { apps, legalUrls, siteConfig } from '@/config/site';
import styles from './page.module.css';

const legalLinks = [
  { href: '/legal/privacy/', label: 'プライバシーポリシー', note: 'ストア提出用' },
  { href: '/legal/terms/', label: '利用規約', note: 'ストア提出用' },
  { href: '/legal/tokushoho/', label: '特定商取引法に基づく表記', note: '有料時に使用' },
  { href: '/support/', label: 'サポート', note: '問い合わせ・アカウント削除' },
] as const;

export default function HomePage() {
  const urls = legalUrls();

  return (
    <div className={styles.page}>
      <section className={styles.heroCompact} aria-label="概要">
        <p className={styles.kicker}>Store legal hub</p>
        <h1 className={styles.brand}>{siteConfig.brandName}</h1>
        <p className={styles.lede}>{siteConfig.purpose}</p>
        <p className={styles.note}>
          個人のポートフォリオとは別サイトです。App Store / Google Play
          に登録する URL は以下を使ってください。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>提出用リンク</h2>
        </div>
        <div className={styles.group}>
          {legalLinks.map((item) => (
            <Link key={item.href} className={styles.contactRow} href={item.href}>
              <span>
                <strong>{item.label}</strong>
                <span className={styles.contactMeta}>{item.note}</span>
              </span>
              <span className={styles.chevron} aria-hidden>
                ›
              </span>
            </Link>
          ))}
        </div>
        <ul className={styles.urlList}>
          <li>
            <code>{urls.privacy}</code>
          </li>
          <li>
            <code>{urls.terms}</code>
          </li>
          <li>
            <code>{urls.tokushoho}</code>
          </li>
          <li>
            <code>{urls.support}</code>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>対象アプリ</h2>
          <p>各アプリ固有のデータ取扱い追記への入口です。</p>
        </div>
        <div className={styles.group}>
          {apps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
