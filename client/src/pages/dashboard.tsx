import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WorkflowVisualizer } from '@/components/workflow-visualizer';
import { 
  Calendar, 
  Download, 
  Eye, 
  Plus, 
  Workflow as WorkflowIcon,
  Clock,
  Activity,
  TrendingUp,
  Settings,
  Share2,
  Copy,
  Trash2
} from 'lucide-react';
import { useLocation } from 'wouter';
import { format } from 'date-fns';
import type { Workflow } from '@shared/schema';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Get user's workflows
  const { data: workflows = [], isLoading } = useQuery({
    queryKey: ['/api/workflows/my-workflows'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/workflows/my-workflows', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch workflows');
      return response.json();
    },
  });

  if (!isAuthenticated) {
    setLocation('/auth');
    return null;
  }

  const handleDownloadWorkflow = (workflow: Workflow) => {
    const blob = new Blob([JSON.stringify(workflow.workflowJson, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyWorkflow = (workflow: Workflow) => {
    navigator.clipboard.writeText(JSON.stringify(workflow.workflowJson, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <WorkflowIcon className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setLocation('/')}>
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Workflows</p>
                  <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
                </div>
                <WorkflowIcon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Workflows</p>
                  <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => w.workflowJson.active).length}</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Nodes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workflows.length > 0 ? Math.round(workflows.reduce((acc, w) => acc + w.nodeCount, 0) / workflows.length) : 0}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workflows.filter(w => {
                      const created = new Date(w.createdAt!);
                      const now = new Date();
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflows List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Workflows</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : workflows.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <WorkflowIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No workflows yet</h3>
                <p className="text-gray-600 mb-6">Create your first workflow to get started with automation.</p>
                <Button onClick={() => setLocation('/')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow: Workflow) => (
                <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{workflow.name}</CardTitle>
                        <p className="text-sm text-gray-600 line-clamp-2">{workflow.description}</p>
                      </div>
                      <Badge variant={workflow.workflowJson.active ? 'default' : 'secondary'}>
                        {workflow.workflowJson.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Workflow Preview */}
                    <div className="mb-4">
                      <WorkflowVisualizer 
                        nodes={workflow.workflowJson.nodes.slice(0, 3)} 
                        className="scale-75 origin-left"
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-gray-900">{workflow.nodeCount}</div>
                        <div className="text-xs text-gray-500">Nodes</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-gray-900">{workflow.triggerType}</div>
                        <div className="text-xs text-gray-500">Trigger</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-gray-900">{workflow.estimatedSetupTime}</div>
                        <div className="text-xs text-gray-500">Setup</div>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadWorkflow(workflow)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyWorkflow(workflow)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="flex items-center text-xs text-gray-500 mt-3">
                      <Clock className="w-3 h-3 mr-1" />
                      Created {workflow.createdAt ? format(new Date(workflow.createdAt), 'MMM d, yyyy') : 'Unknown'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
