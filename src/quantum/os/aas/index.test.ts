import { test } from 'node:test'
import assert from 'node:assert/strict'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
import {
  AAS_CHECKLIST_SLUG, AAS_DOI_PREFIX, AAS_PROBE_QUERY, AAS_WP,
  aasChecklist, aasPortSearch, decodeEntities, listItemsOf, renderAasChecklist, renderAasPort, stripHtml,
} from './index.js'

// The parse is the half that can be held to an exact answer: this fragment is the shape journals.aas.org actually
// serves (WordPress rendered content, Yoast entities, nested markup inside a list item), so a regression in the
// reader fails here offline rather than waiting for a network run to look odd.
const FIXTURE = `<div class="wp-block-group">
<h2>Before submitting</h2>
<ol>
<li>Read and follow the <a href="/manuscript-preparation/">AAS journal manuscript preparation guidelines</a>.
  <strong>!</strong> Avoid common mistakes: Make sure to include line<br/>numbers.</li>
<li>Check that your abstract is shorter than 250 words.</li>
<li>Make sure you have current email addresses for all authors&#8217; institutions.</li>
<li>   </li>
</ol>
<p>See also the <em>Graphics Guide</em> &amp; the UAT.</p>
</div>`

test('listItemsOf reads every list item, flattens nested markup, and drops an empty one', () => {
  const items = listItemsOf(FIXTURE)
  assert.equal(items.length, 3, 'four <li> elements, one of them whitespace only — an empty requirement is not a requirement')
  assert.equal(items[0], 'Read and follow the AAS journal manuscript preparation guidelines. ! Avoid common mistakes: Make sure to include linenumbers.',
    'an inline tag is dropped, not spaced: "guidelines</a>." must not read "guidelines ." in text this tree addresses')
  assert.equal(items[1], 'Check that your abstract is shorter than 250 words.')
  assert.equal(items[2], 'Make sure you have current email addresses for all authors’ institutions.', 'numeric entity decoded')
  // NEGATIVE CONTROL: a fragment with no list carries no items — the reader must not invent one from a paragraph
  assert.deepEqual(listItemsOf('<p>Check that your abstract is shorter than 250 words.</p>'), [])
})

test('decodeEntities and stripHtml decode named, numeric and hex forms without eating text', () => {
  assert.equal(decodeEntities('a &amp; b &#8217;s &#x2014; end &notanentity;'), 'a & b ’s — end &notanentity;')
  assert.equal(stripHtml('<h2>Before   submitting</h2>\n<p>See the <em>Graphics Guide</em> &amp; the UAT.</p>'),
    'Before submitting See the Graphics Guide & the UAT.')
})

test('the AAS door names its REST base and the corpus it does NOT serve', () => {
  assert.equal(AAS_WP, 'https://journals.aas.org/wp-json/wp/v2')
  assert.equal(AAS_DOI_PREFIX, '10.3847', 'the IOP-published corpus this door deliberately leaves to crossref')
})

test('renderAasPort and renderAasChecklist say DECLINED rather than reporting no requirements', () => {
  const declined = renderAasPort({
    definition: 'uuidnaOS·aas·journals', query: 'open access', count: 0, hits: [], declined: true,
    note: 'responded 503', scope: 'x', receipt: '0'.repeat(32), handle: '0'.repeat(8), hexbits: [], door: 'https://uuidna.com/00000000',
  })
  assert.match(declined, /^DECLINED aas-journals · 0 hits/)
  assert.match(declined, /note: responded 503/)
  const empty = renderAasChecklist({
    definition: 'uuidnaOS·aas·checklist', source: 'https://journals.aas.org/x/', title: '', modified: '', count: 0,
    items: [], declined: true, note: 'responded 404', honest: 'x',
    receipt: '0'.repeat(32), handle: '0'.repeat(8), hexbits: [], door: 'https://uuidna.com/00000000',
  })
  assert.match(empty, /^DECLINED aas-checklist · 0 items/)
})

// uuidna_aas is the wire name for both modes; these reach the network, so each asserts the INVARIANT that holds
// either way — an answer carries addressed rows, and a refusal carries a reason. Silence is the only failure.
test('uuidna_aas search — journals.aas.org answers the declared probe, or declines with a reason', async () => {
  const r = await aasPortSearch(AAS_PROBE_QUERY, 5)
  assert.equal(r.definition, 'uuidnaOS·aas·journals')
  assert.match(r.scope, new RegExp(AAS_DOI_PREFIX))
  if (r.declined) { assert.ok(r.note.length > 0, 'a refusal must say why'); return }
  assert.ok(r.count >= 1, `the probe "${AAS_PROBE_QUERY}" should match AAS's own open-access pages`)
  assert.equal(r.count, r.hits.length, 'the count must BE the hits, not a number beside them')
  for (const h of r.hits) {
    assert.match(h.address, UUID)
    assert.ok(h.title.length > 0 && h.url.startsWith('https://journals.aas.org/'), 'every hit is a real page on the host')
  }
  assert.equal(new Set(r.hits.map((h) => h.address)).size, r.hits.length, 'distinct pages get distinct addresses')
})

test('uuidna_aas checklist — the pre-submission checklist is read as addressed items, numbered by the page', async () => {
  const r = await aasChecklist(AAS_CHECKLIST_SLUG)
  assert.equal(r.definition, 'uuidnaOS·aas·checklist')
  assert.match(r.honest, /does not judge a manuscript/i)
  if (r.declined) { assert.ok(r.note.length > 0, 'an unread checklist must say why, never report zero requirements'); return }
  assert.ok(r.count >= 20, `the published checklist carries tens of items, got ${r.count}`)
  assert.equal(r.count, r.items.length)
  assert.deepEqual(r.items.map((i) => i.n), r.items.map((_, i) => i + 1), 'the numbering is the page’s own order')
  assert.match(r.title, /checklist/i)
  assert.ok(r.modified.length > 0, 'the page reports its own last-modified stamp — read, never minted here')
  assert.ok(r.items.some((i) => /abstract/i.test(i.text)), 'the abstract-length requirement is one of them')
  for (const i of r.items) assert.match(i.handle, /^[0-9a-f]{8}$/)
})
