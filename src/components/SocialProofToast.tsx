import React, { useState, useEffect } from 'react';

const ENTRIES = [
  { name: 'Juliana Ribeiro', plan: 'Plano Completo', time: 'agora' },
  { name: 'Marcos Andrade', plan: 'Plano Básico', time: 'há 2 min' },
  { name: 'Camila Souza', plan: 'Plano Completo', time: 'há 5 min' },
  { name: 'Rafael Lima', plan: 'Plano Completo', time: 'há 8 min' },
  { name: 'Fernanda Costa', plan: 'Plano Básico', time: 'há 12 min' },
  { name: 'Patrícia Alencar', plan: 'Plano Completo', time: 'há 15 min' },
];

export const SocialProofToast: React.FC = () => {
  const [current, setCurrent] = useState<(typeof ENTRIES)[0] | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let idx = 0;

    const showNext = () => {
      if (dismissed) return;
      setCurrent(ENTRIES[idx % ENTRIES.length]);
      idx++;
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 5000);
    };

    const firstTimer = setTimeout(showNext, 4000);
    const interval = setInterval(showNext, 14000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (!current || dismissed) return null;

  return (
    <div
      className={`social-proof ${show ? 'show' : ''}`}
      onClick={() => setShow(false)}
      role="status"
      aria-live="polite"
    >
      <div className="sp-avatar font-serif-display font-black">
        {current.name.charAt(0)}
      </div>
      <div>
        <div className="sp-text">
          <strong>{current.name}</strong> comprou o {current.plan}
        </div>
        <div className="sp-meta">
          <span className="sp-dot" />
          <span>{current.time}</span>
        </div>
      </div>
      <button
        className="sp-close"
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
          setShow(false);
        }}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  );
};
