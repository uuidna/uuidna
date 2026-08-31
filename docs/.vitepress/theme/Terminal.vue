<!-- Terminal — uuidnaOS on the MCP wire: Layer 1 exec + full toolbox, one door (/mcp). -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { parseLine, rpcCall, rpcList, helpText, resultText, transcriptReceipt, routeUtterance, type WireTool } from '../../../src/quantum/apps/terminal.js'
import { hostedMcpUrl, advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'
import { formatCourtFuseHint } from '../../../src/quantum/os/browser/court/index.js'

const lines = ref<string[]>([])
const input = ref('')
const busy = ref(false)
const toolCount = ref<number | null>(null)
const toolbox = ref<WireTool[]>([])
const receipt = ref<{ address: string; hexbits: number[] } | null>(null)
const bootLine = ref('connecting to /mcp…')
const idlePlaceholder = 'uuidna_cern {"query":"CMS Higgs"} · court · help · ls /terminal'
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

const execLine = async (line: string) => {
  const raw = await advantageCall('uuidna_exec', { line })
  const p = raw as { ok?: boolean; output?: string[]; receipt?: string }
  if (Array.isArray(p.output) && p.output.length) await print(p.output.join('\n'))
  else await print(resultText({ result: { content: [{ type: 'text', text: JSON.stringify(raw, null, 2) }] } }))
  if (line.trim().startsWith('court') && p.ok === true) {
    const tag = typeof p.receipt === 'string' ? p.receipt.slice(0, 8) : 'green'
    await print(formatCourtFuseHint({ ok: true, receipt: p.receipt ?? null, fuseExport: `export UUIDNA_OS_MCP=${tag}`, detail: '' }))
  }
}

onMounted(async () => {
  bootLine.value = endpoint
  await print(helpText())
  try {
    const os = await advantageCall('uuidna_os', {}) as { bootReceipt?: string; receipt?: string; capacity?: { encoder?: number } }
    const boot = os.bootReceipt ?? os.receipt ?? ''
    bootLine.value = `uuidnaOS · ${endpoint} · boot \`${boot.slice(0, 8)}\``
    await print(`\nuuidna_os · boot \`${boot}\`${os.capacity?.encoder != null ? ` · encoder ${os.capacity.encoder}` : ''}`)
  } catch (e) {
    bootLine.value = '✗ /mcp unreachable'
    await print(`\n✗ uuidna_os did not answer — ${e instanceof Error ? e.message : String(e)}`)
  }
  try {
    const listed = await rpc(rpcList(++id)) as { result?: { tools?: WireTool[] } }
    toolbox.value = listed.result?.tools ?? []
    toolCount.value = toolbox.value.length
    await print(`\ntoolbox — ${toolbox.value.length} tools on ${endpoint}`)
  } catch {
    await print(`\n✗ could not reach ${endpoint} — calls retry the wire; grammar still parses (help).`)
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
  if (cmd.kind === 'exec') {
    busy.value = true
    try { await execLine(cmd.line!) } catch { await print(`✗ the wire did not answer (${endpoint})`) }
    finally { busy.value = false }
    return
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
  catch { await print(`✗ the wire did not answer (${endpoint})`) }
  finally { busy.value = false }
}
</script>

<template>
  <article class="uu-terminal" data-slot="card">
    <div class="uu-head" data-slot="card-header">
      <strong data-slot="card-title">uuidnaOS</strong>
      <small class="uu-boot" data-slot="card-description">{{ bootLine }}</small>
    </div>
    <div class="scroll" ref="scroller" aria-live="polite" data-slot="card-content">
      <div v-for="(l, i) in lines" :key="i" class="line">{{ l }}</div>
    </div>
    <form class="prompt" @submit.prevent="run">
      <span aria-hidden="true">›</span>
      <input v-model="input" :disabled="busy" spellcheck="false" autocomplete="off"
        :placeholder="busy ? 'the wire is answering…' : idlePlaceholder" aria-label="uuidnaOS command" />
    </form>
    <p v-if="receipt" class="receipt" data-slot="card-footer">
      <small>transcript <code>{{ receipt.address.slice(0, 8) }}</code> · hexbits [{{ receipt.hexbits.slice(0, 8).join(' ') }}…]{{ toolCount !== null ? ` · toolbox ${toolCount}` : '' }}</small>
    </p>
  </article>
</template>

<style scoped>
.uu-terminal { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-alt); font-family: var(--vp-font-family-mono); font-size: 13px; margin: 1rem 0; }
.uu-head { padding: 10px 14px 0; display: flex; flex-direction: column; gap: 2px; }
.uu-boot { color: var(--vp-c-text-2); font-size: .85rem; word-break: break-all; }
.uu-terminal .scroll { height: 340px; overflow-y: auto; padding: 12px 14px; white-space: pre-wrap; word-break: break-word; }
.uu-terminal .line { line-height: 1.5; }
.uu-terminal .prompt { display: flex; gap: 8px; border-top: 1px solid var(--vp-c-divider); padding: 8px 14px; }
.uu-terminal .prompt input { flex: 1; background: none; border: none; outline: none; color: var(--vp-c-text-1); font: inherit; }
.uu-terminal .prompt:focus-within { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }
.uu-terminal .prompt input:focus-visible { outline: none; }
.uu-terminal .receipt { margin: 0; padding: 6px 14px 10px; color: var(--vp-c-text-3); word-break: break-all; }
</style>
