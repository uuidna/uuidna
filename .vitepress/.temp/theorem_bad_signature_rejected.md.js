import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/bad_signature_rejected.md
var __pageData = JSON.parse("{\"title\":\"A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.\",\"description\":\"(List.range 2).all (fun s => accept s 0 == 0) — proven by decide in Lean 4, sorry-free (no Mathlib); part of Command authentication.\",\"frontmatter\":{\"prev\":{\"text\":\"unsigned_rejected\",\"link\":\"/theorem/unsigned_rejected\"},\"next\":{\"text\":\"accept_matches_spec\",\"link\":\"/theorem/accept_matches_spec\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/bad_signature_rejected\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/bad_signature_rejected\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 2).all (fun s => accept s 0 == 0) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"af0d7807-f923-8294-8cfb-c0a6545201db\"}]]},\"headers\":[],\"params\":{\"key\":\"bad_signature_rejected\",\"name\":\"A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.\",\"principle\":\"Command authentication\",\"skill\":\"foundational\",\"statement\":\"(List.range 2).all (fun s => accept s 0 == 0)\",\"tactic\":\"decide\",\"address\":\"af0d7807-f923-8294-8cfb-c0a6545201db\"},\"relativePath\":\"theorem/bad_signature_rejected.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/bad_signature_rejected.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="a-failing-or-tampered-tag-is-rejected-when-the-tag-does-not-verify-verifies-0-accept-s-0-0-even-if-the-command-is-signed-—-a-wrong-or-altered-signature-does-not-pass" tabindex="-1">A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass. <a class="header-anchor" href="#a-failing-or-tampered-tag-is-rejected-when-the-tag-does-not-verify-verifies-0-accept-s-0-0-even-if-the-command-is-signed-—-a-wrong-or-altered-signature-does-not-pass" aria-label="Permalink to “A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/bad_signature_rejected" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(160 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(160 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/bad_signature_rejected" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(160 60% 40%)",
		"word-break": "break-all"
	})}">af0d7807-f923-8294-8cfb-c0a6545201db</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-foundational">foundational</a></strong> · principle <strong>Command authentication</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> s =&gt; accept s </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">)</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> bad_signature_rejected</span><span style="${ssrRenderStyle({
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
	})}"> s =&gt; accept s </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> == </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">0</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>af0d7807-f923-8294-8cfb-c0a6545201db</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-foundational">foundational</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>Command authentication — the auth gate as decidable logic — a command is accepted iff it is signed AND its tag verifies (accept = signed·verifies): unsigned rejected, a failing/tampered tag rejected, exactly one tag verifies, tampering changes the tag, and a LINEAR tag is forgeable (why the real MAC is HMAC-SHA256, KAT-verified, not this model) — the gate logic proven, the strength demarcated</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>23 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats bad_signature_rejected</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-foundational">foundational</a>:</strong> ← <a href="/theorem/unsigned_rejected">An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.</a> · <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li><li><strong>Principle · Command authentication:</strong> ← <a href="/theorem/unsigned_rejected">An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.</a> · <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/unsigned_rejected">An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.</a> · <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/metonic_cycle">The Metonic cycle: 19 solar years fold almost exactly into 235 synodic (lunar) months — 19 × 12 = 228 ordinary months plus 7 intercalary (leap) months = 235. The Sun and Moon realign every 19 years.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/sexagesimal_arcseconds">Sexagesimal (Babylonian base-60) measure: 60 arcminutes to a degree and 60 arcseconds to an arcminute give 3600 arcseconds per degree — 60 × 60 = 3600.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_1_7">1^7 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · foundational:</strong> <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li><li><strong>Principle · Command authentication:</strong> <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/accept_matches_spec">The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.</a> →</li></ul><p>To make the invisible next visible, add a theorem in <a href="https://github.com/uuidna/uuidna/blob/main/lean/Command.lean" target="_blank" rel="noreferrer">lean/Command.lean</a> (hand-authored, verified by <code>lean</code>); then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Command.lean" target="_blank" rel="noreferrer">Source · lean/Command.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/bad_signature_rejected.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bad_signature_rejected_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, bad_signature_rejected_default as default };
