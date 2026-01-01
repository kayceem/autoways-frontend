// Disable SSG for locations page - Leaflet requires window
export default {
  prerender: false,
  ssr: false  // Client-only rendering for maps
}
