import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { ROOT } from './boundary.js'
import { attributions } from './claim-attribution.js'
import { gradeOf } from './external-fact.js'
import { softwareArchiveRelatedIdentifiers } from './zenodo-seals.js'

/**
 * THE ARCHIVE RECORD DECLARES WHAT THE LEDGER DRAWS ON.
 *
 * Zenodo's own FAQ says inbound citations are discovered by Crossref, NASA ADS
 * and Europe PMC — not something a depositor arranges. Outbound ones are
 * entirely the depositor's: a record says what it rests on, or a reader who
 * finds the record first has nothing to follow — by construction, the record
 * is the whole of what they hold, and an undeclared source appears in it
 * nowhere.
 *
 * This ledger computes that set per theorem and, until this was written, the
 * deposit said nothing about it: five papers the theorems depend on, absent
 * from the one document a stranger finds first. A census computed and not
 * published is the defect this tree keeps catching in itself.
 */
const citedDois = (): string[] =>
  [...new Set(attributions().map((a) => a.source).filter((s) => gradeOf(s) === 'identifier'))].sort()

test('every DOI the ledger attributes is declared in the deposit', () => {
  const declared = new Set(softwareArchiveRelatedIdentifiers().map((r) => r.identifier))
  const missing = citedDois().filter((doi) => !declared.has(doi))

  assert.deepEqual(missing, [], 'a paper a theorem rests on, and the archive record does not mention it')
})

test('the written .zenodo.json carries them too — not only the generator', () => {
  // The file is what Zenodo reads. A generator that would produce the right
  // thing, over a file that does not, publishes the file.
  const zenodo = JSON.parse(readFileSync(join(ROOT, '.zenodo.json'), 'utf8')) as {
    related_identifiers?: { identifier: string }[]
  }
  const declared = new Set((zenodo.related_identifiers ?? []).map((r) => r.identifier))
  const missing = citedDois().filter((doi) => !declared.has(doi))

  assert.deepEqual(missing, [], 'run gen-zenodo — the deposit is behind the ledger')
})

// CONTROL: a reader that found nothing would report an empty `missing` and pass
// while proving nothing. This package has shipped two checks like that.
test('the census is not empty — the reader works', () => {
  const dois = citedDois()
  assert.ok(dois.length >= 5, `expected the attributed DOIs, found ${dois.length}`)
  for (const doi of dois) assert.match(doi, /^10\.\d{4,9}\//, 'a DOI, not a name or a standard')
})

test('a DOI that is not attributed is not invented into the deposit', () => {
  // The relation is derived from the census, so the deposit can neither cite a
  // paper the ledger does not, nor omit one it does.
  const declared = softwareArchiveRelatedIdentifiers()
    .map((r) => r.identifier)
    .filter((id) => /^10\.\d{4,9}\//.test(id))
  const cited = new Set(citedDois())
  const own = declared.filter((id) => !cited.has(id))

  // uuidna's own standing DOIs are legitimately there; what must not appear is
  // an external paper nobody attributed.
  for (const id of own) {
    assert.ok(
      id.startsWith('10.5281/zenodo.') || id.startsWith('10.7483/') || /^10\.\d{4,9}\//.test(id),
      `${id} is in the deposit and in no census`,
    )
  }
})
