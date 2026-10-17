import React, { useState } from 'react';
import { X, Check, Copy, QrCode, CreditCard, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: 'basico' | 'completo';
  onSwitchPackage: (pkg: 'basico' | 'completo') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  onSwitchPackage,
}) => {
  const [tab, setTab] = useState<'pix' | 'card'>('pix');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states for credit card
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  if (!isOpen) return null;

  const pkgPrice = selectedPackage === 'basico' ? '10,00' : '19,90';
  const pkgName = selectedPackage === 'basico' ? 'Pacote Básico do Café Literário' : 'Pacote Completo + 4 Bônus';

  const simulatedPixCode =
    '00020126580014br.gov.bcb.pix0136cafeliterariopronto@escola.digital520400005303986540' +
    (selectedPackage === 'basico' ? '510.00' : '519.90') +
    '5802BR5922CAFE LITERARIO PRONTO6009SAO PAULO62070503***6304D1B9';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(simulatedPixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFF0D1] rounded-3xl shadow-2xl border-2 border-[#C99A45]/40 overflow-hidden max-h-[90vh] flex flex-col text-[#21140F]">
        
        {/* Header (Marrom Escuro) */}
        <div className="bg-[#2B160F] text-[#FFF0D1] p-4 sm:p-5 flex items-center justify-between border-b border-[#4A2819]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C99A45]">
              Finalizar Pedido Seguro
            </span>
            <h3 className="font-serif-display font-black text-lg sm:text-xl text-[#FFF0D1] leading-tight">
              {pkgName}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF0D1] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-left bg-[#FFF0D1]">
          
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#692E24]/10 text-[#692E24] flex items-center justify-center mx-auto border-2 border-[#692E24]">
                <CheckCircle2 className="w-10 h-10 text-[#692E24]" />
              </div>
              <h4 className="font-serif-display font-black text-2xl text-[#21140F]">
                Pagamento Confirmado!
              </h4>
              <p className="text-sm text-[#4A2819] max-w-xs mx-auto">
                Seu acesso ao <strong>{pkgName}</strong> foi liberado! Enviamos o link do Google Drive para{' '}
                <span className="font-semibold text-[#692E24]">{email || 'seu e-mail e WhatsApp'}</span>.
              </p>
              <div className="p-4 bg-[#F0D9AE] rounded-2xl border border-[#C99A45]/40 text-xs text-[#21140F]">
                📚 <strong>Pasta do Material:</strong> Roteiro completo do sarau, 25 peças em PDF, decoração de livraria e os 4 bônus prontos para baixar e imprimir.
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-3 bg-[#692E24] text-[#FFF0D1] font-bold rounded-full text-sm hover:bg-[#441A13] transition-all cursor-pointer"
              >
                Concluir e Voltar
              </button>
            </div>
          ) : (
            <>
              {/* Package selector switcher */}
              <div className="flex p-1 bg-[#F0D9AE] rounded-2xl border border-[#C99A45]/40">
                <button
                  type="button"
                  onClick={() => onSwitchPackage('basico')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedPackage === 'basico'
                      ? 'bg-[#2B160F] text-[#FFF0D1] shadow-sm'
                      : 'text-[#4A2819] hover:text-[#21140F]'
                  }`}
                >
                  <span>Básico (R$ 10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchPackage('completo')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedPackage === 'completo'
                      ? 'bg-[#692E24] text-[#FFF0D1] shadow-sm'
                      : 'text-[#4A2819] hover:text-[#21140F]'
                  }`}
                >
                  <span>Completo + Bônus (R$ 19,90)</span>
                </button>
              </div>

              {/* Price summary badge */}
              <div className="flex items-center justify-between p-3.5 bg-[#F0D9AE] rounded-2xl border border-[#C99A45]/40">
                <div>
                  <span className="text-xs text-[#8C6A54] block">Total a pagar:</span>
                  <span className="font-serif-display font-black text-2xl text-[#692E24]">
                    R$ {pkgPrice}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#692E24] bg-[#FFF0D1] px-2 py-0.5 rounded border border-[#692E24]/30 block">
                    Pagamento Único
                  </span>
                  <span className="text-[11px] text-[#4A2819] font-medium">Acesso vitalício</span>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="flex gap-2 border-b border-[#C99A45]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setTab('pix')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    tab === 'pix'
                      ? 'bg-[#692E24] text-[#FFF0D1]'
                      : 'bg-[#F0D9AE] text-[#21140F] border border-[#C99A45]/40'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>PIX (Acesso Instantâneo)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTab('card')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    tab === 'card'
                      ? 'bg-[#692E24] text-[#FFF0D1]'
                      : 'bg-[#F0D9AE] text-[#21140F] border border-[#C99A45]/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* Tab 1: PIX */}
              {tab === 'pix' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F0D9AE] rounded-2xl border border-[#C99A45]/40 text-center space-y-3">
                    <div className="w-32 h-32 mx-auto bg-[#FFF0D1] border-2 border-[#C99A45] rounded-2xl flex flex-col items-center justify-center p-2 shadow-inner">
                      <QrCode className="w-24 h-24 text-[#21140F]" />
                    </div>
                    <p className="text-xs text-[#4A2819] font-medium">
                      Escaneie o QR Code no app do seu banco ou copie o código abaixo:
                    </p>

                    <div className="flex items-center gap-2 bg-[#FFF0D1] p-2 rounded-xl border border-[#C99A45]/50">
                      <input
                        type="text"
                        readOnly
                        value={simulatedPixCode}
                        className="flex-1 bg-transparent text-[11px] text-[#21140F] font-mono outline-none truncate"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="px-3.5 py-1.5 bg-[#C99A45] text-[#21140F] rounded-lg text-xs font-black hover:bg-[#b88c3a] transition-colors cursor-pointer flex items-center gap-1 shrink-0 shadow-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar PIX</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#21140F] block">
                      Onde você quer receber os arquivos do Café Literário?
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Seu melhor e-mail (ex: professor@escola.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                    />
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp com DDD (para envio imediato no zap)"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    className="w-full py-3.5 bg-[#C99A45] text-[#21140F] font-serif-display font-black text-sm sm:text-base rounded-full shadow-md hover:bg-[#b88c3a] transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#8F6822]"
                  >
                    <span>Já fiz o PIX, liberar meu material agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tab 2: Credit Card */}
              {tab === 'card' && (
                <form onSubmit={handleCompletePayment} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#21140F] block mb-1">
                      Seu E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="professor@escola.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#21140F] block mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#21140F] block mb-1">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Como impresso no cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#21140F] block mb-1">
                        Validade
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#21140F] block mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FFF0D1] border border-[#C99A45]/50 rounded-xl text-xs sm:text-sm text-[#21140F] outline-none focus:border-[#692E24]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C99A45] text-[#21140F] font-serif-display font-black text-sm sm:text-base rounded-full shadow-md hover:bg-[#b88c3a] transition-all cursor-pointer mt-2 border border-[#8F6822]"
                  >
                    PAGAR R$ {pkgPrice} E RECEBER AGORA
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C6A54] pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#692E24]" />
                <span>Ambiente Seguro com Criptografia SSL de 256 bits</span>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
