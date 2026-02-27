import React from 'react';

export const LinearMaterialCard = () => {
    return (
        <div className="w-full h-full min-h-[380px] md:min-h-[420px] bg-[#1A1A2E] text-white rounded-[24px] border border-gray-800 shadow-2xl overflow-hidden font-sans relative flex flex-col transition-colors duration-500 hover:border-white/[0.22]">

            {/* Верхняя часть (Тело карточки) */}
            <div className="p-8 md:p-10 flex-1">

                {/* Хлебные крошки (вместо DES > Template) */}
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6 relative z-10">
                    <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /></svg>
                        RAYNO
                    </div>
                    <span>›</span>
                    <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                        Технологии
                    </div>
                </div>

                {/* Заголовок и описание */}
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                        Материалы с заданными свойствами
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-[90%]">
                        Нано-углерод, керамика и бронеплёнка Rayno. Три технологии для каждого стекла вашего автомобиля.
                    </p>

                    {/* Теги */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-300">
                        <span className="flex items-center gap-1.5 bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700">
                            <span className="w-2.5 h-2.5 rounded-full border-2 border-gray-400"></span>
                            MonoCarbon
                        </span>

                        <span className="flex items-center gap-1.5 bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
                            Centum
                        </span>

                        <span className="flex items-center gap-1.5 bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            Rescue
                        </span>
                    </div>
                </div>

            </div>

            {/* Нижний колонтитул (Footer карточки) */}
            <div className="bg-[#1f1f38]/60 p-4 border-t border-gray-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto w-full backdrop-blur-md relative z-20">
                <svg className="hidden sm:block w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>

                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 flex-wrap">
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                        <div className="w-8 h-4 bg-gray-700/60 rounded-full flex items-center p-0.5 border border-gray-600/30 shadow-inner group-hover:bg-gray-600/60 transition-colors hidden sm:flex"><div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm"></div></div>
                        Детали протокола
                    </span>
                    <a href="/tinting-model" className="bg-[#4A7BF7] hover:bg-[#3561cf] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#4A7BF7]/20 relative z-30">
                        Подобрать пакет
                    </a>
                </div>
            </div>

        </div>
    );
};
