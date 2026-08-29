// terminal-meaning — /terminal's sealed install-port spec. Wet: reads the default install.
// The Vue monitor must not import this file (verify_beats_recompute_by_magnitudes).
import { installFor } from '../os/index.js'

/** meaningOf() → the sealed meaning of the path this terminal serves — straight from the default-install
 *  port, never restated by hand. */
export function meaningOf(): string {
  const spec = installFor('/terminal')
  return spec
    ? `/terminal means ${spec.id} ${spec.version} — "${spec.meaning}" (address ${spec.address}, sealed: the_terminal_is_the_toolbox)`
    : '/terminal — the sealed spec is not in this build (the mirror moved?); the audit page carries the answer'
}
