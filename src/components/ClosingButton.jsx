import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BURST_EMOJIS = ['💗', '💕', '💖', '💝', '🤍', '✨', '🌸', '🌷', '🥰', '😍']

/* ─── Floating heart particle ─── */
const FloatingHeart = ({ emoji, x, y, delay, size }) => (
  <motion.span
    initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
    animate={{ x, y, opacity: 0, scale: 1.2 }}
    exit={{}}
    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      fontSize: size,
      pointerEvents: 'none',
      zIndex: 10,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }}
  >
    {emoji}
  </motion.span>
)

/* ─── Hug Modal ─── */
const HugModal = ({ onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(92, 42, 58, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer',
      }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #fff8f3, #ffefe9)',
          borderRadius: 32,
          padding: '40px 36px 32px',
          maxWidth: 380,
          width: '90vw',
          textAlign: 'center',
          boxShadow: '0 32px 100px rgba(156,59,84,0.22), 0 2px 0 #fff inset',
          border: '1px solid rgba(247,198,217,0.6)',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top decorative dots */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #F7C6D9, #D46A8B, #D4AF6A, #D46A8B, #F7C6D9)',
          borderRadius: '32px 32px 0 0',
        }} />

        {/* Label */}
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 4,
          textTransform: 'uppercase', color: '#D4AF6A',
          marginBottom: 12,
          fontFamily: "'Poppins', sans-serif",
        }}>
          ✦ &nbsp;Pelukan Virtual&nbsp; ✦
        </p>

        {/* Peach & Goma GIF from Tenor */}
        <motion.div
          animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginBottom: 8 }}
        >
          <img
            src="https://media.tenor.com/dGLwt-9NO0wAAAAj/peach-goma.gif"
            alt="Peach dan Goma berpelukan"
            width={256}
            height={220}
            style={{
              display: 'block',
              margin: '0 auto',
              borderRadius: 20,
              filter: 'drop-shadow(0 6px 18px rgba(212,106,139,0.25))',
            }}
          />
        </motion.div>
        {/* Tenor attribution */}
        <p style={{ fontSize: 9, color: '#C9A0AE', marginBottom: 10, letterSpacing: 0.3 }}>
          via <a href="https://tenor.com/view/peach-goma-gif-8386530128901782348" target="_blank" rel="noreferrer" style={{ color: '#D4AF6A', textDecoration: 'none' }}>Tenor</a> · Peach & Goma
        </p>

        {/* Floating ambient hearts around the image */}
        {['💕', '🌸', '💗', '✨', '💖'].map((emoji, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            animate={{
              y: [0, -14, 0],
              x: [0, i % 2 === 0 ? 6 : -6, 0],
              opacity: [0.5, 1, 0.5],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              fontSize: 18 + (i % 3) * 6,
              top: `${16 + i * 10}%`,
              left: i % 2 === 0 ? `${4 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${4 + i * 3}%` : undefined,
              pointerEvents: 'none',
            }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* Message */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(18px, 4vw, 22px)',
          fontWeight: 700,
          color: '#9C3B54',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          Ini pelukanku untukmu 🤍
        </h2>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 14,
          fontStyle: 'italic',
          color: '#8C6A75',
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          Semoga kamu bisa merasakan betapa sayangnya aku padamu,
          meski dari jauh 💕
        </p>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          style={{
            padding: '12px 32px',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #D46A8B, #9C3B54)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            boxShadow: '0 6px 24px rgba(212,106,139,0.3)',
            letterSpacing: 0.3,
          }}
        >
          💕 Terima kasih!
        </motion.button>

        <p style={{
          marginTop: 12, fontSize: 11,
          color: '#C9A0AE', letterSpacing: 0.5,
          fontFamily: "'Poppins', sans-serif",
        }}>
          klik di luar untuk menutup
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Closing Button ─── */
const ClosingButton = ({ label }) => {
  const [showModal, setShowModal] = useState(false)
  const [bursts, setBursts] = useState([])
  const [fired, setFired] = useState(false)

  const handleClick = useCallback(() => {
    // Burst hearts
    const newBursts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      emoji: BURST_EMOJIS[i % BURST_EMOJIS.length],
      x: (Math.random() - 0.5) * 220,
      y: -(60 + Math.random() * 120),
      delay: Math.random() * 0.2,
      size: 14 + Math.random() * 16,
    }))
    setBursts(newBursts)
    setFired(true)

    // Show modal after short delay
    setTimeout(() => {
      setBursts([])
      setFired(false)
      setShowModal(true)
    }, 600)
  }, [])

  return (
    <>
      {/* Modal Portal */}
      <AnimatePresence>
        {showModal && <HugModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* Button wrapper */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Burst particles */}
        <AnimatePresence>
          {bursts.map(b => (
            <FloatingHeart key={b.id} {...b} />
          ))}
        </AnimatePresence>

        {/* Pulse ring (idle state) */}
        {!fired && (
          <motion.div
            animate={{ scale: [1, 1.55], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 50,
              border: '2px solid rgba(212,175,106,0.5)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Main button */}
        <motion.button
          whileHover={{
            scale: 1.06,
            boxShadow: '0 20px 56px rgba(212,175,106,0.55)',
          }}
          whileTap={{ scale: 0.94 }}
          onClick={handleClick}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '18px 44px',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            background: fired
              ? 'linear-gradient(135deg, #D46A8B, #9C3B54)'
              : 'linear-gradient(135deg, #D4AF6A 0%, #B8943A 100%)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            boxShadow: '0 10px 36px rgba(212,175,106,0.4)',
            overflow: 'hidden',
            transition: 'background 0.4s',
            zIndex: 1,
          }}
        >
          {/* Shimmer sweep */}
          <motion.span
            animate={{ x: ['-130%', '220%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>
            {label}
          </span>
        </motion.button>
      </div>
    </>
  )
}

export default ClosingButton
