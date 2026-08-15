// Data loader for /vocabulary — the common computable vocabulary, derived from the compiled package (dist/), so Lean
// stays the single source. Each term self-audits by the honesty gate and folds (in trinities) to one receipt.
import { vocabulary } from '../../dist/index.js'

export type VData = ReturnType<typeof vocabulary>
declare const data: VData
export { data }

export default {
  watch: ['../../dist/index.js'],
  load(): VData { return vocabulary() },
}
