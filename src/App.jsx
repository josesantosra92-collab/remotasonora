import { useState, useEffect, useMemo, memo } from "react";

// =============================================
// Landing page bilingüe (EN/ES) - Bold & Contemporary Design
// =============================================

function runSelfTests() {
  try {
    const langs = ["en", "es"];
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
      ];
      requiredTop.forEach((k) => {
        if (!t[k]) throw new Error(`${lc}.${k} missing`);
      });
      if (!Array.isArray(t.services.cards) || t.services.cards.length !== 3)
        throw new Error(`${lc}.services.cards must have 3 items`);
      if (!Array.isArray(t.process.steps) || t.process.steps.length !== 4)
        throw new Error(`${lc}.process.steps must have 4 items`);
      if (!Array.isArray(t.pricing.plans) || t.pricing.plans.length !== 2)
        throw new Error(`${lc}.pricing.plans must have 2 items (pilot only)`);
    });
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
  const [lang, setLang] = useState("en");
  const t = useMemo(() => translations[lang] ?? translations.en, [lang]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") runSelfTests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Skip link */}
      <a
        href__="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 border rounded-xl px-4 py-2 shadow-xl z-50"
      >
        {lang === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-slate-950/90 border-b border-slate-700/40 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-700 via-blue-600 to-cyan-600 flex items-center justify-center font-black text-white shadow-2xl shadow-blue-500/60 ring-2 ring-blue-400/20">
              RS
            </div>
            <div className="font-black text-xl bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              Remota Sonora
            </div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href__="#services" className="text-slate-300 hover:text-blue-400 transition-colors">{t.nav.services}</a>
            <a href__="#process" className="text-slate-300 hover:text-blue-400 transition-colors">{t.nav.process}</a>
            <a href__="#pricing" className="text-slate-300 hover:text-blue-400 transition-colors">{t.nav.pricing}</a>
            <a href__="#contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60 ring-2 ring-blue-400/20">
              {t.nav.quote}
            </a>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </nav>
          <button
            type="button"
            aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl border border-slate-600/50 text-blue-400 hover:bg-slate-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-slate-700/30 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 py-4 grid gap-3">
              <a href__="#services" onClick={() => setMobileOpen(false)} className="py-2 text-slate-300 hover:text-blue-400 transition-colors">{t.nav.services}</a>
              <a href__="#process" onClick={() => setMobileOpen(false)} className="py-2 text-slate-300 hover:text-blue-400 transition-colors">{t.nav.process}</a>
              <a href__="#pricing" onClick={() => setMobileOpen(false)} className="py-2 text-slate-300 hover:text-blue-400 transition-colors">{t.nav.pricing}</a>
              <a href__="#contact" onClick={() => setMobileOpen(false)} className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-center">{t.nav.quote}</a>
              <div className="py-2"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
            </div>
          </div>
        )}
      </header>

      <main id="main" role="main">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-950 to-blue-900/40"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-700/10 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t.hero.title1}{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {t.hero.title2}
                </span>
                {" "}{t.hero.title3}
              </h1>
              <p className="mt-8 text-lg md:text-xl text-slate-300 leading-relaxed font-light">{t.hero.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href__="#contact" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/70 ring-2 ring-blue-400/20 hover:ring-blue-400/40">
                  {t.cta.meet}
                </a>
                <a href__="#services" className="px-8 py-4 rounded-2xl border-2 border-slate-600/60 text-slate-200 hover:bg-slate-800/50 backdrop-blur-sm font-bold transition-all hover:border-slate-500 hover:shadow-lg hover:shadow-slate-700/50">
                  {t.cta.learn}
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-400">{t.hero.footnote}</p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative p-10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl shadow-2xl ring-1 ring-white/5">
                <ul className="grid gap-5">
                  {t.hero.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-4 p-3 rounded-xl">
                      <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/50 ring-2 ring-blue-400/20">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-slate-200 leading-relaxed font-light">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative border-t border-slate-700/40 bg-gradient-to-b from-slate-950 to-slate-900 shadow-inner shadow-black/50">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                {t.services.title}
              </h2>
              <p className="mt-6 text-xl text-slate-300 font-light leading-relaxed">{t.services.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.services.cards.map((c, i) => {
                const gradients = [
                  "from-blue-600 to-cyan-600",
                  "from-slate-600 to-blue-600",
                  "from-cyan-600 to-teal-600"
                ];
                return (
                  <ServiceCard key={i} title={c.title} gradient={gradients[i]}>
                    <ul className="space-y-3 text-slate-300">
                      {c.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-2 flex-shrink-0"></span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </ServiceCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="relative border-t border-slate-700/40 bg-slate-950 shadow-inner shadow-black/50">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                {t.process.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {t.process.steps.map((s, i) => {
                const colors = [
                  "from-blue-600 to-cyan-600",
                  "from-slate-600 to-blue-600",
                  "from-cyan-600 to-teal-600",
                  "from-blue-700 to-slate-600"
                ];
                return (
                  <div key={i} className="relative">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${colors[i]} opacity-20 rounded-3xl blur-xl`}></div>
                    <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl p-7 border border-slate-700/60 h-full shadow-xl backdrop-blur-xl ring-1 ring-white/5`}>
                      <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${colors[i]} text-white text-xs font-bold mb-4 shadow-xl ring-2 ring-white/10`}>
                        {t.process.step} {i + 1}
                      </div>
                      <div className="font-black text-xl text-white mb-4 tracking-tight">{s.title}</div>
                      <p className="text-slate-300 text-sm leading-relaxed font-light">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="relative border-t border-slate-700/40 bg-gradient-to-b from-slate-900 to-slate-950 shadow-inner shadow-black/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.12),transparent_60%)]"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                {t.pricing.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {t.pricing.plans.map((p, i) => (
                <PricingPlan key={i} title={p.title} price={p.price} note={p.note} items={p.items} featured={i === 1} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400">{t.pricing.note}</p>
          </div>
        </section>

        {/* LEGAL / CLIENTS */}
        <section className="relative border-t border-slate-700/40 bg-slate-950 shadow-inner shadow-black/50">
          <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-10">
            <InfoCard 
              title={t.antipoach.title} 
              desc={t.antipoach.desc} 
              items={t.antipoach.items}
              gradient="from-blue-600 to-cyan-600"
            />
            <InfoCard 
              title={t.clients.title} 
              desc={t.clients.desc} 
              items={t.clients.items}
              gradient="from-slate-600 to-blue-600"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative border-t border-slate-700/40 bg-gradient-to-b from-slate-950 to-slate-900 shadow-inner shadow-black/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.15),transparent_60%)]"></div>
          <div className="relative max-w-3xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                {t.contact.title}
              </h2>
              <p className="mt-6 text-xl text-slate-300 font-light">{t.contact.subtitle}</p>
            </div>

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
              className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-10 shadow-2xl ring-1 ring-white/5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name" 
                  placeholder={t.form.name} 
                  required 
                  className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder={t.form.email} 
                  required 
                  className="w-full bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <input 
                type="text" 
                name="company" 
                placeholder={t.form.company} 
                className="w-full bg-slate-800/50 border border-purple-500/30 text-white placeholder-slate-400 px-4 py-3 rounded-xl mt-4 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <input 
                type="text" 
                name="tools" 
                placeholder={t.form.tools} 
                className="w-full bg-slate-800/50 border border-purple-500/30 text-white placeholder-slate-400 px-4 py-3 rounded-xl mt-4 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />

              <textarea 
                name="message" 
                placeholder={t.form.message} 
                required 
                className="w-full bg-slate-800/50 border border-purple-500/30 text-white placeholder-slate-400 px-4 py-3 rounded-xl h-32 mt-4 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              ></textarea>

              <input type="hidden" name="_subject" value="New contact from Remota Sonora" />
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <button 
                type="submit" 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold mt-8 w-full shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/70 ring-2 ring-blue-400/20 hover:ring-blue-400/40"
              >
                {t.form.send}
              </button>

              <div id="thankMessage" className="hidden mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-300 rounded-2xl text-center font-semibold">
                {t.form.thanks}
              </div>

              <div className="text-xs text-slate-400 mt-4 text-center">
                {t.contact.alt}{" "}
                <a className="text-blue-400 hover:text-cyan-300 underline transition-colors" href__="mailto:hello@remotasonora.com">
                  hello@remotasonora.com
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-700/40 bg-slate-950 shadow-inner shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 py-12 text-sm text-slate-400 grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></span>
            © {new Date().getFullYear()} Remota Sonora. {t.footer.left}
          </div>
          <div className="md:text-right text-slate-500">{t.footer.right}</div>
        </div>
      </footer>
    </div>
  );
}

function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-600/50 bg-slate-900/50 px-1 py-1">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
          lang === "en" 
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30" 
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
          lang === "es" 
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30" 
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
      >
        ES
      </button>
    </div>
  );
}

const ServiceCard = memo(function ServiceCard({ title, children, gradient }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} opacity-20 rounded-3xl blur-2xl`}></div>
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 h-full shadow-xl ring-1 ring-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ring-2 ring-white/10 flex-shrink-0`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-black text-2xl text-white tracking-tight">{title}</h3>
        </div>
        <div className="text-sm leading-relaxed font-light">{children}</div>
      </div>
    </div>
  );
});

const PricingPlan = memo(function PricingPlan({ title, price, note, items, featured }) {
  return (
    <div className={`relative ${featured ? 'md:scale-105' : ''}`}>
      <div className={`absolute -inset-3 bg-gradient-to-r ${featured ? 'from-blue-600 to-cyan-600' : 'from-slate-600 to-blue-600'} opacity-25 rounded-3xl blur-2xl`}></div>
      <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border ${featured ? 'border-blue-500/60' : 'border-slate-700/60'} rounded-3xl p-10 h-full shadow-2xl ring-1 ring-white/5`}>
        {featured && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold shadow-2xl ring-2 ring-blue-400/30">
            POPULAR
          </div>
        )}
        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Plan</div>
        <div className="font-black text-2xl text-white mt-3 tracking-tight">{title}</div>
        <div className="mt-5 text-6xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-lg">
          {price}
        </div>
        {note && <div className="text-xs text-slate-400 mt-3 font-light">{note}</div>}
        <ul className="mt-8 space-y-4">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-light">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

const InfoCard = memo(function InfoCard({ title, desc, items, gradient }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} opacity-20 rounded-3xl blur-2xl`}></div>
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-10 h-full shadow-2xl ring-1 ring-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ring-2 ring-white/10 flex-shrink-0`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">{title}</h3>
        </div>
        <p className="text-slate-300 mb-6 leading-relaxed font-light">{desc}</p>
        <ul className="space-y-3">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

const translations = {
  en: {
    nav: { services: "Services", process: "Process", pricing: "Pricing", quote: "Get a quote" },
    hero: {
      title1: "Engineers, drafters and architects,",
      title2: "with custom training",
      title3: ", ready for your backlog",
      subtitle: "Nearshore solutions for US firms and businesses: structural support, design assistance, drafting, general architecture and landscape design. Monthly United States dollar (USD) invoices—no payroll or benefits on your side.",
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
      subtitle: "We serve engineering, general architecture, and also non-technical clients who need design drafting (for example, landscaping).",
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
      desc: "We protect your team and ours with non-solicit and no direct-hire clauses, plus clear IP and confidentiality terms.",
      items: [
        "NDA (Non-Disclosure Agreement): confidentiality of shared information",
        "MSA (Master Services Agreement): overarching commercial and legal terms",
        "SOW (Statement of Work): scope, standards and deliverables per project",
      ],
    },
    clients: {
      title: "Who we serve",
      desc: "Beyond engineering firms, we support businesses and independent architects.",
      items: [
        "Structural & architectural engineering firms",
        "General contractors & subcontractors",
        "Landscaping businesses",
        "Independent architects: you win the client; we align the workflow",
      ],
    },
    contact: {
      title: "Let's talk",
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
      thanks: "Thanks! We'll get back within 1 business day.",
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
      subtitle: "Soluciones nearshore para firmas y negocios en EE.UU.: cálculo estructural, apoyo a diseño, drafting, arquitectura en general y diseño de jardines. Facturación mensual en dólares estadounidenses (USD), sin nóminas ni seguros para ti.",
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
      subtitle: "Cubrimos ingeniería, arquitectura en general y también clientes no técnicos que requieren dibujo técnico de diseño (por ejemplo, paisajismo).",
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
      note: "*Facturación mensual en dólares estadounidenses (USD). Tarifas 'desde' — pueden variar por software requerido y alcance.",
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
      desc: "Protegemos tu equipo y el nuestro con no-solicitación y no contratación directa, además de propiedad intelectual y confidencialidad claras.",
      items: [
        "NDA (Non-Disclosure Agreement): confidencialidad de la información compartida",
        "MSA (Master Services Agreement): términos comerciales y legales generales",
        "SOW (Statement of Work): alcance, estándares y entregables por proyecto",
      ],
    },
    clients: {
      title: "Clientes a quienes servimos",
      desc: "Además de firmas de ingeniería y arquitectura, apoyamos a negocios y a arquitectos independientes.",
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
};
