import { useParams, Link, useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { allProjects } from '../data/projects'
import { ArrowLeft, ArrowRight } from '../components/icons'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lang, toUpper } = useLang()
  const navigate = useNavigate()

  const idx     = allProjects.findIndex(p => p.slug === slug)
  const project = allProjects[idx]

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found.</p>
        <Link to="/projects"><ArrowLeft size={14} /> Back to projects</Link>
      </div>
    )
  }

  const types = {
    ...t.projects.types,
    institutional: lang === 'tr' ? 'Kurumsal' : 'Institutional',
  }

  const prevProject = allProjects[(idx - 1 + allProjects.length) % allProjects.length]
  const nextProject = allProjects[(idx + 1) % allProjects.length]

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <img src={project.image} alt={project.name} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroContent} container`}>
          <span className={styles.heroType}>{toUpper(types[project.typeKey])}</span>
          <h1 className={styles.heroTitle}>{project.name}</h1>
        </div>
      </div>

      {/* ── INFO ── */}
      <section className={`${styles.info} container`}>
        <div className={styles.infoGrid}>

          {/* Meta sidebar */}
          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                {toUpper(lang === 'tr' ? 'Tür' : 'Type')}
              </span>
              <span className={styles.metaValue}>{types[project.typeKey]}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                {toUpper(lang === 'tr' ? 'Konum' : 'Location')}
              </span>
              <span className={styles.metaValue}>{project.location}</span>
            </div>
            {project.year && (
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>
                  {toUpper(lang === 'tr' ? 'Yıl' : 'Year')}
                </span>
                <span className={styles.metaValue}>{project.year}</span>
              </div>
            )}
            <Link to="/projects" className={styles.backLink}>
              <ArrowLeft size={14} /> {lang === 'tr' ? 'Tüm projeler' : 'All projects'}
            </Link>
          </div>

          {/* Description */}
          <div className={styles.descBlock}>
            <p className={styles.descLead}>{lang === 'tr' && project.desc_tr ? project.desc_tr : project.desc}</p>
            {(() => {
              const body = lang === 'tr' && project.longDesc_tr ? project.longDesc_tr : project.longDesc
              return body && body.split('\n\n').map((para, i) => (
                <p className={styles.descBody} key={i}>{para}</p>
              ))
            })()}
          </div>

        </div>
      </section>

      {/* ── IMAGE GALLERY ── */}
      {project.images && project.images.length > 0 && (
        <section className={`${styles.gallery} container`}>
          <div className={styles.galleryGrid}>
            {project.images.map((src, i) => (
              <div
                className={`${styles.galleryItem} ${i === 0 ? styles.galleryItemWide : ''}`}
                key={i}
              >
                <img src={src} alt={`${project.name} ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── NEXT / PREV ── */}
      <section className={`${styles.nav} container`}>
        <button className={styles.navItem} onClick={() => navigate(`/projects/${prevProject.slug}`)}>
          <span className={styles.navDir}>
            <ArrowLeft size={14} /> {lang === 'tr' ? 'Önceki' : 'Previous'}
          </span>
          <span className={styles.navName}>{prevProject.name}</span>
        </button>
        <button className={styles.navItem} onClick={() => navigate(`/projects/${nextProject.slug}`)}>
          <span className={styles.navDir}>
            {lang === 'tr' ? 'Sonraki' : 'Next'} <ArrowRight size={14} />
          </span>
          <span className={styles.navName}>{nextProject.name}</span>
        </button>
      </section>

    </div>
  )
}
