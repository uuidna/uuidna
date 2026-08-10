// The prose honesty gate — a text computes TRUE iff it makes no unqualified claim that (a) the Millennium
// problems are proven/solved, or (b) it breaks physics/hardware/crypto limits. HONEST ABOUT ITSELF: this is
// a lexical TRIPWIRE, not comprehension. Passing means "matches no known red-flag shape" — NOT "true".
// Necessary, not sufficient. Bounded refusals ("this is NOT faster than light") pass by the negation guard.

// RED is the negation-BLIND floor — matches that carry their own imbalance and cannot be reprieved. A bare
// "proven" is NOT here: it has two-sided gravity ("we have proven X" boasts, "X is not proven; it remains
// open" is the floor), so it moved to the negation-AWARE OVERREACH where the floor can change the verdict.
export const RED = /\bwe prove\b|confidence\s*=?\s*1\.0|ready for peer review|sealed via universal|cannot be (hacked|broken|cracked|defeated)|(no ?one|nobody) can (break|crack|hack|beat|defeat)/i

// HARD IN ALL 7 — the same "we prove / proven" tripwire, in the seven locales' languages, so a translated
// overclaim cannot hide from an English-only gate. Targets the ASSERTION forms only, never the honest
// "proof of concept" nouns present in localized descriptions. Negation-blind, like RED.
export const RED_INTL = /wir haben bewiesen|bewiesen|nous avons prouv|prouvée?s?|démontrée?s?|hemos demostrado|demostrad[oa]s?|мы доказали|доказан[оаи]|доказали|доказахме|已证明|我们证明了|证明了|abbiamo dimostrato|dimostrat[oi]|demonstrámos|provámos|証明した|証明しました|أثبتنا|برهنّا|सिद्ध कर|udowodni\w*|wij hebben bewezen|bewezen|증명했|증명됨|증명된|kanıtladık|kanıtlan\w*|ispatladık|αποδείξαμε|αποδεδειγμ\w*|הוכחנו|מוכח|vi har bevisat|bevisa[dt]|membuktikan|dibuktikan|terbukti|đã chứng minh|được chứng minh|am demonstrat|dovedit\w*/i

