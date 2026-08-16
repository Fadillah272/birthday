import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const getVideoId = (url) => {
  if (!url) return ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/)
  return match ? match[1] : ''
}

const MusicPlayer = ({ url, isPlaying }) => {
  const [muted, setMuted] = useState(false) // Default: unmuted
  const iframeRef = useRef(null)

  const sendCommand = useCallback((func, args = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    )
  }, [])

  const toggleMute = useCallback(() => {
    if (muted) {
      sendCommand('unMute')
      sendCommand('setVolume', [80])
      setMuted(false)
    } else {
      sendCommand('mute')
      setMuted(true)
    }
  }, [muted, sendCommand])

  const videoId = getVideoId(url)

  // Auto-unmute after iframe loads (user already clicked, so gesture context is valid)
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => {
      sendCommand('unMute')
      sendCommand('setVolume', [80])
    }, 1200) // wait for YouTube player to fully initialize
  }, [sendCommand])

  if (!videoId) return null

  // autoplay=1 + mute=1 => browser allows muted autoplay to start
  // enablejsapi=1 => postMessage control (auto-unmutes on load)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&enablejsapi=1&rel=0`

  return (
    <>
      {/* Iframe loaded only after user clicks the big button */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          allow="autoplay; encrypted-media"
          title="background-music"
          onLoad={handleIframeLoad}
          style={{
            position: 'fixed',
            top: -400,
            left: -400,
            width: 320,
            height: 240,
            opacity: 0.01,
            pointerEvents: 'none',
            zIndex: -9999,
            border: 'none',
          }}
        />
      )}

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
