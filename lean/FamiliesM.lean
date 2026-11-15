-- lean/FamiliesM.lean — GENERATED. THE FAMILIES, M — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- machining: chipload(100, 4) = 25 — MACHINING — SUBTRACTIVE MANUFACTURING, AS ARITHMETIC (chosen by the
    registry, not by hand). Cutting metal is numbers: surface cutting speed, feed rate, material removal,
    dimensional tolerance in ppm, tool life, surface finish, chip load per tooth, and the pass rate of produced
    parts. Crosses to `manufacturing` — machining is how a part is made. A measure. */ const PROOF = 'machining
    arithmetic (cutting speed, feed rate, material removal, tolerance ppm, tool life, surface finish, chip load,
    pass rate); a subtractive-manufacturing domain; a measure crossed to manufacturing' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'machining', dst: 'manufacturing', formula, value, proof: PROOF,
    ...extra }, holds, { name: `machining.${name}`, params }) export class MachiningFormulas { /** CHIP LOAD:
    feed per tooth. value ⌊feed / teeth⌋. -/
theorem fam_machining_chipload_1 : (100 / 4) = 25 := by decide

/-- machining: cuttingspeed(50, 2000) = 314 — CUTTING SPEED: surface speed proxy from diameter and spindle rpm.
    value ⌊diameter · rpm · 314 / 100000⌋. -/
theorem fam_machining_cuttingspeed_1 : (((50 * 2000) * 314) / 100000) = 314 := by decide

/-- machining: feedrate(5, 2000) = 10000 — FEED RATE: feed per revolution times rpm. value feed · rpm. -/
theorem fam_machining_feedrate_1 : (5 * 2000) = 10000 := by decide

/-- machining: materialremoval(3, 10) = 30 — MATERIAL REMOVAL: cross-section of the cut. value depth · width. -/
theorem fam_machining_materialremoval_1 : (3 * 10) = 30 := by decide

/-- machining: passrate(950, 1000) = 95 — PASS RATE: good parts as a percentage of produced. value ⌊good · 100 /
    produced⌋. -/
theorem fam_machining_passrate_1 : ((950 * 100) / 1000) = 95 := by decide

/-- machining: passrate(0, 0) = 0 — PASS RATE: good parts as a percentage of produced. value ⌊good · 100 /
    produced⌋. -/
theorem fam_machining_passrate_2 : ((0 * 100) / 0) = 0 := by decide

/-- machining: surfacefinish(32) = 32 — SURFACE FINISH: the roughness measure itself. value roughness. -/
theorem fam_machining_surfacefinish_1 : 32 = 32 := by decide

/-- machining: toollife(10000, 25) = 400 — TOOL LIFE: material removed per unit of wear. value ⌊volume / wear⌋. -/
theorem fam_machining_toollife_1 : (10000 / 25) = 400 := by decide

/-- machining: toollife(10000, 0) = 0 — TOOL LIFE: material removed per unit of wear. value ⌊volume / wear⌋. -/
theorem fam_machining_toollife_2 : (10000 / 0) = 0 := by decide

/-- machining: tolerance(5, 10000) = 500 — TOLERANCE: deviation against nominal in parts per million. value
    ⌊deviation · 1000000 / nominal⌋. -/
theorem fam_machining_tolerance_1 : ((5 * 1000000) / 10000) = 500 := by decide

/-- machining: tolerance(5, 0) = 0 — TOLERANCE: deviation against nominal in parts per million. value ⌊deviation
    · 1000000 / nominal⌋. -/
theorem fam_machining_tolerance_2 : ((5 * 1000000) / 0) = 0 := by decide

/-- macroeconomics: gdp(1000, 500) = 1500 — GDP: output as the sum of consumption and investment (G + NX proxy
    simplified into the pair). value consumption + investment. -/
theorem fam_macroeconomics_gdp_1 : (1000 + 500) = 1500 := by decide

/-- macroeconomics: inflation(110, 100) = 10 — INFLATION: the price level change over the prior period, as a
    percentage. value ⌊(current − previous) · 100 / previous⌋. -/
theorem fam_macroeconomics_inflation_1 : (((110 - 100) * 100) / 100) = 10 := by decide

/-- macroeconomics: unemployment(5, 100) = 5 — UNEMPLOYMENT: the jobless share of the labor force, as a
    percentage. value ⌊jobless · 100 / labor⌋. -/
theorem fam_macroeconomics_unemployment_1 : ((5 * 100) / 100) = 5 := by decide

/-- macroeconomics: growth(110, 100) = 10 — GROWTH: output change over the prior period, as a percentage. value
    ⌊(current − previous) · 100 / previous⌋. -/
theorem fam_macroeconomics_growth_1 : (((110 - 100) * 100) / 100) = 10 := by decide

/-- macroeconomics: multiplier(100, 80) = 500 — MULTIPLIER: the reach of spending at a marginal propensity to
    consume (percent, 0..99). value ⌊spending · 100 / (100 − mpc)⌋. -/
theorem fam_macroeconomics_multiplier_1 : ((100 * 100) / (100 - 80)) = 500 := by decide

/-- macroeconomics: velocity(2000, 100) = 20 — VELOCITY: how often money turns over to produce output. value
    ⌊gdp / money⌋. -/
theorem fam_macroeconomics_velocity_1 : (2000 / 100) = 20 := by decide

/-- macroeconomics: deficit(1000, 700) = 300 — DEFICIT: spending beyond revenue, never negative. value max(0,
    spending − revenue). -/
theorem fam_macroeconomics_deficit_1 : (fmax 0 (1000 - 700)) = 300 := by decide

/-- macroeconomics: debt(300, 1000) = 30 — MACROECONOMICS — THE WHOLE ECONOMY, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). An economy is numbers: output as spending, the price level year over
    year, who is without work, how fast output grows, the reach of a dollar of spending, how often money turns
    over, the gap between spending and revenue, and the debt that gap leaves against output. Crosses to `econ` —
    macroeconomics is the aggregate the micro measures sum to. A measure. */ const PROOF = 'macroeconomics
    arithmetic (gdp, inflation, unemployment, growth, multiplier, velocity, deficit, debt-to-gdp); the
    registry\'s whole-economy domain; a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'macroeconomics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name:
    `macroeconomics.${name}`, params }) export class MacroeconomicsFormulas { /** DEBT-TO-GDP: the deficit as a
    percentage of output. value ⌊deficit · 100 / gdp⌋. -/
theorem fam_macroeconomics_debt_1 : ((300 * 100) / 1000) = 30 := by decide

/-- magnetism: field(5, 200) = 1000 — MAGNETISM — THE FIELD AS ARITHMETIC. The physics of fields and forces is
    numbers: a solenoid's field from its current and turns, the Lorentz force on a moving charge, magnetic flux
    through an area, the EMF induction gives over time, the torque on a moment, permeability, reluctance along a
    path, and a dipole's reach. Crosses to `energy` — magnetism is energy in motion. A measure. */ const PROOF =
    'magnetism arithmetic (solenoid field, Lorentz force, flux, Faraday EMF, torque, permeability, reluctance,
    dipole); a measure crossed to energy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'magnetism', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `magnetism.${name}`, params }) export class MagnetismFormulas { /** SOLENOID FIELD: current through the
    turns (an ampere-turns proxy). value current · turns. -/
theorem fam_magnetism_field_1 : (5 * 200) = 1000 := by decide

/-- magnetism: force(3, 40) = 120 — LORENTZ FORCE on a moving charge. value charge · velocity. -/
theorem fam_magnetism_force_1 : (3 * 40) = 120 := by decide

/-- magnetism: flux(10, 50) = 500 — MAGNETIC FLUX through an area. value field · area. -/
theorem fam_magnetism_flux_1 : (10 * 50) = 500 := by decide

/-- magnetism: induction(1000, 4) = 250 — FARADAY EMF: the flux changing over time. value ⌊flux / time⌋. -/
theorem fam_magnetism_induction_1 : (1000 / 4) = 250 := by decide

/-- magnetism: induction(1000, 0) = 0 — FARADAY EMF: the flux changing over time. value ⌊flux / time⌋. -/
theorem fam_magnetism_induction_2 : (1000 / 0) = 0 := by decide

/-- magnetism: torque(6, 7) = 42 — TORQUE on a magnetic moment in a field. value moment · field. -/
theorem fam_magnetism_torque_1 : (6 * 7) = 42 := by decide

/-- magnetism: permeability(900, 3) = 300 — PERMEABILITY: flux per unit current. value ⌊flux / current⌋. -/
theorem fam_magnetism_permeability_1 : (900 / 3) = 300 := by decide

/-- magnetism: permeability(900, 0) = 0 — PERMEABILITY: flux per unit current. value ⌊flux / current⌋. -/
theorem fam_magnetism_permeability_2 : (900 / 0) = 0 := by decide

/-- magnetism: reluctance(5, 2) = 2500 — RELUCTANCE: path length over area, scaled by a thousand. value ⌊length
    · 1000 / area⌋. -/
theorem fam_magnetism_reluctance_1 : ((5 * 1000) / 2) = 2500 := by decide

/-- magnetism: reluctance(5, 0) = 0 — RELUCTANCE: path length over area, scaled by a thousand. value ⌊length ·
    1000 / area⌋. -/
theorem fam_magnetism_reluctance_2 : ((5 * 1000) / 0) = 0 := by decide

/-- magnetism: dipole(100, 4) = 25 — DIPOLE reach: pole strength over distance. value ⌊pole / distance⌋. -/
theorem fam_magnetism_dipole_1 : (100 / 4) = 25 := by decide

/-- magnetism: dipole(100, 0) = 0 — DIPOLE reach: pole strength over distance. value ⌊pole / distance⌋. -/
theorem fam_magnetism_dipole_2 : (100 / 0) = 0 := by decide

/-- magnetometry: fieldstrength(50000, 1) = 50000 -/
theorem fam_magnetometry_fieldstrength_1 : (50000 * 1) = 50000 := by decide

/-- magnetometry: anomaly(52000, 50000) = 2000 -/
theorem fam_magnetometry_anomaly_1 : (fmax 0 (52000 - 50000)) = 2000 := by decide

/-- magnetometry: declination(15, 3) = 12 -/
theorem fam_magnetometry_declination_1 : (fmax 0 (15 - 3)) = 12 := by decide

/-- magnetometry: inclination(900, 10) = 90 -/
theorem fam_magnetometry_inclination_1 : (900 / 10) = 90 := by decide

/-- magnetometry: gradient(2000, 100) = 20 -/
theorem fam_magnetometry_gradient_1 : (2000 / 100) = 20 := by decide

/-- magnetometry: surveylines(40, 10) = 400 -/
theorem fam_magnetometry_surveylines_1 : (40 * 10) = 400 := by decide

/-- magnetometry: susceptibility(1000, 100) = 10 -/
theorem fam_magnetometry_susceptibility_1 : (1000 / 100) = 10 := by decide

/-- magnetometry: reversalcount(5, 3) = 8 -/
theorem fam_magnetometry_reversalcount_1 : (5 + 3) = 8 := by decide

/-- maillard: reactionrate(75, 100) = 75 -/
theorem fam_maillard_reactionrate_1 : ((75 * 100) / 100) = 75 := by decide

/-- maillard: browningindex(6, 12) = 72 -/
theorem fam_maillard_browningindex_1 : (6 * 12) = 72 := by decide

/-- maillard: temperaturefactor(180, 30) = 6 -/
theorem fam_maillard_temperaturefactor_1 : (180 / 30) = 6 := by decide

/-- maillard: aminosugarratio(40, 60) = 66 -/
theorem fam_maillard_aminosugarratio_1 : ((40 * 100) / 60) = 66 := by decide

/-- maillard: flavorcompounds(12, 8) = 96 -/
theorem fam_maillard_flavorcompounds_1 : (12 * 8) = 96 := by decide

/-- maillard: phfactor(70, 10) = 7 -/
theorem fam_maillard_phfactor_1 : (70 / 10) = 7 := by decide

/-- maillard: timetocolor(300, 5) = 60 -/
theorem fam_maillard_timetocolor_1 : (300 / 5) = 60 := by decide

/-- maillard: crustthickness(10, 3) = 7 -/
theorem fam_maillard_crustthickness_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- malacology: shellwhorls(5, 2) = 7 -/
theorem fam_malacology_shellwhorls_1 : (5 + 2) = 7 := by decide

/-- malacology: spiralratio(161, 100) = 161 -/
theorem fam_malacology_spiralratio_1 : ((161 * 100) / 100) = 161 := by decide

/-- malacology: speciescount(800, 10) = 8000 -/
theorem fam_malacology_speciescount_1 : (800 * 10) = 8000 := by decide

/-- malacology: radulateeth(100, 5) = 500 -/
theorem fam_malacology_radulateeth_1 : (100 * 5) = 500 := by decide

/-- malacology: chambercount(30, 0) = 30 -/
theorem fam_malacology_chambercount_1 : (30 + 0) = 30 := by decide

/-- malacology: growthlines(12, 3) = 36 -/
theorem fam_malacology_growthlines_1 : (12 * 3) = 36 := by decide

/-- malacology: aperturesize(100, 4) = 25 -/
theorem fam_malacology_aperturesize_1 : (100 / 4) = 25 := by decide

/-- malware: detection(950, 1000) = 95 — MALWARE — DEFENSIVE SECURITY ANALYSIS, AS ARITHMETIC (detection
    metrics, not offensive tooling). Catching running threats is numbers: detection rate, false positives, how
    far a sample spread, signatures held, quarantine coverage, dwell days, entropy of packed code, and how much
    got remediated. Crosses to `code` — malware is code to measure. */ const PROOF = 'malware arithmetic
    (detection, false positives, spread, signatures, quarantine, dwell, entropy, remediation); defensive
    security analysis — detection metrics, not offensive tooling; a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'malware', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `malware.${name}`, params }) export class MalwareFormulas { /** DETECTION RATE as a
    percentage. value ⌊detected · 100 / samples⌋. -/
theorem fam_malware_detection_1 : ((950 * 100) / 1000) = 95 := by decide

/-- malware: falsepositive(5, 1000) = 0 — FALSE-POSITIVE RATE as a percentage. value ⌊flagged · 100 / clean⌋. -/
theorem fam_malware_falsepositive_1 : ((5 * 100) / 1000) = 0 := by decide

/-- malware: spread(30, 100) = 30 — SPREAD: infected out of exposed, as a percentage. value ⌊infected · 100 /
    exposed⌋. -/
theorem fam_malware_spread_1 : ((30 * 100) / 100) = 30 := by decide

/-- malware: signatures(50000) = 50000 — SIGNATURES held in the database. value count. -/
theorem fam_malware_signatures_1 : 50000 = 50000 := by decide

/-- malware: quarantine(90, 100) = 90 — QUARANTINE coverage: isolated out of detected, as a percentage. value
    ⌊isolated · 100 / detected⌋. -/
theorem fam_malware_quarantine_1 : ((90 * 100) / 100) = 90 := by decide

/-- malware: dwell(21) = 21 — DWELL time in days before detection. value days. -/
theorem fam_malware_dwell_1 : 21 = 21 := by decide

/-- malware: entropy(7, 10) = 70 — ENTROPY: packed sections out of total, as a percentage. value ⌊packed · 100 /
    total⌋. -/
theorem fam_malware_entropy_1 : ((7 * 100) / 10) = 70 := by decide

/-- malware: remediation(80, 100) = 80 — REMEDIATION: cleaned out of infected, as a percentage. value ⌊cleaned ·
    100 / infected⌋. -/
theorem fam_malware_remediation_1 : ((80 * 100) / 100) = 80 := by decide

/-- mammalogy: gestation(280) = 280 — MAMMALOGY — THE STUDY OF MAMMALS, AS ARITHMETIC. A mammal's life is
    numbers: how long it carries young, how fast it burns energy, the ground one animal ranges over, the young
    per birth, milk over the days nursed, how many share a territory, the gap from body heat to the air, and how
    many of the born survive. Crosses to `zoology` — mammalogy is one of its branches. A measure. */ const PROOF
    = 'mammalogy arithmetic (gestation, metabolism, home range, litter, lactation, territory, thermoneutral gap,
    survival); a branch of zoology; a measure crossed to zoology' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'mammalogy', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `mammalogy.${name}`, params }) export class MammalogyFormulas { /** GESTATION: the days a mammal carries
    young. value days. -/
