import { DurableObject } from 'cloudflare:workers'

// One Durable Object per room, holding its sockets through the hibernation API:
// https://developers.cloudflare.com/durable-objects/best-practices/websockets/
// It is the durable-chat template's design (github.com/cloudflare/templates/tree/main/durable-chat-template) on the native
// API. Sockets only listen: a message is written through POST /api/messages, so Payload's access rules decide who speaks,
// and the messages collection's afterChange hook calls broadcast() over RPC.
export class ChatRoom extends DurableObject<CloudflareEnv> {
  constructor(ctx: DurableObjectState, env: CloudflareEnv) {
    super(ctx, env)
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'))
  }

  broadcast(message: unknown): number {
    const data = JSON.stringify(message)
    const sockets = this.ctx.getWebSockets()
    for (const ws of sockets) {
      try {
        ws.send(data)
      } catch {
        ws.close(1011, 'send failed')
      }
    }
    return sockets.length
  }

  fetch(request: Request): Response {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected a WebSocket upgrade', { status: 426 })
    }
    const { 0: client, 1: server } = new WebSocketPair()
    this.ctx.acceptWebSocket(server)
    return new Response(null, { status: 101, webSocket: client })
  }

  webSocketClose(ws: WebSocket, code: number, reason: string): void {
    ws.close(code, reason)
  }
}
