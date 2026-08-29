// quantum/os/npm — THE NPM DOOR FOR uuidnaOS. exec.ts imports ./index; this file imports both and is never imported by them.
export * from './index.js'
export { uuidnaExec, type ExecResult } from './exec.js'
