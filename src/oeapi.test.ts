// OEAPI tests — THE FIELD AUDIT: the Open Education API projection is vetted field-by-field against the v6.0 spec's
// own vocabulary, the same law src/tests/seo.test.ts holds over schema.org names. The vocabulary below is transcribed
// from https://github.com/open-education-api/specification/blob/main/oeapi.json (info.version 6.0) — add a field to
// src/oeapi.ts that the spec does not define and this audit fails, which is how it caught `link` on LearningOutcome
// (the spec has no such field; the proof URL belongs in `ext`) before it ever shipped. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { oeapiProfile, oeapiOrganisations, oeapiProgrammes, oeapiCourses, oeapiLearningOutcomes,
  theorems, publications, skillGroups } from './index.js'

// ── the spec's vocabulary, transcribed with its source (components.schemas.<name>) ────────────────────────────────
const ORGANISATION = {  // schemas.Organisation
  fields: ['addresses', 'childIds', 'children', 'consumer', 'description', 'ext', 'link', 'logo', 'name',
    'organisationId', 'organisationType', 'otherCodes', 'parent', 'parentId', 'primaryCode', 'root', 'rootId', 'shortName'],
  required: ['organisationId', 'organisationType', 'name', 'primaryCode'],
  types: ['root', 'institute', 'department', 'faculty', 'branch', 'academy', 'school'],  // x-ooapi-extensible-enum
}
const PROGRAMME = {  // schemas.Programme = ProgrammeId + ProgrammeProperties
  fields: ['programmeId', 'validFrom', 'validTo', 'abbreviation', 'addresses', 'admissionRequirements', 'assessment',
    'childIds', 'children', 'consumer', 'coordinatorIds', 'coordinators', 'description', 'duration', 'enrolment', 'ext',
    'fieldsOfStudy', 'firstStartDateTime', 'formalDocument', 'instructorIds', 'instructors', 'learningOutcomeIds',
    'learningOutcomes', 'level', 'levelOfQualification', 'link', 'modeOfStudy', 'modesOfDelivery', 'name', 'organisation',
    'organisationId', 'otherCodes', 'parent', 'parentId', 'primaryCode', 'programmeType', 'qualificationAwarded',
    'qualificationDesignations', 'qualificationRequirements', 'resources', 'studyLoad', 'supplementaryInformation',
    'teachingLanguages'],
  required: ['programmeId', 'programmeType', 'name', 'primaryCode'],
  types: ['programme', 'minor', 'honours', 'specialisation', 'track', 'specification'],
}
const COURSE = {  // schemas.Course = CourseId + CourseProperties
  fields: ['courseId', 'validFrom', 'validTo', 'abbreviation', 'addresses', 'admissionRequirements', 'assessment',
    'consumer', 'coordinatorIds', 'coordinators', 'description', 'duration', 'enrolment', 'ext', 'fieldsOfStudy',
    'firstStartDate', 'instructorIds', 'instructors', 'learningOutcomeIds', 'learningOutcomes', 'level', 'link',
    'modesOfDelivery', 'name', 'organisation', 'organisationId', 'otherCodes', 'primaryCode', 'programmeIds',
    'programmes', 'qualificationRequirements', 'resources', 'studyLoad', 'supplementaryInformation', 'teachingLanguages'],
  required: ['courseId', 'name', 'primaryCode'],
}
const LEARNING_OUTCOME = {  // schemas.LearningOutcome — NOTE: no `link` field exists on this resource
  fields: ['abbreviation', 'childIds', 'children', 'complexityLevel', 'consumer', 'description', 'ext', 'fieldsOfStudy',
    'learningOutcomeId', 'name', 'otherCodes', 'parentIds', 'parents', 'primaryCode', 'validFrom', 'validTo'],
  required: ['learningOutcomeId', 'primaryCode', 'name'],
}
const CODE_TYPES = ['account_id', 'bag_id', 'building_id', 'component_code', 'eckid', 'email_address', 'esi',
  'group_code', 'group_type_code', 'identifier', 'institution_code', 'isbn', 'issn', 'kvk_organisation_id',
  'kvk_establishment_id', 'leerbedrijf_id', 'offering_code', 'organisation_id', 'orcid', 'product_id', 'programme_code',
  'room_code', 'schac_home', 'student_number', 'studielink_number', 'system_id', 'username', 'uuid',
  'national_identity_number']  // schemas.codeType

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const LANGUAGE = /^([a-z]{2,3})(-([A-Z]{2}|[0-9]{3}))?(-([a-z]{4}))?(-([a-z]{2}|[0-9]{3}))*(-[a-z0-9]{2,8})*(-x(-[a-z0-9]{1,8})+)?$/

