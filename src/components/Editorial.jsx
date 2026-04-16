import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import styles from './Editorial.module.css'

const ongoingProjects = [
  {
    id: '01',
    slug: 'altinova-antalya',
    name: 'Altınova Residence',
    location: 'Antalya',
    typeKey: 'mixed',
    year: '2024',
    image: '/projects/altinova-antalya/cover.jpg',
  },
  {
    id: '02',
    slug: 'masadagi-antalya',
    name: 'Masadağı Konut',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2023',
    image: '/projects/masadagi-antalya/cover.jpg',
  },
  {
    id: '03',
    slug: 'dosemealti-villa',
    name: 'Döşemealtı Villa',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2022',
    image: '/projects/dosemealti-villa/cover.jpg',
  },
  {
    id: '04',
    slug: 'karaburun-villa',
    name: 'Karaburun Villa',
    location: 'İzmir',
    typeKey: 'residential',
    year: '2022',
    image: '/projects/karaburun-villa/cover.jpg',
  },
]

// Each display line drifts in opposite directions so they spread apart — not into each other
const WORD_OFFSETS = [-70, 0, 90] // px: top floats up, middle anchored, bottom floats down

export default function Editorial() {
  const navigate = useNavigate()
  const { t, toUpper } = useLang()
  const e = t.editorial
  const types = t.projects.types
  const [activeRow, setActiveRow] = useState(null)
  const headerRef = useRef(null)
  const displayWrapRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const header = headerRef.current
    const displayWrap = displayWrapRef.current
    if (!header || !displayWrap) return

    const ctx = gsap.context(() => {
      const words = displayWrap.querySelectorAll(`.${styles.display}`)
      if (!words.length) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      words.forEach((word, i) => {
        tl.to(word, { y: WORD_OFFSETS[i], ease: 'none', duration: 1.4 }, 0)
      })
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <section className={`${styles.section} container`} id="about">
      {/* Header */}
      <div className={styles.header} ref={headerRef}>
        <div className={styles.displayWrap} ref={displayWrapRef}>
          <span className={styles.display}>{e.line1}</span>
          <span className={styles.display}>{e.line2}</span>
          <span className={styles.display}>{e.line3}</span>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.body}>{e.body}</p>
          <div className={styles.actions}>
            <Link to="/contact" className="link-arrow">{toUpper(e.cta1)}</Link>
            <Link to="/projects" className="link-arrow">{toUpper(e.cta2)}</Link>
          </div>
        </div>
      </div>

      {/* Project rows */}
      <div className={styles.list}>
        {ongoingProjects.map((proj) => (
          <div
            className={`${styles.row} ${activeRow === proj.id ? styles.rowActive : ''}`}
            key={proj.id}
            onClick={() => navigate(`/projects/${proj.slug}`)}
            onTouchStart={() => setActiveRow(proj.id)}
            onTouchEnd={() => setActiveRow(null)}
            onTouchCancel={() => setActiveRow(null)}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.rowNum}>{proj.id}</span>
            <span className={styles.rowName}>{proj.name}</span>
            <span className={styles.rowType}>{toUpper(types[proj.typeKey])}</span>
            <span className={styles.rowLocation}>{toUpper(proj.location)}</span>
            <span className={styles.rowYear}>{proj.year}</span>
            <span className={styles.rowStatus} />
            {/* Image revealed on hover */}
            <div className={styles.rowImage}>
              <img src={proj.image} alt={proj.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
