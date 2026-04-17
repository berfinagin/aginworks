import Hero from '../components/Hero'
import ClientsMarquee from '../components/ClientsMarquee'
import MadeToMatter from '../components/MadeToMatter'
import Editorial from '../components/Editorial'
import WhySection from '../components/WhySection'
import AboutStrip from '../components/AboutStrip'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsMarquee />
      <MadeToMatter />
      <Reveal><Editorial /></Reveal>
      <Reveal><WhySection /></Reveal>
      <Reveal><AboutStrip /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  )
}
