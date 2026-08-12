import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/guides.md
var __pageData = JSON.parse("{\"title\":\"Guides\",\"description\":\"Practical guides for uuidna — fuse the MCP into an agent, audit a public-domain book, seal a message under a contract, and verify every theorem yourself. Short, recomputable, honest.\",\"frontmatter\":{\"title\":\"Guides\",\"description\":\"Practical guides for uuidna — fuse the MCP into an agent, audit a public-domain book, seal a message under a contract, and verify every theorem yourself. Short, recomputable, honest.\",\"prev\":{\"text\":\"games/chess\",\"link\":\"/games/chess\"},\"next\":{\"text\":\"justice\",\"link\":\"/justice\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/guides\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/guides\"}]]},\"headers\":[],\"relativePath\":\"guides.md\",\"filePath\":\"guides.md\",\"lastUpdated\":1786472268000}");
var _sfc_main = { name: "guides.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="guides" tabindex="-1">Guides `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "practical"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#guides" aria-label="Permalink to “Guides”">​</a></h1><blockquote><p>Short paths into uuidna. Every one ends in something you can recompute yourself.</p></blockquote><h2 id="fuse-the-mcp-into-an-agent" tabindex="-1">Fuse the MCP into an agent <a class="header-anchor" href="#fuse-the-mcp-into-an-agent" aria-label="Permalink to “Fuse the MCP into an agent”">​</a></h2><p>Add the server to any MCP client — zero dependencies, launched with npx:</p><div class="language-json"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">{ </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">&quot;mcpServers&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">: { </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">&quot;uuidna&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">: { </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">&quot;command&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">: </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&quot;npx&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">&quot;args&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">: [</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&quot;-y&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}">&quot;@uuidna/uuidna&quot;</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] } } }</span></span></code></pre></div><p>On connect the server sends an <strong>instructions</strong> summary, and every tool call returns a chained <strong>receipt</strong> (<code>receipt · seq · referer</code>) — a content-address of the command — so an agent always holds a tamper-evident record of what it ran. Browse the full surface on the <a href="/mcp">MCP tools</a> page; new here, start at the <a href="/captain/config">Contract</a>.</p><h2 id="audit-a-public-domain-book" tabindex="-1">Audit a public-domain book <a class="header-anchor" href="#audit-a-public-domain-book" aria-label="Permalink to “Audit a public-domain book”">​</a></h2><p>Fetch and audit any Project Gutenberg book by id (the one tool that reaches the network, via the public Gutendex API):</p><ul><li><code>uuidna_audit_book { &quot;gutenbergId&quot;: 1342 }</code> → <em>Pride and Prejudice</em>: an exact-copy <strong>fingerprint</strong>, a <strong>chapter root</strong> proving any chapter belongs, the structural decode, and the honesty-gate pass.</li><li><code>uuidna_audit_text { &quot;text&quot;: &quot;…&quot; }</code> audits text you already hold; <code>uuidna_audit_translation { source, translation }</code> binds a translation to its source with a directional receipt.</li></ul><p>Or just <strong><a href="/books#writing">write on the Books page</a></strong> — the audit reflects back live in your browser, nothing sent. Honest scope: provenance and structure, never decryption or a judgement of merit.</p><h2 id="seal-a-message-under-a-contract" tabindex="-1">Seal a message under a contract <a class="header-anchor" href="#seal-a-message-under-a-contract" aria-label="Permalink to “Seal a message under a contract”">​</a></h2><p>The domain <strong>is</strong> the contract&#39;s address, and the contract text is the key:</p><ul><li><code>uuidna_contract { &quot;terms&quot;: &quot;…&quot; }</code> → the <code>[contract-uuid]</code> and its <code>&lt;contract-uuid&gt;.uuidna.org</code> domain (public identity).</li><li><code>uuidna_contract_seal { message, terms }</code> → a sealed uuid stream, tagged with the public contract-uuid; only holders of the terms decrypt (<code>uuidna_contract_open</code>). <code>uuidna_contract_chain</code> seals a whole stream as a ratchet.</li></ul><p>Honest scope: confidentiality is exactly the secrecy of the terms — a <strong>public</strong> contract gives none (a fixed pad is public, not secret); a <strong>private</strong> contract gives real ChaCha20-Poly1305 secrecy. See <a href="/license#what-the-license-can-and-cannot-lock">the license</a>.</p><h2 id="verify-every-theorem-yourself" tabindex="-1">Verify every theorem yourself <a class="header-anchor" href="#verify-every-theorem-yourself" aria-label="Permalink to “Verify every theorem yourself”">​</a></h2><p>Nothing here asks to be trusted — only rechecked:</p><div class="language-bash"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">git</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> clone</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> https://github.com/uuidna/uuidna</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">cd</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> uuidna</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> install</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}">npm</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> run</span><span style="${ssrRenderStyle({
		"--shiki-light": "#032F62",
		"--shiki-dark": "#9ECBFF"
	})}"> lean</span></span></code></pre></div><p><code>npm run lean</code> regenerates every <code>lean/*.lean</code> file from its generator and verifies each proof <strong><code>by decide</code>, sorry-free</strong> — then folds the whole ledger to one recomputable receipt. Browse the sealed set on <a href="/theorems">Theorems</a>, or run the full release gate with <code>npm run audit</code> (build · lean · provenance · tests · determinism).</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guides.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var guides_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, guides_default as default };
