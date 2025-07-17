import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, workflows } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not found. Using in-memory storage instead of Supabase.");
}

const client = process.env.DATABASE_URL ? postgres(process.env.DATABASE_URL) : null;
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

export const supabaseStorage = process.env.DATABASE_URL ? new SupabaseStorage() : null;
