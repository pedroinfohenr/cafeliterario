import React from 'react';

interface WaveDividerProps {
  color: string; // Cor da seção anterior
}

// Curva orgânica suave e moderna para diferenciar da concorrência
const SMOOTH_CURVE = 'M0,0 L2400,0 L2400,16 Q1200,44 0,16 Z';

export const SectionCurtainDivider: React.FC<WaveDividerProps> = ({ color }) => {
  return (
    <div className="wave select-none overflow-hidden" aria-hidden="true">
      <svg className="w-full h-7 sm:h-9 block" viewBox="0 0 2400 44" preserveAspectRatio="none">
        <path d={SMOOTH_CURVE} fill={color} />
      </svg>
    </div>
  );
};
