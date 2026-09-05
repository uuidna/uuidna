// refusals — WHY EACH ALPINE COMMAND THAT IS NOT PORTED IS NOT PORTED.
//
// THE ACCOUNTING THIS CLOSES. The shell census measured 55 ported of 345 and said nothing about the other 290,
// which is the shape of every silent remainder: a coverage number that reads as progress while the unmeasured
// part carries no verdict at all. A command is accounted for exactly when it is PORTED or REFUSED WITH A NAMED
// REASON. Anything else is unaccounted, and the guard's `accounting` finder fails on it — so a command cannot
// enter this tree's world without someone deciding, in writing, which of the two it is.
//
// A FAMILY, NOT A LINE EACH. 290 hand-written reasons would be 290 places to drift and would read as thorough
// while saying the same eight things. Each family below states one cause and names its members, so a reader
// checks the CAUSE once and the membership by eye. A member that does not belong to its family's cause is a
// misfiling anyone can see, which is the property a per-line list loses.
//
// REFUSED IS NOT FOREVER. Two refusals written on 2026-09-05 were wrong — `split` and `tee` were declared
// unportable for a filesystem property this tree does not have — and both are ported now. A family whose cause
// stops being true is a lead, not a wall: the cause is written plainly here so it can be checked and overturned.

export interface RefusalFamily {
  /** the one cause every member shares */
  readonly cause: string
  /** whether this is a LAW of this tree, a missing SUBJECT, or SCOPE — the three reasons anything is refused */
  readonly kind: 'law' | 'subject' | 'scope'
  readonly members: readonly string[]
}

