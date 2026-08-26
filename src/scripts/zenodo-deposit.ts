#!/usr/bin/env node
// @non-harmonic: may talk to Zenodo's deposit API, and only when zenodoPublishAllowed says so — a NAMED boundary.
// zenodo-deposit — THE WORKFLOW-ONLY ENTRY for minting a Zenodo DOI of a release.
//
// Local / wave / land / ad-hoc npm: HARD REFUSAL (exit 1) naming `.github/workflows/publish.yml` job `zenodo`.
// Inside that job: this script is the gate; the deposit curl chain remains in the workflow (token + tarball +
// chain law). Running `node dist/scripts/zenodo-deposit.js` on a laptop never publishes — it only prints the FIX.
import { zenodoPublishAllowed } from '../zenodo-publish.js'

const gate = zenodoPublishAllowed(process.env)
if (!gate.ok) {
  console.error('✗ zenodo-deposit — ' + gate.reason)
  process.exit(1)
}
console.log('✓ zenodo-deposit — ' + gate.reason)
console.log('  deposit continues in the workflow shell (token, tarball, chain law) — this process does not curl Zenodo.')
