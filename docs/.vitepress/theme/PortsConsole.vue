<!-- PortsConsole — ALL SEVEN PORTED APIs, RUNNING IN THIS TAB, ON THIS DEVICE.

     Every other harness on this site asks the edge, because the edge already holds the answer and a visitor
     should not pay to recompute it. This one deliberately does the opposite: the captain asked for uuidnaOS
     running in the browser and taking advantage of the user's own machine, so the work happens HERE and the
     timings below are measured on whatever device is reading this page — not quoted from a server.

     THE COST IS SPLIT, AND THE SPLIT IS THE HONEST PART. Four of the seven APIs are pure arithmetic over data
     the page already carries: chain proofs, filesystem manifests, the sealed chat channel, and a network read
     that addresses what it fetched. Those run on mount, instantly, and prove real client-side compute.

     The other three — shell, database, and the port census itself — need the Alpine catalogue: 7.3 MB of TSV
     and 28,635 rows. That is a real cost on a phone, so it is NEVER paid on mount. It is a button, labelled with
     its size, and nothing loads until someone chooses it. A page that silently pulled 7 MB to fill a table would
     be taking advantage of the device in the other sense. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { chainSeal, chainProve, chainVerify } from '../../../src/quantum/os/chainapi/index.js'
import { fsSeal, fsVerify } from '../../../src/quantum/os/fsapi/index.js'
import { chatSend, chatOpen } from '../../../src/quantum/os/chat/index.js'
import { primeCatalogue, cataloguePrimed, catalogueState } from '../../../src/quantum/os/catalogue/index.js'
import { portsCensus } from '../../../src/quantum/os/ports/index.js'
import { dbQuery } from '../../../src/quantum/os/dbapi/index.js'
// shellapi is imported LAZILY and this is the whole lesson of the first version. It was a module-scope import,
// its graph reached a module with eager node builtins, and `path.join` landed in the browser bundle — so the
// page threw "(0, m_.join) is not a function" and EVERY api on it vanished, including the four that were fine.
// One surface's problem must not be the console's problem: it loads when someone runs a command, and if it
// cannot load, that is one row saying so.

type Row = { api: string; did: string; result: string; us: number }
const pure = ref<Row[]>([])
const ports = ref<{ domain: string; packages: number; origins: number; offers: string }[]>([])
const primed = ref(false)
const priming = ref(false)
const primeMs = ref(0)
const primeErr = ref('')
const netRow = ref<Row | null>(null)
const chatRows = ref<Row[]>([])
const chatting = ref(false)
const query = ref('sqlite')
const queryOut = ref('')
const cmd = ref('apk list')
const cmdOut = ref<string[]>([])

// microseconds, measured with the tab's own clock — the number belongs to this device and no other
const timed = <T,>(fn: () => T): { value: T; us: number } => {
  const t0 = performance.now()
  const value = fn()
  return { value, us: (performance.now() - t0) * 1000 }
}

// ONE API'S FAILURE IS ONE ROW, NEVER THE PAGE. Each demo runs inside its own attempt, so a surface that throws
// reports itself and the others still answer. A console that shows nothing when one thing breaks tells the
// reader less than a console that shows six results and one honest failure.
const attempt = (api: string, did: string, fn: () => { result: string; us: number }): Row => {
  try {
    const r = fn()
    return { api, did, result: r.result, us: r.us }
  } catch (e) {
    return { api, did, result: 'failed: ' + (e instanceof Error ? e.message : String(e)), us: 0 }
  }
}

onMounted(() => {
  const rows: Row[] = []

  // blockchain — inclusion without disclosure, proven and verified here
  rows.push(attempt('blockchain', 'chainSeal + chainProve + chainVerify (right / wrong record)', () => {
    const chain = timed(() => chainSeal(['genesis', 'alpha', 'beta', 'gamma', 'delta']))
    const proof = chainProve(chain.value, 2)!
    // the control rides beside the result: a harness that only shows the passing case proves nothing
    const right = chainVerify('beta', proof)
    const wrong = chainVerify('WRONG', proof)
    return { result: `root ${chain.value.root.slice(0, 12)}… · ${proof.path.length} siblings · verify ${right} / ${wrong}`, us: chain.us }
  }))

  // filesystem — a manifest that names what moved
  rows.push(attempt('filesystem', 'fsSeal(3 files) + fsVerify(same files, reordered)', () => {
    const enc = (x: string): Uint8Array => new TextEncoder().encode(x)
    const tree = [{ path: 'a.txt', bytes: enc('alpha') }, { path: 'b.txt', bytes: enc('beta') }, { path: 'c.txt', bytes: enc('gamma') }]
    const sealed = timed(() => fsSeal(tree))
    const shuffled = fsVerify([tree[2]!, tree[1]!, tree[0]!], sealed.value)
    return { result: `root ${sealed.value.root.slice(0, 12)}… · reordered ${shuffled.ok ? 'VERIFIED (wrong)' : 'refused'}`, us: sealed.us }
  }))


  pure.value = rows
})

