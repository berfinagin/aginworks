import Hero from '../components/Hero'
import ClientsMarquee from '../components/ClientsMarquee'
import MadeToMatter from '../components/MadeToMatter'
import ProjectsGrid from '../components/ProjectsGrid'
import WhySection from '../components/WhySection'
import MaterialsSection from '../components/MaterialsSection'
import AboutStrip from '../components/AboutStrip'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsMarquee />
      <MadeToMatter />
      <ProjectsGrid />
      <WhySection />
      <MaterialsSection />
      <Reveal><AboutStrip /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  )
}
