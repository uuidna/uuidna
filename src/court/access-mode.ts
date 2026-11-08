/**
 * Access as Unix/Linux mode enums — rwx × ugo, chmod octals, root/grant/sudo —
 * backed by access.* hex formulas + combinatorics.binomial(3)=8 mode states.
 * Not an ACL engine: one mode enum decides read/write/call, like chmod.
 */
import { AccessFormulas } from '../families/access/index.js'
import { CombinatoricsFormulas } from '../families/combinatorics/index.js'
import { CryptFormulas } from '../families/crypt/index.js'
import {
  qpuHexUuidOf,
  mcpToolsListOf,
  type QpuEnv,
} from '../quantum/processing/unit/index.js'

/** rwx bits — Unix st_mode low triad. */
export const RWX = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'] as const

/** ugo subjects mapped to QPU: other=public, user=signed-in, group=tenant, owner=root handle. */
export const UGO = ['other', 'user', 'group', 'owner'] as const

const hexOf = (formula: string, params: number[]) => {
  try {
    return qpuHexUuidOf({ family: 'access', program: [formula], params })
  } catch {
    return null
  }
}

const rawNextOf = (r: object) =>
  Object.prototype.hasOwnProperty.call(r, 'next') ? ((r as { next?: unknown }).next ?? null) : ('absent' as const)

const callOf = (name: string, params: number[], r: { hex?: string; value: number; holds: boolean; formula?: string }) => ({
  call: `${name}(${params.join(', ')})`,
  name,
  params,
  hex: r.hex ?? hexOf(name.replace(/^access\./, ''), params),
  value: r.value,
  holds: r.holds === true,
  rawNext: rawNextOf(r),
  definition: r.formula,
})

/**
 * Decode a chmod triad 0…7 into r/w/x flags (Unix).
 * execute maps to MCP tools/call (prove/hex) — the “run” bit.
 */
export const modeBitsOf = (triad: number) => ({
  triad: triad & 7,
  symbolic: RWX[triad & 7]!,
  read: ((triad >> 2) & 1) === 1,
  write: ((triad >> 1) & 1) === 1,
  execute: (triad & 1) === 1,
})

/**
 * Unix → QPU access decision for one triad + subject.
 * Uses access.read / access.write / access.role / access.tenant / access.grant — no RBAC graph.
 */
