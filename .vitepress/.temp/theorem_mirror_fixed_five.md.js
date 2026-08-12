import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/mirror_fixed_five.md
var __pageData = JSON.parse("{\"title\":\"the mirror fixes exactly one digit in 1..9 — the heart, 5\",\"description\":\"((List.range' 1 9).filter (fun d => 10 - d == d)) = [5] — proven by decide in Lean 4, sorry-free (no Mathlib); part of The sequence & reflection group.\",\"frontmatter\":{\"prev\":{\"text\":\"mirror_congruence\",\"link\":\"/theorem/mirror_congruence\"},\"next\":{\"text\":\"agl_order_54\",\"link\":\"/theorem/agl_order_54\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/mirror_fixed_five\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/mirror_fixed_five\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"the mirror fixes exactly one digit in 1..9 — the heart, 5\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"((List.range' 1 9).filter (fun d => 10 - d == d)) = [5] — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"e65b12ef-7de2-89c9-9912-83d9bac59af8\"}]]},\"headers\":[],\"params\":{\"key\":\"mirror_fixed_five\",\"name\":\"the mirror fixes exactly one digit in 1..9 — the heart, 5\",\"principle\":\"The sequence & reflection group\",\"skill\":\"reflection\",\"statement\":\"((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]\",\"tactic\":\"decide\",\"address\":\"e65b12ef-7de2-89c9-9912-83d9bac59af8\"},\"relativePath\":\"theorem/mirror_fixed_five.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/mirror_fixed_five.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-mirror-fixes-exactly-one-digit-in-1-9-—-the-heart-5" tabindex="-1">the mirror fixes exactly one digit in 1..9 — the heart, 5 <a class="header-anchor" href="#the-mirror-fixes-exactly-one-digit-in-1-9-—-the-heart-5" aria-label="Permalink to “the mirror fixes exactly one digit in 1..9 — the heart, 5”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/mirror_fixed_five" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(200 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(200 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/mirror_fixed_five" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">the mirror fixes exactly one digit in 1..9</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">the mirror fixes exactly one digit in 1..9 — the heart, 5</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(200 60% 40%)",
		"word-break": "break-all"
	})}">e65b12ef-7de2-89c9-9912-83d9bac59af8</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-reflection">reflection</a></strong> · principle <strong>The sequence &amp; reflection group</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">((List.range&#39; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).filter (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> d =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - d == d)) = [</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">]</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> mirror_fixed_five</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : ((List.range&#39; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).filter (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> d =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - d == d)) = [</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>e65b12ef-7de2-89c9-9912-83d9bac59af8</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-reflection">reflection</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The sequence &amp; reflection group — the mirror, AGL(1,ℤ/9)=54, one strip, neighbours, the ± polarities, the crypt salt</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>132 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats mirror_fixed_five</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-reflection">reflection</a>:</strong> ← <a href="/theorem/mirror_congruence">the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1</a> · <a href="/theorem/forward_reflected_mirror">the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)</a> →</li><li><strong>Principle · The sequence &amp; reflection group:</strong> ← <a href="/theorem/mirror_congruence">the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1</a> · <a href="/theorem/agl_order_54">AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/mirror_congruence">the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1</a> · <a href="/theorem/agl_order_54">AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/agl_order_54">AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/one_strip">at EACH step the doubling sequence and its inversion are computed together: forward[k] + inverted[k] = 10 (the rungs), and BOTH rails end at the center 5 (the reflection fixed point) while the ends 1,9 mirror — so forward and reflected are ONE strip (a half-twist band), joined at the heart and closed at the void 0≡9</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/angles_close">the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z7add_6_1">6+1 ≡ 0 (mod 7)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · reflection:</strong> <a href="/theorem/forward_reflected_mirror">the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)</a> →</li><li><strong>Principle · The sequence &amp; reflection group:</strong> <a href="/theorem/agl_order_54">AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/agl_order_54">AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-sequence.ts" target="_blank" rel="noreferrer">scripts/lean-sequence.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Sequence.lean" target="_blank" rel="noreferrer">Source · lean/Sequence.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/mirror_fixed_five.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mirror_fixed_five_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, mirror_fixed_five_default as default };
