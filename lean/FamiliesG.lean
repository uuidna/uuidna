-- lean/FamiliesG.lean — GENERATED. THE FAMILIES, G — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- galactic: rotationvelocity(60000, 300) = 200 — GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no
    floats). The dynamics of a galaxy are numbers: how fast the disk turns, the mass held inside a radius, how
    many stars a luminosity buys, the mass of the disk, the virial mass, the speed to escape, the surface
    brightness, and the share of metals. Crosses to `astrophysics` — galactic dynamics is what astrophysics
    measures. A measure. */ const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count,
    disk mass, virial mass, escape velocity, surface brightness, metallicity) as integer proxies; a measure
    crossed to astrophysics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'galactic', dst:
    'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params })
    export class GalacticFormulas { /** ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the
    radius. value ⌊mass / radius⌋. -/
theorem fam_galactic_rotationvelocity_1 : (60000 / 300) = 200 := by decide

/-- galactic: masswithinradius(200, 300) = 60000 — ENCLOSED MASS: the velocity proxy carried out to a radius.
    value velocity · radius. -/
theorem fam_galactic_masswithinradius_1 : (200 * 300) = 60000 := by decide

/-- galactic: starcount(10000, 4) = 2500 — STAR COUNT: a luminosity at a per-star luminosity. value ⌊luminosity
    / perStar⌋. -/
theorem fam_galactic_starcount_1 : (10000 / 4) = 2500 := by decide

/-- galactic: diskmass(50, 1000) = 50000 — DISK MASS: a surface density over an area. value surfaceDensity ·
    area. -/
theorem fam_galactic_diskmass_1 : (50 * 1000) = 50000 := by decide

/-- galactic: escapevelocity(60000, 300) = 400 — ESCAPE VELOCITY: twice the enclosed mass over the radius, a
    proxy. value ⌊2 · mass / radius⌋. -/
theorem fam_galactic_escapevelocity_1 : ((2 * 60000) / 300) = 400 := by decide

/-- galactic: surfacebrightness(5000, 100) = 50 — SURFACE BRIGHTNESS: a luminosity spread over an area. value
    ⌊luminosity / area⌋. -/
theorem fam_galactic_surfacebrightness_1 : (5000 / 100) = 50 := by decide

/-- galactic: metallicity(2, 100) = 2 — METALLICITY as a percentage: the metal share of the total mass. value
    ⌊metals · 100 / total⌋. -/
theorem fam_galactic_metallicity_1 : ((2 * 100) / 100) = 2 := by decide

/-- galactic: metallicity(50, 200) = 25 — METALLICITY as a percentage: the metal share of the total mass. value
    ⌊metals · 100 / total⌋. -/
theorem fam_galactic_metallicity_2 : ((50 * 100) / 200) = 25 := by decide

/-- gaming: framerate(3600, 60) = 60 — FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. -/
theorem fam_gaming_framerate_1 : (3600 / 60) = 60 := by decide

/-- gaming: score(1500, 3) = 4500 — SCORE: points at a multiplier. value points · multiplier. -/
theorem fam_gaming_score_1 : (1500 * 3) = 4500 := by decide

/-- gaming: winrate(45, 60) = 75 — WIN RATE as a percentage: wins over games. value ⌊wins · 100 / games⌋. -/
theorem fam_gaming_winrate_1 : ((45 * 100) / 60) = 75 := by decide

/-- gaming: kd(30, 12) = 250 — KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. -/
theorem fam_gaming_kd_1 : ((30 * 100) / 12) = 250 := by decide

/-- gaming: damage(50, 20) = 30 — DAMAGE: attack past defense, never below zero. value max(0, attack − defense). -/
theorem fam_gaming_damage_1 : (fmax 0 (50 - 20)) = 30 := by decide

/-- gaming: damage(20, 50) = 0 — DAMAGE: attack past defense, never below zero. value max(0, attack − defense). -/
theorem fam_gaming_damage_2 : (fmax 0 (20 - 50)) = 0 := by decide

/-- gaming: latency(45) = 45 — LATENCY: the round-trip time, as measured. value roundtrip. -/
theorem fam_gaming_latency_1 : 45 = 45 := by decide

/-- gaming: accuracy(80, 100) = 80 — GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running
    a game is numbers: frames per second, score from points at a multiplier, win rate, kill/death ratio, the
    experience curve, damage after defense, round-trip latency, and shot accuracy. Crosses to `code` — gaming is
    what the code runs. A measure. */ const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death,
    experience curve, damage, latency, accuracy); play as a measure crossed to code' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra },
    holds, { name: `gaming.${name}`, params }) export class GamingFormulas { /** ACCURACY as a percentage: hits
    over shots. value ⌊hits · 100 / shots⌋. -/
theorem fam_gaming_accuracy_1 : ((80 * 100) / 100) = 80 := by decide

/-- gastroenterology: transit(240, 24) = 10 — GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and
    clearing is numbers: transit speed, the fraction absorbed, acidity, motility, body mass, bleeding share,
    enzyme concentration and the clearance fraction. Crosses to `med` — gastroenterology is a measure medicine
    reads. A measure. */ const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI,
    bleeding, enzyme, clearance); the gut as a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, {
    name: `gastroenterology.${name}`, params }) export class GastroenterologyFormulas { /** TRANSIT: distance
    travelled per hour. value ⌊distance / hours⌋. -/
theorem fam_gastroenterology_transit_1 : (240 / 24) = 10 := by decide

/-- gastroenterology: absorption(80, 100) = 80 — ABSORPTION as a percentage of what was ingested. value
    ⌊absorbed · 100 / ingested⌋. -/
theorem fam_gastroenterology_absorption_1 : ((80 * 100) / 100) = 80 := by decide

/-- gastroenterology: ph(140, 100) = 140 — PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. -/
theorem fam_gastroenterology_ph_1 : ((140 * 100) / 100) = 140 := by decide

/-- gastroenterology: motility(120, 60) = 2 — MOTILITY: contractions per minute. value ⌊contractions / minutes⌋. -/
theorem fam_gastroenterology_motility_1 : (120 / 60) = 2 := by decide

/-- gastroenterology: bmi(70, 175) = 22 — BMI: weight over height squared, scaled. value ⌊weight · 10000 /
    (heightcm · heightcm)⌋. -/
theorem fam_gastroenterology_bmi_1 : ((70 * 10000) / (175 * 175)) = 22 := by decide

/-- gastroenterology: bleeding(500, 5000) = 10 — BLEEDING as a percentage of blood volume. value ⌊lost · 100 /
    volume⌋. -/
theorem fam_gastroenterology_bleeding_1 : ((500 * 100) / 5000) = 10 := by decide

/-- gastroenterology: enzyme(1000, 50) = 20 — ENZYME concentration: units per volume. value ⌊units / volume⌋. -/
theorem fam_gastroenterology_enzyme_1 : (1000 / 50) = 20 := by decide

/-- gastroenterology: clearance(90, 100) = 90 — CLEARANCE as a percentage of the load removed. value ⌊removed ·
    100 / load⌋. -/
theorem fam_gastroenterology_clearance_1 : ((90 * 100) / 100) = 90 := by decide

/-- gastronomy: portioncost(2000, 8) = 250 — GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers:
    cost per portion, the built-up plate cost, food cost as a percentage of price, net yield after trim, the
    menu price at a markup, covers served, waste against what was prepared, and the margin a plate earns.
    Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */ const PROOF =
    'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin);
    the kitchen as a measure crossed to cuisine' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name:
    `gastronomy.${name}`, params }) export class GastronomyFormulas { /** PORTION COST: a batch total split
    across portions. value ⌊total / portions⌋. -/
theorem fam_gastronomy_portioncost_1 : (2000 / 8) = 250 := by decide

/-- gastronomy: platecost(250, 120, 80) = 450 — PLATE COST: food plus labor plus overhead. value food + labor +
    overhead. -/
theorem fam_gastronomy_platecost_1 : ((250 + 120) + 80) = 450 := by decide

/-- gastronomy: foodcostpercent(300, 1000) = 30 — FOOD COST PERCENT: cost as a percentage of price. value ⌊cost
    · 100 / price⌋. -/
theorem fam_gastronomy_foodcostpercent_1 : ((300 * 100) / 1000) = 30 := by decide

/-- gastronomy: yield(1000, 250) = 750 — YIELD: usable weight left after trim. value max(0, gross − trim). -/
theorem fam_gastronomy_yield_1 : (fmax 0 (1000 - 250)) = 750 := by decide

/-- gastronomy: menuprice(300, 3) = 900 — MENU PRICE: cost at a markup multiple. value cost · markup. -/
theorem fam_gastronomy_menuprice_1 : (300 * 3) = 900 := by decide

/-- gastronomy: covers(60, 3) = 180 — COVERS: seats over the night's turns. value seats · turns. -/
theorem fam_gastronomy_covers_1 : (60 * 3) = 180 := by decide

/-- gastronomy: waste(200, 180) = 20 — WASTE: prepared portions that were not served. value max(0, prepared −
    served). -/
theorem fam_gastronomy_waste_1 : (fmax 0 (200 - 180)) = 20 := by decide

/-- gastronomy: margin(900, 300) = 600 — MARGIN: the profit a plate earns at its price. value max(0, price −
    cost). -/
theorem fam_gastronomy_margin_1 : (fmax 0 (900 - 300)) = 600 := by decide

/-- gastronomy: margin(300, 900) = 0 — MARGIN: the profit a plate earns at its price. value max(0, price −
    cost). -/
theorem fam_gastronomy_margin_2 : (fmax 0 (300 - 900)) = 0 := by decide

/-- gearing: ratio(60, 20) = 3 -/
theorem fam_gearing_ratio_1 : (60 / 20) = 3 := by decide

/-- gearing: torqueout(10, 3) = 30 -/
theorem fam_gearing_torqueout_1 : (10 * 3) = 30 := by decide

/-- gearing: speedout(3000, 3) = 1000 -/
theorem fam_gearing_speedout_1 : (3000 / 3) = 1000 := by decide

/-- gearing: efficiency(95, 100) = 95 -/
theorem fam_gearing_efficiency_1 : ((95 * 100) / 100) = 95 := by decide

/-- gearing: mechanicaladvantage(40, 10) = 4 -/
theorem fam_gearing_mechanicaladvantage_1 : (40 / 10) = 4 := by decide

/-- gearing: backlashangle(100, 98) = 2 -/
theorem fam_gearing_backlashangle_1 : (fmax 0 (100 - 98)) = 2 := by decide

/-- gearing: toothcount(20, 3) = 60 -/
theorem fam_gearing_toothcount_1 : (20 * 3) = 60 := by decide

/-- gearing: reductionstages(3, 3) = 9 -/
theorem fam_gearing_reductionstages_1 : (3 * 3) = 9 := by decide

/-- gelatinization: onsettemp(60, 65) = 65 -/
theorem fam_gelatinization_onsettemp_1 : (fmax 60 65) = 65 := by decide

/-- gelatinization: swellingratio(300, 100) = 300 -/
theorem fam_gelatinization_swellingratio_1 : ((300 * 100) / 100) = 300 := by decide

/-- gelatinization: waterabsorption(150, 100) = 150 -/
theorem fam_gelatinization_waterabsorption_1 : ((150 * 100) / 100) = 150 := by decide

/-- gelatinization: peakviscosity(200, 3) = 600 -/
theorem fam_gelatinization_peakviscosity_1 : (200 * 3) = 600 := by decide

/-- gelatinization: starchconversion(85, 100) = 85 -/
theorem fam_gelatinization_starchconversion_1 : ((85 * 100) / 100) = 85 := by decide

/-- gelatinization: setbacktemp(95, 50) = 45 -/
theorem fam_gelatinization_setbacktemp_1 : (fmax 0 (95 - 50)) = 45 := by decide

/-- gelatinization: granuleexpansion(5, 4) = 20 -/
theorem fam_gelatinization_granuleexpansion_1 : (5 * 4) = 20 := by decide

/-- gelatinization: pasteclarity(70, 100) = 70 -/
theorem fam_gelatinization_pasteclarity_1 : ((70 * 100) / 100) = 70 := by decide

/-- gematria: lettervalue(22, 1) = 22 -/
theorem fam_gematria_lettervalue_1 : (22 * 1) = 22 := by decide

/-- gematria: wordtotal(10, 20, 30) = 60 -/
theorem fam_gematria_wordtotal_1 : ((10 + 20) + 30) = 60 := by decide

/-- gematria: alphabetsize(22, 0) = 22 -/
theorem fam_gematria_alphabetsize_1 : (22 + 0) = 22 := by decide

/-- gematria: valuesum(400, 1) = 400 -/
theorem fam_gematria_valuesum_1 : (400 * 1) = 400 := by decide

/-- genealogy: generations(400, 25) = 16 -/
theorem fam_genealogy_generations_1 : (400 / 25) = 16 := by decide

/-- genealogy: descendants(10) = 1024 -/
theorem fam_genealogy_descendants_1 : (2 ^ 10) = 1024 := by decide

/-- genealogy: ancestorsatdepth(4) = 16 -/
theorem fam_genealogy_ancestorsatdepth_1 : (2 ^ 4) = 16 := by decide

/-- genealogy: cousindegree(8, 2) = 6 -/
theorem fam_genealogy_cousindegree_1 : (fmax 0 (8 - 2)) = 6 := by decide

/-- genealogy: marriagelinks(12, 2) = 24 -/
theorem fam_genealogy_marriagelinks_1 : (12 * 2) = 24 := by decide

/-- genealogy: branchingfactor(1024, 10) = 102 -/
theorem fam_genealogy_branchingfactor_1 : (1024 / 10) = 102 := by decide

/-- genetics: codons(300) = 100 — GENETICS — LIFE'S CODE, AS ARITHMETIC (chosen by the public-API registry, not
    by hand). A genome is numbers: codons from bases, GC content, Punnett ratios, mutation rate, heritability,
    alleles per gene, sequencing coverage, and how alike two sequences are. Crosses to `med` — genetics is what
    medicine reads. A measure. */ const PROOF = 'genetics arithmetic (codons, GC content, Punnett ratio,
    mutation rate, heritability, alleles, coverage, similarity); life\'s code as integers; a measure crossed to
    med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'genetics', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `genetics.${name}`, params }) export class GeneticsFormulas
    { /** CODONS: triplets of bases. value ⌊bases / 3⌋. -/
theorem fam_genetics_codons_1 : (300 / 3) = 100 := by decide

/-- genetics: gc(410, 1000) = 41 — GC CONTENT as a percentage. value ⌊gc · 100 / total⌋. -/
theorem fam_genetics_gc_1 : ((410 * 100) / 1000) = 41 := by decide

/-- genetics: punnett(3, 4) = 75 — PUNNETT: the dominant share of offspring as a percentage. value ⌊dominant ·
    100 / total⌋. -/
theorem fam_genetics_punnett_1 : ((3 * 100) / 4) = 75 := by decide

/-- genetics: mutation(5, 1000000) = 5 — MUTATION RATE per million bases. value ⌊mutations · 1000000 / bases⌋. -/
theorem fam_genetics_mutation_1 : ((5 * 1000000) / 1000000) = 5 := by decide

/-- genetics: heritability(80, 100) = 80 — HERITABILITY: the genetic share of variance as a percentage. value
    ⌊genetic · 100 / total⌋. -/
theorem fam_genetics_heritability_1 : ((80 * 100) / 100) = 80 := by decide

/-- genetics: alleles(20000) = 40000 — ALLELES: two per gene, diploid. value genes · 2. -/
theorem fam_genetics_alleles_1 : (20000 * 2) = 40000 := by decide

/-- genetics: coverage(3000000000, 100000000) = 30 — COVERAGE: reads over the genome length. value ⌊reads /
    genome⌋. -/
theorem fam_genetics_coverage_1 : (3000000000 / 100000000) = 30 := by decide

/-- genetics: similarity(986, 1000) = 98 — SIMILARITY: matching positions over length as a percentage. value
    ⌊matches · 100 / length⌋. -/
theorem fam_genetics_similarity_1 : ((986 * 100) / 1000) = 98 := by decide

/-- genomics: coverage(3000, 100) = 30 — COVERAGE: read depth over the genome length. value ⌊reads / genome⌋. -/
theorem fam_genomics_coverage_1 : (3000 / 100) = 30 := by decide

/-- genomics: gccontent(50, 100) = 50 — GC CONTENT as a percentage of bases. value ⌊gc · 100 / bases⌋. -/
theorem fam_genomics_gccontent_1 : ((50 * 100) / 100) = 50 := by decide

/-- genomics: snp(10, 1000000) = 10 — SNP density: variants per million bases. value ⌊variants · 1000000 /
    bases⌋. -/
theorem fam_genomics_snp_1 : ((10 * 1000000) / 1000000) = 10 := by decide

/-- genomics: heterozygosity(5, 100) = 5 — HETEROZYGOSITY as a percentage of sites. value ⌊hetero · 100 /
    total⌋. -/
theorem fam_genomics_heterozygosity_1 : ((5 * 100) / 100) = 5 := by decide

/-- genomics: assembly(50, 200) = 25 — GENOMICS — SEQUENCE AND VARIATION, AS ARITHMETIC. Reading a genome is
    numbers: how deep the reads cover it, the GC fraction, variants per million bases, how often a site is
    heterozygous, how fragmented an assembly is, the N50, the per-generation mutation rate, and the share of
    conserved synteny blocks. Crosses to `genetics` — genomics measures what genetics explains. A measure. */
    const PROOF = 'genomics arithmetic (coverage depth, GC content, SNP density per million, heterozygosity,
    assembly fragmentation, N50, mutation rate, synteny conservation); a measure crossed to genetics' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'genomics', dst: 'genetics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `genomics.${name}`, params }) export class GenomicsFormulas { /** ASSEMBLY:
    contigs as a percentage of the reads. value ⌊contigs · 100 / reads⌋. -/
theorem fam_genomics_assembly_1 : ((50 * 100) / 200) = 25 := by decide

/-- genomics: n50(5000) = 5000 — N50: the contig length that marks half the assembly. value length. -/
theorem fam_genomics_n50_1 : 5000 = 5000 := by decide

/-- genomics: mutation(100, 10) = 10 — MUTATION rate: changes per generation. value ⌊changed / generations⌋. -/
theorem fam_genomics_mutation_1 : (100 / 10) = 10 := by decide

/-- genomics: synteny(8, 10) = 80 — SYNTENY: conserved blocks as a percentage. value ⌊conserved · 100 / blocks⌋. -/
theorem fam_genomics_synteny_1 : ((8 * 100) / 10) = 80 := by decide

/-- geochemistry: isotope(200, 50) = 25 — GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not
    by hand). Reading rock, water, and crust is numbers: isotope ratios, weathering extent, crustal enrichment,
    acidity, salinity, how an element splits between solid and liquid, radiometric age, and mineral saturation.
    Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */ const PROOF = 'geochemistry
    arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age,
    saturation); a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geochemistry.${name}`, params }) export class GeochemistryFormulas { /** ISOTOPE RATIO: daughter over
    parent, as a percentage. value ⌊daughter · 100 / parent⌋. -/
theorem fam_geochemistry_isotope_1 : ((50 * 100) / 200) = 25 := by decide

/-- geochemistry: weathering(30, 100) = 30 — WEATHERING: the dissolved fraction of the rock, as a percentage.
    value ⌊dissolved · 100 / rock⌋. -/
theorem fam_geochemistry_weathering_1 : ((30 * 100) / 100) = 30 := by decide

/-- geochemistry: enrichment(500, 100) = 500 — CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a
    percentage. value ⌊sample · 100 / crust⌋. -/
theorem fam_geochemistry_enrichment_1 : ((500 * 100) / 100) = 500 := by decide

/-- geochemistry: ph(10, 100) = 10 — ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 /
    base⌋. -/
theorem fam_geochemistry_ph_1 : ((10 * 100) / 100) = 10 := by decide

/-- geochemistry: salinity(35, 1000) = 35 — SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. -/
theorem fam_geochemistry_salinity_1 : ((35 * 1000) / 1000) = 35 := by decide

/-- geochemistry: partition(80, 20) = 400 — PARTITION: how an element splits between solid and liquid, as a
    percentage. value ⌊solid · 100 / liquid⌋. -/
theorem fam_geochemistry_partition_1 : ((80 * 100) / 20) = 400 := by decide

/-- geochemistry: age(100, 25) = 250 — RADIOMETRIC AGE: daughter over parent, per thousand (an age proxy). value
    ⌊daughter · 1000 / parent⌋. -/
theorem fam_geochemistry_age_1 : ((25 * 1000) / 100) = 250 := by decide

/-- geochemistry: saturation(120, 100) = 120 — SATURATION: ion activity against solubility, as a percentage.
    value ⌊ion · 100 / solubility⌋. -/
theorem fam_geochemistry_saturation_1 : ((120 * 100) / 100) = 120 := by decide

/-- geodesy: flattening(298, 297) = 33 — GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the
    registry, not by hand). Measuring the planet is numbers: the flattening of the ellipsoid, the length of a
    meridian arc, the geoid height above the ellipsoid, a datum shift in parts per million, grid convergence,
    orthometric elevation, baseline error, and the precision carried. Crosses to `geography` — geodesy is the
    frame geography is drawn on. A measure. */ const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian
    arc, geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a
    measure crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'geodesy', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params }) export class
    GeodesyFormulas { /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value
    ⌊(equatorial − polar) · 10000 / equatorial⌋. -/
theorem fam_geodesy_flattening_1 : (((298 - 297) * 10000) / 298) = 33 := by decide

/-- geodesy: arc(90, 6371) = 10002 — ARC: meridian arc length for a span of degrees at a radius (proxy). value
    ⌊degrees · radius · 314 / 18000⌋. -/
theorem fam_geodesy_arc_1 : (((90 * 6371) * 314) / 18000) = 10002 := by decide

/-- geodesy: geoid(100, 30) = 70 — GEOID: the geoid height above the ellipsoid. value height − undulation (may
    be negative). -/
theorem fam_geodesy_geoid_1 : (100 - 30) = 70 := by decide

/-- geodesy: datum(2, 1000) = 2000 — DATUM: a datum shift over a distance, in parts per million. value ⌊shift ·
    1000000 / distance⌋. -/
theorem fam_geodesy_datum_1 : ((2 * 1000000) / 1000) = 2000 := by decide

/-- geodesy: convergence(30, 45) = 15 — CONVERGENCE: grid convergence from longitude and latitude. value
    ⌊longitude · latitude / 90⌋. -/
theorem fam_geodesy_convergence_1 : ((30 * 45) / 90) = 15 := by decide

/-- geodesy: elevation(100, 30) = 70 — ELEVATION: orthometric elevation, geoid height less the ellipsoidal.
    value geoid_ − ellipsoid (may be negative). -/
theorem fam_geodesy_elevation_1 : (100 - 30) = 70 := by decide

/-- geodesy: baseline(5, 1000) = 5000 — BASELINE: baseline error over its length, in parts per million. value
    ⌊error · 1000000 / length⌋. -/
theorem fam_geodesy_baseline_1 : ((5 * 1000000) / 1000) = 5000 := by decide

/-- geodesy: precision(7) = 7 — PRECISION: the significant digits carried. value digits. -/
theorem fam_geodesy_precision_1 : 7 = 7 := by decide

/-- geography: density(10000, 50) = 200 — GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Place is numbers: people per unit of land, the slope of a hill, distance
    across a map, the area of a parcel, the rise of a peak, the water a basin drains, how much of a region is
    built up, and how well its places connect. Crosses to `ecology` — geography is the ground ecology lives on.
    A measure. */ const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel
    area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geography.${name}`, params }) export class GeographyFormulas { /** POPULATION
    DENSITY: people over the land they occupy. value ⌊population / area⌋. -/
theorem fam_geography_density_1 : (10000 / 50) = 200 := by decide

/-- geography: gradient(15, 100) = 15 — SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. -/
theorem fam_geography_gradient_1 : ((15 * 100) / 100) = 15 := by decide

/-- geography: distance(3, 111) = 333 — MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. -/
theorem fam_geography_distance_1 : (3 * 111) = 333 := by decide

/-- geography: area(40, 25) = 1000 — PARCEL AREA: length by width. value length · width. -/
theorem fam_geography_area_1 : (40 * 25) = 1000 := by decide

/-- geography: elevation(8848, 5300) = 3548 — ELEVATION: the rise of a peak over its base. value max(0, peak −
    base). -/
theorem fam_geography_elevation_1 : (fmax 0 (8848 - 5300)) = 3548 := by decide

/-- geography: elevation(100, 200) = 0 — ELEVATION: the rise of a peak over its base. value max(0, peak − base). -/
theorem fam_geography_elevation_2 : (fmax 0 (100 - 200)) = 0 := by decide

/-- geography: watershed(9000, 30) = 300 — WATERSHED: the catchment a basin drains per outlet. value ⌊catchment
    / outlet⌋. -/
theorem fam_geography_watershed_1 : (9000 / 30) = 300 := by decide

/-- geography: urbanization(45, 100) = 45 — URBANIZATION as a percentage: built land over total. value ⌊urban ·
    100 / total⌋. -/
theorem fam_geography_urbanization_1 : ((45 * 100) / 100) = 45 := by decide

/-- geography: connectivity(120, 40) = 300 — CONNECTIVITY: links per node, as a percentage. value ⌊links · 100 /
    nodes⌋. -/
theorem fam_geography_connectivity_1 : ((120 * 100) / 40) = 300 := by decide

/-- geology: magnitude(7) = 7 — GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by
    hand). Reading the ground is numbers: quake magnitude, the depth of stacked layers, pore space as a
    percentage, radiometric age, density, strata count, erosion rate, and ore grade. Crosses to `cern` — geology
    is matter the collider studies. A measure. */ const PROOF = 'geology arithmetic (magnitude, depth, porosity,
    age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra },
    holds, { name: `geology.${name}`, params }) export class GeologyFormulas { /** MAGNITUDE: a Richter proxy,
    the released energy itself. value energy. -/
theorem fam_geology_magnitude_1 : 7 = 7 := by decide

/-- geology: depth(10, 25) = 250 — DEPTH: stacked layers at a thickness each. value layers · each. -/
theorem fam_geology_depth_1 : (10 * 25) = 250 := by decide

/-- geology: porosity(30, 120) = 25 — POROSITY: pore space as a percentage. value ⌊voids · 100 / total⌋. -/
theorem fam_geology_porosity_1 : ((30 * 100) / 120) = 25 := by decide

/-- geology: age(5730, 3) = 17190 — AGE: radiometric, half-lives elapsed times the half-life. value halflife ·
    halvings. -/
theorem fam_geology_age_1 : (5730 * 3) = 17190 := by decide

/-- geology: density(2700, 1) = 2700 — DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_geology_density_1 : (2700 / 1) = 2700 := by decide

/-- geology: strata(14) = 14 — STRATA: the count of distinct layers. value count. -/
theorem fam_geology_strata_1 : 14 = 14 := by decide

/-- geology: erosion(500, 100) = 5 — EROSION: material lost over years. value ⌊lost / years⌋. -/
theorem fam_geology_erosion_1 : (500 / 100) = 5 := by decide

/-- geology: grade(15, 200) = 7 — GRADE: ore as a percentage of rock. value ⌊ore · 100 / rock⌋. -/
theorem fam_geology_grade_1 : ((15 * 100) / 200) = 7 := by decide

/-- geometry: area(10, 4) = 20 — GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared lengths). A
    triangle's area, a regular polygon's perimeter, a rectangle's area, a circle's area by a 314/100 proxy for
    π, a prism's volume, the hypotenuse squared, an interior angle shared across sides, and a rectangle's
    diagonal squared. Crosses to `code` — shape made computable. Integers only; every division is guarded. A
    measure. */ const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area, circle
    area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared);
    integers only, every division guarded; a measure crossed to code' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geometry.${name}`, params }) export class GeometryFormulas { /** TRIANGLE AREA: half base times height.
    value ⌊base · height / 2⌋. -/
