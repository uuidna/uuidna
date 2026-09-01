// dirty-paths — WHOSE WORK IS THIS FILE? Asked without asking who anybody is.
//
// THE FAILURE THIS EXISTS FOR (2026-08-25). Five sessions share ONE checkout, and every one of them commits as
// the same person. A session committed `git commit -- src/scripts/one-receipt.ts`, believing the pathspec form
// protected it from sweeping a peer's work. It does not: the pathspec form protects against the shared INDEX and
// takes the whole file's WORKING-TREE state. Of 83 insertions attributed to that commit, roughly twenty belonged
// to its author. PATH-LEVEL ISOLATION IS NOT HUNK-LEVEL ISOLATION.
//
// The mirror error happened the same hour, to the peer whose work was swept: isolating their own hunks OUT of the
// shared file, they stripped a comment the other session had written, so their side read as a deletion nobody
// intended. Same cause, opposite sign — a FILE IS NOT A UNIT OF AUTHORSHIP when several hands are in it.
//
// WHY THIS DOES NOT ASK WHO WROTE WHAT. It cannot: git sees one name for every session here, so authorship is not
// computable in this tree and any finder resting on it would be resting on nothing. What a session DOES know is
// what it found when it opened. "This path was already dirty before I arrived" needs no identity, no clock, and
// no cooperation from anyone else — it is local knowledge, and it catches both signs of the error.
//
// THREE ANSWERS, NEVER TWO. The whole of tonight's defect list is one predicate: THE HEALTHY CASE AND THE BROKEN
// CASE RETURNED THE SAME VALUE. `[]` from a down archive equalled `[]` from a clean one; VOID equalled
// not-failed; a memo hit equalled a fold; a missing flag equalled not-an-ancestor; a recycled pid equalled a live
// holder; a green `by receipt` equalled a green run. An instrument built to end that class must not commit it, so
// "the manifest cannot speak about this path" is its own answer and is NOT "the path was clean". A path created
// after the session opened, a path outside the scanned scope, a missing manifest — each is UNKNOWN, and unknown
// asks rather than assumes.

//  — THE HOLE THIS DOES NOT CLOSE, named here rather than discovered later. The question answered is
// "was this path already dirty when I arrived". It therefore catches the case that actually bit: a peer was mid-
// edit in a file and a whole-file commit swept their hunks. It does NOT catch a path that became dirty AFTER the
// session opened but by somebody else's hand — that reads `mine`, because from this session's local knowledge it
// is indistinguishable from a file the session dirtied itself.
//
// That case is not closable here, and saying so is the point. Distinguishing it needs authorship, and authorship
// does not exist in this checkout: five sessions, one name, and git cannot arbitrate. A finder that pretended
// otherwise would be claiming a reading it cannot take — which is the whole disease. What narrows the hole is
// opening EARLY: everything a session did not start is dirty at its open, so the earlier the open, the more of
// the tree the answer covers. A session that opens on arrival has almost no hole; one that opens late has a
// large one, and the tool cannot tell which it is.

/** What a session found when it opened, and — just as importantly — what it looked at. */
export interface OpenManifest {
  /** paths already differing from HEAD when this session opened: somebody else's work, in progress */
  dirtyAtOpen: readonly string[]
  /** the roots the scan COVERED. A path outside these is UNKNOWN, never "clean" — see the three-answers note. */
  covered: readonly string[]
  /** the commit the scan was taken against, so a manifest cannot be read against a different tree by accident */
  head: string
}

/** mine — clean when I arrived, so whatever is in it now is mine to commit.
 *  foreign — already dirty when I arrived: a peer is mid-edit and this is not mine to publish.
 *  unknown — the manifest cannot speak about it. Ask; never assume either of the other two. */
export type Ownership = 'mine' | 'foreign' | 'unknown'

/** does `root` cover `path`? Exact match, or a directory prefix — compared on '/' boundaries so that a root of
 *  `src/scripts` never claims `src/scripts-extra/x.ts` by string prefix alone. */
export const covers = (root: string, path: string): boolean =>
  root === '.' || path === root || path.startsWith(root.endsWith('/') ? root : root + '/')

/** ownershipOf(path, manifest) → which of the three, computed and never guessed.
 *
 *  Order matters and is deliberate: coverage is asked BEFORE dirtiness. A path the scan never looked at is
 *  unknown even if it happens to be absent from dirtyAtOpen, because absence from a list you did not populate is
 *  not evidence. That single ordering is what keeps this finder off its own list. */
export function ownershipOf(path: string, manifest: OpenManifest | null): Ownership {
  if (!manifest) return 'unknown'
  if (!manifest.covered.some((r) => covers(r, path))) return 'unknown'
  return manifest.dirtyAtOpen.includes(path) ? 'foreign' : 'mine'
}

export interface Verdict { path: string; ownership: Ownership }

/** judge(paths, manifest, allowed) → a verdict per path, and whether the commit may proceed.
 *
 *  THE OVERRIDE NAMES ITS PATH. A blanket `--force` becomes a habit inside a week, and this whole finding exists
 *  because two careful sessions' habits failed under time pressure. `allowed` therefore holds the paths an author
 *  has explicitly said they mean to commit — one statement per file actually thought about. Committing a file a
 *  peer dirtied is legitimate and happens (a reconcile does it by design, and one session deliberately landed
 *  four payload seeds another had generated); what must not happen is doing it without noticing. */
export function judge(
  paths: readonly string[],
  manifest: OpenManifest | null,
  allowed: readonly string[] = [],
): { verdicts: Verdict[]; ok: boolean; blocking: Verdict[] } {
  const verdicts = paths.map((path) => ({ path, ownership: ownershipOf(path, manifest) }))
  const blocking = verdicts.filter((v) => v.ownership !== 'mine' && !allowed.includes(v.path))
  return { verdicts, ok: blocking.length === 0, blocking }
}

/** THE SCAN COVERS THE WHOLE TREE, and says so rather than implying it. `git status --porcelain
 *  --untracked-files=all` with no pathspec sees every path git can see, so '.' is the honest coverage. An
 *  earlier draft listed four roots, which UNDERSTATED what had been measured and manufactured false UNKNOWNs for
 *  root files — a smaller error than claiming more than you know, and still an instrument not matching its own
 *  reading. */
export const COVERED = ['.'] as const

/** where a session's manifest lives — beside the writer lock, gitignored for the same reason: a session's own
 *  state is never source. One file per session, because two sessions in one checkout each need their own answer
 *  to "what did I find", and a shared one would be the very confusion this module exists to end. */
export const sessionPath = (root: string, sid: string): string => `${root}/.uuidna-sessions/${sid}.json`

/** the charge sheet — one line per blocking path, each carrying the exact cure for ITS answer, because the two
 *  answers want different acts: a foreign path wants a conversation, an unknown one wants a manifest. */
export const chargeSheet = (blocking: readonly Verdict[]): string[] =>
  blocking.map((v) => v.ownership === 'foreign'
    ? `  FOREIGN ${v.path} — already dirty when this session opened, so it carries work that is not yours.\n` +
      `    FIX ask whoever is editing it, or commit it deliberately with --also ${v.path}`
    : `  UNKNOWN ${v.path} — the session manifest cannot speak about this path, which is NOT the same as clean.\n` +
      `    FIX re-open the session manifest (dirty-paths --open) so the question has an answer, or --also ${v.path}`)
