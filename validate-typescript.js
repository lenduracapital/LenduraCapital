#!/usr/bin/env node

/**
 * TypeScript Configuration Validator
 * Ensures TypeScript is configured properly for production builds
 */

import { readFileSync } from 'fs';
import { join } from 'path';

function validateTypeScriptConfig() {
  console.log('🔍 Validating TypeScript configuration...\n');
  
  try {
    const tsconfigPath = join(process.cwd(), 'tsconfig.json');
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
    
    const { compilerOptions } = tsconfig;
    let issues = [];
    let recommendations = [];
    
    // Critical checks for deployment
    if (compilerOptions.noEmit === true) {
      issues.push('❌ CRITICAL: noEmit is set to true - this prevents JavaScript output generation');
    } else {
      console.log('✅ noEmit is properly configured for builds');
    }
    
    if (compilerOptions.emitDeclarationOnly === true) {
      issues.push('❌ CRITICAL: emitDeclarationOnly is true - this only generates .d.ts files');
    } else {
      console.log('✅ emitDeclarationOnly allows JavaScript output');
    }
    
    if (!compilerOptions.outDir) {
      recommendations.push('💡 Consider setting outDir for organized output');
    } else {
      console.log(`✅ Output directory configured: ${compilerOptions.outDir}`);
    }
    
    if (compilerOptions.noEmitOnError === true) {
      recommendations.push('💡 noEmitOnError is true - build will fail on any TypeScript error');
    }
    
    // Module configuration checks
    if (compilerOptions.module) {
      console.log(`✅ Module format: ${compilerOptions.module}`);
    }
    
    if (compilerOptions.target) {
      console.log(`✅ Target: ${compilerOptions.target}`);
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (issues.length > 0) {
      console.log('❌ CRITICAL ISSUES FOUND:');
      issues.forEach(issue => console.log(issue));
      console.log('\n🛠️  Please fix these issues before deployment');
      return false;
    }
    
    if (recommendations.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      recommendations.forEach(rec => console.log(rec));
      console.log();
    }
    
    console.log('✅ TypeScript configuration is valid for production builds');
    return true;
    
  } catch (error) {
    console.error('❌ Error reading tsconfig.json:', error.message);
    return false;
  }
}

// Run validation
const isValid = validateTypeScriptConfig();
process.exit(isValid ? 0 : 1);