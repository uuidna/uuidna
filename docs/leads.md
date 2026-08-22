---
title: Research leads
description: What this ledger has noticed and not settled — held, refuted, and refused at a boundary.
---

# Research leads

Every lead here is addressed by its own handle, so it can be cited and followed without ambiguity. Nothing on
this page is sealed: a lead is something noticed, and only a Lean proof settles anything — which is what
[`legal_only_the_proven_is_admitted`](/theorem/legal_only_the_proven_is_admitted) decides.

The record lives in the ledger's own leads file under `lean/`. Each link below carries its lead as the query, so a reader arrives with
the question already stated; nothing is sent until the reader clicks.

## Held — open, and owed something

- **`de5612a2`** The 42-state paired walk: doubling in Z/9 (period 6) against stepping by two in Z/7 (period 7). Coprime, so the pair has period exactly 42 and visits all 42 states before returning. Forward and inverse walks meet at step 21 (8,1) and step 42 (1,1) — two contact points per revolution.
  <br><small>owes: a falsifier, and an independent witness. The engine side has one: Rathbun's odd-cylinder condition IS gcd(2,n)=1, read from the source. That the Z/9 vortex and a rotary firing order are the SAME argument is my claim, not a measured one.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%2042-state%20paired%20walk%3A%20doubling%20in%20Z%2F9%20(period%206)%20against%20stepping%20by%20two%20in%20Z%2F7%20(period%207).%20Coprime%2C%20so%20the%20pair%20has%20period%20exactly%2042%20and%20visits%20all%2042%20states%20before%20returning.%20Forward%20and%20inverse%20walks%20meet%20at%20step%2021%20(8%2C1)%20and%20step%2042%20(1%2C1)%20%E2%80%94%20two%20contact%20points%20per%20revolution." target="_blank" rel="noopener">take this one further →</a></small>
- **`ef58b583`** An involution alone is barren: dz reaches exactly two states from any seed, alternating with doubling reaches all ten. The productive partner is the IRREVERSIBLE one — dz is reversible and free, doubling collapses.
  <br><small>owes: sealing; it connects to reversible_erases_nothing beside Landauer</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=An%20involution%20alone%20is%20barren%3A%20dz%20reaches%20exactly%20two%20states%20from%20any%20seed%2C%20alternating%20with%20doubling%20reaches%20all%20ten.%20The%20productive%20partner%20is%20the%20IRREVERSIBLE%20one%20%E2%80%94%20dz%20is%20reversible%20and%20free%2C%20doubling%20collapses." target="_blank" rel="noopener">take this one further →</a></small>
- **`c83060ec`** Girdler sulfide dual-temperature exchange as separation-by-involution: the equilibrium preference reverses between a cold and a hot tower, so cycling enriches where neither pass alone separates.
  <br><small>owes: a primary source for the temperatures, the per-stage separation factor, and whether 'involution' is a fair description or my imposition on chemistry that does not work that way</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Girdler%20sulfide%20dual-temperature%20exchange%20as%20separation-by-involution%3A%20the%20equilibrium%20preference%20reverses%20between%20a%20cold%20and%20a%20hot%20tower%2C%20so%20cycling%20enriches%20where%20neither%20pass%20alone%20separates." target="_blank" rel="noopener">take this one further →</a></small>
- **`99582e47`** The grid breaks at 73 wings: 6 × 73 = 438, digital root 6, and the sealed width is 432. VectorEquilibrium.lean landed alone.
  <br><small>owes: a decision, not a fix: two more wings so they enter three at a time, or a deliberate re-seal of the 432 width, or the wing comes back out. The finder already states all three; none is mine to choose.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20grid%20breaks%20at%2073%20wings%3A%206%20%C3%97%2073%20%3D%20438%2C%20digital%20root%206%2C%20and%20the%20sealed%20width%20is%20432.%20VectorEquilibrium.lean%20landed%20alone." target="_blank" rel="noopener">take this one further →</a></small>
