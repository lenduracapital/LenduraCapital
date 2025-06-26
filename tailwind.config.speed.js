module.exports = {
  content: ["./client/src/**/*.{js,ts,jsx,tsx}", "./client/index.html"],
  theme: { extend: {} },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  }
}
