#!/usr/bin/env node
// diamond-extend — Extract all 66 principles from sealed theorems and generate complete metadata

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Principle {
  file: string
  title: string
  blurb: string
}

// Domain mapping: infer from principle title/file
function inferDomain(file: string, title: string): 'science' | 'games' | 'arts' | 'audits' | 'strategies' {
  const lower = title.toLowerCase() + ' ' + file.toLowerCase()

  // Science domains
  if (lower.includes('quantum') || lower.includes('physics') || lower.includes('thermodynamics') ||
      lower.includes('relativity') || lower.includes('optics') || lower.includes('electromagnetism') ||
      lower.includes('chemistry') || lower.includes('statics') || lower.includes('propulsion') ||
      lower.includes('astronomy') || lower.includes('diving') || lower.includes('molecular') ||
      lower.includes('neuro') || lower.includes('biophysics') || lower.includes('spectrum') ||
      lower.includes('acoustics') || lower.includes('infinity') || lower.includes('clayg') ||
      lower.includes('core') || lower.includes('ring') || lower.includes('rosette') ||
      lower.includes('hardware') || lower.includes('software') || lower.includes('solids') ||
      lower.includes('glagolitic') || lower.includes('ephemeris') || lower.includes('tides') ||
      lower.includes('topography') || lower.includes('discover') || lower.includes('vortex') ||
      lower.includes('sequence') || lower.includes('divbyzero') || lower.includes('uuidna')) {
    return 'science'
  }

  // Games domains
  if (lower.includes('chess') || lower.includes('nim') || lower.includes('matching') ||
      lower.includes('reasoning') || lower.includes('audit')) {
    return 'games'
  }

  // Arts domains
  if (lower.includes('colour') || lower.includes('color') || lower.includes('music') ||
      lower.includes('production') || lower.includes('typography') || lower.includes('photography') ||
      lower.includes('harmony') || lower.includes('pentagram') || lower.includes('editing') ||
      lower.includes('typesetting')) {
    return 'arts'
  }

  // Audits/Security
  if (lower.includes('security') || lower.includes('exploit') || lower.includes('audit') ||
      lower.includes('sanitize') || lower.includes('conformance') || lower.includes('integrity') ||
      lower.includes('command') || lower.includes('cve') || lower.includes('legal') ||
      lower.includes('report') || lower.includes('audit game')) {
    return 'audits'
  }

  // Strategies
  if (lower.includes('sailing') || lower.includes('navigation') || lower.includes('trading') ||
      lower.includes('matching') || lower.includes('command') || lower.includes('cipher') ||
      lower.includes('codes') || lower.includes('identifiers')) {
    return 'strategies'
  }

  // Default to science for core/foundational
  return 'science'
}

