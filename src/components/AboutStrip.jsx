import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { ArrowUpRight } from './icons'
import styles from './AboutStrip.module.css'

export default function AboutStrip() {
  const { t, toUpper } = useLang()
  const a = t.about

  return (
    <section className={`${styles.strip} site-grid container`}>
      <div className={styles.text}>
        <span className="section-label">{toUpper(a.label)}</span>
        <h2>{a.heading}</h2>
        <p>{a.body}</p>
        <Link to="/contact" className={styles.btnOutline}>
          {a.cta}
          <span className={styles.arrow}><ArrowUpRight /></span>
        </Link>
      </div>
      <div className={styles.image}>
        <img
          src="/projects/dosemealti-icmimari/cover.jpg"
          alt="Studio at work"
        />
      </div>
    </section>
  )
}
