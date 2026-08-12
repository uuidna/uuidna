import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/games.md
var __pageData = JSON.parse("{\"title\":\"Games\",\"description\":\"Play with the uuidna geometry — the star-polygon game (single stroke iff coprime), the content-addresser, and the live audit. Real functions, drawn in your browser, nothing sent. Learn the algebra by moving it.\",\"frontmatter\":{\"title\":\"Games\",\"description\":\"Play with the uuidna geometry — the star-polygon game (single stroke iff coprime), the content-addresser, and the live audit. Real functions, drawn in your browser, nothing sent. Learn the algebra by moving it.\",\"prev\":{\"text\":\"deploy\",\"link\":\"/deploy\"},\"next\":{\"text\":\"games/chess\",\"link\":\"/games/chess\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/games\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/games\"}]]},\"headers\":[],\"relativePath\":\"games.md\",\"filePath\":\"games.md\",\"lastUpdated\":1786487824000}");
var _sfc_main = { name: "games.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	const _component_StarPlay = resolveComponent("StarPlay");
	const _component_MessageStream = resolveComponent("MessageStream");
	const _component_Reflect = resolveComponent("Reflect");
	const _component_BookReflect = resolveComponent("BookReflect");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="games" tabindex="-1">Games `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "play the algebra"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#games" aria-label="Permalink to “Games”">​</a></h1><blockquote><p>The theorems are more fun when you can move them.</p></blockquote><p>Each game runs a <strong>real</strong> uuidna function in your browser — the same code the MCP tools and the sealed theorems use — so you are playing with the actual algebra, not a mock-up. Nothing is sent or stored.</p><h2 id="chess" tabindex="-1">Chess `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "complete · offline"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#chess" aria-label="Permalink to “Chess”">​</a></h2><p>A complete, correct chess — full legal moves, castling, en passant, promotion, check &amp; checkmate — hot-seat two-player, offline-capable. <strong><a href="/games/chess">Play chess →</a></strong></p><h2 id="the-star-polygon-game" tabindex="-1">The star-polygon game <a class="header-anchor" href="#the-star-polygon-game" aria-label="Permalink to “The star-polygon game”">​</a></h2><p>Pick a number of points and a step. The stroke closes in <strong>one line</strong> exactly when the step is coprime to the count (gcd = 1); otherwise it splits into separate loops. <code>{5/2}</code> is the pentagram; <code>{12/7}</code> is the circle of fifths; <code>{6/2}</code> is two triangles. This is <a href="/mcp#uuidna-pentagram"><code>starPolygon</code></a>, sealed as <a href="/theorem/pentagram_single_stroke"><code>pentagram_single_stroke</code></a>.</p>`);
	_push(ssrRenderComponent(_component_StarPlay, null, null, _parent));
	_push(`<h2 id="watch-a-message-become-a-stream" tabindex="-1">Watch a message become a stream <a class="header-anchor" href="#watch-a-message-become-a-stream" aria-label="Permalink to “Watch a message become a stream”">​</a></h2><p>Type a message and a passphrase, seal it, and watch it become a chain of uuids — the onion carried <em>as</em> the stream — then arrive and decrypt back. Real ChaCha20-Poly1305, sealed and opened in your browser, nothing sent:</p>`);
	_push(ssrRenderComponent(_component_MessageStream, null, null, _parent));
	_push(`<h2 id="reflect-anything-to-its-address" tabindex="-1">Reflect anything to its address <a class="header-anchor" href="#reflect-anything-to-its-address" aria-label="Permalink to “Reflect anything to its address”">​</a></h2><p>Type anything and watch it fall to its content-address — deterministically, the same for anyone, in your browser:</p>`);
	_push(ssrRenderComponent(_component_Reflect, null, null, _parent));
	_push(`<h2 id="audit-as-you-write" tabindex="-1">Audit as you write <a class="header-anchor" href="#audit-as-you-write" aria-label="Permalink to “Audit as you write”">​</a></h2><p>Write a chapter and the full audit reflects back live — fingerprint, chapter root, structure, gravity, gate:</p>`);
	_push(ssrRenderComponent(_component_BookReflect, null, null, _parent));
	_push(`<p>More to explore: the <a href="/trials">7d fold</a>, the <a href="/theorems">theorem ledger</a>, and the whole <a href="/mcp">MCP toolset</a>. A theorem computes in Lean, or it is not a theorem — and here you can watch it compute. Integrity, not truth.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("games.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var games_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, games_default as default };
