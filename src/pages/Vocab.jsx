import { useEffect, useMemo, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { topics } from '../data'
import { Icon, Rich, Speak } from '../ui.jsx'
import { useStore } from '../store.jsx'

const strip = (s) => s.toLowerCase()

function StarBtn({ id }) {
  const { starred, toggleStar } = useStore()
  const on = starred.includes(id)
  return (
    <button type="button" className={`icon-btn star${on ? ' on' : ''}`} aria-pressed={on} aria-label="Đánh dấu cần ôn lại" onClick={() => toggleStar(id)}>
      <Icon n="star" fill={on} />
    </button>
  )
}

function Card({ v, lessonId }) {
  const t = topics[v.cat]
  return (
    <article className="card vcard" style={{ '--c': t.color }}>
      <div className="vtop">
        <div>
          <div className="word jp">{v.word}</div>
          <div className="reading jp">{v.reading}</div>
        </div>
        <div className="tools"><Speak text={v.word} /><StarBtn id={`${lessonId}:${v.id}`} /></div>
      </div>
      <div className="chips">
        <span className="chip topic-chip">{t.label}</span>
        {v.tags.filter((x) => x !== t.label).map((x) => <span key={x} className="chip">{x}</span>)}
      </div>
      <p className="meaning">{v.meaning}</p>
      <div className="example">
        <Rich html={v.exJp} className="jp ex-jp" />
        <div className="vi ex-vi">{v.exVi}</div>
      </div>
    </article>
  )
}

function Flash({ list, lessonId }) {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState(false)
  useEffect(() => { setI(0); setFlip(false) }, [list])
  const go = (d) => { setFlip(false); setI((x) => (x + d + list.length) % list.length) }
  useEffect(() => {
    const k = (e) => {
      if (e.target.closest('input,button')) return
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === ' ') { e.preventDefault(); setFlip((f) => !f) }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })
  const v = list[i]
  if (!v) return null
  const t = topics[v.cat]
  return (
    <div className="flash" style={{ '--c': t.color }}>
      <div className="flash-count">{i + 1} / {list.length}</div>
      <button type="button" className={`flip${flip ? ' on' : ''}`} onClick={() => setFlip(!flip)} aria-label="Lật thẻ">
        <div className="face front"><span className="word jp">{v.word}</span><span className="muted">Chạm để lật</span></div>
        <div className="face back">
          <span className="reading jp">{v.reading}</span>
          <strong className="meaning">{v.meaning}</strong>
          <span className="jp ex-jp" dangerouslySetInnerHTML={{ __html: v.exJp }} />
          <span className="vi muted">{v.exVi}</span>
        </div>
      </button>
      <div className="flash-bar">
        <button type="button" className="btn" onClick={() => go(-1)}><Icon n="left" /> Trước</button>
        <Speak text={v.word} /><StarBtn id={`${lessonId}:${v.id}`} />
        <button type="button" className="btn primary" onClick={() => go(1)}>Sau <Icon n="right" /></button>
      </div>
    </div>
  )
}

export default function Vocab() {
  const lesson = useOutletContext()
  const { starred } = useStore()
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('cat') ?? 'all'
  const [q, setQ] = useState('')
  const [mode, setMode] = useState('grid')

  const list = useMemo(() => lesson.vocab.filter((v) => {
    if (cat === 'starred' ? !starred.includes(`${lesson.id}:${v.id}`) : cat !== 'all' && v.cat !== cat) return false
    return !q || strip(`${v.word} ${v.reading} ${v.meaning} ${v.exVi}`).includes(strip(q.trim()))
  }), [lesson, cat, q, starred])

  const chips = [['all', 'Tất cả', lesson.vocab.length], ...Object.entries(topics).map(([k, t]) => [k, t.label, lesson.vocab.filter((v) => v.cat === k).length]),
    ['starred', 'Đã đánh dấu', starred.filter((s) => s.startsWith(`${lesson.id}:`)).length]]

  return (
    <div className="stack">
      <div className="toolbar">
        <label className="search">
          <Icon n="search" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm từ, cách đọc hoặc nghĩa tiếng Việt…" />
        </label>
        <div className="seg" role="group" aria-label="Kiểu hiển thị">
          <button type="button" className={mode === 'grid' ? 'on' : ''} aria-pressed={mode === 'grid'} onClick={() => setMode('grid')}><Icon n="grid" size={16} /> Lưới</button>
          <button type="button" className={mode === 'flash' ? 'on' : ''} aria-pressed={mode === 'flash'} onClick={() => setMode('flash')}><Icon n="cards" size={16} /> Flashcard</button>
        </div>
      </div>

      <div className="chips scroll" role="tablist" aria-label="Chủ đề">
        {chips.map(([k, label, n]) => (
          <button key={k} type="button" role="tab" aria-selected={cat === k} className={`chip btn-chip${cat === k ? ' on' : ''}`}
            onClick={() => setSp(k === 'all' ? {} : { cat: k }, { replace: true })}>
            {label} <b>{n}</b>
          </button>
        ))}
      </div>

      {!list.length ? <p className="empty">{cat === 'starred' ? 'Chưa có từ nào được đánh dấu. Bấm ngôi sao ở từ cần ôn lại.' : 'Không có từ phù hợp.'}</p>
        : mode === 'flash' ? <Flash list={list} lessonId={lesson.id} />
        : <div className="grid grid-3">{list.map((v) => <Card key={v.id} v={v} lessonId={lesson.id} />)}</div>}
    </div>
  )
}
