import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Lightbox Modal ── */
const Lightbox = ({ src, alt, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(20, 8, 14, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          cursor: 'zoom-out',
        }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            cursor: 'default',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              display: 'block',
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: 16,
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          />

          {/* Caption */}
          {alt && (
            <p style={{
              textAlign: 'center',
              marginTop: 14,
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: 0.3,
            }}>
              {alt}
            </p>
          )}

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: -16,
              right: -16,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(212,175,106,0.9)',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── PhotoCard ── */
const PhotoCard = ({ src, alt, tall = false }) => {
  const [error, setError] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  const hasImage = !error && !!src

  return (
    <>
      {/* Lightbox */}
      {zoomed && hasImage && (
        <Lightbox src={src} alt={alt} onClose={() => setZoomed(false)} />
      )}

      <motion.div
        whileHover={{ scale: 1.03, rotate: -0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={() => { if (hasImage) setZoomed(true) }}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 10,
          boxShadow: '0 8px 40px rgba(156,59,84,0.12)',
          border: '1px solid rgba(212,175,106,0.2)',
          position: 'relative',
          cursor: hasImage ? 'zoom-in' : 'default',
        }}
      >
        {/* Photo frame */}
        <div
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            aspectRatio: tall ? '3/4' : '4/3',
            background: 'linear-gradient(135deg, #F7C6D9, #FFEFE9)',
            position: 'relative',
          }}
        >
          {hasImage ? (
            <motion.img
              src={src}
              alt={alt}
              onError={() => setError(true)}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            /* Placeholder when no image */
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 10,
            }}>
              <span style={{ fontSize: 40 }}>📷</span>
              <p style={{
                fontSize: 11, textAlign: 'center', padding: '0 12px',
                fontStyle: 'italic', color: '#9C3B54', opacity: 0.6,
                fontFamily: "'Playfair Display', serif",
              }}>
                {alt}
              </p>
            </div>
          )}

          {/* Zoom hint overlay on hover */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(156,59,84,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                pointerEvents: 'none',
              }}
            >
              🔍
            </motion.div>
          )}
        </div>

        {/* Caption */}
        <p style={{
          textAlign: 'center', fontSize: 11, marginTop: 10, paddingBottom: 2,
          fontStyle: 'italic', color: '#9C3B54', opacity: 0.55,
          fontFamily: "'Playfair Display', serif",
        }}>
          {alt}
        </p>

        {/* Gold corner accents */}
        {[
          { top: 6, left: 6, borderTop: '1.5px solid #D4AF6A', borderLeft: '1.5px solid #D4AF6A', borderTopLeftRadius: 6 },
          { top: 6, right: 6, borderTop: '1.5px solid #D4AF6A', borderRight: '1.5px solid #D4AF6A', borderTopRightRadius: 6 },
          { bottom: 6, left: 6, borderBottom: '1.5px solid #D4AF6A', borderLeft: '1.5px solid #D4AF6A', borderBottomLeftRadius: 6 },
          { bottom: 6, right: 6, borderBottom: '1.5px solid #D4AF6A', borderRight: '1.5px solid #D4AF6A', borderBottomRightRadius: 6 },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...s }} />
        ))}
      </motion.div>
    </>
  )
}

export default PhotoCard
