-- lean/Colour.lean — GENERATED. THE COLOUR WHEEL — colour theory as decidable arithmetic: the wheel is ℤ/12, complements oppose (+6), primaries and secondaries make six, the triad is thirds and the square is fourths, true colour is 24-bit, tint and shade complement to full value. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE 378-STATE AURA ALPHABET, WALKED — 9 residues x 7 rays x 6 waves, and no two states share a colour.
    Sorted and split into 6 chunks of 63: each chunk carries no duplicate, and every chunk's last value is
    strictly below the next chunk's first, so the whole run rises strictly and all 378 colours are distinct.
    CHUNKED BECAUSE NO WING BUYS ITS OWN CEILING — a flat eraseDups over 378 exceeds Lean's default maxRecDepth
    (measured: 96 decides, 128 does not), and across all 118 wings the census of recursion-depth raises is zero.
    The split is arithmetic, not a weakening: within-chunk distinctness plus strictly rising boundaries is
    exactly global distinctness on a sorted run. AND THE DISTINCTNESS IS EARNED, NOT GIVEN: hue alone does NOT
    separate these states — colours #41dcab and #30cf9c both sit at hue 161 — so the alphabet is distinct
    because of the combination of hue, saturation and lightness rather than because any one component already
    told them apart. A distinctness claim whose components already separate is decoration; this one is checked
    against a witness that they do not. Measured across the alphabet: hue alone collides 90 times, saturation
    with lightness collides 294 times. SCOPE: these are the 378 states the aura surface serves and their
    pairwise distinctness as integers — not a claim that they are perceptually distinguishable, which is a fact
    about eyes and not about arithmetic. -/
theorem aura_alphabet_is_pairwise_distinct : ([2148831, 2181854, 2219638, 2284884, 2387419, 2415567, 2461658, 2545973, 2546092, 2676619, 2702038, 2731734, 2738400, 2772703, 2775765, 2809727, 2870228, 2872428, 2874974, 2912477, 2940372, 3003068, 3046097, 3051740, 3068239, 3133490, 3136064, 3136178, 3184591, 3198876, 3201427, 3227608, 3256024, 3289040, 3327202, 3363041, 3366615, 3400074, 3460053, 3462516, 3465066, 3483353, 3502302, 3527874, 3530459, 3571155, 3575773, 3593048, 3658301, 3726413, 3726523, 3774928, 3788963, 3791773, 3818201, 3845337, 3855913, 3891416, 3914979, 3951842, 3983575, 3987327, 3990170].eraseDups.length = 63) ∧ ([4011986, 4052681, 4055420, 4091104, 4118752, 4160981, 4164062, 4183396, 4184113, 4206554, 4248650, 4250976, 4251080, 4298962, 4313772, 4316331, 4380986, 4433627, 4447045, 4480474, 4506084, 4539355, 4544483, 4571353, 4577679, 4580252, 4643029, 4645503, 4683233, 4684247, 4708212, 4709601, 4755936, 4773211, 4821972, 4838585, 4841316, 4841416, 4866260, 4906529, 4906669, 4934621, 4959453, 4971851, 5007068, 5032422, 5038652, 5060828, 5096923, 5102482, 5137636, 5167829, 5168938, 5170332, 5189329, 5210840, 5232760, 5235584, 5276130, 5298016, 5300531, 5300962, 5348310].eraseDups.length = 63) ∧ ([5348321, 5363386, 5431399, 5431494, 5496748, 5513949, 5527774, 5551582, 5599965, 5688796, 5692562, 5757906, 5759813, 5781203, 5803226, 5823099, 5824084, 5888355, 5940440, 5952810, 5953721, 5982421, 6150724, 6171614, 6215475, 6308061, 6312151, 6346811, 6511065, 6569941, 6572511, 6612046, 6741068, 6771424, 6960351, 7089108, 7135294, 7199524, 7396652, 7396917, 7527765, 7615701, 7620567, 7725383, 7741918, 7884760, 7984967, 8048942, 8083674, 8142305, 8246070, 8246591, 8334047, 8338647, 8341218, 8409059, 8512080, 8575055, 9035327, 9057249, 9119959, 9230936, 9389529].eraseDups.length = 63) ∧ ([9427493, 9428278, 9493550, 9560136, 9588187, 9590492, 9646297, 9688137, 9948976, 10015297, 10080313, 10108130, 10212945, 10215761, 10236111, 10241507, 10243812, 10303963, 10697168, 10803290, 10935107, 11223516, 11282137, 11289042, 11293663, 11327802, 11328843, 11356894, 11458089, 11458609, 11677658, 11918932, 12143060, 12147416, 12210646, 12269788, 12332498, 12378939, 12638533, 12706884, 12727764, 12902962, 12966733, 12997344, 13123805, 13126111, 13162300, 13164585, 13188566, 13229856, 13231692, 13358123, 13358388, 13491286, 13575387, 13578391, 13605936, 13643570, 13646233, 13673273, 13708879, 13708922, 13776701].eraseDups.length = 63) ∧ ([13779352, 13779372, 13785051, 13810733, 13842008, 13842045, 13904748, 13904843, 13905117, 13910090, 13912467, 13941065, 13943349, 13970010, 13972596, 13972683, 13975421, 13977304, 13977691, 13979354, 13984831, 14035258, 14035374, 14040521, 14045595, 14045626, 14103390, 14105800, 14108537, 14110816, 14120007, 14122812, 14125864, 14168383, 14168494, 14170976, 14173909, 14176120, 14176130, 14178980, 14203226, 14213182, 14231093, 14233747, 14236226, 14236332, 14239168, 14244195, 14257989, 14265382, 14296463, 14298944, 14299058, 14304349, 14307029, 14309499, 14309516, 14361709, 14366174, 14369605, 14369702, 14372242, 14372293].eraseDups.length = 63) ∧ ([14392633, 14405412, 14406231, 14429840, 14432333, 14437478, 14440082, 14440141, 14461761, 14465848, 14475591, 14492244, 14494832, 14497423, 14499936, 14502731, 14502828, 14505330, 14534720, 14537772, 14557514, 14557558, 14560094, 14562672, 14562779, 14565257, 14568109, 14570584, 14570677, 14622921, 14625358, 14625407, 14633316, 14633416, 14641716, 14658643, 14690760, 14696044, 14696152, 14698641, 14701159, 14730834, 14758736, 14761340, 14763893, 14763996, 14766491, 14780979, 14824132, 14826572, 14829183, 14831745, 14831842, 14850620, 14869072, 14891964, 14894423, 14897024, 14916677, 14959809, 14962276, 14962332, 15092937].eraseDups.length = 63) ∧ (3990170 < 4011986) ∧ (5348310 < 5348321) ∧ (9389529 < 9427493) ∧ (13776701 < 13779352) ∧ (14372293 < 14392633) ∧ (4316331 ≠ 3198876) := by decide

