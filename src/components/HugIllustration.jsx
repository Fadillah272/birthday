import { motion } from 'framer-motion'

/**
 * Animated SVG hug illustration — two cute bears hugging
 * Built as inline SVG so no image file dependency
 */
const HugIllustration = () => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <svg
      viewBox="0 0 240 220"
      width="220"
      height="220"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dua beruang memeluk"
    >
      {/* ── Background blob ── */}
      <ellipse cx="120" cy="200" rx="90" ry="14" fill="rgba(212,106,139,0.10)" />

      {/* ══════════ LEFT BEAR (pink) ══════════ */}
      <g transform="translate(28, 40)">
        {/* Body */}
        <ellipse cx="55" cy="115" rx="38" ry="45" fill="#F2A0B6" />

        {/* Belly */}
        <ellipse cx="55" cy="120" rx="22" ry="28" fill="#FAD0DC" />

        {/* Right arm (hugging) */}
        <motion.path
          d="M 82 100 Q 110 95 118 115 Q 122 128 108 135"
          fill="none" stroke="#F2A0B6" strokeWidth="18" strokeLinecap="round"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '82px 100px' }}
        />

        {/* Left arm */}
        <ellipse cx="22" cy="108" rx="13" ry="8" fill="#F2A0B6" transform="rotate(-30 22 108)" />

        {/* Head */}
        <circle cx="55" cy="65" r="34" fill="#F2A0B6" />

        {/* Ears */}
        <circle cx="26" cy="38" r="12" fill="#F2A0B6" />
        <circle cx="26" cy="38" r="7" fill="#FAD0DC" />
        <circle cx="82" cy="38" r="12" fill="#F2A0B6" />
        <circle cx="82" cy="38" r="7" fill="#FAD0DC" />

        {/* Face */}
        <ellipse cx="55" cy="72" rx="18" ry="14" fill="#FAD0DC" />
        {/* Eyes */}
        <circle cx="45" cy="62" r="5" fill="#5C2A3A" />
        <circle cx="65" cy="62" r="5" fill="#5C2A3A" />
        <circle cx="46.5" cy="60.5" r="1.8" fill="white" />
        <circle cx="66.5" cy="60.5" r="1.8" fill="white" />
        {/* Nose */}
        <ellipse cx="55" cy="70" rx="4" ry="3" fill="#D46A8B" />
        {/* Smile */}
        <path d="M 48 76 Q 55 82 62 76" fill="none" stroke="#D46A8B" strokeWidth="2.2" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="38" cy="70" rx="8" ry="5" fill="#FAB0C0" opacity="0.6" />
        <ellipse cx="72" cy="70" rx="8" ry="5" fill="#FAB0C0" opacity="0.6" />

        {/* Legs */}
        <ellipse cx="40" cy="155" rx="14" ry="10" fill="#F2A0B6" />
        <ellipse cx="68" cy="155" rx="14" ry="10" fill="#F2A0B6" />
        <ellipse cx="40" cy="160" rx="16" ry="8" fill="#FAD0DC" />
        <ellipse cx="68" cy="160" rx="16" ry="8" fill="#FAD0DC" />
      </g>

      {/* ══════════ RIGHT BEAR (beige/brown) ══════════ */}
      <g transform="translate(118, 40)">
        {/* Body */}
        <ellipse cx="55" cy="115" rx="38" ry="45" fill="#D4A876" />

        {/* Belly */}
        <ellipse cx="55" cy="120" rx="22" ry="28" fill="#EDD9B8" />

        {/* Left arm (hugging back) */}
        <motion.path
          d="M 28 100 Q 0 95 -8 115 Q -12 128 2 135"
          fill="none" stroke="#D4A876" strokeWidth="18" strokeLinecap="round"
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '28px 100px' }}
        />

        {/* Right arm */}
        <ellipse cx="88" cy="108" rx="13" ry="8" fill="#D4A876" transform="rotate(30 88 108)" />

        {/* Head */}
        <circle cx="55" cy="65" r="34" fill="#D4A876" />

        {/* Ears */}
        <circle cx="26" cy="38" r="12" fill="#D4A876" />
        <circle cx="26" cy="38" r="7" fill="#EDD9B8" />
        <circle cx="82" cy="38" r="12" fill="#D4A876" />
        <circle cx="82" cy="38" r="7" fill="#EDD9B8" />

        {/* Face */}
        <ellipse cx="55" cy="72" rx="18" ry="14" fill="#EDD9B8" />
        {/* Eyes (closed/happy) */}
        <path d="M 44 62 Q 47 58 50 62" fill="none" stroke="#5C2A3A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 60 62 Q 63 58 66 62" fill="none" stroke="#5C2A3A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="55" cy="70" rx="4" ry="3" fill="#A0714A" />
        {/* Smile */}
        <path d="M 48 76 Q 55 82 62 76" fill="none" stroke="#A0714A" strokeWidth="2.2" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="38" cy="70" rx="8" ry="5" fill="#F2A06A" opacity="0.5" />
        <ellipse cx="72" cy="70" rx="8" ry="5" fill="#F2A06A" opacity="0.5" />

        {/* Legs */}
        <ellipse cx="40" cy="155" rx="14" ry="10" fill="#D4A876" />
        <ellipse cx="68" cy="155" rx="14" ry="10" fill="#D4A876" />
        <ellipse cx="40" cy="160" rx="16" ry="8" fill="#EDD9B8" />
        <ellipse cx="68" cy="160" rx="16" ry="8" fill="#EDD9B8" />
      </g>

      {/* ── Floating hearts ── */}
      {[
        { cx: 30,  cy: 30,  r: 7,  color: '#D46A8B', delay: 0    },
        { cx: 210, cy: 25,  r: 9,  color: '#F7C6D9', delay: 0.4  },
        { cx: 55,  cy: 10,  r: 5,  color: '#D4AF6A', delay: 0.8  },
        { cx: 185, cy: 55,  r: 6,  color: '#D46A8B', delay: 0.3  },
        { cx: 120, cy: 8,   r: 8,  color: '#F2A0B6', delay: 1.1  },
        { cx: 15,  cy: 80,  r: 5,  color: '#D4AF6A', delay: 0.6  },
        { cx: 228, cy: 90,  r: 7,  color: '#F7C6D9', delay: 0.9  },
      ].map((h, i) => (
        <motion.text
          key={i}
          x={h.cx} y={h.cy}
          textAnchor="middle"
          fontSize={h.r * 2.5}
          animate={{ y: [h.cy, h.cy - 8, h.cy], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: h.delay, ease: 'easeInOut' }}
        >
          {i % 3 === 0 ? '💕' : i % 3 === 1 ? '✨' : '🌸'}
        </motion.text>
      ))}
    </svg>
  </motion.div>
)

export default HugIllustration
