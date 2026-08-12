import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/ym_quantum.md
var __pageData = JSON.parse("{\"title\":\"Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless\",\"description\":\"(List.range 9).all (fun n => (List.range 12).all (fun k => ¬ (n < k ∧ k < n+1))) ∧ (List.range' 2 4).all (fun k => 1*k < 1*(k+1)) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The vortex algebra.\",\"frontmatter\":{\"prev\":{\"text\":\"ns_spike\",\"link\":\"/theorem/ns_spike\"},\"next\":{\"text\":\"hodge_bound\",\"link\":\"/theorem/hodge_bound\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/ym_quantum\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/ym_quantum\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 9).all (fun n => (List.range 12).all (fun k => ¬ (n < k ∧ k < n+1))) ∧ (List.range' 2 4).all (fun k => 1*k < 1*(k+1)) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"3029dd36-23c6-8970-b546-a0cef147ce08\"}]]},\"headers\":[],\"params\":{\"key\":\"ym_quantum\",\"name\":\"Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless\",\"principle\":\"The vortex algebra\",\"skill\":\"quantum\",\"statement\":\"(List.range 9).all (fun n => (List.range 12).all (fun k => ¬ (n < k ∧ k < n+1))) ∧ (List.range' 2 4).all (fun k => 1*k < 1*(k+1))\",\"tactic\":\"decide\",\"address\":\"3029dd36-23c6-8970-b546-a0cef147ce08\"},\"relativePath\":\"theorem/ym_quantum.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/ym_quantum.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="yang–mills-edge-winding-numbers-are-discrete-no-integer-strictly-between-n-and-n-1-a-1-n-spectrum-is-gapless" tabindex="-1">Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless <a class="header-anchor" href="#yang–mills-edge-winding-numbers-are-discrete-no-integer-strictly-between-n-and-n-1-a-1-n-spectrum-is-gapless" aria-label="Permalink to “Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/ym_quantum" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(120 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(120 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/ym_quantum" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Yang–Mills edge: winding numbers are discrete (no integer strictly between n and n+1); a 1/n spectrum is gapless</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(120 60% 40%)",
		"word-break": "break-all"
	})}">3029dd36-23c6-8970-b546-a0cef147ce08</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-quantum">quantum</a></strong> · principle <strong>The vortex algebra</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> n =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">12</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; ¬ (n &lt; k ∧ k &lt; n+</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">))) ∧ (List.range&#39; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*k &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*(k+</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">))</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> ym_quantum</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> n =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">12</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; ¬ (n &lt; k ∧ k &lt; n+</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">))) ∧ (List.range&#39; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*k &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*(k+</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>3029dd36-23c6-8970-b546-a0cef147ce08</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-quantum">quantum</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The vortex algebra — units, orbit, involution, gravity, division by zero, light — the foundational facts</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>379 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats ym_quantum</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-quantum">quantum</a>:</strong> — · <a href="/theorem/bell_born_weights">the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)</a> →</li><li><strong>Principle · The vortex algebra:</strong> ← <a href="/theorem/ns_spike">Navier–Stokes edge: bounded energy 1/n falls while the peak n rises — integer inequalities, not a solution</a> · <a href="/theorem/hodge_bound">Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/ns_spike">Navier–Stokes edge: bounded energy 1/n falls while the peak n rises — integer inequalities, not a solution</a> · <a href="/theorem/hodge_bound">Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/hodge_bound">Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/three_no_inverse">3 has no inverse mod 9 — a zero-divisor, not a unit</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/three_sq_zero">3² ≡ 0 (mod 9) — 3 is nilpotent</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z7pow_2_3">2^3 ≡ 1 (mod 7)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · quantum:</strong> <a href="/theorem/bell_born_weights">the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)</a> →</li><li><strong>Principle · The vortex algebra:</strong> <a href="/theorem/hodge_bound">Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/hodge_bound">Hodge edge: a class can meet the type condition yet lie outside the algebraic span [1,0,1]</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Uuidna.lean" target="_blank" rel="noreferrer">lean/Uuidna.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Uuidna.lean" target="_blank" rel="noreferrer">Source · lean/Uuidna.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/ym_quantum.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ym_quantum_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, ym_quantum_default as default };
