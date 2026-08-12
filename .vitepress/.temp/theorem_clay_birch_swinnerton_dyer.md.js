import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/clay_birch_swinnerton_dyer.md
var __pageData = JSON.parse("{\"title\":\"the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN\",\"description\":\"(dz 6 = 4) ∧ (dz (dz 6) = 6) ∧ ((0:Nat) < 1) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The seven reflected.\",\"frontmatter\":{\"prev\":{\"text\":\"clay_hodge\",\"link\":\"/theorem/clay_hodge\"},\"next\":{\"text\":\"clay_poincare\",\"link\":\"/theorem/clay_poincare\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/clay_birch_swinnerton_dyer\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/clay_birch_swinnerton_dyer\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(dz 6 = 4) ∧ (dz (dz 6) = 6) ∧ ((0:Nat) < 1) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"b178ff55-574f-8c7d-b60f-0373f6b5d3e7\"}]]},\"headers\":[],\"params\":{\"key\":\"clay_birch_swinnerton_dyer\",\"name\":\"the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN\",\"principle\":\"The seven reflected\",\"skill\":\"clay-reflection\",\"statement\":\"(dz 6 = 4) ∧ (dz (dz 6) = 6) ∧ ((0:Nat) < 1)\",\"tactic\":\"decide\",\"address\":\"b178ff55-574f-8c7d-b60f-0373f6b5d3e7\"},\"relativePath\":\"theorem/clay_birch_swinnerton_dyer.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/clay_birch_swinnerton_dyer.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-birch-and-swinnerton-dyer-conjecture-reflects-to-residue-4-in-z-9-dz-6-4-reflecting-twice-returns-it-—-dz-dz-6-6-—-open" tabindex="-1">the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN <a class="header-anchor" href="#the-birch-and-swinnerton-dyer-conjecture-reflects-to-residue-4-in-z-9-dz-6-4-reflecting-twice-returns-it-—-dz-dz-6-6-—-open" aria-label="Permalink to “the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/clay_birch_swinnerton_dyer" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(240 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(240 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/clay_birch_swinnerton_dyer" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">the Birch and Swinnerton-Dyer conjecture reflects to residue 4 in ℤ/9 (dz(6)=4); reflecting twice returns it — dz(dz(6))=6 — OPEN</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(240 60% 40%)",
		"word-break": "break-all"
	})}">b178ff55-574f-8c7d-b60f-0373f6b5d3e7</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-clay-reflection">clay-reflection</a></strong> · principle <strong>The seven reflected</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(dz </span><span style="${ssrRenderStyle({
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
	})}">) ∧ (dz (dz </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) ∧ ((</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">:Nat) &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> clay_birch_swinnerton_dyer</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (dz </span><span style="${ssrRenderStyle({
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
	})}">) ∧ (dz (dz </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) ∧ ((</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">:Nat) &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>b178ff55-574f-8c7d-b60f-0373f6b5d3e7</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-clay-reflection">clay-reflection</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The seven reflected — the seven Clay problems reflected into the ℤ/9 structure and solved none — a bijection that relabels, it does not propagate proofs; it reflects all seven and solves none</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>49 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats clay_birch_swinnerton_dyer</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-clay-reflection">clay-reflection</a>:</strong> ← <a href="/theorem/clay_hodge">the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN</a> · <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li><li><strong>Principle · The seven reflected:</strong> ← <a href="/theorem/clay_hodge">the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN</a> · <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/clay_hodge">the Hodge conjecture reflects to residue 5 in ℤ/9 (dz(5)=5, the fixed centre); reflecting twice returns it — dz(dz(5))=5 — OPEN</a> · <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/horizon_curvature_finite">The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/derivative_finite_rate">The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s &quot;ghosts of departed quantities&quot; are an exact cancellation, not an infinity.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_8_6">8^6 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · clay-reflection:</strong> <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li><li><strong>Principle · The seven reflected:</strong> <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/clay_poincare">the Poincaré conjecture reflects to residue 3 in ℤ/9 (dz(7)=3); reflecting twice returns it — dz(dz(7))=7 — OPEN</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-clay.ts" target="_blank" rel="noreferrer">scripts/lean-clay.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Clay.lean" target="_blank" rel="noreferrer">Source · lean/Clay.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/clay_birch_swinnerton_dyer.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var clay_birch_swinnerton_dyer_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, clay_birch_swinnerton_dyer_default as default };
