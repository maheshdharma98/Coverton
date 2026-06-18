interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

const ENDPOINT_CONFIGS: Record<string, RateLimitConfig> = {
  enquiry: { limit: 5,  windowMs: 30 * 60 * 1000 },
  upload:  { limit: 3,  windowMs: 10 * 60 * 1000 },
  default: { limit: 10, windowMs: 10 * 60 * 1000 },
};

// Keyed by "ip:endpoint" so each endpoint tracks independently
const store = new Map<string, RateLimitRecord>();

// Prune expired entries every 15 minutes to prevent memory growth
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  Array.from(store.entries()).forEach(([key, record]) => {
    if (now > record.resetAt) store.delete(key);
  });
}, 15 * 60 * 1000);

// Don't block process exit in build / test environments
if (cleanupTimer.unref) cleanupTimer.unref();

export function checkRateLimit(
  ip: string,
  endpoint: string
): { allowed: boolean; retryAfter?: number } {
  const config = ENDPOINT_CONFIGS[endpoint] ?? ENDPOINT_CONFIGS.default;
  const key = `${ip}:${endpoint}`;
  const now = Date.now();

  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true };
  }

  if (record.count >= config.limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count++;
  return { allowed: true };
}
