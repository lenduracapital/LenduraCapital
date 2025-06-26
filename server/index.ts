import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add connection logging
  app.use((req, res, next) => {
    console.log(`🔗 New connection from: ${req.ip || req.connection.remoteAddress}`);
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
    log(`✅ Server bound to all interfaces on port ${PORT}`);
    log(`✅ Replit Preview: https://8b193348-00a4-4833-9d07-3dcf3473f797-00-workspace.spock.replit.dev`);
    log(`✅ Server address: ${JSON.stringify(server.address())}`);
    log(`✅ Server listening: ${server.listening}`);
  });
}

startServer().catch(console.error);