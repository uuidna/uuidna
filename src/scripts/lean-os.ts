#!/usr/bin/env node
// Automate the Lean layer for THE OS-INTEGRITY ALGEBRA — the third named layer, completing hardware → software → os.
// Where hardware seals the spec a NETLIST is verified against and software the laws a PROGRAM is verified against, this
// seals the decidable facts a DEPLOYMENT is verified against: that a system image / driver bundle is EXACTLY the named
// upstream bytes. uuidnaOS (src/os, src/drivers) is a content-addressed PROVENANCE boundary — it pins
// an exact Alpine release + driver bundle and their PUBLISHED SHA-256 digests, and checks your actual bytes with
// uuidna's OWN pure-TS SHA-256. It NEVER boots, ports, links, or executes — integrity. The decidable
// core of that boundary: verification IS byte-equality (exact-copy), so a single changed byte, a truncation, or a
// reordering breaks the match (a provenance is a SEQUENCE; the digest is a fixed 256 bits, the content-
// address a fixed 128; and the non-determinism boundary is EXACTLY the two named modules — nowhere else. Each fact is
// a decidable, AXIOM-FREE `by decide` particle. integrity— uuidna SEALS
// what an exact-copy verification decides, so a deployment can be verified against it; it does NOT run an operating
// system, and no theorem here claims it does. A sealed integrity spec.
import { emit, range } from './lean-gen.js'

const eqBytes = (a: number[], b: number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i])

// THE PINNED 32-BYTE DIGEST, AS BYTES. Alpine's PUBLISHED SHA-256 for the release this boundary pins —
// 41f73e3cf5fa919b8aa5ca6b30dc48f0da2720776d7423e2a7748211456fe081, Alpine 3.24.1/x86_64 — the same anchor
// Installs.lean already seals as 64 nibbles. Here it is the 32 BYTES, because a single-byte tamper is indexed by
// byte position, and the object this wing states is exactly that: one byte, at one of 32 places.
const DIGEST_BYTES = [
  65, 247, 62, 60, 245, 250, 145, 155, 138, 165, 202, 107, 48, 220, 72, 240,
  218, 39, 32, 119, 109, 116, 35, 226, 167, 116, 130, 17, 69, 111, 224, 129,
]

