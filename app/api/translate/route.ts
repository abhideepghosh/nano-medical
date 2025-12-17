import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {

        const LANGUAGE_NAMES: Record<string, string> = {
            'en-US': 'English',
            'es-ES': 'Spanish',
            'fr-FR': 'French',
            'zh-CN': 'Mandarin Chinese',
            'hi-IN': 'Hindi',
            'de-DE': 'German',
        };

        const { text, targetLanguage, sourceLanguage } = await request.json();

        if (!text || !targetLanguage) {
            return NextResponse.json(
                { error: 'Missing text or targetLanguage' },
                { status: 400 }
            );
        }

        const targetName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;
        const sourceName = sourceLanguage ? (LANGUAGE_NAMES[sourceLanguage] || sourceLanguage) : 'the input language';

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const systemPrompt = `You are a strict translation engine. Your ONLY purpose is to translate the input text from ${sourceName} to ${targetName}. 
        Rules:
        1. Translate the text exactly.
        2. Do NOT reply to the user.
        3. Do NOT answer questions. (e.g., if input is "How are you?", translate "How are you?" to ${targetName}).
        4. Do NOT add any conversational filler, explanations, or notes.
        5. Preserve medical terminology accurately.
        6. Output ONLY the translated text.`;

        const models = [
            "meta-llama/llama-3-8b-instruct:free",
            "mistralai/mistral-small-3.1-24b-instruct:free",
            "microsoft/phi-3-mini-128k-instruct:free",
            "huggingfaceh4/zephyr-7b-beta:free",
            "google/gemini-2.0-flash-exp:free", // Fallback: Free on OpenRouter, no extra key needed
        ];

        let lastError = null;

        // Helper to wait
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (const model of models) {
            try {
                console.log(`Attempting translation with model: ${model}`);

                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:3000",
                        "X-Title": "HealthSpeak",
                    },
                    body: JSON.stringify({
                        "model": model,
                        "temperature": 0,
                        "messages": [
                            {
                                "role": "system",
                                "content": systemPrompt
                            },
                            {
                                "role": "user",
                                "content": text
                            }
                        ]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const translatedText = data.choices[0]?.message?.content?.trim();
                    if (!translatedText) throw new Error("Empty translation received");
                    return NextResponse.json({ translatedText });
                }

                // If not OK, capture error and loop to next
                const errorData = await response.json();
                console.warn(`Model ${model} failed with ${response.status}:`, errorData);
                lastError = errorData;

            } catch (error) {
                console.warn(`Model ${model} exception:`, error);
                lastError = error;
            }

            // Wait 1 second before trying the next model to avoid rate hammering
            await delay(1000);
        }

        // If loop finishes without success
        console.error('All translation models failed. Last error:', lastError);
        return NextResponse.json(
            { error: 'Translation failed across all available providers. Service may be temporarily unavailable.' },
            { status: 503 }
        );

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
