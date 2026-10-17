import React from 'react';

interface WaveDividerProps {
  color: string; // Cor da seção anterior
}

const WAVE_PATH =
  'M0 0 H2400 V14 C2350 30 2250 30 2200 14 C2150 -2 2050 -2 2000 14 C1950 30 1850 30 1800 14 C1750 -2 1650 -2 1600 14 C1550 30 1450 30 1400 14 C1350 -2 1250 -2 1200 14 C1150 30 1050 30 1000 14 C950 -2 850 -2 800 14 C750 30 650 30 600 14 C550 -2 450 -2 400 14 C350 30 250 30 200 14 C150 -2 50 -2 0 14 Z';

export const SectionCurtainDivider: React.FC<WaveDividerProps> = ({ color }) => {
  return (
    <div className="wave select-none" aria-hidden="true">
      <svg className="w2" viewBox="0 0 2400 38" preserveAspectRatio="none">
        <path d={WAVE_PATH} transform="translate(0 8)" fill={color} />
      </svg>
      <svg className="w1" viewBox="0 0 2400 38" preserveAspectRatio="none">
        <path d={WAVE_PATH} fill={color} />
      </svg>
    </div>
  );
};
