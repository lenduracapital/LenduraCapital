import { config } from '../config';

// =============================================================================
// INDEXNOW API TYPES AND INTERFACES
// =============================================================================

export interface IndexNowRequest {
  host: string;
  key?: string;
  keyLocation?: string;
  urlList: string[];
}

export interface IndexNowOptions {
  retries?: number;
  timeout?: number;
  userAgent?: string;
}

export type NotificationType = 'new' | 'updated' | 'deleted';

export interface NotificationResult {
  success: boolean;
  statusCode?: number;
  message: string;
  urls: string[];
  timestamp: Date;
}

// =============================================================================
// INDEXNOW CONFIGURATION
// =============================================================================

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const DEFAULT_OPTIONS: Required<IndexNowOptions> = {
  retries: 3,
  timeout: 10000,
  userAgent: 'Lendura Capital Website (+https://lenduracapital.com)'
};

// =============================================================================
// CORE INDEXNOW FUNCTIONS
// =============================================================================

/**
 * Submit a single URL to IndexNow API
 */
export async function notifyIndexNow(
  url: string, 
  type: NotificationType = 'updated',
  options: IndexNowOptions = {}
): Promise<NotificationResult> {
  return notifyIndexNowBulk([url], type, options);
}

/**
 * Submit multiple URLs to IndexNow API (more efficient for bulk operations)
 */
