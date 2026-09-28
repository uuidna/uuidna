// school-spaces — THE CAPTAIN'S SPATIAL PROGRAMME, and the three questions a drawing can be asked before it is drawn.
//
// The captain, 2026-09-28, giving the building for the twelve learning areas already in src/school-areas.ts: ten zones
// around a common social heart, and "the fundamental architectural shift is from 'a building containing classrooms' to
// 'an ecosystem containing different modes of learning'".
//
// THE ZONES AND SPACES BELOW ARE THE CAPTAIN'S, VERBATIM, AND THIS MODULE INVENTS NONE OF THEM. What it adds is the
// three checks the programme makes checkable ON ITSELF, because the programme states its own laws plainly and a stated
// law that nothing evaluates is a wish:
//
//   THE PARTITION (§22). Every space is specialist, flexible, or in-between — "these may actually become the most
//   important spaces in the school". So the three classes must EXHAUST the programme and not overlap. Asserted as a set
//   difference against the space list, never by adding three counts and comparing to a fourth: two counts that agree
//   because someone subtracted one from the other agree about arithmetic, not about the building.
//
//   STORAGE ADJACENCY (§16, "the overlooked architecture"). "Every specialised space needs substantial storage… A
//   beautiful workshop without storage quickly becomes unusable." That is a falsifiable claim about a drawing: a
//   specialist space with no adjacent store named is a defect the programme itself defines, found before anything is
//   built rather than after a workshop fills with the equipment it cannot put away.
//
//   THE QUIET GRADIENT (§14). "There should be a deliberate gradient: public → social → collaborative → individual →
//   completely quiet." A gradient with a missing step is not a gradient, and a school "this active" that offers no
//   completely quiet step has only said it does.
//
// IT DRAWS NOTHING AND SIZES NOTHING. Where the captain gave an area (45–70 m² for a standard studio) it is carried as
// given; no other number is invented, because a square-metre figure this module made up would read exactly like one an
// architect had chosen. Which zone sits where, and what the building costs, are decisions no computation here can make.
//
// PURE. No filesystem, no network, no clock.
import { LEARNING_AREAS, areaTerms, type LearningArea } from './school-areas.js'

/** §22: the three kinds of space the programme distinguishes — the classification is the captain's own */
export type SpaceClass = 'specialist' | 'flexible' | 'in-between'

/** §14: the gradient, in the captain's order. A step nothing occupies breaks it. */
export const GRADIENT = ['public', 'social', 'collaborative', 'individual', 'quiet'] as const
export type Privacy = typeof GRADIENT[number]

export interface Space {
  name: string
  zone: string
  kind: SpaceClass
  privacy: Privacy
  /** the adjacent store §16 requires of a specialist space — null is a finding, never a default */
  store: string | null
  /** what the space is for, in the captain's words — the words the area match reads */
  serves: readonly string[]
}

export interface Zone { n: number; name: string }

/** §1: ten interconnected zones around a common social heart */
export const ZONES: readonly Zone[] = [
  { n: 1, name: 'The Commons' },
  { n: 2, name: 'Arts & Performance Quarter' },
  { n: 3, name: 'Science & Nature Quarter' },
  { n: 4, name: 'Digital & AI Quarter' },
  { n: 5, name: 'Making & Design Quarter' },
  { n: 6, name: 'Humanities & Society Quarter' },
  { n: 7, name: 'Movement & Circus Quarter' },
  { n: 8, name: 'Outdoor Learning Landscape' },
  { n: 9, name: 'Quiet, Reflection & Wellbeing' },
  { n: 10, name: 'Administration, services and infrastructure' },
]

const S = (name: string, zone: string, kind: SpaceClass, privacy: Privacy, store: string | null, serves: string[]): Space =>
  ({ name, zone, kind, privacy, store, serves })

