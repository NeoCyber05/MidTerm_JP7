import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { examKinds } from '../data'
import { Ans, Explain, Icon, Progress, Rich } from '../ui.jsx'
import { useStore } from '../store.jsx'

const img = (p) => `${import.meta.env.BASE_URL}${p}`

/* ---------- 1. Nhìn hình ---------- */
const Picture = ({ data }) => (
  <div className="grid grid-3">
    {data.map((d, i) => (
      <figure key={d.img} className="card pic">
        <img src={img(d.img)} alt={d.vi} loading="lazy" width="400" height="300" />
        <figcaption>
          <div className="pic-title"><b>{i + 1}.</b> <span className="vi">{d.vi}</span></div>
          <Rich html={d.sentence} className="jp sentence" />
          <small className="muted jp">{d.hint}</small>
        </figcaption>
      </figure>
    ))}
  </div>
)

/* ---------- 2. Cách đọc Kanji ---------- */
const Reading = ({ data }) => (
  <div className="grid grid-3">
    {data.map((d, i) => (
      <div key={d.kanji} className="card kanji-q">
        <span className="num sm">{i + 1}</span>
        <div className="kq-word jp">{d.kanji}</div>
        <div className="vi muted">{d.meaning}</div>
        <Ans><span className="jp">{d.reading}</span></Ans>
      </div>
    ))}
  </div>
)

/* ---------- 3. Chia thể ---------- */
const Conjugate = ({ data }) => (
  <ol className="stack q-list">
    {data.map((d) => (
      <li key={d.text} className="card q">
        <Rich html={d.text} className="jp q-text" />
        <Explain html={d.explain} />
      </li>
    ))}
  </ol>
)

/* ---------- 4. Trắc nghiệm (chấm điểm) ---------- */
function Choice({ data, scoreKey, revealAll }) {
  const { saveScore } = useStore()
  const [pick, setPick] = useState({})
  const done = Object.keys(pick).length
  const score = data.reduce((n, q, i) => n + (pick[i] === q.answer ? 1 : 0), 0)
  useEffect(() => { if (done === data.length) saveScore(scoreKey, score, data.length) }, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="score-bar"><span>Đã làm {done}/{data.length}</span><b>Đúng {score}</b><Progress value={done} total={data.length} /></div>
      <ol className="stack q-list">
        {data.map((q, i) => {
          const shown = pick[i] !== undefined || revealAll
          return (
            <li key={q.q} className="card q">
              <Rich html={q.q} className="jp q-text" />
              <div className="opts">
                {q.options.map((o, j) => {
                  const state = shown ? (j === q.answer ? 'right' : pick[i] === j ? 'wrong' : '') : ''
                  return (
                    <button key={o} type="button" disabled={shown} className={`opt jp ${state}`} onClick={() => setPick((p) => ({ ...p, [i]: j }))}>
                      <b>{'AB'[j]}</b> {o}
                      {state === 'right' && <Icon n="check" size={16} />}{state === 'wrong' && <Icon n="x" size={16} />}
                    </button>
                  )
                })}
              </div>
              {shown && <Rich html={q.explain} className="explain-body shown" />}
            </li>
          )
        })}
      </ol>
      {done === data.length && <div className="card result">Kết quả: <b>{score}/{data.length}</b> {score === data.length ? '— Hoàn hảo!' : '— làm lại để cải thiện nhé.'}</div>}
    </>
  )
}

/* ---------- 5. Tình huống ---------- */
const Scenario = ({ data }) => (
  <ol className="stack q-list">
    {data.map((d, i) => (
      <li key={d.q} className={`card q${d.example ? ' example' : ''}`}>
        <Rich html={d.q} className="jp q-text" />
        {d.example
          ? <div className="ex-answer"><span className="chip">Ví dụ</span><Rich html={d.answer} className="jp" /></div>
          : <><div className="ex-answer"><span className="muted">Đáp án gợi ý:</span> <Ans><span className="jp">{d.answer}</span></Ans></div><Explain html={d.explain} /></>}
      </li>
    ))}
  </ol>
)

