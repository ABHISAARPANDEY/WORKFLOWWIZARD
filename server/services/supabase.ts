import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, workflows } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "https://vjjmukgeixvatrprxosi.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqam11a2dlaXh2YXRycHJ4b3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Nzk4NjMsImV4cCI6MjA2ODI1NTg2M30.oSnwlz38D17zBr2RZUkHbThIsZjRtQanBSpEnlTBvJM";

// Construct DATABASE_URL if not provided
const DATABASE_URL = process.env.DATABASE_URL || `postgresql://postgres:${SUPABASE_ANON_KEY}@db.vjjmukgeixvatrprxosi.supabase.co:5432/postgres`;

if (!DATABASE_URL) {
  console.warn("DATABASE_URL not found. Using in-memory storage instead of Supabase.");
}

const client = DATABASE_URL ? postgres(DATABASE_URL) : null;
export const db = client ? drizzle(client) : null;

export class SupabaseStorage {
  async createUser(userData: { email: string; password: string; name?: string }) {
    if (!db) throw new Error("Database not connected");
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUserByEmail(email: string) {
    if (!db) throw new Error("Database not connected");
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }

  async getUserById(id: number) {
    if (!db) throw new Error("Database not connected");
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async createWorkflow(workflowData: any) {
    if (!db) throw new Error("Database not connected");
    const [workflow] = await db.insert(workflows).values(workflowData).returning();
    return workflow;
  }

  async getWorkflowsByUserId(userId: number) {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(workflows)
      .where(eq(workflows.userId, userId))
      .orderBy(desc(workflows.createdAt));
  }

  async getWorkflowById(id: number) {
    if (!db) throw new Error("Database not connected");
    const [workflow] = await db.select().from(workflows).where(eq(workflows.id, id)).limit(1);
    return workflow;
  }

  async getAllPublicWorkflows() {
    if (!db) throw new Error("Database not connected");
    return await db.select().from(workflows)
      .where(eq(workflows.isPublic, true))
      .orderBy(desc(workflows.createdAt));
  }

  async updateWorkflow(id: number, updates: any) {
    if (!db) throw new Error("Database not connected");
    const [workflow] = await db.update(workflows)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(workflows.id, id))
      .returning();
    return workflow;
  }

  async deleteWorkflow(id: number) {
    if (!db) throw new Error("Database not connected");
    await db.delete(workflows).where(eq(workflows.id, id));
  }
}

export const supabaseStorage = DATABASE_URL ? new SupabaseStorage() : null;
