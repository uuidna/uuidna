#!/usr/bin/env node
// install — ONE LINE. Enter seats all. Combinations in the console; Cloudflare is one click.
//
//   npx uuidna-install
//   npm run x -- install
//   npm run x -- install --yes
//   npm run x -- install --select=qpu-mcp,payload-mcp --occupancy=saas
//
// apk still runs: plan, then commit. The user only picks once.
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import {
  INSTALL_CLOUDFLARE,
  INSTALL_OCCUPANCIES,
  INSTALL_PACKAGES,
  installCombinationsOf,
  interactiveInstall,
  parseInstallLine,
  simpleInstall,
} from '../quantum/os/installer/index.js'

const args = process.argv.slice(2)
const yes = args.includes('--yes') || args.includes('-y')
const reset = args.includes('--reset')
const auditOnly = args.includes('--audit')
const selectFlag = args.find((a) => a.startsWith('--select='))
const occupancyFlag = args.find((a) => a.startsWith('--occupancy='))
const select = selectFlag
  ? selectFlag.slice('--select='.length).split(',').map((s) => s.trim()).filter(Boolean)
  : undefined
const occupancy = occupancyFlag ? occupancyFlag.slice('--occupancy='.length) : undefined

const printMenu = () => {
  console.log('uuidna install — Enter seats all')
  for (const row of installCombinationsOf()) {
    const pack = INSTALL_PACKAGES[row.n - 1]
    console.log(`  ${row.n}  ${row.key.padEnd(18)} ${pack?.href ?? ''}`)
  }
  console.log(`  occupancy  ${INSTALL_OCCUPANCIES.join(' | ')}`)
  console.log(`  cloudflare ${INSTALL_CLOUDFLARE.qpu}`)
}

const printResult = (result: ReturnType<typeof simpleInstall>) => {
  console.log(`install ${result.verb}  ${result.seated.join(' ') || result.pending.join(' ') || '(none)'}  occupancy ${result.occupancy}`)
  if (result.lines.length) console.log(result.lines.join('\n'))
  console.log(result.next)
  console.log(`qpu ${result.client.qpu.url}`)
  console.log(`payload ${result.client.payload.url} find-only`)
  console.log(`vitepress ${result.client.vitepress.origin}`)
  console.log(`cloudflare ${result.cloudflare.qpu}`)
  console.log(`button ${result.cloudflare.button}`)
}

if (reset) interactiveInstall({ reset: true })

if (auditOnly) {
  printResult(interactiveInstall({ verb: 'audit' }))
  process.exit(0)
}

if (yes || select) {
  const picked = parseInstallLine(select ? select.join(' ') : 'all')
  const result = simpleInstall({
    select: select ?? picked.keys,
    occupancy: occupancy ?? picked.occupancy,
    yes: true,
  })
  printResult(result)
  process.exit(result.committed ? 0 : 1)
}

if (!input.isTTY) {
  printMenu()
  console.log('npx uuidna-install --yes')
  console.log(`cloudflare ${INSTALL_CLOUDFLARE.qpu}`)
  process.exit(0)
}

printMenu()
const rl = createInterface({ input, output })
const line = await rl.question('> ')
rl.close()
const picked = parseInstallLine(line)
const result = simpleInstall({
  line,
  occupancy: occupancy ?? picked.occupancy,
})
printResult(result)
if (picked.cloudflare) console.log(`open ${result.cloudflare.qpu}`)
process.exit(result.committed ? 0 : 1)
