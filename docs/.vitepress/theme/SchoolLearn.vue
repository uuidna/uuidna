<!-- SchoolLearn — the school's one interactive page (docs/school/learn.md). A course is loaded on demand from
     /school/<course>.json (gen-school-lessons); a lesson is the theorem's own words, its statement set as
     mathematics, and — where the evaluator decides it — one blanked numeral to predict. Checking is one POST to
     /school/attempt, where the Worker recomputes the verdict with the repository's evaluator; this page never grades.
     The passphrase stays in this tab: only the handle and a key derived from it are sent, and only with consent. -->
<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { splitAt, proofExerciseOf, isAnswer, CHECK_LABEL } from '../../../src/school/lesson/shape/index.js'
import { learnerHandleOf, learnerKeyOf, PASSPHRASE_MIN } from '../../../src/school/progress/identity/index.js'

const PAGE = 12 // lessons listed per page of the lesson list

const index = ref(null)
const indexError = ref('')
const find = ref('')
const courseId = ref('')
const course = ref(null)
const courseError = ref('')
const onlyExercises = ref(false)
const at = ref(0)
const answer = ref('')
const status = ref('')
const verdict = ref(null)
const checking = ref(false)
const heading = ref(null)

// identity: kept in this tab only
const passphrase = ref('')
const consent = ref(false)
const handle = computed(() => (passphrase.value.length >= PASSPHRASE_MIN ? learnerHandleOf(passphrase.value) : ''))
const key = computed(() => (handle.value ? learnerKeyOf(passphrase.value) : ''))
const progress = ref(null)
const progressStatus = ref('')
const certStatus = ref('')
const certHref = ref('')

// proof exercise (the kernel grader's seam)
const lean = ref('')
const submitStatus = ref('')
const submitHref = ref('')

const checkedOnly = ref(true)
const courses = computed(() => {
  const all = (index.value?.courses ?? []).filter((c) => !checkedOnly.value || c.exercises > 0 || c.course === courseId.value)
  const q = find.value.trim().toLowerCase()
  return q ? all.filter((c) => c.title.toLowerCase().includes(q) || c.course.toLowerCase().includes(q)) : all
})
const lessons = computed(() => (course.value ? course.value.lessons.filter((l) => !onlyExercises.value || l.exercise) : []))
const lesson = computed(() => lessons.value[at.value] ?? null)
const parts = computed(() => (lesson.value?.exercise ? splitAt(lesson.value.statement, lesson.value.exercise) : null))
const page = computed(() => at.value - (at.value % PAGE))
const listed = computed(() => lessons.value.slice(page.value, page.value + PAGE).map((l, i) => ({ l, i: page.value + i })))
const mine = computed(() => progress.value?.courses?.find((c) => c.course === courseId.value) ?? null)

const post = async (path, body) => {
  const res = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(body) })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}
const unreachable = (e) => `The checker runs on the uuidna.com Worker and did not answer (${String(e?.message || e)}).`

const syncUrl = () => {
  const u = new URL(window.location.href)
  if (courseId.value) u.searchParams.set('course', courseId.value); else u.searchParams.delete('course')
  if (lesson.value) u.searchParams.set('lesson', lesson.value.key); else u.searchParams.delete('lesson')
  window.history.replaceState(null, '', u)
}

const loadCourse = async (id, lessonKey = '') => {
  courseError.value = ''
  course.value = null
  at.value = 0
  if (!id) return
  try {
    const res = await fetch(`/school/${encodeURIComponent(id)}.json`)
    if (!res.ok) throw new Error(`the course file answered ${res.status}`)
    course.value = await res.json()
    const k = lessonKey ? lessons.value.findIndex((l) => l.key === lessonKey) : -1
    at.value = k >= 0 ? k : 0
  } catch (e) { courseError.value = `This course could not be loaded: ${String(e?.message || e)}` }
  resetLesson()
  syncUrl()
}

const resetLesson = () => {
  answer.value = ''
  status.value = ''
  verdict.value = null
  submitStatus.value = ''
  submitHref.value = ''
  lean.value = lesson.value ? proofExerciseOf(courseId.value, lesson.value).template : ''
}

const go = async (i) => {
  if (i < 0 || i >= lessons.value.length) return
  at.value = i
  resetLesson()
  syncUrl()
  await nextTick()
  heading.value?.focus()
}

