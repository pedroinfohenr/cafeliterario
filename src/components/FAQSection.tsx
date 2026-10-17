import React from 'react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'Como recebo o acesso ao Café Literário após a compra?',
      answer:
        'O envio é 100% automático e imediato. Assim que o pagamento (PIX ou cartão) for aprovado, você recebe no seu e-mail e WhatsApp o link de acesso direto à pasta com todos os PDFs em alta resolução prontos para baixar e imprimir.',
    },
    {
      question: 'Preciso de programas especiais ou pagos para imprimir?',
      answer:
        'Não! Todos os arquivos vêm organizados em formato PDF padrão (tamanho A4), prontos para imprimir em qualquer impressora comum da escola ou gráfica rápida. Você também recebe modelos com campos personalizáveis.',
    },
    {
      question: 'E se os meus alunos forem tímidos ou não quiserem declamar poesias?',
      answer:
        'O roteiro foi desenhado justamente para vencer esse bloqueio! Em vez de forçar os alunos a irem à frente da sala, o Café Literário começa com a dinâmica das Mesas Temáticas e dos Cardápios de Leitura em pequenos grupos. A participação acontece de forma leve, divertida e gradual.',
    },
    {
      question: 'Serve tanto para o Ensino Fundamental 2 quanto para o Médio?',
      answer:
        'Sim! O kit foi desenvolvido do 6º ano ao 3º ano do Ensino Médio. No Fundamental, o foco é em contos, crônicas, fábulas e declamações lúdicas. No Ensino Médio, o material traz obras clássicas brasileiras, escolas literárias e debates exigidos no ENEM e vestibulares.',
    },
    {
      question: 'O material está alinhado às diretrizes da BNCC de Linguagens?',
      answer:
        'Sim! O Café Literário contempla diretamente as competências específicas de Língua Portuguesa e Literatura da BNCC, trabalhando fruição estética, expressão oral, análise crítica de textos e respeito à diversidade cultural.',
    },
    {
      question: 'Como funciona a garantia incondicional de 7 dias?',
      answer:
        'Risco zero absoluto: se você baixar os materiais e achar que eles não pouparam suas horas de planejamento ou não servem para a sua escola, basta nos enviar uma única mensagem que devolveremos 100% do seu valor.',
    },
  ];

  return (
    <section className="bg-[#FFF0D1] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#21140F]/10 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow (Vinho Clássico) */}
        <p className="hand text-2xl sm:text-3xl text-[#692E24] mb-1 font-bold">
          Tire suas dúvidas
        </p>

        {/* Title (Marrom Quase Preto) */}
        <h2 className="font-serif-display text-2xl sm:text-4xl font-black text-[#21140F] leading-tight mb-2">
          Perguntas Frequentes
        </h2>

        {/* Flourish (Dourado Envelhecido) */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
          <span className="text-[#C99A45] text-xs">◆ ◆ ◆</span>
          <span className="h-0.5 w-8 bg-[#C99A45] rounded-full" />
        </div>

        {/* Clean details list (Cards Bege Pergaminho com Texto #21140F) */}
        <div className="space-y-3 text-left">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-[#F0D9AE] rounded-2xl p-5 shadow-md border border-[#C99A45]/40 group transition-all"
            >
              <summary className="font-serif-display font-black text-base sm:text-lg text-[#21140F] cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-[#692E24] font-black text-xl group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <p className="text-sm sm:text-base text-[#21140F] mt-3 pt-3 border-t border-[#692E24]/20 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};
