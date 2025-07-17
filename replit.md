# N8N Workflow Generator

## Overview

This is a full-stack web application that generates N8N workflow configurations from natural language prompts. The application allows users to describe their automation needs in plain English and receive complete, production-ready N8N workflow JSON files with setup instructions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **AI Integration**: OpenAI API for workflow generation with OpenRouter fallback

### Key Components

#### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definitions in TypeScript
- **Tables**: Users and workflows with proper relationships
- **Migrations**: Automated database migrations through Drizzle Kit

#### Authentication System
- **JWT Tokens**: Stateless authentication with configurable secret
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Token-based sessions stored in localStorage
- **Protected Routes**: Middleware-based route protection

#### AI Workflow Generation
- **Primary AI**: OpenAI GPT-4o for intelligent workflow generation
- **Fallback System**: Local template-based generation when AI is unavailable
- **Prompt Enhancement**: AI-powered prompt improvement for better results
- **Service Catalog**: Comprehensive database of N8N node types and services

#### Storage Strategy
- **Primary**: Supabase/PostgreSQL for production
- **Development**: In-memory storage for development and testing
- **Abstraction**: Interface-based storage layer for easy switching

## Data Flow

1. **User Input**: User enters natural language description of desired automation
2. **Authentication**: JWT token validation for authenticated users
3. **AI Processing**: OpenAI API processes prompt and generates workflow JSON
4. **Fallback Handling**: Local template system activates if AI fails
5. **Database Storage**: Generated workflows stored with user association
6. **Frontend Display**: Workflow visualized with setup instructions
7. **Export Options**: JSON download and copy functionality

## External Dependencies

### Required APIs
- **OpenAI API**: For intelligent workflow generation (optional)
- **OpenRouter API**: Alternative AI provider (optional)
- **DATABASE_URL**: PostgreSQL connection string (required)

### Development Tools
- **Replit Integration**: Runtime error overlay and cartographer for development
- **Monaco Editor**: Code editor component for JSON viewing
- **Neon Database**: Serverless PostgreSQL provider

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **date-fns**: Date manipulation utilities

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle pushes schema changes to PostgreSQL
4. **Asset Optimization**: Vite optimizes static assets and code splitting

### Environment Configuration
- **Development**: Local development with hot reload and debugging
- **Production**: Optimized builds with environment variable configuration
- **Database**: PostgreSQL with connection pooling and SSL support

### Scalability Considerations
- **Stateless Design**: JWT-based authentication for horizontal scaling
- **Database Indexing**: Proper indexing on user and workflow queries
- **Caching Strategy**: TanStack Query handles client-side caching
- **Error Handling**: Comprehensive error boundaries and API error handling

The application is designed to be easily deployable on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL database support.