import React, { useEffect, useRef, useState } from 'react';
import { Feather, ShieldCheck, Sparkles } from 'lucide-react';
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
    // Parallax Tilt 3D suave no Mockup
    const scene = sceneRef.current;
    const stack = stackRef.current;
    if (!scene || !stack) return;

    const handlePointerMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.setProperty('--ry', `${x * 12}deg`);
      stack.style.setProperty('--rx', `${-y * 10}deg`);
    };

    const handlePointerLeave = () => {
      stack.style.setProperty('--ry', '0deg');
      stack.style.setProperty('--rx', '0deg');
    };

    scene.addEventListener('pointermove', handlePointerMove);
    scene.addEventListener('pointerleave', handlePointerLeave);

    const handleScroll = () => {
      const y = Math.min(window.scrollY, 600) / 600;
      stack.style.setProperty('--rx', `${y * 8}deg`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headlineWords = "Seu Café Literário pronto, do sarau de abertura à última poesia".split(" ");

  return (
    <section className="hero relative bg-[#26130D] text-[#FFF0D1] pb-0 pt-0 overflow-hidden text-center">
      {/* Barra de acabamento superior em ouro fosco acetinado */}
      <div className="w-full h-1 bg-gradient-to-r from-[#26130D] via-[#C99A45]/80 to-[#26130D]" aria-hidden="true" />

      {/* Partículas sutis de brilho editorial */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute w-72 h-72 rounded-full bg-[#C99A45]/10 filter blur-3xl -top-20 -left-20" />
        <div className="absolute w-80 h-80 rounded-full bg-[#C99A45]/10 filter blur-3xl top-1/3 -right-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 pt-8 pb-14">
        {/* Kicker script com a mesma fonte artesanal do mock-tag (Caveat / font-script) */}
        <p className="font-script hand text-2xl sm:text-3xl text-[#C99A45] mb-3 font-bold flex items-center justify-center gap-2.5">
          <Feather className="w-5 h-5 text-[#C99A45]" />
          <span>Para professores de Língua Portuguesa e Literatura</span>
        </p>

        {/* Título Principal sem dourado em 'última poesia' */}
        <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF0D1] max-w-3xl mx-auto mb-5 leading-[1.12]">
          Seu Café Literário pronto, do sarau de abertura à última poesia
        </h1>

        {/* Chips de Destaque com design refinado */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-9">
          <span className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 border border-[#C99A45]/40 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span>
            Roteiro completo do sarau
          </span>
          <span className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 border border-[#C99A45]/40 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span>
            25 peças literárias prontas para imprimir
          </span>
          <span className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#21140F] bg-[#FFF0D1] rounded-full px-4 py-2 border border-[#C99A45]/40 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span>
            Fundamental 2 e Ensino Médio
          </span>
        </div>

        {/* 3D Mockup Scene ampliada com destaque total */}
        <div ref={sceneRef} className="mock-scene max-w-2xl sm:max-w-3xl mx-auto mb-6" id="mockScene">
          <div className="mock-glow" aria-hidden="true" />

          {/* Mockup Stack */}
          <div
            ref={stackRef}
            className="mock-stack relative"
          >
            <img
              className="mock-product rounded-2xl w-full h-auto max-h-[580px] object-contain mx-auto transition-transform duration-300"
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

          <span className="mock-tag font-script shadow-lg">
            Tudo pronto pra imprimir
          </span>
        </div>

        {/* Subtítulo oficial posicionado embaixo da imagem do Hero */}
        <p className="text-base sm:text-lg text-[#F0D9AE]/95 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Roteiro passo a passo, peças para imprimir e decoração completa para montar um Café Literário que a escola inteira vai aplaudir de pé, sem passar madrugadas planejando do zero.
        </p>

        {/* Botão de Ação Principal: Verde com Brilho, sem pulsação, fonte Montserrat */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15803D] text-white font-montserrat font-black text-base sm:text-lg py-5 px-8 sm:px-12 rounded-2xl shadow-[0_0_35px_rgba(34,197,94,0.65)] hover:shadow-[0_0_50px_rgba(34,197,94,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-t-2 border-emerald-300/60 tracking-wider"
          >
            <span>QUERO MEU CAFÉ LITERÁRIO PRONTO</span>
          </button>
          
          <div className="inline-flex items-center gap-1.5 text-xs text-[#F0D9AE]/85">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Compra 100% segura · Acesso imediato no seu e-mail</span>
          </div>
        </div>

        {/* 4 Cards Grid com acabamento de pergaminho editorial */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto mt-10">
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center border-2 border-[#C99A45]/30 shadow-[0_6px_16px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-transform">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Roteiro</b>
            <span className="text-xs font-bold text-[#8C6A54]">passo a passo</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center border-2 border-[#C99A45]/30 shadow-[0_6px_16px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-transform">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Convite</b>
            <span className="text-xs font-bold text-[#8C6A54]">e cardápio prontos</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center border-2 border-[#C99A45]/30 shadow-[0_6px_16px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-transform">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">Decoração</b>
            <span className="text-xs font-bold text-[#8C6A54]">para imprimir</span>
          </div>
          <div className="bg-[#FFF0D1] text-[#21140F] rounded-2xl p-4 text-center border-2 border-[#C99A45]/30 shadow-[0_6px_16px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-transform">
            <b className="block font-serif-display font-black text-xl text-[#692E24] leading-tight">BNCC</b>
            <span className="text-xs font-bold text-[#8C6A54]">alinhado ao currículo</span>
          </div>
        </div>
      </div>

      {/* Faixa Marquee de Citações com acabamento dourado elegante */}
      <div className="w-full bg-[#1A0C08] border-t border-b border-[#C99A45]/30 py-3.5 overflow-hidden whitespace-nowrap relative select-none">
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
