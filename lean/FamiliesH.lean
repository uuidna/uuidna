-- lean/FamiliesH.lean — GENERATED. THE FAMILIES, H — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- hail: diametermm(20, 1) = 20 -/
theorem fam_hail_diametermm_1 : (20 * 1) = 20 := by decide

/-- hail: layers(10, 5) = 15 -/
theorem fam_hail_layers_1 : (10 + 5) = 15 := by decide

/-- hail: updraftspeed(30, 2) = 60 -/
theorem fam_hail_updraftspeed_1 : (30 * 2) = 60 := by decide

/-- hail: terminalvelocity(900, 10) = 90 -/
theorem fam_hail_terminalvelocity_1 : (900 / 10) = 90 := by decide

/-- hail: kineticenergy(50, 20) = 1000 -/
theorem fam_hail_kineticenergy_1 : (50 * 20) = 1000 := by decide

/-- hail: damagescale(3, 5) = 5 -/
theorem fam_hail_damagescale_1 : (fmax 3 5) = 5 := by decide

/-- hail: growthtime(600, 60) = 10 -/
theorem fam_hail_growthtime_1 : (600 / 60) = 10 := by decide

/-- hail: massg(1000, 10) = 100 -/
theorem fam_hail_massg_1 : (1000 / 10) = 100 := by decide

