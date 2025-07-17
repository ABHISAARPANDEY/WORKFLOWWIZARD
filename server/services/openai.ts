import OpenAI from "openai";
import type { GenerateWorkflowRequest, WorkflowResponse } from "@shared/schema";
import { servicesCatalog } from './servicesCatalog';

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
const openai = apiKey ? new OpenAI({ 
  apiKey,
  baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined,
}) : null;

export async function generateWorkflowFromPrompt(
  prompt: string,
  includeAuth: boolean = false,
  includeErrorHandling: boolean = false,
  enhancePrompt: boolean = false
): Promise<WorkflowResponse> {
  if (!openai) {
    throw new Error("OpenAI/OpenRouter API key not configured");
  }
  
  try {
    // First enhance the prompt if requested
    let enhancedPrompt = prompt;
    if (enhancePrompt) {
      enhancedPrompt = await enhanceUserPrompt(prompt);
    }

    // Generate comprehensive service catalog for the AI
    const serviceList = servicesCatalog.map(service => 
      `- ${service.name} (${service.nodeTypes.join(', ')}) - ${service.category}${service.authRequired ? ' [Auth Required]' : ''}`
    ).join('\n');

    const systemPrompt = `You are an expert N8N workflow generator with access to 50+ services. Create a complete, production-ready N8N workflow JSON based on the user's description.

SUPPORTED SERVICES AND NODE TYPES:
${serviceList}

Guidelines:
- Generate a complete N8N workflow with proper node structure
- Include realistic node IDs, names, types, and parameters
- Use proper N8N node types from the supported services list above
- Include proper connections between nodes
- Set realistic positions for nodes (starting from [250, 300] and spacing by 200px horizontally)
- ${includeAuth ? "Include authentication setup where needed" : ""}
- ${includeErrorHandling ? "Add error handling nodes and try-catch logic" : ""}
- Support complex workflows with multiple services (Facebook, Instagram, Twitter, LinkedIn, etc.)
- Handle both simple and complex automation scenarios
- Provide clear setup instructions
- Estimate setup time realistically

IMPORTANT: Use the exact node types from the supported services list above. Match services mentioned in the user's prompt to the correct node types.

Return a JSON object with this exact structure:
{
  "name": "workflow name",
  "description": "workflow description",
  "nodeCount": number,
  "estimatedSetupTime": "time estimate",
  "triggerType": "trigger type",
  "nodes": [array of nodes],
  "connections": {connection object},
  "setupInstructions": ["step 1", "step 2", ...],
  "workflowJson": {
    "name": "workflow name",
    "active": true,
    "nodes": [nodes array],
    "connections": {connections object}
  }
}`;

    const model = process.env.OPENROUTER_API_KEY ? "anthropic/claude-3.5-sonnet" : "gpt-4o";
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: enhancedPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content!);
    return result as WorkflowResponse;
  } catch (error) {
    console.error("OpenAI workflow generation error:", error);
    throw new Error("Failed to generate workflow with AI: " + (error as Error).message);
  }
}

export async function enhanceUserPrompt(prompt: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI/OpenRouter API key not configured");
  }
  
  try {
    const systemPrompt = `You are an expert automation consultant with deep knowledge of 50+ services including Facebook, Instagram, Twitter, LinkedIn, Slack, Gmail, Stripe, Airtable, and many more.

Take the user's basic automation request and enhance it with:
- More specific details about the automation flow
- Suggested integration with relevant services from our 50+ supported platforms
- Error handling scenarios and best practices
- Security considerations and authentication requirements
- Specific node types and configurations that would work well
- Consider social media integrations, e-commerce workflows, productivity tools, and communication platforms

SUPPORTED SERVICES: Facebook, Instagram, Twitter, LinkedIn, YouTube, Slack, Discord, Gmail, Stripe, PayPal, Shopify, Airtable, Google Sheets, Notion, Trello, GitHub, Salesforce, HubSpot, and 30+ more.

Keep the core intent the same but make it more detailed, actionable, and comprehensive for creating a robust N8N workflow that leverages multiple services effectively.

Return only the enhanced prompt text, no additional formatting.`;

    const model = process.env.OPENROUTER_API_KEY ? "anthropic/claude-3.5-sonnet" : "gpt-4o";
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
    });

    return response.choices[0].message.content!;
  } catch (error) {
    console.error("Prompt enhancement error:", error);
    // Return original prompt if enhancement fails
    return prompt;
  }
}
