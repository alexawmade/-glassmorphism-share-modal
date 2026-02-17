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
        <div className="card-wrapper">
        <div className="landing-card">
          <div className="card-preview">
            <div className="card-chip">Interactive</div>
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

          <div className="card-divider" />

          <div className="card-info">
            <div className="card-info-block">
              <h2 className="card-heading">Share Modal</h2>
              <p className="card-body">A hand-crafted, production-ready share component — designed in Figma and built end-to-end with AI-assisted development. No UI libraries. Fully custom.</p>
            </div>
            <div className="card-info-block">
              <h3 className="card-subheading">Try it</h3>
              <p className="card-body">Open the modal and type <span className="card-hint">ale</span> in the email field to trigger the autocomplete.</p>
            </div>
            <div className="card-info-block">
              <h3 className="card-subheading">Tech stack</h3>
              <p className="card-body">React 18 · Vite 6 · JSX · Cursor · Claude Code · GitHub · Vercel</p>
              <p className="card-body card-body-muted">No external UI frameworks — modal, select, and chips built from scratch</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default App