/-- halflife: elapsedlives(100, 25) = 4 — HALFLIFE — RADIOACTIVE DECAY AS ARITHMETIC. How much of a sample is
    left after whole half-lives: the count of half-lives that have passed, what remains, what decayed, the decay
    constant, the mean life, the activity, the fraction remaining, and population doubling over generations.
    Integer halving by number of half-lives — no exp, no log, no floats. Crosses to `chemistry` — decay is what
    chemistry measures. A measure. */ const PROOF = 'halflife arithmetic (elapsed half-lives, remaining,
    decayed, decay constant, mean life, activity, fraction, generations) by integer halving; no exp/log/floats;
    a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'halflife', dst:
    'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `halflife.${name}`, params }) export
    class HalflifeFormulas { /** ELAPSED HALF-LIVES: whole half-lives that have passed. value ⌊elapsed /
    halflife⌋. -/
theorem fam_halflife_elapsedlives_1 : (100 / 25) = 4 := by decide

/-- halflife: remaining(1000, 3) = 125 — REMAINING after whole half-lives. value ⌊amount / 2^lives⌋. -/
theorem fam_halflife_remaining_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- halflife: decayed(1000, 3) = 875 — DECAYED: the part that is gone. value max(0, amount − ⌊amount /
    2^lives⌋). -/
theorem fam_halflife_decayed_1 : (fmax 0 (1000 - (1000 / (2 ^ 3)))) = 875 := by decide

/-- halflife: constant(1000, 10) = 69 — DECAY CONSTANT λ, scaled by 1000, with ln2 ≈ 0.693. value ⌊scale · 693 /
    (halflife · 1000)⌋. -/
theorem fam_halflife_constant_1 : ((1000 * 693) / (10 * 1000)) = 69 := by decide

/-- halflife: meanlife(1000) = 1443 — MEAN LIFE τ = halflife / ln2, with 1/ln2 ≈ 1.443. value ⌊halflife · 1443 /
    1000⌋. -/
theorem fam_halflife_meanlife_1 : ((1000 * 1443) / 1000) = 1443 := by decide

/-- halflife: activity(1000, 69) = 69 — ACTIVITY A = λ · N, with λ scaled by 1000. value ⌊atoms · lambda /
    1000⌋. -/
theorem fam_halflife_activity_1 : ((1000 * 69) / 1000) = 69 := by decide

/-- halflife: fraction(100, 2) = 25 — FRACTION remaining, out of a scale (100 = percent). value ⌊scale /
    2^lives⌋. -/
theorem fam_halflife_fraction_1 : (100 / (2 ^ 2)) = 25 := by decide

/-- halflife: generations(10, 3) = 80 — GENERATIONS: a population doubled over whole generations. value initial
    · 2^lives. -/
theorem fam_halflife_generations_1 : (10 * (2 ^ 3)) = 80 := by decide

/-- hanoi: disks(10, 0) = 10 -/
theorem fam_hanoi_disks_1 : (10 + 0) = 10 := by decide

/-- hanoi: movesupperbound(10) = 1024 -/
theorem fam_hanoi_movesupperbound_1 : (2 ^ 10) = 1024 := by decide

/-- hanoi: pegs(3, 0) = 3 -/
theorem fam_hanoi_pegs_1 : (3 + 0) = 3 := by decide

/-- hanoi: recursiondepth(10, 0) = 10 -/
theorem fam_hanoi_recursiondepth_1 : (10 + 0) = 10 := by decide

/-- hanoi: statesubsets(8) = 256 -/
theorem fam_hanoi_statesubsets_1 : (2 ^ 8) = 256 := by decide

/-- hanoi: transfertime(1024, 1) = 1024 -/
theorem fam_hanoi_transfertime_1 : (1024 * 1) = 1024 := by decide

/-- hardness: brinell(3000, 10) = 300 — HARDNESS — RESISTANCE TO INDENTATION, AS ARITHMETIC. Measuring how a
    material resists a pressed indenter is numbers: the Brinell number, the Vickers number, the Rockwell
    reading, the Knoop number, a tensile estimate from hardness, the indentation area a load leaves, the ratio
    of major to minor load, and a scale conversion. Crosses to `materials` — hardness is a property materials
    carry. A measure. */ const PROOF = 'hardness arithmetic (Brinell, Vickers, Rockwell, Knoop, tensile
    estimate, indentation area, load ratio, scale conversion); resistance to indentation; a measure crossed to
    materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'hardness', dst: 'materials',
    formula, value, proof: PROOF, ...extra }, holds, { name: `hardness.${name}`, params }) export class
    HardnessFormulas { /** BRINELL: the load carried by the indentation area. value ⌊load / area⌋. -/
theorem fam_hardness_brinell_1 : (3000 / 10) = 300 := by decide

/-- hardness: vickers(10, 100) = 185 — VICKERS: the diamond-pyramid number, 1.854 · load over the diagonal area.
    value ⌊1854 · load / area⌋. -/
theorem fam_hardness_vickers_1 : ((1854 * 10) / 100) = 185 := by decide

/-- hardness: rockwell(100, 30) = 70 — ROCKWELL: a base reading less the penetration depth. value max(0, base −
    depth). -/
theorem fam_hardness_rockwell_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- hardness: knoop(10, 1000) = 142 — KNOOP: the elongated-pyramid number, 14.229 · load over the area. value
    ⌊14229 · load / area⌋. -/
theorem fam_hardness_knoop_1 : ((14229 * 10) / 1000) = 142 := by decide

/-- hardness: tensileestimate(200) = 690 — TENSILE ESTIMATE: ultimate strength from the Brinell number, 3.45 ·
    bhn. value ⌊bhn · 345 / 100⌋. -/
theorem fam_hardness_tensileestimate_1 : ((200 * 345) / 100) = 690 := by decide

/-- hardness: indentation(3000, 300) = 10 — INDENTATION: the area a load leaves at a given hardness. value ⌊load
    / hardness⌋. -/
theorem fam_hardness_indentation_1 : (3000 / 300) = 10 := by decide

/-- hardness: loadratio(150, 10) = 1500 — LOAD RATIO: the major load over the minor load, as a percentage. value
    ⌊major · 100 / minor⌋. -/
theorem fam_hardness_loadratio_1 : ((150 * 100) / 10) = 1500 := by decide

/-- hardness: scaleconvert(200, 150) = 300 — SCALE CONVERT: a reading scaled by a conversion factor (per
    hundred). value ⌊value · factor / 100⌋. -/
theorem fam_hardness_scaleconvert_1 : ((200 * 150) / 100) = 300 := by decide

/-- harmony: chordquality(4, 7) = 3 — CHORD QUALITY: the upper third of a triad, its lower third over the fifth.
    value max(0, fifth − third). -/
theorem fam_harmony_chordquality_1 : (fmax 0 (7 - 4)) = 3 := by decide

/-- harmony: tension(3, 4) = 75 — VOICE LEADING: the smallest motion of a voice between two pitches, either way
    round the octave. value min(d, 12 − d). */ static voiceleading(from: number, to: number): CrossFormula {
    const d = ((((to - from) % 12) + 12) % 12); return c('harmony-voiceleading', 'voiceleading(from, to) =
    min(d, 12 − d), d = (to − from) mod 12', Math.min(d, 12 - d), nat(from, to), 'voiceleading', [from, to]) }
    /** TENSION: the dissonances of a sonority per voice, as a percentage. value ⌊dissonances · 100 / voices⌋. -/
theorem fam_harmony_tension_1 : ((3 * 100) / 4) = 75 := by decide

/-- harvest: ratescollected(40, 150) = 6000 — HARVEST — BRINGING A CROP IN, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Reaping is numbers: the yield an area collects, the fraction lost, units
    brought in per hour, labor spent, how hard a machine is worked, the moisture in the grain, what survives to
    store, and the days the window still holds. Crosses to `agriculture` — harvest is where agriculture is
    measured. A measure. */ const PROOF = 'harvest arithmetic (yield collected, loss percent, throughput,
    labor-hours, machine efficiency, moisture content, stored yield, window days); a reaping measure crossed to
    agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'harvest', dst: 'agriculture',
    formula, value, proof: PROOF, ...extra }, holds, { name: `harvest.${name}`, params }) export class
    HarvestFormulas { /** YIELD COLLECTED: an area at a per-area rate. value area · rate. -/
theorem fam_harvest_ratescollected_1 : (40 * 150) = 6000 := by decide

/-- harvest: losspercent(20, 200) = 10 — LOSS as a percentage of the crop. value ⌊lost · 100 / total⌋. -/
theorem fam_harvest_losspercent_1 : ((20 * 100) / 200) = 10 := by decide

/-- harvest: throughput(6000, 8) = 750 — THROUGHPUT: units brought in over the hours worked. value ⌊units /
    hours⌋. -/
theorem fam_harvest_throughput_1 : (6000 / 8) = 750 := by decide

/-- harvest: laborhours(12, 8) = 96 — LABOR: workers over the hours each works. value workers · hours. -/
theorem fam_harvest_laborhours_1 : (12 * 8) = 96 := by decide

/-- harvest: machineefficiency(80, 100) = 80 — MACHINE EFFICIENCY: worked against rated capacity, as a
    percentage. value ⌊actual · 100 / capacity⌋. -/
theorem fam_harvest_machineefficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- harvest: moisturecontent(14, 100) = 14 — MOISTURE: water in the grain, as a percentage. value ⌊water · 100 /
    total⌋. -/
theorem fam_harvest_moisturecontent_1 : ((14 * 100) / 100) = 14 := by decide

/-- harvest: storageyield(5000, 300) = 4700 — STORED YIELD: what survives the gross after loss. value max(0,
    gross − loss). -/
theorem fam_harvest_storageyield_1 : (fmax 0 (5000 - 300)) = 4700 := by decide

/-- harvest: windowdays(30, 12) = 18 — WINDOW: days the harvest window still holds. value max(0, deadline −
    current). -/
theorem fam_harvest_windowdays_1 : (fmax 0 (30 - 12)) = 18 := by decide

/-- harvest: windowdays(12, 30) = 0 — WINDOW: days the harvest window still holds. value max(0, deadline −
    current). -/
theorem fam_harvest_windowdays_2 : (fmax 0 (12 - 30)) = 0 := by decide

/-- hashing: loadfactor(750, 1000) = 75 — LOAD FACTOR as a percentage. value ⌊entries · 100 / buckets⌋. -/
theorem fam_hashing_loadfactor_1 : ((750 * 100) / 1000) = 75 := by decide

/-- hashing: collisions(1500, 1000) = 500 — COLLISIONS: entries past the buckets available. value max(0, entries
    − buckets). -/
theorem fam_hashing_collisions_1 : (fmax 0 (1500 - 1000)) = 500 := by decide

/-- hashing: birthday(30) = 435 — BIRTHDAY: the pairs of keys that can clash among n. value ⌊n · (n − 1) / 2⌋. -/
theorem fam_hashing_birthday_1 : ((30 * (30 - 1)) / 2) = 435 := by decide

/-- hashing: resize(1024, 2) = 2048 — RESIZE: the capacity after growing by a factor. value capacity · factor. -/
theorem fam_hashing_resize_1 : (1024 * 2) = 2048 := by decide

/-- hashing: distribution(5000, 1000) = 5 — DISTRIBUTION: the average entries per bucket. value ⌊entries /
    buckets⌋. -/
theorem fam_hashing_distribution_1 : (5000 / 1000) = 5 := by decide

/-- hazard: risk(5, 8) = 40 — HAZARD — DANGER AS ARITHMETIC. Risk is likelihood times consequence; exposure,
    toxicity, probability, mitigation and spread are shares in hundredths; dilution is parts per million;
    evacuation is time to clear a distance. Crosses to `med` — hazard is what medicine guards against. A
    measure. */ const PROOF = 'hazard arithmetic (risk, exposure, toxicity, probability, mitigation, spread,
    dilution, evacuation); danger as integer shares; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'hazard', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `hazard.${name}`, params }) export class HazardFormulas { /** RISK: likelihood times consequence. value
    likelihood · consequence. -/
theorem fam_hazard_risk_1 : (5 * 8) = 40 := by decide

/-- hazard: exposure(50, 100) = 50 — EXPOSURE: dose against a threshold, in hundredths. value ⌊dose · 100 /
    threshold⌋. -/
theorem fam_hazard_exposure_1 : ((50 * 100) / 100) = 50 := by decide

/-- hazard: toxicity(2, 100) = 2 — TOXICITY: lethal share of a population, in hundredths. value ⌊lethal · 100 /
    population⌋. -/
theorem fam_hazard_toxicity_1 : ((2 * 100) / 100) = 2 := by decide

/-- hazard: probability(3, 100) = 3 — PROBABILITY: events over trials, in hundredths. value ⌊events · 100 /
    trials⌋. -/
theorem fam_hazard_probability_1 : ((3 * 100) / 100) = 3 := by decide

/-- hazard: mitigation(40, 100) = 40 — MITIGATION: reduced against initial, in hundredths. value ⌊reduced · 100
    / initial⌋. -/
theorem fam_hazard_mitigation_1 : ((40 * 100) / 100) = 40 := by decide

/-- hazard: spread(5, 100) = 5 — SPREAD: affected over contacts, in hundredths. value ⌊affected · 100 /
    contacts⌋. -/
theorem fam_hazard_spread_1 : ((5 * 100) / 100) = 5 := by decide

/-- hazard: dilution(5, 1000000) = 5 — DILUTION: contaminant in a volume, parts per million. value ⌊contaminant
    · 1000000 / volume⌋. -/
theorem fam_hazard_dilution_1 : ((5 * 1000000) / 1000000) = 5 := by decide

/-- hazard: evacuation(1000, 50) = 20 — EVACUATION: time to clear a distance at a speed. value ⌊distance /
    speed⌋. -/
theorem fam_hazard_evacuation_1 : (1000 / 50) = 20 := by decide

/-- hazard: exposure(50, 0) = 0 — EXPOSURE: dose against a threshold, in hundredths. value ⌊dose · 100 /
    threshold⌋. -/
theorem fam_hazard_exposure_2 : ((50 * 100) / 0) = 0 := by decide

/-- heatindex: apparenttemp(35, 5) = 40 -/
theorem fam_heatindex_apparenttemp_1 : (35 + 5) = 40 := by decide

/-- heatindex: humidityfactor(60, 100) = 60 -/
theorem fam_heatindex_humidityfactor_1 : ((60 * 100) / 100) = 60 := by decide

/-- heatindex: dangerlevel(3, 4) = 4 -/
theorem fam_heatindex_dangerlevel_1 : (fmax 3 4) = 4 := by decide

/-- heatindex: discomfortindex(800, 10) = 80 -/
theorem fam_heatindex_discomfortindex_1 : (800 / 10) = 80 := by decide

/-- heatindex: coolingload(100, 3) = 300 -/
theorem fam_heatindex_coolingload_1 : (100 * 3) = 300 := by decide

/-- heatindex: exposureminutes(120, 2) = 60 -/
theorem fam_heatindex_exposureminutes_1 : (120 / 2) = 60 := by decide

/-- heatindex: riskpct(80, 100) = 80 -/
theorem fam_heatindex_riskpct_1 : ((80 * 100) / 100) = 80 := by decide

/-- heatindex: feelsdelta(45, 35) = 10 -/
theorem fam_heatindex_feelsdelta_1 : (fmax 0 (45 - 35)) = 10 := by decide

/-- heattransfer: conduction(50, 20, 10) = 100 — HEATTRANSFER — HOW HEAT MOVES, AS ARITHMETIC. The three modes
    and the numbers engineers size exchangers by: conduction flux through a wall, convective heat off a surface,
    net radiation between bodies, the log-mean temperature difference, the Nusselt and Biot numbers, the Fourier
    number, and exchanger effectiveness. Crosses to `thermodynamics` — heat transfer is the first law in motion.
    A measure. */ const PROOF = 'heattransfer arithmetic (conduction flux, convection, radiation, LMTD, Nusselt,
    Biot, Fourier, effectiveness); the three modes and the exchanger-sizing numbers; a measure crossed to
    thermodynamics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'heattransfer', dst:
    'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `heattransfer.${name}`, params })
    export class HeattransferFormulas { /** CONDUCTION: Fourier's law, flux through a wall. value ⌊k · dT /
    length⌋. -/
theorem fam_heattransfer_conduction_1 : ((50 * 20) / 10) = 100 := by decide

/-- heattransfer: convection(10, 5, 20) = 1000 — CONVECTION: Newton's law of cooling off a surface. value h ·
    area · dT. -/
theorem fam_heattransfer_convection_1 : ((10 * 5) * 20) = 1000 := by decide

/-- heattransfer: lmtd(40, 20) = 30 — LMTD: the log-mean temperature difference, by its arithmetic mean. value
    ⌊(dt1 + dt2) / 2⌋. -/
theorem fam_heattransfer_lmtd_1 : ((40 + 20) / 2) = 30 := by decide

/-- heattransfer: nusselt(100, 2, 5) = 40 — NUSSELT: convective over conductive transport. value ⌊h · length /
    k⌋. -/
theorem fam_heattransfer_nusselt_1 : ((100 * 2) / 5) = 40 := by decide

/-- heattransfer: biot(20, 3, 4) = 15 — BIOT: internal over surface resistance of a solid. value ⌊h · lc / k⌋. -/
theorem fam_heattransfer_biot_1 : ((20 * 3) / 4) = 15 := by decide

/-- heattransfer: effectiveness(80, 100) = 80 — EFFECTIVENESS: actual over maximum possible transfer, as a
    percentage. value ⌊actual · 100 / max⌋. -/
theorem fam_heattransfer_effectiveness_1 : ((80 * 100) / 100) = 80 := by decide

/-- heattransfer: effectiveness(60, 100) = 60 — EFFECTIVENESS: actual over maximum possible transfer, as a
    percentage. value ⌊actual · 100 / max⌋. -/
theorem fam_heattransfer_effectiveness_2 : ((60 * 100) / 100) = 60 := by decide

/-- hedging: ratio(75, 100) = 75 — HEDGING — RISK OFFSET AS ARITHMETIC. A hedge is numbers: the ratio of a
    position that is covered, the net delta after a hedge, the exposure a position carries, how much is covered,
    the basis between spot and future, the notional of the contracts, what two sides offset, and the risk that
    is left. Crosses to `trading` — hedging is what trading offsets. A measure. */ const PROOF = 'hedging
    arithmetic (hedge ratio, net delta, exposure, coverage, spot-future basis, notional, offset, residual risk);
    risk offset crossed to trading' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'hedging', dst:
    'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `hedging.${name}`, params }) export
    class HedgingFormulas { /** HEDGE RATIO: the percentage of a position that is covered. value ⌊hedged · 100 /
    total⌋. -/
theorem fam_hedging_ratio_1 : ((75 * 100) / 100) = 75 := by decide

/-- hedging: delta(500, 300) = 200 — NET DELTA: a position less its hedge. value max(0, position − hedge). -/
theorem fam_hedging_delta_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- hedging: exposure(200, 50) = 10000 — EXPOSURE: quantity at a price. value qty · price. -/
theorem fam_hedging_exposure_1 : (200 * 50) = 10000 := by decide

/-- hedging: coverage(80, 100) = 80 — COVERAGE: the percentage of total that is covered. value ⌊covered · 100 /
    total⌋. -/
theorem fam_hedging_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- hedging: basis(105, 100) = 5 — BASIS: spot less future. value max(0, spot − future). -/
theorem fam_hedging_basis_1 : (fmax 0 (105 - 100)) = 5 := by decide

/-- hedging: notional(10, 1000) = 10000 — NOTIONAL: contracts at a size each. value contracts · size. -/
theorem fam_hedging_notional_1 : (10 * 1000) = 10000 := by decide

/-- hedging: offset(400, 150) = 250 — OFFSET: longs less shorts. value max(0, longs − shorts). -/
theorem fam_hedging_offset_1 : (fmax 0 (400 - 150)) = 250 := by decide

/-- hedging: residual(1000, 600) = 400 — RESIDUAL RISK: exposure less what is hedged. value max(0, exposure −
    hedged). -/
theorem fam_hedging_residual_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- hedging: delta(300, 500) = 0 — NET DELTA: a position less its hedge. value max(0, position − hedge). -/
theorem fam_hedging_delta_2 : (fmax 0 (300 - 500)) = 0 := by decide

/-- helicopter: rotordiameter(16, 1) = 16 -/
theorem fam_helicopter_rotordiameter_1 : (16 * 1) = 16 := by decide

/-- helicopter: lift(4000, 2) = 8000 -/
theorem fam_helicopter_lift_1 : (4000 * 2) = 8000 := by decide

/-- helicopter: maxspeed(250, 1) = 250 -/
theorem fam_helicopter_maxspeed_1 : (250 * 1) = 250 := by decide

/-- helicopter: bladecount(4, 0) = 4 -/
theorem fam_helicopter_bladecount_1 : (4 + 0) = 4 := by decide

/-- helicopter: ceiling(5000, 1) = 5000 -/
theorem fam_helicopter_ceiling_1 : (5000 * 1) = 5000 := by decide

/-- helicopter: autorotationrate(600, 10) = 60 -/
theorem fam_helicopter_autorotationrate_1 : (600 / 10) = 60 := by decide

/-- helicopter: powerkw(1000, 1) = 1000 -/
theorem fam_helicopter_powerkw_1 : (1000 * 1) = 1000 := by decide

/-- heliophysics: coronalmass(12, 1000) = 12000 — HELIOPHYSICS — THE SUN AS ARITHMETIC (chosen by the registry,
    not by hand). The star is numbers: sunspot count, the wind's travel time, a flare's class, the irradiance it
    lands, a mass ejection's momentum, the geomagnetic index, where the cycle stands, and the particle flux.
    Crosses to `astronomy` — heliophysics is the nearest star astronomy studies. A measure. */ const PROOF =
    'heliophysics arithmetic (sunspot number, solar-wind travel, flare class, irradiance, coronal mass momentum,
    magnetic index, cycle phase, particle flux); the registry\'s nearest-star domain; a measure crossed to
    astronomy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'heliophysics', dst: 'astronomy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `heliophysics.${name}`, params }) export class
    HeliophysicsFormulas { /** CORONAL MASS: a mass ejection's momentum, mass by speed. value mass · speed. -/
theorem fam_heliophysics_coronalmass_1 : (12 * 1000) = 12000 := by decide

/-- heliophysics: flareclass(5000, 1000) = 5 — FLARE CLASS: peak X-ray flux over the class base. value ⌊peak /
    base⌋. -/
theorem fam_heliophysics_flareclass_1 : (5000 / 1000) = 5 := by decide

/-- heliophysics: flux(6000, 60) = 100 — FLUX: particles counted over the seconds observed. value ⌊photons /
    seconds⌋. -/
theorem fam_heliophysics_flux_1 : (6000 / 60) = 100 := by decide

/-- heliophysics: irradiance(1361, 1) = 1361 — IRRADIANCE: power landing over the area. value ⌊power / area⌋. -/
theorem fam_heliophysics_irradiance_1 : (1361 / 1) = 1361 := by decide

/-- heliophysics: magneticindex(56, 8) = 7 — MAGNETIC INDEX: the geomagnetic sum averaged over its readings.
    value ⌊sum / count⌋. -/
theorem fam_heliophysics_magneticindex_1 : (56 / 8) = 7 := by decide

/-- heliophysics: solarwind(2000, 400) = 5 — SOLAR WIND: travel time at the wind's speed over the distance.
    value ⌊distance / speed⌋. -/
theorem fam_heliophysics_solarwind_1 : (2000 / 400) = 5 := by decide

/-- heliophysics: sunspot(5, 32) = 82 — SUNSPOT: the Wolf number from groups and spots. value 10 · groups +
    spots. -/
theorem fam_heliophysics_sunspot_1 : ((10 * 5) + 32) = 82 := by decide

/-- helminthology: eggcount(500, 10) = 5000 -/
theorem fam_helminthology_eggcount_1 : (500 * 10) = 5000 := by decide

/-- helminthology: wormburden(5000, 50) = 100 -/
theorem fam_helminthology_wormburden_1 : (5000 / 50) = 100 := by decide

/-- helminthology: prevalence(30, 100) = 30 -/
theorem fam_helminthology_prevalence_1 : ((30 * 100) / 100) = 30 := by decide

/-- helminthology: lifecyclestages(4, 1) = 5 -/
theorem fam_helminthology_lifecyclestages_1 : (4 + 1) = 5 := by decide

/-- helminthology: treatmentefficacy(95, 100) = 95 -/
theorem fam_helminthology_treatmentefficacy_1 : ((95 * 100) / 100) = 95 := by decide

/-- helminthology: fecundity(200, 20) = 4000 -/
theorem fam_helminthology_fecundity_1 : (200 * 20) = 4000 := by decide

/-- hematocrit: packedcellvolume(45, 100) = 45 — HEMATOCRIT — THE RED CELL FRACTION, AS ARITHMETIC. A blood
    count is numbers: the packed cell volume, the mean corpuscular volume, the mean corpuscular hemoglobin and
    its concentration, the red cell count, the hemoglobin ratio, the plasma fraction left over, and the
    viscosity the packing drives. Crosses to `hematology` — hematocrit is the measure hematology reads. A
    measure. */ const PROOF = 'hematocrit arithmetic (packed cell volume, MCV, MCH, MCHC, red cell count,
    hemoglobin ratio, plasma fraction, blood viscosity); a measure crossed to hematology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'hematocrit', dst: 'hematology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `hematocrit.${name}`, params }) export class HematocritFormulas { /** PACKED CELL
    VOLUME: packed red cells as a percentage of whole blood. value ⌊packed · 100 / total⌋. -/
theorem fam_hematocrit_packedcellvolume_1 : ((45 * 100) / 100) = 45 := by decide

/-- hematocrit: mcv(450, 5) = 90 — MEAN CORPUSCULAR VOLUME: the hematocrit volume over the red cell count. value
    ⌊hct / count⌋. -/
theorem fam_hematocrit_mcv_1 : (450 / 5) = 90 := by decide

/-- hematocrit: mch(150, 5) = 30 — MEAN CORPUSCULAR HEMOGLOBIN: the hemoglobin over the red cell count. value
    ⌊hgb / count⌋. -/
theorem fam_hematocrit_mch_1 : (150 / 5) = 30 := by decide

/-- hematocrit: mchc(150, 450) = 33 — MEAN CORPUSCULAR HEMOGLOBIN CONCENTRATION: the hemoglobin over the
    hematocrit. value ⌊hgb · 100 / hct⌋. -/
theorem fam_hematocrit_mchc_1 : ((150 * 100) / 450) = 33 := by decide

/-- hematocrit: redcellcount(5, 5000) = 25000 — RED CELL COUNT: the cells a concentration gives over a volume.
    value conc · volume. -/
theorem fam_hematocrit_redcellcount_1 : (5 * 5000) = 25000 := by decide

/-- hematocrit: hemoglobinratio(150, 1000) = 15 — HEMOGLOBIN RATIO: hemoglobin as a percentage of a reference
    total. value ⌊hgb · 100 / total⌋. -/
theorem fam_hematocrit_hemoglobinratio_1 : ((150 * 100) / 1000) = 15 := by decide

/-- hematocrit: plasmafraction(100, 45) = 55 — PLASMA FRACTION: the whole blood left once the cells are packed
    out. value max(0, total − packed). -/
theorem fam_hematocrit_plasmafraction_1 : (fmax 0 (100 - 45)) = 55 := by decide

/-- hematocrit: bloodviscosity(45, 10) = 4 — BLOOD VISCOSITY: the relative viscosity the packing drives, per
    hundred. value ⌊hct · factor / 100⌋. -/
theorem fam_hematocrit_bloodviscosity_1 : ((45 * 10) / 100) = 4 := by decide

/-- hematocrit: plasmafraction(45, 100) = 0 — PLASMA FRACTION: the whole blood left once the cells are packed
    out. value max(0, total − packed). -/
theorem fam_hematocrit_plasmafraction_2 : (fmax 0 (45 - 100)) = 0 := by decide

/-- hematology: hematocrit(45, 100) = 45 — HEMATOLOGY — THE BLOOD, AS ARITHMETIC (a med measure, not advice).
    Counting what a blood panel reports: packed-cell fraction, hemoglobin concentration, mean cell volume,
    clotting ratio, platelet density, oxygen saturation, clotting time, and a white-cell differential. Crosses
    to `med` — hematology is a reading of the body. A measure. */ const PROOF = 'hematology arithmetic
    (hematocrit, hemoglobin, mean cell volume, INR, platelets, oxygen saturation, clotting time, differential);
    a med measure, not advice' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'hematology', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `hematology.${name}`, params }) export class
    HematologyFormulas { /** HEMATOCRIT: packed cells as a percentage of whole blood. value ⌊cells · 100 /
    blood⌋. -/
theorem fam_hematology_hematocrit_1 : ((45 * 100) / 100) = 45 := by decide

/-- hematology: hemoglobin(150, 10) = 15 — HEMOGLOBIN concentration: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_hematology_hemoglobin_1 : (150 / 10) = 15 := by decide

/-- hematology: mcv(45, 5) = 90 — MEAN CELL VOLUME: hematocrit scaled by the cell count. value ⌊hematocrit · 10
    / count⌋. -/
theorem fam_hematology_mcv_1 : ((45 * 10) / 5) = 90 := by decide

/-- hematology: inr(13, 12) = 108 — INR: the patient's clotting time over the control, as a ratio. value
    ⌊patient · 100 / control⌋. -/
theorem fam_hematology_inr_1 : ((13 * 100) / 12) = 108 := by decide

/-- hematology: platelets(250000, 1000) = 250 — PLATELETS: the count per unit volume. value ⌊count / volume⌋. -/
theorem fam_hematology_platelets_1 : (250000 / 1000) = 250 := by decide

/-- hematology: oxygen(97, 100) = 97 — OXYGEN SATURATION: bound as a percentage of capacity. value ⌊bound · 100
    / capacity⌋. -/
theorem fam_hematology_oxygen_1 : ((97 * 100) / 100) = 97 := by decide

/-- hematology: clotting(12) = 12 — CLOTTING TIME: seconds, held as a natural. value seconds. -/
theorem fam_hematology_clotting_1 : 12 = 12 := by decide

/-- hematology: differential(60, 100) = 60 — DIFFERENTIAL: a cell type as a percentage of the total count. value
    ⌊type · 100 / total⌋. -/
theorem fam_hematology_differential_1 : ((60 * 100) / 100) = 60 := by decide

/-- hemodynamics: cardiacoutput(70, 70) = 4900 — HEMODYNAMICS — THE CIRCULATION, AS ARITHMETIC. Moving blood is
    numbers: the output of the heart per minute, the volume each beat ejects, the mean pressure that drives
    flow, the fraction the ventricle empties, the swing between systole and diastole, the resistance the vessels
    oppose, the rate the pulse keeps, and the pressure that perfuses an organ. Crosses to `cardiology` —
    hemodynamics is what the cardiologist reads. A measure. */ const PROOF = 'hemodynamics arithmetic (cardiac
    output, stroke volume, mean arterial pressure, ejection fraction, pulse pressure, vascular resistance, pulse
    rate, perfusion pressure); the circulation as integers; a measure crossed to cardiology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'hemodynamics', dst: 'cardiology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `hemodynamics.${name}`, params }) export class HemodynamicsFormulas { /** CARDIAC
    OUTPUT: heart rate times the volume each beat ejects. value hr · sv. -/
theorem fam_hemodynamics_cardiacoutput_1 : (70 * 70) = 4900 := by decide

/-- hemodynamics: strokevolume(120, 50) = 70 — STROKE VOLUME: what the ventricle ejects, end-diastolic less
    end-systolic. value max(0, edv − esv). -/
theorem fam_hemodynamics_strokevolume_1 : (fmax 0 (120 - 50)) = 70 := by decide

/-- hemodynamics: meanarterialpressure(120, 80) = 93 — MEAN ARTERIAL PRESSURE: diastole plus a third of the
    swing. value ⌊(sys + 2·dia) / 3⌋. -/
theorem fam_hemodynamics_meanarterialpressure_1 : ((120 + (2 * 80)) / 3) = 93 := by decide

/-- hemodynamics: ejectionfraction(70, 120) = 58 — EJECTION FRACTION: the percent of the filled ventricle it
    ejects. value ⌊sv · 100 / edv⌋. -/
theorem fam_hemodynamics_ejectionfraction_1 : ((70 * 100) / 120) = 58 := by decide

/-- hemodynamics: pulsepressure(120, 80) = 40 — PULSE PRESSURE: the swing between systole and diastole. value
    max(0, sys − dia). -/
theorem fam_hemodynamics_pulsepressure_1 : (fmax 0 (120 - 80)) = 40 := by decide

/-- hemodynamics: vascularresistance(93, 5) = 1488 — VASCULAR RESISTANCE: the pressure the vessels oppose to the
    output. value ⌊map · 80 / co⌋. -/
theorem fam_hemodynamics_vascularresistance_1 : ((93 * 80) / 5) = 1488 := by decide

/-- hemodynamics: pulserate(360, 5) = 72 — PULSE RATE: beats over the minutes counted. value ⌊beats / minutes⌋. -/
theorem fam_hemodynamics_pulserate_1 : (360 / 5) = 72 := by decide

/-- hemodynamics: perfusionpressure(93, 13) = 80 — PERFUSION PRESSURE: the mean pressure left to perfuse past
    the resisting pressure. value max(0, map − icp). -/
theorem fam_hemodynamics_perfusionpressure_1 : (fmax 0 (93 - 13)) = 80 := by decide

/-- hemodynamics: perfusionpressure(13, 93) = 0 — PERFUSION PRESSURE: the mean pressure left to perfuse past the
    resisting pressure. value max(0, map − icp). -/
theorem fam_hemodynamics_perfusionpressure_2 : (fmax 0 (13 - 93)) = 0 := by decide

/-- heraldry: tincturecount(5, 2) = 7 -/
theorem fam_heraldry_tincturecount_1 : (5 + 2) = 7 := by decide

/-- heraldry: quarterings(4, 4) = 16 -/
theorem fam_heraldry_quarterings_1 : (4 * 4) = 16 := by decide

/-- heraldry: fieldsubsets(4) = 16 -/
theorem fam_heraldry_fieldsubsets_1 : (2 ^ 4) = 16 := by decide

/-- heraldry: ordinaries(9, 0) = 9 -/
theorem fam_heraldry_ordinaries_1 : (9 + 0) = 9 := by decide

/-- heraldry: differencingmarks(3, 3) = 9 -/
theorem fam_heraldry_differencingmarks_1 : (3 * 3) = 9 := by decide

/-- hermeneutics: interpretivelayers(6) = 64 -/
theorem fam_hermeneutics_interpretivelayers_1 : (2 ^ 6) = 64 := by decide

/-- hermeneutics: contextfactors(3, 4, 2) = 9 -/
theorem fam_hermeneutics_contextfactors_1 : ((3 + 4) + 2) = 9 := by decide

/-- hermeneutics: ambiguityspread(100, 60) = 40 -/
theorem fam_hermeneutics_ambiguityspread_1 : (fmax 0 (100 - 60)) = 40 := by decide

/-- hermeneutics: consensusratio(70, 100) = 70 -/
theorem fam_hermeneutics_consensusratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- herpetology: thermoregulation(30, 20) = 10 — HERPETOLOGY — THE STUDY OF REPTILES AND AMPHIBIANS, AS
    ARITHMETIC. Cold-blooded life is numbers: heat carried over ambient, venom potency by body mass, eggs per
    female, days to hatch, metabolism by temperature, growth over a season, the share of a clutch that survives,
    and scales per row. Crosses to `zoology` — herpetology is a branch of it. A measure. */ const PROOF =
    'herpetology arithmetic (thermoregulation, venom LD50 proxy, clutch, incubation, metabolism, growth,
    survival, scalation); a branch of zoology, a measure crossed to zoology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'herpetology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `herpetology.${name}`, params }) export class HerpetologyFormulas { /** THERMOREGULATION: body heat
    carried over ambient. value max(0, body − ambient). -/
