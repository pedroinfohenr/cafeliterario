import React from 'react';
import { BookOpen, Mail, Palette, Award } from 'lucide-react';

interface BenefitsPainPointsProps {
  onCtaClick: () => void;
}

export const BenefitsPainPoints: React.FC<BenefitsPainPointsProps> = ({ onCtaClick }) => {
  const seals = [
    {
      icon: BookOpen,
      title: 'Roteiro',
      desc: 'passo a passo',
    },
    {
      icon: Mail,
      title: 'Convite',
      desc: 'e cardápio prontos',
    },
    {
      icon: Palette,
      title: 'Decoração',
      desc: 'para imprimir',
    },
    {
      icon: Award,
      title: 'BNCC',
      desc: 'alinhado ao currículo',
    },
  ];

  const painPoints = [
    'Montar o evento do zero, sem saber por onde começar',
    'Passar a madrugada no Canva criando convite, cartaz e decoração',
    'Ver os alunos calados na roda, sem saber o que perguntar ou responder',
    'Improvisar a decoração na última hora com o que sobrou na escola',
    'Caçar ideias soltas na internet que não combinam com a sua turma',
  ];

  const marqueeQuotes = [
    'Capitu traiu ou não traiu Bentinho?',
    'A melhor definição do amor não vale um beijo.',
    'Viver é um negócio muito perigoso...',
    'Amar se aprende amando.',
    'Tudo vale a pena se a alma não é pequena.',
    'Quem lê viaja sem sair do lugar.',
  ];

  return (
    <div>
      {/* 4 Seals Strip (Creme Vintage & Vinho Clássico) */}
      <div className="bg-[#FFF0D1] py-6 px-4 border-b border-[#21140F]/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {seals.map((seal, idx) => {
            const Icon = seal.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F0D9AE] flex items-center justify-center text-[#692E24] shrink-0 border border-[#C99A45]/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <b className="font-serif-display font-bold text-base text-[#21140F] block leading-tight">
                    {seal.title}
                  </b>
                  <span className="text-xs text-[#8C6A54] leading-tight block">
                    {seal.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Literary Wine Ribbon Ticker (Vinho Clássico & Dourado) */}
      <div className="bg-[#692E24] text-[#FFF0D1] py-3 overflow-hidden border-y-2 border-[#441A13]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-sm sm:text-base font-serif-display font-bold tracking-wide">
          {[...marqueeQuotes, ...marqueeQuotes].map((quote, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>{quote}</span>
              <span className="text-[#C99A45]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Pain Points Section (Marrom Espresso #4A2819) */}
      <section className="bg-[#4A2819] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Section Title (Creme Vintage) */}
          <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#FFF0D1] mb-2 leading-tight">
            Com esse material, você não precisa mais...
          </h2>

          {/* Flourish (Dourado Envelhecido) */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="h-0.5 w-10 bg-[#C99A45] rounded-full" />
            <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
            <span className="h-0.5 w-10 bg-[#C99A45] rounded-full" />
          </div>

          {/* Clean Pain Points List (Cards Bege Pergaminho #F0D9AE com Texto #21140F) */}
          <div className="space-y-3 text-left mb-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="bg-[#F0D9AE] rounded-2xl p-4 sm:py-4 sm:px-5 pl-14 sm:pl-14 relative font-bold text-sm sm:text-base text-[#21140F] shadow-md border border-[#C99A45]/30"
              >
                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#692E24] text-[#FFF0D1] font-black text-xs flex items-center justify-center">
                  ✕
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Relief Statement (Dourado Envelhecido) */}
          <p className="font-serif-display font-extrabold text-lg sm:text-xl text-[#C99A45] max-w-lg mx-auto mb-8 leading-snug">
            Agora você abre o roteiro, imprime as peças e o seu Café Literário já tem cara de evento.
          </p>

          {/* CTA Button */}
          <button onClick={onCtaClick} className="btn-primary">
            QUERO FACILITAR MEU CAFÉ LITERÁRIO
          </button>
        </div>
      </section>
    </div>
  );
};
