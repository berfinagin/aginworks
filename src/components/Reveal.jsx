import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
