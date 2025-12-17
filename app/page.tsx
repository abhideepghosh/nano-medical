'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TranscriptDisplay } from '@/components/TranscriptDisplay';
import { Controls } from '@/components/Controls';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

export default function Home() {
  // State
  const [inputLang, setInputLang] = useState('en-US');
  const [outputLang, setOutputLang] = useState('es-ES');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Hooks
  const {
    isListening,
    transcript,
    startRecording,
    stopRecording,
    resetTranscript,
    error: speechError
  } = useSpeechRecognition(inputLang);

  const { speak, isSpeaking, cancel: cancelSpeech } = useTextToSpeech();

  // Privacy: Clear state on unmount
  useEffect(() => {
    return () => {
      resetTranscript();
      setTranslatedText('');
      cancelSpeech();
    };
  }, [resetTranscript, cancelSpeech]);

  // Workflow: Trigger translation when listening stops and we have text
  useEffect(() => {
    if (!isListening && transcript && !translatedText && !isTranslating) {
      handleTranslate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript]);

  // Handler: Translate Text
  const handleTranslate = async () => {
    if (!transcript) return;

    setIsTranslating(true);
    setApiError(null);
    setTranslatedText(''); // Clear previous translation while loading

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transcript,
          targetLanguage: outputLang,
          sourceLanguage: inputLang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Failed to translate. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Handler: Play Translation
  const handlePlayAudio = () => {
    if (translatedText) {
      speak(translatedText, outputLang);
    }
  };

  // Handler: Toggle Recording
  const handleToggleListening = () => {
    if (isListening) {
      stopRecording();
      // Translation triggered by useEffect
    } else {
      // Clear previous states when starting new recording
      setTranslatedText('');
      setApiError(null);
      cancelSpeech();
      // Note: transcript is cleared in hook's startRecording
      startRecording();
    }
  };

  // Handler: Reset App
  const handleReset = () => {
    stopRecording();
    cancelSpeech();
    resetTranscript();
    setTranslatedText('');
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <Header onReset={handleReset} />

      <main className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col gap-4">
        {/* Error Banners */}
        {(speechError || apiError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {speechError && <p>🎤 {speechError}</p>}
            {apiError && <p>⚠️ {apiError}</p>}
          </div>
        )}

        <LanguageSelector
          inputLang={inputLang}
          setInputLang={setInputLang}
          outputLang={outputLang}
          setOutputLang={setOutputLang}
        />

        <TranscriptDisplay
          originalText={transcript}
          translatedText={translatedText}
          onPlayTranslation={handlePlayAudio}
          isSpeaking={isSpeaking}
          isTranslating={isTranslating}
        />

        <Controls
          isListening={isListening}
          onToggleListening={handleToggleListening}
        />
      </main>
    </div>
  );
}
