import { useEffect, useState } from 'react'

const ITEMS = ['💗', '🌸', '✨', '💕', '🌷', '💖', '⭐', '🌹']

const FloatingHearts = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 6.5) % 100}%`,
        emoji: ITEMS[i % ITEMS.length],
        duration: `${7 + (i % 6)}s`,
        delay: `${(i * 0.6) % 6}s`,
        size: `${11 + (i % 4) * 4}px`,
        opacity: 0.18 + (i % 4) * 0.07,
      }))
    )
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-20px',
            fontSize: p.size,
            opacity: p.opacity,
            animationName: 'floatUp',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            userSelect: 'none',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
