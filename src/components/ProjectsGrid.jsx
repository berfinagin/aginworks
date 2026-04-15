import { useLang } from '../contexts/LanguageContext'
import styles from './ProjectsGrid.module.css'

const projects = [
  { id: 1, typeKey: 'residential', name: 'Villa Solaris',       image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80' },
  { id: 2, typeKey: 'cultural',    name: 'Pavilion Zero',        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { id: 3, typeKey: 'commercial',  name: 'The Concrete Frame',   image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=600&q=80' },
  { id: 4, typeKey: 'urban',       name: 'Courtyard House',      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80' },
  { id: 5, typeKey: 'landscape',   name: 'Stone Garden',         image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 6, typeKey: 'institutional',name: 'Archive Building',    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
  { id: 7, typeKey: 'residential', name: 'Tower Residence',      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
]

export default function ProjectsGrid() {
  const { t } = useLang()
  const p = t.projects

  return (
    <section className={`${styles.section} container`} id="projects">
      <div className="site-grid">
        <div className={styles.headlineWrap}>
          <span className="section-label">{p.label}</span>
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
          <div className={styles.card} key={proj.id}>
            <div className={styles.cardImage}>
              <img src={proj.image} alt={proj.name} />
            </div>
            <p className={styles.cardType}>{p.types[proj.typeKey]}</p>
            <p className={styles.cardName}>
              {proj.name} <span className={styles.icon}>↗</span>
            </p>
          </div>
        ))}

        <div className={`${styles.card} ${styles.cardCta}`}>
          <p>{p.cta}</p>
          <span className={styles.bigArrow}>↗</span>
        </div>
      </div>
    </section>
  )
}
