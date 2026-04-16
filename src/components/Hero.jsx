import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { ArrowUpRight, ArrowRight } from './icons'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, toUpper } = useLang()
  const m = t.hero.meta
  const taglineSpanRef = useRef(null)
  const leftImageRef = useRef(null)
  const rightImageRef = useRef(null)
  const leftWrapRef = useRef(null)
  const rightWrapRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Hero tagline clip-reveal — text rises from behind overflow mask
      if (taglineSpanRef.current) {
        gsap.fromTo(
          taglineSpanRef.current,
          { y: '105%' },
          { y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
        )
      }

      // Left image: GSAP owns transform — sets initial scale + parallax y drift
      if (leftImageRef.current && leftWrapRef.current) {
        gsap.set(leftImageRef.current, { scale: 1.15, yPercent: -5 })
        gsap.to(leftImageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: leftWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Right image: slightly different speed for depth
      if (rightImageRef.current && rightWrapRef.current) {
        gsap.set(rightImageRef.current, { scale: 1.15, yPercent: -3 })
        gsap.to(rightImageRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: rightWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={`${styles.hero} site-grid container`}>
      <div className={styles.left}>
        <h1 className={styles.tagline}>
          <span ref={taglineSpanRef} className={styles.taglineInner}>
            {t.hero.tagline}
          </span>
        </h1>
        <div className={styles.meta}>
          <div className={styles.metaBlock}>
            <p>{toUpper(m.field1)}</p>
            <p>{toUpper(m.field2)}</p>
            <p>{toUpper(m.field3)}</p>
          </div>
          <p className={styles.est}>{toUpper(m.est)}</p>
        </div>

        <div className={`${styles.imageWrap} image-container`} ref={leftWrapRef}>
          <img
            ref={leftImageRef}
            src="/projects/altintas-antalya/cover.jpg"
            alt="Featured architectural project"
          />
          <Link to="/projects" className={styles.btnPill}>
            {t.hero.cta}
            <span className={styles.arrow}><ArrowUpRight /></span>
          </Link>
        </div>
      </div>

      <div className={`${styles.right} image-container`} ref={rightWrapRef}>
        <img
          ref={rightImageRef}
          src="/projects/altinova-antalya/cover.jpg"
          alt="Architectural detail"
        />
        <Link to="/projects" className={styles.btnPill}>
          {t.hero.ctaHero}
          <span className={styles.arrow}><ArrowRight size={11} /></span>
        </Link>
      </div>
    </section>
  )
}
