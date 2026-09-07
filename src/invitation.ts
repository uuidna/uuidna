// invitation — WHAT THIS TREE OFFERS ANOTHER REPO, COMPUTED FROM THE TREE RATHER THAN WRITTEN ABOUT IT.
//
// The captain, 2026-09-07: "any manual work is rejected in quantum." Five invitations were being typed by hand,
// one per repo, each restating the same figures — and every figure was a number copied into prose, which is the
// exact defect a finder in this tree already refuses. An invitation that quotes a ledger it does not read is
// stale the moment the ledger moves, and it was stale five times over before it was sent.
//
// So the invitation is DERIVED. Every number below is read from the live ledger, the live census and the live
// host at the moment of asking. Nobody types it, nobody updates it, and a repo that reads it twice a week apart
// gets two true answers rather than one true and one old.
//
// WHAT IT DELIBERATELY DOES NOT DO: it makes no claim about quantum hardware, because there is none in this tree
// and the trial output says so of itself. It offers a METHOD and a MEASUREMENT, and it names what the joining
// repo would have to do rather than only what it would receive — an invitation that lists benefits and hides
// obligations is a sales page, and this ledger refuses those on its own surfaces.
import { theorems } from './theorems/index.js'
import { handleStoreCensus } from './handle-store-census.js'
import { capacity } from './os/host/index.js'

export interface Invitation {
  /** what the ledger holds right now — never typed */
  theorems: number
  wings: number
  /** the handle store as it stands */
  leaves: number
  /** links the store's own leaves admit, against the links it uses */
  pairsAdmitted: number
  treeLinks: number
  /** the host, as the binding point sees it */
  lanes: number
  binds: string
  /** what a joining repo is asked to do, not only what it gets */
  asks: string[]
  offers: string[]
  /** stated limits — an invitation without them is a sales page */
  refuses: string[]
}

/** invitation(root) → the offer, computed. No figure in it is written down anywhere. */
export function invitation(root: string): Invitation {
  const T = theorems()
  const store = handleStoreCensus(root)
  const cap = capacity()
  return {
    theorems: T.length,
    wings: new Set(T.map((t) => t.file)).size,
    leaves: store.leaves,
    pairsAdmitted: store.pairs,
    treeLinks: store.treeLinks,
    lanes: cap.lanes,
    binds: cap.binds,
    offers: [
      'a claim is decided or it is not made — by decide over finite enumerations, sorry-free and axiom-free, generated from TypeScript and never hand-written',
      'every check must be able to fail — corrupt what a gate READS, in a clone, and require the named suite to fall; an unfired mutation is a hypothesis, not a pass',
      'three answers, never two — unreadable is not clean, unmeasured is not agreeing, behind is not broken',
      'a stated figure is a stamped slot regenerated from the live census, never typed — a count in prose is stale the moment the thing it counts moves',
      'capacity() returns the SMALLER of what cores and memory afford and names which bound it, so an out-of-memory concurrency is never picked by hand',
    ],
    asks: [
      'share the lane budget — the sum of every session\'s lanes bounded by what the binding point affords, because per-process politeness is measurably not enough on one host',
      'name the binding point when reporting a width, so a report can say why a wide machine ran narrow',
      'let a finder refuse a number written into prose in your tree too, or the figures drift apart again the first week',
    ],
    refuses: [
      'there is no quantum hardware in this tree and none is claimed — every figure under that word is classical, and the trial output says so of itself',
      'no crosslink graph is built over the handle store; the arithmetic of what it admits is sealed, the graph is not',
      'capacity is what the addressing permits, never what has been written — occupancy and capacity are returned separately and must never be quoted as one',
    ],
  }
}

/** the invitation as a page — every figure interpolated from the reading above, none typed */
export function invitationText(i: Invitation): string {
  const share = i.pairsAdmitted > 0
    ? ((n) => (n - (n % i.pairsAdmitted)) / i.pairsAdmitted)(i.treeLinks * 1000000)
    : 0
  return [
    '# Join the quantum development',
    '',
    'Every number on this page is read from the ledger when the page is generated. None is typed, so none can be stale.',
    '',
    '## What the tree holds now',
    '',
    `- **${i.theorems.toLocaleString('en-US')} theorems** across **${i.wings} wings**, each decided by the Lean kernel, sorry-free and axiom-free`,
    `- **${i.leaves.toLocaleString('en-US')} handle folders**, whose own leaves admit **${i.pairsAdmitted.toLocaleString('en-US')} links** while the tree uses **${i.treeLinks.toLocaleString('en-US')}** — ${share} millionths of what already exists`,
    `- this host offers **${i.lanes} lanes**, bound by: ${i.binds}`,
    '',
    '## What is offered',
    '',
    ...i.offers.map((o) => `- ${o}`),
    '',
    '## What is asked in return',
    '',
    'An invitation that lists benefits and hides obligations is a sales page.',
    '',
    ...i.asks.map((a) => `- ${a}`),
    '',
    '## What is refused',
    '',
    ...i.refuses.map((r) => `- ${r}`),
    '',
    'No obligation. A repo better served exactly as it is should say so — that is a real answer and worth more than a polite yes.',
  ].join('\n')
}
