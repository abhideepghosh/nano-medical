import React from 'react';

interface LanguageOption {
    code: string;
    label: string;
    flag: string; // Emoji flag
}

const LANGUAGES: LanguageOption[] = [
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'French', flag: '🇫🇷' },
    { code: 'zh-CN', label: 'Mandarin', flag: '🇨🇳' },
    { code: 'hi-IN', label: 'Hindi', flag: '🇮🇳' },
    { code: 'de-DE', label: 'German', flag: '🇩🇪' },
];

interface LanguageSelectorProps {
    inputLang: string;
    setInputLang: (lang: string) => void;
    outputLang: string;
    setOutputLang: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    inputLang,
    setInputLang,
    outputLang,
    setOutputLang
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm mb-2">
            <div className="flex flex-col gap-2 relative group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Speaking In</label>
                <div className="relative">
                    <select
                        value={inputLang}
                        onChange={(e) => setInputLang(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent block p-3 pr-8 shadow-sm transition-all hover:border-cyan-300 appearance-none cursor-pointer"
                    >
                        {LANGUAGES.map((lang) => (
                            <option key={`in-${lang.code}`} value={lang.code}>
                                {lang.flag} {lang.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Translating To</label>
                <div className="relative">
                    <select
                        value={outputLang}
                        onChange={(e) => setOutputLang(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-3 pr-8 shadow-inner transition-all hover:border-blue-300 appearance-none cursor-pointer"
                    >
                        {LANGUAGES.map((lang) => (
                            <option key={`out-${lang.code}`} value={lang.code}>
                                {lang.flag} {lang.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
