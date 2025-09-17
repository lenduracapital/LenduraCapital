import { getRouteMetadata, getAllRoutes, type RouteMetadata } from './routes';
import indexNow from '../utils/indexnow';

export interface SnapshotData {
  html: string;
  path: string;
  metadata: RouteMetadata;
}

export function generateSnapshotHTML(path: string, metadata: RouteMetadata): string {
  const absoluteUrl = `https://lenduracapital.com${path}`;
  const imageUrl = metadata.openGraph.image || '/lendura-logo.png';
  const absoluteImageUrl = `https://lenduracapital.com${imageUrl}`;

  // Generate JSON-LD schema markup
  const schemaMarkup = metadata.schema 
    ? metadata.schema.map(schema => `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`).join('\n')
    : '';

  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${metadata.title}</title>
  <meta name="title" content="${metadata.title}">
  <meta name="description" content="${metadata.description}">
  <meta name="keywords" content="${metadata.keywords}">
  <link rel="canonical" href="${absoluteUrl}">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${metadata.openGraph.type}">
  <meta property="og:url" content="${absoluteUrl}">
  <meta property="og:title" content="${metadata.openGraph.title}">
  <meta property="og:description" content="${metadata.openGraph.description}">
  <meta property="og:image" content="${absoluteImageUrl}">
  <meta property="og:image:alt" content="${metadata.openGraph.title} - Lendura Capital">
  <meta property="og:site_name" content="Lendura Capital">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${absoluteUrl}">
  <meta property="twitter:title" content="${metadata.twitter.title}">
  <meta property="twitter:description" content="${metadata.twitter.description}">
  <meta property="twitter:image" content="${absoluteImageUrl}">
  <meta property="twitter:image:alt" content="${metadata.twitter.title} - Lendura Capital">
  <meta property="twitter:site" content="@LenduraCapital">
  <meta property="twitter:creator" content="@LenduraCapital">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Basic inline styles for search engines -->
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #fff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .header {
      background-color: #193a59;
      color: white;
      padding: 1rem 0;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .hero {
      background: linear-gradient(135deg, #193a59 0%, #285d8a 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      background-color: #ff6b35;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.3s;
    }
    .cta-button:hover {
      background-color: #e55a2b;
    }
    .content {
      padding: 3rem 0;
    }
    .content h2 {
      color: #193a59;
      margin-bottom: 1rem;
    }
    .content p {
      margin-bottom: 1rem;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 2rem 0;
      border-top: 1px solid #eee;
    }
    .contact-info {
      text-align: center;
      margin: 2rem 0;
    }
    .contact-info a {
      color: #193a59;
      text-decoration: none;
      font-weight: bold;
    }
    .noscript-banner {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 5px;
    }
  </style>
  
  ${schemaMarkup}
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="logo">Lendura Capital</div>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>${metadata.h1 || metadata.title}</h1>
        <p>${metadata.primaryContent || metadata.description}</p>
        <a href="https://form.jotform.com/251965461165159" class="cta-button" target="_blank" rel="noopener">
          Get Approved in 24 Hours
        </a>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content">
      <div class="container">
        ${generateContentForRoute(path, metadata)}
      </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-info">
      <div class="container">
        <h2>Get Started Today</h2>
        <p>Call us at <a href="tel:+13058347168">(305) 834-7168</a> or apply online for fast approval.</p>
        <a href="https://form.jotform.com/251965461165159" class="cta-button" target="_blank" rel="noopener">
          Apply Now
        </a>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Lendura Capital. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
    </div>
  </footer>

  <!-- NoScript fallback -->
  <noscript>
    <div class="noscript-banner">
      <p><strong>JavaScript is disabled in your browser.</strong> This page provides basic information, but for the full interactive experience, please enable JavaScript or visit our <a href="https://form.jotform.com/251965461165159">application form</a> directly.</p>
    </div>
  </noscript>

  <!-- Load SPA for real users (not bots) -->
  <script>
    // Only load SPA if this is a real user, not a bot
    if (navigator.userAgent && !navigator.userAgent.match(/bot|crawl|slurp|spider|archiver|facebookexternalhit|whatsapp/i)) {
      window.location.href = window.location.href;
    }
  </script>
</body>
</html>`;
}

function generateContentForRoute(path: string, metadata: RouteMetadata): string {
  // Generate specific content based on the route
  if (path === '/') {
    return `
      <h2>Business Funding Solutions</h2>
      <p>Lendura Capital provides fast, reliable business funding solutions with approval in 24 hours. We offer 12 different financing options to meet your business needs.</p>
      
      <h3>Our Financing Solutions</h3>
      <ul>
        <li><strong>Term Loans</strong> - Traditional fixed-term business loans with competitive rates</li>
        <li><strong>Merchant Cash Advance</strong> - Quick access to working capital based on credit card sales</li>
        <li><strong>Lines of Credit</strong> - Flexible revolving credit for operational expenses</li>
        <li><strong>SBA Loans</strong> - Government-backed loans with favorable terms</li>
        <li><strong>Equipment Financing</strong> - Specialized financing for business equipment</li>
        <li><strong>Invoice Factoring</strong> - Convert outstanding invoices into immediate cash</li>
      </ul>
      
      <h3>Why Choose Lendura Capital?</h3>
      <ul>
        <li>24-hour approval process</li>
        <li>$10K to $750K funding available</li>
        <li>Bad credit accepted</li>
        <li>Over $1 billion funded</li>
        <li>50+ expert specialists</li>
      </ul>
    `;
  }
  
  if (path === '/solutions') {
    return `
      <h2>12 Business Financing Solutions</h2>
      <p>Explore our comprehensive range of business financing solutions designed to meet your unique needs and help your business grow.</p>
      
      <h3>Traditional Lending</h3>
      <p>Our traditional lending solutions include term loans, lines of credit, SBA loans, and equipment financing with competitive rates and flexible terms.</p>
      
      <h3>Alternative Financing</h3>
      <p>For businesses that need quick access to capital, we offer merchant cash advances, invoice factoring, and purchase order financing.</p>
      
      <h3>Specialized Services</h3>
      <p>We also provide debt consolidation, credit services, and commercial real estate lending solutions.</p>
    `;
  }
  
  if (path.startsWith('/solutions/')) {
    const solutionName = path.split('/')[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `
      <h2>What is ${solutionName}?</h2>
      <p>${metadata.primaryContent}</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Fast approval in 24 hours</li>
        <li>Competitive rates and flexible terms</li>
        <li>Minimal documentation required</li>
        <li>Bad credit considered</li>
      </ul>
      
      <h3>Qualification Requirements</h3>
      <p>Most businesses qualify with basic requirements including minimum time in business and monthly revenue thresholds.</p>
      
      <h3>Get Started</h3>
      <p>Apply online or call (305) 834-7168 to speak with a funding specialist about your ${solutionName.toLowerCase()} needs.</p>
    `;
  }
  
  if (path.startsWith('/industries/')) {
    const industryName = path.split('/')[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `
      <h2>${industryName} Financing</h2>
      <p>${metadata.primaryContent}</p>
      
      <h3>Industry-Specific Solutions</h3>
      <p>We understand the unique challenges and opportunities in the ${industryName.toLowerCase()} industry. Our financing solutions are tailored to meet your specific needs.</p>
      
      <h3>Popular Financing Options</h3>
      <ul>
        <li>Equipment financing for industry-specific machinery</li>
        <li>Working capital for operational expenses</li>
        <li>Expansion funding for growth opportunities</li>
        <li>Seasonal financing for cash flow management</li>
      </ul>
      
      <h3>Get Industry-Specific Funding</h3>
      <p>Our specialists understand the ${industryName.toLowerCase()} industry and can help you find the right financing solution.</p>
    `;
  }
  
  if (path === '/about') {
    return `
      <h2>About Lendura Capital</h2>
      <p>Lendura Capital is a leading business financing company dedicated to helping businesses grow and thrive. Since our founding, we have funded over $1 billion to businesses across the United States.</p>
      
      <h3>Our Mission</h3>
      <p>To provide fast, reliable, and accessible business funding solutions that help entrepreneurs achieve their dreams and grow their businesses.</p>
      
      <h3>Our Track Record</h3>
      <ul>
        <li>Over $1 billion in working capital funded</li>
        <li>50+ expert financing specialists</li>
        <li>12 different financing options</li>
        <li>24-hour average approval time</li>
      </ul>
      
      <h3>Our Values</h3>
      <p>We operate with integrity, work as your trusted partner, strive for excellence, and are committed to helping your business achieve sustainable growth.</p>
    `;
  }
  
  if (path === '/contact') {
    return `
      <h2>Contact Lendura Capital</h2>
      <p>Get in touch with our business funding experts for personalized assistance with your financing needs.</p>
      
      <h3>Phone</h3>
      <p>Call us at <a href="tel:+13058347168">(305) 834-7168</a> to speak with a funding specialist.</p>
      
      <h3>Online Application</h3>
      <p>Apply online using our secure application form for the fastest processing.</p>
      
      <h3>Business Hours</h3>
      <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br>
      Saturday: 10:00 AM - 4:00 PM EST</p>
      
      <h3>Get Started Today</h3>
      <p>Our team is ready to help you find the right financing solution for your business. Contact us today for expert guidance.</p>
    `;
  }
  
  // Default content for other pages
  return `
    <h2>${metadata.h1 || 'Business Funding'}</h2>
    <p>${metadata.primaryContent || metadata.description}</p>
    
    <h3>Get Started</h3>
    <p>Contact Lendura Capital today to learn more about our business financing solutions. Call (305) 834-7168 or apply online for fast approval.</p>
  `;
}

export class SnapshotManager {
  private snapshots: Map<string, SnapshotData> = new Map();
  
  constructor() {
    this.generateAllSnapshots();
  }
  
  private generateAllSnapshots(): void {
    const routes = getAllRoutes();
    
    routes.forEach(route => {
      const metadata = getRouteMetadata(route);
      if (metadata) {
        const html = generateSnapshotHTML(route, metadata);
        this.snapshots.set(route, {
          html,
          path: route,
          metadata
        });
      }
    });
    
    console.log(`Generated ${this.snapshots.size} static HTML snapshots for SEO`);
    
    // Notify search engines about initial snapshot generation
    this.notifyAllSnapshots('new').catch(error => {
      console.warn('Failed to notify search engines about initial snapshots:', error);
    });
  }
  
  /**
   * Notify search engines about all snapshot URLs
   */
  private async notifyAllSnapshots(type: 'new' | 'updated' | 'deleted' = 'updated'): Promise<void> {
    if (this.snapshots.size === 0) return;
    
    const paths = Array.from(this.snapshots.keys());
    console.log(`🔄 Notifying search engines about ${paths.length} snapshot URLs (type: ${type})`);
    
    try {
      const result = await indexNow.notifyPages(paths);
      if (result.success) {
        console.log(`✅ Successfully notified search engines about ${result.urls.length} snapshots`);
      } else {
        console.warn(`⚠️  Failed to notify search engines about snapshots: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Error notifying search engines about snapshots:', error);
    }
  }
  
  public getSnapshot(path: string): SnapshotData | null {
    return this.snapshots.get(path) || null;
  }
  
  public hasSnapshot(path: string): boolean {
    return this.snapshots.has(path);
  }
  
  public getAllSnapshotPaths(): string[] {
    return Array.from(this.snapshots.keys());
  }
  
  public async regenerateSnapshot(path: string): Promise<boolean> {
    const metadata = getRouteMetadata(path);
    if (metadata) {
      const html = generateSnapshotHTML(path, metadata);
      this.snapshots.set(path, {
        html,
        path,
        metadata
      });
      
      // Notify search engines about the updated snapshot
      try {
        console.log(`🔄 Notifying search engines about updated snapshot: ${path}`);
        const result = await indexNow.notifyPages([path]);
        if (result.success) {
          console.log(`✅ Successfully notified search engines about updated snapshot: ${path}`);
        } else {
          console.warn(`⚠️  Failed to notify search engines about snapshot ${path}: ${result.message}`);
        }
      } catch (error) {
        console.error(`❌ Error notifying search engines about snapshot ${path}:`, error);
      }
      
      return true;
    }
    return false;
  }
  
  public async regenerateAllSnapshots(): Promise<void> {
    console.log('🔄 Regenerating all snapshots...');
    this.snapshots.clear();
    this.generateAllSnapshots();
    
    // Additional notification for bulk regeneration
    await this.notifyAllSnapshots('updated');
  }
  
  /**
   * Notify search engines about specific snapshot paths
   */
  public async notifySnapshotUpdates(paths: string[]): Promise<void> {
    const existingPaths = paths.filter(path => this.snapshots.has(path));
    if (existingPaths.length === 0) return;
    
    console.log(`🔔 Notifying search engines about ${existingPaths.length} snapshot updates`);
    
    try {
      const result = await indexNow.notifyPages(existingPaths);
      if (result.success) {
        console.log(`✅ Successfully notified search engines about ${result.urls.length} snapshot updates`);
      } else {
        console.warn(`⚠️  Failed to notify search engines: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Error notifying search engines about snapshot updates:', error);
    }
  }
  
  /**
   * Force notify search engines about all current snapshots
   */
  public async forceNotifyAllSnapshots(): Promise<void> {
    await this.notifyAllSnapshots('updated');
  }
}