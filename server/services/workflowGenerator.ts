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
  // Comprehensive local enhancement for production-ready workflows
  const lowerPrompt = prompt.toLowerCase();
  
  // Detect workflow type and add specific enhancements
  let enhancedPrompt = prompt;
  
  // Add technical specifications based on detected services
  if (lowerPrompt.includes('email') || lowerPrompt.includes('mail')) {
    enhancedPrompt += `\n\nEmail Integration Specifications:
- Configure SMTP/API credentials for email service (Gmail, Outlook, SendGrid)
- Include email template with personalized fields and branding
- Add email validation and bounce handling
- Implement delivery tracking and read receipts
- Set up automated follow-up sequences based on recipient actions`;
  }
  
  if (lowerPrompt.includes('slack') || lowerPrompt.includes('discord') || lowerPrompt.includes('teams')) {
    enhancedPrompt += `\n\nTeam Communication Enhancements:
- Configure channel-specific routing based on message type/priority
- Add rich message formatting with buttons and interactive elements
- Include user mention notifications for urgent items
- Set up threaded conversations for complex discussions
- Implement message scheduling and timezone awareness`;
  }
  
  if (lowerPrompt.includes('shopify') || lowerPrompt.includes('stripe') || lowerPrompt.includes('paypal')) {
    enhancedPrompt += `\n\nE-commerce Integration Requirements:
- Implement webhook security validation and signature verification
- Add comprehensive order status tracking and updates
- Include inventory management and low-stock alerts
- Set up refund and cancellation handling workflows
- Add tax calculation and compliance reporting
- Include fraud detection and risk assessment`;
  }
  
  if (lowerPrompt.includes('social') || lowerPrompt.includes('facebook') || lowerPrompt.includes('instagram') || lowerPrompt.includes('twitter')) {
    enhancedPrompt += `\n\nSocial Media Automation Enhancements:
- Configure multi-platform posting with platform-specific formatting
- Add content scheduling and optimal timing algorithms
- Include hashtag management and trending analysis
- Set up engagement tracking and response automation
- Add content approval workflows and compliance checks
- Include analytics and performance reporting`;
  }
  
  // Add universal production-ready enhancements
  enhancedPrompt += `\n\nProduction-Ready Implementation:
- Error Handling: Implement comprehensive try-catch blocks with specific error codes and recovery strategies
- Data Validation: Add field-level validation with proper sanitization and type checking
- Security: Include authentication, authorization, and data encryption where applicable
- Monitoring: Add logging, metrics collection, and alerting for system health
- Performance: Implement rate limiting, caching, and request optimization
- Scalability: Design for high-volume processing with queue management
- Backup: Include data backup and recovery mechanisms for critical workflows
- Testing: Add validation steps and test data processing before production deployment`;
  
  return enhancedPrompt;
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
