import type { EmailAdapter, SendEmailOptions } from 'payload'

// Cloudflare Email Service through the Worker's `send_email` binding:
// https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
// The adapter has the shape Payload's own email adapters have (@payloadcms/email-resend).
type Address = { address: string; name?: string } | string
type EmailBinding = {
  send: (message: {
    bcc?: string | string[]
    cc?: string | string[]
    from: { email: string; name?: string } | string
    html?: string
    replyTo?: string
    subject: string
    text?: string
    to: string | string[]
  }) => Promise<{ messageId: string }>
}

type Args = {
  binding: EmailBinding | undefined
  defaultFromAddress: string
  defaultFromName: string
}

const addressOf = (a: Address) => (typeof a === 'string' ? a : a.address)
const listOf = (a: Address | Address[] | undefined) =>
  a === undefined ? undefined : Array.isArray(a) ? a.map(addressOf) : addressOf(a)

export const cloudflareEmailAdapter =
  ({ binding, defaultFromAddress, defaultFromName }: Args): EmailAdapter<{ messageId: string }> =>
  () => ({
    name: 'cloudflare-email-service',
    defaultFromAddress,
    defaultFromName,
    sendEmail: async (message: SendEmailOptions) => {
      if (!binding) {
        throw new Error('The send_email binding EMAIL is not bound to this Worker')
      }
      const from = message.from ? listOf(message.from as Address) : undefined
      return binding.send({
        bcc: listOf(message.bcc as Address[]),
        cc: listOf(message.cc as Address[]),
        from: typeof from === 'string' ? from : { name: defaultFromName, email: defaultFromAddress },
        html: message.html?.toString(),
        replyTo: listOf(message.replyTo as Address) as string | undefined,
        subject: message.subject ?? '',
        text: message.text?.toString(),
        to: listOf(message.to as Address[]) ?? [],
      })
    },
  })
