// @non-harmonic: fetches Wikinews RSS over the network — articles are EVIDENCE for the news portal audit,
// never auto-sealed. Report.lean scope: uuidna audits decidable fragments, not whether events happened.
import { toUuid } from '../../address.js'
import type { NewsArticle } from './portal/index.js'

const RSS_ITEM = /<item>([\s\S]*?)<\/item>/g
const TAG = (block: string, name: string) =>
  (block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] ?? '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim()

/** fetchWikinewsFeatured(limit) → recent articles from Wikinews RSS (keyless). */
export async function fetchWikinewsFeatured(limit = 8): Promise<NewsArticle[]> {
  const url = 'https://en.wikinews.org/w/api.php?action=feedrecentchanges&feedformat=rss&rclimit=' + limit
  const res = await fetch(url)
  if (!res.ok) throw new Error(`wikinews RSS refused HTTP ${res.status}`)
  const xml = await res.text()
  const articles: NewsArticle[] = []
  for (const m of xml.matchAll(RSS_ITEM)) {
    if (articles.length >= limit) break
    const block = m[1]!
    const title = TAG(block, 'title')
    const body = TAG(block, 'description') || TAG(block, 'content:encoded')
    const date = TAG(block, 'pubDate').slice(0, 10)
    if (!title) continue
    articles.push({
      title,
      body,
      source: 'en.wikinews.org',
      domain: 'history',
      date,
    })
  }
  return articles
}

/** searchWikinews(query, limit) → article stubs from Wikinews search API (keyless). */
export async function searchWikinews(query: string, limit = 8): Promise<{ title: string; pageid: number; address: string }[]> {
  const url = 'https://en.wikinews.org/w/api.php?action=query&list=search&format=json&srlimit=' + limit
    + '&srsearch=' + encodeURIComponent(query)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`wikinews search refused HTTP ${res.status}`)
  const data = await res.json() as { query?: { search?: { pageid?: number; title?: string }[] } }
  return (data.query?.search ?? []).map((p) => ({
    title: p.title ?? '',
    pageid: p.pageid ?? 0,
    address: toUuid('wikinews:' + p.pageid),
  }))
}
