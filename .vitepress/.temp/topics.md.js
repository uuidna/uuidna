import { t as data } from "./ledger.data.-oDxi4K6.js";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { resolveComponent, unref, useSSRContext } from "vue";
//#region docs/topics.md
var __pageData = JSON.parse("{\"title\":\"Topics\",\"description\":\"\",\"frontmatter\":{\"title\":\"Topics\",\"aside\":false,\"prev\":{\"text\":\"thoughts\",\"link\":\"/thoughts\"},\"next\":{\"text\":\"trading\",\"link\":\"/trading\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/topics\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/topics\"}]]},\"headers\":[],\"relativePath\":\"topics.md\",\"filePath\":\"topics.md\",\"lastUpdated\":1786530542000}");
var _sfc_main = /*@__PURE__*/ Object.assign({ name: "topics.md" }, {
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Badge = resolveComponent("Badge");
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="topics" tabindex="-1">Topics `);
			_push(ssrRenderComponent(_component_Badge, {
				type: "tip",
				text: `${unref(data).skillGroups.length} skills`
			}, null, _parent));
			_push(` <a class="header-anchor" href="#topics" aria-label="Permalink to “Topics”">​</a></h1><p><strong>The discussion topics, computed by the theorem skill axis</strong> — mined from the theorem keys, not hand-authored. Each topic gathers every theorem that carries that skill, folded (order-invariant) to its own receipt. This view is <strong>public and stripped of sensitive data by construction</strong>: the trial holds only <code>by decide</code> theorems and their content-addresses — nothing secret is ever in it (see <a href="/captain/navigator">The Navigator</a> and the security posture). Every theorem links to its page, where the full statement, the <code>by decide</code> proof and the source are displayed.</p><nav class="topic-index"><!--[-->`);
			ssrRenderList(unref(data).skillGroups, (g) => {
				_push(`<a${ssrRenderAttr("href", "#skill-" + g.skill)} class="topic-chip">${ssrInterpolate(g.skill)} <span class="chip-n">${ssrInterpolate(g.count)}</span></a>`);
			});
			_push(`<!--]--></nav><!--[-->`);
			ssrRenderList(unref(data).skillGroups, (g) => {
				_push(`<section class="psec"><h2${ssrRenderAttr("id", "skill-" + g.skill)}>${ssrInterpolate(g.skill)} `);
				_push(ssrRenderComponent(_component_Badge, {
					type: "tip",
					text: String(g.count)
				}, null, _parent));
				_push(`</h2><p class="psec-fold">topic fold <code>${ssrInterpolate(g.fold)}</code></p><ul class="tlist"><!--[-->`);
				ssrRenderList(g.theorems, (t) => {
					_push(`<li><a${ssrRenderAttr("href", `/theorem/${t.key}`)}>${ssrInterpolate(t.name)}</a><code class="tstmt">${ssrInterpolate(t.statement)}</code></li>`);
				});
				_push(`<!--]--></ul></section>`);
			});
			_push(`<!--]--><p>The same theorems, organised by computing principle instead, are on <a href="/theorems">/theorems</a>; the whole set folds to one receipt on <a href="/trials">/trials</a>. A theorem computes in Lean, or it is not a theorem.</p></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("topics.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { __pageData, _sfc_main as default };
