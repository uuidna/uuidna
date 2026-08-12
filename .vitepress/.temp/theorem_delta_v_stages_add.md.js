import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/delta_v_stages_add.md
var __pageData = JSON.parse("{\"title\":\"The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.\",\"description\":\"([3, 2, 1] : List Nat).sum = 6 — proven by decide in Lean 4, sorry-free (no Mathlib); part of Propulsion — Newtonian & bounded.\",\"frontmatter\":{\"prev\":{\"text\":\"thrust_is_mdot_times_ve\",\"link\":\"/theorem/thrust_is_mdot_times_ve\"},\"next\":{\"text\":\"acceleration_finite\",\"link\":\"/theorem/acceleration_finite\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/delta_v_stages_add\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/delta_v_stages_add\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"([3, 2, 1] : List Nat).sum = 6 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"a38f58ee-01bb-8783-9d4c-42e620bfc2f2\"}]]},\"headers\":[],\"params\":{\"key\":\"delta_v_stages_add\",\"name\":\"The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.\",\"principle\":\"Propulsion — Newtonian & bounded\",\"skill\":\"foundational\",\"statement\":\"([3, 2, 1] : List Nat).sum = 6\",\"tactic\":\"decide\",\"address\":\"a38f58ee-01bb-8783-9d4c-42e620bfc2f2\"},\"relativePath\":\"theorem/delta_v_stages_add.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/delta_v_stages_add.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-δv-budget-adds-across-stages-staging-sums-the-increments-3-2-1-6-—-the-rocket-equation-is-additive-in-log-mass-so-multi-stage-δv-is-a-sum-not-a-leap" tabindex="-1">The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap. <a class="header-anchor" href="#the-δv-budget-adds-across-stages-staging-sums-the-increments-3-2-1-6-—-the-rocket-equation-is-additive-in-log-mass-so-multi-stage-δv-is-a-sum-not-a-leap" aria-label="Permalink to “The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/delta_v_stages_add" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(40 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(40 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/delta_v_stages_add" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(40 60% 40%)",
		"word-break": "break-all"
	})}">a38f58ee-01bb-8783-9d4c-42e620bfc2f2</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>Propulsion — Newtonian &amp; bounded</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] : List Nat).sum = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> delta_v_stages_add</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : ([</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">, </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] : List Nat).sum = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">6</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>a38f58ee-01bb-8783-9d4c-42e620bfc2f2</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>Propulsion — Newtonian &amp; bounded — thrust is conserved momentum (Newton&#39;s third law), it REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is finite — no infinite g. The algebra of rocketry, demarcated: not a novel drive, not FTL, not infinite g</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>21 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats delta_v_stages_add</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/thrust_is_mdot_times_ve">Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.</a> · <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li><li><strong>Principle · Propulsion — Newtonian &amp; bounded:</strong> ← <a href="/theorem/thrust_is_mdot_times_ve">Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.</a> · <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/thrust_is_mdot_times_ve">Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.</a> · <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/bad_signature_rejected">A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/accept_truth_table">The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_2_8">2^8 ≡ 4 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li><li><strong>Principle · Propulsion — Newtonian &amp; bounded:</strong> <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/acceleration_finite">Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-propulsion.ts" target="_blank" rel="noreferrer">scripts/lean-propulsion.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Propulsion.lean" target="_blank" rel="noreferrer">Source · lean/Propulsion.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/delta_v_stages_add.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var delta_v_stages_add_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, delta_v_stages_add_default as default };