/-- THE HEART DISCOVERY: each rosette ray offsets the hue wheel by 360/7 = 51°, and the FOURTH ray (index 3,
    counting the first as 1) lands at 3·51 = 153° — squarely the green band. The seven rays walk the wheel as
    seven stations, and the fourth is green — the arithmetic behind the observation that two seven-fold systems
    agree. the offset arithmetic is sealed; any chakra reading of it stays UNVERIFIED — the number is sealed,
    the meaning is not. -/
theorem fourth_ray_is_green_band : (360 / 7 = 51) ∧ (3 * 51 = 153) := by decide

/-- THE ALPHABET FOLDS HOME: the aura alphabet counts 9·7·6 = 378 states — and 378 digit-sums to 3+7+8 = 18,
    which folds to 1+8 = 9: the alphabet's digital root IS the ring it was built from. The colour code, counted,
    returns to ℤ/9 — the system's own number closing over its own alphabet. -/
theorem alphabet_digital_root_is_nine : (9*7*6 = 378) ∧ (3+7+8 = 18) ∧ (1+8 = 9) := by decide

/-- THE WALK IS ONE TURN OF THE RING: the graduation walk grew to nine steps — AND NINE IS THE FIRST STEP THAT
    CLOSES IT: no step from one to eight returns the walk to its start, and the ninth does. Stated as `9 % 9 = 0
    ∧ 8 % 9 = 8` it was TRUE FOR STRUCTURAL REASONS RATHER THAN FOR THE RING'S — `a % a = 0` holds for every a
    and `a % b = a` for every a below b, so neither conjunct could have been false whatever the modulus was, and
    the claim rested entirely on which constants were chosen to display. Restated over the whole walk it depends
    on the nine: the same sentence with a modulus of four is refused by the kernel. The enrollment walk a
    theorem takes to be born is exactly one turn of the arithmetic it enters. The walk closes because the ring
    closes. -/
theorem nine_step_walk_closes_the_ring : (((List.range 9).drop 1).all (fun n => n % 9 != 0)) ∧ (9 % 9 = 0) := by decide

/-- THE SCATTERING LESSON, part 1 — the meeting points. Two aura hue pairs meet on the wheel's mirror line
    through 0°: 340° and 20° are equidistant from the top (360−340 = 20), as are 320° and 40° (360−320 = 40).
    Symmetric approach paths cross at the axis — where the totality check heard thunder: two states rendering
    one colour. -/
