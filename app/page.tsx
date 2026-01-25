import Link from "next/link";
import { allProfiles } from "@/lib/profiles";

export default function Home() {
  const samples = allProfiles;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="glass-card w-full max-w-5xl rounded-3xl p-10 md:p-14">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Tarjeta Digital · Cinco Sentidos
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
          Perfiles activos
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Copiá el URL de tu usuario a tu NTAG y carga la página web.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Cómo funciona</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>1. Editá o duplicá perfiles en <code>data/profiles.ts</code>.</li>
              <li>2. Accedé por /{`{slug}`} (ej: /bodega o /juan).</li>
              <li>3. Grabá el slug en tu QR/NFC.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm md:col-span-2">
            <p className="text-sm font-semibold text-slate-700">Perfiles de muestra</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {samples.map((profile) => (
                <Link
                  key={profile.slug}
                  href={`/${profile.slug}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition hover:-translate-y-0.5 hover:shadow"
                >
                  <div>
                    <p className="font-semibold">{profile.displayName}</p>
                    <p className="text-sm text-slate-600">
                      {profile.contactName ?? profile.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">/{profile.slug}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
