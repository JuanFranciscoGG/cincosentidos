export type Lang = "es" | "en";

type Translated<T = string> = Record<Lang, T>;

export type Wine = {
  id: string;
  name: string;
  subtitle?: Translated;
  note: Translated;
  techSheetMessage?: Translated;
  imageUrl?: string;
};

export type StyleOption = {
  code: "fresh" | "bold" | "elegant";
  label: Translated;
  summary: Translated;
  suggestedWines: Translated;
  waMessage?: Translated;
};

export type Profile = {
  slug: string;
  displayName: string;
  contactName?: string;
  logoUrl?: string;
  role: Translated;
  company: string;
  location?: string;
  email: string;
  whatsappE164: string;
  catalogUrl: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  languages: Lang[];
  defaultLang: Lang;
  heroLine: Translated;
  about: Translated;
  whatsappPrefill?: Translated;
  wines: Wine[];
  styleOptions?: StyleOption[];
};

export const profiles: Profile[] = [
  {
    slug: "bodega",
    displayName: "Bodega Cinco Sentidos",
    contactName: "Manuel Valdez",
    logoUrl: "/logo.png",
    role: {
      es: "",
      en: "",
    },
    company: "Bodega Cinco Sentidos",
    location: "Maipú - Mendoza - Argentina",
    email: "manuelvaldez@cinco-sentidos.com.ar",
    whatsappE164: "+5492614547184",
    catalogUrl: "https://cincosentidos.ar",
    website: "https://cinco-sentidos.com.ar/",
    instagram: "https://instagram.com/cincosentidoswines",
    
    languages: ["es", "en"],
    defaultLang: "es",
    heroLine: {
      es: "Presentes en Wine Paris · degustá nuestra selección.",
      en: "Showing at Wine Paris · taste our premium selection.",
    },
    about: {
      es: "Cinco Sentidos es una bodega boutique familiar de Mendoza dedicada a elaborar vinos de alta calidad con identidad propia. Trabajamos con foco en el detalle, desde el viñedo hasta la botella, priorizando consistencia y carácter.",
      en: "Cinco Sentidos is a family-run boutique winery from Mendoza dedicated to crafting high-quality wines with a strong identity. We focus on detail from vineyard to bottle, prioritizing consistency and character.",
    },
    whatsappPrefill: {
      es: "Hola, soy ___ (Nombre/Empresa). Te conocí en Wine Paris y me interesa conocer más sobre sus vinos.",
      en: "Hi, I'm ___ (Name/Company). I met you at Wine Paris and I'd like to know more about your wines.",
    },
    wines: [
      {
        id: "malbec-reserva",
        name: "Reserva Malbec",
        subtitle: {
          es: "12 meses en barrica",
          en: "12 months in barrel",
        },
        note: {
          es: "Vino de intenso color rojo granate con reflejos púrpura, que ofrece aromas de ciruelas y cerezas con notas de vainilla y cuero de su paso por barrica, y una boca suave, untuosa y delicada con un sutil dejo de caramelo.",
          en: "Deep garnet-red Malbec with purple highlights, offering aromas of plums and cherries with vanilla and leather notes from barrel aging, and a smooth, unctuous, delicate palate with a subtle caramel finish.",
        },
        imageUrl: "/wines/reserva-malbec.jpg",
        techSheetUrl: "https://cinco-sentidos.com.ar/wp-content/uploads/2021/11/malbec.pdf",
        techSheetMessage: {
          es: "Hola, ¿me compartís la ficha técnica del Malbec Reserva 2021?",
          en: "Hi, could you share the tech sheet for Malbec Reserva 2021?",
        },
      },
      {
        id: "blend-andino",
        name: "Special Blend Malbec-Ancellotta",
        subtitle: {
          es: "50% Malbec / 50% Ancellota · 12 meses en barrica",
          en: "50% Malbec / 50% Ancellota · 12 months in barrel",
        },
        note: {
          es: "Vino rojo rubí intenso, con aromas de frutos rojos, violetas y especias, acompañados por elegantes notas de cuero y chocolate de su crianza en barrica.",
          en: "Deep ruby red wine, with aromas of red fruits, violets and spices, complemented by elegant leather and chocolate notes from its barrel aging.",
        },
        imageUrl: "/wines/sba.jpg",
        techSheetUrl: "https://cinco-sentidos.com.ar/wp-content/uploads/2021/10/special-blend-malbec-ancellota.pdf",
        techSheetMessage: {
          es: "Hola, quiero la ficha técnica del Blend Andino 2020.",
          en: "Hi, I'd like the tech sheet for the Andean Blend 2020.",
        },
      },
      {
        id: "espumante-brut-nature",
        name: "Gran Reserva",
        subtitle: {
          es: "24 meses de barrica",
          en: "24 months in barrel",
        },
        note: {
          es: "Blend 60% Malbec, 25% Cabernet Sauvignon y 15% Cabernet Franc, de intenso color rojo carmesí con reflejos púrpura, que ofrece aromas de frambuesas, cerezas, moras y violetas con notas de vainilla y chocolate de su crianza en barrica, y una boca intensa con taninos redondos y final muy largo.",
          en: "Blend 60% Malbec, 25% Cabernet Sauvignon and 15% Cabernet Franc, deep crimson red with purple highlights, offering aromas of raspberries, cherries, blackberries and violets with vanilla and chocolate notes from barrel aging, and an intense palate with round tannins and a very long finish.",
        },
        imageUrl: "/wines/gr.jpg",
        techSheetUrl: "https://cinco-sentidos.com.ar/wp-content/uploads/2021/10/gran-reserva-1.pdf",
        techSheetMessage: {
          es: "¿Me enviás la ficha del Brut Nature MT?",
          en: "Can you send me the tech sheet for the Brut Nature MT?",
        },
      },
    ],
    styleOptions: [
      {
        code: "fresh",
        label: { es: "Fresco", en: "Fresh" },
        summary: {
          es: "Perfumes cítricos y tensión. Perfecto para aperitivo.",
          en: "Citrus lift and tension. Perfect as an aperitif.",
        },
        suggestedWines: {
          es: "Brut Nature MT · Rosé de Malbec",
          en: "Brut Nature MT · Malbec Rosé",
        },
        waMessage: {
          es: "Hola, me gustó el estilo Fresco. ¿Me recomendás opciones y fichas?",
          en: "Hi, I loved the Fresh style. Could you share options and tech sheets?",
        },
      },
      {
        code: "bold",
        label: { es: "Intenso", en: "Bold" },
        summary: {
          es: "Capa profunda, especias frías y tanino firme.",
          en: "Deep color, cool-climate spice, firm tannin.",
        },
        suggestedWines: {
          es: "Blend Andino 2020 · Malbec Reserva 2021",
          en: "Andean Blend 2020 · Malbec Reserva 2021",
        },
        waMessage: {
          es: "Hola, quiero más info del estilo Intenso (Blend Andino / Malbec Reserva).",
          en: "Hi, I'd like more info on the Bold style (Andean Blend / Malbec Reserva).",
        },
      },
      {
        code: "elegant",
        label: { es: "Elegante", en: "Elegant" },
        summary: {
          es: "Textura sedosa, final largo y salino.",
          en: "Silky texture with a long, saline finish.",
        },
        suggestedWines: {
          es: "Malbec Reserva 2021 · Chardonnay de Altura",
          en: "Malbec Reserva 2021 · High-Altitude Chardonnay",
        },
        waMessage: {
          es: "Hola, busco etiquetas Elegantes. ¿Me compartís fichas y disponibilidad?",
          en: "Hi, I'm looking for Elegant labels. Could you share sheets and availability?",
        },
      },
    ],
  },
  {
    slug: "juan",
    displayName: "Juan Francisco Giugno",
    role: {
      es: "Director Comercial",
      en: "Commercial Director",
    },
    company: "Bodega Cinco Sentidos",
    location: "Wine Paris · Paris, FR",
    email: "juan@cincosentidos.ar",
    whatsappE164: "+5492610000000",
    catalogUrl: "https://cincosentidos.ar/portfolio-juan.pdf",
    website: "https://cincosentidos.ar",
    instagram: "https://instagram.com/juanf.cinco",
    linkedin: "https://www.linkedin.com/in/juanfranciscogiugno",
    languages: ["es", "en"],
    defaultLang: "es",
    heroLine: {
      es: "Conectemos en Wine Paris · importadores, distribuidores y prensa.",
      en: "Let’s connect at Wine Paris · importers, distributors and press.",
    },
    about: {
      es: "Gestiono exportaciones y alianzas para Cinco Sentidos. Respondo rápido por WhatsApp o email.",
      en: "I lead exports and partnerships for Cinco Sentidos. I reply quickly on WhatsApp or email.",
    },
    whatsappPrefill: {
      es: "Hola, soy ___ (Nombre/Empresa). Te conocí en Wine Paris y quiero sumar sus vinos al portfolio.",
      en: "Hi, I'm ___ (Name/Company). Met you at Wine Paris and want to add your wines to our portfolio.",
    },
    wines: [
      {
        id: "malbec-reserva",
        name: "Malbec Reserva 2021",
        note: {
          es: "Parcelas de altura · crianza 14 meses · perfil floral y preciso.",
          en: "High-elevation plots · 14 months barrel · floral and precise.",
        },
      },
      {
        id: "cabfranc",
        name: "Cabernet Franc de Altura",
        note: {
          es: "Hierbas andinas, grafito y boca jugosa.",
          en: "Andean herbs, graphite and juicy palate.",
        },
      },
      {
        id: "espumante",
        name: "Brut Nature Método Tradicional",
        note: {
          es: "36 meses sobre lías · burbuja fina · final salino.",
          en: "36 months on lees · fine bubble · saline finish.",
        },
      },
    ],
    styleOptions: [
      {
        code: "fresh",
        label: { es: "Fresco", en: "Fresh" },
        summary: {
          es: "Mineral, vibrante y preciso.",
          en: "Mineral, vibrant, precise.",
        },
        suggestedWines: {
          es: "Brut Nature · Chardonnay de Altura",
          en: "Brut Nature · High-Altitude Chardonnay",
        },
      },
      {
        code: "bold",
        label: { es: "Intenso", en: "Bold" },
        summary: {
          es: "Estructura, fruta negra y especias.",
          en: "Structure, dark fruit, spice.",
        },
        suggestedWines: {
          es: "Malbec Reserva · Blend Andino",
          en: "Malbec Reserva · Andean Blend",
        },
      },
      {
        code: "elegant",
        label: { es: "Elegante", en: "Elegant" },
        summary: {
          es: "Textura fina, final largo.",
          en: "Fine texture, long finish.",
        },
        suggestedWines: {
          es: "Cabernet Franc · Pinot Noir",
          en: "Cabernet Franc · Pinot Noir",
        },
      },
    ],
  },
];
