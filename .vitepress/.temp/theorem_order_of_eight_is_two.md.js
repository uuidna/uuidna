import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/order_of_eight_is_two.md
var __pageData = JSON.parse("{\"title\":\"the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1\",\"description\":\"((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2 — proven by decide in Lean 4, sorry-free (no Mathlib); part of Self-discovered.\",\"frontmatter\":{\"prev\":{\"text\":\"order_of_seven_is_three\",\"link\":\"/theorem/order_of_seven_is_three\"},\"next\":{\"text\":\"generators_are_two_and_five\",\"link\":\"/theorem/generators_are_two_and_five\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/order_of_eight_is_two\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/order_of_eight_is_two\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"029b27b0-6e22-8899-906b-388c9258e8b5\"}]]},\"headers\":[],\"params\":{\"key\":\"order_of_eight_is_two\",\"name\":\"the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1\",\"principle\":\"Self-discovered\",\"skill\":\"foundational\",\"statement\":\"((List.range' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2\",\"tactic\":\"decide\",\"address\":\"029b27b0-6e22-8899-906b-388c9258e8b5\"},\"relativePath\":\"theorem/order_of_eight_is_two.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/order_of_eight_is_two.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-order-of-8-is-2-—-8-≡-−1-mod-9-is-its-own-inverse-an-involution-82-64-≡-1" tabindex="-1">the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1 <a class="header-anchor" href="#the-order-of-8-is-2-—-8-≡-−1-mod-9-is-its-own-inverse-an-involution-82-64-≡-1" aria-label="Permalink to “the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/order_of_eight_is_two" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(80 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(80 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/order_of_eight_is_two" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">the order of 8 is 2</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(80 60% 40%)",
		"word-break": "break-all"
	})}">029b27b0-6e22-8899-906b-388c9258e8b5</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>Self-discovered</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> 8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).find? (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">^k) % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)) = some </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> order_of_eight_is_two</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : ((List.range&#39; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}"> 8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).find? (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">^k) % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">9</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)) = some </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>029b27b0-6e22-8899-906b-388c9258e8b5</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>Self-discovered — facts derived by function: Lagrange, the unit criterion, idempotents</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>94 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats order_of_eight_is_two</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/order_of_seven_is_three">the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3</a> · <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li><li><strong>Principle · Self-discovered:</strong> ← <a href="/theorem/order_of_seven_is_three">the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3</a> · <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/order_of_seven_is_three">the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3</a> · <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/cnot_truth_table">CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/ghz3_two_outcomes">GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z7mul_2_3">2·3 ≡ 6 (mod 7)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li><li><strong>Principle · Self-discovered:</strong> <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/generators_are_two_and_five">the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-discover.ts" target="_blank" rel="noreferrer">scripts/lean-discover.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Discover.lean" target="_blank" rel="noreferrer">Source · lean/Discover.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/order_of_eight_is_two.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var order_of_eight_is_two_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, order_of_eight_is_two_default as default };
