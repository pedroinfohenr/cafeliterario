import React, { useState, useEffect } from 'react';
import { ShieldCheck, Feather } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [heroImage, setHeroImage] = useState<string>('/hero.png');

  useEffect(() => {
    // Check if the user loaded the image in their browser session
    const saved = localStorage.getItem('cafe_literario_hero_img');
    if (saved) {
      setHeroImage(saved);
      // Auto-persist to server in background so other visitors also see it
      fetch('/api/save-hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: saved }),
      }).catch(() => {});
    }
  }, []);

  return (
    <section className="bg-[#2B160F] text-[#FFF0D1] pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Kicker script (Caveat 700 - Dourado Envelhecido) */}
        <p className="hand text-2xl sm:text-3xl text-[#C99A45] mb-2 font-bold flex items-center justify-center gap-2">
          <Feather className="w-5 h-5 text-[#C99A45]" />
          <span>Para professores de Língua Portuguesa e Literatura</span>
        </p>

        {/* H1 Main Headline (Fraunces 900 - Creme Vintage) */}
        <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF0D1] max-w-3xl mx-auto mb-6 leading-[1.08]">
          Seu Café Literário pronto, do sarau de abertura à{' '}
          <span className="text-[#C99A45]">última poesia</span>
        </h1>

        {/* Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="bg-[#FFF0D1] text-[#21140F] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span> Roteiro completo do sarau
          </span>
          <span className="bg-[#FFF0D1] text-[#21140F] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span> 25 peças literárias prontas para imprimir
          </span>
          <span className="bg-[#FFF0D1] text-[#21140F] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="text-[#692E24] font-black">✓</span> Fundamental 2 e Ensino Médio
          </span>
        </div>

        {/* Hero Mockup Image (Fixed, Zero upload/delete controls for visitors) */}
        <div className="max-w-[800px] mx-auto my-6 relative">
          {/* Floating Sticker (Dourado Envelhecido #C99A45) */}
          <div className="absolute -top-4 right-2 sm:right-6 bg-[#C99A45] text-[#21140F] hand text-xl sm:text-2xl px-4 py-1 rounded-xl shadow-lg transform rotate-3 z-20 border border-[#8F6822]">
            Tudo pronto pra imprimir
          </div>

          <div className="rounded-2xl overflow-hidden p-2 sm:p-4">
            <img
              src={heroImage}
              alt="Kit Café Literário Vintage"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/hero.svg')) {
                  target.src = '/hero.svg';
                }
              }}
              className="w-full h-auto max-h-[580px] object-contain mx-auto rounded-xl drop-shadow-[0_16px_36px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Lead text (Bege Pergaminho) */}
        <p className="text-base sm:text-lg text-[#F0D9AE] max-w-2xl mx-auto my-7 font-medium leading-relaxed">
          Roteiro passo a passo, peças para imprimir e decoração completa para montar um Café Literário que a escola inteira vai aplaudir de pé, sem passar madrugadas planejando do zero.
        </p>

        {/* CTA Button (Dourado Envelhecido) */}
        <div className="flex flex-col items-center gap-3">
          <button onClick={onCtaClick} className="btn-primary">
            QUERO MEU CAFÉ LITERÁRIO PRONTO
          </button>
          
          <div className="inline-flex items-center gap-1.5 text-xs text-[#F0D9AE]/85">
            <ShieldCheck className="w-4 h-4 text-[#C99A45]" />
            <span>Compra 100% segura · Acesso imediato no seu e-mail</span>
          </div>
        </div>

      </div>
    </section>
  );
};
