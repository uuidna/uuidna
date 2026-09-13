-- lean/Cyber.lean — GENERATED. CYBER — the resource surface the repository presents to the machine that builds it, measured. The handle store's 71,366 leaves occupy 257,650 inodes (256 / 43,450 / 71,211 / 71,366 folders per level plus the root), more than three per record; the deepest level is one folder per leaf by construction; the third level already shares, the control. Derived from the handle records, never from the host, so the ledger is identical on every machine. NOT CLAIMED: any host's limit, which is the host's own fact (on 2026-09-13 the build host's table held 263,168 entries and filled). Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A STORE'S COST TO ITS HOST IS COUNTED IN INODES, NOT RECORDS. 71,366 leaves sit under 256 + 43,450 + 71,211
    + 71,366 folders across the 4 levels, so with the root the store occupies 257,650 inodes — more than three
    for every record it holds. The floor is two by construction: the deepest folder is named by the whole handle
    and no two records share one, so that level holds exactly one folder per leaf (71,366 for 71,366), and every
    record costs its file and its own folder before any level above is counted. On 2026-09-13 that footprint
    filled the build host's vnode table and panicked the machine twice; a resource the host must hold per inode
    is the surface, and it is sealed here so the next growth is measured before it is felt. -/
theorem the_store_footprint_is_its_folders : (71366 + 256 + 43450 + 71211 + 71366 + 1 = 257650) ∧ (257650 > 3 * 71366) := by decide

/-- THE CONTROL: SHARING DOES OCCUR ABOVE THE LEAF. At the third level 71,211 folders hold 71,366 leaves — fewer
    folders than leaves, so some six-digit prefixes are shared — which shows the footprint is a measurement of
    this store and not a constant two-per-record identity that would pass whatever the store held. -/
theorem the_third_level_already_shares : 71211 < 71366 := by decide
