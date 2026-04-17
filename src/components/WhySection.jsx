import { useEffect, useRef } from 'react'
import { useLang } from '../contexts/LanguageContext'
import styles from './WhySection.module.css'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const icons = {
  site: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="20" r="7" fill="currentColor" />
      <path d="M24 4C15.163 4 8 11.163 8 20c0 12 16 28 16 28s16-16 16-28c0-8.837-7.163-16-16-16z" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  ),
  material: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="34" width="36" height="6" fill="currentColor" />
      <rect x="6" y="24" width="36" height="6" fill="currentColor" opacity="0.6" />
      <rect x="6" y="14" width="36" height="6" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  spatial: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="40" height="40" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="4" x2="24" y2="44" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  lasting: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 44,40 4,40" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="24" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
    </svg>
  ),
  craft: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" fill="currentColor" />
    </svg>
  ),
}

export default function WhySection() {
  const sectionRef    = useRef(null)
  const miniHeadRef   = useRef(null)
  const headingRef    = useRef(null)
  const textRef       = useRef(null)
  const carouselRef   = useRef(null)
  const swiperRef     = useRef(null)

  const { t, toUpper } = useLang()
  const w = t.why

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop      = window.matchMedia('(min-width: 992px)').matches

    if (!prefersReduced) {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      tl.fromTo(miniHeadRef.current, { y: isDesktop ? 60 : 30, opacity: 0 }, { y: 0, opacity: 1 }, 0)
      tl.fromTo(headingRef.current,  { y: isDesktop ? 80 : 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.08)
      tl.fromTo(textRef.current,     { y: isDesktop ? 80 : 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.16)
      tl.fromTo(carouselRef.current, { y: isDesktop ? 80 : 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.24)
    }

    swiperRef.current = new Swiper(carouselRef.current, {
      modules: [Autoplay],
      slidesPerView: 'auto',
      loop: true,
      speed: 4000,
      navigation: false,
      pagination: false,
      spaceBetween: 0,
      centeredSlides: false,
      autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
    })

    return () => {
      swiperRef.current?.destroy()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ '--swiper-wrapper-transition-timing-function': 'linear' }}
    >
      <div className={`container ${styles.textBlock}`}>
        <div ref={miniHeadRef} className={styles.miniHeading}>
          <span className={styles.dot} />
          <span className={styles.miniLabel}>{toUpper(w.label)}</span>
        </div>

        <h2 ref={headingRef} className={styles.heading}>
          {w.heading}
        </h2>

        <div ref={textRef} className={styles.body}>
          <p>{w.body}</p>
        </div>
      </div>

      <div ref={carouselRef} className={`swiper ${styles.carousel}`}>
        <div className="swiper-wrapper">
          {[...w.pillars, ...w.pillars, ...w.pillars].map((p, i) => (
            <div className={`swiper-slide ${styles.slide}`} key={`${p.icon}-${i}`}>
              <div className={styles.slideIcon}>{icons[p.icon]}</div>
              <span className={styles.slideLabel}>{toUpper(p.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
