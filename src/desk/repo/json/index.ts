// repo-json — READ SEALED RECORDS ON HOST OR AT THE EDGE. Host: boundary rdRoot. Edge: the same bytes shipped
// in the bundle (no disk). One read path so gap-survey, open-leads springs, and MCP demo the same ledger.
import { ROOT, rdRoot } from '../../../boundary.js'
import leadsJson from '../../../../lean/leads.json' with { type: 'json' }
import researchLedgerJson from '../../../../lean/research-ledger.json' with { type: 'json' }
import searchFeedJson from '../../../../lean/search-feed.json' with { type: 'json' }
import exposedAxiomsJson from '../../../../lean/exposed-axioms.json' with { type: 'json' }
import researchLeadsJson from '../../../../research-leads.json' with { type: 'json' }
import proseTrialsJson from '../../../../prose-trials.json' with { type: 'json' }
import waveQueueJson from '../../../../lean/wave-queue.json' with { type: 'json' }

const BUNDLE: Record<string, unknown> = {
  'lean/leads.json': leadsJson,
  'lean/research-ledger.json': researchLedgerJson,
  'lean/search-feed.json': searchFeedJson,
  'lean/exposed-axioms.json': exposedAxiomsJson,
  'research-leads.json': researchLeadsJson,
  'prose-trials.json': proseTrialsJson,
  'lean/wave-queue.json': waveQueueJson,
}

/** readRepoJson(rel) → parsed JSON for a repo-relative path, or null when absent. Pure given the tree/bundle. */
export function readRepoJson(rel: string): unknown | null {
  if (ROOT) {
    try { return JSON.parse(rdRoot(rel)) } catch { return null }
  }
  return BUNDLE[rel] ?? null
}
