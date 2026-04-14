import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, Loader2, X, Paperclip } from "lucide-react";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPT = `Identidad: Eres HIA, mentor del Colegio Hispano Americano.
Protocolo CoT: Toda respuesta técnica debe tener 1. Concepto, 2. Pasos (numerados), 3. Alerta de Seguridad (sobre la API Key).
Validación: Siempre debe preguntar al final: "¿Lograste ver el cambio en tu pantalla o te apareció algún mensaje de error?".
Menú: Responder a números "1" al "4" con las explicaciones correspondientes:
1. Conceptos Base: IA, Prompts, LLMs.
2. Google AI Studio: Cómo obtener tu API Key y probar modelos.
3. GitHub: Cómo crear un repositorio y subir tu código.
4. Vercel: Cómo desplegar tu aplicación web.`;

interface Message {
  role: "user" | "model";
  text: string;
  image?: { data: string; mimeType: string };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "¡Hola! Soy HIA, tu mentor del Colegio Hispano Americano. ¿En qué paso de tu proyecto de IA te encuentras hoy? Puedes marcar un número del 1 al 4 o hacerme cualquier pregunta." }
  ]);
  const [input, setInput] = useState("");
  const [attachedImage, setAttachedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const data = base64.split(",")[1];
      setAttachedImage({ data, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file);
      }
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = attachedImage;
    
    setInput("");
    setAttachedImage(null);
    setMessages(prev => [...prev, { role: "user", text: userMessage, image: currentImage || undefined }]);
    setIsLoading(true);

    try {
      const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...messages.map(m => ({
          role: m.role,
          parts: [
            ...(m.image ? [{ inlineData: { data: m.image.data, mimeType: m.image.mimeType } }] : []),
            { text: m.text }
          ]
        })),
        {
          role: "user",
          parts: [
            ...(currentImage ? [{ inlineData: { data: currentImage.data, mimeType: currentImage.mimeType } }] : []),
            { text: userMessage || "Analiza esta imagen." }
          ]
        }
      ];

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents
      });

      const modelText = response.text || "Lo siento, tuve un problema al procesar tu solicitud.";
      setMessages(prev => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: "model", text: "Hubo un error al conectar con mi cerebro digital. Por favor, intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="brutal-card flex flex-col h-[600px] bg-white overflow-hidden" onPaste={handlePaste}>
      <div className="bg-brand-deep text-white p-4 font-display text-xl uppercase flex items-center gap-2">
        <Bot className="w-6 h-6 text-brand-gold" />
        Chat con HIA
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-none border-2 border-brand-deep flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-brand-sky text-white" : "bg-brand-gold text-brand-deep"
                }`}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 border-2 border-brand-deep shadow-[4px_4px_0px_0px_rgba(1,33,105,1)] bg-white`}>
                  {msg.image && (
                    <img 
                      src={`data:${msg.image.mimeType};base64,${msg.image.data}`} 
                      alt="User upload" 
                      className="max-w-full h-auto mb-2 border-2 border-brand-deep"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="markdown-body text-sm">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-brand-deep font-bold animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              HIA está pensando...
            </div>
          </div>
        )}
      </div>

      {/* Image Preview */}
      <AnimatePresence>
        {attachedImage && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-2 border-t-4 border-brand-deep bg-brand-gold/10 flex items-center gap-4"
          >
            <div className="relative">
              <img 
                src={`data:${attachedImage.mimeType};base64,${attachedImage.data}`} 
                alt="Preview" 
                className="w-16 h-16 object-cover border-2 border-brand-deep"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setAttachedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-none border-2 border-brand-deep p-0.5 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-xs font-bold uppercase text-brand-deep">Imagen lista para enviar</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 border-t-4 border-brand-deep bg-white flex gap-2 items-end">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="brutal-btn p-3 bg-brand-gold"
          title="Adjuntar imagen"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <div className="flex-1 flex flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe o pega una imagen..."
            className="w-full brutal-input py-2"
          />
        </div>

        <button onClick={handleSend} className="brutal-btn p-3">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
