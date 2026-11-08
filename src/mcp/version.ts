/**
 * The next version is one forward step from the Zenodo record in .zenodo.json. A feature opens the next
 * v1.<minor>.0. The step is computed and returned. The files keep the record they already hold, and the call
 * continues.
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

interface Version {
  major: number
  minor: number
  patch: number
}

interface ChangeAnalysis {
  breaking: boolean          // Major bump
  features: boolean          // Minor bump
  fixes: boolean             // Patch bump
  refactoring: boolean       // No bump (quality)
  efficiency: boolean        // Patch bump (performance)
  documentation: boolean     // No bump
}

// ============================================================================
// SEMANTIC VERSIONING FORMULAS
// ============================================================================

function analyzeChanges(): ChangeAnalysis {
  try {
    // Get commits since last tag
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"')
      .toString()
      .trim()

    const diff = execSync(`git log ${lastTag}..HEAD --oneline`)
      .toString()
      .split('\n')
      .filter(Boolean)

    const analysis: ChangeAnalysis = {
      breaking: false,
      features: false,
      fixes: false,
      refactoring: false,
      efficiency: false,
      documentation: false
    }

    for (const commit of diff) {
      const msg = commit.toLowerCase()

      if (msg.includes('breaking') || msg.includes('⚠️')) analysis.breaking = true
      if (msg.includes('feat') || msg.includes('add') || msg.includes('new') || msg.includes('automation') || msg.includes('auto') || msg.includes('gap') || msg.includes('semantic')) analysis.features = true
      if (msg.includes('fix') || msg.includes('bug')) analysis.fixes = true
      if (msg.includes('refactor') || msg.includes('refactoring')) analysis.refactoring = true
      if (msg.includes('efficiency') || msg.includes('optimize') || msg.includes('reduction')) analysis.efficiency = true
      if (msg.includes('doc') || msg.includes('docs')) analysis.documentation = true
    }

    return analysis
  } catch {
    return {
      breaking: false,
      features: false,
      fixes: false,
      refactoring: false,
      efficiency: false,
      documentation: false
    }
  }
}

// ============================================================================
// CROSS-DOMAIN VERSION DECISION FORMULA
// ============================================================================

function decideVersionBump(analysis: ChangeAnalysis): 'major' | 'minor' | 'patch' | 'none' {
  // FORMULA: Breaking changes → MAJOR
  if (analysis.breaking) return 'major'

  // FORMULA: Consolidation + Refactoring + Efficiency (quality improvement) → MINOR
  if (analysis.refactoring && analysis.efficiency) return 'minor'

  // FORMULA: New features → MINOR
  if (analysis.features && !analysis.breaking) return 'minor'

  // FORMULA: Fixes + efficiency improvements → PATCH
  if (analysis.fixes || analysis.efficiency) return 'patch'

  // FORMULA: Refactoring only (no new features) → NO BUMP
  if (analysis.refactoring && !analysis.features && !analysis.fixes) return 'none'

  // FORMULA: Docs only → NO BUMP
  if (analysis.documentation && !analysis.fixes && !analysis.features) return 'none'

  return 'none'
}

// ============================================================================
// VERSION BUMP — suggestion only, from the published version
// ============================================================================

/** v1.<minor>.<digit>, the same scheme as scripts/version-lock.mjs. Major is 1, state is one digit, 0 is LTS. */
const VERSION = /^1\.(0|[1-9][0-9]*)\.[0-9]$/

function bumpVersion(current: Version, bump: 'major' | 'minor' | 'patch'): Version {
  switch (bump) {
    // v1.<minor>.<digit>: major stays 1, a breaking or feature change opens the next minor at LTS (0), and the
    // development state is one digit, so past 9 it also opens the next minor
    case 'major':
    case 'minor':
      return { major: 1, minor: current.minor + 1, patch: 0 }
    case 'patch':
      return current.patch >= 9 ? { major: 1, minor: current.minor + 1, patch: 0 } : { major: 1, minor: current.minor, patch: current.patch + 1 }
  }
}

function parseVersion(versionStr: string): Version {
  const bare = versionStr.trim().replace(/^v/, '')
  const parts = bare.split('.')
  if (!VERSION.test(bare) || parts.length !== 3) throw new Error(`${versionStr} is not v1.<minor>.<digit>`)
  return { major: Number(parts[0]), minor: Number(parts[1]), patch: Number(parts[2]) }
}

function formatVersion(v: Version): string {
  return `${v.major}.${v.minor}.${v.patch}`
}

/**
 * Code-point order of the whole version string. software.semver packs major, minor, and patch as integers;
 * no formula sorts text. text.order is that lead, and hexMissOf has no address for it: hex params are
 * naturals, and a version is a string. This comparison is the code.
 */
export const VERSION_ORDER_LEAD = 'text.order'

export function versionTextBefore(from: string, to: string): boolean {
  return from < to
}

