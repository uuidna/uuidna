// news.data — THE NEWSROOM'S WIRE, computed never authored: the changelog's own entries (each naming the ledger
// receipt it shipped), the deposit chain's newest receipts, and the sealed fold state. Every item carries the
// receipt that proves it; a bulletin without a receipt cannot appear here by construction.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default {
  watch: ['../../CHANGELOG.md', '../../trials-receipts.json', '../../quantum-fold.json'],
  load() {
    const root = resolve(__dirname, '../..')
    const changelog = readFileSync(resolve(root, 'CHANGELOG.md'), 'utf8')
    const entries = [...changelog.matchAll(/^## \[([^\]]+)\][^\n]*\n([\s\S]*?)(?=\n## |$)/gm)]
      .slice(0, 5)
      .map(([, version, body]) => ({
        version,
        lines: body.trim().split('\n').filter((l) => l.startsWith('-')).slice(0, 6),
      }))
    const receipts = JSON.parse(readFileSync(resolve(root, 'trials-receipts.json'), 'utf8'))
    const deposits = (Array.isArray(receipts) ? receipts : receipts.receipts || []).slice(-6).reverse()
    const fold = JSON.parse(readFileSync(resolve(root, 'quantum-fold.json'), 'utf8'))
    return { entries, deposits, fold: { receipt: fold.receipt, zero_entropy: fold.zero_entropy, equilibrium: fold.equilibrium } }
  },
}
