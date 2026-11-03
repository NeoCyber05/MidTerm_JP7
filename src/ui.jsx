import { useState } from 'react'

const P = {
  book: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  bulb: ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4'],
  test: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 2h6v4H9z', 'm9 14 2 2 4-4'],
  star: ['M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
  sound: ['M11 5 6 9H2v6h4l5 4z', 'M15.5 8.5a5 5 0 0 1 0 7', 'M19 5a9 9 0 0 1 0 14'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3'],
  grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  cards: ['m12 2 10 5-10 5L2 7z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  check: ['m5 12 5 5 9-10'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  redo: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5'],
  left: ['m15 18-6-6 6-6'],
  right: ['m9 18 6-6-6-6'],
  home: ['m3 11 9-8 9 8', 'M5 10v10h14V10'],
  image: ['M3 5h18v14H3z', 'm21 15-5-5L5 19'],
  eye: ['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
}
export const Icon = ({ n, size = 18, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {P[n].map((d) => <path key={d} d={d} />)}
  </svg>
)

export function say(text) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = 0.9
  speechSynthesis.speak(u)
}

export const Speak = ({ text }) => (
  <button type="button" className="icon-btn" aria-label="Phát âm" onClick={() => say(text)}><Icon n="sound" /></button>
)

// Trusted HTML from our own extracted data: ruby furigana, .ans (tap to reveal), button.speak.
export function Rich({ html, className = '', as: Tag = 'div' }) {
  const act = (e) => {
    const s = e.target.closest('[data-say]')
    if (s) return say(s.dataset.say)
    e.target.closest('.ans')?.classList.toggle('on')
  }
  return (
    <Tag
      className={`rich ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={act}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.target.matches('.ans') && (e.preventDefault(), act(e))}
    />
  )
}

export function Ans({ children }) {
  const [on, setOn] = useState(false)
  return <button type="button" className={`ans${on ? ' on' : ''}`} aria-pressed={on} onClick={() => setOn(!on)}>{children}</button>
}

export function Explain({ html }) {
  const [open, setOpen] = useState(false)
  if (!html) return null
  return (
    <div className={`explain${open ? ' open' : ''}`}>
      <button type="button" className="link-btn" onClick={() => setOpen(!open)}><Icon n="bulb" size={15} /> {open ? 'Ẩn giải thích' : 'Xem giải thích'}</button>
      <Rich html={html} className="explain-body" />
    </div>
  )
}

export const Progress = ({ value, total }) => (
  <div className="bar-track" role="progressbar" aria-valuenow={value} aria-valuemax={total}><span style={{ width: `${total ? (value / total) * 100 : 0}%` }} /></div>
)
