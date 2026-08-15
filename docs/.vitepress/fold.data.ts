// fold.data — THE MIRROR OF THE ONE RECEIPT: the frontend reads the sealed quantum-fold.json so the site shows
// exactly what the backend sealed — the rosette rays (no line privileged), the concurrence, the linear receipt as
// the measured reading, the aura, the equilibrium as data. Standards met: frontend reflects backend in singularity.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default {
  watch: ['../../quantum-fold.json'],
  load() {
    try {
      return JSON.parse(readFileSync(join(__dirname, '../../quantum-fold.json'), 'utf8'))
    } catch {
      return null
    }
  },
}
