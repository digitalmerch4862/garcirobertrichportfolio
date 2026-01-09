import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ShieldCheck, Building, Scale, CreditCard, Gavel,
  ChevronRight, Sparkles, Send, X, Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { soundEngine } from './services/soundEngine';
import { COMPETENCIES, EXPERIENCES, SKILLS } from './constants';

const NavLink: React.FC<{ 
  sectionId: string; 
  children: React.ReactNode; 
  onClick: (id: string) => void 
}> = ({ sectionId, children, onClick }) => (
  <button 
    onClick={() => onClick(sectionId)}
    className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
    onMouseEnter={() => soundEngine.playHover()}
  >
    {children}
  </button>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-400 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    soundEngine.playClick();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `You are an AI assistant for Robert Rich Garcia, a Real Estate Paralegal. 
      Use this context to answer queries:
      - Experience: ${JSON.stringify(EXPERIENCES)}
      - Skills: ${JSON.stringify(SKILLS)}
      - Competencies: ${JSON.stringify(COMPETENCIES)}
      User query: ${query}
      Keep answers professional, concise, and focused on Robert's legal expertise.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setResponse(result.text || "I couldn't generate a response. Please try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Sorry, there was an error processing your request. Please ensure the API key is configured correctly in Netlify environment variables.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 bg-blue-600/10 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-blue-400" />
                <span className="font-bold text-white">Career Assistant AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
              {response ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300 text-sm leading-relaxed">
                  {response}
                </motion.div>
              ) : (
                <p className="text-slate-500 text-sm italic">Ask anything about Robert's professional background, skills, or experience...</p>
              )}
              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              )}
            </div>

            <form onSubmit={handleAskAI} className="p-6 pt-0">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about my legal expertise..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-600"
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => soundEngine.playHover()}
        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/30 border border-blue-500/20 group relative"
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

const App: React.FC = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      soundEngine.playClick();
    }
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    FileText: <FileText size={32} />,
    ShieldCheck: <ShieldCheck size={32} />,
    Building: <Building size={32} />,
    Scale: <Scale size={32} />,
    CreditCard: <CreditCard size={32} />,
    Gavel: <Gavel size={32} />,
  };

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-blue-600/30">
      <AIChat />
      
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-full px-6 md:px-8 py-3 flex items-center justify-between shadow-2xl transition-all">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-white text-lg md:text-xl uppercase truncate">Robert Rich Garcia</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink sectionId="about" onClick={scrollToSection}>About</NavLink>
            <NavLink sectionId="competencies" onClick={scrollToSection}>Competencies</NavLink>
            <NavLink sectionId="experience" onClick={scrollToSection}>Experience</NavLink>
            <NavLink sectionId="skills" onClick={scrollToSection}>Skills</NavLink>
          </div>
          <div className="w-8 md:hidden"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-44 pb-32 px-6 scroll-mt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
              <ShieldCheck size={16} />
              Real Estate Paralegal
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white">
              Precision in <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Legal Design.
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              With over 15 years of excellence in real estate documentation, I bridge the gap between complex legal requirements and seamless property transactions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full translate-x-12 translate-y-12" />
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-slate-900 shadow-2xl transition-all bg-slate-800">
              <img 
                src="https://lh3.googleusercontent.com/d/1vHjhrXYDKAQb1dhasU0UyYuyM8DfKscM" 
                alt="Robert Rich Garcia" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-slate-950/50 transition-colors scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="The Professional" 
            subtitle="Deep legal expertise met with strategic project management for the modern real estate market."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-10 bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-sm transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">15+ Years of Trust</h3>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                As a seasoned Real Estate Paralegal, I have dedicated my career to navigating the intricate legal landscapes of property development and ownership. My journey spans from foundational legal practice to leading documentation teams for some of the Philippines' most prestigious real estate developers.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                I specialize in turning complex regulatory hurdles into efficient, standardized processes—ensuring that every title, every deed, and every transaction is processed with clinical precision.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group border border-blue-500/20"
            >
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10">
                <Scale className="mb-6 opacity-80" size={48} />
                <h3 className="text-2xl font-bold mb-4">Academic Foundation</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider text-blue-200">Education</p>
                    <p className="text-xl font-extrabold">Bachelor's in Law</p>
                    <p className="text-lg opacity-90">Major in Legal Management</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider text-blue-200">Institution</p>
                    <p className="text-xl font-extrabold">University of the East</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competencies Section */}
      <section id="competencies" className="py-32 px-6 bg-[#020617] transition-colors scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Core Competencies" 
            subtitle="Specialized services tailored for developers, investors, and homeowners."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETENCIES.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group p-8 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[2.5rem] hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 cursor-default"
              >
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-400 shadow-sm">
                  {iconMap[comp.iconName]}
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">{comp.title}</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {comp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-slate-950/30 transition-colors relative overflow-hidden scroll-mt-32">
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle 
            title="Career Timeline" 
            subtitle="A journey of professional growth across major Philippine real estate giants."
          />
          
          <div className="space-y-12 relative">
            <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-slate-800" />
            
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-16 group"
              >
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center group-hover:border-blue-500 group-hover:scale-110 transition-all z-20 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                </div>
                <div className="p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2.5rem] group-hover:border-blue-500/30 transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/5">
                  <span className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-2 block">{exp.year}</span>
                  <h3 className="text-2xl font-extrabold mb-1 text-white">{exp.role}</h3>
                  <h4 className="text-lg font-bold text-slate-400 mb-4">{exp.company}</h4>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-[#020617] transition-colors scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Technical Arsenal" 
            subtitle="Modern tools utilized for efficient case management and professional presentation."
          />
          <div className="flex flex-wrap gap-4">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-6 py-3 rounded-full text-sm font-bold border flex items-center gap-2 cursor-default transition-all hover:scale-105 active:scale-95 shadow-sm ${
                  skill.category === 'crm' 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20' 
                  : skill.category === 'design' 
                  ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                  : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {skill.category === 'crm' && <ChevronRight size={14} />}
                {skill.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-800 text-center transition-colors bg-[#010409]">
        <div className="max-w-7xl mx-auto">
          <p className="text-white font-extrabold text-2xl tracking-tighter mb-4 uppercase">Robert Rich Garcia</p>
          <p className="text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Robert Rich Garcia. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <button 
               onClick={() => scrollToSection('hero')} 
               className="text-sm font-bold text-slate-600 hover:text-blue-400 transition-colors bg-transparent border-none cursor-pointer"
            >
              Back to Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;