import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'jp7:v1'
const init = { furi: true, vi: true, starred: [], scores: {} }
const Ctx = createContext(null)

export function Store({ children }) {
  const [s, setS] = useState(() => {
    try { return { ...init, ...JSON.parse(localStorage.getItem(KEY)) } } catch { return init }
  })
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* private mode: state stays in memory */ }
    document.documentElement.classList.toggle('no-furi', !s.furi)
    document.documentElement.classList.toggle('no-vi', !s.vi)
  }, [s])

  const api = {
    ...s,
    set: (p) => setS((x) => ({ ...x, ...p })),
    toggleStar: (id) => setS((x) => ({ ...x, starred: x.starred.includes(id) ? x.starred.filter((i) => i !== id) : [...x.starred, id] })),
    saveScore: (k, score, total) => setS((x) => ({ ...x, scores: { ...x.scores, [k]: { best: Math.max(x.scores[k]?.best ?? 0, score), total } } })),
  }
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
export const useStore = () => useContext(Ctx)