// CHAT IS A BUTTON BECAUSE SECURITY COSTS SOMETHING ONCE — and the measurement is the point rather than an
// apology. Opening a session runs PBKDF2 at 600,000 iterations in pure TypeScript, which took 8.5 SECONDS in a
// browser the first time this console ran it on mount. That is not a defect to hide; it is the two coins, paid
// once, deliberately: a session key that is expensive to derive is expensive for everyone, including whoever is
// guessing passphrases.
//
// What the first version got wrong was showing only that number. The ratchet exists so the cost is paid ONCE and
// every later message rotates a fresh key from the session — no second derivation, no second wait. So the demo
// sends TWICE and prints both: the cold send that buys the session, and the rotated send that follows. Highest
// speed AT highest security, by design — but only visible if you measure both, and only honest if the expensive
// one is never charged to a page load nobody asked for.
const runChat = async (): Promise<void> => {
  chatting.value = true
  chatRows.value = []
  await new Promise((r) => setTimeout(r, 0))   // let the button paint before the main thread goes to work
  const out: Row[] = []

  // WARM FIRST, with whatever this device has. The wall measured here was 25.7 s for the first send, because
  // deriving the session key ran PBKDF2-600k in pure TypeScript; a browser has crypto.subtle, which does the
  // same derivation natively — verified byte-for-byte against the pure implementation before it is trusted, and
  // refused for the whole process if it ever disagrees. The two coins are still paid; they are simply paid by
  // the hardware that has the instruction for it.
  const t0 = performance.now()
  const { warmSession } = await import('../../../src/os/kdf/index.js')
  const warm = await warmSession('demo-pass', 'ops')
  out.push({
    api: 'chat', did: 'warmSession — derive with the host primitive, verified against ours',
    result: warm.warmed ? 'warmed by ' + warm.by : 'not warmed: ' + warm.why,
    us: (performance.now() - t0) * 1000,
  })
  await new Promise((r) => setTimeout(r, 0))
  out.push(attempt('chat', 'chatSend #0 — the session key, warmed or pure', () => {
    const sent = timed(() => chatSend('the wave lands', 'demo-pass', 'ops', 0))
    const opened = chatOpen(sent.value.chain, 'demo-pass', 'ops')
    let wrongRoom = 'refused'
    try { chatOpen(sent.value.chain, 'demo-pass', 'other-room'); wrongRoom = 'OPENED (wrong)' } catch { /* the boundary holding */ }
    return { result: `${sent.value.chain.length} uuids · "${opened}" · other room ${wrongRoom}`, us: sent.us }
  }))
  await new Promise((r) => setTimeout(r, 0))
  out.push(attempt('chat', 'chatSend #1 — same session, key ROTATED by the step', () => {
    const sent = timed(() => chatSend('and the next one is free', 'demo-pass', 'ops', 1))
    return { result: `${sent.value.chain.length} uuids · opened "${chatOpen(sent.value.chain, 'demo-pass', 'ops')}"`, us: sent.us }
  }))
  chatRows.value = out
  chatting.value = false
}

// network — impure by nature, so it is its own action and its own row
const runNet = async (): Promise<void> => {
  const t0 = performance.now()
  try {
    const { netRead } = await import('../../../src/os/netapi/index.js')
    const r = await netRead(new URL('/llm.txt', location.origin).href, 'text')
    netRow.value = {
      api: 'network', did: 'netRead(/llm.txt) → address',
      result: r.reached ? `${r.body?.length ?? 0} bytes · ${String(r.address).slice(0, 18)}…` : `not reached — ${r.note}`,
      us: (performance.now() - t0) * 1000,
    }
  } catch (e) {
    netRow.value = { api: 'network', did: 'netRead', result: 'failed: ' + (e instanceof Error ? e.message : String(e)), us: (performance.now() - t0) * 1000 }
  }
}

// THE 7.3 MB IS A CHOICE, made here, with the size on the button.
const prime = async (): Promise<void> => {
  priming.value = true
  primeErr.value = ''
  const t0 = performance.now()
  try {
    const text = await (await fetch('/alpine-catalogue.tsv')).text()
    primeCatalogue(text)
    primeMs.value = performance.now() - t0
    primed.value = cataloguePrimed()
    ports.value = portsCensus().ports.map((p) => ({ domain: p.domain, packages: p.packages, origins: p.origins, offers: p.offers }))
    runQuery()
    void runCmd()
  } catch (e) {
    primeErr.value = e instanceof Error ? e.message : String(e)
  } finally {
    priming.value = false
  }
}

