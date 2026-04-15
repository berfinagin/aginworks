import { useLang } from '../contexts/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.tagline}>{f.tagline}</p>
          <div className={styles.col}>
            <h4>{f.studio}</h4>
            <ul>
              <li><a href="#about">{f.links.about}</a></li>
              <li><a href="#projects">{f.links.projects}</a></li>
              <li><a href="#contact">{f.links.contact}</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>{f.services}</h4>
            <ul>
              <li>{f.links.architecture}</li>
              <li>{f.links.construction}</li>
              <li>{f.links.interior}</li>
              <li>{f.links.landscape}</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>{f.connect}</h4>
            <ul>
              <li><a href="https://instagram.com">{f.links.instagram}</a></li>
              <li><a href="https://linkedin.com">{f.links.linkedin}</a></li>
              <li><a href="mailto:hello@agin.works">{f.links.email}</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{f.copy}</span>
          <span>{f.city}</span>
          <span>{f.rights}</span>
        </div>
      </div>
    </footer>
  )
}
