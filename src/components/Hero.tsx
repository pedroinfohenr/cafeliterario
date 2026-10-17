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
  const cupRef = useRef<SVGSVGElement>(null);

  const [heroImg] = useState<string>(() =>
    getSiteImage('hero', '/imagens/hero.webp')
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
      stack.style.setProperty('--ry', `${x * 20}deg`);
      stack.style.setProperty('--rx', `${-y * 14}deg`);
    };

    const handlePointerLeave = () => {
      stack.style.setProperty('--ry', '0deg');
      stack.style.setProperty('--rx', '0deg');
    };

    scene.addEventListener('pointermove', handlePointerMove);
    scene.addEventListener('pointerleave', handlePointerLeave);

    const handleScroll = () => {
      const y = Math.min(window.scrollY, 600) / 600;
      stack.style.setProperty('--rx', `${y * 14}deg`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const cup = cupRef.current;
    if (!cup) return;

    const timer = setTimeout(() => {
      cup.classList.add('play');
    }, 450);

    const handleClick = () => {
      cup.classList.remove('play');
      void cup.getBoundingClientRect();
      cup.classList.add('play');
    };

    cup.addEventListener('click', handleClick);

    const interval = setInterval(() => {
      const r = cup.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        cup.classList.remove('play');
        void cup.getBoundingClientRect();
        cup.classList.add('play');
      }
    }, 16000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      cup.removeEventListener('click', handleClick);
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
      <div className="beans" aria-hidden="true">
        {[
          { left: '8%', top: '65%', dur: '12s', del: '-2s', s: 0.9 },
          { left: '22%', top: '75%', dur: '15s', del: '-7s', s: 0.7 },
          { left: '38%', top: '60%', dur: '11s', del: '-4s', s: 1.1 },
          { left: '62%', top: '80%', dur: '14s', del: '-9s', s: 0.8 },
          { left: '78%', top: '70%', dur: '13s', del: '-3s', s: 1.0 },
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

        {/* 3D Mockup Scene with Interactive Cup & Cookies */}
        <div ref={sceneRef} className="mock-scene mb-6" id="mockScene">
          <div className="mock-glow" aria-hidden="true" />

          {/* Clean Mockup Stack */}
          <div
            ref={stackRef}
            className="mock-stack relative"
          >
            <img
              className="mock-product rounded-2xl"
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

          {/* Interactive SVG Coffee Cup with Steamed Milk Jug & Blooming Heart */}
          <svg
            ref={cupRef}
            className="cup-svg"
            id="heroCup"
            viewBox="0 0 220 230"
            role="img"
            aria-label="Xícara de café com leite artesanal"
          >
            <defs>
              <linearGradient id="gCup" x1="0" x2="1">
                <stop offset="0" stopColor="#E9DCC6" />
                <stop offset=".45" stopColor="#FFFDF8" />
                <stop offset="1" stopColor="#D9C7A8" />
              </linearGradient>
              <linearGradient id="gJug" x1="0" x2="1">
                <stop offset="0" stopColor="#9AA3AB" />
                <stop offset=".4" stopColor="#F1F4F6" />
                <stop offset="1" stopColor="#A7B0B8" />
              </linearGradient>
              <radialGradient id="gCoffee" cx=".5" cy=".4">
                <stop offset="0" stopColor="#5A331D" />
                <stop offset=".7" stopColor="#3A1E10" />
                <stop offset="1" stopColor="#241108" />
              </radialGradient>
              <filter id="crema" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Steaming jug pouring milk */}
            <g className="jug-layer">
              <g className="jug">
                <path d="M12 28 C8 48 14 62 30 66" fill="none" stroke="#7A838B" strokeWidth="5" strokeLinecap="round" />
                <path d="M26 14 L68 18 C74 18 78 22 76 30 L66 66 C64 74 58 78 50 78 L32 78 C24 78 18 72 20 64 L26 14 Z" fill="url(#gJug)" stroke="#4A525A" strokeWidth="2" />
                <path d="M68 18 L82 24 L72 32 Z" fill="#D3DBE2" stroke="#4A525A" strokeWidth="1.5" />
                <ellipse cx="46" cy="20" rx="20" ry="6" fill="#4A525A" opacity=".35" />
                <path d="M34 22 L38 68" stroke="#FFF" strokeWidth="3" opacity=".6" strokeLinecap="round" />
              </g>
              <path className="milk-stream" d="M168 28 C158 52 144 76 136 108" fill="none" stroke="#FFFDF8" strokeWidth="7" strokeLinecap="round" />
              <ellipse className="pour-splash" cx="136" cy="110" rx="14" ry="4" fill="#FFFDF8" opacity=".8" />
            </g>

            {/* Cup Shadow */}
            <ellipse cx="110" cy="204" rx="92" ry="14" fill="rgba(0,0,0,.35)" />
            {/* Saucer */}
            <ellipse cx="110" cy="192" rx="88" ry="16" fill="#D9C7A8" stroke="#C4AD88" strokeWidth="2" />
            <ellipse cx="110" cy="190" rx="78" ry="12" fill="#EFE5D2" />
            <ellipse cx="110" cy="188" rx="52" ry="7" fill="#C4AD88" opacity=".5" />
            {/* Handle */}
            <path d="M168 126 C202 124 206 166 164 170" fill="none" stroke="url(#gCup)" strokeWidth="16" strokeLinecap="round" />
            <path d="M168 126 C194 125 198 165 166 168" fill="none" stroke="#D9C7A8" strokeWidth="6" strokeLinecap="round" />
            {/* Body */}
            <path d="M42 108 C44 158 64 184 110 184 C156 184 176 158 178 108 Z" fill="url(#gCup)" stroke="#C4AD88" strokeWidth="2" />
            <path d="M52 118 C56 156 72 176 110 178" fill="none" stroke="#FFF" strokeWidth="4" opacity=".5" strokeLinecap="round" />
            {/* Rim & Coffee */}
            <ellipse cx="110" cy="108" rx="68" ry="18" fill="#D9C7A8" stroke="#C4AD88" strokeWidth="2" />
            <ellipse cx="110" cy="108" rx="64" ry="15" fill="#EFE5D2" />
            <ellipse cx="110" cy="109" rx="58" ry="12" fill="url(#gCoffee)" />
            <ellipse cx="110" cy="109" rx="56" ry="11" fill="#C48046" opacity=".22" filter="url(#crema)" />

            {/* Blooming Heart Latte Art */}
            <g className="art">
              <path
                className="heart-shape"
                d="M110 115 C108 111 96 102 96 98 C96 94 99 91 103 91 C106 91 109 93 110 95 C111 93 114 91 117 91 C121 91 124 94 124 98 C124 102 112 111 110 115 Z"
                fill="#FFFDF8"
                stroke="#EBD9BA"
                strokeWidth="1.2"
              />
              <path d="M110 92 L110 116" stroke="#C48046" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
            </g>

            {/* Dynamic Rising Steam Ribbons */}
            <g className="steam" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round">
              <path className="s1" d="M96 92 C90 76 102 64 94 48 C88 36 94 24 90 14" opacity=".6" />
              <path className="s2" d="M110 90 C116 72 106 60 114 42 C120 28 112 18 116 8" opacity=".8" />
              <path className="s3" d="M124 92 C130 78 118 66 126 50 C132 38 124 26 128 16" opacity=".55" />
            </g>
          </svg>

          {/* Floating Cookies in Mockup Scene */}
          <svg className="cookie c1" viewBox="0 0 90 90" aria-hidden="true">
            <ellipse cx="46" cy="48" rx="38" ry="36" fill="#C98A45" />
            <ellipse cx="44" cy="44" rx="38" ry="36" fill="#EBC284" />
            <g fill="#5A331D">
              <circle cx="32" cy="30" r="4.5" />
              <circle cx="56" cy="32" r="5" />
              <circle cx="42" cy="46" r="4" />
              <circle cx="62" cy="52" r="4.5" />
              <circle cx="28" cy="56" r="4" />
              <circle cx="48" cy="64" r="3.5" />
            </g>
          </svg>

          <svg className="cookie c2" viewBox="0 0 100 70" aria-hidden="true">
            <rect x="4" y="6" width="92" height="58" rx="10" fill="#C98A45" />
            <rect x="4" y="2" width="92" height="58" rx="10" fill="#EBC284" />
            <rect x="12" y="10" width="76" height="42" rx="6" fill="none" stroke="#D4A262" strokeWidth="2" strokeDasharray="4 5" />
            <g fill="#C98A45">
              <circle cx="30" cy="24" r="2.5" />
              <circle cx="50" cy="24" r="2.5" />
              <circle cx="70" cy="24" r="2.5" />
              <circle cx="30" cy="40" r="2.5" />
              <circle cx="50" cy="40" r="2.5" />
              <circle cx="70" cy="40" r="2.5" />
            </g>
          </svg>
        </div>

        {/* Product Name Badge */}
        <p className="font-serif-display font-black text-xl sm:text-2xl text-[#C99A45] mb-6">
          Kit Café Literário Vintage
        </p>

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
        <div className="inline-flex items-center gap-6 animate-marquee font-serif italic text-xs sm:text-sm text-[#F0D9AE]">
          {[...QUOTES, ...QUOTES].map((quote, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-[#FFF0D1] transition-colors">{quote}</span>
              <span className="text-[#C99A45] font-black not-italic text-xs">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
