import Hero from '../components/Hero'
import ClientsMarquee from '../components/ClientsMarquee'
import Editorial from '../components/Editorial'
import ProjectsGrid from '../components/ProjectsGrid'
import AboutStrip from '../components/AboutStrip'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsMarquee />
      <Editorial />
      <ProjectsGrid />
      <AboutStrip />
      <Contact />
    </main>
  )
}
