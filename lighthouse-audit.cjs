const fs = require('fs');
const puppeteer = require('puppeteer');

async function runBasicAudit() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5000', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Basic performance metrics
    const metrics = await page.metrics();
    
    // Page load performance
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    
    // Accessibility check - count images without alt text
    const accessibilityIssues = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      let missingAlt = 0;
      images.forEach(img => {
        if (!img.alt || img.alt.trim() === '') missingAlt++;
      });
      
      const forms = document.querySelectorAll('input, textarea, select');
      let missingLabels = 0;
      forms.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        if (!label && !ariaLabel && input.type !== 'hidden') missingLabels++;
      });
      
      return { missingAlt, missingLabels, totalImages: images.length, totalFormElements: forms.length };
    });
    
    // SEO basics
    const seoData = await page.evaluate(() => {
      const title = document.querySelector('title')?.textContent || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
      const h1s = document.querySelectorAll('h1').length;
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
      
      return { title, metaDesc, h1Count: h1s, totalHeadings: headings };
    });
    
    const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    
    const report = {
      timestamp: new Date().toISOString(),
      url: 'http://localhost:5000',
      performance: {
        loadTime: Math.round(loadTime),
        domContentLoaded: Math.round(performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart),
        firstPaint: metrics.FirstMeaningfulPaint ? Math.round(metrics.FirstMeaningfulPaint * 1000) : 'N/A',
        jsHeapUsed: Math.round(metrics.JSHeapUsedSize / 1024 / 1024 * 100) / 100
      },
      accessibility: accessibilityIssues,
      seo: seoData,
      bestPractices: {
        hasHttps: false,
        hasServiceWorker: await page.evaluate(() => 'serviceWorker' in navigator)
      }
    };
    
    // Generate HTML report
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
    <title>Website Audit Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 15px; }
        .good { color: #0f9d58; }
        .warning { color: #ff9800; }
        .error { color: #f44336; }
        .metric { margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Website Audit Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        <p><strong>URL:</strong> ${report.url}</p>
        <p><strong>Generated:</strong> ${report.timestamp}</p>
    </div>
    
    <div class="section">
        <h2>Performance Metrics</h2>
        <div class="metric">
            <strong>Page Load Time:</strong> 
            <span class="${report.performance.loadTime > 3000 ? 'error' : report.performance.loadTime > 1500 ? 'warning' : 'good'}">
                ${report.performance.loadTime}ms
            </span>
        </div>
        <div class="metric">
            <strong>DOM Content Loaded:</strong> ${report.performance.domContentLoaded}ms
        </div>
        <div class="metric">
            <strong>JS Heap Used:</strong> ${report.performance.jsHeapUsed}MB
        </div>
    </div>
    
    <div class="section">
        <h2>Accessibility Issues</h2>
        <div class="metric">
            <strong>Images without alt text:</strong> 
            <span class="${report.accessibility.missingAlt > 0 ? 'error' : 'good'}">
                ${report.accessibility.missingAlt}/${report.accessibility.totalImages}
            </span>
        </div>
        <div class="metric">
            <strong>Form elements without labels:</strong> 
            <span class="${report.accessibility.missingLabels > 0 ? 'error' : 'good'}">
                ${report.accessibility.missingLabels}/${report.accessibility.totalFormElements}
            </span>
        </div>
    </div>
    
    <div class="section">
        <h2>SEO Analysis</h2>
        <div class="metric">
            <strong>Page Title:</strong> 
            <span class="${!report.seo.title ? 'error' : report.seo.title.length > 60 ? 'warning' : 'good'}">
                ${report.seo.title || 'Missing'} ${report.seo.title ? `(${report.seo.title.length} chars)` : ''}
            </span>
        </div>
        <div class="metric">
            <strong>Meta Description:</strong> 
            <span class="${!report.seo.metaDesc ? 'error' : report.seo.metaDesc.length > 160 ? 'warning' : 'good'}">
                ${report.seo.metaDesc || 'Missing'} ${report.seo.metaDesc.length > 0 ? `(${report.seo.metaDesc.length} chars)` : ''}
            </span>
        </div>
        <div class="metric">
            <strong>H1 Tags:</strong> 
            <span class="${report.seo.h1Count !== 1 ? 'warning' : 'good'}">
                ${report.seo.h1Count} (should be exactly 1)
            </span>
        </div>
        <div class="metric">
            <strong>Total Headings:</strong> ${report.seo.totalHeadings}
        </div>
    </div>
    
    <div class="section">
        <h2>Best Practices</h2>
        <div class="metric">
            <strong>HTTPS:</strong> 
            <span class="${!report.bestPractices.hasHttps ? 'warning' : 'good'}">
                ${report.bestPractices.hasHttps ? 'Enabled' : 'Not enabled (dev environment)'}
            </span>
        </div>
        <div class="metric">
            <strong>Service Worker:</strong> 
            <span class="${report.bestPractices.hasServiceWorker ? 'good' : 'warning'}">
                ${report.bestPractices.hasServiceWorker ? 'Present' : 'Not detected'}
            </span>
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync('audit-reports/lighthouse-report.html', htmlReport);
    console.log('Performance audit report generated');
    
  } finally {
    await browser.close();
  }
}

runBasicAudit().catch(console.error);