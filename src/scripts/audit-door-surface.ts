#!/usr/bin/env node
// @non-harmonic: asks the live MCP door over the network — the declared boundary, like claim-unclaimed and
// gen-alpine-apps. Never imported by the core, never run inside guard.
//
// audit-door-surface — WHAT THE LIVE DOOR ACTUALLY SERVES, AGAINST WHAT dist DECLARES, as leads rather than prose.
//
// MEASURED BY HAND on 2026-09-26 and then folded here, because a measurement I typed into a commit message is a
// measurement no later run can repeat. Three facts came out of one session's frictions:
//
//   · THE CATALOGUE IS A STRICT SUBSET. The live site served 234 contracts where dist declares 248, with nothing
//     hosted that dist lacks. A client reads the live list, finds a door missing, and has no way to learn whether it
//     was withdrawn or simply has not shipped — "the live site carries what its last ship carried" is a fact about
//     this tree that nothing in the tree measured.
//
//   · A NAME CAN CARRY TWO CONTRACTS. list_tools {name:'run_trial'} answers handle d3ceee92 on the live site, taking
//     a REQUIRED `statement` and returning a verdict; in dist the same name is handle 3b6043d2, taking nothing and
//     returning the whole-ledger census. A client that reads one contract and calls the other gets a different tool,
//     and the handle is the tree's own content address of the contract, so the disagreement needs no schema diffing.
//
//   · A CONTRACT THAT AGREES IS NOT A DOOR THAT ANSWERS. Everything above compares what the two surfaces SAY.
//     Nothing called a door to find out whether it replies, and the two are not the same measurement: of 21
//     zero-argument doors asked on 2026-09-28, 12 refused. Eleven of those are get_*/list_* reads, so the
//     persistence bar below cannot be theirs, and their refusal and the writers' refusal wear one message.
//     The suite cannot see any of it — package.json runs it with --max-old-space-size=8192 against an edge that
//     has 128 MB, so every one of those doors answers under node and refuses in production.
//
//   · A REFUSAL CAN NAME THE WRONG BAR, which is the one that cost the most. The hosted trial and claim doors refuse
//     EVERY call — measured with a trivial `2 + 2 = 4`, so it is not the input — with "the edge does not hold the
//     whole ledger: 40 MB of rows does not fit a 128 MB isolate". That sentence is true of the rows and is not why
//     those doors cannot work there: they write, and the edge has no filesystem. A plausible wrong reason is worse
//     than none, because it sends the reader to measure memory when the bar is persistence. It sent me there.
//
// WHAT THIS IS NOT. It does not decide that any of the three is a defect. Each is filed as a LEAD in the shape
// lean/leads.json uses, exactly as axiom-hunt files an exposed axiom, and a lead leaves the record only by a verdict.
// Nor does it write lean/leads.json: no writer in this tree appends a row there, and a hand edit is refused by law.
//
// AND IT WRITES ON EVERY RUN, EMPTY INCLUDED, for the reason axiom-hunt states one level down: an absent file and an
// empty set are different facts, and a surface that renders them alike is the defect the whole instrument exists to
// catch. A run that could not reach the network says so and claims nothing — the absence of a measurement is never a
// measurement of absence.
//
// WIRED INTO `npm run outward`, beside audit-doi-harvest and release-live, because those are this tree's other network
// audits and a finder no chain runs is not folded — it is a script that happened to be written. The dormancy finder
// caught exactly that on this file's first landing: built, reachable, run by nobody. It does NOT go into guard: guard
// is the fast pre-flight and must not reach the network, and the `outward` family is where a measurement that needs
// the live site already lives. Each run walks a bounded sample (UUIDNA_DOOR_SAMPLE, default 24) and says how much of
// the surface it covered, so the routine run is a handful of calls and a full comparison is asked for explicitly.
import { wrArtifact } from '../artifact.js'

const HOST = 'https://uuidna.com/mcp'
const SAMPLE = Number(process.env.UUIDNA_DOOR_SAMPLE ?? 24)

interface Contract { name?: string; handle?: string; inputSchema?: { properties?: Record<string, unknown>; required?: string[] } }

const post = async (body: unknown): Promise<{ result?: { content?: { type?: string; text?: string }[]; structuredContent?: unknown }; error?: { message?: string } }> => {
  const r = await fetch(HOST, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify(body),
  })
  const t = await r.text()
  // the Streamable-HTTP event stream and a plain JSON body are both replies; the last data: line is the answer
  const b = /^\s*(event|data):/.test(t) ? (t.split('\n').filter((l) => l.startsWith('data:')).pop() ?? '').slice(5) : t
  return JSON.parse(b) as ReturnType<typeof post> extends Promise<infer R> ? R : never
}

