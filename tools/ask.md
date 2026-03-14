# Ask：搜索 + AI 总结（/ask）

> 这是一个“搜索 + 大模型总结”的旁路服务：先用 SearXNG 搜索，再由自定义大模型汇总，并给出引用来源。

## 在线地址

- 服务健康检查：<https://ask.136222.xyz/health>
- API：`POST https://ask.136222.xyz/ask`

## 交互式提问

> 出于安全考虑：此页面 **不会**内置 token。你需要在本机浏览器里临时输入 `ASK_API_TOKEN`。

<div class="ask-box">
  <div class="ask-row">
    <input id="ask-token" type="password" placeholder="X-Ask-Token（ASK_API_TOKEN，输入后仅在本页内存保存）" />
  </div>

  <div class="ask-row">
    <input id="ask-q" type="text" placeholder="输入你的问题，例如：OpenAI 最新动态是什么？" />
    <button id="ask-run">提问</button>
  </div>

  <div class="ask-row">
    <label>top_n：<input id="ask-topn" type="number" min="1" max="10" value="6" /></label>
    <label style="margin-left:12px;">timeout(s)：<input id="ask-timeout" type="number" min="5" max="120" value="60" /></label>
  </div>

  <pre id="ask-status" class="ask-status"></pre>
  <div id="ask-out" class="ask-out"></div>
</div>

<script>
(function(){
  const API = 'https://ask.136222.xyz/ask';

  function esc(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function setStatus(msg){
    const el = document.getElementById('ask-status');
    if (!el) return;
    el.textContent = msg || '';
  }

  function renderAnswer(text, sources){
    const out = document.getElementById('ask-out');
    if (!out) return;

    const answerHtml = '<pre style="white-space:pre-wrap;word-break:break-word;">'+esc(text||'')+'</pre>';

    let sourcesHtml = '';
    if (Array.isArray(sources) && sources.length) {
      const items = sources.map(s => {
        const title = (s && (s.title || s.name || s.url)) || 'source';
        const url = (s && s.url) || '';
        const snippet = (s && s.snippet) || '';
        const safeTitle = esc(title);
        const safeUrl = esc(url);
        const safeSnippet = esc(snippet);
        const link = url ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeTitle}</a>` : safeTitle;
        return `<li style="margin:6px 0;">${link}${snippet ? `<div style=\"opacity:.85;font-size:12px;line-height:1.4;margin-top:2px;\">${safeSnippet}</div>` : ''}</li>`;
      }).join('');
      sourcesHtml = `<h3 style="margin:14px 0 6px;">Sources</h3><ol style="padding-left:18px;">${items}</ol>`;
    }

    out.innerHTML = answerHtml + sourcesHtml;
  }

  async function run(){
    const token = (document.getElementById('ask-token')||{}).value || '';
    const q = (document.getElementById('ask-q')||{}).value || '';
    const topn = parseInt((document.getElementById('ask-topn')||{}).value || '6', 10);
    const timeoutSec = parseInt((document.getElementById('ask-timeout')||{}).value || '60', 10);

    if (!token.trim()) { setStatus('请先输入 X-Ask-Token（ASK_API_TOKEN）。'); return; }
    if (!q.trim()) { setStatus('请输入问题。'); return; }

    setStatus('请求中…');
    renderAnswer('', []);

    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), Math.max(5, timeoutSec) * 1000);

    try {
      const r = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Ask-Token': token.trim(),
        },
        body: JSON.stringify({ q, top_n: topn }),
        signal: ctl.signal,
      });

      const ct = r.headers.get('content-type') || '';
      if (!r.ok) {
        const text = await r.text();
        setStatus('HTTP '+r.status+' '+r.statusText+'\n'+(text||'').slice(0, 800));
        return;
      }

      if (ct.includes('application/json')) {
        const data = await r.json();
        setStatus('OK');
        renderAnswer(data.answer || JSON.stringify(data, null, 2), data.sources || []);
      } else {
        const text = await r.text();
        setStatus('OK（非JSON响应：'+ct+'）');
        renderAnswer(text);
      }

    } catch (e) {
      setStatus('请求失败：'+ (e && e.name === 'AbortError' ? '超时' : (e && e.message ? e.message : String(e))));
    } finally {
      clearTimeout(t);
    }
  }

  function wire(){
    const btn = document.getElementById('ask-run');
    const input = document.getElementById('ask-q');
    if (btn) btn.addEventListener('click', run);
    if (input) input.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter'){ ev.preventDefault(); run(); }});
  }

  // docsify renders async
  setTimeout(wire, 0);
})();
</script>

> 如果你点了“提问”但页面看起来没变化：请打开浏览器开发者工具（F12）查看 Console/Network，通常是 token 为空或被浏览器插件拦截。

<style>
.ask-box{border:1px solid #e5e7eb;border-radius:10px;padding:12px;margin:12px 0;background:#fff;}
.ask-row{display:flex;gap:8px;align-items:center;margin:8px 0;flex-wrap:wrap;}
.ask-row input[type="text"], .ask-row input[type="password"]{flex:1;min-width:260px;padding:8px 10px;border:1px solid #d1d5db;border-radius:8px;}
.ask-row input[type="number"]{width:90px;padding:6px 8px;border:1px solid #d1d5db;border-radius:8px;}
.ask-row button{padding:8px 12px;border:1px solid #111827;border-radius:8px;background:#111827;color:#fff;cursor:pointer;}
.ask-row button:hover{opacity:.9;}
.ask-status{background:#0b1020;color:#d1e7ff;border-radius:8px;padding:10px;min-height:18px;}
.ask-out{margin-top:10px;}
</style>
