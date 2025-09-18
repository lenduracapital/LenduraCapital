import { Request, Response, NextFunction } from 'express';
import { SnapshotManager } from '../seo/snapshot-generator';
import { getRouteMetadata } from '../seo/routes';

// Initialize snapshot manager at module level
const snapshotManager = new SnapshotManager();

/**
 * List of known search engine bot user agents
 * This is a comprehensive list of major search engines and crawlers
 */
const BOT_USER_AGENTS = [
  // Google
  'googlebot',
  'google-structured-data-testing-tool',
  'google-site-verification',
  'google-read-aloud',
  
  // Bing/Microsoft
  'bingbot',
  'msnbot',
  'bingpreview',
  'adidxbot',
  
  // Other major search engines
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'slurp', // Yahoo
  'sogou',
  'exabot',
  'facebot', // Facebook
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'skypeuripreview',
  'applebot',
  
  // SEO tools and crawlers
  'ahrefsbot',
  'semrushbot',
  'mj12bot',
  'dotbot',
  'rogerbot',
  'screaming frog',
  'sitebulb',
  'seozoom',
  
  // Specific crawlers (more targeted to avoid false positives)
  'web-crawler', // Specific crawlers with hyphens
  'spider-',     // More specific patterns
  'crawler/',
  'archiver/',
  'scraper/',
  'monitor/',
  
  // Specific known crawlers
  'lighthouse',
  'pagespeed',
  'gtmetrix',
  'pingdom',
  'uptimerobot',
  'site24x7',
  'webpagetest'
];

/**
 * Determines if a User-Agent string belongs to a search engine bot or crawler
 */
export function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  
  const ua = userAgent.toLowerCase();
  
  // Check against known bot user agents
  return BOT_USER_AGENTS.some(botAgent => ua.includes(botAgent));
}

/**
 * Generates fallback meta tags for routes that don't have pre-generated snapshots
 */
