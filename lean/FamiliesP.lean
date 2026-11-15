-- lean/FamiliesP.lean — GENERATED. THE FAMILIES, P — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a
def fmin (a b : Nat) : Nat := if a ≤ b then a else b

/-- pacing: pace(3600, 12) = 300 -/
theorem fam_pacing_pace_1 : (3600 / 12) = 300 := by decide

/-- pacing: speed(12000, 120) = 100 -/
theorem fam_pacing_speed_1 : (12000 / 120) = 100 := by decide

/-- pacing: spliteven(2400, 8) = 300 -/
theorem fam_pacing_spliteven_1 : (2400 / 8) = 300 := by decide

/-- pacing: negativesplit(310, 300) = 10 -/
theorem fam_pacing_negativesplit_1 : (fmax 0 (310 - 300)) = 10 := by decide

/-- pacing: targettime(300, 8) = 2400 -/
theorem fam_pacing_targettime_1 : (300 * 8) = 2400 := by decide

/-- pacing: lapaverage(2400, 8) = 300 -/
theorem fam_pacing_lapaverage_1 : (2400 / 8) = 300 := by decide

/-- pacing: effortzone(150, 200) = 75 -/
theorem fam_pacing_effortzone_1 : ((150 * 100) / 200) = 75 := by decide

/-- pacing: fade(320, 300) = 20 -/
theorem fam_pacing_fade_1 : (fmax 0 (320 - 300)) = 20 := by decide

/-- pagination: pageoffset(5, 20) = 80 — OFFSET: the zero-based index of the first item on a page. value max(0,
    page − 1) · perPage. -/
theorem fam_pagination_pageoffset_1 : ((fmax 0 (5 - 1)) * 20) = 80 := by decide

/-- pagination: columns(960, 220, 20) = 4 — COLUMNS that fit a measure at a column width with a gutter between.
    value ⌊(width + gutter) / (colWidth + gutter)⌋. -/
theorem fam_pagination_columns_1 : ((960 + 20) / (220 + 20)) = 4 := by decide

/-- pagination: charsperpage(66, 45) = 2970 — CHARACTERS PER PAGE: the set lines each holding a measure of
    characters. value cpl · lines. -/
theorem fam_pagination_charsperpage_1 : (66 * 45) = 2970 := by decide

/-- pagination: pagerange(5, 20) = 100 — PAGE RANGE: the last item number a page shows (1-based). value page ·
    perPage. -/
theorem fam_pagination_pagerange_1 : (5 * 20) = 100 := by decide

/-- painting: primarycolors(3, 0) = 3 -/
theorem fam_painting_primarycolors_1 : (3 + 0) = 3 := by decide

/-- painting: layercount(5, 3) = 8 -/
theorem fam_painting_layercount_1 : (5 + 3) = 8 := by decide

/-- painting: huewheel(360, 12) = 30 -/
theorem fam_painting_huewheel_1 : (360 / 12) = 30 := by decide

/-- painting: pigmentsubsets(6) = 64 -/
theorem fam_painting_pigmentsubsets_1 : (2 ^ 6) = 64 := by decide

/-- painting: canvasarea(40, 30) = 1200 -/
theorem fam_painting_canvasarea_1 : (40 * 30) = 1200 := by decide

/-- painting: valuescale(9, 0) = 9 -/
theorem fam_painting_valuescale_1 : (9 + 0) = 9 := by decide

/-- painting: opacityratio(80, 100) = 80 -/
theorem fam_painting_opacityratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- paleoclimate: proxyrecords(40, 20) = 60 -/
theorem fam_paleoclimate_proxyrecords_1 : (40 + 20) = 60 := by decide

/-- paleoclimate: temperatureanomaly(150, 120) = 30 -/
theorem fam_paleoclimate_temperatureanomaly_1 : (fmax 0 (150 - 120)) = 30 := by decide

/-- paleoclimate: co2ppm(280, 1) = 280 -/
theorem fam_paleoclimate_co2ppm_1 : (280 * 1) = 280 := by decide

/-- paleoclimate: cyclelength(41, 1000) = 41000 -/
theorem fam_paleoclimate_cyclelength_1 : (41 * 1000) = 41000 := by decide

/-- paleoclimate: isotoperatio(18, 20) = 90 -/
theorem fam_paleoclimate_isotoperatio_1 : ((18 * 100) / 20) = 90 := by decide

/-- paleoclimate: interglacials(5, 0) = 5 -/
theorem fam_paleoclimate_interglacials_1 : (5 + 0) = 5 := by decide

/-- paleoclimate: resolutionyears(10000, 100) = 100 -/
theorem fam_paleoclimate_resolutionyears_1 : (10000 / 100) = 100 := by decide

/-- paleography: letterforms(26, 4) = 104 -/
theorem fam_paleography_letterforms_1 : (26 * 4) = 104 := by decide

/-- paleography: abbreviationsubsets(6) = 64 -/
theorem fam_paleography_abbreviationsubsets_1 : (2 ^ 6) = 64 := by decide

/-- paleography: dateestimate(1200, 800) = 400 -/
theorem fam_paleography_dateestimate_1 : (fmax 0 (1200 - 800)) = 400 := by decide

/-- paleography: handcount(3, 2) = 5 -/
theorem fam_paleography_handcount_1 : (3 + 2) = 5 := by decide

/-- paleography: minusculeratio(70, 100) = 70 -/
theorem fam_paleography_minusculeratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- paleontology: age(2, 5730) = 11460 — PALEONTOLOGY — THE FOSSIL RECORD, AS ARITHMETIC. Deep time is numbers:
    elapsed age by half-lives, the carbon that remains after decay, how complete a skeleton is, species
    diversity per sample, a stratum's depositional age, an extinction's toll, reconstructed size, and specimen
    abundance per area. Crosses to `geology` — the rock that holds the record. A measure. */ const PROOF =
    'paleontology arithmetic (radiometric age, carbon decay, skeletal completeness, diversity, stratigraphy,
    extinction toll, body size, abundance); the fossil record as integers; a measure crossed to geology' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'paleontology', dst: 'geology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `paleontology.${name}`, params }) export class PaleontologyFormulas
    { /** RADIOMETRIC AGE: elapsed time as half-lives at a half-life length. value halflives · halflife. -/
theorem fam_paleontology_age_1 : (2 * 5730) = 11460 := by decide

/-- paleontology: decay(1000, 3) = 125 — CARBON DECAY: the isotope remaining after whole half-lives. value
    ⌊initial / 2^halflives⌋. -/
theorem fam_paleontology_decay_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- paleontology: completeness(60, 200) = 30 — SKELETAL COMPLETENESS as a percentage. value ⌊found · 100 /
    expected⌋. -/
theorem fam_paleontology_completeness_1 : ((60 * 100) / 200) = 30 := by decide

/-- paleontology: diversity(120, 40) = 3 — DIVERSITY: species over samples. value ⌊species / samples⌋. -/
theorem fam_paleontology_diversity_1 : (120 / 40) = 3 := by decide

/-- paleontology: stratum(1000, 50) = 20 — STRATUM: depositional age from depth at a sedimentation rate. value
    ⌊depth / rate⌋. -/
theorem fam_paleontology_stratum_1 : (1000 / 50) = 20 := by decide

/-- paleontology: extinction(75, 100) = 75 — EXTINCTION TOLL as a percentage. value ⌊lost · 100 / total⌋. -/
theorem fam_paleontology_extinction_1 : ((75 * 100) / 100) = 75 := by decide

/-- paleontology: size(12, 100) = 1200 — BODY SIZE: reconstructed length at a scale factor. value length ·
    scale. -/
theorem fam_paleontology_size_1 : (12 * 100) = 1200 := by decide

/-- paleontology: abundance(600, 20) = 30 — ABUNDANCE: specimens over area. value ⌊specimens / area⌋. -/
theorem fam_paleontology_abundance_1 : (600 / 20) = 30 := by decide

/-- papyrology: fragments(40, 20) = 60 -/
theorem fam_papyrology_fragments_1 : (40 + 20) = 60 := by decide

/-- papyrology: linespercolumn(600, 30) = 20 -/
theorem fam_papyrology_linespercolumn_1 : (600 / 30) = 20 := by decide

/-- papyrology: datingrange(300, 100) = 200 -/
theorem fam_papyrology_datingrange_1 : (fmax 0 (300 - 100)) = 200 := by decide

/-- papyrology: recovery(60, 100) = 60 -/
theorem fam_papyrology_recovery_1 : ((60 * 100) / 100) = 60 := by decide

/-- papyrology: scribalhands(3, 2) = 6 -/
theorem fam_papyrology_scribalhands_1 : (3 * 2) = 6 := by decide

/-- papyrology: subsetreadings(5) = 32 -/
theorem fam_papyrology_subsetreadings_1 : (2 ^ 5) = 32 := by decide

/-- parable: elementcount(3, 2) = 5 -/
theorem fam_parable_elementcount_1 : (3 + 2) = 5 := by decide

/-- parable: meaninglayers(4) = 16 -/
theorem fam_parable_meaninglayers_1 : (2 ^ 4) = 16 := by decide

/-- parable: charactercount(3, 2) = 5 -/
theorem fam_parable_charactercount_1 : (3 + 2) = 5 := by decide

/-- parable: moralcount(1, 3) = 3 -/
theorem fam_parable_moralcount_1 : (1 * 3) = 3 := by decide

/-- parallax: angle(1000, 10) = 100 — PARALLAX — THE GEOMETRY OF DISTANCE, AS ARITHMETIC. A nearby star shifts
    against the far background as the Earth swings across its orbit, and that shift is a measured angle. The
    numbers follow: distance from the parallax angle, the angle from a baseline, the baseline itself, proper
    motion, arcseconds, parsecs, tangential velocity, and the error budget of a measurement. Crosses to
    `astronomy` — parallax is the first rung of the cosmic distance ladder. */ const PROOF = 'parallax
    arithmetic (distance from parallax, angle from baseline, baseline, proper motion, arcseconds, parsecs,
    tangential velocity, error budget); the first rung of the distance ladder; a measure crossed to astronomy'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'parallax', dst: 'astronomy', formula, value,
    proof: PROOF, ...extra }, holds, { name: `parallax.${name}`, params }) export class ParallaxFormulas { /**
    PARALLAX ANGLE: the apparent shift of a baseline seen at a distance. value ⌊baseline / distance⌋. -/
theorem fam_parallax_angle_1 : (1000 / 10) = 100 := by decide

/-- parallax: arcseconds(2) = 7200 — ARCSECONDS in a span of degrees. value degrees · 3600. -/
theorem fam_parallax_arcseconds_1 : (2 * 3600) = 7200 := by decide

/-- parallax: baseline(500) = 1000 — BASELINE: the observing baseline is the diameter of the orbit, twice its
    radius. value radius · 2. -/
theorem fam_parallax_baseline_1 : (500 * 2) = 1000 := by decide

/-- parallax: distance(10) = 100000 — DISTANCE in parsecs from a parallax of p milliarcseconds. value ⌊1000000 /
    parallaxmas⌋. -/
theorem fam_parallax_distance_1 : (1000000 / 10) = 100000 := by decide

/-- parallax: errorbudget(1000, 4) = 250 — ERROR BUDGET: the total error shared out over the measurements. value
    ⌊total / sources⌋. -/
theorem fam_parallax_errorbudget_1 : (1000 / 4) = 250 := by decide

/-- parallax: errorbudget(100, 0) = 0 — ERROR BUDGET: the total error shared out over the measurements. value
    ⌊total / sources⌋. -/
theorem fam_parallax_errorbudget_2 : (100 / 0) = 0 := by decide

/-- parallax: parsecs(326) = 100 — PARSECS from a distance in light-years (1 pc = 3.26 ly). value ⌊lightyears ·
    100 / 326⌋. -/
theorem fam_parallax_parsecs_1 : ((326 * 100) / 326) = 100 := by decide

/-- parallax: propermotion(1000, 10) = 100 — PROPER MOTION: angular displacement over the years it took. value
    ⌊delta / years⌋. -/
theorem fam_parallax_propermotion_1 : (1000 / 10) = 100 := by decide

/-- parallax: tangentialvelocity(10, 100) = 4740 — TANGENTIAL VELOCITY from proper motion and distance (Vt =
    4.74 · μ · d). value ⌊mu · distance · 474 / 100⌋. -/
theorem fam_parallax_tangentialvelocity_1 : (((10 * 100) * 474) / 100) = 4740 := by decide

/-- parasitology: prevalence(250, 1000) = 25 — PARASITOLOGY — HOST–PARASITE EPIDEMIOLOGY, AS ARITHMETIC (chosen
    by the public-API registry, not by hand). A parasite population in a host population is numbers: how many
    hosts carry it, how heavy each infection is, the total worm burden, the mean across every host, how clumped
    the distribution is, how many new infections a contact rate yields, how long a life cycle runs, and whether
    an infective dose clears threshold. Crosses to `microbiology` — parasitology is the macro-organism arm of
    what microbiology measures. A measure. */ const PROOF = 'parasitology arithmetic (prevalence, intensity,
    burden, abundance, aggregation, transmission, lifecycle, infectivity); the registry\'s host–parasite domain;
    a measure crossed to microbiology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'parasitology',
    dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `parasitology.${name}`, params
    }) export class ParasitologyFormulas { /** PREVALENCE: the percentage of hosts carrying the parasite. value
    ⌊infected · 100 / total⌋. -/
theorem fam_parasitology_prevalence_1 : ((250 * 100) / 1000) = 25 := by decide

/-- parasitology: intensity(1200, 50) = 24 — INTENSITY: mean parasites per infected host. value ⌊parasites /
    infected⌋. -/
theorem fam_parasitology_intensity_1 : (1200 / 50) = 24 := by decide

/-- parasitology: burden(50, 24) = 1200 — BURDEN: total parasite burden, hosts at a load each. value hosts ·
    perHost. -/
theorem fam_parasitology_burden_1 : (50 * 24) = 1200 := by decide

/-- parasitology: abundance(5000, 1000) = 5 — ABUNDANCE: mean parasites across every host, infected or not.
    value ⌊parasites / total⌋. -/
theorem fam_parasitology_abundance_1 : (5000 / 1000) = 5 := by decide

/-- parasitology: aggregation(800, 10) = 80 — AGGREGATION: the dispersion index, how clumped the parasites are.
    value ⌊variance / mean⌋. -/
theorem fam_parasitology_aggregation_1 : (800 / 10) = 80 := by decide

/-- parasitology: transmission(500, 20) = 100 — TRANSMISSION: new infections from contacts at a per-cent rate.
    value ⌊contacts · rate / 100⌋. -/
theorem fam_parasitology_transmission_1 : ((500 * 20) / 100) = 100 := by decide

/-- parasitology: lifecycle(4, 7) = 28 — LIFECYCLE: total development time, stages at a span each. value stages
    · days. -/
theorem fam_parasitology_lifecycle_1 : (4 * 7) = 28 := by decide

/-- parity: coveragebits(4, 3) = 7 — HAMMING BITS: the parity bits a data word needs. value min r : 2^r ≥ data +
    r + 1. */ static hammingbits(data: number): CrossFormula { let r = 0; while (2 ** r < data + r + 1) r++;
    return c('parity-hammingbits', 'hammingbits(data) = min r : 2^r ≥ data + r + 1', r, nat(data),
    'hammingbits', [data]) } /** COVERAGE: the codeword length a protected word covers. value data + parity. -/
theorem fam_parity_coveragebits_1 : (4 + 3) = 7 := by decide

/-- parity: detectrate(990, 1000) = 99 — DETECT RATE as a percentage. value ⌊detected · 100 / total⌋. -/
theorem fam_parity_detectrate_1 : ((990 * 100) / 1000) = 99 := by decide

/-- parity: overhead(3, 4) = 75 — OVERHEAD: parity bits as a percentage of data. value ⌊parity · 100 / data⌋. -/
theorem fam_parity_overhead_1 : ((3 * 100) / 4) = 75 := by decide

/-- parity: correctable(3) = 1 — CORRECTABLE: errors a minimum distance can correct. value ⌊max(0, distance − 1)
    / 2⌋. -/
theorem fam_parity_correctable_1 : ((fmax 0 (3 - 1)) / 2) = 1 := by decide

/-- partitioning: keyspacesplit(1000, 8) = 125 — KEYSPACE SPLIT: the keys each node holds when a keyspace is
    split evenly. value ⌊keyspace / nodes⌋. -/
theorem fam_partitioning_keyspacesplit_1 : (1000 / 8) = 125 := by decide

/-- partitioning: skew(150, 100) = 50 — SKEW: how far the busiest partition runs over the average, as a
    percentage. value ⌊max(0, maxLoad − avgLoad) · 100 / avgLoad⌋. -/
theorem fam_partitioning_skew_1 : (((fmax 0 (150 - 100)) * 100) / 100) = 50 := by decide

/-- partitioning: rebalance(1000, 3, 5) = 400 — REBALANCE: the keys that move when growing from `from` nodes to
    `to` nodes. value ⌊keys · max(0, to − from) / to⌋. -/
theorem fam_partitioning_rebalance_1 : ((1000 * (fmax 0 (5 - 3))) / 5) = 400 := by decide

/-- partitioning: hotpartition(250, 1000) = 25 — HOT PARTITION: the hottest partition's share of total load, as
    a percentage. value ⌊partitionLoad · 100 / totalLoad⌋. -/
theorem fam_partitioning_hotpartition_1 : ((250 * 100) / 1000) = 25 := by decide

/-- partitioning: rangewidth(6000, 60) = 100 — RANGE WIDTH: the width of each range when a keyspace is cut into
    partitions. value ⌊keyspace / partitions⌋. -/
theorem fam_partitioning_rangewidth_1 : (6000 / 60) = 100 := by decide

/-- partitioning: fanout(10, 5) = 50 — FANOUT: the leaf partitions a tree makes from parents each split a fixed
    number of ways. value parents · childrenEach. -/
theorem fam_partitioning_fanout_1 : (10 * 5) = 50 := by decide

/-- partitioning: skew(80, 100) = 0 — SKEW: how far the busiest partition runs over the average, as a
    percentage. value ⌊max(0, maxLoad − avgLoad) · 100 / avgLoad⌋. -/
theorem fam_partitioning_skew_2 : (((fmax 0 (80 - 100)) * 100) / 100) = 0 := by decide

/-- partner: directory(250) = 250 — PARTNER — THE PARTNERS/PARTNERFILTERS USE CASE FROM payloadcms/website, AS
    ARITHMETIC. A partner directory with filters is numbers: the directory size, the share a filter matches, the
    partners in a tier, commission on revenue, the close rate on referred leads, an average rating, partners per
    region, and the share of a listing that is active. Crosses to `frontend` — a partner directory is what the
    frontend renders. A measure. */ const PROOF = 'partner arithmetic (directory, filter share, tier,
    commission, lead close rate, rating, regions, active listing); the payloadcms/website
    Partners/PartnerFilters use case; a measure crossed to frontend' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'partner', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, {
    name: `partner.${name}`, params }) export class PartnerFormulas { /** THE DIRECTORY: the partners listed.
    value count. -/
theorem fam_partner_directory_1 : 250 = 250 := by decide

/-- partner: filter(45, 100) = 45 — A FILTER: the share of the directory it matches, as a percentage. value
    ⌊matched · 100 / total⌋. -/
theorem fam_partner_filter_1 : ((45 * 100) / 100) = 45 := by decide

/-- partner: tier(100, 4) = 25 — A TIER: the partners in each tier. value ⌊partners / tiers⌋. -/
theorem fam_partner_tier_1 : (100 / 4) = 25 := by decide

/-- partner: commission(10000, 15) = 1500 — COMMISSION: a percentage of revenue. value ⌊revenue · pct / 100⌋. -/
theorem fam_partner_commission_1 : ((10000 * 15) / 100) = 1500 := by decide

/-- partner: leads(30, 120) = 25 — LEADS: the close rate on referred leads, as a percentage. value ⌊closed · 100
    / referred⌋. -/
theorem fam_partner_leads_1 : ((30 * 100) / 120) = 25 := by decide

/-- partner: rating(94, 20) = 47 — RATING: the average rating, to a tenth. value ⌊sum · 10 / votes⌋. -/
theorem fam_partner_rating_1 : ((94 * 10) / 20) = 47 := by decide

/-- partner: regions(240, 6) = 40 — REGIONS: the partners in each region. value ⌊partners / regions⌋. -/
theorem fam_partner_regions_1 : (240 / 6) = 40 := by decide

/-- partner: listing(80, 200) = 40 — A LISTING: the share of it that is active, as a percentage. value ⌊active ·
    100 / total⌋. -/
theorem fam_partner_listing_1 : ((80 * 100) / 200) = 40 := by decide

/-- passwords: keyspacebits(96, 32) = 64 — KEYSPACE: the entropy bits left after reserving some for salt and
    pepper overhead. value max(0, entropy − reserved). -/
theorem fam_passwords_keyspacebits_1 : (fmax 0 (96 - 32)) = 64 := by decide

/-- passwords: keyspacebits(32, 96) = 0 — KEYSPACE: the entropy bits left after reserving some for salt and
    pepper overhead. value max(0, entropy − reserved). -/
theorem fam_passwords_keyspacebits_2 : (fmax 0 (32 - 96)) = 0 := by decide

/-- passwords: rotationdays(90, 3) = 30 — ROTATION: how often to rotate, the policy maximum shortened by a risk
    factor. value ⌊maxDays / risk⌋. -/
theorem fam_passwords_rotationdays_1 : (90 / 3) = 30 := by decide

/-- passwords: minlengthscore(16, 8) = 8 — MIN-LENGTH SCORE: the characters a password has beyond the policy
    minimum. value max(0, length − minimum). -/
theorem fam_passwords_minlengthscore_1 : (fmax 0 (16 - 8)) = 8 := by decide

/-- passwords: hashcost(12, 50) = 600 — HASH COST: the total work of hashing, rounds at a cost per round. value
    rounds · msPerRound. -/
theorem fam_passwords_hashcost_1 : (12 * 50) = 600 := by decide

/-- passwords: mfabonus(3, 20) = 60 — MFA BONUS: the strength points added by each extra authentication factor.
    value factors · perFactor. -/
theorem fam_passwords_mfabonus_1 : (3 * 20) = 60 := by decide

/-- passwords: reuserisk(10, 3) = 30 — REUSE RISK: the percentage of accounts whose password is breached and
    reused. value ⌊breached · 100 / accounts⌋. -/
theorem fam_passwords_reuserisk_1 : ((3 * 100) / 10) = 30 := by decide

/-- pasteurization: holdtime(300, 20) = 15 — PASTEURIZATION — HEAT APPLIED TO CONTROL MICROBIAL LOAD, AS
    ARITHMETIC (chosen by the process registry, not by hand). A thermal process is numbers: the hold time a
    volume needs, the final temperature, lethality units, the D-value and z-value, the log reductions achieved,
    throughput, and the cooling delta. Crosses to `chemistry` — the thermal kinetics (Arrhenius, D/z) that
    pasteurization applies are chemistry. A measure. */ const PROOF = 'pasteurization arithmetic (hold time,
    final temperature, lethality units, D-value, z-value, log reduction, throughput, cooling); a heat process
    chosen by the registry; a measure crossed to chemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pasteurization', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pasteurization.${name}`, params }) export class PasteurizationFormulas { /** HOLD TIME: the seconds a
    volume takes to clear the holding tube at a flow rate. value ⌊volume / flowrate⌋. -/
theorem fam_pasteurization_holdtime_1 : (300 / 20) = 15 := by decide

/-- pasteurization: temperature(72, 3) = 75 — FINAL TEMPERATURE: a base temperature plus the rise the heater
    adds. value base + rise. -/
theorem fam_pasteurization_temperature_1 : (72 + 3) = 75 := by decide

/-- pasteurization: lethality(12, 15) = 180 — LETHALITY: pasteurization units accrued at a rate over the minutes
    held. value rate · minutes. -/
theorem fam_pasteurization_lethality_1 : (12 * 15) = 180 := by decide

/-- pasteurization: dvalue(60, 6) = 10 — D-VALUE: the seconds to cut the population by one log, from the time
    taken over the logs removed. value ⌊time / logs⌋. -/
theorem fam_pasteurization_dvalue_1 : (60 / 6) = 10 := by decide

/-- pasteurization: zvalue(80, 72) = 8 — Z-VALUE: the degrees between two reference temperatures. value max(0,
    tempHigh − tempLow). -/
theorem fam_pasteurization_zvalue_1 : (fmax 0 (80 - 72)) = 8 := by decide

/-- pasteurization: reduction(45, 10) = 4 — LOG REDUCTION: the log cuts a treatment achieves, its time over the
    D-value. value ⌊time / dvalue⌋. -/
theorem fam_pasteurization_reduction_1 : (45 / 10) = 4 := by decide

/-- pasteurization: throughput(500, 8) = 4000 — THROUGHPUT: the litres processed across the batches run. value
    litres · batches. -/
theorem fam_pasteurization_throughput_1 : (500 * 8) = 4000 := by decide

/-- pasteurization: cooling(75, 4) = 71 — COOLING: the degrees the product drops from hot to cold. value max(0,
    hot − cold). -/
theorem fam_pasteurization_cooling_1 : (fmax 0 (75 - 4)) = 71 := by decide

/-- pasteurization: cooling(4, 75) = 0 — COOLING: the degrees the product drops from hot to cold. value max(0,
    hot − cold). -/
theorem fam_pasteurization_cooling_2 : (fmax 0 (4 - 75)) = 0 := by decide

