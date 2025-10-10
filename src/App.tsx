import React, { useEffect } from "react";

// =============================================
// Landing page bilingüe (EN/ES) con Tailwind CSS
// - EN como idioma predeterminado
// - Bullets del hero: solo idioma activo (según el switch EN/ES)
// - Anclas neutrales (#services, #process, #pricing, #contact)
// - A11y/SEO: <main role="main"> + skip link + <html lang>
// - Precios: SOLO pilotos de 3 meses (Drafting y Structural)
// - Toolset incluye SketchUp + Enscape/Lumion
// - Comentarios en línea
// - Autopruebas ligeras para detectar errores de i18n/truncados
// =============================================

/**
 * Autopruebas simples que corren al montar el componente (modo dev).
 * Validan que el objeto `translations` esté completo y coherente.
 * Si algo falla, se muestra en consola pero no rompe la UI.
 */
function runSelfTests() {
  try {
    const langs: Array<"en" | "es"> = ["en", "es"];
    langs.forEach((lc) => {
      const t = translations[lc];
      if (!t) throw new Error(`translations[${lc}] missing`);

      // Claves principales que deben existir
      const requiredTop = [
        "nav",
        "hero",
        "services",
        "process",
        "pricing",
        "antipoach",
        "clients",
        "contact",
        "form",
        "footer",
      ] as const;
      requiredTop.forEach((k) => {
        // @ts-ignore acceso por índice dinámico
        if (!t[k]) throw new Error(`${lc}.${k} missing`);
      });

      // Estructura mínima
      if (!Array.isArray(t.services.cards) || t.services.cards.length !== 3)
        throw new Error(`${lc}.services.cards must have 3 items`);
      if (!Array.isArray(t.process.steps) || t.process.steps.length !== 4)
        throw new Error(`${lc}.process.steps must have 4 items`);
      if (!Array.isArray(t.pricing.plans) || t.pricing.plans.length !== 2)
        throw new Error(`${lc}.pricing.plans must have 2 items (pilot only)`);
    });

    // Checks puntuales para detectar truncados o comillas sin cerrar
    if (translations.es.process.steps[2].title !== "Piloto")
      throw new Error("ES step[2].title should be 'Piloto'");
    if (translations.en.hero.title1 !== "Engineers, drafters and architects,")
      throw new Error("EN hero.title1 must be neutral (no nationality)");

    console.info("[i18n self-test] OK");
  } catch (err) {
    console.error("[i18n self-test] FAILED:", err);
  }
}

