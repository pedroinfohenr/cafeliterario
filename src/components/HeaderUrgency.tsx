import React from 'react';

export const HeaderUrgency: React.FC = () => {
  const today = new Date();
  const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top bar (Marrom Escuro & Creme Vintage) */}
      <div className="bg-[#2B160F] text-[#FFF0D1] py-2.5 px-4 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide border-b border-[#4A2819]">
        <span className="flex items-center gap-1.5 text-[#FFF0D1]">
          <span>☕</span>
          <span>Oferta Limitada Só Até Hoje ({dateFormatted})</span>
        </span>
      </div>

      {/* Classic Awning (Vinho Clássico & Creme Vintage) */}
      <div className="awning" />
    </header>
  );
};
