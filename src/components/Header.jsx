import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Header.module.css'

export default function Header() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} ${scrolled ? styles.innerScrolled : ''}`}>
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span /><span /><span />
          </div>
          Aginworks
        </NavLink>
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? styles.navLinkActive : undefined}
              >
                {t.nav.caseStudies}
              </NavLink>
            </li>
            <li>
              <NavLink to="/#about">{t.nav.about}</NavLink>
            </li>
            <li>
              <NavLink to="/#contact">{t.nav.contact}</NavLink>
            </li>
            <li>
              <button className={styles.langToggle} onClick={toggle}>
                {lang === 'en' ? 'TR' : 'EN'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
