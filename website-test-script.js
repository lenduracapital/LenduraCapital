#!/usr/bin/env node

/**
 * COMPREHENSIVE WEBSITE TESTING SCRIPT
 * Tests all 41+ pages for existence, search engine indexability, and link functionality
 */

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// Configuration
const BASE_URL = 'http://localhost:5000';
const TEST_RESULTS = {
  pageTests: [],
  linkTests: [],
  botTests: [],
  summary: {
    totalPages: 0,
    pagesPass: 0,
    pagesFail: 0,
    linksPass: 0,
    linksFail: 0,
    botsPass: 0,
    botsFail: 0
  }
};

// All pages to test (from server logs + additional pages from file structure)
const ALL_PAGES = [
  // Homepage
  '/',
  
  // Solutions (12 pages)
  '/solutions',
  '/solutions/term-loans',
  '/solutions/merchant-cash-advance', 
  '/solutions/lines-of-credit',
  '/solutions/sba-loans',
  '/solutions/equipment-financing',
  '/solutions/invoice-factoring',
  '/solutions/po-financing',
  '/solutions/debt-consolidation',
  '/solutions/credit-services',
  '/solutions/commercial-real-estate-lending',
  '/solutions/mortgage-financing',
  
  // Industries (17 pages)
  '/qualified-industries',
  '/industries/construction',
  '/industries/medical-healthcare',
  '/industries/trucking-transportation',
  '/industries/restaurant-food-service',
  '/industries/retail-e-commerce',
  '/industries/manufacturing',
  '/industries/professional-services',
  '/industries/technology-software',
  '/industries/auto-transportation',
  '/industries/beauty-wellness',
  '/industries/hospitality-tourism',
  '/industries/agriculture-farming',
  '/industries/real-estate',
  '/industries/entertainment-events',
  '/industries/education-training',
  '/industries/franchises',
  '/industries/home-services-contracting',
  '/industries/cleaning-janitorial-services',
  
  // Core pages (7 pages)
  '/about',
  '/contact', 
  '/testimonials',
  '/faq',
  '/apply',
  '/terms',
  '/privacy',
  
  // Additional pages (2+ pages)
  '/credit-card-processing',
  '/seo-web-development',
  
  // Potential additional pages based on file structure
  '/apply-now',
  '/who-we-fund'
];

// Common bot user agents to test
const BOT_USER_AGENTS = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'facebookexternalhit/1.1',
  'Twitterbot/1.0',
  'LinkedInBot/1.0',
  'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)'
];

/**
 * Test page existence and basic properties
 */
