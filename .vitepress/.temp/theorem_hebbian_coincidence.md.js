import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/hebbian_coincidence.md
var __pageData = JSON.parse("{\"title\":\"\\\"Fire together, wire together\\\": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.\",\"description\":\"(List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1))) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The algebra of the neuron.\",\"frontmatter\":{\"prev\":{\"text\":\"action_potential_swing\",\"link\":\"/theorem/action_potential_swing\"},\"next\":{\"text\":\"refractory_caps_spike\",\"link\":\"/theorem/refractory_caps_spike\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/hebbian_coincidence\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/hebbian_coincidence\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"\\\"Fire together, wire together\\\": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1))) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"7e051e64-bd90-8057-8af6-d11a81bc4dbb\"}]]},\"headers\":[],\"params\":{\"key\":\"hebbian_coincidence\",\"name\":\"\\\"Fire together, wire together\\\": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.\",\"principle\":\"The algebra of the neuron\",\"skill\":\"foundational\",\"statement\":\"(List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1)))\",\"tactic\":\"decide\",\"address\":\"7e051e64-bd90-8057-8af6-d11a81bc4dbb\"},\"relativePath\":\"theorem/hebbian_coincidence.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/hebbian_coincidence.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="fire-together-wire-together-the-hebbian-weight-change-δw-pre·post-is-1-exactly-when-both-the-pre-and-post-synaptic-neurons-fire-—-coincidence-detection-an-and" tabindex="-1">&quot;Fire together, wire together&quot;: the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND. <a class="header-anchor" href="#fire-together-wire-together-the-hebbian-weight-change-δw-pre·post-is-1-exactly-when-both-the-pre-and-post-synaptic-neurons-fire-—-coincidence-detection-an-and" aria-label="Permalink to “&quot;Fire together, wire together&quot;: the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/hebbian_coincidence" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(0 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(0 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/hebbian_coincidence" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">&quot;Fire together, wire together&quot;: the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">&quot;Fire together, wire together&quot;: the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(0 60% 40%)",
		"word-break": "break-all"
	})}">7e051e64-bd90-8057-8af6-d11a81bc4dbb</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The algebra of the neuron</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> a =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> b =&gt; (a * b == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) == (a == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; b == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)))</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> hebbian_coincidence</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> a =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> b =&gt; (a * b == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) == (a == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &amp;&amp; b == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">))) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>7e051e64-bd90-8057-8af6-d11a81bc4dbb</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The algebra of the neuron — neuroscience, demarcated — all-or-none firing as a threshold step, sub-threshold silence, supra-threshold spike, monotone firing, spatial summation (two sub-threshold inputs sum to fire), the excitatory−inhibitory net drive, the −70→+40 mV action potential (rest &lt; threshold &lt; peak), Hebbian coincidence (Δw = pre·post), and the refractory cap — the textbook model as decidable algebra, not clinical and not about any individual</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>52 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats hebbian_coincidence</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/action_potential_swing">The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest &lt; threshold &lt; peak.</a> · <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li><li><strong>Principle · The algebra of the neuron:</strong> ← <a href="/theorem/action_potential_swing">The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest &lt; threshold &lt; peak.</a> · <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/action_potential_swing">The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest &lt; threshold &lt; peak.</a> · <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/reverse_bearing_involution">The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/pythagorean_3_4_5">Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_3_5">3^5 ≡ 0 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li><li><strong>Principle · The algebra of the neuron:</strong> <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/refractory_caps_spike">The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 &lt; 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-neuro.ts" target="_blank" rel="noreferrer">scripts/lean-neuro.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Neuro.lean" target="_blank" rel="noreferrer">Source · lean/Neuro.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/hebbian_coincidence.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var hebbian_coincidence_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, hebbian_coincidence_default as default };