/* ---------- 6. Điền từ (kéo thả / chạm) ---------- */
function Fill({ data, scoreKey, revealAll }) {
  const { saveScore } = useStore()
  const [placed, setPlaced] = useState({}) // item index -> bank key
  const [sel, setSel] = useState(null)
  const [checked, setChecked] = useState(false)
  const used = new Set(Object.values(placed))
  const put = (i, key) => { setPlaced((p) => { const n = { ...p }; for (const k in n) if (n[k] === key) delete n[k]; n[i] = key; return n }); setSel(null); setChecked(false) }
  const clickSlot = (i) => (sel ? put(i, sel) : placed[i] && setPlaced(({ [i]: _, ...r }) => r))
  const score = data.items.filter((it, i) => placed[i] === it.answer).length
  const word = (k) => data.bank.find((b) => b.key === k)

  return (
    <>
      <div className="card bank">
        <p className="muted">Chạm một từ rồi chạm ô trống (hoặc kéo thả). Mỗi từ dùng 1 lần — còn thừa {data.bank.length - data.items.length} từ nhiễu.</p>
        <div className="bank-grid">
          {data.bank.map((b) => (
            <button key={b.key} type="button" draggable={!used.has(b.key)} disabled={used.has(b.key)}
              className={`bw${sel === b.key ? ' sel' : ''}`} aria-pressed={sel === b.key}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', b.key)}
              onClick={() => setSel(sel === b.key ? null : b.key)}>
              <b>{b.key}</b><span className="jp">{b.text}</span><small className="vi">{b.vi}</small>
            </button>
          ))}
        </div>
      </div>
      <ol className="stack q-list fill-list">
        {data.items.map((it, i) => {
          const k = revealAll ? it.answer : placed[i]
          const state = checked && placed[i] ? (placed[i] === it.answer ? 'right' : 'wrong') : ''
          return (
            <li key={i} className="card q">
              <div className="jp q-text">
                <Rich as="span" html={it.parts[0]} className="inline" />
                <button type="button" className={`slot jp ${state}${k ? ' filled' : ''}`} aria-label={`Ô trống ${i + 1}`}
                  onClick={() => clickSlot(i)} onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); put(i, e.dataTransfer.getData('text/plain')) }}>
                  {k ? word(k).text : '　　　'}
                </button>
                <Rich as="span" html={it.parts[1]} className="inline" />
              </div>
              <div className="vi muted">{it.vi}</div>
            </li>
          )
        })}
      </ol>
      <div className="card result">
        <button type="button" className="btn primary" onClick={() => { setChecked(true); saveScore(scoreKey, score, data.items.length) }} disabled={!Object.keys(placed).length}>Chấm điểm</button>
        {checked && <span>Đúng <b>{score}/{data.items.length}</b></span>}
      </div>
    </>
  )
}

const KIND = { picture: Picture, reading: Reading, conjugate: Conjugate, choice: Choice, scenario: Scenario, fill: Fill }

/* ---------- list + runner ---------- */
export function ExamList() {
  const lesson = useOutletContext()
  const { scores } = useStore()
  return (
    <div className="grid grid-3">
      {lesson.exams.map((e) => {
        const k = examKinds[e.kind]; const sc = scores[`${lesson.id}:${e.id}`]
        return (
          <Link key={e.id} to={`${e.id}`} className="card exam-card" style={{ '--c': k.color }}>
            <span className="num">{e.id}</span>
            <strong>{k.label}</strong>
            <span className="muted jp small">{e.title}</span>
            <span className="muted">{sc ? `Điểm cao nhất: ${sc.best}/${sc.total}` : k.hint}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function ExamRun() {
  const lesson = useOutletContext()
  const { n } = useParams()
  const nav = useNavigate()
  const dlg = useRef(null)
  const [revealAll, setRevealAll] = useState(false)
  const [round, setRound] = useState(0)
  const idx = lesson.exams.findIndex((e) => String(e.id) === n)
  const exam = lesson.exams[idx]
  useEffect(() => { setRevealAll(false); setRound(0); window.scrollTo(0, 0) }, [n])
  if (!exam) return <p className="empty">Không có đề này. <Link to="..">Quay lại</Link></p>

  const Body = KIND[exam.kind]
  const k = examKinds[exam.kind]
  const go = (d) => nav(`../${lesson.exams[idx + d].id}`, { relative: 'path' })
  return (
    <div className="stack" style={{ '--c': k.color }}>
      <div className="exam-head">
        <div>
          <p className="eyebrow">Dạng {exam.id} / {lesson.exams.length} · {k.label}</p>
          <h2 className="jp">{exam.title}</h2>
        </div>
        <div className="exam-tools">
          <button type="button" className={`pill${revealAll ? ' on' : ''}`} aria-pressed={revealAll} onClick={() => setRevealAll(!revealAll)}><Icon n="eye" size={16} /> Hiện đáp án</button>
          <button type="button" className="pill" onClick={() => { setRound(round + 1); setRevealAll(false) }}><Icon n="redo" size={16} /> Làm lại</button>
          {lesson.scans[idx] && <button type="button" className="pill" onClick={() => dlg.current.showModal()}><Icon n="image" size={16} /> Ảnh đề gốc</button>}
        </div>
      </div>

      <div className={revealAll ? 'reveal-all' : ''} key={`${exam.id}-${round}`}>
        <Body data={exam.data} scoreKey={`${lesson.id}:${exam.id}`} revealAll={revealAll} />
      </div>

      <div className="pager">
        <button type="button" className="btn" disabled={idx === 0} onClick={() => go(-1)}><Icon n="left" /> Dạng trước</button>
        <button type="button" className="btn primary" disabled={idx === lesson.exams.length - 1} onClick={() => go(1)}>Dạng sau <Icon n="right" /></button>
      </div>

      {lesson.scans[idx] && <dialog ref={dlg} className="scan" onClick={(e) => e.target === dlg.current && dlg.current.close()}>
        <button type="button" className="icon-btn close" aria-label="Đóng" onClick={() => dlg.current.close()}><Icon n="x" /></button>
        <img src={img(`assets/${lesson.id}_p${lesson.scans[idx]}.png`)} alt="Ảnh đề bài gốc" />
      </dialog>}
    </div>
  )
}