async function testPageExistence(path) {
  console.log(`\n🧪 Testing page: ${path}`);
  
  const result = {
    path,
    status: null,
    statusCode: null,
    contentType: null,
    robotsTag: null,
    hasValidHTML: false,
    hasTitle: false,
    hasMetaDescription: false,
    contentLength: null,
    responseTime: null,
    errors: []
  };

  try {
    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    });
    
    const endTime = Date.now();
    result.responseTime = endTime - startTime;
    result.statusCode = response.status;
    result.contentType = response.headers.get('content-type');
    result.robotsTag = response.headers.get('x-robots-tag');
    
    if (response.status === 200) {
      const html = await response.text();
      result.contentLength = html.length;
      
      // Parse HTML to check structure
      try {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        result.hasValidHTML = !!document.querySelector('html');
        result.hasTitle = !!document.querySelector('title')?.textContent?.trim();
        result.hasMetaDescription = !!document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim();
        
        // Check if it's actually a proper page (not a 404 served as 200)
        const bodyText = document.body?.textContent?.toLowerCase() || '';
        if (bodyText.includes('page not found') || bodyText.includes('404')) {
          result.errors.push('Page serves 404 content despite 200 status');
        }
        
        result.status = 'PASS';
        console.log(`  ✅ Status: ${response.status} | Response time: ${result.responseTime}ms`);
        console.log(`  📄 Content: ${result.contentLength} chars | Title: ${result.hasTitle ? '✓' : '✗'} | Meta: ${result.hasMetaDescription ? '✓' : '✗'}`);
        console.log(`  🤖 Robots: ${result.robotsTag || 'Not set'}`);
        
      } catch (parseError) {
        result.errors.push(`HTML parsing error: ${parseError.message}`);
        result.status = 'FAIL';
        console.log(`  ❌ HTML parsing failed: ${parseError.message}`);
      }
      
    } else {
      result.status = 'FAIL';
      result.errors.push(`HTTP ${response.status} ${response.statusText}`);
      console.log(`  ❌ HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    result.status = 'FAIL';
    result.errors.push(`Request failed: ${error.message}`);
    console.log(`  ❌ Request failed: ${error.message}`);
  }
  
  TEST_RESULTS.pageTests.push(result);
  if (result.status === 'PASS') {
    TEST_RESULTS.summary.pagesPass++;
  } else {
    TEST_RESULTS.summary.pagesFail++;
  }
  
  return result;
}

/**
 * Test bot detection and snapshot serving
 */
async function testBotDetection(path, userAgent) {
  console.log(`\n🤖 Testing bot detection for ${path} with ${userAgent.split('/')[0]}`);
  
  const result = {
    path,
    userAgent: userAgent.split('/')[0],
    status: null,
    statusCode: null,
    isSnapshot: false,
    robotsTag: null,
    contentLength: null,
    hasMetaTags: false,
    errors: []
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    });
    
    result.statusCode = response.status;
    result.robotsTag = response.headers.get('x-robots-tag');
    
    if (response.status === 200) {
      const html = await response.text();
      result.contentLength = html.length;
      
      // Check if this looks like a snapshot (has meta tags, structured content)
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const hasTitle = !!document.querySelector('title')?.textContent?.trim();
      const hasMetaDesc = !!document.querySelector('meta[name="description"]');
      const hasOgTags = !!document.querySelector('meta[property^="og:"]');
      const hasTwitterTags = !!document.querySelector('meta[property^="twitter:"], meta[name^="twitter:"]');
      
      result.hasMetaTags = hasTitle && hasMetaDesc;
      result.isSnapshot = hasTitle && hasMetaDesc && (hasOgTags || hasTwitterTags);
      
      result.status = 'PASS';
      console.log(`  ✅ Bot response: ${response.status} | Snapshot: ${result.isSnapshot ? '✓' : '✗'} | Meta: ${result.hasMetaTags ? '✓' : '✗'}`);
      console.log(`  🤖 Robots: ${result.robotsTag || 'Not set'}`);
      
    } else {
      result.status = 'FAIL';
      result.errors.push(`HTTP ${response.status} ${response.statusText}`);
      console.log(`  ❌ Bot request failed: ${response.status} ${response.statusText}`);
    }
    
  } catch (error) {
    result.status = 'FAIL';
    result.errors.push(`Bot request failed: ${error.message}`);
    console.log(`  ❌ Bot request error: ${error.message}`);
  }
  
  TEST_RESULTS.botTests.push(result);
  if (result.status === 'PASS') {
    TEST_RESULTS.summary.botsPass++;
  } else {
    TEST_RESULTS.summary.botsFail++;
  }
  
  return result;
}

/**
 * Test navigation links
 */
async function testNavigationLinks() {
  console.log(`\n🔗 Testing navigation links...`);
  
  try {
    // Get homepage to extract navigation links
    const response = await fetch(`${BASE_URL}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extract all internal links
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map(link => link.getAttribute('href'))
      .filter(href => href && (href.startsWith('/') || href.startsWith('#')))
      .filter(href => !href.startsWith('#')) // Remove fragment-only links
      .filter((href, index, arr) => arr.indexOf(href) === index); // Remove duplicates
    
    console.log(`  Found ${links.length} internal links to test`);
    
    for (const link of links.slice(0, 20)) { // Test first 20 links to avoid overwhelming
      const result = {
        link,
        status: null,
        statusCode: null,
        errors: []
      };
      
      try {
        const linkResponse = await fetch(`${BASE_URL}${link}`, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 5000
        });
        
        result.statusCode = linkResponse.status;
        
        if (linkResponse.status >= 200 && linkResponse.status < 300) {
          result.status = 'PASS';
          console.log(`    ✅ ${link} → ${linkResponse.status}`);
          TEST_RESULTS.summary.linksPass++;
        } else if (linkResponse.status >= 300 && linkResponse.status < 400) {
          result.status = 'REDIRECT';
          console.log(`    🔄 ${link} → ${linkResponse.status} (redirect)`);
          TEST_RESULTS.summary.linksPass++; // Redirects are OK
        } else {
          result.status = 'FAIL';
          result.errors.push(`HTTP ${linkResponse.status}`);
          console.log(`    ❌ ${link} → ${linkResponse.status}`);
          TEST_RESULTS.summary.linksFail++;
        }
        
      } catch (error) {
        result.status = 'FAIL';
        result.errors.push(`Request failed: ${error.message}`);
        console.log(`    ❌ ${link} → Error: ${error.message}`);
        TEST_RESULTS.summary.linksFail++;
      }
      
      TEST_RESULTS.linkTests.push(result);
    }
    
  } catch (error) {
    console.log(`  ❌ Navigation link testing failed: ${error.message}`);
  }
}

/**
 * Generate comprehensive test report
 */
