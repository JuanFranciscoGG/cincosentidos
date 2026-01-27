import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const WEBHOOK_TOKEN = process.env.LEADS_WEBHOOK_TOKEN;

type LeadPayload = {
  slug?: string;
  name: string;
  company?: string;
  country?: string;
  email: string;
  whatsapp?: string;
  interest?: string;
  language?: string;
};

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  if (!payload?.name || !payload?.email) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const entry = {
    ...payload,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
  };

  if (!WEBHOOK_URL || !WEBHOOK_TOKEN) {
    console.error("Webhook env vars missing");
    return NextResponse.json({ message: "Server not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBHOOK_TOKEN}`,
      },
      body: JSON.stringify(entry),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Webhook error", res.status, text);
      return NextResponse.json({ message: "Webhook error" }, { status: 502 });
    }
  } catch (error) {
    console.error("Webhook fetch failed", error);
    return NextResponse.json({ message: "Webhook error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