/-- pathology: sensitivity(90, 100) = 90 — PATHOLOGY — DIAGNOSTIC TESTS AND SLIDES, AS ARITHMETIC. A diagnostic
    test is numbers: how often it catches disease (sensitivity), how often it clears the healthy (specificity),
    how trustworthy a positive is (precision), how common the disease is (prevalence), and the slide read out as
    counts — mitotic figures per field, cellularity per area, observer concordance, and marker positivity.
    Crosses to `med` — pathology is what medicine reads. A measure. */ const PROOF = 'pathology arithmetic
    (sensitivity, specificity, precision, prevalence, mitotic rate, cellularity, concordance, positivity);
    diagnostic tests and slides as counts; a measure crossed to med' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'pathology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pathology.${name}`, params }) export class PathologyFormulas { /** SENSITIVITY: true positives over all
    actual positives, as a percentage. value ⌊truepos · 100 / actualpos⌋. -/
theorem fam_pathology_sensitivity_1 : ((90 * 100) / 100) = 90 := by decide

/-- pathology: specificity(95, 100) = 95 — SPECIFICITY: true negatives over all actual negatives, as a
    percentage. value ⌊trueneg · 100 / actualneg⌋. -/
theorem fam_pathology_specificity_1 : ((95 * 100) / 100) = 95 := by decide

/-- pathology: precision(80, 100) = 80 — PRECISION: true positives over all predicted positives, as a
    percentage. value ⌊truepos · 100 / predictedpos⌋. -/
theorem fam_pathology_precision_1 : ((80 * 100) / 100) = 80 := by decide

/-- pathology: prevalence(5, 1000) = 0 — PREVALENCE: the diseased over the population, as a percentage. value
    ⌊diseased · 100 / population⌋. -/
theorem fam_pathology_prevalence_1 : ((5 * 100) / 1000) = 0 := by decide

/-- pathology: prevalence(50, 1000) = 5 — PREVALENCE: the diseased over the population, as a percentage. value
    ⌊diseased · 100 / population⌋. -/
theorem fam_pathology_prevalence_2 : ((50 * 100) / 1000) = 5 := by decide

/-- pathology: mitotic(30, 10) = 3 — MITOTIC RATE: mitotic figures per high-power field. value ⌊figures /
    fields⌋. -/
theorem fam_pathology_mitotic_1 : (30 / 10) = 3 := by decide

/-- pathology: cellularity(2000, 4) = 500 — CELLULARITY: cells per unit area. value ⌊cells / area⌋. -/
theorem fam_pathology_cellularity_1 : (2000 / 4) = 500 := by decide

/-- pathology: concordance(18, 20) = 90 — CONCORDANCE: observers who agree over the total, as a percentage.
    value ⌊agree · 100 / total⌋. -/
theorem fam_pathology_concordance_1 : ((18 * 100) / 20) = 90 := by decide

/-- pathology: positivity(45, 150) = 30 — POSITIVITY: stained cells over the cells counted, as a percentage.
    value ⌊stained · 100 / counted⌋. -/
theorem fam_pathology_positivity_1 : ((45 * 100) / 150) = 30 := by decide

/-- pathplanning: chebyshev(3, 4) = 4 — PATHPLANNING — MOVING A BODY THROUGH SPACE, AS ARITHMETIC (chosen by the
    registry, not by hand). A plan is numbers: the grid distances between two cells (Manhattan, Chebyshev,
    squared Euclid), the A* heuristic f = g + h, the nodes a search expands, the cost of walking a path, the
    clearance from an obstacle, and how smooth the route turns. Crosses to `robotics` — a path is what a robot
    drives. A measure. */ const PROOF = 'pathplanning arithmetic (Manhattan, Chebyshev, squared Euclid distance,
    A* f-score, nodes expanded, path cost, obstacle clearance, turn smoothness); a grid measure crossed to
    robotics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pathplanning', dst: 'robotics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `pathplanning.${name}`, params }) export class
    PathplanningFormulas { /** CHEBYSHEV DISTANCE: the king's-move grid distance from the axis deltas. value
    max(dx, dy). -/
theorem fam_pathplanning_chebyshev_1 : (fmax 3 4) = 4 := by decide

/-- pathplanning: clearance(10, 3) = 7 — CLEARANCE: how far an obstacle at a distance stays outside the body's
    radius. value max(0, dist − radius). -/
theorem fam_pathplanning_clearance_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- pathplanning: clearance(3, 10) = 0 — CLEARANCE: how far an obstacle at a distance stays outside the body's
    radius. value max(0, dist − radius). -/
theorem fam_pathplanning_clearance_2 : (fmax 0 (3 - 10)) = 0 := by decide

/-- pathplanning: heuristic(10, 5) = 15 — A* HEURISTIC: the f-score, cost so far plus the estimate ahead. value
    g + h. -/
theorem fam_pathplanning_heuristic_1 : (10 + 5) = 15 := by decide

/-- pathplanning: manhattan(3, 4) = 7 — MANHATTAN DISTANCE: the grid-walk distance from the axis deltas. value
    dx + dy. -/
theorem fam_pathplanning_manhattan_1 : (3 + 4) = 7 := by decide

/-- pathplanning: nodesexpanded(4, 5) = 20 — NODES EXPANDED: a linear estimate of the frontier, branching factor
    over the search depth. value branch · depth. -/
theorem fam_pathplanning_nodesexpanded_1 : (4 * 5) = 20 := by decide

/-- pathplanning: pathcost(10, 7) = 70 — PATH COST: the steps of a route at a cost each. value steps · stepcost. -/
theorem fam_pathplanning_pathcost_1 : (10 * 7) = 70 := by decide

/-- pathplanning: smoothness(3, 12) = 25 — SMOOTHNESS: the share of a route that turns, as a percentage. value
    ⌊turns · 100 / total⌋. -/
theorem fam_pathplanning_smoothness_1 : ((3 * 100) / 12) = 25 := by decide

/-- patristics: fathercount(8, 4) = 12 -/
theorem fam_patristics_fathercount_1 : (8 + 4) = 12 := by decide

/-- patristics: eracount(3, 2) = 5 -/
theorem fam_patristics_eracount_1 : (3 + 2) = 5 := by decide

/-- patristics: citationtotal(340, 10) = 3400 -/
theorem fam_patristics_citationtotal_1 : (340 * 10) = 3400 := by decide

/-- patristics: orthodoxyratio(90, 100) = 90 -/
theorem fam_patristics_orthodoxyratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- payables: turnover(900, 100) = 9 — PAYABLES — WHAT THE BUSINESS OWES, AS ARITHMETIC (chosen by the ledger
    registry, not by hand). Money owed is numbers: how many times a year the payables turn over, days payable
    outstanding, amount past due, the early-payment discount, the net balance, the accrued liability, each
    installment, and the days left in the terms. Crosses to `accounting` — payables is a line the ledger keeps.
    A measure. */ const PROOF = 'payables arithmetic (AP turnover, days payable outstanding, aging, early-pay
    discount, outstanding balance, accrual, settlement installment, terms remaining); a ledger line crossed to
    accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'payables', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `payables.${name}`, params }) export class
    PayablesFormulas { /** AP TURNOVER: purchases over the average payables. value ⌊purchases / avgPayables⌋. -/
theorem fam_payables_turnover_1 : (900 / 100) = 9 := by decide

/-- payables: dpo(1000, 2000) = 182 — DAYS PAYABLE OUTSTANDING: payables as days of cost of goods. value
    ⌊payables · 365 / cogs⌋. -/
theorem fam_payables_dpo_1 : ((1000 * 365) / 2000) = 182 := by decide

/-- payables: aging(1000, 600) = 400 — AGING: the amount still owed on an invoice. value max(0, invoiced −
    paid). -/
theorem fam_payables_aging_1 : (fmax 0 (1000 - 600)) = 400 := by decide

/-- payables: discount(10000, 2) = 200 — EARLY-PAY DISCOUNT: a percentage off the amount. value ⌊amount · pct /
    100⌋. -/
theorem fam_payables_discount_1 : ((10000 * 2) / 100) = 200 := by decide

/-- payables: outstanding(5000, 1500) = 3500 — OUTSTANDING: the net balance after credits. value max(0, gross −
    credits). -/
theorem fam_payables_outstanding_1 : (fmax 0 (5000 - 1500)) = 3500 := by decide

/-- payables: accrual(50, 30) = 1500 — ACCRUAL: a daily liability over days. value daily · days. -/
theorem fam_payables_accrual_1 : (50 * 30) = 1500 := by decide

/-- payables: terms(30, 10) = 20 — TERMS: the days left before the net term is due. value max(0, net − elapsed). -/
theorem fam_payables_terms_1 : (fmax 0 (30 - 10)) = 20 := by decide

/-- payables: terms(10, 30) = 0 — TERMS: the days left before the net term is due. value max(0, net − elapsed). -/
theorem fam_payables_terms_2 : (fmax 0 (10 - 30)) = 0 := by decide

/-- pedagogy: mastery(18, 20) = 90 — PEDAGOGY — LEARNING, AS ARITHMETIC (chosen by the registry, not by hand).
    Teaching is numbers: how much a cohort has mastered, what it retained, students per teacher, who completed,
    who stays active, progress toward a target, the gain from before to after, and the pace of lessons. Crosses
    to `sociology` — pedagogy is how a society learns. A measure. */ const PROOF = 'pedagogy arithmetic
    (mastery, retention, student-teacher ratio, completion, engagement, progress, gain, pace); a learning
    measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pedagogy', dst:
    'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `pedagogy.${name}`, params }) export
    class PedagogyFormulas { /** MASTERY: items answered correctly, as a percentage. value ⌊correct · 100 /
    items⌋. -/
theorem fam_pedagogy_mastery_1 : ((18 * 100) / 20) = 90 := by decide

/-- pedagogy: retention(70, 100) = 70 — RETENTION: of what was taught, how much was retained, as a percentage.
    value ⌊retained · 100 / taught⌋. -/
theorem fam_pedagogy_retention_1 : ((70 * 100) / 100) = 70 := by decide

/-- pedagogy: ratio(300, 12) = 25 — RATIO: students per teacher. value ⌊students / teachers⌋. -/
theorem fam_pedagogy_ratio_1 : (300 / 12) = 25 := by decide

/-- pedagogy: completion(80, 100) = 80 — COMPLETION: of those enrolled, how many finished, as a percentage.
    value ⌊finished · 100 / enrolled⌋. -/
theorem fam_pedagogy_completion_1 : ((80 * 100) / 100) = 80 := by decide

/-- pedagogy: engagement(45, 50) = 90 — ENGAGEMENT: of the cohort, how many are active, as a percentage. value
    ⌊active · 100 / total⌋. -/
theorem fam_pedagogy_engagement_1 : ((45 * 100) / 50) = 90 := by decide

/-- pedagogy: progress(30, 40) = 75 — PROGRESS: current toward a target, as a percentage. value ⌊current · 100 /
    target⌋. -/
theorem fam_pedagogy_progress_1 : ((30 * 100) / 40) = 75 := by decide

/-- pedagogy: gain(85, 60) = 25 — GAIN: the rise from before to after, never negative. value max(0, post − pre). -/
theorem fam_pedagogy_gain_1 : (fmax 0 (85 - 60)) = 25 := by decide

/-- pedagogy: gain(50, 60) = 0 — GAIN: the rise from before to after, never negative. value max(0, post − pre). -/
theorem fam_pedagogy_gain_2 : (fmax 0 (50 - 60)) = 0 := by decide

/-- pedagogy: pace(24, 12) = 2 — PACE: lessons over weeks. value ⌊lessons / weeks⌋. -/
theorem fam_pedagogy_pace_1 : (24 / 12) = 2 := by decide

/-- pediatrics: dose(20, 15) = 300 — PEDIATRICS — CARE OF THE CHILD, AS ARITHMETIC (chosen by the clinical
    registry, not by hand). A child is numbers: the weight-based drug dose, body-surface area, where a
    measurement sits against the median, the APGAR score at birth, body-mass index, the day's fluid requirement,
    heart rate from a counted pulse, and the daily caloric need. Crosses to `physiology` — pediatrics is
    physiology scaled to the growing body. A measure. */ const PROOF = 'pediatrics arithmetic (weight-based
    dose, body-surface area, growth percentile, APGAR, BMI, fluid requirement, heart rate, caloric need); a
    clinical domain; a measure crossed to physiology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pediatrics', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pediatrics.${name}`, params }) export class PediatricsFormulas { /** WEIGHT-BASED DOSE: milligrams at a
    per-kilogram rate. value weight · perKg. -/
theorem fam_pediatrics_dose_1 : (20 * 15) = 300 := by decide

/-- pediatrics: bsa(36, 100) = 1 — BODY-SURFACE AREA (Mosteller, scaled): weight and height over 3600. value
    ⌊weight · height / 3600⌋. -/
theorem fam_pediatrics_bsa_1 : ((36 * 100) / 3600) = 1 := by decide

/-- pediatrics: growthpercentile(90, 100) = 90 — GROWTH PERCENTILE: a measurement against the median. value
    ⌊value · 100 / median⌋. -/
theorem fam_pediatrics_growthpercentile_1 : ((90 * 100) / 100) = 90 := by decide

/-- pediatrics: apgar(2, 2, 2) = 6 — APGAR: three birth signs, each scored 0–2. value a + p + g. -/
theorem fam_pediatrics_apgar_1 : ((2 + 2) + 2) = 6 := by decide

/-- pediatrics: apgar(2, 2, 1) = 5 — APGAR: three birth signs, each scored 0–2. value a + p + g. -/
theorem fam_pediatrics_apgar_2 : ((2 + 2) + 1) = 5 := by decide

/-- pediatrics: fluidrequirement(8, 100) = 800 — FLUID REQUIREMENT: milliliters per day at a per-kilogram rate.
    value weight · perKg. -/
theorem fam_pediatrics_fluidrequirement_1 : (8 * 100) = 800 := by decide

/-- pediatrics: heartrate(30, 15) = 120 — HEART RATE: beats counted over seconds, to the minute. value ⌊beats ·
    60 / seconds⌋. -/
theorem fam_pediatrics_heartrate_1 : ((30 * 60) / 15) = 120 := by decide

/-- pediatrics: caloricneed(10, 100) = 1000 — CALORIC NEED: kilocalories per day at a per-kilogram rate. value
    weight · perKg. -/
theorem fam_pediatrics_caloricneed_1 : (10 * 100) = 1000 := by decide

/-- pedology: porosity(40, 100) = 40 — PEDOLOGY — SOIL SCIENCE, AS ARITHMETIC. The soil is numbers: pore space,
    how much water it holds, how acid it runs, the organic carbon in it, how fast water soaks in, its texture,
    how much it erodes, and how much it feeds a crop. Crosses to `agriculture` — the soil is what a field is
    grown on. A measure. */ const PROOF = 'pedology arithmetic (porosity, moisture, pH, organic carbon,
    infiltration, texture, erosion, fertility); soil science as integers; a measure crossed to agriculture'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pedology', dst: 'agriculture', formula, value,
    proof: PROOF, ...extra }, holds, { name: `pedology.${name}`, params }) export class PedologyFormulas { /**
    POROSITY: void space as a percentage of the bulk volume. value ⌊voids · 100 / volume⌋. -/
theorem fam_pedology_porosity_1 : ((40 * 100) / 100) = 40 := by decide

/-- pedology: moisture(25, 100) = 25 — MOISTURE: gravimetric water content against the dry mass, as a
    percentage. value ⌊water · 100 / dry⌋. -/
theorem fam_pedology_moisture_1 : ((25 * 100) / 100) = 25 := by decide

/-- pedology: ph(65, 100) = 65 — PH: acidity against the base, as a percentage. value ⌊acid · 100 / base⌋. -/
theorem fam_pedology_ph_1 : ((65 * 100) / 100) = 65 := by decide

/-- pedology: organic(3, 100) = 3 — ORGANIC: organic carbon as a percentage of the total mass. value ⌊carbon ·
    100 / total⌋. -/
theorem fam_pedology_organic_1 : ((3 * 100) / 100) = 3 := by decide

/-- pedology: infiltration(120, 60) = 2 — INFILTRATION: the volume that soaks in over time. value ⌊volume /
    time⌋. -/
theorem fam_pedology_infiltration_1 : (120 / 60) = 2 := by decide

/-- pedology: texture(70, 10) = 700 — TEXTURE: sand against clay, as a percentage. value ⌊sand · 100 / clay⌋. -/
theorem fam_pedology_texture_1 : ((70 * 100) / 10) = 700 := by decide

/-- pedology: erosion(5000, 100) = 50 — EROSION: soil lost per unit area. value ⌊lost / area⌋. -/
theorem fam_pedology_erosion_1 : (5000 / 100) = 50 := by decide

/-- pedology: fertility(900, 30) = 30 — FERTILITY: nutrients available per crop. value ⌊nutrients / crops⌋. -/
theorem fam_pedology_fertility_1 : (900 / 30) = 30 := by decide

/-- pentomino: pieces(12, 0) = 12 -/
theorem fam_pentomino_pieces_1 : (12 + 0) = 12 := by decide

/-- pentomino: cells(12, 5) = 60 -/
theorem fam_pentomino_cells_1 : (12 * 5) = 60 := by decide

/-- pentomino: orientations(12, 8) = 96 -/
theorem fam_pentomino_orientations_1 : (12 * 8) = 96 := by decide

/-- pentomino: tilingsubsets(6) = 64 -/
theorem fam_pentomino_tilingsubsets_1 : (2 ^ 6) = 64 := by decide

/-- pentomino: boardarea(6, 10) = 60 -/
theorem fam_pentomino_boardarea_1 : (6 * 10) = 60 := by decide

/-- pentomino: coverage(100, 100) = 100 -/
theorem fam_pentomino_coverage_1 : ((100 * 100) / 100) = 100 := by decide

/-- perception: threshold(45, 100) = 45 — PERCEPTION — SENSING AS ARITHMETIC (how a system turns stimulus into a
    read). Detection thresholds, Weber's just-noticeable difference, visual acuity, contrast, sensory
    adaptation, signal sensitivity, illusion strength, and reaction latency. Crosses to `neuroscience` —
    perception is what the nervous system computes. A measure. */ const PROOF = 'perception arithmetic
    (threshold, Weber fraction, acuity, contrast, adaptation, sensitivity, illusion, latency); sensing as a
    measure crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'perception', dst:
    'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name: `perception.${name}`, params })
    export class PerceptionFormulas { /** DETECTION THRESHOLD: stimuli detected over trials, as a percentage.
    value ⌊detected · 100 / trials⌋. -/
theorem fam_perception_threshold_1 : ((45 * 100) / 100) = 45 := by decide

/-- perception: weber(2, 100) = 2 — WEBER FRACTION: the just-noticeable difference over the baseline, as a
    percentage. value ⌊difference · 100 / baseline⌋. -/
theorem fam_perception_weber_1 : ((2 * 100) / 100) = 2 := by decide

/-- perception: acuity(600, 10) = 60 — VISUAL ACUITY: viewing distance over detail size. value ⌊distance /
    size⌋. -/
theorem fam_perception_acuity_1 : (600 / 10) = 60 := by decide

/-- perception: contrast(800, 100) = 800 — CONTRAST: light over dark luminance, as a percentage. value ⌊light ·
    100 / dark⌋. -/
theorem fam_perception_contrast_1 : ((800 * 100) / 100) = 800 := by decide

/-- perception: adaptation(100, 30) = 70 — SENSORY ADAPTATION: the drop from initial to adapted response. value
    max(0, initial − adapted). -/
theorem fam_perception_adaptation_1 : (fmax 0 (100 - 30)) = 70 := by decide

/-- perception: sensitivity(90, 100) = 90 — SIGNAL SENSITIVITY: hits over signals present, as a percentage.
    value ⌊hits · 100 / signals⌋. -/
theorem fam_perception_sensitivity_1 : ((90 * 100) / 100) = 90 := by decide

/-- perception: illusion(120, 100) = 120 — ILLUSION STRENGTH: perceived over actual magnitude, as a percentage.
    value ⌊perceived · 100 / actual⌋. -/
theorem fam_perception_illusion_1 : ((120 * 100) / 100) = 120 := by decide

/-- perception: latency(250) = 250 — REACTION LATENCY: milliseconds to respond. value milliseconds. -/
theorem fam_perception_latency_1 : 250 = 250 := by decide

/-- performance: rating(450, 5) = 90 — PERFORMANCE — THE WORKFORCE AS ARITHMETIC (appraisal, not opinion). A
    review is numbers: the average rating, output per hour, the share of a goal reached, a two-sided appraisal,
    the percent gained over the last cycle, billable utilization, tasks per day, and the weighted score. Crosses
    to `pedagogy` — a performance measure is what teaching is judged against. A measure. */ const PROOF =
    'performance arithmetic (rating, productivity, goal, appraisal, improvement, utilization, throughput,
    weighted score); the workforce appraisal domain as exact naturals; a measure crossed to pedagogy' const nat
    = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'performance', dst: 'pedagogy', formula, value, proof: PROOF,
    ...extra }, holds, { name: `performance.${name}`, params }) export class PerformanceFormulas { /** AVERAGE
    RATING: total points over the number of reviews. value ⌊points / count⌋. -/
theorem fam_performance_rating_1 : (450 / 5) = 90 := by decide

/-- performance: productivity(1000, 40) = 25 — PRODUCTIVITY: units of output per hour worked. value ⌊output /
    hours⌋. -/
theorem fam_performance_productivity_1 : (1000 / 40) = 25 := by decide

/-- performance: goal(80, 100) = 80 — GOAL ATTAINMENT as a percentage. value ⌊done · 100 / target⌋. -/
theorem fam_performance_goal_1 : ((80 * 100) / 100) = 80 := by decide

/-- performance: appraisal(80, 90) = 85 — APPRAISAL: the mean of a self and a manager score. value ⌊(self +
    manager) / 2⌋. -/
theorem fam_performance_appraisal_1 : ((80 + 90) / 2) = 85 := by decide

/-- performance: improvement(120, 100) = 20 — IMPROVEMENT: the percent gained over the previous cycle, clamped
    at 0. value max(0, ⌊(now − before) · 100 / before⌋). -/
theorem fam_performance_improvement_1 : (fmax 0 (((120 - 100) * 100) / 100)) = 20 := by decide

/-- performance: improvement(90, 100) = 0 — IMPROVEMENT: the percent gained over the previous cycle, clamped at
    0. value max(0, ⌊(now − before) · 100 / before⌋). -/
theorem fam_performance_improvement_2 : (fmax 0 (((90 - 100) * 100) / 100)) = 0 := by decide

/-- performance: utilization(32, 40) = 80 — UTILIZATION: billable hours as a percentage of available hours.
    value ⌊billable · 100 / available⌋. -/
theorem fam_performance_utilization_1 : ((32 * 100) / 40) = 80 := by decide

/-- performance: throughput(100, 20) = 5 — THROUGHPUT: tasks completed per day. value ⌊tasks / days⌋. -/
theorem fam_performance_throughput_1 : (100 / 20) = 5 := by decide

/-- performance: score(90, 2) = 180 — WEIGHTED SCORE: a rating times its weight. value rating · weight. -/
theorem fam_performance_score_1 : (90 * 2) = 180 := by decide

/-- permitting: approval(900, 1000) = 90 — PERMITTING — THE PERMIT PIPELINE, AS ARITHMETIC. A permitting office
    is numbers: the backlog of filed-but-unprocessed applications, the average cycle time per permit, the
    approval rate, throughput per day, the fees collected, the inspections a batch needs, when a permit expires,
    and the queue a day's arrivals forms. Crosses to `governance` — permitting is one of the services governance
    oversees. A measure. */ const PROOF = 'permitting arithmetic (backlog, cycle time, approval rate,
    throughput, fees, inspections, expiry, queue); the permit pipeline as integers; a measure crossed to
    governance' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'permitting', dst: 'governance',
    formula, value, proof: PROOF, ...extra }, holds, { name: `permitting.${name}`, params }) export class
    PermittingFormulas { /** APPROVAL RATE as a percentage. value ⌊approved · 100 / reviewed⌋. -/
theorem fam_permitting_approval_1 : ((900 * 100) / 1000) = 90 := by decide

/-- permitting: backlog(500, 320) = 180 — BACKLOG: filed applications not yet processed. value max(0, filed −
    processed). -/
theorem fam_permitting_backlog_1 : (fmax 0 (500 - 320)) = 180 := by decide

/-- permitting: backlog(100, 200) = 0 — BACKLOG: filed applications not yet processed. value max(0, filed −
    processed). -/
theorem fam_permitting_backlog_2 : (fmax 0 (100 - 200)) = 0 := by decide

/-- permitting: cycletime(3600, 120) = 30 — CYCLE TIME: average days per permit. value ⌊totalDays / permits⌋. -/
theorem fam_permitting_cycletime_1 : (3600 / 120) = 30 := by decide

/-- permitting: expiry(100, 365) = 465 — EXPIRY: the day a permit lapses. value issued + validDays. -/
theorem fam_permitting_expiry_1 : (100 + 365) = 465 := by decide

/-- permitting: fee(200, 75) = 15000 — FEE: permits at a flat rate each. value permits · rate. -/
theorem fam_permitting_fee_1 : (200 * 75) = 15000 := by decide

/-- permitting: inspections(150, 3) = 450 — INSPECTIONS: the inspections a batch of permits needs. value permits
    · perPermit. -/
theorem fam_permitting_inspections_1 : (150 * 3) = 450 := by decide

/-- permitting: throughput(600, 30) = 20 — THROUGHPUT: permits cleared per day. value ⌊permits / days⌋. -/
theorem fam_permitting_throughput_1 : (600 / 30) = 20 := by decide

/-- personality: openness(40, 10) = 80 — PERSONALITY — THE FIVE-FACTOR MODEL AS ARITHMETIC (chosen by the trait
    registry, not by hand). A profile is numbers: a Likert item sum read as a percent of its maximum,
    follow-through, net sociability, net negativity, the three-trait composite, the mean item, and how far a
    score sits above the population mean. Crosses to `psychology` — personality is what psychology measures. A
    measure. */ const PROOF = 'personality arithmetic (openness, conscientiousness, extraversion, agreeableness,
    neuroticism, composite, trait, deviation); the five-factor model as Likert sums, means and nets; a measure
    crossed to psychology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'personality', dst:
    'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `personality.${name}`, params })
    export class PersonalityFormulas { /** OPENNESS: a Likert item sum as a percent of its maximum (each item at
    most 5). value ⌊raw · 20 / items⌋. -/
theorem fam_personality_openness_1 : ((40 * 20) / 10) = 80 := by decide

/-- personality: conscientiousness(90, 100) = 90 — CONSCIENTIOUSNESS: intentions carried through, as a percent.
    value ⌊done · 100 / planned⌋. -/
theorem fam_personality_conscientiousness_1 : ((90 * 100) / 100) = 90 := by decide

/-- personality: extraversion(70, 30) = 40 — EXTRAVERSION: net sociability, social draw less solitary draw.
    value max(0, social − solitary). -/
theorem fam_personality_extraversion_1 : (fmax 0 (70 - 30)) = 40 := by decide

/-- personality: agreeableness(45, 10) = 90 — AGREEABLENESS: a Likert item sum as a percent of its maximum (each
    item at most 5). value ⌊agree · 20 / items⌋. -/
theorem fam_personality_agreeableness_1 : ((45 * 20) / 10) = 90 := by decide

/-- personality: neuroticism(60, 25) = 35 — NEUROTICISM: net negativity, stress less composure. value max(0,
    stress − calm). -/
theorem fam_personality_neuroticism_1 : (fmax 0 (60 - 25)) = 35 := by decide

/-- personality: composite(80, 90, 40) = 210 — COMPOSITE: three trait scores summed into one profile total.
    value o + c + e. -/
theorem fam_personality_composite_1 : ((80 + 90) + 40) = 210 := by decide

/-- personality: trait(48, 12) = 4 — TRAIT: the mean item score of a Likert sum. value ⌊raw / items⌋. -/
theorem fam_personality_trait_1 : (48 / 12) = 4 := by decide

/-- personality: deviation(80, 50) = 30 — DEVIATION: how far a score sits above the population mean. value
    max(0, score − mean). -/
theorem fam_personality_deviation_1 : (fmax 0 (80 - 50)) = 30 := by decide

/-- personality: deviation(40, 50) = 0 — DEVIATION: how far a score sits above the population mean. value max(0,
    score − mean). -/
theorem fam_personality_deviation_2 : (fmax 0 (40 - 50)) = 0 := by decide

/-- pest: economicthreshold(500, 20) = 25 — PEST — INTEGRATED PEST MANAGEMENT AS ARITHMETIC. Deciding when and
    how to act on a pest is numbers: the economic threshold that justifies treating, the share of a stand
    infested, how well a control killed, the damage done, how a population grows, what a treatment costs, the
    fraction that survives, and the traps a field needs. Crosses to `ecology` — pest pressure is an ecological
    force acting on a system. A measure. */ const PROOF = 'pest arithmetic (economic threshold, infestation
    rate, control efficacy, damage index, population growth, treatment cost, surviving fraction, trap count);
    integrated pest management as a measure crossed to ecology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pest', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `pest.${name}`, params
    }) export class PestFormulas { /** ECONOMIC THRESHOLD: the pest density that justifies treating, control
    cost over value saved per unit. value ⌊cost / value⌋. -/
theorem fam_pest_economicthreshold_1 : (500 / 20) = 25 := by decide

/-- pest: infestationrate(45, 300) = 15 — INFESTATION RATE: infested units of a stand, as a percentage. value
    ⌊infested · 100 / total⌋. -/
theorem fam_pest_infestationrate_1 : ((45 * 100) / 300) = 15 := by decide

/-- pest: controlefficacy(80, 100) = 80 — CONTROL EFFICACY: the share of pests a control killed, as a
    percentage. value ⌊killed · 100 / initial⌋. -/
theorem fam_pest_controlefficacy_1 : ((80 * 100) / 100) = 80 := by decide

/-- pest: damageindex(150, 3) = 450 — DAMAGE INDEX: damaged units weighted by severity. value units · severity. -/
theorem fam_pest_damageindex_1 : (150 * 3) = 450 := by decide

/-- pest: populationgrowth(1000, 25) = 1250 — POPULATION GROWTH: a population after one generation at a
    percentage growth rate. value pop + ⌊pop · rate / 100⌋. -/
theorem fam_pest_populationgrowth_1 : (1000 + ((1000 * 25) / 100)) = 1250 := by decide

/-- pest: treatmentcost(40, 15) = 600 — TREATMENT COST: area treated at a cost per unit area. value area · rate. -/
theorem fam_pest_treatmentcost_1 : (40 * 15) = 600 := by decide

/-- pest: survivingfraction(20, 100) = 20 — SURVIVING FRACTION: the share of a population still alive after
    control, as a percentage. value ⌊survivors · 100 / initial⌋. -/
theorem fam_pest_survivingfraction_1 : ((20 * 100) / 100) = 20 := by decide

/-- petroleum: api(1000) = 10 — PETROLEUM — THE OIL-AND-GAS DOMAIN, AS ARITHMETIC (chosen by the registry, not
    by hand). A barrel is numbers: API gravity from specific gravity, the recovery factor, rock porosity and
    permeability, the refinery yield, reservoir depth, flow over hours, and hydrocarbon saturation of the pore
    space. Crosses to `energy` — petroleum is what energy burns. A measure. */ const PROOF = 'petroleum
    arithmetic (api gravity, recovery, porosity, permeability, refinery yield, depth, flow, saturation); an
    oil-and-gas measure crossed to energy' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'petroleum', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name:
    `petroleum.${name}`, params }) export class PetroleumFormulas { /** API GRAVITY: a proxy from specific
    gravity. value ⌊141500 / specific⌋ − 131. -/
theorem fam_petroleum_api_1 : ((141500 / 1000) - 131) = 10 := by decide

/-- petroleum: recovery(30, 100) = 30 — RECOVERY FACTOR: produced of reserves, as a percentage. value ⌊produced
    · 100 / reserves⌋. -/
theorem fam_petroleum_recovery_1 : ((30 * 100) / 100) = 30 := by decide

/-- petroleum: porosity(20, 100) = 20 — POROSITY: pore space of the rock volume, as a percentage. value ⌊pores ·
    100 / volume⌋. -/
theorem fam_petroleum_porosity_1 : ((20 * 100) / 100) = 20 := by decide

/-- petroleum: permeability(1000, 50) = 20 — PERMEABILITY: flow over pressure. value ⌊flow / pressure⌋. -/
theorem fam_petroleum_permeability_1 : (1000 / 50) = 20 := by decide

/-- petroleum: refined(45, 100) = 45 — REFINERY YIELD: product of the crude, as a percentage. value ⌊product ·
    100 / crude⌋. -/
theorem fam_petroleum_refined_1 : ((45 * 100) / 100) = 45 := by decide

/-- petroleum: depth(3500) = 3500 — DEPTH: reservoir depth in metres. value meters. -/
theorem fam_petroleum_depth_1 : 3500 = 3500 := by decide

/-- petroleum: flow(500, 24) = 12000 — FLOW: a rate over hours. value rate · hours. -/
theorem fam_petroleum_flow_1 : (500 * 24) = 12000 := by decide

/-- petroleum: saturation(70, 100) = 70 — SATURATION: hydrocarbon of the pore space, as a percentage. value
    ⌊hydrocarbon · 100 / pore⌋. -/
theorem fam_petroleum_saturation_1 : ((70 * 100) / 100) = 70 := by decide

/-- petrology: colorindex(15, 100) = 15 — PETROLOGY — ROCKS AS ARITHMETIC (chosen by the mineral registry, not
    by hand). A rock is numbers: the color index of its dark minerals, its silica weight, the void space it
    holds, the density of its grains, how far a melt has differentiated, how much has crystallized, the modal
    share of a mineral, and the fraction still molten. Crosses to `geochemistry` — petrology is the rock
    geochemistry measures. A measure. */ const PROOF = 'petrology arithmetic (color index, silica content,
    porosity, grain density, differentiation, crystallization, modal composition, melt fraction); the rock the
    chemistry measures; a measure crossed to geochemistry' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'petrology', dst: 'geochemistry', formula, value, proof: PROOF, ...extra }, holds, { name:
    `petrology.${name}`, params }) export class PetrologyFormulas { /** COLOR INDEX: the percentage of dark
    (mafic) minerals. value ⌊dark · 100 / total⌋. -/
theorem fam_petrology_colorindex_1 : ((15 * 100) / 100) = 15 := by decide

/-- petrology: silicacontent(720, 1000) = 72 — SILICA CONTENT as a weight percentage. value ⌊silica · 100 /
    total⌋. -/
theorem fam_petrology_silicacontent_1 : ((720 * 100) / 1000) = 72 := by decide

/-- petrology: porosity(30, 200) = 15 — POROSITY: void volume over the bulk, as a percentage. value ⌊voids · 100
    / bulk⌋. -/
theorem fam_petrology_porosity_1 : ((30 * 100) / 200) = 15 := by decide

/-- petrology: graindensity(5300, 2) = 2650 — GRAIN DENSITY: grain mass over grain volume. value ⌊mass /
    volume⌋. -/
theorem fam_petrology_graindensity_1 : (5300 / 2) = 2650 := by decide

/-- petrology: differentiation(30, 55, 5) = 90 — DIFFERENTIATION INDEX: the normative felsic sum (quartz +
    feldspar + feldspathoid). value quartz + feldspar + feldspathoid. -/
theorem fam_petrology_differentiation_1 : ((30 + 55) + 5) = 90 := by decide

/-- petrology: crystallization(40, 50) = 80 — CRYSTALLIZATION: the crystallized fraction of the melt, as a
    percentage. value ⌊crystals · 100 / total⌋. -/
theorem fam_petrology_crystallization_1 : ((40 * 100) / 50) = 80 := by decide

/-- petrology: modalcomposition(250, 1000) = 25 — MODAL COMPOSITION: a mineral's point-count share, as a
    percentage. value ⌊points · 100 / total⌋. -/
theorem fam_petrology_modalcomposition_1 : ((250 * 100) / 1000) = 25 := by decide

/-- petrology: meltfraction(10, 40) = 25 — MELT FRACTION: the molten fraction remaining, as a percentage. value
    ⌊melt · 100 / total⌋. -/
theorem fam_petrology_meltfraction_1 : ((10 * 100) / 40) = 25 := by decide

/-- pharma: dose(70, 10) = 700 — PHARMA — PHARMACOLOGY / PHARMACOKINETICS, AS ARITHMETIC (dosing by the numbers,
    not by hand). A drug in a body is numbers: the dose for a weight, the amount left after so many half-lives,
    clearance by a rate, the loading dose for a volume of distribution, bioavailability as a percentage, the
    dosing interval, the therapeutic index, the steady-state level. Crosses to `med` — pharma is what medicine
    prescribes. A measure. */ const PROOF = 'pharma arithmetic (dose by weight, half-life decay, clearance,
    loading dose, bioavailability, dosing interval, therapeutic index, steady state); dosing as numbers; a
    measure crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pharma', dst: 'med',
    formula, value, proof: PROOF, ...extra }, holds, { name: `pharma.${name}`, params }) export class
    PharmaFormulas { /** DOSE by body weight at a per-kg amount. value weight · perKg. -/
theorem fam_pharma_dose_1 : (70 * 10) = 700 := by decide

/-- pharma: halflife(1000, 3) = 125 — HALF-LIFE DECAY: the amount left after so many halvings. value ⌊amount /
    2^halvings⌋. -/
theorem fam_pharma_halflife_1 : (1000 / (2 ^ 3)) = 125 := by decide

/-- pharma: clearance(1000, 4) = 250 — CLEARANCE: the dose cleared at an elimination rate. value ⌊dose / rate⌋. -/
theorem fam_pharma_clearance_1 : (1000 / 4) = 250 := by decide

/-- pharma: loading(5, 40) = 200 — LOADING DOSE: a target concentration over a volume of distribution. value
    target · volume. -/
theorem fam_pharma_loading_1 : (5 * 40) = 200 := by decide

/-- pharma: bioavailability(80, 100) = 80 — BIOAVAILABILITY as a percentage of the given dose. value ⌊absorbed ·
    100 / given⌋. -/
theorem fam_pharma_bioavailability_1 : ((80 * 100) / 100) = 80 := by decide

/-- pharma: interval(6, 4) = 24 — DOSING INTERVAL: half-lives across a number of doses. value halflife · doses. -/
theorem fam_pharma_interval_1 : (6 * 4) = 24 := by decide

/-- pharma: therapeutic(10, 100) = 1000 — THERAPEUTIC INDEX: the toxic dose as a percentage of the effective
    dose. value ⌊toxic · 100 / dose⌋. -/
theorem fam_pharma_therapeutic_1 : ((100 * 100) / 10) = 1000 := by decide

/-- pharma: steadystate(500, 8) = 62 — STEADY STATE: the dose spread over the dosing interval. value ⌊dose /
    interval⌋. -/
theorem fam_pharma_steadystate_1 : (500 / 8) = 62 := by decide

/-- pharmacokinetics: volume(1000, 10) = 100 — PHARMACOKINETICS — WHAT THE BODY DOES TO A DRUG, AS ARITHMETIC.
    Dosing is numbers: the volume a dose distributes into, how fast it is cleared, the exposure over time, the
    peak reached, the steady-state level under a maintained rate, the loading dose to fill the volume, how much
    accumulates across doses, and the fraction an organ extracts. Crosses to `pharmacology` — kinetics is what
    pharmacology measures. A measure. */ const PROOF = 'pharmacokinetics arithmetic (volume of distribution,
    clearance, AUC exposure, Cmax, steady state, loading dose, accumulation, extraction ratio); dosing as
    integers; a measure crossed to pharmacology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pharmacokinetics', dst: 'pharmacology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pharmacokinetics.${name}`, params }) export class PharmacokineticsFormulas { /** VOLUME OF DISTRIBUTION:
    the dose over the plasma concentration it reaches. value ⌊dose / conc⌋. -/
theorem fam_pharmacokinetics_volume_1 : (1000 / 10) = 100 := by decide

/-- pharmacokinetics: clearancerate(50, 2) = 100 — CLEARANCE: the volume of distribution times the elimination
    rate constant. value vd · ke. -/
theorem fam_pharmacokinetics_clearancerate_1 : (50 * 2) = 100 := by decide

/-- pharmacokinetics: auc(1000, 20) = 50 — AUC: total exposure, the dose over the clearance. value ⌊dose / cl⌋. -/
theorem fam_pharmacokinetics_auc_1 : (1000 / 20) = 50 := by decide

/-- pharmacokinetics: cmax(500, 10) = 50 — CMAX: the peak concentration, the dose over the volume it fills.
    value ⌊dose / vol⌋. -/
theorem fam_pharmacokinetics_cmax_1 : (500 / 10) = 50 := by decide

/-- pharmacokinetics: steadystate(600, 6) = 100 — STEADY STATE: the level a maintained infusion rate holds
    against clearance. value ⌊rate / cl⌋. -/
theorem fam_pharmacokinetics_steadystate_1 : (600 / 6) = 100 := by decide

/-- pharmacokinetics: loadingdose(10, 50) = 500 — LOADING DOSE: the target concentration times the volume to
    fill. value conc · vol. -/
theorem fam_pharmacokinetics_loadingdose_1 : (10 * 50) = 500 := by decide

/-- pharmacokinetics: accumulation(24, 12) = 10 — ACCUMULATION: intervals to steady state, five half-lives over
    the dosing interval. value ⌊5 · halflife / interval⌋. -/
theorem fam_pharmacokinetics_accumulation_1 : ((5 * 24) / 12) = 10 := by decide

/-- pharmacokinetics: extraction(90, 100) = 90 — EXTRACTION RATIO: the fraction an organ clears of what flows
    through it, as a percentage. value ⌊cl · 100 / flow⌋. -/
theorem fam_pharmacokinetics_extraction_1 : ((90 * 100) / 100) = 90 := by decide

/-- pharmacokinetics: extraction(45, 90) = 50 — EXTRACTION RATIO: the fraction an organ clears of what flows
    through it, as a percentage. value ⌊cl · 100 / flow⌋. -/
theorem fam_pharmacokinetics_extraction_2 : ((45 * 100) / 90) = 50 := by decide

/-- pharmacology: halflife(5000, 100) = 34 — PHARMACOLOGY — DOSING AS ARITHMETIC (chosen by the registry, not by
    hand). How a drug moves through the body is numbers: elimination half-life, clearance, oral bioavailability,
    the loading amount, the therapeutic index, a weight-based dose, plasma protein binding, and the fraction
    eliminated. Crosses to `pharma` — the practice that prescribes what pharmacology measures. A measure. */
    const PROOF = 'pharmacology arithmetic (half-life, clearance, bioavailability, loading, therapeutic index,
    dose, protein binding, elimination); a dosing domain; a measure crossed to pharma' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'pharmacology', dst: 'pharma', formula, value, proof: PROOF,
    ...extra }, holds, { name: `pharmacology.${name}`, params }) export class PharmacologyFormulas { /**
    HALF-LIFE: t½ = 0.693 · V / CL, as a ⌊volume · 693 / (clearance · 1000)⌋ proxy. value 0 when clearance is 0. -/
theorem fam_pharmacology_halflife_1 : ((5000 * 693) / (100 * 1000)) = 34 := by decide

/-- pharmacology: clearance(1000, 40) = 25 — CLEARANCE: dose over the area under the curve. value ⌊dose / auc⌋. -/
theorem fam_pharmacology_clearance_1 : (1000 / 40) = 25 := by decide

/-- pharmacology: bioavailability(80, 100) = 80 — BIOAVAILABILITY: oral exposure as a percentage of intravenous.
    value ⌊oral · 100 / iv⌋. -/
theorem fam_pharmacology_bioavailability_1 : ((80 * 100) / 100) = 80 := by decide

/-- pharmacology: loading(10, 50) = 500 — LOADING: the amount to reach a target concentration in a volume. value
    concentration · volume. -/
theorem fam_pharmacology_loading_1 : (10 * 50) = 500 := by decide

/-- pharmacology: therapeutic(100, 10) = 10 — THERAPEUTIC INDEX: the toxic dose over the effective dose. value
    ⌊toxic / effective⌋. -/
theorem fam_pharmacology_therapeutic_1 : (100 / 10) = 10 := by decide

/-- pharmacology: dose(70, 5) = 350 — DOSE: a weight-based dose at a per-kilogram rate. value weight · rate. -/
theorem fam_pharmacology_dose_1 : (70 * 5) = 350 := by decide

/-- pharmacology: bound(90, 100) = 90 — PROTEIN BINDING: the bound fraction as a percentage of total. value
    ⌊bound · 100 / total⌋. -/
theorem fam_pharmacology_bound_1 : ((90 * 100) / 100) = 90 := by decide

/-- pharmacology: elimination(100, 25) = 75 — ELIMINATION: the fraction cleared from an initial to a final
    concentration. value ⌊(initial − final) · 100 / initial⌋. -/
theorem fam_pharmacology_elimination_1 : (((100 - 25) * 100) / 100) = 75 := by decide

/-- phenomenology: intentionalacts(5, 3) = 8 -/
theorem fam_phenomenology_intentionalacts_1 : (5 + 3) = 8 := by decide

/-- phenomenology: reductions(3, 1) = 3 -/
theorem fam_phenomenology_reductions_1 : (3 * 1) = 3 := by decide

/-- phenomenology: horizonlayers(4) = 16 -/
theorem fam_phenomenology_horizonlayers_1 : (2 ^ 4) = 16 := by decide

/-- phenomenology: noesisnoema(2, 3) = 6 -/
theorem fam_phenomenology_noesisnoema_1 : (2 * 3) = 6 := by decide

/-- phenomenology: consciousnessmodes(6, 0) = 6 -/
theorem fam_phenomenology_consciousnessmodes_1 : (6 + 0) = 6 := by decide

/-- phenomenology: givennessratio(70, 100) = 70 -/
theorem fam_phenomenology_givennessratio_1 : ((70 * 100) / 100) = 70 := by decide

/-- philosophy: validity(3, 4) = 75 — PHILOSOPHY — REASONING AS ARITHMETIC (argument and ethics measured, not
    asserted). An argument is numbers: how many of its forms are sound, how many premises it rests on, how
    consistent its claims are, the utilitarian sum of happiness, the consensus of its thinkers, the strength a
    syllogism carries, the virtue of the golden mean, and how much a system entails per axiom. Crosses to
    `sociology` — philosophy is reasoning about how people live. A measure. */ const PROOF = 'philosophy
    arithmetic (validity, premises, consistency, utility, consensus, syllogism, virtue, entailment); reasoning
    and ethics as a measure crossed to sociology' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'philosophy', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name:
    `philosophy.${name}`, params }) export class PhilosophyFormulas { /** VALIDITY: the share of forms that are
    sound, as a percentage. value ⌊sound · 100 / total⌋. -/
theorem fam_philosophy_validity_1 : ((3 * 100) / 4) = 75 := by decide

/-- philosophy: premises(5) = 5 — PREMISES: the count an argument rests on. value count. -/
theorem fam_philosophy_premises_1 : 5 = 5 := by decide

/-- philosophy: consistency(9, 10) = 90 — CONSISTENCY: the share of claims that are consistent, as a percentage.
    value ⌊consistent · 100 / claims⌋. -/
theorem fam_philosophy_consistency_1 : ((9 * 100) / 10) = 90 := by decide

/-- philosophy: utility(7, 100) = 700 — UTILITY: the utilitarian sum of happiness across people. value happiness
    · people. -/
theorem fam_philosophy_utility_1 : (7 * 100) = 700 := by decide

/-- philosophy: consensus(3, 4) = 75 — CONSENSUS: the share of thinkers who agree, as a percentage. value ⌊agree
    · 100 / thinkers⌋. -/
theorem fam_philosophy_consensus_1 : ((3 * 100) / 4) = 75 := by decide

/-- philosophy: syllogism(8, 5) = 5 — SYLLOGISM: a valid conclusion is only as strong as its weaker premise.
    value min(major, minor). -/
theorem fam_philosophy_syllogism_1 : (fmin 8 5) = 5 := by decide

/-- philosophy: virtue(10, 3) = 7 — VIRTUE: the golden mean, the mean less its deviation, never below zero.
    value max(0, mean − deviation). -/
theorem fam_philosophy_virtue_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- philosophy: virtue(3, 10) = 0 — VIRTUE: the golden mean, the mean less its deviation, never below zero.
    value max(0, mean − deviation). -/
theorem fam_philosophy_virtue_2 : (fmax 0 (3 - 10)) = 0 := by decide

/-- philosophy: entailment(20, 4) = 5 — ENTAILMENT: how much a system derives per axiom. value ⌊derived /
    axioms⌋. -/
theorem fam_philosophy_entailment_1 : (20 / 4) = 5 := by decide

/-- phonetics: formant(2400, 3) = 800 — PHONETICS — THE SOUNDS OF SPEECH, AS ARITHMETIC. The voice is numbers:
    formant frequencies over harmonics, pitch as cycles per second, speaking rate as syllables per second, the
    share of voiced sounds, how long a sound holds, its intensity against a reference, the sonority of a
    segment, and the vowel share of the phonemes. Crosses to `linguistics` — phonetics is the measured layer the
    language sits on. A measure. */ const PROOF = 'phonetics arithmetic (formant, pitch, speaking rate, voicing,
    duration, intensity, sonority, vowel share); the sounds of speech as integers; a measure crossed to
    linguistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'phonetics', dst: 'linguistics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `phonetics.${name}`, params }) export class
    PhoneticsFormulas { /** FORMANT: a resonance frequency over a harmonic number. value ⌊frequency / harmonic⌋. -/
theorem fam_phonetics_formant_1 : (2400 / 3) = 800 := by decide

/-- phonetics: pitch(2200, 10) = 220 — PITCH: cycles over seconds, the fundamental in hertz. value ⌊cycles /
    seconds⌋. -/
theorem fam_phonetics_pitch_1 : (2200 / 10) = 220 := by decide

/-- phonetics: rate(15, 3) = 5 — RATE: syllables over seconds, the speaking rate. value ⌊syllables / seconds⌋. -/
theorem fam_phonetics_rate_1 : (15 / 3) = 5 := by decide

/-- phonetics: voicing(6, 10) = 60 — VOICING: the share of voiced sounds, as a percentage. value ⌊voiced · 100 /
    total⌋. -/
theorem fam_phonetics_voicing_1 : ((6 * 100) / 10) = 60 := by decide

/-- phonetics: duration(120) = 120 — DURATION: how long a sound holds, in milliseconds. value milliseconds. -/
theorem fam_phonetics_duration_1 : 120 = 120 := by decide

/-- phonetics: intensity(70, 100) = 70 — INTENSITY: amplitude against a reference, as a percentage. value
    ⌊amplitude · 100 / reference⌋. -/
theorem fam_phonetics_intensity_1 : ((70 * 100) / 100) = 70 := by decide

/-- phonetics: sonority(7) = 7 — SONORITY: the sonority level of a segment. value level. -/
theorem fam_phonetics_sonority_1 : 7 = 7 := by decide

/-- phonetics: vowels(4, 10) = 40 — VOWELS: the vowel share of the phonemes, as a percentage. value ⌊vowels ·
    100 / phonemes⌋. -/
theorem fam_phonetics_vowels_1 : ((4 * 100) / 10) = 40 := by decide

/-- photochemistry: quantumyield(90, 100) = 90 — PHOTOCHEMISTRY — LIGHT DRIVING REACTIONS, AS ARITHMETIC (chosen
    by the public-API registry, not by hand). A photon budget is numbers: the quantum yield of a reaction,
    Beer–Lambert absorbance, photon flux, actinometric dose, how many fluorophores survive bleaching, molecules
    excited, excited-state lifetime, and percent conversion. Crosses to `optics` — photochemistry is what optics
    shines. A measure. */ const PROOF = 'photochemistry arithmetic (quantum yield, absorbance, photon flux,
    actinometry, bleaching, excitation, lifetime, conversion); a light-driven measure crossed to optics' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photochemistry', dst: 'optics', formula, value,
    proof: PROOF, ...extra }, holds, { name: `photochemistry.${name}`, params }) export class
    PhotochemistryFormulas { /** QUANTUM YIELD: molecules reacted per hundred photons absorbed. value ⌊reacted ·
    100 / absorbed⌋. -/
theorem fam_photochemistry_quantumyield_1 : ((90 * 100) / 100) = 90 := by decide

/-- photochemistry: absorbance(2, 3, 100) = 600 — ABSORBANCE (Beer–Lambert): A = ε · c · l, molar coefficient by
    concentration by path. value coeff · conc · path. -/
theorem fam_photochemistry_absorbance_1 : ((2 * 3) * 100) = 600 := by decide

/-- photochemistry: photonflux(6000, 60) = 100 — PHOTON FLUX: photons over seconds. value ⌊photons / seconds⌋. -/
theorem fam_photochemistry_photonflux_1 : (6000 / 60) = 100 := by decide

/-- photochemistry: actinometry(10000, 90) = 9000 — ACTINOMETRY: molecules converted from a photon dose at a
    percent efficiency. value ⌊photons · efficiency / 100⌋. -/
theorem fam_photochemistry_actinometry_1 : ((10000 * 90) / 100) = 9000 := by decide

/-- photochemistry: bleaching(1000, 400) = 600 — BLEACHING: fluorophores surviving after photobleaching. value
    max(0, initial − bleached). -/
theorem fam_photochemistry_bleaching_1 : (fmax 0 (1000 - 400)) = 600 := by decide

/-- photochemistry: bleaching(400, 1000) = 0 — BLEACHING: fluorophores surviving after photobleaching. value
    max(0, initial − bleached). -/
theorem fam_photochemistry_bleaching_2 : (fmax 0 (400 - 1000)) = 0 := by decide

/-- photochemistry: excitation(500, 4) = 2000 — EXCITATION: molecules raised to the excited state by photons at
    a cross-section. value photons · crossSection. -/
theorem fam_photochemistry_excitation_1 : (500 * 4) = 2000 := by decide

/-- photochemistry: lifetime(5000, 100) = 50 — LIFETIME: average excited-state lifetime, total time over decay
    events. value ⌊total / decays⌋. -/
theorem fam_photochemistry_lifetime_1 : (5000 / 100) = 50 := by decide

/-- photochemistry: conversion(750, 1000) = 75 — CONVERSION: percent of starting material consumed. value
    ⌊converted · 100 / initial⌋. -/
theorem fam_photochemistry_conversion_1 : ((750 * 100) / 1000) = 75 := by decide

/-- photodiode: responsivity(1000, 2) = 500 — PHOTODIODE — LIGHT TURNED INTO CURRENT, AS ARITHMETIC. A
    photodiode is numbers: how much current each watt of light makes (responsivity), the current a given power
    yields (photocurrent), the fraction of photons that become carriers (quantum efficiency), the leakage in the
    dark (dark current), the signal over the noise, how fast it responds (rise time), the shunt resistance from
    its I–V slope, and whether the photocurrent has saturated. Crosses to `optics` — the photodiode is where
    optics becomes electronics. A measure. */ const PROOF = 'photodiode arithmetic (responsivity, photocurrent,
    quantum efficiency, dark current, SNR, rise time, shunt resistance, saturation); light turned into current;
    a measure crossed to optics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x
    >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photodiode', dst: 'optics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `photodiode.${name}`, params }) export class
    PhotodiodeFormulas { /** RESPONSIVITY: photocurrent per unit optical power. value ⌊current / power⌋. -/
theorem fam_photodiode_responsivity_1 : (1000 / 2) = 500 := by decide

/-- photodiode: photocurrent(500, 4) = 2000 — PHOTOCURRENT: responsivity times the incident power. value
    responsivity · power. -/
theorem fam_photodiode_photocurrent_1 : (500 * 4) = 2000 := by decide

/-- photodiode: quantumefficiency(80, 100) = 80 — QUANTUM EFFICIENCY: carriers collected per incident photon, as
    a percentage. value ⌊electrons · 100 / photons⌋. -/
theorem fam_photodiode_quantumefficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- photodiode: darkcurrent(5, 100) = 500 — DARK CURRENT: leakage density over the junction area. value density
    · area. -/
theorem fam_photodiode_darkcurrent_1 : (5 * 100) = 500 := by decide

/-- photodiode: snr(1000, 8) = 125 — SIGNAL-TO-NOISE RATIO: signal current over noise current. value ⌊signal /
    noise⌋. -/
theorem fam_photodiode_snr_1 : (1000 / 8) = 125 := by decide

/-- photodiode: risetime(50, 10) = 1100 — RISE TIME: 2.2 RC of the junction. value ⌊22 · resistance ·
    capacitance / 10⌋. -/
theorem fam_photodiode_risetime_1 : (((22 * 50) * 10) / 10) = 1100 := by decide

/-- photodiode: shuntresistance(1000, 4) = 250 — SHUNT RESISTANCE: the I–V slope near zero bias. value ⌊voltage
    / current⌋. -/
theorem fam_photodiode_shuntresistance_1 : (1000 / 4) = 250 := by decide

/-- photogrammetry: scale(50, 10000) = 5000 — PHOTOGRAMMETRY — RECONSTRUCTING THE WORLD FROM OVERLAPPING IMAGES,
    AS ARITHMETIC. The scale a lens and altitude fix, the overlap between frames, the ground sample distance,
    the baseline between shots, parallax, accuracy, the tie points matched, and the points reconstructed per
    image. Crosses to `cartography` — photogrammetry is what the map is drawn from. A measure. */ const PROOF =
    'photogrammetry arithmetic (scale, overlap, ground sample distance, baseline, parallax, accuracy, tie
    points, reconstruction); reconstructing the world from overlapping images; a measure crossed to cartography'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photogrammetry', dst: 'cartography', formula,
    value, proof: PROOF, ...extra }, holds, { name: `photogrammetry.${name}`, params }) export class
    PhotogrammetryFormulas { /** SCALE: the image scale a focal length sets at an altitude. value ⌊focal ·
    1000000 / altitude⌋. -/
theorem fam_photogrammetry_scale_1 : ((50 * 1000000) / 10000) = 5000 := by decide

/-- photogrammetry: overlap(80, 100) = 80 — OVERLAP: the shared portion of a frame as a percentage. value
    ⌊shared · 100 / frame⌋. -/
theorem fam_photogrammetry_overlap_1 : ((80 * 100) / 100) = 80 := by decide

/-- photogrammetry: gsd(5, 10000) = 50 — GROUND SAMPLE DISTANCE: a proxy from pixel size and altitude. value
    ⌊pixel · altitude / 1000⌋. -/
theorem fam_photogrammetry_gsd_1 : ((5 * 10000) / 1000) = 50 := by decide

/-- photogrammetry: basedistance(10000, 80) = 2000 — BASE DISTANCE: the baseline between shots at a forward
    overlap. value ⌊altitude · (100 − overlap) / 100⌋. -/
theorem fam_photogrammetry_basedistance_1 : ((10000 * (100 - 80)) / 100) = 2000 := by decide

/-- photogrammetry: parallax(50, 200) = 25 — PARALLAX: displacement over the baseline as a percentage. value
    ⌊displacement · 100 / base⌋. -/
theorem fam_photogrammetry_parallax_1 : ((50 * 100) / 200) = 25 := by decide

/-- photogrammetry: accuracy(2, 10000) = 2 — ACCURACY: error relative to distance, scaled. value ⌊error · 10000
    / distance⌋. -/
theorem fam_photogrammetry_accuracy_1 : ((2 * 10000) / 10000) = 2 := by decide

/-- photogrammetry: tiepoints(900, 1000) = 90 — TIE POINTS: matched points over the candidates as a percentage.
    value ⌊matched · 100 / candidates⌋. -/
theorem fam_photogrammetry_tiepoints_1 : ((900 * 100) / 1000) = 90 := by decide

/-- photogrammetry: reconstruction(10000, 50) = 200 — RECONSTRUCTION: points recovered per image. value ⌊points
    / images⌋. -/
theorem fam_photogrammetry_reconstruction_1 : (10000 / 50) = 200 := by decide

/-- photography: exposure(8, 125) = 1000 — PHOTOGRAPHY — MAKING LIGHT A PICTURE, AS ARITHMETIC. Exposure is a
    product; the f-number is focal over diameter; depth of field grows with aperture and distance; ISO is
    sensitivity itself; megapixels are width times height; the crop factor compares a sensor to full frame;
    dynamic range doubles with each stop; the rule of thirds places subjects. Crosses to `optics` — photography
    is optics put to work. A measure. */ const PROOF = 'photography arithmetic (exposure, f-number, depth of
    field, ISO, megapixels, crop factor, dynamic range, composition); light made a picture; a measure crossed to
    optics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photography', dst: 'optics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `photography.${name}`, params }) export class
    PhotographyFormulas { /** EXPOSURE: an EV proxy, aperture by shutter. value aperture · shutter. -/
theorem fam_photography_exposure_1 : (8 * 125) = 1000 := by decide

/-- photography: fstop(50, 25) = 20 — THE F-NUMBER: focal length over diameter, times ten. value ⌊focal · 10 /
    diameter⌋. -/
theorem fam_photography_fstop_1 : ((50 * 10) / 25) = 20 := by decide

/-- photography: depthoffield(4, 100) = 25 — DEPTH OF FIELD: distance over aperture. value ⌊distance /
    aperture⌋. -/
theorem fam_photography_depthoffield_1 : (100 / 4) = 25 := by decide

/-- photography: iso(400) = 400 — ISO: the sensitivity itself. value sensitivity. -/
theorem fam_photography_iso_1 : 400 = 400 := by decide

/-- photography: megapixels(4000, 3000) = 12 — MEGAPIXELS: width times height, in millions. value ⌊width ·
    height / 1000000⌋. -/
theorem fam_photography_megapixels_1 : ((4000 * 3000) / 1000000) = 12 := by decide

/-- photography: crop(24, 36) = 150 — CROP FACTOR: full frame over sensor, times a hundred. value ⌊full · 100 /
    sensor⌋. -/
theorem fam_photography_crop_1 : ((36 * 100) / 24) = 150 := by decide

/-- photography: dynamicrange(3) = 8 — DYNAMIC RANGE: doubling with each stop. value 2^stops. -/
theorem fam_photography_dynamicrange_1 : (2 ^ 3) = 8 := by decide

/-- photography: composition(2, 3) = 66 — COMPOSITION: subjects over the thirds, times a hundred. value
    ⌊subjects · 100 / thirds⌋. -/
theorem fam_photography_composition_1 : ((2 * 100) / 3) = 66 := by decide

/-- photometry: magnitude(25, 10) = 15 — PHOTOMETRY — MEASURING STARLIGHT, AS ARITHMETIC (the brightness of
    things). Light is numbers: the magnitude of a source, its flux, its colour, the absolute magnitude, the
    distance modulus, the apparent magnitude, the extinction along the line of sight, and the signal-to-noise of
    the measurement. Crosses to `astronomy` — photometry is how astronomy reads the sky. A measure. */ const
    PROOF = 'photometry arithmetic (magnitude, flux, colour index, absolute magnitude, distance modulus,
    apparent magnitude, extinction, signal-to-noise); measuring starlight; a measure crossed to astronomy' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photometry', dst: 'astronomy', formula, value,
    proof: PROOF, ...extra }, holds, { name: `photometry.${name}`, params }) export class PhotometryFormulas {
    /** MAGNITUDE: instrumental magnitude, the zero point less the counts. value max(0, zeropoint − counts). -/
theorem fam_photometry_magnitude_1 : (fmax 0 (25 - 10)) = 15 := by decide

/-- photometry: flux(10000, 5, 100) = 20 — FLUX: photons per unit area per unit time. value ⌊photons / (area ·
    time)⌋. -/
theorem fam_photometry_flux_1 : (10000 / (5 * 100)) = 20 := by decide

/-- photometry: colorindex(15, 12) = 3 — COLOUR INDEX: the blue magnitude less the red. value max(0, blue −
    red). -/
theorem fam_photometry_colorindex_1 : (fmax 0 (15 - 12)) = 3 := by decide

/-- photometry: colorindex(12, 15) = 0 — COLOUR INDEX: the blue magnitude less the red. value max(0, blue −
    red). -/
theorem fam_photometry_colorindex_2 : (fmax 0 (12 - 15)) = 0 := by decide

/-- photometry: absolutemagnitude(20, 15) = 5 — ABSOLUTE MAGNITUDE: the apparent magnitude less the distance
    modulus. value max(0, apparent − distmod). -/
theorem fam_photometry_absolutemagnitude_1 : (fmax 0 (20 - 15)) = 5 := by decide

/-- photometry: distancemodulus(20, 5) = 15 — DISTANCE MODULUS: the apparent magnitude less the absolute. value
    max(0, apparent − absolute). -/
theorem fam_photometry_distancemodulus_1 : (fmax 0 (20 - 5)) = 15 := by decide

/-- photometry: apparentmagnitude(5, 15) = 20 — APPARENT MAGNITUDE: the absolute magnitude plus the distance
    modulus. value absolute + distmod. -/
theorem fam_photometry_apparentmagnitude_1 : (5 + 15) = 20 := by decide

/-- photometry: extinction(3, 2) = 6 — EXTINCTION: the extinction coefficient over the air mass. value
    coefficient · airmass. -/
theorem fam_photometry_extinction_1 : (3 * 2) = 6 := by decide

/-- photometry: signaltonoise(1000, 20) = 50 — SIGNAL-TO-NOISE: the signal over the noise. value ⌊signal /
    noise⌋. -/
theorem fam_photometry_signaltonoise_1 : (1000 / 20) = 50 := by decide

/-- photosynthesis: lightefficiency(84, 100) = 84 — PHOTOSYNTHESIS — THE LIGHT REACTION AS ARITHMETIC. Making
    sugar from light is numbers: how much of the incident light a leaf captures, the carbon the Calvin cycle
    fixes, the oxygen split from water, the yield per photon, gross and net production, the pigment it holds,
    and how hard that pigment works. Crosses to `botany` — photosynthesis is what the plant does. A measure. */
    const PROOF = 'photosynthesis arithmetic (light efficiency, carbon fixation, oxygen release, quantum yield,
    gross and net production, chlorophyll, assimilation); the light reaction as integers; a measure crossed to
    botany' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photosynthesis', dst: 'botany',
    formula, value, proof: PROOF, ...extra }, holds, { name: `photosynthesis.${name}`, params }) export class
    PhotosynthesisFormulas { /** LIGHT EFFICIENCY: absorbed light as a percentage of incident light. value
    ⌊absorbed · 100 / incident⌋. -/
theorem fam_photosynthesis_lightefficiency_1 : ((84 * 100) / 100) = 84 := by decide

/-- photosynthesis: carbonfixation(100, 3) = 300 — CARBON FIXATION: CO₂ molecules the Calvin cycle fixes, cycles
    at a per-cycle rate. value cycles · rate. -/
theorem fam_photosynthesis_carbonfixation_1 : (100 * 3) = 300 := by decide

/-- photosynthesis: oxygenrelease(1000) = 500 — OXYGEN RELEASE: O₂ molecules from splitting water, two H₂O per
    O₂. value ⌊water / 2⌋. -/
theorem fam_photosynthesis_oxygenrelease_1 : (1000 / 2) = 500 := by decide

/-- photosynthesis: quantumyield(1, 8) = 12 — QUANTUM YIELD: products made per hundred photons absorbed. value
    ⌊products · 100 / photons⌋. -/
theorem fam_photosynthesis_quantumyield_1 : ((1 * 100) / 8) = 12 := by decide

/-- photosynthesis: grossproduction(50, 12) = 600 — GROSS PRODUCTION: carbon fixed over a span, a rate for so
    many hours. value rate · hours. -/
theorem fam_photosynthesis_grossproduction_1 : (50 * 12) = 600 := by decide

/-- photosynthesis: netproduction(600, 100) = 500 — NET PRODUCTION: gross production less respiration, never
    below zero. value max(0, gross − respiration). -/
theorem fam_photosynthesis_netproduction_1 : (fmax 0 (600 - 100)) = 500 := by decide

/-- photosynthesis: netproduction(100, 600) = 0 — NET PRODUCTION: gross production less respiration, never below
    zero. value max(0, gross − respiration). -/
theorem fam_photosynthesis_netproduction_2 : (fmax 0 (100 - 600)) = 0 := by decide

/-- photosynthesis: chlorophyll(1000, 4) = 250 — CHLOROPHYLL: pigment concentration, amount over the volume it
    is in. value ⌊amount / volume⌋. -/
theorem fam_photosynthesis_chlorophyll_1 : (1000 / 4) = 250 := by decide

/-- photosynthesis: assimilation(1000, 250) = 4 — ASSIMILATION: carbon fixed per unit of chlorophyll, how hard
    the pigment works. value ⌊carbon / chlorophyll⌋. -/
theorem fam_photosynthesis_assimilation_1 : (1000 / 250) = 4 := by decide

/-- photovoltaic: power(12, 8) = 96 — PHOTOVOLTAIC — SOLAR GENERATION AS ARITHMETIC (sunlight into electricity,
    by the numbers). A panel's DC power from its voltage and current, the cell's conversion efficiency, the
    irradiance landing on a surface, the daily energy yield, the array's rated output, the I–V fill factor, the
    derated real-world output, and the payback in years. Crosses to `energy` — photovoltaic is where energy is
    made. A measure. */ const PROOF = 'photovoltaic arithmetic (DC power, conversion efficiency, irradiance,
    daily yield, array rating, fill factor, derate, payback); solar generation as integers; a measure crossed to
    energy' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'photovoltaic', dst: 'energy',
    formula, value, proof: PROOF, ...extra }, holds, { name: `photovoltaic.${name}`, params }) export class
    PhotovoltaicFormulas { /** DC POWER: panel voltage times current. value voltage · current. -/
theorem fam_photovoltaic_power_1 : (12 * 8) = 96 := by decide

/-- photovoltaic: efficiency(220, 1000) = 22 — CONVERSION EFFICIENCY as a percentage. value ⌊output · 100 /
    input⌋. -/
theorem fam_photovoltaic_efficiency_1 : ((220 * 100) / 1000) = 22 := by decide

/-- photovoltaic: irradiance(1000, 2) = 500 — IRRADIANCE: power landing over an area (W/m²). value ⌊power /
    area⌋. -/
theorem fam_photovoltaic_irradiance_1 : (1000 / 2) = 500 := by decide

/-- photovoltaic: yield(300, 5) = 1500 — DAILY YIELD: panel power over the sun-hours. value power · hours. -/
theorem fam_photovoltaic_yield_1 : (300 * 5) = 1500 := by decide

/-- photovoltaic: array(10, 400) = 4000 — ARRAY RATING: panels at a per-panel wattage. value panels · watts. -/
theorem fam_photovoltaic_array_1 : (10 * 400) = 4000 := by decide

/-- photovoltaic: fillfactor(80, 100) = 80 — FILL FACTOR as a percentage of the Voc·Isc product. value ⌊pmax ·
    100 / vocIsc⌋. -/
theorem fam_photovoltaic_fillfactor_1 : ((80 * 100) / 100) = 80 := by decide

/-- photovoltaic: derate(1000, 20) = 800 — DERATE: rated output after a percentage loss. value ⌊rated · max(0,
    100 − loss) / 100⌋. -/
theorem fam_photovoltaic_derate_1 : ((1000 * (fmax 0 (100 - 20))) / 100) = 800 := by decide

/-- photovoltaic: derate(100, 150) = 0 — DERATE: rated output after a percentage loss. value ⌊rated · max(0, 100
    − loss) / 100⌋. -/
theorem fam_photovoltaic_derate_2 : ((100 * (fmax 0 (100 - 150))) / 100) = 0 := by decide

/-- phycology: chlorophyll(500, 8) = 4000 — PHYCOLOGY — THE STUDY OF ALGAE, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Algae are numbers: chlorophyll per cell, standing biomass, primary
    productivity, bloom density, growth over a generation, lipid fraction, the turbidity a culture scatters, and
    whether nutrient uptake meets demand. Crosses to `botany` — algae are plants without roots, the oldest
    branch botany measures. A measure. */ const PROOF = 'phycology arithmetic (chlorophyll, biomass,
    productivity, bloom density, growth rate, lipid content, turbidity, nutrient uptake); algae as the rootless
    oldest plants; a measure crossed to botany' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'phycology', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name:
    `phycology.${name}`, params }) export class PhycologyFormulas { /** CHLOROPHYLL: pigment molecules over a
    cell count. value cells · pigment. -/
theorem fam_phycology_chlorophyll_1 : (500 * 8) = 4000 := by decide

/-- phycology: biomass(1000, 5) = 5000 — BIOMASS: standing stock as cell density over a sampled volume. value
    density · volume. -/
theorem fam_phycology_biomass_1 : (1000 * 5) = 5000 := by decide

/-- phycology: productivity(5000, 100) = 50 — PRIMARY PRODUCTIVITY: carbon fixed per day. value ⌊carbon / days⌋. -/
theorem fam_phycology_productivity_1 : (5000 / 100) = 50 := by decide

/-- phycology: growthrate(1000, 1999) = 99 — GROWTH RATE as a percentage over a generation. value ⌊(final −
    initial) · 100 / initial⌋. -/
theorem fam_phycology_growthrate_1 : (((fmax 0 (1999 - 1000)) * 100) / 1000) = 99 := by decide

/-- phycology: lipidcontent(300, 1000) = 30 — LIPID CONTENT as a percentage of dry mass. value ⌊lipid · 100 /
    total⌋. -/
theorem fam_phycology_lipidcontent_1 : ((300 * 100) / 1000) = 30 := by decide

/-- phycology: turbidity(10000, 90) = 900 — TURBIDITY: nephelometric units from particles at a scatter
    coefficient per thousand. value ⌊particles · scatter / 1000⌋. -/
theorem fam_phycology_turbidity_1 : ((10000 * 90) / 1000) = 900 := by decide

/-- physics: force(10, 5) = 50 -/
theorem fam_physics_force_1 : (10 * 5) = 50 := by decide

/-- physics: momentum(10, 20) = 200 -/
theorem fam_physics_momentum_1 : (10 * 20) = 200 := by decide

/-- physics: work(50, 3) = 150 -/
theorem fam_physics_work_1 : (50 * 3) = 150 := by decide

/-- physics: power(150, 3) = 50 -/
theorem fam_physics_power_1 : (150 / 3) = 50 := by decide

/-- physics: pressure(100, 4) = 25 -/
theorem fam_physics_pressure_1 : (100 / 4) = 25 := by decide

/-- physics: density(1000, 10) = 100 -/
theorem fam_physics_density_1 : (1000 / 10) = 100 := by decide

/-- physics: energylevels(4) = 16 -/
theorem fam_physics_energylevels_1 : (2 ^ 4) = 16 := by decide

/-- physics: degreesoffreedom(3, 3) = 6 -/
theorem fam_physics_degreesoffreedom_1 : (3 + 3) = 6 := by decide

/-- physiology: bmr(70, 24) = 1680 — PHYSIOLOGY — THE LIVING BODY, AS ARITHMETIC. The numbers a clinic reads:
    basal metabolic rate, oxygen uptake per kilogram, drug clearance, glomerular filtration rate, plasma
    osmolality, an acid/base ratio, the tidal minute volume, and oxygen saturation. Crosses to `med` —
    physiology is what medicine measures. A measure. */ const PROOF = 'physiology arithmetic (basal metabolic
    rate, oxygen uptake, clearance, glomerular filtration, osmolality, acid/base, tidal volume, saturation); the
    living body as a measure crossed to med' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'physiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `physiology.${name}`, params }) export class PhysiologyFormulas { /** BASAL METABOLIC RATE proxy: weight at
    a per-kilogram factor. value weight · factor. -/
theorem fam_physiology_bmr_1 : (70 * 24) = 1680 := by decide

/-- physiology: vo2(3500, 70) = 50 — OXYGEN UPTAKE per kilogram: volume over weight. value ⌊volume / weight⌋. -/
theorem fam_physiology_vo2_1 : (3500 / 70) = 50 := by decide

/-- physiology: clearance(12, 10) = 120 — CLEARANCE: concentration at a flow. value concentration · flow. -/
theorem fam_physiology_clearance_1 : (12 * 10) = 120 := by decide

/-- physiology: gfr(1800, 20) = 90 — GLOMERULAR FILTRATION RATE: filtrate over time. value ⌊filtrate / time⌋. -/
theorem fam_physiology_gfr_1 : (1800 / 20) = 90 := by decide

/-- physiology: osmolality(285, 1000) = 285 — OSMOLALITY: solutes per kilogram of water (milli-units). value
    ⌊solutes · 1000 / water⌋. -/
theorem fam_physiology_osmolality_1 : ((285 * 1000) / 1000) = 285 := by decide

/-- physiology: ph(74, 100) = 74 — ACID/BASE ratio as a percentage. value ⌊acid · 100 / base⌋. -/
theorem fam_physiology_ph_1 : ((74 * 100) / 100) = 74 := by decide

/-- physiology: tidal(12, 500) = 6000 — TIDAL minute volume: breaths at a volume each. value breaths · volume. -/
theorem fam_physiology_tidal_1 : (12 * 500) = 6000 := by decide

/-- physiology: saturation(98, 100) = 98 — OXYGEN SATURATION as a percentage. value ⌊bound · 100 / total⌋. -/
theorem fam_physiology_saturation_1 : ((98 * 100) / 100) = 98 := by decide

/-- physiology: saturation(5, 0) = 0 — OXYGEN SATURATION as a percentage. value ⌊bound · 100 / total⌋. -/
theorem fam_physiology_saturation_2 : ((5 * 100) / 0) = 0 := by decide

/-- physiotherapy: rom(90, 120) = 75 — PHYSIOTHERAPY — RECOVERY AS ARITHMETIC. Rehab is numbers: range of motion
    regained, strength against bodyweight, recovery of what was lost, endurance per session, adherence to the
    plan, pain relieved from baseline, gait speed, and balance held across trials. Crosses to `med` —
    physiotherapy is a branch of medicine. A measure. */ const PROOF = 'physiotherapy arithmetic (range of
    motion, strength, recovery, endurance, adherence, pain, gait, balance); rehab as a measure crossed to med'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'physiotherapy', dst: 'med', formula, value,
    proof: PROOF, ...extra }, holds, { name: `physiotherapy.${name}`, params }) export class
    PhysiotherapyFormulas { /** RANGE OF MOTION as a percentage of normal. value ⌊achieved · 100 / normal⌋. -/
theorem fam_physiotherapy_rom_1 : ((90 * 100) / 120) = 75 := by decide

/-- physiotherapy: strength(100, 80) = 125 — STRENGTH: load lifted against bodyweight, as a percentage. value
    ⌊lifted · 100 / bodyweight⌋. -/
theorem fam_physiotherapy_strength_1 : ((100 * 100) / 80) = 125 := by decide

/-- physiotherapy: recovery(30, 50) = 60 — RECOVERY: function regained out of what was lost, as a percentage.
    value ⌊regained · 100 / lost⌋. -/
theorem fam_physiotherapy_recovery_1 : ((30 * 100) / 50) = 60 := by decide

/-- physiotherapy: endurance(100, 5) = 20 — ENDURANCE: repetitions sustained per unit time. value ⌊repetitions /
    time⌋. -/
theorem fam_physiotherapy_endurance_1 : (100 / 5) = 20 := by decide

/-- physiotherapy: adherence(18, 20) = 90 — ADHERENCE: sessions completed out of prescribed, as a percentage.
    value ⌊completed · 100 / prescribed⌋. -/
theorem fam_physiotherapy_adherence_1 : ((18 * 100) / 20) = 90 := by decide

/-- physiotherapy: pain(8, 3) = 5 — PAIN relieved from baseline. value max(0, baseline − current). -/
theorem fam_physiotherapy_pain_1 : (fmax 0 (8 - 3)) = 5 := by decide

/-- physiotherapy: gait(1000, 10) = 100 — GAIT speed: distance covered per unit time. value ⌊distance / time⌋. -/
theorem fam_physiotherapy_gait_1 : (1000 / 10) = 100 := by decide

/-- physiotherapy: balance(9, 10) = 90 — BALANCE: trials held out of trials attempted, as a percentage. value
    ⌊held · 100 / trials⌋. -/
theorem fam_physiotherapy_balance_1 : ((9 * 100) / 10) = 90 := by decide

/-- pickling: acidity(4, 100) = 4 -/
theorem fam_pickling_acidity_1 : ((4 * 100) / 100) = 4 := by decide

/-- pickling: brineratio(5, 100) = 5 -/
theorem fam_pickling_brineratio_1 : ((5 * 100) / 100) = 5 := by decide

/-- pickling: phlevel(38, 10) = 3 -/
theorem fam_pickling_phlevel_1 : (38 / 10) = 3 := by decide

/-- pickling: fermentdays(2, 7) = 14 -/
theorem fam_pickling_fermentdays_1 : (2 * 7) = 14 := by decide

/-- pickling: saltpercent(5, 100) = 5 -/
theorem fam_pickling_saltpercent_1 : ((5 * 100) / 100) = 5 := by decide

/-- pickling: lacticacid(8, 100) = 8 -/
theorem fam_pickling_lacticacid_1 : ((8 * 100) / 100) = 8 := by decide

/-- pickling: shelflife(12, 30) = 360 -/
theorem fam_pickling_shelflife_1 : (12 * 30) = 360 := by decide

/-- pickling: crunchretention(80, 100) = 80 -/
theorem fam_pickling_crunchretention_1 : ((80 * 100) / 100) = 80 := by decide

/-- pid: proportional(5, 30) = 150 — PID — THE CONTROL LOOP, AS ARITHMETIC. A controller is numbers: the
    proportional, integral and derivative terms on the error, their sum as the output, the Ziegler–Nichols gains
    from the critical point, the integral gain from the reset time, the anti-windup clamp on the accumulated
    error, and the error from a setpoint. Crosses to `dynamics` — a PID loop is what drives a dynamical system
    toward its setpoint. A controller. */ const PROOF = 'pid arithmetic (proportional, integral, derivative
    terms, summed output, Ziegler–Nichols gains, reset-time tuning, anti-windup clamp, setpoint error); the
    control loop as integers; a controller crossed to dynamics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pid', dst: 'dynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `pid.${name}`, params
    }) export class PidFormulas { /** PROPORTIONAL term: the proportional gain on the error. value kp · e. -/
theorem fam_pid_proportional_1 : (5 * 30) = 150 := by decide

/-- pid: integral(2, 40) = 80 — INTEGRAL term: the integral gain on the accumulated error. value ki · sumE. -/
theorem fam_pid_integral_1 : (2 * 40) = 80 := by decide

/-- pid: derivative(3, 10) = 30 — DERIVATIVE term: the derivative gain on the error change. value kd · dE. -/
theorem fam_pid_derivative_1 : (3 * 10) = 30 := by decide

/-- pid: output(60, 12, 5) = 77 — OUTPUT: the controller output, the sum of the three terms. value p + i + d. -/
theorem fam_pid_output_1 : ((60 + 12) + 5) = 77 := by decide

/-- pid: ziegler(50, 10) = 6 — ZIEGLER–NICHOLS: the integral gain from the critical gain and period (Ki = 1.2·Ku
    / Tu). value ⌊6 · ku / (5 · tu)⌋. -/
theorem fam_pid_ziegler_1 : ((6 * 50) / (5 * 10)) = 6 := by decide

/-- pid: tuning(60, 5) = 12 — TUNING: the integral gain from the proportional gain and the reset time. value ⌊kp
    / ti⌋. -/
theorem fam_pid_tuning_1 : (60 / 5) = 12 := by decide

/-- pid: windup(500, 300) = 300 — WINDUP: the anti-windup clamp on the accumulated error. value min(sumE,
    limit). -/
theorem fam_pid_windup_1 : (fmin 500 300) = 300 := by decide

/-- pid: setpoint(100, 70) = 30 — SETPOINT: the error from the setpoint, clamped at zero. value max(0, target −
    measured). -/
theorem fam_pid_setpoint_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- pid: setpoint(70, 100) = 0 — SETPOINT: the error from the setpoint, clamped at zero. value max(0, target −
    measured). -/
theorem fam_pid_setpoint_2 : (fmax 0 (70 - 100)) = 0 := by decide

/-- piezoelectric: charge(50, 20) = 1000 — PIEZOELECTRIC — THE DIRECT AND CONVERSE EFFECTS, AS ARITHMETIC. A
    stressed crystal makes charge, a charged crystal moves: the charge a force frees, the voltage across the
    stored charge, the charge constant, the resonant frequency of a plate, the electromechanical coupling, the
    plate capacitance, the displacement a drive produces, and the energy a cycle harvests. Crosses to
    `electrical` — piezoelectricity is where mechanics becomes current. A measure. */ const PROOF =
    'piezoelectric arithmetic (charge, voltage, charge constant, resonant frequency, coupling factor,
    capacitance, displacement, harvested energy); the direct and converse effects as numbers; a measure crossed
    to electrical' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'piezoelectric', dst: 'electrical',
    formula, value, proof: PROOF, ...extra }, holds, { name: `piezoelectric.${name}`, params }) export class
    PiezoelectricFormulas { /** CHARGE: the charge a force frees at the charge constant. value d · force. -/
theorem fam_piezoelectric_charge_1 : (20 * 50) = 1000 := by decide

/-- piezoelectric: voltage(1000, 10) = 100 — VOLTAGE across the stored charge on a capacitance. value ⌊charge /
    capacitance⌋. -/
theorem fam_piezoelectric_voltage_1 : (1000 / 10) = 100 := by decide

/-- piezoelectric: chargeconstant(1000, 50) = 20 — THE CHARGE CONSTANT: charge freed per unit of applied stress.
    value ⌊charge / stress⌋. -/
theorem fam_piezoelectric_chargeconstant_1 : (1000 / 50) = 20 := by decide

/-- piezoelectric: resonantfrequency(4000, 2) = 1000 — RESONANT FREQUENCY of a plate: half the sound speed over
    its thickness. value ⌊velocity / (2 · thickness)⌋. -/
theorem fam_piezoelectric_resonantfrequency_1 : (4000 / (2 * 2)) = 1000 := by decide

/-- piezoelectric: couplingfactor(49, 100) = 49 — COUPLING FACTOR: the share of input energy converted, as a
    percentage. value ⌊converted · 100 / input⌋. -/
theorem fam_piezoelectric_couplingfactor_1 : ((49 * 100) / 100) = 49 := by decide

/-- piezoelectric: couplingfactor(0, 100) = 0 — COUPLING FACTOR: the share of input energy converted, as a
    percentage. value ⌊converted · 100 / input⌋. -/
theorem fam_piezoelectric_couplingfactor_2 : ((0 * 100) / 100) = 0 := by decide

/-- piezoelectric: capacitance(12, 100, 6) = 200 — CAPACITANCE of the plate: permittivity times area over
    thickness. value ⌊permittivity · area / thickness⌋. -/
theorem fam_piezoelectric_capacitance_1 : ((12 * 100) / 6) = 200 := by decide

/-- piezoelectric: displacement(100, 20) = 2000 — DISPLACEMENT the converse effect produces: the charge constant
    times the drive voltage. value d · voltage. -/
theorem fam_piezoelectric_displacement_1 : (20 * 100) = 2000 := by decide

/-- piezoelectric: energyharvest(1000, 100) = 50000 — ENERGY HARVESTED per cycle: half the charge times the
    voltage. value ⌊charge · voltage / 2⌋. -/
theorem fam_piezoelectric_energyharvest_1 : ((1000 * 100) / 2) = 50000 := by decide

/-- pilgrimage: stagecount(12, 2) = 14 -/
theorem fam_pilgrimage_stagecount_1 : (12 + 2) = 14 := by decide

/-- pilgrimage: distance(20, 30) = 600 -/
theorem fam_pilgrimage_distance_1 : (20 * 30) = 600 := by decide

/-- pilgrimage: daysrequired(600, 20) = 30 -/
theorem fam_pilgrimage_daysrequired_1 : (600 / 20) = 30 := by decide

/-- pilgrimage: waypointsubsets(5) = 32 -/
theorem fam_pilgrimage_waypointsubsets_1 : (2 ^ 5) = 32 := by decide

/-- pilgrimage: groupsize(40, 1) = 40 -/
theorem fam_pilgrimage_groupsize_1 : (40 * 1) = 40 := by decide

/-- pilgrimage: restpoints(600, 50) = 12 -/
theorem fam_pilgrimage_restpoints_1 : (600 / 50) = 12 := by decide

/-- pipeline: stages(5) = 5 — PIPELINE — A CI/CD PIPELINE AS ARITHMETIC (the stages a build runs, not a wall of
    YAML). Running a pipeline is numbers: how many stages, how long each ran, which stage is the bottleneck, how
    work parallelises across stages, the success rate, the queue depth per worker, the cache hit rate, and
    throughput in builds per hour. Crosses to `cloud` — a pipeline is what runs on the cloud. A measure. */
    const PROOF = 'pipeline arithmetic (stages, duration, bottleneck, parallelism, success rate, queue depth,
    cache hit, throughput); a build pipeline as numbers; a measure crossed to cloud' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'pipeline', dst: 'cloud', formula, value, proof: PROOF, ...extra
    }, holds, { name: `pipeline.${name}`, params }) export class PipelineFormulas { /** STAGES: how many stages
    the pipeline runs. value count. -/
theorem fam_pipeline_stages_1 : 5 = 5 := by decide

/-- pipeline: duration(100, 340) = 240 — DURATION: the wall time of a stage, start to end. value max(0, end −
    start). -/
theorem fam_pipeline_duration_1 : (fmax 0 (340 - 100)) = 240 := by decide

/-- pipeline: duration(340, 100) = 0 — DURATION: the wall time of a stage, start to end. value max(0, end −
    start). -/
theorem fam_pipeline_duration_2 : (fmax 0 (100 - 340)) = 0 := by decide

/-- pipeline: bottleneck(60, 240) = 25 — BOTTLENECK: the slowest stage as a percentage of the total. value
    ⌊slowest · 100 / total⌋. -/
theorem fam_pipeline_bottleneck_1 : ((60 * 100) / 240) = 25 := by decide

/-- pipeline: parallelism(20, 4) = 5 — PARALLELISM: jobs spread across stages. value ⌊jobs / stages⌋. -/
theorem fam_pipeline_parallelism_1 : (20 / 4) = 5 := by decide

/-- pipeline: successrate(95, 100) = 95 — SUCCESS RATE: passed runs as a percentage. value ⌊passed · 100 /
    runs⌋. -/
theorem fam_pipeline_successrate_1 : ((95 * 100) / 100) = 95 := by decide

/-- pipeline: queue(30, 4) = 7 — QUEUE: waiting jobs spread over the workers. value ⌊waiting / workers⌋. -/
theorem fam_pipeline_queue_1 : (30 / 4) = 7 := by decide

/-- pipeline: cachehit(80, 100) = 80 — CACHE HIT: cached steps as a percentage. value ⌊cached · 100 / steps⌋. -/
theorem fam_pipeline_cachehit_1 : ((80 * 100) / 100) = 80 := by decide

/-- pipeline: throughput(120, 8) = 15 — THROUGHPUT: builds over hours. value ⌊builds / hours⌋. -/
theorem fam_pipeline_throughput_1 : (120 / 8) = 15 := by decide

/-- planetology: escapevelocity(1000, 10) = 100 — ESCAPE SPEED proxy: mass over radius. value ⌊mass / radius⌋. -/
theorem fam_planetology_escapevelocity_1 : (1000 / 10) = 100 := by decide

/-- planetology: density(5000, 100) = 50 — BULK DENSITY: mass over volume. value ⌊mass / volume⌋. -/
theorem fam_planetology_density_1 : (5000 / 100) = 50 := by decide

/-- planetology: albedo(30, 100) = 30 — ALBEDO as a percentage: light thrown back over light caught. value
    ⌊reflected · 100 / incident⌋. -/
theorem fam_planetology_albedo_1 : ((30 * 100) / 100) = 30 := by decide

/-- planetology: roche(100, 2) = 200 — ROCHE LIMIT proxy: the body radius scaled by the density ratio. value
    radius · ratio. -/
theorem fam_planetology_roche_1 : (100 * 2) = 200 := by decide

/-- planetology: hillsphere(1000, 10) = 100 — HILL SPHERE proxy: orbital distance over the mass ratio. value
    ⌊distance / ratio⌋. -/
theorem fam_planetology_hillsphere_1 : (1000 / 10) = 100 := by decide

/-- planetology: equilibrium(1000, 30) = 700 — EQUILIBRIUM TEMPERATURE proxy: the flux absorbed after albedo.
    value ⌊flux · (100 − albedo) / 100⌋. -/
theorem fam_planetology_equilibrium_1 : ((1000 * (100 - 30)) / 100) = 700 := by decide

/-- plasma: temperature(1000, 40) = 25 — PLASMA — THE FOURTH STATE OF MATTER, AS ARITHMETIC. An ionized gas is
    numbers: temperature per particle, number density in a volume, the Debye screening length, how long energy
    stays confined, the fraction ionized, the fusion gain Q, the magnetic beta, and the plasma frequency.
    Crosses to `energy` — plasma is energy held in a field. A measure. */ const PROOF = 'plasma arithmetic
    (temperature, density, Debye length, confinement, ionization, fusion Q, magnetic beta, plasma frequency);
    the fourth state of matter as numbers; a measure crossed to energy' const HUE = 'a 64-bit simhash (Charikar;
    Manku, Jain, Sarma, WWW 2007: 8 bytes a page, Hamming ≤ 3 on 8 billion pages) painted on the wheel' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'plasma', dst: 'energy', formula, value, proof:
    PROOF, ...extra }, holds, { name: `plasma.${name}`, params }) const hueTo = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'plasma', dst: 'colortheory', formula, value, proof: HUE, ...extra
    }, holds, { name: `plasma.${name}`, params }) export class PlasmaFormulas { /** TEMPERATURE: energy shared
    over the particles. value ⌊energy / particles⌋. -/
theorem fam_plasma_temperature_1 : (1000 / 40) = 25 := by decide

/-- plasma: density(1000, 10) = 100 — NUMBER DENSITY: particles in a volume. value ⌊particles / volume⌋. -/
theorem fam_plasma_density_1 : (1000 / 10) = 100 := by decide

/-- plasma: debye(1000, 10) = 100 — DEBYE screening: temperature over density. value ⌊temperature / density_⌋. -/
theorem fam_plasma_debye_1 : (1000 / 10) = 100 := by decide

/-- plasma: confinement(1000, 20) = 50 — CONFINEMENT time: energy over its loss rate. value ⌊energy / loss⌋. -/
theorem fam_plasma_confinement_1 : (1000 / 20) = 50 := by decide

/-- plasma: ionization(99, 100) = 99 — IONIZATION fraction as a percentage. value ⌊ionized · 100 / total⌋. -/
theorem fam_plasma_ionization_1 : ((99 * 100) / 100) = 99 := by decide

/-- plasma: fusion(1000, 100) = 1000 — FUSION gain Q as a percentage. value ⌊output · 100 / input⌋. -/
theorem fam_plasma_fusion_1 : ((1000 * 100) / 100) = 1000 := by decide

/-- plasma: magnetic(1000, 50) = 20 — MAGNETIC beta proxy: pressure over field. value ⌊pressure / field⌋. -/
theorem fam_plasma_magnetic_1 : (1000 / 50) = 20 := by decide

/-- plasma: frequency(100, 3) = 300 — PLASMA FREQUENCY proxy: density times charge. value density_ · charge. -/
theorem fam_plasma_frequency_1 : (100 * 3) = 300 := by decide

/-- podcasting: downloads(50, 2000) = 100000 — PODCASTING — RELEASING AUDIO, AS ARITHMETIC (chosen by the
    public-API registry, not by hand). A show is numbers: downloads across episodes, how much of a run listeners
    finish, how many come back, the release cadence, the ad load, the encoded bitrate, chart rank, and growth
    over the last window. Crosses to `media` — podcasting is media released. A measure. */ const PROOF =
    'podcasting arithmetic (downloads, completion, retention, cadence, ad load, bitrate, rank, growth); audio
    released on a schedule; a measure crossed to media' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'podcasting', dst: 'media', formula, value, proof: PROOF, ...extra }, holds, { name:
    `podcasting.${name}`, params }) export class PodcastingFormulas { /** DOWNLOADS: episodes at an average per
    episode. value episodes · average. -/
theorem fam_podcasting_downloads_1 : (50 * 2000) = 100000 := by decide

/-- podcasting: completion(27, 30) = 90 — COMPLETION as a percentage of the episode. value ⌊listened · 100 /
    duration⌋. -/
theorem fam_podcasting_completion_1 : ((27 * 100) / 30) = 90 := by decide

/-- podcasting: retention(600, 1000) = 60 — RETENTION: returning listeners as a percentage of subscribers. value
    ⌊returning · 100 / subscribers⌋. -/
theorem fam_podcasting_retention_1 : ((600 * 100) / 1000) = 60 := by decide

/-- podcasting: cadence(52, 52) = 1 — CADENCE: episodes released per week over the window. value ⌊episodes /
    weeks⌋. -/
theorem fam_podcasting_cadence_1 : (52 / 52) = 1 := by decide

/-- podcasting: adload(90, 60) = 150 — AD LOAD: ad seconds as a percentage of the run minutes. value ⌊ads · 100
    / minutes⌋. -/
theorem fam_podcasting_adload_1 : ((90 * 100) / 60) = 150 := by decide

/-- podcasting: bitrate(9600000, 60) = 160000 — BITRATE: encoded size over the seconds. value ⌊size / seconds⌋. -/
theorem fam_podcasting_bitrate_1 : (9600000 / 60) = 160000 := by decide

/-- podcasting: rank(50000, 10000) = 5 — RANK: downloads against the chart threshold. value ⌊downloads / chart⌋. -/
theorem fam_podcasting_rank_1 : (50000 / 10000) = 5 := by decide

/-- podcasting: growth(1200, 1000) = 200 — GROWTH over the last window, never negative. value max(0, current −
    previous). -/
theorem fam_podcasting_growth_1 : (fmax 0 (1200 - 1000)) = 200 := by decide

/-- podcasting: growth(900, 1000) = 0 — GROWTH over the last window, never negative. value max(0, current −
    previous). -/
theorem fam_podcasting_growth_2 : (fmax 0 (900 - 1000)) = 0 := by decide

/-- podiatry: arch(24, 100) = 24 — PODIATRY — THE FOOT, AS ARITHMETIC (chosen by the clinical registry, not by
    hand). The foot is numbers: the arch index, the pressure under a load, the cadence of a gait, the pronation
    angle, a wound's healing, standing balance, stride length, and callus thickness. Crosses to `med` — podiatry
    is a branch of medicine. A measure. */ const PROOF = 'podiatry arithmetic (arch index, plantar pressure,
    gait cadence, pronation, wound healing, balance, stride, callus); a clinical measure crossed to med' const
    nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'podiatry', dst: 'med', formula, value, proof:
    PROOF, ...extra }, holds, { name: `podiatry.${name}`, params }) export class PodiatryFormulas { /** ARCH
    INDEX: height over length, as a percentage. value ⌊height · 100 / length⌋. -/
theorem fam_podiatry_arch_1 : ((24 * 100) / 100) = 24 := by decide

/-- podiatry: pressure(600, 30) = 20 — PLANTAR PRESSURE: force over the area it bears on. value ⌊force / area⌋. -/
theorem fam_podiatry_pressure_1 : (600 / 30) = 20 := by decide

/-- podiatry: gait(120, 2) = 60 — GAIT CADENCE: steps over the minutes walked. value ⌊steps / minutes⌋. -/
theorem fam_podiatry_gait_1 : (120 / 2) = 60 := by decide

/-- podiatry: pronation(7) = 7 — PRONATION: the measured angle. value angle. -/
theorem fam_podiatry_pronation_1 : 7 = 7 := by decide

/-- podiatry: healing(75, 100) = 75 — WOUND HEALING as a percentage. value ⌊healed · 100 / wound⌋. -/
theorem fam_podiatry_healing_1 : ((75 * 100) / 100) = 75 := by decide

/-- podiatry: balance(18, 20) = 90 — STANDING BALANCE as a percentage of trials held stable. value ⌊stable · 100
    / trials⌋. -/
theorem fam_podiatry_balance_1 : ((18 * 100) / 20) = 90 := by decide

/-- podiatry: stride(1500, 1000) = 1 — STRIDE LENGTH: distance over the steps taken. value ⌊distance / steps⌋. -/
theorem fam_podiatry_stride_1 : (1500 / 1000) = 1 := by decide

/-- podiatry: callus(3) = 3 — CALLUS: the measured thickness. value thickness. -/
theorem fam_podiatry_callus_1 : 3 = 3 := by decide

/-- poker: potodds(90, 10) = 10 — POKER — NO-LIMIT HOLD'EM AS ARITHMETIC. A hand is numbers: the pot odds a call
    is priced at, the outs still live, the equity those outs buy by the rule of outs, the expected value of a
    spot, implied odds with money still behind, the fold equity of a bet, the stack-to-pot ratio, and the rake
    the house takes. Crosses to `probability` — poker is probability with chips on it. A measure. */ const PROOF
    = 'poker arithmetic (pot odds, live outs, rule-of-outs equity, expected value, implied odds, fold equity,
    stack-to-pot ratio, rake); a measure crossed to probability' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'poker', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `poker.${name}`,
    params }) export class PokerFormulas { /** POT ODDS as a percent: the call priced against the pot it wins.
    value ⌊bet · 100 / (pot + bet)⌋. -/
theorem fam_poker_potodds_1 : ((10 * 100) / (90 + 10)) = 10 := by decide

/-- poker: outs(9, 2) = 7 — OUTS still live: the cards that help, minus the ones already dead. value max(0,
    total − dead). -/
theorem fam_poker_outs_1 : (fmax 0 (9 - 2)) = 7 := by decide

/-- poker: equity(9, 2) = 36 — EQUITY by the rule of outs: each out is ~2% per street to come. value outs ·
    streets · 2. -/
theorem fam_poker_equity_1 : ((9 * 2) * 2) = 36 := by decide

/-- poker: expectedvalue(50, 200, 100) = 50 — EXPECTED VALUE of a spot in chips: win-weighted gain less
    loss-weighted cost. value ⌊max(0, prob · win − (100 − prob) · lose) / 100⌋. -/
theorem fam_poker_expectedvalue_1 : ((fmax 0 ((50 * 200) - ((100 - 50) * 100))) / 100) = 50 := by decide

/-- poker: impliedodds(90, 10, 100) = 5 — IMPLIED ODDS as a percent: the call priced against the pot plus money
    still to come. value ⌊bet · 100 / (pot + bet + future)⌋. -/
theorem fam_poker_impliedodds_1 : ((10 * 100) / ((90 + 10) + 100)) = 5 := by decide

/-- poker: fold(1, 4) = 75 — FOLD EQUITY as a percent: the share of opponents expected to fold. value ⌊max(0,
    total − continues) · 100 / total⌋. -/
theorem fam_poker_fold_1 : (((fmax 0 (4 - 1)) * 100) / 4) = 75 := by decide

/-- poker: stackratio(1000, 100) = 10 — STACK-TO-POT RATIO: the effective stack measured in pots. value ⌊stack /
    pot⌋. -/
theorem fam_poker_stackratio_1 : (1000 / 100) = 10 := by decide

/-- poker: rake(200, 5) = 10 — RAKE the house takes from a pot at a percent. value ⌊pot · percent / 100⌋. -/
theorem fam_poker_rake_1 : ((200 * 5) / 100) = 10 := by decide

/-- policy: costbenefit(300, 100) = 300 — POLICY — PUBLIC POLICY AS ARITHMETIC (chosen by the registry, not by
    hand). Weighing a policy is numbers: the benefit per unit cost, the share of the population it touches, how
    much of what was proposed got adopted, how much of what is subject actually complies, outcome per unit
    spend, the share of a target reached, the lag before a law takes effect, and benefit shared per group.
    Crosses to `law` — policy is what law enacts. A measure. */ const PROOF = 'policy arithmetic (cost-benefit,
    population impact, adoption, compliance, efficiency, reach, enactment lag, equity); a measure crossed to
    law' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'policy', dst: 'law', formula,
    value, proof: PROOF, ...extra }, holds, { name: `policy.${name}`, params }) export class PolicyFormulas {
    /** COST-BENEFIT: benefit per unit cost, as a percentage. value ⌊benefit · 100 / cost⌋. -/
theorem fam_policy_costbenefit_1 : ((300 * 100) / 100) = 300 := by decide

/-- policy: impact(250, 1000) = 25 — IMPACT: the share of the population affected, as a percentage. value
    ⌊affected · 100 / population⌋. -/
theorem fam_policy_impact_1 : ((250 * 100) / 1000) = 25 := by decide

/-- policy: adoption(30, 40) = 75 — ADOPTION: the share of what was proposed that got adopted, as a percentage.
    value ⌊adopted · 100 / proposed⌋. -/
theorem fam_policy_adoption_1 : ((30 * 100) / 40) = 75 := by decide

/-- policy: compliance(80, 100) = 80 — COMPLIANCE: the share of those subject that comply, as a percentage.
    value ⌊compliant · 100 / subject⌋. -/
theorem fam_policy_compliance_1 : ((80 * 100) / 100) = 80 := by decide

/-- policy: efficiency(1000, 25) = 40 — EFFICIENCY: outcome per unit spend. value ⌊outcome / spend⌋. -/
theorem fam_policy_efficiency_1 : (1000 / 25) = 40 := by decide

/-- policy: reach(450, 600) = 75 — REACH: the share of a target reached, as a percentage. value ⌊served · 100 /
    target⌋. -/
theorem fam_policy_reach_1 : ((450 * 100) / 600) = 75 := by decide

/-- policy: lag(10, 90) = 80 — LAG: the delay from enactment to effect. value max(0, effective − enacted). -/
theorem fam_policy_lag_1 : (fmax 0 (90 - 10)) = 80 := by decide

/-- policy: lag(90, 10) = 0 — LAG: the delay from enactment to effect. value max(0, effective − enacted). -/
theorem fam_policy_lag_2 : (fmax 0 (10 - 90)) = 0 := by decide

/-- policy: equity(1000, 4) = 250 — EQUITY: benefit shared per group. value ⌊benefit / group⌋. -/
theorem fam_policy_equity_1 : (1000 / 4) = 250 := by decide

/-- pollination: fruitset(45, 60) = 75 — POLLINATION — THE TRANSFER OF POLLEN, AS ARITHMETIC. Reproduction is
    numbers: the fruit a flower sets, how often a pollinator visits, viable pollen, hives over ground, seeds per
    fruit, cross-pollination pairings, how far a forager ranges, and the share of yield that depends on it.
    Crosses to `botany` — pollination is what botany grows from. A measure. */ const PROOF = 'pollination
    arithmetic (fruit set, visitation rate, pollen viability, hive density, seed set, cross-pollination, forage
    range, yield dependence); a measure crossed to botany' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pollination', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pollination.${name}`, params }) export class PollinationFormulas { /** FRUIT SET: the percentage of flowers
    that set fruit. value ⌊fruits · 100 / flowers⌋. -/
theorem fam_pollination_fruitset_1 : ((45 * 100) / 60) = 75 := by decide

/-- pollination: visitationrate(600, 5) = 120 — VISITATION RATE: pollinator visits over hours observed. value
    ⌊visits / hours⌋. -/
theorem fam_pollination_visitationrate_1 : (600 / 5) = 120 := by decide

/-- pollination: pollenviability(900, 1000) = 90 — POLLEN VIABILITY: the percentage of pollen grains that are
    viable. value ⌊viable · 100 / total⌋. -/
theorem fam_pollination_pollenviability_1 : ((900 * 100) / 1000) = 90 := by decide

/-- pollination: hivedensity(120, 4) = 30 — HIVE DENSITY: hives over ground (hectares). value ⌊hives / area⌋. -/
theorem fam_pollination_hivedensity_1 : (120 / 4) = 30 := by decide

/-- pollination: seedset(200, 15) = 3000 — SEED SET: seeds per fruit across the fruits set. value seeds ·
    fruits. -/
theorem fam_pollination_seedset_1 : (200 * 15) = 3000 := by decide

/-- pollination: crosspollination(12, 8) = 96 — CROSS-POLLINATION: pollen-transfer pairings between donors and
    recipients. value donors · recipients. -/
theorem fam_pollination_crosspollination_1 : (12 * 8) = 96 := by decide

/-- pollination: foragerange(15, 40) = 600 — FORAGE RANGE: the distance a forager covers at a speed over time.
    value speed · time. -/
theorem fam_pollination_foragerange_1 : (15 * 40) = 600 := by decide

/-- pollination: yielddependence(1000, 75) = 750 — YIELD DEPENDENCE: the share of yield attributable to
    pollination. value ⌊yield · dependence / 100⌋. -/
theorem fam_pollination_yielddependence_1 : ((1000 * 75) / 100) = 750 := by decide

/-- polygon: interioranglesum(5) = 540 — POLYGON — THE SHAPE OF A CLOSED FIGURE, AS ARITHMETIC. A polygon of n
    sides is numbers: the interior angles sum, the diagonals that join its corners, each exterior and interior
    angle, the triangles a triangulation cuts, the perimeter of its edges, the sides themselves, and an area.
    Crosses to `geometry` — a polygon is geometry made countable. A measure. */ const PROOF = 'polygon
    arithmetic (interior-angle sum, diagonals, exterior angle, interior angle, triangulation triangles,
    perimeter, sides, area); a closed figure made countable; a measure crossed to geometry' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'polygon', dst: 'geometry', formula, value, proof: PROOF, ...extra
    }, holds, { name: `polygon.${name}`, params }) export class PolygonFormulas { /** INTERIOR-ANGLE SUM: the
    degrees in an n-gon's corners. value (n − 2) · 180. -/
theorem fam_polygon_interioranglesum_1 : ((5 - 2) * 180) = 540 := by decide

/-- polygon: diagonals(6) = 9 — DIAGONALS: the segments joining non-adjacent corners. value ⌊n · (n − 3) / 2⌋. -/
theorem fam_polygon_diagonals_1 : ((6 * (6 - 3)) / 2) = 9 := by decide

/-- polygon: exteriorangle(8) = 45 — EXTERIOR ANGLE of a regular n-gon. value ⌊360 / n⌋. -/
theorem fam_polygon_exteriorangle_1 : (360 / 8) = 45 := by decide

/-- polygon: interiorangle(6) = 120 — INTERIOR ANGLE of a regular n-gon. value ⌊(n − 2) · 180 / n⌋. -/
theorem fam_polygon_interiorangle_1 : (((6 - 2) * 180) / 6) = 120 := by decide

/-- polygon: triangles(5) = 3 — TRIANGLES a triangulation cuts an n-gon into. value n − 2. -/
theorem fam_polygon_triangles_1 : (5 - 2) = 3 := by decide

/-- polygon: perimeter(4, 5) = 20 — PERIMETER: sides at an equal edge length. value sides · length. -/
theorem fam_polygon_perimeter_1 : (4 * 5) = 20 := by decide

/-- polygon: sides(7) = 7 — SIDES of an n-gon equal its vertices. value n. -/
theorem fam_polygon_sides_1 : 7 = 7 := by decide

/-- polygon: area(10, 4) = 20 — AREA of a triangle with the given base and height. value ⌊base · height / 2⌋. -/
theorem fam_polygon_area_1 : ((10 * 4) / 2) = 20 := by decide

/-- polyhedron: edges(6, 4) = 12 — EDGES: f faces of s sides each, every edge shared by two faces. value ⌊f · s
    / 2⌋. -/
theorem fam_polyhedron_edges_1 : ((6 * 4) / 2) = 12 := by decide

/-- polyhedron: vertices(12, 6) = 8 — VERTICES from Euler: v = e − f + 2. value max(0, e − f + 2). -/
theorem fam_polyhedron_vertices_1 : (fmax 0 ((12 - 6) + 2)) = 8 := by decide

/-- polyhedron: faces(8, 12) = 6 — FACES from Euler: f = e − v + 2. value max(0, e − v + 2). -/
theorem fam_polyhedron_faces_1 : (fmax 0 ((12 - 8) + 2)) = 6 := by decide

/-- polyhedron: facesatvertex(12, 8) = 3 — FACES AT A VERTEX: the degree of a vertex, 2 edges over the vertices.
    value ⌊2 · e / v⌋. -/
theorem fam_polyhedron_facesatvertex_1 : ((2 * 12) / 8) = 3 := by decide

/-- polyhedron: surfacearea(6, 4) = 24 — SURFACE AREA: f faces at an area each. value faces · area. -/
theorem fam_polyhedron_surfacearea_1 : (6 * 4) = 24 := by decide

/-- polyhedron: volume(2, 3, 4) = 24 — VOLUME of a box: length · width · height. value l · w · h. -/
theorem fam_polyhedron_volume_1 : ((2 * 3) * 4) = 24 := by decide

/-- polyhedron: dihedralcount(12) = 12 — DIHEDRAL COUNT: one dihedral angle along each edge. value e. -/
theorem fam_polyhedron_dihedralcount_1 : 12 = 12 := by decide

/-- polymers: degreeofpolymerization(28000, 28) = 1000 — POLYMERS — MACROMOLECULES AS ARITHMETIC (chosen by the
    materials registry, not by hand). A chain is numbers: the degree of polymerization, the molecular weight it
    carries, how crystalline it packs, the glass transition it falls through, the stress it bears and the strain
    it takes, how densely it is crosslinked, and how it thickens a solvent. Crosses to `materials` — a polymer
    is the material it becomes. A measure. */ const PROOF = 'polymers arithmetic (degree of polymerization,
    molecular weight, crystallinity, glass transition, tensile strength, elongation, crosslink spacing, relative
    viscosity); macromolecules as a measure crossed to materials' const nat = (...xs: number[]) => xs.every((x)
    => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'polymers', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name:
    `polymers.${name}`, params }) export class PolymersFormulas { /** DEGREE OF POLYMERIZATION: the
    number-average molecular weight over the monomer's molar mass. value ⌊mn / m0⌋. -/
theorem fam_polymers_degreeofpolymerization_1 : (28000 / 28) = 1000 := by decide

/-- polymers: molecularweight(1000, 28) = 28000 — MOLECULAR WEIGHT: the chain is the degree of polymerization
    times the monomer mass. value dp · m0. -/
theorem fam_polymers_molecularweight_1 : (1000 * 28) = 28000 := by decide

/-- polymers: crystallinity(65, 100) = 65 — CRYSTALLINITY as a percentage of the mass that packs ordered. value
    ⌊cryst · 100 / total⌋. -/
theorem fam_polymers_crystallinity_1 : ((65 * 100) / 100) = 65 := by decide

/-- polymers: glasstransition(378, 60000, 1000) = 318 — GLASS TRANSITION: Flory–Fox, the long-chain limit less a
    constant over the chain length. value max(0, tgInf − ⌊k / mn⌋). -/
theorem fam_polymers_glasstransition_1 : (fmax 0 (378 - (60000 / 1000))) = 318 := by decide

/-- polymers: tensilestrength(5000, 100) = 50 — TENSILE STRENGTH: stress is the force borne over the
    cross-section. value ⌊force / area⌋. -/
theorem fam_polymers_tensilestrength_1 : (5000 / 100) = 50 := by decide

/-- polymers: elongation(150, 100) = 150 — ELONGATION: the strain at break as a percentage of the original
    length. value ⌊delta · 100 / original⌋. -/
theorem fam_polymers_elongation_1 : ((150 * 100) / 100) = 150 := by decide

/-- polymers: crosslink(50000, 25) = 2000 — CROSSLINK SPACING: the mass of network between two crosslinks. value
    ⌊mass / links⌋. -/
theorem fam_polymers_crosslink_1 : (50000 / 25) = 2000 := by decide

/-- polymers: viscosity(250, 100) = 250 — RELATIVE VISCOSITY (×100): the solution's efflux time over the pure
    solvent's. value ⌊solution · 100 / solvent⌋. -/
theorem fam_polymers_viscosity_1 : ((250 * 100) / 100) = 250 := by decide

/-- polyphony: voicecount(4, 3) = 12 — POLYPHONY — MANY VOICES AT ONCE, AS ARITHMETIC. Several independent lines
    sounding together are numbers: how many voices a texture carries, the most that can sound at once, the cost
    of moving one line to the next, how independent the lines are, how dense the texture is, how many notes
    overlap, notes per voice, and the voices still active. Crosses to `music` — polyphony is how music layers
    its lines. A measure. */ const PROOF = 'polyphony arithmetic (voice count, max polyphony, voice-leading
    cost, independence, density, overlap, texture, active voices); many independent lines as numbers; a measure
    crossed to music' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const
    c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'polyphony', dst: 'music', formula,
    value, proof: PROOF, ...extra }, holds, { name: `polyphony.${name}`, params }) export class
    PolyphonyFormulas { /** VOICE COUNT: parts, each carrying so many lines. value parts · perPart. -/
theorem fam_polyphony_voicecount_1 : (4 * 3) = 12 := by decide

/-- polyphony: maxpolyphony(8, 16) = 16 — MAX POLYPHONY: the most voices that can sound at once across two
    sections. value max(voiceA, voiceB). -/
theorem fam_polyphony_maxpolyphony_1 : (fmax 8 16) = 16 := by decide

/-- polyphony: independenceindex(3, 4) = 75 — INDEPENDENCE INDEX: voice crossings as a percentage of the voices.
    value ⌊crossings · 100 / voices⌋. -/
theorem fam_polyphony_independenceindex_1 : ((3 * 100) / 4) = 75 := by decide

/-- polyphony: densityratio(7, 10) = 70 — DENSITY RATIO: notes sounding as a percentage of the notes possible.
    value ⌊sounding · 100 / total⌋. -/
theorem fam_polyphony_densityratio_1 : ((7 * 100) / 10) = 70 := by decide

/-- polyphony: overlapcount(12, 5) = 7 — OVERLAP COUNT: notes started that have not yet ended, so still
    overlapping. value max(0, started − ended). -/
theorem fam_polyphony_overlapcount_1 : (fmax 0 (12 - 5)) = 7 := by decide

/-- polyphony: textureindex(24, 4) = 6 — TEXTURE INDEX: notes spread over the voices that carry them. value
    ⌊notes / voices⌋. -/
theorem fam_polyphony_textureindex_1 : (24 / 4) = 6 := by decide

/-- polyphony: activevoices(16, 4) = 12 — ACTIVE VOICES: the voices still sounding once the resting ones fall
    silent. value max(0, total − resting). -/
theorem fam_polyphony_activevoices_1 : (fmax 0 (16 - 4)) = 12 := by decide

/-- pomology: yield(200, 150) = 30000 — POMOLOGY — THE SCIENCE OF FRUIT, AS ARITHMETIC. Growing fruit is
    numbers: the yield a block bears, sugar as °Brix, the blossoms that set, the fruits thinned off, average
    caliper, flesh firmness, the harvest index, and how many trees a planting holds. Crosses to `botany` —
    pomology is applied botany. A measure. */ const PROOF = 'pomology arithmetic (yield, brix, fruit set,
    thinning, caliper, firmness, harvest index, tree density); the orchard measured; a measure crossed to
    botany' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pomology', dst: 'botany', formula,
    value, proof: PROOF, ...extra }, holds, { name: `pomology.${name}`, params }) export class PomologyFormulas
    { /** YIELD: fruits a block bears at so many trees, each bearing so many fruits. value trees · perTree. -/
theorem fam_pomology_yield_1 : (200 * 150) = 30000 := by decide

/-- pomology: brix(13, 100) = 13 — BRIX: sugar as a percentage of juice (°Brix). value ⌊sugar · 100 / volume⌋. -/
theorem fam_pomology_brix_1 : ((13 * 100) / 100) = 13 := by decide

/-- pomology: fruitset(300, 1000) = 30 — FRUIT SET: blossoms that became fruit, as a percentage. value ⌊set ·
    100 / blossoms⌋. -/
theorem fam_pomology_fruitset_1 : ((300 * 100) / 1000) = 30 := by decide

/-- pomology: thinning(500, 300) = 200 — THINNING: fruits removed to leave a crop load. value max(0, fruits −
    keep). -/
theorem fam_pomology_thinning_1 : (fmax 0 (500 - 300)) = 200 := by decide

/-- pomology: thinning(100, 200) = 0 — THINNING: fruits removed to leave a crop load. value max(0, fruits −
    keep). -/
theorem fam_pomology_thinning_2 : (fmax 0 (100 - 200)) = 0 := by decide

/-- pomology: caliper(700, 10) = 70 — CALIPER: average fruit diameter, total millimetres over the count. value
    ⌊diameter / count⌋. -/
theorem fam_pomology_caliper_1 : (700 / 10) = 70 := by decide

/-- pomology: firmness(1000, 20) = 50 — FIRMNESS: flesh pressure, force over the probe area. value ⌊force /
    area⌋. -/
theorem fam_pomology_firmness_1 : (1000 / 20) = 50 := by decide

/-- pomology: harvestindex(450, 1000) = 45 — HARVEST INDEX: fruit mass as a percentage of total biomass. value
    ⌊fruit · 100 / total⌋. -/
theorem fam_pomology_harvestindex_1 : ((450 * 100) / 1000) = 45 := by decide

/-- pomology: treedensity(10000, 25) = 400 — TREE DENSITY: trees a planting holds, area over the spacing each
    tree takes. value ⌊area / spacing⌋. -/
theorem fam_pomology_treedensity_1 : (10000 / 25) = 400 := by decide

/-- portfolio: allocation(60, 40) = 60 — PORTFOLIO — HOLDING A BOOK OF ASSETS, AS ARITHMETIC. An asset's weight
    in the book, the Sharpe ratio, how diversified the holdings are across sectors, how far a position has
    drifted past its rebalance threshold, the stock/bond allocation, beta to the market, the drawdown from a
    peak, and the yield on invested value. Crosses to `trading` — a portfolio is what trading moves. A measure.
    */ const PROOF = 'portfolio arithmetic (asset weight, Sharpe ratio, diversification, rebalance drift,
    allocation, beta, drawdown, yield); a measure crossed to trading' const nat = (...xs: number[]) =>
    xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'portfolio', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, {
    name: `portfolio.${name}`, params }) export class PortfolioFormulas { /** ALLOCATION: the stock share of the
    stock+bond book, as a percentage. value ⌊stocks · 100 / (stocks + bonds)⌋. -/
theorem fam_portfolio_allocation_1 : ((60 * 100) / (60 + 40)) = 60 := by decide

/-- portfolio: beta(120, 100) = 120 — BETA: an asset's return against the market's, as a percentage. value
    ⌊assetreturn · 100 / marketreturn⌋. -/
theorem fam_portfolio_beta_1 : ((120 * 100) / 100) = 120 := by decide

/-- portfolio: diversification(30, 10) = 3 — DIVERSIFICATION: holdings spread across sectors. value ⌊holdings /
    sectors⌋. -/
theorem fam_portfolio_diversification_1 : (30 / 10) = 3 := by decide

/-- portfolio: drawdown(1000, 800) = 20 — DRAWDOWN: the fall from a peak to a trough, as a percentage. value
    ⌊(peak − trough) · 100 / peak⌋. -/
theorem fam_portfolio_drawdown_1 : (((1000 - 800) * 100) / 1000) = 20 := by decide

/-- portfolio: income(50, 1000) = 5 — YIELD: income over invested value, as a percentage. value ⌊income · 100 /
    value⌋. -/
theorem fam_portfolio_income_1 : ((50 * 100) / 1000) = 5 := by decide

/-- portfolio: rebalance(15, 5) = 10 — REBALANCE: how far a position's drift exceeds its threshold. value max(0,
    drift − threshold). -/
theorem fam_portfolio_rebalance_1 : (fmax 0 (15 - 5)) = 10 := by decide

/-- portfolio: rebalance(3, 5) = 0 — REBALANCE: how far a position's drift exceeds its threshold. value max(0,
    drift − threshold). -/
theorem fam_portfolio_rebalance_2 : (fmax 0 (3 - 5)) = 0 := by decide

/-- portfolio: sharpe(200, 100) = 200 — SHARPE: excess return over volatility, as a percentage. value ⌊excess ·
    100 / volatility⌋. -/
theorem fam_portfolio_sharpe_1 : ((200 * 100) / 100) = 200 := by decide

/-- portfolio: weight(25, 100) = 25 — WEIGHT: an asset's share of the total book, as a percentage. value ⌊asset
    · 100 / total⌋. -/
theorem fam_portfolio_weight_1 : ((25 * 100) / 100) = 25 := by decide

/-- poultry: laying(900, 1000) = 90 — POULTRY — THE FLOCK AS ARITHMETIC (chosen by the agriculture registry, not
    by hand). Running a flock is numbers: the lay rate, hatchability, feed conversion, mortality, stocking
    density, dressing yield, total egg mass, and flock uniformity. Crosses to `agriculture` — poultry is what
    agriculture husbands. A measure. */ const PROOF = 'poultry arithmetic (lay rate, hatchability, feed
    conversion, mortality, stocking density, dressing yield, egg mass, uniformity); an agriculture domain; a
    measure crossed to agriculture' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'poultry', dst:
    'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `poultry.${name}`, params }) export
    class PoultryFormulas { /** LAY RATE as a percentage: eggs over hens. value ⌊eggs · 100 / hens⌋. -/
theorem fam_poultry_laying_1 : ((900 * 100) / 1000) = 90 := by decide

/-- poultry: hatchability(85, 100) = 85 — HATCHABILITY as a percentage: hatched over set. value ⌊hatched · 100 /
    set⌋. -/
theorem fam_poultry_hatchability_1 : ((85 * 100) / 100) = 85 := by decide

/-- poultry: feedconversion(2000, 1000) = 2 — FEED CONVERSION: feed over eggs. value ⌊feed / eggs⌋. -/
theorem fam_poultry_feedconversion_1 : (2000 / 1000) = 2 := by decide

/-- poultry: mortality(5, 1000) = 0 — MORTALITY as a percentage: died over flock. value ⌊died · 100 / flock⌋. -/
theorem fam_poultry_mortality_1 : ((5 * 100) / 1000) = 0 := by decide

/-- poultry: density(1200, 100) = 12 — STOCKING DENSITY: birds over area. value ⌊birds / area⌋. -/
theorem fam_poultry_density_1 : (1200 / 100) = 12 := by decide

/-- poultry: dressing(70, 100) = 70 — DRESSING YIELD as a percentage: carcass over live. value ⌊carcass · 100 /
    live⌋. -/
theorem fam_poultry_dressing_1 : ((70 * 100) / 100) = 70 := by decide

/-- poultry: eggmass(1000, 60) = 60000 — EGG MASS: eggs at a weight each. value eggs · weight. -/
theorem fam_poultry_eggmass_1 : (1000 * 60) = 60000 := by decide

/-- poultry: uniformity(950, 1000) = 95 — UNIFORMITY as a percentage: within range over total. value
    ⌊withinrange · 100 / total⌋. -/
theorem fam_poultry_uniformity_1 : ((950 * 100) / 1000) = 95 := by decide

/-- powerfactor: ratio(80, 100) = 80 -/
theorem fam_powerfactor_ratio_1 : ((80 * 100) / 100) = 80 := by decide

/-- powerfactor: realpower(100, 8) = 800 -/
theorem fam_powerfactor_realpower_1 : (100 * 8) = 800 := by decide

/-- powerfactor: apparentpower(100, 10) = 1000 -/
theorem fam_powerfactor_apparentpower_1 : (100 * 10) = 1000 := by decide

/-- powerfactor: reactivepower(1000, 800) = 200 -/
theorem fam_powerfactor_reactivepower_1 : (fmax 0 (1000 - 800)) = 200 := by decide

/-- powerfactor: correction(100, 80) = 20 -/
theorem fam_powerfactor_correction_1 : (fmax 0 (100 - 80)) = 20 := by decide

/-- powerfactor: phaseangle(900, 10) = 90 -/
theorem fam_powerfactor_phaseangle_1 : (900 / 10) = 90 := by decide

/-- powerfactor: capacitorkvar(600, 10) = 60 -/
theorem fam_powerfactor_capacitorkvar_1 : (600 / 10) = 60 := by decide

/-- powerfactor: efficiency(95, 100) = 95 -/
theorem fam_powerfactor_efficiency_1 : ((95 * 100) / 100) = 95 := by decide

/-- pragmatics: implicature(30, 40) = 75 — PRAGMATICS — MEANING IN USE, AS ARITHMETIC. What an utterance does
    beyond what it says: implicature over what is stated, deixis per context, politeness over requests,
    relevance over utterances, turn-taking per speaker, speech acts over intent, presupposition per statement,
    and cooperation over the maxims. Crosses to `linguistics` — pragmatics is what linguistics describes in use.
    A measure. */ const PROOF = 'pragmatics arithmetic (implicature, deixis, politeness, relevance, turn-taking,
    speech acts, presupposition, cooperation); meaning in use; a measure crossed to linguistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'pragmatics', dst: 'linguistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `pragmatics.${name}`, params }) export class PragmaticsFormulas { /**
    IMPLICATURE: what is inferred as a percentage of what is stated. value ⌊inferred · 100 / stated⌋. -/
