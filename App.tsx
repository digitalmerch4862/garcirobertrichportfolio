import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, ShieldCheck, Building, Scale, CreditCard, Gavel,
  Mail, Phone, Linkedin, Facebook,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import { soundEngine } from './services/soundEngine';
import { COMPETENCIES, EXPERIENCES, SKILLS } from './constants';

const NavLink: React.FC<{ 
  sectionId: string; 
  children: React.ReactNode; 
  onClick: (id: string) => void 
}> = ({ sectionId, children, onClick }) => (
  <button 
    onClick={() => onClick(sectionId)}
    className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
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
      className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-600 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const App: React.FC = () => {
  // Smooth scroll logic for navigation
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      soundEngine.playClick();
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoUrl = `mailto:garciarobertrich@gmail.com?subject=Contact from Portfolio - ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
    window.location.href = mailtoUrl;
    e.currentTarget.reset();
    soundEngine.playClick();
  };

  const iconMap: Record<string, React.ReactNode> = {
    FileText: <FileText size={32} />,
    ShieldCheck: <ShieldCheck size={32} />,
    Building: <Building size={32} />,
    Scale: <Scale size={32} />,
    CreditCard: <CreditCard size={32} />,
    Gavel: <Gavel size={32} />,
  };

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-600/30">
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-full px-6 md:px-8 py-3 flex items-center justify-between shadow-2xl transition-all">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-slate-900 text-lg md:text-xl uppercase truncate">Robert Rich Garcia</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink sectionId="about" onClick={scrollToSection}>About</NavLink>
            <NavLink sectionId="competencies" onClick={scrollToSection}>Competencies</NavLink>
            <NavLink sectionId="experience" onClick={scrollToSection}>Experience</NavLink>
            <NavLink sectionId="skills" onClick={scrollToSection}>Skills</NavLink>
            <NavLink sectionId="contact" onClick={scrollToSection}>Contact</NavLink>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 text-sm font-bold mb-6">
              <ShieldCheck size={16} />
              Real Estate Paralegal
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">
              Precision in <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Legal Design.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              With over 15 years of excellence in real estate documentation, I bridge the gap between complex legal requirements and seamless property transactions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full translate-x-12 translate-y-12" />
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl transition-all bg-slate-200">
              <img 
                src="https://lh3.googleusercontent.com/d/1vHjhrXYDKAQb1dhasU0UyYuyM8DfKscM" 
                alt="Robert Rich Garcia" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - "The Professional" */}
      <section id="about" className="py-32 px-6 bg-white transition-colors scroll-mt-32">
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
              className="lg:col-span-2 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-sm transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900">15+ Years of Trust</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As a seasoned Real Estate Paralegal, I have dedicated my career to navigating the intricate legal landscapes of property development and ownership. My journey spans from foundational legal practice to leading documentation teams for some of the Philippines' most prestigious real estate developers.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                I specialize in turning complex regulatory hurdles into efficient, standardized processes—ensuring that every title, every deed, and every transaction is processed with clinical precision.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10">
                <Scale className="mb-6 opacity-80" size={48} />
                <h3 className="text-2xl font-bold mb-4">Academic Foundation</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider">Education</p>
                    <p className="text-xl font-extrabold">Bachelor's in Law</p>
                    <p className="text-lg opacity-90">Major in Legal Management</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider">Institution</p>
                    <p className="text-xl font-extrabold">University of the East</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competencies Section - "Core Competencies" */}
      <section id="competencies" className="py-32 px-6 bg-slate-50 transition-colors scroll-mt-32">
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
                className="group p-8 bg-white border border-slate-200 rounded-[2.5rem] hover:border-blue-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-default"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-600 shadow-sm">
                  {iconMap[comp.iconName]}
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">{comp.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {comp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - "Career Timeline" */}
      <section id="experience" className="py-32 px-6 bg-white transition-colors relative overflow-hidden scroll-mt-32">
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle 
            title="Career Timeline" 
            subtitle="A journey of professional growth across major Philippine real estate giants."
          />
          
          <div className="space-y-12 relative">
            <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-slate-200" />
            
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-16 group"
              >
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-300 flex items-center justify-center group-hover:border-blue-500 group-hover:scale-110 transition-all z-20 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                </div>
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] group-hover:border-blue-500/30 transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/5">
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">{exp.year}</span>
                  <h3 className="text-2xl font-extrabold mb-1 text-slate-900">{exp.role}</h3>
                  <h4 className="text-lg font-bold text-slate-500 mb-4">{exp.company}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - "Technical Arsenal" */}
      <section id="skills" className="py-32 px-6 bg-slate-50 transition-colors scroll-mt-32">
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
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' 
                  : skill.category === 'design' 
                  ? 'bg-indigo-600/10 text-indigo-700 border-indigo-600/20'
                  : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {skill.category === 'crm' && <ChevronRight size={14} />}
                {skill.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - "Get in Touch" */}
      <section id="contact" className="py-32 px-6 bg-white transition-colors scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionTitle 
                title="Get in Touch" 
                subtitle="Available for consulting, corporate legal support, and professional inquiries."
              />
              
              <div className="space-y-10 mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-6 group cursor-pointer"
                  onClick={() => window.open('tel:09175291018')}
                  onMouseEnter={() => soundEngine.playHover()}
                >
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm text-slate-700">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mobile</p>
                    <p className="text-2xl font-black text-slate-900">0917 529 1018</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-6 group cursor-pointer"
                  onClick={() => window.open('mailto:garciarobertrich@gmail.com')}
                  onMouseEnter={() => soundEngine.playHover()}
                >
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm text-slate-700">
                    <Mail />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email</p>
                    <p className="text-2xl font-black break-all text-slate-900">garciarobertrich@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/robert-rich-garcia-0ba50b37a/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/robert.rich.garcia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl transition-colors"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Juan Dela Cruz"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="juan@example.com"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={5}
                    placeholder="How can I help you today?"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-slate-900 placeholder-slate-400"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  Send Message <ArrowUpRight size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-200 text-center transition-colors bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-900 font-extrabold text-2xl tracking-tighter mb-4 uppercase">Robert Rich Garcia</p>
          <p className="text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} Robert Rich Garcia. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <button 
               onClick={() => scrollToSection('hero')} 
               className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"
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