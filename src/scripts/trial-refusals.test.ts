// the court reads the files a settlement names against the tree: a path in a dot-folder must be read whole, and a
// compiled dist/ name must find its src/ source — both cut a paid settlement open while every file it named was there.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { missingCited } from './trial-refusals.js'

const tree = (paths: string[]) => ({ paths: new Set(paths), names: new Set(paths.map((p) => p.slice(p.lastIndexOf('/') + 1))) })

test('a settlement naming a file in a dot-folder or by its compiled dist/ name finds it in the tree', () => {
  const files = tree(['docs/.vitepress/compose-object.js', 'src/css.ts'])
  assert.deepEqual(missingCited('allObjectPaths() in docs/.vitepress/compose-object.js now emits chunk', files), [])
  assert.deepEqual(missingCited('palette imports dist/css.js.', files), [])
})

test('CONTROL — a file truly gone from the tree is still named missing', () => {
  const files = tree(['src/css.ts'])
  assert.deepEqual(missingCited('src/refused.ts + refused-hosts.ts read hosts', files), ['refused-hosts.ts', 'src/refused.ts'])
  assert.deepEqual(missingCited('docs/.vitepress/gone.js', files), ['docs/.vitepress/gone.js'])
  assert.deepEqual(missingCited('dist/gone.js', files), ['dist/gone.js'])
})
