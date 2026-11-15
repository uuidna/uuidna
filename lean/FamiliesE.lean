-- lean/FamiliesE.lean — GENERATED. THE FAMILIES, E — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- earnedvalue: cpi(800, 1000) = 80 — EARNED VALUE — PROJECT CONTROL AS ARITHMETIC. A project is three running
    numbers: the budgeted cost of the work planned (PV), the budgeted cost of the work done (EV), and the money
    actually spent (AC). From them the standard indices and variances fall out — cost and schedule performance,
    the variances, the estimate and the to-complete index — each an exact integer. Crosses to `econ` — earned
    value is project economics. A measure. */ const PROOF = 'earned value arithmetic (CPI, SPI, cost/schedule
    variance, EAC, ETC, TCPI, VAC from PV/EV/AC/BAC); project control as exact integers; a measure crossed to
    econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'earnedvalue', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `earnedvalue.${name}`, params }) export class
    EarnedvalueFormulas { /** COST PERFORMANCE INDEX (×100): earned value over actual cost. value ⌊ev · 100 /
    ac⌋. -/
theorem fam_earnedvalue_cpi_1 : ((800 * 100) / 1000) = 80 := by decide

/-- earnedvalue: spi(900, 1000) = 90 — SCHEDULE PERFORMANCE INDEX (×100): earned value over planned value. value
    ⌊ev · 100 / pv⌋. -/
theorem fam_earnedvalue_spi_1 : ((900 * 100) / 1000) = 90 := by decide

/-- earnedvalue: costvariance(1200, 1000) = 200 — COST VARIANCE: earned value less actual cost, floored at zero.
    value max(0, ev − ac). -/
theorem fam_earnedvalue_costvariance_1 : (fmax 0 (1200 - 1000)) = 200 := by decide

/-- earnedvalue: schedulevariance(1000, 900) = 100 — SCHEDULE VARIANCE: earned value less planned value, floored
    at zero. value max(0, ev − pv). -/
theorem fam_earnedvalue_schedulevariance_1 : (fmax 0 (1000 - 900)) = 100 := by decide

/-- earnedvalue: eac(2000, 1000, 800) = 2500 — ESTIMATE AT COMPLETION: budget at completion scaled by cost
    efficiency. value ⌊bac · ac / ev⌋. -/
theorem fam_earnedvalue_eac_1 : ((2000 * 1000) / 800) = 2500 := by decide

/-- earnedvalue: etc(2000, 800) = 1200 — ESTIMATE TO COMPLETE: the budget left on the work remaining. value
    max(0, bac − ev). -/
theorem fam_earnedvalue_etc_1 : (fmax 0 (2000 - 800)) = 1200 := by decide

/-- earnedvalue: vac(2000, 1800) = 200 — TO-COMPLETE PERFORMANCE INDEX (×100): work remaining over budget
    remaining. value ⌊max(0, bac − ev) · 100 / max(0, bac − ac)⌋. */ static tcpi(bac: number, ev: number, ac:
    number): CrossFormula { const rem = Math.max(0, bac - ac); return c('earnedvalue-tcpi', 'tcpi(bac, ev, ac) =
    ⌊max(0, bac − ev) · 100 / max(0, bac − ac)⌋', rem > 0 ? Math.floor((Math.max(0, bac - ev) * 100) / rem) : 0,
    nat(bac, ev, ac) && bac > ac, 'tcpi', [bac, ev, ac]) } /** VARIANCE AT COMPLETION: budget at completion less
    the estimate at completion. value max(0, bac − eac). -/
theorem fam_earnedvalue_vac_1 : (fmax 0 (2000 - 1800)) = 200 := by decide

/-- earnedvalue: cpi(800, 0) = 0 — EARNED VALUE — PROJECT CONTROL AS ARITHMETIC. A project is three running
    numbers: the budgeted cost of the work planned (PV), the budgeted cost of the work done (EV), and the money
    actually spent (AC). From them the standard indices and variances fall out — cost and schedule performance,
    the variances, the estimate and the to-complete index — each an exact integer. Crosses to `econ` — earned
    value is project economics. A measure. */ const PROOF = 'earned value arithmetic (CPI, SPI, cost/schedule
    variance, EAC, ETC, TCPI, VAC from PV/EV/AC/BAC); project control as exact integers; a measure crossed to
    econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'earnedvalue', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `earnedvalue.${name}`, params }) export class
    EarnedvalueFormulas { /** COST PERFORMANCE INDEX (×100): earned value over actual cost. value ⌊ev · 100 /
    ac⌋. -/
theorem fam_earnedvalue_cpi_2 : ((800 * 100) / 0) = 0 := by decide

/-- ecology: population(120, 80) = 40 — ECOLOGY — ECOSYSTEMS AND BIODIVERSITY, AS ARITHMETIC. Life in a place is
    numbers: a population's net change, how densely it packs an area, how diverse the species are, how many the
    land can carry, biomass, predator pressure, how much habitat is protected, and the energy left a trophic
    level up. Crosses to `environment` — ecology is life read against the environment it lives in. A measure. */
    const PROOF = 'ecology arithmetic (population, density, diversity, carrying capacity, biomass, predation,
    habitat, trophic energy); ecosystems and biodiversity as a measure crossed to environment' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'ecology', dst: 'environment', formula, value, proof: PROOF,
    ...extra }, holds, { name: `ecology.${name}`, params }) export class EcologyFormulas { /** POPULATION: net
    change, births less deaths. value births − deaths (may be negative). -/
theorem fam_ecology_population_1 : (120 - 80) = 40 := by decide

/-- ecology: density(1000, 25) = 40 — DENSITY: individuals over the area they occupy. value ⌊count / area⌋. -/
theorem fam_ecology_density_1 : (1000 / 25) = 40 := by decide

/-- ecology: diversity(30, 120) = 25 — DIVERSITY: species as a percentage of the total counted. value ⌊species ·
    100 / total⌋. -/
theorem fam_ecology_diversity_1 : ((30 * 100) / 120) = 25 := by decide

/-- ecology: carrying(10000, 50) = 200 — CARRYING CAPACITY: how many the resources sustain at a per-individual
    need. value ⌊resources / perIndividual⌋. -/
theorem fam_ecology_carrying_1 : (10000 / 50) = 200 := by decide

/-- ecology: biomass(500, 12) = 6000 — BIOMASS: individuals at a mass each. value individuals · mass. -/
theorem fam_ecology_biomass_1 : (500 * 12) = 6000 := by decide

/-- ecology: predation(900, 30) = 30 — PREDATION: prey available per predator. value ⌊prey / predators⌋. -/
theorem fam_ecology_predation_1 : (900 / 30) = 30 := by decide

/-- ecology: habitat(45, 300) = 15 — HABITAT: protected land as a percentage of the total. value ⌊protected ·
    100 / total⌋. -/
theorem fam_ecology_habitat_1 : ((45 * 100) / 300) = 15 := by decide

/-- ecology: trophic(10000, 10) = 1000 — TROPHIC: energy left a level up, the 10% rule as a proxy. value ⌊energy
    / level⌋. -/
theorem fam_ecology_trophic_1 : (10000 / 10) = 1000 := by decide

/-- editing: cuts(50) = 49 — EDITING — THE CUTTING ROOM AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Assembling a cut is numbers: the cuts that join the clips, the pace of those cuts, the length of the
    timeline, the clips a ripple delete shifts, the frames a transition spends, the runtime a frame count plays
    to, the takes that cover the setups, and the assembly length. Crosses to `media` — editing is what media is
    made of. A measure. */ const PROOF = 'editing arithmetic (cuts, pacing, timeline, ripple, transition,
    runtime, coverage, assembly); the cutting room as integers; a measure crossed to media' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'editing', dst: 'media', formula, value, proof: PROOF, ...extra },
    holds, { name: `editing.${name}`, params }) export class EditingFormulas { /** CUTS: the cuts that join a
    run of clips end to end. value max(0, clips − 1). -/
theorem fam_editing_cuts_1 : (fmax 0 (50 - 1)) = 49 := by decide

/-- editing: pacing(120, 4) = 30 — PACING: cuts spent per minute of the cut. value ⌊cuts / minutes⌋. -/
theorem fam_editing_pacing_1 : (120 / 4) = 30 := by decide

/-- editing: timeline(40, 150) = 6000 — TIMELINE: the duration of clips laid end to end, each the same length.
    value clips · each. -/
theorem fam_editing_timeline_1 : (40 * 150) = 6000 := by decide

/-- editing: ripple(10, 60) = 50 — RIPPLE: the clips a ripple delete at a position shifts left. value max(0,
    total − position). -/
theorem fam_editing_ripple_1 : (fmax 0 (60 - 10)) = 50 := by decide

/-- editing: transition(10, 24) = 216 — TRANSITION: the frames every join between clips spends on a transition.
    value max(0, clips − 1) · frames. -/
theorem fam_editing_transition_1 : ((fmax 0 (10 - 1)) * 24) = 216 := by decide

/-- editing: runtime(6000, 24) = 250 — RUNTIME: the seconds a frame count plays to at a frame rate. value
    ⌊frames / fps⌋. -/
theorem fam_editing_runtime_1 : (6000 / 24) = 250 := by decide

/-- editing: coverage(8, 5) = 40 — COVERAGE: the takes that cover every setup. value setups · takes. -/
theorem fam_editing_coverage_1 : (8 * 5) = 40 := by decide

/-- editing: assembly(24, 90) = 2160 — ASSEMBLY: the length of an assembly cut, each scene the same length.
    value scenes · perScene. -/
theorem fam_editing_assembly_1 : (24 * 90) = 2160 := by decide

/-- editing: cuts(1) = 0 — EDITING — THE CUTTING ROOM AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Assembling a cut is numbers: the cuts that join the clips, the pace of those cuts, the length of the
    timeline, the clips a ripple delete shifts, the frames a transition spends, the runtime a frame count plays
    to, the takes that cover the setups, and the assembly length. Crosses to `media` — editing is what media is
    made of. A measure. */ const PROOF = 'editing arithmetic (cuts, pacing, timeline, ripple, transition,
    runtime, coverage, assembly); the cutting room as integers; a measure crossed to media' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'editing', dst: 'media', formula, value, proof: PROOF, ...extra },
    holds, { name: `editing.${name}`, params }) export class EditingFormulas { /** CUTS: the cuts that join a
    run of clips end to end. value max(0, clips − 1). -/
theorem fam_editing_cuts_2 : (fmax 0 (1 - 1)) = 0 := by decide

/-- education: grade(85, 100) = 85 — EDUCATION — ACADEMICS AS ARITHMETIC (chosen by the registry, not by hand).
    Learning is numbers: a grade out of a maximum, a grade-point average, attendance, the pass rate, the
    student-teacher ratio, course completion, the credits a load carries, and what those credits cost. Crosses
    to `cross` — education is a measure the formula network reads. A measure. */ const PROOF = 'education
    arithmetic (grade, gpa, attendance, pass rate, student-teacher ratio, completion, credits, cost); an
    academics domain; a measure crossed to cross' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'education', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name:
    `education.${name}`, params }) export class EducationFormulas { /** GRADE as a percentage of the maximum.
    value ⌊score · 100 / max⌋. -/
theorem fam_education_grade_1 : ((85 * 100) / 100) = 85 := by decide

/-- education: gpa(48, 12) = 4 — GPA: grade points over credits. value ⌊points / credits⌋. -/
theorem fam_education_gpa_1 : (48 / 12) = 4 := by decide

/-- education: attendance(90, 100) = 90 — ATTENDANCE as a percentage. value ⌊present · 100 / total⌋. -/
theorem fam_education_attendance_1 : ((90 * 100) / 100) = 90 := by decide

/-- education: pass(45, 50) = 90 — PASS RATE as a percentage. value ⌊passed · 100 / total⌋. -/
theorem fam_education_pass_1 : ((45 * 100) / 50) = 90 := by decide

/-- education: ratio(300, 20) = 15 — STUDENT-TEACHER RATIO: students per teacher. value ⌊students / teachers⌋. -/
theorem fam_education_ratio_1 : (300 / 20) = 15 := by decide

/-- education: completion(80, 100) = 80 — COMPLETION as a percentage of those enrolled. value ⌊finished · 100 /
    enrolled⌋. -/
theorem fam_education_completion_1 : ((80 * 100) / 100) = 80 := by decide

/-- education: credits(5, 3) = 15 — CREDITS: courses at a credit count each. value courses · each. -/
theorem fam_education_credits_1 : (5 * 3) = 15 := by decide

/-- education: cost(15, 200) = 3000 — COST: credits at a price per credit. value credits · perCredit. -/
theorem fam_education_cost_1 : (15 * 200) = 3000 := by decide

/-- elections: turnout(750, 1000) = 75 — ELECTIONS — COUNTING THE VOTE, AS ARITHMETIC (chosen by the public
    registry, not by hand). A ballot is numbers: turnout as a share of the roll, the margin between first and
    second, seats from a quota, the swing between rounds, a party's threshold share, apportionment by a divisor,
    spoiled-ballot rate, and seats won against votes won. Crosses to `demographics` — an election is a measure
    of the people. A measure. */ const PROOF = 'elections arithmetic (turnout, margin, seats, swing, threshold,
    apportionment, spoilage, proportionality); a measure of the roll crossed to demographics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'elections', dst: 'demographics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `elections.${name}`, params }) export class ElectionsFormulas { /** TURNOUT as a
    percentage of the roll. value ⌊voted · 100 / registered⌋. -/
theorem fam_elections_turnout_1 : ((750 * 100) / 1000) = 75 := by decide

/-- elections: margin(5200, 4800) = 400 — MARGIN: the lead of the winner over the runner-up. value max(0, winner
    − runnerup). -/
theorem fam_elections_margin_1 : (fmax 0 (5200 - 4800)) = 400 := by decide

