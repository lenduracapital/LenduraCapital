// CSP Scanner - Verify unsafe-inline elimination
(function() {
    'use strict';

    function scanCSP() {
        const results = {
            timestamp: new Date().toISOString(),
            violations: [],
            compliance: {
                noUnsafeInline: false,
                externalScripts: true,
                externalStyles: true
            }
        };

        // Check for meta CSP tags
        const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (metaCSP) {
            const cspContent = metaCSP.getAttribute('content');
            if (cspContent.includes("'unsafe-inline'")) {
                results.violations.push('Meta CSP contains unsafe-inline');
                results.compliance.noUnsafeInline = false;
            } else {
                results.compliance.noUnsafeInline = true;
            }
        }

        // Check for inline scripts
        const inlineScripts = document.querySelectorAll('script:not([src])');
        if (inlineScripts.length > 0) {
            results.violations.push(`Found ${inlineScripts.length} inline script(s)`);
            results.compliance.externalScripts = false;
        }

        // Check for inline styles
        const inlineStyles = document.querySelectorAll('style');
        if (inlineStyles.length > 0) {
            results.violations.push(`Found ${inlineStyles.length} inline style(s)`);
            results.compliance.externalStyles = false;
        }

        // Check for onclick handlers
        const elementsWithOnclick = document.querySelectorAll('[onclick]');
        if (elementsWithOnclick.length > 0) {
            results.violations.push(`Found ${elementsWithOnclick.length} onclick handler(s)`);
        }

        // Check external script sources
        const externalScripts = document.querySelectorAll('script[src]');
        results.externalScriptCount = externalScripts.length;

        // Check external style sources
        const externalStyles = document.querySelectorAll('link[rel="stylesheet"]');
        results.externalStyleCount = externalStyles.length;

        return results;
    }

    // Test CSP compliance by attempting to execute inline script
    function testCSPEnforcement() {
        try {
            // This should fail if CSP is properly configured
            const script = document.createElement('script');
            script.textContent = 'window.cspTest = true;';
            document.head.appendChild(script);
            
            setTimeout(() => {
                if (window.cspTest) {
                    console.warn('CSP Test Failed: Inline script executed');
                } else {
                    console.log('CSP Test Passed: Inline script blocked');
                }
                document.head.removeChild(script);
            }, 100);
        } catch (error) {
            console.log('CSP Test Passed: Inline script blocked with error');
        }
    }

    // Report CSP scan results
    function reportCSPResults(results) {
        console.group('CSP Compliance Scan Results');
        console.log('Timestamp:', results.timestamp);
        
        if (results.violations.length === 0) {
            console.log('✅ No CSP violations found');
        } else {
            console.warn('⚠️ CSP Violations detected:');
            results.violations.forEach(violation => {
                console.warn('- ' + violation);
            });
        }

        console.log('Compliance Status:');
        console.log('- No unsafe-inline:', results.compliance.noUnsafeInline ? '✅' : '❌');
        console.log('- External scripts only:', results.compliance.externalScripts ? '✅' : '❌');
        console.log('- External styles only:', results.compliance.externalStyles ? '✅' : '❌');
        
        console.log('External Resources:');
        console.log('- Script files:', results.externalScriptCount);
        console.log('- Style files:', results.externalStyleCount);
        
        console.groupEnd();

        return results;
    }

    // Run CSP scan when page loads
    function initCSPScan() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                    const results = scanCSP();
                    reportCSPResults(results);
                    testCSPEnforcement();
                }, 1000);
            });
        } else {
            setTimeout(() => {
                const results = scanCSP();
                reportCSPResults(results);
                testCSPEnforcement();
            }, 1000);
        }
    }

    // Initialize scan
    initCSPScan();

    // Make scanner available globally for manual testing
    window.cspScanner = {
        scan: scanCSP,
        test: testCSPEnforcement,
        report: reportCSPResults
    };
})();