import { useState } from 'react'
import { useLang } from '../contexts/LanguageContext'
import styles from './Contact.module.css'

export default function Contact() {
  const { t, lang, toUpper } = useLang()
  const c = t.contactPage
  const [form, setForm] = useState({ name: '', email: '', project: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xkokjweq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.project }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', project: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>

      {/* ── TITLE ── */}
      <div className={`${styles.pageHero} container`}>
        <h1 className={styles.title}>{c.title}</h1>
        <div className={styles.titleDivider} />
      </div>

      {/* ── BODY ── */}
      <section className={`${styles.body} container`}>
        <div className={styles.bodyGrid}>

          {/* Left: info */}
          <div className={styles.info}>
            <p className={styles.intro}>{c.intro}</p>

            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{toUpper(c.locationLabel)}</span>
                <span className={styles.infoValue}>{c.locationValue}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{toUpper(c.emailLabel)}</span>
                <a href={`mailto:${c.emailValue}`} className={styles.infoLink}>{c.emailValue}</a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{toUpper(c.phoneLabel)}</span>
                <a href={`tel:${c.phoneValue}`} className={styles.infoLink}>{c.phoneValue}</a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{toUpper(c.instagramLabel)}</span>
                <span className={styles.infoValue}>{c.instagramValue}</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{toUpper(c.formName)}</label>
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
              <label className={styles.fieldLabel}>{toUpper(c.formEmail)}</label>
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
              <label className={styles.fieldLabel}>{toUpper(c.formProject)}</label>
              <textarea
                className={styles.textarea}
                name="project"
                value={form.project}
                onChange={handleChange}
                rows={6}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? '...' : c.formSend}
            </button>
            {status === 'success' && (
              <p className={styles.formSuccess}>
                {lang === 'tr' ? 'Mesajınız iletildi.' : 'Message sent successfully.'}
              </p>
            )}
            {status === 'error' && (
              <p className={styles.formError}>
                {lang === 'tr' ? 'Bir hata oluştu, tekrar deneyin.' : 'Something went wrong, please try again.'}
              </p>
            )}
          </form>

        </div>
      </section>

    </div>
  )
}
