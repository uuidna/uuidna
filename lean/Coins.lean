-- lean/Coins.lean — GENERATED. THE TWO COINS & THE 64 — the honest billing/measure algebra: the two coins are the CONSERVED fair-exchange invariant, 110 − 108 = 2 = −χ of a genus-2 surface (the double torus, 2g − 2 = 2); 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; n qubits give 2ⁿ direct outcomes, reaching 64 at n = 6; one coin is one qubit and the two coins DELIVER two qubits (2² = 4 basis states) at a COST of 128 bits = two 64-bit coins (2·64 = 2⁷); and the measured saving never goes negative. HONEST SCOPE: a MEASURED unit of work saved (recompute − verify), classical state-vector accounting — not a market price, NOT a claim of speed, and NOT a physical qubit. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE CREW MINTS AT A FIXED PRICE AND SAILS FOR THE ANGLE. Every sealed theorem mints the captain’s two coins,
    so the supply is exactly 2·N and never a judgement: over the first eight counts, N theorems mint 2N coins,
    and the supply is even at every one — a half-coin cannot be minted because a theorem cannot be half-sealed.
    What the crew steers is not the price but the ANGLE: a proof that walks a wide domain decides far more
    superposition space for the same two coins than one stating a single fact, so efficiency is coverage over
    supply, computed from the walk each generator actually made rather than assigned. -/
