import {
  useState,
  useEffect,
  useMemo,
  memo,
  type ReactNode
} from "react";

// =============================================
// Landing page bilingüe (EN/ES) con Tailwind CSS
// =============================================

function runSelfTests() {
  try {
    const langs: Array<"en" | "es"> = ["en", "es"];
    langs.forEach((lc) => {
      const t = translations[lc];
      if (!t) throw new Error(`translations[${lc}] missing`);
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
        // @ts-ignore
        if (!t[k]) throw new Error(`${lc}.${k} missing`);
      });
      if (!Array.isArray(t.services.cards) || t.services.cards.length !== 3)
        throw new Error(`${lc}.services.cards must have 3 items`);
      if (!Array.isArray(t.process.steps) || t.process.steps.length !== 4)
        throw new Error(`${lc}.process.steps must have 4 items`);
      if (!Array.isArray(t.pricing.plans) || t.pricing.plans.length !== 2)
        throw new Error(`${lc}.pricing.plans must have 2 items (pilot only)`);
    });
    // Permitir "Piloto (hasta 3 meses)"
    if (!translations.es.process.steps[2].title.toLowerCase().includes("piloto"))
      throw new Error("ES step[2].title should include 'Piloto'");
    if (translations.en.hero.title1 !== "Engineers, drafters and architects,")
      throw new Error("EN hero.title1 must be neutral (no nationality)");
    console.info("[i18n self-test] OK");
  } catch (err) {
    console.error("[i18n self-test] FAILED:", err);
  }
}

export default function App() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const t = useMemo(() => translations[lang] ?? translations.en, [lang]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") runSelfTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2 shadow"
      >
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-semibold">RS</div>
            <div className="font-semibold">Remota Sonora</div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-4 text-sm">
            <a href="#services" className="hover:opacity-80">{t.nav.services}</a>
            <a href="#process" className="hover:opacity-80">{t.nav.process}</a>
            <a href="#pricing" className="hover:opacity-80">{t.nav.pricing}</a>
            <a href="#contact" className="px-3 py-1.5 rounded-xl bg-gray-900 text-white">{t.nav.quote}</a>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </nav>
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
        {/* HERO */}
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

        {/* PRICING */}
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
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const res = await fetch(form.action, {
                  method: form.method,
                  body: data,
                  headers: { Accept: "application/json" },
                });
                if (res.ok) {
                  form.reset();
                  const thank = document.getElementById("thankMessage");
                  if (thank) thank.classList.remove("hidden");
                }
              }}
              action="https://formspree.io/f/xqayypvw"
              method="POST"
              acceptCharset="UTF-8"
              className="mt-8"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder={t.form.name} required className="w-full border p-2 rounded" />
                <input type="email" name="email" placeholder={t.form.email} required className="w-full border p-2 rounded" />
              </div>

              <input type="text" name="company" placeholder={t.form.company} className="w-full border p-2 rounded mt-4" />
              <input type="text" name="tools" placeholder={t.form.tools} className="w-full border p-2 rounded mt-4" />

              <textarea name="message" placeholder={t.form.message} required className="w-full border p-2 rounded h-28 mt-4"></textarea>

              <input type="hidden" name="_subject" value="New contact from Remota Sonora" />
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <button type="submit" className="px-5 py-3 rounded-2xl bg-gray-900 text-white mt-4 w-full md:w-auto">
                {t.form.send}
              </button>

              <div id="thankMessage" className="hidden mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center">
                {t.form.thanks}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                {t.contact.alt}{" "}
                <a className="underline" href="mailto:hello@remotasonora.com">hello@remotasonora.com</a>
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

