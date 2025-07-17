import { supabaseStorage } from './services/supabase';
import type { User, InsertUser, Workflow, InsertWorkflow } from '@shared/schema';

export interface IStorage {
  // User management
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  
  // Workflow management
  createWorkflow(workflow: InsertWorkflow & { userId: number }): Promise<Workflow>;
  getWorkflowsByUserId(userId: number): Promise<Workflow[]>;
  getWorkflowById(id: number): Promise<Workflow | undefined>;
  getAllPublicWorkflows(): Promise<Workflow[]>;
  updateWorkflow(id: number, updates: Partial<InsertWorkflow>): Promise<Workflow>;
  deleteWorkflow(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private workflows: Map<number, Workflow> = new Map();
  private currentUserId: number = 1;
  private currentWorkflowId: number = 1;

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createWorkflow(workflowData: InsertWorkflow & { userId: number }): Promise<Workflow> {
    const id = this.currentWorkflowId++;
    const workflow: Workflow = {
      ...workflowData,
      id,
      description: workflowData.description || null,
      triggerType: workflowData.triggerType || null,
      estimatedSetupTime: workflowData.estimatedSetupTime || null,
      setupInstructions: workflowData.setupInstructions || null,
      isPublic: workflowData.isPublic || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workflows.set(id, workflow);
    return workflow;
  }

  async getWorkflowsByUserId(userId: number): Promise<Workflow[]> {
    return Array.from(this.workflows.values())
      .filter(workflow => workflow.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getWorkflowById(id: number): Promise<Workflow | undefined> {
    return this.workflows.get(id);
  }

  async getAllPublicWorkflows(): Promise<Workflow[]> {
    return Array.from(this.workflows.values())
      .filter(workflow => workflow.isPublic)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateWorkflow(id: number, updates: Partial<InsertWorkflow>): Promise<Workflow> {
    const workflow = this.workflows.get(id);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    
    const updatedWorkflow: Workflow = {
      ...workflow,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.workflows.set(id, updatedWorkflow);
    return updatedWorkflow;
  }

  async deleteWorkflow(id: number): Promise<void> {
    this.workflows.delete(id);
  }
}

// Use Supabase storage if DATABASE_URL is available, otherwise use memory storage
export const storage: IStorage = (process.env.DATABASE_URL && supabaseStorage) ? supabaseStorage : new MemStorage();
