import h1 from './handout1.json'

// Add a lesson: run scripts/extract-handout.mjs (or hand-write the same JSON shape) and list it here.
export const lessons = [
  { ...h1, desc: 'Động từ nấu ăn · Kanji N3 · Từ tượng thanh · 7 mẫu ngữ pháp', scans: [1, 2, 3, 3, 4, 5] },
]
export const getLesson = (id) => lessons.find((l) => l.id === id)

export const topics = {
  cooking: { label: 'Động từ nấu ăn', glyph: '料', color: '#EA580C' },
  kanji: { label: 'Kanji N3', glyph: '漢', color: '#4D7C0F' },
  advanced: { label: 'Cụm từ hay gặp', glyph: '句', color: '#0D9488' },
  onomatope: { label: 'Từ tượng thanh', glyph: '音', color: '#E11D48' },
}

export const examKinds = {
  picture: { label: 'Nhìn hình viết động từ', hint: 'Xem tranh, nhớ lại động từ nấu ăn', color: '#EA580C' },
  reading: { label: 'Cách đọc Kanji', hint: 'Đọc Kanji, tự kiểm tra cách đọc', color: '#4D7C0F' },
  conjugate: { label: 'Chia thể từ', hint: 'Chia dạng đúng cho mẫu ngữ pháp', color: '#2563EB' },
  choice: { label: 'Trắc nghiệm chọn từ', hint: 'Chọn đáp án đúng, chấm điểm ngay', color: '#16A34A' },
  scenario: { label: 'Tình huống giao tiếp', hint: 'Nên nói gì trong từng tình huống', color: '#0D9488' },
  fill: { label: 'Từ tượng thanh', hint: 'Kéo/chạm từ thả vào ô trống', color: '#E11D48' },
}
