// One-off: handout1.html -> src/data/handout1.json + public/svg/ck*.svg
// Usage: node scripts/extract-handout.mjs ../handout1.html
import { JSDOM } from 'jsdom'
import fs from 'node:fs'

const src = process.argv[2] ?? '../handout1.html'
const { document: d } = new JSDOM(fs.readFileSync(src, 'utf8')).window
const $ = (r, s) => r.querySelector(s)
const $$ = (r, s) => [...r.querySelectorAll(s)]

// <button onclick="speakText('..')"> -> <button class="speak" data-say="..">; <span.ans onclick> -> <span.ans>
function clean(el) {
  const c = el.cloneNode(true)
  $$(c, '[onclick]').forEach((n) => {
    const m = /speakText\('([^']*)'\)/.exec(n.getAttribute('onclick'))
    n.removeAttribute('onclick')
    if (m) {
      n.className = 'speak'
      n.setAttribute('data-say', m[1])
      n.setAttribute('aria-label', 'Phát âm')
      n.textContent = ''
    }
  })
  $$(c, '[style]').forEach((n) => n.removeAttribute('style'))
  $$(c, '[tabindex]').forEach((n) => n.removeAttribute('tabindex'))
  $$(c, '.ans').forEach((n) => { n.setAttribute('role', 'button'); n.setAttribute('tabindex', '0') })
  return c.innerHTML.trim().replace(/いmi/g, 'いみ')
}
const text = (el) => el?.textContent.trim().replace(/\s+/g, ' ') ?? ''

// ---- vocab ----
const vocab = $$(d, '#vocabGrid .bento-card').map((c) => ({
  id: c.dataset.id,
  cat: c.dataset.cat,
  word: text($(c, '.card-kanji')),
  reading: text($(c, '.card-hiragana')),
  tags: $$(c, '.badge-tag').map(text),
  meaning: text($(c, '.card-meaning')),
  exJp: clean($(c, '.ex-jp')),
  exVi: text($(c, '.ex-vi')),
}))

// ---- grammar ----
const grammar = $$(d, '.grammar-box').map((g) => {
  $$(g, '.g-ex-row').forEach((row) => {
    const first = row.firstElementChild
    const inner = [...first.children].filter((x) => x.tagName === 'DIV' && !x.classList.contains('vi'))
    ;(inner[0] ?? first).classList.add('g-jp')
  })
  return {
    pattern: text($(g, '.g-pattern')),
    tag: text($(g, '.g-meaning-tag')),
    body: clean($(g, '.g-body')),
  }
})

// ---- exams ----
const sec = (n) => $(d, `#mondai${n}`)
const title = (n) => text($(sec(n), '.section-title span'))
const ans = (el) => clean(el)

// 1: picture -> verb
fs.mkdirSync('public/svg', { recursive: true })
const m1 = $$(sec(1), '.cooking-card').map((c, i) => {
  fs.writeFileSync(`public/svg/ck${i + 1}.svg`, $(c, '.c-pic svg').outerHTML)
  return {
    img: `svg/ck${i + 1}.svg`,
    vi: text($(c, '.c-num .vi')),
    viShort: text($(c, '.c-viet')),
    sentence: clean($(c, '.c-sentence')),
    hint: text($(c, '.c-hint')),
  }
})

// 2: kanji reading
const m2 = $$(sec(2), '.kanji-card').map((c) => ({
  kanji: text($(c, '.k-kanji')),
  meaning: text($(c, '.k-meaning')),
  reading: text($(c, '.k-reading')),
}))

// 3: conjugation
const m3 = $$(sec(3), '.q-item').map((q) => ({
  text: clean($(q, '.q-text')).replace(/^\d+\.\s*/, ''),
  explain: clean($(q, '.q-explain')),
}))

// 4: multiple choice
const m4 = $$(sec(4), '.mc-item').map((q) => ({
  q: clean($(q, '.mc-header')).replace(/^\d+\.\s*/, ''),
  options: $$(q, '.mc-choice').map((o) => text(o).replace(/^[AB]\.\s*/, '')),
  answer: $$(q, '.mc-choice').findIndex((o) => o.classList.contains('correct')),
  explain: clean($(q, '.q-explain')),
}))

// 5: scenarios (first card is the worked example)
const m5 = $$(sec(5), '.scenario-card').map((c, i) => {
  const a = $(c, '.scenario-answer')
  const hasAns = $(a, '.ans')
  return {
    example: i === 0,
    q: clean($(c, '.scenario-header')).replace(/^<strong>(例）|\d+\.)<\/strong>\s*/, ''),
    answer: i === 0 ? clean(a).replace(/^→\s*/, '') : ans(hasAns),
    explain: i === 0 ? '' : clean($(c, '.q-explain')),
  }
})

// 6: word bank + fill
const m6 = {
  bank: $$(sec(6), '.bank-word').map((w) => ({
    key: w.dataset.key,
    text: text($(w, '.bw-text')),
    vi: w.dataset.vi,
  })),
  items: $$(sec(6), '.fill-item').map((f) => {
    const slot = $(f, '.slot')
    const before = clean($(f, 'div')).split(/<span class="slot"[^>]*><\/span>/)
    return {
      parts: before.map((p) => p.replace(/^[①-⑩]\s*/, '').replace(/（\s*$/, '').replace(/^\s*）/, '')),
      answer: slot.dataset.answer,
      vi: text($(f, '.fill-meaning')),
    }
  }),
}

const out = {
  id: 'handout1',
  title: 'ハンドアウト1: 復習・オノマトペ',
  vocab,
  grammar,
  exams: [
    { id: 1, kind: 'picture', title: title(1), data: m1 },
    { id: 2, kind: 'reading', title: title(2), data: m2 },
    { id: 3, kind: 'conjugate', title: title(3), data: m3 },
    { id: 4, kind: 'choice', title: title(4), data: m4 },
    { id: 5, kind: 'scenario', title: title(5), data: m5 },
    { id: 6, kind: 'fill', title: title(6), data: m6 },
  ],
}
fs.mkdirSync('src/data', { recursive: true })
fs.writeFileSync('src/data/handout1.json', JSON.stringify(out, null, 1))
console.log({ vocab: vocab.length, grammar: grammar.length, m1: m1.length, m2: m2.length, m3: m3.length, m4: m4.length, m5: m5.length, m6: m6.items.length })
