// package-version — THE ONE PLACE THE SHIPPED VERSION IS WRITTEN, and it is a literal on purpose.
//
// WHY A LITERAL RATHER THAN A READ. This module is imported by src/mcp.ts, which runs in TWO runtimes: Node,
// where a filesystem read of package.json would work, and the edge Worker, where there is no filesystem at all.
// A runtime-dependent version is worse than a literal, so the literal stays and a TEST holds it to package.json.
// That is the same discipline the stamped surfaces use: one source, and a gate that fails when it drifts.
//
// WHAT IT COST TO NOT HAVE THIS. src/mcp.ts carried `const VERSION = '6.9.0'` while the package was at 0.3.0,
// so the stdio MCP door reported a version that has never existed to every client that connected — and
// src/mcp-http.ts carried its own separate literal, which happened to be right. Two literals beside a version
// field, one of them wrong by six major versions, and nothing compared either to the package.
export const PKG_VERSION = '0.3.1'
