import { Link } from 'react-router-dom'
import { lessons } from '../data'
import { Icon } from '../ui.jsx'
import { useStore } from '../store.jsx'

export default function Home() {
  const { starred } = useStore()
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Ôn thi tiếng Nhật · N3 / N2</p>
        <h1>Học từ vựng, nắm ngữ pháp,<br />rồi luyện đề mỗi ngày.</h1>
        <p className="lead">Mỗi bài gồm từ vựng theo chủ đề, ngữ pháp riêng và 6 dạng đề tự chấm.</p>
      </section>

      <h2 className="sect">Các bài ôn</h2>
      <div className="stack">
        {lessons.map((l) => {
          const mine = starred.filter((s) => s.startsWith(l.id)).length
          return (
            <Link key={l.id} to={`/lesson/${l.id}`} className="card lesson-card">
              <div>
                <h3 className="jp">{l.title}</h3>
                <p className="muted">{l.desc}</p>
                <div className="chips">
                  <span className="chip"><Icon n="book" size={14} /> {l.vocab.length} từ vựng</span>
                  <span className="chip"><Icon n="bulb" size={14} /> {l.grammar.length} ngữ pháp</span>
                  <span className="chip"><Icon n="test" size={14} /> {l.exams.length} dạng đề</span>
                  {mine > 0 && <span className="chip warm"><Icon n="star" size={14} fill /> {mine} đã đánh dấu</span>}
                </div>
              </div>
              <span className="go">Vào học <Icon n="right" size={18} /></span>
            </Link>
          )
        })}
        <div className="card ghost">Bài tiếp theo (ハンドアウト2, 3, …) sẽ xuất hiện ở đây khi thêm dữ liệu.</div>
      </div>
    </>
  )
}
