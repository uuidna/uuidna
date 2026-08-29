// @non-harmonic: awaits unansweredMath + collectApiEvidence (the named fetch doors) then folds titles into
// searchFeed(); evidence never auto-seals. The mill itself (search-feed.ts) stays fully deterministic.
// search-feed-online — THE MILL WITH THE ORE IN. Declared FEED_QUERIES stay the floor (reconcile-safe, edge-safe).
// This asks the already-named network doors (unansweredMath, collectApiEvidence) for today's unanswered math
// and the educational catalogue hits, turns each title into a mill query, and runs the same searchFeed().
// Evidence never auto-seals. Integrity.
import { collectApiEvidence } from './api-mint.js'
import { unansweredMath } from './research-sources.js'
import { FEED_QUERIES, queriesFromEvidence, searchFeed, uniqueQueries, type SearchFeed } from './search-feed.js'

const LIVE_CAP = 24
const MILL_SUBJECT = 'mathematics'

/** searchFeedOnline(refusedKeys?) → declared mill + live API titles (unanswered math, education portals, research streams). */
export async function searchFeedOnline(refusedKeys: ReadonlySet<string> = new Set()): Promise<SearchFeed> {
  const unanswered = await unansweredMath()
  const portals = await collectApiEvidence(MILL_SUBJECT)
  const live = queriesFromEvidence([
    ...unanswered.map((r) => ({ source: r.source, address: r.address, text: r.note })),
    ...portals.map((e) => ({ source: e.source, address: e.address, text: e.text })),
  ]).slice(0, LIVE_CAP)
  return searchFeed(uniqueQueries([...FEED_QUERIES, ...live]), refusedKeys)
}