function generateFallbackMetaTags(path: string): string {
  const metadata = getRouteMetadata(path);
  
  if (!metadata) {
    // Generate basic meta tags for unknown routes (404 fallback)
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | Lendura Capital</title>
  <meta name="description" content="The requested page was not found. Visit Lendura Capital for business funding solutions with 24-hour approval.">
  <meta name="keywords" content="business funding, business loans, merchant cash advance, equipment financing">
  <link rel="canonical" href="https://lenduracapital.com">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Page Not Found | Lendura Capital">
  <meta property="og:description" content="The requested page was not found. Visit Lendura Capital for business funding solutions.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://lenduracapital.com">
  <meta property="og:image" content="https://lenduracapital.com/lendura-logo.png">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="Page Not Found | Lendura Capital">
  <meta property="twitter:description" content="The requested page was not found. Visit Lendura Capital for business funding solutions.">
  <meta property="twitter:image" content="https://lenduracapital.com/lendura-logo.png">
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you requested could not be found.</p>
  <p><a href="https://lenduracapital.com">Visit Lendura Capital Home</a></p>
  <noscript>
    <p>Please visit our main site at <a href="https://lenduracapital.com">lenduracapital.com</a></p>
  </noscript>
</body>
</html>`;
  }
  
  // Generate meta tags from our route registry
  const absoluteUrl = `https://lenduracapital.com${path}`;
  const imageUrl = metadata.openGraph.image || '/lendura-logo.png';
  const absoluteImageUrl = `https://lenduracapital.com${imageUrl}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  <meta name="keywords" content="${metadata.keywords}">
  <link rel="canonical" href="${absoluteUrl}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${metadata.openGraph.title}">
  <meta property="og:description" content="${metadata.openGraph.description}">
  <meta property="og:type" content="${metadata.openGraph.type}">
  <meta property="og:url" content="${absoluteUrl}">
  <meta property="og:image" content="${absoluteImageUrl}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="${metadata.twitter.title}">
  <meta property="twitter:description" content="${metadata.twitter.description}">
  <meta property="twitter:image" content="${absoluteImageUrl}">
  
  <!-- No meta refresh for valid routes - let crawlers index properly -->
</head>
<body>
  <h1>${metadata.h1 || metadata.title}</h1>
  <p>${metadata.primaryContent || metadata.description}</p>
  <p><a href="${absoluteUrl}">Continue to full site</a></p>
  <noscript>
    <p>Please visit our main site at <a href="https://lenduracapital.com">lenduracapital.com</a></p>
  </noscript>
</body>
</html>`;
}

/**
 * Express middleware that detects bots and serves appropriate content
 */
export function botPrerenderMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const userAgent = req.get('User-Agent') || '';
    const path = req.path;
    
    // Skip for API routes and assets
    if (path.startsWith('/api/') || 
        path.startsWith('/assets/') || 
        path.startsWith('/attached_assets/') ||
        path.includes('.')) {
      return next();
    }
    
    // Only process for HTML requests
    const acceptsHtml = req.accepts('html');
    if (!acceptsHtml) {
      return next();
    }
    
    // Check if this is a bot
    const isBotRequest = isBot(userAgent);
    
    if (isBotRequest) {
      console.log(`[BOT DETECTED] ${userAgent.substring(0, 100)} requesting ${path}`);
      
      // Try to serve pre-generated snapshot first
      const snapshot = snapshotManager.getSnapshot(path);
      
      if (snapshot) {
        console.log(`[SNAPSHOT SERVED] Serving pre-generated snapshot for ${path}`);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
        res.setHeader('X-Robots-Tag', 'index, follow');
        res.setHeader('Vary', 'User-Agent'); // Critical: prevent CDN caching issues
        res.status(200).send(snapshot.html);
        return;
      }
      
      // Fallback: serve meta tags for routes without snapshots
      console.log(`[FALLBACK META] Serving fallback meta tags for ${path}`);
      const fallbackHtml = generateFallbackMetaTags(path);
      const metadata = getRouteMetadata(path);
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      // CRITICAL FIX: Only set noindex for truly unknown routes, allow indexing for legitimate routes
      if (metadata) {
        // This is a legitimate route - allow indexing even without snapshots
        res.setHeader('X-Robots-Tag', 'index, follow');
        res.setHeader('Vary', 'User-Agent');
        res.status(200).send(fallbackHtml); // 200 status for legitimate routes
        console.log(`[SEO FIX] Allowing indexing for legitimate route: ${path}`);
      } else {
        // This is truly an unknown/404 route - don't index
        res.setHeader('X-Robots-Tag', 'noindex, follow');
        res.setHeader('Vary', 'User-Agent');
        res.status(404).send(fallbackHtml); // 404 status for unknown routes
        console.log(`[SEO FIX] Blocking indexing for unknown route: ${path}`);
      }
      return;
    }
    
    // Not a bot - continue to SPA
    console.log(`[HUMAN USER] ${userAgent.substring(0, 50)} requesting ${path} - serving SPA`);
    next();
    
  } catch (error) {
    console.error('[BOT MIDDLEWARE ERROR]', error);
    // If there's an error, continue to normal SPA serving
    next();
  }
}

/**
 * Debug endpoint to test bot detection (for development)
 */
export function createBotDebugHandler() {
  return (req: Request, res: Response) => {
    const userAgent = req.get('User-Agent') || '';
    const isBotRequest = isBot(userAgent);
    const path = req.query.path as string || '/';
    
    const snapshot = snapshotManager.getSnapshot(path);
    
    res.json({
      userAgent,
      isBotRequest,
      path,
      hasSnapshot: !!snapshot,
      availableSnapshots: snapshotManager.getAllSnapshotPaths(),
      botUserAgents: BOT_USER_AGENTS
    });
  };
}

/**
 * Endpoint to regenerate snapshots (for development/admin)
 */
export function createSnapshotRegenHandler() {
  return (req: Request, res: Response) => {
    try {
      const path = req.body?.path as string;
      
      if (path) {
        const success = snapshotManager.regenerateSnapshot(path);
        res.json({ 
          success, 
          path, 
          message: success ? 'Snapshot regenerated' : 'Failed to regenerate snapshot' 
        });
      } else {
        snapshotManager.regenerateAllSnapshots();
        res.json({ 
          success: true, 
          message: 'All snapshots regenerated',
          count: snapshotManager.getAllSnapshotPaths().length
        });
      }
    } catch (error) {
      console.error('[SNAPSHOT REGEN ERROR]', error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };
}

export { snapshotManager };