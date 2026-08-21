#!/usr/bin/env node
// audit-prose-entropy.ts — Detect entropy in prose that shouldn't be there
// When theorems speak in Glagolitic (formal proofs), any supporting prose
// should be COMPUTABLE (deterministic).
//
// Checks:
// 1. No timestamps, dates, "currently", "recently", "soon"
// 2. No uncertain language ("might", "could", "may", "possibly", "probably")
// 3. No random explanations or hand-waving
// 4. Each comment must explain WHY
// 5. No references to external, non-reproducible sources

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.url.replace('file://', ''), '../../../..').replace(/\/src\/scripts.*/, '')

interface ProseIssue {
  file: string
  line: number
  type: string
  text: string
  issue: string
}

const issues: ProseIssue[] = []

// Entropy detectors (non-deterministic language)
const entropyPatterns = [
  { regex: /\b(today|tomorrow|yesterday|this week|last week|currently|recently|soon|currently)\b/gi, type: 'time-dependency' },
  { regex: /\b(might|could|may|possibly|probably|perhaps|maybe|seems|appears to)\b/gi, type: 'uncertainty' },
  { regex: /\b(TODO|FIXME|HACK|XXX|BUG|KLUDGE)\b/g, type: 'unfinished' },
  { regex: /\b(randomly|arbitrarily|somehow|magically|obviously|intuitively)\b/gi, type: 'hand-waving' },
  { regex: /(http|https):\/\/(?!localhost)([a-z0-9.-]+\.[a-z]{2,})/gi, type: 'external-dependency' },
]

// Comments should explain WHY not WHAT
const whyCommentCheck = (text: string): string | null => {
  // Comments that just repeat the code (no new information)
  if (text.match(/^(declare|define|create|add|remove|get|set|check|verify|validate|store)\s+/i)) {
    return 'Comment just repeats code syntax (no WHY explanation)'
  }
  if (text.match(/^(the|this|that|these|those|an?|it|they)\s+(is|are|can|will|has)\s+/i) && text.length < 50) {
    return 'Comment is too short to explain WHY'
  }
  return null
}

// Scan all Lean and TypeScript files
function scanFile(filePath: string) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      // Extract comments
      const commentMatch = line.match(/--\s+(.+)$/) || line.match(/\/\/\s+(.+)$/)
      if (!commentMatch) return

      const comment = commentMatch[1]

      // Check for entropy patterns
      entropyPatterns.forEach(({ regex, type }) => {
        if (regex.test(comment)) {
          issues.push({
            file: filePath,
            line: idx + 1,
            type,
            text: comment.slice(0, 80),
            issue: `${type}: non-deterministic language detected`,
          })
        }
      })

      // Check if comment explains WHY
      const whyIssue = whyCommentCheck(comment)
      if (whyIssue && comment.length > 20) {
        // Only flag if comment is substantial but not explanatory
        if (!comment.match(/^(THEOREM|LEMMA|PRINCIPLE|DEFINITION|RETURNS|ENCODES|COMPUTES|PROVES|SEALS|VERIFIES)/i)) {
          issues.push({
            file: filePath,
            line: idx + 1,
            type: 'lacks-why',
            text: comment.slice(0, 80),
            issue: whyIssue,
          })
        }
      }
    })
  } catch (e) {
    // Skip unreadable files
  }
}

// Scan all relevant files
function audit() {
  console.log('\n🔍 PROSE ENTROPY AUDIT — Detecting non-computable language\n')

  const leanDir = join(ROOT, 'lean')
  const scriptsDir = join(ROOT, 'src/scripts')
  const docsDir = join(ROOT, 'docs')

  ;[leanDir, scriptsDir].forEach((dir) => {
    try {
      readdirSync(dir)
        .filter((f) => f.endsWith('.lean') || f.endsWith('.ts'))
        .forEach((f) => scanFile(join(dir, f)))
    } catch {
      // Skip missing directories
    }
  })

  // Report findings
  if (issues.length === 0) {
    console.log('✓ PASSED: All prose is deterministic (no entropy detected)')
    console.log('✓ No time-dependencies, uncertainty, or external references')
    console.log('✓ All comments explain WHY')
    return { passed: true, count: 0 }
  }

  // Group by type
  const byType = new Map<string, ProseIssue[]>()
  issues.forEach((issue) => {
    if (!byType.has(issue.type)) byType.set(issue.type, [])
    byType.get(issue.type)!.push(issue)
  })

  console.log(`✗ FOUND ${issues.length} entropy issues:\n`)
  byType.forEach((proseIssues, type) => {
    console.log(`${type.toUpperCase()} (${proseIssues.length}):`)
    proseIssues.slice(0, 5).forEach((issue) => {
      console.log(`  ${issue.file.replace(ROOT + '/', '')}:${issue.line}`)
      console.log(`    "${issue.text}..."`)
      console.log(`    → ${issue.issue}\n`)
    })
    if (proseIssues.length > 5) {
      console.log(`  ... and ${proseIssues.length - 5} more\n`)
    }
  })

  const byTypeCount: Record<string, number> = {}
  byType.forEach((v, k) => {
    byTypeCount[k] = v.length
  })
  return { passed: false, count: issues.length, byType: byTypeCount }
}

const result = audit()
if (!result.passed) {
  console.log('ACTION: Remove entropy-adding prose. Comments should be computable.\n')
  process.exit(1)
}
