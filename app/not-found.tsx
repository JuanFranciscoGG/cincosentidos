import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="glass-card w-full max-w-md rounded-3xl p-10 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="text-2xl font-semibold text-slate-900">Perfil no encontrado</h1>
        <p className="mt-3 text-sm text-slate-600">
          El enlace que abriste no coincide con ningún perfil público.
        </p>
        <Link
          href="/bodega"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Ver perfil principal
        </Link>
      </div>
    </main>
  );
}
