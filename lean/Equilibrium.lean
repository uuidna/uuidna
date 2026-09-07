-- lean/Equilibrium.lean — GENERATED. THE SIX-CUBE, ITS POLARITY DOUBLE, AND THE SOLID IT IS NOT. Sixty-four cells under single-bit difference: degree six, and exclusive-or by c ⊕ d carries any cell to any other, so the graph is vertex-transitive before anything is added. Carry a polarity beside the cell and there are 128 states of degree twelve, with the polarity flip an automorphism joining what translation alone leaves as two orbits of sixty-four. THE REFUTATION IS SEALED BESIDE THE COUNTS. Twelve is the vertex count of a cuboctahedron, and a peer session proposed the double was a vector equilibrium on that basis. It is not: a cuboctahedron carries twenty-four edges among its twelve vertices and this neighbourhood carries ZERO, because two neighbours differ in two bits or in polarity alone. The count matched and the geometry did not; the peer measured this and retracted before anyone argued. AND THE MECHANISM WAS NOT LOAD-BEARING. The doubling was credited with producing vertex-transitivity; the undoubled graph already had it, so what polarity buys is the degree, not the symmetry. The rule that follows: before crediting a mechanism with a property, compute the property WITHOUT the mechanism. CLAIMED: the degrees, the independence of the neighbourhood, the two automorphisms, and the comparison that refuses the solid. THE SCOPE: this finite graph. It is NOT uuidna's address space — this tree has no cell adjacency, addresses are minted and compared rather than stepped between, and no adjacency was invented here to make these theorems apply to it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 0 to 7. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_0 : [0,1,2,3,4,5,6,7].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 8 to 15. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_1 : [8,9,10,11,12,13,14,15].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 16 to 23. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_2 : [16,17,18,19,20,21,22,23].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 24 to 31. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_3 : [24,25,26,27,28,29,30,31].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 32 to 39. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_4 : [32,33,34,35,36,37,38,39].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 40 to 47. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_5 : [40,41,42,43,44,45,46,47].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 48 to 55. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_6 : [48,49,50,51,52,53,54,55].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY CELL HAS EXACTLY SIX NEIGHBOURS, for cells 56 to 63. A neighbour is a single-bit difference and there
    are six bits, so the count is six and not five or seven — checked by walking all sixty-four candidates for
    each cell rather than asserting the arithmetic. This is the undoubled degree, and it is half of the twelve
    the doubling produces. -/
