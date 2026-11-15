-- lean/FamiliesZ.lean — GENERATED. THE FAMILIES, Z — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- zeroshot: embeddings(10, 64) = 640 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. -/
theorem fam_zeroshot_embeddings_1 : ((10 : Int) * (64 : Int)) = (640 : Int) := by decide

/-- zeroshot: attributes(10, 5) = 50 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. -/
theorem fam_zeroshot_attributes_1 : ((10 : Int) * (5 : Int)) = (50 : Int) := by decide

/-- zeroshot: transferPairs(8, 2) = 16 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. -/
theorem fam_zeroshot_transferpairs_1 : ((8 : Int) * (2 : Int)) = (16 : Int) := by decide

/-- zeroshot: comparisons(100, 10) = 1000 — ZEROSHOT — zero-shot learning as exact combinatorics, not a
    fabricated coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer
    pairs, the similarity comparisons, the seen classes left after the unseen are held out, the prompt×class
    grid, the binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex
    address; develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims;
    attributes = classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0,
    classes − unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number,
    b: number) => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds:
    boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zeroshot.${name}`, params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes`
    classes of `dims` dimensions: classes · dims. */ static embeddings(classes: number, dims: number):
    CrossFormula { return f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims,
    nat(classes, dims), 'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over
    `attrs` attributes: classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula {
    return f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs,
    nat(classes, attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and
    `unseen` classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula {
    return f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen,
    unseen), 'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against
    `classes`: queries · classes. -/
theorem fam_zeroshot_comparisons_1 : ((100 : Int) * (10 : Int)) = (1000 : Int) := by decide

/-- zeroshot: seenClasses(10, 3) = 7 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). -/
theorem fam_zeroshot_seenclasses_1 : (fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int) := by decide

/-- zeroshot: seenClasses(3, 5) = 0 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). -/
theorem fam_zeroshot_seenclasses_2 : (fmax (0 : Int) ((3 : Int) - (5 : Int))) = (0 : Int) := by decide

/-- zeroshot: prompts(8, 10) = 80 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). */ static seenClasses(classes: number, unseen: number):
    CrossFormula { return f('zeroshot-seenClasses', 'seenClasses(classes, unseen) = max(0, classes − unseen)',
    Math.max(0, classes - unseen), nat(classes, unseen), 'seenClasses', [classes, unseen]) } /** The
    prompt×class grid over `templates` templates and `classes`: templates · classes. -/
theorem fam_zeroshot_prompts_1 : ((8 : Int) * (10 : Int)) = (80 : Int) := by decide

/-- zeroshot: signatures(4) = 16 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). */ static seenClasses(classes: number, unseen: number):
    CrossFormula { return f('zeroshot-seenClasses', 'seenClasses(classes, unseen) = max(0, classes − unseen)',
    Math.max(0, classes - unseen), nat(classes, unseen), 'seenClasses', [classes, unseen]) } /** The
    prompt×class grid over `templates` templates and `classes`: templates · classes. */ static
    prompts(templates: number, classes: number): CrossFormula { return f('zeroshot-prompts', 'prompts(templates,
    classes) = templates · classes', templates * classes, nat(templates, classes), 'prompts', [templates,
    classes]) } /** The binary attribute signatures over `attrs` attributes: 2^attrs (attrs ≤ 30). -/
theorem fam_zeroshot_signatures_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- zeroshot: partitions(10, 5) = 2 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). */ static seenClasses(classes: number, unseen: number):
    CrossFormula { return f('zeroshot-seenClasses', 'seenClasses(classes, unseen) = max(0, classes − unseen)',
    Math.max(0, classes - unseen), nat(classes, unseen), 'seenClasses', [classes, unseen]) } /** The
    prompt×class grid over `templates` templates and `classes`: templates · classes. */ static
    prompts(templates: number, classes: number): CrossFormula { return f('zeroshot-prompts', 'prompts(templates,
    classes) = templates · classes', templates * classes, nat(templates, classes), 'prompts', [templates,
    classes]) } /** The binary attribute signatures over `attrs` attributes: 2^attrs (attrs ≤ 30). */ static
    signatures(attrs: number): CrossFormula { return f('zeroshot-signatures', 'signatures(attrs) = 2^attrs',
    attrs <= 30 ? 2 ** attrs : 0, nat(attrs) && attrs <= 30, 'signatures', [attrs]) } /** The classes per fold
    from `classes` over `folds`: classes / folds. -/
theorem fam_zeroshot_partitions_1 : ((10 : Int) / (5 : Int)) = (2 : Int) := by decide

/-- zeroshot: partitions(10, 0) = 0 — ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated
    coverage number. The embedding matrix cells, the attribute matrix, the seen×unseen transfer pairs, the
    similarity comparisons, the seen classes left after the unseen are held out, the prompt×class grid, the
    binary attribute signatures (2^a), and the classes per fold. Each an exact integer at a hex address;
    develops the zero-shot lead. */ const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes =
    classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes −
    unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const div = (a: number, b: number)
    => (b > 0 ? Math.floor(a / b) : 0) const f = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`,
    params }) export class ZeroshotFormulas { /** The embedding matrix cells for `classes` classes of `dims`
    dimensions: classes · dims. */ static embeddings(classes: number, dims: number): CrossFormula { return
    f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims),
    'embeddings', [classes, dims]) } /** The attribute matrix for `classes` classes over `attrs` attributes:
    classes · attrs. */ static attributes(classes: number, attrs: number): CrossFormula { return
    f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes,
    attrs), 'attributes', [classes, attrs]) } /** The seen×unseen transfer pairs from `seen` and `unseen`
    classes: seen · unseen. */ static transferPairs(seen: number, unseen: number): CrossFormula { return
    f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen),
    'transferPairs', [seen, unseen]) } /** The similarity comparisons for `queries` queries against `classes`:
    queries · classes. */ static comparisons(queries: number, classes: number): CrossFormula { return
    f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes,
    nat(queries, classes), 'comparisons', [queries, classes]) } /** The seen classes left after `unseen` of
    `classes` are held out: max(0, classes − unseen). */ static seenClasses(classes: number, unseen: number):
    CrossFormula { return f('zeroshot-seenClasses', 'seenClasses(classes, unseen) = max(0, classes − unseen)',
    Math.max(0, classes - unseen), nat(classes, unseen), 'seenClasses', [classes, unseen]) } /** The
    prompt×class grid over `templates` templates and `classes`: templates · classes. */ static
    prompts(templates: number, classes: number): CrossFormula { return f('zeroshot-prompts', 'prompts(templates,
    classes) = templates · classes', templates * classes, nat(templates, classes), 'prompts', [templates,
    classes]) } /** The binary attribute signatures over `attrs` attributes: 2^attrs (attrs ≤ 30). */ static
    signatures(attrs: number): CrossFormula { return f('zeroshot-signatures', 'signatures(attrs) = 2^attrs',
    attrs <= 30 ? 2 ** attrs : 0, nat(attrs) && attrs <= 30, 'signatures', [attrs]) } /** The classes per fold
    from `classes` over `folds`: classes / folds. -/
theorem fam_zeroshot_partitions_2 : ((10 : Int) / (0 : Int)) = (0 : Int) := by decide

/-- zerotrust: trustscore(90, 100) = 90 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. -/
theorem fam_zerotrust_trustscore_1 : (((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int) := by decide

/-- zerotrust: microsegments(100, 8) = 13 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. -/
theorem fam_zerotrust_microsegments_1 : (-((-(100 : Int)) / (8 : Int))) = (13 : Int) := by decide

/-- zerotrust: verificationrate(950, 1000) = 95 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust,
    always verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count
    needs, the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. -/
theorem fam_zerotrust_verificationrate_1 : (((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int) := by decide

/-- zerotrust: blastradius(1000, 20) = 50 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */ static
    verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate',
    'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified *
    100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate',
    [verified, requests]) } /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets /
    segments⌋. -/
theorem fam_zerotrust_blastradius_1 : ((1000 : Int) / (20 : Int)) = (50 : Int) := by decide

/-- zerotrust: continuousauth(3600, 300) = 12 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust,
    always verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count
    needs, the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */ static
    verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate',
    'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified *
    100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate',
    [verified, requests]) } /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets /
    segments⌋. */ static blastradius(assets: number, segments: number): CrossFormula { return
    c('zerotrust-blastradius', 'blastradius(assets, segments) = ⌊assets / segments⌋', segments > 0 ?
    Math.floor(assets / segments) : 0, nat(assets, segments) && segments > 0, 'blastradius', [assets, segments])
    } /** CONTINUOUS AUTH: the re-auth events across a window at a fixed interval. value ⌊window / interval⌋. -/
theorem fam_zerotrust_continuousauth_1 : ((3600 : Int) / (300 : Int)) = (12 : Int) := by decide

/-- zerotrust: deviceposture(480, 500) = 96 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */ static
    verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate',
    'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified *
    100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate',
    [verified, requests]) } /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets /
    segments⌋. */ static blastradius(assets: number, segments: number): CrossFormula { return
    c('zerotrust-blastradius', 'blastradius(assets, segments) = ⌊assets / segments⌋', segments > 0 ?
    Math.floor(assets / segments) : 0, nat(assets, segments) && segments > 0, 'blastradius', [assets, segments])
    } /** CONTINUOUS AUTH: the re-auth events across a window at a fixed interval. value ⌊window / interval⌋. */
    static continuousauth(window: number, interval: number): CrossFormula { return c('zerotrust-continuousauth',
    'continuousauth(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0,
    nat(window, interval) && interval > 0, 'continuousauth', [window, interval]) } /** DEVICE POSTURE: compliant
    devices as a percentage of the fleet. value ⌊compliant · 100 / total⌋. -/
theorem fam_zerotrust_deviceposture_1 : (((480 : Int) * (100 : Int)) / (500 : Int)) = (96 : Int) := by decide

/-- zerotrust: policycoverage(180, 200) = 90 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */ static
    verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate',
    'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified *
    100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate',
    [verified, requests]) } /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets /
    segments⌋. */ static blastradius(assets: number, segments: number): CrossFormula { return
    c('zerotrust-blastradius', 'blastradius(assets, segments) = ⌊assets / segments⌋', segments > 0 ?
    Math.floor(assets / segments) : 0, nat(assets, segments) && segments > 0, 'blastradius', [assets, segments])
    } /** CONTINUOUS AUTH: the re-auth events across a window at a fixed interval. value ⌊window / interval⌋. */
    static continuousauth(window: number, interval: number): CrossFormula { return c('zerotrust-continuousauth',
    'continuousauth(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0,
    nat(window, interval) && interval > 0, 'continuousauth', [window, interval]) } /** DEVICE POSTURE: compliant
    devices as a percentage of the fleet. value ⌊compliant · 100 / total⌋. */ static deviceposture(compliant:
    number, total: number): CrossFormula { return c('zerotrust-deviceposture', 'deviceposture(compliant, total)
    = ⌊compliant · 100 / total⌋', total > 0 ? Math.floor((compliant * 100) / total) : 0, nat(compliant, total)
    && total > 0 && compliant <= total, 'deviceposture', [compliant, total]) } /** POLICY COVERAGE: resources
    under an enforced policy as a percentage. value ⌊enforced · 100 / resources⌋. -/
theorem fam_zerotrust_policycoverage_1 : (((180 : Int) * (100 : Int)) / (200 : Int)) = (90 : Int) := by decide

/-- zerotrust: attacksurface(50, 12) = 600 — ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always
    verify). A posture is numbers: the trust score from passing signals, the microsegments an asset count needs,
    the verification rate, the blast radius of one breach, the continuous re-auth count, device-posture
    compliance, policy coverage, and the attack surface. Crosses to `networking` — zero trust is the discipline
    imposed on the network. A measure. */ const PROOF = 'zerotrust arithmetic (trust score, microsegments,
    verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never
    trust always verify; a measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `zerotrust.${name}`, params }) export class ZerotrustFormulas { /** TRUST SCORE: passing signals as a
    percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */ static trustscore(signals: number,
    maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) =
    ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals,
    maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) } /**
    MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
    static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments',
    'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment)
    : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) } /** VERIFICATION
    RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */ static
    verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate',
    'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified *
    100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate',
    [verified, requests]) } /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets /
    segments⌋. */ static blastradius(assets: number, segments: number): CrossFormula { return
    c('zerotrust-blastradius', 'blastradius(assets, segments) = ⌊assets / segments⌋', segments > 0 ?
    Math.floor(assets / segments) : 0, nat(assets, segments) && segments > 0, 'blastradius', [assets, segments])
    } /** CONTINUOUS AUTH: the re-auth events across a window at a fixed interval. value ⌊window / interval⌋. */
    static continuousauth(window: number, interval: number): CrossFormula { return c('zerotrust-continuousauth',
    'continuousauth(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0,
    nat(window, interval) && interval > 0, 'continuousauth', [window, interval]) } /** DEVICE POSTURE: compliant
    devices as a percentage of the fleet. value ⌊compliant · 100 / total⌋. */ static deviceposture(compliant:
    number, total: number): CrossFormula { return c('zerotrust-deviceposture', 'deviceposture(compliant, total)
    = ⌊compliant · 100 / total⌋', total > 0 ? Math.floor((compliant * 100) / total) : 0, nat(compliant, total)
    && total > 0 && compliant <= total, 'deviceposture', [compliant, total]) } /** POLICY COVERAGE: resources
    under an enforced policy as a percentage. value ⌊enforced · 100 / resources⌋. */ static
    policycoverage(enforced: number, resources: number): CrossFormula { return c('zerotrust-policycoverage',
    'policycoverage(enforced, resources) = ⌊enforced · 100 / resources⌋', resources > 0 ? Math.floor((enforced *
    100) / resources) : 0, nat(enforced, resources) && resources > 0 && enforced <= resources, 'policycoverage',
    [enforced, resources]) } /** ATTACK SURFACE: exposed endpoints across the services each runs. value
    endpoints · services. -/
theorem fam_zerotrust_attacksurface_1 : ((50 : Int) * (12 : Int)) = (600 : Int) := by decide

/-- zoning: far(15000, 10000) = 150 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning
    registry, not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it
    covers, the buildable depth left after setbacks, dwelling density, stories within a height cap, required
    parking, the open space that must remain, and how many lots a parcel yields. Crosses to `governance` —
    zoning is what governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area
    ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law
    as a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export
    class ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor ·
    100 / lot⌋. -/
theorem fam_zoning_far_1 : (((15000 : Int) * (100 : Int)) / (10000 : Int)) = (150 : Int) := by decide

/-- zoning: coverage(4000, 10000) = 40 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning
    registry, not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it
    covers, the buildable depth left after setbacks, dwelling density, stories within a height cap, required
    parking, the open space that must remain, and how many lots a parcel yields. Crosses to `governance` —
    zoning is what governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area
    ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law
    as a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export
    class ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor ·
    100 / lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor,
    lot) = ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0,
    'far', [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint
    · 100 / lot⌋. -/
theorem fam_zoning_coverage_1 : (((4000 : Int) * (100 : Int)) / (10000 : Int)) = (40 : Int) := by decide

/-- zoning: setback(100, 20, 15) = 65 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning
    registry, not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it
    covers, the buildable depth left after setbacks, dwelling density, stories within a height cap, required
    parking, the open space that must remain, and how many lots a parcel yields. Crosses to `governance` —
    zoning is what governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area
    ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law
    as a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export
    class ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor ·
    100 / lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor,
    lot) = ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0,
    'far', [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint
    · 100 / lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). -/
theorem fam_zoning_setback_1 : (fmax (0 : Int) (((100 : Int) - (20 : Int)) - (15 : Int))) = (65 : Int) := by decide

/-- zoning: density(120, 4) = 30 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning registry,
    not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it covers,
    the buildable depth left after setbacks, dwelling density, stories within a height cap, required parking,
    the open space that must remain, and how many lots a parcel yields. Crosses to `governance` — zoning is what
    governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area ratio, lot
    coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law as a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst: 'governance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export class
    ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor · 100 /
    lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor, lot) =
    ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0, 'far',
    [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint · 100 /
    lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). */ static setback(depth: number, front: number,
    rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front
    − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) } /**
    DENSITY: dwelling units per acre. value ⌊units / acres⌋. -/
theorem fam_zoning_density_1 : ((120 : Int) / (4 : Int)) = (30 : Int) := by decide

/-- zoning: height(60, 12) = 5 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning registry,
    not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it covers,
    the buildable depth left after setbacks, dwelling density, stories within a height cap, required parking,
    the open space that must remain, and how many lots a parcel yields. Crosses to `governance` — zoning is what
    governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area ratio, lot
    coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law as a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst: 'governance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export class
    ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor · 100 /
    lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor, lot) =
    ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0, 'far',
    [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint · 100 /
    lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). */ static setback(depth: number, front: number,
    rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front
    − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) } /**
    DENSITY: dwelling units per acre. value ⌊units / acres⌋. */ static density(units: number, acres: number):
    CrossFormula { return c('zoning-density', 'density(units, acres) = ⌊units / acres⌋', acres > 0 ?
    Math.floor(units / acres) : 0, nat(units, acres) && acres > 0, 'density', [units, acres]) } /** HEIGHT:
    stories within a total height cap at a per-floor height. value ⌊total / perFloor⌋. -/
theorem fam_zoning_height_1 : ((60 : Int) / (12 : Int)) = (5 : Int) := by decide

/-- zoning: parking(50, 2) = 100 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning registry,
    not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it covers,
    the buildable depth left after setbacks, dwelling density, stories within a height cap, required parking,
    the open space that must remain, and how many lots a parcel yields. Crosses to `governance` — zoning is what
    governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area ratio, lot
    coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law as a measure
    crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst: 'governance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export class
    ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor · 100 /
    lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor, lot) =
    ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0, 'far',
    [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint · 100 /
    lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). */ static setback(depth: number, front: number,
    rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front
    − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) } /**
    DENSITY: dwelling units per acre. value ⌊units / acres⌋. */ static density(units: number, acres: number):
    CrossFormula { return c('zoning-density', 'density(units, acres) = ⌊units / acres⌋', acres > 0 ?
    Math.floor(units / acres) : 0, nat(units, acres) && acres > 0, 'density', [units, acres]) } /** HEIGHT:
    stories within a total height cap at a per-floor height. value ⌊total / perFloor⌋. */ static height(total:
    number, perFloor: number): CrossFormula { return c('zoning-height', 'height(total, perFloor) = ⌊total /
    perFloor⌋', perFloor > 0 ? Math.floor(total / perFloor) : 0, nat(total, perFloor) && perFloor > 0, 'height',
    [total, perFloor]) } /** PARKING: required spaces at a ratio per unit. value units · perUnit. -/
theorem fam_zoning_parking_1 : ((50 : Int) * (2 : Int)) = (100 : Int) := by decide

/-- zoning: openspace(10000, 4000) = 6000 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning
    registry, not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it
    covers, the buildable depth left after setbacks, dwelling density, stories within a height cap, required
    parking, the open space that must remain, and how many lots a parcel yields. Crosses to `governance` —
    zoning is what governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area
    ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law
    as a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export
    class ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor ·
    100 / lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor,
    lot) = ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0,
    'far', [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint
    · 100 / lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). */ static setback(depth: number, front: number,
    rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front
    − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) } /**
    DENSITY: dwelling units per acre. value ⌊units / acres⌋. */ static density(units: number, acres: number):
    CrossFormula { return c('zoning-density', 'density(units, acres) = ⌊units / acres⌋', acres > 0 ?
    Math.floor(units / acres) : 0, nat(units, acres) && acres > 0, 'density', [units, acres]) } /** HEIGHT:
    stories within a total height cap at a per-floor height. value ⌊total / perFloor⌋. */ static height(total:
    number, perFloor: number): CrossFormula { return c('zoning-height', 'height(total, perFloor) = ⌊total /
    perFloor⌋', perFloor > 0 ? Math.floor(total / perFloor) : 0, nat(total, perFloor) && perFloor > 0, 'height',
    [total, perFloor]) } /** PARKING: required spaces at a ratio per unit. value units · perUnit. */ static
    parking(units: number, perUnit: number): CrossFormula { return c('zoning-parking', 'parking(units, perUnit)
    = units · perUnit', units * perUnit, nat(units, perUnit), 'parking', [units, perUnit]) } /** OPEN SPACE: the
    lot area that must remain after the footprint. value max(0, lot − footprint). -/
theorem fam_zoning_openspace_1 : (fmax (0 : Int) ((10000 : Int) - (4000 : Int))) = (6000 : Int) := by decide

/-- zoning: lotsize(50000, 5000) = 10 — ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning
    registry, not by hand). A parcel is numbers: the floor-area ratio a building reaches, how much of the lot it
    covers, the buildable depth left after setbacks, dwelling density, stories within a height cap, required
    parking, the open space that must remain, and how many lots a parcel yields. Crosses to `governance` —
    zoning is what governance enacts and enforces. A measure. */ const PROOF = 'zoning arithmetic (floor-area
    ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law
    as a measure crossed to governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoning', dst:
    'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params }) export
    class ZoningFormulas { /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor ·
    100 / lot⌋. */ static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor,
    lot) = ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0,
    'far', [floor, lot]) } /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint
    · 100 / lot⌋. */ static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage',
    'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0,
    nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) } /** SETBACK: buildable depth left after the
    front and rear setbacks. value max(0, depth − front − rear). */ static setback(depth: number, front: number,
    rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front
    − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) } /**
    DENSITY: dwelling units per acre. value ⌊units / acres⌋. */ static density(units: number, acres: number):
    CrossFormula { return c('zoning-density', 'density(units, acres) = ⌊units / acres⌋', acres > 0 ?
    Math.floor(units / acres) : 0, nat(units, acres) && acres > 0, 'density', [units, acres]) } /** HEIGHT:
    stories within a total height cap at a per-floor height. value ⌊total / perFloor⌋. */ static height(total:
    number, perFloor: number): CrossFormula { return c('zoning-height', 'height(total, perFloor) = ⌊total /
    perFloor⌋', perFloor > 0 ? Math.floor(total / perFloor) : 0, nat(total, perFloor) && perFloor > 0, 'height',
    [total, perFloor]) } /** PARKING: required spaces at a ratio per unit. value units · perUnit. */ static
    parking(units: number, perUnit: number): CrossFormula { return c('zoning-parking', 'parking(units, perUnit)
    = units · perUnit', units * perUnit, nat(units, perUnit), 'parking', [units, perUnit]) } /** OPEN SPACE: the
    lot area that must remain after the footprint. value max(0, lot − footprint). */ static openspace(lot:
    number, footprint: number): CrossFormula { return c('zoning-openspace', 'openspace(lot, footprint) = max(0,
    lot − footprint)', Math.max(0, lot - footprint), nat(lot, footprint), 'openspace', [lot, footprint]) } /**
    LOT YIELD: lots a parcel yields at a minimum lot size. value ⌊parcel / minLot⌋. -/
theorem fam_zoning_lotsize_1 : ((50000 : Int) / (5000 : Int)) = (10 : Int) := by decide

/-- zoology: population(100, 30) = 70 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers:
    net population change, density over range, metabolic demand, lifespan, fecundity per female, predation
    success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology
    counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan,
    fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /**
    POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). -/
theorem fam_zoology_population_1 : (fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int) := by decide

/-- zoology: density(100, 4) = 25 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers: net
    population change, density over range, metabolic demand, lifespan, fecundity per female, predation success,
    migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology counts. A
    measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan, fecundity,
    predation, migration, survival); animal populations as counts; a measure crossed to ecology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /** POPULATION: net change,
    births over deaths, never below zero. value max(0, births − deaths). */ static population(births: number,
    deaths: number): CrossFormula { return c('zoology-population', 'population(births, deaths) = max(0, births −
    deaths)', Math.max(0, births - deaths), nat(births, deaths), 'population', [births, deaths]) } /** DENSITY:
    individuals over the range they hold. value ⌊count / area⌋. -/
theorem fam_zoology_density_1 : ((100 : Int) / (4 : Int)) = (25 : Int) := by decide

/-- zoology: metabolism(50, 3) = 150 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers:
    net population change, density over range, metabolic demand, lifespan, fecundity per female, predation
    success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology
    counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan,
    fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /**
    POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */ static
    population(births: number, deaths: number): CrossFormula { return c('zoology-population',
    'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths),
    'population', [births, deaths]) } /** DENSITY: individuals over the range they hold. value ⌊count / area⌋.
    */ static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count,
    area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density',
    [count, area]) } /** METABOLISM: demand at a per-mass rate. value mass · rate. -/
theorem fam_zoology_metabolism_1 : ((50 : Int) * (3 : Int)) = (150 : Int) := by decide

/-- zoology: lifespan(12) = 12 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers: net
    population change, density over range, metabolic demand, lifespan, fecundity per female, predation success,
    migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology counts. A
    measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan, fecundity,
    predation, migration, survival); animal populations as counts; a measure crossed to ecology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /** POPULATION: net change,
    births over deaths, never below zero. value max(0, births − deaths). */ static population(births: number,
    deaths: number): CrossFormula { return c('zoology-population', 'population(births, deaths) = max(0, births −
    deaths)', Math.max(0, births - deaths), nat(births, deaths), 'population', [births, deaths]) } /** DENSITY:
    individuals over the range they hold. value ⌊count / area⌋. */ static density(count: number, area: number):
    CrossFormula { return c('zoology-density', 'density(count, area) = ⌊count / area⌋', area > 0 ?
    Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density', [count, area]) } /** METABOLISM:
    demand at a per-mass rate. value mass · rate. */ static metabolism(mass: number, rate: number): CrossFormula
    { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate', mass * rate, nat(mass, rate),
    'metabolism', [mass, rate]) } /** LIFESPAN: years lived. value years. -/
theorem fam_zoology_lifespan_1 : (12 : Int) = (12 : Int) := by decide

/-- zoology: fecundity(1000, 40) = 25 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers:
    net population change, density over range, metabolic demand, lifespan, fecundity per female, predation
    success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology
    counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan,
    fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /**
    POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */ static
    population(births: number, deaths: number): CrossFormula { return c('zoology-population',
    'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths),
    'population', [births, deaths]) } /** DENSITY: individuals over the range they hold. value ⌊count / area⌋.
    */ static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count,
    area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density',
    [count, area]) } /** METABOLISM: demand at a per-mass rate. value mass · rate. */ static metabolism(mass:
    number, rate: number): CrossFormula { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate',
    mass * rate, nat(mass, rate), 'metabolism', [mass, rate]) } /** LIFESPAN: years lived. value years. */
    static lifespan(years: number): CrossFormula { return c('zoology-lifespan', 'lifespan(years) = years',
    years, nat(years), 'lifespan', [years]) } /** FECUNDITY: offspring per female. value ⌊offspring / females⌋. -/
theorem fam_zoology_fecundity_1 : ((1000 : Int) / (40 : Int)) = (25 : Int) := by decide

/-- zoology: predation(30, 100) = 30 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers:
    net population change, density over range, metabolic demand, lifespan, fecundity per female, predation
    success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology
    counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan,
    fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /**
    POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */ static
    population(births: number, deaths: number): CrossFormula { return c('zoology-population',
    'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths),
    'population', [births, deaths]) } /** DENSITY: individuals over the range they hold. value ⌊count / area⌋.
    */ static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count,
    area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density',
    [count, area]) } /** METABOLISM: demand at a per-mass rate. value mass · rate. */ static metabolism(mass:
    number, rate: number): CrossFormula { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate',
    mass * rate, nat(mass, rate), 'metabolism', [mass, rate]) } /** LIFESPAN: years lived. value years. */
    static lifespan(years: number): CrossFormula { return c('zoology-lifespan', 'lifespan(years) = years',
    years, nat(years), 'lifespan', [years]) } /** FECUNDITY: offspring per female. value ⌊offspring / females⌋.
    */ static fecundity(offspring: number, females: number): CrossFormula { return c('zoology-fecundity',
    'fecundity(offspring, females) = ⌊offspring / females⌋', females > 0 ? Math.floor(offspring / females) : 0,
    nat(offspring, females) && females > 0, 'fecundity', [offspring, females]) } /** PREDATION: hunting success
    as a percentage. value ⌊caught · 100 / encountered⌋. -/
theorem fam_zoology_predation_1 : (((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int) := by decide

/-- zoology: migration(6000, 60) = 100 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is
    numbers: net population change, density over range, metabolic demand, lifespan, fecundity per female,
    predation success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what
    ecology counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism,
    lifespan, fecundity, predation, migration, survival); animal populations as counts; a measure crossed to
    ecology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula,
    value, proof: PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas {
    /** POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */ static
    population(births: number, deaths: number): CrossFormula { return c('zoology-population',
    'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths),
    'population', [births, deaths]) } /** DENSITY: individuals over the range they hold. value ⌊count / area⌋.
    */ static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count,
    area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density',
    [count, area]) } /** METABOLISM: demand at a per-mass rate. value mass · rate. */ static metabolism(mass:
    number, rate: number): CrossFormula { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate',
    mass * rate, nat(mass, rate), 'metabolism', [mass, rate]) } /** LIFESPAN: years lived. value years. */
    static lifespan(years: number): CrossFormula { return c('zoology-lifespan', 'lifespan(years) = years',
    years, nat(years), 'lifespan', [years]) } /** FECUNDITY: offspring per female. value ⌊offspring / females⌋.
    */ static fecundity(offspring: number, females: number): CrossFormula { return c('zoology-fecundity',
    'fecundity(offspring, females) = ⌊offspring / females⌋', females > 0 ? Math.floor(offspring / females) : 0,
    nat(offspring, females) && females > 0, 'fecundity', [offspring, females]) } /** PREDATION: hunting success
    as a percentage. value ⌊caught · 100 / encountered⌋. */ static predation(caught: number, encountered:
    number): CrossFormula { return c('zoology-predation', 'predation(caught, encountered) = ⌊caught · 100 /
    encountered⌋', encountered > 0 ? Math.floor((caught * 100) / encountered) : 0, nat(caught, encountered) &&
    encountered > 0 && caught <= encountered, 'predation', [caught, encountered]) } /** MIGRATION: time to cross
    a distance at a speed. value ⌊distance / speed⌋. -/
theorem fam_zoology_migration_1 : ((6000 : Int) / (60 : Int)) = (100 : Int) := by decide

/-- zoology: survival(950, 1000) = 95 — ZOOLOGY — ANIMAL POPULATIONS AS ARITHMETIC. The living count is numbers:
    net population change, density over range, metabolic demand, lifespan, fecundity per female, predation
    success, migration time, and the survival rate from birth. Crosses to `ecology` — zoology is what ecology
    counts. A measure. */ const PROOF = 'zoology arithmetic (population change, density, metabolism, lifespan,
    fecundity, predation, migration, survival); animal populations as counts; a measure crossed to ecology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'zoology', dst: 'ecology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `zoology.${name}`, params }) export class ZoologyFormulas { /**
    POPULATION: net change, births over deaths, never below zero. value max(0, births − deaths). */ static
    population(births: number, deaths: number): CrossFormula { return c('zoology-population',
    'population(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths),
    'population', [births, deaths]) } /** DENSITY: individuals over the range they hold. value ⌊count / area⌋.
    */ static density(count: number, area: number): CrossFormula { return c('zoology-density', 'density(count,
    area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'density',
    [count, area]) } /** METABOLISM: demand at a per-mass rate. value mass · rate. */ static metabolism(mass:
    number, rate: number): CrossFormula { return c('zoology-metabolism', 'metabolism(mass, rate) = mass · rate',
    mass * rate, nat(mass, rate), 'metabolism', [mass, rate]) } /** LIFESPAN: years lived. value years. */
    static lifespan(years: number): CrossFormula { return c('zoology-lifespan', 'lifespan(years) = years',
    years, nat(years), 'lifespan', [years]) } /** FECUNDITY: offspring per female. value ⌊offspring / females⌋.
    */ static fecundity(offspring: number, females: number): CrossFormula { return c('zoology-fecundity',
    'fecundity(offspring, females) = ⌊offspring / females⌋', females > 0 ? Math.floor(offspring / females) : 0,
    nat(offspring, females) && females > 0, 'fecundity', [offspring, females]) } /** PREDATION: hunting success
    as a percentage. value ⌊caught · 100 / encountered⌋. */ static predation(caught: number, encountered:
    number): CrossFormula { return c('zoology-predation', 'predation(caught, encountered) = ⌊caught · 100 /
    encountered⌋', encountered > 0 ? Math.floor((caught * 100) / encountered) : 0, nat(caught, encountered) &&
    encountered > 0 && caught <= encountered, 'predation', [caught, encountered]) } /** MIGRATION: time to cross
    a distance at a speed. value ⌊distance / speed⌋. */ static migration(distance: number, speed: number):
    CrossFormula { return c('zoology-migration', 'migration(distance, speed) = ⌊distance / speed⌋', speed > 0 ?
    Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'migration', [distance, speed]) } /**
    SURVIVAL: the share alive from birth, as a percentage. value ⌊alive · 100 / born⌋. -/
theorem fam_zoology_survival_1 : (((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int) := by decide

/-- zoroastrianism: principles(3, 0) = 3 -/
theorem fam_zoroastrianism_principles_1 : ((3 : Int) + (0 : Int)) = (3 : Int) := by decide

/-- zoroastrianism: amesha(7, 0) = 7 -/
theorem fam_zoroastrianism_amesha_1 : ((7 : Int) + (0 : Int)) = (7 : Int) := by decide

/-- zoroastrianism: dualitypairs(2, 2) = 1 -/
theorem fam_zoroastrianism_dualitypairs_1 : (Int.ofNat (fchoose (Int.toNat (2 : Int)) (Int.toNat (2 : Int)))) = (1 : Int) := by decide

/-- zoroastrianism: hymncount(17, 1) = 17 -/
theorem fam_zoroastrianism_hymncount_1 : ((17 : Int) * (1 : Int)) = (17 : Int) := by decide

/-- zoroastrianism: fireranks(3, 0) = 3 -/
theorem fam_zoroastrianism_fireranks_1 : ((3 : Int) + (0 : Int)) = (3 : Int) := by decide

/-- zoroastrianism: prayerorderings(5) = 120 -/
theorem fam_zoroastrianism_prayerorderings_1 : (Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int) := by decide

/-- zoroastrianism: gathasubsets(5) = 32 -/
theorem fam_zoroastrianism_gathasubsets_1 : ((2 : Int) ^ (5 : Nat)) = (32 : Int) := by decide

/-- zoroastrianism: cosmiccycles(3, 1000) = 3000 -/
theorem fam_zoroastrianism_cosmiccycles_1 : ((3 : Int) * (1000 : Int)) = (3000 : Int) := by decide
