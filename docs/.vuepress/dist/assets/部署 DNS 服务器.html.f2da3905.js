import{_ as i,r as a,o as s,c,a as e,b as o,d as n,e as l}from"./app.1e8c45a3.js";var r="/images/20220608201224.png";const t={},u=e("h1",{id:"\u90E8\u7F72-dns-\u670D\u52A1\u5668",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u90E8\u7F72-dns-\u670D\u52A1\u5668","aria-hidden":"true"},"#"),n(" \u90E8\u7F72 DNS \u670D\u52A1\u5668")],-1),v=e("h2",{id:"\u524D\u8A00",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u524D\u8A00","aria-hidden":"true"},"#"),n(" \u524D\u8A00")],-1),h=n("\u57DF\u540D\u7CFB\u7EDF\uFF08DNS\uFF09\u5C06\u4EBA\u7C7B\u53EF\u8BFB\u7684\u57DF\u540D\uFF08\u4F8B\u5982\uFF0C"),b={href:"https://www.github.com",target:"_blank",rel:"noopener noreferrer"},m=n("www.github.com"),p=n("\uFF09\u8F6C\u6362\u4E3A\u673A\u5668\u53EF\u8BFB\u7684 IP \u5730\u5740\uFF08\u4F8B\u5982\uFF0C192.168.1.1\uFF09\u3002"),f=l(`<p>\u5728\u6821\u56ED\u7F51\u4E2D\uFF0C\u81EA\u5EFA DNS \u670D\u52A1\u5668\u53EF\u4EE5\u5728\u6821\u56ED\u7F51\u5185\u89E3\u6790\u6821\u5185\u72EC\u6709\u7684\u670D\u52A1\u5668\u57DF\u540D\u3002</p><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> bind9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h2><h3 id="\u5168\u5C40\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a> \u5168\u5C40\u914D\u7F6E</h3><p><code>bind9</code> \u7684\u5168\u5C40\u914D\u7F6E\u6587\u4EF6\u4F4D\u4E8E <code>/etc/bind</code> \u76EE\u5F55\u4E0B\u3002</p><p>\u5148\u4FEE\u6539\u4E3B\u8981\u914D\u7F6E\u6587\u4EF6 <code>named.conf.options</code>\u3002</p><ul><li><code>directory</code> \u89C4\u5B9A\u914D\u7F6E\u6587\u4EF6\u7684\u5B58\u653E\u6587\u4EF6\u5939\uFF0C\u9ED8\u8BA4\u5373\u53EF\u3002</li><li><code>listen-on</code> \u53C2\u6570\u89C4\u5B9A DNS \u670D\u52A1\u5668\u751F\u6548\u7684\u7F51\u6BB5\uFF0C\u6211\u4EEC\u8BBE\u7F6E <code>any</code> \u4EE5\u5141\u8BB8\u6240\u6709\u7F51\u6BB5\u751F\u6548\u3002</li><li>\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C<code>bind9</code> \u53EA\u5141\u8BB8\u672C\u5730\u8BBF\u95EE\u670D\u52A1\uFF0C\u6211\u4EEC\u5C06 <code>allow-query</code> \u8BBE\u7F6E\u4E3A <code>any</code> \u4EE5\u5141\u8BB8\u6240\u6709\u6765\u6E90\u8BBF\u95EE\u670D\u52A1\u3002</li><li><code>forwards</code> \u89C4\u5B9A\u5F53\u65E0\u6CD5\u67E5\u8BE2\u5230\u57DF\u540D\u540E\uFF0C\u8BF7\u6C42\u5C06\u4F1A\u88AB\u91CD\u5B9A\u5411\u4E8E\u7684 DNS \u670D\u52A1\u5668\u3002</li></ul><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code>options {
        directory &quot;/var/cache/bind&quot;;

        forwarders {
                8.8.8.8;
        };

        allow-query {
                any;
        };

        recursion no;

        dnssec-validation auto;

        listen-on { any; };
        listen-on-v6 { any; };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6DFB\u52A0\u57DF\u540D" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u57DF\u540D" aria-hidden="true">#</a> \u6DFB\u52A0\u57DF\u540D</h3><p>\u5728 <code>named.conf.local</code> \u4E2D\uFF0C\u52A0\u5165\u57DF\u540D\u3002\u5728\u8FD9\u91CC\uFF0C\u6211\u52A0\u5165\u4E86 <code>huang.foo</code> \u4F5C\u4E3A\u57DF\u540D\uFF0C<code>type</code> \u8BBE\u7F6E\u4E3A <code>master</code>\uFF0C\u5E76\u4E14\u914D\u7F6E\u6587\u4EF6 <code>file</code> \u6307\u5411 <code>/etc/bind/db.huang.foo</code>\u3002</p><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code>zone &quot;huang.foo&quot; {
        type master;
        file &quot;/etc/bind/db.huang.foo&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFA\u6307\u5B9A\u7684\u914D\u7F6E\u6587\u4EF6 <code>db.huang.foo</code>\u3002\u8FD9\u91CC\u6211\u6307\u5B9A A \u8BB0\u5F55 <code>www</code> \u4E3A <code>192.168.43.128</code>\u3002\u5177\u4F53\u7684\u57DF\u540D\u89E3\u6790\u914D\u7F6E\uFF0C\u8BF7\u81EA\u884C\u67E5\u8BE2\uFF0C\u6B64\u5904\u4E0D\u518D\u6269\u5C55\u3002</p><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code>$TTL    86400
@       IN      SOA     localhost. root.localhost. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@       IN      NS      localhost.
www     IN      A       192.168.43.128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u9A8C\u8BC1\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u9A8C\u8BC1\u914D\u7F6E" aria-hidden="true">#</a> \u9A8C\u8BC1\u914D\u7F6E</h3><p>\u914D\u7F6E\u5B8C\u6210\u540E\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>sudo named-checkconf</code> \u6765\u6D4B\u8BD5\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6B63\u786E\u3002\u5982\u679C\u6CA1\u6709\u9519\u8BEF\u8F93\u51FA\uFF0C\u90A3\u4E48\u53EF\u4EE5\u91CD\u542F\u670D\u52A1\u6765\u4F7F\u914D\u7F6E\u751F\u6548\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart bind9.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u670D\u52A1\u72B6\u6001\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl status bind9.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u901A\u8FC7 <code>dig</code> \u547D\u4EE4\u67E5\u770B DNS \u670D\u52A1\u662F\u5426\u751F\u6548\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">dig</span> www.huang.foo @127.0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+r+'" alt=""></p><p>\u53EF\u4EE5\u770B\u5230\uFF0CDNS \u670D\u52A1\u5DF2\u7ECF\u751F\u6548\u3002\u67E5\u8BE2\u5230\u57DF\u540D <code>www.huang.foo</code> \u5BF9\u5E94\u7684 IP \u4E3A <code>192.168.43.128</code>\u3002</p>',23);function g(_,w){const d=a("ExternalLinkIcon");return s(),c("div",null,[u,v,e("p",null,[h,e("a",b,[m,o(d)]),p]),f])}var N=i(t,[["render",g],["__file","\u90E8\u7F72 DNS \u670D\u52A1\u5668.html.vue"]]);export{N as default};
