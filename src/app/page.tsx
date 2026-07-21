import Link from 'next/link';
import { AppRow } from '@/components/AppRow';
import { apps, mailtoSupport, siteConfig } from '@/config/site';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="イントロ">
        <div className={styles.heroGlow} aria-hidden />
        <h1 className={styles.brand}>{siteConfig.brandName}</h1>
        <p className={styles.headline}>{siteConfig.headline}</p>
        <p className={styles.lede}>{siteConfig.tagline}</p>
        <div className={styles.ctaRow}>
          <a className={styles.primary} href="#works">
            制作物を見る
          </a>
          <a className={styles.secondary} href="#contact">
            連絡する
          </a>
        </div>
      </section>

      <section id="works" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>制作物</h2>
          <p>ストア公開前の実験も含め、いま手を入れているものを並べています。</p>
        </div>
        <div className={styles.group}>
          {apps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
        <p className={styles.sectionFoot}>
          <Link href="/apps/">すべての制作物</Link>
        </p>
      </section>

      <section id="profile" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>プロフィール</h2>
          <p>{siteConfig.profile.lead}</p>
        </div>
        <p className={styles.prose}>{siteConfig.profile.body}</p>
        <ul className={styles.interestRow}>
          {siteConfig.interests.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>連絡</h2>
          <p>
            共同制作・取材・技術相談はメールから。SNS はアカウント準備中です。
          </p>
        </div>
        <div className={styles.group}>
          <a className={styles.contactRow} href={mailtoSupport()}>
            <span>
              <strong>メール</strong>
              <span className={styles.contactMeta}>{siteConfig.supportEmail}</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </a>
          <Link className={styles.contactRow} href="/support/">
            <span>
              <strong>サポートページ</strong>
              <span className={styles.contactMeta}>問い合わせ・削除依頼など</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </Link>
          <Link className={styles.contactRow} href="/legal/privacy/">
            <span>
              <strong>共通法務</strong>
              <span className={styles.contactMeta}>プライバシー / 利用規約 / 特商法</span>
            </span>
            <span className={styles.chevron} aria-hidden>
              ›
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