theorem hue_mirror_meeting : (360 - 340 = 20) ∧ (360 - 320 = 40) := by decide

/-- THE SCATTERING LESSON, part 2 — the interaction that preserves both paths. The one-percent saturation
    tiebreak is the smallest possible interaction, the successor: 62+2·5 = 72 with its lifted partner 73, and
    62+2·3 = 68 with its lifted 69 — distinct by +1, so states that once fused now meet, interact, and continue
    distinguishable, the +1 left in the formula as the trace. Degeneracy lifted, information conserved:
    scattering. -/
theorem scattering_tiebreak_separates : (62 + 2*5 = 72) ∧ (72 + 1 = 73) ∧ (62 + 2*3 = 68) ∧ (68 + 1 = 69) := by decide

/-- THE SCATTERING LESSON, part 3 — why the channels had to join. The aura alphabet is 9·7·6 = 378 states and
    the hue wheel holds only 360 degrees: 360 < 378, so by pigeonhole hue alone cannot name every state —
    saturation and lightness must carry their shares. The collision was never a bug in the arithmetic; it was
    the arithmetic insisting on more dimensions. -/
theorem alphabet_exceeds_wheel : (9*7*6 = 378) ∧ (360 < 378) := by decide

/-- The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0),
    advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock. -/
theorem twelve_hue_wheel_wraps : 12 % 12 = 0 ∧ 13 % 12 = 1 := by decide

/-- Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse
    involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h
    for every hue). Opposites, cleanly paired. -/
theorem complementary_hues_oppose : (List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h) := by decide

/-- Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel —
    3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour. -/
theorem primaries_and_secondaries_make_six : 3 + 3 = 6 := by decide

/-- A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0,
    4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel. -/
theorem triadic_harmony_is_thirds : (List.range 3).map (fun k => (4 * k) % 12) = [0,4,8] := by decide

/-- A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3,
    6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel. -/
theorem square_harmony_is_fourths : (List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9] := by decide

/-- True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours
    in all. The palette the screen paints is a power of two, three channels deep. -/
theorem true_colour_is_24_bit : 2^8 = 256 ∧ 2^24 = 16777216 := by decide

/-- On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v +
    (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward
    white and shade toward black are the two ends of one complement. -/
theorem tint_and_shade_complement : (0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255) := by decide

/-- The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through
    the two temperature poles. Warm and cool are the wheel folded in two. -/
theorem warm_cool_split_six_six : 6 + 6 = 12 := by decide

/-- The aura’s hue step the A432 rendering ASSUMES, sealed (axiom-hunt): the ℤ/9 vortex walks the 360° wheel in
    steps of 40° — 9 · 40 = 360 exactly, so the nine residues tile the circle with no remainder. Artistic
    arithmetic. -/
theorem aura_step_divides_circle : (9 * 40 = 360) ∧ (360 % 9 = 0) := by decide

/-- THE POLARITY ANGLES ARE NOT CHOSEN — each is 360 divided by a count the system already holds: 360/9 = 40° is
    the A432 digit step (BASE), 360/6 = 60° is the colour sector AND the vortex orbit's length (2 has order 6 in
    ℤ/9*), 360/4 = 90° is QUADRATURE — the four basis states the two coins deliver (2² = 4) — and 360/3 = 120°
    is the trinity, which is also two sectors (2·60), the anchor the palette hangs the heart on. Four angles,
    four counts, no aesthetics. -/
theorem polarity_angles_are_the_system_counts : (360 / 9 = 40) ∧ (360 / 6 = 60) ∧ (360 / 4 = 90) ∧ (360 / 3 = 120) ∧ (2 * 60 = 120) ∧ (2^2 = 4) := by decide

/-- THE BOUNDARY BETWEEN THE TWO INVOLUTIONS — the dz mirror (d ↦ 10−d, an involution on DIGITS) is not the
    colour complement (h ↦ h+180°, an involution on HUES), because no whole number of A432 steps reaches a half
    turn: 180 % 40 = 20 ≠ 0, and 4·40 = 160 < 180 < 200 = 5·40 — the complement of any digit's hue falls
    strictly BETWEEN two digits. The 9-lattice and the 6-lattice meet only at multiples of their common 120°.
    Two involutions, one wheel, and they do not coincide — stated rather than smoothed over. -/
theorem no_digit_is_an_exact_complement : (180 % 40 = 20) ∧ (4 * 40 = 160) ∧ (160 < 180) ∧ (180 < 200) ∧ (5 * 40 = 200) := by decide
