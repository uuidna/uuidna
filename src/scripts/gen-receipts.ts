#!/usr/bin/env node
// gen-receipts — MINT THE CROSS-GATEWAY RECEIPTS ONCE PER LEDGER STATE (a reconcile drain; nothing else writes them).
// coverage: the publications projection (file + theorem keys), 215 s to compose, 9 ms to read. decode: uuidnaDecode(),
// 191 s to walk, O(1) to read. Both keyed on ledgerDigest(); a moved ledger makes every gateway miss until this re-mints.
import { publications } from '../publish.js'
import { uuidnaDecode } from '../quantum-audit-ratios.js'
import { ledgerDigest, mintReceipt } from '../receipt-memo.js'

const key = ledgerDigest()
const coverage = mintReceipt('coverage', publications().map((p) => ({ file: p.file, theorems: p.theorems })))
const decode = mintReceipt('decode', uuidnaDecode())
console.log(`✓ gen-receipts — minted under ledger ${key.slice(0, 8)}: ${coverage} · ${decode}`)
