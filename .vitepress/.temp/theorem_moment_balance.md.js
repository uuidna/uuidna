import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/moment_balance.md
var __pageData = JSON.parse("{\"title\":\"Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.\",\"description\":\"6 * 2 = 4 * 3 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The structures domain.\",\"frontmatter\":{\"prev\":{\"text\":\"force_equilibrium\",\"link\":\"/theorem/force_equilibrium\"},\"next\":{\"text\":\"mechanical_advantage\",\"link\":\"/theorem/mechanical_advantage\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/moment_balance\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/moment_balance\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"6 * 2 = 4 * 3 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"ac2cd6f5-e503-842a-9faa-082e34333267\"}]]},\"headers\":[],\"params\":{\"key\":\"moment_balance\",\"name\":\"Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.\",\"principle\":\"The structures domain\",\"skill\":\"foundational\",\"statement\":\"6 * 2 = 4 * 3\",\"tactic\":\"decide\",\"address\":\"ac2cd6f5-e503-842a-9faa-082e34333267\"},\"relativePath\":\"theorem/moment_balance.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/moment_balance.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="moments-balance-about-a-pivot-στ-0-a-6-n-force-at-2-m-balances-a-4-n-force-at-3-m-—-6·2-4·3-12-n·m-torque-is-force-times-lever-arm-and-a-seesaw-settles-when-they-match" tabindex="-1">Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match. <a class="header-anchor" href="#moments-balance-about-a-pivot-στ-0-a-6-n-force-at-2-m-balances-a-4-n-force-at-3-m-—-6·2-4·3-12-n·m-torque-is-force-times-lever-arm-and-a-seesaw-settles-when-they-match" aria-label="Permalink to “Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/moment_balance" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(40 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(40 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/moment_balance" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(40 60% 40%)",
		"word-break": "break-all"
	})}">ac2cd6f5-e503-842a-9faa-082e34333267</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The structures domain</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
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
	})}"> moment_balance</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
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
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>ac2cd6f5-e503-842a-9faa-082e34333267</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The structures domain — statics as decidable arithmetic, demarcated — forces sum to zero and moments balance in equilibrium, a lever gives mechanical advantage, the centre of mass is the weighted average, a simply-supported beam splits a central load evenly, a rigid planar truss obeys Maxwell&#39;s rule m=2j−3, stress is force over area, and Hooke&#39;s law is linear — equilibrium arithmetic, not finite-element analysis</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>52 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats moment_balance</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/force_equilibrium">A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.</a> · <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li><li><strong>Principle · The structures domain:</strong> ← <a href="/theorem/force_equilibrium">A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.</a> · <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/force_equilibrium">A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.</a> · <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/beating_sailing_triangle">Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that triangle.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/no_go_zone">A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 = 90) where the sails luff and make no power. To go upwind you must sail around it, not through it.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9mul_5_8">5·8 ≡ 4 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li><li><strong>Principle · The structures domain:</strong> <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/mechanical_advantage">A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Statics.lean" target="_blank" rel="noreferrer">lean/Statics.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Statics.lean" target="_blank" rel="noreferrer">Source · lean/Statics.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/moment_balance.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var moment_balance_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, moment_balance_default as default };
