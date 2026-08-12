import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/handshake_degree_sum_even.md
var __pageData = JSON.parse("{\"title\":\"The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.\",\"description\":\"List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The matching.\",\"frontmatter\":{\"prev\":{\"text\":\"pairs_share_one_centre\",\"link\":\"/theorem/pairs_share_one_centre\"},\"next\":{\"text\":\"edges_are_half_the_degree_sum\",\"link\":\"/theorem/edges_are_half_the_degree_sum\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/handshake_degree_sum_even\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/handshake_degree_sum_even\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"ae4ec46e-5e42-8e12-8e57-3628f6ef257c\"}]]},\"headers\":[],\"params\":{\"key\":\"handshake_degree_sum_even\",\"name\":\"The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.\",\"principle\":\"The matching\",\"skill\":\"matching\",\"statement\":\"List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0\",\"tactic\":\"decide\",\"address\":\"ae4ec46e-5e42-8e12-8e57-3628f6ef257c\"},\"relativePath\":\"theorem/handshake_degree_sum_even.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/handshake_degree_sum_even.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-handshake-lemma-every-edge-touches-two-people-so-summing-how-many-each-is-connected-to-double-counts-the-edges-—-the-degree-sum-is-always-even-here-1-3-2-2-1-1-sums-to-10-and-10-is-even" tabindex="-1">The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even. <a class="header-anchor" href="#the-handshake-lemma-every-edge-touches-two-people-so-summing-how-many-each-is-connected-to-double-counts-the-edges-—-the-degree-sum-is-always-even-here-1-3-2-2-1-1-sums-to-10-and-10-is-even" aria-label="Permalink to “The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/handshake_degree_sum_even" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(120 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(120 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/handshake_degree_sum_even" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(120 60% 40%)",
		"word-break": "break-all"
	})}">ae4ec46e-5e42-8e12-8e57-3628f6ef257c</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-matching">matching</a></strong> · principle <strong>The matching</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">List.sum [</span><span style="${ssrRenderStyle({
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
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> ∧ </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> handshake_degree_sum_even</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : List.sum [</span><span style="${ssrRenderStyle({
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
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">1</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">] = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> ∧ </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">10</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>ae4ec46e-5e42-8e12-8e57-3628f6ef257c</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-matching">matching</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The matching — connecting people as decidable arithmetic — the HONEST kernel of &quot;social dating / connecting people&quot;, stated with its scope: uuidna is a theorem ledger and a content-addresser, it does NOT run a dating service, hold anyone&#39;s profile, or match real people; matching real humans means personal data, consent and safety obligations that live OUTSIDE these theorems (see /privacy). What IS sealed is only the graph theory a matching rests on: the handshake lemma (every edge touches two, so the degree sum is even and the edges are half of it), the count of possible introductions among n people (n(n−1)/2, ten among five), a perfect matching needs an EVEN number of people (six pair, five leave one out) and splits them in half, a mutual match is SYMMETRIC (both must choose — a one-sided choice is not a match), a pairing is a fixed-point-free involution (each partnered with exactly one other, no self-pairing), and — the honest ceiling — stable matching (Gale–Shapley) halts in AT MOST n² proposals, BOUNDED not free, the same &quot;no maximum, only bounds&quot; the security layer proves — the arithmetic of connection, NOT a matchmaking product or anyone&#39;s data</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>103 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats handshake_degree_sum_even</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-matching">matching</a>:</strong> — · <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li><li><strong>Principle · The matching:</strong> — · <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/pairs_share_one_centre">THE HARMONY: every pair above is reflection through a centre n (c ↦ n−c), self-inverse for EVERY centre — so the four bases (n=3), electric charge (n=0) and pH (n=14) are the SAME involution at different centres. One structure, four sciences; this is what &quot;harmonise the pairs&quot; means, proven.</a> · <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/modus_tollens">Modus tollens: from ¬q and (p → q), ¬p follows — !(¬q ∧ (p → q)) ∨ ¬p holds on every row. Deny the consequent, deny the antecedent.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/mutual_match_is_symmetric">A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/mul9_5_2">5·2 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · matching:</strong> <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li><li><strong>Principle · The matching:</strong> <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/edges_are_half_the_degree_sum">Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-matching.ts" target="_blank" rel="noreferrer">scripts/lean-matching.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Matching.lean" target="_blank" rel="noreferrer">Source · lean/Matching.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/handshake_degree_sum_even.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var handshake_degree_sum_even_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, handshake_degree_sum_even_default as default };
