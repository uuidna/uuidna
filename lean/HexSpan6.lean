-- lean/HexSpan6.lean — GENERATED. THE FOUR-HEX SPAN, PART 6 — addresses 5000…5fff of 65536. Each surface decides two facts about ONE address, both computed by the kernel: the address reassembles from its own four nibbles, and its nibble sum is congruent to it modulo 15 (casting out fifteens, the base-16 analogue of casting out nines). The span is 2^16 because that is the square root of the 2^32 an eight-hex handle addresses — the BIRTHDAY POINT of this tree's identity scheme, the count at which two different contents begin sharing an address as often as not. Filling it populates the capacity with the objects the capacity exists for. The naming is taken from the axiom families rather than invented: every statement here classifies as ENUMERATION under familyOf, and the name is that family plus the address, so the address IS the identity and no two names can collide. Emitted in lane-sized files because a flat walk of this width exceeds Lean's recursion depth — 128 passes, 256 fails, measured — and one enormous file would hold a lane while the others idle. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def nibbles (n : Nat) : List Nat := (List.range 4).map (fun k => (n / (16 ^ k)) % 16)

def reassembles (n : Nat) : Bool := (nibbles n).foldr (fun d a => a * 16 + d) 0 == n

def castsFifteens (n : Nat) : Bool := ((nibbles n).foldl (fun a d => a + d) 0) % 15 == n % 15

/-- 5000: nibbles fold back to 20480; digit sum 5 ≡ 20480 (mod 15). -/
theorem enumeration_hex4_5000 : reassembles 20480 = true ∧ castsFifteens 20480 = true := by decide

/-- 5001: nibbles fold back to 20481; digit sum 6 ≡ 20481 (mod 15). -/
theorem enumeration_hex4_5001 : reassembles 20481 = true ∧ castsFifteens 20481 = true := by decide

/-- 5002: nibbles fold back to 20482; digit sum 7 ≡ 20482 (mod 15). -/
theorem enumeration_hex4_5002 : reassembles 20482 = true ∧ castsFifteens 20482 = true := by decide

/-- 5003: nibbles fold back to 20483; digit sum 8 ≡ 20483 (mod 15). -/
theorem enumeration_hex4_5003 : reassembles 20483 = true ∧ castsFifteens 20483 = true := by decide

/-- 5004: nibbles fold back to 20484; digit sum 9 ≡ 20484 (mod 15). -/
theorem enumeration_hex4_5004 : reassembles 20484 = true ∧ castsFifteens 20484 = true := by decide

/-- 5005: nibbles fold back to 20485; digit sum 10 ≡ 20485 (mod 15). -/
theorem enumeration_hex4_5005 : reassembles 20485 = true ∧ castsFifteens 20485 = true := by decide

/-- 5006: nibbles fold back to 20486; digit sum 11 ≡ 20486 (mod 15). -/
theorem enumeration_hex4_5006 : reassembles 20486 = true ∧ castsFifteens 20486 = true := by decide

/-- 5007: nibbles fold back to 20487; digit sum 12 ≡ 20487 (mod 15). -/
theorem enumeration_hex4_5007 : reassembles 20487 = true ∧ castsFifteens 20487 = true := by decide

/-- 5008: nibbles fold back to 20488; digit sum 13 ≡ 20488 (mod 15). -/
theorem enumeration_hex4_5008 : reassembles 20488 = true ∧ castsFifteens 20488 = true := by decide

/-- 5009: nibbles fold back to 20489; digit sum 14 ≡ 20489 (mod 15). -/
theorem enumeration_hex4_5009 : reassembles 20489 = true ∧ castsFifteens 20489 = true := by decide

/-- 500a: nibbles fold back to 20490; digit sum 15 ≡ 20490 (mod 15). -/
theorem enumeration_hex4_500a : reassembles 20490 = true ∧ castsFifteens 20490 = true := by decide

/-- 500b: nibbles fold back to 20491; digit sum 16 ≡ 20491 (mod 15). -/
theorem enumeration_hex4_500b : reassembles 20491 = true ∧ castsFifteens 20491 = true := by decide

/-- 500c: nibbles fold back to 20492; digit sum 17 ≡ 20492 (mod 15). -/
theorem enumeration_hex4_500c : reassembles 20492 = true ∧ castsFifteens 20492 = true := by decide

/-- 500d: nibbles fold back to 20493; digit sum 18 ≡ 20493 (mod 15). -/
theorem enumeration_hex4_500d : reassembles 20493 = true ∧ castsFifteens 20493 = true := by decide

/-- 500e: nibbles fold back to 20494; digit sum 19 ≡ 20494 (mod 15). -/
theorem enumeration_hex4_500e : reassembles 20494 = true ∧ castsFifteens 20494 = true := by decide

/-- 500f: nibbles fold back to 20495; digit sum 20 ≡ 20495 (mod 15). -/
theorem enumeration_hex4_500f : reassembles 20495 = true ∧ castsFifteens 20495 = true := by decide

/-- 5010: nibbles fold back to 20496; digit sum 6 ≡ 20496 (mod 15). -/
theorem enumeration_hex4_5010 : reassembles 20496 = true ∧ castsFifteens 20496 = true := by decide

/-- 5011: nibbles fold back to 20497; digit sum 7 ≡ 20497 (mod 15). -/
theorem enumeration_hex4_5011 : reassembles 20497 = true ∧ castsFifteens 20497 = true := by decide

/-- 5012: nibbles fold back to 20498; digit sum 8 ≡ 20498 (mod 15). -/
theorem enumeration_hex4_5012 : reassembles 20498 = true ∧ castsFifteens 20498 = true := by decide

/-- 5013: nibbles fold back to 20499; digit sum 9 ≡ 20499 (mod 15). -/
theorem enumeration_hex4_5013 : reassembles 20499 = true ∧ castsFifteens 20499 = true := by decide

/-- 5014: nibbles fold back to 20500; digit sum 10 ≡ 20500 (mod 15). -/
theorem enumeration_hex4_5014 : reassembles 20500 = true ∧ castsFifteens 20500 = true := by decide

/-- 5015: nibbles fold back to 20501; digit sum 11 ≡ 20501 (mod 15). -/
theorem enumeration_hex4_5015 : reassembles 20501 = true ∧ castsFifteens 20501 = true := by decide

/-- 5016: nibbles fold back to 20502; digit sum 12 ≡ 20502 (mod 15). -/
theorem enumeration_hex4_5016 : reassembles 20502 = true ∧ castsFifteens 20502 = true := by decide

/-- 5017: nibbles fold back to 20503; digit sum 13 ≡ 20503 (mod 15). -/
theorem enumeration_hex4_5017 : reassembles 20503 = true ∧ castsFifteens 20503 = true := by decide

/-- 5018: nibbles fold back to 20504; digit sum 14 ≡ 20504 (mod 15). -/
theorem enumeration_hex4_5018 : reassembles 20504 = true ∧ castsFifteens 20504 = true := by decide

/-- 5019: nibbles fold back to 20505; digit sum 15 ≡ 20505 (mod 15). -/
theorem enumeration_hex4_5019 : reassembles 20505 = true ∧ castsFifteens 20505 = true := by decide

/-- 501a: nibbles fold back to 20506; digit sum 16 ≡ 20506 (mod 15). -/
theorem enumeration_hex4_501a : reassembles 20506 = true ∧ castsFifteens 20506 = true := by decide

/-- 501b: nibbles fold back to 20507; digit sum 17 ≡ 20507 (mod 15). -/
theorem enumeration_hex4_501b : reassembles 20507 = true ∧ castsFifteens 20507 = true := by decide

/-- 501c: nibbles fold back to 20508; digit sum 18 ≡ 20508 (mod 15). -/
theorem enumeration_hex4_501c : reassembles 20508 = true ∧ castsFifteens 20508 = true := by decide

/-- 501d: nibbles fold back to 20509; digit sum 19 ≡ 20509 (mod 15). -/
theorem enumeration_hex4_501d : reassembles 20509 = true ∧ castsFifteens 20509 = true := by decide

/-- 501e: nibbles fold back to 20510; digit sum 20 ≡ 20510 (mod 15). -/
theorem enumeration_hex4_501e : reassembles 20510 = true ∧ castsFifteens 20510 = true := by decide

/-- 501f: nibbles fold back to 20511; digit sum 21 ≡ 20511 (mod 15). -/
theorem enumeration_hex4_501f : reassembles 20511 = true ∧ castsFifteens 20511 = true := by decide

/-- 5020: nibbles fold back to 20512; digit sum 7 ≡ 20512 (mod 15). -/
theorem enumeration_hex4_5020 : reassembles 20512 = true ∧ castsFifteens 20512 = true := by decide

/-- 5021: nibbles fold back to 20513; digit sum 8 ≡ 20513 (mod 15). -/
theorem enumeration_hex4_5021 : reassembles 20513 = true ∧ castsFifteens 20513 = true := by decide

/-- 5022: nibbles fold back to 20514; digit sum 9 ≡ 20514 (mod 15). -/
theorem enumeration_hex4_5022 : reassembles 20514 = true ∧ castsFifteens 20514 = true := by decide

/-- 5023: nibbles fold back to 20515; digit sum 10 ≡ 20515 (mod 15). -/
theorem enumeration_hex4_5023 : reassembles 20515 = true ∧ castsFifteens 20515 = true := by decide

/-- 5024: nibbles fold back to 20516; digit sum 11 ≡ 20516 (mod 15). -/
theorem enumeration_hex4_5024 : reassembles 20516 = true ∧ castsFifteens 20516 = true := by decide

/-- 5025: nibbles fold back to 20517; digit sum 12 ≡ 20517 (mod 15). -/
theorem enumeration_hex4_5025 : reassembles 20517 = true ∧ castsFifteens 20517 = true := by decide

/-- 5026: nibbles fold back to 20518; digit sum 13 ≡ 20518 (mod 15). -/
theorem enumeration_hex4_5026 : reassembles 20518 = true ∧ castsFifteens 20518 = true := by decide

/-- 5027: nibbles fold back to 20519; digit sum 14 ≡ 20519 (mod 15). -/
theorem enumeration_hex4_5027 : reassembles 20519 = true ∧ castsFifteens 20519 = true := by decide

/-- 5028: nibbles fold back to 20520; digit sum 15 ≡ 20520 (mod 15). -/
theorem enumeration_hex4_5028 : reassembles 20520 = true ∧ castsFifteens 20520 = true := by decide

/-- 5029: nibbles fold back to 20521; digit sum 16 ≡ 20521 (mod 15). -/
theorem enumeration_hex4_5029 : reassembles 20521 = true ∧ castsFifteens 20521 = true := by decide

/-- 502a: nibbles fold back to 20522; digit sum 17 ≡ 20522 (mod 15). -/
theorem enumeration_hex4_502a : reassembles 20522 = true ∧ castsFifteens 20522 = true := by decide

/-- 502b: nibbles fold back to 20523; digit sum 18 ≡ 20523 (mod 15). -/
theorem enumeration_hex4_502b : reassembles 20523 = true ∧ castsFifteens 20523 = true := by decide

/-- 502c: nibbles fold back to 20524; digit sum 19 ≡ 20524 (mod 15). -/
theorem enumeration_hex4_502c : reassembles 20524 = true ∧ castsFifteens 20524 = true := by decide

/-- 502d: nibbles fold back to 20525; digit sum 20 ≡ 20525 (mod 15). -/
theorem enumeration_hex4_502d : reassembles 20525 = true ∧ castsFifteens 20525 = true := by decide

/-- 502e: nibbles fold back to 20526; digit sum 21 ≡ 20526 (mod 15). -/
theorem enumeration_hex4_502e : reassembles 20526 = true ∧ castsFifteens 20526 = true := by decide

/-- 502f: nibbles fold back to 20527; digit sum 22 ≡ 20527 (mod 15). -/
theorem enumeration_hex4_502f : reassembles 20527 = true ∧ castsFifteens 20527 = true := by decide

/-- 5030: nibbles fold back to 20528; digit sum 8 ≡ 20528 (mod 15). -/
theorem enumeration_hex4_5030 : reassembles 20528 = true ∧ castsFifteens 20528 = true := by decide

/-- 5031: nibbles fold back to 20529; digit sum 9 ≡ 20529 (mod 15). -/
theorem enumeration_hex4_5031 : reassembles 20529 = true ∧ castsFifteens 20529 = true := by decide

/-- 5032: nibbles fold back to 20530; digit sum 10 ≡ 20530 (mod 15). -/
theorem enumeration_hex4_5032 : reassembles 20530 = true ∧ castsFifteens 20530 = true := by decide

/-- 5033: nibbles fold back to 20531; digit sum 11 ≡ 20531 (mod 15). -/
theorem enumeration_hex4_5033 : reassembles 20531 = true ∧ castsFifteens 20531 = true := by decide

/-- 5034: nibbles fold back to 20532; digit sum 12 ≡ 20532 (mod 15). -/
theorem enumeration_hex4_5034 : reassembles 20532 = true ∧ castsFifteens 20532 = true := by decide

/-- 5035: nibbles fold back to 20533; digit sum 13 ≡ 20533 (mod 15). -/
theorem enumeration_hex4_5035 : reassembles 20533 = true ∧ castsFifteens 20533 = true := by decide

/-- 5036: nibbles fold back to 20534; digit sum 14 ≡ 20534 (mod 15). -/
theorem enumeration_hex4_5036 : reassembles 20534 = true ∧ castsFifteens 20534 = true := by decide

/-- 5037: nibbles fold back to 20535; digit sum 15 ≡ 20535 (mod 15). -/
theorem enumeration_hex4_5037 : reassembles 20535 = true ∧ castsFifteens 20535 = true := by decide

/-- 5038: nibbles fold back to 20536; digit sum 16 ≡ 20536 (mod 15). -/
theorem enumeration_hex4_5038 : reassembles 20536 = true ∧ castsFifteens 20536 = true := by decide

/-- 5039: nibbles fold back to 20537; digit sum 17 ≡ 20537 (mod 15). -/
theorem enumeration_hex4_5039 : reassembles 20537 = true ∧ castsFifteens 20537 = true := by decide

/-- 503a: nibbles fold back to 20538; digit sum 18 ≡ 20538 (mod 15). -/
theorem enumeration_hex4_503a : reassembles 20538 = true ∧ castsFifteens 20538 = true := by decide

/-- 503b: nibbles fold back to 20539; digit sum 19 ≡ 20539 (mod 15). -/
theorem enumeration_hex4_503b : reassembles 20539 = true ∧ castsFifteens 20539 = true := by decide

/-- 503c: nibbles fold back to 20540; digit sum 20 ≡ 20540 (mod 15). -/
theorem enumeration_hex4_503c : reassembles 20540 = true ∧ castsFifteens 20540 = true := by decide

/-- 503d: nibbles fold back to 20541; digit sum 21 ≡ 20541 (mod 15). -/
theorem enumeration_hex4_503d : reassembles 20541 = true ∧ castsFifteens 20541 = true := by decide

/-- 503e: nibbles fold back to 20542; digit sum 22 ≡ 20542 (mod 15). -/
theorem enumeration_hex4_503e : reassembles 20542 = true ∧ castsFifteens 20542 = true := by decide

/-- 503f: nibbles fold back to 20543; digit sum 23 ≡ 20543 (mod 15). -/
theorem enumeration_hex4_503f : reassembles 20543 = true ∧ castsFifteens 20543 = true := by decide

/-- 5040: nibbles fold back to 20544; digit sum 9 ≡ 20544 (mod 15). -/
theorem enumeration_hex4_5040 : reassembles 20544 = true ∧ castsFifteens 20544 = true := by decide

/-- 5041: nibbles fold back to 20545; digit sum 10 ≡ 20545 (mod 15). -/
theorem enumeration_hex4_5041 : reassembles 20545 = true ∧ castsFifteens 20545 = true := by decide

/-- 5042: nibbles fold back to 20546; digit sum 11 ≡ 20546 (mod 15). -/
theorem enumeration_hex4_5042 : reassembles 20546 = true ∧ castsFifteens 20546 = true := by decide

/-- 5043: nibbles fold back to 20547; digit sum 12 ≡ 20547 (mod 15). -/
theorem enumeration_hex4_5043 : reassembles 20547 = true ∧ castsFifteens 20547 = true := by decide

/-- 5044: nibbles fold back to 20548; digit sum 13 ≡ 20548 (mod 15). -/
theorem enumeration_hex4_5044 : reassembles 20548 = true ∧ castsFifteens 20548 = true := by decide

/-- 5045: nibbles fold back to 20549; digit sum 14 ≡ 20549 (mod 15). -/
theorem enumeration_hex4_5045 : reassembles 20549 = true ∧ castsFifteens 20549 = true := by decide

/-- 5046: nibbles fold back to 20550; digit sum 15 ≡ 20550 (mod 15). -/
theorem enumeration_hex4_5046 : reassembles 20550 = true ∧ castsFifteens 20550 = true := by decide

/-- 5047: nibbles fold back to 20551; digit sum 16 ≡ 20551 (mod 15). -/
theorem enumeration_hex4_5047 : reassembles 20551 = true ∧ castsFifteens 20551 = true := by decide

/-- 5048: nibbles fold back to 20552; digit sum 17 ≡ 20552 (mod 15). -/
theorem enumeration_hex4_5048 : reassembles 20552 = true ∧ castsFifteens 20552 = true := by decide

/-- 5049: nibbles fold back to 20553; digit sum 18 ≡ 20553 (mod 15). -/
theorem enumeration_hex4_5049 : reassembles 20553 = true ∧ castsFifteens 20553 = true := by decide

/-- 504a: nibbles fold back to 20554; digit sum 19 ≡ 20554 (mod 15). -/
theorem enumeration_hex4_504a : reassembles 20554 = true ∧ castsFifteens 20554 = true := by decide

/-- 504b: nibbles fold back to 20555; digit sum 20 ≡ 20555 (mod 15). -/
theorem enumeration_hex4_504b : reassembles 20555 = true ∧ castsFifteens 20555 = true := by decide

/-- 504c: nibbles fold back to 20556; digit sum 21 ≡ 20556 (mod 15). -/
theorem enumeration_hex4_504c : reassembles 20556 = true ∧ castsFifteens 20556 = true := by decide

/-- 504d: nibbles fold back to 20557; digit sum 22 ≡ 20557 (mod 15). -/
theorem enumeration_hex4_504d : reassembles 20557 = true ∧ castsFifteens 20557 = true := by decide

/-- 504e: nibbles fold back to 20558; digit sum 23 ≡ 20558 (mod 15). -/
theorem enumeration_hex4_504e : reassembles 20558 = true ∧ castsFifteens 20558 = true := by decide

/-- 504f: nibbles fold back to 20559; digit sum 24 ≡ 20559 (mod 15). -/
theorem enumeration_hex4_504f : reassembles 20559 = true ∧ castsFifteens 20559 = true := by decide

/-- 5050: nibbles fold back to 20560; digit sum 10 ≡ 20560 (mod 15). -/
theorem enumeration_hex4_5050 : reassembles 20560 = true ∧ castsFifteens 20560 = true := by decide

/-- 5051: nibbles fold back to 20561; digit sum 11 ≡ 20561 (mod 15). -/
theorem enumeration_hex4_5051 : reassembles 20561 = true ∧ castsFifteens 20561 = true := by decide

/-- 5052: nibbles fold back to 20562; digit sum 12 ≡ 20562 (mod 15). -/
theorem enumeration_hex4_5052 : reassembles 20562 = true ∧ castsFifteens 20562 = true := by decide

/-- 5053: nibbles fold back to 20563; digit sum 13 ≡ 20563 (mod 15). -/
theorem enumeration_hex4_5053 : reassembles 20563 = true ∧ castsFifteens 20563 = true := by decide

/-- 5054: nibbles fold back to 20564; digit sum 14 ≡ 20564 (mod 15). -/
theorem enumeration_hex4_5054 : reassembles 20564 = true ∧ castsFifteens 20564 = true := by decide

/-- 5055: nibbles fold back to 20565; digit sum 15 ≡ 20565 (mod 15). -/
theorem enumeration_hex4_5055 : reassembles 20565 = true ∧ castsFifteens 20565 = true := by decide

/-- 5056: nibbles fold back to 20566; digit sum 16 ≡ 20566 (mod 15). -/
theorem enumeration_hex4_5056 : reassembles 20566 = true ∧ castsFifteens 20566 = true := by decide

/-- 5057: nibbles fold back to 20567; digit sum 17 ≡ 20567 (mod 15). -/
theorem enumeration_hex4_5057 : reassembles 20567 = true ∧ castsFifteens 20567 = true := by decide

/-- 5058: nibbles fold back to 20568; digit sum 18 ≡ 20568 (mod 15). -/
theorem enumeration_hex4_5058 : reassembles 20568 = true ∧ castsFifteens 20568 = true := by decide

/-- 5059: nibbles fold back to 20569; digit sum 19 ≡ 20569 (mod 15). -/
theorem enumeration_hex4_5059 : reassembles 20569 = true ∧ castsFifteens 20569 = true := by decide

/-- 505a: nibbles fold back to 20570; digit sum 20 ≡ 20570 (mod 15). -/
theorem enumeration_hex4_505a : reassembles 20570 = true ∧ castsFifteens 20570 = true := by decide

/-- 505b: nibbles fold back to 20571; digit sum 21 ≡ 20571 (mod 15). -/
theorem enumeration_hex4_505b : reassembles 20571 = true ∧ castsFifteens 20571 = true := by decide

/-- 505c: nibbles fold back to 20572; digit sum 22 ≡ 20572 (mod 15). -/
theorem enumeration_hex4_505c : reassembles 20572 = true ∧ castsFifteens 20572 = true := by decide

/-- 505d: nibbles fold back to 20573; digit sum 23 ≡ 20573 (mod 15). -/
theorem enumeration_hex4_505d : reassembles 20573 = true ∧ castsFifteens 20573 = true := by decide

/-- 505e: nibbles fold back to 20574; digit sum 24 ≡ 20574 (mod 15). -/
theorem enumeration_hex4_505e : reassembles 20574 = true ∧ castsFifteens 20574 = true := by decide

/-- 505f: nibbles fold back to 20575; digit sum 25 ≡ 20575 (mod 15). -/
theorem enumeration_hex4_505f : reassembles 20575 = true ∧ castsFifteens 20575 = true := by decide

/-- 5060: nibbles fold back to 20576; digit sum 11 ≡ 20576 (mod 15). -/
theorem enumeration_hex4_5060 : reassembles 20576 = true ∧ castsFifteens 20576 = true := by decide

/-- 5061: nibbles fold back to 20577; digit sum 12 ≡ 20577 (mod 15). -/
theorem enumeration_hex4_5061 : reassembles 20577 = true ∧ castsFifteens 20577 = true := by decide

/-- 5062: nibbles fold back to 20578; digit sum 13 ≡ 20578 (mod 15). -/
theorem enumeration_hex4_5062 : reassembles 20578 = true ∧ castsFifteens 20578 = true := by decide

/-- 5063: nibbles fold back to 20579; digit sum 14 ≡ 20579 (mod 15). -/
theorem enumeration_hex4_5063 : reassembles 20579 = true ∧ castsFifteens 20579 = true := by decide

/-- 5064: nibbles fold back to 20580; digit sum 15 ≡ 20580 (mod 15). -/
theorem enumeration_hex4_5064 : reassembles 20580 = true ∧ castsFifteens 20580 = true := by decide

/-- 5065: nibbles fold back to 20581; digit sum 16 ≡ 20581 (mod 15). -/
theorem enumeration_hex4_5065 : reassembles 20581 = true ∧ castsFifteens 20581 = true := by decide

/-- 5066: nibbles fold back to 20582; digit sum 17 ≡ 20582 (mod 15). -/
theorem enumeration_hex4_5066 : reassembles 20582 = true ∧ castsFifteens 20582 = true := by decide

/-- 5067: nibbles fold back to 20583; digit sum 18 ≡ 20583 (mod 15). -/
theorem enumeration_hex4_5067 : reassembles 20583 = true ∧ castsFifteens 20583 = true := by decide

/-- 5068: nibbles fold back to 20584; digit sum 19 ≡ 20584 (mod 15). -/
theorem enumeration_hex4_5068 : reassembles 20584 = true ∧ castsFifteens 20584 = true := by decide

/-- 5069: nibbles fold back to 20585; digit sum 20 ≡ 20585 (mod 15). -/
theorem enumeration_hex4_5069 : reassembles 20585 = true ∧ castsFifteens 20585 = true := by decide

/-- 506a: nibbles fold back to 20586; digit sum 21 ≡ 20586 (mod 15). -/
theorem enumeration_hex4_506a : reassembles 20586 = true ∧ castsFifteens 20586 = true := by decide

/-- 506b: nibbles fold back to 20587; digit sum 22 ≡ 20587 (mod 15). -/
theorem enumeration_hex4_506b : reassembles 20587 = true ∧ castsFifteens 20587 = true := by decide

/-- 506c: nibbles fold back to 20588; digit sum 23 ≡ 20588 (mod 15). -/
theorem enumeration_hex4_506c : reassembles 20588 = true ∧ castsFifteens 20588 = true := by decide

/-- 506d: nibbles fold back to 20589; digit sum 24 ≡ 20589 (mod 15). -/
theorem enumeration_hex4_506d : reassembles 20589 = true ∧ castsFifteens 20589 = true := by decide

/-- 506e: nibbles fold back to 20590; digit sum 25 ≡ 20590 (mod 15). -/
theorem enumeration_hex4_506e : reassembles 20590 = true ∧ castsFifteens 20590 = true := by decide

/-- 506f: nibbles fold back to 20591; digit sum 26 ≡ 20591 (mod 15). -/
theorem enumeration_hex4_506f : reassembles 20591 = true ∧ castsFifteens 20591 = true := by decide

/-- 5070: nibbles fold back to 20592; digit sum 12 ≡ 20592 (mod 15). -/
theorem enumeration_hex4_5070 : reassembles 20592 = true ∧ castsFifteens 20592 = true := by decide

/-- 5071: nibbles fold back to 20593; digit sum 13 ≡ 20593 (mod 15). -/
theorem enumeration_hex4_5071 : reassembles 20593 = true ∧ castsFifteens 20593 = true := by decide

/-- 5072: nibbles fold back to 20594; digit sum 14 ≡ 20594 (mod 15). -/
theorem enumeration_hex4_5072 : reassembles 20594 = true ∧ castsFifteens 20594 = true := by decide

/-- 5073: nibbles fold back to 20595; digit sum 15 ≡ 20595 (mod 15). -/
theorem enumeration_hex4_5073 : reassembles 20595 = true ∧ castsFifteens 20595 = true := by decide

/-- 5074: nibbles fold back to 20596; digit sum 16 ≡ 20596 (mod 15). -/
theorem enumeration_hex4_5074 : reassembles 20596 = true ∧ castsFifteens 20596 = true := by decide

/-- 5075: nibbles fold back to 20597; digit sum 17 ≡ 20597 (mod 15). -/
theorem enumeration_hex4_5075 : reassembles 20597 = true ∧ castsFifteens 20597 = true := by decide

/-- 5076: nibbles fold back to 20598; digit sum 18 ≡ 20598 (mod 15). -/
theorem enumeration_hex4_5076 : reassembles 20598 = true ∧ castsFifteens 20598 = true := by decide

/-- 5077: nibbles fold back to 20599; digit sum 19 ≡ 20599 (mod 15). -/
theorem enumeration_hex4_5077 : reassembles 20599 = true ∧ castsFifteens 20599 = true := by decide

/-- 5078: nibbles fold back to 20600; digit sum 20 ≡ 20600 (mod 15). -/
theorem enumeration_hex4_5078 : reassembles 20600 = true ∧ castsFifteens 20600 = true := by decide

/-- 5079: nibbles fold back to 20601; digit sum 21 ≡ 20601 (mod 15). -/
theorem enumeration_hex4_5079 : reassembles 20601 = true ∧ castsFifteens 20601 = true := by decide

/-- 507a: nibbles fold back to 20602; digit sum 22 ≡ 20602 (mod 15). -/
theorem enumeration_hex4_507a : reassembles 20602 = true ∧ castsFifteens 20602 = true := by decide

/-- 507b: nibbles fold back to 20603; digit sum 23 ≡ 20603 (mod 15). -/
theorem enumeration_hex4_507b : reassembles 20603 = true ∧ castsFifteens 20603 = true := by decide

/-- 507c: nibbles fold back to 20604; digit sum 24 ≡ 20604 (mod 15). -/
theorem enumeration_hex4_507c : reassembles 20604 = true ∧ castsFifteens 20604 = true := by decide

/-- 507d: nibbles fold back to 20605; digit sum 25 ≡ 20605 (mod 15). -/
theorem enumeration_hex4_507d : reassembles 20605 = true ∧ castsFifteens 20605 = true := by decide

/-- 507e: nibbles fold back to 20606; digit sum 26 ≡ 20606 (mod 15). -/
theorem enumeration_hex4_507e : reassembles 20606 = true ∧ castsFifteens 20606 = true := by decide

/-- 507f: nibbles fold back to 20607; digit sum 27 ≡ 20607 (mod 15). -/
theorem enumeration_hex4_507f : reassembles 20607 = true ∧ castsFifteens 20607 = true := by decide

/-- 5080: nibbles fold back to 20608; digit sum 13 ≡ 20608 (mod 15). -/
theorem enumeration_hex4_5080 : reassembles 20608 = true ∧ castsFifteens 20608 = true := by decide

/-- 5081: nibbles fold back to 20609; digit sum 14 ≡ 20609 (mod 15). -/
theorem enumeration_hex4_5081 : reassembles 20609 = true ∧ castsFifteens 20609 = true := by decide

/-- 5082: nibbles fold back to 20610; digit sum 15 ≡ 20610 (mod 15). -/
theorem enumeration_hex4_5082 : reassembles 20610 = true ∧ castsFifteens 20610 = true := by decide

/-- 5083: nibbles fold back to 20611; digit sum 16 ≡ 20611 (mod 15). -/
theorem enumeration_hex4_5083 : reassembles 20611 = true ∧ castsFifteens 20611 = true := by decide

/-- 5084: nibbles fold back to 20612; digit sum 17 ≡ 20612 (mod 15). -/
theorem enumeration_hex4_5084 : reassembles 20612 = true ∧ castsFifteens 20612 = true := by decide

/-- 5085: nibbles fold back to 20613; digit sum 18 ≡ 20613 (mod 15). -/
theorem enumeration_hex4_5085 : reassembles 20613 = true ∧ castsFifteens 20613 = true := by decide

/-- 5086: nibbles fold back to 20614; digit sum 19 ≡ 20614 (mod 15). -/
theorem enumeration_hex4_5086 : reassembles 20614 = true ∧ castsFifteens 20614 = true := by decide

/-- 5087: nibbles fold back to 20615; digit sum 20 ≡ 20615 (mod 15). -/
theorem enumeration_hex4_5087 : reassembles 20615 = true ∧ castsFifteens 20615 = true := by decide

/-- 5088: nibbles fold back to 20616; digit sum 21 ≡ 20616 (mod 15). -/
theorem enumeration_hex4_5088 : reassembles 20616 = true ∧ castsFifteens 20616 = true := by decide

/-- 5089: nibbles fold back to 20617; digit sum 22 ≡ 20617 (mod 15). -/
theorem enumeration_hex4_5089 : reassembles 20617 = true ∧ castsFifteens 20617 = true := by decide

/-- 508a: nibbles fold back to 20618; digit sum 23 ≡ 20618 (mod 15). -/
theorem enumeration_hex4_508a : reassembles 20618 = true ∧ castsFifteens 20618 = true := by decide

/-- 508b: nibbles fold back to 20619; digit sum 24 ≡ 20619 (mod 15). -/
theorem enumeration_hex4_508b : reassembles 20619 = true ∧ castsFifteens 20619 = true := by decide

/-- 508c: nibbles fold back to 20620; digit sum 25 ≡ 20620 (mod 15). -/
theorem enumeration_hex4_508c : reassembles 20620 = true ∧ castsFifteens 20620 = true := by decide

/-- 508d: nibbles fold back to 20621; digit sum 26 ≡ 20621 (mod 15). -/
theorem enumeration_hex4_508d : reassembles 20621 = true ∧ castsFifteens 20621 = true := by decide

/-- 508e: nibbles fold back to 20622; digit sum 27 ≡ 20622 (mod 15). -/
theorem enumeration_hex4_508e : reassembles 20622 = true ∧ castsFifteens 20622 = true := by decide

/-- 508f: nibbles fold back to 20623; digit sum 28 ≡ 20623 (mod 15). -/
theorem enumeration_hex4_508f : reassembles 20623 = true ∧ castsFifteens 20623 = true := by decide

/-- 5090: nibbles fold back to 20624; digit sum 14 ≡ 20624 (mod 15). -/
theorem enumeration_hex4_5090 : reassembles 20624 = true ∧ castsFifteens 20624 = true := by decide

/-- 5091: nibbles fold back to 20625; digit sum 15 ≡ 20625 (mod 15). -/
theorem enumeration_hex4_5091 : reassembles 20625 = true ∧ castsFifteens 20625 = true := by decide

/-- 5092: nibbles fold back to 20626; digit sum 16 ≡ 20626 (mod 15). -/
theorem enumeration_hex4_5092 : reassembles 20626 = true ∧ castsFifteens 20626 = true := by decide

/-- 5093: nibbles fold back to 20627; digit sum 17 ≡ 20627 (mod 15). -/
theorem enumeration_hex4_5093 : reassembles 20627 = true ∧ castsFifteens 20627 = true := by decide

/-- 5094: nibbles fold back to 20628; digit sum 18 ≡ 20628 (mod 15). -/
theorem enumeration_hex4_5094 : reassembles 20628 = true ∧ castsFifteens 20628 = true := by decide

/-- 5095: nibbles fold back to 20629; digit sum 19 ≡ 20629 (mod 15). -/
theorem enumeration_hex4_5095 : reassembles 20629 = true ∧ castsFifteens 20629 = true := by decide

/-- 5096: nibbles fold back to 20630; digit sum 20 ≡ 20630 (mod 15). -/
theorem enumeration_hex4_5096 : reassembles 20630 = true ∧ castsFifteens 20630 = true := by decide

/-- 5097: nibbles fold back to 20631; digit sum 21 ≡ 20631 (mod 15). -/
theorem enumeration_hex4_5097 : reassembles 20631 = true ∧ castsFifteens 20631 = true := by decide

/-- 5098: nibbles fold back to 20632; digit sum 22 ≡ 20632 (mod 15). -/
theorem enumeration_hex4_5098 : reassembles 20632 = true ∧ castsFifteens 20632 = true := by decide

/-- 5099: nibbles fold back to 20633; digit sum 23 ≡ 20633 (mod 15). -/
theorem enumeration_hex4_5099 : reassembles 20633 = true ∧ castsFifteens 20633 = true := by decide

/-- 509a: nibbles fold back to 20634; digit sum 24 ≡ 20634 (mod 15). -/
theorem enumeration_hex4_509a : reassembles 20634 = true ∧ castsFifteens 20634 = true := by decide

/-- 509b: nibbles fold back to 20635; digit sum 25 ≡ 20635 (mod 15). -/
theorem enumeration_hex4_509b : reassembles 20635 = true ∧ castsFifteens 20635 = true := by decide

/-- 509c: nibbles fold back to 20636; digit sum 26 ≡ 20636 (mod 15). -/
theorem enumeration_hex4_509c : reassembles 20636 = true ∧ castsFifteens 20636 = true := by decide

/-- 509d: nibbles fold back to 20637; digit sum 27 ≡ 20637 (mod 15). -/
theorem enumeration_hex4_509d : reassembles 20637 = true ∧ castsFifteens 20637 = true := by decide

/-- 509e: nibbles fold back to 20638; digit sum 28 ≡ 20638 (mod 15). -/
theorem enumeration_hex4_509e : reassembles 20638 = true ∧ castsFifteens 20638 = true := by decide

/-- 509f: nibbles fold back to 20639; digit sum 29 ≡ 20639 (mod 15). -/
theorem enumeration_hex4_509f : reassembles 20639 = true ∧ castsFifteens 20639 = true := by decide

/-- 50a0: nibbles fold back to 20640; digit sum 15 ≡ 20640 (mod 15). -/
theorem enumeration_hex4_50a0 : reassembles 20640 = true ∧ castsFifteens 20640 = true := by decide

/-- 50a1: nibbles fold back to 20641; digit sum 16 ≡ 20641 (mod 15). -/
theorem enumeration_hex4_50a1 : reassembles 20641 = true ∧ castsFifteens 20641 = true := by decide

/-- 50a2: nibbles fold back to 20642; digit sum 17 ≡ 20642 (mod 15). -/
theorem enumeration_hex4_50a2 : reassembles 20642 = true ∧ castsFifteens 20642 = true := by decide

/-- 50a3: nibbles fold back to 20643; digit sum 18 ≡ 20643 (mod 15). -/
theorem enumeration_hex4_50a3 : reassembles 20643 = true ∧ castsFifteens 20643 = true := by decide

/-- 50a4: nibbles fold back to 20644; digit sum 19 ≡ 20644 (mod 15). -/
theorem enumeration_hex4_50a4 : reassembles 20644 = true ∧ castsFifteens 20644 = true := by decide

/-- 50a5: nibbles fold back to 20645; digit sum 20 ≡ 20645 (mod 15). -/
theorem enumeration_hex4_50a5 : reassembles 20645 = true ∧ castsFifteens 20645 = true := by decide

/-- 50a6: nibbles fold back to 20646; digit sum 21 ≡ 20646 (mod 15). -/
theorem enumeration_hex4_50a6 : reassembles 20646 = true ∧ castsFifteens 20646 = true := by decide

/-- 50a7: nibbles fold back to 20647; digit sum 22 ≡ 20647 (mod 15). -/
theorem enumeration_hex4_50a7 : reassembles 20647 = true ∧ castsFifteens 20647 = true := by decide

/-- 50a8: nibbles fold back to 20648; digit sum 23 ≡ 20648 (mod 15). -/
theorem enumeration_hex4_50a8 : reassembles 20648 = true ∧ castsFifteens 20648 = true := by decide

/-- 50a9: nibbles fold back to 20649; digit sum 24 ≡ 20649 (mod 15). -/
theorem enumeration_hex4_50a9 : reassembles 20649 = true ∧ castsFifteens 20649 = true := by decide

/-- 50aa: nibbles fold back to 20650; digit sum 25 ≡ 20650 (mod 15). -/
theorem enumeration_hex4_50aa : reassembles 20650 = true ∧ castsFifteens 20650 = true := by decide

/-- 50ab: nibbles fold back to 20651; digit sum 26 ≡ 20651 (mod 15). -/
theorem enumeration_hex4_50ab : reassembles 20651 = true ∧ castsFifteens 20651 = true := by decide

/-- 50ac: nibbles fold back to 20652; digit sum 27 ≡ 20652 (mod 15). -/
theorem enumeration_hex4_50ac : reassembles 20652 = true ∧ castsFifteens 20652 = true := by decide

/-- 50ad: nibbles fold back to 20653; digit sum 28 ≡ 20653 (mod 15). -/
theorem enumeration_hex4_50ad : reassembles 20653 = true ∧ castsFifteens 20653 = true := by decide

/-- 50ae: nibbles fold back to 20654; digit sum 29 ≡ 20654 (mod 15). -/
theorem enumeration_hex4_50ae : reassembles 20654 = true ∧ castsFifteens 20654 = true := by decide

/-- 50af: nibbles fold back to 20655; digit sum 30 ≡ 20655 (mod 15). -/
theorem enumeration_hex4_50af : reassembles 20655 = true ∧ castsFifteens 20655 = true := by decide

/-- 50b0: nibbles fold back to 20656; digit sum 16 ≡ 20656 (mod 15). -/
theorem enumeration_hex4_50b0 : reassembles 20656 = true ∧ castsFifteens 20656 = true := by decide

/-- 50b1: nibbles fold back to 20657; digit sum 17 ≡ 20657 (mod 15). -/
theorem enumeration_hex4_50b1 : reassembles 20657 = true ∧ castsFifteens 20657 = true := by decide

/-- 50b2: nibbles fold back to 20658; digit sum 18 ≡ 20658 (mod 15). -/
theorem enumeration_hex4_50b2 : reassembles 20658 = true ∧ castsFifteens 20658 = true := by decide

/-- 50b3: nibbles fold back to 20659; digit sum 19 ≡ 20659 (mod 15). -/
theorem enumeration_hex4_50b3 : reassembles 20659 = true ∧ castsFifteens 20659 = true := by decide

/-- 50b4: nibbles fold back to 20660; digit sum 20 ≡ 20660 (mod 15). -/
theorem enumeration_hex4_50b4 : reassembles 20660 = true ∧ castsFifteens 20660 = true := by decide

/-- 50b5: nibbles fold back to 20661; digit sum 21 ≡ 20661 (mod 15). -/
theorem enumeration_hex4_50b5 : reassembles 20661 = true ∧ castsFifteens 20661 = true := by decide

/-- 50b6: nibbles fold back to 20662; digit sum 22 ≡ 20662 (mod 15). -/
theorem enumeration_hex4_50b6 : reassembles 20662 = true ∧ castsFifteens 20662 = true := by decide

/-- 50b7: nibbles fold back to 20663; digit sum 23 ≡ 20663 (mod 15). -/
theorem enumeration_hex4_50b7 : reassembles 20663 = true ∧ castsFifteens 20663 = true := by decide

/-- 50b8: nibbles fold back to 20664; digit sum 24 ≡ 20664 (mod 15). -/
theorem enumeration_hex4_50b8 : reassembles 20664 = true ∧ castsFifteens 20664 = true := by decide

/-- 50b9: nibbles fold back to 20665; digit sum 25 ≡ 20665 (mod 15). -/
theorem enumeration_hex4_50b9 : reassembles 20665 = true ∧ castsFifteens 20665 = true := by decide

/-- 50ba: nibbles fold back to 20666; digit sum 26 ≡ 20666 (mod 15). -/
theorem enumeration_hex4_50ba : reassembles 20666 = true ∧ castsFifteens 20666 = true := by decide

/-- 50bb: nibbles fold back to 20667; digit sum 27 ≡ 20667 (mod 15). -/
theorem enumeration_hex4_50bb : reassembles 20667 = true ∧ castsFifteens 20667 = true := by decide

/-- 50bc: nibbles fold back to 20668; digit sum 28 ≡ 20668 (mod 15). -/
theorem enumeration_hex4_50bc : reassembles 20668 = true ∧ castsFifteens 20668 = true := by decide

/-- 50bd: nibbles fold back to 20669; digit sum 29 ≡ 20669 (mod 15). -/
theorem enumeration_hex4_50bd : reassembles 20669 = true ∧ castsFifteens 20669 = true := by decide

/-- 50be: nibbles fold back to 20670; digit sum 30 ≡ 20670 (mod 15). -/
theorem enumeration_hex4_50be : reassembles 20670 = true ∧ castsFifteens 20670 = true := by decide

/-- 50bf: nibbles fold back to 20671; digit sum 31 ≡ 20671 (mod 15). -/
theorem enumeration_hex4_50bf : reassembles 20671 = true ∧ castsFifteens 20671 = true := by decide

/-- 50c0: nibbles fold back to 20672; digit sum 17 ≡ 20672 (mod 15). -/
theorem enumeration_hex4_50c0 : reassembles 20672 = true ∧ castsFifteens 20672 = true := by decide

/-- 50c1: nibbles fold back to 20673; digit sum 18 ≡ 20673 (mod 15). -/
theorem enumeration_hex4_50c1 : reassembles 20673 = true ∧ castsFifteens 20673 = true := by decide

/-- 50c2: nibbles fold back to 20674; digit sum 19 ≡ 20674 (mod 15). -/
theorem enumeration_hex4_50c2 : reassembles 20674 = true ∧ castsFifteens 20674 = true := by decide

/-- 50c3: nibbles fold back to 20675; digit sum 20 ≡ 20675 (mod 15). -/
theorem enumeration_hex4_50c3 : reassembles 20675 = true ∧ castsFifteens 20675 = true := by decide

/-- 50c4: nibbles fold back to 20676; digit sum 21 ≡ 20676 (mod 15). -/
theorem enumeration_hex4_50c4 : reassembles 20676 = true ∧ castsFifteens 20676 = true := by decide

/-- 50c5: nibbles fold back to 20677; digit sum 22 ≡ 20677 (mod 15). -/
theorem enumeration_hex4_50c5 : reassembles 20677 = true ∧ castsFifteens 20677 = true := by decide

/-- 50c6: nibbles fold back to 20678; digit sum 23 ≡ 20678 (mod 15). -/
theorem enumeration_hex4_50c6 : reassembles 20678 = true ∧ castsFifteens 20678 = true := by decide

/-- 50c7: nibbles fold back to 20679; digit sum 24 ≡ 20679 (mod 15). -/
theorem enumeration_hex4_50c7 : reassembles 20679 = true ∧ castsFifteens 20679 = true := by decide

/-- 50c8: nibbles fold back to 20680; digit sum 25 ≡ 20680 (mod 15). -/
theorem enumeration_hex4_50c8 : reassembles 20680 = true ∧ castsFifteens 20680 = true := by decide

/-- 50c9: nibbles fold back to 20681; digit sum 26 ≡ 20681 (mod 15). -/
theorem enumeration_hex4_50c9 : reassembles 20681 = true ∧ castsFifteens 20681 = true := by decide

/-- 50ca: nibbles fold back to 20682; digit sum 27 ≡ 20682 (mod 15). -/
theorem enumeration_hex4_50ca : reassembles 20682 = true ∧ castsFifteens 20682 = true := by decide

/-- 50cb: nibbles fold back to 20683; digit sum 28 ≡ 20683 (mod 15). -/
theorem enumeration_hex4_50cb : reassembles 20683 = true ∧ castsFifteens 20683 = true := by decide

/-- 50cc: nibbles fold back to 20684; digit sum 29 ≡ 20684 (mod 15). -/
theorem enumeration_hex4_50cc : reassembles 20684 = true ∧ castsFifteens 20684 = true := by decide

/-- 50cd: nibbles fold back to 20685; digit sum 30 ≡ 20685 (mod 15). -/
theorem enumeration_hex4_50cd : reassembles 20685 = true ∧ castsFifteens 20685 = true := by decide

/-- 50ce: nibbles fold back to 20686; digit sum 31 ≡ 20686 (mod 15). -/
theorem enumeration_hex4_50ce : reassembles 20686 = true ∧ castsFifteens 20686 = true := by decide

/-- 50cf: nibbles fold back to 20687; digit sum 32 ≡ 20687 (mod 15). -/
theorem enumeration_hex4_50cf : reassembles 20687 = true ∧ castsFifteens 20687 = true := by decide

/-- 50d0: nibbles fold back to 20688; digit sum 18 ≡ 20688 (mod 15). -/
theorem enumeration_hex4_50d0 : reassembles 20688 = true ∧ castsFifteens 20688 = true := by decide

/-- 50d1: nibbles fold back to 20689; digit sum 19 ≡ 20689 (mod 15). -/
theorem enumeration_hex4_50d1 : reassembles 20689 = true ∧ castsFifteens 20689 = true := by decide

/-- 50d2: nibbles fold back to 20690; digit sum 20 ≡ 20690 (mod 15). -/
theorem enumeration_hex4_50d2 : reassembles 20690 = true ∧ castsFifteens 20690 = true := by decide

/-- 50d3: nibbles fold back to 20691; digit sum 21 ≡ 20691 (mod 15). -/
theorem enumeration_hex4_50d3 : reassembles 20691 = true ∧ castsFifteens 20691 = true := by decide

/-- 50d4: nibbles fold back to 20692; digit sum 22 ≡ 20692 (mod 15). -/
theorem enumeration_hex4_50d4 : reassembles 20692 = true ∧ castsFifteens 20692 = true := by decide

/-- 50d5: nibbles fold back to 20693; digit sum 23 ≡ 20693 (mod 15). -/
theorem enumeration_hex4_50d5 : reassembles 20693 = true ∧ castsFifteens 20693 = true := by decide

/-- 50d6: nibbles fold back to 20694; digit sum 24 ≡ 20694 (mod 15). -/
theorem enumeration_hex4_50d6 : reassembles 20694 = true ∧ castsFifteens 20694 = true := by decide

/-- 50d7: nibbles fold back to 20695; digit sum 25 ≡ 20695 (mod 15). -/
theorem enumeration_hex4_50d7 : reassembles 20695 = true ∧ castsFifteens 20695 = true := by decide

/-- 50d8: nibbles fold back to 20696; digit sum 26 ≡ 20696 (mod 15). -/
theorem enumeration_hex4_50d8 : reassembles 20696 = true ∧ castsFifteens 20696 = true := by decide

/-- 50d9: nibbles fold back to 20697; digit sum 27 ≡ 20697 (mod 15). -/
theorem enumeration_hex4_50d9 : reassembles 20697 = true ∧ castsFifteens 20697 = true := by decide

/-- 50da: nibbles fold back to 20698; digit sum 28 ≡ 20698 (mod 15). -/
theorem enumeration_hex4_50da : reassembles 20698 = true ∧ castsFifteens 20698 = true := by decide

/-- 50db: nibbles fold back to 20699; digit sum 29 ≡ 20699 (mod 15). -/
theorem enumeration_hex4_50db : reassembles 20699 = true ∧ castsFifteens 20699 = true := by decide

/-- 50dc: nibbles fold back to 20700; digit sum 30 ≡ 20700 (mod 15). -/
theorem enumeration_hex4_50dc : reassembles 20700 = true ∧ castsFifteens 20700 = true := by decide

/-- 50dd: nibbles fold back to 20701; digit sum 31 ≡ 20701 (mod 15). -/
theorem enumeration_hex4_50dd : reassembles 20701 = true ∧ castsFifteens 20701 = true := by decide

/-- 50de: nibbles fold back to 20702; digit sum 32 ≡ 20702 (mod 15). -/
theorem enumeration_hex4_50de : reassembles 20702 = true ∧ castsFifteens 20702 = true := by decide

/-- 50df: nibbles fold back to 20703; digit sum 33 ≡ 20703 (mod 15). -/
theorem enumeration_hex4_50df : reassembles 20703 = true ∧ castsFifteens 20703 = true := by decide

/-- 50e0: nibbles fold back to 20704; digit sum 19 ≡ 20704 (mod 15). -/
theorem enumeration_hex4_50e0 : reassembles 20704 = true ∧ castsFifteens 20704 = true := by decide

/-- 50e1: nibbles fold back to 20705; digit sum 20 ≡ 20705 (mod 15). -/
theorem enumeration_hex4_50e1 : reassembles 20705 = true ∧ castsFifteens 20705 = true := by decide

/-- 50e2: nibbles fold back to 20706; digit sum 21 ≡ 20706 (mod 15). -/
theorem enumeration_hex4_50e2 : reassembles 20706 = true ∧ castsFifteens 20706 = true := by decide

/-- 50e3: nibbles fold back to 20707; digit sum 22 ≡ 20707 (mod 15). -/
theorem enumeration_hex4_50e3 : reassembles 20707 = true ∧ castsFifteens 20707 = true := by decide

/-- 50e4: nibbles fold back to 20708; digit sum 23 ≡ 20708 (mod 15). -/
theorem enumeration_hex4_50e4 : reassembles 20708 = true ∧ castsFifteens 20708 = true := by decide

/-- 50e5: nibbles fold back to 20709; digit sum 24 ≡ 20709 (mod 15). -/
theorem enumeration_hex4_50e5 : reassembles 20709 = true ∧ castsFifteens 20709 = true := by decide

/-- 50e6: nibbles fold back to 20710; digit sum 25 ≡ 20710 (mod 15). -/
theorem enumeration_hex4_50e6 : reassembles 20710 = true ∧ castsFifteens 20710 = true := by decide

/-- 50e7: nibbles fold back to 20711; digit sum 26 ≡ 20711 (mod 15). -/
theorem enumeration_hex4_50e7 : reassembles 20711 = true ∧ castsFifteens 20711 = true := by decide

/-- 50e8: nibbles fold back to 20712; digit sum 27 ≡ 20712 (mod 15). -/
theorem enumeration_hex4_50e8 : reassembles 20712 = true ∧ castsFifteens 20712 = true := by decide

/-- 50e9: nibbles fold back to 20713; digit sum 28 ≡ 20713 (mod 15). -/
theorem enumeration_hex4_50e9 : reassembles 20713 = true ∧ castsFifteens 20713 = true := by decide

/-- 50ea: nibbles fold back to 20714; digit sum 29 ≡ 20714 (mod 15). -/
theorem enumeration_hex4_50ea : reassembles 20714 = true ∧ castsFifteens 20714 = true := by decide

/-- 50eb: nibbles fold back to 20715; digit sum 30 ≡ 20715 (mod 15). -/
theorem enumeration_hex4_50eb : reassembles 20715 = true ∧ castsFifteens 20715 = true := by decide

/-- 50ec: nibbles fold back to 20716; digit sum 31 ≡ 20716 (mod 15). -/
theorem enumeration_hex4_50ec : reassembles 20716 = true ∧ castsFifteens 20716 = true := by decide

/-- 50ed: nibbles fold back to 20717; digit sum 32 ≡ 20717 (mod 15). -/
theorem enumeration_hex4_50ed : reassembles 20717 = true ∧ castsFifteens 20717 = true := by decide

/-- 50ee: nibbles fold back to 20718; digit sum 33 ≡ 20718 (mod 15). -/
theorem enumeration_hex4_50ee : reassembles 20718 = true ∧ castsFifteens 20718 = true := by decide

/-- 50ef: nibbles fold back to 20719; digit sum 34 ≡ 20719 (mod 15). -/
theorem enumeration_hex4_50ef : reassembles 20719 = true ∧ castsFifteens 20719 = true := by decide

/-- 50f0: nibbles fold back to 20720; digit sum 20 ≡ 20720 (mod 15). -/
theorem enumeration_hex4_50f0 : reassembles 20720 = true ∧ castsFifteens 20720 = true := by decide

/-- 50f1: nibbles fold back to 20721; digit sum 21 ≡ 20721 (mod 15). -/
theorem enumeration_hex4_50f1 : reassembles 20721 = true ∧ castsFifteens 20721 = true := by decide

/-- 50f2: nibbles fold back to 20722; digit sum 22 ≡ 20722 (mod 15). -/
theorem enumeration_hex4_50f2 : reassembles 20722 = true ∧ castsFifteens 20722 = true := by decide

/-- 50f3: nibbles fold back to 20723; digit sum 23 ≡ 20723 (mod 15). -/
theorem enumeration_hex4_50f3 : reassembles 20723 = true ∧ castsFifteens 20723 = true := by decide

/-- 50f4: nibbles fold back to 20724; digit sum 24 ≡ 20724 (mod 15). -/
theorem enumeration_hex4_50f4 : reassembles 20724 = true ∧ castsFifteens 20724 = true := by decide

/-- 50f5: nibbles fold back to 20725; digit sum 25 ≡ 20725 (mod 15). -/
theorem enumeration_hex4_50f5 : reassembles 20725 = true ∧ castsFifteens 20725 = true := by decide

/-- 50f6: nibbles fold back to 20726; digit sum 26 ≡ 20726 (mod 15). -/
theorem enumeration_hex4_50f6 : reassembles 20726 = true ∧ castsFifteens 20726 = true := by decide

/-- 50f7: nibbles fold back to 20727; digit sum 27 ≡ 20727 (mod 15). -/
theorem enumeration_hex4_50f7 : reassembles 20727 = true ∧ castsFifteens 20727 = true := by decide

/-- 50f8: nibbles fold back to 20728; digit sum 28 ≡ 20728 (mod 15). -/
theorem enumeration_hex4_50f8 : reassembles 20728 = true ∧ castsFifteens 20728 = true := by decide

/-- 50f9: nibbles fold back to 20729; digit sum 29 ≡ 20729 (mod 15). -/
theorem enumeration_hex4_50f9 : reassembles 20729 = true ∧ castsFifteens 20729 = true := by decide

/-- 50fa: nibbles fold back to 20730; digit sum 30 ≡ 20730 (mod 15). -/
theorem enumeration_hex4_50fa : reassembles 20730 = true ∧ castsFifteens 20730 = true := by decide

/-- 50fb: nibbles fold back to 20731; digit sum 31 ≡ 20731 (mod 15). -/
theorem enumeration_hex4_50fb : reassembles 20731 = true ∧ castsFifteens 20731 = true := by decide

/-- 50fc: nibbles fold back to 20732; digit sum 32 ≡ 20732 (mod 15). -/
theorem enumeration_hex4_50fc : reassembles 20732 = true ∧ castsFifteens 20732 = true := by decide

/-- 50fd: nibbles fold back to 20733; digit sum 33 ≡ 20733 (mod 15). -/
theorem enumeration_hex4_50fd : reassembles 20733 = true ∧ castsFifteens 20733 = true := by decide

/-- 50fe: nibbles fold back to 20734; digit sum 34 ≡ 20734 (mod 15). -/
theorem enumeration_hex4_50fe : reassembles 20734 = true ∧ castsFifteens 20734 = true := by decide

/-- 50ff: nibbles fold back to 20735; digit sum 35 ≡ 20735 (mod 15). -/
theorem enumeration_hex4_50ff : reassembles 20735 = true ∧ castsFifteens 20735 = true := by decide

/-- 5100: nibbles fold back to 20736; digit sum 6 ≡ 20736 (mod 15). -/
theorem enumeration_hex4_5100 : reassembles 20736 = true ∧ castsFifteens 20736 = true := by decide

/-- 5101: nibbles fold back to 20737; digit sum 7 ≡ 20737 (mod 15). -/
theorem enumeration_hex4_5101 : reassembles 20737 = true ∧ castsFifteens 20737 = true := by decide

/-- 5102: nibbles fold back to 20738; digit sum 8 ≡ 20738 (mod 15). -/
theorem enumeration_hex4_5102 : reassembles 20738 = true ∧ castsFifteens 20738 = true := by decide

/-- 5103: nibbles fold back to 20739; digit sum 9 ≡ 20739 (mod 15). -/
theorem enumeration_hex4_5103 : reassembles 20739 = true ∧ castsFifteens 20739 = true := by decide

/-- 5104: nibbles fold back to 20740; digit sum 10 ≡ 20740 (mod 15). -/
theorem enumeration_hex4_5104 : reassembles 20740 = true ∧ castsFifteens 20740 = true := by decide

/-- 5105: nibbles fold back to 20741; digit sum 11 ≡ 20741 (mod 15). -/
theorem enumeration_hex4_5105 : reassembles 20741 = true ∧ castsFifteens 20741 = true := by decide

/-- 5106: nibbles fold back to 20742; digit sum 12 ≡ 20742 (mod 15). -/
theorem enumeration_hex4_5106 : reassembles 20742 = true ∧ castsFifteens 20742 = true := by decide

/-- 5107: nibbles fold back to 20743; digit sum 13 ≡ 20743 (mod 15). -/
theorem enumeration_hex4_5107 : reassembles 20743 = true ∧ castsFifteens 20743 = true := by decide

/-- 5108: nibbles fold back to 20744; digit sum 14 ≡ 20744 (mod 15). -/
theorem enumeration_hex4_5108 : reassembles 20744 = true ∧ castsFifteens 20744 = true := by decide

/-- 5109: nibbles fold back to 20745; digit sum 15 ≡ 20745 (mod 15). -/
theorem enumeration_hex4_5109 : reassembles 20745 = true ∧ castsFifteens 20745 = true := by decide

/-- 510a: nibbles fold back to 20746; digit sum 16 ≡ 20746 (mod 15). -/
theorem enumeration_hex4_510a : reassembles 20746 = true ∧ castsFifteens 20746 = true := by decide

/-- 510b: nibbles fold back to 20747; digit sum 17 ≡ 20747 (mod 15). -/
theorem enumeration_hex4_510b : reassembles 20747 = true ∧ castsFifteens 20747 = true := by decide

/-- 510c: nibbles fold back to 20748; digit sum 18 ≡ 20748 (mod 15). -/
theorem enumeration_hex4_510c : reassembles 20748 = true ∧ castsFifteens 20748 = true := by decide

/-- 510d: nibbles fold back to 20749; digit sum 19 ≡ 20749 (mod 15). -/
theorem enumeration_hex4_510d : reassembles 20749 = true ∧ castsFifteens 20749 = true := by decide

/-- 510e: nibbles fold back to 20750; digit sum 20 ≡ 20750 (mod 15). -/
theorem enumeration_hex4_510e : reassembles 20750 = true ∧ castsFifteens 20750 = true := by decide

/-- 510f: nibbles fold back to 20751; digit sum 21 ≡ 20751 (mod 15). -/
theorem enumeration_hex4_510f : reassembles 20751 = true ∧ castsFifteens 20751 = true := by decide

/-- 5110: nibbles fold back to 20752; digit sum 7 ≡ 20752 (mod 15). -/
theorem enumeration_hex4_5110 : reassembles 20752 = true ∧ castsFifteens 20752 = true := by decide

/-- 5111: nibbles fold back to 20753; digit sum 8 ≡ 20753 (mod 15). -/
theorem enumeration_hex4_5111 : reassembles 20753 = true ∧ castsFifteens 20753 = true := by decide

/-- 5112: nibbles fold back to 20754; digit sum 9 ≡ 20754 (mod 15). -/
theorem enumeration_hex4_5112 : reassembles 20754 = true ∧ castsFifteens 20754 = true := by decide

/-- 5113: nibbles fold back to 20755; digit sum 10 ≡ 20755 (mod 15). -/
theorem enumeration_hex4_5113 : reassembles 20755 = true ∧ castsFifteens 20755 = true := by decide

/-- 5114: nibbles fold back to 20756; digit sum 11 ≡ 20756 (mod 15). -/
theorem enumeration_hex4_5114 : reassembles 20756 = true ∧ castsFifteens 20756 = true := by decide

/-- 5115: nibbles fold back to 20757; digit sum 12 ≡ 20757 (mod 15). -/
theorem enumeration_hex4_5115 : reassembles 20757 = true ∧ castsFifteens 20757 = true := by decide

/-- 5116: nibbles fold back to 20758; digit sum 13 ≡ 20758 (mod 15). -/
theorem enumeration_hex4_5116 : reassembles 20758 = true ∧ castsFifteens 20758 = true := by decide

/-- 5117: nibbles fold back to 20759; digit sum 14 ≡ 20759 (mod 15). -/
theorem enumeration_hex4_5117 : reassembles 20759 = true ∧ castsFifteens 20759 = true := by decide

/-- 5118: nibbles fold back to 20760; digit sum 15 ≡ 20760 (mod 15). -/
theorem enumeration_hex4_5118 : reassembles 20760 = true ∧ castsFifteens 20760 = true := by decide

/-- 5119: nibbles fold back to 20761; digit sum 16 ≡ 20761 (mod 15). -/
theorem enumeration_hex4_5119 : reassembles 20761 = true ∧ castsFifteens 20761 = true := by decide

/-- 511a: nibbles fold back to 20762; digit sum 17 ≡ 20762 (mod 15). -/
theorem enumeration_hex4_511a : reassembles 20762 = true ∧ castsFifteens 20762 = true := by decide

/-- 511b: nibbles fold back to 20763; digit sum 18 ≡ 20763 (mod 15). -/
theorem enumeration_hex4_511b : reassembles 20763 = true ∧ castsFifteens 20763 = true := by decide

/-- 511c: nibbles fold back to 20764; digit sum 19 ≡ 20764 (mod 15). -/
theorem enumeration_hex4_511c : reassembles 20764 = true ∧ castsFifteens 20764 = true := by decide

/-- 511d: nibbles fold back to 20765; digit sum 20 ≡ 20765 (mod 15). -/
theorem enumeration_hex4_511d : reassembles 20765 = true ∧ castsFifteens 20765 = true := by decide

/-- 511e: nibbles fold back to 20766; digit sum 21 ≡ 20766 (mod 15). -/
theorem enumeration_hex4_511e : reassembles 20766 = true ∧ castsFifteens 20766 = true := by decide

/-- 511f: nibbles fold back to 20767; digit sum 22 ≡ 20767 (mod 15). -/
theorem enumeration_hex4_511f : reassembles 20767 = true ∧ castsFifteens 20767 = true := by decide

/-- 5120: nibbles fold back to 20768; digit sum 8 ≡ 20768 (mod 15). -/
theorem enumeration_hex4_5120 : reassembles 20768 = true ∧ castsFifteens 20768 = true := by decide

/-- 5121: nibbles fold back to 20769; digit sum 9 ≡ 20769 (mod 15). -/
theorem enumeration_hex4_5121 : reassembles 20769 = true ∧ castsFifteens 20769 = true := by decide

/-- 5122: nibbles fold back to 20770; digit sum 10 ≡ 20770 (mod 15). -/
theorem enumeration_hex4_5122 : reassembles 20770 = true ∧ castsFifteens 20770 = true := by decide

/-- 5123: nibbles fold back to 20771; digit sum 11 ≡ 20771 (mod 15). -/
theorem enumeration_hex4_5123 : reassembles 20771 = true ∧ castsFifteens 20771 = true := by decide

/-- 5124: nibbles fold back to 20772; digit sum 12 ≡ 20772 (mod 15). -/
theorem enumeration_hex4_5124 : reassembles 20772 = true ∧ castsFifteens 20772 = true := by decide

/-- 5125: nibbles fold back to 20773; digit sum 13 ≡ 20773 (mod 15). -/
theorem enumeration_hex4_5125 : reassembles 20773 = true ∧ castsFifteens 20773 = true := by decide

/-- 5126: nibbles fold back to 20774; digit sum 14 ≡ 20774 (mod 15). -/
theorem enumeration_hex4_5126 : reassembles 20774 = true ∧ castsFifteens 20774 = true := by decide

/-- 5127: nibbles fold back to 20775; digit sum 15 ≡ 20775 (mod 15). -/
theorem enumeration_hex4_5127 : reassembles 20775 = true ∧ castsFifteens 20775 = true := by decide

/-- 5128: nibbles fold back to 20776; digit sum 16 ≡ 20776 (mod 15). -/
theorem enumeration_hex4_5128 : reassembles 20776 = true ∧ castsFifteens 20776 = true := by decide

/-- 5129: nibbles fold back to 20777; digit sum 17 ≡ 20777 (mod 15). -/
theorem enumeration_hex4_5129 : reassembles 20777 = true ∧ castsFifteens 20777 = true := by decide

/-- 512a: nibbles fold back to 20778; digit sum 18 ≡ 20778 (mod 15). -/
theorem enumeration_hex4_512a : reassembles 20778 = true ∧ castsFifteens 20778 = true := by decide

/-- 512b: nibbles fold back to 20779; digit sum 19 ≡ 20779 (mod 15). -/
theorem enumeration_hex4_512b : reassembles 20779 = true ∧ castsFifteens 20779 = true := by decide

/-- 512c: nibbles fold back to 20780; digit sum 20 ≡ 20780 (mod 15). -/
theorem enumeration_hex4_512c : reassembles 20780 = true ∧ castsFifteens 20780 = true := by decide

/-- 512d: nibbles fold back to 20781; digit sum 21 ≡ 20781 (mod 15). -/
theorem enumeration_hex4_512d : reassembles 20781 = true ∧ castsFifteens 20781 = true := by decide

/-- 512e: nibbles fold back to 20782; digit sum 22 ≡ 20782 (mod 15). -/
theorem enumeration_hex4_512e : reassembles 20782 = true ∧ castsFifteens 20782 = true := by decide

/-- 512f: nibbles fold back to 20783; digit sum 23 ≡ 20783 (mod 15). -/
theorem enumeration_hex4_512f : reassembles 20783 = true ∧ castsFifteens 20783 = true := by decide

/-- 5130: nibbles fold back to 20784; digit sum 9 ≡ 20784 (mod 15). -/
theorem enumeration_hex4_5130 : reassembles 20784 = true ∧ castsFifteens 20784 = true := by decide

/-- 5131: nibbles fold back to 20785; digit sum 10 ≡ 20785 (mod 15). -/
theorem enumeration_hex4_5131 : reassembles 20785 = true ∧ castsFifteens 20785 = true := by decide

/-- 5132: nibbles fold back to 20786; digit sum 11 ≡ 20786 (mod 15). -/
theorem enumeration_hex4_5132 : reassembles 20786 = true ∧ castsFifteens 20786 = true := by decide

/-- 5133: nibbles fold back to 20787; digit sum 12 ≡ 20787 (mod 15). -/
theorem enumeration_hex4_5133 : reassembles 20787 = true ∧ castsFifteens 20787 = true := by decide

/-- 5134: nibbles fold back to 20788; digit sum 13 ≡ 20788 (mod 15). -/
theorem enumeration_hex4_5134 : reassembles 20788 = true ∧ castsFifteens 20788 = true := by decide

/-- 5135: nibbles fold back to 20789; digit sum 14 ≡ 20789 (mod 15). -/
theorem enumeration_hex4_5135 : reassembles 20789 = true ∧ castsFifteens 20789 = true := by decide

/-- 5136: nibbles fold back to 20790; digit sum 15 ≡ 20790 (mod 15). -/
theorem enumeration_hex4_5136 : reassembles 20790 = true ∧ castsFifteens 20790 = true := by decide

/-- 5137: nibbles fold back to 20791; digit sum 16 ≡ 20791 (mod 15). -/
theorem enumeration_hex4_5137 : reassembles 20791 = true ∧ castsFifteens 20791 = true := by decide

/-- 5138: nibbles fold back to 20792; digit sum 17 ≡ 20792 (mod 15). -/
theorem enumeration_hex4_5138 : reassembles 20792 = true ∧ castsFifteens 20792 = true := by decide

/-- 5139: nibbles fold back to 20793; digit sum 18 ≡ 20793 (mod 15). -/
theorem enumeration_hex4_5139 : reassembles 20793 = true ∧ castsFifteens 20793 = true := by decide

/-- 513a: nibbles fold back to 20794; digit sum 19 ≡ 20794 (mod 15). -/
theorem enumeration_hex4_513a : reassembles 20794 = true ∧ castsFifteens 20794 = true := by decide

/-- 513b: nibbles fold back to 20795; digit sum 20 ≡ 20795 (mod 15). -/
theorem enumeration_hex4_513b : reassembles 20795 = true ∧ castsFifteens 20795 = true := by decide

/-- 513c: nibbles fold back to 20796; digit sum 21 ≡ 20796 (mod 15). -/
theorem enumeration_hex4_513c : reassembles 20796 = true ∧ castsFifteens 20796 = true := by decide

/-- 513d: nibbles fold back to 20797; digit sum 22 ≡ 20797 (mod 15). -/
theorem enumeration_hex4_513d : reassembles 20797 = true ∧ castsFifteens 20797 = true := by decide

/-- 513e: nibbles fold back to 20798; digit sum 23 ≡ 20798 (mod 15). -/
theorem enumeration_hex4_513e : reassembles 20798 = true ∧ castsFifteens 20798 = true := by decide

/-- 513f: nibbles fold back to 20799; digit sum 24 ≡ 20799 (mod 15). -/
theorem enumeration_hex4_513f : reassembles 20799 = true ∧ castsFifteens 20799 = true := by decide

/-- 5140: nibbles fold back to 20800; digit sum 10 ≡ 20800 (mod 15). -/
theorem enumeration_hex4_5140 : reassembles 20800 = true ∧ castsFifteens 20800 = true := by decide

/-- 5141: nibbles fold back to 20801; digit sum 11 ≡ 20801 (mod 15). -/
theorem enumeration_hex4_5141 : reassembles 20801 = true ∧ castsFifteens 20801 = true := by decide

/-- 5142: nibbles fold back to 20802; digit sum 12 ≡ 20802 (mod 15). -/
theorem enumeration_hex4_5142 : reassembles 20802 = true ∧ castsFifteens 20802 = true := by decide

/-- 5143: nibbles fold back to 20803; digit sum 13 ≡ 20803 (mod 15). -/
theorem enumeration_hex4_5143 : reassembles 20803 = true ∧ castsFifteens 20803 = true := by decide

/-- 5144: nibbles fold back to 20804; digit sum 14 ≡ 20804 (mod 15). -/
theorem enumeration_hex4_5144 : reassembles 20804 = true ∧ castsFifteens 20804 = true := by decide

/-- 5145: nibbles fold back to 20805; digit sum 15 ≡ 20805 (mod 15). -/
theorem enumeration_hex4_5145 : reassembles 20805 = true ∧ castsFifteens 20805 = true := by decide

/-- 5146: nibbles fold back to 20806; digit sum 16 ≡ 20806 (mod 15). -/
theorem enumeration_hex4_5146 : reassembles 20806 = true ∧ castsFifteens 20806 = true := by decide

/-- 5147: nibbles fold back to 20807; digit sum 17 ≡ 20807 (mod 15). -/
theorem enumeration_hex4_5147 : reassembles 20807 = true ∧ castsFifteens 20807 = true := by decide

/-- 5148: nibbles fold back to 20808; digit sum 18 ≡ 20808 (mod 15). -/
theorem enumeration_hex4_5148 : reassembles 20808 = true ∧ castsFifteens 20808 = true := by decide

/-- 5149: nibbles fold back to 20809; digit sum 19 ≡ 20809 (mod 15). -/
theorem enumeration_hex4_5149 : reassembles 20809 = true ∧ castsFifteens 20809 = true := by decide

/-- 514a: nibbles fold back to 20810; digit sum 20 ≡ 20810 (mod 15). -/
theorem enumeration_hex4_514a : reassembles 20810 = true ∧ castsFifteens 20810 = true := by decide

/-- 514b: nibbles fold back to 20811; digit sum 21 ≡ 20811 (mod 15). -/
theorem enumeration_hex4_514b : reassembles 20811 = true ∧ castsFifteens 20811 = true := by decide

/-- 514c: nibbles fold back to 20812; digit sum 22 ≡ 20812 (mod 15). -/
theorem enumeration_hex4_514c : reassembles 20812 = true ∧ castsFifteens 20812 = true := by decide

/-- 514d: nibbles fold back to 20813; digit sum 23 ≡ 20813 (mod 15). -/
theorem enumeration_hex4_514d : reassembles 20813 = true ∧ castsFifteens 20813 = true := by decide

/-- 514e: nibbles fold back to 20814; digit sum 24 ≡ 20814 (mod 15). -/
theorem enumeration_hex4_514e : reassembles 20814 = true ∧ castsFifteens 20814 = true := by decide

/-- 514f: nibbles fold back to 20815; digit sum 25 ≡ 20815 (mod 15). -/
theorem enumeration_hex4_514f : reassembles 20815 = true ∧ castsFifteens 20815 = true := by decide

/-- 5150: nibbles fold back to 20816; digit sum 11 ≡ 20816 (mod 15). -/
theorem enumeration_hex4_5150 : reassembles 20816 = true ∧ castsFifteens 20816 = true := by decide

/-- 5151: nibbles fold back to 20817; digit sum 12 ≡ 20817 (mod 15). -/
theorem enumeration_hex4_5151 : reassembles 20817 = true ∧ castsFifteens 20817 = true := by decide

/-- 5152: nibbles fold back to 20818; digit sum 13 ≡ 20818 (mod 15). -/
theorem enumeration_hex4_5152 : reassembles 20818 = true ∧ castsFifteens 20818 = true := by decide

/-- 5153: nibbles fold back to 20819; digit sum 14 ≡ 20819 (mod 15). -/
theorem enumeration_hex4_5153 : reassembles 20819 = true ∧ castsFifteens 20819 = true := by decide

/-- 5154: nibbles fold back to 20820; digit sum 15 ≡ 20820 (mod 15). -/
theorem enumeration_hex4_5154 : reassembles 20820 = true ∧ castsFifteens 20820 = true := by decide

/-- 5155: nibbles fold back to 20821; digit sum 16 ≡ 20821 (mod 15). -/
theorem enumeration_hex4_5155 : reassembles 20821 = true ∧ castsFifteens 20821 = true := by decide

/-- 5156: nibbles fold back to 20822; digit sum 17 ≡ 20822 (mod 15). -/
theorem enumeration_hex4_5156 : reassembles 20822 = true ∧ castsFifteens 20822 = true := by decide

/-- 5157: nibbles fold back to 20823; digit sum 18 ≡ 20823 (mod 15). -/
theorem enumeration_hex4_5157 : reassembles 20823 = true ∧ castsFifteens 20823 = true := by decide

/-- 5158: nibbles fold back to 20824; digit sum 19 ≡ 20824 (mod 15). -/
theorem enumeration_hex4_5158 : reassembles 20824 = true ∧ castsFifteens 20824 = true := by decide

/-- 5159: nibbles fold back to 20825; digit sum 20 ≡ 20825 (mod 15). -/
theorem enumeration_hex4_5159 : reassembles 20825 = true ∧ castsFifteens 20825 = true := by decide

/-- 515a: nibbles fold back to 20826; digit sum 21 ≡ 20826 (mod 15). -/
theorem enumeration_hex4_515a : reassembles 20826 = true ∧ castsFifteens 20826 = true := by decide

/-- 515b: nibbles fold back to 20827; digit sum 22 ≡ 20827 (mod 15). -/
theorem enumeration_hex4_515b : reassembles 20827 = true ∧ castsFifteens 20827 = true := by decide

/-- 515c: nibbles fold back to 20828; digit sum 23 ≡ 20828 (mod 15). -/
theorem enumeration_hex4_515c : reassembles 20828 = true ∧ castsFifteens 20828 = true := by decide

/-- 515d: nibbles fold back to 20829; digit sum 24 ≡ 20829 (mod 15). -/
theorem enumeration_hex4_515d : reassembles 20829 = true ∧ castsFifteens 20829 = true := by decide

/-- 515e: nibbles fold back to 20830; digit sum 25 ≡ 20830 (mod 15). -/
theorem enumeration_hex4_515e : reassembles 20830 = true ∧ castsFifteens 20830 = true := by decide

/-- 515f: nibbles fold back to 20831; digit sum 26 ≡ 20831 (mod 15). -/
theorem enumeration_hex4_515f : reassembles 20831 = true ∧ castsFifteens 20831 = true := by decide

/-- 5160: nibbles fold back to 20832; digit sum 12 ≡ 20832 (mod 15). -/
theorem enumeration_hex4_5160 : reassembles 20832 = true ∧ castsFifteens 20832 = true := by decide

/-- 5161: nibbles fold back to 20833; digit sum 13 ≡ 20833 (mod 15). -/
theorem enumeration_hex4_5161 : reassembles 20833 = true ∧ castsFifteens 20833 = true := by decide

/-- 5162: nibbles fold back to 20834; digit sum 14 ≡ 20834 (mod 15). -/
theorem enumeration_hex4_5162 : reassembles 20834 = true ∧ castsFifteens 20834 = true := by decide

/-- 5163: nibbles fold back to 20835; digit sum 15 ≡ 20835 (mod 15). -/
theorem enumeration_hex4_5163 : reassembles 20835 = true ∧ castsFifteens 20835 = true := by decide

/-- 5164: nibbles fold back to 20836; digit sum 16 ≡ 20836 (mod 15). -/
theorem enumeration_hex4_5164 : reassembles 20836 = true ∧ castsFifteens 20836 = true := by decide

/-- 5165: nibbles fold back to 20837; digit sum 17 ≡ 20837 (mod 15). -/
theorem enumeration_hex4_5165 : reassembles 20837 = true ∧ castsFifteens 20837 = true := by decide

/-- 5166: nibbles fold back to 20838; digit sum 18 ≡ 20838 (mod 15). -/
theorem enumeration_hex4_5166 : reassembles 20838 = true ∧ castsFifteens 20838 = true := by decide

/-- 5167: nibbles fold back to 20839; digit sum 19 ≡ 20839 (mod 15). -/
theorem enumeration_hex4_5167 : reassembles 20839 = true ∧ castsFifteens 20839 = true := by decide

/-- 5168: nibbles fold back to 20840; digit sum 20 ≡ 20840 (mod 15). -/
theorem enumeration_hex4_5168 : reassembles 20840 = true ∧ castsFifteens 20840 = true := by decide

/-- 5169: nibbles fold back to 20841; digit sum 21 ≡ 20841 (mod 15). -/
theorem enumeration_hex4_5169 : reassembles 20841 = true ∧ castsFifteens 20841 = true := by decide

/-- 516a: nibbles fold back to 20842; digit sum 22 ≡ 20842 (mod 15). -/
theorem enumeration_hex4_516a : reassembles 20842 = true ∧ castsFifteens 20842 = true := by decide

/-- 516b: nibbles fold back to 20843; digit sum 23 ≡ 20843 (mod 15). -/
theorem enumeration_hex4_516b : reassembles 20843 = true ∧ castsFifteens 20843 = true := by decide

/-- 516c: nibbles fold back to 20844; digit sum 24 ≡ 20844 (mod 15). -/
theorem enumeration_hex4_516c : reassembles 20844 = true ∧ castsFifteens 20844 = true := by decide

/-- 516d: nibbles fold back to 20845; digit sum 25 ≡ 20845 (mod 15). -/
theorem enumeration_hex4_516d : reassembles 20845 = true ∧ castsFifteens 20845 = true := by decide

/-- 516e: nibbles fold back to 20846; digit sum 26 ≡ 20846 (mod 15). -/
theorem enumeration_hex4_516e : reassembles 20846 = true ∧ castsFifteens 20846 = true := by decide

/-- 516f: nibbles fold back to 20847; digit sum 27 ≡ 20847 (mod 15). -/
theorem enumeration_hex4_516f : reassembles 20847 = true ∧ castsFifteens 20847 = true := by decide

/-- 5170: nibbles fold back to 20848; digit sum 13 ≡ 20848 (mod 15). -/
theorem enumeration_hex4_5170 : reassembles 20848 = true ∧ castsFifteens 20848 = true := by decide

/-- 5171: nibbles fold back to 20849; digit sum 14 ≡ 20849 (mod 15). -/
theorem enumeration_hex4_5171 : reassembles 20849 = true ∧ castsFifteens 20849 = true := by decide

/-- 5172: nibbles fold back to 20850; digit sum 15 ≡ 20850 (mod 15). -/
theorem enumeration_hex4_5172 : reassembles 20850 = true ∧ castsFifteens 20850 = true := by decide

/-- 5173: nibbles fold back to 20851; digit sum 16 ≡ 20851 (mod 15). -/
theorem enumeration_hex4_5173 : reassembles 20851 = true ∧ castsFifteens 20851 = true := by decide

/-- 5174: nibbles fold back to 20852; digit sum 17 ≡ 20852 (mod 15). -/
theorem enumeration_hex4_5174 : reassembles 20852 = true ∧ castsFifteens 20852 = true := by decide

/-- 5175: nibbles fold back to 20853; digit sum 18 ≡ 20853 (mod 15). -/
theorem enumeration_hex4_5175 : reassembles 20853 = true ∧ castsFifteens 20853 = true := by decide

/-- 5176: nibbles fold back to 20854; digit sum 19 ≡ 20854 (mod 15). -/
theorem enumeration_hex4_5176 : reassembles 20854 = true ∧ castsFifteens 20854 = true := by decide

/-- 5177: nibbles fold back to 20855; digit sum 20 ≡ 20855 (mod 15). -/
theorem enumeration_hex4_5177 : reassembles 20855 = true ∧ castsFifteens 20855 = true := by decide

/-- 5178: nibbles fold back to 20856; digit sum 21 ≡ 20856 (mod 15). -/
theorem enumeration_hex4_5178 : reassembles 20856 = true ∧ castsFifteens 20856 = true := by decide

/-- 5179: nibbles fold back to 20857; digit sum 22 ≡ 20857 (mod 15). -/
theorem enumeration_hex4_5179 : reassembles 20857 = true ∧ castsFifteens 20857 = true := by decide

/-- 517a: nibbles fold back to 20858; digit sum 23 ≡ 20858 (mod 15). -/
theorem enumeration_hex4_517a : reassembles 20858 = true ∧ castsFifteens 20858 = true := by decide

/-- 517b: nibbles fold back to 20859; digit sum 24 ≡ 20859 (mod 15). -/
theorem enumeration_hex4_517b : reassembles 20859 = true ∧ castsFifteens 20859 = true := by decide

/-- 517c: nibbles fold back to 20860; digit sum 25 ≡ 20860 (mod 15). -/
theorem enumeration_hex4_517c : reassembles 20860 = true ∧ castsFifteens 20860 = true := by decide

/-- 517d: nibbles fold back to 20861; digit sum 26 ≡ 20861 (mod 15). -/
theorem enumeration_hex4_517d : reassembles 20861 = true ∧ castsFifteens 20861 = true := by decide

/-- 517e: nibbles fold back to 20862; digit sum 27 ≡ 20862 (mod 15). -/
theorem enumeration_hex4_517e : reassembles 20862 = true ∧ castsFifteens 20862 = true := by decide

/-- 517f: nibbles fold back to 20863; digit sum 28 ≡ 20863 (mod 15). -/
theorem enumeration_hex4_517f : reassembles 20863 = true ∧ castsFifteens 20863 = true := by decide

/-- 5180: nibbles fold back to 20864; digit sum 14 ≡ 20864 (mod 15). -/
theorem enumeration_hex4_5180 : reassembles 20864 = true ∧ castsFifteens 20864 = true := by decide

/-- 5181: nibbles fold back to 20865; digit sum 15 ≡ 20865 (mod 15). -/
theorem enumeration_hex4_5181 : reassembles 20865 = true ∧ castsFifteens 20865 = true := by decide

/-- 5182: nibbles fold back to 20866; digit sum 16 ≡ 20866 (mod 15). -/
theorem enumeration_hex4_5182 : reassembles 20866 = true ∧ castsFifteens 20866 = true := by decide

/-- 5183: nibbles fold back to 20867; digit sum 17 ≡ 20867 (mod 15). -/
theorem enumeration_hex4_5183 : reassembles 20867 = true ∧ castsFifteens 20867 = true := by decide

/-- 5184: nibbles fold back to 20868; digit sum 18 ≡ 20868 (mod 15). -/
theorem enumeration_hex4_5184 : reassembles 20868 = true ∧ castsFifteens 20868 = true := by decide

/-- 5185: nibbles fold back to 20869; digit sum 19 ≡ 20869 (mod 15). -/
theorem enumeration_hex4_5185 : reassembles 20869 = true ∧ castsFifteens 20869 = true := by decide

/-- 5186: nibbles fold back to 20870; digit sum 20 ≡ 20870 (mod 15). -/
theorem enumeration_hex4_5186 : reassembles 20870 = true ∧ castsFifteens 20870 = true := by decide

/-- 5187: nibbles fold back to 20871; digit sum 21 ≡ 20871 (mod 15). -/
theorem enumeration_hex4_5187 : reassembles 20871 = true ∧ castsFifteens 20871 = true := by decide

/-- 5188: nibbles fold back to 20872; digit sum 22 ≡ 20872 (mod 15). -/
theorem enumeration_hex4_5188 : reassembles 20872 = true ∧ castsFifteens 20872 = true := by decide

/-- 5189: nibbles fold back to 20873; digit sum 23 ≡ 20873 (mod 15). -/
theorem enumeration_hex4_5189 : reassembles 20873 = true ∧ castsFifteens 20873 = true := by decide

/-- 518a: nibbles fold back to 20874; digit sum 24 ≡ 20874 (mod 15). -/
theorem enumeration_hex4_518a : reassembles 20874 = true ∧ castsFifteens 20874 = true := by decide

/-- 518b: nibbles fold back to 20875; digit sum 25 ≡ 20875 (mod 15). -/
theorem enumeration_hex4_518b : reassembles 20875 = true ∧ castsFifteens 20875 = true := by decide

/-- 518c: nibbles fold back to 20876; digit sum 26 ≡ 20876 (mod 15). -/
theorem enumeration_hex4_518c : reassembles 20876 = true ∧ castsFifteens 20876 = true := by decide

/-- 518d: nibbles fold back to 20877; digit sum 27 ≡ 20877 (mod 15). -/
theorem enumeration_hex4_518d : reassembles 20877 = true ∧ castsFifteens 20877 = true := by decide

/-- 518e: nibbles fold back to 20878; digit sum 28 ≡ 20878 (mod 15). -/
theorem enumeration_hex4_518e : reassembles 20878 = true ∧ castsFifteens 20878 = true := by decide

/-- 518f: nibbles fold back to 20879; digit sum 29 ≡ 20879 (mod 15). -/
theorem enumeration_hex4_518f : reassembles 20879 = true ∧ castsFifteens 20879 = true := by decide

/-- 5190: nibbles fold back to 20880; digit sum 15 ≡ 20880 (mod 15). -/
theorem enumeration_hex4_5190 : reassembles 20880 = true ∧ castsFifteens 20880 = true := by decide

/-- 5191: nibbles fold back to 20881; digit sum 16 ≡ 20881 (mod 15). -/
theorem enumeration_hex4_5191 : reassembles 20881 = true ∧ castsFifteens 20881 = true := by decide

/-- 5192: nibbles fold back to 20882; digit sum 17 ≡ 20882 (mod 15). -/
theorem enumeration_hex4_5192 : reassembles 20882 = true ∧ castsFifteens 20882 = true := by decide

/-- 5193: nibbles fold back to 20883; digit sum 18 ≡ 20883 (mod 15). -/
theorem enumeration_hex4_5193 : reassembles 20883 = true ∧ castsFifteens 20883 = true := by decide

/-- 5194: nibbles fold back to 20884; digit sum 19 ≡ 20884 (mod 15). -/
theorem enumeration_hex4_5194 : reassembles 20884 = true ∧ castsFifteens 20884 = true := by decide

/-- 5195: nibbles fold back to 20885; digit sum 20 ≡ 20885 (mod 15). -/
theorem enumeration_hex4_5195 : reassembles 20885 = true ∧ castsFifteens 20885 = true := by decide

/-- 5196: nibbles fold back to 20886; digit sum 21 ≡ 20886 (mod 15). -/
theorem enumeration_hex4_5196 : reassembles 20886 = true ∧ castsFifteens 20886 = true := by decide

/-- 5197: nibbles fold back to 20887; digit sum 22 ≡ 20887 (mod 15). -/
theorem enumeration_hex4_5197 : reassembles 20887 = true ∧ castsFifteens 20887 = true := by decide

/-- 5198: nibbles fold back to 20888; digit sum 23 ≡ 20888 (mod 15). -/
theorem enumeration_hex4_5198 : reassembles 20888 = true ∧ castsFifteens 20888 = true := by decide

/-- 5199: nibbles fold back to 20889; digit sum 24 ≡ 20889 (mod 15). -/
theorem enumeration_hex4_5199 : reassembles 20889 = true ∧ castsFifteens 20889 = true := by decide

/-- 519a: nibbles fold back to 20890; digit sum 25 ≡ 20890 (mod 15). -/
theorem enumeration_hex4_519a : reassembles 20890 = true ∧ castsFifteens 20890 = true := by decide

/-- 519b: nibbles fold back to 20891; digit sum 26 ≡ 20891 (mod 15). -/
theorem enumeration_hex4_519b : reassembles 20891 = true ∧ castsFifteens 20891 = true := by decide

/-- 519c: nibbles fold back to 20892; digit sum 27 ≡ 20892 (mod 15). -/
theorem enumeration_hex4_519c : reassembles 20892 = true ∧ castsFifteens 20892 = true := by decide

/-- 519d: nibbles fold back to 20893; digit sum 28 ≡ 20893 (mod 15). -/
theorem enumeration_hex4_519d : reassembles 20893 = true ∧ castsFifteens 20893 = true := by decide

/-- 519e: nibbles fold back to 20894; digit sum 29 ≡ 20894 (mod 15). -/
theorem enumeration_hex4_519e : reassembles 20894 = true ∧ castsFifteens 20894 = true := by decide

/-- 519f: nibbles fold back to 20895; digit sum 30 ≡ 20895 (mod 15). -/
theorem enumeration_hex4_519f : reassembles 20895 = true ∧ castsFifteens 20895 = true := by decide

/-- 51a0: nibbles fold back to 20896; digit sum 16 ≡ 20896 (mod 15). -/
theorem enumeration_hex4_51a0 : reassembles 20896 = true ∧ castsFifteens 20896 = true := by decide

/-- 51a1: nibbles fold back to 20897; digit sum 17 ≡ 20897 (mod 15). -/
theorem enumeration_hex4_51a1 : reassembles 20897 = true ∧ castsFifteens 20897 = true := by decide

/-- 51a2: nibbles fold back to 20898; digit sum 18 ≡ 20898 (mod 15). -/
theorem enumeration_hex4_51a2 : reassembles 20898 = true ∧ castsFifteens 20898 = true := by decide

/-- 51a3: nibbles fold back to 20899; digit sum 19 ≡ 20899 (mod 15). -/
theorem enumeration_hex4_51a3 : reassembles 20899 = true ∧ castsFifteens 20899 = true := by decide

/-- 51a4: nibbles fold back to 20900; digit sum 20 ≡ 20900 (mod 15). -/
theorem enumeration_hex4_51a4 : reassembles 20900 = true ∧ castsFifteens 20900 = true := by decide

/-- 51a5: nibbles fold back to 20901; digit sum 21 ≡ 20901 (mod 15). -/
theorem enumeration_hex4_51a5 : reassembles 20901 = true ∧ castsFifteens 20901 = true := by decide

/-- 51a6: nibbles fold back to 20902; digit sum 22 ≡ 20902 (mod 15). -/
theorem enumeration_hex4_51a6 : reassembles 20902 = true ∧ castsFifteens 20902 = true := by decide

/-- 51a7: nibbles fold back to 20903; digit sum 23 ≡ 20903 (mod 15). -/
theorem enumeration_hex4_51a7 : reassembles 20903 = true ∧ castsFifteens 20903 = true := by decide

/-- 51a8: nibbles fold back to 20904; digit sum 24 ≡ 20904 (mod 15). -/
theorem enumeration_hex4_51a8 : reassembles 20904 = true ∧ castsFifteens 20904 = true := by decide

/-- 51a9: nibbles fold back to 20905; digit sum 25 ≡ 20905 (mod 15). -/
theorem enumeration_hex4_51a9 : reassembles 20905 = true ∧ castsFifteens 20905 = true := by decide

/-- 51aa: nibbles fold back to 20906; digit sum 26 ≡ 20906 (mod 15). -/
theorem enumeration_hex4_51aa : reassembles 20906 = true ∧ castsFifteens 20906 = true := by decide

/-- 51ab: nibbles fold back to 20907; digit sum 27 ≡ 20907 (mod 15). -/
theorem enumeration_hex4_51ab : reassembles 20907 = true ∧ castsFifteens 20907 = true := by decide

/-- 51ac: nibbles fold back to 20908; digit sum 28 ≡ 20908 (mod 15). -/
theorem enumeration_hex4_51ac : reassembles 20908 = true ∧ castsFifteens 20908 = true := by decide

/-- 51ad: nibbles fold back to 20909; digit sum 29 ≡ 20909 (mod 15). -/
theorem enumeration_hex4_51ad : reassembles 20909 = true ∧ castsFifteens 20909 = true := by decide

/-- 51ae: nibbles fold back to 20910; digit sum 30 ≡ 20910 (mod 15). -/
theorem enumeration_hex4_51ae : reassembles 20910 = true ∧ castsFifteens 20910 = true := by decide

/-- 51af: nibbles fold back to 20911; digit sum 31 ≡ 20911 (mod 15). -/
theorem enumeration_hex4_51af : reassembles 20911 = true ∧ castsFifteens 20911 = true := by decide

/-- 51b0: nibbles fold back to 20912; digit sum 17 ≡ 20912 (mod 15). -/
theorem enumeration_hex4_51b0 : reassembles 20912 = true ∧ castsFifteens 20912 = true := by decide

/-- 51b1: nibbles fold back to 20913; digit sum 18 ≡ 20913 (mod 15). -/
theorem enumeration_hex4_51b1 : reassembles 20913 = true ∧ castsFifteens 20913 = true := by decide

/-- 51b2: nibbles fold back to 20914; digit sum 19 ≡ 20914 (mod 15). -/
theorem enumeration_hex4_51b2 : reassembles 20914 = true ∧ castsFifteens 20914 = true := by decide

/-- 51b3: nibbles fold back to 20915; digit sum 20 ≡ 20915 (mod 15). -/
theorem enumeration_hex4_51b3 : reassembles 20915 = true ∧ castsFifteens 20915 = true := by decide

/-- 51b4: nibbles fold back to 20916; digit sum 21 ≡ 20916 (mod 15). -/
theorem enumeration_hex4_51b4 : reassembles 20916 = true ∧ castsFifteens 20916 = true := by decide

/-- 51b5: nibbles fold back to 20917; digit sum 22 ≡ 20917 (mod 15). -/
theorem enumeration_hex4_51b5 : reassembles 20917 = true ∧ castsFifteens 20917 = true := by decide

/-- 51b6: nibbles fold back to 20918; digit sum 23 ≡ 20918 (mod 15). -/
theorem enumeration_hex4_51b6 : reassembles 20918 = true ∧ castsFifteens 20918 = true := by decide

/-- 51b7: nibbles fold back to 20919; digit sum 24 ≡ 20919 (mod 15). -/
theorem enumeration_hex4_51b7 : reassembles 20919 = true ∧ castsFifteens 20919 = true := by decide

/-- 51b8: nibbles fold back to 20920; digit sum 25 ≡ 20920 (mod 15). -/
theorem enumeration_hex4_51b8 : reassembles 20920 = true ∧ castsFifteens 20920 = true := by decide

/-- 51b9: nibbles fold back to 20921; digit sum 26 ≡ 20921 (mod 15). -/
theorem enumeration_hex4_51b9 : reassembles 20921 = true ∧ castsFifteens 20921 = true := by decide

/-- 51ba: nibbles fold back to 20922; digit sum 27 ≡ 20922 (mod 15). -/
theorem enumeration_hex4_51ba : reassembles 20922 = true ∧ castsFifteens 20922 = true := by decide

/-- 51bb: nibbles fold back to 20923; digit sum 28 ≡ 20923 (mod 15). -/
theorem enumeration_hex4_51bb : reassembles 20923 = true ∧ castsFifteens 20923 = true := by decide

/-- 51bc: nibbles fold back to 20924; digit sum 29 ≡ 20924 (mod 15). -/
theorem enumeration_hex4_51bc : reassembles 20924 = true ∧ castsFifteens 20924 = true := by decide

/-- 51bd: nibbles fold back to 20925; digit sum 30 ≡ 20925 (mod 15). -/
theorem enumeration_hex4_51bd : reassembles 20925 = true ∧ castsFifteens 20925 = true := by decide

/-- 51be: nibbles fold back to 20926; digit sum 31 ≡ 20926 (mod 15). -/
theorem enumeration_hex4_51be : reassembles 20926 = true ∧ castsFifteens 20926 = true := by decide

/-- 51bf: nibbles fold back to 20927; digit sum 32 ≡ 20927 (mod 15). -/
theorem enumeration_hex4_51bf : reassembles 20927 = true ∧ castsFifteens 20927 = true := by decide

/-- 51c0: nibbles fold back to 20928; digit sum 18 ≡ 20928 (mod 15). -/
theorem enumeration_hex4_51c0 : reassembles 20928 = true ∧ castsFifteens 20928 = true := by decide

/-- 51c1: nibbles fold back to 20929; digit sum 19 ≡ 20929 (mod 15). -/
theorem enumeration_hex4_51c1 : reassembles 20929 = true ∧ castsFifteens 20929 = true := by decide

/-- 51c2: nibbles fold back to 20930; digit sum 20 ≡ 20930 (mod 15). -/
theorem enumeration_hex4_51c2 : reassembles 20930 = true ∧ castsFifteens 20930 = true := by decide

/-- 51c3: nibbles fold back to 20931; digit sum 21 ≡ 20931 (mod 15). -/
theorem enumeration_hex4_51c3 : reassembles 20931 = true ∧ castsFifteens 20931 = true := by decide

/-- 51c4: nibbles fold back to 20932; digit sum 22 ≡ 20932 (mod 15). -/
theorem enumeration_hex4_51c4 : reassembles 20932 = true ∧ castsFifteens 20932 = true := by decide

/-- 51c5: nibbles fold back to 20933; digit sum 23 ≡ 20933 (mod 15). -/
theorem enumeration_hex4_51c5 : reassembles 20933 = true ∧ castsFifteens 20933 = true := by decide

/-- 51c6: nibbles fold back to 20934; digit sum 24 ≡ 20934 (mod 15). -/
theorem enumeration_hex4_51c6 : reassembles 20934 = true ∧ castsFifteens 20934 = true := by decide

/-- 51c7: nibbles fold back to 20935; digit sum 25 ≡ 20935 (mod 15). -/
theorem enumeration_hex4_51c7 : reassembles 20935 = true ∧ castsFifteens 20935 = true := by decide

/-- 51c8: nibbles fold back to 20936; digit sum 26 ≡ 20936 (mod 15). -/
theorem enumeration_hex4_51c8 : reassembles 20936 = true ∧ castsFifteens 20936 = true := by decide

/-- 51c9: nibbles fold back to 20937; digit sum 27 ≡ 20937 (mod 15). -/
theorem enumeration_hex4_51c9 : reassembles 20937 = true ∧ castsFifteens 20937 = true := by decide

/-- 51ca: nibbles fold back to 20938; digit sum 28 ≡ 20938 (mod 15). -/
theorem enumeration_hex4_51ca : reassembles 20938 = true ∧ castsFifteens 20938 = true := by decide

/-- 51cb: nibbles fold back to 20939; digit sum 29 ≡ 20939 (mod 15). -/
theorem enumeration_hex4_51cb : reassembles 20939 = true ∧ castsFifteens 20939 = true := by decide

/-- 51cc: nibbles fold back to 20940; digit sum 30 ≡ 20940 (mod 15). -/
theorem enumeration_hex4_51cc : reassembles 20940 = true ∧ castsFifteens 20940 = true := by decide

/-- 51cd: nibbles fold back to 20941; digit sum 31 ≡ 20941 (mod 15). -/
theorem enumeration_hex4_51cd : reassembles 20941 = true ∧ castsFifteens 20941 = true := by decide

/-- 51ce: nibbles fold back to 20942; digit sum 32 ≡ 20942 (mod 15). -/
theorem enumeration_hex4_51ce : reassembles 20942 = true ∧ castsFifteens 20942 = true := by decide

/-- 51cf: nibbles fold back to 20943; digit sum 33 ≡ 20943 (mod 15). -/
theorem enumeration_hex4_51cf : reassembles 20943 = true ∧ castsFifteens 20943 = true := by decide

/-- 51d0: nibbles fold back to 20944; digit sum 19 ≡ 20944 (mod 15). -/
theorem enumeration_hex4_51d0 : reassembles 20944 = true ∧ castsFifteens 20944 = true := by decide

/-- 51d1: nibbles fold back to 20945; digit sum 20 ≡ 20945 (mod 15). -/
theorem enumeration_hex4_51d1 : reassembles 20945 = true ∧ castsFifteens 20945 = true := by decide

/-- 51d2: nibbles fold back to 20946; digit sum 21 ≡ 20946 (mod 15). -/
theorem enumeration_hex4_51d2 : reassembles 20946 = true ∧ castsFifteens 20946 = true := by decide

/-- 51d3: nibbles fold back to 20947; digit sum 22 ≡ 20947 (mod 15). -/
theorem enumeration_hex4_51d3 : reassembles 20947 = true ∧ castsFifteens 20947 = true := by decide

/-- 51d4: nibbles fold back to 20948; digit sum 23 ≡ 20948 (mod 15). -/
theorem enumeration_hex4_51d4 : reassembles 20948 = true ∧ castsFifteens 20948 = true := by decide

/-- 51d5: nibbles fold back to 20949; digit sum 24 ≡ 20949 (mod 15). -/
theorem enumeration_hex4_51d5 : reassembles 20949 = true ∧ castsFifteens 20949 = true := by decide

/-- 51d6: nibbles fold back to 20950; digit sum 25 ≡ 20950 (mod 15). -/
theorem enumeration_hex4_51d6 : reassembles 20950 = true ∧ castsFifteens 20950 = true := by decide

/-- 51d7: nibbles fold back to 20951; digit sum 26 ≡ 20951 (mod 15). -/
theorem enumeration_hex4_51d7 : reassembles 20951 = true ∧ castsFifteens 20951 = true := by decide

/-- 51d8: nibbles fold back to 20952; digit sum 27 ≡ 20952 (mod 15). -/
theorem enumeration_hex4_51d8 : reassembles 20952 = true ∧ castsFifteens 20952 = true := by decide

/-- 51d9: nibbles fold back to 20953; digit sum 28 ≡ 20953 (mod 15). -/
theorem enumeration_hex4_51d9 : reassembles 20953 = true ∧ castsFifteens 20953 = true := by decide

/-- 51da: nibbles fold back to 20954; digit sum 29 ≡ 20954 (mod 15). -/
theorem enumeration_hex4_51da : reassembles 20954 = true ∧ castsFifteens 20954 = true := by decide

/-- 51db: nibbles fold back to 20955; digit sum 30 ≡ 20955 (mod 15). -/
theorem enumeration_hex4_51db : reassembles 20955 = true ∧ castsFifteens 20955 = true := by decide

/-- 51dc: nibbles fold back to 20956; digit sum 31 ≡ 20956 (mod 15). -/
theorem enumeration_hex4_51dc : reassembles 20956 = true ∧ castsFifteens 20956 = true := by decide

/-- 51dd: nibbles fold back to 20957; digit sum 32 ≡ 20957 (mod 15). -/
theorem enumeration_hex4_51dd : reassembles 20957 = true ∧ castsFifteens 20957 = true := by decide

/-- 51de: nibbles fold back to 20958; digit sum 33 ≡ 20958 (mod 15). -/
theorem enumeration_hex4_51de : reassembles 20958 = true ∧ castsFifteens 20958 = true := by decide

/-- 51df: nibbles fold back to 20959; digit sum 34 ≡ 20959 (mod 15). -/
theorem enumeration_hex4_51df : reassembles 20959 = true ∧ castsFifteens 20959 = true := by decide

/-- 51e0: nibbles fold back to 20960; digit sum 20 ≡ 20960 (mod 15). -/
theorem enumeration_hex4_51e0 : reassembles 20960 = true ∧ castsFifteens 20960 = true := by decide

/-- 51e1: nibbles fold back to 20961; digit sum 21 ≡ 20961 (mod 15). -/
theorem enumeration_hex4_51e1 : reassembles 20961 = true ∧ castsFifteens 20961 = true := by decide

/-- 51e2: nibbles fold back to 20962; digit sum 22 ≡ 20962 (mod 15). -/
theorem enumeration_hex4_51e2 : reassembles 20962 = true ∧ castsFifteens 20962 = true := by decide

/-- 51e3: nibbles fold back to 20963; digit sum 23 ≡ 20963 (mod 15). -/
theorem enumeration_hex4_51e3 : reassembles 20963 = true ∧ castsFifteens 20963 = true := by decide

/-- 51e4: nibbles fold back to 20964; digit sum 24 ≡ 20964 (mod 15). -/
theorem enumeration_hex4_51e4 : reassembles 20964 = true ∧ castsFifteens 20964 = true := by decide

/-- 51e5: nibbles fold back to 20965; digit sum 25 ≡ 20965 (mod 15). -/
theorem enumeration_hex4_51e5 : reassembles 20965 = true ∧ castsFifteens 20965 = true := by decide

/-- 51e6: nibbles fold back to 20966; digit sum 26 ≡ 20966 (mod 15). -/
theorem enumeration_hex4_51e6 : reassembles 20966 = true ∧ castsFifteens 20966 = true := by decide

/-- 51e7: nibbles fold back to 20967; digit sum 27 ≡ 20967 (mod 15). -/
theorem enumeration_hex4_51e7 : reassembles 20967 = true ∧ castsFifteens 20967 = true := by decide

/-- 51e8: nibbles fold back to 20968; digit sum 28 ≡ 20968 (mod 15). -/
theorem enumeration_hex4_51e8 : reassembles 20968 = true ∧ castsFifteens 20968 = true := by decide

/-- 51e9: nibbles fold back to 20969; digit sum 29 ≡ 20969 (mod 15). -/
theorem enumeration_hex4_51e9 : reassembles 20969 = true ∧ castsFifteens 20969 = true := by decide

/-- 51ea: nibbles fold back to 20970; digit sum 30 ≡ 20970 (mod 15). -/
theorem enumeration_hex4_51ea : reassembles 20970 = true ∧ castsFifteens 20970 = true := by decide

/-- 51eb: nibbles fold back to 20971; digit sum 31 ≡ 20971 (mod 15). -/
theorem enumeration_hex4_51eb : reassembles 20971 = true ∧ castsFifteens 20971 = true := by decide

/-- 51ec: nibbles fold back to 20972; digit sum 32 ≡ 20972 (mod 15). -/
theorem enumeration_hex4_51ec : reassembles 20972 = true ∧ castsFifteens 20972 = true := by decide

/-- 51ed: nibbles fold back to 20973; digit sum 33 ≡ 20973 (mod 15). -/
theorem enumeration_hex4_51ed : reassembles 20973 = true ∧ castsFifteens 20973 = true := by decide

/-- 51ee: nibbles fold back to 20974; digit sum 34 ≡ 20974 (mod 15). -/
theorem enumeration_hex4_51ee : reassembles 20974 = true ∧ castsFifteens 20974 = true := by decide

/-- 51ef: nibbles fold back to 20975; digit sum 35 ≡ 20975 (mod 15). -/
theorem enumeration_hex4_51ef : reassembles 20975 = true ∧ castsFifteens 20975 = true := by decide

/-- 51f0: nibbles fold back to 20976; digit sum 21 ≡ 20976 (mod 15). -/
theorem enumeration_hex4_51f0 : reassembles 20976 = true ∧ castsFifteens 20976 = true := by decide

/-- 51f1: nibbles fold back to 20977; digit sum 22 ≡ 20977 (mod 15). -/
theorem enumeration_hex4_51f1 : reassembles 20977 = true ∧ castsFifteens 20977 = true := by decide

/-- 51f2: nibbles fold back to 20978; digit sum 23 ≡ 20978 (mod 15). -/
theorem enumeration_hex4_51f2 : reassembles 20978 = true ∧ castsFifteens 20978 = true := by decide

/-- 51f3: nibbles fold back to 20979; digit sum 24 ≡ 20979 (mod 15). -/
theorem enumeration_hex4_51f3 : reassembles 20979 = true ∧ castsFifteens 20979 = true := by decide

/-- 51f4: nibbles fold back to 20980; digit sum 25 ≡ 20980 (mod 15). -/
theorem enumeration_hex4_51f4 : reassembles 20980 = true ∧ castsFifteens 20980 = true := by decide

/-- 51f5: nibbles fold back to 20981; digit sum 26 ≡ 20981 (mod 15). -/
theorem enumeration_hex4_51f5 : reassembles 20981 = true ∧ castsFifteens 20981 = true := by decide

/-- 51f6: nibbles fold back to 20982; digit sum 27 ≡ 20982 (mod 15). -/
theorem enumeration_hex4_51f6 : reassembles 20982 = true ∧ castsFifteens 20982 = true := by decide

/-- 51f7: nibbles fold back to 20983; digit sum 28 ≡ 20983 (mod 15). -/
theorem enumeration_hex4_51f7 : reassembles 20983 = true ∧ castsFifteens 20983 = true := by decide

/-- 51f8: nibbles fold back to 20984; digit sum 29 ≡ 20984 (mod 15). -/
theorem enumeration_hex4_51f8 : reassembles 20984 = true ∧ castsFifteens 20984 = true := by decide

/-- 51f9: nibbles fold back to 20985; digit sum 30 ≡ 20985 (mod 15). -/
theorem enumeration_hex4_51f9 : reassembles 20985 = true ∧ castsFifteens 20985 = true := by decide

/-- 51fa: nibbles fold back to 20986; digit sum 31 ≡ 20986 (mod 15). -/
theorem enumeration_hex4_51fa : reassembles 20986 = true ∧ castsFifteens 20986 = true := by decide

/-- 51fb: nibbles fold back to 20987; digit sum 32 ≡ 20987 (mod 15). -/
theorem enumeration_hex4_51fb : reassembles 20987 = true ∧ castsFifteens 20987 = true := by decide

/-- 51fc: nibbles fold back to 20988; digit sum 33 ≡ 20988 (mod 15). -/
theorem enumeration_hex4_51fc : reassembles 20988 = true ∧ castsFifteens 20988 = true := by decide

/-- 51fd: nibbles fold back to 20989; digit sum 34 ≡ 20989 (mod 15). -/
theorem enumeration_hex4_51fd : reassembles 20989 = true ∧ castsFifteens 20989 = true := by decide

/-- 51fe: nibbles fold back to 20990; digit sum 35 ≡ 20990 (mod 15). -/
theorem enumeration_hex4_51fe : reassembles 20990 = true ∧ castsFifteens 20990 = true := by decide

/-- 51ff: nibbles fold back to 20991; digit sum 36 ≡ 20991 (mod 15). -/
theorem enumeration_hex4_51ff : reassembles 20991 = true ∧ castsFifteens 20991 = true := by decide

/-- 5200: nibbles fold back to 20992; digit sum 7 ≡ 20992 (mod 15). -/
theorem enumeration_hex4_5200 : reassembles 20992 = true ∧ castsFifteens 20992 = true := by decide

/-- 5201: nibbles fold back to 20993; digit sum 8 ≡ 20993 (mod 15). -/
theorem enumeration_hex4_5201 : reassembles 20993 = true ∧ castsFifteens 20993 = true := by decide

/-- 5202: nibbles fold back to 20994; digit sum 9 ≡ 20994 (mod 15). -/
theorem enumeration_hex4_5202 : reassembles 20994 = true ∧ castsFifteens 20994 = true := by decide

/-- 5203: nibbles fold back to 20995; digit sum 10 ≡ 20995 (mod 15). -/
theorem enumeration_hex4_5203 : reassembles 20995 = true ∧ castsFifteens 20995 = true := by decide

/-- 5204: nibbles fold back to 20996; digit sum 11 ≡ 20996 (mod 15). -/
theorem enumeration_hex4_5204 : reassembles 20996 = true ∧ castsFifteens 20996 = true := by decide

/-- 5205: nibbles fold back to 20997; digit sum 12 ≡ 20997 (mod 15). -/
theorem enumeration_hex4_5205 : reassembles 20997 = true ∧ castsFifteens 20997 = true := by decide

/-- 5206: nibbles fold back to 20998; digit sum 13 ≡ 20998 (mod 15). -/
theorem enumeration_hex4_5206 : reassembles 20998 = true ∧ castsFifteens 20998 = true := by decide

/-- 5207: nibbles fold back to 20999; digit sum 14 ≡ 20999 (mod 15). -/
theorem enumeration_hex4_5207 : reassembles 20999 = true ∧ castsFifteens 20999 = true := by decide

/-- 5208: nibbles fold back to 21000; digit sum 15 ≡ 21000 (mod 15). -/
theorem enumeration_hex4_5208 : reassembles 21000 = true ∧ castsFifteens 21000 = true := by decide

/-- 5209: nibbles fold back to 21001; digit sum 16 ≡ 21001 (mod 15). -/
theorem enumeration_hex4_5209 : reassembles 21001 = true ∧ castsFifteens 21001 = true := by decide

/-- 520a: nibbles fold back to 21002; digit sum 17 ≡ 21002 (mod 15). -/
theorem enumeration_hex4_520a : reassembles 21002 = true ∧ castsFifteens 21002 = true := by decide

/-- 520b: nibbles fold back to 21003; digit sum 18 ≡ 21003 (mod 15). -/
theorem enumeration_hex4_520b : reassembles 21003 = true ∧ castsFifteens 21003 = true := by decide

/-- 520c: nibbles fold back to 21004; digit sum 19 ≡ 21004 (mod 15). -/
theorem enumeration_hex4_520c : reassembles 21004 = true ∧ castsFifteens 21004 = true := by decide

/-- 520d: nibbles fold back to 21005; digit sum 20 ≡ 21005 (mod 15). -/
theorem enumeration_hex4_520d : reassembles 21005 = true ∧ castsFifteens 21005 = true := by decide

/-- 520e: nibbles fold back to 21006; digit sum 21 ≡ 21006 (mod 15). -/
theorem enumeration_hex4_520e : reassembles 21006 = true ∧ castsFifteens 21006 = true := by decide

/-- 520f: nibbles fold back to 21007; digit sum 22 ≡ 21007 (mod 15). -/
theorem enumeration_hex4_520f : reassembles 21007 = true ∧ castsFifteens 21007 = true := by decide

/-- 5210: nibbles fold back to 21008; digit sum 8 ≡ 21008 (mod 15). -/
theorem enumeration_hex4_5210 : reassembles 21008 = true ∧ castsFifteens 21008 = true := by decide

/-- 5211: nibbles fold back to 21009; digit sum 9 ≡ 21009 (mod 15). -/
theorem enumeration_hex4_5211 : reassembles 21009 = true ∧ castsFifteens 21009 = true := by decide

/-- 5212: nibbles fold back to 21010; digit sum 10 ≡ 21010 (mod 15). -/
theorem enumeration_hex4_5212 : reassembles 21010 = true ∧ castsFifteens 21010 = true := by decide

/-- 5213: nibbles fold back to 21011; digit sum 11 ≡ 21011 (mod 15). -/
theorem enumeration_hex4_5213 : reassembles 21011 = true ∧ castsFifteens 21011 = true := by decide

/-- 5214: nibbles fold back to 21012; digit sum 12 ≡ 21012 (mod 15). -/
theorem enumeration_hex4_5214 : reassembles 21012 = true ∧ castsFifteens 21012 = true := by decide

/-- 5215: nibbles fold back to 21013; digit sum 13 ≡ 21013 (mod 15). -/
theorem enumeration_hex4_5215 : reassembles 21013 = true ∧ castsFifteens 21013 = true := by decide

/-- 5216: nibbles fold back to 21014; digit sum 14 ≡ 21014 (mod 15). -/
theorem enumeration_hex4_5216 : reassembles 21014 = true ∧ castsFifteens 21014 = true := by decide

/-- 5217: nibbles fold back to 21015; digit sum 15 ≡ 21015 (mod 15). -/
theorem enumeration_hex4_5217 : reassembles 21015 = true ∧ castsFifteens 21015 = true := by decide

/-- 5218: nibbles fold back to 21016; digit sum 16 ≡ 21016 (mod 15). -/
theorem enumeration_hex4_5218 : reassembles 21016 = true ∧ castsFifteens 21016 = true := by decide

/-- 5219: nibbles fold back to 21017; digit sum 17 ≡ 21017 (mod 15). -/
theorem enumeration_hex4_5219 : reassembles 21017 = true ∧ castsFifteens 21017 = true := by decide

/-- 521a: nibbles fold back to 21018; digit sum 18 ≡ 21018 (mod 15). -/
theorem enumeration_hex4_521a : reassembles 21018 = true ∧ castsFifteens 21018 = true := by decide

/-- 521b: nibbles fold back to 21019; digit sum 19 ≡ 21019 (mod 15). -/
theorem enumeration_hex4_521b : reassembles 21019 = true ∧ castsFifteens 21019 = true := by decide

/-- 521c: nibbles fold back to 21020; digit sum 20 ≡ 21020 (mod 15). -/
theorem enumeration_hex4_521c : reassembles 21020 = true ∧ castsFifteens 21020 = true := by decide

/-- 521d: nibbles fold back to 21021; digit sum 21 ≡ 21021 (mod 15). -/
theorem enumeration_hex4_521d : reassembles 21021 = true ∧ castsFifteens 21021 = true := by decide

/-- 521e: nibbles fold back to 21022; digit sum 22 ≡ 21022 (mod 15). -/
theorem enumeration_hex4_521e : reassembles 21022 = true ∧ castsFifteens 21022 = true := by decide

/-- 521f: nibbles fold back to 21023; digit sum 23 ≡ 21023 (mod 15). -/
theorem enumeration_hex4_521f : reassembles 21023 = true ∧ castsFifteens 21023 = true := by decide

/-- 5220: nibbles fold back to 21024; digit sum 9 ≡ 21024 (mod 15). -/
theorem enumeration_hex4_5220 : reassembles 21024 = true ∧ castsFifteens 21024 = true := by decide

/-- 5221: nibbles fold back to 21025; digit sum 10 ≡ 21025 (mod 15). -/
theorem enumeration_hex4_5221 : reassembles 21025 = true ∧ castsFifteens 21025 = true := by decide

/-- 5222: nibbles fold back to 21026; digit sum 11 ≡ 21026 (mod 15). -/
theorem enumeration_hex4_5222 : reassembles 21026 = true ∧ castsFifteens 21026 = true := by decide

/-- 5223: nibbles fold back to 21027; digit sum 12 ≡ 21027 (mod 15). -/
theorem enumeration_hex4_5223 : reassembles 21027 = true ∧ castsFifteens 21027 = true := by decide

/-- 5224: nibbles fold back to 21028; digit sum 13 ≡ 21028 (mod 15). -/
theorem enumeration_hex4_5224 : reassembles 21028 = true ∧ castsFifteens 21028 = true := by decide

/-- 5225: nibbles fold back to 21029; digit sum 14 ≡ 21029 (mod 15). -/
theorem enumeration_hex4_5225 : reassembles 21029 = true ∧ castsFifteens 21029 = true := by decide

/-- 5226: nibbles fold back to 21030; digit sum 15 ≡ 21030 (mod 15). -/
theorem enumeration_hex4_5226 : reassembles 21030 = true ∧ castsFifteens 21030 = true := by decide

/-- 5227: nibbles fold back to 21031; digit sum 16 ≡ 21031 (mod 15). -/
theorem enumeration_hex4_5227 : reassembles 21031 = true ∧ castsFifteens 21031 = true := by decide

/-- 5228: nibbles fold back to 21032; digit sum 17 ≡ 21032 (mod 15). -/
theorem enumeration_hex4_5228 : reassembles 21032 = true ∧ castsFifteens 21032 = true := by decide

/-- 5229: nibbles fold back to 21033; digit sum 18 ≡ 21033 (mod 15). -/
theorem enumeration_hex4_5229 : reassembles 21033 = true ∧ castsFifteens 21033 = true := by decide

/-- 522a: nibbles fold back to 21034; digit sum 19 ≡ 21034 (mod 15). -/
theorem enumeration_hex4_522a : reassembles 21034 = true ∧ castsFifteens 21034 = true := by decide

/-- 522b: nibbles fold back to 21035; digit sum 20 ≡ 21035 (mod 15). -/
theorem enumeration_hex4_522b : reassembles 21035 = true ∧ castsFifteens 21035 = true := by decide

/-- 522c: nibbles fold back to 21036; digit sum 21 ≡ 21036 (mod 15). -/
theorem enumeration_hex4_522c : reassembles 21036 = true ∧ castsFifteens 21036 = true := by decide

/-- 522d: nibbles fold back to 21037; digit sum 22 ≡ 21037 (mod 15). -/
theorem enumeration_hex4_522d : reassembles 21037 = true ∧ castsFifteens 21037 = true := by decide

/-- 522e: nibbles fold back to 21038; digit sum 23 ≡ 21038 (mod 15). -/
theorem enumeration_hex4_522e : reassembles 21038 = true ∧ castsFifteens 21038 = true := by decide

/-- 522f: nibbles fold back to 21039; digit sum 24 ≡ 21039 (mod 15). -/
theorem enumeration_hex4_522f : reassembles 21039 = true ∧ castsFifteens 21039 = true := by decide

/-- 5230: nibbles fold back to 21040; digit sum 10 ≡ 21040 (mod 15). -/
theorem enumeration_hex4_5230 : reassembles 21040 = true ∧ castsFifteens 21040 = true := by decide

/-- 5231: nibbles fold back to 21041; digit sum 11 ≡ 21041 (mod 15). -/
theorem enumeration_hex4_5231 : reassembles 21041 = true ∧ castsFifteens 21041 = true := by decide

/-- 5232: nibbles fold back to 21042; digit sum 12 ≡ 21042 (mod 15). -/
theorem enumeration_hex4_5232 : reassembles 21042 = true ∧ castsFifteens 21042 = true := by decide

/-- 5233: nibbles fold back to 21043; digit sum 13 ≡ 21043 (mod 15). -/
theorem enumeration_hex4_5233 : reassembles 21043 = true ∧ castsFifteens 21043 = true := by decide

/-- 5234: nibbles fold back to 21044; digit sum 14 ≡ 21044 (mod 15). -/
theorem enumeration_hex4_5234 : reassembles 21044 = true ∧ castsFifteens 21044 = true := by decide

/-- 5235: nibbles fold back to 21045; digit sum 15 ≡ 21045 (mod 15). -/
theorem enumeration_hex4_5235 : reassembles 21045 = true ∧ castsFifteens 21045 = true := by decide

/-- 5236: nibbles fold back to 21046; digit sum 16 ≡ 21046 (mod 15). -/
theorem enumeration_hex4_5236 : reassembles 21046 = true ∧ castsFifteens 21046 = true := by decide

/-- 5237: nibbles fold back to 21047; digit sum 17 ≡ 21047 (mod 15). -/
theorem enumeration_hex4_5237 : reassembles 21047 = true ∧ castsFifteens 21047 = true := by decide

/-- 5238: nibbles fold back to 21048; digit sum 18 ≡ 21048 (mod 15). -/
theorem enumeration_hex4_5238 : reassembles 21048 = true ∧ castsFifteens 21048 = true := by decide

/-- 5239: nibbles fold back to 21049; digit sum 19 ≡ 21049 (mod 15). -/
theorem enumeration_hex4_5239 : reassembles 21049 = true ∧ castsFifteens 21049 = true := by decide

/-- 523a: nibbles fold back to 21050; digit sum 20 ≡ 21050 (mod 15). -/
theorem enumeration_hex4_523a : reassembles 21050 = true ∧ castsFifteens 21050 = true := by decide

/-- 523b: nibbles fold back to 21051; digit sum 21 ≡ 21051 (mod 15). -/
theorem enumeration_hex4_523b : reassembles 21051 = true ∧ castsFifteens 21051 = true := by decide

/-- 523c: nibbles fold back to 21052; digit sum 22 ≡ 21052 (mod 15). -/
theorem enumeration_hex4_523c : reassembles 21052 = true ∧ castsFifteens 21052 = true := by decide

/-- 523d: nibbles fold back to 21053; digit sum 23 ≡ 21053 (mod 15). -/
theorem enumeration_hex4_523d : reassembles 21053 = true ∧ castsFifteens 21053 = true := by decide

/-- 523e: nibbles fold back to 21054; digit sum 24 ≡ 21054 (mod 15). -/
theorem enumeration_hex4_523e : reassembles 21054 = true ∧ castsFifteens 21054 = true := by decide

/-- 523f: nibbles fold back to 21055; digit sum 25 ≡ 21055 (mod 15). -/
theorem enumeration_hex4_523f : reassembles 21055 = true ∧ castsFifteens 21055 = true := by decide

/-- 5240: nibbles fold back to 21056; digit sum 11 ≡ 21056 (mod 15). -/
theorem enumeration_hex4_5240 : reassembles 21056 = true ∧ castsFifteens 21056 = true := by decide

/-- 5241: nibbles fold back to 21057; digit sum 12 ≡ 21057 (mod 15). -/
theorem enumeration_hex4_5241 : reassembles 21057 = true ∧ castsFifteens 21057 = true := by decide

/-- 5242: nibbles fold back to 21058; digit sum 13 ≡ 21058 (mod 15). -/
theorem enumeration_hex4_5242 : reassembles 21058 = true ∧ castsFifteens 21058 = true := by decide

/-- 5243: nibbles fold back to 21059; digit sum 14 ≡ 21059 (mod 15). -/
theorem enumeration_hex4_5243 : reassembles 21059 = true ∧ castsFifteens 21059 = true := by decide

/-- 5244: nibbles fold back to 21060; digit sum 15 ≡ 21060 (mod 15). -/
theorem enumeration_hex4_5244 : reassembles 21060 = true ∧ castsFifteens 21060 = true := by decide

/-- 5245: nibbles fold back to 21061; digit sum 16 ≡ 21061 (mod 15). -/
theorem enumeration_hex4_5245 : reassembles 21061 = true ∧ castsFifteens 21061 = true := by decide

/-- 5246: nibbles fold back to 21062; digit sum 17 ≡ 21062 (mod 15). -/
theorem enumeration_hex4_5246 : reassembles 21062 = true ∧ castsFifteens 21062 = true := by decide

/-- 5247: nibbles fold back to 21063; digit sum 18 ≡ 21063 (mod 15). -/
theorem enumeration_hex4_5247 : reassembles 21063 = true ∧ castsFifteens 21063 = true := by decide

/-- 5248: nibbles fold back to 21064; digit sum 19 ≡ 21064 (mod 15). -/
theorem enumeration_hex4_5248 : reassembles 21064 = true ∧ castsFifteens 21064 = true := by decide

/-- 5249: nibbles fold back to 21065; digit sum 20 ≡ 21065 (mod 15). -/
theorem enumeration_hex4_5249 : reassembles 21065 = true ∧ castsFifteens 21065 = true := by decide

/-- 524a: nibbles fold back to 21066; digit sum 21 ≡ 21066 (mod 15). -/
theorem enumeration_hex4_524a : reassembles 21066 = true ∧ castsFifteens 21066 = true := by decide

/-- 524b: nibbles fold back to 21067; digit sum 22 ≡ 21067 (mod 15). -/
theorem enumeration_hex4_524b : reassembles 21067 = true ∧ castsFifteens 21067 = true := by decide

/-- 524c: nibbles fold back to 21068; digit sum 23 ≡ 21068 (mod 15). -/
theorem enumeration_hex4_524c : reassembles 21068 = true ∧ castsFifteens 21068 = true := by decide

/-- 524d: nibbles fold back to 21069; digit sum 24 ≡ 21069 (mod 15). -/
theorem enumeration_hex4_524d : reassembles 21069 = true ∧ castsFifteens 21069 = true := by decide

/-- 524e: nibbles fold back to 21070; digit sum 25 ≡ 21070 (mod 15). -/
theorem enumeration_hex4_524e : reassembles 21070 = true ∧ castsFifteens 21070 = true := by decide

/-- 524f: nibbles fold back to 21071; digit sum 26 ≡ 21071 (mod 15). -/
theorem enumeration_hex4_524f : reassembles 21071 = true ∧ castsFifteens 21071 = true := by decide

/-- 5250: nibbles fold back to 21072; digit sum 12 ≡ 21072 (mod 15). -/
theorem enumeration_hex4_5250 : reassembles 21072 = true ∧ castsFifteens 21072 = true := by decide

/-- 5251: nibbles fold back to 21073; digit sum 13 ≡ 21073 (mod 15). -/
theorem enumeration_hex4_5251 : reassembles 21073 = true ∧ castsFifteens 21073 = true := by decide

/-- 5252: nibbles fold back to 21074; digit sum 14 ≡ 21074 (mod 15). -/
theorem enumeration_hex4_5252 : reassembles 21074 = true ∧ castsFifteens 21074 = true := by decide

/-- 5253: nibbles fold back to 21075; digit sum 15 ≡ 21075 (mod 15). -/
theorem enumeration_hex4_5253 : reassembles 21075 = true ∧ castsFifteens 21075 = true := by decide

/-- 5254: nibbles fold back to 21076; digit sum 16 ≡ 21076 (mod 15). -/
theorem enumeration_hex4_5254 : reassembles 21076 = true ∧ castsFifteens 21076 = true := by decide

/-- 5255: nibbles fold back to 21077; digit sum 17 ≡ 21077 (mod 15). -/
theorem enumeration_hex4_5255 : reassembles 21077 = true ∧ castsFifteens 21077 = true := by decide

/-- 5256: nibbles fold back to 21078; digit sum 18 ≡ 21078 (mod 15). -/
theorem enumeration_hex4_5256 : reassembles 21078 = true ∧ castsFifteens 21078 = true := by decide

/-- 5257: nibbles fold back to 21079; digit sum 19 ≡ 21079 (mod 15). -/
theorem enumeration_hex4_5257 : reassembles 21079 = true ∧ castsFifteens 21079 = true := by decide

/-- 5258: nibbles fold back to 21080; digit sum 20 ≡ 21080 (mod 15). -/
theorem enumeration_hex4_5258 : reassembles 21080 = true ∧ castsFifteens 21080 = true := by decide

/-- 5259: nibbles fold back to 21081; digit sum 21 ≡ 21081 (mod 15). -/
theorem enumeration_hex4_5259 : reassembles 21081 = true ∧ castsFifteens 21081 = true := by decide

/-- 525a: nibbles fold back to 21082; digit sum 22 ≡ 21082 (mod 15). -/
theorem enumeration_hex4_525a : reassembles 21082 = true ∧ castsFifteens 21082 = true := by decide

/-- 525b: nibbles fold back to 21083; digit sum 23 ≡ 21083 (mod 15). -/
theorem enumeration_hex4_525b : reassembles 21083 = true ∧ castsFifteens 21083 = true := by decide

/-- 525c: nibbles fold back to 21084; digit sum 24 ≡ 21084 (mod 15). -/
theorem enumeration_hex4_525c : reassembles 21084 = true ∧ castsFifteens 21084 = true := by decide

/-- 525d: nibbles fold back to 21085; digit sum 25 ≡ 21085 (mod 15). -/
theorem enumeration_hex4_525d : reassembles 21085 = true ∧ castsFifteens 21085 = true := by decide

/-- 525e: nibbles fold back to 21086; digit sum 26 ≡ 21086 (mod 15). -/
theorem enumeration_hex4_525e : reassembles 21086 = true ∧ castsFifteens 21086 = true := by decide

/-- 525f: nibbles fold back to 21087; digit sum 27 ≡ 21087 (mod 15). -/
theorem enumeration_hex4_525f : reassembles 21087 = true ∧ castsFifteens 21087 = true := by decide

/-- 5260: nibbles fold back to 21088; digit sum 13 ≡ 21088 (mod 15). -/
theorem enumeration_hex4_5260 : reassembles 21088 = true ∧ castsFifteens 21088 = true := by decide

/-- 5261: nibbles fold back to 21089; digit sum 14 ≡ 21089 (mod 15). -/
theorem enumeration_hex4_5261 : reassembles 21089 = true ∧ castsFifteens 21089 = true := by decide

/-- 5262: nibbles fold back to 21090; digit sum 15 ≡ 21090 (mod 15). -/
theorem enumeration_hex4_5262 : reassembles 21090 = true ∧ castsFifteens 21090 = true := by decide

/-- 5263: nibbles fold back to 21091; digit sum 16 ≡ 21091 (mod 15). -/
theorem enumeration_hex4_5263 : reassembles 21091 = true ∧ castsFifteens 21091 = true := by decide

/-- 5264: nibbles fold back to 21092; digit sum 17 ≡ 21092 (mod 15). -/
theorem enumeration_hex4_5264 : reassembles 21092 = true ∧ castsFifteens 21092 = true := by decide

/-- 5265: nibbles fold back to 21093; digit sum 18 ≡ 21093 (mod 15). -/
theorem enumeration_hex4_5265 : reassembles 21093 = true ∧ castsFifteens 21093 = true := by decide

/-- 5266: nibbles fold back to 21094; digit sum 19 ≡ 21094 (mod 15). -/
theorem enumeration_hex4_5266 : reassembles 21094 = true ∧ castsFifteens 21094 = true := by decide

/-- 5267: nibbles fold back to 21095; digit sum 20 ≡ 21095 (mod 15). -/
theorem enumeration_hex4_5267 : reassembles 21095 = true ∧ castsFifteens 21095 = true := by decide

/-- 5268: nibbles fold back to 21096; digit sum 21 ≡ 21096 (mod 15). -/
theorem enumeration_hex4_5268 : reassembles 21096 = true ∧ castsFifteens 21096 = true := by decide

/-- 5269: nibbles fold back to 21097; digit sum 22 ≡ 21097 (mod 15). -/
theorem enumeration_hex4_5269 : reassembles 21097 = true ∧ castsFifteens 21097 = true := by decide

/-- 526a: nibbles fold back to 21098; digit sum 23 ≡ 21098 (mod 15). -/
theorem enumeration_hex4_526a : reassembles 21098 = true ∧ castsFifteens 21098 = true := by decide

/-- 526b: nibbles fold back to 21099; digit sum 24 ≡ 21099 (mod 15). -/
theorem enumeration_hex4_526b : reassembles 21099 = true ∧ castsFifteens 21099 = true := by decide

/-- 526c: nibbles fold back to 21100; digit sum 25 ≡ 21100 (mod 15). -/
theorem enumeration_hex4_526c : reassembles 21100 = true ∧ castsFifteens 21100 = true := by decide

/-- 526d: nibbles fold back to 21101; digit sum 26 ≡ 21101 (mod 15). -/
theorem enumeration_hex4_526d : reassembles 21101 = true ∧ castsFifteens 21101 = true := by decide

/-- 526e: nibbles fold back to 21102; digit sum 27 ≡ 21102 (mod 15). -/
theorem enumeration_hex4_526e : reassembles 21102 = true ∧ castsFifteens 21102 = true := by decide

/-- 526f: nibbles fold back to 21103; digit sum 28 ≡ 21103 (mod 15). -/
theorem enumeration_hex4_526f : reassembles 21103 = true ∧ castsFifteens 21103 = true := by decide

/-- 5270: nibbles fold back to 21104; digit sum 14 ≡ 21104 (mod 15). -/
theorem enumeration_hex4_5270 : reassembles 21104 = true ∧ castsFifteens 21104 = true := by decide

/-- 5271: nibbles fold back to 21105; digit sum 15 ≡ 21105 (mod 15). -/
theorem enumeration_hex4_5271 : reassembles 21105 = true ∧ castsFifteens 21105 = true := by decide

/-- 5272: nibbles fold back to 21106; digit sum 16 ≡ 21106 (mod 15). -/
theorem enumeration_hex4_5272 : reassembles 21106 = true ∧ castsFifteens 21106 = true := by decide

/-- 5273: nibbles fold back to 21107; digit sum 17 ≡ 21107 (mod 15). -/
theorem enumeration_hex4_5273 : reassembles 21107 = true ∧ castsFifteens 21107 = true := by decide

/-- 5274: nibbles fold back to 21108; digit sum 18 ≡ 21108 (mod 15). -/
theorem enumeration_hex4_5274 : reassembles 21108 = true ∧ castsFifteens 21108 = true := by decide

/-- 5275: nibbles fold back to 21109; digit sum 19 ≡ 21109 (mod 15). -/
theorem enumeration_hex4_5275 : reassembles 21109 = true ∧ castsFifteens 21109 = true := by decide

/-- 5276: nibbles fold back to 21110; digit sum 20 ≡ 21110 (mod 15). -/
theorem enumeration_hex4_5276 : reassembles 21110 = true ∧ castsFifteens 21110 = true := by decide

/-- 5277: nibbles fold back to 21111; digit sum 21 ≡ 21111 (mod 15). -/
theorem enumeration_hex4_5277 : reassembles 21111 = true ∧ castsFifteens 21111 = true := by decide

/-- 5278: nibbles fold back to 21112; digit sum 22 ≡ 21112 (mod 15). -/
theorem enumeration_hex4_5278 : reassembles 21112 = true ∧ castsFifteens 21112 = true := by decide

/-- 5279: nibbles fold back to 21113; digit sum 23 ≡ 21113 (mod 15). -/
theorem enumeration_hex4_5279 : reassembles 21113 = true ∧ castsFifteens 21113 = true := by decide

/-- 527a: nibbles fold back to 21114; digit sum 24 ≡ 21114 (mod 15). -/
theorem enumeration_hex4_527a : reassembles 21114 = true ∧ castsFifteens 21114 = true := by decide

/-- 527b: nibbles fold back to 21115; digit sum 25 ≡ 21115 (mod 15). -/
theorem enumeration_hex4_527b : reassembles 21115 = true ∧ castsFifteens 21115 = true := by decide

/-- 527c: nibbles fold back to 21116; digit sum 26 ≡ 21116 (mod 15). -/
theorem enumeration_hex4_527c : reassembles 21116 = true ∧ castsFifteens 21116 = true := by decide

/-- 527d: nibbles fold back to 21117; digit sum 27 ≡ 21117 (mod 15). -/
theorem enumeration_hex4_527d : reassembles 21117 = true ∧ castsFifteens 21117 = true := by decide

/-- 527e: nibbles fold back to 21118; digit sum 28 ≡ 21118 (mod 15). -/
theorem enumeration_hex4_527e : reassembles 21118 = true ∧ castsFifteens 21118 = true := by decide

/-- 527f: nibbles fold back to 21119; digit sum 29 ≡ 21119 (mod 15). -/
theorem enumeration_hex4_527f : reassembles 21119 = true ∧ castsFifteens 21119 = true := by decide

/-- 5280: nibbles fold back to 21120; digit sum 15 ≡ 21120 (mod 15). -/
theorem enumeration_hex4_5280 : reassembles 21120 = true ∧ castsFifteens 21120 = true := by decide

/-- 5281: nibbles fold back to 21121; digit sum 16 ≡ 21121 (mod 15). -/
theorem enumeration_hex4_5281 : reassembles 21121 = true ∧ castsFifteens 21121 = true := by decide

/-- 5282: nibbles fold back to 21122; digit sum 17 ≡ 21122 (mod 15). -/
theorem enumeration_hex4_5282 : reassembles 21122 = true ∧ castsFifteens 21122 = true := by decide

/-- 5283: nibbles fold back to 21123; digit sum 18 ≡ 21123 (mod 15). -/
theorem enumeration_hex4_5283 : reassembles 21123 = true ∧ castsFifteens 21123 = true := by decide

/-- 5284: nibbles fold back to 21124; digit sum 19 ≡ 21124 (mod 15). -/
theorem enumeration_hex4_5284 : reassembles 21124 = true ∧ castsFifteens 21124 = true := by decide

/-- 5285: nibbles fold back to 21125; digit sum 20 ≡ 21125 (mod 15). -/
theorem enumeration_hex4_5285 : reassembles 21125 = true ∧ castsFifteens 21125 = true := by decide

/-- 5286: nibbles fold back to 21126; digit sum 21 ≡ 21126 (mod 15). -/
theorem enumeration_hex4_5286 : reassembles 21126 = true ∧ castsFifteens 21126 = true := by decide

/-- 5287: nibbles fold back to 21127; digit sum 22 ≡ 21127 (mod 15). -/
theorem enumeration_hex4_5287 : reassembles 21127 = true ∧ castsFifteens 21127 = true := by decide

/-- 5288: nibbles fold back to 21128; digit sum 23 ≡ 21128 (mod 15). -/
theorem enumeration_hex4_5288 : reassembles 21128 = true ∧ castsFifteens 21128 = true := by decide

/-- 5289: nibbles fold back to 21129; digit sum 24 ≡ 21129 (mod 15). -/
theorem enumeration_hex4_5289 : reassembles 21129 = true ∧ castsFifteens 21129 = true := by decide

/-- 528a: nibbles fold back to 21130; digit sum 25 ≡ 21130 (mod 15). -/
theorem enumeration_hex4_528a : reassembles 21130 = true ∧ castsFifteens 21130 = true := by decide

/-- 528b: nibbles fold back to 21131; digit sum 26 ≡ 21131 (mod 15). -/
theorem enumeration_hex4_528b : reassembles 21131 = true ∧ castsFifteens 21131 = true := by decide

/-- 528c: nibbles fold back to 21132; digit sum 27 ≡ 21132 (mod 15). -/
theorem enumeration_hex4_528c : reassembles 21132 = true ∧ castsFifteens 21132 = true := by decide

/-- 528d: nibbles fold back to 21133; digit sum 28 ≡ 21133 (mod 15). -/
theorem enumeration_hex4_528d : reassembles 21133 = true ∧ castsFifteens 21133 = true := by decide

/-- 528e: nibbles fold back to 21134; digit sum 29 ≡ 21134 (mod 15). -/
theorem enumeration_hex4_528e : reassembles 21134 = true ∧ castsFifteens 21134 = true := by decide

/-- 528f: nibbles fold back to 21135; digit sum 30 ≡ 21135 (mod 15). -/
theorem enumeration_hex4_528f : reassembles 21135 = true ∧ castsFifteens 21135 = true := by decide

/-- 5290: nibbles fold back to 21136; digit sum 16 ≡ 21136 (mod 15). -/
theorem enumeration_hex4_5290 : reassembles 21136 = true ∧ castsFifteens 21136 = true := by decide

/-- 5291: nibbles fold back to 21137; digit sum 17 ≡ 21137 (mod 15). -/
theorem enumeration_hex4_5291 : reassembles 21137 = true ∧ castsFifteens 21137 = true := by decide

/-- 5292: nibbles fold back to 21138; digit sum 18 ≡ 21138 (mod 15). -/
theorem enumeration_hex4_5292 : reassembles 21138 = true ∧ castsFifteens 21138 = true := by decide

/-- 5293: nibbles fold back to 21139; digit sum 19 ≡ 21139 (mod 15). -/
theorem enumeration_hex4_5293 : reassembles 21139 = true ∧ castsFifteens 21139 = true := by decide

/-- 5294: nibbles fold back to 21140; digit sum 20 ≡ 21140 (mod 15). -/
theorem enumeration_hex4_5294 : reassembles 21140 = true ∧ castsFifteens 21140 = true := by decide

/-- 5295: nibbles fold back to 21141; digit sum 21 ≡ 21141 (mod 15). -/
theorem enumeration_hex4_5295 : reassembles 21141 = true ∧ castsFifteens 21141 = true := by decide

/-- 5296: nibbles fold back to 21142; digit sum 22 ≡ 21142 (mod 15). -/
theorem enumeration_hex4_5296 : reassembles 21142 = true ∧ castsFifteens 21142 = true := by decide

/-- 5297: nibbles fold back to 21143; digit sum 23 ≡ 21143 (mod 15). -/
theorem enumeration_hex4_5297 : reassembles 21143 = true ∧ castsFifteens 21143 = true := by decide

/-- 5298: nibbles fold back to 21144; digit sum 24 ≡ 21144 (mod 15). -/
theorem enumeration_hex4_5298 : reassembles 21144 = true ∧ castsFifteens 21144 = true := by decide

/-- 5299: nibbles fold back to 21145; digit sum 25 ≡ 21145 (mod 15). -/
theorem enumeration_hex4_5299 : reassembles 21145 = true ∧ castsFifteens 21145 = true := by decide

/-- 529a: nibbles fold back to 21146; digit sum 26 ≡ 21146 (mod 15). -/
theorem enumeration_hex4_529a : reassembles 21146 = true ∧ castsFifteens 21146 = true := by decide

/-- 529b: nibbles fold back to 21147; digit sum 27 ≡ 21147 (mod 15). -/
theorem enumeration_hex4_529b : reassembles 21147 = true ∧ castsFifteens 21147 = true := by decide

/-- 529c: nibbles fold back to 21148; digit sum 28 ≡ 21148 (mod 15). -/
theorem enumeration_hex4_529c : reassembles 21148 = true ∧ castsFifteens 21148 = true := by decide

/-- 529d: nibbles fold back to 21149; digit sum 29 ≡ 21149 (mod 15). -/
theorem enumeration_hex4_529d : reassembles 21149 = true ∧ castsFifteens 21149 = true := by decide

/-- 529e: nibbles fold back to 21150; digit sum 30 ≡ 21150 (mod 15). -/
theorem enumeration_hex4_529e : reassembles 21150 = true ∧ castsFifteens 21150 = true := by decide

/-- 529f: nibbles fold back to 21151; digit sum 31 ≡ 21151 (mod 15). -/
theorem enumeration_hex4_529f : reassembles 21151 = true ∧ castsFifteens 21151 = true := by decide

/-- 52a0: nibbles fold back to 21152; digit sum 17 ≡ 21152 (mod 15). -/
theorem enumeration_hex4_52a0 : reassembles 21152 = true ∧ castsFifteens 21152 = true := by decide

/-- 52a1: nibbles fold back to 21153; digit sum 18 ≡ 21153 (mod 15). -/
theorem enumeration_hex4_52a1 : reassembles 21153 = true ∧ castsFifteens 21153 = true := by decide

/-- 52a2: nibbles fold back to 21154; digit sum 19 ≡ 21154 (mod 15). -/
theorem enumeration_hex4_52a2 : reassembles 21154 = true ∧ castsFifteens 21154 = true := by decide

/-- 52a3: nibbles fold back to 21155; digit sum 20 ≡ 21155 (mod 15). -/
theorem enumeration_hex4_52a3 : reassembles 21155 = true ∧ castsFifteens 21155 = true := by decide

/-- 52a4: nibbles fold back to 21156; digit sum 21 ≡ 21156 (mod 15). -/
theorem enumeration_hex4_52a4 : reassembles 21156 = true ∧ castsFifteens 21156 = true := by decide

/-- 52a5: nibbles fold back to 21157; digit sum 22 ≡ 21157 (mod 15). -/
theorem enumeration_hex4_52a5 : reassembles 21157 = true ∧ castsFifteens 21157 = true := by decide

/-- 52a6: nibbles fold back to 21158; digit sum 23 ≡ 21158 (mod 15). -/
theorem enumeration_hex4_52a6 : reassembles 21158 = true ∧ castsFifteens 21158 = true := by decide

/-- 52a7: nibbles fold back to 21159; digit sum 24 ≡ 21159 (mod 15). -/
theorem enumeration_hex4_52a7 : reassembles 21159 = true ∧ castsFifteens 21159 = true := by decide

/-- 52a8: nibbles fold back to 21160; digit sum 25 ≡ 21160 (mod 15). -/
theorem enumeration_hex4_52a8 : reassembles 21160 = true ∧ castsFifteens 21160 = true := by decide

/-- 52a9: nibbles fold back to 21161; digit sum 26 ≡ 21161 (mod 15). -/
theorem enumeration_hex4_52a9 : reassembles 21161 = true ∧ castsFifteens 21161 = true := by decide

/-- 52aa: nibbles fold back to 21162; digit sum 27 ≡ 21162 (mod 15). -/
theorem enumeration_hex4_52aa : reassembles 21162 = true ∧ castsFifteens 21162 = true := by decide

/-- 52ab: nibbles fold back to 21163; digit sum 28 ≡ 21163 (mod 15). -/
theorem enumeration_hex4_52ab : reassembles 21163 = true ∧ castsFifteens 21163 = true := by decide

/-- 52ac: nibbles fold back to 21164; digit sum 29 ≡ 21164 (mod 15). -/
theorem enumeration_hex4_52ac : reassembles 21164 = true ∧ castsFifteens 21164 = true := by decide

/-- 52ad: nibbles fold back to 21165; digit sum 30 ≡ 21165 (mod 15). -/
theorem enumeration_hex4_52ad : reassembles 21165 = true ∧ castsFifteens 21165 = true := by decide

/-- 52ae: nibbles fold back to 21166; digit sum 31 ≡ 21166 (mod 15). -/
theorem enumeration_hex4_52ae : reassembles 21166 = true ∧ castsFifteens 21166 = true := by decide

/-- 52af: nibbles fold back to 21167; digit sum 32 ≡ 21167 (mod 15). -/
theorem enumeration_hex4_52af : reassembles 21167 = true ∧ castsFifteens 21167 = true := by decide

/-- 52b0: nibbles fold back to 21168; digit sum 18 ≡ 21168 (mod 15). -/
theorem enumeration_hex4_52b0 : reassembles 21168 = true ∧ castsFifteens 21168 = true := by decide

/-- 52b1: nibbles fold back to 21169; digit sum 19 ≡ 21169 (mod 15). -/
theorem enumeration_hex4_52b1 : reassembles 21169 = true ∧ castsFifteens 21169 = true := by decide

/-- 52b2: nibbles fold back to 21170; digit sum 20 ≡ 21170 (mod 15). -/
theorem enumeration_hex4_52b2 : reassembles 21170 = true ∧ castsFifteens 21170 = true := by decide

/-- 52b3: nibbles fold back to 21171; digit sum 21 ≡ 21171 (mod 15). -/
theorem enumeration_hex4_52b3 : reassembles 21171 = true ∧ castsFifteens 21171 = true := by decide

/-- 52b4: nibbles fold back to 21172; digit sum 22 ≡ 21172 (mod 15). -/
theorem enumeration_hex4_52b4 : reassembles 21172 = true ∧ castsFifteens 21172 = true := by decide

/-- 52b5: nibbles fold back to 21173; digit sum 23 ≡ 21173 (mod 15). -/
theorem enumeration_hex4_52b5 : reassembles 21173 = true ∧ castsFifteens 21173 = true := by decide

/-- 52b6: nibbles fold back to 21174; digit sum 24 ≡ 21174 (mod 15). -/
theorem enumeration_hex4_52b6 : reassembles 21174 = true ∧ castsFifteens 21174 = true := by decide

/-- 52b7: nibbles fold back to 21175; digit sum 25 ≡ 21175 (mod 15). -/
theorem enumeration_hex4_52b7 : reassembles 21175 = true ∧ castsFifteens 21175 = true := by decide

/-- 52b8: nibbles fold back to 21176; digit sum 26 ≡ 21176 (mod 15). -/
theorem enumeration_hex4_52b8 : reassembles 21176 = true ∧ castsFifteens 21176 = true := by decide

/-- 52b9: nibbles fold back to 21177; digit sum 27 ≡ 21177 (mod 15). -/
theorem enumeration_hex4_52b9 : reassembles 21177 = true ∧ castsFifteens 21177 = true := by decide

/-- 52ba: nibbles fold back to 21178; digit sum 28 ≡ 21178 (mod 15). -/
theorem enumeration_hex4_52ba : reassembles 21178 = true ∧ castsFifteens 21178 = true := by decide

/-- 52bb: nibbles fold back to 21179; digit sum 29 ≡ 21179 (mod 15). -/
theorem enumeration_hex4_52bb : reassembles 21179 = true ∧ castsFifteens 21179 = true := by decide

/-- 52bc: nibbles fold back to 21180; digit sum 30 ≡ 21180 (mod 15). -/
theorem enumeration_hex4_52bc : reassembles 21180 = true ∧ castsFifteens 21180 = true := by decide

/-- 52bd: nibbles fold back to 21181; digit sum 31 ≡ 21181 (mod 15). -/
theorem enumeration_hex4_52bd : reassembles 21181 = true ∧ castsFifteens 21181 = true := by decide

/-- 52be: nibbles fold back to 21182; digit sum 32 ≡ 21182 (mod 15). -/
theorem enumeration_hex4_52be : reassembles 21182 = true ∧ castsFifteens 21182 = true := by decide

/-- 52bf: nibbles fold back to 21183; digit sum 33 ≡ 21183 (mod 15). -/
theorem enumeration_hex4_52bf : reassembles 21183 = true ∧ castsFifteens 21183 = true := by decide

/-- 52c0: nibbles fold back to 21184; digit sum 19 ≡ 21184 (mod 15). -/
theorem enumeration_hex4_52c0 : reassembles 21184 = true ∧ castsFifteens 21184 = true := by decide

/-- 52c1: nibbles fold back to 21185; digit sum 20 ≡ 21185 (mod 15). -/
theorem enumeration_hex4_52c1 : reassembles 21185 = true ∧ castsFifteens 21185 = true := by decide

/-- 52c2: nibbles fold back to 21186; digit sum 21 ≡ 21186 (mod 15). -/
theorem enumeration_hex4_52c2 : reassembles 21186 = true ∧ castsFifteens 21186 = true := by decide

/-- 52c3: nibbles fold back to 21187; digit sum 22 ≡ 21187 (mod 15). -/
theorem enumeration_hex4_52c3 : reassembles 21187 = true ∧ castsFifteens 21187 = true := by decide

/-- 52c4: nibbles fold back to 21188; digit sum 23 ≡ 21188 (mod 15). -/
theorem enumeration_hex4_52c4 : reassembles 21188 = true ∧ castsFifteens 21188 = true := by decide

/-- 52c5: nibbles fold back to 21189; digit sum 24 ≡ 21189 (mod 15). -/
theorem enumeration_hex4_52c5 : reassembles 21189 = true ∧ castsFifteens 21189 = true := by decide

/-- 52c6: nibbles fold back to 21190; digit sum 25 ≡ 21190 (mod 15). -/
theorem enumeration_hex4_52c6 : reassembles 21190 = true ∧ castsFifteens 21190 = true := by decide

/-- 52c7: nibbles fold back to 21191; digit sum 26 ≡ 21191 (mod 15). -/
theorem enumeration_hex4_52c7 : reassembles 21191 = true ∧ castsFifteens 21191 = true := by decide

/-- 52c8: nibbles fold back to 21192; digit sum 27 ≡ 21192 (mod 15). -/
theorem enumeration_hex4_52c8 : reassembles 21192 = true ∧ castsFifteens 21192 = true := by decide

/-- 52c9: nibbles fold back to 21193; digit sum 28 ≡ 21193 (mod 15). -/
theorem enumeration_hex4_52c9 : reassembles 21193 = true ∧ castsFifteens 21193 = true := by decide

/-- 52ca: nibbles fold back to 21194; digit sum 29 ≡ 21194 (mod 15). -/
theorem enumeration_hex4_52ca : reassembles 21194 = true ∧ castsFifteens 21194 = true := by decide

/-- 52cb: nibbles fold back to 21195; digit sum 30 ≡ 21195 (mod 15). -/
theorem enumeration_hex4_52cb : reassembles 21195 = true ∧ castsFifteens 21195 = true := by decide

/-- 52cc: nibbles fold back to 21196; digit sum 31 ≡ 21196 (mod 15). -/
theorem enumeration_hex4_52cc : reassembles 21196 = true ∧ castsFifteens 21196 = true := by decide

/-- 52cd: nibbles fold back to 21197; digit sum 32 ≡ 21197 (mod 15). -/
theorem enumeration_hex4_52cd : reassembles 21197 = true ∧ castsFifteens 21197 = true := by decide

/-- 52ce: nibbles fold back to 21198; digit sum 33 ≡ 21198 (mod 15). -/
theorem enumeration_hex4_52ce : reassembles 21198 = true ∧ castsFifteens 21198 = true := by decide

/-- 52cf: nibbles fold back to 21199; digit sum 34 ≡ 21199 (mod 15). -/
theorem enumeration_hex4_52cf : reassembles 21199 = true ∧ castsFifteens 21199 = true := by decide

/-- 52d0: nibbles fold back to 21200; digit sum 20 ≡ 21200 (mod 15). -/
theorem enumeration_hex4_52d0 : reassembles 21200 = true ∧ castsFifteens 21200 = true := by decide

/-- 52d1: nibbles fold back to 21201; digit sum 21 ≡ 21201 (mod 15). -/
theorem enumeration_hex4_52d1 : reassembles 21201 = true ∧ castsFifteens 21201 = true := by decide

/-- 52d2: nibbles fold back to 21202; digit sum 22 ≡ 21202 (mod 15). -/
theorem enumeration_hex4_52d2 : reassembles 21202 = true ∧ castsFifteens 21202 = true := by decide

/-- 52d3: nibbles fold back to 21203; digit sum 23 ≡ 21203 (mod 15). -/
theorem enumeration_hex4_52d3 : reassembles 21203 = true ∧ castsFifteens 21203 = true := by decide

/-- 52d4: nibbles fold back to 21204; digit sum 24 ≡ 21204 (mod 15). -/
theorem enumeration_hex4_52d4 : reassembles 21204 = true ∧ castsFifteens 21204 = true := by decide

/-- 52d5: nibbles fold back to 21205; digit sum 25 ≡ 21205 (mod 15). -/
theorem enumeration_hex4_52d5 : reassembles 21205 = true ∧ castsFifteens 21205 = true := by decide

/-- 52d6: nibbles fold back to 21206; digit sum 26 ≡ 21206 (mod 15). -/
theorem enumeration_hex4_52d6 : reassembles 21206 = true ∧ castsFifteens 21206 = true := by decide

/-- 52d7: nibbles fold back to 21207; digit sum 27 ≡ 21207 (mod 15). -/
theorem enumeration_hex4_52d7 : reassembles 21207 = true ∧ castsFifteens 21207 = true := by decide

/-- 52d8: nibbles fold back to 21208; digit sum 28 ≡ 21208 (mod 15). -/
theorem enumeration_hex4_52d8 : reassembles 21208 = true ∧ castsFifteens 21208 = true := by decide

/-- 52d9: nibbles fold back to 21209; digit sum 29 ≡ 21209 (mod 15). -/
theorem enumeration_hex4_52d9 : reassembles 21209 = true ∧ castsFifteens 21209 = true := by decide

/-- 52da: nibbles fold back to 21210; digit sum 30 ≡ 21210 (mod 15). -/
theorem enumeration_hex4_52da : reassembles 21210 = true ∧ castsFifteens 21210 = true := by decide

/-- 52db: nibbles fold back to 21211; digit sum 31 ≡ 21211 (mod 15). -/
theorem enumeration_hex4_52db : reassembles 21211 = true ∧ castsFifteens 21211 = true := by decide

/-- 52dc: nibbles fold back to 21212; digit sum 32 ≡ 21212 (mod 15). -/
theorem enumeration_hex4_52dc : reassembles 21212 = true ∧ castsFifteens 21212 = true := by decide

/-- 52dd: nibbles fold back to 21213; digit sum 33 ≡ 21213 (mod 15). -/
theorem enumeration_hex4_52dd : reassembles 21213 = true ∧ castsFifteens 21213 = true := by decide

/-- 52de: nibbles fold back to 21214; digit sum 34 ≡ 21214 (mod 15). -/
theorem enumeration_hex4_52de : reassembles 21214 = true ∧ castsFifteens 21214 = true := by decide

/-- 52df: nibbles fold back to 21215; digit sum 35 ≡ 21215 (mod 15). -/
theorem enumeration_hex4_52df : reassembles 21215 = true ∧ castsFifteens 21215 = true := by decide

/-- 52e0: nibbles fold back to 21216; digit sum 21 ≡ 21216 (mod 15). -/
theorem enumeration_hex4_52e0 : reassembles 21216 = true ∧ castsFifteens 21216 = true := by decide

/-- 52e1: nibbles fold back to 21217; digit sum 22 ≡ 21217 (mod 15). -/
theorem enumeration_hex4_52e1 : reassembles 21217 = true ∧ castsFifteens 21217 = true := by decide

/-- 52e2: nibbles fold back to 21218; digit sum 23 ≡ 21218 (mod 15). -/
theorem enumeration_hex4_52e2 : reassembles 21218 = true ∧ castsFifteens 21218 = true := by decide

/-- 52e3: nibbles fold back to 21219; digit sum 24 ≡ 21219 (mod 15). -/
theorem enumeration_hex4_52e3 : reassembles 21219 = true ∧ castsFifteens 21219 = true := by decide

/-- 52e4: nibbles fold back to 21220; digit sum 25 ≡ 21220 (mod 15). -/
theorem enumeration_hex4_52e4 : reassembles 21220 = true ∧ castsFifteens 21220 = true := by decide

/-- 52e5: nibbles fold back to 21221; digit sum 26 ≡ 21221 (mod 15). -/
theorem enumeration_hex4_52e5 : reassembles 21221 = true ∧ castsFifteens 21221 = true := by decide

/-- 52e6: nibbles fold back to 21222; digit sum 27 ≡ 21222 (mod 15). -/
theorem enumeration_hex4_52e6 : reassembles 21222 = true ∧ castsFifteens 21222 = true := by decide

/-- 52e7: nibbles fold back to 21223; digit sum 28 ≡ 21223 (mod 15). -/
theorem enumeration_hex4_52e7 : reassembles 21223 = true ∧ castsFifteens 21223 = true := by decide

/-- 52e8: nibbles fold back to 21224; digit sum 29 ≡ 21224 (mod 15). -/
theorem enumeration_hex4_52e8 : reassembles 21224 = true ∧ castsFifteens 21224 = true := by decide

/-- 52e9: nibbles fold back to 21225; digit sum 30 ≡ 21225 (mod 15). -/
theorem enumeration_hex4_52e9 : reassembles 21225 = true ∧ castsFifteens 21225 = true := by decide

/-- 52ea: nibbles fold back to 21226; digit sum 31 ≡ 21226 (mod 15). -/
theorem enumeration_hex4_52ea : reassembles 21226 = true ∧ castsFifteens 21226 = true := by decide

/-- 52eb: nibbles fold back to 21227; digit sum 32 ≡ 21227 (mod 15). -/
theorem enumeration_hex4_52eb : reassembles 21227 = true ∧ castsFifteens 21227 = true := by decide

/-- 52ec: nibbles fold back to 21228; digit sum 33 ≡ 21228 (mod 15). -/
theorem enumeration_hex4_52ec : reassembles 21228 = true ∧ castsFifteens 21228 = true := by decide

/-- 52ed: nibbles fold back to 21229; digit sum 34 ≡ 21229 (mod 15). -/
theorem enumeration_hex4_52ed : reassembles 21229 = true ∧ castsFifteens 21229 = true := by decide

/-- 52ee: nibbles fold back to 21230; digit sum 35 ≡ 21230 (mod 15). -/
theorem enumeration_hex4_52ee : reassembles 21230 = true ∧ castsFifteens 21230 = true := by decide

/-- 52ef: nibbles fold back to 21231; digit sum 36 ≡ 21231 (mod 15). -/
theorem enumeration_hex4_52ef : reassembles 21231 = true ∧ castsFifteens 21231 = true := by decide

/-- 52f0: nibbles fold back to 21232; digit sum 22 ≡ 21232 (mod 15). -/
theorem enumeration_hex4_52f0 : reassembles 21232 = true ∧ castsFifteens 21232 = true := by decide

/-- 52f1: nibbles fold back to 21233; digit sum 23 ≡ 21233 (mod 15). -/
theorem enumeration_hex4_52f1 : reassembles 21233 = true ∧ castsFifteens 21233 = true := by decide

/-- 52f2: nibbles fold back to 21234; digit sum 24 ≡ 21234 (mod 15). -/
theorem enumeration_hex4_52f2 : reassembles 21234 = true ∧ castsFifteens 21234 = true := by decide

/-- 52f3: nibbles fold back to 21235; digit sum 25 ≡ 21235 (mod 15). -/
theorem enumeration_hex4_52f3 : reassembles 21235 = true ∧ castsFifteens 21235 = true := by decide

/-- 52f4: nibbles fold back to 21236; digit sum 26 ≡ 21236 (mod 15). -/
theorem enumeration_hex4_52f4 : reassembles 21236 = true ∧ castsFifteens 21236 = true := by decide

/-- 52f5: nibbles fold back to 21237; digit sum 27 ≡ 21237 (mod 15). -/
theorem enumeration_hex4_52f5 : reassembles 21237 = true ∧ castsFifteens 21237 = true := by decide

/-- 52f6: nibbles fold back to 21238; digit sum 28 ≡ 21238 (mod 15). -/
theorem enumeration_hex4_52f6 : reassembles 21238 = true ∧ castsFifteens 21238 = true := by decide

/-- 52f7: nibbles fold back to 21239; digit sum 29 ≡ 21239 (mod 15). -/
theorem enumeration_hex4_52f7 : reassembles 21239 = true ∧ castsFifteens 21239 = true := by decide

/-- 52f8: nibbles fold back to 21240; digit sum 30 ≡ 21240 (mod 15). -/
theorem enumeration_hex4_52f8 : reassembles 21240 = true ∧ castsFifteens 21240 = true := by decide

/-- 52f9: nibbles fold back to 21241; digit sum 31 ≡ 21241 (mod 15). -/
theorem enumeration_hex4_52f9 : reassembles 21241 = true ∧ castsFifteens 21241 = true := by decide

/-- 52fa: nibbles fold back to 21242; digit sum 32 ≡ 21242 (mod 15). -/
theorem enumeration_hex4_52fa : reassembles 21242 = true ∧ castsFifteens 21242 = true := by decide

/-- 52fb: nibbles fold back to 21243; digit sum 33 ≡ 21243 (mod 15). -/
theorem enumeration_hex4_52fb : reassembles 21243 = true ∧ castsFifteens 21243 = true := by decide

/-- 52fc: nibbles fold back to 21244; digit sum 34 ≡ 21244 (mod 15). -/
theorem enumeration_hex4_52fc : reassembles 21244 = true ∧ castsFifteens 21244 = true := by decide

/-- 52fd: nibbles fold back to 21245; digit sum 35 ≡ 21245 (mod 15). -/
theorem enumeration_hex4_52fd : reassembles 21245 = true ∧ castsFifteens 21245 = true := by decide

/-- 52fe: nibbles fold back to 21246; digit sum 36 ≡ 21246 (mod 15). -/
theorem enumeration_hex4_52fe : reassembles 21246 = true ∧ castsFifteens 21246 = true := by decide

/-- 52ff: nibbles fold back to 21247; digit sum 37 ≡ 21247 (mod 15). -/
theorem enumeration_hex4_52ff : reassembles 21247 = true ∧ castsFifteens 21247 = true := by decide

/-- 5300: nibbles fold back to 21248; digit sum 8 ≡ 21248 (mod 15). -/
theorem enumeration_hex4_5300 : reassembles 21248 = true ∧ castsFifteens 21248 = true := by decide

/-- 5301: nibbles fold back to 21249; digit sum 9 ≡ 21249 (mod 15). -/
theorem enumeration_hex4_5301 : reassembles 21249 = true ∧ castsFifteens 21249 = true := by decide

/-- 5302: nibbles fold back to 21250; digit sum 10 ≡ 21250 (mod 15). -/
theorem enumeration_hex4_5302 : reassembles 21250 = true ∧ castsFifteens 21250 = true := by decide

/-- 5303: nibbles fold back to 21251; digit sum 11 ≡ 21251 (mod 15). -/
theorem enumeration_hex4_5303 : reassembles 21251 = true ∧ castsFifteens 21251 = true := by decide

/-- 5304: nibbles fold back to 21252; digit sum 12 ≡ 21252 (mod 15). -/
theorem enumeration_hex4_5304 : reassembles 21252 = true ∧ castsFifteens 21252 = true := by decide

/-- 5305: nibbles fold back to 21253; digit sum 13 ≡ 21253 (mod 15). -/
theorem enumeration_hex4_5305 : reassembles 21253 = true ∧ castsFifteens 21253 = true := by decide

/-- 5306: nibbles fold back to 21254; digit sum 14 ≡ 21254 (mod 15). -/
theorem enumeration_hex4_5306 : reassembles 21254 = true ∧ castsFifteens 21254 = true := by decide

/-- 5307: nibbles fold back to 21255; digit sum 15 ≡ 21255 (mod 15). -/
theorem enumeration_hex4_5307 : reassembles 21255 = true ∧ castsFifteens 21255 = true := by decide

/-- 5308: nibbles fold back to 21256; digit sum 16 ≡ 21256 (mod 15). -/
theorem enumeration_hex4_5308 : reassembles 21256 = true ∧ castsFifteens 21256 = true := by decide

/-- 5309: nibbles fold back to 21257; digit sum 17 ≡ 21257 (mod 15). -/
theorem enumeration_hex4_5309 : reassembles 21257 = true ∧ castsFifteens 21257 = true := by decide

/-- 530a: nibbles fold back to 21258; digit sum 18 ≡ 21258 (mod 15). -/
theorem enumeration_hex4_530a : reassembles 21258 = true ∧ castsFifteens 21258 = true := by decide

/-- 530b: nibbles fold back to 21259; digit sum 19 ≡ 21259 (mod 15). -/
theorem enumeration_hex4_530b : reassembles 21259 = true ∧ castsFifteens 21259 = true := by decide

/-- 530c: nibbles fold back to 21260; digit sum 20 ≡ 21260 (mod 15). -/
theorem enumeration_hex4_530c : reassembles 21260 = true ∧ castsFifteens 21260 = true := by decide

/-- 530d: nibbles fold back to 21261; digit sum 21 ≡ 21261 (mod 15). -/
theorem enumeration_hex4_530d : reassembles 21261 = true ∧ castsFifteens 21261 = true := by decide

/-- 530e: nibbles fold back to 21262; digit sum 22 ≡ 21262 (mod 15). -/
theorem enumeration_hex4_530e : reassembles 21262 = true ∧ castsFifteens 21262 = true := by decide

/-- 530f: nibbles fold back to 21263; digit sum 23 ≡ 21263 (mod 15). -/
theorem enumeration_hex4_530f : reassembles 21263 = true ∧ castsFifteens 21263 = true := by decide

/-- 5310: nibbles fold back to 21264; digit sum 9 ≡ 21264 (mod 15). -/
theorem enumeration_hex4_5310 : reassembles 21264 = true ∧ castsFifteens 21264 = true := by decide

/-- 5311: nibbles fold back to 21265; digit sum 10 ≡ 21265 (mod 15). -/
theorem enumeration_hex4_5311 : reassembles 21265 = true ∧ castsFifteens 21265 = true := by decide

/-- 5312: nibbles fold back to 21266; digit sum 11 ≡ 21266 (mod 15). -/
theorem enumeration_hex4_5312 : reassembles 21266 = true ∧ castsFifteens 21266 = true := by decide

/-- 5313: nibbles fold back to 21267; digit sum 12 ≡ 21267 (mod 15). -/
theorem enumeration_hex4_5313 : reassembles 21267 = true ∧ castsFifteens 21267 = true := by decide

/-- 5314: nibbles fold back to 21268; digit sum 13 ≡ 21268 (mod 15). -/
theorem enumeration_hex4_5314 : reassembles 21268 = true ∧ castsFifteens 21268 = true := by decide

/-- 5315: nibbles fold back to 21269; digit sum 14 ≡ 21269 (mod 15). -/
theorem enumeration_hex4_5315 : reassembles 21269 = true ∧ castsFifteens 21269 = true := by decide

/-- 5316: nibbles fold back to 21270; digit sum 15 ≡ 21270 (mod 15). -/
theorem enumeration_hex4_5316 : reassembles 21270 = true ∧ castsFifteens 21270 = true := by decide

/-- 5317: nibbles fold back to 21271; digit sum 16 ≡ 21271 (mod 15). -/
theorem enumeration_hex4_5317 : reassembles 21271 = true ∧ castsFifteens 21271 = true := by decide

/-- 5318: nibbles fold back to 21272; digit sum 17 ≡ 21272 (mod 15). -/
theorem enumeration_hex4_5318 : reassembles 21272 = true ∧ castsFifteens 21272 = true := by decide

/-- 5319: nibbles fold back to 21273; digit sum 18 ≡ 21273 (mod 15). -/
theorem enumeration_hex4_5319 : reassembles 21273 = true ∧ castsFifteens 21273 = true := by decide

/-- 531a: nibbles fold back to 21274; digit sum 19 ≡ 21274 (mod 15). -/
theorem enumeration_hex4_531a : reassembles 21274 = true ∧ castsFifteens 21274 = true := by decide

/-- 531b: nibbles fold back to 21275; digit sum 20 ≡ 21275 (mod 15). -/
theorem enumeration_hex4_531b : reassembles 21275 = true ∧ castsFifteens 21275 = true := by decide

/-- 531c: nibbles fold back to 21276; digit sum 21 ≡ 21276 (mod 15). -/
theorem enumeration_hex4_531c : reassembles 21276 = true ∧ castsFifteens 21276 = true := by decide

/-- 531d: nibbles fold back to 21277; digit sum 22 ≡ 21277 (mod 15). -/
theorem enumeration_hex4_531d : reassembles 21277 = true ∧ castsFifteens 21277 = true := by decide

/-- 531e: nibbles fold back to 21278; digit sum 23 ≡ 21278 (mod 15). -/
theorem enumeration_hex4_531e : reassembles 21278 = true ∧ castsFifteens 21278 = true := by decide

/-- 531f: nibbles fold back to 21279; digit sum 24 ≡ 21279 (mod 15). -/
theorem enumeration_hex4_531f : reassembles 21279 = true ∧ castsFifteens 21279 = true := by decide

/-- 5320: nibbles fold back to 21280; digit sum 10 ≡ 21280 (mod 15). -/
theorem enumeration_hex4_5320 : reassembles 21280 = true ∧ castsFifteens 21280 = true := by decide

/-- 5321: nibbles fold back to 21281; digit sum 11 ≡ 21281 (mod 15). -/
theorem enumeration_hex4_5321 : reassembles 21281 = true ∧ castsFifteens 21281 = true := by decide

/-- 5322: nibbles fold back to 21282; digit sum 12 ≡ 21282 (mod 15). -/
theorem enumeration_hex4_5322 : reassembles 21282 = true ∧ castsFifteens 21282 = true := by decide

/-- 5323: nibbles fold back to 21283; digit sum 13 ≡ 21283 (mod 15). -/
theorem enumeration_hex4_5323 : reassembles 21283 = true ∧ castsFifteens 21283 = true := by decide

/-- 5324: nibbles fold back to 21284; digit sum 14 ≡ 21284 (mod 15). -/
theorem enumeration_hex4_5324 : reassembles 21284 = true ∧ castsFifteens 21284 = true := by decide

/-- 5325: nibbles fold back to 21285; digit sum 15 ≡ 21285 (mod 15). -/
theorem enumeration_hex4_5325 : reassembles 21285 = true ∧ castsFifteens 21285 = true := by decide

/-- 5326: nibbles fold back to 21286; digit sum 16 ≡ 21286 (mod 15). -/
theorem enumeration_hex4_5326 : reassembles 21286 = true ∧ castsFifteens 21286 = true := by decide

/-- 5327: nibbles fold back to 21287; digit sum 17 ≡ 21287 (mod 15). -/
theorem enumeration_hex4_5327 : reassembles 21287 = true ∧ castsFifteens 21287 = true := by decide

/-- 5328: nibbles fold back to 21288; digit sum 18 ≡ 21288 (mod 15). -/
theorem enumeration_hex4_5328 : reassembles 21288 = true ∧ castsFifteens 21288 = true := by decide

/-- 5329: nibbles fold back to 21289; digit sum 19 ≡ 21289 (mod 15). -/
theorem enumeration_hex4_5329 : reassembles 21289 = true ∧ castsFifteens 21289 = true := by decide

/-- 532a: nibbles fold back to 21290; digit sum 20 ≡ 21290 (mod 15). -/
theorem enumeration_hex4_532a : reassembles 21290 = true ∧ castsFifteens 21290 = true := by decide

/-- 532b: nibbles fold back to 21291; digit sum 21 ≡ 21291 (mod 15). -/
theorem enumeration_hex4_532b : reassembles 21291 = true ∧ castsFifteens 21291 = true := by decide

/-- 532c: nibbles fold back to 21292; digit sum 22 ≡ 21292 (mod 15). -/
theorem enumeration_hex4_532c : reassembles 21292 = true ∧ castsFifteens 21292 = true := by decide

/-- 532d: nibbles fold back to 21293; digit sum 23 ≡ 21293 (mod 15). -/
theorem enumeration_hex4_532d : reassembles 21293 = true ∧ castsFifteens 21293 = true := by decide

/-- 532e: nibbles fold back to 21294; digit sum 24 ≡ 21294 (mod 15). -/
theorem enumeration_hex4_532e : reassembles 21294 = true ∧ castsFifteens 21294 = true := by decide

/-- 532f: nibbles fold back to 21295; digit sum 25 ≡ 21295 (mod 15). -/
theorem enumeration_hex4_532f : reassembles 21295 = true ∧ castsFifteens 21295 = true := by decide

/-- 5330: nibbles fold back to 21296; digit sum 11 ≡ 21296 (mod 15). -/
theorem enumeration_hex4_5330 : reassembles 21296 = true ∧ castsFifteens 21296 = true := by decide

/-- 5331: nibbles fold back to 21297; digit sum 12 ≡ 21297 (mod 15). -/
theorem enumeration_hex4_5331 : reassembles 21297 = true ∧ castsFifteens 21297 = true := by decide

/-- 5332: nibbles fold back to 21298; digit sum 13 ≡ 21298 (mod 15). -/
theorem enumeration_hex4_5332 : reassembles 21298 = true ∧ castsFifteens 21298 = true := by decide

/-- 5333: nibbles fold back to 21299; digit sum 14 ≡ 21299 (mod 15). -/
theorem enumeration_hex4_5333 : reassembles 21299 = true ∧ castsFifteens 21299 = true := by decide

/-- 5334: nibbles fold back to 21300; digit sum 15 ≡ 21300 (mod 15). -/
theorem enumeration_hex4_5334 : reassembles 21300 = true ∧ castsFifteens 21300 = true := by decide

/-- 5335: nibbles fold back to 21301; digit sum 16 ≡ 21301 (mod 15). -/
theorem enumeration_hex4_5335 : reassembles 21301 = true ∧ castsFifteens 21301 = true := by decide

/-- 5336: nibbles fold back to 21302; digit sum 17 ≡ 21302 (mod 15). -/
theorem enumeration_hex4_5336 : reassembles 21302 = true ∧ castsFifteens 21302 = true := by decide

/-- 5337: nibbles fold back to 21303; digit sum 18 ≡ 21303 (mod 15). -/
theorem enumeration_hex4_5337 : reassembles 21303 = true ∧ castsFifteens 21303 = true := by decide

/-- 5338: nibbles fold back to 21304; digit sum 19 ≡ 21304 (mod 15). -/
theorem enumeration_hex4_5338 : reassembles 21304 = true ∧ castsFifteens 21304 = true := by decide

/-- 5339: nibbles fold back to 21305; digit sum 20 ≡ 21305 (mod 15). -/
theorem enumeration_hex4_5339 : reassembles 21305 = true ∧ castsFifteens 21305 = true := by decide

/-- 533a: nibbles fold back to 21306; digit sum 21 ≡ 21306 (mod 15). -/
theorem enumeration_hex4_533a : reassembles 21306 = true ∧ castsFifteens 21306 = true := by decide

/-- 533b: nibbles fold back to 21307; digit sum 22 ≡ 21307 (mod 15). -/
theorem enumeration_hex4_533b : reassembles 21307 = true ∧ castsFifteens 21307 = true := by decide

/-- 533c: nibbles fold back to 21308; digit sum 23 ≡ 21308 (mod 15). -/
theorem enumeration_hex4_533c : reassembles 21308 = true ∧ castsFifteens 21308 = true := by decide

/-- 533d: nibbles fold back to 21309; digit sum 24 ≡ 21309 (mod 15). -/
theorem enumeration_hex4_533d : reassembles 21309 = true ∧ castsFifteens 21309 = true := by decide

/-- 533e: nibbles fold back to 21310; digit sum 25 ≡ 21310 (mod 15). -/
theorem enumeration_hex4_533e : reassembles 21310 = true ∧ castsFifteens 21310 = true := by decide

/-- 533f: nibbles fold back to 21311; digit sum 26 ≡ 21311 (mod 15). -/
theorem enumeration_hex4_533f : reassembles 21311 = true ∧ castsFifteens 21311 = true := by decide

/-- 5340: nibbles fold back to 21312; digit sum 12 ≡ 21312 (mod 15). -/
theorem enumeration_hex4_5340 : reassembles 21312 = true ∧ castsFifteens 21312 = true := by decide

/-- 5341: nibbles fold back to 21313; digit sum 13 ≡ 21313 (mod 15). -/
theorem enumeration_hex4_5341 : reassembles 21313 = true ∧ castsFifteens 21313 = true := by decide

/-- 5342: nibbles fold back to 21314; digit sum 14 ≡ 21314 (mod 15). -/
theorem enumeration_hex4_5342 : reassembles 21314 = true ∧ castsFifteens 21314 = true := by decide

/-- 5343: nibbles fold back to 21315; digit sum 15 ≡ 21315 (mod 15). -/
theorem enumeration_hex4_5343 : reassembles 21315 = true ∧ castsFifteens 21315 = true := by decide

/-- 5344: nibbles fold back to 21316; digit sum 16 ≡ 21316 (mod 15). -/
theorem enumeration_hex4_5344 : reassembles 21316 = true ∧ castsFifteens 21316 = true := by decide

/-- 5345: nibbles fold back to 21317; digit sum 17 ≡ 21317 (mod 15). -/
theorem enumeration_hex4_5345 : reassembles 21317 = true ∧ castsFifteens 21317 = true := by decide

/-- 5346: nibbles fold back to 21318; digit sum 18 ≡ 21318 (mod 15). -/
theorem enumeration_hex4_5346 : reassembles 21318 = true ∧ castsFifteens 21318 = true := by decide

/-- 5347: nibbles fold back to 21319; digit sum 19 ≡ 21319 (mod 15). -/
theorem enumeration_hex4_5347 : reassembles 21319 = true ∧ castsFifteens 21319 = true := by decide

/-- 5348: nibbles fold back to 21320; digit sum 20 ≡ 21320 (mod 15). -/
theorem enumeration_hex4_5348 : reassembles 21320 = true ∧ castsFifteens 21320 = true := by decide

/-- 5349: nibbles fold back to 21321; digit sum 21 ≡ 21321 (mod 15). -/
theorem enumeration_hex4_5349 : reassembles 21321 = true ∧ castsFifteens 21321 = true := by decide

/-- 534a: nibbles fold back to 21322; digit sum 22 ≡ 21322 (mod 15). -/
theorem enumeration_hex4_534a : reassembles 21322 = true ∧ castsFifteens 21322 = true := by decide

/-- 534b: nibbles fold back to 21323; digit sum 23 ≡ 21323 (mod 15). -/
theorem enumeration_hex4_534b : reassembles 21323 = true ∧ castsFifteens 21323 = true := by decide

/-- 534c: nibbles fold back to 21324; digit sum 24 ≡ 21324 (mod 15). -/
theorem enumeration_hex4_534c : reassembles 21324 = true ∧ castsFifteens 21324 = true := by decide

/-- 534d: nibbles fold back to 21325; digit sum 25 ≡ 21325 (mod 15). -/
theorem enumeration_hex4_534d : reassembles 21325 = true ∧ castsFifteens 21325 = true := by decide

/-- 534e: nibbles fold back to 21326; digit sum 26 ≡ 21326 (mod 15). -/
theorem enumeration_hex4_534e : reassembles 21326 = true ∧ castsFifteens 21326 = true := by decide

/-- 534f: nibbles fold back to 21327; digit sum 27 ≡ 21327 (mod 15). -/
theorem enumeration_hex4_534f : reassembles 21327 = true ∧ castsFifteens 21327 = true := by decide

/-- 5350: nibbles fold back to 21328; digit sum 13 ≡ 21328 (mod 15). -/
theorem enumeration_hex4_5350 : reassembles 21328 = true ∧ castsFifteens 21328 = true := by decide

/-- 5351: nibbles fold back to 21329; digit sum 14 ≡ 21329 (mod 15). -/
theorem enumeration_hex4_5351 : reassembles 21329 = true ∧ castsFifteens 21329 = true := by decide

/-- 5352: nibbles fold back to 21330; digit sum 15 ≡ 21330 (mod 15). -/
theorem enumeration_hex4_5352 : reassembles 21330 = true ∧ castsFifteens 21330 = true := by decide

/-- 5353: nibbles fold back to 21331; digit sum 16 ≡ 21331 (mod 15). -/
theorem enumeration_hex4_5353 : reassembles 21331 = true ∧ castsFifteens 21331 = true := by decide

/-- 5354: nibbles fold back to 21332; digit sum 17 ≡ 21332 (mod 15). -/
theorem enumeration_hex4_5354 : reassembles 21332 = true ∧ castsFifteens 21332 = true := by decide

/-- 5355: nibbles fold back to 21333; digit sum 18 ≡ 21333 (mod 15). -/
theorem enumeration_hex4_5355 : reassembles 21333 = true ∧ castsFifteens 21333 = true := by decide

/-- 5356: nibbles fold back to 21334; digit sum 19 ≡ 21334 (mod 15). -/
theorem enumeration_hex4_5356 : reassembles 21334 = true ∧ castsFifteens 21334 = true := by decide

/-- 5357: nibbles fold back to 21335; digit sum 20 ≡ 21335 (mod 15). -/
theorem enumeration_hex4_5357 : reassembles 21335 = true ∧ castsFifteens 21335 = true := by decide

/-- 5358: nibbles fold back to 21336; digit sum 21 ≡ 21336 (mod 15). -/
theorem enumeration_hex4_5358 : reassembles 21336 = true ∧ castsFifteens 21336 = true := by decide

/-- 5359: nibbles fold back to 21337; digit sum 22 ≡ 21337 (mod 15). -/
theorem enumeration_hex4_5359 : reassembles 21337 = true ∧ castsFifteens 21337 = true := by decide

/-- 535a: nibbles fold back to 21338; digit sum 23 ≡ 21338 (mod 15). -/
theorem enumeration_hex4_535a : reassembles 21338 = true ∧ castsFifteens 21338 = true := by decide

/-- 535b: nibbles fold back to 21339; digit sum 24 ≡ 21339 (mod 15). -/
theorem enumeration_hex4_535b : reassembles 21339 = true ∧ castsFifteens 21339 = true := by decide

/-- 535c: nibbles fold back to 21340; digit sum 25 ≡ 21340 (mod 15). -/
theorem enumeration_hex4_535c : reassembles 21340 = true ∧ castsFifteens 21340 = true := by decide

/-- 535d: nibbles fold back to 21341; digit sum 26 ≡ 21341 (mod 15). -/
theorem enumeration_hex4_535d : reassembles 21341 = true ∧ castsFifteens 21341 = true := by decide

/-- 535e: nibbles fold back to 21342; digit sum 27 ≡ 21342 (mod 15). -/
theorem enumeration_hex4_535e : reassembles 21342 = true ∧ castsFifteens 21342 = true := by decide

/-- 535f: nibbles fold back to 21343; digit sum 28 ≡ 21343 (mod 15). -/
theorem enumeration_hex4_535f : reassembles 21343 = true ∧ castsFifteens 21343 = true := by decide

/-- 5360: nibbles fold back to 21344; digit sum 14 ≡ 21344 (mod 15). -/
theorem enumeration_hex4_5360 : reassembles 21344 = true ∧ castsFifteens 21344 = true := by decide

/-- 5361: nibbles fold back to 21345; digit sum 15 ≡ 21345 (mod 15). -/
theorem enumeration_hex4_5361 : reassembles 21345 = true ∧ castsFifteens 21345 = true := by decide

/-- 5362: nibbles fold back to 21346; digit sum 16 ≡ 21346 (mod 15). -/
theorem enumeration_hex4_5362 : reassembles 21346 = true ∧ castsFifteens 21346 = true := by decide

/-- 5363: nibbles fold back to 21347; digit sum 17 ≡ 21347 (mod 15). -/
theorem enumeration_hex4_5363 : reassembles 21347 = true ∧ castsFifteens 21347 = true := by decide

/-- 5364: nibbles fold back to 21348; digit sum 18 ≡ 21348 (mod 15). -/
theorem enumeration_hex4_5364 : reassembles 21348 = true ∧ castsFifteens 21348 = true := by decide

/-- 5365: nibbles fold back to 21349; digit sum 19 ≡ 21349 (mod 15). -/
theorem enumeration_hex4_5365 : reassembles 21349 = true ∧ castsFifteens 21349 = true := by decide

/-- 5366: nibbles fold back to 21350; digit sum 20 ≡ 21350 (mod 15). -/
theorem enumeration_hex4_5366 : reassembles 21350 = true ∧ castsFifteens 21350 = true := by decide

/-- 5367: nibbles fold back to 21351; digit sum 21 ≡ 21351 (mod 15). -/
theorem enumeration_hex4_5367 : reassembles 21351 = true ∧ castsFifteens 21351 = true := by decide

/-- 5368: nibbles fold back to 21352; digit sum 22 ≡ 21352 (mod 15). -/
theorem enumeration_hex4_5368 : reassembles 21352 = true ∧ castsFifteens 21352 = true := by decide

/-- 5369: nibbles fold back to 21353; digit sum 23 ≡ 21353 (mod 15). -/
theorem enumeration_hex4_5369 : reassembles 21353 = true ∧ castsFifteens 21353 = true := by decide

/-- 536a: nibbles fold back to 21354; digit sum 24 ≡ 21354 (mod 15). -/
theorem enumeration_hex4_536a : reassembles 21354 = true ∧ castsFifteens 21354 = true := by decide

/-- 536b: nibbles fold back to 21355; digit sum 25 ≡ 21355 (mod 15). -/
theorem enumeration_hex4_536b : reassembles 21355 = true ∧ castsFifteens 21355 = true := by decide

/-- 536c: nibbles fold back to 21356; digit sum 26 ≡ 21356 (mod 15). -/
theorem enumeration_hex4_536c : reassembles 21356 = true ∧ castsFifteens 21356 = true := by decide

/-- 536d: nibbles fold back to 21357; digit sum 27 ≡ 21357 (mod 15). -/
theorem enumeration_hex4_536d : reassembles 21357 = true ∧ castsFifteens 21357 = true := by decide

/-- 536e: nibbles fold back to 21358; digit sum 28 ≡ 21358 (mod 15). -/
theorem enumeration_hex4_536e : reassembles 21358 = true ∧ castsFifteens 21358 = true := by decide

/-- 536f: nibbles fold back to 21359; digit sum 29 ≡ 21359 (mod 15). -/
theorem enumeration_hex4_536f : reassembles 21359 = true ∧ castsFifteens 21359 = true := by decide

/-- 5370: nibbles fold back to 21360; digit sum 15 ≡ 21360 (mod 15). -/
theorem enumeration_hex4_5370 : reassembles 21360 = true ∧ castsFifteens 21360 = true := by decide

/-- 5371: nibbles fold back to 21361; digit sum 16 ≡ 21361 (mod 15). -/
theorem enumeration_hex4_5371 : reassembles 21361 = true ∧ castsFifteens 21361 = true := by decide

/-- 5372: nibbles fold back to 21362; digit sum 17 ≡ 21362 (mod 15). -/
theorem enumeration_hex4_5372 : reassembles 21362 = true ∧ castsFifteens 21362 = true := by decide

/-- 5373: nibbles fold back to 21363; digit sum 18 ≡ 21363 (mod 15). -/
theorem enumeration_hex4_5373 : reassembles 21363 = true ∧ castsFifteens 21363 = true := by decide

/-- 5374: nibbles fold back to 21364; digit sum 19 ≡ 21364 (mod 15). -/
theorem enumeration_hex4_5374 : reassembles 21364 = true ∧ castsFifteens 21364 = true := by decide

/-- 5375: nibbles fold back to 21365; digit sum 20 ≡ 21365 (mod 15). -/
theorem enumeration_hex4_5375 : reassembles 21365 = true ∧ castsFifteens 21365 = true := by decide

/-- 5376: nibbles fold back to 21366; digit sum 21 ≡ 21366 (mod 15). -/
theorem enumeration_hex4_5376 : reassembles 21366 = true ∧ castsFifteens 21366 = true := by decide

/-- 5377: nibbles fold back to 21367; digit sum 22 ≡ 21367 (mod 15). -/
theorem enumeration_hex4_5377 : reassembles 21367 = true ∧ castsFifteens 21367 = true := by decide

/-- 5378: nibbles fold back to 21368; digit sum 23 ≡ 21368 (mod 15). -/
theorem enumeration_hex4_5378 : reassembles 21368 = true ∧ castsFifteens 21368 = true := by decide

/-- 5379: nibbles fold back to 21369; digit sum 24 ≡ 21369 (mod 15). -/
theorem enumeration_hex4_5379 : reassembles 21369 = true ∧ castsFifteens 21369 = true := by decide

/-- 537a: nibbles fold back to 21370; digit sum 25 ≡ 21370 (mod 15). -/
theorem enumeration_hex4_537a : reassembles 21370 = true ∧ castsFifteens 21370 = true := by decide

/-- 537b: nibbles fold back to 21371; digit sum 26 ≡ 21371 (mod 15). -/
theorem enumeration_hex4_537b : reassembles 21371 = true ∧ castsFifteens 21371 = true := by decide

/-- 537c: nibbles fold back to 21372; digit sum 27 ≡ 21372 (mod 15). -/
theorem enumeration_hex4_537c : reassembles 21372 = true ∧ castsFifteens 21372 = true := by decide

/-- 537d: nibbles fold back to 21373; digit sum 28 ≡ 21373 (mod 15). -/
theorem enumeration_hex4_537d : reassembles 21373 = true ∧ castsFifteens 21373 = true := by decide

/-- 537e: nibbles fold back to 21374; digit sum 29 ≡ 21374 (mod 15). -/
theorem enumeration_hex4_537e : reassembles 21374 = true ∧ castsFifteens 21374 = true := by decide

/-- 537f: nibbles fold back to 21375; digit sum 30 ≡ 21375 (mod 15). -/
theorem enumeration_hex4_537f : reassembles 21375 = true ∧ castsFifteens 21375 = true := by decide

/-- 5380: nibbles fold back to 21376; digit sum 16 ≡ 21376 (mod 15). -/
theorem enumeration_hex4_5380 : reassembles 21376 = true ∧ castsFifteens 21376 = true := by decide

/-- 5381: nibbles fold back to 21377; digit sum 17 ≡ 21377 (mod 15). -/
theorem enumeration_hex4_5381 : reassembles 21377 = true ∧ castsFifteens 21377 = true := by decide

/-- 5382: nibbles fold back to 21378; digit sum 18 ≡ 21378 (mod 15). -/
theorem enumeration_hex4_5382 : reassembles 21378 = true ∧ castsFifteens 21378 = true := by decide

/-- 5383: nibbles fold back to 21379; digit sum 19 ≡ 21379 (mod 15). -/
theorem enumeration_hex4_5383 : reassembles 21379 = true ∧ castsFifteens 21379 = true := by decide

/-- 5384: nibbles fold back to 21380; digit sum 20 ≡ 21380 (mod 15). -/
theorem enumeration_hex4_5384 : reassembles 21380 = true ∧ castsFifteens 21380 = true := by decide

/-- 5385: nibbles fold back to 21381; digit sum 21 ≡ 21381 (mod 15). -/
theorem enumeration_hex4_5385 : reassembles 21381 = true ∧ castsFifteens 21381 = true := by decide

/-- 5386: nibbles fold back to 21382; digit sum 22 ≡ 21382 (mod 15). -/
theorem enumeration_hex4_5386 : reassembles 21382 = true ∧ castsFifteens 21382 = true := by decide

/-- 5387: nibbles fold back to 21383; digit sum 23 ≡ 21383 (mod 15). -/
theorem enumeration_hex4_5387 : reassembles 21383 = true ∧ castsFifteens 21383 = true := by decide

/-- 5388: nibbles fold back to 21384; digit sum 24 ≡ 21384 (mod 15). -/
theorem enumeration_hex4_5388 : reassembles 21384 = true ∧ castsFifteens 21384 = true := by decide

/-- 5389: nibbles fold back to 21385; digit sum 25 ≡ 21385 (mod 15). -/
theorem enumeration_hex4_5389 : reassembles 21385 = true ∧ castsFifteens 21385 = true := by decide

/-- 538a: nibbles fold back to 21386; digit sum 26 ≡ 21386 (mod 15). -/
theorem enumeration_hex4_538a : reassembles 21386 = true ∧ castsFifteens 21386 = true := by decide

/-- 538b: nibbles fold back to 21387; digit sum 27 ≡ 21387 (mod 15). -/
theorem enumeration_hex4_538b : reassembles 21387 = true ∧ castsFifteens 21387 = true := by decide

/-- 538c: nibbles fold back to 21388; digit sum 28 ≡ 21388 (mod 15). -/
theorem enumeration_hex4_538c : reassembles 21388 = true ∧ castsFifteens 21388 = true := by decide

/-- 538d: nibbles fold back to 21389; digit sum 29 ≡ 21389 (mod 15). -/
theorem enumeration_hex4_538d : reassembles 21389 = true ∧ castsFifteens 21389 = true := by decide

/-- 538e: nibbles fold back to 21390; digit sum 30 ≡ 21390 (mod 15). -/
theorem enumeration_hex4_538e : reassembles 21390 = true ∧ castsFifteens 21390 = true := by decide

/-- 538f: nibbles fold back to 21391; digit sum 31 ≡ 21391 (mod 15). -/
theorem enumeration_hex4_538f : reassembles 21391 = true ∧ castsFifteens 21391 = true := by decide

/-- 5390: nibbles fold back to 21392; digit sum 17 ≡ 21392 (mod 15). -/
theorem enumeration_hex4_5390 : reassembles 21392 = true ∧ castsFifteens 21392 = true := by decide

/-- 5391: nibbles fold back to 21393; digit sum 18 ≡ 21393 (mod 15). -/
theorem enumeration_hex4_5391 : reassembles 21393 = true ∧ castsFifteens 21393 = true := by decide

/-- 5392: nibbles fold back to 21394; digit sum 19 ≡ 21394 (mod 15). -/
theorem enumeration_hex4_5392 : reassembles 21394 = true ∧ castsFifteens 21394 = true := by decide

/-- 5393: nibbles fold back to 21395; digit sum 20 ≡ 21395 (mod 15). -/
theorem enumeration_hex4_5393 : reassembles 21395 = true ∧ castsFifteens 21395 = true := by decide

/-- 5394: nibbles fold back to 21396; digit sum 21 ≡ 21396 (mod 15). -/
theorem enumeration_hex4_5394 : reassembles 21396 = true ∧ castsFifteens 21396 = true := by decide

/-- 5395: nibbles fold back to 21397; digit sum 22 ≡ 21397 (mod 15). -/
theorem enumeration_hex4_5395 : reassembles 21397 = true ∧ castsFifteens 21397 = true := by decide

/-- 5396: nibbles fold back to 21398; digit sum 23 ≡ 21398 (mod 15). -/
theorem enumeration_hex4_5396 : reassembles 21398 = true ∧ castsFifteens 21398 = true := by decide

/-- 5397: nibbles fold back to 21399; digit sum 24 ≡ 21399 (mod 15). -/
theorem enumeration_hex4_5397 : reassembles 21399 = true ∧ castsFifteens 21399 = true := by decide

/-- 5398: nibbles fold back to 21400; digit sum 25 ≡ 21400 (mod 15). -/
theorem enumeration_hex4_5398 : reassembles 21400 = true ∧ castsFifteens 21400 = true := by decide

/-- 5399: nibbles fold back to 21401; digit sum 26 ≡ 21401 (mod 15). -/
theorem enumeration_hex4_5399 : reassembles 21401 = true ∧ castsFifteens 21401 = true := by decide

/-- 539a: nibbles fold back to 21402; digit sum 27 ≡ 21402 (mod 15). -/
theorem enumeration_hex4_539a : reassembles 21402 = true ∧ castsFifteens 21402 = true := by decide

/-- 539b: nibbles fold back to 21403; digit sum 28 ≡ 21403 (mod 15). -/
theorem enumeration_hex4_539b : reassembles 21403 = true ∧ castsFifteens 21403 = true := by decide

/-- 539c: nibbles fold back to 21404; digit sum 29 ≡ 21404 (mod 15). -/
theorem enumeration_hex4_539c : reassembles 21404 = true ∧ castsFifteens 21404 = true := by decide

/-- 539d: nibbles fold back to 21405; digit sum 30 ≡ 21405 (mod 15). -/
theorem enumeration_hex4_539d : reassembles 21405 = true ∧ castsFifteens 21405 = true := by decide

/-- 539e: nibbles fold back to 21406; digit sum 31 ≡ 21406 (mod 15). -/
theorem enumeration_hex4_539e : reassembles 21406 = true ∧ castsFifteens 21406 = true := by decide

/-- 539f: nibbles fold back to 21407; digit sum 32 ≡ 21407 (mod 15). -/
theorem enumeration_hex4_539f : reassembles 21407 = true ∧ castsFifteens 21407 = true := by decide

/-- 53a0: nibbles fold back to 21408; digit sum 18 ≡ 21408 (mod 15). -/
theorem enumeration_hex4_53a0 : reassembles 21408 = true ∧ castsFifteens 21408 = true := by decide

/-- 53a1: nibbles fold back to 21409; digit sum 19 ≡ 21409 (mod 15). -/
theorem enumeration_hex4_53a1 : reassembles 21409 = true ∧ castsFifteens 21409 = true := by decide

/-- 53a2: nibbles fold back to 21410; digit sum 20 ≡ 21410 (mod 15). -/
theorem enumeration_hex4_53a2 : reassembles 21410 = true ∧ castsFifteens 21410 = true := by decide

/-- 53a3: nibbles fold back to 21411; digit sum 21 ≡ 21411 (mod 15). -/
theorem enumeration_hex4_53a3 : reassembles 21411 = true ∧ castsFifteens 21411 = true := by decide

/-- 53a4: nibbles fold back to 21412; digit sum 22 ≡ 21412 (mod 15). -/
theorem enumeration_hex4_53a4 : reassembles 21412 = true ∧ castsFifteens 21412 = true := by decide

/-- 53a5: nibbles fold back to 21413; digit sum 23 ≡ 21413 (mod 15). -/
theorem enumeration_hex4_53a5 : reassembles 21413 = true ∧ castsFifteens 21413 = true := by decide

/-- 53a6: nibbles fold back to 21414; digit sum 24 ≡ 21414 (mod 15). -/
theorem enumeration_hex4_53a6 : reassembles 21414 = true ∧ castsFifteens 21414 = true := by decide

/-- 53a7: nibbles fold back to 21415; digit sum 25 ≡ 21415 (mod 15). -/
theorem enumeration_hex4_53a7 : reassembles 21415 = true ∧ castsFifteens 21415 = true := by decide

/-- 53a8: nibbles fold back to 21416; digit sum 26 ≡ 21416 (mod 15). -/
theorem enumeration_hex4_53a8 : reassembles 21416 = true ∧ castsFifteens 21416 = true := by decide

/-- 53a9: nibbles fold back to 21417; digit sum 27 ≡ 21417 (mod 15). -/
theorem enumeration_hex4_53a9 : reassembles 21417 = true ∧ castsFifteens 21417 = true := by decide

/-- 53aa: nibbles fold back to 21418; digit sum 28 ≡ 21418 (mod 15). -/
theorem enumeration_hex4_53aa : reassembles 21418 = true ∧ castsFifteens 21418 = true := by decide

/-- 53ab: nibbles fold back to 21419; digit sum 29 ≡ 21419 (mod 15). -/
theorem enumeration_hex4_53ab : reassembles 21419 = true ∧ castsFifteens 21419 = true := by decide

/-- 53ac: nibbles fold back to 21420; digit sum 30 ≡ 21420 (mod 15). -/
theorem enumeration_hex4_53ac : reassembles 21420 = true ∧ castsFifteens 21420 = true := by decide

/-- 53ad: nibbles fold back to 21421; digit sum 31 ≡ 21421 (mod 15). -/
theorem enumeration_hex4_53ad : reassembles 21421 = true ∧ castsFifteens 21421 = true := by decide

/-- 53ae: nibbles fold back to 21422; digit sum 32 ≡ 21422 (mod 15). -/
theorem enumeration_hex4_53ae : reassembles 21422 = true ∧ castsFifteens 21422 = true := by decide

/-- 53af: nibbles fold back to 21423; digit sum 33 ≡ 21423 (mod 15). -/
theorem enumeration_hex4_53af : reassembles 21423 = true ∧ castsFifteens 21423 = true := by decide

/-- 53b0: nibbles fold back to 21424; digit sum 19 ≡ 21424 (mod 15). -/
theorem enumeration_hex4_53b0 : reassembles 21424 = true ∧ castsFifteens 21424 = true := by decide

/-- 53b1: nibbles fold back to 21425; digit sum 20 ≡ 21425 (mod 15). -/
theorem enumeration_hex4_53b1 : reassembles 21425 = true ∧ castsFifteens 21425 = true := by decide

/-- 53b2: nibbles fold back to 21426; digit sum 21 ≡ 21426 (mod 15). -/
theorem enumeration_hex4_53b2 : reassembles 21426 = true ∧ castsFifteens 21426 = true := by decide

/-- 53b3: nibbles fold back to 21427; digit sum 22 ≡ 21427 (mod 15). -/
theorem enumeration_hex4_53b3 : reassembles 21427 = true ∧ castsFifteens 21427 = true := by decide

/-- 53b4: nibbles fold back to 21428; digit sum 23 ≡ 21428 (mod 15). -/
theorem enumeration_hex4_53b4 : reassembles 21428 = true ∧ castsFifteens 21428 = true := by decide

/-- 53b5: nibbles fold back to 21429; digit sum 24 ≡ 21429 (mod 15). -/
theorem enumeration_hex4_53b5 : reassembles 21429 = true ∧ castsFifteens 21429 = true := by decide

/-- 53b6: nibbles fold back to 21430; digit sum 25 ≡ 21430 (mod 15). -/
theorem enumeration_hex4_53b6 : reassembles 21430 = true ∧ castsFifteens 21430 = true := by decide

/-- 53b7: nibbles fold back to 21431; digit sum 26 ≡ 21431 (mod 15). -/
theorem enumeration_hex4_53b7 : reassembles 21431 = true ∧ castsFifteens 21431 = true := by decide

/-- 53b8: nibbles fold back to 21432; digit sum 27 ≡ 21432 (mod 15). -/
theorem enumeration_hex4_53b8 : reassembles 21432 = true ∧ castsFifteens 21432 = true := by decide

/-- 53b9: nibbles fold back to 21433; digit sum 28 ≡ 21433 (mod 15). -/
theorem enumeration_hex4_53b9 : reassembles 21433 = true ∧ castsFifteens 21433 = true := by decide

/-- 53ba: nibbles fold back to 21434; digit sum 29 ≡ 21434 (mod 15). -/
theorem enumeration_hex4_53ba : reassembles 21434 = true ∧ castsFifteens 21434 = true := by decide

/-- 53bb: nibbles fold back to 21435; digit sum 30 ≡ 21435 (mod 15). -/
theorem enumeration_hex4_53bb : reassembles 21435 = true ∧ castsFifteens 21435 = true := by decide

/-- 53bc: nibbles fold back to 21436; digit sum 31 ≡ 21436 (mod 15). -/
theorem enumeration_hex4_53bc : reassembles 21436 = true ∧ castsFifteens 21436 = true := by decide

/-- 53bd: nibbles fold back to 21437; digit sum 32 ≡ 21437 (mod 15). -/
theorem enumeration_hex4_53bd : reassembles 21437 = true ∧ castsFifteens 21437 = true := by decide

/-- 53be: nibbles fold back to 21438; digit sum 33 ≡ 21438 (mod 15). -/
theorem enumeration_hex4_53be : reassembles 21438 = true ∧ castsFifteens 21438 = true := by decide

/-- 53bf: nibbles fold back to 21439; digit sum 34 ≡ 21439 (mod 15). -/
theorem enumeration_hex4_53bf : reassembles 21439 = true ∧ castsFifteens 21439 = true := by decide

/-- 53c0: nibbles fold back to 21440; digit sum 20 ≡ 21440 (mod 15). -/
theorem enumeration_hex4_53c0 : reassembles 21440 = true ∧ castsFifteens 21440 = true := by decide

/-- 53c1: nibbles fold back to 21441; digit sum 21 ≡ 21441 (mod 15). -/
theorem enumeration_hex4_53c1 : reassembles 21441 = true ∧ castsFifteens 21441 = true := by decide

/-- 53c2: nibbles fold back to 21442; digit sum 22 ≡ 21442 (mod 15). -/
theorem enumeration_hex4_53c2 : reassembles 21442 = true ∧ castsFifteens 21442 = true := by decide

/-- 53c3: nibbles fold back to 21443; digit sum 23 ≡ 21443 (mod 15). -/
theorem enumeration_hex4_53c3 : reassembles 21443 = true ∧ castsFifteens 21443 = true := by decide

/-- 53c4: nibbles fold back to 21444; digit sum 24 ≡ 21444 (mod 15). -/
theorem enumeration_hex4_53c4 : reassembles 21444 = true ∧ castsFifteens 21444 = true := by decide

/-- 53c5: nibbles fold back to 21445; digit sum 25 ≡ 21445 (mod 15). -/
theorem enumeration_hex4_53c5 : reassembles 21445 = true ∧ castsFifteens 21445 = true := by decide

/-- 53c6: nibbles fold back to 21446; digit sum 26 ≡ 21446 (mod 15). -/
theorem enumeration_hex4_53c6 : reassembles 21446 = true ∧ castsFifteens 21446 = true := by decide

/-- 53c7: nibbles fold back to 21447; digit sum 27 ≡ 21447 (mod 15). -/
theorem enumeration_hex4_53c7 : reassembles 21447 = true ∧ castsFifteens 21447 = true := by decide

/-- 53c8: nibbles fold back to 21448; digit sum 28 ≡ 21448 (mod 15). -/
theorem enumeration_hex4_53c8 : reassembles 21448 = true ∧ castsFifteens 21448 = true := by decide

/-- 53c9: nibbles fold back to 21449; digit sum 29 ≡ 21449 (mod 15). -/
theorem enumeration_hex4_53c9 : reassembles 21449 = true ∧ castsFifteens 21449 = true := by decide

/-- 53ca: nibbles fold back to 21450; digit sum 30 ≡ 21450 (mod 15). -/
theorem enumeration_hex4_53ca : reassembles 21450 = true ∧ castsFifteens 21450 = true := by decide

/-- 53cb: nibbles fold back to 21451; digit sum 31 ≡ 21451 (mod 15). -/
theorem enumeration_hex4_53cb : reassembles 21451 = true ∧ castsFifteens 21451 = true := by decide

/-- 53cc: nibbles fold back to 21452; digit sum 32 ≡ 21452 (mod 15). -/
theorem enumeration_hex4_53cc : reassembles 21452 = true ∧ castsFifteens 21452 = true := by decide

/-- 53cd: nibbles fold back to 21453; digit sum 33 ≡ 21453 (mod 15). -/
theorem enumeration_hex4_53cd : reassembles 21453 = true ∧ castsFifteens 21453 = true := by decide

/-- 53ce: nibbles fold back to 21454; digit sum 34 ≡ 21454 (mod 15). -/
theorem enumeration_hex4_53ce : reassembles 21454 = true ∧ castsFifteens 21454 = true := by decide

/-- 53cf: nibbles fold back to 21455; digit sum 35 ≡ 21455 (mod 15). -/
theorem enumeration_hex4_53cf : reassembles 21455 = true ∧ castsFifteens 21455 = true := by decide

/-- 53d0: nibbles fold back to 21456; digit sum 21 ≡ 21456 (mod 15). -/
theorem enumeration_hex4_53d0 : reassembles 21456 = true ∧ castsFifteens 21456 = true := by decide

/-- 53d1: nibbles fold back to 21457; digit sum 22 ≡ 21457 (mod 15). -/
theorem enumeration_hex4_53d1 : reassembles 21457 = true ∧ castsFifteens 21457 = true := by decide

/-- 53d2: nibbles fold back to 21458; digit sum 23 ≡ 21458 (mod 15). -/
theorem enumeration_hex4_53d2 : reassembles 21458 = true ∧ castsFifteens 21458 = true := by decide

/-- 53d3: nibbles fold back to 21459; digit sum 24 ≡ 21459 (mod 15). -/
theorem enumeration_hex4_53d3 : reassembles 21459 = true ∧ castsFifteens 21459 = true := by decide

/-- 53d4: nibbles fold back to 21460; digit sum 25 ≡ 21460 (mod 15). -/
theorem enumeration_hex4_53d4 : reassembles 21460 = true ∧ castsFifteens 21460 = true := by decide

/-- 53d5: nibbles fold back to 21461; digit sum 26 ≡ 21461 (mod 15). -/
theorem enumeration_hex4_53d5 : reassembles 21461 = true ∧ castsFifteens 21461 = true := by decide

/-- 53d6: nibbles fold back to 21462; digit sum 27 ≡ 21462 (mod 15). -/
theorem enumeration_hex4_53d6 : reassembles 21462 = true ∧ castsFifteens 21462 = true := by decide

/-- 53d7: nibbles fold back to 21463; digit sum 28 ≡ 21463 (mod 15). -/
theorem enumeration_hex4_53d7 : reassembles 21463 = true ∧ castsFifteens 21463 = true := by decide

/-- 53d8: nibbles fold back to 21464; digit sum 29 ≡ 21464 (mod 15). -/
theorem enumeration_hex4_53d8 : reassembles 21464 = true ∧ castsFifteens 21464 = true := by decide

/-- 53d9: nibbles fold back to 21465; digit sum 30 ≡ 21465 (mod 15). -/
theorem enumeration_hex4_53d9 : reassembles 21465 = true ∧ castsFifteens 21465 = true := by decide

/-- 53da: nibbles fold back to 21466; digit sum 31 ≡ 21466 (mod 15). -/
theorem enumeration_hex4_53da : reassembles 21466 = true ∧ castsFifteens 21466 = true := by decide

/-- 53db: nibbles fold back to 21467; digit sum 32 ≡ 21467 (mod 15). -/
theorem enumeration_hex4_53db : reassembles 21467 = true ∧ castsFifteens 21467 = true := by decide

/-- 53dc: nibbles fold back to 21468; digit sum 33 ≡ 21468 (mod 15). -/
theorem enumeration_hex4_53dc : reassembles 21468 = true ∧ castsFifteens 21468 = true := by decide

/-- 53dd: nibbles fold back to 21469; digit sum 34 ≡ 21469 (mod 15). -/
theorem enumeration_hex4_53dd : reassembles 21469 = true ∧ castsFifteens 21469 = true := by decide

/-- 53de: nibbles fold back to 21470; digit sum 35 ≡ 21470 (mod 15). -/
theorem enumeration_hex4_53de : reassembles 21470 = true ∧ castsFifteens 21470 = true := by decide

/-- 53df: nibbles fold back to 21471; digit sum 36 ≡ 21471 (mod 15). -/
theorem enumeration_hex4_53df : reassembles 21471 = true ∧ castsFifteens 21471 = true := by decide

/-- 53e0: nibbles fold back to 21472; digit sum 22 ≡ 21472 (mod 15). -/
theorem enumeration_hex4_53e0 : reassembles 21472 = true ∧ castsFifteens 21472 = true := by decide

/-- 53e1: nibbles fold back to 21473; digit sum 23 ≡ 21473 (mod 15). -/
theorem enumeration_hex4_53e1 : reassembles 21473 = true ∧ castsFifteens 21473 = true := by decide

/-- 53e2: nibbles fold back to 21474; digit sum 24 ≡ 21474 (mod 15). -/
theorem enumeration_hex4_53e2 : reassembles 21474 = true ∧ castsFifteens 21474 = true := by decide

/-- 53e3: nibbles fold back to 21475; digit sum 25 ≡ 21475 (mod 15). -/
theorem enumeration_hex4_53e3 : reassembles 21475 = true ∧ castsFifteens 21475 = true := by decide

/-- 53e4: nibbles fold back to 21476; digit sum 26 ≡ 21476 (mod 15). -/
theorem enumeration_hex4_53e4 : reassembles 21476 = true ∧ castsFifteens 21476 = true := by decide

/-- 53e5: nibbles fold back to 21477; digit sum 27 ≡ 21477 (mod 15). -/
theorem enumeration_hex4_53e5 : reassembles 21477 = true ∧ castsFifteens 21477 = true := by decide

/-- 53e6: nibbles fold back to 21478; digit sum 28 ≡ 21478 (mod 15). -/
theorem enumeration_hex4_53e6 : reassembles 21478 = true ∧ castsFifteens 21478 = true := by decide

/-- 53e7: nibbles fold back to 21479; digit sum 29 ≡ 21479 (mod 15). -/
theorem enumeration_hex4_53e7 : reassembles 21479 = true ∧ castsFifteens 21479 = true := by decide

/-- 53e8: nibbles fold back to 21480; digit sum 30 ≡ 21480 (mod 15). -/
theorem enumeration_hex4_53e8 : reassembles 21480 = true ∧ castsFifteens 21480 = true := by decide

/-- 53e9: nibbles fold back to 21481; digit sum 31 ≡ 21481 (mod 15). -/
theorem enumeration_hex4_53e9 : reassembles 21481 = true ∧ castsFifteens 21481 = true := by decide

/-- 53ea: nibbles fold back to 21482; digit sum 32 ≡ 21482 (mod 15). -/
theorem enumeration_hex4_53ea : reassembles 21482 = true ∧ castsFifteens 21482 = true := by decide

/-- 53eb: nibbles fold back to 21483; digit sum 33 ≡ 21483 (mod 15). -/
theorem enumeration_hex4_53eb : reassembles 21483 = true ∧ castsFifteens 21483 = true := by decide

/-- 53ec: nibbles fold back to 21484; digit sum 34 ≡ 21484 (mod 15). -/
theorem enumeration_hex4_53ec : reassembles 21484 = true ∧ castsFifteens 21484 = true := by decide

/-- 53ed: nibbles fold back to 21485; digit sum 35 ≡ 21485 (mod 15). -/
theorem enumeration_hex4_53ed : reassembles 21485 = true ∧ castsFifteens 21485 = true := by decide

/-- 53ee: nibbles fold back to 21486; digit sum 36 ≡ 21486 (mod 15). -/
theorem enumeration_hex4_53ee : reassembles 21486 = true ∧ castsFifteens 21486 = true := by decide

/-- 53ef: nibbles fold back to 21487; digit sum 37 ≡ 21487 (mod 15). -/
theorem enumeration_hex4_53ef : reassembles 21487 = true ∧ castsFifteens 21487 = true := by decide

/-- 53f0: nibbles fold back to 21488; digit sum 23 ≡ 21488 (mod 15). -/
theorem enumeration_hex4_53f0 : reassembles 21488 = true ∧ castsFifteens 21488 = true := by decide

/-- 53f1: nibbles fold back to 21489; digit sum 24 ≡ 21489 (mod 15). -/
theorem enumeration_hex4_53f1 : reassembles 21489 = true ∧ castsFifteens 21489 = true := by decide

/-- 53f2: nibbles fold back to 21490; digit sum 25 ≡ 21490 (mod 15). -/
theorem enumeration_hex4_53f2 : reassembles 21490 = true ∧ castsFifteens 21490 = true := by decide

/-- 53f3: nibbles fold back to 21491; digit sum 26 ≡ 21491 (mod 15). -/
theorem enumeration_hex4_53f3 : reassembles 21491 = true ∧ castsFifteens 21491 = true := by decide

/-- 53f4: nibbles fold back to 21492; digit sum 27 ≡ 21492 (mod 15). -/
theorem enumeration_hex4_53f4 : reassembles 21492 = true ∧ castsFifteens 21492 = true := by decide

/-- 53f5: nibbles fold back to 21493; digit sum 28 ≡ 21493 (mod 15). -/
theorem enumeration_hex4_53f5 : reassembles 21493 = true ∧ castsFifteens 21493 = true := by decide

/-- 53f6: nibbles fold back to 21494; digit sum 29 ≡ 21494 (mod 15). -/
theorem enumeration_hex4_53f6 : reassembles 21494 = true ∧ castsFifteens 21494 = true := by decide

/-- 53f7: nibbles fold back to 21495; digit sum 30 ≡ 21495 (mod 15). -/
theorem enumeration_hex4_53f7 : reassembles 21495 = true ∧ castsFifteens 21495 = true := by decide

/-- 53f8: nibbles fold back to 21496; digit sum 31 ≡ 21496 (mod 15). -/
theorem enumeration_hex4_53f8 : reassembles 21496 = true ∧ castsFifteens 21496 = true := by decide

/-- 53f9: nibbles fold back to 21497; digit sum 32 ≡ 21497 (mod 15). -/
theorem enumeration_hex4_53f9 : reassembles 21497 = true ∧ castsFifteens 21497 = true := by decide

/-- 53fa: nibbles fold back to 21498; digit sum 33 ≡ 21498 (mod 15). -/
theorem enumeration_hex4_53fa : reassembles 21498 = true ∧ castsFifteens 21498 = true := by decide

/-- 53fb: nibbles fold back to 21499; digit sum 34 ≡ 21499 (mod 15). -/
theorem enumeration_hex4_53fb : reassembles 21499 = true ∧ castsFifteens 21499 = true := by decide

/-- 53fc: nibbles fold back to 21500; digit sum 35 ≡ 21500 (mod 15). -/
theorem enumeration_hex4_53fc : reassembles 21500 = true ∧ castsFifteens 21500 = true := by decide

/-- 53fd: nibbles fold back to 21501; digit sum 36 ≡ 21501 (mod 15). -/
theorem enumeration_hex4_53fd : reassembles 21501 = true ∧ castsFifteens 21501 = true := by decide

/-- 53fe: nibbles fold back to 21502; digit sum 37 ≡ 21502 (mod 15). -/
theorem enumeration_hex4_53fe : reassembles 21502 = true ∧ castsFifteens 21502 = true := by decide

/-- 53ff: nibbles fold back to 21503; digit sum 38 ≡ 21503 (mod 15). -/
theorem enumeration_hex4_53ff : reassembles 21503 = true ∧ castsFifteens 21503 = true := by decide

/-- 5400: nibbles fold back to 21504; digit sum 9 ≡ 21504 (mod 15). -/
theorem enumeration_hex4_5400 : reassembles 21504 = true ∧ castsFifteens 21504 = true := by decide

/-- 5401: nibbles fold back to 21505; digit sum 10 ≡ 21505 (mod 15). -/
theorem enumeration_hex4_5401 : reassembles 21505 = true ∧ castsFifteens 21505 = true := by decide

/-- 5402: nibbles fold back to 21506; digit sum 11 ≡ 21506 (mod 15). -/
theorem enumeration_hex4_5402 : reassembles 21506 = true ∧ castsFifteens 21506 = true := by decide

/-- 5403: nibbles fold back to 21507; digit sum 12 ≡ 21507 (mod 15). -/
theorem enumeration_hex4_5403 : reassembles 21507 = true ∧ castsFifteens 21507 = true := by decide

/-- 5404: nibbles fold back to 21508; digit sum 13 ≡ 21508 (mod 15). -/
theorem enumeration_hex4_5404 : reassembles 21508 = true ∧ castsFifteens 21508 = true := by decide

/-- 5405: nibbles fold back to 21509; digit sum 14 ≡ 21509 (mod 15). -/
theorem enumeration_hex4_5405 : reassembles 21509 = true ∧ castsFifteens 21509 = true := by decide

/-- 5406: nibbles fold back to 21510; digit sum 15 ≡ 21510 (mod 15). -/
theorem enumeration_hex4_5406 : reassembles 21510 = true ∧ castsFifteens 21510 = true := by decide

/-- 5407: nibbles fold back to 21511; digit sum 16 ≡ 21511 (mod 15). -/
theorem enumeration_hex4_5407 : reassembles 21511 = true ∧ castsFifteens 21511 = true := by decide

/-- 5408: nibbles fold back to 21512; digit sum 17 ≡ 21512 (mod 15). -/
theorem enumeration_hex4_5408 : reassembles 21512 = true ∧ castsFifteens 21512 = true := by decide

/-- 5409: nibbles fold back to 21513; digit sum 18 ≡ 21513 (mod 15). -/
theorem enumeration_hex4_5409 : reassembles 21513 = true ∧ castsFifteens 21513 = true := by decide

/-- 540a: nibbles fold back to 21514; digit sum 19 ≡ 21514 (mod 15). -/
theorem enumeration_hex4_540a : reassembles 21514 = true ∧ castsFifteens 21514 = true := by decide

/-- 540b: nibbles fold back to 21515; digit sum 20 ≡ 21515 (mod 15). -/
theorem enumeration_hex4_540b : reassembles 21515 = true ∧ castsFifteens 21515 = true := by decide

/-- 540c: nibbles fold back to 21516; digit sum 21 ≡ 21516 (mod 15). -/
theorem enumeration_hex4_540c : reassembles 21516 = true ∧ castsFifteens 21516 = true := by decide

/-- 540d: nibbles fold back to 21517; digit sum 22 ≡ 21517 (mod 15). -/
theorem enumeration_hex4_540d : reassembles 21517 = true ∧ castsFifteens 21517 = true := by decide

/-- 540e: nibbles fold back to 21518; digit sum 23 ≡ 21518 (mod 15). -/
theorem enumeration_hex4_540e : reassembles 21518 = true ∧ castsFifteens 21518 = true := by decide

/-- 540f: nibbles fold back to 21519; digit sum 24 ≡ 21519 (mod 15). -/
theorem enumeration_hex4_540f : reassembles 21519 = true ∧ castsFifteens 21519 = true := by decide

/-- 5410: nibbles fold back to 21520; digit sum 10 ≡ 21520 (mod 15). -/
theorem enumeration_hex4_5410 : reassembles 21520 = true ∧ castsFifteens 21520 = true := by decide

/-- 5411: nibbles fold back to 21521; digit sum 11 ≡ 21521 (mod 15). -/
theorem enumeration_hex4_5411 : reassembles 21521 = true ∧ castsFifteens 21521 = true := by decide

/-- 5412: nibbles fold back to 21522; digit sum 12 ≡ 21522 (mod 15). -/
theorem enumeration_hex4_5412 : reassembles 21522 = true ∧ castsFifteens 21522 = true := by decide

/-- 5413: nibbles fold back to 21523; digit sum 13 ≡ 21523 (mod 15). -/
theorem enumeration_hex4_5413 : reassembles 21523 = true ∧ castsFifteens 21523 = true := by decide

/-- 5414: nibbles fold back to 21524; digit sum 14 ≡ 21524 (mod 15). -/
theorem enumeration_hex4_5414 : reassembles 21524 = true ∧ castsFifteens 21524 = true := by decide

/-- 5415: nibbles fold back to 21525; digit sum 15 ≡ 21525 (mod 15). -/
theorem enumeration_hex4_5415 : reassembles 21525 = true ∧ castsFifteens 21525 = true := by decide

/-- 5416: nibbles fold back to 21526; digit sum 16 ≡ 21526 (mod 15). -/
theorem enumeration_hex4_5416 : reassembles 21526 = true ∧ castsFifteens 21526 = true := by decide

/-- 5417: nibbles fold back to 21527; digit sum 17 ≡ 21527 (mod 15). -/
theorem enumeration_hex4_5417 : reassembles 21527 = true ∧ castsFifteens 21527 = true := by decide

/-- 5418: nibbles fold back to 21528; digit sum 18 ≡ 21528 (mod 15). -/
theorem enumeration_hex4_5418 : reassembles 21528 = true ∧ castsFifteens 21528 = true := by decide

/-- 5419: nibbles fold back to 21529; digit sum 19 ≡ 21529 (mod 15). -/
theorem enumeration_hex4_5419 : reassembles 21529 = true ∧ castsFifteens 21529 = true := by decide

/-- 541a: nibbles fold back to 21530; digit sum 20 ≡ 21530 (mod 15). -/
theorem enumeration_hex4_541a : reassembles 21530 = true ∧ castsFifteens 21530 = true := by decide

/-- 541b: nibbles fold back to 21531; digit sum 21 ≡ 21531 (mod 15). -/
theorem enumeration_hex4_541b : reassembles 21531 = true ∧ castsFifteens 21531 = true := by decide

/-- 541c: nibbles fold back to 21532; digit sum 22 ≡ 21532 (mod 15). -/
theorem enumeration_hex4_541c : reassembles 21532 = true ∧ castsFifteens 21532 = true := by decide

/-- 541d: nibbles fold back to 21533; digit sum 23 ≡ 21533 (mod 15). -/
theorem enumeration_hex4_541d : reassembles 21533 = true ∧ castsFifteens 21533 = true := by decide

/-- 541e: nibbles fold back to 21534; digit sum 24 ≡ 21534 (mod 15). -/
theorem enumeration_hex4_541e : reassembles 21534 = true ∧ castsFifteens 21534 = true := by decide

/-- 541f: nibbles fold back to 21535; digit sum 25 ≡ 21535 (mod 15). -/
theorem enumeration_hex4_541f : reassembles 21535 = true ∧ castsFifteens 21535 = true := by decide

/-- 5420: nibbles fold back to 21536; digit sum 11 ≡ 21536 (mod 15). -/
theorem enumeration_hex4_5420 : reassembles 21536 = true ∧ castsFifteens 21536 = true := by decide

/-- 5421: nibbles fold back to 21537; digit sum 12 ≡ 21537 (mod 15). -/
theorem enumeration_hex4_5421 : reassembles 21537 = true ∧ castsFifteens 21537 = true := by decide

/-- 5422: nibbles fold back to 21538; digit sum 13 ≡ 21538 (mod 15). -/
theorem enumeration_hex4_5422 : reassembles 21538 = true ∧ castsFifteens 21538 = true := by decide

/-- 5423: nibbles fold back to 21539; digit sum 14 ≡ 21539 (mod 15). -/
theorem enumeration_hex4_5423 : reassembles 21539 = true ∧ castsFifteens 21539 = true := by decide

/-- 5424: nibbles fold back to 21540; digit sum 15 ≡ 21540 (mod 15). -/
theorem enumeration_hex4_5424 : reassembles 21540 = true ∧ castsFifteens 21540 = true := by decide

/-- 5425: nibbles fold back to 21541; digit sum 16 ≡ 21541 (mod 15). -/
theorem enumeration_hex4_5425 : reassembles 21541 = true ∧ castsFifteens 21541 = true := by decide

/-- 5426: nibbles fold back to 21542; digit sum 17 ≡ 21542 (mod 15). -/
theorem enumeration_hex4_5426 : reassembles 21542 = true ∧ castsFifteens 21542 = true := by decide

/-- 5427: nibbles fold back to 21543; digit sum 18 ≡ 21543 (mod 15). -/
theorem enumeration_hex4_5427 : reassembles 21543 = true ∧ castsFifteens 21543 = true := by decide

/-- 5428: nibbles fold back to 21544; digit sum 19 ≡ 21544 (mod 15). -/
theorem enumeration_hex4_5428 : reassembles 21544 = true ∧ castsFifteens 21544 = true := by decide

/-- 5429: nibbles fold back to 21545; digit sum 20 ≡ 21545 (mod 15). -/
theorem enumeration_hex4_5429 : reassembles 21545 = true ∧ castsFifteens 21545 = true := by decide

/-- 542a: nibbles fold back to 21546; digit sum 21 ≡ 21546 (mod 15). -/
theorem enumeration_hex4_542a : reassembles 21546 = true ∧ castsFifteens 21546 = true := by decide

/-- 542b: nibbles fold back to 21547; digit sum 22 ≡ 21547 (mod 15). -/
theorem enumeration_hex4_542b : reassembles 21547 = true ∧ castsFifteens 21547 = true := by decide

/-- 542c: nibbles fold back to 21548; digit sum 23 ≡ 21548 (mod 15). -/
theorem enumeration_hex4_542c : reassembles 21548 = true ∧ castsFifteens 21548 = true := by decide

/-- 542d: nibbles fold back to 21549; digit sum 24 ≡ 21549 (mod 15). -/
theorem enumeration_hex4_542d : reassembles 21549 = true ∧ castsFifteens 21549 = true := by decide

/-- 542e: nibbles fold back to 21550; digit sum 25 ≡ 21550 (mod 15). -/
theorem enumeration_hex4_542e : reassembles 21550 = true ∧ castsFifteens 21550 = true := by decide

/-- 542f: nibbles fold back to 21551; digit sum 26 ≡ 21551 (mod 15). -/
theorem enumeration_hex4_542f : reassembles 21551 = true ∧ castsFifteens 21551 = true := by decide

/-- 5430: nibbles fold back to 21552; digit sum 12 ≡ 21552 (mod 15). -/
theorem enumeration_hex4_5430 : reassembles 21552 = true ∧ castsFifteens 21552 = true := by decide

/-- 5431: nibbles fold back to 21553; digit sum 13 ≡ 21553 (mod 15). -/
theorem enumeration_hex4_5431 : reassembles 21553 = true ∧ castsFifteens 21553 = true := by decide

/-- 5432: nibbles fold back to 21554; digit sum 14 ≡ 21554 (mod 15). -/
theorem enumeration_hex4_5432 : reassembles 21554 = true ∧ castsFifteens 21554 = true := by decide

/-- 5433: nibbles fold back to 21555; digit sum 15 ≡ 21555 (mod 15). -/
theorem enumeration_hex4_5433 : reassembles 21555 = true ∧ castsFifteens 21555 = true := by decide

/-- 5434: nibbles fold back to 21556; digit sum 16 ≡ 21556 (mod 15). -/
theorem enumeration_hex4_5434 : reassembles 21556 = true ∧ castsFifteens 21556 = true := by decide

/-- 5435: nibbles fold back to 21557; digit sum 17 ≡ 21557 (mod 15). -/
theorem enumeration_hex4_5435 : reassembles 21557 = true ∧ castsFifteens 21557 = true := by decide

/-- 5436: nibbles fold back to 21558; digit sum 18 ≡ 21558 (mod 15). -/
theorem enumeration_hex4_5436 : reassembles 21558 = true ∧ castsFifteens 21558 = true := by decide

/-- 5437: nibbles fold back to 21559; digit sum 19 ≡ 21559 (mod 15). -/
theorem enumeration_hex4_5437 : reassembles 21559 = true ∧ castsFifteens 21559 = true := by decide

/-- 5438: nibbles fold back to 21560; digit sum 20 ≡ 21560 (mod 15). -/
theorem enumeration_hex4_5438 : reassembles 21560 = true ∧ castsFifteens 21560 = true := by decide

/-- 5439: nibbles fold back to 21561; digit sum 21 ≡ 21561 (mod 15). -/
theorem enumeration_hex4_5439 : reassembles 21561 = true ∧ castsFifteens 21561 = true := by decide

/-- 543a: nibbles fold back to 21562; digit sum 22 ≡ 21562 (mod 15). -/
theorem enumeration_hex4_543a : reassembles 21562 = true ∧ castsFifteens 21562 = true := by decide

/-- 543b: nibbles fold back to 21563; digit sum 23 ≡ 21563 (mod 15). -/
theorem enumeration_hex4_543b : reassembles 21563 = true ∧ castsFifteens 21563 = true := by decide

/-- 543c: nibbles fold back to 21564; digit sum 24 ≡ 21564 (mod 15). -/
theorem enumeration_hex4_543c : reassembles 21564 = true ∧ castsFifteens 21564 = true := by decide

/-- 543d: nibbles fold back to 21565; digit sum 25 ≡ 21565 (mod 15). -/
theorem enumeration_hex4_543d : reassembles 21565 = true ∧ castsFifteens 21565 = true := by decide

/-- 543e: nibbles fold back to 21566; digit sum 26 ≡ 21566 (mod 15). -/
theorem enumeration_hex4_543e : reassembles 21566 = true ∧ castsFifteens 21566 = true := by decide

/-- 543f: nibbles fold back to 21567; digit sum 27 ≡ 21567 (mod 15). -/
theorem enumeration_hex4_543f : reassembles 21567 = true ∧ castsFifteens 21567 = true := by decide

/-- 5440: nibbles fold back to 21568; digit sum 13 ≡ 21568 (mod 15). -/
theorem enumeration_hex4_5440 : reassembles 21568 = true ∧ castsFifteens 21568 = true := by decide

/-- 5441: nibbles fold back to 21569; digit sum 14 ≡ 21569 (mod 15). -/
theorem enumeration_hex4_5441 : reassembles 21569 = true ∧ castsFifteens 21569 = true := by decide

/-- 5442: nibbles fold back to 21570; digit sum 15 ≡ 21570 (mod 15). -/
theorem enumeration_hex4_5442 : reassembles 21570 = true ∧ castsFifteens 21570 = true := by decide

/-- 5443: nibbles fold back to 21571; digit sum 16 ≡ 21571 (mod 15). -/
theorem enumeration_hex4_5443 : reassembles 21571 = true ∧ castsFifteens 21571 = true := by decide

/-- 5444: nibbles fold back to 21572; digit sum 17 ≡ 21572 (mod 15). -/
theorem enumeration_hex4_5444 : reassembles 21572 = true ∧ castsFifteens 21572 = true := by decide

/-- 5445: nibbles fold back to 21573; digit sum 18 ≡ 21573 (mod 15). -/
theorem enumeration_hex4_5445 : reassembles 21573 = true ∧ castsFifteens 21573 = true := by decide

/-- 5446: nibbles fold back to 21574; digit sum 19 ≡ 21574 (mod 15). -/
theorem enumeration_hex4_5446 : reassembles 21574 = true ∧ castsFifteens 21574 = true := by decide

/-- 5447: nibbles fold back to 21575; digit sum 20 ≡ 21575 (mod 15). -/
theorem enumeration_hex4_5447 : reassembles 21575 = true ∧ castsFifteens 21575 = true := by decide

/-- 5448: nibbles fold back to 21576; digit sum 21 ≡ 21576 (mod 15). -/
theorem enumeration_hex4_5448 : reassembles 21576 = true ∧ castsFifteens 21576 = true := by decide

/-- 5449: nibbles fold back to 21577; digit sum 22 ≡ 21577 (mod 15). -/
theorem enumeration_hex4_5449 : reassembles 21577 = true ∧ castsFifteens 21577 = true := by decide

/-- 544a: nibbles fold back to 21578; digit sum 23 ≡ 21578 (mod 15). -/
theorem enumeration_hex4_544a : reassembles 21578 = true ∧ castsFifteens 21578 = true := by decide

/-- 544b: nibbles fold back to 21579; digit sum 24 ≡ 21579 (mod 15). -/
theorem enumeration_hex4_544b : reassembles 21579 = true ∧ castsFifteens 21579 = true := by decide

/-- 544c: nibbles fold back to 21580; digit sum 25 ≡ 21580 (mod 15). -/
theorem enumeration_hex4_544c : reassembles 21580 = true ∧ castsFifteens 21580 = true := by decide

/-- 544d: nibbles fold back to 21581; digit sum 26 ≡ 21581 (mod 15). -/
theorem enumeration_hex4_544d : reassembles 21581 = true ∧ castsFifteens 21581 = true := by decide

/-- 544e: nibbles fold back to 21582; digit sum 27 ≡ 21582 (mod 15). -/
theorem enumeration_hex4_544e : reassembles 21582 = true ∧ castsFifteens 21582 = true := by decide

/-- 544f: nibbles fold back to 21583; digit sum 28 ≡ 21583 (mod 15). -/
theorem enumeration_hex4_544f : reassembles 21583 = true ∧ castsFifteens 21583 = true := by decide

/-- 5450: nibbles fold back to 21584; digit sum 14 ≡ 21584 (mod 15). -/
theorem enumeration_hex4_5450 : reassembles 21584 = true ∧ castsFifteens 21584 = true := by decide

/-- 5451: nibbles fold back to 21585; digit sum 15 ≡ 21585 (mod 15). -/
theorem enumeration_hex4_5451 : reassembles 21585 = true ∧ castsFifteens 21585 = true := by decide

/-- 5452: nibbles fold back to 21586; digit sum 16 ≡ 21586 (mod 15). -/
theorem enumeration_hex4_5452 : reassembles 21586 = true ∧ castsFifteens 21586 = true := by decide

/-- 5453: nibbles fold back to 21587; digit sum 17 ≡ 21587 (mod 15). -/
theorem enumeration_hex4_5453 : reassembles 21587 = true ∧ castsFifteens 21587 = true := by decide

/-- 5454: nibbles fold back to 21588; digit sum 18 ≡ 21588 (mod 15). -/
theorem enumeration_hex4_5454 : reassembles 21588 = true ∧ castsFifteens 21588 = true := by decide

/-- 5455: nibbles fold back to 21589; digit sum 19 ≡ 21589 (mod 15). -/
theorem enumeration_hex4_5455 : reassembles 21589 = true ∧ castsFifteens 21589 = true := by decide

/-- 5456: nibbles fold back to 21590; digit sum 20 ≡ 21590 (mod 15). -/
theorem enumeration_hex4_5456 : reassembles 21590 = true ∧ castsFifteens 21590 = true := by decide

/-- 5457: nibbles fold back to 21591; digit sum 21 ≡ 21591 (mod 15). -/
theorem enumeration_hex4_5457 : reassembles 21591 = true ∧ castsFifteens 21591 = true := by decide

/-- 5458: nibbles fold back to 21592; digit sum 22 ≡ 21592 (mod 15). -/
theorem enumeration_hex4_5458 : reassembles 21592 = true ∧ castsFifteens 21592 = true := by decide

/-- 5459: nibbles fold back to 21593; digit sum 23 ≡ 21593 (mod 15). -/
theorem enumeration_hex4_5459 : reassembles 21593 = true ∧ castsFifteens 21593 = true := by decide

/-- 545a: nibbles fold back to 21594; digit sum 24 ≡ 21594 (mod 15). -/
theorem enumeration_hex4_545a : reassembles 21594 = true ∧ castsFifteens 21594 = true := by decide

/-- 545b: nibbles fold back to 21595; digit sum 25 ≡ 21595 (mod 15). -/
theorem enumeration_hex4_545b : reassembles 21595 = true ∧ castsFifteens 21595 = true := by decide

/-- 545c: nibbles fold back to 21596; digit sum 26 ≡ 21596 (mod 15). -/
theorem enumeration_hex4_545c : reassembles 21596 = true ∧ castsFifteens 21596 = true := by decide

/-- 545d: nibbles fold back to 21597; digit sum 27 ≡ 21597 (mod 15). -/
theorem enumeration_hex4_545d : reassembles 21597 = true ∧ castsFifteens 21597 = true := by decide

/-- 545e: nibbles fold back to 21598; digit sum 28 ≡ 21598 (mod 15). -/
theorem enumeration_hex4_545e : reassembles 21598 = true ∧ castsFifteens 21598 = true := by decide

/-- 545f: nibbles fold back to 21599; digit sum 29 ≡ 21599 (mod 15). -/
theorem enumeration_hex4_545f : reassembles 21599 = true ∧ castsFifteens 21599 = true := by decide

/-- 5460: nibbles fold back to 21600; digit sum 15 ≡ 21600 (mod 15). -/
theorem enumeration_hex4_5460 : reassembles 21600 = true ∧ castsFifteens 21600 = true := by decide

/-- 5461: nibbles fold back to 21601; digit sum 16 ≡ 21601 (mod 15). -/
theorem enumeration_hex4_5461 : reassembles 21601 = true ∧ castsFifteens 21601 = true := by decide

/-- 5462: nibbles fold back to 21602; digit sum 17 ≡ 21602 (mod 15). -/
theorem enumeration_hex4_5462 : reassembles 21602 = true ∧ castsFifteens 21602 = true := by decide

/-- 5463: nibbles fold back to 21603; digit sum 18 ≡ 21603 (mod 15). -/
theorem enumeration_hex4_5463 : reassembles 21603 = true ∧ castsFifteens 21603 = true := by decide

/-- 5464: nibbles fold back to 21604; digit sum 19 ≡ 21604 (mod 15). -/
theorem enumeration_hex4_5464 : reassembles 21604 = true ∧ castsFifteens 21604 = true := by decide

/-- 5465: nibbles fold back to 21605; digit sum 20 ≡ 21605 (mod 15). -/
theorem enumeration_hex4_5465 : reassembles 21605 = true ∧ castsFifteens 21605 = true := by decide

/-- 5466: nibbles fold back to 21606; digit sum 21 ≡ 21606 (mod 15). -/
theorem enumeration_hex4_5466 : reassembles 21606 = true ∧ castsFifteens 21606 = true := by decide

/-- 5467: nibbles fold back to 21607; digit sum 22 ≡ 21607 (mod 15). -/
theorem enumeration_hex4_5467 : reassembles 21607 = true ∧ castsFifteens 21607 = true := by decide

/-- 5468: nibbles fold back to 21608; digit sum 23 ≡ 21608 (mod 15). -/
theorem enumeration_hex4_5468 : reassembles 21608 = true ∧ castsFifteens 21608 = true := by decide

/-- 5469: nibbles fold back to 21609; digit sum 24 ≡ 21609 (mod 15). -/
theorem enumeration_hex4_5469 : reassembles 21609 = true ∧ castsFifteens 21609 = true := by decide

/-- 546a: nibbles fold back to 21610; digit sum 25 ≡ 21610 (mod 15). -/
theorem enumeration_hex4_546a : reassembles 21610 = true ∧ castsFifteens 21610 = true := by decide

/-- 546b: nibbles fold back to 21611; digit sum 26 ≡ 21611 (mod 15). -/
theorem enumeration_hex4_546b : reassembles 21611 = true ∧ castsFifteens 21611 = true := by decide

/-- 546c: nibbles fold back to 21612; digit sum 27 ≡ 21612 (mod 15). -/
theorem enumeration_hex4_546c : reassembles 21612 = true ∧ castsFifteens 21612 = true := by decide

/-- 546d: nibbles fold back to 21613; digit sum 28 ≡ 21613 (mod 15). -/
theorem enumeration_hex4_546d : reassembles 21613 = true ∧ castsFifteens 21613 = true := by decide

/-- 546e: nibbles fold back to 21614; digit sum 29 ≡ 21614 (mod 15). -/
theorem enumeration_hex4_546e : reassembles 21614 = true ∧ castsFifteens 21614 = true := by decide

/-- 546f: nibbles fold back to 21615; digit sum 30 ≡ 21615 (mod 15). -/
theorem enumeration_hex4_546f : reassembles 21615 = true ∧ castsFifteens 21615 = true := by decide

/-- 5470: nibbles fold back to 21616; digit sum 16 ≡ 21616 (mod 15). -/
theorem enumeration_hex4_5470 : reassembles 21616 = true ∧ castsFifteens 21616 = true := by decide

/-- 5471: nibbles fold back to 21617; digit sum 17 ≡ 21617 (mod 15). -/
theorem enumeration_hex4_5471 : reassembles 21617 = true ∧ castsFifteens 21617 = true := by decide

/-- 5472: nibbles fold back to 21618; digit sum 18 ≡ 21618 (mod 15). -/
theorem enumeration_hex4_5472 : reassembles 21618 = true ∧ castsFifteens 21618 = true := by decide

/-- 5473: nibbles fold back to 21619; digit sum 19 ≡ 21619 (mod 15). -/
theorem enumeration_hex4_5473 : reassembles 21619 = true ∧ castsFifteens 21619 = true := by decide

/-- 5474: nibbles fold back to 21620; digit sum 20 ≡ 21620 (mod 15). -/
theorem enumeration_hex4_5474 : reassembles 21620 = true ∧ castsFifteens 21620 = true := by decide

/-- 5475: nibbles fold back to 21621; digit sum 21 ≡ 21621 (mod 15). -/
theorem enumeration_hex4_5475 : reassembles 21621 = true ∧ castsFifteens 21621 = true := by decide

/-- 5476: nibbles fold back to 21622; digit sum 22 ≡ 21622 (mod 15). -/
theorem enumeration_hex4_5476 : reassembles 21622 = true ∧ castsFifteens 21622 = true := by decide

/-- 5477: nibbles fold back to 21623; digit sum 23 ≡ 21623 (mod 15). -/
theorem enumeration_hex4_5477 : reassembles 21623 = true ∧ castsFifteens 21623 = true := by decide

/-- 5478: nibbles fold back to 21624; digit sum 24 ≡ 21624 (mod 15). -/
theorem enumeration_hex4_5478 : reassembles 21624 = true ∧ castsFifteens 21624 = true := by decide

/-- 5479: nibbles fold back to 21625; digit sum 25 ≡ 21625 (mod 15). -/
theorem enumeration_hex4_5479 : reassembles 21625 = true ∧ castsFifteens 21625 = true := by decide

/-- 547a: nibbles fold back to 21626; digit sum 26 ≡ 21626 (mod 15). -/
theorem enumeration_hex4_547a : reassembles 21626 = true ∧ castsFifteens 21626 = true := by decide

/-- 547b: nibbles fold back to 21627; digit sum 27 ≡ 21627 (mod 15). -/
theorem enumeration_hex4_547b : reassembles 21627 = true ∧ castsFifteens 21627 = true := by decide

/-- 547c: nibbles fold back to 21628; digit sum 28 ≡ 21628 (mod 15). -/
theorem enumeration_hex4_547c : reassembles 21628 = true ∧ castsFifteens 21628 = true := by decide

/-- 547d: nibbles fold back to 21629; digit sum 29 ≡ 21629 (mod 15). -/
theorem enumeration_hex4_547d : reassembles 21629 = true ∧ castsFifteens 21629 = true := by decide

/-- 547e: nibbles fold back to 21630; digit sum 30 ≡ 21630 (mod 15). -/
theorem enumeration_hex4_547e : reassembles 21630 = true ∧ castsFifteens 21630 = true := by decide

/-- 547f: nibbles fold back to 21631; digit sum 31 ≡ 21631 (mod 15). -/
theorem enumeration_hex4_547f : reassembles 21631 = true ∧ castsFifteens 21631 = true := by decide

/-- 5480: nibbles fold back to 21632; digit sum 17 ≡ 21632 (mod 15). -/
theorem enumeration_hex4_5480 : reassembles 21632 = true ∧ castsFifteens 21632 = true := by decide

/-- 5481: nibbles fold back to 21633; digit sum 18 ≡ 21633 (mod 15). -/
theorem enumeration_hex4_5481 : reassembles 21633 = true ∧ castsFifteens 21633 = true := by decide

/-- 5482: nibbles fold back to 21634; digit sum 19 ≡ 21634 (mod 15). -/
theorem enumeration_hex4_5482 : reassembles 21634 = true ∧ castsFifteens 21634 = true := by decide

/-- 5483: nibbles fold back to 21635; digit sum 20 ≡ 21635 (mod 15). -/
theorem enumeration_hex4_5483 : reassembles 21635 = true ∧ castsFifteens 21635 = true := by decide

/-- 5484: nibbles fold back to 21636; digit sum 21 ≡ 21636 (mod 15). -/
theorem enumeration_hex4_5484 : reassembles 21636 = true ∧ castsFifteens 21636 = true := by decide

/-- 5485: nibbles fold back to 21637; digit sum 22 ≡ 21637 (mod 15). -/
theorem enumeration_hex4_5485 : reassembles 21637 = true ∧ castsFifteens 21637 = true := by decide

/-- 5486: nibbles fold back to 21638; digit sum 23 ≡ 21638 (mod 15). -/
theorem enumeration_hex4_5486 : reassembles 21638 = true ∧ castsFifteens 21638 = true := by decide

/-- 5487: nibbles fold back to 21639; digit sum 24 ≡ 21639 (mod 15). -/
theorem enumeration_hex4_5487 : reassembles 21639 = true ∧ castsFifteens 21639 = true := by decide

/-- 5488: nibbles fold back to 21640; digit sum 25 ≡ 21640 (mod 15). -/
theorem enumeration_hex4_5488 : reassembles 21640 = true ∧ castsFifteens 21640 = true := by decide

/-- 5489: nibbles fold back to 21641; digit sum 26 ≡ 21641 (mod 15). -/
theorem enumeration_hex4_5489 : reassembles 21641 = true ∧ castsFifteens 21641 = true := by decide

/-- 548a: nibbles fold back to 21642; digit sum 27 ≡ 21642 (mod 15). -/
theorem enumeration_hex4_548a : reassembles 21642 = true ∧ castsFifteens 21642 = true := by decide

/-- 548b: nibbles fold back to 21643; digit sum 28 ≡ 21643 (mod 15). -/
theorem enumeration_hex4_548b : reassembles 21643 = true ∧ castsFifteens 21643 = true := by decide

/-- 548c: nibbles fold back to 21644; digit sum 29 ≡ 21644 (mod 15). -/
theorem enumeration_hex4_548c : reassembles 21644 = true ∧ castsFifteens 21644 = true := by decide

/-- 548d: nibbles fold back to 21645; digit sum 30 ≡ 21645 (mod 15). -/
theorem enumeration_hex4_548d : reassembles 21645 = true ∧ castsFifteens 21645 = true := by decide

/-- 548e: nibbles fold back to 21646; digit sum 31 ≡ 21646 (mod 15). -/
theorem enumeration_hex4_548e : reassembles 21646 = true ∧ castsFifteens 21646 = true := by decide

/-- 548f: nibbles fold back to 21647; digit sum 32 ≡ 21647 (mod 15). -/
theorem enumeration_hex4_548f : reassembles 21647 = true ∧ castsFifteens 21647 = true := by decide

/-- 5490: nibbles fold back to 21648; digit sum 18 ≡ 21648 (mod 15). -/
theorem enumeration_hex4_5490 : reassembles 21648 = true ∧ castsFifteens 21648 = true := by decide

/-- 5491: nibbles fold back to 21649; digit sum 19 ≡ 21649 (mod 15). -/
theorem enumeration_hex4_5491 : reassembles 21649 = true ∧ castsFifteens 21649 = true := by decide

/-- 5492: nibbles fold back to 21650; digit sum 20 ≡ 21650 (mod 15). -/
theorem enumeration_hex4_5492 : reassembles 21650 = true ∧ castsFifteens 21650 = true := by decide

/-- 5493: nibbles fold back to 21651; digit sum 21 ≡ 21651 (mod 15). -/
theorem enumeration_hex4_5493 : reassembles 21651 = true ∧ castsFifteens 21651 = true := by decide

/-- 5494: nibbles fold back to 21652; digit sum 22 ≡ 21652 (mod 15). -/
theorem enumeration_hex4_5494 : reassembles 21652 = true ∧ castsFifteens 21652 = true := by decide

/-- 5495: nibbles fold back to 21653; digit sum 23 ≡ 21653 (mod 15). -/
theorem enumeration_hex4_5495 : reassembles 21653 = true ∧ castsFifteens 21653 = true := by decide

/-- 5496: nibbles fold back to 21654; digit sum 24 ≡ 21654 (mod 15). -/
theorem enumeration_hex4_5496 : reassembles 21654 = true ∧ castsFifteens 21654 = true := by decide

/-- 5497: nibbles fold back to 21655; digit sum 25 ≡ 21655 (mod 15). -/
theorem enumeration_hex4_5497 : reassembles 21655 = true ∧ castsFifteens 21655 = true := by decide

/-- 5498: nibbles fold back to 21656; digit sum 26 ≡ 21656 (mod 15). -/
theorem enumeration_hex4_5498 : reassembles 21656 = true ∧ castsFifteens 21656 = true := by decide

/-- 5499: nibbles fold back to 21657; digit sum 27 ≡ 21657 (mod 15). -/
theorem enumeration_hex4_5499 : reassembles 21657 = true ∧ castsFifteens 21657 = true := by decide

/-- 549a: nibbles fold back to 21658; digit sum 28 ≡ 21658 (mod 15). -/
theorem enumeration_hex4_549a : reassembles 21658 = true ∧ castsFifteens 21658 = true := by decide

/-- 549b: nibbles fold back to 21659; digit sum 29 ≡ 21659 (mod 15). -/
theorem enumeration_hex4_549b : reassembles 21659 = true ∧ castsFifteens 21659 = true := by decide

/-- 549c: nibbles fold back to 21660; digit sum 30 ≡ 21660 (mod 15). -/
theorem enumeration_hex4_549c : reassembles 21660 = true ∧ castsFifteens 21660 = true := by decide

/-- 549d: nibbles fold back to 21661; digit sum 31 ≡ 21661 (mod 15). -/
theorem enumeration_hex4_549d : reassembles 21661 = true ∧ castsFifteens 21661 = true := by decide

/-- 549e: nibbles fold back to 21662; digit sum 32 ≡ 21662 (mod 15). -/
theorem enumeration_hex4_549e : reassembles 21662 = true ∧ castsFifteens 21662 = true := by decide

/-- 549f: nibbles fold back to 21663; digit sum 33 ≡ 21663 (mod 15). -/
theorem enumeration_hex4_549f : reassembles 21663 = true ∧ castsFifteens 21663 = true := by decide

/-- 54a0: nibbles fold back to 21664; digit sum 19 ≡ 21664 (mod 15). -/
theorem enumeration_hex4_54a0 : reassembles 21664 = true ∧ castsFifteens 21664 = true := by decide

/-- 54a1: nibbles fold back to 21665; digit sum 20 ≡ 21665 (mod 15). -/
theorem enumeration_hex4_54a1 : reassembles 21665 = true ∧ castsFifteens 21665 = true := by decide

/-- 54a2: nibbles fold back to 21666; digit sum 21 ≡ 21666 (mod 15). -/
theorem enumeration_hex4_54a2 : reassembles 21666 = true ∧ castsFifteens 21666 = true := by decide

/-- 54a3: nibbles fold back to 21667; digit sum 22 ≡ 21667 (mod 15). -/
theorem enumeration_hex4_54a3 : reassembles 21667 = true ∧ castsFifteens 21667 = true := by decide

/-- 54a4: nibbles fold back to 21668; digit sum 23 ≡ 21668 (mod 15). -/
theorem enumeration_hex4_54a4 : reassembles 21668 = true ∧ castsFifteens 21668 = true := by decide

/-- 54a5: nibbles fold back to 21669; digit sum 24 ≡ 21669 (mod 15). -/
theorem enumeration_hex4_54a5 : reassembles 21669 = true ∧ castsFifteens 21669 = true := by decide

/-- 54a6: nibbles fold back to 21670; digit sum 25 ≡ 21670 (mod 15). -/
theorem enumeration_hex4_54a6 : reassembles 21670 = true ∧ castsFifteens 21670 = true := by decide

/-- 54a7: nibbles fold back to 21671; digit sum 26 ≡ 21671 (mod 15). -/
theorem enumeration_hex4_54a7 : reassembles 21671 = true ∧ castsFifteens 21671 = true := by decide

/-- 54a8: nibbles fold back to 21672; digit sum 27 ≡ 21672 (mod 15). -/
theorem enumeration_hex4_54a8 : reassembles 21672 = true ∧ castsFifteens 21672 = true := by decide

/-- 54a9: nibbles fold back to 21673; digit sum 28 ≡ 21673 (mod 15). -/
theorem enumeration_hex4_54a9 : reassembles 21673 = true ∧ castsFifteens 21673 = true := by decide

/-- 54aa: nibbles fold back to 21674; digit sum 29 ≡ 21674 (mod 15). -/
theorem enumeration_hex4_54aa : reassembles 21674 = true ∧ castsFifteens 21674 = true := by decide

/-- 54ab: nibbles fold back to 21675; digit sum 30 ≡ 21675 (mod 15). -/
theorem enumeration_hex4_54ab : reassembles 21675 = true ∧ castsFifteens 21675 = true := by decide

/-- 54ac: nibbles fold back to 21676; digit sum 31 ≡ 21676 (mod 15). -/
theorem enumeration_hex4_54ac : reassembles 21676 = true ∧ castsFifteens 21676 = true := by decide

/-- 54ad: nibbles fold back to 21677; digit sum 32 ≡ 21677 (mod 15). -/
theorem enumeration_hex4_54ad : reassembles 21677 = true ∧ castsFifteens 21677 = true := by decide

/-- 54ae: nibbles fold back to 21678; digit sum 33 ≡ 21678 (mod 15). -/
theorem enumeration_hex4_54ae : reassembles 21678 = true ∧ castsFifteens 21678 = true := by decide

/-- 54af: nibbles fold back to 21679; digit sum 34 ≡ 21679 (mod 15). -/
theorem enumeration_hex4_54af : reassembles 21679 = true ∧ castsFifteens 21679 = true := by decide

/-- 54b0: nibbles fold back to 21680; digit sum 20 ≡ 21680 (mod 15). -/
theorem enumeration_hex4_54b0 : reassembles 21680 = true ∧ castsFifteens 21680 = true := by decide

/-- 54b1: nibbles fold back to 21681; digit sum 21 ≡ 21681 (mod 15). -/
theorem enumeration_hex4_54b1 : reassembles 21681 = true ∧ castsFifteens 21681 = true := by decide

/-- 54b2: nibbles fold back to 21682; digit sum 22 ≡ 21682 (mod 15). -/
theorem enumeration_hex4_54b2 : reassembles 21682 = true ∧ castsFifteens 21682 = true := by decide

/-- 54b3: nibbles fold back to 21683; digit sum 23 ≡ 21683 (mod 15). -/
theorem enumeration_hex4_54b3 : reassembles 21683 = true ∧ castsFifteens 21683 = true := by decide

/-- 54b4: nibbles fold back to 21684; digit sum 24 ≡ 21684 (mod 15). -/
theorem enumeration_hex4_54b4 : reassembles 21684 = true ∧ castsFifteens 21684 = true := by decide

/-- 54b5: nibbles fold back to 21685; digit sum 25 ≡ 21685 (mod 15). -/
theorem enumeration_hex4_54b5 : reassembles 21685 = true ∧ castsFifteens 21685 = true := by decide

/-- 54b6: nibbles fold back to 21686; digit sum 26 ≡ 21686 (mod 15). -/
theorem enumeration_hex4_54b6 : reassembles 21686 = true ∧ castsFifteens 21686 = true := by decide

/-- 54b7: nibbles fold back to 21687; digit sum 27 ≡ 21687 (mod 15). -/
theorem enumeration_hex4_54b7 : reassembles 21687 = true ∧ castsFifteens 21687 = true := by decide

/-- 54b8: nibbles fold back to 21688; digit sum 28 ≡ 21688 (mod 15). -/
theorem enumeration_hex4_54b8 : reassembles 21688 = true ∧ castsFifteens 21688 = true := by decide

/-- 54b9: nibbles fold back to 21689; digit sum 29 ≡ 21689 (mod 15). -/
theorem enumeration_hex4_54b9 : reassembles 21689 = true ∧ castsFifteens 21689 = true := by decide

/-- 54ba: nibbles fold back to 21690; digit sum 30 ≡ 21690 (mod 15). -/
theorem enumeration_hex4_54ba : reassembles 21690 = true ∧ castsFifteens 21690 = true := by decide

/-- 54bb: nibbles fold back to 21691; digit sum 31 ≡ 21691 (mod 15). -/
theorem enumeration_hex4_54bb : reassembles 21691 = true ∧ castsFifteens 21691 = true := by decide

/-- 54bc: nibbles fold back to 21692; digit sum 32 ≡ 21692 (mod 15). -/
theorem enumeration_hex4_54bc : reassembles 21692 = true ∧ castsFifteens 21692 = true := by decide

/-- 54bd: nibbles fold back to 21693; digit sum 33 ≡ 21693 (mod 15). -/
theorem enumeration_hex4_54bd : reassembles 21693 = true ∧ castsFifteens 21693 = true := by decide

/-- 54be: nibbles fold back to 21694; digit sum 34 ≡ 21694 (mod 15). -/
theorem enumeration_hex4_54be : reassembles 21694 = true ∧ castsFifteens 21694 = true := by decide

/-- 54bf: nibbles fold back to 21695; digit sum 35 ≡ 21695 (mod 15). -/
theorem enumeration_hex4_54bf : reassembles 21695 = true ∧ castsFifteens 21695 = true := by decide

/-- 54c0: nibbles fold back to 21696; digit sum 21 ≡ 21696 (mod 15). -/
theorem enumeration_hex4_54c0 : reassembles 21696 = true ∧ castsFifteens 21696 = true := by decide

/-- 54c1: nibbles fold back to 21697; digit sum 22 ≡ 21697 (mod 15). -/
theorem enumeration_hex4_54c1 : reassembles 21697 = true ∧ castsFifteens 21697 = true := by decide

/-- 54c2: nibbles fold back to 21698; digit sum 23 ≡ 21698 (mod 15). -/
theorem enumeration_hex4_54c2 : reassembles 21698 = true ∧ castsFifteens 21698 = true := by decide

/-- 54c3: nibbles fold back to 21699; digit sum 24 ≡ 21699 (mod 15). -/
theorem enumeration_hex4_54c3 : reassembles 21699 = true ∧ castsFifteens 21699 = true := by decide

/-- 54c4: nibbles fold back to 21700; digit sum 25 ≡ 21700 (mod 15). -/
theorem enumeration_hex4_54c4 : reassembles 21700 = true ∧ castsFifteens 21700 = true := by decide

/-- 54c5: nibbles fold back to 21701; digit sum 26 ≡ 21701 (mod 15). -/
theorem enumeration_hex4_54c5 : reassembles 21701 = true ∧ castsFifteens 21701 = true := by decide

/-- 54c6: nibbles fold back to 21702; digit sum 27 ≡ 21702 (mod 15). -/
theorem enumeration_hex4_54c6 : reassembles 21702 = true ∧ castsFifteens 21702 = true := by decide

/-- 54c7: nibbles fold back to 21703; digit sum 28 ≡ 21703 (mod 15). -/
theorem enumeration_hex4_54c7 : reassembles 21703 = true ∧ castsFifteens 21703 = true := by decide

/-- 54c8: nibbles fold back to 21704; digit sum 29 ≡ 21704 (mod 15). -/
theorem enumeration_hex4_54c8 : reassembles 21704 = true ∧ castsFifteens 21704 = true := by decide

/-- 54c9: nibbles fold back to 21705; digit sum 30 ≡ 21705 (mod 15). -/
theorem enumeration_hex4_54c9 : reassembles 21705 = true ∧ castsFifteens 21705 = true := by decide

/-- 54ca: nibbles fold back to 21706; digit sum 31 ≡ 21706 (mod 15). -/
theorem enumeration_hex4_54ca : reassembles 21706 = true ∧ castsFifteens 21706 = true := by decide

/-- 54cb: nibbles fold back to 21707; digit sum 32 ≡ 21707 (mod 15). -/
theorem enumeration_hex4_54cb : reassembles 21707 = true ∧ castsFifteens 21707 = true := by decide

/-- 54cc: nibbles fold back to 21708; digit sum 33 ≡ 21708 (mod 15). -/
theorem enumeration_hex4_54cc : reassembles 21708 = true ∧ castsFifteens 21708 = true := by decide

/-- 54cd: nibbles fold back to 21709; digit sum 34 ≡ 21709 (mod 15). -/
theorem enumeration_hex4_54cd : reassembles 21709 = true ∧ castsFifteens 21709 = true := by decide

/-- 54ce: nibbles fold back to 21710; digit sum 35 ≡ 21710 (mod 15). -/
theorem enumeration_hex4_54ce : reassembles 21710 = true ∧ castsFifteens 21710 = true := by decide

/-- 54cf: nibbles fold back to 21711; digit sum 36 ≡ 21711 (mod 15). -/
theorem enumeration_hex4_54cf : reassembles 21711 = true ∧ castsFifteens 21711 = true := by decide

/-- 54d0: nibbles fold back to 21712; digit sum 22 ≡ 21712 (mod 15). -/
theorem enumeration_hex4_54d0 : reassembles 21712 = true ∧ castsFifteens 21712 = true := by decide

/-- 54d1: nibbles fold back to 21713; digit sum 23 ≡ 21713 (mod 15). -/
theorem enumeration_hex4_54d1 : reassembles 21713 = true ∧ castsFifteens 21713 = true := by decide

/-- 54d2: nibbles fold back to 21714; digit sum 24 ≡ 21714 (mod 15). -/
theorem enumeration_hex4_54d2 : reassembles 21714 = true ∧ castsFifteens 21714 = true := by decide

/-- 54d3: nibbles fold back to 21715; digit sum 25 ≡ 21715 (mod 15). -/
theorem enumeration_hex4_54d3 : reassembles 21715 = true ∧ castsFifteens 21715 = true := by decide

/-- 54d4: nibbles fold back to 21716; digit sum 26 ≡ 21716 (mod 15). -/
theorem enumeration_hex4_54d4 : reassembles 21716 = true ∧ castsFifteens 21716 = true := by decide

/-- 54d5: nibbles fold back to 21717; digit sum 27 ≡ 21717 (mod 15). -/
theorem enumeration_hex4_54d5 : reassembles 21717 = true ∧ castsFifteens 21717 = true := by decide

/-- 54d6: nibbles fold back to 21718; digit sum 28 ≡ 21718 (mod 15). -/
theorem enumeration_hex4_54d6 : reassembles 21718 = true ∧ castsFifteens 21718 = true := by decide

/-- 54d7: nibbles fold back to 21719; digit sum 29 ≡ 21719 (mod 15). -/
theorem enumeration_hex4_54d7 : reassembles 21719 = true ∧ castsFifteens 21719 = true := by decide

/-- 54d8: nibbles fold back to 21720; digit sum 30 ≡ 21720 (mod 15). -/
theorem enumeration_hex4_54d8 : reassembles 21720 = true ∧ castsFifteens 21720 = true := by decide

/-- 54d9: nibbles fold back to 21721; digit sum 31 ≡ 21721 (mod 15). -/
theorem enumeration_hex4_54d9 : reassembles 21721 = true ∧ castsFifteens 21721 = true := by decide

/-- 54da: nibbles fold back to 21722; digit sum 32 ≡ 21722 (mod 15). -/
theorem enumeration_hex4_54da : reassembles 21722 = true ∧ castsFifteens 21722 = true := by decide

/-- 54db: nibbles fold back to 21723; digit sum 33 ≡ 21723 (mod 15). -/
theorem enumeration_hex4_54db : reassembles 21723 = true ∧ castsFifteens 21723 = true := by decide

/-- 54dc: nibbles fold back to 21724; digit sum 34 ≡ 21724 (mod 15). -/
theorem enumeration_hex4_54dc : reassembles 21724 = true ∧ castsFifteens 21724 = true := by decide

/-- 54dd: nibbles fold back to 21725; digit sum 35 ≡ 21725 (mod 15). -/
theorem enumeration_hex4_54dd : reassembles 21725 = true ∧ castsFifteens 21725 = true := by decide

/-- 54de: nibbles fold back to 21726; digit sum 36 ≡ 21726 (mod 15). -/
theorem enumeration_hex4_54de : reassembles 21726 = true ∧ castsFifteens 21726 = true := by decide

/-- 54df: nibbles fold back to 21727; digit sum 37 ≡ 21727 (mod 15). -/
theorem enumeration_hex4_54df : reassembles 21727 = true ∧ castsFifteens 21727 = true := by decide

/-- 54e0: nibbles fold back to 21728; digit sum 23 ≡ 21728 (mod 15). -/
theorem enumeration_hex4_54e0 : reassembles 21728 = true ∧ castsFifteens 21728 = true := by decide

/-- 54e1: nibbles fold back to 21729; digit sum 24 ≡ 21729 (mod 15). -/
theorem enumeration_hex4_54e1 : reassembles 21729 = true ∧ castsFifteens 21729 = true := by decide

/-- 54e2: nibbles fold back to 21730; digit sum 25 ≡ 21730 (mod 15). -/
theorem enumeration_hex4_54e2 : reassembles 21730 = true ∧ castsFifteens 21730 = true := by decide

/-- 54e3: nibbles fold back to 21731; digit sum 26 ≡ 21731 (mod 15). -/
theorem enumeration_hex4_54e3 : reassembles 21731 = true ∧ castsFifteens 21731 = true := by decide

/-- 54e4: nibbles fold back to 21732; digit sum 27 ≡ 21732 (mod 15). -/
theorem enumeration_hex4_54e4 : reassembles 21732 = true ∧ castsFifteens 21732 = true := by decide

/-- 54e5: nibbles fold back to 21733; digit sum 28 ≡ 21733 (mod 15). -/
theorem enumeration_hex4_54e5 : reassembles 21733 = true ∧ castsFifteens 21733 = true := by decide

/-- 54e6: nibbles fold back to 21734; digit sum 29 ≡ 21734 (mod 15). -/
theorem enumeration_hex4_54e6 : reassembles 21734 = true ∧ castsFifteens 21734 = true := by decide

/-- 54e7: nibbles fold back to 21735; digit sum 30 ≡ 21735 (mod 15). -/
theorem enumeration_hex4_54e7 : reassembles 21735 = true ∧ castsFifteens 21735 = true := by decide

/-- 54e8: nibbles fold back to 21736; digit sum 31 ≡ 21736 (mod 15). -/
theorem enumeration_hex4_54e8 : reassembles 21736 = true ∧ castsFifteens 21736 = true := by decide

/-- 54e9: nibbles fold back to 21737; digit sum 32 ≡ 21737 (mod 15). -/
theorem enumeration_hex4_54e9 : reassembles 21737 = true ∧ castsFifteens 21737 = true := by decide

/-- 54ea: nibbles fold back to 21738; digit sum 33 ≡ 21738 (mod 15). -/
theorem enumeration_hex4_54ea : reassembles 21738 = true ∧ castsFifteens 21738 = true := by decide

/-- 54eb: nibbles fold back to 21739; digit sum 34 ≡ 21739 (mod 15). -/
theorem enumeration_hex4_54eb : reassembles 21739 = true ∧ castsFifteens 21739 = true := by decide

/-- 54ec: nibbles fold back to 21740; digit sum 35 ≡ 21740 (mod 15). -/
theorem enumeration_hex4_54ec : reassembles 21740 = true ∧ castsFifteens 21740 = true := by decide

/-- 54ed: nibbles fold back to 21741; digit sum 36 ≡ 21741 (mod 15). -/
theorem enumeration_hex4_54ed : reassembles 21741 = true ∧ castsFifteens 21741 = true := by decide

/-- 54ee: nibbles fold back to 21742; digit sum 37 ≡ 21742 (mod 15). -/
theorem enumeration_hex4_54ee : reassembles 21742 = true ∧ castsFifteens 21742 = true := by decide

/-- 54ef: nibbles fold back to 21743; digit sum 38 ≡ 21743 (mod 15). -/
theorem enumeration_hex4_54ef : reassembles 21743 = true ∧ castsFifteens 21743 = true := by decide

/-- 54f0: nibbles fold back to 21744; digit sum 24 ≡ 21744 (mod 15). -/
theorem enumeration_hex4_54f0 : reassembles 21744 = true ∧ castsFifteens 21744 = true := by decide

/-- 54f1: nibbles fold back to 21745; digit sum 25 ≡ 21745 (mod 15). -/
theorem enumeration_hex4_54f1 : reassembles 21745 = true ∧ castsFifteens 21745 = true := by decide

/-- 54f2: nibbles fold back to 21746; digit sum 26 ≡ 21746 (mod 15). -/
theorem enumeration_hex4_54f2 : reassembles 21746 = true ∧ castsFifteens 21746 = true := by decide

/-- 54f3: nibbles fold back to 21747; digit sum 27 ≡ 21747 (mod 15). -/
theorem enumeration_hex4_54f3 : reassembles 21747 = true ∧ castsFifteens 21747 = true := by decide

/-- 54f4: nibbles fold back to 21748; digit sum 28 ≡ 21748 (mod 15). -/
theorem enumeration_hex4_54f4 : reassembles 21748 = true ∧ castsFifteens 21748 = true := by decide

/-- 54f5: nibbles fold back to 21749; digit sum 29 ≡ 21749 (mod 15). -/
theorem enumeration_hex4_54f5 : reassembles 21749 = true ∧ castsFifteens 21749 = true := by decide

/-- 54f6: nibbles fold back to 21750; digit sum 30 ≡ 21750 (mod 15). -/
theorem enumeration_hex4_54f6 : reassembles 21750 = true ∧ castsFifteens 21750 = true := by decide

/-- 54f7: nibbles fold back to 21751; digit sum 31 ≡ 21751 (mod 15). -/
theorem enumeration_hex4_54f7 : reassembles 21751 = true ∧ castsFifteens 21751 = true := by decide

/-- 54f8: nibbles fold back to 21752; digit sum 32 ≡ 21752 (mod 15). -/
theorem enumeration_hex4_54f8 : reassembles 21752 = true ∧ castsFifteens 21752 = true := by decide

/-- 54f9: nibbles fold back to 21753; digit sum 33 ≡ 21753 (mod 15). -/
theorem enumeration_hex4_54f9 : reassembles 21753 = true ∧ castsFifteens 21753 = true := by decide

/-- 54fa: nibbles fold back to 21754; digit sum 34 ≡ 21754 (mod 15). -/
theorem enumeration_hex4_54fa : reassembles 21754 = true ∧ castsFifteens 21754 = true := by decide

/-- 54fb: nibbles fold back to 21755; digit sum 35 ≡ 21755 (mod 15). -/
theorem enumeration_hex4_54fb : reassembles 21755 = true ∧ castsFifteens 21755 = true := by decide

/-- 54fc: nibbles fold back to 21756; digit sum 36 ≡ 21756 (mod 15). -/
theorem enumeration_hex4_54fc : reassembles 21756 = true ∧ castsFifteens 21756 = true := by decide

/-- 54fd: nibbles fold back to 21757; digit sum 37 ≡ 21757 (mod 15). -/
theorem enumeration_hex4_54fd : reassembles 21757 = true ∧ castsFifteens 21757 = true := by decide

/-- 54fe: nibbles fold back to 21758; digit sum 38 ≡ 21758 (mod 15). -/
theorem enumeration_hex4_54fe : reassembles 21758 = true ∧ castsFifteens 21758 = true := by decide

/-- 54ff: nibbles fold back to 21759; digit sum 39 ≡ 21759 (mod 15). -/
theorem enumeration_hex4_54ff : reassembles 21759 = true ∧ castsFifteens 21759 = true := by decide

/-- 5500: nibbles fold back to 21760; digit sum 10 ≡ 21760 (mod 15). -/
theorem enumeration_hex4_5500 : reassembles 21760 = true ∧ castsFifteens 21760 = true := by decide

/-- 5501: nibbles fold back to 21761; digit sum 11 ≡ 21761 (mod 15). -/
theorem enumeration_hex4_5501 : reassembles 21761 = true ∧ castsFifteens 21761 = true := by decide

/-- 5502: nibbles fold back to 21762; digit sum 12 ≡ 21762 (mod 15). -/
theorem enumeration_hex4_5502 : reassembles 21762 = true ∧ castsFifteens 21762 = true := by decide

/-- 5503: nibbles fold back to 21763; digit sum 13 ≡ 21763 (mod 15). -/
theorem enumeration_hex4_5503 : reassembles 21763 = true ∧ castsFifteens 21763 = true := by decide

/-- 5504: nibbles fold back to 21764; digit sum 14 ≡ 21764 (mod 15). -/
theorem enumeration_hex4_5504 : reassembles 21764 = true ∧ castsFifteens 21764 = true := by decide

/-- 5505: nibbles fold back to 21765; digit sum 15 ≡ 21765 (mod 15). -/
theorem enumeration_hex4_5505 : reassembles 21765 = true ∧ castsFifteens 21765 = true := by decide

/-- 5506: nibbles fold back to 21766; digit sum 16 ≡ 21766 (mod 15). -/
theorem enumeration_hex4_5506 : reassembles 21766 = true ∧ castsFifteens 21766 = true := by decide

/-- 5507: nibbles fold back to 21767; digit sum 17 ≡ 21767 (mod 15). -/
theorem enumeration_hex4_5507 : reassembles 21767 = true ∧ castsFifteens 21767 = true := by decide

/-- 5508: nibbles fold back to 21768; digit sum 18 ≡ 21768 (mod 15). -/
theorem enumeration_hex4_5508 : reassembles 21768 = true ∧ castsFifteens 21768 = true := by decide

/-- 5509: nibbles fold back to 21769; digit sum 19 ≡ 21769 (mod 15). -/
theorem enumeration_hex4_5509 : reassembles 21769 = true ∧ castsFifteens 21769 = true := by decide

/-- 550a: nibbles fold back to 21770; digit sum 20 ≡ 21770 (mod 15). -/
theorem enumeration_hex4_550a : reassembles 21770 = true ∧ castsFifteens 21770 = true := by decide

/-- 550b: nibbles fold back to 21771; digit sum 21 ≡ 21771 (mod 15). -/
theorem enumeration_hex4_550b : reassembles 21771 = true ∧ castsFifteens 21771 = true := by decide

/-- 550c: nibbles fold back to 21772; digit sum 22 ≡ 21772 (mod 15). -/
theorem enumeration_hex4_550c : reassembles 21772 = true ∧ castsFifteens 21772 = true := by decide

/-- 550d: nibbles fold back to 21773; digit sum 23 ≡ 21773 (mod 15). -/
theorem enumeration_hex4_550d : reassembles 21773 = true ∧ castsFifteens 21773 = true := by decide

/-- 550e: nibbles fold back to 21774; digit sum 24 ≡ 21774 (mod 15). -/
theorem enumeration_hex4_550e : reassembles 21774 = true ∧ castsFifteens 21774 = true := by decide

/-- 550f: nibbles fold back to 21775; digit sum 25 ≡ 21775 (mod 15). -/
theorem enumeration_hex4_550f : reassembles 21775 = true ∧ castsFifteens 21775 = true := by decide

/-- 5510: nibbles fold back to 21776; digit sum 11 ≡ 21776 (mod 15). -/
theorem enumeration_hex4_5510 : reassembles 21776 = true ∧ castsFifteens 21776 = true := by decide

/-- 5511: nibbles fold back to 21777; digit sum 12 ≡ 21777 (mod 15). -/
theorem enumeration_hex4_5511 : reassembles 21777 = true ∧ castsFifteens 21777 = true := by decide

/-- 5512: nibbles fold back to 21778; digit sum 13 ≡ 21778 (mod 15). -/
theorem enumeration_hex4_5512 : reassembles 21778 = true ∧ castsFifteens 21778 = true := by decide

/-- 5513: nibbles fold back to 21779; digit sum 14 ≡ 21779 (mod 15). -/
theorem enumeration_hex4_5513 : reassembles 21779 = true ∧ castsFifteens 21779 = true := by decide

/-- 5514: nibbles fold back to 21780; digit sum 15 ≡ 21780 (mod 15). -/
theorem enumeration_hex4_5514 : reassembles 21780 = true ∧ castsFifteens 21780 = true := by decide

/-- 5515: nibbles fold back to 21781; digit sum 16 ≡ 21781 (mod 15). -/
theorem enumeration_hex4_5515 : reassembles 21781 = true ∧ castsFifteens 21781 = true := by decide

/-- 5516: nibbles fold back to 21782; digit sum 17 ≡ 21782 (mod 15). -/
theorem enumeration_hex4_5516 : reassembles 21782 = true ∧ castsFifteens 21782 = true := by decide

/-- 5517: nibbles fold back to 21783; digit sum 18 ≡ 21783 (mod 15). -/
theorem enumeration_hex4_5517 : reassembles 21783 = true ∧ castsFifteens 21783 = true := by decide

/-- 5518: nibbles fold back to 21784; digit sum 19 ≡ 21784 (mod 15). -/
theorem enumeration_hex4_5518 : reassembles 21784 = true ∧ castsFifteens 21784 = true := by decide

/-- 5519: nibbles fold back to 21785; digit sum 20 ≡ 21785 (mod 15). -/
theorem enumeration_hex4_5519 : reassembles 21785 = true ∧ castsFifteens 21785 = true := by decide

/-- 551a: nibbles fold back to 21786; digit sum 21 ≡ 21786 (mod 15). -/
theorem enumeration_hex4_551a : reassembles 21786 = true ∧ castsFifteens 21786 = true := by decide

/-- 551b: nibbles fold back to 21787; digit sum 22 ≡ 21787 (mod 15). -/
theorem enumeration_hex4_551b : reassembles 21787 = true ∧ castsFifteens 21787 = true := by decide

/-- 551c: nibbles fold back to 21788; digit sum 23 ≡ 21788 (mod 15). -/
theorem enumeration_hex4_551c : reassembles 21788 = true ∧ castsFifteens 21788 = true := by decide

/-- 551d: nibbles fold back to 21789; digit sum 24 ≡ 21789 (mod 15). -/
theorem enumeration_hex4_551d : reassembles 21789 = true ∧ castsFifteens 21789 = true := by decide

/-- 551e: nibbles fold back to 21790; digit sum 25 ≡ 21790 (mod 15). -/
theorem enumeration_hex4_551e : reassembles 21790 = true ∧ castsFifteens 21790 = true := by decide

/-- 551f: nibbles fold back to 21791; digit sum 26 ≡ 21791 (mod 15). -/
theorem enumeration_hex4_551f : reassembles 21791 = true ∧ castsFifteens 21791 = true := by decide

/-- 5520: nibbles fold back to 21792; digit sum 12 ≡ 21792 (mod 15). -/
theorem enumeration_hex4_5520 : reassembles 21792 = true ∧ castsFifteens 21792 = true := by decide

/-- 5521: nibbles fold back to 21793; digit sum 13 ≡ 21793 (mod 15). -/
theorem enumeration_hex4_5521 : reassembles 21793 = true ∧ castsFifteens 21793 = true := by decide

/-- 5522: nibbles fold back to 21794; digit sum 14 ≡ 21794 (mod 15). -/
theorem enumeration_hex4_5522 : reassembles 21794 = true ∧ castsFifteens 21794 = true := by decide

/-- 5523: nibbles fold back to 21795; digit sum 15 ≡ 21795 (mod 15). -/
theorem enumeration_hex4_5523 : reassembles 21795 = true ∧ castsFifteens 21795 = true := by decide

/-- 5524: nibbles fold back to 21796; digit sum 16 ≡ 21796 (mod 15). -/
theorem enumeration_hex4_5524 : reassembles 21796 = true ∧ castsFifteens 21796 = true := by decide

/-- 5525: nibbles fold back to 21797; digit sum 17 ≡ 21797 (mod 15). -/
theorem enumeration_hex4_5525 : reassembles 21797 = true ∧ castsFifteens 21797 = true := by decide

/-- 5526: nibbles fold back to 21798; digit sum 18 ≡ 21798 (mod 15). -/
theorem enumeration_hex4_5526 : reassembles 21798 = true ∧ castsFifteens 21798 = true := by decide

/-- 5527: nibbles fold back to 21799; digit sum 19 ≡ 21799 (mod 15). -/
theorem enumeration_hex4_5527 : reassembles 21799 = true ∧ castsFifteens 21799 = true := by decide

/-- 5528: nibbles fold back to 21800; digit sum 20 ≡ 21800 (mod 15). -/
theorem enumeration_hex4_5528 : reassembles 21800 = true ∧ castsFifteens 21800 = true := by decide

/-- 5529: nibbles fold back to 21801; digit sum 21 ≡ 21801 (mod 15). -/
theorem enumeration_hex4_5529 : reassembles 21801 = true ∧ castsFifteens 21801 = true := by decide

/-- 552a: nibbles fold back to 21802; digit sum 22 ≡ 21802 (mod 15). -/
theorem enumeration_hex4_552a : reassembles 21802 = true ∧ castsFifteens 21802 = true := by decide

/-- 552b: nibbles fold back to 21803; digit sum 23 ≡ 21803 (mod 15). -/
theorem enumeration_hex4_552b : reassembles 21803 = true ∧ castsFifteens 21803 = true := by decide

/-- 552c: nibbles fold back to 21804; digit sum 24 ≡ 21804 (mod 15). -/
theorem enumeration_hex4_552c : reassembles 21804 = true ∧ castsFifteens 21804 = true := by decide

/-- 552d: nibbles fold back to 21805; digit sum 25 ≡ 21805 (mod 15). -/
theorem enumeration_hex4_552d : reassembles 21805 = true ∧ castsFifteens 21805 = true := by decide

/-- 552e: nibbles fold back to 21806; digit sum 26 ≡ 21806 (mod 15). -/
theorem enumeration_hex4_552e : reassembles 21806 = true ∧ castsFifteens 21806 = true := by decide

/-- 552f: nibbles fold back to 21807; digit sum 27 ≡ 21807 (mod 15). -/
theorem enumeration_hex4_552f : reassembles 21807 = true ∧ castsFifteens 21807 = true := by decide

/-- 5530: nibbles fold back to 21808; digit sum 13 ≡ 21808 (mod 15). -/
theorem enumeration_hex4_5530 : reassembles 21808 = true ∧ castsFifteens 21808 = true := by decide

/-- 5531: nibbles fold back to 21809; digit sum 14 ≡ 21809 (mod 15). -/
theorem enumeration_hex4_5531 : reassembles 21809 = true ∧ castsFifteens 21809 = true := by decide

/-- 5532: nibbles fold back to 21810; digit sum 15 ≡ 21810 (mod 15). -/
theorem enumeration_hex4_5532 : reassembles 21810 = true ∧ castsFifteens 21810 = true := by decide

/-- 5533: nibbles fold back to 21811; digit sum 16 ≡ 21811 (mod 15). -/
theorem enumeration_hex4_5533 : reassembles 21811 = true ∧ castsFifteens 21811 = true := by decide

/-- 5534: nibbles fold back to 21812; digit sum 17 ≡ 21812 (mod 15). -/
theorem enumeration_hex4_5534 : reassembles 21812 = true ∧ castsFifteens 21812 = true := by decide

/-- 5535: nibbles fold back to 21813; digit sum 18 ≡ 21813 (mod 15). -/
theorem enumeration_hex4_5535 : reassembles 21813 = true ∧ castsFifteens 21813 = true := by decide

/-- 5536: nibbles fold back to 21814; digit sum 19 ≡ 21814 (mod 15). -/
theorem enumeration_hex4_5536 : reassembles 21814 = true ∧ castsFifteens 21814 = true := by decide

/-- 5537: nibbles fold back to 21815; digit sum 20 ≡ 21815 (mod 15). -/
theorem enumeration_hex4_5537 : reassembles 21815 = true ∧ castsFifteens 21815 = true := by decide

/-- 5538: nibbles fold back to 21816; digit sum 21 ≡ 21816 (mod 15). -/
theorem enumeration_hex4_5538 : reassembles 21816 = true ∧ castsFifteens 21816 = true := by decide

/-- 5539: nibbles fold back to 21817; digit sum 22 ≡ 21817 (mod 15). -/
theorem enumeration_hex4_5539 : reassembles 21817 = true ∧ castsFifteens 21817 = true := by decide

/-- 553a: nibbles fold back to 21818; digit sum 23 ≡ 21818 (mod 15). -/
theorem enumeration_hex4_553a : reassembles 21818 = true ∧ castsFifteens 21818 = true := by decide

/-- 553b: nibbles fold back to 21819; digit sum 24 ≡ 21819 (mod 15). -/
theorem enumeration_hex4_553b : reassembles 21819 = true ∧ castsFifteens 21819 = true := by decide

/-- 553c: nibbles fold back to 21820; digit sum 25 ≡ 21820 (mod 15). -/
theorem enumeration_hex4_553c : reassembles 21820 = true ∧ castsFifteens 21820 = true := by decide

/-- 553d: nibbles fold back to 21821; digit sum 26 ≡ 21821 (mod 15). -/
theorem enumeration_hex4_553d : reassembles 21821 = true ∧ castsFifteens 21821 = true := by decide

/-- 553e: nibbles fold back to 21822; digit sum 27 ≡ 21822 (mod 15). -/
theorem enumeration_hex4_553e : reassembles 21822 = true ∧ castsFifteens 21822 = true := by decide

/-- 553f: nibbles fold back to 21823; digit sum 28 ≡ 21823 (mod 15). -/
theorem enumeration_hex4_553f : reassembles 21823 = true ∧ castsFifteens 21823 = true := by decide

/-- 5540: nibbles fold back to 21824; digit sum 14 ≡ 21824 (mod 15). -/
theorem enumeration_hex4_5540 : reassembles 21824 = true ∧ castsFifteens 21824 = true := by decide

/-- 5541: nibbles fold back to 21825; digit sum 15 ≡ 21825 (mod 15). -/
theorem enumeration_hex4_5541 : reassembles 21825 = true ∧ castsFifteens 21825 = true := by decide

/-- 5542: nibbles fold back to 21826; digit sum 16 ≡ 21826 (mod 15). -/
theorem enumeration_hex4_5542 : reassembles 21826 = true ∧ castsFifteens 21826 = true := by decide

/-- 5543: nibbles fold back to 21827; digit sum 17 ≡ 21827 (mod 15). -/
theorem enumeration_hex4_5543 : reassembles 21827 = true ∧ castsFifteens 21827 = true := by decide

/-- 5544: nibbles fold back to 21828; digit sum 18 ≡ 21828 (mod 15). -/
theorem enumeration_hex4_5544 : reassembles 21828 = true ∧ castsFifteens 21828 = true := by decide

/-- 5545: nibbles fold back to 21829; digit sum 19 ≡ 21829 (mod 15). -/
theorem enumeration_hex4_5545 : reassembles 21829 = true ∧ castsFifteens 21829 = true := by decide

/-- 5546: nibbles fold back to 21830; digit sum 20 ≡ 21830 (mod 15). -/
theorem enumeration_hex4_5546 : reassembles 21830 = true ∧ castsFifteens 21830 = true := by decide

/-- 5547: nibbles fold back to 21831; digit sum 21 ≡ 21831 (mod 15). -/
theorem enumeration_hex4_5547 : reassembles 21831 = true ∧ castsFifteens 21831 = true := by decide

/-- 5548: nibbles fold back to 21832; digit sum 22 ≡ 21832 (mod 15). -/
theorem enumeration_hex4_5548 : reassembles 21832 = true ∧ castsFifteens 21832 = true := by decide

/-- 5549: nibbles fold back to 21833; digit sum 23 ≡ 21833 (mod 15). -/
theorem enumeration_hex4_5549 : reassembles 21833 = true ∧ castsFifteens 21833 = true := by decide

/-- 554a: nibbles fold back to 21834; digit sum 24 ≡ 21834 (mod 15). -/
theorem enumeration_hex4_554a : reassembles 21834 = true ∧ castsFifteens 21834 = true := by decide

/-- 554b: nibbles fold back to 21835; digit sum 25 ≡ 21835 (mod 15). -/
theorem enumeration_hex4_554b : reassembles 21835 = true ∧ castsFifteens 21835 = true := by decide

/-- 554c: nibbles fold back to 21836; digit sum 26 ≡ 21836 (mod 15). -/
theorem enumeration_hex4_554c : reassembles 21836 = true ∧ castsFifteens 21836 = true := by decide

/-- 554d: nibbles fold back to 21837; digit sum 27 ≡ 21837 (mod 15). -/
theorem enumeration_hex4_554d : reassembles 21837 = true ∧ castsFifteens 21837 = true := by decide

/-- 554e: nibbles fold back to 21838; digit sum 28 ≡ 21838 (mod 15). -/
theorem enumeration_hex4_554e : reassembles 21838 = true ∧ castsFifteens 21838 = true := by decide

/-- 554f: nibbles fold back to 21839; digit sum 29 ≡ 21839 (mod 15). -/
theorem enumeration_hex4_554f : reassembles 21839 = true ∧ castsFifteens 21839 = true := by decide

/-- 5550: nibbles fold back to 21840; digit sum 15 ≡ 21840 (mod 15). -/
theorem enumeration_hex4_5550 : reassembles 21840 = true ∧ castsFifteens 21840 = true := by decide

/-- 5551: nibbles fold back to 21841; digit sum 16 ≡ 21841 (mod 15). -/
theorem enumeration_hex4_5551 : reassembles 21841 = true ∧ castsFifteens 21841 = true := by decide

/-- 5552: nibbles fold back to 21842; digit sum 17 ≡ 21842 (mod 15). -/
theorem enumeration_hex4_5552 : reassembles 21842 = true ∧ castsFifteens 21842 = true := by decide

/-- 5553: nibbles fold back to 21843; digit sum 18 ≡ 21843 (mod 15). -/
theorem enumeration_hex4_5553 : reassembles 21843 = true ∧ castsFifteens 21843 = true := by decide

/-- 5554: nibbles fold back to 21844; digit sum 19 ≡ 21844 (mod 15). -/
theorem enumeration_hex4_5554 : reassembles 21844 = true ∧ castsFifteens 21844 = true := by decide

/-- 5555: nibbles fold back to 21845; digit sum 20 ≡ 21845 (mod 15). -/
theorem enumeration_hex4_5555 : reassembles 21845 = true ∧ castsFifteens 21845 = true := by decide

/-- 5556: nibbles fold back to 21846; digit sum 21 ≡ 21846 (mod 15). -/
theorem enumeration_hex4_5556 : reassembles 21846 = true ∧ castsFifteens 21846 = true := by decide

/-- 5557: nibbles fold back to 21847; digit sum 22 ≡ 21847 (mod 15). -/
theorem enumeration_hex4_5557 : reassembles 21847 = true ∧ castsFifteens 21847 = true := by decide

/-- 5558: nibbles fold back to 21848; digit sum 23 ≡ 21848 (mod 15). -/
theorem enumeration_hex4_5558 : reassembles 21848 = true ∧ castsFifteens 21848 = true := by decide

/-- 5559: nibbles fold back to 21849; digit sum 24 ≡ 21849 (mod 15). -/
theorem enumeration_hex4_5559 : reassembles 21849 = true ∧ castsFifteens 21849 = true := by decide

/-- 555a: nibbles fold back to 21850; digit sum 25 ≡ 21850 (mod 15). -/
theorem enumeration_hex4_555a : reassembles 21850 = true ∧ castsFifteens 21850 = true := by decide

/-- 555b: nibbles fold back to 21851; digit sum 26 ≡ 21851 (mod 15). -/
theorem enumeration_hex4_555b : reassembles 21851 = true ∧ castsFifteens 21851 = true := by decide

/-- 555c: nibbles fold back to 21852; digit sum 27 ≡ 21852 (mod 15). -/
theorem enumeration_hex4_555c : reassembles 21852 = true ∧ castsFifteens 21852 = true := by decide

/-- 555d: nibbles fold back to 21853; digit sum 28 ≡ 21853 (mod 15). -/
theorem enumeration_hex4_555d : reassembles 21853 = true ∧ castsFifteens 21853 = true := by decide

/-- 555e: nibbles fold back to 21854; digit sum 29 ≡ 21854 (mod 15). -/
theorem enumeration_hex4_555e : reassembles 21854 = true ∧ castsFifteens 21854 = true := by decide

/-- 555f: nibbles fold back to 21855; digit sum 30 ≡ 21855 (mod 15). -/
theorem enumeration_hex4_555f : reassembles 21855 = true ∧ castsFifteens 21855 = true := by decide

/-- 5560: nibbles fold back to 21856; digit sum 16 ≡ 21856 (mod 15). -/
theorem enumeration_hex4_5560 : reassembles 21856 = true ∧ castsFifteens 21856 = true := by decide

/-- 5561: nibbles fold back to 21857; digit sum 17 ≡ 21857 (mod 15). -/
theorem enumeration_hex4_5561 : reassembles 21857 = true ∧ castsFifteens 21857 = true := by decide

/-- 5562: nibbles fold back to 21858; digit sum 18 ≡ 21858 (mod 15). -/
theorem enumeration_hex4_5562 : reassembles 21858 = true ∧ castsFifteens 21858 = true := by decide

/-- 5563: nibbles fold back to 21859; digit sum 19 ≡ 21859 (mod 15). -/
theorem enumeration_hex4_5563 : reassembles 21859 = true ∧ castsFifteens 21859 = true := by decide

/-- 5564: nibbles fold back to 21860; digit sum 20 ≡ 21860 (mod 15). -/
theorem enumeration_hex4_5564 : reassembles 21860 = true ∧ castsFifteens 21860 = true := by decide

/-- 5565: nibbles fold back to 21861; digit sum 21 ≡ 21861 (mod 15). -/
theorem enumeration_hex4_5565 : reassembles 21861 = true ∧ castsFifteens 21861 = true := by decide

/-- 5566: nibbles fold back to 21862; digit sum 22 ≡ 21862 (mod 15). -/
theorem enumeration_hex4_5566 : reassembles 21862 = true ∧ castsFifteens 21862 = true := by decide

/-- 5567: nibbles fold back to 21863; digit sum 23 ≡ 21863 (mod 15). -/
theorem enumeration_hex4_5567 : reassembles 21863 = true ∧ castsFifteens 21863 = true := by decide

/-- 5568: nibbles fold back to 21864; digit sum 24 ≡ 21864 (mod 15). -/
theorem enumeration_hex4_5568 : reassembles 21864 = true ∧ castsFifteens 21864 = true := by decide

/-- 5569: nibbles fold back to 21865; digit sum 25 ≡ 21865 (mod 15). -/
theorem enumeration_hex4_5569 : reassembles 21865 = true ∧ castsFifteens 21865 = true := by decide

/-- 556a: nibbles fold back to 21866; digit sum 26 ≡ 21866 (mod 15). -/
theorem enumeration_hex4_556a : reassembles 21866 = true ∧ castsFifteens 21866 = true := by decide

/-- 556b: nibbles fold back to 21867; digit sum 27 ≡ 21867 (mod 15). -/
theorem enumeration_hex4_556b : reassembles 21867 = true ∧ castsFifteens 21867 = true := by decide

/-- 556c: nibbles fold back to 21868; digit sum 28 ≡ 21868 (mod 15). -/
theorem enumeration_hex4_556c : reassembles 21868 = true ∧ castsFifteens 21868 = true := by decide

/-- 556d: nibbles fold back to 21869; digit sum 29 ≡ 21869 (mod 15). -/
theorem enumeration_hex4_556d : reassembles 21869 = true ∧ castsFifteens 21869 = true := by decide

/-- 556e: nibbles fold back to 21870; digit sum 30 ≡ 21870 (mod 15). -/
theorem enumeration_hex4_556e : reassembles 21870 = true ∧ castsFifteens 21870 = true := by decide

/-- 556f: nibbles fold back to 21871; digit sum 31 ≡ 21871 (mod 15). -/
theorem enumeration_hex4_556f : reassembles 21871 = true ∧ castsFifteens 21871 = true := by decide

/-- 5570: nibbles fold back to 21872; digit sum 17 ≡ 21872 (mod 15). -/
theorem enumeration_hex4_5570 : reassembles 21872 = true ∧ castsFifteens 21872 = true := by decide

/-- 5571: nibbles fold back to 21873; digit sum 18 ≡ 21873 (mod 15). -/
theorem enumeration_hex4_5571 : reassembles 21873 = true ∧ castsFifteens 21873 = true := by decide

/-- 5572: nibbles fold back to 21874; digit sum 19 ≡ 21874 (mod 15). -/
theorem enumeration_hex4_5572 : reassembles 21874 = true ∧ castsFifteens 21874 = true := by decide

/-- 5573: nibbles fold back to 21875; digit sum 20 ≡ 21875 (mod 15). -/
theorem enumeration_hex4_5573 : reassembles 21875 = true ∧ castsFifteens 21875 = true := by decide

/-- 5574: nibbles fold back to 21876; digit sum 21 ≡ 21876 (mod 15). -/
theorem enumeration_hex4_5574 : reassembles 21876 = true ∧ castsFifteens 21876 = true := by decide

/-- 5575: nibbles fold back to 21877; digit sum 22 ≡ 21877 (mod 15). -/
theorem enumeration_hex4_5575 : reassembles 21877 = true ∧ castsFifteens 21877 = true := by decide

/-- 5576: nibbles fold back to 21878; digit sum 23 ≡ 21878 (mod 15). -/
theorem enumeration_hex4_5576 : reassembles 21878 = true ∧ castsFifteens 21878 = true := by decide

/-- 5577: nibbles fold back to 21879; digit sum 24 ≡ 21879 (mod 15). -/
theorem enumeration_hex4_5577 : reassembles 21879 = true ∧ castsFifteens 21879 = true := by decide

/-- 5578: nibbles fold back to 21880; digit sum 25 ≡ 21880 (mod 15). -/
theorem enumeration_hex4_5578 : reassembles 21880 = true ∧ castsFifteens 21880 = true := by decide

/-- 5579: nibbles fold back to 21881; digit sum 26 ≡ 21881 (mod 15). -/
theorem enumeration_hex4_5579 : reassembles 21881 = true ∧ castsFifteens 21881 = true := by decide

/-- 557a: nibbles fold back to 21882; digit sum 27 ≡ 21882 (mod 15). -/
theorem enumeration_hex4_557a : reassembles 21882 = true ∧ castsFifteens 21882 = true := by decide

/-- 557b: nibbles fold back to 21883; digit sum 28 ≡ 21883 (mod 15). -/
theorem enumeration_hex4_557b : reassembles 21883 = true ∧ castsFifteens 21883 = true := by decide

/-- 557c: nibbles fold back to 21884; digit sum 29 ≡ 21884 (mod 15). -/
theorem enumeration_hex4_557c : reassembles 21884 = true ∧ castsFifteens 21884 = true := by decide

/-- 557d: nibbles fold back to 21885; digit sum 30 ≡ 21885 (mod 15). -/
theorem enumeration_hex4_557d : reassembles 21885 = true ∧ castsFifteens 21885 = true := by decide

/-- 557e: nibbles fold back to 21886; digit sum 31 ≡ 21886 (mod 15). -/
theorem enumeration_hex4_557e : reassembles 21886 = true ∧ castsFifteens 21886 = true := by decide

/-- 557f: nibbles fold back to 21887; digit sum 32 ≡ 21887 (mod 15). -/
theorem enumeration_hex4_557f : reassembles 21887 = true ∧ castsFifteens 21887 = true := by decide

/-- 5580: nibbles fold back to 21888; digit sum 18 ≡ 21888 (mod 15). -/
theorem enumeration_hex4_5580 : reassembles 21888 = true ∧ castsFifteens 21888 = true := by decide

/-- 5581: nibbles fold back to 21889; digit sum 19 ≡ 21889 (mod 15). -/
theorem enumeration_hex4_5581 : reassembles 21889 = true ∧ castsFifteens 21889 = true := by decide

/-- 5582: nibbles fold back to 21890; digit sum 20 ≡ 21890 (mod 15). -/
theorem enumeration_hex4_5582 : reassembles 21890 = true ∧ castsFifteens 21890 = true := by decide

/-- 5583: nibbles fold back to 21891; digit sum 21 ≡ 21891 (mod 15). -/
theorem enumeration_hex4_5583 : reassembles 21891 = true ∧ castsFifteens 21891 = true := by decide

/-- 5584: nibbles fold back to 21892; digit sum 22 ≡ 21892 (mod 15). -/
theorem enumeration_hex4_5584 : reassembles 21892 = true ∧ castsFifteens 21892 = true := by decide

/-- 5585: nibbles fold back to 21893; digit sum 23 ≡ 21893 (mod 15). -/
theorem enumeration_hex4_5585 : reassembles 21893 = true ∧ castsFifteens 21893 = true := by decide

/-- 5586: nibbles fold back to 21894; digit sum 24 ≡ 21894 (mod 15). -/
theorem enumeration_hex4_5586 : reassembles 21894 = true ∧ castsFifteens 21894 = true := by decide

/-- 5587: nibbles fold back to 21895; digit sum 25 ≡ 21895 (mod 15). -/
theorem enumeration_hex4_5587 : reassembles 21895 = true ∧ castsFifteens 21895 = true := by decide

/-- 5588: nibbles fold back to 21896; digit sum 26 ≡ 21896 (mod 15). -/
theorem enumeration_hex4_5588 : reassembles 21896 = true ∧ castsFifteens 21896 = true := by decide

/-- 5589: nibbles fold back to 21897; digit sum 27 ≡ 21897 (mod 15). -/
theorem enumeration_hex4_5589 : reassembles 21897 = true ∧ castsFifteens 21897 = true := by decide

/-- 558a: nibbles fold back to 21898; digit sum 28 ≡ 21898 (mod 15). -/
theorem enumeration_hex4_558a : reassembles 21898 = true ∧ castsFifteens 21898 = true := by decide

/-- 558b: nibbles fold back to 21899; digit sum 29 ≡ 21899 (mod 15). -/
theorem enumeration_hex4_558b : reassembles 21899 = true ∧ castsFifteens 21899 = true := by decide

/-- 558c: nibbles fold back to 21900; digit sum 30 ≡ 21900 (mod 15). -/
theorem enumeration_hex4_558c : reassembles 21900 = true ∧ castsFifteens 21900 = true := by decide

/-- 558d: nibbles fold back to 21901; digit sum 31 ≡ 21901 (mod 15). -/
theorem enumeration_hex4_558d : reassembles 21901 = true ∧ castsFifteens 21901 = true := by decide

/-- 558e: nibbles fold back to 21902; digit sum 32 ≡ 21902 (mod 15). -/
theorem enumeration_hex4_558e : reassembles 21902 = true ∧ castsFifteens 21902 = true := by decide

/-- 558f: nibbles fold back to 21903; digit sum 33 ≡ 21903 (mod 15). -/
theorem enumeration_hex4_558f : reassembles 21903 = true ∧ castsFifteens 21903 = true := by decide

/-- 5590: nibbles fold back to 21904; digit sum 19 ≡ 21904 (mod 15). -/
theorem enumeration_hex4_5590 : reassembles 21904 = true ∧ castsFifteens 21904 = true := by decide

/-- 5591: nibbles fold back to 21905; digit sum 20 ≡ 21905 (mod 15). -/
theorem enumeration_hex4_5591 : reassembles 21905 = true ∧ castsFifteens 21905 = true := by decide

/-- 5592: nibbles fold back to 21906; digit sum 21 ≡ 21906 (mod 15). -/
theorem enumeration_hex4_5592 : reassembles 21906 = true ∧ castsFifteens 21906 = true := by decide

/-- 5593: nibbles fold back to 21907; digit sum 22 ≡ 21907 (mod 15). -/
theorem enumeration_hex4_5593 : reassembles 21907 = true ∧ castsFifteens 21907 = true := by decide

/-- 5594: nibbles fold back to 21908; digit sum 23 ≡ 21908 (mod 15). -/
theorem enumeration_hex4_5594 : reassembles 21908 = true ∧ castsFifteens 21908 = true := by decide

/-- 5595: nibbles fold back to 21909; digit sum 24 ≡ 21909 (mod 15). -/
theorem enumeration_hex4_5595 : reassembles 21909 = true ∧ castsFifteens 21909 = true := by decide

/-- 5596: nibbles fold back to 21910; digit sum 25 ≡ 21910 (mod 15). -/
theorem enumeration_hex4_5596 : reassembles 21910 = true ∧ castsFifteens 21910 = true := by decide

/-- 5597: nibbles fold back to 21911; digit sum 26 ≡ 21911 (mod 15). -/
theorem enumeration_hex4_5597 : reassembles 21911 = true ∧ castsFifteens 21911 = true := by decide

/-- 5598: nibbles fold back to 21912; digit sum 27 ≡ 21912 (mod 15). -/
theorem enumeration_hex4_5598 : reassembles 21912 = true ∧ castsFifteens 21912 = true := by decide

/-- 5599: nibbles fold back to 21913; digit sum 28 ≡ 21913 (mod 15). -/
theorem enumeration_hex4_5599 : reassembles 21913 = true ∧ castsFifteens 21913 = true := by decide

/-- 559a: nibbles fold back to 21914; digit sum 29 ≡ 21914 (mod 15). -/
theorem enumeration_hex4_559a : reassembles 21914 = true ∧ castsFifteens 21914 = true := by decide

/-- 559b: nibbles fold back to 21915; digit sum 30 ≡ 21915 (mod 15). -/
theorem enumeration_hex4_559b : reassembles 21915 = true ∧ castsFifteens 21915 = true := by decide

/-- 559c: nibbles fold back to 21916; digit sum 31 ≡ 21916 (mod 15). -/
theorem enumeration_hex4_559c : reassembles 21916 = true ∧ castsFifteens 21916 = true := by decide

/-- 559d: nibbles fold back to 21917; digit sum 32 ≡ 21917 (mod 15). -/
theorem enumeration_hex4_559d : reassembles 21917 = true ∧ castsFifteens 21917 = true := by decide

/-- 559e: nibbles fold back to 21918; digit sum 33 ≡ 21918 (mod 15). -/
theorem enumeration_hex4_559e : reassembles 21918 = true ∧ castsFifteens 21918 = true := by decide

/-- 559f: nibbles fold back to 21919; digit sum 34 ≡ 21919 (mod 15). -/
theorem enumeration_hex4_559f : reassembles 21919 = true ∧ castsFifteens 21919 = true := by decide

/-- 55a0: nibbles fold back to 21920; digit sum 20 ≡ 21920 (mod 15). -/
theorem enumeration_hex4_55a0 : reassembles 21920 = true ∧ castsFifteens 21920 = true := by decide

/-- 55a1: nibbles fold back to 21921; digit sum 21 ≡ 21921 (mod 15). -/
theorem enumeration_hex4_55a1 : reassembles 21921 = true ∧ castsFifteens 21921 = true := by decide

/-- 55a2: nibbles fold back to 21922; digit sum 22 ≡ 21922 (mod 15). -/
theorem enumeration_hex4_55a2 : reassembles 21922 = true ∧ castsFifteens 21922 = true := by decide

/-- 55a3: nibbles fold back to 21923; digit sum 23 ≡ 21923 (mod 15). -/
theorem enumeration_hex4_55a3 : reassembles 21923 = true ∧ castsFifteens 21923 = true := by decide

/-- 55a4: nibbles fold back to 21924; digit sum 24 ≡ 21924 (mod 15). -/
theorem enumeration_hex4_55a4 : reassembles 21924 = true ∧ castsFifteens 21924 = true := by decide

/-- 55a5: nibbles fold back to 21925; digit sum 25 ≡ 21925 (mod 15). -/
theorem enumeration_hex4_55a5 : reassembles 21925 = true ∧ castsFifteens 21925 = true := by decide

/-- 55a6: nibbles fold back to 21926; digit sum 26 ≡ 21926 (mod 15). -/
theorem enumeration_hex4_55a6 : reassembles 21926 = true ∧ castsFifteens 21926 = true := by decide

/-- 55a7: nibbles fold back to 21927; digit sum 27 ≡ 21927 (mod 15). -/
theorem enumeration_hex4_55a7 : reassembles 21927 = true ∧ castsFifteens 21927 = true := by decide

/-- 55a8: nibbles fold back to 21928; digit sum 28 ≡ 21928 (mod 15). -/
theorem enumeration_hex4_55a8 : reassembles 21928 = true ∧ castsFifteens 21928 = true := by decide

/-- 55a9: nibbles fold back to 21929; digit sum 29 ≡ 21929 (mod 15). -/
theorem enumeration_hex4_55a9 : reassembles 21929 = true ∧ castsFifteens 21929 = true := by decide

/-- 55aa: nibbles fold back to 21930; digit sum 30 ≡ 21930 (mod 15). -/
theorem enumeration_hex4_55aa : reassembles 21930 = true ∧ castsFifteens 21930 = true := by decide

/-- 55ab: nibbles fold back to 21931; digit sum 31 ≡ 21931 (mod 15). -/
theorem enumeration_hex4_55ab : reassembles 21931 = true ∧ castsFifteens 21931 = true := by decide

/-- 55ac: nibbles fold back to 21932; digit sum 32 ≡ 21932 (mod 15). -/
theorem enumeration_hex4_55ac : reassembles 21932 = true ∧ castsFifteens 21932 = true := by decide

/-- 55ad: nibbles fold back to 21933; digit sum 33 ≡ 21933 (mod 15). -/
theorem enumeration_hex4_55ad : reassembles 21933 = true ∧ castsFifteens 21933 = true := by decide

/-- 55ae: nibbles fold back to 21934; digit sum 34 ≡ 21934 (mod 15). -/
theorem enumeration_hex4_55ae : reassembles 21934 = true ∧ castsFifteens 21934 = true := by decide

/-- 55af: nibbles fold back to 21935; digit sum 35 ≡ 21935 (mod 15). -/
theorem enumeration_hex4_55af : reassembles 21935 = true ∧ castsFifteens 21935 = true := by decide

/-- 55b0: nibbles fold back to 21936; digit sum 21 ≡ 21936 (mod 15). -/
theorem enumeration_hex4_55b0 : reassembles 21936 = true ∧ castsFifteens 21936 = true := by decide

/-- 55b1: nibbles fold back to 21937; digit sum 22 ≡ 21937 (mod 15). -/
theorem enumeration_hex4_55b1 : reassembles 21937 = true ∧ castsFifteens 21937 = true := by decide

/-- 55b2: nibbles fold back to 21938; digit sum 23 ≡ 21938 (mod 15). -/
theorem enumeration_hex4_55b2 : reassembles 21938 = true ∧ castsFifteens 21938 = true := by decide

/-- 55b3: nibbles fold back to 21939; digit sum 24 ≡ 21939 (mod 15). -/
theorem enumeration_hex4_55b3 : reassembles 21939 = true ∧ castsFifteens 21939 = true := by decide

/-- 55b4: nibbles fold back to 21940; digit sum 25 ≡ 21940 (mod 15). -/
theorem enumeration_hex4_55b4 : reassembles 21940 = true ∧ castsFifteens 21940 = true := by decide

/-- 55b5: nibbles fold back to 21941; digit sum 26 ≡ 21941 (mod 15). -/
theorem enumeration_hex4_55b5 : reassembles 21941 = true ∧ castsFifteens 21941 = true := by decide

/-- 55b6: nibbles fold back to 21942; digit sum 27 ≡ 21942 (mod 15). -/
theorem enumeration_hex4_55b6 : reassembles 21942 = true ∧ castsFifteens 21942 = true := by decide

/-- 55b7: nibbles fold back to 21943; digit sum 28 ≡ 21943 (mod 15). -/
theorem enumeration_hex4_55b7 : reassembles 21943 = true ∧ castsFifteens 21943 = true := by decide

/-- 55b8: nibbles fold back to 21944; digit sum 29 ≡ 21944 (mod 15). -/
theorem enumeration_hex4_55b8 : reassembles 21944 = true ∧ castsFifteens 21944 = true := by decide

/-- 55b9: nibbles fold back to 21945; digit sum 30 ≡ 21945 (mod 15). -/
theorem enumeration_hex4_55b9 : reassembles 21945 = true ∧ castsFifteens 21945 = true := by decide

/-- 55ba: nibbles fold back to 21946; digit sum 31 ≡ 21946 (mod 15). -/
theorem enumeration_hex4_55ba : reassembles 21946 = true ∧ castsFifteens 21946 = true := by decide

/-- 55bb: nibbles fold back to 21947; digit sum 32 ≡ 21947 (mod 15). -/
theorem enumeration_hex4_55bb : reassembles 21947 = true ∧ castsFifteens 21947 = true := by decide

/-- 55bc: nibbles fold back to 21948; digit sum 33 ≡ 21948 (mod 15). -/
theorem enumeration_hex4_55bc : reassembles 21948 = true ∧ castsFifteens 21948 = true := by decide

/-- 55bd: nibbles fold back to 21949; digit sum 34 ≡ 21949 (mod 15). -/
theorem enumeration_hex4_55bd : reassembles 21949 = true ∧ castsFifteens 21949 = true := by decide

/-- 55be: nibbles fold back to 21950; digit sum 35 ≡ 21950 (mod 15). -/
theorem enumeration_hex4_55be : reassembles 21950 = true ∧ castsFifteens 21950 = true := by decide

/-- 55bf: nibbles fold back to 21951; digit sum 36 ≡ 21951 (mod 15). -/
theorem enumeration_hex4_55bf : reassembles 21951 = true ∧ castsFifteens 21951 = true := by decide

/-- 55c0: nibbles fold back to 21952; digit sum 22 ≡ 21952 (mod 15). -/
theorem enumeration_hex4_55c0 : reassembles 21952 = true ∧ castsFifteens 21952 = true := by decide

/-- 55c1: nibbles fold back to 21953; digit sum 23 ≡ 21953 (mod 15). -/
theorem enumeration_hex4_55c1 : reassembles 21953 = true ∧ castsFifteens 21953 = true := by decide

/-- 55c2: nibbles fold back to 21954; digit sum 24 ≡ 21954 (mod 15). -/
theorem enumeration_hex4_55c2 : reassembles 21954 = true ∧ castsFifteens 21954 = true := by decide

/-- 55c3: nibbles fold back to 21955; digit sum 25 ≡ 21955 (mod 15). -/
theorem enumeration_hex4_55c3 : reassembles 21955 = true ∧ castsFifteens 21955 = true := by decide

/-- 55c4: nibbles fold back to 21956; digit sum 26 ≡ 21956 (mod 15). -/
theorem enumeration_hex4_55c4 : reassembles 21956 = true ∧ castsFifteens 21956 = true := by decide

/-- 55c5: nibbles fold back to 21957; digit sum 27 ≡ 21957 (mod 15). -/
theorem enumeration_hex4_55c5 : reassembles 21957 = true ∧ castsFifteens 21957 = true := by decide

/-- 55c6: nibbles fold back to 21958; digit sum 28 ≡ 21958 (mod 15). -/
theorem enumeration_hex4_55c6 : reassembles 21958 = true ∧ castsFifteens 21958 = true := by decide

/-- 55c7: nibbles fold back to 21959; digit sum 29 ≡ 21959 (mod 15). -/
theorem enumeration_hex4_55c7 : reassembles 21959 = true ∧ castsFifteens 21959 = true := by decide

/-- 55c8: nibbles fold back to 21960; digit sum 30 ≡ 21960 (mod 15). -/
theorem enumeration_hex4_55c8 : reassembles 21960 = true ∧ castsFifteens 21960 = true := by decide

/-- 55c9: nibbles fold back to 21961; digit sum 31 ≡ 21961 (mod 15). -/
theorem enumeration_hex4_55c9 : reassembles 21961 = true ∧ castsFifteens 21961 = true := by decide

/-- 55ca: nibbles fold back to 21962; digit sum 32 ≡ 21962 (mod 15). -/
theorem enumeration_hex4_55ca : reassembles 21962 = true ∧ castsFifteens 21962 = true := by decide

/-- 55cb: nibbles fold back to 21963; digit sum 33 ≡ 21963 (mod 15). -/
theorem enumeration_hex4_55cb : reassembles 21963 = true ∧ castsFifteens 21963 = true := by decide

/-- 55cc: nibbles fold back to 21964; digit sum 34 ≡ 21964 (mod 15). -/
theorem enumeration_hex4_55cc : reassembles 21964 = true ∧ castsFifteens 21964 = true := by decide

/-- 55cd: nibbles fold back to 21965; digit sum 35 ≡ 21965 (mod 15). -/
theorem enumeration_hex4_55cd : reassembles 21965 = true ∧ castsFifteens 21965 = true := by decide

/-- 55ce: nibbles fold back to 21966; digit sum 36 ≡ 21966 (mod 15). -/
theorem enumeration_hex4_55ce : reassembles 21966 = true ∧ castsFifteens 21966 = true := by decide

/-- 55cf: nibbles fold back to 21967; digit sum 37 ≡ 21967 (mod 15). -/
theorem enumeration_hex4_55cf : reassembles 21967 = true ∧ castsFifteens 21967 = true := by decide

/-- 55d0: nibbles fold back to 21968; digit sum 23 ≡ 21968 (mod 15). -/
theorem enumeration_hex4_55d0 : reassembles 21968 = true ∧ castsFifteens 21968 = true := by decide

/-- 55d1: nibbles fold back to 21969; digit sum 24 ≡ 21969 (mod 15). -/
theorem enumeration_hex4_55d1 : reassembles 21969 = true ∧ castsFifteens 21969 = true := by decide

/-- 55d2: nibbles fold back to 21970; digit sum 25 ≡ 21970 (mod 15). -/
theorem enumeration_hex4_55d2 : reassembles 21970 = true ∧ castsFifteens 21970 = true := by decide

/-- 55d3: nibbles fold back to 21971; digit sum 26 ≡ 21971 (mod 15). -/
theorem enumeration_hex4_55d3 : reassembles 21971 = true ∧ castsFifteens 21971 = true := by decide

/-- 55d4: nibbles fold back to 21972; digit sum 27 ≡ 21972 (mod 15). -/
theorem enumeration_hex4_55d4 : reassembles 21972 = true ∧ castsFifteens 21972 = true := by decide

/-- 55d5: nibbles fold back to 21973; digit sum 28 ≡ 21973 (mod 15). -/
theorem enumeration_hex4_55d5 : reassembles 21973 = true ∧ castsFifteens 21973 = true := by decide

/-- 55d6: nibbles fold back to 21974; digit sum 29 ≡ 21974 (mod 15). -/
theorem enumeration_hex4_55d6 : reassembles 21974 = true ∧ castsFifteens 21974 = true := by decide

/-- 55d7: nibbles fold back to 21975; digit sum 30 ≡ 21975 (mod 15). -/
theorem enumeration_hex4_55d7 : reassembles 21975 = true ∧ castsFifteens 21975 = true := by decide

/-- 55d8: nibbles fold back to 21976; digit sum 31 ≡ 21976 (mod 15). -/
theorem enumeration_hex4_55d8 : reassembles 21976 = true ∧ castsFifteens 21976 = true := by decide

/-- 55d9: nibbles fold back to 21977; digit sum 32 ≡ 21977 (mod 15). -/
theorem enumeration_hex4_55d9 : reassembles 21977 = true ∧ castsFifteens 21977 = true := by decide

/-- 55da: nibbles fold back to 21978; digit sum 33 ≡ 21978 (mod 15). -/
theorem enumeration_hex4_55da : reassembles 21978 = true ∧ castsFifteens 21978 = true := by decide

/-- 55db: nibbles fold back to 21979; digit sum 34 ≡ 21979 (mod 15). -/
theorem enumeration_hex4_55db : reassembles 21979 = true ∧ castsFifteens 21979 = true := by decide

/-- 55dc: nibbles fold back to 21980; digit sum 35 ≡ 21980 (mod 15). -/
theorem enumeration_hex4_55dc : reassembles 21980 = true ∧ castsFifteens 21980 = true := by decide

/-- 55dd: nibbles fold back to 21981; digit sum 36 ≡ 21981 (mod 15). -/
theorem enumeration_hex4_55dd : reassembles 21981 = true ∧ castsFifteens 21981 = true := by decide

/-- 55de: nibbles fold back to 21982; digit sum 37 ≡ 21982 (mod 15). -/
theorem enumeration_hex4_55de : reassembles 21982 = true ∧ castsFifteens 21982 = true := by decide

/-- 55df: nibbles fold back to 21983; digit sum 38 ≡ 21983 (mod 15). -/
theorem enumeration_hex4_55df : reassembles 21983 = true ∧ castsFifteens 21983 = true := by decide

/-- 55e0: nibbles fold back to 21984; digit sum 24 ≡ 21984 (mod 15). -/
theorem enumeration_hex4_55e0 : reassembles 21984 = true ∧ castsFifteens 21984 = true := by decide

/-- 55e1: nibbles fold back to 21985; digit sum 25 ≡ 21985 (mod 15). -/
theorem enumeration_hex4_55e1 : reassembles 21985 = true ∧ castsFifteens 21985 = true := by decide

/-- 55e2: nibbles fold back to 21986; digit sum 26 ≡ 21986 (mod 15). -/
theorem enumeration_hex4_55e2 : reassembles 21986 = true ∧ castsFifteens 21986 = true := by decide

/-- 55e3: nibbles fold back to 21987; digit sum 27 ≡ 21987 (mod 15). -/
theorem enumeration_hex4_55e3 : reassembles 21987 = true ∧ castsFifteens 21987 = true := by decide

/-- 55e4: nibbles fold back to 21988; digit sum 28 ≡ 21988 (mod 15). -/
theorem enumeration_hex4_55e4 : reassembles 21988 = true ∧ castsFifteens 21988 = true := by decide

/-- 55e5: nibbles fold back to 21989; digit sum 29 ≡ 21989 (mod 15). -/
theorem enumeration_hex4_55e5 : reassembles 21989 = true ∧ castsFifteens 21989 = true := by decide

/-- 55e6: nibbles fold back to 21990; digit sum 30 ≡ 21990 (mod 15). -/
theorem enumeration_hex4_55e6 : reassembles 21990 = true ∧ castsFifteens 21990 = true := by decide

/-- 55e7: nibbles fold back to 21991; digit sum 31 ≡ 21991 (mod 15). -/
theorem enumeration_hex4_55e7 : reassembles 21991 = true ∧ castsFifteens 21991 = true := by decide

/-- 55e8: nibbles fold back to 21992; digit sum 32 ≡ 21992 (mod 15). -/
theorem enumeration_hex4_55e8 : reassembles 21992 = true ∧ castsFifteens 21992 = true := by decide

/-- 55e9: nibbles fold back to 21993; digit sum 33 ≡ 21993 (mod 15). -/
theorem enumeration_hex4_55e9 : reassembles 21993 = true ∧ castsFifteens 21993 = true := by decide

/-- 55ea: nibbles fold back to 21994; digit sum 34 ≡ 21994 (mod 15). -/
theorem enumeration_hex4_55ea : reassembles 21994 = true ∧ castsFifteens 21994 = true := by decide

/-- 55eb: nibbles fold back to 21995; digit sum 35 ≡ 21995 (mod 15). -/
theorem enumeration_hex4_55eb : reassembles 21995 = true ∧ castsFifteens 21995 = true := by decide

/-- 55ec: nibbles fold back to 21996; digit sum 36 ≡ 21996 (mod 15). -/
theorem enumeration_hex4_55ec : reassembles 21996 = true ∧ castsFifteens 21996 = true := by decide

/-- 55ed: nibbles fold back to 21997; digit sum 37 ≡ 21997 (mod 15). -/
theorem enumeration_hex4_55ed : reassembles 21997 = true ∧ castsFifteens 21997 = true := by decide

/-- 55ee: nibbles fold back to 21998; digit sum 38 ≡ 21998 (mod 15). -/
theorem enumeration_hex4_55ee : reassembles 21998 = true ∧ castsFifteens 21998 = true := by decide

/-- 55ef: nibbles fold back to 21999; digit sum 39 ≡ 21999 (mod 15). -/
theorem enumeration_hex4_55ef : reassembles 21999 = true ∧ castsFifteens 21999 = true := by decide

/-- 55f0: nibbles fold back to 22000; digit sum 25 ≡ 22000 (mod 15). -/
theorem enumeration_hex4_55f0 : reassembles 22000 = true ∧ castsFifteens 22000 = true := by decide

/-- 55f1: nibbles fold back to 22001; digit sum 26 ≡ 22001 (mod 15). -/
theorem enumeration_hex4_55f1 : reassembles 22001 = true ∧ castsFifteens 22001 = true := by decide

/-- 55f2: nibbles fold back to 22002; digit sum 27 ≡ 22002 (mod 15). -/
theorem enumeration_hex4_55f2 : reassembles 22002 = true ∧ castsFifteens 22002 = true := by decide

/-- 55f3: nibbles fold back to 22003; digit sum 28 ≡ 22003 (mod 15). -/
theorem enumeration_hex4_55f3 : reassembles 22003 = true ∧ castsFifteens 22003 = true := by decide

/-- 55f4: nibbles fold back to 22004; digit sum 29 ≡ 22004 (mod 15). -/
theorem enumeration_hex4_55f4 : reassembles 22004 = true ∧ castsFifteens 22004 = true := by decide

/-- 55f5: nibbles fold back to 22005; digit sum 30 ≡ 22005 (mod 15). -/
theorem enumeration_hex4_55f5 : reassembles 22005 = true ∧ castsFifteens 22005 = true := by decide

/-- 55f6: nibbles fold back to 22006; digit sum 31 ≡ 22006 (mod 15). -/
theorem enumeration_hex4_55f6 : reassembles 22006 = true ∧ castsFifteens 22006 = true := by decide

/-- 55f7: nibbles fold back to 22007; digit sum 32 ≡ 22007 (mod 15). -/
theorem enumeration_hex4_55f7 : reassembles 22007 = true ∧ castsFifteens 22007 = true := by decide

/-- 55f8: nibbles fold back to 22008; digit sum 33 ≡ 22008 (mod 15). -/
theorem enumeration_hex4_55f8 : reassembles 22008 = true ∧ castsFifteens 22008 = true := by decide

/-- 55f9: nibbles fold back to 22009; digit sum 34 ≡ 22009 (mod 15). -/
theorem enumeration_hex4_55f9 : reassembles 22009 = true ∧ castsFifteens 22009 = true := by decide

/-- 55fa: nibbles fold back to 22010; digit sum 35 ≡ 22010 (mod 15). -/
theorem enumeration_hex4_55fa : reassembles 22010 = true ∧ castsFifteens 22010 = true := by decide

/-- 55fb: nibbles fold back to 22011; digit sum 36 ≡ 22011 (mod 15). -/
theorem enumeration_hex4_55fb : reassembles 22011 = true ∧ castsFifteens 22011 = true := by decide

/-- 55fc: nibbles fold back to 22012; digit sum 37 ≡ 22012 (mod 15). -/
theorem enumeration_hex4_55fc : reassembles 22012 = true ∧ castsFifteens 22012 = true := by decide

/-- 55fd: nibbles fold back to 22013; digit sum 38 ≡ 22013 (mod 15). -/
theorem enumeration_hex4_55fd : reassembles 22013 = true ∧ castsFifteens 22013 = true := by decide

/-- 55fe: nibbles fold back to 22014; digit sum 39 ≡ 22014 (mod 15). -/
theorem enumeration_hex4_55fe : reassembles 22014 = true ∧ castsFifteens 22014 = true := by decide

/-- 55ff: nibbles fold back to 22015; digit sum 40 ≡ 22015 (mod 15). -/
theorem enumeration_hex4_55ff : reassembles 22015 = true ∧ castsFifteens 22015 = true := by decide

/-- 5600: nibbles fold back to 22016; digit sum 11 ≡ 22016 (mod 15). -/
theorem enumeration_hex4_5600 : reassembles 22016 = true ∧ castsFifteens 22016 = true := by decide

/-- 5601: nibbles fold back to 22017; digit sum 12 ≡ 22017 (mod 15). -/
theorem enumeration_hex4_5601 : reassembles 22017 = true ∧ castsFifteens 22017 = true := by decide

/-- 5602: nibbles fold back to 22018; digit sum 13 ≡ 22018 (mod 15). -/
theorem enumeration_hex4_5602 : reassembles 22018 = true ∧ castsFifteens 22018 = true := by decide

/-- 5603: nibbles fold back to 22019; digit sum 14 ≡ 22019 (mod 15). -/
theorem enumeration_hex4_5603 : reassembles 22019 = true ∧ castsFifteens 22019 = true := by decide

/-- 5604: nibbles fold back to 22020; digit sum 15 ≡ 22020 (mod 15). -/
theorem enumeration_hex4_5604 : reassembles 22020 = true ∧ castsFifteens 22020 = true := by decide

/-- 5605: nibbles fold back to 22021; digit sum 16 ≡ 22021 (mod 15). -/
theorem enumeration_hex4_5605 : reassembles 22021 = true ∧ castsFifteens 22021 = true := by decide

/-- 5606: nibbles fold back to 22022; digit sum 17 ≡ 22022 (mod 15). -/
theorem enumeration_hex4_5606 : reassembles 22022 = true ∧ castsFifteens 22022 = true := by decide

/-- 5607: nibbles fold back to 22023; digit sum 18 ≡ 22023 (mod 15). -/
theorem enumeration_hex4_5607 : reassembles 22023 = true ∧ castsFifteens 22023 = true := by decide

/-- 5608: nibbles fold back to 22024; digit sum 19 ≡ 22024 (mod 15). -/
theorem enumeration_hex4_5608 : reassembles 22024 = true ∧ castsFifteens 22024 = true := by decide

/-- 5609: nibbles fold back to 22025; digit sum 20 ≡ 22025 (mod 15). -/
theorem enumeration_hex4_5609 : reassembles 22025 = true ∧ castsFifteens 22025 = true := by decide

/-- 560a: nibbles fold back to 22026; digit sum 21 ≡ 22026 (mod 15). -/
theorem enumeration_hex4_560a : reassembles 22026 = true ∧ castsFifteens 22026 = true := by decide

/-- 560b: nibbles fold back to 22027; digit sum 22 ≡ 22027 (mod 15). -/
theorem enumeration_hex4_560b : reassembles 22027 = true ∧ castsFifteens 22027 = true := by decide

/-- 560c: nibbles fold back to 22028; digit sum 23 ≡ 22028 (mod 15). -/
theorem enumeration_hex4_560c : reassembles 22028 = true ∧ castsFifteens 22028 = true := by decide

/-- 560d: nibbles fold back to 22029; digit sum 24 ≡ 22029 (mod 15). -/
theorem enumeration_hex4_560d : reassembles 22029 = true ∧ castsFifteens 22029 = true := by decide

/-- 560e: nibbles fold back to 22030; digit sum 25 ≡ 22030 (mod 15). -/
theorem enumeration_hex4_560e : reassembles 22030 = true ∧ castsFifteens 22030 = true := by decide

/-- 560f: nibbles fold back to 22031; digit sum 26 ≡ 22031 (mod 15). -/
theorem enumeration_hex4_560f : reassembles 22031 = true ∧ castsFifteens 22031 = true := by decide

/-- 5610: nibbles fold back to 22032; digit sum 12 ≡ 22032 (mod 15). -/
theorem enumeration_hex4_5610 : reassembles 22032 = true ∧ castsFifteens 22032 = true := by decide

/-- 5611: nibbles fold back to 22033; digit sum 13 ≡ 22033 (mod 15). -/
theorem enumeration_hex4_5611 : reassembles 22033 = true ∧ castsFifteens 22033 = true := by decide

/-- 5612: nibbles fold back to 22034; digit sum 14 ≡ 22034 (mod 15). -/
theorem enumeration_hex4_5612 : reassembles 22034 = true ∧ castsFifteens 22034 = true := by decide

/-- 5613: nibbles fold back to 22035; digit sum 15 ≡ 22035 (mod 15). -/
theorem enumeration_hex4_5613 : reassembles 22035 = true ∧ castsFifteens 22035 = true := by decide

/-- 5614: nibbles fold back to 22036; digit sum 16 ≡ 22036 (mod 15). -/
theorem enumeration_hex4_5614 : reassembles 22036 = true ∧ castsFifteens 22036 = true := by decide

/-- 5615: nibbles fold back to 22037; digit sum 17 ≡ 22037 (mod 15). -/
theorem enumeration_hex4_5615 : reassembles 22037 = true ∧ castsFifteens 22037 = true := by decide

/-- 5616: nibbles fold back to 22038; digit sum 18 ≡ 22038 (mod 15). -/
theorem enumeration_hex4_5616 : reassembles 22038 = true ∧ castsFifteens 22038 = true := by decide

/-- 5617: nibbles fold back to 22039; digit sum 19 ≡ 22039 (mod 15). -/
theorem enumeration_hex4_5617 : reassembles 22039 = true ∧ castsFifteens 22039 = true := by decide

/-- 5618: nibbles fold back to 22040; digit sum 20 ≡ 22040 (mod 15). -/
theorem enumeration_hex4_5618 : reassembles 22040 = true ∧ castsFifteens 22040 = true := by decide

/-- 5619: nibbles fold back to 22041; digit sum 21 ≡ 22041 (mod 15). -/
theorem enumeration_hex4_5619 : reassembles 22041 = true ∧ castsFifteens 22041 = true := by decide

/-- 561a: nibbles fold back to 22042; digit sum 22 ≡ 22042 (mod 15). -/
theorem enumeration_hex4_561a : reassembles 22042 = true ∧ castsFifteens 22042 = true := by decide

/-- 561b: nibbles fold back to 22043; digit sum 23 ≡ 22043 (mod 15). -/
theorem enumeration_hex4_561b : reassembles 22043 = true ∧ castsFifteens 22043 = true := by decide

/-- 561c: nibbles fold back to 22044; digit sum 24 ≡ 22044 (mod 15). -/
theorem enumeration_hex4_561c : reassembles 22044 = true ∧ castsFifteens 22044 = true := by decide

/-- 561d: nibbles fold back to 22045; digit sum 25 ≡ 22045 (mod 15). -/
theorem enumeration_hex4_561d : reassembles 22045 = true ∧ castsFifteens 22045 = true := by decide

/-- 561e: nibbles fold back to 22046; digit sum 26 ≡ 22046 (mod 15). -/
theorem enumeration_hex4_561e : reassembles 22046 = true ∧ castsFifteens 22046 = true := by decide

/-- 561f: nibbles fold back to 22047; digit sum 27 ≡ 22047 (mod 15). -/
theorem enumeration_hex4_561f : reassembles 22047 = true ∧ castsFifteens 22047 = true := by decide

/-- 5620: nibbles fold back to 22048; digit sum 13 ≡ 22048 (mod 15). -/
theorem enumeration_hex4_5620 : reassembles 22048 = true ∧ castsFifteens 22048 = true := by decide

/-- 5621: nibbles fold back to 22049; digit sum 14 ≡ 22049 (mod 15). -/
theorem enumeration_hex4_5621 : reassembles 22049 = true ∧ castsFifteens 22049 = true := by decide

/-- 5622: nibbles fold back to 22050; digit sum 15 ≡ 22050 (mod 15). -/
theorem enumeration_hex4_5622 : reassembles 22050 = true ∧ castsFifteens 22050 = true := by decide

/-- 5623: nibbles fold back to 22051; digit sum 16 ≡ 22051 (mod 15). -/
theorem enumeration_hex4_5623 : reassembles 22051 = true ∧ castsFifteens 22051 = true := by decide

/-- 5624: nibbles fold back to 22052; digit sum 17 ≡ 22052 (mod 15). -/
theorem enumeration_hex4_5624 : reassembles 22052 = true ∧ castsFifteens 22052 = true := by decide

/-- 5625: nibbles fold back to 22053; digit sum 18 ≡ 22053 (mod 15). -/
theorem enumeration_hex4_5625 : reassembles 22053 = true ∧ castsFifteens 22053 = true := by decide

/-- 5626: nibbles fold back to 22054; digit sum 19 ≡ 22054 (mod 15). -/
theorem enumeration_hex4_5626 : reassembles 22054 = true ∧ castsFifteens 22054 = true := by decide

/-- 5627: nibbles fold back to 22055; digit sum 20 ≡ 22055 (mod 15). -/
theorem enumeration_hex4_5627 : reassembles 22055 = true ∧ castsFifteens 22055 = true := by decide

/-- 5628: nibbles fold back to 22056; digit sum 21 ≡ 22056 (mod 15). -/
theorem enumeration_hex4_5628 : reassembles 22056 = true ∧ castsFifteens 22056 = true := by decide

/-- 5629: nibbles fold back to 22057; digit sum 22 ≡ 22057 (mod 15). -/
theorem enumeration_hex4_5629 : reassembles 22057 = true ∧ castsFifteens 22057 = true := by decide

/-- 562a: nibbles fold back to 22058; digit sum 23 ≡ 22058 (mod 15). -/
theorem enumeration_hex4_562a : reassembles 22058 = true ∧ castsFifteens 22058 = true := by decide

/-- 562b: nibbles fold back to 22059; digit sum 24 ≡ 22059 (mod 15). -/
theorem enumeration_hex4_562b : reassembles 22059 = true ∧ castsFifteens 22059 = true := by decide

/-- 562c: nibbles fold back to 22060; digit sum 25 ≡ 22060 (mod 15). -/
theorem enumeration_hex4_562c : reassembles 22060 = true ∧ castsFifteens 22060 = true := by decide

/-- 562d: nibbles fold back to 22061; digit sum 26 ≡ 22061 (mod 15). -/
theorem enumeration_hex4_562d : reassembles 22061 = true ∧ castsFifteens 22061 = true := by decide

/-- 562e: nibbles fold back to 22062; digit sum 27 ≡ 22062 (mod 15). -/
theorem enumeration_hex4_562e : reassembles 22062 = true ∧ castsFifteens 22062 = true := by decide

/-- 562f: nibbles fold back to 22063; digit sum 28 ≡ 22063 (mod 15). -/
theorem enumeration_hex4_562f : reassembles 22063 = true ∧ castsFifteens 22063 = true := by decide

/-- 5630: nibbles fold back to 22064; digit sum 14 ≡ 22064 (mod 15). -/
theorem enumeration_hex4_5630 : reassembles 22064 = true ∧ castsFifteens 22064 = true := by decide

/-- 5631: nibbles fold back to 22065; digit sum 15 ≡ 22065 (mod 15). -/
theorem enumeration_hex4_5631 : reassembles 22065 = true ∧ castsFifteens 22065 = true := by decide

/-- 5632: nibbles fold back to 22066; digit sum 16 ≡ 22066 (mod 15). -/
theorem enumeration_hex4_5632 : reassembles 22066 = true ∧ castsFifteens 22066 = true := by decide

/-- 5633: nibbles fold back to 22067; digit sum 17 ≡ 22067 (mod 15). -/
theorem enumeration_hex4_5633 : reassembles 22067 = true ∧ castsFifteens 22067 = true := by decide

/-- 5634: nibbles fold back to 22068; digit sum 18 ≡ 22068 (mod 15). -/
theorem enumeration_hex4_5634 : reassembles 22068 = true ∧ castsFifteens 22068 = true := by decide

/-- 5635: nibbles fold back to 22069; digit sum 19 ≡ 22069 (mod 15). -/
theorem enumeration_hex4_5635 : reassembles 22069 = true ∧ castsFifteens 22069 = true := by decide

/-- 5636: nibbles fold back to 22070; digit sum 20 ≡ 22070 (mod 15). -/
theorem enumeration_hex4_5636 : reassembles 22070 = true ∧ castsFifteens 22070 = true := by decide

/-- 5637: nibbles fold back to 22071; digit sum 21 ≡ 22071 (mod 15). -/
theorem enumeration_hex4_5637 : reassembles 22071 = true ∧ castsFifteens 22071 = true := by decide

/-- 5638: nibbles fold back to 22072; digit sum 22 ≡ 22072 (mod 15). -/
theorem enumeration_hex4_5638 : reassembles 22072 = true ∧ castsFifteens 22072 = true := by decide

/-- 5639: nibbles fold back to 22073; digit sum 23 ≡ 22073 (mod 15). -/
theorem enumeration_hex4_5639 : reassembles 22073 = true ∧ castsFifteens 22073 = true := by decide

/-- 563a: nibbles fold back to 22074; digit sum 24 ≡ 22074 (mod 15). -/
theorem enumeration_hex4_563a : reassembles 22074 = true ∧ castsFifteens 22074 = true := by decide

/-- 563b: nibbles fold back to 22075; digit sum 25 ≡ 22075 (mod 15). -/
theorem enumeration_hex4_563b : reassembles 22075 = true ∧ castsFifteens 22075 = true := by decide

/-- 563c: nibbles fold back to 22076; digit sum 26 ≡ 22076 (mod 15). -/
theorem enumeration_hex4_563c : reassembles 22076 = true ∧ castsFifteens 22076 = true := by decide

/-- 563d: nibbles fold back to 22077; digit sum 27 ≡ 22077 (mod 15). -/
theorem enumeration_hex4_563d : reassembles 22077 = true ∧ castsFifteens 22077 = true := by decide

/-- 563e: nibbles fold back to 22078; digit sum 28 ≡ 22078 (mod 15). -/
theorem enumeration_hex4_563e : reassembles 22078 = true ∧ castsFifteens 22078 = true := by decide

/-- 563f: nibbles fold back to 22079; digit sum 29 ≡ 22079 (mod 15). -/
theorem enumeration_hex4_563f : reassembles 22079 = true ∧ castsFifteens 22079 = true := by decide

/-- 5640: nibbles fold back to 22080; digit sum 15 ≡ 22080 (mod 15). -/
theorem enumeration_hex4_5640 : reassembles 22080 = true ∧ castsFifteens 22080 = true := by decide

/-- 5641: nibbles fold back to 22081; digit sum 16 ≡ 22081 (mod 15). -/
theorem enumeration_hex4_5641 : reassembles 22081 = true ∧ castsFifteens 22081 = true := by decide

/-- 5642: nibbles fold back to 22082; digit sum 17 ≡ 22082 (mod 15). -/
theorem enumeration_hex4_5642 : reassembles 22082 = true ∧ castsFifteens 22082 = true := by decide

/-- 5643: nibbles fold back to 22083; digit sum 18 ≡ 22083 (mod 15). -/
theorem enumeration_hex4_5643 : reassembles 22083 = true ∧ castsFifteens 22083 = true := by decide

/-- 5644: nibbles fold back to 22084; digit sum 19 ≡ 22084 (mod 15). -/
theorem enumeration_hex4_5644 : reassembles 22084 = true ∧ castsFifteens 22084 = true := by decide

/-- 5645: nibbles fold back to 22085; digit sum 20 ≡ 22085 (mod 15). -/
theorem enumeration_hex4_5645 : reassembles 22085 = true ∧ castsFifteens 22085 = true := by decide

/-- 5646: nibbles fold back to 22086; digit sum 21 ≡ 22086 (mod 15). -/
theorem enumeration_hex4_5646 : reassembles 22086 = true ∧ castsFifteens 22086 = true := by decide

/-- 5647: nibbles fold back to 22087; digit sum 22 ≡ 22087 (mod 15). -/
theorem enumeration_hex4_5647 : reassembles 22087 = true ∧ castsFifteens 22087 = true := by decide

/-- 5648: nibbles fold back to 22088; digit sum 23 ≡ 22088 (mod 15). -/
theorem enumeration_hex4_5648 : reassembles 22088 = true ∧ castsFifteens 22088 = true := by decide

/-- 5649: nibbles fold back to 22089; digit sum 24 ≡ 22089 (mod 15). -/
theorem enumeration_hex4_5649 : reassembles 22089 = true ∧ castsFifteens 22089 = true := by decide

/-- 564a: nibbles fold back to 22090; digit sum 25 ≡ 22090 (mod 15). -/
theorem enumeration_hex4_564a : reassembles 22090 = true ∧ castsFifteens 22090 = true := by decide

/-- 564b: nibbles fold back to 22091; digit sum 26 ≡ 22091 (mod 15). -/
theorem enumeration_hex4_564b : reassembles 22091 = true ∧ castsFifteens 22091 = true := by decide

/-- 564c: nibbles fold back to 22092; digit sum 27 ≡ 22092 (mod 15). -/
theorem enumeration_hex4_564c : reassembles 22092 = true ∧ castsFifteens 22092 = true := by decide

/-- 564d: nibbles fold back to 22093; digit sum 28 ≡ 22093 (mod 15). -/
theorem enumeration_hex4_564d : reassembles 22093 = true ∧ castsFifteens 22093 = true := by decide

/-- 564e: nibbles fold back to 22094; digit sum 29 ≡ 22094 (mod 15). -/
theorem enumeration_hex4_564e : reassembles 22094 = true ∧ castsFifteens 22094 = true := by decide

/-- 564f: nibbles fold back to 22095; digit sum 30 ≡ 22095 (mod 15). -/
theorem enumeration_hex4_564f : reassembles 22095 = true ∧ castsFifteens 22095 = true := by decide

/-- 5650: nibbles fold back to 22096; digit sum 16 ≡ 22096 (mod 15). -/
theorem enumeration_hex4_5650 : reassembles 22096 = true ∧ castsFifteens 22096 = true := by decide

/-- 5651: nibbles fold back to 22097; digit sum 17 ≡ 22097 (mod 15). -/
theorem enumeration_hex4_5651 : reassembles 22097 = true ∧ castsFifteens 22097 = true := by decide

/-- 5652: nibbles fold back to 22098; digit sum 18 ≡ 22098 (mod 15). -/
theorem enumeration_hex4_5652 : reassembles 22098 = true ∧ castsFifteens 22098 = true := by decide

/-- 5653: nibbles fold back to 22099; digit sum 19 ≡ 22099 (mod 15). -/
theorem enumeration_hex4_5653 : reassembles 22099 = true ∧ castsFifteens 22099 = true := by decide

/-- 5654: nibbles fold back to 22100; digit sum 20 ≡ 22100 (mod 15). -/
theorem enumeration_hex4_5654 : reassembles 22100 = true ∧ castsFifteens 22100 = true := by decide

/-- 5655: nibbles fold back to 22101; digit sum 21 ≡ 22101 (mod 15). -/
theorem enumeration_hex4_5655 : reassembles 22101 = true ∧ castsFifteens 22101 = true := by decide

/-- 5656: nibbles fold back to 22102; digit sum 22 ≡ 22102 (mod 15). -/
theorem enumeration_hex4_5656 : reassembles 22102 = true ∧ castsFifteens 22102 = true := by decide

/-- 5657: nibbles fold back to 22103; digit sum 23 ≡ 22103 (mod 15). -/
theorem enumeration_hex4_5657 : reassembles 22103 = true ∧ castsFifteens 22103 = true := by decide

/-- 5658: nibbles fold back to 22104; digit sum 24 ≡ 22104 (mod 15). -/
theorem enumeration_hex4_5658 : reassembles 22104 = true ∧ castsFifteens 22104 = true := by decide

/-- 5659: nibbles fold back to 22105; digit sum 25 ≡ 22105 (mod 15). -/
theorem enumeration_hex4_5659 : reassembles 22105 = true ∧ castsFifteens 22105 = true := by decide

/-- 565a: nibbles fold back to 22106; digit sum 26 ≡ 22106 (mod 15). -/
theorem enumeration_hex4_565a : reassembles 22106 = true ∧ castsFifteens 22106 = true := by decide

/-- 565b: nibbles fold back to 22107; digit sum 27 ≡ 22107 (mod 15). -/
theorem enumeration_hex4_565b : reassembles 22107 = true ∧ castsFifteens 22107 = true := by decide

/-- 565c: nibbles fold back to 22108; digit sum 28 ≡ 22108 (mod 15). -/
theorem enumeration_hex4_565c : reassembles 22108 = true ∧ castsFifteens 22108 = true := by decide

/-- 565d: nibbles fold back to 22109; digit sum 29 ≡ 22109 (mod 15). -/
theorem enumeration_hex4_565d : reassembles 22109 = true ∧ castsFifteens 22109 = true := by decide

/-- 565e: nibbles fold back to 22110; digit sum 30 ≡ 22110 (mod 15). -/
theorem enumeration_hex4_565e : reassembles 22110 = true ∧ castsFifteens 22110 = true := by decide

/-- 565f: nibbles fold back to 22111; digit sum 31 ≡ 22111 (mod 15). -/
theorem enumeration_hex4_565f : reassembles 22111 = true ∧ castsFifteens 22111 = true := by decide

/-- 5660: nibbles fold back to 22112; digit sum 17 ≡ 22112 (mod 15). -/
theorem enumeration_hex4_5660 : reassembles 22112 = true ∧ castsFifteens 22112 = true := by decide

/-- 5661: nibbles fold back to 22113; digit sum 18 ≡ 22113 (mod 15). -/
theorem enumeration_hex4_5661 : reassembles 22113 = true ∧ castsFifteens 22113 = true := by decide

/-- 5662: nibbles fold back to 22114; digit sum 19 ≡ 22114 (mod 15). -/
theorem enumeration_hex4_5662 : reassembles 22114 = true ∧ castsFifteens 22114 = true := by decide

/-- 5663: nibbles fold back to 22115; digit sum 20 ≡ 22115 (mod 15). -/
theorem enumeration_hex4_5663 : reassembles 22115 = true ∧ castsFifteens 22115 = true := by decide

/-- 5664: nibbles fold back to 22116; digit sum 21 ≡ 22116 (mod 15). -/
theorem enumeration_hex4_5664 : reassembles 22116 = true ∧ castsFifteens 22116 = true := by decide

/-- 5665: nibbles fold back to 22117; digit sum 22 ≡ 22117 (mod 15). -/
theorem enumeration_hex4_5665 : reassembles 22117 = true ∧ castsFifteens 22117 = true := by decide

/-- 5666: nibbles fold back to 22118; digit sum 23 ≡ 22118 (mod 15). -/
theorem enumeration_hex4_5666 : reassembles 22118 = true ∧ castsFifteens 22118 = true := by decide

/-- 5667: nibbles fold back to 22119; digit sum 24 ≡ 22119 (mod 15). -/
theorem enumeration_hex4_5667 : reassembles 22119 = true ∧ castsFifteens 22119 = true := by decide

/-- 5668: nibbles fold back to 22120; digit sum 25 ≡ 22120 (mod 15). -/
theorem enumeration_hex4_5668 : reassembles 22120 = true ∧ castsFifteens 22120 = true := by decide

/-- 5669: nibbles fold back to 22121; digit sum 26 ≡ 22121 (mod 15). -/
theorem enumeration_hex4_5669 : reassembles 22121 = true ∧ castsFifteens 22121 = true := by decide

/-- 566a: nibbles fold back to 22122; digit sum 27 ≡ 22122 (mod 15). -/
theorem enumeration_hex4_566a : reassembles 22122 = true ∧ castsFifteens 22122 = true := by decide

/-- 566b: nibbles fold back to 22123; digit sum 28 ≡ 22123 (mod 15). -/
theorem enumeration_hex4_566b : reassembles 22123 = true ∧ castsFifteens 22123 = true := by decide

/-- 566c: nibbles fold back to 22124; digit sum 29 ≡ 22124 (mod 15). -/
theorem enumeration_hex4_566c : reassembles 22124 = true ∧ castsFifteens 22124 = true := by decide

/-- 566d: nibbles fold back to 22125; digit sum 30 ≡ 22125 (mod 15). -/
theorem enumeration_hex4_566d : reassembles 22125 = true ∧ castsFifteens 22125 = true := by decide

/-- 566e: nibbles fold back to 22126; digit sum 31 ≡ 22126 (mod 15). -/
theorem enumeration_hex4_566e : reassembles 22126 = true ∧ castsFifteens 22126 = true := by decide

/-- 566f: nibbles fold back to 22127; digit sum 32 ≡ 22127 (mod 15). -/
theorem enumeration_hex4_566f : reassembles 22127 = true ∧ castsFifteens 22127 = true := by decide

/-- 5670: nibbles fold back to 22128; digit sum 18 ≡ 22128 (mod 15). -/
theorem enumeration_hex4_5670 : reassembles 22128 = true ∧ castsFifteens 22128 = true := by decide

/-- 5671: nibbles fold back to 22129; digit sum 19 ≡ 22129 (mod 15). -/
theorem enumeration_hex4_5671 : reassembles 22129 = true ∧ castsFifteens 22129 = true := by decide

/-- 5672: nibbles fold back to 22130; digit sum 20 ≡ 22130 (mod 15). -/
theorem enumeration_hex4_5672 : reassembles 22130 = true ∧ castsFifteens 22130 = true := by decide

/-- 5673: nibbles fold back to 22131; digit sum 21 ≡ 22131 (mod 15). -/
theorem enumeration_hex4_5673 : reassembles 22131 = true ∧ castsFifteens 22131 = true := by decide

/-- 5674: nibbles fold back to 22132; digit sum 22 ≡ 22132 (mod 15). -/
theorem enumeration_hex4_5674 : reassembles 22132 = true ∧ castsFifteens 22132 = true := by decide

/-- 5675: nibbles fold back to 22133; digit sum 23 ≡ 22133 (mod 15). -/
theorem enumeration_hex4_5675 : reassembles 22133 = true ∧ castsFifteens 22133 = true := by decide

/-- 5676: nibbles fold back to 22134; digit sum 24 ≡ 22134 (mod 15). -/
theorem enumeration_hex4_5676 : reassembles 22134 = true ∧ castsFifteens 22134 = true := by decide

/-- 5677: nibbles fold back to 22135; digit sum 25 ≡ 22135 (mod 15). -/
theorem enumeration_hex4_5677 : reassembles 22135 = true ∧ castsFifteens 22135 = true := by decide

/-- 5678: nibbles fold back to 22136; digit sum 26 ≡ 22136 (mod 15). -/
theorem enumeration_hex4_5678 : reassembles 22136 = true ∧ castsFifteens 22136 = true := by decide

/-- 5679: nibbles fold back to 22137; digit sum 27 ≡ 22137 (mod 15). -/
theorem enumeration_hex4_5679 : reassembles 22137 = true ∧ castsFifteens 22137 = true := by decide

/-- 567a: nibbles fold back to 22138; digit sum 28 ≡ 22138 (mod 15). -/
theorem enumeration_hex4_567a : reassembles 22138 = true ∧ castsFifteens 22138 = true := by decide

/-- 567b: nibbles fold back to 22139; digit sum 29 ≡ 22139 (mod 15). -/
theorem enumeration_hex4_567b : reassembles 22139 = true ∧ castsFifteens 22139 = true := by decide

/-- 567c: nibbles fold back to 22140; digit sum 30 ≡ 22140 (mod 15). -/
theorem enumeration_hex4_567c : reassembles 22140 = true ∧ castsFifteens 22140 = true := by decide

/-- 567d: nibbles fold back to 22141; digit sum 31 ≡ 22141 (mod 15). -/
theorem enumeration_hex4_567d : reassembles 22141 = true ∧ castsFifteens 22141 = true := by decide

/-- 567e: nibbles fold back to 22142; digit sum 32 ≡ 22142 (mod 15). -/
theorem enumeration_hex4_567e : reassembles 22142 = true ∧ castsFifteens 22142 = true := by decide

/-- 567f: nibbles fold back to 22143; digit sum 33 ≡ 22143 (mod 15). -/
theorem enumeration_hex4_567f : reassembles 22143 = true ∧ castsFifteens 22143 = true := by decide

/-- 5680: nibbles fold back to 22144; digit sum 19 ≡ 22144 (mod 15). -/
theorem enumeration_hex4_5680 : reassembles 22144 = true ∧ castsFifteens 22144 = true := by decide

/-- 5681: nibbles fold back to 22145; digit sum 20 ≡ 22145 (mod 15). -/
theorem enumeration_hex4_5681 : reassembles 22145 = true ∧ castsFifteens 22145 = true := by decide

/-- 5682: nibbles fold back to 22146; digit sum 21 ≡ 22146 (mod 15). -/
theorem enumeration_hex4_5682 : reassembles 22146 = true ∧ castsFifteens 22146 = true := by decide

/-- 5683: nibbles fold back to 22147; digit sum 22 ≡ 22147 (mod 15). -/
theorem enumeration_hex4_5683 : reassembles 22147 = true ∧ castsFifteens 22147 = true := by decide

/-- 5684: nibbles fold back to 22148; digit sum 23 ≡ 22148 (mod 15). -/
theorem enumeration_hex4_5684 : reassembles 22148 = true ∧ castsFifteens 22148 = true := by decide

/-- 5685: nibbles fold back to 22149; digit sum 24 ≡ 22149 (mod 15). -/
theorem enumeration_hex4_5685 : reassembles 22149 = true ∧ castsFifteens 22149 = true := by decide

/-- 5686: nibbles fold back to 22150; digit sum 25 ≡ 22150 (mod 15). -/
theorem enumeration_hex4_5686 : reassembles 22150 = true ∧ castsFifteens 22150 = true := by decide

/-- 5687: nibbles fold back to 22151; digit sum 26 ≡ 22151 (mod 15). -/
theorem enumeration_hex4_5687 : reassembles 22151 = true ∧ castsFifteens 22151 = true := by decide

/-- 5688: nibbles fold back to 22152; digit sum 27 ≡ 22152 (mod 15). -/
theorem enumeration_hex4_5688 : reassembles 22152 = true ∧ castsFifteens 22152 = true := by decide

/-- 5689: nibbles fold back to 22153; digit sum 28 ≡ 22153 (mod 15). -/
theorem enumeration_hex4_5689 : reassembles 22153 = true ∧ castsFifteens 22153 = true := by decide

/-- 568a: nibbles fold back to 22154; digit sum 29 ≡ 22154 (mod 15). -/
theorem enumeration_hex4_568a : reassembles 22154 = true ∧ castsFifteens 22154 = true := by decide

/-- 568b: nibbles fold back to 22155; digit sum 30 ≡ 22155 (mod 15). -/
theorem enumeration_hex4_568b : reassembles 22155 = true ∧ castsFifteens 22155 = true := by decide

/-- 568c: nibbles fold back to 22156; digit sum 31 ≡ 22156 (mod 15). -/
theorem enumeration_hex4_568c : reassembles 22156 = true ∧ castsFifteens 22156 = true := by decide

/-- 568d: nibbles fold back to 22157; digit sum 32 ≡ 22157 (mod 15). -/
theorem enumeration_hex4_568d : reassembles 22157 = true ∧ castsFifteens 22157 = true := by decide

/-- 568e: nibbles fold back to 22158; digit sum 33 ≡ 22158 (mod 15). -/
theorem enumeration_hex4_568e : reassembles 22158 = true ∧ castsFifteens 22158 = true := by decide

/-- 568f: nibbles fold back to 22159; digit sum 34 ≡ 22159 (mod 15). -/
theorem enumeration_hex4_568f : reassembles 22159 = true ∧ castsFifteens 22159 = true := by decide

/-- 5690: nibbles fold back to 22160; digit sum 20 ≡ 22160 (mod 15). -/
theorem enumeration_hex4_5690 : reassembles 22160 = true ∧ castsFifteens 22160 = true := by decide

/-- 5691: nibbles fold back to 22161; digit sum 21 ≡ 22161 (mod 15). -/
theorem enumeration_hex4_5691 : reassembles 22161 = true ∧ castsFifteens 22161 = true := by decide

/-- 5692: nibbles fold back to 22162; digit sum 22 ≡ 22162 (mod 15). -/
theorem enumeration_hex4_5692 : reassembles 22162 = true ∧ castsFifteens 22162 = true := by decide

/-- 5693: nibbles fold back to 22163; digit sum 23 ≡ 22163 (mod 15). -/
theorem enumeration_hex4_5693 : reassembles 22163 = true ∧ castsFifteens 22163 = true := by decide

/-- 5694: nibbles fold back to 22164; digit sum 24 ≡ 22164 (mod 15). -/
theorem enumeration_hex4_5694 : reassembles 22164 = true ∧ castsFifteens 22164 = true := by decide

/-- 5695: nibbles fold back to 22165; digit sum 25 ≡ 22165 (mod 15). -/
theorem enumeration_hex4_5695 : reassembles 22165 = true ∧ castsFifteens 22165 = true := by decide

/-- 5696: nibbles fold back to 22166; digit sum 26 ≡ 22166 (mod 15). -/
theorem enumeration_hex4_5696 : reassembles 22166 = true ∧ castsFifteens 22166 = true := by decide

/-- 5697: nibbles fold back to 22167; digit sum 27 ≡ 22167 (mod 15). -/
theorem enumeration_hex4_5697 : reassembles 22167 = true ∧ castsFifteens 22167 = true := by decide

/-- 5698: nibbles fold back to 22168; digit sum 28 ≡ 22168 (mod 15). -/
theorem enumeration_hex4_5698 : reassembles 22168 = true ∧ castsFifteens 22168 = true := by decide

/-- 5699: nibbles fold back to 22169; digit sum 29 ≡ 22169 (mod 15). -/
theorem enumeration_hex4_5699 : reassembles 22169 = true ∧ castsFifteens 22169 = true := by decide

/-- 569a: nibbles fold back to 22170; digit sum 30 ≡ 22170 (mod 15). -/
theorem enumeration_hex4_569a : reassembles 22170 = true ∧ castsFifteens 22170 = true := by decide

/-- 569b: nibbles fold back to 22171; digit sum 31 ≡ 22171 (mod 15). -/
theorem enumeration_hex4_569b : reassembles 22171 = true ∧ castsFifteens 22171 = true := by decide

/-- 569c: nibbles fold back to 22172; digit sum 32 ≡ 22172 (mod 15). -/
theorem enumeration_hex4_569c : reassembles 22172 = true ∧ castsFifteens 22172 = true := by decide

/-- 569d: nibbles fold back to 22173; digit sum 33 ≡ 22173 (mod 15). -/
theorem enumeration_hex4_569d : reassembles 22173 = true ∧ castsFifteens 22173 = true := by decide

/-- 569e: nibbles fold back to 22174; digit sum 34 ≡ 22174 (mod 15). -/
theorem enumeration_hex4_569e : reassembles 22174 = true ∧ castsFifteens 22174 = true := by decide

/-- 569f: nibbles fold back to 22175; digit sum 35 ≡ 22175 (mod 15). -/
theorem enumeration_hex4_569f : reassembles 22175 = true ∧ castsFifteens 22175 = true := by decide

/-- 56a0: nibbles fold back to 22176; digit sum 21 ≡ 22176 (mod 15). -/
theorem enumeration_hex4_56a0 : reassembles 22176 = true ∧ castsFifteens 22176 = true := by decide

/-- 56a1: nibbles fold back to 22177; digit sum 22 ≡ 22177 (mod 15). -/
theorem enumeration_hex4_56a1 : reassembles 22177 = true ∧ castsFifteens 22177 = true := by decide

/-- 56a2: nibbles fold back to 22178; digit sum 23 ≡ 22178 (mod 15). -/
theorem enumeration_hex4_56a2 : reassembles 22178 = true ∧ castsFifteens 22178 = true := by decide

/-- 56a3: nibbles fold back to 22179; digit sum 24 ≡ 22179 (mod 15). -/
theorem enumeration_hex4_56a3 : reassembles 22179 = true ∧ castsFifteens 22179 = true := by decide

/-- 56a4: nibbles fold back to 22180; digit sum 25 ≡ 22180 (mod 15). -/
theorem enumeration_hex4_56a4 : reassembles 22180 = true ∧ castsFifteens 22180 = true := by decide

/-- 56a5: nibbles fold back to 22181; digit sum 26 ≡ 22181 (mod 15). -/
theorem enumeration_hex4_56a5 : reassembles 22181 = true ∧ castsFifteens 22181 = true := by decide

/-- 56a6: nibbles fold back to 22182; digit sum 27 ≡ 22182 (mod 15). -/
theorem enumeration_hex4_56a6 : reassembles 22182 = true ∧ castsFifteens 22182 = true := by decide

/-- 56a7: nibbles fold back to 22183; digit sum 28 ≡ 22183 (mod 15). -/
theorem enumeration_hex4_56a7 : reassembles 22183 = true ∧ castsFifteens 22183 = true := by decide

/-- 56a8: nibbles fold back to 22184; digit sum 29 ≡ 22184 (mod 15). -/
theorem enumeration_hex4_56a8 : reassembles 22184 = true ∧ castsFifteens 22184 = true := by decide

/-- 56a9: nibbles fold back to 22185; digit sum 30 ≡ 22185 (mod 15). -/
theorem enumeration_hex4_56a9 : reassembles 22185 = true ∧ castsFifteens 22185 = true := by decide

/-- 56aa: nibbles fold back to 22186; digit sum 31 ≡ 22186 (mod 15). -/
theorem enumeration_hex4_56aa : reassembles 22186 = true ∧ castsFifteens 22186 = true := by decide

/-- 56ab: nibbles fold back to 22187; digit sum 32 ≡ 22187 (mod 15). -/
theorem enumeration_hex4_56ab : reassembles 22187 = true ∧ castsFifteens 22187 = true := by decide

/-- 56ac: nibbles fold back to 22188; digit sum 33 ≡ 22188 (mod 15). -/
theorem enumeration_hex4_56ac : reassembles 22188 = true ∧ castsFifteens 22188 = true := by decide

/-- 56ad: nibbles fold back to 22189; digit sum 34 ≡ 22189 (mod 15). -/
theorem enumeration_hex4_56ad : reassembles 22189 = true ∧ castsFifteens 22189 = true := by decide

/-- 56ae: nibbles fold back to 22190; digit sum 35 ≡ 22190 (mod 15). -/
theorem enumeration_hex4_56ae : reassembles 22190 = true ∧ castsFifteens 22190 = true := by decide

/-- 56af: nibbles fold back to 22191; digit sum 36 ≡ 22191 (mod 15). -/
theorem enumeration_hex4_56af : reassembles 22191 = true ∧ castsFifteens 22191 = true := by decide

/-- 56b0: nibbles fold back to 22192; digit sum 22 ≡ 22192 (mod 15). -/
theorem enumeration_hex4_56b0 : reassembles 22192 = true ∧ castsFifteens 22192 = true := by decide

/-- 56b1: nibbles fold back to 22193; digit sum 23 ≡ 22193 (mod 15). -/
theorem enumeration_hex4_56b1 : reassembles 22193 = true ∧ castsFifteens 22193 = true := by decide

/-- 56b2: nibbles fold back to 22194; digit sum 24 ≡ 22194 (mod 15). -/
theorem enumeration_hex4_56b2 : reassembles 22194 = true ∧ castsFifteens 22194 = true := by decide

/-- 56b3: nibbles fold back to 22195; digit sum 25 ≡ 22195 (mod 15). -/
theorem enumeration_hex4_56b3 : reassembles 22195 = true ∧ castsFifteens 22195 = true := by decide

/-- 56b4: nibbles fold back to 22196; digit sum 26 ≡ 22196 (mod 15). -/
theorem enumeration_hex4_56b4 : reassembles 22196 = true ∧ castsFifteens 22196 = true := by decide

/-- 56b5: nibbles fold back to 22197; digit sum 27 ≡ 22197 (mod 15). -/
theorem enumeration_hex4_56b5 : reassembles 22197 = true ∧ castsFifteens 22197 = true := by decide

/-- 56b6: nibbles fold back to 22198; digit sum 28 ≡ 22198 (mod 15). -/
theorem enumeration_hex4_56b6 : reassembles 22198 = true ∧ castsFifteens 22198 = true := by decide

/-- 56b7: nibbles fold back to 22199; digit sum 29 ≡ 22199 (mod 15). -/
theorem enumeration_hex4_56b7 : reassembles 22199 = true ∧ castsFifteens 22199 = true := by decide

/-- 56b8: nibbles fold back to 22200; digit sum 30 ≡ 22200 (mod 15). -/
theorem enumeration_hex4_56b8 : reassembles 22200 = true ∧ castsFifteens 22200 = true := by decide

/-- 56b9: nibbles fold back to 22201; digit sum 31 ≡ 22201 (mod 15). -/
theorem enumeration_hex4_56b9 : reassembles 22201 = true ∧ castsFifteens 22201 = true := by decide

/-- 56ba: nibbles fold back to 22202; digit sum 32 ≡ 22202 (mod 15). -/
theorem enumeration_hex4_56ba : reassembles 22202 = true ∧ castsFifteens 22202 = true := by decide

/-- 56bb: nibbles fold back to 22203; digit sum 33 ≡ 22203 (mod 15). -/
theorem enumeration_hex4_56bb : reassembles 22203 = true ∧ castsFifteens 22203 = true := by decide

/-- 56bc: nibbles fold back to 22204; digit sum 34 ≡ 22204 (mod 15). -/
theorem enumeration_hex4_56bc : reassembles 22204 = true ∧ castsFifteens 22204 = true := by decide

/-- 56bd: nibbles fold back to 22205; digit sum 35 ≡ 22205 (mod 15). -/
theorem enumeration_hex4_56bd : reassembles 22205 = true ∧ castsFifteens 22205 = true := by decide

/-- 56be: nibbles fold back to 22206; digit sum 36 ≡ 22206 (mod 15). -/
theorem enumeration_hex4_56be : reassembles 22206 = true ∧ castsFifteens 22206 = true := by decide

/-- 56bf: nibbles fold back to 22207; digit sum 37 ≡ 22207 (mod 15). -/
theorem enumeration_hex4_56bf : reassembles 22207 = true ∧ castsFifteens 22207 = true := by decide

/-- 56c0: nibbles fold back to 22208; digit sum 23 ≡ 22208 (mod 15). -/
theorem enumeration_hex4_56c0 : reassembles 22208 = true ∧ castsFifteens 22208 = true := by decide

/-- 56c1: nibbles fold back to 22209; digit sum 24 ≡ 22209 (mod 15). -/
theorem enumeration_hex4_56c1 : reassembles 22209 = true ∧ castsFifteens 22209 = true := by decide

/-- 56c2: nibbles fold back to 22210; digit sum 25 ≡ 22210 (mod 15). -/
theorem enumeration_hex4_56c2 : reassembles 22210 = true ∧ castsFifteens 22210 = true := by decide

/-- 56c3: nibbles fold back to 22211; digit sum 26 ≡ 22211 (mod 15). -/
theorem enumeration_hex4_56c3 : reassembles 22211 = true ∧ castsFifteens 22211 = true := by decide

/-- 56c4: nibbles fold back to 22212; digit sum 27 ≡ 22212 (mod 15). -/
theorem enumeration_hex4_56c4 : reassembles 22212 = true ∧ castsFifteens 22212 = true := by decide

/-- 56c5: nibbles fold back to 22213; digit sum 28 ≡ 22213 (mod 15). -/
theorem enumeration_hex4_56c5 : reassembles 22213 = true ∧ castsFifteens 22213 = true := by decide

/-- 56c6: nibbles fold back to 22214; digit sum 29 ≡ 22214 (mod 15). -/
theorem enumeration_hex4_56c6 : reassembles 22214 = true ∧ castsFifteens 22214 = true := by decide

/-- 56c7: nibbles fold back to 22215; digit sum 30 ≡ 22215 (mod 15). -/
theorem enumeration_hex4_56c7 : reassembles 22215 = true ∧ castsFifteens 22215 = true := by decide

/-- 56c8: nibbles fold back to 22216; digit sum 31 ≡ 22216 (mod 15). -/
theorem enumeration_hex4_56c8 : reassembles 22216 = true ∧ castsFifteens 22216 = true := by decide

/-- 56c9: nibbles fold back to 22217; digit sum 32 ≡ 22217 (mod 15). -/
theorem enumeration_hex4_56c9 : reassembles 22217 = true ∧ castsFifteens 22217 = true := by decide

/-- 56ca: nibbles fold back to 22218; digit sum 33 ≡ 22218 (mod 15). -/
theorem enumeration_hex4_56ca : reassembles 22218 = true ∧ castsFifteens 22218 = true := by decide

/-- 56cb: nibbles fold back to 22219; digit sum 34 ≡ 22219 (mod 15). -/
theorem enumeration_hex4_56cb : reassembles 22219 = true ∧ castsFifteens 22219 = true := by decide

/-- 56cc: nibbles fold back to 22220; digit sum 35 ≡ 22220 (mod 15). -/
theorem enumeration_hex4_56cc : reassembles 22220 = true ∧ castsFifteens 22220 = true := by decide

/-- 56cd: nibbles fold back to 22221; digit sum 36 ≡ 22221 (mod 15). -/
theorem enumeration_hex4_56cd : reassembles 22221 = true ∧ castsFifteens 22221 = true := by decide

/-- 56ce: nibbles fold back to 22222; digit sum 37 ≡ 22222 (mod 15). -/
theorem enumeration_hex4_56ce : reassembles 22222 = true ∧ castsFifteens 22222 = true := by decide

/-- 56cf: nibbles fold back to 22223; digit sum 38 ≡ 22223 (mod 15). -/
theorem enumeration_hex4_56cf : reassembles 22223 = true ∧ castsFifteens 22223 = true := by decide

/-- 56d0: nibbles fold back to 22224; digit sum 24 ≡ 22224 (mod 15). -/
theorem enumeration_hex4_56d0 : reassembles 22224 = true ∧ castsFifteens 22224 = true := by decide

/-- 56d1: nibbles fold back to 22225; digit sum 25 ≡ 22225 (mod 15). -/
theorem enumeration_hex4_56d1 : reassembles 22225 = true ∧ castsFifteens 22225 = true := by decide

/-- 56d2: nibbles fold back to 22226; digit sum 26 ≡ 22226 (mod 15). -/
theorem enumeration_hex4_56d2 : reassembles 22226 = true ∧ castsFifteens 22226 = true := by decide

/-- 56d3: nibbles fold back to 22227; digit sum 27 ≡ 22227 (mod 15). -/
theorem enumeration_hex4_56d3 : reassembles 22227 = true ∧ castsFifteens 22227 = true := by decide

/-- 56d4: nibbles fold back to 22228; digit sum 28 ≡ 22228 (mod 15). -/
theorem enumeration_hex4_56d4 : reassembles 22228 = true ∧ castsFifteens 22228 = true := by decide

/-- 56d5: nibbles fold back to 22229; digit sum 29 ≡ 22229 (mod 15). -/
theorem enumeration_hex4_56d5 : reassembles 22229 = true ∧ castsFifteens 22229 = true := by decide

/-- 56d6: nibbles fold back to 22230; digit sum 30 ≡ 22230 (mod 15). -/
theorem enumeration_hex4_56d6 : reassembles 22230 = true ∧ castsFifteens 22230 = true := by decide

/-- 56d7: nibbles fold back to 22231; digit sum 31 ≡ 22231 (mod 15). -/
theorem enumeration_hex4_56d7 : reassembles 22231 = true ∧ castsFifteens 22231 = true := by decide

/-- 56d8: nibbles fold back to 22232; digit sum 32 ≡ 22232 (mod 15). -/
theorem enumeration_hex4_56d8 : reassembles 22232 = true ∧ castsFifteens 22232 = true := by decide

/-- 56d9: nibbles fold back to 22233; digit sum 33 ≡ 22233 (mod 15). -/
theorem enumeration_hex4_56d9 : reassembles 22233 = true ∧ castsFifteens 22233 = true := by decide

/-- 56da: nibbles fold back to 22234; digit sum 34 ≡ 22234 (mod 15). -/
theorem enumeration_hex4_56da : reassembles 22234 = true ∧ castsFifteens 22234 = true := by decide

/-- 56db: nibbles fold back to 22235; digit sum 35 ≡ 22235 (mod 15). -/
theorem enumeration_hex4_56db : reassembles 22235 = true ∧ castsFifteens 22235 = true := by decide

/-- 56dc: nibbles fold back to 22236; digit sum 36 ≡ 22236 (mod 15). -/
theorem enumeration_hex4_56dc : reassembles 22236 = true ∧ castsFifteens 22236 = true := by decide

/-- 56dd: nibbles fold back to 22237; digit sum 37 ≡ 22237 (mod 15). -/
theorem enumeration_hex4_56dd : reassembles 22237 = true ∧ castsFifteens 22237 = true := by decide

/-- 56de: nibbles fold back to 22238; digit sum 38 ≡ 22238 (mod 15). -/
theorem enumeration_hex4_56de : reassembles 22238 = true ∧ castsFifteens 22238 = true := by decide

/-- 56df: nibbles fold back to 22239; digit sum 39 ≡ 22239 (mod 15). -/
theorem enumeration_hex4_56df : reassembles 22239 = true ∧ castsFifteens 22239 = true := by decide

/-- 56e0: nibbles fold back to 22240; digit sum 25 ≡ 22240 (mod 15). -/
theorem enumeration_hex4_56e0 : reassembles 22240 = true ∧ castsFifteens 22240 = true := by decide

/-- 56e1: nibbles fold back to 22241; digit sum 26 ≡ 22241 (mod 15). -/
theorem enumeration_hex4_56e1 : reassembles 22241 = true ∧ castsFifteens 22241 = true := by decide

/-- 56e2: nibbles fold back to 22242; digit sum 27 ≡ 22242 (mod 15). -/
theorem enumeration_hex4_56e2 : reassembles 22242 = true ∧ castsFifteens 22242 = true := by decide

/-- 56e3: nibbles fold back to 22243; digit sum 28 ≡ 22243 (mod 15). -/
theorem enumeration_hex4_56e3 : reassembles 22243 = true ∧ castsFifteens 22243 = true := by decide

/-- 56e4: nibbles fold back to 22244; digit sum 29 ≡ 22244 (mod 15). -/
theorem enumeration_hex4_56e4 : reassembles 22244 = true ∧ castsFifteens 22244 = true := by decide

/-- 56e5: nibbles fold back to 22245; digit sum 30 ≡ 22245 (mod 15). -/
theorem enumeration_hex4_56e5 : reassembles 22245 = true ∧ castsFifteens 22245 = true := by decide

/-- 56e6: nibbles fold back to 22246; digit sum 31 ≡ 22246 (mod 15). -/
theorem enumeration_hex4_56e6 : reassembles 22246 = true ∧ castsFifteens 22246 = true := by decide

/-- 56e7: nibbles fold back to 22247; digit sum 32 ≡ 22247 (mod 15). -/
theorem enumeration_hex4_56e7 : reassembles 22247 = true ∧ castsFifteens 22247 = true := by decide

/-- 56e8: nibbles fold back to 22248; digit sum 33 ≡ 22248 (mod 15). -/
theorem enumeration_hex4_56e8 : reassembles 22248 = true ∧ castsFifteens 22248 = true := by decide

/-- 56e9: nibbles fold back to 22249; digit sum 34 ≡ 22249 (mod 15). -/
theorem enumeration_hex4_56e9 : reassembles 22249 = true ∧ castsFifteens 22249 = true := by decide

/-- 56ea: nibbles fold back to 22250; digit sum 35 ≡ 22250 (mod 15). -/
theorem enumeration_hex4_56ea : reassembles 22250 = true ∧ castsFifteens 22250 = true := by decide

/-- 56eb: nibbles fold back to 22251; digit sum 36 ≡ 22251 (mod 15). -/
theorem enumeration_hex4_56eb : reassembles 22251 = true ∧ castsFifteens 22251 = true := by decide

/-- 56ec: nibbles fold back to 22252; digit sum 37 ≡ 22252 (mod 15). -/
theorem enumeration_hex4_56ec : reassembles 22252 = true ∧ castsFifteens 22252 = true := by decide

/-- 56ed: nibbles fold back to 22253; digit sum 38 ≡ 22253 (mod 15). -/
theorem enumeration_hex4_56ed : reassembles 22253 = true ∧ castsFifteens 22253 = true := by decide

/-- 56ee: nibbles fold back to 22254; digit sum 39 ≡ 22254 (mod 15). -/
theorem enumeration_hex4_56ee : reassembles 22254 = true ∧ castsFifteens 22254 = true := by decide

/-- 56ef: nibbles fold back to 22255; digit sum 40 ≡ 22255 (mod 15). -/
theorem enumeration_hex4_56ef : reassembles 22255 = true ∧ castsFifteens 22255 = true := by decide

/-- 56f0: nibbles fold back to 22256; digit sum 26 ≡ 22256 (mod 15). -/
theorem enumeration_hex4_56f0 : reassembles 22256 = true ∧ castsFifteens 22256 = true := by decide

/-- 56f1: nibbles fold back to 22257; digit sum 27 ≡ 22257 (mod 15). -/
theorem enumeration_hex4_56f1 : reassembles 22257 = true ∧ castsFifteens 22257 = true := by decide

/-- 56f2: nibbles fold back to 22258; digit sum 28 ≡ 22258 (mod 15). -/
theorem enumeration_hex4_56f2 : reassembles 22258 = true ∧ castsFifteens 22258 = true := by decide

/-- 56f3: nibbles fold back to 22259; digit sum 29 ≡ 22259 (mod 15). -/
theorem enumeration_hex4_56f3 : reassembles 22259 = true ∧ castsFifteens 22259 = true := by decide

/-- 56f4: nibbles fold back to 22260; digit sum 30 ≡ 22260 (mod 15). -/
theorem enumeration_hex4_56f4 : reassembles 22260 = true ∧ castsFifteens 22260 = true := by decide

/-- 56f5: nibbles fold back to 22261; digit sum 31 ≡ 22261 (mod 15). -/
theorem enumeration_hex4_56f5 : reassembles 22261 = true ∧ castsFifteens 22261 = true := by decide

/-- 56f6: nibbles fold back to 22262; digit sum 32 ≡ 22262 (mod 15). -/
theorem enumeration_hex4_56f6 : reassembles 22262 = true ∧ castsFifteens 22262 = true := by decide

/-- 56f7: nibbles fold back to 22263; digit sum 33 ≡ 22263 (mod 15). -/
theorem enumeration_hex4_56f7 : reassembles 22263 = true ∧ castsFifteens 22263 = true := by decide

/-- 56f8: nibbles fold back to 22264; digit sum 34 ≡ 22264 (mod 15). -/
theorem enumeration_hex4_56f8 : reassembles 22264 = true ∧ castsFifteens 22264 = true := by decide

/-- 56f9: nibbles fold back to 22265; digit sum 35 ≡ 22265 (mod 15). -/
theorem enumeration_hex4_56f9 : reassembles 22265 = true ∧ castsFifteens 22265 = true := by decide

/-- 56fa: nibbles fold back to 22266; digit sum 36 ≡ 22266 (mod 15). -/
theorem enumeration_hex4_56fa : reassembles 22266 = true ∧ castsFifteens 22266 = true := by decide

/-- 56fb: nibbles fold back to 22267; digit sum 37 ≡ 22267 (mod 15). -/
theorem enumeration_hex4_56fb : reassembles 22267 = true ∧ castsFifteens 22267 = true := by decide

/-- 56fc: nibbles fold back to 22268; digit sum 38 ≡ 22268 (mod 15). -/
theorem enumeration_hex4_56fc : reassembles 22268 = true ∧ castsFifteens 22268 = true := by decide

/-- 56fd: nibbles fold back to 22269; digit sum 39 ≡ 22269 (mod 15). -/
theorem enumeration_hex4_56fd : reassembles 22269 = true ∧ castsFifteens 22269 = true := by decide

/-- 56fe: nibbles fold back to 22270; digit sum 40 ≡ 22270 (mod 15). -/
theorem enumeration_hex4_56fe : reassembles 22270 = true ∧ castsFifteens 22270 = true := by decide

/-- 56ff: nibbles fold back to 22271; digit sum 41 ≡ 22271 (mod 15). -/
theorem enumeration_hex4_56ff : reassembles 22271 = true ∧ castsFifteens 22271 = true := by decide

/-- 5700: nibbles fold back to 22272; digit sum 12 ≡ 22272 (mod 15). -/
theorem enumeration_hex4_5700 : reassembles 22272 = true ∧ castsFifteens 22272 = true := by decide

/-- 5701: nibbles fold back to 22273; digit sum 13 ≡ 22273 (mod 15). -/
theorem enumeration_hex4_5701 : reassembles 22273 = true ∧ castsFifteens 22273 = true := by decide

/-- 5702: nibbles fold back to 22274; digit sum 14 ≡ 22274 (mod 15). -/
theorem enumeration_hex4_5702 : reassembles 22274 = true ∧ castsFifteens 22274 = true := by decide

/-- 5703: nibbles fold back to 22275; digit sum 15 ≡ 22275 (mod 15). -/
theorem enumeration_hex4_5703 : reassembles 22275 = true ∧ castsFifteens 22275 = true := by decide

/-- 5704: nibbles fold back to 22276; digit sum 16 ≡ 22276 (mod 15). -/
theorem enumeration_hex4_5704 : reassembles 22276 = true ∧ castsFifteens 22276 = true := by decide

/-- 5705: nibbles fold back to 22277; digit sum 17 ≡ 22277 (mod 15). -/
theorem enumeration_hex4_5705 : reassembles 22277 = true ∧ castsFifteens 22277 = true := by decide

/-- 5706: nibbles fold back to 22278; digit sum 18 ≡ 22278 (mod 15). -/
theorem enumeration_hex4_5706 : reassembles 22278 = true ∧ castsFifteens 22278 = true := by decide

/-- 5707: nibbles fold back to 22279; digit sum 19 ≡ 22279 (mod 15). -/
theorem enumeration_hex4_5707 : reassembles 22279 = true ∧ castsFifteens 22279 = true := by decide

/-- 5708: nibbles fold back to 22280; digit sum 20 ≡ 22280 (mod 15). -/
theorem enumeration_hex4_5708 : reassembles 22280 = true ∧ castsFifteens 22280 = true := by decide

/-- 5709: nibbles fold back to 22281; digit sum 21 ≡ 22281 (mod 15). -/
theorem enumeration_hex4_5709 : reassembles 22281 = true ∧ castsFifteens 22281 = true := by decide

/-- 570a: nibbles fold back to 22282; digit sum 22 ≡ 22282 (mod 15). -/
theorem enumeration_hex4_570a : reassembles 22282 = true ∧ castsFifteens 22282 = true := by decide

/-- 570b: nibbles fold back to 22283; digit sum 23 ≡ 22283 (mod 15). -/
theorem enumeration_hex4_570b : reassembles 22283 = true ∧ castsFifteens 22283 = true := by decide

/-- 570c: nibbles fold back to 22284; digit sum 24 ≡ 22284 (mod 15). -/
theorem enumeration_hex4_570c : reassembles 22284 = true ∧ castsFifteens 22284 = true := by decide

/-- 570d: nibbles fold back to 22285; digit sum 25 ≡ 22285 (mod 15). -/
theorem enumeration_hex4_570d : reassembles 22285 = true ∧ castsFifteens 22285 = true := by decide

/-- 570e: nibbles fold back to 22286; digit sum 26 ≡ 22286 (mod 15). -/
theorem enumeration_hex4_570e : reassembles 22286 = true ∧ castsFifteens 22286 = true := by decide

/-- 570f: nibbles fold back to 22287; digit sum 27 ≡ 22287 (mod 15). -/
theorem enumeration_hex4_570f : reassembles 22287 = true ∧ castsFifteens 22287 = true := by decide

/-- 5710: nibbles fold back to 22288; digit sum 13 ≡ 22288 (mod 15). -/
theorem enumeration_hex4_5710 : reassembles 22288 = true ∧ castsFifteens 22288 = true := by decide

/-- 5711: nibbles fold back to 22289; digit sum 14 ≡ 22289 (mod 15). -/
theorem enumeration_hex4_5711 : reassembles 22289 = true ∧ castsFifteens 22289 = true := by decide

/-- 5712: nibbles fold back to 22290; digit sum 15 ≡ 22290 (mod 15). -/
theorem enumeration_hex4_5712 : reassembles 22290 = true ∧ castsFifteens 22290 = true := by decide

/-- 5713: nibbles fold back to 22291; digit sum 16 ≡ 22291 (mod 15). -/
theorem enumeration_hex4_5713 : reassembles 22291 = true ∧ castsFifteens 22291 = true := by decide

/-- 5714: nibbles fold back to 22292; digit sum 17 ≡ 22292 (mod 15). -/
theorem enumeration_hex4_5714 : reassembles 22292 = true ∧ castsFifteens 22292 = true := by decide

/-- 5715: nibbles fold back to 22293; digit sum 18 ≡ 22293 (mod 15). -/
theorem enumeration_hex4_5715 : reassembles 22293 = true ∧ castsFifteens 22293 = true := by decide

/-- 5716: nibbles fold back to 22294; digit sum 19 ≡ 22294 (mod 15). -/
theorem enumeration_hex4_5716 : reassembles 22294 = true ∧ castsFifteens 22294 = true := by decide

/-- 5717: nibbles fold back to 22295; digit sum 20 ≡ 22295 (mod 15). -/
theorem enumeration_hex4_5717 : reassembles 22295 = true ∧ castsFifteens 22295 = true := by decide

/-- 5718: nibbles fold back to 22296; digit sum 21 ≡ 22296 (mod 15). -/
theorem enumeration_hex4_5718 : reassembles 22296 = true ∧ castsFifteens 22296 = true := by decide

/-- 5719: nibbles fold back to 22297; digit sum 22 ≡ 22297 (mod 15). -/
theorem enumeration_hex4_5719 : reassembles 22297 = true ∧ castsFifteens 22297 = true := by decide

/-- 571a: nibbles fold back to 22298; digit sum 23 ≡ 22298 (mod 15). -/
theorem enumeration_hex4_571a : reassembles 22298 = true ∧ castsFifteens 22298 = true := by decide

/-- 571b: nibbles fold back to 22299; digit sum 24 ≡ 22299 (mod 15). -/
theorem enumeration_hex4_571b : reassembles 22299 = true ∧ castsFifteens 22299 = true := by decide

/-- 571c: nibbles fold back to 22300; digit sum 25 ≡ 22300 (mod 15). -/
theorem enumeration_hex4_571c : reassembles 22300 = true ∧ castsFifteens 22300 = true := by decide

/-- 571d: nibbles fold back to 22301; digit sum 26 ≡ 22301 (mod 15). -/
theorem enumeration_hex4_571d : reassembles 22301 = true ∧ castsFifteens 22301 = true := by decide

/-- 571e: nibbles fold back to 22302; digit sum 27 ≡ 22302 (mod 15). -/
theorem enumeration_hex4_571e : reassembles 22302 = true ∧ castsFifteens 22302 = true := by decide

/-- 571f: nibbles fold back to 22303; digit sum 28 ≡ 22303 (mod 15). -/
theorem enumeration_hex4_571f : reassembles 22303 = true ∧ castsFifteens 22303 = true := by decide

/-- 5720: nibbles fold back to 22304; digit sum 14 ≡ 22304 (mod 15). -/
theorem enumeration_hex4_5720 : reassembles 22304 = true ∧ castsFifteens 22304 = true := by decide

/-- 5721: nibbles fold back to 22305; digit sum 15 ≡ 22305 (mod 15). -/
theorem enumeration_hex4_5721 : reassembles 22305 = true ∧ castsFifteens 22305 = true := by decide

/-- 5722: nibbles fold back to 22306; digit sum 16 ≡ 22306 (mod 15). -/
theorem enumeration_hex4_5722 : reassembles 22306 = true ∧ castsFifteens 22306 = true := by decide

/-- 5723: nibbles fold back to 22307; digit sum 17 ≡ 22307 (mod 15). -/
theorem enumeration_hex4_5723 : reassembles 22307 = true ∧ castsFifteens 22307 = true := by decide

/-- 5724: nibbles fold back to 22308; digit sum 18 ≡ 22308 (mod 15). -/
theorem enumeration_hex4_5724 : reassembles 22308 = true ∧ castsFifteens 22308 = true := by decide

/-- 5725: nibbles fold back to 22309; digit sum 19 ≡ 22309 (mod 15). -/
theorem enumeration_hex4_5725 : reassembles 22309 = true ∧ castsFifteens 22309 = true := by decide

/-- 5726: nibbles fold back to 22310; digit sum 20 ≡ 22310 (mod 15). -/
theorem enumeration_hex4_5726 : reassembles 22310 = true ∧ castsFifteens 22310 = true := by decide

/-- 5727: nibbles fold back to 22311; digit sum 21 ≡ 22311 (mod 15). -/
theorem enumeration_hex4_5727 : reassembles 22311 = true ∧ castsFifteens 22311 = true := by decide

/-- 5728: nibbles fold back to 22312; digit sum 22 ≡ 22312 (mod 15). -/
theorem enumeration_hex4_5728 : reassembles 22312 = true ∧ castsFifteens 22312 = true := by decide

/-- 5729: nibbles fold back to 22313; digit sum 23 ≡ 22313 (mod 15). -/
theorem enumeration_hex4_5729 : reassembles 22313 = true ∧ castsFifteens 22313 = true := by decide

/-- 572a: nibbles fold back to 22314; digit sum 24 ≡ 22314 (mod 15). -/
theorem enumeration_hex4_572a : reassembles 22314 = true ∧ castsFifteens 22314 = true := by decide

/-- 572b: nibbles fold back to 22315; digit sum 25 ≡ 22315 (mod 15). -/
theorem enumeration_hex4_572b : reassembles 22315 = true ∧ castsFifteens 22315 = true := by decide

/-- 572c: nibbles fold back to 22316; digit sum 26 ≡ 22316 (mod 15). -/
theorem enumeration_hex4_572c : reassembles 22316 = true ∧ castsFifteens 22316 = true := by decide

/-- 572d: nibbles fold back to 22317; digit sum 27 ≡ 22317 (mod 15). -/
theorem enumeration_hex4_572d : reassembles 22317 = true ∧ castsFifteens 22317 = true := by decide

/-- 572e: nibbles fold back to 22318; digit sum 28 ≡ 22318 (mod 15). -/
theorem enumeration_hex4_572e : reassembles 22318 = true ∧ castsFifteens 22318 = true := by decide

/-- 572f: nibbles fold back to 22319; digit sum 29 ≡ 22319 (mod 15). -/
theorem enumeration_hex4_572f : reassembles 22319 = true ∧ castsFifteens 22319 = true := by decide

/-- 5730: nibbles fold back to 22320; digit sum 15 ≡ 22320 (mod 15). -/
theorem enumeration_hex4_5730 : reassembles 22320 = true ∧ castsFifteens 22320 = true := by decide

/-- 5731: nibbles fold back to 22321; digit sum 16 ≡ 22321 (mod 15). -/
theorem enumeration_hex4_5731 : reassembles 22321 = true ∧ castsFifteens 22321 = true := by decide

/-- 5732: nibbles fold back to 22322; digit sum 17 ≡ 22322 (mod 15). -/
theorem enumeration_hex4_5732 : reassembles 22322 = true ∧ castsFifteens 22322 = true := by decide

/-- 5733: nibbles fold back to 22323; digit sum 18 ≡ 22323 (mod 15). -/
theorem enumeration_hex4_5733 : reassembles 22323 = true ∧ castsFifteens 22323 = true := by decide

/-- 5734: nibbles fold back to 22324; digit sum 19 ≡ 22324 (mod 15). -/
theorem enumeration_hex4_5734 : reassembles 22324 = true ∧ castsFifteens 22324 = true := by decide

/-- 5735: nibbles fold back to 22325; digit sum 20 ≡ 22325 (mod 15). -/
theorem enumeration_hex4_5735 : reassembles 22325 = true ∧ castsFifteens 22325 = true := by decide

/-- 5736: nibbles fold back to 22326; digit sum 21 ≡ 22326 (mod 15). -/
theorem enumeration_hex4_5736 : reassembles 22326 = true ∧ castsFifteens 22326 = true := by decide

/-- 5737: nibbles fold back to 22327; digit sum 22 ≡ 22327 (mod 15). -/
theorem enumeration_hex4_5737 : reassembles 22327 = true ∧ castsFifteens 22327 = true := by decide

/-- 5738: nibbles fold back to 22328; digit sum 23 ≡ 22328 (mod 15). -/
theorem enumeration_hex4_5738 : reassembles 22328 = true ∧ castsFifteens 22328 = true := by decide

/-- 5739: nibbles fold back to 22329; digit sum 24 ≡ 22329 (mod 15). -/
theorem enumeration_hex4_5739 : reassembles 22329 = true ∧ castsFifteens 22329 = true := by decide

/-- 573a: nibbles fold back to 22330; digit sum 25 ≡ 22330 (mod 15). -/
theorem enumeration_hex4_573a : reassembles 22330 = true ∧ castsFifteens 22330 = true := by decide

/-- 573b: nibbles fold back to 22331; digit sum 26 ≡ 22331 (mod 15). -/
theorem enumeration_hex4_573b : reassembles 22331 = true ∧ castsFifteens 22331 = true := by decide

/-- 573c: nibbles fold back to 22332; digit sum 27 ≡ 22332 (mod 15). -/
theorem enumeration_hex4_573c : reassembles 22332 = true ∧ castsFifteens 22332 = true := by decide

/-- 573d: nibbles fold back to 22333; digit sum 28 ≡ 22333 (mod 15). -/
theorem enumeration_hex4_573d : reassembles 22333 = true ∧ castsFifteens 22333 = true := by decide

/-- 573e: nibbles fold back to 22334; digit sum 29 ≡ 22334 (mod 15). -/
theorem enumeration_hex4_573e : reassembles 22334 = true ∧ castsFifteens 22334 = true := by decide

/-- 573f: nibbles fold back to 22335; digit sum 30 ≡ 22335 (mod 15). -/
theorem enumeration_hex4_573f : reassembles 22335 = true ∧ castsFifteens 22335 = true := by decide

/-- 5740: nibbles fold back to 22336; digit sum 16 ≡ 22336 (mod 15). -/
theorem enumeration_hex4_5740 : reassembles 22336 = true ∧ castsFifteens 22336 = true := by decide

/-- 5741: nibbles fold back to 22337; digit sum 17 ≡ 22337 (mod 15). -/
theorem enumeration_hex4_5741 : reassembles 22337 = true ∧ castsFifteens 22337 = true := by decide

/-- 5742: nibbles fold back to 22338; digit sum 18 ≡ 22338 (mod 15). -/
theorem enumeration_hex4_5742 : reassembles 22338 = true ∧ castsFifteens 22338 = true := by decide

/-- 5743: nibbles fold back to 22339; digit sum 19 ≡ 22339 (mod 15). -/
theorem enumeration_hex4_5743 : reassembles 22339 = true ∧ castsFifteens 22339 = true := by decide

/-- 5744: nibbles fold back to 22340; digit sum 20 ≡ 22340 (mod 15). -/
theorem enumeration_hex4_5744 : reassembles 22340 = true ∧ castsFifteens 22340 = true := by decide

/-- 5745: nibbles fold back to 22341; digit sum 21 ≡ 22341 (mod 15). -/
theorem enumeration_hex4_5745 : reassembles 22341 = true ∧ castsFifteens 22341 = true := by decide

/-- 5746: nibbles fold back to 22342; digit sum 22 ≡ 22342 (mod 15). -/
theorem enumeration_hex4_5746 : reassembles 22342 = true ∧ castsFifteens 22342 = true := by decide

/-- 5747: nibbles fold back to 22343; digit sum 23 ≡ 22343 (mod 15). -/
theorem enumeration_hex4_5747 : reassembles 22343 = true ∧ castsFifteens 22343 = true := by decide

/-- 5748: nibbles fold back to 22344; digit sum 24 ≡ 22344 (mod 15). -/
theorem enumeration_hex4_5748 : reassembles 22344 = true ∧ castsFifteens 22344 = true := by decide

/-- 5749: nibbles fold back to 22345; digit sum 25 ≡ 22345 (mod 15). -/
theorem enumeration_hex4_5749 : reassembles 22345 = true ∧ castsFifteens 22345 = true := by decide

/-- 574a: nibbles fold back to 22346; digit sum 26 ≡ 22346 (mod 15). -/
theorem enumeration_hex4_574a : reassembles 22346 = true ∧ castsFifteens 22346 = true := by decide

/-- 574b: nibbles fold back to 22347; digit sum 27 ≡ 22347 (mod 15). -/
theorem enumeration_hex4_574b : reassembles 22347 = true ∧ castsFifteens 22347 = true := by decide

/-- 574c: nibbles fold back to 22348; digit sum 28 ≡ 22348 (mod 15). -/
theorem enumeration_hex4_574c : reassembles 22348 = true ∧ castsFifteens 22348 = true := by decide

/-- 574d: nibbles fold back to 22349; digit sum 29 ≡ 22349 (mod 15). -/
theorem enumeration_hex4_574d : reassembles 22349 = true ∧ castsFifteens 22349 = true := by decide

/-- 574e: nibbles fold back to 22350; digit sum 30 ≡ 22350 (mod 15). -/
theorem enumeration_hex4_574e : reassembles 22350 = true ∧ castsFifteens 22350 = true := by decide

/-- 574f: nibbles fold back to 22351; digit sum 31 ≡ 22351 (mod 15). -/
theorem enumeration_hex4_574f : reassembles 22351 = true ∧ castsFifteens 22351 = true := by decide

/-- 5750: nibbles fold back to 22352; digit sum 17 ≡ 22352 (mod 15). -/
theorem enumeration_hex4_5750 : reassembles 22352 = true ∧ castsFifteens 22352 = true := by decide

/-- 5751: nibbles fold back to 22353; digit sum 18 ≡ 22353 (mod 15). -/
theorem enumeration_hex4_5751 : reassembles 22353 = true ∧ castsFifteens 22353 = true := by decide

/-- 5752: nibbles fold back to 22354; digit sum 19 ≡ 22354 (mod 15). -/
theorem enumeration_hex4_5752 : reassembles 22354 = true ∧ castsFifteens 22354 = true := by decide

/-- 5753: nibbles fold back to 22355; digit sum 20 ≡ 22355 (mod 15). -/
theorem enumeration_hex4_5753 : reassembles 22355 = true ∧ castsFifteens 22355 = true := by decide

/-- 5754: nibbles fold back to 22356; digit sum 21 ≡ 22356 (mod 15). -/
theorem enumeration_hex4_5754 : reassembles 22356 = true ∧ castsFifteens 22356 = true := by decide

/-- 5755: nibbles fold back to 22357; digit sum 22 ≡ 22357 (mod 15). -/
theorem enumeration_hex4_5755 : reassembles 22357 = true ∧ castsFifteens 22357 = true := by decide

/-- 5756: nibbles fold back to 22358; digit sum 23 ≡ 22358 (mod 15). -/
theorem enumeration_hex4_5756 : reassembles 22358 = true ∧ castsFifteens 22358 = true := by decide

/-- 5757: nibbles fold back to 22359; digit sum 24 ≡ 22359 (mod 15). -/
theorem enumeration_hex4_5757 : reassembles 22359 = true ∧ castsFifteens 22359 = true := by decide

/-- 5758: nibbles fold back to 22360; digit sum 25 ≡ 22360 (mod 15). -/
theorem enumeration_hex4_5758 : reassembles 22360 = true ∧ castsFifteens 22360 = true := by decide

/-- 5759: nibbles fold back to 22361; digit sum 26 ≡ 22361 (mod 15). -/
theorem enumeration_hex4_5759 : reassembles 22361 = true ∧ castsFifteens 22361 = true := by decide

/-- 575a: nibbles fold back to 22362; digit sum 27 ≡ 22362 (mod 15). -/
theorem enumeration_hex4_575a : reassembles 22362 = true ∧ castsFifteens 22362 = true := by decide

/-- 575b: nibbles fold back to 22363; digit sum 28 ≡ 22363 (mod 15). -/
theorem enumeration_hex4_575b : reassembles 22363 = true ∧ castsFifteens 22363 = true := by decide

/-- 575c: nibbles fold back to 22364; digit sum 29 ≡ 22364 (mod 15). -/
theorem enumeration_hex4_575c : reassembles 22364 = true ∧ castsFifteens 22364 = true := by decide

/-- 575d: nibbles fold back to 22365; digit sum 30 ≡ 22365 (mod 15). -/
theorem enumeration_hex4_575d : reassembles 22365 = true ∧ castsFifteens 22365 = true := by decide

/-- 575e: nibbles fold back to 22366; digit sum 31 ≡ 22366 (mod 15). -/
theorem enumeration_hex4_575e : reassembles 22366 = true ∧ castsFifteens 22366 = true := by decide

/-- 575f: nibbles fold back to 22367; digit sum 32 ≡ 22367 (mod 15). -/
theorem enumeration_hex4_575f : reassembles 22367 = true ∧ castsFifteens 22367 = true := by decide

/-- 5760: nibbles fold back to 22368; digit sum 18 ≡ 22368 (mod 15). -/
theorem enumeration_hex4_5760 : reassembles 22368 = true ∧ castsFifteens 22368 = true := by decide

/-- 5761: nibbles fold back to 22369; digit sum 19 ≡ 22369 (mod 15). -/
theorem enumeration_hex4_5761 : reassembles 22369 = true ∧ castsFifteens 22369 = true := by decide

/-- 5762: nibbles fold back to 22370; digit sum 20 ≡ 22370 (mod 15). -/
theorem enumeration_hex4_5762 : reassembles 22370 = true ∧ castsFifteens 22370 = true := by decide

/-- 5763: nibbles fold back to 22371; digit sum 21 ≡ 22371 (mod 15). -/
theorem enumeration_hex4_5763 : reassembles 22371 = true ∧ castsFifteens 22371 = true := by decide

/-- 5764: nibbles fold back to 22372; digit sum 22 ≡ 22372 (mod 15). -/
theorem enumeration_hex4_5764 : reassembles 22372 = true ∧ castsFifteens 22372 = true := by decide

/-- 5765: nibbles fold back to 22373; digit sum 23 ≡ 22373 (mod 15). -/
theorem enumeration_hex4_5765 : reassembles 22373 = true ∧ castsFifteens 22373 = true := by decide

/-- 5766: nibbles fold back to 22374; digit sum 24 ≡ 22374 (mod 15). -/
theorem enumeration_hex4_5766 : reassembles 22374 = true ∧ castsFifteens 22374 = true := by decide

/-- 5767: nibbles fold back to 22375; digit sum 25 ≡ 22375 (mod 15). -/
theorem enumeration_hex4_5767 : reassembles 22375 = true ∧ castsFifteens 22375 = true := by decide

/-- 5768: nibbles fold back to 22376; digit sum 26 ≡ 22376 (mod 15). -/
theorem enumeration_hex4_5768 : reassembles 22376 = true ∧ castsFifteens 22376 = true := by decide

/-- 5769: nibbles fold back to 22377; digit sum 27 ≡ 22377 (mod 15). -/
theorem enumeration_hex4_5769 : reassembles 22377 = true ∧ castsFifteens 22377 = true := by decide

/-- 576a: nibbles fold back to 22378; digit sum 28 ≡ 22378 (mod 15). -/
theorem enumeration_hex4_576a : reassembles 22378 = true ∧ castsFifteens 22378 = true := by decide

/-- 576b: nibbles fold back to 22379; digit sum 29 ≡ 22379 (mod 15). -/
theorem enumeration_hex4_576b : reassembles 22379 = true ∧ castsFifteens 22379 = true := by decide

/-- 576c: nibbles fold back to 22380; digit sum 30 ≡ 22380 (mod 15). -/
theorem enumeration_hex4_576c : reassembles 22380 = true ∧ castsFifteens 22380 = true := by decide

/-- 576d: nibbles fold back to 22381; digit sum 31 ≡ 22381 (mod 15). -/
theorem enumeration_hex4_576d : reassembles 22381 = true ∧ castsFifteens 22381 = true := by decide

/-- 576e: nibbles fold back to 22382; digit sum 32 ≡ 22382 (mod 15). -/
theorem enumeration_hex4_576e : reassembles 22382 = true ∧ castsFifteens 22382 = true := by decide

/-- 576f: nibbles fold back to 22383; digit sum 33 ≡ 22383 (mod 15). -/
theorem enumeration_hex4_576f : reassembles 22383 = true ∧ castsFifteens 22383 = true := by decide

/-- 5770: nibbles fold back to 22384; digit sum 19 ≡ 22384 (mod 15). -/
theorem enumeration_hex4_5770 : reassembles 22384 = true ∧ castsFifteens 22384 = true := by decide

/-- 5771: nibbles fold back to 22385; digit sum 20 ≡ 22385 (mod 15). -/
theorem enumeration_hex4_5771 : reassembles 22385 = true ∧ castsFifteens 22385 = true := by decide

/-- 5772: nibbles fold back to 22386; digit sum 21 ≡ 22386 (mod 15). -/
theorem enumeration_hex4_5772 : reassembles 22386 = true ∧ castsFifteens 22386 = true := by decide

/-- 5773: nibbles fold back to 22387; digit sum 22 ≡ 22387 (mod 15). -/
theorem enumeration_hex4_5773 : reassembles 22387 = true ∧ castsFifteens 22387 = true := by decide

/-- 5774: nibbles fold back to 22388; digit sum 23 ≡ 22388 (mod 15). -/
theorem enumeration_hex4_5774 : reassembles 22388 = true ∧ castsFifteens 22388 = true := by decide

/-- 5775: nibbles fold back to 22389; digit sum 24 ≡ 22389 (mod 15). -/
theorem enumeration_hex4_5775 : reassembles 22389 = true ∧ castsFifteens 22389 = true := by decide

/-- 5776: nibbles fold back to 22390; digit sum 25 ≡ 22390 (mod 15). -/
theorem enumeration_hex4_5776 : reassembles 22390 = true ∧ castsFifteens 22390 = true := by decide

/-- 5777: nibbles fold back to 22391; digit sum 26 ≡ 22391 (mod 15). -/
theorem enumeration_hex4_5777 : reassembles 22391 = true ∧ castsFifteens 22391 = true := by decide

/-- 5778: nibbles fold back to 22392; digit sum 27 ≡ 22392 (mod 15). -/
theorem enumeration_hex4_5778 : reassembles 22392 = true ∧ castsFifteens 22392 = true := by decide

/-- 5779: nibbles fold back to 22393; digit sum 28 ≡ 22393 (mod 15). -/
theorem enumeration_hex4_5779 : reassembles 22393 = true ∧ castsFifteens 22393 = true := by decide

/-- 577a: nibbles fold back to 22394; digit sum 29 ≡ 22394 (mod 15). -/
theorem enumeration_hex4_577a : reassembles 22394 = true ∧ castsFifteens 22394 = true := by decide

/-- 577b: nibbles fold back to 22395; digit sum 30 ≡ 22395 (mod 15). -/
theorem enumeration_hex4_577b : reassembles 22395 = true ∧ castsFifteens 22395 = true := by decide

/-- 577c: nibbles fold back to 22396; digit sum 31 ≡ 22396 (mod 15). -/
theorem enumeration_hex4_577c : reassembles 22396 = true ∧ castsFifteens 22396 = true := by decide

/-- 577d: nibbles fold back to 22397; digit sum 32 ≡ 22397 (mod 15). -/
theorem enumeration_hex4_577d : reassembles 22397 = true ∧ castsFifteens 22397 = true := by decide

/-- 577e: nibbles fold back to 22398; digit sum 33 ≡ 22398 (mod 15). -/
theorem enumeration_hex4_577e : reassembles 22398 = true ∧ castsFifteens 22398 = true := by decide

/-- 577f: nibbles fold back to 22399; digit sum 34 ≡ 22399 (mod 15). -/
theorem enumeration_hex4_577f : reassembles 22399 = true ∧ castsFifteens 22399 = true := by decide

/-- 5780: nibbles fold back to 22400; digit sum 20 ≡ 22400 (mod 15). -/
theorem enumeration_hex4_5780 : reassembles 22400 = true ∧ castsFifteens 22400 = true := by decide

/-- 5781: nibbles fold back to 22401; digit sum 21 ≡ 22401 (mod 15). -/
theorem enumeration_hex4_5781 : reassembles 22401 = true ∧ castsFifteens 22401 = true := by decide

/-- 5782: nibbles fold back to 22402; digit sum 22 ≡ 22402 (mod 15). -/
theorem enumeration_hex4_5782 : reassembles 22402 = true ∧ castsFifteens 22402 = true := by decide

/-- 5783: nibbles fold back to 22403; digit sum 23 ≡ 22403 (mod 15). -/
theorem enumeration_hex4_5783 : reassembles 22403 = true ∧ castsFifteens 22403 = true := by decide

/-- 5784: nibbles fold back to 22404; digit sum 24 ≡ 22404 (mod 15). -/
theorem enumeration_hex4_5784 : reassembles 22404 = true ∧ castsFifteens 22404 = true := by decide

/-- 5785: nibbles fold back to 22405; digit sum 25 ≡ 22405 (mod 15). -/
theorem enumeration_hex4_5785 : reassembles 22405 = true ∧ castsFifteens 22405 = true := by decide

/-- 5786: nibbles fold back to 22406; digit sum 26 ≡ 22406 (mod 15). -/
theorem enumeration_hex4_5786 : reassembles 22406 = true ∧ castsFifteens 22406 = true := by decide

/-- 5787: nibbles fold back to 22407; digit sum 27 ≡ 22407 (mod 15). -/
theorem enumeration_hex4_5787 : reassembles 22407 = true ∧ castsFifteens 22407 = true := by decide

/-- 5788: nibbles fold back to 22408; digit sum 28 ≡ 22408 (mod 15). -/
theorem enumeration_hex4_5788 : reassembles 22408 = true ∧ castsFifteens 22408 = true := by decide

/-- 5789: nibbles fold back to 22409; digit sum 29 ≡ 22409 (mod 15). -/
theorem enumeration_hex4_5789 : reassembles 22409 = true ∧ castsFifteens 22409 = true := by decide

/-- 578a: nibbles fold back to 22410; digit sum 30 ≡ 22410 (mod 15). -/
theorem enumeration_hex4_578a : reassembles 22410 = true ∧ castsFifteens 22410 = true := by decide

/-- 578b: nibbles fold back to 22411; digit sum 31 ≡ 22411 (mod 15). -/
theorem enumeration_hex4_578b : reassembles 22411 = true ∧ castsFifteens 22411 = true := by decide

/-- 578c: nibbles fold back to 22412; digit sum 32 ≡ 22412 (mod 15). -/
theorem enumeration_hex4_578c : reassembles 22412 = true ∧ castsFifteens 22412 = true := by decide

/-- 578d: nibbles fold back to 22413; digit sum 33 ≡ 22413 (mod 15). -/
theorem enumeration_hex4_578d : reassembles 22413 = true ∧ castsFifteens 22413 = true := by decide

/-- 578e: nibbles fold back to 22414; digit sum 34 ≡ 22414 (mod 15). -/
theorem enumeration_hex4_578e : reassembles 22414 = true ∧ castsFifteens 22414 = true := by decide

/-- 578f: nibbles fold back to 22415; digit sum 35 ≡ 22415 (mod 15). -/
theorem enumeration_hex4_578f : reassembles 22415 = true ∧ castsFifteens 22415 = true := by decide

/-- 5790: nibbles fold back to 22416; digit sum 21 ≡ 22416 (mod 15). -/
theorem enumeration_hex4_5790 : reassembles 22416 = true ∧ castsFifteens 22416 = true := by decide

/-- 5791: nibbles fold back to 22417; digit sum 22 ≡ 22417 (mod 15). -/
theorem enumeration_hex4_5791 : reassembles 22417 = true ∧ castsFifteens 22417 = true := by decide

/-- 5792: nibbles fold back to 22418; digit sum 23 ≡ 22418 (mod 15). -/
theorem enumeration_hex4_5792 : reassembles 22418 = true ∧ castsFifteens 22418 = true := by decide

/-- 5793: nibbles fold back to 22419; digit sum 24 ≡ 22419 (mod 15). -/
theorem enumeration_hex4_5793 : reassembles 22419 = true ∧ castsFifteens 22419 = true := by decide

/-- 5794: nibbles fold back to 22420; digit sum 25 ≡ 22420 (mod 15). -/
theorem enumeration_hex4_5794 : reassembles 22420 = true ∧ castsFifteens 22420 = true := by decide

/-- 5795: nibbles fold back to 22421; digit sum 26 ≡ 22421 (mod 15). -/
theorem enumeration_hex4_5795 : reassembles 22421 = true ∧ castsFifteens 22421 = true := by decide

/-- 5796: nibbles fold back to 22422; digit sum 27 ≡ 22422 (mod 15). -/
theorem enumeration_hex4_5796 : reassembles 22422 = true ∧ castsFifteens 22422 = true := by decide

/-- 5797: nibbles fold back to 22423; digit sum 28 ≡ 22423 (mod 15). -/
theorem enumeration_hex4_5797 : reassembles 22423 = true ∧ castsFifteens 22423 = true := by decide

/-- 5798: nibbles fold back to 22424; digit sum 29 ≡ 22424 (mod 15). -/
theorem enumeration_hex4_5798 : reassembles 22424 = true ∧ castsFifteens 22424 = true := by decide

/-- 5799: nibbles fold back to 22425; digit sum 30 ≡ 22425 (mod 15). -/
theorem enumeration_hex4_5799 : reassembles 22425 = true ∧ castsFifteens 22425 = true := by decide

/-- 579a: nibbles fold back to 22426; digit sum 31 ≡ 22426 (mod 15). -/
theorem enumeration_hex4_579a : reassembles 22426 = true ∧ castsFifteens 22426 = true := by decide

/-- 579b: nibbles fold back to 22427; digit sum 32 ≡ 22427 (mod 15). -/
theorem enumeration_hex4_579b : reassembles 22427 = true ∧ castsFifteens 22427 = true := by decide

/-- 579c: nibbles fold back to 22428; digit sum 33 ≡ 22428 (mod 15). -/
theorem enumeration_hex4_579c : reassembles 22428 = true ∧ castsFifteens 22428 = true := by decide

/-- 579d: nibbles fold back to 22429; digit sum 34 ≡ 22429 (mod 15). -/
theorem enumeration_hex4_579d : reassembles 22429 = true ∧ castsFifteens 22429 = true := by decide

/-- 579e: nibbles fold back to 22430; digit sum 35 ≡ 22430 (mod 15). -/
theorem enumeration_hex4_579e : reassembles 22430 = true ∧ castsFifteens 22430 = true := by decide

/-- 579f: nibbles fold back to 22431; digit sum 36 ≡ 22431 (mod 15). -/
theorem enumeration_hex4_579f : reassembles 22431 = true ∧ castsFifteens 22431 = true := by decide

/-- 57a0: nibbles fold back to 22432; digit sum 22 ≡ 22432 (mod 15). -/
theorem enumeration_hex4_57a0 : reassembles 22432 = true ∧ castsFifteens 22432 = true := by decide

/-- 57a1: nibbles fold back to 22433; digit sum 23 ≡ 22433 (mod 15). -/
theorem enumeration_hex4_57a1 : reassembles 22433 = true ∧ castsFifteens 22433 = true := by decide

/-- 57a2: nibbles fold back to 22434; digit sum 24 ≡ 22434 (mod 15). -/
theorem enumeration_hex4_57a2 : reassembles 22434 = true ∧ castsFifteens 22434 = true := by decide

/-- 57a3: nibbles fold back to 22435; digit sum 25 ≡ 22435 (mod 15). -/
theorem enumeration_hex4_57a3 : reassembles 22435 = true ∧ castsFifteens 22435 = true := by decide

/-- 57a4: nibbles fold back to 22436; digit sum 26 ≡ 22436 (mod 15). -/
theorem enumeration_hex4_57a4 : reassembles 22436 = true ∧ castsFifteens 22436 = true := by decide

/-- 57a5: nibbles fold back to 22437; digit sum 27 ≡ 22437 (mod 15). -/
theorem enumeration_hex4_57a5 : reassembles 22437 = true ∧ castsFifteens 22437 = true := by decide

/-- 57a6: nibbles fold back to 22438; digit sum 28 ≡ 22438 (mod 15). -/
theorem enumeration_hex4_57a6 : reassembles 22438 = true ∧ castsFifteens 22438 = true := by decide

/-- 57a7: nibbles fold back to 22439; digit sum 29 ≡ 22439 (mod 15). -/
theorem enumeration_hex4_57a7 : reassembles 22439 = true ∧ castsFifteens 22439 = true := by decide

/-- 57a8: nibbles fold back to 22440; digit sum 30 ≡ 22440 (mod 15). -/
theorem enumeration_hex4_57a8 : reassembles 22440 = true ∧ castsFifteens 22440 = true := by decide

/-- 57a9: nibbles fold back to 22441; digit sum 31 ≡ 22441 (mod 15). -/
theorem enumeration_hex4_57a9 : reassembles 22441 = true ∧ castsFifteens 22441 = true := by decide

/-- 57aa: nibbles fold back to 22442; digit sum 32 ≡ 22442 (mod 15). -/
theorem enumeration_hex4_57aa : reassembles 22442 = true ∧ castsFifteens 22442 = true := by decide

/-- 57ab: nibbles fold back to 22443; digit sum 33 ≡ 22443 (mod 15). -/
theorem enumeration_hex4_57ab : reassembles 22443 = true ∧ castsFifteens 22443 = true := by decide

/-- 57ac: nibbles fold back to 22444; digit sum 34 ≡ 22444 (mod 15). -/
theorem enumeration_hex4_57ac : reassembles 22444 = true ∧ castsFifteens 22444 = true := by decide

/-- 57ad: nibbles fold back to 22445; digit sum 35 ≡ 22445 (mod 15). -/
theorem enumeration_hex4_57ad : reassembles 22445 = true ∧ castsFifteens 22445 = true := by decide

/-- 57ae: nibbles fold back to 22446; digit sum 36 ≡ 22446 (mod 15). -/
theorem enumeration_hex4_57ae : reassembles 22446 = true ∧ castsFifteens 22446 = true := by decide

/-- 57af: nibbles fold back to 22447; digit sum 37 ≡ 22447 (mod 15). -/
theorem enumeration_hex4_57af : reassembles 22447 = true ∧ castsFifteens 22447 = true := by decide

/-- 57b0: nibbles fold back to 22448; digit sum 23 ≡ 22448 (mod 15). -/
theorem enumeration_hex4_57b0 : reassembles 22448 = true ∧ castsFifteens 22448 = true := by decide

/-- 57b1: nibbles fold back to 22449; digit sum 24 ≡ 22449 (mod 15). -/
theorem enumeration_hex4_57b1 : reassembles 22449 = true ∧ castsFifteens 22449 = true := by decide

/-- 57b2: nibbles fold back to 22450; digit sum 25 ≡ 22450 (mod 15). -/
theorem enumeration_hex4_57b2 : reassembles 22450 = true ∧ castsFifteens 22450 = true := by decide

/-- 57b3: nibbles fold back to 22451; digit sum 26 ≡ 22451 (mod 15). -/
theorem enumeration_hex4_57b3 : reassembles 22451 = true ∧ castsFifteens 22451 = true := by decide

/-- 57b4: nibbles fold back to 22452; digit sum 27 ≡ 22452 (mod 15). -/
theorem enumeration_hex4_57b4 : reassembles 22452 = true ∧ castsFifteens 22452 = true := by decide

/-- 57b5: nibbles fold back to 22453; digit sum 28 ≡ 22453 (mod 15). -/
theorem enumeration_hex4_57b5 : reassembles 22453 = true ∧ castsFifteens 22453 = true := by decide

/-- 57b6: nibbles fold back to 22454; digit sum 29 ≡ 22454 (mod 15). -/
theorem enumeration_hex4_57b6 : reassembles 22454 = true ∧ castsFifteens 22454 = true := by decide

/-- 57b7: nibbles fold back to 22455; digit sum 30 ≡ 22455 (mod 15). -/
theorem enumeration_hex4_57b7 : reassembles 22455 = true ∧ castsFifteens 22455 = true := by decide

/-- 57b8: nibbles fold back to 22456; digit sum 31 ≡ 22456 (mod 15). -/
theorem enumeration_hex4_57b8 : reassembles 22456 = true ∧ castsFifteens 22456 = true := by decide

/-- 57b9: nibbles fold back to 22457; digit sum 32 ≡ 22457 (mod 15). -/
theorem enumeration_hex4_57b9 : reassembles 22457 = true ∧ castsFifteens 22457 = true := by decide

/-- 57ba: nibbles fold back to 22458; digit sum 33 ≡ 22458 (mod 15). -/
theorem enumeration_hex4_57ba : reassembles 22458 = true ∧ castsFifteens 22458 = true := by decide

/-- 57bb: nibbles fold back to 22459; digit sum 34 ≡ 22459 (mod 15). -/
theorem enumeration_hex4_57bb : reassembles 22459 = true ∧ castsFifteens 22459 = true := by decide

/-- 57bc: nibbles fold back to 22460; digit sum 35 ≡ 22460 (mod 15). -/
theorem enumeration_hex4_57bc : reassembles 22460 = true ∧ castsFifteens 22460 = true := by decide

/-- 57bd: nibbles fold back to 22461; digit sum 36 ≡ 22461 (mod 15). -/
theorem enumeration_hex4_57bd : reassembles 22461 = true ∧ castsFifteens 22461 = true := by decide

/-- 57be: nibbles fold back to 22462; digit sum 37 ≡ 22462 (mod 15). -/
theorem enumeration_hex4_57be : reassembles 22462 = true ∧ castsFifteens 22462 = true := by decide

/-- 57bf: nibbles fold back to 22463; digit sum 38 ≡ 22463 (mod 15). -/
theorem enumeration_hex4_57bf : reassembles 22463 = true ∧ castsFifteens 22463 = true := by decide

/-- 57c0: nibbles fold back to 22464; digit sum 24 ≡ 22464 (mod 15). -/
theorem enumeration_hex4_57c0 : reassembles 22464 = true ∧ castsFifteens 22464 = true := by decide

/-- 57c1: nibbles fold back to 22465; digit sum 25 ≡ 22465 (mod 15). -/
theorem enumeration_hex4_57c1 : reassembles 22465 = true ∧ castsFifteens 22465 = true := by decide

/-- 57c2: nibbles fold back to 22466; digit sum 26 ≡ 22466 (mod 15). -/
theorem enumeration_hex4_57c2 : reassembles 22466 = true ∧ castsFifteens 22466 = true := by decide

/-- 57c3: nibbles fold back to 22467; digit sum 27 ≡ 22467 (mod 15). -/
theorem enumeration_hex4_57c3 : reassembles 22467 = true ∧ castsFifteens 22467 = true := by decide

/-- 57c4: nibbles fold back to 22468; digit sum 28 ≡ 22468 (mod 15). -/
theorem enumeration_hex4_57c4 : reassembles 22468 = true ∧ castsFifteens 22468 = true := by decide

/-- 57c5: nibbles fold back to 22469; digit sum 29 ≡ 22469 (mod 15). -/
theorem enumeration_hex4_57c5 : reassembles 22469 = true ∧ castsFifteens 22469 = true := by decide

/-- 57c6: nibbles fold back to 22470; digit sum 30 ≡ 22470 (mod 15). -/
theorem enumeration_hex4_57c6 : reassembles 22470 = true ∧ castsFifteens 22470 = true := by decide

/-- 57c7: nibbles fold back to 22471; digit sum 31 ≡ 22471 (mod 15). -/
theorem enumeration_hex4_57c7 : reassembles 22471 = true ∧ castsFifteens 22471 = true := by decide

/-- 57c8: nibbles fold back to 22472; digit sum 32 ≡ 22472 (mod 15). -/
theorem enumeration_hex4_57c8 : reassembles 22472 = true ∧ castsFifteens 22472 = true := by decide

/-- 57c9: nibbles fold back to 22473; digit sum 33 ≡ 22473 (mod 15). -/
theorem enumeration_hex4_57c9 : reassembles 22473 = true ∧ castsFifteens 22473 = true := by decide

/-- 57ca: nibbles fold back to 22474; digit sum 34 ≡ 22474 (mod 15). -/
theorem enumeration_hex4_57ca : reassembles 22474 = true ∧ castsFifteens 22474 = true := by decide

/-- 57cb: nibbles fold back to 22475; digit sum 35 ≡ 22475 (mod 15). -/
theorem enumeration_hex4_57cb : reassembles 22475 = true ∧ castsFifteens 22475 = true := by decide

/-- 57cc: nibbles fold back to 22476; digit sum 36 ≡ 22476 (mod 15). -/
theorem enumeration_hex4_57cc : reassembles 22476 = true ∧ castsFifteens 22476 = true := by decide

/-- 57cd: nibbles fold back to 22477; digit sum 37 ≡ 22477 (mod 15). -/
theorem enumeration_hex4_57cd : reassembles 22477 = true ∧ castsFifteens 22477 = true := by decide

/-- 57ce: nibbles fold back to 22478; digit sum 38 ≡ 22478 (mod 15). -/
theorem enumeration_hex4_57ce : reassembles 22478 = true ∧ castsFifteens 22478 = true := by decide

/-- 57cf: nibbles fold back to 22479; digit sum 39 ≡ 22479 (mod 15). -/
theorem enumeration_hex4_57cf : reassembles 22479 = true ∧ castsFifteens 22479 = true := by decide

/-- 57d0: nibbles fold back to 22480; digit sum 25 ≡ 22480 (mod 15). -/
theorem enumeration_hex4_57d0 : reassembles 22480 = true ∧ castsFifteens 22480 = true := by decide

/-- 57d1: nibbles fold back to 22481; digit sum 26 ≡ 22481 (mod 15). -/
theorem enumeration_hex4_57d1 : reassembles 22481 = true ∧ castsFifteens 22481 = true := by decide

/-- 57d2: nibbles fold back to 22482; digit sum 27 ≡ 22482 (mod 15). -/
theorem enumeration_hex4_57d2 : reassembles 22482 = true ∧ castsFifteens 22482 = true := by decide

/-- 57d3: nibbles fold back to 22483; digit sum 28 ≡ 22483 (mod 15). -/
theorem enumeration_hex4_57d3 : reassembles 22483 = true ∧ castsFifteens 22483 = true := by decide

/-- 57d4: nibbles fold back to 22484; digit sum 29 ≡ 22484 (mod 15). -/
theorem enumeration_hex4_57d4 : reassembles 22484 = true ∧ castsFifteens 22484 = true := by decide

/-- 57d5: nibbles fold back to 22485; digit sum 30 ≡ 22485 (mod 15). -/
theorem enumeration_hex4_57d5 : reassembles 22485 = true ∧ castsFifteens 22485 = true := by decide

/-- 57d6: nibbles fold back to 22486; digit sum 31 ≡ 22486 (mod 15). -/
theorem enumeration_hex4_57d6 : reassembles 22486 = true ∧ castsFifteens 22486 = true := by decide

/-- 57d7: nibbles fold back to 22487; digit sum 32 ≡ 22487 (mod 15). -/
theorem enumeration_hex4_57d7 : reassembles 22487 = true ∧ castsFifteens 22487 = true := by decide

/-- 57d8: nibbles fold back to 22488; digit sum 33 ≡ 22488 (mod 15). -/
theorem enumeration_hex4_57d8 : reassembles 22488 = true ∧ castsFifteens 22488 = true := by decide

/-- 57d9: nibbles fold back to 22489; digit sum 34 ≡ 22489 (mod 15). -/
theorem enumeration_hex4_57d9 : reassembles 22489 = true ∧ castsFifteens 22489 = true := by decide

/-- 57da: nibbles fold back to 22490; digit sum 35 ≡ 22490 (mod 15). -/
theorem enumeration_hex4_57da : reassembles 22490 = true ∧ castsFifteens 22490 = true := by decide

/-- 57db: nibbles fold back to 22491; digit sum 36 ≡ 22491 (mod 15). -/
theorem enumeration_hex4_57db : reassembles 22491 = true ∧ castsFifteens 22491 = true := by decide

/-- 57dc: nibbles fold back to 22492; digit sum 37 ≡ 22492 (mod 15). -/
theorem enumeration_hex4_57dc : reassembles 22492 = true ∧ castsFifteens 22492 = true := by decide

/-- 57dd: nibbles fold back to 22493; digit sum 38 ≡ 22493 (mod 15). -/
theorem enumeration_hex4_57dd : reassembles 22493 = true ∧ castsFifteens 22493 = true := by decide

/-- 57de: nibbles fold back to 22494; digit sum 39 ≡ 22494 (mod 15). -/
theorem enumeration_hex4_57de : reassembles 22494 = true ∧ castsFifteens 22494 = true := by decide

/-- 57df: nibbles fold back to 22495; digit sum 40 ≡ 22495 (mod 15). -/
theorem enumeration_hex4_57df : reassembles 22495 = true ∧ castsFifteens 22495 = true := by decide

/-- 57e0: nibbles fold back to 22496; digit sum 26 ≡ 22496 (mod 15). -/
theorem enumeration_hex4_57e0 : reassembles 22496 = true ∧ castsFifteens 22496 = true := by decide

/-- 57e1: nibbles fold back to 22497; digit sum 27 ≡ 22497 (mod 15). -/
theorem enumeration_hex4_57e1 : reassembles 22497 = true ∧ castsFifteens 22497 = true := by decide

/-- 57e2: nibbles fold back to 22498; digit sum 28 ≡ 22498 (mod 15). -/
theorem enumeration_hex4_57e2 : reassembles 22498 = true ∧ castsFifteens 22498 = true := by decide

/-- 57e3: nibbles fold back to 22499; digit sum 29 ≡ 22499 (mod 15). -/
theorem enumeration_hex4_57e3 : reassembles 22499 = true ∧ castsFifteens 22499 = true := by decide

/-- 57e4: nibbles fold back to 22500; digit sum 30 ≡ 22500 (mod 15). -/
theorem enumeration_hex4_57e4 : reassembles 22500 = true ∧ castsFifteens 22500 = true := by decide

/-- 57e5: nibbles fold back to 22501; digit sum 31 ≡ 22501 (mod 15). -/
theorem enumeration_hex4_57e5 : reassembles 22501 = true ∧ castsFifteens 22501 = true := by decide

/-- 57e6: nibbles fold back to 22502; digit sum 32 ≡ 22502 (mod 15). -/
theorem enumeration_hex4_57e6 : reassembles 22502 = true ∧ castsFifteens 22502 = true := by decide

/-- 57e7: nibbles fold back to 22503; digit sum 33 ≡ 22503 (mod 15). -/
theorem enumeration_hex4_57e7 : reassembles 22503 = true ∧ castsFifteens 22503 = true := by decide

/-- 57e8: nibbles fold back to 22504; digit sum 34 ≡ 22504 (mod 15). -/
theorem enumeration_hex4_57e8 : reassembles 22504 = true ∧ castsFifteens 22504 = true := by decide

/-- 57e9: nibbles fold back to 22505; digit sum 35 ≡ 22505 (mod 15). -/
theorem enumeration_hex4_57e9 : reassembles 22505 = true ∧ castsFifteens 22505 = true := by decide

/-- 57ea: nibbles fold back to 22506; digit sum 36 ≡ 22506 (mod 15). -/
theorem enumeration_hex4_57ea : reassembles 22506 = true ∧ castsFifteens 22506 = true := by decide

/-- 57eb: nibbles fold back to 22507; digit sum 37 ≡ 22507 (mod 15). -/
theorem enumeration_hex4_57eb : reassembles 22507 = true ∧ castsFifteens 22507 = true := by decide

/-- 57ec: nibbles fold back to 22508; digit sum 38 ≡ 22508 (mod 15). -/
theorem enumeration_hex4_57ec : reassembles 22508 = true ∧ castsFifteens 22508 = true := by decide

/-- 57ed: nibbles fold back to 22509; digit sum 39 ≡ 22509 (mod 15). -/
theorem enumeration_hex4_57ed : reassembles 22509 = true ∧ castsFifteens 22509 = true := by decide

/-- 57ee: nibbles fold back to 22510; digit sum 40 ≡ 22510 (mod 15). -/
theorem enumeration_hex4_57ee : reassembles 22510 = true ∧ castsFifteens 22510 = true := by decide

/-- 57ef: nibbles fold back to 22511; digit sum 41 ≡ 22511 (mod 15). -/
theorem enumeration_hex4_57ef : reassembles 22511 = true ∧ castsFifteens 22511 = true := by decide

/-- 57f0: nibbles fold back to 22512; digit sum 27 ≡ 22512 (mod 15). -/
theorem enumeration_hex4_57f0 : reassembles 22512 = true ∧ castsFifteens 22512 = true := by decide

/-- 57f1: nibbles fold back to 22513; digit sum 28 ≡ 22513 (mod 15). -/
theorem enumeration_hex4_57f1 : reassembles 22513 = true ∧ castsFifteens 22513 = true := by decide

/-- 57f2: nibbles fold back to 22514; digit sum 29 ≡ 22514 (mod 15). -/
theorem enumeration_hex4_57f2 : reassembles 22514 = true ∧ castsFifteens 22514 = true := by decide

/-- 57f3: nibbles fold back to 22515; digit sum 30 ≡ 22515 (mod 15). -/
theorem enumeration_hex4_57f3 : reassembles 22515 = true ∧ castsFifteens 22515 = true := by decide

/-- 57f4: nibbles fold back to 22516; digit sum 31 ≡ 22516 (mod 15). -/
theorem enumeration_hex4_57f4 : reassembles 22516 = true ∧ castsFifteens 22516 = true := by decide

/-- 57f5: nibbles fold back to 22517; digit sum 32 ≡ 22517 (mod 15). -/
theorem enumeration_hex4_57f5 : reassembles 22517 = true ∧ castsFifteens 22517 = true := by decide

/-- 57f6: nibbles fold back to 22518; digit sum 33 ≡ 22518 (mod 15). -/
theorem enumeration_hex4_57f6 : reassembles 22518 = true ∧ castsFifteens 22518 = true := by decide

/-- 57f7: nibbles fold back to 22519; digit sum 34 ≡ 22519 (mod 15). -/
theorem enumeration_hex4_57f7 : reassembles 22519 = true ∧ castsFifteens 22519 = true := by decide

/-- 57f8: nibbles fold back to 22520; digit sum 35 ≡ 22520 (mod 15). -/
theorem enumeration_hex4_57f8 : reassembles 22520 = true ∧ castsFifteens 22520 = true := by decide

/-- 57f9: nibbles fold back to 22521; digit sum 36 ≡ 22521 (mod 15). -/
theorem enumeration_hex4_57f9 : reassembles 22521 = true ∧ castsFifteens 22521 = true := by decide

/-- 57fa: nibbles fold back to 22522; digit sum 37 ≡ 22522 (mod 15). -/
theorem enumeration_hex4_57fa : reassembles 22522 = true ∧ castsFifteens 22522 = true := by decide

/-- 57fb: nibbles fold back to 22523; digit sum 38 ≡ 22523 (mod 15). -/
theorem enumeration_hex4_57fb : reassembles 22523 = true ∧ castsFifteens 22523 = true := by decide

/-- 57fc: nibbles fold back to 22524; digit sum 39 ≡ 22524 (mod 15). -/
theorem enumeration_hex4_57fc : reassembles 22524 = true ∧ castsFifteens 22524 = true := by decide

/-- 57fd: nibbles fold back to 22525; digit sum 40 ≡ 22525 (mod 15). -/
theorem enumeration_hex4_57fd : reassembles 22525 = true ∧ castsFifteens 22525 = true := by decide

/-- 57fe: nibbles fold back to 22526; digit sum 41 ≡ 22526 (mod 15). -/
theorem enumeration_hex4_57fe : reassembles 22526 = true ∧ castsFifteens 22526 = true := by decide

/-- 57ff: nibbles fold back to 22527; digit sum 42 ≡ 22527 (mod 15). -/
theorem enumeration_hex4_57ff : reassembles 22527 = true ∧ castsFifteens 22527 = true := by decide

/-- 5800: nibbles fold back to 22528; digit sum 13 ≡ 22528 (mod 15). -/
theorem enumeration_hex4_5800 : reassembles 22528 = true ∧ castsFifteens 22528 = true := by decide

/-- 5801: nibbles fold back to 22529; digit sum 14 ≡ 22529 (mod 15). -/
theorem enumeration_hex4_5801 : reassembles 22529 = true ∧ castsFifteens 22529 = true := by decide

/-- 5802: nibbles fold back to 22530; digit sum 15 ≡ 22530 (mod 15). -/
theorem enumeration_hex4_5802 : reassembles 22530 = true ∧ castsFifteens 22530 = true := by decide

/-- 5803: nibbles fold back to 22531; digit sum 16 ≡ 22531 (mod 15). -/
theorem enumeration_hex4_5803 : reassembles 22531 = true ∧ castsFifteens 22531 = true := by decide

/-- 5804: nibbles fold back to 22532; digit sum 17 ≡ 22532 (mod 15). -/
theorem enumeration_hex4_5804 : reassembles 22532 = true ∧ castsFifteens 22532 = true := by decide

/-- 5805: nibbles fold back to 22533; digit sum 18 ≡ 22533 (mod 15). -/
theorem enumeration_hex4_5805 : reassembles 22533 = true ∧ castsFifteens 22533 = true := by decide

/-- 5806: nibbles fold back to 22534; digit sum 19 ≡ 22534 (mod 15). -/
theorem enumeration_hex4_5806 : reassembles 22534 = true ∧ castsFifteens 22534 = true := by decide

/-- 5807: nibbles fold back to 22535; digit sum 20 ≡ 22535 (mod 15). -/
theorem enumeration_hex4_5807 : reassembles 22535 = true ∧ castsFifteens 22535 = true := by decide

/-- 5808: nibbles fold back to 22536; digit sum 21 ≡ 22536 (mod 15). -/
theorem enumeration_hex4_5808 : reassembles 22536 = true ∧ castsFifteens 22536 = true := by decide

/-- 5809: nibbles fold back to 22537; digit sum 22 ≡ 22537 (mod 15). -/
theorem enumeration_hex4_5809 : reassembles 22537 = true ∧ castsFifteens 22537 = true := by decide

/-- 580a: nibbles fold back to 22538; digit sum 23 ≡ 22538 (mod 15). -/
theorem enumeration_hex4_580a : reassembles 22538 = true ∧ castsFifteens 22538 = true := by decide

/-- 580b: nibbles fold back to 22539; digit sum 24 ≡ 22539 (mod 15). -/
theorem enumeration_hex4_580b : reassembles 22539 = true ∧ castsFifteens 22539 = true := by decide

/-- 580c: nibbles fold back to 22540; digit sum 25 ≡ 22540 (mod 15). -/
theorem enumeration_hex4_580c : reassembles 22540 = true ∧ castsFifteens 22540 = true := by decide

/-- 580d: nibbles fold back to 22541; digit sum 26 ≡ 22541 (mod 15). -/
theorem enumeration_hex4_580d : reassembles 22541 = true ∧ castsFifteens 22541 = true := by decide

/-- 580e: nibbles fold back to 22542; digit sum 27 ≡ 22542 (mod 15). -/
theorem enumeration_hex4_580e : reassembles 22542 = true ∧ castsFifteens 22542 = true := by decide

/-- 580f: nibbles fold back to 22543; digit sum 28 ≡ 22543 (mod 15). -/
theorem enumeration_hex4_580f : reassembles 22543 = true ∧ castsFifteens 22543 = true := by decide

/-- 5810: nibbles fold back to 22544; digit sum 14 ≡ 22544 (mod 15). -/
theorem enumeration_hex4_5810 : reassembles 22544 = true ∧ castsFifteens 22544 = true := by decide

/-- 5811: nibbles fold back to 22545; digit sum 15 ≡ 22545 (mod 15). -/
theorem enumeration_hex4_5811 : reassembles 22545 = true ∧ castsFifteens 22545 = true := by decide

/-- 5812: nibbles fold back to 22546; digit sum 16 ≡ 22546 (mod 15). -/
theorem enumeration_hex4_5812 : reassembles 22546 = true ∧ castsFifteens 22546 = true := by decide

/-- 5813: nibbles fold back to 22547; digit sum 17 ≡ 22547 (mod 15). -/
theorem enumeration_hex4_5813 : reassembles 22547 = true ∧ castsFifteens 22547 = true := by decide

/-- 5814: nibbles fold back to 22548; digit sum 18 ≡ 22548 (mod 15). -/
theorem enumeration_hex4_5814 : reassembles 22548 = true ∧ castsFifteens 22548 = true := by decide

/-- 5815: nibbles fold back to 22549; digit sum 19 ≡ 22549 (mod 15). -/
theorem enumeration_hex4_5815 : reassembles 22549 = true ∧ castsFifteens 22549 = true := by decide

/-- 5816: nibbles fold back to 22550; digit sum 20 ≡ 22550 (mod 15). -/
theorem enumeration_hex4_5816 : reassembles 22550 = true ∧ castsFifteens 22550 = true := by decide

/-- 5817: nibbles fold back to 22551; digit sum 21 ≡ 22551 (mod 15). -/
theorem enumeration_hex4_5817 : reassembles 22551 = true ∧ castsFifteens 22551 = true := by decide

/-- 5818: nibbles fold back to 22552; digit sum 22 ≡ 22552 (mod 15). -/
theorem enumeration_hex4_5818 : reassembles 22552 = true ∧ castsFifteens 22552 = true := by decide

/-- 5819: nibbles fold back to 22553; digit sum 23 ≡ 22553 (mod 15). -/
theorem enumeration_hex4_5819 : reassembles 22553 = true ∧ castsFifteens 22553 = true := by decide

/-- 581a: nibbles fold back to 22554; digit sum 24 ≡ 22554 (mod 15). -/
theorem enumeration_hex4_581a : reassembles 22554 = true ∧ castsFifteens 22554 = true := by decide

/-- 581b: nibbles fold back to 22555; digit sum 25 ≡ 22555 (mod 15). -/
theorem enumeration_hex4_581b : reassembles 22555 = true ∧ castsFifteens 22555 = true := by decide

/-- 581c: nibbles fold back to 22556; digit sum 26 ≡ 22556 (mod 15). -/
theorem enumeration_hex4_581c : reassembles 22556 = true ∧ castsFifteens 22556 = true := by decide

/-- 581d: nibbles fold back to 22557; digit sum 27 ≡ 22557 (mod 15). -/
theorem enumeration_hex4_581d : reassembles 22557 = true ∧ castsFifteens 22557 = true := by decide

/-- 581e: nibbles fold back to 22558; digit sum 28 ≡ 22558 (mod 15). -/
theorem enumeration_hex4_581e : reassembles 22558 = true ∧ castsFifteens 22558 = true := by decide

/-- 581f: nibbles fold back to 22559; digit sum 29 ≡ 22559 (mod 15). -/
theorem enumeration_hex4_581f : reassembles 22559 = true ∧ castsFifteens 22559 = true := by decide

/-- 5820: nibbles fold back to 22560; digit sum 15 ≡ 22560 (mod 15). -/
theorem enumeration_hex4_5820 : reassembles 22560 = true ∧ castsFifteens 22560 = true := by decide

/-- 5821: nibbles fold back to 22561; digit sum 16 ≡ 22561 (mod 15). -/
theorem enumeration_hex4_5821 : reassembles 22561 = true ∧ castsFifteens 22561 = true := by decide

/-- 5822: nibbles fold back to 22562; digit sum 17 ≡ 22562 (mod 15). -/
theorem enumeration_hex4_5822 : reassembles 22562 = true ∧ castsFifteens 22562 = true := by decide

/-- 5823: nibbles fold back to 22563; digit sum 18 ≡ 22563 (mod 15). -/
theorem enumeration_hex4_5823 : reassembles 22563 = true ∧ castsFifteens 22563 = true := by decide

/-- 5824: nibbles fold back to 22564; digit sum 19 ≡ 22564 (mod 15). -/
theorem enumeration_hex4_5824 : reassembles 22564 = true ∧ castsFifteens 22564 = true := by decide

/-- 5825: nibbles fold back to 22565; digit sum 20 ≡ 22565 (mod 15). -/
theorem enumeration_hex4_5825 : reassembles 22565 = true ∧ castsFifteens 22565 = true := by decide

/-- 5826: nibbles fold back to 22566; digit sum 21 ≡ 22566 (mod 15). -/
theorem enumeration_hex4_5826 : reassembles 22566 = true ∧ castsFifteens 22566 = true := by decide

/-- 5827: nibbles fold back to 22567; digit sum 22 ≡ 22567 (mod 15). -/
theorem enumeration_hex4_5827 : reassembles 22567 = true ∧ castsFifteens 22567 = true := by decide

/-- 5828: nibbles fold back to 22568; digit sum 23 ≡ 22568 (mod 15). -/
theorem enumeration_hex4_5828 : reassembles 22568 = true ∧ castsFifteens 22568 = true := by decide

/-- 5829: nibbles fold back to 22569; digit sum 24 ≡ 22569 (mod 15). -/
theorem enumeration_hex4_5829 : reassembles 22569 = true ∧ castsFifteens 22569 = true := by decide

/-- 582a: nibbles fold back to 22570; digit sum 25 ≡ 22570 (mod 15). -/
theorem enumeration_hex4_582a : reassembles 22570 = true ∧ castsFifteens 22570 = true := by decide

/-- 582b: nibbles fold back to 22571; digit sum 26 ≡ 22571 (mod 15). -/
theorem enumeration_hex4_582b : reassembles 22571 = true ∧ castsFifteens 22571 = true := by decide

/-- 582c: nibbles fold back to 22572; digit sum 27 ≡ 22572 (mod 15). -/
theorem enumeration_hex4_582c : reassembles 22572 = true ∧ castsFifteens 22572 = true := by decide

/-- 582d: nibbles fold back to 22573; digit sum 28 ≡ 22573 (mod 15). -/
theorem enumeration_hex4_582d : reassembles 22573 = true ∧ castsFifteens 22573 = true := by decide

/-- 582e: nibbles fold back to 22574; digit sum 29 ≡ 22574 (mod 15). -/
theorem enumeration_hex4_582e : reassembles 22574 = true ∧ castsFifteens 22574 = true := by decide

/-- 582f: nibbles fold back to 22575; digit sum 30 ≡ 22575 (mod 15). -/
theorem enumeration_hex4_582f : reassembles 22575 = true ∧ castsFifteens 22575 = true := by decide

/-- 5830: nibbles fold back to 22576; digit sum 16 ≡ 22576 (mod 15). -/
theorem enumeration_hex4_5830 : reassembles 22576 = true ∧ castsFifteens 22576 = true := by decide

/-- 5831: nibbles fold back to 22577; digit sum 17 ≡ 22577 (mod 15). -/
theorem enumeration_hex4_5831 : reassembles 22577 = true ∧ castsFifteens 22577 = true := by decide

/-- 5832: nibbles fold back to 22578; digit sum 18 ≡ 22578 (mod 15). -/
theorem enumeration_hex4_5832 : reassembles 22578 = true ∧ castsFifteens 22578 = true := by decide

/-- 5833: nibbles fold back to 22579; digit sum 19 ≡ 22579 (mod 15). -/
theorem enumeration_hex4_5833 : reassembles 22579 = true ∧ castsFifteens 22579 = true := by decide

/-- 5834: nibbles fold back to 22580; digit sum 20 ≡ 22580 (mod 15). -/
theorem enumeration_hex4_5834 : reassembles 22580 = true ∧ castsFifteens 22580 = true := by decide

/-- 5835: nibbles fold back to 22581; digit sum 21 ≡ 22581 (mod 15). -/
theorem enumeration_hex4_5835 : reassembles 22581 = true ∧ castsFifteens 22581 = true := by decide

/-- 5836: nibbles fold back to 22582; digit sum 22 ≡ 22582 (mod 15). -/
theorem enumeration_hex4_5836 : reassembles 22582 = true ∧ castsFifteens 22582 = true := by decide

/-- 5837: nibbles fold back to 22583; digit sum 23 ≡ 22583 (mod 15). -/
theorem enumeration_hex4_5837 : reassembles 22583 = true ∧ castsFifteens 22583 = true := by decide

/-- 5838: nibbles fold back to 22584; digit sum 24 ≡ 22584 (mod 15). -/
theorem enumeration_hex4_5838 : reassembles 22584 = true ∧ castsFifteens 22584 = true := by decide

/-- 5839: nibbles fold back to 22585; digit sum 25 ≡ 22585 (mod 15). -/
theorem enumeration_hex4_5839 : reassembles 22585 = true ∧ castsFifteens 22585 = true := by decide

/-- 583a: nibbles fold back to 22586; digit sum 26 ≡ 22586 (mod 15). -/
theorem enumeration_hex4_583a : reassembles 22586 = true ∧ castsFifteens 22586 = true := by decide

/-- 583b: nibbles fold back to 22587; digit sum 27 ≡ 22587 (mod 15). -/
theorem enumeration_hex4_583b : reassembles 22587 = true ∧ castsFifteens 22587 = true := by decide

/-- 583c: nibbles fold back to 22588; digit sum 28 ≡ 22588 (mod 15). -/
theorem enumeration_hex4_583c : reassembles 22588 = true ∧ castsFifteens 22588 = true := by decide

/-- 583d: nibbles fold back to 22589; digit sum 29 ≡ 22589 (mod 15). -/
theorem enumeration_hex4_583d : reassembles 22589 = true ∧ castsFifteens 22589 = true := by decide

/-- 583e: nibbles fold back to 22590; digit sum 30 ≡ 22590 (mod 15). -/
theorem enumeration_hex4_583e : reassembles 22590 = true ∧ castsFifteens 22590 = true := by decide

/-- 583f: nibbles fold back to 22591; digit sum 31 ≡ 22591 (mod 15). -/
theorem enumeration_hex4_583f : reassembles 22591 = true ∧ castsFifteens 22591 = true := by decide

/-- 5840: nibbles fold back to 22592; digit sum 17 ≡ 22592 (mod 15). -/
theorem enumeration_hex4_5840 : reassembles 22592 = true ∧ castsFifteens 22592 = true := by decide

/-- 5841: nibbles fold back to 22593; digit sum 18 ≡ 22593 (mod 15). -/
theorem enumeration_hex4_5841 : reassembles 22593 = true ∧ castsFifteens 22593 = true := by decide

/-- 5842: nibbles fold back to 22594; digit sum 19 ≡ 22594 (mod 15). -/
theorem enumeration_hex4_5842 : reassembles 22594 = true ∧ castsFifteens 22594 = true := by decide

/-- 5843: nibbles fold back to 22595; digit sum 20 ≡ 22595 (mod 15). -/
theorem enumeration_hex4_5843 : reassembles 22595 = true ∧ castsFifteens 22595 = true := by decide

/-- 5844: nibbles fold back to 22596; digit sum 21 ≡ 22596 (mod 15). -/
theorem enumeration_hex4_5844 : reassembles 22596 = true ∧ castsFifteens 22596 = true := by decide

/-- 5845: nibbles fold back to 22597; digit sum 22 ≡ 22597 (mod 15). -/
theorem enumeration_hex4_5845 : reassembles 22597 = true ∧ castsFifteens 22597 = true := by decide

/-- 5846: nibbles fold back to 22598; digit sum 23 ≡ 22598 (mod 15). -/
theorem enumeration_hex4_5846 : reassembles 22598 = true ∧ castsFifteens 22598 = true := by decide

/-- 5847: nibbles fold back to 22599; digit sum 24 ≡ 22599 (mod 15). -/
theorem enumeration_hex4_5847 : reassembles 22599 = true ∧ castsFifteens 22599 = true := by decide

/-- 5848: nibbles fold back to 22600; digit sum 25 ≡ 22600 (mod 15). -/
theorem enumeration_hex4_5848 : reassembles 22600 = true ∧ castsFifteens 22600 = true := by decide

/-- 5849: nibbles fold back to 22601; digit sum 26 ≡ 22601 (mod 15). -/
theorem enumeration_hex4_5849 : reassembles 22601 = true ∧ castsFifteens 22601 = true := by decide

/-- 584a: nibbles fold back to 22602; digit sum 27 ≡ 22602 (mod 15). -/
theorem enumeration_hex4_584a : reassembles 22602 = true ∧ castsFifteens 22602 = true := by decide

/-- 584b: nibbles fold back to 22603; digit sum 28 ≡ 22603 (mod 15). -/
theorem enumeration_hex4_584b : reassembles 22603 = true ∧ castsFifteens 22603 = true := by decide

/-- 584c: nibbles fold back to 22604; digit sum 29 ≡ 22604 (mod 15). -/
theorem enumeration_hex4_584c : reassembles 22604 = true ∧ castsFifteens 22604 = true := by decide

/-- 584d: nibbles fold back to 22605; digit sum 30 ≡ 22605 (mod 15). -/
theorem enumeration_hex4_584d : reassembles 22605 = true ∧ castsFifteens 22605 = true := by decide

/-- 584e: nibbles fold back to 22606; digit sum 31 ≡ 22606 (mod 15). -/
theorem enumeration_hex4_584e : reassembles 22606 = true ∧ castsFifteens 22606 = true := by decide

/-- 584f: nibbles fold back to 22607; digit sum 32 ≡ 22607 (mod 15). -/
theorem enumeration_hex4_584f : reassembles 22607 = true ∧ castsFifteens 22607 = true := by decide

/-- 5850: nibbles fold back to 22608; digit sum 18 ≡ 22608 (mod 15). -/
theorem enumeration_hex4_5850 : reassembles 22608 = true ∧ castsFifteens 22608 = true := by decide

/-- 5851: nibbles fold back to 22609; digit sum 19 ≡ 22609 (mod 15). -/
theorem enumeration_hex4_5851 : reassembles 22609 = true ∧ castsFifteens 22609 = true := by decide

/-- 5852: nibbles fold back to 22610; digit sum 20 ≡ 22610 (mod 15). -/
theorem enumeration_hex4_5852 : reassembles 22610 = true ∧ castsFifteens 22610 = true := by decide

/-- 5853: nibbles fold back to 22611; digit sum 21 ≡ 22611 (mod 15). -/
theorem enumeration_hex4_5853 : reassembles 22611 = true ∧ castsFifteens 22611 = true := by decide

/-- 5854: nibbles fold back to 22612; digit sum 22 ≡ 22612 (mod 15). -/
theorem enumeration_hex4_5854 : reassembles 22612 = true ∧ castsFifteens 22612 = true := by decide

/-- 5855: nibbles fold back to 22613; digit sum 23 ≡ 22613 (mod 15). -/
theorem enumeration_hex4_5855 : reassembles 22613 = true ∧ castsFifteens 22613 = true := by decide

/-- 5856: nibbles fold back to 22614; digit sum 24 ≡ 22614 (mod 15). -/
theorem enumeration_hex4_5856 : reassembles 22614 = true ∧ castsFifteens 22614 = true := by decide

/-- 5857: nibbles fold back to 22615; digit sum 25 ≡ 22615 (mod 15). -/
theorem enumeration_hex4_5857 : reassembles 22615 = true ∧ castsFifteens 22615 = true := by decide

/-- 5858: nibbles fold back to 22616; digit sum 26 ≡ 22616 (mod 15). -/
theorem enumeration_hex4_5858 : reassembles 22616 = true ∧ castsFifteens 22616 = true := by decide

/-- 5859: nibbles fold back to 22617; digit sum 27 ≡ 22617 (mod 15). -/
theorem enumeration_hex4_5859 : reassembles 22617 = true ∧ castsFifteens 22617 = true := by decide

/-- 585a: nibbles fold back to 22618; digit sum 28 ≡ 22618 (mod 15). -/
theorem enumeration_hex4_585a : reassembles 22618 = true ∧ castsFifteens 22618 = true := by decide

/-- 585b: nibbles fold back to 22619; digit sum 29 ≡ 22619 (mod 15). -/
theorem enumeration_hex4_585b : reassembles 22619 = true ∧ castsFifteens 22619 = true := by decide

/-- 585c: nibbles fold back to 22620; digit sum 30 ≡ 22620 (mod 15). -/
theorem enumeration_hex4_585c : reassembles 22620 = true ∧ castsFifteens 22620 = true := by decide

/-- 585d: nibbles fold back to 22621; digit sum 31 ≡ 22621 (mod 15). -/
theorem enumeration_hex4_585d : reassembles 22621 = true ∧ castsFifteens 22621 = true := by decide

/-- 585e: nibbles fold back to 22622; digit sum 32 ≡ 22622 (mod 15). -/
theorem enumeration_hex4_585e : reassembles 22622 = true ∧ castsFifteens 22622 = true := by decide

/-- 585f: nibbles fold back to 22623; digit sum 33 ≡ 22623 (mod 15). -/
theorem enumeration_hex4_585f : reassembles 22623 = true ∧ castsFifteens 22623 = true := by decide

/-- 5860: nibbles fold back to 22624; digit sum 19 ≡ 22624 (mod 15). -/
theorem enumeration_hex4_5860 : reassembles 22624 = true ∧ castsFifteens 22624 = true := by decide

/-- 5861: nibbles fold back to 22625; digit sum 20 ≡ 22625 (mod 15). -/
theorem enumeration_hex4_5861 : reassembles 22625 = true ∧ castsFifteens 22625 = true := by decide

/-- 5862: nibbles fold back to 22626; digit sum 21 ≡ 22626 (mod 15). -/
theorem enumeration_hex4_5862 : reassembles 22626 = true ∧ castsFifteens 22626 = true := by decide

/-- 5863: nibbles fold back to 22627; digit sum 22 ≡ 22627 (mod 15). -/
theorem enumeration_hex4_5863 : reassembles 22627 = true ∧ castsFifteens 22627 = true := by decide

/-- 5864: nibbles fold back to 22628; digit sum 23 ≡ 22628 (mod 15). -/
theorem enumeration_hex4_5864 : reassembles 22628 = true ∧ castsFifteens 22628 = true := by decide

/-- 5865: nibbles fold back to 22629; digit sum 24 ≡ 22629 (mod 15). -/
theorem enumeration_hex4_5865 : reassembles 22629 = true ∧ castsFifteens 22629 = true := by decide

/-- 5866: nibbles fold back to 22630; digit sum 25 ≡ 22630 (mod 15). -/
theorem enumeration_hex4_5866 : reassembles 22630 = true ∧ castsFifteens 22630 = true := by decide

/-- 5867: nibbles fold back to 22631; digit sum 26 ≡ 22631 (mod 15). -/
theorem enumeration_hex4_5867 : reassembles 22631 = true ∧ castsFifteens 22631 = true := by decide

/-- 5868: nibbles fold back to 22632; digit sum 27 ≡ 22632 (mod 15). -/
theorem enumeration_hex4_5868 : reassembles 22632 = true ∧ castsFifteens 22632 = true := by decide

/-- 5869: nibbles fold back to 22633; digit sum 28 ≡ 22633 (mod 15). -/
theorem enumeration_hex4_5869 : reassembles 22633 = true ∧ castsFifteens 22633 = true := by decide

/-- 586a: nibbles fold back to 22634; digit sum 29 ≡ 22634 (mod 15). -/
theorem enumeration_hex4_586a : reassembles 22634 = true ∧ castsFifteens 22634 = true := by decide

/-- 586b: nibbles fold back to 22635; digit sum 30 ≡ 22635 (mod 15). -/
theorem enumeration_hex4_586b : reassembles 22635 = true ∧ castsFifteens 22635 = true := by decide

/-- 586c: nibbles fold back to 22636; digit sum 31 ≡ 22636 (mod 15). -/
theorem enumeration_hex4_586c : reassembles 22636 = true ∧ castsFifteens 22636 = true := by decide

/-- 586d: nibbles fold back to 22637; digit sum 32 ≡ 22637 (mod 15). -/
theorem enumeration_hex4_586d : reassembles 22637 = true ∧ castsFifteens 22637 = true := by decide

/-- 586e: nibbles fold back to 22638; digit sum 33 ≡ 22638 (mod 15). -/
theorem enumeration_hex4_586e : reassembles 22638 = true ∧ castsFifteens 22638 = true := by decide

/-- 586f: nibbles fold back to 22639; digit sum 34 ≡ 22639 (mod 15). -/
theorem enumeration_hex4_586f : reassembles 22639 = true ∧ castsFifteens 22639 = true := by decide

/-- 5870: nibbles fold back to 22640; digit sum 20 ≡ 22640 (mod 15). -/
theorem enumeration_hex4_5870 : reassembles 22640 = true ∧ castsFifteens 22640 = true := by decide

/-- 5871: nibbles fold back to 22641; digit sum 21 ≡ 22641 (mod 15). -/
theorem enumeration_hex4_5871 : reassembles 22641 = true ∧ castsFifteens 22641 = true := by decide

/-- 5872: nibbles fold back to 22642; digit sum 22 ≡ 22642 (mod 15). -/
theorem enumeration_hex4_5872 : reassembles 22642 = true ∧ castsFifteens 22642 = true := by decide

/-- 5873: nibbles fold back to 22643; digit sum 23 ≡ 22643 (mod 15). -/
theorem enumeration_hex4_5873 : reassembles 22643 = true ∧ castsFifteens 22643 = true := by decide

/-- 5874: nibbles fold back to 22644; digit sum 24 ≡ 22644 (mod 15). -/
theorem enumeration_hex4_5874 : reassembles 22644 = true ∧ castsFifteens 22644 = true := by decide

/-- 5875: nibbles fold back to 22645; digit sum 25 ≡ 22645 (mod 15). -/
theorem enumeration_hex4_5875 : reassembles 22645 = true ∧ castsFifteens 22645 = true := by decide

/-- 5876: nibbles fold back to 22646; digit sum 26 ≡ 22646 (mod 15). -/
theorem enumeration_hex4_5876 : reassembles 22646 = true ∧ castsFifteens 22646 = true := by decide

/-- 5877: nibbles fold back to 22647; digit sum 27 ≡ 22647 (mod 15). -/
theorem enumeration_hex4_5877 : reassembles 22647 = true ∧ castsFifteens 22647 = true := by decide

/-- 5878: nibbles fold back to 22648; digit sum 28 ≡ 22648 (mod 15). -/
theorem enumeration_hex4_5878 : reassembles 22648 = true ∧ castsFifteens 22648 = true := by decide

/-- 5879: nibbles fold back to 22649; digit sum 29 ≡ 22649 (mod 15). -/
theorem enumeration_hex4_5879 : reassembles 22649 = true ∧ castsFifteens 22649 = true := by decide

/-- 587a: nibbles fold back to 22650; digit sum 30 ≡ 22650 (mod 15). -/
theorem enumeration_hex4_587a : reassembles 22650 = true ∧ castsFifteens 22650 = true := by decide

/-- 587b: nibbles fold back to 22651; digit sum 31 ≡ 22651 (mod 15). -/
theorem enumeration_hex4_587b : reassembles 22651 = true ∧ castsFifteens 22651 = true := by decide

/-- 587c: nibbles fold back to 22652; digit sum 32 ≡ 22652 (mod 15). -/
theorem enumeration_hex4_587c : reassembles 22652 = true ∧ castsFifteens 22652 = true := by decide

/-- 587d: nibbles fold back to 22653; digit sum 33 ≡ 22653 (mod 15). -/
theorem enumeration_hex4_587d : reassembles 22653 = true ∧ castsFifteens 22653 = true := by decide

/-- 587e: nibbles fold back to 22654; digit sum 34 ≡ 22654 (mod 15). -/
theorem enumeration_hex4_587e : reassembles 22654 = true ∧ castsFifteens 22654 = true := by decide

/-- 587f: nibbles fold back to 22655; digit sum 35 ≡ 22655 (mod 15). -/
theorem enumeration_hex4_587f : reassembles 22655 = true ∧ castsFifteens 22655 = true := by decide

/-- 5880: nibbles fold back to 22656; digit sum 21 ≡ 22656 (mod 15). -/
theorem enumeration_hex4_5880 : reassembles 22656 = true ∧ castsFifteens 22656 = true := by decide

/-- 5881: nibbles fold back to 22657; digit sum 22 ≡ 22657 (mod 15). -/
theorem enumeration_hex4_5881 : reassembles 22657 = true ∧ castsFifteens 22657 = true := by decide

/-- 5882: nibbles fold back to 22658; digit sum 23 ≡ 22658 (mod 15). -/
theorem enumeration_hex4_5882 : reassembles 22658 = true ∧ castsFifteens 22658 = true := by decide

/-- 5883: nibbles fold back to 22659; digit sum 24 ≡ 22659 (mod 15). -/
theorem enumeration_hex4_5883 : reassembles 22659 = true ∧ castsFifteens 22659 = true := by decide

/-- 5884: nibbles fold back to 22660; digit sum 25 ≡ 22660 (mod 15). -/
theorem enumeration_hex4_5884 : reassembles 22660 = true ∧ castsFifteens 22660 = true := by decide

/-- 5885: nibbles fold back to 22661; digit sum 26 ≡ 22661 (mod 15). -/
theorem enumeration_hex4_5885 : reassembles 22661 = true ∧ castsFifteens 22661 = true := by decide

/-- 5886: nibbles fold back to 22662; digit sum 27 ≡ 22662 (mod 15). -/
theorem enumeration_hex4_5886 : reassembles 22662 = true ∧ castsFifteens 22662 = true := by decide

/-- 5887: nibbles fold back to 22663; digit sum 28 ≡ 22663 (mod 15). -/
theorem enumeration_hex4_5887 : reassembles 22663 = true ∧ castsFifteens 22663 = true := by decide

/-- 5888: nibbles fold back to 22664; digit sum 29 ≡ 22664 (mod 15). -/
theorem enumeration_hex4_5888 : reassembles 22664 = true ∧ castsFifteens 22664 = true := by decide

/-- 5889: nibbles fold back to 22665; digit sum 30 ≡ 22665 (mod 15). -/
theorem enumeration_hex4_5889 : reassembles 22665 = true ∧ castsFifteens 22665 = true := by decide

/-- 588a: nibbles fold back to 22666; digit sum 31 ≡ 22666 (mod 15). -/
theorem enumeration_hex4_588a : reassembles 22666 = true ∧ castsFifteens 22666 = true := by decide

/-- 588b: nibbles fold back to 22667; digit sum 32 ≡ 22667 (mod 15). -/
theorem enumeration_hex4_588b : reassembles 22667 = true ∧ castsFifteens 22667 = true := by decide

/-- 588c: nibbles fold back to 22668; digit sum 33 ≡ 22668 (mod 15). -/
theorem enumeration_hex4_588c : reassembles 22668 = true ∧ castsFifteens 22668 = true := by decide

/-- 588d: nibbles fold back to 22669; digit sum 34 ≡ 22669 (mod 15). -/
theorem enumeration_hex4_588d : reassembles 22669 = true ∧ castsFifteens 22669 = true := by decide

/-- 588e: nibbles fold back to 22670; digit sum 35 ≡ 22670 (mod 15). -/
theorem enumeration_hex4_588e : reassembles 22670 = true ∧ castsFifteens 22670 = true := by decide

/-- 588f: nibbles fold back to 22671; digit sum 36 ≡ 22671 (mod 15). -/
theorem enumeration_hex4_588f : reassembles 22671 = true ∧ castsFifteens 22671 = true := by decide

/-- 5890: nibbles fold back to 22672; digit sum 22 ≡ 22672 (mod 15). -/
theorem enumeration_hex4_5890 : reassembles 22672 = true ∧ castsFifteens 22672 = true := by decide

/-- 5891: nibbles fold back to 22673; digit sum 23 ≡ 22673 (mod 15). -/
theorem enumeration_hex4_5891 : reassembles 22673 = true ∧ castsFifteens 22673 = true := by decide

/-- 5892: nibbles fold back to 22674; digit sum 24 ≡ 22674 (mod 15). -/
theorem enumeration_hex4_5892 : reassembles 22674 = true ∧ castsFifteens 22674 = true := by decide

/-- 5893: nibbles fold back to 22675; digit sum 25 ≡ 22675 (mod 15). -/
theorem enumeration_hex4_5893 : reassembles 22675 = true ∧ castsFifteens 22675 = true := by decide

/-- 5894: nibbles fold back to 22676; digit sum 26 ≡ 22676 (mod 15). -/
theorem enumeration_hex4_5894 : reassembles 22676 = true ∧ castsFifteens 22676 = true := by decide

/-- 5895: nibbles fold back to 22677; digit sum 27 ≡ 22677 (mod 15). -/
theorem enumeration_hex4_5895 : reassembles 22677 = true ∧ castsFifteens 22677 = true := by decide

/-- 5896: nibbles fold back to 22678; digit sum 28 ≡ 22678 (mod 15). -/
theorem enumeration_hex4_5896 : reassembles 22678 = true ∧ castsFifteens 22678 = true := by decide

/-- 5897: nibbles fold back to 22679; digit sum 29 ≡ 22679 (mod 15). -/
theorem enumeration_hex4_5897 : reassembles 22679 = true ∧ castsFifteens 22679 = true := by decide

/-- 5898: nibbles fold back to 22680; digit sum 30 ≡ 22680 (mod 15). -/
theorem enumeration_hex4_5898 : reassembles 22680 = true ∧ castsFifteens 22680 = true := by decide

/-- 5899: nibbles fold back to 22681; digit sum 31 ≡ 22681 (mod 15). -/
theorem enumeration_hex4_5899 : reassembles 22681 = true ∧ castsFifteens 22681 = true := by decide

/-- 589a: nibbles fold back to 22682; digit sum 32 ≡ 22682 (mod 15). -/
theorem enumeration_hex4_589a : reassembles 22682 = true ∧ castsFifteens 22682 = true := by decide

/-- 589b: nibbles fold back to 22683; digit sum 33 ≡ 22683 (mod 15). -/
theorem enumeration_hex4_589b : reassembles 22683 = true ∧ castsFifteens 22683 = true := by decide

/-- 589c: nibbles fold back to 22684; digit sum 34 ≡ 22684 (mod 15). -/
theorem enumeration_hex4_589c : reassembles 22684 = true ∧ castsFifteens 22684 = true := by decide

/-- 589d: nibbles fold back to 22685; digit sum 35 ≡ 22685 (mod 15). -/
theorem enumeration_hex4_589d : reassembles 22685 = true ∧ castsFifteens 22685 = true := by decide

/-- 589e: nibbles fold back to 22686; digit sum 36 ≡ 22686 (mod 15). -/
theorem enumeration_hex4_589e : reassembles 22686 = true ∧ castsFifteens 22686 = true := by decide

/-- 589f: nibbles fold back to 22687; digit sum 37 ≡ 22687 (mod 15). -/
theorem enumeration_hex4_589f : reassembles 22687 = true ∧ castsFifteens 22687 = true := by decide

/-- 58a0: nibbles fold back to 22688; digit sum 23 ≡ 22688 (mod 15). -/
theorem enumeration_hex4_58a0 : reassembles 22688 = true ∧ castsFifteens 22688 = true := by decide

/-- 58a1: nibbles fold back to 22689; digit sum 24 ≡ 22689 (mod 15). -/
theorem enumeration_hex4_58a1 : reassembles 22689 = true ∧ castsFifteens 22689 = true := by decide

/-- 58a2: nibbles fold back to 22690; digit sum 25 ≡ 22690 (mod 15). -/
theorem enumeration_hex4_58a2 : reassembles 22690 = true ∧ castsFifteens 22690 = true := by decide

/-- 58a3: nibbles fold back to 22691; digit sum 26 ≡ 22691 (mod 15). -/
theorem enumeration_hex4_58a3 : reassembles 22691 = true ∧ castsFifteens 22691 = true := by decide

/-- 58a4: nibbles fold back to 22692; digit sum 27 ≡ 22692 (mod 15). -/
theorem enumeration_hex4_58a4 : reassembles 22692 = true ∧ castsFifteens 22692 = true := by decide

/-- 58a5: nibbles fold back to 22693; digit sum 28 ≡ 22693 (mod 15). -/
theorem enumeration_hex4_58a5 : reassembles 22693 = true ∧ castsFifteens 22693 = true := by decide

/-- 58a6: nibbles fold back to 22694; digit sum 29 ≡ 22694 (mod 15). -/
theorem enumeration_hex4_58a6 : reassembles 22694 = true ∧ castsFifteens 22694 = true := by decide

/-- 58a7: nibbles fold back to 22695; digit sum 30 ≡ 22695 (mod 15). -/
theorem enumeration_hex4_58a7 : reassembles 22695 = true ∧ castsFifteens 22695 = true := by decide

/-- 58a8: nibbles fold back to 22696; digit sum 31 ≡ 22696 (mod 15). -/
theorem enumeration_hex4_58a8 : reassembles 22696 = true ∧ castsFifteens 22696 = true := by decide

/-- 58a9: nibbles fold back to 22697; digit sum 32 ≡ 22697 (mod 15). -/
theorem enumeration_hex4_58a9 : reassembles 22697 = true ∧ castsFifteens 22697 = true := by decide

/-- 58aa: nibbles fold back to 22698; digit sum 33 ≡ 22698 (mod 15). -/
theorem enumeration_hex4_58aa : reassembles 22698 = true ∧ castsFifteens 22698 = true := by decide

/-- 58ab: nibbles fold back to 22699; digit sum 34 ≡ 22699 (mod 15). -/
theorem enumeration_hex4_58ab : reassembles 22699 = true ∧ castsFifteens 22699 = true := by decide

/-- 58ac: nibbles fold back to 22700; digit sum 35 ≡ 22700 (mod 15). -/
theorem enumeration_hex4_58ac : reassembles 22700 = true ∧ castsFifteens 22700 = true := by decide

/-- 58ad: nibbles fold back to 22701; digit sum 36 ≡ 22701 (mod 15). -/
theorem enumeration_hex4_58ad : reassembles 22701 = true ∧ castsFifteens 22701 = true := by decide

/-- 58ae: nibbles fold back to 22702; digit sum 37 ≡ 22702 (mod 15). -/
theorem enumeration_hex4_58ae : reassembles 22702 = true ∧ castsFifteens 22702 = true := by decide

/-- 58af: nibbles fold back to 22703; digit sum 38 ≡ 22703 (mod 15). -/
theorem enumeration_hex4_58af : reassembles 22703 = true ∧ castsFifteens 22703 = true := by decide

/-- 58b0: nibbles fold back to 22704; digit sum 24 ≡ 22704 (mod 15). -/
theorem enumeration_hex4_58b0 : reassembles 22704 = true ∧ castsFifteens 22704 = true := by decide

/-- 58b1: nibbles fold back to 22705; digit sum 25 ≡ 22705 (mod 15). -/
theorem enumeration_hex4_58b1 : reassembles 22705 = true ∧ castsFifteens 22705 = true := by decide

/-- 58b2: nibbles fold back to 22706; digit sum 26 ≡ 22706 (mod 15). -/
theorem enumeration_hex4_58b2 : reassembles 22706 = true ∧ castsFifteens 22706 = true := by decide

/-- 58b3: nibbles fold back to 22707; digit sum 27 ≡ 22707 (mod 15). -/
theorem enumeration_hex4_58b3 : reassembles 22707 = true ∧ castsFifteens 22707 = true := by decide

/-- 58b4: nibbles fold back to 22708; digit sum 28 ≡ 22708 (mod 15). -/
theorem enumeration_hex4_58b4 : reassembles 22708 = true ∧ castsFifteens 22708 = true := by decide

/-- 58b5: nibbles fold back to 22709; digit sum 29 ≡ 22709 (mod 15). -/
theorem enumeration_hex4_58b5 : reassembles 22709 = true ∧ castsFifteens 22709 = true := by decide

/-- 58b6: nibbles fold back to 22710; digit sum 30 ≡ 22710 (mod 15). -/
theorem enumeration_hex4_58b6 : reassembles 22710 = true ∧ castsFifteens 22710 = true := by decide

/-- 58b7: nibbles fold back to 22711; digit sum 31 ≡ 22711 (mod 15). -/
theorem enumeration_hex4_58b7 : reassembles 22711 = true ∧ castsFifteens 22711 = true := by decide

/-- 58b8: nibbles fold back to 22712; digit sum 32 ≡ 22712 (mod 15). -/
theorem enumeration_hex4_58b8 : reassembles 22712 = true ∧ castsFifteens 22712 = true := by decide

/-- 58b9: nibbles fold back to 22713; digit sum 33 ≡ 22713 (mod 15). -/
theorem enumeration_hex4_58b9 : reassembles 22713 = true ∧ castsFifteens 22713 = true := by decide

/-- 58ba: nibbles fold back to 22714; digit sum 34 ≡ 22714 (mod 15). -/
theorem enumeration_hex4_58ba : reassembles 22714 = true ∧ castsFifteens 22714 = true := by decide

/-- 58bb: nibbles fold back to 22715; digit sum 35 ≡ 22715 (mod 15). -/
theorem enumeration_hex4_58bb : reassembles 22715 = true ∧ castsFifteens 22715 = true := by decide

/-- 58bc: nibbles fold back to 22716; digit sum 36 ≡ 22716 (mod 15). -/
theorem enumeration_hex4_58bc : reassembles 22716 = true ∧ castsFifteens 22716 = true := by decide

/-- 58bd: nibbles fold back to 22717; digit sum 37 ≡ 22717 (mod 15). -/
theorem enumeration_hex4_58bd : reassembles 22717 = true ∧ castsFifteens 22717 = true := by decide

/-- 58be: nibbles fold back to 22718; digit sum 38 ≡ 22718 (mod 15). -/
theorem enumeration_hex4_58be : reassembles 22718 = true ∧ castsFifteens 22718 = true := by decide

/-- 58bf: nibbles fold back to 22719; digit sum 39 ≡ 22719 (mod 15). -/
theorem enumeration_hex4_58bf : reassembles 22719 = true ∧ castsFifteens 22719 = true := by decide

/-- 58c0: nibbles fold back to 22720; digit sum 25 ≡ 22720 (mod 15). -/
theorem enumeration_hex4_58c0 : reassembles 22720 = true ∧ castsFifteens 22720 = true := by decide

/-- 58c1: nibbles fold back to 22721; digit sum 26 ≡ 22721 (mod 15). -/
theorem enumeration_hex4_58c1 : reassembles 22721 = true ∧ castsFifteens 22721 = true := by decide

/-- 58c2: nibbles fold back to 22722; digit sum 27 ≡ 22722 (mod 15). -/
theorem enumeration_hex4_58c2 : reassembles 22722 = true ∧ castsFifteens 22722 = true := by decide

/-- 58c3: nibbles fold back to 22723; digit sum 28 ≡ 22723 (mod 15). -/
theorem enumeration_hex4_58c3 : reassembles 22723 = true ∧ castsFifteens 22723 = true := by decide

/-- 58c4: nibbles fold back to 22724; digit sum 29 ≡ 22724 (mod 15). -/
theorem enumeration_hex4_58c4 : reassembles 22724 = true ∧ castsFifteens 22724 = true := by decide

/-- 58c5: nibbles fold back to 22725; digit sum 30 ≡ 22725 (mod 15). -/
theorem enumeration_hex4_58c5 : reassembles 22725 = true ∧ castsFifteens 22725 = true := by decide

/-- 58c6: nibbles fold back to 22726; digit sum 31 ≡ 22726 (mod 15). -/
theorem enumeration_hex4_58c6 : reassembles 22726 = true ∧ castsFifteens 22726 = true := by decide

/-- 58c7: nibbles fold back to 22727; digit sum 32 ≡ 22727 (mod 15). -/
theorem enumeration_hex4_58c7 : reassembles 22727 = true ∧ castsFifteens 22727 = true := by decide

/-- 58c8: nibbles fold back to 22728; digit sum 33 ≡ 22728 (mod 15). -/
theorem enumeration_hex4_58c8 : reassembles 22728 = true ∧ castsFifteens 22728 = true := by decide

/-- 58c9: nibbles fold back to 22729; digit sum 34 ≡ 22729 (mod 15). -/
theorem enumeration_hex4_58c9 : reassembles 22729 = true ∧ castsFifteens 22729 = true := by decide

/-- 58ca: nibbles fold back to 22730; digit sum 35 ≡ 22730 (mod 15). -/
theorem enumeration_hex4_58ca : reassembles 22730 = true ∧ castsFifteens 22730 = true := by decide

/-- 58cb: nibbles fold back to 22731; digit sum 36 ≡ 22731 (mod 15). -/
theorem enumeration_hex4_58cb : reassembles 22731 = true ∧ castsFifteens 22731 = true := by decide

/-- 58cc: nibbles fold back to 22732; digit sum 37 ≡ 22732 (mod 15). -/
theorem enumeration_hex4_58cc : reassembles 22732 = true ∧ castsFifteens 22732 = true := by decide

/-- 58cd: nibbles fold back to 22733; digit sum 38 ≡ 22733 (mod 15). -/
theorem enumeration_hex4_58cd : reassembles 22733 = true ∧ castsFifteens 22733 = true := by decide

/-- 58ce: nibbles fold back to 22734; digit sum 39 ≡ 22734 (mod 15). -/
theorem enumeration_hex4_58ce : reassembles 22734 = true ∧ castsFifteens 22734 = true := by decide

/-- 58cf: nibbles fold back to 22735; digit sum 40 ≡ 22735 (mod 15). -/
theorem enumeration_hex4_58cf : reassembles 22735 = true ∧ castsFifteens 22735 = true := by decide

/-- 58d0: nibbles fold back to 22736; digit sum 26 ≡ 22736 (mod 15). -/
theorem enumeration_hex4_58d0 : reassembles 22736 = true ∧ castsFifteens 22736 = true := by decide

/-- 58d1: nibbles fold back to 22737; digit sum 27 ≡ 22737 (mod 15). -/
theorem enumeration_hex4_58d1 : reassembles 22737 = true ∧ castsFifteens 22737 = true := by decide

/-- 58d2: nibbles fold back to 22738; digit sum 28 ≡ 22738 (mod 15). -/
theorem enumeration_hex4_58d2 : reassembles 22738 = true ∧ castsFifteens 22738 = true := by decide

/-- 58d3: nibbles fold back to 22739; digit sum 29 ≡ 22739 (mod 15). -/
theorem enumeration_hex4_58d3 : reassembles 22739 = true ∧ castsFifteens 22739 = true := by decide

/-- 58d4: nibbles fold back to 22740; digit sum 30 ≡ 22740 (mod 15). -/
theorem enumeration_hex4_58d4 : reassembles 22740 = true ∧ castsFifteens 22740 = true := by decide

/-- 58d5: nibbles fold back to 22741; digit sum 31 ≡ 22741 (mod 15). -/
theorem enumeration_hex4_58d5 : reassembles 22741 = true ∧ castsFifteens 22741 = true := by decide

/-- 58d6: nibbles fold back to 22742; digit sum 32 ≡ 22742 (mod 15). -/
theorem enumeration_hex4_58d6 : reassembles 22742 = true ∧ castsFifteens 22742 = true := by decide

/-- 58d7: nibbles fold back to 22743; digit sum 33 ≡ 22743 (mod 15). -/
theorem enumeration_hex4_58d7 : reassembles 22743 = true ∧ castsFifteens 22743 = true := by decide

/-- 58d8: nibbles fold back to 22744; digit sum 34 ≡ 22744 (mod 15). -/
theorem enumeration_hex4_58d8 : reassembles 22744 = true ∧ castsFifteens 22744 = true := by decide

/-- 58d9: nibbles fold back to 22745; digit sum 35 ≡ 22745 (mod 15). -/
theorem enumeration_hex4_58d9 : reassembles 22745 = true ∧ castsFifteens 22745 = true := by decide

/-- 58da: nibbles fold back to 22746; digit sum 36 ≡ 22746 (mod 15). -/
theorem enumeration_hex4_58da : reassembles 22746 = true ∧ castsFifteens 22746 = true := by decide

/-- 58db: nibbles fold back to 22747; digit sum 37 ≡ 22747 (mod 15). -/
theorem enumeration_hex4_58db : reassembles 22747 = true ∧ castsFifteens 22747 = true := by decide

/-- 58dc: nibbles fold back to 22748; digit sum 38 ≡ 22748 (mod 15). -/
theorem enumeration_hex4_58dc : reassembles 22748 = true ∧ castsFifteens 22748 = true := by decide

/-- 58dd: nibbles fold back to 22749; digit sum 39 ≡ 22749 (mod 15). -/
theorem enumeration_hex4_58dd : reassembles 22749 = true ∧ castsFifteens 22749 = true := by decide

/-- 58de: nibbles fold back to 22750; digit sum 40 ≡ 22750 (mod 15). -/
theorem enumeration_hex4_58de : reassembles 22750 = true ∧ castsFifteens 22750 = true := by decide

/-- 58df: nibbles fold back to 22751; digit sum 41 ≡ 22751 (mod 15). -/
theorem enumeration_hex4_58df : reassembles 22751 = true ∧ castsFifteens 22751 = true := by decide

/-- 58e0: nibbles fold back to 22752; digit sum 27 ≡ 22752 (mod 15). -/
theorem enumeration_hex4_58e0 : reassembles 22752 = true ∧ castsFifteens 22752 = true := by decide

/-- 58e1: nibbles fold back to 22753; digit sum 28 ≡ 22753 (mod 15). -/
theorem enumeration_hex4_58e1 : reassembles 22753 = true ∧ castsFifteens 22753 = true := by decide

/-- 58e2: nibbles fold back to 22754; digit sum 29 ≡ 22754 (mod 15). -/
theorem enumeration_hex4_58e2 : reassembles 22754 = true ∧ castsFifteens 22754 = true := by decide

/-- 58e3: nibbles fold back to 22755; digit sum 30 ≡ 22755 (mod 15). -/
theorem enumeration_hex4_58e3 : reassembles 22755 = true ∧ castsFifteens 22755 = true := by decide

/-- 58e4: nibbles fold back to 22756; digit sum 31 ≡ 22756 (mod 15). -/
theorem enumeration_hex4_58e4 : reassembles 22756 = true ∧ castsFifteens 22756 = true := by decide

/-- 58e5: nibbles fold back to 22757; digit sum 32 ≡ 22757 (mod 15). -/
theorem enumeration_hex4_58e5 : reassembles 22757 = true ∧ castsFifteens 22757 = true := by decide

/-- 58e6: nibbles fold back to 22758; digit sum 33 ≡ 22758 (mod 15). -/
theorem enumeration_hex4_58e6 : reassembles 22758 = true ∧ castsFifteens 22758 = true := by decide

/-- 58e7: nibbles fold back to 22759; digit sum 34 ≡ 22759 (mod 15). -/
theorem enumeration_hex4_58e7 : reassembles 22759 = true ∧ castsFifteens 22759 = true := by decide

/-- 58e8: nibbles fold back to 22760; digit sum 35 ≡ 22760 (mod 15). -/
theorem enumeration_hex4_58e8 : reassembles 22760 = true ∧ castsFifteens 22760 = true := by decide

/-- 58e9: nibbles fold back to 22761; digit sum 36 ≡ 22761 (mod 15). -/
theorem enumeration_hex4_58e9 : reassembles 22761 = true ∧ castsFifteens 22761 = true := by decide

/-- 58ea: nibbles fold back to 22762; digit sum 37 ≡ 22762 (mod 15). -/
theorem enumeration_hex4_58ea : reassembles 22762 = true ∧ castsFifteens 22762 = true := by decide

/-- 58eb: nibbles fold back to 22763; digit sum 38 ≡ 22763 (mod 15). -/
theorem enumeration_hex4_58eb : reassembles 22763 = true ∧ castsFifteens 22763 = true := by decide

/-- 58ec: nibbles fold back to 22764; digit sum 39 ≡ 22764 (mod 15). -/
theorem enumeration_hex4_58ec : reassembles 22764 = true ∧ castsFifteens 22764 = true := by decide

/-- 58ed: nibbles fold back to 22765; digit sum 40 ≡ 22765 (mod 15). -/
theorem enumeration_hex4_58ed : reassembles 22765 = true ∧ castsFifteens 22765 = true := by decide

/-- 58ee: nibbles fold back to 22766; digit sum 41 ≡ 22766 (mod 15). -/
theorem enumeration_hex4_58ee : reassembles 22766 = true ∧ castsFifteens 22766 = true := by decide

/-- 58ef: nibbles fold back to 22767; digit sum 42 ≡ 22767 (mod 15). -/
theorem enumeration_hex4_58ef : reassembles 22767 = true ∧ castsFifteens 22767 = true := by decide

/-- 58f0: nibbles fold back to 22768; digit sum 28 ≡ 22768 (mod 15). -/
theorem enumeration_hex4_58f0 : reassembles 22768 = true ∧ castsFifteens 22768 = true := by decide

/-- 58f1: nibbles fold back to 22769; digit sum 29 ≡ 22769 (mod 15). -/
theorem enumeration_hex4_58f1 : reassembles 22769 = true ∧ castsFifteens 22769 = true := by decide

/-- 58f2: nibbles fold back to 22770; digit sum 30 ≡ 22770 (mod 15). -/
theorem enumeration_hex4_58f2 : reassembles 22770 = true ∧ castsFifteens 22770 = true := by decide

/-- 58f3: nibbles fold back to 22771; digit sum 31 ≡ 22771 (mod 15). -/
theorem enumeration_hex4_58f3 : reassembles 22771 = true ∧ castsFifteens 22771 = true := by decide

/-- 58f4: nibbles fold back to 22772; digit sum 32 ≡ 22772 (mod 15). -/
theorem enumeration_hex4_58f4 : reassembles 22772 = true ∧ castsFifteens 22772 = true := by decide

/-- 58f5: nibbles fold back to 22773; digit sum 33 ≡ 22773 (mod 15). -/
theorem enumeration_hex4_58f5 : reassembles 22773 = true ∧ castsFifteens 22773 = true := by decide

/-- 58f6: nibbles fold back to 22774; digit sum 34 ≡ 22774 (mod 15). -/
theorem enumeration_hex4_58f6 : reassembles 22774 = true ∧ castsFifteens 22774 = true := by decide

/-- 58f7: nibbles fold back to 22775; digit sum 35 ≡ 22775 (mod 15). -/
theorem enumeration_hex4_58f7 : reassembles 22775 = true ∧ castsFifteens 22775 = true := by decide

/-- 58f8: nibbles fold back to 22776; digit sum 36 ≡ 22776 (mod 15). -/
theorem enumeration_hex4_58f8 : reassembles 22776 = true ∧ castsFifteens 22776 = true := by decide

/-- 58f9: nibbles fold back to 22777; digit sum 37 ≡ 22777 (mod 15). -/
theorem enumeration_hex4_58f9 : reassembles 22777 = true ∧ castsFifteens 22777 = true := by decide

/-- 58fa: nibbles fold back to 22778; digit sum 38 ≡ 22778 (mod 15). -/
theorem enumeration_hex4_58fa : reassembles 22778 = true ∧ castsFifteens 22778 = true := by decide

/-- 58fb: nibbles fold back to 22779; digit sum 39 ≡ 22779 (mod 15). -/
theorem enumeration_hex4_58fb : reassembles 22779 = true ∧ castsFifteens 22779 = true := by decide

/-- 58fc: nibbles fold back to 22780; digit sum 40 ≡ 22780 (mod 15). -/
theorem enumeration_hex4_58fc : reassembles 22780 = true ∧ castsFifteens 22780 = true := by decide

/-- 58fd: nibbles fold back to 22781; digit sum 41 ≡ 22781 (mod 15). -/
theorem enumeration_hex4_58fd : reassembles 22781 = true ∧ castsFifteens 22781 = true := by decide

/-- 58fe: nibbles fold back to 22782; digit sum 42 ≡ 22782 (mod 15). -/
theorem enumeration_hex4_58fe : reassembles 22782 = true ∧ castsFifteens 22782 = true := by decide

/-- 58ff: nibbles fold back to 22783; digit sum 43 ≡ 22783 (mod 15). -/
theorem enumeration_hex4_58ff : reassembles 22783 = true ∧ castsFifteens 22783 = true := by decide

/-- 5900: nibbles fold back to 22784; digit sum 14 ≡ 22784 (mod 15). -/
theorem enumeration_hex4_5900 : reassembles 22784 = true ∧ castsFifteens 22784 = true := by decide

/-- 5901: nibbles fold back to 22785; digit sum 15 ≡ 22785 (mod 15). -/
theorem enumeration_hex4_5901 : reassembles 22785 = true ∧ castsFifteens 22785 = true := by decide

/-- 5902: nibbles fold back to 22786; digit sum 16 ≡ 22786 (mod 15). -/
theorem enumeration_hex4_5902 : reassembles 22786 = true ∧ castsFifteens 22786 = true := by decide

/-- 5903: nibbles fold back to 22787; digit sum 17 ≡ 22787 (mod 15). -/
theorem enumeration_hex4_5903 : reassembles 22787 = true ∧ castsFifteens 22787 = true := by decide

/-- 5904: nibbles fold back to 22788; digit sum 18 ≡ 22788 (mod 15). -/
theorem enumeration_hex4_5904 : reassembles 22788 = true ∧ castsFifteens 22788 = true := by decide

/-- 5905: nibbles fold back to 22789; digit sum 19 ≡ 22789 (mod 15). -/
theorem enumeration_hex4_5905 : reassembles 22789 = true ∧ castsFifteens 22789 = true := by decide

/-- 5906: nibbles fold back to 22790; digit sum 20 ≡ 22790 (mod 15). -/
theorem enumeration_hex4_5906 : reassembles 22790 = true ∧ castsFifteens 22790 = true := by decide

/-- 5907: nibbles fold back to 22791; digit sum 21 ≡ 22791 (mod 15). -/
theorem enumeration_hex4_5907 : reassembles 22791 = true ∧ castsFifteens 22791 = true := by decide

/-- 5908: nibbles fold back to 22792; digit sum 22 ≡ 22792 (mod 15). -/
theorem enumeration_hex4_5908 : reassembles 22792 = true ∧ castsFifteens 22792 = true := by decide

/-- 5909: nibbles fold back to 22793; digit sum 23 ≡ 22793 (mod 15). -/
theorem enumeration_hex4_5909 : reassembles 22793 = true ∧ castsFifteens 22793 = true := by decide

/-- 590a: nibbles fold back to 22794; digit sum 24 ≡ 22794 (mod 15). -/
theorem enumeration_hex4_590a : reassembles 22794 = true ∧ castsFifteens 22794 = true := by decide

/-- 590b: nibbles fold back to 22795; digit sum 25 ≡ 22795 (mod 15). -/
theorem enumeration_hex4_590b : reassembles 22795 = true ∧ castsFifteens 22795 = true := by decide

/-- 590c: nibbles fold back to 22796; digit sum 26 ≡ 22796 (mod 15). -/
theorem enumeration_hex4_590c : reassembles 22796 = true ∧ castsFifteens 22796 = true := by decide

/-- 590d: nibbles fold back to 22797; digit sum 27 ≡ 22797 (mod 15). -/
theorem enumeration_hex4_590d : reassembles 22797 = true ∧ castsFifteens 22797 = true := by decide

/-- 590e: nibbles fold back to 22798; digit sum 28 ≡ 22798 (mod 15). -/
theorem enumeration_hex4_590e : reassembles 22798 = true ∧ castsFifteens 22798 = true := by decide

/-- 590f: nibbles fold back to 22799; digit sum 29 ≡ 22799 (mod 15). -/
theorem enumeration_hex4_590f : reassembles 22799 = true ∧ castsFifteens 22799 = true := by decide

/-- 5910: nibbles fold back to 22800; digit sum 15 ≡ 22800 (mod 15). -/
theorem enumeration_hex4_5910 : reassembles 22800 = true ∧ castsFifteens 22800 = true := by decide

/-- 5911: nibbles fold back to 22801; digit sum 16 ≡ 22801 (mod 15). -/
theorem enumeration_hex4_5911 : reassembles 22801 = true ∧ castsFifteens 22801 = true := by decide

/-- 5912: nibbles fold back to 22802; digit sum 17 ≡ 22802 (mod 15). -/
theorem enumeration_hex4_5912 : reassembles 22802 = true ∧ castsFifteens 22802 = true := by decide

/-- 5913: nibbles fold back to 22803; digit sum 18 ≡ 22803 (mod 15). -/
theorem enumeration_hex4_5913 : reassembles 22803 = true ∧ castsFifteens 22803 = true := by decide

/-- 5914: nibbles fold back to 22804; digit sum 19 ≡ 22804 (mod 15). -/
theorem enumeration_hex4_5914 : reassembles 22804 = true ∧ castsFifteens 22804 = true := by decide

/-- 5915: nibbles fold back to 22805; digit sum 20 ≡ 22805 (mod 15). -/
theorem enumeration_hex4_5915 : reassembles 22805 = true ∧ castsFifteens 22805 = true := by decide

/-- 5916: nibbles fold back to 22806; digit sum 21 ≡ 22806 (mod 15). -/
theorem enumeration_hex4_5916 : reassembles 22806 = true ∧ castsFifteens 22806 = true := by decide

/-- 5917: nibbles fold back to 22807; digit sum 22 ≡ 22807 (mod 15). -/
theorem enumeration_hex4_5917 : reassembles 22807 = true ∧ castsFifteens 22807 = true := by decide

/-- 5918: nibbles fold back to 22808; digit sum 23 ≡ 22808 (mod 15). -/
theorem enumeration_hex4_5918 : reassembles 22808 = true ∧ castsFifteens 22808 = true := by decide

/-- 5919: nibbles fold back to 22809; digit sum 24 ≡ 22809 (mod 15). -/
theorem enumeration_hex4_5919 : reassembles 22809 = true ∧ castsFifteens 22809 = true := by decide

/-- 591a: nibbles fold back to 22810; digit sum 25 ≡ 22810 (mod 15). -/
theorem enumeration_hex4_591a : reassembles 22810 = true ∧ castsFifteens 22810 = true := by decide

/-- 591b: nibbles fold back to 22811; digit sum 26 ≡ 22811 (mod 15). -/
theorem enumeration_hex4_591b : reassembles 22811 = true ∧ castsFifteens 22811 = true := by decide

/-- 591c: nibbles fold back to 22812; digit sum 27 ≡ 22812 (mod 15). -/
theorem enumeration_hex4_591c : reassembles 22812 = true ∧ castsFifteens 22812 = true := by decide

/-- 591d: nibbles fold back to 22813; digit sum 28 ≡ 22813 (mod 15). -/
theorem enumeration_hex4_591d : reassembles 22813 = true ∧ castsFifteens 22813 = true := by decide

/-- 591e: nibbles fold back to 22814; digit sum 29 ≡ 22814 (mod 15). -/
theorem enumeration_hex4_591e : reassembles 22814 = true ∧ castsFifteens 22814 = true := by decide

/-- 591f: nibbles fold back to 22815; digit sum 30 ≡ 22815 (mod 15). -/
theorem enumeration_hex4_591f : reassembles 22815 = true ∧ castsFifteens 22815 = true := by decide

/-- 5920: nibbles fold back to 22816; digit sum 16 ≡ 22816 (mod 15). -/
theorem enumeration_hex4_5920 : reassembles 22816 = true ∧ castsFifteens 22816 = true := by decide

/-- 5921: nibbles fold back to 22817; digit sum 17 ≡ 22817 (mod 15). -/
theorem enumeration_hex4_5921 : reassembles 22817 = true ∧ castsFifteens 22817 = true := by decide

/-- 5922: nibbles fold back to 22818; digit sum 18 ≡ 22818 (mod 15). -/
theorem enumeration_hex4_5922 : reassembles 22818 = true ∧ castsFifteens 22818 = true := by decide

/-- 5923: nibbles fold back to 22819; digit sum 19 ≡ 22819 (mod 15). -/
theorem enumeration_hex4_5923 : reassembles 22819 = true ∧ castsFifteens 22819 = true := by decide

/-- 5924: nibbles fold back to 22820; digit sum 20 ≡ 22820 (mod 15). -/
theorem enumeration_hex4_5924 : reassembles 22820 = true ∧ castsFifteens 22820 = true := by decide

/-- 5925: nibbles fold back to 22821; digit sum 21 ≡ 22821 (mod 15). -/
theorem enumeration_hex4_5925 : reassembles 22821 = true ∧ castsFifteens 22821 = true := by decide

/-- 5926: nibbles fold back to 22822; digit sum 22 ≡ 22822 (mod 15). -/
theorem enumeration_hex4_5926 : reassembles 22822 = true ∧ castsFifteens 22822 = true := by decide

/-- 5927: nibbles fold back to 22823; digit sum 23 ≡ 22823 (mod 15). -/
theorem enumeration_hex4_5927 : reassembles 22823 = true ∧ castsFifteens 22823 = true := by decide

/-- 5928: nibbles fold back to 22824; digit sum 24 ≡ 22824 (mod 15). -/
theorem enumeration_hex4_5928 : reassembles 22824 = true ∧ castsFifteens 22824 = true := by decide

/-- 5929: nibbles fold back to 22825; digit sum 25 ≡ 22825 (mod 15). -/
theorem enumeration_hex4_5929 : reassembles 22825 = true ∧ castsFifteens 22825 = true := by decide

/-- 592a: nibbles fold back to 22826; digit sum 26 ≡ 22826 (mod 15). -/
theorem enumeration_hex4_592a : reassembles 22826 = true ∧ castsFifteens 22826 = true := by decide

/-- 592b: nibbles fold back to 22827; digit sum 27 ≡ 22827 (mod 15). -/
theorem enumeration_hex4_592b : reassembles 22827 = true ∧ castsFifteens 22827 = true := by decide

/-- 592c: nibbles fold back to 22828; digit sum 28 ≡ 22828 (mod 15). -/
theorem enumeration_hex4_592c : reassembles 22828 = true ∧ castsFifteens 22828 = true := by decide

/-- 592d: nibbles fold back to 22829; digit sum 29 ≡ 22829 (mod 15). -/
theorem enumeration_hex4_592d : reassembles 22829 = true ∧ castsFifteens 22829 = true := by decide

/-- 592e: nibbles fold back to 22830; digit sum 30 ≡ 22830 (mod 15). -/
theorem enumeration_hex4_592e : reassembles 22830 = true ∧ castsFifteens 22830 = true := by decide

/-- 592f: nibbles fold back to 22831; digit sum 31 ≡ 22831 (mod 15). -/
theorem enumeration_hex4_592f : reassembles 22831 = true ∧ castsFifteens 22831 = true := by decide

/-- 5930: nibbles fold back to 22832; digit sum 17 ≡ 22832 (mod 15). -/
theorem enumeration_hex4_5930 : reassembles 22832 = true ∧ castsFifteens 22832 = true := by decide

/-- 5931: nibbles fold back to 22833; digit sum 18 ≡ 22833 (mod 15). -/
theorem enumeration_hex4_5931 : reassembles 22833 = true ∧ castsFifteens 22833 = true := by decide

/-- 5932: nibbles fold back to 22834; digit sum 19 ≡ 22834 (mod 15). -/
theorem enumeration_hex4_5932 : reassembles 22834 = true ∧ castsFifteens 22834 = true := by decide

/-- 5933: nibbles fold back to 22835; digit sum 20 ≡ 22835 (mod 15). -/
theorem enumeration_hex4_5933 : reassembles 22835 = true ∧ castsFifteens 22835 = true := by decide

/-- 5934: nibbles fold back to 22836; digit sum 21 ≡ 22836 (mod 15). -/
theorem enumeration_hex4_5934 : reassembles 22836 = true ∧ castsFifteens 22836 = true := by decide

/-- 5935: nibbles fold back to 22837; digit sum 22 ≡ 22837 (mod 15). -/
theorem enumeration_hex4_5935 : reassembles 22837 = true ∧ castsFifteens 22837 = true := by decide

/-- 5936: nibbles fold back to 22838; digit sum 23 ≡ 22838 (mod 15). -/
theorem enumeration_hex4_5936 : reassembles 22838 = true ∧ castsFifteens 22838 = true := by decide

/-- 5937: nibbles fold back to 22839; digit sum 24 ≡ 22839 (mod 15). -/
theorem enumeration_hex4_5937 : reassembles 22839 = true ∧ castsFifteens 22839 = true := by decide

/-- 5938: nibbles fold back to 22840; digit sum 25 ≡ 22840 (mod 15). -/
theorem enumeration_hex4_5938 : reassembles 22840 = true ∧ castsFifteens 22840 = true := by decide

/-- 5939: nibbles fold back to 22841; digit sum 26 ≡ 22841 (mod 15). -/
theorem enumeration_hex4_5939 : reassembles 22841 = true ∧ castsFifteens 22841 = true := by decide

/-- 593a: nibbles fold back to 22842; digit sum 27 ≡ 22842 (mod 15). -/
theorem enumeration_hex4_593a : reassembles 22842 = true ∧ castsFifteens 22842 = true := by decide

/-- 593b: nibbles fold back to 22843; digit sum 28 ≡ 22843 (mod 15). -/
theorem enumeration_hex4_593b : reassembles 22843 = true ∧ castsFifteens 22843 = true := by decide

/-- 593c: nibbles fold back to 22844; digit sum 29 ≡ 22844 (mod 15). -/
theorem enumeration_hex4_593c : reassembles 22844 = true ∧ castsFifteens 22844 = true := by decide

/-- 593d: nibbles fold back to 22845; digit sum 30 ≡ 22845 (mod 15). -/
theorem enumeration_hex4_593d : reassembles 22845 = true ∧ castsFifteens 22845 = true := by decide

/-- 593e: nibbles fold back to 22846; digit sum 31 ≡ 22846 (mod 15). -/
theorem enumeration_hex4_593e : reassembles 22846 = true ∧ castsFifteens 22846 = true := by decide

/-- 593f: nibbles fold back to 22847; digit sum 32 ≡ 22847 (mod 15). -/
theorem enumeration_hex4_593f : reassembles 22847 = true ∧ castsFifteens 22847 = true := by decide

/-- 5940: nibbles fold back to 22848; digit sum 18 ≡ 22848 (mod 15). -/
theorem enumeration_hex4_5940 : reassembles 22848 = true ∧ castsFifteens 22848 = true := by decide

/-- 5941: nibbles fold back to 22849; digit sum 19 ≡ 22849 (mod 15). -/
theorem enumeration_hex4_5941 : reassembles 22849 = true ∧ castsFifteens 22849 = true := by decide

/-- 5942: nibbles fold back to 22850; digit sum 20 ≡ 22850 (mod 15). -/
theorem enumeration_hex4_5942 : reassembles 22850 = true ∧ castsFifteens 22850 = true := by decide

/-- 5943: nibbles fold back to 22851; digit sum 21 ≡ 22851 (mod 15). -/
theorem enumeration_hex4_5943 : reassembles 22851 = true ∧ castsFifteens 22851 = true := by decide

/-- 5944: nibbles fold back to 22852; digit sum 22 ≡ 22852 (mod 15). -/
theorem enumeration_hex4_5944 : reassembles 22852 = true ∧ castsFifteens 22852 = true := by decide

/-- 5945: nibbles fold back to 22853; digit sum 23 ≡ 22853 (mod 15). -/
theorem enumeration_hex4_5945 : reassembles 22853 = true ∧ castsFifteens 22853 = true := by decide

/-- 5946: nibbles fold back to 22854; digit sum 24 ≡ 22854 (mod 15). -/
theorem enumeration_hex4_5946 : reassembles 22854 = true ∧ castsFifteens 22854 = true := by decide

/-- 5947: nibbles fold back to 22855; digit sum 25 ≡ 22855 (mod 15). -/
theorem enumeration_hex4_5947 : reassembles 22855 = true ∧ castsFifteens 22855 = true := by decide

/-- 5948: nibbles fold back to 22856; digit sum 26 ≡ 22856 (mod 15). -/
theorem enumeration_hex4_5948 : reassembles 22856 = true ∧ castsFifteens 22856 = true := by decide

/-- 5949: nibbles fold back to 22857; digit sum 27 ≡ 22857 (mod 15). -/
theorem enumeration_hex4_5949 : reassembles 22857 = true ∧ castsFifteens 22857 = true := by decide

/-- 594a: nibbles fold back to 22858; digit sum 28 ≡ 22858 (mod 15). -/
theorem enumeration_hex4_594a : reassembles 22858 = true ∧ castsFifteens 22858 = true := by decide

/-- 594b: nibbles fold back to 22859; digit sum 29 ≡ 22859 (mod 15). -/
theorem enumeration_hex4_594b : reassembles 22859 = true ∧ castsFifteens 22859 = true := by decide

/-- 594c: nibbles fold back to 22860; digit sum 30 ≡ 22860 (mod 15). -/
theorem enumeration_hex4_594c : reassembles 22860 = true ∧ castsFifteens 22860 = true := by decide

/-- 594d: nibbles fold back to 22861; digit sum 31 ≡ 22861 (mod 15). -/
theorem enumeration_hex4_594d : reassembles 22861 = true ∧ castsFifteens 22861 = true := by decide

/-- 594e: nibbles fold back to 22862; digit sum 32 ≡ 22862 (mod 15). -/
theorem enumeration_hex4_594e : reassembles 22862 = true ∧ castsFifteens 22862 = true := by decide

/-- 594f: nibbles fold back to 22863; digit sum 33 ≡ 22863 (mod 15). -/
theorem enumeration_hex4_594f : reassembles 22863 = true ∧ castsFifteens 22863 = true := by decide

/-- 5950: nibbles fold back to 22864; digit sum 19 ≡ 22864 (mod 15). -/
theorem enumeration_hex4_5950 : reassembles 22864 = true ∧ castsFifteens 22864 = true := by decide

/-- 5951: nibbles fold back to 22865; digit sum 20 ≡ 22865 (mod 15). -/
theorem enumeration_hex4_5951 : reassembles 22865 = true ∧ castsFifteens 22865 = true := by decide

/-- 5952: nibbles fold back to 22866; digit sum 21 ≡ 22866 (mod 15). -/
theorem enumeration_hex4_5952 : reassembles 22866 = true ∧ castsFifteens 22866 = true := by decide

/-- 5953: nibbles fold back to 22867; digit sum 22 ≡ 22867 (mod 15). -/
theorem enumeration_hex4_5953 : reassembles 22867 = true ∧ castsFifteens 22867 = true := by decide

/-- 5954: nibbles fold back to 22868; digit sum 23 ≡ 22868 (mod 15). -/
theorem enumeration_hex4_5954 : reassembles 22868 = true ∧ castsFifteens 22868 = true := by decide

/-- 5955: nibbles fold back to 22869; digit sum 24 ≡ 22869 (mod 15). -/
theorem enumeration_hex4_5955 : reassembles 22869 = true ∧ castsFifteens 22869 = true := by decide

/-- 5956: nibbles fold back to 22870; digit sum 25 ≡ 22870 (mod 15). -/
theorem enumeration_hex4_5956 : reassembles 22870 = true ∧ castsFifteens 22870 = true := by decide

/-- 5957: nibbles fold back to 22871; digit sum 26 ≡ 22871 (mod 15). -/
theorem enumeration_hex4_5957 : reassembles 22871 = true ∧ castsFifteens 22871 = true := by decide

/-- 5958: nibbles fold back to 22872; digit sum 27 ≡ 22872 (mod 15). -/
theorem enumeration_hex4_5958 : reassembles 22872 = true ∧ castsFifteens 22872 = true := by decide

/-- 5959: nibbles fold back to 22873; digit sum 28 ≡ 22873 (mod 15). -/
theorem enumeration_hex4_5959 : reassembles 22873 = true ∧ castsFifteens 22873 = true := by decide

/-- 595a: nibbles fold back to 22874; digit sum 29 ≡ 22874 (mod 15). -/
theorem enumeration_hex4_595a : reassembles 22874 = true ∧ castsFifteens 22874 = true := by decide

/-- 595b: nibbles fold back to 22875; digit sum 30 ≡ 22875 (mod 15). -/
theorem enumeration_hex4_595b : reassembles 22875 = true ∧ castsFifteens 22875 = true := by decide

/-- 595c: nibbles fold back to 22876; digit sum 31 ≡ 22876 (mod 15). -/
theorem enumeration_hex4_595c : reassembles 22876 = true ∧ castsFifteens 22876 = true := by decide

/-- 595d: nibbles fold back to 22877; digit sum 32 ≡ 22877 (mod 15). -/
theorem enumeration_hex4_595d : reassembles 22877 = true ∧ castsFifteens 22877 = true := by decide

/-- 595e: nibbles fold back to 22878; digit sum 33 ≡ 22878 (mod 15). -/
theorem enumeration_hex4_595e : reassembles 22878 = true ∧ castsFifteens 22878 = true := by decide

/-- 595f: nibbles fold back to 22879; digit sum 34 ≡ 22879 (mod 15). -/
theorem enumeration_hex4_595f : reassembles 22879 = true ∧ castsFifteens 22879 = true := by decide

/-- 5960: nibbles fold back to 22880; digit sum 20 ≡ 22880 (mod 15). -/
theorem enumeration_hex4_5960 : reassembles 22880 = true ∧ castsFifteens 22880 = true := by decide

/-- 5961: nibbles fold back to 22881; digit sum 21 ≡ 22881 (mod 15). -/
theorem enumeration_hex4_5961 : reassembles 22881 = true ∧ castsFifteens 22881 = true := by decide

/-- 5962: nibbles fold back to 22882; digit sum 22 ≡ 22882 (mod 15). -/
theorem enumeration_hex4_5962 : reassembles 22882 = true ∧ castsFifteens 22882 = true := by decide

/-- 5963: nibbles fold back to 22883; digit sum 23 ≡ 22883 (mod 15). -/
theorem enumeration_hex4_5963 : reassembles 22883 = true ∧ castsFifteens 22883 = true := by decide

/-- 5964: nibbles fold back to 22884; digit sum 24 ≡ 22884 (mod 15). -/
theorem enumeration_hex4_5964 : reassembles 22884 = true ∧ castsFifteens 22884 = true := by decide

/-- 5965: nibbles fold back to 22885; digit sum 25 ≡ 22885 (mod 15). -/
theorem enumeration_hex4_5965 : reassembles 22885 = true ∧ castsFifteens 22885 = true := by decide

/-- 5966: nibbles fold back to 22886; digit sum 26 ≡ 22886 (mod 15). -/
theorem enumeration_hex4_5966 : reassembles 22886 = true ∧ castsFifteens 22886 = true := by decide

/-- 5967: nibbles fold back to 22887; digit sum 27 ≡ 22887 (mod 15). -/
theorem enumeration_hex4_5967 : reassembles 22887 = true ∧ castsFifteens 22887 = true := by decide

/-- 5968: nibbles fold back to 22888; digit sum 28 ≡ 22888 (mod 15). -/
theorem enumeration_hex4_5968 : reassembles 22888 = true ∧ castsFifteens 22888 = true := by decide

/-- 5969: nibbles fold back to 22889; digit sum 29 ≡ 22889 (mod 15). -/
theorem enumeration_hex4_5969 : reassembles 22889 = true ∧ castsFifteens 22889 = true := by decide

/-- 596a: nibbles fold back to 22890; digit sum 30 ≡ 22890 (mod 15). -/
theorem enumeration_hex4_596a : reassembles 22890 = true ∧ castsFifteens 22890 = true := by decide

/-- 596b: nibbles fold back to 22891; digit sum 31 ≡ 22891 (mod 15). -/
theorem enumeration_hex4_596b : reassembles 22891 = true ∧ castsFifteens 22891 = true := by decide

/-- 596c: nibbles fold back to 22892; digit sum 32 ≡ 22892 (mod 15). -/
theorem enumeration_hex4_596c : reassembles 22892 = true ∧ castsFifteens 22892 = true := by decide

/-- 596d: nibbles fold back to 22893; digit sum 33 ≡ 22893 (mod 15). -/
theorem enumeration_hex4_596d : reassembles 22893 = true ∧ castsFifteens 22893 = true := by decide

/-- 596e: nibbles fold back to 22894; digit sum 34 ≡ 22894 (mod 15). -/
theorem enumeration_hex4_596e : reassembles 22894 = true ∧ castsFifteens 22894 = true := by decide

/-- 596f: nibbles fold back to 22895; digit sum 35 ≡ 22895 (mod 15). -/
theorem enumeration_hex4_596f : reassembles 22895 = true ∧ castsFifteens 22895 = true := by decide

/-- 5970: nibbles fold back to 22896; digit sum 21 ≡ 22896 (mod 15). -/
theorem enumeration_hex4_5970 : reassembles 22896 = true ∧ castsFifteens 22896 = true := by decide

/-- 5971: nibbles fold back to 22897; digit sum 22 ≡ 22897 (mod 15). -/
theorem enumeration_hex4_5971 : reassembles 22897 = true ∧ castsFifteens 22897 = true := by decide

/-- 5972: nibbles fold back to 22898; digit sum 23 ≡ 22898 (mod 15). -/
theorem enumeration_hex4_5972 : reassembles 22898 = true ∧ castsFifteens 22898 = true := by decide

/-- 5973: nibbles fold back to 22899; digit sum 24 ≡ 22899 (mod 15). -/
theorem enumeration_hex4_5973 : reassembles 22899 = true ∧ castsFifteens 22899 = true := by decide

/-- 5974: nibbles fold back to 22900; digit sum 25 ≡ 22900 (mod 15). -/
theorem enumeration_hex4_5974 : reassembles 22900 = true ∧ castsFifteens 22900 = true := by decide

/-- 5975: nibbles fold back to 22901; digit sum 26 ≡ 22901 (mod 15). -/
theorem enumeration_hex4_5975 : reassembles 22901 = true ∧ castsFifteens 22901 = true := by decide

/-- 5976: nibbles fold back to 22902; digit sum 27 ≡ 22902 (mod 15). -/
theorem enumeration_hex4_5976 : reassembles 22902 = true ∧ castsFifteens 22902 = true := by decide

/-- 5977: nibbles fold back to 22903; digit sum 28 ≡ 22903 (mod 15). -/
theorem enumeration_hex4_5977 : reassembles 22903 = true ∧ castsFifteens 22903 = true := by decide

/-- 5978: nibbles fold back to 22904; digit sum 29 ≡ 22904 (mod 15). -/
theorem enumeration_hex4_5978 : reassembles 22904 = true ∧ castsFifteens 22904 = true := by decide

/-- 5979: nibbles fold back to 22905; digit sum 30 ≡ 22905 (mod 15). -/
theorem enumeration_hex4_5979 : reassembles 22905 = true ∧ castsFifteens 22905 = true := by decide

/-- 597a: nibbles fold back to 22906; digit sum 31 ≡ 22906 (mod 15). -/
theorem enumeration_hex4_597a : reassembles 22906 = true ∧ castsFifteens 22906 = true := by decide

/-- 597b: nibbles fold back to 22907; digit sum 32 ≡ 22907 (mod 15). -/
theorem enumeration_hex4_597b : reassembles 22907 = true ∧ castsFifteens 22907 = true := by decide

/-- 597c: nibbles fold back to 22908; digit sum 33 ≡ 22908 (mod 15). -/
theorem enumeration_hex4_597c : reassembles 22908 = true ∧ castsFifteens 22908 = true := by decide

/-- 597d: nibbles fold back to 22909; digit sum 34 ≡ 22909 (mod 15). -/
theorem enumeration_hex4_597d : reassembles 22909 = true ∧ castsFifteens 22909 = true := by decide

/-- 597e: nibbles fold back to 22910; digit sum 35 ≡ 22910 (mod 15). -/
theorem enumeration_hex4_597e : reassembles 22910 = true ∧ castsFifteens 22910 = true := by decide

/-- 597f: nibbles fold back to 22911; digit sum 36 ≡ 22911 (mod 15). -/
theorem enumeration_hex4_597f : reassembles 22911 = true ∧ castsFifteens 22911 = true := by decide

/-- 5980: nibbles fold back to 22912; digit sum 22 ≡ 22912 (mod 15). -/
theorem enumeration_hex4_5980 : reassembles 22912 = true ∧ castsFifteens 22912 = true := by decide

/-- 5981: nibbles fold back to 22913; digit sum 23 ≡ 22913 (mod 15). -/
theorem enumeration_hex4_5981 : reassembles 22913 = true ∧ castsFifteens 22913 = true := by decide

/-- 5982: nibbles fold back to 22914; digit sum 24 ≡ 22914 (mod 15). -/
theorem enumeration_hex4_5982 : reassembles 22914 = true ∧ castsFifteens 22914 = true := by decide

/-- 5983: nibbles fold back to 22915; digit sum 25 ≡ 22915 (mod 15). -/
theorem enumeration_hex4_5983 : reassembles 22915 = true ∧ castsFifteens 22915 = true := by decide

/-- 5984: nibbles fold back to 22916; digit sum 26 ≡ 22916 (mod 15). -/
theorem enumeration_hex4_5984 : reassembles 22916 = true ∧ castsFifteens 22916 = true := by decide

/-- 5985: nibbles fold back to 22917; digit sum 27 ≡ 22917 (mod 15). -/
theorem enumeration_hex4_5985 : reassembles 22917 = true ∧ castsFifteens 22917 = true := by decide

/-- 5986: nibbles fold back to 22918; digit sum 28 ≡ 22918 (mod 15). -/
theorem enumeration_hex4_5986 : reassembles 22918 = true ∧ castsFifteens 22918 = true := by decide

/-- 5987: nibbles fold back to 22919; digit sum 29 ≡ 22919 (mod 15). -/
theorem enumeration_hex4_5987 : reassembles 22919 = true ∧ castsFifteens 22919 = true := by decide

/-- 5988: nibbles fold back to 22920; digit sum 30 ≡ 22920 (mod 15). -/
theorem enumeration_hex4_5988 : reassembles 22920 = true ∧ castsFifteens 22920 = true := by decide

/-- 5989: nibbles fold back to 22921; digit sum 31 ≡ 22921 (mod 15). -/
theorem enumeration_hex4_5989 : reassembles 22921 = true ∧ castsFifteens 22921 = true := by decide

/-- 598a: nibbles fold back to 22922; digit sum 32 ≡ 22922 (mod 15). -/
theorem enumeration_hex4_598a : reassembles 22922 = true ∧ castsFifteens 22922 = true := by decide

/-- 598b: nibbles fold back to 22923; digit sum 33 ≡ 22923 (mod 15). -/
theorem enumeration_hex4_598b : reassembles 22923 = true ∧ castsFifteens 22923 = true := by decide

/-- 598c: nibbles fold back to 22924; digit sum 34 ≡ 22924 (mod 15). -/
theorem enumeration_hex4_598c : reassembles 22924 = true ∧ castsFifteens 22924 = true := by decide

/-- 598d: nibbles fold back to 22925; digit sum 35 ≡ 22925 (mod 15). -/
theorem enumeration_hex4_598d : reassembles 22925 = true ∧ castsFifteens 22925 = true := by decide

/-- 598e: nibbles fold back to 22926; digit sum 36 ≡ 22926 (mod 15). -/
theorem enumeration_hex4_598e : reassembles 22926 = true ∧ castsFifteens 22926 = true := by decide

/-- 598f: nibbles fold back to 22927; digit sum 37 ≡ 22927 (mod 15). -/
theorem enumeration_hex4_598f : reassembles 22927 = true ∧ castsFifteens 22927 = true := by decide

/-- 5990: nibbles fold back to 22928; digit sum 23 ≡ 22928 (mod 15). -/
theorem enumeration_hex4_5990 : reassembles 22928 = true ∧ castsFifteens 22928 = true := by decide

/-- 5991: nibbles fold back to 22929; digit sum 24 ≡ 22929 (mod 15). -/
theorem enumeration_hex4_5991 : reassembles 22929 = true ∧ castsFifteens 22929 = true := by decide

/-- 5992: nibbles fold back to 22930; digit sum 25 ≡ 22930 (mod 15). -/
theorem enumeration_hex4_5992 : reassembles 22930 = true ∧ castsFifteens 22930 = true := by decide

/-- 5993: nibbles fold back to 22931; digit sum 26 ≡ 22931 (mod 15). -/
theorem enumeration_hex4_5993 : reassembles 22931 = true ∧ castsFifteens 22931 = true := by decide

/-- 5994: nibbles fold back to 22932; digit sum 27 ≡ 22932 (mod 15). -/
theorem enumeration_hex4_5994 : reassembles 22932 = true ∧ castsFifteens 22932 = true := by decide

/-- 5995: nibbles fold back to 22933; digit sum 28 ≡ 22933 (mod 15). -/
theorem enumeration_hex4_5995 : reassembles 22933 = true ∧ castsFifteens 22933 = true := by decide

/-- 5996: nibbles fold back to 22934; digit sum 29 ≡ 22934 (mod 15). -/
theorem enumeration_hex4_5996 : reassembles 22934 = true ∧ castsFifteens 22934 = true := by decide

/-- 5997: nibbles fold back to 22935; digit sum 30 ≡ 22935 (mod 15). -/
theorem enumeration_hex4_5997 : reassembles 22935 = true ∧ castsFifteens 22935 = true := by decide

/-- 5998: nibbles fold back to 22936; digit sum 31 ≡ 22936 (mod 15). -/
theorem enumeration_hex4_5998 : reassembles 22936 = true ∧ castsFifteens 22936 = true := by decide

/-- 5999: nibbles fold back to 22937; digit sum 32 ≡ 22937 (mod 15). -/
theorem enumeration_hex4_5999 : reassembles 22937 = true ∧ castsFifteens 22937 = true := by decide

/-- 599a: nibbles fold back to 22938; digit sum 33 ≡ 22938 (mod 15). -/
theorem enumeration_hex4_599a : reassembles 22938 = true ∧ castsFifteens 22938 = true := by decide

/-- 599b: nibbles fold back to 22939; digit sum 34 ≡ 22939 (mod 15). -/
theorem enumeration_hex4_599b : reassembles 22939 = true ∧ castsFifteens 22939 = true := by decide

/-- 599c: nibbles fold back to 22940; digit sum 35 ≡ 22940 (mod 15). -/
theorem enumeration_hex4_599c : reassembles 22940 = true ∧ castsFifteens 22940 = true := by decide

/-- 599d: nibbles fold back to 22941; digit sum 36 ≡ 22941 (mod 15). -/
theorem enumeration_hex4_599d : reassembles 22941 = true ∧ castsFifteens 22941 = true := by decide

/-- 599e: nibbles fold back to 22942; digit sum 37 ≡ 22942 (mod 15). -/
theorem enumeration_hex4_599e : reassembles 22942 = true ∧ castsFifteens 22942 = true := by decide

/-- 599f: nibbles fold back to 22943; digit sum 38 ≡ 22943 (mod 15). -/
theorem enumeration_hex4_599f : reassembles 22943 = true ∧ castsFifteens 22943 = true := by decide

/-- 59a0: nibbles fold back to 22944; digit sum 24 ≡ 22944 (mod 15). -/
theorem enumeration_hex4_59a0 : reassembles 22944 = true ∧ castsFifteens 22944 = true := by decide

/-- 59a1: nibbles fold back to 22945; digit sum 25 ≡ 22945 (mod 15). -/
theorem enumeration_hex4_59a1 : reassembles 22945 = true ∧ castsFifteens 22945 = true := by decide

/-- 59a2: nibbles fold back to 22946; digit sum 26 ≡ 22946 (mod 15). -/
theorem enumeration_hex4_59a2 : reassembles 22946 = true ∧ castsFifteens 22946 = true := by decide

/-- 59a3: nibbles fold back to 22947; digit sum 27 ≡ 22947 (mod 15). -/
theorem enumeration_hex4_59a3 : reassembles 22947 = true ∧ castsFifteens 22947 = true := by decide

/-- 59a4: nibbles fold back to 22948; digit sum 28 ≡ 22948 (mod 15). -/
theorem enumeration_hex4_59a4 : reassembles 22948 = true ∧ castsFifteens 22948 = true := by decide

/-- 59a5: nibbles fold back to 22949; digit sum 29 ≡ 22949 (mod 15). -/
theorem enumeration_hex4_59a5 : reassembles 22949 = true ∧ castsFifteens 22949 = true := by decide

/-- 59a6: nibbles fold back to 22950; digit sum 30 ≡ 22950 (mod 15). -/
theorem enumeration_hex4_59a6 : reassembles 22950 = true ∧ castsFifteens 22950 = true := by decide

/-- 59a7: nibbles fold back to 22951; digit sum 31 ≡ 22951 (mod 15). -/
theorem enumeration_hex4_59a7 : reassembles 22951 = true ∧ castsFifteens 22951 = true := by decide

/-- 59a8: nibbles fold back to 22952; digit sum 32 ≡ 22952 (mod 15). -/
theorem enumeration_hex4_59a8 : reassembles 22952 = true ∧ castsFifteens 22952 = true := by decide

/-- 59a9: nibbles fold back to 22953; digit sum 33 ≡ 22953 (mod 15). -/
theorem enumeration_hex4_59a9 : reassembles 22953 = true ∧ castsFifteens 22953 = true := by decide

/-- 59aa: nibbles fold back to 22954; digit sum 34 ≡ 22954 (mod 15). -/
theorem enumeration_hex4_59aa : reassembles 22954 = true ∧ castsFifteens 22954 = true := by decide

/-- 59ab: nibbles fold back to 22955; digit sum 35 ≡ 22955 (mod 15). -/
theorem enumeration_hex4_59ab : reassembles 22955 = true ∧ castsFifteens 22955 = true := by decide

/-- 59ac: nibbles fold back to 22956; digit sum 36 ≡ 22956 (mod 15). -/
theorem enumeration_hex4_59ac : reassembles 22956 = true ∧ castsFifteens 22956 = true := by decide

/-- 59ad: nibbles fold back to 22957; digit sum 37 ≡ 22957 (mod 15). -/
theorem enumeration_hex4_59ad : reassembles 22957 = true ∧ castsFifteens 22957 = true := by decide

/-- 59ae: nibbles fold back to 22958; digit sum 38 ≡ 22958 (mod 15). -/
theorem enumeration_hex4_59ae : reassembles 22958 = true ∧ castsFifteens 22958 = true := by decide

/-- 59af: nibbles fold back to 22959; digit sum 39 ≡ 22959 (mod 15). -/
theorem enumeration_hex4_59af : reassembles 22959 = true ∧ castsFifteens 22959 = true := by decide

/-- 59b0: nibbles fold back to 22960; digit sum 25 ≡ 22960 (mod 15). -/
theorem enumeration_hex4_59b0 : reassembles 22960 = true ∧ castsFifteens 22960 = true := by decide

/-- 59b1: nibbles fold back to 22961; digit sum 26 ≡ 22961 (mod 15). -/
theorem enumeration_hex4_59b1 : reassembles 22961 = true ∧ castsFifteens 22961 = true := by decide

/-- 59b2: nibbles fold back to 22962; digit sum 27 ≡ 22962 (mod 15). -/
theorem enumeration_hex4_59b2 : reassembles 22962 = true ∧ castsFifteens 22962 = true := by decide

/-- 59b3: nibbles fold back to 22963; digit sum 28 ≡ 22963 (mod 15). -/
theorem enumeration_hex4_59b3 : reassembles 22963 = true ∧ castsFifteens 22963 = true := by decide

/-- 59b4: nibbles fold back to 22964; digit sum 29 ≡ 22964 (mod 15). -/
theorem enumeration_hex4_59b4 : reassembles 22964 = true ∧ castsFifteens 22964 = true := by decide

/-- 59b5: nibbles fold back to 22965; digit sum 30 ≡ 22965 (mod 15). -/
theorem enumeration_hex4_59b5 : reassembles 22965 = true ∧ castsFifteens 22965 = true := by decide

/-- 59b6: nibbles fold back to 22966; digit sum 31 ≡ 22966 (mod 15). -/
theorem enumeration_hex4_59b6 : reassembles 22966 = true ∧ castsFifteens 22966 = true := by decide

/-- 59b7: nibbles fold back to 22967; digit sum 32 ≡ 22967 (mod 15). -/
theorem enumeration_hex4_59b7 : reassembles 22967 = true ∧ castsFifteens 22967 = true := by decide

/-- 59b8: nibbles fold back to 22968; digit sum 33 ≡ 22968 (mod 15). -/
theorem enumeration_hex4_59b8 : reassembles 22968 = true ∧ castsFifteens 22968 = true := by decide

/-- 59b9: nibbles fold back to 22969; digit sum 34 ≡ 22969 (mod 15). -/
theorem enumeration_hex4_59b9 : reassembles 22969 = true ∧ castsFifteens 22969 = true := by decide

/-- 59ba: nibbles fold back to 22970; digit sum 35 ≡ 22970 (mod 15). -/
theorem enumeration_hex4_59ba : reassembles 22970 = true ∧ castsFifteens 22970 = true := by decide

/-- 59bb: nibbles fold back to 22971; digit sum 36 ≡ 22971 (mod 15). -/
theorem enumeration_hex4_59bb : reassembles 22971 = true ∧ castsFifteens 22971 = true := by decide

/-- 59bc: nibbles fold back to 22972; digit sum 37 ≡ 22972 (mod 15). -/
theorem enumeration_hex4_59bc : reassembles 22972 = true ∧ castsFifteens 22972 = true := by decide

/-- 59bd: nibbles fold back to 22973; digit sum 38 ≡ 22973 (mod 15). -/
theorem enumeration_hex4_59bd : reassembles 22973 = true ∧ castsFifteens 22973 = true := by decide

/-- 59be: nibbles fold back to 22974; digit sum 39 ≡ 22974 (mod 15). -/
theorem enumeration_hex4_59be : reassembles 22974 = true ∧ castsFifteens 22974 = true := by decide

/-- 59bf: nibbles fold back to 22975; digit sum 40 ≡ 22975 (mod 15). -/
theorem enumeration_hex4_59bf : reassembles 22975 = true ∧ castsFifteens 22975 = true := by decide

/-- 59c0: nibbles fold back to 22976; digit sum 26 ≡ 22976 (mod 15). -/
theorem enumeration_hex4_59c0 : reassembles 22976 = true ∧ castsFifteens 22976 = true := by decide

/-- 59c1: nibbles fold back to 22977; digit sum 27 ≡ 22977 (mod 15). -/
theorem enumeration_hex4_59c1 : reassembles 22977 = true ∧ castsFifteens 22977 = true := by decide

/-- 59c2: nibbles fold back to 22978; digit sum 28 ≡ 22978 (mod 15). -/
theorem enumeration_hex4_59c2 : reassembles 22978 = true ∧ castsFifteens 22978 = true := by decide

/-- 59c3: nibbles fold back to 22979; digit sum 29 ≡ 22979 (mod 15). -/
theorem enumeration_hex4_59c3 : reassembles 22979 = true ∧ castsFifteens 22979 = true := by decide

/-- 59c4: nibbles fold back to 22980; digit sum 30 ≡ 22980 (mod 15). -/
theorem enumeration_hex4_59c4 : reassembles 22980 = true ∧ castsFifteens 22980 = true := by decide

/-- 59c5: nibbles fold back to 22981; digit sum 31 ≡ 22981 (mod 15). -/
theorem enumeration_hex4_59c5 : reassembles 22981 = true ∧ castsFifteens 22981 = true := by decide

/-- 59c6: nibbles fold back to 22982; digit sum 32 ≡ 22982 (mod 15). -/
theorem enumeration_hex4_59c6 : reassembles 22982 = true ∧ castsFifteens 22982 = true := by decide

/-- 59c7: nibbles fold back to 22983; digit sum 33 ≡ 22983 (mod 15). -/
theorem enumeration_hex4_59c7 : reassembles 22983 = true ∧ castsFifteens 22983 = true := by decide

/-- 59c8: nibbles fold back to 22984; digit sum 34 ≡ 22984 (mod 15). -/
theorem enumeration_hex4_59c8 : reassembles 22984 = true ∧ castsFifteens 22984 = true := by decide

/-- 59c9: nibbles fold back to 22985; digit sum 35 ≡ 22985 (mod 15). -/
theorem enumeration_hex4_59c9 : reassembles 22985 = true ∧ castsFifteens 22985 = true := by decide

/-- 59ca: nibbles fold back to 22986; digit sum 36 ≡ 22986 (mod 15). -/
theorem enumeration_hex4_59ca : reassembles 22986 = true ∧ castsFifteens 22986 = true := by decide

/-- 59cb: nibbles fold back to 22987; digit sum 37 ≡ 22987 (mod 15). -/
theorem enumeration_hex4_59cb : reassembles 22987 = true ∧ castsFifteens 22987 = true := by decide

/-- 59cc: nibbles fold back to 22988; digit sum 38 ≡ 22988 (mod 15). -/
theorem enumeration_hex4_59cc : reassembles 22988 = true ∧ castsFifteens 22988 = true := by decide

/-- 59cd: nibbles fold back to 22989; digit sum 39 ≡ 22989 (mod 15). -/
theorem enumeration_hex4_59cd : reassembles 22989 = true ∧ castsFifteens 22989 = true := by decide

/-- 59ce: nibbles fold back to 22990; digit sum 40 ≡ 22990 (mod 15). -/
theorem enumeration_hex4_59ce : reassembles 22990 = true ∧ castsFifteens 22990 = true := by decide

/-- 59cf: nibbles fold back to 22991; digit sum 41 ≡ 22991 (mod 15). -/
theorem enumeration_hex4_59cf : reassembles 22991 = true ∧ castsFifteens 22991 = true := by decide

/-- 59d0: nibbles fold back to 22992; digit sum 27 ≡ 22992 (mod 15). -/
theorem enumeration_hex4_59d0 : reassembles 22992 = true ∧ castsFifteens 22992 = true := by decide

/-- 59d1: nibbles fold back to 22993; digit sum 28 ≡ 22993 (mod 15). -/
theorem enumeration_hex4_59d1 : reassembles 22993 = true ∧ castsFifteens 22993 = true := by decide

/-- 59d2: nibbles fold back to 22994; digit sum 29 ≡ 22994 (mod 15). -/
theorem enumeration_hex4_59d2 : reassembles 22994 = true ∧ castsFifteens 22994 = true := by decide

/-- 59d3: nibbles fold back to 22995; digit sum 30 ≡ 22995 (mod 15). -/
theorem enumeration_hex4_59d3 : reassembles 22995 = true ∧ castsFifteens 22995 = true := by decide

/-- 59d4: nibbles fold back to 22996; digit sum 31 ≡ 22996 (mod 15). -/
theorem enumeration_hex4_59d4 : reassembles 22996 = true ∧ castsFifteens 22996 = true := by decide

/-- 59d5: nibbles fold back to 22997; digit sum 32 ≡ 22997 (mod 15). -/
theorem enumeration_hex4_59d5 : reassembles 22997 = true ∧ castsFifteens 22997 = true := by decide

/-- 59d6: nibbles fold back to 22998; digit sum 33 ≡ 22998 (mod 15). -/
theorem enumeration_hex4_59d6 : reassembles 22998 = true ∧ castsFifteens 22998 = true := by decide

/-- 59d7: nibbles fold back to 22999; digit sum 34 ≡ 22999 (mod 15). -/
theorem enumeration_hex4_59d7 : reassembles 22999 = true ∧ castsFifteens 22999 = true := by decide

/-- 59d8: nibbles fold back to 23000; digit sum 35 ≡ 23000 (mod 15). -/
theorem enumeration_hex4_59d8 : reassembles 23000 = true ∧ castsFifteens 23000 = true := by decide

/-- 59d9: nibbles fold back to 23001; digit sum 36 ≡ 23001 (mod 15). -/
theorem enumeration_hex4_59d9 : reassembles 23001 = true ∧ castsFifteens 23001 = true := by decide

/-- 59da: nibbles fold back to 23002; digit sum 37 ≡ 23002 (mod 15). -/
theorem enumeration_hex4_59da : reassembles 23002 = true ∧ castsFifteens 23002 = true := by decide

/-- 59db: nibbles fold back to 23003; digit sum 38 ≡ 23003 (mod 15). -/
theorem enumeration_hex4_59db : reassembles 23003 = true ∧ castsFifteens 23003 = true := by decide

/-- 59dc: nibbles fold back to 23004; digit sum 39 ≡ 23004 (mod 15). -/
theorem enumeration_hex4_59dc : reassembles 23004 = true ∧ castsFifteens 23004 = true := by decide

/-- 59dd: nibbles fold back to 23005; digit sum 40 ≡ 23005 (mod 15). -/
theorem enumeration_hex4_59dd : reassembles 23005 = true ∧ castsFifteens 23005 = true := by decide

/-- 59de: nibbles fold back to 23006; digit sum 41 ≡ 23006 (mod 15). -/
theorem enumeration_hex4_59de : reassembles 23006 = true ∧ castsFifteens 23006 = true := by decide

/-- 59df: nibbles fold back to 23007; digit sum 42 ≡ 23007 (mod 15). -/
theorem enumeration_hex4_59df : reassembles 23007 = true ∧ castsFifteens 23007 = true := by decide

/-- 59e0: nibbles fold back to 23008; digit sum 28 ≡ 23008 (mod 15). -/
theorem enumeration_hex4_59e0 : reassembles 23008 = true ∧ castsFifteens 23008 = true := by decide

/-- 59e1: nibbles fold back to 23009; digit sum 29 ≡ 23009 (mod 15). -/
theorem enumeration_hex4_59e1 : reassembles 23009 = true ∧ castsFifteens 23009 = true := by decide

/-- 59e2: nibbles fold back to 23010; digit sum 30 ≡ 23010 (mod 15). -/
theorem enumeration_hex4_59e2 : reassembles 23010 = true ∧ castsFifteens 23010 = true := by decide

/-- 59e3: nibbles fold back to 23011; digit sum 31 ≡ 23011 (mod 15). -/
theorem enumeration_hex4_59e3 : reassembles 23011 = true ∧ castsFifteens 23011 = true := by decide

/-- 59e4: nibbles fold back to 23012; digit sum 32 ≡ 23012 (mod 15). -/
theorem enumeration_hex4_59e4 : reassembles 23012 = true ∧ castsFifteens 23012 = true := by decide

/-- 59e5: nibbles fold back to 23013; digit sum 33 ≡ 23013 (mod 15). -/
theorem enumeration_hex4_59e5 : reassembles 23013 = true ∧ castsFifteens 23013 = true := by decide

/-- 59e6: nibbles fold back to 23014; digit sum 34 ≡ 23014 (mod 15). -/
theorem enumeration_hex4_59e6 : reassembles 23014 = true ∧ castsFifteens 23014 = true := by decide

/-- 59e7: nibbles fold back to 23015; digit sum 35 ≡ 23015 (mod 15). -/
theorem enumeration_hex4_59e7 : reassembles 23015 = true ∧ castsFifteens 23015 = true := by decide

/-- 59e8: nibbles fold back to 23016; digit sum 36 ≡ 23016 (mod 15). -/
theorem enumeration_hex4_59e8 : reassembles 23016 = true ∧ castsFifteens 23016 = true := by decide

/-- 59e9: nibbles fold back to 23017; digit sum 37 ≡ 23017 (mod 15). -/
theorem enumeration_hex4_59e9 : reassembles 23017 = true ∧ castsFifteens 23017 = true := by decide

/-- 59ea: nibbles fold back to 23018; digit sum 38 ≡ 23018 (mod 15). -/
theorem enumeration_hex4_59ea : reassembles 23018 = true ∧ castsFifteens 23018 = true := by decide

/-- 59eb: nibbles fold back to 23019; digit sum 39 ≡ 23019 (mod 15). -/
theorem enumeration_hex4_59eb : reassembles 23019 = true ∧ castsFifteens 23019 = true := by decide

/-- 59ec: nibbles fold back to 23020; digit sum 40 ≡ 23020 (mod 15). -/
theorem enumeration_hex4_59ec : reassembles 23020 = true ∧ castsFifteens 23020 = true := by decide

/-- 59ed: nibbles fold back to 23021; digit sum 41 ≡ 23021 (mod 15). -/
theorem enumeration_hex4_59ed : reassembles 23021 = true ∧ castsFifteens 23021 = true := by decide

/-- 59ee: nibbles fold back to 23022; digit sum 42 ≡ 23022 (mod 15). -/
theorem enumeration_hex4_59ee : reassembles 23022 = true ∧ castsFifteens 23022 = true := by decide

/-- 59ef: nibbles fold back to 23023; digit sum 43 ≡ 23023 (mod 15). -/
theorem enumeration_hex4_59ef : reassembles 23023 = true ∧ castsFifteens 23023 = true := by decide

/-- 59f0: nibbles fold back to 23024; digit sum 29 ≡ 23024 (mod 15). -/
theorem enumeration_hex4_59f0 : reassembles 23024 = true ∧ castsFifteens 23024 = true := by decide

/-- 59f1: nibbles fold back to 23025; digit sum 30 ≡ 23025 (mod 15). -/
theorem enumeration_hex4_59f1 : reassembles 23025 = true ∧ castsFifteens 23025 = true := by decide

/-- 59f2: nibbles fold back to 23026; digit sum 31 ≡ 23026 (mod 15). -/
theorem enumeration_hex4_59f2 : reassembles 23026 = true ∧ castsFifteens 23026 = true := by decide

/-- 59f3: nibbles fold back to 23027; digit sum 32 ≡ 23027 (mod 15). -/
theorem enumeration_hex4_59f3 : reassembles 23027 = true ∧ castsFifteens 23027 = true := by decide

/-- 59f4: nibbles fold back to 23028; digit sum 33 ≡ 23028 (mod 15). -/
theorem enumeration_hex4_59f4 : reassembles 23028 = true ∧ castsFifteens 23028 = true := by decide

/-- 59f5: nibbles fold back to 23029; digit sum 34 ≡ 23029 (mod 15). -/
theorem enumeration_hex4_59f5 : reassembles 23029 = true ∧ castsFifteens 23029 = true := by decide

/-- 59f6: nibbles fold back to 23030; digit sum 35 ≡ 23030 (mod 15). -/
theorem enumeration_hex4_59f6 : reassembles 23030 = true ∧ castsFifteens 23030 = true := by decide

/-- 59f7: nibbles fold back to 23031; digit sum 36 ≡ 23031 (mod 15). -/
theorem enumeration_hex4_59f7 : reassembles 23031 = true ∧ castsFifteens 23031 = true := by decide

/-- 59f8: nibbles fold back to 23032; digit sum 37 ≡ 23032 (mod 15). -/
theorem enumeration_hex4_59f8 : reassembles 23032 = true ∧ castsFifteens 23032 = true := by decide

/-- 59f9: nibbles fold back to 23033; digit sum 38 ≡ 23033 (mod 15). -/
theorem enumeration_hex4_59f9 : reassembles 23033 = true ∧ castsFifteens 23033 = true := by decide

/-- 59fa: nibbles fold back to 23034; digit sum 39 ≡ 23034 (mod 15). -/
theorem enumeration_hex4_59fa : reassembles 23034 = true ∧ castsFifteens 23034 = true := by decide

/-- 59fb: nibbles fold back to 23035; digit sum 40 ≡ 23035 (mod 15). -/
theorem enumeration_hex4_59fb : reassembles 23035 = true ∧ castsFifteens 23035 = true := by decide

/-- 59fc: nibbles fold back to 23036; digit sum 41 ≡ 23036 (mod 15). -/
theorem enumeration_hex4_59fc : reassembles 23036 = true ∧ castsFifteens 23036 = true := by decide

/-- 59fd: nibbles fold back to 23037; digit sum 42 ≡ 23037 (mod 15). -/
theorem enumeration_hex4_59fd : reassembles 23037 = true ∧ castsFifteens 23037 = true := by decide

/-- 59fe: nibbles fold back to 23038; digit sum 43 ≡ 23038 (mod 15). -/
theorem enumeration_hex4_59fe : reassembles 23038 = true ∧ castsFifteens 23038 = true := by decide

/-- 59ff: nibbles fold back to 23039; digit sum 44 ≡ 23039 (mod 15). -/
theorem enumeration_hex4_59ff : reassembles 23039 = true ∧ castsFifteens 23039 = true := by decide

/-- 5a00: nibbles fold back to 23040; digit sum 15 ≡ 23040 (mod 15). -/
theorem enumeration_hex4_5a00 : reassembles 23040 = true ∧ castsFifteens 23040 = true := by decide

/-- 5a01: nibbles fold back to 23041; digit sum 16 ≡ 23041 (mod 15). -/
theorem enumeration_hex4_5a01 : reassembles 23041 = true ∧ castsFifteens 23041 = true := by decide

/-- 5a02: nibbles fold back to 23042; digit sum 17 ≡ 23042 (mod 15). -/
theorem enumeration_hex4_5a02 : reassembles 23042 = true ∧ castsFifteens 23042 = true := by decide

/-- 5a03: nibbles fold back to 23043; digit sum 18 ≡ 23043 (mod 15). -/
theorem enumeration_hex4_5a03 : reassembles 23043 = true ∧ castsFifteens 23043 = true := by decide

/-- 5a04: nibbles fold back to 23044; digit sum 19 ≡ 23044 (mod 15). -/
theorem enumeration_hex4_5a04 : reassembles 23044 = true ∧ castsFifteens 23044 = true := by decide

/-- 5a05: nibbles fold back to 23045; digit sum 20 ≡ 23045 (mod 15). -/
theorem enumeration_hex4_5a05 : reassembles 23045 = true ∧ castsFifteens 23045 = true := by decide

/-- 5a06: nibbles fold back to 23046; digit sum 21 ≡ 23046 (mod 15). -/
theorem enumeration_hex4_5a06 : reassembles 23046 = true ∧ castsFifteens 23046 = true := by decide

/-- 5a07: nibbles fold back to 23047; digit sum 22 ≡ 23047 (mod 15). -/
theorem enumeration_hex4_5a07 : reassembles 23047 = true ∧ castsFifteens 23047 = true := by decide

/-- 5a08: nibbles fold back to 23048; digit sum 23 ≡ 23048 (mod 15). -/
theorem enumeration_hex4_5a08 : reassembles 23048 = true ∧ castsFifteens 23048 = true := by decide

/-- 5a09: nibbles fold back to 23049; digit sum 24 ≡ 23049 (mod 15). -/
theorem enumeration_hex4_5a09 : reassembles 23049 = true ∧ castsFifteens 23049 = true := by decide

/-- 5a0a: nibbles fold back to 23050; digit sum 25 ≡ 23050 (mod 15). -/
theorem enumeration_hex4_5a0a : reassembles 23050 = true ∧ castsFifteens 23050 = true := by decide

/-- 5a0b: nibbles fold back to 23051; digit sum 26 ≡ 23051 (mod 15). -/
theorem enumeration_hex4_5a0b : reassembles 23051 = true ∧ castsFifteens 23051 = true := by decide

/-- 5a0c: nibbles fold back to 23052; digit sum 27 ≡ 23052 (mod 15). -/
theorem enumeration_hex4_5a0c : reassembles 23052 = true ∧ castsFifteens 23052 = true := by decide

/-- 5a0d: nibbles fold back to 23053; digit sum 28 ≡ 23053 (mod 15). -/
theorem enumeration_hex4_5a0d : reassembles 23053 = true ∧ castsFifteens 23053 = true := by decide

/-- 5a0e: nibbles fold back to 23054; digit sum 29 ≡ 23054 (mod 15). -/
theorem enumeration_hex4_5a0e : reassembles 23054 = true ∧ castsFifteens 23054 = true := by decide

/-- 5a0f: nibbles fold back to 23055; digit sum 30 ≡ 23055 (mod 15). -/
theorem enumeration_hex4_5a0f : reassembles 23055 = true ∧ castsFifteens 23055 = true := by decide

/-- 5a10: nibbles fold back to 23056; digit sum 16 ≡ 23056 (mod 15). -/
theorem enumeration_hex4_5a10 : reassembles 23056 = true ∧ castsFifteens 23056 = true := by decide

/-- 5a11: nibbles fold back to 23057; digit sum 17 ≡ 23057 (mod 15). -/
theorem enumeration_hex4_5a11 : reassembles 23057 = true ∧ castsFifteens 23057 = true := by decide

/-- 5a12: nibbles fold back to 23058; digit sum 18 ≡ 23058 (mod 15). -/
theorem enumeration_hex4_5a12 : reassembles 23058 = true ∧ castsFifteens 23058 = true := by decide

/-- 5a13: nibbles fold back to 23059; digit sum 19 ≡ 23059 (mod 15). -/
theorem enumeration_hex4_5a13 : reassembles 23059 = true ∧ castsFifteens 23059 = true := by decide

/-- 5a14: nibbles fold back to 23060; digit sum 20 ≡ 23060 (mod 15). -/
theorem enumeration_hex4_5a14 : reassembles 23060 = true ∧ castsFifteens 23060 = true := by decide

/-- 5a15: nibbles fold back to 23061; digit sum 21 ≡ 23061 (mod 15). -/
theorem enumeration_hex4_5a15 : reassembles 23061 = true ∧ castsFifteens 23061 = true := by decide

/-- 5a16: nibbles fold back to 23062; digit sum 22 ≡ 23062 (mod 15). -/
theorem enumeration_hex4_5a16 : reassembles 23062 = true ∧ castsFifteens 23062 = true := by decide

/-- 5a17: nibbles fold back to 23063; digit sum 23 ≡ 23063 (mod 15). -/
theorem enumeration_hex4_5a17 : reassembles 23063 = true ∧ castsFifteens 23063 = true := by decide

/-- 5a18: nibbles fold back to 23064; digit sum 24 ≡ 23064 (mod 15). -/
theorem enumeration_hex4_5a18 : reassembles 23064 = true ∧ castsFifteens 23064 = true := by decide

/-- 5a19: nibbles fold back to 23065; digit sum 25 ≡ 23065 (mod 15). -/
theorem enumeration_hex4_5a19 : reassembles 23065 = true ∧ castsFifteens 23065 = true := by decide

/-- 5a1a: nibbles fold back to 23066; digit sum 26 ≡ 23066 (mod 15). -/
theorem enumeration_hex4_5a1a : reassembles 23066 = true ∧ castsFifteens 23066 = true := by decide

/-- 5a1b: nibbles fold back to 23067; digit sum 27 ≡ 23067 (mod 15). -/
theorem enumeration_hex4_5a1b : reassembles 23067 = true ∧ castsFifteens 23067 = true := by decide

/-- 5a1c: nibbles fold back to 23068; digit sum 28 ≡ 23068 (mod 15). -/
theorem enumeration_hex4_5a1c : reassembles 23068 = true ∧ castsFifteens 23068 = true := by decide

/-- 5a1d: nibbles fold back to 23069; digit sum 29 ≡ 23069 (mod 15). -/
theorem enumeration_hex4_5a1d : reassembles 23069 = true ∧ castsFifteens 23069 = true := by decide

/-- 5a1e: nibbles fold back to 23070; digit sum 30 ≡ 23070 (mod 15). -/
theorem enumeration_hex4_5a1e : reassembles 23070 = true ∧ castsFifteens 23070 = true := by decide

/-- 5a1f: nibbles fold back to 23071; digit sum 31 ≡ 23071 (mod 15). -/
theorem enumeration_hex4_5a1f : reassembles 23071 = true ∧ castsFifteens 23071 = true := by decide

/-- 5a20: nibbles fold back to 23072; digit sum 17 ≡ 23072 (mod 15). -/
theorem enumeration_hex4_5a20 : reassembles 23072 = true ∧ castsFifteens 23072 = true := by decide

/-- 5a21: nibbles fold back to 23073; digit sum 18 ≡ 23073 (mod 15). -/
theorem enumeration_hex4_5a21 : reassembles 23073 = true ∧ castsFifteens 23073 = true := by decide

/-- 5a22: nibbles fold back to 23074; digit sum 19 ≡ 23074 (mod 15). -/
theorem enumeration_hex4_5a22 : reassembles 23074 = true ∧ castsFifteens 23074 = true := by decide

/-- 5a23: nibbles fold back to 23075; digit sum 20 ≡ 23075 (mod 15). -/
theorem enumeration_hex4_5a23 : reassembles 23075 = true ∧ castsFifteens 23075 = true := by decide

/-- 5a24: nibbles fold back to 23076; digit sum 21 ≡ 23076 (mod 15). -/
theorem enumeration_hex4_5a24 : reassembles 23076 = true ∧ castsFifteens 23076 = true := by decide

/-- 5a25: nibbles fold back to 23077; digit sum 22 ≡ 23077 (mod 15). -/
theorem enumeration_hex4_5a25 : reassembles 23077 = true ∧ castsFifteens 23077 = true := by decide

/-- 5a26: nibbles fold back to 23078; digit sum 23 ≡ 23078 (mod 15). -/
theorem enumeration_hex4_5a26 : reassembles 23078 = true ∧ castsFifteens 23078 = true := by decide

/-- 5a27: nibbles fold back to 23079; digit sum 24 ≡ 23079 (mod 15). -/
theorem enumeration_hex4_5a27 : reassembles 23079 = true ∧ castsFifteens 23079 = true := by decide

/-- 5a28: nibbles fold back to 23080; digit sum 25 ≡ 23080 (mod 15). -/
theorem enumeration_hex4_5a28 : reassembles 23080 = true ∧ castsFifteens 23080 = true := by decide

/-- 5a29: nibbles fold back to 23081; digit sum 26 ≡ 23081 (mod 15). -/
theorem enumeration_hex4_5a29 : reassembles 23081 = true ∧ castsFifteens 23081 = true := by decide

/-- 5a2a: nibbles fold back to 23082; digit sum 27 ≡ 23082 (mod 15). -/
theorem enumeration_hex4_5a2a : reassembles 23082 = true ∧ castsFifteens 23082 = true := by decide

/-- 5a2b: nibbles fold back to 23083; digit sum 28 ≡ 23083 (mod 15). -/
theorem enumeration_hex4_5a2b : reassembles 23083 = true ∧ castsFifteens 23083 = true := by decide

/-- 5a2c: nibbles fold back to 23084; digit sum 29 ≡ 23084 (mod 15). -/
theorem enumeration_hex4_5a2c : reassembles 23084 = true ∧ castsFifteens 23084 = true := by decide

/-- 5a2d: nibbles fold back to 23085; digit sum 30 ≡ 23085 (mod 15). -/
theorem enumeration_hex4_5a2d : reassembles 23085 = true ∧ castsFifteens 23085 = true := by decide

/-- 5a2e: nibbles fold back to 23086; digit sum 31 ≡ 23086 (mod 15). -/
theorem enumeration_hex4_5a2e : reassembles 23086 = true ∧ castsFifteens 23086 = true := by decide

/-- 5a2f: nibbles fold back to 23087; digit sum 32 ≡ 23087 (mod 15). -/
theorem enumeration_hex4_5a2f : reassembles 23087 = true ∧ castsFifteens 23087 = true := by decide

/-- 5a30: nibbles fold back to 23088; digit sum 18 ≡ 23088 (mod 15). -/
theorem enumeration_hex4_5a30 : reassembles 23088 = true ∧ castsFifteens 23088 = true := by decide

/-- 5a31: nibbles fold back to 23089; digit sum 19 ≡ 23089 (mod 15). -/
theorem enumeration_hex4_5a31 : reassembles 23089 = true ∧ castsFifteens 23089 = true := by decide

/-- 5a32: nibbles fold back to 23090; digit sum 20 ≡ 23090 (mod 15). -/
theorem enumeration_hex4_5a32 : reassembles 23090 = true ∧ castsFifteens 23090 = true := by decide

/-- 5a33: nibbles fold back to 23091; digit sum 21 ≡ 23091 (mod 15). -/
theorem enumeration_hex4_5a33 : reassembles 23091 = true ∧ castsFifteens 23091 = true := by decide

/-- 5a34: nibbles fold back to 23092; digit sum 22 ≡ 23092 (mod 15). -/
theorem enumeration_hex4_5a34 : reassembles 23092 = true ∧ castsFifteens 23092 = true := by decide

/-- 5a35: nibbles fold back to 23093; digit sum 23 ≡ 23093 (mod 15). -/
theorem enumeration_hex4_5a35 : reassembles 23093 = true ∧ castsFifteens 23093 = true := by decide

/-- 5a36: nibbles fold back to 23094; digit sum 24 ≡ 23094 (mod 15). -/
theorem enumeration_hex4_5a36 : reassembles 23094 = true ∧ castsFifteens 23094 = true := by decide

/-- 5a37: nibbles fold back to 23095; digit sum 25 ≡ 23095 (mod 15). -/
theorem enumeration_hex4_5a37 : reassembles 23095 = true ∧ castsFifteens 23095 = true := by decide

/-- 5a38: nibbles fold back to 23096; digit sum 26 ≡ 23096 (mod 15). -/
theorem enumeration_hex4_5a38 : reassembles 23096 = true ∧ castsFifteens 23096 = true := by decide

/-- 5a39: nibbles fold back to 23097; digit sum 27 ≡ 23097 (mod 15). -/
theorem enumeration_hex4_5a39 : reassembles 23097 = true ∧ castsFifteens 23097 = true := by decide

/-- 5a3a: nibbles fold back to 23098; digit sum 28 ≡ 23098 (mod 15). -/
theorem enumeration_hex4_5a3a : reassembles 23098 = true ∧ castsFifteens 23098 = true := by decide

/-- 5a3b: nibbles fold back to 23099; digit sum 29 ≡ 23099 (mod 15). -/
theorem enumeration_hex4_5a3b : reassembles 23099 = true ∧ castsFifteens 23099 = true := by decide

/-- 5a3c: nibbles fold back to 23100; digit sum 30 ≡ 23100 (mod 15). -/
theorem enumeration_hex4_5a3c : reassembles 23100 = true ∧ castsFifteens 23100 = true := by decide

/-- 5a3d: nibbles fold back to 23101; digit sum 31 ≡ 23101 (mod 15). -/
theorem enumeration_hex4_5a3d : reassembles 23101 = true ∧ castsFifteens 23101 = true := by decide

/-- 5a3e: nibbles fold back to 23102; digit sum 32 ≡ 23102 (mod 15). -/
theorem enumeration_hex4_5a3e : reassembles 23102 = true ∧ castsFifteens 23102 = true := by decide

/-- 5a3f: nibbles fold back to 23103; digit sum 33 ≡ 23103 (mod 15). -/
theorem enumeration_hex4_5a3f : reassembles 23103 = true ∧ castsFifteens 23103 = true := by decide

/-- 5a40: nibbles fold back to 23104; digit sum 19 ≡ 23104 (mod 15). -/
theorem enumeration_hex4_5a40 : reassembles 23104 = true ∧ castsFifteens 23104 = true := by decide

/-- 5a41: nibbles fold back to 23105; digit sum 20 ≡ 23105 (mod 15). -/
theorem enumeration_hex4_5a41 : reassembles 23105 = true ∧ castsFifteens 23105 = true := by decide

/-- 5a42: nibbles fold back to 23106; digit sum 21 ≡ 23106 (mod 15). -/
theorem enumeration_hex4_5a42 : reassembles 23106 = true ∧ castsFifteens 23106 = true := by decide

/-- 5a43: nibbles fold back to 23107; digit sum 22 ≡ 23107 (mod 15). -/
theorem enumeration_hex4_5a43 : reassembles 23107 = true ∧ castsFifteens 23107 = true := by decide

/-- 5a44: nibbles fold back to 23108; digit sum 23 ≡ 23108 (mod 15). -/
theorem enumeration_hex4_5a44 : reassembles 23108 = true ∧ castsFifteens 23108 = true := by decide

/-- 5a45: nibbles fold back to 23109; digit sum 24 ≡ 23109 (mod 15). -/
theorem enumeration_hex4_5a45 : reassembles 23109 = true ∧ castsFifteens 23109 = true := by decide

/-- 5a46: nibbles fold back to 23110; digit sum 25 ≡ 23110 (mod 15). -/
theorem enumeration_hex4_5a46 : reassembles 23110 = true ∧ castsFifteens 23110 = true := by decide

/-- 5a47: nibbles fold back to 23111; digit sum 26 ≡ 23111 (mod 15). -/
theorem enumeration_hex4_5a47 : reassembles 23111 = true ∧ castsFifteens 23111 = true := by decide

/-- 5a48: nibbles fold back to 23112; digit sum 27 ≡ 23112 (mod 15). -/
theorem enumeration_hex4_5a48 : reassembles 23112 = true ∧ castsFifteens 23112 = true := by decide

/-- 5a49: nibbles fold back to 23113; digit sum 28 ≡ 23113 (mod 15). -/
theorem enumeration_hex4_5a49 : reassembles 23113 = true ∧ castsFifteens 23113 = true := by decide

/-- 5a4a: nibbles fold back to 23114; digit sum 29 ≡ 23114 (mod 15). -/
theorem enumeration_hex4_5a4a : reassembles 23114 = true ∧ castsFifteens 23114 = true := by decide

/-- 5a4b: nibbles fold back to 23115; digit sum 30 ≡ 23115 (mod 15). -/
theorem enumeration_hex4_5a4b : reassembles 23115 = true ∧ castsFifteens 23115 = true := by decide

/-- 5a4c: nibbles fold back to 23116; digit sum 31 ≡ 23116 (mod 15). -/
theorem enumeration_hex4_5a4c : reassembles 23116 = true ∧ castsFifteens 23116 = true := by decide

/-- 5a4d: nibbles fold back to 23117; digit sum 32 ≡ 23117 (mod 15). -/
theorem enumeration_hex4_5a4d : reassembles 23117 = true ∧ castsFifteens 23117 = true := by decide

/-- 5a4e: nibbles fold back to 23118; digit sum 33 ≡ 23118 (mod 15). -/
theorem enumeration_hex4_5a4e : reassembles 23118 = true ∧ castsFifteens 23118 = true := by decide

/-- 5a4f: nibbles fold back to 23119; digit sum 34 ≡ 23119 (mod 15). -/
theorem enumeration_hex4_5a4f : reassembles 23119 = true ∧ castsFifteens 23119 = true := by decide

/-- 5a50: nibbles fold back to 23120; digit sum 20 ≡ 23120 (mod 15). -/
theorem enumeration_hex4_5a50 : reassembles 23120 = true ∧ castsFifteens 23120 = true := by decide

/-- 5a51: nibbles fold back to 23121; digit sum 21 ≡ 23121 (mod 15). -/
theorem enumeration_hex4_5a51 : reassembles 23121 = true ∧ castsFifteens 23121 = true := by decide

/-- 5a52: nibbles fold back to 23122; digit sum 22 ≡ 23122 (mod 15). -/
theorem enumeration_hex4_5a52 : reassembles 23122 = true ∧ castsFifteens 23122 = true := by decide

/-- 5a53: nibbles fold back to 23123; digit sum 23 ≡ 23123 (mod 15). -/
theorem enumeration_hex4_5a53 : reassembles 23123 = true ∧ castsFifteens 23123 = true := by decide

/-- 5a54: nibbles fold back to 23124; digit sum 24 ≡ 23124 (mod 15). -/
theorem enumeration_hex4_5a54 : reassembles 23124 = true ∧ castsFifteens 23124 = true := by decide

/-- 5a55: nibbles fold back to 23125; digit sum 25 ≡ 23125 (mod 15). -/
theorem enumeration_hex4_5a55 : reassembles 23125 = true ∧ castsFifteens 23125 = true := by decide

/-- 5a56: nibbles fold back to 23126; digit sum 26 ≡ 23126 (mod 15). -/
theorem enumeration_hex4_5a56 : reassembles 23126 = true ∧ castsFifteens 23126 = true := by decide

/-- 5a57: nibbles fold back to 23127; digit sum 27 ≡ 23127 (mod 15). -/
theorem enumeration_hex4_5a57 : reassembles 23127 = true ∧ castsFifteens 23127 = true := by decide

/-- 5a58: nibbles fold back to 23128; digit sum 28 ≡ 23128 (mod 15). -/
theorem enumeration_hex4_5a58 : reassembles 23128 = true ∧ castsFifteens 23128 = true := by decide

/-- 5a59: nibbles fold back to 23129; digit sum 29 ≡ 23129 (mod 15). -/
theorem enumeration_hex4_5a59 : reassembles 23129 = true ∧ castsFifteens 23129 = true := by decide

/-- 5a5a: nibbles fold back to 23130; digit sum 30 ≡ 23130 (mod 15). -/
theorem enumeration_hex4_5a5a : reassembles 23130 = true ∧ castsFifteens 23130 = true := by decide

/-- 5a5b: nibbles fold back to 23131; digit sum 31 ≡ 23131 (mod 15). -/
theorem enumeration_hex4_5a5b : reassembles 23131 = true ∧ castsFifteens 23131 = true := by decide

/-- 5a5c: nibbles fold back to 23132; digit sum 32 ≡ 23132 (mod 15). -/
theorem enumeration_hex4_5a5c : reassembles 23132 = true ∧ castsFifteens 23132 = true := by decide

/-- 5a5d: nibbles fold back to 23133; digit sum 33 ≡ 23133 (mod 15). -/
theorem enumeration_hex4_5a5d : reassembles 23133 = true ∧ castsFifteens 23133 = true := by decide

/-- 5a5e: nibbles fold back to 23134; digit sum 34 ≡ 23134 (mod 15). -/
theorem enumeration_hex4_5a5e : reassembles 23134 = true ∧ castsFifteens 23134 = true := by decide

/-- 5a5f: nibbles fold back to 23135; digit sum 35 ≡ 23135 (mod 15). -/
theorem enumeration_hex4_5a5f : reassembles 23135 = true ∧ castsFifteens 23135 = true := by decide

/-- 5a60: nibbles fold back to 23136; digit sum 21 ≡ 23136 (mod 15). -/
theorem enumeration_hex4_5a60 : reassembles 23136 = true ∧ castsFifteens 23136 = true := by decide

/-- 5a61: nibbles fold back to 23137; digit sum 22 ≡ 23137 (mod 15). -/
theorem enumeration_hex4_5a61 : reassembles 23137 = true ∧ castsFifteens 23137 = true := by decide

/-- 5a62: nibbles fold back to 23138; digit sum 23 ≡ 23138 (mod 15). -/
theorem enumeration_hex4_5a62 : reassembles 23138 = true ∧ castsFifteens 23138 = true := by decide

/-- 5a63: nibbles fold back to 23139; digit sum 24 ≡ 23139 (mod 15). -/
theorem enumeration_hex4_5a63 : reassembles 23139 = true ∧ castsFifteens 23139 = true := by decide

/-- 5a64: nibbles fold back to 23140; digit sum 25 ≡ 23140 (mod 15). -/
theorem enumeration_hex4_5a64 : reassembles 23140 = true ∧ castsFifteens 23140 = true := by decide

/-- 5a65: nibbles fold back to 23141; digit sum 26 ≡ 23141 (mod 15). -/
theorem enumeration_hex4_5a65 : reassembles 23141 = true ∧ castsFifteens 23141 = true := by decide

/-- 5a66: nibbles fold back to 23142; digit sum 27 ≡ 23142 (mod 15). -/
theorem enumeration_hex4_5a66 : reassembles 23142 = true ∧ castsFifteens 23142 = true := by decide

/-- 5a67: nibbles fold back to 23143; digit sum 28 ≡ 23143 (mod 15). -/
theorem enumeration_hex4_5a67 : reassembles 23143 = true ∧ castsFifteens 23143 = true := by decide

/-- 5a68: nibbles fold back to 23144; digit sum 29 ≡ 23144 (mod 15). -/
theorem enumeration_hex4_5a68 : reassembles 23144 = true ∧ castsFifteens 23144 = true := by decide

/-- 5a69: nibbles fold back to 23145; digit sum 30 ≡ 23145 (mod 15). -/
theorem enumeration_hex4_5a69 : reassembles 23145 = true ∧ castsFifteens 23145 = true := by decide

/-- 5a6a: nibbles fold back to 23146; digit sum 31 ≡ 23146 (mod 15). -/
theorem enumeration_hex4_5a6a : reassembles 23146 = true ∧ castsFifteens 23146 = true := by decide

/-- 5a6b: nibbles fold back to 23147; digit sum 32 ≡ 23147 (mod 15). -/
theorem enumeration_hex4_5a6b : reassembles 23147 = true ∧ castsFifteens 23147 = true := by decide

/-- 5a6c: nibbles fold back to 23148; digit sum 33 ≡ 23148 (mod 15). -/
theorem enumeration_hex4_5a6c : reassembles 23148 = true ∧ castsFifteens 23148 = true := by decide

/-- 5a6d: nibbles fold back to 23149; digit sum 34 ≡ 23149 (mod 15). -/
theorem enumeration_hex4_5a6d : reassembles 23149 = true ∧ castsFifteens 23149 = true := by decide

/-- 5a6e: nibbles fold back to 23150; digit sum 35 ≡ 23150 (mod 15). -/
theorem enumeration_hex4_5a6e : reassembles 23150 = true ∧ castsFifteens 23150 = true := by decide

/-- 5a6f: nibbles fold back to 23151; digit sum 36 ≡ 23151 (mod 15). -/
theorem enumeration_hex4_5a6f : reassembles 23151 = true ∧ castsFifteens 23151 = true := by decide

/-- 5a70: nibbles fold back to 23152; digit sum 22 ≡ 23152 (mod 15). -/
theorem enumeration_hex4_5a70 : reassembles 23152 = true ∧ castsFifteens 23152 = true := by decide

/-- 5a71: nibbles fold back to 23153; digit sum 23 ≡ 23153 (mod 15). -/
theorem enumeration_hex4_5a71 : reassembles 23153 = true ∧ castsFifteens 23153 = true := by decide

/-- 5a72: nibbles fold back to 23154; digit sum 24 ≡ 23154 (mod 15). -/
theorem enumeration_hex4_5a72 : reassembles 23154 = true ∧ castsFifteens 23154 = true := by decide

/-- 5a73: nibbles fold back to 23155; digit sum 25 ≡ 23155 (mod 15). -/
theorem enumeration_hex4_5a73 : reassembles 23155 = true ∧ castsFifteens 23155 = true := by decide

/-- 5a74: nibbles fold back to 23156; digit sum 26 ≡ 23156 (mod 15). -/
theorem enumeration_hex4_5a74 : reassembles 23156 = true ∧ castsFifteens 23156 = true := by decide

/-- 5a75: nibbles fold back to 23157; digit sum 27 ≡ 23157 (mod 15). -/
theorem enumeration_hex4_5a75 : reassembles 23157 = true ∧ castsFifteens 23157 = true := by decide

/-- 5a76: nibbles fold back to 23158; digit sum 28 ≡ 23158 (mod 15). -/
theorem enumeration_hex4_5a76 : reassembles 23158 = true ∧ castsFifteens 23158 = true := by decide

/-- 5a77: nibbles fold back to 23159; digit sum 29 ≡ 23159 (mod 15). -/
theorem enumeration_hex4_5a77 : reassembles 23159 = true ∧ castsFifteens 23159 = true := by decide

/-- 5a78: nibbles fold back to 23160; digit sum 30 ≡ 23160 (mod 15). -/
theorem enumeration_hex4_5a78 : reassembles 23160 = true ∧ castsFifteens 23160 = true := by decide

/-- 5a79: nibbles fold back to 23161; digit sum 31 ≡ 23161 (mod 15). -/
theorem enumeration_hex4_5a79 : reassembles 23161 = true ∧ castsFifteens 23161 = true := by decide

/-- 5a7a: nibbles fold back to 23162; digit sum 32 ≡ 23162 (mod 15). -/
theorem enumeration_hex4_5a7a : reassembles 23162 = true ∧ castsFifteens 23162 = true := by decide

/-- 5a7b: nibbles fold back to 23163; digit sum 33 ≡ 23163 (mod 15). -/
theorem enumeration_hex4_5a7b : reassembles 23163 = true ∧ castsFifteens 23163 = true := by decide

/-- 5a7c: nibbles fold back to 23164; digit sum 34 ≡ 23164 (mod 15). -/
theorem enumeration_hex4_5a7c : reassembles 23164 = true ∧ castsFifteens 23164 = true := by decide

/-- 5a7d: nibbles fold back to 23165; digit sum 35 ≡ 23165 (mod 15). -/
theorem enumeration_hex4_5a7d : reassembles 23165 = true ∧ castsFifteens 23165 = true := by decide

/-- 5a7e: nibbles fold back to 23166; digit sum 36 ≡ 23166 (mod 15). -/
theorem enumeration_hex4_5a7e : reassembles 23166 = true ∧ castsFifteens 23166 = true := by decide

/-- 5a7f: nibbles fold back to 23167; digit sum 37 ≡ 23167 (mod 15). -/
theorem enumeration_hex4_5a7f : reassembles 23167 = true ∧ castsFifteens 23167 = true := by decide

/-- 5a80: nibbles fold back to 23168; digit sum 23 ≡ 23168 (mod 15). -/
theorem enumeration_hex4_5a80 : reassembles 23168 = true ∧ castsFifteens 23168 = true := by decide

/-- 5a81: nibbles fold back to 23169; digit sum 24 ≡ 23169 (mod 15). -/
theorem enumeration_hex4_5a81 : reassembles 23169 = true ∧ castsFifteens 23169 = true := by decide

/-- 5a82: nibbles fold back to 23170; digit sum 25 ≡ 23170 (mod 15). -/
theorem enumeration_hex4_5a82 : reassembles 23170 = true ∧ castsFifteens 23170 = true := by decide

/-- 5a83: nibbles fold back to 23171; digit sum 26 ≡ 23171 (mod 15). -/
theorem enumeration_hex4_5a83 : reassembles 23171 = true ∧ castsFifteens 23171 = true := by decide

/-- 5a84: nibbles fold back to 23172; digit sum 27 ≡ 23172 (mod 15). -/
theorem enumeration_hex4_5a84 : reassembles 23172 = true ∧ castsFifteens 23172 = true := by decide

/-- 5a85: nibbles fold back to 23173; digit sum 28 ≡ 23173 (mod 15). -/
theorem enumeration_hex4_5a85 : reassembles 23173 = true ∧ castsFifteens 23173 = true := by decide

/-- 5a86: nibbles fold back to 23174; digit sum 29 ≡ 23174 (mod 15). -/
theorem enumeration_hex4_5a86 : reassembles 23174 = true ∧ castsFifteens 23174 = true := by decide

/-- 5a87: nibbles fold back to 23175; digit sum 30 ≡ 23175 (mod 15). -/
theorem enumeration_hex4_5a87 : reassembles 23175 = true ∧ castsFifteens 23175 = true := by decide

/-- 5a88: nibbles fold back to 23176; digit sum 31 ≡ 23176 (mod 15). -/
theorem enumeration_hex4_5a88 : reassembles 23176 = true ∧ castsFifteens 23176 = true := by decide

/-- 5a89: nibbles fold back to 23177; digit sum 32 ≡ 23177 (mod 15). -/
theorem enumeration_hex4_5a89 : reassembles 23177 = true ∧ castsFifteens 23177 = true := by decide

/-- 5a8a: nibbles fold back to 23178; digit sum 33 ≡ 23178 (mod 15). -/
theorem enumeration_hex4_5a8a : reassembles 23178 = true ∧ castsFifteens 23178 = true := by decide

/-- 5a8b: nibbles fold back to 23179; digit sum 34 ≡ 23179 (mod 15). -/
theorem enumeration_hex4_5a8b : reassembles 23179 = true ∧ castsFifteens 23179 = true := by decide

/-- 5a8c: nibbles fold back to 23180; digit sum 35 ≡ 23180 (mod 15). -/
theorem enumeration_hex4_5a8c : reassembles 23180 = true ∧ castsFifteens 23180 = true := by decide

/-- 5a8d: nibbles fold back to 23181; digit sum 36 ≡ 23181 (mod 15). -/
theorem enumeration_hex4_5a8d : reassembles 23181 = true ∧ castsFifteens 23181 = true := by decide

/-- 5a8e: nibbles fold back to 23182; digit sum 37 ≡ 23182 (mod 15). -/
theorem enumeration_hex4_5a8e : reassembles 23182 = true ∧ castsFifteens 23182 = true := by decide

/-- 5a8f: nibbles fold back to 23183; digit sum 38 ≡ 23183 (mod 15). -/
theorem enumeration_hex4_5a8f : reassembles 23183 = true ∧ castsFifteens 23183 = true := by decide

/-- 5a90: nibbles fold back to 23184; digit sum 24 ≡ 23184 (mod 15). -/
theorem enumeration_hex4_5a90 : reassembles 23184 = true ∧ castsFifteens 23184 = true := by decide

/-- 5a91: nibbles fold back to 23185; digit sum 25 ≡ 23185 (mod 15). -/
theorem enumeration_hex4_5a91 : reassembles 23185 = true ∧ castsFifteens 23185 = true := by decide

/-- 5a92: nibbles fold back to 23186; digit sum 26 ≡ 23186 (mod 15). -/
theorem enumeration_hex4_5a92 : reassembles 23186 = true ∧ castsFifteens 23186 = true := by decide

/-- 5a93: nibbles fold back to 23187; digit sum 27 ≡ 23187 (mod 15). -/
theorem enumeration_hex4_5a93 : reassembles 23187 = true ∧ castsFifteens 23187 = true := by decide

/-- 5a94: nibbles fold back to 23188; digit sum 28 ≡ 23188 (mod 15). -/
theorem enumeration_hex4_5a94 : reassembles 23188 = true ∧ castsFifteens 23188 = true := by decide

/-- 5a95: nibbles fold back to 23189; digit sum 29 ≡ 23189 (mod 15). -/
theorem enumeration_hex4_5a95 : reassembles 23189 = true ∧ castsFifteens 23189 = true := by decide

/-- 5a96: nibbles fold back to 23190; digit sum 30 ≡ 23190 (mod 15). -/
theorem enumeration_hex4_5a96 : reassembles 23190 = true ∧ castsFifteens 23190 = true := by decide

/-- 5a97: nibbles fold back to 23191; digit sum 31 ≡ 23191 (mod 15). -/
theorem enumeration_hex4_5a97 : reassembles 23191 = true ∧ castsFifteens 23191 = true := by decide

/-- 5a98: nibbles fold back to 23192; digit sum 32 ≡ 23192 (mod 15). -/
theorem enumeration_hex4_5a98 : reassembles 23192 = true ∧ castsFifteens 23192 = true := by decide

/-- 5a99: nibbles fold back to 23193; digit sum 33 ≡ 23193 (mod 15). -/
theorem enumeration_hex4_5a99 : reassembles 23193 = true ∧ castsFifteens 23193 = true := by decide

/-- 5a9a: nibbles fold back to 23194; digit sum 34 ≡ 23194 (mod 15). -/
theorem enumeration_hex4_5a9a : reassembles 23194 = true ∧ castsFifteens 23194 = true := by decide

/-- 5a9b: nibbles fold back to 23195; digit sum 35 ≡ 23195 (mod 15). -/
theorem enumeration_hex4_5a9b : reassembles 23195 = true ∧ castsFifteens 23195 = true := by decide

/-- 5a9c: nibbles fold back to 23196; digit sum 36 ≡ 23196 (mod 15). -/
theorem enumeration_hex4_5a9c : reassembles 23196 = true ∧ castsFifteens 23196 = true := by decide

/-- 5a9d: nibbles fold back to 23197; digit sum 37 ≡ 23197 (mod 15). -/
theorem enumeration_hex4_5a9d : reassembles 23197 = true ∧ castsFifteens 23197 = true := by decide

/-- 5a9e: nibbles fold back to 23198; digit sum 38 ≡ 23198 (mod 15). -/
theorem enumeration_hex4_5a9e : reassembles 23198 = true ∧ castsFifteens 23198 = true := by decide

/-- 5a9f: nibbles fold back to 23199; digit sum 39 ≡ 23199 (mod 15). -/
theorem enumeration_hex4_5a9f : reassembles 23199 = true ∧ castsFifteens 23199 = true := by decide

/-- 5aa0: nibbles fold back to 23200; digit sum 25 ≡ 23200 (mod 15). -/
theorem enumeration_hex4_5aa0 : reassembles 23200 = true ∧ castsFifteens 23200 = true := by decide

/-- 5aa1: nibbles fold back to 23201; digit sum 26 ≡ 23201 (mod 15). -/
theorem enumeration_hex4_5aa1 : reassembles 23201 = true ∧ castsFifteens 23201 = true := by decide

/-- 5aa2: nibbles fold back to 23202; digit sum 27 ≡ 23202 (mod 15). -/
theorem enumeration_hex4_5aa2 : reassembles 23202 = true ∧ castsFifteens 23202 = true := by decide

/-- 5aa3: nibbles fold back to 23203; digit sum 28 ≡ 23203 (mod 15). -/
theorem enumeration_hex4_5aa3 : reassembles 23203 = true ∧ castsFifteens 23203 = true := by decide

/-- 5aa4: nibbles fold back to 23204; digit sum 29 ≡ 23204 (mod 15). -/
theorem enumeration_hex4_5aa4 : reassembles 23204 = true ∧ castsFifteens 23204 = true := by decide

/-- 5aa5: nibbles fold back to 23205; digit sum 30 ≡ 23205 (mod 15). -/
theorem enumeration_hex4_5aa5 : reassembles 23205 = true ∧ castsFifteens 23205 = true := by decide

/-- 5aa6: nibbles fold back to 23206; digit sum 31 ≡ 23206 (mod 15). -/
theorem enumeration_hex4_5aa6 : reassembles 23206 = true ∧ castsFifteens 23206 = true := by decide

/-- 5aa7: nibbles fold back to 23207; digit sum 32 ≡ 23207 (mod 15). -/
theorem enumeration_hex4_5aa7 : reassembles 23207 = true ∧ castsFifteens 23207 = true := by decide

/-- 5aa8: nibbles fold back to 23208; digit sum 33 ≡ 23208 (mod 15). -/
theorem enumeration_hex4_5aa8 : reassembles 23208 = true ∧ castsFifteens 23208 = true := by decide

/-- 5aa9: nibbles fold back to 23209; digit sum 34 ≡ 23209 (mod 15). -/
theorem enumeration_hex4_5aa9 : reassembles 23209 = true ∧ castsFifteens 23209 = true := by decide

/-- 5aaa: nibbles fold back to 23210; digit sum 35 ≡ 23210 (mod 15). -/
theorem enumeration_hex4_5aaa : reassembles 23210 = true ∧ castsFifteens 23210 = true := by decide

/-- 5aab: nibbles fold back to 23211; digit sum 36 ≡ 23211 (mod 15). -/
theorem enumeration_hex4_5aab : reassembles 23211 = true ∧ castsFifteens 23211 = true := by decide

/-- 5aac: nibbles fold back to 23212; digit sum 37 ≡ 23212 (mod 15). -/
theorem enumeration_hex4_5aac : reassembles 23212 = true ∧ castsFifteens 23212 = true := by decide

/-- 5aad: nibbles fold back to 23213; digit sum 38 ≡ 23213 (mod 15). -/
theorem enumeration_hex4_5aad : reassembles 23213 = true ∧ castsFifteens 23213 = true := by decide

/-- 5aae: nibbles fold back to 23214; digit sum 39 ≡ 23214 (mod 15). -/
theorem enumeration_hex4_5aae : reassembles 23214 = true ∧ castsFifteens 23214 = true := by decide

/-- 5aaf: nibbles fold back to 23215; digit sum 40 ≡ 23215 (mod 15). -/
theorem enumeration_hex4_5aaf : reassembles 23215 = true ∧ castsFifteens 23215 = true := by decide

/-- 5ab0: nibbles fold back to 23216; digit sum 26 ≡ 23216 (mod 15). -/
theorem enumeration_hex4_5ab0 : reassembles 23216 = true ∧ castsFifteens 23216 = true := by decide

/-- 5ab1: nibbles fold back to 23217; digit sum 27 ≡ 23217 (mod 15). -/
theorem enumeration_hex4_5ab1 : reassembles 23217 = true ∧ castsFifteens 23217 = true := by decide

/-- 5ab2: nibbles fold back to 23218; digit sum 28 ≡ 23218 (mod 15). -/
theorem enumeration_hex4_5ab2 : reassembles 23218 = true ∧ castsFifteens 23218 = true := by decide

/-- 5ab3: nibbles fold back to 23219; digit sum 29 ≡ 23219 (mod 15). -/
theorem enumeration_hex4_5ab3 : reassembles 23219 = true ∧ castsFifteens 23219 = true := by decide

/-- 5ab4: nibbles fold back to 23220; digit sum 30 ≡ 23220 (mod 15). -/
theorem enumeration_hex4_5ab4 : reassembles 23220 = true ∧ castsFifteens 23220 = true := by decide

/-- 5ab5: nibbles fold back to 23221; digit sum 31 ≡ 23221 (mod 15). -/
theorem enumeration_hex4_5ab5 : reassembles 23221 = true ∧ castsFifteens 23221 = true := by decide

/-- 5ab6: nibbles fold back to 23222; digit sum 32 ≡ 23222 (mod 15). -/
theorem enumeration_hex4_5ab6 : reassembles 23222 = true ∧ castsFifteens 23222 = true := by decide

/-- 5ab7: nibbles fold back to 23223; digit sum 33 ≡ 23223 (mod 15). -/
theorem enumeration_hex4_5ab7 : reassembles 23223 = true ∧ castsFifteens 23223 = true := by decide

/-- 5ab8: nibbles fold back to 23224; digit sum 34 ≡ 23224 (mod 15). -/
theorem enumeration_hex4_5ab8 : reassembles 23224 = true ∧ castsFifteens 23224 = true := by decide

/-- 5ab9: nibbles fold back to 23225; digit sum 35 ≡ 23225 (mod 15). -/
theorem enumeration_hex4_5ab9 : reassembles 23225 = true ∧ castsFifteens 23225 = true := by decide

/-- 5aba: nibbles fold back to 23226; digit sum 36 ≡ 23226 (mod 15). -/
theorem enumeration_hex4_5aba : reassembles 23226 = true ∧ castsFifteens 23226 = true := by decide

/-- 5abb: nibbles fold back to 23227; digit sum 37 ≡ 23227 (mod 15). -/
theorem enumeration_hex4_5abb : reassembles 23227 = true ∧ castsFifteens 23227 = true := by decide

/-- 5abc: nibbles fold back to 23228; digit sum 38 ≡ 23228 (mod 15). -/
theorem enumeration_hex4_5abc : reassembles 23228 = true ∧ castsFifteens 23228 = true := by decide

/-- 5abd: nibbles fold back to 23229; digit sum 39 ≡ 23229 (mod 15). -/
theorem enumeration_hex4_5abd : reassembles 23229 = true ∧ castsFifteens 23229 = true := by decide

/-- 5abe: nibbles fold back to 23230; digit sum 40 ≡ 23230 (mod 15). -/
theorem enumeration_hex4_5abe : reassembles 23230 = true ∧ castsFifteens 23230 = true := by decide

/-- 5abf: nibbles fold back to 23231; digit sum 41 ≡ 23231 (mod 15). -/
theorem enumeration_hex4_5abf : reassembles 23231 = true ∧ castsFifteens 23231 = true := by decide

/-- 5ac0: nibbles fold back to 23232; digit sum 27 ≡ 23232 (mod 15). -/
theorem enumeration_hex4_5ac0 : reassembles 23232 = true ∧ castsFifteens 23232 = true := by decide

/-- 5ac1: nibbles fold back to 23233; digit sum 28 ≡ 23233 (mod 15). -/
theorem enumeration_hex4_5ac1 : reassembles 23233 = true ∧ castsFifteens 23233 = true := by decide

/-- 5ac2: nibbles fold back to 23234; digit sum 29 ≡ 23234 (mod 15). -/
theorem enumeration_hex4_5ac2 : reassembles 23234 = true ∧ castsFifteens 23234 = true := by decide

/-- 5ac3: nibbles fold back to 23235; digit sum 30 ≡ 23235 (mod 15). -/
theorem enumeration_hex4_5ac3 : reassembles 23235 = true ∧ castsFifteens 23235 = true := by decide

/-- 5ac4: nibbles fold back to 23236; digit sum 31 ≡ 23236 (mod 15). -/
theorem enumeration_hex4_5ac4 : reassembles 23236 = true ∧ castsFifteens 23236 = true := by decide

/-- 5ac5: nibbles fold back to 23237; digit sum 32 ≡ 23237 (mod 15). -/
theorem enumeration_hex4_5ac5 : reassembles 23237 = true ∧ castsFifteens 23237 = true := by decide

/-- 5ac6: nibbles fold back to 23238; digit sum 33 ≡ 23238 (mod 15). -/
theorem enumeration_hex4_5ac6 : reassembles 23238 = true ∧ castsFifteens 23238 = true := by decide

/-- 5ac7: nibbles fold back to 23239; digit sum 34 ≡ 23239 (mod 15). -/
theorem enumeration_hex4_5ac7 : reassembles 23239 = true ∧ castsFifteens 23239 = true := by decide

/-- 5ac8: nibbles fold back to 23240; digit sum 35 ≡ 23240 (mod 15). -/
theorem enumeration_hex4_5ac8 : reassembles 23240 = true ∧ castsFifteens 23240 = true := by decide

/-- 5ac9: nibbles fold back to 23241; digit sum 36 ≡ 23241 (mod 15). -/
theorem enumeration_hex4_5ac9 : reassembles 23241 = true ∧ castsFifteens 23241 = true := by decide

/-- 5aca: nibbles fold back to 23242; digit sum 37 ≡ 23242 (mod 15). -/
theorem enumeration_hex4_5aca : reassembles 23242 = true ∧ castsFifteens 23242 = true := by decide

/-- 5acb: nibbles fold back to 23243; digit sum 38 ≡ 23243 (mod 15). -/
theorem enumeration_hex4_5acb : reassembles 23243 = true ∧ castsFifteens 23243 = true := by decide

/-- 5acc: nibbles fold back to 23244; digit sum 39 ≡ 23244 (mod 15). -/
theorem enumeration_hex4_5acc : reassembles 23244 = true ∧ castsFifteens 23244 = true := by decide

/-- 5acd: nibbles fold back to 23245; digit sum 40 ≡ 23245 (mod 15). -/
theorem enumeration_hex4_5acd : reassembles 23245 = true ∧ castsFifteens 23245 = true := by decide

/-- 5ace: nibbles fold back to 23246; digit sum 41 ≡ 23246 (mod 15). -/
theorem enumeration_hex4_5ace : reassembles 23246 = true ∧ castsFifteens 23246 = true := by decide

/-- 5acf: nibbles fold back to 23247; digit sum 42 ≡ 23247 (mod 15). -/
theorem enumeration_hex4_5acf : reassembles 23247 = true ∧ castsFifteens 23247 = true := by decide

/-- 5ad0: nibbles fold back to 23248; digit sum 28 ≡ 23248 (mod 15). -/
theorem enumeration_hex4_5ad0 : reassembles 23248 = true ∧ castsFifteens 23248 = true := by decide

/-- 5ad1: nibbles fold back to 23249; digit sum 29 ≡ 23249 (mod 15). -/
theorem enumeration_hex4_5ad1 : reassembles 23249 = true ∧ castsFifteens 23249 = true := by decide

/-- 5ad2: nibbles fold back to 23250; digit sum 30 ≡ 23250 (mod 15). -/
theorem enumeration_hex4_5ad2 : reassembles 23250 = true ∧ castsFifteens 23250 = true := by decide

/-- 5ad3: nibbles fold back to 23251; digit sum 31 ≡ 23251 (mod 15). -/
theorem enumeration_hex4_5ad3 : reassembles 23251 = true ∧ castsFifteens 23251 = true := by decide

/-- 5ad4: nibbles fold back to 23252; digit sum 32 ≡ 23252 (mod 15). -/
theorem enumeration_hex4_5ad4 : reassembles 23252 = true ∧ castsFifteens 23252 = true := by decide

/-- 5ad5: nibbles fold back to 23253; digit sum 33 ≡ 23253 (mod 15). -/
theorem enumeration_hex4_5ad5 : reassembles 23253 = true ∧ castsFifteens 23253 = true := by decide

/-- 5ad6: nibbles fold back to 23254; digit sum 34 ≡ 23254 (mod 15). -/
theorem enumeration_hex4_5ad6 : reassembles 23254 = true ∧ castsFifteens 23254 = true := by decide

/-- 5ad7: nibbles fold back to 23255; digit sum 35 ≡ 23255 (mod 15). -/
theorem enumeration_hex4_5ad7 : reassembles 23255 = true ∧ castsFifteens 23255 = true := by decide

/-- 5ad8: nibbles fold back to 23256; digit sum 36 ≡ 23256 (mod 15). -/
theorem enumeration_hex4_5ad8 : reassembles 23256 = true ∧ castsFifteens 23256 = true := by decide

/-- 5ad9: nibbles fold back to 23257; digit sum 37 ≡ 23257 (mod 15). -/
theorem enumeration_hex4_5ad9 : reassembles 23257 = true ∧ castsFifteens 23257 = true := by decide

/-- 5ada: nibbles fold back to 23258; digit sum 38 ≡ 23258 (mod 15). -/
theorem enumeration_hex4_5ada : reassembles 23258 = true ∧ castsFifteens 23258 = true := by decide

/-- 5adb: nibbles fold back to 23259; digit sum 39 ≡ 23259 (mod 15). -/
theorem enumeration_hex4_5adb : reassembles 23259 = true ∧ castsFifteens 23259 = true := by decide

/-- 5adc: nibbles fold back to 23260; digit sum 40 ≡ 23260 (mod 15). -/
theorem enumeration_hex4_5adc : reassembles 23260 = true ∧ castsFifteens 23260 = true := by decide

/-- 5add: nibbles fold back to 23261; digit sum 41 ≡ 23261 (mod 15). -/
theorem enumeration_hex4_5add : reassembles 23261 = true ∧ castsFifteens 23261 = true := by decide

/-- 5ade: nibbles fold back to 23262; digit sum 42 ≡ 23262 (mod 15). -/
theorem enumeration_hex4_5ade : reassembles 23262 = true ∧ castsFifteens 23262 = true := by decide

/-- 5adf: nibbles fold back to 23263; digit sum 43 ≡ 23263 (mod 15). -/
theorem enumeration_hex4_5adf : reassembles 23263 = true ∧ castsFifteens 23263 = true := by decide

/-- 5ae0: nibbles fold back to 23264; digit sum 29 ≡ 23264 (mod 15). -/
theorem enumeration_hex4_5ae0 : reassembles 23264 = true ∧ castsFifteens 23264 = true := by decide

/-- 5ae1: nibbles fold back to 23265; digit sum 30 ≡ 23265 (mod 15). -/
theorem enumeration_hex4_5ae1 : reassembles 23265 = true ∧ castsFifteens 23265 = true := by decide

/-- 5ae2: nibbles fold back to 23266; digit sum 31 ≡ 23266 (mod 15). -/
theorem enumeration_hex4_5ae2 : reassembles 23266 = true ∧ castsFifteens 23266 = true := by decide

/-- 5ae3: nibbles fold back to 23267; digit sum 32 ≡ 23267 (mod 15). -/
theorem enumeration_hex4_5ae3 : reassembles 23267 = true ∧ castsFifteens 23267 = true := by decide

/-- 5ae4: nibbles fold back to 23268; digit sum 33 ≡ 23268 (mod 15). -/
theorem enumeration_hex4_5ae4 : reassembles 23268 = true ∧ castsFifteens 23268 = true := by decide

/-- 5ae5: nibbles fold back to 23269; digit sum 34 ≡ 23269 (mod 15). -/
theorem enumeration_hex4_5ae5 : reassembles 23269 = true ∧ castsFifteens 23269 = true := by decide

/-- 5ae6: nibbles fold back to 23270; digit sum 35 ≡ 23270 (mod 15). -/
theorem enumeration_hex4_5ae6 : reassembles 23270 = true ∧ castsFifteens 23270 = true := by decide

/-- 5ae7: nibbles fold back to 23271; digit sum 36 ≡ 23271 (mod 15). -/
theorem enumeration_hex4_5ae7 : reassembles 23271 = true ∧ castsFifteens 23271 = true := by decide

/-- 5ae8: nibbles fold back to 23272; digit sum 37 ≡ 23272 (mod 15). -/
theorem enumeration_hex4_5ae8 : reassembles 23272 = true ∧ castsFifteens 23272 = true := by decide

/-- 5ae9: nibbles fold back to 23273; digit sum 38 ≡ 23273 (mod 15). -/
theorem enumeration_hex4_5ae9 : reassembles 23273 = true ∧ castsFifteens 23273 = true := by decide

/-- 5aea: nibbles fold back to 23274; digit sum 39 ≡ 23274 (mod 15). -/
theorem enumeration_hex4_5aea : reassembles 23274 = true ∧ castsFifteens 23274 = true := by decide

/-- 5aeb: nibbles fold back to 23275; digit sum 40 ≡ 23275 (mod 15). -/
theorem enumeration_hex4_5aeb : reassembles 23275 = true ∧ castsFifteens 23275 = true := by decide

/-- 5aec: nibbles fold back to 23276; digit sum 41 ≡ 23276 (mod 15). -/
theorem enumeration_hex4_5aec : reassembles 23276 = true ∧ castsFifteens 23276 = true := by decide

/-- 5aed: nibbles fold back to 23277; digit sum 42 ≡ 23277 (mod 15). -/
theorem enumeration_hex4_5aed : reassembles 23277 = true ∧ castsFifteens 23277 = true := by decide

/-- 5aee: nibbles fold back to 23278; digit sum 43 ≡ 23278 (mod 15). -/
theorem enumeration_hex4_5aee : reassembles 23278 = true ∧ castsFifteens 23278 = true := by decide

/-- 5aef: nibbles fold back to 23279; digit sum 44 ≡ 23279 (mod 15). -/
theorem enumeration_hex4_5aef : reassembles 23279 = true ∧ castsFifteens 23279 = true := by decide

/-- 5af0: nibbles fold back to 23280; digit sum 30 ≡ 23280 (mod 15). -/
theorem enumeration_hex4_5af0 : reassembles 23280 = true ∧ castsFifteens 23280 = true := by decide

/-- 5af1: nibbles fold back to 23281; digit sum 31 ≡ 23281 (mod 15). -/
theorem enumeration_hex4_5af1 : reassembles 23281 = true ∧ castsFifteens 23281 = true := by decide

/-- 5af2: nibbles fold back to 23282; digit sum 32 ≡ 23282 (mod 15). -/
theorem enumeration_hex4_5af2 : reassembles 23282 = true ∧ castsFifteens 23282 = true := by decide

/-- 5af3: nibbles fold back to 23283; digit sum 33 ≡ 23283 (mod 15). -/
theorem enumeration_hex4_5af3 : reassembles 23283 = true ∧ castsFifteens 23283 = true := by decide

/-- 5af4: nibbles fold back to 23284; digit sum 34 ≡ 23284 (mod 15). -/
theorem enumeration_hex4_5af4 : reassembles 23284 = true ∧ castsFifteens 23284 = true := by decide

/-- 5af5: nibbles fold back to 23285; digit sum 35 ≡ 23285 (mod 15). -/
theorem enumeration_hex4_5af5 : reassembles 23285 = true ∧ castsFifteens 23285 = true := by decide

/-- 5af6: nibbles fold back to 23286; digit sum 36 ≡ 23286 (mod 15). -/
theorem enumeration_hex4_5af6 : reassembles 23286 = true ∧ castsFifteens 23286 = true := by decide

/-- 5af7: nibbles fold back to 23287; digit sum 37 ≡ 23287 (mod 15). -/
theorem enumeration_hex4_5af7 : reassembles 23287 = true ∧ castsFifteens 23287 = true := by decide

/-- 5af8: nibbles fold back to 23288; digit sum 38 ≡ 23288 (mod 15). -/
theorem enumeration_hex4_5af8 : reassembles 23288 = true ∧ castsFifteens 23288 = true := by decide

/-- 5af9: nibbles fold back to 23289; digit sum 39 ≡ 23289 (mod 15). -/
theorem enumeration_hex4_5af9 : reassembles 23289 = true ∧ castsFifteens 23289 = true := by decide

/-- 5afa: nibbles fold back to 23290; digit sum 40 ≡ 23290 (mod 15). -/
theorem enumeration_hex4_5afa : reassembles 23290 = true ∧ castsFifteens 23290 = true := by decide

/-- 5afb: nibbles fold back to 23291; digit sum 41 ≡ 23291 (mod 15). -/
theorem enumeration_hex4_5afb : reassembles 23291 = true ∧ castsFifteens 23291 = true := by decide

/-- 5afc: nibbles fold back to 23292; digit sum 42 ≡ 23292 (mod 15). -/
theorem enumeration_hex4_5afc : reassembles 23292 = true ∧ castsFifteens 23292 = true := by decide

/-- 5afd: nibbles fold back to 23293; digit sum 43 ≡ 23293 (mod 15). -/
theorem enumeration_hex4_5afd : reassembles 23293 = true ∧ castsFifteens 23293 = true := by decide

/-- 5afe: nibbles fold back to 23294; digit sum 44 ≡ 23294 (mod 15). -/
theorem enumeration_hex4_5afe : reassembles 23294 = true ∧ castsFifteens 23294 = true := by decide

/-- 5aff: nibbles fold back to 23295; digit sum 45 ≡ 23295 (mod 15). -/
theorem enumeration_hex4_5aff : reassembles 23295 = true ∧ castsFifteens 23295 = true := by decide

/-- 5b00: nibbles fold back to 23296; digit sum 16 ≡ 23296 (mod 15). -/
theorem enumeration_hex4_5b00 : reassembles 23296 = true ∧ castsFifteens 23296 = true := by decide

/-- 5b01: nibbles fold back to 23297; digit sum 17 ≡ 23297 (mod 15). -/
theorem enumeration_hex4_5b01 : reassembles 23297 = true ∧ castsFifteens 23297 = true := by decide

/-- 5b02: nibbles fold back to 23298; digit sum 18 ≡ 23298 (mod 15). -/
theorem enumeration_hex4_5b02 : reassembles 23298 = true ∧ castsFifteens 23298 = true := by decide

/-- 5b03: nibbles fold back to 23299; digit sum 19 ≡ 23299 (mod 15). -/
theorem enumeration_hex4_5b03 : reassembles 23299 = true ∧ castsFifteens 23299 = true := by decide

/-- 5b04: nibbles fold back to 23300; digit sum 20 ≡ 23300 (mod 15). -/
theorem enumeration_hex4_5b04 : reassembles 23300 = true ∧ castsFifteens 23300 = true := by decide

/-- 5b05: nibbles fold back to 23301; digit sum 21 ≡ 23301 (mod 15). -/
theorem enumeration_hex4_5b05 : reassembles 23301 = true ∧ castsFifteens 23301 = true := by decide

/-- 5b06: nibbles fold back to 23302; digit sum 22 ≡ 23302 (mod 15). -/
theorem enumeration_hex4_5b06 : reassembles 23302 = true ∧ castsFifteens 23302 = true := by decide

/-- 5b07: nibbles fold back to 23303; digit sum 23 ≡ 23303 (mod 15). -/
theorem enumeration_hex4_5b07 : reassembles 23303 = true ∧ castsFifteens 23303 = true := by decide

/-- 5b08: nibbles fold back to 23304; digit sum 24 ≡ 23304 (mod 15). -/
theorem enumeration_hex4_5b08 : reassembles 23304 = true ∧ castsFifteens 23304 = true := by decide

/-- 5b09: nibbles fold back to 23305; digit sum 25 ≡ 23305 (mod 15). -/
theorem enumeration_hex4_5b09 : reassembles 23305 = true ∧ castsFifteens 23305 = true := by decide

/-- 5b0a: nibbles fold back to 23306; digit sum 26 ≡ 23306 (mod 15). -/
theorem enumeration_hex4_5b0a : reassembles 23306 = true ∧ castsFifteens 23306 = true := by decide

/-- 5b0b: nibbles fold back to 23307; digit sum 27 ≡ 23307 (mod 15). -/
theorem enumeration_hex4_5b0b : reassembles 23307 = true ∧ castsFifteens 23307 = true := by decide

/-- 5b0c: nibbles fold back to 23308; digit sum 28 ≡ 23308 (mod 15). -/
theorem enumeration_hex4_5b0c : reassembles 23308 = true ∧ castsFifteens 23308 = true := by decide

/-- 5b0d: nibbles fold back to 23309; digit sum 29 ≡ 23309 (mod 15). -/
theorem enumeration_hex4_5b0d : reassembles 23309 = true ∧ castsFifteens 23309 = true := by decide

/-- 5b0e: nibbles fold back to 23310; digit sum 30 ≡ 23310 (mod 15). -/
theorem enumeration_hex4_5b0e : reassembles 23310 = true ∧ castsFifteens 23310 = true := by decide

/-- 5b0f: nibbles fold back to 23311; digit sum 31 ≡ 23311 (mod 15). -/
theorem enumeration_hex4_5b0f : reassembles 23311 = true ∧ castsFifteens 23311 = true := by decide

/-- 5b10: nibbles fold back to 23312; digit sum 17 ≡ 23312 (mod 15). -/
theorem enumeration_hex4_5b10 : reassembles 23312 = true ∧ castsFifteens 23312 = true := by decide

/-- 5b11: nibbles fold back to 23313; digit sum 18 ≡ 23313 (mod 15). -/
theorem enumeration_hex4_5b11 : reassembles 23313 = true ∧ castsFifteens 23313 = true := by decide

/-- 5b12: nibbles fold back to 23314; digit sum 19 ≡ 23314 (mod 15). -/
theorem enumeration_hex4_5b12 : reassembles 23314 = true ∧ castsFifteens 23314 = true := by decide

/-- 5b13: nibbles fold back to 23315; digit sum 20 ≡ 23315 (mod 15). -/
theorem enumeration_hex4_5b13 : reassembles 23315 = true ∧ castsFifteens 23315 = true := by decide

/-- 5b14: nibbles fold back to 23316; digit sum 21 ≡ 23316 (mod 15). -/
theorem enumeration_hex4_5b14 : reassembles 23316 = true ∧ castsFifteens 23316 = true := by decide

/-- 5b15: nibbles fold back to 23317; digit sum 22 ≡ 23317 (mod 15). -/
theorem enumeration_hex4_5b15 : reassembles 23317 = true ∧ castsFifteens 23317 = true := by decide

/-- 5b16: nibbles fold back to 23318; digit sum 23 ≡ 23318 (mod 15). -/
theorem enumeration_hex4_5b16 : reassembles 23318 = true ∧ castsFifteens 23318 = true := by decide

/-- 5b17: nibbles fold back to 23319; digit sum 24 ≡ 23319 (mod 15). -/
theorem enumeration_hex4_5b17 : reassembles 23319 = true ∧ castsFifteens 23319 = true := by decide

/-- 5b18: nibbles fold back to 23320; digit sum 25 ≡ 23320 (mod 15). -/
theorem enumeration_hex4_5b18 : reassembles 23320 = true ∧ castsFifteens 23320 = true := by decide

/-- 5b19: nibbles fold back to 23321; digit sum 26 ≡ 23321 (mod 15). -/
theorem enumeration_hex4_5b19 : reassembles 23321 = true ∧ castsFifteens 23321 = true := by decide

/-- 5b1a: nibbles fold back to 23322; digit sum 27 ≡ 23322 (mod 15). -/
theorem enumeration_hex4_5b1a : reassembles 23322 = true ∧ castsFifteens 23322 = true := by decide

/-- 5b1b: nibbles fold back to 23323; digit sum 28 ≡ 23323 (mod 15). -/
theorem enumeration_hex4_5b1b : reassembles 23323 = true ∧ castsFifteens 23323 = true := by decide

/-- 5b1c: nibbles fold back to 23324; digit sum 29 ≡ 23324 (mod 15). -/
theorem enumeration_hex4_5b1c : reassembles 23324 = true ∧ castsFifteens 23324 = true := by decide

/-- 5b1d: nibbles fold back to 23325; digit sum 30 ≡ 23325 (mod 15). -/
theorem enumeration_hex4_5b1d : reassembles 23325 = true ∧ castsFifteens 23325 = true := by decide

/-- 5b1e: nibbles fold back to 23326; digit sum 31 ≡ 23326 (mod 15). -/
theorem enumeration_hex4_5b1e : reassembles 23326 = true ∧ castsFifteens 23326 = true := by decide

/-- 5b1f: nibbles fold back to 23327; digit sum 32 ≡ 23327 (mod 15). -/
theorem enumeration_hex4_5b1f : reassembles 23327 = true ∧ castsFifteens 23327 = true := by decide

/-- 5b20: nibbles fold back to 23328; digit sum 18 ≡ 23328 (mod 15). -/
theorem enumeration_hex4_5b20 : reassembles 23328 = true ∧ castsFifteens 23328 = true := by decide

/-- 5b21: nibbles fold back to 23329; digit sum 19 ≡ 23329 (mod 15). -/
theorem enumeration_hex4_5b21 : reassembles 23329 = true ∧ castsFifteens 23329 = true := by decide

/-- 5b22: nibbles fold back to 23330; digit sum 20 ≡ 23330 (mod 15). -/
theorem enumeration_hex4_5b22 : reassembles 23330 = true ∧ castsFifteens 23330 = true := by decide

/-- 5b23: nibbles fold back to 23331; digit sum 21 ≡ 23331 (mod 15). -/
theorem enumeration_hex4_5b23 : reassembles 23331 = true ∧ castsFifteens 23331 = true := by decide

/-- 5b24: nibbles fold back to 23332; digit sum 22 ≡ 23332 (mod 15). -/
theorem enumeration_hex4_5b24 : reassembles 23332 = true ∧ castsFifteens 23332 = true := by decide

/-- 5b25: nibbles fold back to 23333; digit sum 23 ≡ 23333 (mod 15). -/
theorem enumeration_hex4_5b25 : reassembles 23333 = true ∧ castsFifteens 23333 = true := by decide

/-- 5b26: nibbles fold back to 23334; digit sum 24 ≡ 23334 (mod 15). -/
theorem enumeration_hex4_5b26 : reassembles 23334 = true ∧ castsFifteens 23334 = true := by decide

/-- 5b27: nibbles fold back to 23335; digit sum 25 ≡ 23335 (mod 15). -/
theorem enumeration_hex4_5b27 : reassembles 23335 = true ∧ castsFifteens 23335 = true := by decide

/-- 5b28: nibbles fold back to 23336; digit sum 26 ≡ 23336 (mod 15). -/
theorem enumeration_hex4_5b28 : reassembles 23336 = true ∧ castsFifteens 23336 = true := by decide

/-- 5b29: nibbles fold back to 23337; digit sum 27 ≡ 23337 (mod 15). -/
theorem enumeration_hex4_5b29 : reassembles 23337 = true ∧ castsFifteens 23337 = true := by decide

/-- 5b2a: nibbles fold back to 23338; digit sum 28 ≡ 23338 (mod 15). -/
theorem enumeration_hex4_5b2a : reassembles 23338 = true ∧ castsFifteens 23338 = true := by decide

/-- 5b2b: nibbles fold back to 23339; digit sum 29 ≡ 23339 (mod 15). -/
theorem enumeration_hex4_5b2b : reassembles 23339 = true ∧ castsFifteens 23339 = true := by decide

/-- 5b2c: nibbles fold back to 23340; digit sum 30 ≡ 23340 (mod 15). -/
theorem enumeration_hex4_5b2c : reassembles 23340 = true ∧ castsFifteens 23340 = true := by decide

/-- 5b2d: nibbles fold back to 23341; digit sum 31 ≡ 23341 (mod 15). -/
theorem enumeration_hex4_5b2d : reassembles 23341 = true ∧ castsFifteens 23341 = true := by decide

/-- 5b2e: nibbles fold back to 23342; digit sum 32 ≡ 23342 (mod 15). -/
theorem enumeration_hex4_5b2e : reassembles 23342 = true ∧ castsFifteens 23342 = true := by decide

/-- 5b2f: nibbles fold back to 23343; digit sum 33 ≡ 23343 (mod 15). -/
theorem enumeration_hex4_5b2f : reassembles 23343 = true ∧ castsFifteens 23343 = true := by decide

/-- 5b30: nibbles fold back to 23344; digit sum 19 ≡ 23344 (mod 15). -/
theorem enumeration_hex4_5b30 : reassembles 23344 = true ∧ castsFifteens 23344 = true := by decide

/-- 5b31: nibbles fold back to 23345; digit sum 20 ≡ 23345 (mod 15). -/
theorem enumeration_hex4_5b31 : reassembles 23345 = true ∧ castsFifteens 23345 = true := by decide

/-- 5b32: nibbles fold back to 23346; digit sum 21 ≡ 23346 (mod 15). -/
theorem enumeration_hex4_5b32 : reassembles 23346 = true ∧ castsFifteens 23346 = true := by decide

/-- 5b33: nibbles fold back to 23347; digit sum 22 ≡ 23347 (mod 15). -/
theorem enumeration_hex4_5b33 : reassembles 23347 = true ∧ castsFifteens 23347 = true := by decide

/-- 5b34: nibbles fold back to 23348; digit sum 23 ≡ 23348 (mod 15). -/
theorem enumeration_hex4_5b34 : reassembles 23348 = true ∧ castsFifteens 23348 = true := by decide

/-- 5b35: nibbles fold back to 23349; digit sum 24 ≡ 23349 (mod 15). -/
theorem enumeration_hex4_5b35 : reassembles 23349 = true ∧ castsFifteens 23349 = true := by decide

/-- 5b36: nibbles fold back to 23350; digit sum 25 ≡ 23350 (mod 15). -/
theorem enumeration_hex4_5b36 : reassembles 23350 = true ∧ castsFifteens 23350 = true := by decide

/-- 5b37: nibbles fold back to 23351; digit sum 26 ≡ 23351 (mod 15). -/
theorem enumeration_hex4_5b37 : reassembles 23351 = true ∧ castsFifteens 23351 = true := by decide

/-- 5b38: nibbles fold back to 23352; digit sum 27 ≡ 23352 (mod 15). -/
theorem enumeration_hex4_5b38 : reassembles 23352 = true ∧ castsFifteens 23352 = true := by decide

/-- 5b39: nibbles fold back to 23353; digit sum 28 ≡ 23353 (mod 15). -/
theorem enumeration_hex4_5b39 : reassembles 23353 = true ∧ castsFifteens 23353 = true := by decide

/-- 5b3a: nibbles fold back to 23354; digit sum 29 ≡ 23354 (mod 15). -/
theorem enumeration_hex4_5b3a : reassembles 23354 = true ∧ castsFifteens 23354 = true := by decide

/-- 5b3b: nibbles fold back to 23355; digit sum 30 ≡ 23355 (mod 15). -/
theorem enumeration_hex4_5b3b : reassembles 23355 = true ∧ castsFifteens 23355 = true := by decide

/-- 5b3c: nibbles fold back to 23356; digit sum 31 ≡ 23356 (mod 15). -/
theorem enumeration_hex4_5b3c : reassembles 23356 = true ∧ castsFifteens 23356 = true := by decide

/-- 5b3d: nibbles fold back to 23357; digit sum 32 ≡ 23357 (mod 15). -/
theorem enumeration_hex4_5b3d : reassembles 23357 = true ∧ castsFifteens 23357 = true := by decide

/-- 5b3e: nibbles fold back to 23358; digit sum 33 ≡ 23358 (mod 15). -/
theorem enumeration_hex4_5b3e : reassembles 23358 = true ∧ castsFifteens 23358 = true := by decide

/-- 5b3f: nibbles fold back to 23359; digit sum 34 ≡ 23359 (mod 15). -/
theorem enumeration_hex4_5b3f : reassembles 23359 = true ∧ castsFifteens 23359 = true := by decide

/-- 5b40: nibbles fold back to 23360; digit sum 20 ≡ 23360 (mod 15). -/
theorem enumeration_hex4_5b40 : reassembles 23360 = true ∧ castsFifteens 23360 = true := by decide

/-- 5b41: nibbles fold back to 23361; digit sum 21 ≡ 23361 (mod 15). -/
theorem enumeration_hex4_5b41 : reassembles 23361 = true ∧ castsFifteens 23361 = true := by decide

/-- 5b42: nibbles fold back to 23362; digit sum 22 ≡ 23362 (mod 15). -/
theorem enumeration_hex4_5b42 : reassembles 23362 = true ∧ castsFifteens 23362 = true := by decide

/-- 5b43: nibbles fold back to 23363; digit sum 23 ≡ 23363 (mod 15). -/
theorem enumeration_hex4_5b43 : reassembles 23363 = true ∧ castsFifteens 23363 = true := by decide

/-- 5b44: nibbles fold back to 23364; digit sum 24 ≡ 23364 (mod 15). -/
theorem enumeration_hex4_5b44 : reassembles 23364 = true ∧ castsFifteens 23364 = true := by decide

/-- 5b45: nibbles fold back to 23365; digit sum 25 ≡ 23365 (mod 15). -/
theorem enumeration_hex4_5b45 : reassembles 23365 = true ∧ castsFifteens 23365 = true := by decide

/-- 5b46: nibbles fold back to 23366; digit sum 26 ≡ 23366 (mod 15). -/
theorem enumeration_hex4_5b46 : reassembles 23366 = true ∧ castsFifteens 23366 = true := by decide

/-- 5b47: nibbles fold back to 23367; digit sum 27 ≡ 23367 (mod 15). -/
theorem enumeration_hex4_5b47 : reassembles 23367 = true ∧ castsFifteens 23367 = true := by decide

/-- 5b48: nibbles fold back to 23368; digit sum 28 ≡ 23368 (mod 15). -/
theorem enumeration_hex4_5b48 : reassembles 23368 = true ∧ castsFifteens 23368 = true := by decide

/-- 5b49: nibbles fold back to 23369; digit sum 29 ≡ 23369 (mod 15). -/
theorem enumeration_hex4_5b49 : reassembles 23369 = true ∧ castsFifteens 23369 = true := by decide

/-- 5b4a: nibbles fold back to 23370; digit sum 30 ≡ 23370 (mod 15). -/
theorem enumeration_hex4_5b4a : reassembles 23370 = true ∧ castsFifteens 23370 = true := by decide

/-- 5b4b: nibbles fold back to 23371; digit sum 31 ≡ 23371 (mod 15). -/
theorem enumeration_hex4_5b4b : reassembles 23371 = true ∧ castsFifteens 23371 = true := by decide

/-- 5b4c: nibbles fold back to 23372; digit sum 32 ≡ 23372 (mod 15). -/
theorem enumeration_hex4_5b4c : reassembles 23372 = true ∧ castsFifteens 23372 = true := by decide

/-- 5b4d: nibbles fold back to 23373; digit sum 33 ≡ 23373 (mod 15). -/
theorem enumeration_hex4_5b4d : reassembles 23373 = true ∧ castsFifteens 23373 = true := by decide

/-- 5b4e: nibbles fold back to 23374; digit sum 34 ≡ 23374 (mod 15). -/
theorem enumeration_hex4_5b4e : reassembles 23374 = true ∧ castsFifteens 23374 = true := by decide

/-- 5b4f: nibbles fold back to 23375; digit sum 35 ≡ 23375 (mod 15). -/
theorem enumeration_hex4_5b4f : reassembles 23375 = true ∧ castsFifteens 23375 = true := by decide

/-- 5b50: nibbles fold back to 23376; digit sum 21 ≡ 23376 (mod 15). -/
theorem enumeration_hex4_5b50 : reassembles 23376 = true ∧ castsFifteens 23376 = true := by decide

/-- 5b51: nibbles fold back to 23377; digit sum 22 ≡ 23377 (mod 15). -/
theorem enumeration_hex4_5b51 : reassembles 23377 = true ∧ castsFifteens 23377 = true := by decide

/-- 5b52: nibbles fold back to 23378; digit sum 23 ≡ 23378 (mod 15). -/
theorem enumeration_hex4_5b52 : reassembles 23378 = true ∧ castsFifteens 23378 = true := by decide

/-- 5b53: nibbles fold back to 23379; digit sum 24 ≡ 23379 (mod 15). -/
theorem enumeration_hex4_5b53 : reassembles 23379 = true ∧ castsFifteens 23379 = true := by decide

/-- 5b54: nibbles fold back to 23380; digit sum 25 ≡ 23380 (mod 15). -/
theorem enumeration_hex4_5b54 : reassembles 23380 = true ∧ castsFifteens 23380 = true := by decide

/-- 5b55: nibbles fold back to 23381; digit sum 26 ≡ 23381 (mod 15). -/
theorem enumeration_hex4_5b55 : reassembles 23381 = true ∧ castsFifteens 23381 = true := by decide

/-- 5b56: nibbles fold back to 23382; digit sum 27 ≡ 23382 (mod 15). -/
theorem enumeration_hex4_5b56 : reassembles 23382 = true ∧ castsFifteens 23382 = true := by decide

/-- 5b57: nibbles fold back to 23383; digit sum 28 ≡ 23383 (mod 15). -/
theorem enumeration_hex4_5b57 : reassembles 23383 = true ∧ castsFifteens 23383 = true := by decide

/-- 5b58: nibbles fold back to 23384; digit sum 29 ≡ 23384 (mod 15). -/
theorem enumeration_hex4_5b58 : reassembles 23384 = true ∧ castsFifteens 23384 = true := by decide

/-- 5b59: nibbles fold back to 23385; digit sum 30 ≡ 23385 (mod 15). -/
theorem enumeration_hex4_5b59 : reassembles 23385 = true ∧ castsFifteens 23385 = true := by decide

/-- 5b5a: nibbles fold back to 23386; digit sum 31 ≡ 23386 (mod 15). -/
theorem enumeration_hex4_5b5a : reassembles 23386 = true ∧ castsFifteens 23386 = true := by decide

/-- 5b5b: nibbles fold back to 23387; digit sum 32 ≡ 23387 (mod 15). -/
theorem enumeration_hex4_5b5b : reassembles 23387 = true ∧ castsFifteens 23387 = true := by decide

/-- 5b5c: nibbles fold back to 23388; digit sum 33 ≡ 23388 (mod 15). -/
theorem enumeration_hex4_5b5c : reassembles 23388 = true ∧ castsFifteens 23388 = true := by decide

/-- 5b5d: nibbles fold back to 23389; digit sum 34 ≡ 23389 (mod 15). -/
theorem enumeration_hex4_5b5d : reassembles 23389 = true ∧ castsFifteens 23389 = true := by decide

/-- 5b5e: nibbles fold back to 23390; digit sum 35 ≡ 23390 (mod 15). -/
theorem enumeration_hex4_5b5e : reassembles 23390 = true ∧ castsFifteens 23390 = true := by decide

/-- 5b5f: nibbles fold back to 23391; digit sum 36 ≡ 23391 (mod 15). -/
theorem enumeration_hex4_5b5f : reassembles 23391 = true ∧ castsFifteens 23391 = true := by decide

/-- 5b60: nibbles fold back to 23392; digit sum 22 ≡ 23392 (mod 15). -/
theorem enumeration_hex4_5b60 : reassembles 23392 = true ∧ castsFifteens 23392 = true := by decide

/-- 5b61: nibbles fold back to 23393; digit sum 23 ≡ 23393 (mod 15). -/
theorem enumeration_hex4_5b61 : reassembles 23393 = true ∧ castsFifteens 23393 = true := by decide

/-- 5b62: nibbles fold back to 23394; digit sum 24 ≡ 23394 (mod 15). -/
theorem enumeration_hex4_5b62 : reassembles 23394 = true ∧ castsFifteens 23394 = true := by decide

/-- 5b63: nibbles fold back to 23395; digit sum 25 ≡ 23395 (mod 15). -/
theorem enumeration_hex4_5b63 : reassembles 23395 = true ∧ castsFifteens 23395 = true := by decide

/-- 5b64: nibbles fold back to 23396; digit sum 26 ≡ 23396 (mod 15). -/
theorem enumeration_hex4_5b64 : reassembles 23396 = true ∧ castsFifteens 23396 = true := by decide

/-- 5b65: nibbles fold back to 23397; digit sum 27 ≡ 23397 (mod 15). -/
theorem enumeration_hex4_5b65 : reassembles 23397 = true ∧ castsFifteens 23397 = true := by decide

/-- 5b66: nibbles fold back to 23398; digit sum 28 ≡ 23398 (mod 15). -/
theorem enumeration_hex4_5b66 : reassembles 23398 = true ∧ castsFifteens 23398 = true := by decide

/-- 5b67: nibbles fold back to 23399; digit sum 29 ≡ 23399 (mod 15). -/
theorem enumeration_hex4_5b67 : reassembles 23399 = true ∧ castsFifteens 23399 = true := by decide

/-- 5b68: nibbles fold back to 23400; digit sum 30 ≡ 23400 (mod 15). -/
theorem enumeration_hex4_5b68 : reassembles 23400 = true ∧ castsFifteens 23400 = true := by decide

/-- 5b69: nibbles fold back to 23401; digit sum 31 ≡ 23401 (mod 15). -/
theorem enumeration_hex4_5b69 : reassembles 23401 = true ∧ castsFifteens 23401 = true := by decide

/-- 5b6a: nibbles fold back to 23402; digit sum 32 ≡ 23402 (mod 15). -/
theorem enumeration_hex4_5b6a : reassembles 23402 = true ∧ castsFifteens 23402 = true := by decide

/-- 5b6b: nibbles fold back to 23403; digit sum 33 ≡ 23403 (mod 15). -/
theorem enumeration_hex4_5b6b : reassembles 23403 = true ∧ castsFifteens 23403 = true := by decide

/-- 5b6c: nibbles fold back to 23404; digit sum 34 ≡ 23404 (mod 15). -/
theorem enumeration_hex4_5b6c : reassembles 23404 = true ∧ castsFifteens 23404 = true := by decide

/-- 5b6d: nibbles fold back to 23405; digit sum 35 ≡ 23405 (mod 15). -/
theorem enumeration_hex4_5b6d : reassembles 23405 = true ∧ castsFifteens 23405 = true := by decide

/-- 5b6e: nibbles fold back to 23406; digit sum 36 ≡ 23406 (mod 15). -/
theorem enumeration_hex4_5b6e : reassembles 23406 = true ∧ castsFifteens 23406 = true := by decide

/-- 5b6f: nibbles fold back to 23407; digit sum 37 ≡ 23407 (mod 15). -/
theorem enumeration_hex4_5b6f : reassembles 23407 = true ∧ castsFifteens 23407 = true := by decide

/-- 5b70: nibbles fold back to 23408; digit sum 23 ≡ 23408 (mod 15). -/
theorem enumeration_hex4_5b70 : reassembles 23408 = true ∧ castsFifteens 23408 = true := by decide

/-- 5b71: nibbles fold back to 23409; digit sum 24 ≡ 23409 (mod 15). -/
theorem enumeration_hex4_5b71 : reassembles 23409 = true ∧ castsFifteens 23409 = true := by decide

/-- 5b72: nibbles fold back to 23410; digit sum 25 ≡ 23410 (mod 15). -/
theorem enumeration_hex4_5b72 : reassembles 23410 = true ∧ castsFifteens 23410 = true := by decide

/-- 5b73: nibbles fold back to 23411; digit sum 26 ≡ 23411 (mod 15). -/
theorem enumeration_hex4_5b73 : reassembles 23411 = true ∧ castsFifteens 23411 = true := by decide

/-- 5b74: nibbles fold back to 23412; digit sum 27 ≡ 23412 (mod 15). -/
theorem enumeration_hex4_5b74 : reassembles 23412 = true ∧ castsFifteens 23412 = true := by decide

/-- 5b75: nibbles fold back to 23413; digit sum 28 ≡ 23413 (mod 15). -/
theorem enumeration_hex4_5b75 : reassembles 23413 = true ∧ castsFifteens 23413 = true := by decide

/-- 5b76: nibbles fold back to 23414; digit sum 29 ≡ 23414 (mod 15). -/
theorem enumeration_hex4_5b76 : reassembles 23414 = true ∧ castsFifteens 23414 = true := by decide

/-- 5b77: nibbles fold back to 23415; digit sum 30 ≡ 23415 (mod 15). -/
theorem enumeration_hex4_5b77 : reassembles 23415 = true ∧ castsFifteens 23415 = true := by decide

/-- 5b78: nibbles fold back to 23416; digit sum 31 ≡ 23416 (mod 15). -/
theorem enumeration_hex4_5b78 : reassembles 23416 = true ∧ castsFifteens 23416 = true := by decide

/-- 5b79: nibbles fold back to 23417; digit sum 32 ≡ 23417 (mod 15). -/
theorem enumeration_hex4_5b79 : reassembles 23417 = true ∧ castsFifteens 23417 = true := by decide

/-- 5b7a: nibbles fold back to 23418; digit sum 33 ≡ 23418 (mod 15). -/
theorem enumeration_hex4_5b7a : reassembles 23418 = true ∧ castsFifteens 23418 = true := by decide

/-- 5b7b: nibbles fold back to 23419; digit sum 34 ≡ 23419 (mod 15). -/
theorem enumeration_hex4_5b7b : reassembles 23419 = true ∧ castsFifteens 23419 = true := by decide

/-- 5b7c: nibbles fold back to 23420; digit sum 35 ≡ 23420 (mod 15). -/
theorem enumeration_hex4_5b7c : reassembles 23420 = true ∧ castsFifteens 23420 = true := by decide

/-- 5b7d: nibbles fold back to 23421; digit sum 36 ≡ 23421 (mod 15). -/
theorem enumeration_hex4_5b7d : reassembles 23421 = true ∧ castsFifteens 23421 = true := by decide

/-- 5b7e: nibbles fold back to 23422; digit sum 37 ≡ 23422 (mod 15). -/
theorem enumeration_hex4_5b7e : reassembles 23422 = true ∧ castsFifteens 23422 = true := by decide

/-- 5b7f: nibbles fold back to 23423; digit sum 38 ≡ 23423 (mod 15). -/
theorem enumeration_hex4_5b7f : reassembles 23423 = true ∧ castsFifteens 23423 = true := by decide

/-- 5b80: nibbles fold back to 23424; digit sum 24 ≡ 23424 (mod 15). -/
theorem enumeration_hex4_5b80 : reassembles 23424 = true ∧ castsFifteens 23424 = true := by decide

/-- 5b81: nibbles fold back to 23425; digit sum 25 ≡ 23425 (mod 15). -/
theorem enumeration_hex4_5b81 : reassembles 23425 = true ∧ castsFifteens 23425 = true := by decide

/-- 5b82: nibbles fold back to 23426; digit sum 26 ≡ 23426 (mod 15). -/
theorem enumeration_hex4_5b82 : reassembles 23426 = true ∧ castsFifteens 23426 = true := by decide

/-- 5b83: nibbles fold back to 23427; digit sum 27 ≡ 23427 (mod 15). -/
theorem enumeration_hex4_5b83 : reassembles 23427 = true ∧ castsFifteens 23427 = true := by decide

/-- 5b84: nibbles fold back to 23428; digit sum 28 ≡ 23428 (mod 15). -/
theorem enumeration_hex4_5b84 : reassembles 23428 = true ∧ castsFifteens 23428 = true := by decide

/-- 5b85: nibbles fold back to 23429; digit sum 29 ≡ 23429 (mod 15). -/
theorem enumeration_hex4_5b85 : reassembles 23429 = true ∧ castsFifteens 23429 = true := by decide

/-- 5b86: nibbles fold back to 23430; digit sum 30 ≡ 23430 (mod 15). -/
theorem enumeration_hex4_5b86 : reassembles 23430 = true ∧ castsFifteens 23430 = true := by decide

/-- 5b87: nibbles fold back to 23431; digit sum 31 ≡ 23431 (mod 15). -/
theorem enumeration_hex4_5b87 : reassembles 23431 = true ∧ castsFifteens 23431 = true := by decide

/-- 5b88: nibbles fold back to 23432; digit sum 32 ≡ 23432 (mod 15). -/
theorem enumeration_hex4_5b88 : reassembles 23432 = true ∧ castsFifteens 23432 = true := by decide

/-- 5b89: nibbles fold back to 23433; digit sum 33 ≡ 23433 (mod 15). -/
theorem enumeration_hex4_5b89 : reassembles 23433 = true ∧ castsFifteens 23433 = true := by decide

/-- 5b8a: nibbles fold back to 23434; digit sum 34 ≡ 23434 (mod 15). -/
theorem enumeration_hex4_5b8a : reassembles 23434 = true ∧ castsFifteens 23434 = true := by decide

/-- 5b8b: nibbles fold back to 23435; digit sum 35 ≡ 23435 (mod 15). -/
theorem enumeration_hex4_5b8b : reassembles 23435 = true ∧ castsFifteens 23435 = true := by decide

/-- 5b8c: nibbles fold back to 23436; digit sum 36 ≡ 23436 (mod 15). -/
theorem enumeration_hex4_5b8c : reassembles 23436 = true ∧ castsFifteens 23436 = true := by decide

/-- 5b8d: nibbles fold back to 23437; digit sum 37 ≡ 23437 (mod 15). -/
theorem enumeration_hex4_5b8d : reassembles 23437 = true ∧ castsFifteens 23437 = true := by decide

/-- 5b8e: nibbles fold back to 23438; digit sum 38 ≡ 23438 (mod 15). -/
theorem enumeration_hex4_5b8e : reassembles 23438 = true ∧ castsFifteens 23438 = true := by decide

/-- 5b8f: nibbles fold back to 23439; digit sum 39 ≡ 23439 (mod 15). -/
theorem enumeration_hex4_5b8f : reassembles 23439 = true ∧ castsFifteens 23439 = true := by decide

/-- 5b90: nibbles fold back to 23440; digit sum 25 ≡ 23440 (mod 15). -/
theorem enumeration_hex4_5b90 : reassembles 23440 = true ∧ castsFifteens 23440 = true := by decide

/-- 5b91: nibbles fold back to 23441; digit sum 26 ≡ 23441 (mod 15). -/
theorem enumeration_hex4_5b91 : reassembles 23441 = true ∧ castsFifteens 23441 = true := by decide

/-- 5b92: nibbles fold back to 23442; digit sum 27 ≡ 23442 (mod 15). -/
theorem enumeration_hex4_5b92 : reassembles 23442 = true ∧ castsFifteens 23442 = true := by decide

/-- 5b93: nibbles fold back to 23443; digit sum 28 ≡ 23443 (mod 15). -/
theorem enumeration_hex4_5b93 : reassembles 23443 = true ∧ castsFifteens 23443 = true := by decide

/-- 5b94: nibbles fold back to 23444; digit sum 29 ≡ 23444 (mod 15). -/
theorem enumeration_hex4_5b94 : reassembles 23444 = true ∧ castsFifteens 23444 = true := by decide

/-- 5b95: nibbles fold back to 23445; digit sum 30 ≡ 23445 (mod 15). -/
theorem enumeration_hex4_5b95 : reassembles 23445 = true ∧ castsFifteens 23445 = true := by decide

/-- 5b96: nibbles fold back to 23446; digit sum 31 ≡ 23446 (mod 15). -/
theorem enumeration_hex4_5b96 : reassembles 23446 = true ∧ castsFifteens 23446 = true := by decide

/-- 5b97: nibbles fold back to 23447; digit sum 32 ≡ 23447 (mod 15). -/
theorem enumeration_hex4_5b97 : reassembles 23447 = true ∧ castsFifteens 23447 = true := by decide

/-- 5b98: nibbles fold back to 23448; digit sum 33 ≡ 23448 (mod 15). -/
theorem enumeration_hex4_5b98 : reassembles 23448 = true ∧ castsFifteens 23448 = true := by decide

/-- 5b99: nibbles fold back to 23449; digit sum 34 ≡ 23449 (mod 15). -/
theorem enumeration_hex4_5b99 : reassembles 23449 = true ∧ castsFifteens 23449 = true := by decide

/-- 5b9a: nibbles fold back to 23450; digit sum 35 ≡ 23450 (mod 15). -/
theorem enumeration_hex4_5b9a : reassembles 23450 = true ∧ castsFifteens 23450 = true := by decide

/-- 5b9b: nibbles fold back to 23451; digit sum 36 ≡ 23451 (mod 15). -/
theorem enumeration_hex4_5b9b : reassembles 23451 = true ∧ castsFifteens 23451 = true := by decide

/-- 5b9c: nibbles fold back to 23452; digit sum 37 ≡ 23452 (mod 15). -/
theorem enumeration_hex4_5b9c : reassembles 23452 = true ∧ castsFifteens 23452 = true := by decide

/-- 5b9d: nibbles fold back to 23453; digit sum 38 ≡ 23453 (mod 15). -/
theorem enumeration_hex4_5b9d : reassembles 23453 = true ∧ castsFifteens 23453 = true := by decide

/-- 5b9e: nibbles fold back to 23454; digit sum 39 ≡ 23454 (mod 15). -/
theorem enumeration_hex4_5b9e : reassembles 23454 = true ∧ castsFifteens 23454 = true := by decide

/-- 5b9f: nibbles fold back to 23455; digit sum 40 ≡ 23455 (mod 15). -/
theorem enumeration_hex4_5b9f : reassembles 23455 = true ∧ castsFifteens 23455 = true := by decide

/-- 5ba0: nibbles fold back to 23456; digit sum 26 ≡ 23456 (mod 15). -/
theorem enumeration_hex4_5ba0 : reassembles 23456 = true ∧ castsFifteens 23456 = true := by decide

/-- 5ba1: nibbles fold back to 23457; digit sum 27 ≡ 23457 (mod 15). -/
theorem enumeration_hex4_5ba1 : reassembles 23457 = true ∧ castsFifteens 23457 = true := by decide

/-- 5ba2: nibbles fold back to 23458; digit sum 28 ≡ 23458 (mod 15). -/
theorem enumeration_hex4_5ba2 : reassembles 23458 = true ∧ castsFifteens 23458 = true := by decide

/-- 5ba3: nibbles fold back to 23459; digit sum 29 ≡ 23459 (mod 15). -/
theorem enumeration_hex4_5ba3 : reassembles 23459 = true ∧ castsFifteens 23459 = true := by decide

/-- 5ba4: nibbles fold back to 23460; digit sum 30 ≡ 23460 (mod 15). -/
theorem enumeration_hex4_5ba4 : reassembles 23460 = true ∧ castsFifteens 23460 = true := by decide

/-- 5ba5: nibbles fold back to 23461; digit sum 31 ≡ 23461 (mod 15). -/
theorem enumeration_hex4_5ba5 : reassembles 23461 = true ∧ castsFifteens 23461 = true := by decide

/-- 5ba6: nibbles fold back to 23462; digit sum 32 ≡ 23462 (mod 15). -/
theorem enumeration_hex4_5ba6 : reassembles 23462 = true ∧ castsFifteens 23462 = true := by decide

/-- 5ba7: nibbles fold back to 23463; digit sum 33 ≡ 23463 (mod 15). -/
theorem enumeration_hex4_5ba7 : reassembles 23463 = true ∧ castsFifteens 23463 = true := by decide

/-- 5ba8: nibbles fold back to 23464; digit sum 34 ≡ 23464 (mod 15). -/
theorem enumeration_hex4_5ba8 : reassembles 23464 = true ∧ castsFifteens 23464 = true := by decide

/-- 5ba9: nibbles fold back to 23465; digit sum 35 ≡ 23465 (mod 15). -/
theorem enumeration_hex4_5ba9 : reassembles 23465 = true ∧ castsFifteens 23465 = true := by decide

/-- 5baa: nibbles fold back to 23466; digit sum 36 ≡ 23466 (mod 15). -/
theorem enumeration_hex4_5baa : reassembles 23466 = true ∧ castsFifteens 23466 = true := by decide

/-- 5bab: nibbles fold back to 23467; digit sum 37 ≡ 23467 (mod 15). -/
theorem enumeration_hex4_5bab : reassembles 23467 = true ∧ castsFifteens 23467 = true := by decide

/-- 5bac: nibbles fold back to 23468; digit sum 38 ≡ 23468 (mod 15). -/
theorem enumeration_hex4_5bac : reassembles 23468 = true ∧ castsFifteens 23468 = true := by decide

/-- 5bad: nibbles fold back to 23469; digit sum 39 ≡ 23469 (mod 15). -/
theorem enumeration_hex4_5bad : reassembles 23469 = true ∧ castsFifteens 23469 = true := by decide

/-- 5bae: nibbles fold back to 23470; digit sum 40 ≡ 23470 (mod 15). -/
theorem enumeration_hex4_5bae : reassembles 23470 = true ∧ castsFifteens 23470 = true := by decide

/-- 5baf: nibbles fold back to 23471; digit sum 41 ≡ 23471 (mod 15). -/
theorem enumeration_hex4_5baf : reassembles 23471 = true ∧ castsFifteens 23471 = true := by decide

/-- 5bb0: nibbles fold back to 23472; digit sum 27 ≡ 23472 (mod 15). -/
theorem enumeration_hex4_5bb0 : reassembles 23472 = true ∧ castsFifteens 23472 = true := by decide

/-- 5bb1: nibbles fold back to 23473; digit sum 28 ≡ 23473 (mod 15). -/
theorem enumeration_hex4_5bb1 : reassembles 23473 = true ∧ castsFifteens 23473 = true := by decide

/-- 5bb2: nibbles fold back to 23474; digit sum 29 ≡ 23474 (mod 15). -/
theorem enumeration_hex4_5bb2 : reassembles 23474 = true ∧ castsFifteens 23474 = true := by decide

/-- 5bb3: nibbles fold back to 23475; digit sum 30 ≡ 23475 (mod 15). -/
theorem enumeration_hex4_5bb3 : reassembles 23475 = true ∧ castsFifteens 23475 = true := by decide

/-- 5bb4: nibbles fold back to 23476; digit sum 31 ≡ 23476 (mod 15). -/
theorem enumeration_hex4_5bb4 : reassembles 23476 = true ∧ castsFifteens 23476 = true := by decide

/-- 5bb5: nibbles fold back to 23477; digit sum 32 ≡ 23477 (mod 15). -/
theorem enumeration_hex4_5bb5 : reassembles 23477 = true ∧ castsFifteens 23477 = true := by decide

/-- 5bb6: nibbles fold back to 23478; digit sum 33 ≡ 23478 (mod 15). -/
theorem enumeration_hex4_5bb6 : reassembles 23478 = true ∧ castsFifteens 23478 = true := by decide

/-- 5bb7: nibbles fold back to 23479; digit sum 34 ≡ 23479 (mod 15). -/
theorem enumeration_hex4_5bb7 : reassembles 23479 = true ∧ castsFifteens 23479 = true := by decide

/-- 5bb8: nibbles fold back to 23480; digit sum 35 ≡ 23480 (mod 15). -/
theorem enumeration_hex4_5bb8 : reassembles 23480 = true ∧ castsFifteens 23480 = true := by decide

/-- 5bb9: nibbles fold back to 23481; digit sum 36 ≡ 23481 (mod 15). -/
theorem enumeration_hex4_5bb9 : reassembles 23481 = true ∧ castsFifteens 23481 = true := by decide

/-- 5bba: nibbles fold back to 23482; digit sum 37 ≡ 23482 (mod 15). -/
theorem enumeration_hex4_5bba : reassembles 23482 = true ∧ castsFifteens 23482 = true := by decide

/-- 5bbb: nibbles fold back to 23483; digit sum 38 ≡ 23483 (mod 15). -/
theorem enumeration_hex4_5bbb : reassembles 23483 = true ∧ castsFifteens 23483 = true := by decide

/-- 5bbc: nibbles fold back to 23484; digit sum 39 ≡ 23484 (mod 15). -/
theorem enumeration_hex4_5bbc : reassembles 23484 = true ∧ castsFifteens 23484 = true := by decide

/-- 5bbd: nibbles fold back to 23485; digit sum 40 ≡ 23485 (mod 15). -/
theorem enumeration_hex4_5bbd : reassembles 23485 = true ∧ castsFifteens 23485 = true := by decide

/-- 5bbe: nibbles fold back to 23486; digit sum 41 ≡ 23486 (mod 15). -/
theorem enumeration_hex4_5bbe : reassembles 23486 = true ∧ castsFifteens 23486 = true := by decide

/-- 5bbf: nibbles fold back to 23487; digit sum 42 ≡ 23487 (mod 15). -/
theorem enumeration_hex4_5bbf : reassembles 23487 = true ∧ castsFifteens 23487 = true := by decide

/-- 5bc0: nibbles fold back to 23488; digit sum 28 ≡ 23488 (mod 15). -/
theorem enumeration_hex4_5bc0 : reassembles 23488 = true ∧ castsFifteens 23488 = true := by decide

/-- 5bc1: nibbles fold back to 23489; digit sum 29 ≡ 23489 (mod 15). -/
theorem enumeration_hex4_5bc1 : reassembles 23489 = true ∧ castsFifteens 23489 = true := by decide

/-- 5bc2: nibbles fold back to 23490; digit sum 30 ≡ 23490 (mod 15). -/
theorem enumeration_hex4_5bc2 : reassembles 23490 = true ∧ castsFifteens 23490 = true := by decide

/-- 5bc3: nibbles fold back to 23491; digit sum 31 ≡ 23491 (mod 15). -/
theorem enumeration_hex4_5bc3 : reassembles 23491 = true ∧ castsFifteens 23491 = true := by decide

/-- 5bc4: nibbles fold back to 23492; digit sum 32 ≡ 23492 (mod 15). -/
theorem enumeration_hex4_5bc4 : reassembles 23492 = true ∧ castsFifteens 23492 = true := by decide

/-- 5bc5: nibbles fold back to 23493; digit sum 33 ≡ 23493 (mod 15). -/
theorem enumeration_hex4_5bc5 : reassembles 23493 = true ∧ castsFifteens 23493 = true := by decide

/-- 5bc6: nibbles fold back to 23494; digit sum 34 ≡ 23494 (mod 15). -/
theorem enumeration_hex4_5bc6 : reassembles 23494 = true ∧ castsFifteens 23494 = true := by decide

/-- 5bc7: nibbles fold back to 23495; digit sum 35 ≡ 23495 (mod 15). -/
theorem enumeration_hex4_5bc7 : reassembles 23495 = true ∧ castsFifteens 23495 = true := by decide

/-- 5bc8: nibbles fold back to 23496; digit sum 36 ≡ 23496 (mod 15). -/
theorem enumeration_hex4_5bc8 : reassembles 23496 = true ∧ castsFifteens 23496 = true := by decide

/-- 5bc9: nibbles fold back to 23497; digit sum 37 ≡ 23497 (mod 15). -/
theorem enumeration_hex4_5bc9 : reassembles 23497 = true ∧ castsFifteens 23497 = true := by decide

/-- 5bca: nibbles fold back to 23498; digit sum 38 ≡ 23498 (mod 15). -/
theorem enumeration_hex4_5bca : reassembles 23498 = true ∧ castsFifteens 23498 = true := by decide

/-- 5bcb: nibbles fold back to 23499; digit sum 39 ≡ 23499 (mod 15). -/
theorem enumeration_hex4_5bcb : reassembles 23499 = true ∧ castsFifteens 23499 = true := by decide

/-- 5bcc: nibbles fold back to 23500; digit sum 40 ≡ 23500 (mod 15). -/
theorem enumeration_hex4_5bcc : reassembles 23500 = true ∧ castsFifteens 23500 = true := by decide

/-- 5bcd: nibbles fold back to 23501; digit sum 41 ≡ 23501 (mod 15). -/
theorem enumeration_hex4_5bcd : reassembles 23501 = true ∧ castsFifteens 23501 = true := by decide

/-- 5bce: nibbles fold back to 23502; digit sum 42 ≡ 23502 (mod 15). -/
theorem enumeration_hex4_5bce : reassembles 23502 = true ∧ castsFifteens 23502 = true := by decide

/-- 5bcf: nibbles fold back to 23503; digit sum 43 ≡ 23503 (mod 15). -/
theorem enumeration_hex4_5bcf : reassembles 23503 = true ∧ castsFifteens 23503 = true := by decide

/-- 5bd0: nibbles fold back to 23504; digit sum 29 ≡ 23504 (mod 15). -/
theorem enumeration_hex4_5bd0 : reassembles 23504 = true ∧ castsFifteens 23504 = true := by decide

/-- 5bd1: nibbles fold back to 23505; digit sum 30 ≡ 23505 (mod 15). -/
theorem enumeration_hex4_5bd1 : reassembles 23505 = true ∧ castsFifteens 23505 = true := by decide

/-- 5bd2: nibbles fold back to 23506; digit sum 31 ≡ 23506 (mod 15). -/
theorem enumeration_hex4_5bd2 : reassembles 23506 = true ∧ castsFifteens 23506 = true := by decide

/-- 5bd3: nibbles fold back to 23507; digit sum 32 ≡ 23507 (mod 15). -/
theorem enumeration_hex4_5bd3 : reassembles 23507 = true ∧ castsFifteens 23507 = true := by decide

/-- 5bd4: nibbles fold back to 23508; digit sum 33 ≡ 23508 (mod 15). -/
theorem enumeration_hex4_5bd4 : reassembles 23508 = true ∧ castsFifteens 23508 = true := by decide

/-- 5bd5: nibbles fold back to 23509; digit sum 34 ≡ 23509 (mod 15). -/
theorem enumeration_hex4_5bd5 : reassembles 23509 = true ∧ castsFifteens 23509 = true := by decide

/-- 5bd6: nibbles fold back to 23510; digit sum 35 ≡ 23510 (mod 15). -/
theorem enumeration_hex4_5bd6 : reassembles 23510 = true ∧ castsFifteens 23510 = true := by decide

/-- 5bd7: nibbles fold back to 23511; digit sum 36 ≡ 23511 (mod 15). -/
theorem enumeration_hex4_5bd7 : reassembles 23511 = true ∧ castsFifteens 23511 = true := by decide

/-- 5bd8: nibbles fold back to 23512; digit sum 37 ≡ 23512 (mod 15). -/
theorem enumeration_hex4_5bd8 : reassembles 23512 = true ∧ castsFifteens 23512 = true := by decide

/-- 5bd9: nibbles fold back to 23513; digit sum 38 ≡ 23513 (mod 15). -/
theorem enumeration_hex4_5bd9 : reassembles 23513 = true ∧ castsFifteens 23513 = true := by decide

/-- 5bda: nibbles fold back to 23514; digit sum 39 ≡ 23514 (mod 15). -/
theorem enumeration_hex4_5bda : reassembles 23514 = true ∧ castsFifteens 23514 = true := by decide

/-- 5bdb: nibbles fold back to 23515; digit sum 40 ≡ 23515 (mod 15). -/
theorem enumeration_hex4_5bdb : reassembles 23515 = true ∧ castsFifteens 23515 = true := by decide

/-- 5bdc: nibbles fold back to 23516; digit sum 41 ≡ 23516 (mod 15). -/
theorem enumeration_hex4_5bdc : reassembles 23516 = true ∧ castsFifteens 23516 = true := by decide

/-- 5bdd: nibbles fold back to 23517; digit sum 42 ≡ 23517 (mod 15). -/
theorem enumeration_hex4_5bdd : reassembles 23517 = true ∧ castsFifteens 23517 = true := by decide

/-- 5bde: nibbles fold back to 23518; digit sum 43 ≡ 23518 (mod 15). -/
theorem enumeration_hex4_5bde : reassembles 23518 = true ∧ castsFifteens 23518 = true := by decide

/-- 5bdf: nibbles fold back to 23519; digit sum 44 ≡ 23519 (mod 15). -/
theorem enumeration_hex4_5bdf : reassembles 23519 = true ∧ castsFifteens 23519 = true := by decide

/-- 5be0: nibbles fold back to 23520; digit sum 30 ≡ 23520 (mod 15). -/
theorem enumeration_hex4_5be0 : reassembles 23520 = true ∧ castsFifteens 23520 = true := by decide

/-- 5be1: nibbles fold back to 23521; digit sum 31 ≡ 23521 (mod 15). -/
theorem enumeration_hex4_5be1 : reassembles 23521 = true ∧ castsFifteens 23521 = true := by decide

/-- 5be2: nibbles fold back to 23522; digit sum 32 ≡ 23522 (mod 15). -/
theorem enumeration_hex4_5be2 : reassembles 23522 = true ∧ castsFifteens 23522 = true := by decide

/-- 5be3: nibbles fold back to 23523; digit sum 33 ≡ 23523 (mod 15). -/
theorem enumeration_hex4_5be3 : reassembles 23523 = true ∧ castsFifteens 23523 = true := by decide

/-- 5be4: nibbles fold back to 23524; digit sum 34 ≡ 23524 (mod 15). -/
theorem enumeration_hex4_5be4 : reassembles 23524 = true ∧ castsFifteens 23524 = true := by decide

/-- 5be5: nibbles fold back to 23525; digit sum 35 ≡ 23525 (mod 15). -/
theorem enumeration_hex4_5be5 : reassembles 23525 = true ∧ castsFifteens 23525 = true := by decide

/-- 5be6: nibbles fold back to 23526; digit sum 36 ≡ 23526 (mod 15). -/
theorem enumeration_hex4_5be6 : reassembles 23526 = true ∧ castsFifteens 23526 = true := by decide

/-- 5be7: nibbles fold back to 23527; digit sum 37 ≡ 23527 (mod 15). -/
theorem enumeration_hex4_5be7 : reassembles 23527 = true ∧ castsFifteens 23527 = true := by decide

/-- 5be8: nibbles fold back to 23528; digit sum 38 ≡ 23528 (mod 15). -/
theorem enumeration_hex4_5be8 : reassembles 23528 = true ∧ castsFifteens 23528 = true := by decide

/-- 5be9: nibbles fold back to 23529; digit sum 39 ≡ 23529 (mod 15). -/
theorem enumeration_hex4_5be9 : reassembles 23529 = true ∧ castsFifteens 23529 = true := by decide

/-- 5bea: nibbles fold back to 23530; digit sum 40 ≡ 23530 (mod 15). -/
theorem enumeration_hex4_5bea : reassembles 23530 = true ∧ castsFifteens 23530 = true := by decide

/-- 5beb: nibbles fold back to 23531; digit sum 41 ≡ 23531 (mod 15). -/
theorem enumeration_hex4_5beb : reassembles 23531 = true ∧ castsFifteens 23531 = true := by decide

/-- 5bec: nibbles fold back to 23532; digit sum 42 ≡ 23532 (mod 15). -/
theorem enumeration_hex4_5bec : reassembles 23532 = true ∧ castsFifteens 23532 = true := by decide

/-- 5bed: nibbles fold back to 23533; digit sum 43 ≡ 23533 (mod 15). -/
theorem enumeration_hex4_5bed : reassembles 23533 = true ∧ castsFifteens 23533 = true := by decide

/-- 5bee: nibbles fold back to 23534; digit sum 44 ≡ 23534 (mod 15). -/
theorem enumeration_hex4_5bee : reassembles 23534 = true ∧ castsFifteens 23534 = true := by decide

/-- 5bef: nibbles fold back to 23535; digit sum 45 ≡ 23535 (mod 15). -/
theorem enumeration_hex4_5bef : reassembles 23535 = true ∧ castsFifteens 23535 = true := by decide

/-- 5bf0: nibbles fold back to 23536; digit sum 31 ≡ 23536 (mod 15). -/
theorem enumeration_hex4_5bf0 : reassembles 23536 = true ∧ castsFifteens 23536 = true := by decide

/-- 5bf1: nibbles fold back to 23537; digit sum 32 ≡ 23537 (mod 15). -/
theorem enumeration_hex4_5bf1 : reassembles 23537 = true ∧ castsFifteens 23537 = true := by decide

/-- 5bf2: nibbles fold back to 23538; digit sum 33 ≡ 23538 (mod 15). -/
theorem enumeration_hex4_5bf2 : reassembles 23538 = true ∧ castsFifteens 23538 = true := by decide

/-- 5bf3: nibbles fold back to 23539; digit sum 34 ≡ 23539 (mod 15). -/
theorem enumeration_hex4_5bf3 : reassembles 23539 = true ∧ castsFifteens 23539 = true := by decide

/-- 5bf4: nibbles fold back to 23540; digit sum 35 ≡ 23540 (mod 15). -/
theorem enumeration_hex4_5bf4 : reassembles 23540 = true ∧ castsFifteens 23540 = true := by decide

/-- 5bf5: nibbles fold back to 23541; digit sum 36 ≡ 23541 (mod 15). -/
theorem enumeration_hex4_5bf5 : reassembles 23541 = true ∧ castsFifteens 23541 = true := by decide

/-- 5bf6: nibbles fold back to 23542; digit sum 37 ≡ 23542 (mod 15). -/
theorem enumeration_hex4_5bf6 : reassembles 23542 = true ∧ castsFifteens 23542 = true := by decide

/-- 5bf7: nibbles fold back to 23543; digit sum 38 ≡ 23543 (mod 15). -/
theorem enumeration_hex4_5bf7 : reassembles 23543 = true ∧ castsFifteens 23543 = true := by decide

/-- 5bf8: nibbles fold back to 23544; digit sum 39 ≡ 23544 (mod 15). -/
theorem enumeration_hex4_5bf8 : reassembles 23544 = true ∧ castsFifteens 23544 = true := by decide

/-- 5bf9: nibbles fold back to 23545; digit sum 40 ≡ 23545 (mod 15). -/
theorem enumeration_hex4_5bf9 : reassembles 23545 = true ∧ castsFifteens 23545 = true := by decide

/-- 5bfa: nibbles fold back to 23546; digit sum 41 ≡ 23546 (mod 15). -/
theorem enumeration_hex4_5bfa : reassembles 23546 = true ∧ castsFifteens 23546 = true := by decide

/-- 5bfb: nibbles fold back to 23547; digit sum 42 ≡ 23547 (mod 15). -/
theorem enumeration_hex4_5bfb : reassembles 23547 = true ∧ castsFifteens 23547 = true := by decide

/-- 5bfc: nibbles fold back to 23548; digit sum 43 ≡ 23548 (mod 15). -/
theorem enumeration_hex4_5bfc : reassembles 23548 = true ∧ castsFifteens 23548 = true := by decide

/-- 5bfd: nibbles fold back to 23549; digit sum 44 ≡ 23549 (mod 15). -/
theorem enumeration_hex4_5bfd : reassembles 23549 = true ∧ castsFifteens 23549 = true := by decide

/-- 5bfe: nibbles fold back to 23550; digit sum 45 ≡ 23550 (mod 15). -/
theorem enumeration_hex4_5bfe : reassembles 23550 = true ∧ castsFifteens 23550 = true := by decide

/-- 5bff: nibbles fold back to 23551; digit sum 46 ≡ 23551 (mod 15). -/
theorem enumeration_hex4_5bff : reassembles 23551 = true ∧ castsFifteens 23551 = true := by decide

/-- 5c00: nibbles fold back to 23552; digit sum 17 ≡ 23552 (mod 15). -/
theorem enumeration_hex4_5c00 : reassembles 23552 = true ∧ castsFifteens 23552 = true := by decide

/-- 5c01: nibbles fold back to 23553; digit sum 18 ≡ 23553 (mod 15). -/
theorem enumeration_hex4_5c01 : reassembles 23553 = true ∧ castsFifteens 23553 = true := by decide

/-- 5c02: nibbles fold back to 23554; digit sum 19 ≡ 23554 (mod 15). -/
theorem enumeration_hex4_5c02 : reassembles 23554 = true ∧ castsFifteens 23554 = true := by decide

/-- 5c03: nibbles fold back to 23555; digit sum 20 ≡ 23555 (mod 15). -/
theorem enumeration_hex4_5c03 : reassembles 23555 = true ∧ castsFifteens 23555 = true := by decide

/-- 5c04: nibbles fold back to 23556; digit sum 21 ≡ 23556 (mod 15). -/
theorem enumeration_hex4_5c04 : reassembles 23556 = true ∧ castsFifteens 23556 = true := by decide

/-- 5c05: nibbles fold back to 23557; digit sum 22 ≡ 23557 (mod 15). -/
theorem enumeration_hex4_5c05 : reassembles 23557 = true ∧ castsFifteens 23557 = true := by decide

/-- 5c06: nibbles fold back to 23558; digit sum 23 ≡ 23558 (mod 15). -/
theorem enumeration_hex4_5c06 : reassembles 23558 = true ∧ castsFifteens 23558 = true := by decide

/-- 5c07: nibbles fold back to 23559; digit sum 24 ≡ 23559 (mod 15). -/
theorem enumeration_hex4_5c07 : reassembles 23559 = true ∧ castsFifteens 23559 = true := by decide

/-- 5c08: nibbles fold back to 23560; digit sum 25 ≡ 23560 (mod 15). -/
theorem enumeration_hex4_5c08 : reassembles 23560 = true ∧ castsFifteens 23560 = true := by decide

/-- 5c09: nibbles fold back to 23561; digit sum 26 ≡ 23561 (mod 15). -/
theorem enumeration_hex4_5c09 : reassembles 23561 = true ∧ castsFifteens 23561 = true := by decide

/-- 5c0a: nibbles fold back to 23562; digit sum 27 ≡ 23562 (mod 15). -/
theorem enumeration_hex4_5c0a : reassembles 23562 = true ∧ castsFifteens 23562 = true := by decide

/-- 5c0b: nibbles fold back to 23563; digit sum 28 ≡ 23563 (mod 15). -/
theorem enumeration_hex4_5c0b : reassembles 23563 = true ∧ castsFifteens 23563 = true := by decide

/-- 5c0c: nibbles fold back to 23564; digit sum 29 ≡ 23564 (mod 15). -/
theorem enumeration_hex4_5c0c : reassembles 23564 = true ∧ castsFifteens 23564 = true := by decide

/-- 5c0d: nibbles fold back to 23565; digit sum 30 ≡ 23565 (mod 15). -/
theorem enumeration_hex4_5c0d : reassembles 23565 = true ∧ castsFifteens 23565 = true := by decide

/-- 5c0e: nibbles fold back to 23566; digit sum 31 ≡ 23566 (mod 15). -/
theorem enumeration_hex4_5c0e : reassembles 23566 = true ∧ castsFifteens 23566 = true := by decide

/-- 5c0f: nibbles fold back to 23567; digit sum 32 ≡ 23567 (mod 15). -/
theorem enumeration_hex4_5c0f : reassembles 23567 = true ∧ castsFifteens 23567 = true := by decide

/-- 5c10: nibbles fold back to 23568; digit sum 18 ≡ 23568 (mod 15). -/
theorem enumeration_hex4_5c10 : reassembles 23568 = true ∧ castsFifteens 23568 = true := by decide

/-- 5c11: nibbles fold back to 23569; digit sum 19 ≡ 23569 (mod 15). -/
theorem enumeration_hex4_5c11 : reassembles 23569 = true ∧ castsFifteens 23569 = true := by decide

/-- 5c12: nibbles fold back to 23570; digit sum 20 ≡ 23570 (mod 15). -/
theorem enumeration_hex4_5c12 : reassembles 23570 = true ∧ castsFifteens 23570 = true := by decide

/-- 5c13: nibbles fold back to 23571; digit sum 21 ≡ 23571 (mod 15). -/
theorem enumeration_hex4_5c13 : reassembles 23571 = true ∧ castsFifteens 23571 = true := by decide

/-- 5c14: nibbles fold back to 23572; digit sum 22 ≡ 23572 (mod 15). -/
theorem enumeration_hex4_5c14 : reassembles 23572 = true ∧ castsFifteens 23572 = true := by decide

/-- 5c15: nibbles fold back to 23573; digit sum 23 ≡ 23573 (mod 15). -/
theorem enumeration_hex4_5c15 : reassembles 23573 = true ∧ castsFifteens 23573 = true := by decide

/-- 5c16: nibbles fold back to 23574; digit sum 24 ≡ 23574 (mod 15). -/
theorem enumeration_hex4_5c16 : reassembles 23574 = true ∧ castsFifteens 23574 = true := by decide

/-- 5c17: nibbles fold back to 23575; digit sum 25 ≡ 23575 (mod 15). -/
theorem enumeration_hex4_5c17 : reassembles 23575 = true ∧ castsFifteens 23575 = true := by decide

/-- 5c18: nibbles fold back to 23576; digit sum 26 ≡ 23576 (mod 15). -/
theorem enumeration_hex4_5c18 : reassembles 23576 = true ∧ castsFifteens 23576 = true := by decide

/-- 5c19: nibbles fold back to 23577; digit sum 27 ≡ 23577 (mod 15). -/
theorem enumeration_hex4_5c19 : reassembles 23577 = true ∧ castsFifteens 23577 = true := by decide

/-- 5c1a: nibbles fold back to 23578; digit sum 28 ≡ 23578 (mod 15). -/
theorem enumeration_hex4_5c1a : reassembles 23578 = true ∧ castsFifteens 23578 = true := by decide

/-- 5c1b: nibbles fold back to 23579; digit sum 29 ≡ 23579 (mod 15). -/
theorem enumeration_hex4_5c1b : reassembles 23579 = true ∧ castsFifteens 23579 = true := by decide

/-- 5c1c: nibbles fold back to 23580; digit sum 30 ≡ 23580 (mod 15). -/
theorem enumeration_hex4_5c1c : reassembles 23580 = true ∧ castsFifteens 23580 = true := by decide

/-- 5c1d: nibbles fold back to 23581; digit sum 31 ≡ 23581 (mod 15). -/
theorem enumeration_hex4_5c1d : reassembles 23581 = true ∧ castsFifteens 23581 = true := by decide

/-- 5c1e: nibbles fold back to 23582; digit sum 32 ≡ 23582 (mod 15). -/
theorem enumeration_hex4_5c1e : reassembles 23582 = true ∧ castsFifteens 23582 = true := by decide

/-- 5c1f: nibbles fold back to 23583; digit sum 33 ≡ 23583 (mod 15). -/
theorem enumeration_hex4_5c1f : reassembles 23583 = true ∧ castsFifteens 23583 = true := by decide

/-- 5c20: nibbles fold back to 23584; digit sum 19 ≡ 23584 (mod 15). -/
theorem enumeration_hex4_5c20 : reassembles 23584 = true ∧ castsFifteens 23584 = true := by decide

/-- 5c21: nibbles fold back to 23585; digit sum 20 ≡ 23585 (mod 15). -/
theorem enumeration_hex4_5c21 : reassembles 23585 = true ∧ castsFifteens 23585 = true := by decide

/-- 5c22: nibbles fold back to 23586; digit sum 21 ≡ 23586 (mod 15). -/
theorem enumeration_hex4_5c22 : reassembles 23586 = true ∧ castsFifteens 23586 = true := by decide

/-- 5c23: nibbles fold back to 23587; digit sum 22 ≡ 23587 (mod 15). -/
theorem enumeration_hex4_5c23 : reassembles 23587 = true ∧ castsFifteens 23587 = true := by decide

/-- 5c24: nibbles fold back to 23588; digit sum 23 ≡ 23588 (mod 15). -/
theorem enumeration_hex4_5c24 : reassembles 23588 = true ∧ castsFifteens 23588 = true := by decide

/-- 5c25: nibbles fold back to 23589; digit sum 24 ≡ 23589 (mod 15). -/
theorem enumeration_hex4_5c25 : reassembles 23589 = true ∧ castsFifteens 23589 = true := by decide

/-- 5c26: nibbles fold back to 23590; digit sum 25 ≡ 23590 (mod 15). -/
theorem enumeration_hex4_5c26 : reassembles 23590 = true ∧ castsFifteens 23590 = true := by decide

/-- 5c27: nibbles fold back to 23591; digit sum 26 ≡ 23591 (mod 15). -/
theorem enumeration_hex4_5c27 : reassembles 23591 = true ∧ castsFifteens 23591 = true := by decide

/-- 5c28: nibbles fold back to 23592; digit sum 27 ≡ 23592 (mod 15). -/
theorem enumeration_hex4_5c28 : reassembles 23592 = true ∧ castsFifteens 23592 = true := by decide

/-- 5c29: nibbles fold back to 23593; digit sum 28 ≡ 23593 (mod 15). -/
theorem enumeration_hex4_5c29 : reassembles 23593 = true ∧ castsFifteens 23593 = true := by decide

/-- 5c2a: nibbles fold back to 23594; digit sum 29 ≡ 23594 (mod 15). -/
theorem enumeration_hex4_5c2a : reassembles 23594 = true ∧ castsFifteens 23594 = true := by decide

/-- 5c2b: nibbles fold back to 23595; digit sum 30 ≡ 23595 (mod 15). -/
theorem enumeration_hex4_5c2b : reassembles 23595 = true ∧ castsFifteens 23595 = true := by decide

/-- 5c2c: nibbles fold back to 23596; digit sum 31 ≡ 23596 (mod 15). -/
theorem enumeration_hex4_5c2c : reassembles 23596 = true ∧ castsFifteens 23596 = true := by decide

/-- 5c2d: nibbles fold back to 23597; digit sum 32 ≡ 23597 (mod 15). -/
theorem enumeration_hex4_5c2d : reassembles 23597 = true ∧ castsFifteens 23597 = true := by decide

/-- 5c2e: nibbles fold back to 23598; digit sum 33 ≡ 23598 (mod 15). -/
theorem enumeration_hex4_5c2e : reassembles 23598 = true ∧ castsFifteens 23598 = true := by decide

/-- 5c2f: nibbles fold back to 23599; digit sum 34 ≡ 23599 (mod 15). -/
theorem enumeration_hex4_5c2f : reassembles 23599 = true ∧ castsFifteens 23599 = true := by decide

/-- 5c30: nibbles fold back to 23600; digit sum 20 ≡ 23600 (mod 15). -/
theorem enumeration_hex4_5c30 : reassembles 23600 = true ∧ castsFifteens 23600 = true := by decide

/-- 5c31: nibbles fold back to 23601; digit sum 21 ≡ 23601 (mod 15). -/
theorem enumeration_hex4_5c31 : reassembles 23601 = true ∧ castsFifteens 23601 = true := by decide

/-- 5c32: nibbles fold back to 23602; digit sum 22 ≡ 23602 (mod 15). -/
theorem enumeration_hex4_5c32 : reassembles 23602 = true ∧ castsFifteens 23602 = true := by decide

/-- 5c33: nibbles fold back to 23603; digit sum 23 ≡ 23603 (mod 15). -/
theorem enumeration_hex4_5c33 : reassembles 23603 = true ∧ castsFifteens 23603 = true := by decide

/-- 5c34: nibbles fold back to 23604; digit sum 24 ≡ 23604 (mod 15). -/
theorem enumeration_hex4_5c34 : reassembles 23604 = true ∧ castsFifteens 23604 = true := by decide

/-- 5c35: nibbles fold back to 23605; digit sum 25 ≡ 23605 (mod 15). -/
theorem enumeration_hex4_5c35 : reassembles 23605 = true ∧ castsFifteens 23605 = true := by decide

/-- 5c36: nibbles fold back to 23606; digit sum 26 ≡ 23606 (mod 15). -/
theorem enumeration_hex4_5c36 : reassembles 23606 = true ∧ castsFifteens 23606 = true := by decide

/-- 5c37: nibbles fold back to 23607; digit sum 27 ≡ 23607 (mod 15). -/
theorem enumeration_hex4_5c37 : reassembles 23607 = true ∧ castsFifteens 23607 = true := by decide

/-- 5c38: nibbles fold back to 23608; digit sum 28 ≡ 23608 (mod 15). -/
theorem enumeration_hex4_5c38 : reassembles 23608 = true ∧ castsFifteens 23608 = true := by decide

/-- 5c39: nibbles fold back to 23609; digit sum 29 ≡ 23609 (mod 15). -/
theorem enumeration_hex4_5c39 : reassembles 23609 = true ∧ castsFifteens 23609 = true := by decide

/-- 5c3a: nibbles fold back to 23610; digit sum 30 ≡ 23610 (mod 15). -/
theorem enumeration_hex4_5c3a : reassembles 23610 = true ∧ castsFifteens 23610 = true := by decide

/-- 5c3b: nibbles fold back to 23611; digit sum 31 ≡ 23611 (mod 15). -/
theorem enumeration_hex4_5c3b : reassembles 23611 = true ∧ castsFifteens 23611 = true := by decide

/-- 5c3c: nibbles fold back to 23612; digit sum 32 ≡ 23612 (mod 15). -/
theorem enumeration_hex4_5c3c : reassembles 23612 = true ∧ castsFifteens 23612 = true := by decide

/-- 5c3d: nibbles fold back to 23613; digit sum 33 ≡ 23613 (mod 15). -/
theorem enumeration_hex4_5c3d : reassembles 23613 = true ∧ castsFifteens 23613 = true := by decide

/-- 5c3e: nibbles fold back to 23614; digit sum 34 ≡ 23614 (mod 15). -/
theorem enumeration_hex4_5c3e : reassembles 23614 = true ∧ castsFifteens 23614 = true := by decide

/-- 5c3f: nibbles fold back to 23615; digit sum 35 ≡ 23615 (mod 15). -/
theorem enumeration_hex4_5c3f : reassembles 23615 = true ∧ castsFifteens 23615 = true := by decide

/-- 5c40: nibbles fold back to 23616; digit sum 21 ≡ 23616 (mod 15). -/
theorem enumeration_hex4_5c40 : reassembles 23616 = true ∧ castsFifteens 23616 = true := by decide

/-- 5c41: nibbles fold back to 23617; digit sum 22 ≡ 23617 (mod 15). -/
theorem enumeration_hex4_5c41 : reassembles 23617 = true ∧ castsFifteens 23617 = true := by decide

/-- 5c42: nibbles fold back to 23618; digit sum 23 ≡ 23618 (mod 15). -/
theorem enumeration_hex4_5c42 : reassembles 23618 = true ∧ castsFifteens 23618 = true := by decide

/-- 5c43: nibbles fold back to 23619; digit sum 24 ≡ 23619 (mod 15). -/
theorem enumeration_hex4_5c43 : reassembles 23619 = true ∧ castsFifteens 23619 = true := by decide

/-- 5c44: nibbles fold back to 23620; digit sum 25 ≡ 23620 (mod 15). -/
theorem enumeration_hex4_5c44 : reassembles 23620 = true ∧ castsFifteens 23620 = true := by decide

/-- 5c45: nibbles fold back to 23621; digit sum 26 ≡ 23621 (mod 15). -/
theorem enumeration_hex4_5c45 : reassembles 23621 = true ∧ castsFifteens 23621 = true := by decide

/-- 5c46: nibbles fold back to 23622; digit sum 27 ≡ 23622 (mod 15). -/
theorem enumeration_hex4_5c46 : reassembles 23622 = true ∧ castsFifteens 23622 = true := by decide

/-- 5c47: nibbles fold back to 23623; digit sum 28 ≡ 23623 (mod 15). -/
theorem enumeration_hex4_5c47 : reassembles 23623 = true ∧ castsFifteens 23623 = true := by decide

/-- 5c48: nibbles fold back to 23624; digit sum 29 ≡ 23624 (mod 15). -/
theorem enumeration_hex4_5c48 : reassembles 23624 = true ∧ castsFifteens 23624 = true := by decide

/-- 5c49: nibbles fold back to 23625; digit sum 30 ≡ 23625 (mod 15). -/
theorem enumeration_hex4_5c49 : reassembles 23625 = true ∧ castsFifteens 23625 = true := by decide

/-- 5c4a: nibbles fold back to 23626; digit sum 31 ≡ 23626 (mod 15). -/
theorem enumeration_hex4_5c4a : reassembles 23626 = true ∧ castsFifteens 23626 = true := by decide

/-- 5c4b: nibbles fold back to 23627; digit sum 32 ≡ 23627 (mod 15). -/
theorem enumeration_hex4_5c4b : reassembles 23627 = true ∧ castsFifteens 23627 = true := by decide

/-- 5c4c: nibbles fold back to 23628; digit sum 33 ≡ 23628 (mod 15). -/
theorem enumeration_hex4_5c4c : reassembles 23628 = true ∧ castsFifteens 23628 = true := by decide

/-- 5c4d: nibbles fold back to 23629; digit sum 34 ≡ 23629 (mod 15). -/
theorem enumeration_hex4_5c4d : reassembles 23629 = true ∧ castsFifteens 23629 = true := by decide

/-- 5c4e: nibbles fold back to 23630; digit sum 35 ≡ 23630 (mod 15). -/
theorem enumeration_hex4_5c4e : reassembles 23630 = true ∧ castsFifteens 23630 = true := by decide

/-- 5c4f: nibbles fold back to 23631; digit sum 36 ≡ 23631 (mod 15). -/
theorem enumeration_hex4_5c4f : reassembles 23631 = true ∧ castsFifteens 23631 = true := by decide

/-- 5c50: nibbles fold back to 23632; digit sum 22 ≡ 23632 (mod 15). -/
theorem enumeration_hex4_5c50 : reassembles 23632 = true ∧ castsFifteens 23632 = true := by decide

/-- 5c51: nibbles fold back to 23633; digit sum 23 ≡ 23633 (mod 15). -/
theorem enumeration_hex4_5c51 : reassembles 23633 = true ∧ castsFifteens 23633 = true := by decide

/-- 5c52: nibbles fold back to 23634; digit sum 24 ≡ 23634 (mod 15). -/
theorem enumeration_hex4_5c52 : reassembles 23634 = true ∧ castsFifteens 23634 = true := by decide

/-- 5c53: nibbles fold back to 23635; digit sum 25 ≡ 23635 (mod 15). -/
theorem enumeration_hex4_5c53 : reassembles 23635 = true ∧ castsFifteens 23635 = true := by decide

/-- 5c54: nibbles fold back to 23636; digit sum 26 ≡ 23636 (mod 15). -/
theorem enumeration_hex4_5c54 : reassembles 23636 = true ∧ castsFifteens 23636 = true := by decide

/-- 5c55: nibbles fold back to 23637; digit sum 27 ≡ 23637 (mod 15). -/
theorem enumeration_hex4_5c55 : reassembles 23637 = true ∧ castsFifteens 23637 = true := by decide

/-- 5c56: nibbles fold back to 23638; digit sum 28 ≡ 23638 (mod 15). -/
theorem enumeration_hex4_5c56 : reassembles 23638 = true ∧ castsFifteens 23638 = true := by decide

/-- 5c57: nibbles fold back to 23639; digit sum 29 ≡ 23639 (mod 15). -/
theorem enumeration_hex4_5c57 : reassembles 23639 = true ∧ castsFifteens 23639 = true := by decide

/-- 5c58: nibbles fold back to 23640; digit sum 30 ≡ 23640 (mod 15). -/
theorem enumeration_hex4_5c58 : reassembles 23640 = true ∧ castsFifteens 23640 = true := by decide

/-- 5c59: nibbles fold back to 23641; digit sum 31 ≡ 23641 (mod 15). -/
theorem enumeration_hex4_5c59 : reassembles 23641 = true ∧ castsFifteens 23641 = true := by decide

/-- 5c5a: nibbles fold back to 23642; digit sum 32 ≡ 23642 (mod 15). -/
theorem enumeration_hex4_5c5a : reassembles 23642 = true ∧ castsFifteens 23642 = true := by decide

/-- 5c5b: nibbles fold back to 23643; digit sum 33 ≡ 23643 (mod 15). -/
theorem enumeration_hex4_5c5b : reassembles 23643 = true ∧ castsFifteens 23643 = true := by decide

/-- 5c5c: nibbles fold back to 23644; digit sum 34 ≡ 23644 (mod 15). -/
theorem enumeration_hex4_5c5c : reassembles 23644 = true ∧ castsFifteens 23644 = true := by decide

/-- 5c5d: nibbles fold back to 23645; digit sum 35 ≡ 23645 (mod 15). -/
theorem enumeration_hex4_5c5d : reassembles 23645 = true ∧ castsFifteens 23645 = true := by decide

/-- 5c5e: nibbles fold back to 23646; digit sum 36 ≡ 23646 (mod 15). -/
theorem enumeration_hex4_5c5e : reassembles 23646 = true ∧ castsFifteens 23646 = true := by decide

/-- 5c5f: nibbles fold back to 23647; digit sum 37 ≡ 23647 (mod 15). -/
theorem enumeration_hex4_5c5f : reassembles 23647 = true ∧ castsFifteens 23647 = true := by decide

/-- 5c60: nibbles fold back to 23648; digit sum 23 ≡ 23648 (mod 15). -/
theorem enumeration_hex4_5c60 : reassembles 23648 = true ∧ castsFifteens 23648 = true := by decide

/-- 5c61: nibbles fold back to 23649; digit sum 24 ≡ 23649 (mod 15). -/
theorem enumeration_hex4_5c61 : reassembles 23649 = true ∧ castsFifteens 23649 = true := by decide

/-- 5c62: nibbles fold back to 23650; digit sum 25 ≡ 23650 (mod 15). -/
theorem enumeration_hex4_5c62 : reassembles 23650 = true ∧ castsFifteens 23650 = true := by decide

/-- 5c63: nibbles fold back to 23651; digit sum 26 ≡ 23651 (mod 15). -/
theorem enumeration_hex4_5c63 : reassembles 23651 = true ∧ castsFifteens 23651 = true := by decide

/-- 5c64: nibbles fold back to 23652; digit sum 27 ≡ 23652 (mod 15). -/
theorem enumeration_hex4_5c64 : reassembles 23652 = true ∧ castsFifteens 23652 = true := by decide

/-- 5c65: nibbles fold back to 23653; digit sum 28 ≡ 23653 (mod 15). -/
theorem enumeration_hex4_5c65 : reassembles 23653 = true ∧ castsFifteens 23653 = true := by decide

/-- 5c66: nibbles fold back to 23654; digit sum 29 ≡ 23654 (mod 15). -/
theorem enumeration_hex4_5c66 : reassembles 23654 = true ∧ castsFifteens 23654 = true := by decide

/-- 5c67: nibbles fold back to 23655; digit sum 30 ≡ 23655 (mod 15). -/
theorem enumeration_hex4_5c67 : reassembles 23655 = true ∧ castsFifteens 23655 = true := by decide

/-- 5c68: nibbles fold back to 23656; digit sum 31 ≡ 23656 (mod 15). -/
theorem enumeration_hex4_5c68 : reassembles 23656 = true ∧ castsFifteens 23656 = true := by decide

/-- 5c69: nibbles fold back to 23657; digit sum 32 ≡ 23657 (mod 15). -/
theorem enumeration_hex4_5c69 : reassembles 23657 = true ∧ castsFifteens 23657 = true := by decide

/-- 5c6a: nibbles fold back to 23658; digit sum 33 ≡ 23658 (mod 15). -/
theorem enumeration_hex4_5c6a : reassembles 23658 = true ∧ castsFifteens 23658 = true := by decide

/-- 5c6b: nibbles fold back to 23659; digit sum 34 ≡ 23659 (mod 15). -/
theorem enumeration_hex4_5c6b : reassembles 23659 = true ∧ castsFifteens 23659 = true := by decide

/-- 5c6c: nibbles fold back to 23660; digit sum 35 ≡ 23660 (mod 15). -/
theorem enumeration_hex4_5c6c : reassembles 23660 = true ∧ castsFifteens 23660 = true := by decide

/-- 5c6d: nibbles fold back to 23661; digit sum 36 ≡ 23661 (mod 15). -/
theorem enumeration_hex4_5c6d : reassembles 23661 = true ∧ castsFifteens 23661 = true := by decide

/-- 5c6e: nibbles fold back to 23662; digit sum 37 ≡ 23662 (mod 15). -/
theorem enumeration_hex4_5c6e : reassembles 23662 = true ∧ castsFifteens 23662 = true := by decide

/-- 5c6f: nibbles fold back to 23663; digit sum 38 ≡ 23663 (mod 15). -/
theorem enumeration_hex4_5c6f : reassembles 23663 = true ∧ castsFifteens 23663 = true := by decide

/-- 5c70: nibbles fold back to 23664; digit sum 24 ≡ 23664 (mod 15). -/
theorem enumeration_hex4_5c70 : reassembles 23664 = true ∧ castsFifteens 23664 = true := by decide

/-- 5c71: nibbles fold back to 23665; digit sum 25 ≡ 23665 (mod 15). -/
theorem enumeration_hex4_5c71 : reassembles 23665 = true ∧ castsFifteens 23665 = true := by decide

/-- 5c72: nibbles fold back to 23666; digit sum 26 ≡ 23666 (mod 15). -/
theorem enumeration_hex4_5c72 : reassembles 23666 = true ∧ castsFifteens 23666 = true := by decide

/-- 5c73: nibbles fold back to 23667; digit sum 27 ≡ 23667 (mod 15). -/
theorem enumeration_hex4_5c73 : reassembles 23667 = true ∧ castsFifteens 23667 = true := by decide

/-- 5c74: nibbles fold back to 23668; digit sum 28 ≡ 23668 (mod 15). -/
theorem enumeration_hex4_5c74 : reassembles 23668 = true ∧ castsFifteens 23668 = true := by decide

/-- 5c75: nibbles fold back to 23669; digit sum 29 ≡ 23669 (mod 15). -/
theorem enumeration_hex4_5c75 : reassembles 23669 = true ∧ castsFifteens 23669 = true := by decide

/-- 5c76: nibbles fold back to 23670; digit sum 30 ≡ 23670 (mod 15). -/
theorem enumeration_hex4_5c76 : reassembles 23670 = true ∧ castsFifteens 23670 = true := by decide

/-- 5c77: nibbles fold back to 23671; digit sum 31 ≡ 23671 (mod 15). -/
theorem enumeration_hex4_5c77 : reassembles 23671 = true ∧ castsFifteens 23671 = true := by decide

/-- 5c78: nibbles fold back to 23672; digit sum 32 ≡ 23672 (mod 15). -/
theorem enumeration_hex4_5c78 : reassembles 23672 = true ∧ castsFifteens 23672 = true := by decide

/-- 5c79: nibbles fold back to 23673; digit sum 33 ≡ 23673 (mod 15). -/
theorem enumeration_hex4_5c79 : reassembles 23673 = true ∧ castsFifteens 23673 = true := by decide

/-- 5c7a: nibbles fold back to 23674; digit sum 34 ≡ 23674 (mod 15). -/
theorem enumeration_hex4_5c7a : reassembles 23674 = true ∧ castsFifteens 23674 = true := by decide

/-- 5c7b: nibbles fold back to 23675; digit sum 35 ≡ 23675 (mod 15). -/
theorem enumeration_hex4_5c7b : reassembles 23675 = true ∧ castsFifteens 23675 = true := by decide

/-- 5c7c: nibbles fold back to 23676; digit sum 36 ≡ 23676 (mod 15). -/
theorem enumeration_hex4_5c7c : reassembles 23676 = true ∧ castsFifteens 23676 = true := by decide

/-- 5c7d: nibbles fold back to 23677; digit sum 37 ≡ 23677 (mod 15). -/
theorem enumeration_hex4_5c7d : reassembles 23677 = true ∧ castsFifteens 23677 = true := by decide

/-- 5c7e: nibbles fold back to 23678; digit sum 38 ≡ 23678 (mod 15). -/
theorem enumeration_hex4_5c7e : reassembles 23678 = true ∧ castsFifteens 23678 = true := by decide

/-- 5c7f: nibbles fold back to 23679; digit sum 39 ≡ 23679 (mod 15). -/
theorem enumeration_hex4_5c7f : reassembles 23679 = true ∧ castsFifteens 23679 = true := by decide

/-- 5c80: nibbles fold back to 23680; digit sum 25 ≡ 23680 (mod 15). -/
theorem enumeration_hex4_5c80 : reassembles 23680 = true ∧ castsFifteens 23680 = true := by decide

/-- 5c81: nibbles fold back to 23681; digit sum 26 ≡ 23681 (mod 15). -/
theorem enumeration_hex4_5c81 : reassembles 23681 = true ∧ castsFifteens 23681 = true := by decide

/-- 5c82: nibbles fold back to 23682; digit sum 27 ≡ 23682 (mod 15). -/
theorem enumeration_hex4_5c82 : reassembles 23682 = true ∧ castsFifteens 23682 = true := by decide

/-- 5c83: nibbles fold back to 23683; digit sum 28 ≡ 23683 (mod 15). -/
theorem enumeration_hex4_5c83 : reassembles 23683 = true ∧ castsFifteens 23683 = true := by decide

/-- 5c84: nibbles fold back to 23684; digit sum 29 ≡ 23684 (mod 15). -/
theorem enumeration_hex4_5c84 : reassembles 23684 = true ∧ castsFifteens 23684 = true := by decide

/-- 5c85: nibbles fold back to 23685; digit sum 30 ≡ 23685 (mod 15). -/
theorem enumeration_hex4_5c85 : reassembles 23685 = true ∧ castsFifteens 23685 = true := by decide

/-- 5c86: nibbles fold back to 23686; digit sum 31 ≡ 23686 (mod 15). -/
theorem enumeration_hex4_5c86 : reassembles 23686 = true ∧ castsFifteens 23686 = true := by decide

/-- 5c87: nibbles fold back to 23687; digit sum 32 ≡ 23687 (mod 15). -/
theorem enumeration_hex4_5c87 : reassembles 23687 = true ∧ castsFifteens 23687 = true := by decide

/-- 5c88: nibbles fold back to 23688; digit sum 33 ≡ 23688 (mod 15). -/
theorem enumeration_hex4_5c88 : reassembles 23688 = true ∧ castsFifteens 23688 = true := by decide

/-- 5c89: nibbles fold back to 23689; digit sum 34 ≡ 23689 (mod 15). -/
theorem enumeration_hex4_5c89 : reassembles 23689 = true ∧ castsFifteens 23689 = true := by decide

/-- 5c8a: nibbles fold back to 23690; digit sum 35 ≡ 23690 (mod 15). -/
theorem enumeration_hex4_5c8a : reassembles 23690 = true ∧ castsFifteens 23690 = true := by decide

/-- 5c8b: nibbles fold back to 23691; digit sum 36 ≡ 23691 (mod 15). -/
theorem enumeration_hex4_5c8b : reassembles 23691 = true ∧ castsFifteens 23691 = true := by decide

/-- 5c8c: nibbles fold back to 23692; digit sum 37 ≡ 23692 (mod 15). -/
theorem enumeration_hex4_5c8c : reassembles 23692 = true ∧ castsFifteens 23692 = true := by decide

/-- 5c8d: nibbles fold back to 23693; digit sum 38 ≡ 23693 (mod 15). -/
theorem enumeration_hex4_5c8d : reassembles 23693 = true ∧ castsFifteens 23693 = true := by decide

/-- 5c8e: nibbles fold back to 23694; digit sum 39 ≡ 23694 (mod 15). -/
theorem enumeration_hex4_5c8e : reassembles 23694 = true ∧ castsFifteens 23694 = true := by decide

/-- 5c8f: nibbles fold back to 23695; digit sum 40 ≡ 23695 (mod 15). -/
theorem enumeration_hex4_5c8f : reassembles 23695 = true ∧ castsFifteens 23695 = true := by decide

/-- 5c90: nibbles fold back to 23696; digit sum 26 ≡ 23696 (mod 15). -/
theorem enumeration_hex4_5c90 : reassembles 23696 = true ∧ castsFifteens 23696 = true := by decide

/-- 5c91: nibbles fold back to 23697; digit sum 27 ≡ 23697 (mod 15). -/
theorem enumeration_hex4_5c91 : reassembles 23697 = true ∧ castsFifteens 23697 = true := by decide

/-- 5c92: nibbles fold back to 23698; digit sum 28 ≡ 23698 (mod 15). -/
theorem enumeration_hex4_5c92 : reassembles 23698 = true ∧ castsFifteens 23698 = true := by decide

/-- 5c93: nibbles fold back to 23699; digit sum 29 ≡ 23699 (mod 15). -/
theorem enumeration_hex4_5c93 : reassembles 23699 = true ∧ castsFifteens 23699 = true := by decide

/-- 5c94: nibbles fold back to 23700; digit sum 30 ≡ 23700 (mod 15). -/
theorem enumeration_hex4_5c94 : reassembles 23700 = true ∧ castsFifteens 23700 = true := by decide

/-- 5c95: nibbles fold back to 23701; digit sum 31 ≡ 23701 (mod 15). -/
theorem enumeration_hex4_5c95 : reassembles 23701 = true ∧ castsFifteens 23701 = true := by decide

/-- 5c96: nibbles fold back to 23702; digit sum 32 ≡ 23702 (mod 15). -/
theorem enumeration_hex4_5c96 : reassembles 23702 = true ∧ castsFifteens 23702 = true := by decide

/-- 5c97: nibbles fold back to 23703; digit sum 33 ≡ 23703 (mod 15). -/
theorem enumeration_hex4_5c97 : reassembles 23703 = true ∧ castsFifteens 23703 = true := by decide

/-- 5c98: nibbles fold back to 23704; digit sum 34 ≡ 23704 (mod 15). -/
theorem enumeration_hex4_5c98 : reassembles 23704 = true ∧ castsFifteens 23704 = true := by decide

/-- 5c99: nibbles fold back to 23705; digit sum 35 ≡ 23705 (mod 15). -/
theorem enumeration_hex4_5c99 : reassembles 23705 = true ∧ castsFifteens 23705 = true := by decide

/-- 5c9a: nibbles fold back to 23706; digit sum 36 ≡ 23706 (mod 15). -/
theorem enumeration_hex4_5c9a : reassembles 23706 = true ∧ castsFifteens 23706 = true := by decide

/-- 5c9b: nibbles fold back to 23707; digit sum 37 ≡ 23707 (mod 15). -/
theorem enumeration_hex4_5c9b : reassembles 23707 = true ∧ castsFifteens 23707 = true := by decide

/-- 5c9c: nibbles fold back to 23708; digit sum 38 ≡ 23708 (mod 15). -/
theorem enumeration_hex4_5c9c : reassembles 23708 = true ∧ castsFifteens 23708 = true := by decide

/-- 5c9d: nibbles fold back to 23709; digit sum 39 ≡ 23709 (mod 15). -/
theorem enumeration_hex4_5c9d : reassembles 23709 = true ∧ castsFifteens 23709 = true := by decide

/-- 5c9e: nibbles fold back to 23710; digit sum 40 ≡ 23710 (mod 15). -/
theorem enumeration_hex4_5c9e : reassembles 23710 = true ∧ castsFifteens 23710 = true := by decide

/-- 5c9f: nibbles fold back to 23711; digit sum 41 ≡ 23711 (mod 15). -/
theorem enumeration_hex4_5c9f : reassembles 23711 = true ∧ castsFifteens 23711 = true := by decide

/-- 5ca0: nibbles fold back to 23712; digit sum 27 ≡ 23712 (mod 15). -/
theorem enumeration_hex4_5ca0 : reassembles 23712 = true ∧ castsFifteens 23712 = true := by decide

/-- 5ca1: nibbles fold back to 23713; digit sum 28 ≡ 23713 (mod 15). -/
theorem enumeration_hex4_5ca1 : reassembles 23713 = true ∧ castsFifteens 23713 = true := by decide

/-- 5ca2: nibbles fold back to 23714; digit sum 29 ≡ 23714 (mod 15). -/
theorem enumeration_hex4_5ca2 : reassembles 23714 = true ∧ castsFifteens 23714 = true := by decide

/-- 5ca3: nibbles fold back to 23715; digit sum 30 ≡ 23715 (mod 15). -/
theorem enumeration_hex4_5ca3 : reassembles 23715 = true ∧ castsFifteens 23715 = true := by decide

/-- 5ca4: nibbles fold back to 23716; digit sum 31 ≡ 23716 (mod 15). -/
theorem enumeration_hex4_5ca4 : reassembles 23716 = true ∧ castsFifteens 23716 = true := by decide

/-- 5ca5: nibbles fold back to 23717; digit sum 32 ≡ 23717 (mod 15). -/
theorem enumeration_hex4_5ca5 : reassembles 23717 = true ∧ castsFifteens 23717 = true := by decide

/-- 5ca6: nibbles fold back to 23718; digit sum 33 ≡ 23718 (mod 15). -/
theorem enumeration_hex4_5ca6 : reassembles 23718 = true ∧ castsFifteens 23718 = true := by decide

/-- 5ca7: nibbles fold back to 23719; digit sum 34 ≡ 23719 (mod 15). -/
theorem enumeration_hex4_5ca7 : reassembles 23719 = true ∧ castsFifteens 23719 = true := by decide

/-- 5ca8: nibbles fold back to 23720; digit sum 35 ≡ 23720 (mod 15). -/
theorem enumeration_hex4_5ca8 : reassembles 23720 = true ∧ castsFifteens 23720 = true := by decide

/-- 5ca9: nibbles fold back to 23721; digit sum 36 ≡ 23721 (mod 15). -/
theorem enumeration_hex4_5ca9 : reassembles 23721 = true ∧ castsFifteens 23721 = true := by decide

/-- 5caa: nibbles fold back to 23722; digit sum 37 ≡ 23722 (mod 15). -/
theorem enumeration_hex4_5caa : reassembles 23722 = true ∧ castsFifteens 23722 = true := by decide

/-- 5cab: nibbles fold back to 23723; digit sum 38 ≡ 23723 (mod 15). -/
theorem enumeration_hex4_5cab : reassembles 23723 = true ∧ castsFifteens 23723 = true := by decide

/-- 5cac: nibbles fold back to 23724; digit sum 39 ≡ 23724 (mod 15). -/
theorem enumeration_hex4_5cac : reassembles 23724 = true ∧ castsFifteens 23724 = true := by decide

/-- 5cad: nibbles fold back to 23725; digit sum 40 ≡ 23725 (mod 15). -/
theorem enumeration_hex4_5cad : reassembles 23725 = true ∧ castsFifteens 23725 = true := by decide

/-- 5cae: nibbles fold back to 23726; digit sum 41 ≡ 23726 (mod 15). -/
theorem enumeration_hex4_5cae : reassembles 23726 = true ∧ castsFifteens 23726 = true := by decide

/-- 5caf: nibbles fold back to 23727; digit sum 42 ≡ 23727 (mod 15). -/
theorem enumeration_hex4_5caf : reassembles 23727 = true ∧ castsFifteens 23727 = true := by decide

/-- 5cb0: nibbles fold back to 23728; digit sum 28 ≡ 23728 (mod 15). -/
theorem enumeration_hex4_5cb0 : reassembles 23728 = true ∧ castsFifteens 23728 = true := by decide

/-- 5cb1: nibbles fold back to 23729; digit sum 29 ≡ 23729 (mod 15). -/
theorem enumeration_hex4_5cb1 : reassembles 23729 = true ∧ castsFifteens 23729 = true := by decide

/-- 5cb2: nibbles fold back to 23730; digit sum 30 ≡ 23730 (mod 15). -/
theorem enumeration_hex4_5cb2 : reassembles 23730 = true ∧ castsFifteens 23730 = true := by decide

/-- 5cb3: nibbles fold back to 23731; digit sum 31 ≡ 23731 (mod 15). -/
theorem enumeration_hex4_5cb3 : reassembles 23731 = true ∧ castsFifteens 23731 = true := by decide

/-- 5cb4: nibbles fold back to 23732; digit sum 32 ≡ 23732 (mod 15). -/
theorem enumeration_hex4_5cb4 : reassembles 23732 = true ∧ castsFifteens 23732 = true := by decide

/-- 5cb5: nibbles fold back to 23733; digit sum 33 ≡ 23733 (mod 15). -/
theorem enumeration_hex4_5cb5 : reassembles 23733 = true ∧ castsFifteens 23733 = true := by decide

/-- 5cb6: nibbles fold back to 23734; digit sum 34 ≡ 23734 (mod 15). -/
theorem enumeration_hex4_5cb6 : reassembles 23734 = true ∧ castsFifteens 23734 = true := by decide

/-- 5cb7: nibbles fold back to 23735; digit sum 35 ≡ 23735 (mod 15). -/
theorem enumeration_hex4_5cb7 : reassembles 23735 = true ∧ castsFifteens 23735 = true := by decide

/-- 5cb8: nibbles fold back to 23736; digit sum 36 ≡ 23736 (mod 15). -/
theorem enumeration_hex4_5cb8 : reassembles 23736 = true ∧ castsFifteens 23736 = true := by decide

/-- 5cb9: nibbles fold back to 23737; digit sum 37 ≡ 23737 (mod 15). -/
theorem enumeration_hex4_5cb9 : reassembles 23737 = true ∧ castsFifteens 23737 = true := by decide

/-- 5cba: nibbles fold back to 23738; digit sum 38 ≡ 23738 (mod 15). -/
theorem enumeration_hex4_5cba : reassembles 23738 = true ∧ castsFifteens 23738 = true := by decide

/-- 5cbb: nibbles fold back to 23739; digit sum 39 ≡ 23739 (mod 15). -/
theorem enumeration_hex4_5cbb : reassembles 23739 = true ∧ castsFifteens 23739 = true := by decide

/-- 5cbc: nibbles fold back to 23740; digit sum 40 ≡ 23740 (mod 15). -/
theorem enumeration_hex4_5cbc : reassembles 23740 = true ∧ castsFifteens 23740 = true := by decide

/-- 5cbd: nibbles fold back to 23741; digit sum 41 ≡ 23741 (mod 15). -/
theorem enumeration_hex4_5cbd : reassembles 23741 = true ∧ castsFifteens 23741 = true := by decide

/-- 5cbe: nibbles fold back to 23742; digit sum 42 ≡ 23742 (mod 15). -/
theorem enumeration_hex4_5cbe : reassembles 23742 = true ∧ castsFifteens 23742 = true := by decide

/-- 5cbf: nibbles fold back to 23743; digit sum 43 ≡ 23743 (mod 15). -/
theorem enumeration_hex4_5cbf : reassembles 23743 = true ∧ castsFifteens 23743 = true := by decide

/-- 5cc0: nibbles fold back to 23744; digit sum 29 ≡ 23744 (mod 15). -/
theorem enumeration_hex4_5cc0 : reassembles 23744 = true ∧ castsFifteens 23744 = true := by decide

/-- 5cc1: nibbles fold back to 23745; digit sum 30 ≡ 23745 (mod 15). -/
theorem enumeration_hex4_5cc1 : reassembles 23745 = true ∧ castsFifteens 23745 = true := by decide

/-- 5cc2: nibbles fold back to 23746; digit sum 31 ≡ 23746 (mod 15). -/
theorem enumeration_hex4_5cc2 : reassembles 23746 = true ∧ castsFifteens 23746 = true := by decide

/-- 5cc3: nibbles fold back to 23747; digit sum 32 ≡ 23747 (mod 15). -/
theorem enumeration_hex4_5cc3 : reassembles 23747 = true ∧ castsFifteens 23747 = true := by decide

/-- 5cc4: nibbles fold back to 23748; digit sum 33 ≡ 23748 (mod 15). -/
theorem enumeration_hex4_5cc4 : reassembles 23748 = true ∧ castsFifteens 23748 = true := by decide

/-- 5cc5: nibbles fold back to 23749; digit sum 34 ≡ 23749 (mod 15). -/
theorem enumeration_hex4_5cc5 : reassembles 23749 = true ∧ castsFifteens 23749 = true := by decide

/-- 5cc6: nibbles fold back to 23750; digit sum 35 ≡ 23750 (mod 15). -/
theorem enumeration_hex4_5cc6 : reassembles 23750 = true ∧ castsFifteens 23750 = true := by decide

/-- 5cc7: nibbles fold back to 23751; digit sum 36 ≡ 23751 (mod 15). -/
theorem enumeration_hex4_5cc7 : reassembles 23751 = true ∧ castsFifteens 23751 = true := by decide

/-- 5cc8: nibbles fold back to 23752; digit sum 37 ≡ 23752 (mod 15). -/
theorem enumeration_hex4_5cc8 : reassembles 23752 = true ∧ castsFifteens 23752 = true := by decide

/-- 5cc9: nibbles fold back to 23753; digit sum 38 ≡ 23753 (mod 15). -/
theorem enumeration_hex4_5cc9 : reassembles 23753 = true ∧ castsFifteens 23753 = true := by decide

/-- 5cca: nibbles fold back to 23754; digit sum 39 ≡ 23754 (mod 15). -/
theorem enumeration_hex4_5cca : reassembles 23754 = true ∧ castsFifteens 23754 = true := by decide

/-- 5ccb: nibbles fold back to 23755; digit sum 40 ≡ 23755 (mod 15). -/
theorem enumeration_hex4_5ccb : reassembles 23755 = true ∧ castsFifteens 23755 = true := by decide

/-- 5ccc: nibbles fold back to 23756; digit sum 41 ≡ 23756 (mod 15). -/
theorem enumeration_hex4_5ccc : reassembles 23756 = true ∧ castsFifteens 23756 = true := by decide

/-- 5ccd: nibbles fold back to 23757; digit sum 42 ≡ 23757 (mod 15). -/
theorem enumeration_hex4_5ccd : reassembles 23757 = true ∧ castsFifteens 23757 = true := by decide

/-- 5cce: nibbles fold back to 23758; digit sum 43 ≡ 23758 (mod 15). -/
theorem enumeration_hex4_5cce : reassembles 23758 = true ∧ castsFifteens 23758 = true := by decide

/-- 5ccf: nibbles fold back to 23759; digit sum 44 ≡ 23759 (mod 15). -/
theorem enumeration_hex4_5ccf : reassembles 23759 = true ∧ castsFifteens 23759 = true := by decide

/-- 5cd0: nibbles fold back to 23760; digit sum 30 ≡ 23760 (mod 15). -/
theorem enumeration_hex4_5cd0 : reassembles 23760 = true ∧ castsFifteens 23760 = true := by decide

/-- 5cd1: nibbles fold back to 23761; digit sum 31 ≡ 23761 (mod 15). -/
theorem enumeration_hex4_5cd1 : reassembles 23761 = true ∧ castsFifteens 23761 = true := by decide

/-- 5cd2: nibbles fold back to 23762; digit sum 32 ≡ 23762 (mod 15). -/
theorem enumeration_hex4_5cd2 : reassembles 23762 = true ∧ castsFifteens 23762 = true := by decide

/-- 5cd3: nibbles fold back to 23763; digit sum 33 ≡ 23763 (mod 15). -/
theorem enumeration_hex4_5cd3 : reassembles 23763 = true ∧ castsFifteens 23763 = true := by decide

/-- 5cd4: nibbles fold back to 23764; digit sum 34 ≡ 23764 (mod 15). -/
theorem enumeration_hex4_5cd4 : reassembles 23764 = true ∧ castsFifteens 23764 = true := by decide

/-- 5cd5: nibbles fold back to 23765; digit sum 35 ≡ 23765 (mod 15). -/
theorem enumeration_hex4_5cd5 : reassembles 23765 = true ∧ castsFifteens 23765 = true := by decide

/-- 5cd6: nibbles fold back to 23766; digit sum 36 ≡ 23766 (mod 15). -/
theorem enumeration_hex4_5cd6 : reassembles 23766 = true ∧ castsFifteens 23766 = true := by decide

/-- 5cd7: nibbles fold back to 23767; digit sum 37 ≡ 23767 (mod 15). -/
theorem enumeration_hex4_5cd7 : reassembles 23767 = true ∧ castsFifteens 23767 = true := by decide

/-- 5cd8: nibbles fold back to 23768; digit sum 38 ≡ 23768 (mod 15). -/
theorem enumeration_hex4_5cd8 : reassembles 23768 = true ∧ castsFifteens 23768 = true := by decide

/-- 5cd9: nibbles fold back to 23769; digit sum 39 ≡ 23769 (mod 15). -/
theorem enumeration_hex4_5cd9 : reassembles 23769 = true ∧ castsFifteens 23769 = true := by decide

/-- 5cda: nibbles fold back to 23770; digit sum 40 ≡ 23770 (mod 15). -/
theorem enumeration_hex4_5cda : reassembles 23770 = true ∧ castsFifteens 23770 = true := by decide

/-- 5cdb: nibbles fold back to 23771; digit sum 41 ≡ 23771 (mod 15). -/
theorem enumeration_hex4_5cdb : reassembles 23771 = true ∧ castsFifteens 23771 = true := by decide

/-- 5cdc: nibbles fold back to 23772; digit sum 42 ≡ 23772 (mod 15). -/
theorem enumeration_hex4_5cdc : reassembles 23772 = true ∧ castsFifteens 23772 = true := by decide

/-- 5cdd: nibbles fold back to 23773; digit sum 43 ≡ 23773 (mod 15). -/
theorem enumeration_hex4_5cdd : reassembles 23773 = true ∧ castsFifteens 23773 = true := by decide

/-- 5cde: nibbles fold back to 23774; digit sum 44 ≡ 23774 (mod 15). -/
theorem enumeration_hex4_5cde : reassembles 23774 = true ∧ castsFifteens 23774 = true := by decide

/-- 5cdf: nibbles fold back to 23775; digit sum 45 ≡ 23775 (mod 15). -/
theorem enumeration_hex4_5cdf : reassembles 23775 = true ∧ castsFifteens 23775 = true := by decide

/-- 5ce0: nibbles fold back to 23776; digit sum 31 ≡ 23776 (mod 15). -/
theorem enumeration_hex4_5ce0 : reassembles 23776 = true ∧ castsFifteens 23776 = true := by decide

/-- 5ce1: nibbles fold back to 23777; digit sum 32 ≡ 23777 (mod 15). -/
theorem enumeration_hex4_5ce1 : reassembles 23777 = true ∧ castsFifteens 23777 = true := by decide

/-- 5ce2: nibbles fold back to 23778; digit sum 33 ≡ 23778 (mod 15). -/
theorem enumeration_hex4_5ce2 : reassembles 23778 = true ∧ castsFifteens 23778 = true := by decide

/-- 5ce3: nibbles fold back to 23779; digit sum 34 ≡ 23779 (mod 15). -/
theorem enumeration_hex4_5ce3 : reassembles 23779 = true ∧ castsFifteens 23779 = true := by decide

/-- 5ce4: nibbles fold back to 23780; digit sum 35 ≡ 23780 (mod 15). -/
theorem enumeration_hex4_5ce4 : reassembles 23780 = true ∧ castsFifteens 23780 = true := by decide

/-- 5ce5: nibbles fold back to 23781; digit sum 36 ≡ 23781 (mod 15). -/
theorem enumeration_hex4_5ce5 : reassembles 23781 = true ∧ castsFifteens 23781 = true := by decide

/-- 5ce6: nibbles fold back to 23782; digit sum 37 ≡ 23782 (mod 15). -/
theorem enumeration_hex4_5ce6 : reassembles 23782 = true ∧ castsFifteens 23782 = true := by decide

/-- 5ce7: nibbles fold back to 23783; digit sum 38 ≡ 23783 (mod 15). -/
theorem enumeration_hex4_5ce7 : reassembles 23783 = true ∧ castsFifteens 23783 = true := by decide

/-- 5ce8: nibbles fold back to 23784; digit sum 39 ≡ 23784 (mod 15). -/
theorem enumeration_hex4_5ce8 : reassembles 23784 = true ∧ castsFifteens 23784 = true := by decide

/-- 5ce9: nibbles fold back to 23785; digit sum 40 ≡ 23785 (mod 15). -/
theorem enumeration_hex4_5ce9 : reassembles 23785 = true ∧ castsFifteens 23785 = true := by decide

/-- 5cea: nibbles fold back to 23786; digit sum 41 ≡ 23786 (mod 15). -/
theorem enumeration_hex4_5cea : reassembles 23786 = true ∧ castsFifteens 23786 = true := by decide

/-- 5ceb: nibbles fold back to 23787; digit sum 42 ≡ 23787 (mod 15). -/
theorem enumeration_hex4_5ceb : reassembles 23787 = true ∧ castsFifteens 23787 = true := by decide

/-- 5cec: nibbles fold back to 23788; digit sum 43 ≡ 23788 (mod 15). -/
theorem enumeration_hex4_5cec : reassembles 23788 = true ∧ castsFifteens 23788 = true := by decide

/-- 5ced: nibbles fold back to 23789; digit sum 44 ≡ 23789 (mod 15). -/
theorem enumeration_hex4_5ced : reassembles 23789 = true ∧ castsFifteens 23789 = true := by decide

/-- 5cee: nibbles fold back to 23790; digit sum 45 ≡ 23790 (mod 15). -/
theorem enumeration_hex4_5cee : reassembles 23790 = true ∧ castsFifteens 23790 = true := by decide

/-- 5cef: nibbles fold back to 23791; digit sum 46 ≡ 23791 (mod 15). -/
theorem enumeration_hex4_5cef : reassembles 23791 = true ∧ castsFifteens 23791 = true := by decide

/-- 5cf0: nibbles fold back to 23792; digit sum 32 ≡ 23792 (mod 15). -/
theorem enumeration_hex4_5cf0 : reassembles 23792 = true ∧ castsFifteens 23792 = true := by decide

/-- 5cf1: nibbles fold back to 23793; digit sum 33 ≡ 23793 (mod 15). -/
theorem enumeration_hex4_5cf1 : reassembles 23793 = true ∧ castsFifteens 23793 = true := by decide

/-- 5cf2: nibbles fold back to 23794; digit sum 34 ≡ 23794 (mod 15). -/
theorem enumeration_hex4_5cf2 : reassembles 23794 = true ∧ castsFifteens 23794 = true := by decide

/-- 5cf3: nibbles fold back to 23795; digit sum 35 ≡ 23795 (mod 15). -/
theorem enumeration_hex4_5cf3 : reassembles 23795 = true ∧ castsFifteens 23795 = true := by decide

/-- 5cf4: nibbles fold back to 23796; digit sum 36 ≡ 23796 (mod 15). -/
theorem enumeration_hex4_5cf4 : reassembles 23796 = true ∧ castsFifteens 23796 = true := by decide

/-- 5cf5: nibbles fold back to 23797; digit sum 37 ≡ 23797 (mod 15). -/
theorem enumeration_hex4_5cf5 : reassembles 23797 = true ∧ castsFifteens 23797 = true := by decide

/-- 5cf6: nibbles fold back to 23798; digit sum 38 ≡ 23798 (mod 15). -/
theorem enumeration_hex4_5cf6 : reassembles 23798 = true ∧ castsFifteens 23798 = true := by decide

/-- 5cf7: nibbles fold back to 23799; digit sum 39 ≡ 23799 (mod 15). -/
theorem enumeration_hex4_5cf7 : reassembles 23799 = true ∧ castsFifteens 23799 = true := by decide

/-- 5cf8: nibbles fold back to 23800; digit sum 40 ≡ 23800 (mod 15). -/
theorem enumeration_hex4_5cf8 : reassembles 23800 = true ∧ castsFifteens 23800 = true := by decide

/-- 5cf9: nibbles fold back to 23801; digit sum 41 ≡ 23801 (mod 15). -/
theorem enumeration_hex4_5cf9 : reassembles 23801 = true ∧ castsFifteens 23801 = true := by decide

/-- 5cfa: nibbles fold back to 23802; digit sum 42 ≡ 23802 (mod 15). -/
theorem enumeration_hex4_5cfa : reassembles 23802 = true ∧ castsFifteens 23802 = true := by decide

/-- 5cfb: nibbles fold back to 23803; digit sum 43 ≡ 23803 (mod 15). -/
theorem enumeration_hex4_5cfb : reassembles 23803 = true ∧ castsFifteens 23803 = true := by decide

/-- 5cfc: nibbles fold back to 23804; digit sum 44 ≡ 23804 (mod 15). -/
theorem enumeration_hex4_5cfc : reassembles 23804 = true ∧ castsFifteens 23804 = true := by decide

/-- 5cfd: nibbles fold back to 23805; digit sum 45 ≡ 23805 (mod 15). -/
theorem enumeration_hex4_5cfd : reassembles 23805 = true ∧ castsFifteens 23805 = true := by decide

/-- 5cfe: nibbles fold back to 23806; digit sum 46 ≡ 23806 (mod 15). -/
theorem enumeration_hex4_5cfe : reassembles 23806 = true ∧ castsFifteens 23806 = true := by decide

/-- 5cff: nibbles fold back to 23807; digit sum 47 ≡ 23807 (mod 15). -/
theorem enumeration_hex4_5cff : reassembles 23807 = true ∧ castsFifteens 23807 = true := by decide

/-- 5d00: nibbles fold back to 23808; digit sum 18 ≡ 23808 (mod 15). -/
theorem enumeration_hex4_5d00 : reassembles 23808 = true ∧ castsFifteens 23808 = true := by decide

/-- 5d01: nibbles fold back to 23809; digit sum 19 ≡ 23809 (mod 15). -/
theorem enumeration_hex4_5d01 : reassembles 23809 = true ∧ castsFifteens 23809 = true := by decide

/-- 5d02: nibbles fold back to 23810; digit sum 20 ≡ 23810 (mod 15). -/
theorem enumeration_hex4_5d02 : reassembles 23810 = true ∧ castsFifteens 23810 = true := by decide

/-- 5d03: nibbles fold back to 23811; digit sum 21 ≡ 23811 (mod 15). -/
theorem enumeration_hex4_5d03 : reassembles 23811 = true ∧ castsFifteens 23811 = true := by decide

/-- 5d04: nibbles fold back to 23812; digit sum 22 ≡ 23812 (mod 15). -/
theorem enumeration_hex4_5d04 : reassembles 23812 = true ∧ castsFifteens 23812 = true := by decide

/-- 5d05: nibbles fold back to 23813; digit sum 23 ≡ 23813 (mod 15). -/
theorem enumeration_hex4_5d05 : reassembles 23813 = true ∧ castsFifteens 23813 = true := by decide

/-- 5d06: nibbles fold back to 23814; digit sum 24 ≡ 23814 (mod 15). -/
theorem enumeration_hex4_5d06 : reassembles 23814 = true ∧ castsFifteens 23814 = true := by decide

/-- 5d07: nibbles fold back to 23815; digit sum 25 ≡ 23815 (mod 15). -/
theorem enumeration_hex4_5d07 : reassembles 23815 = true ∧ castsFifteens 23815 = true := by decide

/-- 5d08: nibbles fold back to 23816; digit sum 26 ≡ 23816 (mod 15). -/
theorem enumeration_hex4_5d08 : reassembles 23816 = true ∧ castsFifteens 23816 = true := by decide

/-- 5d09: nibbles fold back to 23817; digit sum 27 ≡ 23817 (mod 15). -/
theorem enumeration_hex4_5d09 : reassembles 23817 = true ∧ castsFifteens 23817 = true := by decide

/-- 5d0a: nibbles fold back to 23818; digit sum 28 ≡ 23818 (mod 15). -/
theorem enumeration_hex4_5d0a : reassembles 23818 = true ∧ castsFifteens 23818 = true := by decide

/-- 5d0b: nibbles fold back to 23819; digit sum 29 ≡ 23819 (mod 15). -/
theorem enumeration_hex4_5d0b : reassembles 23819 = true ∧ castsFifteens 23819 = true := by decide

/-- 5d0c: nibbles fold back to 23820; digit sum 30 ≡ 23820 (mod 15). -/
theorem enumeration_hex4_5d0c : reassembles 23820 = true ∧ castsFifteens 23820 = true := by decide

/-- 5d0d: nibbles fold back to 23821; digit sum 31 ≡ 23821 (mod 15). -/
theorem enumeration_hex4_5d0d : reassembles 23821 = true ∧ castsFifteens 23821 = true := by decide

/-- 5d0e: nibbles fold back to 23822; digit sum 32 ≡ 23822 (mod 15). -/
theorem enumeration_hex4_5d0e : reassembles 23822 = true ∧ castsFifteens 23822 = true := by decide

/-- 5d0f: nibbles fold back to 23823; digit sum 33 ≡ 23823 (mod 15). -/
theorem enumeration_hex4_5d0f : reassembles 23823 = true ∧ castsFifteens 23823 = true := by decide

/-- 5d10: nibbles fold back to 23824; digit sum 19 ≡ 23824 (mod 15). -/
theorem enumeration_hex4_5d10 : reassembles 23824 = true ∧ castsFifteens 23824 = true := by decide

/-- 5d11: nibbles fold back to 23825; digit sum 20 ≡ 23825 (mod 15). -/
theorem enumeration_hex4_5d11 : reassembles 23825 = true ∧ castsFifteens 23825 = true := by decide

/-- 5d12: nibbles fold back to 23826; digit sum 21 ≡ 23826 (mod 15). -/
theorem enumeration_hex4_5d12 : reassembles 23826 = true ∧ castsFifteens 23826 = true := by decide

/-- 5d13: nibbles fold back to 23827; digit sum 22 ≡ 23827 (mod 15). -/
theorem enumeration_hex4_5d13 : reassembles 23827 = true ∧ castsFifteens 23827 = true := by decide

/-- 5d14: nibbles fold back to 23828; digit sum 23 ≡ 23828 (mod 15). -/
theorem enumeration_hex4_5d14 : reassembles 23828 = true ∧ castsFifteens 23828 = true := by decide

/-- 5d15: nibbles fold back to 23829; digit sum 24 ≡ 23829 (mod 15). -/
theorem enumeration_hex4_5d15 : reassembles 23829 = true ∧ castsFifteens 23829 = true := by decide

/-- 5d16: nibbles fold back to 23830; digit sum 25 ≡ 23830 (mod 15). -/
theorem enumeration_hex4_5d16 : reassembles 23830 = true ∧ castsFifteens 23830 = true := by decide

/-- 5d17: nibbles fold back to 23831; digit sum 26 ≡ 23831 (mod 15). -/
theorem enumeration_hex4_5d17 : reassembles 23831 = true ∧ castsFifteens 23831 = true := by decide

/-- 5d18: nibbles fold back to 23832; digit sum 27 ≡ 23832 (mod 15). -/
theorem enumeration_hex4_5d18 : reassembles 23832 = true ∧ castsFifteens 23832 = true := by decide

/-- 5d19: nibbles fold back to 23833; digit sum 28 ≡ 23833 (mod 15). -/
theorem enumeration_hex4_5d19 : reassembles 23833 = true ∧ castsFifteens 23833 = true := by decide

/-- 5d1a: nibbles fold back to 23834; digit sum 29 ≡ 23834 (mod 15). -/
theorem enumeration_hex4_5d1a : reassembles 23834 = true ∧ castsFifteens 23834 = true := by decide

/-- 5d1b: nibbles fold back to 23835; digit sum 30 ≡ 23835 (mod 15). -/
theorem enumeration_hex4_5d1b : reassembles 23835 = true ∧ castsFifteens 23835 = true := by decide

/-- 5d1c: nibbles fold back to 23836; digit sum 31 ≡ 23836 (mod 15). -/
theorem enumeration_hex4_5d1c : reassembles 23836 = true ∧ castsFifteens 23836 = true := by decide

/-- 5d1d: nibbles fold back to 23837; digit sum 32 ≡ 23837 (mod 15). -/
theorem enumeration_hex4_5d1d : reassembles 23837 = true ∧ castsFifteens 23837 = true := by decide

/-- 5d1e: nibbles fold back to 23838; digit sum 33 ≡ 23838 (mod 15). -/
theorem enumeration_hex4_5d1e : reassembles 23838 = true ∧ castsFifteens 23838 = true := by decide

/-- 5d1f: nibbles fold back to 23839; digit sum 34 ≡ 23839 (mod 15). -/
theorem enumeration_hex4_5d1f : reassembles 23839 = true ∧ castsFifteens 23839 = true := by decide

/-- 5d20: nibbles fold back to 23840; digit sum 20 ≡ 23840 (mod 15). -/
theorem enumeration_hex4_5d20 : reassembles 23840 = true ∧ castsFifteens 23840 = true := by decide

/-- 5d21: nibbles fold back to 23841; digit sum 21 ≡ 23841 (mod 15). -/
theorem enumeration_hex4_5d21 : reassembles 23841 = true ∧ castsFifteens 23841 = true := by decide

/-- 5d22: nibbles fold back to 23842; digit sum 22 ≡ 23842 (mod 15). -/
theorem enumeration_hex4_5d22 : reassembles 23842 = true ∧ castsFifteens 23842 = true := by decide

/-- 5d23: nibbles fold back to 23843; digit sum 23 ≡ 23843 (mod 15). -/
theorem enumeration_hex4_5d23 : reassembles 23843 = true ∧ castsFifteens 23843 = true := by decide

/-- 5d24: nibbles fold back to 23844; digit sum 24 ≡ 23844 (mod 15). -/
theorem enumeration_hex4_5d24 : reassembles 23844 = true ∧ castsFifteens 23844 = true := by decide

/-- 5d25: nibbles fold back to 23845; digit sum 25 ≡ 23845 (mod 15). -/
theorem enumeration_hex4_5d25 : reassembles 23845 = true ∧ castsFifteens 23845 = true := by decide

/-- 5d26: nibbles fold back to 23846; digit sum 26 ≡ 23846 (mod 15). -/
theorem enumeration_hex4_5d26 : reassembles 23846 = true ∧ castsFifteens 23846 = true := by decide

/-- 5d27: nibbles fold back to 23847; digit sum 27 ≡ 23847 (mod 15). -/
theorem enumeration_hex4_5d27 : reassembles 23847 = true ∧ castsFifteens 23847 = true := by decide

/-- 5d28: nibbles fold back to 23848; digit sum 28 ≡ 23848 (mod 15). -/
theorem enumeration_hex4_5d28 : reassembles 23848 = true ∧ castsFifteens 23848 = true := by decide

/-- 5d29: nibbles fold back to 23849; digit sum 29 ≡ 23849 (mod 15). -/
theorem enumeration_hex4_5d29 : reassembles 23849 = true ∧ castsFifteens 23849 = true := by decide

/-- 5d2a: nibbles fold back to 23850; digit sum 30 ≡ 23850 (mod 15). -/
theorem enumeration_hex4_5d2a : reassembles 23850 = true ∧ castsFifteens 23850 = true := by decide

/-- 5d2b: nibbles fold back to 23851; digit sum 31 ≡ 23851 (mod 15). -/
theorem enumeration_hex4_5d2b : reassembles 23851 = true ∧ castsFifteens 23851 = true := by decide

/-- 5d2c: nibbles fold back to 23852; digit sum 32 ≡ 23852 (mod 15). -/
theorem enumeration_hex4_5d2c : reassembles 23852 = true ∧ castsFifteens 23852 = true := by decide

/-- 5d2d: nibbles fold back to 23853; digit sum 33 ≡ 23853 (mod 15). -/
theorem enumeration_hex4_5d2d : reassembles 23853 = true ∧ castsFifteens 23853 = true := by decide

/-- 5d2e: nibbles fold back to 23854; digit sum 34 ≡ 23854 (mod 15). -/
theorem enumeration_hex4_5d2e : reassembles 23854 = true ∧ castsFifteens 23854 = true := by decide

/-- 5d2f: nibbles fold back to 23855; digit sum 35 ≡ 23855 (mod 15). -/
theorem enumeration_hex4_5d2f : reassembles 23855 = true ∧ castsFifteens 23855 = true := by decide

/-- 5d30: nibbles fold back to 23856; digit sum 21 ≡ 23856 (mod 15). -/
theorem enumeration_hex4_5d30 : reassembles 23856 = true ∧ castsFifteens 23856 = true := by decide

/-- 5d31: nibbles fold back to 23857; digit sum 22 ≡ 23857 (mod 15). -/
theorem enumeration_hex4_5d31 : reassembles 23857 = true ∧ castsFifteens 23857 = true := by decide

/-- 5d32: nibbles fold back to 23858; digit sum 23 ≡ 23858 (mod 15). -/
theorem enumeration_hex4_5d32 : reassembles 23858 = true ∧ castsFifteens 23858 = true := by decide

/-- 5d33: nibbles fold back to 23859; digit sum 24 ≡ 23859 (mod 15). -/
theorem enumeration_hex4_5d33 : reassembles 23859 = true ∧ castsFifteens 23859 = true := by decide

/-- 5d34: nibbles fold back to 23860; digit sum 25 ≡ 23860 (mod 15). -/
theorem enumeration_hex4_5d34 : reassembles 23860 = true ∧ castsFifteens 23860 = true := by decide

/-- 5d35: nibbles fold back to 23861; digit sum 26 ≡ 23861 (mod 15). -/
theorem enumeration_hex4_5d35 : reassembles 23861 = true ∧ castsFifteens 23861 = true := by decide

/-- 5d36: nibbles fold back to 23862; digit sum 27 ≡ 23862 (mod 15). -/
theorem enumeration_hex4_5d36 : reassembles 23862 = true ∧ castsFifteens 23862 = true := by decide

/-- 5d37: nibbles fold back to 23863; digit sum 28 ≡ 23863 (mod 15). -/
theorem enumeration_hex4_5d37 : reassembles 23863 = true ∧ castsFifteens 23863 = true := by decide

/-- 5d38: nibbles fold back to 23864; digit sum 29 ≡ 23864 (mod 15). -/
theorem enumeration_hex4_5d38 : reassembles 23864 = true ∧ castsFifteens 23864 = true := by decide

/-- 5d39: nibbles fold back to 23865; digit sum 30 ≡ 23865 (mod 15). -/
theorem enumeration_hex4_5d39 : reassembles 23865 = true ∧ castsFifteens 23865 = true := by decide

/-- 5d3a: nibbles fold back to 23866; digit sum 31 ≡ 23866 (mod 15). -/
theorem enumeration_hex4_5d3a : reassembles 23866 = true ∧ castsFifteens 23866 = true := by decide

/-- 5d3b: nibbles fold back to 23867; digit sum 32 ≡ 23867 (mod 15). -/
theorem enumeration_hex4_5d3b : reassembles 23867 = true ∧ castsFifteens 23867 = true := by decide

/-- 5d3c: nibbles fold back to 23868; digit sum 33 ≡ 23868 (mod 15). -/
theorem enumeration_hex4_5d3c : reassembles 23868 = true ∧ castsFifteens 23868 = true := by decide

/-- 5d3d: nibbles fold back to 23869; digit sum 34 ≡ 23869 (mod 15). -/
theorem enumeration_hex4_5d3d : reassembles 23869 = true ∧ castsFifteens 23869 = true := by decide

/-- 5d3e: nibbles fold back to 23870; digit sum 35 ≡ 23870 (mod 15). -/
theorem enumeration_hex4_5d3e : reassembles 23870 = true ∧ castsFifteens 23870 = true := by decide

/-- 5d3f: nibbles fold back to 23871; digit sum 36 ≡ 23871 (mod 15). -/
theorem enumeration_hex4_5d3f : reassembles 23871 = true ∧ castsFifteens 23871 = true := by decide

/-- 5d40: nibbles fold back to 23872; digit sum 22 ≡ 23872 (mod 15). -/
theorem enumeration_hex4_5d40 : reassembles 23872 = true ∧ castsFifteens 23872 = true := by decide

/-- 5d41: nibbles fold back to 23873; digit sum 23 ≡ 23873 (mod 15). -/
theorem enumeration_hex4_5d41 : reassembles 23873 = true ∧ castsFifteens 23873 = true := by decide

/-- 5d42: nibbles fold back to 23874; digit sum 24 ≡ 23874 (mod 15). -/
theorem enumeration_hex4_5d42 : reassembles 23874 = true ∧ castsFifteens 23874 = true := by decide

/-- 5d43: nibbles fold back to 23875; digit sum 25 ≡ 23875 (mod 15). -/
theorem enumeration_hex4_5d43 : reassembles 23875 = true ∧ castsFifteens 23875 = true := by decide

/-- 5d44: nibbles fold back to 23876; digit sum 26 ≡ 23876 (mod 15). -/
theorem enumeration_hex4_5d44 : reassembles 23876 = true ∧ castsFifteens 23876 = true := by decide

/-- 5d45: nibbles fold back to 23877; digit sum 27 ≡ 23877 (mod 15). -/
theorem enumeration_hex4_5d45 : reassembles 23877 = true ∧ castsFifteens 23877 = true := by decide

/-- 5d46: nibbles fold back to 23878; digit sum 28 ≡ 23878 (mod 15). -/
theorem enumeration_hex4_5d46 : reassembles 23878 = true ∧ castsFifteens 23878 = true := by decide

/-- 5d47: nibbles fold back to 23879; digit sum 29 ≡ 23879 (mod 15). -/
theorem enumeration_hex4_5d47 : reassembles 23879 = true ∧ castsFifteens 23879 = true := by decide

/-- 5d48: nibbles fold back to 23880; digit sum 30 ≡ 23880 (mod 15). -/
theorem enumeration_hex4_5d48 : reassembles 23880 = true ∧ castsFifteens 23880 = true := by decide

/-- 5d49: nibbles fold back to 23881; digit sum 31 ≡ 23881 (mod 15). -/
theorem enumeration_hex4_5d49 : reassembles 23881 = true ∧ castsFifteens 23881 = true := by decide

/-- 5d4a: nibbles fold back to 23882; digit sum 32 ≡ 23882 (mod 15). -/
theorem enumeration_hex4_5d4a : reassembles 23882 = true ∧ castsFifteens 23882 = true := by decide

/-- 5d4b: nibbles fold back to 23883; digit sum 33 ≡ 23883 (mod 15). -/
theorem enumeration_hex4_5d4b : reassembles 23883 = true ∧ castsFifteens 23883 = true := by decide

/-- 5d4c: nibbles fold back to 23884; digit sum 34 ≡ 23884 (mod 15). -/
theorem enumeration_hex4_5d4c : reassembles 23884 = true ∧ castsFifteens 23884 = true := by decide

/-- 5d4d: nibbles fold back to 23885; digit sum 35 ≡ 23885 (mod 15). -/
theorem enumeration_hex4_5d4d : reassembles 23885 = true ∧ castsFifteens 23885 = true := by decide

/-- 5d4e: nibbles fold back to 23886; digit sum 36 ≡ 23886 (mod 15). -/
theorem enumeration_hex4_5d4e : reassembles 23886 = true ∧ castsFifteens 23886 = true := by decide

/-- 5d4f: nibbles fold back to 23887; digit sum 37 ≡ 23887 (mod 15). -/
theorem enumeration_hex4_5d4f : reassembles 23887 = true ∧ castsFifteens 23887 = true := by decide

/-- 5d50: nibbles fold back to 23888; digit sum 23 ≡ 23888 (mod 15). -/
theorem enumeration_hex4_5d50 : reassembles 23888 = true ∧ castsFifteens 23888 = true := by decide

/-- 5d51: nibbles fold back to 23889; digit sum 24 ≡ 23889 (mod 15). -/
theorem enumeration_hex4_5d51 : reassembles 23889 = true ∧ castsFifteens 23889 = true := by decide

/-- 5d52: nibbles fold back to 23890; digit sum 25 ≡ 23890 (mod 15). -/
theorem enumeration_hex4_5d52 : reassembles 23890 = true ∧ castsFifteens 23890 = true := by decide

/-- 5d53: nibbles fold back to 23891; digit sum 26 ≡ 23891 (mod 15). -/
theorem enumeration_hex4_5d53 : reassembles 23891 = true ∧ castsFifteens 23891 = true := by decide

/-- 5d54: nibbles fold back to 23892; digit sum 27 ≡ 23892 (mod 15). -/
theorem enumeration_hex4_5d54 : reassembles 23892 = true ∧ castsFifteens 23892 = true := by decide

/-- 5d55: nibbles fold back to 23893; digit sum 28 ≡ 23893 (mod 15). -/
theorem enumeration_hex4_5d55 : reassembles 23893 = true ∧ castsFifteens 23893 = true := by decide

/-- 5d56: nibbles fold back to 23894; digit sum 29 ≡ 23894 (mod 15). -/
theorem enumeration_hex4_5d56 : reassembles 23894 = true ∧ castsFifteens 23894 = true := by decide

/-- 5d57: nibbles fold back to 23895; digit sum 30 ≡ 23895 (mod 15). -/
theorem enumeration_hex4_5d57 : reassembles 23895 = true ∧ castsFifteens 23895 = true := by decide

/-- 5d58: nibbles fold back to 23896; digit sum 31 ≡ 23896 (mod 15). -/
theorem enumeration_hex4_5d58 : reassembles 23896 = true ∧ castsFifteens 23896 = true := by decide

/-- 5d59: nibbles fold back to 23897; digit sum 32 ≡ 23897 (mod 15). -/
theorem enumeration_hex4_5d59 : reassembles 23897 = true ∧ castsFifteens 23897 = true := by decide

/-- 5d5a: nibbles fold back to 23898; digit sum 33 ≡ 23898 (mod 15). -/
theorem enumeration_hex4_5d5a : reassembles 23898 = true ∧ castsFifteens 23898 = true := by decide

/-- 5d5b: nibbles fold back to 23899; digit sum 34 ≡ 23899 (mod 15). -/
theorem enumeration_hex4_5d5b : reassembles 23899 = true ∧ castsFifteens 23899 = true := by decide

/-- 5d5c: nibbles fold back to 23900; digit sum 35 ≡ 23900 (mod 15). -/
theorem enumeration_hex4_5d5c : reassembles 23900 = true ∧ castsFifteens 23900 = true := by decide

/-- 5d5d: nibbles fold back to 23901; digit sum 36 ≡ 23901 (mod 15). -/
theorem enumeration_hex4_5d5d : reassembles 23901 = true ∧ castsFifteens 23901 = true := by decide

/-- 5d5e: nibbles fold back to 23902; digit sum 37 ≡ 23902 (mod 15). -/
theorem enumeration_hex4_5d5e : reassembles 23902 = true ∧ castsFifteens 23902 = true := by decide

/-- 5d5f: nibbles fold back to 23903; digit sum 38 ≡ 23903 (mod 15). -/
theorem enumeration_hex4_5d5f : reassembles 23903 = true ∧ castsFifteens 23903 = true := by decide

/-- 5d60: nibbles fold back to 23904; digit sum 24 ≡ 23904 (mod 15). -/
theorem enumeration_hex4_5d60 : reassembles 23904 = true ∧ castsFifteens 23904 = true := by decide

/-- 5d61: nibbles fold back to 23905; digit sum 25 ≡ 23905 (mod 15). -/
theorem enumeration_hex4_5d61 : reassembles 23905 = true ∧ castsFifteens 23905 = true := by decide

/-- 5d62: nibbles fold back to 23906; digit sum 26 ≡ 23906 (mod 15). -/
theorem enumeration_hex4_5d62 : reassembles 23906 = true ∧ castsFifteens 23906 = true := by decide

/-- 5d63: nibbles fold back to 23907; digit sum 27 ≡ 23907 (mod 15). -/
theorem enumeration_hex4_5d63 : reassembles 23907 = true ∧ castsFifteens 23907 = true := by decide

/-- 5d64: nibbles fold back to 23908; digit sum 28 ≡ 23908 (mod 15). -/
theorem enumeration_hex4_5d64 : reassembles 23908 = true ∧ castsFifteens 23908 = true := by decide

/-- 5d65: nibbles fold back to 23909; digit sum 29 ≡ 23909 (mod 15). -/
theorem enumeration_hex4_5d65 : reassembles 23909 = true ∧ castsFifteens 23909 = true := by decide

/-- 5d66: nibbles fold back to 23910; digit sum 30 ≡ 23910 (mod 15). -/
theorem enumeration_hex4_5d66 : reassembles 23910 = true ∧ castsFifteens 23910 = true := by decide

/-- 5d67: nibbles fold back to 23911; digit sum 31 ≡ 23911 (mod 15). -/
theorem enumeration_hex4_5d67 : reassembles 23911 = true ∧ castsFifteens 23911 = true := by decide

/-- 5d68: nibbles fold back to 23912; digit sum 32 ≡ 23912 (mod 15). -/
theorem enumeration_hex4_5d68 : reassembles 23912 = true ∧ castsFifteens 23912 = true := by decide

/-- 5d69: nibbles fold back to 23913; digit sum 33 ≡ 23913 (mod 15). -/
theorem enumeration_hex4_5d69 : reassembles 23913 = true ∧ castsFifteens 23913 = true := by decide

/-- 5d6a: nibbles fold back to 23914; digit sum 34 ≡ 23914 (mod 15). -/
theorem enumeration_hex4_5d6a : reassembles 23914 = true ∧ castsFifteens 23914 = true := by decide

/-- 5d6b: nibbles fold back to 23915; digit sum 35 ≡ 23915 (mod 15). -/
theorem enumeration_hex4_5d6b : reassembles 23915 = true ∧ castsFifteens 23915 = true := by decide

/-- 5d6c: nibbles fold back to 23916; digit sum 36 ≡ 23916 (mod 15). -/
theorem enumeration_hex4_5d6c : reassembles 23916 = true ∧ castsFifteens 23916 = true := by decide

/-- 5d6d: nibbles fold back to 23917; digit sum 37 ≡ 23917 (mod 15). -/
theorem enumeration_hex4_5d6d : reassembles 23917 = true ∧ castsFifteens 23917 = true := by decide

/-- 5d6e: nibbles fold back to 23918; digit sum 38 ≡ 23918 (mod 15). -/
theorem enumeration_hex4_5d6e : reassembles 23918 = true ∧ castsFifteens 23918 = true := by decide

/-- 5d6f: nibbles fold back to 23919; digit sum 39 ≡ 23919 (mod 15). -/
theorem enumeration_hex4_5d6f : reassembles 23919 = true ∧ castsFifteens 23919 = true := by decide

/-- 5d70: nibbles fold back to 23920; digit sum 25 ≡ 23920 (mod 15). -/
theorem enumeration_hex4_5d70 : reassembles 23920 = true ∧ castsFifteens 23920 = true := by decide

/-- 5d71: nibbles fold back to 23921; digit sum 26 ≡ 23921 (mod 15). -/
theorem enumeration_hex4_5d71 : reassembles 23921 = true ∧ castsFifteens 23921 = true := by decide

/-- 5d72: nibbles fold back to 23922; digit sum 27 ≡ 23922 (mod 15). -/
theorem enumeration_hex4_5d72 : reassembles 23922 = true ∧ castsFifteens 23922 = true := by decide

/-- 5d73: nibbles fold back to 23923; digit sum 28 ≡ 23923 (mod 15). -/
theorem enumeration_hex4_5d73 : reassembles 23923 = true ∧ castsFifteens 23923 = true := by decide

/-- 5d74: nibbles fold back to 23924; digit sum 29 ≡ 23924 (mod 15). -/
theorem enumeration_hex4_5d74 : reassembles 23924 = true ∧ castsFifteens 23924 = true := by decide

/-- 5d75: nibbles fold back to 23925; digit sum 30 ≡ 23925 (mod 15). -/
theorem enumeration_hex4_5d75 : reassembles 23925 = true ∧ castsFifteens 23925 = true := by decide

/-- 5d76: nibbles fold back to 23926; digit sum 31 ≡ 23926 (mod 15). -/
theorem enumeration_hex4_5d76 : reassembles 23926 = true ∧ castsFifteens 23926 = true := by decide

/-- 5d77: nibbles fold back to 23927; digit sum 32 ≡ 23927 (mod 15). -/
theorem enumeration_hex4_5d77 : reassembles 23927 = true ∧ castsFifteens 23927 = true := by decide

/-- 5d78: nibbles fold back to 23928; digit sum 33 ≡ 23928 (mod 15). -/
theorem enumeration_hex4_5d78 : reassembles 23928 = true ∧ castsFifteens 23928 = true := by decide

/-- 5d79: nibbles fold back to 23929; digit sum 34 ≡ 23929 (mod 15). -/
theorem enumeration_hex4_5d79 : reassembles 23929 = true ∧ castsFifteens 23929 = true := by decide

/-- 5d7a: nibbles fold back to 23930; digit sum 35 ≡ 23930 (mod 15). -/
theorem enumeration_hex4_5d7a : reassembles 23930 = true ∧ castsFifteens 23930 = true := by decide

/-- 5d7b: nibbles fold back to 23931; digit sum 36 ≡ 23931 (mod 15). -/
theorem enumeration_hex4_5d7b : reassembles 23931 = true ∧ castsFifteens 23931 = true := by decide

/-- 5d7c: nibbles fold back to 23932; digit sum 37 ≡ 23932 (mod 15). -/
theorem enumeration_hex4_5d7c : reassembles 23932 = true ∧ castsFifteens 23932 = true := by decide

/-- 5d7d: nibbles fold back to 23933; digit sum 38 ≡ 23933 (mod 15). -/
theorem enumeration_hex4_5d7d : reassembles 23933 = true ∧ castsFifteens 23933 = true := by decide

/-- 5d7e: nibbles fold back to 23934; digit sum 39 ≡ 23934 (mod 15). -/
theorem enumeration_hex4_5d7e : reassembles 23934 = true ∧ castsFifteens 23934 = true := by decide

/-- 5d7f: nibbles fold back to 23935; digit sum 40 ≡ 23935 (mod 15). -/
theorem enumeration_hex4_5d7f : reassembles 23935 = true ∧ castsFifteens 23935 = true := by decide

/-- 5d80: nibbles fold back to 23936; digit sum 26 ≡ 23936 (mod 15). -/
theorem enumeration_hex4_5d80 : reassembles 23936 = true ∧ castsFifteens 23936 = true := by decide

/-- 5d81: nibbles fold back to 23937; digit sum 27 ≡ 23937 (mod 15). -/
theorem enumeration_hex4_5d81 : reassembles 23937 = true ∧ castsFifteens 23937 = true := by decide

/-- 5d82: nibbles fold back to 23938; digit sum 28 ≡ 23938 (mod 15). -/
theorem enumeration_hex4_5d82 : reassembles 23938 = true ∧ castsFifteens 23938 = true := by decide

/-- 5d83: nibbles fold back to 23939; digit sum 29 ≡ 23939 (mod 15). -/
theorem enumeration_hex4_5d83 : reassembles 23939 = true ∧ castsFifteens 23939 = true := by decide

/-- 5d84: nibbles fold back to 23940; digit sum 30 ≡ 23940 (mod 15). -/
theorem enumeration_hex4_5d84 : reassembles 23940 = true ∧ castsFifteens 23940 = true := by decide

/-- 5d85: nibbles fold back to 23941; digit sum 31 ≡ 23941 (mod 15). -/
theorem enumeration_hex4_5d85 : reassembles 23941 = true ∧ castsFifteens 23941 = true := by decide

/-- 5d86: nibbles fold back to 23942; digit sum 32 ≡ 23942 (mod 15). -/
theorem enumeration_hex4_5d86 : reassembles 23942 = true ∧ castsFifteens 23942 = true := by decide

/-- 5d87: nibbles fold back to 23943; digit sum 33 ≡ 23943 (mod 15). -/
theorem enumeration_hex4_5d87 : reassembles 23943 = true ∧ castsFifteens 23943 = true := by decide

/-- 5d88: nibbles fold back to 23944; digit sum 34 ≡ 23944 (mod 15). -/
theorem enumeration_hex4_5d88 : reassembles 23944 = true ∧ castsFifteens 23944 = true := by decide

/-- 5d89: nibbles fold back to 23945; digit sum 35 ≡ 23945 (mod 15). -/
theorem enumeration_hex4_5d89 : reassembles 23945 = true ∧ castsFifteens 23945 = true := by decide

/-- 5d8a: nibbles fold back to 23946; digit sum 36 ≡ 23946 (mod 15). -/
theorem enumeration_hex4_5d8a : reassembles 23946 = true ∧ castsFifteens 23946 = true := by decide

/-- 5d8b: nibbles fold back to 23947; digit sum 37 ≡ 23947 (mod 15). -/
theorem enumeration_hex4_5d8b : reassembles 23947 = true ∧ castsFifteens 23947 = true := by decide

/-- 5d8c: nibbles fold back to 23948; digit sum 38 ≡ 23948 (mod 15). -/
theorem enumeration_hex4_5d8c : reassembles 23948 = true ∧ castsFifteens 23948 = true := by decide

/-- 5d8d: nibbles fold back to 23949; digit sum 39 ≡ 23949 (mod 15). -/
theorem enumeration_hex4_5d8d : reassembles 23949 = true ∧ castsFifteens 23949 = true := by decide

/-- 5d8e: nibbles fold back to 23950; digit sum 40 ≡ 23950 (mod 15). -/
theorem enumeration_hex4_5d8e : reassembles 23950 = true ∧ castsFifteens 23950 = true := by decide

/-- 5d8f: nibbles fold back to 23951; digit sum 41 ≡ 23951 (mod 15). -/
theorem enumeration_hex4_5d8f : reassembles 23951 = true ∧ castsFifteens 23951 = true := by decide

/-- 5d90: nibbles fold back to 23952; digit sum 27 ≡ 23952 (mod 15). -/
theorem enumeration_hex4_5d90 : reassembles 23952 = true ∧ castsFifteens 23952 = true := by decide

/-- 5d91: nibbles fold back to 23953; digit sum 28 ≡ 23953 (mod 15). -/
theorem enumeration_hex4_5d91 : reassembles 23953 = true ∧ castsFifteens 23953 = true := by decide

/-- 5d92: nibbles fold back to 23954; digit sum 29 ≡ 23954 (mod 15). -/
theorem enumeration_hex4_5d92 : reassembles 23954 = true ∧ castsFifteens 23954 = true := by decide

/-- 5d93: nibbles fold back to 23955; digit sum 30 ≡ 23955 (mod 15). -/
theorem enumeration_hex4_5d93 : reassembles 23955 = true ∧ castsFifteens 23955 = true := by decide

/-- 5d94: nibbles fold back to 23956; digit sum 31 ≡ 23956 (mod 15). -/
theorem enumeration_hex4_5d94 : reassembles 23956 = true ∧ castsFifteens 23956 = true := by decide

/-- 5d95: nibbles fold back to 23957; digit sum 32 ≡ 23957 (mod 15). -/
theorem enumeration_hex4_5d95 : reassembles 23957 = true ∧ castsFifteens 23957 = true := by decide

/-- 5d96: nibbles fold back to 23958; digit sum 33 ≡ 23958 (mod 15). -/
theorem enumeration_hex4_5d96 : reassembles 23958 = true ∧ castsFifteens 23958 = true := by decide

/-- 5d97: nibbles fold back to 23959; digit sum 34 ≡ 23959 (mod 15). -/
theorem enumeration_hex4_5d97 : reassembles 23959 = true ∧ castsFifteens 23959 = true := by decide

/-- 5d98: nibbles fold back to 23960; digit sum 35 ≡ 23960 (mod 15). -/
theorem enumeration_hex4_5d98 : reassembles 23960 = true ∧ castsFifteens 23960 = true := by decide

/-- 5d99: nibbles fold back to 23961; digit sum 36 ≡ 23961 (mod 15). -/
theorem enumeration_hex4_5d99 : reassembles 23961 = true ∧ castsFifteens 23961 = true := by decide

/-- 5d9a: nibbles fold back to 23962; digit sum 37 ≡ 23962 (mod 15). -/
theorem enumeration_hex4_5d9a : reassembles 23962 = true ∧ castsFifteens 23962 = true := by decide

/-- 5d9b: nibbles fold back to 23963; digit sum 38 ≡ 23963 (mod 15). -/
theorem enumeration_hex4_5d9b : reassembles 23963 = true ∧ castsFifteens 23963 = true := by decide

/-- 5d9c: nibbles fold back to 23964; digit sum 39 ≡ 23964 (mod 15). -/
theorem enumeration_hex4_5d9c : reassembles 23964 = true ∧ castsFifteens 23964 = true := by decide

/-- 5d9d: nibbles fold back to 23965; digit sum 40 ≡ 23965 (mod 15). -/
theorem enumeration_hex4_5d9d : reassembles 23965 = true ∧ castsFifteens 23965 = true := by decide

/-- 5d9e: nibbles fold back to 23966; digit sum 41 ≡ 23966 (mod 15). -/
theorem enumeration_hex4_5d9e : reassembles 23966 = true ∧ castsFifteens 23966 = true := by decide

/-- 5d9f: nibbles fold back to 23967; digit sum 42 ≡ 23967 (mod 15). -/
theorem enumeration_hex4_5d9f : reassembles 23967 = true ∧ castsFifteens 23967 = true := by decide

/-- 5da0: nibbles fold back to 23968; digit sum 28 ≡ 23968 (mod 15). -/
theorem enumeration_hex4_5da0 : reassembles 23968 = true ∧ castsFifteens 23968 = true := by decide

/-- 5da1: nibbles fold back to 23969; digit sum 29 ≡ 23969 (mod 15). -/
theorem enumeration_hex4_5da1 : reassembles 23969 = true ∧ castsFifteens 23969 = true := by decide

/-- 5da2: nibbles fold back to 23970; digit sum 30 ≡ 23970 (mod 15). -/
theorem enumeration_hex4_5da2 : reassembles 23970 = true ∧ castsFifteens 23970 = true := by decide

/-- 5da3: nibbles fold back to 23971; digit sum 31 ≡ 23971 (mod 15). -/
theorem enumeration_hex4_5da3 : reassembles 23971 = true ∧ castsFifteens 23971 = true := by decide

/-- 5da4: nibbles fold back to 23972; digit sum 32 ≡ 23972 (mod 15). -/
theorem enumeration_hex4_5da4 : reassembles 23972 = true ∧ castsFifteens 23972 = true := by decide

/-- 5da5: nibbles fold back to 23973; digit sum 33 ≡ 23973 (mod 15). -/
theorem enumeration_hex4_5da5 : reassembles 23973 = true ∧ castsFifteens 23973 = true := by decide

/-- 5da6: nibbles fold back to 23974; digit sum 34 ≡ 23974 (mod 15). -/
theorem enumeration_hex4_5da6 : reassembles 23974 = true ∧ castsFifteens 23974 = true := by decide

/-- 5da7: nibbles fold back to 23975; digit sum 35 ≡ 23975 (mod 15). -/
theorem enumeration_hex4_5da7 : reassembles 23975 = true ∧ castsFifteens 23975 = true := by decide

/-- 5da8: nibbles fold back to 23976; digit sum 36 ≡ 23976 (mod 15). -/
theorem enumeration_hex4_5da8 : reassembles 23976 = true ∧ castsFifteens 23976 = true := by decide

/-- 5da9: nibbles fold back to 23977; digit sum 37 ≡ 23977 (mod 15). -/
theorem enumeration_hex4_5da9 : reassembles 23977 = true ∧ castsFifteens 23977 = true := by decide

/-- 5daa: nibbles fold back to 23978; digit sum 38 ≡ 23978 (mod 15). -/
theorem enumeration_hex4_5daa : reassembles 23978 = true ∧ castsFifteens 23978 = true := by decide

/-- 5dab: nibbles fold back to 23979; digit sum 39 ≡ 23979 (mod 15). -/
theorem enumeration_hex4_5dab : reassembles 23979 = true ∧ castsFifteens 23979 = true := by decide

/-- 5dac: nibbles fold back to 23980; digit sum 40 ≡ 23980 (mod 15). -/
theorem enumeration_hex4_5dac : reassembles 23980 = true ∧ castsFifteens 23980 = true := by decide

/-- 5dad: nibbles fold back to 23981; digit sum 41 ≡ 23981 (mod 15). -/
theorem enumeration_hex4_5dad : reassembles 23981 = true ∧ castsFifteens 23981 = true := by decide

/-- 5dae: nibbles fold back to 23982; digit sum 42 ≡ 23982 (mod 15). -/
theorem enumeration_hex4_5dae : reassembles 23982 = true ∧ castsFifteens 23982 = true := by decide

/-- 5daf: nibbles fold back to 23983; digit sum 43 ≡ 23983 (mod 15). -/
theorem enumeration_hex4_5daf : reassembles 23983 = true ∧ castsFifteens 23983 = true := by decide

/-- 5db0: nibbles fold back to 23984; digit sum 29 ≡ 23984 (mod 15). -/
theorem enumeration_hex4_5db0 : reassembles 23984 = true ∧ castsFifteens 23984 = true := by decide

/-- 5db1: nibbles fold back to 23985; digit sum 30 ≡ 23985 (mod 15). -/
theorem enumeration_hex4_5db1 : reassembles 23985 = true ∧ castsFifteens 23985 = true := by decide

/-- 5db2: nibbles fold back to 23986; digit sum 31 ≡ 23986 (mod 15). -/
theorem enumeration_hex4_5db2 : reassembles 23986 = true ∧ castsFifteens 23986 = true := by decide

/-- 5db3: nibbles fold back to 23987; digit sum 32 ≡ 23987 (mod 15). -/
theorem enumeration_hex4_5db3 : reassembles 23987 = true ∧ castsFifteens 23987 = true := by decide

/-- 5db4: nibbles fold back to 23988; digit sum 33 ≡ 23988 (mod 15). -/
theorem enumeration_hex4_5db4 : reassembles 23988 = true ∧ castsFifteens 23988 = true := by decide

/-- 5db5: nibbles fold back to 23989; digit sum 34 ≡ 23989 (mod 15). -/
theorem enumeration_hex4_5db5 : reassembles 23989 = true ∧ castsFifteens 23989 = true := by decide

/-- 5db6: nibbles fold back to 23990; digit sum 35 ≡ 23990 (mod 15). -/
theorem enumeration_hex4_5db6 : reassembles 23990 = true ∧ castsFifteens 23990 = true := by decide

/-- 5db7: nibbles fold back to 23991; digit sum 36 ≡ 23991 (mod 15). -/
theorem enumeration_hex4_5db7 : reassembles 23991 = true ∧ castsFifteens 23991 = true := by decide

/-- 5db8: nibbles fold back to 23992; digit sum 37 ≡ 23992 (mod 15). -/
theorem enumeration_hex4_5db8 : reassembles 23992 = true ∧ castsFifteens 23992 = true := by decide

/-- 5db9: nibbles fold back to 23993; digit sum 38 ≡ 23993 (mod 15). -/
theorem enumeration_hex4_5db9 : reassembles 23993 = true ∧ castsFifteens 23993 = true := by decide

/-- 5dba: nibbles fold back to 23994; digit sum 39 ≡ 23994 (mod 15). -/
theorem enumeration_hex4_5dba : reassembles 23994 = true ∧ castsFifteens 23994 = true := by decide

/-- 5dbb: nibbles fold back to 23995; digit sum 40 ≡ 23995 (mod 15). -/
theorem enumeration_hex4_5dbb : reassembles 23995 = true ∧ castsFifteens 23995 = true := by decide

/-- 5dbc: nibbles fold back to 23996; digit sum 41 ≡ 23996 (mod 15). -/
theorem enumeration_hex4_5dbc : reassembles 23996 = true ∧ castsFifteens 23996 = true := by decide

/-- 5dbd: nibbles fold back to 23997; digit sum 42 ≡ 23997 (mod 15). -/
theorem enumeration_hex4_5dbd : reassembles 23997 = true ∧ castsFifteens 23997 = true := by decide

/-- 5dbe: nibbles fold back to 23998; digit sum 43 ≡ 23998 (mod 15). -/
theorem enumeration_hex4_5dbe : reassembles 23998 = true ∧ castsFifteens 23998 = true := by decide

/-- 5dbf: nibbles fold back to 23999; digit sum 44 ≡ 23999 (mod 15). -/
theorem enumeration_hex4_5dbf : reassembles 23999 = true ∧ castsFifteens 23999 = true := by decide

/-- 5dc0: nibbles fold back to 24000; digit sum 30 ≡ 24000 (mod 15). -/
theorem enumeration_hex4_5dc0 : reassembles 24000 = true ∧ castsFifteens 24000 = true := by decide

/-- 5dc1: nibbles fold back to 24001; digit sum 31 ≡ 24001 (mod 15). -/
theorem enumeration_hex4_5dc1 : reassembles 24001 = true ∧ castsFifteens 24001 = true := by decide

/-- 5dc2: nibbles fold back to 24002; digit sum 32 ≡ 24002 (mod 15). -/
theorem enumeration_hex4_5dc2 : reassembles 24002 = true ∧ castsFifteens 24002 = true := by decide

/-- 5dc3: nibbles fold back to 24003; digit sum 33 ≡ 24003 (mod 15). -/
theorem enumeration_hex4_5dc3 : reassembles 24003 = true ∧ castsFifteens 24003 = true := by decide

/-- 5dc4: nibbles fold back to 24004; digit sum 34 ≡ 24004 (mod 15). -/
theorem enumeration_hex4_5dc4 : reassembles 24004 = true ∧ castsFifteens 24004 = true := by decide

/-- 5dc5: nibbles fold back to 24005; digit sum 35 ≡ 24005 (mod 15). -/
theorem enumeration_hex4_5dc5 : reassembles 24005 = true ∧ castsFifteens 24005 = true := by decide

/-- 5dc6: nibbles fold back to 24006; digit sum 36 ≡ 24006 (mod 15). -/
theorem enumeration_hex4_5dc6 : reassembles 24006 = true ∧ castsFifteens 24006 = true := by decide

/-- 5dc7: nibbles fold back to 24007; digit sum 37 ≡ 24007 (mod 15). -/
theorem enumeration_hex4_5dc7 : reassembles 24007 = true ∧ castsFifteens 24007 = true := by decide

/-- 5dc8: nibbles fold back to 24008; digit sum 38 ≡ 24008 (mod 15). -/
theorem enumeration_hex4_5dc8 : reassembles 24008 = true ∧ castsFifteens 24008 = true := by decide

/-- 5dc9: nibbles fold back to 24009; digit sum 39 ≡ 24009 (mod 15). -/
theorem enumeration_hex4_5dc9 : reassembles 24009 = true ∧ castsFifteens 24009 = true := by decide

/-- 5dca: nibbles fold back to 24010; digit sum 40 ≡ 24010 (mod 15). -/
theorem enumeration_hex4_5dca : reassembles 24010 = true ∧ castsFifteens 24010 = true := by decide

/-- 5dcb: nibbles fold back to 24011; digit sum 41 ≡ 24011 (mod 15). -/
theorem enumeration_hex4_5dcb : reassembles 24011 = true ∧ castsFifteens 24011 = true := by decide

/-- 5dcc: nibbles fold back to 24012; digit sum 42 ≡ 24012 (mod 15). -/
theorem enumeration_hex4_5dcc : reassembles 24012 = true ∧ castsFifteens 24012 = true := by decide

/-- 5dcd: nibbles fold back to 24013; digit sum 43 ≡ 24013 (mod 15). -/
theorem enumeration_hex4_5dcd : reassembles 24013 = true ∧ castsFifteens 24013 = true := by decide

/-- 5dce: nibbles fold back to 24014; digit sum 44 ≡ 24014 (mod 15). -/
theorem enumeration_hex4_5dce : reassembles 24014 = true ∧ castsFifteens 24014 = true := by decide

/-- 5dcf: nibbles fold back to 24015; digit sum 45 ≡ 24015 (mod 15). -/
theorem enumeration_hex4_5dcf : reassembles 24015 = true ∧ castsFifteens 24015 = true := by decide

/-- 5dd0: nibbles fold back to 24016; digit sum 31 ≡ 24016 (mod 15). -/
theorem enumeration_hex4_5dd0 : reassembles 24016 = true ∧ castsFifteens 24016 = true := by decide

/-- 5dd1: nibbles fold back to 24017; digit sum 32 ≡ 24017 (mod 15). -/
theorem enumeration_hex4_5dd1 : reassembles 24017 = true ∧ castsFifteens 24017 = true := by decide

/-- 5dd2: nibbles fold back to 24018; digit sum 33 ≡ 24018 (mod 15). -/
theorem enumeration_hex4_5dd2 : reassembles 24018 = true ∧ castsFifteens 24018 = true := by decide

/-- 5dd3: nibbles fold back to 24019; digit sum 34 ≡ 24019 (mod 15). -/
theorem enumeration_hex4_5dd3 : reassembles 24019 = true ∧ castsFifteens 24019 = true := by decide

/-- 5dd4: nibbles fold back to 24020; digit sum 35 ≡ 24020 (mod 15). -/
theorem enumeration_hex4_5dd4 : reassembles 24020 = true ∧ castsFifteens 24020 = true := by decide

/-- 5dd5: nibbles fold back to 24021; digit sum 36 ≡ 24021 (mod 15). -/
theorem enumeration_hex4_5dd5 : reassembles 24021 = true ∧ castsFifteens 24021 = true := by decide

/-- 5dd6: nibbles fold back to 24022; digit sum 37 ≡ 24022 (mod 15). -/
theorem enumeration_hex4_5dd6 : reassembles 24022 = true ∧ castsFifteens 24022 = true := by decide

/-- 5dd7: nibbles fold back to 24023; digit sum 38 ≡ 24023 (mod 15). -/
theorem enumeration_hex4_5dd7 : reassembles 24023 = true ∧ castsFifteens 24023 = true := by decide

/-- 5dd8: nibbles fold back to 24024; digit sum 39 ≡ 24024 (mod 15). -/
theorem enumeration_hex4_5dd8 : reassembles 24024 = true ∧ castsFifteens 24024 = true := by decide

/-- 5dd9: nibbles fold back to 24025; digit sum 40 ≡ 24025 (mod 15). -/
theorem enumeration_hex4_5dd9 : reassembles 24025 = true ∧ castsFifteens 24025 = true := by decide

/-- 5dda: nibbles fold back to 24026; digit sum 41 ≡ 24026 (mod 15). -/
theorem enumeration_hex4_5dda : reassembles 24026 = true ∧ castsFifteens 24026 = true := by decide

/-- 5ddb: nibbles fold back to 24027; digit sum 42 ≡ 24027 (mod 15). -/
theorem enumeration_hex4_5ddb : reassembles 24027 = true ∧ castsFifteens 24027 = true := by decide

/-- 5ddc: nibbles fold back to 24028; digit sum 43 ≡ 24028 (mod 15). -/
theorem enumeration_hex4_5ddc : reassembles 24028 = true ∧ castsFifteens 24028 = true := by decide

/-- 5ddd: nibbles fold back to 24029; digit sum 44 ≡ 24029 (mod 15). -/
theorem enumeration_hex4_5ddd : reassembles 24029 = true ∧ castsFifteens 24029 = true := by decide

/-- 5dde: nibbles fold back to 24030; digit sum 45 ≡ 24030 (mod 15). -/
theorem enumeration_hex4_5dde : reassembles 24030 = true ∧ castsFifteens 24030 = true := by decide

/-- 5ddf: nibbles fold back to 24031; digit sum 46 ≡ 24031 (mod 15). -/
theorem enumeration_hex4_5ddf : reassembles 24031 = true ∧ castsFifteens 24031 = true := by decide

/-- 5de0: nibbles fold back to 24032; digit sum 32 ≡ 24032 (mod 15). -/
theorem enumeration_hex4_5de0 : reassembles 24032 = true ∧ castsFifteens 24032 = true := by decide

/-- 5de1: nibbles fold back to 24033; digit sum 33 ≡ 24033 (mod 15). -/
theorem enumeration_hex4_5de1 : reassembles 24033 = true ∧ castsFifteens 24033 = true := by decide

/-- 5de2: nibbles fold back to 24034; digit sum 34 ≡ 24034 (mod 15). -/
theorem enumeration_hex4_5de2 : reassembles 24034 = true ∧ castsFifteens 24034 = true := by decide

/-- 5de3: nibbles fold back to 24035; digit sum 35 ≡ 24035 (mod 15). -/
theorem enumeration_hex4_5de3 : reassembles 24035 = true ∧ castsFifteens 24035 = true := by decide

/-- 5de4: nibbles fold back to 24036; digit sum 36 ≡ 24036 (mod 15). -/
theorem enumeration_hex4_5de4 : reassembles 24036 = true ∧ castsFifteens 24036 = true := by decide

/-- 5de5: nibbles fold back to 24037; digit sum 37 ≡ 24037 (mod 15). -/
theorem enumeration_hex4_5de5 : reassembles 24037 = true ∧ castsFifteens 24037 = true := by decide

/-- 5de6: nibbles fold back to 24038; digit sum 38 ≡ 24038 (mod 15). -/
theorem enumeration_hex4_5de6 : reassembles 24038 = true ∧ castsFifteens 24038 = true := by decide

/-- 5de7: nibbles fold back to 24039; digit sum 39 ≡ 24039 (mod 15). -/
theorem enumeration_hex4_5de7 : reassembles 24039 = true ∧ castsFifteens 24039 = true := by decide

/-- 5de8: nibbles fold back to 24040; digit sum 40 ≡ 24040 (mod 15). -/
theorem enumeration_hex4_5de8 : reassembles 24040 = true ∧ castsFifteens 24040 = true := by decide

/-- 5de9: nibbles fold back to 24041; digit sum 41 ≡ 24041 (mod 15). -/
theorem enumeration_hex4_5de9 : reassembles 24041 = true ∧ castsFifteens 24041 = true := by decide

/-- 5dea: nibbles fold back to 24042; digit sum 42 ≡ 24042 (mod 15). -/
theorem enumeration_hex4_5dea : reassembles 24042 = true ∧ castsFifteens 24042 = true := by decide

/-- 5deb: nibbles fold back to 24043; digit sum 43 ≡ 24043 (mod 15). -/
theorem enumeration_hex4_5deb : reassembles 24043 = true ∧ castsFifteens 24043 = true := by decide

/-- 5dec: nibbles fold back to 24044; digit sum 44 ≡ 24044 (mod 15). -/
theorem enumeration_hex4_5dec : reassembles 24044 = true ∧ castsFifteens 24044 = true := by decide

/-- 5ded: nibbles fold back to 24045; digit sum 45 ≡ 24045 (mod 15). -/
theorem enumeration_hex4_5ded : reassembles 24045 = true ∧ castsFifteens 24045 = true := by decide

/-- 5dee: nibbles fold back to 24046; digit sum 46 ≡ 24046 (mod 15). -/
theorem enumeration_hex4_5dee : reassembles 24046 = true ∧ castsFifteens 24046 = true := by decide

/-- 5def: nibbles fold back to 24047; digit sum 47 ≡ 24047 (mod 15). -/
theorem enumeration_hex4_5def : reassembles 24047 = true ∧ castsFifteens 24047 = true := by decide

/-- 5df0: nibbles fold back to 24048; digit sum 33 ≡ 24048 (mod 15). -/
theorem enumeration_hex4_5df0 : reassembles 24048 = true ∧ castsFifteens 24048 = true := by decide

/-- 5df1: nibbles fold back to 24049; digit sum 34 ≡ 24049 (mod 15). -/
theorem enumeration_hex4_5df1 : reassembles 24049 = true ∧ castsFifteens 24049 = true := by decide

/-- 5df2: nibbles fold back to 24050; digit sum 35 ≡ 24050 (mod 15). -/
theorem enumeration_hex4_5df2 : reassembles 24050 = true ∧ castsFifteens 24050 = true := by decide

/-- 5df3: nibbles fold back to 24051; digit sum 36 ≡ 24051 (mod 15). -/
theorem enumeration_hex4_5df3 : reassembles 24051 = true ∧ castsFifteens 24051 = true := by decide

/-- 5df4: nibbles fold back to 24052; digit sum 37 ≡ 24052 (mod 15). -/
theorem enumeration_hex4_5df4 : reassembles 24052 = true ∧ castsFifteens 24052 = true := by decide

/-- 5df5: nibbles fold back to 24053; digit sum 38 ≡ 24053 (mod 15). -/
theorem enumeration_hex4_5df5 : reassembles 24053 = true ∧ castsFifteens 24053 = true := by decide

/-- 5df6: nibbles fold back to 24054; digit sum 39 ≡ 24054 (mod 15). -/
theorem enumeration_hex4_5df6 : reassembles 24054 = true ∧ castsFifteens 24054 = true := by decide

/-- 5df7: nibbles fold back to 24055; digit sum 40 ≡ 24055 (mod 15). -/
theorem enumeration_hex4_5df7 : reassembles 24055 = true ∧ castsFifteens 24055 = true := by decide

/-- 5df8: nibbles fold back to 24056; digit sum 41 ≡ 24056 (mod 15). -/
theorem enumeration_hex4_5df8 : reassembles 24056 = true ∧ castsFifteens 24056 = true := by decide

/-- 5df9: nibbles fold back to 24057; digit sum 42 ≡ 24057 (mod 15). -/
theorem enumeration_hex4_5df9 : reassembles 24057 = true ∧ castsFifteens 24057 = true := by decide

/-- 5dfa: nibbles fold back to 24058; digit sum 43 ≡ 24058 (mod 15). -/
theorem enumeration_hex4_5dfa : reassembles 24058 = true ∧ castsFifteens 24058 = true := by decide

/-- 5dfb: nibbles fold back to 24059; digit sum 44 ≡ 24059 (mod 15). -/
theorem enumeration_hex4_5dfb : reassembles 24059 = true ∧ castsFifteens 24059 = true := by decide

/-- 5dfc: nibbles fold back to 24060; digit sum 45 ≡ 24060 (mod 15). -/
theorem enumeration_hex4_5dfc : reassembles 24060 = true ∧ castsFifteens 24060 = true := by decide

/-- 5dfd: nibbles fold back to 24061; digit sum 46 ≡ 24061 (mod 15). -/
theorem enumeration_hex4_5dfd : reassembles 24061 = true ∧ castsFifteens 24061 = true := by decide

/-- 5dfe: nibbles fold back to 24062; digit sum 47 ≡ 24062 (mod 15). -/
theorem enumeration_hex4_5dfe : reassembles 24062 = true ∧ castsFifteens 24062 = true := by decide

/-- 5dff: nibbles fold back to 24063; digit sum 48 ≡ 24063 (mod 15). -/
theorem enumeration_hex4_5dff : reassembles 24063 = true ∧ castsFifteens 24063 = true := by decide

/-- 5e00: nibbles fold back to 24064; digit sum 19 ≡ 24064 (mod 15). -/
theorem enumeration_hex4_5e00 : reassembles 24064 = true ∧ castsFifteens 24064 = true := by decide

/-- 5e01: nibbles fold back to 24065; digit sum 20 ≡ 24065 (mod 15). -/
theorem enumeration_hex4_5e01 : reassembles 24065 = true ∧ castsFifteens 24065 = true := by decide

/-- 5e02: nibbles fold back to 24066; digit sum 21 ≡ 24066 (mod 15). -/
theorem enumeration_hex4_5e02 : reassembles 24066 = true ∧ castsFifteens 24066 = true := by decide

/-- 5e03: nibbles fold back to 24067; digit sum 22 ≡ 24067 (mod 15). -/
theorem enumeration_hex4_5e03 : reassembles 24067 = true ∧ castsFifteens 24067 = true := by decide

/-- 5e04: nibbles fold back to 24068; digit sum 23 ≡ 24068 (mod 15). -/
theorem enumeration_hex4_5e04 : reassembles 24068 = true ∧ castsFifteens 24068 = true := by decide

/-- 5e05: nibbles fold back to 24069; digit sum 24 ≡ 24069 (mod 15). -/
theorem enumeration_hex4_5e05 : reassembles 24069 = true ∧ castsFifteens 24069 = true := by decide

/-- 5e06: nibbles fold back to 24070; digit sum 25 ≡ 24070 (mod 15). -/
theorem enumeration_hex4_5e06 : reassembles 24070 = true ∧ castsFifteens 24070 = true := by decide

/-- 5e07: nibbles fold back to 24071; digit sum 26 ≡ 24071 (mod 15). -/
theorem enumeration_hex4_5e07 : reassembles 24071 = true ∧ castsFifteens 24071 = true := by decide

/-- 5e08: nibbles fold back to 24072; digit sum 27 ≡ 24072 (mod 15). -/
theorem enumeration_hex4_5e08 : reassembles 24072 = true ∧ castsFifteens 24072 = true := by decide

/-- 5e09: nibbles fold back to 24073; digit sum 28 ≡ 24073 (mod 15). -/
theorem enumeration_hex4_5e09 : reassembles 24073 = true ∧ castsFifteens 24073 = true := by decide

/-- 5e0a: nibbles fold back to 24074; digit sum 29 ≡ 24074 (mod 15). -/
theorem enumeration_hex4_5e0a : reassembles 24074 = true ∧ castsFifteens 24074 = true := by decide

/-- 5e0b: nibbles fold back to 24075; digit sum 30 ≡ 24075 (mod 15). -/
theorem enumeration_hex4_5e0b : reassembles 24075 = true ∧ castsFifteens 24075 = true := by decide

/-- 5e0c: nibbles fold back to 24076; digit sum 31 ≡ 24076 (mod 15). -/
theorem enumeration_hex4_5e0c : reassembles 24076 = true ∧ castsFifteens 24076 = true := by decide

/-- 5e0d: nibbles fold back to 24077; digit sum 32 ≡ 24077 (mod 15). -/
theorem enumeration_hex4_5e0d : reassembles 24077 = true ∧ castsFifteens 24077 = true := by decide

/-- 5e0e: nibbles fold back to 24078; digit sum 33 ≡ 24078 (mod 15). -/
theorem enumeration_hex4_5e0e : reassembles 24078 = true ∧ castsFifteens 24078 = true := by decide

/-- 5e0f: nibbles fold back to 24079; digit sum 34 ≡ 24079 (mod 15). -/
theorem enumeration_hex4_5e0f : reassembles 24079 = true ∧ castsFifteens 24079 = true := by decide

/-- 5e10: nibbles fold back to 24080; digit sum 20 ≡ 24080 (mod 15). -/
theorem enumeration_hex4_5e10 : reassembles 24080 = true ∧ castsFifteens 24080 = true := by decide

/-- 5e11: nibbles fold back to 24081; digit sum 21 ≡ 24081 (mod 15). -/
theorem enumeration_hex4_5e11 : reassembles 24081 = true ∧ castsFifteens 24081 = true := by decide

/-- 5e12: nibbles fold back to 24082; digit sum 22 ≡ 24082 (mod 15). -/
theorem enumeration_hex4_5e12 : reassembles 24082 = true ∧ castsFifteens 24082 = true := by decide

/-- 5e13: nibbles fold back to 24083; digit sum 23 ≡ 24083 (mod 15). -/
theorem enumeration_hex4_5e13 : reassembles 24083 = true ∧ castsFifteens 24083 = true := by decide

/-- 5e14: nibbles fold back to 24084; digit sum 24 ≡ 24084 (mod 15). -/
theorem enumeration_hex4_5e14 : reassembles 24084 = true ∧ castsFifteens 24084 = true := by decide

/-- 5e15: nibbles fold back to 24085; digit sum 25 ≡ 24085 (mod 15). -/
theorem enumeration_hex4_5e15 : reassembles 24085 = true ∧ castsFifteens 24085 = true := by decide

/-- 5e16: nibbles fold back to 24086; digit sum 26 ≡ 24086 (mod 15). -/
theorem enumeration_hex4_5e16 : reassembles 24086 = true ∧ castsFifteens 24086 = true := by decide

/-- 5e17: nibbles fold back to 24087; digit sum 27 ≡ 24087 (mod 15). -/
theorem enumeration_hex4_5e17 : reassembles 24087 = true ∧ castsFifteens 24087 = true := by decide

/-- 5e18: nibbles fold back to 24088; digit sum 28 ≡ 24088 (mod 15). -/
theorem enumeration_hex4_5e18 : reassembles 24088 = true ∧ castsFifteens 24088 = true := by decide

/-- 5e19: nibbles fold back to 24089; digit sum 29 ≡ 24089 (mod 15). -/
theorem enumeration_hex4_5e19 : reassembles 24089 = true ∧ castsFifteens 24089 = true := by decide

/-- 5e1a: nibbles fold back to 24090; digit sum 30 ≡ 24090 (mod 15). -/
theorem enumeration_hex4_5e1a : reassembles 24090 = true ∧ castsFifteens 24090 = true := by decide

/-- 5e1b: nibbles fold back to 24091; digit sum 31 ≡ 24091 (mod 15). -/
theorem enumeration_hex4_5e1b : reassembles 24091 = true ∧ castsFifteens 24091 = true := by decide

/-- 5e1c: nibbles fold back to 24092; digit sum 32 ≡ 24092 (mod 15). -/
theorem enumeration_hex4_5e1c : reassembles 24092 = true ∧ castsFifteens 24092 = true := by decide

/-- 5e1d: nibbles fold back to 24093; digit sum 33 ≡ 24093 (mod 15). -/
theorem enumeration_hex4_5e1d : reassembles 24093 = true ∧ castsFifteens 24093 = true := by decide

/-- 5e1e: nibbles fold back to 24094; digit sum 34 ≡ 24094 (mod 15). -/
theorem enumeration_hex4_5e1e : reassembles 24094 = true ∧ castsFifteens 24094 = true := by decide

/-- 5e1f: nibbles fold back to 24095; digit sum 35 ≡ 24095 (mod 15). -/
theorem enumeration_hex4_5e1f : reassembles 24095 = true ∧ castsFifteens 24095 = true := by decide

/-- 5e20: nibbles fold back to 24096; digit sum 21 ≡ 24096 (mod 15). -/
theorem enumeration_hex4_5e20 : reassembles 24096 = true ∧ castsFifteens 24096 = true := by decide

/-- 5e21: nibbles fold back to 24097; digit sum 22 ≡ 24097 (mod 15). -/
theorem enumeration_hex4_5e21 : reassembles 24097 = true ∧ castsFifteens 24097 = true := by decide

/-- 5e22: nibbles fold back to 24098; digit sum 23 ≡ 24098 (mod 15). -/
theorem enumeration_hex4_5e22 : reassembles 24098 = true ∧ castsFifteens 24098 = true := by decide

/-- 5e23: nibbles fold back to 24099; digit sum 24 ≡ 24099 (mod 15). -/
theorem enumeration_hex4_5e23 : reassembles 24099 = true ∧ castsFifteens 24099 = true := by decide

/-- 5e24: nibbles fold back to 24100; digit sum 25 ≡ 24100 (mod 15). -/
theorem enumeration_hex4_5e24 : reassembles 24100 = true ∧ castsFifteens 24100 = true := by decide

/-- 5e25: nibbles fold back to 24101; digit sum 26 ≡ 24101 (mod 15). -/
theorem enumeration_hex4_5e25 : reassembles 24101 = true ∧ castsFifteens 24101 = true := by decide

/-- 5e26: nibbles fold back to 24102; digit sum 27 ≡ 24102 (mod 15). -/
theorem enumeration_hex4_5e26 : reassembles 24102 = true ∧ castsFifteens 24102 = true := by decide

/-- 5e27: nibbles fold back to 24103; digit sum 28 ≡ 24103 (mod 15). -/
theorem enumeration_hex4_5e27 : reassembles 24103 = true ∧ castsFifteens 24103 = true := by decide

/-- 5e28: nibbles fold back to 24104; digit sum 29 ≡ 24104 (mod 15). -/
theorem enumeration_hex4_5e28 : reassembles 24104 = true ∧ castsFifteens 24104 = true := by decide

/-- 5e29: nibbles fold back to 24105; digit sum 30 ≡ 24105 (mod 15). -/
theorem enumeration_hex4_5e29 : reassembles 24105 = true ∧ castsFifteens 24105 = true := by decide

/-- 5e2a: nibbles fold back to 24106; digit sum 31 ≡ 24106 (mod 15). -/
theorem enumeration_hex4_5e2a : reassembles 24106 = true ∧ castsFifteens 24106 = true := by decide

/-- 5e2b: nibbles fold back to 24107; digit sum 32 ≡ 24107 (mod 15). -/
theorem enumeration_hex4_5e2b : reassembles 24107 = true ∧ castsFifteens 24107 = true := by decide

/-- 5e2c: nibbles fold back to 24108; digit sum 33 ≡ 24108 (mod 15). -/
theorem enumeration_hex4_5e2c : reassembles 24108 = true ∧ castsFifteens 24108 = true := by decide

/-- 5e2d: nibbles fold back to 24109; digit sum 34 ≡ 24109 (mod 15). -/
theorem enumeration_hex4_5e2d : reassembles 24109 = true ∧ castsFifteens 24109 = true := by decide

/-- 5e2e: nibbles fold back to 24110; digit sum 35 ≡ 24110 (mod 15). -/
theorem enumeration_hex4_5e2e : reassembles 24110 = true ∧ castsFifteens 24110 = true := by decide

/-- 5e2f: nibbles fold back to 24111; digit sum 36 ≡ 24111 (mod 15). -/
theorem enumeration_hex4_5e2f : reassembles 24111 = true ∧ castsFifteens 24111 = true := by decide

/-- 5e30: nibbles fold back to 24112; digit sum 22 ≡ 24112 (mod 15). -/
theorem enumeration_hex4_5e30 : reassembles 24112 = true ∧ castsFifteens 24112 = true := by decide

/-- 5e31: nibbles fold back to 24113; digit sum 23 ≡ 24113 (mod 15). -/
theorem enumeration_hex4_5e31 : reassembles 24113 = true ∧ castsFifteens 24113 = true := by decide

/-- 5e32: nibbles fold back to 24114; digit sum 24 ≡ 24114 (mod 15). -/
theorem enumeration_hex4_5e32 : reassembles 24114 = true ∧ castsFifteens 24114 = true := by decide

/-- 5e33: nibbles fold back to 24115; digit sum 25 ≡ 24115 (mod 15). -/
theorem enumeration_hex4_5e33 : reassembles 24115 = true ∧ castsFifteens 24115 = true := by decide

/-- 5e34: nibbles fold back to 24116; digit sum 26 ≡ 24116 (mod 15). -/
theorem enumeration_hex4_5e34 : reassembles 24116 = true ∧ castsFifteens 24116 = true := by decide

/-- 5e35: nibbles fold back to 24117; digit sum 27 ≡ 24117 (mod 15). -/
theorem enumeration_hex4_5e35 : reassembles 24117 = true ∧ castsFifteens 24117 = true := by decide

/-- 5e36: nibbles fold back to 24118; digit sum 28 ≡ 24118 (mod 15). -/
theorem enumeration_hex4_5e36 : reassembles 24118 = true ∧ castsFifteens 24118 = true := by decide

/-- 5e37: nibbles fold back to 24119; digit sum 29 ≡ 24119 (mod 15). -/
theorem enumeration_hex4_5e37 : reassembles 24119 = true ∧ castsFifteens 24119 = true := by decide

/-- 5e38: nibbles fold back to 24120; digit sum 30 ≡ 24120 (mod 15). -/
theorem enumeration_hex4_5e38 : reassembles 24120 = true ∧ castsFifteens 24120 = true := by decide

/-- 5e39: nibbles fold back to 24121; digit sum 31 ≡ 24121 (mod 15). -/
theorem enumeration_hex4_5e39 : reassembles 24121 = true ∧ castsFifteens 24121 = true := by decide

/-- 5e3a: nibbles fold back to 24122; digit sum 32 ≡ 24122 (mod 15). -/
theorem enumeration_hex4_5e3a : reassembles 24122 = true ∧ castsFifteens 24122 = true := by decide

/-- 5e3b: nibbles fold back to 24123; digit sum 33 ≡ 24123 (mod 15). -/
theorem enumeration_hex4_5e3b : reassembles 24123 = true ∧ castsFifteens 24123 = true := by decide

/-- 5e3c: nibbles fold back to 24124; digit sum 34 ≡ 24124 (mod 15). -/
theorem enumeration_hex4_5e3c : reassembles 24124 = true ∧ castsFifteens 24124 = true := by decide

/-- 5e3d: nibbles fold back to 24125; digit sum 35 ≡ 24125 (mod 15). -/
theorem enumeration_hex4_5e3d : reassembles 24125 = true ∧ castsFifteens 24125 = true := by decide

/-- 5e3e: nibbles fold back to 24126; digit sum 36 ≡ 24126 (mod 15). -/
theorem enumeration_hex4_5e3e : reassembles 24126 = true ∧ castsFifteens 24126 = true := by decide

/-- 5e3f: nibbles fold back to 24127; digit sum 37 ≡ 24127 (mod 15). -/
theorem enumeration_hex4_5e3f : reassembles 24127 = true ∧ castsFifteens 24127 = true := by decide

/-- 5e40: nibbles fold back to 24128; digit sum 23 ≡ 24128 (mod 15). -/
theorem enumeration_hex4_5e40 : reassembles 24128 = true ∧ castsFifteens 24128 = true := by decide

/-- 5e41: nibbles fold back to 24129; digit sum 24 ≡ 24129 (mod 15). -/
theorem enumeration_hex4_5e41 : reassembles 24129 = true ∧ castsFifteens 24129 = true := by decide

/-- 5e42: nibbles fold back to 24130; digit sum 25 ≡ 24130 (mod 15). -/
theorem enumeration_hex4_5e42 : reassembles 24130 = true ∧ castsFifteens 24130 = true := by decide

/-- 5e43: nibbles fold back to 24131; digit sum 26 ≡ 24131 (mod 15). -/
theorem enumeration_hex4_5e43 : reassembles 24131 = true ∧ castsFifteens 24131 = true := by decide

/-- 5e44: nibbles fold back to 24132; digit sum 27 ≡ 24132 (mod 15). -/
theorem enumeration_hex4_5e44 : reassembles 24132 = true ∧ castsFifteens 24132 = true := by decide

/-- 5e45: nibbles fold back to 24133; digit sum 28 ≡ 24133 (mod 15). -/
theorem enumeration_hex4_5e45 : reassembles 24133 = true ∧ castsFifteens 24133 = true := by decide

/-- 5e46: nibbles fold back to 24134; digit sum 29 ≡ 24134 (mod 15). -/
theorem enumeration_hex4_5e46 : reassembles 24134 = true ∧ castsFifteens 24134 = true := by decide

/-- 5e47: nibbles fold back to 24135; digit sum 30 ≡ 24135 (mod 15). -/
theorem enumeration_hex4_5e47 : reassembles 24135 = true ∧ castsFifteens 24135 = true := by decide

/-- 5e48: nibbles fold back to 24136; digit sum 31 ≡ 24136 (mod 15). -/
theorem enumeration_hex4_5e48 : reassembles 24136 = true ∧ castsFifteens 24136 = true := by decide

/-- 5e49: nibbles fold back to 24137; digit sum 32 ≡ 24137 (mod 15). -/
theorem enumeration_hex4_5e49 : reassembles 24137 = true ∧ castsFifteens 24137 = true := by decide

/-- 5e4a: nibbles fold back to 24138; digit sum 33 ≡ 24138 (mod 15). -/
theorem enumeration_hex4_5e4a : reassembles 24138 = true ∧ castsFifteens 24138 = true := by decide

/-- 5e4b: nibbles fold back to 24139; digit sum 34 ≡ 24139 (mod 15). -/
theorem enumeration_hex4_5e4b : reassembles 24139 = true ∧ castsFifteens 24139 = true := by decide

/-- 5e4c: nibbles fold back to 24140; digit sum 35 ≡ 24140 (mod 15). -/
theorem enumeration_hex4_5e4c : reassembles 24140 = true ∧ castsFifteens 24140 = true := by decide

/-- 5e4d: nibbles fold back to 24141; digit sum 36 ≡ 24141 (mod 15). -/
theorem enumeration_hex4_5e4d : reassembles 24141 = true ∧ castsFifteens 24141 = true := by decide

/-- 5e4e: nibbles fold back to 24142; digit sum 37 ≡ 24142 (mod 15). -/
theorem enumeration_hex4_5e4e : reassembles 24142 = true ∧ castsFifteens 24142 = true := by decide

/-- 5e4f: nibbles fold back to 24143; digit sum 38 ≡ 24143 (mod 15). -/
theorem enumeration_hex4_5e4f : reassembles 24143 = true ∧ castsFifteens 24143 = true := by decide

/-- 5e50: nibbles fold back to 24144; digit sum 24 ≡ 24144 (mod 15). -/
theorem enumeration_hex4_5e50 : reassembles 24144 = true ∧ castsFifteens 24144 = true := by decide

/-- 5e51: nibbles fold back to 24145; digit sum 25 ≡ 24145 (mod 15). -/
theorem enumeration_hex4_5e51 : reassembles 24145 = true ∧ castsFifteens 24145 = true := by decide

/-- 5e52: nibbles fold back to 24146; digit sum 26 ≡ 24146 (mod 15). -/
theorem enumeration_hex4_5e52 : reassembles 24146 = true ∧ castsFifteens 24146 = true := by decide

/-- 5e53: nibbles fold back to 24147; digit sum 27 ≡ 24147 (mod 15). -/
theorem enumeration_hex4_5e53 : reassembles 24147 = true ∧ castsFifteens 24147 = true := by decide

/-- 5e54: nibbles fold back to 24148; digit sum 28 ≡ 24148 (mod 15). -/
theorem enumeration_hex4_5e54 : reassembles 24148 = true ∧ castsFifteens 24148 = true := by decide

/-- 5e55: nibbles fold back to 24149; digit sum 29 ≡ 24149 (mod 15). -/
theorem enumeration_hex4_5e55 : reassembles 24149 = true ∧ castsFifteens 24149 = true := by decide

/-- 5e56: nibbles fold back to 24150; digit sum 30 ≡ 24150 (mod 15). -/
theorem enumeration_hex4_5e56 : reassembles 24150 = true ∧ castsFifteens 24150 = true := by decide

/-- 5e57: nibbles fold back to 24151; digit sum 31 ≡ 24151 (mod 15). -/
theorem enumeration_hex4_5e57 : reassembles 24151 = true ∧ castsFifteens 24151 = true := by decide

/-- 5e58: nibbles fold back to 24152; digit sum 32 ≡ 24152 (mod 15). -/
theorem enumeration_hex4_5e58 : reassembles 24152 = true ∧ castsFifteens 24152 = true := by decide

/-- 5e59: nibbles fold back to 24153; digit sum 33 ≡ 24153 (mod 15). -/
theorem enumeration_hex4_5e59 : reassembles 24153 = true ∧ castsFifteens 24153 = true := by decide

/-- 5e5a: nibbles fold back to 24154; digit sum 34 ≡ 24154 (mod 15). -/
theorem enumeration_hex4_5e5a : reassembles 24154 = true ∧ castsFifteens 24154 = true := by decide

/-- 5e5b: nibbles fold back to 24155; digit sum 35 ≡ 24155 (mod 15). -/
theorem enumeration_hex4_5e5b : reassembles 24155 = true ∧ castsFifteens 24155 = true := by decide

/-- 5e5c: nibbles fold back to 24156; digit sum 36 ≡ 24156 (mod 15). -/
theorem enumeration_hex4_5e5c : reassembles 24156 = true ∧ castsFifteens 24156 = true := by decide

/-- 5e5d: nibbles fold back to 24157; digit sum 37 ≡ 24157 (mod 15). -/
theorem enumeration_hex4_5e5d : reassembles 24157 = true ∧ castsFifteens 24157 = true := by decide

/-- 5e5e: nibbles fold back to 24158; digit sum 38 ≡ 24158 (mod 15). -/
theorem enumeration_hex4_5e5e : reassembles 24158 = true ∧ castsFifteens 24158 = true := by decide

/-- 5e5f: nibbles fold back to 24159; digit sum 39 ≡ 24159 (mod 15). -/
theorem enumeration_hex4_5e5f : reassembles 24159 = true ∧ castsFifteens 24159 = true := by decide

/-- 5e60: nibbles fold back to 24160; digit sum 25 ≡ 24160 (mod 15). -/
theorem enumeration_hex4_5e60 : reassembles 24160 = true ∧ castsFifteens 24160 = true := by decide

/-- 5e61: nibbles fold back to 24161; digit sum 26 ≡ 24161 (mod 15). -/
theorem enumeration_hex4_5e61 : reassembles 24161 = true ∧ castsFifteens 24161 = true := by decide

/-- 5e62: nibbles fold back to 24162; digit sum 27 ≡ 24162 (mod 15). -/
theorem enumeration_hex4_5e62 : reassembles 24162 = true ∧ castsFifteens 24162 = true := by decide

/-- 5e63: nibbles fold back to 24163; digit sum 28 ≡ 24163 (mod 15). -/
theorem enumeration_hex4_5e63 : reassembles 24163 = true ∧ castsFifteens 24163 = true := by decide

/-- 5e64: nibbles fold back to 24164; digit sum 29 ≡ 24164 (mod 15). -/
theorem enumeration_hex4_5e64 : reassembles 24164 = true ∧ castsFifteens 24164 = true := by decide

/-- 5e65: nibbles fold back to 24165; digit sum 30 ≡ 24165 (mod 15). -/
theorem enumeration_hex4_5e65 : reassembles 24165 = true ∧ castsFifteens 24165 = true := by decide

/-- 5e66: nibbles fold back to 24166; digit sum 31 ≡ 24166 (mod 15). -/
theorem enumeration_hex4_5e66 : reassembles 24166 = true ∧ castsFifteens 24166 = true := by decide

/-- 5e67: nibbles fold back to 24167; digit sum 32 ≡ 24167 (mod 15). -/
theorem enumeration_hex4_5e67 : reassembles 24167 = true ∧ castsFifteens 24167 = true := by decide

/-- 5e68: nibbles fold back to 24168; digit sum 33 ≡ 24168 (mod 15). -/
theorem enumeration_hex4_5e68 : reassembles 24168 = true ∧ castsFifteens 24168 = true := by decide

/-- 5e69: nibbles fold back to 24169; digit sum 34 ≡ 24169 (mod 15). -/
theorem enumeration_hex4_5e69 : reassembles 24169 = true ∧ castsFifteens 24169 = true := by decide

/-- 5e6a: nibbles fold back to 24170; digit sum 35 ≡ 24170 (mod 15). -/
theorem enumeration_hex4_5e6a : reassembles 24170 = true ∧ castsFifteens 24170 = true := by decide

/-- 5e6b: nibbles fold back to 24171; digit sum 36 ≡ 24171 (mod 15). -/
theorem enumeration_hex4_5e6b : reassembles 24171 = true ∧ castsFifteens 24171 = true := by decide

/-- 5e6c: nibbles fold back to 24172; digit sum 37 ≡ 24172 (mod 15). -/
theorem enumeration_hex4_5e6c : reassembles 24172 = true ∧ castsFifteens 24172 = true := by decide

/-- 5e6d: nibbles fold back to 24173; digit sum 38 ≡ 24173 (mod 15). -/
theorem enumeration_hex4_5e6d : reassembles 24173 = true ∧ castsFifteens 24173 = true := by decide

/-- 5e6e: nibbles fold back to 24174; digit sum 39 ≡ 24174 (mod 15). -/
theorem enumeration_hex4_5e6e : reassembles 24174 = true ∧ castsFifteens 24174 = true := by decide

/-- 5e6f: nibbles fold back to 24175; digit sum 40 ≡ 24175 (mod 15). -/
theorem enumeration_hex4_5e6f : reassembles 24175 = true ∧ castsFifteens 24175 = true := by decide

/-- 5e70: nibbles fold back to 24176; digit sum 26 ≡ 24176 (mod 15). -/
theorem enumeration_hex4_5e70 : reassembles 24176 = true ∧ castsFifteens 24176 = true := by decide

/-- 5e71: nibbles fold back to 24177; digit sum 27 ≡ 24177 (mod 15). -/
theorem enumeration_hex4_5e71 : reassembles 24177 = true ∧ castsFifteens 24177 = true := by decide

/-- 5e72: nibbles fold back to 24178; digit sum 28 ≡ 24178 (mod 15). -/
theorem enumeration_hex4_5e72 : reassembles 24178 = true ∧ castsFifteens 24178 = true := by decide

/-- 5e73: nibbles fold back to 24179; digit sum 29 ≡ 24179 (mod 15). -/
theorem enumeration_hex4_5e73 : reassembles 24179 = true ∧ castsFifteens 24179 = true := by decide

/-- 5e74: nibbles fold back to 24180; digit sum 30 ≡ 24180 (mod 15). -/
theorem enumeration_hex4_5e74 : reassembles 24180 = true ∧ castsFifteens 24180 = true := by decide

/-- 5e75: nibbles fold back to 24181; digit sum 31 ≡ 24181 (mod 15). -/
theorem enumeration_hex4_5e75 : reassembles 24181 = true ∧ castsFifteens 24181 = true := by decide

/-- 5e76: nibbles fold back to 24182; digit sum 32 ≡ 24182 (mod 15). -/
theorem enumeration_hex4_5e76 : reassembles 24182 = true ∧ castsFifteens 24182 = true := by decide

/-- 5e77: nibbles fold back to 24183; digit sum 33 ≡ 24183 (mod 15). -/
theorem enumeration_hex4_5e77 : reassembles 24183 = true ∧ castsFifteens 24183 = true := by decide

/-- 5e78: nibbles fold back to 24184; digit sum 34 ≡ 24184 (mod 15). -/
theorem enumeration_hex4_5e78 : reassembles 24184 = true ∧ castsFifteens 24184 = true := by decide

/-- 5e79: nibbles fold back to 24185; digit sum 35 ≡ 24185 (mod 15). -/
theorem enumeration_hex4_5e79 : reassembles 24185 = true ∧ castsFifteens 24185 = true := by decide

/-- 5e7a: nibbles fold back to 24186; digit sum 36 ≡ 24186 (mod 15). -/
theorem enumeration_hex4_5e7a : reassembles 24186 = true ∧ castsFifteens 24186 = true := by decide

/-- 5e7b: nibbles fold back to 24187; digit sum 37 ≡ 24187 (mod 15). -/
theorem enumeration_hex4_5e7b : reassembles 24187 = true ∧ castsFifteens 24187 = true := by decide

/-- 5e7c: nibbles fold back to 24188; digit sum 38 ≡ 24188 (mod 15). -/
theorem enumeration_hex4_5e7c : reassembles 24188 = true ∧ castsFifteens 24188 = true := by decide

/-- 5e7d: nibbles fold back to 24189; digit sum 39 ≡ 24189 (mod 15). -/
theorem enumeration_hex4_5e7d : reassembles 24189 = true ∧ castsFifteens 24189 = true := by decide

/-- 5e7e: nibbles fold back to 24190; digit sum 40 ≡ 24190 (mod 15). -/
theorem enumeration_hex4_5e7e : reassembles 24190 = true ∧ castsFifteens 24190 = true := by decide

/-- 5e7f: nibbles fold back to 24191; digit sum 41 ≡ 24191 (mod 15). -/
theorem enumeration_hex4_5e7f : reassembles 24191 = true ∧ castsFifteens 24191 = true := by decide

/-- 5e80: nibbles fold back to 24192; digit sum 27 ≡ 24192 (mod 15). -/
theorem enumeration_hex4_5e80 : reassembles 24192 = true ∧ castsFifteens 24192 = true := by decide

/-- 5e81: nibbles fold back to 24193; digit sum 28 ≡ 24193 (mod 15). -/
theorem enumeration_hex4_5e81 : reassembles 24193 = true ∧ castsFifteens 24193 = true := by decide

/-- 5e82: nibbles fold back to 24194; digit sum 29 ≡ 24194 (mod 15). -/
theorem enumeration_hex4_5e82 : reassembles 24194 = true ∧ castsFifteens 24194 = true := by decide

/-- 5e83: nibbles fold back to 24195; digit sum 30 ≡ 24195 (mod 15). -/
theorem enumeration_hex4_5e83 : reassembles 24195 = true ∧ castsFifteens 24195 = true := by decide

/-- 5e84: nibbles fold back to 24196; digit sum 31 ≡ 24196 (mod 15). -/
theorem enumeration_hex4_5e84 : reassembles 24196 = true ∧ castsFifteens 24196 = true := by decide

/-- 5e85: nibbles fold back to 24197; digit sum 32 ≡ 24197 (mod 15). -/
theorem enumeration_hex4_5e85 : reassembles 24197 = true ∧ castsFifteens 24197 = true := by decide

/-- 5e86: nibbles fold back to 24198; digit sum 33 ≡ 24198 (mod 15). -/
theorem enumeration_hex4_5e86 : reassembles 24198 = true ∧ castsFifteens 24198 = true := by decide

/-- 5e87: nibbles fold back to 24199; digit sum 34 ≡ 24199 (mod 15). -/
theorem enumeration_hex4_5e87 : reassembles 24199 = true ∧ castsFifteens 24199 = true := by decide

/-- 5e88: nibbles fold back to 24200; digit sum 35 ≡ 24200 (mod 15). -/
theorem enumeration_hex4_5e88 : reassembles 24200 = true ∧ castsFifteens 24200 = true := by decide

/-- 5e89: nibbles fold back to 24201; digit sum 36 ≡ 24201 (mod 15). -/
theorem enumeration_hex4_5e89 : reassembles 24201 = true ∧ castsFifteens 24201 = true := by decide

/-- 5e8a: nibbles fold back to 24202; digit sum 37 ≡ 24202 (mod 15). -/
theorem enumeration_hex4_5e8a : reassembles 24202 = true ∧ castsFifteens 24202 = true := by decide

/-- 5e8b: nibbles fold back to 24203; digit sum 38 ≡ 24203 (mod 15). -/
theorem enumeration_hex4_5e8b : reassembles 24203 = true ∧ castsFifteens 24203 = true := by decide

/-- 5e8c: nibbles fold back to 24204; digit sum 39 ≡ 24204 (mod 15). -/
theorem enumeration_hex4_5e8c : reassembles 24204 = true ∧ castsFifteens 24204 = true := by decide

/-- 5e8d: nibbles fold back to 24205; digit sum 40 ≡ 24205 (mod 15). -/
theorem enumeration_hex4_5e8d : reassembles 24205 = true ∧ castsFifteens 24205 = true := by decide

/-- 5e8e: nibbles fold back to 24206; digit sum 41 ≡ 24206 (mod 15). -/
theorem enumeration_hex4_5e8e : reassembles 24206 = true ∧ castsFifteens 24206 = true := by decide

/-- 5e8f: nibbles fold back to 24207; digit sum 42 ≡ 24207 (mod 15). -/
theorem enumeration_hex4_5e8f : reassembles 24207 = true ∧ castsFifteens 24207 = true := by decide

/-- 5e90: nibbles fold back to 24208; digit sum 28 ≡ 24208 (mod 15). -/
theorem enumeration_hex4_5e90 : reassembles 24208 = true ∧ castsFifteens 24208 = true := by decide

/-- 5e91: nibbles fold back to 24209; digit sum 29 ≡ 24209 (mod 15). -/
theorem enumeration_hex4_5e91 : reassembles 24209 = true ∧ castsFifteens 24209 = true := by decide

/-- 5e92: nibbles fold back to 24210; digit sum 30 ≡ 24210 (mod 15). -/
theorem enumeration_hex4_5e92 : reassembles 24210 = true ∧ castsFifteens 24210 = true := by decide

/-- 5e93: nibbles fold back to 24211; digit sum 31 ≡ 24211 (mod 15). -/
theorem enumeration_hex4_5e93 : reassembles 24211 = true ∧ castsFifteens 24211 = true := by decide

/-- 5e94: nibbles fold back to 24212; digit sum 32 ≡ 24212 (mod 15). -/
theorem enumeration_hex4_5e94 : reassembles 24212 = true ∧ castsFifteens 24212 = true := by decide

/-- 5e95: nibbles fold back to 24213; digit sum 33 ≡ 24213 (mod 15). -/
theorem enumeration_hex4_5e95 : reassembles 24213 = true ∧ castsFifteens 24213 = true := by decide

/-- 5e96: nibbles fold back to 24214; digit sum 34 ≡ 24214 (mod 15). -/
theorem enumeration_hex4_5e96 : reassembles 24214 = true ∧ castsFifteens 24214 = true := by decide

/-- 5e97: nibbles fold back to 24215; digit sum 35 ≡ 24215 (mod 15). -/
theorem enumeration_hex4_5e97 : reassembles 24215 = true ∧ castsFifteens 24215 = true := by decide

/-- 5e98: nibbles fold back to 24216; digit sum 36 ≡ 24216 (mod 15). -/
theorem enumeration_hex4_5e98 : reassembles 24216 = true ∧ castsFifteens 24216 = true := by decide

/-- 5e99: nibbles fold back to 24217; digit sum 37 ≡ 24217 (mod 15). -/
theorem enumeration_hex4_5e99 : reassembles 24217 = true ∧ castsFifteens 24217 = true := by decide

/-- 5e9a: nibbles fold back to 24218; digit sum 38 ≡ 24218 (mod 15). -/
theorem enumeration_hex4_5e9a : reassembles 24218 = true ∧ castsFifteens 24218 = true := by decide

/-- 5e9b: nibbles fold back to 24219; digit sum 39 ≡ 24219 (mod 15). -/
theorem enumeration_hex4_5e9b : reassembles 24219 = true ∧ castsFifteens 24219 = true := by decide

/-- 5e9c: nibbles fold back to 24220; digit sum 40 ≡ 24220 (mod 15). -/
theorem enumeration_hex4_5e9c : reassembles 24220 = true ∧ castsFifteens 24220 = true := by decide

/-- 5e9d: nibbles fold back to 24221; digit sum 41 ≡ 24221 (mod 15). -/
theorem enumeration_hex4_5e9d : reassembles 24221 = true ∧ castsFifteens 24221 = true := by decide

/-- 5e9e: nibbles fold back to 24222; digit sum 42 ≡ 24222 (mod 15). -/
theorem enumeration_hex4_5e9e : reassembles 24222 = true ∧ castsFifteens 24222 = true := by decide

/-- 5e9f: nibbles fold back to 24223; digit sum 43 ≡ 24223 (mod 15). -/
theorem enumeration_hex4_5e9f : reassembles 24223 = true ∧ castsFifteens 24223 = true := by decide

/-- 5ea0: nibbles fold back to 24224; digit sum 29 ≡ 24224 (mod 15). -/
theorem enumeration_hex4_5ea0 : reassembles 24224 = true ∧ castsFifteens 24224 = true := by decide

/-- 5ea1: nibbles fold back to 24225; digit sum 30 ≡ 24225 (mod 15). -/
theorem enumeration_hex4_5ea1 : reassembles 24225 = true ∧ castsFifteens 24225 = true := by decide

/-- 5ea2: nibbles fold back to 24226; digit sum 31 ≡ 24226 (mod 15). -/
theorem enumeration_hex4_5ea2 : reassembles 24226 = true ∧ castsFifteens 24226 = true := by decide

/-- 5ea3: nibbles fold back to 24227; digit sum 32 ≡ 24227 (mod 15). -/
theorem enumeration_hex4_5ea3 : reassembles 24227 = true ∧ castsFifteens 24227 = true := by decide

/-- 5ea4: nibbles fold back to 24228; digit sum 33 ≡ 24228 (mod 15). -/
theorem enumeration_hex4_5ea4 : reassembles 24228 = true ∧ castsFifteens 24228 = true := by decide

/-- 5ea5: nibbles fold back to 24229; digit sum 34 ≡ 24229 (mod 15). -/
theorem enumeration_hex4_5ea5 : reassembles 24229 = true ∧ castsFifteens 24229 = true := by decide

/-- 5ea6: nibbles fold back to 24230; digit sum 35 ≡ 24230 (mod 15). -/
theorem enumeration_hex4_5ea6 : reassembles 24230 = true ∧ castsFifteens 24230 = true := by decide

/-- 5ea7: nibbles fold back to 24231; digit sum 36 ≡ 24231 (mod 15). -/
theorem enumeration_hex4_5ea7 : reassembles 24231 = true ∧ castsFifteens 24231 = true := by decide

/-- 5ea8: nibbles fold back to 24232; digit sum 37 ≡ 24232 (mod 15). -/
theorem enumeration_hex4_5ea8 : reassembles 24232 = true ∧ castsFifteens 24232 = true := by decide

/-- 5ea9: nibbles fold back to 24233; digit sum 38 ≡ 24233 (mod 15). -/
theorem enumeration_hex4_5ea9 : reassembles 24233 = true ∧ castsFifteens 24233 = true := by decide

/-- 5eaa: nibbles fold back to 24234; digit sum 39 ≡ 24234 (mod 15). -/
theorem enumeration_hex4_5eaa : reassembles 24234 = true ∧ castsFifteens 24234 = true := by decide

/-- 5eab: nibbles fold back to 24235; digit sum 40 ≡ 24235 (mod 15). -/
theorem enumeration_hex4_5eab : reassembles 24235 = true ∧ castsFifteens 24235 = true := by decide

/-- 5eac: nibbles fold back to 24236; digit sum 41 ≡ 24236 (mod 15). -/
theorem enumeration_hex4_5eac : reassembles 24236 = true ∧ castsFifteens 24236 = true := by decide

/-- 5ead: nibbles fold back to 24237; digit sum 42 ≡ 24237 (mod 15). -/
theorem enumeration_hex4_5ead : reassembles 24237 = true ∧ castsFifteens 24237 = true := by decide

/-- 5eae: nibbles fold back to 24238; digit sum 43 ≡ 24238 (mod 15). -/
theorem enumeration_hex4_5eae : reassembles 24238 = true ∧ castsFifteens 24238 = true := by decide

/-- 5eaf: nibbles fold back to 24239; digit sum 44 ≡ 24239 (mod 15). -/
theorem enumeration_hex4_5eaf : reassembles 24239 = true ∧ castsFifteens 24239 = true := by decide

/-- 5eb0: nibbles fold back to 24240; digit sum 30 ≡ 24240 (mod 15). -/
theorem enumeration_hex4_5eb0 : reassembles 24240 = true ∧ castsFifteens 24240 = true := by decide

/-- 5eb1: nibbles fold back to 24241; digit sum 31 ≡ 24241 (mod 15). -/
theorem enumeration_hex4_5eb1 : reassembles 24241 = true ∧ castsFifteens 24241 = true := by decide

/-- 5eb2: nibbles fold back to 24242; digit sum 32 ≡ 24242 (mod 15). -/
theorem enumeration_hex4_5eb2 : reassembles 24242 = true ∧ castsFifteens 24242 = true := by decide

/-- 5eb3: nibbles fold back to 24243; digit sum 33 ≡ 24243 (mod 15). -/
theorem enumeration_hex4_5eb3 : reassembles 24243 = true ∧ castsFifteens 24243 = true := by decide

/-- 5eb4: nibbles fold back to 24244; digit sum 34 ≡ 24244 (mod 15). -/
theorem enumeration_hex4_5eb4 : reassembles 24244 = true ∧ castsFifteens 24244 = true := by decide

/-- 5eb5: nibbles fold back to 24245; digit sum 35 ≡ 24245 (mod 15). -/
theorem enumeration_hex4_5eb5 : reassembles 24245 = true ∧ castsFifteens 24245 = true := by decide

/-- 5eb6: nibbles fold back to 24246; digit sum 36 ≡ 24246 (mod 15). -/
theorem enumeration_hex4_5eb6 : reassembles 24246 = true ∧ castsFifteens 24246 = true := by decide

/-- 5eb7: nibbles fold back to 24247; digit sum 37 ≡ 24247 (mod 15). -/
theorem enumeration_hex4_5eb7 : reassembles 24247 = true ∧ castsFifteens 24247 = true := by decide

/-- 5eb8: nibbles fold back to 24248; digit sum 38 ≡ 24248 (mod 15). -/
theorem enumeration_hex4_5eb8 : reassembles 24248 = true ∧ castsFifteens 24248 = true := by decide

/-- 5eb9: nibbles fold back to 24249; digit sum 39 ≡ 24249 (mod 15). -/
theorem enumeration_hex4_5eb9 : reassembles 24249 = true ∧ castsFifteens 24249 = true := by decide

/-- 5eba: nibbles fold back to 24250; digit sum 40 ≡ 24250 (mod 15). -/
theorem enumeration_hex4_5eba : reassembles 24250 = true ∧ castsFifteens 24250 = true := by decide

/-- 5ebb: nibbles fold back to 24251; digit sum 41 ≡ 24251 (mod 15). -/
theorem enumeration_hex4_5ebb : reassembles 24251 = true ∧ castsFifteens 24251 = true := by decide

/-- 5ebc: nibbles fold back to 24252; digit sum 42 ≡ 24252 (mod 15). -/
theorem enumeration_hex4_5ebc : reassembles 24252 = true ∧ castsFifteens 24252 = true := by decide

/-- 5ebd: nibbles fold back to 24253; digit sum 43 ≡ 24253 (mod 15). -/
theorem enumeration_hex4_5ebd : reassembles 24253 = true ∧ castsFifteens 24253 = true := by decide

/-- 5ebe: nibbles fold back to 24254; digit sum 44 ≡ 24254 (mod 15). -/
theorem enumeration_hex4_5ebe : reassembles 24254 = true ∧ castsFifteens 24254 = true := by decide

/-- 5ebf: nibbles fold back to 24255; digit sum 45 ≡ 24255 (mod 15). -/
theorem enumeration_hex4_5ebf : reassembles 24255 = true ∧ castsFifteens 24255 = true := by decide

/-- 5ec0: nibbles fold back to 24256; digit sum 31 ≡ 24256 (mod 15). -/
theorem enumeration_hex4_5ec0 : reassembles 24256 = true ∧ castsFifteens 24256 = true := by decide

/-- 5ec1: nibbles fold back to 24257; digit sum 32 ≡ 24257 (mod 15). -/
theorem enumeration_hex4_5ec1 : reassembles 24257 = true ∧ castsFifteens 24257 = true := by decide

/-- 5ec2: nibbles fold back to 24258; digit sum 33 ≡ 24258 (mod 15). -/
theorem enumeration_hex4_5ec2 : reassembles 24258 = true ∧ castsFifteens 24258 = true := by decide

/-- 5ec3: nibbles fold back to 24259; digit sum 34 ≡ 24259 (mod 15). -/
theorem enumeration_hex4_5ec3 : reassembles 24259 = true ∧ castsFifteens 24259 = true := by decide

/-- 5ec4: nibbles fold back to 24260; digit sum 35 ≡ 24260 (mod 15). -/
theorem enumeration_hex4_5ec4 : reassembles 24260 = true ∧ castsFifteens 24260 = true := by decide

/-- 5ec5: nibbles fold back to 24261; digit sum 36 ≡ 24261 (mod 15). -/
theorem enumeration_hex4_5ec5 : reassembles 24261 = true ∧ castsFifteens 24261 = true := by decide

/-- 5ec6: nibbles fold back to 24262; digit sum 37 ≡ 24262 (mod 15). -/
theorem enumeration_hex4_5ec6 : reassembles 24262 = true ∧ castsFifteens 24262 = true := by decide

/-- 5ec7: nibbles fold back to 24263; digit sum 38 ≡ 24263 (mod 15). -/
theorem enumeration_hex4_5ec7 : reassembles 24263 = true ∧ castsFifteens 24263 = true := by decide

/-- 5ec8: nibbles fold back to 24264; digit sum 39 ≡ 24264 (mod 15). -/
theorem enumeration_hex4_5ec8 : reassembles 24264 = true ∧ castsFifteens 24264 = true := by decide

/-- 5ec9: nibbles fold back to 24265; digit sum 40 ≡ 24265 (mod 15). -/
theorem enumeration_hex4_5ec9 : reassembles 24265 = true ∧ castsFifteens 24265 = true := by decide

/-- 5eca: nibbles fold back to 24266; digit sum 41 ≡ 24266 (mod 15). -/
theorem enumeration_hex4_5eca : reassembles 24266 = true ∧ castsFifteens 24266 = true := by decide

/-- 5ecb: nibbles fold back to 24267; digit sum 42 ≡ 24267 (mod 15). -/
theorem enumeration_hex4_5ecb : reassembles 24267 = true ∧ castsFifteens 24267 = true := by decide

/-- 5ecc: nibbles fold back to 24268; digit sum 43 ≡ 24268 (mod 15). -/
theorem enumeration_hex4_5ecc : reassembles 24268 = true ∧ castsFifteens 24268 = true := by decide

/-- 5ecd: nibbles fold back to 24269; digit sum 44 ≡ 24269 (mod 15). -/
theorem enumeration_hex4_5ecd : reassembles 24269 = true ∧ castsFifteens 24269 = true := by decide

/-- 5ece: nibbles fold back to 24270; digit sum 45 ≡ 24270 (mod 15). -/
theorem enumeration_hex4_5ece : reassembles 24270 = true ∧ castsFifteens 24270 = true := by decide

/-- 5ecf: nibbles fold back to 24271; digit sum 46 ≡ 24271 (mod 15). -/
theorem enumeration_hex4_5ecf : reassembles 24271 = true ∧ castsFifteens 24271 = true := by decide

/-- 5ed0: nibbles fold back to 24272; digit sum 32 ≡ 24272 (mod 15). -/
theorem enumeration_hex4_5ed0 : reassembles 24272 = true ∧ castsFifteens 24272 = true := by decide

/-- 5ed1: nibbles fold back to 24273; digit sum 33 ≡ 24273 (mod 15). -/
theorem enumeration_hex4_5ed1 : reassembles 24273 = true ∧ castsFifteens 24273 = true := by decide

/-- 5ed2: nibbles fold back to 24274; digit sum 34 ≡ 24274 (mod 15). -/
theorem enumeration_hex4_5ed2 : reassembles 24274 = true ∧ castsFifteens 24274 = true := by decide

/-- 5ed3: nibbles fold back to 24275; digit sum 35 ≡ 24275 (mod 15). -/
theorem enumeration_hex4_5ed3 : reassembles 24275 = true ∧ castsFifteens 24275 = true := by decide

/-- 5ed4: nibbles fold back to 24276; digit sum 36 ≡ 24276 (mod 15). -/
theorem enumeration_hex4_5ed4 : reassembles 24276 = true ∧ castsFifteens 24276 = true := by decide

/-- 5ed5: nibbles fold back to 24277; digit sum 37 ≡ 24277 (mod 15). -/
theorem enumeration_hex4_5ed5 : reassembles 24277 = true ∧ castsFifteens 24277 = true := by decide

/-- 5ed6: nibbles fold back to 24278; digit sum 38 ≡ 24278 (mod 15). -/
theorem enumeration_hex4_5ed6 : reassembles 24278 = true ∧ castsFifteens 24278 = true := by decide

/-- 5ed7: nibbles fold back to 24279; digit sum 39 ≡ 24279 (mod 15). -/
theorem enumeration_hex4_5ed7 : reassembles 24279 = true ∧ castsFifteens 24279 = true := by decide

/-- 5ed8: nibbles fold back to 24280; digit sum 40 ≡ 24280 (mod 15). -/
theorem enumeration_hex4_5ed8 : reassembles 24280 = true ∧ castsFifteens 24280 = true := by decide

/-- 5ed9: nibbles fold back to 24281; digit sum 41 ≡ 24281 (mod 15). -/
theorem enumeration_hex4_5ed9 : reassembles 24281 = true ∧ castsFifteens 24281 = true := by decide

/-- 5eda: nibbles fold back to 24282; digit sum 42 ≡ 24282 (mod 15). -/
theorem enumeration_hex4_5eda : reassembles 24282 = true ∧ castsFifteens 24282 = true := by decide

/-- 5edb: nibbles fold back to 24283; digit sum 43 ≡ 24283 (mod 15). -/
theorem enumeration_hex4_5edb : reassembles 24283 = true ∧ castsFifteens 24283 = true := by decide

/-- 5edc: nibbles fold back to 24284; digit sum 44 ≡ 24284 (mod 15). -/
theorem enumeration_hex4_5edc : reassembles 24284 = true ∧ castsFifteens 24284 = true := by decide

/-- 5edd: nibbles fold back to 24285; digit sum 45 ≡ 24285 (mod 15). -/
theorem enumeration_hex4_5edd : reassembles 24285 = true ∧ castsFifteens 24285 = true := by decide

/-- 5ede: nibbles fold back to 24286; digit sum 46 ≡ 24286 (mod 15). -/
theorem enumeration_hex4_5ede : reassembles 24286 = true ∧ castsFifteens 24286 = true := by decide

/-- 5edf: nibbles fold back to 24287; digit sum 47 ≡ 24287 (mod 15). -/
theorem enumeration_hex4_5edf : reassembles 24287 = true ∧ castsFifteens 24287 = true := by decide

/-- 5ee0: nibbles fold back to 24288; digit sum 33 ≡ 24288 (mod 15). -/
theorem enumeration_hex4_5ee0 : reassembles 24288 = true ∧ castsFifteens 24288 = true := by decide

/-- 5ee1: nibbles fold back to 24289; digit sum 34 ≡ 24289 (mod 15). -/
theorem enumeration_hex4_5ee1 : reassembles 24289 = true ∧ castsFifteens 24289 = true := by decide

/-- 5ee2: nibbles fold back to 24290; digit sum 35 ≡ 24290 (mod 15). -/
theorem enumeration_hex4_5ee2 : reassembles 24290 = true ∧ castsFifteens 24290 = true := by decide

/-- 5ee3: nibbles fold back to 24291; digit sum 36 ≡ 24291 (mod 15). -/
theorem enumeration_hex4_5ee3 : reassembles 24291 = true ∧ castsFifteens 24291 = true := by decide

/-- 5ee4: nibbles fold back to 24292; digit sum 37 ≡ 24292 (mod 15). -/
theorem enumeration_hex4_5ee4 : reassembles 24292 = true ∧ castsFifteens 24292 = true := by decide

/-- 5ee5: nibbles fold back to 24293; digit sum 38 ≡ 24293 (mod 15). -/
theorem enumeration_hex4_5ee5 : reassembles 24293 = true ∧ castsFifteens 24293 = true := by decide

/-- 5ee6: nibbles fold back to 24294; digit sum 39 ≡ 24294 (mod 15). -/
theorem enumeration_hex4_5ee6 : reassembles 24294 = true ∧ castsFifteens 24294 = true := by decide

/-- 5ee7: nibbles fold back to 24295; digit sum 40 ≡ 24295 (mod 15). -/
theorem enumeration_hex4_5ee7 : reassembles 24295 = true ∧ castsFifteens 24295 = true := by decide

/-- 5ee8: nibbles fold back to 24296; digit sum 41 ≡ 24296 (mod 15). -/
theorem enumeration_hex4_5ee8 : reassembles 24296 = true ∧ castsFifteens 24296 = true := by decide

/-- 5ee9: nibbles fold back to 24297; digit sum 42 ≡ 24297 (mod 15). -/
theorem enumeration_hex4_5ee9 : reassembles 24297 = true ∧ castsFifteens 24297 = true := by decide

/-- 5eea: nibbles fold back to 24298; digit sum 43 ≡ 24298 (mod 15). -/
theorem enumeration_hex4_5eea : reassembles 24298 = true ∧ castsFifteens 24298 = true := by decide

/-- 5eeb: nibbles fold back to 24299; digit sum 44 ≡ 24299 (mod 15). -/
theorem enumeration_hex4_5eeb : reassembles 24299 = true ∧ castsFifteens 24299 = true := by decide

/-- 5eec: nibbles fold back to 24300; digit sum 45 ≡ 24300 (mod 15). -/
theorem enumeration_hex4_5eec : reassembles 24300 = true ∧ castsFifteens 24300 = true := by decide

/-- 5eed: nibbles fold back to 24301; digit sum 46 ≡ 24301 (mod 15). -/
theorem enumeration_hex4_5eed : reassembles 24301 = true ∧ castsFifteens 24301 = true := by decide

/-- 5eee: nibbles fold back to 24302; digit sum 47 ≡ 24302 (mod 15). -/
theorem enumeration_hex4_5eee : reassembles 24302 = true ∧ castsFifteens 24302 = true := by decide

/-- 5eef: nibbles fold back to 24303; digit sum 48 ≡ 24303 (mod 15). -/
theorem enumeration_hex4_5eef : reassembles 24303 = true ∧ castsFifteens 24303 = true := by decide

/-- 5ef0: nibbles fold back to 24304; digit sum 34 ≡ 24304 (mod 15). -/
theorem enumeration_hex4_5ef0 : reassembles 24304 = true ∧ castsFifteens 24304 = true := by decide

/-- 5ef1: nibbles fold back to 24305; digit sum 35 ≡ 24305 (mod 15). -/
theorem enumeration_hex4_5ef1 : reassembles 24305 = true ∧ castsFifteens 24305 = true := by decide

/-- 5ef2: nibbles fold back to 24306; digit sum 36 ≡ 24306 (mod 15). -/
theorem enumeration_hex4_5ef2 : reassembles 24306 = true ∧ castsFifteens 24306 = true := by decide

/-- 5ef3: nibbles fold back to 24307; digit sum 37 ≡ 24307 (mod 15). -/
theorem enumeration_hex4_5ef3 : reassembles 24307 = true ∧ castsFifteens 24307 = true := by decide

/-- 5ef4: nibbles fold back to 24308; digit sum 38 ≡ 24308 (mod 15). -/
theorem enumeration_hex4_5ef4 : reassembles 24308 = true ∧ castsFifteens 24308 = true := by decide

/-- 5ef5: nibbles fold back to 24309; digit sum 39 ≡ 24309 (mod 15). -/
theorem enumeration_hex4_5ef5 : reassembles 24309 = true ∧ castsFifteens 24309 = true := by decide

/-- 5ef6: nibbles fold back to 24310; digit sum 40 ≡ 24310 (mod 15). -/
theorem enumeration_hex4_5ef6 : reassembles 24310 = true ∧ castsFifteens 24310 = true := by decide

/-- 5ef7: nibbles fold back to 24311; digit sum 41 ≡ 24311 (mod 15). -/
theorem enumeration_hex4_5ef7 : reassembles 24311 = true ∧ castsFifteens 24311 = true := by decide

/-- 5ef8: nibbles fold back to 24312; digit sum 42 ≡ 24312 (mod 15). -/
theorem enumeration_hex4_5ef8 : reassembles 24312 = true ∧ castsFifteens 24312 = true := by decide

/-- 5ef9: nibbles fold back to 24313; digit sum 43 ≡ 24313 (mod 15). -/
theorem enumeration_hex4_5ef9 : reassembles 24313 = true ∧ castsFifteens 24313 = true := by decide

/-- 5efa: nibbles fold back to 24314; digit sum 44 ≡ 24314 (mod 15). -/
theorem enumeration_hex4_5efa : reassembles 24314 = true ∧ castsFifteens 24314 = true := by decide

/-- 5efb: nibbles fold back to 24315; digit sum 45 ≡ 24315 (mod 15). -/
theorem enumeration_hex4_5efb : reassembles 24315 = true ∧ castsFifteens 24315 = true := by decide

/-- 5efc: nibbles fold back to 24316; digit sum 46 ≡ 24316 (mod 15). -/
theorem enumeration_hex4_5efc : reassembles 24316 = true ∧ castsFifteens 24316 = true := by decide

/-- 5efd: nibbles fold back to 24317; digit sum 47 ≡ 24317 (mod 15). -/
theorem enumeration_hex4_5efd : reassembles 24317 = true ∧ castsFifteens 24317 = true := by decide

/-- 5efe: nibbles fold back to 24318; digit sum 48 ≡ 24318 (mod 15). -/
theorem enumeration_hex4_5efe : reassembles 24318 = true ∧ castsFifteens 24318 = true := by decide

/-- 5eff: nibbles fold back to 24319; digit sum 49 ≡ 24319 (mod 15). -/
theorem enumeration_hex4_5eff : reassembles 24319 = true ∧ castsFifteens 24319 = true := by decide

/-- 5f00: nibbles fold back to 24320; digit sum 20 ≡ 24320 (mod 15). -/
theorem enumeration_hex4_5f00 : reassembles 24320 = true ∧ castsFifteens 24320 = true := by decide

/-- 5f01: nibbles fold back to 24321; digit sum 21 ≡ 24321 (mod 15). -/
theorem enumeration_hex4_5f01 : reassembles 24321 = true ∧ castsFifteens 24321 = true := by decide

/-- 5f02: nibbles fold back to 24322; digit sum 22 ≡ 24322 (mod 15). -/
theorem enumeration_hex4_5f02 : reassembles 24322 = true ∧ castsFifteens 24322 = true := by decide

/-- 5f03: nibbles fold back to 24323; digit sum 23 ≡ 24323 (mod 15). -/
theorem enumeration_hex4_5f03 : reassembles 24323 = true ∧ castsFifteens 24323 = true := by decide

/-- 5f04: nibbles fold back to 24324; digit sum 24 ≡ 24324 (mod 15). -/
theorem enumeration_hex4_5f04 : reassembles 24324 = true ∧ castsFifteens 24324 = true := by decide

/-- 5f05: nibbles fold back to 24325; digit sum 25 ≡ 24325 (mod 15). -/
theorem enumeration_hex4_5f05 : reassembles 24325 = true ∧ castsFifteens 24325 = true := by decide

/-- 5f06: nibbles fold back to 24326; digit sum 26 ≡ 24326 (mod 15). -/
theorem enumeration_hex4_5f06 : reassembles 24326 = true ∧ castsFifteens 24326 = true := by decide

/-- 5f07: nibbles fold back to 24327; digit sum 27 ≡ 24327 (mod 15). -/
theorem enumeration_hex4_5f07 : reassembles 24327 = true ∧ castsFifteens 24327 = true := by decide

/-- 5f08: nibbles fold back to 24328; digit sum 28 ≡ 24328 (mod 15). -/
theorem enumeration_hex4_5f08 : reassembles 24328 = true ∧ castsFifteens 24328 = true := by decide

/-- 5f09: nibbles fold back to 24329; digit sum 29 ≡ 24329 (mod 15). -/
theorem enumeration_hex4_5f09 : reassembles 24329 = true ∧ castsFifteens 24329 = true := by decide

/-- 5f0a: nibbles fold back to 24330; digit sum 30 ≡ 24330 (mod 15). -/
theorem enumeration_hex4_5f0a : reassembles 24330 = true ∧ castsFifteens 24330 = true := by decide

/-- 5f0b: nibbles fold back to 24331; digit sum 31 ≡ 24331 (mod 15). -/
theorem enumeration_hex4_5f0b : reassembles 24331 = true ∧ castsFifteens 24331 = true := by decide

/-- 5f0c: nibbles fold back to 24332; digit sum 32 ≡ 24332 (mod 15). -/
theorem enumeration_hex4_5f0c : reassembles 24332 = true ∧ castsFifteens 24332 = true := by decide

/-- 5f0d: nibbles fold back to 24333; digit sum 33 ≡ 24333 (mod 15). -/
theorem enumeration_hex4_5f0d : reassembles 24333 = true ∧ castsFifteens 24333 = true := by decide

/-- 5f0e: nibbles fold back to 24334; digit sum 34 ≡ 24334 (mod 15). -/
theorem enumeration_hex4_5f0e : reassembles 24334 = true ∧ castsFifteens 24334 = true := by decide

/-- 5f0f: nibbles fold back to 24335; digit sum 35 ≡ 24335 (mod 15). -/
theorem enumeration_hex4_5f0f : reassembles 24335 = true ∧ castsFifteens 24335 = true := by decide

/-- 5f10: nibbles fold back to 24336; digit sum 21 ≡ 24336 (mod 15). -/
theorem enumeration_hex4_5f10 : reassembles 24336 = true ∧ castsFifteens 24336 = true := by decide

/-- 5f11: nibbles fold back to 24337; digit sum 22 ≡ 24337 (mod 15). -/
theorem enumeration_hex4_5f11 : reassembles 24337 = true ∧ castsFifteens 24337 = true := by decide

/-- 5f12: nibbles fold back to 24338; digit sum 23 ≡ 24338 (mod 15). -/
theorem enumeration_hex4_5f12 : reassembles 24338 = true ∧ castsFifteens 24338 = true := by decide

/-- 5f13: nibbles fold back to 24339; digit sum 24 ≡ 24339 (mod 15). -/
theorem enumeration_hex4_5f13 : reassembles 24339 = true ∧ castsFifteens 24339 = true := by decide

/-- 5f14: nibbles fold back to 24340; digit sum 25 ≡ 24340 (mod 15). -/
theorem enumeration_hex4_5f14 : reassembles 24340 = true ∧ castsFifteens 24340 = true := by decide

/-- 5f15: nibbles fold back to 24341; digit sum 26 ≡ 24341 (mod 15). -/
theorem enumeration_hex4_5f15 : reassembles 24341 = true ∧ castsFifteens 24341 = true := by decide

/-- 5f16: nibbles fold back to 24342; digit sum 27 ≡ 24342 (mod 15). -/
theorem enumeration_hex4_5f16 : reassembles 24342 = true ∧ castsFifteens 24342 = true := by decide

/-- 5f17: nibbles fold back to 24343; digit sum 28 ≡ 24343 (mod 15). -/
theorem enumeration_hex4_5f17 : reassembles 24343 = true ∧ castsFifteens 24343 = true := by decide

/-- 5f18: nibbles fold back to 24344; digit sum 29 ≡ 24344 (mod 15). -/
theorem enumeration_hex4_5f18 : reassembles 24344 = true ∧ castsFifteens 24344 = true := by decide

/-- 5f19: nibbles fold back to 24345; digit sum 30 ≡ 24345 (mod 15). -/
theorem enumeration_hex4_5f19 : reassembles 24345 = true ∧ castsFifteens 24345 = true := by decide

/-- 5f1a: nibbles fold back to 24346; digit sum 31 ≡ 24346 (mod 15). -/
theorem enumeration_hex4_5f1a : reassembles 24346 = true ∧ castsFifteens 24346 = true := by decide

/-- 5f1b: nibbles fold back to 24347; digit sum 32 ≡ 24347 (mod 15). -/
theorem enumeration_hex4_5f1b : reassembles 24347 = true ∧ castsFifteens 24347 = true := by decide

/-- 5f1c: nibbles fold back to 24348; digit sum 33 ≡ 24348 (mod 15). -/
theorem enumeration_hex4_5f1c : reassembles 24348 = true ∧ castsFifteens 24348 = true := by decide

/-- 5f1d: nibbles fold back to 24349; digit sum 34 ≡ 24349 (mod 15). -/
theorem enumeration_hex4_5f1d : reassembles 24349 = true ∧ castsFifteens 24349 = true := by decide

/-- 5f1e: nibbles fold back to 24350; digit sum 35 ≡ 24350 (mod 15). -/
theorem enumeration_hex4_5f1e : reassembles 24350 = true ∧ castsFifteens 24350 = true := by decide

/-- 5f1f: nibbles fold back to 24351; digit sum 36 ≡ 24351 (mod 15). -/
theorem enumeration_hex4_5f1f : reassembles 24351 = true ∧ castsFifteens 24351 = true := by decide

/-- 5f20: nibbles fold back to 24352; digit sum 22 ≡ 24352 (mod 15). -/
theorem enumeration_hex4_5f20 : reassembles 24352 = true ∧ castsFifteens 24352 = true := by decide

/-- 5f21: nibbles fold back to 24353; digit sum 23 ≡ 24353 (mod 15). -/
theorem enumeration_hex4_5f21 : reassembles 24353 = true ∧ castsFifteens 24353 = true := by decide

/-- 5f22: nibbles fold back to 24354; digit sum 24 ≡ 24354 (mod 15). -/
theorem enumeration_hex4_5f22 : reassembles 24354 = true ∧ castsFifteens 24354 = true := by decide

/-- 5f23: nibbles fold back to 24355; digit sum 25 ≡ 24355 (mod 15). -/
theorem enumeration_hex4_5f23 : reassembles 24355 = true ∧ castsFifteens 24355 = true := by decide

/-- 5f24: nibbles fold back to 24356; digit sum 26 ≡ 24356 (mod 15). -/
theorem enumeration_hex4_5f24 : reassembles 24356 = true ∧ castsFifteens 24356 = true := by decide

/-- 5f25: nibbles fold back to 24357; digit sum 27 ≡ 24357 (mod 15). -/
theorem enumeration_hex4_5f25 : reassembles 24357 = true ∧ castsFifteens 24357 = true := by decide

/-- 5f26: nibbles fold back to 24358; digit sum 28 ≡ 24358 (mod 15). -/
theorem enumeration_hex4_5f26 : reassembles 24358 = true ∧ castsFifteens 24358 = true := by decide

/-- 5f27: nibbles fold back to 24359; digit sum 29 ≡ 24359 (mod 15). -/
theorem enumeration_hex4_5f27 : reassembles 24359 = true ∧ castsFifteens 24359 = true := by decide

/-- 5f28: nibbles fold back to 24360; digit sum 30 ≡ 24360 (mod 15). -/
theorem enumeration_hex4_5f28 : reassembles 24360 = true ∧ castsFifteens 24360 = true := by decide

/-- 5f29: nibbles fold back to 24361; digit sum 31 ≡ 24361 (mod 15). -/
theorem enumeration_hex4_5f29 : reassembles 24361 = true ∧ castsFifteens 24361 = true := by decide

/-- 5f2a: nibbles fold back to 24362; digit sum 32 ≡ 24362 (mod 15). -/
theorem enumeration_hex4_5f2a : reassembles 24362 = true ∧ castsFifteens 24362 = true := by decide

/-- 5f2b: nibbles fold back to 24363; digit sum 33 ≡ 24363 (mod 15). -/
theorem enumeration_hex4_5f2b : reassembles 24363 = true ∧ castsFifteens 24363 = true := by decide

/-- 5f2c: nibbles fold back to 24364; digit sum 34 ≡ 24364 (mod 15). -/
theorem enumeration_hex4_5f2c : reassembles 24364 = true ∧ castsFifteens 24364 = true := by decide

/-- 5f2d: nibbles fold back to 24365; digit sum 35 ≡ 24365 (mod 15). -/
theorem enumeration_hex4_5f2d : reassembles 24365 = true ∧ castsFifteens 24365 = true := by decide

/-- 5f2e: nibbles fold back to 24366; digit sum 36 ≡ 24366 (mod 15). -/
theorem enumeration_hex4_5f2e : reassembles 24366 = true ∧ castsFifteens 24366 = true := by decide

/-- 5f2f: nibbles fold back to 24367; digit sum 37 ≡ 24367 (mod 15). -/
theorem enumeration_hex4_5f2f : reassembles 24367 = true ∧ castsFifteens 24367 = true := by decide

/-- 5f30: nibbles fold back to 24368; digit sum 23 ≡ 24368 (mod 15). -/
theorem enumeration_hex4_5f30 : reassembles 24368 = true ∧ castsFifteens 24368 = true := by decide

/-- 5f31: nibbles fold back to 24369; digit sum 24 ≡ 24369 (mod 15). -/
theorem enumeration_hex4_5f31 : reassembles 24369 = true ∧ castsFifteens 24369 = true := by decide

/-- 5f32: nibbles fold back to 24370; digit sum 25 ≡ 24370 (mod 15). -/
theorem enumeration_hex4_5f32 : reassembles 24370 = true ∧ castsFifteens 24370 = true := by decide

/-- 5f33: nibbles fold back to 24371; digit sum 26 ≡ 24371 (mod 15). -/
theorem enumeration_hex4_5f33 : reassembles 24371 = true ∧ castsFifteens 24371 = true := by decide

/-- 5f34: nibbles fold back to 24372; digit sum 27 ≡ 24372 (mod 15). -/
theorem enumeration_hex4_5f34 : reassembles 24372 = true ∧ castsFifteens 24372 = true := by decide

/-- 5f35: nibbles fold back to 24373; digit sum 28 ≡ 24373 (mod 15). -/
theorem enumeration_hex4_5f35 : reassembles 24373 = true ∧ castsFifteens 24373 = true := by decide

/-- 5f36: nibbles fold back to 24374; digit sum 29 ≡ 24374 (mod 15). -/
theorem enumeration_hex4_5f36 : reassembles 24374 = true ∧ castsFifteens 24374 = true := by decide

/-- 5f37: nibbles fold back to 24375; digit sum 30 ≡ 24375 (mod 15). -/
theorem enumeration_hex4_5f37 : reassembles 24375 = true ∧ castsFifteens 24375 = true := by decide

/-- 5f38: nibbles fold back to 24376; digit sum 31 ≡ 24376 (mod 15). -/
theorem enumeration_hex4_5f38 : reassembles 24376 = true ∧ castsFifteens 24376 = true := by decide

/-- 5f39: nibbles fold back to 24377; digit sum 32 ≡ 24377 (mod 15). -/
theorem enumeration_hex4_5f39 : reassembles 24377 = true ∧ castsFifteens 24377 = true := by decide

/-- 5f3a: nibbles fold back to 24378; digit sum 33 ≡ 24378 (mod 15). -/
theorem enumeration_hex4_5f3a : reassembles 24378 = true ∧ castsFifteens 24378 = true := by decide

/-- 5f3b: nibbles fold back to 24379; digit sum 34 ≡ 24379 (mod 15). -/
theorem enumeration_hex4_5f3b : reassembles 24379 = true ∧ castsFifteens 24379 = true := by decide

/-- 5f3c: nibbles fold back to 24380; digit sum 35 ≡ 24380 (mod 15). -/
theorem enumeration_hex4_5f3c : reassembles 24380 = true ∧ castsFifteens 24380 = true := by decide

/-- 5f3d: nibbles fold back to 24381; digit sum 36 ≡ 24381 (mod 15). -/
theorem enumeration_hex4_5f3d : reassembles 24381 = true ∧ castsFifteens 24381 = true := by decide

/-- 5f3e: nibbles fold back to 24382; digit sum 37 ≡ 24382 (mod 15). -/
theorem enumeration_hex4_5f3e : reassembles 24382 = true ∧ castsFifteens 24382 = true := by decide

/-- 5f3f: nibbles fold back to 24383; digit sum 38 ≡ 24383 (mod 15). -/
theorem enumeration_hex4_5f3f : reassembles 24383 = true ∧ castsFifteens 24383 = true := by decide

/-- 5f40: nibbles fold back to 24384; digit sum 24 ≡ 24384 (mod 15). -/
theorem enumeration_hex4_5f40 : reassembles 24384 = true ∧ castsFifteens 24384 = true := by decide

/-- 5f41: nibbles fold back to 24385; digit sum 25 ≡ 24385 (mod 15). -/
theorem enumeration_hex4_5f41 : reassembles 24385 = true ∧ castsFifteens 24385 = true := by decide

/-- 5f42: nibbles fold back to 24386; digit sum 26 ≡ 24386 (mod 15). -/
theorem enumeration_hex4_5f42 : reassembles 24386 = true ∧ castsFifteens 24386 = true := by decide

/-- 5f43: nibbles fold back to 24387; digit sum 27 ≡ 24387 (mod 15). -/
theorem enumeration_hex4_5f43 : reassembles 24387 = true ∧ castsFifteens 24387 = true := by decide

/-- 5f44: nibbles fold back to 24388; digit sum 28 ≡ 24388 (mod 15). -/
theorem enumeration_hex4_5f44 : reassembles 24388 = true ∧ castsFifteens 24388 = true := by decide

/-- 5f45: nibbles fold back to 24389; digit sum 29 ≡ 24389 (mod 15). -/
theorem enumeration_hex4_5f45 : reassembles 24389 = true ∧ castsFifteens 24389 = true := by decide

/-- 5f46: nibbles fold back to 24390; digit sum 30 ≡ 24390 (mod 15). -/
theorem enumeration_hex4_5f46 : reassembles 24390 = true ∧ castsFifteens 24390 = true := by decide

/-- 5f47: nibbles fold back to 24391; digit sum 31 ≡ 24391 (mod 15). -/
theorem enumeration_hex4_5f47 : reassembles 24391 = true ∧ castsFifteens 24391 = true := by decide

/-- 5f48: nibbles fold back to 24392; digit sum 32 ≡ 24392 (mod 15). -/
theorem enumeration_hex4_5f48 : reassembles 24392 = true ∧ castsFifteens 24392 = true := by decide

/-- 5f49: nibbles fold back to 24393; digit sum 33 ≡ 24393 (mod 15). -/
theorem enumeration_hex4_5f49 : reassembles 24393 = true ∧ castsFifteens 24393 = true := by decide

/-- 5f4a: nibbles fold back to 24394; digit sum 34 ≡ 24394 (mod 15). -/
theorem enumeration_hex4_5f4a : reassembles 24394 = true ∧ castsFifteens 24394 = true := by decide

/-- 5f4b: nibbles fold back to 24395; digit sum 35 ≡ 24395 (mod 15). -/
theorem enumeration_hex4_5f4b : reassembles 24395 = true ∧ castsFifteens 24395 = true := by decide

/-- 5f4c: nibbles fold back to 24396; digit sum 36 ≡ 24396 (mod 15). -/
theorem enumeration_hex4_5f4c : reassembles 24396 = true ∧ castsFifteens 24396 = true := by decide

/-- 5f4d: nibbles fold back to 24397; digit sum 37 ≡ 24397 (mod 15). -/
theorem enumeration_hex4_5f4d : reassembles 24397 = true ∧ castsFifteens 24397 = true := by decide

/-- 5f4e: nibbles fold back to 24398; digit sum 38 ≡ 24398 (mod 15). -/
theorem enumeration_hex4_5f4e : reassembles 24398 = true ∧ castsFifteens 24398 = true := by decide

/-- 5f4f: nibbles fold back to 24399; digit sum 39 ≡ 24399 (mod 15). -/
theorem enumeration_hex4_5f4f : reassembles 24399 = true ∧ castsFifteens 24399 = true := by decide

/-- 5f50: nibbles fold back to 24400; digit sum 25 ≡ 24400 (mod 15). -/
theorem enumeration_hex4_5f50 : reassembles 24400 = true ∧ castsFifteens 24400 = true := by decide

/-- 5f51: nibbles fold back to 24401; digit sum 26 ≡ 24401 (mod 15). -/
theorem enumeration_hex4_5f51 : reassembles 24401 = true ∧ castsFifteens 24401 = true := by decide

/-- 5f52: nibbles fold back to 24402; digit sum 27 ≡ 24402 (mod 15). -/
theorem enumeration_hex4_5f52 : reassembles 24402 = true ∧ castsFifteens 24402 = true := by decide

/-- 5f53: nibbles fold back to 24403; digit sum 28 ≡ 24403 (mod 15). -/
theorem enumeration_hex4_5f53 : reassembles 24403 = true ∧ castsFifteens 24403 = true := by decide

/-- 5f54: nibbles fold back to 24404; digit sum 29 ≡ 24404 (mod 15). -/
theorem enumeration_hex4_5f54 : reassembles 24404 = true ∧ castsFifteens 24404 = true := by decide

/-- 5f55: nibbles fold back to 24405; digit sum 30 ≡ 24405 (mod 15). -/
theorem enumeration_hex4_5f55 : reassembles 24405 = true ∧ castsFifteens 24405 = true := by decide

/-- 5f56: nibbles fold back to 24406; digit sum 31 ≡ 24406 (mod 15). -/
theorem enumeration_hex4_5f56 : reassembles 24406 = true ∧ castsFifteens 24406 = true := by decide

/-- 5f57: nibbles fold back to 24407; digit sum 32 ≡ 24407 (mod 15). -/
theorem enumeration_hex4_5f57 : reassembles 24407 = true ∧ castsFifteens 24407 = true := by decide

/-- 5f58: nibbles fold back to 24408; digit sum 33 ≡ 24408 (mod 15). -/
theorem enumeration_hex4_5f58 : reassembles 24408 = true ∧ castsFifteens 24408 = true := by decide

/-- 5f59: nibbles fold back to 24409; digit sum 34 ≡ 24409 (mod 15). -/
theorem enumeration_hex4_5f59 : reassembles 24409 = true ∧ castsFifteens 24409 = true := by decide

/-- 5f5a: nibbles fold back to 24410; digit sum 35 ≡ 24410 (mod 15). -/
theorem enumeration_hex4_5f5a : reassembles 24410 = true ∧ castsFifteens 24410 = true := by decide

/-- 5f5b: nibbles fold back to 24411; digit sum 36 ≡ 24411 (mod 15). -/
theorem enumeration_hex4_5f5b : reassembles 24411 = true ∧ castsFifteens 24411 = true := by decide

/-- 5f5c: nibbles fold back to 24412; digit sum 37 ≡ 24412 (mod 15). -/
theorem enumeration_hex4_5f5c : reassembles 24412 = true ∧ castsFifteens 24412 = true := by decide

/-- 5f5d: nibbles fold back to 24413; digit sum 38 ≡ 24413 (mod 15). -/
theorem enumeration_hex4_5f5d : reassembles 24413 = true ∧ castsFifteens 24413 = true := by decide

/-- 5f5e: nibbles fold back to 24414; digit sum 39 ≡ 24414 (mod 15). -/
theorem enumeration_hex4_5f5e : reassembles 24414 = true ∧ castsFifteens 24414 = true := by decide

/-- 5f5f: nibbles fold back to 24415; digit sum 40 ≡ 24415 (mod 15). -/
theorem enumeration_hex4_5f5f : reassembles 24415 = true ∧ castsFifteens 24415 = true := by decide

/-- 5f60: nibbles fold back to 24416; digit sum 26 ≡ 24416 (mod 15). -/
theorem enumeration_hex4_5f60 : reassembles 24416 = true ∧ castsFifteens 24416 = true := by decide

/-- 5f61: nibbles fold back to 24417; digit sum 27 ≡ 24417 (mod 15). -/
theorem enumeration_hex4_5f61 : reassembles 24417 = true ∧ castsFifteens 24417 = true := by decide

/-- 5f62: nibbles fold back to 24418; digit sum 28 ≡ 24418 (mod 15). -/
theorem enumeration_hex4_5f62 : reassembles 24418 = true ∧ castsFifteens 24418 = true := by decide

/-- 5f63: nibbles fold back to 24419; digit sum 29 ≡ 24419 (mod 15). -/
theorem enumeration_hex4_5f63 : reassembles 24419 = true ∧ castsFifteens 24419 = true := by decide

/-- 5f64: nibbles fold back to 24420; digit sum 30 ≡ 24420 (mod 15). -/
theorem enumeration_hex4_5f64 : reassembles 24420 = true ∧ castsFifteens 24420 = true := by decide

/-- 5f65: nibbles fold back to 24421; digit sum 31 ≡ 24421 (mod 15). -/
theorem enumeration_hex4_5f65 : reassembles 24421 = true ∧ castsFifteens 24421 = true := by decide

/-- 5f66: nibbles fold back to 24422; digit sum 32 ≡ 24422 (mod 15). -/
theorem enumeration_hex4_5f66 : reassembles 24422 = true ∧ castsFifteens 24422 = true := by decide

/-- 5f67: nibbles fold back to 24423; digit sum 33 ≡ 24423 (mod 15). -/
theorem enumeration_hex4_5f67 : reassembles 24423 = true ∧ castsFifteens 24423 = true := by decide

/-- 5f68: nibbles fold back to 24424; digit sum 34 ≡ 24424 (mod 15). -/
theorem enumeration_hex4_5f68 : reassembles 24424 = true ∧ castsFifteens 24424 = true := by decide

/-- 5f69: nibbles fold back to 24425; digit sum 35 ≡ 24425 (mod 15). -/
theorem enumeration_hex4_5f69 : reassembles 24425 = true ∧ castsFifteens 24425 = true := by decide

/-- 5f6a: nibbles fold back to 24426; digit sum 36 ≡ 24426 (mod 15). -/
theorem enumeration_hex4_5f6a : reassembles 24426 = true ∧ castsFifteens 24426 = true := by decide

/-- 5f6b: nibbles fold back to 24427; digit sum 37 ≡ 24427 (mod 15). -/
theorem enumeration_hex4_5f6b : reassembles 24427 = true ∧ castsFifteens 24427 = true := by decide

/-- 5f6c: nibbles fold back to 24428; digit sum 38 ≡ 24428 (mod 15). -/
theorem enumeration_hex4_5f6c : reassembles 24428 = true ∧ castsFifteens 24428 = true := by decide

/-- 5f6d: nibbles fold back to 24429; digit sum 39 ≡ 24429 (mod 15). -/
theorem enumeration_hex4_5f6d : reassembles 24429 = true ∧ castsFifteens 24429 = true := by decide

/-- 5f6e: nibbles fold back to 24430; digit sum 40 ≡ 24430 (mod 15). -/
theorem enumeration_hex4_5f6e : reassembles 24430 = true ∧ castsFifteens 24430 = true := by decide

/-- 5f6f: nibbles fold back to 24431; digit sum 41 ≡ 24431 (mod 15). -/
theorem enumeration_hex4_5f6f : reassembles 24431 = true ∧ castsFifteens 24431 = true := by decide

/-- 5f70: nibbles fold back to 24432; digit sum 27 ≡ 24432 (mod 15). -/
theorem enumeration_hex4_5f70 : reassembles 24432 = true ∧ castsFifteens 24432 = true := by decide

/-- 5f71: nibbles fold back to 24433; digit sum 28 ≡ 24433 (mod 15). -/
theorem enumeration_hex4_5f71 : reassembles 24433 = true ∧ castsFifteens 24433 = true := by decide

/-- 5f72: nibbles fold back to 24434; digit sum 29 ≡ 24434 (mod 15). -/
theorem enumeration_hex4_5f72 : reassembles 24434 = true ∧ castsFifteens 24434 = true := by decide

/-- 5f73: nibbles fold back to 24435; digit sum 30 ≡ 24435 (mod 15). -/
theorem enumeration_hex4_5f73 : reassembles 24435 = true ∧ castsFifteens 24435 = true := by decide

/-- 5f74: nibbles fold back to 24436; digit sum 31 ≡ 24436 (mod 15). -/
theorem enumeration_hex4_5f74 : reassembles 24436 = true ∧ castsFifteens 24436 = true := by decide

/-- 5f75: nibbles fold back to 24437; digit sum 32 ≡ 24437 (mod 15). -/
theorem enumeration_hex4_5f75 : reassembles 24437 = true ∧ castsFifteens 24437 = true := by decide

/-- 5f76: nibbles fold back to 24438; digit sum 33 ≡ 24438 (mod 15). -/
theorem enumeration_hex4_5f76 : reassembles 24438 = true ∧ castsFifteens 24438 = true := by decide

/-- 5f77: nibbles fold back to 24439; digit sum 34 ≡ 24439 (mod 15). -/
theorem enumeration_hex4_5f77 : reassembles 24439 = true ∧ castsFifteens 24439 = true := by decide

/-- 5f78: nibbles fold back to 24440; digit sum 35 ≡ 24440 (mod 15). -/
theorem enumeration_hex4_5f78 : reassembles 24440 = true ∧ castsFifteens 24440 = true := by decide

/-- 5f79: nibbles fold back to 24441; digit sum 36 ≡ 24441 (mod 15). -/
theorem enumeration_hex4_5f79 : reassembles 24441 = true ∧ castsFifteens 24441 = true := by decide

/-- 5f7a: nibbles fold back to 24442; digit sum 37 ≡ 24442 (mod 15). -/
theorem enumeration_hex4_5f7a : reassembles 24442 = true ∧ castsFifteens 24442 = true := by decide

/-- 5f7b: nibbles fold back to 24443; digit sum 38 ≡ 24443 (mod 15). -/
theorem enumeration_hex4_5f7b : reassembles 24443 = true ∧ castsFifteens 24443 = true := by decide

/-- 5f7c: nibbles fold back to 24444; digit sum 39 ≡ 24444 (mod 15). -/
theorem enumeration_hex4_5f7c : reassembles 24444 = true ∧ castsFifteens 24444 = true := by decide

/-- 5f7d: nibbles fold back to 24445; digit sum 40 ≡ 24445 (mod 15). -/
theorem enumeration_hex4_5f7d : reassembles 24445 = true ∧ castsFifteens 24445 = true := by decide

/-- 5f7e: nibbles fold back to 24446; digit sum 41 ≡ 24446 (mod 15). -/
theorem enumeration_hex4_5f7e : reassembles 24446 = true ∧ castsFifteens 24446 = true := by decide

/-- 5f7f: nibbles fold back to 24447; digit sum 42 ≡ 24447 (mod 15). -/
theorem enumeration_hex4_5f7f : reassembles 24447 = true ∧ castsFifteens 24447 = true := by decide

/-- 5f80: nibbles fold back to 24448; digit sum 28 ≡ 24448 (mod 15). -/
theorem enumeration_hex4_5f80 : reassembles 24448 = true ∧ castsFifteens 24448 = true := by decide

/-- 5f81: nibbles fold back to 24449; digit sum 29 ≡ 24449 (mod 15). -/
theorem enumeration_hex4_5f81 : reassembles 24449 = true ∧ castsFifteens 24449 = true := by decide

/-- 5f82: nibbles fold back to 24450; digit sum 30 ≡ 24450 (mod 15). -/
theorem enumeration_hex4_5f82 : reassembles 24450 = true ∧ castsFifteens 24450 = true := by decide

/-- 5f83: nibbles fold back to 24451; digit sum 31 ≡ 24451 (mod 15). -/
theorem enumeration_hex4_5f83 : reassembles 24451 = true ∧ castsFifteens 24451 = true := by decide

/-- 5f84: nibbles fold back to 24452; digit sum 32 ≡ 24452 (mod 15). -/
theorem enumeration_hex4_5f84 : reassembles 24452 = true ∧ castsFifteens 24452 = true := by decide

/-- 5f85: nibbles fold back to 24453; digit sum 33 ≡ 24453 (mod 15). -/
theorem enumeration_hex4_5f85 : reassembles 24453 = true ∧ castsFifteens 24453 = true := by decide

/-- 5f86: nibbles fold back to 24454; digit sum 34 ≡ 24454 (mod 15). -/
theorem enumeration_hex4_5f86 : reassembles 24454 = true ∧ castsFifteens 24454 = true := by decide

/-- 5f87: nibbles fold back to 24455; digit sum 35 ≡ 24455 (mod 15). -/
theorem enumeration_hex4_5f87 : reassembles 24455 = true ∧ castsFifteens 24455 = true := by decide

/-- 5f88: nibbles fold back to 24456; digit sum 36 ≡ 24456 (mod 15). -/
theorem enumeration_hex4_5f88 : reassembles 24456 = true ∧ castsFifteens 24456 = true := by decide

/-- 5f89: nibbles fold back to 24457; digit sum 37 ≡ 24457 (mod 15). -/
theorem enumeration_hex4_5f89 : reassembles 24457 = true ∧ castsFifteens 24457 = true := by decide

/-- 5f8a: nibbles fold back to 24458; digit sum 38 ≡ 24458 (mod 15). -/
theorem enumeration_hex4_5f8a : reassembles 24458 = true ∧ castsFifteens 24458 = true := by decide

/-- 5f8b: nibbles fold back to 24459; digit sum 39 ≡ 24459 (mod 15). -/
theorem enumeration_hex4_5f8b : reassembles 24459 = true ∧ castsFifteens 24459 = true := by decide

/-- 5f8c: nibbles fold back to 24460; digit sum 40 ≡ 24460 (mod 15). -/
theorem enumeration_hex4_5f8c : reassembles 24460 = true ∧ castsFifteens 24460 = true := by decide

/-- 5f8d: nibbles fold back to 24461; digit sum 41 ≡ 24461 (mod 15). -/
theorem enumeration_hex4_5f8d : reassembles 24461 = true ∧ castsFifteens 24461 = true := by decide

/-- 5f8e: nibbles fold back to 24462; digit sum 42 ≡ 24462 (mod 15). -/
theorem enumeration_hex4_5f8e : reassembles 24462 = true ∧ castsFifteens 24462 = true := by decide

/-- 5f8f: nibbles fold back to 24463; digit sum 43 ≡ 24463 (mod 15). -/
theorem enumeration_hex4_5f8f : reassembles 24463 = true ∧ castsFifteens 24463 = true := by decide

/-- 5f90: nibbles fold back to 24464; digit sum 29 ≡ 24464 (mod 15). -/
theorem enumeration_hex4_5f90 : reassembles 24464 = true ∧ castsFifteens 24464 = true := by decide

/-- 5f91: nibbles fold back to 24465; digit sum 30 ≡ 24465 (mod 15). -/
theorem enumeration_hex4_5f91 : reassembles 24465 = true ∧ castsFifteens 24465 = true := by decide

/-- 5f92: nibbles fold back to 24466; digit sum 31 ≡ 24466 (mod 15). -/
theorem enumeration_hex4_5f92 : reassembles 24466 = true ∧ castsFifteens 24466 = true := by decide

/-- 5f93: nibbles fold back to 24467; digit sum 32 ≡ 24467 (mod 15). -/
theorem enumeration_hex4_5f93 : reassembles 24467 = true ∧ castsFifteens 24467 = true := by decide

/-- 5f94: nibbles fold back to 24468; digit sum 33 ≡ 24468 (mod 15). -/
theorem enumeration_hex4_5f94 : reassembles 24468 = true ∧ castsFifteens 24468 = true := by decide

/-- 5f95: nibbles fold back to 24469; digit sum 34 ≡ 24469 (mod 15). -/
theorem enumeration_hex4_5f95 : reassembles 24469 = true ∧ castsFifteens 24469 = true := by decide

/-- 5f96: nibbles fold back to 24470; digit sum 35 ≡ 24470 (mod 15). -/
theorem enumeration_hex4_5f96 : reassembles 24470 = true ∧ castsFifteens 24470 = true := by decide

/-- 5f97: nibbles fold back to 24471; digit sum 36 ≡ 24471 (mod 15). -/
theorem enumeration_hex4_5f97 : reassembles 24471 = true ∧ castsFifteens 24471 = true := by decide

/-- 5f98: nibbles fold back to 24472; digit sum 37 ≡ 24472 (mod 15). -/
theorem enumeration_hex4_5f98 : reassembles 24472 = true ∧ castsFifteens 24472 = true := by decide

/-- 5f99: nibbles fold back to 24473; digit sum 38 ≡ 24473 (mod 15). -/
theorem enumeration_hex4_5f99 : reassembles 24473 = true ∧ castsFifteens 24473 = true := by decide

/-- 5f9a: nibbles fold back to 24474; digit sum 39 ≡ 24474 (mod 15). -/
theorem enumeration_hex4_5f9a : reassembles 24474 = true ∧ castsFifteens 24474 = true := by decide

/-- 5f9b: nibbles fold back to 24475; digit sum 40 ≡ 24475 (mod 15). -/
theorem enumeration_hex4_5f9b : reassembles 24475 = true ∧ castsFifteens 24475 = true := by decide

/-- 5f9c: nibbles fold back to 24476; digit sum 41 ≡ 24476 (mod 15). -/
theorem enumeration_hex4_5f9c : reassembles 24476 = true ∧ castsFifteens 24476 = true := by decide

/-- 5f9d: nibbles fold back to 24477; digit sum 42 ≡ 24477 (mod 15). -/
theorem enumeration_hex4_5f9d : reassembles 24477 = true ∧ castsFifteens 24477 = true := by decide

/-- 5f9e: nibbles fold back to 24478; digit sum 43 ≡ 24478 (mod 15). -/
theorem enumeration_hex4_5f9e : reassembles 24478 = true ∧ castsFifteens 24478 = true := by decide

/-- 5f9f: nibbles fold back to 24479; digit sum 44 ≡ 24479 (mod 15). -/
theorem enumeration_hex4_5f9f : reassembles 24479 = true ∧ castsFifteens 24479 = true := by decide

/-- 5fa0: nibbles fold back to 24480; digit sum 30 ≡ 24480 (mod 15). -/
theorem enumeration_hex4_5fa0 : reassembles 24480 = true ∧ castsFifteens 24480 = true := by decide

/-- 5fa1: nibbles fold back to 24481; digit sum 31 ≡ 24481 (mod 15). -/
theorem enumeration_hex4_5fa1 : reassembles 24481 = true ∧ castsFifteens 24481 = true := by decide

/-- 5fa2: nibbles fold back to 24482; digit sum 32 ≡ 24482 (mod 15). -/
theorem enumeration_hex4_5fa2 : reassembles 24482 = true ∧ castsFifteens 24482 = true := by decide

/-- 5fa3: nibbles fold back to 24483; digit sum 33 ≡ 24483 (mod 15). -/
theorem enumeration_hex4_5fa3 : reassembles 24483 = true ∧ castsFifteens 24483 = true := by decide

/-- 5fa4: nibbles fold back to 24484; digit sum 34 ≡ 24484 (mod 15). -/
theorem enumeration_hex4_5fa4 : reassembles 24484 = true ∧ castsFifteens 24484 = true := by decide

/-- 5fa5: nibbles fold back to 24485; digit sum 35 ≡ 24485 (mod 15). -/
theorem enumeration_hex4_5fa5 : reassembles 24485 = true ∧ castsFifteens 24485 = true := by decide

/-- 5fa6: nibbles fold back to 24486; digit sum 36 ≡ 24486 (mod 15). -/
theorem enumeration_hex4_5fa6 : reassembles 24486 = true ∧ castsFifteens 24486 = true := by decide

/-- 5fa7: nibbles fold back to 24487; digit sum 37 ≡ 24487 (mod 15). -/
theorem enumeration_hex4_5fa7 : reassembles 24487 = true ∧ castsFifteens 24487 = true := by decide

/-- 5fa8: nibbles fold back to 24488; digit sum 38 ≡ 24488 (mod 15). -/
theorem enumeration_hex4_5fa8 : reassembles 24488 = true ∧ castsFifteens 24488 = true := by decide

/-- 5fa9: nibbles fold back to 24489; digit sum 39 ≡ 24489 (mod 15). -/
theorem enumeration_hex4_5fa9 : reassembles 24489 = true ∧ castsFifteens 24489 = true := by decide

/-- 5faa: nibbles fold back to 24490; digit sum 40 ≡ 24490 (mod 15). -/
theorem enumeration_hex4_5faa : reassembles 24490 = true ∧ castsFifteens 24490 = true := by decide

/-- 5fab: nibbles fold back to 24491; digit sum 41 ≡ 24491 (mod 15). -/
theorem enumeration_hex4_5fab : reassembles 24491 = true ∧ castsFifteens 24491 = true := by decide

/-- 5fac: nibbles fold back to 24492; digit sum 42 ≡ 24492 (mod 15). -/
theorem enumeration_hex4_5fac : reassembles 24492 = true ∧ castsFifteens 24492 = true := by decide

/-- 5fad: nibbles fold back to 24493; digit sum 43 ≡ 24493 (mod 15). -/
theorem enumeration_hex4_5fad : reassembles 24493 = true ∧ castsFifteens 24493 = true := by decide

/-- 5fae: nibbles fold back to 24494; digit sum 44 ≡ 24494 (mod 15). -/
theorem enumeration_hex4_5fae : reassembles 24494 = true ∧ castsFifteens 24494 = true := by decide

/-- 5faf: nibbles fold back to 24495; digit sum 45 ≡ 24495 (mod 15). -/
theorem enumeration_hex4_5faf : reassembles 24495 = true ∧ castsFifteens 24495 = true := by decide

/-- 5fb0: nibbles fold back to 24496; digit sum 31 ≡ 24496 (mod 15). -/
theorem enumeration_hex4_5fb0 : reassembles 24496 = true ∧ castsFifteens 24496 = true := by decide

/-- 5fb1: nibbles fold back to 24497; digit sum 32 ≡ 24497 (mod 15). -/
theorem enumeration_hex4_5fb1 : reassembles 24497 = true ∧ castsFifteens 24497 = true := by decide

/-- 5fb2: nibbles fold back to 24498; digit sum 33 ≡ 24498 (mod 15). -/
theorem enumeration_hex4_5fb2 : reassembles 24498 = true ∧ castsFifteens 24498 = true := by decide

/-- 5fb3: nibbles fold back to 24499; digit sum 34 ≡ 24499 (mod 15). -/
theorem enumeration_hex4_5fb3 : reassembles 24499 = true ∧ castsFifteens 24499 = true := by decide

/-- 5fb4: nibbles fold back to 24500; digit sum 35 ≡ 24500 (mod 15). -/
theorem enumeration_hex4_5fb4 : reassembles 24500 = true ∧ castsFifteens 24500 = true := by decide

/-- 5fb5: nibbles fold back to 24501; digit sum 36 ≡ 24501 (mod 15). -/
theorem enumeration_hex4_5fb5 : reassembles 24501 = true ∧ castsFifteens 24501 = true := by decide

/-- 5fb6: nibbles fold back to 24502; digit sum 37 ≡ 24502 (mod 15). -/
theorem enumeration_hex4_5fb6 : reassembles 24502 = true ∧ castsFifteens 24502 = true := by decide

/-- 5fb7: nibbles fold back to 24503; digit sum 38 ≡ 24503 (mod 15). -/
theorem enumeration_hex4_5fb7 : reassembles 24503 = true ∧ castsFifteens 24503 = true := by decide

/-- 5fb8: nibbles fold back to 24504; digit sum 39 ≡ 24504 (mod 15). -/
theorem enumeration_hex4_5fb8 : reassembles 24504 = true ∧ castsFifteens 24504 = true := by decide

/-- 5fb9: nibbles fold back to 24505; digit sum 40 ≡ 24505 (mod 15). -/
theorem enumeration_hex4_5fb9 : reassembles 24505 = true ∧ castsFifteens 24505 = true := by decide

/-- 5fba: nibbles fold back to 24506; digit sum 41 ≡ 24506 (mod 15). -/
theorem enumeration_hex4_5fba : reassembles 24506 = true ∧ castsFifteens 24506 = true := by decide

/-- 5fbb: nibbles fold back to 24507; digit sum 42 ≡ 24507 (mod 15). -/
theorem enumeration_hex4_5fbb : reassembles 24507 = true ∧ castsFifteens 24507 = true := by decide

/-- 5fbc: nibbles fold back to 24508; digit sum 43 ≡ 24508 (mod 15). -/
theorem enumeration_hex4_5fbc : reassembles 24508 = true ∧ castsFifteens 24508 = true := by decide

/-- 5fbd: nibbles fold back to 24509; digit sum 44 ≡ 24509 (mod 15). -/
theorem enumeration_hex4_5fbd : reassembles 24509 = true ∧ castsFifteens 24509 = true := by decide

/-- 5fbe: nibbles fold back to 24510; digit sum 45 ≡ 24510 (mod 15). -/
theorem enumeration_hex4_5fbe : reassembles 24510 = true ∧ castsFifteens 24510 = true := by decide

/-- 5fbf: nibbles fold back to 24511; digit sum 46 ≡ 24511 (mod 15). -/
theorem enumeration_hex4_5fbf : reassembles 24511 = true ∧ castsFifteens 24511 = true := by decide

/-- 5fc0: nibbles fold back to 24512; digit sum 32 ≡ 24512 (mod 15). -/
theorem enumeration_hex4_5fc0 : reassembles 24512 = true ∧ castsFifteens 24512 = true := by decide

/-- 5fc1: nibbles fold back to 24513; digit sum 33 ≡ 24513 (mod 15). -/
theorem enumeration_hex4_5fc1 : reassembles 24513 = true ∧ castsFifteens 24513 = true := by decide

/-- 5fc2: nibbles fold back to 24514; digit sum 34 ≡ 24514 (mod 15). -/
theorem enumeration_hex4_5fc2 : reassembles 24514 = true ∧ castsFifteens 24514 = true := by decide

/-- 5fc3: nibbles fold back to 24515; digit sum 35 ≡ 24515 (mod 15). -/
theorem enumeration_hex4_5fc3 : reassembles 24515 = true ∧ castsFifteens 24515 = true := by decide

/-- 5fc4: nibbles fold back to 24516; digit sum 36 ≡ 24516 (mod 15). -/
theorem enumeration_hex4_5fc4 : reassembles 24516 = true ∧ castsFifteens 24516 = true := by decide

/-- 5fc5: nibbles fold back to 24517; digit sum 37 ≡ 24517 (mod 15). -/
theorem enumeration_hex4_5fc5 : reassembles 24517 = true ∧ castsFifteens 24517 = true := by decide

/-- 5fc6: nibbles fold back to 24518; digit sum 38 ≡ 24518 (mod 15). -/
theorem enumeration_hex4_5fc6 : reassembles 24518 = true ∧ castsFifteens 24518 = true := by decide

/-- 5fc7: nibbles fold back to 24519; digit sum 39 ≡ 24519 (mod 15). -/
theorem enumeration_hex4_5fc7 : reassembles 24519 = true ∧ castsFifteens 24519 = true := by decide

/-- 5fc8: nibbles fold back to 24520; digit sum 40 ≡ 24520 (mod 15). -/
theorem enumeration_hex4_5fc8 : reassembles 24520 = true ∧ castsFifteens 24520 = true := by decide

/-- 5fc9: nibbles fold back to 24521; digit sum 41 ≡ 24521 (mod 15). -/
theorem enumeration_hex4_5fc9 : reassembles 24521 = true ∧ castsFifteens 24521 = true := by decide

/-- 5fca: nibbles fold back to 24522; digit sum 42 ≡ 24522 (mod 15). -/
theorem enumeration_hex4_5fca : reassembles 24522 = true ∧ castsFifteens 24522 = true := by decide

/-- 5fcb: nibbles fold back to 24523; digit sum 43 ≡ 24523 (mod 15). -/
theorem enumeration_hex4_5fcb : reassembles 24523 = true ∧ castsFifteens 24523 = true := by decide

/-- 5fcc: nibbles fold back to 24524; digit sum 44 ≡ 24524 (mod 15). -/
theorem enumeration_hex4_5fcc : reassembles 24524 = true ∧ castsFifteens 24524 = true := by decide

/-- 5fcd: nibbles fold back to 24525; digit sum 45 ≡ 24525 (mod 15). -/
theorem enumeration_hex4_5fcd : reassembles 24525 = true ∧ castsFifteens 24525 = true := by decide

/-- 5fce: nibbles fold back to 24526; digit sum 46 ≡ 24526 (mod 15). -/
theorem enumeration_hex4_5fce : reassembles 24526 = true ∧ castsFifteens 24526 = true := by decide

/-- 5fcf: nibbles fold back to 24527; digit sum 47 ≡ 24527 (mod 15). -/
theorem enumeration_hex4_5fcf : reassembles 24527 = true ∧ castsFifteens 24527 = true := by decide

/-- 5fd0: nibbles fold back to 24528; digit sum 33 ≡ 24528 (mod 15). -/
theorem enumeration_hex4_5fd0 : reassembles 24528 = true ∧ castsFifteens 24528 = true := by decide

/-- 5fd1: nibbles fold back to 24529; digit sum 34 ≡ 24529 (mod 15). -/
theorem enumeration_hex4_5fd1 : reassembles 24529 = true ∧ castsFifteens 24529 = true := by decide

/-- 5fd2: nibbles fold back to 24530; digit sum 35 ≡ 24530 (mod 15). -/
theorem enumeration_hex4_5fd2 : reassembles 24530 = true ∧ castsFifteens 24530 = true := by decide

/-- 5fd3: nibbles fold back to 24531; digit sum 36 ≡ 24531 (mod 15). -/
theorem enumeration_hex4_5fd3 : reassembles 24531 = true ∧ castsFifteens 24531 = true := by decide

/-- 5fd4: nibbles fold back to 24532; digit sum 37 ≡ 24532 (mod 15). -/
theorem enumeration_hex4_5fd4 : reassembles 24532 = true ∧ castsFifteens 24532 = true := by decide

/-- 5fd5: nibbles fold back to 24533; digit sum 38 ≡ 24533 (mod 15). -/
theorem enumeration_hex4_5fd5 : reassembles 24533 = true ∧ castsFifteens 24533 = true := by decide

/-- 5fd6: nibbles fold back to 24534; digit sum 39 ≡ 24534 (mod 15). -/
theorem enumeration_hex4_5fd6 : reassembles 24534 = true ∧ castsFifteens 24534 = true := by decide

/-- 5fd7: nibbles fold back to 24535; digit sum 40 ≡ 24535 (mod 15). -/
theorem enumeration_hex4_5fd7 : reassembles 24535 = true ∧ castsFifteens 24535 = true := by decide

/-- 5fd8: nibbles fold back to 24536; digit sum 41 ≡ 24536 (mod 15). -/
theorem enumeration_hex4_5fd8 : reassembles 24536 = true ∧ castsFifteens 24536 = true := by decide

/-- 5fd9: nibbles fold back to 24537; digit sum 42 ≡ 24537 (mod 15). -/
theorem enumeration_hex4_5fd9 : reassembles 24537 = true ∧ castsFifteens 24537 = true := by decide

/-- 5fda: nibbles fold back to 24538; digit sum 43 ≡ 24538 (mod 15). -/
theorem enumeration_hex4_5fda : reassembles 24538 = true ∧ castsFifteens 24538 = true := by decide

/-- 5fdb: nibbles fold back to 24539; digit sum 44 ≡ 24539 (mod 15). -/
theorem enumeration_hex4_5fdb : reassembles 24539 = true ∧ castsFifteens 24539 = true := by decide

/-- 5fdc: nibbles fold back to 24540; digit sum 45 ≡ 24540 (mod 15). -/
theorem enumeration_hex4_5fdc : reassembles 24540 = true ∧ castsFifteens 24540 = true := by decide

/-- 5fdd: nibbles fold back to 24541; digit sum 46 ≡ 24541 (mod 15). -/
theorem enumeration_hex4_5fdd : reassembles 24541 = true ∧ castsFifteens 24541 = true := by decide

/-- 5fde: nibbles fold back to 24542; digit sum 47 ≡ 24542 (mod 15). -/
theorem enumeration_hex4_5fde : reassembles 24542 = true ∧ castsFifteens 24542 = true := by decide

/-- 5fdf: nibbles fold back to 24543; digit sum 48 ≡ 24543 (mod 15). -/
theorem enumeration_hex4_5fdf : reassembles 24543 = true ∧ castsFifteens 24543 = true := by decide

/-- 5fe0: nibbles fold back to 24544; digit sum 34 ≡ 24544 (mod 15). -/
theorem enumeration_hex4_5fe0 : reassembles 24544 = true ∧ castsFifteens 24544 = true := by decide

/-- 5fe1: nibbles fold back to 24545; digit sum 35 ≡ 24545 (mod 15). -/
theorem enumeration_hex4_5fe1 : reassembles 24545 = true ∧ castsFifteens 24545 = true := by decide

/-- 5fe2: nibbles fold back to 24546; digit sum 36 ≡ 24546 (mod 15). -/
theorem enumeration_hex4_5fe2 : reassembles 24546 = true ∧ castsFifteens 24546 = true := by decide

/-- 5fe3: nibbles fold back to 24547; digit sum 37 ≡ 24547 (mod 15). -/
theorem enumeration_hex4_5fe3 : reassembles 24547 = true ∧ castsFifteens 24547 = true := by decide

/-- 5fe4: nibbles fold back to 24548; digit sum 38 ≡ 24548 (mod 15). -/
theorem enumeration_hex4_5fe4 : reassembles 24548 = true ∧ castsFifteens 24548 = true := by decide

/-- 5fe5: nibbles fold back to 24549; digit sum 39 ≡ 24549 (mod 15). -/
theorem enumeration_hex4_5fe5 : reassembles 24549 = true ∧ castsFifteens 24549 = true := by decide

/-- 5fe6: nibbles fold back to 24550; digit sum 40 ≡ 24550 (mod 15). -/
theorem enumeration_hex4_5fe6 : reassembles 24550 = true ∧ castsFifteens 24550 = true := by decide

/-- 5fe7: nibbles fold back to 24551; digit sum 41 ≡ 24551 (mod 15). -/
theorem enumeration_hex4_5fe7 : reassembles 24551 = true ∧ castsFifteens 24551 = true := by decide

/-- 5fe8: nibbles fold back to 24552; digit sum 42 ≡ 24552 (mod 15). -/
theorem enumeration_hex4_5fe8 : reassembles 24552 = true ∧ castsFifteens 24552 = true := by decide

/-- 5fe9: nibbles fold back to 24553; digit sum 43 ≡ 24553 (mod 15). -/
theorem enumeration_hex4_5fe9 : reassembles 24553 = true ∧ castsFifteens 24553 = true := by decide

/-- 5fea: nibbles fold back to 24554; digit sum 44 ≡ 24554 (mod 15). -/
theorem enumeration_hex4_5fea : reassembles 24554 = true ∧ castsFifteens 24554 = true := by decide

/-- 5feb: nibbles fold back to 24555; digit sum 45 ≡ 24555 (mod 15). -/
theorem enumeration_hex4_5feb : reassembles 24555 = true ∧ castsFifteens 24555 = true := by decide

/-- 5fec: nibbles fold back to 24556; digit sum 46 ≡ 24556 (mod 15). -/
theorem enumeration_hex4_5fec : reassembles 24556 = true ∧ castsFifteens 24556 = true := by decide

/-- 5fed: nibbles fold back to 24557; digit sum 47 ≡ 24557 (mod 15). -/
theorem enumeration_hex4_5fed : reassembles 24557 = true ∧ castsFifteens 24557 = true := by decide

/-- 5fee: nibbles fold back to 24558; digit sum 48 ≡ 24558 (mod 15). -/
theorem enumeration_hex4_5fee : reassembles 24558 = true ∧ castsFifteens 24558 = true := by decide

/-- 5fef: nibbles fold back to 24559; digit sum 49 ≡ 24559 (mod 15). -/
theorem enumeration_hex4_5fef : reassembles 24559 = true ∧ castsFifteens 24559 = true := by decide

/-- 5ff0: nibbles fold back to 24560; digit sum 35 ≡ 24560 (mod 15). -/
theorem enumeration_hex4_5ff0 : reassembles 24560 = true ∧ castsFifteens 24560 = true := by decide

/-- 5ff1: nibbles fold back to 24561; digit sum 36 ≡ 24561 (mod 15). -/
theorem enumeration_hex4_5ff1 : reassembles 24561 = true ∧ castsFifteens 24561 = true := by decide

/-- 5ff2: nibbles fold back to 24562; digit sum 37 ≡ 24562 (mod 15). -/
theorem enumeration_hex4_5ff2 : reassembles 24562 = true ∧ castsFifteens 24562 = true := by decide

/-- 5ff3: nibbles fold back to 24563; digit sum 38 ≡ 24563 (mod 15). -/
theorem enumeration_hex4_5ff3 : reassembles 24563 = true ∧ castsFifteens 24563 = true := by decide

/-- 5ff4: nibbles fold back to 24564; digit sum 39 ≡ 24564 (mod 15). -/
theorem enumeration_hex4_5ff4 : reassembles 24564 = true ∧ castsFifteens 24564 = true := by decide

/-- 5ff5: nibbles fold back to 24565; digit sum 40 ≡ 24565 (mod 15). -/
theorem enumeration_hex4_5ff5 : reassembles 24565 = true ∧ castsFifteens 24565 = true := by decide

/-- 5ff6: nibbles fold back to 24566; digit sum 41 ≡ 24566 (mod 15). -/
theorem enumeration_hex4_5ff6 : reassembles 24566 = true ∧ castsFifteens 24566 = true := by decide

/-- 5ff7: nibbles fold back to 24567; digit sum 42 ≡ 24567 (mod 15). -/
theorem enumeration_hex4_5ff7 : reassembles 24567 = true ∧ castsFifteens 24567 = true := by decide

/-- 5ff8: nibbles fold back to 24568; digit sum 43 ≡ 24568 (mod 15). -/
theorem enumeration_hex4_5ff8 : reassembles 24568 = true ∧ castsFifteens 24568 = true := by decide

/-- 5ff9: nibbles fold back to 24569; digit sum 44 ≡ 24569 (mod 15). -/
theorem enumeration_hex4_5ff9 : reassembles 24569 = true ∧ castsFifteens 24569 = true := by decide

/-- 5ffa: nibbles fold back to 24570; digit sum 45 ≡ 24570 (mod 15). -/
theorem enumeration_hex4_5ffa : reassembles 24570 = true ∧ castsFifteens 24570 = true := by decide

/-- 5ffb: nibbles fold back to 24571; digit sum 46 ≡ 24571 (mod 15). -/
theorem enumeration_hex4_5ffb : reassembles 24571 = true ∧ castsFifteens 24571 = true := by decide

/-- 5ffc: nibbles fold back to 24572; digit sum 47 ≡ 24572 (mod 15). -/
theorem enumeration_hex4_5ffc : reassembles 24572 = true ∧ castsFifteens 24572 = true := by decide

/-- 5ffd: nibbles fold back to 24573; digit sum 48 ≡ 24573 (mod 15). -/
theorem enumeration_hex4_5ffd : reassembles 24573 = true ∧ castsFifteens 24573 = true := by decide

/-- 5ffe: nibbles fold back to 24574; digit sum 49 ≡ 24574 (mod 15). -/
theorem enumeration_hex4_5ffe : reassembles 24574 = true ∧ castsFifteens 24574 = true := by decide

/-- 5fff: nibbles fold back to 24575; digit sum 50 ≡ 24575 (mod 15). -/
theorem enumeration_hex4_5fff : reassembles 24575 = true ∧ castsFifteens 24575 = true := by decide
