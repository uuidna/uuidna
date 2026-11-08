import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOMOGRAPHY — IMAGING A VOLUME SLICE BY SLICE, AS ARITHMETIC (reconstructing a body from its projections). Scanning
 *  is numbers: the slices that cover a length, the projections taken over the rotation, the voxels in the volume, the
 *  backprojection work, the Hounsfield density, the helical pitch, the exposure, and the detector coverage. Crosses to
 *  `radiology` — tomography is what radiology reads. A measure. */

const PROOF = 'tomography arithmetic (slices, projections, voxels, reconstruction, Hounsfield units, helical pitch, exposure, coverage); imaging a volume from its projections; a measure crossed to radiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tomography', dst: 'radiology', formula, value, proof: PROOF, ...extra }, holds, { name: `tomography.${name}`, params })

export class TomographyFormulas {
  /** SLICES: how many slices of a thickness cover a scan length. value ⌊length / thickness⌋. */
  static slices(length: number, thickness: number): CrossFormula { return c('tomography-slices', 'slices(length, thickness) = ⌊length / thickness⌋', thickness > 0 ? Math.floor(length / thickness) : 0, nat(length, thickness) && thickness > 0, 'slices', [length, thickness]) }
  /** PROJECTIONS: angular views taken over the rotations. value angles · rotations. */
  static projections(angles: number, rotations: number): CrossFormula { return c('tomography-projections', 'projections(angles, rotations) = angles · rotations', angles * rotations, nat(angles, rotations), 'projections', [angles, rotations]) }
  /** VOXELS: the elements of the reconstructed volume. value width · height · depth. */
  static voxels(width: number, height: number, depth: number): CrossFormula { return c('tomography-voxels', 'voxels(width, height, depth) = width · height · depth', width * height * depth, nat(width, height, depth), 'voxels', [width, height, depth]) }
  /** RECONSTRUCTION: backprojection work, one pass per projection over the grid. value projections · size. */
  static reconstruction(projections: number, size: number): CrossFormula { return c('tomography-reconstruction', 'reconstruction(projections, size) = projections · size', projections * size, nat(projections, size), 'reconstruction', [projections, size]) }
  /** HOUNSFIELD: density on the CT scale relative to water. value ⌊(attenuation − water) · 1000 / water⌋. */
  static hounsfield(attenuation: number, water: number): CrossFormula { return c('tomography-hounsfield', 'hounsfield(attenuation, water) = ⌊max(0, attenuation − water) · 1000 / water⌋', water > 0 ? Math.floor((Math.max(0, attenuation - water) * 1000) / water) : 0, nat(attenuation, water) && water > 0, 'hounsfield', [attenuation, water]) }
  /** PITCH: helical table travel per rotation over the collimation, as a percent. value ⌊travel · 100 / collimation⌋. */
  static pitch(travel: number, collimation: number): CrossFormula { return c('tomography-pitch', 'pitch(travel, collimation) = ⌊travel · 100 / collimation⌋', collimation > 0 ? Math.floor((travel * 100) / collimation) : 0, nat(travel, collimation) && collimation > 0, 'pitch', [travel, collimation]) }
  /** EXPOSURE: tube current over the exposure time, in mAs. value current · time. */
  static exposure(current: number, time: number): CrossFormula { return c('tomography-exposure', 'exposure(current, time) = current · time', current * time, nat(current, time), 'exposure', [current, time]) }
  /** COVERAGE: detector rows at a row width, the volume per rotation. value detectors · width. */
  static coverage(detectors: number, width: number): CrossFormula { return c('tomography-coverage', 'coverage(detectors, width) = detectors · width', detectors * width, nat(detectors, width), 'coverage', [detectors, width]) }
}

for (const name of ['coverage', 'exposure', 'hounsfield', 'pitch', 'projections', 'reconstruction', 'slices', 'voxels'] as const)
  hexRegisterOf('tomography', name, (TomographyFormulas[name] as (...x: unknown[]) => unknown).bind(TomographyFormulas))
