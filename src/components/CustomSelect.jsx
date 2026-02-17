import { useState, useRef, useEffect } from 'react'
import './CustomSelect.css'

export default function CustomSelect({ value, onChange, options, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className={`custom-select ${className}`} ref={dropdownRef}>
      <button
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{value}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`select-arrow ${isOpen ? 'open' : ''}`}
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <button
              key={index}
              className={`select-option ${option === value ? 'selected' : ''} ${option === 'Remove' ? 'dangerous' : ''}`}
              onClick={() => handleSelect(option)}
              type="button"
            >
              {option}
              {option === value && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7L6 10L11 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
