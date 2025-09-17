import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import { config, getDeploymentInfo } from "./config";
import {
  environmentMiddleware,
  createHealthCheckHandler,
  createEnvValidationHandler,
  requestLoggingMiddleware,
} from "./middleware/environment";
import {
  botPrerenderMiddleware,
  createBotDebugHandler,
  createSnapshotRegenHandler,
} from "./middleware/bot-prerender";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Startup logs
console.log("=== LENDURA CAPITAL - SERVER STARTUP ===");
console.log("📍 Working Dir:", process.cwd());
console.log("📄 Script:", import.meta.url);
console.log("🟢 Node:", process.version);
console.log("🌍 Env:", config.NODE_ENV);
console.log("🌐 Port:", config.PORT);
console.log(
  "🗄️ Database:",
  config.DATABASE_URL ? "Connected" : "Missing DATABASE_URL"
);
const deployment = getDeploymentInfo();
console.log("🚀 Platform:", deployment.name);
if (deployment.url !== "localhost") console.log("🌐 URL:", deployment.url);

const app = express();
// Middlewares
app.set("trust proxy", 1);
app.use(environmentMiddleware);
app.use(requestLoggingMiddleware);
app.use(
  compression({
    level: 6,
    threshold: 1024,
  })
);

// Global headers
app.use((req, res, next) => {
  const isProd = config.NODE_ENV === "production";
  try {
    if (isProd) {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("X-XSS-Protection", "1; mode=block");
      res.setHeader(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
      );
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") return res.sendStatus(200);
  } catch (err) {
    console.error("Header middleware error:", err);
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  next();
});

// Health endpoints
app.get("/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);
app.get("/api/health", createHealthCheckHandler());
app.get("/api/env-status", createEnvValidationHandler());

// SEO debug endpoints (development only)
if (config.NODE_ENV === "development") {
  app.get("/api/seo/bot-debug", createBotDebugHandler());
  app.post("/api/seo/regenerate-snapshots", createSnapshotRegenHandler());
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Assets
app.use(
  "/attached_assets",
  express.static(path.join(process.cwd(), "attached_assets"))
);

(async () => {
  try {
    const isProd = config.NODE_ENV === "production";
    const PORT = config.PORT;
    const HOST = config.HOST;

    console.log(
      `🚀 Starting server in ${isProd ? "production" : "development"} mode...`
    );
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌐 Host: ${HOST}`);

    // Register API routes
    await registerRoutes(app);

    // Bot Detection and Pre-rendering Middleware
    // This must come BEFORE static serving and SPA fallback
    console.log("🤖 Initializing SEO bot detection middleware...");
    app.use(botPrerenderMiddleware);

    if (!isProd) {
      // Dev: Vite integration
      await setupVite(app, null);
    } else {
      // Prod: Serve static files with proper MIME types
      console.log("📁 Serving static files...");
      const distPath = path.join(__dirname, "../dist/public");
      const staticRoot = fs.existsSync(distPath)
        ? distPath
        : path.join(__dirname, "../public");
      console.log("Static path:", staticRoot);
      
      // Serve static assets with proper MIME types
      app.use("/assets", express.static(path.join(staticRoot, "assets"), { 
        maxAge: "1y", 
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
          } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
          }
        }
      }));
      
      // Serve other static files from public folder
      app.use(express.static(staticRoot, { 
        maxAge: "1y", 
        etag: true,
        index: false  // Don't serve index.html for static routes
      }));
      
      // SPA fallback - only for non-API, non-asset routes
      app.use((req, res, next) => {
        if (req.path.startsWith("/api/") || req.path.startsWith("/assets/")) {
          return next();
        }
        const indexFile = path.join(staticRoot, "index.html");
        if (fs.existsSync(indexFile)) {
          // Set no-cache headers for index.html to prevent caching issues
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.sendFile(indexFile);
        } else {
          res.status(404).json({ error: "Frontend not built" });
        }
      });
    }

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: "Not found" });
    });

    // Error handler
    app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Request error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    );

    // Start listening
    app.listen(PORT, HOST, () => {
      console.log(`✅ Server listening on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Fatal server startup error:", error);
    process.exit(1);
  }
})();