import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import data from './data.json'
import LandingPage from './components/LandingPage'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#FFF8F3', fontFamily: "'Poppins', sans-serif" }}>
      <AnimatePresence mode="wait">
        {!entered ? (
          <LandingPage
            key="landing"
            meta={data.meta}
            buttonLabel={data.openingScreen.buttonLabel}
            onEnter={() => setEntered(true)}
          />
        ) : (
          <MainContent
            key="main"
            data={data}
          />
        )}
      </AnimatePresence>
      <MusicPlayer url={data.meta.youtubeUrl} isPlaying={entered} />
    </div>
  )
}

export default App