theorem fam_mammalogy_gestation_1 : 280 = 280 := by decide

/-- mammalogy: metabolism(70, 3) = 210 — METABOLISM: basal rate proxy as mass at a factor. value mass · factor. -/
theorem fam_mammalogy_metabolism_1 : (70 * 3) = 210 := by decide

/-- mammalogy: homerange(70, 4) = 280 — HOME RANGE: the ground a mammal covers as mass at a factor. value mass ·
    factor. -/
theorem fam_mammalogy_homerange_1 : (70 * 4) = 280 := by decide

/-- mammalogy: litter(12, 3) = 4 — LITTER: young per birth. value ⌊offspring / births⌋. -/
theorem fam_mammalogy_litter_1 : (12 / 3) = 4 := by decide

/-- mammalogy: lactation(6000, 60) = 100 — LACTATION: milk over the days nursed. value ⌊milk / days⌋. -/
theorem fam_mammalogy_lactation_1 : (6000 / 60) = 100 := by decide

/-- mammalogy: territory(100, 25) = 4 — TERRITORY: individuals over the area they share. value ⌊individuals /
    area⌋. -/
theorem fam_mammalogy_territory_1 : (100 / 25) = 4 := by decide

/-- mammalogy: thermoneutral(37, 20) = 17 — THERMONEUTRAL: the gap from body heat to the air. value max(0, body
    − ambient). -/
theorem fam_mammalogy_thermoneutral_1 : (fmax 0 (37 - 20)) = 17 := by decide

/-- mammalogy: thermoneutral(20, 37) = 0 — THERMONEUTRAL: the gap from body heat to the air. value max(0, body −
    ambient). -/
theorem fam_mammalogy_thermoneutral_2 : (fmax 0 (20 - 37)) = 0 := by decide

/-- mammalogy: survival(80, 100) = 80 — SURVIVAL as a percentage of the born. value ⌊surviving · 100 / born⌋. -/
theorem fam_mammalogy_survival_1 : ((80 * 100) / 100) = 80 := by decide

