import { NextResponse } from 'next/server'

import { recordEvent } from '@root/utilities/localServices'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => ({}))) as { name?: unknown; path?: unknown }
  const name = typeof body.name === 'string' && body.name.length > 0 ? body.name : 'page_view'
  const path = typeof body.path === 'string' ? body.path : '/'
  recordEvent(name, path)
  return NextResponse.json({ recorded: true })
}
