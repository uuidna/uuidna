import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/games/chess.md
var __pageData = JSON.parse("{\"title\":\"Chess\",\"description\":\"A complete, correct chess — full legal moves, castling, en passant, promotion, check and checkmate. Hot-seat two-player, played entirely in your browser, works offline via the PWA. Nothing is sent.\",\"frontmatter\":{\"title\":\"Chess\",\"description\":\"A complete, correct chess — full legal moves, castling, en passant, promotion, check and checkmate. Hot-seat two-player, played entirely in your browser, works offline via the PWA. Nothing is sent.\",\"prev\":{\"text\":\"games\",\"link\":\"/games\"},\"next\":{\"text\":\"guides\",\"link\":\"/guides\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/games/chess\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/games/chess\"}]]},\"headers\":[],\"relativePath\":\"games/chess.md\",\"filePath\":\"games/chess.md\",\"lastUpdated\":1786475002000}");
var _sfc_main = { name: "games/chess.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	const _component_Chess = resolveComponent("Chess", true);
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="chess" tabindex="-1">Chess `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "offline"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#chess" aria-label="Permalink to “Chess”">​</a></h1><blockquote><p>A complete game, played in your browser — no server, no engine dependency.</p></blockquote><p>Full legal moves, castling, en passant, pawn promotion, and check / checkmate / stalemate detection. Two players, hot-seat, on one board. It runs entirely client-side, so it works <strong>offline</strong> once the <a href="/">PWA</a> has cached it, and nothing you play is ever sent or stored.</p>`);
	_push(ssrRenderComponent(_component_Chess, null, null, _parent));
	_push(`<p>Online (networked) play would use the same real-time backend as the <a href="/trials">trial CRUD</a>; this page is the complete <strong>offline</strong> game. Back to all <a href="/games">games</a>.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("games/chess.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var chess_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, chess_default as default };
