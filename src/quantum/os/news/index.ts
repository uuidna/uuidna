// @non-harmonic: uuidnaOS news port — Wikinews RSS and search (network). Articles are evidence, never auto-sealed.
import { toUuid } from '../../../address.js'
import { fetchData } from '../fetch/index.js'

export interface NewsArticleStub {
  title: string
  body: string
  source: string
  domain: string
  date: string
}

const RSS_ITEM = /<item>([\s\S]*?)<\/item>/g
const TAG = (block: string, name: string) =>
  (block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] ?? '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim()

/** fetchWikinewsFeatured(limit) → recent articles from Wikinews RSS (keyless). */
export async function fetchWikinewsFeatured(limit = 8): Promise<NewsArticleStub[]> {
  const url = 'https://en.wikinews.org/w/api.php?action=feedrecentchanges&feedformat=rss&rclimit=' + limit
  const got = await fetchData<string>(url, 'text')
  if (got.data === null) throw new Error(`wikinews RSS declined: ${got.note}`)
  const articles: NewsArticleStub[] = []
  for (const m of got.data.matchAll(RSS_ITEM)) {
    if (articles.length >= limit) break
    const block = m[1]!
    const title = TAG(block, 'title')
    const body = TAG(block, 'description') || TAG(block, 'content:encoded')
    const date = TAG(block, 'pubDate').slice(0, 10)
    if (!title) continue
    articles.push({ title, body, source: 'en.wikinews.org', domain: 'history', date })
  }
  return articles
}

/** searchWikinews(query, limit) → article stubs from Wikinews search API (keyless). */
export async function searchWikinews(query: string, limit = 8): Promise<{ title: string; pageid: number; address: string }[]> {
  const url = 'https://en.wikinews.org/w/api.php?action=query&list=search&format=json&srlimit=' + limit
    + '&srsearch=' + encodeURIComponent(query)
  const got = await fetchData<{ query?: { search?: { pageid?: number; title?: string }[] } }>(url, 'json')
  if (got.data === null) throw new Error(`wikinews search declined: ${got.note}`)
  return (got.data.query?.search ?? []).map((p) => ({
    title: p.title ?? '',
    pageid: p.pageid ?? 0,
    address: toUuid('wikinews:' + p.pageid),
  }))
}
