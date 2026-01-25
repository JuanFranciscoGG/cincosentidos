## Tarjeta Digital · Cinco Sentidos (Next.js + TS + Tailwind v4)

Página web responsive para abrir desde tarjeta NFC / QR en ferias (Wine Paris). En 5 segundos permite: WhatsApp con mensaje prellenado, ver catálogo, guardar contacto (.vcf) y dejar datos.

### Correr en local
1. Instalar dependencias: `npm install`
2. Levantar dev server: `npm run dev`
3. Abrir `http://localhost:3000`

### Perfiles
- Fuente de datos: `data/profiles.ts` (tipado con TypeScript).
- Cada entrada tiene `slug`, textos ES/EN, links (catálogo, web, redes), vinos destacados y opciones de estilo.
- Slugs publicados via ruta dinámica `/[slug]` (ej: `/bodega`, `/juan`). Slug inexistente → 404 amable con link a `/bodega`.

### CTA principales (parte superior)
- **WhatsApp ahora**: `wa.me` con mensaje inteligente según idioma.
- **Catálogo / Portfolio**: URL configurable.
- **Guardar contacto**: descarga `.vcf` desde `/api/vcard/[slug]`.
- **Dejarme tus datos**: despliega formulario; envía a `/api/leads` y permite abrir WhatsApp con los datos cargados.

### i18n
- Idiomas soportados: ES | EN (selector arriba a la derecha).
- Copys base en `app/[slug]/ProfileClient.tsx` (`ui` object).
- Recuerda idioma en `localStorage` (`cs-lang`).

### Leads
- Endpoint serverless: `app/api/leads/route.ts` (guarda en `/tmp/leads-log.jsonl` y opcional webhook `LEADS_WEBHOOK_URL`).
- Validación básica y mensajes de éxito/error.

### Analítica
- Preparado para Google Analytics: define `NEXT_PUBLIC_GA_ID`.
- Eventos en CTAs y formulario vía `lib/analytics.ts`.

### Estilo / UI
- Fuentes: Playfair Display (titulares) + Manrope (texto).
- Diseño premium, 1 columna en móvil, botones grandes, bloque “Elegí tu estilo”.
- Botón “Copiar email” y enlaces a redes (IG, LinkedIn, web).

### Agregar perfiles
1) Duplica un objeto en `data/profiles.ts`.
2) Ajusta `slug`, textos, links y vinos.
3) Deploy/restart y listo (SSG).

### Agregar idiomas
1) Extiende `Lang` en `data/profiles.ts` y agrega textos por idioma.
2) Añade copys en el objeto `ui` de `app/[slug]/ProfileClient.tsx`.
3) Usa el nuevo código de idioma en `languages` / `defaultLang` de cada perfil.

### Deploy
- Vercel/Netlify funciona out‑of‑the‑box.
- Variables recomendadas: `NEXT_PUBLIC_GA_ID`, `LEADS_WEBHOOK_URL`.
- Ruta pública final: `https://tu-dominio.com/{slug}` → usar en QR/NFC.

### QR / NFC
- Para NTAG216 grabar una URL tipo `https://tu-dominio.com/bodega` o `https://tu-dominio.com/juan`.
- QR: generar con ese mismo enlace (cualquier generador).

