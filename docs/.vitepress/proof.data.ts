// Data loader for /by-proof — the SECOND axis over the site's pages. The sidebar organises by PURPOSE (what a
// reader is looking for); this organises by PROOF (what each page's citations actually rest on), exactly as
// /topics does for theorems by skill. Derives from the compiled package, so Lean stays the single source.
//
// It is a second VIEW and deliberately not the sidebar: deriving the sidebar's group names this way gives 15
// groups for 28 pages, seven of them a single page, and files license.md under "The cipher & the strand" because
// the licence text happens to cite a cipher theorem. A reader hunting the licence would never look there. Both
// axes are real; collapsing them costs the reader the licence.
import { pagesByProof } from '../../dist/site.js'

export default {
  load() {
    const { groups, grouped, root } = pagesByProof()
    return {
      groups: groups.map((g) => ({
        principle: g.principle,
        skill: g.skill,
        address: g.address,
        pages: g.pages.map((p) => ({ route: p.route, text: p.text, cites: p.cites })),
      })),
      grouped,
      root,
    }
  },
}
