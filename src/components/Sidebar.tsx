import { Sparkles, BookOpen, MessageSquare, Book, Layout, Github, Globe } from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: "conceptos", title: "1. Conceptos Base", icon: Book, desc: "Fundamentos de IA" },
    { id: "studio", title: "2. Google AI Studio", icon: Layout, desc: "Tu laboratorio de IA" },
    { id: "github", title: "3. GitHub", icon: Github, desc: "Guarda tu código" },
    { id: "vercel", title: "4. Vercel", icon: Globe, desc: "Publica tu app" },
  ];

  return (
    <aside className="w-full lg:w-5/12 p-6 space-y-8 lg:border-r-4 border-brand-deep bg-white">
      {/* Welcome Section */}
      <section 
        onClick={() => setActiveSection("welcome")}
        className={`brutal-card p-6 cursor-pointer group ${activeSection === "welcome" ? "bg-brand-sky/10" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-gold border-2 border-brand-deep shadow-[2px_2px_0px_0px_rgba(1,33,105,1)]">
            <Sparkles className="w-6 h-6 text-brand-deep" />
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase">Bienvenida</h2>
            <p className="text-sm opacity-70">Comienza tu viaje aquí</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setActiveSection("glossary")}
          className="brutal-btn-gold flex flex-col items-center gap-2 py-4"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-bold">Glosario</span>
        </button>
        <button 
          onClick={() => setActiveSection("chat")}
          className="brutal-btn flex flex-col items-center gap-2 py-4"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs font-bold">Hablar con HIA</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-4">
        <h3 className="font-display text-xl uppercase border-b-2 border-brand-deep pb-2">Pasos del Proyecto</h3>
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-4 p-4 border-4 border-brand-deep text-left transition-all ${
              activeSection === item.id 
                ? "bg-brand-deep text-white shadow-none translate-x-1 translate-y-1" 
                : "bg-white shadow-[4px_4px_0px_0px_rgba(1,33,105,1)] hover:shadow-[2px_2px_0px_0px_rgba(1,33,105,1)]"
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeSection === item.id ? "text-brand-gold" : "text-brand-sky"}`} />
            <div>
              <p className="font-bold uppercase leading-none">{item.title}</p>
              <p className={`text-xs mt-1 ${activeSection === item.id ? "text-white/70" : "text-brand-deep/60"}`}>
                {item.desc}
              </p>
            </div>
          </motion.button>
        ))}
      </nav>
    </aside>
  );
}
