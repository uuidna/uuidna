// involution-seals — VE + Wave + finite-infinity KEY LISTS as a leaf.
//
// These names are occupancy of the sealed ledger, not a second court. They lived in prepublish-seal.ts, which
// loads the whole publication gate; phd-proofs needed only the names and, on Node 26, hit TDZ because the gate
// graph cycles back through the package barrel before the arrays initialise. A leaf module has no imports, so
// the names exist before anyone calls the gate.
export const VECTOR_EQUILIBRIUM_INVOLUTIONS: readonly string[] = [
  'radial_equals_edge',
  'dz_involution_digits',
  'orbits_closed_involution',
  'missing_pair_involution',
  'dz_two_fixedpoints',
  've_twelve_vertices',
  'radial_squares_to_two',
  've_four_neighbours',
  've_handshake_crosses',
  've_twentyfour_edges',
  've_fourteen_faces',
  'euler_characteristic_two',
  'metatron_seventyeight_lines',
  've_double_five_merges_in_ten',
  'void_folds_at_quadrature',
  've_pentads_overlap_to_eight',
  'theorems_interact_as_faces',
  'imagine_all_as_clique_faces',
] as const

export const WAVE_INVOLUTION_SEALS: readonly string[] = [
  'lights_out_flip_involution',
  'involution_walks_home_in_two',
  'involution_replaces_the_raised_ceiling',
] as const

export const FINITE_INFINITY_GRANTS: readonly string[] = [
  'involution_replaces_the_raised_ceiling',
  'involution_counts_obey_their_recurrence',
  'n_qubit_dimension',
  'no_wing_buys_its_own_ceiling',
] as const
