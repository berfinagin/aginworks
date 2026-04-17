import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Slow-start ease that accelerates quickly and settles fast — matches jonite.com feel
gsap.registerEase('in-j', progress => Math.pow(progress, 3.5))

// Cubic ease-in-out that approximates Figma spring bounce
gsap.registerEase('figma-spring', t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
)

export { gsap, ScrollTrigger }
