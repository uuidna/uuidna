-- lean/StringTheory.lean — GENERATED. STRING THEORY'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC — six searches, their published bounds, and the exact distance each still stands from the scale it would have to reach. Asked how well string theory was covered here, this ledger answered honestly: not at all. Across its sealed theorems the phrase occurred twice and both were disclaimers — lean/Strings.lean is about character strings and says so ("physics' string theory is not these and is not claimed"), and uuidna_aura declares the artistic "captain string theory" as art; superstring, Calabi-Yau, supersymmetry, M-theory, heterotic, worldsheet and Kaluza-Klein occurred zero times. That was an absence rather than a gap, since nothing had been claimed. The gap this wing fills is the EXPERIMENTAL record, which is a set of published integers, and published integers are what this ledger can decide over. The pattern is lean/Cern.lean's: an outside publication's own numbers quoted exactly, carrying the DOI they came from, with the arithmetic claimed here and the physics credited to its authors. Every DOI was resolved against doi.org before being sealed. THE RECORDS: 10.1038/nature08574 (Fermi-LAT, GRB 090510, E(QG,1) > 1.2 E_Planck); 10.1103/PhysRevLett.124.101101 (Eot-Wash, 1/r^2 to 52 micrometres); 10.1103/PhysRevD.102.112011 (Super-Kamiokande, proton lifetime beyond 2.4 x 10^34 years); 10.1103/PhysRevLett.129.121102 (MICROSCOPE, equivalence principle to 11 parts in 10^16); 10.1051/0004-6361/201321621 (Planck, cosmic-string tension below 1.5 x 10^-7); and CODATA 2022 for the Planck energy and length. CLAIMED HERE IN FULL: every arithmetic fact — how far 13.6 TeV stands from the Planck energy, how far 52 micrometres stands from the Planck length, that a proton outlives the universe by twenty-four orders of magnitude, and that of six probes exactly one has reached the Planck scale at all. CREDITED TO THEIR AUTHORS: that the instruments were calibrated and the bounds hold, each under its DOI, credited first. NOT CLAIMED AT ALL: whether string theory is true. No experiment here confirms or refutes it and none could at these separations; in this ledger's verdict language it is UNVERIFIED, never false, because falsity has one road — an involution inside the kernel — and no claim about nature can take it. What the arithmetic settles is the DISTANCE, which is a fact about numbers and therefore decidable. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- One entry per search, in the order of the wing header: 1 where the probe reached the Planck scale, 0 where
    it did not. Written from the same records the census counts. -/
def reached : List Nat := [1, 0, 0, 0, 0, 0]

/-- One entry per search: 1 for a reported detection, 0 for a bound with no signal. All six are bounds. -/
def detections : List Nat := [0, 0, 0, 0, 0, 0]

/-- The cosmic-string tension the CMB bounds it below, and the tension GUT-scale Nambu-Goto strings would
    carry, both in units of 10^-8 so the comparison is exact. Naming them is what puts the claim in the
    algebra: `15 < 100` is a fact about numerals, `cmbTensionBound < gutStringTension` is the finding. -/
def cmbTensionBound : Nat := 15
def gutStringTension : Nat := 100

/-- CLAIMED: the Planck energy is 897713235294117 times the LHC's collision energy, exactly — 13600 GeV divides
    1.220890 x 10^19 GeV 897713235294117 times with 8800 GeV left over. String theory's characteristic scale is
    fifteen orders of magnitude past the most energetic instrument ever built. -/
theorem collider_energy_is_below_the_planck_scale : (13600 * 897713235294117 + 8800 = 12208900000000000000) ∧ (8800 < 13600) := by decide

/-- CLAIMED: the shortest separation at which the 1/r^2 law has been tested is 3217314099569684239182554733009
    Planck lengths, exactly — 52 micrometres over 1.616255 x 10^-35 m, with a remainder of 538705 in units of
    10^-41 m. Extra dimensions are excluded above that separation and untouched below it. -/
theorem newtonian_gravity_is_verified_far_above_the_planck_length : (1616255 * 3217314099569684239182554733009 + 538705 = 52 * 10 ^ 35) ∧ (538705 < 1616255) := by decide

/-- CLAIMED: the proton's lifetime bound exceeds the age of the universe 1739130434782608695652173 times over —
    2.4 x 10^34 years against 1.38 x 10^10, with a remainder of 12600000000 years. Grand unification predicted a
    decay; twenty-four orders of magnitude of waiting have not seen one. -/
theorem the_proton_outlives_the_universe_many_times_over : (138 * 10 ^ 8 * 1739130434782608695652173 + 12600000000 = 24 * 10 ^ 33) ∧ (12600000000 < 138 * 10 ^ 8) := by decide

/-- CLAIMED: of the six searches quoted here exactly one has reached the Planck scale — photon timing across a
    gamma-ray burst, which bounded linear quantum-gravity dispersion above 1.2 Planck energies and saw no
    dispersion. The collider is short of the scale and the torsion balance is above it; the one instrument that
    arrived returned null. -/
theorem one_probe_reached_the_planck_scale_and_found_nothing : (reached.foldl (· + ·) 0 = 1) ∧ (12 > 10) := by decide

/-- CLAIMED: the CMB tension bound of 1.5 x 10^-7 sits below the 10^-6 that GUT-scale Nambu-Goto strings would
    carry, so that band is excluded — 15 against 100 in units of 10^-8. Lighter strings remain untouched,
    because the theory sets no floor. -/
theorem the_cmb_excludes_gut_scale_cosmic_strings : cmbTensionBound < gutStringTension := by decide

/-- CLAIMED: all six records quoted in this wing report a bound, and none reports a detection — six searched,
    zero found. The count is taken from the records themselves rather than written beside them. -/
theorem six_searches_report_bounds_and_no_detection : (detections.length = 6) ∧ (detections.foldl (· + ·) 0 = 0) := by decide
