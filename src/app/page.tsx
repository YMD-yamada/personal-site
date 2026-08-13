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
          このサイトは<strong>ストア審査提出用</strong>です。作品の紹介・SNSでの入口は
          <a href={siteConfig.portfolioUrl}>ポートフォリオHP</a>
          です。プライバシー・利用規約・サポートの URL
          は掲載アプリで共通。Web だけの制作物はここには載せません。
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>2つの公開サイト</h2>
          <p>
            役割を分けています。審査員向けの法務URLと、人向けの作品一覧を混ぜません。
          </p>
        </div>
        <div className={styles.group}>
          <a className={styles.contactRow} href={siteConfig.portfolioUrl}>
            <span>
              <strong>ポートフォリオHP</strong>
              <span className={styles.contactMeta}>
                Web制作物・SNSで紹介する入口 · ymd-portfolio-site.pages.dev
              </span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </a>
          <Link className={styles.contactRow} href="/apps/">
            <span>
              <strong>このサイト（ストア法務）</strong>
              <span className={styles.contactMeta}>
                App Store / Play / Microsoft Store のポリシーURL
              </span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </Link>
        </div>
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
          <h2>ストア申請対象</h2>
          <p>
            App Store / Google Play / Microsoft Store でポリシーURLが必要なアプリだけです（
            {apps.length}件）。Web公開のみの作品は
            <a href={siteConfig.portfolioUrl}>ポートフォリオ</a>
            を見てください。
          </p>
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