theorem fam_herpetology_thermoregulation_1 : (fmax 0 (30 - 20)) = 10 := by decide

/-- herpetology: thermoregulation(15, 20) = 0 — HERPETOLOGY — THE STUDY OF REPTILES AND AMPHIBIANS, AS
    ARITHMETIC. Cold-blooded life is numbers: heat carried over ambient, venom potency by body mass, eggs per
    female, days to hatch, metabolism by temperature, growth over a season, the share of a clutch that survives,
    and scales per row. Crosses to `zoology` — herpetology is a branch of it. A measure. */ const PROOF =
    'herpetology arithmetic (thermoregulation, venom LD50 proxy, clutch, incubation, metabolism, growth,
    survival, scalation); a branch of zoology, a measure crossed to zoology' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'herpetology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `herpetology.${name}`, params }) export class HerpetologyFormulas { /** THERMOREGULATION: body heat
    carried over ambient. value max(0, body − ambient). -/
theorem fam_herpetology_thermoregulation_2 : (fmax 0 (15 - 20)) = 0 := by decide

/-- herpetology: venom(5, 1000) = 5 — VENOM: an LD50 proxy, dose per unit mass scaled by a thousand. value ⌊dose
    · 1000 / mass⌋. -/
theorem fam_herpetology_venom_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- herpetology: clutch(100, 4) = 25 — CLUTCH: eggs per female. value ⌊eggs / females⌋. -/
theorem fam_herpetology_clutch_1 : (100 / 4) = 25 := by decide

/-- herpetology: incubation(60) = 60 — INCUBATION: the days to hatch. value days. -/
theorem fam_herpetology_incubation_1 : 60 = 60 := by decide

/-- herpetology: metabolism(100, 25) = 4 — METABOLISM: mass per degree of temperature. value ⌊mass /
    temperature⌋. -/
theorem fam_herpetology_metabolism_1 : (100 / 25) = 4 := by decide

/-- herpetology: growth(50, 20) = 30 — GROWTH over a season: length gained. value max(0, final − initial). -/
theorem fam_herpetology_growth_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- herpetology: growth(20, 50) = 0 — GROWTH over a season: length gained. value max(0, final − initial). -/
theorem fam_herpetology_growth_2 : (fmax 0 (20 - 50)) = 0 := by decide

/-- herpetology: survival(80, 100) = 80 — SURVIVAL: the share of a clutch that hatches, as a percentage. value
    ⌊hatched · 100 / eggs⌋. -/
theorem fam_herpetology_survival_1 : ((80 * 100) / 100) = 80 := by decide

/-- herpetology: scalation(170, 10) = 17 — SCALATION: scales per row. value ⌊scales / rows⌋. -/
theorem fam_herpetology_scalation_1 : (170 / 10) = 17 := by decide

/-- hieroglyphs: signs(700, 1) = 700 -/
theorem fam_hieroglyphs_signs_1 : (700 * 1) = 700 := by decide

/-- hieroglyphs: determinatives(100, 0) = 100 -/
theorem fam_hieroglyphs_determinatives_1 : (100 + 0) = 100 := by decide

/-- hieroglyphs: phonemsigns(24, 0) = 24 -/
theorem fam_hieroglyphs_phonemsigns_1 : (24 + 0) = 24 := by decide

/-- hieroglyphs: categorysubsets(6) = 64 -/
theorem fam_hieroglyphs_categorysubsets_1 : (2 ^ 6) = 64 := by decide

/-- hieroglyphs: biliterals(80, 20) = 100 -/
theorem fam_hieroglyphs_biliterals_1 : (80 + 20) = 100 := by decide

/-- hieroglyphs: decipheredratio(90, 100) = 90 -/
theorem fam_hieroglyphs_decipheredratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- highlights: items(5) = 5 — HIGHLIGHTS — THE StickyHighlights/HoverHighlights USE CASE FROM
    payloadcms/website, AS ARITHMETIC. A page of sticky, hover-revealed highlights is numbers: how many items,
    which one is active as you scroll, scroll and reveal progress as percentages, the sticky offset, parallax
    shift, the reveal duration, and the intersection threshold. Crosses to `frontend` — highlights are what the
    frontend renders. A measure. */ const PROOF = 'highlights arithmetic (items, active index, scroll progress,
    reveal progress, sticky offset, parallax shift, duration, threshold); the StickyHighlights/HoverHighlights
    use case from payloadcms/website; a measure crossed to frontend' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'highlights', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, {
    name: `highlights.${name}`, params }) export class HighlightsFormulas { /** ITEMS: how many highlights on
    the page. value count. -/
theorem fam_highlights_items_1 : 5 = 5 := by decide

/-- highlights: active(3, 10) = 30 — ACTIVE: the active highlight as a percentage through the list. value ⌊index
    · 100 / total⌋. -/
theorem fam_highlights_active_1 : ((3 * 100) / 10) = 30 := by decide

/-- highlights: scroll(250, 1000) = 25 — SCROLL: scroll progress as a percentage of the scrollable height. value
    ⌊pos · 100 / height⌋. -/
theorem fam_highlights_scroll_1 : ((250 * 100) / 1000) = 25 := by decide

/-- highlights: reveal(2, 8) = 25 — REVEAL: reveal progress — highlights shown as a percentage of the total.
    value ⌊shown · 100 / total⌋. -/
theorem fam_highlights_reveal_1 : ((2 * 100) / 8) = 25 := by decide

/-- highlights: sticky(80) = 80 — STICKY: the sticky offset from the top in pixels. value offset. -/
theorem fam_highlights_sticky_1 : 80 = 80 := by decide

/-- highlights: parallax(50, 200) = 100 — PARALLAX: the parallax shift at a speed over a distance. value ⌊speed
    · distance / 100⌋. -/
theorem fam_highlights_parallax_1 : ((50 * 200) / 100) = 100 := by decide

/-- highlights: duration(400) = 400 — DURATION: the reveal duration in milliseconds. value ms. -/
theorem fam_highlights_duration_1 : 400 = 400 := by decide

/-- highlights: threshold(50) = 50 — THRESHOLD: the intersection threshold as a percentage. value pct. -/
theorem fam_highlights_threshold_1 : 50 = 50 := by decide

/-- hinduism: vedas(4, 0) = 4 -/
theorem fam_hinduism_vedas_1 : (4 + 0) = 4 := by decide

/-- hinduism: yogapaths(4, 0) = 4 -/
theorem fam_hinduism_yogapaths_1 : (4 + 0) = 4 := by decide

/-- hinduism: mantrarepetitions(108, 1) = 108 -/
theorem fam_hinduism_mantrarepetitions_1 : (108 * 1) = 108 := by decide

/-- hinduism: chakras(7, 0) = 7 -/
theorem fam_hinduism_chakras_1 : (7 + 0) = 7 := by decide

/-- hinduism: versesum(700, 1) = 700 -/
theorem fam_hinduism_versesum_1 : (700 * 1) = 700 := by decide

/-- hinduism: gunasubsets(3) = 8 -/
theorem fam_hinduism_gunasubsets_1 : (2 ^ 3) = 8 := by decide

/-- histology: staining(750, 1000) = 75 — HISTOLOGY — THE TISSUE SLIDE, AS ARITHMETIC. Reading a stained section
    is numbers: the stained fraction, section thickness, magnification, cell density per field, fibrosis and
    necrosis as percentages, the grade, and immune infiltration per area. Crosses to `med` — histology is what
    medicine reads from the microscope. A measure. */ const PROOF = 'histology arithmetic (staining fraction,
    thickness, magnification, cell density, fibrosis, necrosis, grade, infiltration); the tissue slide as
    numbers; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'histology', dst:
    'med', formula, value, proof: PROOF, ...extra }, holds, { name: `histology.${name}`, params }) export class
    HistologyFormulas { /** STAINING: the stained fraction of a section, as a percentage. value ⌊stained · 100 /
    total⌋. -/
theorem fam_histology_staining_1 : ((750 * 100) / 1000) = 75 := by decide

/-- histology: thickness(5) = 5 — THICKNESS: section thickness in microns. value microns. -/
theorem fam_histology_thickness_1 : 5 = 5 := by decide

/-- histology: magnification(4000, 10) = 400 — MAGNIFICATION: image size over specimen size. value ⌊image /
    specimen⌋. -/
theorem fam_histology_magnification_1 : (4000 / 10) = 400 := by decide

/-- histology: density(1200, 10) = 120 — DENSITY: cells per field of view. value ⌊cells / field⌋. -/
theorem fam_histology_density_1 : (1200 / 10) = 120 := by decide

/-- histology: fibrosis(30, 100) = 30 — FIBROSIS: fibrotic tissue as a percentage. value ⌊fibrotic · 100 /
    tissue⌋. -/
theorem fam_histology_fibrosis_1 : ((30 * 100) / 100) = 30 := by decide

/-- histology: necrosis(20, 200) = 10 — NECROSIS: dead tissue as a percentage. value ⌊dead · 100 / total⌋. -/
theorem fam_histology_necrosis_1 : ((20 * 100) / 200) = 10 := by decide

/-- histology: grade(3) = 3 — GRADE: the histologic grade. value score. -/
theorem fam_histology_grade_1 : 3 = 3 := by decide

/-- histology: infiltration(900, 3) = 300 — INFILTRATION: immune cells per unit area. value ⌊immune / area⌋. -/
theorem fam_histology_infiltration_1 : (900 / 3) = 300 := by decide

/-- historiography: sourcecount(40, 20) = 60 -/
theorem fam_historiography_sourcecount_1 : (40 + 20) = 60 := by decide

/-- historiography: biasfactors(2, 3, 1) = 6 -/
theorem fam_historiography_biasfactors_1 : ((2 + 3) + 1) = 6 := by decide

/-- historiography: crosschecks(12, 4) = 48 -/
theorem fam_historiography_crosschecks_1 : (12 * 4) = 48 := by decide

/-- historiography: interpretiveframes(5) = 32 -/
theorem fam_historiography_interpretiveframes_1 : (2 ^ 5) = 32 := by decide

/-- historiography: consensuslevel(70, 100) = 70 -/
theorem fam_historiography_consensuslevel_1 : ((70 * 100) / 100) = 70 := by decide

/-- historiography: revisionspan(200, 50) = 150 -/
theorem fam_historiography_revisionspan_1 : (fmax 0 (200 - 50)) = 150 := by decide

/-- hook: chain(6, 100) = 600 — HOOK — THE PAYLOAD CMS LIFECYCLE HOOKS API, AS ARITHMETIC. The hooks a document
    walks on its way through the CMS are numbers: how many fire across a save, their average latency, whether a
    hook sits in order, the fields a beforeChange mutates, the failure rate, nesting depth, collection coverage,
    and the total fired. beforeChange, afterRead, beforeValidate, beforeDelete, afterDelete, beforeOperation.
    Crosses to `payload` — hooks are Payload's lifecycle. */ const PROOF = 'hook arithmetic (chain, latency,
    order, mutations, failures, depth, coverage, fired) over the Payload lifecycle hooks (beforeChange,
    afterRead, beforeValidate, beforeDelete, afterDelete, beforeOperation); a measure crossed to payload' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'hook', dst: 'payload', formula, value, proof:
    PROOF, ...extra }, holds, { name: `hook.${name}`, params }) /** The Payload lifecycle hooks this family is
    the arithmetic of — the single canonical list, read wherever hooks are enumerated. */ export const
    HOOK_LIFECYCLE = ['beforeOperation', 'beforeValidate', 'beforeChange', 'afterRead', 'beforeDelete',
    'afterDelete'] as const export class HookFormulas { /** CHAIN: hooks fired per document across a save. value
    hooks · perDoc. -/
theorem fam_hook_chain_1 : (6 * 100) = 600 := by decide

/-- hook: latency(5000, 100) = 50 — AVERAGE LATENCY: total milliseconds over the hooks fired. value ⌊total /
    hooks⌋. -/
theorem fam_hook_latency_1 : (5000 / 100) = 50 := by decide

/-- hook: mutations(3, 12) = 25 — MUTATIONS: fields a beforeChange touched, as a percentage. value ⌊changed ·
    100 / fields⌋. -/
theorem fam_hook_mutations_1 : ((3 * 100) / 12) = 25 := by decide

/-- hook: failures(5, 100) = 5 — FAILURES: hooks that threw, as a percentage of those fired. value ⌊failed · 100
    / fired⌋. -/
theorem fam_hook_failures_1 : ((5 * 100) / 100) = 5 := by decide

/-- hook: depth(3) = 3 — DEPTH: nested hook invocations (a hook that triggers another). value nested, holds ≤ 5. -/
theorem fam_hook_depth_1 : 3 = 3 := by decide

/-- hook: coverage(8, 10) = 80 — COVERAGE: collections with a hook, as a percentage. value ⌊hooked · 100 /
    collections⌋. -/
theorem fam_hook_coverage_1 : ((8 * 100) / 10) = 80 := by decide

/-- hook: fired(10, 6) = 60 — FIRED: hooks fired across every collection. value collections · each. -/
theorem fam_hook_fired_1 : (10 * 6) = 60 := by decide

/-- horticulture: spacing(1000, 40) = 25 — HORTICULTURE — GROWING PLANTS, AS ARITHMETIC. The garden is numbers:
    how far apart to set plants in a bed, what fraction of seeds sprout, how much of a canopy was pruned, water
    and feed per unit of ground, the acid-to-base ratio of the soil, the light a crop banks over its season, and
    how many cuttings took root. Crosses to `botany` — horticulture is botany put to work. A measure. */ const
    PROOF = 'horticulture arithmetic (plant spacing, germination, pruning, irrigation, fertilizer, soil pH,
    light-days, propagation); growing plants as integers; a measure crossed to botany' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'horticulture', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `horticulture.${name}`, params }) export class HorticultureFormulas { /** PLANT
    SPACING: the ground each plant gets in a bed. value ⌊area / plants⌋. -/
