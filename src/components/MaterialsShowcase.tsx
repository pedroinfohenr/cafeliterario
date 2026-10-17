import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles,
  Maximize2,
  X,
  Layers
} from 'lucide-react';

import centroMesaImg from '../imagens/10_CENTRO_DE_MESA_E_BISTRO.png';
import molduraImg from '../imagens/11_MOLDURA_PARA_FOTOS.png';

// Eagerly map all images in src/imagens to dynamically resolve any new files (01-09)
const imageModules = import.meta.glob<{ default: string }>('../imagens/*.{png,jpg,jpeg,webp,svg}', { eager: true });

function resolveMaterialImage(keywords: string[], fallback?: string): string | undefined {
  for (const [path, mod] of Object.entries(imageModules)) {
    const filename = path.toLowerCase();
    for (const kw of keywords) {
      if (filename.includes(kw.toLowerCase())) {
        return mod.default;
      }
    }
  }
  return fallback;
}

interface PieceItem {
  number: string;
  expectedFilename: string;
  title: string;
  category: string;
  desc: string;
  image?: string;
  isReal: boolean;
}

export const MaterialsShowcase: React.FC = () => {
  const allItems: PieceItem[] = [
    {
      number: '10',
      expectedFilename: '10_CENTRO_DE_MESA_E_BISTRO.png',
      title: 'Centros de mesa e bistrô',
      category: 'Decoração Temática',
      desc: 'Enfeite temático com livros empilhados, xícaras vintage e flores secas para cada mesa.',
      image: resolveMaterialImage(['10', 'centro_de_mesa', 'bistro'], centroMesaImg),
      isReal: true,
    },
    {
      number: '11',
      expectedFilename: '11_MOLDURA_PARA_FOTOS.png',
      title: 'Moldura para fotos do evento',
      category: 'Fotos & Lembranças',
      desc: 'Moldura estilizada em tamanho real para os alunos e professores tirarem fotos e publicarem nas redes.',
      image: resolveMaterialImage(['11', 'moldura'], molduraImg),
      isReal: true,
    },
    {
      number: '01',
      expectedFilename: '01_CONVITE_PERSONALIZADO.png',
      title: 'Convite personalizado',
      category: 'Identidade Visual',
      desc: 'Convite personalizável pronto para imprimir ou enviar no grupo de WhatsApp da turma.',
      image: resolveMaterialImage(['01', 'convite']),
      isReal: !!resolveMaterialImage(['01', 'convite']),
    },
    {
      number: '02',
      expectedFilename: '02_CARDAPIO_LITERARIO.png',
      title: 'Cardápio Literário de mesa',
      category: 'Mesas & Dinâmicas',
      desc: 'Cardápio bistrô com títulos de poemas, trechos e autores selecionados para degustação literária.',
      image: resolveMaterialImage(['02', 'cardapio', 'cardápio']),
      isReal: !!resolveMaterialImage(['02', 'cardapio', 'cardápio']),
    },
    {
      number: '03',
      expectedFilename: '03_CRACHAS.png',
      title: 'Crachás de Escritores & Leitores',
      category: 'Identificação',
      desc: 'Crachás temáticos prontos com autores célebres (Machado de Assis, Clarice Lispector, Drummond).',
      image: resolveMaterialImage(['03', 'cracha', 'crachá']),
      isReal: !!resolveMaterialImage(['03', 'cracha', 'crachá']),
    },
    {
      number: '04',
      expectedFilename: '04_CERTIFICADO_DE_PARTICIPACAO.png',
      title: 'Certificado de Participação',
      category: 'Certificação',
      desc: 'Certificado oficial de mérito literário para valorizar o empenho e engajamento dos alunos.',
      image: resolveMaterialImage(['04', 'certificado']),
      isReal: !!resolveMaterialImage(['04', 'certificado']),
    },
    {
      number: '05',
      expectedFilename: '05_PLAQUINHAS_DAS_MESAS.png',
      title: 'Plaquinhas das Mesas dos Autores',
      category: 'Ambientação',
      desc: 'Totens e plaquinhas elegantes para identificar cada mesa temática de autores clássicos.',
      image: resolveMaterialImage(['05', 'plaquinha', 'toten', 'mesa_dos_autores']),
      isReal: !!resolveMaterialImage(['05', 'plaquinha', 'toten', 'mesa_dos_autores']),
    },
    {
      number: '06',
      expectedFilename: '06_MARCA_PAGINAS.png',
      title: 'Marca-páginas de lembrança',
      category: 'Lembrancinhas',
      desc: 'Marca-páginas com estética vintage e citações literárias inesquecíveis para presentear os participantes.',
      image: resolveMaterialImage(['06', 'marca_pagina', 'marcapagina', 'marca-pagina']),
      isReal: !!resolveMaterialImage(['06', 'marca_pagina', 'marcapagina', 'marca-pagina']),
    },
    {
      number: '07',
      expectedFilename: '07_PAINEL_DE_BOAS_VINDAS.png',
      title: 'Painel de boas-vindas',
      category: 'Painéis & Hall',
      desc: 'Arte oficial em alta resolução para recepção na entrada do evento escolar.',
      image: resolveMaterialImage(['07', 'painel', 'boas_vindas', 'boas-vindas']),
      isReal: !!resolveMaterialImage(['07', 'painel', 'boas_vindas', 'boas-vindas']),
    },
    {
      number: '08',
      expectedFilename: '08_BANDEIROLAS.png',
      title: 'Bandeirolas com versos célebres',
      category: 'Decoração Suspensa',
      desc: 'Bandeirolas vintage com estrofes clássicas da literatura brasileira para pendurar na sala ou pátio.',
      image: resolveMaterialImage(['08', 'bandeirola', 'bandeirinha']),
      isReal: !!resolveMaterialImage(['08', 'bandeirola', 'bandeirinha']),
    },
    {
      number: '09',
      expectedFilename: '09_ADESIVOS_LITERARIOS.png',
      title: 'Adesivos literários para cadernos',
      category: 'Brindes & Papelaria',
      desc: 'Stickers literários prontos para imprimir em papel adesivo e colar em copos, embalagens e cadernos.',
      image: resolveMaterialImage(['09', 'adesivo']),
      isReal: !!resolveMaterialImage(['09', 'adesivo']),
    },
  ];

  // Starts on the first piece with real image loaded (item 0: Centros de mesa)
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const prev = () => setActiveIdx((prevIdx) => (prevIdx === 0 ? allItems.length - 1 : prevIdx - 1));
  const next = () => setActiveIdx((prevIdx) => (prevIdx === allItems.length - 1 ? 0 : prevIdx + 1));

  const activeItem = allItems[activeIdx];

  return (
    <section className="bg-[#4A2819] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center border-b border-[#2B160F] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C99A45_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Eyebrow */}
        <p className="hand text-2xl sm:text-3xl text-[#C99A45] mb-1 font-bold">
          Conheça o material por dentro
        </p>

        {/* Title */}
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-black text-[#FFF0D1] leading-tight mb-3">
          Peças do seu Café Literário
        </h2>

        {/* Flourish */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-0.5 w-10 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-10 bg-[#C99A45] rounded-full" />
        </div>

        <p className="text-sm sm:text-base text-[#F0D9AE] max-w-xl mx-auto mb-8 font-serif">
          Todas as peças são arquivos digitais em alta resolução prontos para impressão. Navegue e veja os detalhes:
        </p>

        {/* Quick selector chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto">
          {allItems.map((item, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={item.number}
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#C99A45] text-[#21140F] shadow-lg scale-105 border-2 border-[#8F6822]'
                    : 'bg-[#2B160F]/80 text-[#FFF0D1] border border-[#C99A45]/30 hover:border-[#C99A45] hover:bg-[#381c13]'
                }`}
              >
                {item.isReal ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-[#21140F]' : 'text-[#C99A45]'}`} />
                ) : (
                  <span className="text-[10px] opacity-75 font-mono">#{item.number}</span>
                )}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage */}
        <div className="relative max-w-lg mx-auto mb-10">
          <div className="bg-[#F0D9AE] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C99A45] text-[#21140F] transition-all">
            
            {/* Image Box */}
            <div className="relative min-h-[340px] sm:min-h-[420px] bg-[#FFF0D1] flex items-center justify-center p-3 sm:p-4 border-b-2 border-[#C99A45]/40 overflow-hidden">
              {activeItem.image ? (
                <div 
                  onClick={() => setZoomImage(activeItem.image || null)}
                  className="group/img relative w-full h-full flex items-center justify-center cursor-zoom-in"
                >
                  <img
                    key={activeItem.image}
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-auto max-h-[390px] object-contain rounded-xl shadow-md transition-transform duration-300 group-hover/img:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="bg-[#2B160F]/90 text-[#FFF0D1] px-4 py-2 rounded-full border border-[#C99A45] text-xs font-bold flex items-center gap-1.5 shadow-xl">
                      <Maximize2 className="w-4 h-4 text-[#C99A45]" />
                      Clique para ampliar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#692E24]/50 rounded-2xl w-full h-full min-h-[300px] bg-[#FFF0D1]/60 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#4A2819] text-[#FFF0D1] flex items-center justify-center mb-3 shadow-md border border-[#C99A45]">
                    <Layers className="w-7 h-7 text-[#C99A45]" />
                  </div>
                  <span className="font-serif-display font-black text-lg text-[#21140F] mb-1">
                    Peça #{activeItem.number}: {activeItem.title}
                  </span>
                  <span className="text-xs text-[#8C6A54] font-medium max-w-xs mb-3">
                    {activeItem.desc}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#4A2819] text-[#FFF0D1] px-3 py-1 rounded-full text-[11px] font-mono border border-[#C99A45]/50">
                    <Sparkles className="w-3 h-3 text-[#C99A45]" />
                    Arquivo: {activeItem.expectedFilename}
                  </span>
                </div>
              )}

              {/* Number Badge */}
              <div className="absolute top-3 left-3 bg-[#2B160F]/90 text-[#FFF0D1] border border-[#C99A45] px-2.5 py-1 rounded-lg text-xs font-mono font-bold shadow-md">
                Peça #{activeItem.number}
              </div>

              {activeItem.isReal && (
                <div className="absolute top-3 right-3 bg-[#C99A45] text-[#21140F] px-2.5 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Foto Real
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-6 text-left">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#692E24] bg-[#FFF0D1] px-2.5 py-0.5 rounded-md mb-2 border border-[#C99A45]/30">
                {activeItem.category}
              </span>
              <h3 className="font-serif-display font-black text-xl sm:text-2xl text-[#21140F] mb-2 leading-tight">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A2819] font-medium leading-relaxed font-serif">
                {activeItem.desc}
              </p>
            </div>
          </div>

          {/* Previous / Next Arrows */}
          <button
            onClick={prev}
            aria-label="Peça Anterior"
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFF0D1] text-[#21140F] shadow-2xl flex items-center justify-center font-black cursor-pointer hover:bg-white transition-all border-2 border-[#C99A45] hover:scale-105 active:scale-95 z-20"
          >
            <ChevronLeft className="w-7 h-7 stroke-[3]" />
          </button>

          <button
            onClick={next}
            aria-label="Próxima Peça"
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFF0D1] text-[#21140F] shadow-2xl flex items-center justify-center font-black cursor-pointer hover:bg-white transition-all border-2 border-[#C99A45] hover:scale-105 active:scale-95 z-20"
          >
            <ChevronRight className="w-7 h-7 stroke-[3]" />
          </button>
        </div>

        {/* Note */}
        <p className="text-xs sm:text-sm text-[#F0D9AE] max-w-lg mx-auto font-medium">
          Todas as peças são arquivos digitais: você baixa pelo Drive e imprime na sua escola quantas vezes precisar.
        </p>

      </div>

      {/* Lightbox for zooming piece image */}
      {zoomImage && (
        <div 
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-4 right-4 bg-[#C99A45] text-[#21140F] p-2 rounded-full cursor-pointer shadow-xl hover:scale-105"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] bg-[#FFF0D1] p-3 rounded-2xl border-2 border-[#C99A45] overflow-auto shadow-2xl"
          >
            <img 
              src={zoomImage} 
              alt="Ampliação da peça" 
              className="max-h-[82vh] w-auto object-contain rounded-xl mx-auto" 
            />
          </div>
        </div>
      )}
    </section>
  );
};
