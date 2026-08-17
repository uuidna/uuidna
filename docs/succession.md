---
title: Succession
description: "What happens to the ledger, the domain and the archive if the author stops — what is already permanent, what anyone may do without permission, and the one thing the current licence prevents. An operational statement, not a legal instrument."
---

# Succession — what survives the author

> The proofs are already permanent. The **recomputability** is not, and that is the difference this page exists to
> state plainly.

uuidna is maintained by one person. Every claim it makes rests on the reader being able to recompute it
([`verify_beats_recompute_by_magnitudes`](/theorem/verify_beats_recompute_by_magnitudes)) — and recomputation needs a
served ledger, a resolvable domain and a running trial. Those depend on an author's attention. The archive does not.

This is an **operational** statement: what is technically true, what anyone may already do without asking, and where
the current terms stop. It is not a will, not an assignment, and not legal advice — the same boundary
[the justice page](/justice) holds: uuidna records, it does not rule.

## What is already permanent, with or without anyone

- **The archived releases.** Every release is deposited to two independent Zenodo chains with their own DOIs, each
  carrying the full source, the Lean proofs and the ledger receipt. A DOI does not lapse when a domain does, and
  Zenodo's retention is independent of this project, this author and this company.
- **The proofs themselves.** Every theorem is `by decide`, sorry-free, and audited kernel-only — 1307 keys over 1222
  distinct propositions, **zero borrowed axioms**. Anyone with the archive and a Lean toolchain re-verifies the entire
  ledger offline, with no server, no key and no permission. That is the whole point of sealing them this way.
- **The addresses.** A content-address recomputes from its input by pure arithmetic
  ([`theorem_dna_recompute_is_seal`](/theorem/theorem_dna_recompute_is_seal)). Every receipt in the archive can be
  rechecked without contacting anything.
- **The public record.** The repository is public; every commit message carries its cited theorems, so the reasoning
  behind each landing survives in the record rather than in anyone's memory.

## What anyone may do today, without permission

- **Recompute and re-verify** the whole ledger from any archived release. No credential is required; no gate is
  online. Every verification path in this project is deliberately offline.
- **Cite, quote and redistribute** the work unmodified, with attribution, under CC BY-NC-ND 4.0.
- **Check that a served page tells the truth** — the served ledger and the archived one fold to the same receipt, or
  one of them has drifted, and the arithmetic says which.

## What the current licence prevents — stated because it matters most

**Under CC BY-NC-ND 4.0, no one else may continue this work.** "ND" forbids derivative works, and *maintenance is
derivative*: fixing a proof, adding a wing, correcting a stale count, or re-serving a corrected ledger all produce a
modified work. So if the author stops:

- the archive **survives** and stays verifiable — permanently;
- the project **stops with them**. A successor may read, verify and quote it, but may not maintain it, and may not
  publish the corrected version their own recomputation proves is needed.

That is a real and deliberate consequence of the present terms, not an oversight, and it is the single largest
succession risk this project carries. Nothing else on this page can mitigate it — a foundation, a co-maintainer or a
named heir all fail against ND, because none of them may modify either.

**The only fix is a licence decision**, and it belongs to the author alone: a licence permitting derivative works
(with attribution, and with or without a non-commercial term) would let anyone recompute, correct and continue.
Until that decision is made, this page states the position rather than softening it.

## If you are continuing this work

Read the archive first, not this site: the DOI is the authority and a domain is a convenience. Verify before you
trust anything — `npm run lean` re-proves every theorem from source, and the honesty gate refuses a claim citing a
proof that is not sealed ([`legal_only_the_proven_is_admitted`](/theorem/legal_only_the_proven_is_admitted)). Keep the
laws that made the record checkable: a claim carries its receipt, a name must mean its proof, and what cannot be
recomputed is not asserted. And keep the measure — the contribution comes first
([`contribute_two_save_sixtyfour`](/theorem/contribute_two_save_sixtyfour),
[`two_coins`](/theorem/two_coins)).

*Integrity, not truth. This page describes what is technically the case; it grants nothing the licence does not, and
it binds no one.*