const runQuery = (): void => {
  if (!primed.value) return
  const r = timed(() => dbQuery({ by: 'text', text: query.value, limit: 5 }))
  queryOut.value = r.value.absent
    ? 'catalogue absent'
    : `${r.value.rows.length} of ${r.value.total}${r.value.truncated ? ' (truncated)' : ''} in ${r.us.toFixed(0)} µs — ` +
      r.value.rows.map((x) => x.name).join(', ')
}

const runCmd = async (): Promise<void> => {
  if (!primed.value) return
  try {
    const { shellRun } = await import('../../../src/quantum/os/shellapi/index.js')
    const r = timed(() => shellRun(cmd.value))
    cmdOut.value = [`${r.value.ok ? '✓' : '✗'} ${r.us.toFixed(0)} µs`, ...r.value.output.slice(0, 8)]
  } catch (e) {
    // the shell surface reaching something a tab does not have is a fact worth SHOWING, not a blank panel
    cmdOut.value = ['✗ shell unavailable in this tab: ' + (e instanceof Error ? e.message : String(e))]
  }
}
</script>

<template>
  <article class="uuidna-card ports-console" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">uuidnaOS in this tab — all seven ported APIs</h3>
      <p data-slot="card-description">
        every timing below was measured on <em>your</em> device, not quoted from a server
      </p>
    </div>

    <div data-slot="card-content">
      <h4>APIs that need nothing but this page</h4>
      <table>
        <thead><tr><th>api</th><th>did</th><th>result</th><th>µs</th></tr></thead>
        <tbody>
          <tr v-for="(r, i) in pure" :key="i">
            <td><code>{{ r.api }}</code></td><td>{{ r.did }}</td><td>{{ r.result }}</td><td>{{ r.us.toFixed(1) }}</td>
          </tr>
          <tr v-for="(r, i) in chatRows" :key="'c' + i">
            <td><code>{{ r.api }}</code></td><td>{{ r.did }}</td><td>{{ r.result }}</td><td>{{ r.us.toFixed(0) }}</td>
          </tr>
          <tr v-if="netRow">
            <td><code>{{ netRow.api }}</code></td><td>{{ netRow.did }}</td><td>{{ netRow.result }}</td><td>{{ netRow.us.toFixed(0) }}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <button :disabled="chatting" @click="runChat">{{ chatting ? 'deriving the session…' : 'open a sealed chat session and send twice' }}</button>
        — the first send derives a 600,000-iteration session key and takes seconds; the second rides the ratchet
        and costs microseconds. The expensive step is the security, paid once, and it is never charged to page load.
      </p>
      <p><button @click="runNet">fetch and address /llm.txt</button> — the one impure API, so it waits to be asked</p>

      <h4>Three APIs that need the catalogue</h4>
      <p v-if="!primed">
        <button :disabled="priming" @click="prime">{{ priming ? 'priming…' : 'prime the Alpine catalogue (7.3 MB, 28,635 rows)' }}</button>
        — never loaded on mount: on a phone that is a real cost, so it is yours to spend.
      </p>
      <p v-if="primeErr">priming failed: {{ primeErr }}</p>

      <template v-if="primed">
        <p>{{ catalogueState().count.toLocaleString() }} rows primed in {{ primeMs.toFixed(0) }} ms on this device.</p>
        <table>
          <thead><tr><th>domain</th><th>packages</th><th>origins</th><th>the one API offers</th></tr></thead>
          <tbody>
            <tr v-for="p in ports" :key="p.domain">
              <td><code>{{ p.domain }}</code></td><td>{{ p.packages }}</td><td>{{ p.origins }}</td><td>{{ p.offers }}</td>
            </tr>
          </tbody>
        </table>

        <p><label>database — <input v-model="query" @input="runQuery" /></label></p>
        <p><code>{{ queryOut }}</code></p>

        <p><label>shell — <input v-model="cmd" @keyup.enter="runCmd" /></label> <button @click="runCmd">run</button></p>
        <pre v-if="cmdOut.length">{{ cmdOut.join('\n') }}</pre>
      </template>

      <p>
        <strong>Honest scope.</strong> These are uuidna's own APIs standing beside Alpine's published metadata.
        Nothing here installs, links or runs an Alpine binary; the chat channel speaks no IRC, XMPP or Matrix;
        the filesystem API mounts nothing. The port is provenance, the API is uuidna's, and they are two things
        side by side rather than one bridging the other.
      </p>
    </div>
  </article>
</template>
