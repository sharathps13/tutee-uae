// UAE news line — GET /api/news
// Reads public RSS feeds, keeps student-relevant UAE headlines and returns
// { updated, items: [{ title, link, source, date }] }. Only headline, link,
// source and date are passed on (never article text); readers click through.
// Netlify's CDN caches the answer for 30 minutes, so the feeds are read at
// most twice an hour however many people open the page.
//
// Feeds: env NEWS_FEEDS, one per line "Name|https://feed-url". Without it the
// Google News search feeds below are used. Optional env NEWS_KEYWORDS (comma list).

const DEFAULT_FEEDS = [
  'Google News|https://news.google.com/rss/search?q=UAE+(university+OR+universities+OR+students+OR+%22student+visa%22+OR+%22golden+visa%22+OR+KHDA+OR+CAA)+when:7d&hl=en-AE&gl=AE&ceid=AE:en',
  'Google News|https://news.google.com/rss/search?q=Dubai+(university+OR+students+OR+education+OR+residence+visa)+when:7d&hl=en-AE&gl=AE&ceid=AE:en'
];
const DEFAULT_KEYWORDS = 'student,students,university,universities,college,campus,education,scholarship,visa,residence,golden,khda,caa,graduate,graduates,study,studying,academic,school,degree,admission,tuition,work permit,mohre,emirates id,ica';

const MAX = 12;
let memo = { at: 0, body: '' };

export default async (req) => {
  const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300', 'netlify-cdn-cache-control': 'public, s-maxage=1800, stale-while-revalidate=3600' };
  if (memo.body && Date.now() - memo.at < 15 * 60 * 1000) return new Response(memo.body, { headers });
  const feeds = String(process.env.NEWS_FEEDS || DEFAULT_FEEDS.join('\n')).split(/\n|;/).map(l => l.trim()).filter(Boolean)
    .map(l => { const i = l.indexOf('|'); return { name: l.slice(0, i).trim(), url: l.slice(i + 1).trim() }; })
    .filter(f => /^https:\/\//.test(f.url));
  const kw = String(process.env.NEWS_KEYWORDS || DEFAULT_KEYWORDS).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  const lists = await Promise.all(feeds.map(f => read(f, kw)));
  const seen = new Set();
  const items = lists.flat()
    .filter(x => { const k = x.title.toLowerCase().replace(/\W+/g, ' ').slice(0, 70); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, MAX);
  const body = JSON.stringify({ updated: new Date().toISOString(), items });
  if (items.length) memo = { at: Date.now(), body };
  return new Response(items.length ? body : (memo.body || body), { headers });
};

async function read(feed, kw) {
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(feed.url, { signal: ctl.signal, headers: { 'user-agent': 'TuteeConnectNews/1.0 (+https://tuteeconnect.com)' } });
    clearTimeout(t);
    if (!r.ok) return [];
    const out = [];
    for (const it of parse(await r.text())) {
      let title = it.title, source = it.source || feed.name;
      const m = title.match(/^(.*\S)\s+[-–—]\s+([^-–—]{2,60})$/);   // Google News appends " - Publisher"
      if (m) { title = m[1]; if (!it.source) source = m[2]; }
      const low = title.toLowerCase();
      if (kw.length && !kw.some(k => low.includes(k))) continue;
      if (!/^https:\/\//.test(it.link)) continue;
      out.push({ title: title.slice(0, 160), link: it.link, source: source.slice(0, 60), date: it.date });
    }
    return out;
  } catch (e) { return []; }
}

function parse(xml) {
  const dec = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ').trim();
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  const out = [];
  for (const b of blocks) {
    const title = dec((b.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
    const link = ((b.match(/<link[^>]*href="([^"]+)"/i) || [])[1]) || dec((b.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1] || '');
    const source = dec((b.match(/<source[^>]*>([\s\S]*?)<\/source>/i) || [])[1] || '');
    const raw = dec((b.match(/<(pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/\1>/i) || [])[2] || '');
    const d = raw ? new Date(raw) : null;
    if (title && link) out.push({ title, link: link.replace(/&amp;/g, '&'), source, date: d && !isNaN(d) ? d.toISOString() : '' });
  }
  return out;
}
