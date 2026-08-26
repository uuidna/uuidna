---
title: License
description: "CC BY-NC-ND 4.0 — free to read and redistribute unchanged with attribution, non-commercially. Canonical terms for every uuidna surface."
---

# License <Badge type="tip" text="CC BY-NC-ND 4.0" />

> CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at **uuidna.com/license**.

This page is the **canonical license** (recorded as receipt `9ffcda04-5adc-872e-9358-6b831bbd0c0d`, the content-address
of the line above — recompute it with `uuidna_address`). Author: **Tsvetan Rouschev** (ceccec@psg.bg).

## The terms

The uuidna content — the theorems, the proofs, the site — is licensed
[**Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International**](https://creativecommons.org/licenses/by-nc-nd/4.0/):

- **Read** — freely, by anyone, for any purpose.
- **Redistribute** — copy and share it **unchanged**, **with attribution** (credit *Tsvetan Rouschev* and link this
  license) and **non-commercially**. Commercial use is the measured contribution — see [the captain's message](/captain).
- **No derivatives** — you may not distribute a modified version. The published discoveries are a fixed record; a change
  is a new content-address, not this work — enforced by mathematics, not only by law.
- **Reading a public page is not a signed contract.** The license governs **redistribution**, not viewing.

## The algebra is free; the making is sealed

The restriction is not there to stop you learning — it is there so a specific creation stays whole. These are two
different things, and the law already separates them:

- **The algebra is free for all.** A theorem like `2·5 ≡ 1 (mod 9)` is a *fact*, not a creation. Mathematical facts
  and methods are not copyrightable, and this license claims none of them. You are always free — no permission, no
  attribution owed — to read a proof, understand it, **re-derive it**, and build **your own** creativity from the same
  algebra. Inspiration is never restricted. That is the point of publishing the proofs in full.
- **The making is sealed.** What CC BY-NC-ND covers is the specific human creation *around* the algebra: this exact
  expression, this arrangement, this record — a design meant to be shared across people, not lifted whole. Copy it
  unchanged with attribution; be inspired by it without limit; but the fixed record is not yours to alter and pass off
  as your own. The mathematics belongs to everyone; the *making of this* belongs to its author.

So the license and the openness are not in tension: the ideas are a gift to anyone who wants to think with them, and
the sealing only holds the particular expression together — free algebra, protected making, one recomputable line.

## Canonical and the three domains

- **uuidna.com** — the default, canonical home, and this license.
- **[contract-uuid].uuidna.org** — **SaaS**: each deployment's subdomain IS its contract's content-address (a UUID) — the domain itself names the exact terms it runs under, recomputable by anyone.
- **uuidna.net** — **PaaS**: the platform the whole thing runs on.
- **Commercial** — a commercial deployment may **CNAME its own domain** to its `[contract-uuid].uuidna.org` subdomain. Commercial use is the measured contribution (the two coins — see [the captain's message](/captain)); it still carries the attribution and this license link.

**Any deployment** — a `[contract-uuid].uuidna.org` subdomain, the `.net` platform, a fork, a mirror, or any other domain
— is governed by these terms and must carry the attribution and a link back to this canonical license at
**uuidna.com/license**. That link *is* the attribution the license requires; it is not optional for reuse.

## uuidna.com licenses itself; the rest redirects

**uuidna.com licenses itself** — the canonical home is bound by the very license it publishes, its own receipt minted
by the tool it governs. That self-license **auto-licenses the whole first-party wildcard**: every apex and subdomain of
`*.uuidna.com`, `*.uuidna.net`, and `*.uuidna.org` is licensed by this page automatically, no separate signature.

**Every other host is redirected to this page.** A request to any domain that is not first-party and does not hold a
license (a commercial CNAME licensed via this page) is sent to **uuidna.com/license** — the terms it is missing, not
the home. The redirect is temporary (302), because a license is conditional and a license change is a new signature —
nothing is cached hard. So there is exactly one source of terms: you either run under a license that traces back to
this page, or you are routed straight to it. Enforced at the edge in
[`worker.js`](https://github.com/uuidna/uuidna/blob/main/worker.js).

## What the license can and cannot lock

The redirect **routes**; it does not **restrict** — the theorems are public and meant to be rechecked. Could uuidna
instead *encrypt its messaging with the license itself*, so only the licensed can read? Half of that is real, and the
honest half is the powerful one. **Secrecy is exactly the secrecy of the key:**

- **Keyed by the public license — coupling, not secrecy.** A public key is public: anyone who reads this page derives
  the same key. That is sealed, not hoped — [`complement_is_xor_key3`](/theorem/complement_is_xor_key3): *a fixed pad
  is public, not secret.* Encrypting public content with the public license **binds** the message to the license (you
  cannot decrypt without invoking it, and a license change — a new content-address — kills old ciphertext) but hides
  nothing from anyone who can read the page. The public tier stays a signpost.
- **Keyed by a private contract — real confidentiality.** A commercial deployment's contract (the `[contract-uuid]`,
  a secret shared only with the licensee) is **not** public. Messaging sealed under it — pure-TS ChaCha20-Poly1305 via
  `uuidna_send` / `uuidna_seal_chain` — is genuinely private: only contract-holders decrypt, a wrong or changed
  contract fails Poly1305 authentication, and the subdomain that names the deployment *is* that contract's
  content-address. That is a **lock**, not a signpost — as private as the contract is kept, and as strong as its
  entropy. This is the commercial tier.

So "encrypt with the license" gates access only when the license is a **secret** (the private contract), never with
the public terms. Integrity, not truth (theorem provenance_integrity_not_content_truth).

## Change is a new signature

The license text is content-addressed. If the terms change, the address changes — a new address is a new license, so
prior consent does not carry over and a fresh acknowledgment is required. "Did the terms change?" is a `toUuid`
comparison anyone can recompute, not a promise. See the [Contract](/captain#consent-and-licence).

**Powered by uuidna itself.** This license's own receipt (`9ffcda04…`) is minted by the very tool it governs — the
contract verifies itself. The brand holds to the same rule: `uuidna_address("uuidna") = fc511532-6e8a-8418-a522-a51b1d46a70c`,
reproducible by anyone. The whole infrastructure — the default **uuidna.com**, the SaaS subdomains on **uuidna.org**,
the PaaS on **uuidna.net** — is entangled by this one address: every deployment points back to it, so all copies stay
correlated to a single, recomputable source of terms. Bidirectional, because reuse accepts the license and the license
binds the reuse, both anchored to the same receipt.

---

Full legal text: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode) ·
source [LICENSE](https://github.com/uuidna/uuidna/blob/main/LICENSE). A theorem computes in Lean, or it is not a theorem;
a license is content-addressed, or it can be quietly changed.
