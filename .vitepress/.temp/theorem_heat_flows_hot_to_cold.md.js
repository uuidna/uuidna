import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/heat_flows_hot_to_cold.md
var __pageData = JSON.parse("{\"title\":\"The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.\",\"description\":\"400 > 300 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The energy domain.\",\"frontmatter\":{\"prev\":{\"text\":\"entropy_never_decreases\",\"link\":\"/theorem/entropy_never_decreases\"},\"next\":{\"text\":\"carnot_efficiency_below_one\",\"link\":\"/theorem/carnot_efficiency_below_one\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/heat_flows_hot_to_cold\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/heat_flows_hot_to_cold\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"400 > 300 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"02451732-01ea-8e27-8d70-3ff60dfb8715\"}]]},\"headers\":[],\"params\":{\"key\":\"heat_flows_hot_to_cold\",\"name\":\"The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.\",\"principle\":\"The energy domain\",\"skill\":\"foundational\",\"statement\":\"400 > 300\",\"tactic\":\"decide\",\"address\":\"02451732-01ea-8e27-8d70-3ff60dfb8715\"},\"relativePath\":\"theorem/heat_flows_hot_to_cold.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/heat_flows_hot_to_cold.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-second-law-s-direction-heat-flows-spontaneously-from-the-hotter-body-to-the-colder-—-with-th-400-k-and-tc-300-k-400-300-so-energy-moves-hot-→-cold-never-the-reverse-without-work" tabindex="-1">The second law&#39;s direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 &gt; 300, so energy moves hot → cold, never the reverse without work. <a class="header-anchor" href="#the-second-law-s-direction-heat-flows-spontaneously-from-the-hotter-body-to-the-colder-—-with-th-400-k-and-tc-300-k-400-300-so-energy-moves-hot-→-cold-never-the-reverse-without-work" aria-label="Permalink to “The second law&#39;s direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 &gt; 300, so energy moves hot → cold, never the reverse without work.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/heat_flows_hot_to_cold" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(80 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(80 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/heat_flows_hot_to_cold" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The second law&#39;s direction: heat flows spontaneously from the hotter body to the colder</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The second law&#39;s direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 &gt; 300, so energy moves hot → cold, never the reverse without work.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(80 60% 40%)",
		"word-break": "break-all"
	})}">02451732-01ea-8e27-8d70-3ff60dfb8715</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The energy domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">400</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">300</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> heat_flows_hot_to_cold</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">400</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">300</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>02451732-01ea-8e27-8d70-3ff60dfb8715</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The energy domain — thermodynamics as decidable arithmetic, demarcated — the first law conserves energy (ΔU=Q−W), the second law forbids entropy decrease and sends heat hot→cold, the Carnot efficiency is below 1 (no perpetual motion), the Kelvin scale floors at absolute zero (0°C=273K), Charles&#39;s law keeps V/T constant, and specific heat is linear in ΔT — the laws as arithmetic, not statistical mechanics</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>20 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats heat_flows_hot_to_cold</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/entropy_never_decreases">The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.</a> · <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li><li><strong>Principle · The energy domain:</strong> ← <a href="/theorem/entropy_never_decreases">The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.</a> · <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/entropy_never_decreases">The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.</a> · <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/valence_from_group">Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6 — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/bond_shares_electron_pairs">A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] → [2,4,6]. The bond IS the shared pair(s).</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_7_1">7+1 ≡ 8 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li><li><strong>Principle · The energy domain:</strong> <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/carnot_efficiency_below_one">The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 &gt; 0 — no engine is perfect and none reaches absolute zero.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Thermodynamics.lean" target="_blank" rel="noreferrer">lean/Thermodynamics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Thermodynamics.lean" target="_blank" rel="noreferrer">Source · lean/Thermodynamics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/heat_flows_hot_to_cold.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var heat_flows_hot_to_cold_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, heat_flows_hot_to_cold_default as default };
