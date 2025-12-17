import React from 'react';

interface HeaderProps {
    onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Modern Logo */}
                    <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M2 12h20" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">HealthSpeak</h1>
                        <p className="text-[10px] font-semibold text-cyan-600 uppercase tracking-widest leading-none">Medical Translator</p>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-95"
                >
                    <span className="text-xs font-semibold group-hover:text-red-700">Reset</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>
            </div>
        </header>
    );
};
