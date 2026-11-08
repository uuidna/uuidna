import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MASONRY — LAYING BRICK AND BLOCK, AS ARITHMETIC. Building a wall is numbers: the bricks an area needs, the mortar they
 *  take, the courses up a height, the bricks along a course (the bond), the wall area, the joint mortar, the area a pile
 *  covers, and the waste to order over. Crosses to `construction` — masonry is the trade construction schedules. A measure. */

const PROOF = 'masonry arithmetic (bricks per area, mortar, courses, bond, wall area, joints, coverage, waste); laying brick and block as integers; a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'masonry', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `masonry.${name}`, params })

export class MasonryFormulas {
  /** BRICKS: the bricks a wall area needs at a count per square metre. value area · perSqm. */
  static bricks(area: number, perSqm: number): CrossFormula { return c('masonry-bricks', 'bricks(area, perSqm) = area · perSqm', area * perSqm, nat(area, perSqm), 'bricks', [area, perSqm]) }
  /** MORTAR: the mortar those bricks take at a volume per brick. value bricks · perBrick. */
  static mortar(bricks: number, perBrick: number): CrossFormula { return c('masonry-mortar', 'mortar(bricks, perBrick) = bricks · perBrick', bricks * perBrick, nat(bricks, perBrick), 'mortar', [bricks, perBrick]) }
  /** COURSES: the courses up a height at a course height. value ⌊height / courseHeight⌋. */
  static courses(height: number, courseHeight: number): CrossFormula { return c('masonry-courses', 'courses(height, courseHeight) = ⌊height / courseHeight⌋', courseHeight > 0 ? Math.floor(height / courseHeight) : 0, nat(height, courseHeight) && courseHeight > 0, 'courses', [height, courseHeight]) }
  /** BOND: the bricks along a course at a brick length. value ⌊length / brickLength⌋. */
  static bond(length: number, brickLength: number): CrossFormula { return c('masonry-bond', 'bond(length, brickLength) = ⌊length / brickLength⌋', brickLength > 0 ? Math.floor(length / brickLength) : 0, nat(length, brickLength) && brickLength > 0, 'bond', [length, brickLength]) }
  /** WALL: the wall area from length and height. value length · height. */
  static wall(length: number, height: number): CrossFormula { return c('masonry-wall', 'wall(length, height) = length · height', length * height, nat(length, height), 'wall', [length, height]) }
  /** JOINT: the joint mortar over the courses at a thickness each. value courses · thickness. */
  static joint(courses: number, thickness: number): CrossFormula { return c('masonry-joint', 'joint(courses, thickness) = courses · thickness', courses * thickness, nat(courses, thickness), 'joint', [courses, thickness]) }
  /** COVERAGE: the area a pile of bricks covers at a count per square metre. value ⌊bricks / perSqm⌋. */
  static coverage(bricks: number, perSqm: number): CrossFormula { return c('masonry-coverage', 'coverage(bricks, perSqm) = ⌊bricks / perSqm⌋', perSqm > 0 ? Math.floor(bricks / perSqm) : 0, nat(bricks, perSqm) && perSqm > 0, 'coverage', [bricks, perSqm]) }
  /** WASTE: the bricks to order over as a percentage. value ⌊bricks · pct / 100⌋. */
  static waste(bricks: number, pct: number): CrossFormula { return c('masonry-waste', 'waste(bricks, pct) = ⌊bricks · pct / 100⌋', Math.floor((bricks * pct) / 100), nat(bricks, pct), 'waste', [bricks, pct]) }
}

for (const name of ['bond', 'bricks', 'courses', 'coverage', 'joint', 'mortar', 'wall', 'waste'] as const)
  hexRegisterOf('masonry', name, (MasonryFormulas[name] as (...x: unknown[]) => unknown).bind(MasonryFormulas))
