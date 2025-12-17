# HealthSpeak - Medical Translation Assistant

**Author**: Abhideep Ghosh

HealthSpeak is a real-time, privacy-focused medical translation application designed to bridge communication gaps between healthcare providers and patients. It acts as a strict, accurate translator without conversational fillers, ensuring clear and precise medical communication.

## Features

- **Real-time Speech-to-Speech Translation**: speak in one language and hear the translation in another instantly.
- **Strict Medical Mode**: The AI is prompted to act solely as a translator, preserving medical terminology and avoiding non-essential dialogue.
- **Privacy-First**: No recordings or transcripts are permanently stored. All data is transient and cleared upon session end.
- **Multi-Model Fallback**: Utilizes a robust backend that cycles through multiple high-quality AI models (Llama 3, Mistral, Gemini) to ensure reliability.
- **Visual Feedback**: Real-time transcript display and error handling for a smooth user experience.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration**: [OpenRouter API](https://openrouter.ai/) (accessing Llama 3, Mistral, etc.)
- **Speech Services**: Native Web Speech API (`SpeechRecognition` & `speechSynthesis`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- An OpenRouter API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nano-medical
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
   Live Link: [https://nano-medical.vercel.app/](https://nano-medical.vercel.app/)


## Usage Guide

1. **Select Languages**: Choose your speaking language (Input) and the patient's language (Output) from the dropdowns.
2. **Start Listening**: Click the microphone button to start recording.
3. **Speak**: Dictate your medical query or instructions clearly.
4. **Auto-Translate**: Stop speaking or click the stop button. The app will automatically transcribe and translate your speech.
5. **Playback**: Review the text on screen or click the "Play" icon to hear the translation spoken aloud.
6. **Reset**: Use the "Reset" button in the header to clear all text and start a fresh session.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `api/translate/`: Backend route handling AI translation requests.
- `components/`: Reusable UI components (Header, Controls, etc.).
- `hooks/`: Custom React hooks for speech recognition and synthesis.
- `Workflow.md`: Detailed documentation of the application's internal workflow.

## License

This project is for educational and prototype purposes.
