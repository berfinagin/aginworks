import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { ArrowUpRight } from './icons'
import { gsap } from '../utils/gsapSetup'
import styles from './AboutStrip.module.css'

export default function AboutStrip() {
  const { t, toUpper } = useLang()
  const a = t.about
  const imageContainerRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const container = imageContainerRef.current
    const inner = parallaxRef.current
    if (!container || !inner) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
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
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section className={`${styles.strip} site-grid container`}>
      <div className={styles.text}>
        <span className="section-label">{toUpper(a.label)}</span>
        <h2>{a.heading}</h2>
        <p>{a.body}</p>
        <Link to="/contact" className={styles.btnOutline}>
          {a.cta}
          <span className={styles.arrow}><ArrowUpRight /></span>
        </Link>
      </div>
      <div className={styles.image} ref={imageContainerRef}>
        <div className={styles.parallaxInner} ref={parallaxRef}>
          <img
            src="/projects/dosemealti-icmimari/cover.jpg"
            alt="Studio at work"
          />
        </div>
      </div>
    </section>
  )
}
