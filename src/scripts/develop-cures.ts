// develop-cures — WHICH TAUGHT CURES ONE GATE OUTPUT NAMES, as a pure function so the loop's choice is testable.
//
// The loop in develop.ts used to take the FIRST matching cure and rebuild the world before reading the next
// denial in the same output (lead 229: three visible cures cost three four-minute rounds). The selection is now
// every match in table order — most specific first, exactly the order the table is written in — with each
// distinct command run once, because two denials that the same command answers are one cure, not two.
export interface CureRow { name: string; when: RegExp; cmd: string; because: string }

/** curesFor(out, table) → every cure whose signature the output carries, table order, one per distinct command */
export function curesFor<C extends CureRow>(out: string, table: readonly C[]): C[] {
  const hit = table.filter((c) => c.when.test(out))
  return hit.filter((c, i) => hit.findIndex((d) => d.cmd === c.cmd) === i)
}