/-- elections: seats(12000, 1000) = 12 — SEATS from a quota. value ⌊votes / quota⌋. -/
theorem fam_elections_seats_1 : (12000 / 1000) = 12 := by decide

/-- elections: swing(55, 40) = 15 — SWING between rounds. value max(0, current − previous). -/
theorem fam_elections_swing_1 : (fmax 0 (55 - 40)) = 15 := by decide

/-- elections: threshold(300, 6000) = 5 — THRESHOLD: a party's share of the total. value ⌊votes · 100 / total⌋. -/
theorem fam_elections_threshold_1 : ((300 * 100) / 6000) = 5 := by decide

/-- elections: apportionment(100000, 25000) = 4 — APPORTIONMENT: seats from a population by a divisor. value
    ⌊population / divisor⌋. -/
theorem fam_elections_apportionment_1 : (100000 / 25000) = 4 := by decide

/-- elections: spoilage(20, 1000) = 2 — SPOILAGE: invalid ballots as a share of those cast. value ⌊invalid · 100
    / cast⌋. -/
theorem fam_elections_spoilage_1 : ((20 * 100) / 1000) = 2 := by decide

/-- elections: proportionality(50, 100) = 50 — PROPORTIONALITY: seats won against votes won. value ⌊seats · 100
    / votes⌋. -/
theorem fam_elections_proportionality_1 : ((50 * 100) / 100) = 50 := by decide

