import { useState, useEffect, useRef } from 'react'
import { useLang } from '../contexts/LanguageContext'
import { gsap, ScrollTrigger } from '../utils/gsapSetup'
import styles from './MaterialsSection.module.css'

const MATERIALS = [
  { id: 'pearl-mist',   color: '#D6D2CA', image: '/projects/dosemealti-villa/cover.jpg',    texture: '/projects/dosemealti-villa/03.jpg'    },
  { id: 'warm-stone',   color: '#C8BFA8', image: '/projects/altinova-antalya/cover.jpg',    texture: '/projects/altinova-antalya/02.jpg'    },
  { id: 'raw-concrete', color: '#B2AEA8', image: '/projects/masadagi-antalya/cover.jpg',    texture: '/projects/masadagi-antalya/02.jpg'    },
  { id: 'travertine',   color: '#E2DAC6', image: '/projects/dosemealti-icmimari/cover.jpg', texture: '/projects/dosemealti-icmimari/02.jpg' },
  { id: 'sandy-beige',  color: '#C8BC96', image: '/projects/altintas-antalya/cover.jpg',    texture: '/projects/altintas-antalya/02.jpg'    },
  { id: 'cool-slate',   color: '#8E8C88', image: '/projects/karaburun-villa/cover.jpg',     texture: '/projects/karaburun-villa/02.jpg'     },
  { id: 'charcoal',     color: '#5C5A56', image: '/projects/masadagi-antalya/01.jpg',       texture: '/projects/masadagi-antalya/03.jpg'    },
  { id: 'dark-basalt',  color: '#3E3C38', image: '/projects/altinova-antalya/01.jpg',       texture: '/projects/altinova-antalya/03.jpg'    },
  { id: 'timber-oak',   color: '#9A7B52', image: '/projects/dosemealti-villa/01.jpg',       texture: '/projects/dosemealti-villa/02.jpg'    },
  { id: 'velvet-black', color: '#1E1D1B', image: '/projects/masadagi-icmimari/cover.jpg',   texture: '/projects/masadagi-icmimari/02.jpg'   },
]

export default function MaterialsSection() {
  const [selected, setSelected]   = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sectionRef   = useRef(null)
  const headRef      = useRef(null)
  const textRef      = useRef(null)
  const borderRef    = useRef(null)
  const contentRef   = useRef(null)
  const imageAreaRef = useRef(null)
  const parallaxRef  = useRef(null)

  const { t, toUpper } = useLang()
  const m   = t.materials
  const mat = MATERIALS[selected]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // ── Entrance ────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out', duration: 1.0 },
      })
      tl.fromTo(headRef.current,    { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 0)
      tl.fromTo(textRef.current,    { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.08)
      tl.fromTo(borderRef.current,  { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 0.14)
      tl.fromTo(contentRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, 0.20)

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        once: true,
        onEnter: () => tl.play(),
      })

      // ── Parallax ─────────────────────────────────────────────────────────
      gsap.fromTo(parallaxRef.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: imageAreaRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    /* Section IS the grid — same pattern as Jonite */
    <section
      ref={sectionRef}
      className={`${styles.section} site-grid container`}
    >

      {/* ── Mini heading + heading ──────────────────────────── */}
      <div ref={headRef} className={styles.colHeading}>
        <h2 className={styles.miniHeading}>
          <span className={styles.dot} />
          <span className={styles.miniLabel}>{toUpper(m.label)}</span>
        </h2>
        <h3 className={styles.heading}>{m.heading}</h3>
      </div>

      {/* ── Body text ───────────────────────────────────────── */}
      <p ref={textRef} className={styles.colText}>{m.body}</p>

      {/* ── Divider ─────────────────────────────────────────── */}
      <hr ref={borderRef} className={styles.divider} />

      {/* ── Content grid (image + desktop panel) ────────────── */}
      <div ref={contentRef} className={`site-grid ${styles.contentGrid}`}>

        {/* Main image area — all layers stacked */}
        <div ref={imageAreaRef} className={styles.mainImageArea}>
          <div ref={parallaxRef} className={styles.parallaxStack}>
            {MATERIALS.map((material, i) => (
              <div
                key={material.id}
                className={`${styles.layer} ${selected === i ? styles.layerActive : ''}`}
              >
                <img
                  src={material.image}
                  alt={m.swatches[material.id]}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop panel — overlaid bottom-right via grid-row:1 */}
        <div className={styles.desktopPanel}>

          {/* Swatch row: label | swatch grid */}
          <div className={styles.swatchListPanel}>
            <span className={styles.swatchLabel}>{toUpper(m.label)}</span>
            <ul className={styles.swatchGrid}>
              {MATERIALS.map((material, i) => (
                <li
                  key={material.id}
                  className={`${styles.swatchItem} ${selected === i ? styles.swatchActive : ''}`}
                >
                  <button
                    className={styles.swatchBtn}
                    style={{ background: material.color }}
                    onClick={() => setSelected(i)}
                    aria-label={m.swatches[material.id]}
                    title={m.swatches[material.id]}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Texture strip + name badge */}
          <div className={styles.colourStrip}>
            {MATERIALS.map((material, i) => (
              <div
                key={material.id}
                className={`${styles.stripLayer} ${selected === i ? styles.stripLayerActive : ''}`}
              >
                <img src={material.texture} alt={m.swatches[material.id]} />
              </div>
            ))}
            <span className={styles.nameBadge}>{m.swatches[mat.id]}</span>
          </div>

        </div>
      </div>

      {/* ── Mobile panel (accordion) ─────────────────────────── */}
      <div className={styles.mobilePanel}>
        <button
          className={styles.mobileToggleBtn}
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
        >
          <span>{toUpper(m.label)}</span>
          <span className={styles.mobileToggleIcon}>{mobileOpen ? '−' : '+'}</span>
        </button>

        <div className={`${styles.mobileExpanded} ${mobileOpen ? styles.mobileExpandedOpen : ''}`}>
          <ul className={styles.mobileSwatchGrid}>
            {MATERIALS.map((material, i) => (
              <li
                key={material.id}
                className={`${styles.swatchItem} ${selected === i ? styles.swatchActive : ''}`}
              >
                <button
                  className={styles.swatchBtn}
                  style={{ background: material.color }}
                  onClick={() => setSelected(i)}
                  aria-label={m.swatches[material.id]}
                />
              </li>
            ))}
          </ul>

          <div className={styles.mobileColourStrip}>
            {MATERIALS.map((material, i) => (
              <div
                key={material.id}
                className={`${styles.stripLayer} ${selected === i ? styles.stripLayerActive : ''}`}
              >
                <img src={material.texture} alt={m.swatches[material.id]} />
              </div>
            ))}
            <span className={styles.nameBadge}>{m.swatches[mat.id]}</span>
          </div>
        </div>
      </div>

    </section>
  )
}
