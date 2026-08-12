import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/thin_lens_equation.md
var __pageData = JSON.parse("{\"title\":\"The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.\",\"description\":\"10*30 + 10*15 = 15*30 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The light domain.\",\"frontmatter\":{\"prev\":{\"text\":\"snell_law\",\"link\":\"/theorem/snell_law\"},\"next\":{\"text\":\"magnification\",\"link\":\"/theorem/magnification\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/thin_lens_equation\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/thin_lens_equation\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"10*30 + 10*15 = 15*30 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"03054818-1819-8c95-847b-d149fadf41fa\"}]]},\"headers\":[],\"params\":{\"key\":\"thin_lens_equation\",\"name\":\"The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.\",\"principle\":\"The light domain\",\"skill\":\"foundational\",\"statement\":\"10*30 + 10*15 = 15*30\",\"tactic\":\"decide\",\"address\":\"03054818-1819-8c95-847b-d149fadf41fa\"},\"relativePath\":\"theorem/thin_lens_equation.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/thin_lens_equation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-thin-lens-equation-1-f-1-do-1-di-an-object-at-do-15-and-image-at-di-30-give-focal-length-f-10-since-cross-multiplied-f·di-f·do-do·di-is-10·30-10·15-15·30-450" tabindex="-1">The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450. <a class="header-anchor" href="#the-thin-lens-equation-1-f-1-do-1-di-an-object-at-do-15-and-image-at-di-30-give-focal-length-f-10-since-cross-multiplied-f·di-f·do-do·di-is-10·30-10·15-15·30-450" aria-label="Permalink to “The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/thin_lens_equation" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(120 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(120 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/thin_lens_equation" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(120 60% 40%)",
		"word-break": "break-all"
	})}">03054818-1819-8c95-847b-d149fadf41fa</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The light domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">30</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> + </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">15</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">15</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">30</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> thin_lens_equation</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">30</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> + </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">15</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">15</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">30</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>03054818-1819-8c95-847b-d149fadf41fa</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The light domain — geometric optics as decidable arithmetic, demarcated — reflection is an involution (angle in = angle out), the refractive index n=c/v ≥ 1 so light in a medium is slower than c (no FTL), Snell&#39;s law n₁sinθ₁=n₂sinθ₂ holds in a consistent case (4·3=3·4), the thin-lens equation 1/f=1/do+1/di and its magnification are exact, dispersion refracts blue more than red, and total internal reflection needs a denser source — the light domain, consistent cases, not a full wave-optics derivation</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>107 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats thin_lens_equation</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/snell_law">Snell&#39;s law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.</a> · <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li><li><strong>Principle · The light domain:</strong> ← <a href="/theorem/snell_law">Snell&#39;s law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.</a> · <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/snell_law">Snell&#39;s law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.</a> · <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/doppler_shift">The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 &gt; 1) and a receding one lowers it (v/(v+vₛ) = 340/374 &lt; 1) — 340 &gt; 306 and 340 &lt; 374. The passing siren drops in pitch.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/decibel_is_logarithmic">The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_8_3">8+3 ≡ 2 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li><li><strong>Principle · The light domain:</strong> <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/magnification">Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Optics.lean" target="_blank" rel="noreferrer">lean/Optics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Optics.lean" target="_blank" rel="noreferrer">Source · lean/Optics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/thin_lens_equation.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var thin_lens_equation_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, thin_lens_equation_default as default };
