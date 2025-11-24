import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import StepLibrary from './StepLibrary';
import WorkflowCanvas from './WorkflowCanvas';
import ConfigurationPanel from './ConfigurationPanel';

const MobileWorkflowBuilder = ({
  steps,
  connections,
  selectedStepId,
  draggedStep,
  onStepSelect,
  onStepDelete,
  onStepDrop,
  onStepUpdate,
  onConnectionCreate,
  onConnectionDelete,
  onStepDragStart,
  onTestStep
}) => {
  const [activeTab, setActiveTab] = useState('canvas');

  const tabs = [
    { id: 'library', label: 'Library', icon: 'Library' },
    { id: 'canvas', label: 'Canvas', icon: 'Workflow' },
    { id: 'config', label: 'Config', icon: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <StepLibrary
            onStepDragStart={onStepDragStart}
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        );
      case 'canvas':
        return (
          <WorkflowCanvas
            steps={steps}
            connections={connections}
            selectedStepId={selectedStepId}
            onStepSelect={onStepSelect}
            onStepDelete={onStepDelete}
            onStepDrop={onStepDrop}
            onConnectionCreate={onConnectionCreate}
            onConnectionDelete={onConnectionDelete}
            draggedStep={draggedStep}
          />
        );
      case 'config':
        return (
          <ConfigurationPanel
            selectedStep={steps?.find(s => s?.instanceId === selectedStepId)}
            onStepUpdate={onStepUpdate}
            onTestStep={onTestStep}
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      <div className="h-16 bg-card border-t border-border flex items-center justify-around px-4">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-150 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={20} />
            <span className="text-xs font-medium">{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileWorkflowBuilder;