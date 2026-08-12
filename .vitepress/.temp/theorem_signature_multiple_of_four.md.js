import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/signature_multiple_of_four.md
var __pageData = JSON.parse("{\"title\":\"A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.\",\"description\":\"[4,8,16,32].all (fun p => p % 4 == 0) — proven by decide in Lean 4, sorry-free (no Mathlib); part of The measures of type.\",\"frontmatter\":{\"prev\":{\"text\":\"folio_quarto_octavo\",\"link\":\"/theorem/folio_quarto_octavo\"},\"next\":{\"text\":\"page_diagonal_three_four_five\",\"link\":\"/theorem/page_diagonal_three_four_five\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/signature_multiple_of_four\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/signature_multiple_of_four\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"[4,8,16,32].all (fun p => p % 4 == 0) — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"49d042e3-6725-8a97-a749-a994518b45ea\"}]]},\"headers\":[],\"params\":{\"key\":\"signature_multiple_of_four\",\"name\":\"A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.\",\"principle\":\"The measures of type\",\"skill\":\"typesetting\",\"statement\":\"[4,8,16,32].all (fun p => p % 4 == 0)\",\"tactic\":\"decide\",\"address\":\"49d042e3-6725-8a97-a749-a994518b45ea\"},\"relativePath\":\"theorem/signature_multiple_of_four.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/signature_multiple_of_four.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="a-folded-sheet-is-always-four-pages-so-every-bound-signature-is-a-multiple-of-four-4-8-16-32-each-divide-by-4-—-why-a-book-s-page-count-never-lands-on-an-odd-remainder" tabindex="-1">A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder. <a class="header-anchor" href="#a-folded-sheet-is-always-four-pages-so-every-bound-signature-is-a-multiple-of-four-4-8-16-32-each-divide-by-4-—-why-a-book-s-page-count-never-lands-on-an-odd-remainder" aria-label="Permalink to “A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/signature_multiple_of_four" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(40 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(40 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/signature_multiple_of_four" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">A folded sheet is always four pages, so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — why a book’s page count never lands on an odd remainder.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(40 60% 40%)",
		"word-break": "break-all"
	})}">49d042e3-6725-8a97-a749-a994518b45ea</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-typesetting">typesetting</a></strong> · principle <strong>The measures of type</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">[</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">32</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">].all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> p =&gt; p % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
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
	})}"> signature_multiple_of_four</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : [</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">8</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">16</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">,</span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">32</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}">].all (</span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">fun</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> p =&gt; p % </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">4</span><span style="${ssrRenderStyle({
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
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>49d042e3-6725-8a97-a749-a994518b45ea</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-typesetting">typesetting</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The measures of type — typesetting and bookbinding as decidable arithmetic, the craft beneath the publications — the printer&#39;s units close exactly (6 picas of 12 points make the 72-point inch); a folded sheet is a folio (2 leaves, 4 pages), folded again a quarto (8), again an octavo (16), leaves doubling so pages run in powers of two and every bound signature is a multiple of four; the harmonious page is the 3:4 rectangle whose diagonal is a whole 5 (3²+4²=5²); the readable measure is 66 characters, inside the 45–75 a typographer keeps; leading exceeds its type (12 on 14); a ream is 500 sheets (20 quires of 25); and a leaf has a recto (odd) and a verso (even) — the arithmetic of the page, NOT a layout engine or a font renderer</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>71 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats signature_multiple_of_four</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-typesetting">typesetting</a>:</strong> ← <a href="/theorem/folio_quarto_octavo">Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.</a> · <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li><li><strong>Principle · The measures of type:</strong> ← <a href="/theorem/folio_quarto_octavo">Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.</a> · <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/folio_quarto_octavo">Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages, the book built by halving.</a> · <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/uhd_is_four_times_hd">A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/frames_per_minute">A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9mul_0_8">0·8 ≡ 0 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · typesetting:</strong> <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li><li><strong>Principle · The measures of type:</strong> <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/page_diagonal_three_four_five">The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, ratios a compositor can strike with a knotted cord.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-typesetting.ts" target="_blank" rel="noreferrer">scripts/lean-typesetting.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Typesetting.lean" target="_blank" rel="noreferrer">Source · lean/Typesetting.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/signature_multiple_of_four.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var signature_multiple_of_four_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, signature_multiple_of_four_default as default };