watch(onlyExercises, () => { at.value = 0; resetLesson(); syncUrl() })

const check = async () => {
  if (!lesson.value?.exercise) return
  const a = answer.value.trim()
  if (!isAnswer(a)) { verdict.value = 'invalid'; status.value = 'Enter a whole number in digits, with no sign and no leading zero.'; return }
  checking.value = true
  status.value = 'Checking…'
  const body = { course: courseId.value, lesson: lesson.value.key, answer: a }
  if (handle.value && consent.value) Object.assign(body, { handle: handle.value, key: key.value, consent: true })
  try {
    const r = await post('/school/attempt', body)
    if (!r.data.verdict) { verdict.value = null; status.value = r.data.error || `The checker answered ${r.status}.`; return }
    verdict.value = r.data.verdict
    const said = r.data.verdict === 'correct' ? `Correct: with ${a} the statement evaluates true.`
      : r.data.verdict === 'incorrect' ? `Not yet: with ${a} the statement evaluates false. Try again.`
      : 'The evaluator returned no verdict for this value, so it does not count as correct.'
    const kept = r.data.stored ? ` Saved under handle ${handle.value} — ${r.data.mastery.passed} of ${r.data.mastery.of} exercises passed in this course.`
      : r.status === 429 ? ` ${r.data.error}` : ' Checked, not saved.'
    status.value = said + kept
    if (r.data.stored) await loadProgress()
  } catch (e) { verdict.value = null; status.value = unreachable(e) } finally { checking.value = false }
}

const loadProgress = async () => {
  progressStatus.value = ''
  if (!handle.value) { progressStatus.value = `Enter a passphrase of at least ${PASSPHRASE_MIN} characters first.`; return }
  try {
    const res = await fetch(`/school/progress/${handle.value}`, { headers: { accept: 'application/json' } })
    const data = await res.json().catch(() => ({}))
    progress.value = data
    progressStatus.value = res.status === 404 ? 'Nothing is saved under this handle yet.' : res.ok ? `${data.courses.length} course(s) under handle ${handle.value}.` : (data.error || `answered ${res.status}`)
  } catch (e) { progressStatus.value = unreachable(e) }
}

const certify = async (id) => {
  certStatus.value = 'Sealing the certificate…'
  certHref.value = ''
  try {
    const r = await post('/school/certificate', { handle: handle.value, key: key.value, course: id })
    if (r.ok) { certHref.value = r.data.href; certStatus.value = `Certificate sealed by ${r.data.signed} of ${r.data.of} witness theorems and deposited.` ; await loadProgress() }
    else certStatus.value = r.data.error || r.data.why || `answered ${r.status}`
  } catch (e) { certStatus.value = unreachable(e) }
}

const submitProof = async () => {
  submitHref.value = ''
  if (!handle.value || !consent.value) { submitStatus.value = 'A proof is queued under a handle: enter a passphrase and tick the consent box above.'; return }
  submitStatus.value = 'Submitting…'
  try {
    const r = await post('/school/submit', { handle: handle.value, key: key.value, course: courseId.value, lesson: lesson.value.key, lean: lean.value, consent: true })
    if (r.ok && r.data.stored) { submitHref.value = r.data.href; submitStatus.value = `Queued for the kernel. The Lean kernel grader has not run on it yet; its verdict will appear at the submission's address.` }
    else submitStatus.value = r.data.error || r.data.note || `answered ${r.status}`
  } catch (e) { submitStatus.value = unreachable(e) }
}

onMounted(async () => {
  try {
    const res = await fetch('/school/index.json')
    if (!res.ok) throw new Error(`answered ${res.status}`)
    index.value = await res.json()
  } catch (e) { indexError.value = `The course catalogue could not be loaded: ${String(e?.message || e)}` }
  const q = new URL(window.location.href).searchParams
  const want = q.get('course') || ''
  if (want) { courseId.value = want; await loadCourse(want, q.get('lesson') || '') }
})
</script>

