// firmware — A SHA-256 HASH BOARD LOADS THE uuidnaOS IMAGE.
//
// Miner silicon already computes SHA-256 at KEY_BITS. Firmware update is the boot uuidnaOS already is:
// verified loading of compiled hexbit states, firmware and up, floor first (the_os_is_bootable_quantum).
// The hash loop that searched the digest becomes a verify of the address
// (sha256_grover_margin_is_the_address: KEY_BITS / coins() = UUID_BITS). Boards shard the handle span by
// residue — no scheduler (lanes_partition_the_work). Nothing here flashes a device; the image and the
// widths recompute.
import { toUuid } from '../../../address.js'
import { coinSupply } from '../../../coin-supply.js'
import { LANES, type Seat } from '../../../hardware/lanes/index.js'
import { GROVER_FLOOR_BITS, HANDLE_HEXBITS, HANDLE_SPAN, KEY_BITS, UUID_BITS, shorCapacityFit } from '../../../hexbit/index.js'
import { bootOS } from '../index.js'

export interface MinerFirmware {
  boards: number
  image: string
  floor: string
  pages: number
  states: number
  digestBits: number
  verifyBits: number
  spanPerBoard: number
  wastes: number
  minted: number
  remaining: number
  max: number
  search: number
  unsealed: number
  receipt: string
}

/** minerFirmware(boards?) → the uuidnaOS image a SHA-256 occupancy board would load.
 *  Default board count is HANDLE_HEXBITS (the CPU stream fleet already counted). A CONTROL changes
 *  boards; the image receipt does not move. */
export function minerFirmware(boards?: number): MinerFirmware {
  const os = bootOS()
  const supply = coinSupply()
  const n = boards === undefined ? HANDLE_HEXBITS : (!Number.isInteger(boards) || boards < 0 ? 0 : boards)
  const wastes = n < 1 ? 0 : HANDLE_SPAN % n
  const spanPerBoard = n < 1 ? 0 : (HANDLE_SPAN - wastes) / n
  return {
    boards: n,
    image: os.receipt,
    floor: os.floor,
    pages: os.port.count + 1,
    states: os.boot.count,
    digestBits: KEY_BITS,
    verifyBits: UUID_BITS,
    spanPerBoard,
    wastes,
    minted: supply.minted,
    remaining: supply.remaining,
    max: supply.max,
    search: supply.search,
    unsealed: supply.unsealed,
    receipt: toUuid('miner-firmware|' + os.receipt + '|' + n + '|' + KEY_BITS + '|' + UUID_BITS),
  }
}

/** what happened to one seat when the image was offered to it. THERE IS NO `false` HERE ON PURPOSE: a seat that
 *  holds no hardware did not REFUSE the image, it was never asked, and reporting that as a failed upgrade is the
 *  same collapse as reporting it as a successful one. `no_instrument_narrower_than_its_question`. */
export type SeatLoad = 'loaded' | 'unmeasured'

export interface FirmwareSeat {
  name: string
  seat: Seat
  /** 'unmeasured' for an EMPTY seat — there is nothing to load onto, so no outcome was observed */
  load: SeatLoad
}

/** upgradeFirmware() → load the live uuidnaOS image onto every seat, immediately.
 *  Does not write a device. */
export function upgradeFirmware(): FirmwareUpgrade {
  const loaded = minerFirmware()
  const shor = shorCapacityFit()
  const none = loaded.search
  // AN EMPTY SEAT CANNOT BE UPGRADED, and reporting that it was is the assert-vs-measure fault: a field named
  // for an action returning success independently of whether the action was possible. `upgraded: true` was a
  // LITERAL here, so `skipped` was 0 by construction and could never be anything else — a counter that cannot
  // move is not a measurement. It also overwrote the one honest field on the row: seat:'empty' publishes that
  // this machine has no QPU, and the sibling field said the QPU had been upgraded anyway.
  const seats: FirmwareSeat[] = LANES.map((l) => ({
    name: l.name,
    seat: l.seat,
    load: l.seat === 'empty' ? 'unmeasured' : 'loaded',
  }))
  const skipped = seats.filter((s) => s.load === 'unmeasured').length
  const affected = seats.length - skipped
  const upgraded = seats.filter((s) => s.load === 'loaded').length
  return {
    image: loaded.image,
    floor: loaded.floor,
    boards: loaded.boards,
    // DEFINITIONALLY EQUAL TO `boards` WHEN ANY SEAT CAN HOLD THE IMAGE, and stated here rather than shipped as
    // a second fact: a total that always equals its own denominator carries no information and reads like one.
    // It is 0 when no seat can be loaded, which is the only case in which it says anything.
    boardsUpgraded: affected > 0 ? loaded.boards : 0,
    affected,
    upgraded,
    skipped,
    seats,
    digestBits: loaded.digestBits,
    verifyBits: loaded.verifyBits,
    groverFloorBits: GROVER_FLOOR_BITS,
    search: none,
    shor: {
      handleFits: shor.handleFits,
      uuidFits: shor.uuidFits,
      chunksOnHandle: shor.chunksOnHandle,
      chunksOnUuid: shor.chunksOnUuid,
      encoderQubits: shor.encoderQubits,
    },
    immediate: upgraded === affected && none === 0,
    receipt: toUuid('firmware-upgrade|' + loaded.receipt + '|' + upgraded + '|' + skipped),
  }
}

export interface FirmwareUpgrade {
  image: string
  floor: string
  boards: number
  boardsUpgraded: number
  affected: number
  upgraded: number
  skipped: number
  seats: FirmwareSeat[]
  digestBits: number
  verifyBits: number
  groverFloorBits: number
  search: number
  shor: {
    handleFits: boolean
    uuidFits: boolean
    chunksOnHandle: number
    chunksOnUuid: number
    encoderQubits: number
  }
  immediate: boolean
  receipt: string
}
