import h1 from './handout1.json'
import de2 from './de2.js'
import de3 from './de3.js'
import * as midterm from './midterm.js'

// Add a lesson: run scripts/extract-handout.mjs (or hand-write the same JSON shape) and list it here.
export const lessons = [
  { ...h1, desc: 'Động từ nấu ăn · Kanji N3 · Triệu chứng bệnh · 7 mẫu ngữ pháp', scans: [1, 2, 3, 3, 4] },
  // Đề ôn giữa kì: dùng lại từ vựng hệ thống + từ vựng/ngữ pháp từ tài liệu ôn tập (Sách 4 & Sách 6).
  ...[de2, de3].map((d) => ({
    ...d,
    vocab: [...h1.vocab, ...midterm.vocab],
    grammar: midterm.grammar,
    scans: [],
    desc: 'Đề luyện giữa kì · 8 dạng: thêm Đọc hiểu & Nghe điền · Ngữ pháp Sách 4 & Sách 6',
  })),
]
export const getLesson = (id) => lessons.find((l) => l.id === id)

export const topics = {
  cooking: { label: 'Động từ nấu ăn', glyph: '料', color: '#EA580C' },
  kanji: { label: 'Kanji N3', glyph: '漢', color: '#4D7C0F' },
  advanced: { label: 'Cụm từ hay gặp', glyph: '句', color: '#0D9488' },
  symptom: { label: 'Triệu chứng bệnh', glyph: '症', color: '#7C3AED' },
  kaiwa: { label: 'Hội thoại & thủ tục', glyph: '話', color: '#DB2777' },
}

export const examKinds = {
  picture: { label: 'Nhìn hình viết động từ', hint: 'Xem tranh, nhớ lại động từ nấu ăn', color: '#EA580C' },
  reading: { label: 'Cách đọc Kanji', hint: 'Đọc Kanji, tự kiểm tra cách đọc', color: '#4D7C0F' },
  conjugate: { label: 'Chia thể từ', hint: 'Chia dạng đúng cho mẫu ngữ pháp', color: '#2563EB' },
  choice: { label: 'Trắc nghiệm chọn từ', hint: 'Chọn đáp án đúng, chấm điểm ngay', color: '#16A34A' },
  scenario: { label: 'Tình huống giao tiếp', hint: 'Nên nói gì trong từng tình huống', color: '#0D9488' },
  fill: { label: 'Điền từ vào chỗ trống', hint: 'Kéo/chạm từ thả vào ô trống', color: '#E11D48' },
  passage: { label: 'Đọc hiểu', hint: 'Đọc đoạn văn, trả lời câu hỏi', color: '#9333EA' },
  listen: { label: 'Nghe và điền', hint: 'Nghe câu, gõ lại phần còn thiếu', color: '#0891B2' },
}
