// categories/coding/claim-tester — THE SCHOOL'S TESTING TOOL (lead 81: the testing tool of educated quantum
// minds). Paste a claim, and the trial the ledger already runs on itself runs FOR you, in your browser: the three
// pre-registered controls go first — a false arithmetic, a fabricated citation, a laundered real citation — and
// if ANY control verifies the whole session is VOID (an instrument that cannot fail proves nothing); only then
// is the subject adjudicated, and the verdict comes back with its receipt and its develop-plan. Pure hexbit-app
// law: no network, no clock, no float — the same claim gives the same verdict and the same receipt on any
// machine, which is what makes the tool a TEACHER: the student can recompute everything it says.
import { adjudicate, type Verdict } from '../../../../adjudicate.js'
import { noticeOf, type Notice } from './notice.js'

export interface ControlRun { name: string; statement: string; verdict: string; rejected: boolean }
export interface ClaimTest { controls: ControlRun[]; instrumentValid: boolean; subject: Verdict | null; notice: Notice | null }

// each canary lives in a field literally named `control:` — the declared-control idiom the citations finder
// reads (a canary exists to be refused; a ledger that never holds its key is the design, not a fabrication).
const CONTROLS: readonly { name: string; control: string; test?: () => boolean }[] = [
  { name: 'false arithmetic', control: '2 + 2 = 5, so this instrument can fail', test: () => (2 + 2) === 5 },
  { name: 'fabricated citation', control: 'anything at all, proven by theorem this_theorem_was_never_sealed' },
  { name: 'laundered citation', control: 'the moon is made of cheese, proven by theorem two_coins' },
]

/** run the trial the ledger's way: controls first, subject only on a valid instrument. */
export function testClaim(claim: string, decidableTest?: () => boolean): ClaimTest {
  const controls: ControlRun[] = CONTROLS.map((c) => {
    const v = adjudicate(c.control, c.test)
    return { name: c.name, statement: c.control, verdict: v.verdict, rejected: v.verdict !== 'VERIFIED' }
  })
  const instrumentValid = controls.every((c) => c.rejected)
  // the subject's verdict IS the notice's — one call, so the tester and the trial can never differ
  const notice = instrumentValid ? noticeOf(claim, decidableTest) : null
  return {
    controls,
    instrumentValid,
    subject: notice,
    notice,
  }
}