export const modeAccessOf = (args: {
  /** chmod triad 0…7 (combinatorics.binomial(3)=8 states). */
  mode?: number
  /** ugo subject: other=0 public, user=1, group=2 tenant, owner=3 root-ish. */
  who?: number | (typeof UGO)[number]
  /** publication status (≥2 published). */
  status?: number
  /** tenant ids for isolation check. */
  tenantReq?: number
  tenantDoc?: number
  /** hexbit handles for grant (actor ≤ target). */
  actor?: number
  target?: number
} = {}) => {
  const triad = typeof args.mode === 'number' && Number.isSafeInteger(args.mode) ? args.mode & 7 : 5 // default r-x (public read+call)
  const bits = modeBitsOf(triad)
  const whoIndex =
    typeof args.who === 'number' ? Math.max(0, Math.min(3, args.who))
    : typeof args.who === 'string' ? Math.max(0, UGO.indexOf(args.who as (typeof UGO)[number]))
    : 0
  const who = UGO[whoIndex]!
  // Map ugo → access role lattice: other→anon(0), user→user(1), group→admin(2) tenant admin, owner→super(3)
  const role = whoIndex
  const status = typeof args.status === 'number' ? args.status : 2 // published
  const user = whoIndex >= 1 ? 1 : 0
  const owner = 1
  const tenantReq = args.tenantReq ?? 1
  const tenantDoc = args.tenantDoc ?? 1
  const actor = args.actor ?? (whoIndex === 3 ? 0 : whoIndex + 1)
  const target = args.target ?? 8

  const read = AccessFormulas.read(status, role)
  const write = AccessFormulas.write(role, user, owner)
  const roleOk = AccessFormulas.role(role, bits.write ? 2 : bits.read ? 0 : 1)
  const tenant = AccessFormulas.tenant(tenantReq, tenantDoc, role)
  const grant = AccessFormulas.grant(actor, target)
  const root = AccessFormulas.root(actor)
  const rank = AccessFormulas.rank(actor)
  const sudo = AccessFormulas.sudo(actor, target)
  // Screen: public read needs https+input+rate (bits 1|8|16); write needs all five (31)
  const screenFlags = bits.write ? 31 : bits.read ? 0b11010 : 0
  const screen = AccessFormulas.screen(screenFlags)
  const token = AccessFormulas.token(bits.write ? 256 : 0)
  const modes = CombinatoricsFormulas.binomial(3) // 8 = chmod triad states
  const subjects = CombinatoricsFormulas.binomial(2) // 4 ≈ ugo+owner
  const grover = CryptFormulas.symmetricQuantumBits(256)

  const mayRead = bits.read && read.holds === true && read.value === 1 && tenant.holds === true
  const mayWrite = bits.write && write.holds === true && write.value === 1 && token.holds === true
  const mayExecute = bits.execute && grant.holds === true // call/prove via MCP

  return {
    kind: 'access-mode' as const,
    thesis: 'access = Unix mode enum (rwx×ugo); formulas decide, not an ACL graph' as const,
    call: 'tools/call connector { access: true, mode, who }' as const,
    endpoint: '/api/qpu/access' as const,
    unix: {
      analogy: {
        rwx: 'read → access.read; write → access.write + token; execute → tools/call (grant)' as const,
        ugo: 'other=public/anon; user=signed-in; group=tenant; owner=root handle 0' as const,
        chmod: 'triad 0…7 = combinatorics.binomial(3); pick mode, not a policy engine' as const,
        uid0: 'access.root(0) / access.rank — lower hexbit handle = greater access' as const,
        capabilities: 'access.screen(flags) bitmask — 2⁵ checks, combinatorics.binomial(5)' as const,
      },
      mode: bits,
      who,
      whoIndex,
      role,
    },
    decides: {
      read: mayRead,
      write: mayWrite,
      execute: mayExecute,
      /** Connector/MCP call permitted when execute or (read && public door). */
      call: mayExecute || mayRead,
      buy: mayRead && !mayWrite, // catalog browse; write stays bearer — no price invented
    },
    formulas: [
      callOf('access.read', [status, role], read),
      callOf('access.write', [role, user, owner], write),
      callOf('access.role', [role, bits.write ? 2 : 0], roleOk),
      callOf('access.tenant', [tenantReq, tenantDoc, role], tenant),
      callOf('access.grant', [actor, target], grant),
      callOf('access.root', [actor], root),
      callOf('access.rank', [actor], rank),
      callOf('access.sudo', [actor, target], sudo),
      callOf('access.screen', [screenFlags], screen),
      callOf('access.token', [bits.write ? 256 : 0], token),
      callOf('combinatorics.binomial', [3], modes),
      callOf('combinatorics.binomial', [2], subjects),
      callOf('crypt.symmetricQuantumBits', [256], grover),
    ],
    enums: {
      rwx: RWX.map((sym, triad) => ({
        value: String(triad),
        label: sym,
        octal: triad,
        door: 'connector',
        args: { access: true, mode: triad, who },
        address: 'access.mode',
        hex: hexOf('read', [2, role]),
        holds: modeBitsOf(triad).read ? AccessFormulas.read(2, role).holds : true,
      })),
      ugo: UGO.map((name, i) => ({
        value: name,
        label: name,
        door: 'connector',
        args: { access: true, mode: triad, who: name },
        address: 'access.role',
        hex: hexOf('role', [i, 0]),
      })),
    },
    holds: mayRead || mayWrite || mayExecute,
    goal: 'OPEN' as const,
  }
}

/** Enum options for Payload selects / ecommerce variations — mode is the access model. */
export const unixModeEnumsOf = () => {
  const reading = modeAccessOf({ mode: 5, who: 'other' })
  const bin3 = CombinatoricsFormulas.binomial(3)
  const bin5 = CombinatoricsFormulas.binomial(5)
  return {
    kind: 'unix-mode-enums' as const,
    source: 'access.* + combinatorics.binomial · Unix chmod/rwx/ugo',
    rwx: reading.enums.rwx,
    ugo: reading.enums.ugo,
    screenStates: {
      formula: 'combinatorics.binomial(5)',
      hex: bin5.hex ?? null,
      value: bin5.value,
      holds: bin5.holds === true,
      note: '2⁵ = 32 screen flag combinations; access.screen(flags)',
    },
    triadStates: {
      formula: 'combinatorics.binomial(3)',
      hex: bin3.hex ?? null,
      value: bin3.value,
      holds: bin3.holds === true,
      note: '2³ = 8 chmod triads per ugo class',
    },
  }
}

export const publicAccessOf = async (request?: Request, _env?: QpuEnv): Promise<Response> => {
  const url = request ? new URL(request.url) : null
  const mode = url?.searchParams.get('mode')
  const who = url?.searchParams.get('who') ?? undefined
  const reading = modeAccessOf({
    ...(mode !== null && mode !== undefined && /^\d+$/.test(mode) ? { mode: Number(mode) } : {}),
    ...(who ? { who: who as (typeof UGO)[number] } : {}),
  })
  const tools = mcpToolsListOf()
  const listBytes = JSON.stringify({ resultType: 'complete', tools }).length
  return Response.json(
    {
      ...reading,
      connectBill: {
        doors: tools.length,
        bytes: listBytes,
        under16384: listBytes < 16384,
        qpuPrefixed: tools.filter((t) => t.name.startsWith('qpu_')).length,
      },
    },
    { headers: { 'cache-control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=120' } },
  )
}
