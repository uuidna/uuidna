-- lean/FamiliesI.lean — GENERATED. THE FAMILIES, I — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- ichthyology: fecundity(50000, 1000) = 50 — FECUNDITY: eggs carried per unit of body weight. value ⌊eggs /
    weight⌋. -/
theorem fam_ichthyology_fecundity_1 : (50000 / 1000) = 50 := by decide

/-- ichthyology: schooling(6000, 60) = 100 — SCHOOLING: fish packed into a volume of water. value ⌊fish /
    volume⌋. -/
theorem fam_ichthyology_schooling_1 : (6000 / 60) = 100 := by decide

/-- ichthyology: growth(200, 150) = 50 — GROWTH: the increase from initial to final length. value max(0, final −
    initial). -/
theorem fam_ichthyology_growth_1 : (fmax 0 (200 - 150)) = 50 := by decide

/-- ichthyology: growth(100, 150) = 0 — GROWTH: the increase from initial to final length. value max(0, final −
    initial). -/
theorem fam_ichthyology_growth_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- ichthyology: buoyancy(5, 100) = 5 — BUOYANCY: swim bladder as a percentage of body. value ⌊bladder · 100 /
    body⌋. -/
theorem fam_ichthyology_buoyancy_1 : ((5 * 100) / 100) = 5 := by decide

/-- ichthyology: gillrate(900, 15) = 60 — GILL RATE: opercular beats over the minutes observed. value ⌊beats /
    minutes⌋. -/
theorem fam_ichthyology_gillrate_1 : (900 / 15) = 60 := by decide

/-- ichthyology: mortality(10, 100) = 10 — MORTALITY: dead as a percentage of the stock. value ⌊dead · 100 /
    stock⌋. -/
theorem fam_ichthyology_mortality_1 : ((10 * 100) / 100) = 10 := by decide

/-- ichthyology: trophic(4) = 4 — TROPHIC LEVEL: where the fish feeds in the food web. value level. -/
theorem fam_ichthyology_trophic_1 : 4 = 4 := by decide

/-- iconography: symbolcount(12, 8) = 20 -/
theorem fam_iconography_symbolcount_1 : (12 + 8) = 20 := by decide

/-- iconography: gesturetypes(5, 3) = 15 -/
theorem fam_iconography_gesturetypes_1 : (5 * 3) = 15 := by decide

/-- iconography: colorsubsets(6) = 64 -/
theorem fam_iconography_colorsubsets_1 : (2 ^ 6) = 64 := by decide

/-- iconography: haloforms(3, 2) = 5 -/
theorem fam_iconography_haloforms_1 : (3 + 2) = 5 := by decide

/-- iconography: canonratio(80, 100) = 80 -/
theorem fam_iconography_canonratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- idealism: mindcategories(12, 0) = 12 -/
theorem fam_idealism_mindcategories_1 : (12 + 0) = 12 := by decide

/-- idealism: phenomenasubsets(6) = 64 -/
theorem fam_idealism_phenomenasubsets_1 : (2 ^ 6) = 64 := by decide

/-- idealism: absolutelevels(3, 0) = 3 -/
theorem fam_idealism_absolutelevels_1 : (3 + 0) = 3 := by decide

/-- idealism: representationmodes(4, 3) = 12 -/
theorem fam_idealism_representationmodes_1 : (4 * 3) = 12 := by decide

/-- idealism: syntheticunity(90, 100) = 90 -/
theorem fam_idealism_syntheticunity_1 : ((90 * 100) / 100) = 90 := by decide

