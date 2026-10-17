import React from 'react';
import { Infinity, RefreshCw, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AudienceGarantias: React.FC = () => {
  return (
    <>
      {/* Feito para o Fundamental 2 e o Ensino Médio */}
      <section className="section s-milk bg-[#FFF0D1] text-[#21140F] py-16 px-4 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <h2 className="font-serif-display font-black text-2xl sm:text-4xl text-[#21140F] mb-3">
            Feito para o Fundamental 2 e o Ensino Médio
          </h2>

          {/* Flourish */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
            <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
            <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          </div>

          <p className="text-sm sm:text-base text-[#5E4332] max-w-xl mx-auto font-medium mb-8 leading-relaxed">
            Funciona do 6º ano ao 3º do Médio, e serve também para a Semana Literária, Feira do Livro e projetos de Linguagens da escola.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-xl mx-auto">
            {/* Fundamental 2 */}
            <div className="bg-[#F0D9AE] rounded-3xl p-6 shadow-[0_6px_0_#C99A45] border-2 border-[#C99A45]/40 tilt flex flex-col justify-between">
              <div>
                <span className="font-serif-display text-2xl text-[#692E24] font-black block mb-3">
                  Fundamental 2
                </span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['6º', '7º', '8º', '9º'].map((year) => (
                    <span
                      key={year}
                      className="text-sm font-black px-3.5 py-1.5 rounded-full bg-[#FFF0D1] text-[#21140F] shadow-[0_3px_0_#C99A45] border border-[#C99A45]/30"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5E4332] font-semibold italic border-t border-[#692E24]/20 pt-3">
                para quem já começa Literatura cedo
              </p>
            </div>

            {/* Ensino Médio */}
            <div className="bg-[#F0D9AE] rounded-3xl p-6 shadow-[0_6px_0_#C99A45] border-2 border-[#C99A45]/40 tilt flex flex-col justify-between">
              <div>
                <span className="font-serif-display text-2xl text-[#692E24] font-black block mb-3">
                  Ensino Médio
                </span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['1º', '2º', '3º'].map((year) => (
                    <span
                      key={year}
                      className="text-sm font-black px-3.5 py-1.5 rounded-full bg-[#FFF0D1] text-[#21140F] shadow-[0_3px_0_#C99A45] border border-[#C99A45]/30"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5E4332] font-semibold italic border-t border-[#692E24]/20 pt-3">
                você adapta as leituras e temas à turma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Selos de Garantia e Confiança */}
      <section className="bg-[#2B160F] text-[#FFF0D1] py-12 px-4 border-t-2 border-b-2 border-[#C99A45]/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#21140F] border border-[#C99A45]/30 flex flex-col items-center gap-2">
            <Infinity className="w-6 h-6 text-[#C99A45]" />
            <span className="font-serif-display font-black text-sm text-[#FFF0D1]">
              Acesso vitalício
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#21140F] border border-[#C99A45]/30 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#C99A45]" />
            <span className="font-serif-display font-black text-sm text-[#FFF0D1]">
              Atualizações inclusas
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#21140F] border border-[#C99A45]/30 flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#C99A45]" />
            <span className="font-serif-display font-black text-sm text-[#FFF0D1]">
              Garantia de 7 dias
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#21140F] border border-[#C99A45]/30 flex flex-col items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#C99A45]" />
            <span className="font-serif-display font-black text-sm text-[#FFF0D1]">
              Suporte ao professor
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
