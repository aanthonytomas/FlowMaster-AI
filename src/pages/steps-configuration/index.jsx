import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const WorkflowToolbar = ({ 
  workflowName, 
  onWorkflowNameChange, 
  onSave, 
  onTestRun,
  onSchedule,
  onVariables,
  isSaving,
  lastSaved
}) => {
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);

  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved';
    const now = new Date();
    const diff = Math.floor((now - lastSaved) / 1000);
    
    if (diff < 60) return 'Saved just now';
    if (diff < 3600) return `Saved ${Math.floor(diff / 60)}m ago`;
    return `Saved ${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard')}
          iconName="ArrowLeft"
          iconSize={20}
        />
        
        <div className="h-8 w-px bg-border" />

        {isEditingName ? (
          <Input
            type="text"
            value={workflowName}
            onChange={(e) => onWorkflowNameChange(e?.target?.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e?.key === 'Enter') setIsEditingName(false);
            }}
            className="w-64"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-150 group"
          >
            <h1 className="text-lg font-semibold text-foreground">{workflowName}</h1>
            <Icon name="Pencil" size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {isSaving ? (
            <>
              <Icon name="Loader2" size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Icon name="Check" size={14} className="text-success" />
              <span>{formatLastSaved()}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={onVariables}
          iconName="Variable"
          iconPosition="left"
        >
          Variables
        </Button>

        <Button
          variant="ghost"
          onClick={onSchedule}
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule
        </Button>

        <div className="h-8 w-px bg-border mx-2" />

        <Button
          variant="outline"
          onClick={onTestRun}
          iconName="Play"
          iconPosition="left"
        >
          Test Run
        </Button>

        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowToolbar;