import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Slow-start ease that accelerates quickly and settles fast — matches jonite.com feel
gsap.registerEase('in-j', progress => Math.pow(progress, 3.5))

export { gsap, ScrollTrigger }
