import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/dna_complement_involution.md
var __pageData = JSON.parse("{\"title\":\"Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.\",\"description\":\"(List.range 4).all (fun x => 3 - (3 - x) == x) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The cipher & the strand.\",\"frontmatter\":{\"prev\":{\"text\":\"newton_singularity_finite\",\"link\":\"/theorem/newton_singularity_finite\"},\"next\":{\"text\":\"dna_complement_fixed_point_free\",\"link\":\"/theorem/dna_complement_fixed_point_free\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/dna_complement_involution\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/dna_complement_involution\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"(List.range 4).all (fun x => 3 - (3 - x) == x) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"bba07b66-3d21-876c-b315-d1bae6369a02\"}]]},\"headers\":[],\"params\":{\"key\":\"dna_complement_involution\",\"name\":\"Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.\",\"principle\":\"The cipher & the strand\",\"skill\":\"involution\",\"statement\":\"(List.range 4).all (fun x => 3 - (3 - x) == x)\",\"tactic\":\"decide\",\"address\":\"bba07b66-3d21-876c-b315-d1bae6369a02\"},\"relativePath\":\"theorem/dna_complement_involution.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/dna_complement_involution.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="base-pairing-is-a-self-inverse-map-the-complement-comp-x-3−x-applied-twice-is-the-identity-a↔t↔a-c↔g↔c-—-a-decrypt-that-equals-its-encrypt-like-the-diamond-reflection" tabindex="-1">Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection. <a class="header-anchor" href="#base-pairing-is-a-self-inverse-map-the-complement-comp-x-3−x-applied-twice-is-the-identity-a↔t↔a-c↔g↔c-—-a-decrypt-that-equals-its-encrypt-like-the-diamond-reflection" aria-label="Permalink to “Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/dna_complement_involution" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(280 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(280 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/dna_complement_involution" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C)</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(280 60% 40%)",
		"word-break": "break-all"
	})}">bba07b66-3d21-876c-b315-d1bae6369a02</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-involution">involution</a></strong> · principle <strong>The cipher &amp; the strand</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> x =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - x) == x)</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> dna_complement_involution</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : (List.range </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">).all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> x =&gt; </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">3</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> - x) == x) := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>bba07b66-3d21-876c-b315-d1bae6369a02</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-involution">involution</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The cipher &amp; the strand — crypto ∩ DNA, honest by construction — base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR (why a step must rotate), a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128, not a break) — the shared algebra and its honest limits</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>37 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats dna_complement_involution</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-involution">involution</a>:</strong> ← <a href="/theorem/clay_reflection_involution">the reflection dz(x)=10−x (division by zero) is an INVOLUTION — dz(dz(x))=x on every residue</a> · <a href="/theorem/reverse_bearing_involution">The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.</a> →</li><li><strong>Principle · The cipher &amp; the strand:</strong> — · <a href="/theorem/dna_complement_fixed_point_free">The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/newton_singularity_finite">The one true infinity — the Newtonian 1/r² force and 1/r potential &quot;blowing up&quot; at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always &lt; 10, never ∞. The singularity is a finite reflection.</a> · <a href="/theorem/dna_complement_fixed_point_free">The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/dna_complement_fixed_point_free">The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/affine_is_permutation">An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/codons_four_cubed">The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9pow_7_3">7^3 ≡ 1 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · involution:</strong> <a href="/theorem/reverse_bearing_involution">The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.</a> →</li><li><strong>Principle · The cipher &amp; the strand:</strong> <a href="/theorem/dna_complement_fixed_point_free">The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/dna_complement_fixed_point_free">The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-cipher.ts" target="_blank" rel="noreferrer">scripts/lean-cipher.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Cipher.lean" target="_blank" rel="noreferrer">Source · lean/Cipher.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/dna_complement_involution.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dna_complement_involution_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, dna_complement_involution_default as default };
