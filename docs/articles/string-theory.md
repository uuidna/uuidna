---
title: "STRING THEORY'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC"
description: "Computed from lean/StringTheory.lean — 6 sealed theorems, every claim citing its proof."
---

# STRING THEORY'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC

> STRING THEORY'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC — six searches, their published bounds, and the exact distance each still stands from the scale it would have to reach. Asked how well string theory was covered here, this ledger answered honestly: not at all. Across its sealed theorems the phrase occurred twice and both were disclaimers — lean/Strings.lean is about character strings and says so ("physics' string theory is not these and is not claimed"), and uuidna_aura declares the artistic "captain string theory" as art; superstring, Calabi-Yau, supersymmetry, M-theory, heterotic, worldsheet and Kaluza-Klein occurred zero times. That was an absence rather than a gap, since nothing had been claimed. The gap this wing fills is the EXPERIMENTAL record, which is a set of published integers, and published integers are what this ledger can decide over. The pattern is lean/Cern.lean's: an outside publication's own numbers quoted exactly, carrying the DOI they came from, with the arithmetic claimed here and the physics credited to its authors. Every DOI was resolved against doi.org before being sealed. THE RECORDS: 10.1038/nature08574 (Fermi-LAT, GRB 090510, E(QG,1) > 1.2 E_Planck); 10.1103/PhysRevLett.124.101101 (Eot-Wash, 1/r^2 to 52 micrometres); 10.1103/PhysRevD.102.112011 (Super-Kamiokande, proton lifetime beyond 2.4 x 10^34 years); 10.1103/PhysRevLett.129.121102 (MICROSCOPE, equivalence principle to 11 parts in 10^16); 10.1051/0004-6361/201321621 (Planck, cosmic-string tension below 1.5 x 10^-7); and CODATA 2022 for the Planck energy and length. CLAIMED HERE IN FULL: every arithmetic fact — how far 13.6 TeV stands from the Planck energy, how far 52 micrometres stands from the Planck length, that a proton outlives the universe by twenty-four orders of magnitude, and that of six probes exactly one has reached the Planck scale at all. CREDITED TO THEIR AUTHORS: that the instruments were calibrated and the bounds hold, each under its DOI, credited first. NOT CLAIMED AT ALL: whether string theory is true. No experiment here confirms or refutes it and none could at these separations; in this ledger's verdict language it is UNVERIFIED, never false, because falsity has one road — an involution inside the kernel — and no claim about nature can take it. What the arithmetic settles is the DISTANCE, which is a fact about numbers and therefore decidable. — held by [collider_energy_is_below_the_planck_scale](/theorem/collider_energy_is_below_the_planck_scale) and its 5 siblings below.

