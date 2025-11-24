import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ExecutionControls from './components/ExecutionControls';
import ExecutionTimeline from './components/ExecutionTimeline';
import ExecutionMetadata from './components/ExecutionMetadata';
import LogViewer from './components/LogViewer';

const ExecutionMonitor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const executionId = searchParams?.get('id') || 'exec-2025-001';
  
  const [expandedStepId, setExpandedStepId] = useState(null);
  const [execution, setExecution] = useState({
    id: executionId,
    workflowName: 'E-commerce Price Monitor',
    status: 'running',
    startTime: new Date(Date.now() - 180000)?.toISOString(),
    duration: '3m 15s',
    triggerType: 'Manual',
    triggeredBy: 'Sarah Johnson'
  });

  const [steps, setSteps] = useState([
    {
      id: 'step-1',
      name: 'Fetch Product Data',
      type: 'HTTP Request',
      status: 'completed',
      startTime: new Date(Date.now() - 180000)?.toISOString(),
      duration: 2500,
      progress: 100,
      input: {
        url: 'https://api.example.com/products',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ***' }
      },
      output: {
        products: 150,
        categories: 12,
        timestamp: new Date()?.toISOString()
      }
    },
    {
      id: 'step-2',
      name: 'Parse HTML Content',
      type: 'Web Scraping',
      status: 'completed',
      startTime: new Date(Date.now() - 165000)?.toISOString(),
      duration: 8200,
      progress: 100,
      input: {
        selector: '.product-price',
        extractFields: ['price', 'currency', 'availability']
      },
      output: {
        extractedItems: 150,
        successRate: '98.7%'
      }
    },
    {
      id: 'step-3',
      name: 'Process with LLM',
      type: 'LLM Analysis',
      status: 'running',
      startTime: new Date(Date.now() - 120000)?.toISOString(),
      duration: 45000,
      progress: 67,
      input: {
        model: 'gpt-4',
        prompt: 'Analyze pricing trends and generate insights',
        temperature: 0.7
      }
    },
    {
      id: 'step-4',
      name: 'Store Results',
      type: 'Database',
      status: 'pending',
      startTime: null,
      duration: 0,
      progress: 0
    },
    {
      id: 'step-5',
      name: 'Send Notification',
      type: 'Email',
      status: 'pending',
      startTime: null,
      duration: 0,
      progress: 0
    }
  ]);

  const [metadata, setMetadata] = useState({
    cpuUsage: 45,
    memoryUsage: 524288000,
    completedSteps: 2,
    totalSteps: 5,
    errorCount: 0,
    triggerType: 'Manual',
    triggeredBy: 'Sarah Johnson',
    variables: {
      productCount: 150,
      targetPrice: 99.99,
      currency: 'USD',
      notificationEmail: 'sarah@example.com'
    }
  });

  const [logs, setLogs] = useState([
    {
      timestamp: new Date(Date.now() - 180000)?.toISOString(),
      level: 'info',
      stepName: 'Fetch Product Data',
      message: 'Starting HTTP request to https://api.example.com/products'
    },
    {
      timestamp: new Date(Date.now() - 177500)?.toISOString(),
      level: 'info',
      stepName: 'Fetch Product Data',
      message: 'Successfully retrieved 150 products from API'
    },
    {
      timestamp: new Date(Date.now() - 165000)?.toISOString(),
      level: 'info',
      stepName: 'Parse HTML Content',
      message: 'Initializing web scraper with selector: .product-price'
    },
    {
      timestamp: new Date(Date.now() - 160000)?.toISOString(),
      level: 'warning',
      stepName: 'Parse HTML Content',
      message: 'Failed to extract price for 2 products, using fallback values'
    },
    {
      timestamp: new Date(Date.now() - 156800)?.toISOString(),
      level: 'info',
      stepName: 'Parse HTML Content',
      message: 'Successfully parsed 150 items with 98.7% success rate'
    },
    {
      timestamp: new Date(Date.now() - 120000)?.toISOString(),
      level: 'info',
      stepName: 'Process with LLM',
      message: 'Connecting to OpenAI API with model: gpt-4'
    },
    {
      timestamp: new Date(Date.now() - 115000)?.toISOString(),
      level: 'debug',
      stepName: 'Process with LLM',
      message: 'Processing batch 1 of 3 (50 items)'
    },
    {
      timestamp: new Date(Date.now() - 90000)?.toISOString(),
      level: 'debug',
      stepName: 'Process with LLM',
      message: 'Processing batch 2 of 3 (50 items)'
    },
    {
      timestamp: new Date(Date.now() - 60000)?.toISOString(),
      level: 'info',
      stepName: 'Process with LLM',
      message: 'Generated insights for 100 products, continuing with final batch'
    }
  ]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/executions');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event?.data);
      
      if (data?.type === 'step_update') {
        setSteps(prevSteps => 
          prevSteps?.map(step => 
            step?.id === data?.stepId ? { ...step, ...data?.updates } : step
          )
        );
      }
      
      if (data?.type === 'log') {
        setLogs(prevLogs => [...prevLogs, data?.log]);
      }
      
      if (data?.type === 'metadata_update') {
        setMetadata(prev => ({ ...prev, ...data?.updates }));
      }
    };

    const simulateProgress = setInterval(() => {
      setSteps(prevSteps => {
        const runningStep = prevSteps?.find(s => s?.status === 'running');
        if (runningStep && runningStep?.progress < 100) {
          return prevSteps?.map(step => 
            step?.id === runningStep?.id 
              ? { ...step, progress: Math.min(step?.progress + 5, 100) }
              : step
          );
        }
        return prevSteps;
      });
    }, 2000);

    return () => {
      ws?.close();
      clearInterval(simulateProgress);
    };
  }, []);

  const handleStepClick = (stepId) => {
    setExpandedStepId(expandedStepId === stepId ? null : stepId);
  };

  const handlePause = () => {
    setExecution(prev => ({ ...prev, status: 'paused' }));
    setSteps(prevSteps => 
      prevSteps?.map(step => 
        step?.status === 'running' ? { ...step, status: 'paused' } : step
      )
    );
  };

  const handleResume = () => {
    setExecution(prev => ({ ...prev, status: 'running' }));
    setSteps(prevSteps => 
      prevSteps?.map(step => 
        step?.status === 'paused' ? { ...step, status: 'running' } : step
      )
    );
  };

  const handleCancel = () => {
    setExecution(prev => ({ ...prev, status: 'cancelled' }));
    setSteps(prevSteps => 
      prevSteps?.map(step => 
        step?.status === 'running' || step?.status === 'pending' 
          ? { ...step, status: 'cancelled' } 
          : step
      )
    );
  };

  const handleRetry = () => {
    navigate('/workflow-builder');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6 space-y-6">
          <ExecutionControls
            execution={execution}
            onPause={handlePause}
            onResume={handleResume}
            onCancel={handleCancel}
            onRetry={handleRetry}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <ExecutionTimeline
                steps={steps}
                onStepClick={handleStepClick}
                expandedStepId={expandedStepId}
              />
              
              <LogViewer logs={logs} />
            </div>

            <div className="xl:col-span-1">
              <ExecutionMetadata metadata={metadata} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutionMonitor;