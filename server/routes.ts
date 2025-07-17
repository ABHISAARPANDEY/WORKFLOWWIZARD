import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateWorkflow, enhancePrompt, getExamplePrompts, getPopularNodeTypes } from "./services/workflowGenerator";
import { getServicesByCategory, getAllCategories, getPopularServices } from "./services/servicesCatalog";
import { generateWorkflowSchema, loginSchema, registerSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware for authentication
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      });
    } catch (error: any) {
      console.error("Register error:", error);
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: error.message || "Registration failed" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: error.message || "Login failed" });
      }
    }
  });

  // Generate workflow endpoint
  app.post("/api/workflows/generate", async (req, res) => {
    try {
      const validatedData = generateWorkflowSchema.parse(req.body);
      
      // Get user ID from token if present
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      let userId: number | undefined;

      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
          userId = decoded.userId;
        } catch (error) {
          // Continue without user ID if token is invalid
        }
      }

      const workflow = await generateWorkflow(validatedData, userId);
      res.json(workflow);
    } catch (error: any) {
      console.error("Generate workflow error:", error);
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: error.message || "Failed to generate workflow" });
      }
    }
  });

  // Enhance prompt endpoint
  app.post("/api/workflows/enhance-prompt", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ message: "Prompt is required" });
      }

      const enhancedPrompt = await enhancePrompt(prompt);
      res.json({ enhancedPrompt });
    } catch (error: any) {
      console.error("Enhance prompt error:", error);
      res.status(500).json({ message: error.message || "Failed to enhance prompt" });
    }
  });

  // Get user's workflows
  app.get("/api/workflows/my-workflows", authenticateToken, async (req: any, res) => {
    try {
      const workflows = await storage.getWorkflowsByUserId(req.userId);
      res.json(workflows);
    } catch (error: any) {
      console.error("Get workflows error:", error);
      res.status(500).json({ message: error.message || "Failed to get workflows" });
    }
  });

  // Get workflow by ID
  app.get("/api/workflows/:id", async (req, res) => {
    try {
      const workflow = await storage.getWorkflowById(parseInt(req.params.id));
      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }
      res.json(workflow);
    } catch (error: any) {
      console.error("Get workflow error:", error);
      res.status(500).json({ message: error.message || "Failed to get workflow" });
    }
  });

  // Get public workflows
  app.get("/api/workflows/public", async (req, res) => {
    try {
      const workflows = await storage.getAllPublicWorkflows();
      res.json(workflows);
    } catch (error: any) {
      console.error("Get public workflows error:", error);
      res.status(500).json({ message: error.message || "Failed to get public workflows" });
    }
  });

  // Get auth status endpoint
  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUserById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(500).json({ message: error.message || "Failed to get user" });
    }
  });

  // Get example prompts
  app.get("/api/examples", async (req, res) => {
    try {
      const examples = getExamplePrompts();
      res.json(examples);
    } catch (error: any) {
      console.error("Get examples error:", error);
      res.status(500).json({ message: error.message || "Failed to get examples" });
    }
  });

  // Get popular node types
  app.get("/api/node-types", async (req, res) => {
    try {
      const nodeTypes = getPopularNodeTypes();
      res.json(nodeTypes);
    } catch (error: any) {
      console.error("Get node types error:", error);
      res.status(500).json({ message: error.message || "Failed to get node types" });
    }
  });

  // Get services by category
  app.get("/api/services/categories", async (req, res) => {
    try {
      const categories = getAllCategories();
      res.json(categories);
    } catch (error: any) {
      console.error("Get categories error:", error);
      res.status(500).json({ message: error.message || "Failed to get categories" });
    }
  });

  // Get services by category
  app.get("/api/services/:category", async (req, res) => {
    try {
      const services = getServicesByCategory(req.params.category);
      res.json(services);
    } catch (error: any) {
      console.error("Get services error:", error);
      res.status(500).json({ message: error.message || "Failed to get services" });
    }
  });

  // Get popular services
  app.get("/api/services/popular", async (req, res) => {
    try {
      const services = getPopularServices();
      res.json(services);
    } catch (error: any) {
      console.error("Get popular services error:", error);
      res.status(500).json({ message: error.message || "Failed to get popular services" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