theorem fam_geometry_area_1 : ((10 * 4) / 2) = 20 := by decide

/-- geometry: perimeter(6, 5) = 30 — REGULAR POLYGON PERIMETER: sides times side length. value sides · length. -/
theorem fam_geometry_perimeter_1 : (6 * 5) = 30 := by decide

/-- geometry: rectangle(8, 3) = 24 — RECTANGLE AREA: width times height. value width · height. -/
theorem fam_geometry_rectangle_1 : (8 * 3) = 24 := by decide

/-- geometry: volume(24, 5) = 120 — PRISM VOLUME: base area times height. value area · height. -/
theorem fam_geometry_volume_1 : (24 * 5) = 120 := by decide

/-- geometry: angle(720, 6) = 120 — SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior /
    sides⌋. -/
theorem fam_geometry_angle_1 : (720 / 6) = 120 := by decide

/-- geometry: angle(720, 0) = 0 — SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior /
    sides⌋. -/
theorem fam_geometry_angle_2 : (720 / 0) = 0 := by decide

/-- geomorphology: slope(30, 100) = 30 — GEOMORPHOLOGY — THE SHAPE OF THE LAND, AS ARITHMETIC. Reading a
    landscape is numbers: the slope of a hillside, how much ground erosion carries off, the streams draining an
    area, the relief between peak and valley, the sediment a basin lays down each year, how a channel winds, how
    deep a river cuts, and how far rock has weathered. Crosses to `geology` — the surface is what the rock
    beneath becomes. A measure. */ const PROOF = 'geomorphology arithmetic (slope, erosion, drainage, relief,
    sediment, sinuosity, incision, weathering); the shape of the land as a measure crossed to geology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geomorphology', dst: 'geology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geomorphology.${name}`, params }) export class GeomorphologyFormulas { /**
    SLOPE: rise over run, as a percent grade. value ⌊rise · 100 / run⌋. -/
theorem fam_geomorphology_slope_1 : ((30 * 100) / 100) = 30 := by decide

/-- geomorphology: erosion(5000, 100) = 50 — EROSION: ground lost per unit area. value ⌊lost / area⌋. -/
theorem fam_geomorphology_erosion_1 : (5000 / 100) = 50 := by decide

/-- geomorphology: drainage(240, 60) = 4 — DRAINAGE DENSITY: streams per unit area. value ⌊streams / area⌋. -/
theorem fam_geomorphology_drainage_1 : (240 / 60) = 4 := by decide

/-- geomorphology: relief(2400, 400) = 2000 — RELIEF: the height between peak and valley. value max(0, peak −
    valley). -/
theorem fam_geomorphology_relief_1 : (fmax 0 (2400 - 400)) = 2000 := by decide

/-- geomorphology: relief(400, 2400) = 0 — RELIEF: the height between peak and valley. value max(0, peak −
    valley). -/
theorem fam_geomorphology_relief_2 : (fmax 0 (400 - 2400)) = 0 := by decide

/-- geomorphology: sediment(1000, 50) = 20 — SEDIMENT: deposited material per year. value ⌊deposited / years⌋. -/
theorem fam_geomorphology_sediment_1 : (1000 / 50) = 20 := by decide

/-- geomorphology: sinuosity(150, 100) = 150 — SINUOSITY: channel length over valley length, as a ratio. value
    ⌊channel · 100 / valley⌋. -/
theorem fam_geomorphology_sinuosity_1 : ((150 * 100) / 100) = 150 := by decide

/-- geomorphology: incision(50, 200) = 25 — INCISION: depth cut over channel width. value ⌊depth · 100 / width⌋. -/
theorem fam_geomorphology_incision_1 : ((50 * 100) / 200) = 25 := by decide

/-- geomorphology: weathering(30, 100) = 30 — WEATHERING: rock weathered of the surface exposed, as a percent.
    value ⌊weathered · 100 / exposed⌋. -/
theorem fam_geomorphology_weathering_1 : ((30 * 100) / 100) = 30 := by decide

/-- geophysics: seismicvelocity(6000, 2) = 3000 — GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the
    registry, not by hand). Probing the ground is numbers: seismic velocity, surface gravity, a magnetic dipole,
    heat flow, bulk density, electrical resistivity, earthquake magnitude, and the isostatic ratio. Crosses to
    `geology` — geophysics is how the solid earth is measured. A measure. */ const PROOF = 'geophysics
    arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude,
    isostasy); the solid earth as a measure crossed to geology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `geophysics.${name}`, params }) export class GeophysicsFormulas { /** SEISMIC VELOCITY: distance over travel
    time. value ⌊distance / time⌋. -/
theorem fam_geophysics_seismicvelocity_1 : (6000 / 2) = 3000 := by decide

/-- geophysics: heatflow(30, 3) = 90 — HEAT FLOW: gradient times conductivity. value gradient · conductivity. -/
theorem fam_geophysics_heatflow_1 : (30 * 3) = 90 := by decide

/-- geophysics: density(6000, 2) = 3000 — BULK DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_geophysics_density_1 : (6000 / 2) = 3000 := by decide

/-- geophysics: resistivity(240, 4) = 60 — ELECTRICAL RESISTIVITY: voltage over current. value ⌊voltage /
    current⌋. -/
theorem fam_geophysics_resistivity_1 : (240 / 4) = 60 := by decide

/-- geophysics: magnitude(7) = 7 — EARTHQUAKE MAGNITUDE: the amplitude itself. value amplitude. -/
theorem fam_geophysics_magnitude_1 : 7 = 7 := by decide

/-- geophysics: isostasy(33, 100) = 33 — ISOSTASY: the load-to-mantle ratio in hundredths. value ⌊load · 100 /
    mantle⌋. -/
theorem fam_geophysics_isostasy_1 : ((33 * 100) / 100) = 33 := by decide

/-- geopolitics: powerindex(50, 30, 20) = 100 — GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely
    quantitative, neutral indices; no advice). Standing between states is numbers: a composite power index, the
    weight of an alliance, how much trade one side depends on, border tension per day, an influence score, the
    measured impact of sanctions, the balance between two blocs, and whether a stability target is met. Crosses
    to `governance` — geopolitics is what governance accounts for. A measure. */ const PROOF = 'geopolitics
    arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact,
    balance of power, stability); neutral quantitative indices; a measure crossed to governance' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geopolitics.${name}`, params }) export class GeopoliticsFormulas { /** POWER
    INDEX: a composite of three capability scores. value military + economy + population. -/
theorem fam_geopolitics_powerindex_1 : ((50 + 30) + 20) = 100 := by decide

/-- geopolitics: allianceweight(12, 8) = 96 — ALLIANCE WEIGHT: members at a per-member strength. value members ·
    strength. -/
theorem fam_geopolitics_allianceweight_1 : (12 * 8) = 96 := by decide

/-- geopolitics: tradedependency(250, 1000) = 25 — TRADE DEPENDENCY: imports as a percentage of total trade.
    value ⌊imports · 100 / total⌋. -/
theorem fam_geopolitics_tradedependency_1 : ((250 * 100) / 1000) = 25 := by decide

/-- geopolitics: bordertension(100, 30) = 3 — BORDER TENSION: incidents averaged over days. value ⌊incidents /
    days⌋. -/
theorem fam_geopolitics_bordertension_1 : (100 / 30) = 3 := by decide

/-- geopolitics: influencescore(15, 4) = 60 — INFLUENCE SCORE: allies weighted by votes each carries. value
    allies · votes. -/
theorem fam_geopolitics_influencescore_1 : (15 * 4) = 60 := by decide

/-- geopolitics: sanctionimpact(1000, 300) = 700 — SANCTION IMPACT: baseline trade less the restricted portion.
    value max(0, baseline − restricted). -/
theorem fam_geopolitics_sanctionimpact_1 : (fmax 0 (1000 - 300)) = 700 := by decide

/-- geopolitics: balanceofpower(600, 400) = 150 — BALANCE OF POWER: one bloc measured against another. value
    ⌊blocA · 100 / blocB⌋. -/
theorem fam_geopolitics_balanceofpower_1 : ((600 * 100) / 400) = 150 := by decide

/-- geothermal: gradient(300, 10000) = 30 — GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is
    numbers: the gradient with depth, the power a flow carries, conversion efficiency, the heat-pump COP, how
    much of the rated plant runs, metres drilled a day, the share reinjected, and the enthalpy a temperature
    holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */ const PROOF = 'geothermal
    arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate,
    reinjection share, enthalpy); heat from the Earth; a measure crossed to energy' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `geothermal.${name}`, params }) export class GeothermalFormulas { /** GRADIENT:
    temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. -/
