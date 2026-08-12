import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/search.md
var __pageData = JSON.parse("{\"title\":\"Search\",\"description\":\"Search the sealed theorem ledger — a static, client-side index filtered in your browser, results shown on the page. Not a live engine; it searches what was built. Nothing is sent or stored.\",\"frontmatter\":{\"title\":\"Search\",\"description\":\"Search the sealed theorem ledger — a static, client-side index filtered in your browser, results shown on the page. Not a live engine; it searches what was built. Nothing is sent or stored.\",\"prev\":{\"text\":\"publications\",\"link\":\"/publications\"},\"next\":{\"text\":\"tests\",\"link\":\"/tests\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/search\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/search\"}]]},\"headers\":[],\"relativePath\":\"search.md\",\"filePath\":\"search.md\",\"lastUpdated\":1786474123000}");
var _sfc_main = { name: "search.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Badge = resolveComponent("Badge");
	const _component_SearchResults = resolveComponent("SearchResults");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="search" tabindex="-1">Search `);
	_push(ssrRenderComponent(_component_Badge, {
		type: "tip",
		text: "static index"
	}, null, _parent));
	_push(` <a class="header-anchor" href="#search" aria-label="Permalink to “Search”">​</a></h1><blockquote><p>Filter the sealed theorems in your browser — results on the page, nothing sent.</p></blockquote><p>This searches the <strong>static index</strong> of the sealed ledger: every theorem is bundled at build time and filtered here as you type. It is not a live search engine and it does not audit anything in realtime — it searches the pages that were built, and shows the matches below. For full-text search across every page (not just theorems), use the search box in the top bar.</p>`);
	_push(ssrRenderComponent(_component_SearchResults, null, null, _parent));
	_push(`<p>The theorems are also browsable by <a href="/theorems">principle</a> and by <a href="/topics">skill</a>; each result links to its proof page with the full <code>by decide</code> Lean proof and its content-address. Integrity, not truth.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("search.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var search_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, search_default as default };