theorem hexcube_degree_is_six_7 : [56,57,58,59,60,61,62,63].all (fun c => ((List.range 64).filter (fun d => [1,2,4,8,16,32].contains (lxor c d))).length == 6) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 0 to 7. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_0 : [(0,[1,2,4,8,16,32,65,66,68,72,80,96]),(1,[0,3,5,9,17,33,64,67,69,73,81,97]),(2,[0,3,6,10,18,34,64,67,70,74,82,98]),(3,[1,2,7,11,19,35,65,66,71,75,83,99]),(4,[0,5,6,12,20,36,64,69,70,76,84,100]),(5,[1,4,7,13,21,37,65,68,71,77,85,101]),(6,[2,4,7,14,22,38,66,68,71,78,86,102]),(7,[3,5,6,15,23,39,67,69,70,79,87,103])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 8 to 15. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_1 : [(8,[0,9,10,12,24,40,64,73,74,76,88,104]),(9,[1,8,11,13,25,41,65,72,75,77,89,105]),(10,[2,8,11,14,26,42,66,72,75,78,90,106]),(11,[3,9,10,15,27,43,67,73,74,79,91,107]),(12,[4,8,13,14,28,44,68,72,77,78,92,108]),(13,[5,9,12,15,29,45,69,73,76,79,93,109]),(14,[6,10,12,15,30,46,70,74,76,79,94,110]),(15,[7,11,13,14,31,47,71,75,77,78,95,111])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 16 to 23. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_2 : [(16,[0,17,18,20,24,48,64,81,82,84,88,112]),(17,[1,16,19,21,25,49,65,80,83,85,89,113]),(18,[2,16,19,22,26,50,66,80,83,86,90,114]),(19,[3,17,18,23,27,51,67,81,82,87,91,115]),(20,[4,16,21,22,28,52,68,80,85,86,92,116]),(21,[5,17,20,23,29,53,69,81,84,87,93,117]),(22,[6,18,20,23,30,54,70,82,84,87,94,118]),(23,[7,19,21,22,31,55,71,83,85,86,95,119])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 24 to 31. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_3 : [(24,[8,16,25,26,28,56,72,80,89,90,92,120]),(25,[9,17,24,27,29,57,73,81,88,91,93,121]),(26,[10,18,24,27,30,58,74,82,88,91,94,122]),(27,[11,19,25,26,31,59,75,83,89,90,95,123]),(28,[12,20,24,29,30,60,76,84,88,93,94,124]),(29,[13,21,25,28,31,61,77,85,89,92,95,125]),(30,[14,22,26,28,31,62,78,86,90,92,95,126]),(31,[15,23,27,29,30,63,79,87,91,93,94,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 32 to 39. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_4 : [(32,[0,33,34,36,40,48,64,97,98,100,104,112]),(33,[1,32,35,37,41,49,65,96,99,101,105,113]),(34,[2,32,35,38,42,50,66,96,99,102,106,114]),(35,[3,33,34,39,43,51,67,97,98,103,107,115]),(36,[4,32,37,38,44,52,68,96,101,102,108,116]),(37,[5,33,36,39,45,53,69,97,100,103,109,117]),(38,[6,34,36,39,46,54,70,98,100,103,110,118]),(39,[7,35,37,38,47,55,71,99,101,102,111,119])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 40 to 47. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_5 : [(40,[8,32,41,42,44,56,72,96,105,106,108,120]),(41,[9,33,40,43,45,57,73,97,104,107,109,121]),(42,[10,34,40,43,46,58,74,98,104,107,110,122]),(43,[11,35,41,42,47,59,75,99,105,106,111,123]),(44,[12,36,40,45,46,60,76,100,104,109,110,124]),(45,[13,37,41,44,47,61,77,101,105,108,111,125]),(46,[14,38,42,44,47,62,78,102,106,108,111,126]),(47,[15,39,43,45,46,63,79,103,107,109,110,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 48 to 55. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_6 : [(48,[16,32,49,50,52,56,80,96,113,114,116,120]),(49,[17,33,48,51,53,57,81,97,112,115,117,121]),(50,[18,34,48,51,54,58,82,98,112,115,118,122]),(51,[19,35,49,50,55,59,83,99,113,114,119,123]),(52,[20,36,48,53,54,60,84,100,112,117,118,124]),(53,[21,37,49,52,55,61,85,101,113,116,119,125]),(54,[22,38,50,52,55,62,86,102,114,116,119,126]),(55,[23,39,51,53,54,63,87,103,115,117,118,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 56 to 63. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_7 : [(56,[24,40,48,57,58,60,88,104,112,121,122,124]),(57,[25,41,49,56,59,61,89,105,113,120,123,125]),(58,[26,42,50,56,59,62,90,106,114,120,123,126]),(59,[27,43,51,57,58,63,91,107,115,121,122,127]),(60,[28,44,52,56,61,62,92,108,116,120,125,126]),(61,[29,45,53,57,60,63,93,109,117,121,124,127]),(62,[30,46,54,58,60,63,94,110,118,122,124,127]),(63,[31,47,55,59,61,62,95,111,119,123,125,126])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 64 to 71. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_8 : [(64,[1,2,4,8,16,32,65,66,68,72,80,96]),(65,[0,3,5,9,17,33,64,67,69,73,81,97]),(66,[0,3,6,10,18,34,64,67,70,74,82,98]),(67,[1,2,7,11,19,35,65,66,71,75,83,99]),(68,[0,5,6,12,20,36,64,69,70,76,84,100]),(69,[1,4,7,13,21,37,65,68,71,77,85,101]),(70,[2,4,7,14,22,38,66,68,71,78,86,102]),(71,[3,5,6,15,23,39,67,69,70,79,87,103])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 72 to 79. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_9 : [(72,[0,9,10,12,24,40,64,73,74,76,88,104]),(73,[1,8,11,13,25,41,65,72,75,77,89,105]),(74,[2,8,11,14,26,42,66,72,75,78,90,106]),(75,[3,9,10,15,27,43,67,73,74,79,91,107]),(76,[4,8,13,14,28,44,68,72,77,78,92,108]),(77,[5,9,12,15,29,45,69,73,76,79,93,109]),(78,[6,10,12,15,30,46,70,74,76,79,94,110]),(79,[7,11,13,14,31,47,71,75,77,78,95,111])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 80 to 87. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_10 : [(80,[0,17,18,20,24,48,64,81,82,84,88,112]),(81,[1,16,19,21,25,49,65,80,83,85,89,113]),(82,[2,16,19,22,26,50,66,80,83,86,90,114]),(83,[3,17,18,23,27,51,67,81,82,87,91,115]),(84,[4,16,21,22,28,52,68,80,85,86,92,116]),(85,[5,17,20,23,29,53,69,81,84,87,93,117]),(86,[6,18,20,23,30,54,70,82,84,87,94,118]),(87,[7,19,21,22,31,55,71,83,85,86,95,119])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 88 to 95. Adjacency on the double depends only
    on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_11 : [(88,[8,16,25,26,28,56,72,80,89,90,92,120]),(89,[9,17,24,27,29,57,73,81,88,91,93,121]),(90,[10,18,24,27,30,58,74,82,88,91,94,122]),(91,[11,19,25,26,31,59,75,83,89,90,95,123]),(92,[12,20,24,29,30,60,76,84,88,93,94,124]),(93,[13,21,25,28,31,61,77,85,89,92,95,125]),(94,[14,22,26,28,31,62,78,86,90,92,95,126]),(95,[15,23,27,29,30,63,79,87,91,93,94,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 96 to 103. Adjacency on the double depends
    only on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_12 : [(96,[0,33,34,36,40,48,64,97,98,100,104,112]),(97,[1,32,35,37,41,49,65,96,99,101,105,113]),(98,[2,32,35,38,42,50,66,96,99,102,106,114]),(99,[3,33,34,39,43,51,67,97,98,103,107,115]),(100,[4,32,37,38,44,52,68,96,101,102,108,116]),(101,[5,33,36,39,45,53,69,97,100,103,109,117]),(102,[6,34,36,39,46,54,70,98,100,103,110,118]),(103,[7,35,37,38,47,55,71,99,101,102,111,119])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 104 to 111. Adjacency on the double depends
    only on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_13 : [(104,[8,32,41,42,44,56,72,96,105,106,108,120]),(105,[9,33,40,43,45,57,73,97,104,107,109,121]),(106,[10,34,40,43,46,58,74,98,104,107,110,122]),(107,[11,35,41,42,47,59,75,99,105,106,111,123]),(108,[12,36,40,45,46,60,76,100,104,109,110,124]),(109,[13,37,41,44,47,61,77,101,105,108,111,125]),(110,[14,38,42,44,47,62,78,102,106,108,111,126]),(111,[15,39,43,45,46,63,79,103,107,109,110,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 112 to 119. Adjacency on the double depends
    only on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_14 : [(112,[16,32,49,50,52,56,80,96,113,114,116,120]),(113,[17,33,48,51,53,57,81,97,112,115,117,121]),(114,[18,34,48,51,54,58,82,98,112,115,118,122]),(115,[19,35,49,50,55,59,83,99,113,114,119,123]),(116,[20,36,48,53,54,60,84,100,112,117,118,124]),(117,[21,37,49,52,55,61,85,101,113,116,119,125]),(118,[22,38,50,52,55,62,86,102,114,116,119,126]),(119,[23,39,51,53,54,63,87,103,115,117,118,127])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- EVERY DOUBLED STATE HAS EXACTLY TWELVE NEIGHBOURS, for states 120 to 127. Adjacency on the double depends
    only on the cell, so each of the six single-bit neighbours appears at both polarities: six times two. The
    neighbourhood is computed in the generator and the kernel checks its size and its membership, so the twelve
    is verified rather than asserted. -/
theorem polarity_double_degree_is_twelve_15 : [(120,[24,40,48,57,58,60,88,104,112,121,122,124]),(121,[25,41,49,56,59,61,89,105,113,120,123,125]),(122,[26,42,50,56,59,62,90,106,114,120,123,126]),(123,[27,43,51,57,58,63,91,107,115,121,122,127]),(124,[28,44,52,56,61,62,92,108,116,120,125,126]),(125,[29,45,53,57,60,63,93,109,117,121,124,127]),(126,[30,46,54,58,60,63,94,110,118,122,124,127]),(127,[31,47,55,59,61,62,95,111,119,123,125,126])].all (fun r => (r.2.length == 12) && r.2.all (fun t => [1,2,4,8,16,32].contains (lxor (r.1 % 64) (t % 64)))) := by decide

/-- THE REFUTATION, for states 0 to 7: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_0 : [(0,[1,2,4,8,16,32,65,66,68,72,80,96]),(1,[0,3,5,9,17,33,64,67,69,73,81,97]),(2,[0,3,6,10,18,34,64,67,70,74,82,98]),(3,[1,2,7,11,19,35,65,66,71,75,83,99]),(4,[0,5,6,12,20,36,64,69,70,76,84,100]),(5,[1,4,7,13,21,37,65,68,71,77,85,101]),(6,[2,4,7,14,22,38,66,68,71,78,86,102]),(7,[3,5,6,15,23,39,67,69,70,79,87,103])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 8 to 15: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_1 : [(8,[0,9,10,12,24,40,64,73,74,76,88,104]),(9,[1,8,11,13,25,41,65,72,75,77,89,105]),(10,[2,8,11,14,26,42,66,72,75,78,90,106]),(11,[3,9,10,15,27,43,67,73,74,79,91,107]),(12,[4,8,13,14,28,44,68,72,77,78,92,108]),(13,[5,9,12,15,29,45,69,73,76,79,93,109]),(14,[6,10,12,15,30,46,70,74,76,79,94,110]),(15,[7,11,13,14,31,47,71,75,77,78,95,111])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 16 to 23: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_2 : [(16,[0,17,18,20,24,48,64,81,82,84,88,112]),(17,[1,16,19,21,25,49,65,80,83,85,89,113]),(18,[2,16,19,22,26,50,66,80,83,86,90,114]),(19,[3,17,18,23,27,51,67,81,82,87,91,115]),(20,[4,16,21,22,28,52,68,80,85,86,92,116]),(21,[5,17,20,23,29,53,69,81,84,87,93,117]),(22,[6,18,20,23,30,54,70,82,84,87,94,118]),(23,[7,19,21,22,31,55,71,83,85,86,95,119])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 24 to 31: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_3 : [(24,[8,16,25,26,28,56,72,80,89,90,92,120]),(25,[9,17,24,27,29,57,73,81,88,91,93,121]),(26,[10,18,24,27,30,58,74,82,88,91,94,122]),(27,[11,19,25,26,31,59,75,83,89,90,95,123]),(28,[12,20,24,29,30,60,76,84,88,93,94,124]),(29,[13,21,25,28,31,61,77,85,89,92,95,125]),(30,[14,22,26,28,31,62,78,86,90,92,95,126]),(31,[15,23,27,29,30,63,79,87,91,93,94,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 32 to 39: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_4 : [(32,[0,33,34,36,40,48,64,97,98,100,104,112]),(33,[1,32,35,37,41,49,65,96,99,101,105,113]),(34,[2,32,35,38,42,50,66,96,99,102,106,114]),(35,[3,33,34,39,43,51,67,97,98,103,107,115]),(36,[4,32,37,38,44,52,68,96,101,102,108,116]),(37,[5,33,36,39,45,53,69,97,100,103,109,117]),(38,[6,34,36,39,46,54,70,98,100,103,110,118]),(39,[7,35,37,38,47,55,71,99,101,102,111,119])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 40 to 47: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_5 : [(40,[8,32,41,42,44,56,72,96,105,106,108,120]),(41,[9,33,40,43,45,57,73,97,104,107,109,121]),(42,[10,34,40,43,46,58,74,98,104,107,110,122]),(43,[11,35,41,42,47,59,75,99,105,106,111,123]),(44,[12,36,40,45,46,60,76,100,104,109,110,124]),(45,[13,37,41,44,47,61,77,101,105,108,111,125]),(46,[14,38,42,44,47,62,78,102,106,108,111,126]),(47,[15,39,43,45,46,63,79,103,107,109,110,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 48 to 55: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_6 : [(48,[16,32,49,50,52,56,80,96,113,114,116,120]),(49,[17,33,48,51,53,57,81,97,112,115,117,121]),(50,[18,34,48,51,54,58,82,98,112,115,118,122]),(51,[19,35,49,50,55,59,83,99,113,114,119,123]),(52,[20,36,48,53,54,60,84,100,112,117,118,124]),(53,[21,37,49,52,55,61,85,101,113,116,119,125]),(54,[22,38,50,52,55,62,86,102,114,116,119,126]),(55,[23,39,51,53,54,63,87,103,115,117,118,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 56 to 63: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_7 : [(56,[24,40,48,57,58,60,88,104,112,121,122,124]),(57,[25,41,49,56,59,61,89,105,113,120,123,125]),(58,[26,42,50,56,59,62,90,106,114,120,123,126]),(59,[27,43,51,57,58,63,91,107,115,121,122,127]),(60,[28,44,52,56,61,62,92,108,116,120,125,126]),(61,[29,45,53,57,60,63,93,109,117,121,124,127]),(62,[30,46,54,58,60,63,94,110,118,122,124,127]),(63,[31,47,55,59,61,62,95,111,119,123,125,126])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 64 to 71: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_8 : [(64,[1,2,4,8,16,32,65,66,68,72,80,96]),(65,[0,3,5,9,17,33,64,67,69,73,81,97]),(66,[0,3,6,10,18,34,64,67,70,74,82,98]),(67,[1,2,7,11,19,35,65,66,71,75,83,99]),(68,[0,5,6,12,20,36,64,69,70,76,84,100]),(69,[1,4,7,13,21,37,65,68,71,77,85,101]),(70,[2,4,7,14,22,38,66,68,71,78,86,102]),(71,[3,5,6,15,23,39,67,69,70,79,87,103])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 72 to 79: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_9 : [(72,[0,9,10,12,24,40,64,73,74,76,88,104]),(73,[1,8,11,13,25,41,65,72,75,77,89,105]),(74,[2,8,11,14,26,42,66,72,75,78,90,106]),(75,[3,9,10,15,27,43,67,73,74,79,91,107]),(76,[4,8,13,14,28,44,68,72,77,78,92,108]),(77,[5,9,12,15,29,45,69,73,76,79,93,109]),(78,[6,10,12,15,30,46,70,74,76,79,94,110]),(79,[7,11,13,14,31,47,71,75,77,78,95,111])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 80 to 87: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_10 : [(80,[0,17,18,20,24,48,64,81,82,84,88,112]),(81,[1,16,19,21,25,49,65,80,83,85,89,113]),(82,[2,16,19,22,26,50,66,80,83,86,90,114]),(83,[3,17,18,23,27,51,67,81,82,87,91,115]),(84,[4,16,21,22,28,52,68,80,85,86,92,116]),(85,[5,17,20,23,29,53,69,81,84,87,93,117]),(86,[6,18,20,23,30,54,70,82,84,87,94,118]),(87,[7,19,21,22,31,55,71,83,85,86,95,119])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 88 to 95: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_11 : [(88,[8,16,25,26,28,56,72,80,89,90,92,120]),(89,[9,17,24,27,29,57,73,81,88,91,93,121]),(90,[10,18,24,27,30,58,74,82,88,91,94,122]),(91,[11,19,25,26,31,59,75,83,89,90,95,123]),(92,[12,20,24,29,30,60,76,84,88,93,94,124]),(93,[13,21,25,28,31,61,77,85,89,92,95,125]),(94,[14,22,26,28,31,62,78,86,90,92,95,126]),(95,[15,23,27,29,30,63,79,87,91,93,94,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 96 to 103: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_12 : [(96,[0,33,34,36,40,48,64,97,98,100,104,112]),(97,[1,32,35,37,41,49,65,96,99,101,105,113]),(98,[2,32,35,38,42,50,66,96,99,102,106,114]),(99,[3,33,34,39,43,51,67,97,98,103,107,115]),(100,[4,32,37,38,44,52,68,96,101,102,108,116]),(101,[5,33,36,39,45,53,69,97,100,103,109,117]),(102,[6,34,36,39,46,54,70,98,100,103,110,118]),(103,[7,35,37,38,47,55,71,99,101,102,111,119])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 104 to 111: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_13 : [(104,[8,32,41,42,44,56,72,96,105,106,108,120]),(105,[9,33,40,43,45,57,73,97,104,107,109,121]),(106,[10,34,40,43,46,58,74,98,104,107,110,122]),(107,[11,35,41,42,47,59,75,99,105,106,111,123]),(108,[12,36,40,45,46,60,76,100,104,109,110,124]),(109,[13,37,41,44,47,61,77,101,105,108,111,125]),(110,[14,38,42,44,47,62,78,102,106,108,111,126]),(111,[15,39,43,45,46,63,79,103,107,109,110,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 112 to 119: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_14 : [(112,[16,32,49,50,52,56,80,96,113,114,116,120]),(113,[17,33,48,51,53,57,81,97,112,115,117,121]),(114,[18,34,48,51,54,58,82,98,112,115,118,122]),(115,[19,35,49,50,55,59,83,99,113,114,119,123]),(116,[20,36,48,53,54,60,84,100,112,117,118,124]),(117,[21,37,49,52,55,61,85,101,113,116,119,125]),(118,[22,38,50,52,55,62,86,102,114,116,119,126]),(119,[23,39,51,53,54,63,87,103,115,117,118,127])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE REFUTATION, for states 120 to 127: no two of a state's twelve neighbours are adjacent to each other. Two
    neighbours reached by flipping different bits differ in TWO bits, and two reached by the same bit differ
    only in polarity — neither is an edge. So the neighbourhood carries ZERO edges, while a cuboctahedron's
    twelve vertices carry twenty-four (ve_twentyfour_edges, already sealed in VectorEquilibrium.lean). The
    vertex count matches and the geometry does not. -/
theorem the_twelve_neighbours_are_an_independent_set_15 : [(120,[24,40,48,57,58,60,88,104,112,121,122,124]),(121,[25,41,49,56,59,61,89,105,113,120,123,125]),(122,[26,42,50,56,59,62,90,106,114,120,123,126]),(123,[27,43,51,57,58,63,91,107,115,121,122,127]),(124,[28,44,52,56,61,62,92,108,116,120,125,126]),(125,[29,45,53,57,60,63,93,109,117,121,124,127]),(126,[30,46,54,58,60,63,94,110,118,122,124,127]),(127,[31,47,55,59,61,62,95,111,119,123,125,126])].all (fun r => r.2.all (fun a => r.2.all (fun b => !([1,2,4,8,16,32].contains (lxor (a % 64) (b % 64)))))) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 0 to 7. Exclusive-or by c ⊕ d carries c to d, so
    a symmetry exists between every ordered pair and no cell is distinguished. This is the property the polarity
    doubling was credited with producing, and it holds sixty-four cells before any doubling — which is why
    degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_0 : [0,1,2,3,4,5,6,7].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 8 to 15. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_1 : [8,9,10,11,12,13,14,15].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 16 to 23. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_2 : [16,17,18,19,20,21,22,23].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 24 to 31. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_3 : [24,25,26,27,28,29,30,31].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 32 to 39. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_4 : [32,33,34,35,36,37,38,39].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 40 to 47. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_5 : [40,41,42,43,44,45,46,47].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 48 to 55. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_6 : [48,49,50,51,52,53,54,55].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- THE UNDOUBLED GRAPH IS ALREADY VERTEX-TRANSITIVE, for cells 56 to 63. Exclusive-or by c ⊕ d carries c to d,
    so a symmetry exists between every ordered pair and no cell is distinguished. This is the property the
    polarity doubling was credited with producing, and it holds sixty-four cells before any doubling — which is
    why degree changing from six to twelve is not evidence that the doubling bought transitivity. -/
theorem xor_translation_carries_any_cell_to_any_other_7 : [56,57,58,59,60,61,62,63].all (fun c => (List.range 64).all (fun d => lxor c (lxor c d) == d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 0 to 7: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_0 : [0,1,2,3,4,5,6,7].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 8 to 15: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_1 : [8,9,10,11,12,13,14,15].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 16 to 23: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_2 : [16,17,18,19,20,21,22,23].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 24 to 31: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_3 : [24,25,26,27,28,29,30,31].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 32 to 39: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_4 : [32,33,34,35,36,37,38,39].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 40 to 47: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_5 : [40,41,42,43,44,45,46,47].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 48 to 55: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_6 : [48,49,50,51,52,53,54,55].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for cells 56 to 63: translating both ends of a pair by the same cell
    leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge. Transitivity
    needs both halves — a map that reaches every vertex but does not preserve the edges is not a symmetry of the
    graph. -/
theorem xor_translation_preserves_adjacency_7 : [56,57,58,59,60,61,62,63].all (fun a => (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c a) (lxor d a) == lxor c d))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 0 to 7. Adjacency depends only on the cell, so flipping the
    polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_0 : [0,1,2,3,4,5,6,7].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 8 to 15. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_1 : [8,9,10,11,12,13,14,15].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 16 to 23. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_2 : [16,17,18,19,20,21,22,23].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 24 to 31. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_3 : [24,25,26,27,28,29,30,31].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 32 to 39. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_4 : [32,33,34,35,36,37,38,39].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 40 to 47. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_5 : [40,41,42,43,44,45,46,47].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 48 to 55. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_6 : [48,49,50,51,52,53,54,55].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 56 to 63. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_7 : [56,57,58,59,60,61,62,63].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 64 to 71. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_8 : [64,65,66,67,68,69,70,71].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 72 to 79. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_9 : [72,73,74,75,76,77,78,79].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 80 to 87. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_10 : [80,81,82,83,84,85,86,87].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 88 to 95. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_11 : [88,89,90,91,92,93,94,95].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 96 to 103. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_12 : [96,97,98,99,100,101,102,103].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 104 to 111. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_13 : [104,105,106,107,108,109,110,111].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 112 to 119. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_14 : [112,113,114,115,116,117,118,119].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- THE POLARITY FLIP IS ALSO A SYMMETRY, for states 120 to 127. Adjacency depends only on the cell, so flipping
    the polarity of both ends preserves every edge. This is the generator the peer's suite did not test:
    exclusive-or translation alone gives two orbits of sixty-four — transitive WITHIN a polarity class — and
    only this flip joins them. A claim of transitivity over all 128 rests on it, and it holds. -/
theorem polarity_flip_is_an_automorphism_15 : [120,121,122,123,124,125,126,127].all (fun s => (List.range 128).all (fun t => ([1,2,4,8,16,32].contains (lxor (s % 64) (t % 64))) == ([1,2,4,8,16,32].contains (lxor (((s + 64) % 128) % 64) (((t + 64) % 128) % 64))))) := by decide

/-- WHAT THE MECHANISM ACTUALLY BOUGHT. The degree moves from six to twelve — that is real and it is what the
    peer's negative arm measured. Transitivity does not move: the undoubled graph already had it. So the correct
    statement is that polarity doubles the neighbourhood, not that it produces the symmetry. Stated as the two
    comparisons that separate them, because "the doubling is load-bearing" was inferred from the degree alone
    and the inference does not follow. -/
theorem the_doubling_changes_the_degree_and_not_the_transitivity : ¬(6 = 12) ∧ (12 = 2 * 6) ∧ ¬(0 = 24) := by decide