export const REFUSAL_FAMILIES: readonly RefusalFamily[] = [
  {
    kind: 'law',
    cause: 'reads a wall clock, and this tree hard-rejects the clock everywhere — time enters as data or not at all',
    members: ['date', 'uptime', 'sleep', 'timeout', 'touch', 'ctail', 'logtail', 'logtail2', 'progress'],
  },
  {
    kind: 'law',
    cause: 'needs a random source, and this tree admits none anywhere — a fixed-order answer would be a lie in the name of the tool',
    members: ['shuf', 'mktemp'],
  },
  {
    kind: 'subject',
    cause: 'reads the HOST identity or environment, which is exactly the boundary uuidnaOS does not cross; a virtual answer would be invented, not measured',
    members: ['arch', 'uname', 'hostname', 'hostid', 'nproc', 'id', 'groups', 'users', 'who', 'whoami', 'logname',
      'pinky', 'printenv', 'tty', 'stty', 'env', 'bbsuid', 'wifi-status'],
  },
  {
    kind: 'subject',
    cause: 'acts on host processes, signals or scheduling, and there are none here — a faked table is attestation wearing execution\'s clothes',
    members: ['ps', 'kill', 'nice', 'nohup', 'stdbuf', 'chroot', 'purge-old-kernels', 'dumper'],
  },
  {
    kind: 'subject',
    cause: 'acts on block devices or a mounted filesystem; the session models a flat path-to-content map, not storage',
    members: ['mount', 'dd', 'df', 'sync', 'mkfifo', 'mknod', 'chmod', 'chown', 'chgrp', 'install', 'shred', 'truncate', 'locate', 'updatedb'],
  },
  {
    kind: 'subject',
    cause: 'needs a file DELETE or a directory object, and the session exports sessionWrite and sessionRead and neither of those — a success it reported would leave the tree exactly as it was',
    members: ['rm', 'mv', 'rmdir', 'mkdir', 'csplit'],
  },
  {
    kind: 'subject',
    cause: 'resolves a symbolic link, and this filesystem models none — every path is its own content, so there is no link to read or to make',
    members: ['readlink', 'ln', 'link', 'unlink'],
  },
  {
    kind: 'scope',
    cause: 'is an INTERPRETER for its own language, so porting it means porting a language rather than a transform',
    members: ['awk', 'gawk', 'gawk-5.3.2', 'gawkbug', 'sed', 'sh', 'bash', 'bashbug', 'zsh', 'zsh-5.9', 'fish',
      'fish_indent', 'fish_key_reader', 'cicada', 'shfmt', 'shellharden', 'vint', 'bats', 'shellspec',
      'logcheck', 'logcheck-test', 'nickel', 'manifest', 'xargs'],
  },
  {
    kind: 'scope',
    cause: 'is an INTERACTIVE program — an editor, a pager, a file browser — and there is no terminal here to be interactive with; its output is a screen, not a value',
    members: ['vim', 'nvim', 'view', 'rview', 'rvim', 'vimb', 'vimiv', 'vimtutor', 'runVimTests', 'ex', 'vis',
      'vis-clipboard', 'vis-complete', 'vis-digraph', 'vis-menu', 'vis-open', 'nano', 'rnano', 'joe', 'jmacs',
      'jpico', 'jstar', 'rjoe', 'kak', 'sciteco', 'gsciteco', 'tedoc.tes', 'gtedoc.tes', 'grosciteco.tes',
      'ggrosciteco.tes', 'less', 'lesskey', 'more', 'ranger', 'lf', 'rifle', 'hh', 'hstr', 'iamb', 'peep'],
  },
  {
    kind: 'scope',
    cause: 'is a terminal multiplexer or session manager: its product is a live terminal, which this tree has no way to hold',
    members: ['screen', 'screen-5.0.2', 'tmux', 'tmux-rime', 'tmuxinator', 'dtach', 'sk-tmux', 'fzf-tmux', 'chayang',
      'byobu', 'byobu-config', 'byobu-ctrl-a', 'byobu-disable', 'byobu-disable-prompt', 'byobu-enable',
      'byobu-enable-prompt', 'byobu-export', 'byobu-janitor', 'byobu-keybindings', 'byobu-launch',
      'byobu-launcher', 'byobu-launcher-install', 'byobu-launcher-uninstall', 'byobu-layout', 'byobu-prompt',
      'byobu-quiet', 'byobu-reconnect-sockets', 'byobu-screen', 'byobu-select-backend', 'byobu-select-profile',
      'byobu-select-session', 'byobu-shell', 'byobu-silent', 'byobu-status', 'byobu-status-detail', 'byobu-tmux',
      'byobu-ugraph', 'byobu-ulevel'],
  },
  {
    kind: 'scope',
    cause: 'is a COMPRESSION CODEC THE PLATFORM DOES NOT SHIP, each its own algorithm and container; a hand-rolled partial would report success over data it never encoded, which is the failure mode this tree calls worse than none. gzip was refused here until 2026-09-05 and that was FALSE — the platform provides it, this tree already decoded Alpine indexes with it, and it is ported now',
    members: ['gzexe', 'znew', 'zforce', 'uncompress', 'pigz', 'unpigz',
      'bzip2', 'bunzip2', 'bzcat', 'bzip2recover', 'bzip3', 'bunzip3', 'bz3cat',
      'lzma', 'unlzma', 'lzcat', 'lzmadec', 'lzmainfo', 'xz', 'unxz', 'xzcat', 'xzdec', 'pixz',
      'zstd', 'unzstd', 'zstdcat', 'zstdmt', 'zstd-frugal', 'pzstd', 'lrztar', 'lrzuntar',
      'cpio', 'ofarc'],
  },
  {
    kind: 'scope',
    cause: 'is a wrapper that runs another tool over a compressed stream, so it inherits the codec refusal above — the wrapper is trivial, the codec is the work',
    members: ['zegrep', 'zfgrep', 'zcmp', 'zdiff', 'zless', 'zmore',
      'bzgrep', 'bzegrep', 'bzfgrep', 'bzcmp', 'bzdiff', 'bzless', 'bzmore',
      'bz3grep', 'bz3less', 'bz3more', 'bz3most',
      'lzgrep', 'lzegrep', 'lzfgrep', 'lzcmp', 'lzdiff', 'lzless', 'lzmore',
      'xzgrep', 'xzegrep', 'xzfgrep', 'xzcmp', 'xzdiff', 'xzless', 'xzmore',
      'zstdgrep', 'zstdless'],
  },
  {
    kind: 'scope',
    cause: 'is a HASH this tree does not implement. The SHA-2 family was refused here until 2026-09-05 with the reason "sha256 is the one hash this tree computes" — a fact about the tree, not a limit on the port, so the fact was changed and sha512sum, sha384sum and sha224sum are ported. md5 and sha1 are refused for a different and unchanged reason: both are broken for the purpose people reach for them, so importing them to fill a row would be the worse trade. b2sum needs BLAKE2, a distinct primitive nothing here calls for yet',
    members: ['md5sum', 'sha1sum', 'b2sum'],
  },
  {
    kind: 'subject',
    cause: 'draws on a screen or reads an input device — display, keyboard, pointer, camera — and this tree has none of them; there is no value it could return',
    members: ['kmag', 'kruler', 'kooha', 'obs', 'obs-ffmpeg-mux', 'onboard', 'onboard-settings', 'orca', 'peek',
      'slurp', 'swaylock', 'slock', 'redshift', 'redshift-gtk', 'rot8', 'wf-recorder', 'wluma', 'xautolock',
      'xpra', 'xpra_launcher', 'xrefresh', 'xsct', 'matchbox-keyboard', 'mate-screensaver',
      'mate-screensaver-command', 'mate-screensaver-preferences', 'simplescreenrecorder', 'shutterbug',
      'coreshot', 'cosmic-osd', 'hdrcalibrator', 'img', 'kscreen-console', 'kscreen-doctor', 'qutebrowser',
      'wvkbd-deskintl', 'wvkbd-mobintl', 'run_scaled', 'ssr-glinject', 'suggpicker', 'sm', 'mcsn', 'peanutbutter', 'col1'],
  },
  {
    kind: 'subject',
    cause: 'speaks to a NETWORK or to a host service, and uuidnaOS has no socket — a reply it printed would have come from nowhere',
    members: ['mtr', 'mtr-packet', 'ssl_client', 'k3s', 'tgt-admin', 'tgt-setup-lun', 'nngcat', 'vigpg'],
  },
  {
    kind: 'scope',
    cause: 'is the multi-call binary\'s own alternate spelling, already answered by the ported multiplexer under its primary name',
    members: ['busybox-extras', 'busybox.static'],
  },
]

/** the flat index: command → the family that refuses it */
export function refusalOf(name: string): RefusalFamily | null {
  for (const f of REFUSAL_FAMILIES) if (f.members.includes(name)) return f
  return null
}

/** every name any family refuses, deduplicated */
export function refusedNames(): ReadonlySet<string> {
  const out = new Set<string>()
  for (const f of REFUSAL_FAMILIES) for (const m of f.members) out.add(m)
  return out
}

/** appletAccounting(universe, ported) → the partition, and the UNACCOUNTED remainder that must be empty. */
export function appletAccounting(universe: readonly string[], ported: readonly string[]): {
  universe: number
  ported: string[]
  refused: string[]
  unaccounted: string[]
} {
  const have = new Set(ported), no = refusedNames()
  return {
    universe: universe.length,
    ported: universe.filter((c) => have.has(c)),
    refused: universe.filter((c) => !have.has(c) && no.has(c)),
    unaccounted: universe.filter((c) => !have.has(c) && !no.has(c)),
  }
}
