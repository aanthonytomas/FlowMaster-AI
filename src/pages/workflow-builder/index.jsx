import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowToolbar from './components/WorkflowToolbar';
import StepLibrary from './components/StepLibrary';
import WorkflowCanvas from './components/WorkflowCanvas';
import ConfigurationPanel from './components/ConfigurationPanel';
import MobileWorkflowBuilder from './components/MobileWorkflowBuilder';

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [steps, setSteps] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [draggedStep, setDraggedStep] = useState(null);
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false);
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedWorkflow = sessionStorage.getItem('currentWorkflow');
    if (savedWorkflow) {
      const workflow = JSON.parse(savedWorkflow);
      setWorkflowName(workflow?.name || 'Untitled Workflow');
      setSteps(workflow?.steps || []);
      setConnections(workflow?.connections || []);
    }
  }, []);

  const handleStepDragStart = (step) => {
    setDraggedStep(step);
  };

  const handleStepDrop = (step, position) => {
    const newStep = {
      ...step,
      instanceId: `${step?.id}-${Date.now()}`,
      position,
      config: {},
      status: null
    };
    setSteps([...steps, newStep]);
    setDraggedStep(null);
    setSelectedStepId(newStep?.instanceId);
  };

  const handleStepSelect = (stepId) => {
    setSelectedStepId(stepId);
  };

  const handleStepDelete = (stepId) => {
    setSteps(steps?.filter(s => s?.instanceId !== stepId));
    setConnections(connections?.filter(c => c?.from !== stepId && c?.to !== stepId));
    if (selectedStepId === stepId) {
      setSelectedStepId(null);
    }
  };

  const handleStepUpdate = (updatedStep) => {
    setSteps(steps?.map(s => s?.instanceId === updatedStep?.instanceId ? updatedStep : s));
  };

  const handleConnectionCreate = (fromId, toId) => {
    const newConnection = {
      id: `conn-${Date.now()}`,
      from: fromId,
      to: toId
    };
    setConnections([...connections, newConnection]);
  };

  const handleConnectionDelete = (connectionId) => {
    setConnections(connections?.filter(c => c?.id !== connectionId));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    const workflow = {
      name: workflowName,
      steps,
      connections,
      updatedAt: new Date()?.toISOString()
    };

    sessionStorage.setItem('currentWorkflow', JSON.stringify(workflow));

    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const handleTestRun = () => {
    if (steps?.length === 0) {
      alert('Please add at least one step to test the workflow');
      return;
    }
    navigate('/execution-monitor', { state: { workflow: { name: workflowName, steps, connections }, isTest: true } });
  };

  const handleSchedule = () => {
    alert('Schedule configuration will open here');
  };

  const handleVariables = () => {
    alert('Variable management will open here');
  };

  const handleTestStep = () => {
    console.log('Testing step:', selectedStepId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col mt-16">
        <WorkflowToolbar
          workflowName={workflowName}
          onWorkflowNameChange={setWorkflowName}
          onSave={handleSave}
          onTestRun={handleTestRun}
          onSchedule={handleSchedule}
          onVariables={handleVariables}
          isSaving={isSaving}
          lastSaved={lastSaved}
        />

        {isMobile ? (
          <MobileWorkflowBuilder
            steps={steps}
            connections={connections}
            selectedStepId={selectedStepId}
            draggedStep={draggedStep}
            onStepSelect={handleStepSelect}
            onStepDelete={handleStepDelete}
            onStepDrop={handleStepDrop}
            onStepUpdate={handleStepUpdate}
            onConnectionCreate={handleConnectionCreate}
            onConnectionDelete={handleConnectionDelete}
            onStepDragStart={handleStepDragStart}
            onTestStep={handleTestStep}
          />
        ) : (
          <div className="flex-1 flex overflow-hidden">
            <StepLibrary
              onStepDragStart={handleStepDragStart}
              isCollapsed={isLibraryCollapsed}
              onToggleCollapse={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
            />

            <WorkflowCanvas
              steps={steps}
              connections={connections}
              selectedStepId={selectedStepId}
              onStepSelect={handleStepSelect}
              onStepDelete={handleStepDelete}
              onStepDrop={handleStepDrop}
              onConnectionCreate={handleConnectionCreate}
              onConnectionDelete={handleConnectionDelete}
              draggedStep={draggedStep}
            />

            <ConfigurationPanel
              selectedStep={steps?.find(s => s?.instanceId === selectedStepId)}
              onStepUpdate={handleStepUpdate}
              onTestStep={handleTestStep}
              isCollapsed={isConfigCollapsed}
              onToggleCollapse={() => setIsConfigCollapsed(!isConfigCollapsed)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;