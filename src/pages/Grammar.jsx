import { useEffect } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import { Rich } from '../ui.jsx'

export default function Grammar() {
  const { grammar } = useOutletContext()
  const { hash } = useLocation()
  // HashRouter owns location.hash, so scroll to the card manually.
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }) }, [hash])

  return (
    <div className="stack">
      {grammar.map((g, i) => (
        <article key={g.pattern} id={`g${i}`} className="card grammar">
          <header>
            <h3 className="jp">{g.pattern}</h3>
            <p className="tag-line">{g.tag}</p>
          </header>
          <Rich html={g.body} className="g-body" />
        </article>
      ))}
    </div>
  )
}
