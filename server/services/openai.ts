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

WORKFLOW GENERATION REQUIREMENTS:
- Generate a complete N8N workflow with proper node structure and realistic parameters
- Use exact node types from the supported services list above
- Include proper connections between nodes with correct data flow
- Set realistic positions for nodes (starting from [250, 300] and spacing by 200px horizontally)
- ${includeAuth ? "Include comprehensive authentication setup with proper credential configuration" : ""}
- ${includeErrorHandling ? "Add robust error handling nodes, try-catch logic, and fallback mechanisms" : ""}
- Support complex multi-service workflows with proper data transformation between services
- Handle both simple triggers and complex conditional logic
- Include data validation, sanitization, and security best practices
- Add proper logging and monitoring capabilities
- Provide detailed setup instructions with specific configuration steps
- Estimate setup time realistically based on complexity and service requirements

TECHNICAL ACCURACY REQUIREMENTS:
- Use authentic N8N node types and parameter structures
- Include proper field mappings and data transformations
- Add realistic webhook URLs, API endpoints, and configuration values
- Include proper error handling with specific error codes and messages
- Add rate limiting and retry logic where appropriate
- Include proper authentication flows and credential management
- Add data validation and sanitization steps
- Include monitoring and alerting mechanisms

PRODUCTION READINESS CHECKLIST:
- All nodes have proper error handling
- Data validation at each step
- Authentication properly configured
- Rate limiting implemented
- Logging and monitoring included
- Fallback strategies defined
- Security best practices followed

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
    const systemPrompt = `You are an expert N8N automation consultant with deep knowledge of 50+ services. Your task is to transform user prompts into comprehensive, production-ready automation specifications.

SUPPORTED SERVICES & CATEGORIES:
- Social Media: Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, Pinterest
- Communication: Slack, Discord, Microsoft Teams, Telegram, WhatsApp Business  
- Email: Gmail, Outlook, SendGrid, Mailchimp, Mailgun
- E-commerce: Stripe, PayPal, Shopify, WooCommerce, Square
- Productivity: Notion, Trello, Asana, Monday.com, Jira, ClickUp
- Data & Analytics: Google Sheets, Airtable, Google Analytics, Mixpanel
- CRM: Salesforce, HubSpot, Pipedrive, Zoho CRM
- Development: GitHub, GitLab, Bitbucket
- Storage: Google Drive, Dropbox, OneDrive, AWS S3
- Marketing: Google Ads, Facebook Ads
- AI: OpenAI, Anthropic Claude

ENHANCEMENT RULES:
1. PRESERVE the original intent and core functionality - never change what the user actually wants
2. EXPAND with specific technical details about data flow, triggers, and processing steps
3. IDENTIFY and specify relevant services from the supported list above
4. ADD comprehensive error handling, data validation, and security considerations
5. INCLUDE specific field mappings, API endpoints, and configuration details
6. SUGGEST complementary automations that enhance the primary workflow
7. SPECIFY exact trigger conditions, data transformations, and output formats
8. ADD monitoring, logging, and notification mechanisms
9. INCLUDE rate limiting, retry logic, and fallback strategies
10. PROVIDE detailed authentication and permission requirements

TRANSFORMATION APPROACH:
- For simple prompts: Add detailed technical specifications and best practices
- For complex prompts: Break down into logical steps with comprehensive error handling
- For multi-service workflows: Specify exact integration points and data flow
- Always include specific field names, API methods, and configuration parameters

OUTPUT FORMAT: Return a comprehensive, technically detailed automation specification that maintains the original user intent while adding production-ready implementation details.

EXAMPLE TRANSFORMATION:
Input: "Send email when form submitted"
Output: "Create a webhook-triggered N8N workflow that processes form submissions with the following specifications: 1) Webhook endpoint receives POST data with form fields (name, email, message, timestamp), 2) Data validation ensures required fields are present and email format is valid, 3) Conditional logic routes based on form type using IF node, 4) Email notification sent via SendGrid/SMTP with personalized template including form data, 5) Form data stored in Airtable/Google Sheets with automatic timestamp and unique ID generation, 6) Confirmation email sent to submitter with auto-reply template, 7) Slack notification to team channel with form summary, 8) Error handling for failed API calls with retry logic and fallback notification, 9) Rate limiting to prevent spam submissions, 10) Data sanitization and XSS protection for form inputs."`;

    const model = process.env.OPENROUTER_API_KEY ? "anthropic/claude-3.5-sonnet" : "gpt-4o";
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Transform this automation request into a comprehensive, production-ready specification: "${prompt}"` }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content!;
  } catch (error) {
    console.error("Prompt enhancement error:", error);
    // Return original prompt if enhancement fails
    return prompt;
  }
}
