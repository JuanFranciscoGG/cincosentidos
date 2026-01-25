import fs from "fs/promises";
import { NextResponse } from "next/server";

const LOG_PATH = "/tmp/leads-log.jsonl";

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

  try {
    await fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", {
      encoding: "utf-8",
    });
  } catch (error) {
    console.warn("No se pudo escribir el log en /tmp", error);
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error("Webhook error", error);
    }
  }

  return NextResponse.json({ ok: true });
}

