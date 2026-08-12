import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/seconds_per_day.md
var __pageData = JSON.parse("{\"title\":\"The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.\",\"description\":\"24 * 60 * 60 = 86400 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The time coordinate.\",\"frontmatter\":{\"prev\":{\"text\":\"pliska_seven_is_prime\",\"link\":\"/theorem/pliska_seven_is_prime\"},\"next\":{\"text\":\"sidereal_gains_one_turn\",\"link\":\"/theorem/sidereal_gains_one_turn\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/seconds_per_day\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/seconds_per_day\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"24 * 60 * 60 = 86400 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"79f1b464-5264-8451-a185-6de43008bf5a\"}]]},\"headers\":[],\"params\":{\"key\":\"seconds_per_day\",\"name\":\"The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.\",\"principle\":\"The time coordinate\",\"skill\":\"foundational\",\"statement\":\"24 * 60 * 60 = 86400\",\"tactic\":\"decide\",\"address\":\"79f1b464-5264-8451-a185-6de43008bf5a\"},\"relativePath\":\"theorem/seconds_per_day.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/seconds_per_day.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-base-of-the-time-coordinate-a-day-is-24-hours-of-60-minutes-of-60-seconds-—-24·60·60-86400-seconds-every-clock-counts-up-from-that-grid" tabindex="-1">The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid. <a class="header-anchor" href="#the-base-of-the-time-coordinate-a-day-is-24-hours-of-60-minutes-of-60-seconds-—-24·60·60-86400-seconds-every-clock-counts-up-from-that-grid" aria-label="Permalink to “The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/seconds_per_day" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(160 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(160 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/seconds_per_day" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(160 60% 40%)",
		"word-break": "break-all"
	})}">79f1b464-5264-8451-a185-6de43008bf5a</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>The time coordinate</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">24</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">60</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">60</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">86400</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> seconds_per_day</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">24</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">60</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> * </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">60</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">86400</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>79f1b464-5264-8451-a185-6de43008bf5a</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The time coordinate — the astronomical time coordinate as decidable arithmetic, demarcated — a day is 86400 seconds, the Earth gains one turn against the stars each year (366=365+1), the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400 (97 leap days), mean motion advances longitude linearly, eclipses recur on the Saros (~223 months), the Sun creeps under a degree per day, and a Julian Date is a continuous day count — calendar and mean-motion arithmetic, not a perturbed ephemeris, distinct from the positional facts in Astronomy</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>53 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats seconds_per_day</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/pliska_seven_is_prime">Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.</a> · <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li><li><strong>Principle · The time coordinate:</strong> — · <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/pliska_seven_is_prime">Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.</a> · <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/pentagon_single_stroke">The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/julian_date_is_a_day_count">A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9add_4_2">4+2 ≡ 6 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li><li><strong>Principle · The time coordinate:</strong> <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/sidereal_gains_one_turn">The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Ephemeris.lean" target="_blank" rel="noreferrer">lean/Ephemeris.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Ephemeris.lean" target="_blank" rel="noreferrer">Source · lean/Ephemeris.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/seconds_per_day.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var seconds_per_day_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, seconds_per_day_default as default };
