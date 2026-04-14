import { motion } from "motion/react";

const terms = [
  { term: "API", definition: "Interfaz de Programación de Aplicaciones. Es el puente que permite que dos aplicaciones se comuniquen entre sí." },
  { term: "Prompt", definition: "La instrucción o pregunta que le das a una IA para obtener una respuesta específica." },
  { term: "Token", definition: "La unidad básica de texto que procesa una IA. Aproximadamente 4 caracteres o 0.75 palabras." },
  { term: "LLM", definition: "Large Language Model (Modelo de Lenguaje Grande). Una IA entrenada con enormes cantidades de texto para entender y generar lenguaje humano." },
  { term: "Vite", definition: "Una herramienta de construcción moderna que hace que el desarrollo de aplicaciones web sea extremadamente rápido." },
  { term: "Tailwind CSS", definition: "Un framework de CSS que permite diseñar interfaces rápidamente usando clases predefinidas." },
  { term: "GitHub", definition: "Plataforma para alojar proyectos de código y colaborar con otros desarrolladores." },
  { term: "Vercel", definition: "Plataforma en la nube para desplegar aplicaciones web de forma sencilla y automática." },
];

export default function Glossary() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-4xl uppercase border-b-4 border-brand-deep pb-2">Glosario Técnico</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((item, i) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="brutal-card p-6 hover:bg-brand-sky/5"
          >
            <h3 className="font-display text-2xl text-brand-sky uppercase mb-2">{item.term}</h3>
            <p className="text-brand-deep leading-relaxed">{item.definition}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
