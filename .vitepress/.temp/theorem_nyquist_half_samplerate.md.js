import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.BOaGB7Aw.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { resolveComponent, useSSRContext } from "vue";
//#region docs/theorem/nyquist_half_samplerate.md
var __pageData = JSON.parse("{\"title\":\"Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.\",\"description\":\"44100 / 2 = 22050 — proven by decide in Lean 4, sorry-free (no Mathlib); part of The mix.\",\"frontmatter\":{\"prev\":{\"text\":\"tempo_ms_per_beat\",\"link\":\"/theorem/tempo_ms_per_beat\"},\"next\":{\"text\":\"midi_is_seven_bit\",\"link\":\"/theorem/midi_is_seven_bit\"},\"head\":[[\"link\",{\"rel\":\"canonical\",\"href\":\"https://uuidna.com/theorem/nyquist_half_samplerate\"}],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://uuidna.com/theorem/nyquist_half_samplerate\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"44100 / 2 = 22050 — proven by decide in Lean 4.\"}],[\"meta\",{\"property\":\"uuidna:address\",\"content\":\"f15ce821-bc3b-8caa-b074-6526eb55439c\"}]]},\"headers\":[],\"params\":{\"key\":\"nyquist_half_samplerate\",\"name\":\"Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.\",\"principle\":\"The mix\",\"skill\":\"music-production\",\"statement\":\"44100 / 2 = 22050\",\"tactic\":\"decide\",\"address\":\"f15ce821-bc3b-8caa-b074-6526eb55439c\"},\"relativePath\":\"theorem/nyquist_half_samplerate.md\",\"filePath\":\"theorem/[key].md\",\"lastUpdated\":1786398357000}");
var _sfc_main = { name: "theorem/nyquist_half_samplerate.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_RefererCompass = resolveComponent("RefererCompass");
	_push(`<div${ssrRenderAttrs(_attrs)}><h1 id="nyquist-a-44-1-khz-stream-can-represent-frequencies-up-to-half-its-rate-—-44100-2-22050-hz-the-honest-ceiling-above-which-detail-aliases-not-lossless-a-bound" tabindex="-1">Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound. <a class="header-anchor" href="#nyquist-a-44-1-khz-stream-can-represent-frequencies-up-to-half-its-rate-—-44100-2-22050-hz-the-honest-ceiling-above-which-detail-aliases-not-lossless-a-bound" aria-label="Permalink to “Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.”">​</a></h1><article class="uuidna-card" data-slot="card" itemscope itemtype="https://schema.org/CreativeWork" data-proof="/theorem/nyquist_half_samplerate" style="${ssrRenderStyle({
		"border-left": "4px solid hsl(280 60% 50%)",
		"padding": ".6rem .9rem",
		"margin": ".5rem 0",
		"border-radius": "8px",
		"background": "hsl(280 60% 50% / .06)",
		"font": "14px/1.5 system-ui,sans-serif"
	})}"><div data-slot="card-header"><h3 data-slot="card-title" itemprop="name" style="${ssrRenderStyle({
		"margin": "0 0 .3rem",
		"font-size": "1rem"
	})}"><a itemprop="url" href="/theorem/nyquist_half_samplerate" style="${ssrRenderStyle({
		"color": "inherit",
		"text-decoration": "none"
	})}">Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate</a></h3><p data-slot="card-description" itemprop="description" style="${ssrRenderStyle({
		"margin": "0",
		"color": "#6a6a6a",
		"font-size": ".82rem"
	})}">Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.</p></div><div data-slot="card-content"><code itemprop="identifier" style="${ssrRenderStyle({
		"display": "block",
		"margin-top": ".4rem",
		"font-size": ".78rem",
		"color": "hsl(280 60% 40%)",
		"word-break": "break-all"
	})}">f15ce821-bc3b-8caa-b074-6526eb55439c</code></div><div data-slot="card-footer"><small style="${ssrRenderStyle({ "color": "#9a9a9a" })}">integrity, not truth</small></div></article><p><strong>SEALED</strong> · <strong>TRUE — proven in Lean</strong> · skill <strong><a href="/topics#skill-music-production">music-production</a></strong> · principle <strong>The mix</strong></p><h2 id="statement-formula" tabindex="-1">Statement (formula) <a class="header-anchor" href="#statement-formula" aria-label="Permalink to “Statement (formula)”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
		"--shiki-light": "#24292e",
		"--shiki-dark": "#e1e4e8",
		"--shiki-light-bg": "#fff",
		"--shiki-dark-bg": "#24292e"
	})}" tabindex="0" dir="ltr"><code><span class="line"><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">44100</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> / </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">22050</span></span></code></pre></div><h2 id="proof" tabindex="-1">Proof <a class="header-anchor" href="#proof" aria-label="Permalink to “Proof”">​</a></h2><div class="language-lean"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">lean</span><pre class="shiki shiki-themes github-light github-dark" style="${ssrRenderStyle({
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
	})}"> nyquist_half_samplerate</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> : </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">44100</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> / </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">2</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> = </span><span style="${ssrRenderStyle({
		"--shiki-light": "#005CC5",
		"--shiki-dark": "#79B8FF"
	})}">22050</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> := </span><span style="${ssrRenderStyle({
		"--shiki-light": "#c62739",
		"--shiki-dark": "#F97583"
	})}">by</span><span style="${ssrRenderStyle({
		"--shiki-light": "#24292E",
		"--shiki-dark": "#E1E4E8"
	})}"> decide</span></span></code></pre></div><table tabindex="0"><thead><tr><th>field</th><th>value</th></tr></thead><tbody><tr><td>content-address</td><td><code>f15ce821-bc3b-8caa-b074-6526eb55439c</code></td></tr><tr><td>skill</td><td><a href="/topics#skill-music-production">music-production</a> — the capability hub (every theorem sharing it)</td></tr><tr><td>principle</td><td>The mix — music production as decidable arithmetic and the studio INVOLUTIONS made exact — reversing a clip is self-inverse (reverse twice returns), inverting its phase (x ↦ −x) is self-inverse, and their FUSION reverse-then-invert is ITSELF an involution (applied twice, the identity): the ultimate test that reverse and inverse compose to a clean self-inverse, proven on a real signal. Around them the counting of the studio: the chromatic scale is ℤ/12 (the octave wraps like the rosette), an octave doubles frequency (440→880), 120 BPM is 500 ms a beat and 2 s a 4/4 bar, Nyquist is half the sample rate (44.1 k → 22.05 k, the honest ceiling, not lossless), MIDI is 7-bit (128 notes, 0..127), 16-bit is the ~6 dB-per-bit rule of thumb (≈96 dB), and the circle of fifths is ONE cycle (7 semitones coprime to 12 visits all twelve, the pentagram idea in sound) — the arithmetic and involutions of the mix, NOT a DAW, a synth or a mastering chain</td></tr><tr><td>verdict</td><td><strong>SEALED</strong> — its <code>by decide</code> proof compiles sorry-free (Lean 4.33.0, no Mathlib)</td></tr><tr><td>decide-step cost</td><td><strong>31 heartbeats</strong> — the deterministic, machine-independent work <code>by decide</code> does to verify it (recompute: <code>npm run heartbeats nyquist_half_samplerate</code>)</td></tr><tr><td>real energy cost</td><td>machine-independent, so the heartbeat is <strong>not</strong> the energy cost. The physical cost is thermodynamic and device-dependent, bounded below by Landauer — erasing one bit costs at least <em>kT·ln2</em> (≈ 2.87×10⁻²¹ J at 300 K), paid as heat by the device. No computation is free; the heartbeat is the abstract work, the device pays the joules.</td></tr></tbody></table><h2 id="cross-links" tabindex="-1">Cross-links <a class="header-anchor" href="#cross-links" aria-label="Permalink to “Cross-links”">​</a></h2>`);
	_push(ssrRenderComponent(_component_RefererCompass, null, null, _parent));
	_push(`<p>Woven to its neighbours in every direction — each axis, backward and forward:</p><ul><li><strong>Skill · <a href="/topics#skill-music-production">music-production</a>:</strong> ← <a href="/theorem/tempo_ms_per_beat">At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.</a> · <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li><li><strong>Principle · The mix:</strong> ← <a href="/theorem/tempo_ms_per_beat">At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.</a> · <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li><li><strong>Sequence · ledger order:</strong> ← <a href="/theorem/tempo_ms_per_beat">At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.</a> · <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li></ul><h2 id="the-rotation-—-fills-the-gaps-at-scale" tabindex="-1">The rotation — fills the gaps at scale <a class="header-anchor" href="#the-rotation-—-fills-the-gaps-at-scale" aria-label="Permalink to “The rotation — fills the gaps at scale”">​</a></h2><p>Every theorem is woven on <strong>seven axes</strong>: three navigational (skill · principle · sequence), three <strong>cyclic rotations</strong> over the ledger, and the runtime referer above. The rotations are modular, so they are <em>total</em> — no gap, no orphan across the 861 sealed theorems (861 = 3 × 7 × 41; the strand structure below is DERIVED from that count, never hardcoded, so it cannot go stale as theorems are added; <a href="/theorem/vortex_one_leap"><code>vortex_one_leap</code></a> is the one leap that generates the turn):</p><ul><li><strong>Discovery · sequence, step 1 → <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a></strong> — one full turn of all 861: clicking <strong>next</strong> covers all 861 in discovery order, exactly as the sequence discovered all, then wraps to the genesis — a closed cover.</li><li><strong>Vortex · ℤ/9, step 9 → <a href="/theorem/mul9_1_5">1·5 ≡ 5 (mod 9)</a></strong> — 3 strands of 287 (<a href="/theorem/z9add_0_0"><code>z9add_0_0</code></a>).</li><li><strong>Rosette · ℤ/7, step 7 → <a href="/theorem/mul9_1_3">1·3 ≡ 3 (mod 9)</a></strong> — 7 strands of 123 (<a href="/theorem/z7add_0_0"><code>z7add_0_0</code></a>).</li><li><strong>Reflection · dz(x)=10−x → <a href="/theorem/mul9_1_5">1·5 ≡ 5 (mod 9)</a></strong> — the mirror through the centre, self-inverse (<a href="/theorem/tens_complement_involutive"><code>tens_complement_involutive</code></a>).</li></ul><h2 id="deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" tabindex="-1">Deliver the next — the missing theorem hides in the invisible next <a class="header-anchor" href="#deliver-the-next-—-the-missing-theorem-hides-in-the-invisible-next" aria-label="Permalink to “Deliver the next — the missing theorem hides in the invisible next”">​</a></h2><p>A sealed theorem is settled. Where its forward link is <strong>invisible</strong> — a frontier with none sealed beyond — is exactly where the next, missing theorem hides, waiting to be discovered and sealed:</p><ul><li><strong>Skill · music-production:</strong> <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li><li><strong>Principle · The mix:</strong> <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li><li><strong>Discovery:</strong> <a href="/theorem/midi_is_seven_bit">MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 &lt; 128. Why note 128 does not exist and velocity tops out at 127.</a> →</li></ul><p>To make the invisible next visible, add a fact in <a href="https://github.com/uuidna/uuidna/blob/main/src/scripts/lean-production.ts" target="_blank" rel="noreferrer">scripts/lean-production.ts</a> — compute → generate → verify; then <code>npm run lean</code> seals it, folds it into the trial receipt, and the provenance gate lets any claim that links it pass. The promise is delivered in code, not coin.</p><p><a href="/theorems">All theorems</a> · <a href="https://github.com/uuidna/uuidna/blob/main/lean/Production.lean" target="_blank" rel="noreferrer">Source · lean/Production.lean</a> · <a href="https://www.npmjs.com/package/@uuidna/uuidna" target="_blank" rel="noreferrer">npm</a></p><p>Re-verify every proof with <code>npm run lean</code> (regenerates <code>lean/*.lean</code> and this ledger, sorry-free). A theorem computes in Lean, or it is not a theorem.</p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("theorem/nyquist_half_samplerate.md");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var nyquist_half_samplerate_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { __pageData, nyquist_half_samplerate_default as default };
