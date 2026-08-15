---
title: Privacy
description: Privacy by design in uuidna — no storage without consent, a stateless loopback-only daemon, client-side computation, nothing sent. Honest scope, not a claim of legal compliance.
---

# Privacy by design

uuidna is built to respect privacy in its **design**, and to say plainly what it does and does not claim. This page
is the honest account: the properties are real and checkable; the compliance is **not** asserted.

## What uuidna does

- **No storage without consent.** Without an explicit, consent-gated opt-in, nothing you enter is stored. The default
  is to compute and return, not to keep.
- **The daemon is loopback-only, read-only, and stateless.** It binds to `127.0.0.1` (never a public interface),
  serves only reads, keeps nothing between requests, and logs no request bodies.
- **Client-side by default.** The site's tools — the reflector, the book audit, the message stream — compute in your
  browser. The data you choose stays on your machine; it is not sent to a server to be addressed.
- **A content-address is of data you chose.** `toUuid(x)` is computed from the value you hand it, on demand; it is a
  fingerprint, not a copy, and it is not transmitted anywhere by the act of computing it.
- **No tracking.** The pages are static; there is no analytics profiling and no advertising identifier riding along.

## What uuidna does NOT claim

- **This is privacy by *design*, not certified compliance.** uuidna does **not** claim that all privacy laws are met,
  and it is **not** a statement that any specific regulation — GDPR, CCPA, or another — is satisfied. Compliance is a
  matter for counsel and audit, and a content-address cannot certify it. uuidna's own honesty gate **refuses** the
  claim "all privacy laws are met" as unbacked — the same gate it holds every other claim to.
- **The design aligns with the *spirit*, not a certificate.** Data minimisation, consent, and transparency are the
  principles above; alignment in spirit is not a legal guarantee, and this page does not pretend it is.
- **You run it, you own the obligations.** If you deploy or embed uuidna, the privacy obligations of *your* deployment
  are yours to meet with your own counsel; nothing here transfers them or discharges them.

## Trials, by design, are human

The trial is built **for human judgment, not to replace it.** It produces a **recomputable** verdict and a recheckable
[evidence bundle](/trials) — so a person does not have to *trust* it, they **recompute** it, and then **they** decide.
A machine can settle whether a claim is backed and recomputable; whether to *act* is a human's, and a court's, ruling —
never a fold's. The flag is always on the claim, never on the person. That is what "integrity, not truth" means in
practice: uuidna hands a human something they can check for themselves, and leaves the deciding to them.

[The trial charter](/trials) · [License](/license) · [The contract & consent](/captain)
