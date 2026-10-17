import React, { useState } from 'react';
import { HeaderUrgency } from './components/HeaderUrgency';
import { Hero } from './components/Hero';
import { BenefitsPainPoints } from './components/BenefitsPainPoints';
import { TimelineSteps } from './components/TimelineSteps';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { AudienceGarantias } from './components/AudienceGarantias';
import { BonusesSection } from './components/BonusesSection';
import { PricingSection } from './components/PricingSection';
import { HowItWorksTestimonials } from './components/HowItWorksTestimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

/**
 * CONFIGURAÇÃO DE CHECKOUT EXTERNO:
 * Se você tiver links da Kiwify, Hotmart, Braip, Monetizze ou Eduzz,
 * basta preencher as constantes abaixo.
 * Se mantiver vazio (""), a página abrirá o modal interativo com PIX Copia e Cola e Cartão.
 */
export const CHECKOUT_URL_BASICO = '';
export const CHECKOUT_URL_COMPLETO = '';

// Helper to append UTMs and fire InitiateCheckout event
declare global {
  interface Window {
    appendCurrentUtms?: (url: string) => string;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'basico' | 'completo'>('completo');

  const trackCheckout = (pkg: 'basico' | 'completo') => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: pkg === 'completo' ? 'Pacote Completo Café Literário' : 'Pacote Básico Café Literário',
        value: pkg === 'completo' ? 19.90 : 10.00,
        currency: 'BRL',
      });
    }
  };

  const getUrlWithUtms = (url: string) => {
    if (typeof window !== 'undefined' && typeof window.appendCurrentUtms === 'function') {
      return window.appendCurrentUtms(url);
    }
    return url;
  };

  // Triggered by "Quero o Completo" or hero/benefits CTA
  const handleOpenCompleteCheckout = () => {
    trackCheckout('completo');
    if (CHECKOUT_URL_COMPLETO) {
      window.location.href = getUrlWithUtms(CHECKOUT_URL_COMPLETO);
      return;
    }
    setSelectedPackage('completo');
    setIsCheckoutOpen(true);
  };

  // Triggered by "Quero o Básico"
  const handleSelectPackage = (pkg: 'basico' | 'completo') => {
    trackCheckout(pkg);
    if (pkg === 'basico' && CHECKOUT_URL_BASICO) {
      window.location.href = getUrlWithUtms(CHECKOUT_URL_BASICO);
      return;
    }
    if (pkg === 'completo' && CHECKOUT_URL_COMPLETO) {
      window.location.href = getUrlWithUtms(CHECKOUT_URL_COMPLETO);
      return;
    }
    setSelectedPackage(pkg);
    setIsCheckoutOpen(true);
  };

  // Smooth scroll to pricing section or direct checkout
  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenCompleteCheckout();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B160F] text-[#FFF0D1] selection:bg-[#C99A45] selection:text-[#21140F]">
      {/* 1. Urgency Countdown & Striped Awning Bar */}
      <HeaderUrgency />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onCtaClick={handleScrollToPricing} />

        {/* 3. Quick Features, Marquee & Pain Points Parchment */}
        <BenefitsPainPoints onCtaClick={handleScrollToPricing} />

        {/* 4. Timeline: 6 Steps */}
        <TimelineSteps />

        {/* 5. Interactive Showcase: Peças & Decoração */}
        <MaterialsShowcase />

        {/* 6. Segmentation & Lifetime Guarantees */}
        <AudienceGarantias />

        {/* 7. 4 Bonuses (R$ 110,60 Grátis) */}
        <BonusesSection />

        {/* 8. Pricing Section (Básico R$ 10 / Completo R$ 19,90) */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* 9. 3 Steps & Testimonials WhatsApp Carousel */}
        <HowItWorksTestimonials onCtaClick={handleScrollToPricing} />

        {/* 10. FAQ Accordion */}
        <FAQSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPackage={selectedPackage}
        onSwitchPackage={setSelectedPackage}
      />
    </div>
  );
}
