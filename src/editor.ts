// editor — the SERIALIZER CONTRACT for a content-addressed document (a Lexical-shaped node tree), the fold whose laws
// lean/Editor.lean PROVES by decide: a document is a SEQUENCE (order is identity), so the fold is ORDER-SENSITIVE
// (reordering a node MOVES the address — the honest opposite of the memory store's order-invariant fold),
// change-sensitive (a changed node moves it), and INJECTIVE on the bounded model (the address determines the node
// sequence). The abstract fold is `dfold` (base-8 place value); the real, unbounded, collision-RESISTANT realization
// is `merkleRoot` (a positional merkle tree) over the serialized leaves' uuids. Editing is re-addressing.
//
// This is the piece a PayloadCMS plugin and a VitePress plugin BOTH import — ONE fold under both frameworks: the edit
// projection (Payload stamps the address on save) and the render projection (VitePress reads the same address) agree
// because the address IS the document. Integrity, not truth: the handle proves WHICH document, never that its content
// is correct — and injectivity holds only on the bounded model (pigeonhole: 2^128 addresses < all documents, so the
// real fold is collision-RESISTANT, not collision-free).
import { toUuid } from './address.js'
import { merkleRoot } from './merkle.js'

// A Lexical-shaped node: a type, optional text (a leaf), optional ORDERED children (a branch). The minimal shape the
// fold needs — a real Lexical node also carries format/style/direction; those ride along as extra keys, folded into
// the leaf verbatim by serialize below, so a format change moves the address too.
export interface DocNode { type: string; text?: string; children?: DocNode[]; [k: string]: unknown }
export interface EditorState { root: DocNode }  // the shape of Lexical's EditorState.toJSON()

// serialize — flatten the tree to a canonical, ORDER- and DEPTH-preserving leaf sequence (pre-order: each node emits
// its own leaf BEFORE its children). The leaf encodes depth, type, text and every extra key (sorted, so it is
// canonical), so reordering siblings, renesting, or editing any field changes the sequence — the order-/change-
// sensitivity lean/Editor.lean proves for dfold, realized on real nodes.
export function serialize(node: DocNode, depth = 0): string[] {
  const extra = Object.keys(node).filter((k) => k !== 'type' && k !== 'text' && k !== 'children').sort()
    .map((k) => k + '=' + JSON.stringify(node[k])).join(',')
  const self = depth + '|' + node.type + '|' + (node.text ?? '') + (extra ? '|' + extra : '')
  const kids = (node.children ?? []).flatMap((c) => serialize(c, depth + 1))
  return [self, ...kids]
}

// documentAddress — the content-address of a WHOLE document: merkleRoot (an ORDER-SENSITIVE positional merkle tree,
// the unbounded realization of dfold) over the serialized leaves' uuids. Same tree → same address (deterministic);
// reorder or edit a node → the address moves (proven). serialize always emits at least the root's own leaf, so the
// merkle input is never empty.
export function documentAddress(state: EditorState): string {
  return merkleRoot(serialize(state.root).map(toUuid))
}

// documentHandle — the first segment (8 hex) you CITE; the whole address is the fold (recompute-only), the same handle
// idiom as every uuidna address: cite the handle, recompute the fold.
export function documentHandle(state: EditorState): string {
  return documentAddress(state).slice(0, 8)
}

/** The result of re-addressing a document: the handle to cite, the full fold, and the node count folded. */
export interface DocFold { handle: string; address: string; nodes: number }

// reAddress — the EDIT hook stated as law: editing IS re-addressing. Recompute the address of the (edited) state; a
// change moves it (editor_fold_change_sensitive), an unchanged document returns the same (deterministic). No mutation.
export function reAddress(state: EditorState): DocFold {
  const leaves = serialize(state.root)
  const address = merkleRoot(leaves.map(toUuid))
  return { handle: address.slice(0, 8), address, nodes: leaves.length }
}

// ── PayloadCMS hook — "lean hooks to payload". Payload runs field/collection hooks with { data, ... } and expects the
// (possibly mutated) data back. This is that hook SHAPE, dependency-FREE (no payload import — the adapter, not the
// whole plugin): on every change it reads the Lexical editorState at `field`, folds it through the proven contract,
// and stamps `_handle` + `_address` onto the record, so the stored document carries its own tamper-evident receipt.
// The SAME fold a VitePress plugin calls at render time — one contract, both frameworks.
export interface PayloadHookArgs { data?: Record<string, unknown>; [k: string]: unknown }
export function payloadFoldHook(field = 'content') {
  return ({ data }: PayloadHookArgs): Record<string, unknown> => {
    const rec = data ?? {}
    const state = rec[field] as EditorState | undefined
    if (!state || typeof state !== 'object' || !('root' in state)) return rec  // no editorState to fold — pass through
    const { handle, address } = reAddress(state)
    return { ...rec, _handle: handle, _address: address }
  }
}
