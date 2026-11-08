import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HUFFMAN — PREFIX-CODE COMPRESSION, AS ARITHMETIC. A Huffman code is numbers: the average bits a symbol costs, how far the
 *  original shrinks, the nodes a full binary code tree holds, the bits a code saves, the length a run of codes spends, a
 *  symbol's weighted path, the leaves under a node count, and how close the code sits to optimal. Crosses to `signal` —
 *  huffman is the code a signal is squeezed into. A measure. */

const PROOF = 'huffman arithmetic (average length, compression ratio, tree nodes, saved bits, code length, weighted path, leaf count, efficiency); a prefix-code measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'huffman', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `huffman.${name}`, params })

export class HuffmanFormulas {
  /** AVERAGE LENGTH: total code bits over the symbols coded. value ⌊totalbits / symbols⌋. */
  static averagelength(totalbits: number, symbols: number): CrossFormula { return c('huffman-averagelength', 'averagelength(totalbits, symbols) = ⌊totalbits / symbols⌋', symbols > 0 ? Math.floor(totalbits / symbols) : 0, nat(totalbits, symbols) && symbols > 0, 'averagelength', [totalbits, symbols]) }
  /** CODE LENGTH: a run of symbols each a fixed number of bits. value count · bits. */
  static codelength(count: number, bits: number): CrossFormula { return c('huffman-codelength', 'codelength(count, bits) = count · bits', count * bits, nat(count, bits), 'codelength', [count, bits]) }
  /** COMPRESSION RATIO as a percentage of the compressed size. value ⌊original · 100 / compressed⌋. */
  static compressionratio(original: number, compressed: number): CrossFormula { return c('huffman-compressionratio', 'compressionratio(original, compressed) = ⌊original · 100 / compressed⌋', compressed > 0 ? Math.floor((original * 100) / compressed) : 0, nat(original, compressed) && compressed > 0, 'compressionratio', [original, compressed]) }
  /** EFFICIENCY: optimal bits against the bits actually used, as a percentage. value ⌊optimal · 100 / actual⌋. */
  static efficiency(optimal: number, actual: number): CrossFormula { return c('huffman-efficiency', 'efficiency(optimal, actual) = ⌊optimal · 100 / actual⌋', actual > 0 ? Math.floor((optimal * 100) / actual) : 0, nat(optimal, actual) && actual > 0, 'efficiency', [optimal, actual]) }
  /** LEAF COUNT: the leaves under a full binary code tree of a given node count. value ⌊(nodes + 1) / 2⌋. */
  static leafcount(nodes: number): CrossFormula { return c('huffman-leafcount', 'leafcount(nodes) = ⌊(nodes + 1) / 2⌋', Math.floor((nodes + 1) / 2), nat(nodes), 'leafcount', [nodes]) }
  /** SAVED BITS: the bits a code drops from the original. value max(0, original − compressed). */
  static savedbits(original: number, compressed: number): CrossFormula { return c('huffman-savedbits', 'savedbits(original, compressed) = max(0, original − compressed)', Math.max(0, original - compressed), nat(original, compressed), 'savedbits', [original, compressed]) }
  /** TREE NODES: the nodes a full binary code tree holds over its leaves. value max(0, 2 · leaves − 1). */
  static treenodes(leaves: number): CrossFormula { return c('huffman-treenodes', 'treenodes(leaves) = 2 · leaves − 1', Math.max(0, 2 * leaves - 1), nat(leaves), 'treenodes', [leaves]) }
  /** WEIGHTED PATH: a symbol's frequency times its depth in the code tree. value freq · depth. */
  static weightedpath(freq: number, depth: number): CrossFormula { return c('huffman-weightedpath', 'weightedpath(freq, depth) = freq · depth', freq * depth, nat(freq, depth), 'weightedpath', [freq, depth]) }
}

for (const name of ['averagelength', 'codelength', 'compressionratio', 'efficiency', 'leafcount', 'savedbits', 'treenodes', 'weightedpath'] as const)
  hexRegisterOf('huffman', name, (HuffmanFormulas[name] as (...x: unknown[]) => unknown).bind(HuffmanFormulas))