function auditResource(items: Record<string, unknown>[], spec: { fields: string[]; required: string[] }, where: string,
                       failures: string[]): void {
  for (const [i, item] of items.entries()) {
    for (const k of Object.keys(item))
      if (!spec.fields.includes(k)) failures.push(`${where}[${i}]: field "${k}" is not in the v6.0 schema`)
    for (const r of spec.required)
      if (!(r in item)) failures.push(`${where}[${i}]: required field "${r}" missing`)
    // a LanguageTypedString array is {language,value} with both mandatory and a spec-shaped language tag
    for (const k of ['name', 'description', 'shortName']) {
      const v = item[k]
      if (!Array.isArray(v)) continue
      for (const s of v as { language?: string; value?: string }[]) {
        if (typeof s.language !== 'string' || !LANGUAGE.test(s.language)) failures.push(`${where}[${i}].${k}: bad language tag`)
        if (typeof s.value !== 'string' || !s.value) failures.push(`${where}[${i}].${k}: empty value`)
      }
    }
    const code = item['primaryCode'] as { codeType?: string; code?: string } | undefined
    if (code && !CODE_TYPES.includes(String(code.codeType))) failures.push(`${where}[${i}]: codeType "${code.codeType}" is not in the spec's enum`)
    if (code && !code.code) failures.push(`${where}[${i}]: primaryCode.code empty`)
  }
}

test('OEAPI field audit — every emitted field, code and enum value is vetted v6.0 vocabulary', () => {
  const failures: string[] = []
  auditResource(oeapiOrganisations() as unknown as Record<string, unknown>[], ORGANISATION, 'organisations', failures)
  auditResource(oeapiProgrammes() as unknown as Record<string, unknown>[], PROGRAMME, 'programmes', failures)
  auditResource(oeapiCourses() as unknown as Record<string, unknown>[], COURSE, 'courses', failures)
  auditResource(oeapiLearningOutcomes() as unknown as Record<string, unknown>[], LEARNING_OUTCOME, 'learning-outcomes', failures)
  for (const o of oeapiOrganisations())
    if (!ORGANISATION.types.includes(o.organisationType)) failures.push(`organisationType "${o.organisationType}" not in enum`)
  for (const p of oeapiProgrammes())
    if (!PROGRAMME.types.includes(p.programmeType)) failures.push(`programmeType "${p.programmeType}" not in enum`)
  assert.deepEqual(failures, [], 'unvetted OEAPI vocabulary — vet the field against oeapi.json or fix the emission')
})

test('OEAPI ids ARE the ledger content-addresses — every identifier recomputes from the proof it names', () => {
  const outcomes = oeapiLearningOutcomes(), courses = oeapiCourses()
  const theoremAddresses = new Set(theorems().map((t) => t.address))
  const publicationAddresses = new Set(publications().map((p) => p.address))
  assert.equal(outcomes.length, theorems().length)
  for (const o of outcomes) {
    assert.match(o.learningOutcomeId, UUID, 'the spec requires uuid format')
    assert.ok(theoremAddresses.has(o.learningOutcomeId), `${o.learningOutcomeId} is not a sealed theorem address`)
  }
  for (const c of courses) {
    assert.match(c.courseId, UUID)
    assert.ok(publicationAddresses.has(c.courseId), `${c.courseId} is not a sealed publication address`)
  }
  for (const p of oeapiProgrammes()) assert.match(p.programmeId, UUID)
})