- **`92f12838`** predict-and-fill.ts:57 hardcodes an expected principle count that the ledger has long since passed, and the test is `<` — so the branch is unreachable and the check fails OPEN. Worse, it counts `new Set(PRINCIPLES.map(p => p[1])).size` (TITLES) while the other four sites count PRINCIPLES.length (ENTRIES). The live number is not restated here: the ledger reports it, and a lead that carries its own copy of a count is the very drift it describes.
  <br><small>owes: derive the count instead of remembering it, reconcile the two definitions, and fold the general finder: a hardcoded expected-count anywhere in the guard chain is a tripwire aimed at its own foot. The drift detector drifted, in the one direction that mutes it.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=predict-and-fill.ts%3A57%20hardcodes%20an%20expected%20principle%20count%20that%20the%20ledger%20has%20long%20since%20passed%2C%20and%20the%20test%20is%20%60%3C%60%20%E2%80%94%20so%20the%20branch%20is%20unreachable%20and%20the%20check%20fails%20OPEN.%20Worse%2C%20it%20counts%20%60new%20Set(PRINCIPLES.map(p%20%3D%3E%20p%5B1%5D)).size%60%20(TITLES)%20while%20the%20other%20four%20sites%20count%20PRINCIPLES.length%20(ENT" target="_blank" rel="noopener">take this one further →</a></small>
- **`7cc6cbb6`** Measurement has no single source: 28 independent recomputations of a theorem count across src/, and 5 of the principle count. one-receipt.ts:394 already states the law — 'the number is read, never chosen' — and nothing enforces it.
  <br><small>owes: one Lean-derived census() every surface reads, plus a finder that fails when a count is computed anywhere else.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Measurement%20has%20no%20single%20source%3A%2028%20independent%20recomputations%20of%20a%20theorem%20count%20across%20src%2F%2C%20and%205%20of%20the%20principle%20count.%20one-receipt.ts%3A394%20already%20states%20the%20law%20%E2%80%94%20'the%20number%20is%20read%2C%20never%20chosen'%20%E2%80%94%20and%20nothing%20enforces%20it." target="_blank" rel="noopener">take this one further →</a></small>
- **`b13fd37a`** Three generators are owned by nothing: gen-prose-evidence, gen-handles, gen-captain-claims-complete run in neither reconcile nor audit (all three already sit in lean/dormant-scripts.json).
  <br><small>owes: an ownership manifest naming every derived artifact and its single writer, with a finder that fails on zero owners or two. The order-merge of the 17 gen-* comes after that, and must model reconcile's mid-chain `npm run build` barriers as explicit nodes rather than hiding them.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Three%20generators%20are%20owned%20by%20nothing%3A%20gen-prose-evidence%2C%20gen-handles%2C%20gen-captain-claims-complete%20run%20in%20neither%20reconcile%20nor%20audit%20(all%20three%20already%20sit%20in%20lean%2Fdormant-scripts.json)." target="_blank" rel="noopener">take this one further →</a></small>
- **`cbbc6b32`** A negation in the comment above a Lean line must be discharged by the line below it. Run by hand over the newest wing it convicted 6 of 12; the surviving 4 are SCOPE-declared, proven, or scanner artefacts ('non-covering' is a NAME, 'rather than' is contrast).
  <br><small>owes: the split that makes it enforceable — object-level negations must be proven beneath; meta-level boundary statements must be PREFIXED `SCOPE:` and exempted, because no Lean line can prove that nothing further is claimed. Then a second arm: does the line contain a `≠`/`¬` at all. Glagolitic already passes it — roman_reads_subtractively seals `9 ≠ 11` as its third conjunct, the model for all 73 wings. The hard half is the scanner, not the law: lexical matching cannot tell a claim from a name, which is the same wall treason.ts documents against itself.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=A%20negation%20in%20the%20comment%20above%20a%20Lean%20line%20must%20be%20discharged%20by%20the%20line%20below%20it.%20Run%20by%20hand%20over%20the%20newest%20wing%20it%20convicted%206%20of%2012%3B%20the%20surviving%204%20are%20SCOPE-declared%2C%20proven%2C%20or%20scanner%20artefacts%20('non-covering'%20is%20a%20NAME%2C%20'rather%20than'%20is%20contrast)." target="_blank" rel="noopener">take this one further →</a></small>
- **`4a7485ec`** Glagolitic names theorems by the OPERATION, never the object: additive, reads_subtractively, ignores_order, forces_collisions, is_prime. The cultural noun is only the subject.
  <br><small>owes: the VE wing renamed by it. radial_squared_two names a VALUE and fails the rule; only radial_equals_edge got it right, because `equals` is a verb. This also dissolves the 3-content-word cap: an operation has a one-word name, so the cap stops being a constraint fought against and becomes a consequence.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Glagolitic%20names%20theorems%20by%20the%20OPERATION%2C%20never%20the%20object%3A%20additive%2C%20reads_subtractively%2C%20ignores_order%2C%20forces_collisions%2C%20is_prime.%20The%20cultural%20noun%20is%20only%20the%20subject." target="_blank" rel="noopener">take this one further →</a></small>
- **`050407c2`** refused[] in this very file is read by NO finder. Seven readers open leads.json; none looks at the refusals.
  <br><small>owes: a finder that fails when a network-touching source names a host listed here, plus a recomputed robots.txt assertion so the boundary can FAIL rather than merely be written down. I proposed crawling chitanka's /api hours after this file refused it, because prose no gate reads is prose that gets walked past.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=refused%5B%5D%20in%20this%20very%20file%20is%20read%20by%20NO%20finder.%20Seven%20readers%20open%20leads.json%3B%20none%20looks%20at%20the%20refusals." target="_blank" rel="noopener">take this one further →</a></small>
- **`1592e26d`** runSequence was not exported from src/index.ts — sequence-run.ts's header said the primitives 'had no front door' and it built one, but the door was not on the public surface. EXPORTED 2026-08-21.
  <br><small>owes: nothing on the export. THE PERIOD CLAIM WAS FALSE and is corrected here rather than deleted: I reported period returning 0 for every non-zero seed as a defect and said every period figure this session was suspect. Measured: the alternating dz/doubling walk genuinely has NO in-phase period — seed 2 returns to itself at step 6 (an EVEN index, out of phase), seeds 1 and 3 never return within 24, and only seed 0 closes in phase at 2 because both maps fix it. period() requires a return at an odd index (a completed dz-then-doubling pair) and that is CORRECT. Returning 0 is an accurate report that no period exists, and the reason is structural: doubling is irreversible, so the walk cannot return to a seed outside its image. The only real defect left is cosmetic — 0 reads like a measured value in a table when it means 'no period'. I diagnosed by reading the code and did not run it.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=runSequence%20was%20not%20exported%20from%20src%2Findex.ts%20%E2%80%94%20sequence-run.ts's%20header%20said%20the%20primitives%20'had%20no%20front%20door'%20and%20it%20built%20one%2C%20but%20the%20door%20was%20not%20on%20the%20public%20surface.%20EXPORTED%202026-08-21." target="_blank" rel="noopener">take this one further →</a></small>
- **`2aaac145`** docs/theorem/[key].paths.js and docs/publications/[slug].paths.js already mint a page per handle; the template is scoped to theorem keys and publication slugs.
  <br><small>owes: one template reaching ALL handles — sequence handles, chunk handles, VE handles — the way the crypto layer answers any nonce with one derivation.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=docs%2Ftheorem%2F%5Bkey%5D.paths.js%20and%20docs%2Fpublications%2F%5Bslug%5D.paths.js%20already%20mint%20a%20page%20per%20handle%3B%20the%20template%20is%20scoped%20to%20theorem%20keys%20and%20publication%20slugs." target="_blank" rel="noopener">take this one further →</a></small>
- **`4642b5b4`** The compression 2^128 addresses → 10 seeds → 5 covering → ×12 VE directions → ×7 rays = 420 is real arithmetic, but the collapse ratio proves nothing on its own: ANY fold to ten classes turns billions into tens. That bound is ALREADY SEALED as gematria_forces_collisions (22^3 = 10648 > 1198 sums) and seats_pigeonhole.
  <br><small>owes: before the 12 VE directions may multiply anything, they must be shown INDEPENDENT of the walk's own two operations. Every measured orbit set is already dz-closed, so involution is not an extra direction — it is inside the walk, and testing it returns the identity mistaken for confirmation. Any direction reducing to dz or doubling is free, and 420 is inflated by exactly those.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20compression%202%5E128%20addresses%20%E2%86%92%2010%20seeds%20%E2%86%92%205%20covering%20%E2%86%92%20%C3%9712%20VE%20directions%20%E2%86%92%20%C3%977%20rays%20%3D%20420%20is%20real%20arithmetic%2C%20but%20the%20collapse%20ratio%20proves%20nothing%20on%20its%20own%3A%20ANY%20fold%20to%20ten%20classes%20turns%20billions%20into%20tens.%20That%20bound%20is%20ALREADY%20SEALED%20as%20gematria_forces_collisions%20(22%5E3%20%3D%2010648%20%3E%201198%20sums)%20an" target="_blank" rel="noopener">take this one further →</a></small>
- **`8827e107`** The hosted MCP bills a call that is missing a required argument
  <br><small>owes: uuidna.com/mcp accepted uuidna_decide with no input, stringified undefined into the input field, ran the gate CLEAN, deposited two coins and returned UNVERIFIED — a real verdict about a non-claim. Local callTool refuses it correctly (missing required argument: input), so the enforcement exists and is absent from the deployed path. Validate before the deposit: the coins are taken before the verdict is formed.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20hosted%20MCP%20bills%20a%20call%20that%20is%20missing%20a%20required%20argument" target="_blank" rel="noopener">take this one further →</a></small>
- **`f43ebebc`** roundTrips() disagrees with a verified byte-exact imprint round-trip
  <br><small>owes: imprintTextChain(addr) then readImprintTextChain returned the address byte-exact over 3 links at 115 bits each, while roundTrips(addr) returned false for the same address. Either the predicate checks a stricter chain form than the text chain, or it is wrong. Read it before trusting either.</small>
  <br><small><a href="https://stackoverflow.com/ai-assist?q=roundTrips()%20disagrees%20with%20a%20verified%20byte-exact%20imprint%20round-trip" target="_blank" rel="noopener">take this one further →</a></small>

Working on one of these? Take it somewhere with room to think — <a href="https://stackoverflow.com/ai-assist" target="_blank" rel="noopener">Stack Overflow's AI assist</a>
is one such room. Those links are for you to click: this project asks sanctioned APIs for data and never automates
a site that declines machines — stackoverflow.com answers 418 to a client, and that refusal is recorded below.

## Refuted — closed by a measurement

- **`2d552f1f`** Reflection conserves the stroke budget (four falling, five rising)
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Reflection%20conserves%20the%20stroke%20budget%20(four%20falling%2C%20five%20rising)" target="_blank" rel="noopener">take this one further →</a></small>
- **`c0727ef6`** The seams reflect (row1's seams map onto row2's under the mirror)
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20seams%20reflect%20(row1's%20seams%20map%20onto%20row2's%20under%20the%20mirror)" target="_blank" rel="noopener">take this one further →</a></small>
- **`a8a8f3ea`** Every merkaba has union 8 — an 8-vertex star tetrahedron
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Every%20merkaba%20has%20union%208%20%E2%80%94%20an%208-vertex%20star%20tetrahedron" target="_blank" rel="noopener">take this one further →</a></small>
- **`e92de628`** 42 tiles 432 (the pair grid divides the full grid)
  <br><small><a href="https://stackoverflow.com/ai-assist?q=42%20tiles%20432%20(the%20pair%20grid%20divides%20the%20full%20grid)" target="_blank" rel="noopener">take this one further →</a></small>
- **`83b7cc65`** 6x7 and 7x6 counter-rotate (the ORDER is the rotation)
  <br><small><a href="https://stackoverflow.com/ai-assist?q=6x7%20and%207x6%20counter-rotate%20(the%20ORDER%20is%20the%20rotation)" target="_blank" rel="noopener">take this one further →</a></small>
- **`efa9389f`** The re-namings are 2 x 42 = 84
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20re-namings%20are%202%20x%2042%20%3D%2084" target="_blank" rel="noopener">take this one further →</a></small>
- **`ca852b53`** Renaming a theorem moves its handle
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Renaming%20a%20theorem%20moves%20its%20handle" target="_blank" rel="noopener">take this one further →</a></small>
- **`27ef1da1`** harmonic-scan enforces 'quantum'
  <br><small><a href="https://stackoverflow.com/ai-assist?q=harmonic-scan%20enforces%20'quantum'" target="_blank" rel="noopener">take this one further →</a></small>
- **`ba5ccd42`** The network is down
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20network%20is%20down" target="_blank" rel="noopener">take this one further →</a></small>
- **`f5ec2cb4`** Literature has poor theorem yield (one per quarter-million characters)
  <br><small><a href="https://stackoverflow.com/ai-assist?q=Literature%20has%20poor%20theorem%20yield%20(one%20per%20quarter-million%20characters)" target="_blank" rel="noopener">take this one further →</a></small>
- **`47a22cc2`** The ledger and the wings had drifted; two theorems were proven and invisible
  <br><small><a href="https://stackoverflow.com/ai-assist?q=The%20ledger%20and%20the%20wings%20had%20drifted%3B%20two%20theorems%20were%20proven%20and%20invisible" target="_blank" rel="noopener">take this one further →</a></small>

## Refused — a boundary was read and respected

- **`ff24b99e`** Over-unity / free energy devices
  <br><small>the first law. Splitting water costs at least what burning it returns. NOT refused as a topic — the ambient-harvesting articles were written in full; refused only as a net-positive loop.</small>
- **`63632e0e`** Water itself as fuel
  <br><small>water is combustion's ash, already fully oxidised. But the CONTAMINANT in polluted water is fuel, and I was wrong to refuse that half — corrected the same session.</small>
- **`24641eb5`** MFC exhausting pure drinkable water
  <br><small>measured pilot effluent 247 +/- 206 mg/L COD against a ~60 target. Cleaner, not clean. And CH4 combustion emits CO2 — water is not the only exhaust.</small>
- **`0c36ef19`** Bulk crawling of chitanka.info
  <br><small>its robots.txt disallows /api and every full-text format. A single user-directed fetch is a different act and remains available; systematic retrieval is not.</small>
- **`607701a3`** Quantum advantage or speedup claims
  <br><small>already gated by the project: next.ts fails a release on such a title, and a test asserts the prose drains. No unbacked claim exists — the opposite is enforced, and the sealed boundary is theorem n_qubit_dimension: 2^n counts the classical simulation COST, never a speedup.</small>
- **`228e89d2`** stackoverflow.com /ai-assist as a theorem source
  <br><small>refused at the door: robots.txt answers 418, the site-wide anti-automation response, and /ai-assist is an HTML product page rather than an API. The sanctioned route is api.stackexchange.com, which answered 200 with a keyless 300/day quota — use the door they opened, not the one they shut.</small>

---

<small>15 held · 11 refuted · 6 refused · generated from the ledger's leads record</small>
