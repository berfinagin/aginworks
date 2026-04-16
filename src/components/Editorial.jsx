import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLang } from '../contexts/LanguageContext'
import styles from './Editorial.module.css'

const ongoingProjects = [
  {
    id: '01',
    slug: 'villa-solaris',
    name: 'Villa Solaris',
    location: 'Ankara',
    typeKey: 'residential',
    year: '2024 —',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    id: '02',
    slug: 'pavilion-zero',
    name: 'Pavilion Zero',
    location: 'İstanbul',
    typeKey: 'cultural',
    year: '2024 —',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: '03',
    slug: 'the-concrete-frame',
    name: 'The Concrete Frame',
    location: 'İzmir',
    typeKey: 'commercial',
    year: '2023 —',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80',
  },
  {
    id: '04',
    slug: 'courtyard-house',
    name: 'Courtyard House',
    location: 'Ankara',
    typeKey: 'residential',
    year: '2023 —',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  },
]

export default function Editorial() {
  const navigate = useNavigate()
  const { t } = useLang()
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
            <Link to="/contact" className="link-arrow">{e.cta1}</Link>
            <Link to="/projects" className="link-arrow">{e.cta2}</Link>
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
            <span className={styles.rowType}>{types[proj.typeKey]}</span>
            <span className={styles.rowLocation}>{proj.location}</span>
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
