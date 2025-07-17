
// Enhanced service catalog with 100+ services for N8N workflow generation
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
  {
    name: 'Reddit',
    nodeTypes: ['n8n-nodes-base.reddit', 'n8n-nodes-base.redditV2'],
    category: 'Social Media',
    description: 'Reddit API for posts, comments, and community management',
    authRequired: true,
    commonUseCases: ['Content posting', 'Community monitoring', 'Engagement tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'Snapchat',
    nodeTypes: ['n8n-nodes-base.snapchat', 'n8n-nodes-base.snapchatAds'],
    category: 'Social Media',
    description: 'Snapchat API for content and advertising',
    authRequired: true,
    commonUseCases: ['Story publishing', 'Ad management', 'Analytics'],
    setupComplexity: 'high'
  },

  // Communication & Messaging
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
    name: 'Twilio',
    nodeTypes: ['n8n-nodes-base.twilio', 'n8n-nodes-base.twilioV2'],
    category: 'Communication',
    description: 'Twilio API for SMS, voice calls, and communication',
    authRequired: true,
    commonUseCases: ['SMS notifications', 'Voice calls', 'Two-factor authentication'],
    setupComplexity: 'medium'
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
  {
    name: 'Zoom',
    nodeTypes: ['n8n-nodes-base.zoom', 'n8n-nodes-base.zoomV2'],
    category: 'Communication',
    description: 'Zoom API for video conferencing and meetings',
    authRequired: true,
    commonUseCases: ['Meeting scheduling', 'Recording management', 'Webinar automation'],
    setupComplexity: 'medium'
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
    commonUseCases: ['Email campaigns', 'List management', 'A/B testing'],
    setupComplexity: 'medium'
  },
  {
    name: 'Mailgun',
    nodeTypes: ['n8n-nodes-base.mailgun', 'n8n-nodes-base.mailgunV2'],
    category: 'Email',
    description: 'Mailgun API for email delivery and validation',
    authRequired: true,
    commonUseCases: ['Email delivery', 'Validation', 'Analytics'],
    setupComplexity: 'low'
  },
  {
    name: 'Amazon SES',
    nodeTypes: ['n8n-nodes-base.awsSes', 'n8n-nodes-base.amazonSes'],
    category: 'Email',
    description: 'Amazon Simple Email Service for scalable email sending',
    authRequired: true,
    commonUseCases: ['Bulk email sending', 'Email templates', 'Bounce handling'],
    setupComplexity: 'medium'
  },

  // E-commerce & Payments
  {
    name: 'Stripe',
    nodeTypes: ['n8n-nodes-base.stripe', 'n8n-nodes-base.stripeV2'],
    category: 'E-commerce',
    description: 'Stripe API for online payments and subscriptions',
    authRequired: true,
    commonUseCases: ['Payment processing', 'Subscription management', 'Invoice generation'],
    setupComplexity: 'medium'
  },
  {
    name: 'PayPal',
    nodeTypes: ['n8n-nodes-base.payPal', 'n8n-nodes-base.payPalV2'],
    category: 'E-commerce',
    description: 'PayPal API for online payments and transactions',
    authRequired: true,
    commonUseCases: ['Payment processing', 'Refund management', 'Transaction tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'Shopify',
    nodeTypes: ['n8n-nodes-base.shopify', 'n8n-nodes-base.shopifyV2'],
    category: 'E-commerce',
    description: 'Shopify API for e-commerce store management',
    authRequired: true,
    commonUseCases: ['Product management', 'Order processing', 'Customer data'],
    setupComplexity: 'medium'
  },
  {
    name: 'WooCommerce',
    nodeTypes: ['n8n-nodes-base.wooCommerce', 'n8n-nodes-base.wooCommerceV2'],
    category: 'E-commerce',
    description: 'WooCommerce API for WordPress e-commerce',
    authRequired: true,
    commonUseCases: ['Product sync', 'Order management', 'Customer tracking'],
    setupComplexity: 'medium'
  },
  {
    name: 'Square',
    nodeTypes: ['n8n-nodes-base.square', 'n8n-nodes-base.squareV2'],
    category: 'E-commerce',
    description: 'Square API for point-of-sale and payments',
    authRequired: true,
    commonUseCases: ['POS integration', 'Inventory management', 'Sales reporting'],
    setupComplexity: 'medium'
  },
  {
    name: 'Amazon',
    nodeTypes: ['n8n-nodes-base.amazon', 'n8n-nodes-base.amazonMarketplace'],
    category: 'E-commerce',
    description: 'Amazon API for marketplace operations',
    authRequired: true,
    commonUseCases: ['Product listings', 'Order management', 'FBA integration'],
    setupComplexity: 'high'
  },
  {
    name: 'eBay',
    nodeTypes: ['n8n-nodes-base.ebay', 'n8n-nodes-base.ebayV2'],
    category: 'E-commerce',
    description: 'eBay API for marketplace management',
    authRequired: true,
    commonUseCases: ['Listing management', 'Order processing', 'Inventory sync'],
    setupComplexity: 'high'
  },
  {
    name: 'Etsy',
    nodeTypes: ['n8n-nodes-base.etsy', 'n8n-nodes-base.etsyV2'],
    category: 'E-commerce',
    description: 'Etsy API for handmade marketplace',
    authRequired: true,
    commonUseCases: ['Shop management', 'Product listings', 'Order tracking'],
    setupComplexity: 'medium'
  },

  // Productivity & Project Management
  {
    name: 'Notion',
    nodeTypes: ['n8n-nodes-base.notion', 'n8n-nodes-base.notionV2'],
    category: 'Productivity',
    description: 'Notion API for workspace and database management',
    authRequired: true,
    commonUseCases: ['Database automation', 'Page creation', 'Task management'],
    setupComplexity: 'medium'
  },
  {
    name: 'Trello',
    nodeTypes: ['n8n-nodes-base.trello', 'n8n-nodes-base.trelloV2'],
    category: 'Productivity',
    description: 'Trello API for kanban board management',
    authRequired: true,
    commonUseCases: ['Card management', 'Board automation', 'Task tracking'],
    setupComplexity: 'low'
  },
  {
    name: 'Asana',
    nodeTypes: ['n8n-nodes-base.asana', 'n8n-nodes-base.asanaV2'],
    category: 'Productivity',
    description: 'Asana API for project and task management',
    authRequired: true,
    commonUseCases: ['Task automation', 'Project tracking', 'Team collaboration'],
    setupComplexity: 'medium'
  },
  {
    name: 'Monday.com',
    nodeTypes: ['n8n-nodes-base.mondaycom', 'n8n-nodes-base.mondayV2'],
    category: 'Productivity',
    description: 'Monday.com API for work operating system',
    authRequired: true,
    commonUseCases: ['Board management', 'Item tracking', 'Team workflows'],
    setupComplexity: 'medium'
  },
  {
    name: 'Jira',
    nodeTypes: ['n8n-nodes-base.jira', 'n8n-nodes-base.jiraV2'],
    category: 'Productivity',
    description: 'Jira API for issue tracking and project management',
    authRequired: true,
    commonUseCases: ['Issue management', 'Sprint planning', 'Bug tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'ClickUp',
    nodeTypes: ['n8n-nodes-base.clickUp', 'n8n-nodes-base.clickUpV2'],
    category: 'Productivity',
    description: 'ClickUp API for all-in-one workspace',
    authRequired: true,
    commonUseCases: ['Task management', 'Time tracking', 'Goal setting'],
    setupComplexity: 'medium'
  },
  {
    name: 'Todoist',
    nodeTypes: ['n8n-nodes-base.todoist', 'n8n-nodes-base.todoistV2'],
    category: 'Productivity',
    description: 'Todoist API for task management',
    authRequired: true,
    commonUseCases: ['Task creation', 'Project management', 'Productivity tracking'],
    setupComplexity: 'low'
  },
  {
    name: 'Basecamp',
    nodeTypes: ['n8n-nodes-base.basecamp', 'n8n-nodes-base.basecampV2'],
    category: 'Productivity',
    description: 'Basecamp API for project management',
    authRequired: true,
    commonUseCases: ['Project organization', 'Team communication', 'Document sharing'],
    setupComplexity: 'medium'
  },

  // Data & Analytics
  {
    name: 'Google Sheets',
    nodeTypes: ['n8n-nodes-base.googleSheets', 'n8n-nodes-base.googleSheetsV2'],
    category: 'Data',
    description: 'Google Sheets API for spreadsheet automation',
    authRequired: true,
    commonUseCases: ['Data entry', 'Report generation', 'Calculation automation'],
    setupComplexity: 'low'
  },
  {
    name: 'Airtable',
    nodeTypes: ['n8n-nodes-base.airtable', 'n8n-nodes-base.airtableV2'],
    category: 'Data',
    description: 'Airtable API for database management',
    authRequired: true,
    commonUseCases: ['Record management', 'Database automation', 'Collaborative data'],
    setupComplexity: 'medium'
  },
  {
    name: 'Google Analytics',
    nodeTypes: ['n8n-nodes-base.googleAnalytics', 'n8n-nodes-base.googleAnalyticsV2'],
    category: 'Analytics',
    description: 'Google Analytics API for web analytics',
    authRequired: true,
    commonUseCases: ['Traffic reporting', 'Conversion tracking', 'Performance metrics'],
    setupComplexity: 'high'
  },
  {
    name: 'Mixpanel',
    nodeTypes: ['n8n-nodes-base.mixpanel', 'n8n-nodes-base.mixpanelV2'],
    category: 'Analytics',
    description: 'Mixpanel API for product analytics',
    authRequired: true,
    commonUseCases: ['Event tracking', 'User behavior', 'Funnel analysis'],
    setupComplexity: 'medium'
  },
  {
    name: 'Segment',
    nodeTypes: ['n8n-nodes-base.segment', 'n8n-nodes-base.segmentV2'],
    category: 'Analytics',
    description: 'Segment API for customer data platform',
    authRequired: true,
    commonUseCases: ['Data collection', 'Customer profiles', 'Event streaming'],
    setupComplexity: 'medium'
  },
  {
    name: 'Amplitude',
    nodeTypes: ['n8n-nodes-base.amplitude', 'n8n-nodes-base.amplitudeV2'],
    category: 'Analytics',
    description: 'Amplitude API for product analytics',
    authRequired: true,
    commonUseCases: ['User behavior', 'Feature adoption', 'Cohort analysis'],
    setupComplexity: 'medium'
  },
  {
    name: 'Hotjar',
    nodeTypes: ['n8n-nodes-base.hotjar', 'n8n-nodes-base.hotjarV2'],
    category: 'Analytics',
    description: 'Hotjar API for user behavior analytics',
    authRequired: true,
    commonUseCases: ['Heatmap analysis', 'User session recording', 'Survey feedback'],
    setupComplexity: 'medium'
  },

  // CRM & Sales
  {
    name: 'Salesforce',
    nodeTypes: ['n8n-nodes-base.salesforce', 'n8n-nodes-base.salesforceV2'],
    category: 'CRM',
    description: 'Salesforce API for customer relationship management',
    authRequired: true,
    commonUseCases: ['Lead management', 'Opportunity tracking', 'Account management'],
    setupComplexity: 'high'
  },
  {
    name: 'HubSpot',
    nodeTypes: ['n8n-nodes-base.hubspot', 'n8n-nodes-base.hubspotV2'],
    category: 'CRM',
    description: 'HubSpot API for marketing and sales automation',
    authRequired: true,
    commonUseCases: ['Contact management', 'Marketing automation', 'Sales pipeline'],
    setupComplexity: 'medium'
  },
  {
    name: 'Pipedrive',
    nodeTypes: ['n8n-nodes-base.pipedrive', 'n8n-nodes-base.pipedriveV2'],
    category: 'CRM',
    description: 'Pipedrive API for sales pipeline management',
    authRequired: true,
    commonUseCases: ['Deal tracking', 'Sales reporting', 'Activity management'],
    setupComplexity: 'medium'
  },
  {
    name: 'Zoho CRM',
    nodeTypes: ['n8n-nodes-base.zohoCrm', 'n8n-nodes-base.zohoV2'],
    category: 'CRM',
    description: 'Zoho CRM API for customer management',
    authRequired: true,
    commonUseCases: ['Contact management', 'Sales automation', 'Custom workflows'],
    setupComplexity: 'medium'
  },
  {
    name: 'Microsoft Dynamics',
    nodeTypes: ['n8n-nodes-base.microsoftDynamics', 'n8n-nodes-base.dynamics365'],
    category: 'CRM',
    description: 'Microsoft Dynamics API for enterprise CRM',
    authRequired: true,
    commonUseCases: ['Enterprise sales', 'Customer service', 'Field service'],
    setupComplexity: 'high'
  },
  {
    name: 'Freshsales',
    nodeTypes: ['n8n-nodes-base.freshsales', 'n8n-nodes-base.freshsalesV2'],
    category: 'CRM',
    description: 'Freshsales API for sales automation',
    authRequired: true,
    commonUseCases: ['Lead scoring', 'Contact management', 'Deal tracking'],
    setupComplexity: 'medium'
  },

  // Development & DevOps
  {
    name: 'GitHub',
    nodeTypes: ['n8n-nodes-base.github', 'n8n-nodes-base.githubV2'],
    category: 'Development',
    description: 'GitHub API for code repository management',
    authRequired: true,
    commonUseCases: ['Code automation', 'Issue tracking', 'Pull request management'],
    setupComplexity: 'medium'
  },
  {
    name: 'GitLab',
    nodeTypes: ['n8n-nodes-base.gitlab', 'n8n-nodes-base.gitlabV2'],
    category: 'Development',
    description: 'GitLab API for DevOps platform',
    authRequired: true,
    commonUseCases: ['CI/CD automation', 'Issue management', 'Merge requests'],
    setupComplexity: 'medium'
  },
  {
    name: 'Bitbucket',
    nodeTypes: ['n8n-nodes-base.bitbucket', 'n8n-nodes-base.bitbucketV2'],
    category: 'Development',
    description: 'Bitbucket API for code collaboration',
    authRequired: true,
    commonUseCases: ['Repository management', 'Pull requests', 'Pipeline automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'Jenkins',
    nodeTypes: ['n8n-nodes-base.jenkins', 'n8n-nodes-base.jenkinsV2'],
    category: 'Development',
    description: 'Jenkins API for continuous integration',
    authRequired: true,
    commonUseCases: ['Build automation', 'Deployment pipeline', 'Job management'],
    setupComplexity: 'high'
  },
  {
    name: 'Docker Hub',
    nodeTypes: ['n8n-nodes-base.dockerHub', 'n8n-nodes-base.dockerV2'],
    category: 'Development',
    description: 'Docker Hub API for container management',
    authRequired: true,
    commonUseCases: ['Image management', 'Repository automation', 'Build triggers'],
    setupComplexity: 'medium'
  },

  // Cloud Storage & File Management
  {
    name: 'Google Drive',
    nodeTypes: ['n8n-nodes-base.googleDrive', 'n8n-nodes-base.googleDriveV2'],
    category: 'Storage',
    description: 'Google Drive API for cloud file storage',
    authRequired: true,
    commonUseCases: ['File management', 'Document automation', 'Backup solutions'],
    setupComplexity: 'medium'
  },
  {
    name: 'Dropbox',
    nodeTypes: ['n8n-nodes-base.dropbox', 'n8n-nodes-base.dropboxV2'],
    category: 'Storage',
    description: 'Dropbox API for cloud storage',
    authRequired: true,
    commonUseCases: ['File sync', 'Team collaboration', 'Backup automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'OneDrive',
    nodeTypes: ['n8n-nodes-base.microsoftOneDrive', 'n8n-nodes-base.oneDriveV2'],
    category: 'Storage',
    description: 'Microsoft OneDrive API for cloud storage',
    authRequired: true,
    commonUseCases: ['File management', 'Office integration', 'Team sharing'],
    setupComplexity: 'medium'
  },
  {
    name: 'AWS S3',
    nodeTypes: ['n8n-nodes-base.awsS3', 'n8n-nodes-base.s3V2'],
    category: 'Storage',
    description: 'Amazon S3 API for object storage',
    authRequired: true,
    commonUseCases: ['Object storage', 'Static hosting', 'Backup solutions'],
    setupComplexity: 'high'
  },
  {
    name: 'Box',
    nodeTypes: ['n8n-nodes-base.box', 'n8n-nodes-base.boxV2'],
    category: 'Storage',
    description: 'Box API for enterprise file management',
    authRequired: true,
    commonUseCases: ['Enterprise file storage', 'Collaboration', 'Security compliance'],
    setupComplexity: 'medium'
  },

  // AI & Machine Learning
  {
    name: 'OpenAI',
    nodeTypes: ['n8n-nodes-base.openAi', 'n8n-nodes-base.openAiV2'],
    category: 'AI',
    description: 'OpenAI API for AI and machine learning',
    authRequired: true,
    commonUseCases: ['Text generation', 'Code completion', 'Image generation'],
    setupComplexity: 'medium'
  },
  {
    name: 'Anthropic Claude',
    nodeTypes: ['n8n-nodes-base.anthropic', 'n8n-nodes-base.claudeV2'],
    category: 'AI',
    description: 'Anthropic Claude API for AI assistance',
    authRequired: true,
    commonUseCases: ['Text analysis', 'Content generation', 'Question answering'],
    setupComplexity: 'medium'
  },
  {
    name: 'Google Cloud AI',
    nodeTypes: ['n8n-nodes-base.googleCloudAi', 'n8n-nodes-base.googleAiV2'],
    category: 'AI',
    description: 'Google Cloud AI API for machine learning',
    authRequired: true,
    commonUseCases: ['Image recognition', 'Natural language processing', 'Translation'],
    setupComplexity: 'high'
  },
  {
    name: 'AWS AI Services',
    nodeTypes: ['n8n-nodes-base.awsAi', 'n8n-nodes-base.awsRekognition'],
    category: 'AI',
    description: 'AWS AI Services for machine learning',
    authRequired: true,
    commonUseCases: ['Image analysis', 'Text extraction', 'Sentiment analysis'],
    setupComplexity: 'high'
  },
  {
    name: 'Hugging Face',
    nodeTypes: ['n8n-nodes-base.huggingFace', 'n8n-nodes-base.huggingFaceV2'],
    category: 'AI',
    description: 'Hugging Face API for NLP models',
    authRequired: true,
    commonUseCases: ['Model inference', 'Text classification', 'Token classification'],
    setupComplexity: 'medium'
  },

  // Marketing & Advertising
  {
    name: 'Google Ads',
    nodeTypes: ['n8n-nodes-base.googleAds', 'n8n-nodes-base.googleAdsV2'],
    category: 'Marketing',
    description: 'Google Ads API for advertising campaigns',
    authRequired: true,
    commonUseCases: ['Campaign management', 'Keyword optimization', 'Ad performance'],
    setupComplexity: 'high'
  },
  {
    name: 'Facebook Ads',
    nodeTypes: ['n8n-nodes-base.facebookAds', 'n8n-nodes-base.metaAds'],
    category: 'Marketing',
    description: 'Facebook Ads API for social media advertising',
    authRequired: true,
    commonUseCases: ['Ad campaign management', 'Audience targeting', 'Performance tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'LinkedIn Ads',
    nodeTypes: ['n8n-nodes-base.linkedInAds', 'n8n-nodes-base.linkedInMarketing'],
    category: 'Marketing',
    description: 'LinkedIn Ads API for professional advertising',
    authRequired: true,
    commonUseCases: ['B2B advertising', 'Lead generation', 'Professional targeting'],
    setupComplexity: 'high'
  },
  {
    name: 'Twitter Ads',
    nodeTypes: ['n8n-nodes-base.twitterAds', 'n8n-nodes-base.twitterMarketing'],
    category: 'Marketing',
    description: 'Twitter Ads API for social media advertising',
    authRequired: true,
    commonUseCases: ['Tweet promotion', 'Audience building', 'Engagement campaigns'],
    setupComplexity: 'high'
  },
  {
    name: 'ActiveCampaign',
    nodeTypes: ['n8n-nodes-base.activeCampaign', 'n8n-nodes-base.activeCampaignV2'],
    category: 'Marketing',
    description: 'ActiveCampaign API for marketing automation',
    authRequired: true,
    commonUseCases: ['Email marketing', 'Marketing automation', 'Customer journey'],
    setupComplexity: 'medium'
  },
  {
    name: 'Klaviyo',
    nodeTypes: ['n8n-nodes-base.klaviyo', 'n8n-nodes-base.klaviyoV2'],
    category: 'Marketing',
    description: 'Klaviyo API for email and SMS marketing',
    authRequired: true,
    commonUseCases: ['Email campaigns', 'SMS marketing', 'Customer segmentation'],
    setupComplexity: 'medium'
  },

  // Customer Support & Help Desk
  {
    name: 'Zendesk',
    nodeTypes: ['n8n-nodes-base.zendesk', 'n8n-nodes-base.zendeskV2'],
    category: 'Support',
    description: 'Zendesk API for customer support',
    authRequired: true,
    commonUseCases: ['Ticket management', 'Customer support', 'Knowledge base'],
    setupComplexity: 'medium'
  },
  {
    name: 'Freshdesk',
    nodeTypes: ['n8n-nodes-base.freshdesk', 'n8n-nodes-base.freshdeskV2'],
    category: 'Support',
    description: 'Freshdesk API for help desk solutions',
    authRequired: true,
    commonUseCases: ['Ticket automation', 'Customer queries', 'Support analytics'],
    setupComplexity: 'medium'
  },
  {
    name: 'Intercom',
    nodeTypes: ['n8n-nodes-base.intercom', 'n8n-nodes-base.intercomV2'],
    category: 'Support',
    description: 'Intercom API for customer messaging',
    authRequired: true,
    commonUseCases: ['Live chat', 'Customer engagement', 'Support automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'ServiceNow',
    nodeTypes: ['n8n-nodes-base.serviceNow', 'n8n-nodes-base.serviceNowV2'],
    category: 'Support',
    description: 'ServiceNow API for IT service management',
    authRequired: true,
    commonUseCases: ['IT ticketing', 'Service requests', 'Change management'],
    setupComplexity: 'high'
  },

  // Finance & Accounting
  {
    name: 'QuickBooks',
    nodeTypes: ['n8n-nodes-base.quickBooks', 'n8n-nodes-base.quickBooksV2'],
    category: 'Finance',
    description: 'QuickBooks API for accounting and finance',
    authRequired: true,
    commonUseCases: ['Invoice management', 'Expense tracking', 'Financial reporting'],
    setupComplexity: 'high'
  },
  {
    name: 'Xero',
    nodeTypes: ['n8n-nodes-base.xero', 'n8n-nodes-base.xeroV2'],
    category: 'Finance',
    description: 'Xero API for cloud accounting',
    authRequired: true,
    commonUseCases: ['Accounting automation', 'Invoice processing', 'Financial reports'],
    setupComplexity: 'medium'
  },
  {
    name: 'FreshBooks',
    nodeTypes: ['n8n-nodes-base.freshBooks', 'n8n-nodes-base.freshBooksV2'],
    category: 'Finance',
    description: 'FreshBooks API for small business accounting',
    authRequired: true,
    commonUseCases: ['Time tracking', 'Invoice creation', 'Expense management'],
    setupComplexity: 'medium'
  },
  {
    name: 'Wave Accounting',
    nodeTypes: ['n8n-nodes-base.wave', 'n8n-nodes-base.waveV2'],
    category: 'Finance',
    description: 'Wave API for free accounting software',
    authRequired: true,
    commonUseCases: ['Small business accounting', 'Receipt tracking', 'Invoice automation'],
    setupComplexity: 'medium'
  },

  // HR & Recruitment
  {
    name: 'BambooHR',
    nodeTypes: ['n8n-nodes-base.bambooHr', 'n8n-nodes-base.bambooHrV2'],
    category: 'HR',
    description: 'BambooHR API for human resources management',
    authRequired: true,
    commonUseCases: ['Employee management', 'Time tracking', 'Performance reviews'],
    setupComplexity: 'medium'
  },
  {
    name: 'Workday',
    nodeTypes: ['n8n-nodes-base.workday', 'n8n-nodes-base.workdayV2'],
    category: 'HR',
    description: 'Workday API for enterprise HR solutions',
    authRequired: true,
    commonUseCases: ['Employee data', 'Payroll processing', 'Talent management'],
    setupComplexity: 'high'
  },
  {
    name: 'Lever',
    nodeTypes: ['n8n-nodes-base.lever', 'n8n-nodes-base.leverV2'],
    category: 'HR',
    description: 'Lever API for talent acquisition',
    authRequired: true,
    commonUseCases: ['Candidate tracking', 'Interview scheduling', 'Hiring pipeline'],
    setupComplexity: 'medium'
  },
  {
    name: 'Greenhouse',
    nodeTypes: ['n8n-nodes-base.greenhouse', 'n8n-nodes-base.greenhouseV2'],
    category: 'HR',
    description: 'Greenhouse API for recruiting software',
    authRequired: true,
    commonUseCases: ['Applicant tracking', 'Interview management', 'Hiring analytics'],
    setupComplexity: 'medium'
  },

  // Calendar & Scheduling
  {
    name: 'Google Calendar',
    nodeTypes: ['n8n-nodes-base.googleCalendar', 'n8n-nodes-base.googleCalendarV2'],
    category: 'Calendar',
    description: 'Google Calendar API for scheduling',
    authRequired: true,
    commonUseCases: ['Event management', 'Meeting scheduling', 'Calendar automation'],
    setupComplexity: 'medium'
  },
  {
    name: 'Calendly',
    nodeTypes: ['n8n-nodes-base.calendly', 'n8n-nodes-base.calendlyV2'],
    category: 'Calendar',
    description: 'Calendly API for appointment scheduling',
    authRequired: true,
    commonUseCases: ['Appointment booking', 'Meeting automation', 'Schedule management'],
    setupComplexity: 'low'
  },
  {
    name: 'Acuity Scheduling',
    nodeTypes: ['n8n-nodes-base.acuityScheduling', 'n8n-nodes-base.acuityV2'],
    category: 'Calendar',
    description: 'Acuity Scheduling API for appointment management',
    authRequired: true,
    commonUseCases: ['Client booking', 'Service scheduling', 'Payment integration'],
    setupComplexity: 'medium'
  },

  // Content Management & Publishing
  {
    name: 'WordPress',
    nodeTypes: ['n8n-nodes-base.wordpress', 'n8n-nodes-base.wordpressV2'],
    category: 'Content',
    description: 'WordPress API for content management',
    authRequired: true,
    commonUseCases: ['Post automation', 'Content publishing', 'Site management'],
    setupComplexity: 'medium'
  },
  {
    name: 'Ghost',
    nodeTypes: ['n8n-nodes-base.ghost', 'n8n-nodes-base.ghostV2'],
    category: 'Content',
    description: 'Ghost API for publishing platform',
    authRequired: true,
    commonUseCases: ['Blog automation', 'Content publishing', 'Newsletter integration'],
    setupComplexity: 'medium'
  },
  {
    name: 'Medium',
    nodeTypes: ['n8n-nodes-base.medium', 'n8n-nodes-base.mediumV2'],
    category: 'Content',
    description: 'Medium API for publishing articles',
    authRequired: true,
    commonUseCases: ['Article publishing', 'Content syndication', 'Cross-posting'],
    setupComplexity: 'medium'
  },
  {
    name: 'Contentful',
    nodeTypes: ['n8n-nodes-base.contentful', 'n8n-nodes-base.contentfulV2'],
    category: 'Content',
    description: 'Contentful API for headless CMS',
    authRequired: true,
    commonUseCases: ['Content management', 'API-first content', 'Multi-platform publishing'],
    setupComplexity: 'medium'
  },

  // Monitoring & Analytics
  {
    name: 'DataDog',
    nodeTypes: ['n8n-nodes-base.dataDog', 'n8n-nodes-base.dataDogV2'],
    category: 'Monitoring',
    description: 'DataDog API for monitoring and analytics',
    authRequired: true,
    commonUseCases: ['Application monitoring', 'Log management', 'Performance tracking'],
    setupComplexity: 'high'
  },
  {
    name: 'New Relic',
    nodeTypes: ['n8n-nodes-base.newRelic', 'n8n-nodes-base.newRelicV2'],
    category: 'Monitoring',
    description: 'New Relic API for application performance monitoring',
    authRequired: true,
    commonUseCases: ['Performance monitoring', 'Error tracking', 'Infrastructure monitoring'],
    setupComplexity: 'high'
  },
  {
    name: 'Sentry',
    nodeTypes: ['n8n-nodes-base.sentry', 'n8n-nodes-base.sentryV2'],
    category: 'Monitoring',
    description: 'Sentry API for error tracking and monitoring',
    authRequired: true,
    commonUseCases: ['Error monitoring', 'Performance tracking', 'Release monitoring'],
    setupComplexity: 'medium'
  },

  // Survey & Feedback
  {
    name: 'Typeform',
    nodeTypes: ['n8n-nodes-base.typeform', 'n8n-nodes-base.typeformV2'],
    category: 'Survey',
    description: 'Typeform API for forms and surveys',
    authRequired: true,
    commonUseCases: ['Form responses', 'Survey automation', 'Data collection'],
    setupComplexity: 'low'
  },
  {
    name: 'SurveyMonkey',
    nodeTypes: ['n8n-nodes-base.surveyMonkey', 'n8n-nodes-base.surveyMonkeyV2'],
    category: 'Survey',
    description: 'SurveyMonkey API for survey management',
    authRequired: true,
    commonUseCases: ['Survey creation', 'Response analysis', 'Market research'],
    setupComplexity: 'medium'
  },
  {
    name: 'Google Forms',
    nodeTypes: ['n8n-nodes-base.googleForms', 'n8n-nodes-base.googleFormsV2'],
    category: 'Survey',
    description: 'Google Forms API for form management',
    authRequired: true,
    commonUseCases: ['Form automation', 'Response processing', 'Data collection'],
    setupComplexity: 'medium'
  },

  // Time Tracking & Productivity
  {
    name: 'Toggl',
    nodeTypes: ['n8n-nodes-base.toggl', 'n8n-nodes-base.togglV2'],
    category: 'Time Tracking',
    description: 'Toggl API for time tracking',
    authRequired: true,
    commonUseCases: ['Time tracking', 'Project reporting', 'Team productivity'],
    setupComplexity: 'low'
  },
  {
    name: 'Harvest',
    nodeTypes: ['n8n-nodes-base.harvest', 'n8n-nodes-base.harvestV2'],
    category: 'Time Tracking',
    description: 'Harvest API for time tracking and invoicing',
    authRequired: true,
    commonUseCases: ['Time tracking', 'Project billing', 'Team management'],
    setupComplexity: 'medium'
  },
  {
    name: 'RescueTime',
    nodeTypes: ['n8n-nodes-base.rescueTime', 'n8n-nodes-base.rescueTimeV2'],
    category: 'Time Tracking',
    description: 'RescueTime API for productivity tracking',
    authRequired: true,
    commonUseCases: ['Productivity analysis', 'Time management', 'Activity tracking'],
    setupComplexity: 'medium'
  }
];

// Helper functions for service catalog
export function getServicesByCategory(category: string): ServiceDefinition[] {
  return servicesCatalog.filter(service => service.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(servicesCatalog.map(service => service.category));
  return Array.from(categories).sort();
}

export function getPopularServices(limit: number = 10): ServiceDefinition[] {
  // Return services sorted by setup complexity (lower complexity = more popular)
  return servicesCatalog
    .filter(service => service.setupComplexity === 'low')
    .slice(0, limit);
}

export function getServiceByName(name: string): ServiceDefinition | undefined {
  return servicesCatalog.find(service => service.name.toLowerCase() === name.toLowerCase());
}

export function searchServices(query: string): ServiceDefinition[] {
  const lowerQuery = query.toLowerCase();
  return servicesCatalog.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.commonUseCases.some(useCase => useCase.toLowerCase().includes(lowerQuery))
  );
}
