---
title: License
description: The canonical uuidna license — CC BY-NC 4.0, free to read, reuse with attribution and non-commercially. Any deployment off uuidna.com is governed by these terms; content-addressed, so a change is a new signature.
---

# License <Badge type="tip" text="CC BY-NC 4.0" />

> CC BY-NC 4.0 — free to read, reuse with attribution and non-commercially. Canonical at **uuidna.com/license**.

This page is the **canonical license** (recorded as receipt `ca0749bc-a9c6-84cc-9947-0643069964bf`, the content-address
of the line above — recompute it with `uuidna_address`). Author: **Tsvetan Rouschev** (ceccec@psg.bg).

## The terms

The uuidna content — the theorems, the proofs, the site — is licensed
[**Creative Commons Attribution-NonCommercial 4.0 International**](https://creativecommons.org/licenses/by-nc/4.0/):

- **Read** — freely, by anyone, for any purpose.
- **Reuse** — copy, redistribute and adapt, **with attribution** (credit *Tsvetan Rouschev* and link this license) and
  **non-commercially**. Commercial use is the measured contribution — see [the captain's message](/captain/message).
- **Reading a public page is not a signed contract.** The license governs **reuse**, not viewing.

## Canonical and the three domains

- **uuidna.com** — the default, canonical home, and this license.
- **[contract-uuid].uuidna.org** — **SaaS**: each deployment's subdomain IS its contract's content-address (a UUID) — the domain itself names the exact terms it runs under, recomputable by anyone.
- **uuidna.net** — **PaaS**: the platform the whole thing runs on.
- **Commercial** — a commercial deployment may **CNAME its own domain** to its `[contract-uuid].uuidna.org` subdomain. Commercial use is the measured contribution (the two coins — see [the captain's message](/captain/message)); it still carries the attribution and this license link.

**Any deployment** — a `[contract-uuid].uuidna.org` subdomain, the `.net` platform, a fork, a mirror, or any other domain
— is governed by these terms and must carry the attribution and a link back to this canonical license at
**uuidna.com/license**. That link *is* the attribution the license requires; it is not optional for reuse.

## uuidna.com licenses itself; the rest redirects

**uuidna.com licenses itself** — the canonical home is bound by the very license it publishes, its own receipt minted
by the tool it governs. That self-license **auto-licenses the whole first-party wildcard**: every apex and subdomain of
`*.uuidna.com`, `*.uuidna.net`, and `*.uuidna.org` is licensed by this page automatically, no separate signature.

**Every other host is redirected here.** A request to any domain that is not first-party and does not hold a license
(a commercial CNAME licensed via this page) is sent to the canonical **uuidna.com**, keeping its path. The redirect is
temporary (302), because a license is conditional and a license change is a new signature — nothing is cached hard. So
there is exactly one source of terms: you either run under a license that traces back to this page, or you are routed to
it. Enforced at the edge in [`worker.js`](https://github.com/uuidna/uuidna/blob/main/worker.js).

## Change is a new signature

The license text is content-addressed. If the terms change, the address changes — a new address is a new license, so
prior consent does not carry over and a fresh acknowledgment is required. "Did the terms change?" is a `toUuid`
comparison anyone can recompute, not a promise. See the [Contract](/captain/config#consent-two-kept-separate).

**Powered by uuidna itself.** This license's own receipt (`ca0749bc…`) is minted by the very tool it governs — the
contract verifies itself. The brand holds to the same rule: `uuidna_address("uuidna") = fc511532-6e8a-8418-a522-a51b1d46a70c`,
reproducible by anyone. The whole infrastructure — the default **uuidna.com**, the SaaS subdomains on **uuidna.org**,
the PaaS on **uuidna.net** — is entangled by this one address: every deployment points back to it, so all copies stay
correlated to a single, recomputable source of terms. Bidirectional, because reuse accepts the license and the license
binds the reuse, both anchored to the same receipt.

---

Full legal text: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/legalcode) ·
source [LICENSE](https://github.com/uuidna/uuidna/blob/main/LICENSE). A theorem computes in Lean, or it is not a theorem;
a license is content-addressed, or it can be quietly changed.
