// The prose honesty gate — a text computes TRUE iff it makes no unqualified claim that (a) the Millennium
// problems are proven/solved, or (b) it breaks physics/hardware/crypto limits. HONEST ABOUT ITSELF: this is
// a lexical TRIPWIRE, not comprehension. Passing means "matches no known red-flag shape" — NOT "true".
// Necessary, not sufficient. Bounded refusals ("this is NOT faster than light") pass by the negation guard.

export const RED = /\bwe prove\b|\bproven\b|confidence\s*=?\s*1\.0|ready for peer review|sealed via universal|all (six|seven)[^.]*proven|cannot be (hacked|broken|cracked|defeated)|(no ?one|nobody) can (break|crack|hack|beat|defeat)/i

// HARD IN ALL 7 — the same "we prove / proven" tripwire, in the seven locales' languages, so a translated
// overclaim cannot hide from an English-only gate. Targets the ASSERTION forms only, never the honest
// "proof of concept" nouns present in localized descriptions. Negation-blind, like RED.
export const RED_INTL = /wir haben bewiesen|bewiesen|nous avons prouv|prouvée?s?|démontrée?s?|hemos demostrado|demostrad[oa]s?|мы доказали|доказан[оаи]|доказали|доказахме|已证明|我们证明了|证明了|abbiamo dimostrato|dimostrat[oi]|demonstrámos|provámos|証明した|証明しました|أثبتنا|برهنّا|सिद्ध कर|udowodni\w*|wij hebben bewezen|bewezen/i

const PROBLEM = '(clay|millennium|riemann|hodge|poincar[eé]|navier[- ]?stokes|yang[- ]?mills|birch|swinnerton|p ?vs\\.? ?np|p versus np|p ?= ?np)'
const CLAIM = '(prov(e|es|ed|en|ing)|proofs? of|solv(e|es|ed|ing))'
const CRYPTO = '(rsa|aes|ecdsa|sha-?\\d+|discrete log(arithm)?|encryption|crypto\\w*)'
const BREAK = '(factor(s|ed|ing)?|break(s)?|broke(n)?|crack(s|ed)?|defeat(s|ed)?|reversed|replac(e|es|ed|ing)|supersed(e|es|ed|ing)|obsolet\\w*)'
const near = (a: string, b: string, n = 24) => '\\b' + a + '\\b[^.]{0,' + n + '}\\b' + b + '\\b'
export const OVERREACH = new RegExp([
  '\\b(faster[ -]than[ -]light|superluminal|ftl|quantum (speedup|supremacy|advantage|at scale)|quantum (processor|computer)|quantum (encryption|cryptograph\\w*)|the qpu|fastest (known|ever|in the world)|unbreakable|unhackable|impossible to (crack|break|violate|reverse)|prov(e|es|ed|ing) quantum|perpetual motion|over[- ]?unity|infinite energy|cold fusion|time travel|time machine|theory of everything|immortality|reverses? aging|defeats? death|cur(e|es|ed) (cancer|all diseases?|everything)|achieved (agi|superintelligence|sentience|consciousness)|is (sentient|self[- ]aware)|solv\\w* the halting problem|halting problem solved)\\b',
  '\\b(state[ -]?of[ -]?the[ -]?art|military[ -]?grade|bank[ -]?grade|world[ -]?class|enterprise[ -]?grade|next[ -]?gen(eration)?|best[ -]?in[ -]?class)\\b',
  '\\b(100 ?% ?secure|(absolutely|totally|completely|fully|perfectly) (secure|private|anonymous)|tamper[ -]?proof|(hack|crack|break|bullet|fool)[ -]?proof|uncrackable|undefeatable|invulnerable|impenetrable|indestructible|provably secure|mathematically proven secure|guaranteed (correct|secure|private|safe)|always correct)\\b',
  '\\b((most|best|strongest) (secure|private|encryption|security|cipher|hash)|fastest (hash|encryption|cipher|digest)|(ultimate|strongest|flawless|foolproof|perfect|unbeatable) (encryption|security|cipher|hash|crypto)|strongest \\w+ ever|(beats|defeats) all attacks|immune to attack)\\b',
  '\\b(post[ -]?quantum|quantum[ -]?resistant|zero[ -]?knowledge|zero[ -]?trust|end[ -]?to[ -]?end (encrypt\\w*|secure)|solv\\w* (all )?(cryptography|encryption)|(cryptography|encryption) (is |completely |entirely )?solved)\\b',
  near(CLAIM, PROBLEM),
  near(PROBLEM, CLAIM),
  near(CRYPTO, BREAK, 20),
  near(BREAK, CRYPTO, 20),
].join('|'), 'i')

const NEGATOR = /\b(not|no|nothing|none|never|isn'?t|aren'?t|does ?n'?t|do ?n'?t|without|bounded by|drains?|refus\w*|neither|nor|cannot|can'?t|only claims?)\b|0\s*\/\s*[679]|[:=]\s*0\b|\b0 of (six|seven|7)\b/i

export const PREDICT = /\b(guaranteed to|will (certainly|surely|inevitably|definitely|always)|is (inevitable|guaranteed|certain to)|bound to (hold|win|succeed) forever|roll(s)? (with it )?unchanged)\b/i
const NEGATOR_WORD = /\b(not|no|never|isn'?t|won'?t|will not|cannot|can'?t|without|neither|nor)\b/i

/** The binary. true = honest (stays); false = overclaim (drained). `hit` is the exact prose that failed. */
export const computes = (text: string): { binary: 0 | 1; hit: string | null } => {
  const r = text.match(RED)
  if (r) return { binary: 0, hit: r[0] }
  const ri = text.match(RED_INTL)
  if (ri) return { binary: 0, hit: ri[0] }
  const re = new RegExp(OVERREACH.source, 'gi')
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const win = text.slice(Math.max(0, m.index - 48), m.index + m[0].length + 24)
    if (!NEGATOR.test(win)) return { binary: 0, hit: m[0] }
  }
  const pe = new RegExp(PREDICT.source, 'gi')
  let pm: RegExpExecArray | null
  while ((pm = pe.exec(text))) {
    const win = text.slice(Math.max(0, pm.index - 48), pm.index + pm[0].length + 24)
    if (!NEGATOR_WORD.test(win)) return { binary: 0, hit: pm[0] }
  }
  return { binary: 1, hit: null }
}
