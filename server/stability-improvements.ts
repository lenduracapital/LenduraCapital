// Stability improvements for the server to prevent crashes

import { Application } from 'express';
import { Server } from 'http';

// Track if improvements have already been applied to prevent duplicates
let improvementsApplied = false;

export function applyStabilityImprovements(app: Application, server?: Server) {
  // Prevent applying improvements multiple times
  if (improvementsApplied) {
    console.log('⚠️ Stability improvements already applied, skipping...');
    return;
  }
  improvementsApplied = true;
  // 1. Limit request body size to prevent memory issues
  app.use((req, res, next) => {
    if (req.headers['content-length']) {
      const size = parseInt(req.headers['content-length']);
      if (size > 10 * 1024 * 1024) { // 10MB limit
        res.status(413).json({ error: 'Request body too large' });
        return;
      }
    }
    next();
  });

  // 2. Add request timeout
  app.use((req, res, next) => {
    req.setTimeout(30000, () => {
      res.status(408).json({ error: 'Request timeout' });
    });
    next();
  });

  // 3. Memory usage monitoring
  const checkMemoryUsage = () => {
    const usage = process.memoryUsage();
    const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(usage.heapTotal / 1024 / 1024);
    const rssMB = Math.round(usage.rss / 1024 / 1024);
    
    if (heapUsedMB > 500) { // If using more than 500MB
      console.warn(`⚠️ High memory usage: Heap ${heapUsedMB}MB / ${heapTotalMB}MB, RSS: ${rssMB}MB`);
      
      // Force garbage collection if available
      if (global.gc) {
        console.log('🔧 Running garbage collection...');
        global.gc();
      }
    }
  };

  // Check memory every 30 seconds
  setInterval(checkMemoryUsage, 30000);

  // 4. Prevent event emitter memory leaks
  if (server) {
    server.setMaxListeners(50);
  }
  process.setMaxListeners(50);

  // 5. Clean up inactive connections
  if (server) {
    const connections = new Set<any>();
    
    server.on('connection', (socket) => {
      connections.add(socket);
      
      socket.on('close', () => {
        connections.delete(socket);
      });
      
      // Force close idle connections after 30 seconds
      socket.setTimeout(30000);
      socket.on('timeout', () => {
        socket.destroy();
      });
    });

    // Graceful shutdown handler
    const gracefulShutdown = () => {
      console.log('🛑 Initiating graceful shutdown...');
      
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });

      // Force close all connections after 5 seconds
      setTimeout(() => {
        connections.forEach(socket => socket.destroy());
        process.exit(0);
      }, 5000);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  }

  console.log('✅ Stability improvements applied');
}