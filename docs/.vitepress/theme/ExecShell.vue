<!-- ExecShell — Layer 1 uuidnaOS in the browser. Boots uuidnaOS, primes the catalogue, runs uuidnaExec locally.
     Production port use: ls/apk/man over the virtual install + full census — no MCP latency, no binaries.
     UI is shadcn anatomy (data-slot card/input/button), same slots as the Alpine catalogue. -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'
import { runExecLine, execShellHelp } from '../../../src/quantum/apps/exec-shell.js'

const lines = ref<string[]>([])
const input = ref('')
const busy = ref(false)
const ready = ref(false)
const bootLine = ref('booting uuidnaOS…')
const receipt = ref<{ address: string; hexbits: number[] } | null>(null)
const scroller = ref<HTMLElement | null>(null)

const print = async (text: string) => {
  if (text) lines.value.push(...text.split('\n'))
  await nextTick()
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight })
}

onMounted(async () => {
  try {
    const boot = await bootUuidnaOSInBrowser(undefined, { selfTest: false })
    const c = boot.catalogue
    ready.value = c.present
    bootLine.value = c.present
      ? `Layer 1 · ${c.count.toLocaleString('en-US')} packages · boot \`${boot.bootReceipt.slice(0, 8)}\``
      : `catalogue ABSENT — ${c.why}`
    await print(execShellHelp())
  } catch (e) {
    bootLine.value = `boot refused — ${e instanceof Error ? e.message : String(e)}`
    await print(`✗ ${bootLine.value}`)
  }
})

const run = async () => {
  const line = input.value
  input.value = ''
  const trimmed = line.trim()
  if (!trimmed) return
  await print('> ' + trimmed)
  if (!ready.value) return print('✗ catalogue not primed — refresh after /alpine-catalogue.tsv loads')
  if (trimmed === 'clear') { lines.value = []; receipt.value = null; return }
  if (trimmed === 'help') return print(execShellHelp())
  busy.value = true
  try {
    const r = runExecLine(trimmed)
    if (r.output.length) await print(r.output.join('\n'))
    else if (!r.ok) await print('✗ command failed')
    if (r.receipt) receipt.value = { address: r.receipt, hexbits: r.hexbits }
  } finally { busy.value = false }
}
</script>

<template>
  <article class="uuidna-card uu-shell" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">uuidnaOS</h3>
      <p data-slot="card-description" class="uu-shell-boot">{{ bootLine }}</p>
    </div>
    <div data-slot="card-content">
      <div class="scroll" ref="scroller" aria-live="polite">
        <div v-for="(l, i) in lines" :key="i" class="line">{{ l }}</div>
      </div>
      <form class="prompt" data-slot="form" @submit.prevent="run">
        <span aria-hidden="true">$</span>
        <input
          v-model="input"
          data-slot="input"
          :disabled="busy || !ready"
          spellcheck="false"
          autocomplete="off"
          :placeholder="busy ? 'running…' : ready ? 'ls /terminal · apk info busybox · man openssl' : 'waiting for catalogue…'"
          aria-label="uuidnaOS command"
        />
        <button data-slot="button" type="submit" :disabled="busy || !ready">run</button>
      </form>
    </div>
    <div data-slot="card-footer" class="receipt">
      <small v-if="receipt">receipt <code data-slot="handle">{{ receipt.address.slice(0, 8) }}</code> · hexbits [{{ receipt.hexbits.slice(0, 8).join(' ') }}…]</small>
    </div>
  </article>
</template>

<style scoped>
.uu-shell { border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-alt); font-family: var(--vp-font-family-mono); font-size: 13px; margin: 1rem 0; padding: .4rem 0; }
.uu-shell [data-slot="card-header"] { padding: 10px 14px 0; }
.uu-shell [data-slot="card-title"] { margin: 0; font-size: 1rem; }
.uu-shell-boot { margin: .2rem 0 0; font-size: .85rem; color: var(--vp-c-text-2); }
.uu-shell [data-slot="button"] { padding: .25rem .7rem; border: 1px solid var(--vp-c-brand-1); border-radius: 6px; background: transparent; color: var(--vp-c-brand-1); font: inherit; cursor: pointer; }
.uu-shell [data-slot="button"]:disabled { opacity: .55; cursor: not-allowed; }
.uu-shell .scroll { height: 340px; overflow-y: auto; padding: 12px 14px; white-space: pre-wrap; word-break: break-word; }
.uu-shell .line { line-height: 1.5; }
.uu-shell .prompt { display: flex; gap: 8px; border-top: 1px solid var(--vp-c-divider); padding: 8px 14px; }
.uu-shell .prompt [data-slot="input"] { flex: 1; background: none; border: none; outline: none; color: var(--vp-c-text-1); font: inherit; }
.uu-shell .prompt:focus-within { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }
.uu-shell .prompt input:focus-visible { outline: none; }
.uu-shell .receipt { margin: 0; padding: 6px 14px 10px; color: var(--vp-c-text-3); word-break: break-all; }
</style>
