type ClientDetails = {
  name: string
  type: 'ai-crawler' | 'browser' | 'cli' | 'other-bot' | 'search-crawler' | 'unknown'
}

type DocumentDetails = {
  type: 'html-page' | 'llms-full' | 'llms-index' | 'markdown-page'
  version: 'all' | 'v2' | 'v3' | 'v4'
}

const aiClients: Array<{ name: string; pattern: RegExp }> = [
  { name: 'OpenAI', pattern: /GPTBot|ChatGPT-User|OAI-SearchBot|OpenAI/i },
  { name: 'Anthropic', pattern: /ClaudeBot|Claude-User|Claude-Web|anthropic-ai/i },
  { name: 'Perplexity', pattern: /PerplexityBot|Perplexity-User/i },
  { name: 'Cohere', pattern: /cohere-ai/i },
  { name: 'Meta', pattern: /meta-externalagent|FacebookBot/i },
  { name: 'ByteDance', pattern: /Bytespider/i },
  { name: 'Amazon', pattern: /Amazonbot/i },
]

const searchClients: Array<{ name: string; pattern: RegExp }> = [
  { name: 'Google', pattern: /Googlebot/i },
  { name: 'Bing', pattern: /bingbot/i },
  { name: 'DuckDuckGo', pattern: /DuckDuckBot/i },
  { name: 'Apple', pattern: /Applebot/i },
]

export function classifyClient(userAgent: string): ClientDetails {
  for (const client of aiClients) {
    if (client.pattern.test(userAgent)) {
      return { name: client.name, type: 'ai-crawler' }
    }
  }

  for (const client of searchClients) {
    if (client.pattern.test(userAgent)) {
      return { name: client.name, type: 'search-crawler' }
    }
  }

  if (/curl/i.test(userAgent)) {
    return { name: 'curl', type: 'cli' }
  }

  if (/Wget/i.test(userAgent)) {
    return { name: 'Wget', type: 'cli' }
  }

  if (/HTTPie/i.test(userAgent)) {
    return { name: 'HTTPie', type: 'cli' }
  }

  if (/bot|crawler|spider/i.test(userAgent)) {
    return { name: 'Other bot', type: 'other-bot' }
  }

  if (/Mozilla/i.test(userAgent)) {
    return { name: 'Browser', type: 'browser' }
  }

  return userAgent
    ? { name: 'Unknown client', type: 'unknown' }
    : { name: 'Missing', type: 'unknown' }
}

export function classifyDocument(pathname: string): DocumentDetails | undefined {
  if (pathname === '/llms.txt') {
    return { type: 'llms-index', version: 'all' }
  }

  if (pathname === '/llms-full.txt') {
    return { type: 'llms-full', version: 'v3' }
  }

  if (!pathname.startsWith('/docs')) {
    return undefined
  }

  const version =
    pathname.startsWith('/docs/beta') || pathname.startsWith('/docs/v4')
      ? 'v4'
      : pathname.startsWith('/docs/v2')
        ? 'v2'
        : 'v3'

  if (pathname.endsWith('/llms.txt')) {
    return { type: 'llms-index', version }
  }

  if (pathname.endsWith('/llms-full.txt')) {
    return { type: 'llms-full', version }
  }

  return {
    type: pathname.endsWith('.md') ? 'markdown-page' : 'html-page',
    version,
  }
}

function getReferrerHost(referrer: null | string): string {
  if (!referrer) {
    return 'none'
  }

  try {
    return new URL(referrer).hostname || 'none'
  } catch {
    return 'invalid'
  }
}

function getRequestedFormat(accept: null | string): 'html' | 'markdown' | 'other' {
  if (accept?.includes('text/markdown')) {
    return 'markdown'
  }

  if (accept?.includes('text/html')) {
    return 'html'
  }

  return 'other'
}

// One structured log line per documentation request. The Worker's observability (Workers Logs) keeps and queries it:
// https://developers.cloudflare.com/workers/observability/logs/workers-logs/
export function trackDocumentationRequest(request: Request): void {
  if (process.env.LLMS_ANALYTICS_ENABLED !== 'true') {
    return
  }

  const url = new URL(request.url)
  const document = classifyDocument(url.pathname)

  if (!document) {
    return
  }

  const client = classifyClient(request.headers.get('user-agent') || '')

  console.log( // eslint-disable-line no-console
    JSON.stringify({
      client_name: client.name,
      client_type: client.type,
      document_path: url.pathname,
      document_type: document.type,
      documentation_version: document.version,
      event: 'documentation_request',
      referrer_host: getReferrerHost(request.headers.get('referer')),
      requested_format: getRequestedFormat(request.headers.get('accept')),
    }),
  )
}
