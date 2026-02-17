import { useState } from 'react'
import './App.css'
import ShareModal from './components/ShareModal'

function App() {
  const [isPulsing, setIsPulsing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsPulsing(true)
    setIsModalOpen(true)
    setTimeout(() => setIsPulsing(false), 300)
  }

  return (
    <>
      <div className="app">
        <h1>Glassmorphism Button</h1>
        <button
          className={`glass-button ${isPulsing ? 'pulsing' : ''}`}
          onClick={handleClick}
        >
          <span className="button-text">Share</span>
          {isPulsing && (
            <>
              <span className="pulse-ring pulse-ring-1"></span>
              <span className="pulse-ring pulse-ring-2"></span>
              <span className="pulse-ring pulse-ring-3"></span>
            </>
          )}
        </button>
      </div>

      <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default App
