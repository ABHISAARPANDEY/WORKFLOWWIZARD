# N8N Workflow Generator - Local Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** (latest version)
- **PostgreSQL** (v12 or higher) OR **Supabase account**

## Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd n8n-workflow-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration (Choose ONE option)

# Option 1: Use your existing Supabase project
SUPABASE_URL=https://vjjmukgeixvatrprxosi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqam11a2dlaXh2YXRycHJ4b3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Nzk4NjMsImV4cCI6MjA2ODI1NTg2M30.oSnwlz38D17zBr2RZUkHbThIsZjRtQanBSpEnlTBvJM
DATABASE_URL=postgresql://postgres:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqam11a2dlaXh2YXRycHJ4b3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Nzk4NjMsImV4cCI6MjA2ODI1NTg2M30.oSnwlz38D17zBr2RZUkHbThIsZjRtQanBSpEnlTBvJM@db.vjjmukgeixvatrprxosi.supabase.co:5432/postgres

# Option 2: Use local PostgreSQL
# DATABASE_URL=postgresql://username:password@localhost:5432/n8n_workflows

# Option 3: Use in-memory storage (for testing only)
# Leave DATABASE_URL empty to use in-memory storage

# AI Configuration (Choose ONE option)

# Option 1: OpenRouter API (Recommended - Cost effective)
OPENROUTER_API_KEY=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

# Option 2: OpenAI API (Alternative)
# OPENAI_API_KEY=your-openai-api-key-here

# Authentication (Optional - generates random if not set)
JWT_SECRET=your-super-secret-jwt-key-here
```

### 4. Database Setup

#### Option A: Using Supabase (Recommended)
1. The database URL is already configured above
2. Tables will be created automatically on first run

#### Option B: Using Local PostgreSQL
1. Create a new database:
   ```sql
   CREATE DATABASE n8n_workflows;
   ```
2. Update the `DATABASE_URL` in your `.env` file
3. Tables will be created automatically on first run

#### Option C: In-Memory Storage (Testing Only)
1. Leave `DATABASE_URL` empty in your `.env` file
2. Data will be lost when the server restarts

### 5. Start the Application
```bash
npm run dev
```

The application will be available at: `http://localhost:5000`

## API Keys Setup

### OpenRouter API Key (Recommended)
1. Go to [OpenRouter](https://openrouter.ai)
2. Create an account and get your API key
3. Add it to your `.env` file as `OPENROUTER_API_KEY`

### OpenAI API Key (Alternative)
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account and get your API key
3. Add it to your `.env` file as `OPENAI_API_KEY`

## Features Available

### ✅ Core Features
- **50+ Service Support**: Facebook, Instagram, Twitter, LinkedIn, Slack, Gmail, Stripe, Shopify, Airtable, and more
- **AI Workflow Generation**: Powered by OpenRouter (Claude 3.5 Sonnet) or OpenAI (GPT-4o)
- **Enhanced Prompt System**: Transforms simple requests into production-ready specifications
- **Animated Workflow Visualization**: See how your workflows will execute step by step
- **User Authentication**: JWT-based authentication with secure password hashing
- **Workflow Management**: Save, retrieve, and manage your generated workflows
- **Production-Ready Output**: Complete N8N workflow JSON with setup instructions

### ✅ Advanced Features
- **Multi-Service Integration**: Handle complex workflows with multiple platforms
- **Error Handling**: Comprehensive error handling and fallback mechanisms
- **Security**: Authentication, authorization, and data encryption
- **Performance**: Rate limiting, caching, and optimization
- **Monitoring**: Logging, metrics, and alerting capabilities

## Testing the Application

### 1. Basic Test (Easy)
```
Prompt: "Send email when form submitted"
Expected: Basic webhook → email workflow with 2-3 nodes
```

### 2. Medium Test
```
Prompt: "Create a social media posting automation that posts to Facebook, Twitter, and Instagram simultaneously when I publish a new blog post"
Expected: Multi-platform social media workflow with 4-5 nodes
```

### 3. Complex Test
```
Prompt: "Build a comprehensive customer support workflow that monitors multiple channels, categorizes tickets by priority using AI sentiment analysis, routes urgent issues to on-call staff via SMS, creates tickets in Jira, and generates daily reports"
Expected: Complex workflow with 8-10 nodes including conditional logic and integrations
```

### 4. Advanced Test
```
Prompt: "Create an advanced e-commerce automation system that monitors Shopify inventory levels, automatically reorders stock from suppliers when below threshold, processes returns through multiple channels"
Expected: Complex e-commerce workflow with 10+ nodes and advanced logic
```

### 5. Enterprise Test
```
Prompt: "Design a complex enterprise-grade workflow orchestration system that handles multi-tenant SaaS operations including automated customer onboarding with document verification, compliance monitoring across different regulatory frameworks"
Expected: Enterprise-level workflow with 15+ nodes and sophisticated integrations
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```
Error: getaddrinfo ENOTFOUND db.vjjmukgeixvatrprxosi.supabase.co
```
**Solution**: Check your database URL and ensure Supabase project is accessible

#### 2. API Key Issues
```
Error: OpenAI/OpenRouter API key not configured
```
**Solution**: Verify your API key is correctly set in the `.env` file

#### 3. Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Either stop the process using port 5000 or change the port in the code

#### 4. Missing Dependencies
```
Error: Cannot find module 'some-package'
```
**Solution**: Run `npm install` to install all dependencies

### Database Issues

#### Reset Database Tables
If you need to reset the database:
```bash
# For PostgreSQL
psql -d n8n_workflows -c "DROP TABLE IF EXISTS workflows, users CASCADE;"

# For Supabase
# Go to your Supabase dashboard → SQL Editor → Run:
# DROP TABLE IF EXISTS workflows, users CASCADE;
```

#### Verify Database Connection
```bash
# Test database connection
npm run dev
# Look for "Database connected" or "Using in-memory storage" in the logs
```

## Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── services/          # Business logic
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Database layer
├── shared/                # Shared types and schemas
└── package.json           # Dependencies and scripts
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

### Adding New Services
To add support for a new service:
1. Edit `server/services/servicesCatalog.ts`
2. Add the service configuration with node types and use cases
3. Update the local workflow generator templates if needed

## Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
OPENROUTER_API_KEY=your-production-api-key
JWT_SECRET=your-production-jwt-secret
```

### Build for Production
```bash
npm run build
npm run start
```

## Support

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure your database is accessible and properly configured
4. Test API keys independently to verify they work
5. Check the troubleshooting section above

## License
This project is licensed under the MIT License.