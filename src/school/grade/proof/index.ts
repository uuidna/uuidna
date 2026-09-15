// school/grade/proof — the lesson's fixed statement and the learner's proof block, and the Lean text the kernel checks.
// Pure text: no storage, no clock, no kernel. The statement and theorem name come from the lesson's Exercise, never
// from the submission; the learner's text is only the proof block.

/** a lesson's proof exercise: the statement and the theorem name are fixed by the lesson, the proof is the learner's */
export interface Exercise {
  course: string
  lesson: string
  /** the Lean theorem name the lesson fixes */
  theorem: string
  /** the proposition, the text between `theorem <name> :` and `:= by` */
  statement: string
}

/** the kernel, as the grader sees it: reason null = accepted with no axioms */
export type Probe = (lean: string, key: string) => { reason: string | null; axioms: string[] | null }

const HEADER = /^\s*theorem\s+([\p{L}_][\p{L}\p{N}_'.]*)\s*:\s*([\s\S]+?)\s*:=\s*by\b/u

/** squash(s) → s with every whitespace run folded to one space, so a re-wrapped statement compares equal */
export const squash = (s: string): string => s.replace(/\s+/g, ' ').trim()

/** exerciseFromTemplate(course, lesson, template) → the Exercise a lesson's `theorem <name> : <statement> := by sorry`
 *  template fixes, or null when the template has no such header */
export function exerciseFromTemplate(course: string, lesson: string, template: string): Exercise | null {
  const m = HEADER.exec(template)
  return m ? { course, lesson, theorem: m[1]!, statement: m[2]!.trim() } : null
}

/** proofBlock(lean) → the learner's proof block. A submission may be the proof block alone, or the whole exercise
 *  with the hole filled; in the second case the header is returned so the caller can hold it to the lesson's. */
export function proofBlock(lean: string): { header: { theorem: string; statement: string } | null; proof: string } {
  const text = lean.replace(/\r\n?/g, '\n')
  const m = HEADER.exec(text)
  return m
    ? { header: { theorem: m[1]!, statement: m[2]!.trim() }, proof: text.slice(m[0].length) }
    : { header: null, proof: text }
}

/** lessonFile(exercise, proof) → the Lean text the kernel checks: the lesson's statement, the learner's proof inside
 *  one parenthesised tactic block, re-indented to a common two-space margin */
export function lessonFile(ex: Exercise, proof: string): string {
  const lines = proof.split('\n')
  while (lines.length && !lines[0]!.trim()) lines.shift()
  while (lines.length && !lines[lines.length - 1]!.trim()) lines.pop()
  const margin = lines.filter((l) => l.trim()).reduce((m, l) => {
    const lead = l.length - l.trimStart().length
    return m < 0 || lead < m ? lead : m
  }, -1)
  const body = lines.map((l) => (l.trim() ? '  ' + l.slice(margin < 0 ? 0 : margin) : '')).join('\n')
  return `theorem ${ex.theorem} : ${ex.statement} := by (\n${body}\n)`
}
