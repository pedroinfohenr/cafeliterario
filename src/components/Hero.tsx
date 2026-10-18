import React, { useEffect, useRef, useState } from 'react';
import { Feather, ShieldCheck } from 'lucide-react';
import { getSiteImage } from '../utils/imageStorage';

interface HeroProps {
  onCtaClick: () => void;
}

const QUOTES = [
  'Capitu traiu ou não traiu Bentinho?',
  'A melhor definição do amor não vale um beijo.',
  'Viver é um negócio muito perigoso...',
  'Amar se aprende amando.',
  'Tudo vale a pena se a alma não é pequena.',
  'Quem lê viaja sem sair do lugar.',
];

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const [heroImg] = useState<string>(() =>
    getSiteImage('hero', '/hero.png')
  );

  useEffect(() => {
    // Parallax Tilt 3D on Mockup
    const scene = sceneRef.current;
    const stack = stackRef.current;
    if (!scene || !stack) return;

    const handlePointerMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty('--ry', `${x * 16}deg`);
      stack.style.setProperty('--rx', `${-y * 12}deg`);
    };

    const handlePointerLeave = () => {
      stack.style.setProperty('--ry', '0deg');
      stack.style.setProperty('--rx', '0deg');
    };

    scene.addEventListener('pointermove', handlePointerMove);
    scene.addEventListener('pointerleave', handlePointerLeave);

    const handleScroll = () => {
      const y = Math.min(window.scrollY, 600) / 600;
      stack.style.setProperty('--rx', `${y * 10}deg`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    for (let i = 0; i < 10; i++) {
      const drop = document.createElement('span');
      drop.className = 'milk-drop';
      const a = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 55;
      drop.style.left = `${e.clientX - 5}px`;
      drop.style.top = `${e.clientY - 5}px`;
      drop.style.setProperty('--dx', `${Math.cos(a) * dist}px`);
      drop.style.setProperty('--dy', `${Math.sin(a) * dist - 22}px`);
      const sz = 5 + Math.random() * 8;
      drop.style.width = `${sz}px`;
      drop.style.height = `${sz}px`;
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 750);
    }
    onCtaClick();
  };

  const headlineWords = "Seu Café Literário pronto, do sarau de abertura à última poesia".split(" ");

  return (
    <section className="hero relative bg-[#2B160F] text-[#FFF0D1] pb-0 pt-0 overflow-hidden text-center">
      {/* Striped Italian Awning in Wine & Cream */}
      <div className="awning" aria-hidden="true" />

      {/* Floating Coffee Beans in Hero */}
      <div className="floating-beans" aria-hidden="true">
        {[
          { left: '4%', top: '15%', dur: '12s', del: '0s', s: 0.9 },
          { left: '10%', top: '70%', dur: '15s', del: '-3s', s: 1.1 },
          { left: '22%', top: '45%', dur: '18s', del: '-7s', s: 0.75 },
          { left: '78%', top: '22%', dur: '14s', del: '-2s', s: 1.0 },
          { left: '88%', top: '65%', dur: '17s', del: '-5s', s: 0.85 },
          { left: '94%', top: '35%', dur: '13s', del: '-9s', s: 1.2 },
          { left: '50%', top: '8%', dur: '20s', del: '-4s', s: 0.7 },
          { left: '16%', top: '88%', dur: '16s', del: '-8s', s: 0.95 },
          { left: '82%', top: '80%', dur: '19s', del: '-1s', s: 1.05 },
          { left: '6%', top: '40%', dur: '15s', del: '-11s', s: 0.8 },
          { left: '90%', top: '85%', dur: '16s', del: '-6s', s: 0.75 },
        ].map((b, i) => (
          <span
            key={i}
            className="bean"
            style={{
              left: b.left,
              top: b.top,
              animationDuration: b.dur,
              animationDelay: b.del,
              width: `${16 * b.s}px`,
              height: `${22 * b.s}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 pt-2 pb-14">
        {/* Kicker script */}
        <p className="hand text-2xl sm:text-3xl text-[#C99A45] mb-2 font-bold flex items-center justify-center gap-2">
          <Feather className="w-5 h-5 text-[#C99A45]" />
          <span>Para professores de Língua Portuguesa e Literatura</span>
        </p>

        {/* Word-by-word animated H1 */}
        <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF0D1] max-w-3xl mx-auto mb-5 leading-[1.1]">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className={`w mr-2 sm:mr-3 ${word === 'última' || word === 'poesia' ? 'text-[#C99A45]' : ''}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subhead exactly as copy */}
        <p className="text-base sm:text-lg text-[#F0D9AE] max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
          Roteiro passo a passo, peças para imprimir e decoração completa para montar um Café Literário que a escola inteira vai aplaudir de pé, sem passar madrugadas planejando do zero.
        </p>

        {/* Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <span className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 shadow-[0_4px_0_#C99A45]">
            <span className="text-[#692E24] font-black">✓</span>
            Roteiro completo do sarau
          </span>
          <span className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 shadow-[0_4px_0_#C99A45]">
            <span className="text-[#692E24] font-black">✓</span>
            25 peças literárias prontas para imprimir
          </span>
          <span className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 shadow-[0_4px_0_#C99A45]">
            <span className="text-[#692E24] font-black">✓</span>
            Fundamental 2 e Ensino Médio
          </span>
        </div>

        {/* 3D Mockup Scene ampliada, limpa, sem xícara nem cookies */}
        <div ref={sceneRef} className="mock-scene max-w-2xl sm:max-w-3xl mx-auto mb-8" id="mockScene">
          <div className="mock-glow" aria-hidden="true" />

          {/* Mockup Stack */}
          <div
            ref={stackRef}
            className="mock-stack relative"
          >
            <img
              className="mock-product rounded-2xl w-full h-auto max-h-[580px] object-contain mx-auto"
              alt="Kit Café Literário Vintage Completo"
              src={heroImg}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.endsWith('/hero.png')) {
                  img.src = '/hero.png';
                }
              }}
            />
            <span className="mock-shine" aria-hidden="true" />
          </div>

          <span className="mock-tag font-script">
            Tudo pronto pra imprimir
          </span>
        </div>

        {/* CTA Button in Aged Gold with Shine & Milk Splash */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleBtnClick}
            className="btn btn-primary text-base sm:text-lg font-black py-5 px-10 shadow-[0_7px_0_#8F6822] cursor-pointer"
          >
            QUERO MEU CAFÉ LITERÁRIO PRONTO
          </button>
          
          <div className="inline-flex items-center gap-1.5 text-xs text-[#F0D9AE]/85">
            <ShieldCheck className="w-4 h-4 text-[#C99A45]" />
            <span>Compra 100% segura · Acesso imediato no seu e-mail</span>
          </div>
        </div>

        {/* 4 Cards Grid as requested in copy */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto mt-10">
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center shadow-[0_6px_0_#C99A45,0_12px_20px_rgba(0,0,0,0.25)] border border-[#C99A45]/30 tilt">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Roteiro</b>
            <span className="text-xs font-bold text-[#8C6A54]">passo a passo</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center shadow-[0_6px_0_#C99A45,0_12px_20px_rgba(0,0,0,0.25)] border border-[#C99A45]/30 tilt">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Convite</b>
            <span className="text-xs font-bold text-[#8C6A54]">e cardápio prontos</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center shadow-[0_6px_0_#C99A45,0_12px_20px_rgba(0,0,0,0.25)] border border-[#C99A45]/30 tilt">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Decoração</b>
            <span className="text-xs font-bold text-[#8C6A54]">para imprimir</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center shadow-[0_6px_0_#C99A45,0_12px_20px_rgba(0,0,0,0.25)] border border-[#C99A45]/30 tilt">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">BNCC</b>
            <span className="text-xs font-bold text-[#8C6A54]">alinhado ao currículo</span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Marquee with Literary Quotes from Copy */}
      <div className="w-full bg-[#21140F] border-t-2 border-b-2 border-[#C99A45]/40 py-3.5 overflow-hidden whitespace-nowrap relative select-none">
        <div className="inline-flex gap-8 animate-marquee">
          {[...QUOTES, ...QUOTES, ...QUOTES].map((quote, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[#F0D9AE]/90">
              <span className="text-[#C99A45] font-serif-display font-bold">“</span>
              <span className="italic">{quote}</span>
              <span className="text-[#C99A45] font-serif-display font-bold">”</span>
              <span className="text-[#C99A45] text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
