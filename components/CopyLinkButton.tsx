"use client";

import { useState } from "react";
import { useEffect } from "react";

type Props = {
  slug: string;
  label?: string;
  copiedLabel?: string;
};

export function CopyLinkButton({
  slug,
  label = "Copiar link",
  copiedLabel = "Link copiado",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [href, setHref] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHref(`${window.location.origin}/${slug}`);
    }
  }, [slug]);

  async function handleCopy() {
    const valueToCopy = href || `/${slug}`;
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("No se pudo copiar el link", error);
    }
  }

  const disabled = !href;

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
