import React from 'react';

interface FloatingCoffeeElementsProps {
  animated?: boolean;
  density?: 'hero' | 'subtle';
  className?: string;
}

/**
 * Elementos decorativos literários e cafeeiros que flutuam no fundo:
 * Grãos de café, folhas do cafeeiro, estrelinhas douradas e arabescos
 */
export const FloatingCoffeeElements: React.FC<FloatingCoffeeElementsProps> = ({
  animated = true,
  density = 'subtle',
  className = '',
}) => {
  const isHero = density === 'hero';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      
      {/* 1. Grão de Café Superior Esquerdo */}
      <div 
        className={`absolute top-10 left-[4%] sm:left-[8%] opacity-30 sm:opacity-45 ${
          animated ? 'animate-float-slow' : ''
        }`}
        style={{ animationDelay: '0s' }}
      >
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-[#C99A45]">
          <ellipse cx="17" cy="13" rx="15" ry="11" fill="#441A13" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 17 13)" />
          <path d="M7 16 C 13 10, 21 16, 27 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Folha de Cafeeiro Superior Direita */}
      <div 
        className={`absolute top-16 right-[5%] sm:right-[10%] opacity-25 sm:opacity-40 ${
          animated ? 'animate-float-slow-reverse' : ''
        }`}
        style={{ animationDelay: '1.5s' }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="text-[#C99A45]">
          <path d="M6 36 C 6 20, 22 6, 36 6 C 36 22, 20 36, 6 36 Z" fill="#3D1F13" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 36 Q 21 21 36 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M16 26 Q 23 23 26 21" stroke="currentColor" strokeWidth="0.8" />
          <path d="M12 21 Q 19 18 21 15" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 3. Estrelinha / Brilho Vintage Esquerda */}
      <div 
        className={`absolute top-1/3 left-[2%] sm:left-[5%] text-[#C99A45] opacity-25 sm:opacity-50 text-xl font-serif ${
          animated ? 'animate-pulse-gently' : ''
        }`}
        style={{ animationDelay: '0.8s' }}
      >
        ✦
      </div>

      {/* 4. Grão de Café Meio Direita */}
      <div 
        className={`absolute top-[48%] right-[3%] sm:right-[7%] opacity-25 sm:opacity-40 ${
          animated ? 'animate-float-slow' : ''
        }`}
        style={{ animationDelay: '2.5s' }}
      >
        <svg width="30" height="22" viewBox="0 0 34 26" fill="none" className="text-[#C99A45]">
          <ellipse cx="17" cy="13" rx="14" ry="10" fill="#36150D" stroke="currentColor" strokeWidth="1.5" transform="rotate(25 17 13)" />
          <path d="M8 11 C 14 16, 20 10, 26 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 5. Arabesco / Ramo Café Inferior Esquerdo */}
      <div 
        className={`absolute bottom-20 left-[5%] sm:left-[9%] opacity-20 sm:opacity-35 ${
          animated ? 'animate-float-slow-reverse' : ''
        }`}
        style={{ animationDelay: '3.2s' }}
      >
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none" className="text-[#C99A45]">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <path d="M14 26 C14 18, 22 14, 26 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="26" cy="14" r="3" fill="#692E24" stroke="currentColor" strokeWidth="1" />
          <circle cx="14" cy="26" r="3" fill="#692E24" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* 6. Estrelinha / Brilho Vintage Direita */}
      <div 
        className={`absolute bottom-24 right-[4%] sm:right-[8%] text-[#C99A45] opacity-25 sm:opacity-45 text-2xl font-serif ${
          animated ? 'animate-pulse-gently' : ''
        }`}
        style={{ animationDelay: '2s' }}
      >
        ✧
      </div>

      {/* Elementos extras específicos para o HERO (mais abundantes e dinâmicos) */}
      {isHero && (
        <>
          {/* Vapor de café suave subindo */}
          <div className="absolute top-28 left-[15%] hidden md:block opacity-25 text-[#C99A45] animate-steam">
            <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
              <path d="M6 34 C12 28, 0 22, 8 16 C16 10, 4 4, 10 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute top-32 right-[18%] hidden md:block opacity-25 text-[#C99A45] animate-steam" style={{ animationDelay: '1.8s' }}>
            <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
              <path d="M16 34 C10 28, 22 22, 14 16 C6 10, 18 4, 12 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          {/* Livro antigo estilizado flutuando sutilmente */}
          <div 
            className="absolute top-[65%] left-[2%] sm:left-[6%] opacity-20 sm:opacity-30 hidden sm:block animate-float-slow"
            style={{ animationDelay: '4s' }}
          >
            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" className="text-[#C99A45]">
              <path d="M22 6 C16 4, 6 6, 2 8 L2 28 C6 26, 16 24, 22 26 C28 24, 38 26, 42 28 L42 8 C38 6, 28 4, 22 6 Z" fill="#441A13" stroke="currentColor" strokeWidth="1.2" />
              <line x1="22" y1="6" x2="22" y2="26" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Grão de café adicional central superior */}
          <div 
            className="absolute top-6 left-[48%] opacity-25 sm:opacity-35 animate-float-slow-reverse"
            style={{ animationDelay: '1.2s' }}
          >
            <svg width="26" height="20" viewBox="0 0 34 26" fill="none" className="text-[#C99A45]">
              <ellipse cx="17" cy="13" rx="14" ry="10" fill="#3D1F13" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 12 C 14 17, 20 9, 26 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}

    </div>
  );
};