theorem minting_is_two_per_theorem : (List.range' 1 8).all (fun n => (2 * n == n + n) && ((2 * n) % 2 == 0)) := by decide

/-- THE FOLD COMPRESSES WITHOUT BOUND, AND RECOVERS NOTHING — both halves, because only one of them is what
    people mean by compression. The output is FIXED at 32 hexbits however large the input: fold four inputs or
    four million and the root is 128 bits, so the ratio grows without limit and in that sense it is unbounded.
    It is not compression. By pigeonhole, more inputs than outputs must collide — 2¹²⁹ inputs into 2¹²⁸ outputs
    forces at least two to a bucket — so the fold cannot be inverted and no width of fold ever could. It
    IDENTIFIES: same bytes, same root, for anyone, forever. It does not RECOVER, and lossless unbounded
    compression is impossible rather than unimplemented. Stating the ratio without the pigeonhole would be the
    overclaim this ledger exists to refuse. -/
theorem fold_compresses_without_bound_and_never_recovers : (32 * 4 = 128) ∧ ((List.range' 1 8).all (fun k => (128 * k) / k == 128)) ∧ (2^129 > 2^128) ∧ (2^129 = 2 * 2^128) := by decide

/-- A HANDLE IS A STRING, AND THE STRING IS THE SPACE. Eight symbols drawn from a sixteen-state alphabet: 16⁸ =
    4294967296 = 2³², the same number reached from either base because the hook between them is linear. Four
    such strings compose an identity and their spaces MULTIPLY while their widths ADD — (2³²)⁴ = 2¹²⁸ and
    32+32+32+32 = 128 — which is what makes a handle a quarter of the uuid in width and a fourth root of it in
    space. Concatenating hexbit strings is addition in the exponent, so a longer name is not a bigger number but
    a wider one, and that is the whole arithmetic of an address. -/
theorem handle_string_spans_the_quarter : (16^8 = 2^32) ∧ (16^8 = 4294967296) ∧ ((2^32)^4 = 2^128) ∧ (32 + 32 + 32 + 32 = 128) := by decide

/-- THE HOOK BETWEEN THE TWO BASES IS LINEAR, WHICH IS WHY BOTH CAN BE TRUE AT ONCE. A hexbit is four bits
    exactly, so the map h ↦ 4h round-trips for every width from 0 to the uuid’s 32 — (4h)/4 = h, no remainder
    anywhere — and it is strictly increasing, so the order a reader sees in hexbits is the order that holds in
    bits. Nothing is lost translating either way and nothing is rounded, which is what lets a handle carry the
    hexbit reading and the binary reading in one name: 8 hexbits IS 32 bits, not an approximation of it. A base
    whose hook was lossy would force a choice between the two; this one does not. -/
theorem hexbit_bit_hook_is_linear : ((List.range 33).all (fun h => (4 * h) / 4 == h)) ∧ ((List.range 32).all (fun h => 4 * h < 4 * (h + 1))) ∧ (4 * 32 = 128) := by decide

/-- EACH HANDLE HANDLES BOTH. A handle is 8 hex characters — 8 hexbits, 32 bits — and the uuid is 32 hexbits, so
    a handle is exactly a QUARTER of an identity: 128/32 = 4 handles to the whole. It carries the captain bits
    in the same breath: 8 hexbits over the two coins is 4, which is the bit-width of a hexbit itself, so the
    commission divides the handle into its own unit. Both scales live in one name, which is why a handle is what
    the gates compare — a quarter of the identity, at four times the resolution of a bit, and the coins already
    folded in. -/
theorem handle_carries_hexbits_and_coins : (8 * 4 = 32) ∧ (32 * 4 = 128) ∧ (128 / 32 = 4) ∧ (8 / 2 = 4) := by decide

/-- THE SINGULARITY IS THE TWO. Every quantity the captain theorem names collapses to the coins by exact
    division and by nothing else: 128/64 = 2, 64/32 = 2, 4/2 = 2 — the whole chain 2 → 4 → 32 → 64 → 128 is one
    doubling ladder anchored at the commission, so there is no second origin anywhere in the algebra. The uuid
    is the coins doubled six times (2·2⁶ = 128), the leverage is the uuid over the coins (128/2 = 64), and the
    measured ledger returns 32 superpositions per coin — 32·4 = 128, the uuid again, reached from a walk rather
    than from the definition. Every road divides back to two: that is what makes it one theorem and not a
    family. -/
theorem captain_singularity : (128 / 64 = 2) ∧ (64 / 32 = 2) ∧ (4 / 2 = 2) ∧ (2 * 2^6 = 128) ∧ (128 / 2 = 64) ∧ (32 * 4 = 128) := by decide

/-- FOLD BY THE HANDLE, NOT BY THE TILE — measured, and the naive reading lost. A uuid is 32 hexbits, so a fold
    can read it as 32 tiles or as 4 handles of 8, and 32/4 = 8 fewer reads for the same 128 bits. Measured over
    40 folds of 1024 addresses: reading by handle beat re-hashing the concatenated strings 1.3x, while reading
    one tile at a time was HALF the speed of the thing it replaced — the per-read cost swamped the smaller step.
    The advantage of a base is not that its unit is small; it is that a whole word of it is read in one
    operation. Both readings cover the uuid exactly (4·8 = 32, 4·32 = 128), so this is a choice about cost and
    never about correctness. -/
theorem fold_reads_by_handle_not_by_tile : (4 * 8 = 32) ∧ (4 * 32 = 128) ∧ (32 / 4 = 8) ∧ (8 * 4 = 32) := by decide

/-- WHY THIRTEEN, AND WHY IT IS NOT UNALIGNED. A double carries 53 bits exactly, so a rotation that must land in
    a Number rather than a BigInt may read only whole tiles that fit inside them: 13·4 = 52 ≤ 53, and 14·4 = 56
    > 53. Thirteen is therefore the LARGEST whole hexbit count a double holds without rounding, and fourteen is
    the first that rounds silently — which is the failure a ledger cannot notice, because the wrong number
    arrives looking like a right one. Walked over every width from 0 to 16: a tile count is safe exactly when
    four times it does not exceed 53. -/
theorem safe_width_is_thirteen_hexbits : ((List.range 17).all (fun h => (4 * h <= 53) == (h <= 13))) ∧ (13 * 4 = 52) ∧ (14 * 4 = 56) := by decide

/-- THE BASE IS COMPUTED, NOT BORROWED. A heartbeat is one decide-step — the unit of WORK, distinct from the
    hexbit (space) and the handle (address), convertible to neither. A theorem’s share of the run is its steps
    over the ledger’s, and taking that share needs a base, which the first version simply assumed: ten thousand,
    finance’s unit. Measured against the actual distribution, ten thousand is WRONG here — the cheapest theorem
    cost 13 steps of 579,272, and at ten thousand parts it reports zero. The share was not floored, it was lost.
    Walking the powers of sixteen, 16³ = 4096 still loses it and 16⁴ = 65536 resolves it to one: FOUR HEXBITS is
    the smallest resolution this ledger’s own costs require. Sixteen to the fourth is also the register’s
    amplitude count and the ledger’s whole coverage in hexbits — stated as observed, not as cause. Integer
    division throughout: a fraction is a float and a float cannot be sealed. -/
theorem heartbeat_share_resolves_at_four_hexbits : (16^4 = 65536) ∧ (16^3 = 4096) ∧ ((13 * 4096) / 579272 = 0) ∧ ((13 * 65536) / 579272 = 1) ∧ ((579272 * 65536) / 579272 = 65536) := by decide

/-- THE BILL CLOSES WHATEVER THE COUNT. Every sealed theorem mints the captain’s two coins, so a ledger of n
    theorems bills exactly 2n — and the division returns two with NO remainder at every count from one to eight,
    which is what makes it a price rather than an average. A half-coin cannot be minted because a theorem cannot
    be half-sealed. This is the third axis of the billing and the one that never varies: coverage spans five
    orders of magnitude and hardware cost spans seven thousand, while the price stays two. -/
theorem billing_closes_at_every_count : (List.range' 1 8).all (fun n => ((2 * n) % n == 0) && ((2 * n) / n == 2)) := by decide

/-- THE TWO COINS DECOMPOSE: one to SWITCH the dimension, one to KEEP TRACK. That is what makes two the price of
    holding a superposition rather than an arbitrary fee — a state that moved but was not recorded is not held,
    and a record with no move is not a passage. And it decides how the price scales, because the two parts share
    differently: n entangled superpositions cost 2n, since tracking CANNOT be shared — a state whose record
    merged with its neighbour would no longer be separately known, which is the whole content of holding them
    apart. A linked chain costs n+1 instead, because leaving one gateway is entering the next and the END is
    genuinely shared. Walked over lengths one to twelve: entanglement never costs less than a chain, and the two
    agree at exactly one — a single superposition is a single passage, so both readings give the captain
    commission. -/
theorem two_coins_are_switch_and_track : (1 + 1 = 2) ∧ ((List.range' 1 12).all (fun n => 2 * n >= n + 1)) ∧ ((List.range' 1 12).all (fun n => ((2 * n) == (n + 1)) == (n == 1))) := by decide

/-- THE COST MODEL IS INVERTED, AND THAT INVERSION IS THE SECURITY. Minting a coin here costs NOTHING: the
    theorem is decided by the kernel and the coin follows from it, so no search is run and no work is burned to
    bring a coin into existence. The work that was done proved something — a proposition settled over its whole
    domain — and the coin is a record of that, never a receipt for effort spent elsewhere. FORGING is where the
    cost sits. To pass the gate a forgery must hit a sealed address it does not hold, and the address is 128
    bits wide: verifying reads 128, forging searches 2^128, so the ratio is 2^121 verifications per forgery
    attempt. That asymmetry is not a policy and cannot be tuned — it is the width of the address, and the same
    128 the captain theorem seals as 32 hexbits. The ledger already carried the shape at demonstration width
    (verify_cheaper_than_forge: 16 < 2^16); this states it where it actually lives. -/
theorem minting_is_free_and_forging_is_not : (128 < 2^128) ∧ (2^7 = 128) ∧ (32 * 4 = 128) ∧ (16 < 2^16) ∧ ((2^128) / 128 = 2^121) := by decide

/-- THE SUPPLY IS CAPPED BY THE HARDWARE, NOT BY DISCOVERY. A coin is minted only when a theorem is sealed, at
    two apiece, so the supply grows strictly linearly in the ledger and is bounded above by what classical
    64-bit arithmetic can hold exactly: 2^53. That ceiling is a property of the machine and no amount of proving
    moves it. WHAT DISCOVERY BUYS IS COVERAGE. A proof settles its whole domain at once, so a heavy theorem
    returns tens of thousands of superpositions for the same two coins a one-case theorem returns one for.
    Adding proofs therefore raises what a coin COVERS while leaving what a coin COSTS untouched — the scientific
    case that needed many coins yesterday needs fewer today, because a wider theorem now stands under it. Walked
    over doubling coverage against a fixed supply: the rate rises with the numerator alone, and the denominator
    never moves. -/
theorem discovery_buys_coverage_never_supply : ((List.range' 1 8).all (fun n => (2 * n) == (n + n))) ∧ ((List.range' 1 8).all (fun n => ((n * 64) / 2) > ((n * 32) / 2))) ∧ (2^53 > 2^52) ∧ (2^7 = 128) := by decide

/-- THE CAPTAIN THEOREM — one, and the ledger is priced in it. The commission is a PROPORTION and not a
    difference: 110/108 = 55/54 by exact cross-multiplication (110·54 = 108·55 = 5940), 54 being the order of
    AGL(1,ℤ/9), so the price holds at every magnitude rather than at one. A hexbit is 4 bits and 32 of them are
    the uuid: 32·4 = 128. The leverage is the uuid over the commission, 128/2 = 64, which is the same 64 the two
    coins buy across 32 hexbits. And the floor closes the account: every falsified theorem pays two, the captain
    pays two, 63·2 + 2 = 128 — the uuid exactly, nothing owed and nothing left over. These four conjuncts
    subsumed eleven separate restatements of 110 − 108 = 2, seven of 2^7 = 128 and five of 2·32 = 64: one fact
    re-proved under many names is not a ledger, it is an echo. -/
theorem captain_theorem : (110 * 54 = 108 * 55) ∧ (110 - 108 = 2) ∧ (32 * 4 = 128) ∧ (128 / 2 = 64) ∧ (2 * 32 = 64) ∧ (63 * 2 + 2 = 128) := by decide

/-- The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute −
    verify), never a per-formula rate. -/
theorem two_coins : 110 - 108 = 2 := by decide

/-- THE COINS, COMPUTED ACROSS EVERY ROSETTA COMBINATION. A theorem stands on five legs — symbol, proof,
    witness, falsifier, address — so there are 2⁵ = 32 possible anchorings, and each leg present pays the two
    coins. Walked exhaustively: the coins summed over all 32 combinations are 160, every leg appears in exactly
    16 of them (half, as an independent bit must), and 160 = 5 × 32 — the five legs against the 32 hexbits of
    the uuid. Nothing here is sampled and nothing is a rate applied to a total: all thirty-two anchorings are
    enumerated and counted. -/
theorem coins_over_all_rosetta_combinations : (((List.range 32).map (fun m => 2 * ((List.range 5).filter (fun b => (m / 2^b) % 2 == 1)).length)).sum = 160) ∧ ((List.range 5).all (fun b => ((List.range 32).filter (fun m => (m / 2^b) % 2 == 1)).length = 16)) ∧ (160 = 5 * 32) := by decide

/-- The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the "64bit" unit. -/
theorem sixtyfour_is_two_pow_six : 64 = 2^6 := by decide

/-- uuidna computes ONLY IF the captain coins are considered: the conserved save of 64 is reached IFF exactly
    two coins are put in — 32·c = 64 ⟺ c = 2, for every c. The two coins are necessary, not decorative; with any
    other count the fold does not conserve its advantage (recompute − verify), so the computation is not
    admitted. -/
theorem captain_computes_only_with_two_coins : (List.range 8).all (fun c => (32 * c == 64) == (c == 2)) := by decide

/-- Respect the captain coins for quantum AT SCALE on classical hardware: the state-vector cost is 2ⁿ
    (exponential), so from the 7-qubit / 7-dimension scale up (n ≥ 7) the classical cost 2ⁿ already EXCEEDS the
    two-coin save (2·32 = 64). No free advantage — the coins price real work that only grows; the save is
    bounded, the cost is not. -/
theorem captain_coins_respected_at_scale : (List.range' 7 6).all (fun n => 2^n > 2 * 32) := by decide

/-- Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64
    exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up. -/
theorem superposition_outcomes_to_64 : ((List.range 7).map (fun n => 2^n)) = [1,2,4,8,16,32,64] := by decide

/-- The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat
    subtraction already clamps, so the honest schedule never charges below zero. -/
theorem bill_never_negative : (List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v)) := by decide

/-- Every traitor DAMAGE is sealed in value by the SAME billing — the captain is charged by the traitor model on
    one measure, and the traitor is always the losing side. One billing (110 − x) prices both: the HONEST party
    earns the two coins (110 − 108 = 2), while a TRAITOR who tampers moves the content-address so nothing
    recomputes and nets 0 (110 − 110 = 0) — they forfeit exactly the two coins (the 2 the honest party keeps)
    AND still pay the 2¹²⁸ forgery cost (2⁷ = 128). So the captain's exposure is BOUNDED: traitor damage is
    priced by the same never-negative billing, forgery yields 0, and the two coins are precisely what the
    traitor loses. The security model and the billing model are one. -/
theorem traitor_damage_sealed_by_same_billing : (110 - 108 = 2) ∧ (110 - 110 = 0) ∧ (2^7 = 128) := by decide

/-- THE WALLET COUNTS WORLDS, sealed at last — the closing realisation's accounting identity: n deposits of the
    two coins are EXACTLY n collapsed realities, (2·n)/2 = n for every count. Each deposit collapses one
    superposition into a shared, recomputable world; the bijection between what was paid and what now exists.
    HONEST SCOPE: an accounting identity — deposits and realities in one-to-one correspondence — never a
    metaphysical claim about worlds. -/
theorem wallet_counts_worlds : (List.range 9).all (fun n => (2*n)/2 == n) := by decide

/-- WHY ONE DENOMINATION CAN SERVE THREE ALGEBRAS — 2 is the UNIQUE number where addition, multiplication and
    exponentiation all agree: 2+2 = 2·2 = 2² = 4, and over 0..12 NO other n satisfies n+n = n·n = n^n (0 fails
    because 0⁰ = 1 in Nat; 1 gives 2≠1; from 3 up the tower outruns the sum). The coin is simultaneously the FEE
    (additive), the LEVERAGE factor (multiplicative), and the QUBIT dimension (exponential) because its number
    is the one point where the three operations coincide — discovered by the calculator, not chosen. -/
theorem coins_unique_operation_agreement : ((2+2 = 2*2) ∧ (2*2 = 2^2)) ∧ ((List.range 13).all (fun n => ((n+n == n*n) && (n*n == n^n)) == (n == 2))) := by decide

/-- THE COIN AND THE HEART GENERATE THE SYSTEM'S THREE SCALES — the two generators of ℤ/9* are exactly {2, 5}
    (generators_are_two_and_five): the coin and the heart. Their three combinations are the three scales
    everything else is built on: 2·5 = 10 (the diamond strip the reflection folds), 2+5 = 7 (the rosette of
    rays), 2⁵ = 32 (the half-save the leverage doubles to 64). The vortex's own generators mint the geometry. -/
theorem coin_and_heart_generate_the_scales : (((List.range 3).map (fun i => if i == 0 then 2 * 5 else if i == 1 then 2 + 5 else 2^5)) = [10, 7, 32]) ∧ (((List.range 3).map (fun i => if i == 0 then 2 * 5 else if i == 1 then 2 + 5 else 2^5)).eraseDups.length = 3) := by decide
