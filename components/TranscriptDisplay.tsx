import React, { useEffect, useRef } from 'react';

interface TranscriptDisplayProps {
    originalText: string;
    translatedText: string;
    onPlayTranslation: () => void;
    isSpeaking: boolean;
    isTranslating: boolean; // For loading state
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
    originalText,
    translatedText,
    onPlayTranslation,
    isSpeaking,
    isTranslating
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when texts update
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [originalText, translatedText]);

    return (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto pb-32 px-2 scroll-smooth">
            {/* Original Text (Input) */}
            <div className={`p-6 rounded-3xl transition-all duration-300 ${originalText ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100' : 'bg-slate-50 border border-slate-200/60 border-dashed'}`}>
                <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    Original Transcript
                </h3>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {originalText || <span className="text-slate-300 italic">Start speaking to translate...</span>}
                </p>
            </div>

            {/* Translated Text (Output) */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-gradient-to-br from-white to-blue-50 p-6 rounded-3xl shadow-xl shadow-blue-500/10 border border-blue-100 min-h-[140px]">
                    <h3 className="text-[10px] font-bold text-cyan-600 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                        Translation
                    </h3>

                    {isTranslating ? (
                        <div className="flex items-center gap-2 text-cyan-600 my-4">
                            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    ) : (
                        <p className="text-2xl text-slate-800 leading-relaxed font-semibold tracking-tight">
                            {translatedText || <span className="text-blue-300/70 text-lg font-normal italic">Translation appears here...</span>}
                        </p>
                    )}

                    {/* Play Button */}
                    {translatedText && !isTranslating && (
                        <button
                            onClick={onPlayTranslation}
                            disabled={isSpeaking}
                            className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${isSpeaking
                                ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                                : 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40'
                                }`}
                            aria-label="Play Translation"
                        >
                            {isSpeaking ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M5 3.868v16.264a1 1 0 0 0 1.574 .819l12.426 -8.132a1 1 0 0 0 0 -1.638l-12.426 -8.132a1 1 0 0 0 -1.574 .819z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div ref={bottomRef} className="h-4" />
        </div>
    );
};
