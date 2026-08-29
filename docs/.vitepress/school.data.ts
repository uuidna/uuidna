// school.data.ts — THE SCHOOL, RENDERED FROM THE ONE SOURCE. src/school.ts computed the twelve sections, the graded
// courses and the levels, and nothing displayed them: the model reached nobody, and /school still served 546 lines of
// authored prose describing a curriculum that had drifted from the ledger it claimed to teach. This loader is the
// wiring. It authors NOTHING — every value below is school()'s own output, joined to the pages each course and lesson
// already has (/publications/<slug> for a wing's monograph, /theorem/<key> for a lesson's proof).
//
// Requires the package to be built first (`npm run build` → dist/), exactly like ledger.data.ts. The heartbeats are
// watched too: they ARE the grading, so a re-measure must move the page.
import { school, publications } from '../../dist/index.js'

export type SchoolLesson = { key: string; name: string; steps: number }
export type SchoolCourse = {
  code: string; title: string; wing: string; lessons: number; skills: string[]
  steps: number; entry: number; level: number; band: string; rank: number
  monograph: string | null
  roll: SchoolLesson[]
}
export type SchoolLevel = { level: number; band: string; courses: number; lessons: number; opens: string }
export type SchoolSection = { id: string; title: string; body: string[]; computed: boolean }
export type SchoolData = {
  sections: SchoolSection[]
  levels: SchoolLevel[]
  courses: SchoolCourse[]
  receipt: string
  // the counts the page shows, taken from the same arrays it renders — never a second tally that can disagree
  totals: { sections: number; computed: number; levels: number; courses: number; lessons: number; measured: number }
}

declare const data: SchoolData
export { data }

export default {
  watch: ['../../dist/index.js', '../../lean/heartbeats.json'],
  load(): SchoolData {
    const s = school()
    const monographByWing = Object.fromEntries(publications().map((p) => [p.file, p.slug])) as Record<string, string>
    const courses: SchoolCourse[] = s.courses.map((c) => ({
      ...c,
      monograph: monographByWing[c.wing] ? `/publications/${monographByWing[c.wing]}` : null,
    }))
    return {
      sections: s.sections,
      levels: s.levels,
      courses,
      receipt: s.receipt,
      totals: {
        sections: s.sections.length,
        computed: s.sections.filter((x) => x.computed).length,
        levels: s.levels.length,
        courses: courses.length,
        lessons: courses.reduce((n, c) => n + c.lessons, 0),
        measured: courses.filter((c) => c.level > 0).length,
      },
    }
  },
}
