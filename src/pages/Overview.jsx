import { Link, useOutletContext } from 'react-router-dom'
import { examKinds, topics } from '../data'
import { Icon } from '../ui.jsx'
import { useStore } from '../store.jsx'

export default function Overview() {
  const lesson = useOutletContext()
  const { scores, starred } = useStore()
  const count = (cat) => lesson.vocab.filter((v) => v.cat === cat).length

  return (
    <div className="stack gap-lg">
      <section>
        <div className="sect-row"><h2 className="sect"><Icon n="book" /> Từ vựng theo chủ đề</h2><Link to="vocab" className="link">Xem tất cả</Link></div>
        <div className="grid grid-4">
          {Object.entries(topics).filter(([k]) => count(k)).map(([k, t]) => (
            <Link key={k} to={`vocab?cat=${k}`} className="card topic" style={{ '--c': t.color }}>
              <span className="glyph jp">{t.glyph}</span>
              <strong>{t.label}</strong>
              <span className="muted">{count(k)} từ</span>
            </Link>
          ))}
        </div>
        {starred.some((s) => s.startsWith(lesson.id)) && (
          <p className="muted note"><Link to="vocab?cat=starred" className="link">Ôn lại các từ đã đánh dấu</Link></p>
        )}
      </section>

      <section>
        <div className="sect-row"><h2 className="sect"><Icon n="bulb" /> Ngữ pháp</h2><Link to="grammar" className="link">Xem tất cả</Link></div>
        <div className="card list-card">
          {lesson.grammar.map((g, i) => (
            <Link key={g.pattern} to={`grammar#g${i}`} className="row-link">
              <span className="jp">{g.pattern}</span><Icon n="right" size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="sect-row"><h2 className="sect"><Icon n="test" /> {lesson.exams.length} dạng đề ôn</h2><Link to="exam" className="link">Xem tất cả</Link></div>
        <div className="grid grid-3">
          {lesson.exams.map((e) => {
            const k = examKinds[e.kind]
            const sc = scores[`${lesson.id}:${e.id}`]
            return (
              <Link key={e.id} to={`exam/${e.id}`} className="card exam-card" style={{ '--c': k.color }}>
                <span className="num">{e.id}</span>
                <strong>{k.label}</strong>
                <span className="muted">{sc ? `Điểm cao nhất: ${sc.best}/${sc.total}` : k.hint}</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