/-- electrical: power(120, 10) = 1200 — ELECTRICAL — ELECTRICAL ENGINEERING, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A circuit is numbers: power from voltage and current, resistance by Ohm's
    law, impedance, power factor, transformer turns ratio, the load a supply carries, conversion efficiency, and
    frequency. Crosses to `energy` — electrical work is energy accounted. A measure. */ const PROOF =
    'electrical arithmetic (power, resistance, impedance, power factor, transformer ratio, load, efficiency,
    frequency); electrical engineering as integers; a measure crossed to energy' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'electrical', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, {
    name: `electrical.${name}`, params }) export class ElectricalFormulas { /** POWER: voltage times current.
    value voltage · current. -/
theorem fam_electrical_power_1 : (120 * 10) = 1200 := by decide

/-- electrical: resistance(240, 10) = 24 — RESISTANCE by Ohm's law: voltage over current. value ⌊voltage /
    current⌋. -/
theorem fam_electrical_resistance_1 : (240 / 10) = 24 := by decide

/-- electrical: impedance(30, 40) = 70 — IMPEDANCE: resistance plus reactance. value resistance + reactance. -/
theorem fam_electrical_impedance_1 : (30 + 40) = 70 := by decide

/-- electrical: powerfactor(80, 100) = 80 — POWER FACTOR as a percentage: real over apparent. value ⌊real · 100
    / apparent⌋. -/
theorem fam_electrical_powerfactor_1 : ((80 * 100) / 100) = 80 := by decide

/-- electrical: transformer(240, 120) = 200 — TRANSFORMER turns ratio as a percentage: primary over secondary.
    value ⌊primary · 100 / secondary⌋. -/
theorem fam_electrical_transformer_1 : ((240 * 100) / 120) = 200 := by decide

/-- electrical: load(1200, 120) = 10 — LOAD: power drawn at a supply voltage. value ⌊power / voltage⌋. -/
theorem fam_electrical_load_1 : (1200 / 120) = 10 := by decide

/-- electrical: efficiency(90, 100) = 90 — EFFICIENCY as a percentage: output over input. value ⌊output · 100 /
    input⌋. -/
theorem fam_electrical_efficiency_1 : ((90 * 100) / 100) = 90 := by decide

/-- electrical: frequency(3000, 60) = 50 — FREQUENCY: cycles over seconds. value ⌊cycles / seconds⌋. -/
theorem fam_electrical_frequency_1 : (3000 / 60) = 50 := by decide

/-- electrocardiography: heartrate(1000) = 60 — ELECTROCARDIOGRAPHY — THE SURFACE ECG AS ARITHMETIC. The trace
    is numbers: the heart rate from the R-R interval, the QT, PR and QRS durations read off the waveform, the
    average cycle length, a crude axis deviation, the rate-corrected QT, and the ratio of one interval to
    another. Crosses to `cardiology` — the ECG is what the cardiologist reads. A measure. */ const PROOF =
    'electrocardiography arithmetic (heart rate, QT/PR/QRS durations, average R-R, axis deviation, corrected QT,
    interval ratio); the surface trace as integers; a measure crossed to cardiology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'electrocardiography', dst: 'cardiology', formula, value, proof:
    PROOF, ...extra }, holds, { name: `electrocardiography.${name}`, params }) export class
    ElectrocardiographyFormulas { /** HEART RATE: beats per minute from the R-R interval in milliseconds. value
    ⌊60000 / rr⌋. -/
theorem fam_electrocardiography_heartrate_1 : (60000 / 1000) = 60 := by decide

/-- electrocardiography: qtinterval(440, 40) = 400 — QT INTERVAL: from the Q onset to the T offset. value max(0,
    qend − qstart). -/
theorem fam_electrocardiography_qtinterval_1 : (fmax 0 (440 - 40)) = 400 := by decide

/-- electrocardiography: qtinterval(40, 440) = 0 — QT INTERVAL: from the Q onset to the T offset. value max(0,
    qend − qstart). -/
theorem fam_electrocardiography_qtinterval_2 : (fmax 0 (40 - 440)) = 0 := by decide

/-- electrocardiography: printerval(40, 200) = 160 — PR INTERVAL: from the P onset to the Q onset. value max(0,
    qstart − pstart). -/
theorem fam_electrocardiography_printerval_1 : (fmax 0 (200 - 40)) = 160 := by decide

/-- electrocardiography: qrsduration(140, 40) = 100 — QRS DURATION: the width of the QRS complex. value max(0,
    send − qstart). -/
theorem fam_electrocardiography_qrsduration_1 : (fmax 0 (140 - 40)) = 100 := by decide

/-- electrocardiography: rraverage(6000, 6) = 1000 — AVERAGE R-R: total cycle milliseconds over the beats
    counted. value ⌊total / beats⌋. -/
theorem fam_electrocardiography_rraverage_1 : (6000 / 6) = 1000 := by decide

/-- electrocardiography: axisdeviation(10, 4) = 6 — AXIS DEVIATION: the net amplitude of lead I over aVF. value
    max(0, lead1 − avf). -/
theorem fam_electrocardiography_axisdeviation_1 : (fmax 0 (10 - 4)) = 6 := by decide

/-- electrocardiography: correctedqt(360, 900) = 400 — CORRECTED QT: the QT normalised to a 1000 ms cycle. value
    ⌊qt · 1000 / rr⌋. -/
theorem fam_electrocardiography_correctedqt_1 : ((360 * 1000) / 900) = 400 := by decide

/-- electrocardiography: intervalratio(400, 1000) = 40 — INTERVAL RATIO: one interval over another, as a
    percentage. value ⌊a · 100 / b⌋. -/
theorem fam_electrocardiography_intervalratio_1 : ((400 * 100) / 1000) = 40 := by decide

/-- electrochemistry: faraday(1000, 4) = 250 — ELECTROCHEMISTRY — CHARGE AS ARITHMETIC. Reactions are numbers:
    charge per electron (Faraday), cell potential across electrodes, current over time, moles deposited in
    electrolysis, conductivity, the Nernst shift, battery capacity, and coulombic efficiency. Crosses to
    `chemistry` — electrochemistry is chemistry driven by charge. A measure. */ const PROOF = 'electrochemistry
    arithmetic (faraday charge, cell potential, current, electrolysis moles, conductivity, nernst shift,
    capacity, efficiency); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'electrochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `electrochemistry.${name}`, params }) export class ElectrochemistryFormulas { /** FARADAY: charge per
    electron transferred. value ⌊charge / electrons⌋. -/
theorem fam_electrochemistry_faraday_1 : (1000 / 4) = 250 := by decide

/-- electrochemistry: cellpotential(80, 30) = 50 — CELL POTENTIAL: cathode minus anode (may be negative). value
    cathode − anode. -/
theorem fam_electrochemistry_cellpotential_1 : (80 - 30) = 50 := by decide

/-- electrochemistry: current(600, 60) = 10 — CURRENT: charge over time. value ⌊charge / time⌋. -/
theorem fam_electrochemistry_current_1 : (600 / 60) = 10 := by decide

/-- electrochemistry: electrolysis(9650, 965) = 10 — ELECTROLYSIS: moles deposited, charge over a faraday
    constant. value ⌊charge / faraday_⌋. -/
theorem fam_electrochemistry_electrolysis_1 : (9650 / 965) = 10 := by decide

/-- electrochemistry: conductivity(100, 5) = 20 — CONDUCTIVITY: current over voltage. value ⌊current / voltage⌋. -/
theorem fam_electrochemistry_conductivity_1 : (100 / 5) = 20 := by decide

/-- electrochemistry: nernst(100, 20) = 80 — NERNST: standard potential minus the shift (may be negative). value
    standard − shift. -/
theorem fam_electrochemistry_nernst_1 : (100 - 20) = 80 := by decide

/-- electrochemistry: capacity(1000, 4) = 250 — CAPACITY: charge over mass. value ⌊charge / mass⌋. -/
theorem fam_electrochemistry_capacity_1 : (1000 / 4) = 250 := by decide

/-- electrochemistry: efficiency(90, 100) = 90 — EFFICIENCY: actual over theoretical charge, as a percentage.
    value ⌊actual · 100 / theoretical⌋. -/
theorem fam_electrochemistry_efficiency_1 : ((90 * 100) / 100) = 90 := by decide

/-- electromagnetism: coulomb(6, 7) = 42 — ELECTROMAGNETISM — FIELDS AND CHARGES, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Charge, field, flux, induction, waves, impedance, power flux and
    capacitance are numbers: a force proxy from charges, the field at a distance, flux through an area, Faraday
    induction, a wave's speed proxy, Ohm impedance, Poynting flux and stored charge per volt. Crosses to
    `magnetism` — electromagnetism is the field magnetism lives in. A measure. */ const PROOF =
    'electromagnetism arithmetic (coulomb force, field, flux, Faraday induction, wave speed, impedance, Poynting
    flux, capacitance); fields and charges as numbers; a measure crossed to magnetism' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'electromagnetism', dst: 'magnetism', formula, value, proof:
    PROOF, ...extra }, holds, { name: `electromagnetism.${name}`, params }) export class
    ElectromagnetismFormulas { /** COULOMB: a force proxy from two charges. value q1 · q2. -/
theorem fam_electromagnetism_coulomb_1 : (6 * 7) = 42 := by decide

/-- electromagnetism: flux(4, 25) = 100 — FLUX: field through an area. value field · area. -/
theorem fam_electromagnetism_flux_1 : (4 * 25) = 100 := by decide

/-- electromagnetism: induction(1000, 8) = 125 — INDUCTION: Faraday — flux change over time. value ⌊flux /
    time⌋. -/
theorem fam_electromagnetism_induction_1 : (1000 / 8) = 125 := by decide

/-- electromagnetism: wave(50, 6) = 300 — WAVE: a speed proxy — frequency times wavelength. value frequency ·
    wavelength. -/
theorem fam_electromagnetism_wave_1 : (50 * 6) = 300 := by decide

/-- electromagnetism: impedance(240, 10) = 24 — IMPEDANCE: Ohm — voltage over current. value ⌊voltage /
    current⌋. -/
theorem fam_electromagnetism_impedance_1 : (240 / 10) = 24 := by decide

/-- electromagnetism: poynting(12, 9) = 108 — POYNTING: an energy-flux proxy from the fields. value electric ·
    magnetic. -/
theorem fam_electromagnetism_poynting_1 : (12 * 9) = 108 := by decide

/-- electromagnetism: capacitance(1000, 8) = 125 — CAPACITANCE: charge stored per volt. value ⌊charge /
    voltage⌋. -/
theorem fam_electromagnetism_capacitance_1 : (1000 / 8) = 125 := by decide

/-- electronics: ohm(12, 3) = 4 — ELECTRONICS — THE CIRCUIT, AS ARITHMETIC. Running a circuit is numbers: Ohm's
    law for resistance, power in watts, resistances in series and in parallel, charge over time, capacitance
    from charge and voltage, frequency from cycles, and efficiency as a percentage. Crosses to `energy` — a
    circuit is energy moved. A measure. */ const PROOF = 'electronics arithmetic (ohm resistance, power watts,
    series + parallel resistance, charge, capacitance, frequency, efficiency); a measure crossed to energy'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'electronics', dst: 'energy', formula, value,
    proof: PROOF, ...extra }, holds, { name: `electronics.${name}`, params }) export class ElectronicsFormulas {
    /** OHM'S LAW: resistance from voltage over current. value ⌊voltage / current⌋. -/
theorem fam_electronics_ohm_1 : (12 / 3) = 4 := by decide

/-- electronics: power(12, 3) = 36 — POWER: watts as voltage times current. value voltage · current. -/
theorem fam_electronics_power_1 : (12 * 3) = 36 := by decide

/-- electronics: series(6, 3) = 9 — SERIES RESISTANCE: resistances add. value r1 + r2. -/
theorem fam_electronics_series_1 : (6 + 3) = 9 := by decide

/-- electronics: parallel(6, 3) = 2 — PARALLEL RESISTANCE: the product over the sum. value ⌊r1 · r2 / (r1 +
    r2)⌋. -/
theorem fam_electronics_parallel_1 : ((6 * 3) / (6 + 3)) = 2 := by decide

/-- electronics: charge(5, 10) = 50 — CHARGE: current over time, in coulombs. value current · time. -/
theorem fam_electronics_charge_1 : (5 * 10) = 50 := by decide

/-- electronics: capacitance(100, 5) = 20 — CAPACITANCE: charge over voltage. value ⌊charge / voltage⌋. -/
theorem fam_electronics_capacitance_1 : (100 / 5) = 20 := by decide

/-- electronics: frequency(1000, 10) = 100 — FREQUENCY: cycles over seconds. value ⌊cycles / seconds⌋. -/
theorem fam_electronics_frequency_1 : (1000 / 10) = 100 := by decide

/-- electronics: efficiency(80, 100) = 80 — EFFICIENCY as a percentage. value ⌊output · 100 / input⌋. -/
theorem fam_electronics_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- electrostatics: potential(100, 4) = 25 — ELECTRIC POTENTIAL a charge raises at a distance. value ⌊q / r⌋. -/
theorem fam_electrostatics_potential_1 : (100 / 4) = 25 := by decide

/-- electrostatics: capacitance(100, 5) = 20 — CAPACITANCE: the charge stored per volt. value ⌊charge /
    voltage⌋. -/
theorem fam_electrostatics_capacitance_1 : (100 / 5) = 20 := by decide

/-- electrostatics: energy(10, 6) = 30 — ENERGY held moving a charge through a potential. value ⌊charge ·
    voltage / 2⌋. -/
theorem fam_electrostatics_energy_1 : ((10 * 6) / 2) = 30 := by decide

/-- electrostatics: flux(1000, 8) = 125 — FLUX through a closed surface by Gauss's law (permittivity folded in).
    value ⌊charge / eps⌋. -/
theorem fam_electrostatics_flux_1 : (1000 / 8) = 125 := by decide

/-- electrostatics: dipole(7, 9) = 63 — DIPOLE MOMENT: charge times its separation. value charge · distance. -/
theorem fam_electrostatics_dipole_1 : (7 * 9) = 63 := by decide

/-- electrostatics: charge(20, 5) = 100 — CHARGE a capacitor carries at a voltage. value capacitance · voltage. -/
theorem fam_electrostatics_charge_1 : (20 * 5) = 100 := by decide

/-- electrostatics: capacitance(100, 0) = 0 — CAPACITANCE: the charge stored per volt. value ⌊charge / voltage⌋. -/
theorem fam_electrostatics_capacitance_2 : (100 / 0) = 0 := by decide

/-- elevator: capacity(10, 80) = 800 -/
theorem fam_elevator_capacity_1 : (10 * 80) = 800 := by decide

/-- elevator: speed(1000, 100) = 10 -/
theorem fam_elevator_speed_1 : (1000 / 100) = 10 := by decide

/-- elevator: floors(40, 0) = 40 -/
theorem fam_elevator_floors_1 : (40 + 0) = 40 := by decide

/-- elevator: traveltime(160, 10) = 16 -/
theorem fam_elevator_traveltime_1 : (160 / 10) = 16 := by decide

/-- elevator: waittime(120, 4) = 30 -/
theorem fam_elevator_waittime_1 : (120 / 4) = 30 := by decide

/-- elevator: accelrate(100, 10) = 10 -/
theorem fam_elevator_accelrate_1 : (100 / 10) = 10 := by decide

/-- elevator: dutyload(80, 100) = 80 -/
theorem fam_elevator_dutyload_1 : ((80 * 100) / 100) = 80 := by decide

/-- elnino: oni(20, 10) = 2 -/
theorem fam_elnino_oni_1 : (20 / 10) = 2 := by decide

/-- elnino: ssttanomaly(30, 25) = 5 -/
theorem fam_elnino_ssttanomaly_1 : (fmax 0 (30 - 25)) = 5 := by decide

/-- elnino: phasecount(2, 1) = 3 -/
theorem fam_elnino_phasecount_1 : (2 + 1) = 3 := by decide

/-- elnino: cycleyears(3, 4) = 7 -/
theorem fam_elnino_cycleyears_1 : (3 + 4) = 7 := by decide

/-- elnino: teleconnections(12, 2) = 24 -/
theorem fam_elnino_teleconnections_1 : (12 * 2) = 24 := by decide

/-- elnino: intensityindex(80, 100) = 80 -/
theorem fam_elnino_intensityindex_1 : ((80 * 100) / 100) = 80 := by decide

/-- elnino: durationmonths(9, 3) = 12 -/
theorem fam_elnino_durationmonths_1 : (9 + 3) = 12 := by decide

/-- elnino: rainfallshift(100, 40) = 60 -/
theorem fam_elnino_rainfallshift_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- elo: update(32, 100, 60) = 12 — RATING UPDATE: the points an outcome moves you, k times the score surplus
    (percent). value ⌊k · max(0, actual − expected) / 100⌋. -/
theorem fam_elo_update_1 : ((32 * (fmax 0 (100 - 60))) / 100) = 12 := by decide

/-- elo: ratingdiff(1600, 1400) = 200 — RATING GAP: the raw difference between two ratings, floored at 0. value
    max(0, ra − rb). -/
theorem fam_elo_ratingdiff_1 : (fmax 0 (1600 - 1400)) = 200 := by decide

/-- elo: performance(1500, 8, 2) = 1740 — PERFORMANCE RATING: opponents' average plus 400 points per net win
    over the games. value max(0, oppavg + ⌊400 · (wins − losses) / (wins + losses)⌋). -/
theorem fam_elo_performance_1 : (fmax 0 (1500 + ((400 * (8 - 2)) / (8 + 2)))) = 1740 := by decide

/-- elo: winprobability(200, 10) = 70 — WIN PROBABILITY: a percent from the gap via a bounded integer map at a
    slope. value min(100, 50 + ⌊diff / scale⌋). -/
theorem fam_elo_winprobability_1 : (fmin 100 (50 + (200 / 10))) = 70 := by decide

/-- elo: provisional(10, 30) = 20 — PROVISIONAL: the games still to play before a rating is established. value
    max(0, threshold − games). -/
theorem fam_elo_provisional_1 : (fmax 0 (30 - 10)) = 20 := by decide

/-- elo: decay(1500, 6, 10) = 1440 — DECAY: an idle rating loses a rate of points per month, floored at 0. value
    max(0, rating − months · rate). -/
theorem fam_elo_decay_1 : (fmax 0 (1500 - (6 * 10))) = 1440 := by decide

/-- email: deliverability(980, 1000) = 98 — EMAIL — DELIVERABILITY AND SENDER REPUTATION, AS ARITHMETIC
    (distinct from generic messaging transport). Sending mail is numbers: how much reaches the inbox, how much
    is flagged as spam, who opts out, hard bounces, complaint-driven reputation, click-through on what was
    opened, list hygiene, and the throttle a send must respect. Crosses to `messaging` — email is the reputation
    layer over the message transport. A measure. */ const PROOF = 'email arithmetic (deliverability, spam rate,
    opt-out, hard bounce, reputation, click rate, list hygiene, throttle); the sender-reputation layer over
    messaging transport; a measure crossed to messaging' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'email', dst: 'messaging', formula, value, proof: PROOF, ...extra }, holds, { name: `email.${name}`,
    params }) export class EmailFormulas { /** DELIVERABILITY: the share of sent mail that reached the inbox.
    value ⌊inbox · 100 / sent⌋. -/
theorem fam_email_deliverability_1 : ((980 * 100) / 1000) = 98 := by decide

/-- email: spam(5, 1000) = 0 — SPAM RATE: the share of sent mail flagged as spam. value ⌊flagged · 100 / sent⌋. -/
theorem fam_email_spam_1 : ((5 * 100) / 1000) = 0 := by decide

/-- email: optout(3, 1000) = 0 — OPT-OUT RATE: unsubscribes over delivered mail. value ⌊unsub · 100 /
    delivered⌋. -/
theorem fam_email_optout_1 : ((3 * 100) / 1000) = 0 := by decide

/-- email: hardbounce(20, 1000) = 2 — HARD BOUNCE RATE: permanent failures over sent mail. value ⌊bounced · 100
    / sent⌋. -/
theorem fam_email_hardbounce_1 : ((20 * 100) / 1000) = 2 := by decide

/-- email: reputation(1, 1000) = 0 — REPUTATION: complaint rate over sent mail — the lower the better. value
    ⌊complaints · 100 / sent⌋. -/
theorem fam_email_reputation_1 : ((1 * 100) / 1000) = 0 := by decide

/-- email: clickrate(150, 600) = 25 — CLICK RATE: clicks over opened mail. value ⌊clicks · 100 / opened⌋. -/
theorem fam_email_clickrate_1 : ((150 * 100) / 600) = 25 := by decide

/-- email: hygiene(900, 1000) = 90 — LIST HYGIENE: valid addresses over the whole list. value ⌊valid · 100 /
    total⌋. -/
theorem fam_email_hygiene_1 : ((900 * 100) / 1000) = 90 := by decide

/-- email: throttle(1200, 500) = 500 — THROTTLE: what a send actually delivers under a per-window limit. value
    min(sent, limit). -/
theorem fam_email_throttle_1 : (fmin 1200 500) = 500 := by decide

/-- email: throttle(300, 500) = 300 — THROTTLE: what a send actually delivers under a per-window limit. value
    min(sent, limit). -/
theorem fam_email_throttle_2 : (fmin 300 500) = 300 := by decide

/-- embedding: dimensions(768, 12) = 9216 — EMBEDDING — VECTORS AS ARITHMETIC. An embedding is a table of
    integer coordinates: how big the table is, the size of a lookup, the squared distance between two points, a
    dot-product similarity, a per-cent cosine proxy, a projection's dropped dimensions, and the Hamming distance
    of two codes. Crosses to `linearalgebra` — an embedding is a vector in a space linear algebra measures. A
    measure. */ const PROOF = 'embedding arithmetic (dimensions, dot similarity, squared L2, table size, lookup
    offset, projection, per-cent cosine, hamming); a measure crossed to linearalgebra' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'embedding', dst: 'linearalgebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `embedding.${name}`, params }) export class EmbeddingFormulas { /** DIMENSIONS: a
    table of rows by columns. value rows · cols. -/
theorem fam_embedding_dimensions_1 : (768 * 12) = 9216 := by decide

/-- embedding: dotsim(3, 4, 5) = 32 — DOT SIMILARITY: an integer dot-product proxy over three coordinates. value
    a · b + b · cc. -/
theorem fam_embedding_dotsim_1 : ((3 * 4) + (4 * 5)) = 32 := by decide

/-- embedding: tablesize(1000, 768) = 768000 — TABLE SIZE: tokens at a dimension each. value tokens · dim. -/
theorem fam_embedding_tablesize_1 : (1000 * 768) = 768000 := by decide

/-- embedding: lookup(10, 768) = 7680 — LOOKUP: the flat offset of a row in a table with dim columns. value
    index · dim. -/
theorem fam_embedding_lookup_1 : (10 * 768) = 7680 := by decide

/-- embedding: projection(768, 256) = 512 — PROJECTION: the dimensions dropped when projecting dim down to keep.
    value max(0, dim − keep). -/
theorem fam_embedding_projection_1 : (fmax 0 (768 - 256)) = 512 := by decide

/-- embedding: cosine(7, 10) = 70 — COSINE: a per-cent similarity proxy, dot over norm. value ⌊dot · 100 /
    norm⌋. -/
theorem fam_embedding_cosine_1 : ((7 * 100) / 10) = 70 := by decide

/-- embedding: cosine(5, 0) = 0 — COSINE: a per-cent similarity proxy, dot over norm. value ⌊dot · 100 / norm⌋. -/
theorem fam_embedding_cosine_2 : ((5 * 100) / 0) = 0 := by decide

/-- embroidery: stitchcount(1000, 5) = 5000 -/
theorem fam_embroidery_stitchcount_1 : (1000 * 5) = 5000 := by decide

/-- embroidery: threadcolors(12, 6) = 18 -/
theorem fam_embroidery_threadcolors_1 : (12 + 6) = 18 := by decide

/-- embroidery: stitchtypes(8, 0) = 8 -/
theorem fam_embroidery_stitchtypes_1 : (8 + 0) = 8 := by decide

/-- embroidery: densitypersqcm(5000, 100) = 50 -/
theorem fam_embroidery_densitypersqcm_1 : (5000 / 100) = 50 := by decide

/-- embroidery: motifsubsets(5) = 32 -/
theorem fam_embroidery_motifsubsets_1 : (2 ^ 5) = 32 := by decide

/-- embroidery: coverage(85, 100) = 85 -/
theorem fam_embroidery_coverage_1 : ((85 * 100) / 100) = 85 := by decide

/-- embryology: gestation(280) = 280 — EMBRYOLOGY — EARLY DEVELOPMENT, AS ARITHMETIC. Growth is numbers: days
    gestated, cells per hour, the share of embryos viable, implanted, reaching blastocyst, fragmented or
    differentiated, and a morphology score. Crosses to `med` — embryology is what medicine measures at the
    start. A measure. */ const PROOF = 'embryology arithmetic (gestation, cleavage, viability, implantation,
    blastocyst, fragmentation, morphology, differentiation); a measure crossed to med' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'embryology', dst: 'med', formula, value, proof: PROOF, ...extra
    }, holds, { name: `embryology.${name}`, params }) export class EmbryologyFormulas { /** GESTATION: the days
    carried. value days. -/
theorem fam_embryology_gestation_1 : 280 = 280 := by decide

/-- embryology: cleavage(8, 4) = 2 — CLEAVAGE: cells divided over the hours. value ⌊cells / hours⌋. -/
theorem fam_embryology_cleavage_1 : (8 / 4) = 2 := by decide

/-- embryology: viability(8, 10) = 80 — VIABILITY as a percentage. value ⌊viable · 100 / embryos⌋. -/
theorem fam_embryology_viability_1 : ((8 * 100) / 10) = 80 := by decide

/-- embryology: implantation(2, 4) = 50 — IMPLANTATION as a percentage. value ⌊implanted · 100 / transferred⌋. -/
theorem fam_embryology_implantation_1 : ((2 * 100) / 4) = 50 := by decide

/-- embryology: blastocyst(5, 10) = 50 — BLASTOCYST: the share fertilized that reach blastocyst. value ⌊reached
    · 100 / fertilized⌋. -/
theorem fam_embryology_blastocyst_1 : ((5 * 100) / 10) = 50 := by decide

/-- embryology: fragmentation(2, 10) = 20 — FRAGMENTATION as a percentage of volume. value ⌊fragmented · 100 /
    volume⌋. -/
theorem fam_embryology_fragmentation_1 : ((2 * 100) / 10) = 20 := by decide

/-- embryology: morphology(5) = 5 — MORPHOLOGY: the grading score. value score. -/
theorem fam_embryology_morphology_1 : 5 = 5 := by decide

/-- embryology: differentiation(50, 100) = 50 — DIFFERENTIATION as a percentage. value ⌊differentiated · 100 /
    total⌋. -/
theorem fam_embryology_differentiation_1 : ((50 * 100) / 100) = 50 := by decide

/-- emissions: intensity(1000, 40) = 25 — EMISSIONS — CARBON ACCOUNTING AS ARITHMETIC (chosen by the registry,
    not by hand). Greenhouse gas is numbers: intensity per unit of output, emissions per head, the reduction
    against a baseline, the scope share, the CO2e equivalent, the carbon tax owed, the overage past an
    allowance, and how much is sequestered. Crosses to `climate` — emissions are what the climate integrates. A
    measure. */ const PROOF = 'emissions arithmetic (intensity, per-capita, reduction, scope share, CO2e
    equivalent, carbon tax, allowance overage, sequestration); a measure crossed to climate' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'emissions', dst: 'climate', formula, value, proof: PROOF,
    ...extra }, holds, { name: `emissions.${name}`, params }) export class EmissionsFormulas { /** INTENSITY:
    emissions per unit of output. value ⌊emitted / output⌋. -/
theorem fam_emissions_intensity_1 : (1000 / 40) = 25 := by decide

/-- emissions: percapita(8000, 1000) = 8 — PER CAPITA: total emissions per head. value ⌊total / population⌋. -/
theorem fam_emissions_percapita_1 : (8000 / 1000) = 8 := by decide

/-- emissions: reduction(1000, 750) = 25 — REDUCTION against a baseline, as a percentage. value ⌊(baseline −
    current) · 100 / baseline⌋. -/
theorem fam_emissions_reduction_1 : (((1000 - 750) * 100) / 1000) = 25 := by decide

/-- emissions: scope(300, 1000) = 30 — SCOPE share: direct emissions as a percentage of the total. value ⌊direct
    · 100 / total⌋. -/
theorem fam_emissions_scope_1 : ((300 * 100) / 1000) = 30 := by decide

/-- emissions: equivalent(50, 25) = 1250 — CO2 EQUIVALENT: a gas weighted by its warming factor. value gas ·
    factor. -/
theorem fam_emissions_equivalent_1 : (50 * 25) = 1250 := by decide

/-- emissions: tax(1000, 15) = 150 — CARBON TAX: emissions at a rate per hundred. value ⌊emitted · rate / 100⌋. -/
theorem fam_emissions_tax_1 : ((1000 * 15) / 100) = 150 := by decide

/-- emissions: allowance(1200, 1000) = 200 — ALLOWANCE overage: emissions past a cap. value max(0, emitted −
    cap). -/
theorem fam_emissions_allowance_1 : (fmax 0 (1200 - 1000)) = 200 := by decide

/-- emissions: allowance(800, 1000) = 0 — ALLOWANCE overage: emissions past a cap. value max(0, emitted − cap). -/
theorem fam_emissions_allowance_2 : (fmax 0 (800 - 1000)) = 0 := by decide

/-- emissions: sequestration(250, 1000) = 25 — SEQUESTRATION: captured as a percentage of emitted. value
    ⌊captured · 100 / emitted⌋. -/
theorem fam_emissions_sequestration_1 : ((250 * 100) / 1000) = 25 := by decide

/-- emotion: valence(70, 30) = 40 — EMOTION — AFFECT AS ARITHMETIC. Feeling is numbers: the balance of positive
    over negative, arousal above a resting baseline, how well a stirred state is regulated, empathy matched to
    another's cues, stress against resources, recovery back to baseline, contagion across a group, and the
    intensity of a peak over its duration. Crosses to `med` — emotion is what medicine reads off the patient. A
    measure. */ const PROOF = 'emotion arithmetic (valence, arousal, regulation, empathy, stress, recovery,
    contagion, intensity); affect as a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'emotion', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `emotion.${name}`,
    params }) export class EmotionFormulas { /** VALENCE: positive feeling net of negative. value positive −
    negative (may be negative). -/
theorem fam_emotion_valence_1 : (70 - 30) = 40 := by decide

/-- emotion: arousal(80, 20) = 60 — AROUSAL: intensity above a resting baseline. value max(0, intensity −
    baseline). -/
theorem fam_emotion_arousal_1 : (fmax 0 (80 - 20)) = 60 := by decide

/-- emotion: arousal(10, 20) = 0 — AROUSAL: intensity above a resting baseline. value max(0, intensity −
    baseline). -/
theorem fam_emotion_arousal_2 : (fmax 0 (10 - 20)) = 0 := by decide

/-- emotion: regulation(3, 4) = 75 — REGULATION: how much of a stirred state is controlled, per trigger. value
    ⌊controlled · 100 / triggers⌋. -/
theorem fam_emotion_regulation_1 : ((3 * 100) / 4) = 75 := by decide

/-- emotion: empathy(4, 5) = 80 — EMPATHY: cues matched out of those shown. value ⌊matched · 100 / cues⌋. -/
theorem fam_emotion_empathy_1 : ((4 * 100) / 5) = 80 := by decide

/-- emotion: stress(150, 100) = 150 — STRESS: demands measured against resources. value ⌊demands · 100 /
    resources⌋. -/
theorem fam_emotion_stress_1 : ((150 * 100) / 100) = 150 := by decide

/-- emotion: recovery(20, 80) = 60 — RECOVERY: the climb back down from an elevated state to baseline. value
    max(0, elevated − baseline). -/
theorem fam_emotion_recovery_1 : (fmax 0 (80 - 20)) = 60 := by decide

/-- emotion: contagion(3, 12) = 25 — CONTAGION: how far a feeling spreads through a group. value ⌊affected · 100
    / group⌋. -/
theorem fam_emotion_contagion_1 : ((3 * 100) / 12) = 25 := by decide

/-- emotion: intensity(100, 4) = 25 — INTENSITY: a peak spread over its duration. value ⌊peak / duration⌋. -/
theorem fam_emotion_intensity_1 : (100 / 4) = 25 := by decide

/-- empiricism: observations(100, 5) = 500 -/
theorem fam_empiricism_observations_1 : (100 * 5) = 500 := by decide

/-- empiricism: inductionsteps(3, 2) = 5 -/
theorem fam_empiricism_inductionsteps_1 : (3 + 2) = 5 := by decide

/-- empiricism: hypothesissubsets(5) = 32 -/
theorem fam_empiricism_hypothesissubsets_1 : (2 ^ 5) = 32 := by decide

/-- empiricism: confirmationratio(70, 100) = 70 -/
theorem fam_empiricism_confirmationratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- empiricism: certaintydegree(60, 100) = 60 -/
theorem fam_empiricism_certaintydegree_1 : ((60 * 100) / 100) = 60 := by decide

/-- emulsification: dropletsize(1000, 50) = 20 -/
theorem fam_emulsification_dropletsize_1 : (1000 / 50) = 20 := by decide

/-- emulsification: stabilityindex(90, 100) = 90 -/
theorem fam_emulsification_stabilityindex_1 : ((90 * 100) / 100) = 90 := by decide

/-- emulsification: emulsifierratio(3, 100) = 3 -/
theorem fam_emulsification_emulsifierratio_1 : ((3 * 100) / 100) = 3 := by decide

/-- emulsification: phaseratio(70, 30) = 233 -/
theorem fam_emulsification_phaseratio_1 : ((70 * 100) / 30) = 233 := by decide

/-- emulsification: viscosity(50, 4) = 200 -/
theorem fam_emulsification_viscosity_1 : (50 * 4) = 200 := by decide

/-- emulsification: creamingrate(100, 95) = 5 -/
theorem fam_emulsification_creamingrate_1 : (fmax 0 (100 - 95)) = 5 := by decide

/-- emulsification: surfacetension(72, 2) = 36 -/
theorem fam_emulsification_surfacetension_1 : (72 / 2) = 36 := by decide

/-- emulsification: coalescencetime(3600, 60) = 60 -/
theorem fam_emulsification_coalescencetime_1 : (3600 / 60) = 60 := by decide

/-- endocrinology: homa(90, 10) = 2 — ENDOCRINOLOGY — THE HORMONE SYSTEM, AS ARITHMETIC. The glands and their
    signals are numbers: insulin resistance from glucose and insulin, an HbA1c proxy from mean glucose, thyroid
    and cortisol ratios, insulin sensitivity, glandular secretion, a dosing half-life, and feedback-loop gain.
    Crosses to `med` — endocrinology is a measure medicine reads. */ const PROOF = 'endocrinology arithmetic
    (HOMA-IR, HbA1c proxy, thyroid ratio, cortisol ratio, insulin sensitivity, secretion, half-life, feedback
    gain); the hormone system as integers; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'endocrinology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `endocrinology.${name}`, params }) export class EndocrinologyFormulas { /** HOMA-IR: insulin
    resistance proxy from fasting glucose and insulin. value ⌊glucose · insulin / 405⌋. -/
theorem fam_endocrinology_homa_1 : ((90 * 10) / 405) = 2 := by decide

/-- endocrinology: a1c(5400) = 10 — HbA1c PROXY from mean glucose. value ⌊(glucose + 4600) / 1000⌋. -/
theorem fam_endocrinology_a1c_1 : ((5400 + 4600) / 1000) = 10 := by decide

/-- endocrinology: thyroid(2, 4) = 50 — THYROID RATIO: TSH over free T4. value ⌊tsh · 100 / t4⌋. -/
theorem fam_endocrinology_thyroid_1 : ((2 * 100) / 4) = 50 := by decide

/-- endocrinology: cortisol(150, 50) = 300 — CORTISOL RATIO: morning over evening. value ⌊morning · 100 /
    evening⌋. -/
theorem fam_endocrinology_cortisol_1 : ((150 * 100) / 50) = 300 := by decide

/-- endocrinology: sensitivity(80, 10) = 800 — INSULIN SENSITIVITY: glucose uptake over insulin. value ⌊uptake ·
    100 / insulin⌋. -/
theorem fam_endocrinology_sensitivity_1 : ((80 * 100) / 10) = 800 := by decide

/-- endocrinology: secretion(100, 4) = 25 — SECRETION: hormone output per unit of gland. value ⌊hormone /
    gland⌋. -/
theorem fam_endocrinology_secretion_1 : (100 / 4) = 25 := by decide

/-- endocrinology: halflife(10, 5) = 1 — HALF-LIFE: dosing half-life from dose and clearance. value ⌊dose · 693
    / (clearance · 1000)⌋. -/
theorem fam_endocrinology_halflife_1 : ((10 * 693) / (5 * 1000)) = 1 := by decide

/-- endocrinology: feedback(90, 30) = 300 — FEEDBACK GAIN: response over stimulus. value ⌊response · 100 /
    stimulus⌋. -/
theorem fam_endocrinology_feedback_1 : ((90 * 100) / 30) = 300 := by decide

/-- endpoint: latency(5000, 100) = 50 — ENDPOINT — PAYLOAD'S CUSTOM ENDPOINTS AND REST + GRAPHQL API, AS
    ARITHMETIC (chosen by the CMS route registry, not by hand). Serving the API is numbers: average latency,
    request rate, the share of OK responses, the handler methods, the share of protected routes, the bytes a
    response carries, query depth, and the error share. Crosses to `payload` — the endpoints are what Payload
    exposes. A measure. */ const PROOF = 'endpoint arithmetic (latency, rate, status share, methods, auth share,
    payload bytes, query depth, error share); Payload custom endpoints over REST + GraphQL; a measure crossed to
    payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'endpoint', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `endpoint.${name}`, params }) export class
    EndpointFormulas { /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total /
    requests⌋. -/
theorem fam_endpoint_latency_1 : (5000 / 100) = 50 := by decide

/-- endpoint: rate(6000, 60) = 100 — REQUEST RATE: requests over seconds. value ⌊requests / seconds⌋. -/
theorem fam_endpoint_rate_1 : (6000 / 60) = 100 := by decide

/-- endpoint: status(990, 1000) = 99 — OK STATUS SHARE as a percentage. value ⌊ok · 100 / total⌋. -/
theorem fam_endpoint_status_1 : ((990 * 100) / 1000) = 99 := by decide

/-- endpoint: methods(4) = 4 — HANDLER METHODS: the count a route exposes. value count. -/
theorem fam_endpoint_methods_1 : 4 = 4 := by decide

/-- endpoint: auth(3, 10) = 30 — AUTH SHARE: protected routes as a percentage of all. value ⌊protected · 100 /
    total⌋. -/
theorem fam_endpoint_auth_1 : ((3 * 100) / 10) = 30 := by decide

/-- endpoint: payload(20, 8) = 160 — PAYLOAD SIZE: fields at a byte width each. value fields · bytes. -/
theorem fam_endpoint_payload_1 : (20 * 8) = 160 := by decide

/-- endpoint: depth(5) = 5 — QUERY DEPTH: the GraphQL population a query reaches. value population. -/
theorem fam_endpoint_depth_1 : 5 = 5 := by decide

/-- endpoint: error(5, 1000) = 0 — ERROR SHARE: errors as a percentage of the requests served. value ⌊errors ·
    100 / requests⌋. -/
theorem fam_endpoint_error_1 : ((5 * 100) / 1000) = 0 := by decide

/-- endpoint: error(50, 1000) = 5 — ERROR SHARE: errors as a percentage of the requests served. value ⌊errors ·
    100 / requests⌋. -/
theorem fam_endpoint_error_2 : ((50 * 100) / 1000) = 5 := by decide

/-- endurance: vo2proxy(3500, 70) = 50 -/
theorem fam_endurance_vo2proxy_1 : (3500 / 70) = 50 := by decide

/-- endurance: timetoexhaustion(6000, 20) = 300 -/
theorem fam_endurance_timetoexhaustion_1 : (6000 / 20) = 300 := by decide

/-- endurance: aerobicratio(80, 100) = 80 -/
theorem fam_endurance_aerobicratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- endurance: lactatethreshold(85, 100) = 85 -/
theorem fam_endurance_lactatethreshold_1 : ((85 * 100) / 100) = 85 := by decide

/-- endurance: heartratereserve(190, 60) = 130 -/
theorem fam_endurance_heartratereserve_1 : (fmax 0 (190 - 60)) = 130 := by decide

/-- endurance: trainingload(120, 5) = 600 -/
theorem fam_endurance_trainingload_1 : (120 * 5) = 600 := by decide

/-- endurance: distancecapacity(10, 42) = 420 -/
theorem fam_endurance_distancecapacity_1 : (10 * 42) = 420 := by decide

/-- endurance: fatigueindex(30, 300) = 10 -/
theorem fam_endurance_fatigueindex_1 : ((30 * 100) / 300) = 10 := by decide

/-- energy: power(240, 10) = 2400 — ENERGY — THE ENERGY/POWER INDUSTRY, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Generation and delivery are numbers: power from voltage and current, energy over
    hours, conversion efficiency, grid load, the bill, installed capacity, carbon emitted, and state of charge.
    Crosses to `obs` — energy is what observability watches. A measure. */ const PROOF = 'energy arithmetic
    (power, energy, efficiency, load, cost, capacity, carbon, storage); the energy/power industry as a measure
    crossed to obs' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'energy', dst: 'obs', formula,
    value, proof: PROOF, ...extra }, holds, { name: `energy.${name}`, params }) export class EnergyFormulas {
    /** POWER: voltage times current. value voltage · current (watts). -/
theorem fam_energy_power_1 : (240 * 10) = 2400 := by decide

/-- energy: energy(2400, 3) = 7200 — ENERGY: power over hours. value power · hours (watt-hours). -/
theorem fam_energy_energy_1 : (2400 * 3) = 7200 := by decide

/-- energy: efficiency(85, 100) = 85 — EFFICIENCY: output over input as a percentage. value ⌊output · 100 /
    input⌋. -/
theorem fam_energy_efficiency_1 : ((85 * 100) / 100) = 85 := by decide

/-- energy: load(800, 1000) = 80 — LOAD: demand over capacity as a percentage. value ⌊demand · 100 / capacity⌋. -/
theorem fam_energy_load_1 : ((800 * 100) / 1000) = 80 := by decide

/-- energy: cost(500, 15) = 75 — COST: kilowatt-hours at a rate in cents. value ⌊kwh · rate / 100⌋. -/
theorem fam_energy_cost_1 : ((500 * 15) / 100) = 75 := by decide

/-- energy: capacity(20, 400) = 8000 — CAPACITY: panels at watts each. value panels · watts. -/
theorem fam_energy_capacity_1 : (20 * 400) = 8000 := by decide

/-- energy: carbon(1000, 420) = 420 — CARBON: kilowatt-hours at an emission factor per thousand. value ⌊kwh ·
    factor / 1000⌋. -/
theorem fam_energy_carbon_1 : ((1000 * 420) / 1000) = 420 := by decide

/-- energy: storage(90, 100) = 90 — STORAGE: state of charge over capacity as a percentage. value ⌊charge · 100
    / capacity⌋. -/
theorem fam_energy_storage_1 : ((90 * 100) / 100) = 90 := by decide

/-- enrollment: rate(500, 2000) = 25 — ENROLLMENT — THE REGISTRY'S STUDENT-BODY DOMAIN, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). A cohort is numbers: what share of applicants enroll, who comes back,
    who leaves, the yield on admissions, the student-faculty ratio, seats left, the waitlist, and
    full-time-equivalent head count. Crosses to `sociology` — enrollment is the population a cohort study
    measures. A measure. */ const PROOF = 'enrollment arithmetic (enroll rate, retention, attrition, admission
    yield, student-faculty ratio, remaining capacity, waitlist, full-time-equivalent); the registry\'s
    student-body domain; a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'enrollment', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `enrollment.${name}`, params }) export class EnrollmentFormulas { /** ENROLL RATE: what share of applicants
    enroll, as a percentage. value ⌊enrolled · 100 / applied⌋. -/
theorem fam_enrollment_rate_1 : ((500 * 100) / 2000) = 25 := by decide

/-- enrollment: retention(850, 1000) = 85 — RETENTION: what share of a starting cohort returns, as a percentage.
    value ⌊returned · 100 / start⌋. -/
theorem fam_enrollment_retention_1 : ((850 * 100) / 1000) = 85 := by decide

/-- enrollment: attrition(1000, 850) = 150 — ATTRITION: how many of a starting cohort did not return. value
    max(0, start − returned). -/
theorem fam_enrollment_attrition_1 : (fmax 0 (1000 - 850)) = 150 := by decide

/-- enrollment: yield(600, 1500) = 40 — ADMISSION YIELD: what share of admitted students enroll, as a
    percentage. value ⌊enrolled · 100 / admitted⌋. -/
theorem fam_enrollment_yield_1 : ((600 * 100) / 1500) = 40 := by decide

/-- enrollment: ratio(300, 20) = 15 — STUDENT-FACULTY RATIO: students per faculty member. value ⌊students /
    faculty⌋. -/
theorem fam_enrollment_ratio_1 : (300 / 20) = 15 := by decide

/-- enrollment: capacity(500, 450) = 50 — REMAINING CAPACITY: seats not yet filled. value max(0, seats −
    filled). -/
theorem fam_enrollment_capacity_1 : (fmax 0 (500 - 450)) = 50 := by decide

/-- enrollment: waitlist(2000, 1500) = 500 — WAITLIST: applicants beyond the seats available. value max(0,
    applied − seats). -/
theorem fam_enrollment_waitlist_1 : (fmax 0 (2000 - 1500)) = 500 := by decide

/-- enrollment: fulltimeequivalent(100, 30) = 110 — FULL-TIME EQUIVALENT: full-timers plus a third of
    part-timers. value fulltime + ⌊parttime / 3⌋. -/
theorem fam_enrollment_fulltimeequivalent_1 : (100 + (30 / 3)) = 110 := by decide

/-- enterprise: po(1000, 50) = 50000 — ENTERPRISE — ERP AND PROCUREMENT, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Running a business is numbers: a purchase order's total, whether an amount clears
    its approval threshold, the met share of an SLA, what a request is actually procured at, lead time,
    inventory turnover, capacity utilization, and when to reorder. Crosses to `accounting` — enterprise is what
    the books record. A measure. */ const PROOF = 'enterprise arithmetic (purchase order, approval, SLA,
    procurement, lead time, turnover, utilization, reorder); the registry\'s ERP/procurement domain; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'enterprise', dst:
    'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `enterprise.${name}`, params })
    export class EnterpriseFormulas { /** PURCHASE ORDER: a line of quantity at a unit price. value quantity ·
    price. -/
theorem fam_enterprise_po_1 : (1000 * 50) = 50000 := by decide

/-- enterprise: sla(999, 1000) = 99 — THE SLA: the met share of the measured calls, as a percentage. value ⌊met
    · 100 / total⌋. -/
theorem fam_enterprise_sla_1 : ((999 * 100) / 1000) = 99 := by decide

/-- enterprise: procurement(100, 60) = 60 — PROCUREMENT: a request is procured at the smaller of what was asked
    and what cleared. value min(requested, approved). -/
theorem fam_enterprise_procurement_1 : (fmin 100 60) = 60 := by decide

/-- enterprise: leadtime(10, 17) = 7 — LEAD TIME: the days between order and receipt, never negative. value
    max(0, received − ordered). -/
theorem fam_enterprise_leadtime_1 : (fmax 0 (17 - 10)) = 7 := by decide

/-- enterprise: leadtime(17, 10) = 0 — LEAD TIME: the days between order and receipt, never negative. value
    max(0, received − ordered). -/
theorem fam_enterprise_leadtime_2 : (fmax 0 (10 - 17)) = 0 := by decide

/-- enterprise: turnover(12000, 1000) = 12 — INVENTORY TURNOVER: cost of goods sold over the inventory held.
    value ⌊cogs / inventory⌋. -/
theorem fam_enterprise_turnover_1 : (12000 / 1000) = 12 := by decide

/-- enterprise: utilization(75, 100) = 75 — UTILIZATION: used against capacity, as a percentage. value ⌊used ·
    100 / capacity⌋. -/
theorem fam_enterprise_utilization_1 : ((75 * 100) / 100) = 75 := by decide

/-- entomology: colony(50000, 1) = 50001 — ENTOMOLOGY — THE STUDY OF INSECTS, AS ARITHMETIC. Colonies are
    counted: workers plus queens, the stages of a metamorphosis, the swarm packed into an area, what a forager
    brings back per trip, the share of a crop infested or pollinated, the fraction of eggs that hatch, and the
    beats a wing makes each second. Crosses to `ecology` — insects are what an ecology lives on. A measure. */
    const PROOF = 'entomology arithmetic (colony headcount, metamorphosis stages, swarm density, foraging yield,
    infestation, pollination, lifecycle hatch, wingbeat); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'entomology', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `entomology.${name}`, params }) export class EntomologyFormulas { /** COLONY: the
    headcount of workers and queens. value workers + queens. -/
theorem fam_entomology_colony_1 : (50000 + 1) = 50001 := by decide

/-- entomology: metamorphosis(4) = 4 — METAMORPHOSIS: the number of stages. value stages. -/
theorem fam_entomology_metamorphosis_1 : 4 = 4 := by decide

/-- entomology: swarm(12000, 3) = 4000 — SWARM density: individuals over an area. value ⌊individuals / area⌋. -/
theorem fam_entomology_swarm_1 : (12000 / 3) = 4000 := by decide

/-- entomology: foraging(600, 20) = 30 — FORAGING: what is collected per trip. value ⌊collected / trips⌋. -/
theorem fam_entomology_foraging_1 : (600 / 20) = 30 := by decide

/-- entomology: infestation(30, 120) = 25 — INFESTATION as a percentage. value ⌊infested · 100 / total⌋. -/
theorem fam_entomology_infestation_1 : ((30 * 100) / 120) = 25 := by decide

/-- entomology: pollination(90, 200) = 45 — POLLINATION as a percentage. value ⌊visited · 100 / flowers⌋. -/
theorem fam_entomology_pollination_1 : ((90 * 100) / 200) = 45 := by decide

/-- entomology: lifecycle(1000, 950) = 95 — LIFECYCLE: the share of eggs that hatch. value ⌊hatched · 100 /
    eggs⌋. -/
theorem fam_entomology_lifecycle_1 : ((950 * 100) / 1000) = 95 := by decide

/-- entomology: wingbeat(12000, 60) = 200 — WINGBEAT: beats over seconds. value ⌊beats / seconds⌋. -/
theorem fam_entomology_wingbeat_1 : (12000 / 60) = 200 := by decide

/-- entropy: conditionalentropy(18, 9) = 9 — CONDITIONAL ENTROPY: the joint bits that remain once x is known.
    value max(0, joint − x). -/
theorem fam_entropy_conditionalentropy_1 : (fmax 0 (18 - 9)) = 9 := by decide

/-- entropy: mutualinformation(10, 8, 15) = 3 — MUTUAL INFORMATION: the bits x and y share. value max(0, x + y −
    joint). -/
theorem fam_entropy_mutualinformation_1 : (fmax 0 ((10 + 8) - 15)) = 3 := by decide

/-- entropy: informationgain(16, 10) = 6 — INFORMATION GAIN: the bits a measurement buys. value max(0, prior −
    posterior). -/
theorem fam_entropy_informationgain_1 : (fmax 0 (16 - 10)) = 6 := by decide

/-- entropy: perplexity(5) = 32 — PERPLEXITY: the branching factor of `bits` of entropy. value 2^bits (0 when it
    overflows). -/
theorem fam_entropy_perplexity_1 : (2 ^ 5) = 32 := by decide

/-- enzymology: michaelis(100, 50, 50) = 50 — ENZYMOLOGY — ENZYME KINETICS AS ARITHMETIC. A catalysed reaction
    is numbers: the Michaelis-Menten rate, the velocity from product over time, the turnover number, the
    specificity constant, percent inhibition, enzyme activity, catalytic efficiency, and the substrate left.
    Crosses to `biochemistry` — enzymology is the kinetics biochemistry rests on. A measure. */ const PROOF =
    'enzymology arithmetic (Michaelis-Menten rate, velocity, turnover, specificity, inhibition, activity,
    catalytic efficiency, substrate); enzyme kinetics as integers; a measure crossed to biochemistry' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'enzymology', dst: 'biochemistry', formula, value, proof: PROOF,
    ...extra }, holds, { name: `enzymology.${name}`, params }) export class EnzymologyFormulas { /**
    MICHAELIS-MENTEN rate at a substrate level. value ⌊vmax · s / (km + s)⌋. -/
theorem fam_enzymology_michaelis_1 : ((100 * 50) / (50 + 50)) = 50 := by decide

/-- enzymology: velocity(6000, 60) = 100 — VELOCITY: product formed over time. value ⌊product / time⌋. -/
theorem fam_enzymology_velocity_1 : (6000 / 60) = 100 := by decide

/-- enzymology: turnover(1000, 5) = 200 — TURNOVER number kcat: Vmax over enzyme concentration. value ⌊vmax /
    enzyme⌋. -/
theorem fam_enzymology_turnover_1 : (1000 / 5) = 200 := by decide

/-- enzymology: specificity(200, 4) = 50 — SPECIFICITY constant: kcat over Km. value ⌊kcat / km⌋. -/
theorem fam_enzymology_specificity_1 : (200 / 4) = 50 := by decide

/-- enzymology: inhibition(100, 25) = 75 — INHIBITION as a percentage of lost velocity. value ⌊(v0 − vi) · 100 /
    v0⌋. -/
theorem fam_enzymology_inhibition_1 : (((100 - 25) * 100) / 100) = 75 := by decide

/-- enzymology: activity(50, 20) = 1000 — ACTIVITY: units of enzyme at a volume. value units · volume. -/
theorem fam_enzymology_activity_1 : (50 * 20) = 1000 := by decide

/-- enzymology: catalyticefficiency(200, 4) = 50000 — CATALYTIC EFFICIENCY: kcat over Km scaled by a thousand.
    value ⌊kcat · 1000 / km⌋. -/
theorem fam_enzymology_catalyticefficiency_1 : ((200 * 1000) / 4) = 50000 := by decide

/-- enzymology: substrate(1000, 400) = 600 — SUBSTRATE left after some is consumed. value max(0, initial −
    consumed). -/
theorem fam_enzymology_substrate_1 : (fmax 0 (1000 - 400)) = 600 := by decide

/-- epidemiology: r0(10, 30) = 3 — EPIDEMIOLOGY — DISEASE SPREAD AS ARITHMETIC (chosen by the registry, not by
    hand). An outbreak is numbers: the basic reproduction number, incidence per 100k, prevalence, the attack
    rate, case fatality, the herd-immunity threshold, doubling of cases, and vaccine efficacy. Crosses to `med`
    — epidemiology is what medicine measures. A measure. */ const PROOF = 'epidemiology arithmetic (R0,
    incidence, prevalence, attack rate, case fatality, herd immunity, doubling, vaccine efficacy); a measure
    crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'epidemiology', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `epidemiology.${name}`, params }) export class
    EpidemiologyFormulas { /** R0: contacts times transmissibility (a percent). value ⌊contacts ·
    transmissibility / 100⌋. -/
theorem fam_epidemiology_r0_1 : ((10 * 30) / 100) = 3 := by decide

/-- epidemiology: incidence(50, 100000) = 50 — INCIDENCE: new cases per 100k of the population. value ⌊cases ·
    100000 / population⌋. -/
theorem fam_epidemiology_incidence_1 : ((50 * 100000) / 100000) = 50 := by decide

/-- epidemiology: prevalence(200, 1000) = 20 — PREVALENCE: existing cases as a percentage of the population.
    value ⌊existing · 100 / population⌋. -/
theorem fam_epidemiology_prevalence_1 : ((200 * 100) / 1000) = 20 := by decide

/-- epidemiology: attack(45, 100) = 45 — ATTACK RATE: the ill as a percentage of the exposed. value ⌊ill · 100 /
    exposed⌋. -/
theorem fam_epidemiology_attack_1 : ((45 * 100) / 100) = 45 := by decide

/-- epidemiology: fatality(2, 100) = 2 — CASE FATALITY: deaths as a percentage of cases. value ⌊deaths · 100 /
    cases⌋. -/
theorem fam_epidemiology_fatality_1 : ((2 * 100) / 100) = 2 := by decide

/-- epidemiology: herd(4) = 75 — HERD IMMUNITY: the threshold percentage from R0. value R0 > 0 ? ⌊(R0 − 1) · 100
    / R0⌋ : 0. -/
theorem fam_epidemiology_herd_1 : (((4 - 1) * 100) / 4) = 75 := by decide

/-- epidemiology: doubling(300, 150) = 150 — DOUBLING: the growth in cases over the previous count. value max(0,
    cases − previous). -/
theorem fam_epidemiology_doubling_1 : (fmax 0 (300 - 150)) = 150 := by decide

/-- epidemiology: doubling(100, 150) = 0 — DOUBLING: the growth in cases over the previous count. value max(0,
    cases − previous). -/
theorem fam_epidemiology_doubling_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- epidemiology: vaccine(95, 100) = 95 — VACCINE EFFICACY: the protected as a percentage of the vaccinated.
    value ⌊protected · 100 / vaccinated⌋. -/
theorem fam_epidemiology_vaccine_1 : ((95 * 100) / 100) = 95 := by decide

/-- epigenetics: methylation(30, 40) = 75 — EPIGENETICS — HERITABLE CHANGE WITHOUT CHANGING THE SEQUENCE, AS
    ARITHMETIC. Marks and their rates are numbers: the percent of methylated sites, acetylated histones,
    actively expressed genes, silenced imprinted alleles, open chromatin, the aging clock's sites per year, what
    inheritance transmits, and how much a region is remodeled. Crosses to `genetics` — epigenetics is the layer
    above the genes. A measure. */ const PROOF = 'epigenetics arithmetic (methylation, acetylation, expression,
    imprinting, chromatin, clock, inheritance, remodeling); heritable marks above the sequence; a measure
    crossed to genetics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'epigenetics', dst:
    'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `epigenetics.${name}`, params }) export
    class EpigeneticsFormulas { /** METHYLATION: the percent of CpG sites that are methylated. value ⌊methylated
    · 100 / sites⌋. -/
theorem fam_epigenetics_methylation_1 : ((30 * 100) / 40) = 75 := by decide

/-- epigenetics: acetylation(9, 10) = 90 — ACETYLATION: the percent of histones that are acetylated. value
    ⌊acetylated · 100 / histones⌋. -/
theorem fam_epigenetics_acetylation_1 : ((9 * 100) / 10) = 90 := by decide

/-- epigenetics: expression(50, 200) = 25 — EXPRESSION: the percent of genes actively expressed. value ⌊active ·
    100 / genes⌋. -/
theorem fam_epigenetics_expression_1 : ((50 * 100) / 200) = 25 := by decide

/-- epigenetics: imprinting(1, 2) = 50 — IMPRINTING: the percent of alleles silenced by parental imprint. value
    ⌊silenced · 100 / alleles⌋. -/
theorem fam_epigenetics_imprinting_1 : ((1 * 100) / 2) = 50 := by decide

/-- epigenetics: chromatin(3, 4) = 75 — CHROMATIN: the percent of regions in open (accessible) chromatin. value
    ⌊open · 100 / total⌋. -/
theorem fam_epigenetics_chromatin_1 : ((3 * 100) / 4) = 75 := by decide

/-- epigenetics: clock(3650, 50) = 73 — CLOCK: the aging clock's methylation sites per year of age. value ⌊sites
    / age⌋. -/
theorem fam_epigenetics_clock_1 : (3650 / 50) = 73 := by decide

/-- epigenetics: inheritance(3, 4) = 75 — INHERITANCE: the percent of offspring the mark is transmitted to.
    value ⌊transmitted · 100 / offspring⌋. -/
theorem fam_epigenetics_inheritance_1 : ((3 * 100) / 4) = 75 := by decide

/-- epigenetics: remodeling(20, 80) = 25 — REMODELING: the percent of regions whose chromatin was remodeled.
    value ⌊changed · 100 / regions⌋. -/
theorem fam_epigenetics_remodeling_1 : ((20 * 100) / 80) = 25 := by decide

/-- epigraphy: characters(20, 30) = 600 -/
theorem fam_epigraphy_characters_1 : (20 * 30) = 600 := by decide

/-- epigraphy: damageratio(15, 100) = 15 -/
theorem fam_epigraphy_damageratio_1 : ((15 * 100) / 100) = 15 := by decide

/-- epigraphy: scriptsubsets(5) = 32 -/
theorem fam_epigraphy_scriptsubsets_1 : (2 ^ 5) = 32 := by decide

/-- epigraphy: datingrange(500, 200) = 300 -/
theorem fam_epigraphy_datingrange_1 : (fmax 0 (500 - 200)) = 300 := by decide

/-- epigraphy: wordcount(600, 5) = 120 -/
theorem fam_epigraphy_wordcount_1 : (600 / 5) = 120 := by decide

/-- epigraphy: lacunae(12, 8) = 20 -/
theorem fam_epigraphy_lacunae_1 : (12 + 8) = 20 := by decide

/-- epistemology: beliefstates(8) = 256 -/
theorem fam_epistemology_beliefstates_1 : (2 ^ 8) = 256 := by decide

/-- epistemology: certaintydegree(80, 100) = 80 -/
theorem fam_epistemology_certaintydegree_1 : ((80 * 100) / 100) = 80 := by decide

/-- epistemology: inferencedepth(3, 2) = 5 -/
theorem fam_epistemology_inferencedepth_1 : (3 + 2) = 5 := by decide

/-- epistemology: truthconditions(4) = 16 -/
theorem fam_epistemology_truthconditions_1 : (2 ^ 4) = 16 := by decide

/-- epistemology: doubtmargin(100, 70) = 30 -/
theorem fam_epistemology_doubtmargin_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- equine: speed(100, 10) = 10 — EQUINE — THE HORSE, AS ARITHMETIC (chosen by the registry, not by hand). A
    horse is numbers: speed over ground, the length of a stride, heart rate, body condition, gestation, the
    forage share of a ration, height in hands, and how far a heart rate has yet to recover. Crosses to `vet` —
    equine is what veterinary care measures. A measure. */ const PROOF = 'equine arithmetic (speed, stride,
    heart rate, body condition, gestation, feed ratio, height, recovery); a horse as integers; a measure crossed
    to vet' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'equine', dst: 'vet', formula,
    value, proof: PROOF, ...extra }, holds, { name: `equine.${name}`, params }) export class EquineFormulas {
    /** SPEED: distance over seconds. value ⌊distance / seconds⌋. -/
theorem fam_equine_speed_1 : (100 / 10) = 10 := by decide

/-- equine: stride(600, 4) = 150 — STRIDE: distance over the strides taken. value ⌊distance / strides⌋. -/
theorem fam_equine_stride_1 : (600 / 4) = 150 := by decide

/-- equine: heartrate(240, 5) = 48 — HEART RATE: beats over minutes. value ⌊beats / minutes⌋. -/
theorem fam_equine_heartrate_1 : (240 / 5) = 48 := by decide

/-- equine: bodycondition(5) = 5 — BODY CONDITION: the score as given. value score. -/
theorem fam_equine_bodycondition_1 : 5 = 5 := by decide

/-- equine: gestation(340) = 340 — GESTATION: days carried. value days. -/
theorem fam_equine_gestation_1 : 340 = 340 := by decide

/-- equine: feedratio(15, 20) = 75 — FEED RATIO: the forage share of the ration. value ⌊forage · 100 / total⌋. -/
theorem fam_equine_feedratio_1 : ((15 * 100) / 20) = 75 := by decide

/-- equine: height(16) = 16 — HEIGHT: the measure in hands. value hands. -/
theorem fam_equine_height_1 : 16 = 16 := by decide

/-- equine: recovery(40, 120) = 80 — RECOVERY: how far an elevated heart rate stands above baseline. value
    max(0, elevated − baseline). -/
theorem fam_equine_recovery_1 : (fmax 0 (120 - 40)) = 80 := by decide

/-- equine: recovery(120, 40) = 0 — RECOVERY: how far an elevated heart rate stands above baseline. value max(0,
    elevated − baseline). -/
theorem fam_equine_recovery_2 : (fmax 0 (40 - 120)) = 0 := by decide

/-- ergometry: power(200, 5) = 1000 -/
theorem fam_ergometry_power_1 : (200 * 5) = 1000 := by decide

/-- ergometry: workdone(500, 60) = 30000 -/
theorem fam_ergometry_workdone_1 : (500 * 60) = 30000 := by decide

/-- ergometry: split(120, 2) = 60 -/
theorem fam_ergometry_split_1 : (120 / 2) = 60 := by decide

/-- ergometry: strokerate(600, 10) = 60 -/
theorem fam_ergometry_strokerate_1 : (600 / 10) = 60 := by decide

/-- ergometry: energyrate(3000, 60) = 50 -/
theorem fam_ergometry_energyrate_1 : (3000 / 60) = 50 := by decide

/-- ergometry: efficiency(250, 1000) = 25 -/
theorem fam_ergometry_efficiency_1 : ((250 * 100) / 1000) = 25 := by decide

/-- ergometry: distance(5, 500) = 2500 -/
theorem fam_ergometry_distance_1 : (5 * 500) = 2500 := by decide

/-- ergometry: caloriesper(3600, 60) = 60 -/
theorem fam_ergometry_caloriesper_1 : (3600 / 60) = 60 := by decide

/-- ergonomics: lift(20, 6) = 120 — ERGONOMICS — THE WORKPLACE ON THE BODY, AS ARITHMETIC (chosen by the
    registry, not by hand). Work put on a person is numbers: the lifting index of a load, how far a reach is of
    its limit, how far a posture is off neutral, repetition per minute, fatigue from work over rest,
    illumination over an area, ambient noise, and strain of force over capacity. Crosses to `med` — ergonomics
    is what medicine measures of the worker. A measure. */ const PROOF = 'ergonomics arithmetic (lift index,
    reach, posture deviation, repetition, fatigue, illumination, noise, strain); a measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'ergonomics', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `ergonomics.${name}`, params }) export class ErgonomicsFormulas { /**
    LIFTING INDEX proxy: a load lifted at a frequency. value weight · frequency. -/
theorem fam_ergonomics_lift_1 : (20 * 6) = 120 := by decide

/-- ergonomics: reach(45, 60) = 75 — REACH as a percentage of its limit. value ⌊distance · 100 / limit⌋. -/
theorem fam_ergonomics_reach_1 : ((45 * 100) / 60) = 75 := by decide

/-- ergonomics: posture(30, 90) = 33 — POSTURE deviation as a percentage of neutral. value ⌊deviation · 100 /
    neutral⌋. -/
theorem fam_ergonomics_posture_1 : ((30 * 100) / 90) = 33 := by decide

/-- ergonomics: repetition(120, 60) = 2 — REPETITION: movements over the minutes worked. value ⌊movements /
    minutes⌋. -/
theorem fam_ergonomics_repetition_1 : (120 / 60) = 2 := by decide

/-- ergonomics: fatigue(480, 60) = 800 — FATIGUE: time worked over time rested, as a percentage. value ⌊worked ·
    100 / rest⌋. -/
theorem fam_ergonomics_fatigue_1 : ((480 * 100) / 60) = 800 := by decide

/-- ergonomics: illumination(10000, 20) = 500 — ILLUMINATION: lumens over the area lit. value ⌊lumens / area⌋. -/
theorem fam_ergonomics_illumination_1 : (10000 / 20) = 500 := by decide

/-- ergonomics: noise(85) = 85 — NOISE: ambient sound level. value decibels (holds nat). -/
theorem fam_ergonomics_noise_1 : 85 = 85 := by decide

/-- ergonomics: strain(60, 100) = 60 — STRAIN: force over capacity, as a percentage. value ⌊force · 100 /
    capacity⌋. -/
theorem fam_ergonomics_strain_1 : ((60 * 100) / 100) = 60 := by decide

/-- eschatology: symbolcount(7, 3) = 21 -/
theorem fam_eschatology_symbolcount_1 : (7 * 3) = 21 := by decide

/-- eschatology: cyclelength(7, 70) = 490 -/
theorem fam_eschatology_cyclelength_1 : (7 * 70) = 490 := by decide

/-- eschatology: outcomechoices(6) = 64 -/
theorem fam_eschatology_outcomechoices_1 : (2 ^ 6) = 64 := by decide

/-- eschatology: intervalspan(1000, 700) = 300 -/
theorem fam_eschatology_intervalspan_1 : (fmax 0 (1000 - 700)) = 300 := by decide

/-- eschatology: tribulationphases(3, 4) = 7 -/
theorem fam_eschatology_tribulationphases_1 : (3 + 4) = 7 := by decide

/-- eschatology: numbersum(6, 6, 6) = 18 -/
theorem fam_eschatology_numbersum_1 : ((6 + 6) + 6) = 18 := by decide

/-- estimating: takeoff(500, 3) = 1500 — ESTIMATING — A CONSTRUCTION ESTIMATE, AS ARITHMETIC (what a cost
    estimator computes before a job is built). Pricing a job is numbers: the quantity taken off the drawings,
    labor at an hourly rate, material at a unit price, overhead as a share of direct cost, the price with
    markup, a contingency reserve, the cost per unit, and the summed bid. Crosses to `construction` — estimating
    is what construction is priced from. A measure. */ const PROOF = 'estimating arithmetic (quantity takeoff,
    labor cost, material cost, overhead, markup, contingency, unit cost, summed bid); a measure crossed to
    construction' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'estimating', dst: 'construction',
    formula, value, proof: PROOF, ...extra }, holds, { name: `estimating.${name}`, params }) export class
    EstimatingFormulas { /** TAKEOFF: the quantity taken off the drawings — count at a measure each. value units
    · perUnit. -/
theorem fam_estimating_takeoff_1 : (500 * 3) = 1500 := by decide

/-- estimating: labor(160, 45) = 7200 — LABOR COST: crew-hours at an hourly rate. value hours · rate. -/
theorem fam_estimating_labor_1 : (160 * 45) = 7200 := by decide

/-- estimating: material(200, 25) = 5000 — MATERIAL COST: quantity at a unit price. value qty · price. -/
theorem fam_estimating_material_1 : (200 * 25) = 5000 := by decide

/-- estimating: overhead(10000, 15) = 1500 — OVERHEAD: a share of direct cost. value ⌊direct · pct / 100⌋. -/
theorem fam_estimating_overhead_1 : ((10000 * 15) / 100) = 1500 := by decide

/-- estimating: markup(8000, 20) = 9600 — MARKUP: the price with markup added. value cost + ⌊cost · pct / 100⌋. -/
theorem fam_estimating_markup_1 : (8000 + ((8000 * 20) / 100)) = 9600 := by decide

/-- estimating: contingency(20000, 10) = 2000 — CONTINGENCY: a reserve as a share of cost. value ⌊cost · pct /
    100⌋. -/
theorem fam_estimating_contingency_1 : ((20000 * 10) / 100) = 2000 := by decide

/-- estimating: unitcost(5000, 200) = 25 — UNIT COST: total cost over the units produced. value ⌊total / units⌋. -/
theorem fam_estimating_unitcost_1 : (5000 / 200) = 25 := by decide

/-- estimating: bid(7200, 5000, 1500) = 13700 — THE BID: labor, material, and overhead summed into the price
    offered. value labor + material + overhead. -/
theorem fam_estimating_bid_1 : ((7200 + 5000) + 1500) = 13700 := by decide

/-- estimation: meansquareerror(1000, 10) = 100 — ESTIMATION — RECOVERING A TRUE VALUE FROM NOISY MEASUREMENTS,
    AS ARITHMETIC. Estimating is numbers: the mean squared error, the bias of an estimator, its variance, a
    confidence level, the residual of a fit, a likelihood, the innovation a new measurement brings, and the gain
    that weights it. Crosses to `cybernetics` — estimation is the feedback a controller runs on. A measure. */
    const PROOF = 'estimation arithmetic (mean squared error, bias, variance, confidence, residual, likelihood,
    innovation, gain); recovering a true value from noisy measurement; a measure crossed to cybernetics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'estimation', dst: 'cybernetics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `estimation.${name}`, params }) export class EstimationFormulas {
    /** MEAN SQUARED ERROR: the summed squared error over the samples. value ⌊sumsq / n⌋. -/
theorem fam_estimation_meansquareerror_1 : (1000 / 10) = 100 := by decide

/-- estimation: bias(50, 42) = 8 — BIAS: how far an estimate sits above the truth. value max(0, estimate −
    truth). -/
theorem fam_estimation_bias_1 : (fmax 0 (50 - 42)) = 8 := by decide

/-- estimation: variance(900, 9) = 100 — VARIANCE: the summed squared deviation over the samples. value
    ⌊sumsqdev / n⌋. -/
theorem fam_estimation_variance_1 : (900 / 9) = 100 := by decide

/-- estimation: confidence(95, 100) = 95 — CONFIDENCE as a percentage. value ⌊level · 100 / total⌋. -/
theorem fam_estimation_confidence_1 : ((95 * 100) / 100) = 95 := by decide

/-- estimation: residual(80, 65) = 15 — RESIDUAL: observed minus the fit's prediction. value max(0, observed −
    predicted). -/
theorem fam_estimation_residual_1 : (fmax 0 (80 - 65)) = 15 := by decide

/-- estimation: likelihood(750, 1000) = 75 — LIKELIHOOD as a percentage of matches over the trials. value
    ⌊matches · 100 / total⌋. -/
theorem fam_estimation_likelihood_1 : ((750 * 100) / 1000) = 75 := by decide

/-- estimation: innovation(120, 100) = 20 — INNOVATION: the surprise a new measurement carries over the
    prediction. value max(0, measured − predicted). -/
theorem fam_estimation_innovation_1 : (fmax 0 (120 - 100)) = 20 := by decide

/-- estimation: estimategain(30, 70) = 30 — ESTIMATE GAIN: how much weight a measurement earns against the
    noise. value ⌊error · 100 / (error + noise)⌋. -/
theorem fam_estimation_estimategain_1 : ((30 * 100) / (30 + 70)) = 30 := by decide

/-- estimation: bias(40, 50) = 0 — BIAS: how far an estimate sits above the truth. value max(0, estimate −
    truth). -/
theorem fam_estimation_bias_2 : (fmax 0 (40 - 50)) = 0 := by decide

/-- etl: throughput(6000, 60) = 100 — ETL — EXTRACT, TRANSFORM, LOAD AS ARITHMETIC (chosen by the data-pipeline
    registry, not by hand). Moving data is numbers: rows per second, the share rejected, the batches a load
    splits into, transform cost, the duplicates a stage removes, stage latency, how full the sink is, and
    partition skew. Crosses to `compression` — what ETL dedupes and packs is what compression shrinks. A
    measure. */ const PROOF = 'etl arithmetic (throughput, reject rate, batch window, transform cost, dedupe,
    latency, load factor, skew); the registry\'s data-pipeline domain; a measure crossed to compression' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'etl', dst: 'compression', formula, value, proof:
    PROOF, ...extra }, holds, { name: `etl.${name}`, params }) export class EtlFormulas { /** THROUGHPUT:
    records over seconds. value ⌊records / seconds⌋. -/
theorem fam_etl_throughput_1 : (6000 / 60) = 100 := by decide

/-- etl: rejectrate(50, 1000) = 5 — REJECT RATE: the percentage of rows dropped. value ⌊bad · 100 / total⌋. -/
theorem fam_etl_rejectrate_1 : ((50 * 100) / 1000) = 5 := by decide

/-- etl: transformcost(1000, 5) = 5000 — TRANSFORM COST: operations per row over the rows. value rows · ops. -/
theorem fam_etl_transformcost_1 : (1000 * 5) = 5000 := by decide

/-- etl: dedupe(1000, 900) = 100 — DEDUPE: the duplicates a stage removes. value max(0, total − unique). -/
theorem fam_etl_dedupe_1 : (fmax 0 (1000 - 900)) = 100 := by decide

/-- etl: latency(5000, 100) = 50 — STAGE LATENCY: total milliseconds over the stages crossed. value ⌊total /
    stages⌋. -/
theorem fam_etl_latency_1 : (5000 / 100) = 50 := by decide

/-- etl: loadfactor(900, 1000) = 90 — LOAD FACTOR: how full the sink is, as a percentage. value ⌊loaded · 100 /
    capacity⌋. -/
theorem fam_etl_loadfactor_1 : ((900 * 100) / 1000) = 90 := by decide

/-- etl: skew(100, 30) = 70 — PARTITION SKEW: how far the heaviest partition runs over the average. value max(0,
    max − avg). -/
theorem fam_etl_skew_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- etl: skew(30, 100) = 0 — PARTITION SKEW: how far the heaviest partition runs over the average. value max(0,
    max − avg). -/
theorem fam_etl_skew_2 : (fmax 0 (30 - 100)) = 0 := by decide

/-- etymology: cognaterate(300, 1000) = 30 — ETYMOLOGY — THE HISTORY OF WORDS, AS ARITHMETIC (chosen by the
    comparative registry, not by hand). The descent of words is numbers: the cognate rate across a pair, the
    borrowed share of a vocabulary, the depth of a reconstructed root, the pace of sound change, the age of the
    earliest attestation, the length of a derivation chain, the loanword ratio, and whether a reconstruction
    clears its confidence target. Crosses to `linguistics` — etymology is linguistics turned back through time.
    A measure. */ const PROOF = 'etymology arithmetic (cognate rate, borrowing share, root depth, sound change,
    attestation age, derivation chain, loan ratio, reconstruction score); the comparative registry\'s uncovered
    domain; a measure crossed to linguistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'etymology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `etymology.${name}`, params }) export class EtymologyFormulas { /** COGNATE RATE: the shared cognates as a
    percentage of the compared words. value ⌊shared · 100 / total⌋. -/