function getMetaphysicalQuestion(file: string, title: string, domain: string): string {
  const key = file.replace('.lean', '').toLowerCase()

  const questions: Record<string, string> = {
    'core': 'Is the multiplication table the foundation of all number, or do we project meaning onto it?',
    'ring': 'Does ℤ/9 exist in nature, or did we invent it?',
    'rosette': 'Why is the seven-fold symmetry so prevalent in nature and culture?',
    'uuidna': 'Can identity itself be algebraic, or is it transcendent?',
    'vortex': 'Why do ancient cultures discover the same mathematics independently?',
    'sequence': 'Is the mirror reflection a consequence of symmetry or its cause?',
    'divbyzero': 'Why does mathematics need to make division-by-zero finite?',
    'biophysics': 'Is life just applied chemistry, or does it have emergent properties?',
    'discover': 'Can pure mathematics discover facts about the world?',
    'quantum': 'Does the quantum computer reveal reality or construct it?',
    'clay': 'Are the seven Millennium problems seven fundamental truths, or human constructions?',
    'legal': 'Can law itself be proven, or is it always interpretation?',
    'infinity': 'Is infinity real, or just a useful fiction?',
    'cipher': 'Can cryptography guarantee secrecy, or only hide it?',
    'audit': 'Can audit detect deception, or only absence of proof?',
    'auditgame': 'Is an audit like a game, or is a game like an audit?',
    'coins': 'Do the two coins conserve energy, or do we impose conservation?',
    'hardware': 'Are logic gates facts about physics, or abstractions we invented?',
    'software': 'Can software correctness be proven, or only verified?',
    'os': 'Is an operating system a specification or an artifact?',
    'exploits': 'Is a vulnerability a flaw or a feature waiting for discovery?',
    'sanitize': 'Can you make data safe, or only safer?',
    'solids': 'Why do only five regular solids exist, and what does that mean?',
    'neuro': 'Does understanding neurons explain consciousness?',
    'propulsion': 'Can rockets teach us about causation itself?',
    'navigation': 'Can you navigate without a map, or only think you can?',
    'topography': 'Is the landscape real or just elevation data?',
    'glagolitic': 'Why did medieval numerals encode the alphabet?',
    'ephemeris': 'Is astronomical time real or conventional?',
    'pentagram': 'Why does the five-pointed star appear everywhere?',
    'chess': 'If we solved chess perfectly, would it still be beautiful?',
    'nim': 'Does knowing the winning strategy spoil the game?',
    'matching': 'Can mathematics compute the perfect match?',
    'editor': 'Is a document a sequence or a tree?',
    'codes': 'Can error-correcting codes correct the truth?',
    'identifiers': 'Can a check digit verify identity?',
    'tides': 'Do tides obey mathematics or does mathematics obey tides?',
    'calendar': 'Is the calendar discovered or invented?',
    'colour': 'Why does mathematics predict beauty?',
    'harmony': 'Is harmony discovered in nature or imposed by our ears?',
    'production': 'Can reversing sound understand sound?',
    'photography': 'Does photography capture truth or moment?',
    'psychology': 'Can psychology be sealed, or only psychology be honest?',
    'spectrum': 'Why can we only see one octave of light?',
    'acoustics': 'Can sound be reduced to mathematics?',
    'chemistry': 'Is chemistry just applied physics?',
    'thermodynamics': 'Does entropy imply meaninglessness?',
    'molecular': 'Why do bonds follow discrete rules?',
    'electromagnetism': 'Are fields real or mathematical convenience?',
    'statics': 'Why do structures balance?',
    'optics': 'Does understanding light explain beauty?',
    'relativity': 'Does relativity eliminate free will?',
    'diving': 'How much depth is worth the danger?',
    'astronomy': 'Are we arbitrary in the cosmos?',
    'security': 'Can security be proven, or only raised?',
    'command': 'Can authentication guarantee truth?',
    'reasoning': 'Can reason prove itself?',
    'sailing': 'Can you trust the wind?',
    'trading': 'Is fair exchange mathematical?',
    'typing': 'Is typography an art or a science?',
  }

  return questions[key] || `What does ${title} mean for how we understand the world?`
}

function main() {
  const theoremFile = join(process.cwd(), 'src/theorems/generated.ts')
  const content = readFileSync(theoremFile, 'utf8')

  // Extract all principles
  const principlesMatch = content.match(/export const PRINCIPLES: readonly \[string, string, string\]\[\] = \[([\s\S]*?)\n\]/);
  if (!principlesMatch) {
    console.error('Could not find PRINCIPLES in generated.ts')
    process.exit(1)
  }

  const principles: Principle[] = []
  const lines = principlesMatch[1].split('\n')

  for (const line of lines) {
    const match = line.match(/\["([^"]+)",\s*"([^"]+)",\s*"([^"]*)"\]/)
    if (match) {
      const [, file, title, blurb] = match
      principles.push({ file, title, blurb })
    }
  }

  console.log(`✓ Extracted ${principles.length} principles from sealed theorems`)

  // Generate metadata for all 66
  const metadata: Record<string, any> = {}
  for (const p of principles) {
    const domain = inferDomain(p.file, p.title)
    const metaphysicalQuestion = getMetaphysicalQuestion(p.file, p.title, domain)

    metadata[p.file] = {
      file: p.file,
      title: p.title,
      blurb: p.blurb,
      domain,
      metaphysicalQuestion,
      theoremCount: 0, // will be counted from actual theorems
    }
  }

  // Count theorems per file
  const theoremMatch = content.match(/export const THEOREMS:\s*Theorem\[\]\s*=\s*\[([\s\S]*?)\n\]/);
  if (theoremMatch) {
    const theoremsStr = theoremMatch[1]
    for (const p of principles) {
      const count = (theoremsStr.match(new RegExp(`file:\\s*"${p.file.replace(/\./g, '\\.')}"`, 'g')) || []).length
      metadata[p.file].theoremCount = count || 1
    }
  }

  // Output as TypeScript object
  const output = `// Generated metadata for all 66 theorem domains
export const DOMAIN_METADATA = ${JSON.stringify(metadata, null, 2)}
`

  writeFileSync(join(process.cwd(), 'src/scripts/domain-metadata.ts'), output, 'utf8')
  console.log(`✓ Generated metadata for ${principles.length} domains`)
  console.log(`  Breakdown by domain:`)
  const counts: Record<string, number> = { science: 0, games: 0, arts: 0, audits: 0, strategies: 0 }
  for (const [_, meta] of Object.entries(metadata)) {
    counts[(meta as any).domain]++
  }
  for (const [domain, count] of Object.entries(counts)) {
    console.log(`    ${domain}: ${count}`)
  }
}

main()