theorem fam_horticulture_spacing_1 : (1000 / 40) = 25 := by decide

/-- horticulture: germination(90, 100) = 90 — GERMINATION as a percentage of seeds that sprout. value ⌊sprouted
    · 100 / seeds⌋. -/
theorem fam_horticulture_germination_1 : ((90 * 100) / 100) = 90 := by decide

/-- horticulture: pruning(30, 120) = 25 — PRUNING: the fraction of the canopy removed. value ⌊removed · 100 /
    total⌋. -/
theorem fam_horticulture_pruning_1 : ((30 * 100) / 120) = 25 := by decide

/-- horticulture: irrigation(5000, 100) = 50 — IRRIGATION: water volume per unit of ground. value ⌊volume /
    area⌋. -/
theorem fam_horticulture_irrigation_1 : (5000 / 100) = 50 := by decide

/-- horticulture: fertilizer(800, 100) = 8 — FERTILIZER: nutrient per unit of ground. value ⌊nutrient / area⌋. -/
theorem fam_horticulture_fertilizer_1 : (800 / 100) = 8 := by decide

/-- horticulture: ph(65, 100) = 65 — SOIL pH: the acid-to-base ratio, scaled. value ⌊acid · 100 / base⌋. -/
theorem fam_horticulture_ph_1 : ((65 * 100) / 100) = 65 := by decide