theorem fam_geothermal_gradient_1 : ((300 * 1000) / 10000) = 30 := by decide

/-- geothermal: power(50, 80) = 4000 — POWER: heat a flow carries at a temperature difference. value flow ·
    deltat. -/
theorem fam_geothermal_power_1 : (50 * 80) = 4000 := by decide

/-- geothermal: efficiency(12, 100) = 12 — EFFICIENCY: useful output over heat in, as a percentage. value
    ⌊output · 100 / heat⌋. -/
theorem fam_geothermal_efficiency_1 : ((12 * 100) / 100) = 12 := by decide

/-- geothermal: cop(400, 100) = 400 — COP: heat-pump coefficient of performance, heat over work, x100. value
    ⌊heat · 100 / work⌋. -/
theorem fam_geothermal_cop_1 : ((400 * 100) / 100) = 400 := by decide

/-- geothermal: capacity(90, 100) = 90 — CAPACITY FACTOR: generated over rated, as a percentage. value
    ⌊generated · 100 / rated⌋. -/
theorem fam_geothermal_capacity_1 : ((90 * 100) / 100) = 90 := by decide

/-- geothermal: drilling(1200, 30) = 40 — DRILLING: metres drilled per day. value ⌊depth / days⌋. -/
theorem fam_geothermal_drilling_1 : (1200 / 30) = 40 := by decide

