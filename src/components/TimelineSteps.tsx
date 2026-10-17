import React from 'react';
import { Mail, Palette, Coffee, BookOpen, Mic, GraduationCap } from 'lucide-react';

export const TimelineSteps: React.FC = () => {
  const steps = [
    {
      number: 'Etapa 1',
      title: 'Convite',
      desc: 'chama a escola',
      icon: Mail,
    },
    {
      number: 'Etapa 2',
      title: 'Decoração',
      desc: 'clima de café e livraria',
      icon: Palette,
    },
    {
      number: 'Etapa 3',
      title: 'Recepção',
      desc: 'crachá e cardápio literário',
      icon: Coffee,
    },
    {
      number: 'Etapa 4',
      title: 'Mesas',
      desc: 'dos pensadores e autores',
      icon: BookOpen,
    },
    {
      number: 'Etapa 5',
      title: 'Rodas',
      desc: 'de perguntas e sarau',
      icon: Mic,
    },
    {
      number: 'Etapa 6',
      title: 'Encerramento',
      desc: 'com certificado de mérito',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="bg-[#FFF0D1] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#21140F]/10 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow (Vinho Clássico) */}
        <p className="hand text-2xl sm:text-3xl text-[#692E24] mb-1 font-bold">
          Tudo pensado para você
        </p>

        {/* Title (Marrom Quase Preto) */}
        <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#21140F] leading-tight mb-2">
          Do convite ao encerramento, cada etapa já vem pronta
        </h2>

        {/* Flourish (Dourado Envelhecido) */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#4A2819] max-w-lg mx-auto mb-10 font-medium">
          O roteiro conduz o evento inteiro. Você só adapta para a sua turma.
        </p>

        {/* Timeline */}
        <div className="relative max-w-md mx-auto text-left">
          {/* Vertical connecting line (Vinho Clássico) */}
          <div className="absolute left-6 sm:left-7 top-6 bottom-6 w-0.5 bg-[#692E24]" />

          <div className="space-y-3.5 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-center gap-4">
                  {/* Circle (Vinho Clássico) */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#692E24] text-[#FFF0D1] flex items-center justify-center shadow-md shrink-0 border-2 border-[#FFF0D1]">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Card (Bege Pergaminho #F0D9AE com Texto #21140F) */}
                  <div className="flex-1 bg-[#F0D9AE] p-3.5 sm:p-4 rounded-2xl shadow-sm border border-[#C99A45]/30">
                    <span className="hand text-base text-[#692E24] block leading-none mb-0.5 font-bold">
                      {step.number}
                    </span>
                    <h3 className="font-serif-display font-black text-base sm:text-lg text-[#21140F] leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A2819] font-medium leading-tight mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