/-- identity: assurance(3, 4) = 75 — IDENTITY — WHO A REQUEST BELONGS TO, AS ARITHMETIC (chosen by the registry,
    not by hand). Verifying a person is numbers: the assurance level reached, how much a claim matches the
    record, how valid the presented documents are, how live the subject is, how unique they are in the pool,
    whether risk demands a step-up, how much the device attests, and how much a federated claim is verified. It
    INVOLVES OTHER FAMILIES: liveness and match confidence are what `biometrics` measures; attestation is what
    `firmware`/`driver`/`hardware` sign on a device; the step-up and federation are `auth`'s factors. Crosses to
    `auth` — identity is the subject auth decides on. A measure. */ const PROOF = 'identity arithmetic
    (assurance level, match confidence, document validity, liveness, uniqueness, step-up, device attestation,
    federation); it involves biometrics (liveness, match), firmware/driver/hardware (device attestation) and
    auth (step-up, federation); who a request belongs to, a measure crossed to auth' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'identity', dst: 'auth', formula, value, proof: PROOF, ...extra },
    holds, { name: `identity.${name}`, params }) export class IdentityFormulas { /** ASSURANCE LEVEL as a
    percentage: identity factors satisfied over factors required (NIST IAL as a ratio; involves auth). value
    ⌊factors · 100 / required⌋. -/
theorem fam_identity_assurance_1 : ((3 * 100) / 4) = 75 := by decide

/-- identity: assurance(0, 0) = 0 — IDENTITY — WHO A REQUEST BELONGS TO, AS ARITHMETIC (chosen by the registry,
    not by hand). Verifying a person is numbers: the assurance level reached, how much a claim matches the
    record, how valid the presented documents are, how live the subject is, how unique they are in the pool,
    whether risk demands a step-up, how much the device attests, and how much a federated claim is verified. It
    INVOLVES OTHER FAMILIES: liveness and match confidence are what `biometrics` measures; attestation is what
    `firmware`/`driver`/`hardware` sign on a device; the step-up and federation are `auth`'s factors. Crosses to
    `auth` — identity is the subject auth decides on. A measure. */ const PROOF = 'identity arithmetic
    (assurance level, match confidence, document validity, liveness, uniqueness, step-up, device attestation,
    federation); it involves biometrics (liveness, match), firmware/driver/hardware (device attestation) and
    auth (step-up, federation); who a request belongs to, a measure crossed to auth' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'identity', dst: 'auth', formula, value, proof: PROOF, ...extra },
    holds, { name: `identity.${name}`, params }) export class IdentityFormulas { /** ASSURANCE LEVEL as a
    percentage: identity factors satisfied over factors required (NIST IAL as a ratio; involves auth). value
    ⌊factors · 100 / required⌋. -/
theorem fam_identity_assurance_2 : ((0 * 100) / 0) = 0 := by decide

/-- identity: matchconfidence(18, 20) = 90 — MATCH CONFIDENCE as a percentage: claimed attributes matched to the
    record (involves biometrics match score). value ⌊matched · 100 / claimed⌋. -/
theorem fam_identity_matchconfidence_1 : ((18 * 100) / 20) = 90 := by decide

/-- identity: documentvalidity(9, 10) = 90 — DOCUMENT VALIDITY as a percentage: valid fields over required
    fields on the presented document. value ⌊valid · 100 / fields⌋. -/
theorem fam_identity_documentvalidity_1 : ((9 * 100) / 10) = 90 := by decide

/-- identity: liveness(49, 50) = 98 — LIVENESS as a percentage: live detections over check attempts (involves
    biometrics liveness). value ⌊detected · 100 / attempts⌋. -/
theorem fam_identity_liveness_1 : ((49 * 100) / 50) = 98 := by decide

/-- identity: uniqueness(997, 1000) = 99 — UNIQUENESS as a percentage: distinct identities over enrolled (dedup
    across the pool). value ⌊distinct · 100 / enrolled⌋. -/
theorem fam_identity_uniqueness_1 : ((997 * 100) / 1000) = 99 := by decide

/-- identity: attestation(45, 50) = 90 — ATTESTATION as a percentage: devices whose firmware/driver signed an
    attestation over devices seen (involves firmware/driver/hardware). value ⌊signed · 100 / devices⌋. -/
theorem fam_identity_attestation_1 : ((45 * 100) / 50) = 90 := by decide

/-- identity: federation(8, 10) = 80 — FEDERATION as a percentage: asserted claims a federated provider verified
    (involves auth federation). value ⌊verified · 100 / asserted⌋. -/
theorem fam_identity_federation_1 : ((8 * 100) / 10) = 80 := by decide

/-- immunology: titer(2, 3) = 16 — IMMUNOLOGY — THE IMMUNE RESPONSE, AS ARITHMETIC (chosen by the registry, not
    by hand). The response is numbers: the titer a serial dilution reaches, the antibody response over baseline,
    seroconversion and neutralization as percentages, the cell count per volume, the cytokine rise, binding
    affinity, and the fold boost. Crosses to `med` — immunology is what medicine measures. A measure. */ const
    PROOF = 'immunology arithmetic (titer, response, seroconversion, neutralization, cell count, cytokine,
    affinity, boost); the immune response as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'immunology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `immunology.${name}`, params }) export class ImmunologyFormulas { /** TITER: a serial dilution doubled some
    number of times. value dilution · 2^doublings. -/
theorem fam_immunology_titer_1 : (2 * (2 ^ 3)) = 16 := by decide

/-- immunology: response(1000, 200) = 800 — RESPONSE: antibodies over baseline, never below zero. value max(0,
    antibodies − baseline). -/
theorem fam_immunology_response_1 : (fmax 0 (1000 - 200)) = 800 := by decide

/-- immunology: seroconversion(90, 100) = 90 — SEROCONVERSION as a percentage. value ⌊converted · 100 / tested⌋. -/
theorem fam_immunology_seroconversion_1 : ((90 * 100) / 100) = 90 := by decide

/-- immunology: neutralization(45, 50) = 90 — NEUTRALIZATION as a percentage. value ⌊blocked · 100 / virus⌋. -/
theorem fam_immunology_neutralization_1 : ((45 * 100) / 50) = 90 := by decide

/-- immunology: cellcount(5000, 10) = 500 — CELL COUNT: cells per unit volume. value ⌊cells / volume⌋. -/
theorem fam_immunology_cellcount_1 : (5000 / 10) = 500 := by decide

/-- immunology: cytokine(150, 50) = 100 — CYTOKINE: level over baseline, never below zero. value max(0, level −
    baseline). -/
theorem fam_immunology_cytokine_1 : (fmax 0 (150 - 50)) = 100 := by decide

/-- immunology: affinity(300, 100) = 300 — AFFINITY: bound over free as a percentage. value ⌊bound · 100 /
    free⌋. -/
theorem fam_immunology_affinity_1 : ((300 * 100) / 100) = 300 := by decide

/-- immunology: boost(400, 100) = 400 — BOOST: the fold rise after over before, ·100. value ⌊after · 100 /
    before⌋. -/
theorem fam_immunology_boost_1 : ((400 * 100) / 100) = 400 := by decide