const call = async (name: string, args: Record<string, unknown>): Promise<unknown> => {
  const rep = await post({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } })
  if (rep.error) throw new Error(rep.error.message ?? 'rpc error')
  const txt = (rep.result?.content ?? []).filter((c) => c.type === 'text').map((c) => c.text ?? '')[0]
  if (rep.result?.structuredContent !== undefined) return rep.result.structuredContent
  if (!txt) return undefined
  /*
   * A door may serve HTTP 200 with a result whose text is a plain error sentence rather than JSON. Parsing that
   * blindly threw, and the thrown message was the PARSER's — "Unexpected token 'e'" — so two doors were filed
   * under a complaint of ours instead of their own reason. The raw text is returned so the caller reads what
   * the door actually said.
   */
  try {
    return JSON.parse(txt)
  } catch {
    return txt
  }
}

const rowsOf = (v: unknown): Contract[] =>
  Array.isArray(v) ? v as Contract[] : ((v as { tools?: Contract[] })?.tools ?? [])

interface Lead { lead: string; status: string; owes: string }
const leads: Lead[] = []
let unmeasured: string | undefined

try {
  const { callTool } = await import('../mcp.js')
  const mine = rowsOf(callTool('list_tools', {}))
  const live = rowsOf(await call('list_tools', {}))
  const mineNames = new Set(mine.map((t) => t.name ?? '').filter(Boolean))
  const liveNames = new Set(live.map((t) => t.name ?? '').filter(Boolean))
  const absent = [...mineNames].filter((n) => !liveNames.has(n)).sort()
  const extra = [...liveNames].filter((n) => !mineNames.has(n)).sort()

  if (absent.length || extra.length) {
    leads.push({
      lead: `The live door surface is not the one dist declares: ${liveNames.size} contract(s) served against ${mineNames.size} declared`
        + `${absent.length ? `, ${absent.length} declared and not served (${absent.join(', ')})` : ''}`
        + `${extra.length ? `, ${extra.length} served and not declared (${extra.join(', ')})` : ''}`
        + '. A client reading the live list cannot tell a withdrawn door from one that has not shipped, because neither surface says which.',
      status: 'open',
      owes: 'a verdict on whether the difference is the expected ship lag or a door lost in a deploy — the counts alone cannot tell those apart, and nothing in the tree measured them before this run',
    })
  }

  // THE CONTRACT HANDLES, SAMPLED AND SAID TO BE SAMPLED. A handle comes only with list_tools {name}, so a full
  // comparison is one network call per door; this walks a bounded prefix and REPORTS ITS COVERAGE, because a partial
  // walk reported as a whole one is the false green this tree refuses everywhere. Raise UUIDNA_DOOR_SAMPLE to widen.
  const shared = [...liveNames].filter((n) => mineNames.has(n)).sort()
  const walk = shared.slice(0, SAMPLE)
  const drift: string[] = []
  let compared = 0
  for (const name of walk) {
    try {
      const there = (await call('list_tools', { name })) as Contract
      const here = callTool('list_tools', { name }) as Contract
      if (!there?.handle || !here?.handle) continue
      compared++
      if (there.handle !== here.handle) drift.push(`${name} (live ${there.handle} ≠ dist ${here.handle})`)
    } catch { /* one door's contract read failing is not evidence about the others; coverage below says so */ }
  }
  if (drift.length) {
    leads.push({
      lead: `One name, two contracts: ${drift.length} of ${compared} compared door(s) answer a different contract handle on the live site than in dist — ${drift.join('; ')}.`
        + ' The handle is this tree\'s own content address of the contract, so the disagreement is measured rather than diffed, and a client reading one contract and calling the other reaches a different tool.',
      status: 'open',
      owes: 'a verdict on whether a shared name may carry two contracts at all; if it may not, the live catalogue owes the reader the version it is serving',
    })
  }

  /*
   * DOES IT ANSWER. Everything above compares what the two surfaces SAY. Nothing called a door to find out
   * whether it replies, and a contract that agrees is not a door that answers — only the second is what a
   * client gets.
   *
   * ONLY DOORS THAT REQUIRE NOTHING, AND THE REQUIREMENT IS READ FROM DIST BECAUSE THE LIVE LISTING DECLINES
   * TO CARRY IT: `list_tools {}` projects name, title and description and no inputSchema, by construction of
   * that door. A first version filtered on the live rows anyway, so the filter was true of all 234, thirty
   * doors were asked indiscriminately, and `compute_sha256` complaining about a missing `text` was counted as
   * a refusal — "27 of 30 did not answer" measured the filter. dist carries the schema, so it is asked there
   * first and the live door is only called when its own contract requires nothing.
   *
   * A door may also answer with an error in its result text rather than an rpc error, so that is caught too:
   * answering is not the same as answering with data, which is the bar the journals port already states.
   *
   * Refusals are grouped by message, because two doors refusing for one reason is one fact — and the grouping
   * is the thing worth having: one sentence names ONE bar, so when doors doing different work share it, it is
   * at most half an explanation, and the half that is wrong sends the reader to measure the wrong thing. That
   * is the cost this file's own header records paying. No cause is assigned here; this file files leads.
   */
  const refused = new Map<string, string[]>()
  let askable = 0
  let answered = 0
  for (const name of walk) {
    let required: string[] | undefined
    try {
      const here = callTool('list_tools', { name }) as { inputSchema?: { required?: string[] } }
      required = here?.inputSchema?.required
    } catch { continue }
    // Absent `required` in dist means the contract truly asks for nothing; a
    // non-empty one means any refusal would be ours, so the door is not asked.
    if (required && required.length > 0) continue
    askable++
    try {
      const answer = await call(name, {})
      const text = typeof answer === 'string' ? answer : ''
      if (text.startsWith('error:')) refused.set(text, [...(refused.get(text) ?? []), name])
      else answered++
    } catch (e) {
      const why = e instanceof Error ? e.message : String(e)
      refused.set(why, [...(refused.get(why) ?? []), name])
    }
  }

  if (refused.size > 0) {
    const grouped = [...refused.entries()]
      .map(([why, names]) => `${names.length} door(s) [${names.join(', ')}] answer: ${why.slice(0, 260)}`)
      .join(' || ')
    leads.push({
      lead: `${askable - answered} of ${askable} door(s) that require no argument did not answer. ${grouped}.`
        + ' A contract that agrees is not a door that replies, and nothing in this tree asked the second question before this run.'
        + ' Where one message is shared by doors that write and doors that only read, it cannot be true of both.',
      status: 'open',
      owes: 'a verdict per GROUP rather than per door: a refusal shared by reads and writes names at most one of their two bars, and whichever half is wrong sends the reader to measure the wrong thing',
    })
  }

  leads.push({
    lead: `Reach of this run: ${answered} of ${askable} door(s) requiring no argument answered, within the ${walk.length} walked (sample ${SAMPLE} of ${shared.length} shared).`
      + ' Doors whose contract requires an argument were not asked, because a refusal we caused is not a measurement of the door.',
    status: askable > 0 && answered >= askable ? 'closed' : 'open',
    owes: askable === 0
      ? 'a wider walk — this run asked nothing, and nothing is not agreement'
      : answered >= askable ? 'nothing — every door asked answered' : 'a wider walk (UUIDNA_DOOR_SAMPLE) before any claim that the surface answers',
  })

  leads.push({
    lead: `Coverage of this run: ${compared} of ${shared.length} shared door(s) had both contracts read (sample ${SAMPLE}).`
      + ` ${shared.length - compared} were not compared and are therefore UNMEASURED, never agreeing.`,
    status: compared >= shared.length ? 'closed' : 'open',
    owes: compared >= shared.length ? 'nothing — every shared door was compared' : 'a wider walk (UUIDNA_DOOR_SAMPLE) before any claim about the surface as a whole',
  })
} catch (e) {
  unmeasured = `the live door could not be read (${e instanceof Error ? e.message : String(e)}), so NOTHING here is a measurement of the surface — an unreachable door and an identical door are different facts`
}

const out = {
  why: 'What the live MCP door serves, against what dist declares. Each row is a LEAD in the shape lean/leads.json uses'
    + ' — filed, never settled here, because a lead leaves the record only by a verdict. Written by'
    + ' src/scripts/audit-door-surface.ts on every run, EMPTY INCLUDED: an absent file and an empty set are different'
    + ' facts. A run that could not reach the network states that instead of reporting agreement.',
  host: HOST,
  ...(unmeasured ? { unmeasured } : {}),
  open: leads.filter((l) => l.status === 'open').length,
  held: leads,
}
wrArtifact('lean/door-surface.json', out)

console.log(`audit-door-surface — ${leads.length} row(s), ${out.open} open → lean/door-surface.json${unmeasured ? ' (UNMEASURED: ' + unmeasured + ')' : ''}`)
for (const l of leads) console.log(`  · [${l.status}] ${l.lead.slice(0, 160)}`)
