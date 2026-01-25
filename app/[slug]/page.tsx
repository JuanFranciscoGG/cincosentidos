import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProfileBySlug, defaultLang, translate } from "@/lib/profiles";
import { ProfileClient } from "./ProfileClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) {
    return {
      title: "Perfil no encontrado",
      description: "El perfil solicitado no existe.",
    };
  }

  const lang = defaultLang(profile);
  const title = `${profile.displayName} · Cinco Sentidos`;
  const description =
    translate(profile.heroLine, lang) ??
    `Contacto directo de ${profile.displayName} (${profile.company}).`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${profile.slug}`,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) {
    notFound();
  }

  return <ProfileClient profile={profile} />;
}
