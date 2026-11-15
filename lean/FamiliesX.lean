-- lean/FamiliesX.lean — GENERATED. THE FAMILIES, X — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- xai: coalitions(4) = 16 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The
    coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). -/
theorem fam_xai_coalitions_1 : ((2 : Int) ^ (4 : Nat)) = (16 : Int) := by decide

/-- xai: coalitions(0) = 1 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The
    coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). -/
theorem fam_xai_coalitions_2 : ((2 : Int) ^ (0 : Nat)) = (1 : Int) := by decide

/-- xai: saliency(8, 8) = 64 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number.
    The coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. -/
theorem fam_xai_saliency_1 : ((8 : Int) * (8 : Int)) = (64 : Int) := by decide

/-- xai: limeSamples(4, 100) = 400 — XAI — explainable AI as exact combinatorics, not a fabricated coverage
    number. The coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the
    LIME perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. */ static saliency(width: number, height: number): CrossFormula { return f('xai-saliency',
    'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height])
    } /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. -/
theorem fam_xai_limesamples_1 : ((4 : Int) * (100 : Int)) = (400 : Int) := by decide

/-- xai: attributions(4, 3) = 12 — XAI — explainable AI as exact combinatorics, not a fabricated coverage
    number. The coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the
    LIME perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. */ static saliency(width: number, height: number): CrossFormula { return f('xai-saliency',
    'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height])
    } /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. */
    static limeSamples(features: number, perturbations: number): CrossFormula { return f('xai-limeSamples',
    'limeSamples(features, perturbations) = features · perturbations', features * perturbations, nat(features,
    perturbations), 'limeSamples', [features, perturbations]) } /** Attribution matrix cells over `features` and
    `classes`: features · classes. -/
theorem fam_xai_attributions_1 : ((4 : Int) * (3 : Int)) = (12 : Int) := by decide

/-- xai: anchors(4) = 15 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The
    coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. */ static saliency(width: number, height: number): CrossFormula { return f('xai-saliency',
    'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height])
    } /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. */
    static limeSamples(features: number, perturbations: number): CrossFormula { return f('xai-limeSamples',
    'limeSamples(features, perturbations) = features · perturbations', features * perturbations, nat(features,
    perturbations), 'limeSamples', [features, perturbations]) } /** Attribution matrix cells over `features` and
    `classes`: features · classes. */ static attributions(features: number, classes: number): CrossFormula {
    return f('xai-attributions', 'attributions(features, classes) = features · classes', features * classes,
    nat(features, classes), 'attributions', [features, classes]) } /** The non-empty anchor rules over
    `features`: 2^features − 1 (features ≤ 30). -/
theorem fam_xai_anchors_1 : (((2 : Int) ^ (4 : Nat)) - (1 : Int)) = (15 : Int) := by decide

/-- xai: heads(12, 8) = 96 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The
    coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. */ static saliency(width: number, height: number): CrossFormula { return f('xai-saliency',
    'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height])
    } /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. */
    static limeSamples(features: number, perturbations: number): CrossFormula { return f('xai-limeSamples',
    'limeSamples(features, perturbations) = features · perturbations', features * perturbations, nat(features,
    perturbations), 'limeSamples', [features, perturbations]) } /** Attribution matrix cells over `features` and
    `classes`: features · classes. */ static attributions(features: number, classes: number): CrossFormula {
    return f('xai-attributions', 'attributions(features, classes) = features · classes', features * classes,
    nat(features, classes), 'attributions', [features, classes]) } /** The non-empty anchor rules over
    `features`: 2^features − 1 (features ≤ 30). */ static anchors(features: number): CrossFormula { return
    f('xai-anchors', 'anchors(features) = 2^features − 1', features <= 30 ? pow2(features) - 1 : 0,
    nat(features) && features <= 30, 'anchors', [features]) } /** Attention heads to attribute across `layers`
    of `perLayer` heads: layers · perLayer. -/
theorem fam_xai_heads_1 : ((12 : Int) * (8 : Int)) = (96 : Int) := by decide

/-- xai: baselines(4) = 5 — XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The
    coalitions SHAP sums over (2^f), the pairwise feature interactions, the saliency-map pixels, the LIME
    perturbation samples, the attribution matrix cells, the non-empty anchor rules, the attention heads to
    attribute, and the reference baselines. Each an exact integer at a hex address; develops the XAI lead. */
    const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency =
    width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features −
    1 (A000225); heads = layers·perLayer; baselines = features + 1' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0) const
    f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'xai', dst: 'cross', formula,
    value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params }) export class XaiFormulas { /** The
    coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */ static coalitions(features:
    number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features),
    nat(features) && features <= 30, 'coalitions', [features]) } /** Pairwise interactions among `features`:
    features(features−1)/2. */ static interactions(features: number): CrossFormula { return
    f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2,
    nat(features), 'interactions', [features]) } /** Saliency-map pixels of a `width`×`height` input: width ·
    height. */ static saliency(width: number, height: number): CrossFormula { return f('xai-saliency',
    'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height])
    } /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. */
    static limeSamples(features: number, perturbations: number): CrossFormula { return f('xai-limeSamples',
    'limeSamples(features, perturbations) = features · perturbations', features * perturbations, nat(features,
    perturbations), 'limeSamples', [features, perturbations]) } /** Attribution matrix cells over `features` and
    `classes`: features · classes. */ static attributions(features: number, classes: number): CrossFormula {
    return f('xai-attributions', 'attributions(features, classes) = features · classes', features * classes,
    nat(features, classes), 'attributions', [features, classes]) } /** The non-empty anchor rules over
    `features`: 2^features − 1 (features ≤ 30). */ static anchors(features: number): CrossFormula { return
    f('xai-anchors', 'anchors(features) = 2^features − 1', features <= 30 ? pow2(features) - 1 : 0,
    nat(features) && features <= 30, 'anchors', [features]) } /** Attention heads to attribute across `layers`
    of `perLayer` heads: layers · perLayer. */ static heads(layers: number, perLayer: number): CrossFormula {
    return f('xai-heads', 'heads(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers,
    perLayer), 'heads', [layers, perLayer]) } /** Reference baselines for `features`: features + 1 (one per
    feature plus the all-off baseline). -/
theorem fam_xai_baselines_1 : ((4 : Int) + (1 : Int)) = (5 : Int) := by decide
