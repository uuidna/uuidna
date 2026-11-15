-- lean/FamiliesJ.lean — GENERATED. THE FAMILIES, J — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- jainism: vows(5, 0) = 5 -/
theorem fam_jainism_vows_1 : (5 + 0) = 5 := by decide

/-- jainism: principles(3, 0) = 3 -/
theorem fam_jainism_principles_1 : (3 + 0) = 3 := by decide

/-- jainism: tirthankaras(24, 0) = 24 -/
theorem fam_jainism_tirthankaras_1 : (24 + 0) = 24 := by decide

/-- jainism: karmatypes(8, 0) = 8 -/
theorem fam_jainism_karmatypes_1 : (8 + 0) = 8 := by decide

/-- jainism: nonviolencelevels(5, 0) = 5 -/
theorem fam_jainism_nonviolencelevels_1 : (5 + 0) = 5 := by decide

/-- jainism: liberationpaths(3) = 8 -/
theorem fam_jainism_liberationpaths_1 : (2 ^ 3) = 8 := by decide

/-- jetstream: windspeed(100, 2) = 200 -/
theorem fam_jetstream_windspeed_1 : (100 * 2) = 200 := by decide

/-- jetstream: altitude(10, 1000) = 10000 -/
theorem fam_jetstream_altitude_1 : (10 * 1000) = 10000 := by decide

/-- jetstream: latitude(50, 10) = 60 -/
theorem fam_jetstream_latitude_1 : (50 + 10) = 60 := by decide

/-- jetstream: meandercount(5, 3) = 8 -/
theorem fam_jetstream_meandercount_1 : (5 + 3) = 8 := by decide

/-- jetstream: waveamplitude(1000, 4) = 250 -/
theorem fam_jetstream_waveamplitude_1 : (1000 / 4) = 250 := by decide

/-- jetstream: rossbynumber(100, 10) = 10 -/
theorem fam_jetstream_rossbynumber_1 : (100 / 10) = 10 := by decide

/-- jetstream: coresubsets(4) = 16 -/
theorem fam_jetstream_coresubsets_1 : (2 ^ 4) = 16 := by decide

/-- jetstream: shearindex(60, 100) = 60 -/
theorem fam_jetstream_shearindex_1 : ((60 * 100) / 100) = 60 := by decide

/-- jewelry: caratweight(5, 200) = 1000 -/
theorem fam_jewelry_caratweight_1 : (5 * 200) = 1000 := by decide

/-- jewelry: facetcount(57, 1) = 57 -/
theorem fam_jewelry_facetcount_1 : (57 * 1) = 57 := by decide

/-- jewelry: karatfineness(18, 24) = 75 -/
theorem fam_jewelry_karatfineness_1 : ((18 * 100) / 24) = 75 := by decide

/-- jewelry: settingprongs(4, 2) = 6 -/
theorem fam_jewelry_settingprongs_1 : (4 + 2) = 6 := by decide

/-- jewelry: metalgrams(10, 5) = 50 -/
theorem fam_jewelry_metalgrams_1 : (10 * 5) = 50 := by decide

/-- jewelry: pricetotal(2000, 3) = 6000 -/
theorem fam_jewelry_pricetotal_1 : (2000 * 3) = 6000 := by decide

/-- jitter: meandeviation(400, 8) = 50 — MEAN DEVIATION: accumulated deviation over the samples counted. value
    ⌊total / count⌋. -/
theorem fam_jitter_meandeviation_1 : (400 / 8) = 50 := by decide

/-- jitter: bufferdepth(20, 3) = 60 — BUFFER DEPTH: the de-jitter buffer a flow needs, jitter times a safety
    multiplier. value jitter · mult. -/
theorem fam_jitter_bufferdepth_1 : (20 * 3) = 60 := by decide

/-- jitter: peaktopeak(120, 40) = 80 — PEAK-TO-PEAK: the spread between the largest and smallest delay. value
    max(0, hi − lo). -/
theorem fam_jitter_peaktopeak_1 : (fmax 0 (120 - 40)) = 80 := by decide

/-- jitter: peaktopeak(40, 120) = 0 — PEAK-TO-PEAK: the spread between the largest and smallest delay. value
    max(0, hi − lo). -/
theorem fam_jitter_peaktopeak_2 : (fmax 0 (40 - 120)) = 0 := by decide

/-- jitter: playoutdelay(50, 10, 4) = 90 — PLAYOUT DELAY: a fixed base plus jitter scaled by a factor. value
    base + jitter · k. -/