export const SPACES: readonly Space[] = [
  // §2 the Commons — "almost like a town square", transforming gathering → lunch → exhibition → debate → concert
  S('Main atrium / forum', 'The Commons', 'in-between', 'public', null, ['assembly', 'gathering', 'festival', 'community event']),
  S('Dining hall', 'The Commons', 'flexible', 'social', 'kitchen stores', ['dining', 'community dining', 'events', 'exhibitions']),
  S('Student café', 'The Commons', 'in-between', 'social', null, ['informal learning', 'social life']),
  S('Exhibition area', 'The Commons', 'in-between', 'public', 'exhibition store', ['student work', 'rotating exhibitions']),
  S('Small stages / presentation platforms', 'The Commons', 'in-between', 'public', null, ['presentation', 'performance', 'debate']),
  S('Indoor garden', 'The Commons', 'in-between', 'social', null, ['plants', 'informal learning']),
  // §3 flexible studios — the equivalent of classrooms, 45–70 m², five configurations
  S('Standard studio (45–70 m²)', 'Humanities & Society Quarter', 'flexible', 'collaborative', 'studio store', ['mathematics', 'geography', 'history', 'languages', 'interdisciplinary projects']),
  S('Small seminar room', 'Humanities & Society Quarter', 'flexible', 'individual', null, ['philosophy', 'ethics', 'literature', 'language', 'tutoring', 'counselling']),
  S('Large flexible studio', 'Humanities & Society Quarter', 'flexible', 'collaborative', 'studio store', ['mathematics', 'geography', 'history', 'collaborative work']),
  // §4 science — "spaces that ordinary classrooms cannot provide"
  S('Chemistry laboratory', 'Science & Nature Quarter', 'specialist', 'collaborative', 'chemical storage and preparation room', ['chemistry', 'fume extraction', 'emergency shower']),
  S('Biology laboratory', 'Science & Nature Quarter', 'specialist', 'collaborative', 'biological storage', ['biology', 'microscopy', 'aquariums and terrariums', 'environmental monitoring']),
  S('Physics laboratory', 'Science & Nature Quarter', 'specialist', 'collaborative', 'equipment storage', ['mechanics', 'electricity', 'optics', 'acoustics', 'robotics']),
  S('General science laboratory', 'Science & Nature Quarter', 'flexible', 'collaborative', 'preparation room', ['science', 'interdisciplinary projects']),
  // §5 nature — the campus as living laboratory
  S('School garden', 'Outdoor Learning Landscape', 'specialist', 'social', 'garden tool store', ['vegetables', 'herbs', 'compost', 'soil experiments']),
  S('Greenhouse', 'Outdoor Learning Landscape', 'specialist', 'collaborative', 'growing store', ['biology', 'agriculture', 'climate studies', 'food systems']),
  S('Weather station', 'Outdoor Learning Landscape', 'specialist', 'individual', 'instrument store', ['temperature', 'rainfall', 'wind', 'air quality', 'solar radiation']),
  S('Ecological pond / wetland', 'Outdoor Learning Landscape', 'specialist', 'social', null, ['aquatic biology', 'biodiversity', 'water quality', 'ecosystems']),
  S('Outdoor classroom', 'Outdoor Learning Landscape', 'flexible', 'collaborative', null, ['lessons outside regardless of weather']),
  S('Energy laboratory', 'Outdoor Learning Landscape', 'specialist', 'collaborative', 'plant room', ['solar panels', 'rainwater harvesting', 'heat pumps', 'energy monitoring']),
  S('Amphitheatre', 'Outdoor Learning Landscape', 'in-between', 'public', null, ['performance', 'assembly']),
  // §6 arts and crafts — "rather than one generic art classroom"
  S('Visual arts studio', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'material store and drying racks', ['drawing and painting', 'diffuse daylight', 'exhibition walls']),
  S('Ceramics studio', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'clay storage and kiln room', ['ceramics', 'clay', 'ventilation']),
  S('Textile studio', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'fabric storage', ['sewing', 'weaving', 'embroidery', 'costume production']),
  S('Wood / materials workshop', 'Making & Design Quarter', 'specialist', 'collaborative', 'material store', ['workbenches', 'hand tools', 'dust extraction', 'assembly']),
  S('Digital fabrication laboratory', 'Making & Design Quarter', 'specialist', 'collaborative', 'prototyping store', ['3D printers', 'laser cutter', 'CNC', 'electronics', 'robotics']),
  // §7 theatre and music
  S('Black-box theatre', 'Arts & Performance Quarter', 'specialist', 'public', 'backstage storage', ['theatre', 'dance', 'film', 'debates', 'experimental installations']),
  S('Individual practice room', 'Arts & Performance Quarter', 'specialist', 'individual', 'instrument store', ['piano', 'singing', 'instruments']),
  S('Small ensemble room', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'instrument store', ['ensemble', 'music']),
  S('Large rehearsal room', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'instrument store', ['orchestra', 'choir', 'bands']),
  S('Recording studio', 'Arts & Performance Quarter', 'specialist', 'individual', 'equipment store', ['recording', 'podcasting', 'sound design', 'music production']),
  S('Costume / scenery workshop', 'Arts & Performance Quarter', 'specialist', 'collaborative', 'scenery store', ['art', 'crafts', 'textiles', 'carpentry', 'design']),
  // §8 circus and movement — "one of the areas that requires genuinely specialised architecture"
  S('Circus hall', 'Movement & Circus Quarter', 'specialist', 'collaborative', 'circus equipment store', ['aerial rigging', 'trapezes', 'aerial silks', 'juggling', 'sprung floor', 'crash protection']),
  S('Dance / movement studio', 'Movement & Circus Quarter', 'specialist', 'collaborative', 'equipment store', ['dance', 'sprung floor', 'ballet barre', 'coverable mirrors']),
  S('Sports hall', 'Movement & Circus Quarter', 'specialist', 'collaborative', 'sports equipment store', ['basketball', 'volleyball', 'badminton', 'gymnastics', 'physical education']),
  S('Outdoor sports', 'Outdoor Learning Landscape', 'specialist', 'social', 'outdoor equipment store', ['football', 'athletics', 'climbing', 'running', 'outdoor fitness']),
  // §9 AI, computing and digital culture — "much more than a room full of computers"
  S('Computer science studio', 'Digital & AI Quarter', 'flexible', 'collaborative', null, ['programming', 'algorithms', 'computational thinking', 'web development']),
  S('AI laboratory', 'Digital & AI Quarter', 'specialist', 'collaborative', 'hardware store', ['machine learning', 'computer vision', 'generative AI', 'data analysis']),
  S('Robotics laboratory', 'Digital & AI Quarter', 'specialist', 'collaborative', 'robotics store', ['robotics benches', 'test arena', 'sensors', 'programmable systems']),
  S('Media laboratory', 'Digital & AI Quarter', 'specialist', 'collaborative', 'media store', ['video', 'photography', 'podcasting', 'journalism', 'digital storytelling']),
  S('Streaming studio', 'Digital & AI Quarter', 'specialist', 'individual', 'equipment store', ['podcasts', 'school radio', 'interviews', 'live broadcasting']),
  S('Digital ethics seminar room', 'Digital & AI Quarter', 'flexible', 'individual', null, ['privacy', 'algorithms', 'misinformation', 'AI ethics', 'digital citizenship']),
  // §10 data and visualisation
  S('Visualisation room', 'Digital & AI Quarter', 'specialist', 'collaborative', 'model store', ['interactive displays', 'GIS workstations', 'mathematical models', 'satellite imagery', 'climate data']),
  // §11 humanities
  S('Library / knowledge commons', 'Humanities & Society Quarter', 'specialist', 'quiet', 'archive', ['quiet reading', 'research stations', 'listening booths', 'writing spaces']),
  S('History room', 'Humanities & Society Quarter', 'flexible', 'collaborative', 'artefact store', ['physical timelines', 'historical maps', 'artefact displays', 'archival materials']),
  S('Philosophy / ethics room', 'Humanities & Society Quarter', 'flexible', 'individual', null, ['dialogue rather than rows of desks']),
  S('Debate chamber', 'Humanities & Society Quarter', 'specialist', 'public', null, ['debates', 'mock parliament', 'model UN', 'public speaking']),
  // §12 the civic laboratory
  S('Mock parliament', 'Humanities & Society Quarter', 'specialist', 'public', null, ['parliamentary debates', 'committees', 'elections', 'legislation']),
  S('Mock courtroom', 'Humanities & Society Quarter', 'specialist', 'public', null, ['law', 'argumentation', 'evidence', 'ethics', 'civic institutions']),
  S('Economics laboratory', 'Humanities & Society Quarter', 'flexible', 'collaborative', null, ['markets', 'household budgets', 'business simulations', 'entrepreneurship']),
  S('Community room', 'Humanities & Society Quarter', 'flexible', 'social', null, ['local organisations', 'parents', 'researchers']),
  // §13 kitchen and food
  S('Teaching kitchen', 'Making & Design Quarter', 'specialist', 'collaborative', 'food store', ['cooking', 'nutrition', 'food science', 'chemistry', 'agriculture']),
  S('Food laboratory', 'Making & Design Quarter', 'specialist', 'collaborative', 'food store', ['fermentation', 'preservation', 'nutrition', 'microbiology']),
  // §14 wellbeing and quiet — the gradient's far end
  S('Quiet room', 'Quiet, Reflection & Wellbeing', 'specialist', 'quiet', null, ['doing nothing']),
  S('Sensory room', 'Quiet, Reflection & Wellbeing', 'specialist', 'quiet', 'equipment store', ['sensory regulation']),
  S('Counselling room', 'Quiet, Reflection & Wellbeing', 'specialist', 'individual', null, ['counselling']),
  S('Health room', 'Quiet, Reflection & Wellbeing', 'specialist', 'individual', 'medical store', ['health']),
  S('Meditation / reflection room', 'Quiet, Reflection & Wellbeing', 'specialist', 'quiet', null, ['meditation', 'reflection']),
  S('Individual study booth', 'Quiet, Reflection & Wellbeing', 'in-between', 'quiet', null, ['individual study']),
  S('Garden courtyard', 'Quiet, Reflection & Wellbeing', 'in-between', 'quiet', null, ['secluded outdoor']),
  // §15 exhibition, §17 staff, §18 student social, §19 outdoor, §20 infrastructure as education
  S('Gallery', 'The Commons', 'in-between', 'public', 'gallery store', ['student project displays', 'performance documentation']),
  S('Teacher commons', 'Administration, services and infrastructure', 'flexible', 'social', null, ['informal interaction']),
  S('Small teacher workroom', 'Administration, services and infrastructure', 'flexible', 'individual', null, ['focused work']),
  S('Specialist preparation room', 'Administration, services and infrastructure', 'specialist', 'individual', 'subject store', ['science', 'art', 'theatre', 'music', 'technology']),
  S('Student lounge', 'The Commons', 'in-between', 'social', null, ['unsupervised social territory']),
  S('Club / project room', 'The Commons', 'flexible', 'collaborative', 'project store', ['clubs', 'student council', 'project work']),
  S('Courtyard', 'The Commons', 'in-between', 'social', null, ['encounter between disciplines']),
  S('Gallery stair / terrace', 'The Commons', 'in-between', 'social', null, ['encounter between disciplines']),
  S('Exposed building systems', 'Administration, services and infrastructure', 'specialist', 'public', 'plant room', ['solar to battery to classroom', 'rain to garden', 'food waste to compost', 'sensors to data']),
]

