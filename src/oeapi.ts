// oeapi — THE OPEN EDUCATION API PROJECTION: the sealed ledger shaped to the field names of the Open Education API
// v6.0 (oeapi.eu — the SURF/Npuls interoperability standard the Dutch MBO/HBO/WO institutions publish education data
// with), so an institution reads uuidna's school with the reader it already has. Nothing is authored here: every
// organisation, programme, course and learning outcome is COMPUTED from the ledger, and the standard's required uuid
// ids ARE uuidna's content-addresses — each id recomputes from the proof it names, which is exactly what an id in an
// interoperability format is supposed to be and almost never is.
//
// THE MAPPING (both sides already existed; this only renames — the API twin of the schema.org surface in seo.ts):
//   /organisations     → uuidna (organisationType `root`) and the quantum school (`school`)
//   /programmes        → the skill clusters, typed `track` — the standard's own word for "a structured learning path,
//                        often thematically defined"; NOT `programme`, which the spec defines as leading to a
//                        qualification or degree. uuidna awards none, so the honest enum value is the smaller one.
//   /courses           → the monographs, one per proof wing — the course texts the school already reads, each
//                        carrying the school's own MEASURED grading (src/school.ts) in the spec's `ext` slot
//   /learning-outcomes → the theorems: a lesson whose outcome is DECIDABLE, its Lean proof one click away
//
// STRICT MEANS REFUSING TOO — `complexityLevel` (Bloom/SOLO) is deliberately never emitted: no theorem carries a
// cognitive level, and inventing one would be the overclaim the honesty gate exists to catch. Same law as the absent
// law-types in the schema.org surface. `Course.level` is refused for the same reason and is the sharper case: the
// school genuinely DOES grade its courses — by the decade of the measured kernel cost of their proofs — so there was
// a real value to put in a field whose name fits perfectly and whose MEANING is a qualification level. It goes in
// `ext` instead, and the refusal is served by name in ABSENT_FIELDS.
//
// an interoperability PROJECTION of sealed, public data — NOT a Student Information System. Read-only,
// and it carries NO personal data: no persons, groups, offerings, associations or results, because uuidna enrols
// nobody and grades nobody — the kernel grades the PROOF, and a claim is tried at /trials. Every
// absence is listed by name with the pointer to what stands in its place. Recomputable by anyone; integrity.
import { theorems, skillGroups } from './theorems/index.js'
import { publications } from './publish.js'
import { courses as schoolCourses } from './school.js'
import { toUuid, merkleFold } from './address.js'

const HOST = 'https://uuidna.com'
/** the exact spec this projection's field names are vetted against (src/tests/oeapi.test.ts is the finder) */
export const OEAPI_SPEC = 'https://github.com/open-education-api/specification/blob/main/oeapi.json'
export const OEAPI_VERSION = '6.0'
const LANGUAGE = 'en-GB'                    // the LanguageTypedString tag (spec pattern: language[-REGION])
const TEACHING_LANGUAGES = ['eng']          // teachingLanguages wants three-letter codes (RFC 4647), per the spec

/** A string with its language tag — the standard's LanguageTypedString; both fields mandatory. */
export interface OeapiLangString { language: string; value: string }
/** The standard's IdentifierEntry: a controlled codeType plus the human-readable code. */
export interface OeapiCode { codeType: string; code: string }

export interface OeapiOrganisation {
  organisationId: string; organisationType: string; name: OeapiLangString[]; primaryCode: OeapiCode
  description: OeapiLangString[]; link: string; shortName: OeapiLangString[]
  parentId?: string; rootId?: string; childIds?: string[]
}
export interface OeapiProgramme {
  programmeId: string; programmeType: string; name: OeapiLangString[]; primaryCode: OeapiCode
  organisationId: string; link: string; teachingLanguages: string[]
  learningOutcomeIds: string[]; otherCodes: OeapiCode[]
}
/** The school's own grading, carried in the standard's `ext` — the slot the spec reserves for exactly this: a real
 *  attribute the vocabulary has no word for. Never `Course.level`; see ABSENT_FIELDS for why that field is refused. */
export interface OeapiCourseExt { level: number; band: string; rank: number; decideSteps: number; entryCost: number }
export interface OeapiCourse {
  courseId: string; name: OeapiLangString[]; primaryCode: OeapiCode; description: OeapiLangString[]
  organisationId: string; link: string; teachingLanguages: string[]
  programmeIds: string[]; learningOutcomeIds: string[]
  abbreviation: string; otherCodes: OeapiCode[]; ext: OeapiCourseExt
}
export interface OeapiLearningOutcome {
  learningOutcomeId: string; name: OeapiLangString[]; primaryCode: OeapiCode
  description: OeapiLangString[]; otherCodes: OeapiCode[]; ext: { proof: string; tactic: string }
}
export interface OeapiProfile {
  version: string; spec: string
  counts: { organisations: number; programmes: number; courses: number; learningOutcomes: number }
  organisations: OeapiOrganisation[]; programmes: OeapiProgramme[]; courses: OeapiCourse[]
  absent: { resource: string; why: string; instead: string }[]
  absentFields: { field: string; why: string }[]
  receipt: string; honest: string
}