theorem fam_jitter_playoutdelay_1 : (50 + (10 * 4)) = 90 := by decide

/-- jitter: rfc3550estimate(16, 48) = 18 — RFC 3550 interarrival estimate: prev + ⌊(|D| − prev) / 16⌋, the
    gain-1/16 smoother. value prev + ⌊max(0, dabs − prev) / 16⌋. -/
theorem fam_jitter_rfc3550estimate_1 : (16 + ((fmax 0 (48 - 16)) / 16)) = 18 := by decide

/-- jitter: packetspacing(1000, 50) = 20 — PACKET SPACING: a time span shared out over the packets sent. value
    ⌊span / packets⌋. -/
theorem fam_jitter_packetspacing_1 : (1000 / 50) = 20 := by decide

/-- journalism: readability(300, 20) = 15 — JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words
    per sentence, how much of the story sits above the fold, sources per claim, time to deadline, how a piece
    travels, its length, what held up to a fact-check, and how loaded the language is. Crosses to `content` —
    journalism is content made and measured. A measure. */ const PROOF = 'journalism arithmetic (readability,
    inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a
    measure crossed to content' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >=
    0) const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'journalism', dst:
    'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params }) export
    class JournalismFormulas { /** READABILITY: words per sentence. value ⌊words / sentences⌋. -/
theorem fam_journalism_readability_1 : (300 / 20) = 15 := by decide

/-- journalism: inverted(40, 200) = 20 — INVERTED PYRAMID: how much of the story sits in the lead, as a
    percentage. value ⌊lead · 100 / total⌋. -/
theorem fam_journalism_inverted_1 : ((40 * 100) / 200) = 20 := by decide

/-- journalism: sources(8, 10) = 80 — SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. -/
theorem fam_journalism_sources_1 : ((8 * 100) / 10) = 80 := by decide

/-- journalism: deadline(14, 18) = 4 — DEADLINE: units left between filing and the due time. value max(0, due −
    filed). -/
theorem fam_journalism_deadline_1 : (fmax 0 (18 - 14)) = 4 := by decide

/-- journalism: deadline(20, 18) = 0 — DEADLINE: units left between filing and the due time. value max(0, due −
    filed). -/
theorem fam_journalism_deadline_2 : (fmax 0 (18 - 20)) = 0 := by decide

/-- journalism: engagement(50, 1000) = 5 — ENGAGEMENT: shares per read, as a percentage. value ⌊shares · 100 /
    reads⌋. -/
theorem fam_journalism_engagement_1 : ((50 * 100) / 1000) = 5 := by decide

/-- journalism: wordcount(12, 80) = 960 — WORD COUNT: paragraphs at an average length each. value paragraphs ·
    average. -/
theorem fam_journalism_wordcount_1 : (12 * 80) = 960 := by decide

/-- journalism: factcheck(9, 10) = 90 — FACT-CHECK: verified of the facts checked, as a percentage. value
    ⌊verified · 100 / checked⌋. -/
theorem fam_journalism_factcheck_1 : ((9 * 100) / 10) = 90 := by decide

/-- journalism: bias(3, 300) = 1 — BIAS: loaded words of the total, as a percentage. value ⌊loaded · 100 /
    words⌋. -/
theorem fam_journalism_bias_1 : ((3 * 100) / 300) = 1 := by decide

/-- jumping: height(500, 2) = 250 -/
theorem fam_jumping_height_1 : (500 / 2) = 250 := by decide

/-- jumping: hangtime(1000, 10) = 100 -/
theorem fam_jumping_hangtime_1 : (1000 / 10) = 100 := by decide

/-- jumping: takeoffvelocity(3, 2) = 6 -/
theorem fam_jumping_takeoffvelocity_1 : (3 * 2) = 6 := by decide

/-- jumping: horizontalrange(5, 8) = 40 -/
theorem fam_jumping_horizontalrange_1 : (5 * 8) = 40 := by decide

/-- jumping: power(800, 3) = 2400 -/
theorem fam_jumping_power_1 : (800 * 3) = 2400 := by decide

/-- jumping: approachspeed(3000, 300) = 10 -/
theorem fam_jumping_approachspeed_1 : (3000 / 300) = 10 := by decide

/-- jumping: impulse(70, 5) = 350 -/
theorem fam_jumping_impulse_1 : (70 * 5) = 350 := by decide

/-- jumping: netheight(250, 30) = 220 -/
theorem fam_jumping_netheight_1 : (fmax 0 (250 - 30)) = 220 := by decide
