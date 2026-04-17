import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../utils/gsapSetup'
import { useLang } from '../contexts/LanguageContext'
import { ArrowUpRight, ArrowRight } from './icons'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, toUpper } = useLang()
  const m = t.hero.meta

  const h1Ref      = useRef(null)
  const metaRef    = useRef(null)
  const leftBoxRef = useRef(null)
  const rightBoxRef= useRef(null)
  const allImgRefs = useRef([])
  const slideRefs  = useRef([])
  const [clock, setClock] = useState({ a: '', b: '' })

  // Live clock
  useEffect(() => {
    const fmt = tz => new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour12: false })
    const tick = () => setClock({ a: fmt('Europe/Istanbul'), b: fmt('Europe/London') })
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // GSAP entrance + slide crossfade
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerEase('figma-spring', p =>
      p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
    )

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'figma-spring' } })

      tl.set(metaRef.current, { y: 300 })

      tl.to(allImgRefs.current.filter(Boolean), { scale: 1, duration: 1.2 }, 0.5)
      tl.to(metaRef.current,                    { y: 160, duration: 0.7 }, 0.5)
      const leftH  = leftBoxRef.current.getBoundingClientRect().height
      const rightH = rightBoxRef.current.getBoundingClientRect().height

      tl.to([leftBoxRef.current, rightBoxRef.current], {
        '--height': `${Math.round(Math.min(leftH, rightH) * 0.3)}px`,
        duration: 0.7,
      }, 0.5)

      tl.to(metaRef.current,    { y: 0, duration: 1.2 }, 1.4)
      tl.to(leftBoxRef.current, { '--height': `${leftH}px`, duration: 1.2 }, 1.4)
      tl.to(rightBoxRef.current,{ '--height': `${rightH}px`, duration: 1.2 }, 1.4)
      tl.to(h1Ref.current,      { y: 0, duration: 1.2 }, 1.4)
    })

    // Slide crossfade
    const slides = slideRefs.current.filter(Boolean)
    let cur = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        slides[cur].style.opacity = 0
        cur = (cur + 1) % slides.length
        slides[cur].style.opacity = 1
      }, 3000)
    }, 2600)

    return () => {
      ctx.revert()
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className={styles.hero}>

      {/* LEFT COLUMN */}
      <div className={styles.left}>

        {/* Headline */}
        <div className={styles.headlineClip}>
          <h1 ref={h1Ref} className={styles.headline}>
            {t.hero.tagline}
          </h1>
        </div>

        {/* Meta: two cities + est */}
        <div ref={metaRef} className={styles.meta}>
          <div className={styles.metaCols}>
            <div className={styles.metaCol}>
              <p className={styles.metaCity}>Antalya</p>
              <p>{clock.a}</p>
            </div>
            <div className={styles.metaCol}>
              <p className={styles.metaCity}>Istanbul</p>
              <p>{clock.b}</p>
            </div>
          </div>
          <p className={styles.est}>{toUpper(m.est)}</p>
        </div>

        {/* Left image box */}
        <div ref={leftBoxRef} className={styles.leftBox} style={{ '--height': '0px' }}>
          <div className={styles.slide}>
            <img
              ref={el => { allImgRefs.current[0] = el }}
              src="/projects/altinova-antalya/09.png"
              alt="Architectural project"
            />
          </div>
          <Link to="/projects" className={styles.btnPill}>
            {t.hero.cta}
            <span className={styles.arrow}><ArrowUpRight /></span>
          </Link>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.right}>
        <div ref={rightBoxRef} className={styles.rightBox} style={{ '--height': '0px' }}>
          <div ref={el => { slideRefs.current[0] = el }} className={styles.slide}>
            <img
              ref={el => { allImgRefs.current[1] = el }}
              src="/projects/altinova-antalya/05.png"
              alt="Slide 1"
            />
          </div>
          <div ref={el => { slideRefs.current[1] = el }} className={`${styles.slide} ${styles.slideHidden}`}>
            <img
              ref={el => { allImgRefs.current[2] = el }}
              src="/projects/altinova-antalya/02.png"
              alt="Slide 2"
            />
          </div>
          <div ref={el => { slideRefs.current[2] = el }} className={`${styles.slide} ${styles.slideHidden}`}>
            <img
              ref={el => { allImgRefs.current[3] = el }}
              src="/projects/altinova-antalya/07.png"
              alt="Slide 3"
            />
          </div>
          <Link to="/projects" className={styles.btnPill}>
            {t.hero.ctaHero}
            <span className={styles.arrow}><ArrowRight size={11} /></span>
          </Link>
        </div>
      </div>

    </section>
  )
}
