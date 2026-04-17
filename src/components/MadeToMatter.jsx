import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import styles from './MadeToMatter.module.css'

const IMAGES = [
  { src: '/projects/altinova-antalya/cover.jpg',  alt: 'Altınova Residence, Antalya' },
  { src: '/projects/altintas-antalya/cover.jpg',  alt: 'Altıntaş Konut, Antalya' },
  { src: '/projects/dosemealti-villa/cover.jpg',  alt: 'Döşemealtı Villa' },
  { src: '/projects/altinova-antalya/01.jpg',     alt: 'Architectural detail' },
]

export default function MadeToMatter() {
  const sectionRef       = useRef(null)
  const imagesRef        = useRef(null)
  const textContainerRef = useRef(null)
  const imgRefs          = useRef([])
  const wordRefs         = useRef([])
  const bodyRef          = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section       = sectionRef.current
    const imagesRow     = imagesRef.current
    const textContainer = textContainerRef.current
    const imgs          = imgRefs.current.filter(Boolean)
    const words         = wordRefs.current.filter(Boolean)
    const bodyText      = bodyRef.current

    const isDesktop = window.matchMedia('(min-width: 992px)').matches
    const isTablet  = window.matchMedia('(max-width: 991px) and (min-width: 768px)').matches

    // ── Set scattered initial state ──────────────────────────────────────
    // Elements start at their "parallax" offsets (complex/scattered),
    // then animate into their natural grid positions (clean/ordered).
    if (isDesktop) {
      gsap.set(imgs[0],   { y: `${-265 / 16}rem` })
      gsap.set(imgs[1],   { y: `${71 / 16}rem`   })
      gsap.set(imgs[2],   { y: `${485 / 16}rem`  })
      gsap.set(imgs[3],   { y: `${-67 / 16}rem`  })
      gsap.set(words[0],  { y: `${-327 / 16}rem` })
      gsap.set(words[2],  { y: `${-575 / 16}rem` })
      gsap.set(bodyText,  { y: '3.75rem'          })
      gsap.set(imagesRow,     { paddingTop:    '9rem' })
      gsap.set(textContainer, { paddingBottom: '4rem' })
    } else {
      gsap.set(imgs[0],   { y: `${-207 / 16}rem` })
      gsap.set(imgs[1],   { y: `${-63 / 16}rem`  })
      gsap.set(imgs[3],   { y: '-6.3125rem'       })
      gsap.set(words[0],  { y: `${-205 / 16}rem` })
      gsap.set(words[1],  { x: `${29 / 16}rem`, y: '-5rem' })
      if (words[2]) {
        gsap.set(words[2], {
          x: isTablet ? '1.25rem'    : `${-2 / 16}rem`,
          y: isTablet ? '-38.75rem'  : `${-401 / 16}rem`,
        })
      }
      gsap.set(bodyText,  { yPercent: 100, y: `${7 / 16}rem` })
      gsap.set(imagesRow,     { paddingTop:    `${263 / 16}rem` })
      gsap.set(textContainer, { paddingBottom: '4rem'           })
    }

    const ctx = gsap.context(() => {
      // ── Step 1: reveal scattered state when section enters viewport ──
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          gsap.to(section, { opacity: 1, duration: 1.0, ease: 'power2.inOut' })
        },
      })

      // ── Step 2: resolve to clean layout on further scroll ────────────
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'figma-spring', duration: 1.8 } })
          tl.to(
            [...imgs, ...words, bodyText].filter(Boolean),
            { y: 0, x: 0, yPercent: 0, stagger: 0.04 },
            0
          )
          tl.to(imagesRow,     { paddingTop: 0    }, 0)
          tl.to(textContainer, { paddingBottom: 0 }, 0)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Images Row */}
      <div ref={imagesRef} className={styles.images}>

        <div ref={el => { imgRefs.current[0] = el }} className={`${styles.imgWrap} ${styles.imgWrap1}`}>
          <img src={IMAGES[0].src} alt={IMAGES[0].alt} />
        </div>

        <div ref={el => { imgRefs.current[1] = el }} className={`${styles.imgWrap} ${styles.imgWrap2}`}>
          <img src={IMAGES[1].src} alt={IMAGES[1].alt} />
        </div>

        <div ref={el => { imgRefs.current[2] = el }} className={`${styles.imgWrap} ${styles.imgWrap3}`}>
          <img src={IMAGES[2].src} alt={IMAGES[2].alt} />
        </div>

        <div ref={el => { imgRefs.current[3] = el }} className={`${styles.imgWrap} ${styles.imgWrap4}`}>
          <img src={IMAGES[3].src} alt={IMAGES[3].alt} />
        </div>

      </div>

      {/* Text Row */}
      <div ref={textContainerRef} className={styles.textContainer}>

        <h2 className={styles.heading}>
          <span ref={el => { wordRefs.current[0] = el }} className={styles.word}>Built</span>
          <span ref={el => { wordRefs.current[1] = el }} className={styles.word}>to</span>
          <span ref={el => { wordRefs.current[2] = el }} className={styles.word}>last</span>
        </h2>

        <p ref={bodyRef} className={styles.body}>
          Architecture that shapes living — precision-built from the ground up.
        </p>

      </div>

    </section>
  )
}
