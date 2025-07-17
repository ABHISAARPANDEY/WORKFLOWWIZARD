import { createClient } from "@supabase/supabase-js";
import { users, workflows } from "@shared/schema"; // Optional: for type reference

// Supabase configuration
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://vjjmukgeixvatrprxosi.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqam11a2dlaXh2YXRycHJ4b3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Nzk4NjMsImV4cCI6MjA2ODI1NTg2M30.oSnwlz38D17zBr2RZUkHbThIsZjRtQanBSpEnlTBvJM";

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export class SupabaseStorage {
  // Register user – creates Auth user and adds to users table if name is present
  async createUser(userData: { email: string; password: string; name?: string }) {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (authError) throw new Error(authError.message);

    // 2. Add extra user data (profile) if provided
    if (userData.name && authData.user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
          },
        ])
        .select()
        .maybeSingle();
      if (profileError) throw new Error(profileError.message);
      return profile;
    } else {
      // If no additional info, just return the auth user object
      return authData.user;
    }
  }

  // Lookup user by email: returns user row or null if not found
  async getUserByEmail(email: string) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return user;
  }

  // Lookup user by id: returns user row or null if not found
  async getUserById(id: string) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return user;
  }

  // Insert a new workflow record
  async createWorkflow(workflowData: any) {
    const { data, error } = await supabase
      .from("workflows")
      .insert([{ ...workflowData }])
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  }

  // List all workflows for a user by userId
  async getWorkflowsByUserId(userId: string) {
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .eq("userId", userId)
      .order("createdAt", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  // Get a workflow by id: returns workflow row or null if not found
  async getWorkflowById(id: string) {
    const { data: workflow, error } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return workflow;
  }

  // List all public workflows
  async getAllPublicWorkflows() {
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .eq("isPublic", true)
      .order("createdAt", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  // Update a workflow record by id
  async updateWorkflow(id: string, updates: any) {
    const { data, error } = await supabase
      .from("workflows")
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a workflow by id
  async deleteWorkflow(id: string) {
    const { error } = await supabase
      .from("workflows")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
  }
}

// Export the singleton as before
export const supabaseStorage = new SupabaseStorage();
