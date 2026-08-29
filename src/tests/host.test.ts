// os/host — THE DEVELOPMENT MACHINE'S DRIVER, tested. It resolves a host (which shell can run a step, how many
// lanes the machine really has) and folds what it read to a receipt. The driver itself never spawns — it states
// recipes and the caller runs them — so these tests mostly exercise the RESOLUTION and the arithmetic, and each
// carries the mutation that breaks it (the falsifiability law in scripts/api.ts: an audit that cannot say no is
// not an audit).
// ONE TEST DOES SPAWN, on purpose: a recipe checked only against expected strings is checked against this file's
// opinion of the host, not against the host. `ps -o ppid=` passed every such check for as long as it existed and
// was never once run here, which is precisely how a flag Windows does not have survived in the lock's reentrancy
// walk. So parentProbe's recipe is executed against a fact the process already knows — its own ppid.
// Distinct from machine.test.ts, which tests the pure LOAD balancer: that one asks how busy the metal is, this one
// asks what the metal IS and how to run a step on it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { capacity, childProbe, hostProfile, hostStreamFleet, loadMeasurable, parentProbe, renderSpeedup, resolveShell, speedup } from '../os/host/index.js'
import { GPU_POSTAGE_ADDRESSES } from '../hardware/lanes/index.js'
import { UUID } from './api.js'

test('resolveShell — a POSIX host gets sh; the recipe runs one command string', () => {
  const posix = resolveShell('linux')
  assert.equal(posix.ok, true)
  assert.equal(posix.ok && posix.file, 'sh')
  assert.deepEqual(posix.ok && posix.argv('npm run build'), ['-c', 'npm run build'])
  // darwin is POSIX too — the branch is "not win32", not a list of names that would rot
  assert.equal(resolveShell('darwin').ok, true)
})

test('resolveShell — THIS host resolves, and never to a shell that cannot expand a glob', () => {
  const here = resolveShell()
  // The audit chain passes globs (`node --test dist/tests/*.test.js`) and expansion is the shell's job. A driver
  // that answered cmd.exe would run zero test files and still exit 0, so the ONLY accepted answers are a POSIX
  // shell or an honest refusal carrying its remedy — never a substitute.
  if (here.ok) {
    assert.equal(here.kind, 'posix')
    assert.match(here.file, /(?:^sh$|[\\/](?:sh|bash)\.exe$)/i)
    assert.ok(here.source.length > 0, 'a resolved shell says where it was found')
  } else {
    assert.equal(here.kind, 'none')
    assert.ok(here.remedy.includes('Git for Windows') || here.remedy.includes('Node'), 'a refusal names what to install')
  }
})

test('resolveShell — the recipe carries the environment that makes the shell a WHOLE one', () => {
  // a POSIX host's shell already stands in its own installation: the environment passes through untouched
  const posix = resolveShell('linux')
  const base = { PATH: '/usr/bin', HOME: '/home/dev' }
  assert.deepEqual(posix.ok && posix.env(base), base)

  const here = resolveShell()
  if (!here.ok || process.platform !== 'win32') return
  // On Windows the interpreter and its coreutils are one thing. Without this, npm's Unix entry point asked env for
  // bash and got "No such file or directory" — a shell found and still unable to run anything.
  const grown = here.env({ Path: 'C:\\Windows' })
  assert.equal(Object.keys(grown).length, 1, 'the key already present is rewritten — never a second PATH the child must choose between')
  assert.ok(String(grown.Path).endsWith(';C:\\Windows'), 'the shell\'s toolchain goes on the FRONT, and nothing else is disturbed')
  assert.ok(String(grown.Path).includes('bin'), 'what is prepended is where the coreutils live')
  assert.equal(here.env({ PATH: 'C:\\Windows' }).PATH?.endsWith(';C:\\Windows'), true, 'the other spelling is matched too')
})

test('capacity — measured, never assumed, and it always leaves the machine room to breathe', () => {
  const c = capacity()
  assert.ok(c.logical >= 1, 'a host has at least one logical processor')
  assert.ok(c.lanes >= 2, 'the floor is 2 so a single-core host still runs')
  assert.ok(c.lanes <= c.logical || c.logical < 4, 'a fan-out never claims more lanes than the machine has')
  assert.equal(Number.isInteger(c.memoryGiB), true, 'the memory figure floors by the exact form — no rounding intrinsic')
  // the reserve is real: ask for everything and the driver still holds two back on a wide machine
  const greedy = capacity(0)
  assert.equal(greedy.lanes, greedy.logical < 2 ? 2 : greedy.logical)
  assert.ok(capacity(2).lanes <= greedy.lanes, 'reserving lanes cannot yield MORE lanes')
})

test('hostStreamFleet uses this machine\'s CPU lanes and adds the specified GPU worker at postage', () => {
  const host = capacity()
  const small = hostStreamFleet(1)
  assert.equal(small.cpuWorkers, host.lanes)
  assert.equal(small.gpuWorkers, 0)
  const wide = hostStreamFleet(GPU_POSTAGE_ADDRESSES)
  assert.equal(wide.cpuWorkers, host.lanes)
  assert.equal(wide.gpuWorkers, 1)
  assert.equal(wide.total, host.lanes + 1)
})

