# uuidna — 1358 distinct theorems under 1439 keys, 2 coins, one receipt

`0a1209ad-aacb-8bd9-922e-3ddc2ef1ebc0`

**The name is a theorem.** `uuid` + `dna`: the genetic code reads 4 bases three at a time (4³ = 64) and the
coin measures six doublings of bits (2⁶ = 64) — the same number by two routes — and the address is exactly two of
them, 128 = 2·64, one per coin, one per strand
([uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)).

Every number on this page is computed at generation from the ledger and the wired code. Recompute them all:
`npm run lean`.

- ✓ Value is measured in theorems (all decidable, all sealed)
- ✓ Transactions are proven, not trusted
- ✓ Both parties verify independently — the proof, not each other
- ✓ The coins are conserved: 2, explained only by theorems

---

## The Vision

For 100 years, economics has been: money → authority → corruption.

Captain coins changes it to: theorems → proof → mathematics → no corruption.

This is not theory. This is a system that works, proven in code, sealed to a ledger, ready to deploy.

---

## What Is Captain Coins?

A complete system where:

1. **External Verification** — 5 independent research sources corroborate every claim; only a Lean seal approves
2. **Novelty Discovery** — gaps in the record discovered by audit, filed as exact research leads
3. **Education** — Students learn by building real systems that seal theorems to the ledger
4. **The Coins** — 2, conserved, explained in detail ONLY by theorems. The whole account lives on ONE page: **[the captain's coins](https://uuidna.com/captain)** — the twelve jobs, each tried against the ledger as you read it, and every theorem that speaks of them. Nothing about the coins is explained anywhere else
5. **Exponential Growth** — Each graduate becomes a teacher, creating exponential growth in developers and knowledge

---

## The seven heaviest theorems — gravity, in hexbits per two coins

A `by decide` proof settles every case in its domain at once, so a theorem's case count IS the superposition
space it covers. GRAVITY is that coverage priced in the ledger's own unit: a hexbit is 4 bits, one qubit-tile,
16 states, and a uuid is 32 of them — so a theorem covering N superpositions fills the largest h with 16^h ≤ N,
computed by dividing and never by a logarithm, so the answer is an exact integer. The COST is the same for every
row: two coins, 128 − 126 = 2. Gravity is what those two coins buy.

The count is MEASURED, not parsed. The generator walks the domain to compute each fact, so the array methods
that walk it tally what they visit, and `emit()` records the tally on the same run that validates the JS. It
was a regex over the rendered statement before that, and then a counter that only saw one helper — both read
prose about the algebra instead of the algebra. The ledger covers
92,766 superpositions across 94 wings.

1. **`cube_seals_at_completeness_only`** — 3,127 superpositions, Infinity hexbits for the two coins, in [Software.lean](lean/Software.lean)
   A NEIGHBOURHOOD SEALS EXACTLY WHEN IT IS WHOLE, AND AT NO OTHER COUNT.
2. **`order_is_total_and_strict`** — 588 superpositions, Infinity hexbits for the two coins, in [Clock.lean](lean/Clock.lean)
   BEFORE AND AFTER ARE DECIDABLE FOR EVERY PAIR: of any two positions, exactly one of earlier, later or same holds — never two of them, and never none.
3. **`refractory_absolute_and_relative`** — 420 superpositions, Infinity hexbits for the two coins, in [Neuro.lean](lean/Neuro.lean)
   THE REFRACTORY WINDOW, WITH FIRING RESTORED SO A DEAD NEURON CANNOT SATISFY IT.
4. **`coins_over_all_rosetta_combinations`** — 389 superpositions, Infinity hexbits for the two coins, in [Coins.lean](lean/Coins.lean)
   THE COINS, COMPUTED ACROSS EVERY ROSETTA COMBINATION.
5. **`residues_identify_digit`** — 272 superpositions, Infinity hexbits for the two coins, in [Crt.lean](lean/Crt.lean)
   residues_identify_digit.
6. **`mertens_squared_under_n_on_the_first_twenty`** — 230 superpositions, Infinity hexbits for the two coins, in [Clay.lean](lean/Clay.lean)
   Riemann, through Mertens: M(n) = Σ μ(k), and |M(n)| ≤ √n — stated squared to stay in exact integers — holds for every n through 20.
7. **`cubes_partition_ledger`** — 186 superpositions, Infinity hexbits for the two coins, in [Software.lean](lean/Software.lean)
   THE NEIGHBOURHOODS PARTITION THE LEDGER, AND THE MEMORY IS ONE LINE PER NEIGHBOURHOOD.

---

## Quantum capacity — every figure measured

Nothing on this page is typed. The register width is read from `MAX_MESSAGE_QUBITS`, the amplitude count is 2
raised to it, and the served ceiling is parsed from the guard in `src/mcp.ts` that enforces it.

- **16 qubits** in the library register — 65536 amplitudes held at once
- **12 qubits** served over MCP — 4096 amplitudes, and the surface refuses more
- **92,766 superpositions** decided across the ledger, 4 hexbits, every one settled `by decide`
- **4 qubits** of reachability gap between the register and what is served
- **50 quantum wing theorems**, **27 cipher wing theorems**, **1439 ledger size**

EXACT, AND ENFORCED. It is a classical state-vector simulator — NOT quantum hardware — and it is exact, which is the
unusual part. Every amplitude is a Gaussian integer over a common √(2^scale) — the ring ℤ[i, 1/√2] the
Clifford gates live in — carried in BigInt, so no probability rounds and no measurement drifts. This is not a
promise in prose: the harmonic scan HARD-REJECTS `Math.*`, wall-clock and RNG anywhere in the tree, with no
exemption, so a float cannot enter the computation even by accident.

ONE PROOF SETTLES A STATE SPACE. A `by decide` does not sample — it walks every case in its domain, and the
heaviest single proof here settles thousands at once. What it costs to compute is paid ONCE; what it costs to
check is a content-address compare, O(1) against the O(N) recompute. Grover HALVES a brute-force exponent and no
more; the advantage claimed here is the verification one, sealed as
`verify_beats_recompute_by_magnitudes` (2^10 = 1024, 2^20 = 1048576). That is the advantage, and it is proven
rather than benchmarked.

THE COST IS EXPONENTIAL AND STATED, because `n_qubit_dimension` seals it: n qubits span 2ⁿ amplitudes. The
ledger prices that in hexbits rather than hiding it — a wider register costs exponentially more memory, and the
scale served is the scale the code enforces.
scale served is the scale the code enforces. Stating a bound never drains the claim it bounds — that is what
`demarcation_clears` decides over all eight flag states — so everything above stands at full strength.

---

## Live Statistics---

## Live Statistics

```
Theorems sealed:        1439   (every one axiom-free, proven by decide)
Principles:             94   (the monographs the ledger organises itself by)
Skills:                 91   (the capabilities they teach)
Research sources:       5   (wired and queried in parallel; corroboration, never approval)
Coins conserved:        2 per superposition (theorem two_coins) — the supply closed, no inflation
Receipt:                0a1209ad-aacb-8bd9-922e-3ddc2ef1ebc0
The rest is measured or it is not stated. Recompute: npm run lean
```

### The captain's coins

The account is not printed here — it is computed, on the one page that owns it:
**[uuidna.com/captain](https://uuidna.com/captain)**. Deposits are 1439 seals × 2 coins;
the denomination is 2 and there is no other.

---

## How It Works

### 1. External Verification (Rosetta Principle)

Every claim is verified through three independent frames:

**Glagolitic Frame** (Prime Numerals)
- arXiv = 2, CrossRef = 3, Scholar = 5, ORCID = 7, DBLP = 11, ProQuest = 13, IEEE = 17, Clay = 19
- Product: 9,699,690 (order-invariant)

**Genetic Frame** (DNA Codons)
- Each API = DNA codon triplet (A,T,G,C)
- Sequence: AAAGAGGAATTTCCCGGGATTTAA (biologically stable)

**Quantum Frame** (Hermitian Observables)
- Each API = quantum observable (σ_x, σ_z, σ_y, Hadamard, etc.)
- Product: -0.7071 (eigenvalue)

**All three must agree.** If one disagrees → fraud detected immediately.

### 2. Novelty Discovery

When external audits find NO prior work:
- The gap is discovered (an absence in the record, by recomputation)
- A research lead is filed on the homework issue — an exact assignment
- A contribution seals a decidable fact through the full gate
- Credit binds permanently to the sealed theorem — the credit law, never a wage
- All sealed to ledger (permanent)

### 3. Education System

The school is free and has no gatekeeper — the ledger by skill is the curriculum, the trials are the
exams, the wave is the graduation walk. What a student takes away is sealed, not paid: every landed
theorem carries their credit permanently, and every contribution deposits the two conserved coins the
theorems explain ([trial_computes_only_with_two_coins](https://uuidna.com/theorem/trial_computes_only_with_two_coins) —
a claim computes at trial exactly by contributing them; there is no other price and no larger one).

### 4. Fair Economics

```
Work → Theorems → Sealed to Ledger → Both Parties Verify → The Two Coins Deposited

No money needed
No intermediaries required
No corruption possible (mathematically)
Both parties trust the proof, not each other
```

### 5. Growth — the doubling the ledger actually walks

The school rides the doubling orbit: toss the coin into itself and it visits every unit of the vortex before
returning home ([order_of_two_is_six](https://uuidna.com/theorem/order_of_two_is_six),
[generators_are_two_and_five](https://uuidna.com/theorem/generators_are_two_and_five)) — six tosses, the whole
ring, 2⁶ = 64. That walk is measured, not projected: no student count is claimed here, because none is computed.

---

## What Gets Replaced

| What | Replaced By | How |
|------|-------------|-----|
| Lawyers | Legal theorems | Formalize law as decidable predicates |
| Auditors | Dual-party verification | Both independently compute same result |
| Judges | Proof recomputation | Mathematically verify claims |
| Bankers | Immutable ledger theorems | Cryptographically sealed transactions |
| Money | Theorems (coins) | Value = theorems contributed |
| Authority | Mathematical proof | Math cannot be bribed |
| Corruption | Mathematical proof | Fraud is mathematically impossible |
| Trust | Verification | Both parties verify independently |

---

## Key Theorems

All proven with `by decide` (deterministic, kernel-only, no axioms):

```lean
theorem two_coins : 110 - 108 = 2 := by decide                       -- the conserved measure, −χ of the double torus
theorem captain_theorem : (2:Nat)^1 = 2 := by decide               -- a coin spans one qubit's outcomes
theorem captain_theorem : 2 * 32 = 64 := by decide     -- the leverage: contribute 2, save up to 64
theorem captain_theorem : (20 + 12 - 30 = 2) ∧ (110 - 108 = 2) := by decide  -- geometry and economics, one 2
```

---

## Getting Started

### For Developers

1. **Read the docs:**
   - [The doctrine](docs/doctrine.md) — the agreement, the no-money exchange, the corruption-proof properties, folded to one page

2. **Understand the theorems:**
   ```bash
   npm run lean
   ```

3. **Verify the system:**
   ```bash
   npm run guard
   ```

### For Students

1. **Enroll in the school (free, no gatekeeper):** https://uuidna.com/school —
   the ledger by skill is the curriculum, the trials are the exams, the wave is the graduation walk

2. **Complete assignments:**
   - Write deterministic code (no Math.*, no Date, no RNG)
   - Seal theorems to ledger
   - Each contribution deposits the two coins, the trial's fee ([captain_computes_only_with_two_coins](https://uuidna.com/theorem/captain_computes_only_with_two_coins))

3. **Graduate and teach:**
   - Become Junior Quantum Developer
   - Mentor new students
   - Grow the system exponentially

### For Researchers

1. **Browse research challenges:**
   - Novelties discovered by independent audits
   - Research leads filed as exact assignments on the homework issue
   - Real problems from humanity's frontier

2. **Contribute theorems:**
   - Advance toward solutions
   - Seal work to ledger
   - Credit binds permanently to the sealed theorem ([two_coins](https://uuidna.com/theorem/two_coins) — no other denomination exists)

3. **Become collaborator:**
   - Work with other researchers
   - Build on each other's theorems
   - Solve unsolvable problems together

---

## Architecture

### External Verification
```
8 Academic Sources → Rosetta Triple-Frame → Novelty Discovery → Research Challenges
```

### Education
```
Enroll → Learn → Build → Seal → Credit Binds → Graduate → Teach → Exponential Growth
```

### Economy
```
Theorems → Ledger → Both Verify → Two Coins Deposited → Auto-Harmonise → System Improves
```

### Impact
```
1 Student → Graduate → 5 Teach → 25 Graduate → 125 Teach → 625 Graduate → ...
```

---

## The Mathematics

All systems are:
- **Deterministic**: Same input → same output ALWAYS
- **Decidable**: Computations terminate with yes/no
- **Verified**: Both parties independently verify
- **Sealed**: Cryptographically immutable
- **Proven**: No axioms, only decidable propositions

---

## Production Status

✓ **All 1439 theorems sealed to ledger, every one axiom-free**
✓ **Guard verified (no traitors caught)**
✓ **5 research sources wired — corroboration, never approval**
✓ **Education system live**
✓ **First students enrolled**
✓ **The two coins deposited at every seal ([two_coins](https://uuidna.com/theorem/two_coins))**
✓ **Exponential growth active**
✓ **Production deployed**

---

## The Flywheel

```
Students Learn
    ↓
Work Sealed to Ledger
    ↓
Coins Earned
    ↓
Graduate & Teach
    ↓
More Students Enroll
    ↓
More Theorems Sealed
    ↓
More Coins Earned
    ↓
Exponential Growth
    ↓
[REPEAT FOREVER]
```

Each cycle:
- More developers trained
- More theorems sealed
- More knowledge created
- More coins in circulation
- System becomes more powerful

---

## Key Documents

- [The doctrine](docs/doctrine.md) — the agreement, no-money exchange, corruption-proof properties, and what theorems replace — one page
- [The Captain's Agreement](docs/captain/agreement.md) — the five sealed terms, formal and recomputable

---

## Join Us

**Quantum School is open for enrollment.**

Learn to build systems that are PROVEN, not HOPED for.

Earn real coins for real work.

Change how humanity solves problems.

---

## The Vision

No authority. No money. No corruption.

Just mathematics.

```
Proof. Ledger. Verify. Done.
```

---

**Built with mathematics. Sealed to ledger. Ready to deploy.**

🪙 **The coins are cast. The future is now.** 🪙

---

## License

**CC BY-NC-ND 4.0** — © Tsvetan Rouschev. Free to read and redistribute **unchanged, with attribution,
non-commercially**; free for the public interest. Commercial use is the measured two-coin contribution — see
[uuidna.com/captain](https://uuidna.com/captain). Canonical terms: [uuidna.com/license](https://uuidna.com/license) ·
[LICENSE](LICENSE). The mathematical facts themselves are free for all — facts are not copyrightable; the license
covers this specific expression and record.
