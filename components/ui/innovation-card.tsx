"use client";

import React from 'react';
import classNames from 'classnames';

export const InnovationCard = () => {
  return (
    <div className="relative mx-auto w-full max-w-[640px] perspective-[1500px]">
      {/* Главный контейнер: Ультра-прозрачное стекло */}
      <div 
        className={classNames(
          "relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-[32px]",
          "shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]",
          "transition-all duration-700 hover:border-white/10"
        )}
      >
        {/* Инженерная Шапка (Header) — Делаем её изящной, а не серой */}
        <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] border-b border-white/5">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-[#00BFA5]/10 border border-[#00BFA5]/20">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00BFA5] animate-pulse" />
             <span className="text-[10px] font-bold text-[#00BFA5] uppercase tracking-wider">Protocol</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest cursor-default">
            ZE Studio / Nano-Ceramic
          </span>
        </div>

        {/* Контентная часть */}
        <div className="px-10 py-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
            Активация ИК-барьера Centum 80
          </h3>
          <p className="text-base text-white/40 font-normal leading-relaxed max-w-[480px]">
            Интеграция нанокерамического слоя для прецизионного контроля тепловой нагрузки и защиты салона.
          </p>
        </div>

        {/* Панель атрибутов (Tags) */}
        <div className="flex flex-wrap items-center gap-4 px-10 pb-8">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-[12px] text-white/50">
            <span className="opacity-40">Status:</span>
            <span className="font-semibold text-white/80">Active</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-[12px] text-white/50">
            <span className="opacity-40">Priority:</span>
            <span className="font-semibold text-white/80">Premium</span>
          </div>
          <div className="flex items-center gap-2 ml-auto text-[11px] font-mono text-white/20 uppercase tracking-widest">
             Cycle 18 // Lab
          </div>
        </div>

        {/* Футер с кнопками: Чистый минимализм */}
        <div className="flex items-center justify-between px-10 py-6 bg-white/[0.02] border-t border-white/5">
          <div className="flex -space-x-3 hover:space-x-1 transition-all duration-500 cursor-help">
             <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-black text-white">EZ</span>
             </div>
             <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-black text-white">ZE</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[12px] font-bold text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest">
              Audit
            </button>
            <button className="relative group/btn overflow-hidden bg-[#4A7BF7] hover:bg-[#5D8BFF] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-[0_8px_20px_rgba(74,123,247,0.3)] active:scale-95">
              <span className="relative z-10">Зафиксировать результат</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            </button>
          </div>
        </div>

        {/* Фоновый блик (свечение) */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00BFA5]/5 blur-[100px] -z-10" />
      </div>
      
      {/* Тень-аура под карточкой */}
      <div className="absolute -inset-4 bg-[#00BFA5]/5 blur-[80px] rounded-[40px] -z-20 opacity-40" />
    </div>
  );
};
