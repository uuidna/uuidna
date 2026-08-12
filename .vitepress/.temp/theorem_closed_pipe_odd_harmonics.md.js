import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/closed_pipe_odd_harmonics.md
var __pageData = JSON.parse("{\"title\":\"A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.\",\"description\":\"([1,3,5,7] : List Nat).all (fun n => n % 2 == 1) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The sound domain.\",\"frontmatter\":{\"prev\":{\"text\":\"doppler_shift\",\"link\":\"/theorem/doppler_shift\"},\"next\":{\"text\":\"intensity_inverse_square\",\"link\":\"/theorem/intensity_inverse_square\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/closed_pipe_odd_harmonics\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/closed_pipe_odd_harmonics\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"([1,3,5,7] : List Nat).all (fun n => n % 2 == 1) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"b8aa1c5e-6396-85d0-ba13-e3ed83af7ab4\"}]]},\"headers\":[],\"params\":{\"key\":\"closed_pipe_odd_harmonics\",\"name\":\"A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.\",\"principle\":\"The sound domain\",\"skill\":\"foundational\",\"statement\":\"([1,3,5,7] : List Nat).all (fun n => n % 2 == 1)\",\"tactic\":\"decide\",\"address\":\"b8aa1c5e-6396-85d0-ba13-e3ed83af7ab4\"},\"relativePath\":\"theorem/closed_pipe_odd_harmonics.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/closed_pipe_odd_harmonics.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="a-closed-stopped-pipe-sounds-only-the-odd-harmonics-—-1-3-5-7-—-because-a-node-sits-at-the-closed-end-each-is-odd-n-mod-2-1-an-open-pipe-would-sound-all-of-them" tabindex="-1">A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them. <a class="header-anchor" href="#a-closed-stopped-pipe-sounds-only-the-odd-harmonics-—-1-3-5-7-—-because-a-node-sits-at-the-closed-end-each-is-odd-n-mod-2-1-an-open-pipe-would-sound-all-of-them" aria-label="Permalink to “A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/closed_pipe_odd_harmonics" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(160 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(160 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/closed_pipe_odd_harmonics" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">A closed (stopped) pipe sounds only the ODD harmonics</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(160 60% 40%)",
		"word-break": "break-all"
	})}">b8aa1c5e-6396-85d0-ba13-e3ed83af7ab4</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The sound domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">([</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">7</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] : List Nat).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> n =&gt; n % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
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
	})}"> closed_pipe_odd_harmonics</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : ([</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">7</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] : List Nat).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> n =&gt; n % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
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
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>b8aa1c5e-6396-85d0-ba13-e3ed83af7ab4</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The sound domain — acoustics as decidable arithmetic, demarcated — the harmonic series stacks integer multiples of the fundamental, the wave speed is v=f·λ, sound (343 m/s) is far slower than light, the decibel is logarithmic (10 dB = ×10 intensity), two tones beat at their difference, the Doppler shift raises pitch on approach and lowers it on recession, a closed pipe sounds only odd harmonics, and intensity falls as the inverse square of distance — the sound domain, exact ratios, distinct from the music/432 ladder in BioPhysics</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>42 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats closed_pipe_odd_harmonics</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/doppler_shift">The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 &gt; 1) and a receding one lowers it (v/(v+vₛ) = 340/374 &lt; 1) — 340 &gt; 306 and 340 &lt; 374. The passing siren drops in pitch.</a> · <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li><li><strong>Principle · The sound domain:</strong> ← <a href="/theorem/doppler_shift">The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 &gt; 1) and a receding one lowers it (v/(v+vₛ) = 340/374 &lt; 1) — 340 &gt; 306 and 340 &lt; 374. The passing siren drops in pitch.</a> · <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/doppler_shift">The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 &gt; 1) and a receding one lowers it (v/(v+vₛ) = 340/374 &lt; 1) — 340 &gt; 306 and 340 &lt; 374. The passing siren drops in pitch.</a> · <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/stoichiometry_scales">Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/boyles_law">Boyle&#39;s law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_7_7">7+7 ≡ 5 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li><li><strong>Principle · The sound domain:</strong> <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/intensity_inverse_square">Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Acoustics.lean" target="_blank" rel="noreferrer">lean/Acoustics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Acoustics.lean" target="_blank" rel="noreferrer">Source · lean/Acoustics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/closed_pipe_odd_harmonics.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var closed_pipe_odd_harmonics_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, closed_pipe_odd_harmonics_default as default };
