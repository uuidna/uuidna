// payload-seed — LEAN AS COMPUTABLE PAYLOADCMS SEEDS, versioned by content-address, indexed by REVERSE ENGINEERING.
// Each lean/*.lean file converts to a nested PayloadCMS page seed under src/seeds/<uuid>/, where the uuid is NOT a
// random id: it is a reversible IMPRINT of (status ∥ file-stem fingerprint ∥ content fingerprint). Any change to the
// Lean source moves the content fingerprint, so a new VERSION appears as a new src/seeds/<uuid> folder — versions are
// immutable, append-only, exactly like diamonds. And because the status travels IN the uuid, filtering and indexing
// cost NOTHING: readSeed(dirname) recovers (status, stem, content) with zero file reads and zero index — the folder
// listing IS the index, reverse-engineered from the names. Integrity
// structure; PayloadCMS renders it, and this module runs none of it.
import { coin64 } from './address.js'
import { imprint, readImprint } from './imprint.js'
import { documentAddress, type DocNode, type EditorState } from './editor.js'
import { PAYLOAD } from './site/index.js'

export type SeedStatus = 'draft' | 'usable' | 'retired'
const STATUS_BITS: Record<SeedStatus, string> = { draft: '000', usable: '001', retired: '010' }
const BITS_STATUS: Record<string, SeedStatus> = { '000': 'draft', '001': 'usable', '010': 'retired' }
const STATUS_W = 3
const STEM_W = 32
const BODY_W = 64

const hexBits = (hex: string, width: number): string => BigInt('0x' + hex).toString(2).padStart(width, '0').slice(-width)

/** seedUuid(fileStem, contents, status) → the version's uuid: a reversible imprint of status ∥ stem32 ∥ content64.
 *  Same stem + same contents + same status → the same uuid for everyone; any content change mints a NEW version. */
export function seedUuid(fileStem: string, contents: string, status: SeedStatus): string {
  const stem32 = hexBits(coin64('lean-seed-stem|' + fileStem), STEM_W)
  const body64 = hexBits(coin64(contents), BODY_W)
  return imprint(STATUS_BITS[status] + stem32 + body64)
}

export interface SeedIdentity { status: SeedStatus; stem32: string; content64: string }

/** readSeed(uuid) → reverse-engineer the identity OUT of the uuid: (status, stem fingerprint, content fingerprint),
 *  with zero file reads and zero index — this is why filtering and indexing are at no cost. */
export function readSeed(uuid: string): SeedIdentity {
  const bits = readImprint(uuid)
  if (bits.length !== STATUS_W + STEM_W + BODY_W) throw new Error('readSeed: not a seed uuid (payload width mismatch)')
  const status = BITS_STATUS[bits.slice(0, STATUS_W)]
  if (!status) throw new Error('readSeed: unknown status bits')
  return { status, stem32: bits.slice(STATUS_W, STATUS_W + STEM_W), content64: bits.slice(STATUS_W + STEM_W) }
}

/** filterSeeds(uuids, status) → the no-cost index in action: filter a folder listing by status decoded from the
 *  names alone. belongsTo(fileStem) narrows to one file's versions the same way. */
export function filterSeeds(uuids: readonly string[], status: SeedStatus): string[] {
  return uuids.filter((u) => { try { return readSeed(u).status === status } catch { return false } })
}
export function belongsTo(uuid: string, fileStem: string): boolean {
  try { return readSeed(uuid).stem32 === hexBits(coin64('lean-seed-stem|' + fileStem), STEM_W) } catch { return false }
}

export interface LeanPageSeed {
  uuid: string                 // the imprinted version id — the folder name under src/seeds/
  slug: string                 // the payload page slug (the lean file stem, lowercased)
  status: SeedStatus
  address: string              // documentAddress of the nested page tree — the editor-contract stamp
  page: EditorState            // the PayloadCMS/Lexical-shaped nested page: parent + one nested child page per theorem
}

