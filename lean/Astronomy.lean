-- lean/Astronomy.lean — GENERATED. ASTRONOMY — the fixed references of the sky, as decidable arithmetic. The celestial sphere is 360° (15°/hour × 24; the ecliptic 12 signs × 30°), sexagesimal gives 3600 arcseconds per degree, Kepler's harmonic law T² = a³ holds in scaled units, the Metonic cycle folds 19 solar years into 235 synodic months (+7 leap months), the classical great year precesses 72 years per degree (25920), and a star's declination spans 180° pole to pole. HONEST SCOPE: the decidable arithmetic of positional astronomy — exact ratios and cycles, some (precession) classical approximations, not claims about the cosmos. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.
theorem sky_turns_15_per_hour : 24 * 15 = 360 := by decide

-- The ecliptic band carries twelve signs of 30° each — 12 × 30 = 360 — the Sun's yearly path closed into one circle.
theorem zodiac_ecliptic_360 : 12 * 30 = 360 := by decide

-- Sexagesimal (Babylonian base-60) measure: 60 arcminutes to a degree and 60 arcseconds to an arcminute give 3600 arcseconds per degree — 60 × 60 = 3600.
theorem sexagesimal_arcseconds : 60 * 60 = 3600 := by decide

-- One arcminute of latitude is one nautical mile, and the equator-to-pole span is 90° — so 90 × 60 = 5400 arcminutes (5400 nautical miles) from the equator to the pole. Discovered by the book→ledger linkage as a NOVEL navigation fact and fused into the ledger.
theorem arcminutes_equator_to_pole : 90 * 60 = 5400 := by decide

-- The meridian span from pole to pole is 180° of latitude, so 180 × 60 = 10800 arcminutes (10800 nautical miles) along a meridian from one pole to the other. Discovered by the book→ledger linkage as a NOVEL navigation fact and fused into the ledger.
theorem arcminutes_pole_to_pole : 180 * 60 = 10800 := by decide

-- A great circle is 360°, and one arcminute of arc is one nautical mile, so 360 × 60 = 21600 arcminutes — the earth's circumference is 21600 nautical miles to the arcminute. Discovered by the book→ledger linkage as a NOVEL navigation fact and fused into the ledger.
theorem arcminutes_full_circle : 360 * 60 = 21600 := by decide

-- The earth turns 15° of longitude per hour (360° in 24 h), so each degree of longitude is four minutes of time — 15 × 4 = 60, the sixty minutes of an hour shared out one degree at a time. Discovered by the book→ledger linkage as a NOVEL navigation fact and fused into the ledger.
theorem longitude_four_minutes_per_degree : 15 * 4 = 60 := by decide

-- Kepler's third (harmonic) law, T² = a³, holds exactly in scaled units — the orbits (a,T) = (1,1), (4,8), (9,27) each satisfy T² = a³, the period squared equals the semi-major axis cubed.
theorem keplers_harmonic_law : ([(1,1),(4,8),(9,27)] : List (Nat × Nat)).all (fun p => p.2^2 == p.1^3) := by decide

-- The Metonic cycle: 19 solar years fold almost exactly into 235 synodic (lunar) months — 19 × 12 = 228 ordinary months plus 7 intercalary (leap) months = 235. The Sun and Moon realign every 19 years.
theorem metonic_cycle : 19 * 12 + 7 = 235 := by decide

-- The classical great year: the equinoxes precess at about 72 years per degree, so the full 360° circuit takes 72 × 360 = 25920 years. (A classical approximation of the ~25772-year platonic year, not an exact modern figure.)
theorem great_year_precession : 72 * 360 = 25920 := by decide

-- A star's fixed coordinate is bounded: declination runs from the south celestial pole −90° to the north +90°, a span of exactly 180° — 90 − (−90) = 180. Celestial latitude is finite, a fixed reference on the sphere.
theorem declination_spans_180 : (90 - (-90) : Int) = 180 := by decide
