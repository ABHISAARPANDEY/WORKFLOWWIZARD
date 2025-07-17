import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined,
});

export async function enhancePrompt(prompt: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are an expert at understanding automation workflows and enhancing user prompts for N8N workflow generation. 

Your task is to take a user's basic automation idea and enhance it with:
1. More specific technical details
2. Better structure and clarity
3. Consideration of edge cases and error handling
4. Suggested integrations and services
5. Best practices for automation

Keep the enhanced prompt concise but comprehensive. Focus on making it actionable for workflow generation.

Context: ${context || 'General workflow automation'}

Original prompt: "${prompt}"

Enhance this prompt to be more detailed and actionable for automated workflow generation:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || prompt;
  } catch (error) {
    console.error('Prompt enhancement error:', error);
    // Fallback to basic enhancement if AI fails
    return enhancePromptLocally(prompt);
  }
}

function enhancePromptLocally(prompt: string): string {
  // Basic local enhancement when AI is not available
  const enhancements = [
    "with proper error handling",
    "including authentication setup",
    "with data validation",
    "and notification on completion",
    "with retry logic for failed operations",
  ];

  const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
  return `${prompt} ${randomEnhancement}`;
}
