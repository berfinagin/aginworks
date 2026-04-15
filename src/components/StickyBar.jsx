import { useLang } from '../contexts/LanguageContext'
import styles from './StickyBar.module.css'

export default function StickyBar() {
  const { t } = useLang()

  return (
    <div className={styles.bar}>
      <a href="#projects">{t.sticky.projects}</a>
      <a href="#contact">{t.sticky.contact}</a>
    </div>
  )
}
