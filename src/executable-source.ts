// executable-source — WHAT A SOURCE FILE ACTUALLY DOES, with its prose removed.
//
// A finder that greps raw source cannot tell USE from MENTION, because a comment is text and a grep sees only
// text — there is nothing in the characters to separate a pattern being USED from the same pattern being
// EXPLAINED. So the moment a finder's own comment describes what it hunts, the finder reports itself. That
// happened immediately: pipeGaps' new arm refuses `.stderr ?? <non-empty>`, and its comment quotes
// `err.stderr ?? err.message` to say why — three of its first five findings were its own prose and queue-wave's.
//
// rosetta already had this rule as a closure, written for a different reason worth keeping: "a leg that a comment
// can earn measures nothing". Same rule, same reasons, so it lives once. Line comments, leading `*` continuation
// lines, and block comments go; everything that runs stays.
export const executableSource = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n')