/** buildLeanPageSeed(fileStem, contents, entries, usable) → the computable seed: a nested page tree (the parent page
 *  for the lean file, one nested child page per theorem — heading, statement code, proof code), stamped with its
 *  documentAddress (ORDER-SENSITIVE: a document is a sequence), identified by its imprinted version uuid. */
export function buildLeanPageSeed(
  fileStem: string,
  contents: string,
  entries: readonly { key: string; name: string; statement: string; lean: string }[],
  usable: boolean,
): LeanPageSeed {
  const status: SeedStatus = usable ? 'usable' : 'draft'
  const children: DocNode[] = entries.map((t) => ({
    type: 'page',
    slug: 'theorem-' + t.key,
    children: [
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: t.name }] },
      { type: 'code', language: 'lean', children: [{ type: 'text', text: t.statement }] },
      { type: 'code', language: 'lean', children: [{ type: 'text', text: t.lean }] },
    ],
  }))
  const page: EditorState = {
    root: {
      type: 'root',
      children: [
        { type: 'heading', tag: 'h1', children: [{ type: 'text', text: fileStem + '.lean — the sealed source' }] },
        { type: 'code', language: 'lean', children: [{ type: 'text', text: contents }] },
        ...children,
      ],
    },
  }
  return { uuid: seedUuid(fileStem, contents, status), slug: fileStem.toLowerCase(), status, address: documentAddress(page), page }
}

/** The seed's own integrity: the folder name recomputes from (stem, contents, status), the page address from the
 *  tree — both verifiable offline, no registry consulted. */
export function verifySeed(seed: LeanPageSeed, fileStem: string, contents: string): boolean {
  return seed.uuid === seedUuid(fileStem, contents, seed.status) && seed.address === documentAddress(seed.page)
}

// ---- PAYLOAD COLLECTION SYNC — no collections of our own. uuidna emits docs in the STANDARD shapes the Payload
// pages collection and its stock plugins already speak — the nested-docs parent relation, the drafts `_status`,
// the lexical `content` field — so a vanilla Payload instance AUTO-RECOGNIZES the seeds with zero custom schema.
// com/payloadcms/website, 2026-08-18):
// "vanilla" here means a richText/lexical `content` field — payloadcms/website itself does NOT use one. Its
// Pages collection renders a `layout` BLOCKS array (callout/cta/content/…), so this doc shape would sit
// unrendered there. toPayloadBlocksDoc BELOW is that second shape — EACH THEOREM IS A BLOCK, one page per
// wing. Nested-docs (breadcrumbs: true) and the pages/_status shapes generalize; only the body field's shape
// does not, which is why there are two emitters rather than one adapter bolted onto this one.
// usable → _status 'published'; draft → _status 'draft'. The parent page carries the lean file; each theorem is a
// child doc whose `parent` names the parent slug (the nested-docs convention), breadcrumbs and tree views follow
// for free. The version uuid rides in `uuidnaVersion` so a sync is idempotent: same uuid, nothing to write.
export interface PayloadDoc {
  slug: string
  title: string
  _status: 'published' | 'draft'
  parent: string | null        // the nested-docs plugin relation, by parent slug (null = a root page)
  content: EditorState         // the lexical richText field shape
  uuidnaVersion: string        // the imprinted version uuid — decode with readSeed, sync idempotently by equality
  uuidnaAddress: string        // the order-sensitive documentAddress stamp
}

/** toPayloadDocs(seed) → the seed flattened into standard Payload pages-collection docs: one parent (the lean
 *  file) + one child per theorem, wired by the nested-docs `parent` slug. Feed them to Payload's Local/REST API
 *  upsert-by-slug; compare `uuidnaVersion` first and skip equal — the whole sync is recognition. */