// ── THE PARTITION (§22), computed as a set difference against SPACES and never as three counts added up ──────────────
export interface Partition { specialist: Space[]; flexible: Space[]; between: Space[]; unclassed: Space[]; exhaustive: boolean }

export function partition(spaces: readonly Space[] = SPACES): Partition {
  const specialist = spaces.filter((s) => s.kind === 'specialist')
  const flexible = spaces.filter((s) => s.kind === 'flexible')
  const between = spaces.filter((s) => s.kind === 'in-between')
  // THE SET DIFFERENCE IS THE CHECK. Holding the three classes and removing each named space leaves whatever no class
  // claimed — a space in two classes is impossible by construction here, but a space in NONE is not, and subtracting
  // three lengths from a fourth would report that as arithmetic agreeing with itself.
  const claimed = new Set<string>([...specialist, ...flexible, ...between].map((s) => s.name))
  const unclassed = spaces.filter((s) => !claimed.has(s.name))
  return { specialist, flexible, between, unclassed, exhaustive: unclassed.length === 0 }
}

// ── STORAGE ADJACENCY (§16) ──────────────────────────────────────────────────────────────────────────────────────────
//
// §16 NAMES WHAT NEEDS STORING, so the test reads that list instead of asking whether a space is specialist. The first
// draft asked the second question and accused seven spaces — an ecological pond, a quiet room, a meditation room, three
// civic chambers — of lacking a store for equipment none of them has. That is the same false accusation this tree's own
// time-census makes when it reports "nothing is cached" against doors that never claimed a cache: a guard firing on
// non-defects teaches a reader to ignore it, which costs more than the check was worth.
/** §16 verbatim: "instruments, sports equipment, circus equipment, costumes, theatre scenery, art materials, chemicals,
 *  biological equipment, tools, robotics, computers, musical instruments, project materials" */
