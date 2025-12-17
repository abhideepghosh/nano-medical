export { };

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }

    var SpeechRecognition: any;
    var webkitSpeechRecognition: any;

    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
        message: string;
    }

    interface SpeechRecognitionEvent extends Event {
        resultIndex: number;
        results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionResultList {
        length: number;
        item(index: number): SpeechRecognitionResult;
        [index: number]: SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
        isFinal: boolean;
        length: number;
        item(index: number): SpeechRecognitionAlternative;
        [index: number]: SpeechRecognitionAlternative;
    }

    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }
}