theorem fam_etymology_cognaterate_1 : ((300 * 100) / 1000) = 30 := by decide

/-- etymology: borrowingshare(250, 1000) = 25 — BORROWING SHARE: the borrowed words as a percentage of the
    vocabulary. value ⌊borrowed · 100 / total⌋. -/
theorem fam_etymology_borrowingshare_1 : ((250 * 100) / 1000) = 25 := by decide

/-- etymology: rootdepth(4, 3) = 12 — ROOT DEPTH: the reconstructed forms across the layers of a tree. value
    layers · perLayer. -/
theorem fam_etymology_rootdepth_1 : (4 * 3) = 12 := by decide

/-- etymology: soundchange(1000, 8) = 125 — SOUND CHANGE: the years per attested sound shift. value ⌊years /
    shifts⌋. -/
theorem fam_etymology_soundchange_1 : (1000 / 8) = 125 := by decide

/-- etymology: attestationage(2024, 1500) = 524 — ATTESTATION AGE: the years since the earliest attestation.
    value max(0, now − first). -/
theorem fam_etymology_attestationage_1 : (fmax 0 (2024 - 1500)) = 524 := by decide

/-- etymology: derivationchain(2, 3) = 5 — DERIVATION CHAIN: the length of a derivation, roots plus affixes.
    value roots + affixes. -/