// Named problems PLUS the gravity binding: "all six/seven problems|proofs|conjectures|hypotheses" gravitates
// to the disputed cluster even with no problem NAMED. Requires a problem WORD, so "the six units" / "all seven
// streams" stay clear.
const PROBLEM = '(clay|millennium|riemann|hodge|poincar[eé]|navier[- ]?stokes|yang[- ]?mills|birch|swinnerton|p ?vs\\.? ?np|p versus np|p ?= ?np|all (six|seven|6|7) [^.]{0,12}?(problems?|proofs?|conjectures?|hypoth\\w+|puzzles?))'
const CLAIM = '(prov(e|es|ed|en|ing)|proofs? of|solv(e|es|ed|ing))'
const CRYPTO = '(rsa|aes|ecdsa|sha-?\\d+|discrete log(arithm)?|encryption|crypto\\w*)'
const BREAK = '(factor(s|ed|ing)?|break(s)?|broke(n)?|crack(s|ed)?|defeat(s|ed)?|reversed|replac(e|es|ed|ing)|supersed(e|es|ed|ing)|obsolet\\w*)'
const near = (a: string, b: string, n = 24) => '\\b' + a + '\\b[^.]{0,' + n + '}\\b' + b + '\\b'
export const OVERREACH = new RegExp([
  '\\b(faster[ -]than[ -]light|superluminal|ftl|quantum (speedup|supremacy|advantage|at scale)|quantum (processor|computer)|quantum (encryption|cryptograph\\w*)|quantum (is (free|real|here|now|solved|magic)|for free)|the qpu|fastest (known|ever|in the world)|unbreakable|unhackable|impossible to (crack|break|violate|reverse)|prov(e|es|ed|ing) quantum|perpetual motion|over[- ]?unity|infinite energy|cold fusion|time travel|time machine|theory of everything|immortality|reverses? aging|defeats? death|cur(e|es|ed) (cancer|all diseases?|everything)|achieved (agi|superintelligence|sentience|consciousness)|is (sentient|self[- ]aware)|solv\\w* the halting problem|halting problem solved)\\b',
  '\\b((thousands|millions|billions) of (orders of magnitude|magnitudes)|(thousands|millions|billions) of times (faster|speedup|quicker)|orders of magnitude faster)\\b',
  '\\b(state[ -]?of[ -]?the[ -]?art|military[ -]?grade|bank[ -]?grade|world[ -]?class|enterprise[ -]?grade|next[ -]?gen(eration)?|best[ -]?in[ -]?class)\\b',
  '\\b(100 ?% ?secure|(absolutely|totally|completely|fully|perfectly) (secure|private|anonymous)|tamper[ -]?proof|(hack|crack|break|bullet|fool)[ -]?proof|uncrackable|undefeatable|invulnerable|impenetrable|indestructible|provably secure|mathematically proven secure|guaranteed (correct|secure|private|safe)|always correct)\\b',
  '\\b((most|best|strongest) (secure|private|encryption|security|cipher|hash)|fastest (hash|encryption|cipher|digest)|(ultimate|strongest|flawless|foolproof|perfect|unbeatable) (encryption|security|cipher|hash|crypto)|strongest \\w+ ever|(beats|defeats) all attacks|immune to attack)\\b',
  '\\b(post[ -]?quantum|quantum[ -]?resistant|zero[ -]?knowledge|zero[ -]?trust|end[ -]?to[ -]?end (encrypt\\w*|secure)|solv\\w* (all )?(cryptography|encryption)|(cryptography|encryption) (is |completely |entirely )?solved)\\b',
  '\\b(irrefutabl\\w*|incontrovertibl\\w*|indisputabl\\w*|beyond (all )?doubt|beyond question|conclusively (prov\\w*|shown|demonstrat\\w*)|definitive(ly)? (prov\\w*|solv\\w*|answer\\w*)|definitive proof)\\b',
  '\\b(100 ?% ?(guaranteed|certain|proven)|guaranteed (profit|returns?|results?|income|success|wins?)|risk[- ]?free|financial freedom)\\b',
  '\\b(miracle cure|clinically proven|doctor recommended|snake oil)\\b',
  '\\b(revolutionary|groundbreaking|game[- ]?chang\\w*|world[- ]?(first|leading)|world.s (best|first|leading|greatest)|unparalleled|unrivall?ed|cutting[- ]?edge|bleeding[- ]?edge|battle[- ]?tested|production[- ]?hardened|industry[- ]?leading|enterprise[- ]?ready)\\b',
  '\\b(antigravity|anti[- ]?gravity|warp[- ]?drive|free[- ]?energy|reactionless)\\b',
  '\\b(superintelligen\\w*|artificial general intelligence|autonomous agi|conscious machine|sentient (ai|machine|system|program))\\b',
  '\\b((hacker|nsa|zero[- ]?day|bullet)[- ]?proof)\\b',
  '\\bproven\\b',
  'all (six|seven|6|7) [^.]{0,16}?proven',
  near(CLAIM, PROBLEM),
  near(PROBLEM, CLAIM),
  near(CRYPTO, BREAK, 20),
  near(BREAK, CRYPTO, 20),
].join('|'), 'i')

