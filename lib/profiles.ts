import { profiles, type Lang, type Profile } from "../data/profiles";

const slugPattern = /^[a-z0-9-]+$/;

export type { Lang, Profile } from "@/data/profiles";
export const allProfiles: Profile[] = profiles;

export function sanitizeSlug(rawSlug: string | undefined): string | null {
  if (typeof rawSlug !== "string") return null;
  const normalized = rawSlug.trim().toLowerCase();
  if (!normalized || !slugPattern.test(normalized)) return null;
  return normalized;
}

export function getProfileBySlug(slug: string): Profile | undefined {
  const normalized = sanitizeSlug(slug);
  if (!normalized) {
    console.warn("sanitizeSlug failed for", slug);
    return undefined;
  }
  const found = allProfiles.find((profile) => profile.slug === normalized);
  if (!found) {
    console.warn("profile not found for slug", normalized, "available:", allProfiles.map(p=>p.slug));
  }
  return found;
}

export function phoneForWa(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function displayPhone(phone: string): string {
  const cleaned = phone.trim();
  if (cleaned.startsWith("+")) return cleaned;
  return `+${cleaned}`;
}

export function defaultLang(profile: Profile): Lang {
  return profile.defaultLang ?? "es";
}

export function translate<T = string>(
  value: Record<Lang, T> | undefined,
  lang: Lang,
  fallback?: Lang,
): T | undefined {
  if (!value) return undefined;
  return value[lang] ?? (fallback ? value[fallback] : undefined);
}

export function buildWhatsAppMessage(
  profile: Profile,
  lang: Lang,
  extra?: { name?: string; company?: string; wine?: string; interest?: string },
): string {
  const template =
    translate(profile.whatsappPrefill, lang) ??
    (lang === "en"
      ? "Hi, I'm ___ (Name/Company). I met you at Wine Paris and I'd like to know more about your wines."
      : "Hola, soy ___ (Nombre/Empresa). Te conocí en Wine Paris y me interesa conocer más sobre sus vinos.");

  const nameCompany = [extra?.name, extra?.company].filter(Boolean).join(" / ");

  const enriched =
    nameCompany && template.includes("___")
      ? template.replace("___", nameCompany)
      : template;

  const wineHint =
    extra?.wine && lang === "en"
      ? ` I'm especially interested in ${extra.wine}.`
      : extra?.wine
        ? ` Me interesa especialmente ${extra.wine}.`
        : "";

  const interestHint =
    extra?.interest && lang === "en"
      ? ` Focus: ${extra.interest}.`
      : extra?.interest
        ? ` Interés: ${extra.interest}.`
        : "";

  return `${enriched}${wineHint}${interestHint}`.trim();
}

export function buildWineMessage(
  profile: Profile,
  lang: Lang,
  wineName: string,
): string {
  const base =
    translate(profile.whatsappPrefill, lang) ??
    (lang === "en"
      ? "Hi, I'm ___ (Name/Company). I met you at Wine Paris and I'd like to know more about your wines."
      : "Hola, soy ___ (Nombre/Empresa). Te conocí en Wine Paris y me interesa conocer más sobre sus vinos.");

  const request =
    lang === "en"
      ? `Could you send me the tech sheet for ${wineName}?`
      : `¿Podés enviarme la ficha técnica de ${wineName}?`;

  return `${base} ${request}`;
}
