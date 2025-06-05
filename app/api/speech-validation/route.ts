import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');
    const text = formData.get('text');
    const language = formData.get('language') as string;

    if (!audioFile || !text || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure audioFile is a File or Blob
    if (!(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: 'Invalid audio file format' },
        { status: 400 }
      );
    }

    // Convert audio to a Buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    // Use OpenAI Whisper API for speech-to-text
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], 'audio.webm', { type: 'audio/webm' }),
      model: 'whisper-1',
      language: language.toLowerCase() === 'english' ? 'en' : 'hi',
    });

    // Clean up text for comparison (remove punctuation, spaces, and convert to lowercase)
    const cleanText = (str: string) => 
      str.toLowerCase().replace(/[^a-z0-9]/g, '');

    const expectedText = cleanText(text as string);
    const recognizedText = cleanText(transcription.text);

    // Compare the texts - require exact match
    const match = expectedText === recognizedText;

    return NextResponse.json({
      match,
      recognized_text: transcription.text,
      expected_text: text,
    });

  } catch (error) {
    console.error('Speech validation error:', error);
    return NextResponse.json(
      { error: 'Speech validation failed' },
      { status: 500 }
    );
  }
} 