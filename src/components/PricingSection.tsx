import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, Mail, Clock } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (pkg: 'basico' | 'completo') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 31,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');
  const today = new Date();
  const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

  return (
    <section id="pricing" className="bg-[#2B160F] text-[#FFF0D1] py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[#4A2819]">
      <div className="max-w-4xl mx-auto">
        {/* Title (Creme Vintage) */}
        <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#FFF0D1] leading-tight mb-2">
          Escolha o seu Café Literário
        </h2>

        {/* Flourish (Dourado Envelhecido) */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#F0D9AE] max-w-xl mx-auto mb-4 font-normal">
          Preço de lançamento garantido só até hoje ({dateFormatted}), pagamento único.
        </p>

        {/* Countdown */}
        <div className="inline-flex items-center gap-2 mb-10 text-xs sm:text-sm">
          <span className="hand text-lg sm:text-xl text-[#C99A45]">Termina em</span>
          <div className="bg-[#C99A45] text-[#21140F] font-mono font-extrabold px-2.5 py-0.5 rounded shadow flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* 2 Plans Grid (Cards Bege Pergaminho #F0D9AE com Texto #21140F) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch text-left">
          
          {/* Pacote Básico */}
          <div className="bg-[#F0D9AE] text-[#21140F] rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-[#C99A45]/40 flex flex-col justify-between">
            <div>
              <div className="text-center pb-5 border-b border-[#21140F]/15 mb-5">
                <h3 className="font-serif-display font-black text-2xl text-[#21140F] mb-1">
                  Pacote Básico
                </h3>
                <span className="text-xs text-[#8C6A54] line-through font-mono block">
                  De R$ 37,90
                </span>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-sm font-bold text-[#692E24]">R$</span>
                  <span className="font-serif-display font-black text-5xl text-[#692E24] tracking-tight">
                    10,00
                  </span>
                </div>
                <span className="text-[11px] text-[#8C6A54] uppercase font-bold tracking-wider">
                  pagamento único
                </span>
              </div>

              <ul className="space-y-3 text-sm text-[#21140F] mb-8 font-medium">
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Roteiro passo a passo</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Convite e Cardápio Filosófico</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Suporte incluso</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage('basico')}
              className="btn-secondary w-full"
            >
              QUERO O BÁSICO
            </button>
          </div>

          {/* Pacote Completo (Featured) */}
          <div className="relative bg-[#F0D9AE] text-[#21140F] rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-[#C99A45] flex flex-col justify-between">
            {/* Top Ribbon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C99A45] text-[#21140F] font-serif-display font-black text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap border border-[#8F6822]">
              <Star className="w-3.5 h-3.5 fill-[#21140F]" />
              <span>Mais escolhido pelos professores</span>
            </div>

            <div>
              <div className="text-center pb-5 border-b border-[#21140F]/15 mb-5 mt-2">
                <h3 className="font-serif-display font-black text-2xl text-[#21140F] mb-1">
                  Pacote Completo
                </h3>
                <span className="text-xs text-[#8C6A54] line-through font-mono block">
                  De R$ 67,90
                </span>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-sm font-bold text-[#692E24]">R$</span>
                  <span className="font-serif-display font-black text-5xl text-[#692E24] tracking-tight">
                    19,90
                  </span>
                </div>
                <span className="text-[11px] text-[#8C6A54] uppercase font-bold tracking-wider">
                  pagamento único
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#21140F] mb-8 font-medium">
                <li className="flex items-start gap-2.5 font-bold text-[#21140F] pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Tudo o que você viu nesta página</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Roteiro completo do Café Literário</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>As 25 peças do evento: convite, cardápio, ingressos, crachás, certificado, plaquinhas de mesa, cards de leitura e jogos</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Os 20 itens de decoração: painel, bandeirolas, cartazes, centro de mesa, jogo americano e moldura</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Acesso vitalício</span>
                </li>
                <li className="flex items-start gap-2.5 pb-2 border-b border-dashed border-[#21140F]/15">
                  <span className="text-[#692E24] font-black">✓</span>
                  <span>Suporte prioritário</span>
                </li>
                
                {/* 4 Bonuses */}
                <li className="flex items-center justify-between pb-1 pt-1 text-xs font-bold text-[#692E24]">
                  <span>🎁 600 Questões de Literatura</span>
                  <span className="bg-[#692E24] text-[#FFF0D1] px-2 py-0.5 rounded-full text-[10px] font-bold">BÔNUS</span>
                </li>
                <li className="flex items-center justify-between pb-1 text-xs font-bold text-[#692E24]">
                  <span>🎁 150 Mapas Mentais</span>
                  <span className="bg-[#692E24] text-[#FFF0D1] px-2 py-0.5 rounded-full text-[10px] font-bold">BÔNUS</span>
                </li>
                <li className="flex items-center justify-between pb-1 text-xs font-bold text-[#692E24]">
                  <span>🎁 100 Dinâmicas de Redação</span>
                  <span className="bg-[#692E24] text-[#FFF0D1] px-2 py-0.5 rounded-full text-[10px] font-bold">BÔNUS</span>
                </li>
                <li className="flex items-center justify-between pb-1 text-xs font-bold text-[#692E24]">
                  <span>🎁 Guia de Planejamento BNCC</span>
                  <span className="bg-[#692E24] text-[#FFF0D1] px-2 py-0.5 rounded-full text-[10px] font-bold">BÔNUS</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage('completo')}
              className="btn-primary w-full text-base sm:text-lg"
            >
              QUERO O COMPLETO
            </button>
          </div>

        </div>

        {/* Trust markers */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs sm:text-sm text-[#F0D9AE]/85">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C99A45]" />
            <span>Acesso imediato no seu e-mail</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C99A45]" />
            <span>Compra 100% segura</span>
          </div>
        </div>

      </div>
    </section>
  );
};
