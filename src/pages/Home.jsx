import Hero from '../components/Hero'
import Editorial from '../components/Editorial'
import WhySection from '../components/WhySection'
import ProjectsGrid from '../components/ProjectsGrid'
import AboutStrip from '../components/AboutStrip'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal><Editorial /></Reveal>
      <Reveal><ProjectsGrid /></Reveal>
      <Reveal><WhySection /></Reveal>
      <Reveal><AboutStrip /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  )
}
