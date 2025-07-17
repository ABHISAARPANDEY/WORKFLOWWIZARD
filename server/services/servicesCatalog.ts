// Enhanced service catalog with 50+ services for N8N workflow generation
export interface ServiceDefinition {
  name: string;
  nodeTypes: string[];
  category: string;
  description: string;
  authRequired: boolean;
  commonUseCases: string[];
  setupComplexity: 'low' | 'medium' | 'high';
}

export const servicesCatalog: ServiceDefinition[] = [
  // Social Media Platforms
  {
    name: 'Facebook',
    nodeTypes: ['n8n-nodes-base.facebookGraphApi', 'n8n-nodes-base.facebookTrigger'],
    category: 'Social Media',
    description: 'Facebook Graph API integration for posts, pages, and user data',
    authRequired: true,
    commonUseCases: ['Post scheduling', 'Lead generation', 'Page management'],
    setupComplexity: 'high'
  },
  {
    name: 'Instagram',
    nodeTypes: ['n8n-nodes-base.instagramGraphApi', 'n8n-nodes-base.instagram'],
    category: 'Social Media',
    description: 'Instagram API for media posting and account management',
    authRequired: true,
    commonUseCases: ['Content publishing', 'Hashtag analysis', 'Story management'],
    setupComplexity: 'high'
  },
  {
    name: 'Twitter',
    nodeTypes: ['n8n-nodes-base.twitter', 'n8n-nodes-base.twitterV2'],
    category: 'Social Media',
    description: 'Twitter API for tweets, followers, and engagement',
    authRequired: true,
    commonUseCases: ['Tweet scheduling', 'Mention monitoring', 'Follower analysis'],
    setupComplexity: 'medium'
  },
  {
    name: 'LinkedIn',
    nodeTypes: ['n8n-nodes-base.linkedIn', 'n8n-nodes-base.linkedInV2'],
    category: 'Social Media',
    description: 'LinkedIn API for professional networking and content',
    authRequired: true,
    commonUseCases: ['Professional posting', 'Connection management', 'Company updates'],
    setupComplexity: 'high'
  },
  {
    name: 'YouTube',
    nodeTypes: ['n8n-nodes-base.youTube', 'n8n-nodes-base.youTubeV2'],
    category: 'Social Media',
    description: 'YouTube API for video management and analytics',
    authRequired: true,
    commonUseCases: ['Video uploads', 'Channel management', 'Analytics tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'TikTok',
    nodeTypes: ['n8n-nodes-base.tiktok', 'n8n-nodes-base.tiktokBusiness'],
    category: 'Social Media',
    description: 'TikTok API for content and business management',
    authRequired: true,
    commonUseCases: ['Content publishing', 'Business analytics', 'Ad management'],
    setupComplexity: 'high'
  },
  {
    name: 'Pinterest',
    nodeTypes: ['n8n-nodes-base.pinterest', 'n8n-nodes-base.pinterestV2'],
    category: 'Social Media',
    description: 'Pinterest API for pins and board management',
    authRequired: true,
    commonUseCases: ['Pin scheduling', 'Board organization', 'Analytics'],
    setupComplexity: 'medium'
  },

  // Communication Platforms
  {
    name: 'Slack',
    nodeTypes: ['n8n-nodes-base.slack', 'n8n-nodes-base.slackV2'],
    category: 'Communication',
    description: 'Slack API for team communication and automation',
    authRequired: true,
    commonUseCases: ['Team notifications', 'Channel management', 'Bot responses'],
    setupComplexity: 'low'
  },
  {
    name: 'Discord',
    nodeTypes: ['n8n-nodes-base.discord', 'n8n-nodes-base.discordV2'],
    category: 'Communication',
    description: 'Discord API for server and channel management',
    authRequired: true,
    commonUseCases: ['Server notifications', 'Member management', 'Bot commands'],
    setupComplexity: 'medium'
  },
  {
    name: 'Microsoft Teams',
    nodeTypes: ['n8n-nodes-base.microsoftTeams', 'n8n-nodes-base.teamsV2'],
    category: 'Communication',
    description: 'Microsoft Teams API for enterprise communication',
    authRequired: true,
    commonUseCases: ['Team notifications', 'Meeting scheduling', 'File sharing'],
    setupComplexity: 'high'
  },
  {
    name: 'Telegram',
    nodeTypes: ['n8n-nodes-base.telegram', 'n8n-nodes-base.telegramTrigger'],
    category: 'Communication',
    description: 'Telegram Bot API for messaging automation',
    authRequired: true,
    commonUseCases: ['Bot responses', 'Group management', 'Notifications'],
    setupComplexity: 'low'
  },
  {
    name: 'WhatsApp Business',
    nodeTypes: ['n8n-nodes-base.whatsApp', 'n8n-nodes-base.whatsAppBusiness'],
    category: 'Communication',
    description: 'WhatsApp Business API for customer communication',
    authRequired: true,
    commonUseCases: ['Customer support', 'Order notifications', 'Marketing messages'],
    setupComplexity: 'high'
  },

  // Email Services
  {
    name: 'Gmail',
    nodeTypes: ['n8n-nodes-base.gmail', 'n8n-nodes-base.gmailV2'],
    category: 'Email',
    description: 'Gmail API for email automation and management',
    authRequired: true,
    commonUseCases: ['Email automation', 'Label management', 'Attachment processing'],
    setupComplexity: 'medium'
  },
  {
    name: 'Outlook',
    nodeTypes: ['n8n-nodes-base.microsoftOutlook', 'n8n-nodes-base.outlook'],
    category: 'Email',
    description: 'Microsoft Outlook API for email and calendar',
    authRequired: true,
    commonUseCases: ['Email scheduling', 'Calendar sync', 'Contact management'],
    setupComplexity: 'medium'
  },
  {
    name: 'SendGrid',
    nodeTypes: ['n8n-nodes-base.sendGrid', 'n8n-nodes-base.sendGridV2'],
    category: 'Email',
    description: 'SendGrid API for transactional email sending',
    authRequired: true,
    commonUseCases: ['Transactional emails', 'Marketing campaigns', 'Email analytics'],
    setupComplexity: 'low'
  },
  {
    name: 'Mailchimp',
    nodeTypes: ['n8n-nodes-base.mailchimp', 'n8n-nodes-base.mailchimpV2'],
    category: 'Email',
    description: 'Mailchimp API for email marketing automation',
    authRequired: true,
    commonUseCases: ['Email campaigns', 'List management', 'Automation sequences'],
    setupComplexity: 'medium'
  },

  // E-commerce & Payments
  {
    name: 'Stripe',
    nodeTypes: ['n8n-nodes-base.stripe', 'n8n-nodes-base.stripeTrigger'],
    category: 'E-commerce',
    description: 'Stripe API for payment processing and subscriptions',
    authRequired: true,
    commonUseCases: ['Payment processing', 'Subscription management', 'Invoice creation'],
    setupComplexity: 'medium'
  },
  {
    name: 'PayPal',
    nodeTypes: ['n8n-nodes-base.payPal', 'n8n-nodes-base.payPalTrigger'],
    category: 'E-commerce',
    description: 'PayPal API for payment processing',
    authRequired: true,
    commonUseCases: ['Payment verification', 'Refund processing', 'Transaction tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'Shopify',
    nodeTypes: ['n8n-nodes-base.shopify', 'n8n-nodes-base.shopifyTrigger'],
    category: 'E-commerce',
    description: 'Shopify API for e-commerce store management',
    authRequired: true,
    commonUseCases: ['Order management', 'Inventory sync', 'Customer data'],
    setupComplexity: 'medium'
  },
  {
    name: 'WooCommerce',
    nodeTypes: ['n8n-nodes-base.wooCommerce', 'n8n-nodes-base.wooCommerceTrigger'],
    category: 'E-commerce',
    description: 'WooCommerce API for WordPress e-commerce',
    authRequired: true,
    commonUseCases: ['Product management', 'Order processing', 'Customer sync'],
    setupComplexity: 'medium'
  },
  {
    name: 'Square',
    nodeTypes: ['n8n-nodes-base.square', 'n8n-nodes-base.squareTrigger'],
    category: 'E-commerce',
    description: 'Square API for point-of-sale and payments',
    authRequired: true,
    commonUseCases: ['Payment processing', 'Inventory management', 'Customer data'],
    setupComplexity: 'medium'
  },

  // Productivity & Project Management
  {
    name: 'Notion',
    nodeTypes: ['n8n-nodes-base.notion', 'n8n-nodes-base.notionTrigger'],
    category: 'Productivity',
    description: 'Notion API for database and page management',
    authRequired: true,
    commonUseCases: ['Database updates', 'Page creation', 'Task management'],
    setupComplexity: 'medium'
  },
  {
    name: 'Trello',
    nodeTypes: ['n8n-nodes-base.trello', 'n8n-nodes-base.trelloTrigger'],
    category: 'Productivity',
    description: 'Trello API for board and card management',
    authRequired: true,
    commonUseCases: ['Card automation', 'Board management', 'Task tracking'],
    setupComplexity: 'low'
  },
  {
    name: 'Asana',
    nodeTypes: ['n8n-nodes-base.asana', 'n8n-nodes-base.asanaTrigger'],
    category: 'Productivity',
    description: 'Asana API for project and task management',
    authRequired: true,
    commonUseCases: ['Task creation', 'Project tracking', 'Team collaboration'],
    setupComplexity: 'medium'
  },
  {
    name: 'Monday.com',
    nodeTypes: ['n8n-nodes-base.mondaycom', 'n8n-nodes-base.mondayTrigger'],
    category: 'Productivity',
    description: 'Monday.com API for work management',
    authRequired: true,
    commonUseCases: ['Board management', 'Item tracking', 'Team updates'],
    setupComplexity: 'medium'
  },
  {
    name: 'Jira',
    nodeTypes: ['n8n-nodes-base.jira', 'n8n-nodes-base.jiraTrigger'],
    category: 'Productivity',
    description: 'Jira API for issue and project tracking',
    authRequired: true,
    commonUseCases: ['Issue creation', 'Project management', 'Bug tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'ClickUp',
    nodeTypes: ['n8n-nodes-base.clickUp', 'n8n-nodes-base.clickUpTrigger'],
    category: 'Productivity',
    description: 'ClickUp API for task and project management',
    authRequired: true,
    commonUseCases: ['Task management', 'Time tracking', 'Goal setting'],
    setupComplexity: 'medium'
  },

  // Data & Analytics
  {
    name: 'Google Sheets',
    nodeTypes: ['n8n-nodes-base.googleSheets', 'n8n-nodes-base.googleSheetsV2'],
    category: 'Data',
    description: 'Google Sheets API for spreadsheet automation',
    authRequired: true,
    commonUseCases: ['Data entry', 'Report generation', 'Data sync'],
    setupComplexity: 'low'
  },
  {
    name: 'Airtable',
    nodeTypes: ['n8n-nodes-base.airtable', 'n8n-nodes-base.airtableTrigger'],
    category: 'Data',
    description: 'Airtable API for database management',
    authRequired: true,
    commonUseCases: ['Database updates', 'Record creation', 'Data organization'],
    setupComplexity: 'low'
  },
  {
    name: 'Google Analytics',
    nodeTypes: ['n8n-nodes-base.googleAnalytics', 'n8n-nodes-base.googleAnalyticsV2'],
    category: 'Analytics',
    description: 'Google Analytics API for web analytics',
    authRequired: true,
    commonUseCases: ['Traffic analysis', 'Report generation', 'Goal tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'Mixpanel',
    nodeTypes: ['n8n-nodes-base.mixpanel', 'n8n-nodes-base.mixpanelV2'],
    category: 'Analytics',
    description: 'Mixpanel API for event tracking and analytics',
    authRequired: true,
    commonUseCases: ['Event tracking', 'User analytics', 'Funnel analysis'],
    setupComplexity: 'medium'
  },

  // CRM & Sales
  {
    name: 'Salesforce',
    nodeTypes: ['n8n-nodes-base.salesforce', 'n8n-nodes-base.salesforceTrigger'],
    category: 'CRM',
    description: 'Salesforce API for customer relationship management',
    authRequired: true,
    commonUseCases: ['Lead management', 'Contact sync', 'Opportunity tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'HubSpot',
    nodeTypes: ['n8n-nodes-base.hubspot', 'n8n-nodes-base.hubspotTrigger'],
    category: 'CRM',
    description: 'HubSpot API for marketing and sales automation',
    authRequired: true,
    commonUseCases: ['Contact management', 'Deal tracking', 'Marketing automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'Pipedrive',
    nodeTypes: ['n8n-nodes-base.pipedrive', 'n8n-nodes-base.pipedriveTrigger'],
    category: 'CRM',
    description: 'Pipedrive API for sales pipeline management',
    authRequired: true,
    commonUseCases: ['Deal management', 'Contact sync', 'Sales tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'Zoho CRM',
    nodeTypes: ['n8n-nodes-base.zohoCrm', 'n8n-nodes-base.zohoTrigger'],
    category: 'CRM',
    description: 'Zoho CRM API for customer management',
    authRequired: true,
    commonUseCases: ['Lead tracking', 'Contact management', 'Sales automation'],
    setupComplexity: 'medium'
  },

  // Development & Code Management
  {
    name: 'GitHub',
    nodeTypes: ['n8n-nodes-base.github', 'n8n-nodes-base.githubTrigger'],
    category: 'Development',
    description: 'GitHub API for repository and project management',
    authRequired: true,
    commonUseCases: ['Repository management', 'Issue tracking', 'PR automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'GitLab',
    nodeTypes: ['n8n-nodes-base.gitlab', 'n8n-nodes-base.gitlabTrigger'],
    category: 'Development',
    description: 'GitLab API for DevOps and repository management',
    authRequired: true,
    commonUseCases: ['CI/CD automation', 'Issue management', 'Merge requests'],
    setupComplexity: 'medium'
  },
  {
    name: 'Bitbucket',
    nodeTypes: ['n8n-nodes-base.bitbucket', 'n8n-nodes-base.bitbucketTrigger'],
    category: 'Development',
    description: 'Bitbucket API for code repository management',
    authRequired: true,
    commonUseCases: ['Repository sync', 'PR management', 'Branch operations'],
    setupComplexity: 'medium'
  },

  // File Storage & Cloud Services
  {
    name: 'Google Drive',
    nodeTypes: ['n8n-nodes-base.googleDrive', 'n8n-nodes-base.googleDriveTrigger'],
    category: 'Storage',
    description: 'Google Drive API for file management',
    authRequired: true,
    commonUseCases: ['File sync', 'Document sharing', 'Backup automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'Dropbox',
    nodeTypes: ['n8n-nodes-base.dropbox', 'n8n-nodes-base.dropboxV2'],
    category: 'Storage',
    description: 'Dropbox API for cloud file storage',
    authRequired: true,
    commonUseCases: ['File backup', 'Sync automation', 'Sharing management'],
    setupComplexity: 'medium'
  },
  {
    name: 'OneDrive',
    nodeTypes: ['n8n-nodes-base.microsoftOneDrive', 'n8n-nodes-base.oneDrive'],
    category: 'Storage',
    description: 'Microsoft OneDrive API for file storage',
    authRequired: true,
    commonUseCases: ['File synchronization', 'Document management', 'Backup'],
    setupComplexity: 'medium'
  },
  {
    name: 'AWS S3',
    nodeTypes: ['n8n-nodes-base.awsS3', 'n8n-nodes-base.s3'],
    category: 'Storage',
    description: 'Amazon S3 API for cloud storage',
    authRequired: true,
    commonUseCases: ['File storage', 'Backup automation', 'Static hosting'],
    setupComplexity: 'high'
  },

  // Marketing & Advertising
  {
    name: 'Google Ads',
    nodeTypes: ['n8n-nodes-base.googleAds', 'n8n-nodes-base.googleAdsV2'],
    category: 'Marketing',
    description: 'Google Ads API for advertising campaigns',
    authRequired: true,
    commonUseCases: ['Campaign management', 'Keyword tracking', 'Ad optimization'],
    setupComplexity: 'high'
  },
  {
    name: 'Facebook Ads',
    nodeTypes: ['n8n-nodes-base.facebookAds', 'n8n-nodes-base.facebookMarketing'],
    category: 'Marketing',
    description: 'Facebook Ads API for social media advertising',
    authRequired: true,
    commonUseCases: ['Ad campaign management', 'Audience targeting', 'Performance tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'Mailgun',
    nodeTypes: ['n8n-nodes-base.mailgun', 'n8n-nodes-base.mailgunV2'],
    category: 'Marketing',
    description: 'Mailgun API for email delivery service',
    authRequired: true,
    commonUseCases: ['Email delivery', 'Bounce handling', 'Email validation'],
    setupComplexity: 'low'
  },

  // AI & Machine Learning
  {
    name: 'OpenAI',
    nodeTypes: ['n8n-nodes-base.openAi', 'n8n-nodes-base.openAiV2'],
    category: 'AI',
    description: 'OpenAI API for AI-powered text and image generation',
    authRequired: true,
    commonUseCases: ['Text generation', 'Image creation', 'Language translation'],
    setupComplexity: 'low'
  },
  {
    name: 'Anthropic Claude',
    nodeTypes: ['n8n-nodes-base.anthropic', 'n8n-nodes-base.claude'],
    category: 'AI',
    description: 'Anthropic Claude API for AI conversations',
    authRequired: true,
    commonUseCases: ['Text analysis', 'Content generation', 'Question answering'],
    setupComplexity: 'low'
  },

  // Core N8N Nodes
  {
    name: 'HTTP Request',
    nodeTypes: ['n8n-nodes-base.httpRequest', 'n8n-nodes-base.httpRequestV2'],
    category: 'Core',
    description: 'Generic HTTP request node for API calls',
    authRequired: false,
    commonUseCases: ['API integration', 'Webhook calls', 'Data fetching'],
    setupComplexity: 'low'
  },
  {
    name: 'Webhook',
    nodeTypes: ['n8n-nodes-base.webhook', 'n8n-nodes-base.webhookV2'],
    category: 'Core',
    description: 'Webhook trigger for receiving HTTP requests',
    authRequired: false,
    commonUseCases: ['Form submissions', 'API endpoints', 'Event triggers'],
    setupComplexity: 'low'
  },
  {
    name: 'Schedule Trigger',
    nodeTypes: ['n8n-nodes-base.scheduleTrigger', 'n8n-nodes-base.cron'],
    category: 'Core',
    description: 'Time-based trigger for scheduled workflows',
    authRequired: false,
    commonUseCases: ['Recurring tasks', 'Batch processing', 'Maintenance jobs'],
    setupComplexity: 'low'
  },
  {
    name: 'Email Send',
    nodeTypes: ['n8n-nodes-base.emailSend', 'n8n-nodes-base.emailSendV2'],
    category: 'Core',
    description: 'Generic email sending node',
    authRequired: false,
    commonUseCases: ['Notifications', 'Alerts', 'Report delivery'],
    setupComplexity: 'low'
  },
  {
    name: 'Set',
    nodeTypes: ['n8n-nodes-base.set', 'n8n-nodes-base.setV2'],
    category: 'Core',
    description: 'Data manipulation and transformation node',
    authRequired: false,
    commonUseCases: ['Data formatting', 'Variable setting', 'Field mapping'],
    setupComplexity: 'low'
  },
  {
    name: 'IF',
    nodeTypes: ['n8n-nodes-base.if', 'n8n-nodes-base.ifV2'],
    category: 'Core',
    description: 'Conditional logic node for workflow branching',
    authRequired: false,
    commonUseCases: ['Decision making', 'Data filtering', 'Conditional routing'],
    setupComplexity: 'low'
  }
];

// Helper functions for service lookup
export function getServiceByName(name: string): ServiceDefinition | undefined {
  return servicesCatalog.find(service => 
    service.name.toLowerCase() === name.toLowerCase()
  );
}

export function getServicesByCategory(category: string): ServiceDefinition[] {
  return servicesCatalog.filter(service => 
    service.category.toLowerCase() === category.toLowerCase()
  );
}

export function getServicesByComplexity(complexity: 'low' | 'medium' | 'high'): ServiceDefinition[] {
  return servicesCatalog.filter(service => service.setupComplexity === complexity);
}

export function searchServices(query: string): ServiceDefinition[] {
  const lowerQuery = query.toLowerCase();
  return servicesCatalog.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.commonUseCases.some(useCase => useCase.toLowerCase().includes(lowerQuery))
  );
}