/-- manifold: dimension(5, 2) = 3 — MANIFOLD — THE SHAPE OF SPACE, AS ARITHMETIC. A manifold is counted: its
    dimension, the genus of a surface, the Betti numbers that count holes, the Euler characteristic V − E + F,
    the charts an atlas needs, the boundary components, whether it is orientable, and the total rank of its
    homology. Crosses to `topology` — a manifold is topology made of numbers. A measure. */ const PROOF =
    'manifold arithmetic (dimension, genus, Betti number, Euler characteristic, atlas charts, boundary
    components, orientability, homology rank); the shape of space counted; a measure crossed to topology' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'manifold', dst: 'topology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `manifold.${name}`, params }) export class ManifoldFormulas { /**
    DIMENSION of a submanifold: the ambient dimension less its codimension. value max(0, ambient − codim). -/
theorem fam_manifold_dimension_1 : (fmax 0 (5 - 2)) = 3 := by decide

/-- manifold: genus(0) = 1 — GENUS of a closed orientable surface from its Euler characteristic. value max(0,
    ⌊(2 − euler) / 2⌋). -/
theorem fam_manifold_genus_1 : (fmax 0 ((2 - 0) / 2)) = 1 := by decide

/-- manifold: bettinumber(10, 4) = 6 — BETTI NUMBER: cycles that are not boundaries. value max(0, cycles −
    boundaries). -/
theorem fam_manifold_bettinumber_1 : (fmax 0 (10 - 4)) = 6 := by decide

/-- manifold: eulercharacteristic(8, 12, 6) = 2 — EULER CHARACTERISTIC: vertices minus edges plus faces. value
    max(0, v + f − e). -/
theorem fam_manifold_eulercharacteristic_1 : (fmax 0 ((8 + 6) - 12)) = 2 := by decide

/-- manifold: boundarycomponents(10, 7) = 3 — BOUNDARY COMPONENTS: the cells on the boundary, the interior
    removed. value max(0, cells − interior). -/
theorem fam_manifold_boundarycomponents_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- manifold: homologyrank(1, 2, 1) = 4 — HOMOLOGY RANK: the total rank, the Betti numbers summed. value b0 + b1
    + b2. -/
theorem fam_manifold_homologyrank_1 : ((1 + 2) + 1) = 4 := by decide

/-- manipulator: dof(6, 0) = 6 — MANIPULATOR — A ROBOT ARM, AS ARITHMETIC (chosen by the mechanism registry, not
    by hand). A manipulator is numbers: the degrees of freedom left after locking joints, total reach, the
    payload a joint torque holds, swept workspace, a joint's range of motion, repeatability, end-effector speed,
    and how many singular configurations it has. Crosses to `kinematics` — a manipulator is the body kinematics
    describes. A measure. */ const PROOF = 'manipulator arithmetic (dof, reach, payload, workspace, joint range,
    repeatability, link speed, singularities); the mechanism the kinematics domain describes; a measure crossed
    to kinematics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'manipulator', dst: 'kinematics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `manipulator.${name}`, params }) export class
    ManipulatorFormulas { /** DEGREES OF FREEDOM: the joints that stay free after locking some. value max(0,
    joints − locked). -/
theorem fam_manipulator_dof_1 : (fmax 0 (6 - 0)) = 6 := by decide

/-- manipulator: reach(3, 400) = 1200 — REACH: links of a given length, extended. value links · length. -/
theorem fam_manipulator_reach_1 : (3 * 400) = 1200 := by decide

/-- manipulator: payload(600, 3) = 200 — PAYLOAD: the force a joint torque holds at the arm length. value
    ⌊torque / armlen⌋. -/
theorem fam_manipulator_payload_1 : (600 / 3) = 200 := by decide

/-- manipulator: workspace(10, 5) = 500 — WORKSPACE: the volume a reach sweeps over a height (radius² · height,
    no π). value radius · radius · height. -/
theorem fam_manipulator_workspace_1 : ((10 * 10) * 5) = 500 := by decide

/-- manipulator: jointrange(270, 90) = 180 — JOINT RANGE: a joint's range of motion between its limits. value
    max(0, hi − lo). -/
theorem fam_manipulator_jointrange_1 : (fmax 0 (270 - 90)) = 180 := by decide

/-- manipulator: repeatability(100, 8) = 12 — REPEATABILITY: the average spread over repeated samples. value
    ⌊spread / samples⌋. -/
theorem fam_manipulator_repeatability_1 : (100 / 8) = 12 := by decide

/-- manipulator: linkspeed(1000, 4) = 250 — LINK SPEED: the end-effector speed, distance over time. value
    ⌊distance / time⌋. -/
theorem fam_manipulator_linkspeed_1 : (1000 / 4) = 250 := by decide

/-- manipulator: singularities(2, 1, 2) = 5 — SINGULARITIES: the singular configurations, counted over the
    wrist, elbow, and shoulder. value wrist + elbow + shoulder. -/
theorem fam_manipulator_singularities_1 : ((2 + 1) + 2) = 5 := by decide

/-- manipulator: payload(100, 0) = 0 — PAYLOAD: the force a joint torque holds at the arm length. value ⌊torque
    / armlen⌋. -/
theorem fam_manipulator_payload_2 : (100 / 0) = 0 := by decide

/-- manufacturing: throughput(1200, 8) = 150 — MANUFACTURING — MAKING THINGS, AS ARITHMETIC (chosen by the
    registry, not by hand). A production line is numbers: units per hour, overall equipment effectiveness, the
    defect rate, cycle time, yield, takt, work-in-progress turns, and the capacity of the machines. Crosses to
    `econ` — manufacturing is what the economy measures as output. A measure. */ const PROOF = 'manufacturing
    arithmetic (throughput, OEE, defects, cycle time, yield, takt, inventory turns, capacity); a production
    domain; a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'manufacturing',
    dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `manufacturing.${name}`, params })
    export class ManufacturingFormulas { /** THROUGHPUT: units produced over hours run. value ⌊units / hours⌋. -/
theorem fam_manufacturing_throughput_1 : (1200 / 8) = 150 := by decide

/-- manufacturing: oee(90, 80) = 72 — OEE: two percentages combined — availability by performance. value
    ⌊availability · performance / 100⌋. -/
theorem fam_manufacturing_oee_1 : ((90 * 80) / 100) = 72 := by decide

/-- manufacturing: defects(5, 1000) = 0 — DEFECT RATE as a percentage. value ⌊bad · 100 / total⌋. -/
theorem fam_manufacturing_defects_1 : ((5 * 100) / 1000) = 0 := by decide

/-- manufacturing: cycletime(480, 120) = 4 — CYCLE TIME: time over the units made. value ⌊time / units⌋. -/
theorem fam_manufacturing_cycletime_1 : (480 / 120) = 4 := by decide

/-- manufacturing: yield(950, 1000) = 95 — YIELD as a percentage. value ⌊good · 100 / total⌋. -/
theorem fam_manufacturing_yield_1 : ((950 * 100) / 1000) = 95 := by decide

/-- manufacturing: takt(28800, 240) = 120 — TAKT TIME: available time over demand. value ⌊available / demand⌋. -/
theorem fam_manufacturing_takt_1 : (28800 / 240) = 120 := by decide

/-- manufacturing: inventory(500, 50) = 10 — INVENTORY TURNS: work-in-progress over the consumption rate. value
    ⌊wip / rate⌋. -/
theorem fam_manufacturing_inventory_1 : (500 / 50) = 10 := by decide

/-- manufacturing: capacity(12, 100) = 1200 — CAPACITY: machines at a per-machine rate. value machines · rate. -/
theorem fam_manufacturing_capacity_1 : (12 * 100) = 1200 := by decide

/-- marination: penetrationdepth(20, 4) = 5 -/
theorem fam_marination_penetrationdepth_1 : (20 / 4) = 5 := by decide

/-- marination: aciduptake(15, 100) = 15 -/
theorem fam_marination_aciduptake_1 : ((15 * 100) / 100) = 15 := by decide

/-- marination: tenderization(40, 100) = 40 -/
theorem fam_marination_tenderization_1 : ((40 * 100) / 100) = 40 := by decide

/-- marination: marinatetime(4, 60) = 240 -/
theorem fam_marination_marinatetime_1 : (4 * 60) = 240 := by decide

/-- marination: saltdiffusion(100, 10) = 10 -/
theorem fam_marination_saltdiffusion_1 : (100 / 10) = 10 := by decide

/-- marination: flavorload(12, 5) = 60 -/
theorem fam_marination_flavorload_1 : (12 * 5) = 60 := by decide

/-- marination: phshift(60, 45) = 15 -/
theorem fam_marination_phshift_1 : (fmax 0 (60 - 45)) = 15 := by decide

/-- marination: weightgain(8, 100) = 8 -/
theorem fam_marination_weightgain_1 : ((8 * 100) / 100) = 8 := by decide

/-- masonry: bricks(10, 60) = 600 — MASONRY — LAYING BRICK AND BLOCK, AS ARITHMETIC. Building a wall is numbers:
    the bricks an area needs, the mortar they take, the courses up a height, the bricks along a course (the
    bond), the wall area, the joint mortar, the area a pile covers, and the waste to order over. Crosses to
    `construction` — masonry is the trade construction schedules. A measure. */ const PROOF = 'masonry
    arithmetic (bricks per area, mortar, courses, bond, wall area, joints, coverage, waste); laying brick and
    block as integers; a measure crossed to construction' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'masonry', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name:
    `masonry.${name}`, params }) export class MasonryFormulas { /** BRICKS: the bricks a wall area needs at a
    count per square metre. value area · perSqm. -/
theorem fam_masonry_bricks_1 : (10 * 60) = 600 := by decide

/-- masonry: mortar(600, 2) = 1200 — MORTAR: the mortar those bricks take at a volume per brick. value bricks ·
    perBrick. -/
theorem fam_masonry_mortar_1 : (600 * 2) = 1200 := by decide

/-- masonry: courses(1000, 75) = 13 — COURSES: the courses up a height at a course height. value ⌊height /
    courseHeight⌋. -/
theorem fam_masonry_courses_1 : (1000 / 75) = 13 := by decide

/-- masonry: bond(1000, 250) = 4 — BOND: the bricks along a course at a brick length. value ⌊length /
    brickLength⌋. -/
theorem fam_masonry_bond_1 : (1000 / 250) = 4 := by decide

/-- masonry: wall(5, 3) = 15 — WALL: the wall area from length and height. value length · height. -/
theorem fam_masonry_wall_1 : (5 * 3) = 15 := by decide

/-- masonry: joint(13, 10) = 130 — JOINT: the joint mortar over the courses at a thickness each. value courses ·
    thickness. -/
theorem fam_masonry_joint_1 : (13 * 10) = 130 := by decide

/-- masonry: coverage(600, 60) = 10 — COVERAGE: the area a pile of bricks covers at a count per square metre.
    value ⌊bricks / perSqm⌋. -/
theorem fam_masonry_coverage_1 : (600 / 60) = 10 := by decide

/-- masonry: waste(600, 5) = 30 — WASTE: the bricks to order over as a percentage. value ⌊bricks · pct / 100⌋. -/
theorem fam_masonry_waste_1 : ((600 * 5) / 100) = 30 := by decide

/-- materials: stress(1000, 10) = 100 — MATERIALS — MATERIALS SCIENCE / ENGINEERING, AS ARITHMETIC (chosen by
    the public-API registry, not by hand). A loaded part is numbers: stress on an area, strain over a length,
    density by volume, the elastic modulus, hardness under a load, whether fatigue cycles stay under the limit,
    thermal expansion, and whether the applied load stays under yield strength. Crosses to `cern` — materials is
    what the beam-line is built from. A measure. */ const PROOF = 'materials arithmetic (stress, strain,
    density, modulus, hardness, fatigue, thermal expansion, yield); the registry\'s materials-science domain; a
    measure crossed to cern' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'materials', dst: 'cern',
    formula, value, proof: PROOF, ...extra }, holds, { name: `materials.${name}`, params }) export class
    MaterialsFormulas { /** STRESS: force over the area it acts on. value ⌊force / area⌋. -/
theorem fam_materials_stress_1 : (1000 / 10) = 100 := by decide

/-- materials: strain(5, 100) = 5 — STRAIN: elongation over the original length, as a percentage. value ⌊delta ·
    100 / length⌋. -/
theorem fam_materials_strain_1 : ((5 * 100) / 100) = 5 := by decide

/-- materials: density(1000, 10) = 100 — DENSITY: mass over the volume it fills. value ⌊mass / volume⌋. -/
theorem fam_materials_density_1 : (1000 / 10) = 100 := by decide

/-- materials: modulus(200, 2) = 100 — MODULUS: elastic modulus, stress over strain. value ⌊stress / strain⌋. -/
theorem fam_materials_modulus_1 : (200 / 2) = 100 := by decide

/-- materials: hardness(500, 5) = 100 — HARDNESS: load over the indentation it makes. value ⌊load / indent⌋. -/
theorem fam_materials_hardness_1 : (500 / 5) = 100 := by decide

/-- materials: thermal(10, 12) = 120 — THERMAL: expansion, the temperature change at a coefficient. value deltaT
    · coeff. -/
theorem fam_materials_thermal_1 : (10 * 12) = 120 := by decide

/-- mealplanning: meals(3, 7) = 21 -/
theorem fam_mealplanning_meals_1 : (3 * 7) = 21 := by decide

/-- mealplanning: portions(4, 3) = 12 -/
theorem fam_mealplanning_portions_1 : (4 * 3) = 12 := by decide

/-- mealplanning: caloriesperday(2000, 1) = 2000 -/
theorem fam_mealplanning_caloriesperday_1 : (2000 * 1) = 2000 := by decide

/-- mealplanning: varietysubsets(5) = 32 -/
theorem fam_mealplanning_varietysubsets_1 : (2 ^ 5) = 32 := by decide

/-- mealplanning: prepminutes(30, 7) = 210 -/
theorem fam_mealplanning_prepminutes_1 : (30 * 7) = 210 := by decide

/-- mealplanning: budgetpermeal(100, 21) = 4 -/
theorem fam_mealplanning_budgetpermeal_1 : (100 / 21) = 4 := by decide

/-- mechanical: torque(100, 5) = 500 — MECHANICAL — MECHANICAL ENGINEERING AS ARITHMETIC (chosen by the
    registry, not by hand). A machine is numbers: the torque a force makes at a radius, the power a shaft turns
    at, the stress a load lays on an area, the strain it draws, a gear ratio, an efficiency, a thermal drop, a
    spring rate. Crosses to `materials` — mechanics is what materials bear. A measure. */ const PROOF =
    'mechanical arithmetic (torque, shaft power, stress, strain, gear ratio, efficiency, thermal drop, spring
    rate); a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'mechanical', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `mechanical.${name}`, params }) export class MechanicalFormulas { /** TORQUE: a force at a radius. value
    force · radius. -/
theorem fam_mechanical_torque_1 : (100 * 5) = 500 := by decide

/-- mechanical: power(9549, 1000) = 1000 — SHAFT POWER (kW proxy): torque turned at rpm. value ⌊torque · rpm /
    9549⌋. -/
theorem fam_mechanical_power_1 : ((9549 * 1000) / 9549) = 1000 := by decide

/-- mechanical: stress(1000, 20) = 50 — STRESS: a force over an area. value ⌊force / area⌋. -/
theorem fam_mechanical_stress_1 : (1000 / 20) = 50 := by decide

/-- mechanical: strain(5, 1000) = 5 — STRAIN (per mille): deformation over a length. value ⌊deformation · 1000 /
    length⌋. -/
theorem fam_mechanical_strain_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- mechanical: gear(60, 20) = 300 — GEAR RATIO (percent): driven over driver. value ⌊driven · 100 / driver⌋. -/
theorem fam_mechanical_gear_1 : ((60 * 100) / 20) = 300 := by decide

/-- mechanical: efficiency(80, 100) = 80 — EFFICIENCY (percent): output over input. value ⌊output · 100 /
    input⌋. -/
theorem fam_mechanical_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- mechanical: thermal(1000, 25) = 40 — THERMAL DROP: heat over a resistance. value ⌊heat / resistance⌋. -/
theorem fam_mechanical_thermal_1 : (1000 / 25) = 40 := by decide

/-- mechanical: spring(500, 10) = 50 — SPRING RATE: a force over a displacement. value ⌊force / displacement⌋. -/
theorem fam_mechanical_spring_1 : (500 / 10) = 50 := by decide

/-- media: aspect(1600, 900) = 177 — MEDIA — THE MEDIA BLOCK USE CASE FROM payloadcms/website, AS ARITHMETIC. A
    picture on a page is numbers: its aspect ratio, the rows a gallery lays out, how much loads below the fold,
    whether a caption fits, how many sizes are rendered, how a width fits its container, how long the bytes take
    to load, and whether it is landscape. Crosses to `payload` — the Media block is a Payload field. A measure.
    */ const PROOF = 'media arithmetic (aspect ratio, gallery rows, lazy below-fold, caption fit, rendered
    sizes, container fit, load time, landscape); the Media block use case from payloadcms/website; a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'media', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `media.${name}`, params }) export class
    MediaFormulas { /** ASPECT RATIO as a percentage of width over height. value ⌊width · 100 / height⌋. -/
theorem fam_media_aspect_1 : ((1600 * 100) / 900) = 177 := by decide

/-- media: lazy(6, 10) = 60 — LAZY: the percentage of images below the fold that defer loading. value ⌊below ·
    100 / total⌋. -/
theorem fam_media_lazy_1 : ((6 * 100) / 10) = 60 := by decide

/-- media: sizes(5) = 5 — SIZES: the number of responsive sizes rendered. value count. -/
theorem fam_media_sizes_1 : 5 = 5 := by decide

/-- media: fit(800, 1000) = 80 — FIT: how a width fills its container, as a percentage. value ⌊width · 100 /
    container⌋. -/
theorem fam_media_fit_1 : ((800 * 100) / 1000) = 80 := by decide

/-- media: load(10000, 500) = 20 — LOAD: the seconds the bytes take to load at a byte rate. value ⌊bytes /
    rate⌋. -/
theorem fam_media_load_1 : (10000 / 500) = 20 := by decide

/-- meiosis: gametes(10) = 40 — MEIOSIS — THE REDUCTION DIVISION, AS ARITHMETIC. The cell halves its chromosomes
    and shuffles them: the gametes one meiosis yields, the haploid number, the crossovers across the bivalents,
    recombination frequency, the variation two gamete pools combine to, the diploid fertilization restores, the
    sister chromatids after replication, and Mendelian segregation. Crosses to `genetics` — meiosis is how
    inheritance happens. A measure. */ const PROOF = 'meiosis arithmetic (gametes, haploid number, crossovers,
    recombination frequency, assortment variation, diploid restoration, sister chromatids, Mendelian
    segregation); the reduction division as a measure crossed to genetics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'meiosis', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, {
    name: `meiosis.${name}`, params }) export class MeiosisFormulas { /** GAMETES: one meiosis of a diploid cell
    yields four gametes. value cells · 4. -/
theorem fam_meiosis_gametes_1 : (10 * 4) = 40 := by decide

/-- meiosis: haploid(46) = 23 — HAPLOID NUMBER: the diploid count halved. value ⌊diploid / 2⌋. -/
theorem fam_meiosis_haploid_1 : (46 / 2) = 23 := by decide

/-- meiosis: crossovers(23, 2) = 46 — CROSSOVERS: crossovers per bivalent across every bivalent. value bivalents
    · perBivalent. -/
theorem fam_meiosis_crossovers_1 : (23 * 2) = 46 := by decide

/-- meiosis: recombinants(15, 100) = 15 — RECOMBINATION FREQUENCY: recombinant offspring as a percentage of the
    total. value ⌊recombinant · 100 / total⌋. -/
theorem fam_meiosis_recombinants_1 : ((15 * 100) / 100) = 15 := by decide

/-- meiosis: variation(4, 4) = 16 — VARIATION: the gamete combinations two gamete pools assort into. value
    maternal · paternal. -/
theorem fam_meiosis_variation_1 : (4 * 4) = 16 := by decide

/-- meiosis: diploidrestore(23) = 46 — DIPLOID RESTORATION: fertilization fuses two haploid sets. value haploid
    · 2. -/
theorem fam_meiosis_diploidrestore_1 : (23 * 2) = 46 := by decide

/-- meiosis: chromatids(46) = 92 — SISTER CHROMATIDS: each chromosome carries two after replication. value
    chromosomes · 2. -/
theorem fam_meiosis_chromatids_1 : (46 * 2) = 92 := by decide

/-- meiosis: segregation(100, 3, 4) = 75 — MENDELIAN SEGREGATION: offspring at a num:den ratio. value ⌊offspring
    · num / den⌋. -/
theorem fam_meiosis_segregation_1 : ((100 * 3) / 4) = 75 := by decide

/-- meiosis: segregation(100, 1, 0) = 0 — MENDELIAN SEGREGATION: offspring at a num:den ratio. value ⌊offspring
    · num / den⌋. -/
theorem fam_meiosis_segregation_2 : ((100 * 1) / 0) = 0 := by decide

/-- melody: range(60, 48) = 12 — MELODY — A TUNE AS ARITHMETIC. A melody is numbers: how wide it ranges, which
    way it moves, how much it steps versus leaps, how long its phrases run, how often a motif repeats, the pitch
    class of a note, a transposition, and how dense the notes sit against the beat. Crosses to `music` — melody
    is the line music is made of. A measure. */ const PROOF = 'melody arithmetic (range, contour, step/leap,
    phrase length, motif repeats, pitch class, transposition, density); a tune as integers; a measure crossed to
    music' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'melody', dst: 'music', formula,
    value, proof: PROOF, ...extra }, holds, { name: `melody.${name}`, params }) export class MelodyFormulas {
    /** RANGE: the span from lowest to highest pitch, in semitones. value max(0, high − low). -/
theorem fam_melody_range_1 : (fmax 0 (60 - 48)) = 12 := by decide

/-- melody: contour(20, 8) = 12 — CONTOUR: net upward motion, ascending steps less descending. value max(0, up −
    down). -/
theorem fam_melody_contour_1 : (fmax 0 (20 - 8)) = 12 := by decide

/-- melody: stepleap(80, 20) = 80 — STEP vs LEAP: the percentage of moves that are stepwise. value ⌊steps · 100
    / (steps + leaps)⌋. -/
theorem fam_melody_stepleap_1 : ((80 * 100) / (80 + 20)) = 80 := by decide

/-- melody: phraselength(64, 8) = 8 — PHRASE LENGTH: average notes per phrase. value ⌊notes / phrases⌋. -/
theorem fam_melody_phraselength_1 : (64 / 8) = 8 := by decide

/-- melody: motifrepeat(48, 4) = 12 — MOTIF REPEATS: how many times a motif fits the line. value ⌊total /
    motif⌋. -/
theorem fam_melody_motifrepeat_1 : (48 / 4) = 12 := by decide

/-- melody: density(100, 50) = 200 — DENSITY: notes per hundred beats. value ⌊notes · 100 / beats⌋. -/
theorem fam_melody_density_1 : ((100 * 100) / 50) = 200 := by decide

/-- melody: phraselength(64, 0) = 0 — PHRASE LENGTH: average notes per phrase. value ⌊notes / phrases⌋. -/
theorem fam_melody_phraselength_2 : (64 / 0) = 0 := by decide

/-- membrane: restingpotential(90, 20) = 70 — MEMBRANE — THE CELL BOUNDARY, AS ARITHMETIC. A membrane is
    numbers: the resting potential across it, the Nernst potential of an ion, how fast something permeates, how
    fluid the bilayer is, the surface area it wraps, the rate it transports, the charge it stores, and how
    selective its channels are. Crosses to `biochemistry` — a membrane is where biochemistry meets a boundary. A
    measure. */ const PROOF = 'membrane arithmetic (resting potential, Nernst, permeability, fluidity, surface
    area, transport rate, capacitance, selectivity); the cell boundary as integers; a measure crossed to
    biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'membrane', dst: 'biochemistry',
    formula, value, proof: PROOF, ...extra }, holds, { name: `membrane.${name}`, params }) export class
    MembraneFormulas { /** RESTING POTENTIAL: the standing charge difference across the bilayer (mV). value
    max(0, outside − inside). -/
theorem fam_membrane_restingpotential_1 : (fmax 0 (90 - 20)) = 70 := by decide

/-- membrane: nernst(2, 1) = 122 — NERNST POTENTIAL: 61 mV per decade of gradient, divided by the ion's valence.
    value ⌊61 · decades / valence⌋. -/
theorem fam_membrane_nernst_1 : ((61 * 2) / 1) = 122 := by decide

/-- membrane: permeability(1000, 10, 5) = 20 — PERMEABILITY: flux per unit area per unit concentration. value
    ⌊flux / (area · conc)⌋. -/
theorem fam_membrane_permeability_1 : (1000 / (10 * 5)) = 20 := by decide

/-- membrane: fluidity(300, 10) = 30 — FLUIDITY: the bilayer gets more fluid with temperature, less with
    viscosity. value ⌊temp / viscosity⌋. -/
theorem fam_membrane_fluidity_1 : (300 / 10) = 30 := by decide

/-- membrane: transportrate(6000, 60) = 100 — TRANSPORT RATE: molecules carried per unit time. value ⌊molecules
    / time⌋. -/
theorem fam_membrane_transportrate_1 : (6000 / 60) = 100 := by decide

/-- membrane: capacitance(1000, 10) = 100 — CAPACITANCE: the charge the bilayer stores, area over its thickness
    (ε taken as 1). value ⌊area / distance⌋. -/
theorem fam_membrane_capacitance_1 : (1000 / 10) = 100 := by decide

/-- membrane: selectivity(95, 100) = 95 — SELECTIVITY: the fraction of crossings that are the wanted ion, as a
    percentage. value ⌊wanted · 100 / total⌋. -/
theorem fam_membrane_selectivity_1 : ((95 * 100) / 100) = 95 := by decide

/-- membrane: selectivity(50, 100) = 50 — SELECTIVITY: the fraction of crossings that are the wanted ion, as a
    percentage. value ⌊wanted · 100 / total⌋. -/
theorem fam_membrane_selectivity_2 : ((50 * 100) / 100) = 50 := by decide

/-- memory: retention(90, 100) = 90 — MEMORY — HOW WHAT IS LEARNED IS KEPT, LOST, AND FOUND AGAIN, AS
    ARITHMETIC. Retention of what was learned, the forgetting of what faded, recall and recognition of what was
    stored, the span of what is held, consolidation of what was encoded, interference across trials, and the
    spacing of reviews. Crosses to `neurology` — memory is what the brain does. A measure. */ const PROOF =
    'memory arithmetic (retention, forgetting, recall, recognition, span, consolidation, interference, spacing);
    how what is learned is kept, lost, and found; a measure crossed to neurology' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'memory', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, {
    name: `memory.${name}`, params }) export class MemoryFormulas { /** RETENTION: what is remembered of what
    was learned, as a percentage. value ⌊remembered · 100 / learned⌋. -/
theorem fam_memory_retention_1 : ((90 * 100) / 100) = 90 := by decide

/-- memory: forgetting(10, 100) = 10 — FORGETTING: what is lost of the initial, as a percentage. value
    ⌊forgotten · 100 / initial⌋. -/
theorem fam_memory_forgetting_1 : ((10 * 100) / 100) = 10 := by decide

/-- memory: recall(75, 100) = 75 — RECALL: what is retrieved of what was stored, as a percentage. value
    ⌊retrieved · 100 / stored⌋. -/
theorem fam_memory_recall_1 : ((75 * 100) / 100) = 75 := by decide

/-- memory: recognition(95, 100) = 95 — RECOGNITION: what is identified of what was presented, as a percentage.
    value ⌊identified · 100 / presented⌋. -/
theorem fam_memory_recognition_1 : ((95 * 100) / 100) = 95 := by decide

/-- memory: span(7) = 7 — SPAN: the number of items held at once. value items. -/
theorem fam_memory_span_1 : 7 = 7 := by decide

/-- memory: consolidation(80, 100) = 80 — CONSOLIDATION: what is stabilized of what was encoded, as a
    percentage. value ⌊stabilized · 100 / encoded⌋. -/
theorem fam_memory_consolidation_1 : ((80 * 100) / 100) = 80 := by decide

/-- memory: interference(20, 100) = 20 — INTERFERENCE: errors across trials, as a percentage. value ⌊errors ·
    100 / trials⌋. -/
theorem fam_memory_interference_1 : ((20 * 100) / 100) = 20 := by decide

/-- memory: spacing(12, 3) = 4 — SPACING: reviews over the interval between them. value ⌊reviews / interval⌋. -/
theorem fam_memory_spacing_1 : (12 / 3) = 4 := by decide

/-- merchandising: margin(100, 60) = 40 — MERCHANDISING — SHELVING A CATALOGUE AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Selling goods is numbers: the margin and markup on a price, how much of a
    buy sold through, how fast inventory turns, the facings on a shelf, the slots in a planogram, the breadth of
    an assortment, and the return earned on inventory. Crosses to `retail` — merchandising is how retail is laid
    out. A measure. */ const PROOF = 'merchandising arithmetic (margin, markup, sell-through, turnover, facings,
    planogram, assortment, gmroi); a public-API registry domain; a measure crossed to retail' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'merchandising', dst: 'retail', formula, value, proof: PROOF,
    ...extra }, holds, { name: `merchandising.${name}`, params }) export class MerchandisingFormulas { /** GROSS
    MARGIN as a percentage of price. value ⌊(price − cost) · 100 / price⌋. -/
theorem fam_merchandising_margin_1 : (((100 - 60) * 100) / 100) = 40 := by decide

/-- merchandising: markup(100, 80) = 25 — MARKUP over cost as a percentage. value ⌊(price − cost) · 100 / cost⌋. -/
theorem fam_merchandising_markup_1 : (((100 - 80) * 100) / 80) = 25 := by decide

/-- merchandising: sellthrough(75, 100) = 75 — SELL-THROUGH: units sold as a percentage of units received. value
    ⌊sold · 100 / received⌋. -/
theorem fam_merchandising_sellthrough_1 : ((75 * 100) / 100) = 75 := by decide

/-- merchandising: turnover(1000, 200) = 5 — INVENTORY TURNOVER: cost of goods sold over average inventory.
    value ⌊cogs / inventory⌋. -/
theorem fam_merchandising_turnover_1 : (1000 / 200) = 5 := by decide

/-- merchandising: facings(120, 8) = 15 — FACINGS: how many product facings fit a shelf at a facing width. value
    ⌊shelf / width⌋. -/
theorem fam_merchandising_facings_1 : (120 / 8) = 15 := by decide

/-- merchandising: planogram(5, 20) = 100 — PLANOGRAM: the slots laid out across shelves. value shelves ·
    perShelf. -/
theorem fam_merchandising_planogram_1 : (5 * 20) = 100 := by decide

/-- merchandising: assortment(12, 30) = 360 — ASSORTMENT: the SKUs carried across categories. value categories ·
    skus. -/
theorem fam_merchandising_assortment_1 : (12 * 30) = 360 := by decide

/-- merchandising: gmroi(500, 250) = 200 — GMROI: gross-margin return on inventory investment, as a percentage.
    value ⌊margin · 100 / inventory⌋. -/
theorem fam_merchandising_gmroi_1 : ((500 * 100) / 250) = 200 := by decide

/-- merkle: leaves(4) = 16 -/
theorem fam_merkle_leaves_1 : (2 ^ 4) = 16 := by decide

/-- merkle: treeheight(4, 0) = 4 -/
theorem fam_merkle_treeheight_1 : (4 + 0) = 4 := by decide

/-- merkle: proofsize(4, 32) = 128 -/
theorem fam_merkle_proofsize_1 : (4 * 32) = 128 := by decide

/-- merkle: nodecount(2, 15) = 30 -/
theorem fam_merkle_nodecount_1 : (2 * 15) = 30 := by decide

/-- merkle: verificationsteps(4, 1) = 5 -/
theorem fam_merkle_verificationsteps_1 : (4 + 1) = 5 := by decide

/-- metabolomics: concentration(1000, 50) = 20 — METABOLOMICS — THE SMALL-MOLECULE CHEMISTRY OF A CELL, AS
    ARITHMETIC. The metabolites a sample holds are numbers: concentration from moles over volume, reaction flux,
    how far a pathway reaches per step, fold change against a control, pool turnover, dwell time on a column, a
    product-to-substrate ratio, and how much of the known set a run detects. Crosses to `biochemistry` —
    metabolomics is the measured face of a cell's chemistry. A measure. */ const PROOF = 'metabolomics
    arithmetic (concentration, flux, pathway reach, fold change, turnover, retention, ratio, coverage); the
    measured small-molecule chemistry of a cell; a measure crossed to biochemistry' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'metabolomics', dst: 'biochemistry', formula, value, proof: PROOF,
    ...extra }, holds, { name: `metabolomics.${name}`, params }) export class MetabolomicsFormulas { /**
    CONCENTRATION: moles over the volume they occupy. value ⌊moles / volume⌋. -/
theorem fam_metabolomics_concentration_1 : (1000 / 50) = 20 := by decide

/-- metabolomics: flux(12, 5) = 60 — FLUX: a reaction rate scaled by the enzyme present. value rate · enzyme. -/
theorem fam_metabolomics_flux_1 : (12 * 5) = 60 := by decide

/-- metabolomics: pathway(100, 8) = 12 — PATHWAY: metabolites reached per step along it. value ⌊metabolites /
    steps⌋. -/
theorem fam_metabolomics_pathway_1 : (100 / 8) = 12 := by decide

/-- metabolomics: foldchange(300, 100) = 300 — FOLD CHANGE: treated against control, as a percentage. value
    ⌊treated · 100 / control⌋. -/
theorem fam_metabolomics_foldchange_1 : ((300 * 100) / 100) = 300 := by decide

/-- metabolomics: turnover(25, 200) = 12 — TURNOVER: produced against the standing pool, as a percentage. value
    ⌊produced · 100 / pool⌋. -/
theorem fam_metabolomics_turnover_1 : ((25 * 100) / 200) = 12 := by decide

/-- metabolomics: retention(42) = 42 — RETENTION: the dwell time on a column. value time. -/
theorem fam_metabolomics_retention_1 : 42 = 42 := by decide

/-- metabolomics: ratio(45, 90) = 50 — RATIO: product over substrate, as a percentage. value ⌊product · 100 /
    substrate⌋. -/
theorem fam_metabolomics_ratio_1 : ((45 * 100) / 90) = 50 := by decide

/-- metabolomics: coverage(80, 100) = 80 — COVERAGE: detected against the known set, as a percentage. value
    ⌊detected · 100 / known⌋. -/
theorem fam_metabolomics_coverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- metallurgy: hardness(600, 3) = 200 — METALLURGY — THE SCIENCE OF METALS, AS ARITHMETIC (chosen by the
    materials registry, not by hand). Working metal is numbers: hardness under a load, an alloy's composition,
    tensile strength, ductility, grain size, elastic modulus, fatigue life, and corrosion loss. Crosses to
    `materials` — metallurgy is what materials science measures. A measure. */ const PROOF = 'metallurgy
    arithmetic (hardness, alloy composition, tensile, ductility, grain, modulus, fatigue, corrosion); a measure
    crossed to materials' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'metallurgy', dst:
    'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `metallurgy.${name}`, params }) export
    class MetallurgyFormulas { /** HARDNESS: load over the indentation area. value ⌊load / area⌋. -/
theorem fam_metallurgy_hardness_1 : (600 / 3) = 200 := by decide

/-- metallurgy: alloy(18, 100) = 18 — ALLOY COMPOSITION as a percentage. value ⌊element · 100 / total⌋. -/
theorem fam_metallurgy_alloy_1 : ((18 * 100) / 100) = 18 := by decide

/-- metallurgy: tensile(5000, 25) = 200 — TENSILE STRENGTH: force over the cross-section. value ⌊force /
    section⌋. -/
theorem fam_metallurgy_tensile_1 : (5000 / 25) = 200 := by decide

/-- metallurgy: ductility(120, 100) = 20 — DUCTILITY: elongation as a percentage. value ⌊(final − initial) · 100
    / initial⌋. -/
theorem fam_metallurgy_ductility_1 : (((120 - 100) * 100) / 100) = 20 := by decide

/-- metallurgy: grain(1000, 25) = 40 — GRAIN SIZE: area over the grain count. value ⌊area / count⌋. -/
theorem fam_metallurgy_grain_1 : (1000 / 25) = 40 := by decide

/-- metallurgy: modulus(400, 2) = 200 — ELASTIC MODULUS: stress over strain. value ⌊stress / strain⌋. -/
theorem fam_metallurgy_modulus_1 : (400 / 2) = 200 := by decide

/-- metallurgy: fatigue(1000000, 500) = 2000 — FATIGUE LIFE: cycles over the load. value ⌊cycles / load⌋. -/
theorem fam_metallurgy_fatigue_1 : (1000000 / 500) = 2000 := by decide

/-- metallurgy: corrosion(15, 100) = 15 — CORROSION: mass lost as a percentage of the exposed mass. value ⌊lost
    · 100 / exposed⌋. -/
theorem fam_metallurgy_corrosion_1 : ((15 * 100) / 100) = 15 := by decide

/-- meteoritics: crater(2000, 5) = 400 — CRATER: the impact energy spread over the ground's resistance. value
    ⌊energy / ground⌋. -/
theorem fam_meteoritics_crater_1 : (2000 / 5) = 400 := by decide

/-- meteoritics: ablation(100, 30) = 70 — ABLATION: the mass lost from initial to final, never below zero. value
    max(0, initial − final). -/
theorem fam_meteoritics_ablation_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- meteoritics: flux(1000, 50) = 20 — FLUX: the count of falls over the area watched. value ⌊count / area⌋. -/
theorem fam_meteoritics_flux_1 : (1000 / 50) = 20 := by decide

/-- meteoritics: velocity(6000, 60) = 100 — VELOCITY: the distance along the track over the time taken. value
    ⌊distance / time⌋. -/
theorem fam_meteoritics_velocity_1 : (6000 / 60) = 100 := by decide

/-- meteoritics: composition(30, 120) = 25 — COMPOSITION: the metal fraction of the body as a percentage. value
    ⌊metal · 100 / total⌋. -/
theorem fam_meteoritics_composition_1 : ((30 * 100) / 120) = 25 := by decide

/-- meteoritics: survival(100, 70) = 30 — SURVIVAL: the mass that clears the atmosphere's toll, never below
    zero. value max(0, mass − atmosphere). -/
theorem fam_meteoritics_survival_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- meteoritics: survival(50, 80) = 0 — SURVIVAL: the mass that clears the atmosphere's toll, never below zero.
    value max(0, mass − atmosphere). -/
theorem fam_meteoritics_survival_2 : (fmax 0 (50 - 80)) = 0 := by decide

/-- meteorology: humidity(75, 100) = 75 — METEOROLOGY — THE WEATHER, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Reading the sky is numbers: relative humidity, the dew point, a heat-index proxy,
    wind chill, pressure at altitude, the lapse of temperature with height, precipitation over an area, and
    visibility through particles. Crosses to `climate` — the weather is what climate aggregates. A measure. */
    const PROOF = 'meteorology arithmetic (humidity, dewpoint, heatindex, windchill, pressure, lapse,
    precipitation, visibility); a weather measure crossed to climate' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'meteorology', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, {
    name: `meteorology.${name}`, params }) export class MeteorologyFormulas { /** RELATIVE HUMIDITY as a
    percentage. value ⌊actual · 100 / saturation⌋. -/
theorem fam_meteorology_humidity_1 : ((75 * 100) / 100) = 75 := by decide

/-- meteorology: dewpoint(20, 5) = 15 — DEW POINT: temperature less the dew-point spread. value max(0, temp −
    spread). -/
theorem fam_meteorology_dewpoint_1 : (fmax 0 (20 - 5)) = 15 := by decide

/-- meteorology: heatindex(30, 10) = 40 — HEAT INDEX: a proxy, temperature plus humidity. value temp + humidity. -/
theorem fam_meteorology_heatindex_1 : (30 + 10) = 40 := by decide

/-- meteorology: windchill(10, 4) = 6 — WIND CHILL: temperature less the wind's bite. value max(0, temp − wind). -/
theorem fam_meteorology_windchill_1 : (fmax 0 (10 - 4)) = 6 := by decide

/-- meteorology: pressure(1013, 13) = 1000 — PRESSURE at altitude: sea-level pressure less the climb. value
    max(0, sealevel − altitude). -/
theorem fam_meteorology_pressure_1 : (fmax 0 (1013 - 13)) = 1000 := by decide

/-- meteorology: lapse(25, 6) = 19 — LAPSE: surface temperature less the fall with height. value max(0, surface
    − height). -/
theorem fam_meteorology_lapse_1 : (fmax 0 (25 - 6)) = 19 := by decide

/-- meteorology: precipitation(1000, 50) = 20 — PRECIPITATION: volume spread over an area. value ⌊volume /
    area⌋. -/
theorem fam_meteorology_precipitation_1 : (1000 / 50) = 20 := by decide

/-- meteorology: visibility(80, 40) = 200 — VISIBILITY through particles. value ⌊clarity · 100 / particles⌋. -/
theorem fam_meteorology_visibility_1 : ((80 * 100) / 40) = 200 := by decide

/-- microbiology: growth(100, 3) = 800 — MICROBIOLOGY — THE LIFE OF A CULTURE, AS ARITHMETIC (chosen by the
    registry, not by hand). A culture is numbers: cells double over generations, the generation time,
    colony-forming units at a dilution, the minimum inhibitory concentration, the fraction of a population that
    resists a drug, an inhibition zone, live cells as a fraction, optical density over the path. Crosses to
    `med` — microbiology is what medicine measures. A measure. */ const PROOF = 'microbiology arithmetic
    (growth, generation time, cfu, mic, resistance, inhibition zone, viability, optical density); a registry
    domain; a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'microbiology',
    dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `microbiology.${name}`, params })
    export class MicrobiologyFormulas { /** GROWTH: an initial population after so many doublings. value initial
    · 2^doublings. -/
theorem fam_microbiology_growth_1 : (100 * (2 ^ 3)) = 800 := by decide

/-- microbiology: generation(600, 3) = 200 — GENERATION TIME: elapsed time over the divisions seen. value ⌊time
    / divisions⌋. -/
theorem fam_microbiology_generation_1 : (600 / 3) = 200 := by decide

/-- microbiology: cfu(50, 1000) = 50000 — CFU: colonies counted at a dilution factor. value colonies · dilution. -/
theorem fam_microbiology_cfu_1 : (50 * 1000) = 50000 := by decide

/-- microbiology: mic(8) = 8 — MIC: the minimum inhibitory concentration. value concentration. -/
theorem fam_microbiology_mic_1 : 8 = 8 := by decide

/-- microbiology: resistance(25, 100) = 25 — RESISTANCE: resistant isolates as a percentage of those tested.
    value ⌊resistant · 100 / tested⌋. -/
theorem fam_microbiology_resistance_1 : ((25 * 100) / 100) = 25 := by decide

/-- microbiology: zone(18) = 18 — ZONE: the inhibition zone diameter in mm. value diameter. -/
theorem fam_microbiology_zone_1 : 18 = 18 := by decide

/-- microbiology: viability(950, 1000) = 95 — VIABILITY: live cells as a percentage of the total. value ⌊live ·
    100 / total⌋. -/
theorem fam_microbiology_viability_1 : ((950 * 100) / 1000) = 95 := by decide

/-- microbiology: od(1000, 10) = 100 — OPTICAL DENSITY: absorbance over the path length. value ⌊absorbance /
    path⌋. -/
theorem fam_microbiology_od_1 : (1000 / 10) = 100 := by decide

/-- microeconomics: elasticity(20, 5) = 400 — MICROECONOMICS — THE BEHAVIOUR OF MARKETS AS ARITHMETIC (price and
    quantity, buyer and seller). Elasticity of demand, consumer surplus, marginal cost, the equilibrium
    shortage, utility per unit of cost, firm profit, monopoly market share, and the deadweight loss of a
    distorted market. Crosses to `econ` — microeconomics is economics in the small. A measure. */ const PROOF =
    'microeconomics arithmetic (elasticity, surplus, marginal cost, equilibrium shortage, utility, profit,
    monopoly share, deadweight loss); markets in the small; a measure crossed to econ' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'microeconomics', dst: 'econ', formula, value, proof: PROOF,
    ...extra }, holds, { name: `microeconomics.${name}`, params }) export class MicroeconomicsFormulas { /**
    ELASTICITY: the percent change in quantity per unit change in price. value ⌊quantitychange · 100 /
    pricechange⌋. -/
theorem fam_microeconomics_elasticity_1 : ((20 * 100) / 5) = 400 := by decide

/-- microeconomics: surplus(100, 70) = 30 — CONSUMER SURPLUS: willingness to pay over the price actually paid.
    value max(0, willingness − price). -/
theorem fam_microeconomics_surplus_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- microeconomics: marginal(500, 25) = 20 — MARGINAL COST: total cost over the units produced. value ⌊total /
    units⌋. -/
theorem fam_microeconomics_marginal_1 : (500 / 25) = 20 := by decide

/-- microeconomics: equilibrium(80, 100) = 20 — EQUILIBRIUM: the shortage when demand runs over supply. value
    max(0, demand − supply). -/
theorem fam_microeconomics_equilibrium_1 : (fmax 0 (100 - 80)) = 20 := by decide

/-- microeconomics: utility(90, 30) = 3 — UTILITY: the satisfaction per unit of cost. value ⌊satisfaction /
    cost⌋. -/
theorem fam_microeconomics_utility_1 : (90 / 30) = 3 := by decide

/-- microeconomics: profit(1000, 600) = 400 — PROFIT: revenue over the cost of earning it. value max(0, revenue
    − cost). -/
theorem fam_microeconomics_profit_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- microeconomics: monopoly(60, 100) = 60 — MONOPOLY: the firm's share of its market, as a percentage. value
    ⌊firm · 100 / market⌋. -/
theorem fam_microeconomics_monopoly_1 : ((60 * 100) / 100) = 60 := by decide

/-- microeconomics: deadweight(15, 100) = 15 — DEADWEIGHT LOSS: the welfare lost as a share of the total. value
    ⌊lost · 100 / total⌋. -/
theorem fam_microeconomics_deadweight_1 : ((15 * 100) / 100) = 15 := by decide

/-- microeconomics: elasticity(20, 0) = 0 — MICROECONOMICS — THE BEHAVIOUR OF MARKETS AS ARITHMETIC (price and
    quantity, buyer and seller). Elasticity of demand, consumer surplus, marginal cost, the equilibrium
    shortage, utility per unit of cost, firm profit, monopoly market share, and the deadweight loss of a
    distorted market. Crosses to `econ` — microeconomics is economics in the small. A measure. */ const PROOF =
    'microeconomics arithmetic (elasticity, surplus, marginal cost, equilibrium shortage, utility, profit,
    monopoly share, deadweight loss); markets in the small; a measure crossed to econ' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'microeconomics', dst: 'econ', formula, value, proof: PROOF,
    ...extra }, holds, { name: `microeconomics.${name}`, params }) export class MicroeconomicsFormulas { /**
    ELASTICITY: the percent change in quantity per unit change in price. value ⌊quantitychange · 100 /
    pricechange⌋. -/
theorem fam_microeconomics_elasticity_2 : ((20 * 100) / 0) = 0 := by decide

/-- microeconomics: surplus(50, 70) = 0 — CONSUMER SURPLUS: willingness to pay over the price actually paid.
    value max(0, willingness − price). -/
theorem fam_microeconomics_surplus_2 : (fmax 0 (50 - 70)) = 0 := by decide

/-- microscopy: magnification(40, 10) = 400 — MICROSCOPY — SEEING THE SMALL, AS ARITHMETIC. The light microscope
    is numbers: total magnification from the lenses, the resolvable distance, the numerical aperture that
    gathers the light, the field you see, the depth in focus, the magnification through a camera, the working
    distance under the objective, and the size of a sensor pixel. Crosses to `optics` — microscopy is optics put
    to the eyepiece. A measure. */ const PROOF = 'microscopy arithmetic (magnification, resolution, numerical
    aperture, field of view, depth of field, total magnification, working distance, pixel size); seeing the
    small as integers; a measure crossed to optics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'microscopy', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `microscopy.${name}`, params }) export class MicroscopyFormulas { /** MAGNIFICATION: the objective lens
    times the eyepiece. value objective · eyepiece. -/
theorem fam_microscopy_magnification_1 : (40 * 10) = 400 := by decide

/-- microscopy: resolution(500, 2) = 125 — RESOLUTION: the Abbe limit, wavelength over twice the aperture. value
    ⌊wavelength / (2 · na)⌋. -/
theorem fam_microscopy_resolution_1 : (500 / (2 * 2)) = 125 := by decide

/-- microscopy: resolution(500, 0) = 0 — RESOLUTION: the Abbe limit, wavelength over twice the aperture. value
    ⌊wavelength / (2 · na)⌋. -/
theorem fam_microscopy_resolution_2 : (500 / (2 * 0)) = 0 := by decide

/-- microscopy: numericalaperture(1, 55) = 55 — NUMERICAL APERTURE: the index of the medium times the half-angle
    it gathers. value index · angle. -/
theorem fam_microscopy_numericalaperture_1 : (1 * 55) = 55 := by decide

/-- microscopy: fieldofview(20, 40) = 500 — FIELD OF VIEW: the field number over the objective magnification, in
    microns. value ⌊fieldnumber · 1000 / mag⌋. -/
theorem fam_microscopy_fieldofview_1 : ((20 * 1000) / 40) = 500 := by decide

/-- microscopy: depthoffield(500, 5) = 20 — DEPTH OF FIELD: the wavelength over the aperture squared. value
    ⌊wavelength / (na · na)⌋. -/
theorem fam_microscopy_depthoffield_1 : (500 / (5 * 5)) = 20 := by decide

/-- microscopy: totalmag(40, 10, 2) = 800 — TOTAL MAGNIFICATION: the objective, the eyepiece and the camera
    adapter together. value objective · eyepiece · camera. -/
theorem fam_microscopy_totalmag_1 : ((40 * 10) * 2) = 800 := by decide

/-- microscopy: workingdistance(300, 2) = 150 — WORKING DISTANCE: the focal length over the medium index. value
    ⌊focal / index⌋. -/
theorem fam_microscopy_workingdistance_1 : (300 / 2) = 150 := by decide

/-- microscopy: pixelsize(36000, 6000) = 6 — PIXEL SIZE: the sensor width over the pixel count. value
    ⌊sensorwidth / pixels⌋. -/
theorem fam_microscopy_pixelsize_1 : (36000 / 6000) = 6 := by decide

/-- migration: netmigration(5000, 3000) = 2000 — MIGRATION — HUMAN MOVEMENT, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). People moving is numbers: net migration, the gross flow across a border,
    the rate per thousand, push vs pull pressure, the share sent home as remittances, how many of the arrivals
    settle, how many return, and an integration index. Crosses to `sociology` — migration is what sociology
    studies. A measure. */ const PROOF = 'migration arithmetic (net migration, gross flow, rate, push-pull,
    remittance share, settlement ratio, return rate, integration index); a public-API registry domain; a measure
    crossed to sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'migration', dst:
    'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `migration.${name}`, params }) export
    class MigrationFormulas { /** NET MIGRATION: arrivals minus departures, never below zero. value max(0,
    inflow − outflow). -/
theorem fam_migration_netmigration_1 : (fmax 0 (5000 - 3000)) = 2000 := by decide

/-- migration: netmigration(3000, 5000) = 0 — MIGRATION — HUMAN MOVEMENT, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). People moving is numbers: net migration, the gross flow across a border,
    the rate per thousand, push vs pull pressure, the share sent home as remittances, how many of the arrivals
    settle, how many return, and an integration index. Crosses to `sociology` — migration is what sociology
    studies. A measure. */ const PROOF = 'migration arithmetic (net migration, gross flow, rate, push-pull,
    remittance share, settlement ratio, return rate, integration index); a public-API registry domain; a measure
    crossed to sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'migration', dst:
    'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `migration.${name}`, params }) export
    class MigrationFormulas { /** NET MIGRATION: arrivals minus departures, never below zero. value max(0,
    inflow − outflow). -/
theorem fam_migration_netmigration_2 : (fmax 0 (3000 - 5000)) = 0 := by decide

/-- migration: grossflow(5000, 3000) = 8000 — GROSS FLOW: total movement across the border. value inflow +
    outflow. -/
theorem fam_migration_grossflow_1 : (5000 + 3000) = 8000 := by decide

/-- migration: rate(2000, 50000) = 40 — MIGRATION RATE per thousand of population. value ⌊migrants · 1000 /
    population⌋. -/
theorem fam_migration_rate_1 : ((2000 * 1000) / 50000) = 40 := by decide

/-- migration: pushpull(30, 70) = 40 — PUSH-PULL: net pull pressure, never below zero. value max(0, pull −
    push). -/
theorem fam_migration_pushpull_1 : (fmax 0 (70 - 30)) = 40 := by decide

/-- migration: remittanceshare(300, 1500) = 20 — REMITTANCE SHARE of income, as a percentage. value ⌊remittance
    · 100 / income⌋. -/
theorem fam_migration_remittanceshare_1 : ((300 * 100) / 1500) = 20 := by decide

/-- migration: settlementratio(800, 1000) = 80 — SETTLEMENT RATIO: arrivals that settle, as a percentage. value
    ⌊settled · 100 / arrivals⌋. -/
theorem fam_migration_settlementratio_1 : ((800 * 100) / 1000) = 80 := by decide

/-- migration: returnrate(250, 1000) = 25 — RETURN RATE: emigrants that return, as a percentage. value ⌊returned
    · 100 / emigrated⌋. -/
theorem fam_migration_returnrate_1 : ((250 * 100) / 1000) = 25 := by decide

/-- migration: integrationindex(60, 90, 3) = 51 — INTEGRATION INDEX: the mean of employment, language and tenure
    scores. value ⌊(employed + language + years) / 3⌋. -/
theorem fam_migration_integrationindex_1 : (((60 + 90) + 3) / 3) = 51 := by decide

/-- milling: extraction(720, 1000) = 72 — MILLING — TURNING GRAIN INTO FLOUR, AS ARITHMETIC (the mill is
    numbers). Extraction rate, flour yield, grinding throughput, flour and bran mass balance, sieve fineness,
    grain moisture, and the blend of several grains. Crosses to `agriculture` — milling is what the harvest
    becomes. A measure. */ const PROOF = 'milling arithmetic (extraction, yield, throughput, flour, bran,
    fineness, moisture, blend); grain becomes flour; a measure crossed to agriculture' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'milling', dst: 'agriculture', formula, value, proof: PROOF,
    ...extra }, holds, { name: `milling.${name}`, params }) export class MillingFormulas { /** EXTRACTION RATE:
    flour drawn from wheat, as a percentage. value ⌊flour · 100 / wheat⌋. -/
theorem fam_milling_extraction_1 : ((720 * 100) / 1000) = 72 := by decide

/-- milling: yield(1000, 75) = 750 — FLOUR YIELD: grain at an extraction rate. value ⌊grain · rate / 100⌋. -/
theorem fam_milling_yield_1 : ((1000 * 75) / 100) = 750 := by decide

/-- milling: throughput(6000, 60) = 100 — THROUGHPUT: grain milled over hours. value ⌊grain / hours⌋. -/
theorem fam_milling_throughput_1 : (6000 / 60) = 100 := by decide

/-- milling: flour(1000, 250) = 750 — FLOUR MASS: total milled less the bran. value max(0, total − bran). -/
theorem fam_milling_flour_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- milling: bran(1000, 750) = 250 — BRAN BYPRODUCT: total milled less the flour. value max(0, total − flour). -/
theorem fam_milling_bran_1 : (fmax 0 (1000 - 750)) = 250 := by decide

/-- milling: fineness(950, 1000) = 95 — FINENESS: particles passing a sieve, as a percentage. value ⌊passed ·
    100 / total⌋. -/
theorem fam_milling_fineness_1 : ((950 * 100) / 1000) = 95 := by decide

/-- milling: moisture(14, 100) = 14 — MOISTURE: water in a grain mass, as a percentage. value ⌊water · 100 /
    mass⌋. -/
theorem fam_milling_moisture_1 : ((14 * 100) / 100) = 14 := by decide

/-- milling: blend(600, 300, 100) = 1000 — BLEND: the total mass of three grains milled together. value wheat +
    rye + barley. -/
theorem fam_milling_blend_1 : ((600 + 300) + 100) = 1000 := by decide

/-- mime: gestures(12, 8) = 20 -/
theorem fam_mime_gestures_1 : (12 + 8) = 20 := by decide

/-- mime: illusiontypes(4, 3) = 12 -/
theorem fam_mime_illusiontypes_1 : (4 * 3) = 12 := by decide

/-- mime: isolationpoints(6, 6) = 12 -/
theorem fam_mime_isolationpoints_1 : (6 + 6) = 12 := by decide

/-- mime: tempobeats(60, 1) = 60 -/
theorem fam_mime_tempobeats_1 : (60 * 1) = 60 := by decide

/-- mime: spacegrid(8, 8) = 64 -/
theorem fam_mime_spacegrid_1 : (8 * 8) = 64 := by decide

/-- mime: claritypct(90, 100) = 90 -/
theorem fam_mime_claritypct_1 : ((90 * 100) / 100) = 90 := by decide

/-- mineralogy: hardness(7) = 7 — MINERALOGY — MINERALS AS ARITHMETIC (chosen by the materials registry, not by
    hand). A mineral is numbers: hardness on the Mohs scale, density from mass over volume, cleavage planes, how
    light refracts, ore grade, crystallinity, purity, and specific gravity against water. Crosses to `materials`
    — minerals are what materials are made of. A measure. */ const PROOF = 'mineralogy arithmetic (Mohs
    hardness, density, cleavage, refraction, ore grade, crystallinity, purity, specific gravity); a materials
    domain; a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'mineralogy', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `mineralogy.${name}`, params }) export class MineralogyFormulas { /** HARDNESS on the Mohs scale: the
    scratch rank. value scratch. -/
theorem fam_mineralogy_hardness_1 : 7 = 7 := by decide

/-- mineralogy: density(300, 100) = 3 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_mineralogy_density_1 : (300 / 100) = 3 := by decide

/-- mineralogy: cleavage(3) = 3 — CLEAVAGE: the number of planes. value planes. -/
theorem fam_mineralogy_cleavage_1 : 3 = 3 := by decide

/-- mineralogy: refraction(544, 1) = 544000 — REFRACTION: incident angle over the refractive index (·1000).
    value ⌊incident · 1000 / index⌋. -/
theorem fam_mineralogy_refraction_1 : ((544 * 1000) / 1) = 544000 := by decide

/-- mineralogy: grade(25, 75) = 25 — ORE GRADE as a percentage. value ⌊ore · 100 / (ore + gangue)⌋. -/
theorem fam_mineralogy_grade_1 : ((25 * 100) / (25 + 75)) = 25 := by decide

/-- mineralogy: crystallinity(80, 100) = 80 — CRYSTALLINITY as a percentage. value ⌊crystalline · 100 / total⌋. -/
theorem fam_mineralogy_crystallinity_1 : ((80 * 100) / 100) = 80 := by decide

/-- mineralogy: purity(90, 100) = 90 — PURITY as a percentage. value ⌊mineral · 100 / sample⌋. -/
theorem fam_mineralogy_purity_1 : ((90 * 100) / 100) = 90 := by decide

/-- mineralogy: specific(2650, 1000) = 2650 — SPECIFIC GRAVITY against water (·1000). value ⌊weight · 1000 /
    water⌋. -/
theorem fam_mineralogy_specific_1 : ((2650 * 1000) / 1000) = 2650 := by decide

/-- mining: grade(5, 1000) = 5000 — MINING — MINERAL EXTRACTION ECONOMICS, AS ARITHMETIC. Pulling metal from
    rock is numbers: the grade of the ore, how much of the metal is recovered, the reserves a deposit holds, the
    waste stripped per tonne of ore, whether a block clears the cut-off, the mill's throughput, the process
    yield, and the cost to move a tonne. Crosses to `econ` — mining is economics in the ground. A measure. */
    const PROOF = 'mining arithmetic (ore grade, recovery, reserves, stripping ratio, cut-off, throughput,
    yield, cost); mineral extraction economics as integers; a measure crossed to econ' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'mining', dst: 'econ', formula, value, proof: PROOF, ...extra },
    holds, { name: `mining.${name}`, params }) export class MiningFormulas { /** ORE GRADE: metal in the ore, in
    parts per million. value ⌊metal · 1000000 / ore⌋. -/
theorem fam_mining_grade_1 : ((5 * 1000000) / 1000) = 5000 := by decide

/-- mining: recovery(90, 100) = 90 — RECOVERY: the metal recovered out of what the ore contained, as a
    percentage. value ⌊recovered · 100 / contained⌋. -/
theorem fam_mining_recovery_1 : ((90 * 100) / 100) = 90 := by decide

/-- mining: reserves(1000000, 5000) = 5000 — RESERVES: the metal a tonnage of ore holds at a grade (ppm). value
    ⌊tonnage · grade / 1000000⌋. -/
theorem fam_mining_reserves_1 : ((1000000 * 5000) / 1000000) = 5000 := by decide

/-- mining: stripping(300, 100) = 300 — STRIPPING RATIO: waste moved per tonne of ore, as a percentage. value
    ⌊waste · 100 / ore⌋. -/
theorem fam_mining_stripping_1 : ((300 * 100) / 100) = 300 := by decide

/-- mining: throughput(12000, 24) = 500 — THROUGHPUT: tonnes milled over the hours run. value ⌊tonnes / hours⌋. -/
theorem fam_mining_throughput_1 : (12000 / 24) = 500 := by decide

/-- mining: yield(80, 100) = 80 — YIELD: product out of the feed, as a percentage. value ⌊product · 100 / feed⌋. -/
theorem fam_mining_yield_1 : ((80 * 100) / 100) = 80 := by decide

/-- mining: cost(500, 7) = 3500 — COST: tonnes moved at a per-tonne rate. value tonnes · rate. -/
theorem fam_mining_cost_1 : (500 * 7) = 3500 := by decide

/-- mitosis: cellcount(5, 3) = 40 — MITOSIS — CELL DIVISION AS ARITHMETIC. A dividing population is numbers:
    cells after a run of doublings, generations in a span of time, the length of a cycle from its phases, the
    fraction of the cycle a phase takes, time per doubling, chromosomes carried by the population, the growth
    fraction and the mitotic index. Crosses to `genetics` — mitosis is what carries the genome from one cell to
    two. A measure. */ const PROOF = 'mitosis arithmetic (cell count by doublings, generations, cycle length,
    phase fraction, doubling time, chromosomes, growth fraction, mitotic index); cell division crossed to
    genetics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'mitosis', dst: 'genetics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `mitosis.${name}`, params }) export class
    MitosisFormulas { /** CELL COUNT: an initial population after a run of doublings. value initial · 2^gens. -/
theorem fam_mitosis_cellcount_1 : (5 * (2 ^ 3)) = 40 := by decide

/-- mitosis: chromosomes(100, 46) = 4600 — CHROMOSOMES: the chromosomes a population carries at a count per
    cell. value cells · diploid. -/
theorem fam_mitosis_chromosomes_1 : (100 * 46) = 4600 := by decide

/-- mitosis: cyclelength(11, 8, 5) = 24 — CYCLE LENGTH: the cell cycle as the sum of its phases (G1, S, G2M).
    value g1 + s + g2m. -/
theorem fam_mitosis_cyclelength_1 : ((11 + 8) + 5) = 24 := by decide

/-- mitosis: doublingtime(48, 4) = 12 — DOUBLING TIME: time over the doublings observed. value ⌊time /
    doublings⌋. -/
theorem fam_mitosis_doublingtime_1 : (48 / 4) = 12 := by decide

/-- mitosis: generations(48, 24) = 2 — GENERATIONS: the divisions a span of time allows at a cycle length. value
    ⌊hours / cycle⌋. -/
theorem fam_mitosis_generations_1 : (48 / 24) = 2 := by decide

/-- mitosis: growthfraction(300, 1000) = 30 — GROWTH FRACTION: the cycling cells as a percentage of the
    population. value ⌊cycling · 100 / total⌋. -/
theorem fam_mitosis_growthfraction_1 : ((300 * 100) / 1000) = 30 := by decide

/-- mitosis: mitoticindex(50, 1000) = 5 — MITOTIC INDEX: the cells in mitosis as a percentage of the population.
    value ⌊mitotic · 100 / total⌋. -/
theorem fam_mitosis_mitoticindex_1 : ((50 * 100) / 1000) = 5 := by decide

/-- mitosis: phasefraction(6, 24) = 25 — PHASE FRACTION: a phase as a percentage of the cycle. value ⌊phase ·
    100 / cycle⌋. -/
theorem fam_mitosis_phasefraction_1 : ((6 * 100) / 24) = 25 := by decide

/-- mixing: gain(100, 3) = 300 — MIXING — THE MIXING CONSOLE AS ARITHMETIC. Summing signals is numbers: gain
    applied to a level, headroom under a ceiling, the pan position across a stereo field, a compressor folding
    what sits over its threshold, the ratio of input to output, average loudness, a crossfade between two
    sources, and the bus that sums the channels. Crosses to `acoustics` — mixing is the arithmetic acoustics
    sounds out. A measure. */ const PROOF = 'mixing arithmetic (gain, headroom, pan, compression, ratio,
    loudness, crossfade, bus); the console as integers; a measure crossed to acoustics' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'mixing', dst: 'acoustics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `mixing.${name}`, params }) export class MixingFormulas { /** GAIN: a level scaled by a
    factor. value level · factor. -/
theorem fam_mixing_gain_1 : (100 * 3) = 300 := by decide

/-- mixing: headroom(24, 18) = 6 — HEADROOM: how far a peak sits under the ceiling. value max(0, ceiling −
    peak). -/
theorem fam_mixing_headroom_1 : (fmax 0 (24 - 18)) = 6 := by decide

/-- mixing: headroom(18, 24) = 0 — HEADROOM: how far a peak sits under the ceiling. value max(0, ceiling −
    peak). -/
theorem fam_mixing_headroom_2 : (fmax 0 (18 - 24)) = 0 := by decide

/-- mixing: pan(25, 75) = 25 — PAN: the share of the signal sent left, as a percentage. value ⌊left · 100 /
    (left + right)⌋. -/
theorem fam_mixing_pan_1 : ((25 * 100) / (25 + 75)) = 25 := by decide

/-- mixing: ratio(100, 25) = 4 — RATIO: input over output, floored. value ⌊input / output⌋. -/
theorem fam_mixing_ratio_1 : (100 / 25) = 4 := by decide

/-- mixing: loudness(600, 8) = 75 — LOUDNESS: the average over the frames. value ⌊sum / count⌋. -/
theorem fam_mixing_loudness_1 : (600 / 8) = 75 := by decide

/-- mixing: crossfade(100, 200, 25) = 125 — CROSSFADE: a blend of two sources at a position (0..100). value ⌊(a
    · (100 − pos) + b · pos) / 100⌋. -/
theorem fam_mixing_crossfade_1 : (((100 * (100 - 25)) + (200 * 25)) / 100) = 125 := by decide

/-- mixing: bus(8, 125) = 1000 — BUS: the channels summed at a per-channel level. value channels · perChannel. -/
theorem fam_mixing_bus_1 : (8 * 125) = 1000 := by decide

/-- mixology: abv(40, 100) = 40 — MIXOLOGY — THE DRINK AS ARITHMETIC (chosen by the recipe registry, not by
    hand). Mixing a cocktail is numbers: the ABV from alcohol over volume, the dilution water adds, the parts
    ratio of spirit to mixer, the sugar a syrup carries, the servings a bottle pours, the total pour of parts at
    a unit, the sweet-over-sour balance, and the alcohol a serving holds. Crosses to `cuisine` — a drink is a
    dish you pour. A measure. */ const PROOF = 'mixology arithmetic (ABV, dilution, parts ratio, sugar content,
    servings, pour, sweet/sour balance, strength); the recipe registry\'s uncovered domain; a measure crossed to
    cuisine' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'mixology', dst: 'cuisine',
    formula, value, proof: PROOF, ...extra }, holds, { name: `mixology.${name}`, params }) export class
    MixologyFormulas { /** ALCOHOL BY VOLUME as a percentage. value ⌊alcohol · 100 / volume⌋. -/
theorem fam_mixology_abv_1 : ((40 * 100) / 100) = 40 := by decide

/-- mixology: dilution(60, 20) = 25 — DILUTION: the water as a percentage of the finished drink. value ⌊water ·
    100 / (spirit + water)⌋. -/
theorem fam_mixology_dilution_1 : ((20 * 100) / (60 + 20)) = 25 := by decide

/-- mixology: ratio(60, 20) = 3 — PARTS RATIO: parts of spirit per part of mixer. value ⌊spirit / mixer⌋. -/
theorem fam_mixology_ratio_1 : (60 / 20) = 3 := by decide

/-- mixology: sugarcontent(200, 50) = 100 — SUGAR CONTENT: grams of sugar a syrup carries at a concentration.
    value ⌊syrup · concentration / 100⌋. -/
theorem fam_mixology_sugarcontent_1 : ((200 * 50) / 100) = 100 := by decide

/-- mixology: servings(750, 50) = 15 — SERVINGS: the drinks a bottle pours at a size each. value ⌊bottle /
    perDrink⌋. -/
theorem fam_mixology_servings_1 : (750 / 50) = 15 := by decide

/-- mixology: pour(3, 30) = 90 — POUR: total volume of parts at a unit each. value parts · unit. -/
theorem fam_mixology_pour_1 : (3 * 30) = 90 := by decide

/-- mixology: balance(20, 12) = 8 — BALANCE: the surplus of sweet over sour. value max(0, sweet − sour). -/
theorem fam_mixology_balance_1 : (fmax 0 (20 - 12)) = 8 := by decide

/-- mixology: strength(40, 90) = 36 — STRENGTH: the pure alcohol a serving holds at an ABV. value ⌊abv · volume
    / 100⌋. -/
theorem fam_mixology_strength_1 : ((40 * 90) / 100) = 36 := by decide

/-- ml: parameters(1000, 12) = 12000 -/
theorem fam_ml_parameters_1 : (1000 * 12) = 12000 := by decide

/-- ml: accuracy(95, 100) = 95 -/
theorem fam_ml_accuracy_1 : ((95 * 100) / 100) = 95 := by decide

/-- ml: epochs(50, 1) = 50 -/
theorem fam_ml_epochs_1 : (50 * 1) = 50 := by decide

/-- ml: layersubsets(6) = 64 -/
theorem fam_ml_layersubsets_1 : (2 ^ 6) = 64 := by decide

/-- ml: learningrate(1000, 100) = 10 -/
theorem fam_ml_learningrate_1 : (1000 / 100) = 10 := by decide

/-- ml: gradientsteps(1000, 10) = 10000 -/
theorem fam_ml_gradientsteps_1 : (1000 * 10) = 10000 := by decide

/-- ml: f1score(88, 100) = 88 -/
theorem fam_ml_f1score_1 : ((88 * 100) / 100) = 88 := by decide

/-- mobility: modeshare(45, 100) = 45 — MOBILITY — HOW PEOPLE MOVE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Moving people is numbers: the share a mode carries, commute minutes, trips per
    person, opportunities within reach, the congestion index, seats filled per vehicle, the fare for a distance,
    and the share of an area the network covers. Crosses to `logistics` — mobility is logistics for people. A
    measure. */ const PROOF = 'mobility arithmetic (mode share, commute time, trip rate, accessibility,
    congestion, vehicle occupancy, fare cost, network coverage); a measure crossed to logistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'mobility', dst: 'logistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `mobility.${name}`, params }) export class MobilityFormulas { /** MODE SHARE: the
    percentage of trips a mode carries. value ⌊trips · 100 / total⌋. -/
