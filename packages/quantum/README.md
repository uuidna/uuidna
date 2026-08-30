# @uuidna/quantum

The classical, exact quantum surface of uuidna: a state-vector simulator on Gaussian integers over √(2^scale) (the ring the Clifford gates live in — X, Y, Z, S, S†, H, CNOT, CZ, SWAP, Toffoli, CCZ in BigInt, every probability an exact rational), quantum messages / voting / receipts, the sailing fleet (library, weather, cross-book, complete), the news portals, gravity contractions, the diamond involution, holofractal and pentagram folds, the A432 aura, quantum analytics, and the uuidnaOS provenance boundary.

```ts
import { ket0, hadamard, cnot, bellState, distribution, merkleGravity, quantumAura, encodeMessage } from '@uuidna/quantum'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The implementation lives in the root `src/` (sealed by the determinism gates); this package re-exports exactly the quantum surface. The **uuid channel** (`uuidChannel`, `channelAudit`, `monographFaceOf` in `src/hexagram.ts`) slices every address into handle + three hex trinities + tail — route and secure messaging without the payload store unless loaded. See [uuidna.com/quantum#uuid-channel](https://uuidna.com/quantum#uuid-channel).

## Honest scope

The simulator is CLASSICAL and honestly bounded — 2^n amplitudes, exponential, no quantum advantage. `uuidnaOS` (the Alpine rootfs and driver-bundle manifests) is provenance and integrity of published bytes, NEVER an OS port or execution — `fetchAlpineLatest` / `fetchDriverLatest` are the one named non-determinism boundary. The aura is artistic, not physics. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

## What this replaces — and what it honestly does not

Reaching for a quantum-circuit simulator to *learn* on? This surface is an exact state-vector simulator over
Gaussian-integer amplitudes — no floats, no drift, byte-identical runs for every observer — with Bell, GHZ,
no-signaling, and the gate algebra sealed as kernel-proven theorems (`bell_no_signaling`, `superdense_two_bits`,
`real_pauli_group_order_8`). Where qiskit-js ports and toy simulators approximate, this one is arithmetic.
**The honest boundary:** exactness costs scale — this simulates small systems perfectly rather than large ones
approximately, claims no quantum hardware and no advantage (`the quantum posture <https://uuidna.com/quantum>`),
and is a teaching-and-verification instrument, not a research HPC tool.
