import { useLang } from '../contexts/LanguageContext'
import styles from './Contact.module.css'

export default function Contact() {
  const { t, toUpper } = useLang()
  const c = t.contact

  return (
    <section className={styles.wrapper} id="contact">
    <div className={`${styles.section} site-grid container`}>
      <div className={styles.heading}>
        <h2>{c.heading}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.item}>
          <label>{toUpper(c.location)}</label>
          <p>{c.locationValue}</p>
        </div>
        <div className={styles.item}>
          <label>{toUpper(c.email)}</label>
          <p>info@agin.works</p>
        </div>
        <div className={styles.item}>
          <label>{toUpper(c.services)}</label>
          <p>{c.servicesList.join('\n').split('\n').map((s, i) => (
            <span key={i}>{s}<br /></span>
          ))}</p>
        </div>
      </div>
    </div>
    </section>
  )
}
