import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/linear_tag_is_forgeable.md
var __pageData = JSON.parse("{\"title\":\"Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.\",\"description\":\"(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2)))) — proven by decide in Lean 4, sorry-free (no Mathlib); part of Command authentication.\",\"frontmatter\":{\"prev\":{\"text\":\"tamper_changes_tag\",\"link\":\"/theorem/tamper_changes_tag\"},\"next\":{\"text\":\"sky_turns_15_per_hour\",\"link\":\"/theorem/sky_turns_15_per_hour\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/linear_tag_is_forgeable\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/linear_tag_is_forgeable\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2)))) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"08671890-eab8-8c49-b0fe-eaed75b07e86\"}]]},\"headers\":[],\"params\":{\"key\":\"linear_tag_is_forgeable\",\"name\":\"Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.\",\"principle\":\"Command authentication\",\"skill\":\"foundational\",\"statement\":\"(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2))))\",\"tactic\":\"decide\",\"address\":\"08671890-eab8-8c49-b0fe-eaed75b07e86\"},\"relativePath\":\"theorem/linear_tag_is_forgeable.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/linear_tag_is_forgeable.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="why-the-mac-must-be-hmac-sha256-not-arithmetic-a-linear-tag-t-k-⊕-m-is-forgeable-—-k⊕m1-⊕-m1⊕m2-k⊕m2-so-seeing-one-command-s-tag-lets-an-attacker-forge-another-authentication-demands-a-nonlinear-keyed-mac-hmac-sha256-kat-verified-this-is-the-honest-reason-the-toy-tag-is-refused" tabindex="-1">Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command&#39;s tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused. <a class="header-anchor" href="#why-the-mac-must-be-hmac-sha256-not-arithmetic-a-linear-tag-t-k-⊕-m-is-forgeable-—-k⊕m1-⊕-m1⊕m2-k⊕m2-so-seeing-one-command-s-tag-lets-an-attacker-forge-another-authentication-demands-a-nonlinear-keyed-mac-hmac-sha256-kat-verified-this-is-the-honest-reason-the-toy-tag-is-refused" aria-label="Permalink to “Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command&#39;s tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/linear_tag_is_forgeable" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(320 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(320 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/linear_tag_is_forgeable" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command&#39;s tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(320 60% 40%)",
		"word-break": "break-all"
	})}">08671890-eab8-8c49-b0fe-eaed75b07e86</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>Command authentication</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> m1 =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> m2 =&gt; ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2))))</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> linear_tag_is_forgeable</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> k =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> m1 =&gt; (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> m2 =&gt; ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2)))) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>08671890-eab8-8c49-b0fe-eaed75b07e86</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>Command authentication — the auth gate as decidable logic — a command is accepted iff it is signed AND its tag verifies (accept = signed·verifies): unsigned rejected, a failing/tampered tag rejected, exactly one tag verifies, tampering changes the tag, and a LINEAR tag is forgeable (why the real MAC is HMAC-SHA256, KAT-verified, not this model) — the gate logic proven, the strength demarcated</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>752 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats linear_tag_is_forgeable</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/tamper_changes_tag">Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)</a> · <a href="/theorem/sky_turns_15_per_hour">The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.</a> →</li><li><strong>Principle · Command authentication:</strong> ← <a href="/theorem/tamper_changes_tag">Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)</a> · —</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/tamper_changes_tag">Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)</a> · <a href="/theorem/sky_turns_15_per_hour">The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/sky_turns_15_per_hour">The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/absolute_pressure_at_depth">Absolute pressure rises one atmosphere per 10 m of seawater: P(d) = 1 + d/10, so depths [0,10,20,30,40] m give [1,2,3,4,5] atm.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/declination_spans_180">A star&#39;s fixed coordinate is bounded: declination runs from the south celestial pole −90° to the north +90°, a span of exactly 180° — 90 − (−90) = 180. Celestial latitude is finite, a fixed reference on the sphere.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_1_3">1^3 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/sky_turns_15_per_hour">The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.</a> →</li><li><strong>Principle · Command authentication:</strong> <strong>invisible next</strong> — the missing Command authentication theorem hides here</li><li><strong>Discovery:</strong> <a href="/theorem/sky_turns_15_per_hour">The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Command.lean" target="_blank" rel="noreferrer">lean/Command.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Command.lean" target="_blank" rel="noreferrer">Source · lean/Command.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/linear_tag_is_forgeable.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var linear_tag_is_forgeable_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, linear_tag_is_forgeable_default as default };