export async function notifyIndexNowBulk(
  urls: string[], 
  type: NotificationType = 'updated',
  options: IndexNowOptions = {}
): Promise<NotificationResult> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const timestamp = new Date();
  
  // Validate URLs
  const validUrls = validateUrls(urls);
  if (validUrls.length === 0) {
    return {
      success: false,
      message: 'No valid URLs provided',
      urls: [],
      timestamp
    };
  }

  // Extract host from first URL
  const host = extractHost(validUrls[0]);
  if (!host) {
    return {
      success: false,
      message: 'Could not extract host from URL',
      urls: validUrls,
      timestamp
    };
  }

  const payload: IndexNowRequest = {
    host,
    urlList: validUrls
  };

  // Add key if available and IndexNow is enabled
  if (config.INDEXNOW_ENABLED && config.INDEXNOW_API_KEY) {
    payload.key = config.INDEXNOW_API_KEY;
    payload.keyLocation = `https://${host}/${config.INDEXNOW_API_KEY}.txt`;
  }

  console.log(`🔍 Debug payload:`, JSON.stringify(payload, null, 2));

  // Attempt submission with retries
  for (let attempt = 1; attempt <= mergedOptions.retries; attempt++) {
    try {
      console.log(`📡 IndexNow: Notifying search engines (attempt ${attempt}/${mergedOptions.retries})`);
      console.log(`   URLs: ${validUrls.length} URLs, Type: ${type}, Host: ${host}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout);
      
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': mergedOptions.userAgent
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const success = response.status === 200;
      const message = getStatusMessage(response.status);
      
      console.log(`${success ? '✅' : '❌'} IndexNow: ${message} (${response.status})`);
      
      if (success) {
        logSuccessfulNotification(validUrls, type);
        return {
          success: true,
          statusCode: response.status,
          message,
          urls: validUrls,
          timestamp
        };
      }

      // For certain errors, don't retry
      if (response.status === 400 || response.status === 422) {
        return {
          success: false,
          statusCode: response.status,
          message,
          urls: validUrls,
          timestamp
        };
      }

      // For other errors, continue to next attempt
      console.log(`   Retrying... (${attempt}/${mergedOptions.retries})`);
      
    } catch (error) {
      console.error(`❌ IndexNow: Request failed (attempt ${attempt}/${mergedOptions.retries}):`, error);
      
      if (attempt === mergedOptions.retries) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown network error',
          urls: validUrls,
          timestamp
        };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return {
    success: false,
    message: 'All retry attempts failed',
    urls: validUrls,
    timestamp
  };
}

/**
 * Notify about sitemap changes
 */
export async function notifySitemapUpdate(sitemapUrl?: string): Promise<NotificationResult> {
  const url = sitemapUrl || 'https://lenduracapital.com/sitemap.xml';
  console.log('🗺️  IndexNow: Notifying about sitemap update');
  return notifyIndexNow(url, 'updated');
}

/**
 * Notify about multiple page updates (common after content regeneration)
 */
export async function notifyPageUpdates(paths: string[]): Promise<NotificationResult> {
  const baseUrl = getBaseUrl();
  const fullUrls = paths.map(path => {
    // Handle both absolute and relative paths
    if (path.startsWith('http')) return path;
    const normalizedPath = path.startsWith('/') ? path : '/' + path;
    return `${baseUrl}${normalizedPath}`;
  });

  console.log('📄 IndexNow: Notifying about page updates');
  console.log(`🔍 Debug: Base URL: ${baseUrl}`);
  console.log(`🔍 Debug: Sample URLs:`, fullUrls.slice(0, 3));
  
  return notifyIndexNowBulk(fullUrls, 'updated');
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validate array of URLs
 */
function validateUrls(urls: string[]): string[] {
  return urls.filter(url => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
    } catch {
      console.warn(`⚠️  IndexNow: Skipping invalid URL: ${url}`);
      return false;
    }
  });
}

/**
 * Extract hostname from URL
 */
function extractHost(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * Get base URL for the site
 */
function getBaseUrl(): string {
  // Try configuration first, then environment variables
  const configUrl = config.SITE_URL || process.env.VERCEL_URL;
  if (configUrl) {
    return configUrl.startsWith('http') ? configUrl : `https://${configUrl}`;
  }

  // Fallback to production domain
  return 'https://lenduracapital.com';
}

/**
 * Get human-readable status message
 */
function getStatusMessage(statusCode: number): string {
  switch (statusCode) {
    case 200:
      return 'URLs successfully submitted to search engines';
    case 202:
      return 'URLs received and will be processed';
    case 400:
      return 'Bad request - invalid URL format or payload';
    case 403:
      return 'Forbidden - invalid API key or unauthorized domain';
    case 422:
      return 'Unprocessable entity - URLs not owned by the requesting domain';
    case 429:
      return 'Too many requests - rate limited';
    case 500:
      return 'Internal server error';
    default:
      return `HTTP ${statusCode} response received`;
  }
}

/**
 * Log successful notifications for monitoring
 */
function logSuccessfulNotification(urls: string[], type: NotificationType): void {
  const timestamp = new Date().toISOString();
  console.log(`📊 IndexNow Success: ${urls.length} URLs (${type}) at ${timestamp}`);
  
  if (config.LOG_LEVEL === 'debug') {
    urls.forEach(url => console.log(`   📍 ${url}`));
  }
}

// =============================================================================
// CONVENIENCE FUNCTIONS FOR SPECIFIC SCENARIOS
// =============================================================================

/**
 * Notify about homepage updates
 */
export async function notifyHomepageUpdate(): Promise<NotificationResult> {
  console.log('🏠 IndexNow: Notifying about homepage update');
  return notifyIndexNow(getBaseUrl(), 'updated');
}

/**
 * Notify about all main pages (useful for initial setup or major updates)
 */
export async function notifyAllMainPages(): Promise<NotificationResult> {
  const mainPages = [
    '/',
    '/solutions',
    '/qualified-industries',
    '/about',
    '/contact',
    '/apply-now'
  ];
  
  console.log('🌐 IndexNow: Notifying about all main pages');
  return notifyPageUpdates(mainPages);
}

/**
 * Get IndexNow status and configuration info
 */
export function getIndexNowStatus(): {
  enabled: boolean;
  hasApiKey: boolean;
  endpoint: string;
  baseUrl: string;
} {
  return {
    enabled: true,
    hasApiKey: !!process.env.INDEXNOW_API_KEY,
    endpoint: INDEXNOW_ENDPOINT,
    baseUrl: getBaseUrl()
  };
}

// =============================================================================
// EXPORT DEFAULT FOR EASY IMPORTS
// =============================================================================

export default {
  notify: notifyIndexNow,
  notifyBulk: notifyIndexNowBulk,
  notifySitemap: notifySitemapUpdate,
  notifyPages: notifyPageUpdates,
  notifyHomepage: notifyHomepageUpdate,
  notifyAllPages: notifyAllMainPages,
  getStatus: getIndexNowStatus
};