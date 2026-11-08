import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BLOCKCHAIN — A LEDGER AS ARITHMETIC (chosen by the public-API registry, not by hand). A chain is numbers: transactions
 *  per second, the difficulty a hashrate meets, the time between blocks, how confirmed a transaction is, the fee a size
 *  pays, the leaves a Merkle tree carries, a validator's stake share, and how final a block is. Crosses to `code` — a
 *  ledger is a program that runs. A measure. */

const PROOF = 'blockchain arithmetic (throughput, difficulty, blocktime, confirmation, fee, merkle, stake, finality); a public-API domain; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'blockchain', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `blockchain.${name}`, params })

export class BlockchainFormulas {
  /** THROUGHPUT: transactions over seconds (TPS). value ⌊transactions / seconds⌋. */
  static throughput(transactions: number, seconds: number): CrossFormula { return c('blockchain-throughput', 'throughput(transactions, seconds) = ⌊transactions / seconds⌋', seconds > 0 ? Math.floor(transactions / seconds) : 0, nat(transactions, seconds) && seconds > 0, 'throughput', [transactions, seconds]) }
  /** DIFFICULTY: the target a hashrate meets. value ⌊target / hashrate⌋. */
  static difficulty(target: number, hashrate: number): CrossFormula { return c('blockchain-difficulty', 'difficulty(target, hashrate) = ⌊target / hashrate⌋', hashrate > 0 ? Math.floor(target / hashrate) : 0, nat(target, hashrate) && hashrate > 0, 'difficulty', [target, hashrate]) }
  /** BLOCKTIME: seconds over blocks. value ⌊seconds / blocks⌋. */
  static blocktime(seconds: number, blocks: number): CrossFormula { return c('blockchain-blocktime', 'blocktime(seconds, blocks) = ⌊seconds / blocks⌋', blocks > 0 ? Math.floor(seconds / blocks) : 0, nat(seconds, blocks) && blocks > 0, 'blocktime', [seconds, blocks]) }
  /** CONFIRMATION: depth against the required depth, as a percentage. value ⌊depth · 100 / required⌋. */
  static confirmation(depth: number, required: number): CrossFormula { return c('blockchain-confirmation', 'confirmation(depth, required) = ⌊depth · 100 / required⌋', required > 0 ? Math.floor((depth * 100) / required) : 0, nat(depth, required) && required > 0, 'confirmation', [depth, required]) }
  /** FEE: a transaction size at a rate per byte. value size · rate. */
  static fee(size: number, rate: number): CrossFormula { return c('blockchain-fee', 'fee(size, rate) = size · rate', size * rate, nat(size, rate), 'fee', [size, rate]) }
  /** MERKLE: the leaves a tree carries (tree size proxy). value leaves. */
  static merkle(leaves: number): CrossFormula { return c('blockchain-merkle', 'merkle(leaves) = leaves', leaves, nat(leaves), 'merkle', [leaves]) }
  /** STAKE: a validator's held share of the total, as a percentage. value ⌊held · 100 / total⌋. */
  static stake(held: number, total: number): CrossFormula { return c('blockchain-stake', 'stake(held, total) = ⌊held · 100 / total⌋', total > 0 ? Math.floor((held * 100) / total) : 0, nat(held, total) && total > 0 && held <= total, 'stake', [held, total]) }
  /** FINALITY: confirmed blocks against the blocks needed, as a percentage. value ⌊confirmed · 100 / blocks⌋. */
  static finality(confirmed: number, blocks: number): CrossFormula { return c('blockchain-finality', 'finality(confirmed, blocks) = ⌊confirmed · 100 / blocks⌋', blocks > 0 ? Math.floor((confirmed * 100) / blocks) : 0, nat(confirmed, blocks) && blocks > 0 && confirmed <= blocks, 'finality', [confirmed, blocks]) }
}

for (const name of ['blocktime', 'confirmation', 'difficulty', 'fee', 'finality', 'merkle', 'stake', 'throughput'] as const)
  hexRegisterOf('blockchain', name, (BlockchainFormulas[name] as (...x: unknown[]) => unknown).bind(BlockchainFormulas))
