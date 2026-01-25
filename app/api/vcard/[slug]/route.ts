import { NextResponse } from "next/server";
import { getProfileBySlug } from "@/lib/profiles";

const VCARD_VERSION = "3.0";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  console.log("[vcard] slug param:", slug);
  const profile = getProfileBySlug(slug);

  if (!profile) {
    console.warn("[vcard] profile not found for slug", slug);
    return NextResponse.json(
      { message: "Perfil no encontrado" },
      { status: 404 },
    );
  }

  const phone = profile.whatsappE164.trim();
  const normalizedPhone = phone.startsWith("+")
    ? phone
    : `+${phone.replace(/[^\d]/g, "")}`;

  const vcardLines = [
    "BEGIN:VCARD",
    `VERSION:${VCARD_VERSION}`,
    `N:${profile.contactName ?? profile.displayName};;;;`,
    `FN:${profile.contactName ?? profile.displayName}`,
    `ORG:${profile.company}`,
    `TEL;TYPE=CELL:${normalizedPhone}`,
    `EMAIL:${profile.email}`,
    profile.website ? `URL:${profile.website}` : null,
    "END:VCARD",
  ].filter(Boolean);

  const vcard = vcardLines.join("\r\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${profile.slug}.vcf"`,
    },
  });
}
