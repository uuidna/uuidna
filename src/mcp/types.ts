// Core Type Definitions

export interface Operation {
  id: string
  domain: string
  name: string
  description: string
  category: string
  execute: (context: any) => Promise<Result>
  verify: () => Promise<boolean>
}

export interface Result {
  success: boolean
  result: any
  accuracy?: number
  coinsGenerated?: number
  liveAPIs?: Array<{
    name: string
    status: string
    accuracy?: number
  }>
  error?: string
}
