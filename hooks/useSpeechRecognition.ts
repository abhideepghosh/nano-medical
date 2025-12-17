import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechRecognitionReturn {
    isListening: boolean;
    transcript: string;
    startRecording: () => void;
    stopRecording: () => void;
    resetTranscript: () => void;
    error: string | null;
}

export const useSpeechRecognition = (lang: string = 'en-US'): UseSpeechRecognitionReturn => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        // Basic browser support check
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Browser does not support Speech Recognition.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang;

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // We append final transcript to existing state if we wanted to keep history, 
            // but here we just want the current session's text.
            // Actually, for "realtime updates", getting the full transcript from the event is safer 
            // if we are not manually concatenating. 
            // However, `resultIndex` implies updates.
            // Let's rely on event results accumulating in the session.

            // Simple approach: Construct the full text from the current event results list
            let currentText = '';
            for (let i = 0; i < event.results.length; i++) {
                currentText += event.results[i][0].transcript;
            }
            setTranscript(currentText);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error', event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [lang]);

    const startRecording = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                setTranscript(''); // Clear previous on start
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
            }
        }
    }, [isListening]);

    const stopRecording = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
        setError(null);
    }, []);

    return { isListening, transcript, startRecording, stopRecording, resetTranscript, error };
};
