import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import { allProjects } from '../data/projects'
import { ArrowUpRight } from './icons'
import styles from './ProjectsGrid.module.css'

// Show first 7 projects from the data file
const projects = allProjects.slice(0, 7)

export default function ProjectsGrid() {
  const navigate = useNavigate()
  const { t, toUpper } = useLang()
  const p = t.projects

  return (
    <section className={`${styles.section} container`} id="projects">
      <div className="site-grid">
        <div className={styles.headlineWrap}>
          <span className="section-label">{toUpper(p.label)}</span>
          <h3 className={styles.headline}>
            {p.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h3>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.grid}>
        {projects.map(proj => (
          <div
            className={styles.card}
            key={proj.slug}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          >
            <div className={styles.cardImage}>
              <img src={proj.image} alt={proj.name} />
            </div>
            <p className={styles.cardType}>{toUpper(p.types[proj.typeKey])}</p>
            <p className={styles.cardName}>
              {proj.name} <span className={styles.icon}><ArrowUpRight size={11} /></span>
            </p>
          </div>
        ))}

        <div
          className={`${styles.card} ${styles.cardCta}`}
          onClick={() => navigate('/projects')}
          style={{ cursor: 'pointer' }}
        >
          <p>{p.cta}</p>
          <span className={styles.bigArrow}><ArrowUpRight size={40} /></span>
        </div>
      </div>
    </section>
  )
}
