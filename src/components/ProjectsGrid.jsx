import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { allProjects } from '../data/projects'
import { ArrowUpRight } from './icons'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import styles from './ProjectsGrid.module.css'

// Show first 7 projects from the data file
const projects = allProjects.slice(0, 7)

export default function ProjectsGrid() {
  const navigate = useNavigate()
  const { t, toUpper } = useLang()
  const p = t.projects
  const sectionRef    = useRef(null)
  const headlineRef   = useRef(null)
  const dividerRef    = useRef(null)
  const gridRef       = useRef(null)
  const cardRefs      = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // ── Initial states (Jonite pattern) ─────────────────────────────────
      gsap.set(headlineRef.current,        { y: 209, opacity: 0 })
      gsap.set(dividerRef.current,         { y: 249, opacity: 0 })
      gsap.set(gridRef.current,            { y: 289, opacity: 0 })
      gsap.set(cardRefs.current.filter(Boolean), { y: '10%', opacity: 0 })

      // ── Entrance timeline ────────────────────────────────────────────────
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'in-j', duration: 2.2 },
      })
      tl.to(headlineRef.current,               { y: 0, opacity: 1 }, 0)
      tl.to(dividerRef.current,                { y: 0, opacity: 1 }, 0)
      tl.to(gridRef.current,                   { y: 0, opacity: 1 }, 0)
      tl.to(cardRefs.current.filter(Boolean),  { y: 0, opacity: 1, stagger: 0.1 }, 0)

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        once: true,
        preventOverlaps: true,
        toggleActions: 'play none none none',
        onEnter: () => tl.play(),
      })

      // ── Parallax on each project card image ──────────────────────────────
      const wrappers = section.querySelectorAll(`.${styles.parallaxInner}`)
      wrappers.forEach(wrapper => {
        const container = wrapper.closest(`.${styles.cardImage}`)
        gsap.fromTo(
          wrapper,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className={`${styles.section} container`} id="projects" ref={sectionRef}>
      <div className="site-grid">
        <div className={styles.headlineWrap} ref={headlineRef}>
          <span className="section-label">{toUpper(p.label)}</span>
          <h3 className={styles.headline}>
            {p.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h3>
        </div>
      </div>

      <hr className={styles.divider} ref={dividerRef} />

      <div className={styles.grid} ref={gridRef}>
        {projects.map((proj, i) => (
          <div
            className={styles.card}
            key={proj.slug}
            ref={el => { cardRefs.current[i] = el }}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          >
            <div className={styles.cardImage}>
              {/* Wrapper div receives GSAP parallax — img CSS hover scale is unaffected */}
              <div className={styles.parallaxInner}>
                <img src={proj.image} alt={proj.name} />
              </div>
            </div>
            <p className={styles.cardType}>{toUpper(p.types[proj.typeKey])}</p>
            <p className={styles.cardName}>
              {proj.name} <span className={styles.icon}><ArrowUpRight size={11} /></span>
            </p>
          </div>
        ))}

        <div
          className={`${styles.card} ${styles.cardCta}`}
          ref={el => { cardRefs.current[projects.length] = el }}
          onClick={() => navigate('/projects')}
          style={{ cursor: 'pointer' }}
        >
          <p>{p.cta}</p>
          <span className={styles.bigArrow}><ArrowUpRight size={40} /></span>
        </div>
      </div>
    </section>
  )
}