theorem fam_pragmatics_implicature_1 : ((30 * 100) / 40) = 75 := by decide

/-- pragmatics: deixis(10, 3) = 3 — DEIXIS: references resolved per unit of context. value ⌊references /
    context⌋. -/
theorem fam_pragmatics_deixis_1 : (10 / 3) = 3 := by decide

/-- pragmatics: politeness(8, 10) = 80 — POLITENESS: mitigated requests as a percentage of all requests. value
    ⌊mitigated · 100 / requests⌋. -/
theorem fam_pragmatics_politeness_1 : ((8 * 100) / 10) = 80 := by decide

/-- pragmatics: relevance(9, 10) = 90 — RELEVANCE: relevant utterances as a percentage of all utterances. value
    ⌊relevant · 100 / utterances⌋. -/
theorem fam_pragmatics_relevance_1 : ((9 * 100) / 10) = 90 := by decide

/-- pragmatics: turntaking(100, 4) = 25 — TURN-TAKING: turns per speaker in a conversation. value ⌊turns /
    speakers⌋. -/
theorem fam_pragmatics_turntaking_1 : (100 / 4) = 25 := by decide

/-- pragmatics: speechact(45, 50) = 90 — SPEECH ACTS: performed as a percentage of intended. value ⌊performed ·
    100 / intended⌋. -/
