import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../contexts/LanguageContext'
import styles from './Projects.module.css'

const featured = [
  {
    typeKey: 'residential',
    name: 'Villa Solaris, Ankara',
    desc: 'Hidden within a quiet residential enclave in Ankara, this private residence exemplifies modern Anatolian architecture at its most refined — balancing privacy, light, and natural ventilation.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80',
  },
  {
    typeKey: 'commercial',
    name: 'The Concrete Frame, İzmir',
    desc: 'A mid-scale commercial development at the intersection of material honesty and programmatic flexibility. Raw concrete surfaces are softened by carefully controlled daylighting.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
  },
  {
    typeKey: 'cultural',
    name: 'Pavilion Zero, İstanbul',
    desc: 'A landmark cultural institution designed to celebrate the arts through architecture. The building draws on traditional masonry while embracing contemporary spatial logic.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  },
  {
    typeKey: 'urban',
    name: 'Courtyard House, Ankara',
    desc: 'Located in a rapidly transforming urban district, this courtyard house embodies the future of dense city living — a bold statement of material quality and spatial refinement.',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=80',
  },
]

const caseStudies = [
  {
    id: 1,
    typeKey: 'residential',
    name: 'Stone Garden',
    location: 'Ankara',
    year: '2023',
    desc: 'A landscape-integrated residence that blurs the boundary between built form and terrain. Layered stone walls emerge from the hillside, framing views and channelling breezes.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
  {
    id: 2,
    typeKey: 'institutional',
    name: 'Archive Building',
    location: 'Ankara',
    year: '2022',
    desc: "Designed for permanence. The archive's monolithic concrete volume is articulated through a grid of deep-set openings that filter light while preserving the integrity of the collection.",
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
  },
]

const thumbs = [
  { typeKey: 'residential',   name: 'Tower Residence',  location: 'İstanbul', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80' },
  { typeKey: 'landscape',     name: 'Garden Pavilion',  location: 'Ankara',   image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80' },
  { typeKey: 'commercial',    name: 'Market Hall',      location: 'İzmir',    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80' },
  { typeKey: 'cultural',      name: 'Community Center', location: 'Bursa',    image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=700&q=80' },
  { typeKey: 'residential',   name: 'Hillside House',   location: 'Ankara',   image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80' },
  { typeKey: 'urban',         name: 'Urban Infill',     location: 'İstanbul', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80' },
]

function pad(n) { return String(n).padStart(2, '0') }

export default function Projects() {
  const { lang, t } = useLang()
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
            <a href="#" className={styles.btnView}>
              {p.viewProject}
              <span className={styles.btnArrow}>↗</span>
            </a>
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
          <div className={styles.caseEntry} key={cs.id}>
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
              <a href="#" className={styles.btnView} style={{ marginTop: '16px' }}>
                {p.viewProject}
                <span className={styles.btnArrow}>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── THUMBNAIL GRID ── */}
      <div className={`${styles.thumbGrid} container`}>
        {thumbs.map((th, i) => (
          <div className={styles.thumbCard} key={i}>
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
