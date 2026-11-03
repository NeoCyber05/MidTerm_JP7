// Ngữ pháp + từ vựng bổ sung theo tài liệu "Ôn tập Giữa kì Nhật 7"
// (Sách 4 – Kaiwa ni Chousen: bài 2,3,4,5,8,9,12,13 · Sách 6: bài 2,3).
import { G, rb } from './fmt.js'

export const grammar = [
  // ---------- Sách 4 ----------
  G('Sách 4 · Bài 3 — ～てもらえない？ / ～ていただけませんか', 'Nhờ vả: thân mật với bạn ↔ lịch sự với cấp trên',
    'Mở đầu bằng lý do <code>～んだけど / ～んですが</code> rồi nhờ. Với bạn bè dùng <em>～てもらえない？ / ～てくれない？</em>; với thầy cô, cấp trên dùng <em>～ていただけませんか / ～てもらえませんか / ～てくださいませんか / ～てくれませんか</em>.',
    '友達: ～んだけど、～てもらえない？ ／ 上司: ～んですが、～ていただけませんか。',
    [
      ['{明日|あした}{引|ひ}っ{越|こ}しするんだけど、<span>{手伝|てつだ}ってもらえない？</span>', 'Mai tớ chuyển nhà, cậu phụ tớ một tay được không?'],
      ['{日本語|にほんご}の{使|つか}い{方|かた}が{分|わ}からないんですが、<span>{教|おし}えてくださいませんか</span>。', 'Em chưa hiểu cách dùng chỗ này, thầy dạy giúp em được không ạ?'],
    ]),
  G('Sách 4 · Bài 3 — ～ない？ / ～ませんか · ご一緒にいかがですか · ～かと思って', 'Rủ rê, gợi ý đi cùng, nêu ý định nhẹ nhàng',
    'Rủ bạn: <em>～ない？ / ～（よ）う</em>, gợi ý đi cùng: <em>一緒にどう？</em>. Với cấp trên: <em>～ませんか / ご一緒にいかがですか</em>. Nêu lý do mời nhẹ nhàng: <em>～かと思って（まして）</em>.',
    '友達: ～ない？ / 一緒にどう？ ／ 上司: ～ませんか / ご一緒にいかがですか',
    [
      ['{今日|きょう}、{仕事|しごと}の{後|あと}で{飲|の}みに<span>{行|い}かない？</span>', 'Hôm nay tan làm đi nhậu không?'],
      ['これからカラオケに{行|い}くんですが、{先生|せんせい}も<span>ご{一緒|いっしょ}にいかがですか</span>。', 'Bọn em sắp đi karaoke, thầy đi cùng được không ạ?'],
      ['{先生|せんせい}もお{酒|さけ}がお{好|す}きか<span>と{思|おも}いまして</span>。', 'Em nghĩ chắc thầy cũng thích uống rượu ạ.'],
    ]),
  G('Sách 4 · Bài 4 — ～もの（だ/です）から · ～ので · ～ことになっていて · ～て', 'Nêu lý do khi từ chối lời mời',
    'Lý do khách quan: <em>～もんだから / ～ものですから</em>. Lý do thông thường: <em>～から / ～んだ</em> (bạn) ↔ <em>～ので / ～んです</em> (cấp trên). Lịch đã định sẵn: <em>～ことになっていて / ～ことになっていまして</em>. Lý do nối tiếp: <em>～て</em>.',
    'V(普通形) + もの（です）から ／ V-る + ことになっていまして ／ V-て、…',
    [
      ['{用事|ようじ}がある<span>ものですから</span>…。', 'Vì em có chút việc bận ạ…'],
      ['その{日|ひ}は{友達|ともだち}が{来|く}る<span>ことになっていまして</span>…。', 'Hôm đó em đã có hẹn bạn đến chơi rồi ạ…'],
      ['{風邪|かぜ}を{引|ひ}い<span>て</span>、{調子|ちょうし}が{悪|わる}くて…。', 'Em bị cảm, người không được khỏe…'],
    ]),
  G('Sách 4 · Bài 5 — 気にすることないよ · だれにだってあるよ · わざと～たんじゃないんだから', 'Tiếp nhận cảm xúc, an ủi & động viên bạn',
    'Tiếp nhận: <em>そうなんだ / 大変だったね / わかるよ、～の気持ち / ほんと</em>. An ủi – động viên: <em>気にすることないよ</em>, <em>だれ（に）だってあるよ</em>, <em>わざと～たんじゃないんだから</em>, <em>わたしなんて、何回～か分からないよ</em>, <em>～ば分かってくれるよ</em>, <em>大したことないよ</em>, <em>元気出して</em>.',
    '～なんて、だれにだってあるよ ／ わざと + V-た + んじゃないんだから',
    [
      ['{終|お}わったことだから、<span>{気|き}にすることないよ</span>。', 'Chuyện qua rồi, không có gì phải bận tâm đâu.'],
      ['{失敗|しっぱい}なんて、<span>だれにだってある</span>よ。', 'Thất bại thì ai mà chẳng có lúc.'],
      ['<span>わざと{壊|こわ}したんじゃないんだから</span>、{大丈夫|だいじょうぶ}だよ。', 'Đâu phải cậu cố ý làm hỏng, không sao đâu.'],
      ['ちゃんと{理由|りゆう}を{話|はな}して{謝|あやま}れば<span>{分|わ}かってくれる</span>よ。', 'Cứ giải thích lý do rồi xin lỗi là người ta hiểu thôi.'],
    ]),
  G('Sách 4 · Bài 12 — お～してもよろしいでしょうか · ～（さ）せていただけませんか', 'Xin phép (đổi lịch, về sớm…) với cấp trên / bạn bè',
    'Cấp trên: <em>Lý do + ので</em> + <em>お～してもよろしいでしょうか / ～（さ）せていただけませんか / ～（さ）せていただきたいんですが / ～（さ）せてもらえませんか</em>. Bạn bè: <em>Lý do + から</em> + <em>～てもいい？ / ～てもいいかなあ / ～（さ）せてもらえない？</em>.',
    '理由ので + V(使役)て + いただけませんか ／ 理由から + V-て + もいい？',
    [
      ['{熱|ねつ}があるので、{今日|きょう}は<span>{休|やす}ませていただけませんか</span>。', 'Em bị sốt nên hôm nay cho em nghỉ được không ạ?'],
      ['{用事|ようじ}があるので、<span>お{先|さき}に{失礼|しつれい}してもよろしいでしょうか</span>。', 'Em có việc bận, em xin phép về trước được không ạ?'],
      ['{明日|あした}テストだから、{早|はや}く<span>{帰|かえ}ってもいい？</span>', 'Mai có bài kiểm tra, tớ về sớm được không?'],
    ]),
  G('Sách 4 · Bài 13 — お忙しいところ申し訳ありませんが、～ていただけないでしょうか', 'Lời rào đón (前置き) + nhờ vả lịch sự',
    'Trước khi nhờ có thể nói: <em>お忙しいところ申し訳ありませんが</em> (xin lỗi vì làm phiền lúc bận), <em>お手数をおかけしますが</em> (phiền anh/chị mất công một chút), <em>大変言いにくいのですが</em> (rất khó nói nhưng…). Sau đó: <em>～ていただけませんか / ～ていただきたいんですが / ～ていただけないでしょうか</em>.',
    '前置き + 理由ので + V-て + いただけないでしょうか',
    [
      ['お{忙|いそが}しいところ{申|もう}し{訳|わけ}ありませんが、{推薦状|すいせんじょう}を<span>{書|か}いていただけないでしょうか</span>。', 'Xin lỗi đã làm phiền lúc thầy bận, thầy viết giúp em thư giới thiệu được không ạ?'],
      ['お{手数|てすう}をおかけしますが、もう{一度|いちど}<span>{確認|かくにん}していただけませんか</span>。', 'Phiền anh mất công một chút, anh kiểm tra lại giúp em được không ạ?'],
    ]),
  // ---------- Sách 6 · Bài 2 ----------
  G('Sách 6 · Bài 2 — V-る + のに、～', 'Để V thì… (mục đích, công dụng)',
    'Diễn tả một hành động, đồ vật hay địa điểm phục vụ cho mục đích nào đó. Vế sau thường là <em>必要だ / 便利だ / かかる / 使う</em>.',
    'V-る + のに + 必要だ / 便利だ / （時間・お金が）かかる',
    [
      ['{東京|とうきょう}で<span>{生活|せいかつ}するのに</span>{一|いっ}か{月|げつ}いくらぐらい{必要|ひつよう}ですか。', 'Để sinh sống ở Tokyo thì mỗi tháng cần khoảng bao nhiêu tiền?'],
      ['{銀行|ぎんこう}で{口座|こうざ}を<span>{作|つく}るのに</span>、{身分証明書|みぶんしょうめいしょ}が{必要|ひつよう}です。', 'Để mở tài khoản ngân hàng thì cần giấy tờ tùy thân.'],
    ]),
  G('Sách 6 · Bài 2 — N + に関係なく', 'Bất kể N, không phụ thuộc vào N',
    'Hành động/sự việc ở vế sau xảy ra mà không bị chi phối bởi điều kiện, yếu tố ở danh từ phía trước.',
    'N + に関係なく',
    [
      ['{性別|せいべつ}<span>に{関係|かんけい}なく</span>{仕事|しごと}のできる{人|ひと}をとりたいと{思|おも}います。', 'Tôi muốn tuyển người làm được việc, không phân biệt giới tính.'],
      ['この{料理教室|りょうりきょうしつ}は、{年齢|ねんれい}<span>に{関係|かんけい}なく</span>だれでも{参加|さんか}できます。', 'Lớp học nấu ăn này ai cũng tham gia được, bất kể tuổi tác.'],
    ]),
  G('Sách 6 · Bài 2 — V普通形・Aい・Aな・Nの + ために', 'Do, vì… (nguyên nhân khách quan)',
    'Diễn tả nguyên nhân dẫn đến một kết quả khách quan đã hoặc đang thực sự xảy ra. Văn phong hơi trang trọng.',
    'V-た / Aい / Aな / Nの + ために、～',
    [
      ['{競争|きょうそう}が{激|はげ}しくなった<span>ために</span>、{新|あたら}しいサービスが{出|で}てきている。', 'Vì cạnh tranh trở nên khốc liệt, nhiều dịch vụ mới đang xuất hiện.'],
      ['{事故|じこ}があった<span>ために</span>、{電車|でんしゃ}が{遅|おく}れました。', 'Do có tai nạn nên tàu điện bị trễ.'],
    ]),
  G('Sách 6 · Bài 2 — ～てくる 〈変化〉', 'Sự biến đổi từ quá khứ đến hiện tại',
    'Thay đổi đã bắt đầu trong quá khứ và tiếp diễn đến hiện tại. Hay đi với: <em>最近、だんだん、少しずつ、数年、～から、～て以来、急に</em>.',
    'V-て + くる（きた / きました）',
    [
      ['{子|こ}どもの{数|かず}がだんだん{少|すく}なくなっ<span>てきました</span>。', 'Số lượng trẻ em đang dần dần ít đi.'],
      ['{最近|さいきん}、{日本|にほん}の{生活|せいかつ}に{慣|な}れ<span>てきた</span>。', 'Gần đây tôi đã dần quen với cuộc sống ở Nhật.'],
    ]),
  G('Sách 6 · Bài 2 — ～ていく 〈変化〉', 'Sự biến đổi tiếp diễn trong tương lai',
    'Trạng thái sẽ tiếp tục thay đổi từ hiện tại hướng tới tương lai. Hay đi với: <em>これから、今後、将来、未来、どんどん、ますます</em>.',
    'V-て + いく（いきます / いくでしょう）',
    [
      ['{冬|ふゆ}も{終|お}わりです。これからどんどん{暖|あたた}かくなっ<span>ていきます</span>。', 'Mùa đông kết thúc rồi. Từ giờ trời sẽ dần ấm lên.'],
      ['{今後|こんご}、{外国人|がいこくじん}の{観光客|かんこうきゃく}はますます{増|ふ}え<span>ていく</span>でしょう。', 'Từ nay về sau, khách du lịch nước ngoài sẽ ngày càng tăng.'],
    ]),
  // ---------- Sách 6 · Bài 3 ----------
  G('Sách 6 · Bài 3 — N + として', 'Với tư cách là / Là N…',
    'Đứng sau danh từ để biểu thị tư cách, vai trò, lập trường hoặc thân phận của người, vật, địa danh.',
    'N + として',
    [
      ['{京都|きょうと}は{日本|にほん}の{都|みやこ}<span>として</span>、{長|なが}い{間|あいだ}{歴史|れきし}の{中心|ちゅうしん}でした。', 'Kyoto với tư cách là thủ đô của Nhật, từng là trung tâm lịch sử trong thời gian dài.'],
      ['{私|わたし}は{留学生|りゅうがくせい}<span>として</span>{日本|にほん}に{来|き}ました。', 'Tôi đến Nhật với tư cách là du học sinh.'],
    ]),
  G('Sách 6 · Bài 3 — ～のは、～からだ', 'Sở dĩ… là vì…',
    'Đưa kết quả/hiện tượng lên đầu câu (vế <em>のは</em>) để nhấn mạnh, vế sau giải thích nguyên nhân (vế <em>からだ</em>).',
    'V普通形・Aい・Aな／Nな + のは、～からだ',
    [
      ['{力|ちから}が{出|で}ない<span>のは</span>、{朝|あさ}ご{飯|はん}を{食|た}べなかった<span>からだ</span>。', 'Sở dĩ không có chút sức lực nào là vì đã không ăn sáng.'],
    ]),
  G('Sách 6 · Bài 3 — V-る・V-ない + ように、～', 'Để / sao cho V… (hướng tới trạng thái mong muốn)',
    'Chỉ mục đích hướng tới một trạng thái (thường đi với động từ khả năng, tự động từ, thể phủ định); vế sau là hành động cụ thể để đạt được điều đó.',
    'V-る（可能形・自動詞）／ V-ない + ように',
    [
      ['{忘|わす}れない<span>ように</span>メモをしておきましょう。', 'Hãy ghi chép lại để không bị quên.'],
      ['{後|うし}ろの{人|ひと}にも{聞|き}こえる<span>ように</span>、{大|おお}きい{声|こえ}で{話|はな}してください。', 'Hãy nói to để cả người phía sau cũng nghe được.'],
    ]),
  G('Sách 6 · Bài 3 — N・V普通形 + という点で、～', 'Xét về mặt / Ở điểm là…',
    'Nhấn mạnh vào một khía cạnh, tiêu chí cụ thể để đưa ra nhận xét, đánh giá hay so sánh ở vế sau.',
    'N / V普通形 + という点で',
    [
      ['この{学校|がっこう}は、{国際化|こくさいか}<span>という{点|てん}で</span>、ほかの{学校|がっこう}より{進|すす}んでいる。', 'Ngôi trường này xét về mặt quốc tế hóa thì tiến bộ hơn các trường khác.'],
    ]),
  G('Sách 6 · Bài 3 — N + によって、～', 'Tùy vào N mà…',
    'Sự vật, kết quả, phương pháp hay tính chất có sự khác biệt tương ứng tùy theo từng đối tượng, hoàn cảnh.',
    'N + によって + 違う / 異なる / さまざまだ',
    [
      ['{同|おな}じ{料理|りょうり}でも{作|つく}る{人|ひと}<span>によって</span>{味|あじ}が{違|ちが}う。', 'Cùng một món nhưng tùy người nấu mà hương vị khác nhau.'],
    ]),
  G('Sách 6 · Bài 3 — ～と言われている', 'Người ta cho rằng / Tương truyền rằng…',
    'Truyền đạt quan điểm, nhận định chung, kiến thức phổ thông hoặc lời đồn rộng rãi mà không chỉ đích danh ai.',
    'V普通形・Aい・Aな／Nだ + と言われている',
    [
      ['たばこはガンの{原因|げんいん}になる<span>と{言|い}われている</span>。', 'Hút thuốc lá được cho là nguyên nhân dẫn đến ung thư.'],
      ['このお{祭|まつ}りは{千年|せんねん}{以上前|いじょうまえ}に{始|はじ}まった<span>と{言|い}われています</span>。', 'Tương truyền lễ hội này bắt đầu từ hơn nghìn năm trước.'],
    ]),
]

