/** The products qpu closes, and the sealed Lean theorems each one cites: nothing else. Every sentence of a product's
 *  description is read from the Lean inline docs of the theorems it cites (and their module's doc) by
 *  src/scripts/closeProducts.ts through /api/mcp (textbook { theorem }, which serves the kernel index's docs and axioms),
 *  each doc an ISO/IEC 25051:2014 test prompt whose test is the theorem itself, as the kernel reports it, and the receipt.
 *  A function with no theorem doc ships as a known limitation. */

export type Shots = 'exact' | number

export type ProductClaim = {
  slug: string
  /** identification (5.1.3.1): the product's name */
  title: string
  /** the circuit family the product prepares; the generator builds each variant's program from it */
  family: 'ghz'
  /** variants: simulated qubit counts × shots */
  qubits: number[]
  shots: Shots[]
  /** the theorem (qpu's kernel index) each qubit count's exact state vector cites */
  theorems: Record<number, string>
}

export const PRODUCT_CLAIMS: ProductClaim[] = [
  {
    slug: 'ghz-state-exactly-simulated',
    title: 'GHZ state, exactly simulated',
    family: 'ghz',
    qubits: [2, 3],
    shots: ['exact', 8],
    theorems: { 2: 'QuantumEntanglement.bell_state', 3: 'QuantumEntanglement.ghz_state' },
  },
]
