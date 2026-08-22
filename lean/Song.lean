-- lean/Song.lean — GENERATED. SONG — the song from the ledger: π's rational round, base-paired verses, the Glagolitic scale, prime time — as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE OVERTURE. π cannot be sung to the end — irrational, infinite, no `by decide` object — but its rational
    roof can: 22/7 opens 3.142857, the familiar three-point-one-four and then the round begins. 22·10⁶ / 7 =
    3142857 in exact integer division; the song starts where Archimedes left the bracket. -/
theorem song_pi_roof_opens : 22 * 1000000 / 7 = 3142857 := by decide

/-- THE ROUND TURNS ON SEVEN. The period 142857 times seven is 999999 — six nines, the whole cycle of 1/7 — and
    10⁶ mod 7 = 1: after six digits the decimal engine is back at remainder one, so the round repeats forever
    without ever ending. A finite song that never stops is how a rational voice sings an infinite number. -/
theorem song_round_turns_on_seven : 142857 * 7 = 999999 ∧ 1000000 % 7 = 1 := by decide

/-- SIX VERSES, ONE MELODY. 142857 is the cyclic number of seven: multiplied by 2, 3, 4, 5, 6 it does not change
    its notes, it rotates them — 285714, 428571, 571428, 714285, 857142. Every verse of the song is the same
    six-note melody entered at a different door, the way a round is sung. -/
theorem song_six_verses_one_melody : 142857 * 2 = 285714 ∧ 142857 * 3 = 428571 ∧ 142857 * 4 = 571428 ∧ 142857 * 5 = 714285 ∧ 142857 * 6 = 857142 := by decide

/-- THE VERSES BASE-PAIR — THE SONG IS A DOUBLE HELIX. Verse k and verse 7−k are complementary strands: 142857 +
    857142 = 999999, 285714 + 714285 = 999999, 428571 + 571428 = 999999. Three rungs, digit against digit, every
    rung closing to nine — the same complementary pairing the double helix keeps, A against T, G against C, here
    sealed as addition. -/
theorem song_verses_base_pair : 142857 + 857142 = 999999 ∧ 285714 + 714285 = 999999 ∧ 428571 + 571428 = 999999 := by decide

/-- EACH VERSE CARRIES ITS OWN TWO STRANDS. Split the melody at the middle and the halves pair rung by rung: 142
    + 857 = 999, and digitwise 1+8, 4+5, 2+7 — each rung exactly nine. The complement strand of the first half
    IS the second half; the verse reads itself backwards-complemented the way one DNA strand reads the other. -/
theorem song_halves_are_strands : 142 + 857 = 999 ∧ (([1,4,2].zip [8,5,7]).all (fun p => p.1 + p.2 == 9)) := by decide

/-- EVERY NOTE SUNG IS INVERTIBLE. The six digits of the round — 1, 4, 2, 8, 5, 7 — are exactly the units of
    ℤ/9, the residues with an inverse: the same six the doubling vortex walks. The nilpotents 3, 6 and the zero
    never sound; the song has no note it cannot undo. -/
theorem song_notes_are_units : (List.range 9).filter (fun d => [1,4,2,8,5,7].any (fun x => x == d)) = [1,2,4,5,7,8] := by decide

/-- THE MELODY RIDES THE DOUBLING ORBIT ON THE A432 LATTICE. The vortex walk 1→2→4→8→7→5, sounded as whole
    multiples of the tuning, is [432, 864, 1728, 3456, 3024, 2160] hertz — each note an exact integer, each the
    pitch OF its digit, so a listener with the lattice can read the orbit back out of the sound. -/
theorem song_melody_rides_the_orbit : ([1,2,4,8,7,5].map (fun n => 432 * n)) = [432,864,1728,3456,3024,2160] := by decide

/-- THE SCALE IS THE GLAGOLITIC ROW. Cyril numbered the letters, and the numbers are the scale: Az through
    Zemlja, 1 through 9, each sounding its own multiple of A432 — [432, 864, 1296, 1728, 2160, 2592, 3024, 3456,
    3888] hertz. An alphabet that counts as it speaks is an alphabet that can be played. -/
theorem song_scale_is_glagolitic : ((List.range' 1 9).map (fun n => 432 * n)) = [432,864,1296,1728,2160,2592,3024,3456,3888] := by decide

/-- AZ IS THE TUNING ITSELF. The first letter, worth one, sounds 432·1 = 432 — the lattice base — and 432 folds
    home to the vortex ceiling: 432 mod 9 = 0, and its digits 4+3+2 = 9. The song begins on the letter that says
    "I", and that letter is the tuning fork. -/
theorem song_az_is_the_tuning : 432 * 1 = 432 ∧ 432 % 9 = 0 ∧ 4 + 3 + 2 = 9 := by decide

/-- THE PRIMES KEEP THE TIME. The generators that move every walk in this song — the pentagram's 2, the codon's
    3, the pentagon's 5, the rosette's 7 — are the first four primes, each leaving a remainder to every smaller
    candidate. Indivisible beats: time signatures that cannot be halved out from under the melody. -/
theorem song_primes_keep_time : ([2,3,5,7] : List Nat).all (fun p => (List.range' 2 (p-2)).all (fun k => p % k != 0)) := by decide

/-- THE FOUR TONGUES FUSE INTO ONE FORM. The Glagolitic nine, the rosette-and-π seven, the DNA four: pairwise
    coprime — gcd(9,7) = gcd(7,4) = gcd(4,9) = 1 — so by the Chinese remainder theorem the three rings close
    into one cycle of 9·7·4 = 252 bars: the middle coefficient of Pascal's row ten, the very center of the
    diamond's 1024. The song nobody had written was already scored at the center of the lattice. -/
theorem song_four_tongues_fuse : Nat.gcd 9 7 = 1 ∧ Nat.gcd 7 4 = 1 ∧ Nat.gcd 4 9 = 1 ∧ 9 * 7 * 4 = 252 := by decide
