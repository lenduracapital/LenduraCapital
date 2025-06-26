import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

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
  });
}

startServer().catch(console.error);