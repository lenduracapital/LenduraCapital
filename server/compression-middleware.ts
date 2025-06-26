import compression from 'compression';
import { Express } from 'express';

// Invisible compression optimization - no visual changes
export function configureCompression(app: Express) {
  // Enable Brotli + GZIP compression
  app.use(compression({
    // Brotli first, fallback to GZIP
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    threshold: 1024, // Only compress files > 1KB
    level: 6, // Balanced compression level
  }));

  // Static asset caching headers (invisible optimization)
  app.use('/assets', (req, res, next) => {
    // Immutable caching for hashed assets
    if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  // Font optimization headers
  app.use('/fonts', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
}