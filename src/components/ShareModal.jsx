import { useState, useEffect } from 'react'
import './ShareModal.css'
import CustomSelect from './CustomSelect'

export default function ShareModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('invite')
  const [emailChips, setEmailChips] = useState([])
  const [emailInput, setEmailInput] = useState('')
  const [permission, setPermission] = useState('Can edit')
  const [editorsCanInvite, setEditorsCanInvite] = useState(true)
  const [publicAccess, setPublicAccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const [people, setPeople] = useState([
    { name: 'Bruce Wayne', email: 'iambatman@gmail.com', role: 'Owner', initials: 'BW', editable: false },
    { name: 'Zami James', email: 'Zamithegreat@gmail.com', role: 'Editor', initials: 'ZJ', editable: true },
    { name: 'Josh Tomas', email: 'Joshtomas1998@gmail.com', role: 'Viewer', initials: 'JT', editable: true }
  ])

  // Mock user database for autocomplete
  const mockUsers = [
    { name: 'Alex Ichim', email: 'alexandru.ichim@gmail.com', initials: 'AI' }
  ]

  const updatePersonRole = (index, newRole) => {
    if (newRole === 'Remove') {
      // Remove the person from the list
      setPeople(people.filter((_, i) => i !== index))
    } else {
      setPeople(people.map((person, i) =>
        i === index ? { ...person, role: newRole } : person
      ))
    }
  }

  const removeChip = (index) => {
    setEmailChips(emailChips.filter((_, i) => i !== index))
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  const addEmail = () => {
    if (emailInput && validateEmail(emailInput)) {
      // Check if user exists in suggestions
      const suggestedUser = suggestions.find(u => u.email === emailInput)

      if (suggestedUser) {
        // Add to people list
        const newPerson = {
          name: suggestedUser.name,
          email: suggestedUser.email,
          role: permission === 'Can edit' ? 'Editor' : 'Viewer',
          initials: suggestedUser.initials,
          editable: true,
          removable: true
        }
        setPeople([...people, newPerson])
      } else {
        // Add to email chips (fallback for unknown emails)
        setEmailChips([...emailChips, emailInput])
      }

      setEmailInput('')
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const handleEmailInputChange = (e) => {
    const value = e.target.value
    setEmailInput(value)

    // Show suggestions after 3 characters
    if (value.length >= 3) {
      const matchedUsers = mockUsers.filter(user =>
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.name.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(matchedUsers)
      setShowSuggestions(matchedUsers.length > 0)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const selectSuggestion = (user) => {
    setEmailInput(user.email)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addEmail()
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText('https://www.collabease.com/watch?v=rVrkB')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Share project</h2>
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'invite' ? 'active' : ''}`}
            onClick={() => setActiveTab('invite')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            Invite people
          </button>
          <button
            className={`tab ${activeTab === 'publish' ? 'active' : ''}`}
            onClick={() => setActiveTab('publish')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 20h-8a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12v5" />
              <path d="M11 16h-5a2 2 0 0 0 -2 2" />
              <path d="M15 16l3 -3l3 3" />
              <path d="M18 13v9" />
            </svg>
            Publish
          </button>
          <button
            className={`tab ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
            </svg>
            Export
          </button>
          <button
            className={`tab ${activeTab === 'embed' ? 'active' : ''}`}
            onClick={() => setActiveTab('embed')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 8l-4 4l4 4" />
              <path d="M17 8l4 4l-4 4" />
              <path d="M14 4l-4 16" />
            </svg>
            Embed
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'invite' && (
            <>
              <div className="invite-section">
                <p className="invite-description">
                  Invite your friends by entering their email address and get them onboard.
                </p>
                <div className="invite-input-row">
                  <div className="email-chips-container">
                    <div className="email-chips">
                      {emailChips.map((email, index) => (
                        <div key={index} className="email-chip">
                          {email}
                          <button className="chip-remove" onClick={() => removeChip(index)}>
                            &times;
                          </button>
                        </div>
                      ))}
                      <input
                        type="email"
                        className="email-input"
                        placeholder="Enter email..."
                        value={emailInput}
                        onChange={handleEmailInputChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    {showSuggestions && (
                      <div className="email-suggestions">
                        {suggestions.map((user, index) => (
                          <button
                            key={index}
                            className="email-suggestion"
                            onClick={() => selectSuggestion(user)}
                            type="button"
                          >
                            <div className="suggestion-avatar">{user.initials}</div>
                            <div className="suggestion-details">
                              <div className="suggestion-name">{user.name}</div>
                              <div className="suggestion-email">{user.email}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <CustomSelect
                    value={permission}
                    onChange={setPermission}
                    options={['Can edit', 'Can view', 'Can comment']}
                    className="permission-select"
                  />
                  <button className="invite-btn" onClick={addEmail}>
                    Invite
                  </button>
                </div>
              </div>

              <div className="toggle-section">
                <div className="toggle-info">
                  <span className="toggle-icon">⚡</span>
                  <div className="toggle-text">
                    <h4>Editors can invite people</h4>
                    <p>Editors in your file can invite others to collaborate.</p>
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={editorsCanInvite}
                    onChange={(e) => setEditorsCanInvite(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="people-list">
                {people.map((person, index) => (
                  <div key={index} className="person-item">
                    <div className="person-info">
                      <div className="person-avatar">{person.initials}</div>
                      <div className="person-details">
                        <h4>{person.name}</h4>
                        <p>{person.email}</p>
                      </div>
                    </div>
                    {person.editable ? (
                      <CustomSelect
                        value={person.role}
                        onChange={(newRole) => updatePersonRole(index, newRole)}
                        options={person.removable ? ['Editor', 'Viewer', 'Remove'] : ['Editor', 'Viewer']}
                        className="role-badge"
                      />
                    ) : (
                      <span className="role-badge-static">{person.role}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="public-access-section">
                <div className="public-access-header">
                  <h4>
                    <span>🌐</span> Public access
                  </h4>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={publicAccess}
                      onChange={(e) => setPublicAccess(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className={`url-copy-row ${publicAccess ? 'visible' : ''}`}>
                  <input
                    type="text"
                    className="url-input"
                    value="https://www.collabease.com/watch?v=rVrkB"
                    readOnly
                  />
                  <button
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={copyUrl}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <a href="#" className="footer-link">View analytics</a>
                <button className="settings-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  </svg>
                  Settings
                </button>
              </div>
            </>
          )}

          {activeTab === 'publish' && (
            <div className="tab-content-placeholder">
              <span style={{ fontSize: '48px' }}>📡</span>
              <h3>Publish</h3>
              <p>Publishing options will appear here</p>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="tab-content-placeholder">
              <span style={{ fontSize: '48px' }}>⬇</span>
              <h3>Export</h3>
              <p>Export options will appear here</p>
            </div>
          )}

          {activeTab === 'embed' && (
            <div className="tab-content-placeholder">
              <span style={{ fontSize: '48px' }}>🔗</span>
              <h3>Embed</h3>
              <p>Embed code will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
