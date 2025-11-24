import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExecutionControls = ({ execution, onPause, onResume, onCancel, onRetry }) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRetryDialog, setShowRetryDialog] = useState(false);

  const handleCancel = () => {
    onCancel();
    setShowCancelDialog(false);
  };

  const handleRetry = () => {
    onRetry();
    setShowRetryDialog(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      running: { color: 'bg-accent/10 text-accent border-accent/20', icon: 'Loader2', label: 'Running' },
      paused: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Pause', label: 'Paused' },
      completed: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle2', label: 'Completed' },
      error: { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: 'XCircle', label: 'Failed' },
      cancelled: { color: 'bg-muted text-muted-foreground border-border', icon: 'Ban', label: 'Cancelled' }
    };
    
    const badge = badges?.[status] || badges?.running;
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${badge?.color} text-sm font-medium`}>
        <Icon name={badge?.icon} size={16} className={status === 'running' ? 'animate-spin' : ''} />
        <span>{badge?.label}</span>
      </div>
    );
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{execution?.workflowName}</h1>
              {getStatusBadge(execution?.status)}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icon name="Calendar" size={16} />
                {new Date(execution.startTime)?.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Clock" size={16} />
                {new Date(execution.startTime)?.toLocaleTimeString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Timer" size={16} />
                Duration: {execution?.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Hash" size={16} />
                ID: {execution?.id}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {execution?.status === 'running' && (
              <Button
                variant="outline"
                iconName="Pause"
                iconPosition="left"
                onClick={onPause}
              >
                Pause
              </Button>
            )}
            
            {execution?.status === 'paused' && (
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                onClick={onResume}
              >
                Resume
              </Button>
            )}
            
            {(execution?.status === 'running' || execution?.status === 'paused') && (
              <Button
                variant="destructive"
                iconName="X"
                iconPosition="left"
                onClick={() => setShowCancelDialog(true)}
              >
                Cancel
              </Button>
            )}
            
            {(execution?.status === 'error' || execution?.status === 'cancelled') && (
              <Button
                variant="default"
                iconName="RotateCw"
                iconPosition="left"
                onClick={() => setShowRetryDialog(true)}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
      {showCancelDialog && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000]" onClick={() => setShowCancelDialog(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg shadow-lg z-[2001] p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Cancel Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to cancel this execution? This action cannot be undone and all progress will be lost.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Keep Running
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Cancel Execution
              </Button>
            </div>
          </div>
        </>
      )}
      {showRetryDialog && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000]" onClick={() => setShowRetryDialog(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg shadow-lg z-[2001] p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name="RotateCw" size={24} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Retry Execution</h3>
                <p className="text-sm text-muted-foreground">
                  This will start a new execution with the same configuration. Previous execution data will be preserved in history.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRetryDialog(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleRetry}>
                Start Retry
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExecutionControls;