export default function Signature() {
  return (
    <footer className="w-full border-t-4 border-brand-deep bg-white p-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-2xl uppercase text-brand-deep">Colegio Hispano Americano</p>
          <p className="text-sm font-bold text-brand-sky uppercase tracking-widest">Departamento de Informática</p>
        </div>
        
        <div className="brutal-card p-4 bg-brand-gold/10">
          <p className="text-xs font-bold uppercase mb-1">Creado por:</p>
          <p className="font-display text-lg uppercase">Andrés Santibañez - Tecnólogo Informático Biomédico</p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs opacity-60">© 2026 - Proyecto Educativo IA</p>
          <p className="text-xs font-bold uppercase">Imagina. Construye. Comparte.</p>
        </div>
      </div>
    </footer>
  );
}