test('hostProfile — the reading moves between hosts, the fold does not move on one', () => {
  const a = hostProfile()
  const b = hostProfile()
  assert.match(a.address, UUID)
  assert.match(a.receipt, UUID)
  assert.equal(a.address, b.address, 'the same machine folds to the same address — a receipt that drifts is not one')
  assert.equal(a.receipt, b.receipt)
  // AND IT MUST NOT MOVE FOR A RUN'S OWN CHOICES: a different reserve is not a different machine, so the address
  // holds while the lane count it reports genuinely changes. The address answers "which host", not "which run".
  assert.equal(hostProfile(4).address, a.address)
  assert.ok(hostProfile(4).lanes <= a.lanes)
})

test('childProbe — every host has a way to ask, and "none" never reads as "one"', () => {
  const posix = childProbe('linux')
  assert.equal(posix.file, 'pgrep')
  assert.deepEqual(posix.args(4321), ['-P', '4321'])
  assert.equal(posix.reads('', 1), false, 'pgrep says none by printing nothing and exiting nonzero')
  assert.equal(posix.reads('99\n100\n', 0), true)

  const win = childProbe('win32')
  assert.equal(win.file, 'powershell')
  assert.match(win.args(4321).join(' '), /ParentProcessId=4321/)
  // the two readings that inverted this predicate in opposite directions, both pinned:
  assert.equal(win.reads('0\r\n', 0), false, 'a printed zero is a live answer meaning NO children, not a nonempty line')
  assert.equal(win.reads('1\r\n', 0), true)
  assert.equal(win.reads('', 1), false, 'no output at all is no evidence of work')
  assert.match(win.args(1).join(' '), /ProcessId -ne \$PID/, 'the asking shell is a child of the pid being asked about, and must not count as its work')
})

test('parentProbe — every host has a way to walk UP, and "no answer" never reads as a parent', () => {
  const posix = parentProbe('linux')
  assert.equal(posix.file, 'ps')
  assert.deepEqual(posix.args(4321), ['-o', 'ppid=', '-p', '4321'])
  assert.equal(posix.reads('  1234\n'), 1234, 'procps pads the column; the number is the answer')
  assert.equal(posix.reads(''), 0, 'an unknown pid prints nothing, and nothing is not a parent')

  const win = parentProbe('win32')
  // THE FLAG THAT WAS NOT THERE: the ps in Git for Windows has no -o, so the POSIX recipe answers
  // `unknown option -- o` and one-writer's catch read a missing FLAG as a real "not an ancestor" — refusing
  // the holder's own children the tree they already held.
  assert.notEqual(win.file, 'ps', 'the -o flag is procps, not POSIX ps — this host must not be handed it')
  assert.equal(win.file, 'powershell')
  assert.match(win.args(4321).join(' '), /ProcessId=4321/)
  assert.equal(win.reads('7788\r\n'), 7788)
  assert.equal(win.reads('\r\n'), 0, 'a pid that no longer exists prints blank, which ends the walk')
})

test('parentProbe finds the REAL parent of THIS process — the recipe is run, not merely described', () => {
  // a probe is only as good as the host answering it, so one of them is actually spawned. Node already knows
  // its own parent, and the host must agree with it: this is the assertion the broken `ps -o` would have failed
  // on any Windows host, and no table of expected strings can fail in its place.
  const probe = parentProbe()
  const out = execFileSync(probe.file, probe.args(process.pid), { encoding: 'utf8', stdio: 'pipe' })
  assert.equal(probe.reads(out), process.ppid, `the host must name this process's real parent (${process.ppid})`)
})

test('loadMeasurable — the one host whose load average is a permanent zero is named as unmeasured', () => {
  // The distinction that matters: a POSIX host REPORTS load, so its balancer verdict can fail. Windows publishes
  // none and Node returns [0,0,0] — a spare-floor test fed that can only ever pass, which is the vacuous audit the
  // ledger refuses. Naming the absence is what keeps the verdict falsifiable where it IS issued.
  assert.equal(loadMeasurable('linux'), true)
  assert.equal(loadMeasurable('darwin'), true)
  assert.equal(loadMeasurable('win32'), false)
})

test('speedup — an exact integer ratio in hundredths, and zero rather than a number it did not earn', () => {
  assert.equal(speedup(4000, 1000), 400)          // 4x
  assert.equal(renderSpeedup(400), '4.00x')
  assert.equal(renderSpeedup(speedup(6900, 400)), '17.25x')
  assert.equal(renderSpeedup(speedup(1005, 1000)), '1.00x')  // floors, never rounds up to a gain not measured
  // an unmeasured phase reports nothing — the one case where a ratio would be invented
  assert.equal(speedup(5000, 0), 0)
  assert.equal(renderSpeedup(0), '0.00x')
})
