---
title: The song from the ledger
description: The song nobody had written — Glagolitic, π, primes and DNA in one round, every bar a sealed theorem.
---

# The song from the ledger <Badge type="tip" text="every bar sealed" />

> The search *“sing glagolitic pi primes dna song”* finds nothing that joins the four. Pi songs exist, DNA songs
> exist, Janáček set the Glagolitic Mass — nothing sings all four at once. This page is that song, and it was not
> composed: it was **derived**. Every structure below is a theorem in [`lean/Song.lean`](/lean/Song.lean),
> proven `by decide`, axiom-free; the generator that renders this page refuses any bar the ledger has not sealed.

<audio controls src="/song.wav" style="width:100%"></audio>

The recording above is exact: integer samples on the A432 lattice ([the ledger's own voice](/quantum-messaging)),
so it is the **same bytes for anyone, forever**. Its content-address is `f237ee88` — recompute it from the
file and it either matches or the recording is not this song.

## The form

**Intro** — the Glagolitic scale, Az to Zemlja: the row 1‥9, each letter sounding its own multiple of A432.

| digit | letter | pitch |
|---|---|---|
| 1 | Ⰰ Az | 432 Hz |
| 2 | Ⰱ Buky | 864 Hz |
| 3 | Ⰲ Vedi | 1296 Hz |
| 4 | Ⰳ Glagoli | 1728 Hz |
| 5 | Ⰴ Dobro | 2160 Hz |
| 6 | Ⰵ Jest | 2592 Hz |
| 7 | Ⰶ Zhivete | 3024 Hz |
| 8 | Ⰷ Dzelo | 3456 Hz |
| 9 | Ⰸ Zemlja | 3888 Hz |

**Six verses, strand against strand** — each verse is a rotation of the round `142857` (the cyclic number of
seven: the decimal period of π's rational roof 22/7). The verses are sung in **base-pair order** — each strand
followed by its complement, because verse k + verse 7−k = 999999, digit against digit, every rung a nine: the
double helix, audible.

| verse | round | sung as | pairs with |
|---|---|---|---|
| 1 | `142857` | Ⰰ Ⰳ Ⰱ Ⰷ Ⰴ Ⰶ | 6 (sums to 999999) |
| 6 | `857142` | Ⰷ Ⰴ Ⰶ Ⰰ Ⰳ Ⰱ | 1 (sums to 999999) |
| 2 | `285714` | Ⰱ Ⰷ Ⰴ Ⰶ Ⰰ Ⰳ | 5 (sums to 999999) |
| 5 | `714285` | Ⰶ Ⰰ Ⰳ Ⰱ Ⰷ Ⰴ | 2 (sums to 999999) |
| 3 | `428571` | Ⰳ Ⰱ Ⰷ Ⰴ Ⰶ Ⰰ | 4 (sums to 999999) |
| 4 | `571428` | Ⰴ Ⰶ Ⰰ Ⰳ Ⰱ Ⰷ | 3 (sums to 999999) |

**Chorus** — the doubling orbit 1→2→4→8→7→5 on the same lattice: the same six notes as every verse (the round's
digits ARE the units of ℤ/9), walked in the vortex's own order.

**Coda** — Az alone: 432 Hz, the tuning the song began on, held for 999 ms — the nines the strands
close to.

Every note is 252 ms: 9·7·4, the one cycle the four tongues fuse into by the Chinese remainder theorem —
the middle coefficient of Pascal's row ten, the very center of the 1024.

## The lyrics — eleven sealed lines

The lyrics are not printed *about* the theorems; they **are** the theorems' doc-names, exactly as the kernel
signed them:

> THE OVERTURE. π cannot be sung to the end — irrational, infinite, no `by decide` object — but its rational roof can: 22/7 opens 3.142857, the familiar three-point-one-four and then the round begins. 22·10⁶ / 7 = 3142857 in exact integer division; the song starts where Archimedes left the bracket.
> — [`song_pi_roof_opens`](/theorem/song_pi_roof_opens)

> THE ROUND TURNS ON SEVEN. The period 142857 times seven is 999999 — six nines, the whole cycle of 1/7 — and 10⁶ mod 7 = 1: after six digits the decimal engine is back at remainder one, so the round repeats forever without ever ending. A finite song that never stops is how a rational voice sings an infinite number.
> — [`song_round_turns_on_seven`](/theorem/song_round_turns_on_seven)

> SIX VERSES, ONE MELODY. 142857 is the cyclic number of seven: multiplied by 2, 3, 4, 5, 6 it does not change its notes, it rotates them — 285714, 428571, 571428, 714285, 857142. Every verse of the song is the same six-note melody entered at a different door, the way a round is sung.
> — [`song_six_verses_one_melody`](/theorem/song_six_verses_one_melody)

> THE VERSES BASE-PAIR — THE SONG IS A DOUBLE HELIX. Verse k and verse 7−k are complementary strands: 142857 + 857142 = 999999, 285714 + 714285 = 999999, 428571 + 571428 = 999999. Three rungs, digit against digit, every rung closing to nine — the same complementary pairing the double helix keeps, A against T, G against C, here sealed as addition.
> — [`song_verses_base_pair`](/theorem/song_verses_base_pair)

> EACH VERSE CARRIES ITS OWN TWO STRANDS. Split the melody at the middle and the halves pair rung by rung: 142 + 857 = 999, and digitwise 1+8, 4+5, 2+7 — each rung exactly nine. The complement strand of the first half IS the second half; the verse reads itself backwards-complemented the way one DNA strand reads the other.
> — [`song_halves_are_strands`](/theorem/song_halves_are_strands)

> EVERY NOTE SUNG IS INVERTIBLE. The six digits of the round — 1, 4, 2, 8, 5, 7 — are exactly the units of ℤ/9, the residues with an inverse: the same six the doubling vortex walks. The nilpotents 3, 6 and the zero never sound; the song has no note it cannot undo.
> — [`song_notes_are_units`](/theorem/song_notes_are_units)

> THE MELODY RIDES THE DOUBLING ORBIT ON THE A432 LATTICE. The vortex walk 1→2→4→8→7→5, sounded as whole multiples of the tuning, is [432, 864, 1728, 3456, 3024, 2160] hertz — each note an exact integer, each the pitch OF its digit, so a listener with the lattice can read the orbit back out of the sound.
> — [`song_melody_rides_the_orbit`](/theorem/song_melody_rides_the_orbit)

> THE SCALE IS THE GLAGOLITIC ROW. Cyril numbered the letters, and the numbers are the scale: Az through Zemlja, 1 through 9, each sounding its own multiple of A432 — [432, 864, 1296, 1728, 2160, 2592, 3024, 3456, 3888] hertz. An alphabet that counts as it speaks is an alphabet that can be played.
> — [`song_scale_is_glagolitic`](/theorem/song_scale_is_glagolitic)

> AZ IS THE TUNING ITSELF. The first letter, worth one, sounds 432·1 = 432 — the lattice base — and 432 folds home to the vortex ceiling: 432 mod 9 = 0, and its digits 4+3+2 = 9. The song begins on the letter that says "I", and that letter is the tuning fork.
> — [`song_az_is_the_tuning`](/theorem/song_az_is_the_tuning)

> THE PRIMES KEEP THE TIME. The generators that move every walk in this song — the pentagram's 2, the codon's 3, the pentagon's 5, the rosette's 7 — are the first four primes, each leaving a remainder to every smaller candidate. Indivisible beats: time signatures that cannot be halved out from under the melody.
> — [`song_primes_keep_time`](/theorem/song_primes_keep_time)

> THE FOUR TONGUES FUSE INTO ONE FORM. The Glagolitic nine, the rosette-and-π seven, the DNA four: pairwise coprime — gcd(9,7) = gcd(7,4) = gcd(4,9) = 1 — so by the Chinese remainder theorem the three rings close into one cycle of 9·7·4 = 252 bars: the middle coefficient of Pascal's row ten, the very center of the diamond's 1024. The song nobody had written was already scored at the center of the lattice.
> — [`song_four_tongues_fuse`](/theorem/song_four_tongues_fuse)

## Honest scope

π itself is not in this song and cannot be: irrational, infinite, not a `by decide` object —
[`pi_bracketed_by_finite_rationals`](/theorem/pi_bracketed_by_finite_rationals) holds the bracket and π stays
outside, by its nature. What is sealed and sung is the **finite round its rational roof carries**. Nothing here
claims 432 Hz heals, that π is mystical, or that DNA encodes music: the letters carry numbers because Cyril
numbered them, the round turns on seven because 10⁶ ≡ 1 (mod 7), and the verses pair because the arithmetic says
so. Arithmetic sung, never numerology.
