import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Helper to resolve public folder paths correctly on GitHub Pages ── */
const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${cleanPath}`;
}

const MusicPlayer = ({ url, isPlaying }) => {
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  // Resolve path to the audio file
  const audioSrc = getAssetPath(url || '/blessing.mp3')

  // Handle play/pause state based on isPlaying prop
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying])

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !muted
      audioRef.current.muted = nextMuted
      setMuted(nextMuted)
    }
  }

  return (
    <>
      {/* Hidden HTML5 Audio tag */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        style={{ display: 'none' }}
      />

      {/* Floating mute/unmute button — shown only when content is open */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            key="music-btn"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            onClick={toggleMute}
            title={muted ? 'Nyalakan musik' : 'Matikan musik'}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 999,
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: 'none',
              background: muted
                ? 'linear-gradient(135deg, #8C6A75, #5C2A3A)'
                : 'linear-gradient(135deg, #D4AF6A, #B8943A)',
              color: '#fff',
              boxShadow: muted
                ? '0 6px 20px rgba(140, 106, 117, 0.4)'
                : '0 8px 24px rgba(212, 175, 106, 0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
          >
            {muted ? (
              <span>🔇</span>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                🔊
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer
