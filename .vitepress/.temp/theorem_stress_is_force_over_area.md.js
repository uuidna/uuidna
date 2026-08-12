import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/stress_is_force_over_area.md
var __pageData = JSON.parse("{\"title\":\"Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.\",\"description\":\"100 / 4 = 25 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The structures domain.\",\"frontmatter\":{\"prev\":{\"text\":\"truss_maxwell_rule\",\"link\":\"/theorem/truss_maxwell_rule\"},\"next\":{\"text\":\"hookes_law\",\"link\":\"/theorem/hookes_law\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/stress_is_force_over_area\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/stress_is_force_over_area\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"100 / 4 = 25 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"87d8b9b5-ea98-8e7e-8527-18e096559522\"}]]},\"headers\":[],\"params\":{\"key\":\"stress_is_force_over_area\",\"name\":\"Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.\",\"principle\":\"The structures domain\",\"skill\":\"foundational\",\"statement\":\"100 / 4 = 25\",\"tactic\":\"decide\",\"address\":\"87d8b9b5-ea98-8e7e-8527-18e096559522\"},\"relativePath\":\"theorem/stress_is_force_over_area.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/stress_is_force_over_area.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="stress-is-force-spread-over-area-σ-f-a-100-n-over-4-units-of-area-is-25-units-of-stress-—-100-4-25-the-same-force-on-less-area-bites-harder" tabindex="-1">Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder. <a class="header-anchor" href="#stress-is-force-spread-over-area-σ-f-a-100-n-over-4-units-of-area-is-25-units-of-stress-—-100-4-25-the-same-force-on-less-area-bites-harder" aria-label="Permalink to “Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/stress_is_force_over_area" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(0 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(0 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/stress_is_force_over_area" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(0 60% 40%)",
		"word-break": "break-all"
	})}">87d8b9b5-ea98-8e7e-8527-18e096559522</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The structures domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">100</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> / </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">25</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">theorem</span><span style="${ssrRenderStyle({
		"--shiki-light": "#6F42C1",
		"--shiki-dark": "#B392F0"
	})}"> stress_is_force_over_area</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">100</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> / </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">25</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>87d8b9b5-ea98-8e7e-8527-18e096559522</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The structures domain — statics as decidable arithmetic, demarcated — forces sum to zero and moments balance in equilibrium, a lever gives mechanical advantage, the centre of mass is the weighted average, a simply-supported beam splits a central load evenly, a rigid planar truss obeys Maxwell&#39;s rule m=2j−3, stress is force over area, and Hooke&#39;s law is linear — equilibrium arithmetic, not finite-element analysis</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>31 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats stress_is_force_over_area</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/truss_maxwell_rule">A rigid, statically determinate planar truss obeys Maxwell&#39;s rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.</a> · <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li><li><strong>Principle · The structures domain:</strong> ← <a href="/theorem/truss_maxwell_rule">A rigid, statically determinate planar truss obeys Maxwell&#39;s rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.</a> · <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/truss_maxwell_rule">A rigid, statically determinate planar truss obeys Maxwell&#39;s rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.</a> · <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/precise_tacks_compound">Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3 tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the legs.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/balanced_helm_holds_course">When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The captain rests; the balance steers.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_5_5">5+5 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li><li><strong>Principle · The structures domain:</strong> <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/hookes_law">Hooke&#39;s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Statics.lean" target="_blank" rel="noreferrer">lean/Statics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Statics.lean" target="_blank" rel="noreferrer">Source · lean/Statics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/stress_is_force_over_area.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var stress_is_force_over_area_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, stress_is_force_over_area_default as default };
