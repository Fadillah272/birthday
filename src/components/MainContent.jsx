import { motion } from 'framer-motion'
import SectionCard from './SectionCard'
import FloatingHearts from './FloatingHearts'
import ClosingButton from './ClosingButton'
import WishSection from './WishSection'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const MainContent = ({ data }) => {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <FloatingHearts />

      {/* ── Hero Header ── */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: 'center',
          padding: 'clamp(60px, 10vw, 100px) 24px clamp(40px, 6vw, 60px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* background blob */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '140%', height: '100%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(247,198,217,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.p variants={fadeUp} style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 4,
          textTransform: 'uppercase', color: '#D4AF6A', marginBottom: 14,
        }}>
          ✦ &nbsp;Spesial Untukmu&nbsp; ✦
        </motion.p>

        <motion.h1 variants={fadeUp} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 7vw, 64px)',
          fontWeight: 700,
          color: '#9C3B54',
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          {data.meta.title}
        </motion.h1>

        <motion.div variants={fadeUp} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12,
        }}>
          <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, #D4AF6A)' }} />
          <span style={{ fontSize: 22 }}>💕</span>
          <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, #D4AF6A)' }} />
        </motion.div>

        <motion.p variants={fadeUp} style={{
          fontSize: 13, color: '#B48A9A', fontStyle: 'italic',
          fontFamily: "'Playfair Display', serif",
        }}>
          {data.meta.birthdayDate}
        </motion.p>
      </motion.header>

      {/* ── Sections ── */}
      <main style={{ paddingBottom: 80 }}>
        {data.sections.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            index={i}
            isLast={i === data.sections.length - 1}
          />
        ))}
      </main>

      <WishSection meta={data.meta} />

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: '40px 24px 60px',
          borderTop: '1px solid rgba(247,198,217,0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ height: 1, width: 48, background: '#D4AF6A', opacity: 0.4 }} />
          <span style={{ fontSize: 18 }}>🤍</span>
          <div style={{ height: 1, width: 48, background: '#D4AF6A', opacity: 0.4 }} />
        </div>
        <p style={{
          fontSize: 13, fontStyle: 'italic', color: '#B48A9A',
          fontFamily: "'Playfair Display', serif",
        }}>
          Dengan segenap cinta, dari <strong style={{ color: '#D46A8B' }}>{data.meta.senderName}</strong> untuk <strong style={{ color: '#D46A8B' }}>{data.meta.recipientName}</strong>
        </p>
      </motion.footer>
    </motion.div>
  )
}

export default MainContent