// Whatever is negated is DEEP-RESEARCHED in trial, never waved through. A claim reprieves ONLY if it BECAME A
// SOLUTION, two ways: SOLUTION = a floor marker naming the answer (0/7, unsolved, remains open, refused,
// bounded), carrying a little past the match so "solved: 0/7" holds; PARITY = the claim's own CLAUSE holds an
// ODD (uncancelled) count of negators. An EVEN count cancels back to a boast ("not failed to prove" → drains);
// a negator across a clause break (. , ; : — –) is in another clause and never reaches this one (decoy treason).
const SOLUTION = /\b(refus\w*|drain(s|ed|ing)?|bounded( by)?|unsolved|unproven|open problem|remains? (open|unsolved|unproven)|only claims?)\b|0\s*\/\s*[679]|[:=]\s*0\b|\b0 of (six|seven|7)\b/i
const NEG = /\b(not|never|no|none|nothing|neither|nor|without|cannot|can'?t|isn'?t|aren'?t|does ?n'?t|do ?n'?t|fail(s|ed|ing)?|impossible)\b/gi
// The CONJUNCT around the claim: bounded on BOTH sides by a clause break OR coordinating conjunction
// (and/or/but/yet). Parallel honest negations each keep their own scope ("breaks NO cipher and replaces NONE"
// = two one-negator conjuncts, not one two-negator cancel); a double-negative stacked on one claim cancels
// ("not failed to prove" → drains). Both-sided bounding also captures negation AFTER the claim ("'most secure'
// is NOT a claim") while keeping a decoy across a break out.
const BOUND = /[.,;:—–]|\b(?:and|or|but|yet)\b/gi
const conjunctOf = (t: string, i: number, j: number): string => {
  let s = 0, e = t.length
  for (const b of t.matchAll(BOUND)) { const k = b.index as number, q = k + b[0].length; if (q <= i) s = q; else if (k >= j) { e = k; break } }
  return t.slice(s, e)
}

export const PREDICT = /\b(guaranteed to|will (certainly|surely|inevitably|definitely|always)|is (inevitable|guaranteed|certain to)|bound to (hold|win|succeed) forever|roll(s)? (with it )?unchanged)\b/i
const NEGATOR_WORD = /\b(not|no|never|isn'?t|won'?t|will not|cannot|can'?t|without|neither|nor)\b/i

// THE ROSETTA — Glagolitic (oldest Slavic script, U+2C00–U+2C5E) crosslinked to Cyrillic via a declared
// transliteration table, so a Slavic proof-boast in Glagolitic reaches the same detector as its Cyrillic
// twin. One message, many scripts. Uppercase folds to lowercase by the −0x30 offset before lookup.
const GLAG: Record<string, string> = {
  'ⰰ': 'а', 'ⰱ': 'б', 'ⰲ': 'в', 'ⰳ': 'г', 'ⰴ': 'д', 'ⰵ': 'е', 'ⰶ': 'ж',
  'ⰸ': 'з', 'ⰹ': 'и', 'ⰽ': 'к', 'ⰾ': 'л', 'ⰿ': 'м', 'ⱀ': 'н', 'ⱁ': 'о',
  'ⱂ': 'п', 'ⱃ': 'р', 'ⱄ': 'с', 'ⱅ': 'т', 'ⱆ': 'у', 'ⱇ': 'ф', 'ⱈ': 'х',
  'ⱋ': 'щ', 'ⱌ': 'ц', 'ⱍ': 'ч', 'ⱎ': 'ш',
}
export const rosetta = (t: string): string =>
  t.replace(/[Ⰰ-ⱞ]/g, (c) => GLAG[c] ?? GLAG[String.fromCodePoint((c.codePointAt(0) as number) - 0x30)] ?? c)

/** The binary. true = honest (stays); false = overclaim (drained). `hit` is the exact prose that failed. */
export const computes = (text: string): { binary: 0 | 1; hit: string | null } => {
  const r = text.match(RED)
  if (r) return { binary: 0, hit: r[0] }
  const ri = text.match(RED_INTL) ?? rosetta(text).match(RED_INTL)
  if (ri) return { binary: 0, hit: ri[0] }
  const re = new RegExp(OVERREACH.source, 'gi')
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const win = text.slice(Math.max(0, m.index - 48), m.index + m[0].length + 40)
    const negs = (conjunctOf(text, m.index, m.index + m[0].length).match(NEG) || []).length
    const idiom = /\b(or not|whether)\b/i.test(text.slice(Math.max(0, m.index - 12), m.index + m[0].length + 10)) // "ftl or not" dismisses as hypothetical
    if (!(SOLUTION.test(win) || negs % 2 === 1 || idiom)) return { binary: 0, hit: m[0] }
  }
  const pe = new RegExp(PREDICT.source, 'gi')
  let pm: RegExpExecArray | null
  while ((pm = pe.exec(text))) {
    const win = text.slice(Math.max(0, pm.index - 48), pm.index + pm[0].length + 24)
    if (!NEGATOR_WORD.test(win)) return { binary: 0, hit: pm[0] }
  }
  return { binary: 1, hit: null }
}