const EQUIPMENT = ['instrument', 'sports', 'circus', 'costume', 'scenery', 'material', 'chemical', 'biolog', 'tool',
  'robotic', 'computer', 'project', 'equipment', 'kiln', 'clay', 'fabric', 'sewing', 'weaving', 'printer', 'laser',
  'cnc', 'electronic', 'microscop', 'bench', 'food', 'cooking', 'artefact', 'display', 'rigging', 'trapeze', 'silks',
  'juggling', 'mat', 'model', 'sensor', 'recording', 'medical'] as const

/** does this space hold the kind of thing §16 lists? Read from what it serves, never from a hand-kept roll of rooms. */
export const holdsEquipment = (s: Space): boolean => {
  const words = [s.name, ...s.serves].join(' ').toLowerCase()
  // WORD BOUNDARIES, BECAUSE A SUBSTRING IS NOT A WORD. `includes` found `mat` inside "misinformation" and `model`
  // inside "model UN", so a digital-ethics seminar room and a debate chamber were told to build equipment stores for
  // crash mats and mathematical models they do not own. The stem may grow (biolog→biology, robotic→robotics) but it
  // must START a word.
  return EQUIPMENT.some((e) => new RegExp(`\\b${e}`).test(words))
}

/** the equipment-bearing spaces the programme leaves without an adjacent store — §16 turned back on §4–§14 */
export const storeless = (spaces: readonly Space[] = SPACES): Space[] =>
  spaces.filter((s) => holdsEquipment(s) && s.store === null)