// Từ vựng Sách 4 (bài 4, 5, 9) chưa có trong handout1.
const V = (id, word, reading, tags, meaning, exJp, exVi) => ({ id, cat: 'kaiwa', word, reading, tags, meaning, exJp: rb(exJp), exVi })
export const vocab = [
  V('k1', '誘い', 'さそい', ['Bài 4', 'Danh từ'], 'Lời mời, lời rủ rê', 'せっかくのお<strong>誘い</strong>ですが、その日は用事があるんです。', 'Lời mời quý quá nhưng hôm đó em có việc mất rồi.'),
  V('k2', '倉庫', 'そうこ', ['Bài 4', 'Danh từ'], 'Nhà kho', '古い机を<strong>倉庫</strong>に運んでください。', 'Hãy chuyển cái bàn cũ vào nhà kho.'),
  V('k3', '電子辞書', 'でんしじしょ', ['Bài 4', 'Danh từ'], 'Từ điển điện tử', '<strong>電子辞書</strong>を貸してもらえない？', 'Cho tớ mượn từ điển điện tử được không?'),
  V('k4', '風邪', 'かぜ', ['Bài 4', 'Danh từ'], 'Cảm, cúm', '<strong>風邪</strong>を引いて、調子が悪いんです。', 'Em bị cảm nên người không được khỏe.'),
  V('k5', '調子', 'ちょうし', ['Bài 4', 'Danh từ'], 'Tình trạng (sức khỏe, máy móc)', '今日は体の<strong>調子</strong>がいいです。', 'Hôm nay thể trạng tốt.'),
  V('k6', '申し訳ない', 'もうしわけない', ['Bài 4', 'Tính từ い'], 'Rất xin lỗi, thật có lỗi', '<strong>申し訳ありません</strong>が、明日は参加できません。', 'Em rất xin lỗi nhưng mai em không tham gia được.'),
  V('k7', 'カジュアル（な）', 'かじゅある', ['Bài 4', 'Tính từ な'], 'Suồng sã, thân mật (casual)', '友達には<strong>カジュアルな</strong>言い方で断ります。', 'Với bạn bè thì từ chối bằng cách nói thân mật.'),
  V('k8', '応じる', 'おうじる', ['Bài 4', 'Động từ nhóm 2'], 'Ứng với, tùy theo; đáp lại', '相手に<strong>応じて</strong>、言葉を変えます。', 'Thay đổi cách nói tùy theo đối phương.'),
  V('k9', '慰める', 'なぐさめる', ['Bài 5', 'Động từ nhóm 2'], 'An ủi, vỗ về', '試験に落ちた友達を<strong>慰めました</strong>。', 'Tôi đã an ủi người bạn thi trượt.'),
  V('k10', '励ます', 'はげます', ['Bài 5', 'Động từ nhóm 1'], 'Động viên, khích lệ', 'みんなが<strong>励まして</strong>くれたので、頑張れました。', 'Nhờ mọi người động viên nên tôi đã cố gắng được.'),
  V('k11', '受け止める', 'うけとめる', ['Bài 5', 'Động từ nhóm 2'], 'Tiếp nhận, lắng nghe (cảm xúc của người khác)', 'まず相手の気持ちを<strong>受け止めましょう</strong>。', 'Trước hết hãy tiếp nhận cảm xúc của đối phương.'),
  V('k12', 'くよくよする', 'くよくよする', ['Bài 5', 'Từ láy'], 'Băn khoăn, lo âu, buồn phiền mãi', 'いつまでも<strong>くよくよしない</strong>で。', 'Đừng buồn phiền mãi thế.'),
  V('k13', '気にする', 'きにする', ['Bài 5', 'Cụm động từ'], 'Để tâm, bận tâm', '<strong>気にする</strong>ことないよ。', 'Không có gì phải bận tâm đâu.'),
  V('k14', '元気を出す', 'げんきをだす', ['Bài 5', 'Cụm động từ'], 'Vui lên, phấn chấn lên', '落ち込んでないで、<strong>元気出して</strong>！', 'Đừng ủ rũ nữa, vui lên nào!'),
  V('k15', '謝る', 'あやまる', ['Bài 5', 'Động từ nhóm 1'], 'Xin lỗi', 'ちゃんと理由を話して<strong>謝れば</strong>分かってくれるよ。', 'Cứ giải thích lý do rồi xin lỗi là người ta hiểu thôi.'),
  V('k16', '気晴らしをする', 'きばらしをする', ['Bài 5', 'Cụm động từ'], 'Giải khuây, đổi gió', 'たまには映画でも見て<strong>気晴らしをしよう</strong>。', 'Thỉnh thoảng đi xem phim cho khuây khỏa đi.'),
  V('k17', '傷を付ける', 'きずをつける', ['Bài 5', 'Cụm động từ'], 'Làm trầy xước, làm hỏng', '借りた本に<strong>傷を付けて</strong>しまった。', 'Lỡ làm trầy cuốn sách đã mượn mất rồi.'),
  V('k18', 'わざと', 'わざと', ['Bài 5', 'Phó từ'], 'Cố ý, cố tình', '<strong>わざと</strong>壊したんじゃないんだから、大丈夫だよ。', 'Đâu phải cố ý làm hỏng, không sao đâu.'),
  V('k19', '防犯登録', 'ぼうはんとうろく', ['Bài 9', 'Danh từ'], 'Đăng ký chống trộm xe đạp (thủ tục khi mua xe)', '自転車を買ったら、<strong>防犯登録</strong>をします。', 'Mua xe đạp xong thì làm đăng ký chống trộm.'),
  V('k20', '身分証明書', 'みぶんしょうめいしょ', ['Bài 9', 'Danh từ'], 'Giấy tờ tùy thân (thẻ cư trú, bằng lái, CCCD)', '<strong>身分証明書</strong>を見せてください。', 'Xin cho xem giấy tờ tùy thân.'),
  V('k21', '紛失届', 'ふんしつとどけ', ['Bài 9', 'Danh từ'], 'Đơn khai báo mất đồ', '交番で<strong>紛失届</strong>を出しました。', 'Tôi đã nộp đơn báo mất ở đồn cảnh sát.'),
  V('k22', '放置自転車保管所', 'ほうちじてんしゃほかんじょ', ['Bài 9', 'Danh từ'], 'Nơi tạm giữ xe đạp đỗ trái quy định', '自転車は<strong>放置自転車保管所</strong>にありました。', 'Xe đạp nằm ở bãi tạm giữ xe đỗ sai quy định.'),
]
