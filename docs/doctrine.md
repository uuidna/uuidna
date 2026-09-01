---
title: The doctrine
description: "What uuidna claims, folded to one page: the agreement, sufficiency charter, insufficiency bound, and what theorems replace. Honest scope: the vision is design intent; only the cited sealed theorems are proven."
---

# The doctrine <Badge type="tip" text="folded from four pages" />

> **Honest scope.** This page folds the project's doctrine to its essentials. The *formal, recomputable* terms live in
> [The Captain's Agreement](/captain#the-five-terms) and [The Contract](/captain) — every clause there is backed by a
> sealed theorem. Here, only linked `/theorem/&lt;key&gt;` citations are proven; everything else is design intent, stated
> plainly so the gate has nothing to drain. **Sufficient for X / insufficient for Y** — the two sections below; neither
> pretends the other is sealed as a world claim.

## The agreement

One law governs the exchange: **contribute first, then take**. The two conserved coins
([`two_coins`](/theorem/two_coins): 110 − 108 = 2, the −χ of the double torus) are deposited before any compute
follows, and every deposit is receipted at [/trials](/trials) — deterministic, re-requestable, signed by uuidna.com.
The behavioural terms are the five sealed terms of [The Captain's Agreement](/captain#the-five-terms); a dispute is
resolved by both parties **recomputing the ledger**, not by arguing prose. The FULL terms-record is distributed —
this map is where each element actually lives (`one-receipt legal` verifies every element stays present):

| element | where it lives |
| --- | --- |
| parties & authorship | [the licence](/license) — © Tsvetan Rouschev, receipted |
| grant & scope | [the licence](/license) — read freely; redistribute unchanged, attributed, non-commercial |
| ownership & attribution | [the licence](/license) — the making sealed, the algebra free for all |
| commercial terms | [the captain](/captain) — 2 coins per seal, receipted at /trials |
| termination & warranty | the linked [CC legalcode](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode) — §6, §5 |
| dispute path | [the captain](/captain#the-five-terms) — recompute first; the kernel arbitrates the math |
| acceptance | [the captain](/captain#the-five-terms) — behavioural signature: sign by behaving |
| change of terms | [the licence](/license) — a change is a new content-address, fresh consent | An earlier long-form legal draft (Delaware jurisdiction, USD conversion, article-by-article
pseudo-theorems) is retired: its clauses either graduated into the sealed agreement or remain unproven drafts, and an
unproven clause is not cited as a theorem here.

## No money is needed

Work and debt are measured in the **same unit** — coins, which are counted theorems — so payment is direct exchange:
code for code, no currency in between. Both parties recompute the same valuation from the ledger independently; the
seal is the receipt. What makes this an invariant rather than a slogan is conservation
([`two_coins`](/theorem/two_coins)) and order-invariant folding
([`store_fold_order_invariant`](/theorem/store_fold_order_invariant)): however the contributions race, the fold — and
therefore the balance — is identical. *Honest scope:* this proves the bookkeeping is exact and forgery-evident; it
does not prove any USD price, and no fixed coin↔currency rate is sealed anywhere.

## Corruption-proof by construction

Six classic frauds — wage theft, judicial bribes, hidden banking transactions, electoral manipulation, accounting
fraud, tax evasion — share one mechanism: a record only an authority can see or alter. The ledger removes the
mechanism with five properties: **mathematical certainty** (a claim recomputes or it is flagged —
[`exactly_one_flag`](/theorem/exactly_one_flag) fires on exactly the hollow case), **transparency** (every entry is
public and content-addressed), **independent verification** (any party recomputes without permission),
**immutable records** (an altered entry changes its address and is visible), and **no intermediaries** (no clerk,
notary, or auditor sits between the parties and the proof). *Honest scope:* this makes the *record* incorruptible;
a human court still enforces consequences in the world.

## What theorems replace

Eleven professions exist to be trusted third parties over records: lawyers, auditors, judges, translators, bankers,
executives, insurers, accountants, compliance officers, tax accountants, arbitrators. In each case the service folds
to the same primitive — *verify a claim against a record both sides can recompute* — which is what the ledger does at
zero marginal cost. The detailed 11-domain walkthrough is retired to git history; the operational replacements are
live and linked: [the trials](/trials) (adjudication), [the tests](/tests) (audit), [MCP tools](/mcp) (the working
interface), and [all <!--L:distinct--><span class="ledger" data-slot="distinct" data-receipt="734d5f56-7669-844a-b640-77182d90ece6">2080</span><!--/L--> distinct theorems under <!--L:keys--><span class="ledger" data-slot="keys" data-receipt="734d5f56-7669-844a-b640-77182d90ece6">2163</span><!--/L--> keys](/theorems) (the record itself). *Honest scope:* uuidna replaces the
**verification** these professions perform, not the judgment, advocacy, or human accountability they also carry.

## Sufficiency charter — what hexbit / uuidna *is* sufficient for

> **In-domain.** uuidna is sufficient for finite computational claims: axiom-free `by decide` seals against the bare
> Lean kernel, independent falsifiers, content-addressed receipts, and fair-exchange bookkeeping. The rows cite
> sealed keys; the charter as a whole is prose doctrine naming the domain, not a theorem that “uuidna is enough.”

| Domain | Sufficient for | Sealed keys |
| --- | --- | --- |
| Finite windows | Exhaustive checks on a named bound — not induction over ℕ | [`window_not_universal`](/theorem/window_not_universal), [`bounded_silence_is_not_evidence`](/theorem/bounded_silence_is_not_evidence) |
| Kernel seals | Sorry-free, Mathlib-free, axiom-free `by decide` objects | every `/theorem/&lt;key&gt;`; census on [/unlocks](/unlocks) |
| Falsifiers | Independent second decide over sealed statements the evaluator reaches | generated falsifier board; grammar waves land tokens, never invent claims |
| Receipts | Prove once, verify along a log-depth path (verify ≪ recompute) | [`verify_beats_recompute_by_magnitudes`](/theorem/verify_beats_recompute_by_magnitudes), [`store_fold_order_invariant`](/theorem/store_fold_order_invariant) |
| Handle capacity | 2¹²⁸ content-address architecture; usable gap vs reported logical | [`handle_capacity_is_quantum_by_architecture`](/theorem/handle_capacity_is_quantum_by_architecture), [`usable_gap_is_two_to_eighty`](/theorem/usable_gap_is_two_to_eighty) |
| Captain coins | Conserved fair-exchange denomination; gate requires the two coins | [`two_coins`](/theorem/two_coins), [`captain_computes_only_with_two_coins`](/theorem/captain_computes_only_with_two_coins) |
| Honesty gate | Hollow unbacked prose drains; clean iff detectors clear | [`exactly_one_flag`](/theorem/exactly_one_flag), [`honesty_gate_passes_iff_all_sealed`](/theorem/honesty_gate_passes_iff_all_sealed) |
| Classical / anti-Shor | Simulation cost 2ⁿ; Grover halves, no asymmetric Shor target | [`n_qubit_dimension`](/theorem/n_qubit_dimension), [`grover_quadratic_bound`](/theorem/grover_quadratic_bound), [`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address) |
| Alpine / hexbit catalogue | Specs compile to hexbit states; OS provenance is integrity, not execution | [`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits), [`the_os_is_bootable_quantum`](/theorem/the_os_is_bootable_quantum), [`home_reaches_every_install`](/theorem/home_reaches_every_install) |
| Navigation | Referrer/home reach; crumbs and crosslinks are stock VitePress surfaces | [`every_referrer_reaches_every_page`](/theorem/every_referrer_reaches_every_page), [`home_reaches_every_install`](/theorem/home_reaches_every_install) |
| Integrity ≠ truth | Byte-identity and tamper-evidence; never content-truth or due process | [`provenance_integrity_not_content_truth`](/theorem/provenance_integrity_not_content_truth), [`drift_is_named_or_caught`](/theorem/drift_is_named_or_caught) |
| Climate (finite windows) | Model-calc and named decide-windows *within* a climate-shaped calculation — never policy or Earth-system closure | [`window_not_universal`](/theorem/window_not_universal), [`bounded_silence_is_not_evidence`](/theorem/bounded_silence_is_not_evidence) |
| Pandemic (finite windows) | Finite biological/count seals (pairs, codons, thresholds) — never surveillance, trials, or clinical authority | [`biology_pairs_and_codons`](/theorem/biology_pairs_and_codons), [`window_not_universal`](/theorem/window_not_universal) |
| Poverty / conflict (finite windows) | Conserved fair-exchange and honesty-gate arithmetic — never institutions, consent, or distributional justice | [`two_coins`](/theorem/two_coins), [`honesty_gate_passes_iff_all_sealed`](/theorem/honesty_gate_passes_iff_all_sealed), [`exactly_one_flag`](/theorem/exactly_one_flag) |

Capacity door: [/quantum](/quantum). Unlock board: [/unlocks](/unlocks). Wave board: [/waves](/waves).

## World solutions = waves of automation

> **Finite seal, not universal closure.** A “world solution” here is **not** a claim that one theorem closes climate policy,
> pandemics, poverty, open math, discovery, or justice
> ([`window_not_universal`](/theorem/window_not_universal)). It is the **stacking of automation waves**: each wave
> enlarges the finite sealed window; automation carries the next wave without a model inventing cargo at the gate.
> Waves do **not** erase the insufficiency table below — ethics, politics, and unbounded statements stay outside
> any single `by decide` object.

| Wave link | What it does | Command / surface |
| --- | --- | --- |
| Deposit | Candidate `{key, why, lean}` enters the queue | `uuidna_wave_deposit` · [/waves](/waves) |
| Validate | Door checks; kernel probes alone | conveyor in `npm run wave` |
| Seal | Survivors lift into Lean; sorry-free `by decide` | lean / axioms / guard |
| Falsify | Independent second decide (grammar waves; never invented claims) | falsifier board · involution evaluator |
| Receipt | Content-addressed verify ≪ recompute | [`verify_beats_recompute_by_magnitudes`](/theorem/verify_beats_recompute_by_magnitudes) |
| Connect | Lonely theorems get neighbours without invention | `node dist/scripts/connect-lonely.js` |
| Next / hexbit-fast | Push verifies sealed receipts; readiness is O(1) from the seal | `npm run next` · pre-push hexbit-fast |
| Full arc | Wave then ship — origin before edge | `npm run all` (= `npm run wave` && `npm run ship`) |

*Computational, dry, stock UI:* the conveyor board is VitePress tables from `lean/wave-queue.json` — see
[`docs/waves.md`](/waves). No per-page QA cards; capacity stays on [/quantum](/quantum).

## Where hexbit formalism is insufficient

> **Outer bound, not sealed theorems.** The rows name **full problem types** a finite `by decide` object cannot
> settle. Paired with the sufficiency charter: finite windows *within* climate / pandemic / poverty domains may
> seal (rows above); the **problem types** below do not. Related honesty that *is* sealed:
> [`window_not_universal`](/theorem/window_not_universal),
> [`n_qubit_dimension`](/theorem/n_qubit_dimension), [`grover_quadratic_bound`](/theorem/grover_quadratic_bound),
> [`provenance_integrity_not_content_truth`](/theorem/provenance_integrity_not_content_truth),
> [`reflection_confuses_seven_three`](/theorem/reflection_confuses_seven_three),
> [`drift_is_named_or_caught`](/theorem/drift_is_named_or_caught).

| Problem type | Why hexbit formalism is insufficient |
| --- | --- |
| Climate policy | Requires physical models, uncertain measurements, political choices, and distributional trade-offs |
| Pandemics | Requires biology, field surveillance, clinical trials, logistics, ethics, and adaptive decisions |
| Poverty or conflict | Involves institutions, power, history, values, trust, incentives, and human consent |
| Open mathematical problems | A finite computation can validate a finite window, not prove an unbounded statement |
| Scientific discovery | Formal checking verifies a model or calculation; it does not establish that the model describes nature |
| Justice and governance | Integrity of evidence is not the same as truth, fairness, legitimacy, or due process |

*Computational claims only:* a seal verifies a finite decidable proposition. Automation waves enlarge the sealed
window; they do not license policy, clinical, or moral conclusions. Same posture as the classical quantum bound
and the Clay reflection — verified ≠ solved for the named world problem.
