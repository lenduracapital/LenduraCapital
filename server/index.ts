import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add basic headers
  app.use((req, res, next) => {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  const server = await registerRoutes(app);

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    serveStatic(app);
  } else {
    await setupVite(app, server);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
    console.log(`✅ Server bound to all interfaces on port ${PORT}`);
    console.log(`✅ Replit Preview: https://${process.env.REPL_ID}-00-${process.env.REPL_SLUG}.${process.env.REPLIT_CLUSTER}.replit.dev`);
    console.log(`✅ Server address: ${JSON.stringify(server.address())}`);
    console.log(`✅ Server listening: ${server.listening}`);
  });

  // Log new connections for debugging
  server.on('connection', (socket) => {
    console.log(`🔗 New connection from: ${socket.remoteAddress}:${socket.remotePort}`);
  });
}

startServer().catch(console.error);