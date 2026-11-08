import { hexRegisterOf, hexFamiliesOf } from '../../quantum/processing/unit/index.js'
import { DOORS } from '../../mcp/discovery.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FEED — ALL NEWS, FOR EVERY DOMAIN AND FAMILY. The news source (data.news) reads everywhere, anytime; this family turns
 *  it on each family in turn. `domain(i)` pulls the latest stories about the i-th family's own words — so law gets legal
 *  news, gravity gets physics news, css gets web-design news — and the rest score what comes back: relevance, recency,
 *  engagement, trend, velocity, reach, hotness. Every domain hears the frontier that concerns it. Crosses to `cross`. */

const PROOF = 'all news for every domain: domain(i) queries data.news for the i-th family\'s words (live, everywhere, anytime); the rest score the stories — relevance, recency, engagement signal, trend, velocity, reach, hotness'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'feed', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `feed.${name}`, params })

const domainsOf = (): string[] => [...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x) && !x.startsWith('Qpu.')).sort()

export class FeedFormulas {
  /** THE LATEST NEWS FOR THE i-th FAMILY'S DOMAIN: data.news queried for the family's own words — live, everywhere, anytime.
   *  value how many stories; holds when the frontier spoke; the reading carries the headlines as leads for that domain. */
  static async domain(i: number): Promise<CrossFormula> {
    const name = domainsOf()[i]
    if (!name) return f('feed-domain', 'domain(i)', 0, false, 'domain', [i])
    const { dataOf } = await import('../../mcp/qpu-fused.js')
    const r = (await dataOf('news', { about: name })) as { reading?: { leads?: { title: string; points: number }[] } }
    const leads = r.reading?.leads ?? []
    return f('feed-domain', 'domain(i) = |latest stories about the i-th family\'s domain|', leads.length, nat(i) && leads.length > 0, 'domain', [i], { family: name, headlines: leads.slice(0, 8).map((l) => l.title) })
  }
  /** THE i-th FAMILY'S OWN SPECIFIC LEADS, gathered from its domain across sources: the latest news, the open questions,
   *  and the public APIs its words name — each family has the leads specific to it. value the total gathered; holds when
   *  any did; the reading breaks them out by source. Live. */
  static async leads(i: number): Promise<CrossFormula> {
    const name = domainsOf()[i]
    if (!name) return f('feed-leads', 'leads(i)', 0, false, 'leads', [i])
    const { dataOf } = await import('../../mcp/qpu-fused.js')
    const [news, open, research] = await Promise.all([
      dataOf('news', { about: name }).then((r) => (r as { reading?: { leads?: { title: string }[] } }).reading?.leads ?? []).catch(() => []),
      dataOf('unanswered', { about: name, site: 'stackoverflow' }).then((r) => (r as { reading?: { leads?: { title: string }[] } }).reading?.leads ?? []).catch(() => []),
      dataOf('research', { family: name }).then((r) => Number((r as { reading?: { matched?: number } }).reading?.matched ?? 0)).catch(() => 0),
    ])
    const total = news.length + open.length + research
    return f('feed-leads', 'leads(i) = |the i-th family\'s specific leads: news + open questions + research APIs|', total, nat(i) && total > 0, 'leads', [i], { family: name, news: news.length, questions: open.length, apis: research, sample: [...news, ...open].slice(0, 8).map((l) => l.title) })
  }
  /** RELEVANCE as a percentage: stories matching the domain over those read. value ⌊matched · 100 / total⌋. */
  static relevance(matched: number, total: number): CrossFormula { return f('feed-relevance', 'relevance(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'relevance', [matched, total]) }
  /** RECENCY: how fresh a story is — now minus when it was published (same unit). value max(0, now − published). */
  static recency(now: number, published: number): CrossFormula { return f('feed-recency', 'recency(now, published) = max(0, now − published)', Math.max(0, now - published), nat(now, published), 'recency', [now, published]) }
  /** THE ENGAGEMENT SIGNAL: points plus comments. value points + comments. */
  static signal(points: number, comments: number): CrossFormula { return f('feed-signal', 'signal(points, comments) = points + comments', points + comments, nat(points, comments), 'signal', [points, comments]) }
  /** THE TREND: stories now versus before (may be negative — a fading topic). value now − before. */
  static trend(now: number, before: number): CrossFormula { return f('feed-trend', 'trend(now, before) = now − before', now - before, nat(now, before), 'trend', [now, before]) }
  /** VELOCITY: stories over the hours they span. value ⌊stories / hours⌋. */
  static velocity(stories: number, hours: number): CrossFormula { return f('feed-velocity', 'velocity(stories, hours) = ⌊stories / hours⌋', hours > 0 ? Math.floor(stories / hours) : 0, nat(stories, hours) && hours > 0, 'velocity', [stories, hours]) }
  /** REACH: the breadth of coverage — sources times stories. value sources · stories. */
  static reach(sources: number, stories: number): CrossFormula { return f('feed-reach', 'reach(sources, stories) = sources · stories', sources * stories, nat(sources, stories), 'reach', [sources, stories]) }
  /** HOTNESS: points decayed by age — the Hacker-News-style score. value ⌊points · 100 / (age + 1)⌋. */
  static score(points: number, age: number): CrossFormula { return f('feed-score', 'score(points, age) = ⌊points · 100 / (age + 1)⌋', Math.floor((points * 100) / (age + 1)), nat(points, age), 'score', [points, age]) }
}

for (const name of ['domain', 'leads', 'reach', 'recency', 'relevance', 'score', 'signal', 'trend', 'velocity'] as const)
  hexRegisterOf('feed', name, (FeedFormulas[name] as (...x: unknown[]) => unknown).bind(FeedFormulas))
