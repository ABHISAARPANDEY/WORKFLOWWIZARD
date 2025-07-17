import { generateWorkflowFromPrompt, enhanceUserPrompt } from './openai';
import { generateWorkflowFromPrompt as generateLocalWorkflow } from './localWorkflowGenerator';
import { supabaseStorage } from './supabase';
import { servicesCatalog } from './servicesCatalog';
import type { GenerateWorkflowRequest, WorkflowResponse } from '@shared/schema';

export async function generateWorkflow(
  request: GenerateWorkflowRequest, 
  userId?: number
): Promise<WorkflowResponse> {
  try {
    let generatedWorkflow: WorkflowResponse;
    
    // Check if we have API keys available
    const hasApiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
    
    if (hasApiKey) {
      try {
        // Generate workflow using AI
        generatedWorkflow = await generateWorkflowFromPrompt(
          request.prompt,
          request.includeAuth,
          request.includeErrorHandling,
          request.enhancePrompt
        );
      } catch (error: any) {
        console.log("AI generation failed, falling back to local templates:", error.message);
        // Fallback to local templates if AI fails
        generatedWorkflow = generateLocalWorkflow(request.prompt);
      }
    } else {
      // Generate workflow using local templates
      generatedWorkflow = generateLocalWorkflow(request.prompt);
    }

    // Store the workflow in our database if user is authenticated
    if (userId) {
      try {
        const storedWorkflow = await supabaseStorage?.createWorkflow({
          userId,
          name: generatedWorkflow.name,
          description: generatedWorkflow.description,
          prompt: request.prompt,
          workflowJson: generatedWorkflow.workflowJson,
          nodeCount: generatedWorkflow.nodeCount,
          triggerType: generatedWorkflow.triggerType,
          estimatedSetupTime: generatedWorkflow.estimatedSetupTime,
          setupInstructions: generatedWorkflow.setupInstructions,
          isPublic: false,
        });
        
        if (storedWorkflow) {
          generatedWorkflow.id = storedWorkflow.id;
        }
      } catch (error) {
        console.error("Failed to store workflow:", error);
        // Continue without storing if storage fails
      }
    }

    return generatedWorkflow;
  } catch (error) {
    console.error("Workflow generation error:", error);
    throw new Error("Failed to generate workflow: " + (error as Error).message);
  }
}

export async function enhancePrompt(prompt: string): Promise<string> {
  const hasApiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
  
  if (hasApiKey) {
    try {
      return await enhanceUserPrompt(prompt);
    } catch (error) {
      console.error("Prompt enhancement failed:", error);
      return prompt;
    }
  }
  
  // Local enhancement fallback
  return enhancePromptLocally(prompt);
}

function enhancePromptLocally(prompt: string): string {
  // Simple local enhancement - add common best practices
  const enhancements = [
    "Include proper error handling and validation",
    "Add logging for debugging purposes",
    "Consider rate limiting for API calls",
    "Include authentication where necessary",
    "Add data validation and sanitization",
  ];
  
  const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
  return `${prompt}\n\nAdditional considerations: ${randomEnhancement}`;
}

export function getExamplePrompts(): string[] {
  return [
    "Send me an email whenever someone fills out my contact form on my website, and also create a new record in my Airtable database with their information",
    "Post to my Instagram, Facebook, and Twitter accounts simultaneously whenever I publish a new blog post",
    "Create a Slack notification when a new payment is received in Stripe, and update my Google Sheets with the transaction details",
    "Send a welcome email series through Mailchimp when someone signs up for my newsletter, and add them to my CRM",
    "Monitor my brand mentions on Twitter and automatically save them to a Google Drive folder with sentiment analysis",
    "Create a Trello card when a new issue is reported in GitHub, and notify my team in Discord",
    "Sync new Shopify orders to my inventory management system and send order confirmations via WhatsApp",
    "Schedule social media posts across all platforms based on my content calendar in Notion"
  ];
}

export function getPopularNodeTypes(): { name: string; type: string }[] {
  return servicesCatalog.slice(0, 15).map(service => ({
    name: service.name,
    type: service.nodeTypes[0]
  }));
}
