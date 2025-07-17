import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayIcon, PauseIcon, RefreshCwIcon, ZapIcon, CheckCircleIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';
import type { WorkflowResponse } from '@shared/schema';

interface WorkflowAnimatorProps {
  workflow: WorkflowResponse;
  isVisible: boolean;
  onClose: () => void;
}

interface AnimationState {
  currentNodeIndex: number;
  isRunning: boolean;
  completedNodes: number[];
  currentStep: string;
  executionTime: number;
}

export function WorkflowAnimator({ workflow, isVisible, onClose }: WorkflowAnimatorProps) {
  const [animationState, setAnimationState] = useState<AnimationState>({
    currentNodeIndex: 0,
    isRunning: false,
    completedNodes: [],
    currentStep: '',
    executionTime: 0
  });

  const [speed, setSpeed] = useState(1000); // milliseconds per step

  useEffect(() => {
    if (!isVisible) {
      resetAnimation();
    }
  }, [isVisible]);

  const resetAnimation = () => {
    setAnimationState({
      currentNodeIndex: 0,
      isRunning: false,
      completedNodes: [],
      currentStep: '',
      executionTime: 0
    });
  };

  const startAnimation = () => {
    if (!workflow.nodes || workflow.nodes.length === 0) return;
    
    setAnimationState(prev => ({ ...prev, isRunning: true }));
    animateNextStep(0, [], 0);
  };

  const animateNextStep = (nodeIndex: number, completed: number[], time: number) => {
    if (nodeIndex >= workflow.nodes.length) {
      setAnimationState(prev => ({ 
        ...prev, 
        isRunning: false, 
        currentStep: 'Workflow completed successfully!',
        executionTime: time
      }));
      return;
    }

    const currentNode = workflow.nodes[nodeIndex];
    const stepName = getStepDescription(currentNode, nodeIndex);
    
    setAnimationState(prev => ({
      ...prev,
      currentNodeIndex: nodeIndex,
      currentStep: stepName,
      executionTime: time
    }));

    setTimeout(() => {
      const newCompleted = [...completed, nodeIndex];
      setAnimationState(prev => ({
        ...prev,
        completedNodes: newCompleted
      }));

      setTimeout(() => {
        animateNextStep(nodeIndex + 1, newCompleted, time + speed);
      }, speed / 2);
    }, speed);
  };

  const getStepDescription = (node: any, index: number): string => {
    const nodeType = node.type;
    const nodeName = node.name;
    
    if (nodeType.includes('webhook')) {
      return `Step ${index + 1}: Waiting for webhook trigger from external service`;
    } else if (nodeType.includes('schedule')) {
      return `Step ${index + 1}: Scheduled trigger activated`;
    } else if (nodeType.includes('manual')) {
      return `Step ${index + 1}: Manual trigger activated`;
    } else if (nodeType.includes('email')) {
      return `Step ${index + 1}: Sending email notification`;
    } else if (nodeType.includes('slack')) {
      return `Step ${index + 1}: Posting message to Slack channel`;
    } else if (nodeType.includes('http')) {
      return `Step ${index + 1}: Making HTTP request to external API`;
    } else if (nodeType.includes('if')) {
      return `Step ${index + 1}: Evaluating conditional logic`;
    } else if (nodeType.includes('set')) {
      return `Step ${index + 1}: Transforming and setting data`;
    } else if (nodeType.includes('stripe')) {
      return `Step ${index + 1}: Processing payment through Stripe`;
    } else if (nodeType.includes('shopify')) {
      return `Step ${index + 1}: Updating Shopify store data`;
    } else if (nodeType.includes('airtable')) {
      return `Step ${index + 1}: Creating/updating Airtable record`;
    } else if (nodeType.includes('sheets')) {
      return `Step ${index + 1}: Updating Google Sheets`;
    } else if (nodeType.includes('github')) {
      return `Step ${index + 1}: Performing GitHub operation`;
    } else if (nodeType.includes('facebook')) {
      return `Step ${index + 1}: Posting to Facebook`;
    } else if (nodeType.includes('instagram')) {
      return `Step ${index + 1}: Publishing to Instagram`;
    } else if (nodeType.includes('twitter')) {
      return `Step ${index + 1}: Posting to Twitter`;
    } else {
      return `Step ${index + 1}: Executing ${nodeName}`;
    }
  };

  const pauseAnimation = () => {
    setAnimationState(prev => ({ ...prev, isRunning: false }));
  };

  const getNodeStatus = (nodeIndex: number) => {
    if (animationState.completedNodes.includes(nodeIndex)) {
      return 'completed';
    } else if (animationState.currentNodeIndex === nodeIndex && animationState.isRunning) {
      return 'running';
    } else {
      return 'pending';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <ZapIcon className="w-6 h-6 mr-2 text-primary" />
              Workflow Animation: {workflow.name}
            </CardTitle>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animation Controls */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <Button
                onClick={startAnimation}
                disabled={animationState.isRunning}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Start Animation
              </Button>
              <Button
                onClick={pauseAnimation}
                disabled={!animationState.isRunning}
                variant="outline"
              >
                <PauseIcon className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button
                onClick={resetAnimation}
                variant="outline"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Speed:</span>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={2000}>Slow</option>
                  <option value={1000}>Normal</option>
                  <option value={500}>Fast</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm">{(animationState.executionTime / 1000).toFixed(1)}s</span>
              </div>
            </div>
          </div>

          {/* Current Step Display */}
          {animationState.currentStep && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-blue-900">{animationState.currentStep}</span>
              </div>
            </div>
          )}

          {/* Workflow Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Workflow Execution Flow</h3>
            <div className="grid gap-4">
              {workflow.nodes.map((node, index) => {
                const status = getNodeStatus(index);
                return (
                  <div
                    key={node.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      status === 'completed'
                        ? 'bg-green-50 border-green-300'
                        : status === 'running'
                        ? 'bg-blue-50 border-blue-300 animate-pulse'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {status === 'completed' && (
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          )}
                          {status === 'running' && (
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          )}
                          {status === 'pending' && (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <span className="font-medium">{node.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {node.type.split('.').pop()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Step {index + 1} of {workflow.nodes.length}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {getStepDescription(node, index)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Workflow Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Nodes:</span>
                <div>{workflow.nodes.length}</div>
              </div>
              <div>
                <span className="font-medium">Trigger Type:</span>
                <div>{workflow.triggerType}</div>
              </div>
              <div>
                <span className="font-medium">Setup Time:</span>
                <div>{workflow.estimatedSetupTime}</div>
              </div>
              <div>
                <span className="font-medium">Completed:</span>
                <div>{animationState.completedNodes.length}/{workflow.nodes.length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}