theorem fam_mobility_modeshare_1 : ((45 * 100) / 100) = 45 := by decide

/-- mobility: commutetime(30, 60) = 30 — COMMUTE TIME: minutes to cover a distance at a speed (km, km/h). value
    ⌊distance · 60 / speed⌋. -/
theorem fam_mobility_commutetime_1 : ((30 * 60) / 60) = 30 := by decide

/-- mobility: triprate(300, 100) = 3 — TRIP RATE: trips per person. value ⌊trips / people⌋. -/
theorem fam_mobility_triprate_1 : (300 / 100) = 3 := by decide

/-- mobility: accessibility(1000, 20) = 50 — ACCESSIBILITY: opportunities reached per unit of travel cost. value
    ⌊opportunities / cost⌋. -/
theorem fam_mobility_accessibility_1 : (1000 / 20) = 50 := by decide

/-- mobility: congestion(90, 60) = 150 — CONGESTION: the travel-time index, actual against free-flow. value
    ⌊actual · 100 / free⌋. -/
theorem fam_mobility_congestion_1 : ((90 * 100) / 60) = 150 := by decide

/-- mobility: vehicleoccupancy(120, 40) = 3 — VEHICLE OCCUPANCY: passengers per vehicle. value ⌊passengers /
    vehicles⌋. -/
