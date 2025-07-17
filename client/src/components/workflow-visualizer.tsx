import { ArrowRight, Workflow } from 'lucide-react';
import { ServiceIcon } from './service-icons';
import type { WorkflowNode } from '@shared/schema';

interface WorkflowVisualizerProps {
  nodes: WorkflowNode[];
  connections?: Record<string, any>;
  className?: string;
}

export function WorkflowVisualizer({ nodes, connections, className }: WorkflowVisualizerProps) {
  const getNodeCategory = (nodeType: string) => {
    if (nodeType.includes('webhook') || nodeType.includes('schedule')) return 'Trigger';
    if (nodeType.includes('set') || nodeType.includes('if') || nodeType.includes('code')) return 'Utility';
    return 'Action';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Trigger': return 'bg-green-100 border-green-200';
      case 'Action': return 'bg-blue-100 border-blue-200';
      case 'Utility': return 'bg-purple-100 border-purple-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className={`flex items-center justify-center space-x-6 overflow-x-auto pb-4 ${className}`}>
      {nodes.map((node, index) => {
        const category = getNodeCategory(node.type);
        const colorClass = getCategoryColor(category);
        
        return (
          <div key={node.id} className="flex items-center space-x-4 min-w-max">
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 transition-all hover:scale-105 ${colorClass}`}>
                <ServiceIcon nodeType={node.type} className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center max-w-20">
                {node.name}
              </span>
              <span className="text-xs text-gray-500 text-center">
                {category}
              </span>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
}