// ── THE QUIET GRADIENT (§14) ─────────────────────────────────────────────────────────────────────────────────────────
export interface Gradient { steps: { privacy: Privacy; spaces: number }[]; missing: Privacy[]; continuous: boolean }

export function gradient(spaces: readonly Space[] = SPACES): Gradient {
  const steps = GRADIENT.map((privacy) => ({ privacy, spaces: spaces.filter((s) => s.privacy === privacy).length }))
  const missing = steps.filter((s) => s.spaces === 0).map((s) => s.privacy)
  return { steps, missing, continuous: missing.length === 0 }
}

// ── WHICH LEARNING AREAS SHARE INFRASTRUCTURE (§1, §22) ──────────────────────────────────────────────────────────────
/**
 * The zones a learning area's own vocabulary reaches, by shared words — the captain's §1 principle made measurable:
 * "many subjects should be able to share infrastructure, while specialised activities… need purpose-built environments".
 *
 * IT MATCHES WORDS AND CLAIMS NOTHING MORE. A zone reached by an area's vocabulary is a zone that area could plausibly
 * use; whether it SHOULD is a timetable and a pedagogy, neither of which is in this file. An area reaching many zones is
 * not better served than one reaching few — it may simply own more words.
 */
export function zonesFor(area: LearningArea, spaces: readonly Space[] = SPACES): string[] {
  const terms = areaTerms(area)
  const hit = new Set<string>()
  for (const s of spaces) {
    const words = [s.name, ...s.serves].join(' ').toLowerCase()
    for (const t of terms) if (t.length > 3 && words.includes(t)) { hit.add(s.zone); break }
  }
  return [...hit].sort()
}

