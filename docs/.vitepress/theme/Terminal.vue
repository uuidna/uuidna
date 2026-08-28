<!-- Terminal — THE TERMINAL ON THE MCP, the thin shell (the pure half is quantum/apps/terminal). One duty:
     the fetch to the SAME uuidna wire (/mcp, JSON-RPC 2.0) — parsing, envelopes, meaning, and the transcript
     fold all come from the app. The toolbox is LEARNED from tools/list at mount (the singularity: no local
     list to drift); every command pays the same gate, deposit, and receipt as any MCP client. No assets, no
     deps, computes where the visitor stands. -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { parseLine, rpcCall, rpcList, helpText, meaningOf, resultText, transcriptReceipt, routeUtterance, type WireTool } from '../../../src/quantum/apps/terminal.js'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'

const lines = ref<string[]>([])
const input = ref('')
const busy = ref(false)
const toolCount = ref<number | null>(null)
const toolbox = ref<WireTool[]>([])   // learned live at mount — the router's ONLY source of tools
const receipt = ref<{ address: string; hexbits: number[] } | null>(null)
const scroller = ref<HTMLElement | null>(null)
let id = 0

// the SAME wire this site serves: same-origin /mcp on a licensed uuidna host; the canonical wire from anywhere else.
// GUARDED FOR SSR: `location` is a browser global absent when VitePress renders the page on the server — reading it
// at setup() crashed the static build (every page, ReferenceError). During SSR there is no host to be same-origin
// with, so the canonical wire is exactly right; on the client, setup re-runs at hydration and picks the real origin.
const endpoint = typeof location !== 'undefined' && /\.?uuidna\.(com|net|org)$/.test(location.hostname) ? `${location.origin}/mcp` : 'https://uuidna.com/mcp'

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
  await print(meaningOf())
  try {
    const boot = await bootUuidnaOSInBrowser(undefined, { selfTest: false })
    const c = boot.catalogue
    await print(`\nuuidnaOS boot \`${boot.bootReceipt}\` · catalogue ${c.present ? `${c.count.toLocaleString('en-US')} packages` : `ABSENT — ${c.why}`}`)
    if (boot.selfTest?.present) {
      const st = boot.selfTest
      await print(`self-test ${st.passed.toLocaleString('en-US')}/${st.tested.toLocaleString('en-US')} · ${st.upstreamGaps} upstream gap${st.upstreamGaps === 1 ? '' : 's'}`)
    }
  } catch (e) {
    await print(`\n✗ uuidnaOS refused to boot — ${e instanceof Error ? e.message : String(e)}`)
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
    return print(cmd.name === 'help' ? helpText() : meaningOf())
  }
  if (cmd.kind === 'chat') {
    // natural language → the deterministic router over the LIVE-learned toolbox; the decision prints before
    // the call, so the reader always sees exactly which tool their sentence became — no silent guessing
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
/* the input's own outline is suppressed ONLY because the prompt row replaces it: a visible focus ring on the
   whole line (keyboard users must always see where they are — the Tier 1 law the theme tests hold) */
.uu-terminal .prompt input { flex: 1; background: none; border: none; outline: none; color: var(--vp-c-text-1); font: inherit; }
.uu-terminal .prompt:focus-within { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }
.uu-terminal .prompt input:focus-visible { outline: none; }
.uu-terminal .receipt { margin: 0; padding: 6px 14px 10px; color: var(--vp-c-text-3); word-break: break-all; }
</style>
