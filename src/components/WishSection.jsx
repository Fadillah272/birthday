import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const BURST_EMOJIS = ['💗', '💕', '💖', '💝', '🤍', '✨', '🌸', '🌷', '🥰', '😍']

/* ─── Floating heart particle for bursts ─── */
const FloatingHeart = ({ emoji, x, y, delay, size }) => (
  <motion.span
    initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
    animate={{ x, y, opacity: 0, scale: 1.2 }}
    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      fontSize: size,
      pointerEvents: 'none',
      zIndex: 99999,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }}
  >
    {emoji}
  </motion.span>
)

/* ─── Success Modal ─── */
const SuccessModal = ({ onClose, recipientName }) => {
  const [bursts, setBursts] = useState([])

  const handleClose = () => {
    // Generate heart burst on close button click
    const newBursts = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      emoji: BURST_EMOJIS[i % BURST_EMOJIS.length],
      x: (Math.random() - 0.5) * 200,
      y: -(40 + Math.random() * 100),
      delay: Math.random() * 0.15,
      size: 14 + Math.random() * 14,
    }))
    setBursts(newBursts)

    // Delay closing slightly so hearts can be seen bursting
    setTimeout(() => {
      onClose()
    }, 500)
  }

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
        background: 'rgba(92, 42, 58, 0.6)',
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
          padding: '40px 32px 32px',
          maxWidth: 380,
          width: '90vw',
          textAlign: 'center',
          boxShadow: '0 32px 100px rgba(156,59,84,0.25), 0 2px 0 #fff inset',
          border: '1px solid rgba(247,198,217,0.7)',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top decorative stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #F7C6D9, #D46A8B, #D4AF6A, #D46A8B, #F7C6D9)',
        }} />

        {/* Decorative label */}
        <p style={{
          fontSize: 10, fontWeight: 600, letterSpacing: 4,
          textTransform: 'uppercase', color: '#D4AF6A',
          marginBottom: 16,
          fontFamily: "'Poppins', sans-serif",
        }}>
          ✦ &nbsp;Harapan Terkirim&nbsp; ✦
        </p>

        {/* Cute Peach & Goma Happy celebration GIF */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginBottom: 16 }}
        >
          <img
            src="https://media.tenor.com/f1xMo-cU7BQAAAAC/peach-goma-kiss-new.gif"
            alt="Peach Goma Celebration"
            width={160}
            height={160}
            style={{
              display: 'block',
              margin: '0 auto',
              borderRadius: 20,
              filter: 'drop-shadow(0 6px 14px rgba(212,106,139,0.2))',
            }}
          />
        </motion.div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(18px, 4vw, 22px)',
          fontWeight: 700,
          color: '#9C3B54',
          marginBottom: 10,
          lineHeight: 1.3,
        }}>
          Harapan Berhasil Dikirim! 💌
        </h2>

        {/* Sweet text */}
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 14,
          fontStyle: 'italic',
          color: '#8C6A75',
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          Terima kasih sudah menuliskan harapanmu, sayang. Doa dan mimpimu sudah tersimpan di lubuk hatiku. Semoga semua cita-citamu terkabul ya! 💕
        </p>

        {/* Close/Acknowledge button */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Burst particles */}
          <AnimatePresence>
            {bursts.map(b => (
              <FloatingHeart key={b.id} {...b} />
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleClose}
            style={{
              padding: '12px 36px',
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #D46A8B, #9C3B54)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 6px 20px rgba(212,106,139,0.3)',
              letterSpacing: 0.5,
            }}
          >
            Amin, Terima Kasih 💕
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── WishSection Component ─── */
const WishSection = ({ meta }) => {
  const [wish, setWish] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const handleSend = async (e) => {
    e.preventDefault()
    if (!wish.trim()) return

    setIsLoading(true)

    const sender = meta.senderName || 'Irfan'
    const recipient = meta.recipientName || 'Maesaroh'
    const message = `✨ *Harapan Baru ${recipient}* ✨\n\n"${wish.trim()}"\n\n- Dikirim oleh: *${recipient}* untuk *${sender}* 💕`

    // Check if configuration exists and is not a placeholder
    const isConfigured = meta.phoneNumber &&
      meta.callmebotApiKey &&
      !meta.phoneNumber.includes('x') &&
      !meta.callmebotApiKey.includes('YOUR_')

    if (isConfigured) {
      const url = `https://api.textmebot.com/send.php?recipient=${meta.phoneNumber}&apikey=${meta.callmebotApiKey}&text=${encodeURIComponent(message)}`

      // Gunakan Image trick untuk bypass CORS — browser kirim GET request seperti load gambar,
      // sehingga tidak ada CORS preflight. Pesan tetap terkirim ke TextMeBot di server.
      const img = new Image()
      img.src = url

      // Tampilkan modal sukses setelah 1.5 detik (beri waktu request sampai ke server)
      setTimeout(() => {
        setIsLoading(false)
        setShowModal(true)
        setWish('')
      }, 1500)
    } else {
      // Dev mode or unconfigured fallback: simulate background sending
      console.warn('TextMeBot is not configured in data.json. Simulating background sending to WhatsApp.')

      setTimeout(() => {
        setIsLoading(false)
        setShowModal(true)
        setWish('')
      }, 1200)
    }
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <SuccessModal
            onClose={() => setShowModal(false)}
            recipientName={meta.recipientName}
          />
        )}
      </AnimatePresence>

      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(180deg, #FFEFE9 0%, #FFF8F3 100%)',
          padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,64px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Header divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: '#9C3B54', opacity: 0.25 }} />
            <span style={{ fontSize: 20 }}>✨</span>
            <div style={{ flex: 1, height: 1, background: '#9C3B54', opacity: 0.25 }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px,4vw,36px)',
              fontWeight: 700,
              color: '#9C3B54',
              marginBottom: 16,
            }}>
              Ruang Harapan & Impian ✨
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(14px,1.9vw,16px)',
              fontStyle: 'italic',
              color: '#5C2A3A',
              opacity: 0.85,
              lineHeight: 1.7,
              maxWidth: 500,
              margin: '0 auto',
            }}>
              "Tuliskan apa saja yang ingin kamu capai di usia baru ini, mimpi-mimpimu, atau harapan untuk kita berdua..."
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Tulis harapan terindahmu di sini, sayang... 💕"
                disabled={isLoading}
                rows={5}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '16px 20px',
                  borderRadius: 20,
                  border: '1.5px solid rgba(212,175,106,0.3)',
                  backgroundColor: '#fff',
                  color: '#5C2A3A',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  outline: 'none',
                  resize: 'none',
                  boxShadow: '0 8px 30px rgba(156,59,84,0.03)',
                  transition: 'all 0.3s ease',
                  WebkitAppearance: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#D4AF6A'
                  e.target.style.boxShadow = '0 8px 30px rgba(212,175,106,0.15)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,106,0.3)'
                  e.target.style.boxShadow = '0 8px 30px rgba(156,59,84,0.03)'
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <motion.button
                type="submit"
                disabled={isLoading || !wish.trim()}
                whileHover={wish.trim() ? { scale: 1.04, boxShadow: '0 10px 30px rgba(212,106,139,0.3)' } : {}}
                whileTap={wish.trim() ? { scale: 0.96 } : {}}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '16px 48px',
                  borderRadius: 50,
                  border: 'none',
                  cursor: wish.trim() ? 'pointer' : 'not-allowed',
                  background: wish.trim()
                    ? 'linear-gradient(135deg, #D46A8B 0%, #9C3B54 100%)'
                    : '#EADCDA',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: wish.trim() ? '0 6px 20px rgba(212,106,139,0.2)' : 'none',
                  transition: 'background 0.3s, opacity 0.3s',
                  opacity: isLoading ? 0.8 : 1,
                }}
              >
                {isLoading ? (
                  <>
                    {/* Inline CSS loading spinner */}
                    <span style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                      display: 'inline-block',
                      marginRight: 6
                    }} />
                    <span>Mengirim Harapan...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Harapan & Doa 💌</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

        </div>

        {/* Global style injection for spinner rotation */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </motion.section>
    </>
  )
}

export default WishSection
