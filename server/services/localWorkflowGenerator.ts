import { nanoid } from 'nanoid';
import type { WorkflowResponse } from '@shared/schema';
import { servicesCatalog } from './servicesCatalog';

export function generateWorkflowFromPrompt(prompt: string): WorkflowResponse {
  // Enhanced local workflow generation with intelligent service detection and pattern matching
  const lowerPrompt = prompt.toLowerCase();
  
  // Advanced service detection with keywords and context
  const detectedServices = servicesCatalog.filter(service => {
    const serviceName = service.name.toLowerCase();
    const serviceKeywords = [
      serviceName,
      ...service.nodeTypes.map(nodeType => nodeType.split('.').pop()!.toLowerCase()),
      ...service.commonUseCases.map(useCase => useCase.toLowerCase())
    ];
    
    return serviceKeywords.some(keyword => lowerPrompt.includes(keyword));
  });
  
  // Intelligent workflow type detection
  let workflowType = 'generic';
  let triggerType = 'Manual';
  let nodes: any[] = [];
  let connections: any = {};
  
  // Advanced pattern matching for different workflow types
  if (lowerPrompt.includes('email') || lowerPrompt.includes('mail') || lowerPrompt.includes('notification')) {
    workflowType = 'email';
    triggerType = 'Webhook';
    
    // Add webhook trigger
    nodes.push({
      id: nanoid(),
      name: 'Webhook',
      type: 'n8n-nodes-base.webhook',
      position: [250, 300],
      parameters: {
        httpMethod: 'POST',
        path: 'webhook',
        responseMode: 'onReceived',
        responseData: 'allEntries'
      }
    });
    
    // Add email node
    nodes.push({
      id: nanoid(),
      name: 'Email Send',
      type: 'n8n-nodes-base.emailSend',
      position: [450, 300],
      parameters: {
        fromEmail: 'noreply@example.com',
        toEmail: 'user@example.com',
        subject: 'New Form Submission',
        message: 'A new form has been submitted.'
      }
    });
    
    // Connect nodes
    connections = {
      'Webhook': {
        main: [
          [{ node: 'Email Send', type: 'main', index: 0 }]
        ]
      }
    };
  } else if (lowerPrompt.includes('slack')) {
    workflowType = 'slack';
    triggerType = 'Webhook';
    
    // Add webhook trigger
    nodes.push({
      id: nanoid(),
      name: 'Webhook',
      type: 'n8n-nodes-base.webhook',
      position: [250, 300],
      parameters: {
        httpMethod: 'POST',
        path: 'webhook'
      }
    });
    
    // Add Slack node
    nodes.push({
      id: nanoid(),
      name: 'Slack',
      type: 'n8n-nodes-base.slack',
      position: [450, 300],
      parameters: {
        operation: 'postMessage',
        channel: '#general',
        text: 'New notification from workflow'
      }
    });
    
    connections = {
      'Webhook': {
        main: [
          [{ node: 'Slack', type: 'main', index: 0 }]
        ]
      }
    };
  } else if (lowerPrompt.includes('schedule') || lowerPrompt.includes('daily') || lowerPrompt.includes('hourly')) {
    workflowType = 'scheduled';
    triggerType = 'Schedule';
    
    // Add schedule trigger
    nodes.push({
      id: nanoid(),
      name: 'Schedule Trigger',
      type: 'n8n-nodes-base.scheduleTrigger',
      position: [250, 300],
      parameters: {
        rule: {
          interval: [
            {
              field: 'cronExpression',
              expression: '0 9 * * *'  // Daily at 9 AM
            }
          ]
        }
      }
    });
    
    // Add HTTP request node
    nodes.push({
      id: nanoid(),
      name: 'HTTP Request',
      type: 'n8n-nodes-base.httpRequest',
      position: [450, 300],
      parameters: {
        method: 'GET',
        url: 'https://api.example.com/data'
      }
    });
    
    connections = {
      'Schedule Trigger': {
        main: [
          [{ node: 'HTTP Request', type: 'main', index: 0 }]
        ]
      }
    };
  } else {
    // Generic workflow
    nodes.push({
      id: nanoid(),
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      position: [250, 300],
      parameters: {}
    });
    
    // Add detected service nodes
    detectedServices.slice(0, 2).forEach((service, index) => {
      nodes.push({
        id: nanoid(),
        name: service.name,
        type: service.nodeTypes[0],
        position: [450 + (index * 200), 300],
        parameters: {}
      });
    });
    
    // Create connections
    if (nodes.length > 1) {
      connections = {
        'Manual Trigger': {
          main: [
            [{ node: nodes[1].name, type: 'main', index: 0 }]
          ]
        }
      };
      
      if (nodes.length > 2) {
        connections[nodes[1].name] = {
          main: [
            [{ node: nodes[2].name, type: 'main', index: 0 }]
          ]
        };
      }
    }
  }
  
  // Generate workflow name and description
  const workflowName = generateWorkflowName(prompt);
  const description = generateWorkflowDescription(prompt, detectedServices);
  
  // Calculate estimated setup time
  const setupTime = calculateSetupTime(nodes.length, detectedServices.length);
  
  // Generate setup instructions
  const setupInstructions = generateSetupInstructions(nodes, detectedServices);
  
  return {
    name: workflowName,
    description,
    nodeCount: nodes.length,
    estimatedSetupTime: setupTime,
    triggerType,
    nodes,
    connections,
    setupInstructions,
    workflowJson: {
      name: workflowName,
      active: true,
      nodes,
      connections
    }
  };
}

function generateWorkflowName(prompt: string): string {
  const words = prompt.split(' ').slice(0, 5);
  const name = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return name.length > 50 ? name.substring(0, 47) + '...' : name;
}

function generateWorkflowDescription(prompt: string, services: any[]): string {
  const serviceNames = services.map(s => s.name).join(', ');
  const baseDescription = prompt.length > 100 ? prompt.substring(0, 97) + '...' : prompt;
  
  if (services.length > 0) {
    return `${baseDescription} (Uses: ${serviceNames})`;
  }
  
  return baseDescription;
}

function calculateSetupTime(nodeCount: number, serviceCount: number): string {
  const baseTime = 5; // 5 minutes base
  const nodeTime = nodeCount * 2; // 2 minutes per node
  const serviceTime = serviceCount * 3; // 3 minutes per service (auth setup)
  
  const totalMinutes = baseTime + nodeTime + serviceTime;
  
  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
}

function generateSetupInstructions(nodes: any[], services: any[]): string[] {
  const instructions: string[] = [
    "1. Import this workflow JSON into your n8n instance",
    "2. Open the workflow in n8n editor",
  ];
  
  // Add service-specific instructions
  services.forEach(service => {
    if (service.authRequired) {
      instructions.push(`3. Configure ${service.name} credentials in n8n settings`);
    }
  });
  
  // Add node-specific instructions
  nodes.forEach(node => {
    if (node.type.includes('webhook')) {
      instructions.push("4. Configure webhook URL in your external service");
    }
    if (node.type.includes('email')) {
      instructions.push("5. Set up SMTP credentials for email sending");
    }
    if (node.type.includes('schedule')) {
      instructions.push("6. Adjust schedule timing as needed");
    }
  });
  
  instructions.push("7. Test the workflow with sample data");
  instructions.push("8. Activate the workflow when ready");
  
  return instructions;
}