const HONEST =
  'An interoperability PROJECTION of the sealed ledger onto Open Education API v6.0 field names — read-only, computed, ' +
  'and carrying no personal data. uuidna is NOT a Student Information System: it enrols nobody and grades nobody, so ' +
  'the person/group/offering/result resources are absent by construction, each listed with what stands in its place. ' +
  'The ids are the ledger\'s own content-addresses, so every identifier recomputes from the proof it names. ' +
  'Recomputable by anyone. Integrity.'

const lang = (value: string): OeapiLangString[] => [{ language: LANGUAGE, value }]
const ident = (codeType: string, code: string): OeapiCode => ({ codeType, code })

const ROOT_ID = toUuid('uuidna-oeapi-organisation:uuidna')
const SCHOOL_ID = toUuid('uuidna-oeapi-organisation:the-quantum-school')

/** The two organisations: uuidna itself (root) and the quantum school within it. */
export function oeapiOrganisations(): OeapiOrganisation[] {
  return [
    { organisationId: ROOT_ID, organisationType: 'root', name: lang('uuidna'),
      primaryCode: ident('organisation_id', 'uuidna'), shortName: lang('uuidna'),
      description: lang('Content-addressed identity and a sealed ledger of machine-checked theorems. Every claim links a Lean 4 proof; integrity.'),
      link: HOST, childIds: [SCHOOL_ID] },
    { organisationId: SCHOOL_ID, organisationType: 'school', name: lang('The quantum school'),
      primaryCode: ident('organisation_id', 'uuidna-school'), shortName: lang('quantum school'),
      description: lang('The school is the ledger: the topics by skill are the curriculum, each monograph a course text, each theorem a lesson, and the Lean kernel — not a teacher — decides when a lesson is understood. No tuition, no enrolment, no degree.'),
      link: `${HOST}/school`, parentId: ROOT_ID, rootId: ROOT_ID },
  ]
}

/** The skill clusters as programmes — typed `track`: a structured learning path. */
export function oeapiProgrammes(): OeapiProgramme[] {
  return skillGroups().map((g) => ({
    programmeId: g.fold, programmeType: 'track', name: lang(g.skill),
    primaryCode: ident('programme_code', g.skill), organisationId: SCHOOL_ID,
    link: `${HOST}/topics`, teachingLanguages: TEACHING_LANGUAGES,
    // the cluster already knows its theorems, and a theorem IS a learning outcome here — the ids were held and
    // not served. Additive under the standard: a consumer keyed on the required fields cannot notice.
    learningOutcomeIds: g.theorems.map((t) => t.address),
    otherCodes: [ident('uuid', g.fold)],
  }))
}

/** The monographs as courses — one per proof wing, carrying its wing's theorems as learning outcomes, and the
 *  school's own MEASURED grading (school.ts's courses(): the decade of the wing's median kernel decide-step cost,
 *  and its place in the derived reading order) in `ext`. That grading is the one thing a reader of a bare course
 *  list cannot supply for themselves, and it is measured rather than assigned — so it is served, under a name that
 *  cannot be mistaken for the qualification level the spec's own `level` field means. */
export function oeapiCourses(): OeapiCourse[] {
  const T = theorems(), groups = skillGroups()
  const foldOfSkill = new Map(groups.map((g) => [g.skill, g.fold]))
  const graded = new Map(schoolCourses().map((c) => [c.wing, c]))
  return publications().map((p) => {
    const wing = T.filter((t) => t.file === p.file)
    const g = graded.get(p.file)
    const programmeIds: string[] = []
    for (const t of wing) {
      const fold = t.skill ? foldOfSkill.get(t.skill) : undefined
      if (fold && !programmeIds.includes(fold)) programmeIds.push(fold)
    }
    return {
      courseId: p.address, name: lang(p.title), primaryCode: ident('identifier', p.slug),
      abbreviation: p.slug,                        // the spec's "abbreviation or internal code" — the slug IS one
      otherCodes: [ident('uuid', p.address)],      // the content-address, in the spec's own uuid codeType
      description: lang(p.abstract), organisationId: SCHOOL_ID,
      link: `${HOST}/publications/${p.slug}`, teachingLanguages: TEACHING_LANGUAGES,
      programmeIds, learningOutcomeIds: wing.map((t) => t.address),
      // an unknown wing grades as 0/unmeasured rather than defaulting to the easiest rung — undecided
      ext: { level: g?.level ?? 0, band: g?.band ?? 'unmeasured', rank: g?.rank ?? 0,
        decideSteps: g?.steps ?? 0, entryCost: g?.entry ?? 0 },
    }
  })
}

