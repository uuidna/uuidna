// the edge hands the site only its own paths: the admin, the REST API, Next's assets, chat rooms, the installer and cloud
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { siteOwns } from './site-mount.js'

test('the site answers its own paths', () => {
  for (const p of ['/admin', '/admin/collections/users', '/api/messages', '/_next/static/x.js', '/chat/room-1', '/chat/room-1/ws', '/install', '/install/app', '/cloud'])
    assert.equal(siteOwns(p), true, p)
})

test('CONTROL — every path the edge already serves stays with the edge, the docs chat page included', () => {
  for (const p of ['/', '/chat', '/chat.html', '/mcp', '/apis', '/api', '/administrator', '/installer', '/cloudflare', '/theorem/two_coins', '/ledger/x.json', '/doors/a.json', '/live'])
    assert.equal(siteOwns(p), false, p)
})
