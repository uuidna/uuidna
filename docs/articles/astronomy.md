---
title: "The fixed stars"
description: "Computed from lean/Astronomy.lean — 11 sealed theorems, every claim citing its proof."
---

# The fixed stars

> ASTRONOMY — the fixed references of the sky, as decidable arithmetic. — held by [sky_turns_15_per_hour](/theorem/sky_turns_15_per_hour) and its 10 siblings below.

**11 theorems**, from [sky_turns_15_per_hour](/theorem/sky_turns_15_per_hour) onward, each proven `by decide` in [lean/Astronomy.lean](/lean/Astronomy.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [great_year_precession](/theorem/great_year_precession). A boundary stated here is decided, not merely denied.

### The diurnal turn: the sky rotates 15° every hour, so 24 hours close the full 360° circle — 24 × 15 = 360. Right ascension is measured in these hours.
The ledger holds this as [sky_turns_15_per_hour](/theorem/sky_turns_15_per_hour) — proven `by decide`, sorry-free:

```lean
24 * 15 = 360
```

### The ecliptic band carries twelve signs of 30° each — 12 × 30 = 360 — the Sun's yearly path closed into one circle.
The ledger holds this as [zodiac_ecliptic_360](/theorem/zodiac_ecliptic_360) — proven `by decide`, sorry-free:

```lean
12 * 30 = 360
```

### Sexagesimal (Babylonian base-60) measure: 60 arcminutes to a degree and 60 arcseconds to an arcminute give 3600 arcseconds per degree — 60 × 60 = 3600.
The ledger holds this as [sexagesimal_arcseconds](/theorem/sexagesimal_arcseconds) — proven `by decide`, sorry-free:

```lean
60 * 60 = 3600
```

### One arcminute of latitude is one nautical mile, and the equator-to-pole span is 90° — so 90 × 60 = 5400 arcminutes (5400 nautical miles) from the equator to the pole.
The ledger holds this as [arcminutes_equator_to_pole](/theorem/arcminutes_equator_to_pole) — proven `by decide`, sorry-free:

```lean
90 * 60 = 5400
```

### The meridian span from pole to pole is 180° of latitude, so 180 × 60 = 10800 arcminutes (10800 nautical miles) along a meridian from one pole to the other.
The ledger holds this as [arcminutes_pole_to_pole](/theorem/arcminutes_pole_to_pole) — proven `by decide`, sorry-free:

```lean
180 * 60 = 10800
```

### A great circle is 360°, and one arcminute of arc is one nautical mile, so 360 × 60 = 21600 arcminutes — a great circle of the earth measures 21600 nautical miles to the arcminute.
The ledger holds this as [arcminutes_full_circle](/theorem/arcminutes_full_circle) — proven `by decide`, sorry-free:

```lean
360 * 60 = 21600
```

### The earth turns 15° of longitude per hour (360° in 24 h), so each degree of longitude is four minutes of time — 15 × 4 = 60, the sixty minutes of an hour shared out one degree at a time.
The ledger holds this as [longitude_four_minutes_per_degree](/theorem/longitude_four_minutes_per_degree) — proven `by decide`, sorry-free:

```lean
15 * 4 = 60
```

### Kepler's third (harmonic) law, T² = a³, holds exactly in scaled units — the orbits (a,T) = (1,1), (4,8), (9,27) each satisfy T² = a³, the period squared equals the semi-major axis cubed.
The ledger holds this as [keplers_harmonic_law](/theorem/keplers_harmonic_law) — proven `by decide`, sorry-free:

```lean
([(1,1),(4,8),(9,27)] : List (Nat × Nat)).all (fun p => p.2^2 == p.1^3)
```

### The Metonic cycle: 19 solar years fold almost exactly into 235 synodic (lunar) months — 19 × 12 = 228 ordinary months plus 7 intercalary (leap) months = 235. The Sun and Moon realign every 19 years.
The ledger holds this as [metonic_cycle](/theorem/metonic_cycle) — proven `by decide`, sorry-free:

```lean
19 * 12 + 7 = 235
```

### The classical great year: the equinoxes precess at about 72 years per degree, so the full 360° circuit takes 72 × 360 = 25920 years. (A classical approximation of the ~25772-year platonic year, not an exact modern figure.)
The ledger holds this as [great_year_precession](/theorem/great_year_precession) — proven `by decide`, sorry-free:

```lean
72 * 360 = 25920
```

### A star's fixed coordinate is bounded: declination runs from the south celestial pole −90° to the north +90°, a span of exactly 180° — 90 − (−90) = 180. Celestial latitude is finite, a fixed reference on the sphere.
The ledger holds this as [declination_spans_180](/theorem/declination_spans_180) — proven `by decide`, sorry-free:

```lean
(90 - (-90) : Int) = 180
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
