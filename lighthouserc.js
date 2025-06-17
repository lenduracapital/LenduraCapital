module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5000'],
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'serving on port',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage',
        emulatedFormFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }],
        
        // Core Web Vitals thresholds
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        
        // Performance budgets
        'total-byte-weight': ['warn', { maxNumericValue: 5000000 }], // 5MB total
        'dom-size': ['warn', { maxNumericValue: 1500 }],
        'uses-optimized-images': 'error',
        'uses-webp-images': 'warn',
        'efficient-animated-content': 'error',
        
        // Accessibility requirements
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'video-caption': 'warn',
        
        // SEO requirements
        'meta-description': 'error',
        'document-title': 'error',
        'structured-data': 'warn',
        
        // Security
        'is-on-https': 'off', // Development only
        'uses-http2': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};