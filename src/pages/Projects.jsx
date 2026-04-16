import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { featured, caseStudies, thumbs } from '../data/projects'
import styles from './Projects.module.css'

function pad(n) { return String(n).padStart(2, '0') }

export default function Projects() {
  const { lang, t, toUpper } = useLang()
  const navigate = useNavigate()
  const p = t.projectsPage
  const types = {
    ...t.projects.types,
    ...t.projectsPage.types,
  }

  // ── Carousel state ──
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

  // ── Filter state ──
  const [openFilter,    setOpenFilter]    = useState(null) // 'type' | 'location' | 'year' | null
  const [typeFilter,    setTypeFilter]    = useState(null)
  const [locationFilter,setLocationFilter]= useState(null)
  const [yearFilter,    setYearFilter]    = useState(null)
  const [showSearch,    setShowSearch]    = useState(false)
  const [searchQuery,   setSearchQuery]   = useState('')
  const filterRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function onOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(null)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  // Filter values
  const allFilterable = [...featured, ...caseStudies, ...thumbs]
  const uniqueTypes     = Object.keys(types)
  const uniqueLocations = [...new Set(allFilterable.map(pr => pr.location).filter(Boolean))]
  const uniqueYears     = [...new Set(allFilterable.map(pr => pr.year).filter(Boolean))].sort((a, b) => b - a)

  function applyFilters(list) {
    return list.filter(pr => {
      if (typeFilter     && pr.typeKey  !== typeFilter)     return false
      if (locationFilter && pr.location !== locationFilter)  return false
      if (yearFilter     && pr.year     !== yearFilter)      return false
      if (searchQuery && !pr.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }

  const filteredCase   = applyFilters(caseStudies)
  const filteredThumbs = applyFilters(thumbs)
  const filteredCount  = filteredCase.length + filteredThumbs.length
  const hasFilter      = typeFilter || locationFilter || yearFilter || searchQuery

  function clearFilters() {
    setTypeFilter(null)
    setLocationFilter(null)
    setYearFilter(null)
    setSearchQuery('')
    setShowSearch(false)
    setOpenFilter(null)
  }

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
            <span className={styles.featuredLabel}>{toUpper(p.featured)}</span>
            <div className={styles.navBtns}>
              <button className={styles.navBtn} onClick={() => changeSlide(-1)}>←</button>
              <button className={styles.navBtn} onClick={() => changeSlide(1)}>→</button>
            </div>
          </div>

          {/* Spacer — right 5 cols */}
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
            <span className={styles.catPill}>{toUpper(types[featured[current].typeKey])}</span>
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
            <span className={styles.catPill}>{toUpper(types[featured[nextIdx].typeKey])}</span>
          </div>

          {/* Info — left 7 cols */}
          <div className={styles.featuredInfo}>
            <p className={styles.productType}>{toUpper(types[slide.typeKey])}</p>
            <h2 className={styles.featuredTitle}>{slide.name}</h2>
            <p className={styles.featuredDesc}>{lang === 'tr' && slide.desc_tr ? slide.desc_tr : slide.desc}</p>
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
        <div className={styles.filterBar} ref={filterRef}>
          <div className={styles.filterLeft}>
            <span className={styles.filterLabel}>{toUpper(p.filterLabel)}</span>
            <div className={styles.filterDropdowns}>

              {/* Type filter */}
              <div className={styles.filterBtnWrap}>
                <button
                  className={`${styles.filterBtn} ${typeFilter ? styles.filterBtnActive : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'type' ? null : 'type')}
                >
                  {typeFilter ? toUpper(types[typeFilter]) : toUpper(p.filterType)} <span>▾</span>
                </button>
                {openFilter === 'type' && (
                  <div className={styles.filterDropdown}>
                    {typeFilter && (
                      <button className={styles.dropdownOption} onClick={() => { setTypeFilter(null); setOpenFilter(null) }}>
                        {lang === 'tr' ? 'Tümü' : 'All types'}
                      </button>
                    )}
                    {uniqueTypes.map(type => (
                      <button
                        key={type}
                        className={`${styles.dropdownOption} ${typeFilter === type ? styles.dropdownOptionActive : ''}`}
                        onClick={() => { setTypeFilter(type); setOpenFilter(null) }}
                      >
                        {toUpper(types[type] || type)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location filter */}
              <div className={styles.filterBtnWrap}>
                <button
                  className={`${styles.filterBtn} ${locationFilter ? styles.filterBtnActive : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'location' ? null : 'location')}
                >
                  {locationFilter || p.filterLocation} <span>▾</span>
                </button>
                {openFilter === 'location' && (
                  <div className={styles.filterDropdown}>
                    {locationFilter && (
                      <button className={styles.dropdownOption} onClick={() => { setLocationFilter(null); setOpenFilter(null) }}>
                        {lang === 'tr' ? 'Tümü' : 'All cities'}
                      </button>
                    )}
                    {uniqueLocations.map(loc => (
                      <button
                        key={loc}
                        className={`${styles.dropdownOption} ${locationFilter === loc ? styles.dropdownOptionActive : ''}`}
                        onClick={() => { setLocationFilter(loc); setOpenFilter(null) }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year filter */}
              <div className={styles.filterBtnWrap}>
                <button
                  className={`${styles.filterBtn} ${yearFilter ? styles.filterBtnActive : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'year' ? null : 'year')}
                >
                  {yearFilter || p.filterYear} <span>▾</span>
                </button>
                {openFilter === 'year' && (
                  <div className={styles.filterDropdown}>
                    {yearFilter && (
                      <button className={styles.dropdownOption} onClick={() => { setYearFilter(null); setOpenFilter(null) }}>
                        {lang === 'tr' ? 'Tümü' : 'All years'}
                      </button>
                    )}
                    {uniqueYears.map(year => (
                      <button
                        key={year}
                        className={`${styles.dropdownOption} ${yearFilter === year ? styles.dropdownOptionActive : ''}`}
                        onClick={() => { setYearFilter(year); setOpenFilter(null) }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear all */}
              {hasFilter && (
                <button className={styles.clearBtn} onClick={clearFilters}>
                  {lang === 'tr' ? 'Temizle' : 'Clear'} ×
                </button>
              )}

            </div>
          </div>

          <div className={styles.filterCenter}>
            {filteredCount} {p.allProjects}
          </div>

          <div className={styles.filterRight}>
            {showSearch ? (
              <div className={styles.searchBar}>
                <input
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={p.search + '...'}
                  autoFocus
                />
                <button
                  className={styles.searchClose}
                  onClick={() => { setShowSearch(false); setSearchQuery('') }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button className={styles.searchBtn} onClick={() => setShowSearch(true)}>
                <span>⌕</span> {p.search}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CASE STUDY ENTRIES ── */}
      <div className={styles.caseEntries}>
        {filteredCase.map(cs => (
          <div className={styles.caseEntry} key={cs.id} onClick={() => navigate(`/projects/${cs.slug}`)} style={{ cursor: 'pointer' }}>
            <div className={styles.caseImages}>
              <div className={styles.caseImgPrimary}>
                <img src={cs.image} alt={cs.name} />
                <span className={styles.catPill}>{toUpper(types[cs.typeKey] || cs.typeKey)}</span>
              </div>
            </div>
            <div className={styles.caseInfo}>
              <p className={styles.caseType}>{toUpper(types[cs.typeKey] || cs.typeKey)}</p>
              <h3 className={styles.caseTitle}>{cs.name}</h3>
              <p className={styles.caseMeta}>{cs.location} · {cs.year}</p>
              <p className={styles.caseDesc}>{lang === 'tr' && cs.desc_tr ? cs.desc_tr : cs.desc}</p>
              <button className={styles.btnView} style={{ marginTop: '16px' }} onClick={() => navigate(`/projects/${cs.slug}`)}>
                {p.viewProject}
                <span className={styles.btnArrow}>↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── THUMBNAIL GRID ── */}
      <div className={`${styles.thumbGrid} container`}>
        {filteredThumbs.map((th, i) => (
          <div className={styles.thumbCard} key={i} onClick={() => navigate(`/projects/${th.slug}`)}>
            <div className={styles.thumbImg}>
              <img src={th.image} alt={th.name} />
            </div>
            <div className={styles.thumbMeta}>
              <p className={styles.thumbType}>{toUpper(types[th.typeKey])}</p>
              <p className={styles.thumbTitle}>
                {th.name} <span className={styles.arrowLink}>↗</span>
              </p>
              <p className={styles.thumbLoc}>{th.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── NO RESULTS ── */}
      {filteredCase.length === 0 && filteredThumbs.length === 0 && hasFilter && (
        <div className={`${styles.noResults} container`}>
          <p>{lang === 'tr' ? 'Sonuç bulunamadı.' : 'No projects match your filters.'}</p>
          <button className={styles.clearBtn} onClick={clearFilters}>
            {lang === 'tr' ? 'Filtreleri temizle' : 'Clear filters'}
          </button>
        </div>
      )}

    </div>
  )
}