export function toPayloadDocs(seed: LeanPageSeed): PayloadDoc[] {
  // the drafts field's values come from the one shared model, so the emitter and the sync stay in step, rather than disagree
  const status: 'published' | 'draft' = seed.status === 'usable' ? PAYLOAD.statuses.published : PAYLOAD.statuses.draft
  const rootChildren = seed.page.root.children ?? []
  const parentBody: EditorState = { root: { type: 'root', children: rootChildren.filter((n) => n.type !== 'page') } }
  const parent: PayloadDoc = {
    slug: seed.slug, title: seed.slug + '.lean', _status: status, parent: null,
    content: parentBody, uuidnaVersion: seed.uuid, uuidnaAddress: seed.address,
  }
  const children: PayloadDoc[] = rootChildren.filter((n) => n.type === 'page').map((n) => ({
    slug: String((n as { slug?: unknown }).slug ?? ''),
    title: String((n as { slug?: unknown }).slug ?? ''),
    _status: status,
    parent: seed.slug,
    content: { root: { type: 'root', children: n.children ?? [] } },
    uuidnaVersion: seed.uuid,
    // EACH CHILD IS ITS OWN ADDRESS. This stamped seed.address on every child, so a wing and all its theorems
    // shared one identity: 1380 docs carried 72 distinct addresses, one group of 235. If a receiving system keys
    // on the address — the natural choice, since it is the identity — 235 theorems collapse into one document.
    // The child's address is now computed from the child's OWN content, by the same documentAddress the wing uses.
    uuidnaAddress: documentAddress({ root: { type: 'root', children: n.children ?? [] } } as EditorState),
  }))
  return [parent, ...children]
}

// ---- THE BLOCKS ADAPTER — the captain's correction (2026-08-18): "each theorem is a block." payloadcms/website's
// own Pages collection has no lexical `content` field; it renders a `layout` BLOCKS array (callout/cta/content/…).
// toPayloadDocs' one-page-per-theorem shape auto-recognizes on a richText receiver but sits unrendered on a
// blocks receiver — not because the DATA is wrong, but because the SHAPE is wrong: many docs vs. one doc, many
// blocks. This is the second shape`layout` holding one block PER
// THEOREM, each block carrying the theorem's own lexical content and its own address — the same per-theorem
// identity toPayloadDocs now stamps, just folded into blocks instead of spread across sibling documents.
export interface PayloadBlock {
  blockType: 'theorem'
  slug: string
  title: string
  content: EditorState          // the theorem's own lexical root — unchanged data, a different envelope
  uuidnaAddress: string         // per-block identity: the same fix that ended the 72-address collision in toPayloadDocs
}

export interface PayloadBlocksDoc {
  slug: string
  title: string
  _status: 'published' | 'draft'
  layout: PayloadBlock[]        // one entry per theorem — the wing IS its blocks
  uuidnaVersion: string
  uuidnaAddress: string         // the wing's own address (documentAddress of the whole seed), distinct from every block's
}

/** toPayloadBlocksDoc(seed) → ONE page per wing, its theorems folded into `layout` as blocks instead of spread
 *  into sibling child docs. Feed to a blocks-based Pages collection (payloadcms/website's own shape); a
 *  richText-based receiver should use toPayloadDocs instead — the data is identical, only the envelope differs. */
export function toPayloadBlocksDoc(seed: LeanPageSeed): PayloadBlocksDoc {
  const status: 'published' | 'draft' = seed.status === 'usable' ? PAYLOAD.statuses.published : PAYLOAD.statuses.draft
  const rootChildren = seed.page.root.children ?? []
  const layout: PayloadBlock[] = rootChildren.filter((n) => n.type === 'page').map((n) => {
    const content: EditorState = { root: { type: 'root', children: n.children ?? [] } }
    return {
      blockType: 'theorem',
      slug: String((n as { slug?: unknown }).slug ?? ''),
      title: String((n as { slug?: unknown }).slug ?? ''),
      content,
      uuidnaAddress: documentAddress(content),   // per-theorem's — the same law toPayloadDocs pays
    }
  })
  return {
    slug: seed.slug, title: seed.slug + '.lean', _status: status,
    layout, uuidnaVersion: seed.uuid, uuidnaAddress: seed.address,
  }
}
