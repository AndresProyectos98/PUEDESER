import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Rocket, GraduationCap, Code } from "lucide-react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import Glossary from "./components/Glossary";
import ContentSection from "./components/ContentSection";
import Signature from "./components/Signature";

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");

  const renderContent = () => {
    switch (activeSection) {
      case "welcome":
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="brutal-card p-8 bg-brand-sky/5">
              <h2 className="font-display text-5xl uppercase mb-4 leading-none">
                Bienvenido al Futuro, <span className="text-brand-sky">Estudiante</span>
              </h2>
              <p className="text-xl leading-relaxed mb-6">
                Esta plataforma ha sido diseñada para guiarte en la creación de tus propias herramientas impulsadas por Inteligencia Artificial. 
                Aquí aprenderás desde los conceptos más básicos hasta cómo publicar tu aplicación para que todo el mundo la use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="brutal-card p-4 bg-white">
                  <Rocket className="w-8 h-8 text-brand-sky mb-2" />
                  <h3 className="font-bold uppercase">Acelera</h3>
                  <p className="text-sm opacity-70">Aprende rápido con guías directas.</p>
                </div>
                <div className="brutal-card p-4 bg-white">
                  <Code className="w-8 h-8 text-brand-gold mb-2" />
                  <h3 className="font-bold uppercase">Construye</h3>
                  <p className="text-sm opacity-70">Crea código real y funcional.</p>
                </div>
                <div className="brutal-card p-4 bg-white">
                  <GraduationCap className="w-8 h-8 text-brand-deep mb-2" />
                  <h3 className="font-bold uppercase">Aprende</h3>
                  <p className="text-sm opacity-70">Domina las herramientas del mañana.</p>
                </div>
              </div>
            </div>

            <div className="brutal-card p-8 border-l-[16px] border-l-brand-gold">
              <h3 className="font-display text-3xl uppercase mb-4">¿Cómo empezar?</h3>
              <p className="mb-4">Sigue los 4 pasos en el menú lateral para completar tu primer proyecto. Si te pierdes, HIA está siempre disponible para ayudarte.</p>
              <button 
                onClick={() => setActiveSection("conceptos")}
                className="brutal-btn"
              >
                Empezar Paso 1
              </button>
            </div>
          </motion.div>
        );
      case "chat":
        return <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Chatbot /></motion.div>;
      case "glossary":
        return <motion.div key="glossary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Glossary /></motion.div>;
      default:
        return (
          <motion.div 
            key={activeSection} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
          >
            <ContentSection id={activeSection} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold selection:text-brand-deep">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <section className="w-full lg:w-7/12 p-6 md:p-10 bg-brand-white relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeSection !== "welcome" && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => setActiveSection("welcome")}
                className="mb-8 flex items-center gap-2 font-bold uppercase text-sm hover:text-brand-sky transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver al Inicio
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </section>
      </main>

      <Signature />
    </div>
  );
}
