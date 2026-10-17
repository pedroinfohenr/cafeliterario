import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Check } from 'lucide-react';
import { getSiteImage, saveSiteImage, readFileAsDataUrl } from '../utils/imageStorage';

interface EditableImageProps {
  storageKey: string;
  defaultSrc: string;
  filename: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  onImageChanged?: (dataUrl: string) => void;
  children?: React.ReactNode;
}

export const EditableImageContainer: React.FC<EditableImageProps> = ({
  storageKey,
  defaultSrc,
  filename,
  alt,
  className = '',
  imgClassName = '',
  label = 'Trocar imagem / Colar print (Ctrl+V)',
  onImageChanged,
  children,
}) => {
  const [src, setSrc] = useState<string>(() => getSiteImage(storageKey, defaultSrc));
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if defaultSrc changes
  useEffect(() => {
    setSrc(getSiteImage(storageKey, defaultSrc));
  }, [storageKey, defaultSrc]);

  const updateImage = (dataUrl: string) => {
    setSrc(dataUrl);
    saveSiteImage(storageKey, filename, dataUrl);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
    if (onImageChanged) onImageChanged(dataUrl);
  };

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      updateImage(dataUrl);
    } catch (e) {
      console.error('Erro ao ler imagem:', e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          e.stopPropagation();
          handleFile(file);
          break;
        }
      }
    }
  };

  // Suporte a Ctrl+V quando o mouse está sobre o elemento
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isHovered = false;
    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };

    const onGlobalPaste = (e: ClipboardEvent) => {
      if (!isHovered) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            handleFile(file);
            break;
          }
        }
      }
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    window.addEventListener('paste', onGlobalPaste);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('paste', onGlobalPaste);
    };
  }, [storageKey, filename]);

  return (
    <div
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      tabIndex={0}
      className={`relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C99A45] ${className} ${
        isDragging ? 'ring-4 ring-[#C99A45] ring-offset-2 scale-[1.02]' : ''
      }`}
      title="Clique para trocar, arraste uma imagem ou cole com Ctrl+V"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Imagem */}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} transition-all duration-200`}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== defaultSrc) {
            target.src = defaultSrc;
          }
        }}
      />

      {children}

      {/* Overlay de Arrastar e Soltar */}
      {isDragging && (
        <div className="absolute inset-0 z-30 bg-[#2B160F]/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center rounded-xl border-2 border-dashed border-[#C99A45] text-[#FFF0D1]">
          <Upload className="w-10 h-10 text-[#C99A45] animate-bounce mb-2" />
          <span className="font-serif-display font-black text-sm sm:text-base">
            Solte a foto aqui para aplicar!
          </span>
        </div>
      )}

      {/* Notificação de Sucesso */}
      {showSuccess && (
        <div className="absolute inset-0 z-30 bg-[#2B160F]/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center rounded-xl text-[#FFF0D1] animate-fade-in">
          <Check className="w-10 h-10 text-[#C99A45] mb-2" />
          <span className="font-serif-display font-black text-xs sm:text-sm">
            Foto atualizada e salva!
          </span>
        </div>
      )}

      {/* Botão Flutuante de Ação (Aparece ao passar o mouse ou focar) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-[#21140F]/95 hover:bg-[#21140F] text-[#FFF0D1] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-[#C99A45]/60 active:scale-95 transition-transform backdrop-blur-xs whitespace-nowrap cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#C99A45]" />
          <span>{label}</span>
        </button>
      </div>
    </div>
  );
};
