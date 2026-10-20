import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const HeaderUrgency: React.FC = () => {
  const [seconds, setSeconds] = useState(600);
  const today = new Date();
  const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (total: number) => {
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="sticky top-0 z-50 bg-[#2B160F] text-[#FFF0D1] py-2.5 px-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-wide border-b border-[#C99A45]/30 shadow-md">
      <span className="flex items-center gap-2">
        <span>☕</span>
        <span>Oferta válida por tempo limitado!</span>
      </span>
      <div className="bg-[#C99A45] text-[#21140F] px-2.5 py-0.5 rounded-md font-mono font-extrabold flex items-center gap-1 shadow-sm text-xs">
        <Clock className="w-3 h-3" />
        <span>{formatTimer(seconds)}</span>
      </div>
    </div>
  );
};
