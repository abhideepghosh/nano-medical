import { useState, useCallback, useEffect } from 'react';

interface UseTextToSpeechReturn {
    speak: (text: string, lang: string) => void;
    isSpeaking: boolean;
    cancel: () => void;
    supported: boolean;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            setSupported(true);
        }
    }, []);

    const speak = useCallback((text: string, lang: string) => {
        if (!supported) return;

        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error("Speech synthesis error:", e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [supported]);

    const cancel = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [supported]);

    return { speak, isSpeaking, cancel, supported };
};