/** The theorems as learning outcomes — the outcome of a lesson here is a decidable fact, and the proof is served. */
export function oeapiLearningOutcomes(course?: string): OeapiLearningOutcome[] {
  const wing = course ? publications().find((p) => p.slug === course) : undefined
  if (course && !wing) throw new Error('unknown course: ' + course + ' (a publication slug; see uuidna_publish)')
  const T = wing ? theorems().filter((t) => t.file === wing.file) : theorems()
  // the proof URL rides in `ext`, the standard's own slot for non-standard attributes: LearningOutcome has no `link`
  // field, and inventing one would break the very interoperability this projection exists for.
  return T.map((t) => ({
    learningOutcomeId: t.address, name: lang(t.name), primaryCode: ident('identifier', t.key),
    otherCodes: [ident('uuid', t.address)],
    description: lang(t.statement), ext: { proof: `${HOST}/theorem/${t.key}`, tactic: t.tactic ?? 'decide' },
  }))
}

// THE ABSENCE LAW — a "we do not serve X" that names no alternative lies by omission. Each absent resource carries
// the reason and the pointer to what stands in its place here.
const ABSENT: { resource: string; why: string; instead: string }[] = [
  { resource: '/persons', why: 'uuidna records no people — there is no roster, no account and no personal data to project.',
    instead: 'A contribution is credited to a content-address.' },
  { resource: '/groups', why: 'no cohorts exist: nobody is enrolled, so nobody is grouped.',
    instead: 'The skill clusters group THEOREMS.' },
  { resource: '/course-offerings', why: 'nothing is scheduled or delivered in time — a proof is available always or not at all.',
    instead: 'The wing itself, served the moment it is sealed: /publications.' },
  { resource: '/associations', why: 'an association binds a person to an offering; with neither, it cannot exist.',
    instead: 'The binding uuidna does keep is theorem-to-proof: /theorems.' },
  { resource: '/results', why: 'nobody is graded here. The Lean kernel grades the PROOF, and the trial judges a CLAIM — never a person.',
    instead: 'The verdicts that do exist, each recomputable: /trials.' },
  { resource: '/buildings, /rooms', why: 'the school has no premises; its address is a content-address.',
    instead: 'The one recomputable home: uuidna.com.' },
]

// THE ABSENCE LAW, ONE LEVEL DOWN. The list above says which RESOURCES are absent. It said nothing about absent
// FIELDS, so a reader of /programmes could not tell a field that is impossible here from one that was forgotten —
// and measuring found both. These two are the impossible kind, and refusing them is the same law that keeps
// `complexityLevel` out: the standard fixes not just the NAME of a field but what its VALUE must mean, and filling
// one with a value of the wrong kind passes every name-vetting audit while lying to every consumer.
const ABSENT_FIELDS: { field: string; why: string }[] = [
  { field: 'LearningOutcome.fieldsOfStudy',
    why: 'the spec types it as an ISCED-F code (UNESCO\'s field-of-study classification). A theorem carries a uuidna ' +
      'SKILL — "z9-ring", "vortex" — which is not an ISCED-F code and does not map onto one. Emitting the skill here ' +
      'would satisfy the field-name audit and misinform every reader who trusts the field to mean what ISCED says.' },
  { field: 'Course.level',
    why: 'the spec types it as the QUALIFICATION level a course sits at — the Dutch/EQF ladder (secondary vocational, ' +
      'associate degree, bachelor, master, doctoral). uuidna awards no qualification at any of those levels, so every ' +
      'value the enum offers would be false. The school DOES grade its courses, by the decade of the measured kernel ' +
      'decide-step cost of the wing\'s proofs, and that grading is served in `ext` — a difficulty reading' +
      'qualification. Putting it in `level` would satisfy the field-name audit and tell every consumer that uuidna ' +
      'confers a degree it does not confer, which is the one overclaim this projection exists to refuse.' },
  { field: 'LearningOutcome.parentIds',
    why: 'the spec types it as the ids of the LEARNING OUTCOMES that are this one\'s parents. uuidna groups theorems ' +
      'by PRINCIPLE, and a principle is not a learning outcome — it is not taught and it is not decidable — so every ' +
      'id emitted here would dangle. The grouping is served honestly as the programme instead.' },
]

/** oeapiProfile() → the whole read-only projection: the organisations, the programmes, the courses (each carrying its
 *  learning-outcome ids), the named absences, and one order-invariant receipt anyone can recompute. The learning
 *  outcomes themselves are served by oeapiLearningOutcomes() — the ledger's full 1000+ lessons, or one course's. */
export function oeapiProfile(): OeapiProfile {
  const organisations = oeapiOrganisations(), programmes = oeapiProgrammes(), courses = oeapiCourses()
  const learningOutcomes = theorems().length
  const receipt = merkleFold([
    toUuid('oeapi:' + OEAPI_VERSION),
    ...organisations.map((o) => o.organisationId),
    ...programmes.map((p) => p.programmeId),
    ...courses.map((c) => c.courseId),
  ])
  return {
    version: OEAPI_VERSION, spec: OEAPI_SPEC,
    counts: { organisations: organisations.length, programmes: programmes.length, courses: courses.length, learningOutcomes },
    organisations, programmes, courses, absent: ABSENT, absentFields: ABSENT_FIELDS, receipt, honest: HONEST,
  }
}
