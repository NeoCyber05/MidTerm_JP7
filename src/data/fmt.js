// Compact authoring notation for hand-written lessons:
//   {漢字|かんじ} -> <ruby>漢字<rt>かんじ</rt></ruby>
//   [[...]]       -> tap-to-reveal answer blank (.ans)
export const rb = (s) => s
  .replace(/\{([^|{}]+)\|([^{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
  .replace(/\[\[(.+?)\]\]/g, '<span class="ans" role="button" tabindex="0">$1</span>')

// Text for speech / matching: drop furigana, blanks markers and tags.
export const plain = (s) => s
  .replace(/\{([^|{}]+)\|[^{}]+\}/g, '$1')
  .replace(/\[\[(.+?)\]\]/g, '$1')
  .replace(/<[^>]+>/g, '')

export const deep = (o) => typeof o === 'string' ? rb(o)
  : Array.isArray(o) ? o.map(deep)
  : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, k === 'say' || k === 'answers' ? v : deep(v)]))
  : o

// Grammar card in the same HTML shape as handout1.json.
export const G = (pattern, tag, desc, formula, examples) => ({
  pattern,
  tag,
  body: `<div class="g-desc">${desc}</div>`
    + `<div class="g-formula-box">📌 <strong>Công thức:</strong> <code>${formula}</code></div>`
    + `<div class="g-examples-wrap">${examples.map(([jp, vi]) => `<div class="g-ex-row"><div><div class="g-jp">${rb(jp)}</div><div class="vi">→ ${vi}</div></div><button class="speak" data-say="${plain(jp)}" aria-label="Phát âm"></button></div>`).join('')}</div>`,
})
