import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/boyles_law.md
var __pageData = JSON.parse("{\"title\":\"Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.\",\"description\":\"2*6 = 4*3 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The reactions domain.\",\"frontmatter\":{\"prev\":{\"text\":\"ph_plus_poh_14\",\"link\":\"/theorem/ph_plus_poh_14\"},\"next\":{\"text\":\"neutralization\",\"link\":\"/theorem/neutralization\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/boyles_law\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/boyles_law\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"2*6 = 4*3 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"df15a824-264d-84c1-bca5-5ca09a0b1588\"}]]},\"headers\":[],\"params\":{\"key\":\"boyles_law\",\"name\":\"Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.\",\"principle\":\"The reactions domain\",\"skill\":\"foundational\",\"statement\":\"2*6 = 4*3\",\"tactic\":\"decide\",\"address\":\"df15a824-264d-84c1-bca5-5ca09a0b1588\"},\"relativePath\":\"theorem/boyles_law.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/boyles_law.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="boyle-s-law-keeps-p·v-constant-at-fixed-temperature-halving-the-volume-doubles-the-pressure-—-2·6-4·3-12-squeeze-a-gas-and-it-pushes-back-proportionally" tabindex="-1">Boyle&#39;s law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally. <a class="header-anchor" href="#boyle-s-law-keeps-p·v-constant-at-fixed-temperature-halving-the-volume-doubles-the-pressure-—-2·6-4·3-12-squeeze-a-gas-and-it-pushes-back-proportionally" aria-label="Permalink to “Boyle&#39;s law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/boyles_law" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(280 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(280 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/boyles_law" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Boyle&#39;s law keeps P·V constant at fixed temperature: halving the volume doubles the pressure</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Boyle&#39;s law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(280 60% 40%)",
		"word-break": "break-all"
	})}">df15a824-264d-84c1-bca5-5ca09a0b1588</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The reactions domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> boyles_law</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>df15a824-264d-84c1-bca5-5ca09a0b1588</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The reactions domain — chemical reactions as decidable arithmetic, demarcated — a balanced equation conserves atoms (Haber, combustion), a neutral compound conserves charge (Al₂O₃), oxidation states sum to the molecular charge, pH+pOH=14 at 25°C, Boyle&#39;s law keeps P·V constant, neutralization pairs H⁺ with OH⁻, and stoichiometry scales linearly — reaction bookkeeping, not thermodynamics, distinct from the electron-shell chemistry in BioPhysics</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>52 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats boyles_law</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/oxidation_states_sum">Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.</a> · <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li><li><strong>Principle · The reactions domain:</strong> ← <a href="/theorem/ph_plus_poh_14">At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.</a> · <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/ph_plus_poh_14">At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.</a> · <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/no_perpetual_motion">No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/absolute_zero_and_kelvin">The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9mul_7_4">7·4 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li><li><strong>Principle · The reactions domain:</strong> <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/neutralization">Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Chemistry.lean" target="_blank" rel="noreferrer">lean/Chemistry.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Chemistry.lean" target="_blank" rel="noreferrer">Source · lean/Chemistry.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/boyles_law.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var boyles_law_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, boyles_law_default as default };
