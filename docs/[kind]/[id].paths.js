// Catch-all dynamic route: ONE template (ObjectPage) for every object kind.
// Content composed solely by docs/.vitepress/compose-object.js — no per-type page templates.
import { allObjectPaths } from '../.vitepress/compose-object.js'

export default {
  paths() {
    return allObjectPaths()
  },
}
