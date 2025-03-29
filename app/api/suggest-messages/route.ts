import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';



const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
export const runtime = 'edge';

export async function POST(request: Request) {
    try {
    const prompt = "create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'.these questions are for an anonymous social messaging platform, like Qooh.me,and should be suitable for a diverse audience. Avoid personal or sensitive topics , focusing instead on universal themes that encourage friendly interaction. for example , your output should be structured like this: ' What's a hobby you've recently started?||if you could have dinner with any historical figure, who would it be?||what's a simple thing that makes you happy?'. Ensure the questions are intriguing , foster curiosity and contribute to a positive and welcoming conversational environment. "
      const responseStream = streamText({
        model: openai('gpt-4o-mini'),
        prompt,
      });
      return responseStream.toTextStreamResponse();
    } catch (error) {
      console.error('Error in processing messages:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Error in processing messages' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
