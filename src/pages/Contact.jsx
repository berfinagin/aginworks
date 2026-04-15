import { useState } from 'react'
import { useLang } from '../contexts/LanguageContext'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useLang()
  const c = t.contactPage
  const [form, setForm] = useState({ name: '', email: '', project: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:hello@agin.works?subject=Project Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.project)}`
    window.location.href = mailto
  }

  return (
    <div className={styles.page}>

      {/* ── TITLE ── */}
      <div className={`${styles.pageHero} container`}>
        <h1 className={styles.title}>{c.title}</h1>
      </div>

      {/* ── BODY ── */}
      <section className={`${styles.body} container`}>
        <div className={styles.bodyGrid}>

          {/* Left: info */}
          <div className={styles.info}>
            <p className={styles.intro}>{c.intro}</p>

            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{c.locationLabel}</span>
                <span className={styles.infoValue}>{c.locationValue}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{c.emailLabel}</span>
                <a href={`mailto:${c.emailValue}`} className={styles.infoLink}>{c.emailValue}</a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{c.phoneLabel}</span>
                <a href={`tel:${c.phoneValue}`} className={styles.infoLink}>{c.phoneValue}</a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{c.instagramLabel}</span>
                <span className={styles.infoValue}>{c.instagramValue}</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{c.formName}</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{c.formEmail}</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{c.formProject}</label>
              <textarea
                className={styles.textarea}
                name="project"
                value={form.project}
                onChange={handleChange}
                rows={6}
              />
            </div>
            <button type="submit" className={styles.submit}>{c.formSend}</button>
          </form>

        </div>
      </section>

    </div>
  )
}
