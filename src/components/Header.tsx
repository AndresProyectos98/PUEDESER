import { motion } from "motion/react";

export default function Header() {
  return (
    <header className="relative w-full h-64 overflow-hidden border-b-4 border-brand-deep">
      {/* Background Image with Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('https://www.dropbox.com/scl/fi/6icthrrpn9k7n6uuah2e5/FONDO_CORPORATIVO.jpg?rlkey=pof6e90neal1dqrh02mzxopw8&st=auxk3tuf&dl=1')" }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-4xl md:text-6xl text-brand-deep uppercase tracking-tighter"
        >
          HIA : ASISTENTE PARA TUS IDEAS
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-xl md:text-2xl text-brand-sky uppercase mt-2 tracking-widest"
        >
          IMAGINA • CONSTRUYE • COMPARTE
        </motion.p>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl text-brand-gold uppercase mt-1 tracking-tight"
          style={{ WebkitTextStroke: "1px #012169" }}
        >
          Colegio Hispano Americano
        </motion.p>
      </div>
    </header>
  );
}
