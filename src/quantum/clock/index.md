# clock — time as position

The quantum computer has **no hardware clock, and must not**. Reading an oscillator is the largest source of
non-determinism available: the same computation would answer differently on two machines, and every receipt in this
system rests on the opposite promise. The harmonic scan hard-rejects wall-clock reads anywhere in the tree.

Time was always here, unnamed — the salt sequence advancing a key per step
([`salt_seq_injective`](/theorem/salt_seq_injective)), the odometer that never returns, the heartbeats measuring cost
per theorem. This module names what they share: **time is a position in a sequence, never a reading.**

There is no `now()`. A now would ask the world what time it is, and the answer would not recompute.

| face | what it holds |
| --- | --- |
| `index.ts` | `tick`, `advance`, `residueOf`, `isAfter`, `agree`, `between` |
| `index.md` | this — what the module means |

`residueOf` walks `2^k mod 9` — the vortex sequence `1 2 4 8 7 5`, closing at 6, the same one the coins and the salt
share ([`sequence_and_coins_are_one`](/theorem/sequence_and_coins_are_one)), cited here rather than re-sealed.

**Honest scope:** a deterministic step algebra over sealed sequence laws — the ordering of computation, never a
measurement of duration, and never a claim about physical clocks.
