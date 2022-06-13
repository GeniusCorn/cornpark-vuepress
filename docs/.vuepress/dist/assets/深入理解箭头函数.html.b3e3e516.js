import{_ as n,o as s,c as a,e as t}from"./app.1e8c45a3.js";const p={},e=t(`<h1 id="\u6DF1\u5165\u7406\u89E3\u7BAD\u5934\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u5165\u7406\u89E3\u7BAD\u5934\u51FD\u6570" aria-hidden="true">#</a> \u6DF1\u5165\u7406\u89E3\u7BAD\u5934\u51FD\u6570</h1><h2 id="\u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Cthis\u300D" tabindex="-1"><a class="header-anchor" href="#\u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Cthis\u300D" aria-hidden="true">#</a> \u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Cthis\u300D</h2><p>\u7BAD\u5934\u51FD\u6570\u6CA1\u6709 <code>this</code>\uFF0C\u5982\u679C\u8BBF\u95EE <code>this</code>\uFF0C\u5219\u4F1A\u4ECE\u5916\u90E8\u83B7\u53D6\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> group <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Our Group&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">students</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pete&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Alice&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token function">showList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">student</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> student<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

group<span class="token punctuation">.</span><span class="token function">showList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Our Group: John</span>
<span class="token comment">// Our Group: Pete</span>
<span class="token comment">// Our Group: Alice</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u56E0\u4E3A <code>foreach</code> \u4F7F\u7528\u4E86\u7BAD\u5934\u51FD\u6570\uFF0C\u6240\u4EE5\u5176\u4E2D\u7684 <code>this.title</code> \u5176\u5B9E\u5C31\u662F\u5916\u90E8\u7684 <code>group.title</code>\u3002</p><p>\u5982\u679C\u4F7F\u7528\u6B63\u5E38\u7684\u51FD\u6570\u5B9A\u4E49\uFF0C\u90A3\u4E48 <code>title</code> \u4F1A\u4E3A <code>undefined</code>\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> group <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Our Group&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">students</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pete&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Alice&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token function">showList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>students<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">student</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> student<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

group<span class="token punctuation">.</span><span class="token function">showList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// undefined: John;</span>
<span class="token comment">// undefined: Pete;</span>
<span class="token comment">// undefined: Alice;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF1A\u4E0D\u5177\u6709 <code>this</code> \u610F\u5473\u7740\u7BAD\u5934\u51FD\u6570\u4E0D\u80FD\u7528\u4F5C\u6784\u9020\u5668\uFF0C\u4E0D\u80FD\u7528 <code>new</code> \u6765\u8C03\u7528\u5B83\u4EEC\u3002</p><h2 id="\u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Carguments\u300D" tabindex="-1"><a class="header-anchor" href="#\u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Carguments\u300D" aria-hidden="true">#</a> \u7BAD\u5934\u51FD\u6570\u6CA1\u6709\u300Carguments\u300D</h2><p>\u7BAD\u5934\u51FD\u6570\u4E5F\u6CA1\u6709 <code>arguments</code> \u53D8\u91CF\uFF0C\u5F53\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u5F53\u524D\u7684 <code>this</code> \u548C <code>arguemnts</code> \u8F6C\u53D1\u540C\u4E00\u4E2A\u8C03\u7528\u65F6\uFF0C\u8FD9\u5BF9\u88C5\u9970\u5668\uFF08decorators\uFF09\u6765\u8BF4\u975E\u5E38\u6709\u7528\u3002</p><p>\u4F8B\u5982\uFF0C<code>defer(f, ms)</code> \u83B7\u5F97\u4E86\u4E00\u4E2A\u51FD\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u5305\u88C5\u5668\uFF0C\u8BE5\u5305\u88C5\u5668\u5C06\u8C03\u7528\u5EF6\u8FDF <code>ms</code> \u6BEB\u79D2\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">defer</span><span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> ms</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">f</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">who</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello, &#39;</span> <span class="token operator">+</span> who<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> sayHiDeferred <span class="token operator">=</span> <span class="token function">defer</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">sayHiDeferred</span><span class="token punctuation">(</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 \u79D2\u540E\u663E\u793A\uFF1AHello, John</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[e];function c(i,l){return s(),a("div",null,o)}var r=n(p,[["render",c],["__file","\u6DF1\u5165\u7406\u89E3\u7BAD\u5934\u51FD\u6570.html.vue"]]);export{r as default};
