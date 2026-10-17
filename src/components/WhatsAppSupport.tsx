import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    'Olá! Gostaria de tirar uma dúvida sobre o material do Café Literário Pronto.'
  );

  const handleSendMessage = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#EBD9BA] w-72 sm:w-80 overflow-hidden mb-3 animate-fade-in text-left">
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-base font-bold shadow">
                📚
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm leading-tight">
                  Suporte Literário
                </h4>
                <span className="text-[10px] text-emerald-200">
                  Online · Atendimento a Professores
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 bg-[#ECE5DD] space-y-2">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-[#111B21] leading-relaxed">
              Olá, professor(a)! ☕📖
              <br />
              Tem alguma dúvida sobre as peças do sarau, pagamento ou como realizar o Café Literário na sua escola? Fale direto conosco!
            </div>
          </div>

          <div className="p-3 bg-white flex items-center gap-2 border-t border-gray-100">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#25D366]"
            />
            <button
              onClick={handleSendMessage}
              aria-label="Enviar mensagem"
              className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba5a] transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Abrir suporte pelo WhatsApp"
          className="group flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs sm:text-sm font-bold hidden sm:inline">
            Dúvidas? Fale no WhatsApp
          </span>
        </button>
      )}
    </div>
  );
};
