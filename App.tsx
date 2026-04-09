
import React, { useEffect, useState } from 'react';
import { Phone, ChevronRight, ArrowRight, ArrowLeft, X, ZoomIn, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './components/SectionHeading';
import { 
  PHONE, 
  EMAIL, 
  NAME, 
  SITUATIONS, 
  SERVICES, 
  PORTFOLIO
} from './constants';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'services'>('home');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showCookies, setShowCookies] = useState(false);
  const [showGDPRModal, setShowGDPRModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', gdpr: false });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    // Use id as name if name attribute is missing, or add name attribute to jsx
    // I will add name attributes to the JSX later, so I'll trust name or id
    const fieldName = e.target.getAttribute('name') || id;
    
    if (fieldName) {
       const checked = (e.target as HTMLInputElement).checked;
       setFormData(prev => ({
         ...prev,
         [fieldName]: type === 'checkbox' ? checked : value
       }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdpr) return;
    
    setFormStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '', gdpr: false });
        // Reset status after a few seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Kontrola souhlasu s cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowCookies(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookies(false);
  };

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesClick = () => {
    setView('services');
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#121417] text-[#e5e7eb] font-sans selection:bg-[#c5a07e] selection:text-[#121417]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled || view === 'services' ? 'bg-[#121417]/95 border-[#2d3035] py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={handleHomeClick} className="font-technical font-medium text-lg tracking-widest text-white whitespace-nowrap uppercase">
            {NAME}
          </button>
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => scrollToSection('situace')} className="text-[10px] font-technical uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Situace</button>
            <button onClick={() => scrollToSection('realizace')} className="text-[10px] font-technical uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Realizace</button>
            
            <button 
              onClick={handleServicesClick} 
              className={`px-5 py-2 text-[10px] font-technical uppercase tracking-[0.25em] transition-all border ${
                view === 'services' 
                ? 'bg-[#c5a07e] text-[#121417] border-[#c5a07e]' 
                : 'text-[#c5a07e] border-[#c5a07e]/40 hover:border-[#c5a07e] hover:bg-[#c5a07e]/5'
              } font-bold`}
            >
              Služby
            </button>

            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center space-x-3 bg-[#c5a07e] text-[#121417] px-6 py-2.5 text-xs font-technical font-bold uppercase tracking-widest hover:bg-[#d4b598] transition-colors whitespace-nowrap shadow-lg shadow-[#c5a07e]/10">
              <Phone size={14} />
              <span>{PHONE}</span>
            </a>
          </div>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="md:hidden text-[#c5a07e]">
            <Phone size={20} />
          </a>
        </div>
      </nav>

      {view === 'home' ? (
        <main>
          {/* 1. Hero Section */}
          <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#121417]">
            <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#121417] via-[#121417]/80 md:via-[#121417]/40 to-transparent z-10"></div>
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-60 scale-105 transition-transform duration-[20s] hover:scale-110"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557671009-600c3a1973ca?q=80&w=2548&auto=format&fit=crop)' }}
              ></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-20">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-7xl font-light tracking-tight text-white mb-6 leading-tight">
                  Klempířské a pokrývačské <br />
                  <span className="text-[#c5a07e]">práce</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl font-light drop-shadow-sm">
                  Dopřejte svému domu střechu, která má styl i kvalitu.
Profesionální realizace střech a klempířských prvků na míru.<br className="hidden md:block"/>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="bg-[#c5a07e] text-[#121417] px-10 py-5 text-lg font-technical font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#d4b598] transition-all transform hover:-translate-y-1 shadow-2xl"
                  >
                    <Phone size={20} />
                    <span>Zavolat</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('kontakt')}
                    className="backdrop-blur-sm border border-[#c5a07e] text-[#c5a07e] px-10 py-5 text-lg font-technical uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#c5a07e]/10 transition-all shadow-2xl"
                  >
                    <span>Nezávazná konzultace</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Typické situace */}
          <section id="situace" className="py-24 md:py-32 bg-[#1a1c1e]">
            <div className="container mx-auto px-6">
              <SectionHeading>Typické situace, které řešíme</SectionHeading>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2d3035]">
                {SITUATIONS.map((sit, idx) => (
                  <div key={idx} className="bg-[#1a1c1e] p-10 hover:bg-[#23262a] transition-colors group">
                    <div className="text-[#c5a07e] mb-6 font-technical text-sm">0{idx + 1}</div>
                    <h3 className="text-xl font-light text-white leading-relaxed group-hover:translate-x-1 transition-transform">
                      {sit.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Realizace */}
          <section id="realizace" className="py-32 md:py-48 bg-[#121417] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-2 text-[#c5a07e] font-technical text-xs uppercase tracking-[0.3em] mb-4">
                    <Award size={14} />
                    <span>Reference a výsledky práce</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight uppercase mb-6">
                    Ukázky <span className="text-[#c5a07e]">realizací</span>
                  </h2>
                  <div className="h-1 w-24 bg-[#c5a07e] mb-8"></div>
                  <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    Každý projekt je pro nás závazkem k maximální preciznosti. Specializujeme se na náročné detaily, které zaručují dlouhověkost a estetickou čistotu vaší střechy.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6 border-l border-white/10 pl-12">
                    <div className="flex flex-col">
                      <span className="text-3xl font-technical text-[#c5a07e] font-bold">100%</span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Kvalita materiálu</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-technical text-[#c5a07e] font-bold">Záruka</span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Na provedenou práci</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                {PORTFOLIO.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="group relative flex flex-col cursor-pointer"
                    onClick={() => {
                      if (item.mediaType !== 'iframe') {
                        setLightboxImage(item.image);
                      }
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1c1e] border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-[#c5a07e]/30 group-hover:-translate-y-2">
                      {item.mediaType === 'iframe' ? (
                        <div className="w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
                          <iframe 
                            src={item.image} 
                            className="w-full h-full border-none scale-[1.5] origin-center"
                            title={`Realizace ${idx + 1}`}
                          ></iframe>
                        </div>
                      ) : (
                        <img 
                          src={item.image} 
                          alt={item.task} 
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent opacity-80 transition-opacity"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-[10px] font-technical uppercase tracking-[0.3em] text-[#c5a07e] mb-2">Projekt 0{idx + 1}</div>
                        <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#c5a07e] transition-colors">{item.task}</h3>
                        <div className="flex items-center space-x-2 text-white/50 text-xs font-technical uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          <ZoomIn size={14} />
                          <span>Zvětšit detail</span>
                        </div>
                      </div>

                      <div className="absolute top-6 right-6 bg-[#c5a07e] text-[#121417] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                        <CheckCircle2 size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. CTA Banner - Služby */}
          <section className="py-24 md:py-40 bg-[#1a1c1e] border-y border-white/5">
            <div className="container mx-auto px-6 text-center">
              <SectionHeading>Naše služby</SectionHeading>
              <p className="text-gray-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Nabízíme kompletní realizace střech a klempířské práce, od drobných oprav až po rozsáhlé rekonstrukce a havarijní opravy.
              </p>
              <button  
                onClick={handleServicesClick}
                className="group relative inline-flex items-center space-x-6 py-5 px-12 overflow-hidden transition-all"
              >
                <span className="absolute inset-0 border border-[#c5a07e] group-hover:bg-[#c5a07e] transition-all duration-500"></span>
                <span className="text-sm font-technical uppercase tracking-[0.4em] text-[#c5a07e] group-hover:text-[#121417] transition-colors z-10 font-bold">Prohlédnout detailní nabídku</span>
                <ArrowRight size={20} className="text-[#c5a07e] group-hover:text-[#121417] group-hover:translate-x-2 transition-all z-10" />
              </button>
            </div>
          </section>

          {/* 5. Výzva k akci */}
          <section className="py-24 md:py-32 bg-[#121417] text-center">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight uppercase">
                Hledáte spolehlivé řešení pro vaši střechu?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                 <a 
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="w-full sm:w-auto bg-[#c5a07e] text-[#121417] px-12 py-5 text-base font-technical font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#d4b598] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#c5a07e]/10"
                  >
                    <Phone size={18} />
                    <span>Zavolat</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('kontakt')}
                    className="w-full sm:w-auto border border-[#c5a07e] text-[#c5a07e] px-12 py-5 text-base font-technical uppercase tracking-widest hover:bg-[#c5a07e]/10 transition-all transform hover:-translate-y-1 shadow-lg shadow-[#c5a07e]/10"
                  >
                    Nezávazná konzultace
                  </button>
              </div>
              <p className="text-gray-500 font-technical text-[10px] tracking-widest uppercase italic">
                Rychlá reakce. Jasná domluva.
              </p>
            </div>
          </section>

          {/* 6. Kontaktní sekce */}
          <section id="kontakt" className="py-16 md:py-24 bg-[#1a1c1e] border-t border-[#2d3035]">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <SectionHeading>Kontakt</SectionHeading>
                  <div className="space-y-10">
                    <div>
                      <div className="text-[10px] font-technical text-gray-500 uppercase tracking-widest mb-3">Telefon</div>
                      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-3xl md:text-5xl font-light text-white hover:text-[#c5a07e] transition-colors tracking-tight">
                        {PHONE}
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] font-technical text-gray-500 uppercase tracking-widest mb-3">E-mail</div>
                      <a href={`mailto:${EMAIL}`} className="text-lg md:text-xl font-light text-gray-300 border-b border-gray-700 pb-1 hover:border-[#c5a07e] hover:text-[#c5a07e] transition-all">
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121417] p-8 md:p-12 border border-[#2d3035]">
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[10px] font-technical uppercase tracking-widest mb-2 text-gray-500">Jméno</label>
                        <input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          type="text" 
                          placeholder="Vaše jméno"
                          className="w-full bg-[#1a1c1e] border border-[#2d3035] p-4 text-sm text-white focus:ring-1 focus:ring-[#c5a07e] focus:border-[#c5a07e] outline-none transition-all" 
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[10px] font-technical uppercase tracking-widest mb-2 text-gray-500">Telefon</label>
                        <input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          type="tel" 
                          placeholder="+420 000 000 000"
                          className="w-full bg-[#1a1c1e] border border-[#2d3035] p-4 text-sm text-white focus:ring-1 focus:ring-[#c5a07e] focus:border-[#c5a07e] outline-none transition-all" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-technical uppercase tracking-widest mb-2 text-gray-500">Váš E-mail</label>
                      <input 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        type="email" 
                        placeholder="vase@email.cz"
                        className="w-full bg-[#1a1c1e] border border-[#2d3035] p-4 text-sm text-white focus:ring-1 focus:ring-[#c5a07e] focus:border-[#c5a07e] outline-none transition-all" 
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] font-technical uppercase tracking-widest mb-2 text-gray-500">Stručný popis problému</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={4} 
                        placeholder="Co potřebujete vyřešit..."
                        className="w-full bg-[#1a1c1e] border border-[#2d3035] p-4 text-sm text-white focus:ring-1 focus:ring-[#c5a07e] focus:border-[#c5a07e] outline-none resize-none transition-all"
                      ></textarea>
                    </div>

                    <div className="flex items-start space-x-3 py-2">
                      <input 
                        type="checkbox" 
                        id="gdpr" 
                        name="gdpr"
                        checked={formData.gdpr}
                        onChange={handleFormChange}
                        required 
                        className="mt-1 h-4 w-4 bg-[#1a1c1e] border-[#2d3035] text-[#c5a07e] rounded focus:ring-1 focus:ring-[#c5a07e]"
                      />
                      <label htmlFor="gdpr" className="text-[10px] font-technical text-gray-500 uppercase tracking-widest leading-relaxed cursor-pointer select-none">
                        Souhlasím se <button type="button" onClick={() => setShowGDPRModal(true)} className="text-[#c5a07e] hover:underline">zpracováním osobních údajů</button>
                      </label>
                    </div>

                    <button 
                      disabled={formStatus === 'sending' || formStatus === 'success'}
                      className="w-full bg-[#c5a07e] text-[#121417] py-4 font-technical uppercase tracking-widest font-bold hover:bg-[#d4b598] transition-colors flex items-center justify-center space-x-3 shadow-lg shadow-[#c5a07e]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex-1">{formStatus === 'sending' ? 'Odesílání...' : formStatus === 'success' ? 'Odesláno' : 'Odeslat žádost o konzultaci'}</span>
                      {formStatus === 'idle' && <ArrowRight size={18} />}
                    </button>
                    
                    {formStatus === 'success' && (
                      <div className="text-green-500 text-center text-sm font-bold mt-2 animate-in fade-in slide-in-from-bottom-2">
                        Děkujeme! Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="text-red-500 text-center text-sm font-bold mt-2 animate-in fade-in slide-in-from-bottom-2">
                        Něco se pokazilo. Zkuste to prosím znovu nebo nám zavolejte.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="mb-20">
              <button 
                onClick={handleHomeClick}
                className="flex items-center space-x-2 text-[#c5a07e] font-technical text-xs uppercase tracking-widest mb-8 hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Zpět na úvod</span>
              </button>
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6 uppercase tracking-tight">Detailní přehled <span className="text-[#c5a07e]">služeb</span></h1>
              <div className="h-px w-24 bg-[#c5a07e]"></div>
            </div>

            <div className="grid gap-32">
              {SERVICES.map((service, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row items-start gap-12 lg:gap-24 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="w-full lg:w-1/2 aspect-video overflow-hidden group relative bg-[#1a1c1e] border border-[#c5a07e]/20">
                    {service.mediaType === 'iframe' ? (
                      <div className="w-full h-full overflow-hidden flex items-center justify-center">
                        <iframe 
                          src={service.image} 
                          className="w-full h-full border-none scale-[1.3] origin-center pointer-events-none"
                          title={service.title}
                        ></iframe>
                      </div>
                    ) : (
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    )}
                  </div>
                  <div className="w-full lg:w-1/2 pt-4">
                    <div className="text-[#c5a07e] font-technical text-sm mb-4 tracking-widest uppercase">[{idx + 1}]</div>
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-6 uppercase leading-tight">{service.title}</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => scrollToSection('kontakt')}
                      className="inline-flex items-center space-x-4 border border-[#c5a07e] px-8 py-4 text-xs font-technical uppercase tracking-widest text-[#c5a07e] hover:bg-[#c5a07e]/5 transition-colors"
                    >
                      <span>Nezávazná konzultace</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-40 p-12 md:p-24 bg-[#1a1c1e] text-center border border-[#2d3035]">
               <h3 className="text-2xl md:text-4xl font-light text-white mb-8">Nevidíte službu, kterou hledáte?</h3>
               <p className="text-gray-400 mb-12 max-w-xl mx-auto">Kontaktujte nás a probereme vaše individuální požadavky formou nezávazné konzultace.</p>
               <a 
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="inline-flex items-center space-x-3 bg-[#c5a07e] text-[#121417] px-12 py-5 text-lg font-technical font-bold uppercase tracking-widest hover:bg-[#d4b598] transition-all transform hover:-translate-y-1 shadow-xl shadow-[#c5a07e]/20"
                >
                  <Phone size={20} />
                  <span>{PHONE}</span>
                </a>
            </div>
          </div>
        </main>
      )}

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <img 
            src={lightboxImage} 
            alt="Zvětšený náhled" 
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in duration-300"
          />
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(null);
            }}
          >
            <X size={32} />
          </button>
        </div>
      )}

      {/* GDPR Modal */}
      {showGDPRModal && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1a1c1e] border border-[#c5a07e]/30 w-full max-w-2xl p-8 md:p-12 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowGDPRModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center space-x-3 text-[#c5a07e] mb-8">
              <ShieldCheck size={28} />
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-tight">Informace o zpracování osobních údajů</h3>
            </div>
            
            <div className="space-y-6 text-gray-300 text-sm md:text-base font-light leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              <p>Správcem osobních údajů je <strong>Martin Möhwald</strong>.</p>
              
              <p>Prostřednictvím kontaktního formuláře zpracováváme tyto osobní údaje: <strong>jméno, e-mailovou adresu a telefonní číslo</strong>.</p>
              
              <p>Osobní údaje jsou zpracovávány za účelem kontaktování zájemce a poskytnutí konzultace, případně následné komunikace související s touto poptávkou.</p>
              
              <p>Osobní údaje jsou uchovávány po dobu <strong>12 měsíců</strong> od poslední komunikace, pokud nedojde k navázání další spolupráce nebo pokud právní předpisy nevyžadují dobu delší.</p>
              
              <div className="bg-[#121417] p-6 border-l-2 border-[#c5a07e]">
                <p className="text-[#c5a07e] font-technical text-xs uppercase tracking-widest mb-4">Subjekt údajů má právo:</p>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>na přístup ke svým osobním údajům,</span></li>
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>na jejich opravu nebo výmaz,</span></li>
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>na omezení zpracování,</span></li>
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>vznést námitku proti zpracování,</span></li>
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>na přenositelnost údajů,</span></li>
                  <li className="flex items-start space-x-2"><ChevronRight size={14} className="text-[#c5a07e] mt-0.5 shrink-0" /> <span>podat stížnost u Úřadu pro ochranu osobních údajů.</span></li>
                </ul>
              </div>
              
              <p className="italic text-gray-500">Poskytnutí osobních údajů je dobrovolné, avšak nezbytné pro možnost zpětného kontaktování.</p>
            </div>
            
            <button 
              onClick={() => setShowGDPRModal(false)}
              className="mt-10 w-full bg-[#c5a07e] text-[#121417] py-4 font-technical font-bold uppercase tracking-widest hover:bg-[#d4b598] transition-colors"
            >
              Rozumím
            </button>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#1a1c1e] border-t border-[#c5a07e]/30 p-6 md:p-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-center md:text-left">
            <div>
              <h4 className="text-[#c5a07e] font-technical text-xs uppercase tracking-[0.3em] mb-3 font-bold">Souhlas s používáním cookies</h4>
              <p className="text-gray-400 text-xs font-light max-w-4xl leading-relaxed">
                Tento web používá soubory cookies pro analýzu návštěvnosti a zajištění nejlepší uživatelské zkušenosti. Setrváním na webu nebo kliknutím na tlačítko souhlasíte s jejich ukládáním.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={handleAcceptCookies}
                className="flex-1 md:flex-none bg-[#c5a07e] text-[#121417] px-12 py-4 text-[10px] font-technical font-bold uppercase tracking-[0.2em] hover:bg-[#d4b598] transition-all shadow-lg shadow-[#c5a07e]/10"
              >
                Rozumím a souhlasím
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 bg-[#121417] border-t border-[#2d3035]">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="flex flex-col space-y-1">
              <div className="text-[11px] font-technical text-gray-500 uppercase tracking-[0.15em]">
                © {new Date().getFullYear()} {NAME} | Provozovatel: Martin Möhwald
              </div>
              <div className="text-[10px] font-technical text-gray-600 uppercase tracking-[0.1em]">
                IČO: 23208651 | Jindřichův Hradec - Jindřichův Hradec V, Větrná 50, 37701
              </div>
            </div>
            <div className="flex items-center space-x-10 text-[10px] font-technical uppercase tracking-widest text-gray-500">
              <button onClick={() => setShowGDPRModal(true)} className="hover:text-white transition-colors">GDPR</button>
              <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">Podpora</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