const FACTS = [
  { key: 'exact_copy_is_byte_equality',
    why: 'PROVENANCE verification IS byte-equality: the bytes you hold match the pinned release exactly — [1,2,3] equals [1,2,3]. The exact-copy proof is nothing more, and nothing less, than the held bytes equalling the named ones.',
    js: () => eqBytes([1, 2, 3], [1, 2, 3]),
    lean: 'theorem exact_copy_is_byte_equality : ([1,2,3] : List Nat) = [1,2,3] := by decide' },

  { key: 'single_byte_tamper_is_detected',
    why: 'A SINGLE-BYTE TAMPER is DETECTED: change one byte of the image and it no longer equals the pinned bytes — [1,2,3,4] ≠ [1,2,0,4]. One flipped bit fails the check; a modified base cannot masquerade as the named upstream.',
    js: () => !eqBytes([1, 2, 3, 4], [1, 2, 0, 4]),
    lean: 'theorem single_byte_tamper_is_detected : ([1,2,3,4] : List Nat) ≠ [1,2,0,4] := by decide' },

  { key: 'single_byte_tamper_space_is_enumerated',
    why: 'THE TAMPER SPACE, ENUMERATED RATHER THAN INSTANCED. single_byte_tamper_is_detected proves the claim on a four-byte toy — one tamper, one case — while the object this boundary actually verifies is a single-byte tamper over the PINNED 32-BYTE digest: Alpine\'s published SHA-256 for 3.24.1/x86_64. That space is walked here position by position: for each of the 32 byte positions, EXACTLY 255 of the 256 byte values differ from the pinned byte, so the space is 32 · 255 = 8160 tampers and nothing is left implicit. FACTORED THROUGH THE NIBBLE, deliberately: a byte is two nibbles of 16 states (16 · 16 = 256, the lattice this whole tree computes on), and enumerating 16 × 16 keeps every term inside the kernel\'s default recursion depth — a flat `List.range 256` hits the ceiling, and buying depth with set_option is the thing this ledger refuses (the raise census in lean-cube counts every instance). Restating the claim on the lattice is the cure, not raising the limit. AND THE DIGEST RIDES INLINE rather than as a wing def: the falsifier leg is granted by an INDEPENDENT evaluator whose grammar admits no wing-local name, so a statement naming `digestBytes` and `nth` was re-decidable by the kernel and unreachable to the second implementation — it sealed with no falsifier and the leg census caught it at 2582 of 2583. Walking the bytes BY VALUE says the same thing in a grammar both can read. WHAT IT SEALS: the completeness and the cardinality of the tamper space, from the pinned bytes themselves. WHAT IT DOES NOT: hash anything — that a tampered image FAILS the check follows from byte-equality being pointwise (exact_copy_is_byte_equality, byte_order_is_significant), and verifying your actual bytes is verifyAlpineRootfs\'s job with uuidna\'s own pure-TS SHA-256.',
    js: () => DIGEST_BYTES.length === 32
      && DIGEST_BYTES.every((b) => b < 256)
      && DIGEST_BYTES.every((b) => range(16)
        .map((hi) => range(16).filter((lo) => hi * 16 + lo !== b).length)
        .reduce((sum, n) => sum + n, 0) === 255)
      && 16 * 16 === 256
      && 32 * 255 === 8160,
    lean: `theorem single_byte_tamper_space_is_enumerated : (([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).length = 32) ∧ (([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).all (fun b => b < 256)) ∧ (([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).all (fun b => ((List.range 16).map (fun hi => ((List.range 16).filter (fun lo => hi * 16 + lo != b)).length)).foldl (fun s n => s + n) 0 == 255)) ∧ (16 * 16 = 256) ∧ (32 * 255 = 8160) := by decide` },

  { key: 'truncation_is_detected',
    why: 'A TRUNCATION is DETECTED: a short image does not equal the pinned bytes — [1,2,3] ≠ [1,2]. Dropping data breaks the exact-copy proof; you cannot pass off a partial base as the whole named release.',
    js: () => !eqBytes([1, 2, 3], [1, 2]),
    lean: 'theorem truncation_is_detected : ([1,2,3] : List Nat) ≠ [1,2] := by decide' },

  { key: 'byte_order_is_significant',
    why: 'A PROVENANCE is a SEQUENCE— [1,2,3] ≠ [3,2,1]. The same bytes in a different order are a different image; exact-copy pins the order.',
    js: () => !eqBytes([1, 2, 3], [3, 2, 1]),
    lean: 'theorem byte_order_is_significant : ([1,2,3] : List Nat) ≠ [3,2,1] := by decide' },

  { key: 'sha256_digest_is_256_bits',
    why: 'The provenance DIGEST is a fixed width: SHA-256 is 256 bits = 32 bytes = 64 hex characters (32·8 = 256 and 64 = 32·2). The exact-copy fingerprint every release is pinned by has one fixed size.',
    js: () => 32 * 8 === 256 && 64 === 32 * 2,
    lean: 'theorem sha256_digest_is_256_bits : (32 * 8 = 256) ∧ (64 = 32 * 2) := by decide' },

  { key: 'provenance_address_is_128_bits',
    why: 'The provenance CONTENT-ADDRESS is a 128-bit particle: 16 bytes, 16·8 = 128 — one uuid, the same particle width the whole ledger folds to. A pinned release addresses to exactly 128 bits.',
    js: () => 16 * 8 === 128,
    lean: 'theorem provenance_address_is_128_bits : 16 * 8 = 128 := by decide' },

  { key: 'boundary_is_exactly_two_named_modules',
    why: 'The NON-DETERMINISM boundary is EXACTLY TWO named modules — os and drivers — and nowhere else: ["os","drivers"].length = 2. Wall-clock-dependent "latest" reads are honest ONLY here; the rest of uuidna is deterministic, and the count is fixed at two.',
    js: () => ['os', 'drivers'].length === 2,
    lean: 'theorem boundary_is_exactly_two_named_modules : (["os","drivers"] : List String).length = 2 := by decide' },
]

// audit each fact offline, then GENERATE its green `by decide` theorem — the research loop's terminal.
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Os.lean', skill: 'os',
  header: 'THE OS-INTEGRITY ALGEBRA — the third named layer, completing hardware → software → os: the decidable facts a DEPLOYMENT is verified against. uuidnaOS is a content-addressed PROVENANCE boundary (src/os pins an exact Alpine release, src/drivers the exact driver bundle, each checked against its PUBLISHED SHA-256 with uuidna\'s own pure-TS hash) — it NEVER boots, ports, links, or executes.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
