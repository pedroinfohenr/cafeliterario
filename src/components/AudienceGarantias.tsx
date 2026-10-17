import React from 'react';
import { Infinity as InfinityIcon, RotateCw, ShieldCheck, Headphones } from 'lucide-react';

export const AudienceGarantias: React.FC = () => {
  const fund2Grades = ['6º', '7º', '8º', '9º'];
  const medioGrades = ['1º', '2º', '3º'];

  const perks = [
    { icon: InfinityIcon, title: 'Acesso vitalício' },
    { icon: RotateCw, title: 'Atualizações inclusas' },
    { icon: ShieldCheck, title: 'Garantia de 7 dias' },
    { icon: Headphones, title: 'Suporte ao professor' },
  ];

  return (
    <section className="bg-[#2B160F] text-[#FFF0D1] py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[#4A2819]">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#FFF0D1] leading-tight mb-3">
          Feito para o Fundamental 2 e o Ensino Médio
        </h2>

        {/* Flourish */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#F0D9AE] max-w-xl mx-auto mb-10 font-normal">
          Funciona do 6º ano ao 3º do Médio, e serve também para a Semana Literária, Feira do Livro e projetos de Linguagens da escola.
        </p>

        {/* 2 Level Boxes (Marrom Espresso #4A2819 com Dourado #C99A45) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#4A2819] border border-[#C99A45]/30 rounded-2xl p-6 text-center shadow-md">
            <b className="font-serif-display text-xl text-[#FFF0D1] block mb-3">
              Fundamental 2
            </b>
            <div className="flex items-center justify-center gap-2 mb-3">
              {fund2Grades.map((grade) => (
                <span
                  key={grade}
                  className="w-10 h-10 rounded-full bg-[#C99A45] text-[#21140F] font-serif-display font-extrabold text-sm flex items-center justify-center shadow"
                >
                  {grade}
                </span>
              ))}
            </div>
            <small className="text-xs text-[#F0D9AE]/85 block">
              para quem já começa Literatura cedo
            </small>
          </div>

          <div className="bg-[#4A2819] border border-[#C99A45]/30 rounded-2xl p-6 text-center shadow-md">
            <b className="font-serif-display text-xl text-[#FFF0D1] block mb-3">
              Ensino Médio
            </b>
            <div className="flex items-center justify-center gap-2 mb-3">
              {medioGrades.map((grade) => (
                <span
                  key={grade}
                  className="w-10 h-10 rounded-full bg-[#C99A45] text-[#21140F] font-serif-display font-extrabold text-sm flex items-center justify-center shadow"
                >
                  {grade}
                </span>
              ))}
            </div>
            <small className="text-xs text-[#F0D9AE]/85 block">
              você adapta as leituras e temas à turma
            </small>
          </div>
        </div>

        {/* 4 Perks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="bg-[#4A2819] border border-[#C99A45]/20 rounded-2xl p-5 text-center shadow-sm flex flex-col items-center justify-center gap-2"
              >
                <Icon className="w-6 h-6 text-[#C99A45]" />
                <span className="font-serif-display font-bold text-xs sm:text-sm text-[#FFF0D1]">
                  {perk.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