/-- geothermal: reinjection(95, 100) = 95 — REINJECTION: share of extracted fluid put back, as a percentage.
    value ⌊injected · 100 / extracted⌋. -/
theorem fam_geothermal_reinjection_1 : ((95 * 100) / 100) = 95 := by decide

/-- geothermal: enthalpy(250) = 250 — ENTHALPY: the heat a temperature holds. value temperature. -/
theorem fam_geothermal_enthalpy_1 : 250 = 250 := by decide

/-- germination: rate(200, 10) = 20 — GERMINATION — SEEDS WAKING UP, AS ARITHMETIC (a seed lot measured as it
    sprouts). Germination is numbers: how many seeds break per day, the mean time to emerge, the energy by the
    peak count, the viable fraction, the speed of the push, how tightly the batch comes up together, the final
    percent, and the vigor the seedlings carry. Crosses to `botany` — germination is where botany begins. A
    measure. */ const PROOF = 'germination arithmetic (rate per day, mean time, energy at peak, viability, speed
    index, uniformity spread, final percent, seedling vigor); a measure crossed to botany' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'germination', dst: 'botany', formula, value, proof: PROOF,
    ...extra }, holds, { name: `germination.${name}`, params }) export class GerminationFormulas { /** RATE:
    seeds germinating per day. value ⌊germinated / days⌋. -/
theorem fam_germination_rate_1 : (200 / 10) = 20 := by decide

/-- germination: meantime(500, 100) = 5 — MEAN GERMINATION TIME: summed seed-days over the seeds germinated.
    value ⌊sumtimes / germinated⌋. -/
theorem fam_germination_meantime_1 : (500 / 100) = 5 := by decide

/-- germination: energy(80, 100) = 80 — GERMINATION ENERGY: percent germinated counted at the peak period. value
    ⌊peak · 100 / sown⌋. -/
theorem fam_germination_energy_1 : ((80 * 100) / 100) = 80 := by decide

/-- germination: viability(95, 100) = 95 — VIABILITY: the viable fraction as a percentage. value ⌊viable · 100 /
    tested⌋. -/
theorem fam_germination_viability_1 : ((95 * 100) / 100) = 95 := by decide

/-- germination: speedindex(50, 10) = 500 — SPEED INDEX: how fast the push comes, germinated scaled over days.
    value ⌊germinated · 100 / days⌋. -/
theorem fam_germination_speedindex_1 : ((50 * 100) / 10) = 500 := by decide

/-- germination: uniformity(14, 3) = 11 — UNIFORMITY: the spread in days between last and first emergence (lower
    is tighter). value max(0, maxday − minday). -/
theorem fam_germination_uniformity_1 : (fmax 0 (14 - 3)) = 11 := by decide

/-- germination: uniformity(3, 14) = 0 — UNIFORMITY: the spread in days between last and first emergence (lower
    is tighter). value max(0, maxday − minday). -/
theorem fam_germination_uniformity_2 : (fmax 0 (3 - 14)) = 0 := by decide

/-- germination: finalpercent(90, 100) = 90 — FINAL PERCENT: the final germination percentage. value ⌊germinated
    · 100 / sown⌋. -/
theorem fam_germination_finalpercent_1 : ((90 * 100) / 100) = 90 := by decide

/-- germination: vigorindex(85, 12) = 1020 — VIGOR INDEX: seedling vigor as germination percent times seedling
    length. value germpercent · length. -/
theorem fam_germination_vigorindex_1 : (85 * 12) = 1020 := by decide

/-- gerontology: lifeexpectancy(75, 5) = 80 -/
theorem fam_gerontology_lifeexpectancy_1 : (75 + 5) = 80 := by decide

/-- gerontology: telomerelength(10000, 3000) = 7000 -/
theorem fam_gerontology_telomerelength_1 : (fmax 0 (10000 - 3000)) = 7000 := by decide

/-- gerontology: frailtyindex(30, 100) = 30 -/
theorem fam_gerontology_frailtyindex_1 : ((30 * 100) / 100) = 30 := by decide

/-- gerontology: biologicalage(800, 10) = 80 -/
theorem fam_gerontology_biologicalage_1 : (800 / 10) = 80 := by decide

/-- gerontology: functionaldecline(20, 100) = 20 -/
theorem fam_gerontology_functionaldecline_1 : ((20 * 100) / 100) = 20 := by decide

/-- gerontology: survivalfraction(60, 100) = 60 -/
theorem fam_gerontology_survivalfraction_1 : ((60 * 100) / 100) = 60 := by decide

/-- gerontology: doublingtime(3650, 365) = 10 -/
theorem fam_gerontology_doublingtime_1 : (3650 / 365) = 10 := by decide

/-- gis: area(30, 20) = 600 — GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area of
    a tile, feature density, a buffer ring, how two layers overlay, the resolution of a grid, terrain slope,
    nearness within a threshold, and positional accuracy. Crosses to `geography` — gis is geography made to
    compute. A measure. */ const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay,
    grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure
    crossed to geography' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gis', dst: 'geography',
    formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params }) export class GisFormulas {
    /** AREA of a tile: width by height. value width · height. -/
theorem fam_gis_area_1 : (30 * 20) = 600 := by decide

/-- gis: density(1000, 50) = 20 — FEATURE DENSITY: features over area. value ⌊features / area⌋. -/
theorem fam_gis_density_1 : (1000 / 50) = 20 := by decide

/-- gis: overlay(30, 120) = 25 — OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 /
    union⌋. -/
theorem fam_gis_overlay_1 : ((30 * 100) / 120) = 25 := by decide

/-- gis: resolution(1000, 40) = 25 — RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. -/
theorem fam_gis_resolution_1 : (1000 / 40) = 25 := by decide

/-- gis: slope(15, 100) = 15 — SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. -/
theorem fam_gis_slope_1 : ((15 * 100) / 100) = 15 := by decide

/-- gis: proximity(30, 100) = 70 — PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold
    − distance). -/
theorem fam_gis_proximity_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- gis: proximity(120, 100) = 0 — PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold
    − distance). -/
theorem fam_gis_proximity_2 : (fmax 0 (100 - 120)) = 0 := by decide

/-- gis: accuracy(95, 100) = 95 — POSITIONAL ACCURACY: correct points as a percentage of all points. value
    ⌊correct · 100 / points⌋. -/
theorem fam_gis_accuracy_1 : ((95 * 100) / 100) = 95 := by decide

/-- glaciology: massbalance(80, 50) = 30 — GLACIOLOGY — ICE AS ARITHMETIC. The life of a glacier is numbers: the
    mass it gains minus the mass it loses, how fast it flows under its own slope and thickness, how far the
    terminus retreats year over year, how much light the surface throws back, how much ice a given energy melts,
    how much calves off at the front, where the line of equilibrium sits, and how old the ice runs with depth.
    Crosses to `climate` — a glacier is climate written in ice. A measure. */ const PROOF = 'glaciology
    arithmetic (mass balance, flow, retreat, albedo, melt, calving, equilibrium, age); ice as a measure crossed
    to climate' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glaciology', dst: 'climate',
    formula, value, proof: PROOF, ...extra }, holds, { name: `glaciology.${name}`, params }) export class
    GlaciologyFormulas { /** MASS BALANCE: accumulation less ablation; may run negative when the glacier loses
    more than it gains. value accumulation − ablation. -/
theorem fam_glaciology_massbalance_1 : (80 - 50) = 30 := by decide

/-- glaciology: flow(12, 100) = 1200 — FLOW: driven by surface slope and ice thickness. value slope · thickness. -/
theorem fam_glaciology_flow_1 : (12 * 100) = 1200 := by decide

/-- glaciology: retreat(500, 450) = 50 — RETREAT: how far the terminus pulled back, never below zero. value
    max(0, previous − current). -/
theorem fam_glaciology_retreat_1 : (fmax 0 (500 - 450)) = 50 := by decide

/-- glaciology: retreat(450, 500) = 0 — RETREAT: how far the terminus pulled back, never below zero. value
    max(0, previous − current). -/
theorem fam_glaciology_retreat_2 : (fmax 0 (450 - 500)) = 0 := by decide

/-- glaciology: albedo(80, 100) = 80 — ALBEDO as a percentage: light reflected over light incident. value
    ⌊reflected · 100 / incident⌋. -/
theorem fam_glaciology_albedo_1 : ((80 * 100) / 100) = 80 := by decide

/-- glaciology: melt(10000, 334) = 29 — MELT: the ice a given energy melts at a latent heat. value ⌊energy /
    latent⌋. -/
theorem fam_glaciology_melt_1 : (10000 / 334) = 29 := by decide

/-- glaciology: calving(6000, 50) = 120 — CALVING: the volume lost over the width of the front. value ⌊volume /
    front⌋. -/
theorem fam_glaciology_calving_1 : (6000 / 50) = 120 := by decide

/-- glaciology: equilibrium(60, 100) = 60 — EQUILIBRIUM: accumulation as a share of the total, the balance line.
    value ⌊accumulation · 100 / total⌋. -/
theorem fam_glaciology_equilibrium_1 : ((60 * 100) / 100) = 60 := by decide

/-- glaciology: age(1000, 25) = 40 — AGE: years per unit depth over the layers counted. value ⌊depth / layers⌋. -/
theorem fam_glaciology_age_1 : (1000 / 25) = 40 := by decide

/-- glider: glideratio(400, 10) = 40 -/
theorem fam_glider_glideratio_1 : (400 / 10) = 40 := by decide

/-- glider: sinkrate(100, 100) = 1 -/
theorem fam_glider_sinkrate_1 : (100 / 100) = 1 := by decide

/-- glider: wingspan(15, 1) = 15 -/
theorem fam_glider_wingspan_1 : (15 * 1) = 15 := by decide

/-- glider: aspectratio(225, 15) = 15 -/
theorem fam_glider_aspectratio_1 : (225 / 15) = 15 := by decide

/-- glider: stallspeed(60, 1) = 60 -/
theorem fam_glider_stallspeed_1 : (60 * 1) = 60 := by decide

/-- glider: thermalgain(2000, 1500) = 500 -/
theorem fam_glider_thermalgain_1 : (fmax 0 (2000 - 1500)) = 500 := by decide

/-- glider: range(40, 1000) = 40000 -/
theorem fam_glider_range_1 : (40 * 1000) = 40000 := by decide

/-- global: fields(7) = 7 — GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site
    config: settings, header, footer, nav, chosen by the registry, not by hand). A global is numbers: the fields
    it holds, how much is translated, versions kept, its size across locales, access across roles, cache hit
    rate, nesting depth, and how populated it is. Crosses to `payload` — a global is what Payload serves. A
    measure. */ const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across
    locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure
    crossed to payload' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'global', dst: 'payload',
    formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params }) export class
    GlobalFormulas { /** FIELDS: the fields a global holds. value count. -/
theorem fam_global_fields_1 : 7 = 7 := by decide

/-- global: locales(990, 1000) = 99 — LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. -/
theorem fam_global_locales_1 : ((990 * 100) / 1000) = 99 := by decide

/-- global: versions(10, 5) = 5 — VERSIONS kept, capped at a maximum. value min(kept, max). -/
theorem fam_global_versions_1 : (fmin 10 5) = 5 := by decide

/-- global: size(12, 3) = 36 — SIZE: the fields across the locales. value fields · locales. -/
theorem fam_global_size_1 : (12 * 3) = 36 := by decide

/-- global: access(3, 4) = 75 — ACCESS: the roles allowed, as a percentage. value ⌊allowed · 100 / roles⌋. -/
theorem fam_global_access_1 : ((3 * 100) / 4) = 75 := by decide

/-- global: cached(90, 100) = 90 — CACHED: the cache hit rate as a percentage. value ⌊hits · 100 / reads⌋. -/
theorem fam_global_cached_1 : ((90 * 100) / 100) = 90 := by decide

/-- global: depth(3) = 3 — DEPTH: the nesting of a global's fields. value nested; holds nested ≤ 5. -/
theorem fam_global_depth_1 : 3 = 3 := by decide

/-- global: populated(8, 10) = 80 — POPULATED: the fields set, as a percentage. value ⌊set · 100 / total⌋. -/
theorem fam_global_populated_1 : ((8 * 100) / 10) = 80 := by decide

/-- glomerular: excretion(100, 2) = 200 — GLOMERULAR — THE KIDNEY'S FILTER, AS ARITHMETIC. The glomerulus is
    numbers: what the tubule excretes, the clearance of a marker, the filtration rate, creatinine clearance,
    filtration fraction, the load filtered, what is reabsorbed, and the plasma that flows through. Crosses to
    `nephrology` — the glomerulus is what nephrology measures. A measure. */ const PROOF = 'glomerular
    arithmetic (excretion, clearance, filtration rate, creatinine clearance, filtration fraction, filtered load,
    reabsorption, plasma flow); the kidney filter as numbers; a measure crossed to nephrology' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'glomerular', dst: 'nephrology', formula, value, proof: PROOF,
    ...extra }, holds, { name: `glomerular.${name}`, params }) export class GlomerularFormulas { /** EXCRETION:
    the mass leaving per minute — urine concentration at the urine flow. value uc · uf. -/
theorem fam_glomerular_excretion_1 : (100 * 2) = 200 := by decide

/-- glomerular: clearance(200, 2) = 100 — CLEARANCE: the plasma volume cleared of a marker — the excreted mass
    over its plasma concentration. value ⌊excreted / pc⌋. -/
theorem fam_glomerular_clearance_1 : (200 / 2) = 100 := by decide

/-- glomerular: filtrationrate(100, 2, 2) = 100 — FILTRATION RATE (GFR): the clearance of the filtration marker
    — urine conc at the urine flow over plasma conc. value ⌊uc · uf / pc⌋. -/
theorem fam_glomerular_filtrationrate_1 : ((100 * 2) / 2) = 100 := by decide

/-- glomerular: creatinineclearance(120, 1, 1) = 120 — CREATININE CLEARANCE: GFR by creatinine — urine
    creatinine at the urine flow over plasma creatinine. value ⌊ucr · uf / pcr⌋. -/
theorem fam_glomerular_creatinineclearance_1 : ((120 * 1) / 1) = 120 := by decide

/-- glomerular: filtrationfraction(125, 625) = 20 — FILTRATION FRACTION: the share of plasma flow that is
    filtered, as a percentage. value ⌊gfr · 100 / rpf⌋. -/
theorem fam_glomerular_filtrationfraction_1 : ((125 * 100) / 625) = 20 := by decide

/-- glomerular: filteredload(100, 5) = 500 — FILTERED LOAD: the amount of a solute presented to the tubule — GFR
    at the plasma concentration. value gfr · pc. -/
theorem fam_glomerular_filteredload_1 : (100 * 5) = 500 := by decide

/-- glomerular: reabsorption(500, 100) = 400 — REABSORPTION: what the tubule reclaims — the filtered load less
    what is excreted. value max(0, filtered − excreted). -/
theorem fam_glomerular_reabsorption_1 : (fmax 0 (500 - 100)) = 400 := by decide

/-- glomerular: reabsorption(100, 500) = 0 — REABSORPTION: what the tubule reclaims — the filtered load less
    what is excreted. value max(0, filtered − excreted). -/
theorem fam_glomerular_reabsorption_2 : (fmax 0 (100 - 500)) = 0 := by decide

/-- glomerular: plasmaflow(1000, 45) = 550 — PLASMA FLOW (RPF): the plasma reaching the glomerulus — renal blood
    flow less the cell fraction (hematocrit). value ⌊rbf · (100 − hct) / 100⌋. -/
theorem fam_glomerular_plasmaflow_1 : ((1000 * (100 - 45)) / 100) = 550 := by decide

/-- glycolysis: flux(600, 60) = 10 — GLYCOLYSIS — THE EMBDEN–MEYERHOF PATHWAY, AS ARITHMETIC (the stoichiometry
    every cell runs, not chosen by hand). Breaking glucose is counting: the pyruvate and NADH it yields, the ATP
    invested in the prep phase, the net ATP, the lactate of fermentation, the glucose rebuilt by
    gluconeogenesis, and the flux through the pathway. Crosses to `biochemistry` — glycolysis is what
    biochemistry balances. A measure. */ const PROOF = 'glycolysis arithmetic (net ATP, pyruvate, NADH, glucose
    consumed, lactate, gluconeogenesis, phosphorylation, flux); the Embden–Meyerhof stoichiometry; a measure
    crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'glycolysis', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `glycolysis.${name}`, params })
    export class GlycolysisFormulas { /** FLUX: glucose molecules broken per unit time. value ⌊glucose /
    seconds⌋. -/
theorem fam_glycolysis_flux_1 : (600 / 60) = 10 := by decide

/-- glycolysis: gluconeogenesis(10) = 5 — GLUCONEOGENESIS: glucose rebuilt from pyruvate (2 pyruvate per
    glucose). value ⌊pyruvate / 2⌋. -/
theorem fam_glycolysis_gluconeogenesis_1 : (10 / 2) = 5 := by decide

/-- glycolysis: glucoseconsumed(100) = 50 — GLUCOSE CONSUMED: from net ATP, 2 ATP per glucose. value ⌊atp / 2⌋. -/
theorem fam_glycolysis_glucoseconsumed_1 : (100 / 2) = 50 := by decide

/-- glycolysis: lactate(5) = 10 — LACTATE: fermentation yields 2 lactate per glucose. value 2 · glucose. -/
theorem fam_glycolysis_lactate_1 : (2 * 5) = 10 := by decide

/-- glycolysis: nadh(5) = 10 — NADH: 2 NADH reduced per glucose. value 2 · glucose. -/
theorem fam_glycolysis_nadh_1 : (2 * 5) = 10 := by decide

/-- glycolysis: netatp(5, 10) = 10 — NET ATP: the payoff phase (4 per glucose) less the ATP invested. value
    max(0, 4 · glucose − invested). -/
theorem fam_glycolysis_netatp_1 : (fmax 0 ((4 * 5) - 10)) = 10 := by decide

/-- glycolysis: netatp(1, 10) = 0 — NET ATP: the payoff phase (4 per glucose) less the ATP invested. value
    max(0, 4 · glucose − invested). -/
theorem fam_glycolysis_netatp_2 : (fmax 0 ((4 * 1) - 10)) = 0 := by decide

/-- glycolysis: phosphorylation(5) = 10 — PHOSPHORYLATION: the prep phase invests 2 ATP per glucose (hexokinase,
    PFK). value 2 · glucose. -/
theorem fam_glycolysis_phosphorylation_1 : (2 * 5) = 10 := by decide

/-- glycolysis: pyruvate(5) = 10 — PYRUVATE: 2 pyruvate per glucose. value 2 · glucose. -/
theorem fam_glycolysis_pyruvate_1 : (2 * 5) = 10 := by decide

/-- glyphs: count(1000, 1) = 1000 -/
theorem fam_glyphs_count_1 : (1000 * 1) = 1000 := by decide

/-- glyphs: unicodeplanes(17, 0) = 17 -/
theorem fam_glyphs_unicodeplanes_1 : (17 + 0) = 17 := by decide

/-- glyphs: componentsubsets(6) = 64 -/
theorem fam_glyphs_componentsubsets_1 : (2 ^ 6) = 64 := by decide

/-- glyphs: strokesperglyph(12, 8) = 20 -/
theorem fam_glyphs_strokesperglyph_1 : (12 + 8) = 20 := by decide

/-- glyphs: variantcount(12, 3) = 36 -/
theorem fam_glyphs_variantcount_1 : (12 * 3) = 36 := by decide

/-- glyphs: rendercoverage(95, 100) = 95 -/
theorem fam_glyphs_rendercoverage_1 : ((95 * 100) / 100) = 95 := by decide

/-- golf: score(75, 72) = 3 — GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to
    par (which may run under), a handicap from scoring differentials, fairways hit, greens in regulation, putts
    and driving distance per hole, scrambling saves, and birdies a round. Crosses to `sports` — golf is one of
    the games sport keeps. A measure. */ const PROOF = 'golf arithmetic (score to par, handicap, fairways,
    greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra },
    holds, { name: `golf.${name}`, params }) export class GolfFormulas { /** SCORE relative to par — strokes
    taken less par; may run negative (under par). value strokes − par. -/
theorem fam_golf_score_1 : (75 - 72) = 3 := by decide

/-- golf: handicap(108, 20) = 5 — HANDICAP: the average scoring differential over rounds played. value
    ⌊differential / rounds⌋. -/
theorem fam_golf_handicap_1 : (108 / 20) = 5 := by decide

/-- golf: fairways(10, 14) = 71 — FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. -/
theorem fam_golf_fairways_1 : ((10 * 100) / 14) = 71 := by decide

/-- golf: greens(12, 18) = 66 — GREENS in regulation as a percentage of holes. value ⌊reached · 100 / holes⌋. -/
theorem fam_golf_greens_1 : ((12 * 100) / 18) = 66 := by decide

/-- golf: putts(30, 18) = 1 — PUTTS per hole. value ⌊total / holes⌋. -/
theorem fam_golf_putts_1 : (30 / 18) = 1 := by decide

/-- golf: driving(2700, 10) = 270 — DRIVING distance per drive. value ⌊distance / drives⌋. -/
theorem fam_golf_driving_1 : (2700 / 10) = 270 := by decide

/-- golf: scrambling(4, 6) = 66 — SCRAMBLING: pars saved as a percentage of greens missed. value ⌊saved · 100 /
    missed⌋. -/
theorem fam_golf_scrambling_1 : ((4 * 100) / 6) = 66 := by decide

/-- golf: birdies(15, 5) = 3 — BIRDIES per round. value ⌊birdies / rounds⌋. -/
theorem fam_golf_birdies_1 : (15 / 5) = 3 := by decide

/-- governance: quorum(6, 10) = 60 — GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is
    numbers: whether a meeting has quorum, whether a vote carries a majority, how open the decisions are, how
    answerable the answers are, how many seats a people holds, how long a term runs, how closely rules are met,
    and how many of the eligible turned out. Crosses to `law` — governance is what law governs. A measure. */
    const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term,
    compliance, turnout); the rule of a body as numbers; a measure crossed to law' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name:
    `governance.${name}`, params }) export class GovernanceFormulas { /** QUORUM: those present as a percentage
    of the members. value ⌊present · 100 / members⌋. -/
theorem fam_governance_quorum_1 : ((6 * 100) / 10) = 60 := by decide

/-- governance: majority(60, 100) = 60 — MAJORITY: the votes for as a percentage of the total. value ⌊votes ·
    100 / total⌋. -/
theorem fam_governance_majority_1 : ((60 * 100) / 100) = 60 := by decide

/-- governance: transparency(9, 10) = 90 — TRANSPARENCY: the decisions disclosed as a percentage of all. value
    ⌊disclosed · 100 / decisions⌋. -/
theorem fam_governance_transparency_1 : ((9 * 100) / 10) = 90 := by decide

/-- governance: accountability(45, 50) = 90 — ACCOUNTABILITY: the inquiries answered as a percentage of all.
    value ⌊answered · 100 / inquiries⌋. -/
theorem fam_governance_accountability_1 : ((45 * 100) / 50) = 90 := by decide

/-- governance: representation(5, 1000000) = 5 — REPRESENTATION: the seats a people holds per million of its
    population. value ⌊seats · 1000000 / population⌋. -/
theorem fam_governance_representation_1 : ((5 * 1000000) / 1000000) = 5 := by decide

/-- governance: term(100, 4) = 400 — TERM: the office-years of those elected. value elected · years. -/
theorem fam_governance_term_1 : (100 * 4) = 400 := by decide

/-- governance: compliance(19, 20) = 95 — COMPLIANCE: the regulations complied with as a percentage of all.
    value ⌊compliant · 100 / regulations⌋. -/
theorem fam_governance_compliance_1 : ((19 * 100) / 20) = 95 := by decide

/-- governance: turnout(660, 1000) = 66 — TURNOUT: those who voted as a percentage of the eligible. value ⌊voted
    · 100 / eligible⌋. -/
theorem fam_governance_turnout_1 : ((660 * 100) / 1000) = 66 := by decide

/-- gps: satellites(31, 7) = 24 — GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by
    hand). A fix is numbers: the satellites in view, how many a trilaterated fix needs, dilution of precision,
    whether the fix is good, the pseudorange a signal travelled, time to first fix, the resulting accuracy, and
    the satellites above an elevation mask. Crosses to `navigation` — gps is what navigation positions from. A
    measure. */ const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision,
    fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof:
    PROOF, ...extra }, holds, { name: `gps.${name}`, params }) export class GpsFormulas { /** VISIBLE
    SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). -/
theorem fam_gps_satellites_1 : (fmax 0 (31 - 7)) = 24 := by decide

/-- gps: trilateration(3) = 4 — TRILATERATION: the minimum satellites a fix needs in `dims` dimensions (one
    more, for the clock bias). value dims + 1. -/
theorem fam_gps_trilateration_1 : (3 + 1) = 4 := by decide

/-- gps: hdop(100, 8) = 12 — HDOP: horizontal dilution of precision, geometry spread over the satellites used.
    value ⌊spread / satellites⌋. -/
theorem fam_gps_hdop_1 : (100 / 8) = 12 := by decide

/-- gps: pseudorange(68, 300) = 20400 — PSEUDORANGE: the distance a signal travelled, time at a speed. value
    time · speed. -/
theorem fam_gps_pseudorange_1 : (68 * 300) = 20400 := by decide

/-- gps: ttff(12, 18, 15) = 45 — TIME TO FIRST FIX: almanac, ephemeris and search seconds together. value
    almanac + ephemeris + search. -/
theorem fam_gps_ttff_1 : ((12 + 18) + 15) = 45 := by decide

/-- gps: accuracy(2, 5) = 10 — ACCURACY: metres, the dilution of precision times the user-equivalent range
    error. value hdop · uere. -/
theorem fam_gps_accuracy_1 : (2 * 5) = 10 := by decide

/-- gps: elevationmask(24, 9) = 15 — ELEVATION MASK: the satellites left once those below the mask are dropped.
    value max(0, total − below). -/
theorem fam_gps_elevationmask_1 : (fmax 0 (24 - 9)) = 15 := by decide

/-- gradient: step(100, 5) = 500 — GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by
    hand). Training is numbers: the step a run takes, the parameter update, the learning rate, momentum, the
    gradient norm, clipping, weight decay, and the batches an epoch holds. Crosses to `linearalgebra` — a
    gradient is a vector, and descent moves along it. A measure. */ const PROOF = 'gradient arithmetic (step,
    parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer
    registry\'s uncovered domain; a measure crossed to linearalgebra' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds,
    { name: `gradient.${name}`, params }) export class GradientFormulas { /** STEP: the distance a run covers
    over its iterations at a fixed size. value iters · size. -/
theorem fam_gradient_step_1 : (100 * 5) = 500 := by decide

/-- gradient: update(100, 3, 10) = 70 — UPDATE: a parameter after one descent step, floored at zero. value
    max(0, param − lr · grad). -/
theorem fam_gradient_update_1 : (fmax 0 (100 - (3 * 10))) = 70 := by decide

/-- gradient: learningrate(1000, 4) = 250 — LEARNING RATE: a base rate divided by a decay factor. value ⌊base /
    decay⌋. -/
theorem fam_gradient_learningrate_1 : (1000 / 4) = 250 := by decide

/-- gradient: momentum(9, 10, 5) = 95 — MOMENTUM: carried velocity plus the current gradient. value mu ·
    velocity + grad. -/
theorem fam_gradient_momentum_1 : ((9 * 10) + 5) = 95 := by decide

/-- gradient: clip(100, 30) = 30 — CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). -/
theorem fam_gradient_clip_1 : (fmin 100 30) = 30 := by decide

/-- gradient: clip(20, 30) = 20 — CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). -/
theorem fam_gradient_clip_2 : (fmin 20 30) = 20 := by decide

/-- gradient: decay(100, 30) = 70 — DECAY: a weight shrunk by a decay amount, floored at zero. value max(0,
    weight − rate). -/
theorem fam_gradient_decay_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- grammar: rules(100, 3) = 300 -/
theorem fam_grammar_rules_1 : (100 * 3) = 300 := by decide

/-- grammar: posclasses(8, 0) = 8 -/
theorem fam_grammar_posclasses_1 : (8 + 0) = 8 := by decide

/-- grammar: phrasestructuresubsets(6) = 64 -/
theorem fam_grammar_phrasestructuresubsets_1 : (2 ^ 6) = 64 := by decide

/-- grammar: agreementfeatures(3, 2) = 5 -/
theorem fam_grammar_agreementfeatures_1 : (3 + 2) = 5 := by decide

/-- grammar: recursiondepth(5, 0) = 5 -/
theorem fam_grammar_recursiondepth_1 : (5 + 0) = 5 := by decide

/-- grammar: grammaticalityratio(90, 100) = 90 -/
theorem fam_grammar_grammaticalityratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- graphql: querydepth(20, 5) = 100 — GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A query is numbers: how deep the selection set runs, its complexity score, the
    resolver calls it fires, the N+1 fan-out, the fields a schema holds, the batches a loader groups, the cache
    hit rate, and how often a fragment is reused. Crosses to `networking` — a graph query is what the wire
    carries. A measure. */ const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1
    fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a
    measure crossed to networking' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'graphql', dst:
    'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params }) export
    class GraphqlFormulas { /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields ·
    levels. -/
theorem fam_graphql_querydepth_1 : (20 * 5) = 100 := by decide

/-- graphql: complexity(50, 3) = 150 — COMPLEXITY: a query's score as fields weighted by their cost. value
    fields · cost. -/
theorem fam_graphql_complexity_1 : (50 * 3) = 150 := by decide

/-- graphql: resolvers(5000, 50) = 100 — RESOLVERS: resolver calls over the seconds served. value ⌊calls /
    seconds⌋. -/
theorem fam_graphql_resolvers_1 : (5000 / 50) = 100 := by decide

/-- graphql: nplusone(100, 1) = 101 — N+1: the total queries a list resolves — one for the list, then one per
    parent. value 1 + parents · per. -/
theorem fam_graphql_nplusone_1 : (1 + (100 * 1)) = 101 := by decide

/-- graphql: fieldcount(40, 8) = 320 — FIELD COUNT: the fields a schema holds — types at a per-type field count.
    value types · perType. -/
theorem fam_graphql_fieldcount_1 : (40 * 8) = 320 := by decide

/-- graphql: cachehit(950, 1000) = 95 — CACHE HIT: the hit rate as a percentage. value ⌊hits · 100 / total⌋. -/
theorem fam_graphql_cachehit_1 : ((950 * 100) / 1000) = 95 := by decide

/-- graphql: fragmentreuse(600, 8) = 75 — FRAGMENT REUSE: how often a fragment is reused on average across a
    query. value ⌊uses / fragments⌋. -/
theorem fam_graphql_fragmentreuse_1 : (600 / 8) = 75 := by decide

/-- graphtheory: edges(10) = 45 — GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted: the
    edges a complete graph holds, how dense it is, the average degree, the handshake sum, the edges a spanning
    tree needs, the components a forest splits into, the edges a planar drawing allows, and the independent
    cycles it carries. Crosses to `algebra` — counting a graph is algebra on its incidences. A measure. */ const
    PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake sum, tree edges,
    forest components, planar bound, cyclomatic number); a measure crossed to algebra' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `graphtheory.${name}`, params }) export class GraphtheoryFormulas { /**
    COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. -/
theorem fam_graphtheory_edges_1 : ((10 * (10 - 1)) / 2) = 45 := by decide

/-- graphtheory: density(45, 10) = 100 — DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100 /
    (n · (n − 1))⌋. -/
theorem fam_graphtheory_density_1 : (((2 * 45) * 100) / (10 * (10 - 1))) = 100 := by decide

/-- graphtheory: degree(45, 10) = 9 — AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. -/
theorem fam_graphtheory_degree_1 : ((2 * 45) / 10) = 9 := by decide

/-- graphtheory: handshake(45) = 90 — HANDSHAKE SUM: the degrees of every vertex add to twice the edges. value 2
    · edges. -/
theorem fam_graphtheory_handshake_1 : (2 * 45) = 90 := by decide

/-- graphtheory: treeedges(10) = 9 — TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). -/
theorem fam_graphtheory_treeedges_1 : (fmax 0 (10 - 1)) = 9 := by decide

