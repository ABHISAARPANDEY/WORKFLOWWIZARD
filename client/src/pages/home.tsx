import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MonacoEditor } from '@/components/ui/monaco-editor';
import { WorkflowVisualizer } from '@/components/workflow-visualizer';
import { WorkflowAnimator } from '@/components/workflow-animator';
import { ServiceIconWithColor } from '@/components/service-icons';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import {
  PlayIcon,
  Lightbulb,
  PuzzleIcon,
  WandSparkles,
  CodeIcon,
  WrenchIcon,
  DownloadIcon,
  CopyIcon,
  InfoIcon,
  NetworkIcon,
  CheckCircleIcon,
  Loader2Icon,
  Sparkles,
  User,
  LogOut,
  Settings,
  History,
  Star,
  Zap
} from 'lucide-react';
import type { WorkflowResponse, ServiceInfo } from '@shared/schema';

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [prompt, setPrompt] = useState('');
  const [includeAuth, setIncludeAuth] = useState(false);
  const [includeErrorHandling, setIncludeErrorHandling] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<WorkflowResponse | null>(null);
  const [showAnimator, setShowAnimator] = useState(false);

  // Get example prompts
  const { data: examples = [] } = useQuery({
    queryKey: ['/api/examples'],
  });

  // Get popular node types
  const { data: nodeTypes = [] } = useQuery({
    queryKey: ['/api/node-types'],
  });

  // Get popular services
  const { data: popularServices = [] } = useQuery<ServiceInfo[]>({
    queryKey: ['/api/services/popular'],
  });

  // Generate workflow mutation
  const generateMutation = useMutation({
    mutationFn: async (data: { prompt: string; includeAuth: boolean; includeErrorHandling: boolean }) => {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/workflows/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate workflow');
      }

      return response.json();
    },
    onSuccess: (data: WorkflowResponse) => {
      setGeneratedWorkflow(data);
      toast({
        title: "Workflow Generated Successfully",
        description: `Generated "${data.name}" with ${data.nodeCount} nodes`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate workflow",
        variant: "destructive",
      });
    },
  });

  // Enhance prompt mutation
  const enhanceMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest('POST', '/api/workflows/enhance-prompt', { prompt });
      return response.json();
    },
    onSuccess: (data: { enhancedPrompt: string }) => {
      setPrompt(data.enhancedPrompt);
      toast({
        title: "Prompt Enhanced",
        description: "Your prompt has been enhanced with AI suggestions",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Enhancement Failed",
        description: error.message || "Failed to enhance prompt",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Describe what you want your workflow to do",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      prompt: prompt.trim(),
      includeAuth,
      includeErrorHandling,
    });
  };

  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt first",
        description: "Enter a basic description to enhance",
        variant: "destructive",
      });
      return;
    }

    enhanceMutation.mutate(prompt.trim());
  };

  const handleCopyJson = () => {
    if (generatedWorkflow) {
      navigator.clipboard.writeText(JSON.stringify(generatedWorkflow.workflowJson, null, 2));
      toast({
        title: "JSON Copied",
        description: "Workflow JSON has been copied to clipboard",
      });
    }
  };

  const handleDownload = () => {
    if (generatedWorkflow) {
      const blob = new Blob([JSON.stringify(generatedWorkflow.workflowJson, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedWorkflow.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <NetworkIcon className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">N8N Workflow Generator</h1>
                <p className="text-xs text-gray-500">AI-Powered Automation</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Templates</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Documentation</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setLocation('/dashboard')}
                  >
                    <History className="w-4 h-4 mr-1" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setLocation('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-orange-600 text-white"
                    onClick={() => setLocation('/auth')}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Generate N8N Workflows with
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}AI Magic
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your automation ideas into complete N8N workflows using natural language. 
              No coding required - just describe what you want to automate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-primary hover:bg-orange-600 text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Generating
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-gray-300 hover:border-primary px-8 py-4 text-lg"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Supported Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-600">Workflows Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2min</div>
                <div className="text-sm text-gray-600">Avg Generation Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator Interface */}
      <section id="generator" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Popular Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Popular Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {popularServices.slice(0, 9).map((service) => (
                      <div 
                        key={service.name}
                        className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        title={service.name}
                      >
                        <ServiceIconWithColor
                          serviceName={service.name}
                          nodeType={service.nodeTypes[0]}
                          color={service.color}
                          className="w-8 h-8"
                        />
                        <span className="text-xs text-gray-600 text-center">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                    Quick Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {examples.slice(0, 4).map((example: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors group"
                      >
                        <div className="text-sm font-medium text-gray-900 group-hover:text-primary">
                          {example.split(' ').slice(0, 4).join(' ')}...
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {example.includes('email') && 'Email notifications'}
                          {example.includes('Slack') && 'Slack integration'}
                          {example.includes('Airtable') && 'Data synchronization'}
                          {example.includes('GitHub') && 'Development workflow'}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Node Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PuzzleIcon className="w-5 h-5 text-secondary mr-2" />
                    Node Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {nodeTypes.slice(0, 6).map((nodeType: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{nodeType.name}</span>
                        <Badge variant={nodeType.category === 'Trigger' ? 'default' : nodeType.category === 'Action' ? 'secondary' : 'outline'}>
                          {nodeType.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Workflow Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <WandSparkles className="w-6 h-6 text-primary mr-3" />
                    Describe Your Automation
                  </CardTitle>
                  <p className="text-gray-600 mt-2">Tell us what you want to automate in plain English</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What do you want to automate?
                      </label>
                      <Textarea
                        placeholder="Example: Send me an email whenever someone fills out my contact form on my website, and also create a new record in my Airtable database with their information..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeAuth"
                          checked={includeAuth}
                          onCheckedChange={setIncludeAuth}
                        />
                        <label htmlFor="includeAuth" className="text-sm text-gray-700">
                          Include authentication setup
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeErrorHandling"
                          checked={includeErrorHandling}
                          onCheckedChange={setIncludeErrorHandling}
                        />
                        <label htmlFor="includeErrorHandling" className="text-sm text-gray-700">
                          Add error handling
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="outline"
                        onClick={handleEnhancePrompt}
                        disabled={enhanceMutation.isPending}
                        className="border-secondary text-secondary hover:bg-secondary/10"
                      >
                        {enhanceMutation.isPending ? (
                          <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        Enhance Prompt
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        disabled={generateMutation.isPending}
                        className="bg-primary hover:bg-orange-600 text-white"
                      >
                        {generateMutation.isPending ? (
                          <>
                            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <PlayIcon className="w-4 h-4 mr-2" />
                            Generate Workflow
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Workflow Results */}
              {generatedWorkflow && (
                <div className="space-y-6">
                  {/* Workflow Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-accent mr-2" />
                        Generated Workflow
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">{generatedWorkflow.name}</h4>
                        <p className="text-gray-700 text-sm">{generatedWorkflow.description}</p>
                      </div>

                      {/* Workflow Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{generatedWorkflow.nodeCount}</div>
                          <div className="text-sm text-gray-600">Nodes</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{generatedWorkflow.triggerType}</div>
                          <div className="text-sm text-gray-600">Trigger</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{generatedWorkflow.nodes.length - 1}</div>
                          <div className="text-sm text-gray-600">Actions</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{generatedWorkflow.estimatedSetupTime}</div>
                          <div className="text-sm text-gray-600">Setup Time</div>
                        </div>
                      </div>

                      {/* Workflow Visualization */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                          <NetworkIcon className="w-4 h-4 mr-2" />
                          Workflow Flow
                        </h4>
                        <WorkflowVisualizer nodes={generatedWorkflow.nodes} />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-4 mb-6">
                        <Button
                          onClick={handleDownload}
                          className="bg-accent hover:bg-green-600 text-white"
                        >
                          <DownloadIcon className="w-4 h-4 mr-2" />
                          Download JSON
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCopyJson}
                        >
                          <CopyIcon className="w-4 h-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                        <Button
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-secondary/10"
                          onClick={() => setShowAnimator(true)}
                        >
                          <PlayIcon className="w-4 h-4 mr-2" />
                          Simulate Workflow
                        </Button>
                      </div>

                      {/* JSON Preview */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 flex items-center">
                            <CodeIcon className="w-4 h-4 mr-2" />
                            Generated Workflow JSON
                          </h4>
                        </div>
                        <MonacoEditor
                          value={JSON.stringify(generatedWorkflow.workflowJson, null, 2)}
                          readOnly
                          height="400px"
                        />
                      </div>

                      {/* Setup Instructions */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                          <WrenchIcon className="w-4 h-4 mr-2" />
                          Setup Instructions
                        </h4>
                        <div className="space-y-4">
                          {generatedWorkflow.setupInstructions.map((instruction: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{instruction}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our N8N Generator?</h2>
            <p className="text-xl text-gray-300">Built for developers, designed for everyone</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Generate complete workflows in under 30 seconds with our AI-powered engine.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Production Ready</h3>
              <p className="text-gray-300">All generated workflows include error handling, authentication, and best practices.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Friendly</h3>
              <p className="text-gray-300">Share workflows, collaborate with team members, and maintain version control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <NetworkIcon className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-gray-900">N8N Generator</span>
              </div>
              <p className="text-gray-600 text-sm">
                Create powerful automation workflows using simple English descriptions. No technical knowledge required.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Product</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Resources</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 N8N Workflow Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Workflow Animator Modal */}
      {generatedWorkflow && (
        <WorkflowAnimator
          workflow={generatedWorkflow}
          isVisible={showAnimator}
          onClose={() => setShowAnimator(false)}
        />
      )}
    </div>
  );
}