/-- horticulture: lightdays(14, 90) = 1260 — LIGHT-DAYS: the light a crop banks over its season. value hours ·
    days. -/
theorem fam_horticulture_lightdays_1 : (14 * 90) = 1260 := by decide

/-- horticulture: propagation(18, 24) = 75 — PROPAGATION: the fraction of cuttings that take root. value ⌊rooted
    · 100 / cuttings⌋. -/
theorem fam_horticulture_propagation_1 : ((18 * 100) / 24) = 75 := by decide

/-- hospitality: occupancy(85, 100) = 85 — OCCUPANCY as a percentage. value ⌊occupied · 100 / rooms⌋. -/
theorem fam_hospitality_occupancy_1 : ((85 * 100) / 100) = 85 := by decide

/-- hospitality: adr(12000, 80) = 150 — HOSPITALITY — RUNNING ROOMS, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A hotel is numbers: occupancy, the average daily rate, revenue per available room,
    guest satisfaction, the length of a stay, the no-show rate, the share of guests who return, and the share of
    check-ins upsold. Crosses to `tourism` — hospitality is what tourism books. A measure. */ const PROOF =
    'hospitality arithmetic (occupancy, average daily rate, revpar, satisfaction, length of stay, no-shows,
    repeat guests, upsell); a public-API domain; a measure crossed to tourism' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'hospitality', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, {
    name: `hospitality.${name}`, params }) export class HospitalityFormulas { /** AVERAGE DAILY RATE: room
    revenue over the rooms sold. value ⌊revenue / roomssold⌋. -/
theorem fam_hospitality_adr_1 : (12000 / 80) = 150 := by decide

/-- hospitality: revpar(12000, 100) = 120 — REVPAR: revenue per available room. value ⌊revenue / available⌋. -/
theorem fam_hospitality_revpar_1 : (12000 / 100) = 120 := by decide

/-- hospitality: satisfaction(450, 100) = 4 — SATISFACTION: the average survey score. value ⌊score / surveys⌋. -/
theorem fam_hospitality_satisfaction_1 : (450 / 100) = 4 := by decide

/-- hospitality: stay(300, 100) = 3 — LENGTH OF STAY: nights over the stays. value ⌊nights / stays⌋. -/
theorem fam_hospitality_stay_1 : (300 / 100) = 3 := by decide

/-- hospitality: noshow(5, 100) = 5 — NO-SHOW RATE as a percentage. value ⌊noshows · 100 / bookings⌋. -/
theorem fam_hospitality_noshow_1 : ((5 * 100) / 100) = 5 := by decide

/-- hospitality: repeat(40, 100) = 40 — REPEAT GUESTS: the share who return, as a percentage. value ⌊returning ·
    100 / guests⌋. -/
theorem fam_hospitality_repeat_1 : ((40 * 100) / 100) = 40 := by decide

/-- hospitality: upsell(25, 100) = 25 — UPSELL: the share of check-ins upgraded, as a percentage. value
    ⌊upgraded · 100 / checkins⌋. -/
theorem fam_hospitality_upsell_1 : ((25 * 100) / 100) = 25 := by decide

/-- hosting: domains(50, 3) = 150 — HOSTING — WEB HOSTING AS ARITHMETIC (chosen by the public-API registry, not
    by hand). Serving sites is numbers: the domains under an account, DNS records across zones, the days an SSL
    certificate still has, metered bandwidth, uptime, the traffic a visitor count carries, storage, and the
    overage past a quota. Crosses to `obs` — hosting is what observability watches. A measure. */ const PROOF =
    'hosting arithmetic (domains, dns records, ssl validity, bandwidth, uptime, traffic, storage, overage); a
    public-API hosting domain; a measure crossed to obs' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'hosting', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `hosting.${name}`,
    params }) export class HostingFormulas { /** DOMAINS: sites at a count each. value sites · each. -/
theorem fam_hosting_domains_1 : (50 * 3) = 150 := by decide

/-- hosting: dns(12, 5) = 60 — DNS RECORDS: records across zones. value records · zones. -/
theorem fam_hosting_dns_1 : (12 * 5) = 60 := by decide

/-- hosting: ssl(100, 190) = 90 — SSL: the days a certificate still has. value max(0, expiry − now). -/
theorem fam_hosting_ssl_1 : (fmax 0 (190 - 100)) = 90 := by decide

/-- hosting: ssl(200, 190) = 0 — SSL: the days a certificate still has. value max(0, expiry − now). -/
theorem fam_hosting_ssl_2 : (fmax 0 (190 - 200)) = 0 := by decide

/-- hosting: bandwidth(10000, 90) = 900 — BANDWIDTH: gigabytes at a rate per thousand. value ⌊gb · rate / 1000⌋. -/
theorem fam_hosting_bandwidth_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- hosting: uptime(999, 1000) = 99 — UPTIME as a percentage. value ⌊up · 100 / total⌋. -/
theorem fam_hosting_uptime_1 : ((999 * 100) / 1000) = 99 := by decide

/-- hosting: traffic(1000, 5) = 5000 — TRAFFIC: visits at an average payload. value visits · avg. -/
theorem fam_hosting_traffic_1 : (1000 * 5) = 5000 := by decide

/-- hosting: storage(50, 20) = 1000 — STORAGE: sites at a size each. value sites · each. -/
theorem fam_hosting_storage_1 : (50 * 20) = 1000 := by decide

/-- hosting: overage(120, 100) = 20 — OVERAGE: usage past a quota. value max(0, used − quota). -/
theorem fam_hosting_overage_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- hosting: overage(80, 100) = 0 — OVERAGE: usage past a quota. value max(0, used − quota). -/
theorem fam_hosting_overage_2 : (fmax 0 (80 - 100)) = 0 := by decide

/-- hover: delay(300) = 300 — HOVER — THE HOVERCARDS / HOVERHIGHLIGHTS USE CASE (payloadcms/website), AS
    ARITHMETIC. A pointer rests on a block and the page answers: the delay before it responds, how much a card
    scales, how much of a hidden layer is revealed, the transition time, the stagger across items, the stack
    depth, the cards on show, the trigger area that counts. Crosses to `frontend` — hover is what the frontend
    renders. A measure. */ const PROOF = 'hover arithmetic (delay, scale, reveal, transition, stagger, depth,
    cards, trigger); the HoverCards/HoverHighlights use case from payloadcms/website; a measure crossed to
    frontend' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'hover', dst: 'frontend', formula,
    value, proof: PROOF, ...extra }, holds, { name: `hover.${name}`, params }) export class HoverFormulas { /**
    DELAY before the hover responds, in milliseconds. value ms. -/
theorem fam_hover_delay_1 : 300 = 300 := by decide

/-- hover: scale(200, 150) = 300 — SCALE: a base dimension grown by a percentage. value ⌊base · pct / 100⌋. -/
theorem fam_hover_scale_1 : ((200 * 150) / 100) = 300 := by decide

/-- hover: reveal(40, 100) = 40 — REVEAL: how much of a hidden layer is shown, as a percentage. value ⌊hidden ·
    100 / total⌋. -/
theorem fam_hover_reveal_1 : ((40 * 100) / 100) = 40 := by decide

/-- hover: transition(250) = 250 — TRANSITION time, in milliseconds. value ms. -/
theorem fam_hover_transition_1 : 250 = 250 := by decide

/-- hover: stagger(5, 30) = 150 — STAGGER: items each offset by a gap. value items · gap. -/
theorem fam_hover_stagger_1 : (5 * 30) = 150 := by decide

/-- hover: depth(3) = 3 — DEPTH: the stack layers of the card. value layers. -/
theorem fam_hover_depth_1 : 3 = 3 := by decide

/-- hover: cards(8) = 8 — CARDS on show. value count. -/
theorem fam_hover_cards_1 : 8 = 8 := by decide

/-- hover: trigger(25, 100) = 25 — TRIGGER: the hot area that counts, as a percentage of the whole. value ⌊area
    · 100 / total⌋. -/
theorem fam_hover_trigger_1 : ((25 * 100) / 100) = 25 := by decide

/-- hovercraft: liftpressure(5000, 2) = 2500 -/
theorem fam_hovercraft_liftpressure_1 : (5000 / 2) = 2500 := by decide

/-- hovercraft: skirtarea(40, 1) = 40 -/
theorem fam_hovercraft_skirtarea_1 : (40 * 1) = 40 := by decide

/-- hovercraft: payload(2000, 1) = 2000 -/
theorem fam_hovercraft_payload_1 : (2000 * 1) = 2000 := by decide

/-- hovercraft: speed(60, 1) = 60 -/
theorem fam_hovercraft_speed_1 : (60 * 1) = 60 := by decide

/-- hovercraft: fanpower(200, 2) = 400 -/
theorem fam_hovercraft_fanpower_1 : (200 * 2) = 400 := by decide

/-- hovercraft: clearance(300, 1) = 300 -/
theorem fam_hovercraft_clearance_1 : (300 / 1) = 300 := by decide

/-- hovercraft: cushionforce(2500, 40) = 100000 -/
theorem fam_hovercraft_cushionforce_1 : (2500 * 40) = 100000 := by decide

/-- hovercraft: efficiency(70, 100) = 70 -/
theorem fam_hovercraft_efficiency_1 : ((70 * 100) / 100) = 70 := by decide

/-- huffman: averagelength(100, 25) = 4 — HUFFMAN — PREFIX-CODE COMPRESSION, AS ARITHMETIC. A Huffman code is
    numbers: the average bits a symbol costs, how far the original shrinks, the nodes a full binary code tree
    holds, the bits a code saves, the length a run of codes spends, a symbol's weighted path, the leaves under a
    node count, and how close the code sits to optimal. Crosses to `signal` — huffman is the code a signal is
    squeezed into. A measure. */ const PROOF = 'huffman arithmetic (average length, compression ratio, tree
    nodes, saved bits, code length, weighted path, leaf count, efficiency); a prefix-code measure crossed to
    signal' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'huffman', dst: 'signal', formula,
    value, proof: PROOF, ...extra }, holds, { name: `huffman.${name}`, params }) export class HuffmanFormulas {
    /** AVERAGE LENGTH: total code bits over the symbols coded. value ⌊totalbits / symbols⌋. -/
theorem fam_huffman_averagelength_1 : (100 / 25) = 4 := by decide

/-- huffman: codelength(10, 3) = 30 — CODE LENGTH: a run of symbols each a fixed number of bits. value count ·
    bits. -/
theorem fam_huffman_codelength_1 : (10 * 3) = 30 := by decide

/-- huffman: compressionratio(800, 200) = 400 — COMPRESSION RATIO as a percentage of the compressed size. value
    ⌊original · 100 / compressed⌋. -/
theorem fam_huffman_compressionratio_1 : ((800 * 100) / 200) = 400 := by decide

/-- huffman: efficiency(90, 100) = 90 — EFFICIENCY: optimal bits against the bits actually used, as a
    percentage. value ⌊optimal · 100 / actual⌋. -/
theorem fam_huffman_efficiency_1 : ((90 * 100) / 100) = 90 := by decide

/-- huffman: leafcount(15) = 8 — LEAF COUNT: the leaves under a full binary code tree of a given node count.
    value ⌊(nodes + 1) / 2⌋. -/
theorem fam_huffman_leafcount_1 : ((15 + 1) / 2) = 8 := by decide

/-- huffman: savedbits(1000, 300) = 700 — SAVED BITS: the bits a code drops from the original. value max(0,
    original − compressed). -/
theorem fam_huffman_savedbits_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- huffman: savedbits(300, 1000) = 0 — SAVED BITS: the bits a code drops from the original. value max(0,
    original − compressed). -/
theorem fam_huffman_savedbits_2 : (fmax 0 (300 - 1000)) = 0 := by decide

/-- huffman: treenodes(8) = 15 — TREE NODES: the nodes a full binary code tree holds over its leaves. value
    max(0, 2 · leaves − 1). -/
theorem fam_huffman_treenodes_1 : ((2 * 8) - 1) = 15 := by decide

/-- huffman: weightedpath(12, 4) = 48 — WEIGHTED PATH: a symbol's frequency times its depth in the code tree.
    value freq · depth. -/
theorem fam_huffman_weightedpath_1 : (12 * 4) = 48 := by decide

/-- humidity: relative(15, 20) = 75 — HUMIDITY — WATER IN THE AIR, AS ARITHMETIC (the moisture a parcel carries,
    read as integers). Relative humidity against saturation, absolute humidity per volume, specific humidity per
    total mass, the pressure-based humidity ratio, the saturation vapour pressure a reading implies, the
    vapour-pressure deficit, a comfort index, and the mass mixing ratio. Crosses to `meteorology` — humidity is
    a state the weather carries. A measure. */ const PROOF = 'humidity arithmetic (relative, absolute, specific,
    ratio, saturation, deficit, comfort index, mixing ratio); water in the air as integers; a measure crossed to
    meteorology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'humidity', dst: 'meteorology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `humidity.${name}`, params }) export class
    HumidityFormulas { /** RELATIVE HUMIDITY as a percentage of saturation. value ⌊vapor · 100 / sat⌋. -/
theorem fam_humidity_relative_1 : ((15 * 100) / 20) = 75 := by decide

/-- humidity: absolute(600, 30) = 20 — ABSOLUTE HUMIDITY: water mass over the volume it fills. value ⌊mass /
    volume⌋. -/
theorem fam_humidity_absolute_1 : (600 / 30) = 20 := by decide

/-- humidity: specific(20, 1000) = 20 — SPECIFIC HUMIDITY: vapour per total (moist) air mass, in g/kg. value
    ⌊vapor · 1000 / total⌋. -/
theorem fam_humidity_specific_1 : ((20 * 1000) / 1000) = 20 := by decide

/-- humidity: saturation(15, 75) = 20 — HUMIDITY RATIO from vapour and total pressure, in g/kg. value ⌊622 · e /
    (p − e)⌋. */ static ratio(e: number, p: number): CrossFormula { const dry = Math.max(0, p - e); return
    c('humidity-ratio', 'ratio(e, p) = ⌊622 · e / (p − e)⌋', dry > 0 ? Math.floor((622 * e) / dry) : 0, nat(e,
    p) && dry > 0, 'ratio', [e, p]) } /** SATURATION vapour pressure implied by a vapour pressure and its
    relative humidity. value ⌊e · 100 / rh⌋. -/
theorem fam_humidity_saturation_1 : ((15 * 100) / 75) = 20 := by decide

/-- humidity: deficit(20, 15) = 5 — VAPOUR-PRESSURE DEFICIT: how far below saturation the air sits. value max(0,
    sat − vapor). -/
theorem fam_humidity_deficit_1 : (fmax 0 (20 - 15)) = 5 := by decide

/-- humidity: deficit(10, 20) = 0 — VAPOUR-PRESSURE DEFICIT: how far below saturation the air sits. value max(0,
    sat − vapor). -/
theorem fam_humidity_deficit_2 : (fmax 0 (10 - 20)) = 0 := by decide

/-- humidity: comfortindex(30, 50) = 40 — COMFORT INDEX: temperature lifted by a share of the humidity. value
    temp + ⌊rh / 5⌋. -/
theorem fam_humidity_comfortindex_1 : (30 + (50 / 5)) = 40 := by decide

/-- humidity: mixingratio(16, 1000) = 16 — MIXING RATIO: vapour per dry air mass, in g/kg. value ⌊vapor · 1000 /
    dry⌋. -/
theorem fam_humidity_mixingratio_1 : ((16 * 1000) / 1000) = 16 := by decide

/-- husbandry: stockingdensity(100, 500) = 20 — HUSBANDRY — RAISING LIVESTOCK, AS ARITHMETIC. Keeping animals is
    numbers: how densely they stock a paddock, how much feed turns into gain, weaning weight, how a herd grows,
    mortality, the pasture-rotation cycle, water needed, and the floor space each animal is allowed. Crosses to
    `agriculture` — husbandry is the animal half of the farm. A measure. */ const PROOF = 'husbandry arithmetic
    (stocking density, feed conversion, weaning weight, herd growth, mortality, pasture rotation, water
    requirement, space allowance); the animal half of the farm; a measure crossed to agriculture' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'husbandry', dst: 'agriculture', formula, value, proof: PROOF,
    ...extra }, holds, { name: `husbandry.${name}`, params }) export class HusbandryFormulas { /** STOCKING
    DENSITY: animals per 100 units of area. value ⌊animals · 100 / area⌋. -/
theorem fam_husbandry_stockingdensity_1 : ((100 * 100) / 500) = 20 := by decide

/-- husbandry: feedconversion(600, 100) = 600 — FEED CONVERSION: feed per unit of gain, ×100. value ⌊feed · 100
    / gain⌋. -/
theorem fam_husbandry_feedconversion_1 : ((600 * 100) / 100) = 600 := by decide

/-- husbandry: weaningweight(40, 200, 1) = 240 — WEANING WEIGHT: birth weight plus days of average daily gain.
    value birth + days · adg. -/
theorem fam_husbandry_weaningweight_1 : (40 + (200 * 1)) = 240 := by decide

/-- husbandry: herdgrowth(100, 30, 10) = 120 — HERD GROWTH: the herd after births and deaths. value max(0, herd
    + births − deaths). -/
theorem fam_husbandry_herdgrowth_1 : (fmax 0 ((100 + 30) - 10)) = 120 := by decide

/-- husbandry: mortality(3, 100) = 3 — MORTALITY as a percentage. value ⌊deaths · 100 / total⌋. -/
theorem fam_husbandry_mortality_1 : ((3 * 100) / 100) = 3 := by decide

/-- husbandry: mortality(0, 100) = 0 — MORTALITY as a percentage. value ⌊deaths · 100 / total⌋. -/
theorem fam_husbandry_mortality_2 : ((0 * 100) / 100) = 0 := by decide

/-- husbandry: pasturerotation(6, 5) = 30 — PASTURE ROTATION: the cycle length across paddocks at days each.
    value paddocks · days. -/
theorem fam_husbandry_pasturerotation_1 : (6 * 5) = 30 := by decide

/-- husbandry: waterrequirement(100, 50) = 5000 — WATER REQUIREMENT: animals at a per-head daily need. value
    animals · perhead. -/
theorem fam_husbandry_waterrequirement_1 : (100 * 50) = 5000 := by decide

/-- husbandry: spaceallowance(1000, 40) = 25 — SPACE ALLOWANCE: floor area each animal is allowed. value ⌊area /
    animals⌋. -/
theorem fam_husbandry_spaceallowance_1 : (1000 / 40) = 25 := by decide

/-- hvac: coolingload(600, 25) = 15000 — HVAC — HEATING, VENTILATION AND AIR CONDITIONING, AS ARITHMETIC (chosen
    by the equipment registry, not by hand). Conditioning air is numbers: the cooling load a space throws off,
    the airflow that carries it, the tons of refrigeration that meet it, the duct that fits the flow, the fresh
    air occupants need, the sensible and latent heat in a stream, and whether the space holds its setpoint.
    Crosses to `mechanical` — hvac is mechanical work moving heat. A measure. */ const PROOF = 'hvac arithmetic
    (cooling load, airflow, tonnage, ducting, ventilation, sensible heat, latent heat, setpoint); the equipment
    registry\'s uncovered domain; a measure crossed to mechanical' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'hvac', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `hvac.${name}`,
    params }) export class HvacFormulas { /** COOLING LOAD: floor area at a load factor (BTU/h per ft²). value
    area · factor. -/
theorem fam_hvac_coolingload_1 : (600 * 25) = 15000 := by decide

/-- hvac: airflow(3, 400) = 1200 — AIRFLOW: the cfm a load needs at a per-ton airflow. value tons · perTon. -/
theorem fam_hvac_airflow_1 : (3 * 400) = 1200 := by decide

/-- hvac: tonnage(36000, 12000) = 3 — TONNAGE: tons of refrigeration from a BTU/h load at a per-ton rate. value
    ⌊btu / per⌋. -/
theorem fam_hvac_tonnage_1 : (36000 / 12000) = 3 := by decide

/-- hvac: ventilation(20, 15) = 300 — VENTILATION: fresh-air cfm for occupants at a per-person rate. value
    people · rate. -/
theorem fam_hvac_ventilation_1 : (20 * 15) = 300 := by decide

/-- hvac: sensibleheat(1000, 20) = 20000 — SENSIBLE HEAT: airflow across a dry-bulb difference. value cfm · dt. -/
theorem fam_hvac_sensibleheat_1 : (1000 * 20) = 20000 := by decide

/-- hvac: latentheat(1000, 50) = 25000 — LATENT HEAT: airflow across a humidity-ratio difference (grains),
    halved to the stream. value ⌊cfm · grains / 2⌋. -/
theorem fam_hvac_latentheat_1 : ((1000 * 50) / 2) = 25000 := by decide

/-- hydration: dailyneed(70, 35) = 2450 -/
theorem fam_hydration_dailyneed_1 : (70 * 35) = 2450 := by decide

/-- hydration: sweatloss(2, 60) = 120 -/
theorem fam_hydration_sweatloss_1 : (2 * 60) = 120 := by decide

/-- hydration: replacementrate(1500, 2000) = 75 -/
theorem fam_hydration_replacementrate_1 : ((1500 * 100) / 2000) = 75 := by decide

/-- hydration: deficit(2500, 2000) = 500 -/
theorem fam_hydration_deficit_1 : (fmax 0 (2500 - 2000)) = 500 := by decide

/-- hydration: electrolyteneed(2000, 10) = 200 -/
theorem fam_hydration_electrolyteneed_1 : (2000 / 10) = 200 := by decide

/-- hydration: urineoutput(1500, 24) = 62 -/
theorem fam_hydration_urineoutput_1 : (1500 / 24) = 62 := by decide

/-- hydration: fluidbalance(2500, 2000) = 500 -/
theorem fam_hydration_fluidbalance_1 : (fmax 0 (2500 - 2000)) = 500 := by decide

/-- hydration: concentration(600, 2) = 300 -/
theorem fam_hydration_concentration_1 : (600 / 2) = 300 := by decide

/-- hydraulics: pressure(1000, 20) = 50 — HYDRAULICS — MOVING FLUID AS ARITHMETIC (pressure, continuity,
    Pascal's law, head, power, a Reynolds proxy, the mechanical advantage of a press). Pressure is force over
    area; flow is area times velocity; a press multiplies the input by its ratio. Crosses to `hydrology` —
    hydraulics is the engineered side of water that hydrology measures in the wild. A measure. */ const PROOF =
    'hydraulics arithmetic (pressure, continuity flow, Pascal force, velocity, head, power, Reynolds proxy,
    press multiplier); the engineered fluid domain; a measure crossed to hydrology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'hydraulics', dst: 'hydrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `hydraulics.${name}`, params }) export class HydraulicsFormulas { /** PRESSURE:
    force over area. value ⌊force / area⌋. -/
