import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─── Falling petal particle ─── */
const Petal = ({ emoji, left, delay, duration, size }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left,
      top: '-40px',
      fontSize: size,
      animationName: 'petalFall',
      animationDuration: duration,
      animationDelay: delay,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  >
    {emoji}
  </div>
)

const EMOJIS = ['🌸', '🌷', '💕', '✨', '🌹', '💗', '🍀', '⭐']

/* ─── Landing Page ─── */
const LandingPage = ({ meta, buttonLabel, onEnter }) => {
  const [petals, setPetals] = useState([])
  const [isExiting, setIsExiting] = useState(false)

  // Generate petals once
  useEffect(() => {
    setPetals(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: `${(i * 5.8) % 100}%`,
        delay: `${(i * 0.4) % 4}s`,
        duration: `${5 + (i % 5)}s`,
        size: `${13 + (i % 3) * 5}px`,
      }))
    )
  }, [])

  const handleEnter = useCallback(() => {
    setIsExiting(true)
    setTimeout(onEnter, 700)
  }, [onEnter])

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #FFF8F3 0%, #FFEFE9 45%, #F7C6D9 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Falling petals */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {petals.map(p => <Petal key={p.id} {...p} />)}
      </div>

      {/* Decorative blurred circles */}
      <div style={{
        position: 'absolute', top: '8%', right: '10%',
        width: 220, height: 220, borderRadius: '50%',
        background: 'rgba(212,106,139,0.12)', filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '6%',
        width: 180, height: 180, borderRadius: '50%',
        background: 'rgba(212,175,106,0.1)', filter: 'blur(35px)',
        pointerEvents: 'none',
      }} />

      {/* Center card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '48px 40px 44px',
          maxWidth: 440,
          width: '90%',
          borderRadius: 32,
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 24px 80px rgba(156,59,84,0.12), 0 2px 0 rgba(255,255,255,0.9) inset',
          border: '1px solid rgba(247,198,217,0.5)',
        }}
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 72, lineHeight: 1, marginBottom: 20 }}
        >
          🎂
        </motion.div>

        {/* Gold rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #D4AF6A)' }} />
          <span style={{ color: '#D4AF6A', fontSize: 13, letterSpacing: 3, fontWeight: 500, textTransform: 'uppercase' }}>
            Ada Kejutan
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #D4AF6A)' }} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 6vw, 36px)',
          fontWeight: 700,
          color: '#9C3B54',
          lineHeight: 1.25,
          marginBottom: 10,
        }}>
          Selamat Ulang Tahun
          <br />
          <em style={{ color: '#D46A8B' }}>{meta.recipientName}</em>
        </h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 14,
          fontStyle: 'italic',
          color: '#8C6A75',
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Sebuah kejutan kecil penuh cinta <span style={{ color: '#D46A8B' }}>💕</span><br />
          dari {meta.senderName}
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(212,106,139,0.45)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnter}
          disabled={isExiting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 32px',
            borderRadius: 50,
            border: 'none',
            cursor: isExiting ? 'default' : 'pointer',
            background: 'linear-gradient(135deg, #D46A8B 0%, #9C3B54 100%)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 0.3,
            boxShadow: '0 8px 32px rgba(212,106,139,0.35)',
            transition: 'box-shadow 0.3s',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer overlay */}
          <motion.span
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>{buttonLabel}</span>
        </motion.button>

        <p style={{ marginTop: 16, fontSize: 12, color: '#B48A9A', letterSpacing: 1 }}>
          ✦ klik untuk membuka ✦
        </p>
      </motion.div>
    </motion.div>
  )
}

export default LandingPage
