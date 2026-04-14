import { motion } from "motion/react";
import { ArrowRight, AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface SectionProps {
  id: string;
}

const contentData: Record<string, { title: string; what: string; why: string; how: string; icon: any }> = {
  conceptos: {
    title: "1. Conceptos Base",
    what: "La Inteligencia Artificial Generativa es una tecnología capaz de crear contenido nuevo (texto, imágenes, código) a partir de patrones aprendidos.",
    why: "Entender los fundamentos te permite comunicarte mejor con la IA y saber qué esperar de ella.",
    how: "Interactuamos mediante 'Prompts'. Un buen prompt tiene contexto, tarea y formato.",
    icon: Info
  },
  studio: {
    title: "2. Google AI Studio",
    what: "Es el entorno de desarrollo rápido de Google para experimentar con modelos Gemini.",
    why: "Te permite obtener una API Key gratuita y probar tus ideas antes de escribir código complejo.",
    how: "Creas un 'Prompt', ajustas los parámetros y exportas el código para tu aplicación.",
    icon: AlertTriangle
  },
  github: {
    title: "3. GitHub",
    what: "Es el estándar de la industria para el control de versiones y almacenamiento de código.",
    why: "Permite guardar tu progreso, trabajar en equipo y conectar tu código con servicios de publicación.",
    how: "Subes tu carpeta de proyecto y realizas 'commits' para registrar tus cambios.",
    icon: CheckCircle2
  },
  vercel: {
    title: "4. Vercel",
    what: "Una plataforma optimizada para desplegar aplicaciones de React y Vite.",
    why: "Convierte tu código de GitHub en una dirección web real que cualquiera puede visitar.",
    how: "Conectas tu repositorio y Vercel se encarga de compilar y publicar tu app automáticamente.",
    icon: ArrowRight
  }
};

export default function ContentSection({ id }: SectionProps) {
  const data = contentData[id];

  if (!data) return null;

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4 border-b-4 border-brand-deep pb-4">
        <div className="p-4 bg-brand-sky border-4 border-brand-deep shadow-[4px_4px_0px_0px_rgba(1,33,105,1)]">
          <data.icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display text-4xl uppercase">{data.title}</h2>
      </header>

      <div className="grid gap-6">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="brutal-card p-6 border-l-[12px] border-l-brand-sky"
        >
          <h3 className="font-display text-xl uppercase mb-2">¿Qué es?</h3>
          <p className="leading-relaxed">{data.what}</p>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="brutal-card p-6 border-l-[12px] border-l-brand-gold"
        >
          <h3 className="font-display text-xl uppercase mb-2">¿Para qué sirve?</h3>
          <p className="leading-relaxed">{data.why}</p>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="brutal-card p-6 border-l-[12px] border-l-brand-deep"
        >
          <h3 className="font-display text-xl uppercase mb-2">¿Cómo interactúa?</h3>
          <p className="leading-relaxed">{data.how}</p>
        </motion.div>
      </div>

      {id === "studio" && (
        <div className="bg-red-50 border-4 border-red-600 p-6 flex gap-4 items-start">
          <AlertTriangle className="w-8 h-8 text-red-600 shrink-0" />
          <div>
            <h4 className="font-bold text-red-600 uppercase">Alerta de Seguridad</h4>
            <p className="text-sm text-red-800">
              Nunca compartas tu API Key públicamente. Si la subes a GitHub por error, bórrala inmediatamente y genera una nueva en Google AI Studio.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
