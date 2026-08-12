import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/verify_cheaper_than_forge.md
var __pageData = JSON.parse("{\"title\":\"The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.\",\"description\":\"16 < 2^16 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The layered defence.\",\"frontmatter\":{\"prev\":{\"text\":\"birthday_halves_the_exponent\",\"link\":\"/theorem/birthday_halves_the_exponent\"},\"next\":{\"text\":\"no_maximum_only_bounds\",\"link\":\"/theorem/no_maximum_only_bounds\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/verify_cheaper_than_forge\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/verify_cheaper_than_forge\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"16 < 2^16 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"99df6b2c-d4fb-886a-9d14-5977338a2e38\"}]]},\"headers\":[],\"params\":{\"key\":\"verify_cheaper_than_forge\",\"name\":\"The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.\",\"principle\":\"The layered defence\",\"skill\":\"security\",\"statement\":\"16 < 2^16\",\"tactic\":\"decide\",\"address\":\"99df6b2c-d4fb-886a-9d14-5977338a2e38\"},\"relativePath\":\"theorem/verify_cheaper_than_forge.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/verify_cheaper_than_forge.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="the-asymmetry-that-makes-tamper-evidence-cheap-and-forgery-dear-verifying-a-16-bit-tag-is-16-work-forging-one-is-2-16-—-16-2-16-16-65536-anyone-rechecks-for-almost-nothing-a-forger-pays-exponentially" tabindex="-1">The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 &lt; 2^16 (16 &lt; 65536). Anyone rechecks for almost nothing; a forger pays exponentially. <a class="header-anchor" href="#the-asymmetry-that-makes-tamper-evidence-cheap-and-forgery-dear-verifying-a-16-bit-tag-is-16-work-forging-one-is-2-16-—-16-2-16-16-65536-anyone-rechecks-for-almost-nothing-a-forger-pays-exponentially" aria-label="Permalink to “The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 &lt; 2^16 (16 &lt; 65536). Anyone rechecks for almost nothing; a forger pays exponentially.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/verify_cheaper_than_forge" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(0 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(0 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/verify_cheaper_than_forge" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 &lt; 2^16 (16 &lt; 65536). Anyone rechecks for almost nothing; a forger pays exponentially.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(0 60% 40%)",
		"word-break": "break-all"
	})}">99df6b2c-d4fb-886a-9d14-5977338a2e38</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-security">security</a></strong> · principle <strong>The layered defence</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">^</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> verify_cheaper_than_forge</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> &lt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">^</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>99df6b2c-d4fb-886a-9d14-5977338a2e38</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-security">security</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The layered defence — the arithmetic of why FUSING security raises the cost of tampering, proven by decide — NOT a proof that any cryptographic primitive is secure (that rests on assumptions), and claiming NO maximum: independent layers add their bits (64 + 64 = 128) and multiply the search space (2⁸·2⁸ = 2¹⁶), each key bit doubles the space (2¹¹ = 2·2¹⁰), a collision costs about half the exponent of a preimage (2·64 = 128, the honest caveat that collisions are cheaper), verifying is exponentially cheaper than forging (16 &lt; 2¹⁶), and for every bound there is a strictly larger one (2⁸ &lt; 2⁹) so there is NO maximum, only bounds — the honest kernel of &quot;fuse security → raise tampering cost&quot;, refusing the word max</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>43 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats verify_cheaper_than_forge</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-security">security</a>:</strong> ← <a href="/theorem/birthday_halves_the_exponent">The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.</a> · <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li><li><strong>Principle · The layered defence:</strong> ← <a href="/theorem/birthday_halves_the_exponent">The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.</a> · <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/birthday_halves_the_exponent">The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.</a> · <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/tempo_ms_per_beat">At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/mul9_2_5">2·5 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · security:</strong> <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li><li><strong>Principle · The layered defence:</strong> <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/no_maximum_only_bounds">There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 &lt; 2^9 (256 &lt; 512). Add a bit and the cost grows; no scheme is the largest. This is why &quot;max tampering cost&quot; is refused — the honest claim is a bound, always exceedable.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-security.ts" target="_blank" rel="noreferrer">scripts/lean-security.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Security.lean" target="_blank" rel="noreferrer">Source · lean/Security.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/verify_cheaper_than_forge.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var verify_cheaper_than_forge_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, verify_cheaper_than_forge_default as default };