function LanguageSwitcher({
  lang,
  setLang
}: {
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
}) {
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

const Card = memo(function Card({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="font-semibold text-lg">{title}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
});

const Plan = memo(function Plan({
  title,
  price,
  note,
  items
}: {
  title: string;
  price: string;
  note?: string;
  items: string[];
}) {
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

// =====================================================
// i18n
// =====================================================
const translations = {
  en: {
    nav: { services: "Services", process: "Process", pricing: "Pricing", quote: "Get a quote" },
    hero: {
      title1: "Engineers, drafters and architects,",
      title2: "with custom training",
      title3: ", ready for your backlog",
      subtitle:
        "Nearshore solutions for US firms and businesses: structural support, design assistance, drafting, general architecture and landscape design. Monthly United States dollar (USD) invoices—no payroll or benefits on your side.",
      footnote: "Role-specific training and software alignment.",
      bullets: [
        "Fast relief for load peaks (submittals, redlines, calculation packages).",
        "Toolset: AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp, Lumion/Enscape (per client license).",
        "Non-Disclosure Agreement (NDA) / Proprietary Information Agreement (PIA), anti-poaching clauses, and Zero-Trust access control.",
        "1–3 week kickoff process with quality assurance (QA) and checklists.",
      ],
    },
    cta: { meet: "Book a call", learn: "Learn more" },
    services: {
      title: "Services",
      subtitle:
        "We serve engineering, general architecture, and also non-technical clients who need design drafting (for example, landscaping).",
      cards: [
        {
          title: "Drafting / Building Information Modeling (BIM)",
          items: [
            "Plan redlines (Structural, Architectural, Mechanical, Electrical, and Plumbing (MEP))",
            "Detail drafting (construction details)",
            "Revit modeling / agreed Level of Detail",
          ],
        },
        {
          title: "Structural support",
          items: [
            "Support on gravity and lateral analysis",
            "Calculation packages (Enercalc / hand calculations)",
            "Retaining walls, headers, beams, connections",
          ],
        },
        {
          title: "Architecture & Landscape",
          items: [
            "Architectural drafting and assistance",
            "Garden plans including irrigation and lighting criteria",
            "Two‑dimensional layouts/renders for quoting (SketchUp, Enscape/Lumion)",
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
          desc: "30–45 minute meeting with client to align scope, software/style and standards."
        },
        {
          title: "Kickoff / initial setup",
          desc: "1–3 weeks: Non-Disclosure Agreement (NDA) settled, access setup, playbooks and job checklists."
        },
        {
          title: "Pilot (up to 3 months)",
          desc: "Real work initiation with feedback and adjustments. We validate workflow, quality, and communication before scaling. Special pricing applies only during this stage; subsequent Production runs at full rates."
        },
        {
          title: "Production",
          desc: "Operating at full rate with agreed Service Level Agreements (SLAs) and monthly invoicing; integration typically flows better from months 2–3."
        },
      ],
    },
    pricing: {
      title: "Pricing – Pilot (up to 3 months)",
      note: "*Monthly United States dollar (USD) invoicing. 'From' rates—may vary with required software and scope.",
      plans: [
        {
          title: "Drafting – Pilot (up to 3 months)",
          price: "from $18/h",
          items: [
            "Redlines / Details",
            "Sheets ready for review",
            "Daily timesheet tracking, weekly report to client",
            "Progress reviews as needed",
          ],
        },
        {
          title: "Engineering – Pilot (up to 3 months)",
          price: "from $25/h",
          items: [
            "Structural support",
            "Calculation packages",
            "Daily timesheet tracking, weekly report to client",
            "Progress reviews as needed",
          ],
        },
      ],
    },
    antipoach: {
      title: "Contracts with anti-poaching",
      desc:
        "We protect your team and ours with non-solicit and no direct-hire clauses, plus clear IP and confidentiality terms.",
      items: [
        "NDA (Non-Disclosure Agreement): confidentiality of shared information",
        "MSA (Master Services Agreement): overarching commercial and legal terms",
        "SOW (Statement of Work): scope, standards and deliverables per project",
      ],
    },
    clients: {
      title: "Who we serve",
      desc:
        "Beyond engineering firms, we support businesses and independent architects.",
      items: [
        "Structural & architectural engineering firms",
        "General contractors & subcontractors",
        "Landscaping businesses",
        "Independent architects: you win the client; we align the workflow",
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
      tools: "Software or desired style (AutoCAD, Revit, and others)",
      message: "What you need",
      send: "Send",
      thanks: "Thanks! We’ll get back within 1 business day.",
    },
    footer: {
      left: "Built in Sonora • Operating from Tucson and Hermosillo.",
      right: "Non-Disclosure Agreements (NDAs) | Anti-poaching clauses | United States dollar (USD) invoicing | Data safeguarded",
    },
  },

  es: {
    nav: { services: "Servicios", process: "Proceso", pricing: "Precios", quote: "Cotiza" },
    hero: {
      title1: "Ingenieros, drafters y arquitectos,",
      title2: "con capacitación a la medida",
      title3: ", listos para tu backlog",
      subtitle:
        "Soluciones nearshore para firmas y negocios en EE.UU.: cálculo estructural, apoyo a diseño, drafting, arquitectura en general y diseño de jardines. Facturación mensual en dólares estadounidenses (USD), sin nóminas ni seguros para ti.",
      footnote: "Capacitación específica por disciplina y software.",
      bullets: [
        "Relevo rápido en picos de carga (entregables, correcciones/redlines y paquetes de cálculo).",
        "Toolset: AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp, Lumion/Enscape (según licencia del cliente).",
        "Acuerdo de Confidencialidad (NDA) / Acuerdo de Información Propietaria (PIA), cláusulas de no captación de personal (anti‑poaching) y control de acceso Zero‑Trust.",
        "Kickoff de 1–3 semanas con control de calidad (QA) y listas de verificación.",
      ],
    },
    cta: { meet: "Agenda una llamada", learn: "Conoce más" },
    services: {
      title: "Servicios",
      subtitle:
        "Cubrimos ingeniería, arquitectura en general y también clientes no técnicos que requieren dibujo técnico de diseño (por ejemplo, paisajismo).",
      cards: [
        {
          title: "Drafting / Modelado de Información de la Construcción (BIM)",
          items: [
            "Correcciones (redlines) a planos (Estructural, Arquitectónico, Instalaciones Mecánicas, Eléctricas y de Plomería (MEP))",
            "Dibujo de detalles constructivos",
            "Modelado en Revit / nivel de detalle acordado",
          ],
        },
        {
          title: "Apoyo estructural",
          items: [
            "Análisis por cargas gravitacionales y laterales",
            "Paquetes de cálculo (Enercalc / cálculos a mano)",
            "Muros de contención, dinteles, vigas y conexiones",
          ],
        },
        {
          title: "Arquitectura & Paisaje",
          items: [
            "Drafting y asistencia arquitectónica",
            "Planos de jardín incluyendo criterios de riego e iluminación",
            "Planos y renders bidimensionales para cotización (SketchUp, Enscape/Lumion)",
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
          desc: "Reunión de 30–45 minutos con el cliente para alinear alcance, software/estilo y estándares."
        },
        {
          title: "Kickoff / configuración inicial",
          desc: "1–3 semanas: Acuerdo de Confidencialidad (NDA) firmado, accesos, playbooks y listas de verificación de trabajo."
        },
        {
          title: "Piloto (hasta 3 meses)",
          desc: "Inicio de trabajo real con retroalimentación y ajustes. Validamos flujo, calidad y comunicación antes de escalar. El precio especial aplica únicamente durante esta etapa; la siguiente etapa (Producción) se factura a tarifa completa."
        },
        {
          title: "Producción",
          desc: "Operación normal con Acuerdos de Nivel de Servicio (SLAs) acordados y facturación mensual; la integración fluye mejor a partir de los meses 2–3."
        },
      ],
    },
    pricing: {
      title: "Precios – Piloto (hasta 3 meses)",
      note: "*Facturación mensual en dólares estadounidenses (USD). Tarifas “desde” — pueden variar por software requerido y alcance.",
      plans: [
        {
          title: "Drafting – Piloto (hasta 3 meses)",
          price: "desde $18/h",
          items: [
            "Redlines / Detalles",
            "Planos listos para revisión",
            "Seguimiento diario de horas y reporte semanal al cliente",
            "Revisiones de avance según se necesite",
          ],
        },
        {
          title: "Ingeniería – Piloto (hasta 3 meses)",
          price: "desde $25/h",
          items: [
            "Apoyo estructural",
            "Paquetes de cálculo",
            "Seguimiento diario de horas y reporte semanal al cliente",
            "Revisiones de avance según se necesite",
          ],
        },
      ],
    },
    antipoach: {
      title: "Contratos con cláusula antipoaching",
      desc:
        "Protegemos tu equipo y el nuestro con no-solicitación y no contratación directa, además de propiedad intelectual y confidencialidad claras.",
      items: [
        "NDA (Non-Disclosure Agreement): confidencialidad de la información compartida",
        "MSA (Master Services Agreement): términos comerciales y legales generales",
        "SOW (Statement of Work): alcance, estándares y entregables por proyecto",
      ],
    },
    clients: {
      title: "Clientes a quienes servimos",
      desc:
        "Además de firmas de ingeniería y arquitectura, apoyamos a negocios y a arquitectos independientes.",
      items: [
        "Firmas de ingeniería estructural y arquitectónica",
        "Contratistas generales y subcontratistas",
        "Empresas de paisajismo",
        "Arquitectos independientes: tú consigues al cliente; alineamos el flujo",
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
      tools: "Software o estilo deseado (AutoCAD, Revit y entre otros)",
      message: "Qué necesitas",
      send: "Enviar",
      thanks: "¡Gracias! Te contactamos en 1 día hábil.",
    },
    footer: {
      left: "Hecho en Sonora • Operamos desde Tucson y Hermosillo.",
      right: "Acuerdos de Confidencialidad (NDA) | Cláusulas de no captación de personal | Facturación en dólares estadounidenses (USD) | Datos resguardados",
    },
  },
} as const;
