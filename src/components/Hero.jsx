import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()
  const m = t.hero.meta

  return (
    <section className={`${styles.hero} site-grid container`}>
      <div className={styles.left}>
        <h1 className={styles.tagline}>{t.hero.tagline}</h1>

        <div className={styles.meta}>
          <div className={styles.metaBlock}>
            <p>{m.city}</p>
            <p>{m.institution}</p>
            <p>{m.web}</p>
          </div>
          <div className={styles.metaBlock}>
            <p>{m.field1}</p>
            <p>{m.field2}</p>
            <p>{m.field3}</p>
          </div>
          <p className={styles.est}>{m.est}</p>
        </div>

        <div className={styles.imageWrap}>
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80"
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
          src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=1400&q=80"
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
