import { useLang } from '../contexts/LanguageContext'
import styles from './About.module.css'

export default function About() {
  const { t, toUpper } = useLang()
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
            <span className="section-label">{toUpper(a.studioLabel)}</span>
            <h2 className={styles.introHeading}>{a.studioHeading}</h2>
            <p className={styles.introBody}>{a.studioBody1}</p>
            <p className={styles.introBody}>{a.studioBody2}</p>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className={`${styles.founder} container`}>
        <div className={styles.founderGrid}>
          <div className={styles.founderMeta}>
            <span className="section-label">{toUpper(a.founderLabel)}</span>
          </div>
          <div className={styles.teamList}>
            {a.founders.map((f, i) => (
              <div className={styles.teamMember} key={i}>
                <div className={styles.founderImage}>
                  <img
                    src={[
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
                    ][i]}
                    alt={f.name}
                  />
                </div>
                <div className={styles.founderInfo}>
                  <h3 className={styles.founderName}>{f.name}</h3>
                  <p className={styles.founderRole}>{toUpper(f.role)}</p>
                  <p className={styles.founderBio}>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className={`${styles.approach} container`}>
        <div className={styles.approachHeader}>
          <span className="section-label">{toUpper(a.approachLabel)}</span>
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
        <span className="section-label">{toUpper(a.servicesLabel)}</span>
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