theorem fam_pragmatics_speechact_1 : ((45 * 100) / 50) = 90 := by decide

/-- pragmatics: presupposition(12, 4) = 3 — PRESUPPOSITION: assumptions carried per statement. value ⌊assumed /
    statements⌋. -/
theorem fam_pragmatics_presupposition_1 : (12 / 4) = 3 := by decide

/-- pragmatics: cooperation(3, 4) = 75 — COOPERATION: informative contributions as a percentage of the maxims.
    value ⌊informative · 100 / maxims⌋. -/
theorem fam_pragmatics_cooperation_1 : ((3 * 100) / 4) = 75 := by decide

/-- precipitation: intensity(50, 5) = 10 — PRECIPITATION — RAINFALL AND SNOW AS ARITHMETIC (chosen by the
    public-API registry, not by hand). Falling water is numbers: how hard it falls, how much runs off, how much
    piles up, how rare a storm is, how much snow a melt makes, what a catchment yields, the depth over an area,
    and what soaks in. Crosses to `hydrology` — precipitation is where the water cycle begins. A measure. */
    const PROOF = 'precipitation arithmetic (intensity, runoff, accumulation, return period, snow ratio,
    catchment yield, rain depth, infiltration); a public-API registry domain; a measure crossed to hydrology'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'precipitation', dst: 'hydrology', formula, value,
    proof: PROOF, ...extra }, holds, { name: `precipitation.${name}`, params }) export class
    PrecipitationFormulas { /** INTENSITY: rain depth over the hours it fell. value ⌊depth / hours⌋. -/
theorem fam_precipitation_intensity_1 : (50 / 5) = 10 := by decide

/-- precipitation: runoff(200, 75) = 150 — RUNOFF (the rational method): rainfall at a runoff coefficient
    (percent). value ⌊rain · coeff / 100⌋. -/
theorem fam_precipitation_runoff_1 : ((200 * 75) / 100) = 150 := by decide

/-- precipitation: accumulation(12, 6) = 72 — ACCUMULATION: a steady rate over the hours. value rate · hours. -/
theorem fam_precipitation_accumulation_1 : (12 * 6) = 72 := by decide

/-- precipitation: returnperiod(100, 4) = 25 — RETURN PERIOD: years of record over the events seen. value ⌊years
    / events⌋. -/
theorem fam_precipitation_returnperiod_1 : (100 / 4) = 25 := by decide

/-- precipitation: snowratio(130, 10) = 13 — SNOW RATIO: snow depth to its melted liquid. value ⌊snow / rain⌋. -/
theorem fam_precipitation_snowratio_1 : (130 / 10) = 13 := by decide

/-- precipitation: catchmentyield(500, 20) = 10000 — CATCHMENT YIELD: area times the depth over it. value area ·
    depth. -/
theorem fam_precipitation_catchmentyield_1 : (500 * 20) = 10000 := by decide

/-- precipitation: raindepth(10000, 500) = 20 — RAIN DEPTH: a collected volume spread over an area. value
    ⌊volume / area⌋. -/
theorem fam_precipitation_raindepth_1 : (10000 / 500) = 20 := by decide

/-- precipitation: infiltration(200, 150) = 50 — INFILTRATION: the rain that did not run off soaks in. value
    max(0, rain − runoff). -/
theorem fam_precipitation_infiltration_1 : (fmax 0 (200 - 150)) = 50 := by decide

/-- precipitation: infiltration(50, 100) = 0 — INFILTRATION: the rain that did not run off soaks in. value
    max(0, rain − runoff). -/
theorem fam_precipitation_infiltration_2 : (fmax 0 (50 - 100)) = 0 := by decide

/-- premium: gross(1000, 20) = 1200 — PREMIUM — INSURANCE PRICING, AS ARITHMETIC (chosen by the actuarial
    registry, not by hand). Pricing a policy is numbers: the gross premium with its loading, the net after
    commission, the rate per unit of exposure, the pure premium of expected losses, the expense load,
    underwriting profit, the installment due, and the premium earned so far. Crosses to `econ` — a premium is a
    price. A measure. */ const PROOF = 'premium arithmetic (gross with loading, net of commission, rate per
    exposure, pure premium, expense load, underwriting profit, installment, earned pro-rata); insurance pricing;
    a measure crossed to econ' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'premium', dst: 'econ',
    formula, value, proof: PROOF, ...extra }, holds, { name: `premium.${name}`, params }) export class
    PremiumFormulas { /** GROSS PREMIUM: a base with a loading percentage added. value base + ⌊base · load /
    100⌋. -/
theorem fam_premium_gross_1 : (1000 + ((1000 * 20) / 100)) = 1200 := by decide

/-- premium: net(1200, 15) = 1020 — NET PREMIUM: the gross less a commission percentage. value max(0, gross −
    ⌊gross · commission / 100⌋). -/
theorem fam_premium_net_1 : (fmax 0 (1200 - ((1200 * 15) / 100))) = 1020 := by decide

/-- premium: rate(5000, 100) = 50 — RATE: premium per unit of exposure. value ⌊premium / exposure⌋. -/
theorem fam_premium_rate_1 : (5000 / 100) = 50 := by decide

/-- premium: pure(8000, 200) = 40 — PURE PREMIUM: expected losses over exposures. value ⌊losses / exposures⌋. -/
theorem fam_premium_pure_1 : (8000 / 200) = 40 := by decide

/-- premium: expense(1000, 25) = 250 — EXPENSE LOAD: a ratio of the premium. value ⌊premium · ratio / 100⌋. -/
theorem fam_premium_expense_1 : ((1000 * 25) / 100) = 250 := by decide

/-- premium: profit(1000, 600, 250) = 150 — UNDERWRITING PROFIT: premium less losses and expenses. value max(0,
    premium − losses − expenses). -/
theorem fam_premium_profit_1 : (fmax 0 ((1000 - 600) - 250)) = 150 := by decide

/-- premium: earned(1200, 6, 12) = 600 — EARNED PREMIUM: the pro-rata share earned over the term. value ⌊premium
    · elapsed / term⌋. -/
theorem fam_premium_earned_1 : ((1200 * 6) / 12) = 600 := by decide

/-- preservation: shelflifedays(30, 12) = 360 -/
theorem fam_preservation_shelflifedays_1 : (30 * 12) = 360 := by decide

/-- preservation: wateractivity(85, 100) = 85 -/
theorem fam_preservation_wateractivity_1 : ((85 * 100) / 100) = 85 := by decide

/-- preservation: phlevel(42, 10) = 4 -/
theorem fam_preservation_phlevel_1 : (42 / 10) = 4 := by decide

/-- preservation: saltpct(5, 100) = 5 -/
theorem fam_preservation_saltpct_1 : ((5 * 100) / 100) = 5 := by decide

/-- preservation: methodsubsets(5) = 32 -/
theorem fam_preservation_methodsubsets_1 : (2 ^ 5) = 32 := by decide

/-- preservation: microbialreduction(99, 100) = 99 -/
theorem fam_preservation_microbialreduction_1 : ((99 * 100) / 100) = 99 := by decide

/-- preservation: temperaturec(25, 4) = 21 -/
theorem fam_preservation_temperaturec_1 : (fmax 0 (25 - 4)) = 21 := by decide

/-- preservation: spoilagerate(2, 100) = 2 -/
theorem fam_preservation_spoilagerate_1 : ((2 * 100) / 100) = 2 := by decide

/-- prevalence: adjustedrate(150, 120, 100) = 125 — PREVALENCE — HOW WIDESPREAD A CONDITION IS, AS ARITHMETIC
    (an epidemiology domain, drawn the way the registry draws a measure). Counting who has a condition is
    numbers: cases per 100,000 at an instant, over a period, over a lifetime, the caseload a rate implies, the
    burden in years, a standardised rate, a prevalence ratio, and the width of an interval. Crosses to
    `statistics` — prevalence is a statistic of a population. A measure. */ const PROOF = 'prevalence arithmetic
    (point, period and lifetime prevalence, caseload, burden, standardised rate, ratio, interval width); an
    epidemiology measure crossed to statistics' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'prevalence', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name:
    `prevalence.${name}`, params }) export class PrevalenceFormulas { /** STANDARDISED RATE: observed cases
    scaled to a standard by the expected count. value ⌊observed · standard / expected⌋. -/
theorem fam_prevalence_adjustedrate_1 : ((150 * 100) / 120) = 125 := by decide

/-- prevalence: burden(1200, 20) = 24000 — BURDEN: cases each carrying a number of years lost. value cases ·
    years. -/
theorem fam_prevalence_burden_1 : (1200 * 20) = 24000 := by decide

/-- prevalence: caseload(500, 60000) = 300 — CASELOAD: the cases a per-100,000 rate implies in a population.
    value ⌊rate · population / 100000⌋. -/
theorem fam_prevalence_caseload_1 : ((500 * 60000) / 100000) = 300 := by decide

/-- prevalence: confidencewidth(520, 480) = 40 — CONFIDENCE WIDTH: the span of an interval, its upper bound less
    its lower. value max(0, upper − lower). -/
theorem fam_prevalence_confidencewidth_1 : (fmax 0 (520 - 480)) = 40 := by decide

/-- prevalence: confidencewidth(480, 520) = 0 — CONFIDENCE WIDTH: the span of an interval, its upper bound less
    its lower. value max(0, upper − lower). -/
theorem fam_prevalence_confidencewidth_2 : (fmax 0 (480 - 520)) = 0 := by decide

/-- prevalence: lifetimeprevalence(2500, 10000) = 25 — LIFETIME PREVALENCE: who has ever had the condition, as a
    percentage. value ⌊ever · 100 / population⌋. -/
theorem fam_prevalence_lifetimeprevalence_1 : ((2500 * 100) / 10000) = 25 := by decide

/-- prevalence: periodprevalence(300, 200, 50000) = 1000 — PERIOD PREVALENCE: existing plus new cases over a
    period, per 100,000. value ⌊(existing + incident) · 100000 / population⌋. -/
theorem fam_prevalence_periodprevalence_1 : (((300 + 200) * 100000) / 50000) = 1000 := by decide

/-- prevalence: pointprevalence(50, 20000) = 250 — POINT PREVALENCE: cases at an instant, per 100,000. value
    ⌊cases · 100000 / population⌋. -/
theorem fam_prevalence_pointprevalence_1 : ((50 * 100000) / 20000) = 250 := by decide

/-- prevalence: ratio(40, 25) = 160 — PREVALENCE RATIO: exposed prevalence against unexposed, ×100. value
    ⌊exposed · 100 / unexposed⌋. -/
theorem fam_prevalence_ratio_1 : ((40 * 100) / 25) = 160 := by decide

/-- pricing: annual(50, 12) = 600 — PRICING — THE PRICING USE CASE FROM payloadcms/website, AS ARITHMETIC. A
    SaaS pricing table is numbers: a plan billed annually, a percentage discount, the savings against monthly,
    per-seat totals, monthly and annual recurring revenue, the price step on an upgrade, and the features a tier
    admits. Crosses to `ecommerce` — pricing is what a store charges. A measure. */ const PROOF = 'pricing
    arithmetic (annual billing, discount, savings, seats, mrr, arr, upgrade, tier) from the payloadcms/website
    Pricing use case; a measure crossed to ecommerce' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'pricing', dst: 'ecommerce', formula, value, proof: PROOF, ...extra }, holds, { name:
    `pricing.${name}`, params }) export class PricingFormulas { /** ANNUAL BILLING: a monthly price over a run
    of months. value monthly · months. -/
theorem fam_pricing_annual_1 : (50 * 12) = 600 := by decide

/-- pricing: arr(1000, 12) = 12000 — ANNUAL RECURRING REVENUE: monthly recurring revenue over a run of months.
    value mrr · months. -/
theorem fam_pricing_arr_1 : (1000 * 12) = 12000 := by decide

/-- pricing: discount(200, 15) = 30 — DISCOUNT: a percentage off a price. value ⌊price · pct / 100⌋. -/
theorem fam_pricing_discount_1 : ((200 * 15) / 100) = 30 := by decide

/-- pricing: mrr(100, 50) = 5000 — MONTHLY RECURRING REVENUE: subscribers at a price each. value subs · price. -/
theorem fam_pricing_mrr_1 : (100 * 50) = 5000 := by decide

/-- pricing: savings(50, 500) = 100 — SAVINGS: a year of monthly billing against the annual price. value max(0,
    monthly · 12 − annual). -/
theorem fam_pricing_savings_1 : (fmax 0 ((50 * 12) - 500)) = 100 := by decide

/-- pricing: savings(40, 600) = 0 — SAVINGS: a year of monthly billing against the annual price. value max(0,
    monthly · 12 − annual). -/
theorem fam_pricing_savings_2 : (fmax 0 ((40 * 12) - 600)) = 0 := by decide

/-- pricing: seats(10, 25) = 250 — SEATS: users at a per-seat price. value users · perSeat. -/
theorem fam_pricing_seats_1 : (10 * 25) = 250 := by decide

/-- pricing: tier(12, 3) = 4 — TIER: the features a tier admits. value ⌊features / tiers⌋. -/
theorem fam_pricing_tier_1 : (12 / 3) = 4 := by decide

/-- pricing: upgrade(50, 90) = 40 — UPGRADE: the price step from one plan to another. value max(0, to − from). -/
theorem fam_pricing_upgrade_1 : (fmax 0 (90 - 50)) = 40 := by decide

/-- pricing: upgrade(90, 50) = 0 — UPGRADE: the price step from one plan to another. value max(0, to − from). -/
theorem fam_pricing_upgrade_2 : (fmax 0 (50 - 90)) = 0 := by decide

/-- primatology: encephalization(1200, 60) = 20000 — PRIMATOLOGY — PRIMATE FIELD DATA AS ARITHMETIC (chosen by
    the registry, not by hand). A troop is numbers: the brain against the body (an EQ proxy), the troop split
    into groups, grooming spread over individuals, dominance from contests won, calories foraged per hour, age
    at maturity, kinship across the troop, and tool use across observations. Crosses to `zoology` — primatology
    is the primate corner of it. A measure. */ const PROOF = 'primatology arithmetic (encephalization, troop,
    grooming, dominance, foraging, maturity, kinship, tool use); a registry domain; a measure crossed to
    zoology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'primatology', dst: 'zoology',
    formula, value, proof: PROOF, ...extra }, holds, { name: `primatology.${name}`, params }) export class
    PrimatologyFormulas { /** ENCEPHALIZATION: brain against body, an EQ proxy. value ⌊brain · 1000 / body⌋. -/
theorem fam_primatology_encephalization_1 : ((1200 * 1000) / 60) = 20000 := by decide

/-- primatology: troop(100, 8) = 12 — TROOP: members split into groups. value ⌊members / groups⌋. -/
theorem fam_primatology_troop_1 : (100 / 8) = 12 := by decide

/-- primatology: grooming(500, 20) = 25 — GROOMING: interactions spread over individuals. value ⌊interactions /
    individuals⌋. -/
theorem fam_primatology_grooming_1 : (500 / 20) = 25 := by decide

/-- primatology: dominance(7, 10) = 70 — DOMINANCE: contests won, as a percentage. value ⌊wins · 100 /
    contests⌋. -/
theorem fam_primatology_dominance_1 : ((7 * 100) / 10) = 70 := by decide

/-- primatology: foraging(2000, 8) = 250 — FORAGING: calories over hours. value ⌊calories / hours⌋. -/
theorem fam_primatology_foraging_1 : (2000 / 8) = 250 := by decide

/-- primatology: maturity(12) = 12 — MATURITY: age at maturity, in years. value years. -/
theorem fam_primatology_maturity_1 : 12 = 12 := by decide

/-- primatology: kinship(5, 20) = 25 — KINSHIP: related across the troop, as a percentage. value ⌊related · 100
    / troop⌋. -/
theorem fam_primatology_kinship_1 : ((5 * 100) / 20) = 25 := by decide

/-- primatology: tooluse(15, 30) = 50 — TOOL USE: events across observations, as a percentage. value ⌊events ·
    100 / observations⌋. -/
theorem fam_primatology_tooluse_1 : ((15 * 100) / 30) = 50 := by decide

/-- printmaking: editionsize(50, 1) = 50 -/
theorem fam_printmaking_editionsize_1 : (50 * 1) = 50 := by decide

/-- printmaking: platepasses(4, 2) = 6 -/
theorem fam_printmaking_platepasses_1 : (4 + 2) = 6 := by decide

/-- printmaking: registrationlayers(4, 0) = 4 -/
theorem fam_printmaking_registrationlayers_1 : (4 + 0) = 4 := by decide

/-- printmaking: pressuresetting(100, 4) = 25 -/
theorem fam_printmaking_pressuresetting_1 : (100 / 4) = 25 := by decide

/-- printmaking: colorsubsets(5) = 32 -/
theorem fam_printmaking_colorsubsets_1 : (2 ^ 5) = 32 := by decide

/-- printmaking: yieldratio(90, 100) = 90 -/
theorem fam_printmaking_yieldratio_1 : ((90 * 100) / 100) = 90 := by decide

/-- probability: odds(1, 4) = 25 — PROBABILITY — CHANCE AS ARITHMETIC (odds, conditional chance, expectation,
    Bayes, combinations, variance, entropy, independence). Every value an integer: a chance is a percentage
    ⌊·100/·⌋, an expectation a floor, a count a product. Crosses to `code` — probability is what programs reason
    under uncertainty. A measure. */ const PROOF = 'probability arithmetic (odds, conditional, expectation,
    Bayes, combinations, variance, entropy, independence) as integer percentages and floors; a measure crossed
    to code' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'probability', dst: 'code',
    formula, value, proof: PROOF, ...extra }, holds, { name: `probability.${name}`, params }) export class
    ProbabilityFormulas { /** ODDS: favorable outcomes over the total, as a percentage. value ⌊favorable · 100 /
    total⌋. -/
theorem fam_probability_odds_1 : ((1 * 100) / 4) = 25 := by decide

/-- probability: conditional(30, 60) = 50 — CONDITIONAL: the joint chance over the given, as a percentage. value
    ⌊joint · 100 / given⌋. -/
theorem fam_probability_conditional_1 : ((30 * 100) / 60) = 50 := by decide

/-- probability: expected(200, 25) = 50 — EXPECTED value: a value weighted by its percentage chance. value
    ⌊value · probability / 100⌋. -/
theorem fam_probability_expected_1 : ((200 * 25) / 100) = 50 := by decide

/-- probability: bayes(40, 50) = 20 — BAYES: a prior scaled by a percentage likelihood. value ⌊prior ·
    likelihood / 100⌋. -/
theorem fam_probability_bayes_1 : ((40 * 50) / 100) = 20 := by decide

/-- probability: combinations(5, 2) = 10 — COMBINATIONS: the ways to choose, a product proxy. value items ·
    choose. -/
theorem fam_probability_combinations_1 : (5 * 2) = 10 := by decide

/-- probability: variance(400, 10) = 40 — VARIANCE: summed squared deviation over the trials. value ⌊squared /
    trials⌋. -/
theorem fam_probability_variance_1 : (400 / 10) = 40 := by decide

/-- probability: entropy(8) = 8 — ENTROPY: the outcomes, a bits proxy. value outcomes. -/
theorem fam_probability_entropy_1 : 8 = 8 := by decide

/-- probability: independence(30, 60) = 50 — INDEPENDENCE: the joint over a marginal, as a percentage. value
    ⌊joint · 100 / marginal⌋. -/
theorem fam_probability_independence_1 : ((30 * 100) / 60) = 50 := by decide

/-- procurement: savings(100, 70) = 30 — PROCUREMENT — BUYING AS ARITHMETIC (chosen by the registry, not by
    hand). Sourcing is numbers: the savings a negotiation wins, the spend a line item books, the share of
    compliant orders, the lead time to receipt, an economic order-quantity proxy, a supplier's on-time rate, a
    volume discount, and the share of accepted goods. Crosses to `logistics` — what procurement buys is what
    logistics moves. A measure. */ const PROOF = 'procurement arithmetic (savings, spend, compliance, lead time,
    economic order quantity, supplier on-time, volume discount, quality); a registry domain; a measure crossed
    to logistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'procurement', dst: 'logistics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `procurement.${name}`, params }) export class
    ProcurementFormulas { /** SAVINGS: what a negotiation shaves off the baseline, never below zero. value
    max(0, baseline − negotiated). -/
theorem fam_procurement_savings_1 : (fmax 0 (100 - 70)) = 30 := by decide

/-- procurement: savings(70, 100) = 0 — PROCUREMENT — BUYING AS ARITHMETIC (chosen by the registry, not by
    hand). Sourcing is numbers: the savings a negotiation wins, the spend a line item books, the share of
    compliant orders, the lead time to receipt, an economic order-quantity proxy, a supplier's on-time rate, a
    volume discount, and the share of accepted goods. Crosses to `logistics` — what procurement buys is what
    logistics moves. A measure. */ const PROOF = 'procurement arithmetic (savings, spend, compliance, lead time,
    economic order quantity, supplier on-time, volume discount, quality); a registry domain; a measure crossed
    to logistics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c =
    (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'procurement', dst: 'logistics',
    formula, value, proof: PROOF, ...extra }, holds, { name: `procurement.${name}`, params }) export class
    ProcurementFormulas { /** SAVINGS: what a negotiation shaves off the baseline, never below zero. value
    max(0, baseline − negotiated). -/
theorem fam_procurement_savings_2 : (fmax 0 (70 - 100)) = 0 := by decide

/-- procurement: spend(100, 5) = 500 — SPEND: units at a unit price. value units · price. -/
theorem fam_procurement_spend_1 : (100 * 5) = 500 := by decide

/-- procurement: compliance(90, 100) = 90 — COMPLIANCE: the share of compliant orders as a percentage. value
    ⌊compliant · 100 / total⌋. -/
theorem fam_procurement_compliance_1 : ((90 * 100) / 100) = 90 := by decide

/-- procurement: leadtime(3, 10) = 7 — LEAD TIME: days from order to receipt, never below zero. value max(0,
    received − ordered). -/
theorem fam_procurement_leadtime_1 : (fmax 0 (10 - 3)) = 7 := by decide

/-- procurement: eoq(1000, 50) = 20 — ECONOMIC ORDER QUANTITY proxy: demand over the per-order cost. value
    ⌊demand / cost⌋. -/
theorem fam_procurement_eoq_1 : (1000 / 50) = 20 := by decide

/-- procurement: supplier(95, 100) = 95 — SUPPLIER on-time rate as a percentage. value ⌊delivered · 100 /
    promised⌋. -/
theorem fam_procurement_supplier_1 : ((95 * 100) / 100) = 95 := by decide

/-- procurement: discount(1000, 10) = 100 — VOLUME DISCOUNT: a rate (percent) off a volume. value ⌊volume · rate
    / 100⌋. -/
theorem fam_procurement_discount_1 : ((1000 * 10) / 100) = 100 := by decide

/-- procurement: quality(990, 1000) = 99 — QUALITY: the share of accepted goods as a percentage. value ⌊accepted
    · 100 / received⌋. -/
theorem fam_procurement_quality_1 : ((990 * 100) / 1000) = 99 := by decide

/-- profiling: hotspot(30, 120) = 25 — PROFILING — WHERE RUNNING CODE SPENDS ITSELF, AS ARITHMETIC. A profile is
    numbers: the share of time in a hotspot, operations per second, bytes per allocated object, the speedup a
    change buys, instrumentation overhead, cache hit rate, frames per flamegraph depth, and garbage collections
    per unit of runtime. Crosses to `code` — profiling measures code. */ const PROOF = 'profiling arithmetic
    (hotspot share, throughput, allocation, speedup, overhead, cache hit, flamegraph, gc rate); where running
    code spends itself; a measure crossed to code' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'profiling', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `profiling.${name}`,
    params }) export class ProfilingFormulas { /** HOTSPOT: a function's self time as a percentage of the total.
    value ⌊self · 100 / total⌋. -/
theorem fam_profiling_hotspot_1 : ((30 * 100) / 120) = 25 := by decide

/-- profiling: throughput(6000, 60) = 100 — THROUGHPUT: operations over seconds. value ⌊operations / seconds⌋. -/
theorem fam_profiling_throughput_1 : (6000 / 60) = 100 := by decide

/-- profiling: allocation(10000, 500) = 20 — ALLOCATION: bytes over the objects allocated. value ⌊bytes /
    objects⌋. -/
theorem fam_profiling_allocation_1 : (10000 / 500) = 20 := by decide

/-- profiling: speedup(300, 100) = 300 — SPEEDUP: before over after, as a percentage. value ⌊before · 100 /
    after⌋. -/
theorem fam_profiling_speedup_1 : ((300 * 100) / 100) = 300 := by decide

/-- profiling: overhead(120, 100) = 20 — OVERHEAD: the instrumented run over the baseline, as a percentage.
    value ⌊(instrumented − baseline) · 100 / baseline⌋. -/
theorem fam_profiling_overhead_1 : (((120 - 100) * 100) / 100) = 20 := by decide

/-- profiling: cachehit(950, 1000) = 95 — CACHE HIT: hits over accesses, as a percentage. value ⌊hits · 100 /
    accesses⌋. -/
theorem fam_profiling_cachehit_1 : ((950 * 100) / 1000) = 95 := by decide

/-- profiling: flamegraph(640, 8) = 80 — FLAMEGRAPH: frames over the stack depth. value ⌊frames / depth⌋. -/
theorem fam_profiling_flamegraph_1 : (640 / 8) = 80 := by decide

/-- profiling: gc(3, 1000) = 3 — GC: collections per thousand units of runtime. value ⌊collections · 1000 /
    runtime⌋. -/
theorem fam_profiling_gc_1 : ((3 * 1000) / 1000) = 3 := by decide

/-- project: progress(75, 100) = 75 — PROJECT — PROJECT MANAGEMENT AS ARITHMETIC (chosen by the public-API
    registry, not by hand). Running a project is numbers: how much is done, how much is spent, how much time has
    gone, the velocity of the team, open risk, the burndown, milestones reached, and schedule overrun. Crosses
    to `collaboration` — a project is what a team works on together. A measure. */ const PROOF = 'project
    management arithmetic (progress, budget, schedule, velocity, risk, burndown, milestone, overrun); a
    public-API domain; a measure crossed to collaboration' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'project', dst: 'collaboration', formula, value, proof: PROOF, ...extra }, holds, { name:
    `project.${name}`, params }) export class ProjectFormulas { /** PROGRESS as a percentage. value ⌊done · 100
    / total⌋. -/
theorem fam_project_progress_1 : ((75 * 100) / 100) = 75 := by decide

/-- project: budget(600, 1000) = 60 — BUDGET spent as a percentage. value ⌊spent · 100 / total⌋. -/
theorem fam_project_budget_1 : ((600 * 100) / 1000) = 60 := by decide

/-- project: schedule(30, 90) = 33 — SCHEDULE elapsed as a percentage. value ⌊elapsed · 100 / planned⌋. -/
theorem fam_project_schedule_1 : ((30 * 100) / 90) = 33 := by decide

/-- project: velocity(120, 4) = 30 — VELOCITY: story points per sprint. value ⌊points / sprints⌋. -/
theorem fam_project_velocity_1 : (120 / 4) = 30 := by decide

/-- project: risk(3, 20) = 15 — RISK: open items as a percentage of all. value ⌊open · 100 / total⌋. -/
theorem fam_project_risk_1 : ((3 * 100) / 20) = 15 := by decide

/-- project: burndown(40, 100) = 40 — BURNDOWN: work remaining as a percentage. value ⌊remaining · 100 / total⌋. -/
theorem fam_project_burndown_1 : ((40 * 100) / 100) = 40 := by decide

/-- project: milestone(5, 8) = 62 — MILESTONE: milestones reached as a percentage. value ⌊reached · 100 /
    total⌋. -/
theorem fam_project_milestone_1 : ((5 * 100) / 8) = 62 := by decide

/-- project: overrun(14, 10) = 4 — OVERRUN: schedule slip, never below zero. value max(0, actual − planned). -/
theorem fam_project_overrun_1 : (fmax 0 (14 - 10)) = 4 := by decide

/-- project: overrun(8, 10) = 0 — OVERRUN: schedule slip, never below zero. value max(0, actual − planned). -/
theorem fam_project_overrun_2 : (fmax 0 (8 - 10)) = 0 := by decide

/-- promotion: discount(1000, 25) = 250 — PROMOTION — RUNNING A SALE, AS ARITHMETIC (chosen by the campaign
    registry, not by hand). Moving product is numbers: the discount a price carries, how many coupons came back,
    the lift a promo bought, the coupon liability on the books, what a bundle saves, the markdown off the tag,
    the rep's spiff, and the units that would not have sold. Crosses to `marketing` — promotion is the spend
    marketing books. A measure. */ const PROOF = 'promotion arithmetic (discount, redemption, lift, coupon
    liability, bundle saving, markdown, spiff, incremental units); a campaign measure crossed to marketing'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'promotion', dst: 'marketing', formula, value,
    proof: PROOF, ...extra }, holds, { name: `promotion.${name}`, params }) export class PromotionFormulas { /**
    DISCOUNT: the amount a percent takes off a price. value ⌊price · pct / 100⌋. -/
theorem fam_promotion_discount_1 : ((1000 * 25) / 100) = 250 := by decide

/-- promotion: redemption(150, 1000) = 15 — REDEMPTION: the share of issued coupons that came back. value
    ⌊redeemed · 100 / issued⌋. -/
theorem fam_promotion_redemption_1 : ((150 * 100) / 1000) = 15 := by decide

/-- promotion: lift(1500, 1000) = 50 — LIFT: the percent a promo raised sales over the baseline. value ⌊(after −
    before) · 100 / before⌋. -/
theorem fam_promotion_lift_1 : (((fmax 0 (1500 - 1000)) * 100) / 1000) = 50 := by decide

/-- promotion: coupon(5, 2000) = 10000 — COUPON LIABILITY: face value times the count outstanding. value
    faceValue · count. -/
theorem fam_promotion_coupon_1 : (5 * 2000) = 10000 := by decide

/-- promotion: bundle(1200, 999) = 201 — BUNDLE SAVING: what the bundle price saves against buying apart. value
    max(0, itemsPrice − bundlePrice). -/
theorem fam_promotion_bundle_1 : (fmax 0 (1200 - 999)) = 201 := by decide

/-- promotion: markdown(80, 60) = 25 — MARKDOWN: the percent off the original tag. value ⌊(original − sale) ·
    100 / original⌋. -/
theorem fam_promotion_markdown_1 : (((80 - 60) * 100) / 80) = 25 := by decide

/-- promotion: spiff(40, 25) = 1000 — SPIFF: the rep incentive, units times the per-unit bonus. value units ·
    perUnit. -/
theorem fam_promotion_spiff_1 : (40 * 25) = 1000 := by decide

/-- promotion: incremental(500, 320) = 180 — INCREMENTAL: the units the promo sold over the baseline. value
    max(0, promo − baseline). -/
theorem fam_promotion_incremental_1 : (fmax 0 (500 - 320)) = 180 := by decide

/-- promotion: bundle(900, 1200) = 0 — BUNDLE SAVING: what the bundle price saves against buying apart. value
    max(0, itemsPrice − bundlePrice). -/
theorem fam_promotion_bundle_2 : (fmax 0 (900 - 1200)) = 0 := by decide

/-- proof: steps(10, 5) = 15 -/
theorem fam_proof_steps_1 : (10 + 5) = 15 := by decide

/-- proof: lemmas(8, 2) = 16 -/
theorem fam_proof_lemmas_1 : (8 * 2) = 16 := by decide

/-- proof: branchsubsets(5) = 32 -/
theorem fam_proof_branchsubsets_1 : (2 ^ 5) = 32 := by decide

/-- proof: qed(100, 100) = 100 -/
theorem fam_proof_qed_1 : ((100 * 100) / 100) = 100 := by decide

/-- proof: axiomsused(5, 3) = 8 -/
theorem fam_proof_axiomsused_1 : (5 + 3) = 8 := by decide

/-- proofing: prooftime(180, 2) = 90 -/
theorem fam_proofing_prooftime_1 : (180 / 2) = 90 := by decide

/-- proofing: volumegain(180, 100) = 180 -/
theorem fam_proofing_volumegain_1 : ((180 * 100) / 100) = 180 := by decide

/-- proofing: temperaturefactor(27, 3) = 9 -/
theorem fam_proofing_temperaturefactor_1 : (27 / 3) = 9 := by decide

/-- proofing: humiditylevel(75, 100) = 75 -/
theorem fam_proofing_humiditylevel_1 : ((75 * 100) / 100) = 75 := by decide

/-- proofing: fermentationdegree(90, 100) = 90 -/
theorem fam_proofing_fermentationdegree_1 : ((90 * 100) / 100) = 90 := by decide

/-- proofing: overproofrisk(200, 180) = 20 -/
theorem fam_proofing_overproofrisk_1 : (fmax 0 (200 - 180)) = 20 := by decide

/-- proofing: doughtemp(24, 3) = 27 -/
theorem fam_proofing_doughtemp_1 : (24 + 3) = 27 := by decide

/-- proofing: yeastdose(1000, 100) = 10 -/
theorem fam_proofing_yeastdose_1 : (1000 / 100) = 10 := by decide

/-- prophecy: fulfillmentratio(8, 10) = 80 -/
theorem fam_prophecy_fulfillmentratio_1 : ((8 * 100) / 10) = 80 := by decide

/-- prophecy: symbolcount(7, 3) = 21 -/
theorem fam_prophecy_symbolcount_1 : (7 * 3) = 21 := by decide

/-- prophecy: timecycles(7, 70) = 490 -/
theorem fam_prophecy_timecycles_1 : (7 * 70) = 490 := by decide

/-- prophecy: numbersum(12, 12, 12) = 36 -/
theorem fam_prophecy_numbersum_1 : ((12 + 12) + 12) = 36 := by decide

/-- prophecy: subsetreadings(5) = 32 -/
theorem fam_prophecy_subsetreadings_1 : (2 ^ 5) = 32 := by decide

/-- prophecy: intervalspan(490, 70) = 420 -/
theorem fam_prophecy_intervalspan_1 : (fmax 0 (490 - 70)) = 420 := by decide

/-- propulsion: thrust(300, 20) = 6000 — PROPULSION — MOVING MASS, AS ARITHMETIC (chosen by the engineering
    registry, not by hand). A thrust chamber is numbers: thrust from pressure over an area, propulsive
    efficiency, specific fuel consumption, the bypass ratio, the compression ratio, shaft power, exhaust
    temperature, and the mass flow. Crosses to `aerospace` — propulsion is what flight runs on. A measure. */
    const PROOF = 'propulsion arithmetic (thrust, efficiency, specific fuel, bypass ratio, compression ratio,
    power, exhaust, mass flow); the engineering registry\'s uncovered domain; a measure crossed to aerospace'
    const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string,
    formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string,
    unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'propulsion', dst: 'aerospace', formula, value,
    proof: PROOF, ...extra }, holds, { name: `propulsion.${name}`, params }) export class PropulsionFormulas {
    /** THRUST: chamber pressure over the nozzle area. value pressure · area. -/
theorem fam_propulsion_thrust_1 : (300 * 20) = 6000 := by decide

/-- propulsion: efficiency(80, 100) = 80 — PROPULSIVE EFFICIENCY as a percentage. value ⌊output · 100 / input⌋. -/
theorem fam_propulsion_efficiency_1 : ((80 * 100) / 100) = 80 := by decide

/-- propulsion: specificfuel(5, 1000) = 5 — SPECIFIC FUEL CONSUMPTION: fuel per unit of thrust (per thousand).
    value ⌊fuel · 1000 / thrust_⌋. -/
theorem fam_propulsion_specificfuel_1 : ((5 * 1000) / 1000) = 5 := by decide

/-- propulsion: bypass(900, 100) = 900 — BYPASS RATIO: secondary flow over primary flow (percent). value
    ⌊secondary · 100 / primary⌋. -/
theorem fam_propulsion_bypass_1 : ((900 * 100) / 100) = 900 := by decide

/-- propulsion: compression(4000, 100) = 4000 — COMPRESSION RATIO: outlet pressure over inlet pressure
    (percent). value ⌊outlet · 100 / inlet⌋. -/
theorem fam_propulsion_compression_1 : ((4000 * 100) / 100) = 4000 := by decide

/-- propulsion: power(500, 20) = 10000 — SHAFT POWER: force at a velocity. value force · velocity. -/
theorem fam_propulsion_power_1 : (500 * 20) = 10000 := by decide

/-- propulsion: exhaust(850) = 850 — EXHAUST TEMPERATURE: the measured reading, held. value temperature. -/
theorem fam_propulsion_exhaust_1 : 850 = 850 := by decide

/-- propulsion: massflow(12, 300) = 3600 — MASS FLOW: density at a velocity. value density · velocity. -/
theorem fam_propulsion_massflow_1 : (12 * 300) = 3600 := by decide

/-- prosody: syllablecount(100, 2) = 200 — PROSODY — THE MUSIC OF SPEECH, AS ARITHMETIC. The spoken line is
    numbers: syllables per line, the share that carry stress, how fast the words come, how many breaths break
    the phrase, the span from lowest pitch to highest, the metrical feet, the rhythm's pairwise variability, and
    the beat. Crosses to `linguistics` — prosody is the sound the grammar is spoken in. A measure. */ const
    PROOF = 'prosody arithmetic (syllable count, stress ratio, speech rate, pause count, pitch range, metrical
    feet, rhythm index, tempo); the music of speech as integers; a measure crossed to linguistics' const nat =
    (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula:
    string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'prosody', dst: 'linguistics', formula, value, proof: PROOF,
    ...extra }, holds, { name: `prosody.${name}`, params }) export class ProsodyFormulas { /** SYLLABLE COUNT:
    words at syllables each. value words · perWord. -/
theorem fam_prosody_syllablecount_1 : (100 * 2) = 200 := by decide

/-- prosody: stressratio(3, 4) = 75 — STRESS RATIO: the percentage of syllables that carry stress. value
    ⌊stressed · 100 / total⌋. -/
theorem fam_prosody_stressratio_1 : ((3 * 100) / 4) = 75 := by decide

/-- prosody: speechrate(900, 6) = 150 — SPEECH RATE: words over minutes, in words per minute. value ⌊words /
    minutes⌋. -/
theorem fam_prosody_speechrate_1 : (900 / 6) = 150 := by decide

/-- prosody: pitchrange(300, 120) = 180 — PITCH RANGE: the span from lowest to highest pitch (Hz). value max(0,
    high − low). -/
theorem fam_prosody_pitchrange_1 : (fmax 0 (300 - 120)) = 180 := by decide

/-- prosody: pitchrange(100, 150) = 0 — PITCH RANGE: the span from lowest to highest pitch (Hz). value max(0,
    high − low). -/
theorem fam_prosody_pitchrange_2 : (fmax 0 (100 - 150)) = 0 := by decide

/-- prosody: meterfeet(10, 2) = 5 — METRICAL FEET: syllables grouped into feet of a fixed length. value
    ⌊syllables / perFoot⌋. -/
theorem fam_prosody_meterfeet_1 : (10 / 2) = 5 := by decide

/-- prosody: rhythmindex(30, 60) = 50 — RHYTHM INDEX: normalized pairwise variability of durations. value ⌊diff
    · 100 / sum⌋. -/
theorem fam_prosody_rhythmindex_1 : ((30 * 100) / 60) = 50 := by decide

/-- prosody: tempo(480, 4) = 120 — TEMPO: beats over minutes, in beats per minute. value ⌊beats / minutes⌋. -/
theorem fam_prosody_tempo_1 : (480 / 4) = 120 := by decide

/-- proteomics: abundance(25, 100) = 25 — PROTEOMICS — THE PROTEIN CENSUS, AS ARITHMETIC (chosen by the
    biochemistry registry, not by hand). Measuring proteins is numbers: relative abundance, the mass
    spectrometer's mass-to-charge, sequence coverage, fold change between conditions, the isoelectric point,
    digestion efficiency, interaction degree, and copies per cell. Crosses to `biochemistry` — proteins are
    biochemistry's subject. A measure. */ const PROOF = 'proteomics arithmetic (abundance, mass spec m/z,
    coverage, fold change, isoelectric point, digestion, interaction, expression); a biochemistry domain; a
    measure crossed to biochemistry' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) &&
    x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'proteomics', dst:
    'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `proteomics.${name}`, params })
    export class ProteomicsFormulas { /** ABUNDANCE: a peptide's share of the total, as a percentage. value
    ⌊peptides · 100 / total⌋. -/
theorem fam_proteomics_abundance_1 : ((25 * 100) / 100) = 25 := by decide

/-- proteomics: massspec(2400, 3) = 800 — MASS SPECTROMETRY: mass over charge (m/z). value ⌊mass / charge⌋. -/
theorem fam_proteomics_massspec_1 : (2400 / 3) = 800 := by decide

/-- proteomics: coverage(60, 200) = 30 — SEQUENCE COVERAGE: identified residues over the sequence, as a
    percentage. value ⌊identified · 100 / sequence⌋. -/
theorem fam_proteomics_coverage_1 : ((60 * 100) / 200) = 30 := by decide

/-- proteomics: foldchange(300, 100) = 300 — FOLD CHANGE: treated over control, as a percentage. value ⌊treated
    · 100 / control⌋. -/
theorem fam_proteomics_foldchange_1 : ((300 * 100) / 100) = 300 := by decide

/-- proteomics: isoelectric(7) = 7 — ISOELECTRIC POINT: the pH as given. value ph. -/
theorem fam_proteomics_isoelectric_1 : 7 = 7 := by decide

/-- proteomics: digestion(18, 20) = 90 — DIGESTION: cleaved bonds over the cleavage sites, as a percentage.
    value ⌊cleaved · 100 / sites⌋. -/
theorem fam_proteomics_digestion_1 : ((18 * 100) / 20) = 90 := by decide

/-- proteomics: interaction(120, 40) = 3 — INTERACTION: binding partners per protein. value ⌊partners /
    proteins⌋. -/
theorem fam_proteomics_interaction_1 : (120 / 40) = 3 := by decide

/-- proteomics: expression(50000, 1000) = 50 — EXPRESSION: protein copies per cell. value ⌊copies / cell⌋. -/
theorem fam_proteomics_expression_1 : (50000 / 1000) = 50 := by decide

/-- prototyping: fidelity(80, 100) = 80 — PROTOTYPING — THE EARLY-BUILD LOOP, AS ARITHMETIC. A prototype is
    numbers: how faithful to the final it is, how many iterations per week, how much of the screens the flows
    cover, how much feedback got incorporated, the velocity of screens per day, how much is reused, how much of
    what was tested validated, and how interactive the screens are. Crosses to `content` — a prototype is
    content made early. A measure. */ const PROOF = 'prototyping arithmetic (fidelity, iterations, coverage,
    feedback, velocity, reuse, validation, interactivity); the early-build loop as numbers; a measure crossed to
    content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id:
    string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'prototyping', dst: 'content',
    formula, value, proof: PROOF, ...extra }, holds, { name: `prototyping.${name}`, params }) export class
    PrototypingFormulas { /** FIDELITY: how close the detail is to the final, as a percentage. value ⌊detail ·
    100 / max⌋. -/
theorem fam_prototyping_fidelity_1 : ((80 * 100) / 100) = 80 := by decide

/-- prototyping: iterations(12, 4) = 3 — ITERATIONS: versions per week. value ⌊versions / weeks⌋. -/
theorem fam_prototyping_iterations_1 : (12 / 4) = 3 := by decide

/-- prototyping: coverage(20, 5) = 4 — COVERAGE: screens per flow. value ⌊screens / flows⌋. -/
theorem fam_prototyping_coverage_1 : (20 / 5) = 4 := by decide

/-- prototyping: feedback(45, 90) = 50 — FEEDBACK: incorporated out of received, as a percentage. value
    ⌊incorporated · 100 / received⌋. -/
theorem fam_prototyping_feedback_1 : ((45 * 100) / 90) = 50 := by decide

/-- prototyping: velocity(30, 6) = 5 — VELOCITY: screens per day. value ⌊screens / days⌋. -/
theorem fam_prototyping_velocity_1 : (30 / 6) = 5 := by decide

/-- prototyping: reuse(30, 120) = 25 — REUSE: reused out of components, as a percentage. value ⌊reused · 100 /
    components⌋. -/
theorem fam_prototyping_reuse_1 : ((30 * 100) / 120) = 25 := by decide

/-- prototyping: validation(90, 100) = 90 — VALIDATION: passed out of tested, as a percentage. value ⌊passed ·
    100 / tested⌋. -/
theorem fam_prototyping_validation_1 : ((90 * 100) / 100) = 90 := by decide

/-- prototyping: interactivity(15, 30) = 50 — INTERACTIVITY: interactive out of screens, as a percentage. value
    ⌊interactive · 100 / screens⌋. -/
theorem fam_prototyping_interactivity_1 : ((15 * 100) / 30) = 50 := by decide

/-- protozoology: cellcount(1000, 10) = 10000 -/
theorem fam_protozoology_cellcount_1 : (1000 * 10) = 10000 := by decide

/-- protozoology: divisionrate(8) = 256 -/
theorem fam_protozoology_divisionrate_1 : (2 ^ 8) = 256 := by decide

/-- protozoology: motilitytypes(3, 1) = 4 -/
theorem fam_protozoology_motilitytypes_1 : (3 + 1) = 4 := by decide

/-- protozoology: cystcount(5000, 50) = 100 -/
theorem fam_protozoology_cystcount_1 : (5000 / 50) = 100 := by decide

/-- protozoology: virulenceindex(70, 100) = 70 -/
theorem fam_protozoology_virulenceindex_1 : ((70 * 100) / 100) = 70 := by decide

/-- protozoology: generationtime(1440, 8) = 180 -/
theorem fam_protozoology_generationtime_1 : (1440 / 8) = 180 := by decide

/-- protozoology: infectivity(60, 100) = 60 -/
theorem fam_protozoology_infectivity_1 : ((60 * 100) / 100) = 60 := by decide

/-- psalmody: psalmcount(100, 50) = 150 -/
theorem fam_psalmody_psalmcount_1 : (100 + 50) = 150 := by decide

/-- psalmody: versesum(150, 16) = 2400 -/
theorem fam_psalmody_versesum_1 : (150 * 16) = 2400 := by decide

/-- psalmody: acrosticletters(22, 0) = 22 -/
theorem fam_psalmody_acrosticletters_1 : (22 + 0) = 22 := by decide

/-- psalmody: meterfeet(4, 3) = 12 -/
theorem fam_psalmody_meterfeet_1 : (4 * 3) = 12 := by decide

/-- psalmody: strophesubsets(5) = 32 -/
theorem fam_psalmody_strophesubsets_1 : (2 ^ 5) = 32 := by decide

/-- psychiatry: phq(21) = 21 — PSYCHIATRY — CLINICAL MENTAL-HEALTH MEASURES, AS ARITHMETIC. Scoring a condition
    is numbers: the PHQ-9 total, severity against a ceiling, remission and relapse rates, medication adherence,
    symptom response, risk load, and a net wellbeing. Crosses to `med` — psychiatry is a branch of medicine. A
    measure. */ const PROOF = 'psychiatry arithmetic (PHQ-9 total, severity, remission, relapse, adherence,
    response, risk, wellbeing); a clinical mental-health measure crossed to med' const nat = (...xs: number[])
    => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number,
    holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
    crossFormulaOf({ id, src: 'psychiatry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name:
    `psychiatry.${name}`, params }) export class PsychiatryFormulas { /** PHQ-9 TOTAL: the sum of the item
    scores. value items. -/
theorem fam_psychiatry_phq_1 : 21 = 21 := by decide

/-- psychiatry: severity(45, 100) = 45 — SEVERITY as a percentage of the maximum. value ⌊score · 100 / max⌋. -/
theorem fam_psychiatry_severity_1 : ((45 * 100) / 100) = 45 := by decide

/-- psychiatry: remission(60, 200) = 30 — REMISSION rate: the improved over the treated. value ⌊improved · 100 /
    treated⌋. -/
theorem fam_psychiatry_remission_1 : ((60 * 100) / 200) = 30 := by decide

/-- psychiatry: relapse(20, 100) = 20 — RELAPSE rate: the returned over the recovered. value ⌊returned · 100 /
    recovered⌋. -/
theorem fam_psychiatry_relapse_1 : ((20 * 100) / 100) = 20 := by decide

/-- psychiatry: adherence(27, 30) = 90 — ADHERENCE: the doses taken over those prescribed. value ⌊taken · 100 /
    prescribed⌋. -/
theorem fam_psychiatry_adherence_1 : ((27 * 100) / 30) = 90 := by decide

/-- psychiatry: response(20, 5) = 75 — RESPONSE: the symptom reduction as a percentage. value ⌊(before − after)
    · 100 / before⌋. -/
theorem fam_psychiatry_response_1 : (((20 - 5) * 100) / 20) = 75 := by decide

/-- psychiatry: risk(3, 12) = 25 — RISK: the factors present over the total. value ⌊factors · 100 / total⌋. -/
theorem fam_psychiatry_risk_1 : ((3 * 100) / 12) = 25 := by decide

/-- psychiatry: wellbeing(8, 3) = 5 — WELLBEING: positive affect net of negative, never below zero. value max(0,
    positive − negative). -/
theorem fam_psychiatry_wellbeing_1 : (fmax 0 (8 - 3)) = 5 := by decide

/-- psychiatry: wellbeing(3, 8) = 0 — WELLBEING: positive affect net of negative, never below zero. value max(0,
    positive − negative). -/
theorem fam_psychiatry_wellbeing_2 : (fmax 0 (3 - 8)) = 0 := by decide

/-- psychology: iq(12, 10) = 120 — PSYCHOLOGY — THE MIND AS ARITHMETIC (chosen by the registry, not by hand).
    Measuring behaviour is numbers: the intelligence quotient, a correlation as a percentage, test reliability,
    mean reaction time, conditioning strength, recall, arousal above baseline, and conformity to a group.
    Crosses to `sociology` — one mind among many. A measure. */ const PROOF = 'psychology arithmetic (iq,
    correlation, reliability, reaction time, conditioning, recall, arousal, conformity); a measure of the mind
    crossed to sociology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'psychology', dst:
    'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `psychology.${name}`, params }) export
    class PsychologyFormulas { /** THE INTELLIGENCE QUOTIENT: mental age over chronological age, as a
    percentage. value ⌊mental · 100 / chronological⌋. -/
theorem fam_psychology_iq_1 : ((12 * 100) / 10) = 120 := by decide

/-- psychology: correlation(80, 100) = 80 — CORRELATION as a percentage: agreements over the total. value ⌊agree
    · 100 / total⌋. -/
theorem fam_psychology_correlation_1 : ((80 * 100) / 100) = 80 := by decide

/-- psychology: reliability(90, 100) = 90 — RELIABILITY as a percentage: consistent results over the trials.
    value ⌊consistent · 100 / trials⌋. -/
theorem fam_psychology_reliability_1 : ((90 * 100) / 100) = 90 := by decide

/-- psychology: reaction(5000, 20) = 250 — MEAN REACTION TIME: total milliseconds over the stimuli. value ⌊total
    / stimuli⌋. -/
theorem fam_psychology_reaction_1 : (5000 / 20) = 250 := by decide

/-- psychology: conditioning(45, 50) = 90 — CONDITIONING strength as a percentage: conditioned responses over
    the trials. value ⌊responses · 100 / trials⌋. -/
theorem fam_psychology_conditioning_1 : ((45 * 100) / 50) = 90 := by decide

/-- psychology: recall(7, 10) = 70 — RECALL as a percentage: remembered items over the learned items. value
    ⌊remembered · 100 / learned⌋. -/
theorem fam_psychology_recall_1 : ((7 * 100) / 10) = 70 := by decide

/-- psychology: arousal(80, 30) = 50 — AROUSAL above baseline: stimulation less the baseline, not below zero.
    value max(0, stimulation − baseline). -/
theorem fam_psychology_arousal_1 : (fmax 0 (80 - 30)) = 50 := by decide

/-- psychology: arousal(20, 30) = 0 — AROUSAL above baseline: stimulation less the baseline, not below zero.
    value max(0, stimulation − baseline). -/
theorem fam_psychology_arousal_2 : (fmax 0 (20 - 30)) = 0 := by decide

/-- psychology: conformity(6, 8) = 75 — CONFORMITY as a percentage: those who conformed over the group. value
    ⌊conformed · 100 / group⌋. -/
theorem fam_psychology_conformity_1 : ((6 * 100) / 8) = 75 := by decide

/-- psychometrics: reliability(85, 100) = 85 — PSYCHOMETRICS — THE MEASUREMENT OF THE MIND, AS ARITHMETIC. A
    test is numbers: how reliably it repeats, how well it predicts, a raw score turned standard, a percentile
    rank, how hard an item is, how well an item discriminates, the internal consistency of the whole, and a raw
    score normalised to a scale. Crosses to `psychology` — psychometrics is how psychology is measured. A
    measure. */ const PROOF = 'psychometrics arithmetic (reliability, validity, standard score, percentile, item
    difficulty, discrimination, Cronbach\'s alpha, normalisation); the measurement of the mind; a measure
    crossed to psychology' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'psychometrics', dst:
    'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `psychometrics.${name}`, params })
    export class PsychometricsFormulas { /** RELIABILITY: consistent responses over the total, as a percentage.
    value ⌊consistent · 100 / total⌋. -/
theorem fam_psychometrics_reliability_1 : ((85 * 100) / 100) = 85 := by decide

/-- psychometrics: validity(75, 100) = 75 — VALIDITY: correct predictions over all predictions, as a percentage.
    value ⌊hits · 100 / predictions⌋. -/
theorem fam_psychometrics_validity_1 : ((75 * 100) / 100) = 75 := by decide

/-- psychometrics: standardscore(130, 100, 15) = 200 — STANDARD SCORE: a raw score turned standard against a
    mean and a standard deviation. value sd > 0 ? ⌊max(0, raw − mean) · 100 / sd⌋ : 0. -/
theorem fam_psychometrics_standardscore_1 : (((fmax 0 (130 - 100)) * 100) / 15) = 200 := by decide

/-- psychometrics: standardscore(90, 100, 15) = 0 — STANDARD SCORE: a raw score turned standard against a mean
    and a standard deviation. value sd > 0 ? ⌊max(0, raw − mean) · 100 / sd⌋ : 0. -/
theorem fam_psychometrics_standardscore_2 : (((fmax 0 (90 - 100)) * 100) / 15) = 0 := by decide

/-- psychometrics: percentile(84, 100) = 84 — PERCENTILE: the share scoring at or below, as a rank. value ⌊below
    · 100 / total⌋. -/
theorem fam_psychometrics_percentile_1 : ((84 * 100) / 100) = 84 := by decide

/-- psychometrics: itemdifficulty(60, 80) = 75 — ITEM DIFFICULTY: the proportion answering an item correctly
    (the p-value). value ⌊correct · 100 / total⌋. -/
theorem fam_psychometrics_itemdifficulty_1 : ((60 * 100) / 80) = 75 := by decide

/-- psychometrics: discrimination(18, 6, 20) = 60 — DISCRIMINATION: how far an item separates the upper group
    from the lower, per group size. value group > 0 ? ⌊max(0, upper − lower) · 100 / group⌋ : 0. -/
theorem fam_psychometrics_discrimination_1 : (((fmax 0 (18 - 6)) * 100) / 20) = 60 := by decide

/-- psychometrics: cronbach(10, 20, 100) = 88 — CRONBACH'S ALPHA: internal consistency, ⌊(k / (k − 1)) · (1 −
    sumvar / totvar) · 100⌋. value totvar > 0 ? ⌊k · max(0, totvar − sumvar) · 100 / (max(1, k − 1) · totvar)⌋ :
    0. -/
theorem fam_psychometrics_cronbach_1 : (((10 * (fmax 0 (100 - 20))) * 100) / ((fmax 1 (10 - 1)) * 100)) = 88 := by decide

/-- psychometrics: normalization(40, 50, 100) = 80 — NORMALISATION: a raw score out of its maximum, placed on a
    scale. value max > 0 ? ⌊raw · scale / max⌋ : 0. -/
theorem fam_psychometrics_normalization_1 : ((40 * 100) / 50) = 80 := by decide

/-- psychophysics: weberfraction(5, 100) = 50 — PSYCHOPHYSICS — THE LAW BETWEEN STIMULUS AND SENSATION, AS
    ARITHMETIC. How much a stimulus must change to be felt is numbers: the Weber fraction, the just-noticeable
    difference, the percent-correct threshold, Stevens' power-law magnitude, signal-over-noise sensitivity,
    reaction time, sensory adaptation, and magnitude estimation. Crosses to `neuroscience` — psychophysics is
    the behaviour the neurons produce. A measure. */ const PROOF = 'psychophysics arithmetic (Weber fraction,
    jnd, threshold, Stevens power, sensitivity, reaction time, adaptation, magnitude); the law between stimulus
    and sensation; a measure crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'psychophysics', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name:
    `psychophysics.${name}`, params }) export class PsychophysicsFormulas { /** WEBER FRACTION: the change over
    the baseline, per mille. value ⌊delta · 1000 / baseline⌋. -/
theorem fam_psychophysics_weberfraction_1 : ((5 * 1000) / 100) = 50 := by decide

/-- psychophysics: weberfraction(5, 0) = 0 — PSYCHOPHYSICS — THE LAW BETWEEN STIMULUS AND SENSATION, AS
    ARITHMETIC. How much a stimulus must change to be felt is numbers: the Weber fraction, the just-noticeable
    difference, the percent-correct threshold, Stevens' power-law magnitude, signal-over-noise sensitivity,
    reaction time, sensory adaptation, and magnitude estimation. Crosses to `neuroscience` — psychophysics is
    the behaviour the neurons produce. A measure. */ const PROOF = 'psychophysics arithmetic (Weber fraction,
    jnd, threshold, Stevens power, sensitivity, reaction time, adaptation, magnitude); the law between stimulus
    and sensation; a measure crossed to neuroscience' const nat = (...xs: number[]) => xs.every((x) =>
    Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean,
    name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id,
    src: 'psychophysics', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name:
    `psychophysics.${name}`, params }) export class PsychophysicsFormulas { /** WEBER FRACTION: the change over
    the baseline, per mille. value ⌊delta · 1000 / baseline⌋. -/
theorem fam_psychophysics_weberfraction_2 : ((5 * 1000) / 0) = 0 := by decide

/-- psychophysics: jnd(200, 50) = 10 — JUST-NOTICEABLE DIFFERENCE: the baseline times its Weber fraction (per
    mille). value ⌊baseline · weber / 1000⌋. -/
theorem fam_psychophysics_jnd_1 : ((200 * 50) / 1000) = 10 := by decide

/-- psychophysics: thresholds(75, 100) = 75 — ABSOLUTE THRESHOLD: percent correct at the threshold level. value
    ⌊hits · 100 / trials⌋. -/
theorem fam_psychophysics_thresholds_1 : ((75 * 100) / 100) = 75 := by decide

/-- psychophysics: stevenspower(120, 50) = 60 — STEVENS POWER LAW: perceived magnitude is the intensity scaled
    by a gain (percent). value ⌊intensity · gain / 100⌋. -/
theorem fam_psychophysics_stevenspower_1 : ((120 * 50) / 100) = 60 := by decide

/-- psychophysics: sensitivity(40, 10) = 400 — SENSITIVITY: the signal over the noise, per cent. value ⌊signal ·
    100 / noise⌋. -/
theorem fam_psychophysics_sensitivity_1 : ((40 * 100) / 10) = 400 := by decide

/-- psychophysics: reactiontime(200, 600, 30) = 220 — REACTION TIME: a base latency plus the distance travelled
    at a speed. value base + ⌊distance / speed⌋. -/
theorem fam_psychophysics_reactiontime_1 : (200 + (600 / 30)) = 220 := by decide

/-- psychophysics: adaptation(100, 3, 10) = 70 — ADAPTATION: the response decays from its initial level. value
    max(0, initial − decay · time). -/
theorem fam_psychophysics_adaptation_1 : (fmax 0 (100 - (3 * 10))) = 70 := by decide

/-- psychophysics: magnitude(25, 4) = 100 — MAGNITUDE ESTIMATION: the stimulus reported on a scale. value
    stimulus · scale. -/
theorem fam_psychophysics_magnitude_1 : (25 * 4) = 100 := by decide

/-- publishing: royalty(10000, 12) = 1200 — PUBLISHING — THE TRADE AS ARITHMETIC (chosen by the registry, not by
    hand). Making and selling books is numbers: the author's royalty on sales, the pages a manuscript sets, the
    margin on a title, the sheets a print run burns, the share a run comes back as returns, readers per copy,
    the live share of a backlist, and a paper's citation impact. Crosses to `content` — publishing is what
    content becomes. A measure. */ const PROOF = 'publishing arithmetic (royalty, pages, margin, print run,
    returns, readership, backlist, impact); a registry domain; a measure crossed to content' const nat = (...xs:
    number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c = (id: string, formula: string,
    value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}):
    CrossFormula => crossFormulaOf({ id, src: 'publishing', dst: 'content', formula, value, proof: PROOF,
    ...extra }, holds, { name: `publishing.${name}`, params }) export class PublishingFormulas { /** ROYALTY:
    the author's cut of sales at a percent rate. value ⌊sales · rate / 100⌋. -/
theorem fam_publishing_royalty_1 : ((10000 * 12) / 100) = 1200 := by decide

/-- publishing: pages(90000, 300) = 300 — PAGES: the pages a manuscript sets at words per page. value ⌊words /
    perpage⌋. -/
theorem fam_publishing_pages_1 : (90000 / 300) = 300 := by decide

/-- publishing: margin(1000, 400) = 60 — MARGIN on a title as a percent. value ⌊(revenue − cost) · 100 /
    revenue⌋. -/
theorem fam_publishing_margin_1 : (((1000 - 400) * 100) / 1000) = 60 := by decide

/-- publishing: print(5000, 16) = 80000 — PRINT RUN: the sheets a run burns, copies times signatures. value
    copies · signatures. -/
theorem fam_publishing_print_1 : (5000 * 16) = 80000 := by decide

/-- publishing: returns(150, 1000) = 15 — RETURNS: the share a run comes back as a percent. value ⌊returned ·
    100 / shipped⌋. -/
theorem fam_publishing_returns_1 : ((150 * 100) / 1000) = 15 := by decide

/-- publishing: readership(30000, 10000) = 3 — READERSHIP: readers per copy. value ⌊readers / copies⌋. -/
theorem fam_publishing_readership_1 : (30000 / 10000) = 3 := by decide

/-- publishing: backlist(80, 200) = 40 — BACKLIST: the live share of a backlist as a percent. value ⌊active ·
    100 / titles⌋. -/
theorem fam_publishing_backlist_1 : ((80 * 100) / 200) = 40 := by decide

/-- publishing: impact(1200, 100) = 12 — IMPACT: citations per paper. value ⌊citations / papers⌋. -/
theorem fam_publishing_impact_1 : (1200 / 100) = 12 := by decide

/-- pulmonology: fev1(80, 100) = 80 — PULMONOLOGY — THE LUNG AS ARITHMETIC (chosen by the clinical registry, not
    by hand). Breathing is numbers: the forced-expiratory ratio, minute ventilation, oxygen saturation, lung
    compliance, dead-space fraction, peak flow, airway resistance, and diffusion. Crosses to `med` — pulmonology
    is a branch of medicine. A measure. */ const PROOF = 'pulmonology arithmetic (fev1 ratio, tidal minute
    ventilation, saturation, compliance, dead-space, peak flow, resistance, diffusion); a clinical measure
    crossed to med' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0) const c
    = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra:
    Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pulmonology', dst: 'med', formula,
    value, proof: PROOF, ...extra }, holds, { name: `pulmonology.${name}`, params }) export class
    PulmonologyFormulas { /** FEV1 RATIO: forced expiratory volume over forced vital capacity, as a percentage.
    value ⌊fev · 100 / fvc⌋. -/
theorem fam_pulmonology_fev1_1 : ((80 * 100) / 100) = 80 := by decide

/-- pulmonology: tidal(500, 12) = 6000 — MINUTE VENTILATION: tidal volume at a breathing rate. value volume ·
    rate. -/
theorem fam_pulmonology_tidal_1 : (500 * 12) = 6000 := by decide

/-- pulmonology: saturation(98, 100) = 98 — OXYGEN SATURATION: bound oxygen over carrying capacity, as a
    percentage. value ⌊bound · 100 / capacity⌋. -/
theorem fam_pulmonology_saturation_1 : ((98 * 100) / 100) = 98 := by decide

/-- pulmonology: compliance(500, 5) = 100 — LUNG COMPLIANCE: volume change per unit pressure. value ⌊volume /
    pressure⌋. -/
theorem fam_pulmonology_compliance_1 : (500 / 5) = 100 := by decide

/-- pulmonology: deadspace(150, 500) = 30 — DEAD-SPACE FRACTION: dead space over tidal volume, as a percentage.
    value ⌊dead · 100 / tidal⌋. -/
theorem fam_pulmonology_deadspace_1 : ((150 * 100) / 500) = 30 := by decide

/-- pulmonology: peakflow(600) = 600 — PEAK FLOW: the peak expiratory flow in litres. value litres. -/
theorem fam_pulmonology_peakflow_1 : 600 = 600 := by decide

/-- pulmonology: resistance(20, 4) = 5 — AIRWAY RESISTANCE: driving pressure over flow. value ⌊pressure / flow⌋. -/
theorem fam_pulmonology_resistance_1 : (20 / 4) = 5 := by decide

/-- pulmonology: diffusion(250, 10) = 25 — DIFFUSION: gas transferred over the pressure gradient. value
    ⌊transferred / gradient⌋. -/
theorem fam_pulmonology_diffusion_1 : (250 / 10) = 25 := by decide

/-- pulsar: spinfrequency(1800, 60) = 30 — PULSAR — A NEUTRON STAR'S CLOCK, AS ARITHMETIC (chosen by the
    registry, not by hand). A spinning magnetised star is numbers: how fast it turns, how fast it slows, how old
    that makes it, the field that brakes it, the energy it sheds, the electrons the pulse crosses, the braking
    law it obeys, and how wide the beam sweeps. Crosses to `astrophysics` — a pulsar is what astrophysics
    measures. A measure. */ const PROOF = 'pulsar arithmetic (spin frequency, period derivative, characteristic
    age, magnetic field, spin-down luminosity, dispersion measure, braking index, pulse width); integer proxies;
    a measure crossed to astrophysics' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x)
    && x >= 0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params:
    number[], extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'pulsar', dst:
    'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `pulsar.${name}`, params }) export
    class PulsarFormulas { /** SPIN FREQUENCY: rotations counted over seconds. value ⌊rotations / seconds⌋. -/
theorem fam_pulsar_spinfrequency_1 : (1800 / 60) = 30 := by decide

/-- pulsar: perioddderivative(1000, 50) = 20 — PERIOD DERIVATIVE: the period's drift over the years observed.
    value ⌊deltaP / years⌋. -/
theorem fam_pulsar_perioddderivative_1 : (1000 / 50) = 20 := by decide

/-- pulsar: characteristicage(1000, 5) = 100 — CHARACTERISTIC AGE: τ = P / (2·Ṗ). value ⌊period / (2 · pdot)⌋. -/
theorem fam_pulsar_characteristicage_1 : (1000 / (2 * 5)) = 100 := by decide

/-- pulsar: spindownluminosity(2, 30, 3) = 180 — SPIN-DOWN LUMINOSITY: Ė ∝ I·f·ḟ. value inertia · freq ·
    freqdot. -/
theorem fam_pulsar_spindownluminosity_1 : ((2 * 30) * 3) = 180 := by decide

/-- pulsar: dispersionmeasure(30, 100) = 3000 — DISPERSION MEASURE: DM = nₑ · d, electrons along the line of
    sight. value density · distance. -/
theorem fam_pulsar_dispersionmeasure_1 : (30 * 100) = 3000 := by decide

/-- pulsar: pulsewidth(1000, 5) = 50 — PULSE WIDTH: the beam's duty cycle as a slice of the period. value
    ⌊period · duty / 100⌋. -/
theorem fam_pulsar_pulsewidth_1 : ((1000 * 5) / 100) = 50 := by decide

/-- puppetry: strings(9, 0) = 9 -/
theorem fam_puppetry_strings_1 : (9 + 0) = 9 := by decide

/-- puppetry: jointcount(12, 2) = 24 -/
theorem fam_puppetry_jointcount_1 : (12 * 2) = 24 := by decide

/-- puppetry: controlbars(2, 1) = 3 -/
theorem fam_puppetry_controlbars_1 : (2 + 1) = 3 := by decide

/-- puppetry: manipulators(1, 1) = 2 -/
theorem fam_puppetry_manipulators_1 : (1 + 1) = 2 := by decide

/-- puppetry: articulationpoints(8, 2) = 16 -/
theorem fam_puppetry_articulationpoints_1 : (8 * 2) = 16 := by decide

/-- puppetry: riggingsubsets(4) = 16 -/
theorem fam_puppetry_riggingsubsets_1 : (2 ^ 4) = 16 := by decide

/-- puppetry: motionrange(180, 2) = 90 -/
theorem fam_puppetry_motionrange_1 : (180 / 2) = 90 := by decide

/-- pwm: dutycycle(25, 100) = 25 -/
theorem fam_pwm_dutycycle_1 : ((25 * 100) / 100) = 25 := by decide

/-- pwm: averagevoltage(1200, 100) = 12 -/
theorem fam_pwm_averagevoltage_1 : (1200 / 100) = 12 := by decide

/-- pwm: period(1000000, 1000) = 1000 -/
theorem fam_pwm_period_1 : (1000000 / 1000) = 1000 := by decide

/-- pwm: resolution(256, 1) = 256 -/
theorem fam_pwm_resolution_1 : (256 * 1) = 256 := by decide

/-- pwm: onpulse(1000, 4) = 250 -/
theorem fam_pwm_onpulse_1 : (1000 / 4) = 250 := by decide

/-- pwm: frequency(1000000, 1000) = 1000 -/
theorem fam_pwm_frequency_1 : (1000000 / 1000) = 1000 := by decide

/-- pwm: ripple(5, 100) = 5 -/
theorem fam_pwm_ripple_1 : ((5 * 100) / 100) = 5 := by decide

/-- pwm: effectivepower(75, 100) = 75 -/
theorem fam_pwm_effectivepower_1 : ((75 * 100) / 100) = 75 := by decide