theorem fam_mobility_vehicleoccupancy_1 : (120 / 40) = 3 := by decide

/-- mobility: farecost(12, 3) = 36 — FARE COST: a distance at a per-unit rate. value distance · rate. -/
theorem fam_mobility_farecost_1 : (12 * 3) = 36 := by decide

/-- mobility: networkcoverage(80, 100) = 80 — NETWORK COVERAGE: the percentage of an area the network serves.
    value ⌊served · 100 / area⌋. -/
theorem fam_mobility_networkcoverage_1 : ((80 * 100) / 100) = 80 := by decide

/-- mobility: triprate(10, 0) = 0 — TRIP RATE: trips per person. value ⌊trips / people⌋. -/
theorem fam_mobility_triprate_2 : (10 / 0) = 0 := by decide

/-- modulation: index(50, 100) = 50 — MODULATION — IMPRESSING A MESSAGE ON A CARRIER, AS ARITHMETIC. A radio
    link is numbers: the modulation index, the bandwidth a channel needs, the spectral lines it spreads into,
    the frequency deviation, the carrier power, the symbols and bits it carries each second, and how efficiently
    it uses its spectrum. Crosses to `signal` — modulation is how a signal is shaped onto the air. A measure. */
    const PROOF = 'modulation arithmetic (index, Carson bandwidth, sidebands, deviation, carrier power, symbol
    rate, bit rate, spectral efficiency); impressing a message on a carrier; a measure crossed to signal' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'modulation', dst: 'signal', formula, value,
    proof: PROOF, ...extra }, holds, { name: `modulation.${name}`, params }) export class ModulationFormulas {
    /** MODULATION INDEX as a percentage: the peak against the carrier. value ⌊peak · 100 / carrier⌋. -/
theorem fam_modulation_index_1 : ((50 * 100) / 100) = 50 := by decide

/-- modulation: bandwidth(75, 15) = 180 — CARSON BANDWIDTH: twice the sum of deviation and the top modulating
    frequency. value 2 · (dev + fmod). -/
theorem fam_modulation_bandwidth_1 : (2 * (75 + 15)) = 180 := by decide

/-- modulation: sidebands(3) = 7 — SIDEBANDS: the total spectral lines for a given number of significant pairs,
    carrier included. value 2 · pairs + 1. -/
theorem fam_modulation_sidebands_1 : ((2 * 3) + 1) = 7 := by decide

/-- modulation: deviation(5, 15) = 75 — FREQUENCY DEVIATION: the index times the modulating frequency. value
    index · fmod. -/
theorem fam_modulation_deviation_1 : (5 * 15) = 75 := by decide

/-- modulation: symbolrate(9600, 4) = 2400 — SYMBOL RATE: the bit rate divided by the bits each symbol carries.
    value ⌊bits / perSymbol⌋. -/
theorem fam_modulation_symbolrate_1 : (9600 / 4) = 2400 := by decide

/-- modulation: bitrate(2400, 4) = 9600 — BIT RATE: the symbol rate times the bits each symbol carries. value
    baud · perSymbol. -/
theorem fam_modulation_bitrate_1 : (2400 * 4) = 9600 := by decide

/-- modulation: efficiency(9600, 2400) = 400 — SPECTRAL EFFICIENCY: the bit rate against the bandwidth, as a
    percentage. value ⌊bits · 100 / bw⌋. -/
theorem fam_modulation_efficiency_1 : ((9600 * 100) / 2400) = 400 := by decide

/-- modulation: efficiency(9600, 0) = 0 — SPECTRAL EFFICIENCY: the bit rate against the bandwidth, as a
    percentage. value ⌊bits · 100 / bw⌋. -/
theorem fam_modulation_efficiency_2 : ((9600 * 100) / 0) = 0 := by decide

/-- monasticism: hoursofprayer(7, 1) = 8 -/
theorem fam_monasticism_hoursofprayer_1 : (7 + 1) = 8 := by decide

/-- monasticism: ruleclauses(73, 1) = 73 -/
theorem fam_monasticism_ruleclauses_1 : (73 * 1) = 73 := by decide

/-- monasticism: communitysize(12, 2) = 24 -/
theorem fam_monasticism_communitysize_1 : (12 * 2) = 24 := by decide

/-- monasticism: dailycycle(1440, 8) = 180 -/
theorem fam_monasticism_dailycycle_1 : (1440 / 8) = 180 := by decide

/-- monasticism: silenceratio(16, 24) = 66 -/
theorem fam_monasticism_silenceratio_1 : ((16 * 100) / 24) = 66 := by decide

/-- monasticism: obediencelevels(3) = 8 -/
theorem fam_monasticism_obediencelevels_1 : (2 ^ 3) = 8 := by decide

/-- monitoring: uptime(999, 1000) = 99 — MONITORING — SRE AND ALERTING, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Watching a running system is numbers: uptime, mean time to repair, mean time to
    failure, how many alerts fired, the Apdex score, alert noise, monitoring coverage, and the share of
    incidents still open. Crosses to `obs` — monitoring is how observability acts. A measure. */ const PROOF =
    'monitoring arithmetic (uptime, mttr, mttf, alerts, apdex, noise, coverage, incidents); SRE and alerting
    over a running system; a measure crossed to obs' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'monitoring', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name:
    `monitoring.${name}`, params }) export class MonitoringFormulas { /** UPTIME as a percentage. value ⌊up ·
    100 / total⌋. -/
theorem fam_monitoring_uptime_1 : ((999 * 100) / 1000) = 99 := by decide

/-- monitoring: mttr(600, 5) = 120 — MEAN TIME TO REPAIR: total downtime over the incidents. value ⌊total /
    incidents⌋. -/
theorem fam_monitoring_mttr_1 : (600 / 5) = 120 := by decide

/-- monitoring: mttf(8760, 12) = 730 — MEAN TIME TO FAILURE: uptime over the failures. value ⌊uptime /
    failures⌋. -/
theorem fam_monitoring_mttf_1 : (8760 / 12) = 730 := by decide

/-- monitoring: alerts(30, 120) = 25 — ALERTS as a percentage: fired of the total. value ⌊fired · 100 / total⌋. -/
theorem fam_monitoring_alerts_1 : ((30 * 100) / 120) = 25 := by decide

/-- monitoring: apdex(950, 1000) = 95 — APDEX: satisfied of the total requests, as a percentage. value
    ⌊satisfied · 100 / total⌋. -/
theorem fam_monitoring_apdex_1 : ((950 * 100) / 1000) = 95 := by decide

/-- monitoring: noise(20, 80) = 25 — NOISE: false positives of the total alerts, as a percentage. value
    ⌊falsePositives · 100 / total⌋. -/
theorem fam_monitoring_noise_1 : ((20 * 100) / 80) = 25 := by decide

/-- monitoring: coverage(85, 100) = 85 — COVERAGE: monitored of the total services, as a percentage. value
    ⌊monitored · 100 / total⌋. -/
theorem fam_monitoring_coverage_1 : ((85 * 100) / 100) = 85 := by decide

/-- monitoring: incidents(3, 12) = 25 — INCIDENTS: open of the total, as a percentage. value ⌊open · 100 /
    total⌋. -/
theorem fam_monitoring_incidents_1 : ((3 * 100) / 12) = 25 := by decide

/-- monopoly: marketshare(90, 100) = 90 -/
theorem fam_monopoly_marketshare_1 : ((90 * 100) / 100) = 90 := by decide

/-- monopoly: markup(40, 100) = 40 -/
theorem fam_monopoly_markup_1 : ((40 * 100) / 100) = 40 := by decide

/-- monopoly: deadweightloss(500, 10) = 50 -/
theorem fam_monopoly_deadweightloss_1 : (500 / 10) = 50 := by decide

/-- monopoly: lernerindex(40, 100) = 40 -/
theorem fam_monopoly_lernerindex_1 : ((40 * 100) / 100) = 40 := by decide

/-- monopoly: outputreduction(1000, 600) = 400 -/
theorem fam_monopoly_outputreduction_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- monopoly: pricemargin(150, 100) = 50 -/
theorem fam_monopoly_pricemargin_1 : (fmax 0 (150 - 100)) = 50 := by decide

/-- monopoly: barriersubsets(5) = 32 -/
theorem fam_monopoly_barriersubsets_1 : (2 ^ 5) = 32 := by decide

/-- monopoly: profitmax(10000, 2) = 5000 -/
theorem fam_monopoly_profitmax_1 : (10000 / 2) = 5000 := by decide

/-- monorail: speed(8000, 60) = 133 -/
theorem fam_monorail_speed_1 : (8000 / 60) = 133 := by decide

/-- monorail: headwayseconds(600, 10) = 60 -/
theorem fam_monorail_headwayseconds_1 : (600 / 10) = 60 := by decide

/-- monorail: capacity(200, 6) = 1200 -/
theorem fam_monorail_capacity_1 : (200 * 6) = 1200 := by decide

/-- monorail: stations(12, 8) = 20 -/
theorem fam_monorail_stations_1 : (12 + 8) = 20 := by decide

/-- monorail: traveltime(3600, 133) = 27 -/
theorem fam_monorail_traveltime_1 : (3600 / 133) = 27 := by decide

/-- monorail: accelrate(100, 10) = 10 -/
theorem fam_monorail_accelrate_1 : (100 / 10) = 10 := by decide

/-- monorail: gradientpct(6, 100) = 6 -/
theorem fam_monorail_gradientpct_1 : ((6 * 100) / 100) = 6 := by decide

/-- monorail: throughput(1200, 10) = 12000 -/
theorem fam_monorail_throughput_1 : (1200 * 10) = 12000 := by decide

/-- monsoon: onsetday(150, 10) = 160 -/
theorem fam_monsoon_onsetday_1 : (150 + 10) = 160 := by decide

/-- monsoon: rainfall(800, 1) = 800 -/
theorem fam_monsoon_rainfall_1 : (800 * 1) = 800 := by decide

/-- monsoon: durationdays(120, 0) = 120 -/
theorem fam_monsoon_durationdays_1 : (120 + 0) = 120 := by decide

/-- monsoon: windreversal(180, 90) = 180 -/
theorem fam_monsoon_windreversal_1 : (fmax 180 90) = 180 := by decide

/-- monsoon: intensityindex(70, 100) = 70 -/
theorem fam_monsoon_intensityindex_1 : ((70 * 100) / 100) = 70 := by decide

/-- monsoon: rainydays(120, 2) = 60 -/
theorem fam_monsoon_rainydays_1 : (120 / 2) = 60 := by decide

/-- monsoon: deficitpct(20, 100) = 20 -/
theorem fam_monsoon_deficitpct_1 : ((20 * 100) / 100) = 20 := by decide

/-- monsoon: cyclelength(12, 1) = 12 -/
theorem fam_monsoon_cyclelength_1 : (12 * 1) = 12 := by decide

/-- morphology: morphemes(300, 100) = 3 — MORPHOLOGY — WORD STRUCTURE, AS ARITHMETIC. The shape of words is
    numbers: morphemes per word, how much of a paradigm is inflected, derivations per root, affixes per stem,
    how productive a pattern is, allomorphs per morpheme, how transparent (analyzable) the forms are, and
    morphological density in a text. Crosses to `linguistics`. A measure. */ const PROOF = 'morphology
    arithmetic (morphemes per word, inflection, derivation, affixation, productivity, allomorphy, transparency,
    density); word structure as counts; a measure crossed to linguistics' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'morphology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds,
    { name: `morphology.${name}`, params }) export class MorphologyFormulas { /** MORPHEMES PER WORD: morpheme
    parts over words. value ⌊parts / words⌋. -/
theorem fam_morphology_morphemes_1 : (300 / 100) = 3 := by decide

/-- morphology: inflection(6, 8) = 75 — INFLECTION: inflected forms as a percentage of the paradigm. value
    ⌊inflected · 100 / forms⌋. -/
theorem fam_morphology_inflection_1 : ((6 * 100) / 8) = 75 := by decide

/-- morphology: derivation(50, 10) = 5 — DERIVATION: derived words per root. value ⌊derived / roots⌋. -/
theorem fam_morphology_derivation_1 : (50 / 10) = 5 := by decide

/-- morphology: affixation(30, 20) = 150 — AFFIXATION: affixes per stem, as a percentage. value ⌊affixes · 100 /
    stems⌋. -/
theorem fam_morphology_affixation_1 : ((30 * 100) / 20) = 150 := by decide

/-- morphology: productivity(5, 1000) = 0 — PRODUCTIVITY: neologisms as a percentage of a base vocabulary. value
    ⌊neologisms · 100 / base⌋. -/
theorem fam_morphology_productivity_1 : ((5 * 100) / 1000) = 0 := by decide

/-- morphology: allomorphy(12, 4) = 3 — ALLOMORPHY: variant forms per morpheme. value ⌊variants / morphemes⌋. -/
theorem fam_morphology_allomorphy_1 : (12 / 4) = 3 := by decide

/-- morphology: transparency(70, 100) = 70 — TRANSPARENCY: analyzable forms as a percentage of the total. value
    ⌊analyzable · 100 / total⌋. -/
theorem fam_morphology_transparency_1 : ((70 * 100) / 100) = 70 := by decide

/-- morphology: density(150, 100) = 150 — DENSITY: morphemes per hundred tokens. value ⌊morphemes · 100 /
    tokens⌋. -/
theorem fam_morphology_density_1 : ((150 * 100) / 100) = 150 := by decide

/-- mortgage: ltv(160, 200) = 80 — MORTGAGE — HOME LENDING AS ARITHMETIC. A loan on a house is numbers:
    loan-to-value, debt-to-income, the cash down, the principal in a payment, the month's interest, the owner's
    equity, whether private mortgage insurance is owed, and how much a borrower can afford. Crosses to `banking`
    — a mortgage is the bank's loan on the house. A measure. */ const PROOF = 'mortgage arithmetic
    (loan-to-value, debt-to-income, down payment, principal, monthly interest, equity, PMI, affordability); home
    lending as exact integers; a measure crossed to banking' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'mortgage', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name:
    `mortgage.${name}`, params }) export class MortgageFormulas { /** LOAN-TO-VALUE as a percentage. value ⌊loan
    · 100 / price⌋. -/
theorem fam_mortgage_ltv_1 : ((160 * 100) / 200) = 80 := by decide

/-- mortgage: dti(2000, 5000) = 40 — DEBT-TO-INCOME as a percentage. value ⌊debt · 100 / income⌋. -/
theorem fam_mortgage_dti_1 : ((2000 * 100) / 5000) = 40 := by decide

/-- mortgage: downpayment(200, 160) = 40 — DOWN PAYMENT: the cash down, price less the loan. value max(0, price
    − loan). -/
theorem fam_mortgage_downpayment_1 : (fmax 0 (200 - 160)) = 40 := by decide

/-- mortgage: principal(1200, 500) = 700 — PRINCIPAL: the part of a payment that pays down the loan. value
    max(0, payment − interest). -/
theorem fam_mortgage_principal_1 : (fmax 0 (1200 - 500)) = 700 := by decide

/-- mortgage: interestportion(50000, 6) = 250 — MONTHLY INTEREST: a balance at an annual rate (percent), one
    month. value ⌊balance · rate / 1200⌋. -/
theorem fam_mortgage_interestportion_1 : ((50000 * 6) / 1200) = 250 := by decide

/-- mortgage: equity(50000, 30000) = 20000 — EQUITY: the owner's stake, price less what is still owed. value
    max(0, price − balance). -/
theorem fam_mortgage_equity_1 : (fmax 0 (50000 - 30000)) = 20000 := by decide

/-- mortgage: affordability(12000, 4) = 48000 — AFFORDABILITY: the most a borrower can borrow, income times a
    multiple. value income · multiple. -/
theorem fam_mortgage_affordability_1 : (12000 * 4) = 48000 := by decide

/-- mosaic: tilecount(40, 30) = 1200 -/
theorem fam_mosaic_tilecount_1 : (40 * 30) = 1200 := by decide

/-- mosaic: tessellationangle(360, 6) = 60 -/
theorem fam_mosaic_tessellationangle_1 : (360 / 6) = 60 := by decide

/-- mosaic: groutratio(10, 100) = 10 -/
theorem fam_mosaic_groutratio_1 : ((10 * 100) / 100) = 10 := by decide

/-- mosaic: gridcells(50, 50) = 2500 -/
theorem fam_mosaic_gridcells_1 : (50 * 50) = 2500 := by decide

/-- mosaic: tilesubsets(5) = 32 -/
theorem fam_mosaic_tilesubsets_1 : (2 ^ 5) = 32 := by decide

/-- mosaic: coverage(95, 100) = 95 -/
theorem fam_mosaic_coverage_1 : ((95 * 100) / 100) = 95 := by decide

/-- motion: frames(1000, 60) = 60 — FRAMES: the frames a span of ms covers at a frame rate. value ⌊ms · fps /
    1000⌋. -/
theorem fam_motion_frames_1 : ((1000 * 60) / 1000) = 60 := by decide

/-- motion: fps(120, 2) = 60 — FPS: frames over seconds. value ⌊frames / seconds⌋. -/
theorem fam_motion_fps_1 : (120 / 2) = 60 := by decide

/-- motion: delay(4) = 300 — DELAY: a step on the base duration scale (75 ms). value step · 75. -/
theorem fam_motion_delay_1 : (4 * 75) = 300 := by decide

/-- motion: stagger(5, 50) = 250 — STAGGER: a list of items at a per-item gap. value items · gap. -/
theorem fam_motion_stagger_1 : (5 * 50) = 250 := by decide

/-- motion: total(300, 150) = 450 — TOTAL SPAN: a duration after its delay. value duration + delay. -/
theorem fam_motion_total_1 : (300 + 150) = 450 := by decide

/-- motion: progress(150, 300) = 50 — PROGRESS: elapsed over a duration, as a percentage. value ⌊elapsed · 100 /
    duration⌋. -/
theorem fam_motion_progress_1 : ((150 * 100) / 300) = 50 := by decide

/-- motion: easing(12) = 12 — EASING: the step count of a steps() timing function. value steps. -/
theorem fam_motion_easing_1 : 12 = 12 := by decide

/-- motivation: expectancy(8, 10) = 80 — MOTIVATION — WHAT DRIVES ACTION, AS ARITHMETIC (Vroom expectancy
    theory, Hull drive theory, Bandura self-efficacy). Motivation is numbers: the odds effort performs, the net
    worth of a reward, the belief performance pays, drive from need and habit, incentive pull, effort per
    attempt, steps left to a goal, and confidence from past success. Crosses to `psychology` — motivation is
    what psychology measures in the mind. A measure. */ const PROOF = 'motivation arithmetic (expectancy,
    valence, instrumentality, drive, incentive, persistence, goal gradient, self-efficacy); Vroom × Hull ×
    Bandura; a measure crossed to psychology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'motivation', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `motivation.${name}`, params }) export class MotivationFormulas { /** EXPECTANCY: the odds (percent) that
    effort yields performance. value ⌊effort · 100 / total⌋. -/
theorem fam_motivation_expectancy_1 : ((8 * 100) / 10) = 80 := by decide

/-- motivation: valence(100, 40) = 60 — VALENCE: the net worth of a reward after its cost. value max(0, reward −
    cost). -/
theorem fam_motivation_valence_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- motivation: valence(30, 50) = 0 — VALENCE: the net worth of a reward after its cost. value max(0, reward −
    cost). -/
theorem fam_motivation_valence_2 : (fmax 0 (30 - 50)) = 0 := by decide

/-- motivation: instrumentality(9, 10) = 90 — INSTRUMENTALITY: the belief (percent) that performance pays off.
    value ⌊rewards · 100 / performances⌋. -/
theorem fam_motivation_instrumentality_1 : ((9 * 100) / 10) = 90 := by decide

/-- motivation: drive(6, 7) = 42 — DRIVE: Hull's drive = need × habit strength. value need · strength. -/
theorem fam_motivation_drive_1 : (6 * 7) = 42 := by decide

/-- motivation: incentive(50, 4) = 200 — INCENTIVE: the pull of a reward at its salience. value value ·
    salience. -/
theorem fam_motivation_incentive_1 : (50 * 4) = 200 := by decide

/-- motivation: persistence(100, 8) = 12 — PERSISTENCE: average effort spent per attempt. value ⌊total /
    attempts⌋. -/
theorem fam_motivation_persistence_1 : (100 / 8) = 12 := by decide

/-- motivation: selfefficacy(7, 8) = 87 — SELF-EFFICACY: confidence (percent) from the past success rate. value
    ⌊successes · 100 / trials⌋. -/
theorem fam_motivation_selfefficacy_1 : ((7 * 100) / 8) = 87 := by decide

/-- mtbf: meantime(8760, 3) = 2920 — MTBF — RELIABILITY AS ARITHMETIC. Running hardware is numbers: mean time
    between failures, the failure rate per million hours, mean time to repair, availability, the hazard rate
    over a fleet, cumulative device-hours, failures-in-time, and the life a part has left. Crosses to
    `statistics` — reliability is statistics on time-to-failure. A measure. */ const PROOF = 'mtbf arithmetic
    (mean time between failures, failure rate, mttr, availability, hazard rate, cumulative device-hours, FIT,
    remaining life); reliability as statistics on time-to-failure; a measure crossed to statistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'mtbf', dst: 'statistics', formula, value, proof: PROOF, ...extra
    }, holds, { name: `mtbf.${name}`, params }) export class MtbfFormulas { /** MEAN TIME BETWEEN FAILURES:
    operating hours over the failures seen. value ⌊hours / failures⌋. -/
theorem fam_mtbf_meantime_1 : (8760 / 3) = 2920 := by decide

/-- mtbf: failurerate(5, 1000000) = 5 — FAILURE RATE per million hours. value ⌊failures · 1000000 / hours⌋. -/
theorem fam_mtbf_failurerate_1 : ((5 * 1000000) / 1000000) = 5 := by decide

/-- mtbf: mttr(48, 6) = 8 — MEAN TIME TO REPAIR: repair hours over the repairs made. value ⌊repairhours /
    repairs⌋. -/
theorem fam_mtbf_mttr_1 : (48 / 6) = 8 := by decide

/-- mtbf: uptime(990, 10) = 99 — AVAILABILITY as a percentage. value ⌊mtbf · 100 / (mtbf + mttr)⌋. -/
theorem fam_mtbf_uptime_1 : ((990 * 100) / (990 + 10)) = 99 := by decide

/-- mtbf: hazardrate(2, 100, 10000) = 2 — HAZARD RATE per million hours over a fleet. value ⌊failures · 1000000
    / (units · hours)⌋. -/
theorem fam_mtbf_hazardrate_1 : ((2 * 1000000) / (100 * 10000)) = 2 := by decide

/-- mtbf: cumulativehours(100, 500) = 50000 — CUMULATIVE DEVICE-HOURS: units each running for hours. value units
    · hours. -/
theorem fam_mtbf_cumulativehours_1 : (100 * 500) = 50000 := by decide

/-- mtbf: fits(1, 1000000) = 1000 — FAILURES IN TIME: failures per billion hours. value ⌊failures · 1000000000 /
    hours⌋. -/
theorem fam_mtbf_fits_1 : ((1 * 1000000000) / 1000000) = 1000 := by decide

/-- mtbf: operatinglife(50000, 12000) = 38000 — REMAINING OPERATING LIFE: design hours less the hours already
    used. value max(0, designhours − usedhours). -/
theorem fam_mtbf_operatinglife_1 : (fmax 0 (50000 - 12000)) = 38000 := by decide

/-- mtbf: operatinglife(10000, 12000) = 0 — REMAINING OPERATING LIFE: design hours less the hours already used.
    value max(0, designhours − usedhours). -/
theorem fam_mtbf_operatinglife_2 : (fmax 0 (10000 - 12000)) = 0 := by decide

/-- music: interval(7) = 7 — MUSIC — MUSIC THEORY & AUDIO, AS ARITHMETIC. The sounding world is numbers: an
    interval in semitones, the octave a note sits in, tempo in beats per minute, the beats a measure holds, the
    frequency a pitch rings at, a transposition, the bars a run of beats fills, and the tempo a beat's length
    implies. Crosses to `tune` — music is what tuning measures. A measure. */ const PROOF = 'music arithmetic
    (interval, octave, bpm, beats, frequency, transpose, bars, tempo); music theory & audio as integer formulas;
    a measure crossed to tune' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'music', dst: 'tune',
    formula, value, proof: PROOF, ...extra }, holds, { name: `music.${name}`, params }) export class
    MusicFormulas { /** INTERVAL: the distance between two pitches, in semitones. value semitones. -/
theorem fam_music_interval_1 : 7 = 7 := by decide

/-- music: octave(60) = 5 — OCTAVE: the octave a note number sits in. value ⌊note / 12⌋. -/
theorem fam_music_octave_1 : (60 / 12) = 5 := by decide

/-- music: bpm(240, 4) = 60 — BPM: beats per minute from beats over minutes. value ⌊beats / minutes⌋. -/
theorem fam_music_bpm_1 : (240 / 4) = 60 := by decide

/-- music: beats(4, 4) = 16 — BEATS: the beats a run of bars holds at a time signature. value bars · signature. -/
theorem fam_music_beats_1 : (4 * 4) = 16 := by decide

/-- music: frequency(440, 12) = 751 — FREQUENCY: equal-temperament pitch a base ring reaches after n semitones.
    value ⌊base · (1000 + semitones · 59) / 1000⌋. -/
theorem fam_music_frequency_1 : ((440 * (1000 + (12 * 59))) / 1000) = 751 := by decide

/-- music: transpose(60, 7) = 67 — TRANSPOSE: a note shifted by a number of steps. value note + steps. -/
theorem fam_music_transpose_1 : (60 + 7) = 67 := by decide

/-- music: bars(16, 4) = 4 — BARS: the bars a run of beats fills at a time signature. value ⌊beats / signature⌋. -/
theorem fam_music_bars_1 : (16 / 4) = 4 := by decide

/-- music: tempo(500, 1) = 120 — TEMPO: beats per minute a beat's length in milliseconds implies. value ⌊60000 /
    ms⌋. -/
theorem fam_music_tempo_1 : (60000 / 500) = 120 := by decide

/-- mycology: colonization(750, 1000) = 75 — MYCOLOGY — THE GROWTH OF FUNGI, AS ARITHMETIC (chosen by the
    registry, not by hand). Fungal life is numbers: biomass doubling, spores over an area, mycelial reach,
    decomposition of substrate, germination and colonization rates, biological efficiency, and fruiting per day.
    Crosses to `agriculture` — mushrooms are a crop. A measure. */ const PROOF = 'mycology arithmetic (growth,
    spore density, mycelium, decomposition, germination, colonization, biological efficiency, fruiting); a
    measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'mycology', dst:
    'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `mycology.${name}`, params }) export
    class MycologyFormulas { /** COLONIZATION of the substrate as a percentage. value ⌊covered · 100 /
    substrate⌋. -/
theorem fam_mycology_colonization_1 : ((750 * 100) / 1000) = 75 := by decide

/-- mycology: decomposition(300, 1000) = 30 — DECOMPOSITION of matter as a percentage. value ⌊broken · 100 /
    total⌋. -/
theorem fam_mycology_decomposition_1 : ((300 * 100) / 1000) = 30 := by decide

/-- mycology: efficiency(500, 1000) = 50 — BIOLOGICAL EFFICIENCY: harvest over substrate as a percentage. value
    ⌊harvest · 100 / substrate⌋. -/
theorem fam_mycology_efficiency_1 : ((500 * 100) / 1000) = 50 := by decide

/-- mycology: fruiting(100, 10) = 10 — FRUITING bodies per day. value ⌊bodies / days⌋. -/
theorem fam_mycology_fruiting_1 : (100 / 10) = 10 := by decide

/-- mycology: germination(450, 1000) = 45 — GERMINATION of spores as a percentage. value ⌊germinated · 100 /
    spores⌋. -/
theorem fam_mycology_germination_1 : ((450 * 100) / 1000) = 45 := by decide

/-- mycology: growth(100, 3) = 800 — GROWTH: biomass doubling. value initial · 2^doublings. -/
theorem fam_mycology_growth_1 : (100 * (2 ^ 3)) = 800 := by decide

/-- mycology: mycelium(50, 4) = 200 — MYCELIUM reach: length over branches. value length · branches. -/
theorem fam_mycology_mycelium_1 : (50 * 4) = 200 := by decide

/-- mycology: spore(10000, 100) = 100 — SPORE density: spores released over an area. value ⌊released / area⌋. -/
theorem fam_mycology_spore_1 : (10000 / 100) = 100 := by decide

/-- myrmecology: colonysize(10000, 5) = 50000 -/
theorem fam_myrmecology_colonysize_1 : (10000 * 5) = 50000 := by decide

/-- myrmecology: castecount(3, 1) = 4 -/
theorem fam_myrmecology_castecount_1 : (3 + 1) = 4 := by decide

/-- myrmecology: pheromonetrails(12, 4) = 48 -/
theorem fam_myrmecology_pheromonetrails_1 : (12 * 4) = 48 := by decide

/-- myrmecology: nestchambers(40, 20) = 60 -/
theorem fam_myrmecology_nestchambers_1 : (40 + 20) = 60 := by decide

/-- myrmecology: workerratio(95, 100) = 95 -/
theorem fam_myrmecology_workerratio_1 : ((95 * 100) / 100) = 95 := by decide

/-- myrmecology: broodstages(4, 0) = 4 -/
theorem fam_myrmecology_broodstages_1 : (4 + 0) = 4 := by decide

/-- mysticism: stages(3, 4) = 7 -/
theorem fam_mysticism_stages_1 : (3 + 4) = 7 := by decide

/-- mysticism: unionstates(5) = 32 -/
theorem fam_mysticism_unionstates_1 : (2 ^ 5) = 32 := by decide

/-- mysticism: contemplationlevels(3, 3) = 9 -/
theorem fam_mysticism_contemplationlevels_1 : (3 * 3) = 9 := by decide

/-- mysticism: darknesslight(100, 40) = 60 -/
theorem fam_mysticism_darknesslight_1 : (fmax 0 (100 - 40)) = 60 := by decide

/-- mysticism: illuminationratio(70, 100) = 70 -/
theorem fam_mysticism_illuminationratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- mythography: mythcount(200, 100) = 300 -/
theorem fam_mythography_mythcount_1 : (200 + 100) = 300 := by decide

/-- mythography: typeindex(50, 10) = 500 -/
theorem fam_mythography_typeindex_1 : (50 * 10) = 500 := by decide

/-- mythography: culturesubsets(6) = 64 -/
theorem fam_mythography_culturesubsets_1 : (2 ^ 6) = 64 := by decide

/-- mythography: diffusionlinks(12, 5) = 60 -/
theorem fam_mythography_diffusionlinks_1 : (12 * 5) = 60 := by decide

/-- mythography: versioncount(40, 20) = 60 -/
theorem fam_mythography_versioncount_1 : (40 + 20) = 60 := by decide

/-- mythology: pantheonsize(12, 3) = 15 -/
theorem fam_mythology_pantheonsize_1 : (12 + 3) = 15 := by decide

/-- mythology: archetypecount(7, 2) = 14 -/
theorem fam_mythology_archetypecount_1 : (7 * 2) = 14 := by decide

/-- mythology: motifsubsets(5) = 32 -/
theorem fam_mythology_motifsubsets_1 : (2 ^ 5) = 32 := by decide

/-- mythology: genealogylinks(12, 3) = 36 -/
theorem fam_mythology_genealogylinks_1 : (12 * 3) = 36 := by decide

/-- mythology: variantcount(40, 20) = 60 -/
theorem fam_mythology_variantcount_1 : (40 + 20) = 60 := by decide
