import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { ArrowUpRight } from './icons'
import styles from './ClientsMarquee.module.css'

export default function ClientsMarquee() {
  const { t, toUpper } = useLang()

  return (
    <div className={styles.strip}>
      <div className={styles.header}>
        <span className="section-label">{toUpper(t.marquee.label)}</span>
        <p className={styles.desc}>{t.marquee.desc}</p>
        <Link to="/contact" className={styles.cta}>
          {t.marquee.cta}
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  )
}
