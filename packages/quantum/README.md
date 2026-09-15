# @uuidna/quantum

The classical, exact quantum surface of uuidna: exact state-vector computation on Gaussian integers over √(2^scale) (the ring the Clifford gates live in — X, Y, Z, S, S†, H, CNOT, CZ, SWAP, Toffoli, CCZ in BigInt, every probability an exact rational), quantum messages / voting / receipts, the sailing fleet (library, weather, cross-book, complete), the news portals, gravity contractions, the diamond involution, holofractal and pentagram folds, the A432 aura, quantum analytics, and the uuidnaOS provenance boundary.

## Install

```bash
npm install @uuidna/uuidna
```

## Quick start

```js
import { bellState, distribution } from '@uuidna/uuidna/quantum'

console.log(distribution(bellState()).map(({ num, den }) => num + '/' + den).join(' '))
// → 1/2 0/1 0/1 1/2
```

The Bell state's four outcome probabilities (|00⟩, |01⟩, |10⟩, |11⟩) as exact rationals, computed in BigInt with no
floating point. `@uuidna/uuidna/quantum` is this surface inside the umbrella package, and `@uuidna/quantum`
re-exports the same bindings. The rest of it:

```ts
import { ket0, hadamard, cnot, bellState, distribution, merkleGravity, quantumAura, encodeMessage } from '@uuidna/quantum'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The implementation lives in the root `src/` (sealed by the determinism gates); this package re-exports exactly the quantum surface. The **uuid channel** (`uuidChannel`, `channelAudit`, `monographFaceOf` in `src/hexagram.ts`) slices every address into handle + three hex trinities + tail — route and secure messaging without the payload store unless loaded. See [uuidna.com/quantum#uuid-channel](https://uuidna.com/quantum#uuid-channel).

## Honest scope

The state-vector computation is CLASSICAL and honestly bounded — 2^n amplitudes, exponential, no quantum advantage. `uuidnaOS` (the Alpine rootfs and driver-bundle manifests) is provenance and integrity of published bytes, NEVER an OS port or execution — `fetchAlpineLatest` / `fetchDriverLatest` are the one named non-determinism boundary. The aura is artistic, not physics. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

## What this replaces — and what it honestly does not

Reaching for a quantum-circuit simulator to *learn* on? This surface computes exact state vectors over
Gaussian-integer amplitudes — no floats, no drift, byte-identical runs for every observer — with Bell, GHZ,
no-signaling, and the gate algebra sealed as kernel-proven theorems (`bell_no_signaling`, `superdense_two_bits`,
`real_pauli_group_order_8`). Where qiskit-js ports and toy simulators approximate, this one is arithmetic.
**The honest boundary:** exactness costs scale — this computes small systems exactly rather than large ones
approximately, claims no quantum hardware and no advantage (`the quantum posture <https://uuidna.com/quantum>`),
and is a teaching-and-verification instrument, not a research HPC tool.
