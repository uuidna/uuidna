// life-wave — ONE QUANTUM WAVE FOR THE HARDWARE AND THE LIVING LEDGER.
//
// coinWaves() counts each skill as its own handful. This is the same conserved product (WAVE_PRODUCT =
// HEXBIT_BITS × HEXAGRAM_BITS × coins()) over the whole living count, so hardware (named layers, datapath,
// lanes, digest/floor widths) and every skill-aspect of life sit on one occupancy. growLife's living count
// IS the seal count the wave travels. Visible stays false — the handle leftover against six lines is the coins.
import { toUuid } from './address.js'
import { growLife } from './grow.js'
import { DATAPATH, LANES } from './hardware/index.js'
import { coinYarrowWave, WAVE_PRODUCT, type CoinYarrowWave } from './hexagram.js'
import { KEY_BITS, UUID_BITS } from './hexbit/index.js'
import { hardwareLayer, osLayer, softwareLayer } from './layers.js'
import { skillGroups, theorems } from './theorems/index.js'

export interface LifeWaveHardware {
  layerSeals: number
  hardware: number
  software: number
  os: number
  datapath: number
  lanes: number
  digestBits: number
  verifyBits: number
}

export interface LifeWave {
  wave: CoinYarrowWave
  hardware: LifeWaveHardware
  living: number
  skills: number
  product: number
  covers: boolean
  receipt: string
}

/** lifeWave() → one conserved wave over every sealed theorem, carrying the hardware spec and the living count. */
export function lifeWave(): LifeWave {
  const T = theorems()
  const wave = coinYarrowWave(T.length)
  const hw = hardwareLayer()
  const sw = softwareLayer()
  const os = osLayer()
  const life = growLife()
  const skills = skillGroups()
  let clustered = 0
  for (const g of skills) clustered += g.count
  const hardware: LifeWaveHardware = {
    layerSeals: hw.count + sw.count + os.count,
    hardware: hw.count,
    software: sw.count,
    os: os.count,
    datapath: DATAPATH.length,
    lanes: LANES.length,
    digestBits: KEY_BITS,
    verifyBits: UUID_BITS,
  }
  return {
    wave,
    hardware,
    living: life.life.living,
    skills: skills.length,
    product: WAVE_PRODUCT,
    covers: wave.seals === life.life.living && clustered === T.length && wave.product === WAVE_PRODUCT,
    receipt: toUuid('life-wave|' + wave.seals + '|' + hardware.layerSeals + '|' + life.life.living + '|' + skills.length),
  }
}