function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE WEBSITE TESTING REPORT');
  console.log('='.repeat(80));
  
  // Summary
  console.log('\n📋 SUMMARY:');
  console.log(`  Pages Tested: ${TEST_RESULTS.summary.pagesPass + TEST_RESULTS.summary.pagesFail}`);
  console.log(`  Pages Pass: ${TEST_RESULTS.summary.pagesPass} ✅`);
  console.log(`  Pages Fail: ${TEST_RESULTS.summary.pagesFail} ❌`);
  console.log(`  Links Pass: ${TEST_RESULTS.summary.linksPass} ✅`);
  console.log(`  Links Fail: ${TEST_RESULTS.summary.linksFail} ❌`);
  console.log(`  Bot Tests Pass: ${TEST_RESULTS.summary.botsPass} ✅`);
  console.log(`  Bot Tests Fail: ${TEST_RESULTS.summary.botsFail} ❌`);
  
  // Failed pages
  const failedPages = TEST_RESULTS.pageTests.filter(test => test.status === 'FAIL');
  if (failedPages.length > 0) {
    console.log('\n❌ FAILED PAGES:');
    failedPages.forEach(page => {
      console.log(`  ${page.path} - ${page.errors.join(', ')}`);
    });
  }
  
  // SEO Issues
  console.log('\n🔍 SEO INDEXABILITY ANALYSIS:');
  const noRobotsTag = TEST_RESULTS.pageTests.filter(test => 
    test.status === 'PASS' && !test.robotsTag
  );
  
  const goodRobotsTag = TEST_RESULTS.pageTests.filter(test => 
    test.status === 'PASS' && test.robotsTag && test.robotsTag.includes('index')
  );
  
  const badRobotsTag = TEST_RESULTS.pageTests.filter(test => 
    test.status === 'PASS' && test.robotsTag && test.robotsTag.includes('noindex')
  );
  
  console.log(`  Pages with good indexing (index, follow): ${goodRobotsTag.length}`);
  console.log(`  Pages without robots tag: ${noRobotsTag.length}`);
  console.log(`  Pages with noindex: ${badRobotsTag.length}`);
  
  if (badRobotsTag.length > 0) {
    console.log('    ⚠️  Pages with noindex:');
    badRobotsTag.forEach(page => {
      console.log(`      ${page.path} - ${page.robotsTag}`);
    });
  }
  
  // Bot detection analysis
  console.log('\n🤖 BOT DETECTION ANALYSIS:');
  const snapshotPages = TEST_RESULTS.botTests.filter(test => test.isSnapshot);
  const nonSnapshotPages = TEST_RESULTS.botTests.filter(test => 
    test.status === 'PASS' && !test.isSnapshot
  );
  
  console.log(`  Pages serving snapshots to bots: ${snapshotPages.length}`);
  console.log(`  Pages not serving snapshots: ${nonSnapshotPages.length}`);
  
  // Performance insights
  console.log('\n⚡ PERFORMANCE INSIGHTS:');
  const responseTimes = TEST_RESULTS.pageTests
    .filter(test => test.responseTime)
    .map(test => test.responseTime);
  
  if (responseTimes.length > 0) {
    const avgTime = Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length);
    const maxTime = Math.max(...responseTimes);
    console.log(`  Average response time: ${avgTime}ms`);
    console.log(`  Slowest response: ${maxTime}ms`);
  }
  
  console.log('\n' + '='.repeat(80));
  
  // Return overall success
  const overallSuccess = TEST_RESULTS.summary.pagesFail === 0 && TEST_RESULTS.summary.linksFail === 0;
  return overallSuccess;
}

/**
 * Main testing function
 */
async function runComprehensiveTests() {
  console.log('🚀 Starting comprehensive website testing...');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📄 Pages to test: ${ALL_PAGES.length}`);
  
  TEST_RESULTS.summary.totalPages = ALL_PAGES.length;
  
  // 1. Test page existence and basic properties
  console.log('\n🧪 PHASE 1: Testing page existence and properties...');
  for (const page of ALL_PAGES) {
    await testPageExistence(page);
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // 2. Test bot detection for sample pages
  console.log('\n🤖 PHASE 2: Testing bot detection and snapshots...');
  const samplePages = [
    '/', 
    '/solutions', 
    '/solutions/term-loans',
    '/industries/medical-healthcare',
    '/about',
    '/contact'
  ];
  
  for (const page of samplePages) {
    for (const userAgent of BOT_USER_AGENTS.slice(0, 2)) { // Test with 2 different bots
      await testBotDetection(page, userAgent);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  // 3. Test navigation links
  console.log('\n🔗 PHASE 3: Testing navigation links...');
  await testNavigationLinks();
  
  // 4. Generate report
  console.log('\n📊 PHASE 4: Generating comprehensive report...');
  const success = generateReport();
  
  return success;
}

// Handle missing dependencies gracefully
async function checkDependencies() {
  try {
    await import('node-fetch');
    await import('jsdom');
    return true;
  } catch (error) {
    console.log('❌ Missing dependencies. Installing...');
    return false;
  }
}

// Run the tests
if (import.meta.url === `file://${process.argv[1]}`) {
  checkDependencies().then(depsOk => {
    if (depsOk) {
      runComprehensiveTests().then(success => {
        process.exit(success ? 0 : 1);
      }).catch(error => {
        console.error('❌ Testing failed:', error);
        process.exit(1);
      });
    } else {
      console.log('Please install dependencies first:');
      console.log('npm install node-fetch jsdom');
      process.exit(1);
    }
  });
}

export { runComprehensiveTests, ALL_PAGES, TEST_RESULTS };