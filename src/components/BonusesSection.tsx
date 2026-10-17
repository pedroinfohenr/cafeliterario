import React from 'react';
import bonus1Img from '../imagens/12_QUESTOES_DE_LITERATURA_E_INTERPRETACAO.png';
import bonus2Img from '../imagens/13_MAPAS_MENTAIS_DAS_ESCOLAS_LITERARIAS.png';
import bonus3Img from '../imagens/14_DINAMICAS_DE_REDACAO_E_EXPRESSAO_ORAL.png';
import bonus4Img from '../imagens/15_GUIA_DE_PLANEJAMENTO_ALINHADO_A_BNCC.png';
import { getSiteImage } from '../utils/imageStorage';

export const BonusesSection: React.FC = () => {
  const bonuses = [
    {
      id: 'bonus_1',
      badge: 'BÔNUS 1',
      title: '600 Questões de Literatura e Interpretação',
      desc: 'Prontas para imprimir e aplicar, com gabarito. Para qualquer turma do Ensino Médio.',
      originalPrice: 'R$ 34,90',
      image: bonus1Img,
    },
    {
      id: 'bonus_2',
      badge: 'BÔNUS 2',
      title: '150 Mapas Mentais das Escolas Literárias',
      desc: 'Autores, correntes e conceitos organizados para revisão rápida e visual.',
      originalPrice: 'R$ 29,90',
      image: bonus2Img,
    },
    {
      id: 'bonus_3',
      badge: 'BÔNUS 3',
      title: '100 Dinâmicas de Redação e Expressão Oral',
      desc: 'Fichas ilustradas com objetivo, passo a passo e propostas práticas para animar qualquer aula.',
      originalPrice: 'R$ 27,90',
      image: bonus3Img,
    },
    {
      id: 'bonus_4',
      badge: 'BÔNUS 4',
      title: 'Guia de Planejamento alinhado à BNCC',
      desc: 'O ano letivo organizado por bimestre, pronto para entregar à coordenação.',
      originalPrice: 'R$ 17,90',
      image: bonus4Img,
    },
  ];

  return (
    <section className="section bg-[#4A2819] text-[#FFF0D1] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Eyebrow (Dourado Envelhecido) */}
        <p className="hand text-2xl sm:text-3xl text-[#C99A45] mb-1 font-bold">
          4 bônus inclusos no Pacote Completo
        </p>

        {/* Title (Creme Vintage) */}
        <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#FFF0D1] leading-tight mb-3">
          Além do Sarau, o ano inteiro de Literatura resolvido
        </h2>

        {/* Flourish */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#F0D9AE] max-w-xl mx-auto mb-6 font-normal">
          Tudo incluso no Pacote Completo, sem taxa extra.
        </p>

        {/* Highlight Tag */}
        <div className="text-sm font-bold text-[#FFF0D1] mb-10">
          No total,{' '}
          <span className="bg-[#C99A45] text-[#21140F] px-2.5 py-0.5 rounded-lg font-extrabold shadow-sm">
            R$ 110,60 em bônus
          </span>{' '}
          grátis hoje
        </div>

        {/* 4 Bonus Cards Grid com 3D Tilt Glare */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {bonuses.map((bonus) => {
            const imgSrc = getSiteImage(bonus.id, bonus.image);
            return (
              <div
                key={bonus.id}
                className="bg-[#F0D9AE] border-2 border-[#C99A45]/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl text-[#21140F] group hover:border-[#C99A45] transition-all tilt relative"
              >
                <div>
                  {/* Clean Image Container */}
                  <div className="w-full bg-[#FFF0D1] border-b-2 border-[#C99A45]/30 p-3 sm:p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={bonus.title}
                      className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-5">
                    <span className="inline-block bg-[#692E24] text-[#FFF0D1] text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3">
                      {bonus.badge}
                    </span>
                    <h3 className="font-serif-display font-black text-lg sm:text-xl text-[#21140F] mb-2 leading-tight">
                      {bonus.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A2819] font-medium leading-relaxed mb-4">
                      {bonus.desc}
                    </p>

                    <div className="flex items-baseline gap-2 pt-2 border-t border-[#21140F]/15 text-sm">
                      <s className="text-[#8C6A54]">{bonus.originalPrice}</s>
                      <b className="text-[#692E24] font-serif-display text-lg">Grátis</b>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
