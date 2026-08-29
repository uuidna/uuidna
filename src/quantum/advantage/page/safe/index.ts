// page/safe — PAGE-LEVEL FIDELITY of the advantage (TypeScript computes; VitePress monitors).
//
// page/metrics is REACH and COST for a page. This is FIDELITY: mill ore must not be measured as Vue. VitePress
// compiles every markdown page as a Vue SFC, so a raw `<span>` or `/theorem/<key>` in a finding note collapses
// into an element (and an unclosed one fails the site build). One constructor, one order, every mill writer.
//
// THE ORDER IS THE WHOLE CORRECTNESS ARGUMENT. Escaping `|` before `\` leaves `\|` in the source as an escaped
// backslash plus a LIVE delimiter (js/incomplete-sanitization). Newlines split a table row before Vue ever
// sees it. `{{` is Vue interpolation. `<` `>` are tags. markdown-it then DECODES `&lt;` back to `<` in page text
// before Vue parses the SFC, so a single entity is a live tag again — truncated mill HTML (`<span class="w`,
// `<a href="/wik`) is "Element is missing end tag" and the site build dies. Emit `&amp;lt;` so one decode leaves
// `&lt;`, which Vue keeps as text. Already-escaped mill HTML (`&lt;span`) is promoted the same way; `&amp;lt;`
// contains no `&lt;` substring, so a second pass is a no-op. Backslash, newline, pipe, then tags — never the reverse.
export function pageSafe(s: string): string {
  return String(s)
    .replace(/\{\{/g, '{ {')
    .replace(/&lt;/g, '&amp;lt;')
    .replace(/&gt;/g, '&amp;gt;')
    .replace(/</g, '&amp;lt;')
    .replace(/>/g, '&amp;gt;')
}

/** Table cell: the mill's least-trusted string. Pipe-safe, one row, then pageSafe. */
export function pageCell(s: string): string {
  return pageSafe(
    String(s)
      .replace(/\\/g, '\\\\')
      .replace(/\r?\n/g, ' ')
      .replace(/\|/g, '\\|')
      .replace(/`/g, "'"),
  )
}
