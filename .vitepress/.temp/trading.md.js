import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/trading.md
var __pageData = JSON.parse("{\"title\":\"Trading\",\"description\":\"The measured exchange in uuidna — work saved, not money. A content-address turns an O(N) recompute into an O(1) verify; the two coins are a conserved topological invariant, not a price. Public and non-commercial use is free. Not financial trading, securities, or investment.\",\"frontmatter\":{\"title\":\"Trading\",\"description\":\"The measured exchange in uuidna — work saved, not money. A content-address turns an O(N) recompute into an O(1) verify; the two coins are a conserved topological invariant, not a price. Public and non-commercial use is free. Not financial trading, securities, or investment.\",\"prev\":{\"text\":\"topics\",\"link\":\"/topics\"},\"next\":{\"text\":\"trials\",\"link\":\"/trials\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/trading\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/trading\"}]]},\"headers\":[],\"relativePath\":\"trading.md\",\"filePath\":\"trading.md\",\"lastUpdated\":1786490040000}");
var _sfc_main = { name: "trading.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	const _component_BillCalc = resolveComponent("BillCalc");
	const _component_TokenMeter = resolveComponent("TokenMeter");
	const _component_CostMeter = resolveComponent("CostMeter");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="trading" tabindex="-1">Trading `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "measured work"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#trading" aria-label="Permalink to “Trading”">​</a></h1><blockquote><p>What is traded here is <strong>proof of work saved</strong> — not money.</p></blockquote><div class="warning custom-block"><p class="custom-block-title">Not financial trading</p><p>This page is about uuidna&#39;s <strong>measured exchange of computational work</strong>, not securities, currencies, or investment. uuidna does not offer, execute, or advise on financial trades of any kind. The &quot;coins&quot; below are a <strong>conserved topological invariant</strong>, not a tradable asset and not a price.</p></div><h2 id="what-is-exchanged" tabindex="-1">What is exchanged <a class="header-anchor" href="#what-is-exchanged" aria-label="Permalink to “What is exchanged”">​</a></h2><p>A content-address replaces an <strong>O(N) recompute</strong> with an <strong>O(1) verify</strong>: instead of re-running a whole computation to trust a result, you recompute one address and compare. The value exchanged is exactly that saving — the <strong>bits saved</strong> — and it is <em>measured</em>, not quoted. Public-interest and non-commercial use is <strong>free</strong>; commercial use is the measured contribution.</p><h2 id="the-two-coins" tabindex="-1">The two coins <a class="header-anchor" href="#the-two-coins" aria-label="Permalink to “The two coins”">​</a></h2><p>The price of a fair exchange is <strong>2</strong> — not from the air, but from geometry: <code>2 = −χ</code> of a genus-2 surface (the double torus), where <code>−χ = 2g − 2 = 2·2 − 2 = 2</code>. It is a <strong>conserved invariant</strong> (<code>110 − 108 = 2</code>), the same for everyone, recomputable — see <a href="/theorem/two_coins"><code>two_coins</code></a> and <a href="/theorem/two_coins_is_double_torus"><code>two_coins_is_double_torus</code></a>. &quot;Contribute 2 to save up to 64&quot; is a leverage of 32 (<code>2 · 32 = 64</code>), and 64 = 2⁶ is the bit measure.</p><h2 id="measure-it" tabindex="-1">Measure it <a class="header-anchor" href="#measure-it" aria-label="Permalink to “Measure it”">​</a></h2><p>Compute the exchange yourself — in your browser, nothing sent:</p>`);
	_push(ssrRenderComponent(_component_BillCalc, null, null, _parent));
	_push(`<p>The measurement is <a href="/mcp#uuidna-bill"><code>uuidna_bill</code></a> run locally. What you trade is independent skilled work — proof of the uuidna concept — measured in bits saved, never in money. See <a href="/captain/message">the captain&#39;s message</a> for the full billing model. Integrity, not truth.</p><h2 id="tokens-per-theorem-—-any-time" tabindex="-1">Tokens per theorem — any time <a class="header-anchor" href="#tokens-per-theorem-—-any-time" aria-label="Permalink to “Tokens per theorem — any time”">​</a></h2><p>The honest cost-of-proof metric: your token spend divided by the <strong>live</strong> sealed-theorem count. The theorem count is the recomputable denominator; the tokens are your own self-report (this page cannot observe them). The same <a href="/mcp#uuidna-tokens"><code>uuidna_tokens</code></a> computation, in your browser, any time — fold many reports over a session to watch the cost-per-theorem fall.</p>`);
	_push(ssrRenderComponent(_component_TokenMeter, null, null, _parent));
	_push(`<h3 id="recomputable-cost-—-efficiency-proven-not-measured" tabindex="-1">Recomputable cost — efficiency proven, not measured <a class="header-anchor" href="#recomputable-cost-—-efficiency-proven-not-measured" aria-label="Permalink to “Recomputable cost — efficiency proven, not measured”">​</a></h3><p>Tokens are a <strong>self-report</strong> — they <em>measure</em> efficiency, they don&#39;t <em>prove</em> it. The recomputable cost replaces the self-reported numerator with one <strong>computed from <code>lean/*.lean</code> itself</strong>: the produce cost is the formal-corpus size, the verify cost is O(1) per theorem, and it folds to a receipt anyone rechecks. No inputs, no trust — routed to the ledger, not hallucinated. Run it as <a href="/mcp#uuidna-cost"><code>uuidna_cost</code></a>.</p>`);
	_push(ssrRenderComponent(_component_CostMeter, null, null, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("trading.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var trading_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, trading_default as default };
