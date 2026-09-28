import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIFE_APIS, LIFE_API_KINDS, LIFE_APIS_NEEDING_A_KEY } from './life-apis.js'

// THE REGISTRY'S OWN RULE, inherited from the school registry: a source is not addable without saying how to check it —
// by construction, since this test requires a probe on every row and fails the build for a row that lacks one.
test('every source declares a probe, so none can be added unverifiable', () => {
  assert.ok(LIFE_APIS.length >= 20, 'the family is declared')
  for (const a of LIFE_APIS) {
    // A DECLARED QUERY MAY BE A BODY. The assertion read "probe is non-empty", which is right for a query-shaped
    // source and wrong for one whose request carries its query in a JSON body: Open Targets is GraphQL and answers
    // nothing else, UniChem's v1 API takes {type, compound}. Demanding a query PARAMETER of those two would have
    // meant inventing one the service ignores — a declaration that reads as verified and probes nothing. What the
    // finder is actually for is that no source enters unverifiable, so it asks for a known-good REQUEST, and a body
    // is one. Both forms stay required to be non-empty: the widening admits POST, it does not admit silence.
    assert.ok(Object.keys(a.probe).length > 0 || Object.keys(a.post ?? {}).length > 0,
      `${a.id} declares a known-good request — a probe query or a post body`)
    assert.match(a.base, /^https:\/\//, `${a.id} is reached over TLS`)
    assert.ok(a.serves.length > 0, `${a.id} says what it serves`)
  }
})

// THE HONEST FIELD IS LOAD-BEARING HERE, not decoration: for a medical record it is the half that prevents misuse.
test('every source states what it does NOT say, at length', () => {
  for (const a of LIFE_APIS) {
    assert.ok(a.honest.length >= 80, `${a.id} states its boundary in more than a phrase`)
  }
})

// A MEASURED REFUSAL IS AN EXACT STATEMENT ABOUT ACCESS, which the first version of this test did not admit. After
// probing, powo reads "REFUSED TO THIS CLIENT — HTTP 403" and duke-phytochem "NO PUBLIC JSON SURFACE FOUND — 404", and
// both are more exact than any cost: they say what happened when the door was knocked on. The vocabulary was too narrow,
// not the declarations.
test('access is stated exactly, never left vague', () => {
  for (const a of LIFE_APIS) {
    assert.match(a.access,
      /no key|KEY REQUIRED|REGISTRATION REQUIRED|key is now required|non-commercial|REFUSED TO THIS CLIENT|NO PUBLIC JSON SURFACE FOUND|UNREACHABLE FROM NODE/,
      `${a.id} must say what it costs OR what happened when it was probed, got: ${a.access.slice(0, 60)}`)
  }
})

// AND A MEASURED CLAIM CARRIES ITS DATE, so a reader can tell a fresh refusal from a stale one.
test('every measured access claim is dated', () => {
  for (const a of LIFE_APIS) {
    if (/measured/i.test(a.access)) {
      assert.match(a.access, /measured \d{4}-\d{2}-\d{2}/, `${a.id} dates what it measured`)
    }
  }
})

// A CREDENTIAL IS AN OWNER ACT, so the sources that need one are findable rather than quietly broken.
test('the sources needing a credential are named, not omitted', () => {
  const keyed = LIFE_APIS_NEEDING_A_KEY()
  assert.ok(keyed.length > 0, 'some of the best herbal corpora are not keyless, and that is recorded')
  assert.ok(keyed.some((a) => a.id === 'mpns'), 'Kew MPNS needs registration and is declared anyway')
  assert.ok(keyed.some((a) => a.id === 'usda-fdc'))
})

test('ids are unique, so a probe result attributes to one source', () => {
  const ids = LIFE_APIS.map((a) => a.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('the herbal and ethnobotanical corpora the captain named are present', () => {
  const ids = new Set(LIFE_APIS.map((a) => a.id))
  for (const id of ['duke-phytochem', 'lotus', 'coconut', 'mpns', 'wfo', 'powo', 'gbif']) {
    assert.ok(ids.has(id), `${id} is declared`)
  }
})

test('coverage spans medicine, chemistry, genomics, botany, nutrition and environment', () => {
  const kinds = new Set(LIFE_API_KINDS())
  for (const k of ['literature', 'clinical', 'regulatory', 'pharmacology', 'chemistry', 'genomics', 'botany',
    'ethnobotany', 'nutrition', 'environment', 'ontology']) {
    assert.ok(kinds.has(k as never), `${k} is covered`)
  }
})

// THE DATABASE MOST LIKELY TO BE MISREAD CARRIES THE LONGEST WARNING, and that is deliberate.
test('the phytochemical corpus warns against the chain it is most used to build', () => {
  const duke = LIFE_APIS.find((a) => a.id === 'duke-phytochem')!
  assert.match(duke.honest, /in vitro|vitro/)
  assert.match(duke.honest, /anthropology|ethnobotan/)
  assert.ok(duke.honest.length > 400, 'the warning is proportionate to the misuse')
})
