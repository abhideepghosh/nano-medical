import React from 'react';

interface ControlsProps {
    isListening: boolean;
    onToggleListening: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isListening, onToggleListening }) => {
    return (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-40 pointer-events-none">
            <button
                onClick={onToggleListening}
                className={`pointer-events-auto relative group rounded-full p-7 transition-all duration-300 flex items-center justify-center shadow-2xl ${isListening
                    ? 'bg-rose-500 shadow-rose-500/30 ring-4 ring-rose-500/20 scale-110'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-blue-500/40 hover:scale-105 hover:shadow-blue-500/50 hover:-translate-y-1'
                    }`}
                aria-label={isListening ? "Stop Listening" : "Start Listening"}
            >
                {isListening ? (
                    <div className="relative">
                        {/* Stop Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-white relative z-10">
                            <rect x="6" y="6" width="12" height="12" rx="3" />
                        </svg>
                        {/* Pulsing Ring Animation */}
                        <span className="absolute -inset-10 rounded-full bg-rose-400 opacity-20 animate-ping"></span>
                        <span className="absolute -inset-10 rounded-full bg-rose-400 opacity-10 animate-pulse delay-75"></span>
                    </div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                )}
            </button>

            {/* Listening Status Text */}
            <div className={`absolute -top-16 transition-all duration-300 transform ${isListening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                    Listening to audio...
                </div>
            </div>
        </div>
    );
};
