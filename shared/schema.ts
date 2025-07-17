import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workflows = pgTable("workflows", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  prompt: text("prompt").notNull(),
  workflowJson: jsonb("workflow_json").notNull(),
  nodeCount: integer("node_count").notNull(),
  triggerType: text("trigger_type"),
  estimatedSetupTime: text("estimated_setup_time"),
  setupInstructions: jsonb("setup_instructions"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
});

export const insertWorkflowSchema = createInsertSchema(workflows).pick({
  name: true,
  description: true,
  prompt: true,
  workflowJson: true,
  nodeCount: true,
  triggerType: true,
  estimatedSetupTime: true,
  setupInstructions: true,
  isPublic: true,
});

export const generateWorkflowSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  includeAuth: z.boolean().default(false),
  includeErrorHandling: z.boolean().default(false),
  enhancePrompt: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;
export type Workflow = typeof workflows.$inferSelect;
export type GenerateWorkflowRequest = z.infer<typeof generateWorkflowSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  position: [number, number];
  parameters: Record<string, any>;
}

export interface WorkflowResponse {
  id?: number;
  name: string;
  description: string;
  nodeCount: number;
  estimatedSetupTime: string;
  triggerType: string;
  nodes: WorkflowNode[];
  connections: Record<string, any>;
  setupInstructions: string[];
  workflowJson: {
    name: string;
    active: boolean;
    nodes: WorkflowNode[];
    connections: Record<string, any>;
  };
}

export interface ServiceInfo {
  name: string;
  icon: string;
  color: string;
  category: string;
  nodeTypes: string[];
  authRequired: boolean;
  popular: boolean;
}
