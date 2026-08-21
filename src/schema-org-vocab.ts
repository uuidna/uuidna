// schema-org-vocab — the ONE vetted schema.org vocabulary list, and the ONE walk that checks a JSON-LD node
// against it. Previously lived only inside seo.test.ts, private to that one test — gen-feed.ts needed the exact
// same check for a different JSON-LD surface (the united feed) and would otherwise have started a second,
// parallel vocabulary list, the same drift class this whole session has been finding and fixing elsewhere.
// Add a new @type or property here, vetted with its real schema.org URL, and every consumer (seo.ts's own tests,
// gen-feed.ts's) sees it — one list.

export const SCHEMA_ORG_TYPES: Readonly<Record<string, string>> = {
  ScholarlyArticle: 'https://schema.org/ScholarlyArticle',
  WebPage: 'https://schema.org/WebPage',
  WebSite: 'https://schema.org/WebSite',
  Dataset: 'https://schema.org/Dataset',
  Organization: 'https://schema.org/Organization',
  Person: 'https://schema.org/Person',
  School: 'https://schema.org/School',
  MathSolver: 'https://schema.org/MathSolver',
  SolveMathAction: 'https://schema.org/SolveMathAction',
  EntryPoint: 'https://schema.org/EntryPoint',
  Course: 'https://schema.org/Course',
  DataFeed: 'https://schema.org/DataFeed',
  DataFeedItem: 'https://schema.org/DataFeedItem',
}

export const SCHEMA_ORG_PROPERTIES: Readonly<Record<string, string>> = {
  name: 'https://schema.org/name',
  headline: 'https://schema.org/headline',
  abstract: 'https://schema.org/abstract',
  identifier: 'https://schema.org/identifier',
  url: 'https://schema.org/url',
  keywords: 'https://schema.org/keywords',
  isBasedOn: 'https://schema.org/isBasedOn',
  creativeWorkStatus: 'https://schema.org/creativeWorkStatus',
  isPartOf: 'https://schema.org/isPartOf',
  publisher: 'https://schema.org/publisher',
  mainEntity: 'https://schema.org/mainEntity',
  description: 'https://schema.org/description',
  mathExpression: 'https://schema.org/mathExpression',
  potentialAction: 'https://schema.org/potentialAction',
  target: 'https://schema.org/target',
  urlTemplate: 'https://schema.org/urlTemplate',
  httpMethod: 'https://schema.org/httpMethod',
  contentType: 'https://schema.org/contentType',
  isAccessibleForFree: 'https://schema.org/isAccessibleForFree',
  provider: 'https://schema.org/provider',
  license: 'https://schema.org/license',
  copyrightYear: 'https://schema.org/copyrightYear',
  creditText: 'https://schema.org/creditText',
  copyrightHolder: 'https://schema.org/copyrightHolder',
  dataFeedElement: 'https://schema.org/dataFeedElement',
  item: 'https://schema.org/item',
  dateCreated: 'https://schema.org/dateCreated',
  version: 'https://schema.org/version',
}

/** auditJsonLd(node, where, failures) → walk a JSON-LD node (or array/tree of them), pushing one failure message
 *  per unvetted @type or property key found. @context/@type/@id are JSON-LD structural keywords
 *  against schema.org vocabulary — schema.org doesn't own them. Mutates `failures`; returns nothing. */
export function auditJsonLd(node: unknown, where: string, failures: string[]): void {
  if (Array.isArray(node)) { node.forEach((n, i) => auditJsonLd(n, `${where}[${i}]`, failures)); return }
  if (!node || typeof node !== 'object') return
  const rec = node as Record<string, unknown>
  const type = rec['@type']
  if (typeof type === 'string' && !(type in SCHEMA_ORG_TYPES)) failures.push(`${where}: unvetted @type "${type}"`)
  for (const [k, v] of Object.entries(rec)) {
    if (k === '@context' || k === '@type' || k === '@id') continue
    if (!(k in SCHEMA_ORG_PROPERTIES)) failures.push(`${where}: unvetted property "${k}"`)
    auditJsonLd(v, `${where}.${k}`, failures)
  }
}
