import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/captain/config.md
var __pageData = JSON.parse("{\"title\":\"The Contract\",\"description\":\"How an agent configures itself to use uuidna — sign the contract, learn the links. Recomputable, not trusted; the gate can return FALSE; integrity, not truth. Each term backed by a sealed theorem.\",\"frontmatter\":{\"title\":\"The Contract\",\"description\":\"How an agent configures itself to use uuidna — sign the contract, learn the links. Recomputable, not trusted; the gate can return FALSE; integrity, not truth. Each term backed by a sealed theorem.\",\"aside\":true,\"prev\":{\"text\":\"books\",\"link\":\"/books\"},\"next\":{\"text\":\"captain/message\",\"link\":\"/captain/message\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/captain/config\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/captain/config\"}]]},\"headers\":[],\"relativePath\":\"captain/config.md\",\"filePath\":\"captain/config.md\",\"lastUpdated\":1786512541000}");
var _sfc_main = { name: "captain/config.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	const _component_Reflect = resolveComponent("Reflect");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-contract" tabindex="-1">The Contract `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "agent config"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#the-contract" aria-label="Permalink to “The Contract”">​</a></h1><blockquote><p>Recomputable, not trusted. The gate can return FALSE. Integrity, not truth.</p></blockquote><p>Every agent goes to the captain <strong>first</strong> — sign the contract, learn the links. Configuring yourself to use uuidna is like writing a theorem: nothing goes in that can&#39;t be recomputed. This is the reference (recorded as receipt <code>19762a41-d265-86c4-9792-9942082054c8</code>, the content-address of the line above — recheck it with <code>uuidna_address</code>).</p><h2 id="sign-the-contract-—-the-terms-each-backed" tabindex="-1">Sign the contract — the terms, each backed <a class="header-anchor" href="#sign-the-contract-—-the-terms-each-backed" aria-label="Permalink to “Sign the contract — the terms, each backed”">​</a></h2><table tabindex="0"><thead><tr><th>Term</th><th>Backed by</th></tr></thead><tbody><tr><td><strong>Recomputable, not trusted</strong> — every tool is a pure function of its input; the same input mints the same output for anyone</td><td>the whole ledger — <a href="https://github.com/uuidna/uuidna#verify" target="_blank" rel="noreferrer"><code>npm run lean</code></a> reproduces the receipt</td></tr><tr><td><strong>The gate can return FALSE</strong> — a claim earns a sealed theorem or it is flagged; a trial that can&#39;t fail proves nothing</td><td><a href="/theorem/exactly_one_flag"><code>Audit.lean</code></a> — the detector fires on exactly the hollow, unbacked case</td></tr><tr><td><strong>No FTL, no infinite</strong> — bounded by construction</td><td><a href="/theorem/cosmic_speed_limit"><code>cosmic_speed_limit</code></a> · <a href="/theorem/dz_bounded"><code>dz_bounded</code></a></td></tr><tr><td><strong>Coins are a conserved measure</strong>, free for the public interest — not a per-formula price</td><td><a href="/theorem/two_coins"><code>two_coins</code></a> (110 − 108 = 2 = −χ of the double torus)</td></tr><tr><td><strong>The gate is multilingual</strong> — an overclaim cannot hide in another tongue or script</td><td>the provenance audit folds Glagolitic→Cyrillic and reads 20+ languages</td></tr></tbody></table><p>Sign it by <em>behaving</em> it: back your claims, or let them be flagged. There is no other signature — the receipts are.</p><h2 id="consent-—-two-kept-separate" tabindex="-1">Consent — two, kept separate <a class="header-anchor" href="#consent-—-two-kept-separate" aria-label="Permalink to “Consent — two, kept separate”">​</a></h2><ul><li><strong>The licence.</strong> The content is <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noreferrer">CC BY-NC-ND 4.0</a>: free to read, and free to redistribute <strong>unchanged, with attribution, non-commercially</strong> — no derivatives. Any use — copy, redistribute, or commercial use — accepts those terms; the licence is stated on every page. Reading a public page is not a signed contract, but <em>redistribution</em> is under the licence.</li><li><strong>Your data.</strong> Nothing is stored without your explicit consent. The <a href="#reflect-your-own-data">Reflect</a> tool runs entirely in your browser; opt-in storage persists only what you choose, and declining simply limits the features that need it — it never blocks reading.</li><li><strong>Rules change → new consent.</strong> If the licence or the data terms change, prior consent does not carry over — you are asked again. Consent is to the terms <em>as they stand</em>, and each version has its own content-address, so a change is a new address and a fresh signature.</li></ul><h2 id="learn-the-links" tabindex="-1">Learn the links <a class="header-anchor" href="#learn-the-links" aria-label="Permalink to “Learn the links”">​</a></h2><ul><li><a href="/mcp">MCP tools</a> — the 50 keys, in 10 categories, each call receipted</li><li><a href="/theorems">All theorems</a> · <a href="/topics">Topics</a> · <a href="/trials">The trials</a></li><li><a href="/captain/navigator">The Navigator</a> — how to sail: fixed references, true bearings, two crossing lines</li><li><a href="/captain/message">The captain&#39;s message</a> — contribute 2 to save up to 64</li></ul><h2 id="reflect-your-own-data" tabindex="-1">Reflect your own data <a class="header-anchor" href="#reflect-your-own-data" aria-label="Permalink to “Reflect your own data”">​</a></h2><p>Try it — content-addressing runs <strong>in your browser</strong>. Nothing is stored without your consent; here, your chosen data reflects to its address and stays with you.</p>`);
	_push(ssrRenderComponent(_component_Reflect, null, null, _parent));
	_push(`<h2 id="configure-the-harness" tabindex="-1">Configure the harness <a class="header-anchor" href="#configure-the-harness" aria-label="Permalink to “Configure the harness”">​</a></h2><p>Add uuidna to any MCP client — zero runtime deps, a JSON-RPC 2.0 server over stdio:</p><div class="language-json"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">] } } }</span></span></code></pre></div><p>Every command returns a <strong>chained receipt</strong> — a content-address of the call, each link&#39;s receipt seeding the next — so the agent always holds a tamper-evident record of what it ran. A theorem computes in Lean, or it is not a theorem; a command recomputes, or it is not trusted. That is the whole contract, and it is signed in receipts, not ink.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("captain/config.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var config_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, config_default as default };