<template>
  <div class="learn">
    <section class="panel" aria-labelledby="learn-course">
      <h2 id="learn-course">Choose a course</h2>
      <p v-if="indexError" role="alert">{{ indexError }}</p>
      <p v-else-if="!index">Loading the catalogue…</p>
      <template v-else>
        <p class="hint">{{ index.courses.length }} courses, {{ index.lessons }} lessons, {{ index.exercises }} with an exercise checked the moment you answer.</p>
        <label class="check"><input v-model="checkedOnly" type="checkbox" /> List only courses with checked exercises</label>
        <label for="learn-find">Find a course</label>
        <input id="learn-find" v-model="find" type="search" autocomplete="off" />
        <label for="learn-select">Course</label>
        <select id="learn-select" v-model="courseId" @change="loadCourse(courseId)">
          <option value="">— pick one —</option>
          <option v-for="c in courses" :key="c.course" :value="c.course">{{ c.title }} · {{ c.lessons }} lessons · {{ c.exercises }} checked</option>
        </select>
      </template>
      <p v-if="courseError" role="alert">{{ courseError }}</p>
    </section>

    <section v-if="course" class="panel" aria-labelledby="learn-lessons">
      <h2 id="learn-lessons">{{ course.title }}</h2>
      <p class="hint">Wing <code>{{ course.wing }}</code> · level {{ course.level || 'unmeasured' }} ({{ course.band }}) · {{ course.lessons.length }} lessons, {{ course.exercises }} with a checked exercise.</p>
      <label class="check"><input v-model="onlyExercises" type="checkbox" /> Show only lessons with a checked exercise</label>
      <nav aria-label="Lessons in this course">
        <ol class="lesson-list" :start="page + 1">
          <li v-for="{ l, i } in listed" :key="l.key">
            <button type="button" :aria-current="i === at ? 'step' : undefined" @click="go(i)">
              {{ l.name }}<span v-if="l.exercise" class="tag"> · exercise</span>
            </button>
          </li>
        </ol>
        <p class="pager">
          <button type="button" :disabled="at === 0" @click="go(at - 1)">Previous lesson</button>
          <span>Lesson {{ lessons.length ? at + 1 : 0 }} of {{ lessons.length }}</span>
          <button type="button" :disabled="at >= lessons.length - 1" @click="go(at + 1)">Next lesson</button>
        </p>
      </nav>
    </section>

    <article v-if="lesson" class="panel" aria-labelledby="learn-lesson">
      <h2 id="learn-lesson" ref="heading" tabindex="-1">{{ lesson.name }}</h2>
      <p v-if="lesson.why && lesson.why !== lesson.name">{{ lesson.why }}</p>
      <div v-if="lesson.mathml" class="math" v-html="lesson.mathml"></div>
      <pre v-else class="statement"><code>{{ lesson.statement }}</code></pre>
      <p class="hint">Sealed as theorem <a :href="`/theorem/${lesson.key}`">{{ lesson.key }}</a> · address <code>{{ lesson.address }}</code></p>

      <form v-if="parts" class="exercise" @submit.prevent="check">
        <fieldset>
          <legend>Predict the value</legend>
          <p class="blanked">
            <code>{{ parts.before }}</code><input id="learn-answer" v-model="answer" class="blank" inputmode="numeric" autocomplete="off"
              :size="parts.blank.length + 2" aria-label="The missing number" aria-describedby="learn-check-label" /><code>{{ parts.after }}</code>
          </p>
          <button type="submit" :disabled="checking">Check my answer</button>
          <p id="learn-check-label" class="hint">A check is {{ CHECK_LABEL }}.</p>
        </fieldset>
      </form>
      <p v-else class="hint">This lesson carries no instantly checked exercise: the evaluator does not decide its statement with a single blank. The proof exercise below is graded by the Lean kernel instead.</p>
      <p class="result" role="status" aria-live="polite"><strong v-if="verdict === 'correct'">Correct. </strong><strong v-else-if="verdict === 'incorrect'">Not yet. </strong>{{ status }}</p>

      <details class="proof">
        <summary>Prove it in Lean — graded by the kernel</summary>
        <p class="hint">Replace <code>sorry</code> with a proof of the sealed statement, unchanged. A separate kernel grader compiles submissions; until it runs, a submission is only queued.</p>
        <label for="learn-lean">Your Lean proof</label>
        <textarea id="learn-lean" v-model="lean" rows="5" spellcheck="false"></textarea>
        <button type="button" @click="submitProof">Queue for the kernel</button>
        <p role="status" aria-live="polite">{{ submitStatus }} <a v-if="submitHref" :href="submitHref">Submission record</a></p>
      </details>
    </article>

    <section class="panel" aria-labelledby="learn-handle">
      <h2 id="learn-handle">Keep your progress (optional)</h2>
      <p>Pick a passphrase. Its content address becomes your handle — eight hex characters that stand for you. No email and no name are asked for or stored. The passphrase stays in this tab; if you lose it, the link to your handle is lost too.</p>
      <label for="learn-pass">Passphrase</label>
      <input id="learn-pass" v-model="passphrase" type="password" autocomplete="off" :minlength="PASSPHRASE_MIN" aria-describedby="learn-pass-help" />
      <p id="learn-pass-help" class="hint">At least {{ PASSPHRASE_MIN }} characters. Only the handle and a key derived from the passphrase are sent; uuidna.com stores a digest of the key.</p>
      <p v-if="handle">Your handle: <strong><code>{{ handle }}</code></strong></p>
      <label class="check"><input v-model="consent" type="checkbox" :disabled="!handle" /> Save my checked answers under this handle on uuidna.com</label>
      <p><button type="button" :disabled="!handle" @click="loadProgress">Show my progress</button></p>
      <p role="status" aria-live="polite">{{ progressStatus }}</p>
      <div v-if="progress && progress.courses && progress.courses.length" class="wrap">
        <table>
          <caption>Mastery per course: exercises passed over exercises in the course</caption>
          <thead><tr><th scope="col">Course</th><th scope="col">Passed</th><th scope="col">Progress</th><th scope="col">Certificate</th></tr></thead>
          <tbody>
            <tr v-for="c in progress.courses" :key="c.course">
              <th scope="row">{{ c.course }}</th>
              <td>{{ c.passed }} of {{ c.of }}</td>
              <td><progress :value="c.passed" :max="c.of || 1" :aria-label="`${c.course}: ${c.passed} of ${c.of} exercises passed`"></progress></td>
              <td>
                <a v-if="c.certificate" :href="`/school/certificate/${c.certificate}`">View certificate</a>
                <button v-else-if="c.mastered" type="button" @click="certify(c.course)">Seal my certificate</button>
                <span v-else>after mastery</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p role="status" aria-live="polite">{{ certStatus }} <a v-if="certHref" :href="certHref">Open the certificate</a></p>
      <p v-if="mine && !mine.mastered" class="hint">This course: {{ mine.passed }} of {{ mine.of }} exercises passed.</p>
    </section>
  </div>
