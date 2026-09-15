---
title: Learn — lessons, checked exercises and certificates
description: "Every sealed theorem as a lesson: the wing's own words, the statement set as mathematics, and a predict-the-value exercise checked against the sealed theorem the moment you answer. Progress is kept under a pseudonymous handle, and a mastered course earns a certificate anyone can re-check."
---

# Learn

Pick a course, read a lesson, answer its exercise. A course is one proof wing of the ledger and a lesson is one of
its sealed theorems, in the order [the school](/school) grades them — cheapest for the kernel first.

<ClientOnly><SchoolLearn /></ClientOnly>

## How an answer is checked

Where the repository's evaluator decides a lesson's statement, one numeral is blanked and you predict it. Your
answer is sent to uuidna.com, which puts it in the blank and evaluates the statement again with the same evaluator
the falsifier leg uses. The sealed theorem is the answer key: the statement the Lean kernel proved is the one your
value is tested against. An exercise is offered only where the blank has one answer among its neighbours — the
sealed value plus one, and minus one, both evaluate false.

A check is a recomputation by that evaluator. The Lean kernel proved the theorem once, when it was sealed; your
answer is compared against that sealed statement, and the page says so beside every verdict.

## Your handle

You pick a passphrase; its content address is your handle. No email, no name and no other personal detail is asked
for. The passphrase stays in your browser tab. With your consent, uuidna.com keeps your checked answers under the
handle, together with a digest of a key derived from the passphrase, so only the same passphrase can add to that
record. Lose the passphrase and the link to the handle is lost with it. See [privacy](/privacy).

## Certificates

When every checked exercise of a course is passed under your handle, you can seal a certificate: a record of the
course, the lessons and each checked answer, signed by fourteen witness theorems of the ledger — one per face of
the vector equilibrium, 8 + 6 = 14 ([theorem ve_fourteen_faces](/theorem/ve_fourteen_faces)) — and deposited in
qpu storage. Its page recomputes every claim when it is opened — the address, the seal, and each answer against its
sealed theorem. It records that these answers were checked against these sealed theorems. uuidna is an
unaccredited school, and the certificate is a verifiable record rather than a recognised qualification.

## Proof exercises

Every lesson also offers its own Lean line with `sorry` where the proof goes. Replace it with a proof of the
unchanged statement and queue it; a separate kernel grader compiles submissions and records the kernel's verdict.
