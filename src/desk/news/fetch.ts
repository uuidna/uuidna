// desk/news/fetch — thin facade; uuidnaOS news port owns Wikinews + HN Algolia fetch.
export {
  fetchWikinewsFeatured, searchWikinews, searchHnAlgolia, hnHitsToArticles,
  type NewsArticleStub as NewsArticle, type HnAlgoliaHit,
} from '../../quantum/os/news/index.js'
