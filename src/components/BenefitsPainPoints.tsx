import React from 'react';

interface BenefitsPainPointsProps {
  onCtaClick: () => void;
}

export const BenefitsPainPoints: React.FC<BenefitsPainPointsProps> = ({ onCtaClick }) => {
  const painPoints = [
    'Montar o evento do zero, sem saber por onde começar',
    'Passar a madrugada no Canva criando convite, cartaz e decoração',
    'Ver os alunos calados na roda, sem saber o que perguntar ou responder',
    'Improvisar a decoração na última hora com o que sobrou na escola',
    'Caçar ideias soltas na internet que não combinam com a sua turma',
  ];

  return (
    <section className="section s-latte bg-[#F5E6CC] text-[#21140F] py-16 px-4 relative overflow-hidden">
      {/* Manchas de xícara decorativas */}
      <svg className="stain" viewBox="0 0 120 120" style={{ width: '140px', left: '-30px', top: '40px' }} aria-hidden="true">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#5A331D" strokeWidth="5" strokeDasharray="120 6 40 10 90 4" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#5A331D" strokeWidth="1.5" opacity=".6" />
      </svg>
      <svg className="stain" viewBox="0 0 120 120" style={{ width: '120px', right: '-20px', bottom: '20px' }} aria-hidden="true">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#5A331D" strokeWidth="5" strokeDasharray="120 6 40 10 90 4" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#5A331D" strokeWidth="1.5" opacity=".6" />
      </svg>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Lousa Escolar com Moldura de Madeira */}
        <div className="chalkboard">
          <h3 className="font-script text-2xl sm:text-3xl text-center text-white mb-2">
            Com esse material, você não precisa mais...
          </h3>

          {/* Flourish */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-6 bg-[#C99A45] rounded-full" />
            <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
            <span className="h-0.5 w-6 bg-[#C99A45] rounded-full" />
          </div>

          <svg className="block w-3/4 max-w-[280px] h-3.5 mx-auto -mt-1 mb-4 overflow-visible" viewBox="0 0 280 14" preserveAspectRatio="none">
            <path d="M4 9 C60 3 120 12 180 6 C220 3 250 8 276 5" fill="none" stroke="#F2A38F" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <ul className="space-y-3.5 text-left text-[#E9E6DC]">
            {painPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base sm:text-lg leading-relaxed">
                <span className="font-serif-display font-black text-xl text-[#F2A38F] leading-none shrink-0">
                  ✕
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Frase de virada */}
        <p className="font-serif-display font-extrabold text-2xl sm:text-3xl text-center text-[#2A1912] my-8 leading-snug">
          Agora você abre o roteiro, imprime as peças e o seu Café Literário já tem cara de evento.
        </p>

        {/* Botão Sofisticado */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center justify-center bg-[#2B160F] hover:bg-[#3D2014] text-[#FFF0D1] text-base sm:text-lg font-black py-4.5 px-9 rounded-2xl shadow-[0_8px_20px_rgba(43,22,15,0.25)] hover:shadow-[0_12px_28px_rgba(43,22,15,0.35)] transition-all cursor-pointer border border-[#C99A45]/40 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
          >
            QUERO FACILITAR MEU CAFÉ LITERÁRIO
          </button>
        </div>
      </div>
    </section>
  );
};
