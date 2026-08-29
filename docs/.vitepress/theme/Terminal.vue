<!-- Terminal — thin MCP shell. Parse/fold in quantum/apps/terminal; the mill is the hosted /mcp door. -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { parseLine, rpcCall, rpcList, helpText, resultText, transcriptReceipt, routeUtterance, type WireTool } from '../../../src/quantum/apps/terminal.js'
import { hostedMcpUrl, advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const lines = ref<string[]>([])
const input = ref('')
const busy = ref(false)
const toolCount = ref<number | null>(null)
const toolbox = ref<WireTool[]>([])
const receipt = ref<{ address: string; hexbits: number[] } | null>(null)
const scroller = ref<HTMLElement | null>(null)
let id = 0

const endpoint = hostedMcpUrl()

const print = async (text: string) => {
  lines.value.push(...text.split('\n'))
  receipt.value = transcriptReceipt(lines.value)
  await nextTick()
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight })
}

const rpc = async (message: object): Promise<unknown> => {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(message) })
  return res.json()
}

onMounted(async () => {
  await print(helpText())
  try {
    const os = await advantageCall('uuidna_os', {}) as { bootReceipt?: string; receipt?: string; capacity?: { encoder?: number } }
    const boot = os.bootReceipt ?? os.receipt ?? ''
    await print(`\nuuidna_os · boot \`${boot}\`${os.capacity?.encoder != null ? ` · encoder ${os.capacity.encoder}` : ''}`)
  } catch (e) {
    await print(`\n✗ uuidna_os did not answer — ${e instanceof Error ? e.message : String(e)}`)
  }
  try {
    const listed = await rpc(rpcList(++id)) as { result?: { tools?: WireTool[] } }
    toolbox.value = listed.result?.tools ?? []
    toolCount.value = toolbox.value.length
    await print(`\nthe toolbox, learned live from ${endpoint} — ${toolbox.value.length} tools:\n` + toolbox.value.map((t) => t.name).join('  '))
    await print(`\ntype help for the grammar — or say it plainly: a sentence routes to the matching tool deterministically, and every call returns the answer, then the gate's ledger line.`)
  } catch {
    await print(`\n✗ could not reach ${endpoint} — the toolbox is learned live and ONLY live; there is no local copy to fall back to. The grammar still parses (help), calls will retry the wire.`)
  }
})

const run = async () => {
  const line = input.value
  input.value = ''
  let cmd = parseLine(line)
  if (cmd.kind === 'empty') return
  await print('> ' + line.trim())
  if (cmd.kind === 'error') return print('✗ ' + cmd.text)
  if (cmd.kind === 'builtin') {
    if (cmd.name === 'clear') { lines.value = []; receipt.value = null; return }
    if (cmd.name === 'help') return print(helpText())
    try {
      const os = await advantageCall('uuidna_os', {})
      return print(typeof os === 'object' ? JSON.stringify(os, null, 2) : String(os))
    } catch (e) {
      return print('✗ uuidna_os did not answer — ' + (e instanceof Error ? e.message : String(e)))
    }
  }
  if (cmd.kind === 'chat') {
    const routed = routeUtterance(cmd.text!, toolbox.value)
    if (routed.kind === 'none') return print('✗ ' + routed.why)
    if (routed.kind === 'ambiguous')
      return print('✗ ' + routed.why + '\n' + (routed.candidates ?? []).map((c) => `  ${c.name} (score ${c.score})`).join('\n'))
    await print(`→ ${routed.name} ${JSON.stringify(routed.args)}   (${routed.why})`)
    cmd = { kind: 'call', name: routed.name, args: routed.args }
  }
  busy.value = true
  try { await print(resultText(await rpc(rpcCall(cmd, ++id)))) }
  catch { await print(`✗ the wire did not answer (${endpoint}) — nothing was guessed in its place`) }
  finally { busy.value = false }
}
</script>

<template>
  <div class="uu-terminal">
    <div class="scroll" ref="scroller" aria-live="polite">
      <div v-for="(l, i) in lines" :key="i" class="line">{{ l }}</div>
    </div>
    <form class="prompt" @submit.prevent="run">
      <span aria-hidden="true">›</span>
      <input v-model="input" :disabled="busy" spellcheck="false" autocomplete="off"
        :placeholder="busy ? 'the wire is answering…' : 'help · meaning · <tool> {json}'" aria-label="terminal command" />
    </form>
    <p v-if="receipt" class="receipt">
      <small>transcript <code>{{ receipt.address }}</code> · hexbits [{{ receipt.hexbits.join(' ') }}]{{ toolCount !== null ? ` · toolbox ${toolCount}` : '' }}</small>
    </p>
  </div>
</template>

<style scoped>
.uu-terminal { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-alt); font-family: var(--vp-font-family-mono); font-size: 13px; }
.uu-terminal .scroll { height: 340px; overflow-y: auto; padding: 12px 14px; white-space: pre-wrap; word-break: break-word; }
.uu-terminal .line { line-height: 1.5; }
.uu-terminal .prompt { display: flex; gap: 8px; border-top: 1px solid var(--vp-c-divider); padding: 8px 14px; }
.uu-terminal .prompt input { flex: 1; background: none; border: none; outline: none; color: var(--vp-c-text-1); font: inherit; }
.uu-terminal .prompt:focus-within { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }
.uu-terminal .prompt input:focus-visible { outline: none; }
.uu-terminal .receipt { margin: 0; padding: 6px 14px 10px; color: var(--vp-c-text-3); word-break: break-all; }
</style>