theorem fam_etymology_derivationchain_1 : (2 + 3) = 5 := by decide

/-- etymology: loanratio(5000, 90) = 450 — LOAN RATIO: loanwords at a rate per thousand. value ⌊loans · rate /
    1000⌋. -/
theorem fam_etymology_loanratio_1 : ((5000 * 90) / 1000) = 450 := by decide

/-- evapotranspiration: reference(25, 200) = 50 — EVAPOTRANSPIRATION — THE FIELD'S WATER BUDGET, AS ARITHMETIC.
    The water a crop and its soil return to the air is numbers: reference demand from heat and radiation, the
    crop coefficient, actual crop use, the deficit against supply, the irrigation a deficit needs at an
    efficiency, potential demand, water used over a season, and net irrigation to refill the soil. Crosses to
    `hydrology` — evapotranspiration is a term the water cycle must balance. A measure. */ const PROOF =
    'evapotranspiration arithmetic (reference demand, crop coefficient, actual use, deficit, irrigation need,
    potential, seasonal use, net irrigation); the field\'s water budget; a measure crossed to hydrology' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'evapotranspiration', dst: 'hydrology', formula,
    value, proof: PROOF, ...extra }, holds, { name: `evapotranspiration.${name}`, params }) export class
    EvapotranspirationFormulas { /** REFERENCE ET0: heat and radiation set the baseline demand. value ⌊temp ·
    radiation / 100⌋. -/
theorem fam_evapotranspiration_reference_1 : ((25 * 200) / 100) = 50 := by decide

/-- evapotranspiration: cropcoefficient(80, 100) = 80 — CROP COEFFICIENT Kc: crop use against the reference, as
    a percentage. value ⌊etc · 100 / et0⌋. -/
theorem fam_evapotranspiration_cropcoefficient_1 : ((80 * 100) / 100) = 80 := by decide

/-- evapotranspiration: actual(50, 80) = 40 — ACTUAL ETc: the reference scaled by the crop coefficient
    (percent). value ⌊reference · coefficient / 100⌋. -/
theorem fam_evapotranspiration_actual_1 : ((50 * 80) / 100) = 40 := by decide

/-- evapotranspiration: waterdeficit(40, 25) = 15 — WATER DEFICIT: demand the supply cannot meet — demand
    exceeds the supply. value max(0, demand − supply). -/
theorem fam_evapotranspiration_waterdeficit_1 : (fmax 0 (40 - 25)) = 15 := by decide

/-- evapotranspiration: potential(20, 12) = 240 — POTENTIAL ET: unlimited-water demand from heat over the
    daylight hours. value temp · daylight. -/
theorem fam_evapotranspiration_potential_1 : (20 * 12) = 240 := by decide

/-- evapotranspiration: cropwateruse(40, 30) = 1200 — CROP WATER USE: the actual daily use summed over the days.
    value actual · days. -/
theorem fam_evapotranspiration_cropwateruse_1 : (40 * 30) = 1200 := by decide

/-- evapotranspiration: netirrigation(100, 60) = 40 — NET IRRIGATION: the water to refill the soil from its
    moisture to field capacity. value max(0, fieldcapacity − moisture). -/
theorem fam_evapotranspiration_netirrigation_1 : (fmax 0 (100 - 60)) = 40 := by decide

/-- evapotranspiration: waterdeficit(10, 25) = 0 — WATER DEFICIT: demand the supply cannot meet — demand exceeds
    the supply. value max(0, demand − supply). -/
theorem fam_evapotranspiration_waterdeficit_2 : (fmax 0 (10 - 25)) = 0 := by decide

/-- events: attendance(90, 100) = 90 — EVENTS — RUNNING A GATHERING, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). An event is numbers: who showed against who signed up, the house filled, the gate
    taken, cost per head, interactions per head, who never came, the score per response, and leads turned into
    guests. Crosses to `tourism` — an event is why people travel. A measure. */ const PROOF = 'events arithmetic
    (attendance, capacity, revenue, cost per attendee, engagement, no-show, satisfaction, conversion); a
    registry domain; a measure crossed to tourism' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'events', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, { name: `events.${name}`,
    params }) export class EventsFormulas { /** ATTENDANCE as a percentage of those registered. value ⌊attended
    · 100 / registered⌋. -/
theorem fam_events_attendance_1 : ((90 * 100) / 100) = 90 := by decide

/-- events: capacity(450, 500) = 90 — CAPACITY: the house filled, tickets sold against the venue. value ⌊sold ·
    100 / venue⌋. -/
theorem fam_events_capacity_1 : ((450 * 100) / 500) = 90 := by decide

/-- events: revenue(200, 50) = 10000 — REVENUE: tickets at a price each. value tickets · price. -/
theorem fam_events_revenue_1 : (200 * 50) = 10000 := by decide

/-- events: costperattendee(10000, 200) = 50 — COST PER ATTENDEE: total cost over the heads present. value ⌊cost
    / attendees⌋. -/
theorem fam_events_costperattendee_1 : (10000 / 200) = 50 := by decide

/-- events: engagement(600, 200) = 3 — ENGAGEMENT: interactions per head present. value ⌊interactions /
    attendees⌋. -/
theorem fam_events_engagement_1 : (600 / 200) = 3 := by decide

/-- events: noshow(10, 100) = 10 — NO-SHOW as a percentage of those registered. value ⌊noshows · 100 /
    registered⌋. -/
theorem fam_events_noshow_1 : ((10 * 100) / 100) = 10 := by decide

/-- events: satisfaction(850, 200) = 4 — SATISFACTION: the score averaged over the responses. value ⌊score /
    responses⌋. -/
theorem fam_events_satisfaction_1 : (850 / 200) = 4 := by decide

/-- events: conversion(25, 100) = 25 — CONVERSION: leads turned into guests, as a percentage. value ⌊converted ·
    100 / leads⌋. -/
theorem fam_events_conversion_1 : ((25 * 100) / 100) = 25 := by decide

/-- excavation: volume(10, 5, 2) = 100 — EXCAVATION — EARTHWORK AS ARITHMETIC (chosen by the registry, not by
    hand). Moving ground is numbers: the volume of a pit, the cut above grade and the fill still needed below
    it, how bank soil swells loose and compacts back down, the truckloads to haul it away, the horizontal run of
    a side slope, and the benches a deep face is cut into. Crosses to `civil` — excavation is the earthwork a
    civil design sits on. A measure. */ const PROOF = 'excavation arithmetic (pit volume, cut, fill, swell,
    compaction, haul loads, slope run, benches); earthwork a civil design sits on; a measure crossed to civil'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'excavation', dst: 'civil', formula, value, proof:
    PROOF, ...extra }, holds, { name: `excavation.${name}`, params }) export class ExcavationFormulas { /** PIT
    VOLUME: length by width by depth. value length · width · depth. -/
theorem fam_excavation_volume_1 : ((10 * 5) * 2) = 100 := by decide

/-- excavation: cut(40, 3) = 120 — CUT: the spoil removed above grade, an area at a depth. value area · depth. -/
theorem fam_excavation_cut_1 : (40 * 3) = 120 := by decide

/-- excavation: fill(800, 300) = 500 — FILL: the volume still needed below grade after what is already placed.
    value max(0, required − placed). -/
theorem fam_excavation_fill_1 : (fmax 0 (800 - 300)) = 500 := by decide

/-- excavation: swell(100, 25) = 125 — SWELL: bank soil loosens when dug, growing by a percent. value ⌊bank ·
    (100 + pct) / 100⌋. -/
theorem fam_excavation_swell_1 : ((100 * (100 + 25)) / 100) = 125 := by decide

/-- excavation: compaction(125, 20) = 100 — COMPACTION: loose soil settles back when compacted, shrinking by a
    percent. value ⌊loose · (100 − pct) / 100⌋. -/
theorem fam_excavation_compaction_1 : ((125 * (100 - 20)) / 100) = 100 := by decide

/-- excavation: slope(8, 2) = 16 — SLOPE: the horizontal run of a side slope at a height and an H:V ratio. value
    height · ratio. -/
theorem fam_excavation_slope_1 : (8 * 2) = 16 := by decide

/-- exchangerate: crossrate(15000, 120) = 125 -/
theorem fam_exchangerate_crossrate_1 : (15000 / 120) = 125 := by decide

/-- exchangerate: spread(10850, 10800) = 50 -/
theorem fam_exchangerate_spread_1 : (fmax 0 (10850 - 10800)) = 50 := by decide

/-- exchangerate: pippips(11000, 10900) = 100 -/
theorem fam_exchangerate_pippips_1 : (fmax 0 (11000 - 10900)) = 100 := by decide

/-- exchangerate: forwardpoints(50, 3) = 150 -/
theorem fam_exchangerate_forwardpoints_1 : (50 * 3) = 150 := by decide

/-- exchangerate: volatilitypct(8, 100) = 8 -/
theorem fam_exchangerate_volatilitypct_1 : ((8 * 100) / 100) = 8 := by decide

/-- exchangerate: reservemonths(120, 20) = 6 -/
theorem fam_exchangerate_reservemonths_1 : (120 / 20) = 6 := by decide

/-- exchangerate: peggedmargin(2, 100) = 2 -/
theorem fam_exchangerate_peggedmargin_1 : ((2 * 100) / 100) = 2 := by decide

/-- exegesis: senseoptions(5) = 32 -/
theorem fam_exegesis_senseoptions_1 : (2 ^ 5) = 32 := by decide

/-- exegesis: morphemecount(12, 3) = 36 -/
theorem fam_exegesis_morphemecount_1 : (12 * 3) = 36 := by decide

/-- exegesis: variantreadings(40, 12) = 52 -/
theorem fam_exegesis_variantreadings_1 : (40 + 12) = 52 := by decide

/-- exegesis: rootmatches(300, 15) = 20 -/
theorem fam_exegesis_rootmatches_1 : (300 / 15) = 20 := by decide

/-- exegesis: semanticrange(90, 30) = 60 -/
theorem fam_exegesis_semanticrange_1 : (fmax 0 (90 - 30)) = 60 := by decide

/-- existentialism: freedomchoices(5) = 32 -/
theorem fam_existentialism_freedomchoices_1 : (2 ^ 5) = 32 := by decide

/-- existentialism: authenticitymodes(2, 1) = 3 -/
theorem fam_existentialism_authenticitymodes_1 : (2 + 1) = 3 := by decide

/-- existentialism: anguishindex(60, 100) = 60 -/
theorem fam_existentialism_anguishindex_1 : ((60 * 100) / 100) = 60 := by decide

/-- existentialism: badfaithratio(40, 100) = 40 -/
theorem fam_existentialism_badfaithratio_1 : ((40 * 100) / 100) = 40 := by decide

/-- existentialism: situationsubsets(4) = 16 -/
theorem fam_existentialism_situationsubsets_1 : (2 ^ 4) = 16 := by decide

/-- existentialism: becomingstages(3, 2) = 5 -/
theorem fam_existentialism_becomingstages_1 : (3 + 2) = 5 := by decide

/-- exoplanet: orbitalperiod(36500, 100) = 365 — ORBITAL PERIOD: the year, orbit path over speed. value
    ⌊circumference / speed⌋. -/
theorem fam_exoplanet_orbitalperiod_1 : (36500 / 100) = 365 := by decide

/-- exoplanet: habitablezone(1000, 4) = 250 — HABITABLE ZONE: the distance where flux holds water, luminosity
    over flux. value ⌊luminosity / flux⌋. -/
theorem fam_exoplanet_habitablezone_1 : (1000 / 4) = 250 := by decide

/-- exoplanet: radiusratio(10, 100) = 100 — RADIUS RATIO: the planet against the star, in permille. value
    ⌊planetRadius · 1000 / starRadius⌋. -/
theorem fam_exoplanet_radiusratio_1 : ((10 * 1000) / 100) = 100 := by decide

/-- exoplanet: transitduration(2400, 5) = 12 — TRANSIT DURATION: how long the shadow lasts, the chord fraction
    of the period. value ⌊period · chord / 1000⌋. -/
theorem fam_exoplanet_transitduration_1 : ((2400 * 5) / 1000) = 12 := by decide

/-- exoplanet: equilibriumtemp(5800, 20) = 290 — EQUILIBRIUM TEMP: how hot it bakes, the star's heat diluted by
    distance. value ⌊starTemp / dilution⌋. -/
theorem fam_exoplanet_equilibriumtemp_1 : (5800 / 20) = 290 := by decide

/-- exoplanet: massratio(1, 333000) = 3 — MASS RATIO: the planet against the star, in ppm. value ⌊planetMass ·
    1000000 / starMass⌋. -/
theorem fam_exoplanet_massratio_1 : ((1 * 1000000) / 333000) = 3 := by decide

/-- exoplanet: semiamplitude(5, 2, 2) = 1250 — SEMI-AMPLITUDE: the wobble the planet pulls on the star. value
    ⌊planetMass · 1000 / (period · starMass)⌋. -/
theorem fam_exoplanet_semiamplitude_1 : ((5 * 1000) / (2 * 2)) = 1250 := by decide

/-- exoplanet: habitablezone(1000, 0) = 0 — HABITABLE ZONE: the distance where flux holds water, luminosity over
    flux. value ⌊luminosity / flux⌋. -/
theorem fam_exoplanet_habitablezone_2 : (1000 / 0) = 0 := by decide

/-- exoplanets: period(6283, 10) = 628 — ORBITAL PERIOD: the time to walk the orbit path at the orbital speed.
    value ⌊path / speed⌋. -/
theorem fam_exoplanets_period_1 : (6283 / 10) = 628 := by decide

/-- exoplanets: semimajor(150, 50) = 100 — SEMI-MAJOR AXIS: the mean of aphelion and perihelion. value
    ⌊(aphelion + perihelion) / 2⌋. -/
theorem fam_exoplanets_semimajor_1 : ((150 + 50) / 2) = 100 := by decide

/-- exoplanets: radius(12742) = 6371 — PLANET RADIUS: half the measured diameter. value ⌊diameter / 2⌋. -/
theorem fam_exoplanets_radius_1 : (12742 / 2) = 6371 := by decide

/-- exoplanets: transitduration(365, 100, 50) = 730 — TRANSIT DURATION: how long the crossing lasts, period ·
    rstar / a. value ⌊period · rstar / a⌋. -/
theorem fam_exoplanets_transitduration_1 : ((365 * 100) / 50) = 730 := by decide

/-- exoplanets: radialvelocity(1, 100) = 10 — RADIAL VELOCITY: the stellar wobble semi-amplitude, scaled by the
    mass ratio. value ⌊mplanet · 1000 / mstar⌋. -/
theorem fam_exoplanets_radialvelocity_1 : ((1 * 1000) / 100) = 10 := by decide

/-- exoplanets: density(5000, 1000) = 5 — DENSITY: mass packed into volume. value ⌊mass / volume⌋. -/
theorem fam_exoplanets_density_1 : (5000 / 1000) = 5 := by decide
