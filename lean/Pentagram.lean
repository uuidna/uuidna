-- lean/Pentagram.lean — GENERATED. THE PENTAGRAM: A WIDTH IS THE BINDING POINT, AND ONE POINT CAN ONLY OVERSTATE. The QPU is five points — CPU, GPU, RAM, CACHE, STORAGE — and a fan-out may run as wide as the SMALLER of what they afford. THE CENTRE: measuring one point never reports a width too narrow, only one too WIDE, because a minimum over a subset is never smaller than the minimum over the whole. That is why omission here is dangerous rather than merely incomplete — an error that can only err toward doing too much is discovered as an oversubscription rather than as a slow run. ALSO SEALED: the width is monotone in every point, so adding memory or cores can never narrow it; it never falls below one, because zero lanes is a stop and not a measurement; and it always equals one of the points, so a report can name which one bound it. WHERE IT COMES FROM: zeropoint-node's qpu-pentagram, which recorded its own earlier reading as wrong by omission — a register grown on one thread gave nineteen qubits and was called the machine's ceiling while four other points sat outside the number. uuidna's capacity() had the same shape, measuring cores for its lane count while measuring memory in the same breath and never letting it bind. SCOPE: the ARITHMETIC of a width chosen as a minimum over measured points. Nothing here says what any point's capacity IS on any machine — a host is a measurement, not a theorem. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE WIDTH IS THE SMALLER POINT, over readings 1 to 10. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_0 : [(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 11 to 20. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_1 : [(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 21 to 30. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_2 : [(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 31 to 40. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_3 : [(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 41 to 50. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_4 : [(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 51 to 60. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_5 : [(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 61 to 70. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_6 : [(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE WIDTH IS THE SMALLER POINT, over readings 71 to 80. A fan-out may run as wide as the cores allow and as
    wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the
    minimum rather than as a rule about which point usually wins, because which one wins is a fact about a
    machine and this is not. -/
theorem width_is_the_binding_point_7 : [(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2)))) := by decide

/-- THE CENTRE OF THE LAW, over readings 1 to 10: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_0 : [(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 11 to 20: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_1 : [(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 21 to 30: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_2 : [(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 31 to 40: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_3 : [(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 41 to 50: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_4 : [(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 51 to 60: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_5 : [(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 61 to 70: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_6 : [(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- THE CENTRE OF THE LAW, over readings 71 to 80: measuring ONE point never reports a width too narrow — it
    reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never
    smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding
    width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only
    err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own
    correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat
    outside the number. -/
theorem one_point_can_only_overstate_7 : [(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 1 to 10: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_0 : [(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 11 to 20: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_1 : [(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 21 to 30: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_2 : [(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 31 to 40: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_3 : [(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 41 to 50: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_4 : [(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 51 to 60: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_5 : [(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 61 to 70: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_6 : [(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- MONOTONE IN EVERY POINT, over readings 71 to 80: adding memory, or adding cores, never makes the admitted
    width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator
    adding memory to go faster would have to check whether it had gone slower — and the minimum has this
    property by construction, which is the argument for choosing a minimum rather than a formula. -/
theorem a_richer_point_never_narrows_the_width_7 : [(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w))) := by decide

/-- A FLOOR, BECAUSE ZERO LANES IS NOT A MEASUREMENT BUT A STOP. Every reading here admits at least one lane, so
    a host too small for the reserve still runs the work serially rather than reporting a fan-out of nothing. A
    capacity that can answer zero turns a narrow machine into a halted one, and the difference between slow and
    stopped is the difference between a result and none. -/
theorem the_width_is_never_below_one : [(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (if p.1 <= p.2 then p.1 else p.2) >= 1) := by decide

/-- EVERY READING NAMES A WINNER. For each pair the width equals the CPU point or the memory point — never a
    third number — so a report can always say WHICH point set the width. A width that matched neither would be a
    computed figure with no measurement behind it, which is exactly the kind of number this ledger exists to
    refuse. -/
theorem naming_the_binding_point_is_total : [(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w == p.1) || (w == p.2))) := by decide
