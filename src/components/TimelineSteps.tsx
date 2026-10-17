import React, { useEffect, useRef, useState } from 'react';

export const TimelineSteps: React.FC = () => {
  const steps = [
    { num: 'Etapa 1', title: 'Convite', desc: 'chama a escola' },
    { num: 'Etapa 2', title: 'Decoração', desc: 'clima de café e livraria' },
    { num: 'Etapa 3', title: 'Recepção', desc: 'crachá e cardápio literário' },
    { num: 'Etapa 4', title: 'Mesas', desc: 'dos pensadores e autores' },
    { num: 'Etapa 5', title: 'Rodas', desc: 'de perguntas e sarau' },
    { num: 'Etapa 6', title: 'Encerramento', desc: 'com certificado de mérito' },
  ];

  const timelineRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.1)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section s-milk bg-[#FFF0D1] text-[#21140F] py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="font-script text-2xl sm:text-3xl text-[#692E24] font-bold block mb-1">
            Tudo pensado para você
          </span>
          <h2 className="font-serif-display font-black text-3xl sm:text-5xl text-[#21140F] mb-3">
            Do convite ao encerramento, cada etapa já vem pronta
          </h2>

          {/* Flourish */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
            <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          </div>

          <p className="text-base sm:text-lg text-[#5E4332] max-w-xl mx-auto font-medium">
            O roteiro conduz o evento inteiro. Você só adapta para a sua turma.
          </p>
        </div>

        {/* Timeline com Café Gotejando */}
        <ol
          ref={timelineRef}
          className="timeline relative"
          style={{ '--p': progress.toFixed(3) } as React.CSSProperties}
        >
          {/* Drip Track */}
          <div className="drip-track" aria-hidden="true">
            <div className="drip-fill" />
            <div className="drip-drop" />
          </div>

          {steps.map((step, idx) => {
            const isLit = progress >= (idx + 0.35) / steps.length;
            return (
              <li
                key={idx}
                className={`tl bg-[#F0D9AE] rounded-2xl p-5 relative shadow-[0_8px_0_#C99A45,0_16px_26px_rgba(42,25,18,0.18)] border border-[#C99A45]/40 ${
                  isLit ? 'lit' : ''
                }`}
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs uppercase font-bold text-[#8C6A54] tracking-wider">
                    {step.num}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#692E24] text-[#FFF0D1] font-serif-display font-black flex items-center justify-center text-xs shadow-[0_2px_0_#441A13]">
                    {idx + 1}
                  </span>
                </div>
                <h4 className="font-serif-display font-black text-xl text-[#21140F] mb-0.5">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#692E24] font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
