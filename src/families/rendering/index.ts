import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RENDERING — THE FRAME, AS ARITHMETIC (chosen by the public-API registry, not by hand). Drawing a picture is numbers:
 *  frames per second, the triangles a strip holds, the pixels on screen, rays times bounces, the fraction culled, samples
 *  times lights, frame latency, and the fill rate a clock sustains. Crosses to `layout` — rendering is what layout draws. A
 *  measure. */

const PROOF = 'rendering arithmetic (fps, triangle-strip count, pixels, raytracing, culling, shading, latency, fillrate); the frame as a measure crossed to layout'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rendering', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `rendering.${name}`, params })

export class RenderingFormulas {
  /** FRAMES PER SECOND: frames drawn over the seconds elapsed. value ⌊frames / seconds⌋. */
  static fps(frames: number, seconds: number): CrossFormula { return c('rendering-fps', 'fps(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'fps', [frames, seconds]) }
  /** TRIANGLE STRIP: the triangles a strip of vertices holds. value vertices − 2. */
  static triangles(vertices: number): CrossFormula { return c('rendering-triangles', 'triangles(vertices) = vertices − 2', vertices > 2 ? vertices - 2 : 0, nat(vertices), 'triangles', [vertices]) }
  /** PIXELS on screen: width by height. value width · height. */
  static pixels(width: number, height: number): CrossFormula { return c('rendering-pixels', 'pixels(width, height) = width · height', width * height, nat(width, height), 'pixels', [width, height]) }
  /** RAYTRACING: rays times the bounces each takes. value rays · bounces. */
  static raytracing(rays: number, bounces: number): CrossFormula { return c('rendering-raytracing', 'raytracing(rays, bounces) = rays · bounces', rays * bounces, nat(rays, bounces), 'raytracing', [rays, bounces]) }
  /** CULLING: the percentage of the scene still drawn. value ⌊visible · 100 / total⌋. */
  static culling(visible: number, total: number): CrossFormula { return c('rendering-culling', 'culling(visible, total) = ⌊visible · 100 / total⌋', total > 0 ? Math.floor((visible * 100) / total) : 0, nat(visible, total) && total > 0 && visible <= total, 'culling', [visible, total]) }
  /** SHADING: samples times the lights each shades. value samples · lights. */
  static shading(samples: number, lights: number): CrossFormula { return c('rendering-shading', 'shading(samples, lights) = samples · lights', samples * lights, nat(samples, lights), 'shading', [samples, lights]) }
  /** FRAME LATENCY: milliseconds the frames take at a refresh rate. value ⌊frames · 1000 / refresh⌋. */
  static latency(frames: number, refresh: number): CrossFormula { return c('rendering-latency', 'latency(frames, refresh) = ⌊frames · 1000 / refresh⌋', refresh > 0 ? Math.floor((frames * 1000) / refresh) : 0, nat(frames, refresh) && refresh > 0, 'latency', [frames, refresh]) }
  /** FILL RATE: pixels a clock sustains. value pixels · clock. */
  static fillrate(pixels_: number, clock: number): CrossFormula { return c('rendering-fillrate', 'fillrate(pixels, clock) = pixels · clock', pixels_ * clock, nat(pixels_, clock), 'fillrate', [pixels_, clock]) }
}

for (const name of ['culling', 'fillrate', 'fps', 'latency', 'pixels', 'raytracing', 'shading', 'triangles'] as const)
  hexRegisterOf('rendering', name, (RenderingFormulas[name] as (...x: unknown[]) => unknown).bind(RenderingFormulas))
