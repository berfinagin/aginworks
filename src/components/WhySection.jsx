import { useLang } from '../contexts/LanguageContext'
import styles from './WhySection.module.css'

const icons = {
  site: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="20" r="7" fill="currentColor" />
      <path d="M24 4C15.163 4 8 11.163 8 20c0 12 16 28 16 28s16-16 16-28c0-8.837-7.163-16-16-16z" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  ),
  material: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="34" width="36" height="6" fill="currentColor" />
      <rect x="6" y="24" width="36" height="6" fill="currentColor" opacity="0.6" />
      <rect x="6" y="14" width="36" height="6" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  spatial: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="40" height="40" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="4" x2="24" y2="44" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  lasting: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 44,40 4,40" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="24" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
    </svg>
  ),
  craft: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" fill="currentColor" />
    </svg>
  ),
}

export default function WhySection() {
  const { t } = useLang()
  const w = t.why

  return (
    <section className={`${styles.section} container`}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <span className="section-label">{w.label}</span>
          <h2 className={styles.heading}>{w.heading}</h2>
        </div>
        <p className={styles.body}>{w.body}</p>
      </div>

      <div className={styles.pillars}>
        {w.pillars.map((p) => (
          <div className={styles.pillar} key={p.icon}>
            <div className={styles.pillarIcon}>{icons[p.icon]}</div>
            <span className={styles.pillarLabel}>{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
