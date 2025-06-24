module.exports = {
  content: [
    './client/src/**/*.{js,jsx,ts,tsx}',
    './client/index.html',
    './client/public/**/*.html'
  ],
  css: ['./client/src/**/*.css'],
  safelist: [
    // Preserve dynamic classes
    /^bg-/,
    /^text-/,
    /^border-/,
    /^hover:/,
    /^focus:/,
    /^active:/,
    /^md:/,
    /^lg:/,
    /^xl:/,
    /^sm:/,
    // Animation classes
    /^animate-/,
    /^transition-/,
    /^duration-/,
    /^ease-/,
    // Component state classes
    'open',
    'closed',
    'loading',
    'error',
    'success',
    // Signature blue variations
    /signature-blue/,
    // Chat widget classes
    /^chat-/,
    // Form states
    /^invalid:/,
    /^valid:/,
    /^disabled:/
  ],
  blocklist: [],
  keyframes: true,
  fontFace: true,
  variables: true
};