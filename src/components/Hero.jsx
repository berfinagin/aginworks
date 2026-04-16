import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, toUpper } = useLang()
  const m = t.hero.meta

  return (
    <section className={`${styles.hero} site-grid container`}>
      <div className={styles.left}>
        <h1 className={styles.tagline}>{t.hero.tagline}</h1>

        <div className={styles.meta}>
          <div className={styles.metaBlock}>
            <p>{toUpper(m.city)}</p>
            <p>{toUpper(m.institution)}</p>
            <p>{toUpper(m.web)}</p>
          </div>
          <div className={styles.metaBlock}>
            <p>{toUpper(m.field1)}</p>
            <p>{toUpper(m.field2)}</p>
            <p>{toUpper(m.field3)}</p>
          </div>
          <p className={styles.est}>{toUpper(m.est)}</p>
        </div>

        <div className={styles.imageWrap}>
          <img
            src="/projects/altintas-konut/cover.jpg"
            alt="Featured architectural project"
          />
          <Link to="/projects" className={styles.btnPill}>
            {t.hero.cta}
            <span className={styles.arrow}>↗</span>
          </Link>
        </div>
      </div>

      <div className={styles.right}>
        <img
          src="/projects/dosemealti-villa/cover.jpg"
          alt="Architectural detail"
        />
        <Link to="/projects" className={styles.btnPill}>
          {t.hero.ctaHero}
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </section>
  )
}
