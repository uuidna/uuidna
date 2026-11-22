// /api/mcp is served by the package's own transport (serveMcp), not a Payload plugin: the same 48-tool catalogue,
// framed as Streamable-HTTP, with Cloudflare x402 paid tools when the env names a wallet. This route is more
// specific than Payload's /api/[...slug] catch-all, so Next routes /api/mcp here.
import { serveMcp } from '@uuidna/qpu/serve'

const serve = (request: Request): Promise<Response> => serveMcp(request, process.env as Record<string, string | undefined>)

export const GET = serve
export const POST = serve
export const OPTIONS = serve
