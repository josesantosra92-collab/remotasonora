import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Terms() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'es') setLang('es');
  }, []);

  const content = {
    en: {
      title: "Terms & Conditions",
      lastUpdated: "Last Updated: December 12, 2025",
      sections: [
        {
          title: "Services",
          content: "Remota Sonora provides nearshore engineering, drafting, and architectural support services to US-based firms and businesses. All services are provided under a Master Services Agreement (MSA) and specific Statements of Work (SOW)."
        },
        {
          title: "Pilot Phase",
          content: "All new client relationships begin with a Pilot Phase of up to 3 months. During this period, special pricing applies as we validate workflow, quality standards, and communication protocols. After the Pilot Phase, Production rates apply."
        },
        {
          title: "Invoicing and Payment",
          content: "Services are billed monthly in United States dollars (USD). Payment terms are Net 30 unless otherwise agreed in writing. Late payments may be subject to interest charges."
        },
        {
          title: "Confidentiality and Non-Disclosure",
          content: "All projects are protected by Non-Disclosure Agreements (NDA) and Proprietary Information Agreements (PIA). We maintain strict confidentiality of all client information, project data, and business practices."
        },
        {
          title: "Anti-Poaching",
          content: "Our contracts include anti-poaching clauses that prohibit direct hiring of our staff by clients. We protect both your team and ours with clear non-solicitation terms."
        },
        {
          title: "Intellectual Property",
          content: "All work product created for clients remains the property of the client upon full payment. We retain no rights to client project deliverables."
        },
        {
          title: "Software and Tools",
          content: "Clients are responsible for providing necessary software licenses. We work with industry-standard tools including AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp, and visualization software."
        },
        {
          title: "Service Level Agreements",
          content: "Production phase services include agreed Service Level Agreements (SLAs) for communication response times, deliverable turnaround, and quality standards."
        },
        {
          title: "Limitation of Liability",
          content: "Our liability is limited to the fees paid for the specific services in question. We maintain professional liability insurance for engineering services."
        },
        {
          title: "Termination",
          content: "Either party may terminate services with 30 days written notice. All outstanding invoices must be paid upon termination."
        },
        {
          title: "Contact",
          content: "For questions about these Terms & Conditions, contact us at hello@remotasonora.com."
        }
      ]
    },
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización: 12 de diciembre de 2025",
      sections: [
        {
          title: "Servicios",
          content: "Remota Sonora proporciona servicios nearshore de ingeniería, drafting y soporte arquitectónico para firmas y negocios en EE.UU. Todos los servicios se proporcionan bajo un Acuerdo de Servicios Maestros (MSA) y Declaraciones de Trabajo específicas (SOW)."
        },
        {
          title: "Fase Piloto",
          content: "Todas las relaciones con nuevos clientes comienzan con una Fase Piloto de hasta 3 meses. Durante este período, se aplica una tarifa especial mientras validamos el flujo de trabajo, estándares de calidad y protocolos de comunicación. Después de la Fase Piloto, se aplican tarifas de Producción."
        },
        {
          title: "Facturación y Pago",
          content: "Los servicios se facturan mensualmente en dólares estadounidenses (USD). Los términos de pago son Net 30 a menos que se acuerde lo contrario por escrito. Los pagos tardíos pueden estar sujetos a cargos por intereses."
        },
        {
          title: "Confidencialidad y No Divulgación",
          content: "Todos los proyectos están protegidos por Acuerdos de Confidencialidad (NDA) y Acuerdos de Información Propietaria (PIA). Mantenemos estricta confidencialidad de toda la información del cliente, datos del proyecto y prácticas comerciales."
        },
        {
          title: "Anti-Captación de Personal",
          content: "Nuestros contratos incluyen cláusulas de no captación de personal que prohíben la contratación directa de nuestro personal por parte de los clientes. Protegemos tanto tu equipo como el nuestro con términos claros de no solicitación."
        },
        {
          title: "Propiedad Intelectual",
          content: "Todo el trabajo creado para los clientes sigue siendo propiedad del cliente una vez pagado en su totalidad. No conservamos derechos sobre los entregables del proyecto del cliente."
        },
        {
          title: "Software y Herramientas",
          content: "Los clientes son responsables de proporcionar las licencias de software necesarias. Trabajamos con herramientas estándar de la industria como AutoCAD, Revit, Enercalc, RISA, RAM, ETABS, SketchUp y software de visualización."
        },
        {
          title: "Acuerdos de Nivel de Servicio",
          content: "Los servicios en fase de producción incluyen Acuerdos de Nivel de Servicio (SLA) acordados para tiempos de respuesta de comunicación, entrega de entregables y estándares de calidad."
        },
        {
          title: "Limitación de Responsabilidad",
          content: "Nuestra responsabilidad está limitada a las tarifas pagadas por los servicios específicos en cuestión. Mantenemos un seguro de responsabilidad profesional para servicios de ingeniería."
        },
        {
          title: "Terminación",
          content: "Cualquiera de las partes puede terminar los servicios con 30 días de aviso por escrito. Todas las facturas pendientes deben pagarse al momento de la terminación."
        },
        {
          title: "Contacto",
          content: "Para preguntas sobre estos Términos y Condiciones, contáctanos en hello@remotasonora.com."
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-slate-950/90 border-b border-slate-700/40 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-500 flex items-center justify-center font-black text-white shadow-2xl shadow-blue-500/60 ring-2 ring-teal-400/20">
              RS
            </div>
            <div className="font-black text-xl bg-gradient-to-r from-indigo-300 via-blue-200 to-teal-300 bg-clip-text text-transparent tracking-tight">
              Remota Sonora
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-xl border border-slate-600/50 bg-slate-900/50 px-1 py-1">
              <button
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
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          to={createPageUrl("Home")} 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {lang === "es" ? "Volver al inicio" : "Back to home"}
        </Link>

        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent mb-4">
          {t.title}
        </h1>
        <p className="text-slate-400 text-sm mb-12">{t.lastUpdated}</p>

        <div className="space-y-8">
          {t.sections.map((section, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight">{section.title}</h2>
              <p className="text-slate-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-700/40 bg-slate-950 shadow-inner shadow-black/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-slate-400">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-slate-400 hover:text-blue-400 transition-colors underline mb-4"
          >
            {lang === "es" ? "Volver Arriba" : "Back to Top"}
          </button>
          <div>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></span>
              © {new Date().getFullYear()} Remota Sonora. {lang === "es" ? "Todos los derechos reservados" : "All rights reserved"}.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
