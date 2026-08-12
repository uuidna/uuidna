import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { t as data } from "./ledger.data.-oDxi4K6.js";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { computed, ref, resolveComponent, unref, useSSRContext } from "vue";
//#region docs/theorems.md
var __pageData = JSON.parse("{\"title\":\"Theorems\",\"description\":\"\",\"frontmatter\":{\"title\":\"Theorems\",\"aside\":false,\"prev\":{\"text\":\"tests\",\"link\":\"/tests\"},\"next\":{\"text\":\"theories\",\"link\":\"/theories\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorems\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorems\"}]]},\"headers\":[],\"relativePath\":\"theorems.md\",\"filePath\":\"theorems.md\",\"lastUpdated\":1786529406000}");
var _sfc_main = /*@__PURE__*/ Object.assign({ name: "theorems.md" }, {
	__ssrInlineRender: true,
	setup(__props) {
		const q = ref("");
		const principle = ref("");
		const skill = ref("");
		const guideByPrinciple = Object.fromEntries(data.groups.map((g) => [g.name, g.guide]));
		const shown = computed(() => {
			const needle = q.value.trim().toLowerCase();
			return data.theorems.filter((t) => (!principle.value || t.principle === principle.value) && (!skill.value || t.skill === skill.value) && (!needle || (t.key + " " + t.name + " " + t.statement).toLowerCase().includes(needle)));
		});
		const principleFacets = computed(() => data.order.map((name) => ({
			name,
			n: data.theorems.filter((t) => t.principle === name && (!skill.value || t.skill === skill.value) && (!q.value.trim() || (t.key + " " + t.name + " " + t.statement).toLowerCase().includes(q.value.trim().toLowerCase()))).length
		})));
		const skillFacets = computed(() => data.skillGroups.map((g) => g.skill).map((s) => ({
			s,
			n: data.theorems.filter((t) => t.skill === s && (!principle.value || t.principle === principle.value) && (!q.value.trim() || (t.key + " " + t.name + " " + t.statement).toLowerCase().includes(q.value.trim().toLowerCase()))).length
		})));
		const activeGuide = computed(() => principle.value ? guideByPrinciple[principle.value] : null);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Badge = resolveComponent("Badge");
			_push(`<div${ssrRenderAttrs(_attrs)} data-v-c33864ab><h1 id="theorems" tabindex="-1" data-v-c33864ab>Theorems `);
			_push(ssrRenderComponent(_component_Badge, {
				type: "tip",
				text: `${unref(data).total} Lean-proven`
			}, null, _parent));
			_push(` <a class="header-anchor" href="#theorems" aria-label="Permalink to “Theorems”" data-v-c33864ab>​</a></h1><p data-v-c33864ab><strong data-v-c33864ab>Every proven Lean theorem — filter it, then read its proof.</strong> Each is authored in <code data-v-c33864ab>lean/*.lean</code>, proven <code data-v-c33864ab>by decide</code> (Lean 4.33.0, no Mathlib), verified sorry-free by <code data-v-c33864ab>npm run lean</code>. Filter by <strong data-v-c33864ab>cluster</strong> (the derivation principle) or <strong data-v-c33864ab>skill</strong> (the capability), narrow by text, and open any theorem for its proof. Each cluster&#39;s <strong data-v-c33864ab>guide</strong> is its audited monograph. Lean is the single source; the recomputation-only capabilities (address, gate, crypto) are tools, not theorems.</p><div class="filt" data-v-c33864ab><input class="filt-q"${ssrRenderAttr("value", q.value)} placeholder="filter by text — key, statement, description…" data-v-c33864ab>`);
			if (q.value || principle.value || skill.value) _push(`<button class="filt-clear" data-v-c33864ab>clear ✕</button>`);
			else _push(`<!---->`);
			_push(`</div><div class="filt-row" data-v-c33864ab><strong class="filt-lbl" data-v-c33864ab>cluster</strong><button class="${ssrRenderClass([{ on: !principle.value }, "chip"])}" data-v-c33864ab>all</button><!--[-->`);
			ssrRenderList(principleFacets.value, (f) => {
				_push(`<button class="${ssrRenderClass([{
					on: principle.value === f.name,
					dim: f.n === 0
				}, "chip"])}" data-v-c33864ab>${ssrInterpolate(f.name)} <span class="chip-n" data-v-c33864ab>${ssrInterpolate(f.n)}</span></button>`);
			});
			_push(`<!--]--></div><div class="filt-row" data-v-c33864ab><strong class="filt-lbl" data-v-c33864ab>skill</strong><button class="${ssrRenderClass([{ on: !skill.value }, "chip"])}" data-v-c33864ab>all</button><!--[-->`);
			ssrRenderList(skillFacets.value, (f) => {
				_push(`<button class="${ssrRenderClass([{
					on: skill.value === f.s,
					dim: f.n === 0
				}, "chip"])}" data-v-c33864ab>${ssrInterpolate(f.s)} <span class="chip-n" data-v-c33864ab>${ssrInterpolate(f.n)}</span></button>`);
			});
			_push(`<!--]--></div><p class="filt-count" data-v-c33864ab><strong data-v-c33864ab>${ssrInterpolate(shown.value.length)}</strong> of ${ssrInterpolate(unref(data).total)} shown${ssrInterpolate(principle.value ? ` · cluster ${principle.value}` : "")}${ssrInterpolate(skill.value ? ` · skill ${skill.value}` : "")}. `);
			if (activeGuide.value) _push(`<a${ssrRenderAttr("href", activeGuide.value)} data-v-c33864ab>Read the ${ssrInterpolate(principle.value)} guide →</a>`);
			else _push(`<!---->`);
			_push(`</p><ul class="tlist tlist-flat" data-v-c33864ab><!--[-->`);
			ssrRenderList(shown.value, (t) => {
				_push(`<li data-v-c33864ab><a${ssrRenderAttr("href", `/theorem/${t.key}`)} data-v-c33864ab>${ssrInterpolate(t.name)}</a><code class="tstmt" data-v-c33864ab>${ssrInterpolate(t.statement)}</code><span class="tmeta" data-v-c33864ab>${ssrInterpolate(t.principle)} · ${ssrInterpolate(t.skill)}</span></li>`);
			});
			_push(`<!--]--></ul>`);
			if (shown.value.length === 0) _push(`<p class="filt-empty" data-v-c33864ab>No theorem matches — <a data-v-c33864ab>clear the filters</a>.</p>`);
			else _push(`<!---->`);
			_push(`<p data-v-c33864ab>The whole set folds to one order-invariant receipt: <code data-v-c33864ab>${ssrInterpolate(unref(data).trial.receipt)}</code>. Re-verify every proof with <code data-v-c33864ab>npm run lean</code>. The same theorems grouped by skill are on <a href="/topics" data-v-c33864ab>/topics</a>; the cluster guides are the monographs on <a href="/publications" data-v-c33864ab>/publications</a>.</p></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorems.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var theorems_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-c33864ab"]]);
//#endregion
export { __pageData, theorems_default as default };
