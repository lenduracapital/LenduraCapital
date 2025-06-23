#!/bin/bash

echo "=== FundTek Security Fix Script ==="
echo "Addressing 17 dependency vulnerabilities..."

# Clear npm cache to prevent ENOTEMPTY errors
echo "Clearing npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json for clean install
echo "Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Reinstall dependencies with latest patches
echo "Reinstalling dependencies with security fixes..."
npm install

# Run audit fix for remaining issues
echo "Running security audit fix..."
npm audit fix --force

# Update specific vulnerable packages
echo "Updating specific vulnerable packages..."
npm update @babel/helpers brace-expansion semver tough-cookie useragent

# Verify fixes
echo "Verifying security fixes..."
npm audit --audit-level=moderate

echo "=== Security fix complete ==="
echo "Checking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck

echo "=== All fixes applied ==="