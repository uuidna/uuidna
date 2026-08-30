---
title: The catalogue — every published Alpine package
description: Beyond the 25 default-install paths — browse and inspect all 28,630 packages on the pinned branch. Provenance and hexbits, never binary execution.
---

# The catalogue <Badge type="tip" text="community · offline PWA" />

> The [default install](/os) closes at **25 paths** — what boots. Alpine **community** publishes **22,679**
> packages on the pinned branch; this page is the installable PWA shelf for **all of them**. Each row is
> upstream's published tuple compiled to 32 hexbit states — the same mint as `apk info`, never binary execution
> ([`the_os_is_bootable_quantum`](/theorem/the_os_is_bootable_quantum)).

Every package also has a path: `/catalogue/<name>` — audited like the install routes, resolved by the
[404-as-audit](/theorem/home_reaches_every_install) when the book does not yet carry a dedicated page.

<ClientOnly>
  <CatalogueBrowser />
</ClientOnly>

Boot primes the committed TSV from Cache Storage (precached by the service worker). Search, inspect, and
**use** run locally — no MCP round-trip. Install from the browser menu for offline community browse.