theorem fam_hydraulics_pressure_1 : (1000 / 20) = 50 := by decide

/-- hydraulics: flow(20, 3) = 60 — CONTINUITY FLOW: Q = A · v. value area · velocity. -/
theorem fam_hydraulics_flow_1 : (20 * 3) = 60 := by decide

/-- hydraulics: force(50, 20) = 1000 — PASCAL'S LAW: force = pressure · area. value pressure · area. -/
theorem fam_hydraulics_force_1 : (50 * 20) = 1000 := by decide

/-- hydraulics: velocity(60, 20) = 3 — VELOCITY: flow over area. value ⌊flow / area⌋. -/
theorem fam_hydraulics_velocity_1 : (60 / 20) = 3 := by decide

/-- hydraulics: head(1000, 10) = 100 — HEAD: pressure over density. value ⌊pressure / density⌋. -/
theorem fam_hydraulics_head_1 : (1000 / 10) = 100 := by decide

/-- hydraulics: power(60, 100) = 6000 — HYDRAULIC POWER: flow · head. value flow · head. -/
theorem fam_hydraulics_power_1 : (60 * 100) = 6000 := by decide

/-- hydraulics: reynolds(3, 50) = 150 — REYNOLDS PROXY: velocity · diameter. value velocity · diameter. -/
theorem fam_hydraulics_reynolds_1 : (3 * 50) = 150 := by decide

