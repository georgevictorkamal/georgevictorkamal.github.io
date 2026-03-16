import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";


const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  return typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress || "unknown";
}

function rateLimit(windowMs: number, maxRequests: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const userData = requestCounts.get(clientIp);

    if (userData && now < userData.resetTime) {
      userData.count++;
      if (userData.count > maxRequests) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((userData.resetTime - now) / 1000),
        });
      }
    } else {
      requestCounts.set(clientIp, { count: 1, resetTime: now + windowMs });
    }

    next();
  };
}


function securityHeaders(req: Request, res: Response, next: NextFunction) {
  
  res.setHeader("X-Content-Type-Options", "nosniff");

  
  res.setHeader("X-Frame-Options", "DENY");

  
  res.setHeader("X-XSS-Protection", "1; mode=block");

  
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https: https://fonts.gstatic.com",
    "connect-src 'self' https: wss:",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  res.setHeader("Content-Security-Policy", cspDirectives.join("; "));

  next();
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  
  app.use(securityHeaders);

  
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  
  
  const isDevMode = process.env.NODE_ENV === "development";
  const generalLimit = isDevMode ? 10000 : 1000; 
  const contactLimit = isDevMode ? 1000 : 100;   
  
  app.use(rateLimit(60 * 60 * 1000, generalLimit));
  
  
  app.use("/api/trpc/portfolio.contact.send", rateLimit(15 * 60 * 1000, contactLimit));

  
  registerOAuthRoutes(app);

  
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
