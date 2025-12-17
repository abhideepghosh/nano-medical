# Application Workflow

This document outlines the end-to-end workflow of the **HealthSpeak** application, a real-time medical translation tool.

## 1. Initialization
- **App Load**: User visits the application URL.
- **State Setup**:
    - `inputLang` defaults to 'en-US' (English).
    - `outputLang` defaults to 'es-ES' (Spanish).
    - Speech recognition and synthesis hooks are initialized.
- **Cleanup**: On unmount, any active recording or speech is cancelled, and transcripts are cleared for privacy.

## 2. Audio Input (Speech Recognition)
- **Trigger**: User interacts with the microphone controls (Start/Stop).
- **Technology**: Uses the browser's native **Web Speech API (`SpeechRecognition`)**.
- **Process**:
    1. User clicks the "Start Listening" button.
    2. App requests microphone access (if not already granted).
    3. User speaks in the selected `inputLang`.
    4. Real-time transcript updates are displayed on the screen.
- **Stop**: User clicks "Stop Listening" or silence is detected (depending on browser behavior), finalizing the `transcript`.

## 3. Translation Workflow
- **Trigger**: Automatically triggered when:
    - Recording stops (`isListening` becomes `false`).
    - A valid `transcript` exists.
    - No translation has been performed yet for this segment.
- **API Call**:
    - Endpoint: `/api/translate`
    - Method: `POST`
    - Payload: `{ text: transcript, targetLanguage: outputLang, sourceLanguage: inputLang }`
- **Backend Logic (`app/api/translate/route.ts`)**:
    1. **Validation**: Checks for input text and target language.
    2. **Prompt Construction**: Creates a system prompt instructing the AI to act as a strict medical translator (no chitchat).
    3. **Model Selection**: Iterates through a list of **free OpenRouter models** (e.g., Llama 3, Mistral, Gemini Flash) to ensure reliability.
    4. **Request**: Sends request to OpenRouter API.
    5. **Fallback**: If one model fails, it automatically retries with the next model in the list.
- **Response**: Returns the translated text to the frontend.

## 4. Output & Playback
- **Display**: The translated text is displayed alongside the original transcript.
- **Audio Output (Text-to-Speech)**:
    - **Trigger**: User clicks the "Play" button next to the translation.
    - **Technology**: Uses the browser's native **Web Speech API (`speechSynthesis`)**.
    - **Process**: Synthesizes the translated text into speech using the voice matching the `outputLang`.

## 5. Error Handling
- **Speech API Errors**: displayed if microphone access is denied or recognition fails.
- **Translation API Errors**: displayed if the backend fails to reach OpenRouter or all models fail.
- **Visual Feedback**: Red error banners appear at the top of the main view for any critical issues.

## 6. Privacy & Security
- **Transient Data**: No recordings or transcripts are permanently stored in a database.
- **State Clearing**: All text and audio data are cleared when the user refreshes or leaves the page.
- **Strict Prompting**: The AI is instructed not to store context or engage in conversation, merely to translate.
