# JP Ôn Thi

React (Vite) app ôn thi tiếng Nhật: từ vựng theo chủ đề, ngữ pháp riêng, 6–8 dạng đề tự chấm.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ra dist/, mở được từ bất kỳ static host (HashRouter + base './')
```

## Thêm bài mới
1. Tạo `src/data/handoutN.json` cùng cấu trúc với `handout1.json`
   (`vocab`, `grammar`, `exams[6]` với `kind`: picture / reading / conjugate / choice / scenario / fill).
   Bài cũ trích từ HTML bằng `node scripts/extract-handout.mjs ../handoutN.html`.
   Đề viết tay có thể dùng file `.js` (xem `src/data/de2.js`): ký hiệu `{漢字|かんじ}` → furigana, `[[…]]` → ô đáp án ẩn.
   Hai dạng bổ sung: `passage` (đọc hiểu: `heading`, `text[]`, `vi`, `questions[]`) và `listen` (nghe điền: `parts`, `answers[]`, đọc bằng giọng đọc tiếng Nhật của trình duyệt).
2. Thêm vào mảng `lessons` trong `src/data/index.js`; ảnh đề gốc để ở `public/assets/handoutN_pK.png`.

Tiến độ (sao đánh dấu, điểm cao nhất, bật/tắt Furigana/Tiếng Việt) lưu trong `localStorage`.
