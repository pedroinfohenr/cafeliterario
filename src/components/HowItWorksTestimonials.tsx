import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Coffee
} from 'lucide-react';
import { FloatingCoffeeElements } from './FloatingCoffeeElements';
import { getSiteImage } from '../utils/imageStorage';

import depoimento1 from '../imagens/depoimento-1.png';
import depoimento2 from '../imagens/depoimento-2.png';
import depoimento3 from '../imagens/depoimento-3.png';
import depoimento4 from '../imagens/depoimento-4.png';

interface HowItWorksTestimonialsProps {
  onCtaClick: () => void;
}

const TESTIMONIAL_IMAGES = [
  { id: 'depoimento_1', src: depoimento1, alt: 'Conversas sobre um Café Literário inesquecível 1' },
  { id: 'depoimento_2', src: depoimento2, alt: 'Conversas sobre um Café Literário inesquecível 2' },
  { id: 'depoimento_3', src: depoimento3, alt: 'Conversas sobre um Café Literário inesquecível 3' },
  { id: 'depoimento_4', src: depoimento4, alt: 'Depoimento e fotos reais do Café Literário' },
];

export const HowItWorksTestimonials: React.FC<HowItWorksTestimonialsProps> = ({ onCtaClick }) => {
  const steps = [
    { num: '1', title: 'A compra é confirmada na hora' },
    { num: '2', title: 'Você recebe o link por WhatsApp e e-mail' },
    { num: '3', title: 'Abre o Drive, imprime as peças e começa a preparar o seu Café' },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [customImages] = useState<Record<string, string>>(() => {
    const loaded: Record<string, string> = {};
    TESTIMONIAL_IMAGES.forEach((t) => {
      loaded[t.id] = getSiteImage(t.id, t.src);
    });
    return loaded;
  });

  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [isMaxZoom, setIsMaxZoom] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  const total = TESTIMONIAL_IMAGES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay to keep the images passing smoothly
  useEffect(() => {
    if (isZoomOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isZoomOpen, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.targetTouches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    if (touchDeltaX > 50) {
      prevSlide();
    } else if (touchDeltaX < -50) {
      nextSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
        setIsMaxZoom(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentItem = TESTIMONIAL_IMAGES[currentIndex];
  const currentImgSrc = customImages[currentItem.id] || currentItem.src;

  return (
    <div className="relative">
      {/* ========================================================
          COMO FUNCIONA O ACESSO (3 PASSOS)
         ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#4A2819] text-[#FFF0D1] border-t-2 border-b-2 border-[#C99A45]/30 relative overflow-hidden">
        <FloatingCoffeeElements density="subtle" animated={false} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-widest text-[#C99A45] font-bold mb-2">
              Praticidade Total
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#FFF0D1] mb-3">
              Como funciona o acesso?
            </h2>
            <p className="text-sm sm:text-base text-[#F0D9AE]/90 max-w-xl mx-auto font-serif">
              Sem burocracia, sem esperar frete e sem complicações. Você compra e já começa a planejar em minutos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step) => (
              <div 
                key={step.num}
                className="bg-[#2B160F] p-6 rounded-2xl border-2 border-[#C99A45]/40 text-center shadow-xl hover:border-[#C99A45] transition-colors relative group"
              >
                <div className="w-14 h-14 rounded-full bg-[#C99A45] text-[#21140F] font-serif-display font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform border-2 border-[#8F6822]">
                  {step.num}
                </div>
                <h3 className="font-serif-display text-lg text-[#FFF0D1] mb-2 font-bold leading-snug">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CARROSSEL 3D COVERFLOW DE DEPOIMENTOS
         ======================================================== */}
      <section 
        className="py-20 sm:py-28 bg-[#2B160F] text-[#FFF0D1] relative overflow-hidden" 
        id="depoimentos"
      >
        <FloatingCoffeeElements density="subtle" animated={true} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#4A2819] text-[#FFF0D1] border border-[#C99A45] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
              <Coffee className="w-4 h-4 text-[#C99A45]" />
              Depoimentos Verificados
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#FFF0D1] mb-4">
              Veja o que os professores estão falando
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#F0D9AE]/95 max-w-2xl mx-auto font-serif">
              Prints 100% reais enviados no WhatsApp por professores que aplicaram o projeto e encantaram toda a escola.
            </p>
          </div>

          {/* ========================================================
              3D COVERFLOW
             ======================================================== */}
          <div 
            className="relative max-w-4xl mx-auto py-2 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-[480px] sm:h-[580px] md:h-[620px] flex items-center justify-center overflow-hidden perspective-deck">
              {TESTIMONIAL_IMAGES.map((item, idx) => {
                let diff = idx - currentIndex;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const isCenter = diff === 0;
                const isLeft = diff === -1;
                const isRight = diff === 1;

                let zIndex = 0;
                let opacity = 0;
                let scale = 0.6;
                let rotateDeg = 0;

                if (isCenter) {
                  zIndex = 30;
                  opacity = 1;
                  scale = 1;
                  rotateDeg = 0;
                } else if (isLeft) {
                  zIndex = 20;
                  opacity = 0.75;
                  scale = 0.88;
                  rotateDeg = -5;
                } else if (isRight) {
                  zIndex = 20;
                  opacity = 0.75;
                  scale = 0.88;
                  rotateDeg = 5;
                } else {
                  zIndex = 0;
                  opacity = 0;
                  scale = 0.5;
                }

                const imgSrc = customImages[item.id] || item.src;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (isCenter) {
                        setIsZoomOpen(true);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                    style={{
                      zIndex,
                      opacity,
                      transform: `translateX(calc(-50% + ${diff} * clamp(85px, 22vw, 220px))) translateY(-50%) scale(${scale}) rotate(${rotateDeg}deg)`,
                      transition: 'all 420ms cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                    className={`absolute top-1/2 left-1/2 w-[clamp(240px,55vw,390px)] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border-2 transition-all group ${
                      isCenter 
                        ? 'border-[#C99A45] shadow-[0_20px_50px_rgba(0,0,0,0.7)] ring-2 ring-[#C99A45]/30' 
                        : 'border-[#C99A45]/40 hover:opacity-100 hover:border-[#C99A45]'
                    }`}
                  >
                    <div className="bg-[#4A2819] p-2.5 sm:p-4 rounded-3xl flex items-center justify-center relative">
                      <img
                        src={imgSrc}
                        alt={item.alt}
                        className="w-full h-[380px] sm:h-[480px] md:h-[530px] object-contain rounded-2xl shadow-inner pointer-events-none"
                      />

                      {/* Click to zoom badge on hover */}
                      {isCenter && (
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                          <span className="bg-[#2B160F]/95 text-[#FFF0D1] px-5 py-2.5 rounded-full border border-[#C99A45] flex items-center gap-2 font-bold text-xs sm:text-sm shadow-2xl backdrop-blur-sm">
                            <ZoomIn className="w-4 h-4 text-[#C99A45]" />
                            Clique para ampliar
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Depoimento Anterior"
                className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF0D1] text-[#21140F] hover:bg-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[#C99A45] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-40"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Próximo Depoimento"
                className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFF0D1] text-[#21140F] hover:bg-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[#C99A45] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-40"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Elongated Pill Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4 mb-2">
              {TESTIMONIAL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIndex 
                      ? 'w-7 bg-[#C99A45] shadow-sm' 
                      : 'w-2 bg-[#FFF0D1]/30 hover:bg-[#FFF0D1]/60'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Social Proof Trust Bar */}
          <div className="bg-[#4A2819] border border-[#C99A45]/40 rounded-2xl p-5 sm:p-6 max-w-xl mx-auto my-14 shadow-xl text-center">
            <p className="font-serif-display font-bold text-lg sm:text-xl text-[#FFF0D1] mb-1">
              Mais de centenas de professores já realizaram seus Cafés Literários
            </p>
            <p className="text-xs sm:text-sm text-[#F0D9AE]/90 font-serif">
              Tudo pronto para imprimir e encantar sua escola, sem stress de última hora.
            </p>
          </div>

          {/* Main Call to Action Button */}
          <div className="flex flex-col items-center gap-3">
            <button onClick={onCtaClick} className="btn-primary cursor-pointer">
              QUERO MEU CAFÉ LITERÁRIO PRONTO
            </button>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#F0D9AE]/85">
              <ShieldCheck className="w-4 h-4 text-[#C99A45]" />
              <span>Compra 100% segura · Acesso imediato pelo WhatsApp e e-mail</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          FULLSCREEN HIGH-RES LIGHTBOX MODAL (ZOOM TO READ)
         ======================================================== */}
      {isZoomOpen && (
        <div 
          onClick={() => {
            setIsZoomOpen(false);
            setIsMaxZoom(false);
          }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in cursor-zoom-out"
        >
          {/* Controls */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 sm:top-5 sm:right-6 flex items-center gap-2 z-50 pointer-events-auto"
          >
            <button
              onClick={() => setIsMaxZoom(!isMaxZoom)}
              aria-label="Alternar Zoom"
              className="bg-[#4A2819] hover:bg-[#5b3220] text-[#FFF0D1] p-2.5 rounded-full border border-[#C99A45] cursor-pointer shadow-xl transition-transform hover:scale-105"
              title={isMaxZoom ? 'Ajustar à tela' : 'Zoom 100%'}
            >
              {isMaxZoom ? <ZoomOut className="w-5 h-5 text-[#C99A45]" /> : <ZoomIn className="w-5 h-5 text-[#C99A45]" />}
            </button>

            <button
              onClick={() => {
                setIsZoomOpen(false);
                setIsMaxZoom(false);
              }}
              aria-label="Fechar ampliação"
              className="bg-[#C99A45] hover:bg-[#d6aa57] text-[#21140F] p-2.5 rounded-full cursor-pointer shadow-2xl transition-transform hover:scale-105"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Modal Prev / Next Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Print anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-[#4A2819]/90 hover:bg-[#4A2819] text-[#FFF0D1] p-3 sm:p-4 rounded-full border-2 border-[#C99A45] cursor-pointer shadow-2xl z-50 transition-transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Próximo print"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-[#4A2819]/90 hover:bg-[#4A2819] text-[#FFF0D1] p-3 sm:p-4 rounded-full border-2 border-[#C99A45] cursor-pointer shadow-2xl z-50 transition-transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Image Frame in Modal */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`max-w-4xl max-h-[90vh] overflow-auto rounded-2xl border-2 border-[#C99A45] shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-[#21140F] p-2 sm:p-4 cursor-default flex flex-col items-center transition-all ${
              isMaxZoom ? 'w-full' : ''
            }`}
          >
            <img
              src={currentImgSrc}
              alt={currentItem.alt}
              className={`object-contain rounded-xl mx-auto transition-all duration-300 ${
                isMaxZoom ? 'w-auto max-h-none cursor-grab' : 'w-full h-auto max-h-[82vh]'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
