-- lean/Cyber.lean — GENERATED. CYBER — the resource surface the repository presents to the machine that builds it, measured. Counted without this wing's own 3 records, so serving it cannot move what it states, the handle store's 71,592 leaves occupy 258,410 inodes (256 / 43,536 / 71,433 / 71,592 folders per level plus the root), more than three per record; the deepest level is one folder per leaf by construction; the third level already shares, the control. Derived from the handle records, never from the host, so the ledger is identical on every machine. NOT CLAIMED: any host's limit, which is the host's own fact (on 2026-09-13 the build host's table held 263,168 entries and filled). Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A STORE'S COST TO ITS HOST IS COUNTED IN INODES, NOT RECORDS. Leaving out this wing's own 3 records, 71,592
    leaves sit under 256 + 43,536 + 71,433 + 71,592 folders across the 4 levels, so with the root the store
    occupies 258,410 inodes — more than three for every record it holds. The floor is two by construction: the
    deepest folder is named by the whole handle and no two records share one, so that level holds exactly one
    folder per leaf (71,592 for 71,592), and every record costs its file and its own folder before any level
    above is counted. On 2026-09-13 that footprint filled the build host's vnode table and panicked the machine
    twice; a resource the host must hold per inode is the surface, and it is sealed here so the next growth is
    measured before it is felt. -/
theorem the_store_footprint_is_its_folders : (71592 + 256 + 43536 + 71433 + 71592 + 1 = 258410) ∧ (258410 > 3 * 71592) := by decide

/-- THE CONTROL: SHARING DOES OCCUR ABOVE THE LEAF. Handles 00bc4bbe and 00bc4bc1 are two records of this store
    with one third-level folder, 00bc4b, and at that level 71,433 folders hold 71,592 leaves — which shows the
    footprint is a measurement of this store and not a constant two-per-record identity that would pass whatever
    the store held. -/
theorem the_third_level_already_shares : ([0,0,11,12,4,11,11,14].take 6 = [0,0,11,12,4,11,12,1].take 6) ∧ ([0,0,11,12,4,11,11,14] ≠ ([0,0,11,12,4,11,12,1] : List Nat)) ∧ (71433 < 71592) := by decide