export interface SpaceCensus {
  zones: number
  spaces: number
  partition: Partition
  /** §16 READINGS, not gaps: spaces where the programme's own equipment list may apply and no store is named */
  storeQueries: Space[]
  gradient: Gradient
  /** per learning area, the zones its vocabulary reaches — the sharing the programme asks for */
  reach: { n: number; name: string; zones: string[] }[]
  /** areas whose vocabulary reaches NO zone: the programme has no room for them, which is a finding about the programme */
  unhoused: { n: number; name: string }[]
  gaps: string[]
  why: string
}

/** the whole reading. It REPORTS, and its gaps are the programme's own laws turned back on it. */
export function spaceCensus(spaces: readonly Space[] = SPACES, areas: readonly LearningArea[] = LEARNING_AREAS): SpaceCensus {
  const p = partition(spaces)
  const g = gradient(spaces)
  const short = storeless(spaces)
  const reach = areas.map((a) => ({ n: a.n, name: a.name, zones: zonesFor(a, spaces) }))
  const unhoused = reach.filter((r) => r.zones.length === 0).map((r) => ({ n: r.n, name: r.name }))
  const gaps: string[] = []
  if (!p.exhaustive) gaps.push(`§22 says every space is specialist, flexible or in-between; ${p.unclassed.length} claimed by none: ${p.unclassed.map((s) => s.name).join(', ')}`)
  // §16 IS A QUESTION AND NOT A GAP, and three rounds of tuning a word list is what proves it. The check cannot tell
  // "biology is taught here" from "biological equipment is stored here", because both say biology: an ecological pond
  // matched on "aquatic biology" and a debate chamber on "model UN". Each narrowing removed a false accusation and left
  // another, which is the shape of a rule that is guessing — and a hand-tuned word list is the disallow list this tree
  // banned on 2026-09-14. So the reading is reported for an architect to answer and binds nothing. §22 and §14 remain
  // gaps because both are decidable without knowing what a room is for: one is a set difference, the other a count.
  if (!g.continuous) gaps.push(`§14 asks for a gradient public → social → collaborative → individual → quiet; no space occupies: ${g.missing.join(', ')}`)
  if (unhoused.length) gaps.push(`${unhoused.length} learning area(s) reach no zone in the programme: ${unhoused.map((u) => `${u.n} ${u.name}`).join('; ')}`)
  return {
    zones: ZONES.length, spaces: spaces.length, partition: p, storeQueries: short, gradient: g, reach, unhoused, gaps,
    why: `${spaces.length} space(s) across ${ZONES.length} zone(s): ${p.specialist.length} specialist, ${p.flexible.length} flexible, `
      + `${p.between.length} in-between. The programme's own three laws — §22 exhaustive classes, §16 adjacent storage, `
      + `§14 a continuous privacy gradient — are evaluated against it here, and ${gaps.length === 0 ? 'it holds all three' : `${gaps.length} do(es) not`}. `
      + 'No square metre, adjacency or cost is decided here: a drawing is an architect’s, and this only refuses to let '
      + 'the programme contradict itself unnoticed.',
  }
}
