import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/closed_knight_tour_even.md
var __pageData = JSON.parse("{\"title\":\"Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.\",\"description\":\"64 % 2 = 0 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The chessboard.\",\"frontmatter\":{\"prev\":{\"text\":\"knight_has_eight_moves\",\"link\":\"/theorem/knight_has_eight_moves\"},\"next\":{\"text\":\"rook_open_board_fourteen\",\"link\":\"/theorem/rook_open_board_fourteen\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/closed_knight_tour_even\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/closed_knight_tour_even\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"64 % 2 = 0 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"fbab2ce3-24be-89c1-9031-f8dd5f0cbba5\"}]]},\"headers\":[],\"params\":{\"key\":\"closed_knight_tour_even\",\"name\":\"Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.\",\"principle\":\"The chessboard\",\"skill\":\"chess\",\"statement\":\"64 % 2 = 0\",\"tactic\":\"decide\",\"address\":\"fbab2ce3-24be-89c1-9031-f8dd5f0cbba5\"},\"relativePath\":\"theorem/closed_knight_tour_even.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/closed_knight_tour_even.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="because-a-knight-flips-colour-every-move-it-returns-to-its-start-colour-only-after-an-even-number-of-moves-—-so-a-closed-knight-s-tour-has-even-length-and-the-full-board-tour-is-64-even-64-2-0" tabindex="-1">Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0. <a class="header-anchor" href="#because-a-knight-flips-colour-every-move-it-returns-to-its-start-colour-only-after-an-even-number-of-moves-—-so-a-closed-knight-s-tour-has-even-length-and-the-full-board-tour-is-64-even-64-2-0" aria-label="Permalink to “Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/closed_knight_tour_even" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(320 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(320 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/closed_knight_tour_even" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(320 60% 40%)",
		"word-break": "break-all"
	})}">fbab2ce3-24be-89c1-9031-f8dd5f0cbba5</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-chess">chess</a></strong> · principle <strong>The chessboard</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">64</span><span style="${ssrRenderStyle({
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
	})}"> closed_knight_tour_even</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">64</span><span style="${ssrRenderStyle({
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
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>fbab2ce3-24be-89c1-9031-f8dd5f0cbba5</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-chess">chess</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The chessboard — chess geometry as decidable arithmetic — the board is 8×8 = 64 = 2⁶ squares in two colours of 32 each ((rank+file) parity); the knight leaps 1+2=3 (odd), so it flips colour every move and a closed tour is even; the rook reaches 7+7=14 on an open board; the bishop preserves colour, forever closed out of half the board; and the queen is rook+bishop, 7+7+7=21 from a corner — board arithmetic and parity, NOT a solved game or an engine</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>31 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats closed_knight_tour_even</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-chess">chess</a>:</strong> ← <a href="/theorem/knight_has_eight_moves">A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.</a> · <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li><li><strong>Principle · The chessboard:</strong> ← <a href="/theorem/knight_has_eight_moves">A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.</a> · <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/knight_has_eight_moves">A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.</a> · <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/repetition_three_majority">The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 &gt; 3 makes two a strict majority of three.</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/distance_three_corrects_one">A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/z9mul_2_8">2·8 ≡ 7 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · chess:</strong> <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li><li><strong>Principle · The chessboard:</strong> <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/rook_open_board_fourteen">A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-chess.ts" target="_blank" rel="noreferrer">scripts/lean-chess.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Chess.lean" target="_blank" rel="noreferrer">Source · lean/Chess.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/closed_knight_tour_even.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var closed_knight_tour_even_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, closed_knight_tour_even_default as default };
