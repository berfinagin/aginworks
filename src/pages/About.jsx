import { useLang } from '../contexts/LanguageContext'
import styles from './About.module.css'

export default function About() {
  const { t } = useLang()
  const a = t.aboutPage

  return (
    <div className={styles.page}>

      {/* ── TITLE ── */}
      <div className={`${styles.pageHero} container`}>
        <h1 className={styles.title}>{a.title}</h1>
        <div className={styles.divider} />
      </div>

      {/* ── STUDIO INTRO ── */}
      <section className={`${styles.intro} container`}>
        <div className={styles.introGrid}>
          <div className={styles.introImage}>
            <img
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80"
              alt="Studio"
            />
          </div>
          <div className={styles.introText}>
            <span className="section-label">{a.studioLabel}</span>
            <h2 className={styles.introHeading}>{a.studioHeading}</h2>
            <p className={styles.introBody}>{a.studioBody1}</p>
            <p className={styles.introBody}>{a.studioBody2}</p>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className={`${styles.founder} container`}>
        <div className={styles.founderGrid}>
          <div className={styles.founderMeta}>
            <span className="section-label">{a.founderLabel}</span>
          </div>
          <div className={styles.founderContent}>
            <div className={styles.founderImage}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt={a.founderName}
              />
            </div>
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>{a.founderName}</h3>
              <p className={styles.founderRole}>{a.founderRole}</p>
              <p className={styles.founderBio}>{a.founderBio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className={`${styles.approach} container`}>
        <div className={styles.approachHeader}>
          <span className="section-label">{a.approachLabel}</span>
        </div>
        <div className={styles.approachList}>
          {a.approachItems.map((item) => (
            <div className={styles.approachRow} key={item.num}>
              <span className={styles.approachNum}>{item.num}</span>
              <h4 className={styles.approachTitle}>{item.title}</h4>
              <p className={styles.approachBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className={`${styles.services} container`}>
        <span className="section-label">{a.servicesLabel}</span>
        <div className={styles.servicesList}>
          {a.services.map((s, i) => (
            <div className={styles.serviceItem} key={i}>
              <span className={styles.serviceNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.serviceName}>{s}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
