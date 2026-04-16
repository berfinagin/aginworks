import { useLang } from '../contexts/LanguageContext'
import styles from './ClientsMarquee.module.css'

const clients = [
  'Zaha Hadid Architects',
  'Foster + Partners',
  'BIG',
  'Snøhetta',
  'AECOM',
  'Kengo Kuma',
  'Adjaye Associates',
]

export default function ClientsMarquee() {
  const { t, toUpper } = useLang()
  const doubled = [...clients, ...clients]

  return (
    <div className={styles.strip}>
      <div className={styles.header}>
        <span className="section-label">{toUpper(t.marquee.label)}</span>
        <p className={styles.desc}>{t.marquee.desc}</p>
      </div>
      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          {doubled.map((name, i) => (
            <span key={i} className={styles.item}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
