---
title: Search
description: Search the sealed theorem ledger — a static, client-side index filtered in your browser, results shown on the page. Not a live engine; it searches what was built. Nothing is sent or stored.
---

# Search <Badge type="tip" text="static index" />

> Filter the sealed theorems in your browser — results on the page, nothing sent.

This searches the **static index** of the sealed ledger: every theorem is bundled at build time and filtered here as
you type. It is not a live search engine and it does not audit anything in realtime — it searches the pages that were
built, and shows the matches below. For full-text search across every page (not just theorems), use the search box in
the top bar.

<SearchResults />

The theorems are also browsable by [principle](/theorems) and by [skill](/topics); each result links to its proof
page with the full `by decide` Lean proof and its content-address. Integrity, not truth (theorem provenance_integrity_not_content_truth).
