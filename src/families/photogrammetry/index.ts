import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOGRAMMETRY — RECONSTRUCTING THE WORLD FROM OVERLAPPING IMAGES, AS ARITHMETIC. The scale a lens and altitude fix,
 *  the overlap between frames, the ground sample distance, the baseline between shots, parallax, accuracy, the tie points
 *  matched, and the points reconstructed per image. Crosses to `cartography` — photogrammetry is what the map is drawn
 *  from. A measure. */

const PROOF = 'photogrammetry arithmetic (scale, overlap, ground sample distance, baseline, parallax, accuracy, tie points, reconstruction); reconstructing the world from overlapping images; a measure crossed to cartography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photogrammetry', dst: 'cartography', formula, value, proof: PROOF, ...extra }, holds, { name: `photogrammetry.${name}`, params })

export class PhotogrammetryFormulas {
  /** SCALE: the image scale a focal length sets at an altitude. value ⌊focal · 1000000 / altitude⌋. */
  static scale(focal: number, altitude: number): CrossFormula { return c('photogrammetry-scale', 'scale(focal, altitude) = ⌊focal · 1000000 / altitude⌋', altitude > 0 ? Math.floor((focal * 1000000) / altitude) : 0, nat(focal, altitude) && altitude > 0, 'scale', [focal, altitude]) }
  /** OVERLAP: the shared portion of a frame as a percentage. value ⌊shared · 100 / frame⌋. */
  static overlap(shared: number, frame: number): CrossFormula { return c('photogrammetry-overlap', 'overlap(shared, frame) = ⌊shared · 100 / frame⌋', frame > 0 ? Math.floor((shared * 100) / frame) : 0, nat(shared, frame) && frame > 0 && shared <= frame, 'overlap', [shared, frame]) }
  /** GROUND SAMPLE DISTANCE: a proxy from pixel size and altitude. value ⌊pixel · altitude / 1000⌋. */
  static gsd(pixel: number, altitude: number): CrossFormula { return c('photogrammetry-gsd', 'gsd(pixel, altitude) = ⌊pixel · altitude / 1000⌋', Math.floor((pixel * altitude) / 1000), nat(pixel, altitude), 'gsd', [pixel, altitude]) }
  /** BASE DISTANCE: the baseline between shots at a forward overlap. value ⌊altitude · (100 − overlap) / 100⌋. */
  static basedistance(altitude: number, overlap_: number): CrossFormula { return c('photogrammetry-basedistance', 'basedistance(altitude, overlap) = ⌊altitude · (100 − overlap) / 100⌋', Math.floor((altitude * (100 - overlap_)) / 100), nat(altitude, overlap_) && overlap_ <= 99, 'basedistance', [altitude, overlap_]) }
  /** PARALLAX: displacement over the baseline as a percentage. value ⌊displacement · 100 / base⌋. */
  static parallax(displacement: number, base: number): CrossFormula { return c('photogrammetry-parallax', 'parallax(displacement, base) = ⌊displacement · 100 / base⌋', base > 0 ? Math.floor((displacement * 100) / base) : 0, nat(displacement, base) && base > 0, 'parallax', [displacement, base]) }
  /** ACCURACY: error relative to distance, scaled. value ⌊error · 10000 / distance⌋. */
  static accuracy(error: number, distance: number): CrossFormula { return c('photogrammetry-accuracy', 'accuracy(error, distance) = ⌊error · 10000 / distance⌋', distance > 0 ? Math.floor((error * 10000) / distance) : 0, nat(error, distance) && distance > 0, 'accuracy', [error, distance]) }
  /** TIE POINTS: matched points over the candidates as a percentage. value ⌊matched · 100 / candidates⌋. */
  static tiepoints(matched: number, candidates: number): CrossFormula { return c('photogrammetry-tiepoints', 'tiepoints(matched, candidates) = ⌊matched · 100 / candidates⌋', candidates > 0 ? Math.floor((matched * 100) / candidates) : 0, nat(matched, candidates) && candidates > 0 && matched <= candidates, 'tiepoints', [matched, candidates]) }
  /** RECONSTRUCTION: points recovered per image. value ⌊points / images⌋. */
  static reconstruction(points: number, images: number): CrossFormula { return c('photogrammetry-reconstruction', 'reconstruction(points, images) = ⌊points / images⌋', images > 0 ? Math.floor(points / images) : 0, nat(points, images) && images > 0, 'reconstruction', [points, images]) }
}

for (const name of ['accuracy', 'basedistance', 'gsd', 'overlap', 'parallax', 'reconstruction', 'scale', 'tiepoints'] as const)
  hexRegisterOf('photogrammetry', name, (PhotogrammetryFormulas[name] as (...x: unknown[]) => unknown).bind(PhotogrammetryFormulas))