test('OEAPI cross-references resolve — no dangling id in the projection', () => {
  const orgIds = new Set(oeapiOrganisations().map((o) => o.organisationId))
  const programmeIds = new Set(oeapiProgrammes().map((p) => p.programmeId))
  const outcomeIds = new Set(oeapiLearningOutcomes().map((o) => o.learningOutcomeId))
  for (const o of oeapiOrganisations()) {
    if (o.parentId) assert.ok(orgIds.has(o.parentId), 'parentId dangles')
    if (o.rootId) assert.ok(orgIds.has(o.rootId), 'rootId dangles')
    for (const c of o.childIds ?? []) assert.ok(orgIds.has(c), 'childId dangles')
  }
  for (const p of oeapiProgrammes()) assert.ok(orgIds.has(p.organisationId), 'programme organisationId dangles')
  for (const c of oeapiCourses()) {
    assert.ok(orgIds.has(c.organisationId), 'course organisationId dangles')
    for (const id of c.programmeIds) assert.ok(programmeIds.has(id), 'course programmeId dangles')
    for (const id of c.learningOutcomeIds) assert.ok(outcomeIds.has(id), 'course learningOutcomeId dangles')
  }
  // every course's outcomes are exactly its wing's theorems — the projection loses nothing and invents nothing
  const wing = publications()[0]
  assert.deepEqual(oeapiLearningOutcomes(wing.slug).map((o) => o.learningOutcomeId).sort(),
    theorems().filter((t) => t.file === wing.file).map((t) => t.address).sort())
})

test('OEAPI refuses what it cannot derive — no complexityLevel, and every absence names its replacement', () => {
  for (const o of oeapiLearningOutcomes())
    assert.equal('complexityLevel' in o, false, 'no theorem carries a Bloom/SOLO level — claiming one is an overclaim')
  const profile = oeapiProfile()
  assert.ok(profile.absent.length >= 5, 'the absent resources must be listed by name')
  for (const a of profile.absent) {
    assert.ok(a.resource && a.why && a.instead, 'an absence claim carries its reason AND its presence pointer')
  }
  const flat = JSON.stringify(profile).toLowerCase()
  for (const banned of ['student_number', 'email_address', 'national_identity_number', 'esi', 'orcid'])
    assert.equal(flat.includes(`"codetype":"${banned}"`), false, `${banned} is personal data — never projected`)
})

test('OEAPI profile is deterministic and counted — the receipt recomputes, the counts are the ledger', () => {
  const a = oeapiProfile(), b = oeapiProfile()
  assert.equal(a.receipt, b.receipt, 'the projection is recomputable')
  assert.equal(a.version, '6.0')
  assert.deepEqual(a.counts, {
    organisations: 2, programmes: skillGroups().length, courses: publications().length, learningOutcomes: theorems().length,
  })
})

// ── THE STABILITY LAW. Standardisation is what makes development stable: a projection onto a fixed standard can GROW
// without breaking anyone, because the receipt folds IDENTITIES and never payloads. Adding learningOutcomeIds,
// abbreviation and otherCodes moved nothing — the profile receipt is byte-identical across the change, so every
// published citation and DOI'd record still resolves. This test is the guard on that: it fails the day an "addition"
// is really a re-identification, which is the only kind of change here that CAN break a consumer.
test('additive spec fields never move an identity — the receipt folds ids', () => {
  const p = oeapiProfile()
  const ids = [...p.organisations.map((o) => o.organisationId), ...p.programmes.map((x) => x.programmeId),
    ...p.courses.map((c) => c.courseId)]
  assert.equal(new Set(ids).size, ids.length, 'ids stay unique')
  for (const id of ids) assert.match(id, UUID, 'every identity is a content-address')
  // the emitted payload is strictly richer than the identities it folds — growth without re-identification
  for (const c of oeapiCourses()) {
    assert.ok(c.abbreviation.length > 0, 'the internal code the spec asks for is served')
    assert.ok(c.otherCodes.some((o) => o.codeType === 'uuid' && o.code === c.courseId),
      'otherCodes carries the SAME address as the id — an alias')
  }
  for (const g of oeapiProgrammes())
    assert.ok(Array.isArray(g.learningOutcomeIds), 'a track serves the outcome ids it already knew')
})

// A field whose VALUE would be the wrong kind is refused, and the refusal is served — the name audit cannot see this.
test('a field that would require inventing a value is absent BY NAME', () => {
  const p = oeapiProfile()
  assert.ok(p.absentFields.length > 0, 'the field-level absence law must be served')
  const isced = p.absentFields.find((f) => f.field.includes('fieldsOfStudy'))
  assert.ok(isced, 'ISCED-F is the case that proves it: a uuidna skill is not an ISCED-F code')
  for (const f of p.absentFields) assert.ok(f.why.length > 40, `${f.field}: an absence without a reason is a shrug`)
  const emitted = new Set(oeapiLearningOutcomes().flatMap((o) => Object.keys(o)))
  for (const f of p.absentFields) assert.ok(!emitted.has(f.field.split('.')[1]), `${f.field} is declared absent but emitted`)
})
