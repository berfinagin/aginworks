import { useLang } from '../contexts/LanguageContext'
import styles from './AboutStrip.module.css'

export default function AboutStrip() {
  const { t } = useLang()
  const a = t.about

  return (
    <section className={`${styles.strip} site-grid container`}>
      <div className={styles.text}>
        <span className="section-label">{a.label}</span>
        <h2>{a.heading}</h2>
        <p>{a.body}</p>
        <a href="#contact" className={styles.btnOutline}>
          {a.cta}
          <span className={styles.arrow}>↗</span>
        </a>
      </div>
      <div className={styles.image}>
        <img
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=900&q=80"
          alt="Studio at work"
        />
      </div>
    </section>
  )
}
