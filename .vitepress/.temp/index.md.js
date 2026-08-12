import { t as data } from "./ledger.data.-oDxi4K6.js";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { resolveComponent, unref, useSSRContext } from "vue";
//#region docs/index.md
var __pageData = JSON.parse("{\"title\":\"\",\"description\":\"\",\"frontmatter\":{\"layout\":\"home\",\"hero\":{\"name\":\"uuidna\",\"text\":\"Proven, not promised.\",\"tagline\":\"A human quantum analog — simulated on 64-bit hardware in precise theorem sets, tuned to 432 Hz, honest by construction. Public and free for the public interest (CC BY-NC-ND 4.0), usable in code and at uuidna.com.\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Browse the theorems\",\"link\":\"/theorems\"},{\"theme\":\"alt\",\"text\":\"GitHub\",\"link\":\"https://github.com/uuidna/uuidna\"}]},\"features\":[{\"title\":\"Theorems\",\"details\":\"The filterable collection of proven Lean theorems, each with its by-decide proof (verified sorry-free) and its content-address, organised by computing principle.\",\"link\":\"/theorems\"},{\"title\":\"Captain\",\"details\":\"The measured billing model — contribute 2 to save up to 64. The two coins are the topology of the double torus, not a price from air.\",\"link\":\"/captain/message\"}],\"prev\":{\"text\":\"One leap\",\"link\":\"/publications/one-leap\"},\"next\":{\"text\":\"books\",\"link\":\"/books\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/\"}]]},\"headers\":[],\"relativePath\":\"index.md\",\"filePath\":\"index.md\",\"lastUpdated\":1786517837000}");
var _sfc_main = /*@__PURE__*/ Object.assign({ name: "index.md" }, {
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HomeGraph = resolveComponent("HomeGraph");
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="ledger-stat"><p><strong>${ssrInterpolate(unref(data).total)} theorems</strong> across <strong>${ssrInterpolate(unref(data).principleCount)} computing principles</strong> — all proven <code>by decide</code> in Lean 4 (no Mathlib), verified sorry-free, and folded to one order-invariant receipt:</p><p class="rcpt-big"><code>${ssrInterpolate(unref(data).trial.receipt)}</code></p><p>Lean is the single source: the ledger is derived from <code>lean/*.lean</code> and reached here through the package&#39;s <code>theorems()</code>. Re-verify every proof with <code>npm run lean</code>.</p></div>`);
			_push(ssrRenderComponent(_component_HomeGraph, {
				groups: unref(data).groups,
				skills: unref(data).skillGroups
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { __pageData, _sfc_main as default };
