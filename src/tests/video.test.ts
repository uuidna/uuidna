// video — the pure half of the video-audit fold on trial: videoIdOf must find the one 11-character id in every
// URL shape the platform serves, and must refuse to invent one where none is. The network half (oEmbed) is the
// named non-harmonic boundary and is not exercised here — a test that needs the network is a test that fails on
// an airplane, and the id parser is the part a wrong answer would silently corrupt (a wrong id fingerprints the
// WRONG listing while looking right).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { videoIdOf } from '../video.js'

test('every URL shape yields the same id, and a bare id passes through', () => {
  const id = 'RGFoJ80Bl4g'
  assert.equal(videoIdOf(`https://www.youtube.com/watch?v=${id}`), id, 'watch URL')
  assert.equal(videoIdOf(`https://www.youtube.com/watch?v=${id}&t=120`), id, 'watch URL with extra params')
  assert.equal(videoIdOf(`https://youtu.be/${id}`), id, 'short URL')
  assert.equal(videoIdOf(`https://www.youtube.com/embed/${id}`), id, 'embed URL')
  assert.equal(videoIdOf(`https://www.youtube.com/shorts/${id}`), id, 'shorts URL')
  assert.equal(videoIdOf(id), id, 'a bare id is already the answer')
  assert.equal(videoIdOf(`  ${id}  `), id, 'whitespace is trimmed, not folded into the id')
})

test('what carries no id is returned as given — never an invented id', () => {
  assert.equal(videoIdOf('not a url'), 'not a url', 'no 11-char token: the input comes back unchanged for the fetch to refuse loudly')
})
