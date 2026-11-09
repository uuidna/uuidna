// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The local stand-in for the analytics services the upstream site sends events to: an event is one structured log line, which Workers Logs
// stores under the Worker's head sampling rate and the Query Builder or the SQL API aggregates (count by name, by path). No row is written
// to D1 for a page view, so a visit costs log events only; the qpu-cloudflare observe job reads those counts back into the admin.
export type LocalEvent = { kind: 'qpu-event'; name: string; path: string; at: string }

export const recordEvent = (name: string, path: string): LocalEvent => {
  const event: LocalEvent = { kind: 'qpu-event', name, path, at: new Date().toISOString() }
  console.log(JSON.stringify(event))
  return event
}
