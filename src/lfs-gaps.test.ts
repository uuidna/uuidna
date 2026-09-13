import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lfsGapsOf, lfsGaps, GITHUB_FILE_LIMIT } from './scripts/one-receipt.js'
import { LFS_PATHS } from './scripts/api.js'

const lfs = ['src/seeds/big.json']

test('the lfs finder fires at GitHub\'s limit and not one byte below it', () => {
  assert.equal(lfsGapsOf([{ size: GITHUB_FILE_LIMIT, path: 'docs/public/feed.json' }], lfs).length, 1)
  assert.equal(lfsGapsOf([{ size: GITHUB_FILE_LIMIT - 1, path: 'docs/public/feed.json' }], lfs).length, 0)
})

test('an LFS path passes as a pointer and fires when staged raw', () => {
  assert.equal(lfsGapsOf([{ size: 134, path: 'src/seeds/big.json' }], lfs).length, 0)
  assert.equal(lfsGapsOf([{ size: 5_000_000, path: 'src/seeds/big.json' }], lfs).length, 1, 'a raw LFS path is the regression a clone without git-lfs brings')
})

test('this tree holds no file at the limit outside LFS, and every LFS path is staged as a pointer', () => {
  assert.ok(LFS_PATHS.length > 0)
  assert.deepEqual(lfsGaps(), [])
})
