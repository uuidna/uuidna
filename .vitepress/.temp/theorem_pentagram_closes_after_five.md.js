import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/pentagram_closes_after_five.md
var __pageData = JSON.parse("{\"title\":\"The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.\",\"description\":\"(2*5) % 5 = 0 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The pentagram & the Fibonacci digits.\",\"frontmatter\":{\"prev\":{\"text\":\"pentagon_single_stroke\",\"link\":\"/theorem/pentagon_single_stroke\"},\"next\":{\"text\":\"pentagram_step_coprime_five\",\"link\":\"/theorem/pentagram_step_coprime_five\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/pentagram_closes_after_five\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/pentagram_closes_after_five\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(2*5) % 5 = 0 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"801125ab-d59b-882c-8ec5-b9aed57169f8\"}]]},\"headers\":[],\"params\":{\"key\":\"pentagram_closes_after_five\",\"name\":\"The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.\",\"principle\":\"The pentagram & the Fibonacci digits\",\"skill\":\"pentagram\",\"statement\":\"(2*5) % 5 = 0\",\"tactic\":\"decide\",\"address\":\"801125ab-d59b-882c-8ec5-b9aed57169f8\"},\"relativePath\":\"theorem/pentagram_closes_after_five.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/pentagram_closes_after_five.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-star-closes-five-steps-of-2-return-to-the-start-—-2·5-mod-5-0-a-pentagram-is-exactly-one-full-turn-of-the-twos" tabindex="-1">The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos. <a class="header-anchor" href="#the-star-closes-five-steps-of-2-return-to-the-start-—-2·5-mod-5-0-a-pentagram-is-exactly-one-full-turn-of-the-twos" aria-label="Permalink to “The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/pentagram_closes_after_five" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(80 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(80 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/pentagram_closes_after_five" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The star closes: five steps of +2 return to the start</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(80 60% 40%)",
		"word-break": "break-all"
	})}">801125ab-d59b-882c-8ec5-b9aed57169f8</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-pentagram">pentagram</a></strong> · principle <strong>The pentagram &amp; the Fibonacci digits</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">(</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
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
	})}"> pentagram_closes_after_five</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">*</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">5</span><span style="${ssrRenderStyle({
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
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>801125ab-d59b-882c-8ec5-b9aed57169f8</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-pentagram">pentagram</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The pentagram &amp; the Fibonacci digits — five-fold symmetry as decidable arithmetic — the pentagram is the star polygon {5/2}: stepping +2 mod 5 is coprime to 5, so it draws in a SINGLE stroke visiting all five points, closing after one full turn, its five point-angles summing to 180°; and the single-digit (mod 9) Fibonacci — the digital root — is periodic, closing into a 24-cycle (its Pisano period), the SAME recurrence read through the pentagram (mod 5, period 20) and the rosette (mod 7, period 16) — one sequence, three moduli, three finite cycles; finite periodic single digits, NOT a claim about the irrational golden ratio the pentagram encodes</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>179 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats pentagram_closes_after_five</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-pentagram">pentagram</a>:</strong> ← <a href="/theorem/pentagon_single_stroke">The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.</a> · <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li><li><strong>Principle · The pentagram &amp; the Fibonacci digits:</strong> ← <a href="/theorem/pentagon_single_stroke">The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.</a> · <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/pentagon_single_stroke">The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.</a> · <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/pentagon_interior_angle_108">The human pentagram’s pentagon: each interior angle is 108° — (5−2)·180 = 540, and 540 = 5·108. A finite count of degrees, exact; the five points fold to a half-turn (5·36 = 180).</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/trinity_rosette_coprime">The trinity (3) and the rosette (7) are coprime — gcd(3,7)=1 — so a step of 3 permutes ℤ/7 (visits every ray), and ℤ/3 and ℤ/7 fuse into a single ℤ/21 cycle (the Chinese remainder theorem). Coprimality IS the fusion.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_3_6">3+6 ≡ 0 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · pentagram:</strong> <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li><li><strong>Principle · The pentagram &amp; the Fibonacci digits:</strong> <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/pentagram_step_coprime_five">WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-pentagram.ts" target="_blank" rel="noreferrer">scripts/lean-pentagram.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Pentagram.lean" target="_blank" rel="noreferrer">Source · lean/Pentagram.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/pentagram_closes_after_five.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pentagram_closes_after_five_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, pentagram_closes_after_five_default as default };