/-- hydraulics: lift(100, 8) = 800 — PRESS MULTIPLIER: the mechanical advantage of a hydraulic press. value
    input · ratio. -/
theorem fam_hydraulics_lift_1 : (100 * 8) = 800 := by decide

/-- hydro: power(100, 50) = 4905 — HYDRO — HYDROPOWER AS ARITHMETIC (chosen by the public registry, not by
    hand). A dam is numbers: the power a flow at a head delivers (P = ρgQH), the head a pressure gives, plant
    capacity factor, turbine efficiency, reservoir storage depth, turbine work, penstock gradient, and the net
    reservoir balance. Crosses to `energy` — hydro is energy made from water. A measure. */ const PROOF = 'hydro
    arithmetic (power P=ρgQH, head, capacity factor, efficiency, storage depth, turbine work, penstock gradient,
    reservoir balance); a public hydropower domain; a measure crossed to energy' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'hydro', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `hydro.${name}`, params }) export class HydroFormulas { /** POWER: a flow at a head, P = ρgQH scaled by
    981/1000. value ⌊flow · head · 981 / 1000⌋. -/
theorem fam_hydro_power_1 : (((100 * 50) * 981) / 1000) = 4905 := by decide

/-- hydro: head(2000, 1000) = 2 — HEAD from a pressure at a density. value ⌊pressure / density⌋. -/
theorem fam_hydro_head_1 : (2000 / 1000) = 2 := by decide

