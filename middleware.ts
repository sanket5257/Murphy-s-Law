import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Advanced DDoS and Attack Protection Configuration
// ⚙️ OPTIMIZED FOR CHATBOT APPLICATION
const SECURITY_CONFIG = {
  // Blocked user agents (bots, scrapers, attack tools)
  blockedUserAgents: [
    "curl",
    "python",
    "scrapy",
    "bot",
    "spider",
    "wget",
    "httpx",
    "requests",
    "headless",
    "phantom",
    "puppeteer",
    "selenium",
    "crawler",
    "masscan",
    "nmap",
    "nikto",
    "sqlmap",
    "gobuster",
    "dirbuster",
    "burp",
    "zgrab",
    "scanning",
    "postman",
  ],
  // Honeypot paths (instant block)
  honeypotPaths: [
    "/wp-admin",
    "/wp-login.php",
    "/phpmyadmin",
    "/.env",
    "/config",
  ],
  // Violation threshold before blocking
  challengeThreshold: 5, // 5 violations before 15-min block
};

// In-memory storage for security
const ipViolations = new Map<string, number>();
const blockedIPs = new Map<string, number>();
const ipFingerprints = new Map<string, Set<string>>();

// Auto-cleanup old data every 5 minutes
setInterval(() => {
  const now = Date.now();
  Array.from(ipViolations.keys()).forEach((ip) => {
    const violations = ipViolations.get(ip) || 0;
    if (violations === 0) ipViolations.delete(ip);
  });
  Array.from(blockedIPs.entries()).forEach(([ip, unblockTime]) => {
    if (now > unblockTime) blockedIPs.delete(ip);
  });
}, 300_000);

// Get real IP address
function getRealIP(request: NextRequest): string {
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  const realIP = request.headers.get("x-real-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    cfConnectingIP ||
    realIP ||
    (forwarded ? forwarded.split(",")[0].trim() : "unknown")
  );
}

// Record security violation
function recordViolation(ip: string): void {
  const violations = (ipViolations.get(ip) || 0) + 1;
  ipViolations.set(ip, violations);
  if (violations >= SECURITY_CONFIG.challengeThreshold) {
    blockedIPs.set(ip, Date.now() + 900_000); // Block for 15 minutes
  }
}

// Check if IP is blocked
function checkIPBlocked(ip: string): NextResponse | null {
  const unblockTime = blockedIPs.get(ip);
  if (unblockTime && Date.now() < unblockTime) {
    const remainingMinutes = Math.ceil((unblockTime - Date.now()) / 60_000);
    return NextResponse.json(
      {
        message: `IP temporarily blocked. Try again in ${remainingMinutes} minute(s).`,
      },
      { status: 403 }
    );
  }
  return null;
}

// Honeypot check
function honeypotCheck(request: NextRequest): NextResponse | null {
  const ip = getRealIP(request);
  const path = request.nextUrl.pathname;
  if (SECURITY_CONFIG.honeypotPaths.some((p) => path.includes(p))) {
    recordViolation(ip);
    blockedIPs.set(ip, Date.now() + 3600_000); // Block for 1 hour
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }
  return null;
}

// Advanced bot detection
function detectBot(request: NextRequest): NextResponse | null {
  const ip = getRealIP(request);
  const ua = request.headers.get("user-agent")?.toLowerCase() || "";
  if (!ua || ua.length < 10) {
    recordViolation(ip);
    return NextResponse.json({ message: "Invalid request." }, { status: 403 });
  }
  if (SECURITY_CONFIG.blockedUserAgents.some((b) => ua.includes(b))) {
    recordViolation(ip);
    return NextResponse.json({ message: "Access denied." }, { status: 403 });
  }
  const suspiciousHeaders = [
    !request.headers.get("accept"),
    !request.headers.get("accept-language"),
    !request.headers.get("accept-encoding"),
  ].filter(Boolean).length;
  if (suspiciousHeaders >= 2) {
    recordViolation(ip);
    return NextResponse.json(
      { message: "Suspicious request." },
      { status: 403 }
    );
  }
  return null;
}

// Request fingerprinting
function trackFingerprint(request: NextRequest): NextResponse | null {
  const ip = getRealIP(request);
  const components = [
    request.headers.get("user-agent") || "",
    request.headers.get("accept-language") || "",
    request.headers.get("accept-encoding") || "",
    ip,
  ];
  const fingerprint = Buffer.from(components.join("|"))
    .toString("base64")
    .slice(0, 32);
  if (!ipFingerprints.has(ip)) {
    ipFingerprints.set(ip, new Set());
  }
  const fingerprints = ipFingerprints.get(ip)!;
  if (fingerprints.size > 5 && !fingerprints.has(fingerprint)) {
    recordViolation(ip);
    return NextResponse.json(
      { message: "Suspicious activity." },
      { status: 403 }
    );
  }
  fingerprints.add(fingerprint);
  return null;
}

// Apply security headers
function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  );
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://challenges.cloudflare.com blob:",
    "script-src-elem 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://challenges.cloudflare.com blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://challenges.cloudflare.com",
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://challenges.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https://*.blob.core.windows.net blob: data:",
    "connect-src 'self' https: wss: ws: https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "frame-src 'self' https://challenges.cloudflare.com",
    "child-src 'self' https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

// Main middleware
export const middleware = async (request: NextRequest) => {
  const ip = getRealIP(request);
  const path = request.nextUrl.pathname;

  // Skip security for static assets
  if (
    path.includes("/_next/") ||
    path.includes("/favicon") ||
    path.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }

  try {
    // Layer 0: Check if IP is blocked
    const blockCheck = checkIPBlocked(ip);
    if (blockCheck) return applySecurityHeaders(blockCheck);

    // Layer 1: Honeypot traps
    const honeypot = honeypotCheck(request);
    if (honeypot) return applySecurityHeaders(honeypot);

    // Layer 2: Bot detection
    const botCheck = detectBot(request);
    if (botCheck) return applySecurityHeaders(botCheck);

    // Layer 3: Request fingerprinting
    const fingerprintCheck = trackFingerprint(request);
    if (fingerprintCheck) return applySecurityHeaders(fingerprintCheck);

    // Layer 4: Admin route protection
    if (path.startsWith('/cms-dashboard-2026')) {
      // Allow login page
      if (path === '/cms-dashboard-2026/login') {
        const response = NextResponse.next();
        return applySecurityHeaders(response);
      }
      
      // Check for auth token
      const token = request.cookies.get('sb-access-token');
      if (!token) {
        const response = NextResponse.redirect(new URL('/cms-dashboard-2026/login', request.url));
        return applySecurityHeaders(response);
      }
    }

    const response = NextResponse.next();
    return applySecurityHeaders(response);
  } catch {
    const errorResponse = NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
    return applySecurityHeaders(errorResponse);
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
