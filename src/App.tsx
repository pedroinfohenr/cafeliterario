import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { BenefitsPainPoints } from './components/BenefitsPainPoints';
import { TimelineSteps } from './components/TimelineSteps';
import { AudienceGarantias } from './components/AudienceGarantias';
import { BonusesSection } from './components/BonusesSection';
import { PricingSection } from './components/PricingSection';
import { HowItWorksTestimonials } from './components/HowItWorksTestimonials';
import { FAQSection } from './components/FAQSection';
import { UpsellModal } from './components/UpsellModal';
import { SectionCurtainDivider } from './components/SectionCurtainDivider';
import { SocialProofToast } from './components/SocialProofToast';

/**
 * LINKS OFICIAIS DE CHECKOUT WIAPY
 */
export const CHECKOUT_URL_BASICO = 'https://pay.wiapy.com/6ad2d7dbc8bdfc2949a16756';
export const CHECKOUT_URL_COMPLETO_PROMO = 'https://pay.wiapy.com/AeOPv8-Bq5A';
export const CHECKOUT_URL_COMPLETO = 'https://pay.wiapy.com/6ad2d764b11ba1ecaf4f631e';

declare global {
  interface Window {
    appendCurrentUtms?: (url: string) => string;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function App() {
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);

  // Trilha de grãos de café seguindo o mouse no desktop
  useEffect(() => {
    let last = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      const b = document.createElement('span');
      b.className = 'trail-bean';
      b.style.left = `${e.clientX - 5}px`;
      b.style.top = `${e.clientY - 7}px`;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 950);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const getUrlWithUtms = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.appendCurrentUtms === 'function') {
      return window.appendCurrentUtms(url);
    }
    return url;
  };

  const trackCheckout = (name: string, value: number) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: name,
        value: value,
        currency: 'BRL',
      });
    }
  };

  const handleSelectCompleto = () => {
    trackCheckout('Pacote Completo Café Literário', 19.90);
    window.location.href = getUrlWithUtms(CHECKOUT_URL_COMPLETO);
  };

  const handleSelectBasico = () => {
    setIsUpsellOpen(true);
  };

  const handleAcceptPromo = () => {
    trackCheckout('Pacote Completo Oferta R$ 15,90', 15.90);
    window.location.href = getUrlWithUtms(CHECKOUT_URL_COMPLETO_PROMO);
  };

  const handleDeclinePromo = () => {
    trackCheckout('Pacote Básico Café Literário', 10.00);
    window.location.href = getUrlWithUtms(CHECKOUT_URL_BASICO);
  };

  const handleScrollToPricing = () => {
    const el = document.getElementById('planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSelectCompleto();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B160F] text-[#FFF0D1] selection:bg-[#C99A45] selection:text-[#21140F]">
      {/* Notificação Popup de Prova Social */}
      <SocialProofToast />

      <main className="flex-1">
        {/* 2. Hero Section (bg #2B160F) */}
        <Hero onCtaClick={handleScrollToPricing} />

        {/* Onda de café fluida entrando na Lousa (bg #F5E6CC) com a cor exata do Hero #2B160F */}
        <div className="relative">
          <SectionCurtainDivider color="#2B160F" />
          <BenefitsPainPoints onCtaClick={handleScrollToPricing} />
        </div>

        {/* Onda de café fluida entrando na Linha do Tempo (bg #FFF0D1) com a cor da Lousa #F5E6CC */}
        <div className="relative">
          <SectionCurtainDivider color="#F5E6CC" />
          <TimelineSteps />
        </div>

        {/* Turmas e Garantias (bg #FFF0D1) */}
        <AudienceGarantias />

        {/* 7. 4 Bônus Exclusivos (bg #4A2819) com transição fluida do creme #FFF0D1 */}
        <div className="relative">
          <SectionCurtainDivider color="#FFF0D1" />
          <BonusesSection />
        </div>

        {/* Onda de café fluida entrando na Oferta (bg #2B160F) com a cor dos Bônus #4A2819 */}
        <div className="relative">
          <SectionCurtainDivider color="#4A2819" />
          <PricingSection
            onSelectPackage={(pkg) => {
              if (pkg === 'basico') {
                handleSelectBasico();
              } else {
                handleSelectCompleto();
              }
            }}
          />
        </div>

        {/* Onda de café fluida entrando no Passo a Passo & Depoimentos */}
        <div className="relative">
          <SectionCurtainDivider color="#2B160F" />
          <HowItWorksTestimonials onCtaClick={handleScrollToPricing} />
        </div>

        {/* Onda de café fluida entrando no FAQ (bg #FFF0D1) */}
        <div className="relative">
          <SectionCurtainDivider color="#2B160F" />
          <FAQSection />
        </div>
      </main>

      {/* Pop-up Irresistível de Upsell (Completo por R$ 15,90 ao clicar no Básico) */}
      <UpsellModal
        isOpen={isUpsellOpen}
        onClose={() => setIsUpsellOpen(false)}
        onAcceptPromo={handleAcceptPromo}
        onDeclinePromo={handleDeclinePromo}
      />
    </div>
  );
}
