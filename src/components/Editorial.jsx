import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Editorial.module.css'

const ongoingProjects = [
  {
    id: '01',
    slug: 'antalya-villa',
    name: 'Tomalar Villa',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2022',
    image: '/projects/antalya-villa/cover.jpg',
  },
  {
    id: '02',
    slug: 'dosemealti-villa',
    name: 'Döşemealtı Villa',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2022',
    image: '/projects/dosemealti-villa/cover.jpg',
  },
  {
    id: '03',
    slug: 'altintas-konut',
    name: 'Altıntaş Konut',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2023',
    image: '/projects/altintas-konut/cover.jpg',
  },
  {
    id: '04',
    slug: 'sila-villa',
    name: 'Sıla Villa',
    location: 'Antalya',
    typeKey: 'residential',
    year: '2023',
    image: '/projects/sila-villa/cover.jpg',
  },
]

export default function Editorial() {
  const navigate = useNavigate()
  const { t, toUpper } = useLang()
  const e = t.editorial
  const types = t.projects.types

  return (
    <section className={`${styles.section} container`} id="about">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.displayWrap}>
          <span className={styles.display}>{e.line1}</span>
          <span className={styles.display}>{e.line2}</span>
          <span className={styles.display}>{e.line3}</span>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.body}>{e.body}</p>
          <div className={styles.actions}>
            <Link to="/contact" className="link-arrow">{toUpper(e.cta1)}</Link>
            <Link to="/projects" className="link-arrow">{toUpper(e.cta2)}</Link>
          </div>
        </div>
      </div>

      {/* Project rows */}
      <div className={styles.list}>
        {ongoingProjects.map((proj) => (
          <div
            className={styles.row}
            key={proj.id}
            onClick={() => navigate(`/projects/${proj.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.rowNum}>{proj.id}</span>
            <span className={styles.rowName}>{proj.name}</span>
            <span className={styles.rowType}>{toUpper(types[proj.typeKey])}</span>
            <span className={styles.rowLocation}>{toUpper(proj.location)}</span>
            <span className={styles.rowYear}>{proj.year}</span>
            <span className={styles.rowStatus} />
            {/* Image revealed on hover */}
            <div className={styles.rowImage}>
              <img src={proj.image} alt={proj.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