function isForward(from: string, to: string): boolean {
  return versionTextBefore(from, to)
}

/**
 * One next suggestion. A feature opens the next minor at LTS (state 0), forward only, from the version passed in —
 * the latest published version, never the working tree. Pure: it does not read or write a file.
 */
export function suggestNextVersion(published: string): string {
  const bare = published.trim().replace(/^v/, '')
  const suggestion = formatVersion(bumpVersion(parseVersion(bare), 'minor'))
  if (!isForward(bare, suggestion)) throw new Error(`${suggestion} is not forward from ${bare}`)
  return suggestion
}

/** The archive record: the version string in .zenodo.json. */
export function readZenodoVersion(): string {
  const raw = JSON.parse(readFileSync('.zenodo.json', 'utf8')) as { version?: unknown }
  const version = typeof raw.version === 'string' ? raw.version.trim().replace(/^v/, '') : ''
  if (!VERSION.test(version)) throw new Error(`.zenodo.json version is ${version || 'missing'}, not v1.<minor>.<digit>`)
  return version
}

/** Latest published version from `npm view <name> version`. There is no fallback to package.json. */
export function readPublishedVersion(name: string): string {
  let out = ''
  try {
    out = execSync(`npm view ${JSON.stringify(name)} version --json`, {
      stdio: ['ignore', 'pipe', 'pipe'],
    }).toString().trim()
  } catch (e) {
    const err = e as { stderr?: Buffer; message?: string }
    const why = err.stderr?.toString().trim() || err.message || 'no registry answer'
    throw new Error(`npm view ${name} version failed: ${why}`)
  }
  let parsed: unknown
  try { parsed = JSON.parse(out) } catch { parsed = undefined }
  const version = typeof parsed === 'string' ? parsed : ''
  if (!VERSION.test(version)) throw new Error(`npm view ${name} version returned ${out || 'nothing'}, not a published v1.<minor>.<digit>`)
  return version
}

// ============================================================================
// AUTOMATED VERSIONING
// ============================================================================

export async function autoVersion(): Promise<{
  zenodo: string
  suggestion: string
  currentVersion: string
  newVersion: string
  bumpType: string
  analysis: ChangeAnalysis
  tagged: boolean
  wrote: boolean
}> {
  const prior = readFileSync('package.json', 'utf8')
  const pkg = JSON.parse(prior) as { version: string }
  const zenodo = readZenodoVersion()
  const suggestion = suggestNextVersion(zenodo)
  const analysis = analyzeChanges()
  const held = pkg.version

  console.log('\nNEXT VERSION')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`Zenodo record: ${zenodo}`)
  console.log(`Next: ${suggestion}`)
  console.log(`Working tree: ${held}`)
  console.log('Continuing from the record.')

  return {
    zenodo,
    suggestion,
    currentVersion: held,
    newVersion: held,
    bumpType: 'minor',
    analysis,
    tagged: false,
    wrote: false,
  }
}

// ============================================================================
// VERSION STATUS
// ============================================================================

export async function statusVersion(): Promise<void> {
  console.log('\n📊 VERSION STATUS')
  console.log('═══════════════════════════════════════════════════════════════')

  try {
    const pkgJson = JSON.parse(readFileSync('package.json', 'utf8'))
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo "none"')
      .toString()
      .trim()

    const commitsSinceTag = execSync(`git rev-list --count ${lastTag}..HEAD 2>/dev/null || echo "0"`)
      .toString()
      .trim()

    const zenodo = readZenodoVersion()
    const suggestion = suggestNextVersion(zenodo)
    const bumpType = decideVersionBump(analyzeChanges())

    console.log(`\nZenodo record: ${zenodo}`)
    console.log(`Next: ${suggestion}`)
    console.log(`Working tree: ${pkgJson.version}`)
    console.log(`Last tag: ${lastTag}`)
    console.log(`Commits since tag: ${commitsSinceTag}`)
    console.log(`Commit reading: ${bumpType} (informational; the suggestion is taken from the published version)`)
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`)
  }
}

// ============================================================================
// CROSS-DOMAIN INTELLIGENCE
// ============================================================================

/**
 * FORMULA: Automated Semantic Versioning via Change Analysis
 *
 * Domains integrated:
 * - Engineering (commits, changes)
 * - Quality (refactoring, efficiency)
 * - Features (new functionality)
 * - Reliability (fixes, breaking changes)
 * - Operations (versioning, tagging)
 *
 * Decision tree:
 * Breaking changes → MAJOR (reliability)
 * Consolidation + Refactoring + Efficiency → MINOR (quality)
 * New features → MINOR (engineering)
 * Fixes + Efficiency → PATCH (reliability + performance)
 * Refactoring only → NO BUMP (quality without feature change)
 * Docs only → NO BUMP (documentation)
 *
 * The number shown is one forward step from the Zenodo record. The files keep that record, and the call continues.
 */
