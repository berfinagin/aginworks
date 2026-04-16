import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, toUpper } = useLang()
  const f = t.footer

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.tagline}>{f.tagline}</p>
          <div className={styles.colsRow}>
            <div className={styles.col}>
              <h4>{toUpper(f.studio)}</h4>
              <ul>
                <li><Link to="/about">{f.links.about}</Link></li>
                <li><Link to="/projects">{f.links.projects}</Link></li>
                <li><Link to="/contact">{f.links.contact}</Link></li>
              </ul>
            </div>
            <div className={styles.col}>
              <h4>{toUpper(f.services)}</h4>
              <ul>
                <li>{f.links.architecture}</li>
                <li>{f.links.construction}</li>
                <li>{f.links.interior}</li>
                <li>{f.links.landscape}</li>
              </ul>
            </div>
            <div className={styles.col}>
              <h4>{toUpper(f.connect)}</h4>
              <ul>
                <li><a href="https://instagram.com">{f.links.instagram}</a></li>
                <li><a href="https://linkedin.com">{f.links.linkedin}</a></li>
                <li><a href="mailto:info@agin.works">{f.links.email}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{toUpper(f.copy)}</span>
          <span>{toUpper(f.city)}</span>
          <span>{toUpper(f.rights)}</span>
        </div>
      </div>
    </footer>
  )
}
