#!/usr/bin/env node
// quantum-alpine — FULL crypto-related Alpine coverage: Layer 1 exec + Layer 2 plans + optional sandbox.
import { testQuantumAlpineCoverage, renderQuantumAlpineCoverage } from '../quantum/os/alpine/index.js'
import { renderSandboxSuite } from '../os/runtime/index.js'

const sandbox = process.argv.includes('--sandbox')
const c = testQuantumAlpineCoverage({ sandbox })
console.log(renderQuantumAlpineCoverage(c))
if (c.sandbox) console.log('\n' + renderSandboxSuite(c.sandbox))
process.exit(c.complete && (!c.sandbox || c.sandbox.ok) ? 0 : 1)