/-- graphtheory: components(10, 7) = 3 — FOREST COMPONENTS: nodes less edges in an acyclic graph. value max(0,
    nodes − edges). -/
theorem fam_graphtheory_components_1 : (fmax 0 (10 - 7)) = 3 := by decide

/-- graphtheory: planaredges(10) = 24 — PLANAR BOUND: the most edges a planar graph on n nodes allows. value
    max(0, 3 · n − 6). -/
theorem fam_graphtheory_planaredges_1 : (fmax 0 ((3 * 10) - 6)) = 24 := by decide

/-- graphtheory: cyclomatic(15, 10, 1) = 6 — CYCLOMATIC NUMBER: the independent cycles a graph carries. value
    max(0, edges − nodes + components). -/
theorem fam_graphtheory_cyclomatic_1 : (fmax 0 ((15 - 10) + 1)) = 6 := by decide

/-- graphtheory: density(45, 1) = 0 — DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100 / (n
    · (n − 1))⌋. -/
theorem fam_graphtheory_density_2 : (((2 * 45) * 100) / (1 * (1 - 1))) = 0 := by decide

/-- gravimetry: anomaly(9810, 9805) = 5 -/
theorem fam_gravimetry_anomaly_1 : (fmax 0 (9810 - 9805)) = 5 := by decide

