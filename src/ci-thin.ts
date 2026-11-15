// ci-thin — CI IS A THIN MCP CLIENT (the captain, 2026-11-15: "improve ci to be a thin mcp client"). A workflow keeps
// the runner's own work (checkout, install, build, git, artefacts) and reaches the repository's logic only through the
// uuidna_ci door: `npm run -s mcp -- uuidna_ci '{"step":"<program>"|"npm:<script>"}' --local`. This finder names every workflow
// command that runs a dist/scripts program or a package.json script directly instead; build and mcp itself are the
// client's own two steps and stay direct.

/** the shell commands on one workflow line, split at operators that sit outside quotes and ${{ }} expressions */
export function commandsOf(line: string): string[] {
  const out: string[] = []
  let cur = '', depth = 0, q = '', redirected = false
  const push = (): void => { if (!redirected) out.push(cur.trim()); cur = '' }
  for (let i = 0; i < line.length;) {
    const c = line[i]!
    if (q) { cur += c; i++; if (c === q) q = ''; continue }
    if (line.startsWith('${{', i)) { depth++; cur += '${{'; i += 3; continue }
    if (depth && line.startsWith('}}', i)) { depth--; cur += '}}'; i += 2; continue }
    if (!depth && (c === '"' || c === "'")) { q = c; cur += c; i++; continue }
    const op = depth ? null : /^\s*(\|\||&&|\||;|\d*>>?(?:&\d+)?)\s*/.exec(line.slice(i))
    if (op && op[0].trim()) { push(); redirected = op[1]!.includes('>'); i += op[0].length; continue }
    cur += c; i++
  }
  push()
  return out.map((s) => s.replace(/^(?:-\s+)?(?:run:\s*)?/, '')).filter(Boolean)
}

/** thinCiGaps(file, text) → "file:line command" for every direct call of the repository's logic */
export function thinCiGaps(file: string, text: string): string[] {
  const gaps: string[] = []
  text.split('\n').forEach((line, n) => {
    if (line.trimStart().startsWith('#')) return
    for (const cmd of commandsOf(line)) {
      const direct = /^node\s+dist\/scripts\/[a-z0-9-]+\.js\b/.test(cmd) || (/^npm\s+run\s+/.test(cmd) && !/^npm\s+run\s+(?:build|-s\s+mcp|mcp)(?:\s|$)/.test(cmd))
      if (direct) gaps.push(`${file}:${n + 1} ${cmd}`)
    }
  })
  return gaps
}
