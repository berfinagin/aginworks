import { useLang } from '../contexts/LanguageContext'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <section className={`${styles.section} site-grid container`} id="contact">
      <div className={styles.heading}>
        <span className="section-label">{c.label}</span>
        <h2>{c.heading}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.item}>
          <label>{c.location}</label>
          <p>{c.locationValue}</p>
        </div>
        <div className={styles.item}>
          <label>{c.email}</label>
          <p>hello@agin.works</p>
        </div>
        <div className={styles.item}>
          <label>{c.services}</label>
          <p>{c.servicesList.join('\n').split('\n').map((s, i) => (
            <span key={i}>{s}<br /></span>
          ))}</p>
        </div>
      </div>
    </section>
  )
}
