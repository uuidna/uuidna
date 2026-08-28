// odometer — the npm string counts linearly; Sequence walks the digit.
//
// MAJOR is locked at 0: a major tick states that what the work PROMISES has changed, and no automation makes
// that statement. MINOR is an unbounded integer. Ten patches roll one minor. Digit 0 is origin
// (runSequence(0).fixed / zero_closes_in_phase). The version COUNTS because npm resolves ranges by number;
// the SEQUENCE is printed beside it, never walked as the string.
export function odometerNext(version: string): string {
  const parts = String(version).split('.').map((p) => Number(p))
  const ma = parts[0], mi = parts[1], pa = parts[2]
  if (ma !== 0 || !Number.isInteger(mi) || !Number.isInteger(pa) || mi < 0 || pa < 0 || pa > 9)
    throw new Error(`odometer: expected v0.[integer].[digit], got ${version}`)
  if (pa < 9) return `0.${mi}.${pa + 1}`
  return `0.${mi + 1}.0`
}
