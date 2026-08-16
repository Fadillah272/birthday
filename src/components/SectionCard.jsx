import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PhotoCard from './PhotoCard'
import ClosingButton from './ClosingButton'

/* ── Per-section accent colours ── */
const ACCENTS = {
  pembuka:   { icon: '💕', accent: '#D46A8B', bg: 'linear-gradient(180deg,#FFF8F3 0%,#FFEFE9 100%)', flip: false },
  syukur:    { icon: '🌸', accent: '#9C3B54', bg: 'linear-gradient(180deg,#FFEFE9 0%,#FFF8F3 100%)', flip: true },
  kenangan:  { icon: '📸', accent: '#D4AF6A', bg: 'linear-gradient(160deg,#FFF8F3 0%,#F7C6D9 60%,#FFEFE9 100%)', flip: false },
  kekaguman: { icon: '✨', accent: '#D46A8B', bg: 'linear-gradient(180deg,#FFEFE9 0%,#FFF8F3 100%)', flip: false },
  doa:       { icon: '🙏', accent: '#9C3B54', bg: 'linear-gradient(180deg,#FFF8F3 0%,#FFEFE9 100%)', flip: true },
  penutup:   { icon: '🤍', accent: '#D4AF6A', bg: 'linear-gradient(170deg,#FFEFE9 0%,#F7C6D9 40%,#9C3B54 100%)', flip: false, closing: true },
}

/* ── Slide variants ── */
const slideLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
const slideRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0 } }
const slideUp    = { hidden: { opacity: 0, y:  30 }, visible: { opacity: 1, y: 0 } }

const ease = [0.22, 1, 0.36, 1]
const transition = { duration: 0.75, ease }

/* ── Section divider ── */
const Divider = ({ icon, accent }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
    <div style={{ flex: 1, height: 1, background: accent, opacity: 0.25 }} />
    <span style={{ fontSize: 20 }}>{icon}</span>
    <div style={{ flex: 1, height: 1, background: accent, opacity: 0.25 }} />
  </div>
)

/* ── SectionCard ── */
const SectionCard = ({ section, index, isLast }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cfg = ACCENTS[section.id] || ACCENTS.pembuka
  const isClosing = cfg.closing

  /* Gallery section */
  if (section.gallery) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease }}
        style={{
          background: cfg.bg,
          padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,64px)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Divider icon={cfg.icon} accent={cfg.accent} />

          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={slideUp} transition={transition}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px,4vw,38px)',
              fontWeight: 700, color: cfg.accent, marginBottom: 16,
            }}>
              {section.heading}
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(15px,2vw,18px)', fontStyle: 'italic',
              color: '#5C2A3A', opacity: 0.8,
              lineHeight: 1.75, maxWidth: 560, margin: '0 auto',
            }}>
              "{section.text}"
            </p>
          </motion.div>

          {/* 2-col gallery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}>
            {section.gallery.map((photo, i) => (
              <motion.div
                key={i}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                transition={{ ...transition, delay: i * 0.15 }}
              >
                <PhotoCard src={photo.src} alt={photo.alt} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    )
  }

  /* Closing section */
  if (isClosing) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease }}
        style={{
          background: cfg.bg,
          padding: 'clamp(64px,10vw,110px) clamp(20px,5vw,64px)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Divider icon={cfg.icon} accent={cfg.accent} />

          <motion.h2
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={slideUp} transition={transition}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px,5vw,48px)',
              fontWeight: 700, color: '#D4AF6A', marginBottom: 32,
            }}
          >
            {section.heading}
          </motion.h2>

          {section.image && (
            <motion.div
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={slideUp} transition={{ ...transition, delay: 0.1 }}
              style={{ maxWidth: 300, margin: '0 auto 36px' }}
            >
              <PhotoCard src={section.image.src} alt={section.image.alt} tall />
            </motion.div>
          )}

          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={slideUp} transition={{ ...transition, delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,175,106,0.25)',
              borderRadius: 24, padding: 'clamp(24px,4vw,40px)',
              marginBottom: 36,
            }}
          >
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(15px,2vw,18px)', fontStyle: 'italic',
              color: '#fff', lineHeight: 1.8,
            }}>
              "{section.text}"
            </p>
          </motion.div>

          {section.closingButtonLabel && (
            <motion.div
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={slideUp} transition={{ ...transition, delay: 0.3 }}
            >
              <ClosingButton label={section.closingButtonLabel} />
            </motion.div>
          )}
        </div>
      </motion.section>
    )
  }

  /* Standard alternating section */
  const imageLeft = !cfg.flip
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease }}
      style={{
        background: cfg.bg,
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,64px)',
      }}
    >
      <div style={{
        maxWidth: 900, margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 36,
      }}>
        <Divider icon={cfg.icon} accent={cfg.accent} />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: imageLeft ? 'row' : 'row-reverse',
          alignItems: 'center',
          gap: 'clamp(28px,5vw,56px)',
        }}>
          {/* Image */}
          {section.image && (
            <motion.div
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={imageLeft ? slideLeft : slideRight}
              transition={transition}
              style={{ flex: '1 1 240px', maxWidth: 340 }}
            >
              <PhotoCard src={section.image.src} alt={section.image.alt} />
            </motion.div>
          )}

          {/* Text */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={imageLeft ? slideRight : slideLeft}
            transition={{ ...transition, delay: 0.1 }}
            style={{ flex: '1 1 260px' }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px,3.5vw,36px)',
              fontWeight: 700, color: cfg.accent,
              marginBottom: 14, lineHeight: 1.2,
            }}>
              {section.heading}
            </h2>

            {/* Gold underline */}
            <div style={{
              width: 48, height: 3, borderRadius: 2,
              background: '#D4AF6A', marginBottom: 20,
            }} />

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(15px,1.9vw,18px)', fontStyle: 'italic',
              color: '#5C2A3A', opacity: 0.85,
              lineHeight: 1.8,
            }}>
              "{section.text}"
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default SectionCard
