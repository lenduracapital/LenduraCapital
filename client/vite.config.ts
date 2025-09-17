import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "..", "shared"),
      "@assets": path.resolve(__dirname, "public"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: 'es2015',
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk
          vendor: ['react', 'react-dom'],
          // Router chunk  
          router: ['wouter'],
          // UI component chunk
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label'],
          // Content pages chunk for better caching (existing files only)
          content: [
            './src/pages/about.tsx', 
            './src/pages/contact.tsx',
            './src/pages/testimonials.tsx',
            './src/pages/faq.tsx',
            './src/pages/apply-now.tsx'
          ],
          // Performance utilities chunk
          performance: [
            './src/utils/performance-monitor.ts',
            './src/utils/advanced-performance.ts',
            './src/utils/lazy-loading.tsx'
          ]
        },
        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'vendor') return 'vendor.[hash].js';
          if (chunkInfo.name === 'content') return 'blog-guides.[hash].js';
          return '[name].[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'images/[name].[hash].[ext]';
          }
          if (/css/i.test(ext)) {
            return 'css/[name].[hash].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: ['@vite/client'],
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      overlay: false
    }
  }
});