"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  type Lang,
  type Profile,
  buildWhatsAppMessage,
  displayPhone,
  phoneForWa,
  translate,
  buildWineMessage,
} from "@/lib/profiles";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { track } from "@/lib/analytics";

const ui: Record<
  Lang,
  {
    publicLabel: string;
    whatsappNow: string;
    catalog: string;
    saveContact: string;
    leaveData: string;
    leadTitle: string;
    leadSubtitle: string;
    aboutTitle: string;
    winesTitle: string;
    socialsTitle: string;
    styleTitle: string;
    styleSubtitle: string;
    copyEmail: string;
    emailCopied: string;
    copyLink: string;
    linkCopied: string;
    interestLabel: string;
    interestOptions: string[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    waWithData: string;
    name: string;
    company: string;
    country: string;
    email: string;
    whatsapp: string;
    optional: string;
    catalogLabel: string;
    requestSheet: string;
    requestInfo: string;
    notFound: string;
  }
> = {
  es: {
    publicLabel: "",
    whatsappNow: "Enviar mensaje por WhatsApp",
    catalog: "Catálogo / Portfolio",
    saveContact: "Guardar contacto",
    leaveData: "Dejanos tus datos",
    leadTitle: "Dejanos tus datos",
    leadSubtitle: "Los campos marcados son obligatorios.",
    aboutTitle: "Conocenos más",
    winesTitle: "Nuestros vinos destacados",
    socialsTitle: "Redes y web",
    styleTitle: "Elegí tu estilo",
    styleSubtitle: "Te recomendamos 2 vinos y abrimos WhatsApp con el texto listo.",
    copyEmail: "Copiar email",
    emailCopied: "Email copiado",
    copyLink: "Copiar link",
    linkCopied: "Link copiado",
    interestLabel: "Interés",
    interestOptions: [
      "Distribución",
      "Importación",
      "Prensa",
      "Turismo",
      "Partnership",
    ],
    submit: "Enviar",
    sending: "Enviando...",
    success: "¡Gracias! Te contactaremos pronto.",
    error: "Ups, algo falló. Probá de nuevo.",
    waWithData: "WhatsApp con mis datos",
    name: "Nombre",
    company: "Empresa",
    country: "País",
    email: "Email",
    whatsapp: "WhatsApp",
    optional: "opcional",
    catalogLabel: "Ver catálogo",
    requestSheet: "Pedir ficha técnica",
    requestInfo: "Quiero la ficha",
    notFound: "Perfil no encontrado",
  },
  en: {
    publicLabel: "",
    whatsappNow: "Send message via WhatsApp",
    catalog: "Catalog / Portfolio",
    saveContact: "Save contact",
    leaveData: "Leave your details",
    leadTitle: "Share your details",
    leadSubtitle: "I reply within minutes. Required fields marked.",
    aboutTitle: "Get to know us",
    winesTitle: "Our featured wines",
    socialsTitle: "Social & web",
    styleTitle: "Choose your style",
    styleSubtitle: "We suggest 2 wines and open WhatsApp with a ready message.",
    copyEmail: "Copy email",
    emailCopied: "Email copied",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    interestLabel: "Interest",
    interestOptions: [
      "Distribution",
      "Import",
      "Press",
      "Wine tourism",
      "Partnership",
    ],
    submit: "Send",
    sending: "Sending...",
    success: "Thanks! We’ll contact you soon.",
    error: "Something went wrong. Please try again.",
    waWithData: "WhatsApp with my details",
    name: "Name",
    company: "Company",
    country: "Country",
    email: "Email",
    whatsapp: "WhatsApp",
    optional: "optional",
    catalogLabel: "View catalog",
    requestSheet: "Request tech sheet",
    requestInfo: "Request info",
    notFound: "Profile not found",
  },
};

type Props = { profile: Profile };

export function ProfileClient({ profile }: Props) {
  const [lang, setLang] = useState<Lang>(profile.defaultLang);
  const [leadOpen, setLeadOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [downloadingVcf, setDownloadingVcf] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    whatsapp: "",
    interest: "",
  });

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cs-lang") : null;
    if (stored === "es" || stored === "en") {
      setLang(stored);
    } else {
      setLang(profile.defaultLang);
    }
  }, [profile.defaultLang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cs-lang", lang);
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const uiCopy = ui[lang];
  const waPhone = phoneForWa(profile.whatsappE164);
  const waMessage = buildWhatsAppMessage(profile, lang);
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;
  const heroLine =
    translate(profile.heroLine, lang, profile.defaultLang) ??
    translate(profile.heroLine, profile.defaultLang) ??
    "";
  const aboutCopy =
    translate(profile.about, lang, profile.defaultLang) ??
    translate(profile.about, profile.defaultLang) ??
    "";

  const interestOptions = uiCopy.interestOptions;
  const formWaUrl = (() => {
    const placeholder = "[complete aquí]";
    const emailPlaceholder = "correo@dominio.com";
    const template =
      lang === "en"
        ? `Hi, my name is ${form.name || placeholder}.\nI represent ${form.company || placeholder} and I'm contacting you from ${form.country || placeholder}.\n\nMy contact email is: ${form.email || "email@example.com"}\n\nMy interest is:\n${form.interest || placeholder}`
        : `Hola, mi nombre es ${form.name || placeholder}.\nRepresento a ${form.company || placeholder} y me contacto desde ${form.country || placeholder}.\n\nMi correo electrónico de contacto es: ${form.email || emailPlaceholder}\n\nEl interés por el cual me comunico es el siguiente:\n${form.interest || placeholder}`;
    return `https://wa.me/${waPhone}?text=${encodeURIComponent(template)}`;
  })();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1600);
    } catch (error) {
      console.error("No se pudo copiar el email", error);
    }
  }

  function openLeadForm() {
    track("cta_lead_click", { slug: profile.slug });
    setLeadOpen(true);
  }

  function closeLeadForm() {
    setLeadOpen(false);
  }

  async function downloadVcard() {
    setDownloadingVcf(true);
    try {
      const res = await fetch(`/api/vcard/${profile.slug}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("vCard response not ok", res.status, res.statusText, text);
        throw new Error(`vcf download failed ${res.status}`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${profile.slug}.vcf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      track("cta_vcard", { slug: profile.slug, lang });
    } catch (error) {
      console.error("No se pudo descargar vCard", error);
      alert("No se pudo descargar el contacto. Por favor vuelve a intentar.");
    } finally {
      setDownloadingVcf(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const selectedStyleOption = useMemo(
    () => profile.styleOptions?.find((opt) => opt.code === selectedStyle),
    [profile.styleOptions, selectedStyle],
  );

  function styleMessage(optionCode?: string) {
    const option = profile.styleOptions?.find((opt) => opt.code === optionCode);
    if (!option) return waMessage;
    const custom =
      option.waMessage && translate(option.waMessage, lang, profile.defaultLang);
    const message =
      custom ??
      (lang === "en"
        ? `Hi! I like the ${translate(option.label, lang, profile.defaultLang)} style. Could you send more info?`
        : `¡Hola! Me gustó el estilo ${translate(option.label, lang, profile.defaultLang)}. ¿Me pasás más info?`);
    return message;
  }

  const emailCopyLabel = copiedEmail ? uiCopy.emailCopied : uiCopy.copyEmail;

  return (
    <main className="flex min-h-screen items-start justify-center px-5 py-10 md:py-14">
      <div className="glass-card w-full max-w-5xl rounded-3xl p-7 md:p-10 lg:p-12">
        <header className="flex flex-col items-center justify-center gap-3 text-center">
          {profile.logoUrl ? (
            <img
              src={profile.logoUrl}
              alt={profile.displayName}
              className="h-20 w-auto object-contain drop-shadow-sm"
              loading="lazy"
            />
          ) : null}
          {uiCopy.publicLabel ? (
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {uiCopy.publicLabel}
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
            {profile.contactName ?? profile.displayName}
          </h1>
          {profile.contactName ? (
            <p className="text-lg font-semibold text-slate-800 opacity-90">
              {profile.displayName}
            </p>
          ) : null}
          {translate(profile.role, lang, profile.defaultLang) ? (
            <p className="text-lg font-medium text-slate-700">
              {translate(profile.role, lang, profile.defaultLang)}
            </p>
          ) : null}
          <p className="text-sm text-slate-500">{profile.location}</p>
          <p className="mt-1 max-w-2xl text-base text-slate-700">{heroLine}</p>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            <button
              className={`px-2 py-1 transition ${lang === "es" ? "text-slate-900" : "text-slate-400"}`}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <span className="text-slate-300">|</span>
            <button
              className={`px-2 py-1 transition ${lang === "en" ? "text-slate-900" : "text-slate-400"}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </header>

        <section className="mt-8 flex flex-col gap-3">
          <a
            role="button"
            onClick={downloadVcard}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl min-h-[92px]"
          >
            <div>
              <p className="text-sm text-slate-500">{uiCopy.saveContact}</p>
              <p className="text-lg font-semibold">
                {downloadingVcf
                  ? "Generando vCard..."
                  : profile.contactName ?? profile.displayName}
              </p>
            </div>
            <span aria-hidden className="text-2xl">↓</span>
          </a>

          <button
            onClick={openLeadForm}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl min-h-[92px]"
          >
            <div>
              <p className="text-lg font-semibold">{uiCopy.leaveData}</p>
            </div>
            <span aria-hidden className="text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-3.314 3.134-6 8-6s8 2.686 8 6" />
              </svg>
            </span>
          </button>

          <a
            href={waUrl}
            onClick={() => track("cta_whatsapp", { slug: profile.slug, lang })}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl min-h-[92px]"
          >
            <div>
              <p className="text-lg font-semibold">{uiCopy.whatsappNow}</p>
            </div>
            <span aria-hidden className="text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H7.5L4 21v-3.5" />
                <path d="M7 9h10" />
                <path d="M7 13h6" />
              </svg>
            </span>
          </a>

          <a
            href={profile.catalogUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_catalog", { slug: profile.slug, lang })}
            className="flex w/full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl min-h-[92px]"
          >
            <div>
              <p className="text-sm text-slate-500">{uiCopy.catalog}</p>
              <p className="text-lg font-semibold">{uiCopy.catalogLabel}</p>
            </div>
            <span aria-hidden className="text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5h6" />
                <path d="M10 2h4v3h-4z" />
                <path d="M10 5v3.5a3 3 0 0 1-.6 1.8l-.8 1.1a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h3.6a2 2 0 0 0 2-2v-7.4a2 2 0 0 0-.4-1.2l-.8-1.1a3 3 0 0 1-.6-1.8V5" />
              </svg>
            </span>
          </a>
        </section>

        {/* Copy buttons removed per request */}

        <section className="mt-10 grid gap-6 lg:grid-cols-1">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800">{uiCopy.aboutTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 text-justify">{aboutCopy}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {profile.website && (
                <Link
                  href={profile.website}
                  target="_blank"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-900 transition hover:-translate-y-0.5 hover:shadow"
                >
                  {lang === "en" ? "Website" : "Sitio web"}
                </Link>
              )}
              {profile.instagram && (
                <Link
                  href={profile.instagram}
                  target="_blank"
                  className="rounded-full border border-slate-200 px-4 py-2 text-slate-800 transition hover:-translate-y-0.5 hover:shadow"
                >
                  Instagram
                </Link>
              )}
            </div>
          </div>

        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-800">{uiCopy.winesTitle}</h3>
              <p className="text-sm text-slate-500">
                {lang === "en" ? "3 recommended wines." : "3 vinos recomendados."}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {profile.wines.map((wine) => {
              const wineMessage =
                (wine.techSheetMessage &&
                  translate(wine.techSheetMessage, lang, profile.defaultLang)) ||
                buildWineMessage(profile, lang, wine.name);
              const wineWa = `https://wa.me/${waPhone}?text=${encodeURIComponent(wineMessage)}`;
              const wineHref = wine.techSheetUrl ?? wineWa;
              const target = wine.techSheetUrl ? "_blank" : undefined;
              return (
                <div
                  key={wine.id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
                >
                  <div className="space-y-2">
                    {wine.imageUrl && (
                      <div className="relative mb-2 flex justify-center">
                        <img
                          src={wine.imageUrl}
                          alt={wine.name}
                          className="h-36 w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h4 className="text-lg font-semibold text-slate-900">{wine.name}</h4>
                    {wine.subtitle && (
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {translate(wine.subtitle, lang, profile.defaultLang)}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 text-justify">
                      {translate(wine.note, lang, profile.defaultLang)}
                    </p>
                  </div>
                <a
                  href={wineHref}
                  target={target}
                  rel={target ? "noreferrer" : undefined}
                  onClick={() =>
                    track("cta_wine_sheet", { slug: profile.slug, wine: wine.id, lang })
                  }
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow"
                >
                  {lang === "en" ? "Technical sheet" : "Ficha técnica"}
                </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* IDEA PARA RECOMENDAR VINO:
        {profile.styleOptions && profile.styleOptions.length > 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 text-white">
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  {uiCopy.styleTitle}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{uiCopy.styleSubtitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.styleOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setSelectedStyle(option.code);
                      track("cta_style", { slug: profile.slug, style: option.code, lang });
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedStyle === option.code
                        ? "bg-white text-slate-900"
                        : "bg-slate-800 text-white hover:-translate-y-0.5"
                    }`}
                  >
                    {translate(option.label, lang, profile.defaultLang)}
                  </button>
                ))}
              </div>
            </div>

            {selectedStyleOption && (
              <div className="border-t border-slate-800 px-6 py-5">
                <p className="text-sm text-slate-200">
                  {translate(selectedStyleOption.summary, lang, profile.defaultLang)}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {translate(selectedStyleOption.suggestedWines, lang, profile.defaultLang)}
                </p>
                <a
                  href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                    styleMessage(selectedStyleOption.code),
                  )}`}
                  onClick={() =>
                    track("cta_style_whatsapp", {
                      slug: profile.slug,
                      style: selectedStyleOption.code,
                      lang,
                    })
                  }
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow"
                >
                  {uiCopy.requestInfo}
                </a>
              </div>
            )}
          </section>
        )}
        */}

        {leadOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 px-4 py-6 md:items-center">
            <div className="mt-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:mt-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-800">{uiCopy.leadTitle}</h3>
                  <p className="text-sm text-slate-500">{uiCopy.leadSubtitle}</p>
                </div>
                <button
                  onClick={closeLeadForm}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Cerrar
                </button>
              </div>

              <form
                className="mt-5 grid gap-4 md:grid-cols-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.name} *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.company} *
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder="Distribuidora XYZ"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.country} *
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder="Francia / Perú / USA"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.email} *
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder="tu@empresa.com"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.whatsapp} *
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder="+33 612345678"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {uiCopy.interestLabel} ({uiCopy.optional})
                  <input
                    name="interest"
                    value={form.interest}
                    onChange={handleInputChange}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    placeholder={interestOptions.join(" · ")}
                  />
                </label>

                <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                  <a
                    href={formWaUrl}
                    onClick={() => track("cta_form_whatsapp", { slug: profile.slug, lang })}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow"
                  >
                    {uiCopy.waWithData}
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span>Cinco Sentidos</span>
        </section>
      </div>
    </main>
  );
}
