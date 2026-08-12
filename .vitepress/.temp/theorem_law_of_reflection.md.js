import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/law_of_reflection.md
var __pageData = JSON.parse("{\"title\":\"The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.\",\"description\":\"(List.range 181).all (fun a => (180 - (180 - a)) == a) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The light domain.\",\"frontmatter\":{\"prev\":{\"text\":\"ascent_needs_a_stop\",\"link\":\"/theorem/ascent_needs_a_stop\"},\"next\":{\"text\":\"refractive_index_ge_one\",\"link\":\"/theorem/refractive_index_ge_one\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/law_of_reflection\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/law_of_reflection\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 181).all (fun a => (180 - (180 - a)) == a) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"32f2d3c1-084f-8037-9654-74d7a343d03d\"}]]},\"headers\":[],\"params\":{\"key\":\"law_of_reflection\",\"name\":\"The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.\",\"principle\":\"The light domain\",\"skill\":\"reflection\",\"statement\":\"(List.range 181).all (fun a => (180 - (180 - a)) == a)\",\"tactic\":\"decide\",\"address\":\"32f2d3c1-084f-8037-9654-74d7a343d03d\"},\"relativePath\":\"theorem/law_of_reflection.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/law_of_reflection.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-law-of-reflection-the-angle-out-equals-the-angle-in-so-a-mirror-is-an-involution-—-reflecting-the-incidence-angle-twice-through-the-normal-returns-it-180-−-180-−-a-a-for-every-angle-a-in-0-180°" tabindex="-1">The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°. <a class="header-anchor" href="#the-law-of-reflection-the-angle-out-equals-the-angle-in-so-a-mirror-is-an-involution-—-reflecting-the-incidence-angle-twice-through-the-normal-returns-it-180-−-180-−-a-a-for-every-angle-a-in-0-180°" aria-label="Permalink to “The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/law_of_reflection" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(200 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(200 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/law_of_reflection" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The law of reflection: the angle out equals the angle in, so a mirror is an involution</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(200 60% 40%)",
		"word-break": "break-all"
	})}">32f2d3c1-084f-8037-9654-74d7a343d03d</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-reflection">reflection</a></strong> · principle <strong>The light domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">181</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> a =&gt; (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">180</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">180</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - a)) == a)</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> law_of_reflection</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">181</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> a =&gt; (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">180</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">180</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - a)) == a) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>32f2d3c1-084f-8037-9654-74d7a343d03d</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-reflection">reflection</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The light domain — geometric optics as decidable arithmetic, demarcated — reflection is an involution (angle in = angle out), the refractive index n=c/v ≥ 1 so light in a medium is slower than c (no FTL), Snell&#39;s law n₁sinθ₁=n₂sinθ₂ holds in a consistent case (4·3=3·4), the thin-lens equation 1/f=1/do+1/di and its magnification are exact, dispersion refracts blue more than red, and total internal reflection needs a denser source — the light domain, consistent cases, not a full wave-optics derivation</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>329 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats law_of_reflection</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-reflection">reflection</a>:</strong> ← <a href="/theorem/complement_is_xor_key3">Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public, not secret.</a> · —</li><li><strong>Principle · The light domain:</strong> — · <a href="/theorem/refractive_index_ge_one">The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/ascent_needs_a_stop">Decompression is bounded by the Haldane supersaturation ratio (classically ~2:1): from 4 atm you may ascend to 2 atm (ratio 2, tolerable) but not straight to 1 atm (ratio 4 &gt; 2) — a direct ascent needs a stop. A model of the rule; never a plan.</a> · <a href="/theorem/refractive_index_ge_one">The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/refractive_index_ge_one">The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/wave_speed_f_lambda">The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2 m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/tir_needs_denser_source">Total internal reflection needs a denser source: it occurs going from glass (n = 1.50) to air (n = 1.00), where 100 &lt; 150, so the critical angle sinθc = n₂/n₁ = 100/150 = 2/3 ≤ 1 exists. From rarer to denser there is no critical angle — light always crosses.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_8_5">8+5 ≡ 4 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · reflection:</strong> <strong>invisible next</strong> — the missing reflection theorem hides here</li><li><strong>Principle · The light domain:</strong> <a href="/theorem/refractive_index_ge_one">The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/refractive_index_ge_one">The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Optics.lean" target="_blank" rel="noreferrer">lean/Optics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Optics.lean" target="_blank" rel="noreferrer">Source · lean/Optics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/law_of_reflection.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var law_of_reflection_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, law_of_reflection_default as default };
