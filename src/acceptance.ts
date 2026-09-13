// acceptance — WHAT A REGISTERING AGENT ACCEPTS, AS TWO LINES AND THEIR RECEIPTS. Pure: one import (toUuid), no ledger,
// no trial, so a Worker can check a registration without loading the fact base legal.ts builds. Each receipt is the
// content-address of its line exactly as the canonical page quotes it, so editing either line is a new receipt and
// every earlier acceptance still names the words it accepted. NOT a signed agreement or legal advice.
import { toUuid } from './address.js'

export const LICENSE_LINE =
  'CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at uuidna.com/license.'

export const TERMS_LINE =
  'An agent registers at qpu.uuidna.com by accepting these terms and the licence; it then reads the Payload MCP find-only, writes nothing beside the four sealed collections, and claims no quantum hardware. Canonical at uuidna.com/terms.'

/** licenseReceipt() → the content-address of the canonical licence line. */
export const licenseReceipt = (): string => toUuid(LICENSE_LINE)

/** termsReceipt() → the content-address of the canonical terms line. */
export const termsReceipt = (): string => toUuid(TERMS_LINE)

/** accepts({license, terms}) → true only when both receipts name the canonical lines, exactly. */
export const accepts = (a: { license?: unknown; terms?: unknown }): boolean =>
  a.license === licenseReceipt() && a.terms === termsReceipt()

/** acceptanceReceipt(handle) → one address for one agent's acceptance of these exact words: the log entry. */
export const acceptanceReceipt = (handle: string): string =>
  toUuid(`acceptance|${handle}|${licenseReceipt()}|${termsReceipt()}`)
