import vikeReact from 'vike-react/config'

export default {
  // Use vike-react for React integration
  extends: vikeReact,

  // Enable SSG (pre-rendering) for all pages by default
  prerender: true,

  // Disable automatic asset preloading to avoid duplicates
//   preloadStrategy: null,
}
