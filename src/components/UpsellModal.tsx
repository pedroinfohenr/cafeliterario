import React from 'react';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptPromo: () => void;
  onDeclinePromo: () => void;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  onAcceptPromo,
  onDeclinePromo,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#2B160F] text-[#FFF0D1] border border-[#C99A45]/80 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center animate-scale-up"
      >
        {/* Botão Fechar discreto */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#4A2819]/80 hover:bg-[#692E24] text-[#F0D9AE] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Kicker suave */}
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#C99A45] mb-2">
          Oferta Especial Exclusiva
        </span>

        {/* Título Principal Limpo */}
        <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-[#FFF0D1] leading-tight mb-2">
          Leve o <span className="text-[#C99A45]">Pacote Completo</span> por apenas <span className="text-white">R$ 15,90</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#F0D9AE]/90 mb-6 font-serif">
          Por apenas <b className="text-white">+ R$ 5,90</b> de diferença, você destrava o projeto completo com todos os materiais:
        </p>

        {/* 3 Benefícios Diretos (Sem caixas escuras repetitivas) */}
        <div className="space-y-3 text-left mb-6 font-medium text-xs sm:text-sm">
          <div className="flex items-start gap-3 bg-[#4A2819]/50 p-3 rounded-xl border border-[#C99A45]/20">
            <div className="w-5 h-5 rounded-full bg-[#C99A45] text-[#21140F] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-[#FFF0D1]">
              <b>Os 4 Bônus Exclusivos</b>: 600 Questões, 150 Mapas Mentais, 100 Dinâmicas e Guia BNCC.
            </span>
          </div>

          <div className="flex items-start gap-3 bg-[#4A2819]/50 p-3 rounded-xl border border-[#C99A45]/20">
            <div className="w-5 h-5 rounded-full bg-[#C99A45] text-[#21140F] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-[#FFF0D1]">
              <b>Decoração Completa</b>: Painel oficial, bandeirolas, centros de mesa e moldura para fotos.
            </span>
          </div>

          <div className="flex items-start gap-3 bg-[#4A2819]/50 p-3 rounded-xl border border-[#C99A45]/20">
            <div className="w-5 h-5 rounded-full bg-[#C99A45] text-[#21140F] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-[#FFF0D1]">
              <b>Acesso Vitalício</b>: Baixe no Drive e use com quantas turmas quiser, para sempre.
            </span>
          </div>
        </div>

        {/* Preço em Destaque Limpo */}
        <div className="flex items-baseline justify-center gap-2 mb-6">
          <span className="text-xs text-[#8C6A54] line-through font-mono">De R$ 19,90</span>
          <span className="text-sm font-bold text-[#C99A45]">Por apenas</span>
          <span className="font-serif-display font-black text-3xl sm:text-4xl text-[#FFF0D1]">
            R$ 15,90
          </span>
        </div>

        {/* Botão Principal de Conversão */}
        <button
          onClick={onAcceptPromo}
          className="w-full btn btn-primary text-sm sm:text-base font-black py-4 px-6 shadow-[0_6px_0_#8F6822] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
        >
          <span>QUERO O COMPLETO POR R$ 15,90</span>
          <ArrowRight className="w-4 h-4 text-[#21140F]" />
        </button>

        {/* Link Limpo de Recusa */}
        <button
          onClick={onDeclinePromo}
          className="mt-4 text-xs text-[#F0D9AE]/60 hover:text-[#FFF0D1] underline underline-offset-4 cursor-pointer block mx-auto transition-colors font-serif"
        >
          Não, prefiro continuar apenas com o Básico por R$ 10,00
        </button>

        {/* Selo de Segurança */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#F0D9AE]/50">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C99A45]" />
          <span>Checkout Oficial Wiapy · Acesso Imediato</span>
        </div>
      </div>
    </div>
  );
};
