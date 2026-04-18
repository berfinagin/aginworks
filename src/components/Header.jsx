import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Header.module.css'

export default function Header() {
  const { lang, toggle, t, toUpper } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <img src="/favicon2.svg" alt="" className={styles.logoImg} />
          AGIN WORKS
        </NavLink>
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? styles.navLinkActive : undefined}
              >
                {toUpper(t.nav.caseStudies)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? styles.navLinkActive : undefined}
              >
                {toUpper(t.nav.about)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? styles.navLinkActive : undefined}
              >
                {toUpper(t.nav.contact)}
              </NavLink>
            </li>
            <li>
              <button className={styles.langToggle} onClick={toggle}>
                {lang === 'en' ? 'TR' : 'EN'}
              </button>
            </li>
          </ul>
        </nav>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineHide : ''}`} />
        </button>
      </div>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNav}>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => isActive ? styles.mobileNavActive : undefined}
            >
              {toUpper(t.nav.caseStudies)}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? styles.mobileNavActive : undefined}
            >
              {toUpper(t.nav.about)}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? styles.mobileNavActive : undefined}
            >
              {toUpper(t.nav.contact)}
            </NavLink>
          </li>
          <li className={styles.mobileNavLangRow}>
            <button className={styles.mobileLangToggle} onClick={toggle}>
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