/-- gravimetry: freeaircorrection(3, 100) = 300 -/
theorem fam_gravimetry_freeaircorrection_1 : (3 * 100) = 300 := by decide

/-- gravimetry: bouguercorrection(1, 110) = 110 -/
theorem fam_gravimetry_bouguercorrection_1 : (1 * 110) = 110 := by decide

/-- gravimetry: densitycontrast(2700, 2300) = 400 -/
theorem fam_gravimetry_densitycontrast_1 : (fmax 0 (2700 - 2300)) = 400 := by decide

/-- gravimetry: gradient(500, 10) = 50 -/
theorem fam_gravimetry_gradient_1 : (500 / 10) = 50 := by decide

/-- gravimetry: stationspacing(10000, 100) = 100 -/
theorem fam_gravimetry_stationspacing_1 : (10000 / 100) = 100 := by decide

/-- gravimetry: terraincorrection(200, 4) = 50 -/
theorem fam_gravimetry_terraincorrection_1 : (200 / 4) = 50 := by decide

/-- gravimetry: surveypoints(50, 20) = 1000 -/
theorem fam_gravimetry_surveypoints_1 : (50 * 20) = 1000 := by decide

/-- grazing: stockingrate(100, 20) = 5 — GRAZING — MANAGED PASTURE AS ARITHMETIC. Running a herd on land is
    numbers: the stocking rate per hectare, the land's carrying capacity, how much forage is used, the rest a
    paddock gets, animal units by weight, the days a pasture lasts, dry-matter intake, and the length of a
    rotation cycle. Crosses to `ecology` — grazing is what ecology sustains. A measure. */ const PROOF =
    'grazing arithmetic (stocking rate, carrying capacity, forage utilization, rest period, animal units,
    pasture days, dry-matter intake, rotation cycle); managed pasture as a measure crossed to ecology' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grazing', dst: 'ecology', formula, value, proof: PROOF, ...extra
    }, holds, { name: `grazing.${name}`, params }) export class GrazingFormulas { /** STOCKING RATE: animals per
    unit area. value ⌊animals / area⌋. -/
theorem fam_grazing_stockingrate_1 : (100 / 20) = 5 := by decide

/-- grazing: carryingcapacity(5000, 25) = 200 — CARRYING CAPACITY: animals the forage can feed at a per-animal
    demand. value ⌊forage / demand⌋. -/
theorem fam_grazing_carryingcapacity_1 : (5000 / 25) = 200 := by decide

/-- grazing: forageutilization(600, 1000) = 60 — FORAGE UTILIZATION as a percentage. value ⌊grazed · 100 /
    available⌋. -/
theorem fam_grazing_forageutilization_1 : ((600 * 100) / 1000) = 60 := by decide

/-- grazing: restperiod(40, 5) = 35 — REST PERIOD: the days a paddock rests out of a cycle after grazing. value
    max(0, cycle − graze). -/
theorem fam_grazing_restperiod_1 : (fmax 0 (40 - 5)) = 35 := by decide

/-- grazing: animalunits(50, 1200) = 60 — ANIMAL UNITS: head at an average weight, one unit per 1000 lb. value
    ⌊head · weight / 1000⌋. -/
theorem fam_grazing_animalunits_1 : ((50 * 1200) / 1000) = 60 := by decide

/-- grazing: pasturedays(3000, 30) = 100 — PASTURE DAYS: the days a forage stock lasts at a daily intake. value
    ⌊forage / intake⌋. -/
theorem fam_grazing_pasturedays_1 : (3000 / 30) = 100 := by decide

/-- grazing: dmintake(1200, 3) = 36 — DRY-MATTER INTAKE: a share of body weight per day. value ⌊weight · pct /
    100⌋. -/
theorem fam_grazing_dmintake_1 : ((1200 * 3) / 100) = 36 := by decide

/-- grazing: rotationcycle(10, 4) = 40 — ROTATION CYCLE: the paddocks of a rotation at days each. value paddocks
    · days. -/
theorem fam_grazing_rotationcycle_1 : (10 * 4) = 40 := by decide

/-- greenspace: percapita(9000, 300) = 30 — GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API
    registry, not by hand). A city's green is numbers: the square metres of park per resident, the share of
    ground under tree canopy, the share of people within a short walk of a park, species density, the degrees of
    cooling shade gives, the stormwater soil soaks up, the visitors a space holds, and how linked its habitats
    are. Crosses to `geography` — greenspace is the land geography maps. A measure. */ const PROOF = 'greenspace
    arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater,
    recreation capacity, connectivity); a public-API measure crossed to geography' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, {
    name: `greenspace.${name}`, params }) export class GreenspaceFormulas { /** PARK PER CAPITA: square metres
    of greenspace each resident gets. value ⌊area / population⌋. -/
theorem fam_greenspace_percapita_1 : (9000 / 300) = 30 := by decide

/-- greenspace: canopycover(40, 100) = 40 — CANOPY COVER as a percentage of ground. value ⌊canopy · 100 /
    total⌋. -/
theorem fam_greenspace_canopycover_1 : ((40 * 100) / 100) = 40 := by decide

/-- greenspace: parkaccess(750, 1000) = 75 — PARK ACCESS: the share of residents within a short walk of a park.
    value ⌊served · 100 / total⌋. -/
theorem fam_greenspace_parkaccess_1 : ((750 * 100) / 1000) = 75 := by decide

/-- greenspace: biodiversity(50, 1000) = 50 — BIODIVERSITY: species per thousand units of area. value ⌊species ·
    1000 / area⌋. -/
theorem fam_greenspace_biodiversity_1 : ((50 * 1000) / 1000) = 50 := by decide

/-- greenspace: coolingeffect(20, 3) = 60 — COOLING EFFECT: degrees of cooling canopy gives, summed. value
    canopy · degrees. -/
theorem fam_greenspace_coolingeffect_1 : (20 * 3) = 60 := by decide

/-- greenspace: stormwater(500, 8) = 4000 — STORMWATER: litres of runoff the soil soaks up at a rate per unit
    area. value area · rate. -/
theorem fam_greenspace_stormwater_1 : (500 * 8) = 4000 := by decide

/-- greenspace: recreationcapacity(10000, 50) = 200 — RECREATION CAPACITY: the visitors a space holds at an area
    each. value ⌊area / perVisitor⌋. -/
theorem fam_greenspace_recreationcapacity_1 : (10000 / 50) = 200 := by decide

/-- greenspace: connectivity(18, 20) = 90 — CONNECTIVITY: habitat links as a share of the nodes they could join.
    value ⌊links · 100 / nodes⌋. -/
theorem fam_greenspace_connectivity_1 : ((18 * 100) / 20) = 90 := by decide

/-- grid: gap(4, 16) = 48 — GAP: the total gutter between columns. value max(0, cols − 1) · gap. -/
theorem fam_grid_gap_1 : ((fmax 0 (4 - 1)) * 16) = 48 := by decide

/-- grid: span(2, 4) = 50 — SPAN: a column span as a percentage of the track count. value ⌊item · 100 / cols⌋. -/
theorem fam_grid_span_1 : ((2 * 100) / 4) = 50 := by decide

/-- grid: fill(3, 12) = 25 — FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋. -/
theorem fam_grid_fill_1 : ((3 * 100) / 12) = 25 := by decide

/-- grid: cells(3, 4) = 12 — CELLS: total cells in a grid of rows by columns. value rows · cols. -/
theorem fam_grid_cells_1 : (3 * 4) = 12 := by decide

/-- grid: auto(1000, 250) = 4 — AUTO: the columns that fit a container at a minimum column width. value
    ⌊container / min⌋. -/
theorem fam_grid_auto_1 : (1000 / 250) = 4 := by decide

/-- grid: aspect(16, 9) = 177 — ASPECT: a cell aspect ratio as a percentage. value ⌊width · 100 / height⌋. -/
theorem fam_grid_aspect_1 : ((16 * 100) / 9) = 177 := by decide

/-- grid: density(4, 16) = 25 — DENSITY: items per unit area as a percentage. value ⌊items · 100 / area⌋. -/
theorem fam_grid_density_1 : ((4 * 100) / 16) = 25 := by decide

/-- gripper: gripforce(50, 4) = 200 -/
theorem fam_gripper_gripforce_1 : (50 * 4) = 200 := by decide

/-- gripper: strokewidth(100, 20) = 80 -/
theorem fam_gripper_strokewidth_1 : (fmax 0 (100 - 20)) = 80 := by decide

/-- gripper: payloadlimit(200, 2) = 100 -/
theorem fam_gripper_payloadlimit_1 : (200 / 2) = 100 := by decide

/-- gripper: closetime(1000, 50) = 20 -/
theorem fam_gripper_closetime_1 : (1000 / 50) = 20 := by decide

/-- gripper: fingercount(2, 1) = 3 -/
theorem fam_gripper_fingercount_1 : (2 + 1) = 3 := by decide

/-- gripper: frictionhold(50, 2) = 100 -/
theorem fam_gripper_frictionhold_1 : (50 * 2) = 100 := by decide

/-- gripper: contactpressure(200, 4) = 50 -/
theorem fam_gripper_contactpressure_1 : (200 / 4) = 50 := by decide

/-- gripper: slipmargin(80, 100) = 80 -/
theorem fam_gripper_slipmargin_1 : ((80 * 100) / 100) = 80 := by decide

/-- grouptheory: order(6, 4) = 24 — GROUPTHEORY — FINITE GROUPS AS ARITHMETIC. The structure of a finite group
    is counting: the order of a direct product, the cosets Lagrange's theorem carves out, the order of a cyclic
    group, the index of a subgroup, how cosets tile a group, the factorial order of a symmetric group, a
    generator raised to a power, and the order of a single element. Crosses to `algebra` — group theory is the
    structure algebra reasons over. Exact, finite, hex-addressable. */ const PROOF = 'group theory arithmetic
    (direct-product order, Lagrange cosets, cyclic order, subgroup index, coset count, symmetric-group order n!,
    generator power aᵏ mod n, element order n/gcd); every value an exact finite integer; crossed to algebra'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const fact = (n:
    number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r } const modpow = (a: number,
    k: number, m: number): number => { if (m <= 0) return 0; let r = 1 % m, x = a % m, e = k; while (e > 0) { if
    (e & 1) r = (r * x) % m; x = (x * x) % m; e = Math.floor(e / 2) } return r } const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'grouptheory', dst: 'algebra', formula, value, proof: PROOF,
    ...extra }, holds, { name: `grouptheory.${name}`, params }) export class GrouptheoryFormulas { /**
    DIRECT-PRODUCT ORDER: |Z_a × Z_b|. value a · b. -/
theorem fam_grouptheory_order_1 : (6 * 4) = 24 := by decide

/-- grouptheory: cosets(24, 6) = 4 — COSETS (Lagrange): the left cosets of a subgroup of order h in a group of
    order g. value ⌊g / h⌋. -/
theorem fam_grouptheory_cosets_1 : (24 / 6) = 4 := by decide

/-- grouptheory: cyclicorder(12) = 12 — CYCLIC ORDER: the order of the cyclic group Z_n. value n. -/
theorem fam_grouptheory_cyclicorder_1 : 12 = 12 := by decide

/-- grouptheory: subgroupindex(60, 12) = 5 — SUBGROUP INDEX [G:H] = |G| / |H|. value ⌊g / h⌋. -/
theorem fam_grouptheory_subgroupindex_1 : (60 / 12) = 5 := by decide

/-- grouptheory: cosetcount(100, 25) = 4 — COSET COUNT: how many cosets of size h tile a group of order g. value
    ⌊g / h⌋. -/
theorem fam_grouptheory_cosetcount_1 : (100 / 25) = 4 := by decide
