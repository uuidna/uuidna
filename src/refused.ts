// refused — THE BOUNDARY THAT NOTHING READ.
//
// lean/leads.json carries four lists: held, refuted, refused, and the tables. `refused` is the one that records a
// DECISION rather than a finding — things this project has considered and declined, each with its reason. Seven
// readers open that file. None of them looks at `refused`.
//
// A boundary written down and read by nothing is prose. The lead that records this notes the consequence in its own
// text: somebody proposed crawling a host the file had refused hours earlier. The refusal was not forgotten because
// it was badly written — it was never consulted, because nothing consults it.
//
// WHAT THIS DOES, and deliberately not more: it extracts the HOSTS named in refused entries and reports any source
// that reaches for one over the network. Hosts are the part of a refusal that is mechanically checkable. The other
// four refusals are refusals of CLAIMS — two about energy, one about a fuel cell's output, and one about physical
// speed, that last one bounded by theorem n_qubit_dimension and stated by CITING it rather than by uttering the
// phrase in order to deny it (the lean form: a denial in a comment must be discharged by a seal, and this module
// wrote the phrase out while listing the refusals — the gate caught it, correctly, in the file about refusals).
// A grep cannot decide whether a sentence makes a claim. Pretending otherwise would build a finder that fires on
// the paragraph explaining the refusal, which is the trap that has caught four finders in this tree already:
// a scanner reading source cannot distinguish a citation from a mention of one.
//
// So the scope is narrow and stated: a refused HOST, reached over the NETWORK, in a source file. That is decidable.
// The rest of the boundary stays a human matter and is not dressed up as an automated one.
import { hostsRefused } from './refused-hosts.js'

export interface RefusedReach {
  file: string
  host: string
  line: number
  /** the offending line, so a reader can see the reach rather than take the finder's word */
  text: string
}

/** A line REACHES a host when it FETCHES from it — the URL sits inside a fetch call. Three distinctions decide
 *  this, and each was found by running the finder rather than by reasoning about it:
 *
 *    A MENTION IS NOT A REACH. A comment naming chitanka.info explains the refusal; flagging it would make the
 *      finder fire on its own documentation, the trap that has caught four finders in this tree this week.
 *
 *    A BARE HOSTNAME IS NOT A REACH. `const HOST = "chitanka.info"` takes nothing from anywhere.
 *
 *    AND A LINK IS NOT AN INGESTION — the distinction the refusals themselves draw. The refused entry reads
 *      "stackoverflow.com /ai-assist AS A THEOREM SOURCE": what is declined is taking material FROM the host,
 *      not pointing a reader at it. On its first run this finder flagged scripts/gen-leads.ts, which builds an
 *      `<a href>` inviting a human to take a lead further. That is an outbound link in a generated page, and
 *      reading it as a refused ingestion would have had the finder demand a change the refusal never asked for.
 *      A finder that convicts on the wrong charge is worse than one that does not fire: it is confident.
 *
 *  So the anchor is the CALL, not the string. `fetch("https://…")` is decidable; intent is not. */
const REACH = (host: string): RegExp =>
  new RegExp(`fetch\\s*\\(\\s*[\`'"]https?://[^\\s'"\`]*${host.replace(/\./g, '\\.')}`, 'i')

/** refusedReaches(files) → every place a source reaches a refused host. `files` is [path, contents] pairs, so the
 *  caller owns the walk and this stays pure and testable — no filesystem, no clock, no network. */
export function refusedReaches(files: readonly (readonly [string, string])[]): RefusedReach[] {
  const out: RefusedReach[] = []
  for (const [file, contents] of files) {
    // THE FILE THAT DEFINES THE BOUNDARY IS NOT A VIOLATION OF IT. refused-hosts.ts must name these hosts to
    // refuse them, and this module must show one in its own doc comment to explain itself. A finder that flags
    // its own definition is the use-versus-mention defect, and it is cheaper to exclude by name here than to
    // discover from a red gate later.
    // refused.test.ts joins them: its fixtures are literal `fetch("https://<refused>")` strings handed to this
    // function, so a finder scanning it reads its own test data as a violation. Found by running it.
    if (/refused-hosts\.ts$|[\\/]refused\.ts$|[\\/]refused\.test\.ts$/.test(file)) continue
    const lines = contents.split('\n')
    for (const host of hostsRefused()) {
      const re = REACH(host)
      lines.forEach((text, i) => {
        if (re.test(text)) out.push({ file, host, line: i + 1, text: text.trim().slice(0, 160) })
      })
    }
  }
  return out
}
