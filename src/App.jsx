import { HashRouter, Link, NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { Store, useStore } from './store.jsx'
import { getLesson } from './data'
import { Icon } from './ui.jsx'
import Home from './pages/Home.jsx'
import Overview from './pages/Overview.jsx'
import Vocab from './pages/Vocab.jsx'
import Grammar from './pages/Grammar.jsx'
import { ExamList, ExamRun } from './pages/Exam.jsx'

const Toggle = ({ on, onClick, children }) => (
  <button type="button" className={`pill${on ? ' on' : ''}`} aria-pressed={on} onClick={onClick}>{children}</button>
)

function Shell() {
  const { furi, vi, set } = useStore()
  return (
    <>
      <header className="top">
        <div className="wrap bar">
          <Link to="/" className="brand"><span className="logo">日</span><span>JP Ôn Thi</span></Link>
          <div className="toggles">
            <Toggle on={furi} onClick={() => set({ furi: !furi })}>あ <span>Furigana</span></Toggle>
            <Toggle on={vi} onClick={() => set({ vi: !vi })}>Việt</Toggle>
          </div>
        </div>
      </header>
      <main className="wrap"><Outlet /></main>
      <footer className="wrap foot">JP Ôn Thi · dữ liệu lưu ngay trên trình duyệt của bạn</footer>
    </>
  )
}

function LessonShell() {
  const { lessonId } = useParams()
  const lesson = getLesson(lessonId)
  if (!lesson) return <p className="empty">Không tìm thấy bài này. <Link to="/">Về trang chủ</Link></p>
  const tabs = [['', 'Tổng quan', 'home'], ['vocab', 'Từ vựng', 'book'], ['grammar', 'Ngữ pháp', 'bulb'], ['exam', 'Đề ôn', 'test']]
  return (
    <>
      <div className="lesson-head">
        <Link to="/" className="crumb"><Icon n="left" size={16} /> Tất cả bài</Link>
        <h1 className="jp">{lesson.title}</h1>
      </div>
      <nav className="tabs" aria-label="Mục học">
        {tabs.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === ''} className="tab"><Icon n={icon} size={17} /> {label}</NavLink>
        ))}
      </nav>
      <Outlet context={lesson} />
    </>
  )
}

export default function App() {
  return (
    <Store>
      <HashRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="lesson/:lessonId" element={<LessonShell />}>
              <Route index element={<Overview />} />
              <Route path="vocab" element={<Vocab />} />
              <Route path="grammar" element={<Grammar />} />
              <Route path="exam" element={<ExamList />} />
              <Route path="exam/:n" element={<ExamRun />} />
            </Route>
            <Route path="*" element={<p className="empty">Trang không tồn tại. <Link to="/">Về trang chủ</Link></p>} />
          </Route>
        </Routes>
      </HashRouter>
    </Store>
  )
}
