// src/school — the school's automation, one concept per folder, the extension never names the face.
// automate/improvement: the weekly measure → detect → fix → promote cycle.
// practice/feedback/loop: student trials fed back into the curriculum.
export * from './automate/improvement/index.js'
export * from './practice/feedback/loop/index.js'
// the open doors — the unverified organised in topics for the school (lead 88b)
export { openQuestions, placeItem, isInvolutionShaped, type OpenItem, type OpenTopic, type PlacedItem } from './open/questions/index.js'
