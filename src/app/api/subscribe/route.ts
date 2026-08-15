import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const dynamic = "force-dynamic";

// In-memory rate limiting map: IP -> { count, expiresAt }
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

const SubscribeSchema = z.object({
  email: z.string().email("Enter a valid email."),
  leadMagnet: z.string().max(120).default("newsletter"),
  // Honeypot field - should be empty for real users
  address: z.string().optional(),
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();
    
    // Rate Limiting
    const limit = rateLimitMap.get(ip);
    if (limit) {
      if (now > limit.expiresAt) {
        rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW });
      } else if (limit.count >= RATE_LIMIT_MAX) {
        return Response.json({ ok: false, error: "Too many requests, try again later." }, { status: 429 });
      } else {
        limit.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW });
    }

    const body = await request.json().catch(() => ({}));
    
    // Validation
const parsed = SubscribeSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ ok: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Honeypot check
    if (parsed.data.address) {
      // Act like it succeeded to fool bots
      return Response.json({ ok: true });
    }

    const { email, leadMagnet } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await db
      .select({ id: subscribers.id })
      .from(subscribers)
      .where(eq(subscribers.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return Response.json({ ok: true, alreadySubscribed: true });
    }

    await db.insert(subscribers).values({ id: crypto.randomUUID(), email: normalizedEmail, leadMagnet });
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