</template>

<style scoped>
.learn { margin: 1.5rem 0; }
.panel { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1rem 1.25rem; margin: 1.25rem 0; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.panel h2 { margin: 0 0 .6rem; border: 0; padding: 0; font-size: 1.25rem; }
.hint { color: var(--vp-c-text-2); font-size: .92rem; }
label { display: block; margin: .6rem 0 .2rem; font-weight: 600; }
label.check { font-weight: 400; }
input, select, textarea { width: 100%; padding: .45rem .6rem; border: 1px solid var(--vp-c-text-2); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; }
input[type='checkbox'] { width: auto; margin-right: .4rem; }
input.blank { width: auto; display: inline-block; margin: 0 .25rem; text-align: center; font-family: var(--vp-font-family-mono); }
textarea { font-family: var(--vp-font-family-mono); font-size: .9rem; }
button { margin: .3rem .5rem .3rem 0; padding: .4rem .8rem; border: 1px solid var(--vp-c-text-2); border-radius: 6px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; font: inherit; }
button:hover:not(:disabled) { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
button:disabled { cursor: not-allowed; opacity: .75; }
button[aria-current='step'] { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); font-weight: 600; }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible, h2:focus-visible {
  outline: 3px solid var(--vp-c-brand-1); outline-offset: 2px;
}
.lesson-list { padding-left: 1.6rem; }
.lesson-list button { text-align: left; }
.tag { color: var(--vp-c-text-2); }
.pager { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.math { overflow-x: auto; font-size: 1.2rem; padding: .5rem 0; }
.statement, .blanked { overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
.blanked code { font-size: .95rem; }
.result { min-height: 1.5rem; font-size: 1rem; }
fieldset { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: .6rem 1rem; }
legend { font-weight: 600; padding: 0 .3rem; }
.proof { margin-top: 1rem; }
.proof summary { cursor: pointer; font-weight: 600; }
.wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; }
th, td { text-align: left; padding: .35rem .6rem; border-bottom: 1px solid var(--vp-c-divider); }
caption { text-align: left; color: var(--vp-c-text-2); padding-bottom: .3rem; }
progress { width: 8rem; }
</style>