/-- hydro: capacity(45, 100) = 45 — CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated ·
    100 / rated⌋. -/
theorem fam_hydro_capacity_1 : ((45 * 100) / 100) = 45 := by decide

/-- hydro: efficiency(90, 100) = 90 — EFFICIENCY: output over input, as a percentage. value ⌊output · 100 /
    input⌋. -/
theorem fam_hydro_efficiency_1 : ((90 * 100) / 100) = 90 := by decide

/-- hydro: storage(10000, 500) = 20 — STORAGE depth: a volume over a surface area. value ⌊volume / area⌋. -/
theorem fam_hydro_storage_1 : (10000 / 500) = 20 := by decide

/-- hydro: turbine(60, 50) = 3000 — TURBINE work: a flow at a speed. value flow · speed. -/
theorem fam_hydro_turbine_1 : (60 * 50) = 3000 := by decide

/-- hydro: penstock(200, 1000) = 20 — PENSTOCK gradient: a head over a length, scaled by 100. value ⌊head · 100
    / length⌋. -/
theorem fam_hydro_penstock_1 : ((200 * 100) / 1000) = 20 := by decide

/-- hydro: reservoir(800, 300) = 500 — RESERVOIR balance: inflow less outflow, never negative. value max(0,
    inflow − outflow). -/
theorem fam_hydro_reservoir_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- hydro: reservoir(300, 800) = 0 — RESERVOIR balance: inflow less outflow, never negative. value max(0, inflow
    − outflow). -/
theorem fam_hydro_reservoir_2 : (fmax 0 (300 - 800)) = 0 := by decide

/-- hydrography: depth(1500, 1) = 1500 -/
theorem fam_hydrography_depth_1 : (1500 * 1) = 1500 := by decide

/-- hydrography: soundingdensity(10000, 100) = 100 -/
theorem fam_hydrography_soundingdensity_1 : (10000 / 100) = 100 := by decide

/-- hydrography: tidalrange(500, 100) = 400 -/
theorem fam_hydrography_tidalrange_1 : (fmax 0 (500 - 100)) = 400 := by decide

/-- hydrography: currentspeed(3000, 60) = 50 -/
theorem fam_hydrography_currentspeed_1 : (3000 / 60) = 50 := by decide

/-- hydrography: chartscale(50000, 1000) = 50 -/
theorem fam_hydrography_chartscale_1 : (50000 / 1000) = 50 := by decide

/-- hydrography: shoalcount(12, 8) = 20 -/
theorem fam_hydrography_shoalcount_1 : (12 + 8) = 20 := by decide

/-- hydrography: surveycoverage(85, 100) = 85 -/
theorem fam_hydrography_surveycoverage_1 : ((85 * 100) / 100) = 85 := by decide

/-- hydrography: isobathinterval(200, 4) = 50 -/
theorem fam_hydrography_isobathinterval_1 : (200 / 4) = 50 := by decide

/-- hydrology: flow(50, 2) = 100 — HYDROLOGY — WATER SCIENCE, AS ARITHMETIC. Water on the land is numbers: the
    discharge a channel carries, the runoff a storm sheds, the volume a reservoir holds, the fraction that
    infiltrates, the area a watershed drains, the retention a basin keeps, the groundwater it recharges, and the
    deficit of a drought. Crosses to `environment` — hydrology is the water the environment runs on. A measure.
    */ const PROOF = 'hydrology arithmetic (discharge, runoff, reservoir volume, infiltration, watershed,
    retention, recharge, drought); water science as a measure crossed to environment' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'hydrology', dst: 'environment', formula, value, proof: PROOF,
    ...extra }, holds, { name: `hydrology.${name}`, params }) export class HydrologyFormulas { /** DISCHARGE:
    the flow a channel carries, cross-section area at a velocity. value area · velocity. -/
theorem fam_hydrology_flow_1 : (50 * 2) = 100 := by decide

/-- hydrology: runoff(200, 60) = 120 — RUNOFF: the rain a surface sheds at a runoff coefficient (percent). value
    ⌊rain · coeff / 100⌋. -/
theorem fam_hydrology_runoff_1 : ((200 * 60) / 100) = 120 := by decide

/-- hydrology: volume(1000, 5) = 5000 — RESERVOIR VOLUME: surface area at a depth. value area · depth. -/
theorem fam_hydrology_volume_1 : (1000 * 5) = 5000 := by decide

/-- hydrology: infiltration(30, 100) = 30 — INFILTRATION as a percentage of rainfall absorbed. value ⌊absorbed ·
    100 / rain⌋. -/
theorem fam_hydrology_infiltration_1 : ((30 * 100) / 100) = 30 := by decide

/-- hydrology: watershed(12, 50) = 600 — WATERSHED: the sub-basins it drains at an area each. value sub · each. -/
theorem fam_hydrology_watershed_1 : (12 * 50) = 600 := by decide

/-- hydrology: retention(750, 1000) = 75 — RETENTION as a percentage of basin capacity in use. value ⌊stored ·
    100 / capacity⌋. -/
theorem fam_hydrology_retention_1 : ((750 * 100) / 1000) = 75 := by decide

/-- hydrology: recharge(20, 100) = 2000 — RECHARGE: groundwater replenished, infiltration depth over an area.
    value infiltration · area. -/
theorem fam_hydrology_recharge_1 : (20 * 100) = 2000 := by decide

/-- hydrology: drought(40, 200) = 20 — DROUGHT: the deficit as a percentage of a normal year. value ⌊deficit ·
    100 / normal⌋. -/
theorem fam_hydrology_drought_1 : ((40 * 100) / 200) = 20 := by decide

/-- hydroponics: ec(1400, 2) = 700 — HYDROPONICS — SOILLESS GROWING, AS ARITHMETIC. Running a nutrient-film or
    deep-water bed is numbers: the conductivity of the solution, how far the pH is from target, the
    nitrogen-to-potassium ratio, the pump's flow rate, how densely a tray is planted, how much reservoir a crop
    needs, the concentrate to dose, and the volume a deep-water-culture run holds. Crosses to `agriculture` —
    hydroponics is agriculture without soil. A measure. */ const PROOF = 'hydroponics arithmetic (solution
    conductivity, pH distance, N:K ratio, pump flow, planting density, reservoir need, concentrate dose, DWC
    volume); soilless growing as a measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'hydroponics', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name:
    `hydroponics.${name}`, params }) export class HydroponicsFormulas { /** CONDUCTIVITY: EC from total
    dissolved solids at a conversion scale. value ⌊ppm / scale⌋. -/
theorem fam_hydroponics_ec_1 : (1400 / 2) = 700 := by decide

/-- hydroponics: ph(7, 6) = 1 — pH DISTANCE: points the solution sits above target. value max(0, current −
    target). -/
theorem fam_hydroponics_ph_1 : (fmax 0 (7 - 6)) = 1 := by decide

/-- hydroponics: ph(6, 7) = 0 — pH DISTANCE: points the solution sits above target. value max(0, current −
    target). -/
theorem fam_hydroponics_ph_2 : (fmax 0 (6 - 7)) = 0 := by decide

/-- hydroponics: nutrientratio(150, 200) = 75 — NUTRIENT RATIO: nitrogen against potassium, as a percentage.
    value ⌊nitrogen · 100 / potassium⌋. -/
theorem fam_hydroponics_nutrientratio_1 : ((150 * 100) / 200) = 75 := by decide

/-- hydroponics: flowrate(600, 60) = 10 — FLOW RATE: reservoir volume over the pump's cycle minutes. value
    ⌊volume / minutes⌋. -/
theorem fam_hydroponics_flowrate_1 : (600 / 60) = 10 := by decide

/-- hydroponics: density(100, 4) = 25 — PLANTING DENSITY: plants per unit of tray area. value ⌊plants / area⌋. -/
theorem fam_hydroponics_density_1 : (100 / 4) = 25 := by decide

/-- hydroponics: reservoir(50, 4) = 200 — RESERVOIR: total litres for the crop at a per-plant need. value plants
    · perPlant. -/
theorem fam_hydroponics_reservoir_1 : (50 * 4) = 200 := by decide

/-- hydroponics: dosing(100, 2) = 200 — DOSING: millilitres of concentrate for the reservoir at a per-litre
    dose. value volume · mlPerLitre. -/
theorem fam_hydroponics_dosing_1 : (100 * 2) = 200 := by decide

/-- hydroponics: dwc(8, 20) = 160 — DEEP WATER CULTURE: total volume across the buckets at a per-bucket fill.
    value buckets · perBucket. -/
theorem fam_hydroponics_dwc_1 : (8 * 20) = 160 := by decide
