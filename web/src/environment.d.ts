// The template's components read `await response.json()` as the DOM types give it: any. The Workers runtime types
// narrow it to unknown, so this restores the DOM signature and the template's files compile as shipped.
export {}

declare global {
  interface Body {
    json(): Promise<any>
  }
  interface Response {
    json(): Promise<any>
  }
}