export default function App() {
  // Estado del idioma; EN por defecto. Fallback a EN si la clave no existe.
  const [lang, setLang] = useState<"es" | "en">("en");
  const t = React.useMemo(() => translations[lang] ?? translations.en, [lang]);

  // UI: estado de formulario y menú móvil
  const [sent, setSent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // A11y/SEO: sincroniza <html lang="...">
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Ejecuta autopruebas al montar
  useEffect(() => {
    if (typeof window !== "undefined") runSelfTests();
  }, []);

  // Simulación de envío (reemplazar por integración real si se desea)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Skip link para navegación con teclado */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2 shadow"
      >
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      {/* Header con navegación principal y cambio de idioma */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-semibold">RS</div>
            <div className="font-semibold">Remota Sonora</div>
          </div>
          {/* Navegación de escritorio */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-4 text-sm">
            <a href="#services" className="hover:opacity-80">{t.nav.services}</a>
            <a href="#process" className="hover:opacity-80">{t.nav.process}</a>
            <a href="#pricing" className="hover:opacity-80">{t.nav.pricing}</a>
            <a href="#contact" className="px-3 py-1.5 rounded-xl bg-gray-900 text-white">{t.nav.quote}</a>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </nav>
          {/* Menú móvil */}
          <button
            type="button"
            aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Panel del menú móvil */}
        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 grid gap-3">
              <a href="#services" onClick={() => setMobileOpen(false)} className="py-2">{t.nav.services}</a>
              <a href="#process" onClick={() => setMobileOpen(false)} className="py-2">{t.nav.process}</a>
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="py-2">{t.nav.pricing}</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="py-2 px-3 rounded-xl bg-gray-900 text-white w-fit">{t.nav.quote}</a>
              <div className="py-2"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
            </div>
          </div>
        )}
      </header>

      <main id="main" role="main">
        {/* HERO: título, subtítulo, CTAs y bullets del idioma activo */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {t.hero.title1} <span>{t.hero.title2}</span> {t.hero.title3}
              </h1>
              <p className="mt-4 text-lg text-gray-600">{t.hero.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="px-5 py-3 rounded-2xl bg-gray-900 text-white">{t.cta.meet}</a>
                <a href="#services" className="px-5 py-3 rounded-2xl border">{t.cta.learn}</a>
              </div>
              <p className="mt-3 text-sm text-gray-500">{t.hero.footnote}</p>
            </div>

            {/* Bullets (idioma actual solamente) */}
            <div className="p-6 bg-white shadow rounded-2xl">
              <ul className="grid gap-2 text-sm">
                {t.hero.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="h-2.5 w-2.5 bg-gray-900 rounded-full mt-2" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold">{t.services.title}</h2>
            <p className="mt-2 text-gray-600">{t.services.subtitle}</p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {t.services.cards.map((c, i) => (
                <Card key={i} title={c.title}>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {c.items.map((it, j) => (<li key={j}>{it}</li>))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold">{t.process.title}</h2>
            <div className="mt-8 grid md:grid-cols-4 gap-6">
              {t.process.steps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-5">
                  <div className="text-sm text-gray-500">{t.process.step}</div>
                  <div className="font-semibold text-lg">{s.title}</div>
                  <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING (solo pilotos de 3 meses) */}
        <section id="pricing" className="border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold">{t.pricing.title}</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {t.pricing.plans.map((p, i) => (
                <Plan key={i} title={p.title} price={p.price} note={p.note} items={p.items} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">{t.pricing.note}</p>
          </div>
        </section>

        {/* LEGAL / CLIENTS */}
        <section className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold">{t.antipoach.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{t.antipoach.desc}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {t.antipoach.items.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold">{t.clients.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{t.clients.desc}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {t.clients.items.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold">{t.contact.title}</h2>
            <p className="mt-2 text-gray-600">{t.contact.subtitle}</p>
           <form
             action="https://formspree.io/f/xdkwwely"
             method="POST"
             acceptCharset="UTF-8"
             className="..."
             >
              <div className="grid md:grid-cols-2 gap-4">
                <Input label={t.form.name} name="name" required />
                <Input label={t.form.email} name="email" type="email" required />
              </div>
              <Input label={t.form.company} name="company" />
              <Input label={t.form.tools} name="tools" />
              <Textarea label={t.form.message} name="message" required />
             <input type="hidden" name="_subject" value="New contact from Remota Sonora" />
             <input type="text" name="_gotcha" style={{ display: 'none' }} />
              <button type="submit" className="px-5 py-3 rounded-2xl bg-gray-900 text-white">
                {t.form.send}
              </button>
             <div className="text-xs text-gray-500 mt-2">
               {t.contact.alt}{" "}
               <a className="underline" href="mailto:hello@remotasonora.com">
                 hello@remotasonora.com</a>
              </a>
             </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-500 grid md:grid-cols-2 gap-4">
          <div>© {new Date().getFullYear()} Remota Sonora. {t.footer.left}</div>
          <div className="md:text-right">{t.footer.right}</div>
        </div>
      </footer>
    </div>
  );
}

// Selector de idioma compacto (EN a la izquierda, ES a la derecha)
function LanguageSwitcher({ lang, setLang }: { lang: "es" | "en"; setLang: (l: "es" | "en") => void }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border px-1 py-0.5">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-lg ${lang === "en" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`px-2 py-1 rounded-lg ${lang === "es" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
      >
        ES
      </button>
    </div>
  );
}

// Card genérica para listas
const Card = React.memo(function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="font-semibold text-lg">{title}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
});

// Componente para planes de precio
const Plan = React.memo(function Plan({ title, price, note, items }: { title: string; price: string; note?: string; items: string[] }) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="text-sm text-gray-500">Plan</div>
      <div className="font-semibold text-xl">{title}</div>
      <div className="mt-2 text-3xl font-bold">{price}</div>
      {note && <div className="text-xs text-gray-500">{note}</div>}
      <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc pl-5">
        {items.map((it, i) => (<li key={i}>{it}</li>))}
      </ul>
    </div>
  );
});

// Campos de formulario (Input y Textarea)
function Input({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-700">{label}</span>
      <input name={name} type={type} required={required} className="px-3 py-2 rounded-xl border focus:outline-none focus:ring w-full" />
    </label>
  );
}

function Textarea({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-700">{label}</span>
      <textarea name={name} required={required} rows={5} className="px-3 py-2 rounded-xl border focus:outline-none focus:ring w-full" />
    </label>
  );
}

// =====================================================
// i18n: textos en inglés y español (completos y coherentes)
// =====================================================
const translations = {
  en: {
    nav: { services: "Services", process: "Process", pricing: "Pricing", quote: "Get a quote" },
    hero: {
      title1: "Engineers, drafters and architects,",
      title2: "with custom training",
      title3: ", ready for your backlog",
      subtitle:
        "Nearshore solutions for US firms and businesses: structural support, design assistance, drafting, general architecture and landscape design. Monthly USD invoices—no payroll or benefits on your side.",
      footnote: "Role-specific training and software alignment.",
      bullets: [
        "Fast relief for load peaks (submittals, redlines, calc packages).",
        "Toolset: AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp, Lumion/Enscape (per client license).",
        "NDA/PIA, anti-poaching clauses and Zero-Trust access control.",
        "1–2 week onboarding with QA and checklists.",
      ],
    },
    cta: { meet: "Book a call", learn: "Learn more" },
    services: {
      title: "Services",
      subtitle:
        "We serve engineering, general architecture, and also non-technical clients who need design (e.g., landscaping).",
      cards: [
        {
          title: "Drafting / BIM",
          items: [
            "Plan redlines (S, A, MEP)",
            "Constructability details and S-sheets",
            "Basic Revit modeling / agreed LOD",
          ],
        },
        {
          title: "Structural support",
          items: [
            "Support on loads & analysis",
            "Calc packages (Enercalc/hand calcs)",
            "Retaining walls, headers, beams, connections",
          ],
        },
        {
          title: "Architecture & Landscape",
          items: [
            "Architectural drafting and assistance",
            "Garden plans incl. irrigation & lighting criteria",
            "2D layouts/renders for quoting (SketchUp, Enscape/Lumion)",
          ],
        },
      ],
    },
    process: {
      title: "How we work",
      step: "Step",
      steps: [
        {
          title: "Discovery",
          desc: "30–45 min to align scope, software/style and standards. We match your requirements with our team’s experience and tools."
        },
        {
          title: "Onboarding",
          desc: "1–2 weeks: NDA, access setup, playbooks and deliverable checklists. Everything ready for a smooth start."
        },
        {
          title: "Pilot",
          desc: "1–2 weeks: real tests with feedback and adjustments. We validate workflow, quality and communication before scaling."
        },
        {
          title: "Production",
          desc: "Full rate, quality metrics and agreed SLAs. Integration typically flows better from month 2–3."
        },
      ],
    },
    pricing: {
      title: "Pricing – 3-month Pilot",
      note: "*Monthly USD invoicing. 'From' rates—may vary with required software and scope.",
      plans: [
        {
          title: "Drafting – Pilot (3 months)",
          price: "from $18/h",
          note: "QA focus, agreed LOD",
          items: ["Redlines / Details", "Sheets ready for review", "Weekly timesheet & report"],
        },
        {
          title: "Structures – Pilot (3 months)",
          price: "from $25/h",
          note: "Intensive QA, basic calcs",
          items: ["Structural support", "Basic calc packages", "Bi-weekly reviews"],
        },
      ],
    },
    antipoach: {
      title: "Contracts with anti-poaching",
      desc:
        "We protect your team and ours: contracts include non-solicit and no direct-hire of assigned personnel for a defined period.",
      items: [
        "NDA + MSA with anti-poaching",
        "Project SOW with standards & deliverables",
        "Clear IP ownership & confidentiality",
      ],
    },
    clients: {
      title: "Who we serve",
      desc:
        "Beyond engineering firms, we support businesses and independent architects as an embedded team.",
      items: [
        "Structural & architectural engineering firms",
        "General contractors & subcontractors",
        "Landscaping businesses needing garden design",
        "Independent architects: you win the client; we align the workflow and operate as your team",
      ],
    },
    contact: {
      title: "Let’s talk",
      subtitle: "Tell us what you need and book a call.",
      alt: "You can also email us at",
    },
    form: {
      name: "Name",
      email: "Email",
      company: "Company / Business",
      tools: "Software or desired style (AutoCAD, Revit, etc.)",
      message: "What you need",
      send: "Send",
      thanks: "Thanks! We’ll get back within 1 business day.",
    },
    footer: {
      left: "Built in Sonora • Operating from Tucson/HMO.",
      right: "NDA | Anti-poaching | USD invoicing | Data safeguarded",
    },
  },

  es: {
    nav: { services: "Servicios", process: "Proceso", pricing: "Precios", quote: "Cotiza" },
    hero: {
      title1: "Ingenieros, drafters y arquitectos,",
      title2: "con capacitación a la medida",
      title3: ", listos para tu backlog",
      subtitle:
        "Soluciones nearshore para firmas y negocios en EE.UU.: cálculo estructural, apoyo a diseño, drafting, arquitectura en general y diseño de jardines. Facturación mensual en USD, sin nóminas ni seguros para ti.",
      footnote: "Capacitación específica por disciplina y software.",
      bullets: [
        "Relevo rápido en picos de carga (submittals, redlines, calc packages).",
        "Toolset: AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp, Lumion/Enscape (según licencia del cliente).",
        "NDA/PIA, cláusulas antipoaching y control de acceso Zero-Trust.",
        "Onboarding de 1–2 semanas con QA y checklists.",
      ],
    },
    cta: { meet: "Agenda una llamada", learn: "Conoce más" },
    services: {
      title: "Servicios",
      subtitle:
        "Cubrimos ingeniería, arquitectura en general y también clientes no-técnicos que requieren diseño (p. ej., jardinería/landscaping).",
      cards: [
        {
          title: "Drafting / BIM",
          items: [
            "Redlines a planos (S, A, MEP)",
            "Detalles constructivos y hojas S",
            "Modelado básico Revit / LOD acordado",
          ],
        },
        {
          title: "Cálculo estructural",
          items: [
            "Apoyo en cargas y análisis",
            "Memorias (Enercalc/hand calcs)",
            "Muros de contención, headers, beams, conexiones",
          ],
        },
        {
          title: "Arquitectura & Paisaje",
          items: [
            "Drafting y apoyo a arquitectos",
            "Planos de jardín con criterios de riego e iluminación",
            "Renders/layouts 2D para cotización (SketchUp, Enscape/Lumion)",
          ],
        },
      ],
    },
    process: {
      title: "Cómo trabajamos",
      step: "Paso",
      steps: [
        {
          title: "Exploración",
          desc: "30–45 min para entender alcance, software/estilo y estándares. Comparamos tus requerimientos con nuestra experiencia y herramientas."
        },
        {
          title: "Onboarding",
          desc: "1–2 semanas: NDA, accesos, playbooks y checklist de entregables. Todo listo para empezar sin fricción."
        },
        {
          title: "Piloto",
          desc: "1–2 semanas: pruebas reales con feedback y ajustes. Validamos flujo, calidad y comunicación antes de escalar."
        },
        {
          title: "Producción",
          desc: "Tarifa plena, métricas de calidad y SLAs acordados. Normalmente la integración fluye mejor a partir del mes 2–3."
        },
      ],
    },
    pricing: {
      title: "Precios – Piloto 3 meses",
      note: "*Facturación mensual en USD. Tarifas “desde” — pueden variar por software requerido y alcance.",
      plans: [
        {
          title: "Drafting – Piloto (3 meses)",
          price: "desde $18/h",
          note: "Foco en QA, LOD acordado",
          items: ["Redlines / Detalles", "Sheets listos para revisión", "Timesheet y reporte semanal"],
        },
        {
          title: "Estructuras – Piloto (3 meses)",
          price: "desde $25/h",
          note: "QA intensivo, memorias básicas",
          items: ["Apoyo estructural", "Memorias y cálculos básicos", "Revisión quincenal"],
        },
      ],
    },
    antipoach: {
      title: "Contratos con cláusula antipoaching",
      desc:
        "Protegemos tu equipo y el nuestro: los contratos incluyen no-solicitación y no-contratación directa del personal por un plazo definido.",
      items: [
        "NDA + MSA (Master Services Agreement) con antipoaching",
        "SOW por proyecto con estándares y entregables",
        "Propiedad intelectual y confidencialidad claras",
      ],
    },
    clients: {
      title: "Clientes a quienes servimos",
      desc:
        "Además de firmas de ingeniería y arquitectura, apoyamos a negocios y a arquitectos independientes como parte de su equipo.",
      items: [
        "Firmas de ingeniería estructural y arquitectónica",
        "Contratistas generales y subcontratistas",
        "Empresas de jardinería/landscaping que necesitan diseño de jardín",
        "Arquitectos independientes: tú consigues el cliente; acordamos proceso y operamos como tu equipo",
      ],
    },
    contact: {
      title: "¿Hablamos?",
      subtitle: "Cuéntanos qué necesitas y agenda una llamada.",
      alt: "También puedes escribirnos a",
    },
    form: {
      name: "Nombre",
      email: "Email",
      company: "Empresa / Negocio",
      tools: "Software o estilo deseado (AutoCAD, Revit, etc.)",
      message: "Qué necesitas",
      send: "Enviar",
      thanks: "¡Gracias! Te contactamos en 1 día hábil.",
    },
    footer: {
      left: "Hecho en Sonora • Operamos desde Tucson/HMO.",
      right: "NDA | Antipoaching | Facturación en USD | Datos resguardados",
    },
  },
} as const;
