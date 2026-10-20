import React, { useState } from 'react';

interface PieceItem {
  id: string;
  tag: string;
  title: string;
  image: string;
}

const PEÇAS_LIST: PieceItem[] = [
  {
    id: '01_convite',
    tag: '#01',
    title: 'Convite Personalizado',
    image: '/imagens/01_convite.png',
  },
  {
    id: '02_cardapio',
    tag: '#02',
    title: 'Cardápio Literário de Mesa',
    image: '/imagens/02_cardapio.png',
  },
  {
    id: '03_crachas',
    tag: '#03',
    title: 'Crachás de Escritores & Leitores',
    image: '/imagens/03_crachas.png',
  },
  {
    id: '04_certificado',
    tag: '#04',
    title: 'Certificado de Participação',
    image: '/imagens/04_certificado.png',
  },
  {
    id: '05_plaquinhas',
    tag: '#05',
    title: 'Plaquinhas das Mesas dos Autores',
    image: '/imagens/05_plaquinhas.png',
  },
  {
    id: '06_marcapaginas',
    tag: '#06',
    title: 'Marca-páginas de Lembrança',
    image: '/imagens/06_marcapaginas.png',
  },
];

const DECOR_LIST: PieceItem[] = [
  {
    id: '07_painel',
    tag: '#07',
    title: 'Painel de Boas-Vindas',
    image: '/imagens/07_painel.png',
  },
  {
    id: '08_bandeirolas',
    tag: '#08',
    title: 'Bandeirolas com Versos Célebres',
    image: '/imagens/08_bandeirolas.png',
  },
  {
    id: '09_adesivos',
    tag: '#09',
    title: 'Adesivos Literários para Cadernos',
    image: '/imagens/09_adesivos.png',
  },
  {
    id: '10_mesa',
    tag: '#10',
    title: 'Centros de Mesa e Bistrô',
    image: '/imagens/10_mesa.png',
  },
  {
    id: '11_moldura',
    tag: '#11',
    title: 'Moldura para Fotos do Evento',
    image: '/imagens/11_moldura.png',
  },
];

interface CoverflowDeckProps {
  items: PieceItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const CoverflowDeck: React.FC<CoverflowDeckProps> = ({
  items,
  currentIndex,
  onSelect,
  onPrev,
  onNext,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const n = items.length;
  const currentItem = items[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) onPrev();
    else if (dx < -40) onNext();
    setTouchStartX(null);
  };

  return (
    <div className="w-full">
      <div
        className="cf relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          aria-label="Ver anterior"
          className="cf-nav prev cursor-pointer z-30"
          onClick={onPrev}
        >
          ‹
        </button>

        <div className="cf-track tall">
          {items.map((item, i) => {
            const diff = (i - currentIndex + n) % n;
            let posClass = '';
            const isCenter = diff === 0;
            if (isCenter) posClass = 'pos-center';
            else if (diff === 1) posClass = 'pos-right';
            else if (diff === n - 1) posClass = 'pos-left';

            return (
              <div
                key={item.id}
                className={`cf-slide ${posClass} group relative`}
                onClick={() => {
                  if (!isCenter) onSelect(i);
                }}
              >
                {/* Visual Oficial da Peça com a Imagem Real do Usuário */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#C99A45] bg-[#2B160F] shadow-[0_18px_30px_rgba(0,0,0,0.45)] h-[340px] sm:h-[370px] select-none p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-xl shadow-inner transition-transform duration-300 group-hover:scale-[1.01]"
                    loading="eager"
                  />

                  {/* Badge do identificador da peça */}
                  <div className="absolute top-3 left-3 bg-[#692E24] text-[#FFF0D1] font-serif-display font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-md border border-[#C99A45]/40">
                    {item.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          aria-label="Ver próximo"
          className="cf-nav next cursor-pointer z-30"
          onClick={onNext}
        >
          ›
        </button>
      </div>

      {/* Título da peça ativa */}
      <p className="cf-caption font-serif-display font-black text-xl sm:text-2xl text-[#21140F] mt-3 min-h-[30px] text-center">
        {currentItem.title}
      </p>

      {/* Bolinhas indicadoras */}
      <div className="cf-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
};

export const MaterialsShowcase: React.FC = () => {
  const [pieceIdx, setPieceIdx] = useState(0);
  const [decorIdx, setDecorIdx] = useState(0);

  return (
    <section className="section s-latte bg-[#F5E6CC] py-16 px-4 relative overflow-hidden text-[#21140F]">
      {/* Coffee Stains decorativos */}
      <svg className="stain" viewBox="0 0 120 120" style={{ width: '130px', left: '-30px', top: '60px' }} aria-hidden="true">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#5A331D" strokeWidth="5" strokeDasharray="120 6 40 10 90 4" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#5A331D" strokeWidth="1.5" opacity=".6" />
      </svg>
      <svg className="stain" viewBox="0 0 120 120" style={{ width: '110px', right: '-24px', bottom: '40px' }} aria-hidden="true">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#5A331D" strokeWidth="5" strokeDasharray="120 6 40 10 90 4" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#5A331D" strokeWidth="1.5" opacity=".6" />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <span className="font-script text-2xl sm:text-3xl text-[#8F6822] font-bold block mb-1">
            Conheça o material por dentro
          </span>
          <h2 className="font-serif-display font-black text-3xl sm:text-5xl text-[#21140F] mb-3">
            Peças do seu Café Literário
          </h2>

          {/* Flourish */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
            <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          </div>

          <p className="text-sm sm:text-base text-[#5E4332] max-w-xl mx-auto font-medium">
            Todas as peças são arquivos digitais em alta resolução prontos para impressão. Navegue e veja os detalhes:
          </p>
        </div>

        {/* 1. Carrossel 1 (de cima): Peças do seu Café Literário (6 peças reais) */}
        <div className="pt-2 pb-6">
          <CoverflowDeck
            items={PEÇAS_LIST}
            currentIndex={pieceIdx}
            onSelect={(i) => setPieceIdx(i)}
            onPrev={() => setPieceIdx((prev) => (prev === 0 ? PEÇAS_LIST.length - 1 : prev - 1))}
            onNext={() => setPieceIdx((prev) => (prev === PEÇAS_LIST.length - 1 ? 0 : prev + 1))}
          />
        </div>

        {/* 2. Carrossel 2 (de baixo): Decoração para o ambiente (5 itens reais) */}
        <div className="pt-8 pb-4 border-t border-[#C99A45]/20">
          <div className="text-center mb-6">
            <h3 className="font-serif-display font-black text-2xl sm:text-4xl text-[#21140F] mb-2">
              Decoração para o ambiente
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="h-0.5 w-6 bg-[#C99A45] rounded-full" />
              <span className="text-[#C99A45] text-xs">◆</span>
              <span className="h-0.5 w-6 bg-[#C99A45] rounded-full" />
            </div>
          </div>

          <CoverflowDeck
            items={DECOR_LIST}
            currentIndex={decorIdx}
            onSelect={(i) => setDecorIdx(i)}
            onPrev={() => setDecorIdx((prev) => (prev === 0 ? DECOR_LIST.length - 1 : prev - 1))}
            onNext={() => setDecorIdx((prev) => (prev === DECOR_LIST.length - 1 ? 0 : prev + 1))}
          />
        </div>

        {/* Rodapé da seção */}
        <p className="text-center text-sm sm:text-base text-[#8A6E55] font-semibold mt-10 max-w-lg mx-auto">
          Todas as peças são arquivos digitais: você baixa pelo Drive e imprime na sua escola quantas vezes precisar.
        </p>
      </div>
    </section>
  );
};
