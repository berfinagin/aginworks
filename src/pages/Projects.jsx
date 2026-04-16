import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { featured, caseStudies, thumbs } from '../data/projects'
import styles from './Projects.module.css'

function pad(n) { return String(n).padStart(2, '0') }

export default function Projects() {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const p = t.projectsPage
  const types = { ...t.projects.types, institutional: lang === 'tr' ? 'Kurumsal' : 'Institutional' }

  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)
  const total = featured.length

  function changeSlide(d) {
    setDir(d)
    setCurrent(i => (i + d + total) % total)
  }

  const nextIdx = (current + 1) % total
  const slide   = featured[current]

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ? '25%' : '-25%', opacity: 0 }),
    center:       ({ x: 0, opacity: 1 }),
    exit:   (d) => ({ x: d > 0 ? '-12%' : '12%', opacity: 0 }),
  }
  const transition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] }

  return (
    <div className={styles.page}>

      {/* ── PAGE TITLE ── */}
      <div className={`${styles.pageHero} container`}>
        <h1 className={styles.title}>{p.title}</h1>
        <div className={styles.titleDivider} />
      </div>

      {/* ── FEATURED ── */}
      <section className={`${styles.featuredSection} container`}>
        <div className={styles.featuredGrid}>

          {/* Controls row — left 7 cols */}
          <div className={styles.controlRow}>
            <span className={styles.featuredLabel}>{p.featured}</span>
            <div className={styles.navBtns}>
              <button className={styles.navBtn} onClick={() => changeSlide(-1)}>←</button>
              <button className={styles.navBtn} onClick={() => changeSlide(1)}>→</button>
            </div>
          </div>

          {/* Spacer — right 5 cols (keeps divider aligned) */}
          <div className={styles.controlSpacer} />

          {/* ── LEFT IMAGE PANEL (7 cols) ── */}
          <div className={styles.imgPanelLeft}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={current}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                src={featured[current].image}
                alt={featured[current].name}
                className={styles.slideImg}
              />
            </AnimatePresence>
            <span className={styles.catPill}>{types[featured[current].typeKey]}</span>
          </div>

          {/* ── RIGHT IMAGE PANEL (5 cols) ── */}
          <div className={styles.imgPanelRight}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={nextIdx}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                src={featured[nextIdx].image}
                alt={featured[nextIdx].name}
                className={styles.slideImg}
              />
            </AnimatePresence>
            <span className={styles.catPill}>{types[featured[nextIdx].typeKey]}</span>
          </div>

          {/* Info — left 7 cols */}
          <div className={styles.featuredInfo}>
            <p className={styles.productType}>{types[slide.typeKey]}</p>
            <h2 className={styles.featuredTitle}>{slide.name}</h2>
            <p className={styles.featuredDesc}>{slide.desc}</p>
            <button className={styles.btnView} onClick={() => navigate(`/projects/${slide.slug}`)}>
              {p.viewProject}
              <span className={styles.btnArrow}>↗</span>
            </button>
          </div>

          {/* Counter — right 5 cols */}
          <div className={styles.counterCol}>
            <div className={styles.counter}>
              <span className={styles.counterCurrent}>{pad(current + 1)}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{pad(total)}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className={styles.filterBarWrap}>
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <span className={styles.filterLabel}>{p.filterLabel}</span>
            <div className={styles.filterDropdowns}>
              <button className={styles.filterBtn}>{p.filterType} <span>▾</span></button>
              <button className={styles.filterBtn}>{p.filterLocation} <span>▾</span></button>
              <button className={styles.filterBtn}>{p.filterYear} <span>▾</span></button>
            </div>
          </div>
          <div className={styles.filterCenter}>
            {thumbs.length + caseStudies.length + featured.length} {p.allProjects}
          </div>
          <div className={styles.filterRight}>
            <button className={styles.searchBtn}>
              <span>⌕</span> {p.search}
            </button>
          </div>
        </div>
      </div>

      {/* ── CASE STUDY ENTRIES ── */}
      <div className={styles.caseEntries}>
        {caseStudies.map(cs => (
          <div className={styles.caseEntry} key={cs.id} onClick={() => navigate(`/projects/${cs.slug}`)} style={{ cursor: 'pointer' }}>
            <div className={styles.caseImages}>
              <div className={styles.caseImgPrimary}>
                <img src={cs.image} alt={cs.name} />
                <span className={styles.catPill}>{types[cs.typeKey] || cs.typeKey}</span>
              </div>
            </div>
            <div className={styles.caseInfo}>
              <p className={styles.caseType}>{types[cs.typeKey] || cs.typeKey}</p>
              <h3 className={styles.caseTitle}>{cs.name}</h3>
              <p className={styles.caseMeta}>{cs.location} · {cs.year}</p>
              <p className={styles.caseDesc}>{cs.desc}</p>
              <button className={styles.btnView} style={{ marginTop: '16px' }}>
                {p.viewProject}
                <span className={styles.btnArrow}>↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── THUMBNAIL GRID ── */}
      <div className={`${styles.thumbGrid} container`}>
        {thumbs.map((th, i) => (
          <div className={styles.thumbCard} key={i} onClick={() => navigate(`/projects/${th.slug}`)} style={{ cursor: 'pointer' }}>
            <div className={styles.thumbImg}>
              <img src={th.image} alt={th.name} />
            </div>
            <div className={styles.thumbMeta}>
              <p className={styles.thumbType}>{types[th.typeKey]}</p>
              <p className={styles.thumbTitle}>
                {th.name} <span className={styles.arrowLink}>↗</span>
              </p>
              <p className={styles.thumbLoc}>{th.location}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
