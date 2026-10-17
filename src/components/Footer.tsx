import React from 'react';
import { ShieldCheck, Lock, Heart, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B160F] text-[#F0D9AE] py-10 px-4 sm:px-6 lg:px-8 text-xs border-t border-[#4A2819]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        
        {/* Brand */}
        <div>
          <span className="font-serif-display font-black text-xl text-[#FFF0D1] flex items-center justify-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#C99A45]" />
            <span>Café Literário Pronto</span>
          </span>
          <p className="text-[#F0D9AE]/70 max-w-md mx-auto text-[11px] leading-relaxed">
            Materiais didáticos, roteiros de saraus e cenografia literária criados para transformar aulas de Literatura e Língua Portuguesa em experiências inesquecíveis.
          </p>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#F0D9AE]/80 border-y border-[#4A2819] py-3 w-full max-w-lg">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#C99A45]" />
            <span>Pagamento Criptografado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C99A45]" />
            <span>Garantia Incondicional de 7 Dias</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>⚡ Envio Imediato no E-mail</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[#8C6A54] text-[10px] space-y-1">
          <p>
            © {new Date().getFullYear()} Café Literário Pronto. Todos os direitos reservados.
          </p>
          <p className="flex items-center justify-center gap-1">
            Feito com <Heart className="w-3 h-3 text-[#692E24] fill-[#692E24] inline" /> para professores de Literatura de todo o Brasil.
          </p>
        </div>

      </div>
    </footer>
  );
};