**6 theorems** and **16 decided cases**, from [collider_energy_is_below_the_planck_scale](/theorem/collider_energy_is_below_the_planck_scale) onward, each proven `by decide` in <a href="/lean/StringTheory.lean">lean/StringTheory.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_proton_outlives_the_universe_many_times_over](/theorem/the_proton_outlives_the_universe_many_times_over). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStringTheory.lean)** — nothing to install. The editor fetches `lean/StringTheory.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: the Planck energy is 897713235294117 times the LHC's collision energy, exactly — 13600 GeV divides 1.220890 x 10^19 GeV 897713235294117 times with 8800 GeV left over. String theory's characteristic scale is fifteen orders of magnitude past the most energetic instrument ever built.
The ledger holds this as [collider_energy_is_below_the_planck_scale](/theorem/collider_energy_is_below_the_planck_scale) — proven `by decide`, sorry-free:

```lean
(13600 * 897713235294117 + 8800 = 12208900000000000000) ∧ (8800 < 13600)
```

### CLAIMED: the shortest separation at which the 1/r^2 law has been tested is 3217314099569684239182554733009 Planck lengths, exactly — 52 micrometres over 1.616255 x 10^-35 m, with a remainder of 538705 in units of 10^-41 m. Extra dimensions are excluded above that separation and untouched below it.
The ledger holds this as [newtonian_gravity_is_verified_far_above_the_planck_length](/theorem/newtonian_gravity_is_verified_far_above_the_planck_length) — proven `by decide`, sorry-free:

```lean
(1616255 * 3217314099569684239182554733009 + 538705 = 52 * 10 ^ 35) ∧ (538705 < 1616255)
```

### CLAIMED: the proton's lifetime bound exceeds the age of the universe 1739130434782608695652173 times over — 2.4 x 10^34 years against 1.38 x 10^10, with a remainder of 12600000000 years. Grand unification predicted a decay; twenty-four orders of magnitude of waiting have not seen one.
The ledger holds this as [the_proton_outlives_the_universe_many_times_over](/theorem/the_proton_outlives_the_universe_many_times_over) — proven `by decide`, sorry-free:

```lean
(138 * 10 ^ 8 * 1739130434782608695652173 + 12600000000 = 24 * 10 ^ 33) ∧ (12600000000 < 138 * 10 ^ 8)
```

### CLAIMED: of the six searches quoted here exactly one has reached the Planck scale — photon timing across a gamma-ray burst, which bounded linear quantum-gravity dispersion above 1.2 Planck energies and saw no dispersion. The collider is short of the scale and the torsion balance is above it; the one instrument that arrived returned null.
The ledger holds this as [one_probe_reached_the_planck_scale_and_found_nothing](/theorem/one_probe_reached_the_planck_scale_and_found_nothing) — proven `by decide`, sorry-free:

```lean
(reached.foldl (· + ·) 0 = 1) ∧ (12 > 10)
```

### CLAIMED: the CMB tension bound of 1.5 x 10^-7 sits below the 10^-6 that GUT-scale Nambu-Goto strings would carry, so that band is excluded — 15 against 100 in units of 10^-8. Lighter strings remain untouched, because the theory sets no floor.
The ledger holds this as [the_cmb_excludes_gut_scale_cosmic_strings](/theorem/the_cmb_excludes_gut_scale_cosmic_strings) — proven `by decide`, sorry-free:

```lean
cmbTensionBound < gutStringTension
```

### CLAIMED: all six records quoted in this wing report a bound, and none reports a detection — six searched, zero found. The count is taken from the records themselves rather than written beside them.
The ledger holds this as [six_searches_report_bounds_and_no_detection](/theorem/six_searches_report_bounds_and_no_detection) — proven `by decide`, sorry-free:

```lean
(detections.length = 6) ∧ (detections.foldl (· + ·) 0 = 0)
```


## References

The external work this wing stands on. These are not sealed theorems and this ledger claims none of them — each is somebody else's result, cited by the DOI its own prose carries and resolved from the registry of record.

1. Abdo, A. A.; Ackermann, M.; Ajello, M.; et al. (2009). A limit on the variation of the speed of light arising from quantum gravity effects. Nature. [https://doi.org/10.1038/nature08574](https://doi.org/10.1038/nature08574)
1. Planck Collaboration; Ade, P. A. R.; Aghanim, N.; et al. (2014). Planck2013 results. XXV. Searches for cosmic strings and other topological defects. Astronomy Astrophysics. [https://doi.org/10.1051/0004-6361/201321621](https://doi.org/10.1051/0004-6361/201321621)
1. Takenaka, A.; Abe, K.; Bronner, C.; et al. (2020). Search for proton decay via p → e + π 0 and p → μ + π 0 with an enlarged fiducial volume in Super-Kamiokande I-IV. Physical Review D. [https://doi.org/10.1103/PhysRevD.102.112011](https://doi.org/10.1103/PhysRevD.102.112011)
1. Lee, J. G.; Adelberger, E. G.; Cook, T. S.; et al. (2020). New Test of the Gravitational 1 / r 2 Law at Separations down to 52 μ m. Physical Review Letters. [https://doi.org/10.1103/PhysRevLett.124.101101](https://doi.org/10.1103/PhysRevLett.124.101101)
1. Touboul, Pierre; Métris, Gilles; Rodrigues, Manuel; et al. (2022). M I C R O S C O P E Mission: Final Results of the Test of the Equivalence Principle. Physical Review Letters. [https://doi.org/10.1103/PhysRevLett.129.121102](https://doi.org/10.1103/PhysRevLett.129.121102)

::: warning 
STRING THEORY'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC — six searches, their published bounds, and the exact distance each still stands from the scale it would have to reach. The boundary is confirmed by the wing's own sealed theorems — e.g. [collider_energy_is_below_the_planck_scale](/theorem/collider_energy_is_below_the_planck_scale) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
