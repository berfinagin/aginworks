import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './StickyBar.module.css'

export default function StickyBar() {
  const { t, toUpper } = useLang()

  return (
    <div className={styles.bar}>
      <Link to="/projects">{toUpper(t.sticky.projects)}</Link>
      <Link to="/contact">{toUpper(t.sticky.contact)}</Link>
    </div>
  )
}
