import type { CollectionAfterChangeHook } from 'payload'

import type { Post } from '../../../payload-types'

import { postRelease } from '@uuidna/qpu/release'
import { getServerSideURL } from '../../../utilities/getURL'

/**
 * Publishing a post posts a release of the repository, and Zenodo archives the release as a new version under the
 * unit's concept DOI. The token is read by name (GITHUB_RELEASE_TOKEN) and never logged; without it nothing is sent.
 * A release that is refused leaves the post published and is logged.
 */
export const publishRelease: CollectionAfterChangeHook<Post> = async ({ doc, previousDoc, req: { payload, context } }) => {
  if (context.disableRelease) return doc
  try {
    const result = await postRelease({
      post: { title: doc.title, slug: doc.slug ?? '', description: doc.meta?.description, status: doc._status, previousStatus: previousDoc?._status },
      fetch: (url, init) => fetch(url, init),
      token: process.env.GITHUB_RELEASE_TOKEN,
      origin: getServerSideURL(),
    })
    payload.logger.info(result.says)
  } catch (error) {
    payload.logger.error(error instanceof Error ? error.message : String(error))
  }
  return doc
}