/-- incidence: rate(50, 100000) = 50 — INCIDENCE — NEW OCCURRENCE OF DISEASE, AS ARITHMETIC (a measure of how
    fast a condition appears in a population). Counting new cases is numbers: the rate per 100k, the cumulative
    incidence per 1000 at risk, the density per person-time, the relative risk between exposed and unexposed,
    the attributable-risk fraction, the odds ratio, the absolute risk difference, and the standardized ratio of
    observed to expected. Crosses to `epidemiology` — incidence is what epidemiology studies. A measure. */
    const PROOF = 'incidence arithmetic (incidence rate, cumulative incidence, person-time density, relative
    risk, attributable-risk fraction, odds ratio, risk difference, standardized ratio); new-case occurrence as a
    measure crossed to epidemiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'incidence', dst:
    'epidemiology', formula, value, proof: PROOF, ...extra }, holds, { name: `incidence.${name}`, params })
    export class IncidenceFormulas { /** INCIDENCE RATE: new cases per 100,000 of the population. value ⌊cases ·
    100000 / population⌋. -/
theorem fam_incidence_rate_1 : ((50 * 100000) / 100000) = 50 := by decide

/-- incidence: cumulative(25, 1000) = 25 — CUMULATIVE INCIDENCE: new cases per 1,000 of those at risk. value
    ⌊cases · 1000 / atRisk⌋. -/
theorem fam_incidence_cumulative_1 : ((25 * 1000) / 1000) = 25 := by decide

/-- incidence: persontime(30, 10000) = 30 — PERSON-TIME DENSITY: new cases per 10,000 person-time units. value
    ⌊cases · 10000 / time⌋. -/
theorem fam_incidence_persontime_1 : ((30 * 10000) / 10000) = 30 := by decide

/-- incidence: relativerisk(40, 10) = 400 — RELATIVE RISK: exposed risk over unexposed risk, as a percent. value
    ⌊exposed · 100 / unexposed⌋. -/
theorem fam_incidence_relativerisk_1 : ((40 * 100) / 10) = 400 := by decide

/-- incidence: attributablerisk(40, 10) = 75 — ATTRIBUTABLE-RISK FRACTION: the excess in the exposed, as a
    percent of the exposed risk. value ⌊max(0, exposed − unexposed) · 100 / exposed⌋. -/
theorem fam_incidence_attributablerisk_1 : (((fmax 0 (40 - 10)) * 100) / 40) = 75 := by decide

/-- incidence: oddsratio(200, 50) = 400 — ODDS RATIO: the cross-product ad over bc, as a percent. value ⌊ad ·
    100 / bc⌋. -/
theorem fam_incidence_oddsratio_1 : ((200 * 100) / 50) = 400 := by decide

/-- incidence: riskdifference(40, 10) = 30 — RISK DIFFERENCE: the absolute excess of exposed over unexposed.
    value max(0, exposed − unexposed). -/
theorem fam_incidence_riskdifference_1 : (fmax 0 (40 - 10)) = 30 := by decide

/-- incidence: standardized(120, 100) = 120 — STANDARDIZED RATIO: observed over expected cases, as a percent
    (SMR). value ⌊observed · 100 / expected⌋. -/
theorem fam_incidence_standardized_1 : ((120 * 100) / 100) = 120 := by decide

/-- incident: mttr(600, 8) = 75 — INCIDENT — RUNNING AN OUTAGE, AS ARITHMETIC (chosen by the operations
    registry, not by hand). Responding to failure is numbers: time to repair, time to acknowledge, the error
    budget left, how far the blast reaches, how bad it is, how much of the postmortem got done, how often it
    comes back, and whether it breached the SLA. Crosses to `reliability` — incident is what reliability is
    measured against. A measure. */ const PROOF = 'incident arithmetic (mttr, mtta, error budget, blast radius,
    severity, postmortem score, recurrence, SLA impact); the operations registry\'s uncovered domain; a measure
    crossed to reliability' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'incident', dst:
    'reliability', formula, value, proof: PROOF, ...extra }, holds, { name: `incident.${name}`, params }) export
    class IncidentFormulas { /** MEAN TIME TO REPAIR: total downtime minutes over the incidents. value ⌊downtime
    / incidents⌋. -/
theorem fam_incident_mttr_1 : (600 / 8) = 75 := by decide

/-- incident: mtta(450, 90) = 5 — MEAN TIME TO ACKNOWLEDGE: total ack minutes over the alerts. value ⌊acktime /
    alerts⌋. -/
theorem fam_incident_mtta_1 : (450 / 90) = 5 := by decide

/-- incident: errorbudget(1000, 250) = 750 — ERROR BUDGET LEFT: the budget minus what was consumed, never below
    zero. value max(0, budget − consumed). -/
theorem fam_incident_errorbudget_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- incident: blastradius(12, 500) = 6000 — BLAST RADIUS: services hit times the users on each. value services ·
    users. -/
theorem fam_incident_blastradius_1 : (12 * 500) = 6000 := by decide

/-- incident: severity(5, 4) = 20 — SEVERITY: impact weight times the scope. value impact · scope. -/
theorem fam_incident_severity_1 : (5 * 4) = 20 := by decide

/-- incident: postmortemscore(9, 10) = 90 — POSTMORTEM SCORE: action items done as a percentage. value ⌊done ·
    100 / actions⌋. -/
theorem fam_incident_postmortemscore_1 : ((9 * 100) / 10) = 90 := by decide

/-- incident: recurrence(24, 12) = 2 — RECURRENCE: how many times per period an incident returns. value ⌊count /
    months⌋. -/
theorem fam_incident_recurrence_1 : (24 / 12) = 2 := by decide

/-- indexing: selectivity(5, 1000) = 0 — INDEXING — THE DATABASE INDEX, AS ARITHMETIC. Choosing an index is
    numbers: how selective a predicate is, how distinct a column, the fan-out of a B-tree node, the depth of the
    tree, how much of a table a scan reads, whether an index covers a query, how bloated with dead rows, and the
    speedup an index buys. Crosses to `db` — indexing is what the database plans. A measure. */ const PROOF =
    'indexing arithmetic (selectivity, cardinality, fanout, tree depth, scan fraction, query coverage, dead-row
    bloat, index speedup); a measure crossed to db' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'indexing', dst: 'db', formula, value, proof: PROOF, ...extra }, holds, { name: `indexing.${name}`,
    params }) export class IndexingFormulas { /** SELECTIVITY: the fraction of rows a predicate matches, as a
    percentage. value ⌊matched · 100 / total⌋. -/
theorem fam_indexing_selectivity_1 : ((5 * 100) / 1000) = 0 := by decide

/-- indexing: cardinality(900, 1000) = 90 — CARDINALITY: distinct values over rows, as a percentage. value
    ⌊distinct · 100 / rows⌋. -/
theorem fam_indexing_cardinality_1 : ((900 * 100) / 1000) = 90 := by decide

/-- indexing: fanout(1000, 10) = 100 — FANOUT: keys per page of a B-tree node. value ⌊keys / pages⌋. -/
theorem fam_indexing_fanout_1 : (1000 / 10) = 100 := by decide

/-- indexing: depth(1000000, 100) = 10000 — DEPTH: a tree-depth proxy, entries over fan-out. value ⌊entries /
    fanout_⌋. -/
theorem fam_indexing_depth_1 : (1000000 / 100) = 10000 := by decide

/-- indexing: scan(250, 1000) = 25 — SCAN: the fraction of a table a scan reads, as a percentage. value ⌊read ·
    100 / total⌋. -/
theorem fam_indexing_scan_1 : ((250 * 100) / 1000) = 25 := by decide

/-- indexing: coverage(80, 100) = 80 — COVERAGE: the fraction of queries an index covers, as a percentage. value
    ⌊covered · 100 / queries⌋. -/
theorem fam_indexing_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- indexing: bloat(200, 1000) = 20 — BLOAT: dead rows over total, as a percentage. value ⌊dead · 100 / total⌋. -/
theorem fam_indexing_bloat_1 : ((200 * 100) / 1000) = 20 := by decide

/-- indexing: speedup(5000, 100) = 5000 — SPEEDUP: sequential cost over indexed cost, as a percentage. value
    ⌊sequential · 100 / indexed⌋. -/
theorem fam_indexing_speedup_1 : ((5000 * 100) / 100) = 5000 := by decide

/-- inductor: inductance(100, 1) = 100 -/
theorem fam_inductor_inductance_1 : (100 * 1) = 100 := by decide

/-- inductor: reactance(628, 10) = 6280 -/
theorem fam_inductor_reactance_1 : (628 * 10) = 6280 := by decide

/-- inductor: energy(100, 2) = 50 -/
theorem fam_inductor_energy_1 : (100 / 2) = 50 := by decide

/-- inductor: timeconstant(100, 10) = 10 -/
theorem fam_inductor_timeconstant_1 : (100 / 10) = 10 := by decide

/-- inductor: quality(100, 2) = 50 -/
theorem fam_inductor_quality_1 : (100 / 2) = 50 := by decide

/-- inductor: seriessum(100, 200) = 300 -/
theorem fam_inductor_seriessum_1 : (100 + 200) = 300 := by decide

/-- inductor: coupling(90, 100) = 90 -/
theorem fam_inductor_coupling_1 : ((90 * 100) / 100) = 90 := by decide

/-- inequality: giniscaled(40, 1) = 40 -/
theorem fam_inequality_giniscaled_1 : (40 / 1) = 40 := by decide

/-- inequality: quintileratio(800, 100) = 8 -/
theorem fam_inequality_quintileratio_1 : (800 / 100) = 8 := by decide

/-- inequality: palmaratio(200, 100) = 2 -/
theorem fam_inequality_palmaratio_1 : (200 / 100) = 2 := by decide

/-- inequality: lorenzgap(50, 40) = 10 -/
theorem fam_inequality_lorenzgap_1 : (fmax 0 (50 - 40)) = 10 := by decide

/-- inequality: topshare(20, 100) = 20 -/
theorem fam_inequality_topshare_1 : ((20 * 100) / 100) = 20 := by decide

/-- inequality: deciles(10, 0) = 10 -/
theorem fam_inequality_deciles_1 : (10 + 0) = 10 := by decide

/-- inequality: theilindex(350, 100) = 3 -/
theorem fam_inequality_theilindex_1 : (350 / 100) = 3 := by decide

/-- inflation: cpi(100, 3) = 300 -/
theorem fam_inflation_cpi_1 : (100 * 3) = 300 := by decide

/-- inflation: ratepct(4, 100) = 4 -/
theorem fam_inflation_ratepct_1 : ((4 * 100) / 100) = 4 := by decide

/-- inflation: realvalue(1000, 40) = 960 -/
theorem fam_inflation_realvalue_1 : (fmax 0 (1000 - 40)) = 960 := by decide

/-- inflation: pricelevel(100, 8) = 108 -/
theorem fam_inflation_pricelevel_1 : (100 + 8) = 108 := by decide

/-- inflation: purchasingpower(96, 100) = 96 -/
theorem fam_inflation_purchasingpower_1 : ((96 * 100) / 100) = 96 := by decide

/-- inflation: basketitems(80, 1) = 80 -/
theorem fam_inflation_basketitems_1 : (80 * 1) = 80 := by decide

/-- inflation: erosion(100, 96) = 4 -/
theorem fam_inflation_erosion_1 : (fmax 0 (100 - 96)) = 4 := by decide

/-- informatics: bandwidth(1000, 8) = 125 — INFORMATICS — INFORMATION MEASURED AS INTEGERS (the arithmetic a
    search index and a codec actually run). Entropy per symbol, bits from bytes, precision and recall of a
    retrieval, compression and redundancy of a code, the bandwidth of a link, the fan-in of an index. Crosses to
    `code` — informatics is what code measures of itself. A measure. */ const PROOF = 'informatics arithmetic
    (entropy, bits, precision, recall, compression, redundancy, bandwidth, index); information measured as
    integers; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'informatics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `informatics.${name}`, params }) export class InformaticsFormulas { /** BANDWIDTH: bits over seconds. value
    ⌊bits / seconds⌋. -/
theorem fam_informatics_bandwidth_1 : (1000 / 8) = 125 := by decide

/-- informatics: bits(10) = 80 — BITS from bytes, eight to the byte. value bytes · 8. -/
theorem fam_informatics_bits_1 : (10 * 8) = 80 := by decide

/-- informatics: compression(1000, 250) = 400 — COMPRESSION ratio as a percentage. value ⌊original · 100 /
    compressed⌋. -/
theorem fam_informatics_compression_1 : ((1000 * 100) / 250) = 400 := by decide

/-- informatics: entropy(1000, 8) = 125 — ENTROPY proxy: symbols over the distinct ones. value ⌊symbols /
    unique⌋. -/
theorem fam_informatics_entropy_1 : (1000 / 8) = 125 := by decide

/-- informatics: index(10000, 500) = 20 — INDEX fan-in: documents over terms. value ⌊documents / terms⌋. -/
theorem fam_informatics_index_1 : (10000 / 500) = 20 := by decide

/-- informatics: precision(80, 100) = 80 — PRECISION as a percentage. value ⌊relevant · 100 / retrieved⌋. -/
theorem fam_informatics_precision_1 : ((80 * 100) / 100) = 80 := by decide

/-- informatics: recall(80, 200) = 40 — RECALL as a percentage. value ⌊relevant · 100 / total⌋. -/
theorem fam_informatics_recall_1 : ((80 * 100) / 200) = 40 := by decide

/-- informatics: redundancy(30, 100) = 30 — REDUNDANCY as a percentage. value ⌊actual · 100 / maximum⌋. -/
theorem fam_informatics_redundancy_1 : ((30 * 100) / 100) = 30 := by decide

/-- ingestion: eventrate(6000, 60) = 100 — INGESTION — THE STREAM AT THE DOOR, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Taking events in is numbers: the rate they arrive, the pressure when they
    outrun capacity, how full the buffer is, the window watermark, the lag between produced and consumed, the
    batch size, the retry budget left, and the last checkpoint offset. Crosses to `caching` — ingestion is what
    fills the cache. A measure. */ const PROOF = 'ingestion arithmetic (event rate, backpressure, buffer fill,
    watermark, lag, batch size, retry budget, checkpoint); the registry\'s stream-door domain; a measure crossed
    to caching' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ingestion', dst: 'caching',
    formula, value, proof: PROOF, ...extra }, holds, { name: `ingestion.${name}`, params }) export class
    IngestionFormulas { /** EVENT RATE: events over the seconds they spanned. value ⌊events / seconds⌋. -/
theorem fam_ingestion_eventrate_1 : (6000 / 60) = 100 := by decide

/-- ingestion: backpressure(1200, 1000) = 200 — BACKPRESSURE: incoming that outruns capacity. value max(0,
    incoming − capacity). -/
theorem fam_ingestion_backpressure_1 : (fmax 0 (1200 - 1000)) = 200 := by decide

/-- ingestion: bufferfill(750, 1000) = 75 — BUFFER FILL as a percentage. value ⌊used · 100 / size⌋. -/
theorem fam_ingestion_bufferfill_1 : ((750 * 100) / 1000) = 75 := by decide

/-- ingestion: lag(10000, 9500) = 500 — LAG: produced that the consumer has not caught. value max(0, produced −
    consumed). -/
theorem fam_ingestion_lag_1 : (fmax 0 (10000 - 9500)) = 500 := by decide

/-- ingestion: retrybudget(2, 5) = 3 — RETRY BUDGET: attempts left under a cap. value max(0, max − attempts). -/
theorem fam_ingestion_retrybudget_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- ingestion: checkpoint(1050, 100) = 1000 — CHECKPOINT: the last offset aligned to an interval. value ⌊offset
    / interval⌋ · interval. -/
theorem fam_ingestion_checkpoint_1 : ((1050 / 100) * 100) = 1000 := by decide

/-- ingestion: backpressure(800, 1000) = 0 — BACKPRESSURE: incoming that outruns capacity. value max(0, incoming
    − capacity). -/
theorem fam_ingestion_backpressure_2 : (fmax 0 (800 - 1000)) = 0 := by decide

/-- inspection: defectrate(50, 1000) = 5 — INSPECTION — ACCEPTANCE QUALITY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Checking a lot is numbers: the defect rate, the sample a lot needs,
    defects per thousand, whether a lot is accepted, first-pass yield, rework minutes, scrap rate, and
    inspection coverage. Crosses to `quality` — inspection is how quality is measured. A measure. */ const PROOF
    = 'inspection arithmetic (defect rate, sampling, AQL per thousand, acceptance, first-pass yield, rework,
    scrap, coverage); an acceptance-quality domain; a measure crossed to quality' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'inspection', dst: 'quality', formula, value, proof: PROOF, ...extra }, holds, {
    name: `inspection.${name}`, params }) export class InspectionFormulas { /** DEFECT RATE as a percentage.
    value ⌊defects · 100 / total⌋. -/
theorem fam_inspection_defectrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- inspection: aql(4, 500) = 8 — AQL: defects per thousand sampled. value ⌊defects · 1000 / sampled⌋. -/
theorem fam_inspection_aql_1 : ((4 * 1000) / 500) = 8 := by decide

/-- inspection: firstpass(950, 1000) = 95 — FIRST-PASS YIELD as a percentage. value ⌊passed · 100 / total⌋. -/
theorem fam_inspection_firstpass_1 : ((950 * 100) / 1000) = 95 := by decide

/-- inspection: rework(20, 15) = 300 — REWORK: units at minutes each. value units · minutes. -/
theorem fam_inspection_rework_1 : (20 * 15) = 300 := by decide

/-- inspection: scrap(25, 1000) = 2 — SCRAP RATE as a percentage. value ⌊scrapped · 100 / total⌋. -/
theorem fam_inspection_scrap_1 : ((25 * 100) / 1000) = 2 := by decide

/-- inspection: coverage(800, 1000) = 80 — COVERAGE: the share of a lot inspected, as a percentage. value
    ⌊inspected · 100 / total⌋. -/
theorem fam_inspection_coverage_1 : ((800 * 100) / 1000) = 80 := by decide

/-- interaction: fitts(500, 10) = 5000 — INTERACTION — HUMAN-COMPUTER INTERACTION, AS ARITHMETIC. The press and
    the answer are numbers: Fitts's index of difficulty, response time, clicks per goal, gestures, feedback lag
    past a threshold, affordance discovery, task flow, and target size. Crosses to `layout` — interaction is
    what a layout is laid out for. A measure. */ const PROOF = 'interaction arithmetic (fitts index, response
    time, clicks per goal, gestures, feedback lag, affordance discovery, flow, target size); human-computer
    interaction as a measure crossed to layout' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'interaction', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name:
    `interaction.${name}`, params }) export class InteractionFormulas { /** FITTS INDEX OF DIFFICULTY proxy:
    distance over target width, scaled. value ⌊distance · 100 / width⌋. -/
theorem fam_interaction_fitts_1 : ((500 * 100) / 10) = 5000 := by decide

/-- interaction: responsetime(200) = 200 — RESPONSE TIME in milliseconds. value milliseconds. -/
theorem fam_interaction_responsetime_1 : 200 = 200 := by decide

/-- interaction: clicks(10, 2) = 5 — CLICKS PER GOAL: actions over the goals reached. value ⌊actions / goals⌋. -/
theorem fam_interaction_clicks_1 : (10 / 2) = 5 := by decide

/-- interaction: gestures(7) = 7 — GESTURES: the gesture count. value count. -/
theorem fam_interaction_gestures_1 : 7 = 7 := by decide

/-- interaction: feedback(300, 100) = 200 — FEEDBACK LAG past a threshold. value max(0, delay − threshold). -/
theorem fam_interaction_feedback_1 : (fmax 0 (300 - 100)) = 200 := by decide

/-- interaction: affordance(8, 10) = 80 — AFFORDANCE DISCOVERY as a percentage of what is available. value
    ⌊discovered · 100 / available⌋. -/
theorem fam_interaction_affordance_1 : ((8 * 100) / 10) = 80 := by decide

/-- interaction: flow(90, 10) = 90 — FLOW: completed tasks over the tasks attempted. value ⌊completed · 100 /
    (completed + interrupted)⌋. -/
theorem fam_interaction_flow_1 : ((90 * 100) / (90 + 10)) = 90 := by decide

/-- interaction: targetsize(44) = 44 — TARGET SIZE in pixels. value pixels. -/
theorem fam_interaction_targetsize_1 : 44 = 44 := by decide

/-- interestrate: simpleinterest(60000, 20) = 3000 -/
theorem fam_interestrate_simpleinterest_1 : (60000 / 20) = 3000 := by decide

/-- interestrate: apr(5, 100) = 5 -/
theorem fam_interestrate_apr_1 : ((5 * 100) / 100) = 5 := by decide

/-- interestrate: compoundperiods(12, 1) = 12 -/
theorem fam_interestrate_compoundperiods_1 : (12 * 1) = 12 := by decide

/-- interestrate: doublingyears(72, 8) = 9 -/
theorem fam_interestrate_doublingyears_1 : (72 / 8) = 9 := by decide

/-- interestrate: discountfactor(95, 100) = 95 -/
theorem fam_interestrate_discountfactor_1 : ((95 * 100) / 100) = 95 := by decide

/-- interestrate: yieldcurve(2, 3, 4) = 9 -/
theorem fam_interestrate_yieldcurve_1 : ((2 + 3) + 4) = 9 := by decide

/-- interestrate: spread(500, 350) = 150 -/
theorem fam_interestrate_spread_1 : (fmax 0 (500 - 350)) = 150 := by decide

/-- interestrate: realrate(5, 2) = 3 -/
theorem fam_interestrate_realrate_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- interference: beatfrequency(440, 435) = 5 — INTERFERENCE — SUPERPOSITION OF WAVES, AS ARITHMETIC. When two
    waves overlap, the result is numbers: amplitudes that add in phase or cancel out of phase, the visibility of
    the fringes, optical path through a medium, the phase difference a path buys, how many fringes fit a region,
    the path doubled through a thin film, and the beat two close frequencies make. Crosses to `electromagnetism`
    — interference is what light, the electromagnetic wave, does. A measure. */ const PROOF = 'interference
    arithmetic (constructive/destructive amplitude, fringe visibility, optical path, phase difference, fringe
    count, thin film, beat frequency); superposition of waves; a measure crossed to electromagnetism' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'interference', dst: 'electromagnetism', formula, value, proof:
    PROOF, ...extra }, holds, { name: `interference.${name}`, params }) export class InterferenceFormulas { /**
    BEAT FREQUENCY: the difference of two close frequencies. value max(0, f1 − f2). -/
theorem fam_interference_beatfrequency_1 : (fmax 0 (440 - 435)) = 5 := by decide

/-- interference: constructive(3, 4) = 7 — CONSTRUCTIVE: amplitudes add when the waves are in phase. value a1 +
    a2. -/
theorem fam_interference_constructive_1 : (3 + 4) = 7 := by decide

/-- interference: destructive(7, 2) = 5 — DESTRUCTIVE: amplitudes subtract when the waves are out of phase.
    value max(0, a1 − a2). -/
theorem fam_interference_destructive_1 : (fmax 0 (7 - 2)) = 5 := by decide

/-- interference: fringecount(1000, 25) = 40 — FRINGE COUNT: the fringes that fit a region at a spacing. value
    ⌊width / spacing⌋. -/
theorem fam_interference_fringecount_1 : (1000 / 25) = 40 := by decide

/-- interference: opticalpath(2, 500) = 1000 — OPTICAL PATH: refractive index times the geometric path. value n
    · d. -/
theorem fam_interference_opticalpath_1 : (2 * 500) = 1000 := by decide

/-- interference: phasedifference(250, 500) = 180 — PHASE DIFFERENCE: the degrees a path difference buys at a
    wavelength. value ⌊path · 360 / wavelength⌋. -/
theorem fam_interference_phasedifference_1 : ((250 * 360) / 500) = 180 := by decide

/-- interference: thinfilm(2, 150) = 600 — THIN FILM: the path difference doubled through a film of index n.
    value 2 · n · thickness. -/
theorem fam_interference_thinfilm_1 : ((2 * 2) * 150) = 600 := by decide

/-- interference: visibility(80, 20) = 60 — VISIBILITY: Michelson fringe visibility as a percentage. value
    ⌊(imax − imin) · 100 / (imax + imin)⌋. -/
theorem fam_interference_visibility_1 : (((80 - 20) * 100) / (80 + 20)) = 60 := by decide

/-- interleaving: depth(4, 8) = 32 — INTERLEAVING — SPREADING SYMBOLS SO A BURST OF NOISE HITS MANY CODEWORDS AT
    ONCE, AS ARITHMETIC. A block interleaver is a matrix: write by rows, read by columns, and an error burst is
    scattered. The numbers are depth, span, block size, the fill delay, the burst length it protects, the matrix
    cells, the spread factor, and the end-to-end latency. Crosses to `signal` — interleaving is how a channel's
    errors are reshaped before the signal is decoded. A measure. */ const PROOF = 'interleaving arithmetic
    (depth, span, block size, fill delay, burst protection, matrix cells, spread factor, latency); a
    block-interleaver matrix written by rows and read by columns; a measure crossed to signal' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'interleaving', dst: 'signal', formula, value, proof: PROOF,
    ...extra }, holds, { name: `interleaving.${name}`, params }) export class InterleavingFormulas { /** DEPTH:
    how deep the interleave reaches, streams at a stride. value streams · stride. -/
theorem fam_interleaving_depth_1 : (4 * 8) = 32 := by decide

/-- interleaving: span(32, 10) = 320 — SPAN: the symbols an interleave window covers, depth over symbols. value
    depth · symbols. -/
theorem fam_interleaving_span_1 : (32 * 10) = 320 := by decide

/-- interleaving: blocksize(1000, 8) = 125 — BLOCK SIZE: the symbols per block when a total is split into
    blocks. value ⌊total / blocks⌋. -/
theorem fam_interleaving_blocksize_1 : (1000 / 8) = 125 := by decide

/-- interleaving: delay(100, 4) = 25 — FILL DELAY: symbols buffered before readout, depth over the rate. value
    ⌊depth / rate⌋. -/
theorem fam_interleaving_delay_1 : (100 / 4) = 25 := by decide

/-- interleaving: burstprotection(50, 10) = 40 — BURST PROTECTION: the burst length the interleave survives,
    depth less the overhead. value max(0, depth − overhead). -/
theorem fam_interleaving_burstprotection_1 : (fmax 0 (50 - 10)) = 40 := by decide

/-- interleaving: matrixcells(16, 16) = 256 — MATRIX CELLS: the cells of the write/read matrix, rows by columns.
    value rows · cols. -/
theorem fam_interleaving_matrixcells_1 : (16 * 16) = 256 := by decide

/-- interleaving: spreadfactor(240, 8) = 30 — SPREAD FACTOR: how far apart adjacent symbols land, a distance
    over the symbols. value ⌊distance / symbols⌋. -/
theorem fam_interleaving_spreadfactor_1 : (240 / 8) = 30 := by decide

/-- interleaving: latency(32, 5) = 160 — LATENCY: end-to-end time to fill the interleave, depth symbols at a
    per-symbol period. value depth · period. -/
theorem fam_interleaving_latency_1 : (32 * 5) = 160 := by decide

/-- invariant: conditions(5, 3) = 8 -/
theorem fam_invariant_conditions_1 : (5 + 3) = 8 := by decide

/-- invariant: holdratio(100, 100) = 100 -/
theorem fam_invariant_holdratio_1 : ((100 * 100) / 100) = 100 := by decide

/-- invariant: clausesubsets(5) = 32 -/
theorem fam_invariant_clausesubsets_1 : (2 ^ 5) = 32 := by decide

/-- invariant: violations(10, 10) = 0 -/
theorem fam_invariant_violations_1 : (fmax 0 (10 - 10)) = 0 := by decide

/-- invariant: strengthlevels(3, 1) = 4 -/
theorem fam_invariant_strengthlevels_1 : (3 + 1) = 4 := by decide

/-- inverter: efficiency(950, 1000) = 95 — INVERTER — DC→AC POWER CONVERSION, AS ARITHMETIC (chosen by the
    hardware registry, not by hand). A power inverter is numbers: how efficiently it turns DC into AC, the AC
    power it delivers, the distortion it adds, the DC it draws, how hard it clips a peak, its apparent rating,
    the power it loses as heat, and its power factor. Crosses to `electrical` — an inverter is an electrical
    machine. A measure. */ const PROOF = 'inverter arithmetic (efficiency, AC power, THD, DC→AC conversion,
    clipping, VA rating, loss, power factor); a hardware domain crossed to electrical; a measure' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'inverter', dst: 'electrical', formula, value, proof: PROOF,
    ...extra }, holds, { name: `inverter.${name}`, params }) export class InverterFormulas { /** EFFICIENCY: AC
    output over DC input, as a percentage. value ⌊out · 100 / inp⌋. -/
theorem fam_inverter_efficiency_1 : ((950 * 100) / 1000) = 95 := by decide

/-- inverter: power(230, 10) = 2300 — AC POWER: voltage times current. value voltage · current. -/
theorem fam_inverter_power_1 : (230 * 10) = 2300 := by decide

/-- inverter: thd(5, 100) = 5 — TOTAL HARMONIC DISTORTION: harmonic content over the fundamental, as a
    percentage. value ⌊harmonics · 100 / fundamental⌋. -/
theorem fam_inverter_thd_1 : ((5 * 100) / 100) = 5 := by decide

/-- inverter: dcac(1000, 95) = 950 — DC→AC CONVERSION: AC power delivered from DC at an efficiency. value ⌊dc ·
    eff / 100⌋. -/
theorem fam_inverter_dcac_1 : ((1000 * 95) / 100) = 950 := by decide

/-- inverter: clipping(250, 230) = 20 — CLIPPING: how far a peak exceeds the rail. value max(0, peak − max). -/
theorem fam_inverter_clipping_1 : (fmax 0 (250 - 230)) = 20 := by decide

/-- inverter: clipping(200, 230) = 0 — CLIPPING: how far a peak exceeds the rail. value max(0, peak − max). -/
theorem fam_inverter_clipping_2 : (fmax 0 (200 - 230)) = 0 := by decide

/-- inverter: rating(1000, 80) = 800 — VA RATING: real power from apparent power at a power factor (percent).
    value ⌊va · pf / 100⌋. -/
theorem fam_inverter_rating_1 : ((1000 * 80) / 100) = 800 := by decide

/-- inverter: loss(1000, 950) = 50 — LOSS: the power lost as heat, input minus output. value max(0, inp − out). -/
theorem fam_inverter_loss_1 : (fmax 0 (1000 - 950)) = 50 := by decide

/-- inverter: powerfactor(800, 1000) = 80 — POWER FACTOR: real power over apparent power, as a percentage. value
    ⌊real · 100 / apparent⌋. -/
theorem fam_inverter_powerfactor_1 : ((800 * 100) / 1000) = 80 := by decide

/-- irrigation: requirement(500, 25) = 12500 — IRRIGATION — WATERING A FIELD, AS ARITHMETIC (chosen by the
    agronomy registry, not by hand). Watering is numbers: the water a field needs, how much of it reaches the
    roots, how long the valves run, the depth applied, the crop's demand, how evenly it lands, the total flow of
    the emitters, and the net need after rain. Crosses to `agriculture` — irrigation is what agriculture spends
    water on. A measure. */ const PROOF = 'irrigation arithmetic (water requirement, efficiency, valve runtime,
    applied depth, evapotranspiration, uniformity, flow, schedule); the agronomy registry\'s uncovered domain; a
    measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'irrigation', dst:
    'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `irrigation.${name}`, params })
    export class IrrigationFormulas { /** WATER REQUIREMENT: area at a depth each. value area · depth. -/
theorem fam_irrigation_requirement_1 : (500 * 25) = 12500 := by decide

/-- irrigation: efficiency(850, 1000) = 85 — EFFICIENCY as a percentage: water delivered to the roots over water
    applied. value ⌊delivered · 100 / applied⌋. -/
theorem fam_irrigation_efficiency_1 : ((850 * 100) / 1000) = 85 := by decide

/-- irrigation: runtime(6000, 50) = 120 — VALVE RUNTIME: the volume to apply at an emitter flow rate. value
    ⌊volume / rate⌋. -/
theorem fam_irrigation_runtime_1 : (6000 / 50) = 120 := by decide

/-- irrigation: application(10000, 500) = 20 — APPLIED DEPTH: volume spread over an area. value ⌊volume / area⌋. -/
theorem fam_irrigation_application_1 : (10000 / 500) = 20 := by decide

/-- irrigation: evapotranspiration(60, 90) = 54 — EVAPOTRANSPIRATION: reference ET scaled by a crop coefficient
    (percent). value ⌊et0 · coefficient / 100⌋. -/
theorem fam_irrigation_evapotranspiration_1 : ((60 * 90) / 100) = 54 := by decide

/-- irrigation: uniformity(80, 100) = 80 — DISTRIBUTION UNIFORMITY as a percentage: the lowest quarter over the
    mean. value ⌊min · 100 / mean⌋. -/
theorem fam_irrigation_uniformity_1 : ((80 * 100) / 100) = 80 := by decide

/-- irrigation: flowrate(200, 4) = 800 — FLOW: emitters at a per-emitter flow. value emitters · perEmitter. -/
theorem fam_irrigation_flowrate_1 : (200 * 4) = 800 := by decide

/-- irrigation: schedule(100, 30) = 70 — SCHEDULE: the net irrigation need after effective rainfall. value
    max(0, requirement − rainfall). -/
theorem fam_irrigation_schedule_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- irrigation: schedule(20, 30) = 0 — SCHEDULE: the net irrigation need after effective rainfall. value max(0,
    requirement − rainfall). -/
theorem fam_irrigation_schedule_2 : (fmax 0 (20 - 30)) = 0 := by decide
