// categories/books/librarian — THE LIBRARIAN (lead 81b, 3 of 4): the shelf ranked and browsable, pure over the
// record the caller brings (the committed book-leads — no network; the browser reads what the tree already
// holds). Ranking is DECLARED, never felt: facts found in the text weigh first (a book that states decidable
// arithmetic is a book the school can drain), then breadth of ledger linkage, ties by title — the same ordering
// on any machine. HONEST SCOPE: an ordering of RECORDS by counted properties; not a judgment of literature, and
// a book low on the shelf is low on arithmetic, nothing else.
export interface BookLead { id?: number | string; title?: string; authors?: string[]; facts?: number; linked?: number; why?: string }
export interface ShelfEntry extends BookLead { rank: number; weight: number }

export function rankShelf(leads: readonly BookLead[]): ShelfEntry[] {
  return [...leads]
    .map((l) => ({ ...l, weight: (l.facts ?? 0) * 10 + (l.linked ?? 0) }))
    .sort((a, b) => b.weight - a.weight || String(a.title ?? '').localeCompare(String(b.title ?? '')))
    .map((l, i) => ({ ...l, rank: i + 1 }))
}
