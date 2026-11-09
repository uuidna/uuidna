// Server-side validation of a Turnstile token:
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
export const verifyTurnstile = async (token: string, remoteip?: null | string): Promise<boolean> => {
  const body = new FormData()
  body.append('secret', process.env.TURNSTILE_SECRET_KEY || '')
  body.append('response', token)
  if (remoteip) {
    body.append('remoteip', remoteip)
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    body,
    method: 'POST',
  })
  const data: { success?: boolean } = await res.json()
  return data.success === true
}
