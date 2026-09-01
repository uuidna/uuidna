// zenodo-publish — THE WORKFLOW-ONLY GATE for minting a Zenodo DOI.
//
// THE LAW (captain, 2026-08-26): Zenodo publications are only through the GitHub workflow. gen-zenodo.ts writes
// the deposited METADATA (.zenodo.json) — that is local and recomputable. The deposit itself (newversion → upload
// → publish → community) lives in `.github/workflows/publish.yml` job `zenodo`, which alone holds
// ZENODO_ACCESS_TOKEN. A local npm/wave/land/ad-hoc curl that minted a DOI would split the standing chain and
// date a record outside the release audit — so this module REFUSES every caller that is not that job.
//
// a gate on WHO MAY PUBLISH, not on what the metadata says. Reading Zenodo (corroborate search) is
// unchanged. Regenerating .zenodo.json is unchanged. Only the deposit/publish API path is gated here.
export interface ZenodoPublishGate {
  ok: boolean
  reason: string
  /** the only sanctioned path — named so a refusal always points at the exact file + job */
  workflowPath: string
  workflowJob: string
}

export const ZENODO_PUBLISH_WORKFLOW = '.github/workflows/publish.yml'
/** Software archive chain (uuidna releases) — concept 21787143. */
export const ZENODO_PUBLISH_JOB = 'zenodo'
/** Agnostic loop over zenodo/manifest.json — every owned publication seal (clay is one instance). */
export const ZENODO_SEALS_PUBLISH_JOB = 'zenodo-seals'
export const ZENODO_PUBLISH_JOBS = [ZENODO_PUBLISH_JOB, ZENODO_SEALS_PUBLISH_JOB] as const

/** True only when this process is publish.yml `zenodo` or `zenodo-seals` on a release tag. Everything else is a hard no. */
export function zenodoPublishAllowed(env: NodeJS.ProcessEnv): ZenodoPublishGate {
  const workflowPath = ZENODO_PUBLISH_WORKFLOW
  const workflowJob = ZENODO_PUBLISH_JOB
  if (env.GITHUB_ACTIONS !== 'true') {
    return {
      ok: false,
      reason:
        'Zenodo DOI publish is WORKFLOW-ONLY — refused outside GitHub Actions. ' +
        `FIX: push a release tag and let ${workflowPath} jobs \`${ZENODO_PUBLISH_JOB}\` / \`${ZENODO_SEALS_PUBLISH_JOB}\` deposit; never curl the deposit API locally.`,
      workflowPath,
      workflowJob,
    }
  }
  if (env.GITHUB_WORKFLOW !== 'publish') {
    return {
      ok: false,
      reason:
        `Zenodo DOI publish refused — this Actions run is workflow "${env.GITHUB_WORKFLOW ?? ''}", not "publish". ` +
        `FIX: only ${workflowPath} jobs \`${ZENODO_PUBLISH_JOB}\` / \`${ZENODO_SEALS_PUBLISH_JOB}\` may deposit.`,
      workflowPath,
      workflowJob,
    }
  }
  const job = env.GITHUB_JOB ?? ''
  if (!ZENODO_PUBLISH_JOBS.includes(job as (typeof ZENODO_PUBLISH_JOBS)[number])) {
    return {
      ok: false,
      reason:
        `Zenodo DOI publish refused — job "${job}" is not a Zenodo deposit job. ` +
        `FIX: only ${workflowPath} jobs \`${ZENODO_PUBLISH_JOB}\` / \`${ZENODO_SEALS_PUBLISH_JOB}\` may deposit.`,
      workflowPath,
      workflowJob,
    }
  }
  const ref = env.GITHUB_REF ?? ''
  if (!ref.startsWith('refs/tags/')) {
    return {
      ok: false,
      reason:
        `Zenodo DOI publish refused — ref "${ref}" is not a release tag. ` +
        `FIX: ${workflowPath} Zenodo jobs run only on refs/tags/v*.`,
      workflowPath,
      workflowJob: job,
    }
  }
  return {
    ok: true,
    reason: `allowed: GitHub Actions workflow "publish" job "${job}" on ${ref} — ${workflowPath}`,
    workflowPath,
    workflowJob: job,
  }
}
